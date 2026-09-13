export type City = {
  slug: string;
  name: string;
  province: string;
  latitude: number;
  longitude: number;
};

export const SOUTH_AFRICAN_CITIES: City[] = [
  { slug: "johannesburg", name: "Johannesburg", province: "Gauteng", latitude: -26.2041, longitude: 28.0473 },
  { slug: "pretoria", name: "Pretoria", province: "Gauteng", latitude: -25.7479, longitude: 28.2293 },
  { slug: "soweto", name: "Soweto", province: "Gauteng", latitude: -26.2485, longitude: 27.854 },
  { slug: "sandton", name: "Sandton", province: "Gauteng", latitude: -26.1076, longitude: 28.0567 },
  { slug: "ekurhuleni", name: "Ekurhuleni", province: "Gauteng", latitude: -26.1777, longitude: 28.3462 },
  { slug: "vereeniging", name: "Vereeniging", province: "Gauteng", latitude: -26.6731, longitude: 27.9261 },
  { slug: "cape-town", name: "Cape Town", province: "Western Cape", latitude: -33.9249, longitude: 18.4241 },
  { slug: "stellenbosch", name: "Stellenbosch", province: "Western Cape", latitude: -33.9321, longitude: 18.8602 },
  { slug: "george", name: "George", province: "Western Cape", latitude: -33.964, longitude: 22.4617 },
  { slug: "paarl", name: "Paarl", province: "Western Cape", latitude: -33.7342, longitude: 18.9756 },
  { slug: "worcester", name: "Worcester", province: "Western Cape", latitude: -33.6465, longitude: 19.4485 },
  { slug: "durban", name: "Durban", province: "KwaZulu-Natal", latitude: -29.8587, longitude: 31.0218 },
  { slug: "pietermaritzburg", name: "Pietermaritzburg", province: "KwaZulu-Natal", latitude: -29.6006, longitude: 30.3794 },
  { slug: "richards-bay", name: "Richards Bay", province: "KwaZulu-Natal", latitude: -28.7807, longitude: 32.0383 },
  { slug: "newcastle", name: "Newcastle", province: "KwaZulu-Natal", latitude: -27.758, longitude: 29.9318 },
  { slug: "gqeberha", name: "Gqeberha", province: "Eastern Cape", latitude: -33.9608, longitude: 25.6022 },
  { slug: "east-london", name: "East London", province: "Eastern Cape", latitude: -33.0153, longitude: 27.9116 },
  { slug: "mthatha", name: "Mthatha", province: "Eastern Cape", latitude: -31.5889, longitude: 28.7844 },
  { slug: "makhanda", name: "Makhanda", province: "Eastern Cape", latitude: -33.3042, longitude: 26.5328 },
  { slug: "bhisho", name: "Bhisho", province: "Eastern Cape", latitude: -32.8472, longitude: 27.4422 },
  { slug: "bloemfontein", name: "Bloemfontein", province: "Free State", latitude: -29.0852, longitude: 26.1596 },
  { slug: "welkom", name: "Welkom", province: "Free State", latitude: -27.9776, longitude: 26.735 },
  { slug: "polokwane", name: "Polokwane", province: "Limpopo", latitude: -23.9045, longitude: 29.4689 },
  { slug: "thohoyandou", name: "Thohoyandou", province: "Limpopo", latitude: -22.9704, longitude: 30.458 },
  { slug: "musina", name: "Musina", province: "Limpopo", latitude: -22.3448, longitude: 30.0417 },
  { slug: "mbombela", name: "Mbombela", province: "Mpumalanga", latitude: -25.4753, longitude: 30.9694 },
  { slug: "emalahleni", name: "eMalahleni", province: "Mpumalanga", latitude: -25.8738, longitude: 29.2321 },
  { slug: "secunda", name: "Secunda", province: "Mpumalanga", latitude: -26.55, longitude: 29.1667 },
  { slug: "mahikeng", name: "Mahikeng", province: "North West", latitude: -25.856, longitude: 25.6403 },
  { slug: "rustenburg", name: "Rustenburg", province: "North West", latitude: -25.6676, longitude: 27.2421 },
  { slug: "klerksdorp", name: "Klerksdorp", province: "North West", latitude: -26.8521, longitude: 26.6667 },
  { slug: "kimberley", name: "Kimberley", province: "Northern Cape", latitude: -28.7282, longitude: 24.7499 },
  { slug: "upington", name: "Upington", province: "Northern Cape", latitude: -28.4478, longitude: 21.2561 },
  { slug: "springbok", name: "Springbok", province: "Northern Cape", latitude: -29.6643, longitude: 17.8865 },
];

export function getCity(slug: string) {
  return SOUTH_AFRICAN_CITIES.find((city) => city.slug === slug) ?? null;
}

export function weatherLabel(code: number) {
  if (code === 0) return "Clear";
  if (code === 1) return "Mainly clear";
  if (code === 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if (code === 45 || code === 48) return "Fog";
  if (code >= 51 && code <= 55) return "Drizzle";
  if (code >= 56 && code <= 57) return "Freezing drizzle";
  if (code >= 61 && code <= 65) return "Rain";
  if (code >= 66 && code <= 67) return "Freezing rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Showers";
  if (code === 85 || code === 86) return "Snow showers";
  if (code === 95) return "Thunderstorm";
  if (code === 96 || code === 99) return "Thunderstorm with hail";
  return "Mixed conditions";
}

export function weatherIcon(code: number) {
  if (code === 0 || code === 1) return "☀";
  if (code === 2) return "⛅";
  if (code === 3) return "☁";
  if (code === 45 || code === 48) return "🌫";
  if (code >= 51 && code <= 67) return "🌧";
  if (code >= 71 && code <= 77) return "❄";
  if (code >= 80 && code <= 82) return "🌦";
  if (code >= 95) return "⛈";
  return "🌤";
}
