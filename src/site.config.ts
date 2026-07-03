/**
 * The file you're expected to touch. Owner/repo (used for GitHub Pages
 * URLs and the Issues-based comment system) is auto-detected from git
 * remote — see src/lib/repo.ts — so it's not repeated here.
 *
 * `defaultLocale` is only the no-JS/crawler fallback (see the <noscript>
 * rule in BaseLayout.astro) — visitors with JS enabled always get the
 * text matching their browser language, detected client-side.
 */
export const siteConfig = {
  title: "TinyBlog",
  description: "A zero-config static blog with GitHub Issues as comments.",
  author: "Your Name",
  defaultLocale: "en" as const,
  bio: {
    en: "Writing about whatever I'm building.",
    zh: "写点正在做的东西。",
  },
  nav: [
    { href: "/", en: "Home", zh: "首页" },
    { href: "/about", en: "About", zh: "关于" },
  ],
  social: {
    github: "", // e.g. "https://github.com/your-name" (blank hides the link)
    twitter: "",
    email: "",
  },
};
