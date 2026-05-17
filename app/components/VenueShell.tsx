import PlatformNav from "./PlatformNav";
import SiteFooter from "./SiteFooter";

export default function VenueShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <PlatformNav />
      <main style={{ paddingTop: 0, overflowX: "hidden" }}>{children}</main>
      <SiteFooter />
    </>
  );
}
