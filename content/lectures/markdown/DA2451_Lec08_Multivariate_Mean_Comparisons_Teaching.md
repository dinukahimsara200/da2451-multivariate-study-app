# Comparisons of Several Multivariate Means

## A complete beginner-to-university-level teaching book for DA2451, Multivariate Methods in Business

**Core source:** *Lec8.pdf*, “Comparisons of several multivariate means,” DA2451, Semester 4, 2026, **16 PDF pages**.  
**Coverage:** Paired comparisons; the multivariate paired Hotelling test; two independent mean vectors and pooled covariance; assumptions, diagnostics, and Box's M-test; one-way MANOVA; sums-of-squares-and-cross-products matrices; Wilks' lambda; iris data; and the lecturer's LDA follow-up and plot.  
**Intended reader:** A student encountering hypothesis testing and MANOVA for the first time.

> **Reading convention and source integrity.** Sections labelled **[Lecture: pp. ...]** explain content present in the supplied lecture; **[Teaching extension]** marks background, derivations, extra datasets, additional analysis, or more cautious statistical guidance introduced for learning. When an original example is reproduced, its reported numerical output is preserved. Corrections or qualifications to potentially misleading statements are identified explicitly. A *PDF page* is the numbered page of the supplied 16-page file, not a page of this Markdown book.

### Your route through the subject

You do **not** have to understand the equations yet. Read in order once, then revisit the examples with a calculator or R.

| Part | What you will learn | Source connection |
|---|---|---|
| I. Foundations | Groups, population means, samples, variability, hypotheses, p-values, t-tests, ANOVA, vectors, and covariance | Prerequisites for pp. 1–16 |
| II. Paired data | Why pairing matters; paired t-test; Hotelling's paired multivariate test; wastewater laboratories | Lecture §1 and §1.1–1.2, pp. 1–5 |
| III. Two independent groups | Two vector means; common covariance; pooled Hotelling's test; truck costs and diagnostics | Lecture §2 and §2.1–2.2, pp. 6–10 |
| IV. Several groups | One-way MANOVA model; between/within matrices; Wilks' lambda; its geometric meaning | Lecture §3 and §3.1–3.3, pp. 10–13 |
| V. Worked R analysis | Iris MANOVA and Box's M; discriminant analysis; the final scatter plot | Lecture §3.4–3.5, pp. 13–16 |
| VI. Practice and reference | Fully solved additional problems; R workflows; interpretation; formula guide; page-by-page audit | Clearly marked teaching extensions |

---

# Part I. From everyday group comparisons to statistical inference

## 1. The question behind the whole lecture

**[Teaching extension, motivating the lecture's purpose]**

Imagine that a company tests **three customer-service training programs**. It measures every employee's:

1. Customer satisfaction score.
2. Number of complaints handled correctly.
3. Average resolution time.

After collecting data, the company asks, “Do the three programs really produce different outcomes?”

You might compare the three averages for satisfaction. Then compare the three averages for correct handling. Then compare the three averages for resolution time. But now you have three separate answers, even though these characteristics describe the **same employee's performance**. An employee who solves cases correctly may also resolve them quickly, or may take more time to be accurate. The outcomes are related.

A **multivariate mean comparison** asks whether the **entire profile of average outcomes** differs across groups.

For example, let a group's average profile be:

\[
\boldsymbol{\mu}_A=
\begin{bmatrix}
80\\ 25\\ 12
\end{bmatrix},
\qquad
\boldsymbol{\mu}_B=
\begin{bmatrix}
85\\ 28\\ 10
\end{bmatrix}.
\]

The first entry might be mean satisfaction, the second mean correct cases, and the third mean resolution time in minutes. Rather than asking three unrelated questions, we can ask:

\[
\boxed{H_0:\boldsymbol{\mu}_A=\boldsymbol{\mu}_B.}
\]

This means **all three corresponding population means are equal simultaneously**. The alternative is that the two vectors are not equal, meaning **at least one component differs**. It does **not** mean every component must differ.

**Important distinction:** The two displayed mean vectors are made-up motivation, not figures from the lecturer's dataset. And a difference in *observed* averages by itself does not prove a difference in the underlying populations.

## 2. The vocabulary you need before any test

### 2.1 Population, sample, observation, variable, and group

**[Teaching extension]**

A **population** is the complete collection of units about which we want to draw conclusions, such as all drivers of a particular truck type. A **sample** is a smaller collection observed from that population. An **experimental or observational unit** is what one row describes: a customer, person, truck, specimen, or flower. A **variable** is one measured characteristic, such as cost per mile. A **group** is a category of units that you wish to compare, such as gasoline versus diesel trucks.

If each of 40 customers has a satisfaction score and a waiting time, there are **40 observations and two response variables**. There are not 80 independent customers merely because there are 80 numbers.

The terms *outcome variable*, *response variable*, and *dependent variable* refer to what is measured. The *grouping variable*, *factor*, or *treatment* identifies the groups being compared.

A factor with three categories is still **one factor**. Thus a comparison of three training programs is a **one-way** analysis, not a three-way analysis.

### 2.2 Parameter versus statistic

A **parameter** describes a population. We use Greek symbols for many parameters:

- \(\mu\): a population mean.
- \(\sigma^2\): a population variance.
- \(\boldsymbol\mu\): a vector of population means.
- \(\boldsymbol\Sigma\): a population covariance matrix.

A **statistic** is calculated from a sample:

- \(\bar x\): a sample mean.
- \(s^2\): a sample variance.
- \(\bar{\mathbf x}\): a sample mean vector.
- \(\mathbf S\): a sample covariance matrix.

We know the sample statistics because we have the data. We generally **do not know** the corresponding population parameters. Statistical inference uses sample information to make defensible statements about those unknown parameters.

### 2.3 Means, differences, and why uncertainty exists

For observations \(x_1,\ldots,x_n\), the sample average is

\[
\bar x=\frac{x_1+x_2+\cdots+x_n}{n}
=\frac{1}{n}\sum_{j=1}^{n}x_j.
\]

Here \(n\) is the number of observations and \(\sum\) means “add up.” For scores 7, 8, 10, and 11,

\[
\bar x=\frac{7+8+10+11}{4}=9.
\]

A second random sample might have a different mean. That is **sampling variation**: estimates move around because the chosen units vary. A population mean is a fixed property of the population being studied; a sample mean changes across hypothetical repeated samples.

So there are two very different questions:

- **Descriptive:** “Are the sample means different?” You can answer by looking at the numbers.
- **Inferential:** “Does the evidence suggest the population means differ?” You need an uncertainty model and a statistical test.

The remainder of the lecture concerns the second question.

## 3. Variation, standard deviation, and standard error

**[Teaching extension]**

We cannot judge how convincing a mean difference is without knowing how much the observations vary.

### 3.1 Variance and standard deviation

The sample variance is

\[
s^2=\frac{\sum_{j=1}^{n}(x_j-\bar x)^2}{n-1}.
\]

Interpretation of every symbol:

| Symbol | Meaning |
|---|---|
| \(x_j\) | The \(j\)th observed value |
| \(\bar x\) | The mean of the observed values |
| \(x_j-\bar x\) | How far one observation is above or below its mean |
| \((x_j-\bar x)^2\) | Squared deviation, so positive and negative deviations do not cancel |
| \(\sum\) | Add these squared deviations for all observations |
| \(n-1\) | Sample variance denominator, reflecting one fitted mean |
| \(s\) | Sample standard deviation, the positive square root of \(s^2\) |

For \(x=(2,4,6)\), the mean is 4, so

\[
s^2=\frac{(2-4)^2+(4-4)^2+(6-4)^2}{3-1}
=\frac{4+0+4}{2}=4,
\qquad s=2.
\]

**Variance** has squared units, such as squared minutes. **Standard deviation** has the original units, such as minutes.

### 3.2 Standard deviation is not standard error

The *standard deviation* describes the spread of individual values. The *standard error of the sample mean* describes the sampling uncertainty in an estimated mean:

\[
SE(\bar x)=\frac{s}{\sqrt n}.
\]

Here \(\sqrt n\) is the square root of the sample size. For \(n=25\) and \(s=10\),

\[
SE(\bar x)=\frac{10}{\sqrt{25}}=2.
\]

The data still have standard deviation 10; it is the estimated **mean** that has standard error 2. Larger samples usually give more precise mean estimates, all else equal.

## 4. What is a statistical hypothesis?

**[Teaching extension; needed for all lecture tests]**

A **statistical hypothesis** is a statement about an unknown population parameter.

- \(H_0\), the **null hypothesis**, is the baseline statement assessed by the test.
- \(H_1\), the **alternative hypothesis**, represents what the test considers evidence against the null.

For the difference \(\delta=\mu_A-\mu_B\), a two-sided comparison is

\[
H_0:\delta=0,
\qquad
H_1:\delta\ne 0.
\]

The symbol \(\ne\) means “not equal to.” The number 0 represents **no population mean difference**. The null is not the statement that every observed value is identical, or that sample averages must be exactly equal.

### 4.1 The significance level \(\alpha\)

A researcher chooses a **significance level** before interpreting the result, commonly \(\alpha=0.05\) (5%) or \(\alpha=0.01\) (1%). If the assumptions of a well-calibrated test hold, using \(\alpha=0.05\) controls the probability of incorrectly rejecting a true null at about 5%.

This is called a **Type I error**. A **Type II error** occurs when a false null is not rejected. **Power** is the probability of rejecting a false null under a specified alternative.

| Reality | Reject \(H_0\) | Do not reject \(H_0\) |
|---|---|---|
| \(H_0\) true | Type I error | Correct non-rejection |
| \(H_0\) false | Correct detection | Type II error |

These concepts are properties of the testing procedure across hypothetical repetitions, not probabilities we can assign directly to the truth of \(H_0\) from one ordinary p-value.

### 4.2 Test statistic, reference distribution, and p-value

A **test statistic** summarizes how far observed data are from what the null predicts, relative to expected variability. A **reference distribution** describes its behavior if the null and the test's assumptions are true.

Examples of reference distributions in this book:

- \(t\) distribution: a single mean or paired mean difference.
- \(F\) distribution: ratios of scaled variation; ANOVA; transformed Hotelling tests; approximations for MANOVA.
- \(\chi^2\) distribution: several large-sample approximations, including certain multivariate tests.

The **p-value** is the probability, **assuming \(H_0\) and the statistical model are true**, of getting a test result at least as extreme as the one observed.

For a p-value of 0.02, it is **not** correct to say “there is a 2% chance that \(H_0\) is true.” Rather, the observed result would be relatively unusual under the null model.

The decision procedure is:

\[
\begin{cases}
p\text{-value}<\alpha &\Rightarrow \text{reject }H_0,\\[3pt]
p\text{-value}\ge\alpha &\Rightarrow \text{do not reject }H_0.
\end{cases}
\]

We say **“do not reject,”** not **“prove that the groups are equal.”** Lack of evidence can reflect small sample size, high variability, or genuinely small differences.

### 4.3 Statistical significance is not business significance

A mean difference of 0.01 can be statistically significant if it is estimated extremely precisely. A mean difference of 10 may be inconclusive if the sample is tiny and highly variable. A sound report discusses **magnitude, units, uncertainty, and practical consequences**, not only the p-value.

### 4.4 Confidence intervals

A **confidence interval** is a range calculated by a procedure that, across repeated samples under the model, covers the true parameter at the stated rate. For example, a 95% confidence interval procedure has 95% long-run coverage under its assumptions.

An interval can make the size and direction of a single mean difference easier to understand than a bare test result. In a two-sided conventional test, if a valid 95% confidence interval for a difference excludes zero, this corresponds to rejecting the matching point-null test at the 5% level.

**Do not interpret** a realized frequentist 95% interval as “the fixed parameter has a 95% probability of being inside this particular interval” without changing to a Bayesian framework.

## 5. Start with one outcome: a two-sample and a paired t-test

**[Teaching extension leading to Lecture: pp. 1–2]**

For two **independent** samples, each observation in group A belongs to a different, independent unit from group B. An independent-samples t-test compares their two population means, using an estimate of uncertainty appropriate to the design. If group variances may differ, **Welch's t-test** is often the sensible default in the one-variable setting.

For **paired data**, two measurements are matched deliberately. For example, each employee takes the same competence test before and after training. The data should not be treated as if they came from two unrelated sets of employees.

| Design | What one row represents | Correct basic comparison |
|---|---|---|
| Independent groups | One driver using gasoline *or* diesel | Compare means of two independent samples |
| Paired, before/after | One person measured twice | Compare the within-person differences |
| Matched pairs | Two intentionally matched comparable units | Compare differences within each pair |

The word **paired** describes the design, not simply the coincidence that two columns have equal lengths.

## 6. Why ANOVA exists before we learn MANOVA

**[Teaching extension underlying Lecture: pp. 11–12]**

Suppose we compare three branches on **one** outcome, sales per employee. Doing separate t-tests for A versus B, A versus C, and B versus C repeatedly increases the opportunity for false positives unless we control multiplicity. A **one-way analysis of variance (ANOVA)** provides an initial *omnibus* test of whether all group population means are equal.

For \(g\) groups:

\[
H_0:\mu_1=\mu_2=\cdots=\mu_g,
\qquad
H_1:\text{at least one population mean differs}.
\]

An **omnibus** test asks whether **any** difference exists, not which exact pair differs.

### 6.1 The central idea: between versus within

Suppose people within each branch give somewhat different sales results. Some variation is expected even if every branch has the same underlying mean. But if the branch averages are very far apart **relative to the spread inside branches**, evidence for an actual group effect becomes stronger.

One-way ANOVA compares:

- **Between-group variation:** how much the group means differ from the overall mean.
- **Within-group variation:** how much employees differ from others in their own group.

This is the central idea that MANOVA will generalize to several outcomes.

### 6.2 A complete one-variable ANOVA by hand

Consider this deliberately small **teaching-only** dataset:

| Group A | Group B | Group C |
|---:|---:|---:|
| 2 | 5 | 8 |
| 3 | 6 | 9 |
| 4 | 7 | 10 |

There are \(g=3\) groups, each with \(n_i=3\) observations. Total \(N=9\).

**Step 1. Calculate the group and overall means.**

\[
\bar x_A=3,\qquad\bar x_B=6,\qquad\bar x_C=9.
\]

\[
\bar x=\frac{2+3+4+5+6+7+8+9+10}{9}=6.
\]

**Step 2. Calculate between-group sum of squares.**

\[
SS_B=\sum_{i=1}^{g}n_i(\bar x_i-\bar x)^2.
\]

The symbol \(i\) indexes the group. Here:

\[
SS_B=3(3-6)^2+3(6-6)^2+3(9-6)^2
=27+0+27=54.
\]

**Step 3. Calculate within-group sum of squares.**

\[
SS_W=\sum_{i=1}^{g}\sum_{j=1}^{n_i}(x_{ij}-\bar x_i)^2.
\]

Each group's deviations from its own mean are \((-1,0,1)\), giving squared deviations \((1,0,1)\), sum 2. Therefore:

\[
SS_W=2+2+2=6.
\]

**Step 4. Verify total variation.**

\[
SS_T=SS_B+SS_W=54+6=60.
\]

The three sums of squares have different meanings; do not confuse the letters \(T\) (total), \(B\) (between), and \(W\) (within).

**Step 5. Count degrees of freedom.**

- Between: \(g-1=3-1=2\).
- Within: \(N-g=9-3=6\).
- Total: \(N-1=9-1=8\).

**Step 6. Compute mean squares and F.**

\[
MS_B=\frac{SS_B}{g-1}=\frac{54}{2}=27,
\qquad MS_W=\frac{SS_W}{N-g}=\frac{6}{6}=1.
\]

\[
\boxed{F=\frac{MS_B}{MS_W}=\frac{27}{1}=27.}
\]

Under the usual independent normal equal-variance ANOVA null model,

\[
F\sim F_{g-1,N-g}=F_{2,6}.
\]

The p-value is \(P(F_{2,6}\ge27)=0.001\). At \(\alpha=0.05\), reject the null of equal group means. This tells us there is a difference somewhere, not a verified account of every individual pair.

The corresponding ANOVA table is:

| Source | Sum of squares | df | Mean square | Statistic |
|---|---:|---:|---:|---:|
| Between groups | 54 | 2 | 27 | \(F=27\) |
| Within groups | 6 | 6 | 1 |  |
| Total | 60 | 8 |  |  |

### 6.3 Why the mathematical model matters

A univariate ANOVA model is written as

\[
x_{ij}=\mu+\alpha_i+\varepsilon_{ij}.
\]

Here:

- \(x_{ij}\): response of unit \(j\) in group \(i\).
- \(\mu\): an overall mean under the chosen parameterization.
- \(\alpha_i\): the mean effect associated with group \(i\).
- \(\varepsilon_{ij}\): the individual's deviation from that group's population mean.

In the standard normal homoscedastic model the errors are independent, have mean 0, and share variance \(\sigma^2\). An identifying constraint such as \(\sum_i n_i\alpha_i=0\) fixes the definition of the overall mean in an unbalanced design.

**ANOVA tests differences in means; it is not a test that all observations are equal or that all group variances are equal.** Equal error variance is an assumption of the ordinary ANOVA F-test, not its null about the means.

## 7. The mathematics of having several outcomes

**[Teaching extension, preparing for Lecture: pp. 2–3 and 6–12]**

### 7.1 Scalars, vectors, and matrices

A **scalar** is one number, such as the mean sales score 80.

A **vector** is an ordered collection of numbers. A column vector describing two average outcomes is

\[
\boldsymbol\mu=
\begin{bmatrix}
80\\12
\end{bmatrix}.
\]

Its **dimension** is \(p=2\), because there are two outcomes. The superscript \(\mathsf T\) or \(\prime\) means *transpose*: turn a column into a row or the reverse.

\[
\begin{bmatrix}80\\12\end{bmatrix}^{\mathsf T}=
\begin{bmatrix}80&12\end{bmatrix}.
\]

A **matrix** is a rectangular array. If we have 4 customers and 2 outcomes, their data form a \(4\times2\) matrix: **rows are customers, columns are outcomes**.

\[
\mathbf X=
\begin{bmatrix}
80&12\\75&10\\90&15\\85&13
\end{bmatrix}.
\]

The sample mean vector averages each column:

\[
\bar{\mathbf x}=\begin{bmatrix}82.5\\12.5\end{bmatrix}.
\]

### 7.2 Multivariate mean difference

For two groups measuring the same \(p\) outcomes,

\[
\boldsymbol\mu_1-\boldsymbol\mu_2=
\begin{bmatrix}
\mu_{11}-\mu_{21}\\
\mu_{12}-\mu_{22}\\
\vdots\\
\mu_{1p}-\mu_{2p}
\end{bmatrix}.
\]

Equality of mean vectors means **every corresponding component difference is zero**. The alternative \(\boldsymbol\mu_1\ne\boldsymbol\mu_2\) means **at least one component differs**.

### 7.3 Covariance: how two characteristics move together

Variance describes the spread of one variable. **Covariance** describes how two variables tend to deviate from their respective means together.

\[
s_{XY}=\frac{1}{n-1}\sum_{j=1}^{n}(x_j-\bar x)(y_j-\bar y).
\]

A positive covariance means that above-average \(X\) often goes with above-average \(Y\). A negative covariance means above-average \(X\) often goes with below-average \(Y\). Covariance near zero means no strong *linear* co-movement is apparent; it does not necessarily mean complete independence.

For observations \((1,2),(2,4),(3,6)\):

\[
\bar x=2,\quad\bar y=4,
\]

\[
s_{XY}=\frac{(-1)(-2)+0(0)+(1)(2)}{3-1}
=\frac{4}{2}=2.
\]

**Correlation** standardizes covariance:

\[
r_{XY}=\frac{s_{XY}}{s_Xs_Y},\qquad -1\le r_{XY}\le1.
\]

A correlation close to +1 indicates a strong positive linear relationship; close to -1 indicates a strong negative one.

### 7.4 The covariance matrix

For \(p=2\), the sample covariance matrix is

\[
\mathbf S=
\begin{bmatrix}
s_1^2&s_{12}\\
s_{12}&s_2^2
\end{bmatrix}.
\]

Diagonal entries are variances. Off-diagonal entries are covariances. With three outcomes, the matrix has three variances on its diagonal and pairwise covariances elsewhere.

For example:

\[
\mathbf S=
\begin{bmatrix}
4&3\\3&4
\end{bmatrix}.
\]

Each variable has variance 4, but the positive covariance 3 tells us their movements are strongly linked.

The **population** version is \(\boldsymbol\Sigma\). A covariance matrix is symmetric; its diagonal entries cannot be negative; and for valid data it is positive semidefinite. Under a full-rank model it can be inverted.

### 7.5 Why covariance changes a multivariate test

Compare two differences with the same raw Euclidean length:

\[
\mathbf d_A=\begin{bmatrix}1\\1\end{bmatrix},\qquad
\mathbf d_B=\begin{bmatrix}1\\-1\end{bmatrix}.
\]

For \(\mathbf S=\begin{bmatrix}4&3\\3&4\end{bmatrix}\), the inverse is

\[
\mathbf S^{-1}=\frac{1}{4(4)-3(3)}
\begin{bmatrix}4&-3\\-3&4\end{bmatrix}
=\frac17\begin{bmatrix}4&-3\\-3&4\end{bmatrix}.
\]

A covariance-adjusted squared distance is

\[
D_M^2=\mathbf d^{\mathsf T}\mathbf S^{-1}\mathbf d.
\]

For \(\mathbf d_A\):

\[
D_{M,A}^2=
\begin{bmatrix}1&1\end{bmatrix}
\frac17\begin{bmatrix}4&-3\\-3&4\end{bmatrix}
\begin{bmatrix}1\\1\end{bmatrix}=
\frac{2}{7}.
\]

For \(\mathbf d_B\):

\[
D_{M,B}^2=
\begin{bmatrix}1&-1\end{bmatrix}
\frac17\begin{bmatrix}4&-3\\-3&4\end{bmatrix}
\begin{bmatrix}1\\-1\end{bmatrix}=2.
\]

The second squared distance is **seven times** the first, even though both difference vectors have the same ordinary length \(\sqrt2\). Why? When outcomes normally rise together, a joint rise is less unusual than one rising while the other falls.

**This is why multivariate testing cannot always be replaced by separate univariate tests.** Separate tests do not account for the *joint direction of the difference relative to the covariance pattern*.

### 7.6 Inverses, determinants, and quadratic forms

For any invertible \(2\times2\) matrix

\[
\mathbf A=\begin{bmatrix}a&b\\c&d\end{bmatrix},
\]

its **determinant** is \(|\mathbf A|=ad-bc\), and

\[
\mathbf A^{-1}=\frac{1}{ad-bc}
\begin{bmatrix}d&-b\\-c&a\end{bmatrix}.
\]

You may invert a matrix only when its determinant is nonzero. A **quadratic form** \(\mathbf v^{\mathsf T}\mathbf A\mathbf v\) produces a scalar; if \(\mathbf A\) is an inverse covariance matrix, it measures a covariance-adjusted squared distance.

Later, Hotelling's \(T^2\) will be **sample size times a squared covariance-adjusted distance between an observed mean vector and a null mean vector**. Wilks' lambda will use determinants to compare within-group variation with total variation.

### 7.7 What a multivariate normal distribution means

The notation

\[
\mathbf X\sim N_p(\boldsymbol\mu,\boldsymbol\Sigma)
\]

means \(\mathbf X\) is a \(p\)-dimensional multivariate normal random vector with mean vector \(\boldsymbol\mu\) and covariance matrix \(\boldsymbol\Sigma\). Every linear combination of the components is normally distributed under this model. For \(p=2\), equal-density contours are generally ellipses, whose orientation reflects covariance.

Individual outcome histograms that look approximately normal **do not, by themselves, establish joint multivariate normality**. Conversely, a large-sample Central Limit Theorem can make a *sample mean vector* approximately normal even when the original individual observations are not multivariate normal, subject to conditions.

---

# Part II. Paired comparisons, from one response to several

## 8. The lecturer's paired-comparison design

**[Lecture: pp. 1–2, §1]**

The lecture starts by comparing two treatments or measurement methods applied to the **same** unit or to a carefully matched pair of units. Its motivating example is a measurement taken before and after a drug treatment. Pairing removes much irrelevant unit-to-unit variation when that variation is shared by the two measurements.

For the \(j\)th pair, let:

- \(X_{j1}\): response under treatment 1 or before treatment.
- \(X_{j2}\): response under treatment 2 or after treatment.
- \(D_j=X_{j1}-X_{j2}\): its **paired difference**.
- \(j=1,\ldots,n\): the matched-pair index.

**The sign convention matters.** Because the lecturer defines difference as treatment 1 **minus** treatment 2, a negative difference means treatment 1 produced the lower observed outcome.

The population mean difference is

\[
\delta=E(D_j)=\mu_1-\mu_2.
\]

The lecturer writes three equivalent forms of the null and alternative:

\[
\begin{aligned}
H_0:&\ \delta=0
&\quad \text{versus}\quad H_1:&\ \delta\ne0,\\
H_0:&\ \mu_1-\mu_2=0
&\quad \text{versus}\quad H_1:&\ \mu_1-\mu_2\ne0,\\
H_0:&\ \mu_1=\mu_2
&\quad \text{versus}\quad H_1:&\ \mu_1\ne\mu_2.
\end{aligned}
\]

These refer to **population means**. The individual differences can be positive or negative under the null; they do not all need to be zero.

## 9. The paired t-test formula unpacked

**[Lecture: pp. 1–2, §1; explained further]**

Assume the paired differences \(D_1,\ldots,D_n\) are independent and normally distributed with mean \(\delta\) and variance \(\sigma_D^2\). The sample mean and sample variance of differences are

\[
\bar D=\frac1n\sum_{j=1}^nD_j,
\qquad
s_D^2=\frac{1}{n-1}\sum_{j=1}^n(D_j-\bar D)^2.
\]

To test a hypothesized mean difference \(\delta_0\), use

\[
\boxed{t=\frac{\bar D-\delta_0}{s_D/\sqrt n}\ \sim\ t_{n-1}\quad\text{under }H_0.}
\]

| Portion | What it does |
|---|---|
| \(\bar D\) | Observed average paired difference |
| \(\delta_0\) | Mean difference proposed by the null, usually 0 |
| \(\bar D-\delta_0\) | Departure from the null |
| \(s_D\) | Standard deviation of paired differences |
| \(s_D/\sqrt n\) | Estimated standard error of the mean difference |
| \(t\) | Departure expressed in standard-error units |
| \(n-1\) | Degrees of freedom for estimating the difference variance |

The lecture expresses the test with \(\delta\) in the numerator. In an operational test, the value inserted there is the **null-hypothesized value**, \(\delta_0\), not an unknown true mean.

Three equivalent two-sided decision methods from lecture page 2:

1. Reject if \(|t|\) exceeds the relevant two-sided \(t\) critical value.
2. Reject if the two-sided p-value is below \(\alpha\).
3. Reject at level \(\alpha\) if the corresponding \((1-\alpha)\) confidence interval excludes zero.

The interval is

\[
\boxed{\bar D\pm t_{n-1,\,1-\alpha/2}\frac{s_D}{\sqrt n},}
\]

where \(t_{n-1,\,1-\alpha/2}\) is the positive upper quantile for a two-sided interval. Some textbooks write the same critical value using an *upper-tail probability* subscript \(\alpha/2\); the notation differs, not the cutoff.

### 9.1 Fully solved paired example

**[Teaching extension, not a lecturer-provided dataset]**

Suppose five employees make \(2,4,3,5,6\) fewer mistakes after training. We define each difference as **before minus after**, so positive values mean improvement.

\[
D=(2,4,3,5,6),\quad n=5.
\]

**Step 1. Calculate the mean difference.**

\[
\bar D=\frac{2+4+3+5+6}{5}=4.
\]

**Step 2. Compute the deviations and squared deviations.**

| \(D_j\) | \(D_j-4\) | \((D_j-4)^2\) |
|---:|---:|---:|
| 2 | -2 | 4 |
| 4 | 0 | 0 |
| 3 | -1 | 1 |
| 5 | 1 | 1 |
| 6 | 2 | 4 |
| **Sum** | **0** | **10** |

\[
s_D^2=\frac{10}{5-1}=2.5,
\qquad s_D=\sqrt{2.5}=1.5811.
\]

**Step 3. Calculate the standard error.**

\[
SE=\frac{1.5811}{\sqrt5}=\sqrt{\frac{2.5}{5}}
=\sqrt{0.5}=0.7071.
\]

**Step 4. Test \(H_0:\delta=0\).**

\[
t=\frac{4-0}{0.7071}=5.6569,\quad df=4.
\]

A two-sided p-value is approximately 0.0048. This is below 0.05, so the hypothetical data provide evidence that mean mistakes decreased after training.

**Step 5. Calculate a 95% interval.**

The positive \(t\) critical value for 4 degrees of freedom is approximately 2.776:

\[
4\pm2.776(0.7071)=4\pm1.963,
\]

\[
\boxed{95\%\ \mathrm{CI}\approx(2.037,\ 5.963).}
\]

The interval contains positive reductions and excludes zero. Its size is meaningful in **mistakes per employee**, not an abstract statistical unit.

The paired test worked by reducing each employee to **one meaningful change score**. Next, we apply the same idea when each unit has **multiple change scores**.

## 10. The multivariate paired design

**[Lecture: pp. 2–3, §1.1]**

Suppose each employee is assessed **before and after training** on:

- customer communication;
- technical accuracy;
- resolution time.

We now have \(p=3\) variables, \(n\) employees, and **two treatment conditions**. Every employee contributes **one vector of paired differences**, not three independent observations.

### 10.1 Decode the lecturer's three-index notation

The lecture defines \(X_{ijk}\) as the measured value of:

- treatment \(i\), where \(i=1,2\);
- experimental unit \(j\), where \(j=1,\ldots,n\);
- variable \(k\), where \(k=1,\ldots,p\).

For example, \(X_{2,5,3}\) is **variable 3, unit 5, treatment 2**. This ordering is specific to the paired-treatment notation of §1.1; later, in independent groups, the first index identifies the population/group. Always read a definition instead of guessing from an index's position.

For each unit and outcome, calculate

\[
\boxed{D_{jk}=X_{1jk}-X_{2jk}.}
\]

Then place the \(p\) differences for the same unit in a vector:

\[
\mathbf D_j=
\begin{bmatrix}D_{j1}\\D_{j2}\\\vdots\\D_{jp}\end{bmatrix}.
\]

The difference dataset is an \(n\times p\) table:

\[
\mathbf D=\begin{bmatrix}
D_{11}&D_{12}&\cdots&D_{1p}\\
D_{21}&D_{22}&\cdots&D_{2p}\\
\vdots&\vdots&&\vdots\\
D_{n1}&D_{n2}&\cdots&D_{np}
\end{bmatrix}.
\]

The lecture writes the transposed version \(\mathbf D_j'= [D_{j1},\ldots,D_{jp}]\). These are merely two ways to specify the same vector.

### 10.2 Mean difference vector and covariance of differences

Assume the independent difference vectors have a common mean

\[
E(\mathbf D_j)=\boldsymbol\delta=
\begin{bmatrix}\delta_1\\\vdots\\\delta_p\end{bmatrix}
\]

and covariance matrix

\[
\operatorname{Cov}(\mathbf D_j)=\boldsymbol\Sigma_D.
\]

The sample estimates are

\[
\boxed{\bar{\mathbf D}=\frac1n\sum_{j=1}^{n}\mathbf D_j,}
\]

\[
\boxed{\mathbf S_D=\frac1{n-1}\sum_{j=1}^{n}
(\mathbf D_j-\bar{\mathbf D})
(\mathbf D_j-\bar{\mathbf D})^{\mathsf T}.}
\]

Inside the covariance formula, \((\mathbf D_j-\bar{\mathbf D})\) is a \(p\times1\) column. Multiplying by its \(1\times p\) transpose creates a \(p\times p\) matrix. The diagonal entries measure variance in each difference; the off-diagonal entries measure how different outcomes' changes relate.

Under the model specified in the lecture,

\[
\mathbf D_1,\ldots,\mathbf D_n
\stackrel{\mathrm{ind}}{\sim}N_p(\boldsymbol\delta,\boldsymbol\Sigma_D).
\]

That is: independent paired-difference vectors, each multivariate normal with the same mean and covariance. **The differences themselves** are the relevant objects for a paired Hotelling test. Multivariate normality of each original before/after column is not the precise assumption being checked.

### 10.3 State the vector hypothesis

\[
\boxed{H_0:\boldsymbol\delta=\mathbf0_p
\quad\text{versus}\quad
H_1:\boldsymbol\delta\ne\mathbf0_p.}
\]

The symbol \(\mathbf0_p\) represents a column of \(p\) zeros. If \(p=3\), then

\[
\mathbf0_3=\begin{bmatrix}0\\0\\0\end{bmatrix}.
\]

The null says **none of the three population mean outcomes changes on average**. The alternative says **at least one population mean change is nonzero**, possibly with an important multivariate pattern.

## 11. Paired Hotelling's \(T^2\): the multivariate paired t-test

**[Lecture: p. 3, §1.1; mathematical detail expanded]**

A natural multivariate counterpart of the paired t-test is **Hotelling's \(T^2\)**:

\[
\boxed{
T^2=n(\bar{\mathbf D}-\boldsymbol\delta_0)^{\mathsf T}
\mathbf S_D^{-1}
(\bar{\mathbf D}-\boldsymbol\delta_0).
}
\]

For this lecture's null, \(\boldsymbol\delta_0=\mathbf0_p\). In that case the formula simplifies to

\[
\boxed{T^2=n\bar{\mathbf D}^{\mathsf T}\mathbf S_D^{-1}\bar{\mathbf D}.}
\]

### 11.1 Every symbol in this formula

| Symbol | Meaning | Dimensions |
|---|---|---|
| \(T^2\) | Nonnegative multivariate test statistic | Scalar |
| \(n\) | Number of paired units | Scalar |
| \(p\) | Number of difference outcomes | Scalar |
| \(\bar{\mathbf D}\) | Average of paired-difference vectors | \(p\times1\) |
| \(\boldsymbol\delta_0\) | Hypothesized population mean difference vector | \(p\times1\) |
| \(\mathbf S_D\) | Sample covariance matrix of differences | \(p\times p\) |
| \(\mathbf S_D^{-1}\) | Inverse sample covariance | \(p\times p\) |
| \(^{\mathsf T}\) | Transpose, turns the column difference into a row | \(1\times p\) |

The order of multiplication is meaningful:

\[
\underbrace{(1\times p)}_{\text{row}}
\underbrace{(p\times p)}_{\text{matrix}}
\underbrace{(p\times1)}_{\text{column}}
=\underbrace{(1\times1)}_{\text{number}}.
\]

The test measures how far the observed mean-difference vector lies from zero, **accounting for the direction and amount of covariance**, then scales by sample size.

**A useful link:** For \(p=1\), \(\mathbf S_D\) becomes the single number \(s_D^2\), and

\[
T^2=n\frac{(\bar D-\delta_0)^2}{s_D^2}
=\left(\frac{\bar D-\delta_0}{s_D/\sqrt n}\right)^2=t^2.
\]

So Hotelling's \(T^2\) is not an unrelated invention. It is a direct extension of a squared one-variable t-statistic.

### 11.2 From \(T^2\) to an F-test

If the paired differences are independent multivariate normal vectors, the covariance matrix is nonsingular, and \(n>p\), then under \(H_0\),

\[
\boxed{\frac{n-p}{p(n-1)}T^2\sim F_{p,n-p}.}
\]

Equivalently, a critical-value rule is

\[
\boxed{
\text{Reject }H_0\text{ if }
T^2>\frac{p(n-1)}{n-p}F_{p,n-p;\,1-\alpha}.
}
\]

The lecturer expresses the equivalent relationship as a scaled \(F_{p,n-p}\) distribution for \(T^2\) (PDF p. 3).

To use the formula correctly:

1. Compute \(T^2\) from the mean difference and covariance matrix.
2. Convert to \(F_{\mathrm{observed}}=\dfrac{n-p}{p(n-1)}T^2\).
3. Use numerator df \(p\) and denominator df \(n-p\).
4. Compute the **upper-tail** F p-value or compare the transformed statistic with the upper F critical value.

For a large sample and fixed \(p\), the usual asymptotic approximation is

\[
T^2\ \overset{\mathrm{approx}}{\sim}\ \chi^2_p\quad\text{under }H_0.
\]

This is useful as an approximation; the F transformation is the finite-sample exact reference in the stated normal model.

### 11.3 Can we apply the test with very many outcomes?

The usual inverse \(\mathbf S_D^{-1}\) requires a nonsingular covariance matrix. For \(n\) difference vectors in \(p\) dimensions, the centered sample covariance has rank at most \(n-1\). Consequently, the conventional full-rank test needs **at least \(n>p\)** and no exact linear dependencies among outcomes. If there are more variables than independent units, or one outcome is a perfect linear combination of others, the inverse cannot be computed in the ordinary way.

This is not a software inconvenience: it means the data do not contain enough independent directions to estimate that unrestricted covariance matrix.

## 12. The lecturer's wastewater-laboratory example: all 11 pairs

**[Lecture: pp. 3–5, §1.2, Table 6.1 on p. 4. Calculations independently reconstructed from that table.]**

### 12.1 Real question and study design

Municipal wastewater samples were **split** and sent to two laboratories:

- a commercial laboratory;
- the Wisconsin State Laboratory of Hygiene.

Each sample split produced two outcomes:

1. **BOD:** biochemical oxygen demand;
2. **SS:** suspended solids.

There are \(n=11\) paired sample splits and \(p=2\) outcome variables. Because both laboratories measured halves of **the same collected sample**, observations are *paired*. Comparing them as independent groups would ignore the crucial design feature.

The question posed on lecture page 4 is whether the two laboratories' chemical analyses agree and, if differences exist, their nature.

**Important limitation:** Testing a mean difference of zero addresses **systematic average difference**, not every aspect of agreement. Two laboratories could have the same mean but disagree badly on individual samples. A fuller method-agreement study might also examine individual differences, variability, measurement error, and limits of agreement. That last point is an extension, not a claim made in the lecture.

### 12.2 Original input data and differences

The table below reproduces all observations from lecture Table 6.1 and adds calculated differences, using **commercial minus state laboratory**.

| Sample | Commercial BOD | Commercial SS | State BOD | State SS | BOD difference | SS difference |
|---:|---:|---:|---:|---:|---:|---:|
| 1 | 6 | 27 | 25 | 15 | -19 | 12 |
| 2 | 6 | 23 | 28 | 13 | -22 | 10 |
| 3 | 18 | 64 | 36 | 22 | -18 | 42 |
| 4 | 8 | 44 | 35 | 29 | -27 | 15 |
| 5 | 11 | 30 | 15 | 31 | -4 | -1 |
| 6 | 34 | 75 | 44 | 64 | -10 | 11 |
| 7 | 28 | 26 | 42 | 30 | -14 | -4 |
| 8 | 71 | 124 | 54 | 64 | 17 | 60 |
| 9 | 43 | 54 | 34 | 56 | 9 | -2 |
| 10 | 33 | 30 | 29 | 20 | 4 | 10 |
| 11 | 20 | 14 | 39 | 21 | -19 | -7 |
| **Sum of differences** | | | | | **-103** | **146** |

For sample 1, the vector of differences is

\[
\mathbf D_1=\begin{bmatrix}6-25\\27-15\end{bmatrix}
=\begin{bmatrix}-19\\12\end{bmatrix}.
\]

For sample 8, both differences are positive:

\[
\mathbf D_8=\begin{bmatrix}71-54\\124-64\end{bmatrix}
=\begin{bmatrix}17\\60\end{bmatrix}.
\]

Notice that outcomes are not perfectly consistent in sign across all specimens; we must **calculate the overall test**, not simply look for matching signs.

### 12.3 Step 1: Form the hypotheses

The two-component mean-difference vector is

\[
\boldsymbol\delta=
\begin{bmatrix}\delta_{\mathrm{BOD}}\\\delta_{\mathrm{SS}}\end{bmatrix}.
\]

Test

\[
\boxed{
H_0:\begin{bmatrix}\delta_{\mathrm{BOD}}\\\delta_{\mathrm{SS}}\end{bmatrix}
=\begin{bmatrix}0\\0\end{bmatrix}
\quad\text{versus}\quad H_1:\boldsymbol\delta\ne\mathbf0_2.
}
\]

The lecture specifies \(\alpha=0.05\).

### 12.4 Step 2: Calculate the mean-difference vector

\[
\bar D_{\mathrm{BOD}}=\frac{-103}{11}=-9.363636\ldots
\]

\[
\bar D_{\mathrm{SS}}=\frac{146}{11}=13.272727\ldots
\]

So

\[
\boxed{\bar{\mathbf D}=
\begin{bmatrix}-9.363636\\13.272727\end{bmatrix}.}
\]

As a descriptive statement, commercial laboratory BOD values average about 9.36 units **lower** than state laboratory values within these splits; commercial SS values average about 13.27 units **higher**. Whether this average vector differs significantly from zero requires the formal test.

### 12.5 Step 3: Calculate the covariance matrix of differences

For two variables the formula is

\[
\mathbf S_D=
\begin{bmatrix}
\frac{\sum(D_{j,\mathrm{BOD}}-\bar D_{\mathrm{BOD}})^2}{n-1}
&\frac{\sum(D_{j,\mathrm{BOD}}-\bar D_{\mathrm{BOD}})(D_{j,\mathrm{SS}}-\bar D_{\mathrm{SS}})}{n-1}\\[6pt]
\frac{\sum(D_{j,\mathrm{SS}}-\bar D_{\mathrm{SS}})(D_{j,\mathrm{BOD}}-\bar D_{\mathrm{BOD}})}{n-1}
&\frac{\sum(D_{j,\mathrm{SS}}-\bar D_{\mathrm{SS}})^2}{n-1}
\end{bmatrix}.
\]

With \(n-1=10\), calculation from the 11 rows gives

\[
\boxed{\mathbf S_D\approx
\begin{bmatrix}
199.254545&88.309091\\
88.309091&418.618182
\end{bmatrix}.}
\]

What this means:

- BOD paired differences have sample variance about 199.25.
- SS paired differences have sample variance about 418.62.
- The sample covariance of the paired differences is about +88.31.

Thus the paired changes in BOD and SS tend to move together positively, although not perfectly. This off-diagonal information is something the pair of separate t-tests does not use jointly.

**A calculation check using raw sums:**

\[
\sum D_{j,\mathrm{BOD}}=-103,\quad
\sum D_{j,\mathrm{SS}}=146,
\]

and, using the identity \(\sum(x-\bar x)^2=\sum x^2-(\sum x)^2/n\), you can reproduce the diagonal entries without subtracting 11 separate means by hand. Both approaches must agree.

### 12.6 Step 4: Invert the covariance matrix

For a symmetric \(2\times2\) matrix \(\begin{bmatrix}a&b\\b&d\end{bmatrix}\),

\[
\begin{bmatrix}a&b\\b&d\end{bmatrix}^{-1}
=\frac1{ad-b^2}\begin{bmatrix}d&-b\\-b&a\end{bmatrix}.
\]

Here the determinant is

\[
|\mathbf S_D|
=(199.254545)(418.618182)-(88.309091)^2
\approx 75613.08.
\]

It is positive, so the matrix is invertible. Therefore

\[
\mathbf S_D^{-1}
\approx\frac1{75613.08}
\begin{bmatrix}418.618182&-88.309091\\-88.309091&199.254545\end{bmatrix}
\]

\[
\boxed{\mathbf S_D^{-1}\approx
\begin{bmatrix}
0.00553632&-0.00116791\\
-0.00116791&0.00263519
\end{bmatrix}.}
\]

In practice, R can solve the matrix system without making you hand-compute this inverse, but understanding it explains why covariance affects the test.

### 12.7 Step 5: Compute the raw \(T^2\)

With the null vector \(\mathbf0_2\),

\[
T^2=n\bar{\mathbf D}^{\mathsf T}\mathbf S_D^{-1}\bar{\mathbf D}.
\]

Insert the measured quantities:

\[
T^2=11
\begin{bmatrix}-9.363636&13.272727\end{bmatrix}
\begin{bmatrix}
0.00553632&-0.00116791\\
-0.00116791&0.00263519
\end{bmatrix}
\begin{bmatrix}-9.363636\\13.272727\end{bmatrix}.
\]

The inner covariance-adjusted squared distance is approximately

\[
\bar{\mathbf D}^{\mathsf T}\mathbf S_D^{-1}\bar{\mathbf D}
\approx1.23993747.
\]

Consequently,

\[
\boxed{T^2\approx11(1.23993747)=13.63931214.}
\]

This is the **raw Hotelling \(T^2\)**. It is important because some software displays the **F-transformed** number in a column labelled `T.2`, which can otherwise cause confusion.

### 12.8 Step 6: Transform to F and obtain the p-value

Here \(n=11\), \(p=2\), so the degrees of freedom are:

\[
df_1=p=2,\qquad df_2=n-p=9.
\]

Convert:

\[
F_{\mathrm{observed}}=
\frac{n-p}{p(n-1)}T^2
=\frac{11-2}{2(11-1)}(13.63931214)
\]

\[
=\frac9{20}(13.63931214)
=\boxed{6.13769046}.
\]

The upper-tail probability is

\[
\boxed{P(F_{2,9}\ge6.13769046)\approx0.02082779.}
\]

**This reproduces the lecturer's displayed R result:** `T.2 = 6.1377`, `df1 = 2`, `df2 = 9`, `p-value = 0.02083` (PDF p. 5). The source's displayed `T.2` value is numerically the **F-transformed statistic**, whereas the direct quadratic-form formula on p. 3 gives raw \(T^2\approx13.6393\). Both lead to the same p-value when used with the corresponding reference distribution.

Because \(0.02083<0.05\), **reject \(H_0\)**. The data give evidence of a **joint nonzero average laboratory difference** across BOD and SS. Descriptively, the commercial laboratory tends to report **lower BOD** and **higher SS** than the state laboratory, as noted in the lecture (p. 5).

**A particularly instructive result:** If we instead calculate ordinary two-sided paired t-tests separately for BOD and SS, their p-values are approximately **0.0524** and **0.0569**, respectively, under the t model. Neither is below 0.05 on its own, even though the *joint* Hotelling test is below 0.05. This is possible because the joint test evaluates a difference **direction relative to the covariance pattern**. It does not mean both individual outcomes have separately proved significant changes.

### 12.9 Step 7: Assess the normality assumption

**[Lecture: p. 5]**

The lecture uses `QuantPsyc::mult.norm()` to assess multivariate normality of the **difference vectors**. It reports these results:

| Diagnostic component | Estimate in source | Reported p-value |
|---|---:|---:|
| Multivariate skewness | 2.097584 | 0.4273089 |
| Multivariate kurtosis | 6.642691 | 0.5736319 |

Both p-values exceed 0.05, so the lecture **does not reject multivariate normality** for these 11 difference vectors.

This result should be read carefully: a small sample of 11 makes diagnostics imperfect, and **non-rejection is not proof of normality**. The lecturer correctly frames the conclusion as failure to reject the normality null, not mathematical proof that the distribution is normal.

### 12.10 Reproduce the wastewater analysis in R without an external data file

**[Teaching extension providing a self-contained, executable version of the lecture's workflow]**

The original file `T6-1.dat` is referenced in the lecture, but every row is printed on PDF page 4. The code below embeds those original rows, so you can run it even if that `.dat` file is not in your R working directory.

```r
# Original Table 6.1, column order: commercial BOD, commercial SS,
# state BOD, state SS
lab <- data.frame(
  commercial_BOD = c(6, 6, 18, 8, 11, 34, 28, 71, 43, 33, 20),
  commercial_SS  = c(27, 23, 64, 44, 30, 75, 26, 124, 54, 30, 14),
  state_BOD      = c(25, 28, 36, 35, 15, 44, 42, 54, 34, 29, 39),
  state_SS       = c(15, 13, 22, 29, 31, 64, 30, 64, 56, 20, 21)
)

# Subtract measurements within the same split sample.
Diff <- data.frame(
  BODdiff = lab$commercial_BOD - lab$state_BOD,
  SSdiff  = lab$commercial_SS - lab$state_SS
)
print(Diff)

# Inspect all statistical inputs.
n <- nrow(Diff)
p <- ncol(Diff)
mean_difference <- colMeans(Diff)
S_D <- cov(Diff)
raw_T2 <- as.numeric(n * t(mean_difference) %*%
                       solve(S_D) %*% mean_difference)
F_value <- (n - p) * raw_T2 / (p * (n - 1))
p_value <- pf(F_value, df1 = p, df2 = n - p, lower.tail = FALSE)

print(mean_difference)
print(S_D)
print(c(raw_T2 = raw_T2, F_value = F_value, p_value = p_value))

# Ordinary paired-difference t-tests, for comparison only.
t.test(Diff$BODdiff, mu = 0)
t.test(Diff$SSdiff, mu = 0)
```

You should find approximately:

```text
mean_difference: BODdiff = -9.363636, SSdiff = 13.272727
raw_T2          = 13.639312
F_value         =  6.137690
p_value         =  0.020828
```

To reproduce the **specific package-based commands from the lecture** (installation may be required once), run:

```r
# install.packages(c("QuantPsyc", "ICSNP"))
library(QuantPsyc)
mult.norm(Diff)$mult.test

library(ICSNP)
HotellingsT2(Diff, mu = c(0, 0), test = "f")
```

Explanation of the important R functions:

| R expression | What it does |
|---|---|
| `data.frame()` | Builds a rectangular table with named columns |
| `c(...)` | Combines values into a vector |
| `$` | Accesses a named data-frame column |
| `colMeans(Diff)` | Calculates a mean for each outcome column |
| `cov(Diff)` | Calculates the sample covariance matrix |
| `t(mean_difference)` | Transposes the mean vector |
| `solve(S_D)` | Computes the inverse of the sample covariance matrix |
| `%*%` | Performs matrix multiplication, not elementwise multiplication |
| `as.numeric()` | Converts a one-number result into a scalar numeric value |
| `pf(..., lower.tail = FALSE)` | Gets the right-tail probability from the F distribution |
| `mult.norm(Diff)$mult.test` | Requests the multivariate normality-test output used in the lecture |
| `HotellingsT2(..., test = "f")` | Performs a package-based Hotelling test using its F reference |

**Sanity check:** If you accidentally compute `state - commercial` instead, both components of the average difference change sign. For a two-sided Hotelling test the quadratic statistic and p-value stay the same, but the interpretation of direction reverses.

---

# Part III. Comparing two independent multivariate population means

## 13. Why the two-sample problem is different

**[Lecture: p. 6, §2]**

Now imagine comparing **gasoline trucks** with **diesel trucks**. A gasoline truck is not the same observational unit as a diesel truck; there is no meaningful before-and-after pair for each unit. We instead have two **independent random samples**.

The lecturer's notation is:

- \(n_1\): number of units in population 1's sample.
- \(n_2\): number of units in population 2's sample.
- \(p\): number of response variables recorded per unit.
- \(x_{ijk}\): observed variable \(k\), unit \(j\), population \(i\).
- \(\boldsymbol\mu_1,\boldsymbol\mu_2\): the two population mean vectors.
- \(\boldsymbol\Sigma_1,\boldsymbol\Sigma_2\): their population covariance matrices.
- \(\bar{\mathbf x}_1,\bar{\mathbf x}_2\): the two sample mean vectors.
- \(\mathbf S_1,\mathbf S_2\): the two sample covariance matrices.

The hypotheses are

\[
\boxed{H_0:\boldsymbol\mu_1=\boldsymbol\mu_2
\quad\text{versus}\quad H_1:\boldsymbol\mu_1\ne\boldsymbol\mu_2.}
\]

Equivalently, \(H_0:\boldsymbol\mu_1-\boldsymbol\mu_2=\mathbf0_p\).

We now compare the two independently estimated means, not \(n\) within-pair differences. As a result, the calculation of uncertainty differs.

## 14. Independence, multivariate normality, and common covariance

**[Lecture: pp. 6–7, §2.1]**

The lecture distinguishes the data-collection assumptions from the additional assumptions useful for exact small-sample testing.

**Design assumptions:**

1. The data come from samples of the relevant \(p\)-variate populations.
2. The samples from population 1 and population 2 are independent.

**Model assumptions for the conventional pooled finite-sample Hotelling test:**

3. The observations in each population follow a multivariate normal distribution.
4. The populations share a common covariance matrix: \(\boldsymbol\Sigma_1=\boldsymbol\Sigma_2=\boldsymbol\Sigma\).

This covariance assumption says the **spread and relationships of variables** are the same in both groups. It does **not** say the mean vectors are equal.

The distinction is vital:

| Hypothesis | What is being compared? | Associated procedure in lecture |
|---|---|---|
| \(H_0:\boldsymbol\mu_1=\boldsymbol\mu_2\) | Population **means** | Two-sample Hotelling's \(T^2\) |
| \(H_0:\boldsymbol\Sigma_1=\boldsymbol\Sigma_2\) | Population **covariance matrices** | Box's M-test |

A sample may show strongly different means but similar covariance matrices, or the opposite, or both kinds of difference.

### 14.1 Common covariance and pooling

When the two populations share the same covariance matrix, each sample covariance estimates \(\boldsymbol\Sigma\). It is reasonable to combine their information into one **pooled covariance matrix**:

\[
\boxed{
\mathbf S_p=
\frac{(n_1-1)\mathbf S_1+(n_2-1)\mathbf S_2}{n_1+n_2-2}.
}
\]

Read the weights carefully:

- \(n_1-1\) and \(n_2-1\) are the covariance degrees of freedom contributed by each sample.
- \((n_1-1)\mathbf S_1\) is sample 1's sum-of-squares-and-cross-products matrix.
- \((n_2-1)\mathbf S_2\) is sample 2's analogous matrix.
- \(n_1+n_2-2\) is the sum of the two groups' covariance degrees of freedom.

The pooled matrix is **not** generally the simple average \((\mathbf S_1+\mathbf S_2)/2\), especially when sample sizes differ.

### 14.2 Why the standard error is different from the paired case

For two independent sample means,

\[
\operatorname{Cov}(\bar{\mathbf X}_1-\bar{\mathbf X}_2)
=\frac{\boldsymbol\Sigma_1}{n_1}
+\frac{\boldsymbol\Sigma_2}{n_2}.
\]

If both population covariances are the same \(\boldsymbol\Sigma\), then

\[
\operatorname{Cov}(\bar{\mathbf X}_1-\bar{\mathbf X}_2)
=\left(\frac1{n_1}+\frac1{n_2}\right)\boldsymbol\Sigma.
\]

The inverse of the multiplier \(\frac1{n_1}+\frac1{n_2}\) is

\[
\frac{1}{(1/n_1)+(1/n_2)}
=\frac{n_1n_2}{n_1+n_2}.
\]

That is the sample-size factor appearing in the independent two-sample Hotelling statistic.

## 15. The pooled two-sample Hotelling test

**[Teaching extension: explicit working formula and exact distribution needed to understand the two-sample R example on lecture pp. 7–10]**

For \(\mathbf d=\bar{\mathbf x}_1-\bar{\mathbf x}_2\), the conventional two-sample statistic is

\[
\boxed{
T^2=\frac{n_1n_2}{n_1+n_2}
\mathbf d^{\mathsf T}\mathbf S_p^{-1}\mathbf d.
}
\]

Every component has a role:

| Component | Interpretation |
|---|---|
| \(\mathbf d\) | Observed difference in the sample mean vectors |
| \(\mathbf S_p\) | Estimated common within-group covariance |
| \(\mathbf S_p^{-1}\) | Adjusts the distance for variance and covariance |
| \(n_1n_2/(n_1+n_2)\) | Scales for precision using both independent sample sizes |
| \(T^2\) | Squared joint standardized distance between the two estimated mean vectors |

Let \(N=n_1+n_2\). Under the independent multivariate normal common-covariance null model, provided the required covariance is nonsingular,

\[
\boxed{
\frac{N-p-1}{p(N-2)}T^2\sim F_{p,N-p-1}.
}
\]

Thus \(df_1=p\), \(df_2=N-p-1\). These degrees of freedom are **not** the same as the paired test's \(p,n-p\).

For large samples with fixed \(p\), \(T^2\) may be compared approximately with \(\chi^2_p\), which is the approach explicitly selected by the lecturer's truck example with `test = "chi"` (p. 10).

### 15.1 Tiny complete two-sample calculation

**[Teaching extension; illustrative data, not the truck dataset]**

Suppose two types of training are compared on two scores. Each group contains four *different* employees.

| Unit | Group 1 score A | Group 1 score B | Group 2 score A | Group 2 score B |
|---:|---:|---:|---:|---:|
| 1 | 1 | 1 | 3 | 3 |
| 2 | 1 | 3 | 3 | 5 |
| 3 | 3 | 1 | 5 | 3 |
| 4 | 3 | 3 | 5 | 5 |

The pairing of rows in the display is **for compactness only**; group 1 and group 2 employees are independent.

**Step 1. Mean vectors.**

\[
\bar{\mathbf x}_1=\begin{bmatrix}2\\2\end{bmatrix},
\qquad
\bar{\mathbf x}_2=\begin{bmatrix}4\\4\end{bmatrix},
\qquad
\mathbf d=\begin{bmatrix}-2\\-2\end{bmatrix}.
\]

**Step 2. Sample covariance matrices.**

In each group, values of either outcome differ from its group mean by \(-1,-1,+1,+1\), so each outcome's sum of squared deviations is 4. Dividing by \(n_i-1=3\) gives variance \(4/3\). The products of cross-deviations cancel to zero. Therefore

\[
\mathbf S_1=\mathbf S_2=
\begin{bmatrix}4/3&0\\0&4/3\end{bmatrix}.
\]

**Step 3. Pool the covariance.**

\[
\mathbf S_p=\frac{3\mathbf S_1+3\mathbf S_2}{6}
=\begin{bmatrix}4/3&0\\0&4/3\end{bmatrix},
\]

\[
\mathbf S_p^{-1}=\begin{bmatrix}3/4&0\\0&3/4\end{bmatrix}.
\]

**Step 4. Compute \(T^2\).**

The sample-size multiplier is \(4\times4/(4+4)=2\). Hence

\[
T^2=2
\begin{bmatrix}-2&-2\end{bmatrix}
\begin{bmatrix}3/4&0\\0&3/4\end{bmatrix}
\begin{bmatrix}-2\\-2\end{bmatrix}.
\]

First calculate the matrix-vector product:

\[
\begin{bmatrix}3/4&0\\0&3/4\end{bmatrix}
\begin{bmatrix}-2\\-2\end{bmatrix}
=\begin{bmatrix}-1.5\\-1.5\end{bmatrix}.
\]

Then the quadratic form:

\[
(-2)(-1.5)+(-2)(-1.5)=6.
\]

Therefore \(\boxed{T^2=2(6)=12}\).

**Step 5. Convert and decide.**

\[
N=8,\quad p=2,\quad
F=\frac{8-2-1}{2(8-2)}(12)=\frac{5}{12}(12)=5.
\]

Under the null, compare with \(F_{2,5}\):

\[
p\text{-value}=P(F_{2,5}\ge5)\approx0.06415.
\]

At \(\alpha=0.05\), **do not reject** the null. Although the observed score means differ by 2 on both measures, these tiny independent samples do not produce p-value evidence below 0.05 in this example. This is a direct illustration of why a descriptive difference is not the same thing as an inferential conclusion.

This example is deliberately small to make the matrix calculations transparent. It should not be treated as evidence that any real training interventions are equivalent.

## 16. Box's M-test: are the covariance matrices alike?

**[Lecture: pp. 7 and 13, §§2.1 and 3.3; explanations extended]**

For two groups, the test is

\[
H_0:\boldsymbol\Sigma_1=\boldsymbol\Sigma_2,
\qquad
H_1:\boldsymbol\Sigma_1\ne\boldsymbol\Sigma_2.
\]

For \(g\) groups it generalizes to

\[
\boxed{H_0:\boldsymbol\Sigma_1=\cdots=\boldsymbol\Sigma_g,}
\]

with alternative that **at least two covariance matrices differ**.

Box's M compares covariance matrices through their determinants. A covariance determinant reflects a generalized volume of multivariate dispersion; large differences among these quantities and covariance shapes can generate evidence against equality.

### 16.1 The central computation, explained

**[Teaching extension: explicit form; the lecture names and uses Box's M but does not print this entire formula]**

With \(g\) independent samples, total \(N=\sum_i n_i\), and pooled covariance

\[
\mathbf S_p=\frac{\sum_{i=1}^{g}(n_i-1)\mathbf S_i}{N-g},
\]

one common uncorrected form is

\[
M=(N-g)\log|\mathbf S_p|
-\sum_{i=1}^{g}(n_i-1)\log|\mathbf S_i|.
\]

Here \(\log\) is the natural logarithm, \(|\cdot|\) is a determinant, and each \(\mathbf S_i\) is a group-specific sample covariance matrix. A correction factor is applied for an approximate chi-square reference. Under the usual approximation the degrees of freedom are

\[
\boxed{df_M=\frac{(g-1)p(p+1)}2.}
\]

For \(g=2,p=3\), the df are \((1)(3)(4)/2=6\), matching the lecturer's truck example. For \(g=3,p=4\), the df are \((2)(4)(5)/2=20\), matching the iris example.

The lecture states an approximation guideline: a chi-square approximation when sample sizes exceed 20 and \(p\) and \(g\) do not exceed 5, with an F approximation otherwise (PDF pp. 7 and 13). Treat this as the **lecture's stated rule of thumb**, not a universal rule independent of software or sample configuration. Implementations and references differ in their approximations.

### 16.2 Interpreting Box's M responsibly

- A small p-value indicates **evidence against equal population covariance matrices**.
- A large p-value means the test has **not found enough evidence** against equality. It does not prove exact or near equality.
- The test is **sensitive to departures from multivariate normality**, which the lecture explicitly warns about.
- Group sample-size imbalance and outliers can make assumption violations more consequential.
- Box's M is a *diagnostic about a model assumption*, not an automatic permission slip to ignore a significant result.

In particular, if Box's M strongly rejects equal covariance matrices, simply writing “assume them nearly equal anyway” is a **deliberate simplifying choice**, not a conclusion that follows from the diagnostic. The lecture explicitly makes such simplifying choices in its truck and iris demonstrations. We will preserve the reported results while explaining the resulting limitation.

## 17. Lecturer example: gasoline versus diesel truck cost vectors

**[Lecture: pp. 7–10, §2.2]**

### 17.1 Research question, variables, and sample sizes

The lecture examines firms transporting milk from farms to dairy plants. It records per-mile costs for

\[
X_1=\text{fuel},\quad
X_2=\text{repair},\quad
X_3=\text{capital}.
\]

The groups and sizes are:

\[
n_1=36\quad\text{gasoline trucks},\qquad
n_2=23\quad\text{diesel trucks},\qquad p=3.
\]

The total number of sampled trucks is \(N=59\). The lecture asks in part (a) for a test of different **mean cost vectors** at **\(\alpha=0.01\)**, and in part (b) for an assumption check and sensitivity analysis after removing gasoline observations 9 and 21, identified as multivariate outliers.

The raw file is called `T6-10.dat`. **The full 59-row dataset is not reproduced in the supplied PDF:** only selected rows and summaries are shown. Consequently, this book **does not invent missing rows, new sample covariance values, or results of the requested reanalysis**.

### 17.2 The R input structure

The first three fields are numeric cost variables; the fourth is the truck's fuel-type label. The lecturer reads them using:

```r
data <- read.table("datasets/T6-10.dat")
head(data)
str(data)
data$V4 <- as.factor(data$V4)
str(data)
```

**What the commands mean:**

- `read.table()` loads a whitespace-separated file; adjust the relative path to where your copy is located.
- `head()` displays the first six rows, useful for catching columns read in the wrong order.
- `str()` reports how R has classified each column.
- `as.factor()` changes the grouping label into a categorical variable. This allows modeling functions to treat diesel and gasoline as groups rather than trying to fit a numeric trend.

The lecture shows `V4` as a factor with two levels, `diesel` and `gasoline`. The original rows are in the order **36 gasoline**, followed by **23 diesel**, which is why the lecturer can use rows `1:36` for gasoline and rows excluding those for diesel.

**Programming safety:** This ordering is a property of the lecturer's dataset, not a universal property of CSV or text files. In general, use logical group filters rather than assume that a category occupies a fixed range of rows.

### 17.3 Scatterplot matrix

**[Lecture: pp. 8–9; graphical output on p. 9]**

The R command `pairs(data[, 1:3], ...)` draws a **scatterplot matrix**. Every off-diagonal panel depicts a pair among fuel, repair, and capital costs. The plot uses distinct group colors and a legend.

What to inspect:

1. Do the two fuel-type groups seem shifted in one or more costs?
2. Do the clouds appear to have different shapes or spreads?
3. Are any points far from the main cloud?
4. Are variables strongly related within groups?

These plots are descriptive checks and cannot replace the formal mean-vector or covariance tests. A scatterplot may look unremarkable while a multivariate combination reveals a difference, or appear separated due to a few outliers.

### 17.4 Multivariate outliers via Mahalanobis distance

**[Lecture: p. 8; mathematical formula explained here]**

For one group, the generalized squared distance of observation \(\mathbf x_j\) from its group center is

\[
\boxed{D_j^2=(\mathbf x_j-\bar{\mathbf x})^{\mathsf T}
\mathbf S^{-1}(\mathbf x_j-\bar{\mathbf x}).}
\]

It accounts for the scale and covariance among all three cost variables. The lecture uses R's `mahalanobis()` separately within gasoline and diesel groups, not against one pooled mean.

It reports, among the gasoline trucks:

| Gasoline observation | Squared Mahalanobis distance |
|---:|---:|
| 9 | **17.64** |
| 21 | **10.73** |

These two observations stand out and are explicitly identified as multivariate outliers in the lecture (pp. 7–8). Their row numbers refer to the source's **original gasoline-group ordering**. Do not remove observations 9 and 21 from the combined 59-row data without checking the grouping and row order.

A high squared Mahalanobis distance flags a potentially unusual **joint cost profile**. It does not prove that a measurement was wrong. Valid extreme units can be important for understanding real business behavior.

### 17.5 Normality tests reported in the lecture

**[Lecture: p. 9]**

The lecturer applies the multivariate skewness and kurtosis diagnostics separately by truck type:

| Group | Diagnostic | Source p-value | At 0.05 |
|---|---|---:|---|
| Gasoline, \(n=36\) | Multivariate skewness | 0.0001332139 | Reject normality component null |
| Gasoline, \(n=36\) | Multivariate kurtosis | 0.0294552228 | Reject normality component null |
| Diesel, \(n=23\) | Multivariate skewness | 0.7822190 | Do not reject |
| Diesel, \(n=23\) | Multivariate kurtosis | 0.3410625 | Do not reject |

The lecture notes that the gasoline sample has enough observations for a large-sample approach and continues with the analysis even though both diagnostic p-values are below 0.05.

**Qualification [Teaching extension]:** A moderately large sample helps the sampling distribution of means become more nearly normal under suitable conditions; it **does not make the underlying observations normal**. The significant gasoline normality diagnostics and identified outliers deserve further examination. Whether a sample of 36 is “large enough” for a reliable specific approximation depends on the actual data distribution and other conditions; it is not an absolute threshold.

### 17.6 Box's M-test result

**[Lecture: pp. 9–10]**

The lecture executes:

```r
library(heplots)
boxM(data[, 1:3], data[, 4])
```

It reports:

```text
Box's M-test for Homogeneity of Covariance Matrices
Chi-Sq (approx.) = 30.544
Df = 6
p-value = 3.097e-05
```

Because \(0.00003097<0.05\), the test **rejects equal covariance matrices**. The lecture then explicitly says that it will **assume the covariance matrices are nearly equal anyway** and perform the pooled Hotelling test as a simplifying demonstration.

This needs a careful distinction: the result is **evidence against** the conventional equal-covariance assumption, not support for it. The subsequent pooled-test p-value is therefore **conditional on a potentially questionable assumption**. The significant normality diagnostics also complicate reliance on Box's M itself.

The lecture additionally shows two alternative ways to call Box's M:

```r
# Formula interface, if column names are V1 through V4
boxM(cbind(V1, V2, V3) ~ V4, data = data)

# Model interface
mod <- lm(cbind(V1, V2, V3) ~ V4, data = data)
boxM(mod)
```

The `cbind()` function puts several responses into one multivariate response matrix. In a formula `responses ~ V4`, the `~` separates the outcome(s) from the grouping predictor.

### 17.7 Hotelling's two-sample result

**[Lecture: p. 10]**

The R analysis used in the lecture is:

```r
library(ICSNP)
HotellingsT2(data[1:36, 1:3],
             data[-c(1:36), 1:3],
             test = "chi")
```

R indexing explained:

- `data[1:36, 1:3]`: the first 36 rows and the first 3 numeric columns.
- `data[-c(1:36), 1:3]`: all rows **except** 1 through 36, and the first 3 columns.
- `test = "chi"`: the chi-square approximation chosen by the lecturer.

The reported result is:

```text
Hotellings two sample T2-test
T.2 = 50.913, df = 3, p-value = 5.106e-11
```

Interpreting scientific notation:

\[
5.106\mathrm e{-11}=5.106\times10^{-11}
=0.00000000005106.
\]

This is far below \(\alpha=0.01\). The lecture **rejects the equal-mean-vectors null** and concludes that the mean cost vectors differ between the sampled truck types. The reported chi-square tail probability can be independently checked as \(P(\chi^2_3\ge50.913)\approx5.105\times10^{-11}\), agreeing with the displayed rounded result.

**Full, appropriately qualified interpretation:** Under the testing approximation and assumptions used for this illustrative analysis, the data give strong evidence of a **difference in the joint average profile of fuel, repair, and capital costs** between gasoline and diesel trucks. Because the covariance equality diagnostic rejected, the gasoline normality diagnostics rejected, and outliers were present, the model-based strength of this conclusion must be assessed through sensitivity checks or more suitable methods. The source does **not** provide enough information to verify a robust alternative analysis or quantify exactly how the conclusion changes when outliers are removed.

### 17.8 The lecturer's “your turn”: remove observations 9 and 21

**[Lecture: p. 7, part (b); teaching extension supplies a reproducible protocol rather than fabricated results]**

A thoughtful sensitivity analysis answers two questions:

1. Are the *results* driven by observations 9 and 21?
2. Is there a legitimate reason to exclude those observations, or are they true but extreme trucks?

The code below will work **once the actual `T6-10.dat` is available**. It uses the grouping labels instead of fixed group boundaries and does not invent any replacement numerical output.

```r
trucks <- read.table("datasets/T6-10.dat")
names(trucks) <- c("fuel", "repair", "capital", "type")
trucks$type <- factor(trucks$type)

# Preserve row order within the gasoline subgroup.
gas <- trucks[trucks$type == "gasoline", c("fuel", "repair", "capital")]
diesel <- trucks[trucks$type == "diesel", c("fuel", "repair", "capital")]

stopifnot(nrow(gas) == 36, nrow(diesel) == 23)

# The lecturer's original analysis.
ICSNP::HotellingsT2(gas, diesel, test = "chi")

# Remove ORIGINAL gasoline subgroup rows 9 and 21.
gas_without_outliers <- gas[-c(9, 21), , drop = FALSE]
stopifnot(nrow(gas_without_outliers) == 34)

# Reassess the same working analysis after exclusions.
ICSNP::HotellingsT2(gas_without_outliers, diesel, test = "chi")

# Reassess covariance homogeneity using the retained data.
reduced <- rbind(
  data.frame(gas_without_outliers, type = "gasoline"),
  data.frame(diesel, type = "diesel")
)
heplots::boxM(reduced[, 1:3], factor(reduced$type))
```

For a report, compare **before and after**: \(n_1\), group means, covariance matrices, Box's M, Hotelling statistic, p-value, and substantive conclusions. Whether any result crosses 0.01 is something the real data must establish. Do **not** assume the conclusion will change, and do not silently remove observations merely to obtain a desired p-value.

### 17.9 Why unequal covariance is a separate problem

**[Lecture: p. 7]**

The lecture explicitly omits the two-sample situation with \(\boldsymbol\Sigma_1\ne\boldsymbol\Sigma_2\), referring to it as the **multivariate Behrens–Fisher problem**. This is not a missing hidden example. It is a declared boundary of the class treatment.

**[Teaching extension]** When unequal covariance is plausible, a more defensible analysis may require an unequal-covariance multivariate test, resampling or robust methods, or another approach suited to the design. These are not numerically developed in the 16-page lecture, so no purported lecturer result is given for them here.

---

# Part IV. Comparing three or more multivariate population means: one-way MANOVA

## 18. What changes when there are several groups?

**[Lecture: pp. 10–11, §3]**

The final major part of the lecture extends mean-vector comparisons to \(g\) populations, where \(g\) can be 3, 4, 5, or more. Each unit has \(p\) measured outcomes.

For a business application, imagine comparing branches A, B, and C on:

\[
\mathbf X=
\begin{bmatrix}
\text{customer satisfaction}\\
\text{sales conversion}\\
\text{average delivery speed}
\end{bmatrix}.
\]

Each branch has a **population mean vector**, not just one average. We wish to know whether those vectors are identical:

\[
\boxed{H_0:\boldsymbol\mu_1=\boldsymbol\mu_2
=\cdots=\boldsymbol\mu_g.}
\]

The alternative is

\[
\boxed{H_1:\text{at least two population mean vectors differ}.}
\]

Equivalent wording: at least one group mean vector differs from the others. **Not every group** must differ from every other group, and **not every measured variable** must differ for the null to be false.

The method is called **Multivariate Analysis of Variance (MANOVA)**. Despite the name, the usual research hypothesis is about **mean vectors**. The procedure uses the covariance structure to judge whether group mean profiles differ more than the data's within-group variation would suggest.

### 18.1 ANOVA versus MANOVA

| Feature | One-way ANOVA | One-way MANOVA |
|---|---|---|
| Number of grouping factors | One | One |
| Number of outcome variables | One | Two or more |
| Population mean per group | One number \(\mu_i\) | Vector \(\boldsymbol\mu_i\) |
| Spread representation | One variance \(\sigma^2\) | Covariance matrix \(\boldsymbol\Sigma\) |
| Between/within summary | Sums of squares, scalar | Sum-of-squares-and-cross-products matrices |
| Main test in lecture | F ratio | Wilks' lambda, converted to a reference test |
| Initial conclusion | Whether any means differ | Whether any **mean vectors** differ |

A practical reason to use MANOVA is that different outcomes can be correlated. Another is that the initial research question may be about the **overall multivariate profile**, not separately about each variable.

### 18.2 An essential warning about repeated separate tests

**[Teaching extension]**

Suppose a study tests four outcomes separately at significance level 5%. Even when there are truly no differences, repeated testing gives several chances for a false positive. Under the simplifying assumption that the four tests are independent, the probability of at least one false positive is

\[
1-(1-0.05)^4=1-0.95^4\approx0.1855,
\]

or about **18.55%**. When tests are correlated, this specific number changes, but the general multiple-testing issue remains.

MANOVA can provide a single multivariate omnibus analysis that reflects the outcomes' relationships. It does **not** guarantee better power in every situation, and it does **not** remove the need for multiplicity control if you later test many individual pairs or outcomes.

## 19. Data layout and the four MANOVA assumptions

**[Lecture: p. 11, §3.1]**

The source describes \(g\) separate populations with sample sizes \(n_1,\ldots,n_g\). The total sample size is

\[
\boxed{N=\sum_{i=1}^{g}n_i.}
\]

Each unit in each group has a \(p\times1\) response vector \(\mathbf X_{ij}\). The index \(i\) identifies a group and \(j\) an independent observation within it.

The lecture's assumptions are:

1. **Random sampling:** within each population, observed \(p\)-variate vectors represent that population under the sampling design.
2. **Independence across populations:** the samples taken from different groups are independent. The ordinary model also requires independent units within groups.
3. **Common covariance:** \(\boldsymbol\Sigma_1=\cdots=\boldsymbol\Sigma_g=\boldsymbol\Sigma\).
4. **Multivariate normality:** the response vectors in every population are multivariate normal; for larger samples, some inference can rely on asymptotic arguments.

These are assumptions of the conventional MANOVA model, not conclusions produced by observing a significant MANOVA p-value.

### 19.1 What can go wrong?

- **Dependence:** A customer appearing repeatedly in several branches without a repeated-measures design violates the independent-unit picture.
- **Unequal covariance:** One branch may have far more varied satisfaction and delivery scores, or differently related outcomes, than another.
- **Outliers:** A few unusual multivariate profiles can strongly influence group means and covariance matrices.
- **Non-normality:** Heavy tails or unusual joint distributions can affect exact finite-sample testing.
- **Redundant outcomes:** Perfectly duplicated variables can make the within-group cross-product matrix singular.
- **Group imbalance:** Unequal sample sizes combined with covariance inequality can be especially concerning.

An assumption check is not only a ritual of obtaining p-values. It also involves understanding sampling, inspecting plots, checking for data problems, and evaluating robustness.

### 19.2 “Large enough” has no magic number

**[Teaching extension qualifying Lecture: pp. 11 and 14]**

The lecture says the multivariate normality assumption may be relaxed by appealing to the Central Limit Theorem when sample sizes are large; in the iris example, \(n_i=50\) is treated as adequate for proceeding. This is a practical approximation, not a mathematical statement that every dataset of size 50 is normal.

The multivariate Central Limit Theorem concerns approximate normality of properly scaled **sample mean vectors** under suitable conditions, with dimension and moments controlled. It is not a universal guarantee of exact MANOVA p-values after arbitrary distributional violations or heteroscedasticity.

## 20. The one-way MANOVA model, word by word

**[Lecture: p. 11, §3.2]**

The model is

\[
\boxed{\mathbf X_{ij}=\boldsymbol\mu+
\boldsymbol\alpha_i+\boldsymbol\varepsilon_{ij},
\qquad i=1,\ldots,g,\quad j=1,\ldots,n_i.}
\]

This is a **vector equation**: every term is a \(p\times1\) column vector.

| Symbol | Mathematical meaning | Intuitive meaning |
|---|---|---|
| \(\mathbf X_{ij}\) | Response vector of unit \(j\) in group \(i\) | What this employee/customer/flower actually measured |
| \(\boldsymbol\mu\) | Overall population location vector under the model's parameterization | Baseline multivariate mean |
| \(\boldsymbol\alpha_i\) | Group \(i\)'s treatment or group effect vector | How that group's mean profile differs from the baseline |
| \(\boldsymbol\varepsilon_{ij}\) | Individual error/residual random vector | What is left after accounting for baseline and group effect |
| \(g\) | Number of populations/groups | 3 for three iris species |
| \(n_i\) | Sample size in group \(i\) | 50 for each iris species in the example |
| \(p\) | Number of response dimensions | 4 for the iris measurements |

The source assumes

\[
\boldsymbol\varepsilon_{ij}
\stackrel{\mathrm{ind}}{\sim}N_p(\mathbf0,\boldsymbol\Sigma).
\]

This means residual vectors are independent with zero mean and the **same** covariance matrix \(\boldsymbol\Sigma\) across groups.

### 20.1 Why we need a constraint on the group effects

Without a constraint, we could add an arbitrary vector \(\mathbf c\) to \(\boldsymbol\mu\) and subtract it from every \(\boldsymbol\alpha_i\), leaving the sum unchanged. The representation would not be unique.

The lecture chooses the weighted restriction

\[
\boxed{\sum_{i=1}^{g}n_i\boldsymbol\alpha_i=\mathbf0_p.}
\]

Under this parameterization, the overall \(\boldsymbol\mu\) is the sample-size-weighted population group mean, and

\[
\boldsymbol\alpha_i=\boldsymbol\mu_i-\boldsymbol\mu,
\qquad
\boldsymbol\mu=\frac1N\sum_i n_i\boldsymbol\mu_i.
\]

For a *balanced* design, all \(n_i\) are equal, and the constraint becomes an ordinary unweighted sum-to-zero restriction. The underlying scientific null is unchanged by how you code the effects.

The null and alternative from the lecture are

\[
\boxed{H_0:\boldsymbol\alpha_1=
\boldsymbol\alpha_2=\cdots=\boldsymbol\alpha_g=\mathbf0_p}
\]

versus at least one nonzero effect vector. This is equivalent to equality of all population mean vectors.

### 20.2 Example of a model decomposition

**[Teaching extension]**

For a business with two outcomes, suppose the overall profile is

\[
\boldsymbol\mu=\begin{bmatrix}70\\12\end{bmatrix},
\quad
\boldsymbol\alpha_A=\begin{bmatrix}5\\-2\end{bmatrix},
\quad
\boldsymbol\varepsilon_{A,1}=\begin{bmatrix}3\\1\end{bmatrix}.
\]

Then the observed profile of the first employee in group A is

\[
\mathbf X_{A,1}=
\begin{bmatrix}70\\12\end{bmatrix}
+\begin{bmatrix}5\\-2\end{bmatrix}
+\begin{bmatrix}3\\1\end{bmatrix}
=\boxed{\begin{bmatrix}78\\11\end{bmatrix}}.
\]

The example shows why the three terms mean different things: an overall baseline, a group effect, and an individual deviation.

## 21. Decomposing every observation into interpretable parts

**[Lecture: p. 11; expanded derivation]**

Define:

\[
\bar{\mathbf x}_i=\frac1{n_i}\sum_{j=1}^{n_i}\mathbf x_{ij}
\]

as the mean vector in group \(i\), and

\[
\bar{\mathbf x}=\frac1N\sum_{i=1}^{g}\sum_{j=1}^{n_i}\mathbf x_{ij}
=\frac1N\sum_{i=1}^{g}n_i\bar{\mathbf x}_i
\]

as the overall sample mean vector.

For every observation, write the exact **sample-data identity**:

\[
\boxed{
\mathbf x_{ij}=\bar{\mathbf x}
+(\bar{\mathbf x}_i-\bar{\mathbf x})
+(\mathbf x_{ij}-\bar{\mathbf x}_i).
}
\]

The three terms are:

1. **Overall mean:** \(\bar{\mathbf x}\).
2. **Estimated group effect:** \(\bar{\mathbf x}_i-\bar{\mathbf x}\).
3. **Residual:** \(\mathbf x_{ij}-\bar{\mathbf x}_i\).

This identity is always algebraically true, regardless of normality. To see why, expand the right side:

\[
\bar{\mathbf x}+\bar{\mathbf x}_i-\bar{\mathbf x}
+\mathbf x_{ij}-\bar{\mathbf x}_i
=\mathbf x_{ij}.
\]

The model \(\mathbf X_{ij}=\boldsymbol\mu+\boldsymbol\alpha_i+\boldsymbol\varepsilon_{ij}\) is a **population-level statistical assumption**. The equation in this section is a **finite-data decomposition**, which estimates its components with the observed averages.

## 22. From ANOVA sums of squares to MANOVA matrices

**[Lecture: pp. 11–12, §3.2]**

Recall the one-variable ANOVA identity:

\[
SS_T=SS_B+SS_W.
\]

These are single nonnegative numbers. But with several outcomes, we need to track how each variable varies **and** how pairs of variables co-vary. That means the analogous quantities must be \(p\times p\) matrices.

The lecturer calls them **sum-of-squares-and-cross-products (SSCP) matrices** and writes:

\[
\boxed{\mathbf T=\mathbf B+\mathbf W.}
\]

This is the key structural identity underlying the one-way MANOVA lecture.

### 22.1 The total SSCP matrix \(\mathbf T\)

\[
\boxed{\mathbf T=
\sum_{i=1}^{g}\sum_{j=1}^{n_i}
(\mathbf x_{ij}-\bar{\mathbf x})
(\mathbf x_{ij}-\bar{\mathbf x})^{\mathsf T}.}
\]

This tracks how far every observation lies from the **overall mean vector**. Its diagonal entries are the total sums of squared deviations for individual outcomes; its off-diagonal entries are sums of cross-products between different outcomes.

For \(p=2\), the shape is

\[
\mathbf T=
\begin{bmatrix}
\text{total SS for outcome 1}&\text{total cross-product}\\
\text{total cross-product}&\text{total SS for outcome 2}
\end{bmatrix}.
\]

### 22.2 The between-group SSCP matrix \(\mathbf B\)

\[
\boxed{\mathbf B=
\sum_{i=1}^{g}n_i
(\bar{\mathbf x}_i-\bar{\mathbf x})
(\bar{\mathbf x}_i-\bar{\mathbf x})^{\mathsf T}.}
\]

Here every group mean difference is weighted by its sample size. Large between-group differences increase \(\mathbf B\). In the MANOVA framework, \(\mathbf B\) describes variation **explained by the grouping factor**.

### 22.3 The within-group SSCP matrix \(\mathbf W\)

\[
\boxed{\mathbf W=
\sum_{i=1}^{g}\sum_{j=1}^{n_i}
(\mathbf x_{ij}-\bar{\mathbf x}_i)
(\mathbf x_{ij}-\bar{\mathbf x}_i)^{\mathsf T}.}
\]

Here every observation is compared with its **own group mean**, not the global mean. This measures variation that remains **within** groups after accounting for group-average differences.

Each group has a sample covariance matrix

\[
\mathbf S_i=\frac1{n_i-1}\sum_j
(\mathbf x_{ij}-\bar{\mathbf x}_i)
(\mathbf x_{ij}-\bar{\mathbf x}_i)^{\mathsf T}.
\]

Multiply by \(n_i-1\):

\[
(n_i-1)\mathbf S_i=
\sum_j(\mathbf x_{ij}-\bar{\mathbf x}_i)
(\mathbf x_{ij}-\bar{\mathbf x}_i)^{\mathsf T}.
\]

Add these identities over the groups to get the exact lecture formula on PDF page 12:

\[
\boxed{\mathbf W=(n_1-1)\mathbf S_1+
(n_2-1)\mathbf S_2+\cdots+(n_g-1)\mathbf S_g.}
\]

The pooled within-group covariance is therefore

\[
\boxed{\mathbf S_p=\frac{\mathbf W}{N-g}.}
\]

### 22.4 Why the matrix identity \(\mathbf T=\mathbf B+\mathbf W\) is true

**[Teaching extension: derivation omitted from the short lecture]**

Let

\[
\mathbf a_{ij}=\mathbf x_{ij}-\bar{\mathbf x}_i,
\quad
\mathbf b_i=\bar{\mathbf x}_i-\bar{\mathbf x}.
\]

Then \(\mathbf x_{ij}-\bar{\mathbf x}=\mathbf a_{ij}+\mathbf b_i\). Expanding the outer product gives

\[
(\mathbf a_{ij}+\mathbf b_i)(\mathbf a_{ij}+\mathbf b_i)^{\mathsf T}
=\mathbf a_{ij}\mathbf a_{ij}^{\mathsf T}
+\mathbf b_i\mathbf b_i^{\mathsf T}
+\mathbf a_{ij}\mathbf b_i^{\mathsf T}
+\mathbf b_i\mathbf a_{ij}^{\mathsf T}.
\]

Sum over \(j\) within group \(i\). By the definition of a group mean,

\[
\sum_{j=1}^{n_i}\mathbf a_{ij}
=\sum_j(\mathbf x_{ij}-\bar{\mathbf x}_i)
=\mathbf0_p.
\]

Therefore **both cross-term sums vanish**. The remaining terms become:

- \(\sum\mathbf a_{ij}\mathbf a_{ij}^{\mathsf T}\), which is \(\mathbf W\);
- \(\sum_i n_i\mathbf b_i\mathbf b_i^{\mathsf T}\), which is \(\mathbf B\).

Thus \(\mathbf T=\mathbf W+\mathbf B\) follows exactly.

### 22.5 The MANOVA degrees of freedom

**[Lecture: p. 12]**

Let \(N=\sum_i n_i\). The source's MANOVA table is equivalent to:

| Variation source | SSCP matrix | Degrees of freedom |
|---|---|---:|
| Treatment / between groups | \(\mathbf B\) | \(g-1\) |
| Residual / within groups | \(\mathbf W\) | \(N-g\) |
| Total | \(\mathbf T=\mathbf B+\mathbf W\) | \(N-1\) |

The df add:

\[
(g-1)+(N-g)=N-1.
\]

A **degree of freedom** here counts how many independent deviations contribute to each estimated variation component. This is why the within-group denominator is \(N-g\): estimating a separate group mean vector consumes one group-mean degree of freedom per group for each outcome direction.

## 23. Wilks' lambda: the central MANOVA statistic in this lecture

**[Lecture: p. 12, §3.2]**

The source defines

\[
\boxed{\Lambda^*=\frac{|\mathbf W|}{|\mathbf B+\mathbf W|}
=\frac{|\mathbf W|}{|\mathbf T|}.}
\]

This is **Wilks' lambda**, usually written \(\Lambda\). It is different from a covariance matrix itself: lambda is **one scalar statistic** calculated from two SSCP matrices.

### 23.1 What does a determinant measure here?

For a \(2\times2\) positive-definite covariance-type matrix, the determinant is related to the squared area of its associated variation ellipse. In higher dimensions it relates to generalized multivariate volume. Wilks' lambda compares **within-group** generalized variation with **total** generalized variation, using determinants rather than a simple scalar sum-of-squares ratio.

Do **not** interpret \(\Lambda\) as literally “the percentage of total variance unexplained” in every multivariate problem. The ratio of determinants is not equal to the ratio of the traces of the matrices, and a determinant aggregates directions multiplicatively.

### 23.2 How to interpret a lambda value

Under the conventional full-rank setting, \(0<\Lambda\le1\).

- \(\Lambda\) near **1**: the between-group SSCP adds relatively little generalized variation compared with within-group variation.
- \(\Lambda\) near **0**: the group effect introduces substantial generalized separation relative to within-group spread.
- A **small** observed lambda is evidence against the null of equal mean vectors, once assessed using its reference distribution.

The lecture states explicitly: **reject \(H_0\) if \(\Lambda^*\) is sufficiently small**.

But is \(\Lambda=0.2\) always significant? **No.** Its meaning depends on the number of groups, number of outcomes, sample sizes, and reference distribution. We need a p-value or critical-value calculation.

### 23.3 Why the test is one-sided even though the hypothesis is not directional

The scientific alternative is non-directional: group mean vectors may differ in *any* direction. However, the Wilks statistic decreases with stronger evidence of such group separation. Thus, its rejection region is at the **small-lambda** end. When transformed to an F statistic, the corresponding rejection region is at the **large-F** end.

### 23.4 Connections to discriminant directions

**[Teaching extension]**

When \(\mathbf W\) is invertible, consider the eigenvalues \(\lambda_1,\ldots,\lambda_s\) of the matrix \(\mathbf W^{-1}\mathbf B\) in its nonzero effect directions, with \(s\le\min(p,g-1)\). Then

\[
\boxed{\Lambda=\prod_{r=1}^{s}\frac1{1+\lambda_r}.}
\]

This helps explain why Wilks' lambda responds to multiple outcome combinations rather than to a separate test on each column. It also anticipates the **linear discriminant** directions in the iris example, which seek directions of large between-group separation relative to within-group spread.

### 23.5 How does lambda become a p-value?

The lecture says that the reference distribution of Wilks' lambda can be handled using an F transformation or approximation, and that a chi-square approximation is available in large-sample settings (p. 12). It does **not** give one general conversion formula for every choice of \(p\), \(g\), and \(N\).

Depending on the design and dimensions, exact transformations exist for particular settings and approximate transformations are used elsewhere. The R `summary.manova()` output provides the relevant **approximate F, numerator df, denominator df, and p-value**. The iris analysis later in this book checks the exact numbers reported in the source.

For conceptual orientation, the connection to a two-sample multivariate test is especially close: **when there are only two groups, the one-way MANOVA omnibus null is the same mean-vector equality null as a pooled two-sample Hotelling test** under the corresponding model.

## 24. A full MANOVA worked example with two outcomes and three groups

**[Teaching extension. All nine observations are invented solely for illustrating calculations, not taken from Lec8.pdf.]**

Imagine comparing three customer-service units on two performance scores \(X_1,X_2\). Each group has three independent observations:

| Group | Unit | \(X_1\) | \(X_2\) |
|---|---:|---:|---:|
| A | 1 | 3 | 5 |
| A | 2 | 4 | 7 |
| A | 3 | 5 | 6 |
| B | 1 | 6 | 7 |
| B | 2 | 7 | 9 |
| B | 3 | 8 | 8 |
| C | 1 | 9 | 6 |
| C | 2 | 10 | 8 |
| C | 3 | 11 | 7 |

The sample is artificially regular so the arithmetic is easy to audit. Here \(g=3\), \(p=2\), and \(N=9\).

### Step 1. Compute group means and overall mean

\[
\bar{\mathbf x}_A=\begin{bmatrix}4\\6\end{bmatrix},\quad
\bar{\mathbf x}_B=\begin{bmatrix}7\\8\end{bmatrix},\quad
\bar{\mathbf x}_C=\begin{bmatrix}10\\7\end{bmatrix}.
\]

Because the groups have equal sizes,

\[
\bar{\mathbf x}=\frac13
\left(\begin{bmatrix}4\\6\end{bmatrix}
+\begin{bmatrix}7\\8\end{bmatrix}
+\begin{bmatrix}10\\7\end{bmatrix}\right)
=\boxed{\begin{bmatrix}7\\7\end{bmatrix}}.
\]

### Step 2. Work out the within-group residuals

For group A:

\[
\begin{aligned}
\mathbf x_{A1}-\bar{\mathbf x}_A&=\begin{bmatrix}3-4\\5-6\end{bmatrix}=\begin{bmatrix}-1\\-1\end{bmatrix},\\
\mathbf x_{A2}-\bar{\mathbf x}_A&=\begin{bmatrix}0\\1\end{bmatrix},\\
\mathbf x_{A3}-\bar{\mathbf x}_A&=\begin{bmatrix}1\\0\end{bmatrix}.
\end{aligned}
\]

Groups B and C have the **same within-group residual patterns** in this deliberately constructed example.

### Step 3. Compute one group's within-group SSCP

For group A,

\[
\mathbf W_A=
\begin{bmatrix}-1\\-1\end{bmatrix}
\begin{bmatrix}-1&-1\end{bmatrix}
+
\begin{bmatrix}0\\1\end{bmatrix}
\begin{bmatrix}0&1\end{bmatrix}
+
\begin{bmatrix}1\\0\end{bmatrix}
\begin{bmatrix}1&0\end{bmatrix}.
\]

Compute each outer product:

\[
\begin{bmatrix}1&1\\1&1\end{bmatrix}
+\begin{bmatrix}0&0\\0&1\end{bmatrix}
+\begin{bmatrix}1&0\\0&0\end{bmatrix}
=\boxed{\begin{bmatrix}2&1\\1&2\end{bmatrix}}.
\]

Since all three groups have the same pattern,

\[
\boxed{\mathbf W=3\mathbf W_A=
\begin{bmatrix}6&3\\3&6\end{bmatrix}.}
\]

The corresponding pooled within-group covariance is

\[
\mathbf S_p=\frac{\mathbf W}{N-g}=
\frac16\begin{bmatrix}6&3\\3&6\end{bmatrix}
=\begin{bmatrix}1&0.5\\0.5&1\end{bmatrix}.
\]

### Step 4. Compute the between-group SSCP matrix

The group mean deviations from the overall mean are:

\[
\mathbf d_A=\begin{bmatrix}-3\\-1\end{bmatrix},\quad
\mathbf d_B=\begin{bmatrix}0\\1\end{bmatrix},\quad
\mathbf d_C=\begin{bmatrix}3\\0\end{bmatrix}.
\]

Each group contributes \(n_i=3\) times its outer product:

\[
\mathbf B=3\left[
\begin{bmatrix}-3\\-1\end{bmatrix}
\begin{bmatrix}-3&-1\end{bmatrix}
+
\begin{bmatrix}0\\1\end{bmatrix}
\begin{bmatrix}0&1\end{bmatrix}
+
\begin{bmatrix}3\\0\end{bmatrix}
\begin{bmatrix}3&0\end{bmatrix}
\right].
\]

So

\[
\mathbf B=3\left[
\begin{bmatrix}9&3\\3&1\end{bmatrix}
+\begin{bmatrix}0&0\\0&1\end{bmatrix}
+\begin{bmatrix}9&0\\0&0\end{bmatrix}
\right]
=3\begin{bmatrix}18&3\\3&2\end{bmatrix}.
\]

Therefore

\[
\boxed{\mathbf B=\begin{bmatrix}54&9\\9&6\end{bmatrix}.}
\]

### Step 5. Verify total SSCP

\[
\boxed{\mathbf T=\mathbf B+\mathbf W
=\begin{bmatrix}54&9\\9&6\end{bmatrix}
+\begin{bmatrix}6&3\\3&6\end{bmatrix}
=\begin{bmatrix}60&12\\12&12\end{bmatrix}.}
\]

For the **first outcome** alone, total SS is \(T_{11}=60\), between-group SS is \(B_{11}=54\), and within-group SS is \(W_{11}=6\), exactly the familiar one-variable identity \(60=54+6\). The matrix version also performs the bookkeeping for cross-products and for the second outcome.

### Step 6. Compute Wilks' lambda

\[
|\mathbf W|=6(6)-3(3)=36-9=27.
\]

\[
|\mathbf T|=60(12)-12(12)=720-144=576.
\]

Consequently,

\[
\boxed{\Lambda=\frac{|\mathbf W|}{|\mathbf T|}
=\frac{27}{576}=0.046875.}
\]

This lambda is quite small, suggesting a sizable between-group contribution relative to within-group dispersion.

### Step 7. Conduct the inferential test

For these dimensions \(p=2\), \(g=3\), and \(N=9\), the standard Rao F transformation for Wilks' lambda gives approximately

\[
F\approx9.0470,\quad df_1=4,\quad df_2=10,
\]

with p-value approximately \(0.00234\). At a 5% significance level the example rejects equality of the three population mean vectors **under its conventional MANOVA model assumptions**.

The numerical result is illustrative, not evidence about real customer-service units. A real study with only three observations per group would require especially cautious assumption assessment. In the next example, the lecturer uses 50 flowers per species rather than this deliberately tiny sample.

### Step 8. Verify the matrices in R

```r
toy <- data.frame(
  group = factor(rep(c("A", "B", "C"), each = 3)),
  X1 = c(3, 4, 5, 6, 7, 8, 9, 10, 11),
  X2 = c(5, 7, 6, 7, 9, 8, 6, 8, 7)
)

X <- as.matrix(toy[, c("X1", "X2")])
groups <- levels(toy$group)
grand_mean <- colMeans(X)
W <- matrix(0, nrow = 2, ncol = 2)
B <- matrix(0, nrow = 2, ncol = 2)

for (gr in groups) {
  Xi <- X[toy$group == gr, , drop = FALSE]
  group_mean <- colMeans(Xi)
  residual <- sweep(Xi, 2, group_mean, "-")
  deviation <- group_mean - grand_mean
  W <- W + crossprod(residual)
  B <- B + nrow(Xi) * tcrossprod(deviation)
}

Tmat <- W + B
lambda <- det(W) / det(Tmat)

print(W)           # 6 3 / 3 6
print(B)           # 54 9 / 9 6
print(Tmat)        # 60 12 / 12 12
print(lambda)      # 0.046875
print(all.equal(Tmat, (nrow(X) - 1) * cov(X)))

fit_toy <- manova(cbind(X1, X2) ~ group, data = toy)
summary(fit_toy, test = "Wilks")
```

The functions `crossprod(residual)` and `tcrossprod(deviation)` create the required cross-product matrices. The `sweep()` call subtracts the two group means column by column. Note that **the matrix called `Tmat` is the total SSCP**, not Hotelling's \(T^2\); despite the shared letter, they are different objects.

---

# Part V. The lecture's iris MANOVA and discriminant analysis

## 25. The iris dataset and the question of three mean vectors

**[Lecture: pp. 13–16, §3.4 and §3.5]**

The lecture's final worked example compares **three iris species** on **four floral measurements**. The source loads `T11-5.dat`, a 150-row table whose displayed rows correspond to the familiar iris dataset:

| Source field | Measurement | Type |
|---|---|---|
| `V1` | Sepal length | Numeric response |
| `V2` | Sepal width | Numeric response |
| `V3` | Petal length | Numeric response |
| `V4` | Petal width | Numeric response |
| `V5` | Species code 1, 2, or 3 | Categorical grouping factor |

The group sizes are \(n_1=n_2=n_3=50\), hence

\[
N=150,\qquad g=3,\qquad p=4.
\]

The lecture presents the groups numerically as species **1, 2, 3**. In the standard iris dataset these codes correspond in order to setosa, versicolor, and virginica, but the lecture's computations and printed conclusions label them by number.

Define each mean vector as

\[
\boldsymbol\mu_i=
\begin{bmatrix}
\mu_{i,\mathrm{sepalLength}}\\
\mu_{i,\mathrm{sepalWidth}}\\
\mu_{i,\mathrm{petalLength}}\\
\mu_{i,\mathrm{petalWidth}}
\end{bmatrix}.
\]

Test

\[
H_0:\boldsymbol\mu_1=\boldsymbol\mu_2=\boldsymbol\mu_3,
\]

against the alternative that at least two four-dimensional mean vectors differ.

### 25.1 The original R import steps

**[Lecture: pp. 13–14]**

```r
data <- read.table("datasets/T11-5.dat")
head(data)
tail(data)
str(data)
data$V5 <- as.factor(data$V5)
str(data)
```

`head()` checks early rows; `tail()` checks the final rows; `str()` checks the data structure. The `as.factor()` call is critical because species codes 1, 2, 3 represent **categories** rather than a numeric predictor with a presumed linear trend.

### 25.2 A self-contained replacement using standard R data

**[Teaching extension, designed to reproduce the source's reported conventional iris statistics without assuming possession of `T11-5.dat`]**

R includes the standard `iris` dataset. Its 150 observations and four floral measurements reproduce the reported Wilks' lambda from the supplied lecture:

```r
data(iris)

data <- data.frame(
  V1 = iris$Sepal.Length,
  V2 = iris$Sepal.Width,
  V3 = iris$Petal.Length,
  V4 = iris$Petal.Width,
  V5 = factor(as.integer(iris$Species))
)

stopifnot(nrow(data) == 150,
          identical(as.integer(table(data$V5)), c(50L, 50L, 50L)))

head(data)
tail(data)
str(data)
```

This is a separate convenience for a self-contained lesson, not a claim that the lecturer ran the built-in data command. If you have the exact supplied `.dat` file, it remains the primary source for reproducing the lecture's own workflow.

## 26. Checking the iris assumptions

**[Lecture: pp. 13–14, §3.4]**

### 26.1 Multivariate normality

The lecture observes that each iris group contains 50 flowers and proceeds using a large-sample normality approximation. It does **not** print skewness or kurtosis test results for the iris groups, so none are invented here.

This does not establish exact multivariate normality. A stronger analysis would inspect each group's multivariate spread, possible unusual values, and the overall shape of the distribution.

### 26.2 The reported Box's M-test

The lecturer runs:

```r
library(heplots)
boxM(data[, 1:4], data[, 5])
```

The reported output on PDF page 14 is:

```text
Box's M-test for Homogeneity of Covariance Matrices
Chi-Sq (approx.) = 140.94
Df = 20
p-value < 2.2e-16
```

Remember that `2.2e-16` means \(2.2\times10^{-16}\). R sometimes prints results in this form because very small values are displayed below a reporting threshold. The printed inequality is **not** an assertion that the probability is precisely zero.

Since the reported p-value is far below 0.05, the equal-covariance null is **rejected**. This indicates serious evidence that the three population covariance matrices are not all identical, subject to the assumptions of Box's M itself.

The source then says, in effect, “nevertheless, assume the covariance matrices are nearly equal,” and proceeds with standard MANOVA. This is a **teaching simplification despite a failed assumption check**, not an inference supported by the Box's M-test. Our account of the MANOVA result must therefore remain conditional on the model being used.

### 26.3 Check the stated Box's M degrees of freedom

For \(g=3\) groups and \(p=4\) variables:

\[
df_M=\frac{(g-1)p(p+1)}2
=\frac{(3-1)(4)(5)}2
=\boxed{20}.
\]

This matches the source output.

### 26.4 Independently reconstruct Box's M chi-square

**[Teaching extension, arithmetic from standard iris data]**

The standard iris covariance calculations yield an uncorrected Box quantity approximately

\[
M\approx146.66325.
\]

Using a conventional small-sample correction factor approximately \(c=0.0390023\),

\[
\chi^2_{\mathrm{Box}}\approx(1-c)M
=(0.9609977)(146.66325)
\approx\boxed{140.94305}.
\]

The corresponding \(\chi^2\) degrees of freedom are 20. This verifies the **140.94** printed in the lecture. The precise computation and how it is approximated are an additional teaching calculation; the original lecture does not show these intermediate values.

## 27. Fit the one-way iris MANOVA

**[Lecture: p. 14, §3.4]**

The source uses:

```r
fit <- manova(cbind(V1, V2, V3, V4) ~ V5, data = data)
summary(fit, test = "Wilks")
```

Break it apart:

- `manova(...)` fits the multivariate analysis-of-variance model.
- `cbind(V1, V2, V3, V4)` combines **four numeric response columns** into one multivariate response matrix.
- `~ V5` indicates that the predictor is iris species.
- `data = data` tells R where to find the referenced columns.
- `summary(fit, test = "Wilks")` requests the omnibus test using **Wilks' lambda**.

### 27.1 Original MANOVA output

The lecturer's output is:

| Source | Model df | Wilks' lambda | Approximate F | Numerator df | Denominator df | p-value |
|---|---:|---:|---:|---:|---:|---|
| `V5` (species) | 2 | **0.023439** | **199.15** | **8** | **288** | **\(<2.2\times10^{-16}\)** |
| Residuals | **147** | | | | | |

All values are from lecture page 14, with spacing cleaned up for readability.

### 27.2 Explain the degrees of freedom before interpreting the result

Here \(g=3\) and \(N=150\), so:

\[
\text{Group-model df}=g-1=2,
\]

\[
\text{Residual df}=N-g=150-3=147,
\]

\[
\text{Total df}=N-1=149.
\]

The **model df 2** is not the same as the **approximate-F numerator df 8**. The latter arises from the multivariate transformation, combining the four outcome dimensions with the two group-contrast dimensions. In this case it equals \(p(g-1)=4(2)=8\). The denominator df 288 arises from the specific transformation used for Wilks' lambda; it is not the raw residual df 147.

### 27.3 Calculate the two SSCP matrices for iris

**[Teaching extension; independently computed from the standard iris observations, for greater mathematical transparency]**

For the standard iris data, the group mean vectors are:

\[
\bar{\mathbf x}_1=
\begin{bmatrix}5.006\\3.428\\1.462\\0.246\end{bmatrix},
\quad
\bar{\mathbf x}_2=
\begin{bmatrix}5.936\\2.770\\4.260\\1.326\end{bmatrix},
\quad
\bar{\mathbf x}_3=
\begin{bmatrix}6.588\\2.974\\5.552\\2.026\end{bmatrix}.
\]

These reflect average physical measurements for each group, in the order sepal length, sepal width, petal length, petal width. They are **not** the later LDA output's standardized group means.

The within-group SSCP is approximately

\[
\boxed{\mathbf W\approx
\begin{bmatrix}
38.9562&13.6300&24.6246&5.6450\\
13.6300&16.9620&8.1208&4.8084\\
24.6246&8.1208&27.2226&6.2718\\
5.6450&4.8084&6.2718&6.1566
\end{bmatrix}.}
\]

The between-group SSCP is approximately

\[
\boxed{\mathbf B\approx
\begin{bmatrix}
63.2121&-19.9527&165.2484&71.2793\\
-19.9527&11.3449&-57.2396&-22.9327\\
165.2484&-57.2396&437.1028&186.7740\\
71.2793&-22.9327&186.7740&80.4133
\end{bmatrix}.}
\]

Their sum \(\mathbf T=\mathbf W+\mathbf B\) is the total SSCP. From unrounded calculations,

\[
|\mathbf W|\approx22096.87726,
\qquad
|\mathbf W+\mathbf B|\approx942754.61690.
\]

So

\[
\boxed{\Lambda\approx
\frac{22096.87726}{942754.61690}
=0.02343863\approx0.023439.}
\]

This independently recovers the lecture's Wilks' lambda. The additional matrices are reconstructions for teaching, not values printed in the original lecture.

### 27.4 Why does R report F = 199.15?

**[Teaching extension; a dimension-specific demonstration of the F transformation]**

The standard Rao F approximation for this particular design uses \(p=4\), \(q=g-1=2\), and residual df \(v=N-g=147\). Its exponent parameter is

\[
t=\sqrt{\frac{p^2q^2-4}{p^2+q^2-5}}
=\sqrt{\frac{4^2(2^2)-4}{4^2+2^2-5}}
=\sqrt{\frac{60}{15}}=2.
\]

For this transformation,

\[
df_1=pq=8,
\]

\[
df_2=t\left(v-\frac{p-q+1}{2}\right)-\frac{pq-2}{2}
=2\left(147-\frac{3}{2}\right)-3
=\boxed{288}.
\]

The transformed statistic is

\[
F\approx\frac{1-\Lambda^{1/t}}{\Lambda^{1/t}}
\frac{df_2}{df_1}.
\]

Plug in the unrounded iris lambda:

\[
F\approx\frac{1-\sqrt{0.02343863}}{\sqrt{0.02343863}}
\left(\frac{288}{8}\right)
\approx\boxed{199.1453},
\]

which R rounds to **199.15**, with numerator and denominator df 8 and 288. This calculation is included to **unpack** the output, not because students must memorize the general Rao approximation. If dimensions change, the transformation details can change; use the appropriate statistical software and reference.

### 27.5 The hypothesis-test conclusion

The lecturer's p-value is less than \(2.2\times10^{-16}\), hence far below 0.05. Under the conventional model, reject

\[
H_0:\boldsymbol\mu_1=\boldsymbol\mu_2=\boldsymbol\mu_3.
\]

We conclude that the **three species do not all have the same population mean vector** across the four measurements. This is a **global** conclusion. It does not, by itself, establish exactly which pairs of species differ, or which individual measurement is responsible.

**Qualification:** Because Box's M very strongly rejects covariance equality in this dataset, the usual pooled-covariance assumptions deserve caution. The conventional MANOVA result is numerically striking, but statistical interpretation must not pretend the assumption check passed. A robust follow-up or sensitivity analysis would strengthen formal inference beyond the lecturer's simplified demonstration.

### 27.6 Reproduce the SSCP and Wilks statistic in base R

```r
# Assumes the self-contained iris 'data' defined in section 25.2.
X <- as.matrix(data[, 1:4])
grand <- colMeans(X)
W <- matrix(0, 4, 4)
B <- matrix(0, 4, 4)

for (sp in levels(data$V5)) {
  Xi <- X[data$V5 == sp, , drop = FALSE]
  mi <- colMeans(Xi)
  residuals_i <- sweep(Xi, 2, mi, "-")
  difference_i <- mi - grand
  W <- W + crossprod(residuals_i)
  B <- B + nrow(Xi) * tcrossprod(difference_i)
}

Tmat <- W + B
lambda_manual <- det(W) / det(Tmat)
print(round(W, 4))
print(round(B, 4))
print(lambda_manual)  # approximately 0.02343863

fit <- manova(cbind(V1, V2, V3, V4) ~ V5, data = data)
summary(fit, test = "Wilks")

# Direct check using unrounded lambda for iris's dimensions.
p <- 4; q <- 2; v <- 147
t_parameter <- sqrt((p^2*q^2 - 4) / (p^2 + q^2 - 5))
df1 <- p * q
df2 <- t_parameter * (v - (p - q + 1)/2) - (p*q - 2)/2
F_approx <- ((1 - lambda_manual^(1/t_parameter)) /
             lambda_manual^(1/t_parameter)) * (df2 / df1)
print(c(F_approx = F_approx, df1 = df1, df2 = df2))
```

For serious computation, use the package's test output rather than manually programming approximations for new designs without checking their validity.

## 28. After a significant MANOVA: what exactly differs?

**[Lecture: p. 14, §3.5]**

The lecturer observes a limitation of the omnibus MANOVA:

> A significant overall test shows that mean vectors differ **somewhere**, but does not identify the specific pairs of species that differ.

This is a crucial distinction. A global test evaluates

\[
H_0:\boldsymbol\mu_1=\boldsymbol\mu_2=\boldsymbol\mu_3.
\]

The hypothesis might be false because group 1 differs from the other two, because group 3 differs from the others, or because several pairs differ in different ways. The global p-value does not automatically answer **which pair** differs.

The source calls its next section **“Post-hoc analysis”** and uses **Linear Discriminant Analysis (LDA)** to examine how species separate visually. LDA is a valuable method for interpreting multivariate group structure. However, as explained in §30 below, an LDA scatterplot is **not by itself a formal adjusted pairwise hypothesis test**.

### 28.1 Why not just perform four ANOVAs and stop?

The lecture says ordinary separate ANOVAs on each of the four measurements ignore the combined covariance and relationships among the outcome variables. That is true as a statement about what univariate ANOVAs use.

**[Teaching extension]** Univariate analyses may still be useful as *carefully planned follow-ups* if the goal is to explain individual measurements. They should not be casually treated as a substitute for the original multivariate question, and their multiplicity and assumptions must be addressed. “Suboptimal” does not mean every univariate analysis is forbidden; it means those analyses answer **different, narrower questions** and may omit important joint information.

## 29. What is Linear Discriminant Analysis?

**[Lecture: p. 15, §3.5, developed from the beginning]**

LDA seeks **linear combinations** of the original features that separate known groups as well as possible relative to within-group variation.

A *linear combination* of four flower measurements can be written as

\[
Z=a_1X_1+a_2X_2+a_3X_3+a_4X_4.
\]

The numbers \(a_1,\ldots,a_4\) are **coefficients** or weights. Each flower's four measurements produce a single score \(Z\) when inserted into the formula.

For instance, the made-up combination

\[
Z=2X_1-X_2+0.5X_3-X_4
\]

takes four measurements and produces one number. Those illustrative weights are not the lecturer's LDA weights.

LDA finds coefficients so that groups are comparatively **far apart** on the resulting scores, while individual members of the same group are comparatively **close together**.

The conceptual target is the ratio

\[
\frac{\text{between-group separation along a direction}}
{\text{within-group variation along that direction}}.
\]

This resembles ANOVA's between/within idea, but now the direction through the outcome space is itself chosen from the data.

### 29.1 Why can the iris example have two discriminant axes?

With \(g\) groups and \(p\) original outcomes, conventional LDA can provide at most

\[
\boxed{\min(p,g-1)}
\]

nontrivial discriminant dimensions. Here:

\[
\min(4,3-1)=\boxed{2}.
\]

So the lecturer plots **LD1** and **LD2**, two discriminant scores, rather than attempting four independent discriminant axes.

### 29.2 LDA versus PCA

**[Teaching extension connecting concepts commonly confused in multivariate analysis]**

| Question | PCA | LDA |
|---|---|---|
| Does it use group labels to choose its directions? | No | Yes |
| Its main mathematical goal | Capture overall variation in the data | Separate known groups relative to within-group variation |
| Can it emphasize a large direction unrelated to group identity? | Yes | Its objective focuses on group distinction |
| Maximum useful directions | At most the rank of centered predictor data | At most \(\min(p,g-1)\) |
| Common uses | Dimension reduction and visualization | Classification and supervised group visualization |

A direction with lots of overall variance is not necessarily a direction that best distinguishes flower species. PCA and LDA therefore answer different questions.

### 29.3 Why the lecture standardizes the four iris variables

The source fits LDA using `scale(cbind(V1, V2, V3, V4))`, which centers and standardizes each predictor using its sample mean and standard deviation.

For an individual variable,

\[
\boxed{z_{ij}=\frac{x_{ij}-\bar x_j}{s_j}.}
\]

Here \(x_{ij}\) is person/flower \(i\)'s measurement on variable \(j\); \(\bar x_j\) and \(s_j\) are the mean and standard deviation calculated for variable \(j\) over the dataset.

A standardized score of \(+1\) means one observed standard deviation above the overall sample mean; \(-1\) means one below. Standardization makes the displayed coefficients and group means refer to scaled units, not raw centimeters.

**Important detail:** In a full-rank LDA calculation, consistently applying a nonsingular linear rescaling of all predictors does not manufacture group separation; coefficient numbers change to compensate for the changed units. Standardization remains useful for the interpretability of scales and for workflows involving numerical or regularization choices. Do not assume it is a universal cure for violations of LDA's covariance assumptions.

## 30. Understand the lecturer's LDA output line by line

**[Lecture: p. 15, §3.5]**

The source's main call is:

```r
library(MASS)
post_hoc <- lda(V5 ~ scale(cbind(V1, V2, V3, V4)), data = data)
post_hoc
```

This is the original code, typeset with the spaces in the scanned text corrected. `MASS` is the package supplying `lda()`. The response to the left of `~` is the species group; the predictors to the right are the four scaled floral measurements.

### 30.1 Prior probabilities

The source displays:

| Species | Prior probability |
|---:|---:|
| 1 | 0.3333333 |
| 2 | 0.3333333 |
| 3 | 0.3333333 |

A **prior probability** is the assumed class probability used by the discriminant classifier before observing an individual flower's predictors. With 50 flowers in each of three groups, the sample proportions are each 50/150 = 1/3, which explains the equal priors in the output.

Do not confuse these priors with the p-value of a mean-vector test. **They are entirely different quantities.**

### 30.2 Standardized group means

The lecturer's LDA output gives the **means of standardized predictors within each species**:

| Species | Scaled V1 | Scaled V2 | Scaled V3 | Scaled V4 |
|---:|---:|---:|---:|---:|
| 1 | -1.0111914 | 0.8504137 | -1.3006301 | -1.2507035 |
| 2 | 0.1119073 | -0.6592236 | 0.2843712 | 0.1661774 |
| 3 | 0.8992841 | -0.1911901 | 1.0162589 | 1.0845261 |

These values are reproduced from **PDF page 15**. For example, species 1's mean standardized sepal width (V2) is about +0.8504, while its mean standardized petal length (V3) is about -1.3006. They describe where each group lies relative to the overall data center for each measurement.

They are **not the same as** the original physical group means in §27.3. For instance, the first group's average sepal length in original units is approximately 5.006, while the standardized first-group sepal-length mean is approximately -1.0112. Both can be correct because they use different measurement scales.

### 30.3 Coefficients of linear discriminants

The source reports:

| Feature | LD1 coefficient | LD2 coefficient |
|---|---:|---:|
| V1: Sepal length | 0.6867795 | -0.01995817 |
| V2: Sepal width | 0.6688251 | -0.94344183 |
| V3: Petal length | -3.8857950 | 1.64511887 |
| V4: Petal width | -2.1422387 | -2.16413593 |

The first linear discriminant, expressed in the standardized variables \(z_1,\ldots,z_4\), is approximately

\[
\boxed{
LD1=0.6867795z_1+0.6688251z_2
-3.8857950z_3-2.1422387z_4.
}
\]

The second is approximately

\[
\boxed{
LD2=-0.01995817z_1-0.94344183z_2
+1.64511887z_3-2.16413593z_4.
}
\]

These are scoring directions learned from the whole dataset. Once the model has been fitted, R computes each individual flower's position on the two axes using the fitted transformation and centering conventions. For practical use, **call `predict(post_hoc)$x`** rather than manually trying to reproduce all implementation details from rounded coefficients.

A **large coefficient magnitude** does not by itself prove that a variable is statistically significant, causally influential, or uniquely important. Coefficient interpretation must consider covariance among predictors, scaling, and the fact that discriminant directions may be multiplied by \(-1\) without changing group separation.

### 30.4 Proportion of trace

The lecturer reports:

| Direction | Proportion of trace |
|---|---:|
| LD1 | **0.9912** |
| LD2 | **0.0088** |
| Total | **1.0000** |

In this LDA output, these are the proportions of the **discriminant separation measure** associated with the two discriminant axes. About **99.12%** of that quantity is associated with LD1, versus **0.88%** with LD2.

**This is not a claim that LD1 explains 99.12% of the total raw variance in flower measurements**, nor that 99.12% of species classifications are correct. It is also not the percentage of statistical significance. The wording *proportion of trace* belongs to the supervised discriminant analysis output.

### 30.5 Plotting the discriminants in R

The lecture predicts the two scores for all 150 flowers and draws a two-dimensional plot:

```r
library(ggplot2)
plot_lda <- data.frame(data$V5, lda = predict(post_hoc)$x)

ggplot(plot_lda) +
  geom_point(aes(x = lda.LD1,
                 y = lda.LD2,
                 colour = data.V5), size = 2)
```

The source uses an equivalent mapping to `data$V5` in the aesthetic call. The key ideas are:

- `predict(post_hoc)$x` returns each flower's **LD1 and LD2 scores**.
- `data.frame(...)` puts the group label and two scores in one table.
- `ggplot()` initializes the plotting object.
- `geom_point()` draws one dot per flower.
- `aes(x = ..., y = ..., colour = ...)` maps the two scores to axes and species to point color.

For a beginner, the following version may be easier to understand and maintain because it gives the plotted columns simple names:

```r
library(MASS)
library(ggplot2)

# Uses the self-contained 'data' from section 25.2.
scaled_predictors <- as.data.frame(scale(data[, 1:4]))
names(scaled_predictors) <- c("V1", "V2", "V3", "V4")
scaled_predictors$species <- data$V5

lda_fit <- lda(species ~ ., data = scaled_predictors)
print(lda_fit)

scores <- as.data.frame(predict(lda_fit)$x)
plot_data <- data.frame(species = scaled_predictors$species,
                        LD1 = scores$LD1,
                        LD2 = scores$LD2)

ggplot(plot_data, aes(x = LD1, y = LD2, colour = species)) +
  geom_point(size = 2) +
  labs(x = "First linear discriminant (LD1)",
       y = "Second linear discriminant (LD2)",
       colour = "Iris species",
       title = "Iris species on the two discriminant axes") +
  theme_minimal()
```

This alternative R code is a **teaching rewrite**, not a claim about the exact commands printed by the lecturer. Coefficients or axis signs may differ under different coding or conventions while preserving the essential separation.

## 31. How to read the scatterplot on the final PDF page

**[Lecture: p. 16, the plotted output of §3.5]**

The source's last page is not blank: it contains the **LD1-versus-LD2 iris scatterplot**. It shows three colored point clouds, with the legend using numerical group codes:

- **Group 1:** the separated cloud on the **right** in the source's chosen LD1 orientation, displayed red/pink.
- **Group 2:** the more central cloud, displayed green.
- **Group 3:** the cloud on the **left**, displayed blue.

The vertical axis is LD2. It provides additional separation, but the source's `Proportion of trace` result shows that **LD1 captures almost all the fitted discriminant separation measure** in this example.

The strongest visible feature is that **group 1 is clearly separated from groups 2 and 3** along the first discriminant axis. Groups 2 and 3 overlap more in the plot, so they appear more similar in the displayed two-dimensional projection.

**Three interpretation safeguards:**

1. The positive-versus-negative sign of an LDA axis is arbitrary; a mathematically equivalent fitted solution could flip the plot left-to-right. The meaningful feature is relative separation, not the fact that group 1 happens to be on the right.
2. Some overlap on a scatterplot does not prove that two population mean vectors are equal. Two groups can overlap and still differ significantly.
3. Clear plotted separation does not, by itself, provide a **pairwise p-value** or a confidence interval for the difference between two groups.

The lecturer's conclusion on p. 15 is that group 1 is noticeably distinct from groups 2 and 3 and is a major contributor to the observed species separation. **As a visual, descriptive interpretation, the scatterplot supports that idea.** The lecturer also uses the phrase “significantly different” for pairwise groups at this stage; **strictly inferentially**, the LDA plot alone does not establish that pairwise significance claim. A formal pairwise testing procedure would be needed.

## 32. Formal follow-up testing versus LDA visualization

**[Teaching extension, correcting an easily misunderstood use of “post-hoc” on lecture pp. 14–15]**

There are at least three different follow-up questions after MANOVA:

| Follow-up question | Suitable analysis type | What it can establish |
|---|---|---|
| “How do the groups separate jointly?” | LDA directions and visualization | Patterns and directions of multivariate separation |
| “Exactly which pairs of group mean vectors differ?” | Pairwise multivariate tests, with appropriate adjustment | Pairwise inferential conclusions under each test's assumptions |
| “Which individual outcome means differ?” | Outcome-specific contrasts, with multiplicity control and uncertainty intervals | Differences in particular measurements |

LDA is not the same as a formal pairwise significance test. Its role in the lecture is **interpretive visualization** after the omnibus MANOVA.

### 32.1 Pairwise multivariate hypotheses

For three groups, the pairwise questions are:

\[
\begin{aligned}
H_{0,12}:&\ \boldsymbol\mu_1=\boldsymbol\mu_2,\\
H_{0,13}:&\ \boldsymbol\mu_1=\boldsymbol\mu_3,\\
H_{0,23}:&\ \boldsymbol\mu_2=\boldsymbol\mu_3.
\end{aligned}
\]

Each comparison is a separate inferential question, unlike the one global null. A researcher could perform valid prespecified pairwise multivariate procedures under an appropriate model and adjust their p-values to address **multiple comparisons**.

### 32.2 Why multiplicity adjustment matters

Three unadjusted pairwise tests each at 0.05 do not collectively guarantee a family-wise false-positive rate of 0.05. A simple **Bonferroni** adjustment would compare each pairwise p-value with \(0.05/3\approx0.01667\). A common alternative is **Holm's method**, which orders p-values and provides family-wise error control under broad dependence structures.

The adjustment does not repair violated covariance or independence assumptions. It solves the *multiple testing* issue, not every model-validity issue.

### 32.3 An R outline for pairwise tests

The following is intentionally labelled as a **conditional teaching illustration**, not an endorsed final analysis of the iris data, because the supplied iris Box's M result shows strong evidence against homogeneous covariances.

```r
# Illustration only: conventional pairwise pooled-covariance tests.
# Assumes 'data' from section 25.2 and the ICSNP package is available.

species_pairs <- combn(levels(data$V5), 2, simplify = FALSE)

pairwise_results <- lapply(species_pairs, function(pair) {
  A <- data[data$V5 == pair[1], 1:4, drop = FALSE]
  B <- data[data$V5 == pair[2], 1:4, drop = FALSE]
  result <- ICSNP::HotellingsT2(A, B, test = "f")
  data.frame(group1 = pair[1], group2 = pair[2],
             p_unadjusted = as.numeric(result$p.value))
})

pairwise_table <- do.call(rbind, pairwise_results)
pairwise_table$p_holm <- p.adjust(pairwise_table$p_unadjusted,
                                 method = "holm")
print(pairwise_table)
```

The code illustrates **how to organize a pairwise workflow and adjust p-values**. Because the equal-covariance assumption is demonstrably problematic here, it would be a mistake to present any unreviewed numeric output from these tests as validated pairwise inference. The source itself supplies **no actual pairwise Hotelling p-values**, and none are fabricated in this book.

### 32.4 Better interpretation language for the iris lecture

A clear, source-faithful and statistically careful conclusion is:

> The conventional one-way MANOVA reports a very small Wilks' lambda and a highly significant omnibus p-value, providing strong model-based evidence against equality of the three species' mean measurement vectors. The LDA plot suggests that species 1 is visually distinct from species 2 and 3, whereas species 2 and 3 overlap more. However, this plot does not establish separate pairwise significance tests, and Box's M indicates that the common-covariance assumption should be examined further.

This keeps the lecturer's findings intact while avoiding claims that the provided outputs cannot support.

---

# Part VI. Become fluent in choosing, calculating, and explaining the methods

## 33. A method-selection guide for a new business problem

**[Teaching extension]**

Start with the *data design*, not with the name of a statistical test.

| Research design | Outcomes \(p\) | Number of conditions/groups | What is being compared? | First relevant procedure |
|---|---:|---:|---|---|
| Same customers before and after | 1 | 2 related measurements | One mean of paired differences | Paired t-test |
| Same customers before and after | 3 | 2 related measurements | Mean vector of paired differences | Paired Hotelling \(T^2\) |
| Different customers assigned to A or B | 1 | 2 independent groups | Two scalar means | Independent two-sample t procedure |
| Different customers assigned to A or B | 3 | 2 independent groups | Two mean vectors | Independent two-sample Hotelling \(T^2\), if assumptions support it |
| Different employees in four branches | 1 | 4 independent groups | Four scalar means | One-way ANOVA or suitable alternative |
| Different employees in four branches | 3 | 4 independent groups | Four mean vectors | One-way MANOVA, if assumptions support it |

A different design, such as **more than two repeated measurements on the same employee**, is **not automatically ordinary independent-groups MANOVA**. It requires a repeated-measures or mixed-model framework appropriate for correlated units. This 16-page lecture focuses on two-condition pairing and independent multi-group comparisons, not a full treatment of repeated-measures MANOVA.

### 33.1 A practical workflow

1. **Write down the observational unit.** Is a row a person, truck, specimen, or flower? Check whether rows are independent.
2. **Count the outcome dimensions.** How many numeric characteristics are tested jointly?
3. **Identify the design.** Paired versus independent; two groups versus several.
4. **State the actual population null.** Use a scalar difference, mean-difference vector, or equality of several vectors.
5. **Inspect the observations.** Missing data, outliers, paired identifiers, group balance, relationships between outcomes.
6. **Assess the needed assumptions.** Independence from the study design; distributional form; common covariance when relevant; invertibility.
7. **Choose the test and reference distribution.** Never mix the raw \(T^2\) with an F-transformed statistic, or use the wrong degrees of freedom.
8. **Report the p-value and decision at the specified \(\alpha\).** Treat p-values as model-based evidence, not truth probabilities.
9. **Describe the direction and magnitude.** State the units and what differs descriptively.
10. **Separate omnibus from post-hoc conclusions.** Use further analysis only when supported and needed, with multiplicity and assumptions addressed.

## 34. Worked practice problem 1: interpreting a paired multivariate result

**[Teaching extension]**

**Problem.** A bank measures employee service speed and complaint-handling accuracy before and after a training program. The analyst computes the vector as **before minus after**, obtaining a mean difference of

\[
\bar{\mathbf D}=\begin{bmatrix}3.0\\-4.0\end{bmatrix},
\]

where the first entry is average minutes per case and the second is percentage points of accuracy. A paired multivariate test reports p-value 0.018 at \(\alpha=0.05\). Interpret it.

**Solution.**

The null is

\[
H_0:\boldsymbol\delta=\begin{bmatrix}0\\0\end{bmatrix};
\]

there is no systematic population mean change in the two-dimensional performance profile. The alternative is that at least one mean change is nonzero. Since \(0.018<0.05\), reject the joint null under the test model.

For the first entry, **before minus after = +3** means time after training is descriptively **3 minutes lower** on average. For the second, **before minus after = -4** means accuracy after training is descriptively **4 percentage points higher** on average. The combination looks desirable in both respects.

**What we cannot conclude from the global p-value alone:** that both changes are separately significant, that the training caused the observed changes without suitable design controls, or that 98.2% is the probability of a real effect. The original hypothetical data and assumptions would be needed for detailed follow-up.

## 35. Worked practice problem 2: interpret a two-sample multivariate test with assumptions

**[Teaching extension]**

**Problem.** Two independent teams each collect productivity, accuracy, and satisfaction measurements. A pooled-covariance two-sample Hotelling test returns p-value 0.006. Box's M-test returns p-value 0.003. The chosen test level is 0.01. What is the statistical decision, and how should it be reported?

**Solution.**

The mean-vector null is

\[
H_0:\boldsymbol\mu_A=\boldsymbol\mu_B.
\]

Because \(0.006<0.01\), the chosen pooled test rejects the mean-vector null at 1% **as calculated**. However, Box's M also rejects covariance equality at 1% because \(0.003<0.01\). Thus a key assumption supporting the conventional pooled test is questionable. A careful report says:

> The conventional pooled two-sample analysis found a mean-vector difference at the 1% level, but the covariance-homogeneity diagnostic was also significant. The inferential conclusion is conditional on assumptions that warrant additional checks or an alternative method.

We cannot simply declare the mean vectors equal because Box's M rejected; the two tests concern different null hypotheses. Nor can we declare the mean-vector p-value fully reliable without investigating the violated assumption.

## 36. Worked practice problem 3: calculate a MANOVA between-group matrix

**[Teaching extension]**

**Problem.** Three groups have equal sizes of \(n_i=4\) and sample mean vectors

\[
\bar{\mathbf x}_1=\begin{bmatrix}2\\4\end{bmatrix},
\quad
\bar{\mathbf x}_2=\begin{bmatrix}5\\4\end{bmatrix},
\quad
\bar{\mathbf x}_3=\begin{bmatrix}8\\7\end{bmatrix}.
\]

Calculate the grand mean and the between-group SSCP matrix \(\mathbf B\). No individual data are required for these two quantities.

**Solution, step 1.** Because group sizes are equal, the grand mean is the average of the group mean vectors:

\[
\bar{\mathbf x}=
\frac13\begin{bmatrix}2+5+8\\4+4+7\end{bmatrix}
=\begin{bmatrix}5\\5\end{bmatrix}.
\]

**Step 2.** Subtract the grand mean:

\[
\mathbf d_1=\begin{bmatrix}-3\\-1\end{bmatrix},
\quad
\mathbf d_2=\begin{bmatrix}0\\-1\end{bmatrix},
\quad
\mathbf d_3=\begin{bmatrix}3\\2\end{bmatrix}.
\]

**Step 3.** Form and sum the outer products, each multiplied by 4:

\[
\mathbf B=4\left[
\begin{bmatrix}9&3\\3&1\end{bmatrix}
+\begin{bmatrix}0&0\\0&1\end{bmatrix}
+\begin{bmatrix}9&6\\6&4\end{bmatrix}
\right].
\]

\[
\boxed{\mathbf B=4\begin{bmatrix}18&9\\9&6\end{bmatrix}
=\begin{bmatrix}72&36\\36&24\end{bmatrix}.}
\]

The result is a \(2\times2\) symmetric matrix. To compute Wilks' lambda as well, we would still need the within-group matrix \(\mathbf W\). A list of group means **does not contain sufficient information** to determine within-group covariance.

## 37. Worked practice problem 4: calculate and interpret Wilks' lambda

**[Teaching extension]**

**Problem.** A two-outcome MANOVA has within-group and between-group SSCP matrices

\[
\mathbf W=\begin{bmatrix}12&3\\3&8\end{bmatrix},
\qquad
\mathbf B=\begin{bmatrix}4&1\\1&5\end{bmatrix}.
\]

Calculate \(\Lambda\) and explain what else is required for a test decision.

**Solution.**

\[
\mathbf T=\mathbf W+\mathbf B
=\begin{bmatrix}16&4\\4&13\end{bmatrix}.
\]

\[
|\mathbf W|=12(8)-3(3)=96-9=87.
\]

\[
|\mathbf T|=16(13)-4(4)=208-16=192.
\]

\[
\boxed{\Lambda=\frac{87}{192}=0.453125.}
\]

Because lambda is below 1, there is a nonzero between-group contribution in the data. But **we cannot decide statistical significance from this one number alone**. We also need the number of groups, outcomes, and degrees of freedom or sample sizes to obtain the appropriate null reference distribution and p-value. The specific \(\mathbf W\) and \(\mathbf B\) matrices alone do not tell us the exact grouping design used to produce them.

## 38. Worked practice problem 5: decide what a significant MANOVA does not say

**[Teaching extension]**

**Problem.** A three-group MANOVA on four customer metrics yields p-value \(<0.001\). Which of these statements follows?

A. Every group differs significantly from every other group.  
B. Every individual customer metric differs between groups.  
C. At least two population mean vectors differ, under the test model.  
D. The groups have different covariance matrices.  
E. The treatment caused the difference.

**Answer: C.**

Why not A? An omnibus rejection does not identify exact pairs. Why not B? One or a subset of outcomes could account for separation. Why not D? Covariance equality is a different hypothesis. Why not E? Causal interpretation requires design and assumptions beyond merely observing group differences.

## 39. R command clinic: recognizing the function instead of memorizing the code

**[Teaching extension consolidating R functions appearing on lecture pp. 4–15]**

| Command/function | Used for | Frequent beginner pitfall |
|---|---|---|
| `read.table("file.dat")` | Load a text dataset | Wrong path or incorrect separator/headers |
| `head(data)` | View first rows | Checking only the first rows can hide later malformed entries |
| `tail(data)` | View final rows | Assuming ordering proves the meaning of every row |
| `str(data)` | Examine column types and size | Treating character group names as numeric responses |
| `as.factor(data$group)` | Identify categorical groups | Assuming codes 1,2,3 are quantities rather than classes |
| `data[, 1:3]` | Select first three columns | Accidentally including the group label in a numeric test matrix |
| `data[-c(1:36), ]` | Exclude rows 1 through 36 | Negative indexing excludes, it does not mean negative observations |
| `cbind(X1, X2, X3)` | Form multivariate response matrix | Misunderstanding outcomes as separate independent datasets |
| `data.frame(...)` | Construct a table | Confusing a data frame with a single numeric vector |
| `scale(...)` | Center and standardize columns | Forgetting that results are now in standardized units |
| `pairs(...)` | Display a scatterplot matrix | Treating graphical separation as a formal p-value |
| `mahalanobis()` | Calculate squared covariance-adjusted distances | Assuming every large distance is a data error |
| `mult.norm(...)` | Multivariate normality diagnostics used by lecturer | Treating non-rejection as proof of normality |
| `boxM(...)` | Test covariance homogeneity | Mistaking it for a mean equality test |
| `HotellingsT2(...)` | Paired-difference or two-sample mean-vector test | Mixing F-transformed and raw \(T^2\) values |
| `manova(...)` | Fit a multivariate linear model | Supplying a numeric group code without converting it to factor |
| `summary(fit, test = "Wilks")` | Obtain the omnibus MANOVA test | Treating significance as proof every group pair differs |
| `lda(...)` | Fit discriminant directions/classifier | Treating a discriminant plot as adjusted pairwise inference |
| `predict(lda_fit)$x` | Produce each observation's LD scores | Confusing LD scores with the original variables |
| `ggplot()` / `geom_point()` | Draw a customizable plot | Misplacing the species column or plotting the wrong axes |
| `pf(..., lower.tail = FALSE)` | Obtain an F upper-tail probability | Taking the lower tail for a large-F rejection test |
| `p.adjust(..., "holm")` | Adjust a family of p-values | Believing adjustment repairs a flawed covariance model |

### 39.1 Package installation, use, and reproducibility

The source refers to R packages `QuantPsyc`, `ICSNP`, `heplots`, `MASS`, and `ggplot2`. Before using an optional package for the first time, install it from a source available to your R environment, for example:

```r
# Only install packages you actually need and do not already have.
# install.packages(c("QuantPsyc", "ICSNP", "heplots", "MASS", "ggplot2"))
```

Then load a needed package with `library(packageName)` or use a qualified function name such as `ICSNP::HotellingsT2(...)`. A package function or argument may behave differently across versions; inspect `?FunctionName` in R when reproducing an old lecture.

**Do not blindly replace** the lecturer's underlying data file with another table that merely has the same number of rows. For wastewater, all original rows are provided in the PDF and are embedded in this book. For the milk-truck example, the PDF does not include all 59 rows, so complete numeric replication requires the actual `T6-10.dat`. For iris, the standard built-in dataset recovers the reported conventional MANOVA numbers.

## 40. Common mistakes, with precise corrections

**[Teaching extension synthesizing all three lecture sections]**

| Mistake | Why it is incorrect | Safer understanding |
|---|---|---|
| “A large observed mean difference proves a population difference.” | Sample estimates fluctuate. | Use a test or interval that reflects sampling uncertainty. |
| “p = 0.03 means a 3% chance the null is true.” | The ordinary p-value conditions on the null; it does not assign a probability to the null. | Interpret unusualness of the observed result **under** the null model. |
| “p > 0.05 proves two means are equal.” | Failure to reject can result from poor precision or low power. | Report insufficient evidence against equality, not proof of equality. |
| “Paired measurements are two independent samples.” | Values from the same or matched unit are related. | Analyze the within-unit difference vectors. |
| “For paired data, test normality of raw before and after columns only.” | The paired Hotelling model concerns the **difference vectors**. | Inspect the multivariate distribution of differences. |
| “Hotelling's \(T^2\) and the printed F are always numerically the same.” | The F statistic is typically a scaled version of raw \(T^2\). | Check the reference distribution and transformation. |
| “If p outcomes are tested jointly, every outcome must have a significant univariate p-value.” | Joint directions use covariance information. | The wastewater example contradicts this assumption. |
| “Independent samples with equal lengths are paired.” | Pairing is created by study design, not sample counts. | Ask whether observations share units or matching identifiers. |
| “Covariance matrices equal” means “mean vectors equal.” | Covariance describes spread and dependence, not center. | Keep Box's M null separate from the mean-vector null. |
| “A nonsignificant Box's M proves equal covariance.” | A test's non-rejection is not proof. | Treat it as one diagnostic among several. |
| “Rejecting Box's M justifies using pooled covariance.” | It is actually evidence *against* a pooled-covariance assumption. | Investigate robustness or another method. |
| “When n = 50 the observations become normal.” | Large samples affect mean sampling distributions, not necessarily raw distributions. | Distinguish the CLT from original-data normality. |
| “ANOVA and MANOVA test equality of variances.” | Their primary scientific nulls concern means; equal variance/covariance is an assumption. | State the mean null and the covariance assumption separately. |
| “\(\mathbf B\), \(\mathbf W\), and \(\mathbf T\) are single numbers in MANOVA.” | They are matrices containing sums of squares and cross-products. | Use \(p\times p\) SSCP matrices. |
| “Wilks' lambda = 0.2 means 20% of variance is unexplained.” | It is a ratio of determinants, not a simple percentage of variance. | Read it as a multivariate within/total generalized-variation ratio. |
| “Small Wilks' lambda gives significance without group/sample sizes.” | The reference distribution depends on degrees of freedom and dimensions. | Obtain the valid transformed test and p-value. |
| “A significant MANOVA tells us which groups differ.” | It is omnibus. | Use planned follow-up contrasts or valid pairwise methods. |
| “LDA plot proves species 1 is statistically different from species 2.” | Visual separation is not a formal pairwise p-value. | Distinguish visualization from hypothesis testing. |
| “99.12% trace proportion is a classification accuracy.” | It refers to the discriminant separation measure. | Do not substitute it for prediction accuracy or PCA variance. |
| “Mahalanobis outliers must always be deleted.” | They may be legitimate but unusual units. | Investigate data quality and run transparent sensitivity analyses. |
| “No outliers means the model is valid.” | Many other assumptions matter. | Evaluate design, dependence, shape, covariance, and computation. |
| “Correlation is the same as covariance.” | Covariance depends on measurement scales; correlation is standardized. | Use the right measure and interpret its units. |

## 41. The essential formulas on one page

**[Formula guide: source formulas plus explicitly identified teaching additions]**

| Situation | Formula | What it measures |
|---|---|---|
| One-variable sample mean | \(\bar x=\frac1n\sum_jx_j\) | Sample center |
| Sample variance | \(s^2=\frac1{n-1}\sum_j(x_j-\bar x)^2\) | Individual variability |
| Paired differences | \(D_j=X_{j1}-X_{j2}\) | Within-pair change; Lecture p. 1 |
| Paired t-test | \(t=(\bar D-\delta_0)/(s_D/\sqrt n)\) | Standardized average difference; Lecture pp. 1–2 |
| Paired t confidence interval | \(\bar D\pm t_{n-1,1-\alpha/2}s_D/\sqrt n\) | Uncertainty interval for scalar mean difference; Lecture p. 2 |
| Paired difference vector | \(D_{jk}=X_{1jk}-X_{2jk}\) | Outcome-specific within-pair difference; Lecture p. 2 |
| Mean difference vector | \(\bar{\mathbf D}=n^{-1}\sum_j\mathbf D_j\) | Center of multivariate paired changes |
| Paired Hotelling | \(T^2=n(\bar{\mathbf D}-\boldsymbol\delta_0)^{\mathsf T}\mathbf S_D^{-1}(\bar{\mathbf D}-\boldsymbol\delta_0)\) | Covariance-adjusted joint mean deviation; Lecture p. 3 |
| Paired F transformation | \(F=\frac{n-p}{p(n-1)}T^2\sim F_{p,n-p}\) | Exact normal-model paired reference; Lecture p. 3 |
| Pooled covariance (two groups) | \(\mathbf S_p=\frac{(n_1-1)\mathbf S_1+(n_2-1)\mathbf S_2}{n_1+n_2-2}\) | Common within-group covariance estimate; extension of pooling on p. 7 |
| Independent two-sample Hotelling | \(T^2=\frac{n_1n_2}{n_1+n_2}\mathbf d^{\mathsf T}\mathbf S_p^{-1}\mathbf d\) | Difference between independent mean vectors; teaching expansion of pp. 6–10 |
| Two-sample F transformation | \(F=\frac{N-p-1}{p(N-2)}T^2\sim F_{p,N-p-1}\) | Exact pooled normal-model reference; teaching expansion |
| MANOVA population model | \(\mathbf X_{ij}=\boldsymbol\mu+\boldsymbol\alpha_i+\boldsymbol\varepsilon_{ij}\) | Overall location + group effect + residual; Lecture p. 11 |
| Sample decomposition | \(\mathbf x_{ij}=\bar{\mathbf x}+(\bar{\mathbf x}_i-\bar{\mathbf x})+(\mathbf x_{ij}-\bar{\mathbf x}_i)\) | Exact overall/between/within breakdown; Lecture p. 11 |
| Between-group SSCP | \(\mathbf B=\sum_i n_i(\bar{\mathbf x}_i-\bar{\mathbf x})(\bar{\mathbf x}_i-\bar{\mathbf x})^{\mathsf T}\) | Group-level multivariate variation; expansion of Lecture p. 12 |
| Within-group SSCP | \(\mathbf W=\sum_i\sum_j(\mathbf x_{ij}-\bar{\mathbf x}_i)(\mathbf x_{ij}-\bar{\mathbf x}_i)^{\mathsf T}\) | Residual multivariate variation; expansion of Lecture p. 12 |
| Within-group SSCP from covariances | \(\mathbf W=\sum_i(n_i-1)\mathbf S_i\) | Pool group-specific SSCP matrices; Lecture p. 12 |
| Total SSCP | \(\mathbf T=\mathbf B+\mathbf W\) | Total variation and cross-products; Lecture p. 12 |
| Wilks' lambda | \(\Lambda=\lvert\mathbf W\rvert/\lvert\mathbf B+\mathbf W\rvert\) | Multivariate within/total generalized-variation ratio; Lecture p. 12 |
| Box's M null | \(H_0:\boldsymbol\Sigma_1=\cdots=\boldsymbol\Sigma_g\) | Homogeneous group covariance; Lecture pp. 7, 13 |
| Box's M chi-square df | \((g-1)p(p+1)/2\) | Approximation degrees of freedom; teaching expansion |
| LDA score | \(LD_r=\mathbf a_r^{\mathsf T}\mathbf z\) | Supervised discriminant projection; expansion of Lecture p. 15 |
| Max. LDA axes | \(\min(p,g-1)\) | Number of possible nontrivial group-separating directions; teaching expansion |

**Notation reminders:** \(p\) is the number of outcomes; \(g\) the number of groups; \(n\) the number of pairs; \(n_i\) a group's sample size; \(N\) the combined sample size; \(\mathbf S\) a sample covariance; \(\boldsymbol\Sigma\) a population covariance; \(\mathbf0_p\) the zero vector; \(^{\mathsf T}\) transpose; \(^{-1}\) inverse; \(|\mathbf A|\) matrix determinant; \(\alpha\) a significance level when written without a group subscript. In the MANOVA model, **\(\boldsymbol\alpha_i\)** instead denotes the group-effect *vector*, a different use of the same Greek letter.

## 42. How to write the final interpretation of a multivariate test

**[Teaching extension]**

A clear short report usually follows this sequence:

**Research question:** Identify the groups, outcomes, and whether data are paired or independent.

**Null hypothesis:** State equality of population mean vectors, or a zero mean-difference vector for paired observations.

**Method and assumptions:** Identify paired Hotelling, independent pooled Hotelling, or one-way MANOVA, and note material assumption problems.

**Numerical result:** Report the actual statistic **with its type**, degrees of freedom when appropriate, p-value, and \(\alpha\).

**Statistical decision:** Reject or do not reject the null. Avoid claiming acceptance/proof of equality.

**Business interpretation:** State what aspect of average group profiles differs. Support more detailed component or pair claims only if further analysis provides that evidence.

For the three source examples, a concise but defensible report would read:

**Wastewater, paired:** Eleven split samples were evaluated on BOD and SS at two laboratories. Paired differences were tested jointly with Hotelling's \(T^2\). The raw \(T^2\approx13.6393\) gives \(F(2,9)\approx6.1377\), p \(\approx0.02083\). At 5%, reject a zero mean-difference vector. In the observed splits, the commercial laboratory recorded lower average BOD and higher average SS than the state laboratory.

**Milk-truck costs, independent:** The lecturer compared mean cost vectors across 36 gasoline and 23 diesel trucks using an approximate two-sample Hotelling statistic with p \(\approx5.106\times10^{-11}\), rejecting equality at 1%. However, normality diagnostics for gasoline and Box's M raised substantial model concerns, so the standard pooled-covariance conclusion requires qualification and a sensitivity assessment. The supplied PDF does not report the outlier-deletion reanalysis.

**Iris, several groups:** One-way MANOVA of four flower measurements across three species reported Wilks' \(\Lambda=0.023439\), approximate \(F(8,288)=199.15\), p \(<2.2\times10^{-16}\). The conventional omnibus result rejects equal mean vectors. LDA visualizes especially clear separation of species 1 from the other two, but the visualization is not a pairwise significance test, and the significant Box's M result cautions against uncritical reliance on homogeneous covariance assumptions.

## 43. Final concept-check questions with concise reasoning

**[Teaching extension; these are additional learning exercises, not claims about the lecturer's examination]**

**Q1. Why compute differences for paired data?**  
Because the paired difference removes much shared between-unit variation and matches the study's within-unit comparison. The vector of differences is the unit for the paired multivariate analysis.

**Q2. What is the multivariate null in a paired two-condition study with four outcomes?**  
\(H_0:\boldsymbol\delta=\mathbf0_4\), meaning all four population mean paired differences are zero simultaneously.

**Q3. If the paired sample has \(n=18,p=3\), what F degrees of freedom apply to the exact normal-model paired Hotelling test?**  
\(df_1=p=3\), \(df_2=n-p=15\). The conversion factor from raw \(T^2\) to F is \((18-3)/[3(17)]=15/51=5/17\).

**Q4. If two independent samples total \(N=40\) with \(p=4\), what are the exact pooled two-sample F degrees of freedom?**  
\(df_1=4\), \(df_2=N-p-1=35\). This differs from the paired-test rule.

**Q5. What distinguishes \(\mathbf S_i\) from \(\boldsymbol\Sigma_i\)?**  
\(\mathbf S_i\) is a sample-based estimate; \(\boldsymbol\Sigma_i\) is the population covariance parameter.

**Q6. What is the null of Box's M?**  
All population covariance matrices are equal. It does not directly test equal mean vectors.

**Q7. Why is the MANOVA \(\mathbf W\) matrix not generally diagonal?**  
Because different response variables may co-vary within groups. Off-diagonal entries sum within-group cross-products.

**Q8. In one-way MANOVA with \(N=80,g=4\), what are the treatment, residual, and total SSCP degrees of freedom?**  
\(g-1=3\), \(N-g=76\), and \(N-1=79\); check \(3+76=79\).

**Q9. If Wilks' lambda is close to 1, does this logically prove the population mean vectors are equal?**  
No. It means little observed generalized separation relative to within-group variation; statistical significance still depends on the reference distribution, sample sizes, and assumptions.

**Q10. Can an omnibus MANOVA be significant when no separately tested outcome is significant at 5%?**  
Yes, covariance may make the joint difference direction informative. The laboratory paired data provide a concrete instance of the analogous two-condition joint-test phenomenon.

**Q11. Why is an LDA plot not an adjusted pairwise post-hoc test?**  
It selects directions and displays group patterns, but does not automatically calculate and adjust p-values for each hypothesized pairwise mean-vector contrast.

**Q12. In the iris output, what does 0.9912 under LD1 mean?**  
Approximately 99.12% of the fitted discriminant separation measure is allocated to LD1 among the two discriminant directions. It is not 99.12% classification accuracy.

---

# Appendix A. Exact source-coverage audit, page by page

This audit identifies where every substantive portion of the supplied lecture has been explained, reproduced, or qualified. Page numbers refer to **Lec8.pdf**, not to this teaching book. A short lecture page may correspond to several textbook sections because prerequisites and calculations have been unpacked.

| Original PDF page | Source material found | Where it is taught in this book | Fidelity or scope note |
|---:|---|---|---|
| **1** | Lecture introduction; paired design; before/after example; definitions of \(D_j\); equivalent scalar hypotheses; paired-t reference | §§1–5, 8–9 | All named concepts unpacked; training numbers are labelled supplementary |
| **2** | Mean and variance of paired differences; three decision approaches; multivariate paired indices \(X_{ijk}\); treatment-versus-variable table; \(D_{jk}\) table | §§3–4, 9–10 | Distinguishes unit, outcome, and treatment indices |
| **3** | Mean difference vector and covariance; multivariate normal paired model; Hotelling \(T^2\), F distribution, critical value and chi-square approximation; introduction of wastewater study | §§10–12 | Explains the hypothesized null vector and precise F transformation |
| **4** | Complete Table 6.1, 11 paired laboratory specimens; question; R load and differences | §12.1–12.3, §12.10 | All source data rows reproduced, not approximated |
| **5** | Paired difference output; multivariate skewness/kurtosis results; `ICSNP` paired test; F-based result and inference | §12.4–12.10 | Independently verifies both raw \(T^2\) and displayed 6.1377 F-equivalent |
| **6** | Independent two-sample multivariate problem; sample matrices; mean-vector hypothesis; basic assumptions | §§13–15 | Sampling structure and independence distinguished from pairing |
| **7** | Common covariance and Box's M; chi-square approximation discussion; Behrens–Fisher scope exclusion; truck study \(n_1=36,n_2=23,p=3\); alpha 0.01; outlier-deletion exercise | §§14–17 | Explicitly preserves exclusion of unequal-covariance topic; no fabricated truck rows |
| **8** | Truck data structure, factor conversion, scatterplot matrix commands, Mahalanobis distances and outliers | §17.2–17.4, §39 | Explains `pairs()`, indexing, `factor`, distances 17.64 and 10.73 |
| **9** | Truck scatterplot-matrix figure; normality test results for both groups; Box's M command | §17.3–17.6 | Incorporates plotted relationships conceptually, and exact source diagnostic p-values |
| **10** | Truck Box's M result; alternate R interfaces; pooled Hotelling chi-square result and conclusion; transition to one-way MANOVA | §17.6–17.9, §§18–19 | Reports assumption conflicts rather than hiding them |
| **11** | Multiple-population matrix layout; four MANOVA assumptions; MANOVA model; effect constraint; vector decomposition | §§18–21 | Weighted constraint and population-versus-sample decomposition explained |
| **12** | ANOVA sums of squares; SSCP identity \(\mathbf T=\mathbf B+\mathbf W\); residual matrix formula; df table; Wilks' lambda | §§6, 21–24 | Includes full matrix derivation and a nine-observation worked MANOVA |
| **13** | Equal covariance among \(g\) populations; Box's M null and approximation guidance; iris data loading, first rows and last rows | §§16, 25–26 | Preserves the source's stated approximation guideline as a guideline |
| **14** | Iris group sizes and factor conversion; Box's M output; `manova()` and Wilks output; inference; motivation for post-hoc | §§25–28 | Reconstructs SSCPs, verifies Wilks and F, flags covariance assumption conflict |
| **15** | LDA model call and full printed output; priors, standardized group means, coefficients, proportions of trace; ggplot code; interpretation | §§28–30, 32 | Full substantive output explained; LDA not misrepresented as a pairwise test |
| **16** | LD1–LD2 colored iris-species scatterplot | §31 | Explicit visual interpretation of point-cloud positions and their limitations |

## Appendix B. Reproduction ledger: source results versus new calculations

The following ledger prevents a student from accidentally treating extra textbook arithmetic as a quotation of the lecturer's displayed output.

| Quantity | Value | Status |
|---|---|---|
| Wastewater original values and 11 differences | Full §12.2 table | **Source-derived** from pp. 4–5 |
| Wastewater skewness / kurtosis p-values | 0.4273089 / 0.5736319 | **Printed in source** p. 5 |
| Wastewater `HotellingsT2(..., test="f")` output | `T.2 = 6.1377`, p = 0.02083 | **Printed in source** p. 5 |
| Wastewater mean-difference vector | (-9.363636, +13.272727) | **Recomputed** from source's raw rows |
| Wastewater sample covariance matrix | Entries 199.254545, 88.309091, 418.618182 | **Recomputed** from source's raw rows |
| Wastewater raw quadratic-form \(T^2\) | 13.639312 | **Recomputed**; distinction from package F output explained |
| Wastewater two separate paired-t p-values | ≈0.0524 and ≈0.0569 | **Supplementary computation**, not printed in lecture |
| Truck squared Mahalanobis distances at gasoline observations 9 and 21 | 17.64 and 10.73 | **Printed in source** p. 8 |
| Truck gasoline normality p-values | 0.0001332139 and 0.0294552228 | **Printed in source** p. 9 |
| Truck diesel normality p-values | 0.7822190 and 0.3410625 | **Printed in source** p. 9 |
| Truck Box's M | 30.544, df 6, p = 3.097e-05 | **Printed in source** p. 10 |
| Truck two-sample result | 50.913, df 3, p = 5.106e-11 | **Printed in source** p. 10 |
| Truck after removing observations 9 and 21 | Not provided | **Not reconstructed or invented**; reproducible code supplied |
| Iris Box's M | 140.94, df 20, p < 2.2e-16 | **Printed in source** p. 14 |
| Iris Wilks' lambda and F | 0.023439; 199.15, df 8 and 288 | **Printed in source** p. 14 |
| Iris \(\mathbf B\), \(\mathbf W\), determinant values | §27.3 | **Supplementary reconstruction** from standard iris data |
| Iris corrected Box's M ≈ 140.94305 and Rao F ≈ 199.1453 | §§26.4, 27.4 | **Supplementary calculations** verifying the source |
| Iris LDA priors, means, coefficients, trace shares | §30 | **Printed in source** p. 15 |
| LDA point-cloud arrangement | Group 1 right, group 2 center, group 3 left | **Observed in source figure** p. 16 |
| Formal pairwise adjusted iris p-values | Not provided | **Not invented**; conditional workflow only |
| One-way ANOVA, toy two-sample test, toy MANOVA, practice problems | §§6, 15, 24, 34–38 | **Entirely supplementary teaching examples** |

## Appendix C. Boundaries of the supplied lecture

The 16-page source **does cover** paired multivariate comparisons, independent pooled two-sample comparisons, ordinary one-way MANOVA, Box's M diagnostics, Wilks' lambda, and an iris LDA visualization. It **does not** supply a complete treatment of unequal-covariance two-sample testing, repeated-measures MANOVA for three or more time points, complete multiple-comparison inference, robust MANOVA alternatives, or the numeric outcome of removing truck outliers 9 and 21. Nor does it provide a full raw truck-cost dataset within the PDF pages.

These missing topics are not silently attributed to the lecturer. Where helpful, this book introduces their **purpose and implications**, but explicitly labels extensions and does not manufacture original source observations, p-values, conclusions, or examination requirements.

---

## Closing perspective

The journey through this lecture follows one consistent statistical idea:

For **one variable**, compare a mean difference with its uncertainty using a t-test or compare several group means through ANOVA. For **multiple related variables**, compare entire **mean vectors**, and account for their **covariance**. If observations are paired, work with paired **difference vectors** and Hotelling's \(T^2\). If two groups are independent, compare their two mean vectors using a covariance estimate appropriate to the assumptions. If several groups are independent, decompose variation into **between-group** and **within-group** SSCP matrices and measure overall group separation with **Wilks' lambda** in a MANOVA.

The formulae are more elaborate, but the scientific reasoning remains accessible: **Are the observed group-average differences large and systematically structured compared with the variation we would expect if the populations had the same mean profile?** The final answer depends not only on the statistic but also on the design, sample variability, covariance relationships, assumptions, and the strength of the interpretation.

*End of complete DA2451 Lecture 08 teaching book.*
