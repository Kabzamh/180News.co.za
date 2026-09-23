import type { PremiumStory } from "./types";

const IMG = {
  power:
    "https://images.pexels.com/photos/5235481/pexels-photo-5235481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  rate:
    "https://images.pexels.com/photos/6310123/pexels-photo-6310123.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  nhi:
    "https://images.pexels.com/photos/39442464/pexels-photo-39442464.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  coal:
    "https://images.pexels.com/photos/33074372/pexels-photo-33074372.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  rand:
    "https://images.pexels.com/photos/36737519/pexels-photo-36737519.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  matric:
    "https://images.pexels.com/photos/25457343/pexels-photo-25457343.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
};

export const PREMIUM_EXPLAINERS: PremiumStory[] = [
  {
    kind: "explainer",
    title:
      "Explainer: Load curtailment vs loadshedding — what the new Eskom language means for your house",
    summary:
      "Stages are being joined by 'cur tailment', 'demand markets' and wheeling tariffs. We translate the grid vocabulary into what changes on your meter and your backup budget.",
    body: `JOHANNESBURG – Eskom and municipal communications now use a cluster of terms — curtailment, rotational load reduction, demand response, wheeling — that describe meaningfully different events. Conflating them leads households and businesses to buy the wrong backup solution.

Loadshedding (rotational load reduction) is a shortage of generation: there is not enough electricity in total, so utilities disconnect distribution areas on published schedules. The remedy is supply addition and demand reduction at scale.

Load curtailment is different. It is a contractual, targeted reduction imposed on large users — industrial sites, shopping centres, some municipal blocks — when the system approaches instability. Rather than black out a suburb for two hours, the utility asks (or requires) a handful of megawatt-scale customers to cut demand immediately. Households rarely see curtailment directly, but they feel it when mines and factories shift work patterns or when shopping-centre tenants are told to switch off.

Demand response is the price-friendly cousin: large and increasingly aggregated smaller users are paid to reduce consumption at peak. Battery owners can in future bid their stored energy into these markets, which is why residential storage suddenly matters beyond mere blackout insurance.

Wheeling allows a generator — a solar farm, say — to deliver power to a specific corporate customer across the grid using someone else's wires. It is the mechanism behind the explosion of private power purchase agreements. For households it matters indirectly: the more large users wheel their own supply, the less they compete with you on municipal allocation.

Practical implications? Do not size a battery for Stage 6 curtailment that never reaches your plug; size for the rotational schedules that do. Check whether your municipality's tariffs now reward feeding back at peak — that determines whether solar-plus-storage ever pays back. And distinguish a generation crisis (fixable by adding supply) from a network crisis (a transformer or cable problem), which no rooftop panel can solve.

The vocabulary is deliberately technical because the grid is becoming a multi-seller market rather than a single tap. Understanding the words is the first step to protecting your wallet in it.`,
    category: "national",
    province: "gauteng",
    author: "Ahmed Patel",
    tags: ["explainer", "energy", "Eskom", "load curtailment"],
    imageUrl: IMG.power,
  },
  {
    kind: "explainer",
    title:
      "Explainer: How one repo-rate move actually reaches your bond, car and groceries",
    summary:
      "The Reserve Bank changes a number most people never see, yet it changes your instalment weeks later. The full transmission chain — and where it breaks.",
    body: `JOHANNESBURG – When the Monetary Policy Committee moves the repo rate by 25 basis points — a quarter of one per cent — it is adjusting the rate at which commercial banks borrow from the Reserve Bank. From that tiny technical lever, a chain of consequences reaches your household.

First, banks' prime lending rate moves, typically one-for-one. Most South African home loans are priced as prime plus or minus a margin, so your bond instalment follows at the next adjustment date. On R750,000 over twenty years, a quarter-point move changes the monthly instalment by roughly R125 either way; a full percentage point is closer to R500.

Vehicle finance behaves similarly, but with more fixed-rate options. If you financed at a linked rate, the change arrives at month end; fixed-rate borrowers are insulated until refinancing. Credit cards and personal loans, which already charge high base rates, also adjust, compounding the effect on the most expensive debt first — which is why rate pain concentrates in lower-income, heavily indebted households.

The chain then works through behaviour. Higher rates cool demand for durable goods, weaken property price growth, reduce appetite for new borrowing, and strengthen the incentive to save. Over roughly 12–18 months that dampened demand eases pressure on prices — the intended medicine for inflation.

It also reaches the rand. Higher local yields attract portfolio capital, supporting the currency and therefore import prices, including oil. Conversely, when the Reserve Bank cuts, the rand becomes a bit less attractive and the import benefit narrows.

Where the chain breaks is instructive. Administered prices — electricity, water, property rates — respond to rates weakly and slowly, if at all, because they reflect political and infrastructure costs rather than consumer appetite. Food prices move on weather, logistics and the global grain market as much as local demand. Rate policy therefore fights the flexible half of inflation while the administered half resists.

Understanding the chain helps you act before the statement: budget on the forward-rate curve, not the wish curve, fix debt selectively, and remember that the committee's tool is a blunt instrument by design.`,
    category: "business",
    province: "gauteng",
    author: "Ahmed Patel",
    tags: ["explainer", "repo rate", "bonds", "monetary policy"],
    imageUrl: IMG.rate,
  },
  {
    kind: "explainer",
    title:
      "Explainer: The NHI, section by section — what it does, what it doesn't, and what costs money",
    summary:
      "The National Health Insurance Bill is law in principle but a question mark in execution. A calm structural read of what actually changes for patients, medical aids and provinces.",
    body: `DURBAN – The National Health Insurance legislation is one of the most consequential and most frequently misrepresented pieces of policy in democratic South Africa. Separating enacted principles from implementation reality is essential for anyone planning health cover.

The founding principle is universal access: a single, mandatory national health financing system intended eventually to pool risk across the whole population, replacing the current split between public provision and private medical schemes.

The envisaged architecture creates a National Health Insurance Fund that purchases services on behalf of users from accredited providers, whether public facilities or contracted private ones. Accreditation is the hinge: institutions and practitioners must meet standards to be paid by the Fund.

What it is not, yet, is operational at scale. Large portions require regulations, funding frameworks and institutional capacity that do not currently exist. Treasury's funding position, tax capacity, and the state of public facilities — audited extensively in our clinic series — determine timelines far more decisively than the legislative signing.

Medical aids do not disappear overnight. Early phases leave private cover largely intact for members, but the long-term design envisages the Fund covering a defined package of care, with schemes confined to complementary or top-up services. The shift, if fully implemented, would be phased over many years and challenged legally and commercially.

The honest questions are threefold. First, which services enter the benefits package first — the answer decides what remains privately paid. Second, how providers are reimbursed, which determines whether skilled practitioners stay in the country. Third, where the money comes from: general tax, a dedicated surcharge, or a payroll contribution, each with different distributional consequences.

For patients and families, the practical stance is unchanged for now: keep private cover if you can, monitor accreditation pilots in your province, and judge progress not by launches but by whether accredited facilities actually shorten queues and improve clinical outcomes. Policy promises are not yet health services.`,
    category: "national",
    province: "kwazulu-natal",
    region: "eThekwini (Durban)",
    author: "Naledi Dlamini",
    tags: ["explainer", "NHI", "healthcare", "policy"],
    imageUrl: IMG.nhi,
  },
  {
    kind: "explainer",
    title:
      "Explainer: A coal job versus a solar job — what the just-transition numbers actually say",
    summary:
      "'Green jobs will replace coal jobs' is the slogan; the employment data is more complicated, more local and more honest. We compare the two labour markets directly.",
    body: `KIMBERLEY – The just transition is often debated as if jobs were interchangeable tokens: retire one coal job, mint one solar job, balance the ledger. Employment data from Mpumalanga and the renewable corridors shows a more complicated picture, and the details determine whether communities prosper or hollow out.

Coal-sector employment is dense, indirect and regional. Each direct mining or power-station position supports contractors, logistics, local services and municipal revenue, with effects extending through suppliers far beyond the gate. These are often unionised, relatively well-paid positions with pension benefits — characteristics that matter economically to entire towns.

Utility-scale solar employment follows a radically different curve. Construction is labour-heavy for 12–18 months — civil works, mounting, cabling, panel installation — then collapses to a small operations and maintenance workforce. A project may create hundreds of jobs briefly and retain a few dozen.

The skill profiles also diverge. Artisans with electrical and welding qualifications can retrain credibly into solar O&M, but many underground mining skills do not transfer directly, and solar component manufacturing — where stable, dense employment lives — has historically been imported rather than localised.

Location is the cruellest variable. Coal jobs cluster in Mpumalanga; the best solar resource and much of the build-out is in the Northern Cape. Without deliberate placement of manufacturing, data centres and green hydrogen infrastructure in coal regions, the transition relocates opportunity instead of replacing it.

What the honest numbers support is a strategy built on three commitments: local-content mandates that anchor manufacturing jobs, credible retraining linked to actual vacancies rather than certificates, and municipal reinvestment so that towns do not die between construction booms.

Green energy will create work; the global build-out is enormous. It does not automatically create the same jobs in the same towns for the same people. Pretending otherwise is not optimism; it is how a just transition becomes an unjust one.`,
    category: "business",
    province: "northern-cape",
    region: "ZF Mgcawu (Upington)",
    author: "Pieter van der Merwe",
    tags: ["explainer", "just transition", "jobs", "energy"],
    imageUrl: IMG.coal,
  },
  {
    kind: "explainer",
    title:
      "Explainer: Why a US inflation number moves your petrol price overnight",
    summary:
      "Capex, oil, the dollar and the rand — the global transmission chain that turns an American statistics release into a South African till-slip change by Wednesday.",
    body: `JOHANNESBURG – It looks absurd on the surface: Washington publishes a single inflation figure, and within hours the rand, the JSE, and the implied petrol price for next month have all moved. The chain is actually straightforward, if long.

Step one is US interest-rate expectations. American inflation above expectations suggests the Federal Reserve will keep rates higher for longer, which lifts the yield on dollar assets. Global capital, always comparing returns, shifts toward dollars.

Step two is the exchange rate. Higher US yields attract money out of emerging-market currencies, including the rand, because holding rands offers less relative reward. The rand weakens as sellers emerge — often within minutes in the currency market.

Step three is oil. Brent crude is globally priced in dollars per barrel. A weaker rand means every dollar of oil costs more rands even before any change in the underlying oil price, which is the dominant local driver for 95-octane and diesel.

Step four is the regulatory adjustment. South Africa's fuel price is set through a published basic fuel price mechanism that combines the dollar oil price, exchange rates, freight, taxes and margins, with adjustments each month. Exchange-rate moves therefore translate, with a lag and partial smoothing, into the number displayed at the forecourt.

From there the chain propagates. Diesel moves the cost of logistics; higher logistics costs re-price food and retail goods; transport associations renegotiate fares; and the Reserve Bank watches the second-round effects. One American data release eventually nudges township transport fares.

The chain runs in reverse on good news: softer US inflation, lower expected dollar rates, rand strength, and a petrol price cut. This is why South African markets react so sharply to foreign data — the country imports monetary conditions it cannot control.

The practical lesson for households and businesses is to watch the rand–oil product rather than either input alone: it predicts the fuel-price change more accurately than political statements, and it tells you when to fill up, hedge stock, or budget the delivery van.`,
    category: "business",
    province: "gauteng",
    author: "Ahmed Patel",
    tags: ["explainer", "rand", "fuel price", "global markets"],
    imageUrl: IMG.rand,
  },
  {
    kind: "explainer",
    title:
      "Explainer: What the matric pass rate counts — and the three numbers it hides",
    summary:
      "The annual pass-rate headline rises and falls by a few points. Behind it are bachelor passes, mathematics retention and the dropout filter. An education-data primer for results season.",
    body: `CAPE TOWN – Every results season produces one dominant number: the national matric pass rate. It is useful, misleading and, in one important sense, measuring the wrong population. Here is how to read the release properly.

First, what the pass rate actually divides. It is the share of candidates who wrote the final National Senior Certificate examinations and passed, not the share of an age cohort who completed school. Learners who dropped out, were retained, or never reached Grade 12 are not in the denominator — meaning a high pass rate can coexist with a low cohort completion rate.

The number worth equal attention is the bachelor pass: the share of candidates qualifying for degree study at a university. That figure — substantially lower than the overall pass — is a far better proxy for academic readiness and for future professional pipelines.

Second, mathematics. The split between pure mathematics and mathematical literacy is one of the most consequential choices in the system, and aggregate pass rates cannot see it. Access to engineering, health sciences, commerce and most technical degrees requires pure mathematics, and the numbers taking and passing it at a useful level remain stubbornly low and uneven across quintiles.

Third, throughput timing. The pass rate among those who eventually write is one thing; how many years of repetition, dropout and delayed entry produced that cohort is another. A cohort can record a respectable pass rate while absorbing enormous human cost on the way to the exam hall.

None of this is to dismiss improvements in weak-district performance, which are genuine and hard-won by teachers. It is to say that results coverage should carry at least four lines: overall pass, bachelor pass, mathematics performance, and a cohort-based completion estimate.

For parents and pupils, the practical message is to manage subjects backwards from ambitions: the degree you want sets the Grade 10 subject set, not the other way around. For the country, the real examination happens long before November — it happens in Grade 1, Grade 9 and every dropout point in between.`,
    category: "national",
    province: "western-cape",
    region: "City of Cape Town",
    author: "Chantel Felix",
    tags: ["explainer", "education", "matric", "data"],
    imageUrl: IMG.matric,
  },
];
