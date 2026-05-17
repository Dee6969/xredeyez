import Link from "next/link";
import { getVenueById, type FeaturedPlacement } from "../data/platform";

export default function FeaturedPlacementSlot({
  placement,
}: {
  placement: FeaturedPlacement;
}) {
  const venue = placement.type === "venue" || placement.type === "mapPin" ? getVenueById(placement.targetId) : null;
  const href = venue ? `/venues/${venue.slug}` : placement.cityId ? `/cities/${placement.cityId}/map` : "/partners/claim";

  return (
    <Link href={href} data-hover className="featured-placement-slot">
      <span>{placement.label}</span>
      <strong>{venue?.name || placement.sponsorName || "Launch partner slot"}</strong>
      <small>
        {placement.type === "sponsor"
          ? "Available for city sponsor, featured guide, or premium map placement."
          : "Commercial placement ready for partner inventory."}
      </small>
    </Link>
  );
}
