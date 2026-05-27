import { notFound } from "next/navigation";
import PlatformNav from "../../components/PlatformNav";
import SiteFooter from "../../components/SiteFooter";
import ProductClient from "./ProductClient";
import { PrintfulSyncProductDetail } from "../../lib/printful";

async function getProduct(id: string): Promise<PrintfulSyncProductDetail | null> {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  try {
    const res = await fetch(`${base}/api/shop/products/${id}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.product ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Product — XRED EYEZ" };
  return {
    title: `${product.sync_product.name} — XRED EYEZ Merch`,
    description: `${product.sync_product.name}. Official XRED EYEZ merchandise.`,
    openGraph: { images: [product.sync_product.thumbnail_url] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <>
      <PlatformNav />
      <ProductClient product={product} />
      <SiteFooter />
    </>
  );
}
