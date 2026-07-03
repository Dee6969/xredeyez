"use client";
import { usePathname } from "next/navigation";
import { CartProvider, useCart } from "./CartContext";
import CartDrawer from "./CartDrawer";

/**
 * Cart provider stays global (nav + shop pages consume the context),
 * but the cart UI itself lives on /shop routes only. Travel, city,
 * premium and partner pages stay commerce-free — with one escape
 * hatch: if someone already has items in the cart, the cart stays
 * reachable everywhere so a purchase is never stranded.
 */
function ScopedCartDrawer() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  if (!pathname?.startsWith("/shop") && itemCount === 0) return null;
  return <CartDrawer />;
}

export default function ShopProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <ScopedCartDrawer />
    </CartProvider>
  );
}
