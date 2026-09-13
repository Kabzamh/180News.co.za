import { desc } from "drizzle-orm";
import { db } from "@/db";
import { payments } from "@/db/schema";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminPaymentsPage() {
  const rows = await db.select().from(payments).orderBy(desc(payments.createdAt));
  return (
    <div>
      <h1 className="font-serif text-4xl">Payments</h1>
      <div className="mt-6 overflow-x-auto border border-white/10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.12em] text-white/50">
            <tr>
              <th className="px-3 py-2">Reference</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Method</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">When</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-white/10">
                <td className="px-3 py-3">{row.reference}</td>
                <td className="px-3 py-3">R{(row.amountCents / 100).toFixed(0)}</td>
                <td className="px-3 py-3">
                  {row.method}
                  {row.cardLast4 ? ` ****${row.cardLast4}` : ""}
                </td>
                <td className="px-3 py-3 uppercase">{row.status}</td>
                <td className="px-3 py-3 text-white/60">{formatDateTime(row.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
