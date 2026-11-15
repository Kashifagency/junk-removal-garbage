export function redirectPlan(options?: { includeDrafts?: boolean; now?: Date }): {
  /** Redirects live now (baked into next.config.ts). */
  redirects: { source: string; destination: string }[];
  /** redirectFrom of future-dated articles; applied at runtime by app/[slug] once publishAt arrives. */
  scheduled: { source: string; destination: string; publishAt: string }[];
  /** Legacy post slugs replaced in place by a Markdown article. */
  replaced: Set<string>;
  /** Legacy post slugs that now redirect elsewhere. */
  removed: Set<string>;
};
export function articlePublishAt(value: unknown): string | undefined;
export function isLive(publishAt: string | undefined, now?: Date): boolean;
