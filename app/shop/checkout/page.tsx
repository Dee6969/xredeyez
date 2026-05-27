import PlatformNav from "../../components/PlatformNav";
import CheckoutClient from "./CheckoutClient";

export const metadata = {
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
