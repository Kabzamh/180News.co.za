import { eq } from "drizzle-orm";
import { db } from "@/db";
import { articles } from "@/db/schema";
import { ensureSources } from "@/lib/rss";

const IMG: Record<string, string> = {
  capeTown:
    "https://images.pexels.com/photos/39417501/pexels-photo-39417501.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  sandton:
    "https://images.pexels.com/photos/33622143/pexels-photo-33622143.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  durban:
    "https://images.pexels.com/photos/11311702/pexels-photo-11311702.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  pretoria:
    "https://images.pexels.com/photos/39445858/pexels-photo-39445858.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  rugby:
    "https://images.pexels.com/photos/29804436/pexels-photo-29804436.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  power:
    "https://images.pexels.com/photos/5235481/pexels-photo-5235481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  joburg:
    "https://images.pexels.com/photos/34131816/pexels-photo-34131816.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  kruger:
    "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  city:
    "https://images.pexels.com/photos/33622134/pexels-photo-33622134.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  coast:
    "https://images.pexels.com/photos/34168940/pexels-photo-34168940.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  money:
    "https://images.pexels.com/photos/6310123/pexels-photo-6310123.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  police:
    "https://images.pexels.com/photos/39150120/pexels-photo-39150120.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  school:
    "https://images.pexels.com/photos/25457343/pexels-photo-25457343.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  hospital:
    "https://images.pexels.com/photos/39442464/pexels-photo-39442464.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  maize:
    "https://images.pexels.com/photos/32163264/pexels-photo-32163264.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  township:
    "https://images.pexels.com/photos/33621869/pexels-photo-33621869.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  fiber:
    "https://images.pexels.com/photos/4864249/pexels-photo-4864249.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  stadium:
    "https://images.pexels.com/photos/20431294/pexels-photo-20431294.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  winelands:
    "https://images.pexels.com/photos/38339209/pexels-photo-38339209.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  floods:
    "https://images.pexels.com/photos/39457988/pexels-photo-39457988.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  port:
    "https://images.pexels.com/photos/36737519/pexels-photo-36737519.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  mine:
    "https://images.pexels.com/photos/33074372/pexels-photo-33074372.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  cricket:
    "https://images.pexels.com/photos/31131694/pexels-photo-31131694.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
};

type SeedArticle = {
  slug: string;
  title: string;
  category: string;
  province?: string;
  region?: string;
  summary: string;
  body: string;
  image: string;
  tags: string[];
  hoursAgo: number;
  author: string;
  breaking?: boolean;
  featured?: boolean;
  views: number;
};

const A: SeedArticle[] = [
  {
    slug: "cabinet-energy-war-room-winter-plan",
    title:
      "BREAKING: Cabinet agrees new energy war room as Eskom targets load-shedding-free winter",
    category: "politics",
    summary:
      "A restructured energy war room will sit daily in the Presidency, coordinating Eskom, private generators and the regulator to keep the lights on through winter.",
    body: `JOHANNESBURG – Cabinet has approved the re-establishment of a dedicated energy war room based in the Presidency, with the mandate to coordinate Eskom, independent power producers, Transnet and the National Energy Regulator through what officials called "the most critical winter in a decade".

Ministers emerged from a special lekgotla on Tuesday saying the unit would publish a weekly, publicly available dashboard tracking generation unit performance, diesel stocks at the open-cycle gas turbines and the pace of new connections from the renewable energy bid windows.

"We are moving from crisis management to a campaign of predictability," a senior official told 180 Degrees News. "South Africans deserve to plan their lives and businesses around a schedule they can trust."

Eskom, which has kept the grid stable for a record stretch in recent months, warned that the period between June and August remains tight, with peak demand expected above 34 000 megawatts. Unplanned breakdowns were hovering at just over 13 000 MW at the weekend.

The war room will also track municipal debt owed to the power utility, which remains one of the biggest drains on its balance sheet, with a new payment-conditionality framework expected within 30 days.`,
    image: "power",
    tags: ["Eskom", "energy", "Cabinet", "load shedding", "Presidency"],
    hoursAgo: 2,
    author: "Lerato Mokoena",
    breaking: true,
    featured: true,
    views: 12480,
  },
  {
    slug: "gnu-100-days-jobs-energy-crime-compact",
    title:
      "Government of National Unity marks 100 days with compact on jobs, energy and crime",
    category: "politics",
    summary:
      "The multiparty government used its 100-day mark to claim early wins on coalition discipline, while promising harder reforms in labour, transport and policing.",
    body: `PRETORIA – The Government of National Unity (GNU) marked its first 100 days in office with a detailed progress compact, claiming that coalition discipline had produced tangible movement on energy, logistics and violent crime while conceding that jobs remain the country's defining challenge.

Speaking in Pretoria, government spokespersons from multiple parties presented a joint scoreboard highlighting the longest stretch without load shedding in years, the reopening of key freight corridors and a renewed focus on specialised commercial crime courts.

Analysts cautioned that the hardest reforms — including amendments to labour law, Transnet's private-partner model and the sale of state asset remnants — still lie ahead and will test the coalition's fault lines.

"Keeping a multiparty government talking is itself an achievement, but citizens will judge it on service delivery, not atmospherics," said political analyst Prof. Bheki Mthembu.

The compact commits the parties to a second 100-day phase focused on investment mobilisation, with an investment conference planned for early next year.`,
    image: "pretoria",
    tags: ["GNU", "coalition", "Presidency", "reform", "Pretoria"],
    hoursAgo: 6,
    author: "Naledi Dlamini",
    featured: true,
    views: 9821,
  },
  {
    slug: "reserve-bank-holds-repo-rate-inflation-eases",
    title:
      "Reserve Bank holds repo rate steady as headline inflation eases to 4,4%",
    category: "business",
    summary:
      "The SA Reserve Bank kept the repo rate unchanged for a third consecutive meeting, citing cooling inflation but warning over volatile food and fuel prices.",
    body: `PRETORIA – The South African Reserve Bank's Monetary Policy Committee (MPC) held the repo rate steady, keeping the prime rate at its current level, as headline consumer inflation eased to 4,4% year on year, comfortably inside the 3–6% target band.

Governor Lesetja Kganyago said the decision was unanimous but warned that risks to the outlook remained "material and two-sided", citing volatile global oil prices, a fragile rand and the trajectory of administered prices such as electricity tariffs.

"Inflation appears to be winning the battle, but the war is not over," Kganyago told reporters, noting that load shedding's second-order effects and municipal tariff increases continued to feed through to core goods.

Economists reacted cautiously. Investment houses said the bank was likely to remain data-dependent, with rate cuts only becoming realistic if the currency held its recent gains and food inflation continued to moderate.

Households and small businesses, many of which are still servicing debt at multi-year highs, will have to wait a little longer for meaningful relief.`,
    image: "money",
    tags: ["SARB", "repo rate", "inflation", "economy", "rand"],
    hoursAgo: 5,
    author: "Ahmed Patel",
    featured: true,
    views: 8742,
  },
  {
    slug: "police-festive-safety-plan-metros",
    title:
      "Police deploy 10 000-officer festive season safety plan across six metros",
    category: "national",
    summary:
      "Operation Shanela moves into high gear with roadblocks, visible patrols and specialised units focused on taxi routes, malls and coastal holiday towns.",
    body: `JOHANNESBURG – The South African Police Service has unveiled a festive-season deployment involving more than 10 000 additional officers across six metropolitan municipalities, with the heaviest concentration on Gauteng's economic corridors and KwaZulu-Natal and Western Cape holiday routes.

Police Minister Senzo Mchunu said the campaign, run under the banner of Operation Shanela, would combine high-density roadblocks, mounted and air-wing support, and undercover operations targeting illegal firearms and drug syndicates.

"Our message to criminals is simple: there is no festive season for lawlessness," Mchulu said at the launch in Johannesburg, flanked by the national police commissioner and metro police chiefs.

Particular attention will be paid to long-distance taxi routes, shopping centres, coastal towns and events venues, where seasonal crowds create soft targets.

Civil society groups welcomed the visibility but repeated calls for sustained resourcing of detective services, noting that high arrest numbers mean little without successful prosecutions.`,
    image: "police",
    tags: ["SAPS", "crime", "festive season", "Operation Shanela", "safety"],
    hoursAgo: 9,
    author: "Sipho Nkosi",
    views: 7430,
  },
  {
    slug: "taxi-industry-subsidy-agreement-signed",
    title:
      "Taxi industry and government sign landmark subsidy agreement after marathon talks",
    category: "national",
    summary:
      "The deal commits government to a scrapping allowance and safety recapitalisation payments, while associations pledge no violent strikes over the festive season.",
    body: `JOHANNESBURG – Government and the minibus taxi industry have signed a landmark agreement that introduces a formal recapitalisation and safety package for operators in exchange for an enforceable commitment against violent industrial action during the peak travel season.

After two weeks of mediated talks, Transport ministerial representatives agreed to a revised scrapping allowance for older taxis, co-funded safety equipment and a task team to resolve long-standing route conflicts, which are frequently the trigger for deadly turf wars.

In return, national taxi leadership committed to a dispute-resolution protocol that requires 14 days of facilitated negotiation before any work stoppage, and to protecting commuters during any legal strike.

"This is the beginning of treating public transport as essential infrastructure, not a battlefield," said one negotiator close to the talks.

Commuter groups cautiously welcomed the agreement, noting that previous memoranda had collapsed at implementation level. A monitoring council including civil society will meet fortnightly.`,
    image: "joburg",
    tags: ["taxis", "transport", "subsidy", "strike", "commuters"],
    hoursAgo: 26,
    author: "Tshepo Malema",
    breaking: true,
    views: 8120,
  },
  {
    slug: "school-calendar-2026-matric-exams-earlier",
    title:
      "Basic Education releases 2026 school calendar; matric exams start earlier",
    category: "national",
    summary:
      "The revised calendar adds contact-learning days and brings the National Senior Certificate timetable forward to reduce holiday overlap.",
    body: `PRETORIA – The Department of Basic Education has published the 2026 school calendar, bringing the start of the National Senior Certificate examinations forward by more than a week in a bid to protect teaching time and allow earlier release of results.

The calendar sets out 203 official school days for public schools, with inland and coastal clusters opening on staggered dates in mid-January. Teachers return a week earlier for administration and marking preparation.

Officials said the changes responded to repeated calls from education experts to maximise contact time, particularly in Grade 12, where syllabus completion remains uneven across quintiles.

"Every day of lost learning is hardest to recover for the poor child," the department said in a statement.

Teacher unions said they would study the staffing implications, while school governing bodies urged provinces to resolve mud schools, pit toilets and unfilled posts before learners arrive at the gates.`,
    image: "school",
    tags: ["education", "matric", "schools", "DBE", "calendar"],
    hoursAgo: 14,
    author: "Chantel Felix",
    views: 6240,
  },
  {
    slug: "nhi-pilot-districts-announced",
    title:
      "First NHI pilot districts announced as health department confronts funding crunch",
    category: "politics",
    summary:
      "Eleven districts across eight provinces will test the new funding model, with officials insisting universal coverage will be phased in gradually.",
    body: `JOHANNESBURG – The national health department has named eleven districts across eight provinces as the first pilot sites for the National Health Insurance funding model, even as Treasury questions the affordability of rapid rollout.

The pilots will test centralised purchasing of services, patient registration systems and contracts between public authorities and accredited private providers.

Health officials said the exercise was deliberately incremental. "We are not flipping a switch," a department head said. "We are testing pipes, payment systems and patient pathways before scaling anything."

Opposition parties and some medical aids remain opposed to aspects of the legislation, while civil society groups argue that delays are costing the poor access to care. Litigation over elements of the Act is expected to reach the Constitutional Court next year.

In the meantime, the department is under pressure to fix infrastructure, with a backlog of medico-legal claims continuing to crowd out provincial health budgets.`,
    image: "hospital",
    tags: ["NHI", "health", "Treasury", "public health"],
    hoursAgo: 20,
    author: "Naledi Dlamini",
    views: 5310,
  },
  {
    slug: "joburg-pothole-stormwater-blitz",
    title:
      "City of Joburg launches R450m repair blitz across all seven regions",
    category: "national",
    province: "gauteng",
    region: "City of Johannesburg",
    summary:
      "The Johannesburg Roads Agency will resurface 140 kilometres of road and clear 2 000 blocked stormwater drains before the rainy season peaks.",
    body: `JOHANNESBURG – The City of Johannesburg has launched a R450 million infrastructure blitz targeting potholes, collapsed stormwater drains and malfunctioning traffic lights across all seven of its regions.

The Johannesburg Roads Agency says 140 kilometres of road will be resurfaced and more than 2 000 blocked stormwater inlets cleared before the peak rainy season, when flash floods regularly swamp low-lying suburbs and inner-city arteries.

Mayoral committee member for transport Kenny Kunene said contractors who failed performance benchmarks would be replaced, after years in which emergency repair budgets were absorbed by repeated patch jobs that collapsed within months.

The city is also contracting private pothole-repair franchises under a "patch and recover" model, with payment linked to six-month durability guarantees.

Ward councillors across the political divide welcomed the plan but warned residents would judge it on visible results in Sandton drive times as much as in Soweto's side streets.`,
    image: "sandton",
    tags: ["Johannesburg", "roads", "potholes", "Joburg", "infrastructure"],
    hoursAgo: 7,
    author: "Lerato Mokoena",
    featured: true,
    views: 6910,
  },
  {
    slug: "tshwane-water-loss-smart-meters",
    title:
      "Tshwane cuts water losses by 11% as smart-meter rollout reaches Mamelodi",
    category: "national",
    province: "gauteng",
    region: "City of Tshwane (Pretoria)",
    summary:
      "Pressure management and leak detection in the capital have saved millions of litres a day, with informal settlements now included in the metering programme.",
    body: `PRETORIA – The City of Tshwane says it has reduced non-revenue water losses by 11% in two years, crediting pressure-management valves, acoustic leak detection and a smart-meter expansion that has now reached Mamelodi and Atteridgeville.

Officials say the savings amount to tens of millions of litres daily, water that would otherwise have disappeared through ageing apartheid-era pipes and illegal connections.

"Every leak we find and fix is water that reaches a school, a clinic or a household instead of the ground," said the mayoral committee member for utilities.

Tshwane, like many metros, remains dependent on the Vaal system, which is under renewed pressure as summer heat ramps up. Level 2 restrictions remain in place.

The city concedes that billing chaos in parts of the metro continues to undermine revenue collection, without which the maintenance programme cannot be sustained.`,
    image: "pretoria",
    tags: ["Tshwane", "Pretoria", "water", "Mamelodi", "utilities"],
    hoursAgo: 30,
    author: "Pieter van der Merwe",
    views: 3260,
  },
  {
    slug: "cape-town-public-transport-expansion",
    title:
      "Cape Town unveils R1,2bn public transport expansion ahead of summer peak",
    category: "national",
    province: "western-cape",
    region: "City of Cape Town",
    summary:
      "New dedicated lanes, 95 low-emission buses and a feeder network linking Khayelitsha and Mitchells Plain to the city centre headline the package.",
    body: `CAPE TOWN – The City of Cape Town has announced a R1,2 billion expansion of its public transport network, including 95 low-emission buses, dedicated lanes along two congested corridors and new feeder routes linking Khayelitsha, Mitchells Plain and Delft with the central city.

Mayor Geordin Hill-Lewis said the package was designed to move tens of thousands more commuters out of minibus taxis and private cars during the summer peak, when the metro's population swells with seasonal visitors.

The rollout includes integrated ticketing across bus, rail and minibus services — a long-promised reform that transport planners say is essential to unblocking the city's spatial economy.

Commuter advocacy groups welcomed the routes but want enforcement of dedicated lanes, which have in the past been blocked by illegally parked vehicles and long-distance operators.

Construction begins early next year, with services phased in over 18 months.`,
    image: "capeTown",
    tags: ["Cape Town", "transport", "MyCiTi", "Khayelitsha", "Western Cape"],
    hoursAgo: 11,
    author: "Chantel Felix",
    featured: true,
    views: 7120,
  },
  {
    slug: "stellenbosch-harvest-dam-levels-concern",
    title:
      "Stellenbosch winemakers forecast smaller harvest as dam levels stay a concern",
    category: "lifestyle",
    province: "western-cape",
    region: "Cape Winelands",
    summary:
      "Dry winter rainfall and heat peaks have cut yield forecasts, with producers warning of tighter supplies of Sauvignon Blanc and Pinotage.",
    body: `STELLENBOSCH – Winemakers in the Cape Winelands are forecasting a smaller harvest this season after below-average winter rainfall and repeated heat peaks shortened ripening cycles across key cultivars.

Industry body Vinpro said early estimates pointed to a single-digit percentage drop in volume, with Sauvignon Blanc and Pinotage particularly exposed in vineyards without irrigation buffers.

"One tough season is manageable, but consecutive dry winters change the economics of an entire valley," said a veteran Stellenbosch producer.

Dam levels in the Western Cape remain adequate for urban supply but farmers carry the brunt of restrictions when catchments falter, and many have accelerated investments in mulching, cover crops and solar-powered boreholes.

Exporters said global demand for South African wine remained resilient, though shipping costs and European labelling rules continued to squeeze margins.`,
    image: "winelands",
    tags: ["Stellenbosch", "wine", "agriculture", "drought", "Western Cape"],
    hoursAgo: 34,
    author: "Juanre van Wyk",
    views: 2610,
  },
  {
    slug: "durban-port-backlog-cleared",
    title:
      "Durban container backlog cleared to under four days, says Transnet",
    category: "business",
    province: "kwazulu-natal",
    region: "eThekwini (Durban)",
    summary:
      "Equipment recovery and extended crane shifts have driven down vessel waiting times at Africa's busiest container port after months of delays.",
    body: `DURBAN – The container vessel backlog at the Port of Durban has been reduced to under four days, Transnet Port Terminals says, after a recovery plan restored key cranes and introduced 24-hour berth windows at the Durban Container Terminal.

Exporters had warned earlier this year that delays of more than a fortnight were damaging South Africa's reputation in fresh-produce and automotive markets, where refrigerated cargo cannot wait.

A public-private partnership brought in additional straddle carriers and maintenance teams, while gang-shift changes lifted crane productivity by more than 18%.

"Every day a fruit ship waits costs the exporter and the farm worker. This turnaround matters for jobs across the province," said a Durban Chamber of Industries representative.

Transnet cautioned that the recovery remained fragile, with cable theft and rail connectivity to the Gauteng hinterland still acting as choke points that could rebuild road congestion quickly.`,
    image: "port",
    tags: ["Durban", "Transnet", "port", "logistics", "KwaZulu-Natal"],
    hoursAgo: 13,
    author: "Ahmed Patel",
    featured: true,
    views: 5840,
  },
  {
    slug: "kzn-flood-warnings-coastal-districts",
    title:
      "KZN braces for more heavy rain as flood warnings issued for coastal districts",
    category: "national",
    province: "kwazulu-natal",
    region: "eThekwini (Durban)",
    summary:
      "The weather service has issued level 4 warnings for eThekwini, iLembe and the South Coast, with disaster teams on high alert after cuts in overnight rainfall.",
    body: `DURBAN – KwaZulu-Natal disaster management teams are on high alert after the South African Weather Service issued level 4 warnings for heavy rain and damaging winds across eThekwini, iLembe and the South Coast.

Overnight downpours flooded low-lying roads in parts of Durban, caused mud spills on the N3 and forced the closure of at least three low-level crossings in rural districts where drainage infrastructure was damaged in the 2022 floods.

Municipalities have pre-positioned sandbags, boats and humanitarian supplies, while emergency services appealed to residents in floodplains and informal settlements to move to identified community halls early rather than waiting for rescue.

"Climate shocks are now annual events in this province. Our recovery from the last floods is not even complete," warned a cooperative governance official.

Forecasters say the cut-off low system should move offshore by Thursday, but saturated catchments mean river levels will remain dangerous for days.`,
    image: "floods",
    tags: ["KwaZulu-Natal", "floods", "weather", "Durban", "disaster"],
    hoursAgo: 4,
    author: "Naledi Dlamini",
    breaking: true,
    views: 9360,
  },
  {
    slug: "nelson-mandela-bay-water-shedding-end",
    title:
      "Nelson Mandela Bay promises end to water shedding as Nooitgedacht repairs near completion",
    category: "national",
    province: "eastern-cape",
    region: "Nelson Mandela Bay (Gqeberha)",
    summary:
      "The metro says completion of the Nooitgedacht scheme and new boreholes will move Gqeberha out of rotational cuts before summer.",
    body: `GQEBERHA – Nelson Mandela Bay officials say the metro is within weeks of ending rotational water shedding, with the long-delayed Nooitgedacht bulk scheme nearing completion and additional boreholes coming online.

Gqeberha and surrounding towns have endured years of strict water scheduling, compounded by drought and pipe losses in a metro that has also gone through prolonged political instability.

The mayoral committee member for infrastructure said supply from the Gariep and Kouga dams had improved and that pressure zones would be normalised sector by sector.

"Residents have lived with buckets and timers for too long. Our mandate is to make water shedding a memory this summer," the official said.

Business forums said they would monitor consumption data rather than press statements, noting that previous completion deadlines had slipped repeatedly.`,
    image: "coast",
    tags: ["Gqeberha", "Eastern Cape", "water", "Nooitgedacht", "drought"],
    hoursAgo: 22,
    author: "Sipho Nkosi",
    views: 4120,
  },
  {
    slug: "mangaung-turnaround-plan-service-delivery",
    title:
      "Mangaung tables turnaround plan targeting potholes, refuse and R300m arrears",
    category: "national",
    province: "free-state",
    region: "Mangaung (Bloemfontein)",
    summary:
      "Under administration for two years, the Free State metro has presented a recovery plan built on contractor performance and revenue collection.",
    body: `BLOEMFONTEIN – Mangaung Metropolitan Municipality has tabled a turnaround strategy aimed at restoring basic services, with immediate interventions on refuse collection, road repairs and the R300 million-plus owed to state utilities and suppliers.

The Free State metro, which has been under administration, has become a byword for collapsed services: rubbish piling up in townships, potholed national routes cutting through the city and chronic water outages on the periphery.

The plan ties contractor payments to measurable weekly outputs and places dedicated debt-counselling teams in municipal offices to recover revenue without cutting services to indigent households.

Administrators acknowledged that staffing was bloated and morale low, but asked residents for "one rebuilding season" to demonstrate change.

Opposition councillors said they would support practical interventions while monitoring procurement, which has repeatedly been flagged by the auditor-general.`,
    image: "city",
    tags: ["Mangaung", "Bloemfontein", "Free State", "service delivery", "municipalities"],
    hoursAgo: 28,
    author: "Tshepo Malema",
    views: 2210,
  },
  {
    slug: "kruger-rhino-poachers-arrested-cross-border",
    title:
      "Two suspected rhino poachers arrested in Kruger in cross-border operation",
    category: "national",
    province: "limpopo",
    region: "Mopani (Tzaneen)",
    summary:
      "Rangers, police and Mozambican counterparts seized a high-calibre rifle, axe and horn after an overnight follow-up in the eastern park.",
    body: `SKUKUZA – Two suspected rhino poachers have been arrested in the eastern Kruger National Park following an overnight follow-up operation involving SANParks rangers, the South African Police Service and Mozambican law enforcement counterparts.

A high-calibre hunting rifle, ammunition, a butcher's axe and a freshly removed rhino horn were recovered at the scene, SANParks confirmed.

Authorities said cross-border intelligence sharing had become decisive in the park, where syndicates exploit the unfenced boundary with Mozambique's Limpopo National Park under the Great Limpopo Transfrontier Park agreement.

"Our rangers are not only fighting poachers but transnational criminal economies," said a SANParks spokesperson, who again called for faster court rolls and harsher sentencing.

Conservation groups say rhino poaching numbers have fallen from their peak but remain a mortal threat to the species, while burglaries at legal horn stockpiles have raised insider-risk concerns.`,
    image: "kruger",
    tags: ["Kruger", "rhino poaching", "SANParks", "Limpopo", "conservation"],
    hoursAgo: 16,
    author: "Pieter van der Merwe",
    views: 6480,
  },
  {
    slug: "mpumalanga-coal-communities-just-transition",
    title:
      "Mpumalanga coal communities map a just transition as renewables pipeline grows",
    category: "business",
    province: "mpumalanga",
    region: "Nkangala (eMalahleni)",
    summary:
      "Mayors, unions and developers met in eMalahleni to agree local ownership rules as coal stations near retirement and solar and storage projects line up.",
    body: `eMALAHLENI – Municipal leaders, mineworkers' unions and renewable-energy developers have begun mapping a "just transition" compact for Mpumalanga's coal belt, where the retirement schedule of Eskom power stations threatens tens of thousands of direct and indirect jobs.

At a summit in eMalahleni, unions warned that the province could not become a sacrifice zone for global decarbonisation, while developers argued that solar, wind and grid-scale storage projects already in the pipeline could create more long-term jobs than the coal value chain — if communities owned stakes.

Proposals on the table include local-equity requirements, remediation funds for acid mine drainage and a retraining authority modelled on the best international transition programmes.

"The question isn't whether Mpumalanga changes. It's whether its people are carried into the new economy or dumped by the road," said one organiser.

Treasury's Just Energy Transition Investment Plan, backed by international partners, will fund the first demonstration sites, with procurement windows expected next year.`,
    image: "township",
    tags: ["Mpumalanga", "just transition", "coal", "renewables", "jobs"],
    hoursAgo: 38,
    author: "Ahmed Patel",
    views: 1810,
  },
  {
    slug: "rustenburg-platinum-strike-suspended",
    title:
      "Rustenburg platinum belt strike suspended as wage deal goes to union vote",
    category: "business",
    province: "north-west",
    region: "Bojanala (Rustenburg)",
    summary:
      "Tens of thousands of workers return to the shafts while members consider a multi-year wage offer that unions say addresses the lowest pay grades.",
    body: `RUSTENBURG – A strike that halted production across several Rustenburg platinum operations has been suspended to allow union members to vote on a multi-year wage offer understood to front-load increases for the lowest-paid grades.

The North West platinum belt, which supplies a large share of the world's platinum group metals used in catalytic converters and hydrogen technology, had entered its second week of industrial action, with companies warning of permanent damage to investor confidence.

Mediators from the Commission for Conciliation, Mediation and Arbitration brokered the compromise, which also addresses allowances for transport and hostel accommodation.

Union leaders told members the deal was "hard-won but honest", while employers said they would only comment once the ballot was concluded.

Analysts said PGM producers remain squeezed by weak prices and the global shift to electric vehicles, making the sector's wage arithmetic more difficult with every bargaining cycle.`,
    image: "mine",
    tags: ["Rustenburg", "platinum", "strike", "mining", "North West"],
    hoursAgo: 8,
    author: "Sipho Nkosi",
    breaking: true,
    views: 5120,
  },
  {
    slug: "kimberley-solar-corridor-homes-powered",
    title:
      "Northern Cape solar corridor powers first 50 000 homes under renewables drive",
    category: "business",
    province: "northern-cape",
    region: "Sol Plaatje (Kimberley)",
    summary:
      "Two new utility-scale solar farms between Kimberley and Upington have reached commercial operation, with grid planners eyeing storage to firm the supply.",
    body: `KIMBERLEY – The Northern Cape's renewable energy corridor marked a milestone this week as two utility-scale solar farms between Kimberley and Upington reached commercial operation, collectively feeding enough power for roughly 50 000 homes into the national grid.

Provincial leaders said the province was finally converting its solar endowment — among the best in the world — into industrial opportunity, with local content commitments on trackers and cabling creating factory and construction jobs.

Grid planners caution, however, that without battery storage and strengthened transmission lines to the coastal and Gauteng load centres, midday generation will increasingly go to waste.

"Sun without wires and storage is wasted potential. The next decade belongs to whoever builds the backbone," said an energy economist.

Communities near the projects hold equity stakes under the renewable energy programme, an early test of whether the energy transition can visibly improve town economies from Kimberley to the Kalahari.`,
    image: "power",
    tags: ["Northern Cape", "solar", "renewables", "Kimberley", "Upington"],
    hoursAgo: 40,
    author: "Pieter van der Merwe",
    views: 1520,
  },
  {
    slug: "fuel-price-december-cut-cef",
    title:
      "Fuel price relief: petrol set for biggest December cut in two years",
    category: "business",
    summary:
      "Lower international oil prices and a firmer rand point to substantial relief at the pumps from next week, offering festive travellers rare breathing room.",
    body: `JOHANNESBURG – Motorists are heading for the biggest December fuel-price cut in two years, according to preliminary Central Energy Fund data, after international oil prices softened and the rand staged a recovery against the dollar.

Unaudited daily snapshots suggest both grades of petrol could fall by well over R1 a litre from next Wednesday, with wholesale diesel also tracking lower.

"The numbers are still moving, but the direction is clear and it is good news for festive travel and food transport," an energy economist said.

Fuel prices remain one of the most visible contributors to household inflation, feeding directly into taxi fares, food delivery and farming costs.

The department of mineral resources and petroleum is expected to confirm the adjustment at month-end, warning consumers that global geopolitics can still swing prices sharply within days.`,
    image: "money",
    tags: ["fuel price", "CEF", "petrol", "inflation", "motorists"],
    hoursAgo: 18,
    author: "Ahmed Patel",
    views: 4730,
  },
  {
    slug: "transnet-durban-gauteng-corridor-deal",
    title:
      "Transnet and private partners sign R8bn Durban–Gauteng corridor modernisation deal",
    category: "business",
    summary:
      "The public-private package will rehabilitate rail, signalling and terminal capacity to shift freight back off congested roads.",
    body: `JOHANNESBURG – Transnet has signed an R8 billion public-private partnership to modernise the Durban–Gauteng freight corridor, the economic spine connecting South Africa's busiest port with its industrial interior.

The package funds rail rehabilitation, modern signalling, terminal upgrades and dedicated slots for private operators, part of the freight rail reform that allows third-party access to the national network.

For years, freight that once moved by rail shifted to trucks, chewing up the N3, raising logistics costs and worsening road accidents and emissions.

"Every container back on rail is cheaper for the farmer, safer for the motorist and better for the fiscus," a logistics executive said.

Treasury has made corridor performance a condition of future freight bailouts, meaning Transnet must hit volume and transit-time targets or face tighter conditions.`,
    image: "port",
    tags: ["Transnet", "rail", "Durban", "Gauteng", "logistics"],
    hoursAgo: 44,
    author: "Lerato Mokoena",
    views: 2310,
  },
  {
    slug: "springboks-squad-end-of-year-tour-uncapped",
    title:
      "Springboks name end-of-year tour squad with three uncapped players",
    category: "sport",
    summary:
      "The world champions blend experience with fresh legs for a demanding tour, with the coaching staff using the window to deepen pool depth.",
    body: `JOHANNESBURG – Springbok head coach Rassie Erasmus has named a 35-man squad for the end-of-year tour that includes three uncapped players, signalling that the world champions are already building towards the next World Cup cycle.

The touring party retains the hard core of the squad that conquered the world, with the usual bruising mix of powerful forwards and versatile backs, while injuries have opened doors for in-form provincial performers.

"Nobody inherits a jersey here, but nobody is locked out either," Erasmus said as the squad was announced. "Depth wins tournaments, and tours are where depth is forged."

The newcomers learned of their call-ups at their provincial unions, with one forward describing the moment as "a dream you don't allow yourself to say out loud".

Supporters' groups expect a clean sweep of tour matches but analysts note that slow-starting Boks have historically needed the first match to find rhythm in northern-hemisphere conditions.`,
    image: "rugby",
    tags: ["Springboks", "rugby", "Rassie Erasmus", "end-of-year tour"],
    hoursAgo: 10,
    author: "Juanre van Wyk",
    featured: true,
    views: 11240,
  },
  {
    slug: "soweto-derby-fnb-sell-out",
    title: "Soweto derby confirmed as sell-out as Chiefs and Pirates chase top-three finish",
    category: "sport",
    summary:
      "All 94 000 tickets for the FNB Stadium showdown were snapped up within hours, with both clubs needing three points for their league ambitions.",
    body: `JOHANNESBURG – The Soweto derby between Kaizer Chiefs and Orlando Pirates is officially a sell-out, with all 94 000 tickets at the FNB Stadium snapped up in hours as the Premier Soccer League's biggest fixture approaches.

The match carries unusual weight this season, with both clubs chasing a top-three finish and continental qualification, and neither coach able to treat the derby as a carnival occasion.

Pirates arrive in stronger league form, but derby history repeatedly punishes form books, and Chiefs will feed off a home crowd desperate for bragging rights after a difficult run of seasons.

Security and transport plans have been scaled up, with park-and-ride facilities and the Gautrain running extended schedules to move supporters safely.

"The derby is not just a match. It's the nation's heartbeat for 90 minutes," said a supporters' branch chairperson in Orlando East.`,
    image: "stadium",
    tags: ["Soweto derby", "Kaizer Chiefs", "Orlando Pirates", "PSL", "FNB Stadium"],
    hoursAgo: 24,
    author: "Tshepo Malema",
    views: 8810,
  },
  {
    slug: "proteas-spinner-test-series-injury",
    title: "Proteas spinner ruled out of Test series with side strain",
    category: "sport",
    summary:
      "The slow bowler will miss the home Test window after scans confirmed the injury, with a replacement called into the squad.",
    body: `CAPE TOWN – Cricket South Africa has confirmed that a leading Proteas spinner will miss the upcoming Test series after scans revealed a side strain sustained during a domestic four-day fixture.

The injury is a blow to the home side's spin plans, particularly for the Newlands and coastal conditions where slow bowling can grow into matches as wear sets in.

A replacement has been called into the squad and will link up with the squad at the coastal training base later this week.

"These things happen at the worst times, but the medical team has a clear rehab timeline and the selectors have confidence in the depth coming through the domestic system," a team spokesperson said.

The uncapped replacement enjoyed a breakthrough first-class season, and coaches hinted that selection for the second Test remained genuinely open.`,
    image: "cricket",
    tags: ["Proteas", "cricket", "Test cricket", "injury", "CSA"],
    hoursAgo: 33,
    author: "Juanre van Wyk",
    views: 3420,
  },
  {
    slug: "icasa-spectrum-rural-broadband",
    title:
      "ICASA prepares release of high-demand spectrum for rural broadband push",
    category: "technology",
    summary:
      "The regulator will auction bands essential for 5G and rural coverage, with universal-service obligations expected for winning operators.",
    body: `JOHANNESBURG – The Independent Communications Authority of South Africa is preparing the release of a new tranche of high-demand spectrum, the radio frequencies that determine how fast, far and cheaply mobile networks can deliver data.

The auction will focus on bands suited to both 5G capacity in cities and wide-area rural coverage, where millions of South Africans still lack affordable broadband.

Draft licensing terms are expected to attach firm universal-service obligations, requiring winners to cover defined districts within a set period rather than concentrating solely on wealthy urban corridors.

"Without teeth, spectrum auctions just entrench the map of the haves and have-nots," said a digital-access campaigner.

Operators have long argued that scarce spectrum raises network costs that are ultimately passed on to consumers, while government sees connectivity as essential infrastructure for education and small business.`,
    image: "fiber",
    tags: ["ICASA", "spectrum", "5G", "broadband", "data"],
    hoursAgo: 12,
    author: "Lerato Mokoena",
    views: 2930,
  },
  {
    slug: "cape-town-inverter-startup-european-deal",
    title:
      "Cape Town startup's load-shedding-smart inverters secure European distribution deal",
    category: "technology",
    summary:
      "Born during South Africa's energy crisis, the company's intelligent backup systems will now be sold into Europe's residential storage market.",
    body: `CAPE TOWN – A Cape Town energy-technology startup has secured a European distribution deal for its load-shedding-smart inverter and battery systems, turning a product forged in South Africa's energy crisis into an export business.

The devices learn household consumption patterns, prioritise essential circuits and integrate solar panels, allowing homes and small businesses to ride out outages with minimal grid draw.

"European households facing volatile energy markets want exactly the resilience South Africans have had to master," the company's chief executive said at the announcement in Stellenbosch.

The deal will see local assembly expand and create dozens of engineering and manufacturing posts, a rare instance of crisis-driven technology flowing from south to north.

Trade and industry officials held up the company as evidence that industrial policy should back firms solving distinctly South African problems that have global markets.`,
    image: "fiber",
    tags: ["startups", "inverters", "load shedding", "Cape Town", "exports"],
    hoursAgo: 50,
    author: "Chantel Felix",
    views: 1740,
  },
  {
    slug: "mzansi-magic-telenovela-records",
    title: "Mzansi Magic's new telenovela breaks opening-weekend viewership records",
    category: "entertainment",
    summary:
      "The gritty Gauteng-set drama drew record audiences across broadcast and streaming, with social media lighting up over its lead performances.",
    body: `JOHANNESBURG – Mzansi Magic's new telenovela has delivered the channel's biggest opening weekend in years, with record combined viewership across its broadcast and streaming platforms and a flood of social-media reaction to its lead cast.

Set across the contrasting worlds of Sandton boardrooms and township taverns, the drama draws on distinctly South African themes of family loyalty, land, new money and old secrets.

"We wanted faces South Africans recognise and stories they argue about at the Sunday lunch table," the show's creator said.

Streaming numbers were especially strong among younger viewers, reinforcing the industry's multi-platform strategy as audiences increasingly watch on phones rather than television sets.

A second series is yet to be confirmed, but producers noted with a smile that the cliffhanger ending was deliberately built for renewal conversations.`,
    image: "sandton",
    tags: ["Mzansi Magic", "telenovela", "television", "entertainment"],
    hoursAgo: 29,
    author: "Chantel Felix",
    views: 2130,
  },
  {
    slug: "rocking-the-daisies-2026-lineup",
    title: "Rocking the Daisies adds 30 local acts as festival expands Cape lineup",
    category: "entertainment",
    province: "western-cape",
    region: "Cape Winelands",
    summary:
      "Organisers have doubled down on homegrown talent for the iconic outdoor festival, alongside headline international acts and a sustainability push.",
    body: `CAPE TOWN – Rocking the Daisies has added 30 local acts to its 2026 lineup, organisers announced, doubling down on homegrown headliners alongside international draws for one of South Africa's flagship outdoor music festivals.

The Cape Winelands event will feature amapiano, hip-hop, rock and Afro-house stages, with emerging artists selected through a national open-submission process that drew thousands of entries.

Festival director says sustainability remains central: the event is expanding its cup-reuse system, solar-powered stages and local-procurement programme, which directs catering spend to nearby farms and enterprises.

"Festivals can be extractive for host communities or they can anchor them. We choose the latter," the director said.

Early-bird tickets sold out in record time, with the tourism sector expecting the event to deliver a major occupancy boost across Stellenbosch guesthouses and Cape Town hotels.`,
    image: "winelands",
    tags: ["Rocking the Daisies", "music", "festival", "Western Cape"],
    hoursAgo: 48,
    author: "Juanre van Wyk",
    views: 1980,
  },
  {
    slug: "sadc-ceasefire-drc-tensions",
    title: "SADC leaders press for lasting ceasefire as tensions flare in eastern DRC",
    category: "world",
    summary:
      "Regional heads of state convened emergency talks over the resurgent conflict, with South Africa contributing troops to the regional intervention force.",
    body: `PRETORIA – Southern African Development Community leaders have pressed for a lasting ceasefire in the eastern Democratic Republic of Congo after a fresh surge of fighting displaced tens of thousands of people and threatened regional stability.

South Africa contributes troops to the SADC Mission in the DRC, and South African National Defence Force convoys have repeatedly drawn public attention to the costs and casualties of regional peacekeeping.

At the emergency summit, heads of state called for disarmament, the reopening of humanitarian corridors and dialogue with armed groups, while aid agencies warned of a worsening food and medical crisis around Goma.

Diplomats acknowledge that previous peace deals have unravelled quickly in the mineral-rich east, where local militias, regional rivalries and global demand for critical minerals intersect.

Pretoria has positioned itself as a lead mediator, but analysts warn that without credible enforcement and humanitarian funding, another ceasefire may amount to paper.`,
    image: "kruger",
    tags: ["SADC", "DRC", "peacekeeping", "SANDF", "Africa"],
    hoursAgo: 15,
    author: "Naledi Dlamini",
    views: 3650,
  },
  {
    slug: "brics-trade-summit-energy-pact",
    title:
      "Ramaphosa joins BRICS trade summit as South Africa pushes continental energy pact",
    category: "world",
    summary:
      "The President used the platform to court investment in transmission and green hydrogen while seeking balanced trade terms for African exporters.",
    body: `JOHANNESBURG – President Cyril Ramaphosa has joined fellow BRICS leaders at a trade and investment summit where South Africa is championing a continental energy pact and new markets for processed African goods.

Officials travelling with the President said South Africa would pitch its renewable-energy corridor, green-hydrogen potential and critical-minals value chain to investors frustrated by power and logistics risks.

At the same time, trade negotiators are pushing back against arrangements that lock African economies into exporting raw materials while importing finished goods — a pattern that has constrained industrialisation for decades.

"Our resources must build factories and jobs here, not only elsewhere," one official said.

The expanded BRICS grouping has given South Africa a louder multilateral platform, but economists caution that balancing partnerships across competing global powers requires diplomatic discipline.`,
    image: "pretoria",
    tags: ["BRICS", "Ramaphosa", "trade", "green hydrogen", "diplomacy"],
    hoursAgo: 21,
    author: "Ahmed Patel",
    views: 2540,
  },
  {
    slug: "garden-route-summer-travel-boom",
    title:
      "Garden Route road-trip boom: coastal towns cash in on local summer travel",
    category: "lifestyle",
    province: "western-cape",
    region: "Garden Route",
    summary:
      "Mossel Bay, Knysna and Plett report record forward bookings as South Africans keep holidaying domestically, with adventure tourism leading demand.",
    body: `GARDEN ROUTE – Towns along the Garden Route are reporting record forward bookings for the summer holidays, as South African families continue to favour domestic road trips over costly overseas travel.

Accommodation associations in Mossel Bay, George, Knysna and Plettenberg Bay say self-catering units and caravan parks are filling fastest, with adventure experiences — canopy tours, whale-watching and mountain biking — leading demand.

"The road trip is king this season," said a regional tourism manager. "Families want experiences, and the Garden Route gives them forests, beaches and mountains in one drive."

Local restaurants and craft markets have hired additional seasonal staff, and municipalities have ramped up beach safety and refuse collections after criticism during previous peaks.

Tourism bodies are urging motorists to plan for N2 roadworks and to use official accommodation platforms, warning of seasonal scams.`,
    image: "coast",
    tags: ["Garden Route", "travel", "tourism", "summer", "Western Cape"],
    hoursAgo: 36,
    author: "Chantel Felix",
    views: 3120,
  },
  {
    slug: "maize-farmers-planting-season-outlook",
    title:
      "SA maize farmers complete planting under mixed conditions as grain belt watches skies",
    category: "business",
    province: "free-state",
    summary:
      "The Free State and Mpumalanga grain belt has largely finished summer planting, but uneven early rains make yields a moving feast for the country's staple.",
    body: `BLOEMFONTEIN – South African maize farmers have largely completed summer planting across the Free State and Mpumalanga grain belt, but patchy early rains mean the country's staple crop faces an anxious wait for consistent storms.

The first official production estimate is still weeks away, and agricultural economists caution that a good finish can still rescue a hesitant start — or a January dry spell can undo everything.

Maize is the anchor of food-price inflation, feeding not only households but the poultry, beef and dairy industries that rely on it for animal feed, so yields ripple through the national shopping basket.

"Planting is optimism in overalls. Now we farm rain and pray to the weather app," said a Free State producer.

Input costs — fertiliser, diesel and financing — remain elevated, and farmers' unions have repeated calls for rural safety support and reliable rural roads to get the harvest to silos.`,
    image: "maize",
    tags: ["maize", "agriculture", "Free State", "food prices", "farmers"],
    hoursAgo: 46,
    author: "Pieter van der Merwe",
    views: 1890,
  },
];

export async function seedDemoArticles(): Promise<number> {
  await ensureSources();

  // Make the demo set idempotent.
  const existing = await db
    .select({ id: articles.id })
    .from(articles)
    .where(eq(articles.source, "180 Degrees News"))
    .limit(1);
  if (existing.length > 0) return 0;

  let inserted = 0;
  for (const a of A) {
    const publishedAt = new Date(Date.now() - a.hoursAgo * 3600_000);
    const result = await db
      .insert(articles)
      .values({
        guid: `desk:${a.slug}`,
        title: a.title,
        slug: a.slug,
        summary: a.summary,
        content: a.body,
        imageUrl: IMG[a.image],
        imageCredit: "Pexels",
        source: "180 Degrees News",
        sourceUrl: null,
        author: a.author,
        category: a.category,
        province: a.province ?? null,
        region: a.region ?? null,
        tags: a.tags,
        isBreaking: a.breaking ?? false,
        featured: a.featured ?? false,
        views: a.views,
        publishedAt,
      })
      .onConflictDoNothing({ target: articles.slug })
      .returning({ id: articles.id });
    if (result.length) inserted++;
  }
  return inserted;
}
