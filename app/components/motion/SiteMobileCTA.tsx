"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SiteMobileCTA() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 767px)").matches;
    setEnabled(coarse && narrow);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    if (pathname === "/map" || pathname?.startsWith("/shop/checkout")) { setShow(false); return; }
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 260;
      setShow(y > window.innerHeight * 0.6 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled, pathname]);

  if (!enabled) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="sticky-mobile-cta"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
        >
          <Link href="/map" className="sticky-mobile-cta-pill" aria-label="Open the city map">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
              <line x1="9" y1="3" x2="9" y2="18" />
              <line x1="15" y1="6" x2="15" y2="21" />
            </svg>
            Open Map
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
