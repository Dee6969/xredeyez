import PlatformNav from "./PlatformNav";

export default function MapShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PlatformNav />
      <main className="map-shell-main">{children}</main>
    </>
  );
}
