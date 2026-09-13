export const SA_BOUNDS = {
  west: 16.3,
  east: 33.1,
  north: -22.0,
  south: -35.1,
};

export function project(lat: number, lng: number) {
  const x = ((lng - SA_BOUNDS.west) / (SA_BOUNDS.east - SA_BOUNDS.west)) * 1000;
  const y = ((lat - SA_BOUNDS.north) / (SA_BOUNDS.south - SA_BOUNDS.north)) * 900;
  return { x, y };
}

export const PROVINCE_SHAPES: Array<{
  slug: string;
  name: string;
  path: string;
  color: string;
}> = [
  {
    slug: "northern-cape",
    name: "Northern Cape",
    color: "#c4a574",
    path: "M70 250 L210 210 L340 230 L390 310 L360 430 L300 520 L220 560 L140 540 L80 470 L50 360 Z",
  },
  {
    slug: "western-cape",
    name: "Western Cape",
    color: "#3d6b9a",
    path: "M80 470 L140 540 L220 560 L280 610 L300 700 L240 780 L160 800 L90 740 L40 650 L50 560 Z",
  },
  {
    slug: "eastern-cape",
    name: "Eastern Cape",
    color: "#8f1520",
    path: "M280 610 L360 430 L470 470 L560 520 L620 610 L600 720 L520 790 L400 780 L300 700 Z",
  },
  {
    slug: "free-state",
    name: "Free State",
    color: "#b45309",
    path: "M390 310 L500 300 L580 340 L600 420 L560 520 L470 470 L360 430 Z",
  },
  {
    slug: "north-west",
    name: "North West",
    color: "#0b4f8a",
    path: "M340 230 L430 180 L530 190 L560 250 L500 300 L390 310 Z",
  },
  {
    slug: "gauteng",
    name: "Gauteng",
    color: "#8f1520",
    path: "M530 190 L590 185 L610 230 L580 255 L530 250 Z",
  },
  {
    slug: "limpopo",
    name: "Limpopo",
    color: "#1d5c32",
    path: "M530 190 L560 250 L610 230 L680 160 L720 80 L640 40 L540 70 L500 130 Z",
  },
  {
    slug: "mpumalanga",
    name: "Mpumalanga",
    color: "#0b2f8a",
    path: "M610 230 L680 160 L760 200 L780 280 L700 330 L600 320 L580 255 Z",
  },
  {
    slug: "kwazulu-natal",
    name: "KwaZulu-Natal",
    color: "#6d0f18",
    path: "M600 320 L700 330 L780 280 L860 360 L840 500 L720 560 L620 610 L560 520 L600 420 Z",
  },
];
