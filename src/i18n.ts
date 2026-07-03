export type Locale = "en" | "zh";

/**
 * UI copy for the app chrome (comment widget, nav, generic labels).
 * Page content (bio, about text) lives in site.config.ts / about.astro
 * instead, since that's per-site authored content, not app strings.
 */
export const strings = {
  en: {
    comments_heading: "Comments",
    comments_loading: "Loading comments…",
    comments_empty: "No comments yet — be the first.",
    comments_placeholder: "Write a comment (Markdown supported)…",
    comments_token_placeholder: "GitHub personal access token",
    comments_submit: "Comment",
    comments_submitting: "Posting…",
    comments_hint_pre:
      "Comments post to a GitHub Issue on this repo via a personal access token — nothing goes through any server but GitHub's own API.",
    comments_hint_link: "Generate one",
    comments_hint_post:
      "(scope: public_repo). It's kept only in this tab's session storage.",
    comments_error_load: "Couldn't load comments (GitHub API rate limit?).",
    comments_error_check: "Couldn't check for existing comments.",
    comments_error_token:
      "Token rejected — check it's valid and has public_repo scope.",
    comments_error_generic: "Something went wrong.",
  },
  zh: {
    comments_heading: "评论",
    comments_loading: "评论加载中…",
    comments_empty: "还没有评论，来写第一条吧。",
    comments_placeholder: "写下你的评论（支持 Markdown）…",
    comments_token_placeholder: "GitHub 个人访问令牌",
    comments_submit: "发表评论",
    comments_submitting: "发布中…",
    comments_hint_pre:
      "评论会通过个人访问令牌发到这个仓库的 GitHub Issue——不经过除 GitHub 自己的 API 以外的任何服务器。",
    comments_hint_link: "生成一个令牌",
    comments_hint_post:
      "（权限范围：public_repo）。令牌只保存在当前标签页的 session storage 里。",
    comments_error_load: "评论加载失败（可能触发了 GitHub API 限额）。",
    comments_error_check: "检查已有评论时出错。",
    comments_error_token: "令牌无效——请确认它有效且拥有 public_repo 权限。",
    comments_error_generic: "出了点问题。",
  },
} satisfies Record<Locale, Record<string, string>>;

/**
 * Reads the locale the blocking <script> in BaseLayout already computed
 * from navigator.language and stamped onto <html data-locale>, so there's
 * a single place that parses the browser's language.
 */
export function currentLocale(): Locale {
  if (typeof document === "undefined") return "en";
  return document.documentElement.getAttribute("data-locale") === "zh"
    ? "zh"
    : "en";
}
