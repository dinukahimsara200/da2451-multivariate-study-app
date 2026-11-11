# DA2451: Multivariate Normal Distribution

## A complete, beginner-first teaching book

**Course:** DA2451, Multivariate Methods in Business, Semester 4 (2026)  
**Primary source:** *Lec6.pdf*, **“Multivariate normal distribution,” 10 pages**  
**Purpose:** To understand the lecture completely, including the mathematical ideas that the short notes assume the reader already knows.

> **How to read this book.** Read Parts I and II even if the symbols look familiar. They explain the foundations that make the later calculations meaningful. Then read Parts III–V in order. Work through the calculations with a pencil before running the R code. The **Source link** annotations identify the lecture pages; material marked **Teaching expansion** provides additional explanations, calculations, exercises, or code, not text or results claimed to appear in the lecturer's PDF.
>
> **Source fidelity.** The lecturer's worked examples on pages 4 and 5 deliberately leave some answers as question marks. This book **calculates** those answers and labels the calculations as completions. The lecturer lists conditional normal distributions but explicitly **omits** their treatment on page 4. An optional conditional-normality explanation here is therefore clearly identified as supplementary. The source mentions R-relevant statistical methods but **does not provide R code or numerical test output**. All R demonstrations here are newly written teaching examples, not reproduced lecture results.

---

## A map of the original ten pages

| Original page | What the lecturer covers | Where it is taught here |
|---|---|---|
| **1** | Why normality matters; univariate normal density; 68.3% and 95.4% areas | Parts I–II |
| **2** | Multivariate density; generalized/Mahalanobis distance; bivariate density and independence | Parts II–III |
| **3** | Correlated bivariate surfaces and contours; volumes represent probability; contour-map analogy | Part III |
| **4** | Four headline normal-distribution properties; Result 1; Example 1 | Part IV |
| **5** | Result 2 and Example 2; Result 3 and start of Example 3 | Part IV |
| **6** | Completion of Example 3; Result 4 and Example 4 | Part IV |
| **7** | Result 5: squared Mahalanobis distance and chi-square probability ellipsoids | Parts III–IV |
| **8** | Ellipsoid and principal directions; exact sampling distribution of the mean; multivariate CLT | Parts IV–V |
| **9** | Assessing univariate and multivariate normality; Q–Q plots; Mardia's hypotheses | Part VI |
| **10** | Transformations; detecting outliers; standardized values; Mahalanobis distances | Parts VI–VII |

**Roadmap:** Randomness → one normal variable → multiple related variables → vector/matrix notation → multivariate normal density → five special properties → sample averages → normality checks → outliers → R practice.

---

# Part I. Learn the language of probability from zero

## 1. What does “random” mean?

Imagine a bank measuring how long each customer waits in a queue. Before a particular customer arrives, we do not know that customer's waiting time. It could be 2 minutes, 7 minutes, or 12 minutes. The value is **uncertain**. That is all we need to begin speaking about randomness.

A **random experiment** is a situation whose outcome is not fully predictable in advance. A **random variable** assigns a number to its outcome.

- $X=$ the waiting time of a randomly selected customer.
- $Y=$ that customer's transaction amount.
- $Z=$ that customer's satisfaction rating.

A **realization** or **observed value** is what the variable actually takes for one customer. We use a capital letter such as $X$ for the random variable and a lowercase letter such as $x=7$ for an observed value.

A **population** means all people, items, or observations about which we want to draw a conclusion. A **sample** is a set of observations collected from that population. Their differences matter:

| Population quantity | Meaning | Sample counterpart |
|---|---|---|
| $\mu$ | True population mean | $\bar{x}$, calculated sample mean |
| $\sigma^2$ | True population variance | $s^2$, sample variance |
| $\Sigma$ | True population covariance matrix | $S$, sample covariance matrix |
| $\rho$ | True population correlation | $r$, sample correlation |

The population quantities are often unknown. We **estimate** them from sample data. A sample estimate is not automatically identical to the population value.

## 2. What is a probability distribution?

A distribution describes **which values are possible and how likely different values or regions are**.

For a discrete random variable, such as the number of complaints received in one day, individual outcomes may have positive probabilities: $P(X=0)$, $P(X=1)$, and so on.

For a continuous random variable, such as waiting time or temperature, individual exact points have probability zero in the continuous mathematical model. Instead, we ask questions such as

$$P(5\le X\le 10).$$

A continuous distribution is often described by a **probability density function** (PDF), written $f(x)$.

### Density is not probability

This distinction is essential when reading the multivariate formula later.

- $f(7)$ is the *height* of the density curve at 7.
- $P(5\le X\le 10)$ is the *area beneath the curve* from 5 to 10.
- The total area over all possible values is 1.

The height of a density is **not** usually a probability. A density can even be larger than 1 when a distribution is concentrated in a narrow region; the **area** must still total 1.

Mathematically,

$$P(a\le X\le b)=\int_a^b f(x)\,dx, \qquad \int_{-\infty}^{\infty}f(x)\,dx=1.$$

Here $\int$ means *add up infinitely many tiny strips of area*. Understanding the meaning is more important initially than performing integration by hand.

## 3. Mean, variance, and standard deviation

The **mean** tells us the central or typical location of the distribution. For a continuous random variable, its theoretical mean is written

$$\mu=E(X),$$

where $E$ stands for **expected value**, a probability-weighted average.

For five observed waiting times of $2,4,6,8,10$ minutes,

$$\bar{x}=\frac{2+4+6+8+10}{5}=6.$$

The **variance** measures how spread out values are around the mean. At the population level,

$$\sigma^2=\operatorname{Var}(X)=E[(X-\mu)^2].$$

Read this as: *subtract the mean, square the difference, then take the average in the population distribution.* Squaring prevents negative and positive deviations from cancelling. For a sample of size $n$,

$$s^2=\frac{\sum_{i=1}^{n}(x_i-\bar{x})^2}{n-1}.$$

The $n-1$ is the usual **sample-variance correction**. When calculating the variance of a set of values as an entire population rather than estimating an unknown population variance, a denominator of $n$ can be appropriate. Do not silently swap these conventions.

The **standard deviation** is the square root of variance:

$$\sigma=\sqrt{\sigma^2}, \qquad s=\sqrt{s^2}.$$

It has the same units as the variable. If waiting time is in minutes, standard deviation is in minutes, while variance is in minutes squared.

### A worked spread example

With $2,4,6,8,10$, the mean is 6. The deviations are $-4,-2,0,2,4$ and their squares are $16,4,0,4,16$. Their sum is 40. Thus,

$$s^2=\frac{40}{5-1}=10,\qquad s=\sqrt{10}\approx3.162.$$

The mean locates the center; standard deviation describes a typical **scale** of deviations around that center. It does *not* mean every observation differs from the mean by precisely $3.162$.

## 4. Relationships between two variables

Suppose a company records advertising expenditure $X$ and sales $Y$. Their measurements might rise together, move in opposite directions, or have no clear linear relationship.

### Covariance

Covariance records how deviations from the means move together:

$$\operatorname{Cov}(X,Y)=E[(X-\mu_X)(Y-\mu_Y)].$$

For a sample,

$$s_{XY}=\frac{\sum_{i=1}^{n}(x_i-\bar{x})(y_i-\bar{y})}{n-1}.$$

If $X$ is above its mean while $Y$ also tends to be above its mean, the product of deviations is often positive: **positive covariance**. If one tends to be above while the other is below, it is often negative: **negative covariance**.

Covariance depends on the measurement units. That makes it hard to compare across very different variables.

### Correlation

Correlation rescales covariance:

$$\rho_{XY}=\frac{\operatorname{Cov}(X,Y)}{\sigma_X\sigma_Y}.$$

The number $\rho$ lies between $-1$ and $1$ when both standard deviations are positive.

| Correlation | Interpretation |
|---|---|
| Near $+1$ | Strong positive **linear** tendency |
| Near $0$ | Little or no **linear** association; nonlinear relationships may exist |
| Near $-1$ | Strong negative **linear** tendency |

**Important:** Correlation does not establish causation. Two variables can be correlated because of a third variable, selection effects, coincidence, or a genuine causal relationship.

### Independence versus zero correlation

**Independent** variables are more strongly separated than merely uncorrelated variables: learning one variable's value does not change the other variable's probability distribution.

- Independence, assuming finite variances, **implies zero covariance**.
- Zero covariance **does not generally imply independence**.
- But for variables that are **jointly multivariate normal**, zero covariance **does imply independence**. That special result is stated on lecture pages 2 and 6.

A useful counterexample outside joint normality is $X$ taking $-1,0,1$ with equal probabilities and $Y=X^2$. By symmetry $\operatorname{Cov}(X,Y)=0$, but $Y$ is completely determined by $X$; they are not independent.

## 5. Why we need vectors and matrices

A bank customer may have several measurements: income, monthly expenditure, and savings. A single number cannot describe the full observation. Instead, we put the numbers into a **vector**.

$$\mathbf{x}=\begin{bmatrix}x_1\\x_2\\x_3\end{bmatrix}=\begin{bmatrix}80\\55\\25\end{bmatrix}.$$

A vector is an ordered list of numbers. The notation $3\times1$ says it has **three rows and one column**. More generally, $p$ is the number of measured variables, and a $p\times1$ column vector is called **$p$-dimensional**.

In the lecture, the random vector is sometimes displayed as $\mathbf{X}'=[X_1,X_2,\ldots,X_p]$. The apostrophe ($'$) denotes a **transpose**: it turns a column into a row, or vice versa. In this book, bold $\mathbf{X}$ always denotes the column vector.

A **matrix** is a rectangular table of numbers. The covariance matrix for three variables is

$$\Sigma=\begin{bmatrix}
\sigma_{11}&\sigma_{12}&\sigma_{13}\\
\sigma_{21}&\sigma_{22}&\sigma_{23}\\
\sigma_{31}&\sigma_{32}&\sigma_{33}
\end{bmatrix}.$$

- The diagonal entries $\sigma_{11}$, $\sigma_{22}$, $\sigma_{33}$ are **variances**.
- The off-diagonal entries are **covariances**.
- Covariance is symmetric, so $\sigma_{12}=\sigma_{21}$.
- The matrix is $p\times p$ when there are $p$ variables.

For two variables with variances 4 and 9 and covariance 3,

$$\Sigma=\begin{bmatrix}4&3\\3&9\end{bmatrix},\qquad
\rho_{12}=\frac{3}{\sqrt4\sqrt9}=\frac36=0.5.$$

The covariance matrix tells us not only **how spread out each variable is**, but also **the direction of their joint spread**.

### The mathematical notation survival kit

| Symbol | Read it as | What it means here |
|---|---|---|
| $\mathbf{X}$ | “bold X” | Random column vector |
| $\mathbf{x}$ | “bold lowercase x” | One observed column vector |
| $\boldsymbol\mu$ | “mu vector” | Vector of population means |
| $\Sigma$ | “capital sigma” | Population covariance matrix |
| $S$ | “S” | Sample covariance matrix |
| $\mathbf{a}'$ | “a transpose” | Row vector of coefficients |
| $\Sigma^{-1}$ | “sigma inverse” | Matrix inverse, **not** entrywise reciprocals |
| $|\Sigma|$ | “determinant of sigma” | Scalar measuring a matrix's volume scaling |
| $\sqrt{\ }$ | “square root” | Nonnegative root |
| $\sim$ | “is distributed as” | Connects a random quantity to its distribution |
| $N_p(\boldsymbol\mu,\Sigma)$ | “p-variate normal” | $p$-dimensional normal distribution |
| $\chi_p^2$ | “chi-square with p degrees of freedom” | Distribution used for squared normal distances |
| $\bar{\mathbf X}$ | “X-bar vector” | Mean of several observed vectors |

### Three matrix operations, worked simply

**(1) Multiply a row by a column.**

$$[2,-1]\begin{bmatrix}3\\4\end{bmatrix}=2(3)+(-1)(4)=2.$$

Multiply matching entries and add them.

**(2) Multiply a matrix by a column.**

$$\begin{bmatrix}2&1\\1&3\end{bmatrix}
\begin{bmatrix}4\\5\end{bmatrix}
=\begin{bmatrix}2(4)+1(5)\\1(4)+3(5)\end{bmatrix}
=\begin{bmatrix}13\\19\end{bmatrix}.$$

Each output entry is the dot product of a row with the vector.

**(3) Multiply a row, matrix, and column.**

$$\begin{bmatrix}1&-1\end{bmatrix}
\begin{bmatrix}2&1\\1&3\end{bmatrix}
\begin{bmatrix}1\\-1\end{bmatrix}.$$

First do matrix times column: $[1,-2]'$. Then multiply the row by that result: $1(1)+(-1)(-2)=3$. This kind of expression is called a **quadratic form**. It will repeatedly appear as $\mathbf{a}'\Sigma\mathbf{a}$ or $(\mathbf{x}-\boldsymbol\mu)'\Sigma^{-1}(\mathbf{x}-\boldsymbol\mu)$.

### Inverse and determinant, without mystery

For a two-by-two matrix $M=\left[\begin{smallmatrix}a&b\\c&d\end{smallmatrix}\right]$,

$$|M|=ad-bc.$$

If $ad-bc\ne0$, its inverse is

$$M^{-1}=\frac1{ad-bc}\begin{bmatrix}d&-b\\-c&a\end{bmatrix}.$$

Example:

$$M=\begin{bmatrix}4&2\\2&9\end{bmatrix},\quad |M|=4(9)-2(2)=32,$$

$$M^{-1}=\frac1{32}\begin{bmatrix}9&-2\\-2&4\end{bmatrix}.$$

A valid covariance matrix is **positive semidefinite**: no genuine variance of a linear combination can be negative. To use the ordinary multivariate *density formula with $\Sigma^{-1}$*, we need the stronger condition that $\Sigma$ is **positive definite** and hence invertible, with $|\Sigma|>0$. A singular covariance matrix can still describe a degenerate normal random vector, but it does not have the standard full-dimensional density used in this lecture. This detail prevents the common mistake of inverting a matrix that has no inverse.

### How raw observations turn into a covariance matrix

For $n$ observations of $p$ variables, arrange the data in an $n\times p$ table: each **row** is a person or case; each **column** is a variable. Compute each column mean, subtract it from all values in that column, and call the resulting centered table $C$. The usual sample covariance matrix is

$$S=\frac{1}{n-1}C'C.$$

You do not need to memorize that multiplication immediately. Its diagonal entries are the sample variances, and its off-diagonal entries average products of deviations, exactly as described earlier.

---

# Part II. Begin with the familiar univariate normal distribution

**Source link:** Lecture page **1**, introductory bullets and Section **1**, “Univariate normal distribution.”

## 6. What does a normal distribution look like?

A normal distribution is a particular theoretical model for continuous data. Its curve is symmetrical, smooth, and **bell-shaped**. Many observations are relatively near the mean, fewer are far from it, and extremely far values are increasingly rare.

The notation

$$X\sim N(\mu,\sigma^2)$$

means that the **random variable $X$ has a normal distribution** with mean $\mu$ and **variance** $\sigma^2$. The second parameter is variance, *not standard deviation*.

The density formula from the lecture is

$$\boxed{f(x)=\frac{1}{\sqrt{2\pi\sigma^2}}\exp\!\left[-\frac12\left(\frac{x-\mu}{\sigma}\right)^2\right],\qquad -\infty<x<\infty.}$$

Equivalent notation uses $e^u$ instead of $\exp(u)$.

Read each piece slowly:

1. $x$ is a possible observed value.
2. $\mu$ determines **where the bell is centered**.
3. $\sigma$ determines **how wide or narrow** the bell is.
4. $(x-\mu)/\sigma$ measures how many standard deviations $x$ lies from the mean.
5. Squaring makes distance in either direction contribute positively.
6. The negative sign and exponential $\exp(-\tfrac12 z^2)$ make the height diminish as $|z|$ grows.
7. $1/\sqrt{2\pi\sigma^2}$ scales the total area to exactly 1.

Here $\pi\approx3.14159$ and $e\approx2.71828$ are mathematical constants. No previous knowledge of exponentials is needed to understand the geometric message: **farther from the mean generally means lower density**.

## 7. The normal distribution's 68.3% and 95.4% rules

The figure on **lecture page 1, Figure 1** shows a bell with a central interval from $\mu-\sigma$ to $\mu+\sigma$ and a wider interval from $\mu-2\sigma$ to $\mu+2\sigma$. The annotated areas are:

$$\boxed{P(\mu-\sigma\le X\le\mu+\sigma)\approx0.683}$$

and

$$\boxed{P(\mu-2\sigma\le X\le\mu+2\sigma)\approx0.954.}$$

These are probabilities of **falling within intervals**, not heights of the curve. They mean approximately **68.3%** within one standard deviation and **95.4%** within two, *when $X$ is normal*.

### Fully worked intuition

Suppose test scores are modelled as $N(60,10^2)$. The mean is 60 and the standard deviation is 10.

- One-standard-deviation interval: $60-10=50$ through $60+10=70$; probability $\approx0.683$.
- Two-standard-deviation interval: $60-20=40$ through $60+20=80$; probability $\approx0.954$.

This is a property of the **model**, not a guarantee that exactly 68.3 out of every 100 observed scores must fall in the first interval.

The familiar *three-sigma* approximation, **99.7%**, is a **teaching expansion**; the page explicitly gives the one- and two-sigma values, not the three-sigma value.

## 8. Standardization: turn different units into comparable distances

If $X\sim N(\mu,\sigma^2)$, define its **standard score**:

$$Z=\frac{X-\mu}{\sigma}.$$

Then $Z\sim N(0,1)$: mean zero, variance one. This is the **standard normal distribution**.

Example: a customer has a transaction amount of $120$, while the population mean is $100$ and the standard deviation is $10$:

$$z=\frac{120-100}{10}=2.$$

This customer is **two standard deviations above the population mean**. Another customer with $z=-1.5$ is one and a half standard deviations below the mean.

The sign tells you direction; the absolute value tells you standardized magnitude. Standardization will become the one-dimensional ancestor of **Mahalanobis distance**.

## 9. Why the lecturer introduces normality before multivariate methods

The opening bullets on page 1 give **two** reasons normal distributions are useful:

**Reason 1: a population model.** In some situations, the normal distribution can approximate the pattern of actual population data well enough to support modelling and inference.

**Reason 2: sampling distributions.** Even when the original population is not normal, the **central limit effect** often makes distributions of properly scaled sample means and many related statistics approximately normal as sample size grows. This is the path to the multivariate central limit theorem on page 8.

The lecturer also cautions that real-world data are not exactly multivariate normal. So the right goal is **a useful approximation whose limitations we understand**, not the unrealistic demand that every observed dataset must be mathematically perfect.

---

# Part III. From one variable to many: the multivariate normal model

**Source link:** Lecture pages **2–3**, Section **2** and **2.1**, plus page **7**, Result 5.

## 10. Why a bell curve is not enough for business data

Suppose we measure two quantities on each shop: daily revenue and daily number of customers. Looking at two separate histograms tells us how each quantity behaves by itself. It does not tell us whether **high-revenue days tend to be high-customer days**.

A **joint distribution** describes the behaviour of several variables *together*. In particular, it describes how likely different combinations are.

A **bivariate** distribution involves two variables ($p=2$). A **trivariate** distribution involves three ($p=3$). A **multivariate** distribution permits any number $p$.

Write the random vector and its mean as

$$\mathbf X=\begin{bmatrix}X_1\\\vdots\\X_p\end{bmatrix},\qquad
\boldsymbol\mu=E(\mathbf X)=\begin{bmatrix}\mu_1\\\vdots\\\mu_p\end{bmatrix}.$$

Its covariance matrix is $\Sigma$. Together, $\boldsymbol\mu$ tells us **where the cloud of observations is centered**, and $\Sigma$ describes **its size, orientation, and internal relationships**.

## 11. The multivariate normal density: interpret it before calculating it

The lecture defines the $p$-dimensional density as

$$\boxed{f(\mathbf x)=\frac{1}{(2\pi)^{p/2}|\Sigma|^{1/2}}
\exp\left[-\frac12(\mathbf x-\boldsymbol\mu)'\Sigma^{-1}(\mathbf x-\boldsymbol\mu)\right].}$$

This is the standard *nondegenerate* multivariate normal density, with $\Sigma$ positive definite. We write

$$\mathbf X\sim N_p(\boldsymbol\mu,\Sigma).$$

### Decode every object and dimension

| Piece | Size | Meaning |
|---|---:|---|
| $\mathbf x$ | $p\times1$ | One possible observed combination |
| $\boldsymbol\mu$ | $p\times1$ | Location of the multivariate center |
| $\mathbf x-\boldsymbol\mu$ | $p\times1$ | Deviations from all variable means |
| $(\mathbf x-\boldsymbol\mu)'$ | $1\times p$ | Row of those deviations |
| $\Sigma$ | $p\times p$ | Population covariance matrix |
| $\Sigma^{-1}$ | $p\times p$ | Inverse covariance matrix |
| $(\mathbf x-\boldsymbol\mu)'\Sigma^{-1}(\mathbf x-\boldsymbol\mu)$ | $1\times1$ | Squared generalized distance |
| $|\Sigma|^{1/2}$ | scalar | Scale factor related to the overall spread |
| $(2\pi)^{p/2}$ | scalar | Dimension-dependent normalizing constant |

The row–matrix–column multiplication produces one number, as a density formula requires. The exponential falls as generalized distance from the center increases. The denominator keeps the **total probability across all $p$ dimensions** equal to 1.

**Important distinction:** In one dimension, an interval has probability represented by **area** under a curve. In two dimensions, the joint density becomes a **surface** over the $x_1$–$x_2$ plane, and a region's probability is the **volume under that surface above the region**. For three or more dimensions the same integration principle applies, even though we cannot draw the whole shape in ordinary space.

## 12. From ordinary standard score to Mahalanobis distance

In one variable the normal exponent uses

$$\left(\frac{x-\mu}{\sigma}\right)^2
=(x-\mu)\frac1{\sigma^2}(x-\mu).$$

The lecture replaces this with the multivariable quadratic form

$$\boxed{D^2=(\mathbf x-\boldsymbol\mu)'\Sigma^{-1}(\mathbf x-\boldsymbol\mu).}$$

This is the **squared Mahalanobis distance**. The actual Mahalanobis distance is $D=\sqrt{D^2}$. The lecture often works with the *squared* quantity because of its elegant mathematical distribution.

### Why ordinary Euclidean distance can mislead

Euclidean distance treats every coordinate on an equal raw-number scale:

$$d_E^2=(x_1-\mu_1)^2+(x_2-\mu_2)^2.$$

But a change of 10 units can be ordinary for a high-variance variable and extreme for a low-variance one. And if variables are strongly related, an observation that moves **against** the usual relationship may be unusual even when its separate coordinates are not.

Mahalanobis distance corrects for **both variable scale and correlation** using $\Sigma^{-1}$.

**Think of a crowd walking diagonally across a plaza.** Someone far away *along the direction the crowd naturally stretches* might be typical. Someone the same Euclidean distance away *perpendicular to that direction* could be exceptional. Mahalanobis distance measures how unusual a point is relative to the crowd's actual shape.

### Worked two-dimensional calculation

Take an illustrative mean and covariance matrix (not a lecturer-supplied dataset):

$$\boldsymbol\mu=\begin{bmatrix}10\\20\end{bmatrix},\quad
\Sigma=\begin{bmatrix}4&2\\2&9\end{bmatrix},\quad
\mathbf x=\begin{bmatrix}13\\24\end{bmatrix}.$$

**Step 1: Difference from the center.**

$$\mathbf x-\boldsymbol\mu=\begin{bmatrix}3\\4\end{bmatrix}.$$

**Step 2: Find the inverse.** The determinant is $4(9)-2(2)=32$, so

$$\Sigma^{-1}=\frac1{32}\begin{bmatrix}9&-2\\-2&4\end{bmatrix}.$$

**Step 3: Multiply inverse by deviation.**

$$\Sigma^{-1}(\mathbf x-\boldsymbol\mu)
=\frac1{32}\begin{bmatrix}9(3)-2(4)\\-2(3)+4(4)\end{bmatrix}
=\frac1{32}\begin{bmatrix}19\\10\end{bmatrix}.$$

**Step 4: Multiply by the transposed deviation.**

$$D^2=[3,4]\frac1{32}\begin{bmatrix}19\\10\end{bmatrix}
=\frac{57+40}{32}=\boxed{3.03125}.$$

Thus $D\approx\sqrt{3.03125}\approx1.741$. The number describes *joint, covariance-adjusted distance*; it is not itself a probability or p-value.

### Special case: uncorrelated coordinates

If $\Sigma$ is diagonal with variances $\sigma_1^2,\dots,\sigma_p^2$, then

$$D^2=\sum_{k=1}^{p}\left(\frac{x_k-\mu_k}{\sigma_k}\right)^2.$$

We are simply adding **squared z-scores**. Correlation adds the important complication that the ordinary separate z-scores are not sufficient to describe joint unusualness.

## 13. Bivariate normal density in explicit form

**Source link:** Lecture **page 2, Section 2.1**.

For $p=2$, define

$$\boldsymbol\mu=\begin{bmatrix}\mu_1\\\mu_2\end{bmatrix},\quad
\Sigma=\begin{bmatrix}\sigma_{11}&\sigma_{12}\\\sigma_{12}&\sigma_{22}\end{bmatrix},\quad
\rho_{12}=\frac{\sigma_{12}}{\sqrt{\sigma_{11}}\sqrt{\sigma_{22}}}.$$

Here $\sigma_{11}$ and $\sigma_{22}$ are **variances**, not standard deviations. Let $\sigma_1=\sqrt{\sigma_{11}}$ and $\sigma_2=\sqrt{\sigma_{22}}$.

If $|\rho_{12}|<1$ and both variances are positive, the bivariate density is

$$\boxed{f(x_1,x_2)=\frac{1}{2\pi\sigma_1\sigma_2\sqrt{1-\rho_{12}^2}}
\exp\!\left[-\frac{1}{2(1-\rho_{12}^2)}
\left\{z_1^2+z_2^2-2\rho_{12}z_1z_2\right\}\right],}$$

where

$$z_1=\frac{x_1-\mu_1}{\sigma_1},\qquad z_2=\frac{x_2-\mu_2}{\sigma_2}.$$

This is the lecture's longer formula, rewritten using $z_1,z_2$ so that its structure becomes visible. The term $-2\rho_{12}z_1z_2$ incorporates the relationship between the variables.

### Where does it come from? A short derivation

Replace the covariance in terms of correlation:

$$\Sigma=\begin{bmatrix}
\sigma_1^2&\rho\sigma_1\sigma_2\\
\rho\sigma_1\sigma_2&\sigma_2^2
\end{bmatrix}.$$

Its determinant is

$$|\Sigma|=\sigma_1^2\sigma_2^2(1-\rho^2),$$

and its inverse is

$$\Sigma^{-1}=\frac{1}{1-\rho^2}
\begin{bmatrix}
1/\sigma_1^2&-\rho/(\sigma_1\sigma_2)\\
-\rho/(\sigma_1\sigma_2)&1/\sigma_2^2
\end{bmatrix}.$$

Putting this inverse into $(\mathbf x-\boldsymbol\mu)'\Sigma^{-1}(\mathbf x-\boldsymbol\mu)$ produces

$$D^2=\frac{z_1^2+z_2^2-2\rho z_1z_2}{1-\rho^2}.$$

Substituting $D^2$ and $|\Sigma|$ into the general multivariate density gives the bivariate formula above. No new distribution was invented: the two-dimensional expression is simply the general formula with $p=2$.

The lecturer refers readers to **Example 4.1 on page 151** of *Applied Multivariate Statistical Analysis* by R. A. Johnson and D. W. Wichern. This book records that reference but does **not** reproduce or pretend to have read that external textbook example.

### Numerical density example, with all numbers identified as illustrative

Let $\mu_1=50$, $\mu_2=70$, $\sigma_1=2$, $\sigma_2=3$, $\rho=0.5$, and evaluate the density at $(x_1,x_2)=(54,73)$.

$$z_1=(54-50)/2=2,\qquad z_2=(73-70)/3=1.$$

Then

$$D^2=\frac{2^2+1^2-2(0.5)(2)(1)}{1-0.5^2}
=\frac{4+1-2}{0.75}=4.$$

The joint density equals

$$f(54,73)=\frac{e^{-2}}{2\pi(2)(3)\sqrt{0.75}}\approx\boxed{0.004145}.$$

This $0.004145$ is a **density height**, not the probability that the pair equals $(54,73)$, which is zero under a continuous distribution. To calculate the probability of a rectangle such as $52\le X_1\le54$ *and* $70\le X_2\le73$, we must integrate the joint density over that rectangle (normally with software).

## 14. Uncorrelated versus correlated bivariate normal clouds

**Source link:** Lecture **pages 2–3**, including the two illustrated surfaces/contours and the Wolfram demonstration link.

The lecturer contrasts two bivariate normal distributions, both with $\sigma_{11}=\sigma_{22}=1$:

- **Left illustration:** $\rho_{12}=0$. The variables are independent, and density contours are circular when the two variances are equal.
- **Right illustration:** $\rho_{12}=0.75$. The variables are positively correlated, and equal-density contours become elongated, tilted ellipses. High-high and low-low combinations become relatively more common along the main diagonal.

The 3D surfaces can look like peaks or hills. A **contour plot** is what we get by drawing lines along points that have an equal density height, much as a geographical map joins points of equal elevation.

The second half of **page 3** gives a contour-map analogy with mountains, contour spacing, and slopes. It is not an unrelated decoration: it teaches how a three-dimensional surface can be understood using two-dimensional contours. **Closer contour lines** correspond to steeper change in height; **widely spaced** contours indicate gentler change. For a normal density the equal-density contours follow constant Mahalanobis distance.

The lecture also links to an interactive bivariate-normal demonstration at:

<https://demonstrations.wolfram.com/JointDensityOfBivariateGaussianRandomVariables/>

The source's statement about probability concentrating “along a line” describes the visible tendency of the correlated data cloud; for $|\rho|<1$ the cloud still has **nonzero two-dimensional spread**, rather than literally lying on one exact line.

### Why does the distribution factorize when correlation is zero?

Set $\rho=0$ in the bivariate normal formula. Then

$$D^2=z_1^2+z_2^2,$$

and

$$f(x_1,x_2)=\frac{1}{2\pi\sigma_1\sigma_2}
\exp\left(-\frac12z_1^2\right)
\exp\left(-\frac12z_2^2\right).$$

Separate the factors:

$$f(x_1,x_2)=
\underbrace{\frac{1}{\sqrt{2\pi}\sigma_1}e^{-z_1^2/2}}_{f_1(x_1)}
\underbrace{\frac{1}{\sqrt{2\pi}\sigma_2}e^{-z_2^2/2}}_{f_2(x_2)}
=f_1(x_1)f_2(x_2).$$

This product factorization is the density condition for independence. **It works because the pair is jointly normal**, not merely because two arbitrary variables happen to have correlation zero.

## 15. Why the shapes are ellipses: eigenvectors, axes, and scale

**Teaching expansion connected to source Figure 4 on page 8.**

The normal contour equation $D^2=c$ describes an ellipsoid. In two dimensions an ellipsoid is simply an **ellipse**. The matrix $\Sigma$ contains the ellipse's geometry.

A covariance matrix has real, nonnegative **eigenvalues** $\lambda_1,\ldots,\lambda_p$ and mutually perpendicular **eigenvector directions** $\mathbf e_1,\ldots,\mathbf e_p$ in the nonsingular normal setting. These are the special directions in which the spread can be described separately.

For the contour

$$(\mathbf x-\boldsymbol\mu)'\Sigma^{-1}(\mathbf x-\boldsymbol\mu)=c,$$

the axis directions are eigenvectors of $\Sigma$, and the corresponding axis **half-lengths** are

$$\sqrt{c\lambda_1},\ \sqrt{c\lambda_2},\ldots,\sqrt{c\lambda_p}.$$

In lecture **Figure 4 on page 8**, the ellipse is centered at $(\mu_1,\mu_2)$, its directions are labelled $\mathbf e_1$ and $\mathbf e_2$, and the red/blue directions illustrate the eigenvalue-dependent scales. Here $\lambda_i$ controls spread along direction $\mathbf e_i$; the $\chi^2$ cutoff controls how much probability is enclosed.

The important message is: **the covariance matrix is a geometric description of multivariate spread**. Its eigenvectors control orientation, and its eigenvalues control relative widths. These are the same mathematical ideas you encounter in Principal Component Analysis, although PCA and multivariate normality are different topics.

---
# Part IV. Five major properties of multivariate normal distributions

**Source link:** Lecture pages **4–7**, Section **3**, Results **1–5**. The lecture first previews four properties on page 4: linear combinations are normal, subsets are normal, zero covariance entails independence, and conditional distributions are normal (the last is explicitly marked **“omitted”**). The numbered results then develop transformations, subsets, independence, and Mahalanobis distances.

## 16. Result 1: every linear combination is normal

### What is a linear combination?

A **linear combination** is a weighted sum such as

$$L=3X_1-2X_2+5X_3.$$

The constants $3,-2,5$ tell us how much each component contributes. This covers business quantities such as an income-minus-expenses balance or a weighted performance index. With $p$ variables, assemble the weights into

$$\mathbf a=\begin{bmatrix}a_1\\a_2\\\vdots\\a_p\end{bmatrix},$$

so that

$$\mathbf a'\mathbf X=a_1X_1+a_2X_2+\cdots+a_pX_p.$$

The lecture's **Result 1** states:

$$\boxed{\mathbf X\sim N_p(\boldsymbol\mu,\Sigma)
\quad\Longrightarrow\quad
\mathbf a'\mathbf X\sim N\left(\mathbf a'\boldsymbol\mu,\ \mathbf a'\Sigma\mathbf a\right).}$$

**Interpretation:** Any weighted sum of jointly normal variables is normal. Its mean is the same weighted sum of the individual means. Its variance incorporates all individual variances **and** all covariances.

The lecture also gives the converse: **if every linear combination** $\mathbf a'\mathbf X$ is normal (including constant/degenerate normal cases) with the specified mean and variance, then the entire vector is multivariate normal. This characterizes joint normality. Checking *only* $X_1$, *only* $X_2$, and so on is not enough; those correspond to only a few specially chosen weight vectors.

### Why are the mean and variance formulas reasonable?

The expected value operator is linear:

$$E(a_1X_1+\cdots+a_pX_p)=a_1E(X_1)+\cdots+a_pE(X_p).$$

So $E(L)=\mathbf a'\boldsymbol\mu$.

For two variables,

$$\operatorname{Var}(aX+bY)=a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y)
+2ab\operatorname{Cov}(X,Y).$$

That cross-product term is why we cannot usually add variances directly. In matrix form the same collection of terms is $\mathbf a'\Sigma\mathbf a$.

### Lecture Example 1, completed carefully

**Source link:** Lecture **page 4**, “Example 1.”

We are told

$$\mathbf X\sim N_3(\boldsymbol\mu,\Sigma),\quad
\boldsymbol\mu=\begin{bmatrix}2\\1\\2\end{bmatrix},\quad
\Sigma=\begin{bmatrix}2&1&1\\1&3&0\\1&0&1\end{bmatrix},$$

and $\mathbf a'=[1,-1,0]$.

**Question:** What is the distribution of $\mathbf a'\mathbf X$?

**Step 1. Write the combination as ordinary algebra.**

$$\mathbf a'\mathbf X=[1,-1,0]
\begin{bmatrix}X_1\\X_2\\X_3\end{bmatrix}
=X_1-X_2.$$

The coefficient of $X_3$ is zero, so it has no direct contribution.

**Step 2. Calculate its mean.**

$$E(X_1-X_2)=\mathbf a'\boldsymbol\mu
=[1,-1,0]\begin{bmatrix}2\\1\\2\end{bmatrix}
=2-1+0=\boxed{1}.$$

**Step 3. Calculate its variance using the matrix product.**

First calculate $\Sigma\mathbf a$:

$$\begin{bmatrix}2&1&1\\1&3&0\\1&0&1\end{bmatrix}
\begin{bmatrix}1\\-1\\0\end{bmatrix}
=\begin{bmatrix}2-1+0\\1-3+0\\1+0+0\end{bmatrix}
=\begin{bmatrix}1\\-2\\1\end{bmatrix}.$$

Then multiply on the left:

$$\mathbf a'\Sigma\mathbf a=[1,-1,0]
\begin{bmatrix}1\\-2\\1\end{bmatrix}
=1+2+0=\boxed{3}.$$

**Alternative check:**

$$\operatorname{Var}(X_1-X_2)
=\operatorname{Var}(X_1)+\operatorname{Var}(X_2)
-2\operatorname{Cov}(X_1,X_2)
=2+3-2(1)=3.$$

Therefore,

$$\boxed{X_1-X_2\sim N(1,3).}$$

The lecture leaves the final variance as `?`. **The value 3 above is our worked completion, not a numerical result printed on page 4.** Note that this has **variance 3** and **standard deviation $\sqrt3\approx1.732$**.

### A subtle point: do we need all three component variables to be independent?

**No.** Result 1 is about the full vector being **jointly multivariate normal**, not about having independent components. Covariance terms explicitly accommodate correlations. For example, the covariance between $X_1$ and $X_2$ is 1 in the lecturer's example, so these components are **not** independent.

## 17. Result 2: several linear combinations at once

Suppose we want both total business activity and a profit-like difference:

$$Y_1=X_1+X_2+X_3,\qquad Y_2=X_1-X_2.$$

Write them as a matrix multiplication

$$\mathbf Y=A\mathbf X,\qquad
A=\begin{bmatrix}1&1&1\\1&-1&0\end{bmatrix}.$$

Here $A$ has 2 rows and 3 columns, so $A$ is $2\times3$, while $\mathbf X$ is $3\times1$. Their product is a **$2\times1$ vector**, as expected.

The lecturer's **Result 2** says that if $\mathbf X\sim N_p(\boldsymbol\mu,\Sigma)$ and $A$ is a fixed $q\times p$ matrix, then

$$\boxed{A\mathbf X\sim N_q(A\boldsymbol\mu,\ A\Sigma A').}$$

This is a vector version of Result 1. The output mean is obtained by multiplying the original means; the output covariance matrix is obtained from $A\Sigma A'$.

**Dimensions check:**

$$\underbrace{A}_{q\times p}
\underbrace{\Sigma}_{p\times p}
\underbrace{A'}_{p\times q}
\quad\longrightarrow\quad q\times q.$$

If $A$ has linearly dependent rows, the output distribution can be **singular**. The notation still describes a normal random vector, but the standard density requiring an invertible covariance may not exist. The example below is nonsingular.

### Constant shifts, also stated in Result 2

If $\mathbf d$ is a nonrandom vector of constants, then

$$\boxed{\mathbf X+\mathbf d\sim N_p(\boldsymbol\mu+\mathbf d,\Sigma).}$$

Adding a fixed 100 units to every person's income increases the income **mean** by 100 but does **not** change how incomes vary about their mean. Thus a translation changes location, not covariance.

Combining both operations yields the useful general result

$$A\mathbf X+\mathbf b\sim N_q(A\boldsymbol\mu+\mathbf b,\ A\Sigma A'),$$

where the constant-vector addition is a **teaching expansion** of the two transformations printed on page 5.

### Lecture Example 2, completed carefully

**Source link:** Lecture **page 5**, “Example 2.” It uses exactly the $\boldsymbol\mu$ and $\Sigma$ from Example 1:

$$\boldsymbol\mu=\begin{bmatrix}2\\1\\2\end{bmatrix},\quad
\Sigma=\begin{bmatrix}2&1&1\\1&3&0\\1&0&1\end{bmatrix},\quad
A=\begin{bmatrix}1&1&1\\1&-1&0\end{bmatrix}.$$

We seek the joint distribution of

$$\mathbf Y=\begin{bmatrix}X_1+X_2+X_3\\X_1-X_2\end{bmatrix}=A\mathbf X.$$

**Step 1. Output mean.**

$$A\boldsymbol\mu=
\begin{bmatrix}1&1&1\\1&-1&0\end{bmatrix}
\begin{bmatrix}2\\1\\2\end{bmatrix}
=\begin{bmatrix}2+1+2\\2-1+0\end{bmatrix}
=\boxed{\begin{bmatrix}5\\1\end{bmatrix}}.$$

**Step 2. Calculate $A\Sigma$.**

$$\begin{aligned}
A\Sigma
&=\begin{bmatrix}1&1&1\\1&-1&0\end{bmatrix}
\begin{bmatrix}2&1&1\\1&3&0\\1&0&1\end{bmatrix}\\[2pt]
&=\boxed{\begin{bmatrix}4&4&2\\1&-2&1\end{bmatrix}}.
\end{aligned}$$

**Step 3. Multiply by $A'$.**

$$A'=\begin{bmatrix}1&1\\1&-1\\1&0\end{bmatrix},$$

$$\begin{aligned}
A\Sigma A'
&=\begin{bmatrix}4&4&2\\1&-2&1\end{bmatrix}
\begin{bmatrix}1&1\\1&-1\\1&0\end{bmatrix}\\[2pt]
&=\begin{bmatrix}4+4+2&4-4+0\\1-2+1&1+2+0\end{bmatrix}\\[2pt]
&=\boxed{\begin{bmatrix}10&0\\0&3\end{bmatrix}}.
\end{aligned}$$

**Final answer:**

$$\boxed{\begin{bmatrix}X_1+X_2+X_3\\X_1-X_2\end{bmatrix}
\sim N_2\left(\begin{bmatrix}5\\1\end{bmatrix},
\begin{bmatrix}10&0\\0&3\end{bmatrix}\right).}$$

Again, the printed lecture leaves both matrix calculations as question marks. These numbers are **our calculated completion**.

**Extra interpretation:** The new variables $Y_1$ and $Y_2$ have covariance zero. Because they form a **jointly normal vector**, they are actually independent, even though the original $X_1$ and $X_2$ were correlated. This is an instructive special feature of the example, not a general rule for an arbitrary sum and difference.

## 18. Result 3: every subset of a jointly normal vector is also normal

A **subset of variables** means we choose some components and ignore the others. Suppose a researcher collected five variables but only wants to study variables 1 and 4. The resulting pair is still multivariate normal if the original full vector was multivariate normal.

This is the lecturer's **Result 3** (pages 5–6).

The rule is wonderfully practical:

1. Keep the mean entries corresponding to your selected variables, **in your chosen order**.
2. From the original covariance matrix, keep the rows **and** columns corresponding to those same variables, in that order.
3. The result is the mean and covariance of the subset.

### Lecture Example 3, explained step by step

**Source link:** Lecture **pages 5–6**, “Example 3.”

The given random vector has

$$\boldsymbol\mu=\begin{bmatrix}2\\-3\\1\end{bmatrix},\qquad
\Sigma=\begin{bmatrix}1&1&1\\1&3&2\\1&2&2\end{bmatrix}.$$

We need the joint distribution of $X_1$ and $X_3$ (not $X_1$ and $X_2$).

**Step 1. Select entries 1 and 3 of the mean.**

$$\boldsymbol\mu_{(1,3)}=\begin{bmatrix}2\\1\end{bmatrix}.$$

**Step 2. Keep covariance rows 1 and 3 and columns 1 and 3.**

Original:

$$\Sigma=\begin{array}{c|ccc}
&X_1&X_2&X_3\\\hline
X_1&\color{blue}{1}&1&\color{blue}{1}\\
X_2&1&3&2\\
X_3&\color{blue}{1}&2&\color{blue}{2}
\end{array}.$$

Selected covariance:

$$\Sigma_{(1,3)}=\begin{bmatrix}1&1\\1&2\end{bmatrix}.$$

**Step 3. State the distribution.**

$$\boxed{\begin{bmatrix}X_1\\X_3\end{bmatrix}
\sim N_2\left(\begin{bmatrix}2\\1\end{bmatrix},
\begin{bmatrix}1&1\\1&2\end{bmatrix}\right).}$$

This **matches the result printed on page 6**. The lecture illustrates it by *reordering* the original variables to $X_1,X_3,X_2$ and partitioning the mean and covariance into blocks. Either that method or direct row-and-column selection works. The reordering does **not** change the underlying variables or their statistical relationships; it only makes the partition visible.

**Optional selection-matrix view:** The matrix

$$B=\begin{bmatrix}1&0&0\\0&0&1\end{bmatrix}$$

selects $X_1$ and $X_3$, so $B\mathbf X=[X_1,X_3]'$. This makes Result 3 a direct special case of Result 2, since $B\boldsymbol\mu$ and $B\Sigma B'$ produce exactly the entries above.

## 19. Result 4: independence and zero covariance in the joint normal model

**Source link:** Lecture **page 6**, Result 4, and **page 7**, Example 4 completion.

First, divide a normal vector into two groups:

$$\mathbf X=\begin{bmatrix}\mathbf X_1\\\mathbf X_2\end{bmatrix},\quad
\boldsymbol\mu=\begin{bmatrix}\boldsymbol\mu_1\\\boldsymbol\mu_2\end{bmatrix},\quad
\Sigma=\begin{bmatrix}\Sigma_{11}&\Sigma_{12}\\\Sigma_{21}&\Sigma_{22}\end{bmatrix}.$$

Here $\mathbf X_1$ has $q_1$ entries and $\mathbf X_2$ has $q_2$ entries, so $p=q_1+q_2$. The four symbols $\Sigma_{11}$, $\Sigma_{12}$, $\Sigma_{21}$, and $\Sigma_{22}$ denote **blocks**, which themselves may be matrices, not individual numbers.

- $\Sigma_{11}$ contains covariances **inside group 1**.
- $\Sigma_{22}$ contains covariances **inside group 2**.
- $\Sigma_{12}$ contains covariances **between group 1 and group 2**.
- $\Sigma_{21}=\Sigma_{12}'$ is the transpose cross-covariance block.

For any variables with finite covariance, independence implies zero cross-covariance. Under **joint multivariate normality**, the converse also holds:

$$\boxed{\mathbf X_1\ \text{and}\ \mathbf X_2\ \text{are independent}
\quad\Longleftrightarrow\quad \Sigma_{12}=0.}$$

The $0$ is a whole $q_1\times q_2$ matrix of zeros: **every cross-group covariance must be zero**, not just their average.

The lecture also states the constructive converse: **if two independently distributed normal vectors** $\mathbf X_1\sim N_{q_1}(\boldsymbol\mu_1,\Sigma_{11})$ and $\mathbf X_2\sim N_{q_2}(\boldsymbol\mu_2,\Sigma_{22})$ are put together, their combined vector is normal with block-diagonal covariance

$$\begin{bmatrix}\Sigma_{11}&0\\0&\Sigma_{22}\end{bmatrix}.$$

This is a special and useful closure property of normal distributions.

### Lecture Example 4, interpreted in full

The lecturer gives the covariance matrix

$$\Sigma=\begin{bmatrix}4&1&0\\1&3&0\\0&0&2\end{bmatrix}$$

for a jointly normal three-variable vector. The mean is irrelevant to the specific independence questions.

**Question A: Are $X_1$ and $X_2$ independent?**

Look at the $(1,2)$ entry: $\operatorname{Cov}(X_1,X_2)=1$, not zero. Thus they are **not independent**.

**Question B: Is the pair $(X_1,X_2)$ independent of $X_3$?**

Partition:

$$\underbrace{\begin{bmatrix}X_1\\X_2\end{bmatrix}}_{\mathbf X_A},
\quad\underbrace{X_3}_{\mathbf X_B},\quad
\Sigma=\left[\begin{array}{cc|c}
4&1&0\\
1&3&0\\\hline
0&0&2
\end{array}\right].$$

The between-group covariance block is

$$\Sigma_{AB}=\begin{bmatrix}0\\0\end{bmatrix}.$$

Therefore **the vector $(X_1,X_2)$ is independent of $X_3$**. In particular, $X_3$ is individually independent of each of $X_1$ and $X_2$. Yet $X_1$ and $X_2$ are related to one another.

**What to remember:** Being independent of a *group* is compatible with members **inside that group** being correlated.

## 20. The property the lecture announces but does not develop: conditional normality

**Source link:** Lecture **page 4**, fourth bullet, explicitly **“(omitted).”**  
**Status:** The formulas and example in this section are a **teaching expansion**, not material worked out in the PDF.

A **conditional distribution** describes what we expect for one random variable after we have learned the value of another. The difference between *marginal* and *conditional* statements is easy to see:

- **Marginal:** How is monthly spending distributed across all customers?
- **Conditional:** How is spending distributed **among customers whose income is 100 units**?

If $\begin{bmatrix}X_1\\X_2\end{bmatrix}$ is jointly normal, then for a fixed value $X_1=x_1$,

$$\boxed{X_2\mid X_1=x_1\sim
N\left(\mu_2+\frac{\sigma_{12}}{\sigma_{11}}(x_1-\mu_1),\quad
\sigma_{22}-\frac{\sigma_{12}^2}{\sigma_{11}}\right),}$$

assuming $\sigma_{11}>0$.

This formula says:

1. The expected $X_2$ changes when we learn a particular $X_1$, according to the covariance.
2. The conditional variance is no greater than the marginal variance $\sigma_{22}$.
3. When covariance is zero, knowing $X_1$ does not update $X_2$ in the jointly normal setting.

**Illustrative calculation:** Suppose

$$\boldsymbol\mu=\begin{bmatrix}10\\20\end{bmatrix},\qquad
\Sigma=\begin{bmatrix}4&3\\3&9\end{bmatrix}.$$

For a person whose $X_1=12$,

$$E(X_2\mid X_1=12)=20+\frac34(12-10)=21.5$$

and

$$\operatorname{Var}(X_2\mid X_1=12)=9-\frac{3^2}{4}=6.75.$$

Thus $X_2\mid X_1=12\sim N(21.5,6.75)$. The entire calculation is supplementary, and no examination requirement about conditional distributions is implied by its inclusion.

## 21. Result 5: why squared Mahalanobis distances are chi-square

**Source link:** Lecture **page 7**, Result 5.

If $\mathbf X\sim N_p(\boldsymbol\mu,\Sigma)$, with $\Sigma$ nonsingular, the lecturer states

$$\boxed{(\mathbf X-\boldsymbol\mu)'\Sigma^{-1}(\mathbf X-\boldsymbol\mu)
\sim\chi_p^2.}$$

This is one of the most important bridges in the lecture: it turns a geometric distance into a probability model.

### First, what is a chi-square distribution?

A **chi-square distribution** with $p$ degrees of freedom is the distribution of the sum of squares of $p$ **independent standard normal variables**:

$$Z_1^2+Z_2^2+\cdots+Z_p^2\sim\chi_p^2,
\qquad Z_i\overset{\mathrm{iid}}{\sim}N(0,1).$$

“Degrees of freedom” here indicates the number of independent squared standard-normal components being added. A chi-square variable is never negative. It is generally right-skewed, especially with a small number of degrees of freedom.

### Why does Mahalanobis distance have that distribution?

For a jointly normal vector, a suitable linear transformation can **standardize and decorrelate** its components, producing a vector $\mathbf Z$ of independent standard normal variables. This is sometimes called **whitening**.

Under this transformation,

$$D^2=(\mathbf X-\boldsymbol\mu)'\Sigma^{-1}(\mathbf X-\boldsymbol\mu)
=\mathbf Z'\mathbf Z=Z_1^2+\cdots+Z_p^2.$$

Therefore $D^2\sim\chi_p^2$. This argument explains rather than merely memorizes the result. Formally, if $\Sigma=LL'$ is a Cholesky factorization and $\mathbf Z=L^{-1}(\mathbf X-\boldsymbol\mu)$, then $\mathbf Z\sim N_p(0,I_p)$ and the identity above follows.

Here $I_p$ is the $p\times p$ **identity matrix**, with ones on the diagonal and zeros everywhere else. Its components are independent standard normals because their joint distribution is normal and their off-diagonal covariances are zero.

### Known population parameters versus estimated sample parameters

The exact chi-square result concerns **population** $\boldsymbol\mu$ and $\Sigma$. In applications we usually use $\bar{\mathbf x}$ and $S$ to estimate them. The resulting sample squared distances are **not exactly independent $\chi_p^2$ observations**. The lecture makes the approximate large-sample connection on **page 9**. Do not claim exact chi-square calibration for distances estimated from the same small dataset.

## 22. Probability ellipsoids: the multivariate version of a probability interval

The lecturer defines the set

$$\boxed{\mathcal E_{1-\alpha}=
\left\{\mathbf x:
(\mathbf x-\boldsymbol\mu)'\Sigma^{-1}(\mathbf x-\boldsymbol\mu)
\le\chi_p^2(\alpha)\right\}.}$$

The notation $\chi_p^2(\alpha)$ in the PDF is **the upper $100\alpha$th percentile**: the value with probability $\alpha$ **above** it. Other textbooks or software may use different quantile notation. In R, this cutoff is calculated as `qchisq(1 - alpha, df = p)`.

The region $\mathcal E_{1-\alpha}$ contains population probability $1-\alpha$ for the assumed normal model.

### The intuition

A univariate normal has a high-probability **interval** around its center. A bivariate normal has a high-probability **ellipse**. A trivariate normal has a high-probability **ellipsoid**. The general term *ellipsoid* also applies mathematically in higher dimensions.

It follows from the chi-square distance result:

$$\begin{aligned}
P(\mathbf X\in\mathcal E_{1-\alpha})
&=P(D^2\le\chi_p^2(\alpha))\\
&=1-\alpha.
\end{aligned}$$

For a **95% population probability ellipse** in two dimensions, $p=2$ and $\alpha=0.05$:

$$c=\operatorname{qchisq}(0.95,2)\approx5.991.$$

The ellipse contains points satisfying

$$(\mathbf x-\boldsymbol\mu)'\Sigma^{-1}(\mathbf x-\boldsymbol\mu)\le5.991.$$

The corresponding approximate thresholds in three and five dimensions are $7.815$ and $11.070$, respectively. The cutoff increases with dimension because we are summing more squared standardized coordinates.

### Worked decision using our earlier distance

For the numerical observation in Section 12, $D^2=3.03125$. Under a **bivariate normal model with the specified known population mean and covariance**, $3.03125<5.991$, so the point is *inside* the 95% population probability ellipse. It would not be designated as outside that ellipse.

**What this conclusion does not mean:**

- It does not establish that the point is “good” or “correct.”
- It does not imply its individual observation has 95% probability of being “true.”
- It is not a **95% confidence region for the unknown mean vector**.
- If means/covariances were estimated from the same small sample, using this cutoff would be an approximation.

The **solid ellipsoid** drawn on lecture **page 8, Figure 4** illustrates precisely this probability statement. The ellipsoid is centered at $\boldsymbol\mu$ and stretched according to the covariance matrix's eigenvectors and eigenvalues. The page-8 plot is a two-dimensional illustration, although the general formula works in $p$ dimensions.

### A very common comparison error

The lecturer's 68.3% and 95.4% intervals on page 1 are **one-variable normal intervals**. A 95% *joint* ellipse for two variables is **not** obtained by simply requiring each of two independent normal coordinates to be within $\pm1.96$ standard deviations: that rectangular event has joint probability $0.95^2=0.9025$, not 0.95. Joint probability must account for simultaneous behaviour.

---

# Part V. What happens when we average many multivariate observations?

**Source link:** Lecture **page 8**, Sections **4–5**.

## 23. One customer versus an average of customers

A distinction that students frequently miss is between the distribution of **one individual vector** and the distribution of the **mean of $n$ independent vectors**.

For example, each customer's income and spending is a vector:

$$\mathbf X_i=\begin{bmatrix}\text{income of customer }i\\\text{spending of customer }i\end{bmatrix}.$$

Collecting $n$ customers gives $\mathbf X_1,\ldots,\mathbf X_n$. The **sample mean vector** is

$$\boxed{\bar{\mathbf X}=\frac1n\sum_{i=1}^{n}\mathbf X_i.}$$

Its first entry averages all observed incomes; its second averages all observed spending amounts. It is itself a **random vector** because a different randomly selected group of customers would produce a different average.

The distribution of a statistic such as $\bar{\mathbf X}$ across **repeated samples** is called its **sampling distribution**. That is not the same thing as the distribution of individual customers in the original population.

## 24. Exact sampling distribution when the population is normal

Suppose $\mathbf X_1,\dots,\mathbf X_n$ are an **independent random sample** from

$$\mathbf X_i\sim N_p(\boldsymbol\mu,\Sigma).$$

Then

$$\boxed{\bar{\mathbf X}\sim N_p\left(\boldsymbol\mu,\frac1n\Sigma\right).}$$

This is the exact result in **Section 4 on page 8**. It is true for every positive integer $n$ under the stated normal sampling assumptions, not only for a large $n$.

### Why does the center stay the same?

By linearity of expectation,

$$E(\bar{\mathbf X})
=E\left(\frac1n\sum_{i=1}^n\mathbf X_i\right)
=\frac1n\sum_{i=1}^nE(\mathbf X_i)
=\frac1n(n\boldsymbol\mu)=\boldsymbol\mu.$$

Averaging does not systematically shift the center.

### Why does covariance shrink by $n$?

For independent observations, the covariance matrix of a sum equals the sum of their covariance matrices:

$$\begin{aligned}
\operatorname{Cov}(\bar{\mathbf X})
&=\operatorname{Cov}\left(\frac1n\sum_{i=1}^n\mathbf X_i\right)\\
&=\frac1{n^2}\sum_{i=1}^n\operatorname{Cov}(\mathbf X_i)\\
&=\frac1{n^2}(n\Sigma)=\frac\Sigma n.
\end{aligned}$$

That calculation is the multivariate version of the familiar univariate fact

$$\operatorname{Var}(\bar X)=\frac{\sigma^2}{n},\qquad
\operatorname{SD}(\bar X)=\frac\sigma{\sqrt n}.$$

**Why independence matters:** If repeated observations are correlated with each other, covariance terms between *different sample observations* do not vanish. Then $\Sigma/n$ need not be the right sampling covariance.

### Worked two-variable example

Suppose a customer's paired variables have population mean

$$\boldsymbol\mu=\begin{bmatrix}100\\40\end{bmatrix}$$

and population covariance

$$\Sigma=\begin{bmatrix}100&20\\20&25\end{bmatrix}.$$

The first variable has standard deviation $\sqrt{100}=10$, the second $\sqrt{25}=5$, and their correlation is $20/(10\times5)=0.4$.

For a sample of $n=25$ independent customers, the mean vector has covariance

$$\frac\Sigma{25}
=\boxed{\begin{bmatrix}4&0.8\\0.8&1\end{bmatrix}}.$$

Therefore

$$\boxed{\bar{\mathbf X}\sim N_2\left(
\begin{bmatrix}100\\40\end{bmatrix},
\begin{bmatrix}4&0.8\\0.8&1\end{bmatrix}\right).}$$

The standard deviations of the **sample means** are now 2 and 1. Averages vary less from sample to sample than individual people do.

Notice the sample-mean **correlation** remains $0.8/(2\times1)=0.4$: dividing *all entries* of the covariance matrix by $n$ shrinks variances and covariances in tandem.

## 25. The multivariate central limit theorem: why normality still helps when the population is not normal

**Source link:** Lecture **page 8**, Section **5**, “Large-sample behavior of $\bar{\mathbf X}$.”

Suppose individual observations are **not** multivariate normal. Perhaps customer spending is strongly right-skewed, with a few exceptionally large purchases. Does that mean sample averages are unusable? Not necessarily.

The **multivariate central limit theorem (CLT)** states that under suitable conditions, particularly **independent identically distributed observations** with a finite covariance matrix,

$$\boxed{\sqrt{n}\,(\bar{\mathbf X}-\boldsymbol\mu)
\ \xrightarrow{\ d\ }\ N_p(\mathbf0,\Sigma).}$$

The arrow $\xrightarrow{d}$ means **convergence in distribution** as sample size grows. It does not claim the variables become equal to a normal vector. It says the probability distribution of the properly scaled sample mean approaches the stated normal distribution.

An equivalent practical large-sample approximation is

$$\boxed{\bar{\mathbf X}\ \dot\sim\ N_p\left(\boldsymbol\mu,\frac\Sigma n\right),\qquad\text{for sufficiently large }n.}$$

The notation $\dot\sim$ means **approximately distributed as**. This is the meaning of the normal expression on page 8; it is **approximate**, unlike the exact result of Section 4 when the population itself is normal.

### Think of drawing many samples, not of making raw data normal

Imagine repeating this procedure a thousand times:

1. Randomly sample $n$ customers from the same population.
2. Average their two measurements.
3. Record the *pair of averages*.

The distribution of these repeated pairs of means often becomes approximately an elliptical multivariate normal cloud as $n$ increases, even when the individual-customer cloud has a very different shape.

**Crucial:** The CLT does **not** say a large sample forces the **individual observations** themselves to become normal. The normal approximation concerns the **sampling distribution of the mean** and related suitable statistics.

### How large is “large”?

The lecturer adds: “Here, $n$ should also be large relative to $p$.” With many variables and very few observations, covariance estimation can become unstable or singular, even if the theory is sound.

There is **no universal sample size** such as “30 is always enough.” Adequacy depends on such things as:

- how strongly skewed or heavy-tailed the underlying data are;
- whether observations are independent and similarly distributed;
- whether the population variances are finite;
- how many variables $p$ we analyse;
- how accurate we need the approximation to be.

In the lecture the covariance matrix is described as **finite and nonsingular**. Nonsingularity is helpful for the full-dimensional normal model and invertible covariance calculations. Some forms of the multivariate CLT permit singular covariance as well, but that extension is outside the lecture's stated version.

### When the CLT cannot solve the problem

The ordinary result does not rescue every situation. Serious dependence between observations, infinite-variance heavy-tailed models, or very small samples from highly skewed data can defeat the usual approximation. A large value of $n$ also does not automatically justify a method that makes additional assumptions beyond normality.

### Exact versus approximate: memorize the distinction

| Population generating each $\mathbf X_i$ | Distribution of $\bar{\mathbf X}$ | Reason |
|---|---|---|
| Jointly multivariate normal, random iid sampling | **Exactly** $N_p(\boldsymbol\mu,\Sigma/n)$ | Linear combinations of normal vectors remain normal |
| Not necessarily normal, appropriate finite-moment iid assumptions, sufficiently large $n$ | **Approximately** $N_p(\boldsymbol\mu,\Sigma/n)$ | Multivariate CLT |
| Small, strongly nonnormal, dependent, or otherwise unsuitable data | **Cannot be asserted from these formulas alone** | Assumptions/approximation may fail |

---
# Part VI. How to assess the normality assumption responsibly

**Source link:** Lecture **page 9**, Section **6** and subsections **6.1–6.2**, and **page 10**, subsection **6.3**.

## 26. What does an “assumption of normality” actually ask?

Suppose a statistical method assumes that the observations come from a jointly normal population. That assumption is a claim about the **data-generating distribution**, not merely a request for a nice-looking picture.

The lecturer opens Section 6 by saying that the quality of inferences from multivariate methods depends on how closely the actual population resembles the multivariate normal form.

### Why it matters

Many classical procedures use normal-distribution mathematics to derive reference distributions, significance tests, or intervals. If actual data depart substantially from the required assumptions, the reported p-values or coverage statements may be inaccurate. The effect depends on the procedure: some analyses are fairly robust to modest nonnormality; others are more sensitive, especially with small samples or influential outliers.

There are at least **three distinct questions**:

1. **Univariate normality:** Does *each individual variable* look normally distributed?
2. **Multivariate normality:** Does the **entire vector together** have a joint normal distribution?
3. **Sampling normality:** Is the **sample mean** approximately normally distributed, perhaps by the CLT, even if individual observations are not?

These questions are related but **not interchangeable**.

## 27. Why checking every variable separately is not enough

Lecture **Section 6.1** suggests checking the **marginal distributions** of $X_1,\ldots,X_p$. A **marginal distribution** is simply the distribution of one component considered without the others.

If a vector is genuinely multivariate normal, each individual component must be univariate normal. So a clearly nonnormal component provides evidence **against** multivariate normality.

But the reverse implication is false:

$$\text{all marginals normal}\quad\not\Longrightarrow\quad\text{joint distribution normal}.$$

Here is a teaching example that makes the failure vivid.

Let $Z\sim N(0,1)$ and let $B$ be independent of $Z$ with $P(B=1)=P(B=-1)=1/2$. Define

$$X=Z,\qquad Y=BZ.$$

Both $X$ and $Y$ separately follow $N(0,1)$, because multiplying a standard normal by an independent random sign leaves its distribution unchanged. Also,

$$\operatorname{Cov}(X,Y)=E(BZ^2)=E(B)E(Z^2)=0.$$

Yet the pair $(X,Y)$ always lies on **one of the two diagonal lines** $Y=X$ or $Y=-X$. It is not bivariate normal, nor are $X$ and $Y$ independent. For instance, $X^2=Y^2$ always.

Even more decisively, the linear combination $X+Y$ equals 0 whenever $B=-1$, which has probability $1/2$. Thus the combination has a point mass at zero and cannot have a nondegenerate normal distribution. This contradicts the linear-combination characterization in Result 1.

**Lesson:** Separate histograms and Shapiro tests are useful but do not establish joint normality. We also need to inspect the **relationship among variables**.

## 28. Histograms: the first, easiest visual check

**Source link:** Page **9**, first method in subsection 6.1.

A **histogram** divides the number line into intervals (bins) and shows how many sample observations fall in each. With a reasonably sized sample, a normal variable tends to produce a symmetrical central mound with gradually thinning tails.

Questions to ask:

- Is the distribution markedly **skewed** (one tail longer than the other)?
- Are there distinct **clusters** or two peaks?
- Are there unusually long or heavy tails?
- Are there a few extreme points stretching the horizontal axis?
- Is the sample too small for the picture to be decisive?

A histogram's appearance depends on how many bins are chosen. A small sample from a perfectly normal population can look jagged; a nonnormal sample can sometimes look bell-shaped. **Visual compatibility is evidence, not proof.**

## 29. The univariate normal Q–Q plot, from first principles

**Source link:** Lecture **page 9**, subsection **6.1**.

**Q–Q** means **quantile–quantile**. A *quantile* is a value that leaves a specified proportion of a distribution below it. For example, the 50th percentile is the median.

Imagine sorting five observed values from smallest to largest:

$$x_{(1)}\le x_{(2)}\le\cdots\le x_{(5)}.$$

The subscript $(j)$ indicates **order after sorting**, not the original observation number. A normal Q–Q plot compares these observed ordered values with theoretical normal quantiles at matching cumulative proportions.

A simple pedagogical choice for five plotting proportions is

$$u_j=\frac{j-0.5}{5},\qquad j=1,\ldots,5,$$

which produces $0.1,0.3,0.5,0.7,0.9$. The standard normal theoretical quantiles are

$$q_j=\Phi^{-1}(u_j),$$

where $\Phi$ is the standard normal cumulative distribution function, and $\Phi^{-1}$ turns a probability into its associated normal quantile. For these proportions, the approximate theoretical values are

| Ordered position | Proportion $u_j$ | Theoretical $q_j$ |
|---:|---:|---:|
| 1 | 0.10 | $-1.282$ |
| 2 | 0.30 | $-0.524$ |
| 3 | 0.50 | $0$ |
| 4 | 0.70 | $0.524$ |
| 5 | 0.90 | $1.282$ |

A Q–Q plot places $q_j$ on the horizontal axis and the observed $x_{(j)}$ on the vertical axis. If the observations are approximately normal, the points tend to lie **near a straight line**. If raw observations rather than standardized observations are plotted, the line need **not** have slope 1 or intercept 0: its approximate intercept and slope reflect the sample's location and scale.

### How to interpret deviations from the line

| Visible Q–Q pattern | Possible interpretation | Caution |
|---|---|---|
| Points near a straight line | Compatible with normal quantiles | Does not prove exact normality |
| Systematic curved/S-shaped pattern | Possible skewness or tail mismatch | Assess direction with the actual graph |
| Ends deviate strongly from line | Tail behaviour may differ from normal | Outliers can produce this pattern |
| One isolated distant point | Potential unusually extreme observation | Check data quality and context |
| Jagged short sequence | Possibly a small-sample effect | Avoid overinterpreting a few points |

**The lecturer's wording:** if plotted pairs lie very nearly on a straight line, we would not reject the idea that the variable is normal. This is informal graphical judgment, not a formal acceptance of $H_0$.

**R function:** `qqnorm(x)` produces a normal Q–Q plot; `qqline(x)` adds a comparison line. R can choose plotting positions slightly differently from the simple $u_j$ rule above. That does not change the purpose of the graph.

## 30. Hypothesis testing, explained with no prior knowledge

Lecture page 9 mentions **Kolmogorov–Smirnov**, **Shapiro–Wilk**, and **Mardia's** tests. To understand any of them, we first need the logic of a statistical test.

A **hypothesis** is a specific claim about the population. A **null hypothesis**, written $H_0$, is the reference statement we evaluate. The **alternative hypothesis**, written $H_A$, is the competing statement.

A **test statistic** summarizes how strongly the observed data depart from what the null predicts. Its **reference distribution** allows us to calculate a **p-value**.

The p-value is:

> Assuming the null hypothesis and the test's other assumptions are true, the probability of obtaining a test statistic **at least as incompatible with the null** as the one observed.

A p-value is **not** the probability that $H_0$ is true. It is not the probability that the data themselves are “normal.”

### Significance level and decision

Choose a significance level $\alpha$, often $0.05$, **before interpreting results**.

| Outcome | Conventional decision | Responsible wording |
|---|---|---|
| $p<\alpha$ | **Reject $H_0$** | Evidence against the specified normality model |
| $p\ge\alpha$ | **Fail to reject $H_0$** | Insufficient evidence to reject normality; **not proof** of normality |

A **Type I error** happens when a true null hypothesis is rejected. The significance level controls that error probability under the test's assumptions. A **Type II error** happens when a false null is not rejected. **Power** is the probability of correctly rejecting a false null. Low sample sizes often imply low power, making a failure to reject uninformative.

### One purely illustrative interpretation

If a *hypothetical* normality test returns $p=0.02$ at $\alpha=0.05$, we reject its null. If it returns $p=0.28$, we fail to reject. **These values are invented teaching examples, not results from the lecturer's dataset or PDF.**

## 31. Shapiro–Wilk test

**Source link:** Lecture page **9**, subsection 6.1.  
**Test-statistic details below:** Teaching expansion; the PDF lists the test but does not derive it.

For a single continuous variable, the Shapiro–Wilk test evaluates whether its observed sample is consistent with a normal distribution:

$$H_0: X\text{ is normally distributed},$$

$$H_A: X\text{ is not normally distributed}.$$

Its $W$ statistic measures how closely the ordered sample values align with normal-theory expectations relative to their total variation. One common representation is

$$W=\frac{\left(\sum_{j=1}^{n}a_jx_{(j)}\right)^2}
{\sum_{j=1}^{n}(x_j-\bar x)^2},$$

where the weights $a_j$ are calculated from expected normal order statistics and their covariance structure. You generally **do not** need to calculate the $a_j$ by hand: software calculates them.

A $W$ closer to 1 often indicates better agreement with normality, but **the p-value**, with the software's reference calibration, is what the formal test decision uses. Do not adopt an arbitrary cutoff such as “$W>0.95$ means normal” for every sample size.

In base R:

```r
shapiro.test(x)
```

Typical returned fields include `statistic` (the $W$ value), `p.value`, `method`, and `data.name`. The procedure checks **one vector at a time**, not multivariate normality of the full data matrix. Base R's implementation requires between **3 and 5,000 nonmissing observations**. In a very large sample even minor departures from mathematical normality may be statistically detectable.

## 32. Kolmogorov–Smirnov test and the estimated-parameter trap

**Source link:** Lecture page **9**, subsection 6.1.  
**Further warning:** Teaching expansion needed to use R correctly.

The one-sample Kolmogorov–Smirnov test compares an empirical cumulative distribution function $F_n(x)$ with a **fully specified** reference cumulative distribution $F_0(x)$:

$$D_n=\sup_x|F_n(x)-F_0(x)|.$$

- $F_n(x)$ is the fraction of sample observations at or below $x$.
- $F_0(x)$ is the cumulative probability predicted by the reference model.
- $\sup_x$ means the **largest** vertical difference across all $x$.

A large difference gives evidence against the specified distribution. For an ordinary simple-null test the hypotheses are

$$H_0:F=F_0\qquad\text{versus}\qquad H_A:F\ne F_0.$$

**Important practical limitation:** Calling R's standard `ks.test()` with `mean(x)` and `sd(x)` estimated from **the same data** does not automatically give the usual valid Kolmogorov–Smirnov p-value for the composite null “some normal distribution.” The estimated-parameter case needs a different calibration, such as a properly implemented **Lilliefors-type** procedure or an appropriate simulation/bootstrap approach. Also, ordinary continuous-distribution KS calibration needs care with ties/discrete measurements.

So for beginner use, the univariate **Shapiro–Wilk test** plus a histogram and Q–Q plot are often easier to interpret correctly. The KS test remains valuable when the reference distribution, including its parameters, was specified independently beforehand.

## 33. Multivariate normality: moving beyond marginal checks

**Source link:** Lecture **page 9**, subsection **6.2**.

Univariate tests inspect one column at a time. Multivariate checks consider the entire vector, its joint relationships, and distances after covariance adjustment. The lecture gives two related approaches:

1. Assess sample **squared Mahalanobis distances** with a chi-square or $d^2$ plot.
2. Use a formal multivariate normality test, particularly **Mardia's test**.

Neither method is a magical guarantee of normality. They investigate whether observations are **compatible** with the multivariate normal model and where obvious departures may exist.

## 34. The chi-square or squared-distance ($d^2$) Q–Q plot

The theoretical Result 5 (page 7) is

$$D^2=(\mathbf X-\boldsymbol\mu)'\Sigma^{-1}(\mathbf X-\boldsymbol\mu)\sim\chi_p^2$$

when the multivariate normal model and **known population parameters** hold.

For an actual sample we usually estimate $\boldsymbol\mu$ by $\bar{\mathbf x}$ and $\Sigma$ by $S$. For each observation $\mathbf x_j$, define

$$\boxed{d_j^2=(\mathbf x_j-\bar{\mathbf x})'S^{-1}(\mathbf x_j-\bar{\mathbf x}),\quad j=1,\ldots,n.}$$

If the multivariate normal model is a good description and the sample is sufficiently large relative to $p$, these squared sample distances can be **approximately compared** with chi-square quantiles with $p$ degrees of freedom.

### Constructing the $d^2$ plot

1. Compute $\bar{\mathbf x}$ and $S$.
2. Compute all $n$ squared distances $d_1^2,\ldots,d_n^2$.
3. Sort them as $d_{(1)}^2\le\cdots\le d_{(n)}^2$.
4. Obtain corresponding reference values $q_j=\chi_{p,\,u_j}^2$, where $u_j$ is a plotting proportion such as $(j-0.5)/n$.
5. Plot $q_j$ horizontally against $d_{(j)}^2$ vertically.
6. Inspect whether the pattern is reasonably close to the reference line $y=x$, allowing for sampling variation and for the approximation caused by estimating mean and covariance.

A strong, systematic upward departure in the largest observations may reflect unusually heavy tails or outliers. A systematic curve can indicate mismatch with the reference distribution. But **a few points do not by themselves prove nonnormality**, and perfect-looking distance plots do not prove that all aspects of joint normality hold.

### The mathematical caveat the short lecture compresses

With estimated $\bar{\mathbf x}$ and $S$ from the same data, the distances are **dependent and constrained by the fitting process**. In particular, their finite-sample distribution differs from an independent chi-square sample. The lecture correctly qualifies the chi-square relationship as **approximate for large samples**. This distinction matters especially for very small $n$, large $p$, or strong outliers.

## 35. Mardia's multivariate normality test

**Source link:** Lecture **page 9**, final bullets of subsection 6.2.

The lecturer gives the following hypotheses:

$$\boxed{H_0:\text{The variables follow a multivariate normal distribution.}}$$

$$\boxed{H_A:\text{The variables do not follow a multivariate normal distribution.}}$$

It names **Mardia's test** but does **not** supply Mardia's formulas or actual test results. The explanation below is supplementary.

### Two different ways that joint data can depart from normality

**Multivariate skewness** concerns asymmetry of the joint cloud: perhaps the data stretch much farther in one combination of directions than the opposite combination.

**Multivariate kurtosis** concerns the joint cloud's tail and concentration pattern: how many extremely distant observations are observed relative to the normal prediction, along with concentration near the center.

Mardia's approach uses statistics measuring these two features. Some software reports **two separate tests**, one for multivariate skewness and one for multivariate kurtosis. They have the same broad joint-normality null, but can detect different departures. A nonsignificant one does **not** cancel a significant result from the other.

### Optional mathematical view: Mardia's statistics

Let $\mathbf x_1,\ldots,\mathbf x_n$ be observations, let $\bar{\mathbf x}$ be their sample mean, and let $S_n$ be the sample covariance computed using denominator **$n$** (the maximum-likelihood convention):

$$S_n=\frac1n\sum_{i=1}^n(\mathbf x_i-\bar{\mathbf x})(\mathbf x_i-\bar{\mathbf x})'.$$

Define the covariance-adjusted product between observations $i$ and $j$:

$$g_{ij}=(\mathbf x_i-\bar{\mathbf x})'S_n^{-1}(\mathbf x_j-\bar{\mathbf x}).$$

The **sample multivariate skewness** is

$$\boxed{b_{1,p}=\frac1{n^2}\sum_{i=1}^n\sum_{j=1}^n g_{ij}^3.}$$

The **sample multivariate kurtosis** is

$$\boxed{b_{2,p}=\frac1n\sum_{i=1}^n (d_{i,n}^2)^2,\qquad
 d_{i,n}^2=g_{ii}.}$$

Be especially careful with notation: $d_{i,n}^2$ already denotes a **squared distance**. Squaring that number again in the kurtosis formula produces the fourth power of Mahalanobis distance.

For a population multivariate normal distribution, the theoretical multivariate kurtosis is

$$\beta_{2,p}=p(p+2).$$

In a common large-sample reference approximation, the skewness statistic uses

$$\frac{nb_{1,p}}6\ \dot\sim\ \chi_{\nu}^2,\qquad
\nu=\frac{p(p+1)(p+2)}6,$$

and a standardized kurtosis statistic uses

$$Z_K=\frac{b_{2,p}-p(p+2)}{\sqrt{8p(p+2)/n}}\ \dot\sim\ N(0,1).$$

These are **asymptotic** formulas. Real software may use finite-sample corrections, alternate covariance divisors, or other calibrations, so its displayed statistics and p-values can differ from a bare formula. In a small sample one should not treat asymptotic results as exact.

### Interpret two Mardia p-values responsibly

Suppose, **only as a hypothetical example**, the skewness test gives $p=0.012$ and kurtosis gives $p=0.41$. At $\alpha=0.05$, there is evidence **against** joint normality based on skewness. The nonsignificant kurtosis result does **not** establish that the multivariate normal assumption holds.

If both p-values exceed 0.05, that means these tests did not find sufficient evidence against normality at this sample size. Follow up with Q–Q plots, distance plots, outlier checks, and the assumptions of the actual method you want to use.

### Multiple univariate tests do not equal one multivariate test

If you run five Shapiro tests, you make **five separate decisions**. Even under normality, false rejections can occur simply from repetition. More importantly, even five non-significant Shapiro results cannot substitute for a joint-normality check. This is particularly important when dealing with correlated business variables.

## 36. Transformations to near normality

**Source link:** Lecture **page 10**, subsection **6.3**.

When observations are markedly nonnormal, the lecturer proposes **power transformations**, including

$$\log(x)\qquad\text{and}\qquad x^k\quad(k\ne0).$$

The goal of a transformation is often to reduce extreme skewness, stabilize spread, or make a model more appropriate. A transformation changes how measurements are represented; it does **not** change the actual people or transactions.

### Log transformation: an intuitive example

Suppose monthly sales are $10,100,1000$. Differences on the raw scale are $90$ and $900$, while ratios are both $10$. A log transformation turns multiplicative ratios into additive differences:

$$\log(100)-\log(10)=\log(10),$$

$$\log(1000)-\log(100)=\log(10).$$

A highly right-skewed variable may become more symmetrical after taking its log.

**Critical domain rule:** $\log(x)$ is real-valued for **$x>0$**. A value of zero or a negative number cannot be inserted directly into the ordinary real log function. Adding a constant sometimes helps but changes interpretation and requires a justified choice; do not add an arbitrary constant without explanation.

### Power transformations

Depending on $k$ and the data's domain, examples include

| Transformation | Example with $x=16$ | What it may do |
|---|---:|---|
| $\sqrt{x}=x^{1/2}$ | $4$ | Compress large positive values |
| $x^{1/3}$ | $\approx2.520$ | Compress large values; real cube root exists for negatives too |
| $x^2$ | $256$ | Amplify large magnitudes; may increase skewness |
| $1/x=x^{-1}$ | $0.0625$ | Strongly changes scale; undefined at zero |
| $\log(x)$ | $\approx2.773$ | Compress multiplicative positive scales |

Powers are **not universally valid on all negative values**: domain and real-valuedness depend on the exponent. Transformations should be chosen for the scientific problem, not automatically applied until a test becomes non-significant.

### Four cautions that protect interpretation

1. Making *individual marginals* more normal does not guarantee **multivariate** normality.
2. A transformed variable is on a **new scale**. A mean of $\log(X)$ is not the same as $\log(E(X))$.
3. Transformations may not correct outliers, mixed populations, dependence, or a wrong statistical model.
4. Repeatedly trying transformations based only on whichever gives the biggest p-value can mislead inference. Examine plots, context, and the assumptions of your downstream analysis.

If a reasonable transformation does not solve the problem, consider a procedure that does not require the same normality assumptions, a robust analysis, or an appropriate simulation/resampling method. Choosing among them requires knowing the actual analysis goal and data structure. These broader alternatives are **teaching guidance**, not methods enumerated on page 10.

---

# Part VII. Detecting and interpreting multivariate outliers

**Source link:** Lecture **page 10**, Section **7** and subsection **7.1**.

## 37. What is an outlier, and why should we care?

An **outlier** is an observation that appears unusual relative to the main pattern of the data. Outliers can affect estimated means, covariances, correlations, model coefficients, and normality tests.

The lecture emphasizes an important ethical and statistical point: **not all outliers are wrong numbers**. A very large sale may be a genuine high-value customer. An unusual set of vital measurements may be medically important. An uncommon business combination can reveal a new segment worth investigating.

An unusual value might represent:

- A data-entry mistake or a unit mismatch.
- A measurement or collection problem.
- A genuine rare observation from the same population.
- A previously unnoticed subpopulation or a different process.
- An observation that contradicts an oversimplified model.

**Never delete an observation merely because it looks inconvenient.** Verify its origin, evaluate its effect, and document any defensible cleaning decision.

## 38. Univariate and multivariate outliers are different

A **univariate outlier** is extreme in one variable. For example, a monthly income of $100{,}000$ might be unusually high in a particular dataset.

A **multivariate outlier** is unusual as a **combination** even when each individual coordinate looks plausible.

Imagine that height and weight are strongly positively correlated. A person might have an ordinary height and an ordinary weight when each is inspected separately, but a highly unusual **height–weight pairing** relative to the population pattern. Mahalanobis distance can flag this combination by accounting for correlation.

Therefore, the lecture recommends both **variable-by-variable** and **pair-by-pair** checks, followed by generalized distances.

## 39. Step 1: make a dot plot for each variable

A dot plot displays the observed values along a scale, using dots for measurements. It helps reveal isolated values, clusters, gaps, ties, and the overall spread.

On page 10, this is the lecturer's **first step** in subsection 7.1. It is especially helpful for small and moderate samples where individual measurements are still visible.

A dot far away from the rest is a **candidate** outlier. Follow-up checking is necessary; the dot plot cannot tell you whether a value was entered incorrectly or whether it legitimately belongs to the population.

## 40. Step 2: make a scatter plot for each pair of variables

A scatter plot uses one variable on the horizontal axis and another on the vertical axis. Each observation appears as a point $(x_{j1},x_{j2})$.

Look for:

- an ordinary elliptical cloud;
- an unexpected curve rather than a roughly linear association;
- separated clusters;
- isolated points;
- points that depart strongly **from the main joint direction**, not merely the marginal ranges.

For $p$ variables there are $p(p-1)/2$ distinct pairs, so a **scatterplot matrix** becomes useful. Be aware that pairwise plots may still miss outliers that are unusual only when **three or more** variables are considered together.

## 41. Step 3: calculate standardized values (sample z-scores)

The lecturer writes the standardized value for observation $j$ and variable $k$ as

$$\boxed{z_{jk}=\frac{x_{jk}-\bar x_k}{\sqrt{s_{kk}}},
\quad j=1,\ldots,n,\ k=1,\ldots,p.}$$

Decode the symbols:

| Symbol | Meaning |
|---|---|
| $j$ | Which observation or **row** |
| $k$ | Which variable or **column** |
| $x_{jk}$ | Observed value for row $j$, column $k$ |
| $\bar x_k$ | Sample mean of variable $k$ |
| $s_{kk}$ | Sample variance of variable $k$ (diagonal entry of $S$) |
| $\sqrt{s_{kk}}$ | Sample standard deviation of variable $k$ |
| $z_{jk}$ | How far the observation lies from its variable's mean, in sample-standard-deviation units |

### Numerical example

Suppose the sample mean spending is 200 and sample standard deviation is 40. A customer whose spending is 340 has

$$z=\frac{340-200}{40}=\frac{140}{40}=\boxed{3.5}.$$

That customer lies 3.5 sample standard deviations above the sample mean. This is worth checking, but it is not automatic evidence of an error.

### Why the lecture discusses 500 z-scores

**Source link:** Page 10 gives $n=100$, $p=5$, hence $n\times p=500$ standardized values.

Even if the data are normal, looking at **500 values** creates many opportunities to see extreme individual numbers. The lecture says we might expect approximately **one or two** values greater than 3 or smaller than $-3$. Here is the calculation behind that intuition.

For an ideal standard normal variable,

$$P(|Z|>3)=2P(Z>3)\approx0.0026998.$$

Across 500 such comparisons, the expected **count** is approximately

$$500(0.0026998)=\boxed{1.35}.$$

So seeing a standardized value just beyond $\pm3$ is not extraordinary when hundreds of entries are inspected. The observed count might be 0, 1, 2, or more. The calculation gives an **expected number**, not a guaranteed count. Estimated sample standardization and dependence between variables also make the calculation approximate.

The lecturer suggests that $|z|\approx3.5$ can be treated as “large” for moderate samples, as a **guideline** rather than a universal law. Under the ideal $N(0,1)$ calculation,

$$P(|Z|>3.5)\approx0.0004653,$$

so 500 such comparisons have expected count about $500(0.0004653)=0.233$. A single extreme value can still be genuine, especially with substantial multiple testing or heavy-tailed data.

**Important correction to a common misreading:** $|z|>3.5$ is *not* a universally proven threshold for “bad data.” The appropriate degree of surprise depends on sample size, number of variables, distribution shape, and consequences of mistakes.

## 42. Step 4: calculate squared Mahalanobis distances

The lecture's final step uses

$$\boxed{d_j^2=(\mathbf x_j-\bar{\mathbf x})'S^{-1}(\mathbf x_j-\bar{\mathbf x}).}$$

For each observation, the calculation asks: **How far is this whole vector from the multivariate sample center, after adjusting for the spread and correlation among its variables?**

### Why large $d_j^2$ values stand out

Under the joint normal model with known population parameters, $D^2$ follows $\chi_p^2$. Thus a large squared distance in the extreme upper tail is unusual under that reference model. With estimated center and covariance, we often use chi-square cutoffs as **large-sample screening approximations**, which is the lecture's practical approach.

For example, at the upper 5% cutoff in two dimensions,

$$\chi^2_{2,0.95}\approx5.991.$$

An observation with $d_j^2=8$ exceeds that reference cutoff and deserves closer examination; one with $d_j^2=2$ does not exceed it. These numbers are **illustrative**, not from a dataset in the source.

### Why “five observations” appear in the lecture

Page 10 says that with $n=100$, **about five observations** would be expected to exceed a reference cutoff set at the upper 5% tail:

$$100\times0.05=\boxed{5}.$$

That is the intuition for the threshold. It does **not** mean we must delete five observations, that exactly five must be flagged, or that five flagged points automatically violate multivariate normality.

The expected-count interpretation is exact only for an idealized independent sequence of distance statistics with the specified 5% marginal tail probability. Real in-sample Mahalanobis distances are correlated and use estimated parameters, so the statement is a useful **screening guideline** rather than a strict finite-sample guarantee.

## 43. An end-to-end strategy when an outlier is flagged

**Teaching expansion** building on the lecture's warning not to discard genuine observations.

**First:** Check the original record. Was the value entered in the correct units? Was a decimal point misplaced? Did a customer record appear twice?

**Second:** Compare with the underlying business process. Is the point a real high-spending customer, a promotion day, a different region, or an extraordinary but possible event?

**Third:** Look at the joint pattern. Does the observation violate the usual correlation structure? Are there unmodelled clusters?

**Fourth:** Assess sensitivity. Compare results **with and without** the candidate point if the scientific question warrants it, but report the reason for any exclusion and preserve the original data.

**Fifth:** Revisit the model. A skewed variable, separate subpopulations, or nonlinearity may be a better explanation than a single “bad observation.”

### Why very unusual points can hide one another

The sample mean and covariance matrix are themselves affected by extreme observations. Several outliers can inflate covariance estimates and thereby make their own Mahalanobis distances look less remarkable. This is sometimes called **masking**. Conversely, one unusual observation can make otherwise reasonable points appear exceptional, sometimes called **swamping**. These are supplementary diagnostic cautions, not terms introduced in the lecture.

When necessary, analysts may examine robust centers/covariances or model-based approaches, but no robust method is universally appropriate. Investigate the substantive context before choosing an intervention.

---
# Part VIII. A hands-on R laboratory, starting from zero

**Status:** All code in this part is an **original teaching expansion**. The original 10-page PDF names procedures and diagrams but contains **no R code, R screenshots, software output, or experimental test results**. The code below creates **synthetic example data** to practise the source's ideas without implying any particular result for a real student dataset.

## 44. How to read and run R code

R is a statistical programming language. You can enter one command at a time in the R Console or put several commands into an R script and run them together.

A tiny vocabulary:

| R expression | What it does |
|---|---|
| `x <- 5` | Stores the number 5 under the name `x` |
| `c(2, 3, 4)` | Creates a vector of three numbers |
| `mean(x)` | Calculates a sample mean |
| `var(x)` and `sd(x)` | Calculates sample variance and sample standard deviation |
| `matrix(..., nrow = 2)` | Arranges values into a matrix |
| `%*%` | Performs **matrix multiplication** |
| `t(A)` | Transposes matrix `A` |
| `solve(A)` | Computes matrix inverse when it exists |
| `det(A)` | Computes matrix determinant |
| `colMeans(X)` | Computes mean of each data column |
| `cov(X)` and `cor(X)` | Computes sample covariance and correlation matrices |
| `set.seed(2451)` | Makes the computer's random-number sequence reproducible |
| `# comment` | Explains code to humans; R ignores it |

Remember: `*` is **elementwise multiplication**, while `%*%` is **matrix multiplication**. Confusing these can silently produce a fundamentally different calculation.

## 45. Lab A: explore one normal distribution

```r
# A normal population with mean 60 and standard deviation 10
mu <- 60
sigma <- 10

# Density heights, not probabilities at exact points
dnorm(60, mean = mu, sd = sigma)
dnorm(70, mean = mu, sd = sigma)

# Probabilities using the cumulative distribution function
pnorm(70, mean = mu, sd = sigma) -
  pnorm(50, mean = mu, sd = sigma)

pnorm(80, mean = mu, sd = sigma) -
  pnorm(40, mean = mu, sd = sigma)

# The score separating the lower 97.5% from the upper 2.5%
qnorm(0.975, mean = mu, sd = sigma)

# One reproducible random sample of 200 observations
set.seed(2451)
x <- rnorm(200, mean = mu, sd = sigma)
hist(x, breaks = 15, main = "Simulated normal values", xlab = "Value")
qqnorm(x)
qqline(x)
```

**Interpretation:** `dnorm` evaluates the **height** of a density. `pnorm` provides the **cumulative probability to the left of a value**, so subtracting two `pnorm` results gives an interval probability. `qnorm` performs the inverse task: it finds the value associated with a specified cumulative probability. `rnorm` generates a random sample.

The two interval-probability calculations should recover approximately **0.6827** and **0.9545**, as stated more coarsely on lecture page 1. The random histogram varies from sample to sample: simulated samples are **not guaranteed** to reproduce the theoretical curve exactly.

## 46. Lab B: practise the lecturer's matrix results exactly

First enter the lecture **Example 1/2** parameters:

```r
mu <- c(2, 1, 2)
Sigma <- matrix(c(2, 1, 1,
                  1, 3, 0,
                  1, 0, 1),
                nrow = 3, byrow = TRUE)

# Result 1: distribution of X1 - X2
a <- c(1, -1, 0)
mean_L <- as.numeric(t(a) %*% mu)
var_L  <- as.numeric(t(a) %*% Sigma %*% a)

mean_L  # 1
var_L   # 3

# Result 2: distribution of (X1 + X2 + X3, X1 - X2)
A <- rbind(c(1, 1, 1),
           c(1, -1, 0))
mean_Y <- as.vector(A %*% mu)
cov_Y  <- A %*% Sigma %*% t(A)

mean_Y  # 5 1
cov_Y   # rows: (10, 0) and (0, 3)

stopifnot(identical(as.numeric(mean_Y), c(5, 1)))
stopifnot(isTRUE(all.equal(unname(cov_Y),
  matrix(c(10, 0, 0, 3), 2, 2))))
```

Here `rbind()` stacks the two coefficient vectors **as rows**, `as.vector()` simplifies a one-column output, and `all.equal()` checks a numerical result allowing for ordinary floating-point precision.

Now practise **Example 3** and **Example 4**:

```r
# Lecture Example 3: keep variables X1 and X3
mu3 <- c(2, -3, 1)
Sigma3 <- matrix(c(1, 1, 1,
                   1, 3, 2,
                   1, 2, 2),
                 nrow = 3, byrow = TRUE)

mu3[c(1, 3)]
Sigma3[c(1, 3), c(1, 3), drop = FALSE]

# Lecture Example 4: inspect covariance between groups
Sigma4 <- matrix(c(4, 1, 0,
                   1, 3, 0,
                   0, 0, 2),
                 nrow = 3, byrow = TRUE)

Sigma4[1, 2]       # Cov(X1, X2) = 1
Sigma4[1:2, 3]     # Both cross-group covariances equal 0
```

`c(1, 3)` is an index vector selecting the **first and third** entries. The expression `Sigma3[c(1,3), c(1,3)]` selects both rows and columns in the required order. `drop = FALSE` keeps the result as a matrix even if a selection leaves only one row or column.

## 47. Lab C: generate a correlated normal dataset without external packages

This example creates $n=250$ observations of **three jointly normal variables**. The prescribed population parameters match the covariance and mean of lecture Examples 1 and 2, but the random dataset is newly simulated.

```r
set.seed(2451)

n <- 250
p <- 3
mu <- c(2, 1, 2)
Sigma <- matrix(c(2, 1, 1,
                  1, 3, 0,
                  1, 0, 1),
                nrow = p, byrow = TRUE)

# n independent rows of three standard-normal numbers
Z <- matrix(rnorm(n * p), nrow = n, ncol = p)

# chol(Sigma) is an upper-triangular matrix U with t(U) %*% U = Sigma
# Multiplying rows of Z by U creates the desired covariance structure
X <- sweep(Z %*% chol(Sigma), 2, mu, FUN = "+")
colnames(X) <- c("X1", "X2", "X3")

# First few observations and sample statistics
head(X)
colMeans(X)
cov(X)
cor(X)
```

**Why do the sample estimates differ from the population inputs?** We requested a random sample from a particular population model. `colMeans(X)` and `cov(X)` are *estimates from one realization*. They should tend to be near $\boldsymbol\mu$ and $\Sigma$ when the sample is sufficiently large, but generally will **not** match exactly.

### Observe the relationships graphically

```r
pairs(X, pch = 19, cex = 0.45,
      main = "Scatterplot matrix: simulated normal data")

par(mfrow = c(2, 3))
for (k in 1:3) {
  hist(X[, k], main = paste("Histogram", colnames(X)[k]),
       xlab = "Observed value", breaks = 15)
}
for (k in 1:3) {
  qqnorm(X[, k], main = paste("Normal Q-Q", colnames(X)[k]))
  qqline(X[, k])
}
par(mfrow = c(1, 1))
```

`X[, k]` means **every row in column $k$**. `pairs()` draws a scatter plot for each pair of variables. The `par(mfrow = c(2, 3))` command sets a two-row, three-column plotting layout; the last command restores the usual single plot.

### Compare independent and correlated normal contours

```r
# Equal variances, two alternative correlation structures
Sigma_independent <- matrix(c(1, 0,
                              0, 1), 2, 2, byrow = TRUE)
Sigma_correlated  <- matrix(c(1, 0.75,
                              0.75, 1), 2, 2, byrow = TRUE)

ellipse_points <- function(Sigma2, level = 0.95) {
  angle <- seq(0, 2 * pi, length.out = 400)
  unit_circle <- rbind(cos(angle), sin(angle))
  L <- t(chol(Sigma2))
  radius <- sqrt(qchisq(level, df = 2))
  L %*% unit_circle * radius
}

E0 <- ellipse_points(Sigma_independent)
E1 <- ellipse_points(Sigma_correlated)

plot(E0[1, ], E0[2, ], type = "l", asp = 1,
     xlim = c(-3, 3), ylim = c(-3, 3),
     xlab = "X1", ylab = "X2",
     main = "95% population probability contours")
lines(E1[1, ], E1[2, ], lty = 2, lwd = 2)
legend("topright", legend = c("rho = 0", "rho = 0.75"),
       lty = c(1, 2), lwd = c(1, 2), bty = "n")
```

The solid contour should be **circular**, because both independent variables have variance 1. The dashed contour should be a **tilted ellipse** because their correlation is 0.75. Each contour encloses 95% population probability under **its own specified normal model**. This reconstructs the conceptual comparison on lecture pages 2–3 without claiming to reproduce the lecturer's original images.

## 48. Lab D: compute squared Mahalanobis distances and a chi-square plot

Keep the simulated `X` from Lab C. Each row of `X` is an observation, and the following command returns **squared** Mahalanobis distances:

```r
center_hat <- colMeans(X)
S <- cov(X)

d2 <- mahalanobis(X, center = center_hat, cov = S)
head(d2)

# 95% chi-square reference threshold
cutoff <- qchisq(0.95, df = ncol(X))
cutoff

# Which observations exceed the reference screening threshold?
flagged <- which(d2 > cutoff)
flagged
length(flagged)

# Chi-square Q-Q / squared-distance plot
n <- nrow(X)
reference_quantiles <- qchisq(ppoints(n), df = ncol(X))
plot(reference_quantiles, sort(d2),
     xlab = "Theoretical chi-square quantiles",
     ylab = "Ordered sample squared Mahalanobis distances",
     main = "Chi-square Q-Q plot for multivariate normality")
abline(a = 0, b = 1, lty = 2)
```

- `cov(X)` estimates the **sample covariance**.
- `mahalanobis()` returns the *squared* distance, so **do not square it again** when comparing to chi-square thresholds.
- `qchisq(0.95, df = 3)` gives the 95th **lower-tail** chi-square quantile, approximately $7.815$.
- `which(d2 > cutoff)` gives **row numbers**, not a verdict that those records are erroneous.
- `ppoints(n)` creates suitable plotting probabilities; `sort(d2)` orders the distances.
- `abline(a = 0, b = 1)` draws the line $y=x$ for reference.

The exact number of flagged observations is **not fixed in advance**. Also, this plot uses estimated parameters and is therefore **not an exact finite-sample chi-square calibration**.

### Manual verification of one distance

```r
j <- 1
v <- X[j, ] - center_hat
manual_d2 <- as.numeric(t(v) %*% solve(S) %*% v)
function_d2 <- d2[j]

manual_d2
function_d2
isTRUE(all.equal(manual_d2, function_d2))
```

The last expression should be `TRUE` up to usual floating-point precision. It verifies that R's helper function and the quadratic-form definition calculate the same quantity for the given data.

## 49. Lab E: univariate normality checks in R

```r
# The original simulated data X are jointly multivariate normal by construction.
# Each column is therefore univariate normal at the population level.

for (k in 1:ncol(X)) {
  cat("\nVariable:", colnames(X)[k], "\n")
  print(shapiro.test(X[, k]))
}

# A Kolmogorov-Smirnov test against a population distribution
# whose parameters are already known from the simulation design:
ks.test(X[, 1], "pnorm", mean = 2, sd = sqrt(2))
```

The standard `ks.test()` example above is a **simple-null** comparison to $N(2,2)$, because those population parameters were specified *before the synthetic data were generated*. That is different from the common but misleading shortcut of estimating `mean(X[,1])` and `sd(X[,1])` from the very same sample while treating the standard KS p-value as though the reference distribution had been fixed in advance.

**Do not invent a “normal or not normal” label from a single output.** Identify the test's hypotheses, read `p.value`, compare with the stated $\alpha$, then consider plots and sample size. In independent new simulations from a perfectly normal population, some tests will occasionally produce small p-values by chance; a 5% significance threshold does not eliminate false rejections.

## 50. Lab F: reproduce Mardia's basic statistics directly in R

The original PDF names Mardia's test but contains neither code nor the skewness and kurtosis formulas. The following **supplementary** function implements the **large-sample formulations described in Section 35**, using maximum-likelihood covariance with divisor $n$.

```r
mardia_asymptotic <- function(X) {
  X <- as.matrix(X)
  n <- nrow(X)
  p <- ncol(X)

  if (n <= p) {
    stop("Need enough observations to estimate invertible covariance.")
  }

  centered <- sweep(X, 2, colMeans(X), FUN = "-")
  S_mle <- crossprod(centered) / n
  S_inv <- solve(S_mle)

  # Generalized cross-products between every pair of rows
  G <- centered %*% S_inv %*% t(centered)

  # Mardia multivariate skewness and kurtosis
  b1p <- sum(G^3) / (n^2)
  squared_distances <- diag(G)
  b2p <- mean(squared_distances^2)

  # Large-sample reference quantities
  skew_df <- p * (p + 1) * (p + 2) / 6
  skew_stat <- n * b1p / 6
  skew_p <- pchisq(skew_stat, df = skew_df, lower.tail = FALSE)

  expected_kurtosis <- p * (p + 2)
  kurt_z <- (b2p - expected_kurtosis) /
            sqrt(8 * p * (p + 2) / n)
  kurt_p <- 2 * pnorm(abs(kurt_z), lower.tail = FALSE)

  list(
    dimension = p,
    observations = n,
    mardia_skewness = b1p,
    skew_chisq_statistic = skew_stat,
    skew_chisq_df = skew_df,
    skew_p_value_asymptotic = skew_p,
    mardia_kurtosis = b2p,
    normal_reference_kurtosis = expected_kurtosis,
    kurtosis_z = kurt_z,
    kurtosis_p_value_asymptotic = kurt_p
  )
}

result <- mardia_asymptotic(X)
print(result)
```

### Understand what every computational block does

1. `as.matrix(X)` makes sure data have matrix structure, with rows as observations and columns as variables.
2. `sweep(..., FUN = "-")` subtracts each column mean, creating a centered matrix.
3. `crossprod(centered) / n` calculates the covariance with the **$n$ divisor** needed for the displayed Mardia formulas.
4. `solve(S_mle)` constructs the covariance inverse. If variables are perfectly collinear, this may fail even if $n>p$.
5. `G` contains the generalized cross-products $g_{ij}$, with diagonal entries corresponding to squared distances.
6. Cubing all entries of `G` and averaging produces **Mardia skewness**.
7. Squaring the *squared* distances and averaging produces **Mardia kurtosis**.
8. `pchisq(..., lower.tail = FALSE)` gives an upper-tail chi-square p-value for the skewness test.
9. `2 * pnorm(abs(kurt_z), lower.tail = FALSE)` gives a two-sided asymptotic normal p-value for kurtosis.

**Limitations:** This is an explanatory implementation of **asymptotic reference formulas**, **not** a replacement for an extensively validated multivariate testing package. In particular, it does not apply finite-sample skewness/kurtosis corrections, multiple-test adjustments, or special calibrations. Interpretation requires attention to sample size, variable dimension, covariance invertibility, and the particular test implementation used. The real test results for any actual dataset cannot be known without running the method on that dataset.

## 51. Lab G: investigate a nonnormal variable and a log transformation

```r
set.seed(2460)

# Positive, deliberately right-skewed synthetic data
sales <- exp(rnorm(250, mean = 3, sd = 0.8))
log_sales <- log(sales)

par(mfrow = c(2, 2))
hist(sales, main = "Positive right-skewed sales", xlab = "Sales")
qqnorm(sales, main = "Raw sales Q-Q"); qqline(sales)
hist(log_sales, main = "Log-transformed sales", xlab = "log(Sales)")
qqnorm(log_sales, main = "Log sales Q-Q"); qqline(log_sales)
par(mfrow = c(1, 1))

shapiro.test(sales)
shapiro.test(log_sales)
```

Here `sales` is constructed by exponentiating normally distributed synthetic numbers, producing a lognormal model. Because `log(exp(u)) = u` for real $u$, the transformed theoretical distribution is exactly normal in this specially constructed example. A finite sample can still show imperfect plots or an occasional small p-value. Real business datasets need not behave so conveniently.

## 52. Lab H: follow the lecture's four-step outlier screening workflow

```r
# Continue using the n x 3 matrix X created in Lab C.

# Step 1: dot plot for each variable
par(mfrow = c(1, 3))
for (k in 1:ncol(X)) {
  dotchart(X[, k], main = colnames(X)[k],
           xlab = "Observed value", cex = 0.6)
}
par(mfrow = c(1, 1))

# Step 2: scatter plots for all pairs
pairs(X, pch = 19, cex = 0.45)

# Step 3: column-wise sample z-scores
Z_sample <- scale(X)
which(abs(Z_sample) > 3.5, arr.ind = TRUE)

# Step 4: squared Mahalanobis distances
D2 <- mahalanobis(X, center = colMeans(X), cov = cov(X))
threshold <- qchisq(0.95, df = ncol(X))
outlier_rows <- which(D2 > threshold)

# Inspect candidate rows alongside their distances
screening_table <- data.frame(
  row_number = seq_len(nrow(X)),
  X,
  squared_mahalanobis = D2,
  exceeds_95pct_chisq_reference = D2 > threshold
)
screening_table[outlier_rows, ]
```

`scale(X)` defaults to subtracting column sample means and dividing by column sample standard deviations, exactly the operation described in subsection 7.1 of the lecture. `which(..., arr.ind = TRUE)` returns row–column index pairs where the condition holds. The `data.frame` combines original measurements with each row's distance so candidates can be investigated.

**Do not use this code to automatically delete flagged rows.** Those rows are **candidates for examination**, not errors by definition.

## 53. Lab I: see what the multivariate CLT means by simulation

The next simulation is deliberately **univariate** at first, because the idea is easier to see with one average. The same logic extends to a vector of averages.

```r
set.seed(2451)

# Individual values are exponential, not normal.
raw_values <- rexp(10000, rate = 1)

# Repeat: draw 40 nonnormal observations, then average them.
repeated_means <- replicate(3000, mean(rexp(40, rate = 1)))

par(mfrow = c(1, 2))
hist(raw_values, breaks = 35,
     main = "Individual values: right-skewed",
     xlab = "Individual observation")
hist(repeated_means, breaks = 35,
     main = "Means of 40 observations",
     xlab = "Sample mean")
par(mfrow = c(1, 1))

mean(repeated_means)   # should be near population mean 1
var(repeated_means)    # should be near population variance / n = 1/40
```

The raw values are visibly right-skewed. The *averages of 40* are much more symmetric and tightly concentrated. The repeated mean has theoretical mean $1$ and variance $1/40$ under independent exponential sampling. This is a **demonstration of the CLT**, not a claim that all exponential samples of size 40 must produce excellent normal approximations.

---

# Part IX. Worked self-check problems with step-by-step solutions

The following questions are **new teaching exercises**, not claimed to be lecturer-set examination questions. They check whether you can actually use the ideas rather than only recognize formulas.

## 54. Foundational questions

### Problem 1. Variance or standard deviation?

**Question:** If $X\sim N(20,16)$, identify the mean, variance, and standard deviation. What is the approximate probability that $X$ lies between 12 and 28?

**Solution:** The second normal parameter is **variance**, so $\mu=20$, $\sigma^2=16$, $\sigma=\sqrt{16}=4$. The interval $12$ to $28$ is $20\pm8=20\pm2(4)$. Therefore the probability is approximately $0.954$, using the two-standard-deviation result on lecture page 1.

### Problem 2. One density height versus a probability

**Question:** Someone calculates $f(20)=0.0997$ and says, “The probability of observing exactly 20 is 9.97%.” What is wrong?

**Solution:** $f(20)$ is the **density height**. For a continuous random variable, $P(X=20)=0$ even if the density at 20 is positive. To obtain a nonzero probability, specify an interval such as $P(19\le X\le21)$ and integrate density over that interval.

### Problem 3. Covariance and correlation

**Question:** If $\operatorname{Var}(X_1)=9$, $\operatorname{Var}(X_2)=16$, and $\operatorname{Cov}(X_1,X_2)=6$, find their correlation.

**Solution:** Standard deviations are $\sqrt9=3$ and $\sqrt{16}=4$. Then

$$\rho=\frac6{3\times4}=\boxed{0.5}.$$

The variables have a moderate positive **linear** association. The result is a correlation, not proof of causation.

### Problem 4. Read a covariance matrix

**Question:** Given $\Sigma=\left[\begin{smallmatrix}4&-3\\-3&9\end{smallmatrix}\right]$, identify both variances and the covariance. Is the relationship positive or negative?

**Solution:** Variances are 4 and 9 (diagonal). Covariance is $-3$ (either off-diagonal). Since $-3<0$, the variables have a negative linear tendency. Correlation is $-3/(2\cdot3)=-0.5$.

## 55. Linear combinations and matrix transformations

### Problem 5. Complete the lecturer's Result 1 calculation without looking back

**Question:** Use $\boldsymbol\mu=(2,1,2)'$, $\Sigma=\left[\begin{smallmatrix}2&1&1\\1&3&0\\1&0&1\end{smallmatrix}\right]$, and $L=X_1-X_2$.

**Solution:** $E(L)=2-1=1$. Variance is

$$\operatorname{Var}(L)=2+3-2(1)=3.$$

The random vector is jointly normal, so $L$ is normal:

$$\boxed{L\sim N(1,3).}$$

### Problem 6. A different weighted difference

**Question:** Let $(X_1,X_2)'$ be bivariate normal with $\boldsymbol\mu=(10,5)'$ and $\Sigma=\left[\begin{smallmatrix}4&2\\2&9\end{smallmatrix}\right]$. Find the distribution of $L=2X_1-X_2$.

**Solution:** Set $\mathbf a=(2,-1)'$. Its mean is

$$E(L)=2(10)-1(5)=15.$$

Its variance is

$$\begin{aligned}
\operatorname{Var}(L)
&=2^2(4)+(-1)^2(9)+2(2)(-1)(2)\\
&=16+9-8=17.
\end{aligned}$$

Thus $\boxed{L\sim N(15,17)}$. Do not use 17 as its standard deviation; standard deviation is $\sqrt{17}$.

### Problem 7. Three-dimensional output versus two-dimensional output

**Question:** A three-variable normal vector is multiplied by a $2\times3$ matrix $A$. What is the dimension of the result? What is the size of its covariance matrix?

**Solution:** $(2\times3)(3\times1)$ gives a **$2\times1$** output vector. Its covariance $A\Sigma A'$ is **$2\times2$**. It is a bivariate normal vector if its covariance is nonsingular.

### Problem 8. Complete the lecturer's Result 2 output

**Question:** With the lecture's $A=\left[\begin{smallmatrix}1&1&1\\1&-1&0\end{smallmatrix}\right]$, find the mean and covariance of $A\mathbf X$ using the original Example 1 parameters.

**Solution:** The first transformed mean is $2+1+2=5$; the second is $2-1=1$. The covariance is

$$A\Sigma A'=\begin{bmatrix}10&0\\0&3\end{bmatrix}.$$

Therefore

$$\boxed{A\mathbf X\sim N_2\left(
\begin{bmatrix}5\\1\end{bmatrix},
\begin{bmatrix}10&0\\0&3\end{bmatrix}\right).}$$

The zero covariance also implies independence between these two transformed components **because the output is jointly normal**.

### Problem 9. Select a marginal pair

**Question:** Given a jointly normal three-variable vector with $\boldsymbol\mu=(4,5,6)'$ and

$$\Sigma=\begin{bmatrix}9&1&2\\1&4&-1\\2&-1&16\end{bmatrix},$$

find the distribution of $(X_2,X_3)'$.

**Solution:** Select the second and third means: $(5,6)'$. Select covariance rows/columns 2 and 3:

$$\begin{bmatrix}4&-1\\-1&16\end{bmatrix}.$$

Hence

$$\boxed{\begin{bmatrix}X_2\\X_3\end{bmatrix}
\sim N_2\left(\begin{bmatrix}5\\6\end{bmatrix},
\begin{bmatrix}4&-1\\-1&16\end{bmatrix}\right).}$$

### Problem 10. Independence blocks

**Question:** A jointly normal vector has covariance $\left[\begin{smallmatrix}1&0&0\\0&2&3\\0&3&9\end{smallmatrix}\right]$. Is $X_1$ independent of the pair $(X_2,X_3)$? Are $X_2$ and $X_3$ independent?

**Solution:** Cross-covariances between $X_1$ and the pair are both zero, so $X_1$ is independent of the pair. But $\operatorname{Cov}(X_2,X_3)=3\ne0$, so $X_2$ and $X_3$ are not independent. The joint-normal assumption makes the first independence conclusion valid.

## 56. Mahalanobis distance and sampling distributions

### Problem 11. Compute a simple squared Mahalanobis distance

**Question:** The population mean is $\boldsymbol\mu=(0,0)'$, covariance is diagonal with entries 4 and 9, and the observed point is $(4,3)'$. Calculate $D^2$.

**Solution:** Because the covariance is diagonal, add squared standardized values:

$$D^2=\frac{4^2}{4}+\frac{3^2}{9}=4+1=\boxed{5}.$$

For $p=2$, $5<5.991$, the 95% chi-square cutoff; the point is inside the specified 95% population probability ellipse.

### Problem 12. Why correlation matters

**Question:** In a standardized bivariate model ($\mu_1=\mu_2=0$, variances 1), consider point $(1,1)$ with correlation $\rho=0.75$. Find $D^2$ and compare with the uncorrelated case.

**Solution:** Use the bivariate formula:

$$D^2=\frac{1^2+1^2-2(0.75)(1)(1)}{1-(0.75)^2}
=\frac{2-1.5}{1-0.5625}
=\frac{0.5}{0.4375}=\boxed{\frac87\approx1.143}.$$

Without correlation, $D^2=1^2+1^2=2$. Under positive correlation, a simultaneous high-high combination fits the direction of the cloud and is **less unusual by Mahalanobis distance**.

### Problem 13. What is the distribution of the sample mean?

**Question:** Suppose independent $\mathbf X_i\sim N_2((20,10)',\left[\begin{smallmatrix}25&5\\5&9\end{smallmatrix}\right])$. Find the exact distribution of $\bar{\mathbf X}$ for $n=25$.

**Solution:** Divide every entry of $\Sigma$ by 25 while retaining the mean:

$$\boxed{\bar{\mathbf X}\sim N_2\left(
\begin{bmatrix}20\\10\end{bmatrix},
\begin{bmatrix}1&0.2\\0.2&0.36\end{bmatrix}\right).}$$

The first sample mean has standard deviation $\sqrt1=1$; the second has standard deviation $\sqrt{0.36}=0.6$.

### Problem 14. Exact or approximate?

**Question:** Individual customers have strongly skewed expenditures, but the population covariance exists and observations are independent identically distributed. What permits approximate normality of their **mean vector** at sufficiently large $n$?

**Solution:** The **multivariate central limit theorem**. Under the stated conditions, the *sampling distribution of the sample mean* is approximately $N_p(\boldsymbol\mu,\Sigma/n)$. The individual observations are **not** thereby transformed into normal observations, and the approximation quality must still be assessed.

## 57. Diagnostic interpretation and outlier judgment

### Problem 15. Does a large p-value prove normality?

**Question:** A Shapiro–Wilk test produces $p=0.34$. The chosen significance level is $\alpha=0.05$. Can we conclude “the population is definitely normal”?

**Solution:** **No.** Because $0.34\ge0.05$, we **fail to reject** the normality null at the chosen level. That means the evidence is insufficient to reject it; it does not prove that the null is true. Examine the Q–Q plot, sample size, and other assumptions.

### Problem 16. Is univariate normality sufficient?

**Question:** Three histograms are approximately bell-shaped and all three Shapiro–Wilk tests have p-values above 0.05. Must the three-dimensional vector be multivariate normal?

**Solution:** **No.** Each marginal might be normal while joint dependence is nonnormal. The joint distribution must be assessed using multivariate diagnostics and substantive knowledge. See the sign-mixture counterexample in Section 27.

### Problem 17. Interpret two Mardia tests

**Question:** In a hypothetical example, Mardia skewness has $p=0.004$ and kurtosis has $p=0.17$. At $\alpha=0.05$, what can be stated?

**Solution:** The skewness statistic yields evidence against multivariate normality, so reject the skewness test's normality null. The kurtosis statistic alone does not reject. It is **incorrect** to say the second result “overrules” the first or proves normality. These p-values are **illustrative**, not source-PDF output.

### Problem 18. Expected tail count for standardized entries

**Question:** A dataset contains $n=100$ observations on $p=5$ variables. Using the ideal normal tail probability $P(|Z|>3)\approx0.0027$, approximately how many of the 500 individual standardized entries would exceed $\pm3$ in expectation?

**Solution:** There are $100(5)=500$ entries, so $500(0.0027)=\boxed{1.35}$, or roughly one to two. This is an expected-count approximation, not a guarantee that a normal dataset always contains one or two such points.

### Problem 19. An observation exceeds a chi-square threshold

**Question:** A fitted three-variable model produces an observation with sample squared Mahalanobis distance $d^2=9$. Compare it with the approximate 95% reference cutoff $\chi^2_{3,0.95}\approx7.815$.

**Solution:** $9>7.815$, so it exceeds the **approximate upper 5% screening cutoff** and warrants investigation. This does not establish the observation is an entry error. Also, because sample mean and covariance were estimated, the exact finite-sample probability is **not automatically** the population chi-square tail probability.

### Problem 20. Should all outliers be removed?

**Question:** A company's most valuable client spends 20 times more than the median client and is a multivariate outlier. Is deleting this record statistically required?

**Solution:** **No.** The value may be genuine and especially important to the business. Verify data integrity and units, consider whether the customer belongs to the target population, assess the observation's influence on conclusions, and justify any exclusions. The lecture explicitly warns against equating outliers with wrong numbers.

---
# Part X. The complete conceptual map and mathematical reference

## 58. The main story of the chapter, in logical order

Begin with **one uncertain quantity**. Its distribution describes possible outcomes and their probabilities. A normal distribution is one particular bell-shaped probability model; its mean $\mu$ determines its center, and its variance $\sigma^2$ determines its spread.

Now measure **two or more quantities on the same subject**. Their means and variances are not enough: we also need to understand how they **vary together**. Covariances record these relationships, so we package them in the matrix $\Sigma$. The multivariate normal distribution uses the mean vector and covariance matrix to describe the entire joint cloud.

The essential new distance is **Mahalanobis distance**. Whereas a one-dimensional z-score asks how many standard deviations a point lies from the center, Mahalanobis distance asks how surprising the **whole combination** is relative to its covariance pattern. This generalized distance is the heart of the multivariate density formula and the shape of its elliptical contours.

Joint normality gives strong mathematical properties: linear transformations remain normal, any subset is normal, and zero covariance implies **independence** for jointly normal components. The squared Mahalanobis distance has a **chi-square** distribution when the mean and covariance are known and the model is exactly normal. This creates probability ellipsoids and motivates outlier screening.

When we collect **many independent observations**, the vector of sample averages has the same mean vector but a smaller covariance matrix $\Sigma/n$. Its distribution is *exactly* normal if the observations are jointly normal, and often *approximately* normal for suitably large samples by the multivariate CLT even if individuals are not normal.

Finally, assumptions must be **assessed**, not taken on faith. Histograms and univariate Q–Q plots look at marginal distributions. Chi-square squared-distance plots and Mardia's test investigate multivariate aspects. Unusual points should be examined, not reflexively deleted. Log and power transformations may help with certain nonnormal forms but do not automatically fix every joint-distribution problem.

## 59. Formula sheet with interpretations

| Concept | Formula | What it answers |
|---|---|---|
| Univariate normal | $X\sim N(\mu,\sigma^2)$ | What model describes one random variable? |
| Univariate density | $f(x)=\frac{1}{\sqrt{2\pi\sigma^2}}e^{-(x-\mu)^2/(2\sigma^2)}$ | How tall is the density at $x$? |
| Population z-score | $z=(x-\mu)/\sigma$ | How far is $x$ from the mean in SD units? |
| Population correlation | $\rho_{12}=\sigma_{12}/(\sqrt{\sigma_{11}}\sqrt{\sigma_{22}})$ | How strongly do two variables move linearly together? |
| Multivariate normal | $\mathbf X\sim N_p(\boldsymbol\mu,\Sigma)$ | What describes the joint normal vector? |
| Multivariate density | $\frac{1}{(2\pi)^{p/2}|\Sigma|^{1/2}}e^{-D^2/2}$ | How is the joint density shaped? |
| Population squared Mahalanobis | $D^2=(\mathbf x-\boldsymbol\mu)'\Sigma^{-1}(\mathbf x-\boldsymbol\mu)$ | How extreme is a combination relative to known population spread? |
| Linear-combination mean | $E(\mathbf a'\mathbf X)=\mathbf a'\boldsymbol\mu$ | Mean of a weighted sum |
| Linear-combination variance | $\operatorname{Var}(\mathbf a'\mathbf X)=\mathbf a'\Sigma\mathbf a$ | Variance of a weighted sum |
| Matrix transformation | $A\mathbf X\sim N_q(A\boldsymbol\mu,A\Sigma A')$ | Joint distribution of several weighted sums |
| Translation | $\mathbf X+\mathbf d\sim N_p(\boldsymbol\mu+\mathbf d,\Sigma)$ | Effect of shifting each variable by a constant |
| Subvector | $\mathbf X_I\sim N_{|I|}(\boldsymbol\mu_I,\Sigma_{II})$ | Distribution of selected variables |
| Normal-block independence | $\Sigma_{12}=0\ \Longleftrightarrow\ \mathbf X_1\perp\mathbf X_2$ | When do groups contain no dependence? |
| Squared-distance law | $D^2\sim\chi_p^2$ | Which reference distribution describes population normal distances? |
| Probability ellipsoid | $D^2\le q_{1-\alpha}(\chi_p^2)$ | Which region contains probability $1-\alpha$? |
| Sample mean vector | $\bar{\mathbf X}=n^{-1}\sum_{i=1}^n\mathbf X_i$ | How do we average multivariate observations? |
| Exact mean distribution | $\bar{\mathbf X}\sim N_p(\boldsymbol\mu,\Sigma/n)$ | Normal sampling case |
| Multivariate CLT | $\sqrt n(\bar{\mathbf X}-\boldsymbol\mu)\xrightarrow{d}N_p(0,\Sigma)$ | Large-sample limit for means |
| Sample z-score | $z_{jk}=(x_{jk}-\bar x_k)/\sqrt{s_{kk}}$ | How unusual is one entry in its own variable? |
| Sample squared distance | $d_j^2=(\mathbf x_j-\bar{\mathbf x})'S^{-1}(\mathbf x_j-\bar{\mathbf x})$ | How unusual is one full row? |
| Reference quantile in R | `qchisq(1 - alpha, df = p)` | Upper-tail $\alpha$ cutoff used for ellipsoid/screening |

The exact versus approximate qualifications explained earlier **still apply** to the compact expressions in this table. In particular, the sample mean is exactly normal under normal iid sampling, while the CLT result is a limiting approximation when the parent population need not be normal; the sample squared distances do not magically have the same exact finite-sample law as population distances.

## 60. The mistakes most likely to produce wrong calculations

| Mistake | Why it is wrong | Correct habit |
|---|---|---|
| Reading $N(5,9)$ as “SD = 9” | Normal notation uses **variance** as the second parameter | SD $=\sqrt9=3$ |
| Using $f(x)$ as an event probability | Density height is not interval area | Use integrals or CDF differences |
| Treating $\Sigma^{-1}$ as reciprocals of each entry | Matrix inverse is a **matrix operation** | Use `solve(Sigma)` in R |
| Multiplying matrices with `*` in R | `*` acts elementwise | Use `%*%` |
| Assuming uncorrelated always means independent | False for general joint distributions | Require **joint normality** for the lecture's special converse |
| Assuming normal individual marginals prove joint normality | Relationships among variables might be nonnormal | Check joint diagnostics |
| Forgetting covariance when finding $\operatorname{Var}(X_1-X_2)$ | Variance of a difference includes **$-2\operatorname{Cov}$** | Use $\mathbf a'\Sigma\mathbf a$ |
| Selecting means but the wrong covariance rows | The output covariance must match the same subset/order | Select rows **and** columns consistently |
| Forgetting $n$ when finding $\operatorname{Cov}(\bar{\mathbf X})$ | Averages are less variable than individuals | Use $\Sigma/n$ for iid sample means |
| Claiming CLT makes raw data normal | CLT concerns sample mean distribution | Distinguish observations from repeated-sample averages |
| Comparing a Mahalanobis **distance** $d$ to a $\chi^2$ cutoff | Chi-square refers to **squared** distance $d^2$ | Check the definition/output of the software function |
| Treating estimated distances as exact chi-square samples | Estimation changes their finite-sample distribution | Use carefully qualified approximations or appropriate calibration |
| Reporting $p>0.05$ as proof of normality | A test can fail to detect a genuine departure | Say “failed to reject” |
| Applying a log to zero/negative values | Ordinary real $\log(x)$ requires $x>0$ | Check domains before transformation |
| Automatically deleting all flagged observations | Outliers can be genuine and informative | Verify, investigate, document |

## 61. A practical study route

You do not need to memorize every formula simultaneously. A productive order is:

1. **Explain in your own words** the difference between a single observation, a distribution, a sample, and a sampling distribution.
2. Calculate two-variable **means, variances, covariance, and correlation** using small numbers.
3. Practise **row-by-column matrix multiplication**, transposes, and two-by-two inverses.
4. Understand the **normal bell** and how a z-score measures univariate distance.
5. Explain **why a joint cloud stretches into an ellipse** when variables correlate.
6. Solve the lecture's **Examples 1–4 by hand** and verify with Lab B.
7. Rework **Result 5** until you understand why the chi-square cutoff defines a probability ellipsoid.
8. Compare **exact** sampling normality with **CLT-based approximate** sampling normality.
9. Inspect **histograms, Q–Q plots, $d^2$ plots**, and the two Mardia statistics on synthetic data.
10. Practise reporting diagnostic conclusions without saying that a p-value proves normality or that every unusual point should be deleted.

## 62. Verified coverage audit of the ten-page lecture

The following checklist identifies **each original page and each material idea** addressed in this teaching book. It is an audit of **topic coverage**, not a claim that the source itself contains the expanded examples, R code, or new derivations.

| Original PDF location | Original concept/figure/example | Treatment in this book |
|---|---|---|
| p. 1, opening | Most multivariate techniques often rely on normality | §9, §26 |
| p. 1, opening | Normal distribution as useful population approximation | §6, §9 |
| p. 1, opening | Central limit effect motivates normal approximations | §9, §25 |
| p. 1, Section 1 | Univariate normal density $N(\mu,\sigma^2)$ | §6 |
| p. 1, Figure 1 | Bell-shaped normal curve and probability areas | §7 |
| p. 1, displayed probabilities | $0.683$ within $\pm1\sigma$, $0.954$ within $\pm2\sigma$ | §7, Lab A |
| p. 2, Section 2 | General $p$-variate normal density and dimensions | §10–11 |
| p. 2, Section 2 | Replace univariate standardized distance with quadratic form | §12 |
| p. 2, Section 2 | Squared Mahalanobis distance | §12, §21–22 |
| p. 2, Section 2.1 | Means, variances, correlation, bivariate density | §13 |
| p. 2, Section 2.1 | Textbook reference to Johnson & Wichern, Example 4.1 | §13 (reference identified, not reproduced) |
| p. 2, Section 2.1 | Factorization and independence when $\rho=0$ | §14 |
| pp. 2–3, figures | Normal surfaces/contours with $\rho=0$ and $\rho=0.75$ | §14, Lab C |
| p. 3, linked demonstration | Wolfram bivariate-normal demonstration | §14 |
| p. 3, explanatory text | Correlation concentrates density along a direction | §14–15 |
| p. 3, explanatory text | Region probabilities are volumes beneath joint surface | §11 |
| p. 3, contour-map illustrations | Elevation, contour spacing, slopes and contours | §14 |
| p. 4, Section 3 introduction | Linear-combination, subset, independence and conditional properties | §16–20 |
| p. 4, Result 1 | $\mathbf a'\mathbf X\sim N(\mathbf a'\mu,\mathbf a'\Sigma\mathbf a)$ and converse | §16 |
| p. 4, Example 1 | $X_1-X_2$, mean 1, variance left as `?` | §16, **completed variance 3** |
| p. 5, Result 2 | $A\mathbf X$; $A\mu$, $A\Sigma A'$ | §17 |
| p. 5, Result 2 | Constant shift $\mathbf X+\mathbf d$ | §17 |
| p. 5, Example 2 | Two weighted sums; unfinished output mean/covariance | §17, **completed $(5,1)'$, diag$(10,3)$** |
| pp. 5–6, Result 3 | Normality of every subset | §18 |
| pp. 5–6, Example 3 | Reorder/partition, select $(X_1,X_3)$ | §18 |
| p. 6, Result 4 | Independence implies zero covariance; joint-normal converse | §19 |
| p. 6, Result 4 | Independence of normal subblocks gives block-diagonal covariance | §19 |
| pp. 6–7, Example 4 | $X_1,X_2$ dependent; pair independent of $X_3$ | §19 |
| p. 7, Result 5 | Squared Mahalanobis is $\chi_p^2$ for nonsingular $\Sigma$ | §21 |
| p. 7, Result 5 | Ellipsoid with probability $1-\alpha$ | §22 |
| p. 8, Figure 4 | Ellipsoid centered at $\mu$; eigenvector/eigenvalue directions | §15, §22 |
| p. 8, Section 4 | Exact $\bar{\mathbf X}\sim N_p(\mu,\Sigma/n)$ from normal sampling | §23–24 |
| p. 8, Section 5 | Multivariate CLT; large $n$ relative to $p$ | §25 |
| p. 9, Section 6 | Why normality matters to inference | §26 |
| p. 9, subsection 6.1 | Assess every marginal; histograms | §27–28 |
| p. 9, subsection 6.1 | Ordered-data normal Q–Q plots and straight-line idea | §29 |
| p. 9, subsection 6.1 | Kolmogorov–Smirnov and Shapiro–Wilk tests | §30–32 |
| p. 9, subsection 6.2 | Population/estimated squared distances and chi-square plots | §33–34 |
| p. 9, subsection 6.2 | Mardia's test, stated null and alternative | §35 |
| p. 10, subsection 6.3 | Logarithm and power transformations | §36 |
| p. 10, Section 7 | Outliers need not be wrong observations | §37 |
| p. 10, subsection 7.1 | Dot plot every variable; scatter plot every pair | §39–40 |
| p. 10, subsection 7.1 | Sample-standardized values $z_{jk}$ | §41 |
| p. 10, subsection 7.1 | $n=100,p=5$: approximately 1–2 extreme $|z|>3$ values | §41 |
| p. 10, subsection 7.1 | $|z|\approx3.5$ as possible moderate-sample flag | §41 |
| p. 10, subsection 7.1 | Squared sample Mahalanobis distances and chi-square percentiles | §42 |
| p. 10, subsection 7.1 | $n=100$: about five values above upper 5% cutoff | §42 |

### Attribution and boundaries

The **primary and only attached teaching source** is `Lec6.pdf`, *DA2451 – Multivariate Methods in Business, Semester 4, 2026*, **pages 1–10**. All original page numbers in this book refer to that document. No external textbook passages or findings have been silently incorporated.

**Reconstructed computations:** Lecture Example 1's missing variance, Example 2's missing transformed mean and covariance, the additional worked distances, and all new self-check problems are explicitly computed in this book. Page 4's conditional-distribution topic is marked omitted in the lecture and presented here only as an optional teaching expansion. Mardia formulas, R code, and diagnostic cautions are likewise supplementary instruction, not material represented as appearing in the lecture.

**Final principle:** Multivariate normality is a model for the entire **joint pattern of variation**. Its strength comes from combining *means*, *variances*, *covariances*, and *probability* in a single coherent mathematical framework. Understanding how those pieces work together is more valuable than memorizing the density formula in isolation.
