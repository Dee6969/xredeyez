import { NextRequest, NextResponse } from "next/server";

function bookingSearchUrl(destination: string) {
  const url = new URL("https://www.booking.com/searchresults.html");
  url.searchParams.set("ss", destination);
  url.searchParams.set("group_adults", "2");
  url.searchParams.set("no_rooms", "1");
  url.searchParams.set("group_children", "0");
  return url.toString();
}

function isBookingUrl(value: string) {
  try {
    const url = new URL(value);
    return url.hostname === "booking.com" || url.hostname.endsWith(".booking.com");
  } catch {
    return false;
  }
}

function buildDestination(request: NextRequest) {
  const destination = request.nextUrl.searchParams.get("destination") || "";
  const rawUrl = request.nextUrl.searchParams.get("url") || "";

  if (rawUrl && isBookingUrl(rawUrl)) {
    return rawUrl;
  }

  return bookingSearchUrl(destination || "Amsterdam");
}

function attachTracking(url: string, request: NextRequest) {
  const tracked = new URL(url);
  const city = request.nextUrl.searchParams.get("city");
  const source = request.nextUrl.searchParams.get("source");
  const venue = request.nextUrl.searchParams.get("venue");
  const ref = request.nextUrl.searchParams.get("ref");

  tracked.searchParams.set("utm_source", "xred_eyez");
  tracked.searchParams.set("utm_medium", "booking_affiliate");
  tracked.searchParams.set("utm_campaign", source || city || "hotel_search");
  if (city) tracked.searchParams.set("utm_content", city);
  if (venue) tracked.searchParams.set("utm_term", venue);
  if (ref) tracked.searchParams.set("label", ref);

  return tracked.toString();
}

function applyCjTemplate(destinationUrl: string) {
  const template = process.env.BOOKING_CJ_LINK_TEMPLATE || process.env.NEXT_PUBLIC_BOOKING_CJ_LINK_TEMPLATE;

  if (!template) return destinationUrl;
  if (template.includes("{url}")) return template.replace("{url}", encodeURIComponent(destinationUrl));
  if (template.includes("{destination}")) return template.replace("{destination}", encodeURIComponent(destinationUrl));

  const separator = template.includes("?") ? "&" : "?";
  return `${template}${separator}url=${encodeURIComponent(destinationUrl)}`;
}

export function GET(request: NextRequest) {
  const destinationUrl = attachTracking(buildDestination(request), request);
  return NextResponse.redirect(applyCjTemplate(destinationUrl), 302);
}
