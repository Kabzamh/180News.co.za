import { desc } from "drizzle-orm";
import { db } from "@/db";
import { subscribers, subscriptions } from "@/db/schema";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminSubscribersPage() {
  const people = await db.select().from(subscribers).orderBy(desc(subscribers.createdAt));
  const subs = await db.select().from(subscriptions);
  const byUser = new Map(subs.map((row) => [row.subscriberId, row]));

  return (
    <div>
      <h1 className="font-serif text-4xl">Subscribers</h1>
      <div className="mt-6 overflow-x-auto border border-white/10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.12em] text-white/50">
            <tr>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">City</th>
              <th className="px-3 py-2">Plan</th>
              <th className="px-3 py-2">Until</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => {
              const sub = byUser.get(person.id);
              return (
                <tr key={person.id} className="border-t border-white/10">
                  <td className="px-3 py-3">{person.name}</td>
                  <td className="px-3 py-3">{person.email}</td>
                  <td className="px-3 py-3 text-white/60">{person.city}</td>
                  <td className="px-3 py-3 uppercase text-white/70">{sub?.status ?? "none"}</td>
                  <td className="px-3 py-3 text-white/60">
                    {sub ? formatDate(sub.currentPeriodEnd) : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
