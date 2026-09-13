export type ShedSlot = {
  start: string;
  end: string;
  day: string;
};

export type AreaSchedule = {
  name: string;
  metro: string;
  block: number;
  slots: ShedSlot[];
};

const AREAS = [
  { name: "Sandton / Alexandra", metro: "Johannesburg", block: 8 },
  { name: "Soweto / Diepkloof", metro: "Johannesburg", block: 3 },
  { name: "Pretoria Central", metro: "Tshwane", block: 11 },
  { name: "Cape Town CBD", metro: "Cape Town", block: 6 },
  { name: "Khayelitsha / Mitchells Plain", metro: "Cape Town", block: 1 },
  { name: "Durban North / Umhlanga", metro: "eThekwini", block: 9 },
  { name: "Umlazi", metro: "eThekwini", block: 4 },
  { name: "Gqeberha / Summerstrand", metro: "Nelson Mandela Bay", block: 7 },
];

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function slotLabel(date: Date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function dayLabel(date: Date) {
  return new Intl.DateTimeFormat("en-ZA", {
    timeZone: "Africa/Johannesburg",
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}

export async function getLoadsheddingStage() {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const response = await fetch("https://loadshedding.eskom.co.za/LoadShedding/GetStatus", {
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timer);
    const raw = Number((await response.text()).trim());
    if (!Number.isFinite(raw) || raw < 1) return 0;
    return Math.max(0, raw - 1);
  } catch {
    return 0;
  }
}

export function scheduleForStage(stage: number): AreaSchedule[] {
  const now = new Date();
  return AREAS.map((area) => {
    const slots: ShedSlot[] = [];
    if (stage <= 0) {
      return { ...area, slots };
    }
    for (let hour = 0; hour < 36; hour += 1) {
      const start = new Date(now.getTime() + hour * 3600000);
      const blockHour = (start.getHours() + area.block) % 12;
      const hits = blockHour < stage;
      if (hits && start.getHours() % 2 === area.block % 2) {
        const end = new Date(start.getTime() + 2.5 * 3600000);
        slots.push({
          day: dayLabel(start),
          start: slotLabel(start),
          end: slotLabel(end),
        });
      }
    }
    return { ...area, slots: slots.slice(0, 4) };
  });
}

export function stageCopy(stage: number) {
  if (stage <= 0) {
    return {
      headline: "No national load shedding",
      detail: "Eskom is not currently shedding. Local outages can still happen.",
    };
  }
  return {
    headline: `Stage ${stage} in force`,
    detail: `National load shedding is on Stage ${stage}. Check your block below and share the alert.`,
  };
}
