# TinyBlog

A zero-config static blog: write Markdown, `git push`, done. Comments are
"borrowed" from GitHub Issues — no database, no third-party widget, no
backend of any kind.

**[English](#english)** · **[中文](#中文)**

---

## English

### Features

- **Truly static** — built with [Astro](https://astro.build), deployed as
  plain HTML/CSS/JS to GitHub Pages.
- **Write in Markdown** — drop a file in `src/content/blog/`, it appears on
  the site, sorted by its `date` frontmatter (no GitHub API needed to know
  publish order — Astro resolves it at build time).
- **Comments via GitHub Issues** — each post gets its own Issue on your repo;
  readers comment with a personal access token, nothing touches a server you
  run.
- **Zero config to fork** — owner/repo is auto-detected from `git remote` at
  build time (`src/lib/repo.ts`). Fork it, push, and it just works.
- **Light/dark mode**, responsive layout, no render-blocking JS beyond the
  comment widget.

### Quickstart

1. Fork this repo and rename it to `<your-github-username>.github.io`.
2. In the repo Settings → Pages, set the source to **GitHub Actions**
   (the included workflow at `.github/workflows/deploy.yml` handles the rest).
3. Edit `src/site.config.ts` — title, bio, social links. That's the only
   file you need to touch; owner/repo isn't in there because it's detected
   automatically.
4. Write a post:
   ```
   src/content/blog/my-first-post.md
   ```
   ```yaml
   ---
   title: "My First Post"
   date: 2026-07-04
   description: "One line for the post list."
   ---
   Hello, world.
   ```
5. `git push`. GitHub Actions builds and deploys automatically —
   `https://<your-username>.github.io` is live within a minute or two.

Local dev: `npm install && npm run dev`.

### How comments work

GitHub removed password-based API auth entirely, so Basic Auth with a
username+password is no longer possible. This uses a **classic personal
access token** instead:

1. A commenter clicks "Generate one" in the comment box, which opens GitHub's
   token page pre-scoped to `public_repo`.
2. The token is pasted into the page and kept only in that tab's
   `sessionStorage` — it's sent straight to `api.github.com` from the
   browser and never touches any server of yours.
3. On first comment, the site opens an Issue titled `[TinyBlog] <post-slug>`;
   every comment after that (from anyone) posts to the same Issue.

**Security note:** a classic PAT with `public_repo` scope can open issues/PRs
on *any* public repo you have access to, not just this one — that's a GitHub
limitation (classic tokens aren't repo-scoped). Anyone commenting should use
a token dedicated to this purpose and revoke it afterward, or create a
fine-grained token restricted to just this repository with only the
"Issues: read and write" permission.

Reading comments is unauthenticated and public (GitHub's anonymous API rate
limit is 60 requests/hour per IP) — fine for a personal blog's traffic.

### Project layout

```
src/
  content/blog/*.md      # posts (frontmatter: title, date, description, draft)
  site.config.ts         # title, bio, nav, social links — the file you edit
  lib/repo.ts            # auto-detects owner/repo from git remote
  components/Comments.tsx # the GitHub-Issues comment widget (Preact island)
  pages/                 # index, blog/[...slug], about, 404
```

### License

MIT

---

## 中文

### 特性

- **真正的静态站点** — 用 [Astro](https://astro.build) 构建，产物是纯
  HTML/CSS/JS，部署到 GitHub Pages。
- **写 Markdown 就是发文章** — 把文件放进 `src/content/blog/`，站点自动展示，
  按 frontmatter 里的 `date` 排序（不再需要调用 GitHub API 猜测发布时间——
  Astro 在构建期就已经知道）。
- **借用 GitHub Issues 做评论** — 每篇文章对应一个 Issue，评论直接调用
  GitHub API，不经过任何你自己的服务器。
- **Fork 即用，零配置** — owner/repo 在构建时通过 `git remote` 自动识别
  （见 `src/lib/repo.ts`），fork 完 push 上去就能跑。
- **明暗双主题**、响应式布局，除评论组件外没有额外的阻塞 JS。

### 快速开始

1. Fork 本仓库，改名为 `<你的GitHub用户名>.github.io`。
2. 仓库 Settings → Pages，Source 选择 **GitHub Actions**（已经写好的
   `.github/workflows/deploy.yml` 会自动完成构建和部署）。
3. 编辑 `src/site.config.ts`——标题、简介、社交链接。这是唯一需要手动改的
   文件，owner/repo 不在里面，因为会自动识别。
4. 写一篇文章：
   ```
   src/content/blog/my-first-post.md
   ```
   ```yaml
   ---
   title: "我的第一篇文章"
   date: 2026-07-04
   description: "列表页展示的一句话简介"
   ---
   你好，世界。
   ```
5. `git push`，GitHub Actions 会自动构建部署，一两分钟后
   `https://<你的用户名>.github.io` 就能访问了。

本地开发：`npm install && npm run dev`。

### 评论功能是怎么做的

GitHub 早已彻底下线了密码方式的 API 认证，用户名+密码走 Basic Auth 的方式
现在完全走不通了，因此改用 **Classic Personal Access Token（经典个人访问
令牌）**：

1. 评论者点击评论框里的"Generate one"，会打开 GitHub 的令牌创建页，并预先
   勾好 `public_repo` 权限。
2. 令牌粘贴进页面后只保存在当前标签页的 `sessionStorage` 里——直接从浏览器
   发往 `api.github.com`，不经过你的任何服务器。
3. 第一条评论会自动创建一个标题为 `[TinyBlog] <文章slug>` 的 Issue，之后
   所有人的评论都发到这同一个 Issue 下。

**安全提示：** 带 `public_repo` 权限的经典令牌可以对你有权限的**任意**公开
仓库开 issue/PR，不只是这一个——这是 GitHub 经典令牌本身的限制（不支持限定
单仓库）。建议评论者用专门为此创建、用完即撤销的令牌，或者改用
fine-grained token，把权限精确限定到这一个仓库的 "Issues: read and write"。

读取评论不需要登录，公开可见（GitHub 匿名 API 限额是每个 IP 每小时 60
次）——对个人博客的访问量完全够用。

### 项目结构

```
src/
  content/blog/*.md      # 文章（frontmatter: title, date, description, draft）
  site.config.ts         # 标题、简介、导航、社交链接——需要手动编辑的文件
  lib/repo.ts            # 从 git remote 自动识别 owner/repo
  components/Comments.tsx # GitHub Issues 评论组件（Preact island）
  pages/                 # index、blog/[...slug]、about、404
```

### 许可

MIT
