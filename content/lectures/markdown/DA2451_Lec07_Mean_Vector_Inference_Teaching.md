# Inferences About a Mean Vector

## A complete, from-zero teaching book for DA2451: Multivariate Methods in Business

**Primary source:** `Lec7.pdf`, *Inferences about a mean vector*, DA2451, Semester 4 (2026), **5 printed pages**.  
**Level:** Starts with no assumed statistical knowledge and develops the full one-sample Hotelling $T^2$ procedure.  
**Scope of attribution:** Statements marked **[Lecture, p. N]** are based on that printed page. Foundations, pedagogical illustrations, additional proofs, diagnostics, further R code, confidence-region material, and exercises are explicitly **textbook extensions**, not additional claims about what the lecturer taught.

> **Essential convention.** This book uses $F_{a,b;1-\alpha}$ and $\chi^2_{p;1-\alpha}$ to mean the *lower-tail $1-\alpha$ quantiles*, equivalently the upper-tail $\alpha$ critical values denoted by $F_{a,b,\alpha}$ and $\chi^2_{p,\alpha}$ in the notes. Both notations refer to the same cutoffs. The lecture's R output calls a value `T.2 = 2.9045`; the **raw quadratic-form Hotelling statistic** is $T^2=9.73877$, while the **$F$-scaled statistic** is $2.90455$. This important distinction is calculated and explained in Chapter 13.

---

## Contents

**Part I. Statistical reasoning from zero**

1. Why we need statistical inference
2. Population, sample, observations, parameters, and estimators
3. Chance, variation, probability distributions, and sampling distributions
4. What hypotheses, statistical evidence, confidence, and mistakes really mean

**Part II. From one variable to several**

5. The one-sample $t$ test and its confidence interval
6. Vectors, covariance matrices, correlation, and statistical distance
7. What the multivariate normal assumption means

**Part III. Hotelling's $T^2$ in detail**

8. Translating the one-sample $t$ test into Hotelling's $T^2$
9. Its exact $F$ distribution and the three decision approaches
10. Fully worked two-variable numerical example
11. Why testing one variable at a time can be misleading
12. The large-sample chi-square approximation

**Part IV. The complete lecture data example**

13. The 20-person perspiration data: every main calculation
14. Checking multivariate normality, including the lecture's R output
15. Reproducing the analysis in R and interpreting the individual tests

**Part V. Enrichment, practice, and reference**

16. Confidence ellipsoids and simultaneous intervals (**extension; omitted from lecture**) 
17. Assumptions, diagnostics, limitations, and choosing a method
18. How to solve and write up exam questions
19. Practice questions, fully explained answers, and common errors
20. Notation dictionary and source-page coverage audit

---

# PART I. STATISTICAL REASONING FROM ZERO

## 1. Why inference exists

Imagine that a university wants to learn the average number of hours its students sleep per night. In theory, it could ask **every student**. But that might require a large amount of time, money, and effort. Instead, it might survey 100 students selected to represent the university.

The university then faces a fundamental problem:

> Does the average calculated from those 100 students tell us anything trustworthy about the average for *all* students?

Answering questions of that kind is **statistical inference**. It is the process of using observations from a **sample** to learn about a larger **population**, while acknowledging that different samples would probably give different answers.

The lecture introduces inference as drawing conclusions about a population from a sample, and reminds us that several correlated characteristics often need to be examined together. **[Lecture, p. 1]**

### 1.1 Descriptive statistics versus inferential statistics

Suppose a sample of five students reports these sleep durations in hours:

$$6,\;7,\;8,\;5,\;9.$$

We can calculate the sample mean:

$$\overline{x}=\frac{6+7+8+5+9}{5}=7.$$

The sentence **"The five surveyed students slept an average of seven hours"** is descriptive: it tells us about the observed sample.

The sentence **"The mean sleep duration for all students might be seven hours"** is inferential: it concerns a larger population that we have *not* completely observed.

We should not quietly replace "the sample mean equals seven" with "the population mean equals seven." One is observed; the other is uncertain.

### 1.2 Why the uncertainty is unavoidable

A different randomly chosen group of five might produce:

$$5,\;6,\;7,\;7,\;8,$$

with a mean of $6.6$ hours. Neither sample is automatically "wrong." They simply contain different people. This is **sampling variation**, the natural variation in numerical summaries caused by selecting different samples.

Inference asks how unusual a sample result would be if a particular proposed population value were true. It then translates that evidence into a cautious conclusion.

### 1.3 Why business questions are often multivariate

A business might simultaneously measure:

- Customer satisfaction with product quality.
- Satisfaction with price.
- Satisfaction with support.

These are **three variables**, not one. An individual who is enthusiastic about a brand may give high scores on several dimensions. The scores may be correlated, so they contain overlapping information.

A question about the complete **average satisfaction profile** should account for that correlation. This is precisely the motivation for a mean-vector test such as Hotelling's $T^2$.

**Key idea:** Statistical inference is not merely "calculate a mean, then calculate a p-value." It is a structured argument about what can reasonably be learned from incomplete information.

---

## 2. The objects we measure: a plain-language dictionary

### 2.1 Population and sample

A **population** is the entire group of objects, people, customers, transactions, or measurements that a study intends to describe.

A **sample** is the subset of that population actually observed.

A **random sample** consists of observations generated under a sampling mechanism satisfying the required probabilistic assumptions. In textbook one-sample inference, the observations $X_1,\ldots,X_n$ are commonly assumed to be **independent and identically distributed** (i.i.d.):

- **Independent:** Learning one observation does not change the probabilistic distribution of another.
- **Identically distributed:** Each observation follows the same population distribution.

An arbitrary collection of convenient observations does not automatically satisfy these assumptions. A random mechanism does not necessarily remove nonresponse or selection bias either.

### 2.2 Observation, variable, and data table

A **variable** is a characteristic that can differ from one observed unit to another, such as height, income, or blood sodium concentration.

An **observation** is the recorded value or group of values for one unit.

In a data table:

- Each **row** is usually one unit or individual.
- Each **column** is usually one measured variable.
- $n$ is the **number of observations (rows)**.
- $p$ is the **number of variables (columns)**.

For $n=20$ participants and $p=3$ measurements, the data table has $20$ rows and $3$ measurement columns.

### 2.3 Parameters versus statistics

A **population parameter** is a numerical property of the population. Examples include the population mean $\mu$, population variance $\sigma^2$, and population covariance matrix $\boldsymbol\Sigma$.

A **sample statistic** is calculated from the available observations. Examples include sample mean $\overline X$, sample variance $s^2$, and sample covariance matrix $\mathbf S$.

| Population quantity (generally unknown) | Sample counterpart (calculated) |
|---|---|
| Population mean $\mu$ | Sample mean $\overline X$ |
| Population variance $\sigma^2$ | Sample variance $s^2$ |
| Population mean vector $\boldsymbol\mu$ | Sample mean vector $\overline{\mathbf X}$ |
| Population covariance matrix $\boldsymbol\Sigma$ | Sample covariance matrix $\mathbf S$ |

An **estimator** is the procedure or random quantity used to estimate a parameter; an **estimate** is its numerical value in a particular sample. For example, $\overline X$ is an estimator, while $\bar x=7$ is an observed estimate.

### 2.4 The hypothesized value $\mu_0$

The subscript $0$ means *the value proposed by the null hypothesis*. For example,

$$H_0:\mu=50$$

claims that the population mean is $50$.

The number $50$ is not automatically an estimate from the same data. It may be a historical benchmark, an agreed quality target, or a scientifically specified reference value. It should ideally be chosen independently of the outcome of the current test.

In a multivariate problem, this benchmark becomes a **vector**:

$$\boldsymbol\mu_0=\begin{bmatrix}4\\50\\10\end{bmatrix}.$$

This means the three proposed population means are $4$, $50$, and $10$ **simultaneously**. **[Lecture, pp. 1, 3]**

---

## 3. Randomness, variation, distributions, and standard errors

### 3.1 What a random variable means

A **random variable** assigns a number to an uncertain outcome. If $X$ denotes a randomly selected student's sleep duration, $X$ is uncertain before we observe the student.

A **probability distribution** describes which values $X$ may take and how probable different values or ranges are.

For continuous measurements, the probability of lying in an interval is often more useful than the probability of taking one exact value.

### 3.2 Mean: the long-run balancing point

The population mean is written $\mu=E[X]$. The notation $E[X]$ means the *expected value*, or distribution-weighted average, of the random variable $X$.

For $n$ observations, the sample mean is

$$\boxed{\overline X=\frac1n\sum_{j=1}^n X_j}.$$

Let's decode the entire formula:

- $\overline X$: sample mean.
- $n$: sample size.
- $X_j$: observation number $j$.
- $j$: counting index.
- $\sum$: add the quantities over the indicated values of $j$.
- $\frac1n$: divide the total by the number of observations.

This formula appears in the univariate recap of the lecture. **[Lecture, p. 1]**

### 3.3 Variance: how spread out the values are

Consider two groups of five measurements:

- Group A: $9,10,10,10,11$.
- Group B: $2,6,10,14,18$.

Both means equal $10$, but Group B has much greater variation. The **variance** captures that difference.

The sample variance is

$$\boxed{s^2=\frac{1}{n-1}\sum_{j=1}^n(X_j-\overline X)^2}.$$

Every operation has a purpose:

1. $X_j-\overline X$: find how far one measurement is from the sample mean.
2. $(X_j-\overline X)^2$: square this deviation, making it nonnegative and giving large deviations more weight.
3. $\sum$: total the squared deviations.
4. Divide by $n-1$: account for the fact that the sample mean was estimated using these observations.

The denominator $n-1$, not $n$, is used in the **usual unbiased sample variance estimator** for i.i.d. observations with finite variance. Once the mean is calculated from the sample, the centered deviations must sum to zero. Only $n-1$ of those deviations can vary freely.

The **standard deviation** is $s=\sqrt{s^2}$. It has the same measurement units as the original data, while $s^2$ has squared units.

### 3.4 Standard deviation versus standard error

These are frequently confused.

- A **standard deviation** describes how individual observations vary.
- A **standard error** describes how an estimator, such as a sample mean, varies across repeated random samples.

For independent observations from a population with variance $\sigma^2$,

$$\operatorname{Var}(\overline X)=\frac{\sigma^2}{n},\qquad
\operatorname{SD}(\overline X)=\frac{\sigma}{\sqrt n}.$$

When $\sigma$ is unknown, we usually estimate the standard error by

$$\boxed{\operatorname{SE}(\overline X)=\frac{s}{\sqrt n}}.$$

Why does the denominator contain $\sqrt n$ rather than $n$? The **variance** of the independent-observation average falls by a factor of $n$; taking the square root turns this into a standard deviation that falls by $\sqrt n$.

For example, if $s=12$ and $n=36$,

$$\operatorname{SE}(\overline X)=\frac{12}{\sqrt{36}}=2.$$

Even though individual observations differ by roughly $12$ units, the sample average has an estimated standard error of only $2$ units.

### 3.5 Sampling distributions: the concept that makes testing possible

Suppose we repeatedly draw new random samples of the same size from one population. Each sample has a different mean. The distribution of *those sample means* is the **sampling distribution of $\overline X$**.

This is different from the distribution of individual observations.

The observed mean is treated as a realization of a random estimator. A hypothesis test asks whether its observed value lies in an unusually extreme part of its sampling distribution **if $H_0$ is true**.

### 3.6 The normal distribution and Student's $t$ distribution

A **normal distribution** is a symmetric, bell-shaped continuous distribution governed by a mean $\mu$ and variance $\sigma^2$:

$$X\sim N(\mu,\sigma^2).$$

The symbol $\sim$ means "has the probability distribution." The Greek letter $\sigma$ denotes a population standard deviation, while $\sigma^2$ denotes its variance.

If the population is normal and $\sigma$ is known, the standardized mean

$$Z=\frac{\overline X-\mu}{\sigma/\sqrt n}$$

has the standard normal distribution.

Usually we do *not* know $\sigma$. Replacing it with the estimated $s$ introduces extra uncertainty. Under normal-population assumptions, the result follows a **Student's $t$ distribution** with $n-1$ degrees of freedom. It resembles the standard normal curve but has heavier tails, particularly for small samples.

A **degree of freedom**, abbreviated **df**, measures how many independent pieces of variation remain after accounting for estimated quantities. For the sample variance in a one-sample mean problem, that count is $n-1$.

---

## 4. Hypothesis testing without mystery

### 4.1 The competing statements

A **null hypothesis**, $H_0$, is the specific statistical claim whose compatibility with the data we test.

An **alternative hypothesis**, $H_1$, describes a departure from the null.

For a two-sided test of one mean,

$$H_0:\mu=\mu_0,\qquad H_1:\mu\ne\mu_0.$$

Here $\ne$ means "not equal." The alternative includes values *above or below* the proposed mean.

A two-sided alternative is appropriate if either higher-than-expected or lower-than-expected population means count as meaningful discrepancies.

### 4.2 The test statistic

A **test statistic** converts data into a number whose distribution is known, exactly or approximately, if $H_0$ is true. The statistic usually compares:

$$\frac{\text{observed discrepancy from }H_0}{\text{estimated size of ordinary sampling variation}}.$$

A large standardized discrepancy is generally more difficult to reconcile with $H_0$ than a small one.

### 4.3 Significance level $\alpha$

The **significance level** $\alpha$ is a rule chosen before inspecting the data, commonly $0.05$ or $0.10$.

For a valid test, $\alpha$ controls the probability of a **Type I error**: rejecting $H_0$ when $H_0$ is actually true. It does *not* mean the probability that the null is true.

At $\alpha=0.10$, we permit a 10% long-run false-rejection rate under the assumptions of the test. A less permissive cutoff such as $0.05$ demands stronger evidence.

### 4.4 P-value: the correct interpretation

A **p-value** is the probability, **assuming $H_0$ and the model's assumptions**, of obtaining a test statistic at least as extreme as the observed one.

For a two-sided $t$ test, extreme means far into *either* tail. For Hotelling's $T^2$, the statistic is nonnegative, and large values are extreme.

A p-value of $0.06493$ means:

> If the proposed mean vector were correct and the test assumptions held, a result at least this statistically extreme would occur in about 6.493% of repeated samples.

It **does not mean**:

- There is a 6.493% probability that $H_0$ is true.
- There is a 93.507% probability that $H_1$ is true.
- The measured difference must be practically important.
- The sample was random or unbiased.

The usual rule is

$$\boxed{p\text{-value}<\alpha\quad\Longrightarrow\quad\text{reject }H_0.}$$

If $p\ge\alpha$, write **"fail to reject $H_0$"**, not **"prove $H_0$"** or **"accept $H_0$ as true."** Insufficient evidence against the claim is not positive proof of the claim.

### 4.5 Two possible mistakes

| Reality | We reject $H_0$ | We fail to reject $H_0$ |
|---|---|---|
| $H_0$ really true | **Type I error** | Correct non-rejection |
| $H_0$ really false | Correct rejection | **Type II error** |

The probability of rejecting a false null is called **power**. Larger, more informative samples and more substantial true differences often increase power.

A small sample with a nonsignificant p-value may simply be too weak to detect a real departure.

### 4.6 Confidence intervals and their actual meaning

A **confidence interval** is calculated by a procedure designed to cover the fixed but unknown population parameter in a specified proportion of repeated samples.

A 95% confidence procedure covers the true parameter in 95% of repetitions *under its assumptions*. After observing one interval, the unknown frequentist parameter is fixed, not random. It is therefore imprecise to say there is a 95% probability that the particular parameter lies inside the observed interval without changing the inferential framework.

With a two-sided test at $\alpha=0.05$, the corresponding 95% confidence interval provides an equivalent decision for that one mean: if $\mu_0$ is outside it, reject $H_0$.

---

# PART II. FROM ONE VARIABLE TO SEVERAL

## 5. The one-sample $t$ test: the foundation of the entire lecture

The lecturer begins with the familiar **one-sample, two-sided $t$ test**. **[Lecture, p. 1]**

### 5.1 Its exact formula

For $X_1,\ldots,X_n$ independently sampled from a univariate normal population,

$$\boxed{t=\frac{\overline X-\mu_0}{s/\sqrt n}.}$$

If the null hypothesis is true,

$$\boxed{t\sim t_{n-1}.}$$

Read each part carefully:

- $t$ is the test statistic.
- $\overline X$ is the observed sample mean.
- $\mu_0$ is the mean claimed by $H_0$.
- $\overline X-\mu_0$ is the raw discrepancy.
- $s$ is the sample standard deviation.
- $s/\sqrt n$ is the estimated standard error of the mean.
- $t_{n-1}$ is Student's $t$ distribution with $n-1$ degrees of freedom.

The statistic has a **sign**. A positive value means the sample mean is above the hypothesized mean; a negative value means it is below. In a two-sided test, we examine $|t|$, the absolute value, because either direction may be evidence against $H_0$.

### 5.2 Fully worked beginner example

**Textbook illustration, not the lecture's numerical example.**

Suppose the sample consists of

$$4,\;5,\;6,\;7,\;8,$$

and a researcher tests

$$H_0:\mu=5,\qquad H_1:\mu\ne5,\qquad \alpha=0.05.$$

**Step 1. Count the sample.** There are $n=5$ observations.

**Step 2. Calculate the sample mean.**

$$\overline x=\frac{4+5+6+7+8}{5}=\frac{30}{5}=6.$$

**Step 3. Find the squared deviations.**

| $x_j$ | $x_j-6$ | $(x_j-6)^2$ |
|---:|---:|---:|
| 4 | $-2$ | 4 |
| 5 | $-1$ | 1 |
| 6 | 0 | 0 |
| 7 | 1 | 1 |
| 8 | 2 | 4 |
| **Total** | **0** | **10** |

**Step 4. Calculate variance and standard deviation.**

$$s^2=\frac{10}{5-1}=2.5,\qquad s=\sqrt{2.5}=1.58114.$$

**Step 5. Calculate the standard error.**

$$\operatorname{SE}(\overline X)=\frac{1.58114}{\sqrt5}=0.707107.$$

**Step 6. Calculate the $t$ statistic.**

$$t=\frac{6-5}{0.707107}=1.41421.$$

**Step 7. Determine degrees of freedom.**

$$df=n-1=4.$$

**Step 8. Calculate the two-sided p-value.**

$$p=2P(t_4\ge|1.41421|)\approx0.23020.$$

Here $P$ means probability, and the multiplication by $2$ accounts for *both* tails of the symmetric $t$ distribution.

**Step 9. Decide.** Since $0.23020>0.05$, **fail to reject $H_0$**.

**Step 10. Interpret.** This sample does not provide enough evidence at the 5% significance level to conclude that the population mean is different from $5$.

It would be incorrect to say that this result demonstrates that the true mean is exactly $5$.

### 5.3 The critical-value version

The 95th-percent interval of a two-sided test uses the upper-tail $\alpha/2$ critical value. In the lecture's notation,

$$\boxed{\text{Reject if }|t|>t_{n-1,\alpha/2}.}$$

For $n=5$ and $\alpha=0.05$,

$$t_{4,0.025}\approx2.77645.$$

Because $1.41421<2.77645$, we again fail to reject. The critical-value and p-value approaches do not represent two different statistical tests; they are two ways to apply the **same** test.

### 5.4 Deriving the confidence interval

The two-sided $(1-\alpha)100\%$ interval for a normally distributed population mean with unknown variance is

$$\boxed{\overline x\pm t_{n-1,\alpha/2}\frac{s}{\sqrt n}.}$$

The symbol $\pm$ means form a lower endpoint by subtracting the margin and an upper endpoint by adding it.

For the example,

$$6\pm2.77645(0.707107)=6\pm1.96324,$$

so the 95% interval is approximately

$$\boxed{[4.03676,\;7.96324].}$$

Because $5$ falls *inside* this interval, the 5% two-sided test does not reject $H_0:\mu=5$.

### 5.5 The test and confidence interval must use matching levels

A **two-sided 10% test** corresponds to a **90% confidence interval**, while a **two-sided 5% test** corresponds to a **95% confidence interval**. Comparing a 10% significance test to a 95% confidence interval is not logically equivalent.

The original lecture writes the general interval and then later prints 95% intervals from R, even though its main multivariate test is performed at 10%. We will preserve those 95% outputs and distinguish them from the main test's 10% decision. **[Lecture, pp. 1, 3–4]**

### 5.6 The leap we are about to make

The univariate $t$ statistic compares one estimated mean to one hypothesized mean. In multivariate inference, we instead compare **several means as a package**.

The central question becomes:

> How far is the whole sample mean *vector* from the proposed population mean vector, taking into account the variability and correlations among its coordinates?

---

## 6. Vectors, matrices, correlation, and the meaning of distance

### 6.1 A vector is an organized column of numbers

For a study measuring three variables per person, one individual's observation is

$$\mathbf X_i=\begin{bmatrix}X_{i1}\\X_{i2}\\X_{i3}\end{bmatrix}.$$

Read $X_{ij}$ as "variable $j$ measured on observation $i$." The vector has **three rows and one column**, called a $3\times1$ vector.

In general, a $p\times1$ vector contains $p$ components.

The **population mean vector** is

$$\boldsymbol\mu=\begin{bmatrix}\mu_1\\\mu_2\\\vdots\\\mu_p\end{bmatrix},$$

and the **sample mean vector** is

$$\boxed{\overline{\mathbf X}=\frac1n\sum_{i=1}^n\mathbf X_i
=\begin{bmatrix}\overline X_1\\\overline X_2\\\vdots\\\overline X_p\end{bmatrix}.}$$

A sum of vectors is performed **component by component**. Dividing by $n$ averages each component separately.

### 6.2 Why a simple distance between means is not enough

Suppose a company's average order value differs from a target by $\$100$, and its average item count differs from its target by one item.

The raw discrepancy vector might be

$$\mathbf d=\begin{bmatrix}100\\1\end{bmatrix}.$$

The ordinary Euclidean squared distance is

$$\mathbf d'\mathbf d=100^2+1^2=10{,}001.$$

But money and item counts have different units. Altering dollars to cents would change the distance dramatically, although the underlying business evidence would be identical.

We need to **standardize differences by their variability**, and to account for the possibility that variables move together.

### 6.3 Covariance: how two variables move together

For variables $X$ and $Y$, the population covariance is

$$\operatorname{Cov}(X,Y)=E[(X-\mu_X)(Y-\mu_Y)].$$

The sample covariance is

$$\boxed{s_{XY}=\frac1{n-1}\sum_{i=1}^n(X_i-\overline X)(Y_i-\overline Y).}$$

- A positive covariance means values of $X$ above their mean tend to occur with values of $Y$ above their mean.
- A negative covariance means high $X$ values tend to occur with low $Y$ values.
- A covariance near zero suggests little **linear** association, but does not rule out nonlinear relationships.

Covariance depends on the units of its variables. **Correlation** removes those units:

$$\boxed{r_{XY}=\frac{s_{XY}}{s_Xs_Y}.}$$

Correlation ranges from $-1$ to $1$, provided neither sample standard deviation is zero. A correlation of $1$ is perfect positive linear association, while $-1$ is perfect negative linear association.

### 6.4 The covariance matrix

For three variables, the sample covariance matrix is

$$\mathbf S=
\begin{bmatrix}
s_1^2 & s_{12} & s_{13}\\
s_{12} & s_2^2 & s_{23}\\
s_{13} & s_{23} & s_3^2
\end{bmatrix}.$$

Interpretation:

- The **diagonal** entries $s_j^2$ are the individual sample variances.
- The **off-diagonal** entries $s_{jk}$ are sample covariances between different variables.
- The matrix is **symmetric**: $s_{jk}=s_{kj}$.

The general formula is

$$\boxed{\mathbf S=\frac1{n-1}\sum_{i=1}^{n}
(\mathbf X_i-\overline{\mathbf X})(\mathbf X_i-\overline{\mathbf X})'.}$$

Here the prime $'$ means **transpose**. If a column vector has dimensions $p\times1$, its transpose is a row vector of dimensions $1\times p$.

A $p\times1$ column multiplied by a $1\times p$ row creates a **$p\times p$ matrix**. This is why the formula produces a covariance matrix rather than a single number.

### 6.5 Multiplying matrices: a gentle introduction

If

$$\mathbf A=\begin{bmatrix}a&b\\c&d\end{bmatrix},\qquad
\mathbf v=\begin{bmatrix}x\\y\end{bmatrix},$$

then

$$\mathbf A\mathbf v=\begin{bmatrix}ax+by\\cx+dy\end{bmatrix}.$$

Each output entry is formed by multiplying the corresponding **row** of the matrix by the **column** vector and adding the products.

Dimensions matter:

$$\underbrace{\mathbf A}_{2\times2}\underbrace{\mathbf v}_{2\times1}
=\underbrace{\mathbf A\mathbf v}_{2\times1}.$$

For a matrix product to exist, the two *inner* dimensions must match.

### 6.6 What an inverse matrix does

For a nonzero number $a$, multiplying by $a^{-1}=1/a$ undoes multiplication by $a$.

For a square matrix $\mathbf S$, an **inverse matrix** $\mathbf S^{-1}$ plays the analogous role:

$$\mathbf S^{-1}\mathbf S=\mathbf I,$$

where $\mathbf I$ is the **identity matrix**, which has $1$s on its diagonal and $0$s elsewhere.

For a $2\times2$ matrix,

$$\mathbf S=\begin{bmatrix}a&b\\c&d\end{bmatrix},$$

if $ad-bc\ne0$, its inverse is

$$\boxed{\mathbf S^{-1}=\frac1{ad-bc}\begin{bmatrix}d&-b\\-c&a\end{bmatrix}.}$$

The quantity $ad-bc$ is the **determinant**. A zero determinant means the matrix is singular, so its ordinary inverse does not exist.

In statistics, a covariance matrix becomes singular if some variable is an exact linear combination of the others. This can happen, for example, if a dataset contains a total that is exactly the sum of two component variables.

### 6.7 The quadratic form and why it matters

Let the difference between observed and hypothesized mean vectors be

$$\mathbf d=\overline{\mathbf X}-\boldsymbol\mu_0.$$

The expression

$$\boxed{\mathbf d'\mathbf S^{-1}\mathbf d}$$

is a **quadratic form**. Follow its dimensions:

$$\underbrace{\mathbf d'}_{1\times p}
\underbrace{\mathbf S^{-1}}_{p\times p}
\underbrace{\mathbf d}_{p\times1}
=\underbrace{\text{one number}}_{1\times1}.$$

This one number measures how unusual the difference vector is **relative to observed multivariate variability**. It is a covariance-adjusted squared distance, closely related to **squared Mahalanobis distance**.

If $\mathbf S$ is positive definite, this number is nonnegative. It equals zero only when $\mathbf d=\mathbf0$.

For a single variable ($p=1$), the covariance matrix is simply $[s^2]$, and its inverse is $[1/s^2]$. The quadratic form then becomes

$$\mathbf d'\mathbf S^{-1}\mathbf d
=\frac{(\overline X-\mu_0)^2}{s^2}.$$

So the multivariate expression is a natural extension of the familiar standardized squared deviation.

### 6.8 Why correlation changes the answer

Imagine two strongly positively correlated variables. If both sample means move upward together, that may align with their ordinary joint variation. If one moves upward and the other downward by similar standardized amounts, that combination may be much less usual.

Simply adding two separate squared $t$ statistics ignores this difference. The covariance matrix, especially its **off-diagonal terms**, captures it.

### 6.9 Standardizing does not discard correlations

Suppose each variable is converted to a z-score by subtracting its sample mean and dividing by its sample standard deviation. A properly constructed Mahalanobis distance computed after that transformation uses the **correlation matrix** in place of the original covariance matrix.

Under an invertible change of units, the resulting quadratic form is unchanged. This unit-invariance is a major advantage over ordinary Euclidean distance.

---

## 7. Multivariate normality: what $N_p(\boldsymbol\mu,\boldsymbol\Sigma)$ means

The lecture writes

$$\mathbf X_i\sim N_p(\boldsymbol\mu,\boldsymbol\Sigma),$$

meaning that each observation is a random **$p$-dimensional vector** from a multivariate normal population. **[Lecture, p. 1]**

### 7.1 Reading every symbol

- $\mathbf X_i$: the vector measured for sampled unit $i$.
- $\sim$: is distributed according to.
- $N$: normal distribution family.
- Subscript $p$: number of jointly modeled variables.
- $\boldsymbol\mu$: the $p\times1$ population mean vector.
- $\boldsymbol\Sigma$: the $p\times p$ population covariance matrix.

For $p=2$, we might write

$$\boldsymbol\mu=\begin{bmatrix}10\\20\end{bmatrix},\qquad
\boldsymbol\Sigma=\begin{bmatrix}9&4\\4&16\end{bmatrix}.$$

This describes two variables whose population means are $10$ and $20$, population variances are $9$ and $16$, and covariance is $4$.

The corresponding population correlation is

$$\rho=\frac{4}{\sqrt9\sqrt{16}}=\frac4{12}=\frac13.$$

### 7.2 The geometry: a cloud, not just a bell curve

For one normally distributed measurement, the density has the familiar bell shape on a line.

For two jointly normal measurements, think of a bell-shaped **surface** above a plane. Seen from above, equal-density contours are ellipses.

- When correlation is zero, the ellipses align with the coordinate axes.
- When correlation is nonzero, the ellipses tend to tilt.
- Strong correlation can create long, narrow ellipses.

In more than two dimensions, the analogous contours are **ellipsoids**.

### 7.3 What multivariate normality does *not* mean

It is not enough to check that each variable looks normally distributed on its own. Multivariate normality imposes a condition on their **joint** distribution.

One characterization is that every linear combination $\mathbf a'\mathbf X$ is normally distributed, for every fixed vector $\mathbf a$ (with degenerate constant cases understood).

This is a stronger requirement than normal-looking marginal histograms.

### 7.4 Independence is a separate assumption

If observations come from the same participant repeatedly, from matched pairs, or from tightly grouped households, independence may fail even when each vector looks approximately normal.

Multivariate normality describes the *within-observation joint distribution*; it does not, by itself, justify treating the observations as an independent sample.

---

# PART III. HOTELLING'S $T^2$ IN DETAIL

## 8. Building Hotelling's $T^2$ from the one-sample $t$ test

### 8.1 Start by squaring the ordinary $t$

Recall

$$t=\frac{\overline X-\mu_0}{s/\sqrt n}.$$

Squaring both sides:

$$t^2=\frac{(\overline X-\mu_0)^2}{s^2/n}.$$

Dividing by $s^2/n$ is equivalent to multiplying by $n/s^2$:

$$\boxed{t^2=n(\overline X-\mu_0)(s^2)^{-1}(\overline X-\mu_0).}$$

Here $(s^2)^{-1}=1/s^2$. The result is nonnegative and measures squared distance from the hypothesized mean in **estimated standard-error units**.

This scalar expression is the explicit stepping-stone used on page 2 of the lecture. **[Lecture, p. 2]**

### 8.2 Replace the number by a vector

One mean becomes a mean vector:

$$\overline X\quad\longrightarrow\quad\overline{\mathbf X}.$$

One hypothesized mean becomes a hypothesized vector:

$$\mu_0\quad\longrightarrow\quad\boldsymbol\mu_0.$$

One variance becomes a covariance matrix:

$$s^2\quad\longrightarrow\quad\mathbf S.$$

Ordinary scalar multiplication becomes a dimensionally correct quadratic form:

$$\boxed{T^2=n(\overline{\mathbf X}-\boldsymbol\mu_0)'
\mathbf S^{-1}
(\overline{\mathbf X}-\boldsymbol\mu_0).}$$

This is **Hotelling's one-sample $T^2$ statistic**. **[Lecture, p. 2]**

### 8.3 Every single symbol and operation

| Symbol | Dimensions | Meaning |
|---|---|---|
| $T^2$ | Scalar | Hotelling's observed multivariate test statistic |
| $n$ | Scalar | Number of independent observations |
| $p$ | Scalar | Number of measured variables |
| $\overline{\mathbf X}$ | $p\times1$ | Sample mean vector |
| $\boldsymbol\mu_0$ | $p\times1$ | Hypothesized population mean vector |
| $\overline{\mathbf X}-\boldsymbol\mu_0$ | $p\times1$ | Vector of sample-minus-hypothesis discrepancies |
| Prime $'$ | Operation | Transpose column to row |
| $\mathbf S$ | $p\times p$ | Sample covariance matrix with $n-1$ divisor |
| $\mathbf S^{-1}$ | $p\times p$ | Inverse covariance matrix, when it exists |

**In words:** Subtract the proposed means from the observed means; rescale this *whole discrepancy vector* using the covariance structure; then multiply by the sample size.

### 8.4 Why the sample size multiplies the distance

The covariance matrix of the **sample mean vector** is

$$\operatorname{Cov}(\overline{\mathbf X})=\frac{\boldsymbol\Sigma}{n}$$

for independent observations with the same finite covariance matrix.

We estimate this as $\mathbf S/n$. Its inverse is

$$\left(\frac{\mathbf S}{n}\right)^{-1}=n\mathbf S^{-1}.$$

Therefore

$$T^2=(\overline{\mathbf X}-\boldsymbol\mu_0)'
\left(\frac{\mathbf S}{n}\right)^{-1}
(\overline{\mathbf X}-\boldsymbol\mu_0).$$

This exposes the correct idea: $T^2$ measures distance relative to the **uncertainty in the mean vector**, rather than variability of individual observations.

For the same observed discrepancy and approximately unchanged population covariance, increasing $n$ increases the evidence against $H_0$ because a sample mean estimated from more observations should fluctuate less.

### 8.5 The hypotheses and their interpretation

For one-sample mean-vector inference,

$$\boxed{H_0:\boldsymbol\mu=\boldsymbol\mu_0}$$

against

$$\boxed{H_1:\boldsymbol\mu\ne\boldsymbol\mu_0.}$$

The null claims **all $p$ population means agree with the proposed values simultaneously**.

The alternative means **at least one component differs**, although the joint evidence might be driven by a combination of component changes. We do not need every variable's mean to differ to reject.

Unlike the signed univariate $t$ statistic, $T^2$ does not carry a direction. It increases as the *joint discrepancy* becomes more unusual.

### 8.6 What assumptions are needed for the exact test?

The conventional exact one-sample Hotelling test relies on:

1. **Independent, identically distributed observation vectors**.
2. A **multivariate normal population** for the exact finite-sample $F$ distribution.
3. A **nonsingular covariance structure**, so the inverse is meaningful.
4. Enough observations: typically **$n>p$**, with a nonsingular sample covariance matrix. Under a positive-definite multivariate normal model and $n>p$, nonsingularity holds with probability one.
5. A **fixed, specified null vector** $\boldsymbol\mu_0$ and a properly selected significance level.

Data-entry mistakes, uncontrolled selection bias, extreme outliers, and unrecognized clustering can still invalidate interpretations, even when the matrix can be inverted.

---

## 9. Why the $F$ distribution appears, and how to make a decision

### 9.1 The $F$ distribution in plain language

An $F$ distribution is a continuous distribution supported on **nonnegative** numbers. It has two parameters called **numerator** and **denominator degrees of freedom**.

We write

$$F\sim F_{d_1,d_2}.$$

The notation means that the random variable $F$ follows an $F$ distribution with $d_1$ numerator degrees of freedom and $d_2$ denominator degrees of freedom.

$F$ tests often arise from comparing variance-scaled quantities. For Hotelling's test, the required degrees of freedom are

$$d_1=p,\qquad d_2=n-p.$$

### 9.2 Exact finite-sample distribution

Assuming the null and the exact-test conditions, the distribution of Hotelling's statistic is

$$\boxed{\frac{n-p}{p(n-1)}T^2\sim F_{p,n-p}.}$$

Equivalently,

$$\boxed{T^2\sim\frac{p(n-1)}{n-p}F_{p,n-p}.}$$

These are equivalent statements: the first expresses a transformed statistic having an $F$ distribution; the second writes $T^2$ as a scaled $F$ random variable. The second form is the one used in the lecture. **[Lecture, p. 2]**

Every symbol:

- $n-p$: denominator degrees of freedom.
- $p(n-1)$: a positive scaling factor.
- $F_{p,n-p}$: an $F$ random variable with degrees of freedom $p$ and $n-p$.
- $\sim$: has the specified distribution under $H_0$.

### 9.3 Deriving the practical $F$ statistic

Define

$$\boxed{F_{\mathrm{obs}}=\frac{n-p}{p(n-1)}T^2.}$$

Then calculate its upper-tail probability:

$$\boxed{p\text{-value}=P(F_{p,n-p}\ge F_{\mathrm{obs}}\mid H_0).}$$

The symbol $\ge$ means "greater than or equal to." For continuous distributions, whether the equality endpoint is included does not change the probability.

Why the **upper** tail? Because $T^2$ is a squared distance. It is unusual for the distance to be **too large**, not too small. We therefore need only the right tail of the $F$ distribution even though the scientific alternative is two-sided in the sense of *any* departure in the vector.

### 9.4 Critical-value decision rule

The lecture gives

$$\boxed{\text{Reject }H_0\text{ if }T^2>
\frac{p(n-1)}{n-p}F_{p,n-p;1-\alpha}.}$$

Equivalently,

$$\boxed{\text{Reject }H_0\text{ if }F_{\mathrm{obs}}>F_{p,n-p;1-\alpha}.}$$

Here $F_{p,n-p;1-\alpha}$ is the number leaving probability $\alpha$ **to its right** under the $F_{p,n-p}$ distribution.

Both rules produce exactly the same decision.

### 9.5 P-value decision rule

The lecturer also writes: reject if the p-value is below the chosen significance level. **[Lecture, p. 2]**

For example:

- $p=0.03$, $\alpha=0.05$: reject.
- $p=0.07$, $\alpha=0.10$: reject.
- $p=0.07$, $\alpha=0.05$: fail to reject.

An observed p-value does not magically change when the researcher changes $\alpha$. Only the decision threshold changes.

### 9.6 A short mathematical explanation of the reference distribution (extension)

The full proof uses properties of normal sample means and the **Wishart distribution** of a normal sample covariance matrix, which are outside the lecture's stated scope. The intuition is sufficient for most applications:

1. The sample mean vector fluctuates around the true mean with covariance $\boldsymbol\Sigma/n$.
2. We do not know $\boldsymbol\Sigma$ and therefore replace it with $\mathbf S$.
3. The uncertainty in estimating a whole covariance matrix changes the finite-sample reference distribution.
4. Under multivariate normality, the exact rescaling of the resulting quadratic form follows an $F$ distribution with $(p,n-p)$ degrees of freedom.

The relationship can be checked for $p=1$:

$$T^2=n\frac{(\overline X-\mu_0)^2}{s^2}=t^2.$$

Substitute $p=1$ into the distribution formula:

$$\frac{n-1}{1(n-1)}T^2=T^2\sim F_{1,n-1}.$$

Since the square of a $t_{n-1}$ random variable follows $F_{1,n-1}$,

$$\boxed{F_{1,n-1}=t_{n-1}^2\text{ in distribution}.}$$

So Hotelling's test genuinely reduces to the ordinary two-sided one-sample $t$ test when there is only one variable.

---

## 10. A completely hand-calculated two-variable Hotelling example

**Textbook-created illustration, not the lecture's perspiration dataset.** The numbers are chosen so that a beginner can reproduce every matrix operation without software.

### 10.1 The hypothetical study

Suppose five independent observations contain measurements on two correlated variables:

| Person | $X_1$ | $X_2$ |
|---:|---:|---:|
| 1 | 1 | 1 |
| 2 | 2 | 0 |
| 3 | 3 | 2 |
| 4 | 4 | 4 |
| 5 | 5 | 3 |

We test

$$H_0:\boldsymbol\mu=\begin{bmatrix}2\\3\end{bmatrix},\qquad
H_1:\boldsymbol\mu\ne\begin{bmatrix}2\\3\end{bmatrix}$$

at $\alpha=0.10$, with $n=5$ and $p=2$. Assume the observations are independent and sampled from a bivariate normal population with a positive-definite covariance matrix.

### 10.2 Step 1: calculate both sample means

$$\overline X_1=\frac{1+2+3+4+5}{5}=3,$$

$$\overline X_2=\frac{1+0+2+4+3}{5}=2.$$

Therefore,

$$\boxed{\overline{\mathbf X}=\begin{bmatrix}3\\2\end{bmatrix}.}$$

### 10.3 Step 2: subtract the two sample means from each row

| Person | $X_1-3$ | $X_2-2$ | $(X_1-3)^2$ | $(X_2-2)^2$ | $(X_1-3)(X_2-2)$ |
|---:|---:|---:|---:|---:|---:|
| 1 | $-2$ | $-1$ | 4 | 1 | 2 |
| 2 | $-1$ | $-2$ | 1 | 4 | 2 |
| 3 | 0 | 0 | 0 | 0 | 0 |
| 4 | 1 | 2 | 1 | 4 | 2 |
| 5 | 2 | 1 | 4 | 1 | 2 |
| **Sums** | **0** | **0** | **10** | **10** | **8** |

### 10.4 Step 3: calculate variances and covariance

Because $n-1=4$,

$$s_1^2=\frac{10}{4}=2.5,\qquad
s_2^2=\frac{10}{4}=2.5,$$

$$s_{12}=\frac{8}{4}=2.$$

Thus

$$\boxed{\mathbf S=\begin{bmatrix}2.5&2\\2&2.5\end{bmatrix}.}$$

The sample correlation is

$$r_{12}=\frac{2}{\sqrt{2.5}\sqrt{2.5}}=\frac2{2.5}=0.8.$$

So the variables have strong positive sample correlation. That is a major reason to analyze them jointly.

### 10.5 Step 4: calculate the inverse covariance matrix

The determinant is

$$\det(\mathbf S)=2.5(2.5)-2(2)=6.25-4=2.25.$$

This is nonzero, so the inverse exists:

$$\begin{aligned}
\mathbf S^{-1}
&=\frac1{2.25}\begin{bmatrix}2.5&-2\\-2&2.5\end{bmatrix}\\[4pt]
&=\begin{bmatrix}1.111111&-0.888889\\-0.888889&1.111111\end{bmatrix}.
\end{aligned}$$

The negative off-diagonal elements here capture the fact that a mismatch *opposite* to the usual positive-correlation direction can be especially unusual.

### 10.6 Step 5: form the difference vector

$$\begin{aligned}
\mathbf d&=\overline{\mathbf X}-\boldsymbol\mu_0\\
&=\begin{bmatrix}3\\2\end{bmatrix}-\begin{bmatrix}2\\3\end{bmatrix}\\
&=\boxed{\begin{bmatrix}1\\-1\end{bmatrix}}.
\end{aligned}$$

The sample means are **one unit above target for the first variable and one unit below target for the second**. With positive correlation $0.8$, that opposite movement is less typical than joint movement in the same direction.

### 10.7 Step 6: perform the matrix multiplication

First multiply the inverse covariance matrix by the difference vector:

$$\begin{aligned}
\mathbf S^{-1}\mathbf d
&=\frac1{2.25}\begin{bmatrix}2.5&-2\\-2&2.5\end{bmatrix}
\begin{bmatrix}1\\-1\end{bmatrix}\\[4pt]
&=\frac1{2.25}\begin{bmatrix}2.5+2\\-2-2.5\end{bmatrix}\\[4pt]
&=\frac1{2.25}\begin{bmatrix}4.5\\-4.5\end{bmatrix}\\[4pt]
&=\boxed{\begin{bmatrix}2\\-2\end{bmatrix}}.
\end{aligned}$$

Now multiply on the left by $\mathbf d'$:

$$\begin{aligned}
\mathbf d'\mathbf S^{-1}\mathbf d
&=\begin{bmatrix}1&-1\end{bmatrix}\begin{bmatrix}2\\-2\end{bmatrix}\\[4pt]
&=1(2)+(-1)(-2)\\
&=\boxed{4}.
\end{aligned}$$

Finally multiply by $n=5$:

$$\boxed{T^2=5\times4=20.}$$

### 10.8 Step 7: transform into an $F$ statistic

$$F_{\mathrm{obs}}=\frac{n-p}{p(n-1)}T^2.$$

With $n=5$, $p=2$,

$$\begin{aligned}
F_{\mathrm{obs}}
&=\frac{5-2}{2(5-1)}(20)\\
&=\frac{3}{8}(20)\\
&=\boxed{7.5}.
\end{aligned}$$

Degrees of freedom:

$$df_1=p=2,\qquad df_2=n-p=3.$$

The upper-tail probability is

$$p=P(F_{2,3}\ge7.5)\approx\boxed{0.06804}.$$

### 10.9 Step 8: decide and interpret

At $\alpha=0.10$, $0.06804<0.10$, so **reject $H_0$**.

The equivalent $F$ critical value is

$$F_{2,3;0.90}\approx5.46238,$$

and $7.5>5.46238$. Both approaches agree.

**Conclusion in everyday language:** At the 10% significance level, the two-variable sample supplies evidence that the population mean profile differs from the proposed values $(2,3)$.

At $\alpha=0.05$, the p-value would not cross the rejection threshold, so we **would not reject** at 5%. The appropriate conclusion must always say which significance level was used.

### 10.10 What if correlation were incorrectly ignored?

If we deliberately remove the $2$ covariance entries and treat the covariance matrix as diagonal,

$$\mathbf S_{\mathrm{diag}}=\begin{bmatrix}2.5&0\\0&2.5\end{bmatrix},$$

then

$$\mathbf d'\mathbf S_{\mathrm{diag}}^{-1}\mathbf d
=\frac{1^2}{2.5}+\frac{(-1)^2}{2.5}=0.8.$$

The analogous quadratic form would become $5(0.8)=4$, rather than the correct $T^2=20$.

**This is a pedagogical comparison of distance calculations, not a recommendation to run a mis-specified test.** It demonstrates that covariance can change the strength of joint evidence dramatically. The difference is not a cosmetic feature of matrix algebra.

---

## 11. Why not simply run $p$ separate one-sample $t$ tests?

The final printed page of the lecture asks this exact conceptual question. Its stated reason is that separate tests do **not** account for the interrelationships among the variables. **[Lecture, p. 5]**

There are several additional reasons worth understanding.

### 11.1 They do not directly test the complete mean profile

For three variables, separate tests evaluate:

$$H_{01}:\mu_1=\mu_{01},\quad
H_{02}:\mu_2=\mu_{02},\quad
H_{03}:\mu_3=\mu_{03}.$$

Hotelling's test evaluates the **single joint null**:

$$H_0:\begin{bmatrix}\mu_1\\\mu_2\\\mu_3\end{bmatrix}
=\begin{bmatrix}\mu_{01}\\\mu_{02}\\\mu_{03}\end{bmatrix}.$$

Although related, these procedures ask and answer different questions.

### 11.2 Separate tests ignore cross-variable correlations

If variables are correlated, a particular combination of changes might be statistically unusual even when no single change is unusually large in isolation.

The hand-worked example in Chapter 10 illustrates this geometric effect. Hotelling's test uses the **full covariance matrix**, whereas each separate $t$ test uses only that variable's variance.

### 11.3 Multiple testing can inflate false-positive risk

Suppose you run three separate tests, each at the 5% level. If all three nulls were true and the tests were independent, the chance of **at least one** false rejection would be

$$1-(1-0.05)^3=1-0.95^3=0.142625.$$

That is about **14.26%**, not 5%.

With correlation among tests, this exact calculation changes, but the general multiple-testing concern remains.

The **family-wise error rate** is the probability of at least one Type I error among a specified family of tests. Adjustments such as Bonferroni or Holm can control this risk when component-by-component conclusions are needed.

### 11.4 Why not always use Hotelling's test?

Hotelling's test is especially useful when the research question concerns a **pre-specified entire mean vector** and joint correlations matter.

It is not automatically best for every problem. If a study has a single scientifically primary variable, a well-designed univariate test may be more relevant and more powerful. A joint test also cannot, by itself, identify **which** individual component is responsible for rejection.

A sensible analysis often uses the joint test for the overall question, then uses appropriately justified follow-up examinations for component-specific interpretation.

---

## 12. Large-sample inference: when the chi-square distribution appears

Page 2 of the lecture gives a second decision rule for **large samples**, relaxing the strict normal-population requirement. **[Lecture, p. 2]**

### 12.1 The multivariate central limit idea

The **central limit theorem** says, informally, that averages of many independent observations may become approximately normal even when individual observations are not normal.

Its multivariate form says that, under suitable conditions such as i.i.d. observations with finite covariance matrix,

$$\sqrt n(\overline{\mathbf X}-\boldsymbol\mu)
\xrightarrow{d}N_p(\mathbf0,\boldsymbol\Sigma).$$

Read the symbols:

- $\sqrt n$: square root of the sample size.
- $\mathbf0$: vector whose entries are all zero.
- $\xrightarrow{d}$: converges in distribution as $n$ becomes large.
- $N_p(\mathbf0,\boldsymbol\Sigma)$: a multivariate normal limiting distribution.

This does **not** say every modest sample is approximately normal. The needed sample size depends on the population's shape, tail behavior, dimensionality, and dependence structure.

### 12.2 Why the squared distance approaches chi-square

If we knew the true covariance matrix and the mean vector were approximately normal under $H_0$, the standardized squared distance

$$n(\overline{\mathbf X}-\boldsymbol\mu_0)'
\boldsymbol\Sigma^{-1}
(\overline{\mathbf X}-\boldsymbol\mu_0)$$

would be approximately chi-square with $p$ degrees of freedom.

If $\mathbf S$ consistently estimates a positive-definite $\boldsymbol\Sigma$, we can use $\mathbf S$ instead. The resulting statistic is still Hotelling's quadratic form:

$$\boxed{T^2=n(\overline{\mathbf X}-\boldsymbol\mu_0)'\mathbf S^{-1}
(\overline{\mathbf X}-\boldsymbol\mu_0).}$$

For large samples, under suitable regularity assumptions,

$$\boxed{T^2\ \xrightarrow{d}\ \chi_p^2\qquad\text{under }H_0.}$$

Here $\chi_p^2$ denotes a chi-square random variable with $p$ degrees of freedom.

### 12.3 Lecture decision rule

Reject the null hypothesis at significance level $\alpha$ when

$$\boxed{T^2>\chi^2_{p;1-\alpha}.}$$

The chi-square critical value has $p$ degrees of freedom. It is an **upper-tail** test, as with the exact Hotelling procedure.

The lecture describes this approach when $n-p$ is large. That phrasing reminds us that having many more observations than dimensions is important. There is no universally reliable fixed threshold at which the approximation suddenly becomes exact.

### 12.4 Exact versus approximate methods

| Feature | Exact one-sample Hotelling test | Large-sample mean-vector test |
|---|---|---|
| Test statistic | $T^2=n\mathbf d'\mathbf S^{-1}\mathbf d$ | Same $T^2$ |
| Reference distribution | $\frac{n-p}{p(n-1)}T^2\sim F_{p,n-p}$ | $T^2\approx\chi_p^2$ |
| Population normality | Required for exact finite-sample law | Not necessarily, if large-sample conditions hold |
| Sample-size concern | Need $n>p$ and invertible $\mathbf S$ | Need enough data for the approximation to be adequate |
| Degrees of freedom | $(p,n-p)$ for $F$ | $p$ for chi-square |

### 12.5 A caution using the lecture's actual sample size

For the perspiration data, $n=20$ and $p=3$. We will calculate

$$T^2=9.738773.$$

The **exact** $F$-based p-value is approximately

$$p_F=0.064928.$$

If the large-sample chi-square approximation were applied mechanically to these same data,

$$P(\chi_3^2\ge9.738773)\approx0.020922.$$

These values are notably different. At a 5% significance level, they would even yield different conclusions.

**Do not replace the exact $F$ test by chi-square merely because the chi-square formula looks simpler.** The lecture's example explicitly uses the exact $F$ procedure, which is appropriate when its normality and independence assumptions are credible.

### 12.6 How large is "large"?

There is no single safe cutoff such as "30 observations always suffice." Some practical considerations:

- Increasing $p$ consumes degrees of freedom and makes covariance estimation harder.
- Very heavy tails can make convergence slow, and infinite-variance populations can invalidate the usual central limit argument.
- Outliers may distort means and covariances.
- Independent observations matter; many correlated repeated observations do not act like the same number of independent units.
- In high-dimensional settings where $p$ is comparable to $n$, classical fixed-$p$ asymptotics may be unreliable.

The lecture's statement about serious departures from normality being overcome by large samples should therefore be understood as an **asymptotic motivation under suitable conditions**, not as a guarantee that any nonnormal sample becomes safe at a fixed size.

---

# PART IV. RECONSTRUCTING EVERY LECTURE EXAMPLE

## 13. The 20-person perspiration study: a complete numerical audit

**Source:** The full dataset is printed on page 3; the Hotelling test and univariate test outputs are on pages 4–5. **[Lecture, pp. 3–5]**

### 13.1 The scientific question and variables

The dataset records three perspiration-related measurements from 20 healthy female participants:

- $X_1$: sweat rate.
- $X_2$: sodium content.
- $X_3$: potassium content.

The source does **not** specify the measurement units in these notes, so we do not invent units for them.

There are $n=20$ observed vectors and $p=3$ variables.

### 13.2 The data, reproduced from the lecture

| Participant | Sweat rate $X_1$ | Sodium $X_2$ | Potassium $X_3$ |
|---:|---:|---:|---:|
| 1 | 3.7 | 48.5 | 9.3 |
| 2 | 5.7 | 65.1 | 8.0 |
| 3 | 3.8 | 47.2 | 10.9 |
| 4 | 3.2 | 53.2 | 12.0 |
| 5 | 3.1 | 55.5 | 9.7 |
| 6 | 4.6 | 36.1 | 7.9 |
| 7 | 2.4 | 24.8 | 14.0 |
| 8 | 7.2 | 33.1 | 7.6 |
| 9 | 6.7 | 47.4 | 8.5 |
| 10 | 5.4 | 54.1 | 11.3 |
| 11 | 3.9 | 36.9 | 12.7 |
| 12 | 4.5 | 58.8 | 12.3 |
| 13 | 3.5 | 27.8 | 9.8 |
| 14 | 4.5 | 40.2 | 8.4 |
| 15 | 1.5 | 13.5 | 10.1 |
| 16 | 8.5 | 56.4 | 7.1 |
| 17 | 4.5 | 71.6 | 8.2 |
| 18 | 6.5 | 52.8 | 10.9 |
| 19 | 4.1 | 44.1 | 11.2 |
| 20 | 5.5 | 40.9 | 9.4 |

### 13.3 What exactly is being tested?

The lecturer proposes

$$\boldsymbol\mu_0=\begin{bmatrix}4\\50\\10\end{bmatrix}.$$

Therefore,

$$\boxed{H_0:\boldsymbol\mu=\begin{bmatrix}4\\50\\10\end{bmatrix}}$$

and

$$\boxed{H_1:\boldsymbol\mu\ne\begin{bmatrix}4\\50\\10\end{bmatrix}.}$$

**Meaning of $H_0$:** The true population average sweat rate is $4$, the true average sodium content is $50$, and the true average potassium content is $10$, all at once.

**Meaning of $H_1$:** This complete three-component population mean profile is not equal to the proposed profile. At least one component must differ.

The lecture chooses a **10% significance level**:

$$\alpha=0.10.$$

### 13.4 Step 1: calculate the sample mean vector

Sum each measurement column:

$$\sum_{i=1}^{20} X_{i1}=92.8,$$

$$\sum_{i=1}^{20} X_{i2}=908.0,$$

$$\sum_{i=1}^{20} X_{i3}=199.3.$$

Now divide each by $n=20$:

$$\overline X_1=\frac{92.8}{20}=4.64,$$

$$\overline X_2=\frac{908.0}{20}=45.4,$$

$$\overline X_3=\frac{199.3}{20}=9.965.$$

Thus

$$\boxed{\overline{\mathbf X}=\begin{bmatrix}4.64\\45.4\\9.965\end{bmatrix}.}$$

These values match the individual sample means in the lecture's R output. **[Lecture, pp. 4–5]**

### 13.5 Step 2: subtract the null vector

$$\begin{aligned}
\mathbf d
&=\overline{\mathbf X}-\boldsymbol\mu_0\\
&=\begin{bmatrix}4.64-4\\45.4-50\\9.965-10\end{bmatrix}\\
&=\boxed{\begin{bmatrix}0.64\\-4.6\\-0.035\end{bmatrix}}.
\end{aligned}$$

Individually, the observed means are $0.64$ above, $4.6$ below, and $0.035$ below their proposed means. On their own, these raw numbers do not account for their differing variances and cross-correlations.

### 13.6 Step 3: construct the sample covariance matrix

Using the $n-1=19$ divisor, the cross-product sums from the complete printed data are:

$$\sum_{i=1}^{20}(\mathbf X_i-\overline{\mathbf X})
(\mathbf X_i-\overline{\mathbf X})'
=\begin{bmatrix}
54.708 & 190.190 & -34.372\\
190.190 & 3795.980 & -107.160\\
-34.372 & -107.160 & 68.9255
\end{bmatrix}.$$

Divide every entry by $19$:

$$\boxed{
\mathbf S=
\begin{bmatrix}
2.879368 & 10.010000 & -1.809053\\
10.010000 & 199.788421 & -5.640000\\
-1.809053 & -5.640000 & 3.627658
\end{bmatrix}.
}$$

**What the diagonal tells us:**

- Sweat-rate variance $s_1^2\approx2.879368$.
- Sodium-content variance $s_2^2\approx199.788421$.
- Potassium-content variance $s_3^2\approx3.627658$.

**What the off-diagonal tells us:**

- Sweat rate and sodium have positive sample covariance $10.01$.
- Sweat rate and potassium have negative sample covariance $-1.809053$.
- Sodium and potassium have negative sample covariance $-5.64$.

Because the raw variables have different measurement scales, the correlation matrix is easier to compare:

$$\boxed{
\mathbf R=\begin{bmatrix}
1 & 0.417350 & -0.559744\\
0.417350 & 1 & -0.209498\\
-0.559744 & -0.209498 & 1
\end{bmatrix}.
}$$

For example,

$$r_{13}=\frac{-1.809053}{\sqrt{2.879368}\sqrt{3.627658}}
\approx-0.559744.$$

These sample correlations reinforce the lecture's message that the three measurements should not automatically be treated as independent.

### 13.7 Step 4: invert the sample covariance matrix

The covariance matrix is nonsingular for these observations. Its inverse, rounded to six decimal places, is

$$\boxed{
\mathbf S^{-1}\approx
\begin{bmatrix}
0.586155 & -0.022086 & 0.257969\\
-0.022086 & 0.006067 & -0.001581\\
0.257969 & -0.001581 & 0.401847
\end{bmatrix}.
}$$

For a $3\times3$ matrix, hand inversion involves determinants and cofactors; that is possible but lengthy. A calculator, `solve(S)` in R, or a numerical linear algebra routine is appropriate for computing the inverse. The important conceptual point is **not** to replace $\mathbf S^{-1}$ with reciprocals of just its diagonal entries: that would erase the correlations.

In actual numerical software, it is often preferable to solve $\mathbf S\mathbf v=\mathbf d$ without explicitly forming an inverse. Both approaches lead to the same intended quadratic form when done accurately.

### 13.8 Step 5: multiply the inverse by the difference vector

$$\begin{aligned}
\mathbf v&=\mathbf S^{-1}\mathbf d\\[3pt]
&\approx
\begin{bmatrix}
0.586155 & -0.022086 & 0.257969\\
-0.022086 & 0.006067 & -0.001581\\
0.257969 & -0.001581 & 0.401847
\end{bmatrix}
\begin{bmatrix}0.64\\-4.6\\-0.035\end{bmatrix}\\[4pt]
&\approx
\boxed{\begin{bmatrix}0.467705\\-0.041989\\0.158308\end{bmatrix}}.
\end{aligned}$$

To see the operation entry by entry, the first entry is approximately

$$0.586155(0.64)+(-0.022086)(-4.6)+0.257969(-0.035)
\approx0.467705.$$

The same row-by-column procedure gives the second and third entries.

### 13.9 Step 6: finish the quadratic form

Transpose the difference vector:

$$\mathbf d'=\begin{bmatrix}0.64&-4.6&-0.035\end{bmatrix}.$$

Then

$$\begin{aligned}
\mathbf d'\mathbf S^{-1}\mathbf d
&=\mathbf d'\mathbf v\\
&\approx0.64(0.467705)+(-4.6)(-0.041989)+(-0.035)(0.158308)\\
&\approx0.299331+0.193148-0.005541\\
&\approx\boxed{0.486939}.
\end{aligned}$$

With full computational precision, the inner product is

$$\mathbf d'\mathbf S^{-1}\mathbf d=0.4869386428.$$

Finally, multiply by $n=20$:

$$\boxed{T^2=20(0.4869386428)=9.7387728554.}$$

The raw Hotelling statistic is about **9.73877**.

### 13.10 Step 7: convert the statistic into $F$

Under the exact test's assumptions,

$$F_{\mathrm{obs}}=\frac{n-p}{p(n-1)}T^2.$$

Substitute $n=20$, $p=3$:

$$\begin{aligned}
F_{\mathrm{obs}}
&=\frac{20-3}{3(20-1)}(9.7387728554)\\
&=\frac{17}{57}(9.7387728554)\\
&=\boxed{2.9045462902}.
\end{aligned}$$

Degrees of freedom are

$$df_1=p=3,\qquad df_2=n-p=17.$$

We need the probability of an $F_{3,17}$ statistic being **at least** $2.904546$:

$$\boxed{p=P(F_{3,17}\ge2.9045462902)=0.0649283354.}$$

The lecturer prints $p=0.06493$, which matches this calculation. **[Lecture, p. 4]**

### 13.11 Critical-value check at the lecture's 10% level

The 90th percentile of $F_{3,17}$ is

$$F_{3,17;0.90}\approx2.437434.$$

Because

$$2.904546>2.437434,$$

we reject $H_0$.

For those who want to compare **raw $T^2$** values instead of $F$ values, multiply the $F$ cutoff by the factor $p(n-1)/(n-p)=57/17$:

$$\begin{aligned}
T^2_{\mathrm{critical}}
&=\frac{57}{17}(2.437434)\\
&\approx\boxed{8.172573}.
\end{aligned}$$

Since $9.738773>8.172573$, the same rejection follows.

### 13.12 The actual lecture conclusion, carefully phrased

The lecture states that $0.06493<0.10$, so it rejects $H_0$ at the 10% significance level. **[Lecture, p. 4]**

A fuller interpretation is:

> At the 10% significance level, the sample provides statistically significant evidence that the joint population mean vector for sweat rate, sodium content, and potassium content differs from the hypothesized vector $(4,50,10)'$, assuming the observations satisfy the one-sample Hotelling test's conditions.

That result does **not** prove that all three component means differ, identify which component differs, or establish the size of any practically important biological effect.

### 13.13 What about the more common 5% threshold?

The observed p-value remains $0.064928$. At $\alpha=0.05$,

$$0.064928>0.05.$$

So we **fail to reject** at 5%, even though we reject at 10%.

For reference,

$$F_{3,17;0.95}\approx3.196777,
\quad F_{\mathrm{obs}}\approx2.904546.$$

Similarly, the 5% critical value for raw $T^2$ is about $10.718605$, above the observed $9.738773$.

A scientifically careful write-up reports the exact p-value and the pre-specified significance level rather than presenting the choice of threshold as an after-the-fact way to obtain a desired result.

### 13.14 A necessary software-output distinction

The printed R output is

```text
Hotellings one sample T2-test

T.2 = 2.9045, df1 = 3, df2 = 17, p-value = 0.06493
```

The output label `T.2` may lead a beginner to infer that the **raw quadratic-form $T^2$ is 2.9045**. But reconstructing the statistic from the observations shows that **2.9045 is the $F$-scaled value**, the one used with $F_{3,17}$ to obtain the printed p-value.

To keep both the mathematical formula and software output straight:

| Quantity | Formula | Numerical value |
|---|---|---:|
| **Raw** Hotelling $T^2$ | $n\mathbf d'\mathbf S^{-1}\mathbf d$ | **9.738773** |
| **Scaled** statistic | $\frac{n-p}{p(n-1)}T^2$ | **2.904546** |
| Degrees of freedom for $F$ | $(p,n-p)$ | **$(3,17)$** |
| Upper-tail $F$ p-value | $P(F_{3,17}\ge2.904546)$ | **0.064928** |

The underlying lecture decision is correct; the distinction explains the different numerical labels, not a disagreement about the test result.

---

## 14. Checking multivariate normality: understanding the source output

The lecturer checks multivariate normality before applying the one-sample Hotelling procedure using the `QuantPsyc` package. **[Lecture, p. 3]**

### 14.1 Why check normality?

The exact finite-sample $F$ reference distribution assumes multivariate normal observations. If this assumption is badly violated, the nominal p-value may not have the stated error-rate properties.

Normality checks can inform whether this model seems reasonable. They cannot *prove* the model.

### 14.2 Source R code

The lecture shows:

```r
library(QuantPsyc)
mult.norm(data)$mult.test
```

- `library(QuantPsyc)` loads the package providing the function.
- `data` is the numeric dataset with the three measured variables.
- `mult.norm(data)` runs the package's multivariate normality procedure.
- `$mult.test` extracts the relevant result table from the returned R object.

The lecture prints two rows:

| Test | `Beta-hat` | `kappa` | `p-val` |
|---|---:|---:|---:|
| Skewness | 2.188224 | 7.294079 | 0.6974209 |
| Kurtosis | 11.880604 | $-1.273488$ | 0.2028449 |

**[Lecture, p. 3]**

### 14.3 What is skewness?

Skewness quantifies asymmetry in a distribution. In one dimension:

- Strong right skew means there is a longer tail toward high values.
- Strong left skew means there is a longer tail toward low values.

Multivariate skewness measures features of asymmetry across the **joint cloud** of observations. It is not merely the average of the three univariate skewness numbers.

### 14.4 What is kurtosis?

Kurtosis concerns the distribution's shape, including the prevalence of unusually large multivariate distances and the concentration of observations.

In multivariate analysis, the definition is different from simply asking whether a single histogram has a visually sharp peak.

### 14.5 The mathematical diagnostics (textbook extension explaining the output)

Define the covariance matrix using an $n$ divisor, rather than the usual unbiased $n-1$ divisor:

$$\mathbf S_n=\frac1n\sum_{i=1}^n
(\mathbf X_i-\overline{\mathbf X})
(\mathbf X_i-\overline{\mathbf X})'.$$

Because the lecture's usual $\mathbf S$ uses $n-1$,

$$\mathbf S_n=\frac{n-1}{n}\mathbf S.$$

The **Mardia multivariate skewness** statistic is

$$\boxed{b_{1,p}=\frac1{n^2}\sum_{i=1}^n\sum_{j=1}^n
\left[(\mathbf X_i-\overline{\mathbf X})'
\mathbf S_n^{-1}
(\mathbf X_j-\overline{\mathbf X})\right]^3.}$$

The **Mardia multivariate kurtosis** statistic is

$$\boxed{b_{2,p}=\frac1n\sum_{i=1}^n
\left[(\mathbf X_i-\overline{\mathbf X})'
\mathbf S_n^{-1}
(\mathbf X_i-\overline{\mathbf X})\right]^2.}$$

These expressions may look intimidating, but the components are familiar:

- The centered vectors subtract the sample mean.
- $\mathbf S_n^{-1}$ adjusts for covariance.
- The term in square brackets describes a multivariate standardized product or distance.
- Cubing the cross-products yields a measure sensitive to asymmetry.
- Squaring the within-observation distances measures a multivariate form of kurtosis.
- Sums and averages combine evidence across observations.

For $p$-variate normal data, the theoretical Mardia kurtosis is $p(p+2)$. With $p=3$, that reference value is

$$3(3+2)=15.$$

The sample kurtosis $11.880604$ is below $15$, but we must consider sampling uncertainty rather than declaring nonnormality from the raw difference alone.

### 14.6 Reconstructing the reported normality test statistics

For Mardia skewness, a large-sample statistic is

$$\kappa_{\mathrm{skew}}=\frac{n}{6}b_{1,p},$$

which is approximately compared with a chi-square distribution with

$$\nu=\frac{p(p+1)(p+2)}{6}$$

degrees of freedom under multivariate normality.

Here,

$$\kappa_{\mathrm{skew}}\approx\frac{20}{6}(2.188224)
=7.29408,$$

and

$$\nu=\frac{3(4)(5)}6=10.$$

Thus $P(\chi^2_{10}\ge7.29408)\approx0.69742$.

For kurtosis, a large-sample standardized statistic is

$$\kappa_{\mathrm{kurt}}=\frac{b_{2,p}-p(p+2)}
{\sqrt{8p(p+2)/n}}.$$

Substituting the observed values gives

$$\begin{aligned}
\kappa_{\mathrm{kurt}}
&=\frac{11.880604-15}{\sqrt{8(3)(5)/20}}\\
&=\frac{-3.119396}{\sqrt6}\\
&\approx-1.273488.
\end{aligned}$$

Its approximate two-sided standard-normal p-value is $0.2028449$.

**Verification:** Using $\mathbf S_n$, these formulas reconstruct the displayed `Beta-hat`, `kappa`, and p-values, to the precision given in the source. These formulas explain the output; they are additional teaching detail, not formulas printed in Lec7.

### 14.7 How to interpret these two normality tests

A conventional null for these diagnostics is that the observations follow the specified multivariate normal model. At $\alpha=0.10$:

- Skewness p-value $0.6974209>0.10$: fail to reject the normality null on this diagnostic.
- Kurtosis p-value $0.2028449>0.10$: fail to reject the normality null on this diagnostic.

That reproduces the lecturer's conclusion. **[Lecture, p. 3]**

But it must be stated carefully:

> The skewness and kurtosis diagnostics do not provide sufficient evidence of departure from multivariate normality at the 10% level. This is not proof that the distribution is exactly multivariate normal.

With only 20 observations, normality tests can have **limited power** to detect meaningful problems. Inspecting plots, checking unusual observations, and considering how the data were gathered remain important.

### 14.8 Recommended additional diagnostics (textbook extension)

A responsible analysis can use:

1. **Scatterplot matrix:** reveals nonlinear relationships, groups, and unusual two-variable combinations.
2. **Histograms or Q–Q plots of each variable:** helps reveal extreme univariate skew or outliers, though they cannot prove joint normality.
3. **Squared Mahalanobis-distance Q–Q plot:** compares the pattern of multivariate squared distances with a chi-square reference. Because mean and covariance are estimated from the same sample, a naive theoretical chi-square reference is only an approximate diagnostic, especially for small samples.
4. **Study-design check:** verifies that observations are genuinely independent and represent the population of interest.

The existence of a normality diagnostic is not a guarantee that every other statistical assumption has been checked.

---

## 15. R analysis: reproduce, understand, and verify every result

This chapter includes both the **lecture-style commands** and a **self-contained base-R reproduction**. You do not need the external `T5-1.dat` to run the second version.

### 15.1 Reading the external file, as in the lecture

The original code is formatted here as ordinary valid R syntax:

```r
data <- read.table("datasets/T5-1.dat")
data
```

What the path means:

- `datasets` is a folder relative to R's **working directory**.
- `T5-1.dat` is the name of the dataset file.
- `read.table()` imports the whitespace-delimited rows into a data frame.
- Because the file is shown without a header line, default column names are `V1`, `V2`, `V3`.
- Printing `data` shows the 20 rows.

If the file is absent from that exact relative location, R reports an error. The source PDF prints the data, but it does **not** supply the external `.dat` file as part of this upload. The next section avoids that dependency.

### 15.2 A complete self-contained R script

Copy this block into R or RStudio. It uses **base R** for all numerical calculations. The package calls corresponding to the lecture are shown afterward.

```r
# 1. Type the 20 rows printed in Lec7.pdf.
sweat <- matrix(c(
  3.7, 48.5,  9.3,
  5.7, 65.1,  8.0,
  3.8, 47.2, 10.9,
  3.2, 53.2, 12.0,
  3.1, 55.5,  9.7,
  4.6, 36.1,  7.9,
  2.4, 24.8, 14.0,
  7.2, 33.1,  7.6,
  6.7, 47.4,  8.5,
  5.4, 54.1, 11.3,
  3.9, 36.9, 12.7,
  4.5, 58.8, 12.3,
  3.5, 27.8,  9.8,
  4.5, 40.2,  8.4,
  1.5, 13.5, 10.1,
  8.5, 56.4,  7.1,
  4.5, 71.6,  8.2,
  6.5, 52.8, 10.9,
  4.1, 44.1, 11.2,
  5.5, 40.9,  9.4
), ncol = 3, byrow = TRUE)

data <- as.data.frame(sweat)
names(data) <- c("V1", "V2", "V3")

# 2. Specify the null mean vector and significance level.
mu0 <- c(4, 50, 10)
alpha <- 0.10
n <- nrow(data)
p <- ncol(data)

# 3. Calculate the quantities in the lecture's formula.
xbar <- colMeans(data)
S <- cov(data)
R <- cor(data)
d <- xbar - mu0

# Solve S v = d; avoids explicitly inverting S for the test.
v <- solve(S, d)
T2_raw <- as.numeric(n * crossprod(d, v))

# 4. Exact F conversion and p-value.
F_obs <- ((n - p) / (p * (n - 1))) * T2_raw
p_value_exact <- pf(F_obs, df1 = p, df2 = n - p,
                    lower.tail = FALSE)
F_critical <- qf(1 - alpha, df1 = p, df2 = n - p)
T2_critical <- (p * (n - 1) / (n - p)) * F_critical

# 5. Print a transparent set of results.
print(n)
print(p)
print(xbar)
print(d)
print(S)
print(R)
print(solve(S))
print(v)
print(T2_raw)
print(F_obs)
print(p_value_exact)
print(F_critical)
print(T2_critical)

if (p_value_exact < alpha) {
  cat("Reject H0 at alpha =", alpha, "\n")
} else {
  cat("Fail to reject H0 at alpha =", alpha, "\n")
}

# 6. Individual tests, matching the lecture's defaults (95% CIs).
t.test(data$V1, mu = 4)
t.test(data$V2, mu = 50)
t.test(data$V3, mu = 10)

# 7. Also obtain 90% marginal intervals to match alpha = 0.10.
t.test(data$V1, mu = 4, conf.level = 0.90)
t.test(data$V2, mu = 50, conf.level = 0.90)
t.test(data$V3, mu = 10, conf.level = 0.90)

# 8. Large-sample chi-square approximation, for comparison only.
p_value_chi_approx <- pchisq(T2_raw, df = p, lower.tail = FALSE)
print(p_value_chi_approx)
```

### 15.3 Explain the new R commands, one at a time

| R expression | Plain-English meaning |
|---|---|
| `matrix(..., ncol = 3, byrow = TRUE)` | Arrange the entered numbers in three columns, filling row by row. |
| `as.data.frame(sweat)` | Convert the numerical matrix to a table-like data frame. |
| `nrow(data)` | Count observations. |
| `ncol(data)` | Count variables. |
| `c(4, 50, 10)` | Create a vector containing the three null means. |
| `colMeans(data)` | Calculate all three sample means. |
| `cov(data)` | Calculate the full sample covariance matrix. |
| `cor(data)` | Calculate the correlation matrix. |
| `solve(S, d)` | Solve the linear system $\mathbf S\mathbf v=\mathbf d$; here $\mathbf v=\mathbf S^{-1}\mathbf d$. |
| `solve(S)` | Explicitly display $\mathbf S^{-1}$ if it exists. |
| `crossprod(d, v)` | Compute the inner product $\mathbf d'\mathbf v$. |
| `as.numeric(...)` | Convert the resulting $1\times1$ matrix to a plain numeric scalar. |
| `pf(x, df1, df2, lower.tail = FALSE)` | Calculate the upper-tail $F$ probability beyond `x`. |
| `qf(1 - alpha, ...)` | Find the lower-tail $1-\alpha$ $F$ quantile, which is the upper-tail $\alpha$ critical value. |
| `pchisq(..., lower.tail = FALSE)` | Calculate an upper-tail chi-square probability. |
| `t.test(x, mu = ...)` | Run the default two-sided one-sample $t$ test against a hypothesized mean. |
| `conf.level = 0.90` | Ask R for a 90% confidence interval rather than its default 95%. |

### 15.4 What results should this base-R script return?

The key quantities, allowing for display rounding, are:

```text
n              20
p               3
sample means    4.640000   45.400000    9.965000
mean differences 0.640000   -4.600000   -0.035000
raw T-squared   9.7387728554
F statistic     2.9045462902
F df            3, 17
exact p-value   0.0649283354
F critical 10%  2.4374339146
T2 critical 10% 8.1725725371
chi-square approximate p-value 0.0209223040
```

The last line is provided as a comparison of approximations, **not** as a recommended replacement for the lecture's finite-sample analysis.

### 15.5 Run the actual package command from the lecture

After defining `data` as above, the lecture's Hotelling call is:

```r
# Install the package once if it is not installed:
# install.packages("ICSNP")

library(ICSNP)
HotellingsT2(data, mu = c(4, 50, 10), test = "f")
```

- `ICSNP` is the package containing the function used in the lecture.
- `HotellingsT2` is the exact case-sensitive function name.
- `data` is the dataset in the form of a table or numeric matrix.
- `mu = c(4, 50, 10)` specifies the null mean vector in the same order as the columns.
- `test = "f"` requests the F-reference version used in the lecture.

The lecturer's displayed output is:

```text
Hotellings one sample T2-test

data:  data
T.2 = 2.9045, df1 = 3, df2 = 17, p-value = 0.06493
alternative hypothesis: true location is not equal to c(4,50,10)
```

For numerical interpretation, use the distinction between the package's printed F-scaled statistic and the **raw** quadratic form discussed in Section 13.14.

### 15.6 Reproduce the lecture's multivariate normality check

```r
# Install once if needed:
# install.packages("QuantPsyc")

library(QuantPsyc)
mult.norm(data)$mult.test
```

Expected values, as printed in the source, are:

```text
            Beta-hat      kappa      p-val
Skewness     2.188224   7.294079   0.6974209
Kurtosis    11.880604  -1.273488   0.2028449
```

Package installations, interfaces, and available functions can change over time, so the **self-contained base-R calculation** is included as the independent verification route.

### 15.7 Reconstruct Mardia skewness and kurtosis with base R

The following **additional** code shows how the first numeric column of the lecture's normality-test output can be computed from the typed observations. It is not necessary for the core mean-vector test.

```r
X <- as.matrix(data)
n <- nrow(X)
p <- ncol(X)
centered <- scale(X, center = TRUE, scale = FALSE)

# MLE-style covariance (n denominator), used for these formulas.
Sn <- crossprod(centered) / n
Q <- centered %*% solve(Sn) %*% t(centered)

mardia_skew <- mean(Q^3)
mardia_kurt <- mean(diag(Q)^2)

skew_stat <- n * mardia_skew / 6
skew_df <- p * (p + 1) * (p + 2) / 6
skew_p <- pchisq(skew_stat, df = skew_df, lower.tail = FALSE)

kurt_stat <- (mardia_kurt - p * (p + 2)) /
             sqrt(8 * p * (p + 2) / n)
kurt_p <- 2 * pnorm(-abs(kurt_stat))

print(c(skewness = mardia_skew, kurtosis = mardia_kurt))
print(c(skew_kappa = skew_stat, skew_p = skew_p))
print(c(kurt_kappa = kurt_stat, kurt_p = kurt_p))
```

This code reproduces Mardia skewness near $2.188224$ and kurtosis near $11.880604$, then their large-sample reference statistics. Differences in the last digits may occur from rounding or an implementation's details.

### 15.8 What the individual $t$ tests actually say

The lecture next applies:

```r
t.test(data$V1, mu = 4)
t.test(data$V2, mu = 50)
t.test(data$V3, mu = 10)
```

Here `data$V1` selects the first variable, `data$V2` the second, and `data$V3` the third.

Each test has **19 degrees of freedom**, because $n-1=20-1=19$.

The lecture's printed results are:

| Variable | Null mean | Sample mean | $t$ | df | Two-sided p-value | Default 95% confidence interval |
|---|---:|---:|---:|---:|---:|---|
| Sweat rate $V1$ | 4 | 4.640 | 1.6867 | 19 | 0.1080 | $[3.84584,\ 5.43416]$ |
| Sodium $V2$ | 50 | 45.400 | $-1.4554$ | 19 | 0.1619 | $[38.78478,\ 52.01522]$ |
| Potassium $V3$ | 10 | 9.965 | $-0.082181$ | 19 | 0.9354 | $[9.073601,\ 10.856399]$ |

**[Lecture, pp. 4–5]**

These results independently match calculations from the data.

### 15.9 Work through each individual $t$ calculation

**Sweat rate:**

The sample variance is $s_1^2=2.879368$, so

$$s_1=\sqrt{2.879368}\approx1.696870,$$

$$\operatorname{SE}_1=\frac{1.696870}{\sqrt{20}}\approx0.379432.$$

Therefore,

$$t_1=\frac{4.64-4}{0.379432}\approx\boxed{1.686733}.$$

**Sodium:**

$$s_2=\sqrt{199.788421}\approx14.134653,$$

$$\operatorname{SE}_2=\frac{14.134653}{\sqrt{20}}\approx3.160605,$$

$$t_2=\frac{45.4-50}{3.160605}\approx\boxed{-1.455418}.$$

**Potassium:**

$$s_3=\sqrt{3.627658}\approx1.904641,$$

$$\operatorname{SE}_3=\frac{1.904641}{\sqrt{20}}\approx0.425891,$$

$$t_3=\frac{9.965-10}{0.425891}\approx\boxed{-0.082181}.$$

The two-sided p-values follow from $2P(t_{19}\ge|t_j|)$.

### 15.10 Why the printed 95% confidence intervals contain the hypothesized means

The first interval is constructed using

$$4.64\pm t_{19;0.975}(0.379432).$$

With $t_{19;0.975}\approx2.093024$,

$$4.64\pm2.093024(0.379432)
\approx[3.84584,5.43416].$$

Because $4$ lies inside, this **5% two-sided** test does not reject the first component null. Similarly, $50$ and $10$ lie inside the two other 95% marginal intervals.

The existence of these three nonsignificant **separate** $t$ tests does not logically invalidate the **joint** Hotelling rejection at 10%. They are different tests; the printed intervals are also based on a different confidence level than the main test.

### 15.11 What if we used 90% individual confidence intervals?

For explanatory completeness, the corresponding **individual**, not simultaneous, 90% intervals are approximately:

| Variable | Individual 90% confidence interval | Contains null component? |
|---|---|---|
| Sweat rate | $[3.98391,\ 5.29609]$ | Yes: 4 |
| Sodium | $[39.93489,\ 50.86511]$ | Yes: 50 |
| Potassium | $[9.22858,\ 10.70142]$ | Yes: 10 |

All three individual 10%-level tests therefore still fail to reject. The joint 10%-level Hotelling test **does** reject.

This is a particularly instructive feature of the lecture example: the observed vector can be unusual in its **joint covariance geometry**, even though its individual coordinates do not cross their corresponding marginal-test thresholds.

### 15.12 Do these results tell us which component is "responsible"?

Not by themselves. A joint test detects a departure in the *vector*. It does not provide a unique decomposition into three independent causes, since the variables themselves are correlated.

Follow-up investigations can examine pre-specified contrasts, simultaneously adjusted intervals, or other scientifically relevant combinations. Care is needed to avoid overinterpreting multiple post-hoc comparisons.

---

# PART V. ENRICHMENT, PRACTICE, AND REFERENCE

## 16. Confidence regions for several means: optional textbook extension

**Important course boundary:** The lecturer explicitly states that confidence interval estimation for multivariate data is **omitted from the course content**. **[Lecture, p. 2]**

The material in this chapter is therefore optional enrichment. It is here because it clarifies the relationship between hypothesis testing, geometric distance, and uncertainty, not because the PDF teaches these formulas.

### 16.1 Why one interval is not enough for a vector

An interval such as $[3.8,5.4]$ can describe uncertainty about **one** population mean. But with two means, we need a set of plausible **pairs** of values in a plane; with three means, a set of plausible **triples** in three-dimensional space.

A region for several parameters at once is called a **confidence region**.

### 16.2 The Hotelling confidence ellipsoid

Under the exact model assumptions, a $(1-\alpha)100\%$ joint confidence region for the population mean vector is

$$\boxed{
\mathcal C_{1-\alpha}=
\left\{\boldsymbol\mu:
 n(\overline{\mathbf X}-\boldsymbol\mu)'
 \mathbf S^{-1}
 (\overline{\mathbf X}-\boldsymbol\mu)
 \le\frac{p(n-1)}{n-p}F_{p,n-p;1-\alpha}
\right\}.
}$$

The braces $\{\ \}$ mean "the set of every vector $\boldsymbol\mu$ satisfying the condition."

Geometrically, it is an **ellipsoid centered at the sample mean vector**. Its orientation and shape depend on the sample covariance matrix.

Because the same $T^2$ cutoff appears, there is an exact connection:

> The joint test of a proposed mean vector rejects at level $\alpha$ precisely when that proposed vector lies **outside** this $(1-\alpha)$ confidence ellipsoid.

### 16.3 The size and directions of the region

For $p=2$, the boundary is an ellipse. The region is usually wider along directions of large observed joint variation and narrower along directions of small variation.

If $\mathbf S$ is diagonal, the ellipse is aligned with the coordinate axes. With nonzero covariance, the ellipse generally tilts.

The inverse covariance matrix matters because it assigns more statistical weight to departures along **low-variance directions**.

### 16.4 Simultaneous intervals derived from the ellipsoid

The projection of the Hotelling ellipsoid onto individual coordinate $j$ gives a simultaneous confidence interval:

$$\boxed{
\overline X_j\pm
\sqrt{\frac{p(n-1)}{n-p}F_{p,n-p;1-\alpha}}
\sqrt{\frac{s_{jj}}{n}}.
}$$

Here:

- $\overline X_j$ is the sample mean of variable $j$.
- $s_{jj}$ is its sample variance, a diagonal entry of $\mathbf S$.
- $\sqrt{s_{jj}/n}$ is its standard error.
- The additional square-root factor inflates the width to provide **simultaneous** coverage across all considered mean-vector coordinates.

These intervals differ from the ordinary individual $t$ intervals.

### 16.5 The sweat data's 90% simultaneous intervals

For $n=20$, $p=3$, and $\alpha=0.10$, the squared Hotelling cutoff is approximately

$$c=\frac{3(19)}{17}F_{3,17;0.90}\approx8.172573.$$

The relevant multiplying factor for each coordinate's standard error is

$$\sqrt c\approx2.858771.$$

The approximate 90% **simultaneous projection** intervals are:

| Variable | Simultaneous 90% projection interval |
|---|---|
| Sweat rate | $[3.55529,\ 5.72471]$ |
| Sodium | $[36.36455,\ 54.43545]$ |
| Potassium | $[8.74748,\ 11.18252]$ |

All three null coordinates lie inside their respective intervals. **This does not contradict the joint rejection.** The point $(4,50,10)'$ may be outside the full tilted ellipsoid even while lying inside each of the three one-dimensional shadows of that ellipsoid.

The distinction is similar to a point lying inside the bounding rectangle of a tilted ellipse but **outside the ellipse itself**.

### 16.6 Why you should not confuse the three constructions

1. **Individual confidence intervals:** cover one specified component at a time, at the stated confidence level.
2. **Simultaneous intervals:** are constructed to achieve joint coverage for several reported components or contrasts.
3. **Full confidence ellipsoid:** retains covariance geometry across all dimensions and exactly corresponds to the overall Hotelling test.

An overall multivariate rejection does not require that one separately displayed univariate interval exclude its null value.

---

## 17. Assumptions, limitations, diagnostics, and choosing the correct procedure

### 17.1 A more complete assumption checklist

**Independent observations.** The lecture's exact sampling model assumes independent randomly sampled vectors. Measurements collected repeatedly from the same people generally require a paired/repeated-measures or other dependent-data method.

**Common population distribution.** The sample should plausibly represent one population for which a single mean vector and covariance matrix are relevant. Strong mixtures of dissimilar groups may require a more careful model.

**Multivariate normality for the exact finite-sample $F$ result.** This is much stronger than saying each separate variable has a roughly bell-shaped histogram.

**Finite, nonsingular covariance matrix.** The inverse $\mathbf S^{-1}$ must exist. A variable with zero sample variance, exact redundant variables, or too many variables relative to observations can make it singular.

**Adequate sample size.** Classical one-sample Hotelling requires $n>p$ and can become statistically fragile when $n$ barely exceeds $p$.

**Appropriate measurement.** Means must be scientifically interpretable; category labels such as brand names are not meaningful quantitative variables merely because they are assigned numbers.

**Appropriate sampling mechanism.** A mathematically valid test does not correct biased sampling or prove causal relationships.

**Outlier sensitivity.** Sample means and covariance matrices can be distorted by extreme observations.

### 17.2 What to do when $\mathbf S$ cannot be inverted

If `solve(S)` produces a singularity error, check:

- Did you accidentally include the same column twice?
- Is one variable exactly the sum or multiple of another?
- Is any variable constant?
- Is $p\ge n$?
- Are there fewer complete cases than expected after missing-data removal?

Avoid merely using a generalized inverse and then claiming the **same exact $F_{p,n-p}$ reference distribution**. A different formulation, reduced-rank analysis, regularization, or a method designed for high-dimensional data may be required.

### 17.3 What if assumptions are doubtful?

Potential strategies, subject to the research design, include:

- Correct obvious recording mistakes and investigate influential observations.
- Examine whether transformed variables make the model more reasonable, with care that this changes the scientific meaning of means.
- Use an appropriately validated bootstrap or permutation strategy when its assumptions and target null make it valid.
- Use robust multivariate methods when conventional means and covariances are excessively sensitive to outliers.
- Model clustered or repeated observations using methods designed for dependence.
- Collect more representative data if the study is underpowered or the sample is unrepresentative.

**Warning about permutation methods:** Permuting observations is not automatically a valid test of an arbitrary nonzero mean-vector null, and shifting data or resampling residuals requires justification. A method's validity comes from the sampling/exchangeability structure, not simply from doing many random shuffles.

### 17.4 Choosing between common approaches

| Research situation | More relevant starting procedure | Why |
|---|---|---|
| One quantitative variable, normal i.i.d. sample, unknown variance | One-sample $t$ test | Tests one scalar population mean |
| Several jointly measured quantitative variables, normal i.i.d. sample, $n>p$ | One-sample Hotelling $T^2$ | Tests the full mean vector while considering covariance |
| Several variables, sufficiently large sample, suitable finite-moment assumptions | Large-sample chi-square mean-vector test | Uses the multivariate central limit approximation |
| Two independent groups, several outcomes | Two-sample Hotelling or related multivariate comparison | Different null and sampling design |
| Same people measured twice on several variables | One-sample Hotelling on **difference vectors**, if assumptions permit | Respects pairing |
| One main outcome with several nuisance predictors | Regression or another relevant model | Directly addresses adjustment for covariates |
| Repeated or clustered observations | Dependent-data multivariate method | Ordinary independence assumption fails |

The last four scenarios are **contextual extensions** and not worked procedures from this five-page lecture.

### 17.5 What statistical significance cannot establish

Rejecting the joint null does not tell us whether the discrepancy matters clinically or commercially. Practical importance also depends on units, scientific context, measurement reliability, and the magnitude of differences.

A small p-value is not the same as a large effect. Similarly, failing to reject does not demonstrate **equivalence** or **no effect**. Demonstrating equivalence requires a different design with carefully specified acceptable differences.

---

## 18. A reliable exam method: from question wording to interpretation

A well-structured solution shows the examiner that you understand the research question, the formula, the reference distribution, and the decision.

### 18.1 The nine-step calculation workflow

**Step 1: Read the study design.** Is there one sample with several variables? Are the observations independent? Is multivariate normality assumed or adequately supported?

**Step 2: Identify $n$ and $p$.** Be careful: $n$ counts rows; $p$ counts variables.

**Step 3: State hypotheses as vectors.**

$$H_0:\boldsymbol\mu=\boldsymbol\mu_0,
\qquad H_1:\boldsymbol\mu\ne\boldsymbol\mu_0.$$

**Step 4: State the significance level.** For example $\alpha=0.10$.

**Step 5: Find sample summaries.** Calculate $\overline{\mathbf X}$, $\mathbf S$, and $\mathbf d=\overline{\mathbf X}-\boldsymbol\mu_0$.

**Step 6: Calculate the raw Hotelling statistic.**

$$T^2=n\mathbf d'\mathbf S^{-1}\mathbf d.$$

**Step 7: Choose the reference distribution.** For the exact test,

$$F_{\mathrm{obs}}=\frac{n-p}{p(n-1)}T^2
\quad\text{with df }(p,n-p).$$

For a justified large-sample approximation, use $\chi_p^2$ on the raw $T^2$ scale instead.

**Step 8: Find the p-value or critical value.** Compare quantities from the **same scale**. Never compare a raw $T^2$ against an unscaled $F$ critical value.

**Step 9: Write a complete conclusion.** State reject/fail to reject, the significance level, and what the result means for the **joint population mean vector**.

### 18.2 A complete model answer for the lecture's sweat data

**Question:** Test whether the mean vector for sweat rate, sodium content, and potassium content equals $(4,50,10)'$ at a 10% significance level.

**Model answer:**

> The null and alternative hypotheses are $H_0:\boldsymbol\mu=(4,50,10)'$ and $H_1:\boldsymbol\mu\ne(4,50,10)'$. For the 20 three-dimensional observations, $n=20$, $p=3$, and $\overline{\mathbf X}=(4.64,45.4,9.965)'$. Using the sample covariance matrix and $T^2=n(\overline{\mathbf X}-\boldsymbol\mu_0)'\mathbf S^{-1}(\overline{\mathbf X}-\boldsymbol\mu_0)$, the raw statistic is approximately $T^2=9.73877$. Its $F$-scaled value is $F_{\mathrm{obs}}=\frac{17}{57}(9.73877)=2.90455$, evaluated with $3$ and $17$ degrees of freedom. The p-value is $0.06493$. Since $0.06493<0.10$, we reject $H_0$. Subject to the test assumptions, there is statistically significant evidence at the 10% level that the population's joint mean profile is not $(4,50,10)'$.

### 18.3 Recognizing common wording in exam questions

**"Test whether the vector of population means equals ..."** Usually calls for a joint mean-vector hypothesis.

**"Is $\boldsymbol\mu_0$ a plausible mean vector?"** Means assess consistency with the data under a stated statistical model; it does not request proof that the null is true.

**"Find the test statistic and degrees of freedom"** Requires the raw $T^2$, and often also the transformed $F$ with degrees of freedom $(p,n-p)$.

**"Use the critical-value approach"** Requires a correct critical value and a clear numerical comparison.

**"Explain why not test each variable separately"** Answer with correlations and the fact that the target is a joint mean vector; the additional multiple-testing concern may strengthen a detailed answer.

**"What if the population is nonnormal and the sample large?"** Explain the large-sample $\chi_p^2$ approximation and its limitations.

---

## 19. Practice questions with fully explained answers

All problems in this chapter are **new textbook exercises**, not questions reproduced from the lecture.

### Exercise 1. Population or sample?

A retailer surveys 80 customers and finds that their average transaction value is $\$42.50. Identify the population, the sample, a sample statistic, and a possible population parameter.

**Answer.** The population is the full customer group the study aims to represent, not necessarily everyone who has ever shopped there. The sample is the 80 surveyed customers. The sample mean $\bar x=\$42.50$ is a statistic. The true average transaction value $\mu$ across the intended customer population is a parameter. It is usually unknown; the sample mean estimates it.

### Exercise 2. Standard deviation versus standard error

If $n=64$ and $s=16$, calculate the estimated standard error of the sample mean. Explain what it measures.

**Answer.**

$$\operatorname{SE}=\frac{16}{\sqrt{64}}=\frac{16}{8}=\boxed{2}.$$

This $2$ measures estimated sampling variability in the mean, not the spread of individual customer values. The latter is described by the sample standard deviation $16$.

### Exercise 3. Create the hypotheses

A manufacturer claims the population mean vector of three quality measurements is $(12,25,7)'$. Write a suitable two-sided joint test.

**Answer.**

$$H_0:\boldsymbol\mu=\begin{bmatrix}12\\25\\7\end{bmatrix},
\qquad
H_1:\boldsymbol\mu\ne\begin{bmatrix}12\\25\\7\end{bmatrix}.$$

The alternative means **at least one** actual population component mean differs from the stated target; it does not require all three to differ.

### Exercise 4. One-sample $t$ test

For the observations $4,5,6,7,8$, test $H_0:\mu=5$ against a two-sided alternative at $\alpha=0.05$, under a normal i.i.d. model.

**Answer.** The mean is $6$. The squared deviations from $6$ sum to $10$, so $s^2=10/4=2.5$ and $s=\sqrt{2.5}$. Hence

$$t=\frac{6-5}{\sqrt{2.5}/\sqrt5}=1.41421.$$

Degrees of freedom are $4$. The two-sided p-value is about $0.23020$, which exceeds $0.05$. Fail to reject $H_0$. The data do not provide significant evidence of a different population mean at the 5% level.

### Exercise 5. Interpret a covariance matrix

Given

$$\mathbf S=\begin{bmatrix}4&-3\\-3&9\end{bmatrix},$$

find the individual sample variances, standard deviations, covariance, and correlation.

**Answer.** The sample variances are $s_1^2=4$ and $s_2^2=9$, so $s_1=2$ and $s_2=3$. The covariance is $s_{12}=-3$. Thus

$$r_{12}=\frac{-3}{2(3)}=\boxed{-0.5}.$$

The variables exhibit moderate negative linear correlation in this sample.

### Exercise 6. Is this covariance matrix invertible?

Consider

$$\mathbf S=\begin{bmatrix}1&2\\2&4\end{bmatrix}.$$

Calculate its determinant. Can it be used directly in the conventional inverse-based Hotelling formula?

**Answer.**

$$\det(\mathbf S)=1(4)-2(2)=0.$$

The matrix is singular, so $\mathbf S^{-1}$ does not exist. The conventional inverse-based formula cannot be evaluated as written. One should investigate exact redundancy or other causes; using an arbitrary pseudo-inverse does not automatically restore the classical exact distribution.

### Exercise 7. Matrix multiplication and squared distance

Let

$$\mathbf S^{-1}=\begin{bmatrix}2&-1\\-1&2\end{bmatrix},\qquad
\mathbf d=\begin{bmatrix}1\\2\end{bmatrix}.$$

Calculate $\mathbf d'\mathbf S^{-1}\mathbf d$ and $T^2$ if $n=10$.

**Answer.** First,

$$\mathbf S^{-1}\mathbf d=\begin{bmatrix}2(1)-1(2)\\-1(1)+2(2)\end{bmatrix}
=\begin{bmatrix}0\\3\end{bmatrix}.$$

Then

$$\mathbf d'\mathbf S^{-1}\mathbf d
=\begin{bmatrix}1&2\end{bmatrix}\begin{bmatrix}0\\3\end{bmatrix}
=0+6=6.$$

Finally,

$$\boxed{T^2=10(6)=60.}$$

### Exercise 8. Convert $T^2$ into $F$

A one-sample multivariate study has $n=25$, $p=4$, and a raw Hotelling statistic $T^2=12$. Find the transformed $F$ value and its degrees of freedom.

**Answer.**

$$F_{\mathrm{obs}}=\frac{25-4}{4(25-1)}(12)
=\frac{21}{96}(12)=\boxed{2.625}.$$

The relevant reference distribution is $F_{4,21}$. In R, the corresponding p-value would be obtained with `pf(2.625, 4, 21, lower.tail = FALSE)`.

### Exercise 9. Why a one-tailed $F$ probability for a two-sided hypothesis?

**Answer.** The alternative $\boldsymbol\mu\ne\boldsymbol\mu_0$ includes differences in any vector direction. However, $T^2$ squares the covariance-adjusted distance, so large departures in **all directions** produce large **positive** statistics. Their evidence accumulates in the upper tail. There is no separate negative tail of $T^2$ to double.

### Exercise 10. Revisit the toy example

For the five observations in Chapter 10, use the given $\mathbf S$ and $\mathbf d$ to obtain the raw statistic, the $F$ statistic, and a conclusion at the 10% level.

**Answer.** The sample covariance matrix is $\begin{bmatrix}2.5&2\\2&2.5\end{bmatrix}$ and the mean difference is $(1,-1)'$. The inverse-times-difference vector is $(2,-2)'$, so the quadratic form is $4$. Hence $T^2=5(4)=20$, and $F=(3/8)(20)=7.5$ with $(2,3)$ degrees of freedom. Its p-value is about $0.06804$. Reject the joint null at the 10% level.

### Exercise 11. Decide using two different significance levels

A test produces p-value $0.06493$. What are the decisions at $\alpha=0.10$ and $\alpha=0.05$?

**Answer.** At $0.10$, $0.06493<0.10$, so reject. At $0.05$, $0.06493>0.05$, so fail to reject. Neither decision changes the p-value or implies a probability that the null is true.

### Exercise 12. Explain the apparent disagreement among tests

In the lecture's sweat study, the joint Hotelling p-value is $0.06493$, but the three individual $t$ p-values are $0.1080$, $0.1619$, and $0.9354$. Is there a logical contradiction?

**Answer.** No. Hotelling's test considers the **joint** displacement of the mean vector relative to the **full covariance matrix**, while the three $t$ tests examine coordinates separately. Correlation can make a vector discrepancy more unusual than its separate coordinates appear. There are also multiple-testing concerns when several individual tests are interpreted together. The joint test rejects at 10%; the individual tests do not. The two results answer different statistical questions.

### Exercise 13. Correct a p-value misunderstanding

A classmate states, "The Hotelling test gave p = 0.06493, so there is a 6.493% probability that the mean vector is actually $(4,50,10)'$." Correct the statement.

**Answer.** A p-value is calculated **conditional on assuming the null hypothesis**. The correct interpretation is that, if the null vector and model assumptions were true, a test result at least as extreme as the observed one would occur with probability about $0.06493$. It does not assign a probability that the null vector is true.

### Exercise 14. Understand the large-sample critical rule

Suppose an adequately large-sample problem has $p=2$ and raw $T^2=7$. The upper-tail 5% chi-square critical value with two degrees of freedom is approximately $5.991$. What does the approximation say?

**Answer.** Because $7>5.991$, reject the null at the 5% level **under the assumption that the chi-square approximation is appropriate**. The conclusion does not automatically apply to small-sample data. The raw $T^2$, not the F-transformed number, is compared to the chi-square cutoff.

### Exercise 15. Distinguish a lack of rejection from proof of equality

The test of $H_0:\boldsymbol\mu=\boldsymbol\mu_0$ has p-value $0.73$. What can we say?

**Answer.** The data do not provide statistically significant evidence against that mean vector at common significance levels such as 5% or 10%. We may describe the vector as *not ruled out by this test*. We cannot conclude the population mean vector equals the null vector exactly, and a small or noisy sample may be uninformative.

### Exercise 16. Choose the design-appropriate model

A laboratory records three biochemical measurements **before and after treatment on the same 20 people**. Is an ordinary two-independent-sample Hotelling test the natural first choice?

**Answer.** No. The measurements are **paired** within each person. A natural strategy, if assumptions permit, is to form each person's three-component **after-minus-before difference vector** and apply a one-sample Hotelling test to those difference vectors to evaluate whether the mean change vector equals zero. Treating paired measurements as independent throws away design information and can misstate standard errors.

### Exercise 17. Explain the degree-of-freedom requirement

A dataset has 8 observations and 10 measured variables. Can the standard full-rank one-sample Hotelling $T^2$ formula and its $F_{p,n-p}$ reference be used as written?

**Answer.** No. Here $n-p=8-10=-2$, which cannot serve as the denominator degrees of freedom. Moreover, the sample covariance matrix computed from 8 centered observations has rank at most $7$, so a $10\times10$ sample covariance matrix is necessarily singular. A different high-dimensional or reduced-rank analysis is needed.

### Exercise 18. What if the null vector were inside all marginal intervals but outside the ellipsoid?

**Answer.** This is possible. The marginal intervals describe projections of a multivariate region onto separate axes. The joint confidence ellipsoid also incorporates the *correlation-dependent shape and tilt*. A vector may lie inside all coordinate-wise projections yet outside the complete ellipsoid, leading to a joint rejection even when coordinate-wise inclusion tests do not reject.

---

## 20. Final reference: notation, formula sheet, and page-by-page audit

### 20.1 Notation dictionary

| Notation | Meaning |
|---|---|
| $n$ | Number of independently sampled observations |
| $p$ | Number of measured variables in each observation |
| $X_i$ | Scalar observation $i$ in a univariate study |
| $\mathbf X_i$ | $p\times1$ observation vector for sampled unit $i$ |
| $X_{ij}$ | Variable $j$ on unit $i$ |
| $\mu$ | Scalar population mean |
| $\mu_0$ | Scalar mean specified by the null hypothesis |
| $\boldsymbol\mu$ | $p\times1$ population mean vector |
| $\boldsymbol\mu_0$ | $p\times1$ hypothesized mean vector |
| $\overline X$ | Scalar sample mean |
| $\overline{\mathbf X}$ | Sample mean vector |
| $s^2$ | Univariate sample variance |
| $s$ | Univariate sample standard deviation |
| $\sigma^2$ | Population variance |
| $\boldsymbol\Sigma$ | Population covariance matrix |
| $\mathbf S$ | Sample covariance matrix, using divisor $n-1$ |
| $\mathbf S_n$ | Covariance estimator using divisor $n$, used in the Mardia derivation |
| $\mathbf S^{-1}$ | Inverse of the sample covariance matrix |
| $'$ | Transpose operation |
| $\mathbf d$ | $\overline{\mathbf X}-\boldsymbol\mu_0$ |
| $\mathbf I$ | Identity matrix |
| $E[X]$ | Expected value of random variable $X$ |
| $\operatorname{Var}(X)$ | Variance of a random variable |
| $\operatorname{Cov}(X,Y)$ | Covariance between two variables |
| $r$ | Sample correlation |
| $H_0,H_1$ | Null and alternative hypotheses |
| $\alpha$ | Significance level; Type I error bound of a correctly calibrated test |
| $t_{n-1}$ | Student's $t$ distribution with $n-1$ degrees of freedom |
| $T^2$ | Raw one-sample Hotelling quadratic-form statistic |
| $F_{p,n-p}$ | $F$ distribution with $(p,n-p)$ degrees of freedom |
| $F_{p,n-p;1-\alpha}$ | Lower-tail $1-\alpha$ $F$ critical quantile |
| $\chi_p^2$ | Chi-square distribution with $p$ degrees of freedom |
| $\chi^2_{p;1-\alpha}$ | Lower-tail $1-\alpha$ chi-square critical quantile |
| $\sim$ | Is distributed as |
| $\xrightarrow{d}$ | Converges in distribution |

### 20.2 Core lecture formulas, collected in one place

**Univariate sample mean and variance.** **[Lecture, p. 1]**

$$\overline X=\frac1n\sum_{j=1}^{n}X_j,\qquad
s^2=\frac1{n-1}\sum_{j=1}^{n}(X_j-\overline X)^2.$$

**One-sample $t$ test.** **[Lecture, p. 1]**

$$t=\frac{\overline X-\mu_0}{s/\sqrt n}\sim t_{n-1}\quad(H_0).$$

**Two-sided $t$ rejection and confidence interval.** **[Lecture, p. 1]**

$$|t|>t_{n-1;1-\alpha/2},\qquad
\overline x\pm t_{n-1;1-\alpha/2}\frac{s}{\sqrt n}.$$

**Univariate squared form, leading to Hotelling.** **[Lecture, p. 2]**

$$t^2=n(\overline X-\mu_0)(s^2)^{-1}(\overline X-\mu_0).$$

**Hotelling statistic.** **[Lecture, p. 2]**

$$T^2=n(\overline{\mathbf X}-\boldsymbol\mu_0)'
\mathbf S^{-1}(\overline{\mathbf X}-\boldsymbol\mu_0).$$

**Exact $F$ distribution.** **[Lecture, p. 2]**

$$\frac{n-p}{p(n-1)}T^2\sim F_{p,n-p}\quad(H_0).$$

**Exact critical-value rule.** **[Lecture, p. 2]**

$$\text{Reject }H_0\text{ if }
T^2>\frac{p(n-1)}{n-p}F_{p,n-p;1-\alpha}.$$

**Large-sample chi-square rule.** **[Lecture, p. 2]**

$$\text{Reject }H_0\text{ if }
T^2>\chi^2_{p;1-\alpha}\qquad\text{(suitable large-sample setting)}.$$

**Main study hypotheses.** **[Lecture, p. 3]**

$$H_0:\boldsymbol\mu=(4,50,10)',
\qquad H_1:\boldsymbol\mu\ne(4,50,10)',\qquad\alpha=0.10.$$

### 20.3 How the lecture's five printed pages were covered

| Original page | All meaningful source material | Where it is developed in this book |
|---|---|---|
| **1** | Definition of inference; importance of correlated variables; univariate null and alternative; one-sample $t$; sample mean and variance; $t$ critical value, p-value, confidence interval; transition to $p$-variate normal observation vectors and mean-vector null. | Chapters 1–5, 7–8; formula collection 20.2 |
| **2** | Squaring $t$; replacing scalar variance with covariance matrix; Hotelling $T^2$ formula; scaled $F$ reference; degrees of freedom; exact rejection rules; meaning of statistical distance; explicit omission of multivariate confidence intervals; large-sample chi-square test. | Chapters 6, 8–12, 16–18; formula collection 20.2 |
| **3** | Sweat-study context and 20 rows; `read.table()`; `QuantPsyc::mult.norm()`; multivariate skewness and kurtosis output and interpretation; null vector $(4,50,10)'$; significance level $0.10$. | Chapters 13–15; data table 13.2; normality calculations 14.5–14.7 |
| **4** | `ICSNP::HotellingsT2()` command; test output (`2.9045`, df $3,17$, p $0.06493$); rejection at 10%; independent $t$ tests for sweat and sodium; printed estimates, p-values, and 95% intervals; beginning of potassium test. | Chapters 13.10–13.14 and 15.5–15.11 |
| **5** | Potassium sample estimate $9.965$; concluding question asking why $p$ separate tests are not enough; the stated failure to account for interrelationships. | Chapters 11 and 15.8–15.12; exercises 12 and 18 |

### 20.4 Source-integrity and calculation audit

To distinguish **the lecture's reported content** from **verified textbook calculations**, this audit checks the points most likely to confuse a careful learner:

| Item | Verification result |
|---|---|
| Uploaded PDF | Five printed pages, all inspected including the mostly empty final page. |
| Source sample size and dimensions | $n=20$, $p=3$. |
| Source dataset | All 20 triples copied in the order printed on page 3. |
| Printed sample means | $4.64$, $45.4$, $9.965$, reproduced exactly from the displayed observations. |
| Printed multivariate normality results | Mardia skewness $2.188224$, kurtosis $11.880604$; corresponding test statistics and p-values are reconstructible. |
| Raw Hotelling $T^2$ | $9.7387728554$, reconstructed directly from the sample means and covariance matrix. |
| F-scaled statistic | $2.9045462902$, matches the source's printed `T.2 = 2.9045` to rounding. |
| Exact p-value | $0.0649283354$, matches the source's $0.06493$. |
| Rejection at $\alpha=0.10$ | Correct: $0.06493<0.10$. |
| Non-rejection at $\alpha=0.05$ | Additional observation: $0.06493>0.05$. |
| Separate $t$ statistics and p-values | All three reproduced to the precision printed on pages 4–5. |
| Source confidence intervals | Three 95% marginal intervals reproduced; distinguished from 10% test level. |
| Confidence regions | Explicitly omitted from the course notes; all confidence-ellipsoid material clearly labeled enrichment. |
| Large-sample approximation | Correctly distinguished from the finite-sample $F$ distribution; applying it at $n=20$ can materially change the p-value. |
| Units of sweat/sodium/potassium | Not provided in Lec7; none invented. |

### 20.5 A final mental picture of the whole subject

Imagine the observations forming a cloud of points.

The **center of the cloud** is the sample mean vector $\overline{\mathbf X}$. The **shape and orientation of the cloud** are described by the covariance matrix $\mathbf S$. The **proposed true center** is the null vector $\boldsymbol\mu_0$.

The task is not simply to ask, "Are these two centers different as numbers?" Almost any random sample will produce a slightly different center. The meaningful question is:

> **Is the observed displacement of the sample center from the proposed center unusually large compared with the sampling uncertainty expected in this correlated multivariate population?**

Hotelling's $T^2$ answers by measuring the covariance-adjusted squared displacement, multiplying by sample size, and comparing the result with an exact $F$ reference distribution under multivariate normality. For suitable large samples, a chi-square approximation provides another route.

That single idea connects the entire lecture: samples, uncertainty, mean vectors, covariance matrices, hypothesis testing, p-values, the perspiration dataset, and the reason to analyze correlated variables jointly.

---

## Reproducibility and attribution note

This book was developed from the five printed pages of **`Lec7.pdf`**, supplied for DA2451 Multivariate Methods in Business (Semester 4, 2026). It preserves the lecture's main definitions, hypotheses, decision rules, data values, R command structure, and reported numerical results. Additional worked illustrations, Mardia-statistic derivations, computational cross-checks, confidence ellipsoid discussion, diagnostics, and exercises are independent **teaching extensions**. Numerical cross-checks were independently calculated from all 20 printed observations, using double-precision numerical computations and the usual $t$, $F$, and chi-square reference distributions. R code is supplied to reproduce the calculations. Values displayed to limited decimal precision may have negligible rounding differences.

**End of the teaching book.**
