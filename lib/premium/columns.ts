import type { PremiumStory } from "./types";

const IMG = {
  politics:
    "https://images.pexels.com/photos/3944585/pexels-photo-3944585.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  newsroom:
    "https://images.pexels.com/photos/33622143/pexels-photo-33622143.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  money:
    "https://images.pexels.com/photos/6310123/pexels-photo-6310123.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  clinics:
    "https://images.pexels.com/photos/39442464/pexels-photo-39442464.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  courts:
    "https://images.pexels.com/photos/39150120/pexels-photo-39150120.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  rugby:
    "https://images.pexels.com/photos/29804436/pexels-photo-29804436.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  taxi:
    "https://images.pexels.com/photos/34131616/pexels-photo-34131616.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  school:
    "https://images.pexels.com/photos/25457343/pexels-photo-25457343.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  env:
    "https://images.pexels.com/photos/33074372/pexels-photo-33074372.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  lucky:
    "https://images.pexels.com/photos/31131702/pexels-photo-31131702.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  live:
    "https://images.pexels.com/photos/5235481/pexels-photo-5235481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
};

export const PREMIUM_COLUMNS: PremiumStory[] = [
  {
    kind: "column",
    title: "Maseko: South Africa keeps negotiating — and that is the whole story",
    summary:
      "The Editor-in-Chief on a political age defined not by dramatic realignment but by the unglamorous persistence of talking.",
    body: `JOHANNESBURG – Foreign editors ask me, on every visit, the same tired question: has South Africa turned the corner? It is the wrong image. This is not a country rounding a corner; it is a country holding a conversation it cannot afford to end.

You can see it in the Government of National Unity, where parties that denounced each other at rallies now share committee rooms. You can see it in coalition councils, in wage negotiations, in the slow architecture of the just transition, even in the meetings between taxi associations and the metros that once spoke only through shutdowns.

The commentary industry prefers rupture: walkouts, splits, collapse. Rupture makes the livestream thrum. But actual governance, this year, has been the management of non-collapse — budgets amended at midnight, phrases traded for votes, and enough grown-ups in enough rooms to keep the lights conversation moving.

That is neither heroic nor sufficient. Coalition government without transparency can become mutual protection; negotiations that never conclude can masquerade as policy. Our job in the newsroom is therefore the boring, vital one: reporting the sentence as well as the shouting, the annexure as well as the presser.

Readers sometimes tell us they miss decisive politics. I understand the nostalgia. But I came of age in newsrooms where decisive majorities made profoundly bad decisions very quickly, and where the people outside the majority simply waited for the next lurch. Negotiated democracy is slower and smaller, and it is also the only model currently on offer that acknowledges how many of us share this country.

So I am not uncritical of the talking. I am simply against mistaking volume for progress and silence for strength. A South Africa still arguing at midnight is a South Africa still in the room.

Our beat, as a newsroom, is to make sure the door stays open, the minutes get published, and the people doing the talking remember they were sent there. That is not a small thing. It is, right now, the whole thing.`,
    category: "politics",
    province: "gauteng",
    region: "City of Tshwane (Pretoria)",
    author: "Thandiwe Maseko",
    tags: ["column", "coalition", "editor's note"],
    imageUrl: IMG.politics,
  },
  {
    kind: "column",
    title: "Naidoo: Why the newsroom still believes in local reporters",
    summary:
      "Algorithms aggregate the whole world and miss your street. A Managing Editor's case for the least fashionable, most necessary beat in journalism.",
    body: `JOHANNESBURG – When a metro's pothole programme starts, the press release arrives in every inbox. When it quietly stops, no release goes out — which is exactly when a reporter who drives those streets earns their keep.

The economics of news have spent a decade rewarding aggregation: take a wire, add a headline, scale the audience. It is efficient, and it produces a country readers can scroll through without recognising. At 180 Degrees News we have bet the other way. Our most valuable assets are the people who know which intersection floods first, which clinic's chronic queue moves on Wednesdays, and which municipal promise has been repeated three budgets in a row.

Local knowledge is a form of expertise that no feed can manufacture. A reporter covering the taxi industry does not need to Google why a negotiation matters; they have taken the routes. Our Free State correspondent reads a turnaround plan in the context of potholes they have photographed for years. This is how press releases become accountability.

The trade-offs are real. Local journalism is slow, sometimes thankless, and rarely viral. It requires newsrooms to value a story that reaches 8,000 deeply affected readers over a hot take that reaches 800,000 indifferent ones. We make that choice deliberately, because democracy happens at the level of a council agenda.

It is also why All Access members matter to us directly: your subscriptions fund the unglamorous beats — transport, clinics, municipal budgets, district courts — that aggregation cannot support.

When we miss something, tell us. When the story is in your street, send it. A modern newsroom is not a broadcast tower; it is a listening post. The local reporter remains the best microphone ever invented, provided we keep hiring them.`,
    category: "national",
    province: "gauteng",
    region: "City of Johannesburg",
    author: "Daniel Naidoo",
    tags: ["column", "journalism", "local news"],
    imageUrl: IMG.newsroom,
  },
  {
    kind: "column",
    title: "Mokoena: The coalition maths no political poster will tell you",
    summary:
      "Majority government was arithmetic you could shout. Coalition government is arithmetic you must whisper — and it changes what voters actually decide.",
    body: `PRETORIA – On the campaign trail, every party pretends it is still 2004: one ballot, one winner, one programme. In the council chamber, the arithmetic has changed completely, and voters deserve an honest explanation of what their cross now does.

A vote today rarely hands anyone power outright. It changes the price of the coalitions that follow. In a hung council, even small parties can extract committees, mayoral posts, or policy concessions wildly disproportionate to their national vote share — which is why the voter who casts a ballot for a kingmaker party should understand they may be crowning a specific set of compromises.

This is not an argument against coalitions; they reflect a genuinely diverse electorate better than artificial dominance. But coalition maths carries three under-reported costs. The first is accountability dilution, where every failed service is someone else's fault. The second is transaction fatigue, with offices treated as bargaining chips rather than functions. The third — and I think most serious — is the shrinking of the voter's mandate into an opening bid that gets negotiated away behind closed doors.

The reform agenda is not mysterious. Public coalition agreements with measurable annexures, ward-level reporting of who voted for what, and rules that collapse a council only when a genuine alternative majority exists. Sunshine, in other words, on the scoreboard.

For the individual voter, the practical lesson is to read the local balance of numbers rather than the national noise. A vote in a competitive metro behaves differently from one in a stronghold, and neither behaves the way the posters imply.

South Africa's politicians will keep pretending that one decisive victory is possible. Our voters, more than most, have earned a politics that tells them the truth: they are electing negotiators now, and the quality of those negotiators is the election.`,
    category: "politics",
    province: "gauteng",
    region: "City of Tshwane (Pretoria)",
    author: "Lerato Mokoena",
    tags: ["column", "coalition", "elections", "analysis"],
    imageUrl: IMG.politics,
  },
  {
    kind: "column",
    title: "Patel: The quiet comeback nobody put in the headline — your household balance sheet",
    summary:
      "Markets rally and crash on a single number. The real story of this cycle is slower and more useful: households are quietly repairing their finances.",
    body: `SANDTON – Headlines track the repo rate announcement the way football tracks a penalty shoot-out, and fair enough — the decision matters. But the most interesting financial story of this cycle is not happening at the Reserve Bank; it is in your debit orders.

Dig through bank quarterly data and a pattern emerges. After the rate shock, households did the unglamorous thing: they cut expensive short-term debt, moved cheaper balances around, rebuilt small savings buffers, and reduced discretionary spending on durable goods. Mortgage arrears peaked lower than models predicted and are easing. It is not prosperity; it is repair.

The irony is that the very interest rates which caused the pain created the discipline. Higher returns on savings accounts did more for emergency funds than a decade of financial literacy campaigns, while the cost of servicing new debt killed off marginal borrowing. South African consumers, caricatured as permanently overstretched, behaved like people who remembered previous cycles.

Do not mistake repair for comfort. Food costs, municipal tariffs and transport remain structurally heavy, and the unemployed and near-retired are excluded from the recovery entirely. The average hides enormous inequality; the household rebuilding its buffer sits next to the household with no buffer at all.

For the employed household, the strategic question as rates turn is what to keep from the austerity era. The emergency fund, the paid-down expensive card, the automated savings debit order — these deserve to survive the return of cheap money. The worst outcome is a repeat of every previous easing: buffers dismantled the moment confidence returns.

Markets will still shout at every committee meeting. But compound interest rewards the boring, and this year's best financial story is millions of South Africans quietly keeping the boring habits.`,
    category: "business",
    province: "gauteng",
    region: "City of Johannesburg",
    author: "Ahmed Patel",
    tags: ["column", "household finance", "interest rates", "analysis"],
    imageUrl: IMG.money,
  },
  {
    kind: "column",
    title: "Dlamini: The medicine cupboard tells the real story of a clinic",
    summary:
      "Before you read a health-department presentation, visit the pharmacy. What is actually on the shelves determines whether policy exists for the patient.",
    body: `DURBAN – I have learned to ignore the front office at a clinic, politely, and head straight for the medicine cupboard. It cannot spin. The shelves either hold the chronic stock or they don't, and that single fact tells you more about the health system than a district budget presentation.

Policy in South Africa is generally good. The problem is execution density — the gap between what exists on paper in a provincial head office and what reaches the room where a grandmother collects hypertension medication. That gap is not a single failure but a chain: procurement timing, supplier payment, warehouse logistics, pharmacist staffing, storage temperature, security, and the community health worker who knows who missed their appointment.

Every link is fixable, but none is glamorous, which is why political attention gravitates toward launches rather than stock cards. Yet a clinic with an unreliable chronic supply does not merely inconvenience patients; it breaks treatment adherence, which is the entire game in HIV, diabetes and hypertension. A patient who cannot trust the queue eventually stops joining it, and reappears later in a hospital at twenty times the cost.

The tools to close the gap exist. Stock-visibility dashboards, community monitoring, and — crucially — paying suppliers on time. Many stock-outs trace not to national shortages but to liquidity cascades where a province has not settled a provider, who has not delivered, to a clinic that looks "failed" on television.

My reporting has also shown that the same system can work remarkably well under an exceptional matron and a functional procurement desk. That variability is, paradoxically, hopeful: it proves the constraints are managerial, which means they are human, which means they can be changed.

When politicians announce health milestones, ask one question: what is on the shelves today? The answer is the policy, whatever the press release says.`,
    category: "national",
    province: "kwazulu-natal",
    region: "eThekwini (Durban)",
    author: "Naledi Dlamini",
    tags: ["column", "healthcare", "clinics"],
    imageUrl: IMG.clinics,
  },
  {
    kind: "column",
    title: "Nkosi: A docket does not close itself — it needs a society watching",
    summary:
      "Behind every long-running prosecution is a boring combination of paperwork and pressure. Our crime reporter on why justice is an attendance problem.",
    body: `GQEBERHA – Television justice is sudden: the warrant, the arrest, the verdict in a single arc. Real justice has the pacing of groundwater. Cases move when someone attends to them repeatedly, and most of the people in that room are not judges.

Years of covering courts taught me that the difference between a docket that dies and one that ends in a conviction is rarely forensic luck. It is a detective who completes the chain of evidence, a prosecutor who insists on the witness, a family advocate who keeps the complainant from giving up, and a community that remembers the case when the cameras leave.

This is the uncomfortable truth about crime coverage: attention itself is part of the process. High-profile cases attract investigative capacity because every step is observed; the vast bulk of ordinary cases — the GBV matter, the repeat burglary, the small business extortion — depends on systems with no audience at all.

It does not follow that publicity alone wins justice; irresponsible naming and speculation can destroy trials. What follows is that attention must be intelligently sustained. We try, on this desk, to return to cases at the remand, the bail application, the verdict, the sentencing. A story is not over when the press conference ends.

Communities can help without endangering cases: keep written records, join properly constituted patrol structures, honour subpoenas, and resist the mob shortcut which collapses more cases than it solves.

The state alone cannot provide the persistence justice requires; that is not an excuse for the state, but a description of reality. The dockets that close are the ones someone refuses to forget. We intend to be among the someones.`,
    category: "national",
    province: "eastern-cape",
    region: "Nelson Mandela Bay (Gqeberha)",
    author: "Sipho Nkosi",
    tags: ["column", "justice", "courts", "crime"],
    imageUrl: IMG.courts,
  },
  {
    kind: "column",
    title: "Van Wyk: The Springbok bench is now the story, not the benchwarmer",
    summary:
      "Springbok rugby was for decades about the XV. The modern game rewards a 23-man performance — and the franchise numbers say the rebuild is deeper than it looks.",
    body: `CAPE TOWN – In rugby memory, the Springboks were fifteen names chanted from Loftus to Newlands. The team that defends world titles is twenty-three, and increasingly thirty-five. That shift is the untold story of the rebuild.

Track the closing quarters of the tightest recent Tests and a pattern repeats: the Boks win the last twenty minutes because the players arriving from the bench are now internationals rather than apologies. Match fitness data shows the tempo differential narrowing in precisely the window where replacements settle matches, which is not an accident of selection luck.

This was deliberate. National staff, quietly, changed how franchises rotate forwards in URC fixtures, aligned conditioning windows, and exposed depth players in hostile northern hemisphere tours before asking them to close knockout Tests. The scoreboard rewards the boring planning.

Backline depth remains the honest anxiety. South African rugby can manufacture a set-piece enforcer inside a conveyor-belt system; a world-class playmaker arrives unprogrammably, once a generation, and the current stock must develop in actual pressure rather than simulated drills.

The succession conversation around senior icons also deserves maturity. Dynasties do not announce their ending; they rotate workloads until the rotation becomes the team. What looks like loyalty from outside is often carefully staged transitions on the inside, with younger players inheriting standards in training long before they inherit jerseys.

For supporters, the practical takeaway is to watch the 48th minute as closely as the first. That is where the rebuilding is audited weekly. The bench stopped being a consolation prize a while ago; it is now the argument for the next trophy.`,
    category: "sport",
    province: "western-cape",
    region: "City of Cape Town",
    author: "Juanre van Wyk",
    tags: ["column", "Springboks", "rugby", "analysis"],
    imageUrl: IMG.rugby,
  },
  {
    kind: "column",
    title: "Malema: The taxi rank is the city hall nobody formally elected",
    summary:
      "More decisions about commuters' days are made around a taxi-rank office block than in council — transport correspondent Tshepo Malema on power in the informal city.",
    body: `BLOEMFONTEIN – If you want to understand how a South African city really runs, spend a morning not in the council chamber but at the taxi rank. Before the first municipal official has opened a laptop, the rank has set prices, routes, peace deals and the practical rules that govern millions of working days.

The minibus taxi industry carries the majority of commuters yet operates partly outside the formal governance most textbooks describe. Its associations set schedules, resolve conflicts, control access to lucrative routes, and negotiate — sometimes forcefully — with every tier of government. It is the city hall for the informal economy, but without the minutes.

This is why technical solutions imposed from above keep failing. A Bus Rapid Transit line, a digital permit system, or a safety campaign succeeds only when rank leadership adopts it, because rank leadership governs what actually happens at the platform. Governments that treated associations as contractors discovered they were negotiating with governments.

The past year's agreements over subsidies, scholar transport and dedicated lanes show a maturing model: formal recognition, enforceable safety commitments, joint operations centres, and payment for compliance rather than confrontation. Progress is slow and fragile because the underlying economics are brutal — low margins, financing costs, and constant pressure on fares that commuters can barely afford.

The prize of getting it right is enormous. A commuter railway and a formalised taxi network feeding each other could cut the transport burden — South Africa's single biggest household cost for the poor — faster than any grand project.

Rank governance is not quaint local colour. It is infrastructure without concrete, and the sooner all three spheres of government take it seriously as a seat of power, the safer and cheaper the commute becomes.`,
    category: "national",
    province: "free-state",
    region: "Mangaung (Bloemfontein)",
    author: "Tshepo Malema",
    tags: ["column", "taxis", "transport", "cities"],
    imageUrl: IMG.taxi,
  },
  {
    kind: "column",
    title: "Felix: The class learning statistics on borrowed phones",
    summary:
      "Behind every official education-tech announcement is a reality of shared devices, shared data and teachers inventing workarounds. What the digital divide looks like period by period.",
    body: `CAPE TOWN – The presentation says every learner in the pilot school has digital access. The classroom tells a subtler truth: one smartphone circulates between three siblings, a grandmother's funeral depletes the data bundle, and a teacher photographs the worksheet on the board so it can arrive on WhatsApp groups.

As someone who covers both education and technology, I am suspicious of announcements measured in devices delivered rather than lessons completed. A tablet in a box is not a connected learner; a connected learner needs reliable electricity, bandwidth that survives month-end, a caregiver who can protect study time, and a teacher trained beyond a two-day workshop.

What has genuinely surprised me is the improvisational genius of educators. Teachers run asynchronous classes through voice notes for learners without big screens; they compress videos to fit cheap bundles; they download materials at school Wi-Fi hotspots for distribution on memory cards. None of this is in any procurement specification, and it is carrying the digital pivot.

The risk is that improvisation becomes policy by default — praised in speeches but unfunded in budgets. Connectivity is a public good like water: the private market will serve dense, affluent nodes and leave rural and poor schools to patchwork solutions. A sectoral spectrum and data arrangement for education is not glamour policy; it is the difference between a class watching the lesson and a class hearing about it.

I keep meeting pupils who do the work anyway, at 9pm on a cracked screen after chores. They are not waiting for a perfect rollout. They deserve a state that catches up with their determination rather than celebrating its own devices.

Borrowed phones can carry a learner surprisingly far. They should not have to.`,
    category: "technology",
    province: "western-cape",
    region: "City of Cape Town",
    author: "Chantel Felix",
    tags: ["column", "education", "digital divide", "data"],
    imageUrl: IMG.school,
  },
  {
    kind: "column",
    title: "Van der Merwe: The drought maps are fading on municipal walls — the risk hasn't",
    summary:
      "When the rains return, water plans quietly disappear. Our environment correspondent argues that memory is the cheapest infrastructure water-scarce towns keep forgetting to fund.",
    body: `KIMBERLEY – Walk into a municipal office two years after a drought breaks and you can measure the forgetting on the walls. The laminated water-level charts curl at the edges; the emergency action files migrate to bottom drawers; the leak-repair numbers quietly slip again.

South Africa is a water-scarce country with a rain-dependent national memory. Crisis produces extraordinary behavioural change — 50-litre discipline, borehole registries, leak hotlines that actually answer — and the moment the dams fill, the coalition for maintenance dissolves. Demand rebounds; the pipes that were never fixed resume leaking; the next drought opens with a smaller margin.

This cycle is visible in the data. The same towns appear repeatedly in water-pressure announcements because their vulnerability is structural: non-revenue water above national norms, treatment capacity at the edge, and aquifer monitoring that stops when attention does.

Water infrastructure is unusual because the smartest investments pay off invisibly. Nobody holds a press conference for a replaced valve that prevents a shutdown, so preventative work loses to visible tanker trucks in budget politics. Yet a rand spent on leakage reduction returns multiples in delayed new-supply costs.

There is a policy fix borrowed from insurance: drought preparedness should be a permanent condition of water licences and grants, not an emergency mode. Towns that maintain pressure management, metering and public dashboards in wet years should be first in line for infrastructure funding in dry ones.

Climate projections make the forgetting reckless; rainfall patterns are more volatile, not merely scarcer, which punishes systems that only plan at the point of crisis.

The rain will return eventually, as it did before. The question is whether the laminated maps stay on the wall this time, with budgets attached. Memory is the cheapest water infrastructure we have, and the one we keep uninstalling.`,
    category: "national",
    province: "northern-cape",
    region: "Sol Plaatje (Kimberley)",
    author: "Pieter van der Merwe",
    tags: ["column", "water", "climate", "drought"],
    imageUrl: IMG.env,
  },
  {
    kind: "column",
    title: "Abrahams: We love lucky numbers — but the stars never promised a jackpot",
    summary:
      "As the lotto jackpots rise alongside the horoscopes, our columnist on superstition, probability and what to actually do with a R40 ticket.",
    body: `CAPE TOWN – Every week readers compare their Daily Lotto numbers with the lucky numbers I publish, and some write to me with great seriousness when three align. Three is not four; the stars and I must both accept this with grace.

Astrology is a language of reflection, not a roulette system. I write the horoscopes because a well-made forecast invites you to notice your week — the conversation you have postponed, the budget you have avoided, the friend you should call. If the planets nudge you toward a calmer Tuesday, the column has done its work. What they cannot do is defeat combinatorics, which is merciless and, unlike Mercury, never in retrograde.

The probability maths of a lottery jackpot is humbling; buying a second ticket barely moves the odds while buying one every week moves the monthly budget decisively. That is not a moral objection — a flutter can be entertainment — but it is a financial-class distinction worth naming. For a household with an emergency fund, R40 on a draw is leisure. For a household without one, it often masquerades as a plan.

If you genuinely want a better financial week, the stars will say the same boring thing in every sign: pay the small debt first, automate even a tiny saving, keep the lottery inside entertainment money, and buy before the queue when hope won't help.

And if you do play? Play socially, cap it, and never chase a rollover with the grocery budget. A jackpot story makes the news because it is rare; that is the whole mathematical point of the word "jackpot".

Read the stars for perspective, check the lotto for fun, and build the life where a jackpot would be delightful rather than necessary. That is the only lucky system the planets will co-sign.`,
    category: "lifestyle",
    province: "western-cape",
    region: "Cape Winelands",
    author: "Celeste Abrahams",
    tags: ["column", "lotto", "horoscopes", "personal finance"],
    imageUrl: IMG.lucky,
  },
];
