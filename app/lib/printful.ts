const PRINTFUL_BASE = "https://api.printful.com";

async function printfulFetch(path: string, options?: RequestInit) {
  const key = process.env.PRINTFUL_API_KEY;
  if (!key) throw new Error("PRINTFUL_API_KEY not set");
  const res = await fetch(`${PRINTFUL_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Printful ${res.status}: ${text}`);
  }
  return res.json();
}

export async function listSyncProducts() {
  const data = await printfulFetch("/sync/products?limit=100");
  return data.result as PrintfulSyncProduct[];
}

export async function getSyncProduct(id: string) {
  const data = await printfulFetch(`/sync/products/${id}`);
  return data.result as PrintfulSyncProductDetail;
}

export async function createOrder(payload: CreateOrderPayload) {
  const data = await printfulFetch("/orders", {
    method: "POST",
    body: JSON.stringify({ ...payload, confirm: true }),
  });
  return data.result;
}

export interface PrintfulSyncProduct {
  id: number;
  external_id: string;
  name: string;
  variants: number;
  synced: number;
  thumbnail_url: string;
  is_ignored: boolean;
}

export interface PrintfulSyncVariant {
  id: number;
  external_id: string;
  name: string;
  synced: boolean;
  variant_id: number;
  retail_price: string;
  currency: string;
  product: {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
  };
  files: Array<{
    id: number;
    type: string;
    preview_url: string;
    thumbnail_url: string;
  }>;
  options: Array<{ id: string; value: string }>;
}

export interface PrintfulSyncProductDetail {
  sync_product: PrintfulSyncProduct;
  sync_variants: PrintfulSyncVariant[];
}

export interface CreateOrderPayload {
  recipient: {
    name: string;
    address1: string;
    address2?: string;
    city: string;
    state_code?: string;
    country_code: string;
    zip: string;
    email: string;
    phone?: string;
  };
  items: Array<{
    sync_variant_id: number;
    quantity: number;
  }>;
}
