import type { PremiumStory } from "./types";

/**
 * Member Daily Premium Briefings. Content is rotated by weekday so a fresh,
 * distinct edition is dated to each day of the current week at seed time.
 */

type BriefingContent = {
  title: string;
  summary: string;
  body: string;
};

const WEEKDAY: Record<number, BriefingContent> = {
  1: {
    title: "The Monday briefing: the week ahead, before it arrives",
    summary:
      "Coalition committee deadlines, a busy data calendar, the JSE's new week and what the metros are deciding while you were off.",
    body: `Good morning. This is your member-only start to the week — the decisions, data and deadlines that will shape the news by Friday, before the noise starts.

THE LEAD. Parliamentary committees reconvene with two pieces of unresolved business carried over: the finer wording of the energy governance arrangements and a municipal finance amendment that several smaller parties have publicly flagged. Neither will be decided on a placard; watch the clause-by-clause markup, where the actual votes are lost and won.

THE DATA CALENDAR. A midweek inflation print sits ahead of the next monetary policy decision, and markets will treat it as the last domestic input of consequence for rate expectations. The rand remains sensitive to foreign portfolio flows; a softer US reading would do more for local bonds than any local statement this week.

PROVINCIAL DIARY. Gauteng metros table service-delivery adjustments tied to winter demand; two KwaZulu-Natal districts continue storm-damage assessments; and the Western Cape's transport expansions face a council vote that the opposition intends to amend.

MONEY. If you are paid monthly, Monday is the day the budget survives or dies: fund the essentials and the automated savings debit before the week's invitations arrive. Our guide to the rate transmission chain, published separately, explains why one foreign data release can move your fuel budget.

SPORT & CULTURE. Domestic rugby enters a club-and-franchise week; the Springbok selection conversation continues on training form rather than reputation. On screens, local festival line-ups are being confirmed for the long season ahead.

QUOTE OF THE MORNING. "A week planned before Monday is a week you can defend by Friday." Make the list before the inbox does.`,
  },
  2: {
    title: "The Tuesday briefing: budgets, benches and the bill before council",
    summary:
      "Municipal adjustment budgets land, the courts hear two matters with national consequences, and the rand trades on yesterday's foreign data.",
    body: `Good morning. Tuesday tends to be the busiest administrative day in South African public life — council sittings, court rolls and corporate updates all cluster midweek. Here is what matters.

THE LEAD. Adjustments presented by two major metros confirm the pattern our reporters have tracked all year: tariff increases outpacing inflation on distribution services even as the Eskom price path flattens. The cost is moving from the national utility to municipal reticulation, and household bills show it.

THE COURTS. A labour matter with implications for public-sector wage agreements is set down, alongside a long-running procurement review. The procurement judgment matters beyond its parties — clarity on what makes a municipal process reviewable changes every contract that follows.

MARKETS. Tuesday trade typically responds to Monday's global positioning rather than new local news. Watch the local currency against the dollar at the open; a weaker start often stabilises once bond inflows are counted by mid-morning.

PROVINCES. Eastern Cape water maintenance enters a scheduled window; Northern Cape solar corridor developers report construction milestone meetings; and Limpopo clinics receive a scheduled medicines delivery audited by community monitors.

MONEY. Tariff season is budgeting season. Pull your municipal statement and split electricity, water, refuse and rates — the line-item view reveals where the household inflation actually lives.

SPORT. Midweek cup fixtures test squad depth; the teams that rotate well in these games tend to be the ones still standing in the latter rounds.

QUOTE OF THE MORNING. "The budget is the policy, the speech is the wrapping."`,
  },
  3: {
    title: "The Wednesday briefing: the midweek data that decides the month",
    summary:
      "Inflation and markets take centre stage, a health committee hears delivery evidence, and the ports post fresh weekly performance numbers.",
    body: `Good morning. Wednesdays are when the week's economic argument is usually settled. Read this before the lunchtime data drop.

THE LEAD. The consumer inflation print lands within the window the Reserve Bank watches most closely. The key for households is not the headline number alone but services inflation and administered prices — the sticky components that decide whether rate cuts are plausible. We will publish the numbers and what they mean for bonds, cars and groceries as they land for members.

MARKETS. The JSE tends to move on global risk appetite more than domestic prints, but local banks and retailers reprice on the inflation surprise. A cooler print steepens the rate-cut conversation; a hotter one punishes the retailers hardest.

HEALTH. A parliamentary committee hears evidence on medicine availability and the chronic-patient queue, following reporting from our nine-province facility audit. The question to watch is whether supply failures are budgetary, logistical or administrative — they require different fixes.

LOGISTICS. Fresh port performance numbers arrive midweek. Vessel waiting times and container dwell are the honest scorecard for the freight reform programme; exporters price these days of delay into every contract they lose or win.

MONEY. Rate-sensitive debt first: any credit card or personal loan balance is where an easing cycle saves you the most. Member tip — do not close the freed cash flow when instalments drop; redirect it.

CULTURE. Midweek is the cheapest night for cinema, museum week programmes and independent gigs; leisure does not have to be a weekend expense.

QUOTE OF THE MORNING. "The number the market remembers is not always the number that changes your life — but administered prices quietly do."`,
  },
  4: {
    title: "The Thursday briefing: tenders, transitions and the transport file",
    summary:
      "Procurement decisions move, the energy-transition employment debate intensifies, and commuter rail publishes another punctuality snapshot.",
    body: `Good morning. Thursday is file day — the day technical decisions with long consequences slip past less attention than they deserve.

THE LEAD. A cluster of public-sector tenders closes this week, including energy and municipal maintenance work where bid-quality disputes have previously triggered legal challenges. Our procurement rule of thumb for readers following these awards: look at the evaluation criteria, not the headline value; the criteria decide who was ever allowed to win.

THE TRANSITION. The just-employment debate continues after fresh analysis contrasting construction peaks with permanent operations jobs in the solar corridors. The honest policy conclusion, covered in our member explainer, is that manufacturing and maintenance localisation — not panel installations — carry the long-term employment promise.

TRANSPORT. The latest commuter rail punctuality snapshot is due. What to look for: whether cancellations remain concentrated on Mondays and Fridays, the pattern our platform-level reporting identified. Consistency, not reopening ceremonies, rebuilds the trust that brings commuters back.

MARKETS. Thursdays often bring portfolio rebalancing flows into month-end windows; expect the rand and local bonds to show slightly larger intraday ranges.

PROVINCES. Free State and North West municipalities face water-response reporting deadlines; Free State grain farmers watch a critical rainfall window for the season's confidence.

MONEY. If you run a small business, Thursday is the day to reconcile tenders, invoices and delivery notes — clean documentation is what separates a fundable business from a busy one.

SPORT. European fixtures mean early mornings for South African fans; local stars' minutes tonight are quietly selection evidence for the next international windows.

QUOTE OF THE MORNING. "In government, the boring decision is usually the one that spends your money."`,
  },
  5: {
    title: "The Friday briefing: what the week actually changed",
    summary:
      "The week's scorecard: what passed, what stalled, what the markets did with it, and the two stories set to dominate your weekend reading.",
    body: `Good morning. Here is the Friday scorecard — the week stripped of its press conferences.

THE LEAD. The energy governance wording remains the cleanest indicator of the governing coalition's temperature. Where clauses were softened, expect an implementation gap; where numbers were committed, expect them to be quoted back at the next budget. We keep a clause tracker for members precisely because paragraphs outlast politicians.

SCORECARD. On data, this week's inflation reading shifted rate expectations at the margin; the rand's move was driven more by foreign flows than domestic news; and the JSE's best sectors were those that benefit most from easier global rates, confirming South African markets remain highly open to the world.

METROS. The municipal adjustments now on record lock in next quarter's household cost picture. Members receive our tariff-by-tariff analysis in the money section: distribution services, again, are where the pressure concentrates.

PORTS. This week's freight numbers are best read as a trend, not a print. One good week of vessel waiting times proves nothing; the four-week average is the real reform scorecard, and it remains the difference between winning and losing perishable export contracts.

THE WEEKEND FILE. Two stories deserve longer reading chairs: the transport recovery at platform level, where trust is rebuilt in punctuality rather than announcements, and the funeral-cover economy, which quietly absorbs more household money than most families realise.

MONEY. Do a fifteen-minute week review: one expense to question, one saving to automate, one debt to attack. That Friday habit beats any January budget.

QUOTE OF THE MORNING. "News tells you what happened today; a scorecard tells you what moved. Keep the second one."

Have a restorative weekend. The Monday edition will be ready before the week is.`,
  },
  6: {
    title: "The Saturday edition: slow news for the weekend",
    summary:
      "A longer read, a slower argument, and the people and places behind the week's headlines — including one trip worth taking and one table worth booking.",
    body: `Good weekend morning. Saturday's edition is slower by design: fewer notifications, more context.

THE LONG READ. The story that will repay a quiet hour is our reporting on how coalitions actually function — the Sunday-night scoreboards, the whip clusters, and the sentence-level trading that keeps municipalities functioning. It is not the dramatic politics of television, but it is where your service delivery is really decided.

THE PLACES. If the week's transport reporting moved you, take one bus or train journey you would normally drive this weekend, notebook optional. Observing the network as a passenger rather than a commuter changes how you read every policy announcement that follows.

MARKETS WEEK IN REVIEW. Local equity indices followed global risk sentiment; the rand ended the week largely a passenger to international flows. Weekend reading for investors should focus on allocation, not prediction: the proportion of your savings offshore is a more important decision than next week's currency level.

THE PROVINCES, OFF DUTY. Western Cape wine routes and Garden Route towns enter their generous months; KwaZulu-Natal coast weather decides next week's tourism bookings; Gauteng's markets remain the country's best free entertainment; and the Karoo and Northern Cape skies this time of year are worth the drive.

FOOD & HOME. Weekend cooking is where food inflation is easiest to beat: seasonal produce, batch-cooked proteins and a Monday lunch planned in advance quietly recover the grocery budget that convenience erodes.

SPORT. There is domestic rugby and football to settle into, with the deeper pleasure of watching bench rotations — the modern game, as our columnist argues, is won there.

QUOTE OF THE MORNING. "The news is daily; understanding is weekly." Read slowly today.`,
  },
  0: {
    title: "The Sunday edition: tomorrow's week, tonight",
    summary:
      "The decisions and data points coming this week, what to read while you still have quiet, and the one financial task that takes twenty minutes and saves Monday.",
    body: `Good Sunday evening. Tomorrow's week before it arrives.

THE WEEK AHEAD. Watch three files. First, committee wording on energy and municipal finance — track the clauses, not the clashes. Second, the run of transport and port performance data that exporters and commuters both depend on. Third, service-delivery reporting from two provinces recovering from weather damage, where recovery speed is itself governance.

WHAT TO READ TONIGHT. If you only open one member piece, choose the household-budget outlook for the year ahead: it separates the price shocks already locked into municipal schedules from the prices the Reserve Bank can still influence. Knowing which costs are fixed and which are flexible is the difference between a useful budget and a hopeful one.

TOMORROW'S MONEY. Twenty minutes tonight: confirm the automated savings debit lands after salary; schedule the essential payments; list the one discretionary purchase you will be asked for this week and pre-decide it. Decisions made on Monday morning under inbox pressure are rarely the good ones.

COMMUNITIES. The week ahead will bring another round of community meetings on safety, water and transport in metros across the country. These meetings are more consequential than they look — the budgets that follow usually reflect the rooms that were actually full.

MARKETS PREP. Global investors reopen with the same South African story: open, liquid, and sensitive to international rates. Domestic headlines matter at the margin; the dollar, oil and risk appetite set the dial. Position defensively, don't predict dramatically.

CALM. Set out the work clothes, pack the bag, decide the breakfast. The small logistics protect the larger patience.

QUOTE OF THE MORNING. "Sunday's job is not to worry about Monday; it is to remove Monday's excuses." Sleep well — the briefing will be here.`,
  },
};

export function buildBriefings(): PremiumStory[] {
  const now = new Date(Date.now() + 2 * 3_600_000); // SA-local anchor
  // Monday of the current ISO week.
  const dow = (now.getDay() + 6) % 7; // Mon=0
  const monday = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - dow, 4),
  );

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setUTCDate(monday.getUTCDate() + i);
    const content = WEEKDAY[date.getDay()];
    const longDate = date.toLocaleDateString("en-ZA", {
      weekday: "long",
      day: "numeric",
      month: "long",
      timeZone: "Africa/Johannesburg",
    });
    return {
      kind: "briefing" as const,
      title: `${content.title} — ${longDate}`,
      summary: content.summary,
      body: content.body,
      category: "national",
      author: "Daniel Naidoo",
      tags: ["daily briefing", "members", "analysis"],
      imageUrl:
        "https://images.pexels.com/photos/5235481/pexels-photo-5235481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      publishedAt: date,
    } satisfies PremiumStory;
  });
}
