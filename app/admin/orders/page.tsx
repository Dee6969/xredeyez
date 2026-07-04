import type { Metadata } from "next";
import AdminLogin from "../../components/AdminLogin";
import AdminNav from "../../components/AdminNav";
import { isAdminAuthed } from "../../lib/adminAuth";

export const metadata: Metadata = {
  title: "Orders | XRED EYEZ Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

interface OrderRow {
  id: string;
  amount: string;
  status: string;
  email: string;
  created: string;
}

async function fetchOrders(): Promise<OrderRow[] | null> {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  try {
    const { default: getStripe } = await import("../../lib/stripe");
    const stripe = getStripe();
    const intents = await stripe.paymentIntents.list({ limit: 50 });
    return intents.data.map((p) => ({
      id: p.id,
      amount: `${(p.amount / 100).toFixed(2)} ${p.currency.toUpperCase()}`,
      status: p.status,
      email: p.receipt_email || "—",
      created: new Date(p.created * 1000).toLocaleString("en-GB", {
        day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
      }),
    }));
  } catch {
    return [];
  }
}

export default async function AdminOrdersPage() {
  if (!(await isAdminAuthed())) {
    return (
      <main className="admin-leads-shell">
        <AdminLogin />
      </main>
    );
  }

  const orders = await fetchOrders();

  return (
    <main className="admin-leads-shell">
      <header className="admin-leads-head">
        <div className="eyebrow">XRED EYEZ ADMIN</div>
        <h1>Shop orders</h1>
        <AdminNav />
      </header>

      {orders === null ? (
        <p className="admin-leads-empty">Stripe isn&apos;t configured in this environment.</p>
      ) : orders.length === 0 ? (
        <p className="admin-leads-empty">No payments found.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Created</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Customer</th>
                <th>Payment ID</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.created}</td>
                  <td>{o.amount}</td>
                  <td><span className={`admin-status is-${o.status === "succeeded" ? "complete" : "active"}`}>{o.status}</span></td>
                  <td>{o.email !== "—" ? <a href={`mailto:${o.email}`}>{o.email}</a> : "—"}</td>
                  <td className="admin-mono">{o.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
