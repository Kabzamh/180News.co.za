import { desc } from "drizzle-orm";
import { db } from "@/db";
import { comments } from "@/db/schema";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminCommentsPage() {
  const rows = await db.select().from(comments).orderBy(desc(comments.createdAt));
  return (
    <div>
      <h1 className="font-serif text-4xl">Comments</h1>
      <div className="mt-6 space-y-3">
        {rows.length === 0 ? <p className="text-white/60">No comments yet.</p> : null}
        {rows.map((comment) => (
          <article key={comment.id} className="border border-white/10 bg-white/5 p-4">
            <p className="font-semibold">{comment.name}</p>
            <p className="text-xs text-white/40">
              {comment.email} · {formatDateTime(comment.createdAt)} · article #{comment.articleId}
            </p>
            <p className="mt-2 text-sm text-white/80">{comment.body}</p>
            <form action="/api/admin/comments" method="post" className="mt-3">
              <input type="hidden" name="id" value={comment.id} />
              <button type="submit" className="text-xs uppercase tracking-[0.12em] text-red-300">
                Remove
              </button>
            </form>
          </article>
        ))}
      </div>
    </div>
  );
}
