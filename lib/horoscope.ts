export const SIGNS = [
  { slug: "aries", name: "Aries", dates: "21 Mar – 19 Apr" },
  { slug: "taurus", name: "Taurus", dates: "20 Apr – 20 May" },
  { slug: "gemini", name: "Gemini", dates: "21 May – 20 Jun" },
  { slug: "cancer", name: "Cancer", dates: "21 Jun – 22 Jul" },
  { slug: "leo", name: "Leo", dates: "23 Jul – 22 Aug" },
  { slug: "virgo", name: "Virgo", dates: "23 Aug – 22 Sep" },
  { slug: "libra", name: "Libra", dates: "23 Sep – 22 Oct" },
  { slug: "scorpio", name: "Scorpio", dates: "23 Oct – 21 Nov" },
  { slug: "sagittarius", name: "Sagittarius", dates: "22 Nov – 21 Dec" },
  { slug: "capricorn", name: "Capricorn", dates: "22 Dec – 19 Jan" },
  { slug: "aquarius", name: "Aquarius", dates: "20 Jan – 18 Feb" },
  { slug: "pisces", name: "Pisces", dates: "19 Feb – 20 Mar" },
];

const LINES = [
  "A message from Johannesburg lands before lunch. Answer it.",
  "Hold your tongue in the family group chat. The truth can wait until tonight.",
  "Money moves if you send the invoice before 15:00.",
  "A pothole, a delay, a blessing in disguise. Take the long way home.",
  "Someone at work is watching how you handle the small thing.",
  "Load shedding or not, light a candle and finish the conversation.",
  "Do not lend what you cannot lose. The rand is not the only thing that swings.",
  "A provincial story becomes personal. Listen twice.",
  "Luck sits in a queue at Home Affairs. Take water and patience.",
  "The person you avoided is the one with the useful number.",
];

function hash(input: string) {
  let value = 0;
  for (let i = 0; i < input.length; i += 1) value = (value * 31 + input.charCodeAt(i)) >>> 0;
  return value;
}

export function dailyHoroscopes() {
  const day = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Johannesburg" }).format(new Date());
  return SIGNS.map((sign) => {
    const n = hash(`${day}:${sign.slug}`);
    return {
      ...sign,
      line: LINES[n % LINES.length],
      mood: ["Steady", "Electric", "Careful", "Lucky", "Restless"][n % 5],
    };
  });
}
