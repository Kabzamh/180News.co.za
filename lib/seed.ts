import { eq } from "drizzle-orm";
import { db } from "@/db";
import {
  articles,
  authors,
  categories,
  comments,
  provinces,
} from "@/db/schema";

function hoursAgo(hours: number) {
  return new Date(Date.now() - hours * 60 * 60 * 1000);
}

const AUTHOR_SEED = [
  {
    name: "Thandiwe Mokoena",
    slug: "thandiwe-mokoena",
    title: "Editor-in-Chief",
    bio: "Thandiwe leads the 180 Degrees News newsroom from Johannesburg, with two decades covering national politics, public policy and the South African media landscape.",
    avatarInitials: "TM",
    email: "thandiwe@180news.co.za",
  },
  {
    name: "Sipho Dlamini",
    slug: "sipho-dlamini",
    title: "Political Editor",
    bio: "Sipho reports on Parliament, the Government of National Unity and provincial power-sharing from Cape Town and Pretoria.",
    avatarInitials: "SD",
    email: "sipho@180news.co.za",
  },
  {
    name: "Ayesha Patel",
    slug: "ayesha-patel",
    title: "Business Editor",
    bio: "Ayesha covers markets, mining, energy and the rand from the Sandton financial district.",
    avatarInitials: "AP",
    email: "ayesha@180news.co.za",
  },
  {
    name: "Lebo Nkosi",
    slug: "lebo-nkosi",
    title: "Provincial Correspondent",
    bio: "Lebo travels the nine provinces, reporting on premiers, metros and the stories that sit between national headlines and local government.",
    avatarInitials: "LN",
    email: "lebo@180news.co.za",
  },
  {
    name: "James van der Merwe",
    slug: "james-van-der-merwe",
    title: "International Affairs Editor",
    bio: "James reports on South Africa's place in the world, from the African Union and BRICS to Washington, Beijing and Geneva.",
    avatarInitials: "JM",
    email: "james@180news.co.za",
  },
  {
    name: "Nomsa Khumalo",
    slug: "nomsa-khumalo",
    title: "Sport Editor",
    bio: "Nomsa covers Bafana Bafana, the Springboks, the Proteas and the provincial leagues that keep the country talking over weekends.",
    avatarInitials: "NK",
    email: "nomsa@180news.co.za",
  },
  {
    name: "Michael Botha",
    slug: "michael-botha",
    title: "Crime and Justice Reporter",
    bio: "Michael reports on SAPS, the NPA and community safety from Johannesburg's courts and police precincts.",
    avatarInitials: "MB",
    email: "michael@180news.co.za",
  },
  {
    name: "Zanele Radebe",
    slug: "zanele-radebe",
    title: "Health and Society Editor",
    bio: "Zanele writes on public health, education, climate and the daily lives of South Africans beyond the political briefing room.",
    avatarInitials: "ZR",
    email: "zanele@180news.co.za",
  },
];

const CATEGORY_SEED = [
  {
    name: "National",
    slug: "national",
    description: "The big South African stories that shape the republic.",
    scope: "national",
  },
  {
    name: "Provincial",
    slug: "provincial",
    description: "News from all nine provinces, reported from the ground.",
    scope: "provincial",
  },
  {
    name: "International",
    slug: "international",
    description: "World affairs and Africa's place on the global stage.",
    scope: "international",
  },
  {
    name: "Politics",
    slug: "politics",
    description: "Parliament, parties, policy and the contest for power.",
    scope: "topic",
  },
  {
    name: "Business",
    slug: "business",
    description: "Markets, mining, energy, jobs and the South African economy.",
    scope: "topic",
  },
  {
    name: "Sport",
    slug: "sport",
    description: "Football, rugby, cricket and the stories behind the scoreboard.",
    scope: "topic",
  },
  {
    name: "Opinion",
    slug: "opinion",
    description: "Analysis and argument from the 180 Degrees News desk.",
    scope: "topic",
  },
  {
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Culture, travel, food and the South African way of life.",
    scope: "topic",
  },
  {
    name: "Health",
    slug: "health",
    description: "Hospitals, public health and the state of care.",
    scope: "topic",
  },
  {
    name: "Crime",
    slug: "crime",
    description: "Justice, policing and community safety.",
    scope: "topic",
  },
];

const PROVINCE_SEED = [
  {
    name: "Gauteng",
    slug: "gauteng",
    capital: "Johannesburg",
    blurb: "South Africa's economic heartland and the home of 180 Degrees News.",
  },
  {
    name: "Western Cape",
    slug: "western-cape",
    capital: "Cape Town",
    blurb: "Parliament, Table Mountain and the country's legislative capital.",
  },
  {
    name: "KwaZulu-Natal",
    slug: "kwazulu-natal",
    capital: "Pietermaritzburg",
    blurb: "The coastal province of Durban, ports, politics and sugar lands.",
  },
  {
    name: "Eastern Cape",
    slug: "eastern-cape",
    capital: "Bhisho",
    blurb: "A province of motor manufacturing, coastline and rural towns.",
  },
  {
    name: "Free State",
    slug: "free-state",
    capital: "Bloemfontein",
    blurb: "The judicial capital and the agricultural centre of the highveld.",
  },
  {
    name: "Limpopo",
    slug: "limpopo",
    capital: "Polokwane",
    blurb: "Mining, farming and the northern gateway to the rest of Africa.",
  },
  {
    name: "Mpumalanga",
    slug: "mpumalanga",
    capital: "Mbombela",
    blurb: "Coal country, waterfalls and the Kruger National Park.",
  },
  {
    name: "North West",
    slug: "north-west",
    capital: "Mahikeng",
    blurb: "Platinum, sun and the towns that keep the mining belt turning.",
  },
  {
    name: "Northern Cape",
    slug: "northern-cape",
    capital: "Kimberley",
    blurb: "South Africa's largest province by land, sparse and mineral-rich.",
  },
];

type ArticleSeed = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  author: string;
  province?: string;
  scope: "national" | "provincial" | "international";
  isBreaking?: boolean;
  isFeatured?: boolean;
  hoursAgo: number;
  views: number;
  readingMinutes: number;
};

const ARTICLE_SEED: ArticleSeed[] = [
  {
    title: "GNU leaders meet in Pretoria as budget talks enter a decisive week",
    slug: "gnu-leaders-meet-pretoria-budget-talks",
    excerpt:
      "Party principals in the Government of National Unity gather in Pretoria to settle remaining disputes over spending, state-owned enterprises and the medium-term budget.",
    content: `JOHANNESBURG — Leaders of the Government of National Unity convened in Pretoria on Monday for what officials described as a decisive round of talks on the national budget, with disagreements over public-sector wages, infrastructure spending and the future of several state-owned companies still unresolved.

The meeting, held at the Union Buildings, brought together senior figures from the largest parties in the coalition. A presidency official said the session was intended to “lock in a common fiscal path” before the finance minister returns to Parliament.

“South Africans expect a government that can argue in private and govern in public,” said political editor Sipho Dlamini after the briefing. “The test this week is whether the GNU can produce a budget that holds, not a statement that unravels by Friday.”

Treasury officials have warned that any last-minute additions to the wage bill would force cuts elsewhere, including planned rail and water projects. Opposition parties outside the GNU have already prepared a motion criticising what they call “budget by closed-door bargaining”.

For households watching from Johannesburg to Gqeberha, the outcome will be felt in municipal grants, SASSA payments and the pace of road and clinic repairs. 180 Degrees News will carry the full briefing once principals emerge.`,
    imageUrl:
      "https://images.pexels.com/photos/33622126/pexels-photo-33622126.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "Johannesburg skyline with the Hillbrow Tower on a clear day",
    category: "politics",
    author: "sipho-dlamini",
    scope: "national",
    isBreaking: true,
    isFeatured: true,
    hoursAgo: 3,
    views: 18420,
    readingMinutes: 5,
  },
  {
    title: "Eskom holds the line: no load shedding scheduled as winter plan is tabled",
    slug: "eskom-winter-plan-no-load-shedding",
    excerpt:
      "The power utility says improved generation performance and new private capacity have kept the grid stable, but warns that a cold snap could still test reserves.",
    content: `JOHANNESBURG — Eskom said on Tuesday that no load shedding is currently scheduled, as the utility tabled its winter outlook before Parliament's public enterprises committee.

Officials pointed to fewer unplanned outages at several coal stations and a growing contribution from independent power producers. The system operator said emergency reserves were “adequate for a typical winter week”, but not for a prolonged cold front combined with unit trips.

Business groups in Sandton welcomed the statement, saying a more predictable grid has already lifted factory planning and retail hours. “Stability is not the same as surplus,” said a manufacturing association spokesperson. “We need the winter plan to survive July, not just a press conference in March.”

Labour unions cautioned against declaring victory. They argued that maintenance backlogs and municipal debt remain the larger story, and that households in townships still face local outages that never appear on the national stage.

Energy analysts told 180 Degrees News that the next 90 days will show whether the improvement is structural or seasonal. The newsroom will publish the full winter outlook document with the evening bulletin.`,
    imageUrl:
      "https://images.pexels.com/photos/33187753/pexels-photo-33187753.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "Lightning over the Johannesburg skyline at night",
    category: "national",
    author: "ayesha-patel",
    scope: "national",
    isBreaking: true,
    hoursAgo: 5,
    views: 15210,
    readingMinutes: 4,
  },
  {
    title: "City of Johannesburg tables emergency plan for water and pothole backlog",
    slug: "city-of-johannesburg-water-pothole-plan",
    excerpt:
      "The metro says it will ring-fence funds for leaking reservoirs, burst mains and a 90-day blitz on major arterials after weeks of resident protests.",
    content: `JOHANNESBURG — The City of Johannesburg has tabled an emergency service-delivery plan focused on water losses and the pothole crisis that has snarled traffic from Soweto to Sandton.

Mayor's office officials said the metro would create a dedicated works unit with night shifts on the M1, N1 ramps and township connectors. A water team will start with the worst-performing reservoirs after engineers reported losses well above the national average.

Residents' associations in Alexandra, Roodepoort and the southern suburbs said they would measure the plan by tankers that stop arriving and roads that stay repaired. “We have heard 90-day promises before,” said a community leader in Diepsloot. “We want pressure in the taps on a Thursday night.”

Opposition councillors argued the real problem is billing, vacancies and contractors who are paid before work is certified. The city says it will publish a weekly dashboard of jobs completed.

180 Degrees News, based in Johannesburg, will track the first 30 days of the blitz ward by ward.`,
    imageUrl:
      "https://images.pexels.com/photos/33622143/pexels-photo-33622143.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "Aerial view of the Sandton skyline in Gauteng",
    category: "provincial",
    author: "lebo-nkosi",
    province: "gauteng",
    scope: "provincial",
    isBreaking: true,
    hoursAgo: 7,
    views: 12104,
    readingMinutes: 4,
  },
  {
    title: "Rand steadies as investors weigh mining output and the GNU budget",
    slug: "rand-steadies-mining-output-gnu-budget",
    excerpt:
      "The currency found a floor against the dollar after better-than-expected platinum and iron-ore shipments, even as political risk remains priced in.",
    content: `JOHANNESBURG — The rand held its ground on Wednesday as traders digested stronger mining export data and waited for clarity from the Government of National Unity's budget talks.

Economists in Sandton said the currency is being pulled in two directions: firmer commodity receipts on one side, and lingering uncertainty about fiscal discipline on the other. “The market will fund a grown-up budget,” said one desk strategist. “It will punish a political one.”

The JSE's resources index advanced, led by diversified miners, while banks were mixed as bond yields drifted. Retailers reported that imported stock lead times have shortened slightly as the exchange rate settled.

Labour and civil-society groups warned that a stronger rand on a dealing screen does not automatically mean cheaper food in Orange Farm or cheaper diesel in Musina. They called for the budget to protect the social wage.

Ayesha Patel reports that several asset managers have kept a modest overweight on South African bonds, contingent on the finance minister's speech later this week.`,
    imageUrl:
      "https://images.pexels.com/photos/7876499/pexels-photo-7876499.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "Analyst presenting financial charts in a boardroom",
    category: "business",
    author: "ayesha-patel",
    scope: "national",
    hoursAgo: 8,
    views: 9340,
    readingMinutes: 4,
  },
  {
    title: "Cape Town housing pipeline expands as province and metro sign land deal",
    slug: "cape-town-housing-pipeline-land-deal",
    excerpt:
      "The Western Cape government and the City of Cape Town have agreed to release well-located parcels for mixed-income housing along existing transport corridors.",
    content: `CAPE TOWN — The Western Cape government and the City of Cape Town signed a land-release agreement aimed at unlocking thousands of mixed-income homes closer to jobs and rail.

Officials said the first parcels sit near existing MyCiTi and rail corridors, with a mix of social housing, gap housing and open-market units. Civic groups welcomed the principle but demanded a public list of sites and a clear anti-eviction protocol.

“Location is the policy,” said a provincial human-settlements official. “If we keep building on the edge, we rebuild apartheid geography with new bricks.”

Opposition parties argued that the announcement recycles land that has been “about to be released” for years. They want construction start dates, not ceremonies at the civic centre.

Lebo Nkosi reports that community organisations in Khayelitsha, Delft and the inner city will be invited to a first consultation next week. 180 Degrees News will publish the site list when it is tabled.`,
    imageUrl:
      "https://images.pexels.com/photos/36597753/pexels-photo-36597753.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "Table Mountain rising above Cape Town",
    category: "provincial",
    author: "lebo-nkosi",
    province: "western-cape",
    scope: "provincial",
    hoursAgo: 11,
    views: 8122,
    readingMinutes: 4,
  },
  {
    title: "Durban port night shift returns as Transnet targets export backlog",
    slug: "durban-port-night-shift-export-backlog",
    excerpt:
      "A restored night shift at the Pier 2 container terminal is meant to clear a queue of vessels and restore confidence among sugar, auto and citrus exporters.",
    content: `DURBAN — Transnet has restored a full night shift at Durban's Pier 2 container terminal in a bid to cut vessel waiting times that have frustrated exporters across KwaZulu-Natal.

Port managers said additional gangs and equipment borrowed from other terminals would run through the week. Shipping lines reported a modest improvement in berth productivity overnight, though a queue remains offshore.

Auto manufacturers in the province and citrus growers inland said reliability matters more than a single good night. “If a ship misses its window, the fruit misses the market,” said a packhouse manager in the Midlands.

Unions said they would support the extra shift if safety staff and overtime were properly rostered. They pointed to previous speed-ups that ended in equipment breakdowns.

The provincial government called the move necessary but not sufficient, repeating its demand for a long-term concession model that still keeps the port in public hands.`,
    imageUrl:
      "https://images.pexels.com/photos/11311706/pexels-photo-11311706.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "Durban beach at sunset with silhouettes along the shore",
    category: "provincial",
    author: "lebo-nkosi",
    province: "kwazulu-natal",
    scope: "provincial",
    hoursAgo: 14,
    views: 7455,
    readingMinutes: 4,
  },
  {
    title: "Pretoria hosts AU envoys as South Africa prepares continental briefing",
    slug: "pretoria-hosts-au-envoys-continental-briefing",
    excerpt:
      "African Union special envoys are in Pretoria for talks on peace missions, climate finance and the reform of multilateral institutions ahead of a mid-year summit.",
    content: `PRETORIA — African Union special envoys arrived in Pretoria this week for a closed briefing with the Department of International Relations and Cooperation, covering peace support missions, climate finance and the long-running push to reform global institutions.

Diplomats said South Africa would argue for predictable funding of African-led peace operations and a stronger continental voice in debt talks. Several envoys also raised the security situation in the eastern DRC and the need for a single African position before the next UN debate.

“This is not ceremony,” said an official familiar with the agenda. “It is about whether African states arrive at the next summit with one text or nine.”

Civil-society observers asked DIRCO to publish a public summary after the meetings, arguing that foreign policy cannot live only in communiqués.

James van der Merwe reports that a joint statement is expected before the weekend. 180 Degrees News will carry the text in full.`,
    imageUrl:
      "https://images.pexels.com/photos/16459372/pexels-photo-16459372.png?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "International flags outside a United Nations office",
    category: "international",
    author: "james-van-der-merwe",
    scope: "international",
    hoursAgo: 9,
    views: 6880,
    readingMinutes: 5,
  },
  {
    title: "Washington and Pretoria reopen trade talks after a frosty quarter",
    slug: "washington-pretoria-reopen-trade-talks",
    excerpt:
      "Officials say technical talks on AGOA-related access, poultry and automotive rules of origin are back on the calendar after months of public sniping.",
    content: `JOHANNESBURG — South African and United States officials have quietly restored a calendar of technical trade talks, after a quarter in which public rhetoric outpaced negotiation.

People familiar with the discussions said the agenda includes AGOA-related market access, sanitary rules for poultry and citrus, and automotive rules of origin that affect plants in Gauteng and the Eastern Cape.

Business organisations urged both capitals to separate commercial files from wider geopolitical arguments. “Factories cannot wait for a better mood in Washington or Pretoria,” said a motor-industry representative.

Foreign-policy analysts cautioned that a technical track can still be overturned by a single speech. They said South Africa would need a disciplined message that defends its non-aligned posture without surprising investors.

The Department of Trade, Industry and Competition said it would brief exporters once dates are confirmed. 180 Degrees News will report from both the Sandton briefings and the diplomatic circuit.`,
    imageUrl:
      "https://images.pexels.com/photos/15965251/pexels-photo-15965251.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "A field of national flags representing international diplomacy",
    category: "international",
    author: "james-van-der-merwe",
    scope: "international",
    isFeatured: true,
    hoursAgo: 16,
    views: 10221,
    readingMinutes: 5,
  },
  {
    title: "Bafana Bafana camp named as World Cup qualifying stretch begins",
    slug: "bafana-bafana-camp-world-cup-qualifying",
    excerpt:
      "The national coach has named a 23-player camp mixing overseas-based regulars with in-form PSL names ahead of two decisive qualifiers.",
    content: `JOHANNESBURG — Bafana Bafana's coach named a 23-player camp on Thursday, blending established overseas professionals with Premier Soccer League players in form, as South Africa enters a decisive stretch of World Cup qualifying.

The squad will assemble in Johannesburg before travelling. Support staff said the emphasis is on set-pieces and a more compact midfield after mixed results at home.

Fans outside FNB Stadium and in taverns from Tembisa to Cape Town argued over inclusions and omissions within minutes of the announcement. “This is the camp that must finish the job,” said a supporters' club chair in Soweto.

PSL clubs asked SAFA to manage minutes carefully, with several players still in cup competitions. The coach said availability, not reputation, decided the last two places.

Nomsa Khumalo will have reaction from the first training session and a full tactical briefing in Friday's bulletin.`,
    imageUrl:
      "https://images.pexels.com/photos/3892895/pexels-photo-3892895.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "A packed football stadium crowd during a match",
    category: "sport",
    author: "nomsa-khumalo",
    scope: "national",
    hoursAgo: 6,
    views: 14002,
    readingMinutes: 3,
  },
  {
    title: "Springbok leadership group meets in Cape Town before mid-year Tests",
    slug: "springbok-leadership-group-cape-town",
    excerpt:
      "Senior players and coaching staff are mapping a rotation plan that balances franchise demands with the mid-year international window.",
    content: `CAPE TOWN — The Springbok leadership group met in Cape Town to sketch a rotation plan for the mid-year Tests, with franchise coaches also in the room for the first time this season.

Management said the aim is to keep a core of experienced players available while giving form players from the URC a clean shot at selection. Medical staff presented a workload model after a bruising club season.

Provincial unions welcomed the consultation, saying previous cycles left too many decisions to last-minute medicals. “We can live with rotation if we can plan for it,” said one franchise director.

Supporters will watch the first squad announcement for clues about the flyhalf jersey and the loose-forward balance. Nomsa Khumalo reports that no names were confirmed on the day.

180 Degrees News will publish the squad the hour it drops.`,
    imageUrl:
      "https://images.pexels.com/photos/30651230/pexels-photo-30651230.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "An illuminated stadium at night packed with spectators",
    category: "sport",
    author: "nomsa-khumalo",
    province: "western-cape",
    scope: "national",
    hoursAgo: 20,
    views: 8760,
    readingMinutes: 3,
  },
  {
    title: "SAPS launches high-density operation after weekend hijacking spike",
    slug: "saps-high-density-operation-hijacking-spike",
    excerpt:
      "Police have flooded identified corridors in Johannesburg, Ekurhuleni and Tshwane after a rise in hijackings reported over the weekend.",
    content: `JOHANNESBURG — The South African Police Service launched a high-density operation across identified corridors in Johannesburg, Ekurhuleni and Tshwane after a weekend spike in hijackings.

Provincial commissioners said extra vehicles, highway patrols and tracing teams would remain in place for 14 days. Several suspects were already in custody by Monday morning, police said, though charges had not yet been put on the roll.

Community policing forums asked for visible patrols at taxi ranks and school drop-off points, not only on highways. “The fear is at the intersection, not in the press conference,” said a CPF chair in the south of Johannesburg.

Civil-rights lawyers said they would monitor the operation for profiling and unlawful roadblocks. SAPS insisted stops would be intelligence-led.

Michael Botha reports that 180 Degrees News has requested the weekend incident log and will update this story as court appearances are set.`,
    imageUrl:
      "https://images.pexels.com/photos/1023759/pexels-photo-1023759.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "A Johannesburg street scene at dusk with traffic and towers",
    category: "crime",
    author: "michael-botha",
    province: "gauteng",
    scope: "national",
    isBreaking: true,
    hoursAgo: 4,
    views: 16770,
    readingMinutes: 4,
  },
  {
    title: "Clinic queues shorten in three metros after nurse overtime deal",
    slug: "clinic-queues-shorten-nurse-overtime-deal",
    excerpt:
      "A temporary overtime agreement in Johannesburg, eThekwini and Nelson Mandela Bay has added evening clinics for chronic medication and maternal care.",
    content: `JOHANNESBURG — Evening clinics have reopened in parts of Johannesburg, eThekwini and Nelson Mandela Bay after a temporary overtime agreement with nurses' unions, and early numbers show shorter queues for chronic medication.

Health MECs said the deal is funded for one quarter and will be reviewed against attendance data. Patients interviewed outside a Soweto clinic said they could collect medicine after work for the first time in months.

Unions described the agreement as a bridge, not a solution. They want funded posts, not perpetual overtime, and safer night transport for staff.

Doctors' groups welcomed the relief but warned that medicine stock-outs would erase the gain. “A shorter queue for an empty shelf is not a reform,” said a general practitioner in New Brighton.

Zanele Radebe will track waiting times at six sentinel clinics for the rest of the quarter.`,
    imageUrl:
      "https://images.pexels.com/photos/6129450/pexels-photo-6129450.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "Healthcare workers speaking in a hospital corridor",
    category: "health",
    author: "zanele-radebe",
    scope: "national",
    hoursAgo: 18,
    views: 5990,
    readingMinutes: 4,
  },
  {
    title: "Kruger tourism rebound lifts Mpumalanga towns, with a conservation caveat",
    slug: "kruger-tourism-rebound-mpumalanga",
    excerpt:
      "Occupancy in camps and nearby towns has recovered, but rangers warn that the same roads bringing visitors also bring new pressure on wildlife corridors.",
    content: `MBOMBELA — Tourism around Kruger National Park has rebounded, with camps and nearby towns reporting stronger occupancy and fuller craft markets, according to provincial figures released this week.

Lodge owners in Hazyview and Hoedspruit said international bookings have returned, especially from Europe and the rest of Africa. Local guides reported longer seasons and more school groups from Gauteng.

SANParks and provincial rangers cautioned that busier roads and after-hours traffic are stressing wildlife corridors. They want slower speed enforcement and a clearer plan for buffer-zone development.

Community trusts said more of the takings must stay in villages that border the park. “We cannot only be in the brochure,” said a trust chair east of the park.

180 Degrees News travelled the R40 for this report and will publish a photo essay in the weekend lifestyle section.`,
    imageUrl:
      "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "African elephants walking through Kruger National Park",
    category: "lifestyle",
    author: "zanele-radebe",
    province: "mpumalanga",
    scope: "provincial",
    hoursAgo: 26,
    views: 7011,
    readingMinutes: 4,
  },
  {
    title: "Eastern Cape motor plants add a third shift as export orders return",
    slug: "eastern-cape-motor-plants-third-shift",
    excerpt:
      "Two vehicle plants in the Eastern Cape will add night work after a recovery in European and African orders, creating several hundred contract jobs.",
    content: `GQEBERHA — Two vehicle plants in the Eastern Cape will introduce a third shift from next month after a recovery in export orders to Europe and the rest of Africa, companies confirmed on Tuesday.

The additional night work is expected to create several hundred contract jobs in Gqeberha and surrounding supplier parks. Unions said they would sign roster agreements if transport and canteen facilities match the day shift.

Provincial officials called the announcement a rare piece of good industrial news and promised to fast-track skills placements from local TVET colleges.

Economists noted that the plants remain exposed to shipping delays at Ngqura and to any change in trade rules with the United States and the European Union.

Ayesha Patel reports that supplier firms in Uitenhage have already begun advertising for quality controllers and welders.`,
    imageUrl:
      "https://images.pexels.com/photos/7693745/pexels-photo-7693745.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "Colleagues reviewing business graphs in a meeting",
    category: "business",
    author: "ayesha-patel",
    province: "eastern-cape",
    scope: "provincial",
    hoursAgo: 22,
    views: 5440,
    readingMinutes: 3,
  },
  {
    title: "Free State harvest outlook improves after late summer rains",
    slug: "free-state-harvest-outlook-late-rains",
    excerpt:
      "Maize and sunflower farmers in the Free State say late rains have lifted yield expectations, though input costs remain painfully high.",
    content: `BLOEMFONTEIN — Late summer rains have improved the harvest outlook across much of the Free State, with maize and sunflower farmers reporting better kernel fill than they dared expect in January.

Organised agriculture said the recovery is uneven: some western districts remain dry, and input costs for fertiliser and diesel continue to squeeze margins.

A grain silo manager near Bothaville said intakes could beat last year if the next three weeks stay kind. “We are not celebrating yet. We are measuring,” he said.

The provincial government pledged to keep rural roads open for the harvest fleet, after last year's complaints about impassable gravel.

Food-price analysts told 180 Degrees News that a decent Free State crop would ease some pressure on maize meal, but not immediately and not evenly.`,
    imageUrl:
      "https://images.pexels.com/photos/33621914/pexels-photo-33621914.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "An elephant on dry South African savanna grassland",
    category: "provincial",
    author: "lebo-nkosi",
    province: "free-state",
    scope: "provincial",
    hoursAgo: 30,
    views: 4210,
    readingMinutes: 3,
  },
  {
    title: "Limpopo mining belt talks wages as platinum prices firm",
    slug: "limpopo-mining-belt-wage-talks",
    excerpt:
      "Unions and producers in Limpopo's platinum belt have opened wage talks against a firmer price backdrop and a still-fragile safety record.",
    content: `POLOKWANE — Wage talks opened this week on Limpopo's platinum belt, with unions seeking an above-inflation settlement and producers warning that price strength can reverse quickly.

Shop stewards said housing allowances and underground safety would sit beside the basic wage on the table. Companies pointed to capital programmes that they say cannot be paused if South Africa wants to stay in the market.

Community forums around mining towns asked to be formally consulted, arguing that municipal services collapse whenever a shaft sneezes.

Ayesha Patel reports that both sides have agreed to a media blackout on numbers for 14 days. 180 Degrees News will report any official statement the hour it is issued.`,
    imageUrl:
      "https://images.pexels.com/photos/7876494/pexels-photo-7876494.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "A woman explaining market charts on a whiteboard",
    category: "business",
    author: "ayesha-patel",
    province: "limpopo",
    scope: "provincial",
    hoursAgo: 28,
    views: 3980,
    readingMinutes: 3,
  },
  {
    title: "North West premier vows audit of unfinished municipal projects",
    slug: "north-west-premier-audit-municipal-projects",
    excerpt:
      "Unfinished clinics, sports grounds and water schemes will be listed, costed and either completed or cancelled, the premier said in Mahikeng.",
    content: `MAHIKENG — The North West premier has ordered a province-wide audit of unfinished municipal projects, from clinics and sports grounds to water schemes that have stood half-built for years.

Officials said every project will be listed, costed and either completed, redesigned or cancelled within a published timetable. Opposition parties welcomed the principle and demanded the list be tabled in the legislature, not only in a media briefing.

Residents in several towns told 180 Degrees News they would believe the audit when a contractor returns to site. “The foundation has been a monument to nothing,” said a school governing-body member beside an incomplete hall.

Treasury officials warned that some contracts may have to be set aside if procurement was irregular, which could delay rather than speed completion.

Lebo Nkosi will publish the first batch of project names when the premier's office releases them.`,
    imageUrl:
      "https://images.pexels.com/photos/34132082/pexels-photo-34132082.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "Aerial view of a South African cityscape at dusk",
    category: "provincial",
    author: "lebo-nkosi",
    province: "north-west",
    scope: "provincial",
    hoursAgo: 34,
    views: 3555,
    readingMinutes: 4,
  },
  {
    title: "Northern Cape solar corridor attracts new independent producers",
    slug: "northern-cape-solar-corridor-producers",
    excerpt:
      "Two independent producers have reached financial close on solar plants in the Northern Cape, adding to the country's renewable backbone.",
    content: `KIMBERLEY — Two independent power producers have reached financial close on solar plants in the Northern Cape, adding hundreds of megawatts to a corridor that already carries a large share of South Africa's renewable fleet.

Developers said construction jobs would peak within nine months, with a smaller permanent operations staff thereafter. Local municipalities asked for skills plans that outlast the build.

Grid-connection capacity remains the binding constraint, Eskom's system operator has previously warned. The new plants are sited where there is still headroom, officials said.

Community trusts negotiated a share of revenues for education bursaries and small-business grants. “We have seen plants rise and towns stay poor,” said a civic leader near a planned site. “This time the paper must be public.”

180 Degrees News will map the corridor in a weekend explainer.`,
    imageUrl:
      "https://images.pexels.com/photos/30528275/pexels-photo-30528275.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "A dramatic lightning strike over a South African landscape",
    category: "national",
    author: "ayesha-patel",
    province: "northern-cape",
    scope: "national",
    hoursAgo: 40,
    views: 4890,
    readingMinutes: 4,
  },
  {
    title: "Opinion: South Africa needs a 180-degree look at local government",
    slug: "opinion-180-degree-look-local-government",
    excerpt:
      "The crisis in metros and smaller municipalities is no longer a side story. It is the story, writes Editor-in-Chief Thandiwe Mokoena.",
    content: `JOHANNESBURG — If you live in this country, you do not experience the state first as a Cabinet statement. You experience it as a tap, a robot, a clinic card and a pothole that eats a wheel.

That is why 180 Degrees News will keep a permanent desk on local government. National politics matters. So do the provinces. But the republic is won or lost in the metro and the dorp.

A 180-degree view means looking at the same story from the council chamber and from the queue. It means naming the contractor and the official, and it means returning to the site 30 days later.

Coalitions are not an excuse for darkness. If parties can share a Cabinet, they can publish a pothole dashboard. If they cannot, voters should be told plainly.

Our Johannesburg newsroom will keep the lights on this beat. Send us the photograph, the invoice and the ward number. The bulletin is only as honest as the ground it covers.`,
    imageUrl:
      "https://images.pexels.com/photos/7618405/pexels-photo-7618405.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "A journalist holding a newspaper in a newsroom",
    category: "opinion",
    author: "thandiwe-mokoena",
    scope: "national",
    hoursAgo: 12,
    views: 11240,
    readingMinutes: 4,
  },
  {
    title: "BRICS sherpas meet in Johannesburg to draft leaders' language on debt",
    slug: "brics-sherpas-johannesburg-debt-language",
    excerpt:
      "Officials from BRICS members are in Johannesburg to negotiate language on debt relief, local-currency trade and development-bank lending.",
    content: `JOHANNESBURG — Sherpas from BRICS member states are meeting in Johannesburg this week to draft leaders' language on debt relief, local-currency settlement and the next round of development-bank lending.

South African officials said the talks are technical and that no communiqué would be issued until capitals sign off. Delegates from several countries were seen entering a Sandton venue under tight security.

Economists said any practical progress on local-currency trade would matter more to South African exporters than a rhetorical paragraph on multipolarity.

Civil-society groups asked for transparency on whether new lending would carry climate and human-rights conditions.

James van der Merwe reports that a slim working draft is already in circulation among officials. 180 Degrees News has not seen the text.`,
    imageUrl:
      "https://images.pexels.com/photos/6950230/pexels-photo-6950230.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "An official speaking to the media in a conference setting",
    category: "international",
    author: "james-van-der-merwe",
    province: "gauteng",
    scope: "international",
    hoursAgo: 10,
    views: 6330,
    readingMinutes: 4,
  },
  {
    title: "Gautrain ridership climbs as commuters return to Sandton and Rosebank",
    slug: "gautrain-ridership-sandton-rosebank",
    excerpt:
      "Weekday ridership on the Gautrain has climbed as more firms enforce hybrid office weeks, putting pressure on parking and feeder buses.",
    content: `JOHANNESBURG — Weekday ridership on the Gautrain has climbed to its strongest level in years as more companies in Sandton, Rosebank and Pretoria enforce hybrid office weeks.

Bombela and provincial officials said peak trains are filling earlier, and feeder buses are being retimed. Parking at several stations is now routinely full before 07:30.

Commuters told 180 Degrees News they welcome the reliability compared with other options, but want better last-mile links into townships and the CBD. “The train works. Getting to the train is the story,” said a passenger at Rhodesfield.

Opposition MPLs said any expansion talk must wait until the current system's maintenance is fully funded. The province said a long-term plan would be published this year.

The story of Johannesburg's working day is once again being written on that rail spine.`,
    imageUrl:
      "https://images.pexels.com/photos/33622130/pexels-photo-33622130.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "Aerial view of Sandton skyline in Gauteng",
    category: "national",
    author: "lebo-nkosi",
    province: "gauteng",
    scope: "national",
    hoursAgo: 15,
    views: 7220,
    readingMinutes: 3,
  },
  {
    title: "Lifestyle: A weekend map of Joburg's independent bookshops and jazz rooms",
    slug: "lifestyle-joburg-bookshops-jazz-rooms",
    excerpt:
      "From Melville to Maboneng, a guide to the rooms where Johannesburg still argues, reads and plays after dark.",
    content: `JOHANNESBURG — This city does not only make headlines. It makes rooms: bookshops that stay open through load-reduced evenings, jazz corners that keep a trio fed, and courtyards where poets test a line on strangers.

Our lifestyle desk walked Melville, Westdene, Braamfontein and Maboneng to map a weekend that does not require a boarding pass. The list is not exhaustive and it is not sponsored.

Start with an independent bookshop that still hand-sells local politics and new fiction. Cross the city for a late set. End with a plate that remembers someone grandmother's recipe.

180 Degrees News will keep this map alive as a living list. Write to lifestyle@180news.co.za if we missed your room.

The republic is argued in Parliament. It is also argued over a paperback and a borrowed trumpet.`,
    imageUrl:
      "https://images.pexels.com/photos/7876442/pexels-photo-7876442.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "A reader with a newspaper at a cafe table",
    category: "lifestyle",
    author: "zanele-radebe",
    province: "gauteng",
    scope: "national",
    hoursAgo: 36,
    views: 5104,
    readingMinutes: 3,
  },
  {
    title: "NPA signals more state-capture prosecutions before year-end",
    slug: "npa-more-state-capture-prosecutions",
    excerpt:
      "The National Prosecuting Authority says additional dockets arising from the Zondo commission are close to enrolment, after years of public frustration.",
    content: `JOHANNESBURG — The National Prosecuting Authority said additional prosecutions arising from the state-capture commission are expected to be enrolled before the end of the year, in a briefing that sought to answer years of public frustration.

Officials would not name targets. They said several dockets had cleared remaining mutual-legal-assistance hurdles. Defence lawyers already on related matters said they would oppose any attempt to try cases in the media.

Opposition parties called the statement overdue and asked for a public scoreboard of commission referrals, completed prosecutions and abandoned files.

Michael Botha reports that civil-society monitors will hold a separate briefing on Friday with their own count. 180 Degrees News will compare the two lists.`,
    imageUrl:
      "https://images.pexels.com/photos/32266769/pexels-photo-32266769.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "The interior of a legislative or court-style chamber",
    category: "crime",
    author: "michael-botha",
    scope: "national",
    hoursAgo: 24,
    views: 9801,
    readingMinutes: 4,
  },
  {
    title: "Opinion: The world is not waiting for Pretoria to choose a camp",
    slug: "opinion-world-not-waiting-pretoria-camp",
    excerpt:
      "South Africa's foreign policy will be judged by what it delivers at home, not by how loudly it recites history, writes James van der Merwe.",
    content: `JOHANNESBURG — Every few months Pretoria is invited, sometimes rudely, to pick a jersey. The invitation is a trap. A country of this size and this history cannot outsource its interests to someone else's talking points.

That does not mean vagueness is a strategy. Trade talks, peace missions and climate finance require sentences that can be implemented. A 180-degree foreign policy looks at Washington and Beijing, at Abuja and Brasília, and then looks back at a factory in Kariega and a smallholder in Tzaneen.

If a position cannot be explained in a township hall and a Sandton boardroom, it is not yet a position. It is a posture.

Our international desk will keep translating the communiqués into consequences. Readers can decide whether the republic is being served.`,
    imageUrl:
      "https://images.pexels.com/photos/6950236/pexels-photo-6950236.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "Journalists interviewing an official in a formal setting",
    category: "opinion",
    author: "james-van-der-merwe",
    scope: "international",
    hoursAgo: 32,
    views: 6402,
    readingMinutes: 3,
  },
];

const COMMENT_SEED = [
  {
    article: "gnu-leaders-meet-pretoria-budget-talks",
    name: "Naledi K.",
    email: "naledi@example.com",
    body: "If they cannot agree a budget in public, they should not expect us to believe they can run a country in private.",
  },
  {
    article: "gnu-leaders-meet-pretoria-budget-talks",
    name: "Pieter S.",
    email: "pieter@example.com",
    body: "Please keep a running tracker of what each party is demanding. That would be a public service.",
  },
  {
    article: "eskom-winter-plan-no-load-shedding",
    name: "Ayanda M.",
    email: "ayanda@example.com",
    body: "No load shedding on the app, but our suburb still goes dark when a cable is stolen. Report both stories.",
  },
  {
    article: "city-of-johannesburg-water-pothole-plan",
    name: "Fatima H.",
    email: "fatima@example.com",
    body: "I will believe the 90-day blitz when Jan Smuts has a surface again. Thank you for covering the metro properly.",
  },
  {
    article: "saps-high-density-operation-hijacking-spike",
    name: "Joseph T.",
    email: "joseph@example.com",
    body: "Visible policing helps, but convictions would help more. Follow the dockets, not only the roadblocks.",
  },
];

let seeded = false;
let seedPromise: Promise<void> | null = null;

async function seedIfNeeded() {
  const existing = await db.select({ id: articles.id }).from(articles).limit(1);
  if (existing.length > 0) {
    seeded = true;
    return;
  }

  const insertedAuthors = await db.insert(authors).values(AUTHOR_SEED).returning();
  const insertedCategories = await db.insert(categories).values(CATEGORY_SEED).returning();
  const insertedProvinces = await db.insert(provinces).values(PROVINCE_SEED).returning();

  const authorBySlug = new Map(insertedAuthors.map((row) => [row.slug, row]));
  const categoryBySlug = new Map(insertedCategories.map((row) => [row.slug, row]));
  const provinceBySlug = new Map(insertedProvinces.map((row) => [row.slug, row]));

  const articleRows = ARTICLE_SEED.map((article) => {
    const author = authorBySlug.get(article.author);
    const category = categoryBySlug.get(article.category);
    const province = article.province ? provinceBySlug.get(article.province) : undefined;

    if (!author || !category) {
      throw new Error(`Missing seed relation for ${article.slug}`);
    }

    return {
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      imageUrl: article.imageUrl,
      imageAlt: article.imageAlt,
      categoryId: category.id,
      authorId: author.id,
      provinceId: province?.id,
      scope: article.scope,
      isBreaking: article.isBreaking ?? false,
      isFeatured: article.isFeatured ?? false,
      publishedAt: hoursAgo(article.hoursAgo),
      views: article.views,
      readingMinutes: article.readingMinutes,
    };
  });

  const insertedArticles = await db.insert(articles).values(articleRows).returning();
  const articleBySlug = new Map(insertedArticles.map((row) => [row.slug, row]));

  await db.insert(comments).values(
    COMMENT_SEED.map((comment) => {
      const article = articleBySlug.get(comment.article);
      if (!article) {
        throw new Error(`Missing article for comment ${comment.article}`);
      }
      return {
        articleId: article.id,
        name: comment.name,
        email: comment.email,
        body: comment.body,
      };
    }),
  );

  seeded = true;
}

const DESK_REFRESH = [
  {
    slug: "gnu-leaders-meet-pretoria-budget-talks",
    title: "GNU principals lock a mid-year fiscal pact after overnight Pretoria talks",
    excerpt:
      "Coalition leaders emerged from the Union Buildings this morning with a shared spending envelope, after a late sitting on wages, SOEs and the medium-term budget.",
    hoursAgo: 2,
    isBreaking: true,
    isFeatured: true,
  },
  {
    slug: "eskom-winter-plan-no-load-shedding",
    title: "Eskom: no national load shedding scheduled as spring demand eases",
    excerpt:
      "The system operator said the grid is stable this week, with emergency reserves intact, while warning that a cold snap could still test the plan.",
    hoursAgo: 3,
    isBreaking: true,
  },
  {
    slug: "city-of-johannesburg-water-pothole-plan",
    title: "Joburg publishes first 30-day scorecard on water leaks and pothole blitz",
    excerpt:
      "The metro says night crews have closed hundreds of jobs on the M1 and township connectors. Residents’ associations want the raw ward list.",
    hoursAgo: 5,
    isBreaking: true,
  },
  {
    slug: "saps-high-density-operation-hijacking-spike",
    title: "SAPS extends high-density patrols after another hijacking weekend in Gauteng",
    excerpt:
      "Extra highway and rank patrols stay in place for 14 days. Community forums want school drop-off points covered, not only the N1.",
    hoursAgo: 4,
    isBreaking: true,
  },
  {
    slug: "rand-steadies-mining-output-gnu-budget",
    title: "Rand finds a floor as miners ship more and GNU budget language firms",
    excerpt:
      "The currency held against the dollar after stronger platinum and iron-ore receipts. Traders are still pricing political risk into Friday’s speech.",
    hoursAgo: 6,
  },
  {
    slug: "bafana-bafana-camp-world-cup-qualifying",
    title: "Bafana name a compact camp for the next qualifying window",
    excerpt:
      "Overseas regulars mix with in-form PSL names as the coach bets on set-pieces and a tighter midfield.",
    hoursAgo: 7,
  },
];

const NEW_DESK_STORIES = [
  {
    title: "Live update: fuel-price watch as rand and oil pull in opposite directions",
    slug: "live-update-fuel-price-watch-rand-oil",
    excerpt:
      "Inland 95 remains the household number. The newsroom’s fuel desk is tracking the next gazette against a firmer rand and a restless oil tape.",
    content: `JOHANNESBURG — The 180 Degrees News fuel desk is watching the next Department of Energy gazette after a week in which the rand firmed in spots while international oil refused to settle.

Inland motorists are still paying the higher Highveld number. Coastal prices remain the benchmark for KwaZulu-Natal and the Western Cape. “Households do not live on a Reuters screen,” said business editor Ayesha Patel. “They live on the pump.”

Treasury officials said any surprise in the next adjustment would be explained in the usual monthly note. Retailers warned that weekend traffic to the coast already prices diesel into food.

Check the live board on 180news.co.za/fuel and the markets ticker on the homepage.`,
    imageUrl:
      "https://images.pexels.com/photos/33622143/pexels-photo-33622143.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "Johannesburg and Sandton skyline",
    category: "business",
    author: "ayesha-patel",
    scope: "national" as const,
    isBreaking: true,
    hoursAgo: 1,
    views: 4200,
    readingMinutes: 3,
  },
  {
    title: "IEC by-election board: newsroom desk stays live on ward declarations",
    slug: "iec-byelection-board-newsroom-live",
    excerpt:
      "The 180° IEC desk is tracking declared wards and turnout as the commission updates its public board.",
    content: `JOHANNESBURG — The Electoral Commission’s public board remains the source of record. 180 Degrees News is running a live desk that refreshes leading parties, turnout and declared councillors as the figures move.

“We do not invent a count,” said political editor Sipho Dlamini. “We publish what the IEC publishes, and we say when the board is quiet.”

Readers can follow the running order at 180news.co.za/elections and share a ward result from the story page.`,
    imageUrl:
      "https://images.pexels.com/photos/16459372/pexels-photo-16459372.png?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "International flags at a diplomatic venue",
    category: "politics",
    author: "sipho-dlamini",
    scope: "national" as const,
    isBreaking: true,
    hoursAgo: 2,
    views: 3100,
    readingMinutes: 3,
  },
];

let deskRefreshed = false;

async function refreshCurrentDesk() {
  if (deskRefreshed) return;
  const categoryRows = await db.select().from(categories);
  const authorRows = await db.select().from(authors);
  const categoryBySlug = new Map(categoryRows.map((row) => [row.slug, row]));
  const authorBySlug = new Map(authorRows.map((row) => [row.slug, row]));

  for (const item of DESK_REFRESH) {
    await db
      .update(articles)
      .set({
        title: item.title,
        excerpt: item.excerpt,
        publishedAt: hoursAgo(item.hoursAgo),
        isBreaking: item.isBreaking ?? false,
        isFeatured: item.isFeatured ?? false,
      })
      .where(eq(articles.slug, item.slug));
  }

  for (const story of NEW_DESK_STORIES) {
    const [exists] = await db.select({ id: articles.id }).from(articles).where(eq(articles.slug, story.slug)).limit(1);
    if (exists) {
      await db
        .update(articles)
        .set({
          title: story.title,
          excerpt: story.excerpt,
          content: story.content,
          publishedAt: hoursAgo(story.hoursAgo),
          isBreaking: story.isBreaking ?? false,
        })
        .where(eq(articles.slug, story.slug));
      continue;
    }
    const category = categoryBySlug.get(story.category);
    const author = authorBySlug.get(story.author);
    if (!category || !author) continue;
    await db.insert(articles).values({
      title: story.title,
      slug: story.slug,
      excerpt: story.excerpt,
      content: story.content,
      imageUrl: story.imageUrl,
      imageAlt: story.imageAlt,
      categoryId: category.id,
      authorId: author.id,
      scope: story.scope,
      isBreaking: story.isBreaking ?? false,
      isFeatured: false,
      publishedAt: hoursAgo(story.hoursAgo),
      views: story.views,
      readingMinutes: story.readingMinutes,
    });
  }

  deskRefreshed = true;
}

export async function ensureSeeded() {
  if (!seeded) {
    if (!seedPromise) {
      seedPromise = seedIfNeeded().catch((error) => {
        seedPromise = null;
        throw error;
      });
    }
    await seedPromise;
  }
  await refreshCurrentDesk();
}
