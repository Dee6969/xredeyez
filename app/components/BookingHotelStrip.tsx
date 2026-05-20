import Link from "next/link";
import type { City } from "../data/platform";

function bookingHref(city: City) {
  const params = new URLSearchParams({
    destination: city.name,
    city: city.slug,
    source: "city-guide-hotel-strip",
  });

  return `/partners/booking?${params.toString()}`;
}

export default function BookingHotelStrip({ city }: { city: City }) {
  return (
    <section className="platform-booking-strip">
      <div>
        <div className="eyebrow">BOOKING.COM HOTELS</div>
        <h2>Book hotels near the route.</h2>
        <p>
          Find stays in {city.name} through the XRED EYEZ hotel layer. This is the Booking.com affiliate path for city guides, weekend routes, and premium travel plans.
        </p>
      </div>
      <div className="platform-booking-actions">
        <Link href={bookingHref(city)} target="_blank" rel="noreferrer" className="platform-primary-action">
          Book hotels
        </Link>
        <Link href="/partners/claim" className="platform-secondary-action">
          Feature a stay
        </Link>
      </div>
    </section>
  );
}
