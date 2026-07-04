import { isAdminAuthed } from "../../lib/adminAuth";
import { formatAdminDate } from "../../lib/adminData";

export const dynamic = "force-dynamic";

interface OrderRow {
  id: string;
  created: string;
  amount: string;
  status: string;
  email: string;
}

async function fetchOrders(): Promise<OrderRow[] | null> {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  try {
    const { default: getStripe } = await import("../../lib/stripe");
    const stripe = getStripe();
    const intents = await stripe.paymentIntents.list({ limit: 50 });
    return intents.data.map((p) => ({
      id: p.id,
      created: new Date(p.created * 1000).toISOString(),
      amount: `${(p.amount / 100).toFixed(2)} ${p.currency.toUpperCase()}`,
      status: p.status,
      email: p.receipt_email || "—",
    }));
  } catch {
    return null;
  }
}

export default async function AdminOrdersPage() {
  if (!(await isAdminAuthed())) return null;

  const orders = await fetchOrders();
  const paid = orders?.filter((o) => o.status === "succeeded") ?? [];

  return (
    <>
      <header className="adm-page-head">
        <div>
          <h1>Shop orders</h1>
          <p className="adm-page-sub">
            Latest 50 payment intents from Stripe · {paid.length} succeeded.
          </p>
        </div>
        <a href="https://dashboard.stripe.com/payments" target="_blank" rel="noreferrer" className="adm-btn-secondary">
          Open Stripe ↗
        </a>
      </header>

      {orders === null ? (
        <div className="adm-empty">
          <strong>Stripe isn&apos;t connected.</strong>
          <p>Set STRIPE_SECRET_KEY in the environment to see orders here.</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="adm-empty">
          <strong>No orders yet.</strong>
          <p>Shop payments appear here as they happen.</p>
        </div>
      ) : (
        <div className="adm-panel adm-panel-flush">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Customer</th>
                <th>Intent</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td className="adm-cell-time">{formatAdminDate(o.created)}</td>
                  <td><strong className="adm-cell-primary">{o.amount}</strong></td>
                  <td>
                    <span className={`adm-pill${o.status === "succeeded" ? " is-green" : o.status.includes("fail") || o.status === "canceled" ? " is-red" : " is-gold"}`}>
                      {o.status}
                    </span>
                  </td>
                  <td>{o.email !== "—" ? <a className="adm-cell-link" href={`mailto:${o.email}`}>{o.email}</a> : <span className="adm-cell-sub">—</span>}</td>
                  <td className="adm-cell-sub">{o.id.slice(0, 18)}…</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
