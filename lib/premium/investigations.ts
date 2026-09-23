import type { PremiumStory } from "./types";

const IMG = {
  floods:
    "https://images.pexels.com/photos/39457988/pexels-photo-39457988.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  taxi:
    "https://images.pexels.com/photos/34131616/pexels-photo-34131616.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  housing:
    "https://images.pexels.com/photos/33622143/pexels-photo-33622143.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  school:
    "https://images.pexels.com/photos/25457343/pexels-photo-25457343.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  port:
    "https://images.pexels.com/photos/36737519/pexels-photo-36737519.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  market:
    "https://images.pexels.com/photos/31131702/pexels-photo-31131702.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
};

export const PREMIUM_INVESTIGATIONS: PremiumStory[] = [
  {
    kind: "investigation",
    title:
      "The water war: how three provinces are rationing one river system",
    summary:
      "The Vaal supplies Gauteng, the Free State and millions of people downstream. As treatment plants fail and demand rises, towns are quietly imposing water schedules. An investigation into who is losing the taps — and who decides.",
    body: `JOHANNESBURG – The notices arrive by SMS at odd hours: "Water suspended in your area from 05:00 to 17:00 due to maintenance." In parts of the Vaal triangle, those schedules have stretched from days to weeks, and residents have learned to read "maintenance" as shorthand for a system under strain.

South Africa's water crisis is usually told through dam levels, which tells only the easier half of the story. The harder half is infrastructure: treatment works, pump stations and reticulation pipes that were designed for smaller cities and smaller economies. This investigation drew on municipal documents, hydrological data and interviews across Gauteng, the Free State and North West over three months.

What the documents reveal is rationing by administration rather than by emergency declaration. Municipalities under Section 63 intervention have formal water-use schedules; neighbouring municipalities without intervention apply nearly identical pressure informally, through pressure reductions that leave upper floors and hilltop suburbs dry.

Engineers are blunt about the maths. Sedimentation has reduced the useful capacity of several Vaal-linked dams by more than headline percentages suggest, while ageing treatment plants lose treated water through leaks before it ever reaches a meter. Non-revenue water in the worst-performing municipalities exceeds 40 percent — meaning nearly half of every treatment cycle is wasted before anyone pays for it.

The geography of inconvenience is unfair in predictable ways. Affluent suburbs bore private wells and install tanks; informal settlements on higher ground wait for JoJo tanks that arrive after, not before, outages. Schools and clinics are not exempted automatically in practice, despite policy.

Yet the reporting also found counter-examples that puncture fatalism. One mid-sized Free State municipality halved its losses in three years through metering, pressure management and a relentless leak-repair crew. The technology is Victorian; the difference was management attention and protected budgets.

National officials now speak openly about a "water-demand management decade": tighter standards for industrial users, mandatory metering and regional water boards with real enforcement powers. Whether those reforms outrun the failure curves of the existing plants is the question that will decide which towns keep pressure this time next year.

For now, the SMS remains the practical water policy for millions — and the people who can store the least water bear the longest days without it.`,
    category: "national",
    province: "gauteng",
    region: "City of Johannesburg",
    author: "Pieter van der Merwe",
    tags: ["water", "Vaal", "municipal services", "investigation"],
    imageUrl: IMG.floods,
  },
  {
    kind: "investigation",
    title:
      "Ghost trains and slow comebacks: what the PRASA recovery actually looks like at platform level",
    summary:
      "Corridor by corridor, commuter rail is returning after the vandalism collapse. But 180° found that 'reopened' stations and a usable commute are two different things — and the gaps fall hardest on workers who never got a subsidy for alternatives.",
    body: `JOHANNESBURG – Before sunrise at a station on the southern line, the ticket gates are shuttered but the platform is already full. The app says a train is due; the station staffer, more honest than the app, says it probably isn't. Some commuters wait anyway, because they cannot afford to be wrong.

The collapse and partial resurrection of the Passenger Rail Agency of South Africa is one of the country's most consequential infrastructure stories, and one often measured in press-release statistics: kilometres recovered, stations reopened, trainsets returned. This investigation instead measured what platform benches see — actual service against published schedules over five weeks on three corridors.

The gap between reopening and reliability is the story. Officially "recovered" corridors ran below advertised frequencies during the observation period, with cancellations clustered predictably on Mondays and Fridays. A handful of reopened stations lacked functioning ticket offices or full lighting, which matters disproportionately for women commuting in the dark.

Security remains the fault line. The copper and cable theft that disabled the network was never merely opportunistic; it was industrial, recurring and, in places, openly tolerated. Recovered lines now carry private security and visible policing, but officials admit protection budgets are unsustainable indefinitely.

Commuters who switched to taxis during the collapse rarely returned immediately. The arithmetic explains it: an unreliable train that fails once a week costs a worker a full day's taxi fare on top of a rail ticket. Trust in public transport, once broken, is repaid in months of punctuality, not ceremonies.

The economy-wide stakes are understated. Rail is the cheapest mechanical kilometre in South African commuting; every worker forced permanently onto a taxi or into fuel spending transfers money from household budgets to transport, an invisible wage cut concentrated in the lowest income brackets.

There are genuine wins. New sets on priority corridors are cleaner and safer than many expected, and peak patronage on the best-run lines is climbing month on month. Young station managers speak about service delivery rather than patronage politics.

But rail does not recover in press releases. It recovers when a worker can set an alarm for the same train five days a week. By that measure, the comeback is real but incomplete — and the country owes the missing reliability to the people who can least afford the alternatives.`,
    category: "national",
    province: "gauteng",
    region: "City of Johannesburg",
    author: "Tshepo Malema",
    tags: ["PRASA", "commuter rail", "transport", "investigation"],
    imageUrl: IMG.taxi,
  },
  {
    kind: "investigation",
    title:
      "The waiting-list economy: who really gets an RDP house, and who decides",
    summary:
      "In three metros, housing waiting lists run into hundreds of thousands while allocations number in the low thousands a year. 180° traced files through ward committees and found a system where relationships can beat registers.",
    body: `PORT ELIZABETH – At the Nelson Mandela Bay housing office, the queue starts before the staff arrive and usually ends without resolution. Applicants bring the same proof documents they brought last year, and the year before that: identity, affidavit, proof of residence, proof of nothing being owned. The file is updated. The position on the list is not.

South Africa's housing allocation system is supposed to be mechanical: qualify, register, wait, receive as projects come online. In practice it is a market in uncertainty, and this investigation across three metros found that waiting lists — often decades old — are neither single nor reliably numbered.

The structural problem begins with demand vastly outrunning delivery. Allocation rates in the three metros studied amounted to a small fraction of registered backlogs, which implies waiting periods that stretch beyond working lifetimes for recent applicants. When a system cannot deliver the queue it promised, informal influence fills the vacuum.

Documents and interviews describe recurring patterns: beneficiaries moved up lists after political interventions; duplicates across paper and digital registers; deceased applicants retained until families quietly substituted members; and, in the worst cases, officials linked to allocation decisions being investigated, suspended or moved without resolution.

Ward councillors occupy an impossible position — expected to be both ombudsmen and political representatives in a rationing system — and the honest ones complain publicly that they cannot verify the central register themselves. Several produced spreadsheets they maintain independently to defend constituents' positions.

There are defensible policy reasons allocation is not strictly chronological: emergency relocation after disasters, informal-settlement upgrading projects tied to specific land, and court orders. But those categories require transparent rules; where the rules are invisible, they look like favouritism.

Reformers point to three non-negotiables: a single public digital register with applicant-facing status tracking, hard timelines for resolving disputes, and protection for officials from political pressure on individual files. None are technically difficult.

Until then, the waiting list remains an economy of its own — of repeated bus fares to distant offices, of stamp money and affidavits, and of hope taxed annually by another visit. The houses are built. The trust in how they are allocated is not.`,
    category: "national",
    province: "eastern-cape",
    region: "Nelson Mandela Bay (Gqeberha)",
    author: "Sipho Nkosi",
    tags: ["housing", "RDP", "corruption", "investigation"],
    imageUrl: IMG.housing,
  },
  {
    kind: "investigation",
    title:
      "R15 a plate: auditing the school nutrition programme that feeds nine million children",
    summary:
      "The national school nutrition grant is one of the state's largest daily service deliveries. Between late deliveries, inflated supplier prices and kitchens with no water, our provincial audit finds why some pupils eat before midday and others never eat.",
    body: `DURBAN – At a primary school in uMgungundlovu, the nutrition volunteers know by Wednesday whether the food delivery truck will arrive that week. If it doesn't, they cook what the community contributes: maize meal, beans, occasionally eggs. The government's daily plate — designed at roughly fifteen rand per child in a basic meal — simply does not appear.

The National School Nutrition Programme feeds roughly nine million learners and is one of the most effective anti-hunger interventions in the state's arsenal; economists credit it with measurable attendance and retention gains, particularly for girls. It is also a vast procurement and logistics operation exposed at every node to failure and fraud.

Over one term, reporters and auditors tracked deliveries, invoices and kitchen conditions across schools in five provinces. The findings cluster into three failures. The first is delivery risk: single-supplier contracts leave districts with no fallback when a provider is paid late, disputes an invoice, or collapses mid-term, and pupils eat the consequences within days.

The second is pricing integrity. Unit prices for staples in sampled contracts varied widely between neighbouring districts, beyond transport cost explanations, and spot comparisons with wholesale markets showed schools in weaker municipalities systematically paying more. Procurement desks without capacity are price-takers; food suppliers know it.

The third is the kitchen itself. A surprising number of schools prepared meals without reliable running water or functional ventilation, forcing volunteers — often unpaid community members — to carry water and cook in conditions that would close a commercial kitchen. Where kitchens had been upgraded through provincial infrastructure grants, absentee delivery days fell sharply, suggesting logistics and facilities must be contracted together.

Volunteers themselves are the programme's hidden labour force, effectively subsidising the state with hours that have no formal employment security. Their absence during illness or protest halts feeding instantly.

Provincial officials who cooperated pointed to remedies already proven elsewhere: multi-supplier contingency frameworks, transparent weekly price benchmarks, and ring-fenced kitchen infrastructure. The programme works where it is treated as operations rather than patronage.

Nine million children cannot audit their own lunch. The numbers on the plate are small, but the stakes for attendance, dignity and learning are not.`,
    category: "national",
    province: "kwazulu-natal",
    region: "uMgungundlovu",
    author: "Chantel Felix",
    tags: ["education", "school nutrition", "procurement", "investigation"],
    imageUrl: IMG.school,
  },
  {
    kind: "investigation",
    title:
      "The 14-day problem: why South African exporters lose money at their own ports",
    summary:
      "Berth queues, customs reworks and rail feeder failures add days — and dollars — to every container. Using vessel-tracking data and exporter invoices, we show how delays quietly tax agriculture and mining exporters hardest.",
    body: `DURBAN – On a chart of vessel waiting times, the spike at the Durban container terminal looks technical. On a fruit exporter's spreadsheet, it looks like a penalty: cold-chain demurrage, cancelled sailing slots, and supermarket buyers in Europe discounting South African produce for unreliability.

Ports are where logistics theory meets the weather. A perishable container that misses its sailing cannot simply catch the next one; it may miss the supermarket window entirely, and the discount is paid by farmers thousands of kilometres inland. This investigation combined public vessel-tracking data with exporter invoices and terminal schedules over a high season.

The headline finding is the compounding delay problem. Individual bottlenecks — a berth wait here, a customs rework there, a rail feeder arriving days late — are each survivable. Stacked sequentially, they produce the "14-day problem": consignments designed for a predictable door-to-door window arriving too late to sell at full price.

Rail remains the deepest structural wound. Mining and agriculture exporters designed logistics around freight corridors; when feeder rail underperforms, containers move onto road at premiums that erase margins and damage the national road network. The port cannot fix itself while cargo arrives by erratic truck queue.

Transnet reform is visible at the edges — private terminal partnerships, extended operating hours and improved equipment availability at select berths. But exporters report that gains at the quayside are reclaimed at customs and gatehouses, where systems integration remains incomplete and a single document error can idle a refrigerated container for days.

International comparisons are uncomfortable. Regional competitors market reliability, not just cost; a buyer of citrus or table grapes will pay slightly more for a port that keeps promises. South Africa still competes on quality and price while losing on the metric that increasingly decides contracts.

There is no villain and therefore no single press conference that fixes it. The solution stack is unglamorous: data-sharing between rail, terminal and customs; published weekly reliability measures per corridor; penalties and incentives tied to actual dwell times; and genuine redundancy so one failure doesn't propagate across 14 days.

Until then, South Africa's exporters pay a tariff that never appears on the invoice: the discount the world applies for never being quite sure the cargo will arrive.`,
    category: "business",
    province: "kwazulu-natal",
    region: "eThekwini (Durban)",
    author: "Ahmed Patel",
    tags: ["ports", "Transnet", "exports", "logistics", "investigation"],
    imageUrl: IMG.port,
  },
  {
    kind: "investigation",
    title:
      "The funeral economy: what millions of South Africans really spend to bury their dead",
    summary:
      "Funeral cover is one of the country's most-held financial products, yet few families know what they're buying or how prices are set. A market investigation into premiums, parlour practices and the emotional economics of dignity.",
    body: `JOHANNESBURG – In a country where funeral attendance is an obligation as much as an honour, burial cover has become one of the most widely held financial products in low-income households, often outnumbering medical aid membership many times over. The spending is rational culturally and enormous economically; it is also poorly understood.

This market investigation examined policy documents, parlour quotes and household budgets in three provinces to map what families actually receive when they pay a monthly funeral premium, and what they still have to fund themselves.

The first surprise is coverage gaps. Entry-level policies often cover a coffin, hearse and basic tent, while the costs families feel most acutely — food for mourners, transport for relatives, extra days of ceremony, and grave fees at municipal cemeteries — sit outside the cover. Bereaved households routinely borrow to meet precisely these social obligations.

Premium structures reward persistence harshly. Policies taken out through informal group schemes offer community and trust but limited regulatory protection; lapsed members may lose contributions with no surrender value, while waiting periods and cause-of-death exclusions surprise families at the worst possible moment.

Undertakers operate in a market where customers cannot comparison-shop under grief and time pressure, and the price dispersion found in this audit reflects that: comparable burial packages within the same city varied substantially, with the largest gaps concentrated in townships where alternatives seem scarce.

There are counterweights. Regulated insurers with transparent schedules exist, consumer associations recommend written quotations from three parlours, and municipalities control cemetery fees that should be publicly posted. Some stokvel-linked schemes have begun partnering with regulated underwriters to add claims certainty without losing community design.

The deeper question is whether a society that spends so much on death is spending enough on the living. Financial advisers interviewed for this series did not tell families to abandon dignified burial; they urged separating cultural dignity from overpriced products.

A funeral is not a luxury, which is exactly why this market deserves hard scrutiny. The same social pressure that sustains the stokvel also sustains opaque pricing — and grief, as every parlour knows, never negotiates well.`,
    category: "lifestyle",
    province: "gauteng",
    author: "Naledi Dlamini",
    tags: ["funeral cover", "consumer", "household finance", "investigation"],
    imageUrl: IMG.market,
  },
];
