export function redirectPlan(options?: { includeDrafts?: boolean }): {
  redirects: { source: string; destination: string }[];
  /** Legacy post slugs replaced in place by a Markdown article. */
  replaced: Set<string>;
  /** Legacy post slugs that now redirect elsewhere. */
  removed: Set<string>;
};
