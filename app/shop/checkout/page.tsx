import PlatformNav from "../../components/PlatformNav";
import CheckoutClient from "./CheckoutClient";

export const metadata = {
  description: "Checkout.",
  robots: { index: false, follow: false },
  title: "Checkout — XRED EYEZ",
};

export default function CheckoutPage() {
  return (
    <>
      <PlatformNav />
      <CheckoutClient />
    </>
  );
}
