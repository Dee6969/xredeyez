"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/outreach", label: "Outreach" },
  { href: "/admin/orders", label: "Orders" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.refresh();
  }

  return (
    <nav className="admin-nav">
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`admin-nav-link${pathname === link.href ? " is-active" : ""}`}
        >
          {link.label}
        </Link>
      ))}
      <button type="button" onClick={logout} className="admin-nav-logout">
        Log out
      </button>
    </nav>
  );
}
