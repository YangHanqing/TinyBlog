---
title: "Hello, World / 你好，世界"
date: 2026-07-03
description: "Welcome to TinyBlog — a zero-config static blog powered by GitHub Pages and GitHub Issues."
---

Welcome to **TinyBlog**. This whole site is a single Astro build: no CMS,
no database, no server. Every post is a Markdown file in
`src/content/blog/`, and every comment thread is a GitHub Issue on this
repo.

To publish a new post, drop a file here:

```
src/content/blog/my-post.md
```

with frontmatter like:

```yaml
---
title: "My Post"
date: 2026-07-04
description: "One line for the post list."
---
```

Commit, push, and GitHub Actions rebuilds and redeploys the site
automatically.

---

欢迎来到 **TinyBlog**。整个网站只是一次 Astro 构建：没有 CMS，没有数据库，没有服务器。每篇文章都是
`src/content/blog/` 下的一个 Markdown 文件，每个评论区都是这个仓库里的一个 GitHub Issue。

发布新文章只需要在这里新建一个文件：

```
src/content/blog/my-post.md
```

配上如下 frontmatter：

```yaml
---
title: "文章标题"
date: 2026-07-04
description: "列表页展示的一句话简介"
---
```

`git push` 之后，GitHub Actions 会自动重新构建并发布。
