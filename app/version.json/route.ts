export const dynamic = "force-static";

export function GET() {
  return Response.json(
    {
      commit:
        process.env.VERCEL_GIT_COMMIT_SHA ??
        process.env.MEHI_BUILD_SHA ??
        "development",
    },
    { headers: { "Cache-Control": "no-cache", "X-Robots-Tag": "noindex" } },
  );
}
