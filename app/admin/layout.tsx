import type { Metadata } from "next";
import AdminLogin from "../components/AdminLogin";
import AdminSidebar from "../components/AdminSidebar";
import { isAdminAuthed } from "../lib/adminAuth";

export const metadata: Metadata = {
  title: "Control Room | XRED EYEZ Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdminAuthed())) {
    return (
      <main className="adm-login-shell">
        <AdminLogin />
      </main>
    );
  }

  return (
    <div className="adm-shell">
      <AdminSidebar />
      <main className="adm-main">{children}</main>
    </div>
  );
}
