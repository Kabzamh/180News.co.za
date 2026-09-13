import { desc } from "drizzle-orm";
import { db } from "@/db";
import { contactMessages, newsletterSubscribers } from "@/db/schema";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminInboxPage() {
  const [messages, list] = await Promise.all([
    db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)),
    db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.createdAt)),
  ]);
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <section>
        <h1 className="font-serif text-4xl">Inbox</h1>
        <div className="mt-6 space-y-3">
          {messages.length === 0 ? <p className="text-white/60">No messages.</p> : null}
          {messages.map((message) => (
            <article key={message.id} className="border border-white/10 bg-white/5 p-4">
              <p className="font-semibold">{message.subject}</p>
              <p className="text-xs text-white/40">
                {message.name} · {message.email} · {formatDateTime(message.createdAt)}
              </p>
              <p className="mt-2 text-sm text-white/80">{message.message}</p>
            </article>
          ))}
        </div>
      </section>
      <section>
        <h2 className="font-serif text-3xl">Newsletter list</h2>
        <div className="mt-6 divide-y divide-white/10 border border-white/10">
          {list.map((row) => (
            <div key={row.id} className="px-4 py-3 text-sm">
              <p>{row.email}</p>
              <p className="text-xs text-white/40">{row.name || "—"}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
