"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Overview", icon: "◧" },
  { href: "/admin/leads", label: "Partner leads", icon: "◉" },
  { href: "/admin/waitlist", label: "Waitlist", icon: "✉" },
  { href: "/admin/outreach", label: "Outreach", icon: "➤" },
  { href: "/admin/orders", label: "Orders", icon: "▣" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.refresh();
  }

  return (
    <aside className="adm-sidebar">
      <div className="adm-brand">
        <span className="adm-brand-mark">XRED EYEZ</span>
        <span className="adm-brand-sub">Control Room</span>
      </div>

      <nav className="adm-nav" aria-label="Admin">
        {NAV.map((item) => {
          const active =
            item.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`adm-nav-item${active ? " is-active" : ""}`}
            >
              <span className="adm-nav-icon" aria-hidden>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="adm-sidebar-foot">
        <Link href="/" className="adm-nav-item" target="_blank">
          <span className="adm-nav-icon" aria-hidden>↗</span>
          View live site
        </Link>
        <button type="button" onClick={logout} className="adm-nav-item adm-logout">
          <span className="adm-nav-icon" aria-hidden>⏻</span>
          Log out
        </button>
      </div>
    </aside>
  );
}
