/**
 * The only file you're expected to touch. Owner/repo (used for GitHub
 * Pages URLs and the Issues-based comment system) is auto-detected from
 * git remote — see src/lib/repo.ts — so it's not repeated here.
 */
export const siteConfig = {
  title: "TinyBlog",
  description: "A zero-config static blog with GitHub Issues as comments.",
  author: "Your Name",
  bio: "Writing about whatever I'm building.",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ],
  social: {
    github: "", // e.g. "https://github.com/your-name" (blank hides the link)
    twitter: "",
    email: "",
  },
};
