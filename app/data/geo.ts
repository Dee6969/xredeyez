/**
 * Shared geography for the map layer.
 * Single source of truth for city centres and multi-region hubs —
 * used by the per-city map experience and the network overview map.
 */

export interface CityCenter {
  lat: number;
  lng: number;
  zoom: number;
}

export const CITY_CENTERS: Record<string, CityCenter> = {
  amsterdam: { lat: 52.3707, lng: 4.8977, zoom: 13 },
  "den-haag": { lat: 52.0800, lng: 4.3007, zoom: 13 },
  rotterdam: { lat: 51.9244, lng: 4.4777, zoom: 13 },
  barcelona: { lat: 41.3851, lng: 2.1734, zoom: 12 },
  tenerife: { lat: 28.2916, lng: -16.6291, zoom: 10 },
  marbella: { lat: 36.5101, lng: -4.8824, zoom: 11 },
  thailand: { lat: 13.7563, lng: 100.5018, zoom: 12 },
  germany: { lat: 52.5200, lng: 13.4050, zoom: 11 },
  usa: { lat: 34.0195, lng: -118.4912, zoom: 12 },
  "czech-republic": { lat: 50.0755, lng: 14.4378, zoom: 12 },
  "south-africa": { lat: -33.9249, lng: 18.4241, zoom: 11 },
  canada: { lat: 43.6532, lng: -79.3832, zoom: 12 },
};

export const REGION_BUTTONS: Record<string, { label: string; lat: number; lng: number; zoom: number }[]> = {
  amsterdam: [
    { label: "Amsterdam", lat: 52.3707, lng: 4.8977, zoom: 13 },
    { label: "Den Haag", lat: 52.0800, lng: 4.3007, zoom: 13 },
    { label: "Rotterdam", lat: 51.9244, lng: 4.4777, zoom: 13 },
  ],
  canada: [
    { label: "Toronto", lat: 43.6532, lng: -79.3832, zoom: 12 },
    { label: "Vancouver", lat: 49.2827, lng: -123.1207, zoom: 12 },
    { label: "Montreal", lat: 45.5017, lng: -73.5673, zoom: 12 },
  ],
  thailand: [
    { label: "Bangkok", lat: 13.7563, lng: 100.5018, zoom: 12 },
    { label: "Phuket", lat: 7.8804, lng: 98.3923, zoom: 12 },
    { label: "Koh Samui", lat: 9.5317, lng: 100.0610, zoom: 12 },
    { label: "Koh Phangan", lat: 9.7047, lng: 100.0296, zoom: 12 },
    { label: "Chiang Mai", lat: 18.7883, lng: 98.9853, zoom: 12 },
  ],
  usa: [
    { label: "Los Angeles", lat: 34.0195, lng: -118.4912, zoom: 12 },
    { label: "New York", lat: 40.7484, lng: -73.9967, zoom: 12 },
    { label: "Las Vegas", lat: 36.1147, lng: -115.1728, zoom: 12 },
    { label: "Miami", lat: 25.7617, lng: -80.1918, zoom: 12 },
    { label: "Chicago", lat: 41.8827, lng: -87.6233, zoom: 12 },
    { label: "San Francisco", lat: 37.7749, lng: -122.4194, zoom: 12 },
    { label: "Denver", lat: 39.7392, lng: -104.9903, zoom: 12 },
  ],
};
