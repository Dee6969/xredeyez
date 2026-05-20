import PlatformNav from "./PlatformNav";
import SiteFooter from "./SiteFooter";

export default function VenueShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <PlatformNav />
      <main className="venue-page" style={{ paddingTop: 0, overflowX: "clip" }}>{children}</main>
      <SiteFooter />
    </>
  );
}
