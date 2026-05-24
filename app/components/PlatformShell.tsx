import PlatformNav from "./PlatformNav";
import SiteFooter from "./SiteFooter";

export default function PlatformShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PlatformNav />
      <main className="platform-page">{children}</main>
      <SiteFooter />
    </>
  );
}
