import { useCallback, useEffect, useState } from "preact/hooks";

interface Props {
  owner: string;
  repo: string;
  slug: string;
  postTitle: string;
}

interface GhComment {
  id: number;
  body: string;
  created_at: string;
  html_url: string;
  user: { login: string; avatar_url: string; html_url: string };
}

const TOKEN_KEY = "tinyblog_gh_token";

function issueTitleFor(slug: string) {
  return `[TinyBlog] ${slug}`;
}

export default function Comments({ owner, repo, slug, postTitle }: Props) {
  const [commentsUrl, setCommentsUrl] = useState<string | null>(null);
  const [comments, setComments] = useState<GhComment[]>([]);
  const [status, setStatus] = useState<"loading" | "ready">("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [body, setBody] = useState("");
  const [token, setToken] = useState("");
  const [posting, setPosting] = useState(false);

  const issuesUrl = `https://api.github.com/repos/${owner}/${repo}/issues`;

  useEffect(() => {
    setToken(sessionStorage.getItem(TOKEN_KEY) || "");
  }, []);

  const loadComments = useCallback(async (url: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(String(res.status));
      setComments(await res.json());
    } catch {
      setErrorMsg("Couldn't load comments (GitHub API rate limit?).");
    }
  }, []);

  useEffect(() => {
    const wantedTitle = issueTitleFor(slug);
    const q = encodeURIComponent(
      `repo:${owner}/${repo} type:issue in:title "${wantedTitle}"`
    );
    fetch(`https://api.github.com/search/issues?q=${q}`)
      .then((r) => r.json())
      .then((json) => {
        const match = (json.items || []).find(
          (it: any) => it.title === wantedTitle
        );
        if (match) {
          setCommentsUrl(match.comments_url);
          return loadComments(match.comments_url);
        }
      })
      .catch(() => setErrorMsg("Couldn't check for existing comments."))
      .finally(() => setStatus("ready"));
  }, [owner, repo, slug, loadComments]);

  function saveToken(v: string) {
    setToken(v);
    sessionStorage.setItem(TOKEN_KEY, v);
  }

  async function ensureIssue(): Promise<string> {
    if (commentsUrl) return commentsUrl;
    const res = await fetch(issuesUrl, {
      method: "POST",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        title: issueTitleFor(slug),
        body: `Comments for [${postTitle}](/blog/${slug}).`,
      }),
    });
    if (!res.ok) throw new Error(`Couldn't open a comment thread (${res.status}).`);
    const issue = await res.json();
    setCommentsUrl(issue.comments_url);
    return issue.comments_url;
  }

  async function submit(e: Event) {
    e.preventDefault();
    if (!token || !body.trim()) return;
    setPosting(true);
    setErrorMsg("");
    try {
      const url = await ensureIssue();
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github+json",
        },
        body: JSON.stringify({ body }),
      });
      if (!res.ok) {
        if (res.status === 401)
          throw new Error(
            "Token rejected — check it's valid and has public_repo scope."
          );
        throw new Error(`Couldn't post comment (${res.status}).`);
      }
      setBody("");
      await loadComments(url);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setPosting(false);
    }
  }

  const tokenUrl = `https://github.com/settings/tokens/new?scopes=public_repo&description=${encodeURIComponent(
    "TinyBlog comment token"
  )}`;

  return (
    <section class="comments">
      <h2>Comments</h2>

      {status === "loading" && <p class="comment-status">Loading comments…</p>}

      {status === "ready" && comments.length === 0 && (
        <p class="comment-empty">No comments yet — be the first.</p>
      )}

      {comments.length > 0 && (
        <ul class="comment-list">
          {comments.map((c) => (
            <li class="comment-item" key={c.id}>
              <img class="comment-avatar" src={c.user.avatar_url} alt="" />
              <div class="comment-body-wrap">
                <div class="comment-meta">
                  <a href={c.user.html_url} target="_blank" rel="noopener">
                    <strong>{c.user.login}</strong>
                  </a>{" "}
                  ·{" "}
                  <a href={c.html_url} target="_blank" rel="noopener">
                    {new Date(c.created_at).toLocaleString()}
                  </a>
                </div>
                <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{c.body}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form class="comment-form" onSubmit={submit}>
        <textarea
          placeholder="Write a comment (Markdown supported)…"
          value={body}
          onInput={(e) => setBody((e.target as HTMLTextAreaElement).value)}
        />
        <div class="comment-form-actions">
          <input
            class="token-input"
            style={{ maxWidth: "16rem" }}
            type="password"
            placeholder="GitHub personal access token"
            value={token}
            onInput={(e) => saveToken((e.target as HTMLInputElement).value)}
          />
          <button
            class="btn"
            type="submit"
            disabled={posting || !token || !body.trim()}
          >
            {posting ? "Posting…" : "Comment"}
          </button>
        </div>
        <p class="token-hint">
          Comments post to a GitHub Issue on this repo via a personal access
          token — nothing goes through any server but GitHub's own API.{" "}
          <a href={tokenUrl} target="_blank" rel="noopener">
            Generate one
          </a>{" "}
          (scope: <code>public_repo</code>). It's kept only in this tab's
          session storage.
        </p>
        {errorMsg && <p class="comment-status">{errorMsg}</p>}
      </form>
    </section>
  );
}
