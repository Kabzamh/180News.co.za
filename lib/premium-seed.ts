import { db } from "@/db";
import { articles } from "@/db/schema";
import { shortHash } from "@/lib/utils";
import type { PremiumStory } from "@/lib/premium/types";
import { PREMIUM_INVESTIGATIONS } from "@/lib/premium/investigations";
import { PREMIUM_COLUMNS } from "@/lib/premium/columns";
import { PREMIUM_EXPLAINERS } from "@/lib/premium/explainers";
import { PREMIUM_GUIDES } from "@/lib/premium/guides";
import { buildBriefings } from "@/lib/premium/briefings";

const LEGACY_INVESTIGATIONS: PremiumStory[] = [
  {
    kind: "investigation",
    title:
      "The coalition diaries: inside the weekly meetings where South Africa is actually governed",
    summary:
      "Three cities, seven parties and hundreds of private bargains. 180° sat in on six weeks of coalition whip meetings to show how power really moves in the Government of National Unity era.",
    body: `PRETORIA – On a grey Tuesday in the Union Buildings' western wing, fourteen people who campaigned against one another fifteen months ago now share a table, a flask of instant coffee and, increasingly, a working vocabulary of compromise. The official agenda runs to four pages. The real agenda is written in WhatsApp groups that journalists — and sometimes ministers — never see.

This is the Government of National Unity as it actually functions: not the stage-managed briefings of the parliamentary village, but the weekly "whips' cluster" where the wording of a single clause can decide whether a city gets its budget. Over six weeks, 180° was granted limited access to three such forums in Pretoria, Johannesburg and Cape Town on condition that direct disputes were reported without naming individual negotiators.

The first surprise is the paperwork. Coalition government runs on matrices: who supports what, who abstains, and which two parties can be traded for which committee chair. A single A3 sheet, updated every Sunday night by a rotating chief of staff, has become the most powerful document in the metros. "We call it the scoreboard," one whip admitted. "If your name isn't in green by 6pm Monday, your amendment dies on the floor."

The second surprise is how much is decided by staff rather than principals. Mayors and party leaders arrive at summits to ratify positions already hammered out by thirty-something policy researchers who remember every walkout from the last council term. Several of these officials told the same story: their bosses rarely read the full coalition agreement, but they themselves can recite its annexures.

Money, predictably, is where unity strains hardest. In one metro, the budget vote was delayed twice because a smaller partner wanted a mayoral committee portfolio that controls an entity with an R800-million procurement line. In another, a threatened walkout over municipal appointments ended within forty minutes once a technical working group was promised.

Yet the diaries also reveal something the loud politics obscures: the machine keeps moving. Of the 112 contested items tracked during the observation period, 89 eventually passed with multi-party support, often after language was softened rather than policy abandoned. "We don't agree on the country," a drafter put it. "We agree on the sentence in front of us."

The risk is accountability by fog. When every decision is multi-party, no single party owns a failure, and voters struggle to punish anyone at the ballot. Reformers argue that is the price of stability; critics call it a permanent coalition of incumbents. Both, the scoreboard suggests, are partly correct.

For the officials living inside it, the lesson is humdrum and hopeful at once: South Africa's coalition era is being built less in speeches than in the slow, unglamorous editing of paragraphs by exhausted people who have learned to keep talking.`,
    category: "politics",
    province: "gauteng",
    region: "City of Tshwane (Pretoria)",
    author: "Lerato Mokoena",
    tags: ["coalition", "GNU", "Parliament", "investigation"],
    imageUrl:
      "https://images.pexels.com/photos/33622143/pexels-photo-33622143.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    kind: "explainer",
    title:
      "Your household budget in 2027: the rate decisions, tax shifts and price shocks already locked in",
    summary:
      "The Reserve Bank, Treasury and municipal tariff schedules have already decided much of what your money will do next year. This guide maps every confirmed and probable move, rand by rand.",
    body: `JOHANNESBURG – Personal finance in South Africa is often presented as a monthly surprise: a fuel price here, a repo-rate decision there. But the reality for 2027 is that much of the pressure on household budgets is already encoded in published schedules, forward guidance and multi-year tariff agreements. We assembled the documents so you don't have to.

The single biggest swing factor remains the repurchase rate. The Reserve Bank's quarterly projection model points to shallow easing through the first half of the year. For a household carrying R750,000 of prime-linked bond debt, every 25-basis-point cut is worth roughly R125 a month. Two cuts, on the schedule implied by rate markets, would return about R250 — meaningful, but a fraction of the R1,800 added when rates rose.

Municipal tariff increases are the most certain line item. Approved multi-year budgets place electricity and water increases ahead of headline inflation for most metros, even as Eskom's own price path flattens. The gap, analysts note, is distribution: the cost of maintaining ageing reticulation networks is moving from national utility balance sheets to municipal ones.

Fuel remains hostage to two forces local finance ministers cannot control: the oil price and the rand. Each R1 move in the exchange rate against the dollar shifts the petrol price by roughly 29 cents a litre; each $10 per barrel move in Brent is worth about R1.40. A household filling two tanks a month should budget on a R250 swing in either direction between quarters.

Food inflation is quietly improving, but unevenly. Bread, maize and poultry prices respond quickly to grain markets; the pass-through to shelf prices is slower on the way down than on the way up — a well-documented asymmetry that costs households about six weeks of relief on every commodity downturn.

Tax is where budgeting gets political. Expect fiscal drag relief targeted at the lowest brackets, but no meaningful reduction in the fuel or RAF levies given revenue pressure. Sin taxes will rise as they always do; retirement-fund contribution relief remains the single most valuable legal break most readers never claim.

The smartest household hedge remains depressingly ordinary: three months of expenses in an accessible account, fixed-rate discipline on any new debt, and a written monthly review. None of it is glamorous; all of it compounds faster than the pundits suggest.`,
    category: "business",
    province: "gauteng",
    region: "City of Johannesburg",
    author: "Ahmed Patel",
    tags: ["repo rate", "household budget", "inflation", "Treasury"],
    imageUrl:
      "https://images.pexels.com/photos/6310123/pexels-photo-6310123.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    kind: "investigation",
    title:
      "The women of Kempton Park: six weeks of fear, grief and the thin blue line",
    summary:
      "As investigators pursued a serial-killing theory, the Ekurhuleni communities where bodies were found built their own systems of safety. A long read on trust, patrols and what policing owes women.",
    body: `KEMPTON PARK – The WhatsApp group runs on a strict timetable. By 5.30 every morning, a roster confirms which two women will walk with which neighbours to the taxi rank; by 7pm, a second roster accounts for everyone returning from the industrial shift at the logistics park. It is not the protection any of them wanted. It is the protection they built.

For six weeks, the string of women's bodies discovered around Kempton Park dominated headlines, court filings and water-cooler speculation. But behind the breaking-news cycle, communities in Ekurhuleni were quietly reorganising daily life itself: routes home, closing times, which streets had working streetlights and which taverns kept cameras switched on.

This account is assembled from interviews with 23 residents, three community-patrol organisers, two legal-aid practitioners and current and former policing officials, several of whom spoke on condition of anonymity because the investigation remains active.

What emerges is a portrait of fear layered onto older realities. Gender-based violence in the area was already a crisis before the serial-killer theory emerged; GBV desks at nearby stations have been understaffed for years. The current investigation at least brought resources: specialised units, visible joint operations and a forensic push through a DNA backlog that routinely stretches to months for ordinary cases.

Residents are clear-eyed about the trade-off. "We are grateful for the cameras now," one patrol organiser said outside a community hall, "but our sisters went missing long before the television arrived." That sentiment recurs: an investigation at full intensity reveals, by contrast, how slowly the same machinery moves for families without national attention.

Community patrols carry their own risks. Civil-society lawyers warn that vigilantism has shadowed every serial-offender panic in South African history, and that evidence gathered outside proper procedure can collapse cases in court. The most organised Kempton Park groups have responded by formally linking with station command structures, logging patrols and insisting they observe rather than confront.

The structural lessons are not new; they are simply expensive. Functional lighting, visible patrols, rapid forensic turnaround and GBV response capacity in every shift — not only during a national panic. The question the case poses to police leadership is uncomfortable: what does it say that communities must build safety on WhatsApp because the state's version only arrives under spotlights?

For the women checking the group before dawn, the philosophy is simpler than policy. "We are not detectives," one said, fastening a reflective armband. "We are just refusing to be the next name on the list."`,
    category: "national",
    province: "gauteng",
    region: "Ekurhuleni",
    author: "Sipho Nkosi",
    tags: ["Kempton Park", "GBV", "SAPS", "courts", "investigation"],
    imageUrl:
      "https://images.pexels.com/photos/39150120/pexels-photo-39150120.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    kind: "investigation",
    title:
      "Clinic by clinic: the nine-province audit of South Africa's primary health care",
    summary:
      "180° and community health workers logged medication, staffing and water access at 180 facilities. The national averages hide a tale of two health systems — sometimes in the same district.",
    body: `DURBAN – National averages are kind to the health system. A province can report 92 percent medicine availability while a specific clinic runs out of chronic medication for three weeks; the average, smoothed across hundreds of facilities, barely moves. To find the system patients actually experience, you have to go clinic by clinic.

Over four months, 180° worked with community health workers, patient advocacy groups and independent nurses to log conditions at 180 primary-care facilities across all nine provinces, focusing on the three questions that matter most to chronic patients: are the medicines there, is the staff complement filled, and does the tap work.

The results defy single-narrative summaries. Western Cape and Gauteng facilities top most operational measures, but both contain pockets where chronic collection queues exceed four hours. Some of the most reliable clinics in the audit are small rural facilities in the Eastern Cape led by matrons who have held the same post for two decades. Geography predicts less than leadership.

Medicine stock-outs follow a distinctive pattern: short, sharp and concentrated around procurement transitions. National Health Insurance pilot districts did not systematically outperform comparable non-pilot districts during the audit period, though several reported better equipment-maintenance schedules — evidence, officials argue, that the financing reforms are too new to judge.

The water findings are the most basic and the most damning. Facilities without reliable running water cannot practise infection control honestly, regardless of policy ambitions. In the worst-performing district, a quarter of audited clinics reported intermittent supply, and several relied on stored tanks during consultation weeks.

Staff morale divides sharply along administrative lines. Nurses in facilities with functional appointment systems and stocked drug rooms describe their work as hard but honourable; those in facilities short of both describe burnout in near-identical language wherever the province.

The audit's central recommendation, echoed by nearly every facility manager interviewed, is unglamorous: publish facility-level dashboards monthly rather than province-level reports quarterly. Patients cannot choose between averages, but they can choose between clinics if the information exists.

South Africa's primary health system is neither the collapse described by its loudest critics nor the guaranteed right promised on paper. It is thousands of facilities, each succeeding or failing on maintenance, management and medicine — fixable problems, but only once the averages are made honest.`,
    category: "national",
    province: "kwazulu-natal",
    region: "eThekwini (Durban)",
    author: "Naledi Dlamini",
    tags: ["healthcare", "clinics", "NHI", "audit", "investigation"],
    imageUrl:
      "https://images.pexels.com/photos/39442464/pexels-photo-39442464.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    kind: "column",
    title:
      "After the golden generation: how the Springboks are quietly rebuilding",
    summary:
      "The trophies masked a transition already underway. Inside the squad's succession planning, the franchise pipeline feeding it, and the 2027 question no coach answers on the record.",
    body: `CAPE TOWN – Dynasties prefer to discuss the present, which is why the most interesting conversation in Springbok rugby happens off-camera: who, precisely, comes next? The trophy cabinet of the golden generation is historic. It is also, demographically, finite — and succession planning inside the national set-up is further advanced than the public narrative suggests.

Speaking to franchise coaches, player agents and two current squad staff on condition of anonymity, a picture emerges of a programme deliberately widening its depth before the public notices the gap. The logic is borrowed from the All Blacks' famed "two players per position" doctrine, adapted to a country with fewer professional contracts.

The front row, long the spiritual core of the Bok scrum, is the most managed transition. Loosehead and tighthead depth charts now run four names deep at Test level, with props blooded in the brutal school of the northern hemisphere tour rather than parachuted into knockout rugby. Hooker remains the position where selectors lose sleep, despite promising franchise form.

At the back, the midfield axis that defined a World Cup cycle cannot be replaced overnight, but the style around it is already evolving. Attacking shape in the most recent training camps used wider, flatter alignment than the conservative structures of the trophy years — an acknowledgement that modern rugby defences cannot be ground down indefinitely.

The franchise pipeline tells its own story. Four seasons ago, a handful of URC teams dominated selection; the latest camps draw on every franchise, including names from unions that historically exported rather than retained talent. Conditioning data — shared more aggressively since the professional restructure — allows national coaches to track workload months before a squad is named.

Leadership transition may be the subtlest work. The squad's culture was built around a core group whose standards were enforced in the dressing room, not by coaches. Sustaining that without them requires identifying "cultural carriers" early, and national staff privately describe character assessment as now carrying equal weight with the stopwatch.

None of this guarantees continued dominance. International rugby is a tournament of six-week peaks and cruel injuries, and every rebuilding cycle ends one of two ways. But the notion that the Boks face a cliff edge understates how deliberately the next generation is being prepared — even if the golden generation would prefer nobody noticed until the next final is won.`,
    category: "sport",
    province: "western-cape",
    region: "City of Cape Town",
    author: "Juanre van Wyk",
    tags: ["Springboks", "rugby", "succession", "World Cup", "analysis"],
    imageUrl:
      "https://images.pexels.com/photos/29804436/pexels-photo-29804436.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    kind: "investigation",
    title:
      "Title deeds at midnight: inside Tshwane's decade-long battle to give residents ownership",
    summary:
      "A title deed is a piece of paper worth bank loans, family security and generational wealth. In one metro, officials are clearing a 30-year backlog one block at a time. We followed the files.",
    body: `PRETORIA – At a community hall in Mamelodi East, a queue begins forming before sunrise. Nobody is waiting for grants or tickets. They are waiting for a single document most South African homeowners never see: the title deed proving that the house where they have lived for decades is, legally and finally, theirs.

South Africa's title-deed backlog is one of the quietest economic stories in the country. In townships and RDP developments across the metros, hundreds of thousands of families occupy homes they do not formally own — a legacy of bureaucratic gaps, developer insolvencies, missing records and the slow machinery of conveyancing.

In the City of Tshwane, a dedicated title-deeds restoration unit has spent the past year doing unglamorous forensic work: tracing original township-establishment files, reconciling decades-old beneficiary lists with current occupants, and commissioning the affidavits that unblock the Registrar of Deeds.

A single file tells the story. One Mamelodi resident, now 64, moved into her house when PW Botha was still state president. Her developer went bankrupt; her file was archived twice; the original beneficiary list contained her late mother's name, misspelled. The restoration required six affidavits, a ward-councillor confirmation, a deceased-estate search and four months. She received her deed in a ceremony last month.

Ownership is wealth infrastructure. A title deed allows a family to access home-equity finance, to pass property between generations without legal limbo, and to resist unlawful eviction. Economists who study township economies describe it as the largest unlockable asset class most residents will ever touch.

The obstacles are systemic rather than dramatic. Conveyancers are scarce; deeds-office turnaround varies wildly; municipal accounts must be reconciled before transfer; and occupants do not always match beneficiaries, requiring family mediation rather than legal threats. The unit's breakthrough has been bundling cases in batches of dozens, reducing per-file legal costs and giving conveyancers predictable workflows.

Critics caution that restoration without servicing is incomplete: ownership of a house with failing water and intermittent electricity formalises poverty rather than wealth. Officials running the programme agree, arguing that title security at least gives residents standing to demand the rest.

At the midnight end of the queue, the framing is simpler. Holding the deed, one resident put it plainly: "Now the house works for us, not against us."`,
    category: "national",
    province: "gauteng",
    region: "City of Tshwane (Pretoria)",
    author: "Tshepo Malema",
    tags: ["title deeds", "housing", "Tshwane", "township economy"],
    imageUrl:
      "https://images.pexels.com/photos/33622143/pexels-photo-33622143.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    kind: "column",
    title:
      "Cape Town's quiet export boom: the startups selling South African software to the world",
    summary:
      "While load-shedding headlines dominated, a generation of Cape and Stellenbosch founders built global revenue lines. What the data shows — and the infrastructure bottleneck threatening the curve.",
    body: `CAPE TOWN – The standard story of South African technology is one of disruption at home: fintech for the unbanked, apps for the load-shedded, platforms built for local constraint. A quieter story has started to dominate the venture-capital spreadsheets: companies built in the Cape that earn the majority of their revenue overseas.

An analysis of recent funding rounds, export data and interviews with founders of nine scaling companies reveals a pattern. The strongest international performers are not consumer plays chasing local market share but vertical-software businesses selling specialised tools into global industries — logistics, insurance, mining technology and developer infrastructure.

The economics are unforgiving and clarifying. A South African startup targeting only the domestic market faces a hard ceiling measured in tens of millions of dollars of revenue. The same product sold into global markets faces a ceiling an order of magnitude higher, which changes how international investors price the company from the first cheque.

Why the Cape? Founders cite an unusual combination: a favourable time zone overlapping both Europe and Africa, dollar salaries that stretch dramatically further in rands, a strong actuarial and mathematical talent pipeline, and — increasingly — load-shedding mitigation so institutionalised that rooftop solar and backup links are standard inclusions in office leases.

The constraints are equally distinctive. Bandwidth in some nodes remains expensive relative to global peers, skilled-immigration processes frustrate recruitment, and foreign exchange controls add friction to every international billing cycle. One founder described moving subscription revenue through the banking system as "a monthly act of paperwork theatre".

The biggest bottleneck, though, is scale-up talent. The country produces excellent engineers and founders; it produces fewer executives with experience running a 500-person global organisation, forcing companies to import or relocate leadership just as they accelerate.

Policy is largely absent from the story in both directions. Founders report little targeted support for software exports, yet also fewer barriers than traditional exporters face — a reminder that the fastest-growing trade flows are sometimes the ones legislation never anticipated.

The message for a jobs-starved economy is significant: global software exports create high-wage employment that survives domestic downturns. Whether the next decade produces dozens of these firms or a handful depends less on entrepreneurial spark — which is abundant — than on bandwidth, immigration reform and a state that notices the boom enough to stop obstructing it.`,
    category: "technology",
    province: "western-cape",
    region: "Cape Winelands",
    author: "Chantel Felix",
    tags: ["startups", "Cape Town", "exports", "software", "analysis"],
    imageUrl:
      "https://images.pexels.com/photos/4864249/pexels-photo-4864249.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    kind: "investigation",
    title:
      "Fields of transition: the Northern Cape solar corridor two years on",
    summary:
      "The green-energy desert promised jobs, tax revenue and a future beyond coal. 180° returned to the towns hosting South Africa's biggest renewable build to measure what actually changed.",
    body: `KIMBERLEY – Drive the N8 west of Kimberley and the horizon changes before the road signs do: rows of photovoltaic panels where there was recently only thornveld, substations that glow at night, and construction convoys carrying the components of the country's energy transition. Two years after the first projects in the solar corridor reached financial close, 180° returned to test the promises made.

The headline numbers are real. Thousands of construction jobs were created at peak, municipal rate bases expanded, and landowners — in many cases traditional communities through trusts — began receiving lease income that did not exist in the livestock-only economy. Grid connection schedules that once stretched for years accelerated under the energy-crisis reforms.

But the difference between construction and operations is the difference between a boom and an economy. Solar farms employ heavily during the 12 to 18 months of building, then sparsely: a site that employed 600 people during construction may retain 25. Towns that planned municipal revenue and business around the peak face a cliff unless operations-phase work, local manufacturing and maintenance contracts are deliberately anchored locally.

Local procurement has improved but remains uneven. Mounting structures and civil works are often sourced in-country; inverters, trackers and specialised electronics still arrive through ports from overseas. Local-content rules exist on paper but are contested in practice, and several municipal officials complained that they lack the technical capacity to verify compliance claims.

Community ownership models offer the most instructive cases. Where projects carry genuine equity stakes held in community trusts, lease income funds bursaries, streetlights and clinic maintenance — visible returns that shift local opinion from suspicion to support. Where trusts are opaque or distant, suspicion returns with the first maintenance dispute.

The coal comparison hangs over everything. Mpumalanga's coal economy supported dense supply chains and thousands of indirect jobs; a solar panel field, once built, demands relatively few inputs. A "just transition" that closes the gap therefore requires manufacturing — panel assembly, steel mounting, cable production — deliberately located near the corridor, not imported at scale.

For now the desert is producing electricity exactly as promised; whether it produces a durable economy is the unfinished business. "The panels were the easy part," one municipal manager said, watching a convoy move west. "Now we must build the town around them."`,
    category: "business",
    province: "northern-cape",
    region: "ZF Mgcawu (Upington)",
    author: "Pieter van der Merwe",
    tags: ["renewables", "just transition", "Northern Cape", "solar", "investigation"],
    imageUrl:
      "https://images.pexels.com/photos/32163264/pexels-photo-32163264.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
];

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

export function allPremiumStories(): PremiumStory[] {
  return [
    ...buildBriefings(),
    ...PREMIUM_INVESTIGATIONS,
    ...LEGACY_INVESTIGATIONS,
    ...PREMIUM_COLUMNS,
    ...PREMIUM_EXPLAINERS,
    ...PREMIUM_GUIDES,
  ];
}

export async function seedPremiumArticles(): Promise<number> {
  const stories = allPremiumStories();
  let inserted = 0;
  for (const [i, a] of stories.entries()) {
    const slug = `${slugify(a.title)}-${shortHash(a.title)}`;
    const published =
      a.publishedAt ??
      new Date(Date.now() - (2 + i) * 3_600_000 - (i % 5) * 86_400_000);
    const result = await db
      .insert(articles)
      .values({
        guid: `premium:${slug}`,
        title: a.title,
        slug,
        summary: a.summary,
        content: a.body,
        imageUrl: a.imageUrl,
        imageCredit: "Pexels",
        source: "180 Degrees News — All Access",
        sourceUrl: null,
        author: a.author,
        category: a.category,
        province: a.province ?? null,
        region: a.region ?? null,
        tags: a.tags,
        isBreaking: false,
        featured: false,
        isPremium: true,
        premiumKind: a.kind,
        views: 120 + ((i * 137) % 600),
        publishedAt: published,
      })
      .onConflictDoUpdate({
        target: articles.guid,
        set: { premiumKind: a.kind, isPremium: true },
      })
      .returning({ id: articles.id });
    if (result.length) inserted++;
  }
  return inserted;
}
