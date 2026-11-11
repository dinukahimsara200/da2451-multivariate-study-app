# DA2451 Practice Worksheet 04: Complete Beginner-Friendly Teaching Guide

**Course:** DA2451, Multivariate Methods in Business  
**Source worksheet:** `PQ4.pdf`, *Practice Worksheet - 4*, Semester 4, 2024, one page  
**Topic:** Multivariate normal distribution, Part II  
**Source instruction:** *Use R to answer all questions.*  
**Additional source data:** `T3-2(1).DAT`, the supplied 25-row Wisconsin snow-removal dataset, corresponding to `T3-2.dat` in the worksheet.

## How to use this guide

This is a complete teaching treatment, not just an answer key. Start with the foundations even if you have never studied statistics or used R. Then study the original questions and their worked answers. Type the R commands in order, rather than memorizing the conclusions. A final reproducible script lets you repeat the analysis from beginning to end.

**Provenance and accuracy conventions**

- **Original question:** Reproduces the wording, numerical observations, notation, and requested tasks from the one-page worksheet. The worksheet contains **questions but no printed worked solutions**.
- **Supplied dataset:** The 25 Wisconsin observations come from the accompanying uploaded `.DAT` file; they are not invented or inferred from the question.
- **Independently calculated result:** Numerical results were computed directly from the given observations using numerical statistical methods, including the Shapiro–Wilk test and maximum-likelihood Box–Cox fitting. Values are rounded in the prose. The included **R programs are reproducible code, not a claim that R itself was executed during this preparation**. Minor last-digit differences between implementations can occur.
- **Supplementary teaching:** Background explanations, manual demonstrations, alternative diagnostics, and cautionary examples are added to help you learn. They are **not** quotations from the lecturer.
- **Significance level:** Question 1 explicitly sets $\alpha=0.10$. Question 2 does not specify one, so **$\alpha=0.05$ is used as an illustrative working level** for its statistical tests. This is an explicit choice, not an instruction printed in the question.
- **Interpretation of tests:** A high $p$-value does not prove a distribution is normal. Reusing the same sample to choose a transformation and then test it makes the post-transformation tests **diagnostic and exploratory**, not fully independent confirmatory tests.

## Navigation

1. [Module A. Absolute-zero foundations](#module-a-absolute-zero-foundations)
2. [Module B. Understanding Q-Q plots and tests](#module-b-understanding-q-q-plots-and-tests)
3. [Module C. Getting started with R](#module-c-getting-started-with-r)
4. [Question 1. Stock returns and normality](#question-1-stock-returns-and-normality)
5. [Question 2. Wisconsin snow-removal data](#question-2-wisconsin-snow-removal-data)
6. [Question 2(a). Scatter plots and outliers](#question-2a-scatter-plots-and-outliers)
7. [Module D. Power transformations](#module-d-power-transformations-explained-before-questions-2b-and-2c)
8. [Question 2(b). Normality of storm duration](#question-2b-normality-of-storm-duration)
9. [Question 2(c). Normality of removal time](#question-2c-normality-of-removal-time)
10. [Question 2(d). Bivariate normality](#question-2d-bivariate-normality)
11. [Complete runnable R script](#complete-runnable-r-script)
12. [Exam reasoning, pitfalls and self-checks](#exam-reasoning-pitfalls-and-self-checks)

---

# Module A. Absolute-zero foundations

## A1. What does statistics try to discover?

Imagine you are responsible for clearing snow from roads. After each storm you record how long the storm lasted and how long the removal crews worked. Those are **observations**: actual measurements of real incidents. A collection of observations is called **data**. Statistics helps us describe these observations and draw careful conclusions about the wider situation they may represent.

For instance, you might ask:

- What is the typical duration of a snowstorm?
- Are unusually long storms common or rare?
- Do longer storms generally require more clearing time?
- Is the pattern of measurements approximately normal, so that certain statistical methods make sense?

A **population** is the wider collection we want to understand. A **sample** is the subset we actually observe. The 25 incidents in Question 2 form a sample. If sampling is biased, the measurements may not represent all possible storms well, even if every statistical calculation is correct.

A **variable** is a characteristic that can take different values. In Question 2 we have two variables:

- $X_1$: storm duration, in hours;
- $X_2$: time spent clearing snow, in hours, using the worksheet's description of crew, personnel, and machinery effort.

The capital $X$ normally denotes a *random variable*, an uncertain measurement considered before observing it. A lowercase $x$ can denote an observed value. For example, on incident 1 we observed $x_{11}=12.5$ and $x_{12}=13.7$. The notation $x_{ij}$ means the value for observation $i$ on variable $j$.

An **observation** on both variables is a pair such as $(12.5,13.7)$. We must keep the two numbers together because they came from **the same incident**. Shuffling the second column independently would destroy their relationship.

## A2. One variable, two variables, many variables

**Univariate** analysis studies one variable, such as storm duration alone. **Bivariate** analysis studies two variables together, such as duration *and* removal time. **Multivariate** analysis concerns several measurements together, often analyzed as a vector.

For a storm:

$$
\mathbf X=\begin{bmatrix}X_1\\X_2\end{bmatrix}.
$$

The square brackets organize the two values into a **column vector**. A vector is simply an ordered group of numbers. In Question 2, each storm is one vector. In the full dataset, each storm is a row and each variable is a column:

$$
\mathbf X_{\mathrm{data}}=\begin{bmatrix}
12.5&13.7\\14.5&16.5\\\vdots&\vdots\\13.0&25.6
\end{bmatrix}_{25\times 2}.
$$

$25\times 2$ means 25 rows and two columns. Do not confuse this **data matrix** with the theoretical random vector $\mathbf X$; statisticians sometimes use similar letters for both.

**Marginal** means looking at one member of a jointly observed set while temporarily setting aside the other. For example, a marginal distribution of $X_1$ describes storm duration without considering removal time. In Question 2 you check two marginal distributions *before* judging whether the joint two-variable distribution looks normal.

## A3. What is a probability distribution?

An uncertain measurement does not always take the same value. A **probability distribution** describes how its possible values are spread out.

Think of repeated measurements of a continuously varying quantity, like time spent removing snow. Some durations occur more often than others. A histogram groups durations into bins and shows where most observations lie. A theoretical distribution gives a smooth mathematical description of the pattern.

For a **continuous** variable, the curve's height is a *probability density*. A tall curve at a particular value means values *near* that point are relatively common; the height itself is not the probability of that exact value. Probabilities correspond to **areas under the curve** across intervals. The full area under a valid density is 1.

A **parameter** describes a characteristic of the wider population. Two important parameters are:

- $\mu$ (pronounced “mu”): the population mean, or balancing point;
- $\sigma$ (pronounced “sigma”): the population standard deviation, measuring typical spread.

A sample produces *estimates* of these:

$$
\bar x=\frac1n\sum_{i=1}^n x_i,
\qquad
s^2=\frac{1}{n-1}\sum_{i=1}^n(x_i-\bar x)^2,
\qquad
s=\sqrt{s^2}.
$$

Read these slowly:

- $n$: number of observations;
- $\sum$: “add together”;
- $x_i$: the $i$th observed number;
- $\bar x$: sample mean, pronounced “x bar”;
- $x_i-\bar x$: deviation from the sample mean;
- $(x_i-\bar x)^2$: squared deviation;
- $s^2$: sample variance; and
- $s$: sample standard deviation.

**Why $n-1$ in the sample variance?** Once the sample mean is fitted, the deviations must add to zero, so only $n-1$ of them can vary freely. Dividing by $n-1$ also gives the conventional unbiased sample-variance estimator when observations are independent and identically distributed with finite variance. R's `sd()` uses this sample convention.

### A miniature calculation

Suppose three observations are 2, 4, and 6 hours. Then:

$$
\bar x=\frac{2+4+6}{3}=4,
\quad
s^2=\frac{(2-4)^2+(4-4)^2+(6-4)^2}{3-1}
=\frac{8}{2}=4,
\quad s=2.
$$

The mean is 4 hours; the sample standard deviation is 2 hours. Unlike variance, standard deviation is measured in the *same units* as the observations.

## A4. The normal distribution

A normal distribution is a smooth, symmetric, bell-shaped distribution. Its mathematical notation is

$$
X\sim N(\mu,\sigma^2).
$$

Read $\sim$ as “is distributed as.” The second entry is the **variance**, not the standard deviation. For instance, $N(10,4)$ has mean 10 and standard deviation $\sqrt4=2$.

The mathematical density is

$$
f(x)=\frac{1}{\sigma\sqrt{2\pi}}
\exp\!\left[-\frac{(x-\mu)^2}{2\sigma^2}\right],\qquad \sigma>0.
$$

You do **not** have to memorize how this formula was invented to understand normality diagnostics. What matters is that the curve is determined by its center and spread; the two sides are mirror images, and extreme observations become increasingly rare as we move away from the mean.

The notation $\exp(a)$ means $e^a$, with $e\approx2.71828$; $\pi\approx3.14159$. Squared terms keep distances from the center nonnegative.

A **standard normal** random variable is $Z\sim N(0,1)$, with mean 0 and variance 1. Any exactly normal variable can be standardized as

$$
Z=\frac{X-\mu}{\sigma}.
$$

Subtracting the mean recenters the variable at zero; dividing by the standard deviation puts values on a common scale. If $X=14$, $\mu=10$, and $\sigma=2$, then $Z=(14-10)/2=2$. That means 14 lies two standard deviations above the mean.

For a normal population, roughly 68% of observations are within one standard deviation of the mean, 95% within two, and 99.7% within three. These are approximate descriptions, **not** guarantees for a particular small sample.

### Normal versus skewed

A right-skewed distribution has a longer or more extreme tail to the right. Snow-removal time may be right-skewed when most jobs finish fairly quickly but a few require many extra hours. A left-skewed distribution has the corresponding longer tail to the left. Skewness concerns asymmetry, whereas **kurtosis** concerns aspects of tail heaviness and the fourth-power pattern of deviations.

A distribution can be unimodal (one main peak), bimodal (two concentrations), symmetric but non-normal, or skewed. Normality is more specific than mere symmetry.

## A5. Population versus sample and why uncertainty matters

A sample of 10 stock-market returns or 25 storms is limited evidence about a probability model. A sample histogram or Q-Q plot can appear slightly uneven by chance, even if the population is perfectly normal. Conversely, a small sample from a non-normal population can accidentally look bell-shaped.

That is why we combine **visual diagnostics** with **formal tests**, while reporting their limitations. A normality check is primarily a check of whether a normal model is a reasonable approximation for a particular analysis. It is not a judgment that the physical world “obeys” a perfect bell curve.

There is also an important distinction between **normality of the raw measurements** and **normality of a statistic such as the sample mean**. The central limit theorem can make an average approximately normal for sufficiently large independent samples under suitable conditions, even when individual observations are not normal. It does not mean the underlying observations magically become normal.

## A6. Two-variable relationships: covariance and correlation

Suppose $X_1$ measures storm duration and $X_2$ measures clearing effort. They may increase together. A **scatter plot** reveals this: each point is one pair $(x_{i1},x_{i2})$, with duration on the horizontal axis and clearing time on the vertical axis.

The sample covariance is

$$
s_{12}=\frac{1}{n-1}\sum_{i=1}^{n}(x_{i1}-\bar x_1)(x_{i2}-\bar x_2).
$$

A positive covariance means values above their respective means often occur together and values below their means often occur together. A negative covariance suggests they tend to move in opposite directions. Its magnitude depends on units.

Correlation removes those units:

$$
r_{12}=\frac{s_{12}}{s_1s_2},\qquad -1\le r_{12}\le1.
$$

A positive $r$ indicates a positive *linear* relationship, a negative value indicates a negative linear relationship, and a value near zero indicates little linear association. **A correlation of zero does not mean “no relationship of any kind,” and correlation does not demonstrate causation.**

For two variables, the sample covariance matrix is

$$
\mathbf S=
\begin{bmatrix}
 s_1^2&s_{12}\\
 s_{12}&s_2^2
\end{bmatrix}.
$$

The diagonal entries are variances; off-diagonal entries describe co-movement. The population equivalent is denoted $\boldsymbol\Sigma$ (capital sigma). A covariance matrix must be symmetric, and a valid non-degenerate bivariate covariance matrix has a positive determinant.

## A7. Bivariate normality is stronger than two separate normality checks

A **bivariate normal distribution** models two variables *jointly* as a particular kind of elliptical cloud. Its notation is

$$
\mathbf X=\begin{bmatrix}X_1\\X_2\end{bmatrix}
\sim N_2(\boldsymbol\mu,\boldsymbol\Sigma),
\quad
\boldsymbol\mu=\begin{bmatrix}\mu_1\\\mu_2\end{bmatrix},
\quad
\boldsymbol\Sigma=\begin{bmatrix}
\sigma_1^2&\rho\sigma_1\sigma_2\\
\rho\sigma_1\sigma_2&\sigma_2^2
\end{bmatrix}.
$$

$N_2$ means a two-dimensional normal distribution. $\rho$ is the *population* correlation. A valid non-degenerate version has $\sigma_1,\sigma_2>0$ and $|\rho|<1$.

The mathematical joint density is

$$
f(x_1,x_2)=
\frac{1}{2\pi\sigma_1\sigma_2\sqrt{1-\rho^2}}
\exp\!\left\{
-\frac{1}{2(1-\rho^2)}
\left[
\frac{(x_1-\mu_1)^2}{\sigma_1^2}
-\frac{2\rho(x_1-\mu_1)(x_2-\mu_2)}{\sigma_1\sigma_2}
+\frac{(x_2-\mu_2)^2}{\sigma_2^2}
\right]
\right\}.
$$

There is no need to hand-evaluate this density for PQ4, but note what it tells us: **both means, both variances and their correlation affect the joint cloud**. When $\rho=0$ and the distribution is truly jointly normal, the variables are independent. That special conclusion does not automatically apply to arbitrary non-normal data.

A bivariate normal model implies each marginal distribution is normal. **The reverse is false**: two separately normal-looking variables need not be jointly normal. For an illustrative counterexample, let $Z$ be standard normal, and independently let $A$ be equally likely to be $-1$ or $+1$. Define $X_1=Z$ and $X_2=AZ$. Each variable has a normal marginal distribution, but all joint observations lie on either $x_2=x_1$ or $x_2=-x_1$. That cross-shaped joint pattern is *not* an ordinary non-degenerate bivariate normal cloud.

Therefore, Question 2(d) cannot be answered merely by saying “both individual Shapiro tests now have large $p$-values.” We must examine the **pairing and joint geometry** as well.

---

# Module B. Understanding Q-Q plots and tests

## B1. Why do we need a diagnostic?

A statistical model is an assumption about possible observations. To decide whether a normal model is plausible, we ask:

1. What would numbers tend to look like if the model were normal?
2. What do the observed numbers actually look like?
3. Are any differences large or systematic enough to worry us?

Two complementary tools are a **normal Q-Q plot** and a **test of normality**.

## B2. What is a quantile?

A *quantile* is a threshold defining a given percentage of a distribution. For example, the median is the 50th percentile: about half the observations are below it and half above it. The 25th percentile is the lower quartile, and the 75th is the upper quartile.

For the standard normal distribution, its $p$th quantile is written $\Phi^{-1}(p)$, or `qnorm(p)` in R. The notation $\Phi^{-1}$ is the **inverse cumulative distribution function**: it turns a probability into the corresponding standard-normal cutoff.

Examples:

| Probability $p$ | $\Phi^{-1}(p)$, approximately | Meaning |
|---:|---:|---|
| 0.025 | $-1.960$ | 2.5% of a normal distribution is below this point |
| 0.25 | $-0.674$ | Lower quartile |
| 0.50 | $0$ | Median |
| 0.75 | $0.674$ | Upper quartile |
| 0.975 | $1.960$ | 97.5% below this point |

## B3. How does a normal Q-Q plot work?

**Q-Q** means **quantile-quantile**: it compares quantiles of your data with quantiles predicted by a reference distribution.

Suppose you have five values $2,3,4,5,6$. First **sort** the observations from smallest to largest. R then assigns each ordered value a plotting probability, converts that probability to a theoretical normal quantile, and plots the actual ordered value against that theoretical quantile.

The horizontal axis of R's `qqnorm()` is the **theoretical normal quantile**. Its vertical axis is the **actual ordered sample value**.

If the observed distribution is approximately normal, the dots tend to follow a **straight ascending line**. The line need not pass through the origin or have a slope of 1; a normal variable with mean 50 and standard deviation 10 has an approximately straight line with a different intercept and slope.

### What do common patterns mean?

| Visual appearance | Potential interpretation | What not to conclude |
|---|---|---|
| Points approximately straight | Normal model may be reasonable | “Normality is proven.” |
| Systematic bend or S-shaped pattern | Possible skewness, unusual tails, or departures from a single normal shape | Every tiny bend is significant. |
| Extreme endpoint far from line | Possible outlier or heavy tail | The observation is certainly an error. |
| Several repeated values making steps | Ties or rounding, sometimes non-normality | Ties alone prove non-normality. |
| One big gap between groups | Potential clustering or mixture | Two distinct populations are established. |

Small samples naturally produce irregular plots. In Question 1 there are only ten observations, so the plot should be interpreted cautiously.

## B4. The mathematical construction of Q-Q positions

Denote the sorted observations by

$$
x_{(1)}\le x_{(2)}\le\cdots\le x_{(n)}.
$$

The parentheses around $(i)$ mean **rank/order position**, not the original chronological position. A common plotting approximation is

$$
p_i\approx\frac{i-0.5}{n},\qquad
q_i=\Phi^{-1}(p_i),
$$

where $q_i$ is the theoretical quantile. R's `qqnorm()` uses R's `ppoints(n)` convention, which is slightly different for samples of size $n\le10$:

$$
p_i=\frac{i-0.375}{n+0.25}\quad(n\le10),
\qquad
p_i=\frac{i-0.5}{n}\quad(n>10).
$$

Neither convention changes the fundamental interpretation. For $n=10$, the smallest point has $p_1=(1-0.375)/10.25\approx0.0610$ and theoretical normal quantile about $-1.547$.

## B5. What does `qqline()` add?

`qqline(x)` draws a straight reference line through selected theoretical and sample quantiles, using quartiles by default. It helps us judge whether the observed pattern is approximately straight. It is **not a fitted proof of normality**. It is also not the same thing as `abline(0,1)`: the latter line is a 45-degree identity line that only makes sense in comparable standardized units.

A normal Q-Q plot is a diagnostic for a **single** variable. For multivariate normality, we need additional methods such as a scatter plot of the transformed pair and a Q-Q plot of squared Mahalanobis distances.

## B6. What is hypothesis testing?

A **hypothesis** is a claim we check against sample evidence. A normality test typically compares:

$$
H_0:\text{the observations come from a normal distribution},
$$

$$
H_1:\text{the observations do not come from a normal distribution}.
$$

$H_0$ is the **null hypothesis** and $H_1$ is the **alternative hypothesis**. A test computes a statistic and a **$p$-value**.

A $p$-value is the probability, *assuming the null model and its relevant assumptions hold*, of obtaining a test statistic as extreme as or more extreme than the one observed. It is **not** the probability that the null hypothesis is true and is not the probability that the data are normal.

The **significance level**, $\alpha$ (alpha), is the threshold chosen *before* the test:

$$
\boxed{\ p\le\alpha\ \Longrightarrow\ \text{reject }H_0\ },
\qquad
\boxed{\ p>\alpha\ \Longrightarrow\ \text{fail to reject }H_0\ }.
$$

“Fail to reject” means **insufficient evidence of a departure**, not “accept normality as proven.”

### A numerical example

Suppose a normality test returns $p=0.07$.

- At $\alpha=0.05$, $0.07>0.05$, so we fail to reject normality.
- At $\alpha=0.10$, $0.07<0.10$, so we reject normality.

A more permissive threshold ($0.10$ instead of $0.05$) makes it easier to detect potential departures but increases the probability of a **false rejection** when $H_0$ is true. This is a **Type I error**. A **Type II error** is failing to reject $H_0$ even though it is false. Small datasets often have low power to detect subtle departures.

## B7. The Shapiro–Wilk test

For univariate data, R has a built-in Shapiro–Wilk normality test:

```r
shapiro.test(x)
```

It reports a statistic $W$ and a $p$-value. Conceptually, $W$ compares how closely the ordered observations match the pattern expected from normal order statistics:

$$
W=\frac{\left(\sum_{i=1}^{n}a_i x_{(i)}\right)^2}
{\sum_{i=1}^{n}(x_i-\bar x)^2}.
$$

Here $a_i$ are specially constructed weights, based on the expected values and covariance structure of ordered observations from a normal distribution. They are **not simply** $1/n$ or the Q-Q plotting probabilities. The denominator measures total observed spread. Values of $W$ closer to 1 often indicate a more normal-looking ordered pattern; however, a numerical cutoff for $W$ must be assessed using its appropriate reference distribution and sample size. **Use the reported $p$-value**, not an invented universal rule like “$W>0.9$ means normal.”

The Shapiro–Wilk test checks **one variable at a time**; it is not a test of bivariate normality. The basic `shapiro.test()` function in R accepts between 3 and 5000 non-missing observations, and its calculation assumes the observations have the relevant random-sampling/independence properties. Normality tests in time series need extra care because dependence can invalidate ordinary calibration.

## B8. What is an outlier?

An **outlier** is a measurement that lies unusually far from the typical pattern. It can be:

- a legitimate but rare event;
- a recording or unit-conversion error;
- an incident from a different physical process;
- or unusual **only when its variables are considered together**.

For example, a storm lasting 3.5 hours with 26.1 hours of clearing effort may not be the largest observation on either variable, but it could look strange relative to the typical relationship between storm duration and effort. That is a **joint** or multivariate anomaly.

A simple univariate screen is the **interquartile range**:

$$
IQR=Q_3-Q_1.
$$

Tukey's conventional exploratory fences are

$$
Q_1-1.5IQR\quad\text{and}\quad Q_3+1.5IQR.
$$

Values outside these fences are **flags for examination**, not automatic deletions. An analyst should record whether a flagged observation was retained, corrected, or excluded, and why. Outliers can strongly affect both normality diagnostics and the transformation selected.

---

# Module C. Getting started with R

## C1. What are R and an R script?

**R** is a programming language designed for statistical computing and graphics. **RStudio** is a common editor/interface for running R, but R can also run in its own console. A script is a plain-text file containing R commands, which you can run repeatedly.

You do not need to understand programming theory first. The important starting ideas are:

- A **function** performs a task, for example `mean(x)` calculates a mean.
- The **parentheses** hold arguments (the information sent to the function).
- `<-` means **assign this value to a name**. For example, `x <- 5` stores 5 under `x`.
- `c()` combines values into a vector.
- `#` begins a comment; R ignores the rest of that line.
- `TRUE` and `FALSE` are logical values; `NA` represents missing data.
- R is case-sensitive: `Duration`, `duration`, and `DURATION` are different names.

Try this minimal session:

```r
x <- c(2, 4, 6)   # Make a vector of three numbers
length(x)        # Count the elements: 3
mean(x)          # Average: 4
var(x)           # Sample variance: 4
sd(x)            # Sample standard deviation: 2
sort(x)          # Smallest to largest: 2, 4, 6
```

In the console, the `>` character is often a **prompt**. Do not type that prompt as part of your code. Result lines often start with `[1]`; this is the position of the first displayed item, not a new observation.

## C2. Basic normal-distribution commands

```r
pnorm(1.96)       # Probability P(Z <= 1.96), about 0.975
qnorm(0.975)      # Normal cutoff for 97.5%, about 1.96
rnorm(5)          # Make five random normal numbers (they change each run)
set.seed(123)     # Make subsequent random simulations reproducible
```

Here `pnorm()` goes from a **value to a probability**, while `qnorm()` goes from a **probability to a value**. `rnorm()` generates simulated observations; simulated numbers must never be substituted for the real worksheet data.

## C3. Drawing a Q-Q plot and checking normality

```r
example <- c(2, 4, 6, 7, 9, 11, 12, 15)
qqnorm(example, main = "A simple normal Q-Q plot")
qqline(example, col = "red", lwd = 2)
shapiro.test(example)
```

- `qqnorm(example)` plots actual ordered values against normal theoretical quantiles.
- `main =` supplies the plot title.
- `qqline(example, ...)` adds the quartile reference line.
- `col = "red"` makes that line red; color is purely cosmetic.
- `lwd = 2` makes the line thicker.
- `shapiro.test(example)` reports the Shapiro–Wilk $W$ and $p$-value.

A plot normally appears in RStudio's **Plots** pane (or an R graphics window). Running code is not the same as printing a picture as text in the console.

## C4. Loading the actual `.DAT` file

The uploaded dataset is named `T3-2(1).DAT`, whereas the source question calls it `T3-2.dat`. Both refer to the same requested Wisconsin data. Its rows contain **two whitespace-separated numeric columns and no header row**. Therefore, use `header = FALSE`.

**Beginner-friendly method: choose the file interactively.**

```r
file_path <- file.choose()
# Choose the uploaded T3-2(1).DAT file in the dialog.

snow <- read.table(
  file = file_path,
  header = FALSE,
  col.names = c("Duration", "Removal")
)

head(snow)          # Display the first six incidents
str(snow)           # Show structure and numeric column types
nrow(snow)          # Should be 25
ncol(snow)          # Should be 2
summary(snow)       # Min, quartiles, median, mean, max
stopifnot(nrow(snow) == 25, ncol(snow) == 2)
stopifnot(all(complete.cases(snow)))
stopifnot(all(snow$Duration > 0), all(snow$Removal > 0))
```

**What every important line means**

- `file.choose()` opens a file-selection window, so you do not need to guess a Windows folder path.
- `read.table()` imports a plain-text numeric table.
- `header = FALSE` means the file does not contain printed column names.
- `col.names = c("Duration", "Removal")` gives the two columns readable names.
- `snow <-` stores the imported table under the name `snow`.
- `head(snow)` previews the beginning so you can check the import.
- `str(snow)` shows whether R understood the two columns as numbers.
- `nrow()` and `ncol()` count the table's rows and columns.
- `complete.cases()` checks whether a row has any `NA` missing values.
- `stopifnot()` halts the script if an assumed condition is not met. This prevents you from accidentally analyzing an incomplete or wrong file.
- `snow$Duration` means “the `Duration` column inside the object called `snow`.”

You can instead type a known full path. On Windows, prefer **forward slashes** inside the quoted string, for example `"D:/my-folder/T3-2(1).DAT"`. The example folder name is illustrative, not a claim about your machine.

**Common import mistakes:** If you set `header = TRUE`, the first storm may be incorrectly used as column headings and you may end up with only 24 observations. If your column order is reversed, every downstream interpretation will be incorrect. Confirm that the first row is `(12.5, 13.7)` and the final row is `(13.0, 25.6)`.

---
# Question 1. Stock returns and normality

## Original Question 1 (verbatim numerical content and tasks, page 1)

> Consider the annual rates of return (including dividends) on the Dow-Jones industrial average for the years 1996-2005. These data, multiplied by 100, are
>
> $-0.6,\ 3.1,\ 25.3,\ -16.8,\ -7.1,\ -6.2,\ 16.1,\ 25.2,\ 22.6,\ 26.0$
>
> Use these 10 observations to complete the following.
>
> **(a)** Construct a Q-Q plot. Do the data seem to be normally distributed? Explain.
>
> **(b)** Carry out a test of normality. Set the significance level at $\alpha = 0.10$. Do the results of the test corroborate the results in (a)?

**Source-answer status:** The source worksheet has no printed solution for Question 1. Everything below is independently explained and calculated from its ten numbers.

## Q1.1. First understand the real-world situation

A **rate of return** describes how much the investment value changed over a period relative to its starting value, while including dividends as specified. The question already provides ten annual return measurements, expressed after multiplication by 100. These are return figures in percentage-style units; we do **not** multiply them by 100 again.

A negative figure means a negative return for that year, while a positive figure means a positive return. The worksheet names the ten-year period 1996–2005, but **does not explicitly label each printed value with its individual year**. We therefore preserve their printed order without asserting a particular year-to-value mapping. This is a small collection of annual, potentially time-dependent observations, not necessarily an independent random sample. Using an ordinary Shapiro–Wilk test implicitly treats the observations as having the sampling properties required for that test; serial dependence or changing economic regimes can complicate the statistical interpretation.

The word **normality** here asks about the distribution of *annual return values*. It does not ask whether the stock market always performs normally, whether the mean return is significantly positive, or whether we can forecast next year's return.

## Q1.2. Organize the original observations

| Position in printed sequence | Annual return, multiplied by 100 |
|---|---:|
| 1 | $-0.6$ |
| 2 | $3.1$ |
| 3 | $25.3$ |
| 4 | $-16.8$ |
| 5 | $-7.1$ |
| 6 | $-6.2$ |
| 7 | $16.1$ |
| 8 | $25.2$ |
| 9 | $22.6$ |
| 10 | $26.0$ |

The left-hand numbers are **sequence positions**, not invented calendar-year assignments. The analysis uses the **ten numerical returns** exactly as supplied. We should not insert stock prices, market-index levels, or data for other years.

### Step 1: Calculate the center by hand

$$
\bar x=\frac{-0.6+3.1+25.3-16.8-7.1-6.2+16.1+25.2+22.6+26.0}{10}.
$$

The sum is $87.6$, so

$$
\boxed{\bar x=8.76.}
$$

This is the ordinary arithmetic average of the ten stated annual return figures. It is **not** the annualized compound growth rate of a portfolio. Compounding would require a different calculation.

The sample standard deviation is approximately

$$
\boxed{s=16.1065.}
$$

It comes from the sample-variance formula with denominator $10-1=9$. The fairly large standard deviation, relative to the mean, shows that yearly returns vary considerably.

### Step 2: Sort the observations

A Q-Q plot uses **ranked values**, not chronological order:

$$
\boxed{-16.8,\ -7.1,\ -6.2,\ -0.6,\ 3.1,\ 16.1,\ 22.6,\ 25.2,\ 25.3,\ 26.0.}
$$

Look for a large gap: the fifth smallest number is $3.1$, but the sixth is $16.1$, a jump of $13.0$. At the high end, $25.2$, $25.3$, and $26.0$ are close together. Those patterns may produce departures from a perfectly straight Q-Q line, though we should not claim a true multimodal population from just ten observations.

## Question 1(a). Construct a Q-Q plot and interpret it

### Step 3: See how theoretical quantiles are paired with the data

For $n=10$, the standard R plotting positions are approximately

$$
p_i=\frac{i-0.375}{10.25}.
$$

For example, for the smallest observation,

$$
p_1=\frac{0.625}{10.25}\approx0.06098,
\quad q_1=\Phi^{-1}(0.06098)\approx-1.547.
$$

That point on a normal Q-Q plot is approximately $(-1.547,-16.8)$: horizontal coordinate is the theoretical quantile and vertical coordinate is the smallest actual return.

| Rank $i$ | Sorted return $x_{(i)}$ | Theoretical $N(0,1)$ quantile $q_i$, approximate |
|---:|---:|---:|
| 1 | $-16.8$ | $-1.547$ |
| 2 | $-7.1$ | $-1.000$ |
| 3 | $-6.2$ | $-0.655$ |
| 4 | $-0.6$ | $-0.375$ |
| 5 | $3.1$ | $-0.123$ |
| 6 | $16.1$ | $0.123$ |
| 7 | $22.6$ | $0.375$ |
| 8 | $25.2$ | $0.655$ |
| 9 | $25.3$ | $1.000$ |
| 10 | $26.0$ | $1.547$ |

The table illustrates the mechanics. **You do not ordinarily calculate all ten theoretical quantiles by hand**; `qqnorm()` automates this procedure.

### Step 4: Run the R code

```r
# Exactly the ten return measurements printed in Question 1
returns <- c(-0.6, 3.1, 25.3, -16.8, -7.1,
             -6.2, 16.1, 25.2, 22.6, 26.0)

length(returns)    # Expect 10
sum(returns)       # Expect 87.6
mean(returns)      # Expect 8.76
sd(returns)        # Expect about 16.1065
sort(returns)      # Show the ordered observations

qqnorm(returns,
       main = "Question 1: normal Q-Q plot of annual returns",
       xlab = "Theoretical normal quantiles",
       ylab = "Observed return (multiplied by 100)",
       pch = 19)
qqline(returns, col = "red", lwd = 2)
```

**Explain every new element:**

- `returns <- c(...)` stores the real values in their printed order.
- `length()` checks the sample size.
- `sum()` adds the numbers, `mean()` divides by ten, and `sd()` calculates sample spread.
- `sort()` shows the ranking that will be used on the Q-Q plot.
- `xlab =` and `ylab =` set descriptive axis labels.
- `pch = 19` draws solid circles, so points are easier to see.
- `qqline()` gives a visual reference for the shape expected under approximate normality.

### Step 5: Describe the observed pattern correctly

The ranked data have noticeable gaps and concentrations: particularly the jump from $3.1$ to $16.1$ and the closely grouped values above $22$. The Q-Q plot therefore need not form a perfect straight line and may show **some curvature or irregularity**. Still, there are only ten observations, and imperfect visual alignment is expected even for genuine normal samples. No single point is enough to declare non-normality without further assessment.

**Careful answer for Q1(a):** The normal Q-Q plot shows some irregularity rather than ideal straight-line behavior, so normality is not visually established with confidence. On such a small dataset, however, the deviations are not by themselves decisive evidence that the distribution is non-normal. A formal test helps quantify the evidence.

This is a deliberately cautious conclusion: saying “the data definitely are normal” or “the data definitely are not normal” would be stronger than the observed evidence supports.

## Question 1(b). Perform a normality test at $\alpha=0.10$

### Step 1: State the hypotheses

$$
H_0:\ \text{The distribution of the annual-return observations is normal.}
$$

$$
H_1:\ \text{The distribution of the annual-return observations is not normal.}
$$

The question explicitly sets $\alpha=0.10$, meaning that we regard $p\le0.10$ as sufficient statistical evidence to reject the null under the test model.

### Step 2: Run the test in R

```r
shapiro.test(returns)
```

From the supplied numbers, the independently computed Shapiro–Wilk results are approximately:

| Result | Value |
|---|---:|
| Number of observations | $10$ |
| Shapiro–Wilk statistic $W$ | $0.87947$ |
| $p$-value | $0.12867$ |
| Specified significance level $\alpha$ | $0.10$ |

A typical R printout will have the labels `Shapiro-Wilk normality test`, `W = ...`, and `p-value = ...`. The digits of the numerical values are rounded here; check your own output rather than copying a screenshot.

### Step 3: Make the decision **numerically**

We compare

$$
p\approx0.12867\qquad\text{with}\qquad\alpha=0.10.
$$

Because

$$
0.12867>0.10,
$$

we **fail to reject** the null hypothesis at the 10% significance level.

### Step 4: Translate the finding into ordinary language

The sample does **not** provide sufficiently strong evidence, under the Shapiro–Wilk test at the required 10% threshold, to conclude that the ten returns come from a non-normal population.

Notice the precision of this wording:

- **Correct:** “We did not detect a statistically significant departure from normality at $\alpha=0.10$.”
- **Incorrect:** “The returns are certainly normal.”
- **Incorrect:** “The probability the returns are normal is 12.867%.”
- **Incorrect:** “A $p$-value of 0.12867 means a 12.867% probability that we have made an error.”

### Step 5: Compare with the Q-Q plot

The Q-Q plot gives a cautious impression of possible irregularity but not an unequivocal contradiction of normality. The formal Shapiro–Wilk result is also not statistically significant at 10%. **The two assessments are broadly compatible:** neither provides decisive evidence to reject a normal model, while the small sample size limits confidence.

If you personally regard the Q-Q plot as meaningfully non-straight, say so and explicitly explain that the formal test did not reach its threshold. Visual impressions and test decisions are distinct pieces of evidence, and they need not always agree.

### Additional learning: Why the answer is not a financial forecast

Normality is a claim about the *distribution* of annual returns. It does not measure whether returns are profitable, whether the mean is different from zero, whether risks are appropriately priced, or whether future returns can be predicted. Ten consecutive annual returns may also be correlated or nonstationary, making strong population conclusions particularly risky. The worksheet's testing exercise does not resolve those issues.

### Final exam-ready answer to Question 1

**(a)** Construct the normal Q-Q plot using `qqnorm(returns)` and `qqline(returns)`. Some departures from a straight-line pattern may appear because the sample is small and its returns are clustered, but the visual evidence is not decisive.

**(b)** Shapiro–Wilk gives $W\approx0.87947$ and $p\approx0.12867$. Since $0.12867>0.10$, fail to reject $H_0$. There is insufficient evidence at the 10% level to say the returns are non-normal. This formal result is broadly consistent with the cautious visual judgment in (a), but it does not prove exact normality.

---

# Question 2. Wisconsin snow-removal data

## Original Question 2 (page 1)

> In northern climates, roads must be cleared of snow quickly following a storm. One measure of storm severity is $X_1=$ its duration in hours, while the effectiveness of snow removal can be quantified by $X_2=$ the number of hours crews, men, and machine, spend to clear snow. The data on snow removal for 25 incidents in Wisconsin, USA are given in the T3-2.dat file on Moodle.
>
> **(a)** Comment on any possible outliers in a scatter plot of the original variables.
>
> **(b)** Examine the marginal normality of the observations on $X_1$. If it is nonnormal, determine the power transformation $\hat\lambda_1$ that makes the $X_1$ values approximately normal. Construct a Q-Q plot of the transformed observations.
>
> **(c)** Examine the marginal normality of the observations on $X_2$. If it is nonnormal, determine the power transformation $\hat\lambda_2$ that makes the $X_2$ values approximately normal. Construct a Q-Q plot of the transformed observations.
>
> **(d)** Check for bivariate normality of the transformed observations from (b) and (c).

**Source-answer status:** No worked answers or transformation values are printed in the original `PQ4.pdf`. The supplied `T3-2(1).DAT` is available, so all subquestions can be evaluated with its actual data. Numerical results below are **independent computations**, not lecturer-supplied solutions.

## Q2.0. The real data, with every observation preserved

Each line of the `.DAT` file contains the duration $X_1$ followed by the removal time $X_2$ for the **same** event.

| Incident $i$ | $X_1$: duration, hours | $X_2$: removal time, hours |
|---:|---:|---:|
| 1 | 12.5 | 13.7 |
| 2 | 14.5 | 16.5 |
| 3 | 8.0 | 17.4 |
| 4 | 9.0 | 11.0 |
| 5 | 19.5 | 23.6 |
| 6 | 8.0 | 13.2 |
| 7 | 9.0 | 32.1 |
| 8 | 7.0 | 12.3 |
| 9 | 7.0 | 11.8 |
| 10 | 9.0 | 24.4 |
| 11 | 6.5 | 18.2 |
| 12 | 10.5 | 22.0 |
| 13 | 10.0 | 32.5 |
| 14 | 4.5 | 18.7 |
| 15 | 7.0 | 15.8 |
| 16 | 8.5 | 15.6 |
| 17 | 6.5 | 12.0 |
| 18 | 8.0 | 12.8 |
| 19 | 3.5 | 26.1 |
| 20 | 8.0 | 14.5 |
| 21 | 17.5 | 42.3 |
| 22 | 10.5 | 17.5 |
| 23 | 12.0 | 21.8 |
| 24 | 6.0 | 10.4 |
| 25 | 13.0 | 25.6 |

### Validate the table in R

Once you have executed the import section in Module C:

```r
nrow(snow)               # 25 incidents
head(snow, 3)            # First three paired measurements
tail(snow, 3)            # Last three paired measurements
snow[5, ]               # Event 5: duration 19.5, removal 23.6
snow[19, ]              # Event 19: duration 3.5, removal 26.1
snow[21, ]              # Event 21: duration 17.5, removal 42.3

x1 <- snow$Duration      # Work with just the first variable
x2 <- snow$Removal       # Work with just the second variable
n <- length(x1)          # Number of paired observations
```

The bracket notation `snow[19, ]` means “select the 19th row and **all** its columns.” A comma separates row selection from column selection. The `$` notation extracts an entire named column.

### First descriptive calculations

From the 25 actual rows:

| Quantity | Storm duration $X_1$ | Removal time $X_2$ |
|---|---:|---:|
| Sample size | 25 | 25 |
| Mean | $9.420$ | $19.272$ |
| Median | $8.500$ | $17.400$ |
| Sample SD | $3.7602$ | $7.8892$ |
| Sample variance | $14.1392$ | $62.2388$ |
| Minimum | $3.5$ | $10.4$ |
| Maximum | $19.5$ | $42.3$ |
| First quartile $Q_1$ | $7.0$ | $13.2$ |
| Third quartile $Q_3$ | $10.5$ | $23.6$ |

The means exceed the medians for both variables. This can suggest **right-skewness** and is a useful clue to investigate; it is not by itself a formal proof of skewness or non-normality.

The sample covariance matrix and correlation are approximately

$$
\mathbf S=\begin{bmatrix}
14.1392&13.4727\\
13.4727&62.2388
\end{bmatrix},
\qquad r_{12}=0.4542.
$$

That correlation indicates a moderately positive *linear association* in this sample. It does not guarantee that a longer storm causes extra clearing hours. Other variables, such as road area, equipment, snow depth, traffic conditions and crew capacity, could affect the relationship.

**Reproduce the summary in R:**

```r
colMeans(snow)     # Means of both numeric columns
apply(snow, 2, sd) # apply sd() to each column (the '2' means columns)
cov(snow)          # 2 x 2 sample covariance matrix
cor(snow)          # 2 x 2 sample correlation matrix
```

---

# Question 2(a). Scatter plots and outliers

## Q2(a)-1. What does the subquestion mean?

The word **scatter** means “place dots on a two-dimensional graph.” Every dot represents a particular storm. Place $X_1$ (duration) horizontally and $X_2$ (removal) vertically. Then ask whether some dots stand unusually far away from the main cloud or violate the overall relationship.

The question explicitly says **original variables**. Therefore, do this initial check **before taking logarithms, estimating power transformations or removing any observations**.

## Q2(a)-2. Create the actual scatter plot in R

```r
plot(x1, x2,
     main = "Q2(a): original Wisconsin snow-removal data",
     xlab = "Storm duration (hours)",
     ylab = "Snow-removal effort/time (hours)",
     pch = 19,
     col = "darkblue")

# Add a faint straight line only to help see the broad linear trend.
abline(lm(x2 ~ x1), col = "gray50", lwd = 2, lty = 2)

# Label the observations that deserve particular inspection.
text(x1[c(5, 7, 13, 19, 21)],
     x2[c(5, 7, 13, 19, 21)],
     labels = c(5, 7, 13, 19, 21),
     pos = 3, cex = 0.85)
```

### Understand every important command

- `plot(x1, x2)` places the paired $x_1$ and $x_2$ values on axes.
- `main =` specifies a title; `xlab` and `ylab` specify axis descriptions.
- `pch = 19` gives solid points; `col = "darkblue"` changes their color.
- `lm(x2 ~ x1)` fits a simple straight-line relationship for visual guidance; `~` can be read “as modeled using.” This is **supplementary** and is not a fitted normality test.
- `abline(...)` draws that estimated line; `lty = 2` makes it dashed.
- `c(5,7,13,19,21)` selects **row positions**, not their data values.
- `text(..., labels = ...)` places readable incident numbers by the selected dots.
- `pos = 3` places the labels above their dots, and `cex = 0.85` reduces their text size slightly.

The line is not required for the answer. Most importantly, it does **not** prove that the relationship is linear or the data are bivariate normal.

## Q2(a)-3. Identify plausible unusual observations

The data point at **incident 21**, $(17.5,42.3)$, has an unusually high removal value. Incident **5**, $(19.5,23.6)$, has the longest storm but less clearing effort than incident 21. Incident **19**, $(3.5,26.1)$, combines the *shortest* storm with a relatively high removal value. Incidents **7** $(9.0,32.1)$ and **13** $(10.0,32.5)$ also have comparatively high removal times for their durations.

These are **candidates for closer examination**, not proven mistakes. In particular:

| Incident | Coordinates $(X_1,X_2)$ | Why inspect it? |
|---:|---|---|
| 5 | $(19.5,23.6)$ | Longest storm duration; high on horizontal axis |
| 7 | $(9.0,32.1)$ | High clearing effort relative to a middling duration |
| 13 | $(10.0,32.5)$ | Another high clearing effort for a moderate storm |
| 19 | $(3.5,26.1)$ | Shortest storm but comparatively high removal effort; unusual joint combination |
| 21 | $(17.5,42.3)$ | Largest recorded clearing time and one of the longest storms |

The key concept is that **being extreme in one direction and being unusual relative to a relationship are different**. Incident 5 is extreme in $X_1$ but may be less surprising once its substantial duration is considered. Incident 19 may be *jointly* unusual even though its $X_2$ is not the maximum.

## Q2(a)-4. A numerical exploratory check using quartiles

For $X_1$, the sample quartiles are $Q_1=7.0$ and $Q_3=10.5$. Therefore

$$
IQR_1=10.5-7.0=3.5.
$$

The Tukey fences are

$$
\text{Lower}_1=7.0-1.5(3.5)=1.75,
$$

$$
\text{Upper}_1=10.5+1.5(3.5)=15.75.
$$

Thus the duration values $17.5$ (incident 21) and $19.5$ (incident 5) are flagged by this **univariate** rule.

For $X_2$, $Q_1=13.2$, $Q_3=23.6$, so

$$
IQR_2=23.6-13.2=10.4,
$$

$$
\text{Lower}_2=13.2-1.5(10.4)=-2.4,
\qquad
\text{Upper}_2=23.6+1.5(10.4)=39.2.
$$

Only removal time $42.3$ (incident 21) lies beyond that upper fence. This is a helpful reminder that incident 19, although visually unusual jointly, is **not** flagged by either one-variable IQR fence.

### Reproduce the fences and flag rows in R

```r
q_duration <- quantile(x1, probs = c(0.25, 0.75))
iqr_duration <- IQR(x1)
lo1 <- q_duration[1] - 1.5 * iqr_duration
hi1 <- q_duration[2] + 1.5 * iqr_duration

q_removal <- quantile(x2, probs = c(0.25, 0.75))
iqr_removal <- IQR(x2)
lo2 <- q_removal[1] - 1.5 * iqr_removal
hi2 <- q_removal[2] + 1.5 * iqr_removal

which(x1 < lo1 | x1 > hi1)  # Expected row positions: 5 and 21
which(x2 < lo2 | x2 > hi2)  # Expected row position: 21
```

- `quantile(..., probs = c(0.25, 0.75))` requests the 25th and 75th percentiles.
- `IQR()` subtracts them.
- `which()` returns **positions** where a logical condition is true.
- `|` means **OR** in R: flag a value below the lower fence or above the upper fence.

The numerical fences use R's default sample-quantile definition, which matches the quartiles reported earlier for these 25 observations. Alternative definitions can differ slightly on other samples.

## Q2(a)-5. Why should we not delete these points automatically?

Removing every unusual value can make a dataset appear artificially normal, understating genuine extreme conditions. If $42.3$ hours really occurred, it is evidence about severe or difficult events, not an inconvenience to discard. Only correct or exclude a record for a defensible reason, such as a documented entry error or a clearly different target population. If you explore a sensitivity analysis, report both the original and modified results.

An additional issue is **multiple inspection**: with 25 observations, inspecting enough dimensions, plots, and cutoffs will often yield some apparently unusual points even under a well-fitting model. Flags generate follow-up questions; they are not automatic hypothesis-test verdicts.

### Final exam-ready answer to Question 2(a)

The original scatter plot shows a generally positive relationship between storm duration and clearing time, with several potentially unusual observations. Incident 21 $(17.5,42.3)$ has the largest clearing time; incident 5 $(19.5,23.6)$ has the largest storm duration; and incident 19 $(3.5,26.1)$ is notable for high clearing time despite the shortest storm. Incidents 7 and 13 also show relatively high clearing times at moderate durations. By ordinary univariate $1.5\times IQR$ fences, incidents 5 and 21 are flagged for duration and incident 21 for removal time. These are **potential outliers requiring investigation**, not justified deletions.

---
# Module D. Power transformations explained before Questions 2(b) and 2(c)

## D1. Why transform a variable?

Suppose most snow-removal operations last between 10 and 25 hours, but a few take 35 or 40 hours. The right tail may be much longer than the left. Some statistical analyses work better when the distribution is closer to normal and the spread is more stable.

A **transformation** replaces each original value $x$ with a new value $T(x)$. It is like changing the ruler on which we measure the same observations. The aim is not to change the recorded event, only to express its measurement on another scale.

Common examples:

- $T(x)=\sqrt{x}$ compresses large values relative to small values;
- $T(x)=\log x$ compresses large values more strongly;
- $T(x)=x^{-1/2}$ changes the scale in another way, but it **reverses** ranking if used alone;
- $T(x)=x^2$ expands large positive values relative to small ones.

A successful transformation can make a skewed distribution more symmetric or stabilize variance. **It does not guarantee normality**, erase outliers, or make the original data unreliable. The transformation should be chosen and reported transparently.

In this worksheet, all 25 observations of both variables are **strictly positive**, so logarithmic and Box–Cox power transformations are mathematically available without adding artificial constants.

## D2. The Box–Cox family

The standard Box–Cox family is defined as

$$
\boxed{
T_\lambda(x)=
\begin{cases}
\displaystyle\frac{x^\lambda-1}{\lambda},&\lambda\neq0,\\[7pt]
\log(x),&\lambda=0,
\end{cases}
\quad x>0.
}
$$

Read this carefully:

- $x$ is one of the observed positive measurements;
- $\lambda$ (lambda) is a parameter controlling the **amount and direction of transformation**;
- $x^\lambda$ means “$x$ raised to the power $\lambda$”;
- $\log(x)$ is the **natural logarithm**, using base $e$;
- $T_\lambda(x)$ is the transformed value replacing $x$.

The special formula at $\lambda=0$ is not arbitrary. It is the continuous limit of the power expression:

$$
\lim_{\lambda\to0}\frac{x^\lambda-1}{\lambda}
=\log x.
$$

One intuitive explanation uses $x^\lambda=e^{\lambda\log x}$. For tiny $\lambda$, the exponential is approximately $1+\lambda\log x$, so

$$
\frac{x^\lambda-1}{\lambda}
\approx\frac{\lambda\log x}{\lambda}=\log x.
$$

### What different values of lambda mean

| $\lambda$ | Standard Box–Cox transformation | Intuitive behavior |
|---:|---|---|
| $2$ | $(x^2-1)/2$ | Strongly expands large positive values |
| $1$ | $x-1$ | Same shape as original data, just shifted by one |
| $1/2$ | $2(\sqrt x-1)$ | Square-root-style compression |
| $0$ | $\log x$ | Logarithmic compression |
| $-1/2$ | $2(1-x^{-1/2})$ | Stronger compression of upper values |
| $-1$ | $1-1/x$ | Reciprocal-style, with increasing transformed values |

**Why does $\lambda=1$ produce $x-1$ instead of $x$?** Subtracting a constant does not change the shape, spread, skewness, correlation with another variable, or a normality test's shape-based result. Box–Cox chooses this algebraic form so the family varies smoothly with $\lambda$.

### An important negative-power subtlety

For a negative $\lambda$, the simple raw power $x^\lambda$ is *decreasing*. But the **standard Box–Cox transform** $(x^\lambda-1)/\lambda$ is still increasing, because

$$
\frac{dT_\lambda(x)}{dx}=x^{\lambda-1}>0\quad\text{for }x>0.
$$

The derivative $dT/dx$ means the rate at which the transformed output changes as the original input changes. Since it is always positive, the Box–Cox transform preserves the ranking of observations. For Question 2(c), an estimated negative $\lambda_2$ must **not** be interpreted as saying that larger clearing times become “smaller events” under the actual Box–Cox formula.

## D3. Why estimate lambda instead of guessing?

A power parameter may be selected by comparing how close a transformed sample looks to a normal model. One standard method is **maximum likelihood**, which chooses the parameter with the largest likelihood of observing the actual data under a transformed-normal model.

Let the transformed observations be $z_i=T_\lambda(x_i)$. If we fit a normal distribution to $z_i$, its fitted mean is

$$
\bar z_\lambda=\frac1n\sum_{i=1}^nz_i.
$$

Its maximum-likelihood variance estimate is

$$
\hat\sigma_\lambda^2=
\frac1n\sum_{i=1}^n(z_i-\bar z_\lambda)^2.
$$

**Why $n$ here rather than $n-1$?** This is the likelihood estimate of the variance, not the usual unbiased sample variance. The two quantities serve different purposes.

Ignoring constants that do not depend on $\lambda$, the Box–Cox **profile log-likelihood** can be written as

$$
\boxed{
\ell(\lambda)
=-\frac n2\log\!\left[
\frac1n\sum_{i=1}^n(z_i-\bar z_\lambda)^2
\right]
+(\lambda-1)\sum_{i=1}^n\log x_i.
}
$$

The second term matters. It adjusts for the **change of scale**, mathematically called a *Jacobian*. Since $dT_\lambda(x)/dx=x^{\lambda-1}$, the combined log of all 25 derivatives is $(\lambda-1)\sum\log x_i$. Without this adjustment, a procedure could mistakenly favor some transformations simply because they shrink numerical spreads.

We want

$$
\boxed{\hat\lambda=\operatorname*{arg\,max}_{\lambda}\ell(\lambda).}
$$

“Arg max” means “the input value $\lambda$ at which the function is largest.” It is not asking for the maximum value of the likelihood itself.

The worksheet uses $\hat\lambda_1$ and $\hat\lambda_2$. The **hat** indicates these are estimates computed from a sample, not known physical constants. It is reasonable to use a convenient approximate value such as $0$ when $\hat\lambda$ is close to zero, provided you state what you did.

## D4. Reusable Box–Cox functions in base R

The following implementation requires **no additional R package**. First define a function that applies the transformation; then a second function that calculates its profile log-likelihood.

```r
boxcox_transform <- function(x, lambda) {
  stopifnot(is.numeric(x), all(is.finite(x)), all(x > 0))

  if (abs(lambda) < 1e-8) {
    return(log(x))
  }

  (x^lambda - 1) / lambda
}

boxcox_loglik <- function(x, lambda) {
  z <- boxcox_transform(x, lambda)
  n <- length(z)
  mle_variance <- mean((z - mean(z))^2)

  -n / 2 * log(mle_variance) +
    (lambda - 1) * sum(log(x))
}

estimate_lambda <- function(x) {
  fit <- optimize(
    f = function(lambda) boxcox_loglik(x, lambda),
    interval = c(-2, 2),
    maximum = TRUE
  )
  fit$maximum
}
```

### Explain the program line by line

- `function(x, lambda) { ... }` defines a reusable operation with two inputs.
- `is.numeric(x)` checks that the data are numeric; `is.finite(x)` rules out invalid numerical values.
- `all(x > 0)` enforces the standard Box–Cox requirement that each observation be positive.
- `abs(lambda) < 1e-8` means “lambda is extremely close to zero”; avoiding division by a tiny number gives a numerically stable logarithmic case.
- `return(log(x))` immediately returns the natural log values.
- `(x^lambda - 1) / lambda` implements the nonzero-lambda formula.
- `z <- ...` computes all transformed observations.
- `mean((z - mean(z))^2)` computes the likelihood variance estimate with denominator $n$.
- `-n / 2 * log(mle_variance)` is the varying normal-likelihood term.
- `(lambda - 1) * sum(log(x))` is the scale/Jacobian adjustment.
- `optimize()` searches for a high point of this one-dimensional function.
- `interval = c(-2, 2)` permits lambda between $-2$ and $2$; the actual fitted maxima for both worksheet variables lie inside this interval.
- `maximum = TRUE` tells R to **maximize** rather than minimize.
- `fit$maximum` extracts the estimated lambda from the optimization result.

This is essentially the profile-likelihood idea implemented by standard Box–Cox routines such as `MASS::boxcox()`; those routines may use a plotted grid and slightly different display conventions. Small discrepancies in quoted decimals do not change the substantive result.

### How to inspect the likelihood curve

```r
lambda_grid <- seq(-2, 2, by = 0.025)
profile1 <- sapply(lambda_grid, function(L) boxcox_loglik(x1, L))

plot(lambda_grid, profile1, type = "l",
     xlab = "Lambda", ylab = "Profile log-likelihood",
     main = "Box-Cox likelihood for storm duration")
abline(v = estimate_lambda(x1), col = "red", lwd = 2)
```

`seq(-2,2,by=0.025)` makes candidate values at regular intervals. `sapply()` evaluates the likelihood at each candidate. `type = "l"` draws a continuous line; `abline(v=...)` marks the selected lambda vertically. The red line should lie near the peak.

**A practical judgment:** A maximum-likelihood estimate is not a command to use exactly that many decimal places. A nearby simple power may be easier to explain, and several nearby powers can perform almost identically. Here we report the estimated values **and** simpler interpretable alternatives.

---

# Question 2(b). Normality of storm duration

## Q2(b)-1. Translate the question into simple language

The question asks: “Ignoring the clearing-time measurements for a moment, do the 25 storm durations look like they came from a normal distribution? If not, can we express those same durations on a new power scale so that their distribution looks more normal?”

**Marginal normality** means normality of $X_1$ by itself. It says nothing conclusive yet about the joint pairing of $X_1$ with $X_2$.

## Q2(b)-2. Examine the raw values

The 25 raw durations range from $3.5$ to $19.5$ hours. The mean is $9.42$ hours, and the median is $8.50$ hours. The upper tail contains $17.5$ and $19.5$, considerably beyond most of the data. This is a plausible reason to expect right-skewness.

### Plot before transforming

```r
hist(x1,
     main = "Storm duration: original values",
     xlab = "Duration (hours)",
     col = "gray85", border = "gray30")

qqnorm(x1, main = "Normal Q-Q: original duration")
qqline(x1, col = "red", lwd = 2)
```

`hist(x1)` creates a histogram using bins selected by R. A histogram's appearance can depend on bin widths, especially with only 25 observations. `qqnorm()` uses ordered observed values and theoretical quantiles, avoiding the need to choose bins.

### Conduct the marginal normality test

```r
shapiro.test(x1)
```

The independent calculation gives approximately

$$
\boxed{W_1=0.91701,\qquad p_1=0.04382.}
$$

At the illustrative level $\alpha=0.05$,

$$
0.04382<0.05,
$$

so we **reject** the univariate normality null for the original durations. The sample gives evidence of a departure from a normal distribution at the 5% level. The visual skewness and this formal result agree directionally.

**Do not confuse this $p_1$ with the first variable $X_1$:** the subscript merely identifies which Shapiro test is being discussed.

## Q2(b)-3. Estimate the power

Use the functions introduced in Module D:

```r
lambda1 <- estimate_lambda(x1)
lambda1
```

For the supplied 25 observations, the maximum-likelihood estimate is approximately

$$
\boxed{\hat\lambda_1\approx0.0545.}
$$

It is **near zero**. Since $T_0(x)=\log x$, a **log transformation is a natural simple practical choice**. The exact fitted transform with $\lambda=0.0545$ is very close in shape to the log-transformed observations, although the numerical scales differ.

### A complete numerical substitution

Take incident 1 with $x_1=12.5$ hours. Its fitted Box–Cox value is

$$
T_{0.0545}(12.5)
=\frac{12.5^{0.0545}-1}{0.0545}.
$$

We can compute the exponent via $12.5^{0.0545}=e^{0.0545\log(12.5)}$. Because $\log(12.5)\approx2.52573$,

$$
12.5^{0.0545}\approx e^{0.13765}\approx1.1475,
$$

so

$$
T_{0.0545}(12.5)\approx\frac{1.1475-1}{0.0545}\approx2.71.
$$

Using the unrounded optimum gives approximately **2.7078**. By comparison,

$$
T_0(12.5)=\log(12.5)\approx2.5257.
$$

Those transformed numbers are different, but the *relative pattern* of the transformed durations is very similar. You should not confuse a difference in their numerical values with an important difference in normality performance.

## Q2(b)-4. Transform every observation and repeat the Q-Q check

```r
x1_transformed <- boxcox_transform(x1, lambda1)

head(x1_transformed)  # First six transformed durations
summary(x1_transformed)

qqnorm(x1_transformed,
       main = "Normal Q-Q: transformed storm duration")
qqline(x1_transformed, col = "red", lwd = 2)

shapiro.test(x1_transformed)
```

From the actual data, the approximate Shapiro–Wilk results on the fitted transformed values are

$$
\boxed{W_{1,T}\approx0.97830,\qquad p_{1,T}\approx0.84944.}
$$

Compared with the original $W_1\approx0.91701$ and $p_1\approx0.04382$, the transformed sample displays a markedly more normal-looking shape. Its Q-Q plot should follow the reference line much more closely. The large post-transformation $p$-value is **compatible with normality**, not proof of it.

### Prefer a simpler log scale? Compare both

```r
x1_log <- log(x1)    # Equivalent to Box-Cox lambda = 0

shapiro.test(x1_log)

oldpar <- par(no.readonly = TRUE)
par(mfrow = c(1, 3))

qqnorm(x1, main = "Raw duration")
qqline(x1, col = "red")

qqnorm(x1_log, main = "Log duration")
qqline(x1_log, col = "red")

qqnorm(x1_transformed, main = "Fitted Box-Cox duration")
qqline(x1_transformed, col = "red")

par(oldpar)
```

- `log(x1)` takes natural logs of the durations.
- `par(mfrow = c(1,3))` divides the graphics area into one row of three plots.
- `oldpar <- par(no.readonly = TRUE)` saves previous graphics settings so they can be restored with `par(oldpar)`.
- `shapiro.test(x1_log)` gives approximately $W\approx0.97795$, $p\approx0.84159$, almost the same normality improvement as the fitted transformation.

### Why are the repeated observations important?

The raw duration data include repeated values such as 7, 8, and 9 hours. A monotone power transform preserves those ties. A Q-Q plot may therefore retain short horizontal segments or duplicate plotted heights. **Ties do not automatically invalidate all analysis**, although they can influence how smooth a plot looks and how well a continuous theoretical model approximates the data.

## Q2(b)-5. Interpret the transformed measurements

The transformed values are no longer “storm hours” in a straightforward additive sense. For example, the distance between transformed durations of 8 and 16 hours is **not** 8 hours. The transformed data are an analytic scale used for model checking or modeling.

A log transform means changes on a multiplicative scale are more natural than absolute hour changes. For instance,

$$
\log(16)-\log(8)=\log(2)\approx0.6931.
$$

Doubling from 8 to 16 hours makes the same log-scale difference as doubling from 4 to 8 hours. That is one way a logarithm can compress a long right tail.

A transformed variable can be useful even when the raw variable itself is not normally distributed. However, if you interpret regression coefficients or confidence intervals on the transformed scale in later work, take care when converting them back to original units.

### Final exam-ready answer to Question 2(b)

The original $X_1$ durations show right-tail departures from a normal pattern. A Shapiro–Wilk test gives $W\approx0.9170$, $p\approx0.0438$, rejecting normality at an illustrative 5% level. A Box–Cox profile-likelihood fit gives $\hat\lambda_1\approx0.0545$, suggesting a nearly logarithmic transformation. The transformed sample's Q-Q plot is substantially more linear, with Shapiro–Wilk $W\approx0.9783$ and $p\approx0.8494$. This supports using the transformed durations as an *approximately* normal marginal variable, while recognizing that selection and testing were performed on the same sample.

---

# Question 2(c). Normality of removal time

## Q2(c)-1. Understand what is being tested

Now repeat the previous logic for $X_2$, the **second** variable. The steps are identical in purpose, but the estimated transformation can be different. There is no mathematical requirement that both variables share one lambda.

The clearing times range from $10.4$ to $42.3$ hours, with mean $19.272$ and median $17.4$. Values of $32.1$, $32.5$, and $42.3$ form a long upper tail. Therefore, right-skewness is plausible before looking at a test.

## Q2(c)-2. Examine the original normality

```r
hist(x2,
     main = "Removal time: original values",
     xlab = "Removal time (hours)",
     col = "gray85", border = "gray30")

qqnorm(x2, main = "Normal Q-Q: original removal time")
qqline(x2, col = "red", lwd = 2)

shapiro.test(x2)
```

For the actual 25 observations, Shapiro–Wilk gives approximately

$$
\boxed{W_2=0.88247,\qquad p_2=0.00777.}
$$

At $\alpha=0.05$,

$$
0.00777<0.05,
$$

so **reject** the null that the original removal times are normal. The normal Q-Q plot is expected to exhibit noticeable upper-tail departures. This is stronger evidence of a non-normal marginal than the original duration test, judged by the smaller $p$-value under these particular tests, not by comparing the physical importance of the variables.

## Q2(c)-3. Estimate its own Box–Cox lambda

```r
lambda2 <- estimate_lambda(x2)
lambda2
```

From the supplied data,

$$
\boxed{\hat\lambda_2\approx-0.7014.}
$$

This is **not** the same as $\hat\lambda_1\approx0.0545$. The clearing-time variable needs a more strongly upper-tail-compressing transformation under this method.

The fitted formula is approximately

$$
T_{-0.7014}(x)
=\frac{x^{-0.7014}-1}{-0.7014}.
$$

Notice that even though the fitted lambda is negative, the standard Box–Cox transformed value **increases** when the original $x$ increases. This is because of the division by the negative lambda, as explained in Module D.

### A numerical example with an unusually large clearing time

For incident 21, removal time is $x=42.3$ hours. Substitute:

$$
T_{-0.7014}(42.3)
=\frac{42.3^{-0.7014}-1}{-0.7014}.
$$

Compute the exponent using the natural logarithm:

$$
42.3^{-0.7014}=e^{-0.7014\log(42.3)}.
$$

Since $\log(42.3)\approx3.7448$,

$$
42.3^{-0.7014}\approx e^{-2.6265}\approx0.0723,
$$

and therefore

$$
T_{-0.7014}(42.3)\approx
\frac{0.0723-1}{-0.7014}\approx1.3226.
$$

For incident 1 with $13.7$ hours, the same fitted formula produces approximately **1.1984**. The long original distance from $13.7$ to $42.3$ hours has become a much smaller transformed-scale distance. That compression is precisely the intended effect when taming a long upper tail.

## Q2(c)-4. Replot and retest the transformed observations

```r
x2_transformed <- boxcox_transform(x2, lambda2)

head(x2_transformed)
summary(x2_transformed)

qqnorm(x2_transformed,
       main = "Normal Q-Q: transformed removal time")
qqline(x2_transformed, col = "red", lwd = 2)

shapiro.test(x2_transformed)
```

The independently calculated results are approximately

$$
\boxed{W_{2,T}\approx0.97462,\qquad p_{2,T}\approx0.76241.}
$$

Relative to the raw data's $W_2\approx0.88247$, $p_2\approx0.00777$, the transformed sample is much more compatible with a normal marginal model. The transformed Q-Q plot should follow a straighter trend.

### Compare a simple inverse-square-root-style choice

A convenient nearby power is $\lambda=-0.5$, with

$$
T_{-1/2}(x)=2\left(1-\frac1{\sqrt x}\right).
$$

You can examine it in R:

```r
x2_half_inverse <- boxcox_transform(x2, -0.5)
shapiro.test(x2_half_inverse)

qqnorm(x2_half_inverse,
       main = "Removal time: Box-Cox lambda = -0.5")
qqline(x2_half_inverse, col = "red", lwd = 2)
```

For these data, the alternative $\lambda=-0.5$ gives roughly $W\approx0.97313$, $p\approx0.72473$. This is also a substantial improvement over the raw values. A standard natural log transform ($\lambda=0$) gives roughly $W\approx0.95898$, $p\approx0.39450$. The fitted $\lambda\approx-0.7014$ is preferred by the Box–Cox profile likelihood, but the nearby alternatives illustrate that there is not necessarily one uniquely acceptable practical power.

## Q2(c)-5. Graph the original and transformed marginals side by side

```r
oldpar <- par(no.readonly = TRUE)
par(mfrow = c(1, 2))

qqnorm(x2, main = "Original clearing time")
qqline(x2, col = "red", lwd = 2)

qqnorm(x2_transformed, main = "Fitted Box-Cox clearing time")
qqline(x2_transformed, col = "red", lwd = 2)

par(oldpar)
```

If RStudio's Plots pane is small, enlarge it before concluding that two points overlap or a line bends. Unlike a printed graph, this R code redraws the charts using **your actual imported data**.

### Final exam-ready answer to Question 2(c)

The original $X_2$ clearing-time observations are right-skewed, with Shapiro–Wilk $W\approx0.8825$ and $p\approx0.00777$; hence marginal normality is rejected at an illustrative $\alpha=0.05$. The estimated Box–Cox power is $\hat\lambda_2\approx-0.7014$. The transformed Q-Q plot is considerably straighter, and Shapiro–Wilk gives $W\approx0.9746$, $p\approx0.7624$. The transformed marginal distribution is reasonably compatible with a normal shape, subject to the limits of using the same data both to select and assess the transformation.

---
# Question 2(d). Bivariate normality

## Q2(d)-1. Understand why this question is more demanding

Questions 2(b) and 2(c) asked two separate questions:

1. Does the first variable look approximately normal?
2. Does the second variable look approximately normal?

Question 2(d) asks something **stronger**: *Do the two transformed variables together behave like a random vector from a bivariate normal population?*

Think of two kinds of evidence. If you measure only students' heights and then only their weights, you might find two bell-shaped distributions. But a scatter diagram of **height and weight paired by person** could still show unusual curves, clusters, or other structures. The relationship between variables contains information that their two separate histograms cannot reveal.

Similarly, for the snow observations, a transformed duration and transformed removal time may each look normal individually, but their **joint cloud** might still contain unusual observations or non-elliptical structure. Therefore, examine three complementary pieces of evidence:

- **Scatter plot** of the transformed pairs, searching for major curves, clusters and unusual points.
- **Squared Mahalanobis distances**, summarizing each point's distance from the joint center after allowing for different scales and correlations.
- **A joint normality diagnostic**, such as Mardia's multivariate skewness and kurtosis statistics, interpreted with care for this small sample.

No single diagnostic definitively proves or disproves the entire bivariate normality assumption.

## Q2(d)-2. Construct the transformed two-column dataset

**Do not mix untransformed $X_1$ with transformed $X_2$ or vice versa.** Use the fitted transformations from both preceding parts, on the original paired rows:

$$
\mathbf Z_i=
\begin{bmatrix}
T_{\hat\lambda_1}(x_{i1})\\
T_{\hat\lambda_2}(x_{i2})
\end{bmatrix},\qquad i=1,2,\ldots,25.
$$

Here $\mathbf Z_i$ is the transformed pair for storm $i$. Its first entry uses $\hat\lambda_1\approx0.0545$ and its second uses $\hat\lambda_2\approx-0.7014$.

```r
Z <- cbind(
  Duration_T = x1_transformed,
  Removal_T = x2_transformed
)

head(Z)
colMeans(Z)
cov(Z)
cor(Z)
```

`cbind()` stands for **column bind**: it puts two equal-length vectors side by side without changing their row pairing. The result is a numeric matrix. `colMeans()` calculates the mean of each transformed column. `cov()` and `cor()` compute the sample covariance and correlation matrices on the transformed scale.

The independently computed transformed mean vector and sample covariance matrix are approximately

$$
\bar{\mathbf z}=
\begin{bmatrix}
2.308745\\
1.231759
\end{bmatrix},
\qquad
\mathbf S_Z=
\begin{bmatrix}
0.191555&0.007328\\
0.007328&0.002267
\end{bmatrix}.
$$

The transformed Pearson correlation is approximately $0.3517$, compared with $0.4542$ for the untransformed pair. It is not a mistake that correlations can change under **nonlinear** transformations; correlation is not invariant under every transformation. Do not interpret either correlation as causation.

## Q2(d)-3. Scatter plot of the transformed pairs

```r
plot(Z[, 1], Z[, 2],
     xlab = "Box-Cox transformed storm duration",
     ylab = "Box-Cox transformed removal time",
     main = "Q2(d): transformed bivariate observations",
     pch = 19, col = "darkgreen")

text(Z[c(5, 19, 21), 1],
     Z[c(5, 19, 21), 2],
     labels = c(5, 19, 21), pos = 3, cex = 0.85)
```

- `Z[,1]` means all observations on the **first** transformed variable.
- `Z[,2]` means all observations on the **second** transformed variable.
- `Z[c(5,19,21),1]` selects first-coordinate values for those three incidents.
- `pos = 3` places labels above points.

What would a bivariate normal cloud often look like? Roughly a **single elliptical collection of points**. The ellipse can be elongated or tilted because the variables may be correlated. If the transformed plot shows a distinct curve, separated subgroups, or a point far from the cloud, investigate those features.

On these data, the transformations tame the extreme right tails and create a more compact point cloud. Nevertheless, **incident 19** remains conspicuous as a short storm with relatively high clearing time, and the sample is small. The transformed scatter plot therefore provides supportive, but not conclusive, evidence for an approximately elliptical joint distribution.

## Q2(d)-4. Ordinary versus Mahalanobis distance

### Ordinary distance ignores variable relationships

Suppose a pair of coordinates is $(2,10)$ and another is $(4,13)$. Euclidean distance is

$$
d_E=\sqrt{(4-2)^2+(13-10)^2}
=\sqrt{4+9}=\sqrt{13}\approx3.606.
$$

It measures geometric distance using the original axis units. But if one variable naturally varies by many hours while another varies by only a tiny transformed amount, comparing their raw coordinate differences may be misleading. Euclidean distance also ignores whether the two variables are correlated.

### Mahalanobis distance accounts for spread and correlation

A **Mahalanobis distance** measures how unusual an observation is relative to the cloud's covariance structure. Its **squared** form is

$$
\boxed{
D_i^2=(\mathbf z_i-\bar{\mathbf z})^{\mathsf T}
\mathbf S_Z^{-1}(\mathbf z_i-\bar{\mathbf z}).
}
$$

Explain every symbol:

- $D_i^2$: squared Mahalanobis distance for the $i$th observation;
- $\mathbf z_i$: observed two-dimensional transformed vector for incident $i$;
- $\bar{\mathbf z}$: vector of the two transformed sample means;
- $\mathbf z_i-\bar{\mathbf z}$: the point's deviation from the joint center;
- $\mathsf T$: **transpose**, turning a column vector into a row vector;
- $\mathbf S_Z$: estimated covariance matrix of the transformed data;
- $\mathbf S_Z^{-1}$: **matrix inverse**, which adjusts for variable scale and correlation;
- the matrix multiplication produces **one nonnegative number** (assuming a positive-definite covariance matrix).

If $\mathbf S_Z$ were the identity matrix, then $D_i^2$ would reduce to the ordinary squared Euclidean distance from the origin of centered coordinates. With unequal variances and correlations, the inverse covariance matrix rescales and rotates the geometry appropriately.

**Be precise:** `mahalanobis()` in R returns $D_i^2$, the **squared** Mahalanobis distance, not $D_i$. To obtain $D_i$ itself, take `sqrt(...)`.

### Why squared distances are compared with a chi-square distribution

If $\mathbf Z\sim N_p(\boldsymbol\mu,\boldsymbol\Sigma)$, where the **true** population mean and covariance are known, then

$$
(\mathbf Z-\boldsymbol\mu)^{\mathsf T}
\boldsymbol\Sigma^{-1}
(\mathbf Z-\boldsymbol\mu)\sim\chi_p^2.
$$

$\chi_p^2$ (chi-square with $p$ degrees of freedom) is a distribution of sums of squared independent standard-normal variables. For our two-variable model, $p=2$, so the reference is $\chi_2^2$.

**Essential qualification:** In the worksheet, the true mean and covariance are *unknown* and are replaced by sample estimates calculated from the **same 25 points**. These in-sample squared distances are dependent and do **not** have the exact $\chi_2^2$ distribution of the ideal known-parameter expression. A chi-square distance Q-Q plot is a useful **approximate diagnostic**, not an exact per-point test.

## Q2(d)-5. Calculate one Mahalanobis distance by hand

This detailed calculation uses **incident 19**, because it demonstrates a point that is jointly unusual although it is not the largest observation in either column.

The fitted transformed observation is approximately

$$
\mathbf z_{19}=\begin{bmatrix}1.296517\\1.281067\end{bmatrix}.
$$

Subtract the transformed sample mean:

$$
\mathbf d_{19}=
\mathbf z_{19}-\bar{\mathbf z}
=\begin{bmatrix}
1.296517-2.308745\\
1.281067-1.231759
\end{bmatrix}
\approx\begin{bmatrix}-1.012228\\0.049308\end{bmatrix}.
$$

The inverse covariance matrix, computed from the full-precision transformed sample covariance, is approximately

$$
\mathbf S_Z^{-1}\approx
\begin{bmatrix}
5.957234&-19.259624\\
-19.259624&503.432980
\end{bmatrix}.
$$

**How do you obtain a $2\times2$ inverse?** For a general matrix

$$
\mathbf A=\begin{bmatrix}a&b\\c&d\end{bmatrix},
\quad
\det(\mathbf A)=ad-bc,
$$

if the determinant is nonzero,

$$
\mathbf A^{-1}=
\frac1{ad-bc}
\begin{bmatrix}d&-b\\-c&a\end{bmatrix}.
$$

The **determinant**, $ad-bc$, is a special scalar built from the matrix. If it is zero, the matrix cannot be inverted in this ordinary way. R's `solve(S)` performs the inversion for you, avoiding tedious manual arithmetic.

Next multiply the inverse covariance by the deviation vector:

$$
\mathbf S_Z^{-1}\mathbf d_{19}
\approx
\begin{bmatrix}
5.957234(-1.012228)-19.259624(0.049308)\\
-19.259624(-1.012228)+503.432980(0.049308)
\end{bmatrix}
\approx
\begin{bmatrix}-6.9797\\44.3184\end{bmatrix}.
$$

Finally multiply by the row-transposed deviation:

$$
\begin{aligned}
D_{19}^2
&=\mathbf d_{19}^{\mathsf T}\mathbf S_Z^{-1}\mathbf d_{19}\\
&\approx(-1.012228)(-6.9797)+(0.049308)(44.3184)\\
&\approx\boxed{9.2503}.
\end{aligned}
$$

Its ordinary Mahalanobis distance is

$$
D_{19}=\sqrt{9.2503}\approx3.0414.
$$

All matrix entries in this handwritten demonstration are rounded. Your R result, computed from full precision, is the authoritative numerical value for the included script.

### Compute all 25 squared distances in R

```r
center_Z <- colMeans(Z)
S_Z <- cov(Z)

D2 <- mahalanobis(Z, center = center_Z, cov = S_Z)

round(D2, 4)                     # Every incident's squared distance
round(D2[c(19, 21)], 4)          # Inspect incidents 19 and 21
sort(D2, decreasing = TRUE)      # Largest distances first
sqrt(D2)                        # Actual (non-squared) distances
```

For the fitted transformed data and **sample** covariance convention:

| Incident | Squared Mahalanobis distance, approximately |
|---:|---:|
| 19 | $9.2503$ |
| 21 | $5.1026$ |
| 5 | $4.3833$ |

Notice that the identity of the largest *joint* distance **changes** after transformation. This is expected: transforming both marginal axes changes how their variation and association are represented.

### A useful distinction: two covariance conventions

Ordinary R `cov()` divides by $n-1$. For **Mardia's statistics** below, we will instead use the maximum-likelihood-style covariance divided by $n$. This is intentional, not a contradiction. When the same deviations are used, the Mahalanobis values based on the $n$-denominator covariance are $n/(n-1)=25/24$ times the values based on `cov()`:

$$
D_{19,\mathrm{MLE}}^2=\frac{25}{24}\cdot9.2503\approx9.6358.
$$

If two packages print slightly different squared distances, first check **which covariance divisor** they used. Do not mix the two sets of numbers without labeling the convention.

## Q2(d)-6. Construct the squared-distance chi-square Q-Q plot

The ideal theoretical $\chi_2^2$ quantiles are created with `qchisq()`:

```r
nZ <- nrow(Z)
p <- ncol(Z)     # Should be 2 variables

theoretical <- qchisq(ppoints(nZ), df = p)
observed <- sort(D2)

plot(theoretical, observed,
     main = "Bivariate normality: squared-distance Q-Q plot",
     xlab = "Theoretical chi-square(2) quantiles",
     ylab = "Sorted observed squared Mahalanobis distances",
     pch = 19)
abline(a = 0, b = 1, col = "red", lwd = 2, lty = 2)
```

This is a *different* Q-Q plot from the normal Q-Q plots in parts (b) and (c):

- The **horizontal axis** now uses theoretical **chi-square** quantiles, not standard-normal quantiles.
- The **vertical axis** uses squared Mahalanobis distances, not raw observations.
- Under an approximately bivariate normal model, many points should roughly follow the increasing reference pattern. Strong systematic deviations and very large upper points prompt further investigation.

The identity line `abline(a=0,b=1)` gives a useful visual guide for these similarly scaled quantities, but **it is not an exact finite-sample calibration line**. Sample-estimated centers and covariance matrices alter the distribution of the distances and compress the empirical range.

To inspect an exploratory chi-square reference threshold:

```r
qchisq(0.95, df = 2)      # About 5.9915
qchisq(0.975, df = 2)     # About 7.3778
qchisq(0.99, df = 2)      # About 9.2103

which(D2 > qchisq(0.99, df = 2))
```

Incident **19** has sample-covariance distance squared about **9.2503**, just above the ideal $\chi_2^2$ 99th percentile $9.2103$. This makes it **worth investigating**, but because these are in-sample estimated distances and we are screening 25 points, it is not an exact 1%-significance declaration that incident 19 is erroneous.

An ordinary chi-square probability cutoff is not adjusted for testing 25 observations simultaneously. Some distance-based methods instead use finite-sample or robust reference distributions. Those are valuable in advanced work but are not required for a sound worksheet-level exploratory conclusion.

## Q2(d)-7. Mardia's multivariate normality checks

### Why a joint diagnostic helps

Even if two normal Q-Q plots look approximately straight, there can be unexpected joint asymmetry or tail behavior. **Mardia's statistics** extend ideas about skewness and kurtosis from one variable to a *vector*.

For a $p$-variable sample of $n$ observations, let

$$
\bar{\mathbf z}=\frac1n\sum_{i=1}^n\mathbf z_i,
\qquad
\mathbf S_n=\frac1n\sum_{i=1}^n
(\mathbf z_i-\bar{\mathbf z})(\mathbf z_i-\bar{\mathbf z})^{\mathsf T}.
$$

Here $\mathbf S_n$ uses the **$n$ divisor**, rather than the ordinary sample covariance's $n-1$. Let

$$
a_{ij}=(\mathbf z_i-\bar{\mathbf z})^{\mathsf T}
\mathbf S_n^{-1}
(\mathbf z_j-\bar{\mathbf z}).
$$

For $i=j$, $a_{ii}$ is the squared distance of observation $i$ from the joint center, under the $n$-divisor convention. For $i\ne j$, $a_{ij}$ describes how two centered observations align under the standardized geometry; it can be negative.

Mardia's multivariate **skewness** statistic is

$$
\boxed{b_{1,p}=\frac{1}{n^2}\sum_{i=1}^n\sum_{j=1}^n a_{ij}^3.}
$$

We cube and average all pairwise standardized inner products. Large values relative to an appropriate normal-model reference can signal departures from joint symmetry. This is **not** simply the average of two separate univariate skewness coefficients.

Mardia's multivariate **kurtosis** statistic is

$$
\boxed{b_{2,p}=\frac1n\sum_{i=1}^n a_{ii}^2.}
$$

Because $a_{ii}$ is a *squared* distance, $a_{ii}^2$ involves the **fourth power** of standardized distance. It is sensitive to tail behavior and unusually far observations.

For a multivariate normal population in $p$ dimensions, the benchmark population multivariate kurtosis is

$$
p(p+2).
$$

Here $p=2$, giving

$$
2(2+2)=\boxed{8}.
$$

### Approximate reference distributions

For Mardia's skewness under usual large-sample approximations,

$$
K_{\mathrm{skew}}=\frac{n\,b_{1,p}}6
\ \overset{\mathrm{approx}}\sim\ 
\chi^2_{p(p+1)(p+2)/6}.
$$

For $p=2$, the number of degrees of freedom is

$$
\frac{2(3)(4)}6=\boxed{4}.
$$

For Mardia's kurtosis, use the approximate standardized statistic

$$
Z_{\mathrm{kurt}}=
\frac{b_{2,p}-p(p+2)}{\sqrt{8p(p+2)/n}}
\ \overset{\mathrm{approx}}\sim\ N(0,1).
$$

A large absolute kurtosis $Z$ can provide evidence against multivariate normality. Both are **asymptotic** references: their calibration becomes more reliable as sample size grows under suitable assumptions. For only $n=25$ observations and $p=2$, use them as **supportive diagnostics**. Some implementations apply finite-sample corrections and may produce different $p$-values.

### Reproducible R function using only base R

```r
mardia_check <- function(A) {
  A <- as.matrix(A)
  n <- nrow(A)
  p <- ncol(A)

  stopifnot(n > p + 1, all(is.finite(A)))

  centered <- scale(A, center = TRUE, scale = FALSE)
  S_mle <- crossprod(centered) / n

  # All pairs of standardized inner products:
  P <- centered %*% solve(S_mle) %*% t(centered)

  b1p <- sum(P^3) / (n^2)
  b2p <- mean(diag(P)^2)

  skew_chisq <- n * b1p / 6
  skew_df <- p * (p + 1) * (p + 2) / 6
  skew_p <- pchisq(skew_chisq, df = skew_df,
                   lower.tail = FALSE)

  kurt_z <- (b2p - p * (p + 2)) /
    sqrt(8 * p * (p + 2) / n)
  kurt_p <- 2 * pnorm(-abs(kurt_z))

  data.frame(
    n = n, p = p,
    skewness = b1p,
    skew_chisq = skew_chisq,
    skew_df = skew_df,
    skew_p = skew_p,
    kurtosis = b2p,
    kurt_z = kurt_z,
    kurt_p = kurt_p
  )
}

mardia_check(as.matrix(snow))  # Original two-variable data
mardia_check(Z)                # Both variables transformed
```

### Explain the code carefully

- `as.matrix(A)` makes sure the input is a numeric matrix.
- `nrow(A)` counts observations; `ncol(A)` counts variables.
- `scale(A, center=TRUE, scale=FALSE)` subtracts each column mean **without dividing by standard deviations**.
- `crossprod(centered)` is equivalent to `t(centered) %*% centered`, a $p\times p$ sum-of-products matrix.
- `S_mle <- crossprod(centered) / n` divides by $n$, as required by this definition of Mardia's statistics.
- `solve(S_mle)` computes the inverse covariance matrix.
- `%*%` means matrix multiplication. Its dimensions must agree: an $n\times p$ matrix multiplied by a $p\times p$ matrix and then a $p\times n$ matrix produces an $n\times n$ matrix.
- `t(centered)` transposes rows and columns.
- `P^3` cubes each entry **elementwise** in R, not as a matrix power.
- `sum(P^3)` adds those cubes across all $n^2$ pairs.
- `diag(P)` extracts the diagonal entries, the estimated squared distances.
- `pchisq(..., lower.tail=FALSE)` calculates the **upper-tail** probability of a chi-square variable, giving a $p$-value for a large skewness statistic.
- `pnorm(-abs(kurt_z))` calculates one normal tail; multiplying by 2 gives the two-sided kurtosis $p$-value.
- `data.frame(...)` presents the results as named columns.

This function implements the **uncorrected asymptotic Mardia reference formulas above**. It is deliberately transparent, so you can see how the values are obtained rather than treating a package output as a mysterious answer.

### Results calculated from this specific dataset

| Joint diagnostic | Original variables | Both variables transformed |
|---|---:|---:|
| Mardia multivariate skewness $b_{1,2}$ | $2.4315$ | $1.5865$ |
| Approximate skewness chi-square statistic, 4 df | $10.1314$ | $6.6106$ |
| Approximate skewness $p$-value | $0.03827$ | $0.15796$ |
| Mardia multivariate kurtosis $b_{2,2}$ | $10.0108$ | $8.3112$ |
| Approximate kurtosis $Z$ | $1.2568$ | $0.1945$ |
| Approximate two-sided kurtosis $p$-value | $0.20884$ | $0.84577$ |

**How to interpret the original data:** At illustrative $\alpha=0.05$, the original-scale Mardia skewness approximation gives $p\approx0.0383$, suggesting a joint departure from normality. The original kurtosis approximation is not significant ($p\approx0.2088$). These are not contradictory: skewness and kurtosis examine **different ways** a distribution can depart from normality.

**How to interpret the transformed data:** For the transformed variables, the skewness $p\approx0.1580$ and kurtosis $p\approx0.8458$ are both above $0.05$. This means these two diagnostics **do not detect a statistically significant departure** from bivariate normality using the stated large-sample approximations. The estimated kurtosis of $8.3112$ is also much closer to the bivariate-normal benchmark of 8.

**Critical cautions:** The sample contains only 25 incidents; the transformation parameters were chosen using these same observations; and the Mardia reference values are asymptotic. Therefore, the improvement is encouraging **exploratory evidence**, not rigorous proof that an exact bivariate normal population exists. Incident 19 still deserves attention.

## Q2(d)-8. Why two large Shapiro $p$-values are not sufficient

After transformation, the marginal Shapiro values are approximately

$$
p_{X_1,T}=0.8494,\qquad p_{X_2,T}=0.7624.
$$

These tell us only that the two **individual** normality tests did not find meaningful deviations. They do **not** mathematically imply that the pair is bivariate normal. To make a responsible joint assessment, use the transformed scatter, squared-distance Q-Q plot and (optionally) the joint Mardia diagnostics as complementary checks.

Also, applying a different Box–Cox transformation to each coordinate is a **nonlinear** operation. Even if the original pair were jointly normal, arbitrary nonlinear coordinate transformations would not generally preserve joint normality. What matters is whether the **resulting transformed pair** provides an adequate model for the statistical analysis you intend to perform.

## Q2(d)-9. Complete interpretation and final answer

A careful worksheet-level conclusion is:

> Both original snow-removal variables show evidence of non-normal marginal distributions. Independent Box–Cox estimates give $\hat\lambda_1\approx0.0545$ and $\hat\lambda_2\approx-0.7014$. After transformation, each marginal Q-Q plot is markedly closer to a straight line, and the corresponding Shapiro–Wilk tests fail to reject normality at the illustrative 5% level. The transformed bivariate scatter is more compact and broadly compatible with an elliptical cloud. The squared Mahalanobis-distance plot can be used as an approximate joint diagnostic; incident 19 remains relatively unusual. Uncorrected asymptotic Mardia tests on the transformed pair yield skewness $p\approx0.158$ and kurtosis $p\approx0.846$, neither significant at 5%. Taken together, the evidence suggests **substantially improved approximate bivariate normality**, but the sample does not establish exact joint normality, and the estimated tests are exploratory because transformations were selected on the same data.

This conclusion answers the actual question rather than merely listing a package's `TRUE/FALSE` result.

---
# Complete runnable R script

The code below is a **single, self-contained R script** that reproduces the main outputs and plots. It uses **base R only**, so there is no need to install `MASS`, `MVN`, `ggplot2`, or any other package. It intentionally reads **the real uploaded `.DAT` file** through a file picker. Do not replace it with simulated data.

**How to run it:** Open a new R script in RStudio, paste the entire block, and run it from top to bottom. When prompted, select `T3-2(1).DAT`. The script will print numerical summaries in the Console and display plots in the Plots pane or another graphics device. If the graphics pane is too small, enlarge it. You can rerun individual sections after the setup has executed.

```r
# =============================================================
# DA2451 Practice Worksheet 4: reproducible base-R analysis
# Original source: PQ4.pdf
# Required external data: T3-2(1).DAT, 25 rows x 2 columns
# =============================================================

# --- Question 1: Dow-Jones return values supplied in the PDF ---
returns <- c(-0.6, 3.1, 25.3, -16.8, -7.1,
             -6.2, 16.1, 25.2, 22.6, 26.0)

cat("\n===== QUESTION 1 =====\n")
cat("n =", length(returns), "\n")
cat("Mean =", mean(returns), "\n")
cat("Sample SD =", sd(returns), "\n")
print(shapiro.test(returns))

qqnorm(returns, main = "Q1: Q-Q plot of annual returns",
       xlab = "Theoretical normal quantiles",
       ylab = "Observed returns")
qqline(returns, col = "red", lwd = 2)

alpha1 <- 0.10
p_returns <- shapiro.test(returns)$p.value
if (p_returns <= alpha1) {
  cat("Q1: Reject normality at alpha = 0.10.\n")
} else {
  cat("Q1: Fail to reject normality at alpha = 0.10.\n")
}

# --- Question 2: import real observations ---
cat("\nChoose the T3-2(1).DAT snow-removal file.\n")
file_path <- file.choose()

snow <- read.table(file_path, header = FALSE,
                   col.names = c("Duration", "Removal"))

stopifnot(nrow(snow) == 25, ncol(snow) == 2)
stopifnot(all(complete.cases(snow)))
stopifnot(all(sapply(snow, is.numeric)))
stopifnot(all(as.matrix(snow) > 0))

x1 <- snow$Duration
x2 <- snow$Removal

cat("\n===== QUESTION 2: DATA CHECK =====\n")
print(head(snow))
print(tail(snow))
print(summary(snow))
cat("Means:\n")
print(colMeans(snow))
cat("Covariance matrix:\n")
print(cov(snow))
cat("Correlation matrix:\n")
print(cor(snow))

# --- Q2(a): scatter and exploratory outlier flags ---
plot(x1, x2, pch = 19, col = "darkblue",
     xlab = "Storm duration (hours)",
     ylab = "Removal time (hours)",
     main = "Q2(a): original paired measurements")
text(x1[c(5, 7, 13, 19, 21)],
     x2[c(5, 7, 13, 19, 21)],
     labels = c(5, 7, 13, 19, 21),
     pos = 3, cex = 0.8)

fences <- function(x) {
  q <- quantile(x, c(0.25, 0.75))
  iqr <- IQR(x)
  c(lower = q[1] - 1.5 * iqr,
    upper = q[2] + 1.5 * iqr)
}

f1 <- fences(x1)
f2 <- fences(x2)
cat("\n===== Q2(a): OUTLIER SCREENS =====\n")
print(f1)
print(f2)
cat("Duration flags at row positions:\n")
print(which(x1 < f1[1] | x1 > f1[2]))
cat("Removal flags at row positions:\n")
print(which(x2 < f2[1] | x2 > f2[2]))

# --- Q2(b) and (c): base-R Box-Cox functions ---
boxcox_transform <- function(x, lambda) {
  stopifnot(is.numeric(x), all(is.finite(x)), all(x > 0))
  if (abs(lambda) < 1e-8) return(log(x))
  (x^lambda - 1) / lambda
}

boxcox_loglik <- function(x, lambda) {
  z <- boxcox_transform(x, lambda)
  n <- length(z)
  mle_variance <- mean((z - mean(z))^2)
  -n / 2 * log(mle_variance) +
    (lambda - 1) * sum(log(x))
}

estimate_lambda <- function(x) {
  optimize(f = function(L) boxcox_loglik(x, L),
           interval = c(-2, 2), maximum = TRUE)$maximum
}

lambda1 <- estimate_lambda(x1)
lambda2 <- estimate_lambda(x2)

x1_T <- boxcox_transform(x1, lambda1)
x2_T <- boxcox_transform(x2, lambda2)

cat("\n===== Q2(b): DURATION =====\n")
cat("Estimated lambda1 =", lambda1, "\n")
cat("Original normality:\n")
print(shapiro.test(x1))
cat("Transformed normality:\n")
print(shapiro.test(x1_T))
cat("Simple log alternative:\n")
print(shapiro.test(log(x1)))

cat("\n===== Q2(c): REMOVAL =====\n")
cat("Estimated lambda2 =", lambda2, "\n")
cat("Original normality:\n")
print(shapiro.test(x2))
cat("Transformed normality:\n")
print(shapiro.test(x2_T))
cat("Simpler lambda = -0.5 alternative:\n")
print(shapiro.test(boxcox_transform(x2, -0.5)))

# Compare both original and transformed marginal Q-Q plots.
oldpar <- par(no.readonly = TRUE)
par(mfrow = c(2, 2))

qqnorm(x1, main = "Duration: original")
qqline(x1, col = "red")

qqnorm(x1_T, main = "Duration: Box-Cox")
qqline(x1_T, col = "red")

qqnorm(x2, main = "Removal: original")
qqline(x2, col = "red")

qqnorm(x2_T, main = "Removal: Box-Cox")
qqline(x2_T, col = "red")

par(oldpar)

# --- Q2(d): transformed joint data and distances ---
Z <- cbind(Duration_T = x1_T, Removal_T = x2_T)

cat("\n===== Q2(d): JOINT NORMALITY =====\n")
cat("Transformed means:\n")
print(colMeans(Z))
cat("Transformed sample covariance:\n")
print(cov(Z))
cat("Transformed correlation:\n")
print(cor(Z))

D2 <- mahalanobis(Z, center = colMeans(Z), cov = cov(Z))
cat("Squared Mahalanobis distances, descending:\n")
print(sort(D2, decreasing = TRUE))
cat("Incident 19 distance squared:\n")
print(D2[19])
cat("99% ideal chi-square reference cutoff:\n")
print(qchisq(0.99, df = 2))

oldpar <- par(no.readonly = TRUE)
par(mfrow = c(1, 2))

plot(Z[, 1], Z[, 2], pch = 19, col = "darkgreen",
     main = "Q2(d): transformed scatter",
     xlab = "Transformed duration",
     ylab = "Transformed removal")
text(Z[c(5, 19, 21), 1], Z[c(5, 19, 21), 2],
     labels = c(5, 19, 21), pos = 3, cex = 0.8)

q_theory <- qchisq(ppoints(nrow(Z)), df = 2)
plot(q_theory, sort(D2), pch = 19,
     main = "Q2(d): chi-square Q-Q diagnostic",
     xlab = "Theoretical chi-square(2) quantile",
     ylab = "Observed squared Mahalanobis distance")
abline(a = 0, b = 1, col = "red", lty = 2)

par(oldpar)

# --- Transparent Mardia approximations; no extra package ---
mardia_check <- function(A) {
  A <- as.matrix(A)
  n <- nrow(A)
  p <- ncol(A)
  stopifnot(n > p + 1, all(is.finite(A)))

  centered <- scale(A, center = TRUE, scale = FALSE)
  S_mle <- crossprod(centered) / n
  P <- centered %*% solve(S_mle) %*% t(centered)

  b1p <- sum(P^3) / n^2
  b2p <- mean(diag(P)^2)

  skew_chisq <- n * b1p / 6
  skew_df <- p * (p + 1) * (p + 2) / 6
  skew_p <- pchisq(skew_chisq, skew_df,
                   lower.tail = FALSE)

  kurt_z <- (b2p - p * (p + 2)) /
    sqrt(8 * p * (p + 2) / n)
  kurt_p <- 2 * pnorm(-abs(kurt_z))

  data.frame(
    skewness = b1p,
    skew_chisq = skew_chisq,
    skew_df = skew_df,
    skew_p = skew_p,
    kurtosis = b2p,
    kurt_z = kurt_z,
    kurt_p = kurt_p
  )
}

cat("Original-data asymptotic Mardia diagnostics:\n")
print(mardia_check(as.matrix(snow)))
cat("Transformed-data asymptotic Mardia diagnostics:\n")
print(mardia_check(Z))

cat("\nAnalysis complete. Interpret every result in the guide.\n")
```

### Reading the script output safely

The expected principal results, rounded, are:

| Calculation | Expected numerical result |
|---|---|
| Question 1: Shapiro–Wilk | $W\approx0.87947$, $p\approx0.12867$ |
| Duration: original Shapiro–Wilk | $W\approx0.91701$, $p\approx0.04382$ |
| Duration: Box–Cox estimate | $\hat\lambda_1\approx0.05450$ |
| Duration: transformed Shapiro–Wilk | $W\approx0.97830$, $p\approx0.84944$ |
| Removal: original Shapiro–Wilk | $W\approx0.88247$, $p\approx0.00777$ |
| Removal: Box–Cox estimate | $\hat\lambda_2\approx-0.70138$ |
| Removal: transformed Shapiro–Wilk | $W\approx0.97462$, $p\approx0.76241$ |
| Original sample correlation | $r\approx0.45416$ |
| Transformed sample correlation | $r\approx0.35169$ |
| Transformed incident-19 sample squared Mahalanobis distance | $D_{19}^2\approx9.25033$ |
| Transformed Mardia skewness $p$-value, asymptotic | $\approx0.15796$ |
| Transformed Mardia kurtosis $p$-value, asymptotic | $\approx0.84577$ |

These values are based on the exact original ten stock returns and exact 25-row `.DAT` table. **They are not fabricated R console transcripts.** R may print more or fewer digits; the numbers are provided as independent computational checks. If your results differ substantially, verify the file import, column order, row count, transformation definition, and covariance divisor before changing the data.

---

# Exam reasoning, pitfalls and self-checks

## E1. A compact process map

| Stage | What to do | Why it matters |
|---|---|---|
| Read | Identify each measured variable and number of observations | Prevents mixing variables or units |
| Validate | Confirm actual dataset rows, columns and missing values | Wrong import means wrong conclusions |
| Visualize | Histogram, scatter plot, marginal Q-Q plots | Helps identify skewness, outliers and joint patterns |
| Test | Choose $H_0$, $H_1$, $\alpha$, run normality tests | Gives formal evidence under assumptions |
| Transform | Estimate and apply a positive-data Box–Cox power separately as appropriate | Can improve approximate normality |
| Recheck | Construct new Q-Q plots and compare distributions | Confirm that transformation improved the shape |
| Joint check | Transformed scatter, Mahalanobis distances, optional Mardia | Marginal normality alone does not imply joint normality |
| Conclude | State evidence, uncertainty and assumptions in plain language | A statistic without interpretation is an incomplete answer |

## E2. The most important distinctions

### 1. Sample mean versus population mean

$\bar x$ is computed from observed measurements; $\mu$ describes the population. Do not use them interchangeably when writing mathematical claims.

### 2. Standard deviation versus variance

Variance is in squared units, whereas standard deviation is in the original unit. $s=\sqrt{s^2}$. In the normal-distribution notation $N(\mu,\sigma^2)$, the second entry is a variance.

### 3. Normal Q-Q versus chi-square Q-Q

A **normal Q-Q plot** compares sorted *values of one variable* with a standard-normal reference. A **chi-square Q-Q plot** for multivariate normality compares *squared Mahalanobis distances* with a chi-square reference. Using `qqnorm(D2)` produces a normal Q-Q plot of the distances and does **not** implement the appropriate chi-square-distance diagnostic.

### 4. A large $p$-value versus proof of normality

A large $p$-value means the data do not contradict the null strongly **under the test's assumptions**. It does not mean the null is known to be true. A low-powered test can miss practically meaningful departures, especially for small samples.

### 5. Outlier versus bad data

A rare observation can be correct and scientifically important. A point should not be deleted solely because it makes a Q-Q plot curve or reduces a $p$-value. Investigate data quality, explain any exclusion, and consider sensitivity checks.

### 6. Raw versus transformed measurements

$\hat\lambda_1\approx0.0545$ corresponds to nearly a log transformation; $\hat\lambda_2\approx-0.7014$ is a stronger compression. Transformed values are **not original hours**. If you quote a result on the transformed scale, label it correctly.

### 7. Negative Box–Cox lambda versus reversing observations

Standard Box–Cox $T_\lambda(x)=(x^\lambda-1)/\lambda$ is monotonic increasing for positive observations even if $\lambda<0$. Writing only $x^{-0.7014}$ is **not the same numerical transformation** as the standard Box–Cox family. Shape-based normality is unchanged by a nonzero affine rescaling of a transformed vector, but retaining the standard formula keeps code, worked examples and interpretation consistent.

### 8. Estimated $\mathbf S$ versus known $\boldsymbol\Sigma$

The exact chi-square result uses **known population parameters** and a genuinely multivariate normal vector. In a dataset, we estimate them. The resulting in-sample squared Mahalanobis distances are not exactly independent chi-square random variables. The Q-Q plot is exploratory.

### 9. Linear correlation versus any relationship

A moderate positive Pearson $r$ does not imply that every point follows a line, that the variables are causally linked, or that the joint distribution is normal. Also, nonlinear transformations can change Pearson correlation.

### 10. Post-selection tests versus independent confirmation

The same 25 observations were used to **select** $\hat\lambda_1$ and $\hat\lambda_2$ and then to compute Shapiro and Mardia results. That is appropriate for this exploratory practice worksheet, but the post-transformation $p$-values are not independent, preregistered hypothesis tests and may be optimistic. To validate a transformation's generalizability, an independent dataset or a careful resampling design would be stronger.

## E3. A full practice example on significance levels

Assume a hypothetical normality test gives $W=0.95$ and $p=0.08$.

**At $\alpha=0.05$:** $0.08>0.05$, so fail to reject normality.

**At $\alpha=0.10$:** $0.08<0.10$, so reject normality.

What changed? **Not the data and not the $p$-value.** Only the decision threshold changed. The actual worksheet's Question 1 requires $\alpha=0.10$, so always use that specified threshold there. Question 2 does not state an alpha; report your chosen level rather than silently attributing it to the lecturer.

## E4. Self-check questions with answers

**Self-check A:** A variable has a straight-looking Q-Q plot. Is it definitely normal?  
**Answer:** No. A normal model may be plausible, but the graph is a sample-based diagnostic, not proof.

**Self-check B:** A Shapiro–Wilk test gives $p=0.03$. What happens at the 5% level?  
**Answer:** Reject the normality null because $0.03<0.05$.

**Self-check C:** A Shapiro–Wilk test gives $p=0.30$. Can you say “the data have a 30% chance of being normal”?  
**Answer:** No. A $p$-value is calculated assuming the null model; it does not directly give the probability the null is true.

**Self-check D:** Why is $\log(x)$ unavailable in the ordinary real-number sense for $x\le0$?  
**Answer:** The natural logarithm is defined for strictly positive real inputs. In the standard positive-data Box–Cox family, each $x_i$ must be positive. Data with zero or negative values require a defensible different approach rather than silently applying the formula.

**Self-check E:** Why can two separately normal-looking variables still fail a bivariate normality test?  
**Answer:** The joint pattern may be curved, clustered or have unusual dependence. Marginal distributions do not determine all joint relationships.

**Self-check F:** The squared Mahalanobis distance is 9. What is the ordinary Mahalanobis distance?  
**Answer:** $\sqrt9=3$. Do not mistakenly compare the ordinary distance 3 with a chi-square threshold intended for squared distances.

**Self-check G:** Why do we keep incident 19 in the main analysis despite its unusual position?  
**Answer:** The worksheet supplies it as an observation, and unusual does not mean incorrect. We analyze the full dataset and flag it for investigation without silently deleting it.

**Self-check H:** If storm duration and removal time are transformed separately, must their correlation stay $0.4542$?  
**Answer:** No. Pearson correlation is invariant under certain linear rescalings but not arbitrary nonlinear transformations. For the fitted transformed columns, the observed correlation is about $0.3517$.

## E5. Model answers in very simple language

**Question 1:** The ten stock returns are not perfectly aligned in a normal Q-Q plot, but the sample is small. The Shapiro–Wilk $p$-value is about 0.1287. Because this is greater than the required 0.10 level, we do not reject normality. This is broadly consistent with the cautious visual conclusion.

**Question 2(a):** The original scatter plot shows a generally positive relationship, with incidents 5, 19 and 21 especially worth inspecting, and incidents 7 and 13 also relatively high on removal time. We should not delete any observation automatically.

**Question 2(b):** The original storm durations show a departure from normality ($p\approx0.0438$ at the illustrative 5% level). Box–Cox gives $\hat\lambda_1\approx0.0545$, close to a log transform. The transformed Q-Q plot is more linear and the descriptive Shapiro check has $p\approx0.8494$.

**Question 2(c):** The original removal times show a departure from normality ($p\approx0.00777$). Box–Cox gives $\hat\lambda_2\approx-0.7014$. The transformed Q-Q plot improves and the descriptive Shapiro check has $p\approx0.7624$.

**Question 2(d):** The transformed marginals look substantially more normal. The joint scatter and squared-distance checks still suggest looking closely at incident 19. The uncorrected approximate Mardia skewness and kurtosis tests do not reject joint normality at an illustrative 5% level ($p\approx0.158$ and $0.846$). The data are **reasonably compatible with an improved bivariate-normal approximation**, but the diagnosis is exploratory and not a guarantee.

## E6. Final completeness and source-integrity checklist

| Requirement | Where it is covered | Status |
|---|---|---|
| Complete source instruction and return values | Question 1 original text | Included |
| Q1(a) Q-Q construction and interpretation | Question 1(a) | Calculated and explained |
| Q1(b) normality test at $\alpha=0.10$ | Question 1(b) | Calculated and explained |
| Complete external `T3-2.dat` observations | Question 2 data table | All 25 paired rows included |
| Q2(a) scatter and possible outliers | Question 2(a) | Calculated and explained |
| Q2(b) original $X_1$ normality, fitted $\hat\lambda_1$, transformed Q-Q | Question 2(b) | Calculated and explained |
| Q2(c) original $X_2$ normality, fitted $\hat\lambda_2$, transformed Q-Q | Question 2(c) | Calculated and explained |
| Q2(d) transformed bivariate normality | Question 2(d) | Joint diagnostics, interpretation and limitations |
| Shapiro hypotheses and $p$-values | Modules B, Q1, Q2 | Included |
| Box–Cox definition, log limit and estimation | Module D | Included |
| Matrix-based distance interpretation and calculation | Question 2(d) | Included |
| Exact versus approximate distribution claims | Question 2(d) | Explicitly distinguished |
| Beginner-friendly R commands and reproducible end-to-end script | Module C and final script | Included |
| Unsupported results or missing source data | Provenance note | None needed for Q1–Q2; all necessary data supplied |
| Remaining practice worksheets | Not covered | Intentionally not processed |

---

## Final learning principle

A normality analysis is not merely “draw a graph and obtain a $p$-value.” It is a carefully reasoned sequence: **understand the variable, preserve the paired data, study the observed pattern, state a statistical model, check evidence against that model, consider appropriate transformations, examine the joint distribution when needed, and express uncertainty in ordinary language**. If you can explain why each step is necessary and what each number means, you understand this worksheet well beyond a memorized R command.
