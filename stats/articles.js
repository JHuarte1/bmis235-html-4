/* =====================================================================
   articles.js — the content of the Stats Theory site
   ---------------------------------------------------------------------
   Every article is one object in the ARTICLES list below.
   To add a new article, copy one object, give it a new unique "id",
   and change the text. The home page and article page build themselves
   from this list, so nothing else needs to change.

   Fields:
     id, unit, topic, title, dek (the subtitle), minutes (reading time)
     concepts      – the theory words the article teaches
     body          – the article itself, as HTML
     widget        – optional: "clt" or "ci" adds an interactive simulation
     takeaways     – the theory in one line each
     myths         – common misconceptions: { myth, truth }
     quiz          – concept questions: { q, options, answer (index), why }

   The companies in these stories are fictional, built to look like
   situations real businesses face every day.
   ===================================================================== */

const ARTICLES = [

/* ------------------------------------------------------------------ */
{
  id: "describing-data",
  unit: 1,
  topic: "Describing Data",
  title: "The 28-Minute Promise That Made Customers Angry",
  dek: "A delivery startup's average looked great. Its customers disagreed. Why the mean, the median and the spread each tell a different story.",
  minutes: 7,
  concepts: ["Mean vs. median", "Skewness", "Outliers", "Standard deviation", "IQR", "Types of data"],
  body: `
<p>QuickBite, a regional food-delivery app, put a bold line on its billboards: <strong>"Average delivery: 28 minutes."</strong> The number was true. It came straight from last month's 40,000 orders. Yet the customer-support inbox was full of people saying their food took an hour.</p>
<p>Both things were true at the same time, and the reason why is the core idea of descriptive statistics: <em>a single number can't describe a whole distribution.</em></p>

<h2>What the mean actually measures</h2>
<p>The mean is the balance point of the data. If you put every delivery time on a seesaw, the mean is where it balances. That has a consequence: <strong>values far from the center pull harder</strong>. One 95-minute order during a snowstorm moves the mean as much as several 5-minute deliveries in the other direction.</p>
<p>QuickBite's delivery times were <strong>right-skewed</strong>. Most orders arrived in 20–25 minutes, but there was a long tail of late orders: rush hour, wrong addresses, restaurants that were behind. A delivery can't take fewer than 0 minutes, but it can take 90. When a variable has a floor but no ceiling, skew is common. Income, home prices, wait times and insurance claims are all like this.</p>

<div class="callout"><strong>Theory rule:</strong> In a right-skewed distribution, the mean is pulled toward the tail, so <em>mean &gt; median</em>. In a left-skewed distribution, <em>mean &lt; median</em>. In a symmetric distribution they're about equal. Comparing the two tells you which way the data leans.</div>

<h2>The median: what a "typical" customer gets</h2>
<p>When an analyst pulled the median, it was 23 minutes. Half of all orders arrived faster than that, half slower. The median only cares about the <em>order</em> of the values, not how big they are, so the snowstorm order counts the same as any other slow order. That's why we call the median <strong>resistant</strong> to outliers, and the mean is not.</p>
<p>So why were people still angry? Because neither center describes the <em>worst</em> experiences, and those were what people remembered and complained about.</p>

<h2>Spread is about consistency, and consistency is the product</h2>
<p>QuickBite's competitor, DashDinner, also averaged about 28 minutes. But DashDinner's <strong>standard deviation</strong> was 4 minutes, and QuickBite's was 14.</p>
<p>The standard deviation is roughly the <em>typical distance of an observation from the mean</em>. A small SD means "you'll get about the average almost every time." A large SD means "the average is a coin flip away from what you'll actually get." For a customer planning dinner, same mean with higher spread is a worse product. Finance calls this exact idea <strong>risk</strong>: two investments with the same average return but different SDs are not equally attractive.</p>
<p>Because the data were skewed, the analyst also reported the <strong>IQR</strong> (interquartile range, Q3 − Q1), the spread of the middle 50%. Like the median, it ignores the extreme tail, so it's the better spread measure for skewed data. The pairing rule: <em>mean with SD</em> for roughly symmetric data, <em>median with IQR</em> for skewed data or data with outliers.</p>

<h2>Outliers: delete them or study them?</h2>
<p>The 1.5×IQR rule flagged about 6% of orders as outliers. A junior analyst wanted to drop them to "clean" the data. The operations manager said no: those orders <em>were the business problem</em>. Outliers are only errors if they're mistakes (a timestamp bug, a test order). If they're real, they're often the most important data you have.</p>

<h2>First question: what kind of variable is it?</h2>
<p>Before any of this, you have to know what kind of variable you have. Delivery time is <strong>quantitative</strong>: numbers where arithmetic makes sense. "Which restaurant" or "was the order late (yes/no)" is <strong>categorical</strong>. You can't average a zip code even though it's made of digits. Categorical variables are summarized with counts and proportions ("18% of orders were late"), not means.</p>

<h2>What QuickBite changed</h2>
<p>Marketing replaced the billboard with "Most orders in under 25 minutes," a statement about the median that matched what a typical customer actually got. Operations started tracking the 90th-percentile delivery time, a number that describes the tail. The mean was never wrong. It was just answering a question nobody was asking.</p>
`,
  takeaways: [
    "The mean is a balance point, so outliers and long tails pull it; the median is resistant.",
    "Skew direction: mean is pulled toward the tail (right skew → mean > median).",
    "Standard deviation ≈ the typical distance from the mean, so it measures consistency (or risk).",
    "Use mean + SD for symmetric data, median + IQR for skewed data.",
    "Outliers are information until you show they're errors."
  ],
  myths: [
    { myth: "The average is what most people experience.", truth: "In skewed data, the mean can sit where few observations actually are. The median is closer to 'typical'." },
    { myth: "A bigger standard deviation means bigger values.", truth: "SD measures spread, not size. Two datasets with the same mean can have very different SDs." },
    { myth: "Outliers should always be removed.", truth: "Remove them only if they're errors. Real extreme values often matter most." }
  ],
  quiz: [
    { q: "Home prices in a city have a mean of $612,000 and a median of $455,000. What does this suggest?",
      options: ["The distribution is symmetric", "The distribution is right-skewed by some very expensive homes", "The distribution is left-skewed", "The data has a mistake, since mean and median must match"],
      answer: 1, why: "The mean is pulled toward the tail. A mean far above the median means a long right tail, here a few very expensive homes." },
    { q: "Two suppliers both deliver parts in an average of 5 days. Supplier A has SD = 0.5 days, Supplier B has SD = 3 days. Why might a manager prefer A?",
      options: ["A is faster", "A is more predictable, so planning is easier", "B has more outliers so it's cheaper", "There is no difference since the means are equal"],
      answer: 1, why: "Same center, less spread. SD measures consistency, and predictable delivery lowers the inventory you need to keep on hand." },
    { q: "Which pair of summaries is best for describing CEO salaries at 500 companies?",
      options: ["Mean and standard deviation", "Median and IQR", "Mode and range", "Mean and range"],
      answer: 1, why: "Salaries are strongly right-skewed. Median and IQR are resistant to the extreme values; mean and SD are not." },
    { q: "If one extreme value is added to a dataset, which changes the LEAST?",
      options: ["Mean", "Standard deviation", "Range", "Median"],
      answer: 3, why: "The median only depends on the middle position, so one extreme value barely moves it. Mean, SD and range all use the actual size of the extreme value." }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "probability",
  unit: 2,
  topic: "Probability",
  title: "The Fraud Alert That Was Wrong 91% of the Time",
  dek: "A bank's 99%-accurate fraud model kept freezing honest customers' cards. Conditional probability and base rates explain why both facts are true.",
  minutes: 8,
  concepts: ["Conditional probability", "Base rates", "Independence", "Mutually exclusive", "Law of large numbers"],
  body: `
<p>Northline Bank rolled out a new fraud-detection model with a headline stat: it catches <strong>99%</strong> of fraudulent transactions, and only wrongly flags <strong>1%</strong> of legitimate ones. Within a week, the call center was swamped by honest customers whose cards had been frozen at the grocery store.</p>
<p>The model worked exactly as advertised. The problem was a probability mistake that people make all the time: <strong>mixing up P(A | B) with P(B | A).</strong></p>

<h2>Two different questions</h2>
<p>"99% accurate" answers this question: <em>if a transaction is fraud, what's the chance it gets flagged?</em> That's <strong>P(flag | fraud) = 0.99</strong>.</p>
<p>The customer whose card got frozen cares about a different question: <em>given that I got flagged, what's the chance this is actually fraud?</em> That's <strong>P(fraud | flag)</strong>. The vertical bar means "given that," and switching what's on each side of it changes the question completely.</p>

<h2>Count it out: a table of 1,000,000 transactions</h2>
<p>Fraud is rare. Say 1 in 1,000 transactions (0.1%) is fraud. Picture a million transactions:</p>
<table class="data">
  <tr><th></th><th>Flagged</th><th>Not flagged</th><th>Total</th></tr>
  <tr><td>Fraud</td><td>990</td><td>10</td><td>1,000</td></tr>
  <tr><td>Legitimate</td><td>9,990</td><td>989,010</td><td>999,000</td></tr>
  <tr><td>Total</td><td><strong>10,980</strong></td><td>989,020</td><td>1,000,000</td></tr>
</table>
<p>Of the 10,980 flagged transactions, only 990 are fraud: <strong>990 / 10,980 ≈ 9%</strong>. So about <strong>91% of alerts are false alarms</strong>, from a model that is "99% accurate."</p>
<div class="callout"><strong>Theory rule:</strong> P(A | B) = P(A and B) / P(B). Conditioning means <em>shrinking your universe</em> to only the cases where B happened, then asking how often A happens inside it. Here the universe is "flagged transactions," and inside it, legitimate ones vastly outnumber fraud.</div>

<h2>Why base rates matter</h2>
<p>The 1% false-positive rate sounds small, but it's 1% of a <em>huge</em> group (999,000 honest transactions). The 99% catch rate applies to a <em>tiny</em> group (1,000 fraud cases). When something is rare, even a good test produces more false alarms than true hits. Ignoring how rare the event is (the <strong>base rate</strong>) is called the <strong>base-rate fallacy</strong>. It shows up in medical screening, drug testing, résumé filters and security systems.</p>
<p>Northline's fix wasn't a better model. They changed the <em>response</em>: instead of freezing the card, a flag triggered a text message, "Was this you?" A cheap response for a signal that's usually wrong.</p>

<h2>Independence: does knowing one thing change the other?</h2>
<p>Two events are <strong>independent</strong> if knowing one happened doesn't change the probability of the other: P(A | B) = P(A). Flagging and fraud are clearly <em>not</em> independent. A flag raises the fraud probability from 0.1% to 9%, a 90× jump. That's the model doing its job.</p>
<p>Students often confuse independent with <strong>mutually exclusive</strong> (the events can't both happen). These are almost opposites. If a transaction can't be both "approved" and "declined," then knowing it was approved tells you for certain it wasn't declined. That's maximum <em>dependence</em>. Mutually exclusive events (each with a probability above zero) are never independent.</p>

<h2>The law of large numbers: why the bank can price risk at all</h2>
<p>Northline can't predict whether <em>your</em> next transaction is fraud. But it can predict very accurately that about 0.1% of next month's 30 million transactions will be. The <strong>law of large numbers</strong> says that as the number of trials grows, the observed proportion settles toward the true probability. Individual outcomes are random; long-run proportions are predictable. That's the business model of every bank, insurer and casino.</p>
<p>The flip side: the law of large numbers does <em>not</em> say short runs "balance out." After 10 fraud-free days, fraud is not "due." Independent events have no memory. Believing otherwise is the <strong>gambler's fallacy</strong>.</p>
`,
  takeaways: [
    "P(A | B) and P(B | A) are different questions; swapping them is a classic error.",
    "Conditioning = restricting to the cases where B happened, then asking about A.",
    "When an event is rare, even accurate tests produce mostly false positives (base rates matter).",
    "Independent: P(A | B) = P(A). Mutually exclusive: can't happen together. They're not the same; they're nearly opposites.",
    "Law of large numbers: long-run proportions settle down, but short runs don't 'correct' themselves."
  ],
  myths: [
    { myth: "A 99%-accurate test means a positive result is 99% likely to be right.", truth: "That depends on the base rate. For rare events, most positives can be false." },
    { myth: "Mutually exclusive events are independent.", truth: "If one happening rules out the other, they're strongly dependent." },
    { myth: "After a long streak, the other outcome is 'due.'", truth: "Independent trials have no memory. The law of large numbers works by swamping the streak, not by correcting it." }
  ],
  quiz: [
    { q: "A hiring screen passes 95% of qualified applicants and 20% of unqualified ones. Only 5% of applicants are qualified. Among people who pass, roughly what share are qualified?",
      options: ["About 95%", "About 80%", "About 20%", "About 50%"],
      answer: 2, why: "Per 1,000 applicants: 50 qualified → 47.5 pass; 950 unqualified → 190 pass. 47.5 / 237.5 ≈ 20%. The low base rate dominates." },
    { q: "In a store, 30% of customers buy coffee and 30% of coffee buyers also buy a pastry. 30% of all customers buy a pastry. Coffee and pastry purchases are:",
      options: ["Mutually exclusive", "Independent", "Dependent", "Impossible to judge"],
      answer: 1, why: "P(pastry | coffee) = 0.30 = P(pastry). Knowing someone bought coffee doesn't change the pastry probability, which is the definition of independence." },
    { q: "Which statement best describes the law of large numbers?",
      options: ["After many losses, a win becomes more likely", "With many trials, the observed proportion gets close to the true probability", "Large samples are always unbiased", "Rare events become common in large samples"],
      answer: 1, why: "The LLN is about long-run relative frequency converging to the probability. It says nothing about streaks correcting." },
    { q: "Events A and B are mutually exclusive, P(A) = 0.4, P(B) = 0.3. What is P(A | B)?",
      options: ["0.4", "0.12", "0", "0.7"],
      answer: 2, why: "If B happened, A can't have happened, so P(A | B) = 0. Since 0 ≠ P(A), they're dependent." }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "random-variables",
  unit: 3,
  topic: "Random Variables & the Binomial",
  title: "Why Airlines Sell More Seats Than They Have",
  dek: "Overbooking looks reckless until you see it as a binomial random variable. Expected value, variance, and the assumptions the model needs.",
  minutes: 8,
  concepts: ["Random variable", "Expected value", "Variance & SD", "Binomial conditions", "Independence assumption"],
  body: `
<p>SkyHarbor Airlines flies a 180-seat jet from Denver to Seattle. Their records show that about <strong>7% of ticketed passengers don't show up</strong>. Missed connections, changed plans, refundable fares. An empty seat on a departed plane earns nothing, forever. So SkyHarbor sells <strong>190</strong> tickets.</p>
<p>Is that smart or a lawsuit waiting to happen? The answer comes from treating "number of passengers who show up" as a <strong>random variable</strong>.</p>

<h2>A random variable is a number produced by chance</h2>
<p>Before the flight, we don't know how many people will show up. It could be 172, 177 or 183. A random variable (call it <em>X</em>) is a rule that assigns a number to each possible outcome of a random process. Its <strong>probability distribution</strong> lists every possible value and how likely each is. That distribution, not any single guess, is what a manager needs.</p>

<h2>When is it binomial? Check the four conditions</h2>
<p>X is <strong>binomial</strong> if it counts "successes" under four conditions:</p>
<ol>
  <li><strong>Fixed number of trials:</strong> n = 190 tickets. ✔</li>
  <li><strong>Two outcomes per trial:</strong> each passenger shows or doesn't. ✔</li>
  <li><strong>Same probability each trial:</strong> p = 0.93 for everyone. Roughly ✔</li>
  <li><strong>Independent trials:</strong> one person showing up doesn't affect another. ⚠ <em>Watch this one.</em></li>
</ol>
<p>The theory is only as good as its assumptions. A family of five on one booking shows up or doesn't <em>together</em>. A snowstorm makes many people miss the flight <em>together</em>. Those situations break independence, and the real distribution has more spread than the binomial predicts. A good analyst names the assumption and asks how wrong it might be.</p>

<h2>Expected value: the long-run average, not a prediction</h2>
<p>For a binomial, the <strong>expected value</strong> is <em>E(X) = np = 190 × 0.93 = 176.7</em> passengers.</p>
<p>No flight will ever have 176.7 passengers. The expected value is what you'd get <em>if you averaged X over many, many flights</em>. It's a long-run average, which is why it's so useful to a company running the same route 700 times a year.</p>
<div class="callout"><strong>Theory rule:</strong> Expected value is a weighted average of possible values, each weighted by its probability: E(X) = Σ x·P(x). It describes the <em>center</em> of the distribution, not the most likely outcome and not a guarantee.</div>

<h2>Variance and SD: how far off a single flight can be</h2>
<p>For a binomial, <em>SD = √(np(1−p)) = √(190 × 0.93 × 0.07) ≈ 3.5</em> passengers. Most flights land within a few passengers of 176.7. But "most" isn't "all," and the tail is where the cost is.</p>
<p>Using the binomial model, the probability that <strong>more than 180</strong> people show up (someone gets bumped) is about <strong>13.8%</strong>. That's roughly one flight in seven. Here's how that risk changes with tickets sold:</p>
<table class="data">
  <tr><th>Tickets sold</th><th>Expected shows</th><th>P(more than 180 show)</th></tr>
  <tr><td>185</td><td>172.1</td><td>0.3%</td></tr>
  <tr><td>188</td><td>174.8</td><td>4.4%</td></tr>
  <tr><td>190</td><td>176.7</td><td>13.8%</td></tr>
  <tr><td>195</td><td>181.4</td><td>60.9%</td></tr>
</table>
<p>Notice the risk isn't linear. Each extra ticket pushes more of the distribution past the 180 line, and the bump probability climbs fast.</p>

<h2>Turning probability into a business decision</h2>
<p>The decision combines probabilities with <strong>costs</strong>. An empty seat costs SkyHarbor about $250 in lost fare. A bumped passenger costs about $800 in vouchers, rebooking and goodwill. The airline picks the number of tickets that maximizes <em>expected profit</em>. That's an expected-value calculation over the whole distribution. This is how most business decisions under uncertainty work: <strong>probability × consequence, summed over outcomes</strong>.</p>
<p>And here's the reason the independence assumption matters: if snowstorm days cause clustered no-shows <em>and</em> clustered shows, the real tail is fatter than the binomial says. SkyHarbor's analysts sell fewer seats on routes where group travel is common.</p>
`,
  takeaways: [
    "A random variable assigns numbers to random outcomes; its distribution shows all values and probabilities.",
    "Binomial requires: fixed n, two outcomes, constant p, independent trials.",
    "E(X) = np is the long-run average over many repetitions, not a prediction for one trial.",
    "SD = √(np(1−p)) tells you how far a single outcome typically lands from the mean.",
    "Business decisions combine probabilities with costs: expected value of the whole distribution."
  ],
  myths: [
    { myth: "The expected value is the most likely outcome.", truth: "It's the long-run average. It may not even be a possible value (176.7 passengers)." },
    { myth: "Any count of successes is binomial.", truth: "Only if n is fixed, p is constant and trials are independent. Group behavior breaks this." },
    { myth: "If you expect 176.7 shows, selling 190 is always safe for 180 seats.", truth: "The mean ignores spread. There's still about a 14% chance of overflow." }
  ],
  quiz: [
    { q: "A call center makes calls until it gets 10 sales. The number of calls made is:",
      options: ["Binomial, since each call is a success or failure", "Not binomial, because the number of trials isn't fixed", "Binomial if p is constant", "Normal"],
      answer: 1, why: "Binomial requires a fixed number of trials n. Here the count of trials is the random part, so it's a different distribution." },
    { q: "A raffle ticket has E(winnings) = −$0.40. What does this mean?",
      options: ["Every ticket loses exactly $0.40", "Over many tickets, the average result is a $0.40 loss per ticket", "You will probably lose $0.40", "The raffle is illegal"],
      answer: 1, why: "Expected value is a long-run average. Most tickets lose the full price and a few win big; the average across many tickets is −$0.40." },
    { q: "Why might the binomial model UNDERSTATE the chance of a hotel being overbooked?",
      options: ["Because p is too large", "Because guests at the same conference tend to cancel or show together, breaking independence", "Because n is fixed", "Because there are only two outcomes"],
      answer: 1, why: "When outcomes move together, extreme totals become more likely than the independent-trials model predicts. The real tails are fatter." },
    { q: "Two products both have expected monthly profit of $10,000. Product A's SD is $500; B's is $6,000. A risk-averse manager prefers:",
      options: ["A", "B", "Either, since expected values are equal", "Neither"],
      answer: 0, why: "Same center, but A's outcomes are far more predictable. SD measures risk around the expected value." }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "normal-distribution",
  unit: 4,
  topic: "The Normal Distribution",
  title: "How a Coffee Roaster Decides How Much Coffee to Give Away",
  dek: "Every bag says 12 oz. Every machine is imperfect. Z-scores, areas under the curve, and why the mean has to sit above the label.",
  minutes: 7,
  concepts: ["Normal model", "Z-scores", "Empirical rule (68-95-99.7)", "Area = probability", "Checking normality"],
  body: `
<p>Ridgeline Roasters sells coffee in bags labeled <strong>12 oz</strong>. Their filling machine is good but not perfect: fill weights vary from bag to bag with a <strong>standard deviation of 0.2 oz</strong>, and the variation looks like a bell curve. Consumer-protection rules and retail contracts punish them if too many bags come in under 12 oz.</p>
<p>So where should they set the machine? If they aim at exactly 12.0, half their bags will be underweight. The answer comes from the normal model.</p>

<h2>A model, not a fact</h2>
<p>The <strong>normal distribution</strong> is a mathematical model: a symmetric, bell-shaped curve fully described by two numbers, its mean μ and standard deviation σ. Real data are never <em>exactly</em> normal, but many measurements come close: fill weights, part dimensions, measurement errors, test scores. They come close because they're the sum of many small, independent sources of variation. (Unit 5 explains why sums like that tend toward a bell shape.)</p>
<p>Before you trust it, <strong>check it</strong>. Ridgeline's quality team plotted a histogram of 500 bags and a normal probability plot (points along a straight line = normal-ish). If the data were skewed, or had two peaks because two machines were mixed, normal calculations would give wrong answers.</p>

<h2>The z-score: a universal ruler</h2>
<p>A z-score tells you <strong>how many standard deviations a value is from the mean</strong>:</p>
<p class="formula">z = (x − μ) / σ</p>
<p>If the machine is set to μ = 12.3 oz, a 12.0 oz bag has z = (12.0 − 12.3) / 0.2 = <strong>−1.5</strong>. It's 1.5 SDs below average. The units (ounces) cancel out, which is the point: z-scores let you compare things measured in completely different units. A z of −1.5 means the same "unusualness" whether it's coffee weight, a stock's daily return or a student's exam score.</p>

<h2>Area under the curve = probability</h2>
<p>For a continuous model, probability is <strong>area under the curve</strong>. The total area is 1. The chance of a bag being under 12 oz is the area to the left of z = −1.5, which is about <strong>6.7%</strong>. (The probability of any <em>exact</em> value, like exactly 12.000 oz, is zero; only ranges have area.)</p>
<div class="callout"><strong>Empirical rule:</strong> For a normal model, about <strong>68%</strong> of values fall within 1 SD of the mean, <strong>95%</strong> within 2 SDs, and <strong>99.7%</strong> within 3 SDs. It's a quick sanity check: anything beyond 3 SDs is genuinely rare.</div>

<h2>Working backward: setting the machine</h2>
<p>Ridgeline's retail contract allows at most <strong>1%</strong> of bags under 12 oz. Now the problem runs in reverse: <em>what z cuts off the bottom 1%?</em> The normal table says z ≈ −2.33. So 12 oz must sit 2.33 SDs below the mean:</p>
<p class="formula">μ = 12 + 2.33 × 0.2 ≈ 12.47 oz</p>
<p>Every bag gets, on average, almost half an ounce of free coffee. That's the <strong>cost of variability</strong>.</p>

<h2>The real lesson: reduce σ</h2>
<p>Here's what surprises people. Ridgeline's engineers found a better filler head that cut σ to 0.1 oz. The new target is 12 + 2.33 × 0.1 ≈ 12.23 oz, saving 0.24 oz per bag. Across 2 million bags a year, that's about <strong>30,000 lbs of coffee</strong>, from improving <em>consistency</em>, not the average. This is the logic behind Six Sigma and most quality programs: shrink the spread, and you can move the mean closer to the limit without breaking it.</p>
`,
  takeaways: [
    "The normal distribution is a model described by μ and σ. Check the data's shape before using it.",
    "A z-score is the number of SDs from the mean; it removes units so values can be compared.",
    "For continuous models, probability = area under the curve; single exact values have probability 0.",
    "68–95–99.7: within 1, 2 and 3 SDs.",
    "Reducing σ lets you operate closer to a limit; variability has a real cost."
  ],
  myths: [
    { myth: "Most real data is normally distributed.", truth: "Many things are roughly normal, but plenty are skewed (incomes, wait times). Always look at the data first." },
    { myth: "A z-score of −2 means the value is negative.", truth: "It means 2 SDs below the mean. The value itself can be any number." },
    { myth: "To have fewer underweight bags you should raise the mean.", truth: "That works, but cutting σ achieves it more cheaply." }
  ],
  quiz: [
    { q: "A stock's daily returns have mean 0.05% and SD 1.2%. Today it fell 3.55%. What is today's z-score, and is it unusual?",
      options: ["z = −3.0; very unusual", "z = −2.9; normal day", "z = −0.3; ordinary", "Can't compute without n"],
      answer: 0, why: "z = (−3.55 − 0.05) / 1.2 = −3.0. Under a normal model, beyond 3 SDs happens only about 0.3% of the time. (Real stock returns have fatter tails than normal, so check that assumption!)" },
    { q: "Why can z-scores compare a 680 SAT score with a 29 ACT score?",
      options: ["Because both tests are scored out of 100", "Because z-scores remove units and express position relative to each test's own mean and SD", "Because both are normal", "They can't be compared"],
      answer: 1, why: "A z-score says how many SDs above or below its own group's average a value is. That's a unit-free measure of relative standing." },
    { q: "For a normal model, about what percent of values are MORE than 2 SDs above the mean?",
      options: ["5%", "2.5%", "95%", "0.15%"],
      answer: 1, why: "95% are within 2 SDs, so 5% are outside, split equally between the two tails: 2.5% above." },
    { q: "Fill weights form two separate humps because two machines feed one line. What's the problem with using a normal model?",
      options: ["Nothing, since the CLT fixes it", "The data are bimodal, so a single normal curve misrepresents the shape and its probabilities will be wrong", "The mean will be zero", "Normal models need n > 30"],
      answer: 1, why: "A normal model has one peak. Using it on bimodal data gives wrong areas. Separate the machines and model each one." }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "sampling-distributions",
  unit: 5,
  topic: "Sampling Distributions & the CLT",
  title: "How 400 Receipts Told a CFO the Truth About 2 Million Customers",
  dek: "A retail chain can't survey everyone. The Central Limit Theorem explains why it doesn't have to, and why sample size matters with a square root.",
  minutes: 9,
  concepts: ["Parameter vs. statistic", "Sampling variability", "Sampling distribution", "Standard error", "Central Limit Theorem"],
  widget: "clt",
  body: `
<p>Harbor Home Goods has about 2 million loyalty-card customers. The CFO wants to know the <strong>average amount a customer spends per visit</strong> to plan next year's budget. Pulling and cleaning every transaction record takes months. The analytics team proposes a random sample of 400 receipts.</p>
<p>"Four hundred out of two million?" the CFO asks. "That's 0.02%. How can that be enough?"</p>
<p>The answer is the most important idea in the whole course, and it's what connects everything before this unit to everything after it.</p>

<h2>Parameter vs. statistic</h2>
<p>The true average spend of all 2 million customers is a <strong>parameter</strong> (written μ). It's a fixed number, but unknown. The average of the 400 sampled receipts is a <strong>statistic</strong> (written x̄). It's known, but it would come out a little different if you took a different random sample. That's <strong>sampling variability</strong>, and it isn't a mistake. It's what happens whenever you sample at random.</p>

<h2>The big shift: the distribution of the statistic</h2>
<p>Imagine the team took sample after sample, each 400 receipts, and recorded x̄ each time. Those x̄ values would form their own distribution: the <strong>sampling distribution</strong> of the mean. This is the conceptual leap that trips people up, so be precise about the three distributions involved:</p>
<table class="data">
  <tr><th>Distribution of…</th><th>What's being plotted</th><th>Shape here</th></tr>
  <tr><td>The <strong>population</strong></td><td>Spend of each of 2M customers</td><td>Strongly right-skewed</td></tr>
  <tr><td>One <strong>sample</strong></td><td>Spend of 400 customers</td><td>Also right-skewed (it looks like the population)</td></tr>
  <tr><td>The <strong>sampling distribution</strong></td><td>x̄ from many samples of 400</td><td>Nearly normal, tightly centered on μ</td></tr>
</table>
<p>The individual customers are wildly variable. Some spend $4 on a candle and some spend $900 on a couch. But <em>averages of 400 customers</em> are remarkably stable, because the big and small spenders in each sample mostly cancel out.</p>

<h2>Three facts about the sampling distribution of x̄</h2>
<ol>
  <li><strong>Center:</strong> its mean equals μ. The sample mean is <em>unbiased</em>: it doesn't systematically aim too high or too low.</li>
  <li><strong>Spread:</strong> its SD, called the <strong>standard error</strong>, is <em>σ / √n</em>. Customer spend has σ ≈ $60, so SE = 60 / √400 = <strong>$3</strong>.</li>
  <li><strong>Shape (the CLT):</strong> for large enough n, it's approximately <strong>normal</strong>, <em>even when the population is skewed</em>.</li>
</ol>
<div class="callout"><strong>Central Limit Theorem:</strong> When you take random samples of size n from almost any population with mean μ and SD σ, the sampling distribution of x̄ is approximately normal with mean μ and SD σ/√n, and the approximation gets better as n grows. The more skewed the population, the bigger n needs to be.</div>
<p>So the CFO can say: about 95% of samples of 400 give an x̄ within 2 SEs, about <strong>±$6</strong>, of the true average. For budgeting, that's plenty.</p>

<h2>Why population size barely matters</h2>
<p>Look at the standard error formula again: σ / √n. The population size (2 million) isn't in it. Precision depends on how many you sample, not what fraction you sample. A spoonful of soup tells you how salty the pot is whether it's a small pot or a huge vat, <em>as long as the soup is stirred</em>. In statistics, "stirred" means <strong>random sampling</strong>. A biased sample of a million is worse than a random sample of 400.</p>

<h2>The square-root law</h2>
<p>The CFO asks: "What if we want ±$3 instead of ±$6?" Halving the standard error means multiplying √n by 2, which means multiplying n by <strong>4</strong>, so 1,600 receipts. Precision gets expensive: <em>to cut error in half, you need four times the data</em>. This is why polls rarely go past a few thousand people. The extra precision isn't worth the cost.</p>

<h2>Try it yourself</h2>
<p>The simulation below draws random samples from a right-skewed population of customer spending. Watch the histogram of sample means. Small samples give a wide, slightly skewed spread of x̄. Bigger samples give a narrow, bell-shaped one. That's the CLT happening in front of you.</p>
`,
  takeaways: [
    "Parameter = fixed, unknown population value (μ). Statistic = computed from a sample (x̄), varies sample to sample.",
    "The sampling distribution is the distribution of a statistic over many possible samples. It's not the data's distribution.",
    "x̄ is centered on μ (unbiased), with standard error σ/√n.",
    "CLT: the sampling distribution of x̄ is approximately normal for large n, even if the population isn't.",
    "Precision depends on n, not the population size. Halving error needs 4× the sample."
  ],
  myths: [
    { myth: "The CLT says that with a large sample, the data become normal.", truth: "The data keep the population's shape. It's the distribution of sample means that becomes normal." },
    { myth: "You need to sample a big percentage of the population.", truth: "Standard error depends on n, not on the fraction sampled. Randomness matters far more." },
    { myth: "A larger sample fixes bias.", truth: "A larger sample shrinks random error only. A biased method stays biased at any size." }
  ],
  quiz: [
    { q: "Customer wait times are strongly right-skewed. You take one random sample of 500 wait times. The histogram of those 500 values will look:",
      options: ["Normal, because of the CLT", "Right-skewed, like the population", "Uniform", "Left-skewed"],
      answer: 1, why: "A sample resembles the population it came from. The CLT is about the distribution of x̄ across many samples, not the data in one sample." },
    { q: "A survey's standard error is $8 with n = 100. About what n gives a standard error of $4?",
      options: ["200", "400", "800", "50"],
      answer: 1, why: "SE = σ/√n. Halving SE needs √n to double, so n must be multiplied by 4: 100 × 4 = 400." },
    { q: "A national chain (5 million customers) and a local shop (5,000 customers) each randomly survey 400 customers. Whose estimate is more precise?",
      options: ["The chain's, since it's a bigger population", "The shop's, since it sampled a larger fraction", "About the same, since precision depends mainly on n and σ", "Can't tell"],
      answer: 2, why: "The SE formula σ/√n doesn't include population size. With equal n and similar variability, precision is about the same." },
    { q: "Which is a parameter?",
      options: ["The average spend of the 400 sampled customers", "The proportion of all U.S. adults who own a smartphone", "The standard error of a sample", "The median of a survey"],
      answer: 1, why: "A parameter describes the entire population. It's usually unknown, and we estimate it with a statistic." }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "confidence-intervals",
  unit: 6,
  topic: "Confidence Intervals",
  title: "\"62%, Plus or Minus 5\": What a Product Survey Really Promises",
  dek: "A snack company must decide whether to launch a new flavor. Learn what 95% confidence means (and doesn't), and what a margin of error can't protect you from.",
  minutes: 9,
  concepts: ["Point estimate", "Margin of error", "Interpretation of confidence", "Width trade-offs", "Sampling error vs. bias"],
  widget: "ci",
  body: `
<p>Crisp & Co. is deciding whether to launch a chili-lime chip nationally. The launch only makes sense if more than half of their target customers would buy it. They randomly sample <strong>400</strong> target customers, let them taste it, and <strong>248 (62%)</strong> say they'd buy it.</p>
<p>The analyst's report says: "62% ± 4.8%, with 95% confidence, so between 57.2% and 66.8%." The VP asks the question everyone asks: <em>"So there's a 95% chance the real number is between 57 and 67?"</em></p>
<p>Not quite. And the difference is the whole idea of this unit.</p>

<h2>Building the interval</h2>
<p>A confidence interval is built as <strong>estimate ± margin of error</strong>, where</p>
<p class="formula">margin of error = (critical value) × (standard error)</p>
<p>The standard error of a sample proportion is √(p̂(1−p̂)/n) = √(0.62 × 0.38 / 400) ≈ 0.0243. For 95% confidence the critical value is z* = 1.96, so ME = 1.96 × 0.0243 ≈ <strong>0.048</strong>. The logic comes straight from Unit 5: about 95% of sample proportions land within 1.96 SEs of the true p. So if we reach 1.96 SEs out from our p̂, we'll capture p about 95% of the time.</p>

<h2>What "95% confident" means</h2>
<p>The true proportion p is a <strong>fixed number</strong>. It doesn't move. What's random is the <em>sample</em>, and therefore the <em>interval</em>. Each new sample of 400 would give a different p̂ and a different interval.</p>
<div class="callout"><strong>Correct interpretation:</strong> "If we repeated this sampling method many times, about 95% of the intervals it produces would contain the true proportion. We're 95% confident that this interval, 57.2% to 66.8%, is one of them." The 95% describes the <em>method's</em> long-run success rate, not the probability for this one interval.</div>
<p>Once you've calculated 57.2%–66.8%, the true p is either in it or not. You just don't know which. Think of a basketball player who makes 95% of free throws. Once the ball has left her hand, it's either going in or it isn't. The 95% describes her, not that one shot. The simulation below shows this: watch intervals from repeated samples and count how many miss.</p>

<h2>What controls the width</h2>
<p>The VP wants a narrower interval. There are three levers:</p>
<ul>
  <li><strong>Confidence level ↑ → wider.</strong> To be 99% sure of catching p, you need a bigger net (z* = 2.576). More confidence costs precision.</li>
  <li><strong>Sample size ↑ → narrower</strong>, but by √n. Going from 400 to 1,600 people halves the margin.</li>
  <li><strong>Variability ↑ → wider.</strong> For proportions, p̂ near 50% gives the most variability. For means, a larger σ means a wider interval.</li>
</ul>
<p>There's no free lunch: high confidence <em>and</em> high precision requires a large sample.</p>

<h2>Using the interval to decide</h2>
<p>The whole interval, 57%–67%, lies above the 50% threshold. Every plausible value of p supports launching. If the interval had been 46%–58%, it would include values on <em>both sides</em> of 50%, and the data couldn't settle the question. An interval shows a range of <strong>plausible values</strong> for the parameter. That's more useful than a single yes/no, and it connects directly to hypothesis testing in the next unit.</p>

<h2>What the margin of error doesn't cover</h2>
<p>The ±4.8% only accounts for <strong>random sampling error</strong>: the luck of which 400 people you happened to pick. It says nothing about:</p>
<ul>
  <li><strong>Selection bias.</strong> If the tasters were recruited at a hot-sauce festival, they don't represent target customers.</li>
  <li><strong>Response bias.</strong> People tasting free chips in front of an employee tend to be polite. "Would buy" overstates actual buying.</li>
  <li><strong>Nonresponse.</strong> If chili-haters skipped the survey, the 62% is inflated.</li>
</ul>
<p>Crisp & Co.'s previous flavor tested at 59% "would buy" and sold far below forecast, because stated intent overstated actual purchases. The interval was calculated correctly, but bias isn't part of the formula. A margin of error only covers sampling luck. It assumes everything else was done right.</p>
`,
  takeaways: [
    "CI = estimate ± (critical value × standard error).",
    "Confidence describes the method: about 95% of intervals from repeated samples capture the true parameter.",
    "The parameter is fixed; the interval is what's random.",
    "Higher confidence → wider. Larger n → narrower (by √n). More variability → wider.",
    "The margin of error only covers random sampling error, not bias."
  ],
  myths: [
    { myth: "There's a 95% probability the true value is in this interval.", truth: "The true value is fixed; it's in or it isn't. 95% is the long-run capture rate of the method." },
    { myth: "95% of the data fall inside the confidence interval.", truth: "A CI is about a parameter (like the mean), not individual observations. Most data can fall outside it." },
    { myth: "A 99% interval is better than a 95% interval.", truth: "It's more likely to capture p, but it's wider and less precise. It's a trade-off." }
  ],
  quiz: [
    { q: "A 95% CI for mean order value is ($42, $48). Which interpretation is correct?",
      options: ["95% of orders are between $42 and $48", "There's a 95% chance the sample mean is between $42 and $48", "We're 95% confident the true mean order value is between $42 and $48, because 95% of intervals made this way capture it", "The true mean is $45"],
      answer: 2, why: "The CI is about the population mean, and confidence refers to the method's capture rate. The sample mean is definitely in the interval, since it's the center." },
    { q: "Holding everything else equal, switching from a 95% to a 90% confidence level will:",
      options: ["Make the interval wider", "Make the interval narrower", "Not change the width", "Change the sample mean"],
      answer: 1, why: "Lower confidence uses a smaller critical value (1.645 vs. 1.96), so the margin of error shrinks. You accept missing more often in exchange for precision." },
    { q: "A survey of 2,000 website visitors (recruited by a pop-up) estimates satisfaction at 81% ± 1.7%. What's the biggest concern?",
      options: ["The margin of error is too small", "Voluntary-response bias: people who answer pop-ups may differ from typical visitors, and the ME doesn't account for that", "n is too small", "81% is too high to be real"],
      answer: 1, why: "A large n gives a tiny margin of error, but the ME only reflects random sampling error. Self-selected respondents can bias the result in a way no formula captures." },
    { q: "A 95% CI for the difference in conversion rates (new page − old page) is (−0.4%, +1.2%). What should you conclude?",
      options: ["The new page is better", "The old page is better", "The data are consistent with no difference, since 0 is a plausible value", "The study is invalid"],
      answer: 2, why: "Because the interval includes 0, 'no difference' is among the plausible values. You can't conclude either page is better." }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "hypothesis-testing",
  unit: 7,
  topic: "Hypothesis Testing",
  title: "The Checkout Button Test That Taught a Startup Humility",
  dek: "An online store's A/B test came back with p = 0.08. Learn what a p-value actually is, why 'fail to reject' isn't 'no effect,' and how errors cost money.",
  minutes: 10,
  concepts: ["Null & alternative hypotheses", "P-value", "Significance level α", "Type I & II errors", "Power", "Statistical vs. practical significance"],
  body: `
<p>Trailhead Outfitters, an online gear store, redesigned its checkout button: bigger, orange instead of gray, "Get My Gear" instead of "Submit." The designer was sure it would boost sales. They ran an <strong>A/B test</strong>: 10,000 visitors randomly saw the old button, and 10,000 saw the new one.</p>
<p>Results: the old button converted at <strong>4.0%</strong> (400 purchases); the new one at <strong>4.5%</strong> (450 purchases). The designer declared victory. The data scientist ran a hypothesis test and got <strong>p = 0.08</strong>. Then the arguing started.</p>

<h2>The logic: assume nothing happened, then see if the data embarrass that assumption</h2>
<p>A hypothesis test is <strong>proof by contradiction, with probability</strong>. You start by assuming the boring explanation is true, and ask whether the data you saw would be surprising under that assumption.</p>
<ul>
  <li><strong>Null hypothesis (H₀):</strong> the new button has no effect. The true conversion rates are equal; any difference is random chance in who got assigned to which group.</li>
  <li><strong>Alternative (Hₐ):</strong> the conversion rates differ (or, if you decided beforehand that you only care about one direction, the new one is higher).</li>
</ul>
<p>The hypotheses are always about <strong>parameters</strong> (the true rates), never about the sample results. We already <em>know</em> the samples differ: 4.5% ≠ 4.0%. The question is whether that gap is bigger than chance alone would usually produce.</p>

<h2>The p-value, defined carefully</h2>
<div class="callout"><strong>P-value:</strong> the probability of getting a result <em>at least as extreme</em> as the one observed, <em>assuming the null hypothesis is true</em>.</div>
<p>Here: if the buttons truly performed identically, random assignment alone would produce a gap of 0.5 percentage points or more (in either direction) about <strong>8% of the time</strong>. That's not very rare: about 1 time in 12.</p>
<p>What the p-value is <strong>not</strong>: it is not the probability that H₀ is true. It is not "an 8% chance the button doesn't work." The p-value assumes H₀ is true and asks about the data. It never gives the probability of the hypothesis itself. (That's the same P(A | B) vs. P(B | A) mix-up from Unit 2.)</p>

<h2>Making a decision: the significance level</h2>
<p>Before the test, Trailhead set a <strong>significance level α = 0.05</strong>: "We'll reject H₀ only if the result would happen less than 5% of the time by chance." Since p = 0.08 &gt; 0.05, they <strong>fail to reject H₀</strong>.</p>
<p>Notice the wording. It's not "accept H₀" or "prove the button doesn't work." It works like a courtroom: the defendant (H₀) is presumed innocent, and the verdict is "guilty" or "not guilty," never "innocent." <em>Not enough evidence</em> is not the same as <em>evidence of no effect</em>. The button might really help a little; this test just wasn't strong enough to show it.</p>

<h2>Two ways to be wrong, and what each costs</h2>
<table class="data">
  <tr><th></th><th>H₀ actually true (no effect)</th><th>H₀ actually false (real effect)</th></tr>
  <tr><td><strong>Reject H₀</strong></td><td>❌ <strong>Type I error</strong> (false positive). P = α</td><td>✅ Correct. P = power</td></tr>
  <tr><td><strong>Fail to reject</strong></td><td>✅ Correct</td><td>❌ <strong>Type II error</strong> (false negative). P = β</td></tr>
</table>
<p>In business, the costs are rarely equal. A Type I error here means rolling out a button that doesn't help. That's cheap, it's just a color change. A Type II error means walking away from a real improvement worth maybe $200,000 a year. That's an argument for a higher α. In drug approval, a Type I error could put an ineffective drug on the market, so regulators use strict α. <strong>Choosing α is a business decision, not a math one.</strong></p>

<h2>Power: was the test ever going to work?</h2>
<p><strong>Power</strong> = 1 − β is the probability of detecting an effect that really exists. With a 4% baseline and 10,000 per group, this test had only about 40% power to detect a true half-point lift. It was more likely to miss a real improvement than to find it. Power goes up with <strong>larger samples</strong>, <strong>larger true effects</strong>, <strong>less variability</strong>, and <strong>a higher α</strong>. The lesson Trailhead learned: calculate the sample size you need <em>before</em> running the test. They reran it with 40,000 per group.</p>

<h2>Statistical vs. practical significance</h2>
<p>Six months later, Trailhead tested a different font on 2 million visitors. Conversion went from 4.00% to 4.03%, p = 0.003. That's highly "significant," but worth almost nothing and not worth the engineering time. With enormous samples, <strong>tiny, meaningless differences become statistically significant</strong>. A p-value tells you whether an effect is likely real. It doesn't tell you whether the effect is <em>big enough to matter</em>. For that, look at the estimated effect size and its confidence interval.</p>
`,
  takeaways: [
    "H₀ is the 'no effect / no difference' claim about a parameter; Hₐ is what you're looking for evidence of.",
    "P-value = P(data at least this extreme | H₀ true). It is NOT P(H₀ true).",
    "Small p → data are surprising if H₀ were true → reject H₀. Large p → not enough evidence; don't 'accept' H₀.",
    "Type I = false positive (α). Type II = false negative (β). Power = 1 − β. Weigh their business costs.",
    "Statistical significance ≠ practical importance. Huge samples make tiny effects significant."
  ],
  myths: [
    { myth: "p = 0.08 means there's an 8% chance the null is true.", truth: "The p-value assumes H₀ is true and gives the probability of data this extreme." },
    { myth: "Failing to reject H₀ proves there's no effect.", truth: "It only means the evidence wasn't strong enough. Low power often explains it." },
    { myth: "A smaller p-value means a bigger effect.", truth: "p depends on both effect size and sample size. A tiny effect with huge n can have a minuscule p." },
    { myth: "α = 0.05 is a law of nature.", truth: "It's a convention. Choose α based on the costs of Type I vs. Type II errors." }
  ],
  quiz: [
    { q: "A test of whether a new training program raises average sales gives p = 0.03. Which is correct?",
      options: ["There's a 3% chance the program has no effect", "If the program truly had no effect, results this extreme would happen only about 3% of the time", "The program raises sales by 3%", "There's a 97% chance the program works"],
      answer: 1, why: "A p-value is computed assuming H₀ is true. It's the probability of data at least this extreme under that assumption." },
    { q: "A factory tests whether a batch of airbag sensors meets spec (H₀: batch is fine). A Type II error here means:",
      options: ["Rejecting a good batch", "Shipping a defective batch because the test didn't detect the problem", "Getting p < α", "Using too large a sample"],
      answer: 1, why: "Type II = failing to reject a false H₀. The batch is bad but you conclude 'no evidence of a problem.' Here that's the dangerous error, which argues for high power." },
    { q: "With n = 5 million users, a test finds the new app layout increases session time by 0.2 seconds, p < 0.0001. What's the best conclusion?",
      options: ["Launch immediately; it's highly significant", "The effect is very likely real but probably too small to matter. Weigh it against cost.", "The test is wrong", "The effect is large"],
      answer: 1, why: "Huge samples detect trivially small effects. Statistical significance says 'likely not chance,' not 'important.'" },
    { q: "Which change INCREASES the power of a test (all else equal)?",
      options: ["Decreasing the sample size", "Lowering α from 0.05 to 0.01", "Increasing the sample size", "Increasing the variability in the data"],
      answer: 2, why: "Larger n shrinks the standard error, so real effects stand out more clearly. Lowering α or adding variability reduces power." },
    { q: "Which is a correctly written null hypothesis?",
      options: ["H₀: x̄ = 50", "H₀: μ = 50", "H₀: the sample mean will be 50", "H₀: μ > 50 was observed"],
      answer: 1, why: "Hypotheses are about population parameters (μ, p), not sample statistics (x̄, p̂). We already know what the sample showed." }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "comparing-groups",
  unit: 8,
  topic: "Comparing Two Groups",
  title: "Did the Sales Training Work, or Did December Just Happen?",
  dek: "A company spent $80,000 on training and saw sales rise. Experiments vs. observational studies, confounding, and when paired data are more powerful.",
  minutes: 8,
  concepts: ["Observational study vs. experiment", "Confounding", "Random assignment", "Independent vs. paired samples", "Two-sample t-test"],
  body: `
<p>Summit Software put 30 of its 60 sales reps through an $80,000 "consultative selling" course in October. In November, the trained reps averaged <strong>$52,000</strong> in sales; the untrained reps averaged <strong>$44,000</strong>. HR's slide deck called it "an $8,000-per-rep return."</p>
<p>The CFO had three questions. Each one is a core idea of comparing groups.</p>

<h2>Question 1: "Who picked the reps who got trained?"</h2>
<p>Managers had nominated reps for the course, and they nominated their most motivated people. So the trained group was <em>already different</em> before the training began. This is an <strong>observational study</strong>: the researchers didn't control who got the treatment, they just observed what happened.</p>
<p>Motivation is a <strong>confounding variable</strong>. It's related to both who got trained <em>and</em> sales results, so its effect is mixed up with the training's effect. The $8,000 gap could be all training, all motivation, or any mix. The data can't separate them.</p>
<div class="callout"><strong>Theory rule:</strong> Only a <strong>randomized experiment</strong> can establish cause and effect. <strong>Random assignment</strong> balances confounders, including ones you never thought to measure, across groups on average. Any remaining difference is then either the treatment or chance, and a hypothesis test measures the chance part.</div>

<h2>Question 2: "Is $8,000 more than random noise?"</h2>
<p>Next year Summit did it properly: 60 reps were <strong>randomly assigned</strong> to training or no training. The trained group beat the untrained group by $5,000 on average. That's smaller than before, which is a hint that motivation had inflated the first result.</p>
<p>But individual reps' sales vary a lot (SD ≈ $15,000). With 30 per group, a <strong>two-sample t-test</strong> compares the gap to its standard error:</p>
<p class="formula">t = (x̄₁ − x̄₂) / √(s₁²/n₁ + s₂²/n₂) = 5,000 / √(15,000²/30 + 15,000²/30) ≈ 1.29</p>
<p>A t of 1.29 means the gap is only 1.3 standard errors from zero, and p ≈ 0.20. Rep-to-rep variation is so large that a $5,000 difference could easily be chance. That doesn't mean the training doesn't work. It means this design couldn't tell.</p>

<h2>Question 3: "Why compare different people at all?"</h2>
<p>The analyst had a better idea: compare each rep <em>to themselves</em>. Measure every trained rep's sales in the quarter before and the quarter after. That's <strong>paired data</strong>. Each "after" observation is naturally linked to one "before" observation from the same person.</p>
<p>With paired data, you analyze the <strong>differences</strong> (after − before) as one sample. The huge variation <em>between</em> reps (some have big territories, some small) cancels out, because each rep's territory is in both numbers. The SD of the differences might be $6,000 instead of $15,000, so the same effect becomes far easier to detect.</p>
<table class="data">
  <tr><th>Design</th><th>Groups are…</th><th>Analyze</th><th>Example</th></tr>
  <tr><td><strong>Independent samples</strong></td><td>Different, unrelated individuals</td><td>Two-sample t (difference of means)</td><td>Trained reps vs. other reps</td></tr>
  <tr><td><strong>Paired samples</strong></td><td>Same individuals measured twice, or matched pairs</td><td>One-sample t on the differences</td><td>Each rep before vs. after</td></tr>
</table>
<p>But pairing introduced a new problem: <strong>time</strong>. The "after" quarter was Q4, which is always the strongest quarter in software sales. Comparing before and after without a control group confounds the training with December. The best design combined both ideas: randomize reps to training or not, and measure everyone's <em>change</em> from Q3 to Q4. The control group's change shows how much December alone accounts for.</p>

<h2>What Summit learned</h2>
<p>The first slide deck wasn't lying, but it answered the wrong question. "Trained reps sell more" is a fact. "Training <em>caused</em> them to sell more" needs a design that rules out other explanations. Before trusting any comparison, ask: <strong>how were the groups formed, and what else is different between them?</strong></p>
`,
  takeaways: [
    "Observational studies show associations; only randomized experiments establish causation.",
    "A confounder is related to both the treatment and the outcome, so their effects get mixed together.",
    "Random assignment balances confounders, even unmeasured ones, on average.",
    "Independent samples → two-sample t. Paired samples → analyze the differences.",
    "Pairing removes individual-to-individual variation, often making real effects much easier to detect."
  ],
  myths: [
    { myth: "A big difference between groups proves the treatment worked.", truth: "Not if the groups differed beforehand (confounding) or the difference is within chance variation." },
    { myth: "Before/after data always prove an effect.", truth: "Something else may have changed over time (seasonality, the economy). You need a control group." },
    { myth: "Paired and two-sample tests are interchangeable.", truth: "The design determines the test. Using a two-sample test on paired data throws away the pairing and loses power." }
  ],
  quiz: [
    { q: "A study finds that companies with in-office gyms have 20% lower employee turnover. Why can't we conclude gyms reduce turnover?",
      options: ["The sample is too small", "It's observational: companies that build gyms may differ in pay, culture or profitability (confounders)", "Turnover can't be measured", "Gyms obviously reduce turnover"],
      answer: 1, why: "No one assigned gyms randomly. Wealthier, employee-focused companies are more likely to have gyms and to retain staff." },
    { q: "A store measures each of 25 cashiers' checkout speed before and after a new scanner. The right analysis is:",
      options: ["Two-sample t-test", "Paired t-test on each cashier's difference", "Chi-square test", "No test needed"],
      answer: 1, why: "Each cashier is measured twice, so the data are paired. Analyze the 25 differences as one sample." },
    { q: "What is the main purpose of random assignment in an experiment?",
      options: ["To make the sample represent the population", "To make treatment groups similar in every way except the treatment, on average", "To increase sample size", "To make the data normal"],
      answer: 1, why: "Random assignment balances confounders between groups, which supports cause-and-effect conclusions. (Random sampling, a different idea, supports generalizing to a population.)" },
    { q: "Why does pairing usually increase power?",
      options: ["It doubles the sample size", "It removes variation between individuals, so the standard error of the differences is smaller", "It makes the mean larger", "It eliminates Type I errors"],
      answer: 1, why: "Each subject serves as their own control. Large between-person differences cancel out, leaving a much smaller SD for the differences." }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "regression",
  unit: 9,
  topic: "Correlation & Regression",
  title: "The Marketing Budget That Was Really Following the Weather",
  dek: "A beverage company's ad spend and sales moved together almost perfectly. Correlation, slope, R², and why the regression line can't tell you what causes what.",
  minutes: 9,
  concepts: ["Scatterplots", "Correlation r", "Slope & intercept", "R²", "Residuals", "Extrapolation", "Lurking variables"],
  body: `
<p>Breeze Beverages, a sparkling-water brand, plotted 36 months of advertising spend against sales. The points formed a tight upward line. The regression output looked great: <strong>r = 0.80</strong>, slope = 3.2, R² = 0.64. The marketing director's pitch: "Every extra $1,000 in ads brings in $3,200 in sales. Let's double the budget."</p>
<p>The analyst asked one question before anyone signed off: <em>"When do we spend the most on ads?"</em> Answer: summer. <em>"And when do people drink the most sparkling water?"</em></p>

<h2>Correlation: strength and direction of a linear relationship</h2>
<p>The correlation coefficient <strong>r</strong> runs from −1 to +1. The sign gives the direction; the size gives how closely points cluster around a <em>straight line</em>. Key properties:</p>
<ul>
  <li>It has <strong>no units</strong>, and it doesn't change if you rescale (dollars → thousands of dollars).</li>
  <li>It only measures <strong>linear</strong> association. A perfect U-shaped relationship can have r ≈ 0.</li>
  <li>It's <strong>not resistant</strong>: one extreme point can create or destroy a strong r.</li>
  <li>It treats x and y the same: corr(ads, sales) = corr(sales, ads). So <strong>r alone can't show direction of cause</strong>.</li>
</ul>
<p>Always <strong>plot the data first</strong>. Datasets with identical r values can look completely different: curved, clustered, or driven by one outlier.</p>

<h2>The regression line: predicting y from x</h2>
<p>Regression fits the line ŷ = b₀ + b₁x that makes the <strong>sum of squared residuals</strong> as small as possible (the <strong>least-squares</strong> line). A <strong>residual</strong> is actual − predicted: how far a point sits above or below the line.</p>
<p>Interpreting Breeze's output correctly:</p>
<ul>
  <li><strong>Slope (3.2):</strong> "For each additional $1,000 in monthly ad spend, monthly sales are <em>predicted</em> to be $3,200 higher, on average." That's an <em>association</em> in the data, not a promise about what happens if you change ads.</li>
  <li><strong>Intercept:</strong> predicted sales when ad spend is 0. That's only meaningful if x = 0 is within, or near, the observed data. Breeze never had a $0 month, so the intercept just anchors the line.</li>
  <li><strong>R² = 0.64:</strong> 64% of the <em>variation</em> in monthly sales is accounted for by the linear relationship with ad spend. The other 36% is everything else. (For simple regression, R² is literally r².)</li>
</ul>
<div class="callout"><strong>Theory rule:</strong> Regression describes how y tends to change <em>as x differs</em> in the observed data. It does <strong>not</strong>, by itself, tell you what happens if you <em>intervene</em> and change x. That requires an experiment or a design that rules out confounders.</div>

<h2>The lurking variable: temperature</h2>
<p>When the analyst added average monthly temperature to the model, the picture changed. Hot months had high sales <em>and</em> high ad spend, because the marketing team had always front-loaded budgets into summer. Temperature was a <strong>lurking variable</strong> driving both. After accounting for temperature, the ad-spend slope dropped from 3.2 to 0.9, and its confidence interval included values near zero.</p>
<p>The ads weren't useless, but most of the "effect" was the weather. Doubling the budget in January would not have doubled January sales. Breeze ran a real test instead: they randomly chose some cities to get extra ads for two months. The estimated return was about $1.10 per dollar. That's positive, but nothing like $3.20.</p>

<h2>Residuals tell you if the line is the right model</h2>
<p>A <strong>residual plot</strong> (residuals vs. x or vs. predicted values) should look like random scatter around zero. Patterns mean trouble: a <strong>curve</strong> means the relationship isn't linear; a <strong>fan shape</strong> means the spread changes with x, so predictions are less reliable at one end. Breeze's residuals showed a wave pattern repeating every 12 months, a sign of seasonality the model had missed.</p>

<h2>Don't extrapolate</h2>
<p>Breeze's ad spend had ranged from $20K to $90K per month. Predicting sales at $300K means using the line far outside the data. Nothing guarantees the relationship stays linear out there. Advertising has <strong>diminishing returns</strong>: eventually everyone has already seen the ad. <strong>Extrapolation</strong> assumes the pattern continues where you have no evidence it does.</p>
`,
  takeaways: [
    "r measures the strength and direction of a LINEAR relationship; always plot first.",
    "Slope = predicted change in y for a one-unit increase in x, on average. It describes association, not cause.",
    "R² = the share of variation in y accounted for by the linear model.",
    "Lurking (confounding) variables can create or inflate associations.",
    "Check residual plots for curves and fans; don't extrapolate beyond the range of the data."
  ],
  myths: [
    { myth: "A strong correlation proves x causes y.", truth: "A lurking variable may drive both, or the causation may run in reverse." },
    { myth: "r = 0 means there's no relationship.", truth: "It means no LINEAR relationship. Strong curved patterns can have r near 0." },
    { myth: "R² = 0.64 means the predictions are right 64% of the time.", truth: "It means 64% of the variation in y is accounted for by the model." },
    { myth: "The intercept always has a meaningful interpretation.", truth: "Only if x = 0 is realistic and within the range of the data." }
  ],
  quiz: [
    { q: "Across cities, the number of coffee shops and the number of car dealerships have r = 0.91. Most likely explanation?",
      options: ["Coffee shops attract car buyers", "Car dealerships cause coffee consumption", "City population is a lurking variable driving both", "The correlation is a calculation error"],
      answer: 2, why: "Bigger cities have more of almost every kind of business. Population drives both counts." },
    { q: "A regression of salary ($) on years of experience has slope 2,400. Best interpretation:",
      options: ["Each employee earns $2,400", "Each additional year of experience is associated with $2,400 higher predicted salary, on average", "Experience causes a $2,400 raise each year", "2,400 employees were studied"],
      answer: 1, why: "The slope is the predicted change in y per one-unit increase in x, on average. It's an association. Causal wording needs an experiment." },
    { q: "A residual plot shows a clear U-shaped curve. What does that mean?",
      options: ["The model fits perfectly", "A straight line is the wrong model; the relationship is curved", "There's no relationship", "R² must be 1"],
      answer: 1, why: "Residuals should be random scatter. A systematic curve means the linear model misses a nonlinear pattern." },
    { q: "Converting sales from dollars to thousands of dollars will change:",
      options: ["The correlation r", "R²", "The slope's numerical value", "None of these"],
      answer: 2, why: "r and R² have no units, so they don't change when you rescale. The slope's units are y-units per x-unit, so its number changes when y is rescaled." }
  ]
}

];
