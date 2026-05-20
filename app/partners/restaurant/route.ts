import { NextRequest, NextResponse } from "next/server";

const THEFORK_CITY_ID = "679953"; // Amsterdam

function theforkSearchUrl(name: string) {
  return `https://www.thefork.com/search#cityId=${THEFORK_CITY_ID}&searchQuery=${encodeURIComponent(name)}`;
}

const ALLOWED_HOSTS = [
  "thefork.com",
  "opentable.com",
  "resy.com",
  "tock.com",
  "yelp.com",
  // Amsterdam
  "restaurantdekas.nl",
  "rijsel.com",
  "gutsandglory.nl",
  "rongastrobar.nl",
  "restaurantmoeders.com",
  "neni.at",
  "cafedeklos.nl",
  "restaurantas.nl",
  "brouwerijhetij.nl",
  "restauranthangar.nl",
  "pllek.nl",
  "foodhallen.nl",
  "blueaminsterdam.nl",
  "wildmouse.nl",
  // Barcelona
  "bardelpla.cat",
  "bodegasepulveda.com",
  "parkingpizza.com",
  // Marbella
  "danigarcia.rest",
  "lacabane.es",
  "restaurantellago.com",
  // Bangkok
  "eatatgaggan.com",
  "comohotels.com",
  "bolan.co.th",
  // Berlin
  "nobelhartundschmutzig.com",
  "rutz-restaurant.de",
  "coda-berlin.com",
  // Prague
  "ladegustation.cz",
  "eska.ambi.cz",
  "lokal-dlouha.ambi.cz",
  "ambi.cz",
  // Cape Town
  "thetestkitchen.co.za",
  "lacolombe.co.za",
  "thepotluckclub.co.za",
  // USA — Los Angeles
  "noburestaurants.com",
  "n-naka.com",
  "ilovemole.com",
  // USA — New York
  "le-bernardin.com",
  "carbonenewyork.com",
  "katzsdelicatessen.com",
  // USA — Las Vegas
  "mgmgrand.com",
  "gordonramsayrestaurants.com",
  "wolfgangpuck.com",
  // USA — Miami
  "cotemiami.com",
  "kyurestaurants.com",
  "joesstonecrab.com",
  // USA — Chicago
  "alinearestaurant.com",
  "girlandthegoat.com",
  "thepublicanrestaurant.com",
  // USA — San Francisco
  "saisonsf.com",
  "zunicafe.com",
  // USA — Denver
  "riojadenver.com",
  "beastandbottle.com",
];

function isAllowedUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return ALLOWED_HOSTS.some(
      (host) => url.hostname === host || url.hostname === `www.${host}` || url.hostname.endsWith(`.${host}`)
    );
  } catch {
    return false;
  }
}

function buildDestination(request: NextRequest): string {
  const rawUrl = request.nextUrl.searchParams.get("url") || "";
  const name = request.nextUrl.searchParams.get("name") || "";

  if (rawUrl && isAllowedUrl(rawUrl)) return rawUrl;
  return theforkSearchUrl(name || "Amsterdam restaurant");
}

function attachTracking(url: string, request: NextRequest): string {
  try {
    const tracked = new URL(url);
    const city = request.nextUrl.searchParams.get("city");
    const source = request.nextUrl.searchParams.get("source");
    const venue = request.nextUrl.searchParams.get("venue");

    tracked.searchParams.set("utm_source", "xred_eyez");
    tracked.searchParams.set("utm_medium", "restaurant_affiliate");
    tracked.searchParams.set("utm_campaign", source || city || "restaurant");
    if (city) tracked.searchParams.set("utm_content", city);
    if (venue) tracked.searchParams.set("utm_term", venue);
    return tracked.toString();
  } catch {
    return url;
  }
}

export function GET(request: NextRequest) {
  const destination = attachTracking(buildDestination(request), request);
  return NextResponse.redirect(destination, 302);
}
