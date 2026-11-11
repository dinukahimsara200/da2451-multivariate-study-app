# DA2451 Multivariate Methods in Business

# Lecture 01: Introduction to Multivariate Analysis

**A complete, first-principles teaching book**  
**Source:** *Lec1.pdf*, DA2451 – Multivariate Methods in Business, Semester 4 (2026), 20 PDF pages.  
**Audience:** Students meeting statistics, mathematical notation, matrices, and multivariate reasoning for the first time.  
**Format:** Self-contained Markdown with LaTeX mathematics and runnable R examples.

> **How this book relates to the lecture.** A section labeled **Lecture foundation** explains content explicitly introduced in *Lec1.pdf*, with the original PDF page number. A section labeled **Teaching extension** supplies prerequisite teaching, worked examples, clarifications, or additional analysis to make that material understandable. The extensions are **not** quotations or additional claims by the lecturer. Where the slides use abbreviated or potentially misleading wording, the book keeps the intended topic while stating the mathematically precise interpretation. References such as “PDF p. 12” mean the page number printed on the original 20-page PDF, not a page number in this Markdown file.

---

## Contents and learning route

1. [Before statistics: the language of data](#chapter-1-before-statistics-the-language-of-data)
2. [One variable, two variables, and many variables](#chapter-2-one-variable-two-variables-and-many-variables)
3. [Why multivariate analysis exists in the real world](#chapter-3-why-multivariate-analysis-exists-in-the-real-world)
4. [The questions multivariate methods can answer](#chapter-4-the-questions-multivariate-methods-can-answer)
5. [What kind of variable are we measuring?](#chapter-5-what-kind-of-variable-are-we-measuring)
6. [The four measurement scales](#chapter-6-the-four-measurement-scales)
7. [Rows, columns, arrays, and matrices](#chapter-7-rows-columns-arrays-and-matrices)
8. [Describing several variables with numbers](#chapter-8-describing-several-variables-with-numbers)
9. [Covariance and correlation from the ground up](#chapter-9-covariance-and-correlation-from-the-ground-up)
10. [Seeing multivariate data: exploratory graphs](#chapter-10-seeing-multivariate-data-exploratory-graphs)
11. [Learning R with the iris dataset](#chapter-11-learning-r-with-the-iris-dataset)
12. [Choosing a multivariate technique](#chapter-12-choosing-a-multivariate-technique)
13. [Distance: turning differences into geometry](#chapter-13-distance-turning-differences-into-geometry)
14. [Statistical distance when variables are independent](#chapter-14-statistical-distance-when-variables-are-independent)
15. [Correlated measurements and Mahalanobis distance](#chapter-15-correlated-measurements-and-mahalanobis-distance)
16. [General distance properties and limitations](#chapter-16-general-distance-properties-and-limitations)
17. [An integrated business case](#chapter-17-an-integrated-business-case)
18. [Guided practice and fully explained answers](#chapter-18-guided-practice-and-fully-explained-answers)
19. [Formula and notation companion](#chapter-19-formula-and-notation-companion)
20. [Source coverage and careful-reading notes](#chapter-20-source-coverage-and-careful-reading-notes)

### A quick map of the source

| Original PDF pages | What the lecture introduces | Where we teach it |
|---|---|---|
| 1–3 | Meaning, numbers of variables, applications, analytical goals | Chapters 1–4 |
| 3–4 | Qualitative and quantitative types; Stevens' scales | Chapters 5–6 |
| 4–5 | Observations as an array or matrix | Chapter 7 |
| 5–7 | Mean, variance, standard deviation, covariance, correlation; summary matrices | Chapters 8–9 |
| 7–9 | EDA, scatterplot matrices, parallel coordinates, stars, Chernoff faces | Chapter 10 |
| 9–13 | Iris data and its analysis using R | Chapter 11 |
| 13–15 | Six iris research questions and matching multivariate methods | Chapter 12 |
| 15–16 | Ordinary Euclidean distance | Chapter 13 |
| 16–18 | Statistical distance for independent measurements; circles vs ellipses | Chapter 14 |
| 18–20 | Correlation, coordinate rotation, the general statistical-distance expression, distance axioms | Chapters 15–16 |

---

# Chapter 1. Before statistics: the language of data

*Lecture foundation: definition of multivariate data and analysis, PDF p. 1. Teaching extension: the foundations below.*

## 1.1 Start with a very ordinary business situation

Imagine that you manage a small grocery store. Four customers visit today. You write down their names, how many times they visited this month, and how much they spent.

| Customer | Visits this month | Spending today (Rs.) |
|---|---:|---:|
| A | 1 | 2,000 |
| B | 2 | 4,000 |
| C | 3 | 4,000 |
| D | 4 | 6,000 |

You now have **data**: recorded information about the world. Data become useful when they answer a question: *Are frequent visitors also high spenders?* One number by itself cannot answer that question. You need to look at **how the two recorded characteristics change together**.

Before learning advanced techniques, give every part of the table a name.

- An **observation**, **case**, **item**, or **unit** is the thing you measured. Here it is one customer. In a different study it could be a company, product, country, loan, or flower.
- A **variable** is a characteristic that can take different values. “Visits this month” and “spending today” are variables. “Customer” is an identifier rather than a numerical measurement.
- A **value** is the recorded result for one variable on one case. The value 3 is customer C's number of visits.
- A **dataset** is an organized collection of cases and variables. Often it is a table.
- A **row** normally represents one case; a **column** normally represents one variable.
- **Analysis** means systematically inspecting data to understand patterns, quantify relationships, test ideas, or support decisions.

**Why this matters:** If you confuse a row with a variable, matrix notation, R commands, and even the research question become confusing. Always identify *what one row means* before analyzing a dataset.

## 1.2 What is statistics?

**Statistics** is the discipline of collecting, organizing, summarizing, and drawing reasoned conclusions from data while recognizing uncertainty.

It has two broad sides:

1. **Descriptive statistics** summarize the data you have. Example: “The average spending among these four customers is Rs. 4,000.”
2. **Inferential statistics** use a sample to learn about a larger population and acknowledge uncertainty. Example: “Based on a random sample of customers, average spending across all customers is estimated to be near Rs. 4,000.”

### Population, sample, parameter, and statistic

A **population** is the entire group about which you want to learn. A **sample** is the subset that you actually observe.

Suppose the store has 12,000 customers, but you study 300. The population is the 12,000 customers; the sample is the 300 studied customers. A numerical summary of the **population**, such as the true population mean spending, is a **parameter**. A numerical summary calculated from the **sample**, such as the sample average spending, is a **statistic**.

A statistic can change from sample to sample. That variability is one reason statistics needs the concept of randomness.

## 1.3 What does “random variable” mean?

The lecture says that multivariate data can be thought of as **realizations of several random variables for each unit** (PDF p. 1). The sentence sounds difficult, but its idea is simple.

Let $X$ represent the amount a randomly selected customer will spend on a future visit. Before choosing the customer, you do not know the amount. There are several possible values. $X$ is called a **random variable**: a rule that assigns a numerical outcome to a random situation.

Once a specific customer has been selected and you observe Rs. 2,000, that observed value is one **realization**, or actual outcome, of $X$.

If you also observe visits $V$, age $A$, and membership tenure $T$, the same customer contributes a bundle of measured values:

$$
(V,A,T,X)=(3,24,18,2000).
$$

This bundle is one **multivariate observation**. The four entries belong to the same customer, so the relationships between them are meaningful.

**Important distinction:** A variable is not random because the recording is careless. It is random because, before selecting a case or repeating the situation, we are uncertain which value will occur.

## 1.4 A miniature mathematics survival kit

You need not be fluent in mathematics to understand the lecture. You do need a few conventions.

| Symbol | Say it as | Example and meaning |
|---|---|---|
| $=$ | equals | $2+3=5$ |
| $\ne$ | is not equal to | $4\ne5$ |
| $\ge$ | greater than or equal to | $p\ge3$ means three or more variables |
| $\le$ | less than or equal to | $0\le r\le1$ would mean between zero and one, inclusive |
| $\sum$ | sum, or add them up | $\sum_{j=1}^{3}x_j=x_1+x_2+x_3$ |
| $x^2$ | x squared | $(-3)^2=9$ |
| $\sqrt{x}$ | square root of x | $\sqrt{9}=3$ |
| $(a-b)$ | a minus b | Difference between two values |
| $\bar{x}$ | x bar | Usually a sample average |
| $s^2$ | s squared | Often a sample variance |
| $\mathbf X$ | bold capital X | Here, a whole matrix of data |
| $\in$ | belongs to | $x\in\mathbb R$ means x is a real number |

A **subscript** is a small label that tells you *which* thing a symbol refers to. In $x_{jk}$, $j$ labels a case or row and $k$ labels a variable or column. We will use that notation later.

A **superscript** often means a power, as in $x^2$, but it can also be a label. Context matters.

### What is a model?

A **statistical model** is a simplified mathematical description of a pattern or process. For example,

$$
\text{Predicted spending}=1000+500\times\text{visits}
$$

is a simple model suggesting that customers with one additional visit tend to spend Rs. 500 more, within the setting being modeled. It is only an illustrative equation, **not a model estimated from the four customers above**.

A **model assumption** is a condition under which a method's conclusions are reliable. An **outlier** is an observation unusually far from the general pattern. These two terms reappear in exploratory data analysis.

### Check your intuition

A spreadsheet has 500 rows of employees and columns for salary, years of service, and department. What are the cases? Which columns are numerical measurements? Is department a measurement or a label? Hold these answers in mind as we proceed.

---

# Chapter 2. One variable, two variables, and many variables

*Lecture foundation: PDF p. 1. Teaching extensions: examples, graphical reasoning, and the distinction between association and causation.*

## 2.1 Univariate: study one characteristic

**Uni-** means **one**. A **univariate analysis** focuses on one variable at a time.

Question: “How much do customers spend?” You might use the four spending values 2, 4, 4, 6, measured in thousands of rupees.

Useful summaries include:

- **Mean:** total divided by number of observations, $(2+4+4+6)/4=4$.
- **Median:** middle of the sorted observations; with four values, $(4+4)/2=4$.
- **Mode:** most frequent value, which is 4.
- **Minimum and maximum:** 2 and 6.
- **Range:** $6-2=4$.
- **Quartiles:** markers that divide ordered data approximately into quarters.
- **Variance and standard deviation:** numerical measures of how spread out values are.
- **Frequency distribution:** how many observations fall in each category or interval.

A **histogram** groups numerical values into intervals and shows how frequently values occur. A **bar chart** is generally used to compare categories. A **pie chart** displays parts of a whole, although it is often less convenient than a bar chart for exact comparison. The lecture lists all three alongside numerical summaries.

A univariate analysis can answer whether spending is concentrated, broadly spread, skewed toward a few large purchases, or unusually variable. It cannot by itself tell you how spending relates to visits.

## 2.2 Bivariate: study the relationship between two characteristics

**Bi-** means **two**. A **bivariate analysis** looks at two variables together.

Take each customer's visits and spending together, rather than separately:

$$
(1,2),\ (2,4),\ (3,4),\ (4,6).
$$

Each pair refers to the same customer. If you draw a **scatterplot**, put visits on the horizontal $x$-axis and spending on the vertical $y$-axis, then place one dot for each customer. You would notice an upward pattern: higher visits are generally associated with higher spending.

The main bivariate questions include:

- Do the variables tend to move in the same direction?
- Do they tend to move in opposite directions?
- Is there little apparent relationship?
- Is the relationship approximately straight, curved, or different for different groups?
- Can one variable help predict another?

In some settings we call one variable the **explanatory**, **predictor**, or **independent** variable and another the **outcome**, **response**, or **dependent** variable. Here visits might be treated as a predictor of spending.

**Caution: association is not causation.** The lecture mentions causes as a type of question asked during bivariate analysis. However, two variables moving together do **not** by themselves establish that one causes the other. Perhaps loyal customers both visit more and spend more; perhaps promotions influence both. Establishing causation needs a research design and assumptions, not merely a scatterplot or correlation coefficient.

## 2.3 Multivariate: examine several characteristics simultaneously

**Multi-** means **many**. The introductory lecture uses **three or more variables** as its practical description of multivariate data (PDF p. 1). Suppose the store now records:

1. Number of visits.
2. Spending.
3. Age.
4. Discount received.
5. Loyalty membership duration.

We can ask a deeper question: “Is spending related to visits **after taking age, discounts, and membership duration into account**?”

A two-variable relationship might look strong but change when a third variable is considered. For example, both visits and spending might be larger among long-term members. The third variable helps explain part of the apparent first relationship.

The lecture names **regression analysis**, **path analysis**, **factor analysis**, and **multivariate analysis of variance (MANOVA)** as examples of multivariate methods. Different methods answer different questions; they are not interchangeable.

### A technical terminology note

In introductory teaching, it is convenient to say *univariate = one variable, bivariate = two, multivariate = three or more*, as the PDF does. In more specialized statistical literature, **multivariate** often means *several outcome variables analyzed jointly*, while **multivariable** may mean *one outcome predicted from several predictors*. This book follows the lecture's broad introductory language while pointing out the distinction so you are not confused by other textbooks.

## 2.4 A side-by-side decision guide

| Approach | Focus | Grocery-store question | Typical displays or methods |
|---|---|---|---|
| Univariate | One characteristic | What is the distribution of spending? | Mean, standard deviation, histogram |
| Bivariate | Two characteristics together | Are visits related to spending? | Scatterplot, covariance, correlation |
| Multivariate | Several characteristics jointly | Do visits, age, and discount jointly describe spending and customer groups? | Regression, clustering, PCA, MANOVA, etc. |

**Misconception to avoid:** A dataset with 50 columns does not automatically require a sophisticated method. The number of variables tells you what data exist. The **research question** tells you what analysis is suitable.

---

# Chapter 3. Why multivariate analysis exists in the real world

*Lecture foundation: examples on PDF pp. 1–2 and the discussion of large, complex modern datasets on p. 2. Teaching extensions: decision-focused interpretation.*

## 3.1 No single characteristic tells the whole story

Imagine hiring an employee using only the applicant's exam score. That score might matter, but practical performance could also depend on problem-solving skill, experience, communication, and the job itself. A single number rarely captures a complex real-world situation.

The lecture defines **multivariate analysis** broadly as an investigation into the **structure of interrelationships among multiple random variables** (p. 1). “Structure” asks how the variables connect and how their relationships can be described, explained, compressed, or used to make decisions.

## 3.2 Work through the lecture's five settings

### Example A: Political survey (PDF p. 1)

Imagine collecting ratings of a candidate's perceived honesty, competence, communication skill, leadership, and popularity. The question might be: *Which measured qualities are most strongly associated with popularity?*

The variables might overlap: respondents who rate leadership highly may also rate communication highly. A multivariate method can help investigate the overlap instead of treating every rating as completely independent.

The lecture frames this as a survey example, **not** as proof that a measured quality causes popularity. Survey findings may be affected by confounding factors and how respondents were sampled.

### Example B: General questionnaire (PDF p. 1)

For every person you collect age, gender, education, socioeconomic position, and opinions. Questions include whether opinions differ by educational level and whether demographic characteristics jointly help predict opinions.

An initial challenge is recognizing that some variables are numeric and others are categories. This affects which calculations make sense. We develop that distinction in Chapters 5–6.

### Example C: Medical follow-up study (PDF pp. 1–2)

Researchers record body weight, age, height, cholesterol, blood glucose, diet, and other characteristics in people without a diagnosed condition, then follow their later health outcomes. A key question is whether a combination of characteristics helps predict future disease.

The important design feature here is **time**: initial measurements are collected before the later outcome. Even so, an observational follow-up study does not automatically identify causes. Correlation, temporal ordering, confounding, and causal evidence are different ideas.

### Example D: Measurements of prehistoric skulls (PDF p. 2)

Researchers measure width, depth, height, circumference, eye-socket distance, and jaw length. They can ask which measurements tend to vary together or whether observations appear to form groups associated with eras or other known contexts.

A necessary modern research caution is that statistical clusters in physical measurements should **not** be interpreted automatically as biological “races” or meaningful human categories. A mathematical group is a feature of the data and method; scientific interpretation requires independent evidence and ethical care. The original lecture uses grouping as its example.

### Example E: Customer predictive analytics (PDF p. 2)

A company records age, loan characteristics, savings, credit score, interactions, purchases, and other behavioral information. It wants to understand **churn** (customers leaving), predict future purchases, and identify useful customer segments.

These are related but distinct tasks:

- **Churn prediction:** predict a known outcome, such as leaving within three months.
- **Purchase prediction:** estimate the likelihood of buying a new product.
- **Segmentation:** discover groups of customers with similar behavior, even when no group labels are provided.

The same dataset may support all three analyses, but each task needs different assumptions and evaluation methods. Sensitive customer information also raises privacy and fairness concerns.

## 3.3 Why there are so many variables now

The lecture notes that modern datasets may contain many measurements for every person, object, or transaction. Its examples include genetic expression measurements, direct marketing, online shopping, and online social networks (PDF p. 2).

This changes the analytical problem:

- **More information:** Many variables can reveal subtle patterns.
- **More redundancy:** Two measurements might tell almost the same story.
- **More noise:** Some columns add little reliable signal.
- **Harder visualization:** Human beings cannot directly see 20-dimensional space.
- **Risk of overfitting:** A model can fit chance peculiarities in observed data and fail on new data.
- **Greater computational need:** Matrices and efficient software become important.

The point of multivariate analysis is **not** simply “use as many variables as possible.” It is to extract relevant, defensible information from interacting measurements.

## 3.4 Turn a business question into an analysis plan

Start with these questions:

1. **What is one case?** A person? A loan? A store-month?
2. **Which variables are recorded?** Are they reliable and meaningful?
3. **What do I actually want to learn?** A difference, prediction, group, relationship, or compact representation?
4. **Is the answer already known for the observed cases?** If known, we may have labels for supervised learning. If unknown, unsupervised techniques may be appropriate.
5. **How would I recognize a useful result?** Prediction accuracy, interpretability, a clear group distinction, or an understandable summary?

This sequence is the bridge from real business problems to statistical techniques.

---

# Chapter 4. The questions multivariate methods can answer

*Lecture foundation: the three broad aims on PDF pp. 2–3. Teaching extension: an explicit framework, terminology, and illustrative examples.*

## 4.1 Dimension reduction: can a complicated description become simpler?

Imagine 30 customer satisfaction questions about service. Many questions may measure similar underlying experiences. The question becomes: “Can we describe most of the meaningful variation using fewer new variables?”

A dataset with $p$ variables is said to have **$p$ dimensions** in this mathematical sense. One dimension means one measured coordinate, not a physical dimension you must be able to see.

A **linear combination** means multiplying some variables by numbers and adding them. For instance,

$$
Z=0.6X_1+0.4X_2
$$

could combine two standardized ratings into one composite score. The numbers 0.6 and 0.4 are just an illustrative choice, not estimated from actual data.

The lecture introduces **principal component analysis (PCA)** as a method that constructs new variables, called **principal components**, that capture directions of variation in the original measurements.

**Why it helps:** Fewer dimensions may simplify visualization, reduce redundant information, and make later modeling easier.

**Key caution:** “Essential information” depends on the problem. A direction explaining little overall variation might still help predict a rare event. PCA does not know your eventual outcome unless you deliberately incorporate outcome information through another method.

## 4.2 Classification and prediction: the groups are known

Imagine a bank has historical customers already labeled **defaulted** or **did not default**. We know the group of each past case and want to build a rule for a future case.

A **label** is the known outcome or group attached to a training observation. Learning with such labels is called **supervised learning**.

The lecture introduces **discriminant analysis** for studying known groups and classifying new observations (PDF p. 2). It can:

1. Compare characteristics between groups.
2. Find combinations of variables that distinguish groups.
3. Use those combinations to classify a newly observed case.

A careful analyst checks whether classification works on **unseen** observations rather than claiming success merely because the original data can be separated.

**Prediction vs explanation:** A rule can be accurate at forecasting without proving why the outcome occurred. That is a fundamental distinction in business analytics.

## 4.3 Clustering: the groups are not known beforehand

Now suppose the bank has transaction behavior but **no segment labels**. Perhaps there are frequent digital shoppers, infrequent high-value buyers, and routine bill payers. We do not know whether these groups truly exist or how many there might be.

**Clustering** attempts to group observations that are **similar within groups** and **different between groups**. This is a classic form of **unsupervised learning**.

The definition of similarity matters enormously. Two customers may look similar in age but very different in their purchasing habits. Changing the chosen variables, scale, or distance metric can change the clusters.

Clustering does **not** discover an unquestionable natural truth. It produces a grouping under specific rules that must be checked for usefulness and stability.

## 4.4 Known groups versus unknown groups

| Question | Are the groups known in the training data? | Main lecture method | Typical output |
|---|---|---|---|
| “Which species is this flower?” | Yes | Discriminant analysis | Predicted species |
| “Are there naturally distinguishable flower groups?” | No | Cluster analysis | Proposed clusters |
| “Can four flower measurements be represented by two synthetic variables?” | Not needed | PCA | Principal-component scores |

The word **classification** is sometimes used informally to mean any grouping. In formal machine learning, it is best to distinguish **labeled classification** from **unlabeled clustering**.

## 4.5 A question to carry forward

Suppose you record household income, spending, savings, credit score, and debt. Which method should you use? You cannot answer until someone tells you the **goal**. Predicting loan default, finding households with similar financial profiles, and reducing redundant financial measurements are three different jobs using the same five columns.

---

# Chapter 5. What kind of variable are we measuring?

*Lecture foundation: categorical and numeric variables and their subtypes, PDF p. 3. Teaching extensions: how variable type affects statistical choices.*

## 5.1 The most important question before any formula

A spreadsheet cell may contain `5`, `Male`, `48000`, `A`, or `2026-01-01`. These entries cannot all be interpreted in the same way. Before calculating an average, you need to know **what the value represents**.

The lecture distinguishes two broad families:

- **Categorical (qualitative):** Values represent categories, labels, or ordered categories.
- **Numeric (quantitative):** Values represent measurable numerical amounts or counts.

A number can be used as a **code** for a category. This does not turn the underlying concept into a numerical quantity.

## 5.2 Nominal categorical variables: names without ranking

**Nominal** means that categories identify differences but have **no inherent order**.

Examples include blood group, product category, department, and preferred payment method. If products are coded as

$$
1=\text{Food},\quad2=\text{Clothing},\quad3=\text{Electronics},
$$

then computing $(1+2+3)/3=2$ does **not** establish that the “average” product category is clothing. The codes are labels, not quantities.

Appropriate summaries include **counts**, **percentages**, **mode**, **contingency tables**, and category-level comparisons. For a nominal variable, saying “category 3 is more than category 1” has no statistical meaning simply because $3>1$.

## 5.3 Ordinal categorical variables: rank without known spacing

**Ordinal** categories have a meaningful order. Examples from the lecture include education levels, socioeconomic position, and a five-level satisfaction response:

1. Extremely dislike
2. Dislike
3. Neutral
4. Like
5. Extremely like

You can say “Like” is more positive than “Neutral.” But can you confidently say that the psychological distance from 1 to 2 equals the distance from 4 to 5? **Not without an additional assumption.**

This matters because averaging coded responses or applying methods that assume equal numerical spacing can introduce an approximation. In practice, analysts sometimes treat multi-item or sufficiently informative rating scores as approximately interval-scaled, but that is a **modeling decision**, not a property automatically guaranteed by the labels.

Useful summaries often include category percentages, the median category, and distributions across ordered levels.

## 5.4 Discrete numeric variables: counts and separated possibilities

A **discrete** quantitative variable takes values from distinct possibilities. The simplest example is a count:

- Number of purchases: 0, 1, 2, 3, ...
- Number of employees: 8, 9, 10, ...
- Number of service complaints: 0, 1, 2, ...

A business cannot receive 2.4 **separate complaints** if complaints are being counted. Decimals might appear in averages of such counts, but not in the individual raw counts.

The lecture also lists judged competition scores as a discrete example, when the permitted score values are fixed in increments. Thus **discrete** does not always mean only whole numbers; it means values are separated rather than filling every possible value in an interval.

## 5.5 Continuous numeric variables: amounts on a scale

A **continuous** variable can conceptually take any real-valued measurement in a range, limited in practice by measurement precision.

Examples:

- Height: 168.25 cm.
- Weight: 62.7 kg.
- Delivery time: 18.43 minutes.
- Amount of water used: 3.17 liters.

A measurement entered as 62.7 kg does not become discrete in its underlying nature simply because the instrument rounds to one decimal place.

**Age** illustrates a useful subtlety. Age measured precisely as elapsed time is conceptually continuous. Age **recorded in completed years** takes whole-number values and is discrete as stored. The lecture uses age as a continuous quantity often rounded down (p. 3).

## 5.6 Metadata: the instruction manual for your columns

**Metadata** literally means *data about data*. It should tell you what each column means and how its values were recorded.

Consider `Satisfaction = 4`. Without metadata, you do not know whether 4 means “Like,” “Dislike,” a four-point maximum, or something else.

A useful **data dictionary** might be:

| Column | Meaning | Type | Allowed values | Units / notes |
|---|---|---|---|---|
| `CustomerID` | Identifier | Nominal | Unique strings | Not a quantitative predictor by itself |
| `Spend` | Total purchase value | Numeric, usually continuous | Nonnegative | Rs. |
| `Visits` | Store visits in month | Numeric, discrete | 0, 1, 2, ... | Count |
| `Segment` | Marketing category | Nominal | A, B, C | Internal labels |
| `Satisfaction` | Ordered rating | Ordinal | 1–5 | 1 = very dissatisfied, 5 = very satisfied |
| `Tenure` | Time as member | Numeric, continuous or rounded | Nonnegative | Months |

The dictionary protects against incorrect analysis, inconsistent coding, and confusing output.

## 5.7 A practical classification exercise

Classify each variable **as recorded**, not merely as it might exist in theory:

| Column | Possible data | Best initial classification | Reason |
|---|---|---|---|
| `PaymentMethod` | Cash, card, transfer | Nominal | Names without rank |
| `ServiceRating` | Poor, fair, good, excellent | Ordinal | Ordered, unknown intervals |
| `BranchesVisited` | 0, 1, 2, 3 | Discrete numeric | Count |
| `DeliveryMinutes` | 11.3, 14.8, 9.1 | Continuous numeric | Duration |
| `ZipCode` | 00100, 00200 | Nominal identifier | Arithmetic on codes is meaningless |
| `MonthNumber` | 1–12 | Temporal/category or indexed variable | Needs context; 12 and 1 are adjacent in a cycle |

**Common mistake:** Feeding numerical codes such as 1, 2, 3 for nominal departments into a distance formula as though the differences were meaningful. The computer may calculate a result, but the interpretation is invalid.

---

# Chapter 6. The four measurement scales

*Lecture foundation: Stevens' nominal, ordinal, interval, and ratio classification, PDF p. 4. The lecture credits Stevens (1966); the formal bibliographic note is preserved in Chapter 20. Teaching extensions: allowable comparisons and practical pitfalls.*

## 6.1 Why measurement scale is different from storage type

“Numeric” answers whether values look like quantities. **Measurement scale** answers what mathematical comparisons the numbers actually support.

The lecture introduces four scales, often arranged from fewer to more numerical properties:

$$
\text{Nominal}\ \longrightarrow\ \text{Ordinal}\ \longrightarrow\ \text{Interval}\ \longrightarrow\ \text{Ratio}.
$$

Do not interpret this diagram as saying one scale is universally better. A blood group is correctly measured nominally; it would be wrong to invent a quantitative blood-group score simply to use more calculations.

## 6.2 Nominal: same or different?

At the nominal level, the meaningful comparison is whether two observations have the **same label**.

Example: “Department A” and “Department B” identify different departments. No statement about how much greater one is than another follows.

Renaming categories does not change the information: A/B/C could just as well be 7/3/9.

## 6.3 Ordinal: which comes earlier or higher?

Ordinal values support **ranking**. Suppose stores are rated “low,” “medium,” or “high” risk.

You may say high risk is ranked above medium risk. You do **not** automatically know how many times riskier it is, nor that the step from low to medium is exactly the same as medium to high.

A response “4” on a five-point satisfaction item is best read as the **fourth ordered category** until a stronger measurement assumption is justified.

## 6.4 Interval: meaningful differences, but zero is not absolute

An **interval** scale has meaningful **equal differences**. For temperatures measured in degrees Celsius:

$$
30^\circ\mathrm C-20^\circ\mathrm C=10^\circ\mathrm C
$$

and

$$
20^\circ\mathrm C-10^\circ\mathrm C=10^\circ\mathrm C.
$$

The differences are equal. But $20^\circ$C is **not twice as hot** in an absolute physical sense as $10^\circ$C. The zero of Celsius is a conventional point, not absence of thermal energy. The lecture uses **Fahrenheit temperatures** and **calendar dates** as interval examples (p. 4).

Why calendar dates? The elapsed time from one day to the next has a consistent meaning, but the calendar's choice of year numbering is conventional. Statements like “year 2000 is twice year 1000” are meaningless as ratios of dates.

## 6.5 Ratio: meaningful differences and a genuine zero

A **ratio** scale has interval properties **and a meaningful zero** representing absence of the measured quantity.

If one parcel weighs 20 kg and another weighs 10 kg, the first weighs **twice as much**. If distance is 0 meters, no distance has been traveled. If revenue is Rs. 0, no revenue was recorded during that period.

Typical ratio examples are height, weight, duration, distance, and nonnegative sales amounts. Temperature on an **absolute Kelvin scale** is ratio-scaled in thermodynamics; ordinary Celsius and Fahrenheit readings are not.

The lecture uses height as its ratio example and emphasizes that changing from centimeters to inches preserves the natural zero (p. 4).

## 6.6 The comparison that students usually need

| Scale | Recognize equality? | Rank values? | Differences meaningful? | Ratios such as “twice as much” meaningful? | Example |
|---|---|---|---|---|---|
| Nominal | Yes | No | No | No | Blood group |
| Ordinal | Yes | Yes | Not guaranteed | No | Satisfaction level |
| Interval | Yes | Yes | Yes | No | Celsius temperature |
| Ratio | Yes | Yes | Yes | Yes | Weight in kg |

### One scenario to test all four

A company records a worker's `(department, performance rating, calendar joining year, salary)`:

- **Department:** nominal.
- **Performance rating 1–5:** usually ordinal as an individual item.
- **Joining year:** interval as a date-based quantity; differences in years make sense, ratios of year numbers do not.
- **Salary:** ratio in the ordinary positive-amount interpretation; zero denotes no salary amount.

**Teaching extension:** In applied analysis, the choice of statistical method may depend on the distribution, sample size, sampling design, and modeling assumptions as well as scale. The four-scale classification is a powerful starting point, not an automatic algorithm for choosing every test.

---

# Chapter 7. Rows, columns, arrays, and matrices

*Lecture foundation: arrays and the $n\times p$ matrix, PDF pp. 4–5. Teaching extensions: a concrete matrix, vectors, indexing, and connection to R.*

## 7.1 Why organize measurements as a rectangle?

Consider a customer table with three customers and three measurements:

| Customer | Age (years) | Visits | Spending (Rs. thousands) |
|---|---:|---:|---:|
| A | 20 | 3 | 5 |
| B | 25 | 4 | 8 |
| C | 30 | 2 | 6 |

If we focus on the measured numbers, we can write the whole table as:

$$
\mathbf X=
\begin{bmatrix}
20 & 3 & 5\\
25 & 4 & 8\\
30 & 2 & 6
\end{bmatrix}.
$$

This is a **matrix**: a rectangular arrangement of numbers in rows and columns. An **array** is a broader term for an organized collection of entries; the lecture uses “rectangular array” and “matrix” together for this two-dimensional structure.

The letter $\mathbf X$ names the entire matrix, not one value. This matrix has **three rows and three columns**, so its **dimension (shape)** is $3\times3$.

## 7.2 Understanding $n$, $p$, $j$, and $k$

The lecture writes a general data matrix with:

- $n$ = number of **observations**, cases, or rows.
- $p$ = number of **variables**, columns, or measured characteristics.
- $j$ = a row number, from $1$ through $n$.
- $k$ = a column number, from $1$ through $p$.
- $x_{jk}$ = the value in **row $j$**, **column $k$**.

In the example,

$$
x_{21}=25,\qquad x_{23}=8,\qquad x_{32}=2.
$$

Read $x_{23}=8$ as: the **second customer**, **third variable** (spending), has value 8.

The lecturer's general matrix on PDF p. 5 is:

$$
\mathbf X=
\begin{bmatrix}
x_{11}&x_{12}&\cdots&x_{1p}\\
x_{21}&x_{22}&\cdots&x_{2p}\\
\vdots&\vdots&\ddots&\vdots\\
x_{n1}&x_{n2}&\cdots&x_{np}
\end{bmatrix}_{n\times p}.
$$

The horizontal dots $\cdots$ mean “more columns follow”; the vertical dots $\vdots$ mean “more rows follow.” Neither set of dots is actual observed data.

**Important:** There are usually $np$ entries in an $n\times p$ numerical matrix, because there are $p$ measured values for each of $n$ cases. The symbols $n$ and $p$ do not themselves denote any particular measurement.

## 7.3 Rows as complete cases; columns as variables

The **second row** of the example matrix is:

$$
\begin{bmatrix}25&4&8\end{bmatrix}.
$$

It describes customer B. The **second column** is:

$$
\begin{bmatrix}3\\4\\2\end{bmatrix}.
$$

It contains all observed visit counts. A row or column arranged as a one-dimensional collection of numbers is a **vector**.

A **row vector** is horizontal. A **column vector** is vertical. That distinction matters because matrix operations are sensitive to shapes.

## 7.4 Why matrices make multivariate statistics possible

The lecture gives two advantages (PDF p. 5):

1. We can describe many calculations as **matrix operations** rather than writing one formula for every pair of variables.
2. Computers can perform those operations efficiently using statistical software.

Imagine 100 variables. There are

$$
\binom{100}{2}=\frac{100\cdot99}{2}=4950
$$

**distinct unordered pairs** of variables. The combination symbol $\binom{100}{2}$ means “choose two out of 100 without caring about the order.” Computing correlations manually for 4,950 pairs would be exhausting; a correlation matrix can organize them together.

## 7.5 A necessary practical qualification: mixed-type datasets

A business table can contain both numbers and categories. An R **data frame** can store these different column types. An ordinary numeric matrix is normally used for the **numeric portion** of such data, or after categorical variables are deliberately encoded appropriately.

Do not force `Department = Marketing` into a numeric matrix by arbitrarily assigning a magnitude to “Marketing.” Encoding categories is a separate modeling decision.

## 7.6 Matrix creation in R (teaching extension)

```r
X <- matrix(c(20, 25, 30,
              3,  4,  2,
              5,  8,  6),
            nrow = 3, ncol = 3)
colnames(X) <- c("Age", "Visits", "SpendingThousands")
rownames(X) <- c("A", "B", "C")

X
nrow(X)        # Number of observations: 3
ncol(X)        # Number of variables: 3
dim(X)         # Matrix dimensions: 3 3
X[2, 3]       # Row 2, column 3: 8
X[, 2]        # The complete Visits column
X[2, ]        # The complete second observation
```

Read `X[2, 3]` as “from matrix X, give me row 2, column 3.” R counts indices from **1**, not from 0.

**Watch out:** By default, R's `matrix()` fills entries **column by column**. That is why the code lists all ages first, then all visits, then all spending amounts. An alternative is to supply the data row by row and use `byrow = TRUE`.

---

# Chapter 8. Describing several variables with numbers

*Lecture foundation: mean, variance, standard deviation, and their matrix organization, PDF pp. 5–6. Teaching extensions: all arithmetic steps, units, and interpretation.*

## 8.1 A four-customer dataset we will use repeatedly

To understand the equations without getting lost in arithmetic, use a tiny dataset. We record **visits** and **spending in tens of currency units**, so an entry of 2 in spending means 20 currency units.

| Customer $j$ | Visits $x_{j1}$ | Spending, tens $x_{j2}$ |
|---|---:|---:|
| 1 | 1 | 2 |
| 2 | 2 | 4 |
| 3 | 3 | 4 |
| 4 | 4 | 6 |

Here:

$$
n=4,\quad p=2,\quad
\mathbf X=\begin{bmatrix}1&2\\2&4\\3&4\\4&6\end{bmatrix}.
$$

We use small values so each calculation is visible. Real datasets work exactly the same way, just with many more rows and columns.

## 8.2 Sample mean: a balance point

Imagine placing the observations as weights on a number line. The **mean** is their numerical balance point: values below and above it balance when their deviations are added together.

The lecture writes the sample mean for variable $k$ as:

$$
\boxed{\bar x_k=\frac{1}{n}\sum_{j=1}^{n}x_{jk}},
\qquad k=1,2,\ldots,p.
$$

### Read the symbols slowly

- $\bar x_k$ is the **sample average of variable $k$**.
- $n$ is the number of observations.
- $\sum$ means **add**.
- $j=1$ below $\sum$ means start at the first row.
- $n$ above $\sum$ means continue through the last row.
- $x_{jk}$ is the value in row $j$ for variable $k$.
- $1/n$ means divide the total by the number of observations.

### Calculate both means

For visits:

$$
\bar x_1=\frac{1+2+3+4}{4}=\frac{10}{4}=\boxed{2.5}.
$$

For spending:

$$
\bar x_2=\frac{2+4+4+6}{4}=\frac{16}{4}=\boxed{4}.
$$

Because the dataset has $p=2$ measured variables, there are **two means**, not one combined mean for all eight numbers. Their units are different.

## 8.3 The mean vector

Instead of writing two means separately, stack them:

$$
\bar{\mathbf x}=
\begin{bmatrix}\bar x_1\\\bar x_2\end{bmatrix}=
\begin{bmatrix}2.5\\4\end{bmatrix}.
$$

This is the **sample mean vector**. In the lecture's general notation (PDF p. 6), it is a $p\times1$ vector. The first entry is the average of the first variable; the second entry is the average of the second variable, and so on.

## 8.4 Why we need spread as well as average

Two stores can have the same average daily sales but different stability:

- Store A's four daily totals: 39, 40, 40, 41.
- Store B's four daily totals: 10, 20, 50, 80.

Both average 40. Store B's values fluctuate much more. A mean alone hides that difference.

A **deviation from the mean** is:

$$
x_{jk}-\bar x_k.
$$

Positive deviations are above average; negative deviations are below average. If you simply add all deviations for a variable, you get zero. To measure spread, the usual variance formula **squares** each deviation before adding.

## 8.5 Sample variance: average squared deviation, adjusted for sampling

The lecture gives the sample variance of variable $k$ as:

$$
\boxed{s_{kk}=s_k^2=\frac{1}{n-1}\sum_{j=1}^{n}(x_{jk}-\bar x_k)^2}.
$$

The notation $s_{kk}$ will become useful when we build the covariance matrix. For now, it means the same thing as **sample variance of variable $k$**.

**Symbol guide:**

- $s_k^2$ is sample variance.
- $(x_{jk}-\bar x_k)$ is the deviation from the mean.
- The superscript $2$ squares that deviation.
- $\sum$ adds the squared deviations over all cases.
- $n-1$ is the sample-variance denominator.

### Calculate variance of visits, line by line

The visit values are $1,2,3,4$ with mean 2.5:

| Visits | Minus mean | Deviation squared |
|---:|---:|---:|
| 1 | $1-2.5=-1.5$ | 2.25 |
| 2 | $2-2.5=-0.5$ | 0.25 |
| 3 | $3-2.5=0.5$ | 0.25 |
| 4 | $4-2.5=1.5$ | 2.25 |
| **Total** | **0** | **5.00** |

Therefore:

$$
s_{11}=\frac{5}{4-1}=\boxed{\frac53\approx1.667}.
$$

### Calculate variance of spending

Spending values are $2,4,4,6$ with mean 4:

| Spending | Minus mean | Deviation squared |
|---:|---:|---:|
| 2 | $2-4=-2$ | 4 |
| 4 | $4-4=0$ | 0 |
| 4 | $4-4=0$ | 0 |
| 6 | $6-4=2$ | 4 |
| **Total** | **0** | **8** |

Therefore:

$$
s_{22}=\frac{8}{4-1}=\boxed{\frac83\approx2.667}.
$$

### Why divide by $n-1$ rather than $n$?

When a sample mean is estimated from the same observations, the deviations are constrained to sum to zero. Once $n-1$ deviations are known, the last one is determined. We say that there are **$n-1$ degrees of freedom** left for estimating variability.

Using $n-1$ produces the familiar **unbiased estimator of the population variance** under standard random-sampling assumptions. If you are describing a complete finite population, the population variance convention instead uses the population size $N$ in its denominator. Do not mechanically replace every denominator with $n-1$ regardless of what quantity is being defined.

## 8.6 Sample standard deviation: spread back in original units

Variance squares the units. If visits are counted in visits, variance has units of **visits squared**. To obtain a measure interpretable in the original units, take the square root:

$$
\boxed{s_k=\sqrt{s_{kk}}}.
$$

For visits:

$$
s_1=\sqrt{\frac53}\approx\boxed{1.291\text{ visits}}.
$$

For spending:

$$
s_2=\sqrt{\frac83}\approx\boxed{1.633\text{ tens of currency units}}.
$$

Interpret a standard deviation as a typical scale of variation around the mean, not as a guarantee that every observation lies within exactly one standard deviation of it.

## 8.7 Mean, median, and mode do different jobs

Recall the lecture's p. 1 list of central-tendency measures:

- **Mean:** numerical average; sensitive to extreme values.
- **Median:** central value when observations are ordered; comparatively resistant to extreme values.
- **Mode:** most common observed value; meaningful even for categorical data.

For daily revenue $10,12,12,14,100$, the mean is $29.6$, but the median and mode are both 12. The unusually large day pulls the mean upward. This is why a good exploratory analysis typically looks at more than one summary.

## 8.8 Range, quartiles, and the interquartile range

The **range** is:

$$
\text{Range}=\text{maximum}-\text{minimum}.
$$

The **first quartile** $Q_1$ is approximately the 25th percentile, and the **third quartile** $Q_3$ is approximately the 75th percentile. The **interquartile range (IQR)** is:

$$
\mathrm{IQR}=Q_3-Q_1.
$$

It describes the spread of the middle half of the data. Quartiles have several precise computational conventions; two software packages can occasionally give slightly different quartiles for a tiny dataset without either being inherently mistaken. In the R walkthrough, we use R's results consistently.

---

# Chapter 9. Covariance and correlation from the ground up

*Lecture foundation: covariance, Pearson correlation, mean/covariance/correlation matrices, and symmetry, PDF pp. 6–7. Teaching extensions: full hand calculations, interpretation, and mathematical caveats.*

## 9.1 A different kind of question: do variables change together?

Variance tells us how much **one** variable varies. It does not say whether two variables tend to be high or low **at the same time**.

In our customer dataset, larger visit numbers often go with larger spending amounts. We want a number that registers this **joint movement**.

### Build the sign intuition first

Suppose a customer's visits are above the average.

- If spending is **also above average**, both deviations are positive; their product is positive.
- If visits and spending are **both below average**, both deviations are negative; their product is again positive.
- If one is above average but the other below, their product is negative.

When these deviation products are mostly positive, the variables tend to move together. When mostly negative, they tend to move oppositely. That is the reasoning behind **covariance**.

## 9.2 The sample covariance formula

For variables $i$ and $k$, the lecture uses:

$$
\boxed{s_{ik}=\frac{1}{n-1}\sum_{j=1}^{n}(x_{ji}-\bar x_i)(x_{jk}-\bar x_k)}.
$$

Read it as: *for each case, find each variable's deviation from its own mean; multiply the two deviations; add across cases; divide by $n-1$.*

- $i$ identifies the first variable.
- $k$ identifies the second variable.
- $j$ identifies a case or row.
- $s_{ik}$ is sample covariance.

The variables **may be different** ($i\ne k$) or the same ($i=k$). If they are the same, the product becomes a squared deviation, giving the ordinary variance. The lecture also observes that $s_{ik}=s_{ki}$.

## 9.3 Calculate covariance by hand

Take the two customer variables again:

$$
\bar x_1=2.5,\qquad\bar x_2=4.
$$

| Customer | Visits | Spending | Visits deviation | Spending deviation | Product |
|---|---:|---:|---:|---:|---:|
| 1 | 1 | 2 | $-1.5$ | $-2$ | $+3$ |
| 2 | 2 | 4 | $-0.5$ | $0$ | $0$ |
| 3 | 3 | 4 | $+0.5$ | $0$ | $0$ |
| 4 | 4 | 6 | $+1.5$ | $+2$ | $+3$ |
| **Sum** | | | | | **6** |

Then:

$$
s_{12}=\frac{6}{4-1}=\boxed{2}.
$$

The positive sign tells us the variables tend to move together in this sample.

### What does covariance 2 mean?

It is a positive joint-deviation measure with units **visits × tens of currency units**. It is *not* “two extra currency units per visit” and is *not* a percentage. Unlike correlation, the magnitude of covariance changes if we change units.

For example, if we convert spending from tens of units to single units by multiplying by 10, the covariance becomes $20$ even though the underlying relationship does not change. That is why correlation is often more convenient for describing strength.

## 9.4 Covariance reduces to variance

Put $i=k=1$ in the covariance formula:

$$
s_{11}=\frac{1}{n-1}\sum_{j=1}^{n}(x_{j1}-\bar x_1)(x_{j1}-\bar x_1)
=\frac{1}{n-1}\sum_{j=1}^{n}(x_{j1}-\bar x_1)^2.
$$

That is exactly the variance of visits. This single formula therefore contains **both** one-variable spread and two-variable joint movement.

## 9.5 The covariance matrix $\mathbf S$

When there are two variables, collect their variances and covariance in a square matrix:

$$
\boxed{
\mathbf S=\begin{bmatrix}
s_{11}&s_{12}\\
s_{21}&s_{22}
\end{bmatrix}
=\begin{bmatrix}
\tfrac53&2\\
2&\tfrac83
\end{bmatrix}.}
$$

The **diagonal entries** are variances. The **off-diagonal entries** are covariances. The matrix is **symmetric**: reflecting it across its main diagonal leaves it unchanged because $s_{12}=s_{21}$.

For $p$ variables, $\mathbf S$ is a $p\times p$ matrix. You do not need to calculate hundreds of separate values by hand; R can calculate the entire matrix.

## 9.6 Pearson correlation: put the joint movement on a common scale

The **Pearson sample correlation coefficient** for variables $i$ and $k$ is:

$$
\boxed{r_{ik}=\frac{s_{ik}}{\sqrt{s_{ii}}\sqrt{s_{kk}}}
=\frac{s_{ik}}{s_i s_k}}.
$$

Here $s_i=\sqrt{s_{ii}}$ and $s_k=\sqrt{s_{kk}}$ are the sample standard deviations.

Why divide by these? We are standardizing the covariance by the separate scales of the two variables. This removes the original measurement units.

An equivalent formula from the lecture is:

$$
\boxed{
 r_{ik}=\frac{\sum_{j=1}^{n}(x_{ji}-\bar x_i)(x_{jk}-\bar x_k)}
 {\sqrt{\sum_{j=1}^{n}(x_{ji}-\bar x_i)^2}\,
  \sqrt{\sum_{j=1}^{n}(x_{jk}-\bar x_k)^2}}
}.
$$

Notice that the $n-1$ factors cancel, so the second expression has no explicit denominator $n-1$.

## 9.7 Calculate Pearson correlation in our customer example

We already know:

$$
s_{12}=2,\qquad s_{11}=\frac53,\qquad s_{22}=\frac83.
$$

Substitute into the formula:

$$
\begin{aligned}
r_{12}&=\frac{2}{\sqrt{5/3}\sqrt{8/3}}\\[4pt]
&=\frac{2}{\sqrt{40/9}}\\[4pt]
&=\frac{6}{\sqrt{40}}\\[4pt]
&\approx\boxed{0.9487}.
\end{aligned}
$$

Interpretation: in this **tiny four-customer sample**, visits and spending have a **strong positive linear relationship**. It does **not** imply that increasing a customer's visits by one mechanically causes spending to increase by a fixed amount.

## 9.8 What values of $r$ mean

Pearson correlation obeys:

$$
\boxed{-1\le r\le+1}.
$$

| Correlation | Meaning |
|---:|---|
| $+1$ | Perfect increasing **straight-line** relationship |
| Near $+1$ | Strong positive linear association |
| Near $0$ | Little or no **linear** association |
| Near $-1$ | Strong negative linear association |
| $-1$ | Perfect decreasing **straight-line** relationship |

These are directions and qualitative descriptions; there are no universal boundaries such as “0.7 always means strong” that work across every field.

**Critical misconception:** $r\approx0$ does **not** mean two variables are unrelated. A clear **curved** relationship can have a Pearson correlation near zero. Always inspect the scatterplot.

**Another misconception:** The sign of correlation says nothing about whether a relationship is good or bad. A negative correlation between delivery time and customer satisfaction may be desirable to understand, but “negative” itself describes direction, not value judgment.

## 9.9 The correlation matrix $\mathbf R$

The lecture organizes all pairwise correlations as:

$$
\boxed{\mathbf R=
\begin{bmatrix}
1&r_{12}&\cdots&r_{1p}\\
r_{21}&1&\cdots&r_{2p}\\
\vdots&\vdots&\ddots&\vdots\\
r_{p1}&r_{p2}&\cdots&1
\end{bmatrix}.}
$$

Every variable is perfectly correlated with **itself**, so each diagonal entry is 1, provided its variance is positive. Since $r_{ik}=r_{ki}$, $\mathbf R$ is also symmetric.

For our example:

$$
\mathbf R\approx
\begin{bmatrix}
1&0.9487\\
0.9487&1
\end{bmatrix}.
$$

### One important exception

If a numeric variable is **constant** for every observation, its sample variance and standard deviation are zero. The usual Pearson correlation for that variable is **undefined**, because the formula divides by zero. A valid correlation matrix of nonconstant variables has ones on its diagonal; real software may output `NA` when a constant column is included.

## 9.10 Verify the arithmetic with R

```r
customers <- data.frame(
  Visits = c(1, 2, 3, 4),
  SpendingTens = c(2, 4, 4, 6)
)

colMeans(customers) # 2.5 and 4
var(customers)      # Variance-covariance matrix
cov(customers)      # Same matrix for these numeric columns
cor(customers)      # Correlation matrix
sd(customers$Visits)
sd(customers$SpendingTens)
```

**Interpretation:** `var(customers)` puts the two sample variances on the diagonal and covariance 2 off the diagonal. `cor(customers)` replaces those unit-dependent quantities with standardized, unit-free correlations.

## 9.11 Two facts that will matter for distance

First, a high variance says a variable is naturally spread across a larger range. Second, a high covariance or correlation says two variables tend to move **together**. Later, when calculating whether an observation is unusually far from a typical profile, we should take **both** facts into account. This is the central motivation for Mahalanobis distance in the last section of the lecture.

---

# Chapter 10. Seeing multivariate data: exploratory graphs

*Lecture foundation: exploratory data analysis, scatterplot matrices, parallel coordinate plots, star plots, and Chernoff faces, PDF pp. 7–9. Teaching extensions: guided figure reading and plotting limitations.*

## 10.1 Why graphs come before sophisticated models

**Exploratory Data Analysis (EDA)** means examining data to understand their shape, quality, unusual values, and relationships before drawing major conclusions.

The lecture explicitly gives four purposes for graphical exploration (PDF p. 7):

1. **Suggest a plausible model:** Is a straight-line model plausible, or is the pattern curved?
2. **Assess assumptions:** Does the spread look similar in different groups? Are there obvious departures from expected shapes?
3. **Detect outliers:** Are a few observations far from the rest?
4. **Suggest transformations:** Might a mathematical change such as a logarithm make highly skewed positive measurements easier to analyze?

A **transformation** replaces a recorded value $x$ with a systematically changed value such as $\log(x)$ or $\sqrt{x}$, for a defensible reason. This does not magically repair poor data, and its appropriateness depends on the original scale and model. A logarithm is generally only directly defined over positive real inputs, so zero and negative values require special consideration.

## 10.2 Histograms: see one distribution

For a single variable, such as customer spending, split its possible values into intervals (often called **bins**). A histogram's bar heights show how many observations lie in each interval.

It can reveal:

- A roughly symmetric distribution.
- A **right-skewed** distribution, with a longer tail toward large values.
- Several peaks, suggesting multiple subgroups.
- Unusually faraway observations.

Two important details: the chosen bin width can alter the appearance, and the histogram shows only **one variable** at a time.

## 10.3 Scatterplots: see two variables at once

A scatterplot places one observation as a point $(x,y)$ in a two-dimensional plane.

For example, a plot of height against weight may show an upward association. A plot of price against demand may show a downward association, perhaps with curvature. Points may form separate groups, or the variability may grow with the x-coordinate.

Look for **direction**, **form**, **strength**, **outliers**, and possible **groups**. Do not infer that a cloud's upward shape automatically proves causation.

## 10.4 Scatterplot matrices: many two-variable views

The lecture's **Figure 1 (PDF p. 7)** is a **scatterplot matrix** for the classic iris flower dataset. Its four numerical variables are:

- `Sepal.Length`: length of the sepal.
- `Sepal.Width`: width of the sepal.
- `Petal.Length`: length of the petal.
- `Petal.Width`: width of the petal.

A **sepal** is an outer floral structure, and a **petal** is part of the inner, typically more visibly colored floral structure. The species label identifies which of three iris types was measured.

In a scatterplot matrix, the same variables are used across rows and columns. Each off-diagonal panel draws one variable against another. The diagonal names or otherwise represents the individual variables. Four variables give a $4\times4$ arrangement with 16 panel positions, including the diagonal and mirrored relationships.

### How to read Figure 1

Start by finding the `Petal.Length` and `Petal.Width` panel. The points rise strongly together. This suggests that flowers with longer petals usually have wider petals. Next, look at the colored point clouds. The three colors distinguish species: the original lecture figure uses black for **setosa**, red/pink for **versicolor**, and green for **virginica**.

You can see that species occupy different regions of several pairwise plots. That is a clue that combining measurements may help classify flowers.

**Do not claim more than the picture says.** Visual separation in two dimensions does not guarantee perfect classification for every new flower.

### A fundamental limitation

The lecture notes that pairwise plots can **miss relationships involving three or more variables simultaneously** (PDF p. 8). Imagine a rule depending on a combination such as $X_1+X_2-X_3$. No single pairwise plot necessarily reveals that rule clearly.

Also, a scatterplot matrix needs many panels as the number of variables grows. For $p=30$, a full matrix has $900$ positions and is difficult to read.

## 10.5 Parallel coordinates: one case becomes one connected line

**Parallel coordinates** provide a different view of several numerical variables at once. Instead of putting two variables on perpendicular axes, place several variable axes next to one another, all vertical and parallel.

For one case, mark its value on every axis and connect those marks with a single polyline. Repeat for every case.

For the iris dataset:

```text
Sepal.Length      Sepal.Width       Petal.Length      Petal.Width
     |                  |                  |                 |
     o------------------o------------------o-----------------o   one flower
     |                  |                  |                 |
```

This is a conceptual diagram, not a reproduction of the source figure. Each connected line represents **one flower**, with the four measurements seen together.

### Read the source's Figures 2 and 3

**Figure 2 (PDF p. 8)** orders the variables as:

1. Sepal length.
2. Sepal width.
3. Petal length.
4. Petal width.

The lecturer colors the lines by the fifth variable, `Species`, which is categorical, while the four plotted axes are numerical. The resulting bundle shows the very small petals of **setosa**, the generally intermediate petal measurements of **versicolor**, and the generally larger petal measurements of **virginica**. The sepal dimensions overlap more. The lecturer's description also emphasizes that **setosa** typically has relatively wide sepals but short sepal length and small petals; **versicolor** has relatively narrow sepals and intermediate sepal length and petal measurements; and **virginica** has low-to-intermediate sepal width, medium-to-long sepals, and large petals. These are general **group patterns**, not absolute biological rules for every individual flower.

**Figure 3 (PDF p. 9)** reorders the axes as:

1. Sepal length.
2. Petal length.
3. Petal width.
4. Sepal width.

Why reorder? Two connected vertical axes create crossings. Changing which variables are neighbors can make some species patterns easier to recognize and reduce distracting intersections. The data have **not changed**; only the graphical arrangement has.

### What parallel coordinates do and do not reveal

They are useful for showing an individual observation's **multivariable profile** and broad differences between groups. They can be hard to read when hundreds of lines overlap, especially if line transparency, ordering, or color is poorly chosen.

**Scaling caution:** Different variables may have very different measurement ranges. If one is in rupees and another is a proportion, they usually need suitable axis-specific scaling or standardization for a readable profile. Know whether the software is displaying original values or normalized positions before interpreting the graph.

## 10.6 Stars and Chernoff faces

The lecture mentions two additional ways of representing multivariate data in two dimensions (PDF p. 9), referring students to Johnson and Wichern:

- A **star plot** draws several rays from a center, one per variable. Their lengths encode variable values; joining the endpoints creates a shape. Two cases with similar variable profiles may have similar star shapes.
- A **Chernoff face** maps variables onto features of a stylized face, such as eye size, mouth curvature, or face width. Humans may notice differences among faces quickly.

These methods can communicate multidimensional **profiles**, but the mapping itself introduces choices. A variable assigned to mouth curvature may attract more attention than one assigned to ear size, even if both are statistically equally important. The representations are visual metaphors, not formal proof of clusters or predictive relationships.

## 10.7 Choosing a graphical display

| Goal | Useful first graph | Key limitation |
|---|---|---|
| Examine one numeric variable | Histogram or boxplot | Does not show relationships with another variable |
| Compare a numeric variable across groups | Side-by-side boxplots or histograms | Can hide within-group detail or distribution shape |
| Inspect two numeric variables | Scatterplot | Two-dimensional view only |
| Compare all pairs of a few numeric variables | Scatterplot matrix | Misses genuinely higher-order patterns |
| Compare many numeric profiles | Parallel coordinates | Can become crowded; depends on axis order and scaling |
| Compact pictorial profiles | Star plot or Chernoff face | Interpretations sensitive to visual encoding |

The correct graph depends on the question, data type, number of variables, and audience. There is no rule saying that multivariate data must always be plotted with the most complicated available visualization.

---

# Chapter 11. Learning R with the iris dataset

*Lecture foundation: the iris dataset and the R commands/results, PDF pp. 9–13. Teaching extensions: step-by-step beginner instructions, clean runnable code, precise interpretation, and small coding improvements.*

## 11.1 What is R, and why does this lecture use it?

**R** is a programming language and statistical computing environment. You type instructions such as `mean(x)` and R calculates the result from your data. An **R package** is an installed collection of functions and resources for particular tasks.

The lecture works through the **iris dataset**, a small and widely used dataset that is included with base R. You do **not** have to download a CSV file to use it.

R functions in this chapter can be entered in R's console, RStudio, or another suitable R environment. Lines beginning with `#` are **comments**, which help humans read the code but are not executed.

### Three basics of R syntax

```r
x <- c(1, 2, 3)   # Create a numeric vector
mean(x)           # Calculate its mean
length(x)         # Number of values
```

- `c()` combines values into a vector.
- `<-` assigns a value to a named object.
- `mean()` is a function; the parentheses contain its input.
- R is **case-sensitive**: `Species` and `species` are different names.
- A period can be part of a column name: `Sepal.Length` is a single name.

## 11.2 Meet the iris dataset

The lecture attributes the historical iris measurements to **Edgar Anderson**, with **Ronald Fisher's 1936 analysis** helping make the dataset famous (PDF p. 9). Its 150 flowers come from three species, with 50 of each:

- `setosa`
- `versicolor`
- `virginica`

Each flower has four numerical measurements, in centimeters, and one categorical **species** label. The PDF's photographs on **p. 10** illustrate the appearance of the three species; the dataset itself stores numerical flower measurements, not those photographs.

| Variable | Meaning | Type |
|---|---|---|
| `Sepal.Length` | Sepal length in centimeters | Numeric, continuous |
| `Sepal.Width` | Sepal width in centimeters | Numeric, continuous |
| `Petal.Length` | Petal length in centimeters | Numeric, continuous |
| `Petal.Width` | Petal width in centimeters | Numeric, continuous |
| `Species` | Species membership | Categorical, nominal factor |

In R a **factor** is a data type for categories with defined possible values called **levels**. In this dataset there are three levels.

**A subtle but important point:** The full R data frame is **150 rows × 5 columns**. For many numerical multivariate calculations, the actual measurement matrix is **150 × 4**, because the fifth variable is the categorical label. Do not include integer-coded species numbers in `cor()` as if species were a quantitative measurement.

## 11.3 Load and inspect the data

```r
data(iris)     # Make the built-in iris dataset available
str(iris)      # Show column structure and types
head(iris)     # Show the first six observations
tail(iris)     # Show the last six observations
dim(iris)      # Returns 150 5
names(iris)    # Returns the five column names
```

### What should you see?

`str(iris)` reports a **data.frame** with 150 observations and five variables. The first four are `num` (numerical) and `Species` is a factor with three levels.

`head(iris)` includes the following first row:

| Sepal.Length | Sepal.Width | Petal.Length | Petal.Width | Species |
|---:|---:|---:|---:|---|
| 5.1 | 3.5 | 1.4 | 0.2 | setosa |

That means the first flower has a sepal length of 5.1 cm, a sepal width of 3.5 cm, a petal length of 1.4 cm, a petal width of 0.2 cm, and belongs to the setosa species. The last rows shown by `tail(iris)` belong to virginica in this built-in ordering.

The examples in the lecture's printed R output sometimes contain visible extra spacing due to PDF typesetting. The executable syntax in this book removes that spacing.

## 11.4 Understand the goal of EDA before running commands

The lecture says that exploring the data helps us (PDF p. 11):

- Understand what has been recorded.
- Summarize the distributions.
- Identify issues requiring cleaning.
- Examine relationships among variables.
- Consider plausible models.
- Decide whether more relevant data should be collected.

The iris example is already small and clean, so the lecture does not carry out a major cleaning operation. **Teaching extension:** With real customer data, you should additionally investigate missing entries, duplicates, impossible values, inconsistent units, and data leakage before modeling.

## 11.5 `summary()`: the first numerical description

```r
summary(iris)
```

For numerical columns, R displays **minimum**, **first quartile**, **median**, **mean**, **third quartile**, and **maximum**. For the categorical `Species` column, it displays the **number of flowers in each category**.

The lecture's printed results on PDF p. 11 include:

| Statistic | Sepal.Length | Sepal.Width | Petal.Length | Petal.Width |
|---|---:|---:|---:|---:|
| Minimum | 4.30 | 2.00 | 1.00 | 0.10 |
| First quartile | 5.10 | 2.80 | 1.60 | 0.30 |
| Median | 5.80 | 3.00 | 4.35 | 1.30 |
| Mean | 5.843 | 3.057 | 3.758 | 1.199 |
| Third quartile | 6.40 | 3.30 | 5.10 | 1.80 |
| Maximum | 7.90 | 4.40 | 6.90 | 2.50 |

All four columns are measured in centimeters. The source also displays species counts of 50, 50, and 50.

### How to read the table, not merely copy it

For `Petal.Length`, the **mean is about 3.758 cm** while the **median is 4.35 cm**. Their difference suggests that the combined distribution deserves closer inspection. Here the dataset includes three species with different petal-length distributions; the overall average alone hides those groups.

Do **not** interpret the overall mean as “the typical petal length of each species.” Group-specific summaries may tell a very different story.

## 11.6 `psych::describe()`: more descriptive information

The lecture additionally introduces the `psych` package's `describe()` function (PDF pp. 11–12).

```r
# Run this only if the package is not yet installed:
# install.packages("psych")

library(psych)
describe(iris[, 1:4])
```

The explicit selection `iris[, 1:4]` restricts the calculation to four numeric measurements. It avoids forcing the categorical species label into a numerical summary and makes the teaching intent clear.

The output includes columns such as:

| Output label | What it means |
|---|---|
| `vars` | Index assigned to the variable |
| `n` | Number of valid observations |
| `mean` | Sample average |
| `sd` | Sample standard deviation |
| `median` | Middle of ordered values |
| `trimmed` | Trimmed mean, reducing influence of extreme ends |
| `mad` | Median absolute deviation, a robust spread measure |
| `min`, `max`, `range` | Lowest, highest, and difference |
| `skew` | Numerical indication of asymmetry |
| `kurtosis` | A summary of distribution shape/tail-related behavior, according to the function's convention |
| `se` | Standard error of the estimated mean |

### Explain the unfamiliar additions

A **trimmed mean** discards a chosen fraction of the smallest and largest values before averaging; it reduces the impact of extremes. **Median absolute deviation** summarizes how far observations typically lie from the median, and is often more resistant to outliers than standard deviation.

**Skewness** concerns asymmetry: a long right tail suggests right skew, a long left tail suggests left skew. **Kurtosis** concerns aspects of tail behavior and distribution shape; its numerical interpretation depends on the software's definition, such as whether the normal-distribution reference value is zero. Neither statistic proves normality by itself.

The **standard error** of a mean concerns how variable the **estimated mean** would be across repeated samples. It is conceptually different from standard deviation, which describes variation among individual observations. Under basic independent sampling assumptions:

$$
\mathrm{SE}(\bar x)\approx\frac{s}{\sqrt n}.
$$

That formula is a **teaching extension**, not a separately derived topic in the PDF.

## 11.7 Test the lecture's petal-length observation

The lecture asks whether setosa flowers have shorter petals, then looks at flowers with `Petal.Length < 2` (PDF p. 12).

```r
subset(iris, Petal.Length < 2)[, "Species"]
```

Read the command in pieces:

- `subset(iris, Petal.Length < 2)` keeps rows where petal length is smaller than 2 cm.
- `[ , "Species"]` keeps the species column of those selected rows.
- `<` means “less than.”

For the built-in dataset, the observations satisfying this condition belong to **setosa**. To check counts instead of printing many category labels:

```r
table(iris$Species, iris$Petal.Length < 2)
```

This is a **contingency table**: it cross-tabulates two categorical descriptions, species and whether the length condition is true.

**Interpretation caution:** Showing that the built-in 150 flowers have this pattern does not establish that every possible wild iris flower will always satisfy it. Do not confuse a dataset pattern with a universal biological law.

## 11.8 Split the data by species

The lecture creates three smaller data frames:

```r
irisset <- subset(iris, Species == "setosa")
irisver <- subset(iris, Species == "versicolor")
irisvir <- subset(iris, Species == "virginica")
```

Here `==` tests equality, while `<-` assigns an object. `irisset` contains only setosa observations, and so on.

This is useful when the question changes from “What is the overall petal-length distribution?” to “How does that distribution differ across species?”

## 11.9 Boxplots: comparing centers and spread

A **boxplot** is a compact display of a distribution. Usually:

- The middle line is the median.
- The box extends from the first to the third quartile.
- The box length is the interquartile range.
- Whiskers show values within a plotting rule, commonly up to 1.5 IQR from the quartiles.
- Points beyond the whiskers may be marked as **potential outliers**.

The PDF's example draws the four measurements for each species in three adjacent panels (p. 12). Here is a clean executable version:

```r
oldpar <- par(no.readonly = TRUE)  # Save current graphics settings
par(mfrow = c(1, 3), mar = c(6, 3, 2, 1))

boxplot(irisset[, 1:4], main = "Setosa",     ylim = c(0, 8), las = 2)
boxplot(irisver[, 1:4], main = "Versicolor", ylim = c(0, 8), las = 2)
boxplot(irisvir[, 1:4], main = "Virginica",  ylim = c(0, 8), las = 2)

par(oldpar)  # Restore original settings
```

Explanation:

- `par()` controls graphical settings.
- `mfrow = c(1,3)` means a layout of **one row and three plots**.
- `mar` sets plot margins.
- `main` sets a plot title.
- `ylim = c(0,8)` gives the same vertical axis range to every plot, which helps visual comparison.
- `las = 2` makes axis labels perpendicular to the axis, improving readability with long names.
- `[, 1:4]` selects the numerical columns only.

An even simpler comparison of **one particular variable across all species** is:

```r
boxplot(Petal.Length ~ Species, data = iris,
        xlab = "Species", ylab = "Petal length (cm)",
        main = "Petal length by iris species")
```

Read `Petal.Length ~ Species` as “compare petal length by species.” The tilde `~` is a common part of R's **formula notation**, which we will see again when discussing ANOVA.

## 11.10 Histograms: overall and by species

The PDF first introduces a histogram of sepal length:

```r
hist(iris$Sepal.Length,
     main = "All iris flowers",
     xlab = "Sepal length (cm)")
```

The dollar sign `$` selects a named column from a data frame. Here `iris$Sepal.Length` means “the sepal-length column of the iris data.”

Then the lecture displays sepal-length histograms for each species separately. We use identical histogram breaks and axis ranges to make differences interpretable:

```r
oldpar <- par(no.readonly = TRUE)
par(mfrow = c(1, 3))
common_breaks <- seq(0, 8, by = 0.5)

hist(irisset$Sepal.Length, breaks = common_breaks,
     xlim = c(4, 8), ylim = c(0, 40), main = "Setosa")
hist(irisver$Sepal.Length, breaks = common_breaks,
     xlim = c(4, 8), ylim = c(0, 40), main = "Versicolor")
hist(irisvir$Sepal.Length, breaks = common_breaks,
     xlim = c(4, 8), ylim = c(0, 40), main = "Virginica")

par(oldpar)
```

- `seq(0, 8, by = 0.5)` creates boundaries 0, 0.5, 1.0, ..., 8.0.
- `breaks` controls the histogram intervals.
- `xlim` and `ylim` control axis limits.

**Important:** You cannot meaningfully compare bars across species if the software silently chooses different bin boundaries and scales without making that difference clear.

## 11.11 Correlations for the four numerical measurements

The lecture uses:

```r
corr <- cor(iris[, 1:4])
round(corr, 3)
```

`cor()` calculates the Pearson correlation matrix by default. `round(..., 3)` displays results to three decimal places; it does **not** change the original object `corr`.

The lecture's correlation matrix on PDF p. 13 is:

| | Sepal.Length | Sepal.Width | Petal.Length | Petal.Width |
|---|---:|---:|---:|---:|
| **Sepal.Length** | 1.000 | -0.118 | 0.872 | 0.818 |
| **Sepal.Width** | -0.118 | 1.000 | -0.428 | -0.366 |
| **Petal.Length** | 0.872 | -0.428 | 1.000 | 0.963 |
| **Petal.Width** | 0.818 | -0.366 | 0.963 | 1.000 |

Read specific entries:

- $r=0.963$ for petal length and petal width: **very strong positive** sample linear association.
- $r=0.872$ for sepal length and petal length: **strong positive** association.
- $r=-0.428$ for sepal width and petal length: a **moderate negative** overall association in this dataset.
- $r=-0.118$ for sepal length and sepal width: a **weak negative** overall linear association.

**An unusually important warning:** These are correlations **pooled across all three species**. Relationships **within** each species can differ from the pooled relationship. Group mixing can change correlations or even their signs, an idea related to Simpson's paradox. Therefore a colored scatterplot is more informative than interpreting the pooled matrix in isolation.

## 11.12 Scatterplot matrices in R

The simplest form from the lecture is:

```r
pairs(iris[, 1:4])
```

To color observations by species:

```r
species_colors <- as.integer(iris$Species)

pairs(iris[, 1:4],
      col = species_colors,
      pch = 19,
      main = "Anderson's iris data: three species")
```

Here `as.integer(iris$Species)` converts the factor to color-index integers **for plotting**, not to a meaningful numerical biological measurement. `pch = 19` means solid circular point symbols.

You can display the species-to-color key separately:

```r
plot.new()
legend("center", legend = levels(iris$Species),
       col = seq_along(levels(iris$Species)),
       pch = 19, bty = "n", horiz = TRUE)
```

The lecture also uses `oma` (outer margins), `par(xpd = TRUE)`, and `legend()` to place a legend below a scatterplot matrix (PDF p. 13). The separated legend above is less dependent on the graphics window size, but it requires a second plotting panel. In both cases, a **legend** explains which color corresponds to which category; without it, the viewer could misread the clusters.

## 11.13 Parallel coordinates in R

The lecture uses `parcoord()` from the `MASS` package (PDF p. 13):

```r
# MASS is a recommended R package; install if necessary.
# install.packages("MASS")

library(MASS)
parcoord(iris[, 1:4],
         col = as.integer(iris$Species),
         var.label = TRUE)
```

The function treats each flower as one multivariable profile. The `col` argument uses the species category codes **as plotting colors**, and `var.label = TRUE` requests variable labels.

For a clearer teaching example, make the color mapping explicit:

```r
species_palette <- c(setosa = "black",
                     versicolor = "red3",
                     virginica = "forestgreen")

parcoord(iris[, 1:4],
         col = species_palette[as.character(iris$Species)],
         var.label = TRUE)

legend("bottomleft", legend = names(species_palette),
       col = unname(species_palette), lty = 1, bty = "n")
```

Depending on the graphics window, the legend may overlap some lines. Adjust its position or use a separate legend panel if necessary. This affects appearance, not the data.

## 11.14 An optional full EDA sequence in one script

This consolidated block reproduces the main logical flow of the lecture with no external data file:

```r
# 1. Load and understand the table
data(iris)
str(iris)
head(iris)
summary(iris)

# 2. Define numeric measurements and grouping variable
measurements <- iris[, 1:4]
species <- iris$Species

# 3. Summarize centers, spread, and associations
colMeans(measurements)
sapply(measurements, sd)
round(cov(measurements), 3)
round(cor(measurements), 3)

# 4. Study a single variable across species
boxplot(Petal.Length ~ Species, data = iris,
        ylab = "Petal length (cm)")

# 5. Investigate pairs of variables
pairs(measurements, col = as.integer(species), pch = 19)

# 6. Compare the average measurements by species
aggregate(measurements, by = list(Species = species), FUN = mean)
```

In the last line, `aggregate()` computes separate group means. It provides a straightforward answer to “What do the species look like on average?” without requiring a formal test.

### What would justify going beyond EDA?

If you want to know whether the observed differences are **statistically significant**, you need an appropriate inferential test. If you want to **classify a new flower**, you need to evaluate a predictive rule. If you want to **compress four measurements**, you need a method such as PCA. These are the research questions the lecture introduces next.

---

# Chapter 12. Choosing a multivariate technique

*Lecture foundation: the six iris questions and named methods, PDF pp. 13–15. Teaching extensions: approachable explanations, distinctions, and illustrative R workflows.*

## 12.1 First, separate the goal from the data

The same 150 flowers support many legitimate questions. The right method depends on *what you are trying to discover*, not simply the fact that you have 150 rows and five columns.

## 12.2 Question 1: Are the three iris species different?

The PDF asks whether there are significant differences between species (pp. 13–14).

A **factor** is a categorical grouping variable. Here the factor is `Species` with three groups. An **outcome variable** is a measured characteristic whose values we compare across those groups.

### ANOVA: one numerical outcome at a time

**Analysis of variance (ANOVA)** compares group means while taking within-group variability into account. With one outcome, such as `Petal.Length`, the basic null hypothesis is:

$$
H_0:\ \mu_{\text{setosa}}=
\mu_{\text{versicolor}}=
\mu_{\text{virginica}}.
$$

- $H_0$ is the **null hypothesis**, the claim tested.
- $\mu$ denotes a **population mean**.
- The subscripts name the species groups.

The alternative is that **not all group population means are equal**.

R illustration (teaching extension):

```r
fit_one <- aov(Petal.Length ~ Species, data = iris)
summary(fit_one)
```

This asks whether mean petal length differs across the species, subject to ANOVA's assumptions. A significant ANOVA indicates at least one group-mean difference; it does **not** by itself identify every differing pair.

### Why not just run four ANOVAs?

The four numerical measurements are correlated. Running separate tests discards the opportunity to assess the **joint outcome profile** and creates a multiple-testing issue when interpreting all tests together.

### MANOVA: multiple numerical outcomes jointly

**Multivariate Analysis of Variance (MANOVA)** tests whether groups differ in a **vector of population means**, for two or more numerical outcomes. The PDF specifically suggests combining petal length and sepal width (p. 14).

The joint question is not simply “Does petal length differ?” or “Does sepal width differ?” but **“Do the species differ in their combined profile of petal length and sepal width?”**

Illustrative R code (teaching extension):

```r
fit_multi <- manova(cbind(Petal.Length, Sepal.Width) ~ Species,
                    data = iris)
summary(fit_multi, test = "Pillai")
```

- `cbind()` puts the selected outcomes together as columns.
- `~ Species` says the grouping factor is species.
- `test = "Pillai"` requests one widely used MANOVA test statistic.

**Precision note:** MANOVA jointly tests group mean vectors **while accounting for correlations among outcomes**. The lecture mentions that correlation patterns can differ between species. MANOVA's standard group-mean test does **not by itself test equality of covariance or correlation matrices**. Those require separate assumptions checks or appropriately designed tests.

Also, a statistically significant result does not automatically imply a large or commercially important difference. Assumptions, effect size, and context matter.

## 12.3 Question 2: Can a new flower be assigned to a species?

This is the PDF's **discriminant analysis** question (p. 14).

We have historical measurements with known species labels. We want a rule that predicts one of those species from a new flower's four measurements. **Discriminant functions** construct useful combinations of variables for separating groups.

### A conceptual example

Suppose a simple rule used only petal length:

- Very short petals suggest setosa.
- Intermediate petals suggest versicolor.
- Longer petals suggest virginica.

That is an intuitive starting point. A formal discriminant method learns a multivariable boundary from training data, typically informed by group means and within-group variability.

The lecture gives three related purposes:

1. Construct functions that characterize separation among groups.
2. Understand the original variables' contributions to that separation.
3. Evaluate the strength or adequacy of the separation.

**Evaluation matters.** Accuracy calculated using the same flowers used to train the classifier may be optimistic. A fair predictive assessment uses an independent test set or suitable cross-validation.

Optional illustration using `MASS` (teaching extension, not required code from the PDF):

```r
library(MASS)
model_lda <- lda(Species ~ Sepal.Length + Sepal.Width +
                         Petal.Length + Petal.Width,
                 data = iris)
model_lda
```

`lda()` stands for **linear discriminant analysis**. The code fits a model; a separate validation step is necessary before making performance claims.

## 12.4 Question 3: Do we need all four measurements? PCA

Perhaps petal length and petal width are so strongly correlated that they contain overlapping information. **Principal Component Analysis (PCA)** constructs **uncorrelated linear combinations** of the numerical variables.

A principal component has the form:

$$
\mathrm{PC}_1=a_1X_1+a_2X_2+a_3X_3+a_4X_4,
$$

where the $a_i$ coefficients are chosen by PCA. When PCA is based on centered data, the first component identifies a direction of **maximum variance**; subsequent components capture remaining variation in perpendicular (orthogonal) directions.

**Orthogonal** means at right angles in the chosen coordinate system, which corresponds to zero sample covariance between distinct principal-component scores in ordinary PCA.

If the first two components retain much of the data's variation, we might plot the 150 flowers in two component coordinates instead of four original measurements.

Optional R illustration (teaching extension):

```r
pca <- prcomp(iris[, 1:4], center = TRUE, scale. = TRUE)
summary(pca)
plot(pca$x[, 1:2], col = as.integer(iris$Species),
     xlab = "First principal component",
     ylab = "Second principal component")
```

`center = TRUE` subtracts means; `scale. = TRUE` divides by standard deviations. Scaling is often sensible when variables have different units or variation scales, but the choice should fit the research goal. Here all four measurements use centimeters, yet they have different spreads.

**Key distinction:** PCA selects directions that explain **variance**, not necessarily directions that best predict species. Unsupervised dimensional reduction and supervised discrimination are different goals.

## 12.5 Question 4: Can hidden constructs explain observed correlations? Factor analysis

The PDF introduces **factor analysis** to explore relationships between observed, or **manifest**, variables and assumed **latent** factors (p. 14).

- A **manifest variable** is directly observed: answers to a survey item, for example.
- A **latent factor** is an unobserved underlying characteristic used to help explain relationships among measurements, such as a hypothesized “service satisfaction” trait.

Consider six survey questions, some about response time and others about staff helpfulness. They may share a smaller number of underlying factors. Factor analysis investigates whether such shared sources of variation provide a useful explanation.

A schematic **factor model** is:

$$
X_i=\lambda_{i1}F_1+\lambda_{i2}F_2+\varepsilon_i,
$$

where:

- $X_i$ is an observed variable.
- $F_1,F_2$ are underlying factors.
- $\lambda_{i1},\lambda_{i2}$ are **factor loadings** describing how strongly the observed variable relates to the factors.
- $\varepsilon_i$ represents variation not explained by those factors.

This equation is a **teaching extension** illustrating the lecture's description, not an equation printed in the source.

### PCA is not the same as factor analysis

| PCA | Factor analysis |
|---|---|
| Seeks useful combinations representing observed variation | Models common variation attributed to underlying factors |
| Often used for data compression and visualization | Often used for discovering or studying latent constructs |
| Components are calculated from observed variables | Factors are modeled as latent explanatory quantities |
| Does not by itself establish a hidden psychological or business construct | Still requires judgment; factors are not automatically real causal entities |

Both can reduce dimensionality, but their mathematical objectives and interpretations differ.

## 12.6 Question 5: Could flower groups be discovered without species labels?

This is **cluster analysis** (PDF pp. 14–15). Imagine deleting the `Species` column. We still have four numerical measurements for each flower. Can we create groups based on similarity?

The process might be:

1. Choose the variables that should define similarity.
2. Decide how to handle different scales, perhaps standardizing numeric measurements.
3. Choose a distance measure.
4. Apply a grouping algorithm.
5. Evaluate whether the groups are stable and useful.

**Crucial distinction:** Even if an algorithm creates three clusters, those clusters are **not guaranteed to match the three biological species**. Some flowers overlap in measurements; the number of clusters may also be a modeling choice, not an observed fact.

Optional R illustration (teaching extension):

```r
set.seed(123)
scaled_iris <- scale(iris[, 1:4])
clusters <- kmeans(scaled_iris, centers = 3, nstart = 25)

table(Cluster = clusters$cluster, Species = iris$Species)
```

- `set.seed(123)` makes random initialization reproducible.
- `scale()` standardizes the four measurements.
- `centers = 3` tells this **particular example** to fit three clusters; other analyses can compare alternative numbers.
- `nstart = 25` tries multiple starting configurations.
- `table()` compares discovered clusters against the **held-out interpretation labels** after clustering, not during fitting.

Cluster numbers 1, 2, and 3 are arbitrary group identifiers. Their order has no biological meaning.

## 12.7 Question 6: How are two sets of variables related?

The lecture's final iris question asks about the relationship between the **sepal measurements as a set** and **petal measurements as a set** (PDF p. 15). It introduces **canonical correlation analysis (CCA)**.

Ordinary Pearson correlation compares **one variable with another**. CCA compares **two groups of variables** by finding a linear combination from each group whose correlation is as large as possible under the method's constraints.

For example:

$$
U=a_1\,\mathrm{Sepal.Length}+a_2\,\mathrm{Sepal.Width},
$$

$$
V=b_1\,\mathrm{Petal.Length}+b_2\,\mathrm{Petal.Width}.
$$

CCA chooses weights $a_1,a_2,b_1,b_2$ to find informative links between the two sets. This is a **schematic teaching example**. The exact weights require calculation from the data.

A business analogue compares a set of **marketing activity metrics** (advertising impressions, campaign exposure, email engagement) with a set of **sales outcomes** (purchase frequency, basket value, retention). The question is whether combinations of one set relate to combinations of the other.

**Caution:** High canonical correlation does not establish that one variable set causes the other. Small samples relative to the number of variables can also make apparently impressive results unstable.

## 12.8 What about regression and path analysis?

These techniques appear in the lecture's introductory list on PDF p. 1, though this first lecture does not develop their equations.

**Regression** models how an outcome varies with one or more predictors. A simple multiple linear regression might write:

$$
\text{Spending}=\beta_0+\beta_1\text{Visits}
+\beta_2\text{Income}+\varepsilon.
$$

The $\beta$ coefficients describe model parameters and $\varepsilon$ is an unexplained error term. The equation is **additional foundational teaching**, not a model estimated in the PDF.

**Path analysis** studies a specified network of relationships among variables, often representing direct and indirect pathways. For example, marketing exposure might be modeled as affecting brand awareness, which might in turn relate to purchase intention. Drawing arrows does not, by itself, identify causal effects; the interpretation depends on research design and assumptions.

## 12.9 Final method-selection table

| Business or research goal | Labels already known? | Starting method from this lecture | What it principally answers |
|---|---|---|---|
| Compare mean outcomes across groups | Yes, group membership | ANOVA / MANOVA | Are group means or mean vectors different? |
| Classify new cases into established groups | Yes | Discriminant analysis | Which known group is most plausible? |
| Replace many measurements with fewer combinations | Not required | PCA | Which directions summarize observed variance? |
| Explain observed correlations through hidden constructs | Not required | Factor analysis | Which latent factors may account for shared variation? |
| Discover unknown groups | No | Cluster analysis | Which cases resemble one another? |
| Relate two sets of measurements | Not required | Canonical correlation | Which combinations of the two sets are highly correlated? |
| Estimate an outcome from predictors | Outcome observed during training | Regression | How does an outcome vary with predictors? |
| Study a proposed network of direct/indirect links | Depends on design | Path analysis | Are the specified relationship patterns compatible with data? |

The next chapters explain a mathematical idea that underlies many of these procedures: **distance**. It may seem less exciting than classification, but its precise definition can change which observations look similar, which groups appear, and which observations look unusual.

---

# Chapter 13. Distance: turning differences into geometry

*Lecture foundation: Euclidean distance and geometric interpretation, PDF p. 15. Teaching extensions: coordinates, calculations, geometry, and application cautions.*

## 13.1 What do we mean when we say two customers are “similar”?

A grocery manager may want to find customers with similar shopping patterns. Suppose the only recorded characteristics are **monthly visits** and **spending**:

- Customer A: 3 visits and 5 spending units.
- Customer B: 6 visits and 9 spending units.

The difference is 3 visits and 4 spending units. But how can those two differences be combined into **one** measure of dissimilarity?

This question motivates **distance**. Distance is a nonnegative number describing how far apart two points are according to a specified rule. Small distance usually suggests greater similarity, **provided that the variables, units, and distance rule are meaningful for the purpose**.

The lecture begins its Section 8 by saying that distance underlies many multivariate techniques (PDF p. 15). We will see that choosing a distance is not as innocent as it first looks.

## 13.2 A data observation is a point in coordinate space

If a person is described by two numbers, we can write the point:

$$
P=(x_1,x_2).
$$

Here $x_1$ might be visits and $x_2$ spending. On graph paper, draw a horizontal axis for $x_1$, a vertical axis for $x_2$, and place the point at the corresponding coordinates.

The **origin** is the point at which both coordinates are zero:

$$
O=(0,0).
$$

With three variables, a point is $P=(x_1,x_2,x_3)$. With $p$ variables, it is:

$$
P=(x_1,x_2,\ldots,x_p).
$$

We cannot draw four spatial dimensions on ordinary graph paper, but the coordinate calculations still work.

## 13.3 The Pythagorean theorem, rebuilt for data

Recall a right-angled triangle: if its two perpendicular side lengths are $a$ and $b$, its longest side $c$ satisfies:

$$
a^2+b^2=c^2.
$$

So:

$$
c=\sqrt{a^2+b^2}.
$$

For a point $P=(3,4)$ and the origin $O=(0,0)$, the horizontal change is 3 and the vertical change is 4. Thus:

$$
d(O,P)=\sqrt{3^2+4^2}=\sqrt{9+16}=\sqrt{25}=\boxed{5}.
$$

This is **Euclidean distance**, also called straight-line distance. The PDF gives the general two-dimensional formula:

$$
\boxed{d(O,P)=\sqrt{x_1^2+x_2^2}}.
$$

The notation $d(O,P)$ means “distance between the origin $O$ and point $P$.”

## 13.4 Distance between two arbitrary points

Usually we need not measure from zero. We might compare customer A and customer B directly.

Let

$$
P=(x_1,x_2),\qquad Q=(y_1,y_2).
$$

The horizontal difference is $x_1-y_1$, and the vertical difference is $x_2-y_2$.

Therefore:

$$
\boxed{d(P,Q)=\sqrt{(x_1-y_1)^2+(x_2-y_2)^2}}.
$$

For $P=(3,5)$ and $Q=(6,9)$:

$$
\begin{aligned}
d(P,Q)&=\sqrt{(3-6)^2+(5-9)^2}\\
&=\sqrt{(-3)^2+(-4)^2}\\
&=\sqrt{9+16}\\
&=\boxed{5}.
\end{aligned}
$$

**Why square differences?** Squaring makes negative and positive differences contribute nonnegative amounts. It also gives the familiar Euclidean geometry of straight-line distance.

## 13.5 Generalize to $p$ variables

In $p$ dimensions, there are $p$ coordinate differences. Square each difference, add, and take one square root:

$$
\boxed{d(P,Q)=\sqrt{\sum_{k=1}^{p}(x_k-y_k)^2}}.
$$

This is identical to writing the terms individually:

$$
d(P,Q)=\sqrt{(x_1-y_1)^2+(x_2-y_2)^2+\cdots+(x_p-y_p)^2}.
$$

For a point measured from the origin:

$$
\boxed{d(O,P)=\sqrt{x_1^2+x_2^2+\cdots+x_p^2}}.
$$

A three-variable example:

$$
P=(1,2,4),\quad Q=(4,6,16).
$$

Then:

$$
\begin{aligned}
d(P,Q)&=\sqrt{(1-4)^2+(2-6)^2+(4-16)^2}\\
&=\sqrt{9+16+144}\\
&=\boxed{13}.
\end{aligned}
$$

The geometry extends naturally even if drawing it is impossible.

## 13.6 Equidistant points: circles and hyperspheres

Suppose we want **all points** that are exactly distance $c$ from the origin, where $c>0$ is a fixed number.

In two dimensions:

$$
\sqrt{x_1^2+x_2^2}=c.
$$

Square both sides:

$$
\boxed{x_1^2+x_2^2=c^2}.
$$

That equation describes a **circle** centered at the origin, with radius $c$. If $c=5$, points $(3,4)$, $(5,0)$, and $(0,-5)$ all lie on the same circle because each has Euclidean distance 5 from zero.

In three dimensions, the same constant-distance idea describes a **sphere**. In $p$ dimensions, the generalized object is called a **hypersphere**. The prefix “hyper-” simply signals the same geometric idea in an arbitrary number of dimensions.

## 13.7 Why raw Euclidean distance can be misleading

Suppose a bank compares customers using:

- Income, measured in rupees, ranging from 50,000 to 300,000.
- Number of missed payments, ranging from 0 to 5.

A difference of Rs. 20,000 can dominate a difference of three missed payments when raw squared differences are added. That does not mean missed payments are less important for credit risk; it may merely mean **income uses a much larger numerical scale**.

**Units matter.** Changing income from rupees to thousands of rupees changes the Euclidean distance, even though the underlying customers are identical.

A common remedy is to **standardize** the variables before calculating distance. But standardization alone does not address correlations among variables. This leads us to the lecture's next major idea.

---

# Chapter 14. Statistical distance when variables are independent

*Lecture foundation: statistical/elliptical/Mahalanobis distance when measurements vary independently, PDF pp. 16–17. Teaching extensions: z-scores, fully worked distances, geometry, and scale comparisons.*

## 14.1 How different is “different”?

Consider two measurements:

- $X_1$ = monthly spending, which naturally varies a lot across customers.
- $X_2$ = missed-payment count, which varies much less across customers.

If two people differ by 10 spending units but only 2 missed payments, should the difference of 10 automatically count five times more? **No**. A 10-unit difference might be commonplace for spending, while two extra missed payments might be unusual.

The lecture motivates **statistical distance** by saying that variables with greater natural variability should often receive **less weight** than variables with low variability (PDF p. 16).

This is a shift from *absolute differences* to *differences relative to what is normal for each variable*.

## 14.2 First learn a standard deviation unit

Suppose a numeric variable has mean $\bar x$ and sample standard deviation $s$. A standardized value, often called a **z-score** in introductory statistics, is:

$$
\boxed{z=\frac{x-\bar x}{s}}.
$$

Read it as “observed value minus mean, divided by standard deviation.”

If the mean is 100 and standard deviation is 20:

- $x=100$ gives $z=0$; it is exactly at the mean.
- $x=120$ gives $z=1$; it is one standard deviation above the mean.
- $x=60$ gives $z=-2$; it is two standard deviations below the mean.

The standardized value has **no original physical units**. That makes standardized differences more directly comparable across different numerical variables.

The PDF's independent-variable example assumes both variable means are **zero**, so its standardized coordinates simplify to $x_1/s_1$ and $x_2/s_2$. In a general dataset with nonzero means, subtract the means when measuring from the mean profile.

## 14.3 Understand Figure 4 on PDF p. 16

**Figure 4** is a scatter of points that spreads much farther in the $x_1$ direction than in the $x_2$ direction. The cloud is horizontally wide and vertically narrow.

That picture suggests:

$$
\text{variance of }X_1\ >\ \text{variance of }X_2.
$$

Thus a horizontal difference of, say, three units is less surprising than a vertical difference of three units. The direction matters because the natural variability differs.

The PDF assumes the two variable measurements vary **independently** in this first case. Independence is stronger than merely having zero covariance: it means knowing one variable does not change the probability distribution of the other. In common introductory models, independence is a useful simplifying assumption, but do not assume zero correlation always proves independence.

## 14.4 Statistical distance from zero in two independent coordinates

Let $s_{11}$ and $s_{22}$ denote the sample **variances** of $X_1$ and $X_2$. Their standard deviations are $\sqrt{s_{11}}$ and $\sqrt{s_{22}}$.

Standardize each coordinate:

$$
x_1^*=\frac{x_1}{\sqrt{s_{11}}},\qquad
x_2^*=\frac{x_2}{\sqrt{s_{22}}}.
$$

Then compute Euclidean distance using the standardized coordinates:

$$
\begin{aligned}
d(O,P)&=\sqrt{(x_1^*)^2+(x_2^*)^2}\\
&=\sqrt{\left(\frac{x_1}{\sqrt{s_{11}}}\right)^2+
\left(\frac{x_2}{\sqrt{s_{22}}}\right)^2}\\
&=\boxed{\sqrt{\frac{x_1^2}{s_{11}}+\frac{x_2^2}{s_{22}}}}.
\end{aligned}
$$

The distinction between **variance** $s_{11}$ and **standard deviation** $\sqrt{s_{11}}$ is essential. We divide the original coordinate by the standard deviation, then square it, which is equivalent to dividing its squared value by the variance.

## 14.5 Worked example: the same two deviations have different importance

Suppose:

$$
s_{11}=36,\quad s_{22}=1,\quad P=(6,2),\quad O=(0,0).
$$

So the standard deviations are:

$$
s_1=6,\qquad s_2=1.
$$

### Raw Euclidean distance

$$
d_E(O,P)=\sqrt{6^2+2^2}=\sqrt{40}\approx\boxed{6.325}.
$$

### Statistical distance

$$
\begin{aligned}
d_S(O,P)&=\sqrt{\frac{6^2}{36}+\frac{2^2}{1}}\\
&=\sqrt{1+4}\\
&=\boxed{\sqrt5\approx2.236}.
\end{aligned}
$$

### What has changed conceptually?

- The 6-unit change in $X_1$ is **one** standard deviation.
- The 2-unit change in $X_2$ is **two** standard deviations.

Thus the second difference deserves greater relative weight despite being smaller in raw numerical units.

Do **not** conclude that 2.236 is “better” simply because it is numerically smaller than 6.325. The two distances measure deviation under **different definitions and units**. Their absolute numerical values are not directly comparable as magnitudes of the same concept.

## 14.6 Why the equal-distance shape becomes an ellipse

The PDF's **Figure 5 (p. 17)** shows an axis-aligned ellipse. Start from the constant squared statistical distance $c^2$:

$$
\boxed{\frac{x_1^2}{s_{11}}+\frac{x_2^2}{s_{22}}=c^2}.
$$

When $x_2=0$:

$$
\frac{x_1^2}{s_{11}}=c^2\quad\Rightarrow\quad
x_1=\pm c\sqrt{s_{11}}.
$$

When $x_1=0$:

$$
x_2=\pm c\sqrt{s_{22}}.
$$

These are the ellipse's intercepts. If $s_{11}=36$, $s_{22}=1$, and $c=1$, the ellipse extends from $-6$ to $+6$ horizontally but only from $-1$ to $+1$ vertically.

**Why does this make intuitive sense?** The data naturally spread widely in the horizontal direction. Traveling six horizontal units is as statistically ordinary as traveling one vertical unit, because each is one standard deviation along its respective axis.

### Compare with the Euclidean circle

- Euclidean equal-distance equation: $x_1^2+x_2^2=c^2$, a circle.
- Variance-adjusted equal-distance equation: $x_1^2/s_{11}+x_2^2/s_{22}=c^2$, generally an ellipse.

The ellipse's axes line up with the coordinate directions in this **independent, zero-covariance setup**. Once variables are correlated, the equal-distance ellipse may become **tilted**. That is the next chapter.

## 14.7 Statistical distance between arbitrary points

Let

$$
P=(x_1,x_2),\qquad Q=(y_1,y_2).
$$

The PDF extends the independent-coordinate distance to:

$$
\boxed{d_S(P,Q)=\sqrt{\frac{(x_1-y_1)^2}{s_{11}}+
\frac{(x_2-y_2)^2}{s_{22}}}}.
$$

For $p$ independently varying coordinates:

$$
\boxed{d_S(P,Q)=
\sqrt{\sum_{k=1}^{p}\frac{(x_k-y_k)^2}{s_{kk}}}}.
$$

It is the same idea repeated for every coordinate: *difference, square, divide by that variable's variance, add, take the square root.*

The equal-distance shapes in $p$ dimensions are **hyper-ellipsoids**, the higher-dimensional counterparts of ellipses. Their axes align with the measurement directions under a diagonal covariance structure.

## 14.8 A subtle correction about equal variances

The PDF remarks on p. 17 that Euclidean distance can be used when all variances are equal. This is true **for rankings of distances** under the independent-coordinate formula, but the distances are not numerically identical unless the common variance is 1.

If

$$
s_{11}=s_{22}=\cdots=s_{pp}=\sigma^2>0,
$$

then

$$
d_S(P,Q)=\frac{1}{\sigma}\,d_E(P,Q).
$$

All distances are multiplied by the same positive factor $1/\sigma$. Thus nearest-neighbor **orderings remain the same**, but the numerical scale is different. This is an important mathematical precision, not a different concept from the lecture.

## 14.9 The limitation of the independent-variable formula

So far, we have assumed the coordinate directions can be treated separately. But suppose two measurements tend to increase together. Then a difference in the first variable gives some information about what difference to expect in the second. Standardizing them independently may count the same shared pattern twice.

That is why **variance adjustment is only half the story**. Full statistical distance also considers the **correlation structure**.

---

# Chapter 15. Correlated measurements and Mahalanobis distance

*Lecture foundation: rotated coordinates, quadratic coefficients, ellipses, and general statistical distance, PDF pp. 18–20. Teaching extensions: the inverse-covariance explanation, careful derivation, numeric examples, and computation in R.*

## 15.1 Why correlation changes the meaning of unusual

Imagine that in a business dataset, customers with more store visits also tend to make more purchases. Their points form a long diagonal cloud, not a horizontal or vertical cloud.

Consider two new customers relative to the usual mean profile:

- Customer P has visits and purchases **both unusually high**.
- Customer Q has visits unusually high but purchases unusually low.

If visits and purchases are strongly positively correlated, Customer P follows the **usual direction of joint variation**. Customer Q contradicts the usual pattern, so its combination may be more unusual **even if both customers have similar separate standardized deviations**.

To measure this difference, a distance must understand not only each variable's variance but also their **covariance**.

## 15.2 What Figure 6 is showing (PDF p. 18)

The lecture's **Figure 6** depicts a positively correlated scatter of observations that slopes upward. The original coordinate axes are labeled $x_1,x_2$. The figure also introduces a new pair of **rotated axes**, labeled $\tilde x_1,\tilde x_2$.

A tilde ($\tilde{x}$) means “a transformed version of $x$.” In this setting, the transformed measurements are coordinates obtained by **rotating the axes**.

The central geometric insight is:

> A diagonal cloud in one coordinate system can appear horizontally elongated when the axes are rotated to follow its natural directions of spread.

If we choose the rotation appropriately, the transformed coordinates have **zero covariance**. We can then use the variance-adjusted independent-direction distance from Chapter 14 **in the rotated coordinate system**.

**Important precision:** An arbitrary rotation does not guarantee uncorrelated transformed coordinates. The rotation must align with the **principal axes** of the covariance matrix, except in special equal-variance situations where axis directions are not unique. This is the same geometry that appears in principal component analysis.

## 15.3 Rotation equations, symbol by symbol

The lecture gives the coordinate transformation (PDF p. 18):

$$
\boxed{\tilde x_1=x_1\cos\theta+x_2\sin\theta},
$$

$$
\boxed{\tilde x_2=-x_1\sin\theta+x_2\cos\theta}.
$$

Here:

- $\theta$ (Greek letter “theta”) is the **rotation angle**.
- $\cos\theta$ and $\sin\theta$ are familiar trigonometric functions describing how directions project onto rotated axes.
- $x_1,x_2$ are the original coordinate values.
- $\tilde x_1,\tilde x_2$ are the new coordinate values relative to the rotated axes.

You do not need to memorize every trigonometric identity to understand the purpose. A rotation changes the **coordinate description** but does not move the physical observation relative to the cloud.

Using matrix notation (teaching extension):

$$
\begin{bmatrix}\tilde x_1\\\tilde x_2\end{bmatrix}
=
\underbrace{\begin{bmatrix}
\cos\theta&\sin\theta\\
-\sin\theta&\cos\theta
\end{bmatrix}}_{\text{rotation matrix}}
\begin{bmatrix}x_1\\x_2\end{bmatrix}.
$$

### A tiny numerical rotation example

Let $(x_1,x_2)=(2,2)$ and $\theta=45^\circ$.

Because $\cos45^\circ=\sin45^\circ=1/\sqrt2$:

$$
\tilde x_1=\frac{2}{\sqrt2}+\frac{2}{\sqrt2}=2\sqrt2,
$$

$$
\tilde x_2=-\frac{2}{\sqrt2}+\frac{2}{\sqrt2}=0.
$$

The point lies entirely along the first rotated axis. That is exactly what we want when an elongated data cloud follows the diagonal direction.

## 15.4 Statistical distance after rotating

Let $\tilde s_{11}$ and $\tilde s_{22}$ be the variances of the transformed coordinates, **using the rotation that makes their covariance zero**.

The lecture writes:

$$
\boxed{d_S(O,P)=\sqrt{\frac{\tilde x_1^2}{\tilde s_{11}}+
\frac{\tilde x_2^2}{\tilde s_{22}}}}.
$$

This is conceptually the same calculation as before:

1. Follow the data's natural main direction of variation.
2. Follow the perpendicular direction of variation.
3. Divide each squared coordinate by the appropriate variance.
4. Add the results and take a square root.

The difference is that the directions are no longer forced to be the original horizontal and vertical axes.

## 15.5 The quadratic expression in original coordinates

After substituting the rotation formulas and expanding, the source obtains:

$$
\boxed{d_S(O,P)=\sqrt{a_{11}x_1^2+2a_{12}x_1x_2+a_{22}x_2^2}}.
$$

This is called a **quadratic form**. You do not need to be intimidated by the name. It simply contains:

- A squared term for the first coordinate, $a_{11}x_1^2$.
- A squared term for the second coordinate, $a_{22}x_2^2$.
- A **cross-product term**, $2a_{12}x_1x_2$, capturing how the two coordinates work together.

The $a$ coefficients depend on the variances, covariance, and rotation. For arbitrary points $P=(x_1,x_2)$ and $Q=(y_1,y_2)$, the source generalizes it to:

$$
\boxed{d_S(P,Q)=\sqrt{
 a_{11}(x_1-y_1)^2
 +2a_{12}(x_1-y_1)(x_2-y_2)
 +a_{22}(x_2-y_2)^2}}.
$$

Here the cross-product is not an accidental complication: it is what enables the distance to account for correlation.

## 15.6 Explain the lecture's lengthy $a$ coefficients

The original PDF p. 19 prints expanded expressions for $a_{11},a_{12},a_{22}$. We can understand them much more easily by first giving their denominators names.

Let:

$$
c=\cos\theta,\qquad t=\sin\theta.
$$

We use $t$ for sine to avoid confusing it with the covariance symbol $s_{12}$. Define the variances along the rotated axes as:

$$
\boxed{v_1=c^2s_{11}+2cts_{12}+t^2s_{22}},
$$

$$
\boxed{v_2=t^2s_{11}-2cts_{12}+c^2s_{22}}.
$$

The symbols $s_{11}$ and $s_{22}$ are the original coordinate variances, and $s_{12}$ is their covariance. These $v$ expressions match the long denominators on PDF p. 19; the order of the terms is immaterial.

Then the printed coefficients become the much shorter formulas:

$$
\boxed{a_{11}=\frac{c^2}{v_1}+\frac{t^2}{v_2}},
$$

$$
\boxed{a_{22}=\frac{t^2}{v_1}+\frac{c^2}{v_2}},
$$

$$
\boxed{a_{12}=ct\left(\frac{1}{v_1}-\frac{1}{v_2}\right)}.
$$

If you substitute the two definitions of $v_1$ and $v_2$, you recover the longer $\cos^2\theta$ and $\sin^2\theta$ fractions printed in the original lecture.

### Derive the three coefficients carefully

Start with:

$$
d_S^2=\frac{(cx_1+tx_2)^2}{v_1}+
\frac{(-tx_1+cx_2)^2}{v_2}.
$$

Expand each square using $(a+b)^2=a^2+2ab+b^2$:

$$
(cx_1+tx_2)^2=c^2x_1^2+2ctx_1x_2+t^2x_2^2,
$$

$$
(-tx_1+cx_2)^2=t^2x_1^2-2ctx_1x_2+c^2x_2^2.
$$

Substitute:

$$
\begin{aligned}
d_S^2={}&\frac{c^2x_1^2+2ctx_1x_2+t^2x_2^2}{v_1}\\
&+\frac{t^2x_1^2-2ctx_1x_2+c^2x_2^2}{v_2}.
\end{aligned}
$$

Now collect like terms:

$$
\begin{aligned}
d_S^2={}&x_1^2\left(\frac{c^2}{v_1}+\frac{t^2}{v_2}\right)\\
&+2x_1x_2\left(\frac{ct}{v_1}-\frac{ct}{v_2}\right)\\
&+x_2^2\left(\frac{t^2}{v_1}+\frac{c^2}{v_2}\right).
\end{aligned}
$$

Compare that line with:

$$
d_S^2=a_{11}x_1^2+2a_{12}x_1x_2+a_{22}x_2^2.
$$

We can now read off $a_{11}$, $a_{12}$, and $a_{22}$. This is the precise algebraic explanation of the formulas on p. 19.

## 15.7 The inverse covariance matrix: the compact answer

**Teaching extension, building directly on the lecture's quadratic form.** Matrix notation allows all the previous formulas to fit into one expression.

Let the covariance matrix for two variables be:

$$
\mathbf S=
\begin{bmatrix}s_{11}&s_{12}\\s_{12}&s_{22}\end{bmatrix}.
$$

If $\mathbf S$ is **invertible** (that is, it has an ordinary matrix inverse), define:

$$
\mathbf A=\mathbf S^{-1}.
$$

The $-1$ superscript here means **matrix inverse**, not “raise each entry to minus one.” The inverse matrix is the matrix that satisfies $\mathbf S^{-1}\mathbf S=\mathbf I$, where $\mathbf I$ is an identity matrix, the matrix equivalent of multiplying by 1.

For a $2\times2$ covariance matrix:

$$
\boxed{
\mathbf S^{-1}=\frac{1}{s_{11}s_{22}-s_{12}^2}
\begin{bmatrix}s_{22}&-s_{12}\\-s_{12}&s_{11}\end{bmatrix}},
$$

provided $s_{11}s_{22}-s_{12}^2>0$.

The denominator is the **determinant** of the covariance matrix in this two-dimensional case. It must be nonzero for an inverse to exist.

The coefficients are exactly the entries of the inverse matrix:

$$
\mathbf S^{-1}=\begin{bmatrix}a_{11}&a_{12}\\a_{12}&a_{22}\end{bmatrix}.
$$

For a difference vector:

$$
\boldsymbol\delta=
\begin{bmatrix}x_1-y_1\\x_2-y_2\end{bmatrix},
$$

the distance is:

$$
\boxed{d_M(P,Q)=\sqrt{\boldsymbol\delta^{\mathsf T}
\mathbf S^{-1}\boldsymbol\delta}}.
$$

The superscript ${\mathsf T}$ means **transpose**, which turns a column vector into a row vector. In two dimensions, multiplying the matrices gives the same expanded expression:

$$
d_M^2=a_{11}\delta_1^2+2a_{12}\delta_1\delta_2+a_{22}\delta_2^2.
$$

This covariance-adjusted distance is called **Mahalanobis distance**. The lecture calls it statistical, elliptical, or Mahalanobis distance (p. 16); the inverse covariance matrix makes that general definition especially transparent.

## 15.8 A full worked Mahalanobis example

Suppose two standardized business measurements have sample covariance matrix:

$$
\mathbf S=\begin{bmatrix}4&2\\2&4\end{bmatrix}.
$$

Each variable has variance 4 and standard deviation 2. Their covariance is 2, so correlation is:

$$
r=\frac{2}{2\cdot2}=0.5.
$$

They are positively correlated.

First compute the determinant:

$$
\det(\mathbf S)=4\cdot4-2\cdot2=16-4=12.
$$

Therefore:

$$
\mathbf S^{-1}=
\frac1{12}\begin{bmatrix}4&-2\\-2&4\end{bmatrix}.
$$

### Case A: both coordinates increase together

Let $Q=(0,0)$ and $P=(2,2)$.

**Step 1: Ordinary Euclidean distance**

$$
d_E=\sqrt{2^2+2^2}=\sqrt8\approx2.828.
$$

**Step 2: Variance-standardized distance, ignoring correlation**

$$
d_{\mathrm{diag}}=\sqrt{\frac{2^2}{4}+\frac{2^2}{4}}
=\sqrt2\approx1.414.
$$

**Step 3: Full Mahalanobis distance**

Let $\boldsymbol\delta=(2,2)^{\mathsf T}$. Then:

$$
\begin{aligned}
d_M^2
&=\frac1{12}\left[4(2)^2+2(-2)(2)(2)+4(2)^2\right]\\
&=\frac1{12}(16-16+16)\\
&=\frac{16}{12}=\frac43.
\end{aligned}
$$

So:

$$
\boxed{d_M=\sqrt{\frac43}\approx1.155}.
$$

Because both coordinates are high together, the difference follows the common positive-correlation direction and is less statistically unusual than a discrepancy that moves against the correlation.

### Case B: coordinates move in opposite directions

Now let $Q=(0,0)$ and $P=(2,-2)$.

The ordinary Euclidean distance is **the same** as Case A, because $(2)^2+(-2)^2=8$. The independently standardized distance is also the same, $\sqrt2$.

But full Mahalanobis distance becomes:

$$
\begin{aligned}
d_M^2&=\frac1{12}\left[4(2)^2+2(-2)(2)(-2)+4(-2)^2\right]\\
&=\frac1{12}(16+16+16)\\
&=4,\\
d_M&=\boxed{2}.
\end{aligned}
$$

**Key insight:** The two points have identical Euclidean distances from zero, yet different Mahalanobis distances:

$$
d_M(2,2)\approx1.155,\qquad d_M(2,-2)=2.
$$

The point $(2,-2)$ is farther in **statistical terms** because it goes against the usual positive relationship. That is what the covariance correction achieves.

### What we have *not* established

We have **not** proved that a value of 2 is an outlier, nor that 1.155 is “normal.” To turn distance into an anomaly rule, we need a suitable reference distribution, sample-size considerations, and a justified threshold. This is a meaningful extension beyond the lecture's distance formulas.

## 15.9 Equal Mahalanobis distances form a tilted ellipse

The lecture's **Figure 7 (PDF p. 19)** shows a rotated ellipse centered at a point $Q$. Its long and short axes align with the rotated coordinate axes $\tilde x_1$ and $\tilde x_2$, not necessarily with the original $x_1,x_2$ axes.

The equation of a constant squared statistical distance is:

$$
\boxed{
 a_{11}(x_1-y_1)^2
 +2a_{12}(x_1-y_1)(x_2-y_2)
 +a_{22}(x_2-y_2)^2=c^2}.
$$

If correlation is positive, the cloud's elongated direction often slopes upward. If correlation is negative, it often slopes downward. The exact shape and orientation are determined by the **eigenvectors and eigenvalues** of the covariance matrix, which are the directions and variances of its principal axes.

**Eigenvector (beginner explanation):** a special direction that remains on the same line when transformed by a matrix. **Eigenvalue:** the factor that describes the amount of stretching along that direction. For a covariance matrix, eigenvectors supply principal directions and eigenvalues provide variances along those directions.

These mathematical ideas explain why PCA and Mahalanobis distance share the same geometry. PCA describes directions of variation; Mahalanobis distance uses the inverse of the variance along those directions to measure how unusual a displacement is.

## 15.10 Generalization to $p$ correlated variables

The PDF continues to $p$ coordinates across pp. 19–20. Suppose:

$$
P=(x_1,\ldots,x_p),\qquad Q=(y_1,\ldots,y_p),
$$

and define:

$$
\delta_i=x_i-y_i.
$$

A general squared distance of the lecture's type is:

$$
\boxed{
 d^2(P,Q)=\sum_{i=1}^{p}a_{ii}\delta_i^2+
 2\sum_{i=1}^{p-1}\sum_{k=i+1}^{p}a_{ik}\delta_i\delta_k
}.
$$

The first sum contains the **individual squared differences**; the double sum contains **cross-products** for every distinct pair of coordinates. The factor 2 appears because the symmetric matrix includes each off-diagonal relationship twice, once as $(i,k)$ and once as $(k,i)$.

In compact matrix form:

$$
\boxed{d_M(P,Q)=\sqrt{(\mathbf x-\mathbf y)^{\mathsf T}
\mathbf S^{-1}(\mathbf x-\mathbf y)}}.
$$

This is the standard Mahalanobis form for a positive-definite covariance matrix $\mathbf S$.

### Why the formula is powerful

It handles all of these together:

- Different original measurement scales.
- Different amounts of natural variation.
- Positive and negative correlations.
- Many dimensions, even when plotting is impossible.

### Why the formula is not automatic

You must have a **meaningful, estimated covariance matrix**. If variables are redundant, sample size is too small, or the covariance matrix is **singular** (noninvertible), the ordinary inverse does not exist. Methods such as variable selection, regularization, or mathematically suitable generalized inverses may be needed; those are **extensions beyond the first lecture**.

## 15.11 Mahalanobis distance in R

R has a built-in function called `mahalanobis()`. **It returns squared Mahalanobis distance**, not the ordinary square-rooted distance. This is an easy mistake to make.

```r
# Two-dimensional example from this chapter
S <- matrix(c(4, 2,
              2, 4), nrow = 2, byrow = TRUE)

center <- c(0, 0)
points <- rbind(c(2, 2), c(2, -2))

D_squared <- mahalanobis(points, center = center, cov = S)
D <- sqrt(D_squared)

D_squared  # 1.333333 and 4
D          # Approximately 1.154701 and 2
```

The `center` parameter specifies $Q$, the reference point. The `cov` parameter supplies the covariance matrix. The two rows of `points` are the two cases being compared against that reference.

To calculate distances from the **mean of the four iris measurements** (teaching extension):

```r
measurements <- iris[, 1:4]
mu <- colMeans(measurements)
S_iris <- cov(measurements)

D2 <- mahalanobis(measurements, center = mu, cov = S_iris)
D <- sqrt(D2)

summary(D)
which.max(D)  # Index of the flower farthest from the sample mean
```

The farthest flower is not necessarily an invalid observation. It may be a genuine observation from a legitimately different species. This is particularly important when the data contain **known groups with different centers**: a single pooled global mean can make an entire group appear relatively distant. Interpret distance in the context of the analysis.

## 15.12 A compact comparison of the three distance ideas

| Property | Euclidean | Variance-standardized (diagonal) | Mahalanobis |
|---|---|---|---|
| Uses differences between coordinates | Yes | Yes | Yes |
| Adjusts for measurement spread | No | Yes | Yes |
| Accounts for correlation | No | No | Yes |
| Equal-distance shapes in 2D | Circles | Axis-aligned ellipses | Usually tilted ellipses |
| Typical formula | $\sqrt{\sum\delta_i^2}$ | $\sqrt{\sum\delta_i^2/s_{ii}}$ | $\sqrt{\boldsymbol\delta^{\mathsf T}\mathbf S^{-1}\boldsymbol\delta}$ |

The lecture begins with straight-line geometry, then improves it for natural variation, then improves it again for correlated measurements. That progression is the conceptual core of its final pages.

---

# Chapter 16. General distance properties and limitations

*Lecture foundation: distance axioms and references, PDF p. 20. Teaching extensions: plain-English explanations, proofs for special cases, and limitations of covariance-based distance.*

## 16.1 Not every formula deserves to be called a distance

The lecture lists four conditions for a valid **metric distance** between any points $P,Q$, with a third point $R$ (PDF p. 20).

### Property 1: Symmetry

$$
\boxed{d(P,Q)=d(Q,P)}.
$$

Traveling from A to B has the same straight-line length as traveling from B to A. The statistical distance formulas in this chapter are also symmetric because changing every coordinate difference's sign leaves the quadratic form unchanged.

### Property 2: Positive distance between distinct points

$$
\boxed{P\ne Q\quad\Rightarrow\quad d(P,Q)>0}.
$$

If two points differ, they must not be assigned zero distance by a genuine metric.

### Property 3: Zero distance from a point to itself

$$
\boxed{d(P,P)=0}.
$$

Each coordinate difference is zero, so Euclidean and ordinary Mahalanobis distances vanish.

### Property 4: Triangle inequality

$$
\boxed{d(P,Q)\le d(P,R)+d(R,Q)}.
$$

Going directly from P to Q is never longer than going first to R and then to Q under a metric distance. In ordinary geometry, a straight line is the shortest route. The inequality also holds for Mahalanobis distance when it is formed with a **fixed positive-definite covariance matrix**.

**Technical note:** Distances are also nonnegative: $d(P,Q)\ge0$. This is already implied by the positive/zero conditions for all pairs, but it is often written explicitly in definitions of a metric.

## 16.2 A triangle-inequality example

Take points on a number line:

$$
P=0,\quad R=3,\quad Q=10.
$$

Then:

$$
d(P,Q)=10,
$$

$$
d(P,R)+d(R,Q)=3+7=10.
$$

So the triangle inequality holds with equality in this straight-line arrangement. If $R$ is off the direct path in a plane, the two-part route is generally longer.

## 16.3 Conditions behind Mahalanobis as a proper metric

**Teaching extension:** The matrix in a quadratic distance must have suitable properties. In standard Mahalanobis distance, $\mathbf S$ is a **symmetric positive-definite covariance matrix**. Positive-definite means:

$$
\mathbf z^{\mathsf T}\mathbf S\mathbf z>0
\quad\text{for every nonzero vector }\mathbf z.
$$

Under this condition, $\mathbf S^{-1}$ exists, is also positive-definite, and yields positive distance between distinct points. Merely stating that a quadratic form is never negative is insufficient to guarantee that different points always have positive distance: a **positive-semidefinite** matrix could assign zero quadratic value to a nonzero displacement.

The source says the coefficients $a$ are chosen so distances are nonnegative. The full mathematical condition above clarifies when the four stated metric properties actually hold.

## 16.4 What goes wrong with singular covariance?

Suppose a retailer records:

$$
X_1=\text{Revenue in rupees},\qquad
X_2=\text{Revenue in thousands of rupees}.
$$

Then $X_1=1000X_2$ for every case. These columns contain precisely the **same information** in different units. The covariance matrix is singular because the variables are perfectly dependent; it cannot be inverted in the ordinary way.

In real work, a singular covariance matrix may also arise if there are more numerical variables than the effective number of independent observations, or if multiple columns are exact linear combinations of others.

What to do depends on the goal. One simple first step is to remove exact duplicates or redundant columns. More sophisticated settings may use PCA, covariance regularization, or other methods appropriate to the statistical problem.

## 16.5 Scale, shape, and interpretation are modeling choices

Even a mathematically valid distance may not be a **useful business distance**.

- **Variable selection:** Unrelated features can dilute meaningful similarity.
- **Categorical variables:** Nominal codes should not be inserted into Euclidean or Mahalanobis formulas as arbitrary numeric magnitudes.
- **Outliers:** A classical sample mean and covariance matrix can be distorted by extreme observations. Robust estimation may be relevant.
- **Group structure:** A pooled covariance matrix can conceal important between-group differences.
- **Correlation changes:** A model estimated during one business period may become unreliable if customer behavior changes.
- **Interpretation:** “Far” is always relative to chosen variables, preprocessing, and a reference population.

This is the same lesson we saw in the opening chapters: statistics does not replace sound reasoning about the dataset and its purpose.

---

# Chapter 17. An integrated business case

*Teaching extension: this case is newly constructed to connect concepts from the entire lecture. It is not a dataset or case study supplied by the lecturer.*

## 17.1 The setting: an online grocery business

An online grocery business wants to understand why some customers leave and how it might tailor service to different customer needs. It has recorded 800 customers, one row per customer, and the following columns:

| Variable | Meaning | Example | Statistical role |
|---|---|---|---|
| `CustomerID` | Customer identifier | C001 | Identifier, nominal |
| `MonthlyOrders` | Orders in a month | 6 | Quantitative, discrete |
| `AverageBasket` | Mean order value in Rs. | 2,850 | Quantitative, ratio-scale |
| `DeliveryMinutes` | Typical delivery duration | 35.5 | Quantitative, continuous |
| `ServiceRating` | Poor to excellent | 4 | Ordinal response code |
| `MembershipTier` | Bronze, silver, gold | Silver | Ordered policy categories, if hierarchy is genuine |
| `TenureMonths` | Time since registration | 18.5 | Quantitative, ratio-scale |
| `Churned` | Left within subsequent 3 months? | Yes | Nominal outcome label |

The names and values are **hypothetical**. No real personal or company information is used.

## 17.2 What is $n$, and what is $p$?

There are $n=800$ customer observations. If we include all eight listed columns in a data frame, it has eight columns. But for a numerical matrix of measured quantities we must decide which columns can be meaningfully represented numerically, exclude the identifier, and handle ordinal and nominal variables appropriately.

One simple exploratory numerical matrix might contain:

$$
\mathbf X=\begin{bmatrix}
\text{MonthlyOrders}&\text{AverageBasket}&\text{DeliveryMinutes}&\text{TenureMonths}
\end{bmatrix}_{800\times4},
$$

where that bracketed display describes the **column layout** rather than listing all 800 numeric rows. Thus the numerical multivariate analysis currently has $p=4$ variables.

## 17.3 Decide what the company is actually asking

**Question A:** “What does the typical customer order?”  
This is primarily **univariate**. Summarize order counts and basket values separately.

**Question B:** “Are delayed deliveries associated with worse service ratings?”  
This is a **bivariate** question. Delivery time is numeric; rating is ordinal, so avoid assuming that rating codes are continuous interval measurements without justification. Side-by-side distributions or an ordinal association measure may be informative.

**Question C:** “Which combination of service metrics is associated with a customer's likelihood of leaving?”  
This is a **supervised prediction** problem because `Churned` supplies known historical labels. A classification or suitable regression method could be studied, with attention to the timing of the inputs and outcome.

**Question D:** “Could monthly orders, basket value, and tenure be represented by fewer synthetic indicators?”  
This is a **PCA/dimension-reduction** question.

**Question E:** “Are there naturally distinct customer purchasing profiles without using the churn label?”  
This is **clustering**.

**Question F:** “Do several service-experience questions appear to measure a smaller set of underlying service-quality dimensions?”  
This suggests **factor analysis**, provided the measurement design supports it.

**Question G:** “Are the average values of several service metrics jointly different for bronze, silver, and gold members?”  
This may motivate **MANOVA**, with care regarding data type, groups, assumptions, and whether a group comparison is meaningful for the business question.

## 17.4 What would a sensible analysis workflow look like?

### Step 1: Understand the rows, columns, and timeline

Verify that each row is one customer and the churn outcome occurs **after** the predictor measurements. If you use a variable recorded after churn to predict churn, you may have **data leakage**, producing an unrealistically accurate model.

### Step 2: Identify measurement scales

Treat `CustomerID` as a label, not an explanatory numerical amount. Treat `MembershipTier` as a hierarchy only if company policy truly defines Bronze below Silver below Gold. Do not average nominal category codes.

### Step 3: Inspect one variable at a time

For `AverageBasket`, calculate a mean, median, standard deviation, range, quartiles, and histogram. Ask whether a few large orders distort the average.

### Step 4: Inspect two-variable relationships

Draw spending against monthly orders, and delivery time against churn category using a suitable group comparison. Calculate Pearson correlations among suitable quantitative variables, while checking scatterplots for nonlinear patterns.

### Step 5: Consider scale

`AverageBasket` may vary by thousands, while `MonthlyOrders` may vary only from 0 to 30. Raw Euclidean distance can be dominated by basket value. Standardization or a justified statistical-distance metric may be better for certain similarity-based methods.

### Step 6: Consider dependence

Customers with higher order frequency may have higher basket values or longer membership tenure. Covariance and correlation matrices describe some of this shared variation. A full Mahalanobis distance can account for covariance when suitable numerical data and an invertible covariance estimate are available.

### Step 7: Pick the method that answers the goal

Do not run MANOVA just because the course is called multivariate methods. If the decision is prediction, evaluate prediction; if it is segmentation, evaluate cluster usefulness; if it is group comparison, test the relevant group hypothesis.

### Step 8: Interpret for the business

A statistical result does not directly tell managers which action to take. Ask how costly an error is, whether an effect is materially important, and whether using certain customer characteristics would be unfair or inappropriate.

## 17.5 A small, runnable R simulation for practice

The following data are **synthetic**. They are created solely to practice the lecture's tools, not to support any empirical claim about real customers.

```r
set.seed(2451)

n <- 120
MonthlyOrders <- sample(1:12, n, replace = TRUE)
AverageBasket <- 1000 + 180 * MonthlyOrders + rnorm(n, 0, 450)
DeliveryMinutes <- 25 + rnorm(n, 0, 6)
TenureMonths <- sample(1:48, n, replace = TRUE)

business <- data.frame(
  MonthlyOrders,
  AverageBasket,
  DeliveryMinutes,
  TenureMonths
)

# A. Understand the data
str(business)
summary(business)

# B. One-variable description
mean(business$AverageBasket)
sd(business$AverageBasket)
hist(business$AverageBasket)

# C. Pairwise relationships
plot(business$MonthlyOrders, business$AverageBasket,
     xlab = "Orders per month", ylab = "Average basket value")
round(cor(business), 3)

# D. Matrix summaries
colMeans(business)
round(cov(business), 2)

# E. Principal component analysis (teaching extension)
pca_business <- prcomp(business, center = TRUE, scale. = TRUE)
summary(pca_business)

# F. Distance from mean profile
business_scaled <- scale(business)
EuclideanFromCenter <- sqrt(rowSums(business_scaled^2))
MahalanobisFromCenter <- sqrt(
  mahalanobis(business, colMeans(business), cov(business))
)

summary(EuclideanFromCenter)
summary(MahalanobisFromCenter)
```

### How to interpret the simulated results

The program deliberately constructs basket value partly from order count, with extra random noise. Therefore a positive sample association between those two columns is expected, although its exact value changes with the random draw. The PCA and distances then operate on the four numeric columns. The Euclidean distance in the code is measured in **standardized coordinates**, whereas Mahalanobis distance incorporates the estimated correlations as well.

No specific R outputs from this synthetic simulation are claimed in the original lecture. You should run the code to see its particular values.

## 17.6 What should the learner now be able to do?

You should now be able to recognize that:

- Data analysis starts by defining the **case** and **variables**.
- Types and scales determine which mathematical operations make sense.
- $\mathbf X$ organizes observations, $\bar{\mathbf x}$ organizes sample means, $\mathbf S$ organizes covariance, and $\mathbf R$ organizes correlations.
- EDA helps discover distributions, relationships, unusual values, and possible group structure.
- **Different analysis goals require different statistical methods.**
- Euclidean distance is simple but depends on units; Mahalanobis distance adjusts for spread and correlation.

---

# Chapter 18. Guided practice and fully explained answers

*Teaching extension: these questions and worked answers are original teaching exercises. They are not claimed to be the lecturer's examination questions.*

## Practice set A: understanding the concepts

### A1. A dataset contains 300 employees and one column recording annual salary. Is the analysis necessarily multivariate?

**Answer:** No. If you analyze salary alone, the analysis is **univariate**, even if the company owns many other columns. The analysis concerns only one variable. A larger dataset does not automatically make every question multivariate.

### A2. A chart shows a positive association between advertising and sales. Can we conclude that advertising caused all the increase in sales?

**Answer:** No. Both may rise because of seasonality, promotions, changes in product availability, or other factors. A positive association can motivate causal investigation, but it does not itself prove causation.

### A3. A customer satisfaction variable is coded 1 through 5. Does that automatically make it a continuous numeric variable?

**Answer:** No. The numbers may be **codes for five ordered categories**. If the response categories are “very dissatisfied” through “very satisfied,” a single item is ordinarily treated as **ordinal** unless a stronger measurement assumption is justified.

### A4. Is an employee number such as `002451` a ratio-scale variable?

**Answer:** No. It is an **identifier**. Its digits label a person. The numerical difference between employee numbers does not measure a meaningful amount of employee-ness or employment.

### A5. What is the difference between `n` and `p` in a multivariate dataset?

**Answer:** $n$ counts **rows or observations** and $p$ counts **measured variables or columns** in the chosen matrix. A matrix with 75 customers and six numeric measurements has dimension $75\times6$.

### A6. Why is it wrong to calculate a single mean of all values in a matrix containing ages, salaries, and distances?

**Answer:** These variables measure different things, often in different units. Their joint arithmetic average would mix quantities that are not directly comparable. We calculate **one mean per variable**, then organize those means in a vector.

### A7. A dataset has two columns with correlation $0.92$. Does this mean the second column causes the first?

**Answer:** No. Correlation measures the **direction and strength of a linear sample association**, not causal direction. Both variables could respond to something else, or the relationship could be affected by group structure.

### A8. Why can $r=0$ be misleading?

**Answer:** Pearson's $r$ measures **linear** association. A strong curved relationship can exist even when positive and negative linear deviations balance to give correlation near zero. Draw the scatterplot.

### A9. Which method would you choose to find unknown customer groups?

**Answer:** **Cluster analysis**, because the group labels are not known. Classification methods such as discriminant analysis normally require known group labels in the training data.

### A10. What is the most important difference between PCA and factor analysis?

**Answer:** PCA creates combinations that summarize **observed variation**. Factor analysis models **common variation through hypothesized latent factors**. Both can reduce dimensionality, but the underlying objectives differ.

### A11. What does each line mean in a parallel coordinates plot?

**Answer:** It represents **one complete case** across the variables shown on the parallel axes. A color may identify a categorical group such as iris species.

### A12. Why might you reorder the axes in a parallel coordinates plot?

**Answer:** The same data can produce more or fewer visually confusing line crossings depending on which variables are adjacent. Reordering may reveal patterns more clearly without changing the actual observations.

## Practice set B: calculations from the beginning

### B1. Compute the sample mean of 2, 5, and 8.

**Step 1:** Add the observations:

$$2+5+8=15.$$

**Step 2:** Count them: $n=3$.

**Step 3:** Divide:

$$\boxed{\bar x=15/3=5}.$$

### B2. Compute the sample variance and standard deviation of 2, 5, and 8.

Mean $=5$. Deviations:

$$2-5=-3,\quad5-5=0,\quad8-5=3.$$

Squares:

$$(-3)^2=9,\quad0^2=0,\quad3^2=9.$$

Sum $=18$. Sample variance:

$$\boxed{s^2=\frac{18}{3-1}=9}.$$

Standard deviation:

$$\boxed{s=\sqrt9=3}.$$

### B3. Compute covariance for $X=(1,2,3)$ and $Y=(2,4,6)$.

Means:

$$\bar X=2,\qquad\bar Y=4.$$

Deviations:

$$X-\bar X=(-1,0,1),$$

$$Y-\bar Y=(-2,0,2).$$

Pairwise products:

$$(-1)(-2)=2,\quad0\cdot0=0,\quad(1)(2)=2.$$

Sum $=4$. There are $n=3$ pairs, so:

$$\boxed{s_{XY}=\frac4{3-1}=2}.$$

### B4. Find the Pearson correlation for the variables in B3.

We need the sample variances:

$$s_X^2=\frac{1+0+1}{2}=1,$$

$$s_Y^2=\frac{4+0+4}{2}=4.$$

So the standard deviations are 1 and 2, and covariance is 2:

$$r_{XY}=\frac{2}{1\times2}=\boxed{1}.$$

**Interpretation:** The relationship is perfectly positive and linear because every Y value equals $2X$. It still would not automatically prove a causal relationship in a real-world observational study.

### B5. Write the covariance and correlation matrices for B3–B4.

Covariance matrix:

$$
\boxed{\mathbf S=\begin{bmatrix}1&2\\2&4\end{bmatrix}}.
$$

Correlation matrix:

$$
\boxed{\mathbf R=\begin{bmatrix}1&1\\1&1\end{bmatrix}}.
$$

**Observation:** The covariance matrix is singular because one variable is an exact multiple of the other. This is the redundancy issue discussed in Chapter 16.

### B6. Identify the position of $x_{32}$ in a $5\times3$ data matrix.

**Answer:** The value in **row 3, column 2**: the second measured variable for the third case. The notation $x_{32}$ is a single cell, not the number 32.

### B7. Calculate the Euclidean distance from $(1,2)$ to $(4,6)$.

Coordinate differences are:

$$1-4=-3,\qquad2-6=-4.$$

Then:

$$
\begin{aligned}
d&=\sqrt{(-3)^2+(-4)^2}\\
&=\sqrt{9+16}\\
&=\boxed{5}.
\end{aligned}
$$

### B8. Find the Euclidean distance between $(1,2,3)$ and $(3,5,9)$.

$$
\begin{aligned}
d&=\sqrt{(1-3)^2+(2-5)^2+(3-9)^2}\\
&=\sqrt{4+9+36}\\
&=\boxed{7}.
\end{aligned}
$$

### B9. Let two independent variables have variances 9 and 1. Find the standardized statistical distance from $(0,0)$ to $(3,2)$.

$$
\begin{aligned}
d&=\sqrt{\frac{3^2}{9}+\frac{2^2}{1}}\\
&=\sqrt{1+4}\\
&=\boxed{\sqrt5\approx2.236}.
\end{aligned}
$$

Why is the contribution from the second variable larger? Its deviation is **two standard deviations**, while the first variable's deviation is only one standard deviation.

### B10. An independent two-variable model has variances 16 and 4. What are the horizontal and vertical intercepts of the constant-distance ellipse with $c=2$?

Equation:

$$\frac{x_1^2}{16}+\frac{x_2^2}{4}=2^2=4.$$

Horizontal intercepts set $x_2=0$:

$$x_1^2=64\quad\Rightarrow\quad x_1=\boxed{\pm8}.$$

Vertical intercepts set $x_1=0$:

$$x_2^2=16\quad\Rightarrow\quad x_2=\boxed{\pm4}.$$

This ellipse is twice as wide horizontally as vertically.

### B11. Explain the cross-product term in a two-variable Mahalanobis quadratic form.

A distance of the form

$$d_M^2=a_{11}\delta_1^2+2a_{12}\delta_1\delta_2+a_{22}\delta_2^2$$

includes **both individual differences and their interaction through covariance**. When the variables are correlated, the combined pattern of deviations can be common or unusual in ways not reflected by the separate squared differences alone.

### B12. Calculate the Mahalanobis distance from zero to $(2,-2)$ for the matrix $\mathbf S=\begin{bmatrix}4&2\\2&4\end{bmatrix}$.

The inverse is:

$$\mathbf S^{-1}=\frac1{12}\begin{bmatrix}4&-2\\-2&4\end{bmatrix}.$$

Therefore:

$$
\begin{aligned}
d_M^2&=\frac1{12}\{4(2)^2+2(-2)(2)(-2)+4(-2)^2\}\\
&=\frac{16+16+16}{12}=4.
\end{aligned}
$$

So:

$$\boxed{d_M=\sqrt4=2}.$$

**Do not forget the square root.** In R, `mahalanobis()` returns 4 for this example, while the distance itself is 2.

## Practice set C: method-choice scenarios

### C1. Predict whether a new flower is setosa, versicolor, or virginica using labeled old examples.

**Answer:** **Discriminant analysis** is the technique introduced in the lecture for known-group classification. Its predictive performance must be evaluated on data not used to train the classifier.

### C2. Test whether species differ simultaneously in sepal width and petal length.

**Answer:** **MANOVA**, because species is a grouping factor and there are **two quantitative outcome variables** to compare jointly. Specify and check relevant assumptions before formal inference.

### C3. Discover customer segments when there are no existing customer segment labels.

**Answer:** **Cluster analysis**, with an appropriate similarity measure and assessment of how useful and stable the groupings are.

### C4. Compress 20 correlated numeric customer variables into a few summary dimensions.

**Answer:** **PCA** is one possible approach if the aim is to retain directions of variation. Factor analysis would be more appropriate if the substantive question concerns underlying latent constructs explaining observed correlations.

### C5. Investigate the relationship between three marketing measures and two sales measures.

**Answer:** **Canonical correlation analysis**, which can examine correlated linear combinations of two sets of variables.

### C6. A company compares applicants' skills, experience, and salary expectations to find a new hire. Is every possible variable suitable for a numerical distance?

**Answer:** No. Salary expectation and numeric skill scores have meanings and units requiring careful handling; categories such as department preference should not simply be assigned arbitrary numerical distances. Data quality, fairness, context, and the chosen metric matter as much as the arithmetic.

## Practice set D: read and explain R code

### D1. What does `iris[, 1:4]` mean?

**Answer:** Select **all rows** (the blank before the comma) and columns **1 through 4**. In the built-in iris dataset those are the four numerical measurements. The categorical `Species` column is excluded.

### D2. What is the difference between `mean(iris$Petal.Length)` and `summary(iris$Petal.Length)`?

**Answer:** The first calculates a single number, the **mean petal length**. The second provides several statistics including minimum, quartiles, median, mean, and maximum.

### D3. Why is `round(cor(iris[, 1:4]), 3)` useful?

**Answer:** It calculates pairwise Pearson correlations among the four numerical measurements and displays each to three decimal places, making the matrix easier to read. The underlying relationships are not changed by rounding the displayed numbers.

### D4. Why must you be careful with `as.integer(iris$Species)`?

**Answer:** It converts factor levels to integers that may be convenient for **color indices**, but those integers do **not** make species a ratio-scale quantity. Arithmetic or Pearson correlation on arbitrary species codes would be a conceptual error.

### D5. What is the difference between `cov()` and `cor()`?

**Answer:** `cov()` measures **joint deviations in the original units** and produces the covariance matrix. `cor()` standardizes the covariance by the standard deviations and produces **unit-free Pearson correlations**, subject to the default arguments and appropriate data.

## 18.1 A final, connected conceptual challenge

A researcher gives you 200 customers with measurements of income, age, spending, and number of purchases. They also have a known `WillLeave` label for each customer. Explain the following, in order:

1. Which variables are continuous, discrete, and categorical?
2. How is the data matrix organized?
3. Which descriptive statistics would you calculate before modeling?
4. Which two-variable graphs would you inspect?
5. Why might raw Euclidean distance be misleading?
6. Which method family is suitable for predicting `WillLeave`?
7. Why does a model's apparent training accuracy not prove future accuracy?

**Guided answer:** Income and spending are usually continuous numeric quantities, age depends on how measured, purchases are discrete counts, and `WillLeave` is nominal binary. Each row is a customer. For the four numerical variables, a matrix could be $200\times4$ after appropriate treatment of age. Examine means, medians, spreads, distributions, covariance and correlation; use scatterplots and group comparisons. Raw Euclidean distance mixes units and scales, so standardization or covariance-aware measures may be needed depending on method. A **supervised classification** method addresses the known churn label. Evaluate its performance on independent or properly cross-validated cases because fitting the observed sample is not the same as predicting new outcomes.

---

# Chapter 19. Formula and notation companion

*This chapter is a consolidation of formulas explained in earlier chapters, not a substitute for the worked teaching.*

## 19.1 Notation dictionary

| Symbol | Meaning |
|---|---|
| $n$ | Number of cases or rows |
| $p$ | Number of measured variables or columns |
| $j$ | Index of a case, $j=1,\ldots,n$ |
| $i,k$ | Indices of variables, each from $1$ to $p$ |
| $x_{jk}$ | Value of variable $k$ recorded for case $j$ |
| $\mathbf X$ | $n\times p$ data matrix |
| $\bar x_k$ | Sample mean of variable $k$ |
| $\bar{\mathbf x}$ | $p\times1$ mean vector |
| $s_{kk}$ or $s_k^2$ | Sample variance of variable $k$ |
| $s_k$ | Sample standard deviation of variable $k$ |
| $s_{ik}$ | Sample covariance of variables $i,k$ |
| $\mathbf S$ | $p\times p$ covariance matrix |
| $r_{ik}$ | Pearson correlation for variables $i,k$ |
| $\mathbf R$ | $p\times p$ correlation matrix |
| $P,Q$ | Points, each described by coordinates |
| $d(P,Q)$ | Distance between points $P,Q$ |
| $\theta$ | Rotation angle in correlated-coordinate geometry |
| $\tilde x_i$ | Rotated coordinate $i$ |
| $\boldsymbol\delta$ | Difference vector $\mathbf x-\mathbf y$ |
| $\mathbf S^{-1}$ | Inverse covariance matrix, when it exists |
| ${\mathsf T}$ | Matrix or vector transpose |

## 19.2 Basic sample summaries

Sample mean:

$$
\boxed{\bar x_k=\frac1n\sum_{j=1}^{n}x_{jk}}.
$$

Sample variance:

$$
\boxed{s_{kk}=\frac1{n-1}\sum_{j=1}^{n}(x_{jk}-\bar x_k)^2}.
$$

Sample standard deviation:

$$
\boxed{s_k=\sqrt{s_{kk}}}.
$$

Sample covariance:

$$
\boxed{s_{ik}=\frac1{n-1}\sum_{j=1}^{n}(x_{ji}-\bar x_i)(x_{jk}-\bar x_k)}.
$$

Sample Pearson correlation:

$$
\boxed{r_{ik}=\frac{s_{ik}}{\sqrt{s_{ii}s_{kk}}}}.
$$

## 19.3 Data summary matrices

Mean vector:

$$
\bar{\mathbf x}=
\begin{bmatrix}\bar x_1\\\bar x_2\\\vdots\\\bar x_p\end{bmatrix}.
$$

Covariance matrix:

$$
\mathbf S=
\begin{bmatrix}
s_{11}&s_{12}&\cdots&s_{1p}\\
s_{21}&s_{22}&\cdots&s_{2p}\\
\vdots&\vdots&\ddots&\vdots\\
s_{p1}&s_{p2}&\cdots&s_{pp}
\end{bmatrix}.
$$

Correlation matrix:

$$
\mathbf R=
\begin{bmatrix}
1&r_{12}&\cdots&r_{1p}\\
r_{21}&1&\cdots&r_{2p}\\
\vdots&\vdots&\ddots&\vdots\\
r_{p1}&r_{p2}&\cdots&1
\end{bmatrix}.
$$

Both $\mathbf S$ and $\mathbf R$ are symmetric when defined; entries $s_{ik}=s_{ki}$ and $r_{ik}=r_{ki}$.

## 19.4 Distances

Euclidean:

$$
\boxed{d_E(P,Q)=\sqrt{\sum_{k=1}^{p}(x_k-y_k)^2}}.
$$

Independent-coordinate variance-adjusted:

$$
\boxed{d_S(P,Q)=\sqrt{\sum_{k=1}^{p}\frac{(x_k-y_k)^2}{s_{kk}}}}.
$$

Full Mahalanobis (invertible positive-definite covariance):

$$
\boxed{d_M(P,Q)=\sqrt{(\mathbf x-\mathbf y)^{\mathsf T}\mathbf S^{-1}(\mathbf x-\mathbf y)}}.
$$

Two-variable general quadratic form:

$$
\boxed{d_M^2=a_{11}\delta_1^2+2a_{12}\delta_1\delta_2+a_{22}\delta_2^2}.
$$

Two-dimensional rotation:

$$
\boxed{
\tilde x_1=x_1\cos\theta+x_2\sin\theta,\qquad
\tilde x_2=-x_1\sin\theta+x_2\cos\theta}.
$$

## 19.5 Four essential metric properties

$$
\begin{aligned}
d(P,Q)&=d(Q,P),\\
P\ne Q&\implies d(P,Q)>0,\\
d(P,P)&=0,\\
d(P,Q)&\le d(P,R)+d(R,Q).
\end{aligned}
$$

For Mahalanobis distance as a true metric, use a fixed **positive-definite** covariance matrix, not just arbitrary numbers in a quadratic expression.

---

# Chapter 20. Source coverage and careful-reading notes

## 20.1 A page-by-page coverage audit

The table below was prepared by checking the provided 20-page PDF's text and figures against this teaching book. **Included** means that the source topic is explained here; it does **not** mean every sentence was reproduced verbatim, since this is a new teaching narrative rather than a transcription.

| PDF page | Material in the original lecture | Main explanation in this book |
|---:|---|---|
| 1 | Definition of multivariate analysis; univariate, bivariate, and multivariate data; first survey examples | Chs. 1–3 |
| 2 | Medical and skull examples; customer analytics; dimension reduction, classification | Chs. 3–4 |
| 3 | Clustering; categorical/numeric variables, nominal/ordinal/discrete/continuous; metadata and coding | Chs. 4–5 |
| 4 | Stevens' nominal/ordinal/interval/ratio scales; $n,p,x_{jk}$ indexing and arrays | Chs. 6–7 |
| 5 | Data matrix $\mathbf X$; advantages of matrices; sample means; beginning of variance | Chs. 7–8 |
| 6 | Variance, standard deviation, covariance, correlation; mean vector; $\mathbf S$, $\mathbf R$ | Chs. 8–9 |
| 7 | Symmetry of $\mathbf S,\mathbf R$; EDA goals; iris scatterplot matrix (Figure 1) | Chs. 9–10 |
| 8 | Limits of pairwise plots; parallel coordinates (Figure 2); species pattern interpretation | Ch. 10 |
| 9 | Reordered parallel coordinates (Figure 3); stars and Chernoff faces; iris historical background and variable description | Chs. 10–11 |
| 10 | Iris species photographs and credited image source; `data()`, `str()`, `head()`, `tail()` | Ch. 11 |
| 11 | Dataset exploration goals; `summary()` values and species counts; `psych::describe()` | Ch. 11 |
| 12 | `describe()` columns; petal threshold subset; group boxplots, histograms; `cor()` | Ch. 11 |
| 13 | Iris correlation matrix; scatterplot matrices with color and legend; `MASS::parcoord()`; start of species-difference question | Chs. 11–12 |
| 14 | MANOVA, discriminant analysis, PCA, factor analysis, start of clustering question | Ch. 12 |
| 15 | Cluster analysis, canonical correlation; Euclidean distance in 2 and $p$ dimensions; hypersphere | Chs. 12–13 |
| 16 | Statistical/Mahalanobis distance motivation; independent variables, Figure 4; standardized coordinates | Ch. 14 |
| 17 | Equal-distance ellipse (Figure 5); independent statistical distance for arbitrary points and $p$ dimensions | Ch. 14 |
| 18 | Correlated data and rotated axes (Figure 6); transformed coordinates and quadratic form | Ch. 15 |
| 19 | Expanded $a_{11},a_{22},a_{12}$ formulas; arbitrary-point quadratic distance; rotated ellipse (Figure 7); start of $p$-dimensional form | Ch. 15 |
| 20 | General $p$-dimensional distance expansion; four metric properties; Johnson–Wichern reference | Chs. 15–16 |

## 20.2 Clarifications where precise reading matters

These notes are important because a student should understand the intent of the source **without absorbing an imprecise formula or overclaim**.

1. **Covariance and correlation indices (PDF p. 6):** The displayed expressions print a constraint that appears as $i=k=1,2,\ldots,p$. For covariance or pairwise correlation, the meaningful general statement is **$i,k\in\{1,\ldots,p\}$**, allowing two **different** variables. If $i=k$, covariance becomes variance and correlation with oneself is 1 when nonconstant. Chapters 9 and 19 give the general formulas.
2. **Association versus causation (PDF p. 1):** Two-variable data analysis may investigate causal questions, but association alone cannot establish cause. Chapters 2–3 distinguish them.
3. **Measurement scales (PDF p. 4):** The discussion of temperature should be read as applying to familiar **Celsius/Fahrenheit interval scales**; **Kelvin**, with absolute zero, is a ratio scale. Chapter 6 explains the distinction.
4. **Sample standard deviation (PDF p. 6):** The square root is taken of the **variance**, so $s_k=\sqrt{s_{kk}}$. Chapter 8 emphasizes units.
5. **MANOVA description (PDF p. 14):** MANOVA's usual group-mean inference uses the covariance among outcomes, but is not by itself a direct test of whether group covariance or correlation matrices differ. Chapter 12 separates these issues.
6. **PCA description (PDF p. 14):** PCA prioritizes directions of observed variance, **not guaranteed classification accuracy**. Chapter 12 makes that modeling distinction explicit.
7. **Cluster interpretation (PDF pp. 14–15):** Clusters formed without species labels do not automatically equal true species. Chapter 12 explains why.
8. **Equal variances and Euclidean distance (PDF p. 17):** When all independent-coordinate variances equal $\sigma^2$, statistical distance equals Euclidean distance **divided by $\sigma$**. Their rankings agree, but raw numerical distances need not be identical. Chapter 14 derives the relationship.
9. **Rotated axes (PDF p. 18):** To use a diagonal variance-based distance after rotation without a cross-covariance term, the rotation must align with covariance principal axes so that the rotated coordinates are uncorrelated. Chapter 15 explains the requirement.
10. **Nonnegative quadratic forms (PDF p. 20):** Nonnegativity alone does not guarantee zero distance only for identical points. A positive-definite matrix supplies the usual Mahalanobis metric property for nonidentical points. Chapter 16 explains the difference.
11. **R plotting legends (PDF p. 13):** The source illustrates color-based species plotting. In Chapter 11 the executable legend code uses an explicit consistent color mapping rather than relying on category strings as possible color values.
12. **Iris as a clean teaching dataset (PDF p. 11):** The absence of a major data-cleaning step is specific to the tutorial. It does not mean real multivariate datasets can skip cleaning and validation.

## 20.3 References mentioned in the original lecture

The following are **references and links printed or identified in the provided PDF**, not materials independently read or verified in producing this teaching book:

- **Stevens, S. S. (1966).** “Mathematics, measurement and psychophysics,” pp. 1–49, in the *Handbook of Experimental Psychology*. The lecture's p. 4 footnote credits this work for measurement scale classification. The wording and details here follow the lecture's reference information.
- **Johnson, R. A., and Wichern, D. W.** *Applied Multivariate Statistical Analysis*. The lecture refers readers to pp. 26–30 for star plots and Chernoff faces (PDF p. 9), and pp. 30–37 for more on distance (PDF p. 20). No independent book edition or page-content verification is claimed here.
- **Fisher's/Anderson's iris dataset.** The PDF p. 9 includes an encyclopedia link for background: <https://en.wikipedia.org/wiki/Iris_flower_data_set>. The historical description in this book is based on the supplied lecture.
- **DataCamp image attribution.** The flower images on the lecture's PDF p. 10 credit <https://www.datacamp.com/tutorial/machine-learning-in-r>. This Markdown book describes the photographs rather than republishing the image.

## 20.4 What belongs to this introductory lecture, and what is added teaching?

The **lecture's core scope** is: meaning and goals of multivariate analysis; examples; measurement types and scales; organization of multivariate observations; means, variances, covariance and correlation; exploratory graphics; the iris dataset and its R-based exploration; a survey of multivariate techniques; Euclidean distance; statistical/Mahalanobis distance for independent and correlated measurements; and metric properties.

**Additional teaching** in this book includes: a complete statistics and notation primer; extended sample-vs-population discussion; hand-computed toy datasets; detailed R syntax explanations; expanded ANOVA/MANOVA/PCA/FA/CCA distinctions; introductory eigenvector language; inverse-covariance matrix derivation; simulated business practice; advice on data leakage, outliers, and model validation; and original self-check exercises. These additions are intended to make the source teachable, **not to attribute new content or examination demands to the lecturer**.

---

## Closing perspective: the connecting idea

A multivariate dataset is a collection of **whole cases**, each measured using several variables. The first job is to understand the variables and their measurement scales. The second is to describe their **individual variation and joint relationships**. The third is to choose an analysis whose objective matches the decision: comparing groups, predicting labels, finding clusters, simplifying variables, or understanding related sets of measurements.

The final part of the lecture reveals a unifying geometric principle. Two observations are not similar merely because their raw numbers are close. Meaningful similarity can depend on **measurement scale, natural variability, and correlation**. That is why the course develops matrices, covariance, and correlation before introducing statistical distance. These foundations will keep appearing as you learn more advanced multivariate methods.

### Verification scope for this document

The source coverage table above was checked against the **20 pages** of the supplied PDF, including its plots, numbered figures, equations, printed R commands, and reference notes. The worked means, sample covariance/correlation, Euclidean examples, and the two-variable Mahalanobis arithmetic were checked independently. The R commands have been reviewed for syntax and intent, but **were not executed in an R environment** during preparation; package versions and graphics-window sizes can affect output or plotting layout. This is a source-based teaching expansion and not independent verification of the externally linked references.

---

**End of Lecture 01 teaching book.**
