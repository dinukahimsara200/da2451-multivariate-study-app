# 20 Batch | Final Examination | August 2023 | DA3420

## Multivariate Methods in Business — Master Beginner Teaching Guide & Complete Worked Solutions

---

# PART I: MULTIPLE CHOICE QUESTIONS `[Total: 20 Marks — 2 Marks Each]`

In this section, we will not only identify the correct option for each Multiple Choice Question, but also explain **what every term means from scratch** and **why each option is right or wrong**, assuming zero prior background in statistics.

---

## MCQ 1

**Question Reference:** *The exponent of a multivariate normal density function, $(X - \mu)' \Sigma^{-1} (X - \mu)$, follows:*
* *(a) A $F$ distribution*
* *(b) A $t$ distribution*
* *(c) A chi-square distribution*
* *(d) A standard normal distribution*

### Beginner’s Concept Explained from Scratch

1. **What happens in 1-dimensional (Univariate) Statistics?**
   Suppose you have a single variable $X$ that follows a normal bell curve with average $\mu$ and variance $\sigma^2$ (standard deviation $\sigma$).
   If you standardize $X$ by subtracting the mean $\mu$ and dividing by $\sigma$, you get a **Standard Normal score ($Z$)**:
   $$
   Z = \frac{X - \mu}{\sigma} \sim N(0, 1)
   $$
   What happens if you **square** that $Z$-score?
   $$
   Z^2 = \left(\frac{X - \mu}{\sigma}\right)^2 = (X - \mu)(\sigma^2)^{-1}(X - \mu)
   $$
   In statistics, the square of a standard normal variable ($Z^2$) always follows a **Chi-Square distribution with $1$ degree of freedom ($\chi_1^2$)**.

2. **What happens in $p$-dimensional (Multivariate) Statistics?**
   When $X$ is a vector of $p$ variables following a Multivariate Normal distribution $N_p(\mu, \Sigma)$, the expression $(X - \mu)' \Sigma^{-1} (X - \mu)$ is the exact multivariate version of $Z^2$ (it is called the **squared Mahalanobis distance** from $X$ to the mean vector $\mu$).
   Mathematically, it can be rewritten as the sum of $p$ independent squared standard normal variables:
   $$
   (X - \mu)' \Sigma^{-1} (X - \mu) = Z_1^2 + Z_2^2 + \dots + Z_p^2
   $$
   Because adding $p$ independent $\chi_1^2$ variables together produces a **Chi-Square distribution with $p$ degrees of freedom ($\chi_p^2$)**, this expression always follows a **chi-square distribution**!

### Why the Other Options Are Incorrect
* **(a) $F$ distribution & (b) $t$ distribution:** These only arise when the true population covariance $\Sigma$ is *unknown* and has to be estimated from sample data using $S$. Here, the true $\Sigma$ is inside the formula.
* **(d) Standard normal distribution:** A standard normal variable can be negative or positive, whereas $(X - \mu)' \Sigma^{-1} (X - \mu)$ is a *squared* distance and is always $\ge 0$.

> **Correct Answer for MCQ 1:** **(c) A chi-square distribution** *(specifically, $\chi_p^2$)*

---

## MCQ 2

**Question Reference:** *If $X \sim N_p(\mu, \Sigma)$ then $X + d$, where $d$ is a $p \times 1$ vector of constants, follows:*
* *(a) $N_p(\mu, \Sigma)$*
* *(b) $N_p(\mu + d, \Sigma)$*
* *(c) $N_p(\mu, \Sigma + d)$*
* *(d) $N_p(\mu + d, \Sigma + d)$*

### Beginner’s Concept Explained from Scratch

Imagine we measure the salaries ($X_1$) and bonuses ($X_2$) of employees in a company. Their current averages are $\mu = \begin{bmatrix} \mu_1 \\ \mu_2 \end{bmatrix}$ and their covariance matrix (how much salaries and bonuses vary from person to person) is $\Sigma$.

Now suppose the company gives **every single employee** the exact same fixed cash allowance $d = \begin{bmatrix} d_1 \\ d_2 \end{bmatrix}$ (say, $+\$100$ to salary and $+\$50$ to bonus). Because $d$ is a **vector of constants** (the exact same number is added to everyone):
1. **What happens to the average (Mean Vector)?**
   If everyone gets $+\$100$ added to $X_1$ and $+\$50$ added to $X_2$, the new average simply shifts upward by $d$:
   $$
   \text{New Mean} = E(X + d) = E(X) + d = \mu + d
   $$
2. **What happens to the spread/fluctuation (Covariance Matrix $\Sigma$)?**
   Since every single person's numbers shifted by the exact same fixed amount $d$, the distances *between* different people have not changed at all! Adding a constant never changes variance or covariance:
   $$
   \text{New Covariance Matrix} = \text{Cov}(X + d) = \text{Cov}(X) = \Sigma
   $$
3. **Does the bell-curve shape change?**
   No, shifting a normal distribution just moves the bell curve to the left or right; it remains $N_p$.

*(Note: Furthermore, options (c) and (d) are mathematically impossible because $\Sigma$ is a $p \times p$ square matrix while $d$ is a $p \times 1$ column vector—you cannot even add matrices of different sizes!)*

> **Correct Answer for MCQ 2:** **(b) $N_p(\mu + d, \Sigma)$**

---

## MCQ 3

**Question Reference:** *Let $X_1, \dots, X_n$ be a random sample of size $n$ from a $p$-variate normal distribution with mean $\mu$ and covariance matrix $\Sigma$. Which of the following statements is correct?*
* *(a) $\bar{X}$ is distributed as $N_p(\mu, \frac{1}{n}\Sigma)$.*
* *(b) $(n - 1)S$ is distributed as a $p$-dimensional Wishart distribution with $(n - 1)$ d.f. and the covariance matrix $\Sigma$.*
* *(c) $\bar{X}$ and $S$ are independent.*
* *(d) All of the above*
*(Note that $\bar{X}$ is the sample mean vector and $S$ is the sample covariance matrix.)*

### Beginner’s Concept Explained from Scratch

When we take a random sample of $n$ observations from a Multivariate Normal population $N_p(\mu, \Sigma)$, we compute two summary statistics from our data:
* $\bar{X} = \frac{1}{n}\sum_{i=1}^n X_i$: The **sample mean vector** (the average of the $n$ observations).
* $S = \frac{1}{n-1}\sum_{i=1}^n (X_i - \bar{X})(X_i - \bar{X})'$: The **sample covariance matrix** (how spread out the $n$ observations are).

Let us check the three fundamental statistical properties of $\bar{X}$ and $S$:
1. **Statement (a):** Just as the univariate sample mean $\bar{x}$ follows $N(\mu, \frac{\sigma^2}{n})$, the multivariate sample mean vector $\bar{X}$ is an unbiased estimator of $\mu$ and its covariance matrix shrinks by a factor of $\frac{1}{n}$. Thus, $\bar{X} \sim N_p(\mu, \frac{1}{n}\Sigma)$. **(Statement (a) is TRUE).**
2. **Statement (b):** In 1-dimensional statistics, $(n-1)s^2$ is a multiple of a Chi-Square distribution ($\sigma^2 \chi_{n-1}^2$). In $p$-dimensional multivariate statistics, the generalization of the Chi-Square distribution for $p \times p$ matrices is called the **Wishart Distribution**, denoted $W_p(n-1, \Sigma)$. Specifically, the sample sum of squares and cross-products matrix $(n-1)S$ follows a $p$-dimensional Wishart distribution with $(n-1)$ degrees of freedom and scale matrix $\Sigma$. **(Statement (b) is TRUE).**
3. **Statement (c):** A famous and unique property of the Normal distribution is that the sample average ($\bar{X}$) and the sample spread ($S$) are **completely statistically independent** of each other. **(Statement (c) is TRUE).**

Since (a), (b), and (c) are all true, **(d) All of the above** is the correct answer.

> **Correct Answer for MCQ 3:** **(d) All of the above**

---

## MCQ 4

**Question Reference:** *In multivariate analysis, what would you use Box's M-test for?*
* *(a) To test for multivariate normality*
* *(b) To test for independence of residuals*
* *(c) To test for homogeneity of variance*
* *(d) To test for homogeneity of covariance matrices*

### Beginner’s Concept Explained from Scratch

* **What does "Homogeneity" mean?** In statistics, *homogeneity* means **"sameness" or "equality"** across different groups.
* **In Univariate Statistics (1 variable):** When we compare two or more groups (using a $t$-test or ANOVA), we use Levene's test or Bartlett's test to check for *homogeneity of variance* ($\sigma_1^2 = \sigma_2^2 = \dots = \sigma_g^2$).
* **In Multivariate Statistics ($p$ variables):** Each group doesn't just have a single variance; it has an entire $p \times p$ **covariance matrix** ($\Sigma_1, \Sigma_2, \dots, \Sigma_g$). Before running a Two-Sample Hotelling's $T^2$ test, MANOVA, or Linear Discriminant Analysis (LDA), we must check if all groups share the **same covariance matrix**:
  $$
  H_0: \Sigma_1 = \Sigma_2 = \dots = \Sigma_g
  $$
  The statistical test specifically designed to test whether two or more population **covariance matrices** are equal is **Box's M-test**!

> **Correct Answer for MCQ 4:** **(d) To test for homogeneity of covariance matrices**

---

## MCQ 5

**Question Reference:** *The goal of performing principal component analysis is:*
* *(a) To explain the variance-covariance structure of a large set of variables through a few linear combinations of these variables.*
* *(b) To explain only the variance structure of a large set of variables through a few linear combinations of these variables.*
* *(c) To explain only the covariance structure of a large set of variables through a few linear combinations of these variables.*
* *(d) To explain the variance-covariance structure of a large set of variables through a few nonlinear combinations of these variables.*

### Beginner’s Concept Explained from Scratch

What is **Principal Component Analysis (PCA)** trying to achieve?
* Suppose you have a dataset with many correlated variables (say, $20$ financial ratios of a company).
* The relationships among these variables are summarized by their **variance-covariance matrix $\Sigma$** (or correlation matrix $R$), which contains **both** the variances on the diagonal and the covariances off the diagonal—together called the **variance-covariance structure**.
* PCA creates a small number of new variables ($PC_1, PC_2, \dots, PC_k$) by taking **linear combinations** (weighted sums like $a_1 X_1 + a_2 X_2 + \dots + a_p X_p$, *not* nonlinear combinations) of the original variables to explain as much of that **variance-covariance structure** as possible.

Why are the other options wrong?
* **(b) and (c)** say "only the variance" or "only the covariance." PCA uses the entire covariance matrix $\Sigma$, so it explains *both* the variance and covariance structure together. (By contrast, Factor Analysis focuses specifically on the covariance/correlation structure via common factors).
* **(d)** says "nonlinear combinations," whereas standard PCA strictly uses **linear** combinations.

> **Correct Answer for MCQ 5:** **(a) To explain the variance-covariance structure of a large set of variables through a few linear combinations of these variables.**

---

## MCQ 6

**Question Reference:** *Which of the following statements is correct?*
* *(I) Principal components are orthogonal to each other.*
* *(II) The variation explained by the first principal component is maximum.*
* *(a) Only (I)*
* *(b) Only (II)*
* *(c) Both (I) and (II)*
* *(d) None of the above*

### Beginner’s Concept Explained from Scratch

Let us examine both statements carefully:
1. **Statement (I): "Principal components are orthogonal to each other."**
   * What does **orthogonal** mean? Geometrically, it means **perpendicular (at $90^\circ$ angles)** to each other. Statistically, it means the principal components are **completely uncorrelated** ($\text{Cov}(PC_i, PC_j) = 0$ for $i \neq j$), and their eigenvector weight vectors satisfy $e_i' e_j = 0$. Thus, they do not overlap in the information they capture. **(Statement (I) is CORRECT).**
2. **Statement (II): "The variation explained by the first principal component is maximum."**
   * How is the first principal component ($PC_1$) defined? It is specifically constructed as the linear combination $e_1' X$ (with unit-length weights $e_1' e_1 = 1$) that **maximizes variance** ($\text{Var}(PC_1) = \lambda_1$ is the largest eigenvalue). Every subsequent principal component ($PC_2, PC_3, \dots$) explains progressively less variance ($\lambda_1 \ge \lambda_2 \ge \lambda_3 \dots$). **(Statement (II) is CORRECT).**

> **Correct Answer for MCQ 6:** **(c) Both (I) and (II)**

---

## MCQ 7

**Question Reference:** *Which of the following statements is correct?*
* *(I) Exploratory factor analysis is used to discover the factor structure of a construct and examine its reliability. It is theory-driven.*
* *(II) Confirmatory factor analysis is used to confirm the fit of the hypothesized factor structure to the observed (sample) data. It is data-driven.*
* *(a) Only (I)*
* *(b) Only (II)*
* *(c) Both (I) and (II)*
* *(d) None of the above*

### Beginner’s Concept Explained from Scratch

In Factor Analysis, there are two main branches: **Exploratory Factor Analysis (EFA)** and **Confirmatory Factor Analysis (CFA)**. Let us understand the difference between "data-driven" and "theory-driven":
1. **Exploratory Factor Analysis (EFA):**
   When you do *not* have a pre-existing theory about how many hidden factors exist or which survey questions belong to which factor, you let the **data** speak for itself to explore and discover the factor structure. Therefore, **EFA is DATA-DRIVEN** (not theory-driven!).
   *Look at Statement (I):* It claims EFA is "theory-driven." That is **FALSE**!
2. **Confirmatory Factor Analysis (CFA):**
   When you already have a strong **scientific or business theory** before looking at the data (e.g., "Theory says these 10 questions measure exactly 2 factors: Customer Trust and Brand Loyalty"), you specify that exact model in advance and test whether your sample data fits your theory. Therefore, **CFA is THEORY-DRIVEN** (not data-driven!).
   *Look at Statement (II):* It claims CFA is "data-driven." That is **FALSE**!

Because the two statements swapped "theory-driven" and "data-driven," **neither (I) nor (II) is correct**.

> **Correct Answer for MCQ 7:** **(d) None of the above**

---

## MCQ 8

**Question Reference:** *Which of the following is NOT one of the primary goals of factor analysis?*
* *(a) Determine how many factors underlie a set of observable variables*
* *(b) Provide a method of explaining variance among observable variables by using fewer, newly created factors*
* *(c) Reduce data by allowing us to extract a small set of factors from a larger set of observable variables*
* *(d) Define the meaning or content of the observable variables*

### Beginner’s Concept Explained from Scratch

Let us distinguish between **Observable Variables** (the things we directly measure, like a student's test scores in Algebra, Geometry, Reading, and Essay Writing) and **Latent Factors** (the hidden abilities we extract, like "Mathematical Ability" and "Verbal Ability"):
* **(a)** Determining how many underlying factors exist (e.g., 2 factors) **IS** a primary goal of FA.
* **(b)** Explaining the shared variance among the observable variables using fewer factors **IS** a primary goal of FA.
* **(c)** Reducing a large set of observable variables into a smaller set of factors **IS** a primary goal of FA.
* **(d) "Define the meaning or content of the observable variables":** Wait! We *already* know the meaning of the observable variables before we start (we already know that an Algebra test measures Algebra!). In Factor Analysis, we use the observable variables to **define the meaning or content of the newly extracted LATENT FACTORS**—not the other way around! Therefore, (d) is **NOT** a goal of factor analysis.

> **Correct Answer for MCQ 8:** **(d) Define the meaning or content of the observable variables**

---

## MCQ 9

**Question Reference:** *What is a latent variable?*
* *(a) It is a variable that cannot be measured directly.*
* *(b) It is another name for a factor.*
* *(c) Latent variables represent clusters of variables that correlate highly with each other.*
* *(d) All of the above*

### Beginner’s Concept Explained from Scratch

The word **"latent"** literally means *"hidden beneath the surface."*
* **(a) Cannot be measured directly:** Think of concepts like *Customer Satisfaction*, *Intelligence*, *Employee Burnout*, or *Brand Equity*. You cannot put a ruler or a thermometer on a customer to directly read their "Satisfaction" number. Instead, you ask them several survey questions (observable variables) that reflect their hidden satisfaction. So (a) is **TRUE**.
* **(b) Another name for a factor:** In Factor Analysis, the underlying common factors ($F_1, F_2, \dots, F_m$) are called **latent variables** or **latent factors**. So (b) is **TRUE**.
* **(c) Represent clusters of variables that correlate highly with each other:** Why do five different survey questions about polite staff, fast service, and helpful cashiers all correlate highly with each other? Because they are all driven by the same underlying latent variable (*Service Quality*)! Thus, each latent variable represents a cluster of highly intercorrelated observed variables. So (c) is **TRUE**.

> **Correct Answer for MCQ 9:** **(d) All of the above**

---

## MCQ 10

**Question Reference:** *Which of the followings can be used to determine how many factors to take from a factor analysis?*
* *(a) Kaiser's rule for eigenvalues*
* *(b) Scree plot*
* *(c) % of variance*
* *(d) All of the above*

### Beginner’s Concept Explained from Scratch

When you run a Factor Analysis (or Principal Component Analysis), how do you decide how many factors ($m$) to keep? Statisticians use three standard rules of thumb:
1. **(a) Kaiser's Rule (Eigenvalue $> 1$ Criterion):** When using a correlation matrix, each standardized variable has a variance of $1.0$. Kaiser's rule says: only keep factors whose eigenvalue (or Sum of Squared Loadings) is **greater than $1.0$**, because a factor with an eigenvalue less than $1$ explains less variance than a single original variable!
2. **(b) Scree Plot:** A line graph plotting the eigenvalues (on the vertical axis) against the factor number $1, 2, 3, \dots$ (on the horizontal axis). We look for the **"elbow"** (the point where the steep drop flattens out into a horizontal trickle of "scree" rubble) and keep the factors above/at the elbow.
3. **(c) Percentage (%) of Variance Explained:** We keep enough factors so that the cumulative percentage of total (or common) variance explained reaches a satisfactory threshold (such as $70\%$, $80\%$, or $90\%$).

Since all three methods are standard tools for choosing the number of factors, **(d) All of the above** is correct.

> **Correct Answer for MCQ 10:** **(d) All of the above**

---
---

# PART II: ESSAY QUESTIONS `[Total: 80 Marks]`

---

# Question 1 `[Total: 20 Marks]`

## Reference Setup from the Question

Let $X$ be $N_3(\mu, \Sigma)$ with:

$$
\mu = \begin{bmatrix} 2 \\ -3 \\ 1 \end{bmatrix} \quad \text{and} \quad \Sigma = \begin{bmatrix} 4 & 0 & -1 \\ 0 & 5 & 0 \\ -1 & 0 & 2 \end{bmatrix}
$$

### Beginner’s Foundation: Reading the Mean Vector $\mu$ and Covariance Matrix $\Sigma$

Let us first translate the given matrices into plain English so every number is crystal clear:
* $X = \begin{bmatrix} X_1 \\ X_2 \\ X_3 \end{bmatrix}$ is a column vector of **3 random variables** that jointly follow a **3-variate Normal Distribution ($N_3$)**.
* **The Mean Vector $\mu$** tells us the average value of each variable:
  * Mean of $X_1$: $\mu_1 = 2$
  * Mean of $X_2$: $\mu_2 = -3$
  * Mean of $X_3$: $\mu_3 = 1$
* **The Covariance Matrix $\Sigma$** is a $3 \times 3$ table showing variances on the main diagonal and covariances off the diagonal:

  | | Col 1 ($X_1$) | Col 2 ($X_2$) | Col 3 ($X_3$) |
  | :--- | :---: | :---: | :---: |
  | **Row 1 ($X_1$)** | $\sigma_{11} = 4$ | $\sigma_{12} = 0$ | $\sigma_{13} = -1$ |
  | **Row 2 ($X_2$)** | $\sigma_{21} = 0$ | $\sigma_{22} = 5$ | $\sigma_{23} = 0$ |
  | **Row 3 ($X_3$)** | $\sigma_{31} = -1$ | $\sigma_{32} = 0$ | $\sigma_{33} = 2$ |

  * **Variances (Main Diagonal):** $\text{Var}(X_1) = 4$, $\text{Var}(X_2) = 5$, $\text{Var}(X_3) = 2$.
  * **Covariances (Off-Diagonal):**
    * $\text{Cov}(X_1, X_2) = \sigma_{12} = 0$
    * $\text{Cov}(X_1, X_3) = \sigma_{13} = -1$
    * $\text{Cov}(X_2, X_3) = \sigma_{23} = 0$

---

## Part (a): Find the joint distribution of $X_1 - X_2$ and $X_2 - X_3$. `[4 marks]`

### Beginner’s Concept: Linear Transformations of Multivariate Normal Vectors

Whenever we build new variables by adding or subtracting our original normal variables $X_1, X_2, X_3$, we can write the new variables in matrix form as $Y = AX$, where $A$ is a matrix of multiplier weights.
A wonderful rule of the Multivariate Normal distribution states:
> **If $X \sim N_p(\mu, \Sigma)$ and $A$ is a $q \times p$ matrix of constants, then the new vector $AX$ follows a $q$-variate Normal distribution:**
> $$
> AX \sim N_q(A\mu, \, A\Sigma A')
> $$
> where $A'$ (the transpose of $A$) is obtained by turning the rows of $A$ into columns.

### Step-by-Step Calculation

#### Step 1: Write $\begin{bmatrix} X_1 - X_2 \\ X_2 - X_3 \end{bmatrix}$ in Matrix Form $AX$
Look at the weights of $X_1, X_2, X_3$ in each row:
* First expression: $X_1 - X_2 = (1)X_1 + (-1)X_2 + (0)X_3$
* Second expression: $X_2 - X_3 = (0)X_1 + (1)X_2 + (-1)X_3$

Putting these weights into a $2 \times 3$ matrix $A$:
$$
\begin{bmatrix} X_1 - X_2 \\ X_2 - X_3 \end{bmatrix} = \begin{bmatrix} 1 & -1 & 0 \\ 0 & 1 & -1 \end{bmatrix} \begin{bmatrix} X_1 \\ X_2 \\ X_3 \end{bmatrix} = AX
$$
So our transformation matrix $A$ and its transpose $A'$ (rows flipped into columns) are:
$$
A = \begin{bmatrix} 1 & -1 & 0 \\ 0 & 1 & -1 \end{bmatrix} \quad \text{and} \quad A' = \begin{bmatrix} 1 & 0 \\ -1 & 1 \\ 0 & -1 \end{bmatrix}
$$

#### Step 2: Calculate the New Mean Vector ($A\mu$)
Multiply the $2 \times 3$ matrix $A$ by the $3 \times 1$ mean vector $\mu = \begin{bmatrix} 2 \\ -3 \\ 1 \end{bmatrix}$:
$$
A\mu = \begin{bmatrix} 1 & -1 & 0 \\ 0 & 1 & -1 \end{bmatrix} \begin{bmatrix} 2 \\ -3 \\ 1 \end{bmatrix} = \begin{bmatrix} (1)(2) + (-1)(-3) + (0)(1) \\ (0)(2) + (1)(-3) + (-1)(1) \end{bmatrix} = \begin{bmatrix} 2 + 3 + 0 \\ 0 - 3 - 1 \end{bmatrix} = \begin{bmatrix} 5 \\ -4 \end{bmatrix}
$$

#### Step 3: Calculate the New Covariance Matrix ($A\Sigma A'$)
We do this matrix multiplication in two clear stages:

* **Stage 3A: Multiply $A$ ($2 \times 3$) by $\Sigma$ ($3 \times 3$):**
  $$
  A\Sigma = \begin{bmatrix} 1 & -1 & 0 \\ 0 & 1 & -1 \end{bmatrix} \begin{bmatrix} 4 & 0 & -1 \\ 0 & 5 & 0 \\ -1 & 0 & 2 \end{bmatrix}
  $$
  * **Row 1 of $A\Sigma$:**
    * Col 1: $(1)(4) + (-1)(0) + (0)(-1) = 4$
    * Col 2: $(1)(0) + (-1)(5) + (0)(0) = -5$
    * Col 3: $(1)(-1) + (-1)(0) + (0)(2) = -1$
  * **Row 2 of $A\Sigma$:**
    * Col 1: $(0)(4) + (1)(0) + (-1)(-1) = 1$
    * Col 2: $(0)(0) + (1)(5) + (-1)(0) = 5$
    * Col 3: $(0)(-1) + (1)(0) + (-1)(2) = -2$

  Thus:
  $$
  A\Sigma = \begin{bmatrix} 4 & -5 & -1 \\ 1 & 5 & -2 \end{bmatrix}
  $$

* **Stage 3B: Multiply $A\Sigma$ ($2 \times 3$) by $A'$ ($3 \times 2$):**
  $$
  A\Sigma A' = \begin{bmatrix} 4 & -5 & -1 \\ 1 & 5 & -2 \end{bmatrix} \begin{bmatrix} 1 & 0 \\ -1 & 1 \\ 0 & -1 \end{bmatrix}
  $$
  * **Row 1, Col 1:** $(4)(1) + (-5)(-1) + (-1)(0) = 4 + 5 + 0 = 9$
  * **Row 1, Col 2:** $(4)(0) + (-5)(1) + (-1)(-1) = 0 - 5 + 1 = -4$
  * **Row 2, Col 1:** $(1)(1) + (5)(-1) + (-2)(0) = 1 - 5 + 0 = -4$
  * **Row 2, Col 2:** $(1)(0) + (5)(1) + (-2)(-1) = 0 + 5 + 2 = 7$

  Thus:
  $$
  A\Sigma A' = \begin{bmatrix} 9 & -4 \\ -4 & 7 \end{bmatrix}
  $$

### Final Answer for Part (a)

The joint distribution of $X_1 - X_2$ and $X_2 - X_3$ is a bivariate normal distribution:
$$
\begin{bmatrix} X_1 - X_2 \\ X_2 - X_3 \end{bmatrix} \sim N_2\left( \begin{bmatrix} 5 \\ -4 \end{bmatrix}, \, \begin{bmatrix} 9 & -4 \\ -4 & 7 \end{bmatrix} \right)
$$

---

## Part (b): Find the distribution of $\begin{bmatrix} X_1 \\ X_3 \end{bmatrix}$. `[4 marks]`

### Beginner’s Concept: Marginal Distributions of a Subset of Variables

What if we only care about two of the variables—say, $X_1$ and $X_3$—and want to ignore $X_2$?
In multivariate normal theory, finding the distribution of a subset of variables (called a **marginal distribution**) requires **zero complicated math**: you simply rearrange the vector $X$, the mean vector $\mu$, and the covariance matrix $\Sigma$ so that the variables you want ($X_1$ and $X_3$) are grouped together at the top-left, and then read off their means, variances, and covariances directly!

### Step-by-Step Calculation

1. **Rearrange and Partition $X$, $\mu$, and $\Sigma$ so that $X_1$ and $X_3$ come first and $X_2$ comes last:**
   * Mean of $X_1$ is $\mu_1 = 2$, Mean of $X_3$ is $\mu_3 = 1$, Mean of $X_2$ is $\mu_2 = -3$.
   * Variances and Covariances:
     * $\sigma_{11} = 4$, $\sigma_{33} = 2$, and $\sigma_{13} = \sigma_{31} = -1$.
     * $\sigma_{12} = 0$, $\sigma_{32} = 0$, and $\sigma_{22} = 5$.

   Writing the rearranged and partitioned vector and matrices:
   $$
   X^* = \begin{bmatrix} X_1 \\ X_3 \\ \hline X_2 \end{bmatrix}, \quad \mu^* = \begin{bmatrix} 2 \\ 1 \\ \hline -3 \end{bmatrix}, \quad \Sigma^* = \begin{bmatrix} 4 & -1 & \vline & 0 \\ -1 & 2 & \vline & 0 \\ \hline 0 & 0 & \vline & 5 \end{bmatrix}
   $$

2. **Read off the top-left block corresponding to $\begin{bmatrix} X_1 \\ X_3 \end{bmatrix}$:**
   * Mean vector of $\begin{bmatrix} X_1 \\ X_3 \end{bmatrix}$ is $\begin{bmatrix} 2 \\ 1 \end{bmatrix}$.
   * Covariance matrix of $\begin{bmatrix} X_1 \\ X_3 \end{bmatrix}$ is $\begin{bmatrix} 4 & -1 \\ -1 & 2 \end{bmatrix}$.

### Final Answer for Part (b)

$$
\begin{bmatrix} X_1 \\ X_3 \end{bmatrix} \sim N_2\left( \begin{bmatrix} 2 \\ 1 \end{bmatrix}, \, \begin{bmatrix} 4 & -1 \\ -1 & 2 \end{bmatrix} \right)
$$

---

## Part (c): Find the distribution of $X_2$. `[2 marks]`

### Step-by-Step Explanation

From the bottom block of our partitioned matrices in Part (b) (or directly from the 2nd row of $\mu$ and the $(2,2)$ entry of $\Sigma$):
* The mean of $X_2$ is $\mu_2 = -3$.
* The variance of $X_2$ is $\sigma_{22} = 5$.

### Final Answer for Part (c)

$X_2$ follows a univariate normal distribution with mean $-3$ and variance $5$:
$$
X_2 \sim N(-3, \, 5)
$$

---

## Part (d): Which of the following random variables are independent? Explain.

*(Hint: Use your results from (a) – (c).)*

### Beginner’s Golden Rule of Independence (Repeated for Clarity)

For variables that follow a Multivariate Normal distribution, **two variables (or two sub-vectors of variables) are statistically independent IF AND ONLY IF their covariance (or cross-covariance matrix) is equal to zero ($0$)**.

Let us apply this rule to each sub-question!

### (d)(i) $X_1$ and $X_2$ `[2 marks]`

* **Step 1: Look at the covariance between $X_1$ and $X_2$ in the original covariance matrix $\Sigma$.**
  Row 1, Column 2 of $\Sigma$ gives:
  $$
  \text{Cov}(X_1, X_2) = \sigma_{12} = 0
  $$
* **Step 2: Conclude.**
  Because $(X_1, X_2)$ are jointly normally distributed and their covariance is $0$, they are statistically independent.
* **Final Answer for (d)(i):**
  **Yes, $X_1$ and $X_2$ ARE independent**, because $\text{Cov}(X_1, X_2) = 0$ and they are jointly normally distributed.

---

### (d)(ii) $X_1 - X_2$ and $X_2 - X_3$ `[2 marks]`

* **Step 1: Look at the joint covariance matrix of $\begin{bmatrix} X_1 - X_2 \\ X_2 - X_3 \end{bmatrix}$ that we calculated in Part (a).**
  In Part (a), we found that the covariance matrix of $\begin{bmatrix} X_1 - X_2 \\ X_2 - X_3 \end{bmatrix}$ is:
  $$
  A\Sigma A' = \begin{bmatrix} 9 & -4 \\ -4 & 7 \end{bmatrix}
  $$
  The off-diagonal number (Row 1, Column 2) is the covariance between $X_1 - X_2$ and $X_2 - X_3$:
  $$
  \text{Cov}(X_1 - X_2, \, X_2 - X_3) = -4
  $$
* **Step 2: Conclude.**
  Since $-4 \neq 0$, their covariance is not zero.
* **Final Answer for (d)(ii):**
  **No, $X_1 - X_2$ and $X_2 - X_3$ are NOT independent**, because from Part (a), $\text{Cov}(X_1 - X_2, \, X_2 - X_3) = -4 \neq 0$.

---

### (d)(iii) $\begin{bmatrix} X_1 \\ X_3 \end{bmatrix}$ and $X_2$ `[2 marks]`

* **Step 1: Look at the cross-covariance block between $\begin{bmatrix} X_1 \\ X_3 \end{bmatrix}$ and $X_2$ in the partitioned covariance matrix $\Sigma^*$ from Part (b).**
  In Part (b), when we partitioned $\Sigma^* = \begin{bmatrix} 4 & -1 & \vline & 0 \\ -1 & 2 & \vline & 0 \\ \hline 0 & 0 & \vline & 5 \end{bmatrix}$, the top-right off-diagonal block gives the covariances between $\begin{bmatrix} X_1 \\ X_3 \end{bmatrix}$ and $X_2$:
  $$
  \text{Cov}\left( \begin{bmatrix} X_1 \\ X_3 \end{bmatrix}, \, X_2 \right) = \begin{bmatrix} \text{Cov}(X_1, X_2) \\ \text{Cov}(X_3, X_2) \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix}
  $$
* **Step 2: Conclude.**
  Because every covariance between the vector $\begin{bmatrix} X_1 \\ X_3 \end{bmatrix}$ and $X_2$ is zero, and they are jointly multivariate normal, they are independent.
* **Final Answer for (d)(iii):**
  **Yes, $\begin{bmatrix} X_1 \\ X_3 \end{bmatrix}$ and $X_2$ ARE independent**, because $\text{Cov}\left(\begin{bmatrix} X_1 \\ X_3 \end{bmatrix}, X_2\right) = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$.

---

## Part (e): Let $X_1, X_2, \dots, X_{70}$ be a random sample of size 70 from the above three-variate normal distribution with $\mu$ and covariance $\Sigma$. Specify each of the following completely.

Here our sample size is $n = 70$ and the number of variables is $p = 3$.

### (e)(i) The distribution of $\bar{X}$ `[2 marks]`

* **Beginner’s Explanation:**
  As we learned in MCQ 3, the sample mean vector $\bar{X}$ of a random sample of size $n$ from an $N_p(\mu, \Sigma)$ population follows a Multivariate Normal distribution with the **same mean vector $\mu$**, and its covariance matrix is divided by the sample size $n$:
  $$
  \bar{X} \sim N_p\left(\mu, \, \frac{1}{n}\Sigma\right)
  $$
* **Final Answer for (e)(i):**
  Substituting $p = 3$ and $n = 70$:
  $$
  \bar{X} \sim N_3\left(\mu, \, \frac{1}{70}\Sigma\right) \quad \text{or explicitly} \quad \bar{X} \sim N_3\left( \begin{bmatrix} 2 \\ -3 \\ 1 \end{bmatrix}, \, \frac{1}{70}\begin{bmatrix} 4 & 0 & -1 \\ 0 & 5 & 0 \\ -1 & 0 & 2 \end{bmatrix} \right)
  $$

---

### (e)(ii) The approximated distribution of $(\bar{X} - \mu)' \left(\frac{S}{n}\right)^{-1} (\bar{X} - \mu)$ `[2 marks]`

* **Beginner’s Explanation:**
  The statistic $T^2 = (\bar{X} - \mu)' \left(\frac{S}{n}\right)^{-1} (\bar{X} - \mu)$ is **Hotelling’s $T^2$ statistic**.
  When the sample size $n$ is large (here $n = 70$ is large compared to $p = 3$), the sample covariance matrix $S$ converges to the true population covariance matrix $\Sigma$. As a result, the distribution of $(\bar{X} - \mu)' \left(\frac{S}{n}\right)^{-1} (\bar{X} - \mu)$ is **well approximated by a Chi-Square distribution with $p$ degrees of freedom ($\chi_p^2$)**!
  *(Note: Notice that the question specifically asks for the **"approximated distribution"**, which is $\chi_3^2$.)*

* **Final Answer for (e)(ii):**
  For $n = 70$ and $p = 3$, the approximated distribution is a **chi-square distribution with $3$ degrees of freedom**:
  $$
  (\bar{X} - \mu)' \left(\frac{S}{70}\right)^{-1} (\bar{X} - \mu) \stackrel{\text{approx}}{\sim} \chi_3^2
  $$

---
---

# Question 2 `[Total: 20 Marks]`

## Reference Setup from the Question

A firm selected a random sample of $n = 50$ salespeople and measured $7$ variables:
* **Variables to measure sales performance ($X_1, X_2, X_3$):**
  * $X_1 =$ Growth of sales
  * $X_2 =$ Profitability of sales
  * $X_3 =$ New account sales
* **Variables to evaluate the skills of salespeople ($X_4, X_5, X_6, X_7$):**
  * $X_4 =$ Creativity
  * $X_5 =$ Mechanical reasoning
  * $X_6 =$ Abstract reasoning
  * $X_7 =$ Mathematical ability

We are given two pieces of R output:
1. **The $7 \times 7$ Sample Correlation Matrix** for all seven variables ($X_1$ through $X_7$):
   ```
         X1    X2    X3    X4    X5    X6    X7
   X1 1.000 0.926 0.884 0.572 0.708 0.674 0.927
   X2 0.926 1.000 0.843 0.542 0.746 0.465 0.944
   X3 0.884 0.843 1.000 0.700 0.637 0.641 0.853
   X4 0.572 0.542 0.700 1.000 0.591 0.147 0.413
   X5 0.708 0.746 0.637 0.591 1.000 0.386 0.575
   X6 0.674 0.465 0.641 0.147 0.386 1.000 0.566
   X7 0.927 0.944 0.853 0.413 0.575 0.566 1.000
   ```
2. **PCA Output on the 3 Sales Performance Measures ($X_1, X_2, X_3$):**
   ```
   Rotation:
         PC1    PC2    PC3
   X1 -0.555 -0.003  0.832
   X2 -0.600  0.694 -0.398
   X3 -0.576 -0.720 -0.387

   Importance of components:
                              PC1   PC2   PC3
   Standard deviation     180.299 4.545 1.991
   Proportion of Variance   0.998 0.001 0.001
   ```

---

## Part (a): Briefly discuss how Principal Component Analysis (PCA) can be used to improve linear regression problems. `[3 marks]`

### Beginner’s Concept: What Goes Wrong in Linear Regression, and How Does PCA Fix It?

Suppose you want to predict a response variable $Y$ using $p$ predictor variables ($X_1, X_2, \dots, X_p$) in a standard linear regression model. Two big problems often occur when $p$ is large or when the predictors are strongly correlated with each other:
1. **Multicollinearity:** When predictor variables are highly correlated with each other, they carry redundant information. This makes the Ordinary Least Squares (OLS) regression coefficient estimates unstable, inflates their standard errors, and makes it impossible to tell which predictor is truly driving the response.
2. **Overfitting (Too Many Predictors):** Including all $p$ predictors in a regression model can fit random noise in the sample, leading to poor predictions on new data.

**How PCA Solves Both Problems (Principal Component Regression — PCR):**
1. **Step 1 (Generate Uncorrelated PCs):** Apply PCA to the $p$ original predictor variables to transform them into $p$ **orthogonal (completely uncorrelated)** Principal Components ($PC_1, PC_2, \dots, PC_p$).
2. **Step 2 (Dimension Reduction):** Retain only the first $k$ Principal Components ($k < p$) that explain most of the variance in the predictors, and discard the remaining $p - k$ components associated with tiny eigenvalues (which represent collinearity and noise).
3. **Step 3 (Fit OLS Regression on the $k$ PCs):** Fit the linear regression model using only these $k$ uncorrelated Principal Components as predictors instead of the original $p$ variables.
* **Why this improves regression:** Because the $k$ Principal Components are mutually orthogonal (uncorrelated), **multicollinearity is completely eliminated**, and using fewer predictors ($k < p$) **reduces overfitting** and improves predictive stability!

---

## Part (b): Calculate the variance of each of the Principal Component (PC). `[3 marks]`

### Beginner’s Explanation

In basic statistics, what is the relationship between **Standard Deviation ($\text{SD}$)** and **Variance**?
$$
\text{Variance} = (\text{Standard Deviation})^2
$$
In the R output table titled `Importance of components`, R gives us the `Standard deviation` of each Principal Component ($\sqrt{\lambda_i}$):
* $\text{SD}(\text{PC}_1) = 180.299$
* $\text{SD}(\text{PC}_2) = 4.545$
* $\text{SD}(\text{PC}_3) = 1.991$

To find the **variance** (which is also the eigenvalue $\lambda_i$) of each Principal Component, we simply **square** its standard deviation!

### Step-by-Step Calculation

* **Variance of $\text{PC}_1$ ($\lambda_1$):**
  $$
  \text{Var}(\text{PC}_1) = (180.299)^2 = 32507.7294
  $$
* **Variance of $\text{PC}_2$ ($\lambda_2$):**
  $$
  \text{Var}(\text{PC}_2) = (4.545)^2 = 20.6570
  $$
* **Variance of $\text{PC}_3$ ($\lambda_3$):**
  $$
  \text{Var}(\text{PC}_3) = (1.991)^2 = 3.9641 \quad (\text{or } 3.9640)
  $$

---

## Part (c): Sketch the scree plot and select the appropriate number of PCs that explain a substantial proportion of variation of the data. `[4 marks]`

### Beginner’s Explanation: What is a Scree Plot and How Do We Sketch It?

A **Scree Plot** is a simple line graph that helps us visually see how much variance each Principal Component explains:
* **Horizontal Axis ($x$-axis):** The Principal Component number ($1, 2, 3$).
* **Vertical Axis ($y$-axis):** The Variance (Eigenvalue $\lambda_i$)—or Proportion of Variance—of each Principal Component.
* **How to read it:** We look for the **"elbow"** (the sharp bend where the steep cliff drops off into a flat horizontal line). We retain the component(s) *before* the flat horizontal section.

### Scree Plot Sketch

```
Variance (Eigenvalue)
  ^
32508 +  * (PC1: Variance = 32507.73, Prop = 99.8%)
      |   \
25000 +    \
      |     \
15000 +      \
      |       \
 5000 +        \
      |         \
    0 +----------*-------------------*----------> Principal Component
                 2                   3
         (PC2: Var = 20.66)  (PC3: Var = 3.96)
           (Prop = 0.1%)       (Prop = 0.1%)
```

### Selection of Appropriate Number of PCs

Looking at the scree plot and the `Proportion of Variance` row:
* There is a dramatic, steep drop from **$\text{PC}_1$** ($\text{Variance} = 32507.73$, explaining **$99.8\%$** of the total variance) down to **$\text{PC}_2$** ($\text{Variance} = 20.66$, explaining only **$0.1\%$** of the variance), creating a sharp elbow at $\text{PC}_2$.
* Therefore, we select **only $1$ Principal Component ($\text{PC}_1$)**, as $\text{PC}_1$ alone explains almost all ($99.8\%$) of the variation in the sales performance data.

---

## Part (d): Calculate the cumulative proportion of the total variance explained by the three PCs. `[3 marks]`

### Beginner’s Explanation

"Cumulative proportion" means a **running total**—as we add one Principal Component at a time, how much of the total variance have we explained so far?
From the R output row `Proportion of Variance`:
* Proportion explained by $\text{PC}_1 = 0.998$
* Proportion explained by $\text{PC}_2 = 0.001$
* Proportion explained by $\text{PC}_3 = 0.001$

### Step-by-Step Calculation

* **Cumulative proportion explained by the 1st PC ($\text{PC}_1$):**
  $$
  0.998 \quad (\text{or } 99.8\%)
  $$
* **Cumulative proportion explained by the first 2 PCs ($\text{PC}_1$ and $\text{PC}_2$):**
  $$
  0.998 + 0.001 = 0.999 \quad (\text{or } 99.9\%)
  $$
* **Cumulative proportion explained by all 3 PCs ($\text{PC}_1$, $\text{PC}_2$, and $\text{PC}_3$):**
  $$
  0.998 + 0.001 + 0.001 = 1.000 \quad (\text{or } 100.0\%)
  $$

---

## Part (e): Write down the first PC as a linear combination of the variables on sales performance measures. `[2 marks]`

### Beginner’s Explanation

Where do we find the weights (loadings/eigenvectors) for each Principal Component in the R output?
Look at the table labeled `Rotation:`:
```
Rotation:
      PC1    PC2    PC3
X1 -0.555 -0.003  0.832
X2 -0.600  0.694 -0.398
X3 -0.576 -0.720 -0.387
```
The first column (`PC1`) gives the exact weights for $X_1$, $X_2$, and $X_3$ in the First Principal Component!

### Final Answer for Part (e)

$$
\text{PC}_1 = -0.555 X_1 - 0.600 X_2 - 0.576 X_3
$$
*(Note: If written using centered variables, $\text{PC}_1 = -0.555(X_1 - \bar{X}_1) - 0.600(X_2 - \bar{X}_2) - 0.576(X_3 - \bar{X}_3)$).*

---

## Part (f): Using the results from (c) – (e), justify the selection of the first PC to develop a composite index to measure the overall sales performance for the given sales values. `[2 marks]`

### Beginner’s Explanation: What is a "Composite Index"?

Instead of looking at three separate numbers for each salesperson ($X_1 =$ Growth, $X_2 =$ Profitability, $X_3 =$ New Accounts), the firm wants **one single overall score** (a **composite index**) to rank salespeople from best to worst.

### Justification Based on Parts (c) – (e)

1. **Captures Almost All Information (From Parts (c) & (d)):** $\text{PC}_1$ alone accounts for **$99.8\%$ ($0.998$)** of the total variance across all three sales performance variables. Reducing the three variables to $\text{PC}_1$ loses virtually zero information ($0.2\%$).
2. **Balanced Combination of All Sales Measures (From Part (e)):** In $\text{PC}_1 = -0.555 X_1 - 0.600 X_2 - 0.576 X_3$, all three sales performance measures ($X_1, X_2, X_3$) have loadings of the **same sign** and **nearly equal magnitude** (all around $-0.56$ to $-0.60$).
3. **Constructing the Index:** Because the weights are negative, multiplying $\text{PC}_1$ by $-1$ gives the composite index:
   $$
   \text{Sales Performance Index} = -\text{PC}_1 = 0.555 X_1 + 0.600 X_2 + 0.576 X_3
   $$
   where a higher positive score directly indicates stronger overall sales performance across Growth, Profitability, and New Accounts.

---

## Part (g): Briefly discuss the appropriateness in applying PCA to reduce the number of variables to evaluate the skills of salespeople: $X_4 - X_7$. `[3 marks]`

### Beginner’s Explanation: When is PCA Appropriate?

PCA works by combining correlated variables that share overlapping information.
* If variables are **completely uncorrelated** ($r \approx 0$), PCA is useless because each variable is already independent and cannot be compressed without losing information.
* If variables are **moderately or strongly correlated**, PCA is appropriate and effective because it can compress the overlapping variables into fewer components and remove multicollinearity.

### Step-by-Step Inspection of the Correlation Matrix for $X_4, X_5, X_6, X_7$

Let us look at the correlations among the four skill variables ($X_4 =$ Creativity, $X_5 =$ Mechanical reasoning, $X_6 =$ Abstract reasoning, $X_7 =$ Mathematical ability) from the given `Sample correlation matrix`:
* $\text{Corr}(X_4, X_5) = 0.591$ (moderate-to-strong correlation)
* $\text{Corr}(X_5, X_7) = 0.575$ (moderate-to-strong correlation)
* $\text{Corr}(X_6, X_7) = 0.566$ (moderate-to-strong correlation)
* $\text{Corr}(X_4, X_7) = 0.413$ and $\text{Corr}(X_5, X_6) = 0.386$ (moderate correlations; only $\text{Corr}(X_4, X_6) = 0.147$ is small).

### Final Conclusion for Part (g)

Because several pairs of skill variables—specifically **$X_4$ and $X_5$ ($0.591$)**, **$X_5$ and $X_7$ ($0.575$)**, and **$X_6$ and $X_7$ ($0.566$)**—are moderately correlated with one another, **applying PCA is appropriate and helpful** to reduce the dimensionality of the four skill variables ($X_4 - X_7$) into a smaller number of uncorrelated components and to eliminate multicollinearity in the data.

---
---

# Question 3 `[Total: 20 Marks]`

## Reference Setup from the Question

A U.S. Health Dataset contains the reported number of deaths in the 50 U.S. states for one year (1985), classified according to $7$ categories:
* $X_1 =$ Accident
* $X_2 =$ Cardiovascular
* $X_3 =$ Cancer
* $X_4 =$ Pulmonary (relating to the lungs)
* $X_5 =$ Pneumonia flu
* $X_6 =$ Diabetes
* $X_7 =$ Liver

The following R output shows a **Factor Analysis (FA)** using the Maximum Likelihood (`ml`) method with **Varimax rotation**:

```
Factor analysis using ml method with varimax rotation:
Standardized factor loadings:
     ML1   ML2   ML3   ML4 ML5 ML6 ML7
X1 -0.63 -0.10 -0.09  0.15   0   0   0
X2  0.74  0.60  0.09  0.07   0   0   0
X3  0.80  0.44  0.30  0.07   0   0   0
X4  0.14  0.51  0.30  0.15   0   0   0
X5  0.11  0.75 -0.13 -0.09   0   0   0
X6  0.79  0.03  0.12  0.15   0   0   0
X7  0.14  0.00  0.70  0.00   0   0   0

                       ML1  ML2  ML3  ML4  ML5  ML6  ML7
SS loadings           2.27 1.39 0.71 0.08 0.00 0.00 0.00
Proportion Explained  0.51 0.28 0.19 0.02 0.00 0.00 0.00
```

### Beginner’s Foundation: How to Read R’s Factor Analysis Output

1. **`ML1, ML2, ML3, ...`:** These are the extracted **Latent Factors** (named `ML` because they were extracted using the **M**aximum **L**ikelihood method).
2. **`Standardized factor loadings`:** Each number in the table (between $-1$ and $+1$) is the correlation between an observed variable ($X_1 \dots X_7$) and a factor (`ML1` $\dots$ `ML7`).
   * A **large positive or negative loading** (e.g., $0.80$ or $-0.63$) means that variable is strongly tied to that factor.
   * A **loading near $0$** (e.g., $0.03$ or $0.00$) means that variable has almost nothing to do with that factor.
3. **`SS loadings` (Sum of Squared Loadings):** This is the factor's eigenvalue (how much total standardized variance that factor explains across all $7$ variables). For example, for `ML1`, $(-0.63)^2 + 0.74^2 + 0.80^2 + 0.14^2 + 0.11^2 + 0.79^2 + 0.14^2 \approx 2.27$.
4. **`Proportion Explained`:** The fraction of the total explained common variance accounted for by each factor (`0.51` for `ML1`, `0.28` for `ML2`, `0.19` for `ML3`, `0.02` for `ML4`).

---

## Part (a): Calculate the cumulative proportion of the total variance explained by the first four factors. `[4 marks]`

### Step-by-Step Calculation

From the bottom row of the R output (`Proportion Explained`), the proportions explained by the first four factors are:
* $\text{ML1} = 0.51$
* $\text{ML2} = 0.28$
* $\text{ML3} = 0.19$
* $\text{ML4} = 0.02$

Adding these sequentially to get the **cumulative proportion** for each of the first four factors:
1. **First factor ($\text{ML1}$):**
   $$
   0.51 \quad (\text{or } 51\%)
   $$
2. **First two factors ($\text{ML1}$ and $\text{ML2}$):**
   $$
   0.51 + 0.28 = 0.79 \quad (\text{or } 79\%)
   $$
3. **First three factors ($\text{ML1}$, $\text{ML2}$, and $\text{ML3}$):**
   $$
   0.51 + 0.28 + 0.19 = 0.98 \quad (\text{or } 98\%)
   $$
4. **First four factors ($\text{ML1}$, $\text{ML2}$, $\text{ML3}$, and $\text{ML4}$):**
   $$
   0.51 + 0.28 + 0.19 + 0.02 = 1.00 \quad (\text{or } 100\%)
   $$

---

## Part (b): How many factors can you extract from the FA output and why? `[3 marks]`

### Step-by-Step Explanation and Justification

We should extract **three factors ($\text{ML1}$, $\text{ML2}$, and $\text{ML3}$)**.
**Why?**
1. **Cumulative Proportion of Variance Explained:** From Part (a), the first three factors ($\text{ML1}, \text{ML2}, \text{ML3}$) together explain **$98\%$ ($0.98$)**—almost all—of the common variance in the data, whereas $\text{ML4}$ explains only $2\%$ ($0.02$) and $\text{ML5}$–$\text{ML7}$ explain $0\%$.
2. **Meaningful Variable Loadings:** In Part (c), each of the first three factors has at least one variable loading strongly ($> 0.5$) on it (specifically, $X_7 =$ Liver loads strongly at $0.70$ on $\text{ML3}$), whereas $\text{ML4}$ has no loadings above $0.15$.

*(Teacher's Note: If a student also mentions Kaiser's rule where $\text{SS loadings} > 1$, $\text{ML1} = 2.27 > 1$ and $\text{ML2} = 1.39 > 1$ while $\text{ML3} = 0.71 < 1$, note that the official marking scheme specifically awards full marks for selecting **Three factors ($\text{ML1}, \text{ML2}, \text{ML3}$)** because they explain the greatest proportion ($98\%$) of the variation and accommodate the three-factor structure in Part (c) and Part (d)!)*

---

## Part (c): Using the standardized factor loadings of more than 0.5 and not loading on more than one factor, sketch the factor structure. Note that negative values of the factor loadings are also acceptable. `[6 marks]`

### Beginner’s Guide: How to Apply the Two Rules to Build a Factor Structure

The question gives us two strict rules for deciding which variable belongs to which factor:
* **Rule 1 (Magnitude Rule):** We only count a loading if its absolute value (ignoring the $+$ or $-$ sign) is **strictly greater than $0.5$** ($|\text{loading}| > 0.5$).
* **Rule 2 (No Cross-Loading Rule):** A variable must **NOT load ($> 0.5$) on more than one factor**. If a variable has loadings $> 0.5$ on two different factors at the same time (called *cross-loading*), we **exclude/drop** that variable from the clean factor structure!

Let us check all $7$ variables row by row against Rule 1 and Rule 2:

| Variable | Category | Loading on ML1 | Loading on ML2 | Loading on ML3 | Loadings with $|\text{loading}| > 0.5$ | Decision (Rule 1 & Rule 2) |
| :---: | :--- | :---: | :---: | :---: | :---: | :--- |
| **$X_1$** | Accident | **$-0.63$** | $-0.10$ | $-0.09$ | Only **ML1** ($|-0.63| = 0.63 > 0.5$) | **Assign to ML1** |
| **$X_2$** | Cardiovascular | **$0.74$** | **$0.60$** | $0.09$ | Both **ML1** ($0.74$) and **ML2** ($0.60$) | **Exclude!** (Loads $>0.5$ on more than one factor) |
| **$X_3$** | Cancer | **$0.80$** | $0.44$ | $0.30$ | Only **ML1** ($0.80 > 0.5$) | **Assign to ML1** |
| **$X_4$** | Pulmonary | $0.14$ | **$0.51$** | $0.30$ | Only **ML2** ($0.51 > 0.5$) | **Assign to ML2** |
| **$X_5$** | Pneumonia flu | $0.11$ | **$0.75$** | $-0.13$ | Only **ML2** ($0.75 > 0.5$) | **Assign to ML2** |
| **$X_6$** | Diabetes | **$0.79$** | $0.03$ | $0.12$ | Only **ML1** ($0.79 > 0.5$) | **Assign to ML1** |
| **$X_7$** | Liver | $0.14$ | $0.00$ | **$0.70$** | Only **ML3** ($0.70 > 0.5$) | **Assign to ML3** |

*(Look how important that step was for **$X_2$ (Cardiovascular)**: its loading on ML1 is $0.74 > 0.5$ AND its loading on ML2 is $0.60 > 0.5$. Because it loads $> 0.5$ on two factors, Rule 2 tells us not to include $X_2$! Meanwhile, for $X_3$ (Cancer), its loading on ML2 is $0.44 \le 0.5$, so $X_3$ only loads $> 0.5$ on ML1.)*

### Sketch of the Factor Structure Diagram

```
   +---------+          -0.63          +--------------------+
   |         | ----------------------> | X1: Accident       |
   |         |          0.80           +--------------------+
   |   ML1   | ----------------------> | X3: Cancer         |
   |         |          0.79           +--------------------+
   |         | ----------------------> | X6: Diabetes       |
   +---------+                         +--------------------+


   +---------+          0.51           +--------------------+
   |         | ----------------------> | X4: Pulmonary      |
   |   ML2   |          0.75           +--------------------+
   |         | ----------------------> | X5: Pneumonia flu  |
   +---------+                         +--------------------+


   +---------+          0.70           +--------------------+
   |   ML3   | ----------------------> | X7: Liver          |
   +---------+                         +--------------------+

   (Note: X2 [Cardiovascular] has loadings of 0.74 on ML1 and 0.60 on ML2;
    since it loads > 0.5 on more than one factor, it is omitted from the structure.)
```

---

## Part (d): Suggest names for each factor in order to communicate the characteristic/structure that the factors represent. `[3 marks]`

### Beginner’s Guide: How Do We Name Latent Factors?

To name a factor, we look at the specific variables that point to it in our diagram from Part (c) and ask: *"What medical/health theme do these causes of death have in common?"*

1. **Factor 1 (`ML1`) — Loads on $X_3$ (Cancer: $+0.80$), $X_6$ (Diabetes: $+0.79$), and $X_1$ (Accident: $-0.63$):**
   * Notice that Cancer and Diabetes are chronic, age-related/non-communicable illnesses (positive loadings), contrasted with Accidental deaths (negative loading, which occur more in younger populations).
   * **Suggested Name for `ML1`:** **Chronic / Age-Related Illnesses vs. Accidental Mortality** *(or **General Chronic / Degenerative Diseases**)*.
2. **Factor 2 (`ML2`) — Loads on $X_4$ (Pulmonary: $+0.51$) and $X_5$ (Pneumonia flu: $+0.75$):**
   * Both Pulmonary disease and Pneumonia/flu are illnesses of the lungs and breathing system.
   * **Suggested Name for `ML2`:** **Respiratory / Lung Diseases**.
3. **Factor 3 (`ML3`) — Loads on $X_7$ (Liver: $+0.70$):**
   * This factor exclusively captures liver-related mortality.
   * **Suggested Name for `ML3`:** **Hepatic / Liver Diseases** *(or **Alcohol/Liver-Related Mortality**)*.

---

## Part (e): Briefly discuss the differences between PCA and FA. `[4 marks]`

### Beginner’s Explanation & Complete Exam Answer

Although both **Principal Component Analysis (PCA)** and **Factor Analysis (FA)** are used to reduce the number of variables in a dataset, they are fundamentally different in their mathematical model and goal:

| Feature | Principal Component Analysis (PCA) | Factor Analysis (FA) |
| :--- | :--- | :--- |
| **1. Primary Goal** | Aims to explain the **total variance** (and variance-covariance structure) of the observed data by finding linear combinations (PCs) that maximize variance. | Aims to explain the **underlying latent structure (shared covariance/correlation)** among variables by identifying unobservable latent factors. |
| **2. Direction of the Model (Causal Structure)** | **No underlying causal model:** Principal components are simply combinations formed *from* the observed variables ($Y = e'X$). | **Model-based / Causal direction:** Assumes observed variables are generated *by* underlying latent factors plus unique error ($X - \mu = LF + \varepsilon$). |
| **3. Treatment of Variance** | Does **not** separate common variance from unique/error variance (decomposes $100\%$ of total variance). | Explicitly partitions each variable's variance into **common variance (communality $h_i^2$)** and **unique/specific error variance ($\psi_i$)**. |

---
---

# Question 4 `[Total: 20 Marks]`

## Reference Setup from the Question

Multivariate Multiple Linear Regression (MMLR) models were fitted to relate **three food texture scores (Responses $Y_1, Y_2, Y_3$)** to **five physio-chemical predictors ($X_1, X_2, X_3, X_4, X_5$)**:
* **Responses ($Y_k$):**
  * $Y_1 =$ Hardness
  * $Y_2 =$ Gumminess
  * $Y_3 =$ Chewiness
* **Predictors ($X_j$):**
  * $X_1 =$ Moisture
  * $X_2 =$ Amylase
  * $X_3 =$ Water Absorption
  * $X_4 =$ Swelling
  * $X_5 =$ Solids Content

Two MMLR models were fitted for $k = 1, 2, 3$:
* **Model 1 (Full Model with all 5 predictors):**
  $$
  E(Y_k) = \beta_{0k} + \beta_{1k}X_1 + \beta_{2k}X_2 + \beta_{3k}X_3 + \beta_{4k}X_4 + \beta_{5k}X_5
  $$
* **Model 2 (Reduced Model with only 2 predictors, $X_1$ and $X_2$):**
  $$
  E(Y_k) = \beta_{0k} + \beta_{1k}X_1 + \beta_{2k}X_2
  $$

### Beginner’s Foundation: How to Read R Regression Output & $p$-Values

Before answering Parts (a), (b), (c), and (d), let us learn how to read the R regression tables effortlessly:

1. **What is the Significance Level $\alpha = 5\%$ ($\alpha = 0.05$)?**
   $\alpha = 0.05$ is our cutoff threshold for deciding whether an effect is "real" (statistically significant) or just random chance:
   * **If $p\text{-value} < 0.05$:** We **reject $H_0$** $\implies$ The relationship/predictor **IS statistically significant**!
   * **If $p\text{-value} \ge 0.05$:** We **fail to reject $H_0$** $\implies$ The relationship/predictor is **NOT statistically significant**.
   *(Tip: In R output, scientific notation like `6.151e-05` means $6.151 \times 10^{-5} = 0.00006151$, which is much smaller than $0.05$! Also, R prints stars `*`, `**`, `***` next to any row whose $p\text{-value} < 0.05$!)*

2. **How do we test if there is an OVERALL relationship between the predictors and a response $Y_k$?**
   Look at the **very bottom line** of the R output for that response:
   `F-statistic: ... on 5 and 24 DF, p-value: ...`
   This tests $H_0: \beta_{1k} = \beta_{2k} = \beta_{3k} = \beta_{4k} = \beta_{5k} = 0$ (none of the predictors are related to $Y_k$) against $H_1:$ at least one predictor is related to $Y_k$. If this overall $p\text{-value} < 0.05$, then **yes, there is a significant relationship**!

3. **How do we check which INDIVIDUAL predictors are significant for $Y_k$?**
   Look at the `Pr(>|t|)` column (the individual $p$-value column) in the `Coefficients:` table for each predictor $X_1, X_2, X_3, X_4, X_5$. Any predictor with `Pr(>|t|) < 0.05` is statistically significant!

---

## Part (a): Use only the first response $Y_1$ to answer the following questions and $\alpha = 5\%$.

Let us look at the R output for `Response Y1:`:
```
Response Y1:
Coefficients:
              Estimate Std. Error t value Pr(>|t|)
(Intercept) -10495.060   4415.928  -2.377   0.0258 *
X1             402.449    235.203   1.711   0.1000 .
X2             227.385     38.285   5.939 3.96e-06 ***
X3              11.408      9.367   1.218   0.2351
X4              -1.996      7.945  -0.251   0.8038
X5              15.393     24.226   0.635   0.5312
Residual standard error: 424.7 on 24 degrees of freedom
Multiple R-squared: 0.6532, Adjusted R-squared: 0.581
F-statistic: 9.042 on 5 and 24 DF, p-value: 6.151e-05
```

### (a)(i) Is there a relationship between the predictors and the response? Justify your answer. `[1 mark]`

* **Step-by-Step Check:**
  Look at the bottom line of the `Response Y1` output:
  * Overall $F\text{-statistic} = 9.042$ on $5$ and $24$ degrees of freedom.
  * Overall $p\text{-value} = 6.151\text{e-}05 = 0.00006151$.
  Compare the $p$-value to $\alpha = 0.05$: since $0.00006151 < 0.05$, we reject the null hypothesis that all slope coefficients are zero.
* **Final Answer for (a)(i):**
  **Yes**, there is a statistically significant relationship between the predictors and the first response $Y_1$ (Hardness), because the overall $F$-test $p\text{-value} = 6.151 \times 10^{-5} < 0.05$.

---

### (a)(ii) Which predictors appear to have a significant relationship to the response? `[2 marks]`

* **Step-by-Step Check:**
  Let us check the `Pr(>|t|)` column for each predictor in the `Response Y1` table against $\alpha = 0.05$:
  * $X_1$: $p\text{-value} = 0.1000$ (not $< 0.05$, so NOT significant at $5\%$)
  * **$X_2$:** $p\text{-value} = 3.96 \times 10^{-6} = 0.00000396 < 0.05$ (**Significant!**)
  * $X_3$: $p\text{-value} = 0.2351 > 0.05$ (NOT significant)
  * $X_4$: $p\text{-value} = 0.8038 > 0.05$ (NOT significant)
  * $X_5$: $p\text{-value} = 0.5312 > 0.05$ (NOT significant)
  *(Note: The Intercept also has $p\text{-value} = 0.0258 < 0.05$.)*

* **Final Answer for (a)(ii):**
  **Only $X_2$ (Amylase)** appears to have a statistically significant relationship with $Y_1$ at the $\alpha = 5\%$ level (since its $p\text{-value} = 3.96 \times 10^{-6} < 0.05$).

---

### (a)(iii) Compute the predicted value for the response when $X_1 = 15$, $X_2 = 24$, $X_3 = 230$, $X_4 = 235$, and $X_5 = 10$. `[2 marks]`

* **Teacher’s Note on Two Ways Examiners Grade Prediction Questions:**
  In university courses, some marking schemes (including the official draft solution for this paper!) compute the prediction using **only the statistically significant terms** identified in (ii), while other textbooks plug all five numbers into the **full fitted equation**. To make sure you understand both and never lose a single mark, we show both calculations clearly below!

* **Method 1: Using Only the Significant Predictor ($X_2$) and Intercept (Official Marking Scheme Method):**
  Since only the Intercept ($-10495.060$) and $X_2$ ($227.385$) are significant at $\alpha = 5\%$, the simplified prediction equation is:
  $$
  \hat{Y}_1 = -10495.060 + 227.385 X_2
  $$
  Substitute $X_2 = 24$:
  $$
  \hat{Y}_1 = -10495.060 + 227.385(24) = -10495.060 + 5457.240 = -5037.82
  $$

* **Method 2: Using the Full Fitted Model 1 Equation (All 5 Predictors):**
  $$
  \hat{Y}_1 = -10495.060 + 402.449(15) + 227.385(24) + 11.408(230) - 1.996(235) + 15.393(10)
  $$
  $$
  \hat{Y}_1 = -10495.060 + 6036.735 + 5457.240 + 2623.840 - 469.060 + 153.930 = 3307.625
  $$

---

## Part (b): Repeat (a) using only the second response $Y_2$. `[5 marks]`

Let us look at the R output for `Response Y2:`:
```
Response Y2:
Coefficients:
             Estimate Std. Error t value Pr(>|t|)
(Intercept) -8534.728   2595.555  -3.288   0.0031 **
X1            324.992    138.245   2.351   0.0273 *
X2            141.141     22.503   6.272 1.75e-06 ***
X3              5.280      5.505   0.959   0.3471
X4              1.671      4.670   0.358   0.7236
X5             15.271     14.240   1.072   0.2942
Residual standard error: 249.6 on 24 degrees of freedom
Multiple R-squared: 0.6516, Adjusted R-squared: 0.5791
F-statistic: 8.979 on 5 and 24 DF, p-value: 6.475e-05
```

### (b)(i) Is there a relationship between the predictors and the response $Y_2$? Justify your answer. `[1 mark]`

* **Answer:** **Yes**, there is a statistically significant relationship between the predictors and $Y_2$ (Gumminess), because the overall $F$-statistic is $8.979$ with a $p\text{-value} = 6.475 \times 10^{-5} < 0.05$.

### (b)(ii) Which predictors appear to have a significant relationship to $Y_2$? `[2 marks]`

* **Step-by-Step Check of `Pr(>|t|)` against $\alpha = 0.05$:**
  * **$X_1$ (Moisture):** $p\text{-value} = 0.0273 < 0.05$ (**Significant!**)
  * **$X_2$ (Amylase):** $p\text{-value} = 1.75 \times 10^{-6} < 0.05$ (**Significant!**)
  * $X_3$: $p\text{-value} = 0.3471 > 0.05$ (Not significant)
  * $X_4$: $p\text{-value} = 0.7236 > 0.05$ (Not significant)
  * $X_5$: $p\text{-value} = 0.2942 > 0.05$ (Not significant)
* **Answer:** **Only $X_1$ (Moisture) and $X_2$ (Amylase)** have a statistically significant relationship with $Y_2$ at the $\alpha = 5\%$ level (along with the intercept, $p = 0.0031 < 0.05$).

### (b)(iii) Compute the predicted value for $Y_2$ when $X_1 = 15$, $X_2 = 24$, $X_3 = 230$, $X_4 = 235$, and $X_5 = 10$. `[2 marks]`

* **Method 1: Using Only the Significant Predictors ($X_1$ and $X_2$) and Intercept (Official Marking Scheme Method):**
  $$
  \hat{Y}_2 = -8534.728 + 324.992 X_1 + 141.141 X_2
  $$
  Substitute $X_1 = 15$ and $X_2 = 24$:
  $$
  \hat{Y}_2 = -8534.728 + 324.992(15) + 141.141(24)
  $$
  $$
  \hat{Y}_2 = -8534.728 + 4874.880 + 3387.384 = -272.464
  $$

* **Method 2: Using the Full Fitted Model 1 Equation (All 5 Predictors):**
  $$
  \hat{Y}_2 = -8534.728 + 324.992(15) + 141.141(24) + 5.280(230) + 1.671(235) + 15.271(10)
  $$
  $$
  \hat{Y}_2 = -272.464 + 1214.400 + 392.685 + 152.710 = 1487.331
  $$

---

## Part (c): Repeat (a) using only the third response $Y_3$. `[5 marks]`

Let us look at the R output for `Response Y3:`:
```
Response Y3:
Coefficients:
              Estimate Std. Error t value Pr(>|t|)
(Intercept) -7092.0228  2566.9409  -2.763 0.010822 *
X1            325.9379   136.7212   2.384 0.025385 *
X2             96.1867    22.2550   4.322 0.000233 ***
X3              3.3346     5.4448   0.612 0.545998
X4             -0.0744     4.6183  -0.016 0.987280
X5             17.2643    14.0826   1.226 0.232118
Residual standard error: 246.9 on 24 degrees of freedom
Multiple R-squared: 0.4692, Adjusted R-squared: 0.3586
F-statistic: 4.243 on 5 and 24 DF, p-value: 0.006619
```

### (c)(i) Is there a relationship between the predictors and the response $Y_3$? Justify your answer. `[1 mark]`

* **Answer:** **Yes**, there is a statistically significant relationship between the predictors and $Y_3$ (Chewiness), because the overall $F$-statistic is $4.243$ with a $p\text{-value} = 0.006619 < 0.05$.

### (c)(ii) Which predictors appear to have a significant relationship to $Y_3$? `[2 marks]`

* **Step-by-Step Check of `Pr(>|t|)` against $\alpha = 0.05$:**
  * **$X_1$ (Moisture):** $p\text{-value} = 0.025385 < 0.05$ (**Significant!**)
  * **$X_2$ (Amylase):** $p\text{-value} = 0.000233 < 0.05$ (**Significant!**)
  * $X_3$: $p\text{-value} = 0.545998 > 0.05$ (Not significant)
  * $X_4$: $p\text{-value} = 0.987280 > 0.05$ (Not significant)
  * $X_5$: $p\text{-value} = 0.232118 > 0.05$ (Not significant)
* **Answer:** **Only $X_1$ (Moisture) and $X_2$ (Amylase)** have a statistically significant relationship with $Y_3$ at the $\alpha = 5\%$ level (along with the intercept, $p = 0.010822 < 0.05$).

### (c)(iii) Compute the predicted value for $Y_3$ when $X_1 = 15$, $X_2 = 24$, $X_3 = 230$, $X_4 = 235$, and $X_5 = 10$. `[2 marks]`

* **Method 1: Using Only the Significant Predictors ($X_1$ and $X_2$) and Intercept (Official Marking Scheme Method):**
  $$
  \hat{Y}_3 = -7092.0228 + 325.9379 X_1 + 96.1867 X_2
  $$
  Substitute $X_1 = 15$ and $X_2 = 24$:
  $$
  \hat{Y}_3 = -7092.0228 + 325.9379(15) + 96.1867(24)
  $$
  $$
  \hat{Y}_3 = -7092.0228 + 4889.0685 + 2308.4808 = 105.5265
  $$

* **Method 2: Using the Full Fitted Model 1 Equation (All 5 Predictors):**
  $$
  \hat{Y}_3 = -7092.0228 + 325.9379(15) + 96.1867(24) + 3.3346(230) - 0.0744(235) + 17.2643(10)
  $$
  $$
  \hat{Y}_3 = 105.5265 + 766.9580 - 17.4840 + 172.6430 = 1027.6435
  $$

---

## Part (d): Test whether Model 2 fits as well as Model 1. `[2 marks]`

### Beginner’s Explanation: How Do We Compare a Reduced Model (Model 2) Against a Full Model (Model 1)?

Look at what we discovered in Parts (a), (b), and (c): across **all three responses ($Y_1, Y_2, Y_3$)**, predictors $X_3$, $X_4$, and $X_5$ were **never significant**! Only $X_1$ and $X_2$ mattered.
So the researcher asks: *"Can we drop $X_3, X_4, X_5$ from all three response equations simultaneously without losing predictive power?"*
* **Model 1 (Full Model):** Uses $X_1, X_2, X_3, X_4, X_5$ to predict $(Y_1, Y_2, Y_3)$.
* **Model 2 (Reduced Model):** Uses only $X_1, X_2$ to predict $(Y_1, Y_2, Y_3)$.

Let us look at the `Analysis of variance table:` at the bottom of the R output:
```
Analysis of variance table:
Model 1: cbind(Y1, Y2, Y3) ~ X1 + X2 + X3 + X4 + X5
Model 2: cbind(Y1, Y2, Y3) ~ X1 + X2
  Res.Df Df Gen.var.  Wilks approx F num Df den Df Pr(>F)
1     19       43803
2     22  3    51856 0.7145    1.689      6     28 0.6410
```

### Step-by-Step Hypothesis Test

1. **Hypotheses:**
   * **Null Hypothesis ($H_0$):** $\beta_{3k} = \beta_{4k} = \beta_{5k} = 0$ for all $k = 1, 2, 3$ (the extra predictors $X_3, X_4, X_5$ have zero effect across all three responses; **Model 2 fits as well as Model 1**).
   * **Alternative Hypothesis ($H_1$):** At least one $\beta_{jk} \neq 0$ for $j \in \{3, 4, 5\}$ (Model 1 fits significantly better than Model 2).
2. **Test Statistic and $p$-Value:**
   From the ANOVA comparison table, Wilks' Lambda is $\Lambda = 0.7145$, the approximate $F$-statistic is $F = 1.689$, and the **$p\text{-value} = 0.6410$**.
3. **Decision and Conclusion ($\alpha = 0.05$):**
   Since the $p\text{-value} = 0.6410 > 0.05$ (a very large $p$-value), we **fail to reject $H_0$**.
   This provides strong statistical evidence that **Model 2 (with only $X_1$ and $X_2$) fits the three texture responses just as well as the full Model 1** (so $X_3, X_4$, and $X_5$ can be safely removed from the model).

---

## Part (e): Briefly explain how MMLR supports data-driven decision making in business applications with an example. `[3 marks]`

### Beginner’s Explanation & Complete Exam Answer

1. **How MMLR Supports Data-Driven Decision Making in Business:**
   In real-world business problems, managers rarely make decisions to optimize just *one* isolated outcome; instead, business actions simultaneously impact **multiple interrelated Key Performance Indicators (KPIs)**.
   **Multivariate Multiple Linear Regression (MMLR)** supports data-driven decision making by:
   * Modeling **multiple correlated response variables ($Y_1, Y_2, \dots, Y_m$) simultaneously** using a common set of business predictors ($X_1, X_2, \dots, X_p$).
   * Accounting for the **covariance/correlation among the responses** so that joint hypothesis tests (such as Wilks' Lambda) can determine whether a business lever (predictor) has a statistically significant joint impact across all outcomes at once, while controlling the overall Type I (false positive) error rate.
   * Allowing managers to evaluate trade-offs and predict how changing operational inputs will simultaneously shift all target business metrics.

2. **Practical Business Example:**
   * **Food Manufacturing (from this question) / Product Development:** A bakery or food manufacturer can use MMLR to understand how ingredient settings—such as **Moisture ($X_1$)** and **Amylase enzyme level ($X_2$)**—simultaneously control three correlated product quality scores: **Hardness ($Y_1$)**, **Gumminess ($Y_2$)**, and **Chewiness ($Y_3$)**, enabling engineers to dial in the exact recipe that achieves optimal texture across all तीन dimensions while eliminating unnecessary additives ($X_3, X_4, X_5$).
   * **Marketing & Retail Management (Alternative Example):** A retail chain can use MMLR to model how **Advertising Spend ($X_1$)**, **Price Discount % ($X_2$)**, and **Store Staffing ($X_3$)** simultaneously affect **Total Sales Volume ($Y_1$)**, **Net Profit Margin ($Y_2$)**, and **Customer Repeat-Purchase Rate ($Y_3$)**, helping executives choose a pricing and promotion strategy that boosts sales without destroying profit margins.