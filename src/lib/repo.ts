import { execSync } from "node:child_process";

export interface RepoInfo {
  owner: string;
  repo: string;
}

const FALLBACK: RepoInfo = { owner: "your-name", repo: "your-name.github.io" };

/**
 * Auto-detects the GitHub owner/repo at build time so a fork needs zero
 * manual config. Works both locally (reads `.git/config`) and in GitHub
 * Actions (checkout leaves `.git` intact, and `GITHUB_REPOSITORY` is set
 * as a belt-and-suspenders fallback).
 */
export function getRepoInfo(): RepoInfo {
  const fromEnv = process.env.GITHUB_REPOSITORY; // "owner/repo"
  if (fromEnv?.includes("/")) {
    const [owner, repo] = fromEnv.split("/");
    return { owner, repo };
  }

  try {
    const remote = execSync("git config --get remote.origin.url", {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    // matches git@github.com:owner/repo.git and https://github.com/owner/repo.git
    const match = remote.match(/github\.com[:/]([^/]+)\/(.+?)(\.git)?$/);
    if (match) return { owner: match[1], repo: match[2] };
  } catch {
    // not a git checkout (e.g. downloaded as zip) — fall through
  }

  return FALLBACK;
}
