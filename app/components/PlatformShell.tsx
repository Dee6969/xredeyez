import PlatformNav from "./PlatformNav";
import SiteFooter from "./SiteFooter";
import SiteMobileCTA from "./motion/SiteMobileCTA";

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
      <SiteMobileCTA />
    </>
  );
}
