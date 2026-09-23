import type { PremiumStory } from "./types";

const IMG = {
  tax:
    "https://images.pexels.com/photos/6310123/pexels-photo-6310123.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  home:
    "https://images.pexels.com/photos/33622143/pexels-photo-33622143.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  savings:
    "https://images.pexels.com/photos/32163264/pexels-photo-32163264.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  retrench:
    "https://images.pexels.com/photos/31131702/pexels-photo-31131702.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  hustle:
    "https://images.pexels.com/photos/34168940/pexels-photo-34168940.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  offshore:
    "https://images.pexels.com/photos/4864249/pexels-photo-4864249.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
};

export const PREMIUM_GUIDES: PremiumStory[] = [
  {
    kind: "guide",
    title:
      "The 2027 tax guide: twelve legal breaks South African filers miss every year",
    summary:
      "Medical tax credits, retirement deductions, home-office rules, travel logs and the exemptions remote workers forget. A practical checklist before filing season, with the numbers.",
    body: `JOHANNESBURG – Most South African taxpayers treat filing season as an exercise in copying a tax certificate into a form. That approach hands money to SARS by omission. Here are the legitimate breaks most frequently missed, with the thresholds and records that make them defensible.

1. The primary exclusion threshold. If your total income falls below the year's tax threshold, you may owe nothing, but you should still file where tax was deducted — refunds are common for part-year workers.

2. Medical scheme fees tax credit. This is a fixed monthly credit per the main member and dependants, deducted from tax payable, not merely from taxable income. Verify that your employer used the correct dependant count for all twelve months.

3. Additional medical expenses. Qualifying out-of-pocket costs above a formula threshold can generate an additional medical expenses tax credit. Keep the dispensing statements, not just the till slips.

4. Retirement contributions. Pension, provident and RAF contributions are deductible up to 27.5 percent of the higher of remuneration or taxable income, capped at R350,000 annually. Excess contributions carry forward — do not waste the schedule.

5. Home office deductions. The rules tightened but remain available where a dedicated, regularly used workspace exists and more than half of working hours occur there; apportion rent or interest, utilities, cleaning and depreciation carefully.

6. Travel allowance. Without a logbook, the claim fails. Record opening and closing kilometres, business kilometres and the reason for each trip; the prescribed tables do the rest.

7. Donations to registered public benefit organisations are deductible up to 10 percent of taxable income and require the section 18A certificate.

8. Capital gains annual exclusion applies per person per year; using both spouses' exclusions on a jointly held asset is legitimate planning.

9. The R2 million primary-residence CGT exclusion protects most family homes, but record the base cost — improvements, not repairs, count.

10. Interest exemptions (age-based) and the annual foreign-dividend and interest allowances change with tax tables; use the current year's figures, not memory.

11. Wear-and-tear for genuine work equipment bought for remote work, proportionate to business use.

12. Provisional taxpayers should submit both provisional returns to avoid understatement penalties, which are not tax; they are punishment for sloppy timing.

Keep records for at least five years. When in doubt, a registered tax practitioner's fee is itself often cheaper than one missed schedule.`,
    category: "business",
    province: "gauteng",
    author: "Ahmed Patel",
    tags: ["guide", "tax", "SARS", "money"],
    imageUrl: IMG.tax,
  },
  {
    kind: "guide",
    title:
      "The first-time home buyer playbook in a 9-percent interest world",
    summary:
      "Deposits, bond negotiation, transfer costs and the affordability buffers that matter most when rates bite. The step-by-step math before you sign an offer to purchase.",
    body: `JOHANNESBURG – House hunting begins on property apps; home affordability should begin on a spreadsheet. In a high-rate environment, the difference between an approved bond and a sustainable one can decide your next twenty years.

Step one is the honest repayment test. Banks qualify you generously because they assess the edge of their risk; you should assess the edge of your life. The repayment, rates and taxes, levy, insurance, maintenance (budget roughly one percent of value annually) and utilities together should stay under roughly a third of net income, with a stress buffer for a two-percentage-point rate rise.

Step two is the deposit. Every ten percent of equity changes both the offer-to-purchase position in a competitive market and the lender's pricing. A 100 percent bond may be available without being wise; a modest deposit can buy a meaningful rate concession.

Step three is transfer cost, which is separate from the deposit and not covered by the bond unless explicitly arranged. Budget transfer duty (zero at the lowest bands), conveyancing fees, bond registration fees and Deeds Office charges. New buyers dramatically underestimate this pile, which often exceeds immediate savings.

Step four is bond negotiation. Apply through more than one channel; the prime-minus-margin spread between lenders can save hundreds of thousands of rands over the bond's life. A bond originator does this at no direct cost, but you can negotiate yourself.

Step five is timing the rate cycle with humility. Even professionals cannot pick the bottom. A fixed rate gives certainty at a premium; a variable rate rewards easing but punishes surprises. Many buyers split the difference, fixing only part of the bond.

Step six is the offer-to-purchase itself. Suspensive conditions — bond approval, inspection, sale of existing home — exist to protect you; waive them only with full understanding. A professional inspection before final offer can save seven figures on hidden structural defects.

Finally, pre-approval is not a licence; it is an upper bound. The disciplined buyer targets the lower half of what the bank offered. In a 9-percent world, that margin is the difference between owning a house and being owned by it.`,
    category: "business",
    province: "western-cape",
    author: "Ahmed Patel",
    tags: ["guide", "property", "bonds", "money"],
    imageUrl: IMG.home,
  },
  {
    kind: "guide",
    title:
      "How to build an emergency fund on a township salary — the envelope system that works in a bank app",
    summary:
      "Three months of expenses feels impossible until it is broken down. A practical, low-income-friendly savings structure using stokvels, accounts and automated debits.",
    body: `KIMBERLEY – Personal finance advice is usually written by people who have never chosen between transport and a top-up at month-end. The emergency fund principle still holds; the method must change for households living close to the edge.

First, define the target accurately. Three months of expenses does not mean three months of income. List the non-negotiables — rent, transport to work, food, basic airtime/data, school needs, minimum debt payments — and ignore the rest of the lifestyle budget. The number is usually much lower than the salary and much more achievable.

Second, create friction with the money itself. A savings account attached to the same app as your spending account fails precisely because it is too easy to tap. Use a separate bank with a no-fee savings pocket, a 32-day notice account for the larger tranche, or a stokvel structure with defined rules and penalties for early withdrawal.

Third, automate the embarrassing minimum. Set a debit order for the day after salary — even R50 to begin — before the budget is mentally spent. The goal is protecting the habit while the amount grows; one year of R50 plus raises builds the muscle and the start of compound interest.

Fourth, ring-fence windfalls. Stokvel payouts, overtime, tax refunds and 13th-cheque-adjacent bonuses should follow a 50/50 rule: half to the buffer, half to living. Without a written rule, windfalls evaporate and so does the fastest route to three months of safety.

Fifth, separate emergency from aspiration. A funeral, a job loss or a transport collapse is an emergency; a December outfit is an event. Different pockets, different names, no negotiation.

Sixth, protect the fund with insurance basics. Cheaper medical cover, household and funeral cover can prevent a single event from wiping the buffer; insurance is just a collective emergency fund with a premium.

Finally, when you use the fund — and genuine use is what it is for — rebuild before spending again, even if slowly. The point of an emergency fund is not that it is never touched; it is that you never borrow at 24 percent to survive a month. Start this week with an amount that feels silly. Silly money becomes survival money faster than expected.`,
    category: "business",
    province: "northern-cape",
    author: "Celeste Abrahams",
    tags: ["guide", "savings", "emergency fund", "money"],
    imageUrl: IMG.savings,
  },
  {
    kind: "guide",
    title:
      "Retrenchment survival: the 30-day money checklist from your last payslip",
    summary:
      "UIF timelines, severance tax, medical continuity, debt conversations and the order in which to do them. What to do in week one when you receive the section 189 letter.",
    body: `JOHANNESBURG – A section 189 notice triggers two traumas simultaneously — emotional and administrative. The administrative half, handled in the right order, determines whether the next six months are a managed transition or a debt spiral. Print this.

Day 1–3: Request the written consultation documents, the proposed severance calculation, and the employer's UIF reference details. Severance pay of at least one week per completed year of service is the statutory norm where offered, but it is negotiable where the process is flawed.

Week 1, money: Build a bare-bones budget immediately, before retrenchment is final. Pause all discretionary debits you can legally pause and distinguish fixed obligations (rent, insurance) from lifestyle contracts (streaming, subscriptions).

UIF: Apply as early as the process allows. Benefits are calculated on a sliding scale of remuneration and paid for a capped number of months dependent on contribution history. Delays in lodging delay the first payment; the forms, ID, banking details, UI-19 and service letter are the standard kit.

Tax: Severance pay has its own tax treatment, often using the retirement lump-sum tables rather than normal income, but structure matters. Do not accept a payout packaged without knowing the tax result; employers can split payments across tax months legally in ways that materially help.

Medical aid: This is the coverage people drop first and regret most. Most schemes allow a continuation option; negotiate that the employer covers an extra month, or move to a hospital-plan-only product rather than losing cover entirely — gaps create waiting periods and exclusions.

Debt conversations happen early, not after default. Banks and insurers have formal payment-relief processes for retrenchment, but they reward proactive contact; a missed instalment changes your negotiation position overnight. Credit life insurance on loans may cover instalments during unemployment — most borrowers never check.

Pension/provident preservation: Resist cashing out the retirement fund to fund lifestyle; the tax and lost-compound costs are severe. Preservation funds exist for exactly this moment.

Job search: Treat it as a job from week one — daily applications, refreshed references, skills inventory and a professional network broadcast. The re-employment curve punishes delay.

Finally, take the emotional support; retrenchment is a process your employer initiated, not a verdict on your worth. The checklist exists so panic cannot spend the money.`,
    category: "business",
    province: "gauteng",
    author: "Daniel Naidoo",
    tags: ["guide", "retrenchment", "UIF", "debt"],
    imageUrl: IMG.retrench,
  },
  {
    kind: "guide",
    title:
      "Starting a spaza, stall or side hustle: registrations, tax and UIF in plain language",
    summary:
      "When you need to register a business, where informal trade ends and VAT begins, what records keep you out of trouble, and the permits informal traders actually need.",
    body: `JOHANNESBURG – Most small businesses fail not for lack of customers but for confusion about compliance. The rules are less frightening than the rumours; here is the practical sequence for a spaza, market stall, car wash, food vendor or service side hustle.

Step one is choosing the form. A sole proprietorship requires no separate registration with CIPC — you trade under your own name (or a registered trade name) and report business income in your personal tax return. Only register a private company once liability separation or a contract genuinely demands it; the annual returns and accounting obligations are real costs.

Step two is tax registration. Sole proprietors register for income tax; below the compulsory VAT threshold (check the current SARS figure annually, historically R1 million turnover over twelve months), you do not need VAT registration. Above it, registration is mandatory, late registration costly, and input claims require tax invoices. Keep turnover records from day one to know when you cross.

Step three is the municipal and health layer. Informal traders generally need a designated trading permit or hawkers' licence from the metro; food handling requires a business/health certificate in many cities; selling liquor requires a separate licence with premises conditions; signage and outdoor trading have bylaws that vary by metro. Visit the municipal trade office before spending on build-outs.

Step four is record-keeping, the cheapest protection in business. A simple notebook or free spreadsheet recording daily sales, supplier purchases, transport and airtime costs turns business income into taxable profit correctly. Without expense records, you pay tax on turnover, which can destroy a thin-margin business.

Step five is banking. A separate account or even a dedicated business pocket prevents personal spending from muddying business records and makes loans possible later; formal lenders finance records, not ambitions.

Step six is protection. Public liability cover for food and equipment operations is inexpensive relative to one incident; stokvel-style cover beats nothing, but formal micro-insurance products increasingly suit microbusinesses.

Step seven is employees. Even one worker triggers UIF obligations, minimum-wake compliance and basic employment records. Casual help that looks like an employee is treated as one at the CCMA regardless of the label.

Compliance is not the enemy of hustle; it is how a hustle becomes something a bank, a mall or a municipality will take seriously.`,
    category: "business",
    province: "gauteng",
    region: "City of Johannesburg",
    author: "Tshepo Malema",
    tags: ["guide", "small business", "tax", "informal trade"],
    imageUrl: IMG.hustle,
  },
  {
    kind: "guide",
    title:
      "The South African's guide to offshore investing — without being scammed",
    summary:
      "Discretionary and foreign investment allowances, tax amnesty myths, the difference between legit offshore exposure and forex boiler rooms, and the cheapest routes to global diversification.",
    body: `JOHANNESBURG – Every sharp rand move brings a wave of offshore marketing, some legitimate and some predatory. Here is how South Africans legally take money abroad, where the tax lines are, and how to recognise the fraud before the first transfer.

The two allowances matter. The single discretionary allowance (historically R1 million per adult per calendar year) generally requires no South African Revenue Service tax clearance for travel, study and limited investment uses. The foreign investment allowance (historically R10 million) requires a tax-compliance status (the modern PIN issued by SARS) and routes through an authorised dealer — a licensed bank.

Above those combined limits, a special SARS/Reserve Bank application is required. The rules and figures update, so verify current thresholds before transacting; any advisor quoting old allowances confidently is a red flag on its own.

The legitimate routes, in ascending cost and complexity: local global-equity ETFs and feeder funds that give foreign exposure without moving a rand offshore; a bank- or-broker-facilitated offshore account under the allowances; or direct offshore platform accounts for larger, sophisticated portfolios.

Now the fraud pattern. Boiler rooms cold-call or WhatsApp from cloned firms, promise guaranteed returns, push urgency and account changes, and demand transfer into personal or unrelated accounts. Legitimate providers never: cold-sell guaranteed profits, rush tax clearance, request remote access to your device, or instruct you to email passwords. Verify every intermediary against the Financial Sector Conduct Authority's registries and phone the institution's independently sourced number.

Tax is not optional offshore. Worldwide income and gains are reportable by South African tax residents; foreign dividends and interest follow specific exemption rules; and non-declared historical offshore holdings are handled through voluntary disclosure programmes, not advertised "amnesties" sold by fixers.

Diversification logic is sound — a genuinely global portfolio reduces single-currency and single-market risk — but currency timing should be humble. Rand-cost averaging across years beats a panicked conversion on the worst day.

Finally, keep the documentation: purpose of transfer, source of funds, SARS letters and statements. The legal route is paperwork; the scam route always asks you to bypass it. That distinction is the entire guide.`,
    category: "business",
    province: "gauteng",
    author: "Ahmed Patel",
    tags: ["guide", "offshore investing", "scams", "tax", "rand"],
    imageUrl: IMG.offshore,
  },
];
