# DA2451 – Multivariate Methods in Business

# Practice Worksheet 3: Complete Teaching Guide

**Original worksheet:** `PQ3.pdf`, *Practice Worksheet – 3*, Semester 4, 2024  
**Topic:** Multivariate normal distribution – Part I  
**Coverage:** The whole eight-page source, Questions 1–11, with every part and the source's worked answers.  
**Audience:** Someone who has never studied probability, statistics, matrices, or R.  
**Instructions in original:** “Try to do your calculations by hand with a calculator.”  
**File type:** Self-contained UTF-8 Markdown, using standard LaTeX mathematics.

## How this guide separates what you were given from what has been added

- **Original question** reproduces the question, numerical information, mathematical notation and numbering from the worksheet. Occasional differences in typography (for example, `\ne` in place of a poorly extracted inequality sign) merely make the mathematical expression readable.
- **Lecturer-provided solution** states what the PDF gives, including the important lines of reasoning. The provided answer is not assumed to be correct merely because it is printed.
- **Guided derivation / verification** supplies all the arithmetic, prerequisite ideas and reasoning needed to understand or verify that solution independently.
- **Source discrepancy** calls out a mathematical, logical, or labelling problem in the supplied worksheet. The original statement is retained, followed by a clearly identified correction or limitation.
- **Supplementary example / optional R check** is new teaching content, not an observation or output claimed to have appeared in the PDF.

**Important:** The original uses the notation $N_p(\boldsymbol\mu,\boldsymbol\Sigma)$, where the second argument is a **covariance matrix**. When it uses $N(m,v)$ for one variable, $v$ means **variance**, not standard deviation. This convention is followed throughout.

## Contents

1. Part 0: Build the mathematics and probability foundations from zero.
2. Question 1: Bivariate normal density and squared statistical distance.
3. Question 2: A linear combination of a bivariate normal vector; detect a defective covariance matrix.
4. Question 3: Linear combinations, covariance and adding a constant.
5. Question 4: Multivariate linear transformations and translations.
6. Question 5: Joint transformations and marginal distributions.
7. Question 6: Independence from a covariance matrix.
8. Question 7: Independence of components and linear combinations.
9. Question 8: Stacking independent normal vectors; chi-square quadratic forms and a defective covariance matrix.
10. Question 9: One observation, the sample mean, and the Wishart distribution.
11. Question 10: Exact and approximate chi-square results, including sample covariance.
12. Question 11: Multivariate central limit theorem beyond a normal population.
13. Part 12: Formula reference, distinctions, checking procedures, and R verification laboratory.

***

# Part 0. Foundations: everything needed before Question 1

## 0.1 The basic story: why use a multivariate distribution?

Imagine measuring **height** and **weight** for a randomly chosen person. Before selecting that person, both values are unknown. The two measurements can also be related: taller people often weigh more, although one does not determine the other exactly.

If you study height by itself, you have **one variable**. If you study height and weight together, you have **two variables**, and you must account for how they move together. That is the beginning of multivariate statistics.

- **Univariate**: one random quantity, such as the number of customer orders.
- **Bivariate**: two random quantities studied together, such as a customer's spending and visit frequency.
- **Multivariate**: two or more random quantities studied together, such as the scores on six tests.

A *distribution* is a mathematical description of what values can occur and how likely different outcomes or regions of outcomes are. The **multivariate normal distribution** is the multidimensional relative of the familiar bell-shaped normal distribution.

## 0.2 A random variable, an observation, and a random vector

A **random variable** is a numerical outcome that is not known until an event or observation happens. We conventionally use an uppercase letter such as $X_1$ for a random variable. A lowercase $x_1$ is a particular numerical value we might observe.

If $X_1$ is height and $X_2$ is weight, place them in a **column vector**:

$$
\mathbf X=\begin{bmatrix}X_1\\X_2\end{bmatrix}.
$$

The bold symbol $\mathbf X$ means the entire collection, not just one component. A possible observed value is

$$
\mathbf x=\begin{bmatrix}170\\65\end{bmatrix}.
$$

These are just illustrative numbers, **not data from the worksheet**. The first entry represents the first variable, and the second entry represents the second variable. In this worksheet the vector sometimes has two entries and sometimes three, six, or another number $p$.

**Two different meanings of a subscript:** $X_1$ in Question 1 means the *first variable*. In Question 9, $\mathbf X_1$ means the *first entire observed vector* in a sample of 20 vectors. Read the surrounding definition carefully.

## 0.3 Probability: outcomes, likelihood and density

Probability lies between zero and one. A probability of zero indicates an impossible event (in the usual discrete interpretation); a probability of one means an event is certain.

For **continuous** measurements, such as exact length, there are infinitely many possible values. Probability is assigned to *ranges* or *regions*, not to a single exact point. A **probability density** is a function whose area (in one dimension) or volume (in two dimensions) over a region gives the probability of landing in that region.

For one continuous variable with density $f(x)$:

$$
P(a<X<b)=\int_a^b f(x)\,dx.
$$

Read $\int$ as “add up infinitely many tiny pieces of area”; you do not need calculus to understand the exercises. For two variables:

$$
P\big((X_1,X_2)\in A\big)=\iint_A f(x_1,x_2)\,dx_1\,dx_2.
$$

Here $A$ is a region in a plane. **A density value is not itself a probability.** It can even exceed one, as long as its total area/volume is one.

## 0.4 Mean: the center or expected value

A **mean**, written $\mu$, is a theoretical center or long-run average. If $X$ has a distribution, its population mean is $E(X)$, pronounced “expected value of X.”

For two measurements we need a **mean vector**:

$$
\boldsymbol\mu=\begin{bmatrix}\mu_1\\\mu_2\end{bmatrix}
=\begin{bmatrix}E(X_1)\\E(X_2)\end{bmatrix}.
$$

For example, $\boldsymbol\mu=(1,3)'$ says the first variable has mean 1 and the second has mean 3. The prime $'$ means transpose; a row $(1,3)$ becomes a column $[1,3]'$.

**Population mean versus sample mean:**

- $\boldsymbol\mu$ is the population's theoretical center, usually unknown in real research.
- $\bar{\mathbf X}=\frac{1}{n}\sum_{i=1}^{n}\mathbf X_i$ is the random **sample mean vector**, calculated from $n$ observations.
- $\bar{\mathbf x}$ denotes a specific sample mean after the data have been observed.

These are different objects even when they have the same number of entries.

## 0.5 Variance, standard deviation, covariance and correlation

**Variance** describes spread around a mean. Large variance means the observations tend to be farther from the center. Variance is measured in **squared units**; the standard deviation is its square root and uses the original units.

$$
\operatorname{Var}(X_1)=\sigma_{11},\qquad
\operatorname{SD}(X_1)=\sqrt{\sigma_{11}}=\sigma_1.
$$

For instance, if $\sigma_{11}=9$, the standard deviation is $3$, not $9$.

**Covariance** describes whether two variables tend to be above or below their means together:

$$
\operatorname{Cov}(X_1,X_2)
=E\big[(X_1-\mu_1)(X_2-\mu_2)\big]=\sigma_{12}.
$$

Imagine a day on which both sales and advertising spending are above their average. The two deviations are positive, so their product is positive. If one is above its mean while the other is below its mean, the product is negative.

- Positive covariance: both variables tend to increase/decrease together.
- Negative covariance: one tends to be high when the other is low.
- Zero covariance: no **linear** co-movement is detected; this does **not always** mean independence.

Covariance depends on the measurement units. **Correlation** removes those units by dividing covariance by the two standard deviations:

$$
\rho_{12}=\frac{\sigma_{12}}{\sigma_1\sigma_2}
=\frac{\sigma_{12}}{\sqrt{\sigma_{11}}\sqrt{\sigma_{22}}}.
$$

Correlation is between $-1$ and $1$:

| Value | Meaning |
|---|---|
| Near $+1$ | Strong positive **linear** association |
| Near $0$ | Weak or no linear association; nonlinear dependence may still exist |
| Near $-1$ | Strong negative linear association |
| Exactly $+1$ or $-1$ | A perfect linear relationship, if the variables are nonconstant |

**Crucial symbol distinction:** $\rho_{12}$ is the **population correlation**. The number $\sigma_{12}$ is **covariance**, not correlation. The numbers $\sigma_{11}$ and $\sigma_{22}$ are **variances**, not standard deviations.

## 0.6 The covariance matrix: arranging all the spread information

For two variables, collect variances and covariances into a table-shaped mathematical object called a **matrix**:

$$
\boldsymbol\Sigma=
\begin{bmatrix}
\sigma_{11}&\sigma_{12}\\
\sigma_{21}&\sigma_{22}
\end{bmatrix}.
$$

- Diagonal entries $\sigma_{11}$ and $\sigma_{22}$ are variances.
- Off-diagonal entries $\sigma_{12}$ and $\sigma_{21}$ are covariances.
- Covariance is **symmetric**: $\sigma_{12}=\sigma_{21}$.

For three variables:

$$
\boldsymbol\Sigma=
\begin{bmatrix}
\sigma_{11}&\sigma_{12}&\sigma_{13}\\
\sigma_{21}&\sigma_{22}&\sigma_{23}\\
\sigma_{31}&\sigma_{32}&\sigma_{33}
\end{bmatrix}.
$$

A **$p\times p$ matrix** has $p$ rows and $p$ columns; $\Sigma$ is $p\times p$ if the random vector contains $p$ variables. Looking up the covariance of $X_2$ and $X_3$ means going to row 2, column 3.

## 0.7 A required reality check: not every symmetric table can be a covariance matrix

A covariance matrix must have nonnegative quadratic forms:

$$
\mathbf a'\boldsymbol\Sigma\mathbf a\ge 0
\quad\text{for every real column vector }\mathbf a.
$$

This property is called **positive semidefiniteness**. It has an intuitive reason: $\mathbf a'\Sigma\mathbf a$ is the *variance* of a weighted sum of the variables, and a variance cannot be negative. When every nonzero $\mathbf a$ produces a positive number, the matrix is **positive definite**.

For a $2\times2$ symmetric matrix

$$
\Sigma=\begin{bmatrix}a&b\\b&c\end{bmatrix},
$$

its **determinant**, written $|\Sigma|$ or $\det(\Sigma)$, is $ac-b^2$. With positive diagonal entries, a negative determinant proves the matrix is **not** a covariance matrix. For a valid two-variable covariance matrix:

$$
|\sigma_{12}|\le\sqrt{\sigma_{11}\sigma_{22}}
\qquad\text{equivalently}\qquad |\rho_{12}|\le1.
$$

This check is **essential in Questions 2 and 8**, because the printed matrices violate it. We will preserve their stated numbers while separately explaining the resulting inconsistency.

**Zero determinant versus negative determinant:** zero can occur in a legitimate *singular* covariance matrix, when one variable is an exact linear combination of others. A **negative** determinant for a $2\times2$ symmetric covariance matrix with positive variances is not legitimate.

## 0.8 What does “normal distribution” mean?

The classic **univariate normal distribution** makes a symmetric bell-shaped curve. Write

$$
X\sim N(\mu,\sigma^2).
$$

This is read “X follows a normal distribution with mean $\mu$ and variance $\sigma^2$.” The symbol $\sim$ means “is distributed as.” Its density is

$$
f(x)=\frac{1}{\sqrt{2\pi\sigma^2}}
\exp\left[-\frac{(x-\mu)^2}{2\sigma^2}\right].
$$

Symbol by symbol:

- $x$ is an observed value or position on the horizontal axis.
- $\mu$ is the center of the bell curve.
- $\sigma^2$ is the variance; $\sigma=\sqrt{\sigma^2}$ is standard deviation.
- $\pi\approx3.14159265$ is a mathematical constant.
- $e\approx2.71828$ is another constant, and $\exp(z)$ means $e^z$.
- $(x-\mu)^2$ makes the distance from the mean nonnegative.
- The negative sign in the exponent makes density lower farther from the center.
- The factor outside $\exp$ normalizes the total area to one.

A **multivariate normal distribution** is the corresponding distribution for a whole random vector:

$$
\mathbf X\sim N_p(\boldsymbol\mu,\boldsymbol\Sigma).
$$

Here $p$ is the number of variables. $N_2$ is a *bivariate normal*, $N_3$ a *trivariate normal*, and $N_6$ a six-variate normal. A useful definition is: **every fixed linear combination of the components has a (possibly degenerate) univariate normal distribution.**

In two dimensions a normal distribution usually has oval-shaped equal-density contours. The center is $\boldsymbol\mu$, the oval widths depend on the variances, and their tilt depends on the correlation.

## 0.9 The geometry of standardized distance

Ordinary Euclidean distance treats one unit in any direction as equally important:

$$
d_E(\mathbf x,\mathbf y)
=\sqrt{\sum_{j=1}^p(x_j-y_j)^2}.
$$

But a difference of five units is much more surprising in a variable that typically fluctuates by one unit than in a variable that fluctuates by 100 units. Statistical or **Mahalanobis** distance corrects for both scale and correlation:

$$
D^2=(\mathbf x-\boldsymbol\mu)'\Sigma^{-1}(\mathbf x-\boldsymbol\mu).
$$

The $2$ in $D^2$ means **squared distance**, not “two dimensions.” The vector $\mathbf x-\boldsymbol\mu$ contains the differences from the center. $\Sigma^{-1}$ is the **inverse covariance matrix**, a matrix-based correction for spread and co-movement. The primes transpose a column vector into a row so multiplication works.

In the special case of two independent components with variances $4$ and $9$:

$$
\Sigma=\begin{bmatrix}4&0\\0&9\end{bmatrix},\quad
\Sigma^{-1}=\begin{bmatrix}1/4&0\\0&1/9\end{bmatrix},
$$

so

$$
D^2=\frac{(x_1-\mu_1)^2}{4}+\frac{(x_2-\mu_2)^2}{9}.
$$

This says “square the deviations **after accounting for their normal scales**, then add them.” With correlated components, extra cross-product terms appear. Question 1 asks you to expand precisely this kind of expression.

## 0.10 Four small matrix operations explained

### (a) Transpose

$$
\mathbf a=\begin{bmatrix}2\\1\end{bmatrix}
\Longrightarrow\mathbf a'=[2\ \ 1].
$$

The apostrophe $'$ swaps rows and columns. For an ordinary real-valued matrix this is the same as the superscript $T$.

### (b) Matrix multiplication

A $1\times2$ row times a $2\times1$ column produces one number:

$$
[2\ \ 1]\begin{bmatrix}5\\11\end{bmatrix}
=2(5)+1(11)=21.
$$

A $2\times2$ matrix times a $2\times1$ column produces a two-entry column:

$$
\begin{bmatrix}1&3\\3&5\end{bmatrix}
\begin{bmatrix}2\\1\end{bmatrix}
=\begin{bmatrix}1(2)+3(1)\\3(2)+5(1)\end{bmatrix}
=\begin{bmatrix}5\\11\end{bmatrix}.
$$

**Dimension rule:** The inner sizes must match. For example, $(2\times3)(3\times2)$ is possible and gives a $2\times2$ result, while $(2\times3)(2\times3)$ is not defined as ordinary matrix multiplication.

### (c) Matrix inverse

For $M=\begin{bmatrix}a&b\\c&d\end{bmatrix}$ with $ad-bc\ne0$:

$$
M^{-1}=\frac{1}{ad-bc}\begin{bmatrix}d&-b\\-c&a\end{bmatrix}.
$$

The inverse is the matrix analogue of “dividing by a number,” and satisfies $MM^{-1}=I$, where $I$ is the identity matrix. If the determinant is zero, this ordinary inverse does not exist. **An invertible symmetric matrix is not automatically a valid covariance matrix; its inverse can exist even if the matrix is statistically impossible.**

### (d) Quadratic form

A **quadratic form** has the pattern $\mathbf a'M\mathbf a$ and produces a single number. For a symmetric $2\times2$ matrix $M=\begin{bmatrix}m_{11}&m_{12}\\m_{12}&m_{22}\end{bmatrix}$:

$$
\begin{aligned}
\begin{bmatrix}u&v\end{bmatrix}
\begin{bmatrix}m_{11}&m_{12}\\m_{12}&m_{22}\end{bmatrix}
\begin{bmatrix}u\\v\end{bmatrix}
&=m_{11}u^2+2m_{12}uv+m_{22}v^2.
\end{aligned}
$$

**Why $2m_{12}uv$?** One cross-product comes from the upper-right entry, and one from the lower-left entry. Because the matrix is symmetric, they are equal, so we combine them into $2m_{12}uv$.

## 0.11 Rules for a linear combination of random variables

A **linear combination** means multiply each variable by a fixed number and add:

$$
Y=2X_1+X_2=\underbrace{[2\ \ 1]}_{\mathbf a'}\underbrace{\begin{bmatrix}X_1\\X_2\end{bmatrix}}_{\mathbf X}.
$$

For any variables with finite means and covariances:

$$
E(\mathbf a'\mathbf X)=\mathbf a'\boldsymbol\mu,
\qquad
\operatorname{Var}(\mathbf a'\mathbf X)=\mathbf a'\boldsymbol\Sigma\mathbf a.
$$

Why the variance formula? For $Y=aX_1+bX_2$, expanding the squared deviation gives

$$
\operatorname{Var}(Y)=a^2\sigma_{11}+2ab\sigma_{12}+b^2\sigma_{22}.
$$

The matrix expression $\mathbf a'\Sigma\mathbf a$ is a compact way to calculate exactly that. **Do not add variances without the covariance term unless the covariance is zero.**

If the original vector is genuinely multivariate normal, a linear combination is normal:

$$
\mathbf X\sim N_p(\boldsymbol\mu,\Sigma)
\Longrightarrow
\mathbf a'\mathbf X\sim N(\mathbf a'\boldsymbol\mu,\mathbf a'\Sigma\mathbf a).
$$

This is the central fact behind Questions 2 and 3. Its statistical conclusion requires a valid model, including a legitimate covariance matrix.

## 0.12 Transforming several variables at once

Sometimes we want two or more combinations simultaneously:

$$
\mathbf Y=A\mathbf X+\mathbf d.
$$

- $A$ is a matrix of **weights**; each row defines one new variable.
- $\mathbf d$ is a vector of **fixed constants** added afterward.
- The new mean is $A\boldsymbol\mu+\mathbf d$.
- The new covariance is $A\Sigma A'$; adding fixed constants cannot create variability.

For a genuine multivariate normal vector:

$$
\boxed{\mathbf Y\sim N_k(A\boldsymbol\mu+\mathbf d,\ A\Sigma A')}
$$

when $A$ has $k$ rows. This formula is the engine of Questions 4 and 5. Notice the order $A\Sigma A'$. Matrix multiplication generally does **not** commute: swapping the order is usually wrong or dimensionally impossible.

## 0.13 Independence and the special advantage of normal variables

Two variables $U$ and $V$ are **independent** when knowing one does not change the probability distribution of the other. Independence is stronger than “no linear association.”

For generic data, zero covariance does **not** prove independence. For example, let $U$ take values $-1,0,1$ equally often and set $V=U^2$. Then $\operatorname{Cov}(U,V)=0$, yet $V$ is completely determined by $U$. This is a **supplementary illustration**, not a PDF problem.

For a **jointly normal** vector, however, zero covariance between two components *does* imply their independence. More generally, two subvectors of a joint multivariate normal vector are independent if every cross-covariance entry between the groups is zero.

Key two-variable rule (only if they are jointly normal):

$$
\operatorname{Cov}(U,V)=0\quad\Longleftrightarrow\quad U\text{ and }V\text{ independent}.
$$

Questions 6 and 7 repeatedly use this theorem. Merely being individually normal is not enough; the pair must be **jointly** normal.

## 0.14 Chi-square distributions: a sum of squared standard normals

A **standard normal** variable has mean zero and variance one: $Z\sim N(0,1)$. A **chi-square distribution** with $p$ degrees of freedom is the distribution of a sum of $p$ independent squared standard normal variables:

$$
Z_1^2+Z_2^2+\cdots+Z_p^2\sim\chi_p^2.
$$

- $\chi$ is the Greek letter “chi,” pronounced *kai*.
- The subscript $p$ counts the **degrees of freedom**, here the number of independent standard normal squares being added.
- The superscript $2$ is part of the distribution's name; it does not mean there are two degrees of freedom.
- A chi-square statistic is **never negative**.
- If $Q\sim\chi_p^2$, then $E(Q)=p$ and $\operatorname{Var}(Q)=2p$.

For a **valid positive-definite** covariance matrix $\Sigma$, if $\mathbf X\sim N_p(\boldsymbol\mu,\Sigma)$, the standardized squared statistical distance satisfies

$$
(\mathbf X-\boldsymbol\mu)'\Sigma^{-1}(\mathbf X-\boldsymbol\mu)
\sim\chi_p^2.
$$

Intuition: matrix-based standardization turns the correlated vector into $p$ uncorrelated standard normals, which are independent in the normal case; the quadratic form becomes their sum of squares. Question 8 uses this rule, while Questions 9 and 10 extend it to sample means.

## 0.15 Sample means, sample covariance and sampling distributions

If we sample $n$ independent vectors $\mathbf X_1,\ldots,\mathbf X_n$ from the same population:

$$
\bar{\mathbf X}=\frac{1}{n}\sum_{i=1}^n\mathbf X_i.
$$

For every population with finite mean and covariance:

$$
E(\bar{\mathbf X})=\boldsymbol\mu,
\qquad \operatorname{Cov}(\bar{\mathbf X})=\frac{\Sigma}{n}.
$$

The second equation says averages are less variable than individual observations. For example, if a single measurement has variance 100, the mean of 25 independent observations has variance $100/25=4$.

For *normal* populations, the sample mean is **exactly** normal for any sample size:

$$
\bar{\mathbf X}\sim N_p\left(\boldsymbol\mu,\frac{\Sigma}{n}\right).
$$

The **sample covariance matrix** is calculated from observed data using

$$
S=\frac{1}{n-1}\sum_{i=1}^n
(\mathbf X_i-\bar{\mathbf X})(\mathbf X_i-\bar{\mathbf X})'.
$$

Its role is to estimate an unknown population covariance $\Sigma$. The denominator $n-1$ corrects for having estimated the population mean using the same sample. Dividing by $n-1$ also makes $S$ an unbiased estimator of $\Sigma$ under independent, identically distributed sampling.

**Important contrast:** $\Sigma$ describes the real population; $S$ is computed from a particular sample and varies from sample to sample.

## 0.16 Wishart distributions: the matrix version of a chi-square pattern

In one dimension, the sum of squared centered normal observations is related to a chi-square distribution. In many dimensions, the analogous object is a **sum-of-squares-and-cross-products matrix**:

$$
(n-1)S=\sum_{i=1}^n
(\mathbf X_i-\bar{\mathbf X})(\mathbf X_i-\bar{\mathbf X})'.
$$

If the $n$ sampled vectors are independent draws from $N_p(\boldsymbol\mu,\Sigma)$, then

$$
(n-1)S\sim W_p(\Sigma,n-1),
$$

where $W$ denotes a **Wishart distribution** and the second argument counts degrees of freedom. It describes the randomness of a whole covariance-like matrix, not a single number. Its mean is $E[(n-1)S]=(n-1)\Sigma$.

You do **not** need to memorize the complicated Wishart density for Question 9. You must understand what random object follows the distribution and where the $n-1$ comes from.

## 0.17 The multivariate central limit theorem and large-sample approximations

Even if individual observations are **not normal**, their average tends toward a normal distribution as sample size grows, subject to suitable conditions such as independence, a common distribution and finite covariance. The multivariate central limit theorem says

$$
\sqrt n(\bar{\mathbf X}-\boldsymbol\mu)
\overset{d}{\longrightarrow}N_p(\mathbf0,\Sigma).
$$

Read $\overset{d}{\longrightarrow}$ as “the distribution approaches.” For a sufficiently large sample, this is commonly expressed as

$$
\bar{\mathbf X}\approx N_p\left(\boldsymbol\mu,\frac{\Sigma}{n}\right).
$$

The approximation improves as $n$ increases, but its quality also depends on outliers, heavy tails, non-independence and the number of dimensions $p$. There is **no universal rule that $n=75$ is automatically large enough regardless of $p$**.

When $\Sigma$ is unknown, replacing it with $S$ gives a large-sample chi-square approximation. Under exact multivariate normal sampling and standard nonsingularity conditions, the **finite-sample** distribution is a scaled $F$ distribution instead. Question 10 asks you to distinguish these.

## 0.18 A hand-calculation checklist

For most questions, proceed in this order:

1. Read the problem and identify the **number of variables** $p$.
2. Copy the mean vector and covariance matrix carefully; check rows, columns and minus signs.
3. If you are given a purported covariance matrix, check whether it is valid.
4. Decide whether you need a **single** linear combination, a **vector** of combinations, a **marginal**, an **independence statement** or a **sampling distribution**.
5. Write the relevant theorem **before** inserting the numbers.
6. Calculate one matrix product at a time, showing the intermediate result.
7. State the **distribution family**, mean/covariance or degrees of freedom, and the assumptions required.
8. Compare the final answer with the lecturer's printed answer. Keep any disagreement visible.

***
# Question 1. Write a bivariate normal density and a squared statistical distance

**Source location:** PDF page 1. **Method:** hand calculations.

## Original question (faithfully reproduced)

> **Question 1**  
> Consider a bivariate normal distribution with $\mu_1=1$, $\mu_2=3$, $\sigma_{11}=2$, $\sigma_{22}=1$, and $\rho_{12}=-0.8$.
>
> (a) Write out the bivariate normal density.
>
> (b) Write out the squared statistical distance expression $(\mathbf x-\boldsymbol\mu)'\boldsymbol\Sigma^{-1}(\mathbf x-\boldsymbol\mu)$ as a quadratic function of $x_1$ and $x_2$.

## What is the question really asking?

We know the **center** of two related measurements, how much each varies, and how strongly they move in opposite directions. Part (a) asks us to write a formula for how densely probability is concentrated around any chosen pair of values $(x_1,x_2)$. Part (b) asks us to express the **squared distance from the center**, measured in units that account for spread and correlation.

The important lesson is that $\rho_{12}=-0.8$ tells us **correlation**, not covariance. We must convert it into covariance before constructing $\Sigma$.

## Foundations specifically needed for this question

**Mean vector**:

$$
\boldsymbol\mu=\begin{bmatrix}\mu_1\\\mu_2\end{bmatrix}
=\begin{bmatrix}1\\3\end{bmatrix}.
$$

**Standard deviations** (square roots of the given variances):

$$
\sigma_1=\sqrt{2}\approx1.414214,\qquad
\sigma_2=\sqrt1=1.
$$

**Covariance from correlation**:

$$
\begin{aligned}
\sigma_{12}&=\rho_{12}\sigma_1\sigma_2\\
&=(-0.8)(\sqrt2)(1)\\
&=-0.8\sqrt2\approx-1.131371.
\end{aligned}
$$

Therefore the covariance matrix is

$$
\boxed{\Sigma=\begin{bmatrix}2&-0.8\sqrt2\\-0.8\sqrt2&1\end{bmatrix}.}
$$

Its determinant is

$$
\begin{aligned}
|\Sigma|&=(2)(1)-(-0.8\sqrt2)^2\\
&=2-(0.64)(2)\\
&=2-1.28\\
&=\boxed{0.72}.
\end{aligned}
$$

Because the first variance is positive and the determinant is positive, this matrix is positive definite; the stated normal model is mathematically consistent. An intuitive reason the determinant is smaller than $2(1)$ is that the two variables overlap in information due to correlation.

## Question 1(a). Derive the density formula from the beginning

### Lecturer-provided solution

The source uses the standard two-variable normal density with the given means, variances and correlation:

$$
\begin{aligned}
f(x_1,x_2)&=\frac{1}{2\pi\sqrt{2(1)[1-(-0.8)^2]}}\\
&\quad\times\exp\Bigg\{-\frac{1}{2[1-(-0.8)^2]}
\Bigg[\left(\frac{x_1-1}{\sqrt2}\right)^2
+\left(\frac{x_2-3}{\sqrt1}\right)^2\\
&\hspace{76mm}-2(-0.8)
\left(\frac{x_1-1}{\sqrt2}\right)
\left(\frac{x_2-3}{\sqrt1}\right)\Bigg]\Bigg\}.
\end{aligned}
$$

The source simplifies this to

$$
\boxed{f(x_1,x_2)=\frac{1}{2\pi\sqrt{0.72}}\exp\left\{
-\frac{1}{0.72}\left[
\frac{(x_1-1)^2}{2}+(x_2-3)^2
+\frac{1.6}{\sqrt2}(x_1-1)(x_2-3)
\right]\right\}.}
$$

Both versions in the PDF are algebraically equivalent. Notice that the cross-product term is **positive inside the square brackets** because the correlation is negative; the overall exponent still has a negative sign in front of the bracket.

### Step 1: Understand the general bivariate-normal formula

For means $\mu_1,\mu_2$, standard deviations $\sigma_1,\sigma_2$, and correlation $\rho$, the formula is

$$
\begin{aligned}
f(x_1,x_2)&=\frac{1}{2\pi\sigma_1\sigma_2\sqrt{1-\rho^2}}\\
&\quad\times\exp\left\{-\frac{1}{2(1-\rho^2)}\left[
\left(\frac{x_1-\mu_1}{\sigma_1}\right)^2
+\left(\frac{x_2-\mu_2}{\sigma_2}\right)^2
-2\rho\left(\frac{x_1-\mu_1}{\sigma_1}\right)
\left(\frac{x_2-\mu_2}{\sigma_2}\right)
\right]\right\}.
\end{aligned}
$$

The pieces have different purposes:

1. $x_1-\mu_1$ and $x_2-\mu_2$ measure departures from the center.
2. Dividing by $\sigma_1$ and $\sigma_2$ measures departures relative to typical variability.
3. Squaring measures the size of each departure without cancelling negatives.
4. The $-2\rho$ cross-term adjusts for how the variables move together.
5. $1-\rho^2$ changes the geometry and normalizing factor to reflect dependence.
6. The exponential gives the bell-shaped decline in density away from the center.

### Step 2: Calculate the standardizing factor

$$
1-\rho^2=1-(-0.8)^2=1-0.64=\boxed{0.36}.
$$

Then

$$
\sigma_1\sigma_2\sqrt{1-\rho^2}
=\sqrt2\times1\times\sqrt{0.36}
=\sqrt2\times0.6=\sqrt{0.72}.
$$

The leading fraction becomes $1/(2\pi\sqrt{0.72})$. This is also the general multivariate-normal normalizer $1/(2\pi|\Sigma|^{1/2})$ when $p=2$.

### Step 3: Work through each term inside the brackets

First standardized square:

$$
\left(\frac{x_1-1}{\sqrt2}\right)^2
=\frac{(x_1-1)^2}{2}.
$$

Second standardized square:

$$
\left(\frac{x_2-3}{1}\right)^2=(x_2-3)^2.
$$

Cross-term:

$$
\begin{aligned}
-2(-0.8)\left(\frac{x_1-1}{\sqrt2}\right)(x_2-3)
&=+1.6\frac{x_1-1}{\sqrt2}(x_2-3)\\
&=\frac{1.6}{\sqrt2}(x_1-1)(x_2-3).
\end{aligned}
$$

Finally the outer multiplier is

$$
-\frac{1}{2(0.36)}=-\frac{1}{0.72}.
$$

Put all the pieces together: exactly the boxed source formula above.

### Step 4: Check the result at the center

At $(x_1,x_2)=(1,3)$ both deviations are zero. The exponent is therefore zero, and $\exp(0)=1$:

$$
\begin{aligned}
f(1,3)&=\frac{1}{2\pi\sqrt{0.72}}\\
&\approx\boxed{0.187566}.
\end{aligned}
$$

This is the **density at the center**, not the probability that we observe exactly $(1,3)$. For a continuous distribution, the probability of one exact point is zero.

As an additional check, at $(2,3)$ the first deviation is $1$ and the second is $0$:

$$
f(2,3)=\frac{1}{2\pi\sqrt{0.72}}\exp\left(-\frac{1}{1.44}\right)
\approx0.093661.
$$

This is lower than at the mean, as expected.

### A geometric intuition for negative correlation

If the first variable is above its average, a negative correlation suggests the second often lies below its average. Therefore, points on a descending diagonal may be quite *typical* even though both variables are away from their centers. The cross-product term reflects this direction-sensitive geometry.

## Question 1(b). Expand the squared statistical distance

### Lecturer-provided solution

The original gives

$$
\boxed{D^2=\frac{(x_1-1)^2}{0.72}
+\frac{(x_2-3)^2}{0.36}
+\frac{1.6}{0.36\sqrt2}(x_1-1)(x_2-3).}
$$

It does not show the full inverse-matrix derivation. We now derive it and show its agreement with the expression inside the density.

### Step 1: Invert the covariance matrix

We already found

$$
\Sigma=\begin{bmatrix}2&-0.8\sqrt2\\-0.8\sqrt2&1\end{bmatrix},
\qquad |\Sigma|=0.72.
$$

Use the inverse rule for a $2\times2$ matrix:

$$
\boxed{\Sigma^{-1}=\frac{1}{0.72}
\begin{bmatrix}1&+0.8\sqrt2\\+0.8\sqrt2&2\end{bmatrix}.}
$$

**Why did the off-diagonal minus sign become plus?** Inverting $\begin{bmatrix}a&b\\b&d\end{bmatrix}$ changes the signs of both off-diagonal entries. Here $b$ was negative, so $-b$ is positive.

### Step 2: Write the deviation vector

$$
\mathbf x-\mu=\begin{bmatrix}x_1-1\\x_2-3\end{bmatrix}.
$$

For the next few lines, let $u=x_1-1$ and $v=x_2-3$; these are just shorter names for the two deviations.

### Step 3: Multiply the matrices

$$
\begin{aligned}
D^2&=\begin{bmatrix}u&v\end{bmatrix}\left(
\frac{1}{0.72}\begin{bmatrix}1&0.8\sqrt2\\0.8\sqrt2&2\end{bmatrix}\right)
\begin{bmatrix}u\\v\end{bmatrix}\\
&=\frac{1}{0.72}\begin{bmatrix}u&v\end{bmatrix}
\begin{bmatrix}u+0.8\sqrt2\,v\\0.8\sqrt2\,u+2v\end{bmatrix}\\
&=\frac{1}{0.72}\big[u^2+0.8\sqrt2\,uv+0.8\sqrt2\,uv+2v^2\big]\\
&=\frac{u^2+1.6\sqrt2\,uv+2v^2}{0.72}.
\end{aligned}
$$

### Step 4: Replace $u$ and $v$, and match the PDF form

$$
D^2=\frac{(x_1-1)^2}{0.72}
+\frac{1.6\sqrt2}{0.72}(x_1-1)(x_2-3)
+\frac{2(x_2-3)^2}{0.72}.
$$

Notice $2/0.72=1/0.36$ and

$$
\frac{1.6\sqrt2}{0.72}
=\frac{1.6}{0.36\sqrt2}.
$$

Thus it is **exactly** the lecturer's answer.

### Step 5: Connect the distance to the density

The general two-variable normal density can be written very compactly:

$$
\boxed{f(\mathbf x)=\frac{1}{2\pi\sqrt{|\Sigma|}}
\exp\left(-\frac{D^2}{2}\right).}
$$

The **same** squared statistical distance appears in the exponent. That is why writing down a density and expanding a quadratic form are two versions of the same idea.

### A simple numerical check

At $(x_1,x_2)=(2,3)$, $u=1$ and $v=0$:

$$
D^2=\frac{1}{0.72}=\boxed{1.388889},
\qquad D=\sqrt{1.388889}\approx1.178511.
$$

The unsquared distance $D$ is different from the squared distance $D^2$ asked for in the question.

### Common mistakes in Question 1

- Putting $-0.8$ directly into the off-diagonal of $\Sigma$, instead of $-0.8\sqrt2$.
- Treating $\sigma_{11}=2$ as a standard deviation rather than a variance.
- Losing the plus sign in the cross-product when $\rho=-0.8$.
- Forgetting to square the standard deviations in the determinant.
- Omitting the factor $1/2$ from the exponent when using the $D^2$ expression.
- Calling a density value a probability.
- Reporting $\sqrt{D^2}$ when asked for the **squared** distance.

### Optional R verification (new; not in the lecturer's hand-calculation solution)

```r
mu <- c(1, 3)                    # Means of X1 and X2
rho <- -0.8                       # Correlation
sd1 <- sqrt(2)                   # SD, not variance, of X1
sd2 <- sqrt(1)                   # SD of X2
cov12 <- rho * sd1 * sd2         # Convert correlation to covariance
Sigma <- matrix(c(2, cov12,
                  cov12, 1), nrow = 2, byrow = TRUE)
det(Sigma)                       # Must be positive for this 2D case
solve(Sigma)                     # Inverse covariance matrix
x <- c(2, 3)                     # Supplementary example point
u <- x - mu                      # Vector of deviations
D2 <- as.numeric(t(u) %*% solve(Sigma) %*% u)
density_at_x <- exp(-D2 / 2) / (2 * pi * sqrt(det(Sigma)))
D2
density_at_x
```

`c()` combines numbers into a vector; `matrix()` arranges them into rows and columns; `%*%` is **matrix multiplication**; `t()` transposes; `solve()` computes a matrix inverse; `as.numeric()` turns a one-cell matrix into a number. The calculations match $D^2=1.388889$ and density $\approx0.093661$.

***

# Question 2. Distribution of $2X_1+X_2$, and why the covariance matrix matters

**Source location:** PDF pages 1–2. **Method:** hand calculations.

## Original question (faithfully reproduced)

> **Question 2**  
> Let $\mathbf X$ be $N_2(\boldsymbol\mu,\boldsymbol\Sigma)$ with
>
> $$
> \boldsymbol\mu=\begin{bmatrix}1\\3\end{bmatrix}
> \quad\text{and}\quad
> \boldsymbol\Sigma=\begin{bmatrix}1&3\\3&5\end{bmatrix}.
> $$
>
> Find the distribution of $\mathbf a'\mathbf X$, where $\mathbf a'=[2,1]$.

## What is the question asking?

Make a new score by giving the first measurement **twice** the weight of the second, then adding. What would be the mean and variance of that combined score? If the starting model is valid multivariate normal, the new score has a normal distribution.

## Lecturer-provided solution, faithfully recorded

The worksheet first writes

$$
\mathbf a'\mathbf X=[2\ \ 1]
\begin{bmatrix}X_1\\X_2\end{bmatrix}
=2X_1+X_2.
$$

It calculates the mean as

$$
\mathbf a'\boldsymbol\mu=[2\ \ 1]
\begin{bmatrix}1\\3\end{bmatrix}=2+3=5.
$$

It calculates the variance as

$$
\mathbf a'\boldsymbol\Sigma\mathbf a=
[2\ \ 1]\begin{bmatrix}1&3\\3&5\end{bmatrix}
\begin{bmatrix}2\\1\end{bmatrix}=21.
$$

**But its final printed line says:** $2X_1+X_2\sim N(5,12)$. The $12$ contradicts its own calculation of $21$.

## Guided calculation from scratch

### Step 1: Identify the weight vector

The row $[2,1]$ says “take two copies of $X_1$ and one copy of $X_2$.” Its transpose is $\mathbf a=[2,1]'$.

### Step 2: Compute the mean

Using the rule for a linear combination:

$$
\begin{aligned}
E(2X_1+X_2)&=2E(X_1)+E(X_2)\\
&=2(1)+1(3)\\
&=\boxed{5}.
\end{aligned}
$$

The mean of a weighted sum is the same weighted sum of the means.

### Step 3: Compute the variance using ordinary numbers

$$
\begin{aligned}
\operatorname{Var}(2X_1+X_2)
&=2^2\sigma_{11}+1^2\sigma_{22}+2(2)(1)\sigma_{12}\\
&=4(1)+1(5)+4(3)\\
&=4+5+12\\
&=\boxed{21}.
\end{aligned}
$$

The $12$ on the third line is **the contribution of the covariance term**, not the variance of the whole sum. It cannot replace $4+5+12$.

### Step 4: Verify the same answer by matrix multiplication

First multiply the covariance matrix by the weight column:

$$
\begin{bmatrix}1&3\\3&5\end{bmatrix}
\begin{bmatrix}2\\1\end{bmatrix}
=\begin{bmatrix}1(2)+3(1)\\3(2)+5(1)\end{bmatrix}
=\begin{bmatrix}5\\11\end{bmatrix}.
$$

Then multiply by the weight row:

$$
[2\ \ 1]\begin{bmatrix}5\\11\end{bmatrix}=2(5)+1(11)=\boxed{21}.
$$

So **the correct algebraic value is 21, not 12**.

## Essential source discrepancy: this covariance matrix cannot belong to a real distribution

The arithmetic issue is not the only one. Consider

$$
\Sigma=\begin{bmatrix}1&3\\3&5\end{bmatrix}.
$$

Its determinant is

$$
|\Sigma|=1(5)-3^2=5-9=\boxed{-4}.
$$

A covariance matrix cannot have this negative determinant. Another simple test is the implied correlation:

$$
\rho_{12}=\frac{3}{\sqrt1\sqrt5}=\frac3{\sqrt5}\approx1.341641>1.
$$

A correlation greater than one is impossible. We can even find a “variance” that would be negative if we treated this matrix as genuine. For $Z=3X_1-X_2$:

$$
\begin{aligned}
\operatorname{Var}(Z)&=9(1)+1(5)+2(3)(-1)(3)\\
&=9+5-18\\
&=\boxed{-4}.
\end{aligned}
$$

A negative variance is impossible because squared deviations cannot have a negative average. Therefore **there does not exist a real random vector $\mathbf X$ with this stated covariance matrix**, and in particular no $N_2(\mu,\Sigma)$ model of the form printed in the question.

### What answer should a careful student give?

- **Source-reported answer:** $N(5,12)$.
- **Correct formal mean and variance calculations from the printed entries:** $5$ and $21$.
- **Most important mathematical qualification:** Since the printed $\Sigma$ is invalid, **it is not legitimate to conclude** that the requested variable truly has distribution $N(5,21)$. That notation describes what the usual transformation rule *would formally suggest* if the starting covariance were valid, but no such starting normal vector exists.

When studying or discussing this question, explain **both** discrepancies instead of silently substituting an answer.

### Supplementary example showing how a corrected question could work

If we changed **only for illustration** the lower-right variance from $5$ to $10$, then

$$
\Sigma_{\text{illustration}}=\begin{bmatrix}1&3\\3&10\end{bmatrix},
\qquad |\Sigma_{\text{illustration}}|=10-9=1>0.
$$

That *hypothetical*, valid model would give

$$
\operatorname{Var}(2X_1+X_2)=4+12+10=26,
\quad 2X_1+X_2\sim N(5,26).
$$

**This is not a replacement for any source number.** It shows how checking a covariance matrix first keeps the probability statement meaningful.

### Common mistakes in Question 2

- Copying the worksheet's final $12$ without checking $4+5+12$.
- Believing a positive final quadratic form for **one** weight vector proves the covariance matrix is valid for **every** weight vector.
- Forgetting the covariance contribution $2ab\sigma_{12}$.
- Confusing mean $5$ with variance $5$.
- Claiming $N(5,21)$ is a genuine distribution derived from the specified model despite the impossible $\Sigma$.

### Optional R check

```r
mu <- c(1, 3)
Sigma <- matrix(c(1, 3,
                  3, 5), nrow = 2, byrow = TRUE)
a <- c(2, 1)
mean_formal <- sum(a * mu)               # 5
variance_formal <- as.numeric(t(a) %*% Sigma %*% a)  # 21
determinant <- det(Sigma)                # -4: invalid covariance
implied_correlation <- Sigma[1, 2] / sqrt(Sigma[1, 1] * Sigma[2, 2])
eigen(Sigma, symmetric = TRUE)$values  # One negative eigenvalue
mean_formal
variance_formal
determinant
implied_correlation
```

The calculation of $21$ is valid **as matrix arithmetic**. This code does **not** simulate from the defective multivariate normal model.

***

# Question 3. A trivariate linear combination, then adding a constant

**Source location:** PDF page 2. **Method:** hand calculations.

## Original question (faithfully reproduced)

> **Question 3**  
> Let $\mathbf X$ be $N_3(\boldsymbol\mu,\boldsymbol\Sigma)$ with
>
> $$
> \boldsymbol\mu=\begin{bmatrix}2\\-3\\1\end{bmatrix}
> \quad\text{and}\quad
> \boldsymbol\Sigma=\begin{bmatrix}1&1&1\\1&3&2\\1&2&2\end{bmatrix}.
> $$
>
> (a) Find the distribution of $3X_1-2X_2+X_3$.
>
> (b) Find the distribution of $3X_1-2X_2+X_3+5$.

## What is different from Question 2?

Here there are three variables instead of two, and one weight is **negative**. The negative weight means subtract twice the second variable. Part (b) adds the constant 5 after forming the combination. A constant will move the average but cannot change the spread.

The given covariance matrix is mathematically valid: its leading principal minors are $1$, $1(3)-1^2=2$, and $|\Sigma|=1$, all positive.

## Question 3(a). Distribution of $3X_1-2X_2+X_3$

### Lecturer-provided solution

The worksheet identifies $\mathbf a'=[3,-2,1]$, finds the mean $\mathbf a'\mu=13$, finds the variance $\mathbf a'\Sigma\mathbf a=9$, and concludes

$$
\boxed{3X_1-2X_2+X_3\sim N(13,9).}
$$

### Step 1: Convert the expression into a matrix product

$$
Y=3X_1-2X_2+X_3
=\begin{bmatrix}3&-2&1\end{bmatrix}
\begin{bmatrix}X_1\\X_2\\X_3\end{bmatrix}.
$$

Thus $\mathbf a=[3,-2,1]'$. The three weights are $3$, $-2$ and $1$, in that order.

### Step 2: Calculate the mean one term at a time

$$
\begin{aligned}
E(Y)&=3\mu_1-2\mu_2+\mu_3\\
&=3(2)-2(-3)+1(1)\\
&=6+6+1\\
&=\boxed{13}.
\end{aligned}
$$

**Watch the double negative**: $-2(-3)=+6$. Negative weights do not make a mean automatically negative.

### Step 3: Calculate $\Sigma\mathbf a$ before finishing the variance

$$
\begin{aligned}
\Sigma\mathbf a
&=\begin{bmatrix}1&1&1\\1&3&2\\1&2&2\end{bmatrix}
\begin{bmatrix}3\\-2\\1\end{bmatrix}\\
&=\begin{bmatrix}1(3)+1(-2)+1(1)\\1(3)+3(-2)+2(1)\\1(3)+2(-2)+2(1)\end{bmatrix}\\
&=\begin{bmatrix}3-2+1\\3-6+2\\3-4+2\end{bmatrix}\\
&=\boxed{\begin{bmatrix}2\\-1\\1\end{bmatrix}}.
\end{aligned}
$$

### Step 4: Multiply by $\mathbf a'$ to find the variance

$$
\begin{aligned}
\operatorname{Var}(Y)&=\mathbf a'\Sigma\mathbf a\\
&=[3\ \ -2\ \ 1]\begin{bmatrix}2\\-1\\1\end{bmatrix}\\
&=3(2)+(-2)(-1)+1(1)\\
&=6+2+1\\
&=\boxed{9}.
\end{aligned}
$$

### Step 5: Check with a completely expanded scalar formula

For three variables, the variance of $a_1X_1+a_2X_2+a_3X_3$ is

$$
\begin{aligned}
& a_1^2\sigma_{11}+a_2^2\sigma_{22}+a_3^2\sigma_{33}\\
&\quad+2a_1a_2\sigma_{12}
+2a_1a_3\sigma_{13}+2a_2a_3\sigma_{23}.
\end{aligned}
$$

Substitute $a_1=3$, $a_2=-2$, $a_3=1$:

$$
\begin{aligned}
\operatorname{Var}(Y)
&=3^2(1)+(-2)^2(3)+1^2(2)\\
&\quad+2(3)(-2)(1)+2(3)(1)(1)+2(-2)(1)(2)\\
&=9+12+2-12+6-8\\
&=\boxed{9}.
\end{aligned}
$$

Two different calculation methods agree, which is a useful error check.

### Step 6: State the distribution, including the standard deviation

A fixed linear combination of a genuinely multivariate normal vector is normal. Therefore

$$
Y\sim\boxed{N(13,9)},\qquad E(Y)=13,
\quad\operatorname{SD}(Y)=\sqrt9=3.
$$

An ordinary-language interpretation: the combined score is centered at 13, with a standard deviation of 3. That is what $N(13,9)$ means; the number 9 is **variance**, not standard deviation.

## Question 3(b). Add 5 to the same combination

### Lecturer-provided solution and a labelling correction

The PDF correctly says the new mean is $13+5=18$ and the variance remains $9$. But its last line writes $3X_1-2X_2+X_3\sim N(18,9)$, omitting the $+5$ from the random variable on the left.

The **correctly labelled** conclusion is

$$
\boxed{3X_1-2X_2+X_3+5\sim N(18,9).}
$$

### Why does adding a constant change only the mean?

Let $Z=Y+5$. By the expected-value rule,

$$
E(Z)=E(Y+5)=E(Y)+5=13+5=\boxed{18}.
$$

Now look at the deviation from the new mean:

$$
Z-E(Z)=(Y+5)-(13+5)=Y-13.
$$

Notice that the two $5$s cancel. Thus

$$
\operatorname{Var}(Z)
=E\{[Z-E(Z)]^2\}
=E[(Y-13)^2]=\operatorname{Var}(Y)=\boxed{9}.
$$

**Every value moves five units to the right, but the distances between values do not change.** This is why the spread remains the same.

### Exam-friendly distinction

| Expression | Mean | Variance | Distribution |
|---|---:|---:|---|
| $3X_1-2X_2+X_3$ | $13$ | $9$ | $N(13,9)$ |
| $3X_1-2X_2+X_3+5$ | $18$ | $9$ | $N(18,9)$ |
| $2(3X_1-2X_2+X_3)$, supplementary comparison | $26$ | $36$ | $N(26,36)$ |

The third row is **not a source question**. It shows that multiplying by 2 is different from adding 5: multiplying scales the variance by $2^2=4$.

### Optional R verification

```r
mu <- c(2, -3, 1)
Sigma <- matrix(c(1, 1, 1,
                  1, 3, 2,
                  1, 2, 2), nrow = 3, byrow = TRUE)
a <- c(3, -2, 1)
mean_Y <- sum(a * mu)
Sigma_times_a <- Sigma %*% a
variance_Y <- as.numeric(t(a) %*% Sigma %*% a)
mean_Z <- mean_Y + 5
variance_Z <- variance_Y
mean_Y
Sigma_times_a
variance_Y
mean_Z
variance_Z
```

Read the expected numerical values as: $13$, the intermediate vector $(2,-1,1)'$, $9$, $18$, and $9$.

***
# Question 4. Transform a three-dimensional normal vector into new measurements

**Source location:** PDF pages 2–3. **Method:** hand calculations.

## Original question (faithfully reproduced)

> **Question 4**  
> Let $\mathbf X$ be $N_3(\boldsymbol\mu,\boldsymbol\Sigma)$ with
>
> $$
> \boldsymbol\mu=\begin{bmatrix}1\\1\\2\end{bmatrix},\qquad
> \boldsymbol\Sigma=\begin{bmatrix}1&1&1\\1&2&1\\1&1&3\end{bmatrix}.
> $$
>
> (a) Find the distribution of
> $$
> \begin{bmatrix}X_1-X_2\\X_1-X_3\end{bmatrix}.
> $$
>
> (b) Find the distribution of
> $$
> \begin{bmatrix}X_1+1\\X_2\\X_3-1\end{bmatrix}.
> $$

## Understand the two different jobs

Part (a) creates **two new variables that are differences**. For example, one might compare two measurements of a product: $X_1-X_2$ measures how much the first exceeds the second. We care about the joint distribution of *both differences together*.

Part (b) simply shifts the original measurements: add one to the first, leave the second unchanged, subtract one from the third. **Shifting a variable moves its center without changing its variance or covariance.**

## Question 4(a). Distribution of two differences

### Lecturer-provided solution

The worksheet uses

$$
A=\begin{bmatrix}1&-1&0\\1&0&-1\end{bmatrix},
$$

finds $A\mu=[0,-1]'$ and $A\Sigma A'=\begin{bmatrix}1&0\\0&2\end{bmatrix}$, and gives

$$
\boxed{\begin{bmatrix}X_1-X_2\\X_1-X_3\end{bmatrix}
\sim N_2\left(\begin{bmatrix}0\\-1\end{bmatrix},
\begin{bmatrix}1&0\\0&2\end{bmatrix}\right).}
$$

### Step 1: Build the transformation matrix from the requested expressions

Let

$$
Y_1=X_1-X_2=1X_1+(-1)X_2+0X_3,
$$

$$
Y_2=X_1-X_3=1X_1+0X_2+(-1)X_3.
$$

Each **row** in $A$ contains one set of weights:

$$
\begin{bmatrix}Y_1\\Y_2\end{bmatrix}
=\underbrace{\begin{bmatrix}1&-1&0\\1&0&-1\end{bmatrix}}_{A}\underbrace{
\begin{bmatrix}X_1\\X_2\\X_3\end{bmatrix}}_{\mathbf X}.
$$

The dimensions match: $(2\times3)(3\times1)$ gives a $(2\times1)$ result. Because there are **two output variables**, the resulting distribution will have subscript $2$, even though the original vector has three variables.

### Step 2: Calculate the new mean

$$
\begin{aligned}
A\mu&=\begin{bmatrix}1&-1&0\\1&0&-1\end{bmatrix}
\begin{bmatrix}1\\1\\2\end{bmatrix}\\
&=\begin{bmatrix}1(1)-1(1)+0(2)\\1(1)+0(1)-1(2)\end{bmatrix}\\
&=\boxed{\begin{bmatrix}0\\-1\end{bmatrix}}.
\end{aligned}
$$

The first difference averages zero, while the second difference averages $-1$. That does not mean every first difference is zero; it means the distribution of that difference is centered at zero.

### Step 3: Compute $A'$ and $\Sigma A'$

$$
A'=\begin{bmatrix}1&1\\-1&0\\0&-1\end{bmatrix}.
$$

Compute the first column of $\Sigma A'$ using $(1,-1,0)'$:

$$
\begin{bmatrix}1&1&1\\1&2&1\\1&1&3\end{bmatrix}
\begin{bmatrix}1\\-1\\0\end{bmatrix}
=\begin{bmatrix}1-1+0\\1-2+0\\1-1+0\end{bmatrix}
=\begin{bmatrix}0\\-1\\0\end{bmatrix}.
$$

The second column uses $(1,0,-1)'$:

$$
\begin{bmatrix}1&1&1\\1&2&1\\1&1&3\end{bmatrix}
\begin{bmatrix}1\\0\\-1\end{bmatrix}
=\begin{bmatrix}1+0-1\\1+0-1\\1+0-3\end{bmatrix}
=\begin{bmatrix}0\\0\\-2\end{bmatrix}.
$$

Combining both columns,

$$
\boxed{\Sigma A'=\begin{bmatrix}0&0\\-1&0\\0&-2\end{bmatrix}.}
$$

### Step 4: Multiply on the left by $A$

$$
\begin{aligned}
A\Sigma A'
&=\begin{bmatrix}1&-1&0\\1&0&-1\end{bmatrix}
\begin{bmatrix}0&0\\-1&0\\0&-2\end{bmatrix}\\
&=\begin{bmatrix}
1(0)+(-1)(-1)+0(0)&1(0)+(-1)(0)+0(-2)\\
1(0)+0(-1)+(-1)(0)&1(0)+0(0)+(-1)(-2)
\end{bmatrix}\\
&=\boxed{\begin{bmatrix}1&0\\0&2\end{bmatrix}}.
\end{aligned}
$$

### Step 5: Explain the entries in ordinary words

- $\operatorname{Var}(Y_1)=1$: the difference $X_1-X_2$ has variance 1.
- $\operatorname{Var}(Y_2)=2$: the difference $X_1-X_3$ has variance 2.
- $\operatorname{Cov}(Y_1,Y_2)=0$: these two differences have zero covariance.
- Because the vector $(Y_1,Y_2)'$ is jointly normal, **these two new differences are independent**, despite sharing the original variable $X_1$.

Sharing a symbol does not automatically mean the resulting differences are dependent; covariance calculations determine whether their random parts cancel.

### Alternative scalar covariance check

$$
\begin{aligned}
\operatorname{Var}(X_1-X_2)&=1+2-2(1)=1,\\
\operatorname{Var}(X_1-X_3)&=1+3-2(1)=2,\\
\operatorname{Cov}(X_1-X_2,X_1-X_3)
&=\sigma_{11}-\sigma_{13}-\sigma_{21}+\sigma_{23}\\
&=1-1-1+1=0.
\end{aligned}
$$

This independent method confirms the matrix result.

## Question 4(b). Shift the components by constants

### Lecturer-provided solution

The worksheet writes

$$
\begin{bmatrix}X_1+1\\X_2\\X_3-1\end{bmatrix}
=\mathbf X+\underbrace{\begin{bmatrix}1\\0\\-1\end{bmatrix}}_{\mathbf d},
$$

and concludes

$$
\boxed{\begin{bmatrix}X_1+1\\X_2\\X_3-1\end{bmatrix}
\sim N_3\left(\begin{bmatrix}2\\1\\1\end{bmatrix},
\begin{bmatrix}1&1&1\\1&2&1\\1&1&3\end{bmatrix}\right).}
$$

### Step 1: Identify the shift vector

The first change is $+1$, the second is $+0$, and the third is $-1$, so $\mathbf d=[1,0,-1]'$.

### Step 2: Find the new mean

$$
\mu+\mathbf d
=\begin{bmatrix}1\\1\\2\end{bmatrix}
+\begin{bmatrix}1\\0\\-1\end{bmatrix}
=\begin{bmatrix}1+1\\1+0\\2-1\end{bmatrix}
=\boxed{\begin{bmatrix}2\\1\\1\end{bmatrix}}.
$$

### Step 3: Show why the covariance matrix stays the same

Let $\mathbf Y=\mathbf X+\mathbf d$. Its centered form is

$$
\mathbf Y-E(\mathbf Y)
=(\mathbf X+\mathbf d)-(\mu+\mathbf d)
=\mathbf X-\mu.
$$

Consequently the centered products, and therefore the covariances, are exactly unchanged:

$$
\operatorname{Cov}(\mathbf Y)=\operatorname{Cov}(\mathbf X)=\Sigma.
$$

A good mental picture is picking up an entire cloud of points and moving it one step right or up. Its **location** changes, but its shape, orientation and internal distances do not.

### Common mistakes in Question 4

- Using a $3\times2$ matrix for part (a) instead of the $2\times3$ matrix containing the weights as **rows**.
- Replacing $A\Sigma A'$ with $A'\Sigma A$, which has incorrect dimensions here.
- Assuming the transformed covariance is zero because two original means happen to be equal.
- Forgetting the off-diagonal covariance in a difference-of-variables calculation.
- Squaring the constants $+1$ and $-1$ and adding them to the variances; **constants have variance zero**.
- Saying the two differences are independent without mentioning that their **joint** normality makes zero covariance sufficient.

### Optional R verification

```r
mu <- c(1, 1, 2)
Sigma <- matrix(c(1, 1, 1,
                  1, 2, 1,
                  1, 1, 3), nrow = 3, byrow = TRUE)
A <- matrix(c(1, -1, 0,
              1,  0, -1), nrow = 2, byrow = TRUE)
new_mean_a <- as.vector(A %*% mu)
new_cov_a <- A %*% Sigma %*% t(A)
d <- c(1, 0, -1)
new_mean_b <- mu + d
new_cov_b <- Sigma
new_mean_a
new_cov_a
new_mean_b
new_cov_b
```

Use `t(A)` for transpose; `A %*% Sigma %*% t(A)` computes the covariance of the two differences; `as.vector()` removes unneeded matrix dimensions from the mean.

***

# Question 5. Joint transformation and marginal distributions

**Source location:** PDF pages 3–4. **Method:** hand calculations.

## Original question (faithfully reproduced)

> **Question 5**  
> Let $\mathbf X$ be $N_3(\boldsymbol\mu,\boldsymbol\Sigma)$ with
>
> $$
> \boldsymbol\mu=\begin{bmatrix}2\\-1\\4\end{bmatrix},
> \qquad\boldsymbol\Sigma=
> \begin{bmatrix}1&-2&0\\-2&5&0\\0&0&2\end{bmatrix}.
> $$
>
> (a) Find the joint distribution of $X_2$ and $X_2-3X_1-X_3$.
>
> (b) Find the distribution of $\begin{bmatrix}X_1\\X_3\end{bmatrix}$.
>
> (b) Find the distribution of $X_2$.

**Original-numbering note:** The PDF labels **both** of its final two parts “(b).” This guide retains that wording above. For easy reference, the second “(b)” is sometimes called **5(c)** below. That relabelling is an editorial navigation aid, not a change to the source.

## What is the question asking?

- In (a), build a two-variable vector consisting of the original $X_2$ and a weighted combination of all three variables. Give the new **joint** normal distribution.
- In the first (b), keep only components $X_1$ and $X_3$. Give their **joint marginal** distribution.
- In the second (b), keep only $X_2$ and find its one-variable **marginal** distribution.

A **marginal** distribution means “focus on a subset of variables and ignore the others,” not “substitute zeros for the variables being ignored.”

## Question 5(a). Find the distribution of $(X_2, X_2-3X_1-X_3)'$

### Lecturer-provided solution

The source uses

$$
A=\begin{bmatrix}0&1&0\\-3&1&-1\end{bmatrix},
\qquad A\mu=\begin{bmatrix}-1\\-11\end{bmatrix},
\qquad A\Sigma A'=\begin{bmatrix}5&11\\11&28\end{bmatrix}.
$$

Its final answer is

$$
\boxed{\begin{bmatrix}X_2\\X_2-3X_1-X_3\end{bmatrix}
\sim N_2\left(
\begin{bmatrix}-1\\-11\end{bmatrix},
\begin{bmatrix}5&11\\11&28\end{bmatrix}
\right).}
$$

### Step 1: Write the output variables as weighted sums

$$
Y_1=X_2=0X_1+1X_2+0X_3,
$$

$$
Y_2=X_2-3X_1-X_3=-3X_1+1X_2-1X_3.
$$

Thus

$$
\begin{bmatrix}Y_1\\Y_2\end{bmatrix}=
\underbrace{\begin{bmatrix}0&1&0\\-3&1&-1\end{bmatrix}}_{A}\mathbf X.
$$

### Step 2: Calculate both mean entries

For $Y_1$,

$$
E(Y_1)=E(X_2)=\boxed{-1}.
$$

For $Y_2$,

$$
\begin{aligned}
E(Y_2)&=-3\mu_1+\mu_2-\mu_3\\
&=-3(2)+(-1)-4\\
&=-6-1-4\\
&=\boxed{-11}.
\end{aligned}
$$

So $A\mu=[-1,-11]'$. This explicitly shows the reason for each component of the lecturer's mean vector.

### Step 3: Form the transpose of $A$

$$
A'=\begin{bmatrix}0&-3\\1&1\\0&-1\end{bmatrix}.
$$

### Step 4: Multiply $\Sigma A'$ column by column

First column, $(0,1,0)'$:

$$
\begin{bmatrix}1&-2&0\\-2&5&0\\0&0&2\end{bmatrix}
\begin{bmatrix}0\\1\\0\end{bmatrix}
=\begin{bmatrix}-2\\5\\0\end{bmatrix}.
$$

Second column, $(-3,1,-1)'$:

$$
\begin{aligned}
\begin{bmatrix}1&-2&0\\-2&5&0\\0&0&2\end{bmatrix}
\begin{bmatrix}-3\\1\\-1\end{bmatrix}
&=\begin{bmatrix}1(-3)+(-2)(1)+0(-1)\\(-2)(-3)+5(1)+0(-1)\\0(-3)+0(1)+2(-1)\end{bmatrix}\\
&=\begin{bmatrix}-3-2\\6+5\\-2\end{bmatrix}
=\begin{bmatrix}-5\\11\\-2\end{bmatrix}.
\end{aligned}
$$

Therefore

$$
\boxed{\Sigma A'=\begin{bmatrix}-2&-5\\5&11\\0&-2\end{bmatrix}.}
$$

### Step 5: Complete the covariance product

$$
\begin{aligned}
A\Sigma A'&=
\begin{bmatrix}0&1&0\\-3&1&-1\end{bmatrix}
\begin{bmatrix}-2&-5\\5&11\\0&-2\end{bmatrix}\\
&=\begin{bmatrix}
0(-2)+1(5)+0(0)&0(-5)+1(11)+0(-2)\\
(-3)(-2)+1(5)+(-1)(0)&(-3)(-5)+1(11)+(-1)(-2)
\end{bmatrix}\\
&=\begin{bmatrix}5&11\\6+5&15+11+2\end{bmatrix}\\
&=\boxed{\begin{bmatrix}5&11\\11&28\end{bmatrix}}.
\end{aligned}
$$

### Step 6: Independently check every covariance entry

**Variance of $Y_1$:** $Y_1=X_2$, so $\operatorname{Var}(Y_1)=5$.

**Covariance of $Y_1$ and $Y_2$:**

$$
\begin{aligned}
\operatorname{Cov}(X_2,X_2-3X_1-X_3)
&=\operatorname{Var}(X_2)-3\operatorname{Cov}(X_2,X_1)-\operatorname{Cov}(X_2,X_3)\\
&=5-3(-2)-0\\
&=\boxed{11}.
\end{aligned}
$$

**Variance of $Y_2$:** its weights are $(-3,1,-1)$, so

$$
\begin{aligned}
\operatorname{Var}(Y_2)
&=(-3)^2(1)+1^2(5)+(-1)^2(2)\\
&\quad+2(-3)(1)(-2)+2(-3)(-1)(0)+2(1)(-1)(0)\\
&=9+5+2+12+0+0\\
&=\boxed{28}.
\end{aligned}
$$

All entries match the matrix calculation and the original answer.

### What does this new covariance matrix tell us?

The first variable has mean $-1$ and variance $5$. The second has mean $-11$ and variance $28$. Their covariance is positive $11$, so their random deviations tend to move in the same direction. Their correlation is

$$
\rho_{Y_1,Y_2}=\frac{11}{\sqrt5\sqrt{28}}=\frac{11}{\sqrt{140}}\approx0.92967.
$$

The correlation value is **supplementary**, not shown in the original PDF. It gives a more intuitive unit-free description of the strong positive association.

## Question 5(b), first occurrence. Marginal distribution of $(X_1,X_3)'$

### Lecturer-provided solution

The PDF rearranges the three variables to place $X_1$ and $X_3$ together and gives

$$
\boxed{\begin{bmatrix}X_1\\X_3\end{bmatrix}
\sim N_2\left(\begin{bmatrix}2\\4\end{bmatrix},
\begin{bmatrix}1&0\\0&2\end{bmatrix}\right).}
$$

### Step 1: Select the correct mean entries

Originally, $\mu=[2,-1,4]'$. Retain the **first** and **third** components:

$$
\mu_{(1,3)}=\begin{bmatrix}\mu_1\\\mu_3\end{bmatrix}
=\boxed{\begin{bmatrix}2\\4\end{bmatrix}}.
$$

Do not average the components and do not keep $-1$ just because it lies in the middle.

### Step 2: Select the matching rows and columns of the covariance matrix

The variance of $X_1$ is row 1, column 1: $\sigma_{11}=1$. The variance of $X_3$ is row 3, column 3: $\sigma_{33}=2$. Their covariance is row 1, column 3 (or row 3, column 1): $\sigma_{13}=\sigma_{31}=0$.

Therefore

$$
\Sigma_{(1,3)}=\boxed{\begin{bmatrix}1&0\\0&2\end{bmatrix}}.
$$

**Why may we simply select entries?** The marginal of a jointly normal vector is also normal, and the mean and covariance of its retained components are just the matching pieces of the original mean and covariance.

### Step 3: Interpret independence

Since the covariance is zero and the two retained variables are **jointly normal**, $X_1$ and $X_3$ are independent. This is not an assumption; it follows from their joint distribution and the zero off-diagonal entry.

### Optional alternative using a selection matrix

Define

$$
A_{13}=\begin{bmatrix}1&0&0\\0&0&1\end{bmatrix}.
$$

Then $A_{13}\mathbf X=[X_1,X_3]'$, and $A_{13}\mu=[2,4]'$, $A_{13}\Sigma A_{13}'=\begin{bmatrix}1&0\\0&2\end{bmatrix}$. So *taking a marginal* can also be viewed as a special linear transformation that selects certain rows.

## Question 5(b), second occurrence (5(c) in this guide). Marginal distribution of $X_2$

### Lecturer-provided solution

$$
\boxed{X_2\sim N(-1,5).}
$$

### Explanation

Read the second component of the mean vector: $\mu_2=-1$. Read row 2, column 2 of the covariance matrix: $\sigma_{22}=5$. Since a component of a multivariate normal vector is normally distributed, it follows that

$$
X_2\sim N(\mu_2,\sigma_{22})=N(-1,5).
$$

Its standard deviation is $\sqrt5\approx2.236$, not 5. Nothing about this question asks for a conditional distribution of $X_2$ **given** $X_1$ or $X_3$. It is an **unconditional marginal**.

### Common mistakes in Question 5

- Forgetting that the first row of $A$ for part (a) is $[0,1,0]$, not $[1,0,0]$.
- Writing the mean of $X_2-3X_1-X_3$ as $-1-3(2)+4$ rather than $-1-3(2)-4$.
- Computing a covariance matrix with mismatched row/column order, or a nonsymmetric result.
- Returning only separate normal distributions in part (a) when the question asks for the **joint** distribution and hence requires covariance between them.
- Assuming $X_1$ and $X_3$ are dependent because both are components of the same vector. Their covariance is actually zero.
- Confusing a **marginal distribution** with a **conditional distribution**.
- Treating the duplicated “(b)” label in the source as if one of the two parts can be omitted.

### Optional R verification

```r
mu <- c(2, -1, 4)
Sigma <- matrix(c( 1, -2, 0,
                  -2,  5, 0,
                   0,  0, 2), nrow = 3, byrow = TRUE)
A <- matrix(c( 0, 1,  0,
              -3, 1, -1), nrow = 2, byrow = TRUE)
mean_a <- as.vector(A %*% mu)
cov_a <- A %*% Sigma %*% t(A)
selection <- c(1, 3)
mean_b <- mu[selection]
cov_b <- Sigma[selection, selection]
mean_c <- mu[2]
variance_c <- Sigma[2, 2]
mean_a
cov_a
mean_b
cov_b
mean_c
variance_c
```

Square brackets in R such as `mu[c(1,3)]` select elements 1 and 3. `Sigma[c(1,3), c(1,3)]` selects **both** those rows and **both** those columns. Since R indexes from **1**, not 0, the entry `mu[2]` is the second mean.

***
# Question 6. Decide which normal variables and groups are independent

**Source location:** PDF pages 4–5. **Method:** hand calculations.

## Original question (faithfully reproduced)

> **Question 6**  
> Let $\mathbf X$ be $N_3(\boldsymbol\mu,\boldsymbol\Sigma)$ with
>
> $$
> \boldsymbol\mu=\begin{bmatrix}-3\\1\\4\end{bmatrix}
> \quad\text{and}\quad
> \boldsymbol\Sigma=\begin{bmatrix}1&-2&0\\-2&5&0\\0&0&2\end{bmatrix}.
> $$
>
> Which of the following random variables are independent? Explain.
>
> (a) $X_1$ and $X_2$.
>
> (b) $X_2$ and $X_3$.
>
> (c) $\begin{bmatrix}X_1\\X_2\end{bmatrix}$ and $X_3$.
>
> (d) $\dfrac{X_1+X_2}{2}$ and $X_3$.
>
> (e) $X_2$ and $X_2-\dfrac52X_1-X_3$.

## Understand what changes from Questions 1–5

We are not asked to construct a new density or compute its entire distribution. We are asked about **independence**. Think of independence as “even after observing one quantity, we gain no information about the other.”

Because the problem explicitly states that $\mathbf X$ is **jointly multivariate normal**, we can use a very useful shortcut: two jointly normal scalar variables are independent **if and only if** their covariance is zero. The same criterion holds for normal *groups* when **all** the between-group covariances are zero.

The given covariance matrix is valid: its $2\times2$ top-left block has determinant $1(5)-(-2)^2=1>0$, and the third variance is $2>0$. As a block-diagonal matrix with positive-definite blocks, it is positive definite.

## A mini-lesson on reading this matrix quickly

$$
\Sigma=\begin{bmatrix}
1&\boxed{-2}&\boxed{0}\\
\boxed{-2}&5&\boxed{0}\\
\boxed{0}&\boxed{0}&2
\end{bmatrix}.
$$

The diagonal $1,5,2$ represents **variances**. The off-diagonal entries tell us

$$
\operatorname{Cov}(X_1,X_2)=-2,
\quad\operatorname{Cov}(X_1,X_3)=0,
\quad\operatorname{Cov}(X_2,X_3)=0.
$$

These three off-diagonal facts are enough to solve parts (a)–(d), while (e) requires an additional covariance calculation.

## Question 6(a). Are $X_1$ and $X_2$ independent?

**Lecturer-provided solution:** “No, because $\operatorname{Cov}(X_1,X_2)=-2\ne0$.”

**Guided reasoning:** Row 1, column 2 is $-2$. The variables tend to move in opposite directions, so there is linear dependence. Independence would require covariance zero. Thus

$$
\boxed{X_1\text{ and }X_2\text{ are not independent}.}
$$

A nonzero covariance proves dependence **even outside** the normal setting, as long as the covariance is defined.

## Question 6(b). Are $X_2$ and $X_3$ independent?

**Lecturer-provided solution:** “Yes, because $\operatorname{Cov}(X_2,X_3)=0$.”

**Guided reasoning:** Row 2, column 3 is zero. Because the full vector is jointly normal, this zero covariance is strong enough to establish independence:

$$
\boxed{X_2\perp X_3.}
$$

The symbol $\perp$ here means “is independent of,” not merely “uncorrelated with.” If normality were **not** stated, zero covariance alone would be insufficient to reach this conclusion.

## Question 6(c). Is the two-variable group $(X_1,X_2)'$ independent of $X_3$?

**Lecturer-provided solution:** The worksheet partitions the covariance matrix into the first two variables and the third variable and identifies the between-group covariance vector $[0,0]'$.

**Guided reasoning:** We are checking independence between an entire **two-dimensional group** and a **single variable**. We must check **both** covariances:

$$
\operatorname{Cov}(X_1,X_3)=0,
\quad \operatorname{Cov}(X_2,X_3)=0.
$$

Write them as one vector:

$$
\operatorname{Cov}\left(
\begin{bmatrix}X_1\\X_2\end{bmatrix},X_3
\right)=\begin{bmatrix}0\\0\end{bmatrix}.
$$

Or view the partition explicitly:

$$
\Sigma=\left[\begin{array}{cc|c}
1&-2&0\\-2&5&0\\\hline
0&0&2
\end{array}\right].
$$

The $2\times1$ cross-block of zeros shows that the **entire group** $(X_1,X_2)'$ is independent of $X_3$ in this jointly normal model:

$$
\boxed{\begin{bmatrix}X_1\\X_2\end{bmatrix}\perp X_3.}
$$

**A subtle but important point:** $X_1$ and $X_2$ are *not* independent of one another. The group can still be independent of $X_3$.

## Question 6(d). Is their average independent of $X_3$?

**Original expression:** $(X_1+X_2)/2$ and $X_3$.

**Lecturer-provided solution:** Covariance is $\frac12[0+0]=0$, so the two are independent.

**Derivation:** Covariance distributes over addition and allows fixed numbers to be factored out:

$$
\begin{aligned}
\operatorname{Cov}\left(\frac{X_1+X_2}{2},X_3\right)
&=\frac12\operatorname{Cov}(X_1+X_2,X_3)\\
&=\frac12\big[\operatorname{Cov}(X_1,X_3)+\operatorname{Cov}(X_2,X_3)\big]\\
&=\frac12(0+0)\\
&=\boxed{0}.
\end{aligned}
$$

Since both quantities are linear combinations of a jointly normal vector, they are jointly normal; thus the zero covariance proves independence.

$$
\boxed{\frac{X_1+X_2}{2}\perp X_3.}
$$

**An even simpler explanation:** Part (c) already told us $X_3$ is independent of the *entire pair*. The average is a function of that pair, so it must also be independent of $X_3$. The covariance computation confirms it directly.

## Question 6(e). Is $X_2$ independent of $X_2-\frac52X_1-X_3$?

**Lecturer-provided solution:** The worksheet expands the covariance and obtains $10\ne0$. It correctly concludes the variables are not independent.

### Step 1: Name the combination and locate its weights

Let

$$
Y=X_2-\frac52X_1-X_3.
$$

It is the weighted sum $(-5/2)X_1+1X_2+(-1)X_3$. The question asks whether **$X_2$ itself** is independent of this new score.

### Step 2: Expand the covariance without skipping signs

$$
\begin{aligned}
\operatorname{Cov}(X_2,Y)
&=\operatorname{Cov}\left(X_2,X_2-\frac52X_1-X_3\right)\\
&=\operatorname{Cov}(X_2,X_2)
-\frac52\operatorname{Cov}(X_2,X_1)
-\operatorname{Cov}(X_2,X_3)\\
&=\operatorname{Var}(X_2)-\frac52(-2)-0\\
&=5-(-5)\\
&=\boxed{10}.
\end{aligned}
$$

The second line uses **linearity of covariance**. The third uses the entries $\sigma_{22}=5$, $\sigma_{21}=-2$, and $\sigma_{23}=0$.

### Step 3: Explain the minus-minus calculation

$$
-\frac52(-2)=+5.
$$

Therefore the original variance contribution $5$ and the cross-variable contribution $+5$ add to $10$. This is a frequent calculator error when dealing with negative weights and negative covariances.

### Step 4: Conclude

The covariance is not zero. Thus

$$
\boxed{X_2\text{ and }X_2-\tfrac52X_1-X_3\text{ are not independent}.}
$$

Even though $X_3$ was independent of the first two variables, the new combination explicitly contains $X_2$ and $X_1$, and that dependence does not disappear.

### Compact conclusions for Question 6

| Part | Pair or groups | Relevant covariance | Independent? |
|---|---|---|---|
| (a) | $X_1$, $X_2$ | $-2$ | **No** |
| (b) | $X_2$, $X_3$ | $0$ | **Yes**, jointly normal |
| (c) | $(X_1,X_2)'$, $X_3$ | Cross-block $(0,0)'$ | **Yes**, jointly normal |
| (d) | $(X_1+X_2)/2$, $X_3$ | $0$ | **Yes**, jointly normal |
| (e) | $X_2$, $X_2-\frac52X_1-X_3$ | $10$ | **No** |

### Common mistakes in Question 6

- Saying the means $-3$, $1$, and $4$ determine independence. **Only the covariance structure matters** for this normal-independence check.
- Confusing the variance $5$ with the covariance of $X_2$ and $X_3$ (which is zero).
- Checking only one of the two cross-covariances in part (c).
- Believing $X_1$ and $X_2$ must be independent because their **group** is independent of $X_3$.
- Dropping the coefficient $5/2$ in part (e).
- Claiming zero covariance always proves independence, even without joint normality.

### Optional R verification

```r
Sigma <- matrix(c(1, -2, 0,
                 -2,  5, 0,
                  0,  0, 2), nrow = 3, byrow = TRUE)
Sigma[1, 2]       # Q6(a): -2
Sigma[2, 3]       # Q6(b): 0
Sigma[1:2, 3]     # Q6(c): both zero
average <- c(1/2, 1/2, 0)
third <- c(0, 0, 1)
as.numeric(t(average) %*% Sigma %*% third)  # Q6(d): 0
x2 <- c(0, 1, 0)
combo <- c(-5/2, 1, -1)
as.numeric(t(x2) %*% Sigma %*% combo)      # Q6(e): 10
```

The colon in R's `1:2` creates the sequence 1, 2. The code checks **covariances** using matrix weights, then the jointly normal theorem supplies the independence conclusion.

***

# Question 7. Independence with a different covariance pattern

**Source location:** PDF page 6. **Method:** hand calculations.

## Original question (faithfully reproduced)

> **Question 7**  
> Let $\mathbf X$ be distributed as $N_3(\boldsymbol\mu,\boldsymbol\Sigma)$, where
>
> $$
> \boldsymbol\mu=\begin{bmatrix}1\\-1\\2\end{bmatrix},
> \qquad\boldsymbol\Sigma=
> \begin{bmatrix}4&0&-1\\0&5&0\\-1&0&2\end{bmatrix}.
> $$
>
> Which of the following random variables are independent? Explain.
>
> (a) $X_1$ and $X_2$.
>
> (b) $X_1$ and $X_3$.
>
> (c) $X_2$ and $X_3$.
>
> (d) $\begin{bmatrix}X_1\\X_3\end{bmatrix}$ and $X_2$.
>
> (e) $X_1$ and $X_1+3X_2-2X_3$.

## First, decode the new covariance matrix

$$
\Sigma=\begin{bmatrix}4&0&-1\\0&5&0\\-1&0&2\end{bmatrix}.
$$

- $\operatorname{Var}(X_1)=4$.
- $\operatorname{Var}(X_2)=5$.
- $\operatorname{Var}(X_3)=2$.
- $\operatorname{Cov}(X_1,X_2)=0$.
- $\operatorname{Cov}(X_1,X_3)=-1$.
- $\operatorname{Cov}(X_2,X_3)=0$.

Here the **first and third** variables have the nonzero covariance; the **second** is uncorrelated with both. Because the entire vector is jointly normal, $X_2$ is in fact independent of the pair $(X_1,X_3)'$. The stated matrix is valid: the $(X_1,X_3)$ block has determinant $4(2)-(-1)^2=7>0$, and the remaining variance is 5.

## Question 7(a). $X_1$ and $X_2$

**Lecturer-provided solution:** Yes, because $\operatorname{Cov}(X_1,X_2)=0$.

**Working:** Row 1, column 2 is 0. Joint normality converts uncorrelatedness to independence:

$$
\boxed{X_1\perp X_2.}
$$

## Question 7(b). $X_1$ and $X_3$

**Lecturer-provided solution:** No, because $\operatorname{Cov}(X_1,X_3)=-1\ne0$.

**Working:** Row 1, column 3 is $-1$. Therefore:

$$
\boxed{X_1\text{ and }X_3\text{ are not independent}.}
$$

Their correlation is $-1/\sqrt{4(2)}=-1/\sqrt8\approx-0.35355$. This supplementary calculation illustrates that the negative dependence is weaker in magnitude than a correlation of $-1$.

## Question 7(c). $X_2$ and $X_3$

**Lecturer-provided solution:** Yes, because $\operatorname{Cov}(X_2,X_3)=0$.

**Working:** Row 2, column 3 is 0. Again use joint normality:

$$
\boxed{X_2\perp X_3.}
$$

## Question 7(d). Group $(X_1,X_3)'$ and variable $X_2$

**Lecturer-provided solution:** Yes, both $\operatorname{Cov}(X_1,X_2)$ and $\operatorname{Cov}(X_3,X_2)$ are zero.

**Guided calculation:**

$$
\operatorname{Cov}\left(\begin{bmatrix}X_1\\X_3\end{bmatrix},X_2\right)
=\begin{bmatrix}\operatorname{Cov}(X_1,X_2)\\\operatorname{Cov}(X_3,X_2)\end{bmatrix}
=\boxed{\begin{bmatrix}0\\0\end{bmatrix}}.
$$

Therefore

$$
\boxed{\begin{bmatrix}X_1\\X_3\end{bmatrix}\perp X_2.}
$$

This is worth pausing over: **the two members of the group are dependent on each other**, since $\operatorname{Cov}(X_1,X_3)=-1$. However, the **entire group** is independent of the outside variable $X_2$. That is perfectly possible.

## Question 7(e). $X_1$ and $X_1+3X_2-2X_3$

**Lecturer-provided solution:** No. The worksheet calculates covariance $6\ne0$.

### Step 1: Recognize what happens when a variable appears in both expressions

The first quantity is $X_1$ itself. The second quantity is

$$
Y=X_1+3X_2-2X_3.
$$

One part of $Y$ is literally $X_1$, so the covariance will contain $\operatorname{Cov}(X_1,X_1)=\operatorname{Var}(X_1)=4$.

### Step 2: Expand line by line

$$
\begin{aligned}
\operatorname{Cov}(X_1,Y)
&=\operatorname{Cov}(X_1,X_1+3X_2-2X_3)\\
&=\operatorname{Cov}(X_1,X_1)
+3\operatorname{Cov}(X_1,X_2)
-2\operatorname{Cov}(X_1,X_3)\\
&=\operatorname{Var}(X_1)+3(0)-2(-1)\\
&=4+0+2\\
&=\boxed{6}.
\end{aligned}
$$

A frequent error is treating $\operatorname{Cov}(X_1,X_1)$ as zero, or treating the last $-2(-1)$ as $-2$ rather than $+2$.

### Step 3: Interpret the result

Because $6\ne0$, the pair is dependent:

$$
\boxed{X_1\text{ and }X_1+3X_2-2X_3\text{ are not independent}.}
$$

No additional normality argument is needed to establish dependence from nonzero covariance, although the question does supply joint normality.

### Compact conclusions for Question 7

| Part | Pair or groups | Covariance evidence | Independent? |
|---|---|---|---|
| (a) | $X_1$, $X_2$ | $0$ | **Yes** |
| (b) | $X_1$, $X_3$ | $-1$ | **No** |
| (c) | $X_2$, $X_3$ | $0$ | **Yes** |
| (d) | $(X_1,X_3)'$, $X_2$ | $(0,0)'$ | **Yes** |
| (e) | $X_1$, $X_1+3X_2-2X_3$ | $6$ | **No** |

The **yes** answers are justified because the components and combinations are jointly normal. This is the same method as Question 6, but with a different covariance pattern.

### Optional R verification

```r
Sigma <- matrix(c(4, 0, -1,
                  0, 5,  0,
                 -1, 0,  2), nrow = 3, byrow = TRUE)
Sigma[1, 2]       # Q7(a): 0
Sigma[1, 3]       # Q7(b): -1
Sigma[2, 3]       # Q7(c): 0
Sigma[c(1, 3), 2] # Q7(d): both 0
first <- c(1, 0, 0)
combo <- c(1, 3, -2)
as.numeric(t(first) %*% Sigma %*% combo)  # Q7(e): 6
```

***
# Question 8. Stack independent normal vectors and investigate chi-square forms

**Source location:** PDF pages 6–7. **Method:** hand calculations.

## Original question (faithfully reproduced)

> **Question 8**  
> Let $\mathbf X$ be $N_2(\boldsymbol\mu_1,\boldsymbol\Sigma_1)$ with
>
> $$
> \boldsymbol\mu_1=\begin{bmatrix}0\\1\end{bmatrix},
> \qquad \boldsymbol\Sigma_1=\begin{bmatrix}2&1\\1&3\end{bmatrix},
> $$
>
> and $\mathbf Y$ be $N_2(\boldsymbol\mu_2,\boldsymbol\Sigma_2)$ with
>
> $$
> \boldsymbol\mu_2=\begin{bmatrix}2\\1\end{bmatrix},
> \qquad \boldsymbol\Sigma_2=\begin{bmatrix}3&2\\2&1\end{bmatrix}.
> $$
>
> Find the distribution of
>
> (a) $\begin{bmatrix}\mathbf X\\\mathbf Y\end{bmatrix}$, if $\mathbf X$ and $\mathbf Y$ are independent.
>
> (b) $(\mathbf X-\boldsymbol\mu_1)'\boldsymbol\Sigma_1^{-1}(\mathbf X-\boldsymbol\mu_1)$.
>
> (c) $(\mathbf Y-\boldsymbol\mu_2)'\boldsymbol\Sigma_2^{-1}(\mathbf Y-\boldsymbol\mu_2)$.

## Two major ideas are mixed together here

First, parts (a) and (b) develop valid theorems about multivariate normal distributions:

1. If two **independent**, genuinely multivariate normal vectors are stacked, their combined vector is normal. Its covariance matrix has the two original covariance matrices on the diagonal, and zero cross-covariance blocks.
2. A squared distance using a **valid** inverse covariance matrix follows a chi-square distribution, with degrees of freedom equal to the number of variables.

**But the $\Sigma_2$ printed for $\mathbf Y$ is not a possible covariance matrix.** Thus the source's answer for (a) is a correct *formal block-matrix arrangement*, but the asserted four-variate normal model is not valid with those entries. Its chi-square conclusion for (c) is likewise invalid. We will learn the correct theorem **and** the precise flaw in the numbers.

## Question 8(a). Stacking $\mathbf X$ and $\mathbf Y$

### Lecturer-provided solution

The worksheet writes the following block-normal expression:

$$
\boxed{
\begin{bmatrix}\mathbf X\\\mathbf Y\end{bmatrix}
\sim N_4\left(
\begin{bmatrix}0\\1\\2\\1\end{bmatrix},
\begin{bmatrix}
2&1&0&0\\
1&3&0&0\\
0&0&3&2\\
0&0&2&1
\end{bmatrix}
\right).}
$$

This reproduces the given answer's **formal construction**, not a validated probability distribution for these numerical inputs.

### Step 1: Understand “stacking”

$\mathbf X$ contains two variables, say $X_1$ and $X_2$. $\mathbf Y$ contains two more, say $Y_1$ and $Y_2$. Stacking simply means placing all four into one column:

$$
\mathbf Z=\begin{bmatrix}\mathbf X\\\mathbf Y\end{bmatrix}
=\begin{bmatrix}X_1\\X_2\\Y_1\\Y_2\end{bmatrix}.
$$

It is a **four-dimensional vector**, so a joint normal distribution (if valid) would be denoted by $N_4$.

### Step 2: Stack the two mean vectors

$$
E(\mathbf Z)
=\begin{bmatrix}E(\mathbf X)\\E(\mathbf Y)\end{bmatrix}
=\begin{bmatrix}0\\1\\2\\1\end{bmatrix}.
$$

No special normality assumption is needed for the expectation of a stacked vector; it is simply a list of the four means.

### Step 3: Understand the block covariance structure

A covariance matrix for four variables is $4\times4$. It can be split into four $2\times2$ blocks:

$$
\operatorname{Cov}(\mathbf Z)
=\begin{bmatrix}
\operatorname{Cov}(\mathbf X)&\operatorname{Cov}(\mathbf X,\mathbf Y)\\
\operatorname{Cov}(\mathbf Y,\mathbf X)&\operatorname{Cov}(\mathbf Y)
\end{bmatrix}.
$$

If the two vectors are independent, **every** covariance between an $X$ component and a $Y$ component is zero. Therefore the off-diagonal blocks are zero matrices:

$$
\operatorname{Cov}(\mathbf Z)
=\begin{bmatrix}
\Sigma_1&0_{2\times2}\\0_{2\times2}&\Sigma_2
\end{bmatrix}.
$$

Here $0_{2\times2}$ means a $2\times2$ matrix containing four zeros, **not** a single scalar zero. Expanding the blocks gives exactly the source's $4\times4$ array.

### Step 4: Explain why the block structure is not enough

A correct-looking matrix arrangement does not by itself make a valid covariance matrix. For the given second block:

$$
|\Sigma_2|=\begin{vmatrix}3&2\\2&1\end{vmatrix}
=3(1)-2^2=3-4=\boxed{-1}.
$$

The implied correlation would be

$$
\rho_{Y_1Y_2}=\frac{2}{\sqrt3\sqrt1}=\frac2{\sqrt3}\approx1.1547>1.
$$

This is impossible. For example, the purported variance of the weighted sum $Y_1-2Y_2$ would be

$$
\operatorname{Var}(Y_1-2Y_2)
=3+4(1)-4(2)
=3+4-8=\boxed{-1}.
$$

Therefore **$\mathbf Y$ with the printed $\Sigma_2$ cannot exist**. Hence the final $N_4$ probability statement cannot be valid either, despite the useful block-matrix pattern.

### Correct theorem for a valid version of the problem

For independent, **genuine** normal vectors

$$
\mathbf X\sim N_r(\mu_1,\Sigma_1),\quad
\mathbf Y\sim N_s(\mu_2,\Sigma_2),
$$

with legitimate covariance matrices, the stacked vector satisfies

$$
\boxed{\begin{bmatrix}\mathbf X\\\mathbf Y\end{bmatrix}
\sim N_{r+s}\left(
\begin{bmatrix}\mu_1\\\mu_2\end{bmatrix},
\begin{bmatrix}\Sigma_1&0\\0&\Sigma_2\end{bmatrix}\right).}
$$

This is the general theoretical lesson the lecturer intends to teach.

## Question 8(b). Quadratic form for $\mathbf X$

### Lecturer-provided solution

$$
\boxed{(\mathbf X-\mu_1)'\Sigma_1^{-1}(\mathbf X-\mu_1)\sim\chi_2^2.}
$$

This result **is valid**, because $\Sigma_1$ is a legitimate positive-definite covariance matrix.

### Step 1: Check the first covariance matrix

$$
\Sigma_1=\begin{bmatrix}2&1\\1&3\end{bmatrix},
\quad |\Sigma_1|=2(3)-1^2=\boxed{5}>0.
$$

Its diagonal variances 2 and 3 are positive, so the matrix is positive definite.

### Step 2: Compute its inverse explicitly

$$
\Sigma_1^{-1}=\frac15\begin{bmatrix}3&-1\\-1&2\end{bmatrix}.
$$

### Step 3: Write the centered vector

$$
\mathbf X-\mu_1=
\begin{bmatrix}X_1-0\\X_2-1\end{bmatrix}
=\begin{bmatrix}X_1\\X_2-1\end{bmatrix}.
$$

### Step 4: Expand the squared distance as a quadratic form

$$
\begin{aligned}
Q_X&=(\mathbf X-\mu_1)'\Sigma_1^{-1}(\mathbf X-\mu_1)\\
&=\frac15\begin{bmatrix}X_1&X_2-1\end{bmatrix}
\begin{bmatrix}3&-1\\-1&2\end{bmatrix}
\begin{bmatrix}X_1\\X_2-1\end{bmatrix}\\
&=\frac{3X_1^2-2X_1(X_2-1)+2(X_2-1)^2}{5}.
\end{aligned}
$$

For every observed pair, this is nonnegative because it comes from a genuine covariance matrix.

### Step 5: Explain where two degrees of freedom come from

Although the two original components may be correlated, an appropriate whitening or matrix-standardizing transformation makes them into **two independent standard normal coordinates**. The squared distance becomes the sum of their squares:

$$
Q_X=Z_1^2+Z_2^2,\qquad Z_1,Z_2\overset{\text{iid}}{\sim}N(0,1).
$$

There are **two** independent squares, so the distribution is $\chi_2^2$. There is no dependence on the particular values of $\mu_1$ or $\Sigma_1$ once the quadratic form is properly standardized, assuming the model is valid.

## Question 8(c). Quadratic form for $\mathbf Y$

### Lecturer-provided solution

The worksheet states

$$
(\mathbf Y-\mu_2)'\Sigma_2^{-1}(\mathbf Y-\mu_2)\sim\chi_2^2.
$$

**Source discrepancy:** This claim cannot hold as written because the supplied $\Sigma_2$ is invalid.

### Step 1: Compute the formal inverse anyway

The matrix is nonsingular because its determinant is $-1$, so it **does** have an algebraic inverse. Do not confuse **invertible** with **valid as a covariance matrix**:

$$
\begin{aligned}
\Sigma_2^{-1}
&=\frac{1}{-1}\begin{bmatrix}1&-2\\-2&3\end{bmatrix}\\
&=\boxed{\begin{bmatrix}-1&2\\2&-3\end{bmatrix}}.
\end{aligned}
$$

### Step 2: Expand its quadratic form

Let $u=Y_1-2$, $v=Y_2-1$. Formally,

$$
\begin{aligned}
Q_Y&=\begin{bmatrix}u&v\end{bmatrix}
\begin{bmatrix}-1&2\\2&-3\end{bmatrix}
\begin{bmatrix}u\\v\end{bmatrix}\\
&=\boxed{-u^2+4uv-3v^2}.
\end{aligned}
$$

### Step 3: Expose the contradiction

Set $u=1$, $v=0$ as a purely algebraic test input. Then

$$
Q_Y=-(1)^2+4(1)(0)-3(0)^2=\boxed{-1}.
$$

But any chi-square random variable is a sum of squares and therefore **cannot be negative**. This is a concrete demonstration of why the claimed chi-square result is impossible with the printed matrix.

### Step 4: State the conditional correct theorem, without inventing data

If $\Sigma_2$ were instead a **valid positive-definite** covariance matrix for a genuine normal $\mathbf Y\sim N_2(\mu_2,\Sigma_2)$, then the usual theorem would give $Q_Y\sim\chi_2^2$. That is the right conceptual rule, but **the specific numerical example in the PDF does not satisfy its assumptions**.

### A useful comparison

| Expression | Provided PDF conclusion | Validity with printed data |
|---|---|---|
| Stacked $[\mathbf X',\mathbf Y']'$ | $N_4$ with a block-diagonal matrix | Formal matrix arrangement only; no genuine distribution because $\Sigma_2$ is invalid |
| $Q_X$ | $\chi_2^2$ | **Valid**: $\Sigma_1$ positive definite |
| $Q_Y$ | $\chi_2^2$ | **Invalid**: $\Sigma_2$ has negative determinant |

### Common mistakes in Question 8

- Adding $2+2$ incorrectly and calling the stacked vector $N_2$ instead of $N_4$.
- Putting a nonzero covariance in the cross-blocks despite the stated **independence between $\mathbf X$ and $\mathbf Y$**.
- Assuming the original covariance matrices become zero because the groups are independent. Each block retains the covariance **within its own group**.
- Assuming any matrix with nonzero determinant is a legitimate covariance matrix.
- Reporting $\chi_2^2$ for the invalid $\Sigma_2$ without checking whether the underlying probability model exists.
- Confusing the **two** degrees of freedom with the total **four** components of the stacked vector. Each quadratic form in (b) or (c) concerns only two components.

### Optional R verification

```r
mu1 <- c(0, 1)
Sigma1 <- matrix(c(2, 1,
                   1, 3), nrow = 2, byrow = TRUE)
mu2 <- c(2, 1)
Sigma2 <- matrix(c(3, 2,
                   2, 1), nrow = 2, byrow = TRUE)
mu_stacked <- c(mu1, mu2)
Sigma_stacked <- rbind(
  cbind(Sigma1, matrix(0, 2, 2)),
  cbind(matrix(0, 2, 2), Sigma2)
)
mu_stacked
Sigma_stacked
det(Sigma1)                 # 5: valid
det(Sigma2)                 # -1: invalid
solve(Sigma1)               # Correct inverse
solve(Sigma2)               # Algebraic inverse, NOT a valid covariance inverse
v <- c(1, 0)                # Chosen purely to test the quadratic form
as.numeric(t(v) %*% solve(Sigma2) %*% v) # -1: contradiction
```

`cbind()` joins matrices side by side; `rbind()` joins them vertically. The zero blocks are inserted exactly where independence requires them. **Do not simulate $\mathbf Y$ from $\Sigma_2$ as if it were a valid covariance matrix.**

***
# Question 9. One multivariate observation, a sample mean, and a Wishart matrix

**Source location:** PDF page 7. **Method:** hand calculations and correct identification of distributions.

## Original question (faithfully reproduced)

> **Question 9**  
> Let $\mathbf X_1,\mathbf X_2,\ldots,\mathbf X_{20}$ be a random sample of size $n=20$ from an $N_6(\boldsymbol\mu,\boldsymbol\Sigma)$ population. Specify each of the following completely.
>
> (a) The distribution of $(\mathbf X_1-\boldsymbol\mu)'\boldsymbol\Sigma^{-1}(\mathbf X_1-\boldsymbol\mu)$ (refer, Result 5).
>
> To answer the followings, refer, Sections 4 and 5 on “Multivariate normal distribution” lecture note.
>
> (b) The distribution of $\bar{\mathbf X}$.
>
> (c) The distribution of $(n-1)S$.

## What is the question asking in ordinary English?

We repeatedly select a person or item and record **six** measurements each time. We do that **20 times**. The resulting dataset has 20 rows and six variables in each row.

- Part (a) looks at how far **one six-dimensional observation** is from the population center, after adjusting for the covariance.
- Part (b) looks at the random **average of the 20 observations**. Averaging reduces spread.
- Part (c) looks at the random **matrix of centered sums of products**, which tracks variation in all six variables at once.

The question does **not** give numerical values of the entries in $\mu$ or $\Sigma$. Therefore a complete answer names the correct **distribution family and its parameters symbolically**, not an invented numerical matrix.

## Question 9(a). Squared distance of the first observed vector

### Lecturer-provided solution

$$
\boxed{(\mathbf X_1-\mu)'\Sigma^{-1}(\mathbf X_1-\mu)\sim\chi_6^2.}
$$

### Step 1: Clarify what $\mathbf X_1$ means

Here $\mathbf X_1$ is **sample observation number one**, and each sample observation contains **six values**:

$$
\mathbf X_1=\begin{bmatrix}X_{11}\\X_{12}\\X_{13}\\X_{14}\\X_{15}\\X_{16}\end{bmatrix}.
$$

The first subscript in $X_{1j}$ identifies the observation, while $j$ identifies the variable. $\mathbf X_1$ does **not** mean a single univariate $X_1$ as in Question 1. Its size is $6\times1$.

### Step 2: Describe each matrix's size

$$
\mathbf X_1-\mu:\ 6\times1,\quad
\Sigma^{-1}:\ 6\times6,\quad
(\mathbf X_1-\mu)':\ 1\times6.
$$

Thus the product $(1\times6)(6\times6)(6\times1)$ produces a **single number**. This number is a random squared statistical distance.

### Step 3: Relate the distance to standard normal coordinates

Under a valid normal population with **positive-definite** $\Sigma$, standardizing and decorrelating the six components yields six independent standard normal random variables $Z_1,\dots,Z_6$. Their sum of squares is

$$
\begin{aligned}
(\mathbf X_1-\mu)'\Sigma^{-1}(\mathbf X_1-\mu)
&=Z_1^2+Z_2^2+Z_3^2+Z_4^2+Z_5^2+Z_6^2\\
&\sim\boxed{\chi_6^2}.
\end{aligned}
$$

The chi-square degrees of freedom are **six** because each sampled vector has six variables. They are **not** 20 (sample size), 19 ($n-1$), or 120 ($n\times p$).

### Step 4: Give a plain-language interpretation

For a population that really is six-variate normal, most squared standardized distances fall in a range typical of $\chi_6^2$, while extremely large distances are unusual. The mean of this distance is $6$ and its variance is $12$. Those last two facts come from the chi-square distribution, not from numerical observations in the PDF.

## Question 9(b). Distribution of the sample mean vector

### Lecturer-provided solution

$$
\boxed{\bar{\mathbf X}\sim N_6\left(\mu,\frac1{20}\Sigma\right).}
$$

### Step 1: Write the sample mean explicitly

$$
\bar{\mathbf X}=\frac1{20}\left(\mathbf X_1+\mathbf X_2+\cdots+\mathbf X_{20}\right).
$$

This is a **vector average**. For example, its first component averages the 20 first-variable measurements; its sixth component averages the 20 sixth-variable measurements.

### Step 2: Calculate the expectation using linearity

Since every sampled vector has mean $\mu$:

$$
\begin{aligned}
E(\bar{\mathbf X})
&=\frac1{20}\sum_{i=1}^{20}E(\mathbf X_i)\\
&=\frac1{20}\underbrace{(\mu+\cdots+\mu)}_{20\text{ copies}}\\
&=\frac{20\mu}{20}\\
&=\boxed{\mu}.
\end{aligned}
$$

The sample mean is centered at the original population mean; taking an average does **not** shift its expected value.

### Step 3: Calculate the covariance and explain the factor $1/20$

For **independent** sampled vectors, covariances between different observations are zero. Therefore

$$
\begin{aligned}
\operatorname{Cov}(\bar{\mathbf X})
&=\operatorname{Cov}\left(\frac1{20}\sum_{i=1}^{20}\mathbf X_i\right)\\
&=\left(\frac1{20}\right)^2\sum_{i=1}^{20}\operatorname{Cov}(\mathbf X_i)\\
&=\frac1{400}(20\Sigma)\\
&=\boxed{\frac{\Sigma}{20}}.
\end{aligned}
$$

**Why does the factor get squared first?** Variance scales with the square of the multiplier: $\operatorname{Var}(cX)=c^2\operatorname{Var}(X)$. The factor $1/20$ is squared, producing $1/400$, then **20** independent covariance contributions are added, leaving $1/20$.

### Step 4: Explain why the sample mean is normal

Every original vector is normal, and the sum or weighted average of independent normal vectors is again normal. Thus the sample mean is **exactly** six-variate normal, not merely approximately normal:

$$
\boxed{\bar{\mathbf X}\sim N_6\left(\mu,\frac{\Sigma}{20}\right).}
$$

### What changes when the sample gets bigger?

If $n=80$ instead, with the same population, the covariance of the sample mean would be $\Sigma/80$, one-fourth of $\Sigma/20$. The standard deviation of each averaged component would be halved, because $\sqrt{1/4}=1/2$. This illustrative comparison explains why averaging more independent observations produces a more stable estimate of the population mean.

## Question 9(c). Distribution of $(n-1)S$

### Lecturer-provided solution

$$
\boxed{(n-1)S\sim W_6(\Sigma,19)}
$$

with “a Wishart distribution with 19 d.f.” printed in the worksheet.

### Step 1: Understand the sample covariance matrix $S$

The sample covariance matrix is computed from the **observed** vectors:

$$
S=\frac1{n-1}\sum_{i=1}^{n}
(\mathbf X_i-\bar{\mathbf X})(\mathbf X_i-\bar{\mathbf X})'.
$$

Each term $(\mathbf X_i-\bar{\mathbf X})(\mathbf X_i-\bar{\mathbf X})'$ is a **$6\times6$ matrix** because it is a $(6\times1)(1\times6)$ product. It contains squared deviations on the diagonal and cross-products of deviations off the diagonal.

### Step 2: Multiply by $n-1$

Since $n=20$, $n-1=19$:

$$
\begin{aligned}
(n-1)S&=19S\\
&=\sum_{i=1}^{20}
(\mathbf X_i-\bar{\mathbf X})(\mathbf X_i-\bar{\mathbf X})'.
\end{aligned}
$$

This is the **sum-of-squares-and-cross-products** (SSCP) matrix.

### Step 3: Apply the exact normal-sample theorem

For independent identically distributed normal vectors,

$$
(n-1)S\sim W_p(\Sigma,n-1).
$$

Insert $p=6$ and $n-1=19$:

$$
\boxed{19S\sim W_6(\Sigma,19).}
$$

The first Wishart parameter (in the lecturer's convention) is the underlying covariance matrix $\Sigma$; the second is the degrees of freedom 19. Some books arrange Wishart parameters differently, so always check the convention being used.

### Step 4: Why are there 19 degrees of freedom instead of 20?

Each variable's deviations from its *sample* mean sum to zero:

$$
\sum_{i=1}^{20}(X_{ij}-\bar X_j)=0.
$$

Once you know 19 deviations, the twentieth must make the sum zero. One linear constraint removes one degree of freedom. That is the elementary intuition behind $n-1=19$.

### Step 5: Connect this with the familiar one-variable case

For $p=1$, the Wishart relationship reduces to the usual scaled chi-square result:

$$
\frac{(n-1)s^2}{\sigma^2}\sim\chi_{n-1}^2.
$$

For $p=6$, a single chi-square cannot describe **all 36 matrix entries** and their relationships. Wishart is the matrix-based generalization.

### Additional fact worth knowing

For multivariate normal samples, $\bar{\mathbf X}$ and $S$ are independent random objects. This special property helps derive exact confidence intervals and multivariate tests. It does **not** mean the sample covariance has zero entries.

### Common mistakes in Question 9

- Misreading $\mathbf X_1$ as the first **variable** instead of the first **six-dimensional observation**.
- Giving $\chi_{20}^2$ for (a). Its degrees of freedom are $p=6$.
- Writing $N_6(\mu,20\Sigma)$ instead of $N_6(\mu,\Sigma/20)$ for the sample mean.
- Confusing $\Sigma$ and $S$.
- Writing $W_6(\Sigma,20)$ instead of $W_6(\Sigma,19)$.
- Treating the Wishart distribution as a single ordinary real-valued random variable.
- Inventing a numerical covariance matrix even though $\Sigma$ is unspecified.

### Optional R illustration of the dimension and scaling rules

The worksheet gives **no particular numerical $\mu$ or $\Sigma$**. The following numerical covariance is an **independently chosen valid illustration only**, used to demonstrate the shape of $\Sigma/20$; it is not source data.

```r
p <- 6
n <- 20
Sigma_demo <- diag(c(1, 2, 3, 4, 5, 6))  # Illustrative diagonal covariance
cov_of_sample_mean <- Sigma_demo / n
wishart_df <- n - 1
p
wishart_df
cov_of_sample_mean
```

Here `diag()` constructs a diagonal matrix. A $6\times6$ diagonal covariance remains $6\times6$ after division by 20. The parameter $19$ identifies the Wishart degrees of freedom; no simulation is needed for the actual worksheet answer.

***

# Question 10. Distinguish exact and approximate chi-square distributions

**Source location:** PDF page 7. **Method:** hand calculations and naming distributions.

## Original question (faithfully reproduced)

> **Question 10**  
> Let $\mathbf X_1,\mathbf X_2,\ldots,\mathbf X_{60}$ be a random sample of size $n=60$ from a **four-variate normal distribution** having mean $\boldsymbol\mu$ and covariance $\boldsymbol\Sigma$. Specify each of the following completely.
>
> (a) The distribution of $\bar{\mathbf X}$.
>
> (b) The distribution of $(\mathbf X_1-\boldsymbol\mu)'\boldsymbol\Sigma^{-1}(\mathbf X_1-\boldsymbol\mu)$.
>
> (c) The distribution of $n(\bar{\mathbf X}-\boldsymbol\mu)'\boldsymbol\Sigma^{-1}(\bar{\mathbf X}-\boldsymbol\mu)$ (refer, Section 5).
>
> (d) The distribution of $n(\bar{\mathbf X}-\boldsymbol\mu)'S^{-1}(\bar{\mathbf X}-\boldsymbol\mu)$.

## A four-part comparison: what changes each time?

The common theme is **four variables**, but the object being standardized differs:

- (a) is the **sample mean vector** itself.
- (b) is one **individual** observation's squared distance, with the **population** covariance.
- (c) is the **sample mean's** squared distance, still with **population** covariance.
- (d) uses the sample mean but replaces the **population** covariance by its **sample estimate**.

That last replacement creates sampling uncertainty in the denominator and changes the **exact** distribution. It is why (c) and (d) should not be treated as identical at finite sample sizes.

## Question 10(a). Distribution of the sample mean

### Lecturer-provided solution

$$
\boxed{\bar{\mathbf X}\sim N_4\left(\mu,\frac1{60}\Sigma\right).}
$$

### Detailed derivation

The average of 60 independent four-dimensional vectors is

$$
\bar{\mathbf X}=\frac1{60}\sum_{i=1}^{60}\mathbf X_i.
$$

Each observation is centered at $\mu$, so

$$
E(\bar{\mathbf X})=\frac1{60}(60\mu)=\boxed{\mu}.
$$

Their covariance contribution adds as

$$
\operatorname{Cov}(\bar{\mathbf X})
=\left(\frac1{60}\right)^2(60\Sigma)
=\frac{\Sigma}{60}.
$$

Every observation is normal. Any linear combination or average of independent normal vectors is also normal. Therefore the source answer is **exact**:

$$
\bar{\mathbf X}\sim N_4(\mu,\Sigma/60).
$$

It has **four** components, not 60. The number 60 determines the precision of the mean.

## Question 10(b). Squared distance of one individual observation

### Lecturer-provided solution

$$
\boxed{(\mathbf X_1-\mu)'\Sigma^{-1}(\mathbf X_1-\mu)\sim\chi_4^2.}
$$

### Guided explanation

The random vector $\mathbf X_1$ is one full four-variable observation. Standardize it using its true population mean and covariance. Under a positive-definite $\Sigma$, the standardized vector contains four independent normal coordinates:

$$
Q_1=Z_1^2+Z_2^2+Z_3^2+Z_4^2\sim\chi_4^2.
$$

There is **no factor 60** in this expression because it is not an average of 60 vectors. Only one vector, $\mathbf X_1$, appears.

## Question 10(c). Squared distance of the sample mean using the true covariance

### Lecturer-provided solution

$$
\boxed{n(\bar{\mathbf X}-\mu)'\Sigma^{-1}(\bar{\mathbf X}-\mu)\sim\chi_4^2.}
$$

The original explicitly notes that this $\chi_4^2$ distribution is **exact**.

### Step 1: Understand the reason for the factor $n$

Part (a) told us that

$$
\operatorname{Cov}(\bar{\mathbf X})=\frac{\Sigma}{n}.
$$

Therefore the natural squared standardized distance of the **mean** is

$$
Q_{\bar X}=(\bar{\mathbf X}-\mu)'
\left(\frac{\Sigma}{n}\right)^{-1}
(\bar{\mathbf X}-\mu).
$$

The inverse of $\Sigma/n$ is $n\Sigma^{-1}$, because dividing a matrix by $n$ and then inverting it multiplies its inverse by $n$:

$$
\left(\frac{\Sigma}{n}\right)^{-1}=n\Sigma^{-1}.
$$

Hence

$$
Q_{\bar X}=n(\bar{\mathbf X}-\mu)'\Sigma^{-1}(\bar{\mathbf X}-\mu).
$$

### Step 2: Explain why it follows a chi-square distribution

Because the sample comes from a normal population,

$$
\bar{\mathbf X}\sim N_4(\mu,\Sigma/n)
$$

**exactly**, even for finite $n$. Standardizing a genuine four-dimensional normal vector by its true covariance produces a squared distance with $\chi_4^2$ distribution. Thus, for $n=60$,

$$
\boxed{60(\bar{\mathbf X}-\mu)'\Sigma^{-1}(\bar{\mathbf X}-\mu)\sim\chi_4^2.}
$$

**Do not use 60 degrees of freedom**. The statistic has four degrees of freedom because it combines four standardized components. The factor 60 adjusts the smaller covariance of the sample mean.

### Step 3: Compare (b) and (c)

The statistics in (b) and (c) look different, but each measures a normal vector in its **own correct standard deviation units**. Both end up $\chi_4^2$.

A first observation is naturally more spread out than a mean of 60 observations; the factor 60 restores their standardized scales to comparable units.

## Question 10(d). Use the sample covariance $S$ instead of $\Sigma$

### Lecturer-provided solution

The source states

$$
\boxed{n(\bar{\mathbf X}-\mu)'S^{-1}(\bar{\mathbf X}-\mu)
\ \overset{\text{approx.}}{\sim}\ \chi_4^2,}
$$

and notes that the chi-square distribution here is **approximated**, since sample size 60 is large and $S$ can replace $\Sigma$.

The source correctly distinguishes an **exact** chi-square result in (c) from an **approximate** one in (d). The following finite-sample refinement is an additional teaching explanation beyond the PDF.

### Step 1: Why is an estimated covariance different?

$\Sigma$ is treated as a fixed population parameter. $S$ is random: a different random sample will generally produce a different $S$ and thus a different inverse $S^{-1}$.

The statistic

$$
T^2=n(\bar{\mathbf X}-\mu)'S^{-1}(\bar{\mathbf X}-\mu)
$$

is called **Hotelling's $T^2$ statistic** in the usual one-sample setting. It measures how far the observed sample mean is from a proposed population mean, using the **estimated** covariance.

### Step 2: Give the exact finite-sample result for normal data

For independent observations from a nonsingular $p$-variate normal distribution, with the usual unbiased sample covariance matrix $S$, and $n>p$, the exact result is

$$
\boxed{\frac{n-p}{p(n-1)}T^2\sim F_{p,n-p}.}
$$

Here $F_{p,n-p}$ is the **F distribution** with $p$ numerator degrees of freedom and $n-p$ denominator degrees of freedom. An $F$ random variable is a ratio of two independently scaled chi-square quantities; it naturally arises when both the mean and variance are estimated from data.

**Why are the degrees of freedom different?** We have $p$ dimensions in the numerator, while estimating covariance and a mean uses sample information, creating the $n-p$ denominator degrees of freedom.

### Step 3: Insert the actual numbers $n=60$, $p=4$

$$
\frac{60-4}{4(60-1)}T^2\sim F_{4,60-4}.
$$

Calculate each quantity:

$$
60-4=56,\quad 60-1=59,\quad 4(59)=236.
$$

Thus

$$
\boxed{\frac{56}{236}T^2\sim F_{4,56}},
\quad\text{or equivalently}\quad
\boxed{T^2\sim\frac{236}{56}F_{4,56}=\frac{59}{14}F_{4,56}.}
$$

This is an **exact** finite-sample statement under the stated normal-model assumptions, and it adds a more precise result to the lecturer's large-sample approximation.

### Step 4: Understand how chi-square appears when the sample is large

As $n$ grows with $p$ fixed, the estimated covariance matrix $S$ approaches the true covariance $\Sigma$ under standard regularity assumptions. The scaled $F$ distribution correspondingly approaches a chi-square distribution. Informally:

$$
T^2=n(\bar{\mathbf X}-\mu)'S^{-1}(\bar{\mathbf X}-\mu)
\overset{\text{approx.}}{\sim}\chi_p^2
\quad\text{for sufficiently large }n.
$$

With $p=4$, the textbook's approximation is $\chi_4^2$. **This does not mean** that replacing $\Sigma$ by $S$ leaves the finite-sample distribution exactly unchanged.

### Step 5: A plain-language analogy

Imagine comparing a student's score with the class average. If you know the population's true standard deviation, you know the exact scale for the comparison. If you only estimate the standard deviation from a limited sample, you are also uncertain about the measuring ruler. The $F$-based result accounts for this extra uncertainty. For very large samples, the estimated ruler becomes stable and the simpler chi-square approximation is adequate.

### Important conditions for part (d)

- **Independent observations:** otherwise the usual covariance of the mean and $F$ results can fail.
- **Multivariate normality:** needed for the **exact** finite-sample $F$ result.
- **Positive-definite population covariance:** needed for ordinary inverse-based standardization.
- **Invertible sample covariance:** with continuous, nonsingular normal data, $n>p$ is enough for invertibility with probability one.
- **Fixed or modest dimension compared with sample size:** matters for the reliability of the large-sample chi-square approximation.

### Complete comparison for Question 10

| Part | Random object | Distribution | Exact or approximate? |
|---|---|---|---|
| (a) | $\bar{\mathbf X}$ | $N_4(\mu,\Sigma/60)$ | **Exact** under normal sampling |
| (b) | Individual squared distance with $\Sigma$ | $\chi_4^2$ | **Exact** |
| (c) | Mean squared distance using $\Sigma$ | $\chi_4^2$ | **Exact** |
| (d), PDF | Mean squared distance using $S$ | $\chi_4^2$ | **Approximate** |
| (d), additional finite-sample result | $\frac{56}{236}T^2$ | $F_{4,56}$ | **Exact**, under the normal-model conditions |

### Common mistakes in Question 10

- Mixing up “number of observations” $n=60$ with “number of variables” $p=4$.
- Putting $\Sigma/4$ instead of $\Sigma/60$ in the sample mean's covariance.
- Adding the factor $n$ to part (b), which concerns an individual observation.
- Omitting the factor $n$ from part (c), which standardizes the **sample mean**.
- Treating $\Sigma$ (population covariance) and $S$ (sample covariance estimate) as identical.
- Calling the $\chi_4^2$ result in (d) **exact** at $n=60$.
- Applying the finite-sample $F$ formula without the normality and invertibility assumptions.

### Optional R verification of the degrees of freedom and scaling

```r
n <- 60
p <- 4
numerator_df <- p
denominator_df <- n - p
scale_to_F <- (n - p) / (p * (n - 1))
scale_to_T2 <- p * (n - 1) / (n - p)
numerator_df       # 4
denominator_df     # 56
scale_to_F         # 56 / 236
scale_to_T2        # 236 / 56

# Optional illustration: the critical value of the exact F-based statistic
# for a chosen 5% upper-tail test. This alpha level is supplementary;
# it was not specified by Question 10.
alpha <- 0.05
F_critical <- qf(1 - alpha, df1 = p, df2 = n - p)
T2_critical <- scale_to_T2 * F_critical
F_critical
T2_critical
```

`qf()` gives an F-distribution quantile. This code illustrates how the exact test could later be used; it does **not** claim a test statistic or p-value from unprovided data.

***

# Question 11. Large samples from a population that is not necessarily normal

**Source location:** PDF pages 7–8. **Method:** reasoning from large-sample theorems.

## Original question (faithfully reproduced)

> **Question 11**  
> Let $\mathbf X_1,\mathbf X_2,\ldots,\mathbf X_{75}$ be a random sample from a population distribution with mean $\boldsymbol\mu$ and covariance matrix $\boldsymbol\Sigma$. What is the **approximate** distribution of each of the following?
>
> To answer the followings, refer, Section 6.
>
> (a) $\bar{\mathbf X}$.
>
> (b) $n(\bar{\mathbf X}-\boldsymbol\mu)'S^{-1}(\bar{\mathbf X}-\boldsymbol\mu)$.

## Why this question is different from Questions 9 and 10

The source says the observations come from **a population distribution**, not specifically a **multivariate normal** population. That change is deliberate. We cannot automatically invoke exact normal or chi-square sampling distributions. Instead we need a large-sample result, the **multivariate central limit theorem**, plus a consistent covariance estimate.

Notice also that the number of variables **$p$ is not specified**. We must keep $p$ symbolic. Guessing $p=2$, $4$, or $6$ from an earlier question would be an error.

## Question 11(a). Approximate distribution of the sample mean

### Lecturer-provided solution

$$
\boxed{\bar{\mathbf X}\ \overset{\text{approx.}}{\sim}\ N_p\left(\mu,\frac1{75}\Sigma\right).}
$$

### Step 1: Write the sample mean

$$
\bar{\mathbf X}=\frac1{75}\sum_{i=1}^{75}\mathbf X_i.
$$

There are 75 **vectors** being averaged. Their dimension is $p$, so the average also has $p$ components.

### Step 2: Compute the mean exactly

Even without a normal population, expectation is linear:

$$
E(\bar{\mathbf X})=\frac1{75}(75\mu)=\boxed{\mu}.
$$

### Step 3: Compute the covariance exactly under independent sampling

If the 75 sample vectors are independent and identically distributed with covariance $\Sigma$:

$$
\operatorname{Cov}(\bar{\mathbf X})
=\frac{1}{75^2}(75\Sigma)
=\boxed{\frac{\Sigma}{75}}.
$$

These mean and covariance equations do **not** require normality; they rely on finite moments and the sampling assumptions.

### Step 4: Explain what is approximate

The fact that the **distribution of $\bar{\mathbf X}$ has a normal shape** is now approximate, because the original population need not be normal. The multivariate central limit theorem says that as $n$ becomes large,

$$
\sqrt n(\bar{\mathbf X}-\mu)\overset{d}{\longrightarrow}N_p(\mathbf0,\Sigma).
$$

After re-expressing the scale for $n=75$,

$$
\boxed{\bar{\mathbf X}\approx N_p(\mu,\Sigma/75).}
$$

**Everyday explanation:** Even when individual measurements have a strange or skewed distribution, averaging many independent observations tends to smooth out the irregularities. The average behaves approximately like a multivariate bell-shaped cloud centered at the true population mean.

### What if 75 is not enough?

The approximation's quality depends on the original population. Very heavy tails or strong skewness can make the approximation poor. Also, the number of variables $p$ matters. The source uses 75 as a large sample in its introductory setting, but **75 alone is not a universal guarantee** of a good approximation in all dimensions or for all populations.

## Question 11(b). Approximate chi-square distribution when $\Sigma$ is estimated

### Lecturer-provided solution

$$
\boxed{n(\bar{\mathbf X}-\mu)'S^{-1}(\bar{\mathbf X}-\mu)
\ \overset{\text{approx.}}{\sim}\ \chi_p^2.}
$$

The source explains that $n=75$ is sufficiently large compared with $p$, the number of variables. That relative-size assumption is important.

### Step 1: Understand the statistic

Let

$$
T^2=n(\bar{\mathbf X}-\mu)'S^{-1}(\bar{\mathbf X}-\mu).
$$

- $\bar{\mathbf X}-\mu$ measures how far the sample mean is from the population mean in each component.
- $S$ is the covariance calculated from the sample.
- $S^{-1}$ scales and decorrelates the components.
- The leading $n$ adjusts for the fact that the sample mean has covariance $\Sigma/n$ rather than $\Sigma$.

### Step 2: First imagine the population covariance were known

Under the multivariate central limit theorem, the standardized mean is approximately multivariate standard normal. Therefore its squared distance using the population covariance is approximately chi-square:

$$
n(\bar{\mathbf X}-\mu)'\Sigma^{-1}(\bar{\mathbf X}-\mu)
\approx\chi_p^2.
$$

This is now **approximate**, unlike Question 10(c), because the original population was not assumed normal.

### Step 3: Replace unknown $\Sigma$ with sample $S$

With appropriate conditions and enough observations, the sample covariance approaches the population covariance:

$$
S\overset{p}{\longrightarrow}\Sigma,
$$

where $\overset{p}{\longrightarrow}$ means “converges in probability.” In simpler language, **the estimated covariance becomes more reliable as independent sample size grows**.

Provided $\Sigma$ is positive definite and the sample covariance remains invertible, $S^{-1}$ similarly approaches $\Sigma^{-1}$. Therefore replacing $\Sigma$ by $S$ does not change the **limiting** chi-square distribution. This combined argument is often formalized using **Slutsky's theorem**.

### Step 4: State the approximate result for 75 observations

Insert $n=75$ but **do not invent a value for $p$**:

$$
\boxed{75(\bar{\mathbf X}-\mu)'S^{-1}(\bar{\mathbf X}-\mu)
\approx\chi_p^2.}
$$

It is a scalar (single-number) statistic whose approximate distribution has **$p$ degrees of freedom**.

### Step 5: Know when this is unsafe to apply

A standard $p\times p$ sample covariance matrix has rank at most $n-1$. Thus if $p\ge n=75$, $S$ cannot be invertible: there are not enough observations to estimate a nonsingular covariance in 75 dimensions or more. In particular, $S^{-1}$ in the question is undefined in that case.

Even when $p<75$, a near-singular matrix can make the inverse unstable. And for a large $p$ relative to 75, the ordinary fixed-$p$ large-sample chi-square approximation may be inaccurate. The lecturer's “large relative to $p$” caveat prevents overgeneralization.

### Why no numerical test decision is possible

The original gives no observed $\bar{\mathbf x}$ and no numerical $S$. It does not ask for a specific hypothesis test or provide a significance level. We can identify the limiting distribution, but **we must not invent a statistic, p-value, or rejection decision**.

### Compare Questions 9, 10 and 11

| Source assumption | Sample mean | Squared mean distance with $\Sigma$ | Squared mean distance with $S$ |
|---|---|---|---|
| Q9: normal, $p=6,n=20$ | $N_6(\mu,\Sigma/20)$ exactly | $\chi_6^2$ exactly if constructed with the correct $n$ | Exact scaled $F$ available under suitable conditions; not directly asked |
| Q10: normal, $p=4,n=60$ | $N_4(\mu,\Sigma/60)$ exactly | $\chi_4^2$ exactly | Approx. $\chi_4^2$; exact scaled $F$ |
| Q11: general population, $p$ unspecified, $n=75$ | Approx. $N_p(\mu,\Sigma/75)$ | Approx. $\chi_p^2$ under the CLT | Approx. $\chi_p^2$ under CLT and consistent, invertible $S$ |

This table is a **supplementary comparison** assembled from the source questions and the standard theorems explained above.

### Common mistakes in Question 11

- Treating the population as normal merely because it has a mean and covariance.
- Saying $\bar{\mathbf X}$ is **exactly** normal when the assumptions only support an approximation.
- Assigning a numerical value to $p$ without one being given.
- Assuming any sample of 75 is sufficient, even if there are 100 variables or extremely heavy tails.
- Replacing $\Sigma$ with $S$ without verifying that $S$ is invertible.
- Stating a specific p-value or a hypothesis-test conclusion despite having no numerical observations.

### Optional R demonstration: distribution shape without source data

This code is a **supplementary simulation**, not a reconstruction of missing worksheet observations. It demonstrates the general central-limit idea using a deliberately skewed exponential population and a scalar sample mean (the one-dimensional version of the same principle).

```r
set.seed(2451)
repetitions <- 5000
n <- 75
sample_means <- replicate(repetitions, mean(rexp(n, rate = 1)))
mean(sample_means)        # Should be near population mean 1
var(sample_means)         # Should be near population variance 1 / 75
hist(sample_means, breaks = 35,
     main = "Sampling distribution of a mean (illustration)",
     xlab = "Mean of 75 independent exponential observations")
curve(dnorm(x, mean = 1, sd = sqrt(1 / n)),
      add = TRUE, lwd = 2)
```

`set.seed()` makes the random demonstration reproducible; `rexp()` samples from a deliberately nonnormal distribution; `mean()` averages; `replicate()` repeats the experiment; `hist()` visualizes the simulated sample means; `curve()` overlays a normal approximation. The example is **univariate** to make the central-limit mechanism intuitive; the actual question asks for the **multivariate** analogue.

***
# Part 12. Independent revision reference and checks

This final part is **supplementary study material**. It reorganizes the methods from Questions 1–11 to help you solve similar problems without consulting the solutions.

## 12.1 Formula-choice map: how to recognize the question type

| What the question says | What you should calculate or identify | Where you learned it |
|---|---|---|
| “Write out the bivariate normal density” | Means, variances, covariance, determinant, and the exponential density | Q1(a) |
| “Quadratic function / squared statistical distance” | $d'\Sigma^{-1}d$, expanded with two diagonal squares and the doubled cross-term | Q1(b) |
| “Distribution of $a'X$” | Mean $a'\mu$; variance $a'\Sigma a$; normal family if the original normal model is valid | Q2, Q3(a) |
| “Distribution of $a'X+c$” | Same variance as $a'X$; mean increases by $c$ | Q3(b) |
| “Joint distribution of several linear combinations” | Build $A$ row by row, then $A\mu$ and $A\Sigma A'$ | Q4(a), Q5(a) |
| “Each component is shifted by constants” | Add the shift vector to $\mu$; keep $\Sigma$ | Q4(b) |
| “Marginal distribution” | Select the relevant mean entries and matching covariance rows/columns | Q5(b), Q5(c) |
| “Which are independent?” | Inspect covariance / cross-block; use zero covariance $\Rightarrow$ independence only for jointly normal variables | Q6, Q7 |
| “Stack two independent vectors” | Stack means and use block-diagonal covariance | Q8(a) |
| “Quadratic form with true population $\Sigma$” | $\chi_p^2$ under a genuine $N_p$ model with positive-definite covariance | Q8(b), Q9(a), Q10(b,c) |
| “Sample mean from a normal population” | Exact $N_p(\mu,\Sigma/n)$ | Q9(b), Q10(a) |
| “Distribution of $(n-1)S$ from a normal sample” | $W_p(\Sigma,n-1)$ | Q9(c) |
| “Mean quadratic form with $S^{-1}$” | Exact scaled Hotelling $T^2$/$F$ for normal samples; often approximate $\chi_p^2$ for large $n$ | Q10(d), Q11(b) |
| “Sample mean from a nonnormal but well-behaved population” | Approximate $N_p(\mu,\Sigma/n)$ by multivariate CLT | Q11(a) |

## 12.2 One-page collection of mathematical rules

### Population and sample notation

$$
\mathbf X\sim N_p(\mu,\Sigma),\qquad
\bar{\mathbf X}=\frac1n\sum_{i=1}^n\mathbf X_i,
$$

$$
S=\frac1{n-1}\sum_{i=1}^n
(\mathbf X_i-\bar{\mathbf X})(\mathbf X_i-\bar{\mathbf X})'.
$$

### Linear scalar combination

$$
E(a'\mathbf X+b)=a'\mu+b,
\qquad\operatorname{Var}(a'\mathbf X+b)=a'\Sigma a.
$$

The constant $b$ shifts the mean but does not affect the variance.

### Vector transformation

$$
\mathbf Y=A\mathbf X+d,
\quad E(\mathbf Y)=A\mu+d,
\quad\operatorname{Cov}(\mathbf Y)=A\Sigma A'.
$$

If $\mathbf X$ is multivariate normal, so is $\mathbf Y$.

### Useful covariance identities

$$
\begin{aligned}
\operatorname{Cov}(U,V)&=\operatorname{Cov}(V,U),\\
\operatorname{Cov}(aU,bV)&=ab\operatorname{Cov}(U,V),\\
\operatorname{Cov}(U+V,W)&=\operatorname{Cov}(U,W)+\operatorname{Cov}(V,W),\\
\operatorname{Cov}(U,c)&=0\quad\text{for fixed }c,\\
\operatorname{Cov}(U,U)&=\operatorname{Var}(U),\\
\operatorname{Var}(aU+bV)&=a^2\operatorname{Var}(U)+b^2\operatorname{Var}(V)+2ab\operatorname{Cov}(U,V).
\end{aligned}
$$

### Statistical distance and normal density

For a positive-definite covariance matrix:

$$
D^2=(\mathbf x-\mu)'\Sigma^{-1}(\mathbf x-\mu),
$$

$$
f(\mathbf x)=\frac{1}{(2\pi)^{p/2}|\Sigma|^{1/2}}
\exp\left[-\frac12(\mathbf x-\mu)'\Sigma^{-1}(\mathbf x-\mu)\right].
$$

In the source's Question 1, $p=2$, so $(2\pi)^{p/2}=2\pi$. **The density formula assumes an ordinary nonsingular multivariate normal distribution.**

### Normal-sample distribution results

$$
\bar{\mathbf X}\sim N_p(\mu,\Sigma/n),
$$

$$
(n-1)S\sim W_p(\Sigma,n-1),
$$

$$
(\mathbf X_i-\mu)'\Sigma^{-1}(\mathbf X_i-\mu)\sim\chi_p^2,
$$

$$
n(\bar{\mathbf X}-\mu)'\Sigma^{-1}(\bar{\mathbf X}-\mu)\sim\chi_p^2.
$$

### Exact and approximate sample-covariance results

Let $T^2=n(\bar{\mathbf X}-\mu)'S^{-1}(\bar{\mathbf X}-\mu)$.

For a normal sample with $n>p$ and an invertible sample covariance:

$$
\frac{n-p}{p(n-1)}T^2\sim F_{p,n-p}.
$$

For a sufficiently large sample relative to fixed $p$, under the needed regularity conditions:

$$
T^2\approx\chi_p^2.
$$

**Do not confuse an approximation sign $\approx$ with the exact distribution symbol $\sim$.**

## 12.3 How to check a covariance matrix before solving any transformation

Because Questions 2 and 8 contain invalid covariance matrices, make the following habit automatic:

**Step 1: Check symmetry.** Is the entry in row $i$, column $j$ equal to the entry in row $j$, column $i$?

**Step 2: Check nonnegative diagonal variances.** A variance cannot be negative. Positive-definite covariances have strictly positive variances on their diagonals.

**Step 3: For a two-variable problem, check the determinant.** For

$$
\Sigma=\begin{bmatrix}a&b\\b&c\end{bmatrix}
$$

calculate $ac-b^2$. A **negative** result disproves validity. If $a,c>0$ and the determinant is positive, the matrix is positive definite.

**Step 4: Check the implied correlation.** Calculate $b/\sqrt{ac}$. It must lie in $[-1,1]$.

**Step 5: For larger matrices, verify positive semidefiniteness.** One reliable numerical technique is to inspect its eigenvalues: all must be nonnegative for a covariance matrix, and strictly positive for a positive-definite one. Beware tiny negative floating-point values near zero caused by rounding.

**Step 6: Interpret a failure before continuing.** An inverse might exist for a mathematically invalid covariance matrix, but applying a normal-distribution or chi-square theorem to that input is still wrong. Keep the distinction between **valid arithmetic** and **valid probability modeling**.

## 12.4 How to work out a transformation on a calculator

Suppose you are asked to transform a three-variate normal vector using

$$
A=\begin{bmatrix}a&b&c\\d&e&f\end{bmatrix},
\quad\mu=\begin{bmatrix}m_1\\m_2\\m_3\end{bmatrix}.
$$

You can compute the new mean without any special matrix mode:

$$
A\mu=\begin{bmatrix}am_1+bm_2+cm_3\\dm_1+em_2+fm_3\end{bmatrix}.
$$

To compute the new covariance $A\Sigma A'$:

1. Write the covariance matrix neatly with three rows and three columns.
2. Multiply it by the **first row of $A$ turned into a column**. Record the three results.
3. Repeat using the **second row of $A$** to form the second column of $\Sigma A'$.
4. Multiply the first row of $A$ by each new column to get covariance-matrix row 1.
5. Multiply the second row of $A$ by each new column to get covariance-matrix row 2.
6. Check the output is symmetric and that its diagonal entries are not negative.

This procedure exactly reproduces the calculations in Questions 4(a) and 5(a).

### Illustration with three small numbers (new, not source data)

Let $\Sigma=\operatorname{diag}(1,4,9)$, and let $Y_1=X_1+X_2$ and $Y_2=X_2-X_3$. Then

$$
A=\begin{bmatrix}1&1&0\\0&1&-1\end{bmatrix}.
$$

Because the original covariances are zero, you can work it out by direct scalar rules:

$$
\operatorname{Var}(Y_1)=1+4=5,
\quad\operatorname{Var}(Y_2)=4+9=13,
$$

$$
\operatorname{Cov}(Y_1,Y_2)=\operatorname{Cov}(X_1+X_2,X_2-X_3)=4.
$$

Therefore

$$
A\Sigma A'=\begin{bmatrix}5&4\\4&13\end{bmatrix}.
$$

This verifies the matrix multiplication using common-sense covariance rules and gives you a miniature exercise to check independently.

## 12.5 Frequently confused concepts, clarified

| Confusion | Correct distinction |
|---|---|
| Variance versus standard deviation | Variance uses squared units; standard deviation is its square root. |
| Covariance versus correlation | Correlation is standardized covariance; it must lie between $-1$ and $1$. |
| Mean $\mu$ versus sample mean $\bar{X}$ | $\mu$ is a population parameter; $\bar{X}$ is calculated from a random sample. |
| Covariance $\Sigma$ versus sample covariance $S$ | $\Sigma$ describes the population; $S$ estimates it from data. |
| $X_1$ as component versus $\mathbf X_1$ as sample observation | The context and boldface determine whether subscript 1 selects a variable or an observed vector. |
| Independent versus uncorrelated | Independence normally implies zero covariance; the converse requires special assumptions, such as joint normality. |
| Joint distribution versus marginal | Joint describes several variables together, including their dependence; marginal focuses on selected variables. |
| Linear transformation versus constant shift | A transformation may change spread and correlation; adding fixed constants does not. |
| $\chi_p^2$ versus $\chi_n^2$ | Squared normal-vector distances use dimension $p$ degrees of freedom, not sample size $n$. |
| Exact versus approximate | Exact theorems require their stated assumptions; CLT-based or plug-in results are approximations at finite $n$. |
| Invertible matrix versus valid covariance matrix | A matrix can be invertible and still have a negative “variance” direction. |
| Wishart distribution versus ordinary chi-square | Wishart describes a random matrix; chi-square describes a nonnegative random scalar. |

## 12.6 A consolidated, self-contained R verification script

This is a **new optional learning resource**, not a script included in the lecturer's worksheet. The worksheet recommends a calculator; R can be used as an independent check. All numeric inputs below are **copied from the original questions**. The script intentionally does **not** try to generate random observations from either invalid covariance matrix.

```r
# ---------- Small reusable helpers ----------
quad <- function(a, M) as.numeric(t(a) %*% M %*% a)
linvar <- function(a, Sigma) quad(a, Sigma)
transform_normal <- function(mu, Sigma, A) {
  list(mean = as.vector(A %*% mu),
       covariance = A %*% Sigma %*% t(A))
}

# Q1: covariance, inverse, density at the center
mu1 <- c(1, 3)
S1 <- matrix(c(2, -0.8 * sqrt(2),
               -0.8 * sqrt(2), 1), 2, 2, byrow = TRUE)
stopifnot(abs(det(S1) - 0.72) < 1e-12)
print(S1)
print(solve(S1))
print(1 / (2 * pi * sqrt(det(S1))))

# Q2: two problems in the supplied source
mu2 <- c(1, 3)
S2 <- matrix(c(1, 3,
               3, 5), 2, 2, byrow = TRUE)
a2 <- c(2, 1)
print(sum(a2 * mu2))             # 5
print(linvar(a2, S2))           # 21 (not source's final 12)
print(det(S2))                  # -4: not a covariance matrix

# Q3: weighted sum and translation
mu3 <- c(2, -3, 1)
S3 <- matrix(c(1, 1, 1,
               1, 3, 2,
               1, 2, 2), 3, 3, byrow = TRUE)
a3 <- c(3, -2, 1)
print(sum(a3 * mu3))            # 13
print(S3 %*% a3)               # (2, -1, 1)'
print(linvar(a3, S3))          # 9
print(sum(a3 * mu3) + 5)        # 18

# Q4: two differences, then translations
mu4 <- c(1, 1, 2)
S4 <- matrix(c(1, 1, 1,
               1, 2, 1,
               1, 1, 3), 3, 3, byrow = TRUE)
A4 <- matrix(c(1, -1, 0,
               1,  0, -1), 2, 3, byrow = TRUE)
print(transform_normal(mu4, S4, A4))
print(mu4 + c(1, 0, -1))

# Q5: two components of a transformed vector and marginals
mu5 <- c(2, -1, 4)
S5 <- matrix(c( 1, -2, 0,
              -2,  5, 0,
               0,  0, 2), 3, 3, byrow = TRUE)
A5 <- matrix(c( 0, 1,  0,
               -3, 1, -1), 2, 3, byrow = TRUE)
print(transform_normal(mu5, S5, A5))
print(mu5[c(1, 3)])
print(S5[c(1, 3), c(1, 3)])
print(c(mean = mu5[2], variance = S5[2, 2]))

# Q6: independence depends on between-variable covariance
print(S5[1, 2])               # -2, not independent
print(S5[2, 3])               # 0, independent under joint normality
print(S5[1:2, 3])             # (0, 0), independent groups
print(linvar(c(0, 1, 0), S5)) # 5: variance of X2
print(as.numeric(t(c(0, 1, 0)) %*% S5 %*% c(-2.5, 1, -1))) # 10

# Q7: independence with the different covariance pattern
S7 <- matrix(c(4, 0, -1,
               0, 5,  0,
              -1, 0,  2), 3, 3, byrow = TRUE)
print(S7[c(1, 3), 2])
print(as.numeric(t(c(1, 0, 0)) %*% S7 %*% c(1, 3, -2))) # 6

# Q8: verify both covariance blocks before probability assertions
SX <- matrix(c(2, 1,
               1, 3), 2, 2, byrow = TRUE)
SY <- matrix(c(3, 2,
               2, 1), 2, 2, byrow = TRUE)
print(c(det_X = det(SX), det_Y = det(SY))) # 5 and -1
print(solve(SY))                         # Inverse exists, but SY invalid
print(quad(c(1, 0), solve(SY)))           # -1: impossible chi-square value

# Q9: purely symbolic theory has p=6 and n=20
p9 <- 6
n9 <- 20
print(c(dimension = p9, sample_size = n9, wishart_df = n9 - 1))

# Q10: exact F scaling of Hotelling's T squared
n10 <- 60
p10 <- 4
print(c(F_df1 = p10, F_df2 = n10 - p10))
print((n10 - p10) / (p10 * (n10 - 1)))   # 56 / 236

# Q11: p is intentionally unspecified in the question
n11 <- 75
print(n11)
# The approximation is N_p(mu, Sigma/75) and chi-square with p df,
# provided the needed regularity and invertibility conditions hold.
```

### How to read the R commands

- `c(2, -3, 1)` creates a vector with three numbers.
- `matrix(..., nrow = 3, byrow = TRUE)` fills a three-row matrix **row by row**, matching the PDF's displayed matrices.
- `t(a)` transposes the vector `a` into a row, allowing $a'\Sigma a$.
- `%*%` means **matrix multiplication**; `*` by itself means elementwise multiplication in many R contexts.
- `det(M)` computes a determinant; `solve(M)` computes an inverse of an invertible matrix.
- `abs()` computes absolute value; `stopifnot()` checks a logical condition and stops if it is false.
- `list()` groups several output objects together; `print()` shows them.
- `function()` defines a reusable calculation, such as the quadratic form.
- `as.numeric()` or `as.vector()` converts one-cell matrix output into an ordinary number or vector for easy reading.
- `c(1,3)` inside square brackets selects variables numbered 1 and 3.
- Text after `#` within the **R code blocks** is a programming comment, not a source question or a Markdown heading.

## 12.7 Check yourself before looking at the answers

These are **new, optional practice questions**, not part of the original worksheet. They use only concepts already developed.

1. A normal variable has variance 16. What is its standard deviation? **Check:** $4$, since $\sqrt{16}=4$.
2. A normal vector has three components. How many values are in its mean vector? **Check:** $3$.
3. If $Y=4X_1-2X_2$, what is its weight row? **Check:** $[4,-2]$.
4. If $E(Y)=7$ and $\operatorname{Var}(Y)=5$, what are the mean and variance of $Y-3$? **Check:** mean $4$, variance $5$.
5. If $\operatorname{Var}(U)=2$, $\operatorname{Var}(V)=3$ and $\operatorname{Cov}(U,V)=1$, what is $\operatorname{Var}(U+V)$? **Check:** $2+3+2(1)=7$.
6. If two variables are **jointly normal** and have covariance zero, what can you infer? **Check:** they are independent.
7. If two variables only have finite variances and covariance zero, but are not known to be jointly normal, can you automatically infer independence? **Check:** no.
8. For independent, normal, $p$-variate observations with $n=25$, what is the distribution of $\bar{\mathbf X}$? **Check:** $N_p(\mu,\Sigma/25)$.
9. For the same sample, what Wishart degrees of freedom does $(n-1)S$ have? **Check:** $24$.
10. If the true population covariance matrix is $\Sigma$, and the sampled mean uses $n=25$ normal observations with $p=3$, what is $n(\bar{\mathbf X}-\mu)'\Sigma^{-1}(\bar{\mathbf X}-\mu)$ distributed as? **Check:** $\chi_3^2$ exactly.
11. If you replace $\Sigma$ by the sample covariance $S$, does that last statistic remain **exactly** chi-square in a finite normal sample? **Check:** no, an exact scaled $F$ relationship applies.
12. Compute $\det\begin{bmatrix}1&2\\2&1\end{bmatrix}$. Is it a valid covariance matrix? **Check:** determinant $-3$; invalid.

## 12.8 Source-accuracy and completeness audit

All calculations below use **only the numerical information printed in `PQ3.pdf`**. Optional illustrations and R verification are explicitly labeled as additional content.

| Source page | Question | Source result or observation | Status in this guide |
|---|---|---|---|
| 1 | 1(a) | Bivariate density with determinant factor $0.72$ | Fully derived, checked, and interpreted |
| 1 | 1(b) | Squared quadratic form | Inverse and cross-term derived; matches source |
| 1–2 | 2 | Printed variance calculation 21 but concluding $N(5,12)$ | Discrepancy documented; printed covariance matrix also invalid |
| 2 | 3(a) | $N(13,9)$ | Verified by two variance methods |
| 2 | 3(b) | Mean 18, variance 9; final line omits “+5” | Labelling discrepancy documented |
| 2–3 | 4(a) | $N_2((0,-1)',\operatorname{diag}(1,2))$ | Full $A\Sigma A'$ multiplication supplied |
| 3 | 4(b) | Shifted mean $(2,1,1)'$, original covariance | Verified and explained |
| 3–4 | 5(a) | Mean $(-1,-11)'$, covariance $\begin{bmatrix}5&11\\11&28\end{bmatrix}$ | Full matrix and scalar cross-checks supplied |
| 4 | 5(b), first | $(X_1,X_3)'\sim N_2((2,4)',\operatorname{diag}(1,2))$ | Fully explained |
| 4 | 5(b), second | $X_2\sim N(-1,5)$ | Preserved duplicated source label, explained as marginal |
| 4–5 | 6(a)–(e) | No, yes, yes, yes, no; final covariance 10 | Every covariance verified |
| 6 | 7(a)–(e) | Yes, no, yes, yes, no; final covariance 6 | Every covariance verified |
| 6–7 | 8(a) | Formal $N_4$ stacked matrix | Structure preserved; negative determinant in second block flagged |
| 7 | 8(b) | $\chi_2^2$ | Valid; first block inverse expanded |
| 7 | 8(c) | $\chi_2^2$ | Invalid with supplied second block; explicit negative quadratic form shown |
| 7 | 9(a)–(c) | $\chi_6^2$, $N_6(\mu,\Sigma/20)$, $W_6(\Sigma,19)$ | All verified with assumptions and degrees-of-freedom explanations |
| 7 | 10(a)–(d) | Exact normal and chi-square results, then approximate chi-square with $S$ | Preserved; exact Hotelling $T^2$/$F$ relation added |
| 7–8 | 11(a)–(b) | Approximate $N_p(\mu,\Sigma/75)$ and $\chi_p^2$ | Preserved with CLT, consistency and sample-size caveats |

**No external `.dat` dataset is required for this worksheet.** Its questions provide either their complete numerical inputs or enough symbolic assumptions to specify the requested distributions. No unprovided sample observations, simulation results or hypothesis-test p-values have been invented.

***

## Final study advice

A reliable way to master this worksheet is to solve the **same type of problem without looking at the worked answer**, then compare each intermediate step. Start with covariance and correlation, learn to multiply a matrix by a vector, and finally recognize whether a question calls for a *normal transformation*, a *marginal*, an *independence check*, a *chi-square form* or a *sampling distribution*.

Most examination mistakes are caused not by a difficult theorem, but by choosing the wrong theorem for the assumptions, losing a negative sign, confusing variance with standard deviation, forgetting a covariance term, or mistaking an approximate distribution for an exact one. Keep the **dimension**, the **sample size**, and the **population-versus-sample covariance** distinctions visible on your working paper at all times.

*End of DA2451 Practice Worksheet 3 Complete Teaching Guide. Questions 4 and 5 of the remaining worksheets are intentionally not processed here.*
