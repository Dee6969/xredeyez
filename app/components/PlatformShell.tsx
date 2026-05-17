import PlatformNav from "./PlatformNav";

export default function PlatformShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PlatformNav />
      <main className="platform-page">{children}</main>
    </>
  );
}
