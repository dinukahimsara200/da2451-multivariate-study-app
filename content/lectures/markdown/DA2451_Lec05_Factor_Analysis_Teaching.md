# DA2451 | Lecture 05: Factor Analysis
## A complete, from-zero teaching book for Multivariate Methods in Business

**Primary source:** *Lec5.pdf*, “Factor analysis,” DA2451 – Multivariate Methods in Business, Semester 4, 2023, 15 pages.

**Audience:** A reader who is learning statistics, multivariate analysis and R for the first time.

**What this book does:** It teaches the full conceptual and practical journey in the lecturer's handout: why factor analysis exists; exploratory and confirmatory approaches; its relationship with PCA; a hypothetical student-ability example; the operational-management survey; R data preparation; Pearson and polychoric correlations; factorability tests; factor retention; minimum-residual and maximum-likelihood EFA; factor rotation and interpretation; fit diagnostics; diagrams; advantages and limitations; factor scores; and regression and prediction using those scores. Additional mathematical explanations, exercises and practical cautions are identified as **Teaching extension**. Printed figures and results are discussed with their original PDF page numbers.

> **Source integrity.** All values explicitly labeled *Lecture result* come from the supplied PDF. New invented numbers used to illustrate an idea are labeled *Teaching example*, not results from the lecture. Short snippets of original R are restored to ordinary R syntax because spaces inserted by PDF text extraction are not valid R. The original lecture has several small ambiguities, identified separately instead of silently changed. This document does **not** claim its R programs were executed during authorship; R results not present in the PDF are not fabricated.

---

## How to study this book

If Factor Analysis is completely unfamiliar, read Parts I through III before typing any R. They explain what the computer is trying to discover. In Part IV, follow the lecturer's survey example in the order shown. Part V tells you how to turn the output into statistical conclusions and how to use scores in regression. Part VI provides an R workflow, study questions, formula glossary, and a page-by-page source coverage check.

**Five questions you should be able to answer by the end:**

1. Why can 12 questionnaire responses sometimes be represented by four underlying constructs?
2. What is the difference between a principal component and a common latent factor?
3. Why check correlations, KMO, Bartlett's test and the correlation determinant before fitting EFA?
4. How do loadings, communalities, uniquenesses, rotation and fit diagnostics fit together?
5. How are estimated factor scores used to predict an outcome, and what are the limits of doing so?

## Contents

- [Part I. The problem factor analysis solves](#part-i-the-problem-factor-analysis-solves)
  - [1. Why many variables can hide a few ideas](#1-why-many-variables-can-hide-a-few-ideas)
  - [2. The minimum statistical foundations](#2-the-minimum-statistical-foundations)
  - [3. Latent factors and the student-abilities example](#3-latent-factors-and-the-student-abilities-example)
  - [4. EFA versus CFA versus PCA](#4-efa-versus-cfa-versus-pca)
- [Part II. How the factor model works](#part-ii-how-the-factor-model-works)
  - [5. From a story to a mathematical model](#5-from-a-story-to-a-mathematical-model)
  - [6. Factor loadings, communalities and uniquenesses](#6-factor-loadings-communalities-and-uniquenesses)
  - [7. Extraction, rotation, factor scores and assumptions](#7-extraction-rotation-factor-scores-and-assumptions)
- [Part III. Prepare the lecturer's dataset](#part-iii-prepare-the-lecturers-dataset)
  - [8. R setup and the operational-management survey](#8-r-setup-and-the-operational-management-survey)
  - [9. Read, describe and clean the data](#9-read-describe-and-clean-the-data)
  - [10. Explore correlations and ordinal responses](#10-explore-correlations-and-ordinal-responses)
- [Part IV. Decide whether and how many factors to extract](#part-iv-decide-whether-and-how-many-factors-to-extract)
  - [11. Factorability: KMO, Bartlett and determinant](#11-factorability-kmo-bartlett-and-determinant)
  - [12. How many factors? Eigenvalues, scree and parallel analysis](#12-how-many-factors-eigenvalues-scree-and-parallel-analysis)
- [Part V. Fit, interpret and use the model](#part-v-fit-interpret-and-use-the-model)
  - [13. Four-factor MINRES model with psych::fa](#13-four-factor-minres-model-with-psychfa)
  - [14. Reading every important loading and variance summary](#14-reading-every-important-loading-and-variance-summary)
  - [15. Does the factor model fit?](#15-does-the-factor-model-fit)
  - [16. Maximum-likelihood EFA with stats::factanal](#16-maximum-likelihood-efa-with-statsfactanal)
  - [17. A factor diagram and an evidence-based interpretation](#17-a-factor-diagram-and-an-evidence-based-interpretation)
  - [18. Advantages, limitations and common mistakes](#18-advantages-limitations-and-common-mistakes)
  - [19. From factor scores to a regression model](#19-from-factor-scores-to-a-regression-model)
  - [20. Test-set predictions, VIF and RMSE](#20-test-set-predictions-vif-and-rmse)
- [Part VI. Practical and examination companion](#part-vi-practical-and-examination-companion)
  - [21. Reproducible end-to-end R script](#21-reproducible-end-to-end-r-script)
  - [22. What to report, and how to write the conclusions](#22-what-to-report-and-how-to-write-the-conclusions)
  - [23. Worked numerical practice](#23-worked-numerical-practice)
  - [24. Exam-style questions with explained answers](#24-exam-style-questions-with-explained-answers)
  - [25. Glossary, formula sheet and source audit](#25-glossary-formula-sheet-and-source-audit)

---

# Part I. The problem factor analysis solves

## 1. Why many variables can hide a few ideas

### 1.1 Start with an ordinary business problem

Imagine you work at a factory. You want to understand **how well the factory is managed**. You ask employees 12 questions:

- Three questions concern sharing and using knowledge.
- Three concern quality checks.
- Three concern monitoring production costs.
- Three concern controlling production activities.

You might have 259 responses for each question. That sounds like a lot of information, and it is. But there is a practical difficulty: how can a manager think clearly about 12 separate columns? If knowledge-related questions all move together, perhaps they are different signs of **one underlying ability of the organization: Knowledge Management**.

The same idea could apply to quality, costs and production control. What originally appeared to be 12 different measurements might be understood in terms of four broader concepts. The original 12 answers are still available; the aim is to **discover a simpler structure that explains their relationships**.

The lecturer calls this **dimensionality reduction**. It means describing a dataset with fewer meaningful dimensions than its original number of variables. The lecturer introduces Factor Analysis after PCA as another approach to that problem (PDF p. 1).

### 1.2 Dimensions do not mean spatial directions only

A dimension in a dataset is a characteristic recorded for each observation. If you record someone's height, weight and age, you have three measured variables, or three data dimensions. A questionnaire with 12 questions has 12 observed dimensions. A table with 259 respondents and 12 questions therefore contains **259 rows and 12 measured-variable columns**.

The important distinction is between:

- **Number of people or records:** how many rows we have.
- **Number of measured variables:** how many columns describe each record.
- **Number of latent factors:** how many hidden constructs we infer to account for the pattern across those measured columns.

Reducing 12 variables to four factors does **not** mean throwing away 255 respondents. The number of rows can remain 259, while the number of summary columns becomes four.

### 1.3 Why not just average the questions?

An average works when you already know which questions belong together, measure the same thing reasonably well, and can be scored in a common direction. But what if the hidden groups are unknown? What if a question partly reflects both Quality Control and Cost Tracking? What if some questions are weak indicators?

**Exploratory Factor Analysis (EFA)** investigates those patterns rather than immediately assuming which questions form a scale. It does not create meaning out of nothing: the researcher must still interpret the statistical groupings in light of the questions' actual content.

### 1.4 Other situations where hidden constructs matter

**Teaching example: Customer satisfaction.** A retailer measures “staff helpfulness,” “response time,” “complaint resolution,” “product reliability,” “defect rate” and “product durability.” The first three may reflect a **service experience** factor, while the last three reflect a **product quality** factor. These are plausible constructs, not a guarantee of what a real dataset would show.

**Teaching example: Student abilities.** Scores for arithmetic, algebra, geometry and statistics may reflect a common mathematical ability. Creative writing, literature and spelling might reflect a writing ability. A factor is inferred from the common pattern, rather than observed directly.

**Teaching example: Workplace climate.** Responses about trust, feedback and inclusion may reflect an underlying team climate. But these questions can overlap, so exploration and domain expertise are both important.

**Core idea:** We observe a *pattern of answers*, then ask whether a smaller set of unseen constructs can reasonably explain why some answers go together.

## 2. The minimum statistical foundations

Before factor analysis, we need a gentle but precise understanding of data, variation and correlation.

### 2.1 Observation, variable, value, matrix

A **variable** is something recorded, such as an answer to KM1. An **observation** is one respondent or one factory. A **value** is the recorded number for one observation and variable. A **data matrix** is a rectangular arrangement of these values.

A small teaching example:

| Student | Algebra | Geometry | Writing |
|---|---:|---:|---:|
| A | 80 | 85 | 40 |
| B | 70 | 75 | 50 |
| C | 40 | 45 | 90 |
| D | 50 | 55 | 80 |

Here there are four observations and three measured variables. We might write the numerical part as a matrix named $X$, with $n=4$ rows and $p=3$ columns. The notation $n \times p$ means **rows by columns**.

### 2.2 The mean is a typical value

For numbers $x_1,\ldots,x_n$,

\[
\bar{x}=\frac{x_1+x_2+\cdots+x_n}{n}.
\]

Symbols: $x_i$ is the value for observation $i$; $n$ is the number of observations; $\bar{x}$ is the arithmetic mean.

**Teaching example:** Three answers are 2, 3 and 4. Their mean is $(2+3+4)/3=3$. The mean describes the center, but tells us nothing about how spread out the numbers are.

### 2.3 Variance measures spread

People may share the same mean yet differ greatly in their answers. Variance measures the average *squared deviation* from the mean. The usual sample formula is

\[
s_x^2=\frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar{x})^2.
\]

A step-by-step teaching calculation for 2, 3, 4:

1. Mean: $\bar{x}=3$.
2. Differences: $-1,0,1$.
3. Squared differences: $1,0,1$.
4. Sum of squares: $2$.
5. Sample variance: $s_x^2=2/(3-1)=1$.

The **standard deviation** is the square root of variance: $s_x=\sqrt{s_x^2}=1$ in this example. Standard deviation is easier to interpret because it uses the original unit of the measurement.

### 2.4 Covariance asks whether two variables change together

Suppose students who score highly in algebra also tend to score highly in geometry. They *co-vary*. The sample covariance is

\[
s_{xy}=\frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar{x})(y_i-\bar{y}).
\]

Read the formula as: for each person, multiply how far their $x$ is above or below average by how far their $y$ is above or below average, add these products, then divide by $n-1$.

- **Positive covariance:** above-average $x$ tends to accompany above-average $y$.
- **Negative covariance:** above-average $x$ tends to accompany below-average $y$.
- **Near-zero covariance:** there may be little *linear* tendency for the two variables to move together.

Covariance depends on measurement units. Therefore it is awkward for comparing associations between different variables.

### 2.5 Correlation standardizes the relationship

The Pearson correlation is

\[
r_{xy}=\frac{s_{xy}}{s_xs_y}.
\]

Here $s_{xy}$ is sample covariance; $s_x$ and $s_y$ are standard deviations of the two variables. For nonconstant variables, the value lies between $-1$ and $+1$.

| Correlation | Interpretation |
|---:|---|
| $+1$ | Perfect increasing straight-line relationship |
| $+0.8$ | Strong positive linear association |
| $+0.2$ | Weak positive linear association |
| $0$ | No linear association; nonlinear dependence may still exist |
| $-0.7$ | Fairly strong negative linear association |
| $-1$ | Perfect decreasing straight-line relationship |

**Teaching example:** If arithmetic and algebra are highly positively correlated, that is a clue they might share a common latent construct. It is not proof of “mathematical ability,” nor of a cause-and-effect relationship.

### 2.6 Why standardization can matter

For an observation $x_i$, a standardized score is

\[
z_i=\frac{x_i-\bar{x}}{s_x}.
\]

A $z$ score of $+1$ means one standard deviation above the variable's mean. A $z$ score of $-2$ means two standard deviations below. Standardization makes variables comparable in terms of variation. Correlation-based factor analysis uses this idea implicitly: its input correlation matrix has 1 on the diagonal for every variable (assuming ordinary nonconstant data).

**Important nuance:** A variable such as an ordered 1–5 survey response is not automatically a truly continuous measurement just because it contains numbers. That distinction will matter when we choose Pearson or polychoric correlations.

### 2.7 A correlation matrix is a map of relationships

If we have $p$ observed variables, their correlation matrix $R$ is a $p\times p$ table. For three variables, it looks like

\[
R=\begin{bmatrix}
1&r_{12}&r_{13}\\
r_{12}&1&r_{23}\\
r_{13}&r_{23}&1
\end{bmatrix}.
\]

The diagonal is 1 because each variable correlates perfectly with itself. The table is symmetric because $r_{12}=r_{21}$. In EFA we ask: **Can this entire web of correlations be explained approximately using just a few hidden factors?**

### 2.8 Why correlation is not the whole story

Correlation can arise because of a common cause, direct influence, selection effects, chance or other mechanisms. In a factor model, a *common-factor explanation* is deliberately proposed. Good fit does not prove that the proposed latent factors are biological, psychological or organizational causes. Naming the factors remains a human judgment.

## 3. Latent factors and the student-abilities example

### 3.1 Observable versus latent

An **observed variable** is directly recorded: an exam score or an answer such as 4 out of 5. A **latent variable** is not directly recorded. We infer it from several observable indicators.

Think of wind. We cannot see “wind” itself as a colored object, but we can see flags moving and leaves bending. The visible effects are not perfect measures, but together they provide information about the unobserved phenomenon. The analogy is imperfect because factor analysis examines statistical covariation rather than directly proving a physical mechanism.

### 3.2 The lecturer's hypothetical student example (PDF p. 1)

The lecture displays six students and seven subject scores. They are grouped into two *illustrative*, *hypothetical* factors:

- **Factor 1: Mathematical ability**, associated with Arithmetic, Algebra, Geometry and Statistics.
- **Factor 2: Writing ability**, associated with Creative Writing, Literature and Spelling/Grammar.

The figure on page 1 makes a conceptual point: seven test scores might be understandable through two broader patterns. **The figure is not presented as a fitted EFA output**. The factor names were supplied to demonstrate an idea, not established by a statistical test in that figure.

Here is the exact tabular information displayed in the lecturer's illustrative figure:

| Student | Arithmetic | Algebra | Geometry | Statistics | Creative writing | Literature | Spelling/Grammar |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1 | 45 | 22 | 67 | 58 | 76 | 87 | 93 |
| 2 | 22 | 53 | 75 | 19 | 86 | 69 | 90 |
| 3 | 90 | 94 | 75 | 85 | 32 | 46 | 55 |
| 4 | 56 | 63 | 68 | 53 | 67 | 61 | 58 |
| 5 | 44 | 52 | 35 | 64 | 77 | 82 | 76 |
| 6 | 89 | 79 | 93 | 94 | 56 | 43 | 60 |

**How to read it without running anything:** Student 3 is relatively strong in several mathematical subjects and comparatively weaker in writing-related subjects. Student 1 shows a different pattern. The example encourages us to look for groups of variables with similar behavior across students.

**Teaching caution:** The sample is only six students. Do not use this tiny illustration as evidence that a two-factor solution has been statistically validated. The source says we *might* find and interpret two factors.

### 3.3 From grouping questions to understanding people

A factor analysis produces two related kinds of information:

1. **Loadings** describe *which observed variables* are associated with each factor.
2. **Estimated factor scores** describe *where each respondent* lies on each factor, subject to estimation uncertainty.

For the student example, loadings answer “Which subjects measure mathematical ability?” Scores answer “Which students are relatively higher or lower on the inferred mathematical ability?” These are different questions. The distinction becomes crucial for the lecture's later regression example.

## 4. EFA versus CFA versus PCA

### 4.1 EFA: discover a plausible factor structure

**Exploratory Factor Analysis** begins with observed variables and explores how their shared correlations can be represented by fewer factors. You specify or compare candidate numbers of factors, then examine loadings to interpret what the factors appear to represent.

EFA is well suited when you want to learn *which indicators go together*, though you should still have a sensible research design and sufficient sample information. In the lecture, EFA is the focus (PDF pp. 1–2).

### 4.2 CFA: test a structure proposed in advance

**Confirmatory Factor Analysis** starts with a model grounded in prior evidence or theory. Before looking at the results, a researcher specifies relationships such as “KM1, KM2 and KM3 measure Knowledge Management, and QC1, QC2 and QC3 measure Quality Control.” CFA evaluates how well the observed data agree with the proposed measurement structure. It is not simply “EFA but with better results.” It asks a different, more explicitly hypothesis-driven question.

**Teaching extension:** CFA is often fitted using structural equation modeling tools such as the R package `lavaan`; the lecture introduces its purpose but does not teach CFA syntax, model identification or CFA estimation. Those topics are not attributed to the lecturer.

### 4.3 PCA: summarize total observed variation

**Principal Component Analysis (PCA)** starts from the measured variables and forms weighted sums called *principal components*. For standardized observed variables $Z_1,Z_2,Z_3$, a component might be

\[
PC_1=w_1Z_1+w_2Z_2+w_3Z_3.
\]

Here $w_1,w_2,w_3$ are weights chosen to make the first component capture as much variation as possible, subject to a normalization constraint. Subsequent components capture the greatest remaining variance subject to being orthogonal to earlier ones.

For $p$ measured variables of full rank, PCA mathematically supplies $p$ components, although you typically **keep only a subset**. The lecturer uses this as a contrast with EFA (PDF p. 2).

### 4.4 The decisive difference: total variance versus common variance

The contrast is not only whether a computer prints “component” or “factor.” It is **what the method tries to explain**.

- **PCA** is a mathematical transformation of the *total observed variation* in the input variables. It is excellent for compression and producing uncorrelated summaries, but it does not require a latent measurement model.
- **Common Factor Analysis (EFA)** proposes that observed variables share variation because of latent factors. It separates shared factor-related variation from variable-specific variation, rather than demanding that a few factors explain everything.

A response can differ because of the common construct, a question-specific influence, or measurement error. EFA explicitly allows the latter two to remain unexplained by the common factors. PCA does not make that same common/unique decomposition.

### 4.5 Comparison table to learn, not memorize blindly

| Question | PCA | EFA | CFA |
|---|---|---|---|
| Main goal | Summarize observed total variance | Explore latent common-factor structure | Test a hypothesized factor structure |
| Starting point | Observed variables | Observed correlations and candidate factor counts | Prior model: factor count and loading pattern |
| Basic result | Weighted component scores and weights | Loadings, communalities, uniquenesses and possible factor scores | Estimated measurement model and fit information |
| Variance targeted | Total observed variance | Shared/common variation | Shared variation according to a specified model |
| Unique item variance model? | Not explicitly as in common FA | Yes | Yes |
| Does rotation arise? | Optional in some component approaches | Often useful for interpretation | Loadings typically constrained by prior model rather than explored through arbitrary rotation |
| Choice of dimension count | Usually retain some of the available components | Must select a factor count to fit; often compare several | Factor structure specified beforehand |
| Best one-line memory | “Summarize the columns.” | “Discover hidden constructs suggested by column relationships.” | “Test my proposed hidden-construct structure.” |

### 4.6 A worked conceptual contrast

Suppose five customer ratings are all positively correlated. PCA might compress all five into a strong first component that captures overall rating variation. EFA might instead ask whether *Service* and *Product Quality* account for the particular pattern of cross-item correlations. If one item is largely noise, PCA still treats its variance as part of the total variation to be accounted for; EFA can assign much of it to uniqueness.

**Exam trap:** A PCA component is not automatically a latent factor. Calling the first principal component “customer satisfaction” does not by itself make it evidence of a causal or psychological hidden construct.

---

# Part II. How the factor model works

## 5. From a story to a mathematical model

The lecturer does not develop the matrix factor model as a formal derivation. The following section is a **Teaching extension** supplied so that later R output makes genuine mathematical sense.

### 5.1 The simplest factor equation

Imagine a single standardized questionnaire item, $Z_1$, measures Knowledge Management. We can express it as

\[
Z_1=\lambda_{11}F_1+\varepsilon_1.
\]

Every symbol has a specific meaning:

- $Z_1$: respondent's **standardized observed answer** to item 1.
- $F_1$: respondent's level on a **latent common factor**.
- $\lambda_{11}$: the **loading**, measuring the strength and direction of the item's relation to the factor.
- $\varepsilon_1$: the part of the observed response not explained by that common factor.

The factor part captures what the item shares with other indicators. The $\varepsilon_1$ term allows the item to differ for its own reasons. It does **not** automatically mean somebody made a careless measurement mistake. Unique content, random error and other influences can all contribute.

### 5.2 Two factors can contribute to one item

A survey question about “meeting targets without wasting materials” might relate to both Production Control and Cost Tracking:

\[
Z_1=0.7F_1+0.3F_2+\varepsilon_1.
\]

This is a **Teaching example**, not a result of the lecturer's dataset. A loading of $0.7$ means a stronger relation to $F_1$ than the $0.3$ relation to $F_2$, all else equal under the model. If both were large, the item might be a *cross-loading item*: it measures more than one construct clearly.

### 5.3 Many observed variables, several factors

For observed item $i$ and $m$ factors,

\[
Z_i=\lambda_{i1}F_1+\lambda_{i2}F_2+\cdots+\lambda_{im}F_m+\varepsilon_i.
\]

Here $i$ identifies the item (for example KM1), and $j$ identifies the latent factor. The coefficient $\lambda_{ij}$ is the loading of item $i$ on factor $j$. The number $m$ is chosen by the analyst. For the lecture's final survey solution, $p=12$ observed indicators and $m=4$ extracted factors.

### 5.4 Matrix notation without the mystery

The individual equations can be collected as

\[
\mathbf z=\mathbf\Lambda\mathbf f+\boldsymbol\varepsilon.
\]

| Symbol | Size in the lecture's four-factor model | Meaning |
|---|---|---|
| $\mathbf z$ | $12\times1$ | One respondent's 12 standardized item answers |
| $\mathbf\Lambda$ | $12\times4$ | Loadings of 12 items on four factors |
| $\mathbf f$ | $4\times1$ | Four unobserved factor values for that respondent |
| $\boldsymbol\varepsilon$ | $12\times1$ | Twelve item-specific residuals |

Matrix multiplication makes the dimensions work: $(12\times4)(4\times1)$ gives a $12\times1$ vector, to which another $12\times1$ residual vector can be added. This is the compact version of 12 separate item equations.

### 5.5 What structure is predicted for correlations?

For standardized observations and orthogonal factors, under the usual model assumptions,

\[
\boxed{R\approx\Lambda\Lambda^\mathsf T+\Psi.}
\]

- $R$: the observed $12\times12$ correlation matrix.
- $\Lambda$: the $12\times4$ loading matrix.
- $\Lambda^\mathsf T$: its transpose, with rows and columns exchanged.
- $\Psi$: a $12\times12$ diagonal matrix containing uniquenesses.

This means that **predicted correlations between different questions** come primarily from how the questions load on the same factors. The residual matrix $R-\widehat R$ shows how far the fitted model misses the observed correlations.

For *correlated* factors, the more general equation is

\[
R\approx\Lambda\Phi\Lambda^\mathsf T+\Psi,
\]

where $\Phi$ is the factor-correlation matrix. Under Varimax's orthogonal-factor model, $\Phi=I$, the identity matrix, so the expression simplifies.

### 5.6 Why shared factors create correlation: a small exact example

**Teaching example:** Suppose the following three items measure one factor, with loadings $0.8$, $0.7$ and $0.6$. Their residual terms are mutually uncorrelated and independent of the factor. Assume each standardized item has variance 1.

\[
Z_1=0.8F+\varepsilon_1,\quad
Z_2=0.7F+\varepsilon_2,\quad
Z_3=0.6F+\varepsilon_3.
\]

When $F$ has variance 1, the factor-generated correlation between two different items equals the product of their loadings:

\[
\begin{aligned}
\operatorname{Corr}(Z_1,Z_2)&=0.8\times0.7=0.56,\\
\operatorname{Corr}(Z_1,Z_3)&=0.8\times0.6=0.48,\\
\operatorname{Corr}(Z_2,Z_3)&=0.7\times0.6=0.42.
\end{aligned}
\]

Thus a **single unobserved factor** creates three positive observed correlations. This is the key to why EFA works.

The model also says each question has leftover variance: $1-0.8^2=0.36$, $1-0.7^2=0.51$, and $1-0.6^2=0.64$. Different questions may therefore be imperfect measurements of the same common construct.

### 5.7 An important limit of the model

A fitted factor model is a compact **statistical explanation** of shared covariance. The same correlation patterns can sometimes be represented by different latent explanations. Rotation, measurement design, sample and theory all influence interpretation. EFA alone does not prove that a factor exists as a single real-world entity.

## 6. Factor loadings, communalities and uniquenesses

### 6.1 What is a loading?

A **factor loading** tells us how strongly an observed variable relates to an extracted factor. In a standardized *orthogonal* factor model, it can be interpreted as the correlation between the item and the factor. A loading of $+0.80$ is strong and positive; $-0.80$ is strong and negative; $0.05$ is weak.

The **sign** tells direction, but factor directions themselves are arbitrary: if we multiply a factor and all its loadings by $-1$, the mathematical model still means the same thing. A negative loading does not necessarily mean a bad question.

The lecturer suggests looking for salient loadings around $0.4$ or $0.5$ or higher (PDF pp. 6, 10–11). These are **practical guidelines**, not universal laws. Judge a loading in context, including sample quality, number of items, and cross-loadings.

### 6.2 Why squared loadings represent variance

Under a single-factor standardized orthogonal model,

\[
\operatorname{Var}(Z_i)=\lambda_{i1}^2\operatorname{Var}(F_1)+\operatorname{Var}(\varepsilon_i).
\]

If $\operatorname{Var}(Z_i)=\operatorname{Var}(F_1)=1$ and factor and error are uncorrelated, this becomes

\[
1=\lambda_{i1}^2+u_i^2.
\]

For a loading of $0.8$, the squared loading is $0.64$. The factor accounts for 64% of the item's standardized variance in this simple model; the rest is 36%.

### 6.3 Communality: shared variance accounted for

The **communality** of item $i$, written $h_i^2$, is the proportion of its variance explained by the retained **common factors together**. For several orthogonal factors,

\[
\boxed{h_i^2=\lambda_{i1}^2+\lambda_{i2}^2+\cdots+\lambda_{im}^2.}
\]

**Teaching example:** A question loads $0.60$ on Factor 1 and $0.40$ on Factor 2, and both factors are orthogonal. Then

\[
h^2=0.60^2+0.40^2=0.36+0.16=0.52.
\]

So the two common factors jointly account for **52% of the variance** of that question. This does *not* mean the factor model answers the question correctly 52% of the time.

### 6.4 Uniqueness: what the retained factors do not explain

For an item with variance standardized to 1,

\[
\boxed{u_i^2=1-h_i^2.}
\]

Continuing the previous teaching example, $u^2=1-0.52=0.48$. The item has **48% unique/residual variance**. Uniqueness is not synonymous with random measurement error; it also includes genuine item-specific information not captured by common factors.

**Lecture result, PDF p. 6:** In the exploratory run that extracts as many factors as variables, KM1 has $h^2=0.78$ and $u^2=0.22$. In the later **four-factor** MINRES model, KM1 has a different $h^2=0.73$ and $u^2=0.27$ (PDF p. 10). Both can be correct because they are **different fitted models**. Never mix their rows in one interpretation.

### 6.5 Complexity and cross-loading

The lecture prints `com`, an item-complexity index (PDF pp. 6–7, 10). It summarizes how widely an item's squared loadings are distributed across factors. A value near **1** means most of its factor-related variance points to one factor. A larger value means it is not as cleanly associated with just one factor.

**Teaching extension: Hoffman's loading-complexity idea.** A commonly used computation in this context is

\[
\operatorname{com}_i=\frac{\left(\sum_{j=1}^{m}\lambda_{ij}^2\right)^2}{\sum_{j=1}^{m}\lambda_{ij}^4}.
\]

Why it makes sense: if one loading dominates, both numerator and denominator are dominated by the same value and complexity is near 1. If two equally strong loadings dominate, complexity approaches 2. This is a **continuous index**, not a literal count of all loadings greater than 0.4.

**Teaching example:** If loadings on two orthogonal factors are $(0.6,0)$, complexity $=(0.36)^2/(0.6^4)=1$. If they are $(0.5,0.5)$, complexity $=(0.5)^2/(2\times0.5^4)=2$. This clarifies why the lecturer treats low complexity as a cleaner structure.

### 6.6 A single item can load on more than one factor

For example, a question that asks whether quality checks reduce wasted materials could load on Quality Control and Cost Tracking. That does not automatically invalidate the analysis. It can mean the wording taps two constructs. You should decide whether cross-loading reflects genuine overlap, problematic item wording or an inadequate model, rather than deleting every such item mechanically.

### 6.7 Pattern loadings versus correlations with factors

**Teaching extension for precision:** With **orthogonal** factors, the standardized pattern loading is also the factor–item correlation. With **oblique** factors that can correlate, the pattern matrix gives regression-like coefficients conditional on other factors, while the *structure matrix* gives the factor–item correlations. The two matrices need not match. The lecture uses **Varimax** in its main EFA, so the simple correlation interpretation used on its slides is appropriate in that setting.

## 7. Extraction, rotation, factor scores and assumptions

### 7.1 What extraction means

**Extraction** is the computational step that estimates the common-factor structure, including loadings and uniquenesses, from the observed relationships. You must choose a factor count before fitting a particular EFA solution. A useful workflow compares several counts to find a sensible balance between explanatory adequacy and simplicity.

The lecture mainly demonstrates two extraction methods:

- **MINRES (minimum residual)** through `psych::fa()`. It aims to make the mismatch between observed and factor-model-implied correlations small, particularly off-diagonal residual correlations.
- **Maximum likelihood (ML)** through `stats::factanal()`. It estimates loadings and uniquenesses using a likelihood-based approach, traditionally relying on a multivariate-normal measurement model for its standard fit inference.

These are methods for estimating factors, **not** alternate spellings of PCA. The lecture also discusses PCA only as the preceding dimensionality-reduction technique.

### 7.2 Why rotation is necessary for interpretation

Imagine an analyst extracts two factors. Before rotation, several questions might load moderately on both. Mathematically, the axes can often be turned without losing the model's ability to reproduce the observed correlations. We rotate them to seek a simpler loading structure in which each variable mainly relates to one factor.

Picture two coordinate axes drawn through a cloud of points. Rotating those axes can make the broad directions easier to describe, even though the underlying point cloud has not changed. In common FA, rotation changes the *representation of the factors*, not the original observed data.

### 7.3 Orthogonal Varimax rotation

The lecturer uses `rotate = "varimax"`. **Varimax** seeks a simple structure while keeping factors **orthogonal**, or uncorrelated within the chosen factor representation. Its goal is to make high squared loadings stand out and weak loadings become less prominent relative to other variables, improving interpretability.

Varimax does not guarantee that nature's actual business constructs are uncorrelated. “Quality Control” and “Production Control” may plausibly have a relationship in the real world.

### 7.4 Oblique Oblimin rotation

The lecturer mentions `rotate = "oblimin"` as an alternative (PDF p. 6). **Oblique** rotation allows factors to correlate. This is often conceptually attractive when hidden constructs are expected to overlap. An analyst can compare the Varimax and Oblimin results and inspect the estimated factor correlations in the oblique solution.

A useful rule: **do not force factors to be independent merely because that makes a later regression simpler.** Let the measurement model and substantive evidence guide the decision.

### 7.5 Factor names are assigned by interpretation

The computer may print `MR1`, `MR2`, `MR3` and `MR4`. `MR` refers to Minimum Residual extraction. Those codes are not meaningful business labels. The researcher looks at each factor's strong-loading items, then proposes a name such as “Knowledge Management.” Factor numbers and even their signs can vary by software or rotated solution, so always inspect **which variables** load on each factor.

### 7.6 Factor scores are estimated, not directly measured

An estimated **factor score** combines a respondent's item answers with fitted scoring weights to estimate where that respondent lies on a factor. The resulting scores can be useful in subsequent analyses, including regression, but they are not exact measurements of an invisible psychological or business quantity.

The lecture obtains scores using `fa.var$scores` and later uses those values to predict Quality Delivery (PDF pp. 13–15). We will explore this sequence carefully.

### 7.7 Underlying assumptions and why they matter

The following list includes source content and labeled **Teaching extensions**:

| Assumption or consideration | Why it matters | Place in lecture |
|---|---|---|
| Correlations should be informative | Without meaningful covariance, there may be no common structure to explain | Correlation plot, KMO and Bartlett; pp. 4–5 |
| Measured items must correspond to reasonable constructs | A statistical cluster cannot substitute for a meaningful measurement theory | Interpretation throughout |
| Relevant variables should be appropriately scaled or modeled | Likert items are ordinal; ordinary Pearson correlations may not be the best choice | Polychoric discussion; p. 4 |
| Orthogonal Varimax factors are assumed uncorrelated | Determines the interpretation of loadings and variance decomposition | Rotation; pp. 6, 9 |
| ML inference relies on distribution assumptions | Inference can be unreliable for markedly nonnormal or ordinal data | `factanal()` caveat; pp. 11–12 |
| Residual correlations and uniquenesses need attention | Common factors may not capture every important association | RMSR and fit; p. 10 |
| **Teaching extension:** Sampling independence and adequate coverage | Correlation estimates can be unstable under clustered, biased or very small samples | Not explicitly developed in lecture |
| **Teaching extension:** Approximate linear latent-response relation | Simple factor models describe linear covariance structures, not arbitrary nonlinear dependencies | Not explicitly developed in lecture |
| **Teaching extension:** Error independence assumptions | Conventional EFA generally assumes no residual correlation between distinct items after accounting for factors | Not explicitly developed in lecture |

### 7.8 Never turn cutoffs into substitutes for thinking

A KMO near 0.8, a loading greater than 0.5 or RMSEA less than 0.05 can be useful evidence. No one cutoff automatically proves that a dataset, model or interpretation is correct. The sensible conclusion comes from **several pieces of evidence together**, including question content, correlations, sample size, number of factors, item loadings and model diagnostics.

---
# Part III. Prepare the lecturer's dataset

## 8. R setup and the operational-management survey

### 8.1 What is R, and what will it do here?

**R** is a programming language designed for statistical computing. RStudio is a commonly used application that makes editing and running R code easier. You can also use R in other editors and notebook environments. In a beginner's workflow, you type commands in an R script, run them, then inspect numerical output and plots.

For this lecture R performs six kinds of work:

1. Reads the questionnaire dataset.
2. Describes the variables and calculates correlations.
3. Checks whether common factor analysis is plausible.
4. Helps select a sensible number of factors.
5. Fits EFA and prints the loadings and diagnostics.
6. Uses respondent factor scores as inputs to a subsequent regression.

### 8.2 The four packages in the lecture (PDF p. 2)

| Package | What it contributes | Lecture commands |
|---|---|---|
| `psych` | Descriptive statistics, factorability checks, polychoric correlations, parallel analysis, EFA and diagrams | `describe()`, `KMO()`, `cortest.bartlett()`, `polychoric()`, `fa.parallel()`, `fa()`, `fa.diagram()` |
| `corrplot` | Visual displays of correlation matrices | `corrplot()` |
| `ggplot2` | Custom graphs built in layers | `ggplot()`, `geom_point()`, `geom_line()` |
| `car` | Regression diagnostics, including variance-inflation factors | `vif()` |

`factanal()`, `lm()`, `predict()`, `cor()`, `det()`, `dim()` and many data manipulation functions come from R's built-in or recommended standard packages, not the four named add-on packages.

### 8.3 Install and load a package are different operations

You generally **install** a package once on a particular R installation, then **load** it at the start of each new R session that needs it.

```r
# Install once if necessary (internet connection required)
install.packages(c("psych", "corrplot", "ggplot2", "car"))

# Load in the current session
library(psych)
library(corrplot)
library(ggplot2)
library(car)
```

Read each line:

- `install.packages(...)` downloads software into your R library. You do not need to reinstall on every run.
- `c(...)` combines several strings into a single vector.
- `library(psych)` makes functions from that package available without repeatedly writing `psych::`.
- `psych::fa()` is an alternative that calls the function by its package-qualified name. This avoids ambiguity if different packages export functions with the same name.

A package must be installed before it can be loaded, and an internet connection may be required to install it. **The source lecture only shows `library(...)`, not the package-installation command.**

### 8.4 Where the lecturer's sample dataset comes from

The lecture uses a CSV file hosted under the path `housecricket/data/main/efa/sample1.csv` (PDF p. 2). A CSV, or comma-separated values file, is a plain-text table. Each row becomes an observation, and fields separated by commas become columns.

The following URL is the clean version of the location printed with spaced-out PDF text and also appears in public worked examples based on the same dataset:

```r
url <- "https://raw.githubusercontent.com/housecricket/data/main/efa/sample1.csv"
datasurvey <- read.csv(url, sep = ",")
```

Interpretation:

- `url <- ...` **assigns** the text address to an R object named `url`. The arrow `<-` is R's assignment operator.
- `read.csv(...)` reads the remote file into a rectangular `data.frame`.
- `sep = ","` makes the comma separator explicit, though commas are already the default for `read.csv()`.
- `datasurvey` is simply the object's chosen name. It is not a special R command.

**Practical note:** Internet access and the continued availability of that third-party URL are necessary for this exact command. If the URL becomes unavailable, download the original CSV through an authorized route and read the local file, for example `read.csv("D:/Study/sample1.csv")`. File paths on Windows can use forward slashes in R.

### 8.5 What are the variables?

The source calls the data a survey of operational-management practices. Each practice item uses a five-point Likert response from **1 = Strongly Disagree** to **5 = Strongly Agree** (PDF p. 2).

| Variables | Count | Meaning | Role in the lecture |
|---|---:|---|---|
| `ID` | 1 | Respondent identifier | Removed before analysis |
| `KM1`, `KM2`, `KM3` | 3 | Knowledge Management indicators | Candidate factor indicators |
| `QC1`, `QC2`, `QC3` | 3 | Quality Control indicators | Candidate factor indicators |
| `CT1`, `CT2`, `CT3` | 3 | Cost Tracking indicators | Candidate factor indicators |
| `PC1`, `PC2`, `PC3` | 3 | Production Control indicators | Candidate factor indicators |
| `QD` | 1 | Quality Delivery outcome | Set aside as the regression response |
| **Total** | **14** | **One ID, 12 indicators, one outcome** | **259 respondents** |

A useful distinction: **the four construct names are built into the questionnaire's item prefixes**, but the actual factor loadings still need checking. That the solution later produces four recognizable clusters is a finding supported by the reported loadings, not a reason to assume the model will always work for another population.

### 8.6 Why the response variable is not included in the EFA

The business question has two stages:

1. **Measurement stage:** What underlying management-practice factors summarize the 12 `KM`, `QC`, `CT` and `PC` items?
2. **Prediction stage:** Can the estimated values of those factors help predict **Quality Delivery**, `QD`?

If `QD` were mixed in as one of the factor-analysis indicators, then using the resulting scores to predict `QD` could contaminate the predictors with information from the outcome. The lecturer removes `QD` from the EFA inputs and brings it back only at the regression stage. This is an important modeling separation.

## 9. Read, describe and clean the data

### 9.1 Get a quick summary before modeling (PDF pp. 2–3)

```r
psych::describe(datasurvey)
```

The printed output has many columns. They all answer different questions:

| Output column | Meaning | How to interpret it |
|---|---|---|
| `vars` | Variable's position in the selected data | An index, **not** a statistical value |
| `n` | Number of nonmissing observations | How many usable responses were counted |
| `mean` | Arithmetic average | Typical response on the original item scale |
| `sd` | Standard deviation | How spread out the responses are |
| `median` | Middle value after sorting | A robust description of center |
| `trimmed` | Mean after trimming some extremes | Checks sensitivity to extreme values |
| `mad` | Median absolute deviation, with a scaling convention | Robust spread measure |
| `min`, `max` | Smallest and largest values | Check the permitted response scale |
| `range` | `max - min` | Total observed span |
| `skew` | Asymmetry of the distribution | Negative means a longer lower-value tail under the usual convention |
| `kurtosis` | Tail/peak-related fourth-moment measure | Here `psych` reports excess-kurtosis-type values |
| `se` | Estimated standard error of the mean | Uncertainty of the estimated mean |

You do **not** need to understand kurtosis before deciding whether the dataset has the expected 259 rows and Likert responses. Read summaries in order of practical importance.

### 9.2 The lecturer's descriptive results

**Lecture result, PDF pp. 2–3.** This table preserves the values that matter for inspecting the survey; values shown are rounded exactly as reported in those columns.

| Item | $n$ | Mean | SD | Median | Skew | Kurtosis |
|---|---:|---:|---:|---:|---:|---:|
| ID | 259 | 130.00 | 74.91 | 130 | 0.00 | -1.21 |
| KM1 | 259 | 3.31 | 1.29 | 3 | -0.27 | -0.89 |
| KM2 | 259 | 3.36 | 1.37 | 3 | -0.35 | -1.02 |
| KM3 | 259 | 3.40 | 1.31 | 3 | -0.38 | -0.90 |
| QC1 | 259 | 3.78 | 1.35 | 4 | -0.93 | -0.50 |
| QC2 | 259 | 3.41 | 1.17 | 3 | -0.30 | -0.62 |
| QC3 | 259 | 3.34 | 1.23 | 3 | -0.27 | -0.81 |
| CT1 | 259 | 3.69 | 1.12 | 4 | -0.54 | -0.24 |
| CT2 | 259 | 3.73 | 1.08 | 4 | -0.56 | -0.21 |
| CT3 | 259 | 3.36 | 1.23 | 3 | -0.28 | -0.73 |
| PC1 | 259 | 3.42 | 1.20 | 3 | -0.40 | -0.59 |
| PC2 | 259 | 3.09 | 1.34 | 3 | -0.13 | -1.05 |
| PC3 | 259 | 3.71 | 1.27 | 4 | -0.72 | -0.49 |
| QD | 259 | 3.55 | 1.05 | 4 | -0.33 | -0.39 |

Other printed values: the questionnaire items have minimum 1, maximum 5 and range 4; `ID` runs from 1 to 259, with range 258. In the source all items have $n=259$. The displayed trimmed means, MADs and standard errors can be regenerated using the `describe()` command; their existence and interpretation are covered in the definitions above. Their exact printed values are not needed for the later EFA conclusions.

**How to interpret one line:** For QC1, mean 3.78 and median 4 suggest relatively positive agreement. SD 1.35 means answers still vary considerably. Skew $-0.93$ suggests a left-tailed distribution, consistent with many answers near the high end. These numbers do **not** establish that Quality Control is good or that the item belongs to any one factor without other evidence.

**Why the ID has an average but no substantive role:** R treats the `ID` column as numbers, so `describe()` can calculate mean 130. But respondent number 130 is not twice as much “respondent” as number 65. Its numeric summary is computationally possible and scientifically irrelevant to the factor model.

### 9.3 Count the rows and columns

```r
dim(datasurvey)
```

**Lecture result:**

```text
[1] 259 14
```

`dim()` prints the dimensions in **row, column** order. The `[1]` marks the first element of the printed R vector; it is not a count of observations. The correct reading is **259 responses, 14 columns**.

Useful companion commands:

```r
nrow(datasurvey)      # Number of records
ncol(datasurvey)      # Number of columns
names(datasurvey)     # Column names
str(datasurvey)       # Data types and structure
head(datasurvey)      # First six rows
summary(datasurvey)   # Basic summaries
```

The latter commands are **Teaching extensions**, not separate output screenshots in the lecture.

### 9.4 Remove the identifier (PDF p. 3)

```r
dat <- datasurvey[, -1]
head(dat)
```

In R, the two positions inside square brackets are `[rows, columns]`.

- `datasurvey[, -1]`: the empty position before the comma means **all rows**; `-1` means **exclude column 1**.
- Assigning to `dat` creates a new object; `datasurvey` is still available.
- `head(dat)` prints the first six rows of the resulting data frame.

A miniature example illustrates negative indexing:

```r
example <- data.frame(ID = c(1, 2), A = c(5, 4), B = c(2, 3))
example[, -1]
```

The displayed two-column result contains `A` and `B` but no `ID`. Negative column indices mean **leave those columns out**, not multiply their values by negative one.

**Lecture result: the first six rows of `dat` (PDF p. 3):**

| Row | KM1 | KM2 | KM3 | QC1 | QC2 | QC3 | CT1 | CT2 | CT3 | PC1 | PC2 | PC3 | QD |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 5 | 5 | 5 | 5 | 2 | 1 | 1 | 3 | 1 | 4 | 1 | 3 | 4 |
| 2 | 3 | 3 | 3 | 4 | 5 | 3 | 4 | 5 | 4 | 2 | 2 | 2 | 4 |
| 3 | 2 | 2 | 2 | 2 | 2 | 1 | 3 | 3 | 3 | 4 | 3 | 5 | 2 |
| 4 | 4 | 3 | 3 | 4 | 3 | 4 | 4 | 4 | 4 | 1 | 1 | 3 | 3 |
| 5 | 4 | 4 | 4 | 2 | 3 | 4 | 4 | 4 | 4 | 3 | 3 | 5 | 4 |
| 6 | 1 | 1 | 1 | 2 | 5 | 3 | 5 | 5 | 5 | 4 | 3 | 5 | 3 |

After removing `ID`, there are 13 columns left: 12 indicators **plus** `QD`.

### 9.5 Exclude the outcome when defining factor indicators (PDF p. 4)

The lecture later defines:

```r
X <- dat[, -13]
Y <- dat[, 13]
```

Because `QD` is the thirteenth and last column of `dat`, this produces:

- `X`: all 259 rows and the first 12 practice-indicator columns, with dimension $259\times12$.
- `Y`: the 259 `QD` values. Under the standard R behavior here, `Y` is a numeric vector because selecting a single column generally drops the extra data-frame dimension.

You can confirm:

```r
dim(X)      # Expected: 259 12
length(Y)   # Expected: 259
names(X)    # The 12 KM/QC/CT/PC items
```

A safer variant that does not depend on column position is:

```r
X <- dat[, setdiff(names(dat), "QD"), drop = FALSE]
Y <- dat[["QD"]]
```

**Teaching extension:** The name-based version helps avoid a common bug: if someone rearranges columns, selecting `-13` could accidentally remove the wrong variable. Both versions follow the intended logic when the original columns are unchanged.

## 10. Explore correlations and ordinal responses

### 10.1 First look at Pearson correlations (PDF p. 4)

```r
cormat <- cor(dat[, -13])
corrplot(cormat, method = "number")
```

Line by line:

- `dat[, -13]` removes `QD`, leaving only the 12 indicators.
- `cor(...)` calculates a $12\times12$ matrix of Pearson correlations.
- `cormat <-` stores that matrix for use later.
- `corrplot(..., method = "number")` draws a graphical correlation table with correlation coefficients written in its cells.

The plotted square is symmetric. The diagonal values are 1.00. Blue shading represents positive correlation in the source's color scale, and the scale runs from -1 to +1. **The numbers, not the color alone, are the evidence**.

### 10.2 What the actual correlation figure teaches

The figure on **PDF p. 4** shows several prominent within-group relationships:

| Item pair | Pearson correlation in lecture's plot | What to notice |
|---|---:|---|
| KM1 and KM2 | 0.74 | Knowledge questions move together |
| KM1 and KM3 | 0.79 | Another strong Knowledge association |
| KM2 and KM3 | 0.82 | Very strong within-KM association |
| QC1 and QC2 | 0.60 | Quality Control questions share variation |
| QC2 and QC3 | 0.65 | Another QC association |
| CT1 and CT2 | 0.61 | Cost Tracking cluster |
| CT2 and CT3 | 0.61 | Cost Tracking cluster |
| PC1 and PC2 | 0.68 | Production Control cluster |
| PC1 and PC3 | 0.55 | Production Control cluster |
| PC2 and PC3 | 0.54 | Production Control cluster |

The displayed matrix also contains several nonzero correlations *between* those groups. That is normal: real questionnaire items rarely form mathematically perfect, isolated clusters. Factor analysis seeks an approximate structure, not an immaculate pattern with 1s within groups and 0s everywhere else.

**Try this:** Ask “What would it mean if the KM questions were all correlated around zero?” It would make their interpretation as indicators of one shared Knowledge factor less convincing. Ask “What if two questions correlated at exactly 1?” They would be redundant in their linear information, and exact singularity could create computational problems.

### 10.3 The special issue: a five-point Likert response is ordinal

The survey's responses are **ordered categories**. “Strongly Agree” indicates a higher rating than “Agree,” but the psychological or operational gap between categories 4 and 5 may not precisely equal the gap between 2 and 3.

Pearson correlation treats the recorded category numbers as if numerical differences are meaningful. It is often used as a pragmatic approximation for Likert data, especially when there are several response levels, but should not automatically be assumed ideal.

**A careful nuance:** Pearson's correlation coefficient can be *calculated* for nonnormal variables and does not require a normal distribution merely to exist. Distributional and measurement assumptions become especially important for its interpretation as a latent association and for some inferential procedures. The lecture warns that Pearson may underrepresent latent relationships between ordinal ratings (PDF p. 4). The extent of any bias depends on the actual data and threshold structure.

### 10.4 The idea behind a polychoric correlation

Imagine respondents have an underlying continuous tendency to agree with “We manage knowledge effectively.” They do not report that hidden numerical tendency precisely. Instead, they choose among five categories depending on where the tendency falls relative to four thresholds.

**Polychoric correlation** estimates the association between two such *unobserved continuous response variables*, assuming a suitable bivariate-normal latent-response structure and threshold model. In other words, it estimates a continuous association that could underlie the observed ordered categories.

This is a distinct use of the word **latent** from the EFA constructs themselves:

- A *polychoric latent response* is an unobserved continuous variable supposed to underlie **one ordinal item**.
- An *EFA latent factor* is an unobserved common construct supposed to explain **relationships across several items**.

They can be used together, but are not the same object.

### 10.5 The lecturer's optional polychoric commands

The source first shows these lines as comments (PDF p. 4):

```r
# poly_corr <- psych::polychoric(dat[, -13])$rho
# corrplot(poly_corr, method = "number")
```

Later, on page 8, the lecturer actively computes a polychoric correlation matrix for parallel analysis:

```r
poly_corr <- psych::polychoric(X)$rho
```

The `$rho` part extracts the estimated correlation matrix from the object returned by `polychoric()`. The symbol `$` in R means “access this named component.” You can then pass `poly_corr` into procedures that accept a correlation matrix.

The lecturer's primary four-factor MINRES fit printed on pages 9–10, however, uses **raw `X`**, not `poly_corr`:

```r
fa.var <- psych::fa(r = X, nfactors = 4,
                    fm = "minres", rotate = "varimax")
```

The polychoric-based alternative is **commented out** in the lecture. This detail matters: the printed results on page 10 should not be represented as though they were definitely obtained by fitting `fa()` to `poly_corr`.

### 10.6 What if there are missing responses?

The lecture's `describe()` table reports 259 nonmissing values for each survey variable. In other datasets, unanswered questions can occur. Some R functions compute pairwise-complete correlations by default, while others may produce missing values or omit rows.

**Teaching extension:** Before analysis, inspect:

```r
colSums(is.na(X))  # Count missing responses by item
anyNA(X)           # TRUE if at least one missing value exists
```

If missingness occurs, think about why responses are missing, whether observations are independent, whether imputation is justified and whether all correlations are based on comparable samples. Do not silently replace missing survey responses with a middle Likert category. That would change the measured data.

### 10.7 Correlation check: the actual inference

A sensible summary of page 4 is:

> The 12 operational-management items show meaningful positive correlations, including particularly strong associations within Knowledge Management, Quality Control, Cost Tracking and Production Control items. This supports investigating a lower-dimensional common-factor structure, subject to formal factorability checks.

Notice what this conclusion **does not** say: it does not claim the four factors have already been proven, that correlation establishes causation, or that ordinal measurement assumptions have disappeared.

---
# Part IV. Decide whether and how many factors to extract

## 11. Factorability: KMO, Bartlett and determinant

### 11.1 What “factorability” means

A dataset is **factorable** when its observed relationships are sufficiently suitable to investigate with a common-factor model. If all variables are nearly unrelated, there is little shared structure to recover. At the opposite extreme, if some variables are exact duplicates, the correlation matrix can become singular and cause computational difficulty.

The lecturer uses **three checks**, after viewing the correlation matrix (PDF pp. 4–5):

1. Kaiser–Meyer–Olkin (KMO) measure of sampling adequacy.
2. Bartlett's test of sphericity.
3. Determinant of the observed correlation matrix.

None of these checks establishes how many meaningful factors exist. They help answer the prior question: **Does running EFA seem statistically defensible?**

### 11.2 KMO in plain language

We want variables to correlate because they share broader factors. But not every observed correlation proves such shared structure. A **partial correlation** asks what association remains between two variables after statistically accounting for other measured variables.

- **Ordinary correlation:** How much do A and B move together?
- **Partial correlation:** How much do A and B still move together after adjusting for the other relevant measured variables?

In a dataset with a common underlying pattern, many ordinary correlations are reasonably substantial, while corresponding partial correlations are often relatively small. KMO compares those quantities. A larger KMO suggests that EFA may provide an economical common-factor explanation.

### 11.3 The KMO formula, decoded (Teaching extension)

A common overall KMO expression is

\[
\mathrm{KMO}=\frac{\sum_{i<j}r_{ij}^2}{\sum_{i<j}r_{ij}^2+\sum_{i<j}q_{ij}^2},
\]

where:

- $r_{ij}$ is the ordinary correlation between measured variables $i$ and $j$.
- $q_{ij}$ is the corresponding partial correlation, adjusting for the other variables.
- $\sum_{i<j}$ means add each distinct pair once, without the diagonal.

The numerator is squared ordinary correlations. The extra term in the denominator is squared partial correlations. If the partial correlations are small relative to the ordinary ones, the fraction gets close to 1. If they are large, the fraction is lower.

**Teaching example, not lecture data:** Suppose the relevant sums are 18 for squared ordinary correlations and 2 for squared partial correlations. Then $\mathrm{KMO}=18/(18+2)=0.90$. This indicates an attractive ratio of ordinary association to residual partial association. A high KMO does not mean “90% of the data is explained” and does not specify the factor count.

### 11.4 Run KMO on the 12 factor indicators

```r
psych::KMO(r = cor(X))
```

- `cor(X)` calculates the 12-item Pearson correlation matrix.
- The argument `r =` tells `KMO()` which correlation matrix to evaluate.
- `KMO()` reports overall adequacy and **MSA** (measure of sampling adequacy) for each item.

**Lecture result, PDF p. 5:**

```text
Kaiser-Meyer-Olkin factor adequacy
Overall MSA = 0.83
```

The lecturer also gives item-level MSA values:

| KM1 | KM2 | KM3 | QC1 | QC2 | QC3 | CT1 | CT2 | CT3 | PC1 | PC2 | PC3 |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 0.87 | 0.84 | 0.82 | 0.88 | 0.86 | 0.86 | 0.83 | 0.85 | 0.85 | 0.70 | 0.78 | 0.80 |

**Interpretation, carefully stated:** Overall KMO is **0.83**, a good result by the lecturer's suggested guidelines. All 12 item-level MSAs are at least 0.70, so the output does not single out an obviously low-MSA item by a 0.60 screening rule. The lowest reported item-level value is PC1 at 0.70. This supports proceeding with EFA, but not yet retaining a specific number of factors.

**Important typesetting correction:** Page 5 contains “KMO > 60” in one sentence. Because KMO is usually between 0 and 1, the meaningful intended cutoff is **KMO > 0.60**, consistent with the same page's subsequent “> 0.8 is good.” A threshold of 60 is mathematically impossible on the ordinary KMO scale. The lecturer's actual value of 0.83 is unchanged.

### 11.5 Bartlett's test: is the correlation matrix just an identity matrix?

Imagine a set of independent, standardized variables. Their ideal population correlation matrix would be the **identity matrix**:

\[
I=\begin{bmatrix}
1&0&0\\
0&1&0\\
0&0&1
\end{bmatrix}.
\]

The 1s on the diagonal mean each variable perfectly correlates with itself. The 0s away from the diagonal mean distinct variables are uncorrelated. Such a matrix would offer little common structure for EFA.

Bartlett's test of sphericity evaluates:

\[
H_0:\ \text{The population correlation matrix is the identity matrix.}
\]

\[
H_1:\ \text{The population correlation matrix is not the identity matrix.}
\]

The null hypothesis $H_0$ is the starting claim tested. The alternative $H_1$ is the competing claim. A very small $p$-value means the sample correlations are difficult to reconcile with an identity population matrix under the test's assumptions.

### 11.6 Conduct Bartlett's test in R

```r
psych::cortest.bartlett(X)
```

The lecture passes the raw data `X`; the function notes that its input is not square and calculates the correlation matrix from the data. That message is routine, **not an error**.

**Lecture result, PDF p. 5:**

```text
R was not square, finding R from data
$chisq
[1] 1595.75

$p.value
[1] 8.846246e-290

$df
[1] 66
```

**Translate the scientific notation first:**

\[
8.846246\times10^{-290}
\]

is an extraordinarily small positive number. It is much less than $0.05$.

The test decision is therefore to **reject $H_0$** at the 5% level. The evidence indicates that the survey correlation matrix is not just an identity matrix. This is consistent with a factorable pattern of associations.

**What it does not mean:** Bartlett's test does not establish a four-factor model, does not guarantee well-defined constructs, and does not say that every item is strongly correlated with every other item. In large samples even relatively small departures from identity can become statistically significant.

### 11.7 Why are there 66 degrees of freedom?

With $p$ observed variables, there are

\[
\frac{p(p-1)}{2}
\]

unique off-diagonal correlations. For $p=12$,

\[
\mathrm{df}=\frac{12\times11}{2}=\frac{132}{2}=66.
\]

The division by 2 is necessary because correlations above and below the diagonal are duplicates. Thus the lecturer's reported **66** agrees exactly with a 12-variable correlation matrix.

### 11.8 An optional mathematical derivation of the reported chi-square

**Teaching extension, with the lecturer's real input values:** A widely used Bartlett statistic takes the form

\[
\chi^2\approx-\left(n-1-\frac{2p+5}{6}\right)\ln|R|,
\]

where $n$ is sample size, $p$ is number of variables, $|R|$ is the determinant of their sample correlation matrix, and $\ln$ is the natural logarithm.

From the lecture: $n=259$, $p=12$, and $|R|=0.00183051$. First evaluate the term multiplying the logarithm:

\[
259-1-\frac{2(12)+5}{6}
=258-\frac{29}{6}
\approx253.1667.
\]

Then insert the correlation determinant:

\[
\chi^2\approx-253.1667\ln(0.00183051)
\approx\boxed{1595.75}.
\]

That reproduces the slide's chi-square to the displayed precision. The point is to connect **number of respondents**, **number of variables**, **correlation determinant** and **Bartlett's statistic**. The very large chi-square relative to 66 degrees of freedom produces the tiny $p$-value.

### 11.9 Determinant: could the correlation matrix be singular?

The **determinant** is one number summarizing a square matrix's geometric and algebraic properties. One use is to detect whether a matrix is invertible. For a nonsingular correlation matrix the determinant is greater than zero. If it is **exactly zero**, at least one variable is a perfect linear combination of others, so the matrix is singular.

For a tiny two-variable correlation matrix

\[
R=\begin{bmatrix}1&r\\r&1\end{bmatrix},
\quad |R|=1-r^2.
\]

**Teaching example:**

- If $r=0$, determinant $1-0^2=1$; the two variables have no linear correlation.
- If $r=0.8$, determinant $1-0.64=0.36$; they are correlated but not duplicates.
- If $r=1$, determinant $0$; the variables are perfectly linearly redundant.

This illustrates why very strong linear dependence can push a determinant close to zero. With 12 variables the calculation is more complex, but the interpretation is related.

### 11.10 Run the determinant calculation

```r
det(cor(X))
```

**Lecture result, PDF p. 5:**

```text
[1] 0.00183051
```

The lecturer notes that the determinant is **positive**, and interprets this as indicating the matrix is usable for FA. Page 5 also supplies practical warning thresholds such as values below $0.00001$ being very small and values over $0.0001$ being less problematic. These are rough heuristics, **not universal significance tests**.

**Important nuance (Teaching extension):** A positive determinant does **not** by itself establish good factorability, or ensure all necessary numerical conditions for a sophisticated fitting procedure. An identity correlation matrix has determinant 1 and is perfectly invertible, yet contains no cross-item correlations to explain. Conversely, a small determinant is common when many variables are meaningfully correlated; its severity depends on the full eigenvalue pattern and numerical condition of the matrix. It is more informative to use the determinant **alongside** KMO, Bartlett, correlations and the properties of the estimated model.

### 11.11 Combine all three checks in one coherent conclusion

| Check | Lecturer's result | Appropriate conclusion |
|---|---|---|
| Correlation matrix | Several strong within-group associations (p. 4) | There appears to be shared structure worth investigating |
| KMO | 0.83 overall; item MSA 0.70–0.88 | Sampling adequacy pattern is encouraging for EFA |
| Bartlett | $\chi^2=1595.75$, df = 66, $p=8.846246\times10^{-290}$ | Reject an identity population correlation matrix |
| Determinant | 0.00183051 | Matrix is not singular in this result; inspect with other criteria |

**Exam-ready interpretation:** “The dataset appears suitable for exploratory factor analysis. KMO was 0.83, indicating good overall sampling adequacy. Bartlett's test was statistically significant, $\chi^2(66)=1595.75$, $p<0.001$, rejecting the hypothesis that the population correlation matrix is an identity matrix. The sample correlation determinant was positive (0.00183051). These diagnostics support investigating latent common factors, although they do not by themselves determine the number of factors.”

## 12. How many factors? Eigenvalues, scree and parallel analysis

### 12.1 The question of factor retention

After establishing that EFA is worth trying, we must choose **how many factors** to keep. Too few factors can force conceptually different questions into the same group. Too many factors can produce unstable, difficult-to-interpret constructs and overfit the available correlations.

The lecturer explores factor importance, draws a scree plot, and performs parallel analysis (PDF pp. 6–9). The final choice in this example is **four factors**.

### 12.2 What is an eigenvalue, with intuition first?

An eigenvalue is a number associated with a special direction of a matrix transformation. For a correlation matrix, the eigenvalues summarize how much variance is aligned with its principal directions. You do not need to solve an eigenvalue equation manually before reading a scree plot.

Imagine 12 standardized items. Together they have 12 units of observed variance, one unit per item. If several items tend to vary together, substantial variation is concentrated into a few directions. The **eigenvalues** of their correlation matrix indicate how pronounced these directions are.

**Teaching extension, formal definition:** For square matrix $R$, a nonzero vector $\mathbf v$ is an eigenvector if

\[
R\mathbf v=\mu\mathbf v,
\]

where $\mu$ is its eigenvalue. Multiplying $R$ by $\mathbf v$ changes only the vector's size (and possibly sign), not its direction. The sum of all eigenvalues of the **unreduced correlation matrix** equals its trace, which here is $12$.

### 12.3 Two quantities people mistakenly call the same thing

The lecture prints both **initial eigenvalues** and **SS loadings**. They are related to variance accounting, but are not automatically identical:

- **Initial eigenvalues** from an unreduced correlation matrix are the eigenvalues of the *observed correlation structure*. They are the basis of the lecturer's eigenvalue scree plot.
- **SS loadings** are sums of **squared factor loadings** for a fitted, possibly rotated factor solution. They quantify variance assigned to each **estimated factor** under its particular model.

Treating every number in an `SS loadings` table as the same numerical quantity as an initial PCA eigenvalue can produce incorrect calculations. The lecturer sometimes uses the words together informally; keep the actual R objects and model stages distinct.

### 12.4 The exploratory all-factor fit (PDF pp. 6–7)

```r
fafit <- psych::fa(X, nfactors = ncol(X), rotate = "varimax")
print(fafit)
```

- `ncol(X)` counts the current number of input columns.
- There are **12 indicator columns**, so this requests **12 factors**.
- `fa()` uses **MINRES** by default unless another extraction method is specified.
- `rotate = "varimax"` requests an orthogonal rotation.

The printed result lists factors including `MR1`, `MR2`, ..., `MR12`. The lecture highlights initial large contributions and many very small later contributions.

**Source clarification:** A sentence on PDF p. 6 describes this as “nfactors = 13,” but the code and the actual 12-item `X` imply **12 factors**, and the displayed columns end at `MR12`. The lecture previously removed `QD`, leaving 12 items. The count **13** refers to columns in `dat` after removing ID but **before** removing `QD`; it does not describe the final indicator matrix `X`.

**Why this is not the final analysis:** Fitting as many factors as observed variables is an exploratory way of looking at variance patterns in the particular handout, not a recommendation to retain 12 meaningful business constructs. An overfactored model can be poorly determined or computationally unstable; use this output cautiously rather than treating it as the main substantive result.

### 12.5 How the exploratory SS loadings were reported

**Lecture result, PDF pp. 6–7:** The first factor entries displayed in the output have these values:

| Reported factor | SS loadings | Proportion Var | Cumulative Var |
|---|---:|---:|---:|
| MR1 | 2.46 | 0.21 | 0.21 |
| MR2 | 1.95 | 0.16 | 0.37 |
| MR3 | 1.92 | 0.16 | 0.53 |
| MR4 | 1.65 | 0.14 | 0.67 |
| MR5 | 0.22 | 0.02 | 0.68 |
| MR9 | 0.21 | 0.02 | 0.70 |
| MR7 | 0.13 | 0.01 | 0.71 |
| MR6 | 0.04 | 0.00 | 0.71 |
| MR8 | 0.03 | 0.00 | 0.72 |
| MR11 | 0.03 | 0.00 | 0.72 |
| MR10 | 0.01 | 0.00 | 0.72 |
| MR12 | 0.00 | 0.00 | 0.72 |

The lecture also prints a `Proportion Explained` row, which refers to shares of *total extracted common-factor SS loadings*, rather than shares of the full 12 standardized-variable units. Because the values are rounded, rows may not sum to the displayed totals exactly. The primary lesson is a substantial drop after the first few factors, **not** to retain all 12 factors.

### 12.6 The scree plot: find the bend

A **scree plot** orders initial eigenvalues from largest to smallest. Put the component/factor index on the horizontal axis and the corresponding value on the vertical axis. A common visual heuristic is to look for a sharp drop followed by a flatter tail, called the **elbow**.

The lecturer's code (PDF p. 7), restored to ordinary R syntax:

```r
n_factors <- length(fafit$e.values)

scree <- data.frame(
  Factor_n = as.factor(1:n_factors),
  Eigenvalue = fafit$e.values
)

ggplot(scree, aes(x = Factor_n, y = Eigenvalue, group = 1)) +
  geom_point() +
  geom_line() +
  xlab("Number of factors") +
  ylab("Initial eigenvalue") +
  labs(
    title = "Scree plot",
    subtitle = "Based on the unreduced correlation matrix"
  )
```

**Decode the unfamiliar R:**

- `fafit$e.values` extracts eigenvalues stored inside the fitted object.
- `length(...)` counts how many eigenvalues exist.
- `1:n_factors` creates integers 1 through the number of entries.
- `as.factor(...)` turns those values into categorical labels for the horizontal axis.
- `data.frame(...)` constructs a table with factor numbers and their eigenvalues.
- `ggplot(...)` prepares a plot using that table.
- `aes(...)` maps columns to axes; `group = 1` connects all points in one line.
- `geom_point()` adds points, and `geom_line()` connects them.
- `+` adds plot layers; it does not mean arithmetic addition of eigenvalues.

The resulting figure appears on **PDF p. 8**. It begins with a very high first eigenvalue, drops steeply, shows several subsequent values declining toward 1, and then enters a relatively flat region. The fall after the first four is visually consistent with a small number of important dimensions. Exact plotted eigenvalue coordinates beyond those explicitly printed in the handout are not invented here.

### 12.7 The Kaiser greater-than-one heuristic

**Teaching extension:** When PCA or initial correlation-matrix eigenvalues are examined, a familiar rough screening rule retains directions with eigenvalues greater than 1. This is sometimes called the **Kaiser criterion**. The reasoning is that one standardized observed variable carries one unit of variance.

Be careful: the rule does not automatically become authoritative for **common-factor** retention, especially after extraction and rotation. A very large factor's SS loading or an unreduced matrix eigenvalue is not a substitute for parallel analysis, fit, interpretation, or theory. The lecturer discusses the importance of large values and then uses parallel analysis to justify the actual four-factor solution.

### 12.8 Parallel analysis: compare signal with chance

**Parallel analysis** is easier to understand if you imagine building a control group for eigenvalues. Even a dataset of random variables can produce nonzero correlations and unequal sample eigenvalues. Therefore, rather than keeping factors simply because their eigenvalues seem large, we compare our observed factor-importance values with those obtained from simulated random datasets of comparable size.

A practical rule: **keep the early factors whose observed values exceed the corresponding random-data comparison**. The method may use simulated mean values or a selected upper quantile, depending on function settings. The decision is based on corresponding positions in the ordered sequences, not only on one overall threshold.

### 12.9 What the lecturer ran (PDF p. 8)

```r
poly_corr <- psych::polychoric(X)$rho
psych::fa.parallel(poly_corr, fa = "fa", n.iter = 100)
```

- `polychoric(X)$rho` estimates the ordinal-item latent-response correlation matrix.
- `fa = "fa"` requests the common **factor** version of parallel analysis rather than a PCA-only version.
- `n.iter = 100` requests 100 simulated trials.

**Lecture result printed on p. 8:**

```text
Parallel analysis suggests that the number of factors = 4
and the number of components = NA
```

The line `components = NA` should not be interpreted as “the number of PCA components is zero.” Since the function is asked for factor results with `fa = "fa"`, the component recommendation is **not available/not requested** in that printed configuration.

### 12.10 Read the parallel-analysis graph correctly (PDF p. 9)

The source's plot displays actual-data factor values on one curve and simulated random-data values on a separate dotted line. In the graph, the first four actual-data points lie above their corresponding random-data comparison points. From the fifth onward, the actual values do not consistently exceed the reference curve.

**Lecture conclusion:** Retain **four factors**. This supports the hypothesized organization of the 12 practice questions into four constructs.

The graph is **evidence for factor count**, not by itself evidence of good factor labeling or goodness of model fit. Those questions require examining the four-factor loadings and diagnostics.

### 12.11 A reproducibility detail about the sample size

**Teaching extension and documented-code correction:** The psych package documents that when `fa.parallel()` receives a precomputed correlation matrix, you should supply the number of observations through `n.obs`. The lecturer's printed code passes a $12\times12$ `poly_corr` matrix **without** `n.obs`. Some versions of `psych` may assume a default number of cases and warn about it, changing the random-data comparison. The R package's documentation describes this issue.

A more fully specified call is:

```r
set.seed(123)
parallel_result <- psych::fa.parallel(
  poly_corr,
  n.obs = nrow(X),
  fa = "fa",
  fm = "minres",
  n.iter = 100
)
```

The setting `n.obs = nrow(X)` supplies the **actual 259 respondents**. `set.seed(123)` controls the simulated random sequence so that results are repeatable on the same R setup. **Do not attribute the output of this amended call to the PDF** or assume it must print the identical recommendation without executing it. The lecturer's published result remains **four factors** for the call printed in the source.

A second route lets `fa.parallel()` calculate polychoric correlations from raw ordinal data, but its specific behavior depends on the installed `psych` version and options. Read `?fa.parallel` for the interface used in your installation. The distinction between raw cases and an already-computed correlation matrix is the important principle.

### 12.12 Why parallel analysis and interpretation should work together

Suppose parallel analysis recommends four factors but one factor is defined by only one strong-loading item. This creates a problem of measurement stability and interpretation. You might examine a three-factor model, a different rotation, item wording or additional data rather than mechanically accepting four. Conversely, a theoretically meaningful fifth construct may deserve serious examination if supported by further evidence.

The lecturer's dataset is favorable because the four-factor solution produces three indicators each for Knowledge Management, Cost Tracking, Production Control and Quality Control, with substantial loadings. Both statistical retention and interpretability point in a similar direction.

### 12.13 Make your own factor-selection decision tree

1. **Look at the correlations.** Is there any meaningful shared structure?
2. **Check factorability.** Do KMO, Bartlett and numerical diagnostics encourage EFA?
3. **Study the scree plot.** Is there a bend or sharp change?
4. **Use parallel analysis.** How many observed factor values exceed chance comparisons?
5. **Fit plausible candidate solutions.** Does each have coherent indicators and acceptable residual fit?
6. **Choose and justify a solution.** Report the statistical criteria and the substantive interpretation together.

For **this lecturer's reported workflow**, the chosen count is **four**. In another dataset it could be two, three or more.

---
# Part V. Fit, interpret and use the model

## 13. Four-factor MINRES model with psych::fa

### 13.1 What we know before fitting

The lecturer has established three key things:

- The data contain 12 practice indicators with meaningful correlations, and 259 respondents.
- KMO, Bartlett's test and the determinant support investigating common factors.
- Parallel analysis in the source suggests **four** factors.

The next step is to fit a model with exactly four latent dimensions and examine its loadings, common variance, residual fit and interpretation. The input here is the raw numeric data frame `X`, not the separately constructed polychoric matrix.

### 13.2 The actual R function call (PDF p. 9)

```r
fa.var <- psych::fa(
  r = X,
  nfactors = 4,
  fm = "minres",
  max.iter = 100,
  rotate = "varimax"
)

print(fa.var)
```

What each argument means:

| Argument | In this command | Why it is used |
|---|---|---|
| `r` | `X` | Input raw data containing the 12 indicators; `fa()` computes correlations internally |
| `nfactors` | `4` | Fit four common factors |
| `fm` | `"minres"` | Use minimum-residual factor extraction |
| `max.iter` | `100` | Set an iteration limit for numerical estimation; may be relevant for convergence |
| `rotate` | `"varimax"` | Rotate factors for clearer, uncorrelated factor structure |
| `fa.var <-` | Assignment | Save the fitted model object for examining scores, loadings and diagnostics |
| `print(fa.var)` | Display | Show the output for interpretation |

The original notes state 50 as a default iteration count. Defaults can differ by version or depend on the function's internals; the explicitly requested **100** is what matters for the code displayed.

### 13.3 What does MINRES optimize?

**Teaching extension:** Let $R$ be the observed correlation matrix and $\widehat R$ be the model-implied matrix. MINRES seeks factor-model parameters that make the **off-diagonal residual correlations** $r_{ij}-\hat r_{ij}$ small, based on a sum-of-squares criterion. An intuitive simplified expression is

\[
\operatorname{Loss}=\sum_{i<j}(r_{ij}-\hat r_{ij})^2.
\]

The observed values $r_{ij}$ are fixed by the data. By changing loadings, the algorithm tries to make the predicted cross-item correlations close to those observed. The mathematical optimization is handled by R. You are expected to understand **what is being minimized**, not hand-calculate a full 12-variable numerical optimization.

### 13.4 The polychoric alternative is a different analysis

The lecturer shows but does not execute a polychoric alternative in the printed output:

```r
# Alternative for ordinal data; not the source of the p. 10 table
fa.poly <- psych::fa(
  r = poly_corr,
  nfactors = 4,
  fm = "minres",
  max.iter = 100,
  rotate = "varimax",
  n.obs = nrow(X)
)
```

This code uses correlations estimated under an ordinal latent-response model. Because `poly_corr` is a **correlation matrix** rather than raw respondent data, supplying `n.obs` helps some fit computations; it does not provide original respondent rows for computing ordinary per-person scores. The values in `fa.poly` **need not match** the PDF's raw-`X` table. They should not be quoted as lecture results unless actually obtained by running this separate analysis.

**Consistency caution (Teaching extension):** The lecture uses a **polychoric** correlation matrix for parallel factor-count selection on page 8, but fits its reported final MINRES model from raw `X` using the function's ordinary correlation calculation on page 9. These are two different representations of ordinal-item associations. It is possible for a factor count selected under one representation to be less suitable under another. For a formal new analysis, assess retention, loading interpretation and fit under a consistently chosen correlation approach as well as comparing alternatives. This note does not change any printed lecture result.

## 14. Reading every important loading and variance summary

### 14.1 The full printed four-factor pattern (PDF p. 10)

The lecturer's model reports the following standardized **Varimax-rotated loadings**, communalities, uniquenesses and complexities. The column order is important: the source prints **MR1, MR3, MR2, MR4**, not `MR1, MR2, MR3, MR4`.

**Lecture result:**

| Item | MR1 | MR3 | MR2 | MR4 | $h^2$ | $u^2$ | `com` |
|---|---:|---:|---:|---:|---:|---:|---:|
| KM1 | **0.80** | 0.13 | 0.15 | 0.24 | 0.73 | 0.27 | 1.3 |
| KM2 | **0.82** | 0.22 | 0.08 | 0.20 | 0.76 | 0.24 | 1.3 |
| KM3 | **0.88** | 0.20 | 0.17 | 0.18 | 0.88 | 0.12 | 1.3 |
| QC1 | 0.31 | 0.06 | 0.16 | **0.55** | 0.43 | 0.57 | 1.8 |
| QC2 | 0.23 | 0.34 | 0.01 | **0.74** | 0.72 | 0.28 | 1.6 |
| QC3 | 0.13 | 0.35 | 0.13 | **0.66** | 0.59 | 0.41 | 1.7 |
| CT1 | 0.15 | **0.72** | 0.08 | 0.14 | 0.56 | 0.44 | 1.2 |
| CT2 | 0.19 | **0.75** | 0.10 | 0.21 | 0.65 | 0.35 | 1.3 |
| CT3 | 0.15 | **0.69** | 0.15 | 0.25 | 0.59 | 0.41 | 1.5 |
| PC1 | 0.18 | -0.04 | **0.82** | 0.10 | 0.72 | 0.28 | 1.1 |
| PC2 | 0.13 | 0.11 | **0.78** | 0.22 | 0.68 | 0.32 | 1.3 |
| PC3 | 0.04 | 0.23 | **0.67** | -0.03 | 0.51 | 0.49 | 1.2 |

**How to read exactly one row:** `KM1` has loading 0.80 on MR1, and smaller loadings of 0.13, 0.15 and 0.24 on the other factors. Its relationship with MR1 is clearly strongest. Its communality is 0.73, so 73% of its standardized variance is accounted for by the four-factor model. Its uniqueness is 0.27. Complexity 1.3 indicates a mainly single-factor item, though its other loadings are not all zero.

### 14.2 Calculate a communality by hand from the slide

For the first row of the fitted **four-factor** model, use the squared loadings:

\[
\begin{aligned}
h_{\mathrm{KM1}}^2
&\approx(0.80)^2+(0.13)^2+(0.15)^2+(0.24)^2\\
&=0.6400+0.0169+0.0225+0.0576\\
&=0.7370.
\end{aligned}
\]

The PDF reports $h^2=0.73$. The slight difference between 0.7370 and the value printed to two decimals can be explained by **rounding of the displayed loadings**; R calculates the communality using the loadings' underlying full precision.

Then the reported uniqueness is:

\[
u^2=1-0.73=\boxed{0.27}.
\]

A second example, PC1, uses the slide's factor loadings:

\[
\begin{aligned}
h_{\mathrm{PC1}}^2
&\approx0.18^2+(-0.04)^2+0.82^2+0.10^2\\
&=0.0324+0.0016+0.6724+0.0100\\
&=0.7164\approx0.72.
\end{aligned}
\]

Thus $u^2\approx1-0.72=0.28$, matching the printed table.

**Exam warning:** You square **every retained factor loading** when calculating orthogonal-model communality, not only the largest one. Also, a negative loading becomes positive when squared.

### 14.3 Give each factor a meaning from its indicators

We now work **across columns**, not just across the rows:

| Factor code in this PDF | Strong primary indicators | Sensible substantive interpretation |
|---|---|---|
| `MR1` | KM1 (0.80), KM2 (0.82), KM3 (0.88) | **Knowledge Management** |
| `MR3` | CT1 (0.72), CT2 (0.75), CT3 (0.69) | **Cost Tracking** |
| `MR2` | PC1 (0.82), PC2 (0.78), PC3 (0.67) | **Production Control** |
| `MR4` | QC1 (0.55), QC2 (0.74), QC3 (0.66) | **Quality Control** |

This is the essential result. The extracted factor numbers are arbitrary codes. Their **patterns of observed item associations** determine the names.

### 14.4 Identify weaker items and cross-loadings

Compare QC1 and KM3:

- **KM3:** primary loading 0.88; communality 0.88; uniqueness 0.12. The four-factor solution represents the item strongly and it is a clear Knowledge Management indicator.
- **QC1:** primary loading 0.55 on MR4; communality 0.43; uniqueness 0.57. It still appears to be a Quality Control indicator, but more than half its variance is outside the common four-factor representation.

QC1 also loads 0.31 on MR1. QC2 loads 0.34 on MR3; QC3 loads 0.35 on MR3. These secondary loadings deserve attention, especially if the real item wording suggests overlap between quality, knowledge and costs. None of these secondary loadings is above 0.4 in the displayed results, but exact interpretive rules are contextual.

PC1 is particularly clean: primary loading 0.82 on MR2, other loadings 0.18, -0.04 and 0.10, and complexity 1.1. **A high primary loading, low cross-loadings and low complexity** together support interpreting it as a focused Production Control item.

### 14.5 What does mean item complexity = 1.4 mean?

The source prints:

```text
Mean item complexity = 1.4
```

Complexity is calculated for each question, then summarized. A mean of 1.4 indicates that **on average, the factor indicators lean toward a relatively simple structure**, with many items dominated by one factor. It is not “1.4 factors extracted.” The model still has four factors.

### 14.6 SS loadings: the contribution of each factor

A factor's **SS loading** is the sum of squared loadings across all observed items for that factor, under the orthogonal solution. For MR1:

\[
SS_{\mathrm{MR1}}=\sum_{i=1}^{12}\lambda_{i,\mathrm{MR1}}^2.
\]

If you were to square all 12 entries in the MR1 column of the source's loading matrix and add them, you would get approximately its reported **2.38**. It is not simply $0.80+0.82+0.88$: the model includes small loadings of other items too, and the quantities are *squares*.

**Lecture result, PDF p. 10:**

| Summary | MR1 | MR3 | MR2 | MR4 |
|---|---:|---:|---:|---:|
| SS loadings | 2.38 | 1.97 | 1.86 | 1.60 |
| Proportion Var | 0.20 | 0.16 | 0.16 | 0.13 |
| Cumulative Var | 0.20 | 0.36 | 0.52 | 0.65 |
| Proportion Explained | 0.30 | 0.25 | 0.24 | 0.20 |
| Cumulative Proportion | 0.30 | 0.56 | 0.80 | 1.00 |

The percentages are rounded; for example $2.38/12\approx0.1983$, printed as **0.20**. It tells us MR1 captures approximately 20% of the total variance of the 12 standardized indicators in this common-factor model.

### 14.7 The most important variance calculation

Add the SS loadings:

\[
2.38+1.97+1.86+1.60=\boxed{7.81}.
\]

The 12 standardized observed variables collectively have 12 units of variance, so the factors explain approximately

\[
\frac{7.81}{12}=0.6508\approx\boxed{65\%}
\]

of **total observed standardized variance**. That is why the last `Cumulative Var` value in the source is **0.65**.

Now compute the share of **extracted common-factor variance** attributed to MR1:

\[
\frac{2.38}{7.81}\approx0.305\approx\boxed{30\%}.
\]

This is why the source also prints `Proportion Explained = 0.30` for MR1. The two percentages differ because they use **different denominators**:

- `Proportion Var`: divide by **12 total standardized variance units**.
- `Proportion Explained`: divide by **7.81 variance units represented by the retained factors**.

**Critical exam distinction:** `Cumulative Proportion = 1.00` for the fourth factor does **not** mean the four-factor model explains 100% of the original 12-item variation. It means all **the common-factor variance attributed to the four retained factors** has been accounted for in that cumulative row. The corresponding percentage of original standardized variance remains about **65%**.

### 14.8 Visualize where the unexplained 35% went

Out of the 12 standardized variance units, the model's four factors account for about 7.81. The remaining approximate **4.19 units** are represented by item uniquenesses, subject to rounding and the model's assumptions:

\[
12-7.81=4.19,\qquad\frac{4.19}{12}\approx0.3492.
\]

So it is reasonable to say the fitted model leaves approximately **35% of observed standardized item variance unexplained by its common factors**. It is **not** appropriate to call that 35% “incorrect survey answers.” Unique variance has a legitimate role in common FA.

## 15. Does the factor model fit?

### 15.1 A model can be interpretable and still fit imperfectly

Finding four readable groups is promising, but we also need to ask whether the factor model reproduces the actual correlation matrix well. A model could force questions into attractive labels while leaving important associations unexplained.

Write the residual correlation for a pair of items as

\[
e_{ij}=r_{ij}-\hat r_{ij}.
\]

Here $r_{ij}$ is their observed correlation and $\hat r_{ij}$ is their model-predicted correlation. Small residuals mean the fitted factor model describes the observed relation reasonably well.

### 15.2 RMSR: typical residual-correlation magnitude

**RMSR** stands for Root Mean Square of Residuals. A simplified interpretation is the root of the average squared difference between observed and reproduced correlations. A common version is

\[
\mathrm{RMSR}\approx\sqrt{\frac{1}{N_{\mathrm{pairs}}}\sum_{i<j}(r_{ij}-\hat r_{ij})^2}.
\]

The exact calculation and any degree-of-freedom adjustment depend on the package's implementation. The idea is straightforward: RMSR close to zero means **small correlation-modeling errors on average**.

**Lecture result, PDF p. 10:**

```text
RMSR = 0.02
Degrees-of-freedom-corrected RMSR = 0.03
```

The handout gives a rule of thumb that **RMSR below 0.08** is good. Both displayed values are below that threshold. They support a close reconstruction of the inter-item correlations.

### 15.3 TLI: fit compared with a poor baseline

The **Tucker–Lewis Index (TLI)** is a comparative fit index that accounts in part for model complexity. Intuitively, it asks whether the factor model improves substantially over a simpler poor-fitting baseline without rewarding unnecessary complexity too readily.

**Lecture result:**

\[
\mathrm{TLI}=\boxed{0.974}.
\]

The source calls values greater than **0.90** very good. With TLI 0.974, this diagnostic favors the fitted four-factor model. **Teaching nuance:** TLI is not a literal 97.4% probability that the model is true; comparative fit indices can also depend on the data, baseline and estimation approach.

### 15.4 RMSEA: approximate model misfit per degree of freedom

**RMSEA** means Root Mean Square Error of Approximation. It is designed to quantify approximate lack of fit while taking model complexity into account. Lower values generally indicate better approximate fit when the metric and estimation are appropriate.

**Lecture result, PDF p. 10:**

\[
\mathrm{RMSEA}=\boxed{0.048},\quad
90\%\ \mathrm{CI}=[0.014,0.075].
\]

The handout gives these guidelines:

- RMSEA below **0.05**: excellent approximate fit.
- RMSEA below **0.08**: acceptable approximate fit.

Because the estimate is 0.048, the source calls the four-factor model an excellent fit by this measure. The **90% confidence interval** gives a range of plausible population RMSEA values under the procedure's assumptions. Here it reaches 0.075, so uncertainty allows anything from very low misfit to moderately higher misfit. Do not report just the point estimate and hide the interval when a fuller account is needed.

### 15.5 Put the MINRES indicators together

| Fit evidence | Lecture value | Interpretation |
|---|---:|---|
| RMSR | 0.02 | Very small typical residual correlations |
| df-corrected RMSR | 0.03 | Also small |
| TLI | 0.974 | Favorable comparative fit |
| RMSEA | 0.048 | Favorable approximate fit estimate |
| RMSEA 90% interval | 0.014–0.075 | Indicates uncertainty in approximate misfit |
| Mean item complexity | 1.4 | Relatively readable factor structure |

**Model conclusion:** These diagnostics generally support the four-factor MINRES solution, while the individual item analysis shows that some questions, notably QC1, are less well represented than others.

### 15.6 Is a small RMSEA a proof of a correct model?

No. A factor model with acceptable fit could still suffer from misspecified constructs, biased sampling, poorly worded questions, ordinal assumptions, hidden method effects or unstable loadings. Different fit indicators can disagree. Good statistical fit supports an approximation; it does not authenticate the factor labels as objectively true.

## 16. Maximum-likelihood EFA with stats::factanal

### 16.1 Why look at another extraction method?

The lecturer next fits the **same four-factor concept** using **maximum-likelihood EFA**, available through base R's `stats` package. This is useful because it gives another set of estimates and an explicit likelihood-based chi-square test of model sufficiency.

The purpose is not to force every method to print exactly the same numbers. If two different estimation procedures produce similar loading patterns, that strengthens confidence in the *broad pattern*. Differences in fit tests and assumptions still matter.

### 16.2 Run the lecturer's command (PDF p. 11)

```r
factanal.var <- stats::factanal(
  X,
  factors = 4,
  scores = "regression",
  rotation = "varimax"
)

print(factanal.var)
```

| Argument | Meaning |
|---|---|
| `X` | Numeric item data matrix/data frame |
| `factors = 4` | Fit four common factors |
| `scores = "regression"` | Request estimated respondent factor scores using a regression scoring approach |
| `rotation = "varimax"` | Rotate to an orthogonal simple structure |

**Why maximum likelihood needs care:** Traditional ML factor analysis assumes a multivariate-normal model for the continuous observed responses when using its usual likelihood-ratio inference. The current dataset contains 1–5 Likert items, which are ordinal rather than genuinely continuous. The lecturer explicitly warns about this on PDF pp. 11–12.

### 16.3 The exact uniquenesses from `factanal()`

**Lecture result, PDF p. 11:**

| Item | ML uniqueness | Item | ML uniqueness |
|---|---:|---|---:|
| KM1 | 0.272 | KM2 | 0.238 |
| KM3 | 0.117 | QC1 | 0.577 |
| QC2 | 0.278 | QC3 | 0.403 |
| CT1 | 0.451 | CT2 | 0.355 |
| CT3 | 0.405 | PC1 | 0.269 |
| PC2 | 0.332 | PC3 | 0.497 |

For example, ML assigns KM3 uniqueness **0.117**, or 11.7% unique variance, suggesting it is represented very well by the four common factors. QC1 has uniqueness **0.577**, so approximately 57.7% of its variance lies outside the ML model's common-factor representation. That concern is consistent with the MINRES table's QC1 uniqueness of 0.57, although these are separate estimates.

### 16.4 The ML loadings printed by the lecturer

The source suppresses very small printed coefficients in the ordinary `factanal()` loading display. In the table below, **“not printed” does not mean exactly zero**. The remaining displayed coefficients have been retained as they appear (PDF p. 11).

| Item | Factor 1 | Factor 2 | Factor 3 | Factor 4 |
|---|---:|---:|---:|---:|
| KM1 | **0.794** | 0.132 | 0.152 | 0.238 |
| KM2 | **0.820** | 0.212 | not printed | 0.197 |
| KM3 | **0.885** | 0.209 | 0.165 | 0.169 |
| QC1 | 0.321 | not printed | 0.162 | **0.538** |
| QC2 | 0.232 | 0.335 | not printed | **0.745** |
| QC3 | 0.125 | 0.338 | 0.138 | **0.669** |
| CT1 | 0.146 | **0.704** | not printed | 0.155 |
| CT2 | 0.189 | **0.747** | not printed | 0.205 |
| CT3 | 0.149 | **0.703** | 0.140 | 0.242 |
| PC1 | 0.179 | not printed | **0.829** | 0.104 |
| PC2 | 0.132 | 0.121 | **0.770** | 0.206 |
| PC3 | not printed | 0.234 | **0.668** | not printed |

The structure remains similar:

- Factor 1: Knowledge Management questions.
- Factor 2: Cost Tracking questions.
- Factor 3: Production Control questions.
- Factor 4: Quality Control questions.

**Why are the labels different from the MINRES printed order?** MINRES's columns appeared as `MR1, MR3, MR2, MR4`. `factanal()` prints Factor 1–4 in its own order. Compare the **actual high-loading item groups**, not the factor numbers in isolation.

To force a more complete loading display in R:

```r
print(factanal.var$loadings, cutoff = 0, digits = 3)
```

This prints small coefficients instead of suppressing them, although the results still depend on the fitted object and numerical precision.

### 16.5 ML SS loadings and total variance

**Lecture result, PDF p. 11:**

| Summary | Factor 1 | Factor 2 | Factor 3 | Factor 4 |
|---|---:|---:|---:|---:|
| SS loadings | 2.388 | 1.958 | 1.864 | 1.595 |
| Proportion Var | 0.199 | 0.163 | 0.155 | 0.133 |
| Cumulative Var | 0.199 | 0.362 | 0.517 | 0.650 |

The printed cumulative variance again reaches **0.650**, or about **65%** of total standardized observed variance. Notice how similar this is to the four-factor MINRES solution. This does not mean the two methods are identical or that their inferential assumptions are interchangeable.

### 16.6 The ML goodness-of-fit test and its surprising result

The source prints:

```text
Test of the hypothesis that 4 factors are sufficient.
Chi-square statistic = 37.66
Degrees of freedom = 24
p-value = 0.0376
```

Here the test's null hypothesis is that a **four-factor common-factor model is sufficient** to explain the population covariance/correlation structure under the ML model. That is a different null hypothesis from Bartlett's earlier **identity matrix** test.

- $H_0$: The four-factor ML model is an exact adequate population covariance model.
- $H_1$: That exact four-factor model does not reproduce the population covariance structure.

Because $0.0376<0.05$, **reject $H_0$ at the conventional 5% level**. The data provide evidence of some statistically detectable mismatch with an exact four-factor ML fit, under the test's assumptions. This is a particularly important point because the same lecture reports favorable approximate-fit indices for its MINRES analysis.

**Do not erase this disagreement.** The defensible interpretation is nuanced: the four-factor representation is substantively clear, and the MINRES approximate-fit indicators are favorable, but the ML exact-fit test is statistically significant. Possible reasons include modest residual misfit, the sensitivity of exact-fit tests, extraction-method differences and the use of continuous-normal ML methods on ordinal items. You cannot identify which cause matters most from the supplied outputs alone.

### 16.7 What are 24 degrees of freedom doing here?

**Teaching extension:** With $p=12$ observed variables and $m=4$ orthogonal common factors, one conventional formula for degrees of freedom in exploratory common factor analysis is

\[
\mathrm{df}=\frac{(p-m)^2-(p+m)}{2}.
\]

Insert the lecture's values:

\[
\mathrm{df}=\frac{(12-4)^2-(12+4)}{2}
=\frac{64-16}{2}=\boxed{24}.
\]

This matches the ML output. It reflects the difference between the number of independent observed correlations and the freely estimable aspects of the factor structure, allowing for rotational indeterminacy. It is **not** the 66 degrees of freedom used in Bartlett's initial test.

### 16.8 Why not simply add a fifth factor?

The lecturer notes that when a sufficient-factors test is rejected, one might need more factors. That is **one possible response**, not a guaranteed fix. Adding a factor can increase apparent fit while making the model less interpretable or less stable. A better process is to examine residuals, item cross-loadings, ordinal measurement, estimation assumptions and competing models. A method better matched to the Likert responses may also be informative.

### 16.9 MINRES and ML side by side

| Criterion | `psych::fa(..., fm="minres")` | `stats::factanal(...)` |
|---|---|---|
| Lecturer's data input | Raw `X` | Raw `X` |
| Factors | 4 | 4 |
| Rotation | Varimax | Varimax |
| Estimation objective | Minimize correlation residuals | Maximize likelihood under the model |
| Main visible pattern | KM / CT / PC / QC | Very similar KM / CT / PC / QC |
| Total variance summary | About 65% | About 65% |
| Reported diagnostic | RMSR .02, TLI .974, RMSEA .048 | $\chi^2(24)=37.66$, $p=.0376$ |
| Practical limitation | Correlation choice, item/model diagnostics matter | Continuous-normal model assumptions especially important for inferential test |
| Appropriate conclusion | Promising approximate four-factor representation | Similar loadings, but exact-fit hypothesis rejected at 5% |

## 17. A factor diagram and an evidence-based interpretation

### 17.1 What the lecturer plotted (PDF p. 12)

```r
psych::fa.diagram(fa.var)
```

The resulting figure is a **factor loading/path diagram**. It places factor nodes on one side and observed item labels on the other, with arrows connecting the main factor-item relationships. The figure rounds some loadings to one decimal place.

The page 12 diagram visually groups:

- `MR1` with `KM3`, `KM2`, `KM1`, shown at approximately 0.9, 0.8, 0.8.
- `MR3` with `CT2`, `CT1`, `CT3`, shown at approximately 0.7 each.
- `MR2` with `PC1`, `PC2`, `PC3`, shown at approximately 0.8, 0.8, 0.7.
- `MR4` with `QC2`, `QC3`, `QC1`, shown at approximately 0.7, 0.7, 0.6.

This is **not** a chart of respondents or a regression of `QD` on factors. It is a chart of **how the factor model links each observed item to its principal latent factor**. Some small cross-loadings are not drawn by the diagram's display defaults, although they still appear in the full table.

### 17.2 How to read a path diagram as a beginner

An ellipse or circle typically represents an inferred factor. A rectangular item label represents an observed variable. A connecting line with a number shows a loading. If three Knowledge Management items connect strongly to MR1, you can make the substantive statement that they jointly characterize that factor in this fitted model.

**Teaching caution:** The arrows in a factor loading diagram show a proposed measurement relationship, not independently established causal effects. Even when the drawing points from the factor toward the question, EFA alone does not prove physical causation.

### 17.3 A defensible written interpretation

> The 12 management-practice items are represented by four interpretable common factors. The strongest associations identify MR1 as Knowledge Management, MR3 as Cost Tracking, MR2 as Production Control, and MR4 as Quality Control. The four factors account for approximately 65% of the total standardized item variance, while individual item communalities vary. The MINRES approximate-fit indices are favorable, although the separately fitted ML model gives a significant exact-fit test. The four factors are therefore a useful exploratory representation, not a conclusively verified measurement structure.

That is a richer and more accurate conclusion than simply saying “factor analysis was successful.”

## 18. Advantages, limitations and common mistakes

### 18.1 Advantages in the lecture (PDF pp. 12–13)

The lecture identifies the following practical strengths, expanded here into plain language:

1. **Useful dimensionality reduction.** Related questions can be represented by a smaller number of interpretable factors. In this example 12 indicators lead to four proposed constructs.
2. **Allows researchers to incorporate expertise.** Prior knowledge about management practices helps select candidate factor counts and interpret the resulting patterns. Factor names should not be determined by the computer alone.
3. **Helps discover hidden structure.** Shared relations between items can reveal plausible constructs not obvious when looking at a large raw data table.
4. **Software availability.** Packages such as `psych` and `stats` make the computation relatively accessible; the harder work remains thoughtful measurement and interpretation.
5. **CFA can test hypotheses.** This is an advantage of the broader **factor-analysis family** cited on PDF p. 13, not something demonstrated by the lecture's exploratory MINRES command.

### 18.2 Disadvantages in the lecture (PDF p. 13)

**Choosing factor count can be difficult.** Scree plots can be ambiguous, and different procedures may recommend different numbers. The lecture's parallel analysis is helpful but cannot eliminate all judgment.

**Interpreting factors can be difficult.** Factors are mathematical structures until the researcher examines which items they represent. A label may sound compelling while having weak measurement support.

**Input measurement levels matter.** Standard continuous-item methods are not perfectly matched to ordinal/binary response scales. The lecture specifically suggests polychoric correlations as an alternative for ordered Likert items.

### 18.3 Additional limitations worth knowing (Teaching extensions)

- **Factor indeterminacy:** Individual factor scores are estimates and can depend on how scores are computed; there is no unique perfectly observed factor score implied by EFA alone.
- **Rotation ambiguity:** Different rotations can produce different-looking loading matrices while representing similar overall correlations.
- **Question quality:** Poor, repetitive or double-barreled items can create misleading structures.
- **Sampling:** A factor pattern found in one organization or group need not generalize elsewhere.
- **Ordinal and nonnormal data:** Numerical estimates, standard errors and test decisions may change under methods suited to the item scale.
- **Not a causal proof:** Common variation does not establish that the hypothesized factor caused every observed outcome.
- **Model selection uncertainty:** Selecting factor count after examining the data makes subsequent conclusions exploratory, not pre-registered confirmations.
- **Downstream prediction:** Using factor scores as though they are error-free observed variables ignores uncertainty in their estimation.

### 18.4 Ten common interpretation mistakes

| Mistake | Better interpretation |
|---|---|
| “EFA proves Knowledge Management exists.” | It provides a statistical structure consistent with that proposed construct. |
| “PCA and EFA are the same because both reduce columns.” | PCA models total observed variance; EFA models common latent variation. |
| “A loading of 0.80 means 80% explained variance.” | Under suitable assumptions, the single factor's squared loading is $0.80^2=64\%$. |
| “The largest loading is the only one included in communality.” | For orthogonal factors, square and sum *all* retained factor loadings. |
| “Uniqueness is measurement error only.” | It includes item-specific variance and potentially measurement error. |
| “Cumulative Proportion = 1.00 proves all original variance is explained.” | It means 100% of the variance attributed to the retained factors; total item variance explained is about 65%. |
| “Varimax proves business constructs are independent.” | Orthogonality is imposed by the selected rotation, not demonstrated as a real-world causal fact. |
| “Bartlett's small $p$-value proves four factors are enough.” | Bartlett tests identity of the population correlation matrix, not the adequacy of four factors. |
| “The ML four-factor model passes its test because p = 0.0376.” | At 0.05, that exact-fit hypothesis is **rejected**. |
| “Factor scores are actual observed quantities.” | They are uncertain estimates inferred from the item responses. |

---
## 19. From factor scores to a regression model

### 19.1 Why do regression after EFA?

Up to this point, Factor Analysis has helped understand **how management-practice survey items are organized**. The lecturer now poses a downstream business question: can those inferred practice dimensions help explain or predict the **Quality Delivery** outcome, `QD`?

The workflow changes from **unsupervised measurement** to **supervised prediction**:

1. Infer four factors from the 12 practice items. No `QD` values are needed for this stage.
2. Estimate a factor score for each respondent on each factor.
3. Construct a smaller dataset containing `QD` and the four factor scores.
4. Split that dataset into training and testing groups.
5. Fit a linear regression predicting `QD` from the four scores.
6. Examine coefficients, multicollinearity and held-out prediction errors.

This is not the same as running a factor model “with `QD` as the fifth factor.” `QD` is an **outcome variable**, and the extracted four factor scores are its **predictors**.

### 19.2 What is a factor score, concretely?

Suppose a respondent gives relatively high answers to KM1, KM2 and KM3. If those questions all load heavily on the Knowledge Management factor, the fitted scoring procedure may assign that respondent a relatively high **Knowledge Management factor score**.

A factor score is not necessarily between 1 and 5, because it is typically built from standardized item answers with estimated weights. Zero is usually a reference point in the resulting score distribution; negative scores are ordinary. For instance, a score of -0.5 is **not** negative Knowledge Management in an absolute sense. It indicates a lower estimated position relative to the chosen score scaling and sample reference.

### 19.3 How the computer calculates scores (Teaching extension)

A common regression-based factor-scoring approach constructs a weight matrix $W$ and multiplies standardized data $Z$ by those weights:

\[
\widehat F=ZW.
\]

For the lecturer's dataset:

- $Z$ has **259 rows and 12 standardized item columns**.
- $W$ has **12 rows and four score-weight columns**.
- $\widehat F$ has **259 rows and four estimated factor-score columns**.

This matrix multiplication is dimensionally valid because the inner dimensions are both 12:

\[
(259\times12)(12\times4)=(259\times4).
\]

The weights are **not usually identical** to the loadings; they are derived to estimate factor positions given the patterns among the observed variables. Several possible scoring methods exist. That is why factor scores should be described as estimates.

### 19.4 Retrieve the lecturer's factor scores (PDF p. 13)

```r
head(fa.var$scores)
```

- `fa.var` holds the previously fitted four-factor MINRES model.
- `$scores` accesses the estimated scores for respondents.
- `head(...)` prints the first six rows.

**Lecture result, PDF p. 13:**

| Respondent row | MR1 | MR3 | MR2 | MR4 |
|---|---:|---:|---:|---:|
| 1 | 2.01260015 | -1.9767878 | -0.47329353 | -1.00166239 |
| 2 | -0.38407642 | 0.7690957 | -1.27869740 | 0.72507389 |
| 3 | -0.88895375 | -0.3139817 | 0.69968145 | -1.41356293 |
| 4 | -0.02333943 | 0.5740892 | -1.65051384 | -0.03384382 |
| 5 | 0.45294671 | 0.5995725 | 0.01591114 | -0.60242082 |
| 6 | -2.37048356 | 1.6183406 | 0.50480765 | 0.32576873 |

**Read row 1:** This respondent has a high positive estimated MR1 score and a strongly negative estimated MR3 score, relative to the factor-score scale. Since MR1 was interpreted as Knowledge Management and MR3 as Cost Tracking, the model estimates that this respondent has comparatively stronger Knowledge Management responses than Cost Tracking responses. It does **not** say the respondent has a 201% Knowledge Management rating, and it does not automatically establish that knowledge caused the low cost rating.

### 19.5 Bring the outcome back into the data

The lecturer writes:

```r
regdata <- cbind(dat["QD"], fa.var$scores)
head(regdata)
```

`dat["QD"]` selects the `QD` column while keeping a one-column data frame. `cbind(...)` means **column-bind**: attach the four score columns beside the outcome column in the same row order.

**Lecture result, PDF p. 13:** The first six `QD` outcomes are **4, 4, 2, 3, 4, 3**, and the score columns are the same four numbers per respondent shown above. The resulting data frame has five columns:

\[
\underbrace{QD}_{\text{outcome}},\quad
\underbrace{MR1, MR3, MR2, MR4}_{\text{four estimated factor-score predictors}}.
\]

At this point we have compressed the 12 practice items to four predictors for use in regression. We have **not** yet tested prediction performance.

### 19.6 Understand linear regression before using it

**Linear regression** models how the expected value of a numerical outcome relates to one or more predictors. For one factor score:

\[
\widehat{QD}=\beta_0+\beta_1F_1.
\]

Here $\widehat{QD}$ is a predicted Quality Delivery value, $\beta_0$ is the intercept and $\beta_1$ is the slope associated with Factor 1.

With four factor scores, the model is

\[
\widehat{QD}=\beta_0+\beta_1F_1+\beta_2F_2+\beta_3F_3+\beta_4F_4.
\]

Every slope describes how the predicted outcome changes with a one-unit increase in that score **while the other three scores are held constant**. The coefficients describe associations conditional on included predictors, not necessarily causal effects. And because the predictors are estimated scores, their units are those of the factor-score procedure, not the original 1–5 response categories.

### 19.7 Why make separate training and test datasets?

If we estimate a predictive model on all respondents and evaluate it on the **same respondents**, we risk giving ourselves an overly optimistic assessment of how it will perform on new people. A training/test split addresses this by fitting regression coefficients on one subset and evaluating the predictions on data not used to fit those regression coefficients.

The lecturer uses an approximately **70% training / 30% test** split.

```r
set.seed(100)
indices <- sample(1:nrow(regdata), 0.7 * nrow(regdata))

train <- regdata[indices, ]
test  <- regdata[-indices, ]
```

Decode each step:

- `set.seed(100)` makes the pseudorandom split repeatable under a comparable R setup.
- `1:nrow(regdata)` creates the list of possible row numbers, 1 through 259.
- `sample(..., size)` randomly chooses the training-row indices without replacement by default.
- `regdata[indices, ]` keeps chosen rows as the **training set**.
- `regdata[-indices, ]` excludes those rows, leaving the **test set**.

Why the negative sign works: unlike `-1` when indexing columns, here `-indices` is a **vector of row numbers to omit**. So the test set contains the remaining respondents.

### 19.8 How many respondents are in the groups?

There are 259 respondents. The requested training size is $0.7\times259=181.3$, and the reported fitted regression has **176 residual degrees of freedom** with **five estimated regression coefficients** (four slopes plus one intercept). Therefore, the printed model used **181 training observations**, since $181-5=176$.

The rest are **259 - 181 = 78 test observations**. Thus the split is approximately 69.9% training and 30.1% test. It is not exactly 70/30 because the number of people must be an integer.

**Teaching extension:** To state the size as an integer explicitly and avoid relying on coercion details, you could write:

```r
n_train <- floor(0.7 * nrow(regdata))
indices <- sample(seq_len(nrow(regdata)), size = n_train)
```

This change is equivalent in intended sample count for the lecture, but may not reproduce exactly the original row selection under every software setup. **For reproducing the PDF**, retain the lecturer's `sample(...)` command and `set.seed(100)`.

### 19.9 Fit the regression on training observations (PDF p. 14)

```r
mod <- lm(QD ~ ., data = train)
summary(mod)
```

R's **formula syntax** is compact:

- `QD` is the response on the **left** of `~`.
- `.` means **all other columns in `train`** are explanatory variables.
- `lm(...)` fits an ordinary least-squares linear model.
- `summary(mod)` prints fitted coefficients, standard errors, tests, residual summaries and the overall fit.

Here it is equivalent in intent to:

```r
mod <- lm(QD ~ MR1 + MR3 + MR2 + MR4, data = train)
```

R can interpret column names with underscores or digits. The order of factors in a displayed coefficient table does not change their meaning.

### 19.10 The actual fitted coefficients and inferential statistics

**Lecture result, PDF p. 14:**

| Predictor | Estimate | Std. Error | $t$ value | $p$-value |
|---|---:|---:|---:|---:|
| Intercept | 3.55847 | 0.02914 | 122.133 | $<2\times10^{-16}$ |
| MR1 | 0.72867 | 0.03007 | 24.232 | $<2\times10^{-16}$ |
| MR3 | 0.28648 | 0.03360 | 8.526 | $6.72\times10^{-15}$ |
| MR2 | 0.07361 | 0.03041 | 2.420 | 0.0165 |
| MR4 | 0.62750 | 0.03465 | 18.109 | $<2\times10^{-16}$ |

The lecture also displays a conventional significance marker `***` for very small $p$-values and `*` for MR2. Those symbols are shorthand for statistical thresholds. The actual coefficient and $p$-value are more informative than the number of stars.

### 19.11 Write the regression equation correctly

The fitted **prediction equation**, using the lecture's exact coefficient values, is

\[
\boxed{\widehat{QD}=3.55847+0.72867\,MR1+0.28648\,MR3+0.07361\,MR2+0.62750\,MR4.}
\]

The lecture writes the same equation with MR2 before MR3. Reordering terms in an addition does not change the numerical answer. Here we keep the order matching the printed coefficient table.

Interpretation of each coefficient **while holding the other score predictors constant**:

- **Intercept 3.55847:** predicted `QD` when all four estimated factor scores are 0, provided that reference point is meaningful on the training score scale.
- **MR1 coefficient 0.72867:** a one-unit higher Knowledge Management factor score is associated with a **0.72867-unit higher** predicted Quality Delivery score, conditional on the other factors.
- **MR3 coefficient 0.28648:** a one-unit higher Cost Tracking score is associated with a **0.28648-unit higher** predicted Quality Delivery score, conditional on the other factors.
- **MR2 coefficient 0.07361:** a one-unit higher Production Control score is associated with a **0.07361-unit higher** predicted outcome, conditional on the others. Its reported $p=0.0165$ is below 0.05, even though the estimated slope is much smaller than MR1's or MR4's.
- **MR4 coefficient 0.62750:** a one-unit higher Quality Control score is associated with a **0.62750-unit higher** predicted outcome, conditional on the others.

**A significant $p$-value is not the same as large practical effect.** Compare coefficient sizes only after considering how the factor scores are scaled, their estimation uncertainty and whether the linear approximation makes sense.

### 19.12 Calculate a prediction by hand using a real lecture row

Use **respondent row 3**, whose four factor scores appear in the lecture's page 13 table:

\[
MR1=-0.88895375,\quad MR3=-0.31398170,
\quad MR2=0.69968145,\quad MR4=-1.41356293.
\]

Insert them into the fitted equation:

\[
\begin{aligned}
\widehat{QD}\approx{}&3.55847\\
&+0.72867(-0.88895375)\\
&+0.28648(-0.31398170)\\
&+0.07361(0.69968145)\\
&+0.62750(-1.41356293).
\end{aligned}
\]

Calculate the main contributions:

- MR1 contributes about $-0.648$.
- MR3 contributes about $-0.090$.
- MR2 contributes about $+0.052$.
- MR4 contributes about $-0.887$.

Together they give **approximately 1.98526**, which agrees with the lecture's reported test-set predicted `QD` for row 3 (**1.985260**, PDF p. 14). This is a powerful cross-check that the factor-score order and regression coefficients were interpreted correctly. The original observed `QD` for that row is **2**.

### 19.13 Explain `Estimate`, `Std. Error`, `t value` and `Pr(>|t|)`

A regression summary contains a lot of statistical language. Here is how to read it as a beginner:

- **Estimate:** the regression coefficient fitted to the training data.
- **Std. Error:** estimated uncertainty of that coefficient under the regression's inferential assumptions.
- **$t$ value:** usually coefficient divided by its standard error when testing whether that coefficient is zero.
- **`Pr(>|t|)`:** the $p$-value for a two-sided test of the null hypothesis that the coefficient is zero, conditional on the model.

For MR2, compute

\[
t\approx\frac{0.07361}{0.03041}=2.42.
\]

This matches the lecture's $t=2.420$ to the reported precision. A nonzero-looking coefficient does not automatically guarantee a small $p$-value: its uncertainty matters.

### 19.14 Residuals: observed minus predicted

A regression residual is

\[
e_i=y_i-\hat y_i.
\]

If observed `QD` is 2 and predicted `QD` is 1.98526, the residual is $2-1.98526\approx0.01474$. A positive residual means the actual value was above the model prediction; a negative residual means the model predicted too high.

**Lecture result: training residual five-number summary (PDF p. 14):**

| Min | 1Q | Median | 3Q | Max |
|---:|---:|---:|---:|---:|
| -1.2036 | -0.2224 | -0.0901 | 0.2645 | 1.4841 |

The labels `1Q` and `3Q` denote first and third quartiles. The residuals extend above and below zero, as they generally will in regression. The median is slightly negative. A median near zero is not sufficient to verify linearity, independence or equal error variance.

### 19.15 Interpret regression $R^2$ and its adjusted version

The source reports:

```text
Residual standard error: 0.3911 on 176 degrees of freedom
Multiple R-squared: 0.8719
Adjusted R-squared: 0.869
F-statistic: 299.6 on 4 and 176 DF, p-value < 2.2e-16
```

The regression's familiar $R^2$ is

\[
R^2=1-\frac{\sum_i(y_i-\hat y_i)^2}{\sum_i(y_i-\bar y)^2}.
\]

This is the fraction of **training outcome variation** explained by the fitted regression relative to simply predicting the training mean, with the usual intercept model. The reported $R^2=0.8719$ means about **87.19% of the observed training-sample variation in `QD`** is accounted for by the four-score linear regression.

**Do not confuse this with factor variance explained:**

- Factor-model `Cumulative Var` = about **65%**, concerning the **12 indicator items**.
- Regression $R^2$ = **87.19%**, concerning **variation in the outcome `QD` in the training sample**.

They measure different things using different denominators. You cannot say that “EFA explains 87% of the questionnaire.”

### 19.16 What does adjusted $R^2$ do?

Adding predictors cannot decrease ordinary training $R^2$ in a nested least-squares model with an intercept, even when they offer little real predictive value. **Adjusted $R^2$** penalizes extra predictors. Its common formula is

\[
\bar R^2=1-(1-R^2)\frac{n-1}{n-k-1},
\]

where $n$ is training observations and $k$ is the number of explanatory variables (excluding the intercept).

For the source, $n=181$, $k=4$, $R^2=0.8719$:

\[
\bar R^2\approx1-(1-0.8719)\frac{180}{176}
\approx\boxed{0.869}.
\]

The adjusted value is still high and slightly below the ordinary $R^2$, as expected.

### 19.17 What do the overall F-test and residual standard error mean?

The regression's **F-test** evaluates the joint null hypothesis that all four slope coefficients equal zero. The source gives $F(4,176)=299.6$ and a tiny $p$-value, providing evidence that at least one slope is nonzero under the model's assumptions.

The **residual standard error** of 0.3911 is an estimate of the regression error's typical scale in the original `QD` response units, based on the **training data**. It is conceptually different from the later **test-set RMSE** of 0.3727743, even though both summarize prediction errors on the 1–5 outcome scale.

## 20. Test-set predictions, VIF and RMSE

### 20.1 Why check multicollinearity?

In multiple regression, predictors can be highly correlated with one another. If two predictors carry nearly identical information, it can become difficult to estimate their separate slope coefficients accurately. This problem is called **multicollinearity**.

The lecturer uses the **variance inflation factor (VIF)**, which summarizes how much the variance of a regression coefficient is inflated because its corresponding predictor is linearly predictable from the other predictors.

For predictor $j$, a commonly used expression is

\[
\mathrm{VIF}_j=\frac{1}{1-R_j^2},
\]

where $R_j^2$ is the $R^2$ from a separate regression of predictor $j$ on the *other predictors*. Here $R_j^2$ is **not** the main `QD` regression $R^2$.

**Teaching example:** If a predictor has $R_j^2=0.80$ when predicted by the other predictors, then $\mathrm{VIF}=1/(1-0.80)=5$. If its $R_j^2=0$, its VIF is 1. VIF = 1 means no linear inflation from the other predictors.

### 20.2 The actual VIF values (PDF p. 14)

```r
car::vif(mod)
```

**Lecture result:**

| MR1 | MR3 | MR2 | MR4 |
|---:|---:|---:|---:|
| 1.009591 | 1.056102 | 1.001651 | 1.063193 |

All are close to **1**, so this fitted training regression has very little apparent multicollinearity among its **estimated factor-score predictors**.

**Why this makes sense:** The lecturer requested **Varimax**, an orthogonal rotation, and used relatively distinct item clusters. However, estimated scores in a finite sample need not be perfectly uncorrelated even when the underlying factors are modeled as orthogonal. The lecture's VIF values are close to, but not exactly, 1. The VIF evidence pertains to this fitted regression's predictors; it does not prove that the underlying real-world business constructs are independent.

### 20.3 Predict Quality Delivery for the test set

```r
test$QD_Predicted <- predict(mod, newdata = test, type = "response")
head(test[c("QD", "QD_Predicted")], 10)
```

- `predict(mod, ...)` takes the regression model and computes predicted outcomes for the supplied new data.
- `newdata = test` requests predictions on held-out rows, not the training rows.
- `type = "response"` asks for predictions on the outcome scale; for ordinary `lm` predictions this is the default type, so it is not essential but is acceptable.
- `test$QD_Predicted <- ...` appends the predictions as a new test-data column.
- `head(..., 10)` prints the first 10 displayed test cases.

### 20.4 The first 10 test predictions shown by the lecturer

**Lecture result, PDF pp. 14–15:**

| Original row | Actual QD | Predicted QD | Approx. actual minus predicted |
|---:|---:|---:|---:|
| 3 | 2 | 1.985260 | 0.014740 |
| 6 | 3 | 2.536361 | 0.463639 |
| 9 | 4 | 4.134474 | -0.134474 |
| 17 | 3 | 3.319728 | -0.319728 |
| 19 | 3 | 3.471311 | -0.471311 |
| 23 | 3 | 3.243814 | -0.243814 |
| 28 | 4 | 4.362924 | -0.362924 |
| 29 | 5 | 5.200256 | -0.200256 |
| 33 | 1 | 1.455998 | -0.455998 |
| 34 | 4 | 3.581145 | 0.418855 |

The last column is a **Teaching calculation** based solely on the lecture's displayed actual and predicted numbers; it is not an additional column printed in the PDF.

### 20.5 Why can the prediction be 5.200256 if QD is on a 1–5 scale?

This is a highly instructive limitation of the lecturer's regression approach. An ordinary linear regression prediction is **not constrained to the observed response range**. It may predict 5.20 even though the questionnaire outcome can only be 1, 2, 3, 4 or 5.

This does not mean the test row actually has a `QD` response of 5.20. It means the fitted **continuous linear approximation** predicted that numerical value. For this particular row the observed response is 5.

**Teaching extension:** If the outcome must be modeled as an ordered category, an **ordinal regression model** could be more appropriate, subject to its own assumptions. Merely rounding every prediction to the nearest category or clipping predictions to 1–5 changes the evaluation question and should be justified before reporting results. The lecturer uses standard linear regression, so we interpret *its* output without pretending the range issue is absent.

### 20.6 RMSE: measure the size of predictive mistakes

The **Root Mean Squared Error (RMSE)** summarizes the typical magnitude of prediction errors, assigning greater weight to larger errors through squaring.

For $n_{\mathrm{test}}$ test observations,

\[
\mathrm{RMSE}=
\sqrt{\frac{1}{n_{\mathrm{test}}}
\sum_{i=1}^{n_{\mathrm{test}}}(\hat y_i-y_i)^2}.
\]

Every symbol:

- $\hat y_i$ is the predicted `QD` for test person $i$.
- $y_i$ is the actual `QD`.
- $\hat y_i-y_i$ is the prediction error, with sign opposite to the regression residual convention.
- Squaring makes both positive and negative errors contribute positively.
- Dividing by $n_{\mathrm{test}}$ averages across the test cases.
- The square root puts the result back into the original response units.

**Teaching example, separate from the lecture:** Actual values are 2 and 4; predictions are 3 and 3. Errors are $+1$ and $-1$; squared errors are 1 and 1; average squared error is 1; RMSE is $\sqrt1=1$.

### 20.7 The lecturer's RMSE calculation (PDF p. 15)

```r
sqrt(mean((test$QD_Predicted - test$QD)^2))
```

Read it from the inside outward:

1. `test$QD_Predicted - test$QD`: find each prediction error.
2. `(...)^2`: square each error.
3. `mean(...)`: average the squared errors.
4. `sqrt(...)`: take the square root.

**Lecture result:**

\[
\boxed{\mathrm{RMSE}=0.3727743.}
\]

Because `QD` is coded 1–5, this is about **0.373 rating-scale units** on the lecture's held-out test rows. It is the lecturer's numeric result, not a claim that future organizations will achieve exactly the same error.

### 20.8 Should we call the model good just because RMSE is 0.373?

RMSE is meaningful relative to a benchmark. For example, how well would a model predict if it simply used the training sample's mean `QD` for everyone? How stable would the error be over repeated train/test splits or a truly external dataset? The lecture reports a single test RMSE but **does not provide a baseline RMSE or repeated-split distribution**. Therefore one should describe 0.3727743 as the observed performance of that split, not as proven superiority over all reasonable alternatives.

A smaller RMSE is better **when evaluating the same outcome and comparable test observations**, but the number has no universal “good” threshold across different response scales and applications.

### 20.9 The main predictive-validity problem: factor extraction precedes splitting

**Teaching extension, crucial when building real predictive models:** In the lecture, the factor model was fitted on **all 259 respondents**, and the factor scores were computed **before** the train/test split. That means the eventual test respondents contributed to the estimation of the factor structure and score weights, even though their `QD` outcome was not used when fitting the factors.

This is an example of **preprocessing information leakage**. It is less direct than using test outcomes in training, but it means that the feature-extraction stage was not learned solely from training respondents. As a result, the held-out error may not describe a genuinely prospective workflow as cleanly as a properly train-fitted pipeline.

For a more rigorous prediction experiment:

1. Split original **respondents** into training and testing groups **before** estimating the factors.
2. Fit the factor model using only the **training** 12-item data.
3. Compute training factor scores from the fitted model.
4. Use the same learned loadings/scoring weights and the **training-data standardization** to estimate scores for test respondents.
5. Fit the `QD` regression on training scores and predict test `QD` using test scores.
6. Compute test RMSE, and preferably compare with a simple baseline and repeated validation.

This procedure answers a stronger predictive question: *Can the entire measurement-and-regression pipeline generalize to unseen respondents?* It is a recommended extension, not a correction silently applied to the lecture's printed outputs.

### 20.10 A validated conceptual path for scoring new respondents in R

The `psych` package provides a prediction method for a fitted `fa` object and new item data. Its documentation recommends supplying the original training data so the new cases are standardized using the **training reference**, rather than a different test-set reference.

**Teaching extension, a new workflow whose results will differ from the lecture:**

```r
# First split the original 259 respondents, not precomputed factor scores
set.seed(100)
train_index <- sample(seq_len(nrow(X)), size = floor(0.7 * nrow(X)))

X_train <- X[train_index, , drop = FALSE]
X_test  <- X[-train_index, , drop = FALSE]

# Fit the four-factor measurement model using training respondents only
fa_train <- psych::fa(
  r = X_train,
  nfactors = 4,
  fm = "minres",
  rotate = "varimax",
  scores = "regression"
)

# Scores already computed for training respondents
scores_train <- as.data.frame(fa_train$scores)

# Score test respondents with the training model and its original scaling
scores_test <- as.data.frame(
  predict(fa_train, X_test, old.data = X_train)
)

# Put the separately held-out outcome alongside scores
train_reg <- data.frame(QD = Y[train_index], scores_train)
test_reg  <- data.frame(QD = Y[-train_index], scores_test)

# Train and evaluate regression without re-fitting EFA to test respondents
mod_train <- lm(QD ~ ., data = train_reg)
pred_test <- predict(mod_train, newdata = test_reg)
rmse_test <- sqrt(mean((pred_test - test_reg$QD)^2))

print(rmse_test)
```

The formula and new-data predictor names must match. This example assumes the original item data are complete and numerical, as in the printed lecture summaries, and that fitting/scoring succeeds under the installed package version. Because factor numbers and signs can be arbitrary, never mix test scores generated under a different, independently refitted factor model with training regression coefficients.

**No numerical result is claimed for this extended code.** Its RMSE must be measured by running it. The lecturer's **0.3727743** belongs to the earlier, original workflow and must not be pasted onto the new workflow.

### 20.11 A final, accurate interpretation of the regression example

The source demonstrates that four estimated management-practice factor scores can be used as predictors in a linear model for Quality Delivery. All four slopes are positive and reported statistically significant in that training regression. Training $R^2$ is **0.8719**; the source's test-split RMSE is **0.3727743**; the predictors have VIFs close to 1. This is promising within the demonstrated setup, but the linear model treats ordinal `QD` as numeric and the factor-extraction step used respondents from the full dataset before splitting. A truly external validation and a leakage-free modeling pipeline are appropriate before claiming reliable generalization.

---
# Part VI. Practical and examination companion

## 21. Reproducible end-to-end R script

This section provides a clean version of the lecture's workflow in one place. It is useful for revising the commands after you understand *why* each step exists. **The quoted numerical findings elsewhere in this book are from the source PDF; this authoring environment did not execute R.** Current package versions, random simulation and differences between input correlation options may affect newly generated results.

### 21.1 The lecture-oriented workflow, restored to valid R syntax

Copy the following code into an R script. Package installation is shown separately because it normally only needs to be done once. The program keeps the lecture's major methodological choices and introduces explicit package namespaces for clarity.

```r
# ------------------------------------------------------------
# DA2451 Lec05 - Factor Analysis: lecture-oriented workflow
# ------------------------------------------------------------

# Install ONCE if required:
# install.packages(c("psych", "corrplot", "ggplot2", "car"))

library(psych)
library(corrplot)
library(ggplot2)
library(car)

# 1. Read survey data
url <- "https://raw.githubusercontent.com/housecricket/data/main/efa/sample1.csv"
datasurvey <- read.csv(url, sep = ",")

# 2. Inspect survey dimensions and distribution summaries
psych::describe(datasurvey)
dim(datasurvey)

# 3. Remove respondent ID
dat <- datasurvey[, -1]
head(dat)

# 4. Separate 12 indicators and the outcome QD
X <- dat[, -13]
Y <- dat[, 13]

# 5. Pearson item correlations and display
cormat <- cor(X)
corrplot::corrplot(cormat, method = "number")

# 6. Optional ordinal-item correlation matrix
poly_corr <- psych::polychoric(X)$rho
# corrplot::corrplot(poly_corr, method = "number")

# 7. Factorability tests
psych::KMO(r = cor(X))
psych::cortest.bartlett(X)
det(cor(X))

# 8. Exploratory 'all factors' model used for importance discussion
fafit <- psych::fa(X, nfactors = ncol(X), rotate = "varimax")
print(fafit)

# 9. Scree plot of unreduced correlation-matrix eigenvalues
n_factors <- length(fafit$e.values)
scree <- data.frame(
  Factor_n = as.factor(seq_len(n_factors)),
  Eigenvalue = fafit$e.values
)

ggplot(scree, aes(x = Factor_n, y = Eigenvalue, group = 1)) +
  geom_point() +
  geom_line() +
  xlab("Number of factors") +
  ylab("Initial eigenvalue") +
  labs(
    title = "Scree plot",
    subtitle = "Based on the unreduced correlation matrix"
  )

# 10. Parallel analysis AS PRINTED IN THE LECTURE
# Note: a matrix input without n.obs can use a package default.
psych::fa.parallel(poly_corr, fa = "fa", n.iter = 100)

# 11. Final four-factor MINRES solution, based on raw X
fa.var <- psych::fa(
  r = X,
  nfactors = 4,
  fm = "minres",
  max.iter = 100,
  rotate = "varimax"
)
print(fa.var)

# 12. Plot the factor structure
psych::fa.diagram(fa.var)

# 13. Alternative maximum likelihood analysis
factanal.var <- stats::factanal(
  X,
  factors = 4,
  scores = "regression",
  rotation = "varimax"
)
print(factanal.var)

# 14. Obtain respondent scores and prepare regression data
head(fa.var$scores)
regdata <- cbind(dat["QD"], fa.var$scores)
head(regdata)

# 15. Split scores into training and test sets, as in source
set.seed(100)
indices <- sample(1:nrow(regdata), 0.7 * nrow(regdata))
train <- regdata[indices, ]
test <- regdata[-indices, ]

# 16. Fit OLS regression for Quality Delivery
mod <- lm(QD ~ ., data = train)
summary(mod)

# 17. Check multicollinearity
car::vif(mod)

# 18. Predict the test observations
test$QD_Predicted <- predict(mod, newdata = test, type = "response")
head(test[c("QD", "QD_Predicted")], 10)

# 19. Calculate test RMSE
sqrt(mean((test$QD_Predicted - test$QD)^2))
```

**Practical warning:** The all-factor model in step 8 is an unusual, highly parameterized fit, used to mirror the lecture's discussion. If it produces numerical warnings in a later package version, do not mistake those warnings for evidence that the final four-factor model is wrong. Eigenvalues for the scree plot can also be found directly from `eigen(cor(X))$values` without fitting that all-factor model; see the improved variants below.

### 21.2 A shorter, more methodologically explicit R variant

The following is an **improved teaching workflow**, not a verbatim transcript of the original. It calculates the scree eigenvalues directly, supplies the sample size for matrix-input parallel analysis, and checks the item names.

```r
# Assumes datasurvey, X and Y were created as described above
stopifnot(nrow(X) == length(Y))
stopifnot(ncol(X) == 12)
stopifnot(all(vapply(X, is.numeric, logical(1))))

# Obtain the unreduced correlation eigenvalues directly
initial_eigenvalues <- eigen(cor(X), symmetric = TRUE)$values
plot(seq_along(initial_eigenvalues), initial_eigenvalues,
     type = "b", xlab = "Initial component index",
     ylab = "Correlation-matrix eigenvalue")

# If a correlation matrix is provided, include the case count
set.seed(123)
poly_corr <- psych::polychoric(X)$rho
psych::fa.parallel(poly_corr, n.obs = nrow(X),
                   fa = "fa", fm = "minres", n.iter = 100)

# Fit EFA and report full loadings
fa.var <- psych::fa(X, nfactors = 4,
                    fm = "minres", rotate = "varimax")
print(fa.var$loadings, digits = 3, cutoff = 0)

# Inspect the central returned pieces
head(fa.var$scores)
fa.var$communality
fa.var$uniquenesses
```

This variant will not necessarily reproduce the *same simulated parallel-analysis line or factor-selection statement* as the original code because the sample-size parameter and random seed are now explicit. The purpose is to teach a more defensible experiment, not to override the supplied PDF's findings.

### 21.3 Quick R error decoder

| What you see | Probable cause | What to do |
|---|---|---|
| `could not find function "fa"` | `psych` not loaded or installed | Use `library(psych)` or `psych::fa()` after installation |
| `object 'X' not found` | Data preparation lines not run | Run the import and create `dat`, then `X` |
| `cannot open URL` | No network, inaccessible CSV, temporary host problem | Verify access; use a local original CSV without changing its contents |
| `undefined columns selected` | The source column order is different or item names changed | Inspect `names(datasurvey)` and choose columns by name |
| A warning from `fa.parallel()` about the number of cases | A matrix was supplied without its sample size | Provide `n.obs = nrow(X)` for precomputed `poly_corr` |
| Parallel analysis or loadings differ slightly | Package version, seed, sample information, numerical optimization, or correlation method | Record software/options and distinguish your run from printed lecture output |
| `scores` missing or `NULL` | FA was fitted from correlations only, or scores were not requested/possible | To score respondents, fit on raw item data or use an explicitly suitable scoring method |
| `NA` factor scores | Missing item responses or scoring assumptions | Diagnose missingness rather than guessing values |
| `cortest.bartlett()` says input `R was not square` | The raw data matrix was supplied | It is informational; the function is calculating correlations |
| A prediction exceeds 5 | OLS predictions are unbounded | Interpret as a linear approximation; evaluate whether ordinal modeling is preferable |

### 21.4 Why `max.iter = 100` does not guarantee convergence

Numerical algorithms update tentative parameter estimates repeatedly. An iteration limit prevents endless calculation but does not promise that a stable solution has been found. Look for software warnings, impossible estimated variances, large residuals and sensitivity to model choices. If the computer reports nonconvergence, blindly increasing the limit without diagnosing the underlying model is not a sufficient statistical fix.

## 22. What to report, and how to write the conclusions

### 22.1 A clear reporting structure

A well-written applied EFA report should communicate the statistical evidence in an order a reader can follow:

| Stage | What to report for this lecture | Why |
|---|---|---|
| Data | 259 respondents; 12 indicator items; `QD` excluded from EFA | Defines the measured variables and analysis sample |
| Scale | Five-point ordinal Likert responses | Describes measurement assumptions |
| Preliminary evidence | Positive within-group correlations | Motivates a common-factor model |
| Factorability | KMO 0.83, Bartlett $\chi^2(66)=1595.75$, tiny $p$-value, determinant 0.00183051 | Shows that EFA appears reasonable |
| Factor number | Four suggested by the source's parallel analysis | Justifies retention |
| Estimation and rotation | MINRES, Varimax, four factors | Specifies the actual fitted model |
| Meaning | MR1 KM, MR3 CT, MR2 PC, MR4 QC | Names factors based on high-loading items |
| Variance | About 65% cumulative original standardized variance | Quantifies coverage without claiming 100% |
| Model diagnostics | RMSR .02, TLI .974, RMSEA .048 and its 90% CI | Describes approximate reproduction of correlations |
| Alternative fit | ML $\chi^2(24)=37.66$, $p=.0376$ | Reports material contrary evidence for exact fit |
| Regression | $R^2=.8719$, VIFs near 1, test RMSE .3727743 | Shows illustrative downstream prediction |
| Limitations | Ordinal inputs, factor-score uncertainty, one train/test split, factor-extraction leakage | Prevents overstatement |

### 22.2 A model report you can learn to write

The following is a **new teaching write-up using the actual lecture results**, not a quotation from the lecturer:

> An exploratory factor analysis was conducted on 12 operational-management survey items from 259 respondents. The items represented Knowledge Management, Quality Control, Cost Tracking and Production Control, while Quality Delivery was retained separately as an outcome. Preliminary correlations suggested shared structure. KMO was 0.83, and Bartlett's test rejected the identity-correlation hypothesis, $\chi^2(66)=1595.75$, $p<0.001$. The sample correlation determinant was 0.00183051. Parallel analysis in the lecture suggested four factors. A four-factor MINRES solution with Varimax rotation produced interpretable clusters corresponding to Knowledge Management, Cost Tracking, Production Control and Quality Control. The factors represented approximately 65% of the original standardized item variance. MINRES approximate-fit statistics were favorable (RMSR 0.02, TLI 0.974 and RMSEA 0.048, 90% CI [0.014, 0.075]). A separate ML fit produced a significant exact-fit chi-square test, $\chi^2(24)=37.66$, $p=0.0376$, highlighting that approximate fit and exact fit do not tell precisely the same story. Factor scores were subsequently used in a linear regression of Quality Delivery, producing training $R^2=0.8719$ and test RMSE 0.3727743 in the lecturer's workflow. The results should be interpreted as exploratory because the inputs are ordinal and the factor model was estimated before the regression train/test split.

### 22.3 What not to report

Avoid saying any of the following without qualification: “The data prove that four latent factors truly exist”; “100% variance explained”; “the ML model passed its exact-fit test”; “the factor scores were measured directly”; “$R^2=0.8719$ means the EFA explains 87% of all questionnaire variance”; or “the model will predict Quality Delivery with RMSE 0.3728 in every organization.” Each of these confuses what the outputs actually measure.

## 23. Worked numerical practice

All problems below are **Teaching exercises**. Unless they explicitly refer to a lecture value, their numbers are new and are not drawn from the source dataset.

### Problem 1: Identify the measurement problem

A business asks 18 staff survey questions to assess communication, coordination and leadership. Why might EFA be useful?

**Solution:** It can investigate whether the observed correlations among 18 items are consistent with a smaller number of shared constructs. It can suggest which questions are indicators of the same construct, whether some questions measure more than one construct and whether some questions are weak indicators. It does not guarantee that exactly three factors will be found just because the researcher wrote three topic headings.

### Problem 2: A correlation calculation

Suppose sample covariance between two variables is 6, and their standard deviations are 3 and 4. Find Pearson correlation.

\[
r=\frac{s_{xy}}{s_xs_y}=\frac{6}{3\times4}=\frac{6}{12}=\boxed{0.5}.
\]

Interpretation: a moderate positive linear association. It does not show a cause-and-effect relationship.

### Problem 3: A one-factor communality

An item has a loading of 0.75 on one standardized factor. Assuming a suitable orthogonal one-factor model, find the communality and uniqueness.

\[
h^2=0.75^2=\boxed{0.5625}.
\]

\[
u^2=1-0.5625=\boxed{0.4375}.
\]

The single factor accounts for 56.25% of the item's variance, while 43.75% is residual/unique.

### Problem 4: Three-factor communality

An item loads 0.60, 0.20 and -0.10 on three orthogonal factors. Calculate its communality.

\[
\begin{aligned}
h^2&=0.60^2+0.20^2+(-0.10)^2\\
&=0.36+0.04+0.01=\boxed{0.41}.
\end{aligned}
\]

Therefore $u^2=1-0.41=\boxed{0.59}$. The minus sign on the third loading disappears after squaring.

### Problem 5: Recreate the lecturer's actual PC1 communality

Use the four-factor PC1 row: MR1 = 0.18, MR3 = -0.04, MR2 = 0.82, MR4 = 0.10.

\[
h^2\approx0.18^2+(-0.04)^2+0.82^2+0.10^2=0.7164.
\]

Rounded to two decimals: **0.72**, matching the source. Uniqueness is approximately **0.28**. PC1 is principally associated with **Production Control**, the interpretation of MR2.

### Problem 6: Compute the degrees of freedom for Bartlett's test

Suppose you have 12 questionnaire items. How many unique pairwise correlations exist?

\[
\frac{12(12-1)}2=\frac{12\times11}2=\boxed{66}.
\]

That reproduces the source's Bartlett degrees of freedom.

### Problem 7: Explain the difference between 65% and 100%

The four factors have SS loadings 2.38, 1.97, 1.86 and 1.60. Find the percentage of total observed standardized variance they capture and explain why `Cumulative Proportion` ends at 1.00.

\[
\frac{2.38+1.97+1.86+1.60}{12}\times100
=\frac{7.81}{12}\times100\approx\boxed{65.08\%}.
\]

`Cumulative Proportion = 1.00` concerns the **7.81 factor-explained variance units** distributed across all retained factors. It does not mean the model explains the 4.19 remaining unique-variance units.

### Problem 8: Calculate a VIF

A candidate predictor can be explained by the other predictors with $R_j^2=0.60$. What is its VIF?

\[
\mathrm{VIF}=\frac{1}{1-0.60}=\frac{1}{0.4}=\boxed{2.5}.
\]

Its estimated coefficient variance is inflated by a factor of 2.5 relative to the idealized case of no linear association with the other predictors. This formula does not imply that the **main regression** has $R^2=0.60$.

### Problem 9: Compute RMSE without skipping steps

You have three held-out observations:

| Person | Actual | Predicted | Error (`predicted - actual`) | Squared error |
|---|---:|---:|---:|---:|
| A | 2 | 2.5 | 0.5 | 0.25 |
| B | 4 | 3.0 | -1.0 | 1.00 |
| C | 5 | 4.5 | -0.5 | 0.25 |

Sum squared errors: $0.25+1.00+0.25=1.50$. Average: $1.50/3=0.50$. Root: $\sqrt{0.50}\approx\boxed{0.7071}$. RMSE has the same unit as the actual outcome.

### Problem 10: Compare Bartlett and the ML factor fit test

The lecture's Bartlett $p$-value is extremely small; its four-factor ML exact-fit $p$-value is 0.0376. Do they contradict each other?

**Solution:** No. They test **different null hypotheses**. Bartlett tests whether the population correlation matrix is an identity matrix; rejection means some correlations exist. The four-factor ML test assesses whether the specified four-factor model fits exactly enough under ML assumptions; its $p=0.0376$ rejects exact fit at the 5% level. It is entirely possible to have a non-identity correlation matrix that is not perfectly reproduced by a particular four-factor model.

### Problem 11: Recognize a factor using loadings

A factor has loadings KM1 = 0.80, KM2 = 0.82 and KM3 = 0.88. Which factor name is most defensible?

**Solution:** Knowledge Management, because all three items are Knowledge Management indicators and load strongly. “General intelligence” or “employee motivation” would be unjustified from these labels alone.

### Problem 12: Interpret regression output correctly

MR2 has coefficient 0.07361 and $p=0.0165$ in the source's linear model. What can you say?

**Solution:** Holding the other score predictors fixed, a one-unit increase in the estimated MR2 score is associated with a **0.07361-unit increase** in predicted `QD`. The conditional coefficient is statistically different from zero at 5% under the model's assumptions. The small size of the coefficient, uncertainty in factor scores, and ordinal outcome scale matter when judging practical significance. A causal claim is not justified.

## 24. Exam-style questions with explained answers

### Concept question A: What is Factor Analysis?

**Answer:** Factor Analysis is a family of statistical approaches that seeks to explain correlations among observed variables using a smaller number of unobserved factors. In EFA we explore the possible factor pattern; in CFA we test a previously specified pattern against the data.

**Why:** Respondents answer questions; analysts cannot directly observe constructs such as Knowledge Management. We examine whether questions move together as if they share common underlying dimensions.

### Concept question B: State the difference between EFA and PCA.

**Answer:** PCA creates weighted components that summarize total variation in measured variables. EFA fits a common-factor model to explain shared variation among the variables and separates factor-related variance from unique/residual variance.

**Why:** PCA is primarily a transformation and compression method. EFA is a model of shared associations potentially arising from latent constructs. Both can reduce dimensionality, but their objectives are not identical.

### Concept question C: Why is KMO used?

**Answer:** KMO examines whether the observed inter-item correlations are reasonably suited to a common-factor representation by comparing ordinary and partial correlations. The lecture's overall KMO 0.83 is favorable under its guidelines.

**Why:** An observed correlation pattern can still be unsuitable for a simple shared-factor structure. KMO adds evidence about factorability, not factor number.

### Concept question D: State Bartlett's hypotheses and conclusion for the lecture.

**Answer:** $H_0$ says the population correlation matrix is the identity matrix; $H_1$ says it is not. With $\chi^2(66)=1595.75$ and $p=8.846246\times10^{-290}$, reject $H_0$ at 5%. This supports the presence of correlations worth investigating.

### Concept question E: Why use polychoric correlation?

**Answer:** Five-category Likert answers are ordinal. Polychoric correlation estimates the association between continuous latent responses that, under its threshold assumptions, produce the observed ordered categories. It can be more suitable than Pearson correlation for ordinal measurements, although it introduces its own model assumptions.

### Concept question F: What is Varimax?

**Answer:** Varimax is an orthogonal factor rotation used to make the loading pattern easier to interpret while maintaining uncorrelated factor directions. In the lecture it helps distinguish Knowledge, Cost, Production and Quality factors.

### Concept question G: Explain `h2`, `u2`, `com`.

**Answer:** `h2` is communality, the share of an item's variance captured by common factors. `u2` is uniqueness, the share remaining outside those factors. `com` is an index of the extent to which an item's loading pattern is distributed across multiple factors, with values near 1 showing a more focused pattern.

### Concept question H: Which of the 12 questions is poorly represented relative to KM3?

**Answer:** QC1 has communality 0.43 and uniqueness 0.57, while KM3 has communality 0.88 and uniqueness 0.12 in the four-factor MINRES output. Therefore QC1 is less fully represented, although it remains a Quality Control indicator with a loading of 0.55 on MR4.

### Concept question I: Explain the factor-retention decision.

**Answer:** The lecture uses initial eigenvalue patterns, a scree plot and parallel analysis. Its parallel analysis reports four factors because the first four actual-data factor values exceed their random-data comparisons. The four-factor solution also produces interpretable clusters of three related survey items each.

### Concept question J: Interpret the ML test of four-factor sufficiency.

**Answer:** The source reports $\chi^2(24)=37.66$, $p=0.0376$. At 5%, reject exact four-factor fit under the ML test assumptions. This does not mean the factor loadings lack all value, but it limits claims of exact model adequacy.

### Concept question K: Why might factor scores be useful in regression?

**Answer:** Four scores can summarize 12 correlated practice items in fewer predictor columns, potentially helping relate inferred management constructs to an outcome such as Quality Delivery. The scores are estimates and should not be treated as error-free direct measurements.

### Concept question L: Differentiate four statistics from the lecture.

| Statistic | Value | What it actually measures |
|---|---:|---|
| KMO | 0.83 | Overall factorability/sampling-adequacy pattern |
| EFA cumulative variance | 0.65 | Fraction of the 12 standardized indicators' total variance represented by four common factors |
| Regression training $R^2$ | 0.8719 | Fraction of training `QD` variation represented by the four-score linear model |
| Regression test RMSE | 0.3727743 | Average held-out prediction-error magnitude on `QD` scale, using root mean squared errors |

**Exam technique:** Before interpreting a percentage or error value, identify the **object** it belongs to: the correlation matrix, the factor model, the training outcome or the test predictions.

## 25. Glossary, formula sheet and source audit

### 25.1 Glossary for complete beginners

| Term | Meaning in simple language |
|---|---|
| **Observation** | One respondent's set of measurements |
| **Observed variable** | A question or quantity directly recorded |
| **Latent factor** | An unseen construct inferred from shared variation |
| **Indicator** | An observed item used to measure a latent factor |
| **Dimensionality reduction** | Describe many observed columns with fewer informative dimensions |
| **EFA** | Explore how variables group around common factors |
| **CFA** | Test a hypothesized factor model |
| **PCA** | Create weighted summaries that capture total observed variance |
| **Mean** | Average of observed values |
| **Standard deviation** | Typical scale of spread around the mean |
| **Standardization** | Express values relative to their mean and SD |
| **Covariance** | How two variables move together in their original units |
| **Pearson correlation** | Unit-free standardized measure of linear association |
| **Polychoric correlation** | Model-based estimate of latent continuous association behind two ordinal items |
| **Correlation matrix** | Table of all variable-pair correlations |
| **Factorability** | Suitability of the correlation pattern for common FA |
| **KMO/MSA** | Compare ordinary correlations with partial correlations to assess factorability |
| **Bartlett's sphericity test** | Test whether a population correlation matrix is identity |
| **Determinant** | Matrix quantity useful for identifying singularity/redundancy |
| **Eigenvalue** | Quantity describing matrix variation along an eigenvector direction |
| **Scree plot** | Ordered initial eigenvalues displayed against dimension index |
| **Parallel analysis** | Compare observed factor importance against chance-generated importance |
| **Extraction** | Estimate factors and associated loadings from observed relationships |
| **MINRES** | Factor extraction seeking small residual correlations |
| **ML** | Likelihood-based factor model estimation |
| **Factor loading** | Strength and direction of an item's relationship with a factor |
| **Communality** | Item variance represented by retained common factors |
| **Uniqueness** | Item variance not represented by retained common factors |
| **Cross-loading** | An item is meaningfully associated with multiple factors |
| **Complexity** | Degree to which an item's factor contribution is spread across factors |
| **Rotation** | Re-express factor directions to make loadings interpretable |
| **Varimax** | Rotation that keeps factors orthogonal/uncorrelated |
| **Oblimin** | Rotation permitting factor correlations |
| **SS loadings** | Sum of squared factor loadings over items, for a factor |
| **RMSR** | Typical size of residual correlations between observed and fitted matrices |
| **RMSEA** | Approximate covariance-model misfit measure |
| **TLI** | Comparative fit measure adjusting for complexity |
| **Factor score** | An estimate of one respondent's position on an inferred factor |
| **Regression coefficient** | Conditional slope in a regression prediction equation |
| **Training set** | Records used to fit prediction parameters |
| **Test set** | Records reserved for evaluating predictions |
| **VIF** | Multicollinearity-related coefficient variance inflation |
| **RMSE** | Square root of mean squared predictive error |
| **Leakage** | Using information from evaluation records while learning a training-stage transformation |

### 25.2 Essential formulas in one place

The source's software-oriented lecture is supplemented here with the explicit mathematics underlying its main ideas.

| Quantity | Formula | Interpretation |
|---|---|---|
| Sample mean | $\bar x=\sum_i x_i/n$ | Typical value |
| Sample variance | $s_x^2=\sum_i(x_i-\bar x)^2/(n-1)$ | Average squared spread |
| Pearson correlation | $r_{xy}=s_{xy}/(s_xs_y)$ | Linear association |
| Standard score | $z=(x-\bar x)/s_x$ | SDs from mean |
| Common-factor model | $\mathbf z=\Lambda\mathbf f+\varepsilon$ | Indicators = shared-factor part + residual part |
| Factor-implied correlations | $R\approx\Lambda\Phi\Lambda^\mathsf T+\Psi$ | Fit shared correlations with factors |
| Orthogonal communality | $h_i^2=\sum_j\lambda_{ij}^2$ | Explained item variance share |
| Standardized uniqueness | $u_i^2=1-h_i^2$ | Residual item variance share |
| Loading complexity (teaching extension) | $\mathrm{com}_i=(\sum_j\lambda_{ij}^2)^2/\sum_j\lambda_{ij}^4$ | How diffuse an item's loadings are |
| Overall KMO | $\sum r_{ij}^2/(\sum r_{ij}^2+\sum q_{ij}^2)$ | Ordinary vs partial correlation pattern |
| Bartlett df | $p(p-1)/2$ | Number of unique correlations |
| Bartlett approximate statistic | $-[n-1-(2p+5)/6]\ln\lvert R\rvert$ | Departure from identity |
| Orthogonal factor SS loading | $SS_j=\sum_i\lambda_{ij}^2$ | Variance attributed to factor $j$ |
| Proportion of observed variance | $SS_j/p$ | Share of total standardized item variance |
| Share of extracted factor variance | $SS_j/\sum_kSS_k$ | Contribution within the retained common-factor solution |
| Estimated factor scores | $\widehat F=ZW$ | Score weights applied to standardized item data |
| Regression prediction | $\hat y=\beta_0+\sum_j\beta_jF_j$ | Predicted outcome |
| VIF | $1/(1-R_j^2)$ | Predictor multicollinearity |
| Regression $R^2$ | $1-\mathrm{SSE}/\mathrm{SST}$ | Training outcome variation accounted for |
| Test RMSE | $\sqrt{n^{-1}\sum_i(\hat y_i-y_i)^2}$ | Held-out prediction error size |

### 25.3 Source data appendix: the other descriptive columns (PDF pp. 2–3)

To preserve the lecture's reported descriptive details beyond the central mean/SD/skewness table in Chapter 9, the columns below give `trimmed`, `mad`, `min`, `max`, `range` and `se` as displayed. All are **lecture outputs**, not new computations. This appendix also demonstrates that the `ID` column should be excluded despite having a numerical summary.

| Variable | Trimmed mean | MAD | Min | Max | Range | SE |
|---|---:|---:|---:|---:|---:|---:|
| ID | 130.00 | 96.37 | 1 | 259 | 258 | 4.65 |
| KM1 | 3.39 | 1.48 | 1 | 5 | 4 | 0.08 |
| KM2 | 3.45 | 1.48 | 1 | 5 | 4 | 0.09 |
| KM3 | 3.49 | 1.48 | 1 | 5 | 4 | 0.08 |
| QC1 | 3.96 | 1.48 | 1 | 5 | 4 | 0.08 |
| QC2 | 3.48 | 1.48 | 1 | 5 | 4 | 0.07 |
| QC3 | 3.42 | 1.48 | 1 | 5 | 4 | 0.08 |
| CT1 | 3.80 | 1.48 | 1 | 5 | 4 | 0.07 |
| CT2 | 3.84 | 1.48 | 1 | 5 | 4 | 0.07 |
| CT3 | 3.44 | 1.48 | 1 | 5 | 4 | 0.08 |
| PC1 | 3.51 | 1.48 | 1 | 5 | 4 | 0.07 |
| PC2 | 3.11 | 1.48 | 1 | 5 | 4 | 0.08 |
| PC3 | 3.87 | 1.48 | 1 | 5 | 4 | 0.08 |
| QD | 3.61 | 1.48 | 1 | 5 | 4 | 0.07 |

### 25.4 Source data appendix: example from the all-factor exploratory fit (PDF p. 6)

The PDF abbreviates its 12-factor loading matrix after the first two item rows. To avoid presenting the abbreviated portion as complete data, the first two shown rows are preserved here, in the factor-column order printed on the page:

| Item | MR1 | MR2 | MR3 | MR4 | MR5 | MR9 | MR7 | MR6 | MR8 | MR11 | MR10 | MR12 | h2 | u2 | com |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| KM1 | 0.81 | 0.14 | 0.12 | 0.22 | -0.08 | 0.03 | -0.01 | 0.10 | 0.12 | -0.02 | -0.01 | 0.00 | 0.78 | 0.22 | 1.4 |
| KM2 | 0.84 | 0.08 | 0.18 | 0.19 | 0.10 | -0.01 | -0.03 | -0.12 | -0.02 | 0.02 | 0.01 | 0.00 | 0.81 | 0.19 | 1.3 |

These are the **preliminary many-factor** values, not the four-factor loadings table from page 10. The published handout includes literal ellipses for omitted rows, so no missing values are invented here.

### 25.5 A source-page map: all 15 pages accounted for

| PDF page | Material actually present in the handout | Where it is covered in this teaching book |
|---:|---|---|
| **1** | Purpose of FA, EFA/CFA distinction, factor count, hypothetical mathematical/writing abilities table | Chapters 1, 3, 4 |
| **2** | PCA contrast, R packages, survey constructs and data URL, start of `describe()` | Chapters 4, 8, 9 |
| **3** | Full descriptive output, `dim()`, remove ID, `head()`, correlation preparation | Chapters 8–10 and Appendix 25.3 |
| **4** | Pearson correlation figure; polychoric rationale; `X`, `Y`; start KMO discussion | Chapters 9–11 |
| **5** | KMO overall/item results; Bartlett test; determinant and cautions | Chapter 11 |
| **6** | Exploratory full-count `fa()`, SS loadings, communalities and uniqueness, MINRES/rotation discussion | Chapters 6–7, 12 and Appendix 25.4 |
| **7** | Complexity, variance concepts, KM1 example, R scree-plot code | Chapters 6, 12, 14 |
| **8** | Scree-plot figure, polychoric parallel analysis, four-factor recommendation | Chapter 12 |
| **9** | Parallel-analysis plot and explanation, four-factor MINRES code | Chapters 12–13 |
| **10** | Complete four-factor loading matrix, total/common variance rows, RMSR/TLI/RMSEA and interpretation | Chapters 13–15 |
| **11** | `factanal()` ML model, uniquenesses, loadings, variance rows, chi-square exact-fit test | Chapter 16 |
| **12** | Ordinal-data caveat; factor-loading path diagram; advantages | Chapters 10, 16–18 |
| **13** | Remaining advantages/disadvantages; factor scores; `cbind()`; sample split | Chapters 18–19 |
| **14** | Regression fit, coefficients, $R^2$, VIF, prediction code, first test predictions | Chapters 19–20 |
| **15** | Remaining test predictions; RMSE calculation and result | Chapter 20 |

This page map covers the source's main sections, examples, code, plots, tabular outputs, assumptions and worked numerical claims. The original figures are interpreted and, where useful, their numeric evidence is reconstructed in text tables so the teaching remains usable as a single Markdown document.

### 25.6 Source ambiguities and corrections, disclosed rather than hidden

| PDF location | Source wording or issue | How this book handles it |
|---|---|---|
| p. 5 | “KMO > 60” | Explains the intended ordinary-scale cutoff **0.60**, preserving the reported KMO 0.83 |
| p. 6 | Text says 13 factors; actual `X` has 12 indicator columns and the output reaches MR12 | Explains that `ncol(X) = 12`, and distinguishes `dat`'s 13 columns (including QD) from `X` |
| pp. 6–8 | Initial eigenvalues and fitted SS loadings discussed together | Explains they are different variance-related objects |
| pp. 8–9 | Precomputed correlation matrix passed to `fa.parallel()` without `n.obs` | Preserves the lecture's four-factor recommendation and separately documents the stronger reproducible call with `n.obs = 259` |
| pp. 9–10 | Polychoric `fa()` alternative is commented out | Attributes the printed four-factor loadings to the active raw-`X` model |
| pp. 10–11 | Favorable MINRES approximate-fit indices versus significant ML exact-fit test | Preserves both and explains why conclusions differ |
| p. 11 | Small `factanal()` loadings not displayed | Marks them **not printed**, rather than pretending they equal zero |
| p. 13 | Factor names and output order `MR1, MR3, MR2, MR4` | Retains the actual order and names factors by their loadings |
| pp. 13–15 | All-data factor estimation before train/test regression split | Explains feature-extraction leakage as a separate methodological teaching extension |
| pp. 14–15 | Linear-model prediction can exceed the 1–5 scale | Explains why 5.200256 is a mathematically possible OLS prediction |

### 25.7 Further reading, clearly separate from the lecture

These references help with technical details or software-version differences. **They are not additional findings from the lecturer's 15 pages.**

- R `stats::factanal` reference: <https://search.r-project.org/R/refmans/stats/html/factanal.html>. Defines the maximum-likelihood model, factor scores, rotation and hypothesis test.
- `psych::fa.parallel` reference: <https://personality-project.github.io/psych/reference/fa.parallel.html>. Explains correlation matrices, sample-size inputs, simulation choices and factor retention.
- `psych::fa` reference: <https://search.r-project.org/CRAN/refmans/psych/help/fa.html>. Describes available extraction methods, rotation and scoring details.
- `psych::factor.scores` reference: <https://rdrr.io/cran/psych/man/factor.scores.html>. Explains why estimated scores are not unique and documents alternative score methods.
- `psych` new-data scoring: <https://personality-project.github.io/psych/reference/predict.psych.html>. Explains why scoring a separate test sample should use the original training-data reference.

### 25.8 Final conceptual map

```text
Observed business problem
        |
        v
12 management-practice survey questions (259 respondents)
        |
        v
Inspect the data, correlations and ordinal item scales
        |
        v
Check suitability: KMO + Bartlett + determinant
        |
        v
Choose factor count: scree + parallel analysis + interpretability
        |
        v
Fit four common factors (MINRES + Varimax)
        |
        +--> MR1: Knowledge Management  <- KM1, KM2, KM3
        +--> MR3: Cost Tracking          <- CT1, CT2, CT3
        +--> MR2: Production Control     <- PC1, PC2, PC3
        +--> MR4: Quality Control        <- QC1, QC2, QC3
        |
        v
Interpret loadings, communalities, uniquenesses and fit
        |
        +--> About 65% of standardized item variance represented
        +--> Favorable MINRES approximate-fit indices
        +--> ML exact-fit chi-square rejected at 5%
        |
        v
Estimate respondent factor scores
        |
        v
Predict separate Quality Delivery outcome with regression
        |
        +--> Training R-squared = 0.8719 (source workflow)
        +--> Test RMSE = 0.3727743 (source workflow)
        |
        v
Evaluate ordinal-scale assumptions, score uncertainty,
leakage, limitations and out-of-sample generalizability
```

**The lesson in one paragraph:** Factor Analysis starts when several observed variables might share a smaller number of meaningful hidden influences. EFA investigates those influences by explaining correlations with latent factors. You choose a defensible factor count, estimate and rotate the loadings, inspect communalities and fit, and interpret factor names from the observed items. For the lecturer's 12-item survey, four recognizable management factors explain roughly 65% of total standardized item variance. Their respondent scores can be used in downstream prediction, but this introduces a second modeling task with its own assumptions, validation requirements and limitations. Understanding these differences is far more valuable than memorizing a single function call or cutoff.

---

**End of DA2451 Lecture 05 teaching book.**
