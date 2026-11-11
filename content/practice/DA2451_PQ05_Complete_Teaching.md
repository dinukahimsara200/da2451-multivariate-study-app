# DA2451 Practice Worksheet 05: Complete Beginner-Friendly Teaching Guide

**Course:** DA2451 – Multivariate Methods in Business  
**Original source:** `PQ5.pdf`, *Practice Worksheet – 5*, Semester 4, 2024, **four pages**  
**Original topics:** Inferences about a mean vector; comparisons of several multivariate means  
**Lecturer's instruction:** *Use R to answer all questions.* Question 6 additionally specifies hand calculations.  
**Supplementary supplied data:** `T5-2(1).DAT` (87 college students), `T6-9(1).dat` (48 turtles), `T11-7(1).DAT` (56 crude-oil samples), and the complete 11-row effluent Table 6.1 furnished in this conversation. The nine Peruvian-hair observations and Question 6 matrices are printed in `PQ5.pdf` itself.

## Read this first: accuracy, sources, and notation

This is a **teaching book, not a compressed answer sheet**. Read the foundational explanations before attempting the problems. The goal is to understand why each statistical technique is appropriate, not merely to produce a test statistic.

**How material is distinguished:**

- **Original question / original table:** Faithful transcription of the four-page worksheet, including its wording, sample sizes, hypotheses, shown observations, numerical matrices and subquestion labels. Where the worksheet displays only the first and last rows of a larger dataset, the complete *uploaded* dataset is reproduced in Appendix A.
- **Lecturer-provided solution:** The worksheet prints worked answers for **Question 6** only. Those numerical results and their stated assumptions are explicitly labeled as such. Questions **1–5 have no source-provided worked answers**, so the solutions here were independently calculated.
- **Independently computed:** Numerical means, covariances, hypothesis-test statistics, p-values, diagnostics and MANOVA results were calculated from the uploaded data using Python/NumPy/SciPy/statsmodels. The included R code is written to reproduce the same analyses, but **R was not executed in this environment**. Minor rounding or software-implementation differences may arise.
- **Supplementary explanation:** Mathematical prerequisites, explanations, examples, additional diagnostic tests, transformations, caveats and optional exploration were developed for learning. They are not claims that the lecturer wrote them.
- **Significance:** When the worksheet states $\alpha=0.05$ or $\alpha=0.01$, that instruction takes priority. Where it gives no significance level (Questions 2, 3 and 5), **$\alpha=0.05$ is explicitly chosen here**, not copied from the source. Question 6 explicitly supplies **1% critical values**.
- **Missing dependencies:** None for the requested calculations. All three referenced `.dat` files and the external effluent table were provided. Reproducing the R code on your own computer requires entering the embedded data or placing the supplied `.DAT` files where R can read them.

**Important interpretation rule:** A test result supports or contradicts a precisely stated statistical hypothesis *under its assumptions*. It never proves absolute equality, normality, or causation. The word **plausible** means “not ruled out by the specified test at the chosen significance level,” not “known to be true.”

## Contents

1. [Part I – Foundations from absolute zero](#part-i--foundations-from-absolute-zero)
2. [Part II – How to work in R](#part-ii--how-to-work-in-r)
3. [Question 1 – College examination scores](#question-1--college-examination-scores)
4. [Question 2 – Minerals in ancient Peruvian hair](#question-2--minerals-in-ancient-peruvian-hair)
5. [Question 3 – Two laboratories and an effluent outlier](#question-3--two-laboratories-and-an-effluent-outlier)
6. [Question 4 – Female and male painted turtles](#question-4--female-and-male-painted-turtles)
7. [Question 5 – One-way MANOVA of crude-oil chemistry](#question-5--one-way-manova-of-crude-oil-chemistry)
8. [Question 6 – MANOVA by hand](#question-6--manova-by-hand)
9. [Part III – Reproducible master R script](#part-iii--reproducible-master-r-script)
10. [Appendix A – Complete external datasets](#appendix-a--complete-external-datasets)
11. [Appendix B – Exam checklist and misconceptions](#appendix-b--exam-checklist-and-misconceptions)
12. [Appendix C – Source and completion audit](#appendix-c--source-and-completion-audit)

---

# Part I – Foundations from absolute zero

## 1. What are we doing when we use statistics?

Imagine a university has many thousands of students. You cannot necessarily measure every student, but you can study a manageable group. That group is a **sample**; the much larger group about which you wish to make statements is the **population**. Statistics lets us measure the sample and carefully judge what its results might mean for the population.

A **variable** is anything we measure: an examination score, chromium concentration, the width of a turtle's shell, or the amount of iron in oil. A **response** or **outcome variable** is a variable whose pattern we want to compare or explain. An **observation** is the set of measurements taken from one student, hair, effluent sample, turtle or oil sample.

**Why “multivariate”?** A student has three test scores simultaneously. You could test each score individually, but doing so ignores how the scores move together and causes complications when making several separate decisions. Multivariate statistics studies the *whole profile* of measurements as one object.

For example, two students might have profiles $(70,50)$ and $(60,60)$. Both total 120, yet their subject strengths differ. Treating the pair as a vector retains this useful information.

## 2. Symbols you will keep seeing

| Symbol | Say it as | Meaning |
|---|---|---|
| $n$ | “en” | Number of independent observations in a sample. |
| $p$ | “pee” | Number of response variables measured on each observation. |
| $g$ | “gee” | Number of groups or treatments being compared. |
| $X_j$ | “X sub j” | The $j$th variable, before considering a specific observed value. |
| $x_{ij}$ | “x sub i j” | Value of variable $j$ for observation $i$. |
| $\boldsymbol{x}_i$ | “x vector i” | All $p$ variables for observation $i$, written together. |
| $\boldsymbol{\mu}$ | “mu” | True, generally unknown population mean vector. |
| $\boldsymbol{\mu}_0$ | “mu nought” | Mean vector proposed under the null hypothesis. |
| $\bar{\boldsymbol{x}}$ | “x bar vector” | Mean vector calculated from the observed sample. |
| $\boldsymbol{\Sigma}$ | “capital sigma” | Population covariance matrix, generally unknown. |
| $\boldsymbol S$ | “S” | Sample covariance matrix, estimated from data. |
| $^\mathsf T$ or $'$ | “transpose” | Converts rows to columns and columns to rows. |
| $A^{-1}$ | “A inverse” | Matrix inverse, when it exists. **Not** element-by-element reciprocals. |
| $|A|$ | “determinant of A” | Scalar measuring a matrix's volume scaling; for $2\times2$, $ad-bc$. |
| $\alpha$ | “alpha” | Preselected probability of a Type I error under the test assumptions. |
| $H_0,H_1$ | “H nought, H one” | Null and alternative hypotheses. |
| $T^2$ | “T squared” | Hotelling's multivariate squared-distance test statistic. |
| $F_{a,b}$ | “F with a,b degrees of freedom” | Reference distribution for some test statistics. |
| $\chi^2_k$ | “chi-square k” | Chi-square reference distribution with $k$ degrees of freedom. |
| $\Lambda$ | “lambda” | Wilks' lambda used for multivariate group comparisons. |

A **matrix** is simply a rectangular arrangement of numbers. A **vector** is one row or column of numbers. Transposing a three-number row creates a three-number column:

$$
[500,50,30]^\mathsf T=\begin{bmatrix}500\\50\\30\end{bmatrix}.
$$

The prime symbol in the original worksheet, for example $\boldsymbol{\mu}'$, means the same transpose operation.

## 3. What is a mean, and what is a mean vector?

For observations $10,20,30$, the ordinary sample mean is

$$\bar{x}=\frac{10+20+30}{3}=20.$$

We add all the values, then divide by the number observed. In multivariate statistics we do exactly this **separately for every variable**, then assemble the results:

$$
\bar{\boldsymbol x}=\begin{bmatrix}\bar x_1\\\bar x_2\\\vdots\\\bar x_p\end{bmatrix},
\qquad \bar x_j=\frac1n\sum_{i=1}^{n}x_{ij}.
$$

The symbol $\sum$ means “add up”; $i=1$ through $n$ specifies which observations to add. The result is the **average profile** for the sample, not any one person's actual score profile.

If four people have measurements $(2,8)$, $(4,6)$, $(6,4)$ and $(8,2)$, their mean profile is $(5,5)$, because each coordinate averages to 5. The mean vector is the geometric center of the observed points in the familiar arithmetic sense.

## 4. Variance, standard deviation, covariance, correlation

### 4.1 Why measuring an average is not enough

Two groups can both average 50 but be very different. In one group everyone scores about 50; in the other half score 10 and half score 90. Their **spread** differs. We quantify this spread with *variance*.

For a sample of $n$ observations, the sample variance of variable $j$ is

$$s_{jj}=\frac{\sum_{i=1}^n(x_{ij}-\bar x_j)^2}{n-1}.$$

The expression $x_{ij}-\bar x_j$ is the observation's deviation from the mean. Squaring makes negative and positive deviations count positively. The denominator $n-1$ is the usual sample-variance adjustment for estimating population variation after calculating a mean from the same data.

The **standard deviation** is $\sqrt{s_{jj}}$, restoring the original measurement units. For a variance of 25, the standard deviation is 5.

### 4.2 How two variables move together

Sample covariance is

$$s_{jk}=\frac{\sum_{i=1}^n(x_{ij}-\bar x_j)(x_{ik}-\bar x_k)}{n-1}.$$

For each observation, multiply its deviation on the first variable by its deviation on the second. If both are usually above average together, the products tend to be positive. If one is usually above average while the other is below, the products tend to be negative.

- **Positive covariance:** variables tend to increase together.
- **Negative covariance:** one tends to decrease when the other increases.
- **Near-zero covariance:** little observed *linear* co-movement; more complicated relationships may still exist.

Covariance depends on the scales of the variables. A correlation removes this unit dependence:

$$r_{jk}=\frac{s_{jk}}{\sqrt{s_{jj}}\sqrt{s_{kk}}}.$$

Correlation is between $-1$ and $1$. A correlation of $0.8$ signals fairly strong positive *linear association*, not that one variable causes the other. A correlation of $0$ does not rule out a curved relationship.

### 4.3 The covariance matrix

For two variables:

$$\boldsymbol S=\begin{bmatrix}s_{11}&s_{12}\\s_{12}&s_{22}\end{bmatrix}.$$

Diagonal entries give the individual variances. Off-diagonal entries give covariances. For three variables:

$$\boldsymbol S=\begin{bmatrix}
s_{11}&s_{12}&s_{13}\\
s_{12}&s_{22}&s_{23}\\
s_{13}&s_{23}&s_{33}
\end{bmatrix}.$$

The matrix is symmetric because the covariance of $X_1$ with $X_2$ equals that of $X_2$ with $X_1$.

## 5. Why ordinary distance is not enough

Suppose the average student has a history score of 500 and a science score of 30. A student differs by $+20$ history points and $+5$ science points. Which deviation is more unusual? We **cannot tell from the raw numbers alone**, because the two subjects may have entirely different standard deviations.

A univariate **standardized deviation** divides by its standard deviation. Multivariate analysis generalizes this idea to account for **both** different variances and covariance between the variables.

For a vector $\boldsymbol d=\bar{\boldsymbol x}-\boldsymbol{\mu}_0$, its squared covariance-adjusted distance is

$$D^2=\boldsymbol d^\mathsf T\boldsymbol S^{-1}\boldsymbol d.$$

Read from right to left: take the difference vector $\boldsymbol d$, multiply by the inverse covariance matrix to adjust for the joint spread, and combine the adjusted deviations into one nonnegative number. The inverse automatically accounts for correlated variables, so duplicated information is not simply double-counted.

**Small invented example for learning only:** If two uncorrelated variables have variances 4 and 9, and a mean profile differs by $(2,3)$, then

$$
\boldsymbol S^{-1}=\begin{bmatrix}1/4&0\\0&1/9\end{bmatrix},\qquad
D^2=\frac{2^2}{4}+\frac{3^2}{9}=1+1=2.
$$

Each component is exactly one standard deviation from the target. This made-up illustration is **not** one of the worksheet's datasets.

A sample mean is more precise when it is based on many independent observations. Therefore, for testing a **population mean vector**, we multiply this squared distance by $n$.

## 6. The logic of statistical inference and hypothesis testing

### 6.1 What is a hypothesis?

A **null hypothesis**, $H_0$, is a specific proposed statement, such as “the population mean score profile is $(500,50,30)$.” An **alternative hypothesis**, $H_1$, says the mean profile is different. A test asks whether the sample would be surprisingly far from the proposed profile **if the null were true**.

The logical sequence is:

1. Specify $H_0$ and $H_1$ before inspecting the result.
2. Choose significance level $\alpha$ such as 0.05.
3. Compute a test statistic from sample data.
4. Compare it with the appropriate mathematical reference distribution and obtain a $p$-value.
5. Reject $H_0$ if $p<\alpha$. Otherwise **fail to reject** $H_0$.
6. Interpret the finding in the original scientific or business context and discuss assumptions.

A **$p$-value** answers: “Assuming the null hypothesis and the model assumptions are true, how unusual would a statistic at least as extreme as this one be?” It is **not** the probability that the null is true.

### 6.2 What does $\alpha=0.05$ mean?

It means that a test has been calibrated to have a 5% chance of falsely rejecting a **true** null hypothesis if its assumptions hold. That is a *Type I error*. This is not a guarantee that 95% of conclusions are correct. Failing to reject can occur even when a null is false, especially for small samples. That is a *Type II error*.

### 6.3 One-sided and two-sided (more precisely: any-direction) questions

When the worksheet says $\boldsymbol{\mu}\ne\boldsymbol{\mu}_0$, it means **any component or combination of components can differ**. No single direction is specified. Hotelling's test uses a squared distance and therefore detects deviations in any direction.

## 7. Hotelling's one-sample $T^2$: comparing one mean vector with a claimed vector

For $n$ independent observations of $p$ variables, with sample mean $\bar{\boldsymbol x}$ and sample covariance $\boldsymbol S$, the statistic is

$$
\boxed{T^2=n(\bar{\boldsymbol x}-\boldsymbol{\mu}_0)^\mathsf T\boldsymbol S^{-1}(\bar{\boldsymbol x}-\boldsymbol{\mu}_0)}.
$$

**Every symbol matters:**

- $n$ counts observations.
- $\bar{\boldsymbol x}$ is the observed mean profile.
- $\boldsymbol{\mu}_0$ is the mean profile assumed under $H_0$.
- The subtraction makes a vector of differences.
- $\boldsymbol S^{-1}$ adjusts for scales and correlations.
- The two transposed/ordinary vector factors combine the information to one scalar.
- $T^2$ cannot be negative when $S$ is positive definite.

Under independent sampling from a **multivariate normal population**, if $n>p$ and $S$ is invertible,

$$
\boxed{F_{\mathrm{obs}}=\frac{n-p}{p(n-1)}T^2\sim F_{p,n-p}\quad\text{under }H_0.}
$$

The expression $\sim F_{p,n-p}$ means “has an $F$ distribution with numerator degrees of freedom $p$ and denominator degrees of freedom $n-p$.” We use `pf(Fobs, p, n-p, lower.tail=FALSE)` in R to calculate the upper-tail $p$-value.

**Why does $n-p$ matter?** We used the sample to estimate not only its mean but also several variance/covariance terms. Uncertainty in that estimated covariance changes the distribution relative to a situation in which the true covariance were known.

**Decision:** A sufficiently large value of $T^2$ (or of the corresponding $F$) indicates that the observed mean vector is farther from the null vector than random sampling would reasonably explain under the model.

### 7.1 Connection with confidence regions

A multivariate confidence region is an **ellipsoid** of possible mean vectors, rather than separate ordinary confidence intervals for each variable. At level $1-\alpha$, the region contains candidate vectors $\boldsymbol\mu$ satisfying

$$
n(\bar{\boldsymbol x}-\boldsymbol\mu)^\mathsf T\boldsymbol S^{-1}(\bar{\boldsymbol x}-\boldsymbol\mu)
\le \frac{p(n-1)}{n-p}F_{p,n-p;1-\alpha}.
$$

If the proposed $\boldsymbol\mu_0$ lies **outside** this ellipsoid, the corresponding $\alpha$-level Hotelling test rejects it. If it lies **inside**, the test does not reject it. The ellipsoid's directions and lengths depend on the covariances and variances, just as a tilted rugby ball depends on how observations spread together.

### 7.2 What could go wrong?

Check independent observations, suitable measurement scale, no influential error/outlier, approximate multivariate normality (particularly when $n$ is small), and nonsingular sample covariance. A large sample may make the test more tolerant of moderate nonnormality, but it does not cure biased sampling or arbitrary outliers.

## 8. Normal distributions, Q-Q plots and outliers

### 8.1 The bell-shaped normal distribution

A univariate normal distribution is a symmetric bell-shaped pattern described by a mean $\mu$ and variance $\sigma^2$. Close to its center values are relatively common; very far from it values are rare.

A **multivariate normal distribution** extends this idea to several variables at once. Its joint shape is described by a mean vector and covariance matrix. In two dimensions, regions of equal density are generally ellipses; in three, ellipsoids. If a vector is multivariate normal, each individual component and every fixed linear combination are normally distributed. **The reverse is not guaranteed**: each component looking normal does not prove the entire joint distribution is multivariate normal.

### 8.2 Normal Q-Q plot

A **quantile** is a value below which a stated fraction of observations falls. A Q-Q plot compares actual ordered values with what a normal distribution would predict at corresponding quantiles. If normality is roughly plausible, the plotted points lie close to a straight reference line. A strong curve, extreme departures at the ends, or isolated distant points can indicate skewness, heavy tails, or outliers.

In R, `qqnorm(x)` makes the graph and `qqline(x)` adds a reference line. Three variables require three **marginal Q-Q plots**. Two variables also need a scatterplot to examine their relationship.

### 8.3 Shapiro–Wilk normality test

`shapiro.test(x)` tests the null that the univariate observations come from a normal distribution. If the $p$-value is below the chosen $\alpha$, the data provide evidence **against** that normality model. A large $p$-value is not a proof of normality. Running three Shapiro tests does not itself test joint multivariate normality, and testing many variables separately introduces a multiple-testing issue.

### 8.4 A joint multivariate diagnostic

The squared Mahalanobis distance for observation $i$ is

$$d_i^2=(\boldsymbol x_i-\bar{\boldsymbol x})^\mathsf T\boldsymbol S^{-1}(\boldsymbol x_i-\bar{\boldsymbol x}).$$

Under multivariate normality, plotting ordered distances against chi-square reference quantiles can reveal unusual tails and observations. The chi-square reference is an **approximate graphical guide** when $\bar x$ and $S$ are estimated from the same sample, especially for small samples. Do not treat it as an exact outlier test or declare a fixed automatic deletion rule.

**Outlier** means a result that is unusually far from most others. Outliers might be mistakes, rare but genuine cases, or observations from another population. Always inspect the original records and scientific context before considering removal. Comparing with and without the suspected observation is a useful **sensitivity analysis**.

## 9. Paired and independent observations: a crucial design distinction

These designs can look similar in a table but require **different tests**.

- **Paired measurements:** The same effluent sample is tested by both laboratories. The two measurements from that sample belong together. We subtract laboratory B from laboratory A **within each sample** and use a *one-sample* Hotelling test on the resulting difference vectors.
- **Independent groups:** A female turtle and a male turtle are different animals. There is no natural matching. We compare **two independent group mean vectors** and estimate their joint within-group covariance.
- **Three or more independent groups:** Oil samples originate from three sandstone zones. We need **MANOVA**, an extension of the familiar analysis of variance that examines several outcomes simultaneously.

**Do not treat the effluent laboratories as independent samples.** That would discard the pairing and use an inappropriate standard error. Equally, do not treat female and male turtles as pairs merely because there are 24 in each group.

## 10. Paired Hotelling $T^2$

If the first and second laboratories measure the same $n$ objects on $p$ characteristics, define

$$\boldsymbol d_i=\boldsymbol x_{i,\mathrm A}-\boldsymbol x_{i,\mathrm B}.$$

The hypothesis of **equal population mean measurement vectors** becomes

$$H_0:\boldsymbol\mu_d=\boldsymbol 0,\qquad H_1:\boldsymbol\mu_d\ne\boldsymbol 0.$$

Apply the one-sample formula to the $n$ difference vectors:

$$T^2=n\bar{\boldsymbol d}^\mathsf T\boldsymbol S_d^{-1}\bar{\boldsymbol d},\qquad
F=\frac{n-p}{p(n-1)}T^2.$$

The **difference covariance** $S_d$ includes how the two laboratories' paired errors and values co-vary. A test of zero average difference is a test of **mean bias**, not a complete proof that two laboratories can safely be used interchangeably. True method agreement also involves how large the differences are for individual samples, which can be investigated with difference plots, limits of agreement, and application-specific tolerances.

## 11. Two independent multivariate populations: two-sample Hotelling test

Suppose group 1 has $n_1$ observations, group 2 has $n_2$, and both measure $p$ variables. We test

$$H_0:\boldsymbol\mu_1=\boldsymbol\mu_2,\qquad H_1:\boldsymbol\mu_1\ne\boldsymbol\mu_2.$$

The **pooled covariance estimate** assumes a common population covariance matrix and combines the two samples' separate within-group covariance estimates:

$$
\boldsymbol S_p=\frac{(n_1-1)\boldsymbol S_1+(n_2-1)\boldsymbol S_2}{n_1+n_2-2}.
$$

Why those weights? A sample variance uses $n-1$ degrees of freedom; a larger group generally supplies more reliable information about within-group variability.

Let $\boldsymbol\delta=\bar{\boldsymbol x}_1-\bar{\boldsymbol x}_2$. Then

$$
\boxed{T^2=\frac{n_1n_2}{n_1+n_2}\boldsymbol\delta^\mathsf T\boldsymbol S_p^{-1}\boldsymbol\delta}.
$$

For independent multivariate normal groups with a common covariance matrix:

$$
\boxed{F_{\mathrm{obs}}=\frac{n_1+n_2-p-1}{p(n_1+n_2-2)}T^2\sim F_{p,n_1+n_2-p-1}}.
$$

Notice the factors and degrees of freedom are **different from the one-sample formula**. Be careful not to interchange them.

If the two true covariance matrices are unequal, the pooled formula's exact reference distribution is generally invalid. Equal group sample sizes can help with some robustness issues but do not remove the assumption. Robust, permutation-based or heteroscedastic alternatives may be appropriate when violations are serious.

## 12. From ANOVA to MANOVA

### 12.1 Start with ordinary one-way ANOVA

Suppose you study test scores from three teaching methods. ANOVA asks whether the three group means are equal. Some score variation exists **within** methods because students differ. Other variation exists **between** methods because the methods might have different average effects.

ANOVA compares between-group variation with within-group variation. If the group means are far apart relative to the individual-level noise, the null hypothesis of equal group means becomes implausible.

### 12.2 MANOVA keeps several responses together

In Question 5, each crude-oil sample has **five chemical responses**, not just one. MANOVA asks whether the groups have the same **mean vector** across those five measurements jointly. It accounts for intercorrelations, such as iron and vanadium tending to move together or differently.

The one-way multivariate model is

$$\boldsymbol y_{ij}=\boldsymbol\mu+\boldsymbol\alpha_i+\boldsymbol\varepsilon_{ij},$$

where:

- $\boldsymbol y_{ij}$ is the $p$-variable measurement vector on observation $j$ in group $i$;
- $\boldsymbol\mu$ is an overall baseline mean vector;
- $\boldsymbol\alpha_i$ is group $i$'s multivariate deviation from that baseline;
- $\boldsymbol\varepsilon_{ij}$ is the residual deviation of this individual from its group's mean.

The scientific null hypothesis is

$$H_0:\boldsymbol\mu_1=\boldsymbol\mu_2=\cdots=\boldsymbol\mu_g.$$

In an effects-parameterization with the usual identifying constraint $\sum_i n_i\boldsymbol\alpha_i=\boldsymbol0$, the equivalent null is that all group effects are zero. **One or more** group means being different gives the alternative, not necessarily all three pairs being different.

### 12.3 MANOVA matrices $\boldsymbol W$, $\boldsymbol B$ and $\boldsymbol T$

Each multivariate counterpart of a sum of squares is a matrix because it must store both individual sums of squared deviations and sums of cross-products between different responses.

**Within-group / residual matrix:**

$$\boldsymbol W=\sum_{i=1}^{g}\sum_{j=1}^{n_i}(\boldsymbol y_{ij}-\bar{\boldsymbol y}_i)(\boldsymbol y_{ij}-\bar{\boldsymbol y}_i)^\mathsf T.$$

**Between-group / treatment matrix:**

$$\boldsymbol B=\sum_{i=1}^{g}n_i(\bar{\boldsymbol y}_i-\bar{\boldsymbol y})(\bar{\boldsymbol y}_i-\bar{\boldsymbol y})^\mathsf T.$$

**Total:**

$$\boxed{\boldsymbol T=\boldsymbol B+\boldsymbol W}.$$

For $p=2$, the diagonal entries concern variation in each response; the off-diagonal entries concern products of deviations involving both responses. A **negative cross-product** is perfectly possible. The MANOVA matrix is not a table of separate $F$ statistics.

If there are $N=\sum_i n_i$ observations and $g$ groups:

| Source | Matrix | Degrees of freedom |
|---|---|---:|
| Between groups / treatment | $\boldsymbol B$ | $g-1$ |
| Within groups / residual | $\boldsymbol W$ | $N-g$ |
| Total | $\boldsymbol T=\boldsymbol B+\boldsymbol W$ | $N-1$ |

**Why the sum is right:** $(g-1)+(N-g)=N-1$. This mirrors the decomposition of overall variability into group-mean differences and deviations within groups.

### 12.4 Wilks' lambda

The central statistic is

$$\boxed{\Lambda=\frac{|\boldsymbol W|}{|\boldsymbol B+\boldsymbol W|}}.$$

Here $|\cdot|$ means the **determinant**. For a two-by-two matrix:

$$\left|\begin{matrix}a&b\\c&d\end{matrix}\right|=ad-bc.$$

A determinant in covariance geometry relates to squared multidimensional spread or volume. Think of $W$ as remaining noise after accounting for group means and $B+W$ as total scatter. If group means explain an appreciable portion of multivariate variation, $\Lambda$ tends to be **small**. If group means explain little, it tends to be closer to **1**.

But “small” is not automatically “statistically significant.” You still need an $F$, chi-square or other reference comparison **with the correct sample size, numbers of groups and variables**.

### 12.5 Pillai's trace and other statistics

A MANOVA output may include several different tests of the same global null:

- **Wilks' lambda:** generally smaller when groups are more distinct.
- **Pillai's trace:** generally larger when groups are more distinct; can be preferable in some cases of assumption violation.
- **Hotelling–Lawley trace:** summarizes the relevant generalized characteristic roots.
- **Roy's largest root:** focuses on the strongest multivariate separation direction.

They can have different reference approximations and sensitivity. If their conclusions differ, investigate assumptions and the particular patterns detected rather than choosing whichever yields the desired decision.

### 12.6 MANOVA assumptions

Core assumptions for classical reference distributions:

1. Independent observations **within and between** groups (unless the design explicitly requires a repeated-measures model).
2. Approximately multivariate normal **within each group**. Normality of the pooled measurements is not enough.
3. A common within-population covariance matrix $\boldsymbol\Sigma$ across groups for the standard pooled model.
4. Sufficient observations relative to the number of responses, with an invertible residual matrix.
5. Properly measured variables, appropriate sample selection, and no unchecked gross errors or influential outliers.

Unequal group sizes combined with differing covariance matrices deserve special caution. A tiny group can yield highly unstable estimates when the response dimension is almost as large as its sample size.

### 12.7 Transformations

A positive measurement $x$ may be heavily right-skewed or show variability increasing with its average. A **log transformation**, $z=\log(x)$, compresses very large values more than small values. When zero is present, $\log(0)$ is undefined; $\log(1+x)$ is a common alternative for nonnegative measurements.

Transformations can improve normality or stabilize variation, but can also create other issues. They change the hypothesis to one about **transformed population means**, not identical to the original arithmetic means. A common invertible *linear* rescaling does not change Wilks' lambda; a nonlinear log transformation can.

---

# Part II – How to work in R

## 13. Reading and running R code from absolute zero

**R** is a programming language used to calculate statistical summaries and produce plots. **RStudio** is a convenient application in which to write and run R commands. The mathematics does not depend on RStudio specifically.

Open an R script (`File > New File > R Script`) or type into the Console. You can run one line at a time, and R displays requested results. Code inside this book uses only **base R** unless explicitly indicated, so it does not require installing statistical packages.

| R expression | Beginner interpretation |
|---|---|
| `x <- c(2, 5, 8)` | Make a vector named `x` containing 2, 5 and 8. The arrow assigns a value to a name. |
| `mean(x)` | Compute its arithmetic mean. |
| `var(x)` | Compute its sample variance with denominator $n-1$. |
| `sd(x)` | Compute its sample standard deviation. |
| `sum(x)` | Add its elements. |
| `length(x)` | Count its elements. |
| `X <- cbind(a,b)` | Put vectors `a` and `b` side by side as matrix columns. |
| `colMeans(X)` | Compute mean of every matrix column. |
| `cov(X)` | Compute sample covariance matrix, dividing by $n-1$. |
| `cor(X)` | Compute sample correlation matrix. |
| `solve(S)` | Find the inverse of an invertible matrix $S$. |
| `solve(S,d)` | Solve $S\boldsymbol z=\boldsymbol d$ directly, often numerically preferable to forming the full inverse. |
| `t(X)` | Transpose a matrix. |
| `%*%` | Matrix multiplication, **not** ordinary elementwise multiplication. |
| `crossprod(x,y)` | Compute $x^\mathsf T y$ efficiently. |
| `det(S)` | Compute a matrix determinant. |
| `sqrt(4)` | Calculate square root. |
| `pf(v,a,b,lower.tail=FALSE)` | Upper-tail probability for $F_{a,b}$ above $v$. |
| `qf(.95,a,b)` | 95th percentile of $F_{a,b}$, the 5% upper critical point. |
| `pchisq(v,k,lower.tail=FALSE)` | Upper-tail chi-square probability. |
| `qqnorm(x); qqline(x)` | Draw a normal Q-Q plot and its reference line. |
| `shapiro.test(x)` | Shapiro–Wilk test of marginal normality. |
| `plot(x,y)` | Draw a scatterplot. |

### 13.1 Where to put the `.DAT` files

Save the uploaded files to the folder where you keep the R script, retaining their actual names:

- `T5-2(1).DAT`
- `T6-9(1).dat`
- `T11-7(1).DAT`

If your working directory is different, either set it with `setwd("YOUR/FOLDER/PATH")` (replace the example path with your actual one), use the full filename path, or select the file interactively using `file.choose()`. File names are case-sensitive on some operating systems.

The uploaded files are **whitespace-delimited, with no header row**. Therefore, they should be read using `read.table(..., header=FALSE)`, not `read.csv()` with its comma default and not `header=TRUE` (which would accidentally treat the first data row as column names). The first two datasets have numerical columns, and the turtle and oil datasets also have a final text **group label**.

### 13.2 A reusable one-sample Hotelling function

```r
hotelling_one <- function(X, mu0, alpha = 0.05) {
  X <- as.matrix(X)
  storage.mode(X) <- "double"
  n <- nrow(X)
  p <- ncol(X)
  stopifnot(n > p, length(mu0) == p)

  xbar <- colMeans(X)
  S <- cov(X)
  difference <- xbar - mu0
  T2 <- n * drop(crossprod(difference, solve(S, difference)))
  Fobs <- (n - p) * T2 / (p * (n - 1))
  p_value <- pf(Fobs, df1 = p, df2 = n - p,
                lower.tail = FALSE)
  Fcrit <- qf(1 - alpha, df1 = p, df2 = n - p)

  list(n = n, p = p, mean = xbar, covariance = S,
       difference = difference, T2 = T2,
       F = Fobs, df1 = p, df2 = n-p,
       p_value = p_value, critical_F = Fcrit,
       reject_H0 = (p_value < alpha))
}
```

Read the lines in groups. `function(...)` defines a reusable procedure. `nrow` and `ncol` find the sample size and number of variables; `stopifnot` prevents common input errors. `colMeans` and `cov` produce the two main sample quantities. `difference` computes the average displacement from the null. `solve(S,difference)` computes $S^{-1}d$ without requiring you to multiply individual matrix elements. `crossprod` performs $d^\mathsf TS^{-1}d$. Then the code converts $T^2$ to its $F$ form and calculates the upper-tail p-value. Finally it returns a **named list**, so `result$p_value` means “take the p-value entry from the result.”

**Never interpret `solve(S)` as taking reciprocals of the individual entries**, and never replace `S` by a correlation matrix without also transforming the mean differences consistently.

### 13.3 Plotting multiple variables

```r
par(mfrow = c(1, 3))
qqnorm(X[, 1], main = "Variable 1"); qqline(X[, 1])
qqnorm(X[, 2], main = "Variable 2"); qqline(X[, 2])
qqnorm(X[, 3], main = "Variable 3"); qqline(X[, 3])
par(mfrow = c(1, 1))
```

`X[,1]` means “all rows, first column”; `par(mfrow=c(1,3))` divides the plotting space into one row with three panels; `main=` is the title. The final `par` restores one plot per page. Plotting functions generally display graphs, not numbers in the Console.

---

---

# Question 1 – College examination scores

**Source:** `PQ5.pdf`, page 1. **Source-supplied worked answer:** none. **Numerical solution below:** independently computed from `T5-2(1).DAT`.

## Original question

> The scores obtained by $n=87$ college students on the College Level Examination Program for $X_1=$ social science and history, $X_2=$ verbal, and $X_3=$ science are given in the `T5-2.dat` file.
>
> **Table 1: College test data** (the original worksheet shows the beginning and end of the complete dataset)
>
> | Individual | $X_1$ | $X_2$ | $X_3$ |
> |---:|---:|---:|---:|
> | 1 | 468 | 41 | 26 |
> | 2 | 428 | 39 | 26 |
> | 3 | 514 | 53 | 21 |
> | $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ |
> | 85 | 474 | 41 | 16 |
> | 86 | 441 | 47 | 26 |
> | 87 | 607 | 67 | 32 |
>
> **(a)** Test the null hypothesis $H_0:\boldsymbol\mu^\mathsf T=[500,50,30]$ versus $H_1:\boldsymbol\mu^\mathsf T\ne[500,50,30]$ at the $\alpha=0.05$ level of significance. Suppose $[500,50,30]^\mathsf T$ represent average scores for thousands of college students over the last 10 years. Is there reason to believe that the group of students represented by the scores in `T5-2.dat` file is scoring differently? Explain.
>
> **(b)** Construct Q-Q plots from the marginal distributions of social science and history, verbal, and science scores. Also, construct the three possible scatter diagrams from the pairs of observations on different variables. Do these data appear to be normally distributed? Discuss.

### 1(a). What is the question really asking?

The historical average student scored 500 in the first subject, 50 in the second, and 30 in the third. Our 87 students have their own average profile. We want to decide whether the differences between these two profiles are **too large to attribute comfortably to ordinary sampling variability**. Each score has its own scale; in addition, some students who do well in one subject tend to do well in another. So the correct comparison is not merely the raw total difference or three separate unrelated tests.

We use a **one-sample Hotelling $T^2$ test**, because there is one group of 87 students, three measured responses, and a single historical population mean vector that we want to test.

### Step 1. Identify all parts of the problem

$$
n=87,\qquad p=3,\qquad \alpha=0.05,\qquad
\boldsymbol\mu_0=\begin{bmatrix}500\\50\\30\end{bmatrix}.
$$

The population hypothesis is

$$
H_0:\boldsymbol\mu=\begin{bmatrix}500\\50\\30\end{bmatrix},\qquad
H_1:\boldsymbol\mu\ne\begin{bmatrix}500\\50\\30\end{bmatrix}.
$$

The alternative does **not** say that all three scores must be different. A difference in any component, or a suitable combination of components, can produce rejection.

### Step 2. Calculate the sample mean vector

From the 87 rows of the actual uploaded file, the three column totals are:

$$\sum_i x_{i1}=45{,}813,\qquad \sum_i x_{i2}=4{,}758,\qquad \sum_i x_{i3}=2{,}186.$$

Therefore,

$$
\bar x_1=\frac{45813}{87}=526.586207,\qquad
\bar x_2=\frac{4758}{87}=54.689655,\qquad
\bar x_3=\frac{2186}{87}=25.126437.
$$

As a column vector,

$$
\boxed{\bar{\boldsymbol x}=\begin{bmatrix}
526.586207\\54.689655\\25.126437
\end{bmatrix}.}
$$

**Interpretation before testing:** This sample is on average **26.59 points higher** in history/social science, **4.69 points higher** in verbal, and **4.87 points lower** in science than the three historical benchmarks. The signs describe *direction*, but the size and statistical significance of these differences cannot be judged without looking at variation and correlation.

### Step 3. Calculate the sample covariance matrix

For example, the variance of the first subject is

$$s_{11}=\frac{1}{86}\sum_{i=1}^{87}(x_{i1}-526.586207)^2=5808.059342.$$

The covariance of the first and second subjects is

$$s_{12}=\frac{1}{86}\sum_{i=1}^{87}(x_{i1}-526.586207)(x_{i2}-54.689655)=597.835204.$$

Repeating this for all pairs produces

$$
\boxed{\boldsymbol S\approx\begin{bmatrix}
5808.059342&597.835204&222.029671\\
597.835204&126.053729&23.388532\\
222.029671&23.388532&23.111735
\end{bmatrix}.}
$$

These values have quite different magnitudes because the test-score scales are different. That is exactly why covariance adjustment is necessary.

### Step 4. Subtract the historical mean

$$
\boldsymbol d=\bar{\boldsymbol x}-\boldsymbol\mu_0
=\begin{bmatrix}526.586207-500\\54.689655-50\\25.126437-30\end{bmatrix}
=\boxed{\begin{bmatrix}26.586207\\4.689655\\-4.873563\end{bmatrix}}.
$$

Notice the negative sign on the science component. Dropping it would change the multivariate distance and might change the test.

### Step 5. Perform the covariance-adjusted matrix calculation

We need $\boldsymbol d^\mathsf T\boldsymbol S^{-1}\boldsymbol d$. Instead of hand-inverting a $3\times3$ matrix, it is clearer and numerically safer to first solve

$$\boldsymbol S\boldsymbol z=\boldsymbol d.$$

The independently computed solution is approximately

$$\boldsymbol z=\boldsymbol S^{-1}\boldsymbol d\approx\begin{bmatrix}
0.016560388\\0.033619521\\-0.403984041
\end{bmatrix}.$$

Take the dot product with $\boldsymbol d$:

$$
\begin{aligned}
\boldsymbol d^\mathsf T\boldsymbol z
&=(26.586207)(0.016560388)
 +(4.689655)(0.033619521)
 +(-4.873563)(-0.403984041)\\
&\approx 2.566783629.
\end{aligned}
$$

In the third product, two negative numbers multiply to give a positive contribution. The components of a matrix-adjusted distance are **not simply three independent squared z-scores** when covariances are nonzero.

### Step 6. Compute Hotelling's $T^2$

$$
\boxed{T^2=n\boldsymbol d^\mathsf T\boldsymbol S^{-1}\boldsymbol d
=87(2.566783629)=223.310176.}
$$

This number is large, but we must still compare it with a reference distribution rather than deciding solely by appearance.

### Step 7. Convert to an $F$ statistic

For $p=3$ and $n=87$:

$$
\begin{aligned}
F_{\mathrm{obs}}
&=\frac{n-p}{p(n-1)}T^2\\
&=\frac{87-3}{3(87-1)}(223.310176)\\
&=\frac{84}{258}(223.310176)\\
&=\boxed{72.705639}.
\end{aligned}
$$

Degrees of freedom: **$3$ and $84$**, so under $H_0$ the statistic follows $F_{3,84}$ when the model assumptions hold.

From the actual calculation:

$$p\text{-value}\approx 2.83\times 10^{-23}.$$

The 5% upper critical value is approximately $F_{3,84;0.95}=2.713227$. Our observed 72.706 is much larger. In the original $T^2$ scale, the corresponding critical value is $8.333483$, far below 223.310.

### Step 8. Give the decision in simple language

**Independently calculated conclusion:** **Reject $H_0$ at $\alpha=0.05$.** These 87 students have a joint average score profile that differs statistically from the historical average profile $[500,50,30]^\mathsf T$.

We can say the **sample means** are higher in the first two subjects and lower in science, but the Hotelling test itself is a **joint test**. It is not, on its own, a series of separate inferential claims that each population subject mean differs significantly. We would investigate components with follow-up procedures if that were required.

**A responsible qualification:** The benchmark reportedly summarizes students over ten years. If it is an estimated mean rather than a known population mean, its uncertainty may need to be accounted for in a more elaborate comparison. The conventional one-sample calculation here treats the stated vector as fixed, as the exercise instructs.

### Reproducible R for Question 1(a)

```r
college <- read.table("T5-2(1).DAT", header = FALSE,
                      col.names = c("History", "Verbal", "Science"))
X <- as.matrix(college)

nrow(X)            # 87 observations
ncol(X)            # 3 response variables
colSums(X)         # 45813, 4758, 2186
colMeans(X)        # observed mean vector
cov(X)             # observed sample covariance matrix

mu0 <- c(500, 50, 30)
d <- colMeans(X) - mu0
S <- cov(X)
T2 <- nrow(X) * drop(crossprod(d, solve(S, d)))
Fobs <- (nrow(X) - ncol(X)) * T2 /
        (ncol(X) * (nrow(X) - 1))
p_value <- pf(Fobs, df1 = 3, df2 = 84, lower.tail = FALSE)
critical_F <- qf(0.95, df1 = 3, df2 = 84)

T2                 # approximately 223.310176
Fobs               # approximately 72.705639
p_value            # approximately 2.83e-23
critical_F         # approximately 2.713227
```

**How to interpret this output:** `colMeans` describes what was observed; `cov` describes the spread and co-movement. `T2` combines displacement and spread. `Fobs` places $T^2$ on its valid reference scale. `p_value` supplies the actual decision, and `critical_F` demonstrates the equivalent rejection rule. Scientific notation `2.83e-23` means $2.83\times10^{-23}$, an extremely small positive number, not a negative probability.

## Question 1(b). Check the normality assumption visually

### What exactly should we draw?

There are **three individual variables**, so we need three normal Q-Q plots:

1. History/social-science score;
2. Verbal score;
3. Science score.

There are exactly three distinct pairs of variables, since $\binom{3}{2}=3$:

1. History versus verbal;
2. History versus science;
3. Verbal versus science.

A scatterplot puts one variable on the horizontal axis and another on the vertical axis. Each dot represents **one student**, so the coordinates from a row must stay paired. Scatterplots help identify association, unusual observations, curved relationships, groupings and the approximate shape of the joint cloud.

### R code for all six required plots

```r
par(mfrow = c(2, 3))

qqnorm(college$History, main = "Q-Q: History")
qqline(college$History, col = "red")

qqnorm(college$Verbal, main = "Q-Q: Verbal")
qqline(college$Verbal, col = "red")

qqnorm(college$Science, main = "Q-Q: Science")
qqline(college$Science, col = "red")

plot(college$History, college$Verbal,
     xlab = "History", ylab = "Verbal",
     main = "History vs verbal")
plot(college$History, college$Science,
     xlab = "History", ylab = "Science",
     main = "History vs science")
plot(college$Verbal, college$Science,
     xlab = "Verbal", ylab = "Science",
     main = "Verbal vs science")

par(mfrow = c(1, 1))
```

**New syntax:** The dollar sign in `college$Verbal` selects the column named `Verbal`. `col="red"` controls the color of the *reference line only*. `xlab` and `ylab` label the axes. These graphs are generated when the program is run in R; the Markdown file does not pretend that it contains an image output from an R session.

### Independently calculated numerical diagnostics

The Shapiro–Wilk results for the actual uploaded observations are:

| Marginal variable | Shapiro–Wilk $W$ | $p$-value | Decision at 5% |
|---|---:|---:|---|
| History/social science | 0.9891 | 0.6861 | Do not reject marginal normality |
| Verbal | 0.9697 | 0.0387 | Reject marginal normality |
| Science | 0.9869 | 0.5358 | Do not reject marginal normality |

The correlations between the actual score pairs are approximately:

$$
\boldsymbol R=\begin{bmatrix}
1&0.6987&0.6060\\
0.6987&1&0.4333\\
0.6060&0.4333&1
\end{bmatrix}.
$$

All three associations are **positive**: students with higher scores on one test tended, to different degrees, to have higher scores on the other tests. This is not a proof of a causal relationship.

In the sample, observation **50** has scores $(501,25,26)$ and the largest sample Mahalanobis squared distance, about **11.754**. It is worth inspecting rather than automatically deleting.

```r
sapply(college, shapiro.test)
cor(college)

D2 <- mahalanobis(X, center = colMeans(X), cov = cov(X))
which.max(D2)
max(D2)
plot(qchisq(ppoints(nrow(X)), df = ncol(X)), sort(D2),
     xlab = "Reference chi-square quantiles",
     ylab = "Ordered squared Mahalanobis distances",
     main = "Joint normality diagnostic")
abline(0, 1, col = "red")
```

`mahalanobis` computes the squared covariance-adjusted distance of each row from the sample mean. `which.max` tells you which observation had the largest distance, while `sort` orders them for the diagnostic display. Because center and covariance are estimated from the same data, the chi-square graph is **diagnostic**, not an exact calibration of each outlier's probability.

### Final answer for Question 1(b)

**Independently supported assessment:** The two marginal score distributions for history and science are fairly compatible with normality by Shapiro–Wilk, but **verbal shows a statistically detectable departure** at the 5% level ($p\approx0.0387$). The scatterplots should show positive relationships rather than completely independent-looking clouds. It would be inaccurate to claim that the data are conclusively multivariate normal, since marginal normality alone does not establish that property, and one of the three marginals already raises a caution.

That said, the sample size of 87 is much larger than the number of variables (three), and the rejection in 1(a) is extremely decisive. Moderate marginal nonnormality is unlikely to overturn the broad finding on its own, although the quality of sampling and possible influential observations should still be checked.

**Common mistakes:** Interpreting $p=0.0387$ as a 3.87% probability of normality, declaring all three marginals normal because two p-values exceed 0.05, and mistaking a positive scatterplot trend for proof of causation.

---

# Question 2 – Minerals in ancient Peruvian hair

**Source:** `PQ5.pdf`, page 2. **Source-supplied worked answer:** none. All nine measurements come from the PDF itself.

## Original question

> A physical anthropologist performed a mineral analysis of nine ancient Peruvian hairs. The results for the chromium ($x_1$) and strontium ($x_2$) levels, in parts per million (ppm), were as follows:
>
> **Table 2: Ancient Peruvian hair data**
>
> | Variable | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
> |---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
> | $x_1$ (chromium) | 0.48 | 40.53 | 2.19 | 0.55 | 0.74 | 0.66 | 0.93 | 0.37 | 0.22 |
> | $x_2$ (strontium) | 12.57 | 73.68 | 11.13 | 20.03 | 20.29 | 0.78 | 4.64 | 0.43 | 1.08 |
>
> It is known that low levels (less than or equal to $0.100$ ppm) of chromium suggest the presence of diabetes, while strontium is an indication of animal protein intake.
>
> **(a)** Is $[0.30,10]^\mathsf T$ a plausible value for the population mean vector $\boldsymbol\mu$? Assume that these nine Peruvian hairs represent a random sample from individuals belonging to a particular ancient Peruvian culture.
>
> **(b)** Do these data appear to be bivariate normal? Discuss their status with reference to Q-Q plots and a scatter diagram. If the data are not bivariate normal, what implications does this have for the results in Part (a)?
>
> **(c)** Repeat the analysis with the obvious “outlying” observation removed. Do the inferences change? Comment.

## Question 2(a). Is the proposed mean plausible?

### Read the scientific question carefully

We have **one sample of nine** archaeological observations, each containing **two** elemental concentrations. We want to assess a specified **population mean vector**, not diagnose any individual. Therefore the appropriate conventional procedure is a **one-sample, two-variable Hotelling test**.

The biomedical and dietary descriptions motivate interest in these variables. However, no statistical calculation here can establish that an ancient person had diabetes or quantify their animal protein intake; the worksheet's comments are context, not a validated diagnostic model for these observations.

Choose $\alpha=0.05$ as an explicit working convention because Question 2 does not specify it.

### Step 1. State the hypotheses and dimensions

$$
n=9,\quad p=2,\quad \boldsymbol\mu_0=\begin{bmatrix}0.30\\10\end{bmatrix},
\quad H_0:\boldsymbol\mu=\boldsymbol\mu_0,
\quad H_1:\boldsymbol\mu\ne\boldsymbol\mu_0.
$$

The units of the proposed values are **parts per million**. The first refers to chromium and the second to strontium. If you reverse the variables, you must also reverse the vector and corresponding matrix rows/columns.

### Step 2. Compute sample means, retaining the outlier initially

The chromium sum is $46.67$ ppm; the strontium sum is $144.63$ ppm. Thus:

$$\bar x_1=\frac{46.67}{9}=5.185556,\qquad
\bar x_2=\frac{144.63}{9}=16.070000.$$

$$\boxed{\bar{\boldsymbol x}=\begin{bmatrix}5.185556\\16.070000\end{bmatrix}.}$$

Notice the **40.53** chromium measurement in observation 2. That single number is much larger than the other eight chromium values; it drastically raises the mean. Nevertheless, we do **not** quietly discard it in part (a), because part (c) explicitly asks us to investigate removal separately.

### Step 3. Calculate sample covariance

Using the familiar formulas from the foundations, with divisor $n-1=8$:

$$
\boxed{\boldsymbol S\approx\begin{bmatrix}
176.004178&287.241200\\
287.241200&527.849300
\end{bmatrix}.}
$$

The positive covariance means samples with more chromium tend also to have more strontium in this dataset. But this correlation may be dominated by one extreme point, as we will see.

### Step 4. Construct the difference and Hotelling statistic

$$
\boldsymbol d=\bar{\boldsymbol x}-\boldsymbol\mu_0
=\begin{bmatrix}5.185556-0.30\\16.07-10\end{bmatrix}
=\begin{bmatrix}4.885556\\6.070000\end{bmatrix}.
$$

Solving $S\boldsymbol z=\boldsymbol d$ gives

$$\boldsymbol z\approx\begin{bmatrix}0.0803452\\-0.0322222\end{bmatrix}.$$

Then

$$
\begin{aligned}
T^2&=9\boldsymbol d^\mathsf T\boldsymbol z\\
&=9\left[(4.885556)(0.0803452)+(6.07)(-0.0322222)\right]\\
&\approx\boxed{1.772481}.
\end{aligned}
$$

A negative term is allowed *inside* the dot product because the covariance adjustment accounts for shared directions of variation. The total quadratic distance remains nonnegative.

### Step 5. Convert to $F$ and decide

$$
F=\frac{9-2}{2(9-1)}(1.772481)
=\frac{7}{16}(1.772481)
=\boxed{0.775461}.
$$

Under the multivariate-normal assumption, $F\sim F_{2,7}$. The upper-tail result is

$$p\approx\boxed{0.49636}.$$

For comparison, the 5% upper critical value is $F_{2,7;0.95}\approx4.7374$, much larger than the observed 0.7755.

**Independently calculated conclusion:** At the chosen $\alpha=0.05$, **fail to reject** the proposed population mean vector $(0.30,10)^\mathsf T$. The mean vector is *statistically plausible in the narrow testing sense*; we have not shown that it is the true population mean.

**Important qualification:** The sample is extremely small ($n=9$), and its likely nonnormality makes the theoretical $F$ calibration doubtful. Therefore this failure to reject is a **fragile descriptive result**, not strong evidence for the historical claim. The huge value 40.53 greatly inflates the estimated variance; a big mean difference can coexist with a weak standardized test statistic when estimated spread is enormous.

### Reproducible R

```r
chromium <- c(0.48, 40.53, 2.19, 0.55, 0.74,
              0.66, 0.93, 0.37, 0.22)
strontium <- c(12.57, 73.68, 11.13, 20.03, 20.29,
               0.78, 4.64, 0.43, 1.08)
hair <- cbind(Chromium = chromium, Strontium = strontium)

colSums(hair)
colMeans(hair)
cov(hair)

mu0 <- c(0.30, 10)
result_all <- hotelling_one(hair, mu0, alpha = 0.05)
result_all$T2
result_all$F
result_all$p_value
```

`c(...)` lists the nine measured values in their original order. `cbind` creates a matrix with chromium and strontium as columns, so row 2 is correctly $(40.53,73.68)$ rather than two unrelated values. The custom function from Part II returns the one-sample test result.

## Question 2(b). Is bivariate normality plausible?

**Bivariate** means “two variables jointly.” A bivariate normal distribution produces an elliptical, smoothly concentrated scatter pattern. A point enormously distant in the upper-right corner may break that pattern even if a few other observations happen to lie roughly on a line.

### Step 1. Make the two required Q-Q plots and the scatterplot

```r
par(mfrow = c(1, 3))
qqnorm(hair[, "Chromium"], main = "Chromium normal Q-Q")
qqline(hair[, "Chromium"], col = "red")

qqnorm(hair[, "Strontium"], main = "Strontium normal Q-Q")
qqline(hair[, "Strontium"], col = "red")

plot(hair[, "Chromium"], hair[, "Strontium"],
     xlab = "Chromium (ppm)", ylab = "Strontium (ppm)",
     main = "Joint scatterplot")
text(hair[, 1], hair[, 2], labels = seq_len(nrow(hair)),
     pos = 3, cex = 0.7)
par(mfrow = c(1, 1))
```

The final `text` call labels every plotted point by its row number. `seq_len(nrow(hair))` generates the numbers 1 through 9. This is especially helpful for identifying **observation 2**, the suspected outlier.

### Step 2. Examine calculated diagnostics

| Diagnostic, all nine observations | Chromium | Strontium |
|---|---:|---:|
| Shapiro–Wilk $W$ | 0.4238 | 0.6894 |
| Shapiro–Wilk $p$-value | $8.08\times10^{-7}$ | 0.001067 |
| Sample skewness (descriptive) | about 2.99 | about 2.37 |

The sample correlation is about **0.9424**, extraordinarily high, but it is heavily influenced by the one sample with both concentrations large.

Both Shapiro p-values are well below 0.05, showing strong evidence **against normal marginal distributions**. Because multivariate normality requires every marginal to be normal, the bivariate normal model is **not credible** for the unmodified nine observations.

In a plotted scatter diagram, observation 2 lies far toward the upper-right, with both chromium and strontium unusually high. The two normal Q-Q plots should show strong upper-tail departures instead of a neat straight-line pattern.

```r
shapiro.test(hair[, "Chromium"])
shapiro.test(hair[, "Strontium"])
cor(hair)

D2 <- mahalanobis(hair, colMeans(hair), cov(hair))
round(D2, 4)
which.max(D2)
```

The greatest sample Mahalanobis squared distance is approximately **7.0978** for observation 2. Note that such distances use the covariance computed **including** the possible outlier, so an extreme point can also distort the very yardstick used to judge extremeness.

### Step 3. Explain the implication for part (a)

The exact Hotelling $F_{2,7}$ reference distribution assumes a bivariate normal population (along with independence and other conditions). Strong nonnormality plus a tiny sample can make that distribution **unreliable**. Therefore the numerical $p\approx0.496$ is what the **classical formula outputs**, not necessarily a well-calibrated probability for these particular data.

Do not write “Hotelling's test proves the data are normal” or “the p-value is valid even though the assumptions fail.” The appropriate interpretation is that the classical calculation does not reject, but its inferential reliability is limited and must be checked by sensitivity analysis and, if scientifically justified, more robust methods.

## Question 2(c). Remove the obvious outlying observation and repeat

### Step 1. Make the exclusion explicit and reproducible

The unusually large pair is **observation 2: $(40.53,73.68)$**. Remove **both coordinates from that same row**, not just chromium or just strontium.

The remaining eight pairs are:

$$
(0.48,12.57),\ (2.19,11.13),\ (0.55,20.03),\ (0.74,20.29),
\ (0.66,0.78),\ (0.93,4.64),\ (0.37,0.43),\ (0.22,1.08).
$$

### Step 2. Recalculate the mean and covariance on all eight retained rows

New totals are chromium $6.14$ and strontium $70.95$, so

$$
\bar{\boldsymbol x}_{(-2)}=\begin{bmatrix}6.14/8\\70.95/8\end{bmatrix}
=\boxed{\begin{bmatrix}0.767500\\8.868750\end{bmatrix}}.
$$

Using divisor $8-1=7$:

$$
\boxed{\boldsymbol S_{(-2)}\approx\begin{bmatrix}
0.378564&1.030282\\
1.030282&69.859755
\end{bmatrix}.}
$$

The covariance and first-variable variance fall enormously when the extreme observation is removed. The remaining sample correlation is approximately **0.2003**, not 0.9424. This is a striking reminder that one observation can dominate a correlation.

### Step 3. Recompute the test from scratch

The new difference is

$$
\boldsymbol d_{(-2)}=\begin{bmatrix}0.7675-0.30\\8.86875-10\end{bmatrix}
=\begin{bmatrix}0.4675\\-1.13125\end{bmatrix}.
$$

Solving $S_{(-2)}\boldsymbol z=d_{(-2)}$ gives approximately

$$\boldsymbol z=\begin{bmatrix}1.332481\\-0.035844\end{bmatrix}.$$

Then

$$
\begin{aligned}
T^2_{(-2)}&=8\boldsymbol d_{(-2)}^\mathsf T\boldsymbol S_{(-2)}^{-1}\boldsymbol d_{(-2)}\\
&=8\left[(0.4675)(1.332481)+(-1.13125)(-0.035844)\right]\\
&\approx\boxed{5.307872},\\
F_{(-2)}&=\frac{8-2}{2(8-1)}T^2_{(-2)}
=\frac6{14}(5.307872)
\approx\boxed{2.274802}.
\end{aligned}
$$

Here the reference has degrees of freedom **$F_{2,6}$**, not $F_{2,7}$, because we now have eight observations. Its $p$-value is approximately **0.18397**.

### Step 4. Compare the inferences accurately

| Quantity | All 9 observations | With row 2 removed (8 observations) |
|---|---:|---:|
| Mean chromium (ppm) | 5.1856 | 0.7675 |
| Mean strontium (ppm) | 16.0700 | 8.8688 |
| Chromium sample variance | 176.0042 | 0.3786 |
| Strontium sample variance | 527.8493 | 69.8598 |
| Correlation | 0.9424 | 0.2003 |
| Hotelling $T^2$ | 1.7725 | 5.3079 |
| Converted $F$ | 0.7755, df $(2,7)$ | 2.2748, df $(2,6)$ |
| $p$-value | 0.4964 | 0.1840 |
| Decision at 5% | Fail to reject | Fail to reject |

**Independently calculated conclusion:** **The binary decision does not change** at $\alpha=0.05$: the proposed mean vector is not rejected in either analysis. But the mean, covariance, correlation and p-value change materially, showing strong sensitivity to that one observation.

### Step 5. Recheck normality after deletion

For the retained eight observations, the univariate Shapiro p-values are approximately **0.0110** for chromium and **0.1148** for strontium. The chromium distribution still has a pronounced upper-tail value, **2.19** relative to the other retained chromium observations; removal of the most extreme observation does **not** make the remaining data automatically bivariate normal.

```r
hair_no_outlier <- hair[-2, , drop = FALSE]

colMeans(hair_no_outlier)
cov(hair_no_outlier)
cor(hair_no_outlier)

result_no_outlier <- hotelling_one(hair_no_outlier, c(0.30, 10))
result_no_outlier$T2
result_no_outlier$F
result_no_outlier$p_value

par(mfrow = c(1, 3))
qqnorm(hair_no_outlier[, 1]); qqline(hair_no_outlier[, 1])
qqnorm(hair_no_outlier[, 2]); qqline(hair_no_outlier[, 2])
plot(hair_no_outlier[, 1], hair_no_outlier[, 2],
     xlab = "Chromium", ylab = "Strontium")
par(mfrow = c(1, 1))
sapply(as.data.frame(hair_no_outlier),
       function(column) shapiro.test(column)$p.value)
```

A minus sign in `hair[-2, , drop=FALSE]` instructs R to remove row 2. The blank position after the second comma means “retain **all columns**.” `drop=FALSE` ensures the result is kept as a two-column matrix even in edge cases.

**Scientific caveat:** Deleting an outlier merely to make a p-value desirable is not acceptable. The correct reasoning is to examine whether the original measurement is trustworthy and report both analyses, as this worksheet explicitly asks. Nine hairs may also fail to be nine *independent individuals* if several came from the same person; the question assumes they are a random sample of individuals, and the inference depends on that assumption.

---

# Question 3 – Two laboratories and an effluent outlier

**Source:** `PQ5.pdf`, page 2. **Required external data:** 11-row effluent Table 6.1, provided in this conversation from `Lec8.pdf`. **Source-supplied worked answer:** none.

## Original question

> The data corresponding to sample 8 in Table 6.1: Effluent data seem unusually large (refer, lecture note on “Comparisons of several multivariate means”). Remove sample 8 and test if the two laboratories’ chemical analyses agree. Does the “outlier” make a difference in the analysis of these data?

## Original external Table 6.1: Effluent data (supplied)

The two characteristics are biochemical oxygen demand (**BOD**) and suspended solids (**SS**), measured on the **same 11 effluent samples** by a commercial laboratory and by the State Lab of Hygiene.

| Sample | Commercial BOD | Commercial SS | State BOD | State SS |
|---:|---:|---:|---:|---:|
| 1 | 6 | 27 | 25 | 15 |
| 2 | 6 | 23 | 28 | 13 |
| 3 | 18 | 64 | 36 | 22 |
| 4 | 8 | 44 | 35 | 29 |
| 5 | 11 | 30 | 15 | 31 |
| 6 | 34 | 75 | 44 | 64 |
| 7 | 28 | 26 | 42 | 30 |
| 8 | 71 | 124 | 54 | 64 |
| 9 | 43 | 54 | 34 | 56 |
| 10 | 33 | 30 | 29 | 20 |
| 11 | 20 | 14 | 39 | 21 |

The table is reproduced exactly as supplied, not reconstructed from memory or invented.

## Why this is a *paired* test

The columns are not four independent groups. They describe two laboratories measuring **the same effluent sample**. For instance, sample 1 has commercial values $(6,27)$ and state values $(25,15)$. We can subtract directly because the sample is the same physical material.

If we compared the laboratory means without recognizing pairing, we would throw away useful information about how both laboratories respond to the same samples. Instead, define for every sample

$$
\boldsymbol d_i=
\begin{bmatrix}
\text{Commercial BOD}_i-\text{State BOD}_i\\
\text{Commercial SS}_i-\text{State SS}_i
\end{bmatrix}.
$$

Then test if the population mean of these **two differences** equals zero.

$$
H_0:\boldsymbol\mu_d=\begin{bmatrix}0\\0\end{bmatrix},\qquad
H_1:\boldsymbol\mu_d\ne\begin{bmatrix}0\\0\end{bmatrix}.
$$

Here $n=11$ original paired samples and $p=2$ outcomes. Because the source does not provide a significance level, use the explicitly selected **5% level**.

## Step 1. Compute the paired difference table

Subtract the state laboratory result from the commercial result for *each* measurement:

| Sample | Difference in BOD | Difference in SS | Explanation |
|---:|---:|---:|---|
| 1 | $6-25=-19$ | $27-15=12$ | Commercial measures lower BOD, higher SS |
| 2 | $6-28=-22$ | $23-13=10$ | Same direction |
| 3 | $18-36=-18$ | $64-22=42$ | Large positive SS difference |
| 4 | $8-35=-27$ | $44-29=15$ | Large negative BOD difference |
| 5 | $11-15=-4$ | $30-31=-1$ | Differences both negative |
| 6 | $34-44=-10$ | $75-64=11$ | Mixed direction |
| 7 | $28-42=-14$ | $26-30=-4$ | Both negative |
| **8** | **$71-54=17$** | **$124-64=60$** | **Suspected outlying sample** |
| 9 | $43-34=9$ | $54-56=-2$ | Mixed direction |
| 10 | $33-29=4$ | $30-20=10$ | Both positive |
| 11 | $20-39=-19$ | $14-21=-7$ | Both negative |
| **Total** | **$-103$** | **$146$** | Add each difference column |

An important insight: the original sample 8 has large **original values**, but it also produces the unusual **difference vector $(17,60)$**. For testing laboratory agreement, it is the **paired differences** whose assumptions and unusual observations are most directly relevant.

## Step 2. Analyze all 11 samples first, to establish a baseline

Although the worksheet specifically asks us to remove sample 8, we must calculate the original result as well to answer “does the outlier make a difference?”

Mean difference vector:

$$
\bar{\boldsymbol d}_{11}=\begin{bmatrix}-103/11\\146/11\end{bmatrix}
=\boxed{\begin{bmatrix}-9.363636\\13.272727\end{bmatrix}}.
$$

The negative BOD mean suggests the commercial lab is lower on BOD *on average*, while the positive SS mean suggests the commercial lab is higher on SS *on average*. Whether these departures can reasonably be attributed to sampling noise requires the test.

From the 11 paired difference vectors, sample covariance is

$$
\boldsymbol S_{d,11}=\boxed{\begin{bmatrix}
199.254545&88.309091\\
88.309091&418.618182
\end{bmatrix}}.
$$

The covariance is positive for these paired differences, reflecting some positive co-movement of the two types of laboratory discrepancy.

To apply Hotelling, solve

$$
\boldsymbol S_{d,11}\boldsymbol z=\bar{\boldsymbol d}_{11},
\qquad \boldsymbol z\approx\begin{bmatrix}-0.0673414\\0.0459120\end{bmatrix}.
$$

The full quadratic calculation is

$$
\begin{aligned}
T^2_{11}
&=11\bar{\boldsymbol d}_{11}^{\mathsf T}\boldsymbol S_{d,11}^{-1}\bar{\boldsymbol d}_{11}\\
&=11\left[(-9.363636)(-0.0673414)+(13.272727)(0.0459120)\right]\\
&\approx\boxed{13.639312}.
\end{aligned}
$$

Transform to $F$:

$$
F_{11}=\frac{11-2}{2(11-1)}(13.639312)
=\frac9{20}(13.639312)
=\boxed{6.137690}.
$$

Reference: $F_{2,9}$. The p-value is approximately **0.020828**, less than 0.05.

**Decision before removal:** **Reject** equal mean laboratory measurements at 5%, under the paired-Hotelling model.

## Step 3. Remove sample 8 and recalculate everything

After removing the **entire row 8**, the difference totals change from $(-103,146)$ to

$$(-103,146)-(17,60)=(-120,86).$$

There are now $n=10$ paired samples, so:

$$
\bar{\boldsymbol d}_{10}=\begin{bmatrix}-120/10\\86/10\end{bmatrix}
=\boxed{\begin{bmatrix}-12.0\\8.6\end{bmatrix}}.
$$

The new sample covariance of the paired differences is

$$
\boxed{\boldsymbol S_{d,10}=\begin{bmatrix}
136.444444&-52.444444\\
-52.444444&198.266667
\end{bmatrix}.}
$$

Notice how the *sign* of the sample covariance changes when observation 8 is removed. This illustrates why covariance and correlation can be highly sensitive to individual cases in small samples.

Solving $S_{d,10}\boldsymbol z=\bar{\boldsymbol d}_{10}$ gives approximately

$$\boldsymbol z=\begin{bmatrix}-0.07934246\\0.02238868\end{bmatrix}.$$

Then

$$
\begin{aligned}
T^2_{10}&=10\left[(-12)(-0.07934246)+(8.6)(0.02238868)\right]\\
&\approx\boxed{11.446522},\\
F_{10}&=\frac{10-2}{2(10-1)}(11.446522)\\
&=\frac8{18}(11.446522)=\boxed{5.087343}.
\end{aligned}
$$

Reference: $F_{2,8}$, giving

$$\boxed{p\approx0.037540.}$$

**Decision after removing sample 8:** At $\alpha=0.05$, again **reject $H_0$**. There remains evidence that the population mean measurement vectors of the two laboratories differ.

## Step 4. Answer the exact “does the outlier make a difference?” question

| Statistic | All 11 paired samples | Without sample 8 (10 pairs) |
|---|---:|---:|
| Mean commercial minus state, BOD | $-9.3636$ | $-12.0000$ |
| Mean commercial minus state, SS | $13.2727$ | $8.6000$ |
| Covariance of paired BOD and SS differences | $+88.3091$ | $-52.4444$ |
| Hotelling $T^2$ | $13.6393$ | $11.4465$ |
| $F$ | $6.1377$ | $5.0873$ |
| Reference df | $(2,9)$ | $(2,8)$ |
| $p$-value | $0.02083$ | $0.03754$ |
| Decision, $\alpha=0.05$ | Reject equality | Reject equality |

**Direct answer:** Removing the suspected outlier materially changes the sample means, covariance and test statistic; however, **it does not change the significance decision at the chosen 5% level**. Both analyses find evidence of a difference between the laboratories' **mean** BOD/SS results.

### Why the assumptions still deserve attention

The Shapiro p-values for the two *difference* variables are approximately:

- **All 11:** BOD differences $p\approx0.322$, SS differences $p\approx0.0166$.
- **Without sample 8:** BOD differences $p\approx0.393$, SS differences $p\approx0.0510$.

The all-sample SS differences show nonnormality; the reduced-sample result is borderline at 5%. With only 10 or 11 pairs, normality assumptions cannot be assumed casually. The classical results above are the requested calculations, but a rigorous applied analysis should examine Q-Q plots and influential points, as well as physical causes for outlying values.

Also, **rejecting a zero average difference does not measure practical interchangeability**. If laboratories must agree within an operational tolerance, a mean-vector test alone is insufficient.

## Complete reproducible base-R code for Question 3

```r
effluent <- data.frame(
  Sample = 1:11,
  CommercialBOD = c(6,6,18,8,11,34,28,71,43,33,20),
  CommercialSS  = c(27,23,64,44,30,75,26,124,54,30,14),
  StateBOD      = c(25,28,36,35,15,44,42,54,34,29,39),
  StateSS       = c(15,13,22,29,31,64,30,64,56,20,21)
)

# Two laboratories have paired results on the SAME samples.
commercial <- as.matrix(effluent[, c("CommercialBOD", "CommercialSS")])
state <- as.matrix(effluent[, c("StateBOD", "StateSS")])
differences <- commercial - state
colnames(differences) <- c("BOD_difference", "SS_difference")

# All 11 paired samples
all_pairs <- hotelling_one(differences, c(0, 0), alpha = 0.05)
all_pairs$mean
all_pairs$covariance
all_pairs$T2
all_pairs$F
all_pairs$p_value

# Remove sample 8 (the eighth row here is precisely sample number 8)
differences_no8 <- differences[-8, , drop = FALSE]
no8 <- hotelling_one(differences_no8, c(0, 0), alpha = 0.05)
no8$mean
no8$covariance
no8$T2
no8$F
no8$p_value

# Plot the paired differences and inspect their normality
par(mfrow = c(1, 3))
qqnorm(differences[, 1]); qqline(differences[, 1])
qqnorm(differences[, 2]); qqline(differences[, 2])
plot(differences[, 1], differences[, 2],
     xlab = "Commercial - State BOD",
     ylab = "Commercial - State SS")
text(differences[, 1], differences[, 2], labels = effluent$Sample,
     pos = 3, cex = 0.8)
par(mfrow = c(1, 1))

sapply(as.data.frame(differences),
       function(z) shapiro.test(z)$p.value)
sapply(as.data.frame(differences_no8),
       function(z) shapiro.test(z)$p.value)
```

**Explanation of the code:** `data.frame` creates a readable table, with four original measurement columns and sample IDs. Selecting two columns with `[,c("...","...")]` retains exactly the same outcome order for each lab. Subtraction works cell by cell, giving a difference matrix with **11 rows and 2 columns**. We test that matrix against the zero vector using the one-sample function. For the reduced analysis, `[-8,]` removes the eighth sample **as a whole pair**. Comparing `all_pairs$p_value` with `no8$p_value` answers the sensitivity part. The diagnostic plots should be considered alongside the formal results.

---

# Question 4 – Female and male painted turtles

**Source:** `PQ5.pdf`, pages 2–3. **Source-provided worked answer:** none. **Additional actual data:** `T6-9(1).dat`, with exactly 24 females and 24 males.

## Original question

> A researcher studied the relationship of size and shape for painted turtles. `T6-9.dat` file contains their measurements on the carapaces of 24 female and 24 male turtles.
>
> **(a)** Test for equality of the two population mean vectors using $\alpha=0.05$.
>
> **(b)** Comment on the validity of the assumptions used in your analysis.
>
> *Hint: You may wish to consider logarithmic transformations of the observations.*
>
> **Table 3: Carapace measurements (in mm) for painted turtles**
>
> | | Female length $X_1$ | Female width $X_2$ | Female height $X_3$ | Male length $X_1$ | Male width $X_2$ | Male height $X_3$ |
> |---|---:|---:|---:|---:|---:|---:|
> | First row | 98 | 81 | 38 | 93 | 74 | 37 |
> | Second row | 103 | 84 | 38 | 94 | 78 | 35 |
> | Third row | 103 | 86 | 42 | 96 | 80 | 35 |
> | $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ |
> | Third-to-last | 159 | 118 | 63 | 128 | 95 | 45 |
> | Second-to-last | 162 | 124 | 61 | 131 | 95 | 46 |
> | Last row | 177 | 132 | 67 | 135 | 106 | 47 |

The full 48-row uploaded dataset is reproduced in Appendix A. The original printed table only displays its first and last three records for each sex.

## Understand the setting: size versus shape

The **carapace** is the upper part of a turtle's shell. A shell has length, width and height, so every turtle contributes a measurement vector

$$\boldsymbol x=\begin{bmatrix}\text{length}\\\text{width}\\\text{height}\end{bmatrix},\qquad\text{all measurements in millimetres}.$$

The researcher is interested in size and shape, but **testing equality of raw length/width/height means directly tests the *mean measurement profiles***. It does not automatically distinguish whether differences are mostly due to overall size or to different proportions. For explicit shape analysis, we may subsequently examine ratios such as width/length, height/length, or carefully chosen log-ratios.

These are **two independent groups**, not repeated measurements of the same turtle. Female and male rows in the excerpt appear beside one another for display; that arrangement is not evidence that the animals were matched. Hence the conventional procedure for 4(a) is the **two-sample Hotelling test** with $p=3$.

## Question 4(a). Test equality of mean vectors at 5%

### Step 1. State the null and alternative

$$
H_0:\boldsymbol\mu_F=\boldsymbol\mu_M,
\qquad H_1:\boldsymbol\mu_F\ne\boldsymbol\mu_M.
$$

Here $n_F=24$, $n_M=24$, $p=3$, total $N=48$, and $\alpha=0.05$. The subscripts $F$ and $M$ mean female and male.

### Step 2. Compute the three-variable mean for each group

Using all rows of `T6-9(1).dat`:

$$
\boxed{\bar{\boldsymbol x}_F\approx\begin{bmatrix}
136.041667\\102.583333\\52.041667
\end{bmatrix}\ \text{mm},\qquad
\bar{\boldsymbol x}_M\approx\begin{bmatrix}
113.375000\\88.291667\\40.708333
\end{bmatrix}\ \text{mm}.}
$$

These are the **observed group means**, not hypothetical source answers.

The mean difference vector is

$$
\boldsymbol\delta=\bar{\boldsymbol x}_F-\bar{\boldsymbol x}_M
=\boxed{\begin{bmatrix}
22.666667\\14.291667\\11.333333
\end{bmatrix}\ \text{mm}}.
$$

Read this carefully: female turtles in this sample were, on average, around 22.67 mm longer, 14.29 mm wider and 11.33 mm higher. These are **descriptive** differences. Statistical inference comes after considering within-group variation.

### Step 3. Compute separate within-group covariance matrices

From the 24 female measurements:

$$
\boldsymbol S_F\approx\begin{bmatrix}
451.519928&270.974638&165.954710\\
270.974638&171.731884&101.844203\\
165.954710&101.844203&64.737319
\end{bmatrix}.
$$

From the 24 male measurements:

$$
\boldsymbol S_M\approx\begin{bmatrix}
138.766304&79.146739&37.375000\\
79.146739&50.041667&21.653986\\
37.375000&21.653986&11.259058
\end{bmatrix}.
$$

The entry $451.520$ is the *sample variance of female length*, not average female length. The covariance entries are relatively large and positive because larger turtles often have longer, wider and higher shells together. This is precisely what a multivariate test must account for.

Notice an important warning already: the female sample variances are notably larger than the male variances, suggesting that the common-covariance assumption may be weak.

### Step 4. Construct the pooled covariance matrix

Because both groups have 24 observations, the weighting simplifies:

$$
\begin{aligned}
\boldsymbol S_p
&=\frac{(24-1)\boldsymbol S_F+(24-1)\boldsymbol S_M}{24+24-2}\\
&=\frac{23\boldsymbol S_F+23\boldsymbol S_M}{46}\\
&=\frac{\boldsymbol S_F+\boldsymbol S_M}{2}.
\end{aligned}
$$

For instance, the pooled length variance is

$$s_{p,11}=\frac{451.519928+138.766304}{2}=295.143116.$$

The full matrix is

$$
\boxed{\boldsymbol S_p\approx\begin{bmatrix}
295.143116&175.060688&101.664855\\
175.060688&110.886775&61.749094\\
101.664855&61.749094&37.998188
\end{bmatrix}.}
$$

A pooled covariance matrix is a model-based estimate. Its calculation does **not** prove that the two population covariance matrices are equal. We revisit that assumption in part (b).

### Step 5. Compute two-sample Hotelling $T^2$

The sample-size multiplier is

$$\frac{n_Fn_M}{n_F+n_M}=\frac{24\cdot24}{48}=12.$$

To show the matrix computation explicitly, solve

$$\boldsymbol S_p\boldsymbol z=\boldsymbol\delta.$$

The independently calculated result is

$$\boldsymbol z\approx\begin{bmatrix}
-0.272793\\-0.136478\\1.249906
\end{bmatrix}.$$

Then

$$
\begin{aligned}
\boldsymbol\delta^\mathsf T\boldsymbol z
&\approx(22.666667)(-0.272793)
+(14.291667)(-0.136478)
+(11.333333)(1.249906)\\
&\approx6.031802.
\end{aligned}
$$

The negative components in the intermediate product are possible because the inverse covariance accounts for strongly correlated measurements. The *total* remains positive.

Therefore,

$$
\boxed{T^2=12(6.031801921)=72.381623.}
$$

### Step 6. Convert to the correct two-sample $F$ statistic

Use the **two-sample formula**, not the one-sample formula:

$$
\begin{aligned}
F_{\mathrm{obs}}
&=\frac{n_F+n_M-p-1}{p(n_F+n_M-2)}T^2\\
&=\frac{48-3-1}{3(48-2)}(72.381623)\\
&=\frac{44}{138}(72.381623)\\
&=\boxed{23.078199}.
\end{aligned}
$$

Degrees of freedom are $p=3$ and $48-3-1=44$, so the reference distribution is $F_{3,44}$.

The independently calculated upper-tail p-value is

$$\boxed{p\approx3.97\times10^{-9}.}$$

The 5% critical value is $F_{3,44;0.95}\approx2.8165$, far smaller than the observed 23.0782.

### Final answer for 4(a)

**Reject $H_0$ at $\alpha=0.05$.** There is extremely strong statistical evidence that the **joint mean carapace measurement profiles** of female and male painted turtles differ, according to the standard pooled-covariance model. In these data, female means are higher for all three dimensions.

The test does **not by itself prove a specific shape difference** or causal sex effect. It establishes a mean-vector difference, primarily the question the worksheet explicitly asks.

## Question 4(b). Check the assumptions; study log transformations

### Assumption 1. Independent observations

Each turtle should represent an independently sampled individual, not repeated measurements on the same turtle. We rely on the study design because this cannot be established from numerical measurements alone.

### Assumption 2. Approximately multivariate normal in each sex group

Examine length, width and height **within each sex**, rather than combining females and males before checking normality. If the two sexes have different means, mixing them can create a misleading shape even when each group itself is normal.

The independently calculated Shapiro–Wilk **marginal** p-values are:

| Group | Length | Width | Height |
|---|---:|---:|---:|
| Female | 0.3459 | 0.7576 | 0.5868 |
| Male | 0.7251 | 0.8175 | 0.4581 |

None of these six marginal tests rejects normality at 5%. That is encouraging for the one-dimensional distributions, **not proof of joint trivariate normality**. Scatterplot matrices and within-group Mahalanobis diagnostics add useful checks.

### Assumption 3. Are the covariance matrices the same?

Compare the actual sample variances:

| Dimension | Female variance | Male variance | Female / male variance |
|---|---:|---:|---:|
| Length | 451.520 | 138.766 | about 3.25 |
| Width | 171.732 | 50.042 | about 3.43 |
| Height | 64.737 | 11.259 | about 5.75 |

This substantial unequal spread is a **meaningful concern** for the classical pooled-covariance assumption. The determinants of the estimated full covariance matrices also differ considerably, but determinants alone do not establish a formal significance test or summarize every type of covariance difference. Since both groups have equal sample sizes, the classical test can be less sensitive to some heteroscedasticity scenarios; nevertheless, its exact reference distribution is not justified merely because group sizes match.

### Why might a logarithm help?

Turtle dimensions are all **positive**. If size variation is proportional to the average size, rather than constant in absolute millimetres, a natural logarithm can reduce scale-dependent heteroscedasticity. It also changes multiplicative relationships into additive ones:

$$\log(AB)=\log(A)+\log(B),\qquad
\log(A/B)=\log(A)-\log(B).$$

For example, a length change from 100 mm to 120 mm is a factor of 1.2; a change from 150 mm to 180 mm is also a factor of 1.2. Taking logs treats these as the same increase $\log(1.2)$ even though the raw millimetre differences are 20 and 30.

The transformed vector is

$$\boldsymbol z_i=\begin{bmatrix}
\log(\text{length}_i)\\
\log(\text{width}_i)\\
\log(\text{height}_i)
\end{bmatrix}.$$

We are now testing equality of **mean log measurements** between sexes, which is not the identical mathematical hypothesis as equality of raw arithmetic mean dimensions. It is often interpretable as comparing geometric means or relative scales.

### Independently computed log-scale Hotelling test

The log-scale group mean vectors are approximately

$$
\bar{\boldsymbol z}_F=\begin{bmatrix}
4.900659\\4.622909\\3.940286
\end{bmatrix},\qquad
\bar{\boldsymbol z}_M=\begin{bmatrix}
4.725444\\4.477574\\3.703186
\end{bmatrix}.
$$

Log-mean difference:

$$\bar{\boldsymbol z}_F-\bar{\boldsymbol z}_M\approx\begin{bmatrix}
0.175216\\0.145335\\0.237100
\end{bmatrix}.$$

Using pooled covariance estimated from the **log data** gives approximately

$$\boldsymbol S_{p,\log}=\begin{bmatrix}
0.0187388&0.0140655&0.0165386\\
0.0140655&0.0113036&0.0127148\\
0.0165386&0.0127148&0.0158563
\end{bmatrix}.$$

Apply the same two-sample method, now to transformed measurements:

$$T^2_{\log}\approx85.052001,$$

$$F_{\log}=\frac{44}{138}T^2_{\log}\approx27.118029,$$

with $F_{3,44}$ reference and

$$\boxed{p_{\log}\approx4.36\times10^{-10}.}$$

**Conclusion on the log scale:** Reject equal mean log profiles too. The broad evidence of a sex-associated multivariate size profile difference persists under this transformation.

### Did log transformation solve the assumption problems?

Not necessarily. The log data still show unequal estimated spread between the groups, particularly across the strongly correlated dimensions. Transformation did not make the covariance matrices demonstrably equal. Recheck covariance and normality after any transformation; do not assume a log automatically repairs all assumptions.

All six marginal Shapiro tests on the **log measurements** have p-values exceeding 0.05 in this particular sample, but this alone does not establish full joint normality or equality of covariance matrices. A carefully applied heteroscedastic or permutation-based follow-up could strengthen inference in a real research report.

## R code for both parts of Question 4

```r
turtles <- read.table("T6-9(1).dat", header = FALSE,
                      col.names = c("Length", "Width", "Height", "Sex"))
turtles$Sex <- factor(turtles$Sex,
                      levels = c("female", "male"))

# Verify exactly 24 independent turtles in each group.
table(turtles$Sex)

female <- as.matrix(turtles[turtles$Sex == "female",
                            c("Length", "Width", "Height")])
male <- as.matrix(turtles[turtles$Sex == "male",
                          c("Length", "Width", "Height")])

# All three outcome columns have units of millimetres.
colMeans(female)
colMeans(male)
cov(female)
cov(male)

hotelling_two <- function(A, B, alpha = 0.05) {
  A <- as.matrix(A)
  B <- as.matrix(B)
  storage.mode(A) <- "double"
  storage.mode(B) <- "double"
  n1 <- nrow(A)
  n2 <- nrow(B)
  p <- ncol(A)
  stopifnot(ncol(B) == p, n1 + n2 > p + 1)

  mean_difference <- colMeans(A) - colMeans(B)
  pooled <- ((n1 - 1) * cov(A) + (n2 - 1) * cov(B)) /
            (n1 + n2 - 2)
  T2 <- (n1*n2/(n1+n2)) *
        drop(crossprod(mean_difference, solve(pooled, mean_difference)))
  Fobs <- (n1+n2-p-1) * T2 / (p*(n1+n2-2))
  df1 <- p
  df2 <- n1+n2-p-1
  p_value <- pf(Fobs, df1, df2, lower.tail = FALSE)

  list(n1=n1, n2=n2, mean_difference=mean_difference,
       covariance_group1=cov(A), covariance_group2=cov(B),
       pooled_covariance=pooled, T2=T2, F=Fobs,
       df1=df1, df2=df2, p_value=p_value,
       reject_H0=p_value < alpha)
}

raw_result <- hotelling_two(female, male)
raw_result$mean_difference
raw_result$pooled_covariance
raw_result$T2            # 72.381623
raw_result$F             # 23.078199
raw_result$p_value       # about 3.97e-09

# Natural logarithm: each measurement is strictly positive.
log_female <- log(female)
log_male <- log(male)
log_result <- hotelling_two(log_female, log_male)
log_result$T2            # 85.052001
log_result$F             # 27.118029
log_result$p_value       # about 4.36e-10

# Compare within-group covariance matrices before and after.
cov(female)
cov(male)
cov(log_female)
cov(log_male)

# Marginal normality tests within each sex.
apply(female, 2, function(z) shapiro.test(z)$p.value)
apply(male, 2, function(z) shapiro.test(z)$p.value)
apply(log_female, 2, function(z) shapiro.test(z)$p.value)
apply(log_male, 2, function(z) shapiro.test(z)$p.value)

# Six plotted pairs of variables, split by sex, to inspect joint shape.
par(mfrow = c(1, 2))
pairs(female, main = "Female turtles: raw variables")
pairs(male, main = "Male turtles: raw variables")
par(mfrow = c(1, 1))

# Within-group squared Mahalanobis distances help flag unusual profiles.
D2_f <- mahalanobis(female, colMeans(female), cov(female))
D2_m <- mahalanobis(male, colMeans(male), cov(male))
sort(D2_f, decreasing = TRUE)[1:5]
sort(D2_m, decreasing = TRUE)[1:5]
```

**How to understand the important lines:** `table(turtles$Sex)` counts females and males. `factor(...,levels=...)` tells R the permitted groups and their order. The comparisons `turtles$Sex=="female"` make a logical TRUE/FALSE vector used to select the correct rows. `as.matrix` keeps just the three numerical columns. `cov(female)` and `cov(male)` estimate the within-group matrices. The function `hotelling_two` explicitly calculates the **weighted** pooled covariance, then the correct **two-sample** $T^2\to F$ conversion. `log` takes natural logs of each element, while `apply(...,2,...)` repeats a test over columns (the number 2 denotes columns rather than rows).

**Do not** run `t.test` on an entire three-column matrix and call the result a Hotelling test. Likewise, `pairwise.t.test` is not a substitute for the joint multivariate comparison.

### Optional scientific extension: shape, not only size

A useful *separate* analysis of shape can work with log-ratios, such as

$$\log\left(\frac{\text{width}}{\text{length}}\right)
=\log(\text{width})-\log(\text{length})$$

and similarly $\log(\text{height}/\text{length})$. These remove the overall linear-size scale and focus on proportions. The worksheet does not explicitly ask you to test these particular ratios, and no such follow-up numerical conclusions are asserted here. In R you can explore them with:

```r
turtles$log_width_length <- log(turtles$Width / turtles$Length)
turtles$log_height_length <- log(turtles$Height / turtles$Length)
aggregate(cbind(log_width_length, log_height_length) ~ Sex,
          data = turtles, FUN = mean)
```

Use this only if you want to investigate *shape* as a distinct scientific question.

---

# Question 5 – One-way MANOVA of crude-oil chemistry

**Source:** `PQ5.pdf`, page 3. **Source-provided worked answer:** none. **Required dataset:** the uploaded `T11-7(1).DAT`, containing exactly 56 records and five numerical variables plus a sandstone-zone label.

## Original question

> A group of chemists analyzed crude-oil samples from three zones of sandstone: Wilhelm, Sub-Mulinia, and Upper. The values of the trace elements: $X_1=$ vanadium (in percent ash), $X_2=$ iron (in percent ash), and $X_3=$ beryllium (in percent ash), and two measures of hydrocarbons: $X_4=$ saturated hydrocarbons (in percent area) and $X_5=$ aromatic hydrocarbons (in percent area) are presented for 56 cases in `T11-7.dat` file. The last two measurements are determined from areas under a gas-liquid chromatography curve.
>
> Construct a one-way MANOVA of the crude-oil data listed in the file. (You may want to consider transformations of the data to make them more closely conform to the usual MANOVA assumptions.)

## First, understand the experimental question

We have three categories of rock formation. For every crude-oil sample, chemists measured a five-number chemical profile. We want to test whether **average multivariate chemical composition** differs among the three zones.

The words **one-way** mean there is **one categorical explanatory factor**, here sandstone zone. Although there are five response variables, there is still only one grouping factor. Do not confuse “five outcomes” with “five factors.”

| Response | Meaning | Worksheet's measurement scale |
|---|---|---|
| $X_1$ | Vanadium | Percent ash |
| $X_2$ | Iron | Percent ash |
| $X_3$ | Beryllium | Percent ash |
| $X_4$ | Saturated hydrocarbons | Percent area under chromatographic curve |
| $X_5$ | Aromatic hydrocarbons | Percent area under chromatographic curve |

**An important filename/data detail:** In the supplied `.DAT` file, the three zone names are exactly `Wilhelm`, `SubMuli` and `Upper`. The `SubMuli` label corresponds to the worksheet's **Sub-Mulinia** zone. Retaining the dataset label exactly makes reproducible code straightforward.

## Step 1. Set out the groups, sample sizes and hypotheses

The real dataset contains:

| Zone | Exact `.DAT` label | Number of samples |
|---|---|---:|
| Wilhelm | `Wilhelm` | 7 |
| Sub-Mulinia | `SubMuli` | 11 |
| Upper | `Upper` | 38 |
| **Total** | | **56** |

Thus $N=56$, $g=3$, $p=5$. Note the **very unequal group sizes**. In particular, Wilhelm has just seven observations, only slightly more than the number of outcomes.

We test:

$$
H_0:\boldsymbol\mu_{\mathrm{Wilhelm}}=
\boldsymbol\mu_{\mathrm{SubMuli}}=
\boldsymbol\mu_{\mathrm{Upper}},
$$

against the alternative that **at least one of these five-dimensional mean vectors differs**.

Because the question gives no significance level, this guide chooses $\alpha=0.05$ explicitly.

## Step 2. Read the dataset and calculate group mean vectors

Each mean vector is ordered **vanadium, iron, beryllium, saturated, aromatic**. These are the independently computed raw group means:

| Zone | Mean V | Mean Fe | Mean Be | Mean saturated | Mean aromatic |
|---|---:|---:|---:|---:|---:|
| Wilhelm ($n=7$) | 3.2286 | 43.5714 | 0.1171 | 6.7957 | 11.5400 |
| Sub-Mulinia ($n=11$) | 4.4455 | 33.0909 | 0.1709 | 6.5609 | 5.4836 |
| Upper ($n=38$) | 7.2263 | 22.2526 | 0.4321 | 4.6582 | 5.7679 |

Across all 56 samples, the overall mean vector is

$$
\bar{\boldsymbol y}\approx\begin{bmatrix}
6.180357\\27.046429\\0.341429\\5.299107\\6.433571
\end{bmatrix}.
$$

**Interpretation:** Among these samples, Wilhelm tends to have relatively high iron and aromatic hydrocarbons, while Upper tends to have relatively high vanadium and beryllium and lower iron. Such sample differences are descriptive evidence, but we need the overall MANOVA to assess whether the multivariate patterns are distinguishable relative to within-zone variation.

## Step 3. Understand the exact MANOVA table structure

Our total, between and residual degrees of freedom are:

$$df_{\mathrm{between}}=g-1=3-1=2,$$

$$df_{\mathrm{within}}=N-g=56-3=53,$$

$$df_{\mathrm{total}}=N-1=56-1=55.$$

Therefore:

| Source | Matrix to calculate | Degrees of freedom |
|---|---|---:|
| Sandstone zone | $\boldsymbol B$ (also called $\boldsymbol H$ in some software) | 2 |
| Residual / within-zone | $\boldsymbol W$ (also called $\boldsymbol E$) | 53 |
| Total | $\boldsymbol T=\boldsymbol B+\boldsymbol W$ | 55 |

This is the correct **matrix-valued MANOVA table**. One ordinary one-way ANOVA table per response would not be equivalent because MANOVA also uses the cross-products between variables.

## Step 4. Calculate within-zone and between-zone SSCP matrices

### 4.1 Within-zone scatter, $W$

For each oil sample, subtract its own zone's mean vector. Multiply the resulting column vector by its transpose to make a $5\times5$ cross-product matrix. Sum these over every record in each group and then over the three groups:

$$\boldsymbol W=\sum_{i=1}^3\sum_{j=1}^{n_i}
(\boldsymbol y_{ij}-\bar{\boldsymbol y}_i)
(\boldsymbol y_{ij}-\bar{\boldsymbol y}_i)^\mathsf T.$$

From the uploaded data, independently computed and rounded to three decimals:

$$
\boldsymbol W\approx\begin{bmatrix}
187.575&-34.812&-6.848&-21.134&79.672\\
-34.812&4221.158&20.112&83.722&-287.511\\
-6.848&20.112&4.436&8.638&-0.392\\
-21.134&83.722&8.638&57.040&33.215\\
79.672&-287.511&-0.392&33.215&338.023
\end{bmatrix}.
$$

The $187.575$ in the first diagonal position is the sum of squared within-zone deviations for vanadium; it is **not** a group mean. The $-34.812$ is a sum of within-zone cross-products for vanadium and iron. Cross-products can be negative if the deviations often move in opposite directions.

### 4.2 Between-zone scatter, $B$

Now subtract the **overall** sample mean from each **zone mean**, form its cross-product and multiply by the zone's sample size:

$$\boldsymbol B=\sum_{i=1}^3 n_i
(\bar{\boldsymbol y}_i-\bar{\boldsymbol y})
(\bar{\boldsymbol y}_i-\bar{\boldsymbol y})^\mathsf T.$$

The independently computed between-zone matrix is approximately

$$
\boldsymbol B\approx\begin{bmatrix}
135.673&-647.337&11.493&-80.479&-113.841\\
-647.337&3186.681&-53.800&373.774&648.788\\
11.493&-53.800&0.984&-6.925&-8.529\\
-80.479&373.774&-6.925&48.803&56.525\\
-113.841&648.788&-8.529&56.525&209.294
\end{bmatrix}.
$$

### 4.3 An intuitive hand-computation example

Consider only the vanadium mean for Wilhelm: $\bar y_{W,V}=3.228571$; overall mean is $\bar y_V=6.180357$; sample size is 7. Its contribution to the **between-zone vanadium sum of squares** is

$$7(3.228571-6.180357)^2\approx60.995.$$

You would add similarly calculated contributions from Sub-Mulinia and Upper to obtain the first diagonal element of $B$, approximately 135.673. To calculate an off-diagonal element such as vanadium–iron, multiply each zone's vanadium mean deviation by its iron mean deviation, multiply by that zone's $n_i$, then sum across zones. That explains what an SSCP matrix actually contains.

## Step 5. Obtain Wilks' lambda

For five variables, computing full $5\times5$ determinants by hand is laborious. Matrix software does the determinant calculation reliably. The formula, however, is exactly the same as in Question 6:

$$\boxed{\Lambda=\frac{|\boldsymbol W|}{|\boldsymbol W+\boldsymbol B|}.}$$

The independently computed raw-data result is

$$\boxed{\Lambda_{\mathrm{raw}}\approx0.115911.}$$

A value substantially below 1 indicates that between-zone differences explain a considerable part of the multivariate scatter relative to the within-zone scatter, though **the statistical significance must still be calibrated**.

With the standard Wilks approximate $F$ transformation for this design, the result is

$$\boxed{F\approx18.984836,\qquad df=(10,98),\qquad p\approx6.80\times10^{-19}.}$$

Here 10 numerator degrees of freedom arise from the five outcomes and two independent between-zone contrasts. The test's reference denominator degrees of freedom are determined by the standard MANOVA approximation; they are not simply the residual 53.

### Raw-data MANOVA results, independently computed

| Multivariate test | Statistic | Approximate $F$ | Reference degrees of freedom | $p$-value |
|---|---:|---:|---|---:|
| Wilks' lambda | 0.115911 | 18.9848 | $(10,98)$ | $6.80\times10^{-19}$ |
| Pillai's trace | 1.206656 | 15.2097 | $(10,100)$ | $3.69\times10^{-16}$ |
| Hotelling–Lawley trace | 4.844428 | 23.4307 | $(10,70.804)$ | $1.07\times10^{-18}$ |
| Roy's largest root | 4.178414 | 41.7841 | $(5,50)$ | $1.04\times10^{-16}$ |

These are numerical results from the **actual supplied dataset**, calculated independently using standard MANOVA approximations; they are **not** answers printed in `PQ5.pdf` and **not** claimed to be the product of executing R. The R code below reproduces the analyses through the usual R `manova` procedure. Exact printed decimals can vary slightly by software.

**Global decision:** At $\alpha=0.05$, **reject equality of the three five-dimensional mean vectors**. The average crude-oil chemical profiles show strong differences associated with sandstone zone.

This does **not** prove every pair of zones differs on every chemical. The global null addresses all five chemical responses jointly. Specific post-hoc comparisons require follow-up analyses and suitable multiplicity control.

## Step 6. Diagnose the assumptions before trusting the classical reference tests

### 6.1 Within-group normality is not uniform

The independently calculated marginal Shapiro $p$-values on the original measurements are:

| Group | Vanadium | Iron | Beryllium | Saturated | Aromatic |
|---|---:|---:|---:|---:|---:|
| Wilhelm (7) | 0.1092 | 0.4556 | 0.2441 | 0.1787 | 0.3717 |
| Sub-Mulinia (11) | 0.2255 | 0.2745 | **0.0080** | 0.1735 | **0.0250** |
| Upper (38) | 0.2981 | **0.0084** | **0.0037** | **0.0060** | 0.0884 |

Several marginal normality tests reject at 5%. These are **diagnostic clues**, not a complete multivariate normality test. Furthermore, examining 15 separate tests produces multiple-testing concerns; the objective is to assess the pattern of assumptions, not to count small p-values as if each were independent confirmatory research.

### 6.2 Unequal group sizes and covariance matrices

The group sizes are very unbalanced: 7, 11 and 38. Their raw within-group covariance estimates also show substantial differences in overall spread. In particular, the small Wilhelm group has much less information about a five-dimensional covariance matrix. Homogeneity of covariance is a genuine concern, not something automatically solved by a significant omnibus MANOVA result.

Classical MANOVA assumes a common population covariance. For unequal group sizes, differences in covariance can affect Type I error calibration. Pillai's trace is often used as a robustness-oriented complementary statistic, but it is not immune to every assumption violation.

### 6.3 The beryllium column contains an exact zero

The minimum beryllium value in the actual dataset is **0.00**. Applying `log(Be)` directly would produce negative infinity for that observation, and using those values uncritically would spoil subsequent covariance calculations. Any proposed log analysis must **handle zero explicitly**, with a scientifically justified choice rather than hidden deletion.

## Step 7. Try a transparent transformation and rerun MANOVA

A simple supplementary transformation for these **nonnegative** measurements is

$$z_j=\log(1+x_j),\qquad j=1,2,3,4,5.$$

This avoids the undefined $\log(0)$ problem and compresses large values. It is a defensible *illustration*, not proof that this is the uniquely best transformation for all five physical quantities. A different measurement-specific transformation may be preferred after checking actual units and diagnostic plots.

The independently computed MANOVA of all five `log1p` transformed columns gives:

| Multivariate test on transformed data | Statistic | Approximate $F$ | Reference df | $p$-value |
|---|---:|---:|---|---:|
| Wilks' lambda | 0.110795 | 19.6419 | $(10,98)$ | $2.35\times10^{-19}$ |
| Pillai's trace | 1.174698 | 14.2336 | $(10,100)$ | $2.39\times10^{-15}$ |

The **global rejection persists** after this nonlinear transformation. However, log transformation does not uniformly fix the marginal distributions: for example, the transformed Upper vanadium values yield a Shapiro $p$-value around $0.0004$, and transformed Upper aromatic values have a p-value around $0.0309$. Covariance heterogeneity also remains a concern.

**What this means in practice:** The mean chemical profiles differ strongly under both raw and transformed analyses, suggesting a robust *direction of evidence* for zone differences. The classical p-values nevertheless rely on assumptions that are not completely satisfied. A more advanced applied analysis might use heteroscedastic multivariate methods, appropriately designed permutation or bootstrap checks, and scientifically justified transformations. The unbalanced groups deserve particular care.

### Important distinction: significance versus scientific usefulness

A very small global p-value does not tell you which chemicals are the most useful markers, whether those differences are environmentally meaningful, or which pairs of zones differ. The sample mean table suggests promising patterns, but follow-up effect sizes, individual variable tests with multiplicity adjustments, and possibly multivariate classification would be separate tasks. Do not invent those outputs without calculating them.

## Complete reproducible R code for Question 5

```r
# Read all 56 rows: five numeric columns, then the zone label.
oil <- read.table("T11-7(1).DAT", header = FALSE,
                  col.names = c("V", "Fe", "Be", "Sat", "Arom", "Zone"))

# The dataset uses 'SubMuli' for the worksheet's Sub-Mulinia zone.
oil$Zone <- factor(oil$Zone,
                   levels = c("Wilhelm", "SubMuli", "Upper"))

table(oil$Zone)         # Wilhelm 7, SubMuli 11, Upper 38
nrow(oil)               # 56
ncol(oil)               # 6 including the zone factor

# Means by zone, using the actual group labels.
aggregate(cbind(V, Fe, Be, Sat, Arom) ~ Zone,
          data = oil, FUN = mean)

# The response matrix has five, not six, columns.
Y <- as.matrix(oil[, c("V", "Fe", "Be", "Sat", "Arom")])
colMeans(Y)

# A one-way MANOVA: five response variables, one grouping factor.
fit_raw <- manova(cbind(V, Fe, Be, Sat, Arom) ~ Zone,
                  data = oil)
summary(fit_raw, test = "Wilks")
summary(fit_raw, test = "Pillai")
summary(fit_raw, test = "Hotelling-Lawley")
summary(fit_raw, test = "Roy")

# Inspect the ordinary single-response ANOVA tables only as FOLLOW-UP.
summary.aov(fit_raw)

# Marginal normality tests performed within each zone.
for (level in levels(oil$Zone)) {
  subset_now <- oil[oil$Zone == level,
                    c("V", "Fe", "Be", "Sat", "Arom")]
  cat("\nZONE:", level, "\n")
  print(apply(subset_now, 2,
              function(z) shapiro.test(z)$p.value))
  print(cov(subset_now))
}

# Group-specific scatterplot matrices (5 responses per group).
for (level in levels(oil$Zone)) {
  subset_now <- oil[oil$Zone == level,
                    c("V", "Fe", "Be", "Sat", "Arom")]
  pairs(subset_now, main = paste("Oil zone:", level))
}

# Inspect exact zeros BEFORE taking logarithms.
colSums(Y == 0)

# Supplementary transformation: log(1 + x), safely handles x == 0.
oil_log <- oil
for (name in c("V", "Fe", "Be", "Sat", "Arom")) {
  oil_log[[name]] <- log1p(oil[[name]])
}

fit_log <- manova(cbind(V, Fe, Be, Sat, Arom) ~ Zone,
                  data = oil_log)
summary(fit_log, test = "Wilks")
summary(fit_log, test = "Pillai")

# Check marginal normality AGAIN on transformed data.
for (level in levels(oil_log$Zone)) {
  subset_now <- oil_log[oil_log$Zone == level,
                        c("V", "Fe", "Be", "Sat", "Arom")]
  cat("\nTRANSFORMED ZONE:", level, "\n")
  print(apply(subset_now, 2,
              function(z) shapiro.test(z)$p.value))
}
```

### Teach the R syntax carefully

- `read.table` uses whitespace to separate columns, matching this `.DAT` file. `header=FALSE` keeps the first actual oil sample from being mistaken for a heading.
- `oil$Zone` selects the last text column. `factor` makes it categorical. The `levels=` argument fixes the order in output tables and contrasts; it does not change the data values.
- `table` verifies group sizes. Getting 56 total observations is a simple but essential data-integrity check.
- `aggregate(... ~ Zone, FUN=mean)` means “for each zone, compute the mean of each variable listed to the left of the tilde.” The tilde is R's common *formula symbol*, separating response from explanatory factor.
- `cbind(V,Fe,Be,Sat,Arom) ~ Zone` specifies **five responses explained by one categorical factor**. It is not five independent ANOVAs.
- `manova(...)` fits the multivariate linear model. `summary(...,test="Wilks")` asks for the particular multivariate statistic. It prints a test row for `Zone`; the important pieces are the multivariate test value, approximate $F$, numerator and denominator df, and `Pr(>F)` (the p-value).
- `summary.aov(fit_raw)` computes separate **univariate** follow-up analyses. Treat them as exploratory or adjust for multiple comparisons if making several formal claims; they do not replace the omnibus result.
- `for (...) {...}` repeats commands, once for each group. The subsetting expression `oil[oil$Zone==level,...]` selects rows matching the current group.
- `apply(...,2,...)` applies the Shapiro test to each **column**. The expression `shapiro.test(z)$p.value` extracts the p-value rather than printing the whole test object.
- `colSums(Y==0)` checks how many exact zeros occur in each response. In R, `==` means **compare for equality**, not assign a value.
- `oil[[name]]` selects a data-frame column by a name stored in the variable `name`. `log1p(x)` computes $\log(1+x)$ accurately and safely for nonnegative values. Do not confuse it with `log(x)`.
- The second MANOVA uses the **transformed dataset** and changes the hypothesis to equality of the five mean *transformed* chemical profiles.

### Extra hand-calculation connection: reconstruct the matrices in base R

For conceptual verification, you can also compute $B$ and $W$ without calling `manova`:

```r
variables <- c("V", "Fe", "Be", "Sat", "Arom")
Y <- as.matrix(oil[, variables])
grand_mean <- colMeans(Y)
p <- ncol(Y)
W <- matrix(0, nrow = p, ncol = p)
B <- matrix(0, nrow = p, ncol = p)

for (level in levels(oil$Zone)) {
  block <- as.matrix(oil[oil$Zone == level, variables])
  ni <- nrow(block)
  local_mean <- colMeans(block)
  within_centered <- sweep(block, 2, local_mean, FUN = "-")
  W <- W + crossprod(within_centered)
  delta <- local_mean - grand_mean
  B <- B + ni * tcrossprod(delta)
}

T_total <- W + B
W
B
T_total
lambda <- as.numeric(det(W) / det(T_total))
lambda                  # approximately 0.11591099
```

Here `sweep(block,2,local_mean,"-")` subtracts the mean of each column from every row. `crossprod(within_centered)` calculates the matrix of within-zone sums of squares and cross-products. `tcrossprod(delta)` produces the **outer product** $\delta\delta^\mathsf T$, which is the five-by-five contribution for a zone mean deviation. `det` returns a determinant, and their ratio is Wilks' lambda.

This is a particularly useful example of how a general theoretical formula becomes actual matrix arithmetic in statistical software.

---

# Question 6 – MANOVA by hand

**Source:** `PQ5.pdf`, pages 3–4. This is the **only question in the worksheet with a lecturer-provided worked answer**. The original matrices, degrees of freedom, formula, rounding and stated conclusions are preserved explicitly below, followed by a more detailed independent explanation and precision check.

## Original question

> **Question 6 (Use hand calculations to answer the questions)**
>
> An experimenter collected observations on two responses for three treatments and derived the following one-way MANOVA table for comapring the treatments.
>
> | Source of variation | Matrix of sums of squares and cross-products | Degrees of freedom |
> |---|---|---|
> | Treatment | $\displaystyle \begin{bmatrix}11&-22\\-22&75\end{bmatrix}$ | $g-1=3-1=2$ |
> | Residual | $\displaystyle \begin{bmatrix}17&4\\4&15\end{bmatrix}$ | $149-2=147$, or $150-3=147$ |
> | Total | $\displaystyle \begin{bmatrix}28&-18\\-18&90\end{bmatrix}$ | $149$ |
>
> **(a)** How many observations are in the experiment? Complete the MANOVA table.
>
> **(b)** Calculate Wilks' lambda, $\Lambda^*$, and test for treatment effects. Repeat the test using the large-sample procedure. Compare the conclusions. **Hint:** $F_{4,292}(.01)=3.38$ and $\chi^2_4(.01)=13.28$.
>
> **(c)** Which assumptions have you made to validate your test in Part (b)?

The original worksheet uses $\Lambda^*$; we write $\Lambda$ and $\Lambda^*$ interchangeably for the same computed Wilks statistic in this question. The source spelling “comapring” in the question, and “Wilk's” for the test name, have been retained or noted as printed; the standard test name is **Wilks' lambda**.

## The intuitive meaning of the three matrices

There are **two response variables**. So every sample is a pair, like $(x_1,x_2)$. There are **three treatment groups**, so the question is whether all three treatment mean **pairs** are the same.

- The **treatment** matrix $B$ measures how far the three group mean profiles are from their overall mean, accounting for group sizes.
- The **residual** matrix $W$ measures how much individual observations vary **within** their own treatment group.
- The **total** matrix $T$ combines both sources of variation.

For this problem:

$$
\boldsymbol B=\begin{bmatrix}11&-22\\-22&75\end{bmatrix},\qquad
\boldsymbol W=\begin{bmatrix}17&4\\4&15\end{bmatrix},\qquad
\boldsymbol T=\begin{bmatrix}28&-18\\-18&90\end{bmatrix}.
$$

Before calculating anything, verify the matrix identity element by element:

$$
\begin{aligned}
\boldsymbol B+\boldsymbol W
&=\begin{bmatrix}11+17&-22+4\\-22+4&75+15\end{bmatrix}\\
&=\begin{bmatrix}28&-18\\-18&90\end{bmatrix}
=\boldsymbol T.
\end{aligned}
$$

Every entry matches. This check is an easy way to catch a transcription mistake.

## Question 6(a). Number of observations and completed MANOVA table

### The basic degrees-of-freedom relationship

With $N$ observations and $g$ groups:

$$df_{\mathrm{total}}=N-1.$$

The provided total degrees of freedom is 149. Therefore,

$$N-1=149\quad\Longrightarrow\quad\boxed{N=150}.$$

Why do we subtract 1? Because the deviations from the overall sample mean must add to zero. Once $N-1$ deviations are known, the last is constrained; that is the intuitive meaning of the lost degree of freedom.

We also know $g=3$, so:

$$df_{\mathrm{treatment}}=g-1=3-1=\boxed{2},$$

$$df_{\mathrm{residual}}=N-g=150-3=\boxed{147},$$

$$df_{\mathrm{total}}=150-1=\boxed{149}.$$

Check: $2+147=149$.

### Completed table

| Source | SSCP matrix | Degrees of freedom |
|---|---|---:|
| Treatment, $B$ | $\begin{bmatrix}11&-22\\-22&75\end{bmatrix}$ | 2 |
| Residual, $W$ | $\begin{bmatrix}17&4\\4&15\end{bmatrix}$ | 147 |
| Total, $T$ | $\begin{bmatrix}28&-18\\-18&90\end{bmatrix}$ | 149 |

### Lecturer's source-provided answer to (a), preserved

The original solution states:

$$\sum_{i=1}^{g}n_i-1=149\implies\sum_{i=1}^{g}n_i=150,$$

“Therefore, the total number of observation = 150.” The numerical result is **correct**. We have expanded its explanation but not changed the answer.

## Question 6(b). Calculate and test Wilks' lambda

### Step 1. Write the null hypothesis correctly

Let $\boldsymbol\mu_1,\boldsymbol\mu_2,\boldsymbol\mu_3$ be the three population **two-variable mean vectors**. Then

$$
H_0:\boldsymbol\mu_1=\boldsymbol\mu_2=\boldsymbol\mu_3,
\quad H_1:\text{at least one population mean vector differs}.
$$

The original source uses an equivalent effects notation:

$$H_0:\boldsymbol\alpha_1=\boldsymbol\alpha_2=\boldsymbol\alpha_3=\boldsymbol 0,$$

meaning there are no treatment effects. Strictly, each $\boldsymbol\alpha_i$ here is a **vector of two treatment effects**, not merely a single scalar. The alternative is that one or more effects are nonzero.

**The source's hint is at the 1% significance level.** Therefore test at $\alpha=0.01$, even though the other worksheet questions often use 5%.

### Step 2. What is a determinant?

For a two-by-two matrix,

$$A=\begin{bmatrix}a&b\\c&d\end{bmatrix},\qquad |A|=ad-bc.$$

**Do not simply multiply the four numbers**. Multiply the main diagonal, multiply the other diagonal, and **subtract** the second result from the first. A negative entry in an off-diagonal position may give a **positive** cross-product when squared.

### Step 3. Compute the residual determinant by hand

$$
\begin{aligned}
|\boldsymbol W|
&=\left|\begin{matrix}17&4\\4&15\end{matrix}\right|\\
&=17(15)-4(4)\\
&=255-16\\
&=\boxed{239}.
\end{aligned}
$$

### Step 4. Compute the total determinant by hand

$$
\begin{aligned}
|\boldsymbol T|
&=\left|\begin{matrix}28&-18\\-18&90\end{matrix}\right|\\
&=28(90)-(-18)(-18)\\
&=2520-324\\
&=\boxed{2196}.
\end{aligned}
$$

The product $(-18)(-18)$ is **positive 324**. Subtracting it produces 2196, not 2844.

### Step 5. Compute Wilks' lambda

$$
\boxed{\Lambda^*=\frac{|\boldsymbol W|}{|\boldsymbol B+\boldsymbol W|}
=\frac{239}{2196}=0.1088342441\approx0.1088.}
$$

### Lecturer-provided source answer, preserved

The lecturer prints

$$\Lambda^*=\frac{|W|}{|B+W|}=\frac{239}{2196}=0.1088\quad\text{(from R)},$$

and states that the null of no treatment effects is rejected because lambda is small (close to zero). The numerical lambda is correct to four decimal places.

**Important teaching clarification:** A small lambda *suggests* a strong effect, but **formal rejection cannot be justified solely because the number “looks small.”** The remaining exact-$F$ and large-sample calculations make the statistical decision rigorous.

### Step 6. Exact special-case $F$ test

The lecturer invokes an exact reference distribution for this special setup, $p=2$ responses and $g=3$ treatments. The displayed transformation is

$$
\boxed{F^*=\left(\frac{N-g-1}{g-1}\right)
\left(\frac{1-\sqrt{\Lambda^*}}{\sqrt{\Lambda^*}}\right).}
$$

First factor:

$$\frac{N-g-1}{g-1}=\frac{150-3-1}{3-1}
=\frac{146}{2}=73.$$

Second factor: take the square root of lambda.

$$\sqrt{\Lambda^*}=\sqrt{239/2196}\approx0.329900355.$$

Now subtract it from 1, then divide:

$$\frac{1-0.329900355}{0.329900355}
=\frac{0.670099645}{0.329900355}\approx2.03121969.$$

Multiply both factors:

$$
\boxed{F^*\approx73(2.03121969)=148.27894.}
$$

**Where does the lecturer's value 148.31 come from?** The source substitutes the **rounded** lambda $0.1088$ rather than using the full determinant ratio, obtaining **148.31**. Using the unrounded exact fraction $239/2196$ yields **148.28** to two decimal places. This is only a rounding discrepancy; **both calculations lead to precisely the same statistical decision**.

The exact reference for this special case is $F_{4,292}$. The source supplies its 1% upper critical value as 3.38, so

$$148.28>3.38\quad\Longrightarrow\quad \boxed{\text{Reject }H_0\text{ at }\alpha=0.01.}$$

The upper-tail p-value from full-precision arithmetic is approximately $4.77\times10^{-69}$. This extremely small result demonstrates strong evidence of at least one treatment effect on the **two responses jointly**.

### Lecturer-provided $F$ result, preserved

The printed source calculation is

$$\left(\frac{150-3-1}{3-1}\right)
\left(\frac{1-\sqrt{0.1088}}{\sqrt{0.1088}}\right)=148.31,$$

followed by “Since $148.31>F_{4,292}(.01)=3.38$, we reject $H_0$ and conclude that there exists a treatment effect at 1% level of significance.” This is the source's **correct substantive conclusion**, with the small numerical difference explained above.

### Step 7. Large-sample chi-square procedure

The lecturer also supplies the Bartlett-type large-sample statistic:

$$
\boxed{C=-\left(N-1-\frac{p+g}{2}\right)\ln(\Lambda^*).}
$$

The natural logarithm $\ln$ measures log scale and is negative for a positive number below 1. Because $\Lambda^*\approx0.1088<1$, we have $\ln\Lambda^*<0$; the leading minus sign makes the resulting statistic positive.

Here $N=150$, $p=2$, $g=3$:

$$N-1-\frac{p+g}{2}=150-1-\frac{2+3}{2}
=149-2.5=146.5.$$

Using full-precision lambda:

$$
\begin{aligned}
C&=-146.5\ln(239/2196)\\
&\approx\boxed{324.92664}.
\end{aligned}
$$

Under the asymptotic null model, this is compared with $\chi^2_{p(g-1)}$. Its degrees of freedom are

$$p(g-1)=2(3-1)=\boxed4.$$

The source gives the 1% upper chi-square critical value $\chi^2_4(.01)=13.28$; since

$$324.93>13.28,$$

we **reject** $H_0$ again. The corresponding upper-tail p-value from full-precision arithmetic is approximately $4.53\times10^{-69}$.

### Lecturer-provided large-sample result, preserved

The printed source substitutes $\Lambda^*=0.1088$ and obtains

$$-\left(150-1-\frac{2+3}{2}\right)\ln(0.1088)=324.97.$$

The lecturer then compares $324.97$ with $13.28$ and **rejects $H_0$ at 1%**. Using the unrounded determinant fraction yields **324.93** instead. Again, this is a rounding-only numerical difference.

### Step 8. Compare both methods in one table

| Quantity | Exact special-case method | Large-sample method |
|---|---|---|
| Input | $\Lambda=239/2196$ | $\Lambda=239/2196$ |
| Test transformation | Exact special-case $F$ | Approximate chi-square |
| Statistic (full precision) | $F\approx148.279$ | $C\approx324.927$ |
| Lecturer printed number from rounded lambda | 148.31 | 324.97 |
| Reference distribution | $F_{4,292}$ | $\chi^2_4$ approximately |
| 1% critical value supplied | 3.38 | 13.28 |
| Decision at 1% | Reject $H_0$ | Reject $H_0$ |

**Direct answer to 6(b):** Both methods agree: there is overwhelming statistical evidence of **a treatment effect in at least one component of the population mean response vectors**. The exact method is particularly appropriate here because the given problem falls into a special case with an exact $F$ transformation. The large-sample method is an approximation, but its result is in the same direction and far past the critical threshold.

**What neither method identifies:** The output alone does not tell us which treatment pairs differ, which response variables drive the difference, or how large the practical effect is. Those require further contrasts, descriptive means or data that were not supplied in the worksheet. We must **not invent treatment-group means or individual observations** from the given SSCP matrices.

## Question 6(c). Assumptions made when using these tests

### Lecturer-provided original answer, preserved

The source prints:

> “Covariance matrices of three populations are the same.”
>
> “Note that, the assumption; each population is multivariate normal, can be relaxed as the sample size ($n=150$) is large enough.”

This accurately conveys the intended course emphasis: **homogeneous covariance matrices** are an important MANOVA assumption, and sufficiently large samples can provide some protection against moderate deviations from normality. There are further details you should understand before treating this as a universal rule.

### Full beginner-friendly explanation

**1. Independence:** Observations should be independent individuals or experimental units under the one-way between-groups design. If the same subject contributes repeated measurements, a different model may be required. A large sample does not fix dependence or data duplication.

**2. Multivariate normality within each group:** For the classical **exact finite-sample** null distribution, the within-treatment response vectors are modeled as multivariate normal. Mild nonnormality may matter less in some large-sample settings, but it does not vanish by assumption. This is especially important for heavily skewed or outlier-prone variables.

**3. Common population covariance matrix:** The population covariance of the two responses should be the same in every treatment group:

$$\boldsymbol\Sigma_1=\boldsymbol\Sigma_2=\boldsymbol\Sigma_3.$$

Why? The common within-group covariance lets us pool information to estimate a single noise structure. If some groups have very different scatter, standard pooled MANOVA reference distributions may be miscalibrated.

**4. Enough observations for full-rank matrices:** The residual matrix must be positive definite or at least invertible where required. With two response variables and total residual degrees of freedom 147, this is feasible, and $W$ here has positive determinant $239$.

**5. Correct design and trustworthy data:** Measurements should correspond to the same variables and units across treatments; no gross entry errors, mislabeled groups, or arbitrary exclusions should contaminate the SSCP matrices.

### A subtle but important qualification about “150 is large”

The worksheet reports **150 observations in total**, but does not provide the *separate* treatment group sizes $n_1,n_2,n_3$. A large total $N$ does not guarantee that **every** treatment group is adequately large. For example, an extremely unbalanced allocation could leave one group small even when $N=150$. Thus we should not claim that multivariate normality can always be ignored just because the total exceeds a particular threshold.

**Complete answer to 6(c):** Assume independent observations, a suitably multivariate normal distribution of response vectors in each treatment group for the exact classical calibration, and **equal population covariance matrices** across the three treatments, along with nonsingular residual scatter and a correctly specified one-way design. Large within-group sample sizes may improve robustness to moderate normality departures, but they do not guarantee it. The lecturer's principal assumption of covariance equality is retained.

## Optional base-R verification for Question 6 (without original raw observations)

Question 6 is explicitly a **hand-calculation** question. The following R only verifies the matrix arithmetic from the supplied SSCP matrices; it cannot invent or fit a raw-data MANOVA when the 150 individual observations are unavailable.

```r
B <- matrix(c(11, -22,
              -22, 75), nrow = 2, byrow = TRUE)
W <- matrix(c(17, 4,
              4, 15), nrow = 2, byrow = TRUE)
T_total <- B + W

N <- 150
p <- 2
g <- 3

T_total                 # [28 -18; -18 90]
det(W)                  # 239
det(T_total)            # 2196

lambda <- as.numeric(det(W) / det(T_total))
lambda                  # 0.1088342441

# Exact special-case F transformation (p=2, g=3).
F_exact <- ((N - g - 1)/(g - 1)) *
           ((1 - sqrt(lambda))/sqrt(lambda))
F_exact                 # about 148.27894
qf(0.99, 4, 292)        # 1% upper F critical value, about 3.38
pf(F_exact, 4, 292, lower.tail = FALSE)

# Large-sample Bartlett-type chi-square transformation.
chi_stat <- -(N - 1 - (p + g)/2) * log(lambda)
chi_stat                # about 324.92664
qchisq(0.99, df = 4)    # 1% upper chi-square critical value, about 13.28
pchisq(chi_stat, df = 4, lower.tail = FALSE)

# Reproduce the lecturer's two rounded intermediate results.
lambda_printed <- 0.1088
F_from_rounded <- ((N - g - 1)/(g - 1)) *
                  ((1 - sqrt(lambda_printed))/sqrt(lambda_printed))
chi_from_rounded <- -(N - 1 - (p + g)/2) * log(lambda_printed)
F_from_rounded          # about 148.31
chi_from_rounded        # about 324.97
```

**How R verifies the paper calculation:** `matrix(...,byrow=TRUE)` arranges the supplied numbers in their printed row order. `B+W` adds the matrices entry by entry. `det()` computes each two-by-two determinant. `sqrt()` produces the positive square root of lambda. `log()` is the natural logarithm used in Bartlett's formula. `qf` and `qchisq` give **critical values**, whereas `pf(...,lower.tail=FALSE)` and `pchisq(...,lower.tail=FALSE)` give **upper-tail probabilities**. You should understand the hand derivation before using these commands as a shortcut.

---

# Part III – Reproducible master R script

The earlier question sections explain each command in slow detail. This consolidated script is designed for a reader who wants to **copy one continuous program into R** and rerun the numerical analyses in the worksheet's order. It uses **base R only**. It needs the three supplied `.DAT` files in R's working directory; the complete contents of those files are preserved in Appendix A, so the study guide also remains usable when studying offline.

**Important:** This is carefully constructed reproducible R code. Its numerical targets were independently checked using statistical software, but the R program itself was **not executed in the environment used to author the guide**.

```r
# DA2451 - PRACTICE WORKSHEET 05, ALL SIX QUESTIONS
# Use the actual .DAT files uploaded with the worksheet.
# If needed, choose your local folder BEFORE running read.table.
# setwd("YOUR/LOCAL/FOLDER")

# ============================================================
# Helpers: one-sample and two-sample Hotelling's T-squared
# ============================================================
hotelling_one <- function(X, mu0, alpha=0.05) {
  X <- as.matrix(X)
  storage.mode(X) <- "double"
  n <- nrow(X); p <- ncol(X)
  stopifnot(n > p, length(mu0) == p)
  S <- cov(X)
  d <- colMeans(X) - mu0
  T2 <- n * drop(crossprod(d, solve(S, d)))
  Fobs <- (n-p) * T2 / (p*(n-1))
  pv <- pf(Fobs, p, n-p, lower.tail=FALSE)
  list(n=n, p=p, mean=colMeans(X), S=S, difference=d,
       T2=T2, F=Fobs, df=c(p,n-p), p_value=pv,
       reject=pv < alpha)
}

hotelling_two <- function(A, B, alpha=0.05) {
  A <- as.matrix(A); B <- as.matrix(B)
  storage.mode(A) <- "double"
  storage.mode(B) <- "double"
  n1 <- nrow(A); n2 <- nrow(B); p <- ncol(A)
  stopifnot(ncol(B)==p, n1+n2>p+1)
  Sp <- ((n1-1)*cov(A) + (n2-1)*cov(B))/(n1+n2-2)
  d <- colMeans(A)-colMeans(B)
  T2 <- (n1*n2/(n1+n2)) * drop(crossprod(d, solve(Sp,d)))
  Fobs <- (n1+n2-p-1)*T2/(p*(n1+n2-2))
  pv <- pf(Fobs,p,n1+n2-p-1,lower.tail=FALSE)
  list(n=c(n1,n2),mean_difference=d,Sp=Sp,T2=T2,
       F=Fobs,df=c(p,n1+n2-p-1),p_value=pv,
       reject=pv < alpha)
}

# ============================================================
# Q1 - College results, n=87, p=3
# ============================================================
college <- read.table("T5-2(1).DAT",header=FALSE,
                      col.names=c("History","Verbal","Science"))
stopifnot(nrow(college)==87, ncol(college)==3)
college_matrix <- as.matrix(college)
cat("\nQUESTION 1\n")
print(colMeans(college_matrix))
print(cov(college_matrix))
print(cor(college_matrix))
q1 <- hotelling_one(college_matrix,c(500,50,30),alpha=0.05)
print(q1)
cat("Marginal Shapiro p-values:\n")
print(sapply(college,function(z) shapiro.test(z)$p.value))
par(mfrow=c(2,3))
for (name in names(college)) {
  qqnorm(college[[name]],main=paste("Normal Q-Q:",name))
  qqline(college[[name]],col="red")
}
plot(college$History,college$Verbal,xlab="History",ylab="Verbal")
plot(college$History,college$Science,xlab="History",ylab="Science")
plot(college$Verbal,college$Science,xlab="Verbal",ylab="Science")
par(mfrow=c(1,1))
D2_college <- mahalanobis(college_matrix,colMeans(college_matrix),
                          cov(college_matrix))
cat("Largest college Mahalanobis distance: observation",
    which.max(D2_college),"=",max(D2_college),"\n")

# ============================================================
# Q2 - Nine Peruvian hairs (read from PQ5.pdf)
# ============================================================
hair <- cbind(
 Chromium=c(.48,40.53,2.19,.55,.74,.66,.93,.37,.22),
 Strontium=c(12.57,73.68,11.13,20.03,20.29,.78,4.64,.43,1.08)
)
cat("\nQUESTION 2, WITH OUTLIER\n")
q2_all <- hotelling_one(hair,c(.30,10),alpha=.05)
print(q2_all)
print(cor(hair))
print(apply(hair,2,function(z) shapiro.test(z)$p.value))
par(mfrow=c(1,3))
qqnorm(hair[,1]);qqline(hair[,1],col="red")
qqnorm(hair[,2]);qqline(hair[,2],col="red")
plot(hair[,1],hair[,2],xlab="Chromium",ylab="Strontium")
text(hair[,1],hair[,2],labels=1:9,pos=3,cex=.7)
par(mfrow=c(1,1))

cat("\nQUESTION 2, WITHOUT OBSERVATION 2\n")
hair8 <- hair[-2,,drop=FALSE]
q2_reduced <- hotelling_one(hair8,c(.30,10),alpha=.05)
print(q2_reduced)
print(cor(hair8))
print(apply(hair8,2,function(z) shapiro.test(z)$p.value))

# ============================================================
# Q3 - Effluent, paired commercial and state laboratories
# ============================================================
effluent <- data.frame(
 Sample=1:11,
 CommBOD=c(6,6,18,8,11,34,28,71,43,33,20),
 CommSS=c(27,23,64,44,30,75,26,124,54,30,14),
 StateBOD=c(25,28,36,35,15,44,42,54,34,29,39),
 StateSS=c(15,13,22,29,31,64,30,64,56,20,21)
)
D <- as.matrix(effluent[,c("CommBOD","CommSS")]) -
     as.matrix(effluent[,c("StateBOD","StateSS")])
colnames(D) <- c("DifferenceBOD","DifferenceSS")
cat("\nQUESTION 3, ALL PAIRED SAMPLES\n")
print(D)
q3_all <- hotelling_one(D,c(0,0),alpha=.05)
print(q3_all)
cat("\nQUESTION 3, WITHOUT SAMPLE 8\n")
D10 <- D[-8,,drop=FALSE]
q3_reduced <- hotelling_one(D10,c(0,0),alpha=.05)
print(q3_reduced)
print(apply(D,2,function(z) shapiro.test(z)$p.value))
print(apply(D10,2,function(z) shapiro.test(z)$p.value))

# ============================================================
# Q4 - Two independent groups of painted turtles
# ============================================================
turtles <- read.table("T6-9(1).dat",header=FALSE,
                      col.names=c("Length","Width","Height","Sex"))
turtles$Sex <- factor(turtles$Sex,levels=c("female","male"))
stopifnot(nrow(turtles)==48)
print(table(turtles$Sex))
female <- as.matrix(turtles[turtles$Sex=="female",1:3])
male <- as.matrix(turtles[turtles$Sex=="male",1:3])
cat("\nQUESTION 4, RAW DATA\n")
q4_raw <- hotelling_two(female,male,alpha=.05)
print(q4_raw)
print(cov(female));print(cov(male))
cat("\nQUESTION 4, NATURAL LOG DATA\n")
q4_log <- hotelling_two(log(female),log(male),alpha=.05)
print(q4_log)
cat("Within-group marginal Shapiro p-values:\n")
print(apply(female,2,function(z) shapiro.test(z)$p.value))
print(apply(male,2,function(z) shapiro.test(z)$p.value))
print(apply(log(female),2,function(z) shapiro.test(z)$p.value))
print(apply(log(male),2,function(z) shapiro.test(z)$p.value))

# ============================================================
# Q5 - Three sandstone zones, five chemical responses
# ============================================================
oil <- read.table("T11-7(1).DAT",header=FALSE,
                  col.names=c("V","Fe","Be","Sat","Arom","Zone"))
oil$Zone <- factor(oil$Zone,levels=c("Wilhelm","SubMuli","Upper"))
stopifnot(nrow(oil)==56)
cat("\nQUESTION 5, GROUP SIZES\n")
print(table(oil$Zone))
print(aggregate(cbind(V,Fe,Be,Sat,Arom)~Zone,data=oil,FUN=mean))
fit_raw <- manova(cbind(V,Fe,Be,Sat,Arom)~Zone,data=oil)
cat("\nQUESTION 5, RAW MANOVA\n")
print(summary(fit_raw,test="Wilks"))
print(summary(fit_raw,test="Pillai"))

# Safely transform nonnegative measurements (including Be=0).
oil_log <- oil
for (nm in c("V","Fe","Be","Sat","Arom")) {
  oil_log[[nm]] <- log1p(oil[[nm]])
}
fit_log <- manova(cbind(V,Fe,Be,Sat,Arom)~Zone,data=oil_log)
cat("\nQUESTION 5, LOG1P MANOVA\n")
print(summary(fit_log,test="Wilks"))
print(summary(fit_log,test="Pillai"))

# Evaluate each response's marginal normality within each zone.
for (level in levels(oil$Zone)) {
  block <- oil[oil$Zone==level,c("V","Fe","Be","Sat","Arom")]
  cat("\nRaw-zone Shapiro p-values",level,"\n")
  print(apply(block,2,function(z) shapiro.test(z)$p.value))
}

# ============================================================
# Q6 - Hand MANOVA from the PROVIDED matrices only
# ============================================================
B <- matrix(c(11,-22,-22,75),2,2,byrow=TRUE)
W <- matrix(c(17,4,4,15),2,2,byrow=TRUE)
N <- 150; p <- 2; g <- 3
T_total <- B+W
lambda <- as.numeric(det(W)/det(T_total))
F_exact <- ((N-g-1)/(g-1))*((1-sqrt(lambda))/sqrt(lambda))
Chi_approx <- -(N-1-(p+g)/2)*log(lambda)
cat("\nQUESTION 6\n")
print(T_total)
print(c(detW=det(W),detTotal=det(T_total),lambda=lambda))
print(c(F=F_exact,p_exact=pf(F_exact,4,292,lower.tail=FALSE)))
print(c(ChiSquare=Chi_approx,
        p_approx=pchisq(Chi_approx,4,lower.tail=FALSE)))
cat("Lecturer rounded-lambda F:",
    ((N-g-1)/(g-1))*((1-sqrt(.1088))/sqrt(.1088)),"\n")
cat("Lecturer rounded-lambda chi-square:",
    -(N-1-(p+g)/2)*log(.1088),"\n")
```

### How to check that you have run it correctly

| Question | Simple numerical checkpoint | Expected independently calculated outcome |
|---|---|---|
| Q1 | Number of rows | 87 |
| Q1 | $T^2$, $F$, p | 223.3102, 72.7056, $2.83\times10^{-23}$ |
| Q2, all rows | $T^2$, p | 1.7725, 0.4964 |
| Q2, without row 2 | $T^2$, p | 5.3079, 0.1840 |
| Q3, 11 pairs | $T^2$, p | 13.6393, 0.02083 |
| Q3, 10 pairs | $T^2$, p | 11.4465, 0.03754 |
| Q4, raw | $T^2$, p | 72.3816, $3.97\times10^{-9}$ |
| Q4, logs | $T^2$, p | 85.0520, $4.36\times10^{-10}$ |
| Q5, raw | Wilks $\Lambda$ | 0.115911 |
| Q5, log1p | Wilks $\Lambda$ | 0.110795 |
| Q6 | $|W|$, $|T|$, $\Lambda$ | 239, 2196, 0.10883424 |

These checkpoints are especially helpful if a working-directory mistake, dataset-label mismatch, or wrong data-column order causes unexpected R output.

---

# Appendix A – Complete external datasets

The original PDF prints only brief excerpts of Questions 1 and 4 and refers to external datasets for Questions 1, 4 and 5. This appendix embeds the **actual user-supplied data** so that the teaching document remains fully interpretable offline. Each row below is taken from the uploaded file, not estimated from the excerpt. The first column `row` is an **added index for navigation**, not an original data column. To reconstruct the exact `.DAT` input, omit the added index and keep the original measurement columns and zone/sex labels.

## A1. Complete College Level Examination Program data: 87 records

**Uploaded file:** `T5-2(1).DAT`. **Rows:** 87. **Data provenance:** supplied alongside the five worksheets.

```text
row  History  Verbal  Science
  1  468  41  26
  2  428  39  26
  3  514  53  21
  4  547  67  33
  5  614  61  27
  6  501  67  29
  7  421  46  22
  8  527  50  23
  9  527  55  19
 10  620  72  32
 11  587  63  31
 12  541  59  19
 13  561  53  26
 14  468  62  20
 15  614  65  28
 16  527  48  21
 17  507  32  27
 18  580  64  21
 19  507  59  21
 20  521  54  23
 21  574  52  25
 22  587  64  31
 23  488  51  27
 24  488  62  18
 25  587  56  26
 26  421  38  16
 27  481  52  26
 28  428  40  19
 29  640  65  25
 30  574  61  28
 31  547  64  27
 32  580  64  28
 33  494  53  26
 34  554  51  21
 35  647  58  23
 36  507  65  23
 37  454  52  28
 38  427  57  21
 39  521  66  26
 40  468  57  14
 41  587  55  30
 42  507  61  31
 43  574  54  31
 44  507  53  23
 45  494  41  24
 46  541  47  25
 47  362  36  17
 48  408  28  17
 49  594  68  23
 50  501  25  26
 51  687  75  33
 52  633  52  31
 53  647  67  29
 54  647  65  34
 55  614  59  25
 56  633  65  28
 57  448  55  24
 58  408  51  19
 59  441  35  22
 60  435  60  20
 61  501  54  21
 62  507  42  24
 63  620  71  36
 64  415  52  20
 65  554  69  30
 66  348  28  18
 67  468  49  25
 68  507  54  26
 69  527  47  31
 70  527  47  26
 71  435  50  28
 72  660  70  25
 73  733  73  33
 74  507  45  28
 75  527  62  29
 76  428  37  19
 77  481  48  23
 78  507  61  19
 79  527  66  23
 80  488  41  28
 81  607  69  28
 82  561  59  34
 83  614  70  23
 84  527  49  30
 85  474  41  16
 86  441  47  26
 87  607  67  32
```

## A2. Complete painted-turtle measurements: 48 records

**Uploaded file:** `T6-9(1).dat`. **Rows:** 48. **Data provenance:** supplied alongside the five worksheets.

```text
row  Length  Width  Height  Sex
  1  98  81  38  female
  2  103  84  38  female
  3  103  86  42  female
  4  105  86  42  female
  5  109  88  44  female
  6  123  92  50  female
  7  123  95  46  female
  8  133  99  51  female
  9  133  102  51  female
 10  133  102  51  female
 11  134  100  48  female
 12  136  102  49  female
 13  138  98  51  female
 14  138  99  51  female
 15  141  105  53  female
 16  147  108  57  female
 17  149  107  55  female
 18  153  107  56  female
 19  155  115  63  female
 20  155  117  60  female
 21  158  115  62  female
 22  159  118  63  female
 23  162  124  61  female
 24  177  132  67  female
 25  93  74  37  male
 26  94  78  35  male
 27  96  80  35  male
 28  101  84  39  male
 29  102  85  38  male
 30  103  81  37  male
 31  104  83  39  male
 32  106  83  39  male
 33  107  82  38  male
 34  112  89  40  male
 35  113  88  40  male
 36  114  86  40  male
 37  116  90  43  male
 38  117  90  41  male
 39  117  91  41  male
 40  119  93  41  male
 41  120  89  40  male
 42  120  93  44  male
 43  121  95  42  male
 44  125  93  45  male
 45  127  96  45  male
 46  128  95  45  male
 47  131  95  46  male
 48  135  106  47  male
```

## A3. Complete crude-oil chemistry: 56 records

**Uploaded file:** `T11-7(1).DAT`. **Rows:** 56. **Data provenance:** supplied alongside the five worksheets.

```text
row  V  Fe  Be  Sat  Arom  Zone
  1  3.9  51.0  0.20  7.06  12.19  Wilhelm
  2  2.7  49.0  0.07  7.14  12.23  Wilhelm
  3  2.8  36.0  0.30  7.00  11.30  Wilhelm
  4  3.1  45.0  0.08  7.20  13.01  Wilhelm
  5  3.5  46.0  0.10  7.81  12.63  Wilhelm
  6  3.9  43.0  0.07  6.25  10.42  Wilhelm
  7  2.7  35.0  0.00  5.11  9.00  Wilhelm
  8  5.0  47.0  0.07  7.06  6.10  SubMuli
  9  3.4  32.0  0.20  5.82  4.69  SubMuli
 10  1.2  12.0  0.00  5.54  3.15  SubMuli
 11  8.4  17.0  0.07  6.31  4.55  SubMuli
 12  4.2  36.0  0.50  9.25  4.95  SubMuli
 13  4.2  35.0  0.50  5.69  2.22  SubMuli
 14  3.9  41.0  0.10  5.63  2.94  SubMuli
 15  3.9  36.0  0.07  6.19  2.27  SubMuli
 16  7.3  32.0  0.30  8.02  12.92  SubMuli
 17  4.4  46.0  0.07  7.54  5.76  SubMuli
 18  3.0  30.0  0.00  5.12  10.77  SubMuli
 19  6.3  13.0  0.50  4.24  8.27  Upper
 20  1.7  5.6  1.00  5.69  4.64  Upper
 21  7.3  24.0  0.00  4.34  2.99  Upper
 22  7.8  18.0  0.50  3.92  6.09  Upper
 23  7.8  25.0  0.70  5.39  6.20  Upper
 24  7.8  26.0  1.00  5.02  2.50  Upper
 25  9.5  17.0  0.05  3.52  5.71  Upper
 26  7.7  14.0  0.30  4.65  8.63  Upper
 27  11.0  20.0  0.50  4.27  8.40  Upper
 28  8.0  14.0  0.30  4.32  7.87  Upper
 29  8.4  18.0  0.20  4.38  7.98  Upper
 30  10.0  18.0  0.10  3.06  7.67  Upper
 31  7.3  15.0  0.05  3.76  6.84  Upper
 32  9.5  22.0  0.30  3.98  5.02  Upper
 33  8.4  15.0  0.20  5.02  10.12  Upper
 34  8.4  17.0  0.20  4.42  8.25  Upper
 35  9.5  25.0  0.50  4.44  5.95  Upper
 36  7.2  22.0  1.00  4.70  3.49  Upper
 37  4.0  12.0  0.50  5.71  6.32  Upper
 38  6.7  52.0  0.50  4.80  3.20  Upper
 39  9.0  27.0  0.30  3.69  3.30  Upper
 40  7.8  29.0  1.50  6.72  5.75  Upper
 41  4.5  41.0  0.50  3.33  2.27  Upper
 42  6.2  34.0  0.70  7.56  6.93  Upper
 43  5.6  20.0  0.50  5.07  6.70  Upper
 44  9.0  17.0  0.20  4.39  8.33  Upper
 45  8.4  20.0  0.10  3.74  3.77  Upper
 46  9.5  19.0  0.50  3.72  7.37  Upper
 47  9.0  20.0  0.50  5.97  11.17  Upper
 48  6.2  16.0  0.05  4.23  4.18  Upper
 49  7.3  20.0  0.50  4.39  3.50  Upper
 50  3.6  15.0  0.70  7.00  4.82  Upper
 51  6.2  34.0  0.07  4.84  2.37  Upper
 52  7.3  22.0  0.00  4.13  2.70  Upper
 53  4.1  29.0  0.70  5.78  7.76  Upper
 54  5.4  29.0  0.20  4.64  2.65  Upper
 55  5.0  34.0  0.70  4.21  6.50  Upper
 56  6.2  27.0  0.30  3.97  2.97  Upper
```

## A4. Effluent data from lecture Table 6.1

These 11 rows were supplied separately in the conversation and already appear in the complete original-data table under Question 3. They are not a `.DAT` file and require no external download. The corresponding base-R `data.frame` declaration in Question 3 and in the master R script embeds them directly.

## A5. Peruvian hair and Question 6 data

The nine Peruvian hair observations are printed in `PQ5.pdf`, Question 2, and reproduced in full in the original-question table under Question 2. The two-response, three-treatment SSCP matrices and all supplied degrees of freedom are printed in Question 6 and preserved under its original-question heading. There is **no unprovided raw dataset** needed to complete their requested calculations; however, the original 150 observation-level treatment responses in Question 6 are **not supplied**, so they cannot be reconstructed or used for any extra patient-level/treatment-level descriptive calculations.

---

# Appendix B – Exam checklist and misconceptions

## B1. Learn to identify the correct design in seconds

| If the question says… | Count the groups/measurements | Main method | Null being examined |
|---|---|---|---|
| “Are these 87 students different from a benchmark vector?” | One group; $p=3$ | One-sample Hotelling $T^2$ | $\mu=\mu_0$ |
| “Are these nine hair measurements consistent with a proposed vector?” | One group; $p=2$ | One-sample Hotelling $T^2$ | $\mu=\mu_0$ |
| “Two laboratories measured the same 11 effluent samples” | Matched pairs; $p=2$ differences | Paired Hotelling, applied to the differences | $\mu_D=0$ |
| “Compare female and male turtles” | Two independent groups; $p=3$ | Two-sample Hotelling $T^2$ | $\mu_F=\mu_M$ |
| “Compare three sandstone zones on five responses” | Three groups; $p=5$ | One-way MANOVA | $\mu_1=\mu_2=\mu_3$ |
| “Treatment, residual and total SSCP matrices are given” | Three groups; $p=2$ | MANOVA hand calculation, Wilks | No treatment effect |

## B2. The three $F$ conversion formulas that must not be mixed

**One-sample / paired Hotelling:**

$$\boxed{F=\frac{n-p}{p(n-1)}T^2\sim F_{p,n-p}.}$$

**Two-sample pooled-covariance Hotelling:**

$$\boxed{F=\frac{n_1+n_2-p-1}{p(n_1+n_2-2)}T^2\sim F_{p,n_1+n_2-p-1}.}$$

**The exact special-case MANOVA transformation used in Question 6 ($p=2,g=3$):**

$$\boxed{F=\frac{N-g-1}{g-1}\frac{1-\sqrt\Lambda}{\sqrt\Lambda}\sim F_{4,2(N-g-1)}.}$$

The third formula is **not a universal Wilks transformation** for arbitrary $p$ and $g$. Use software's proper reference transformation for the actual design.

## B3. Ten frequent errors explained

1. **Confusing $n$ with $p$.** In Question 1, $n=87$ independent students, $p=3$ variables. Reversing these produces wrong df and an incorrect test.
2. **Dividing sample covariance by $n$ instead of $n-1$.** Standard `cov` and `var` in R use $n-1$, consistent with the finite-sample Hotelling formula.
3. **Using raw Euclidean distance for different measurement scales.** Hotelling's statistic must adjust for variability and covariance.
4. **Inverting matrix entries separately.** $S^{-1}$ is the matrix inverse. Use `solve(S,d)` rather than writing $1/s_{jk}$.
5. **Treating paired laboratory observations as two independent samples.** Subtract within each physical sample first, then test the mean difference vector.
6. **Assuming significant MANOVA means every group pair and every response differs.** The omnibus test only establishes that not all population mean vectors are equal.
7. **Mixing up null and alternative when interpreting a big $p$-value.** $p>\alpha$ means failure to reject; it is not statistical proof that a claimed mean vector is true.
8. **Thinking a normal Q-Q plot proves joint multivariate normality.** Marginal Q-Q plots are necessary diagnostics but not sufficient to establish the full joint distribution.
9. **Deleting outliers without stating the rule.** Removal changes the study sample and can change covariance substantially. Show both analyses where requested and investigate potential recording errors.
10. **Ignoring R data layouts.** The three `.DAT` files have no header row; `T5-2(1).DAT` has three numeric columns, `T6-9(1).dat` has three numeric columns plus sex, and `T11-7(1).DAT` has five numeric columns plus zone. An incorrect import invalidates every downstream calculation.

## B4. Suggested written-exam response structure

When time is limited, write the question's intended **method**, the **null and alternative**, identify $n,p,g$ where relevant, state the chosen $\alpha$, show the **sample mean(s) and covariance information**, write and compute the **test statistic**, identify its **reference distribution/degrees of freedom**, calculate or report the **p-value**, make the decision, and finish with one sentence interpreting the result **in the real context**. Add the most relevant assumption or caveat where the question requires it.

For computer-based questions, state what each R output means. For example, `Pr(>F)` is the tail probability for the observed multivariate test transformation, not the chance that the treatments “are equal.”

## B5. Self-check questions with answers

**Q. Why does Question 2's mean chromium jump so much when one row is included?**  
**A.** A sample mean uses all values equally. The value 40.53 is overwhelmingly larger than the other eight chromium observations, so it increases the total and therefore increases the average. It also inflates variance, affecting Hotelling's standardized test.

**Q. Why do the laboratory difference means have different signs?**  
**A.** We explicitly compute Commercial minus State for each variable. On average commercial BOD is lower, but commercial SS is higher. If you reversed the subtraction for *both* variables, the mean signs would reverse but the squared paired Hotelling test statistic would be unchanged.

**Q. Why should the turtle comparison use a pooled covariance?**  
**A.** The conventional two-sample Hotelling test models both populations as having the same covariance matrix and combines the two estimates with degrees-of-freedom weights. Whether that equal-covariance assumption is sensible must be checked rather than assumed silently.

**Q. In MANOVA why is the treatment degrees of freedom $g-1$?**  
**A.** Although we have $g$ group means, their weighted departures from the grand mean satisfy a linear constraint, so only $g-1$ independent between-group directions remain.

**Q. In Question 6 why is Wilks' lambda less than one?**  
**A.** The total SSCP includes residual variation plus nonnegative between-group variation. The ratio of within-group to total generalized scatter is therefore between zero and one under the standard positive-definite setup. The observed value 0.1088 suggests substantial relative between-group separation.

**Q. What can you claim when Question 5 gives p about $10^{-19}$?**  
**A.** Under the classical MANOVA model and reference approximation, the data strongly contradict equal mean vectors across all sandstone zones. You cannot infer that all five chemical variables differ for every pair of zones, and the covariance and normality concerns should be reported.

---

# Appendix C – Source and completion audit

## C1. Four-page source traceability

| Original page | Worksheet content | Treatment in this guide |
|---|---|---|
| Page 1 | Question 1(a), 1(b), college score excerpt and benchmark mean | Full source preserved; 87-row dataset used, complete sample calculation, all three Q-Q plots and three scatterplots explained |
| Page 2 | Question 2(a)–(c) and nine hair pairs; Question 3; Question 4(a)–(b) | Exact data and subquestions preserved; one-sample/outlier, paired labs, two independent turtle groups all solved |
| Page 3 | Turtle data excerpt; Question 5; Question 6 SSCP table | Full dataset excerpts reproduced; 48-turtle and 56-oil `.DAT` files used; all three Question 6 matrices preserved |
| Page 4 | **Lecturer-provided answers for Question 6(a)–(c)** | All lecturer-provided results and conclusions preserved, expanded, and differentiated from precision corrections |

## C2. Every data dependency and its resolution

| Dependency | Used for | Available? | Status |
|---|---|---|---|
| `T5-2.dat` as supplied `T5-2(1).DAT` | Q1 | Yes, 87 rows | All requested calculations completed; copied into Appendix A |
| Hair measurements printed in `PQ5.pdf` | Q2 | Yes, nine paired values | Complete, both with and without outlier |
| Effluent Table 6.1 from `Lec8.pdf` | Q3 | Yes, supplied as 11-row table in conversation | Complete; paired results with all 11 and without sample 8 |
| `T6-9.dat` as supplied `T6-9(1).dat` | Q4 | Yes, 48 rows | Complete, raw and log analyses |
| `T11-7.dat` as supplied `T11-7(1).DAT` | Q5 | Yes, 56 rows | Complete, raw and `log1p` MANOVA |
| SSCP matrices printed in `PQ5.pdf` | Q6 | Yes | Complete hand calculations and R arithmetic check |

**There are no outstanding datasets needed for the exercises as asked.** The 150 individual-level treatment observations behind Question 6's precomputed SSCP matrices have **not** been supplied, but they are **not required** for the specified hand calculations and must not be invented. They would be required for new individual-level plots, treatment-group means, or detailed follow-up comparisons in Question 6.

## C3. Discrepancies, limitations, and source honesty

1. **Question 6 rounding:** The lecturer prints $\Lambda^*=0.1088$, $F=148.31$, and approximate chi-square $324.97$. These follow from the **rounded** lambda. Using the exact determinant fraction $239/2196$ gives $F\approx148.28$ and chi-square $\approx324.93$. Both reject overwhelmingly at 1%. No result was silently changed.
2. **Questions 1–5:** The PDF contains no printed worked solutions for these questions. This guide's answers are explicitly **independently calculated**, not presented as lecturer-provided answers.
3. **Normality and homogeneity:** Several datasets show nonnormal marginal behavior or unequal group covariance estimates. The stated classical p-values are numerical outputs of the standard methods; where assumptions are questionable, interpretation is explicitly qualified.
4. **Question 3 significance:** At the explicitly selected $\alpha=0.05$, the paired laboratory comparisons reject the equal-mean-vector null with and without the suspected sample. This answers the question directly while distinguishing a changed statistic from an unchanged decision.
5. **Question 5 transformation:** The use of `log1p` for all five chemical variables is a **supplementary analysis choice**, not a transformation specified or supplied as an answer by the lecturer.
6. **R verification:** The code is written to be runnable with the supplied `.DAT` files; because an R interpreter was not available during preparation, the guide makes **no false claim that the R programs themselves were executed**. The key statistics were independently computed and cross-checked through numerical Python libraries.

## C4. Final results at a glance

| Question | Main result | Interpreted decision |
|---|---|---|
| 1(a) | $T^2=223.3102$, $F=72.7056$, $p\approx2.83\times10^{-23}$ | Reject historic mean vector at 5% |
| 1(b) | Shapiro p-values 0.6861, 0.0387, 0.5358 | Verbal marginal challenges normality; joint normality not established |
| 2(a) | $T^2=1.7725$, $p\approx0.4964$ | Fail to reject proposed hair mean, but assumption concerns are substantial |
| 2(b) | Hair Shapiro p-values $8.08\times10^{-7}$, 0.001067 | Strong departure from normal marginals |
| 2(c) | Remove row 2: $T^2=5.3079$, $p\approx0.1840$ | Still fail to reject, but high sensitivity to the outlier |
| 3 | 11 pairs $p=0.02083$; 10 pairs $p=0.03754$ | Reject laboratory mean equality in both analyses at 5% |
| 4(a) | $T^2=72.3816$, $p\approx3.97\times10^{-9}$ | Reject female/male raw mean-vector equality at 5% |
| 4(b) | Log $T^2=85.0520$, $p\approx4.36\times10^{-10}$ | Reject on log scale too; covariance equality questionable |
| 5 | Raw Wilks $\Lambda=0.115911$, $p\approx6.80\times10^{-19}$ | Reject equal five-response mean vectors among three zones |
| 5 supplementary | Log1p Wilks $\Lambda=0.110795$, $p\approx2.35\times10^{-19}$ | Strong global difference persists after transformation |
| 6(a) | $N=150$, df treatment/residual/total $=2,147,149$ | Correct completed MANOVA table |
| 6(b) | $\Lambda=239/2196=0.108834$, exact-special-case $F\approx148.28$, Bartlett $\chi^2\approx324.93$ | Both reject no treatment effects at 1% |
| 6(c) | Independence, within-group normality, common covariance, suitable rank/design | State and critically interpret assumptions |

**Completion statement:** This is Practice Worksheet **05 only**, supplied as one self-contained UTF-8 Markdown teaching book, to be used alongside the four previously created **separate** Markdown teaching guides for Practice Worksheets 01–04.
