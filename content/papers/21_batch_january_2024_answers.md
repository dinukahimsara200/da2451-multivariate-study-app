# 21 Batch | Final Examination | January 2024 | DA2451

## Multivariate Methods in Business — Master Beginner Teaching Guide & Complete Worked Solutions

# Question 1 `[Total: 20 Marks]`

## Reference Setup from the Question

Let $X = (X_1, X_2, X_3)'$ be $N_3(\mu, \Sigma)$ with:

$$
\mu = \begin{pmatrix} 2 \\ 1 \\ 2 \end{pmatrix} \quad \text{and} \quad \Sigma = \begin{pmatrix} 2 & 1 & 1 \\ 1 & 3 & 0 \\ 1 & 0 & 1 \end{pmatrix}
$$

### Beginner’s Foundation: Translating the Symbols into Plain English

Before we solve any part of Question 1, let us make sure you can read every number in $\mu$ and $\Sigma$ effortlessly, even if you have never studied statistics before:

1. **What is** $X = (X_1, X_2, X_3)'$**?**
   The prime symbol $'$ (called **transpose**) means we take the row $(X_1, X_2, X_3)$ and stand it up vertically as a **column vector**:

   $$
   X = \begin{pmatrix} X_1 \\ X_2 \\ X_3 \end{pmatrix}
   $$

   Think of $X_1, X_2, X_3$ as three measurements taken on the same object or person.

2. **What does** $N_3(\mu, \Sigma)$ **mean?**

   * $N$ stands for the **Normal Distribution** (the bell-shaped curve).

   * The subscript $3$ means there are $p = 3$ variables being measured together (**3-variate normal distribution**).

   * $\mu$ (pronounced *"mew"*) is the **Mean Vector**—it lists the average (expected value) of each variable in order:

     * Mean of $X_1$: $\mu_1 = 2$

     * Mean of $X_2$: $\mu_2 = 1$

     * Mean of $X_3$: $\mu_3 = 2$

3. **How do we read the Covariance Matrix** $\Sigma$ **(pronounced *"Sigma"*)?**
   $\Sigma$ is a $3 \times 3$ table showing how much each variable varies by itself (**variance**, on the main diagonal) and how much pairs of variables move together (**covariance**, off the main diagonal):

   |  | Col 1 ($X_1$) | Col 2 ($X_2$) | Col 3 ($X_3$) | 
   | ----- | ----- | ----- | ----- | 
   | **Row 1 (**$X_1$**)** | $\sigma_{11} = 2$ | $\sigma_{12} = 1$ | $\sigma_{13} = 1$ | 
   | **Row 2 (**$X_2$**)** | $\sigma_{21} = 1$ | $\sigma_{22} = 3$ | $\sigma_{23} = 0$ | 
   | **Row 3 (**$X_3$**)** | $\sigma_{31} = 1$ | $\sigma_{32} = 0$ | $\sigma_{33} = 1$ | 

   * **Variances (Main Diagonal):**

     * $\text{Var}(X_1) = \sigma_{11} = 2$

     * $\text{Var}(X_2) = \sigma_{22} = 3$

     * $\text{Var}(X_3) = \sigma_{33} = 1$

   * **Covariances (Off-Diagonal):**

     * $\text{Cov}(X_1, X_2) = \sigma_{12} = \sigma_{21} = 1$

     * $\text{Cov}(X_1, X_3) = \sigma_{13} = \sigma_{31} = 1$

     * $\text{Cov}(X_2, X_3) = \sigma_{23} = \sigma_{32} = 0$

## Part (a): Find the joint distribution of $X_1 + X_2 + X_3$ and $X_1 - X_2$. `[4 marks]`

### Beginner’s Concept: Linear Transformations of Multivariate Normal Variables ($AX$)

Whenever we create new variables by adding or subtracting our original normal variables $X_1, X_2, X_3$, we can write those new variables as a matrix product $Y = AX$, where $A$ is a table of multiplier weights.
A fundamental rule of Multivariate Normal distributions states:

> **If** $X \sim N_p(\mu, \Sigma)$ **and** $A$ **is a** $q \times p$ **matrix of constants, then the new vector** $AX$ **follows a** $q$**-variate Normal distribution:**
>
> \$$ > AX \\sim N_q(A\\mu, , A\\Sigma A') > $$
>
> where $A'$ is the **transpose** of $A$ (formed by turning the rows of $A$ into columns).

### Step-by-Step Calculation

#### Step 1: Write $\begin{pmatrix} X_1 + X_2 + X_3 \\ X_1 - X_2 \end{pmatrix}$ in Matrix Form $AX$

Let us look at the multiplier weights in front of $X_1, X_2, X_3$ in each expression:

* First expression: $X_1 + X_2 + X_3 = (1)X_1 + (1)X_2 + (1)X_3$

* Second expression: $X_1 - X_2 = (1)X_1 + (-1)X_2 + (0)X_3$

Stacking these weights into a $2 \times 3$ matrix $A$:

$$
\begin{pmatrix} X_1 + X_2 + X_3 \\ X_1 - X_2 \end{pmatrix} = \begin{pmatrix} 1 & 1 & 1 \\ 1 & -1 & 0 \end{pmatrix} \begin{pmatrix} X_1 \\ X_2 \\ X_3 \end{pmatrix} = AX
$$

So our matrix $A$ and its transpose $A'$ (rows turned into columns) are:

$$
A = \begin{pmatrix} 1 & 1 & 1 \\ 1 & -1 & 0 \end{pmatrix} \quad \text{and} \quad A' = \begin{pmatrix} 1 & 1 \\ 1 & -1 \\ 1 & 0 \end{pmatrix}
$$

#### Step 2: Calculate the New Mean Vector ($A\mu$)

Multiply the $2 \times 3$ matrix $A$ by the $3 \times 1$ mean vector $\mu = \begin{pmatrix} 2 \\ 1 \\ 2 \end{pmatrix}$:

$$
A\mu = \begin{pmatrix} 1 & 1 & 1 \\ 1 & -1 & 0 \end{pmatrix} \begin{pmatrix} 2 \\ 1 \\ 2 \end{pmatrix} = \begin{pmatrix} (1)(2) + (1)(1) + (1)(2) \\ (1)(2) + (-1)(1) + (0)(2) \end{pmatrix} = \begin{pmatrix} 2 + 1 + 2 \\ 2 - 1 + 0 \end{pmatrix} = \begin{pmatrix} 5 \\ 1 \end{pmatrix}
$$

#### Step 3: Calculate the New Covariance Matrix ($A\Sigma A'$)

We perform this multiplication in two easy stages:

* **Stage 3A: Multiply** $A$ **(**$2 \times 3$**) by** $\Sigma$ **(**$3 \times 3$**):**

  $$
  A\Sigma = \begin{pmatrix} 1 & 1 & 1 \\ 1 & -1 & 0 \end{pmatrix} \begin{pmatrix} 2 & 1 & 1 \\ 1 & 3 & 0 \\ 1 & 0 & 1 \end{pmatrix}
  $$

  * **Row 1 of** $A\Sigma$ **(adds all 3 rows of** $\Sigma$**):**

    * Col 1: $(1)(2) + (1)(1) + (1)(1) = 4$

    * Col 2: $(1)(1) + (1)(3) + (1)(0) = 4$

    * Col 3: $(1)(1) + (1)(0) + (1)(1) = 2$

  * **Row 2 of** $A\Sigma$ **(Row 1 minus Row 2 of** $\Sigma$**):**

    * Col 1: $(1)(2) + (-1)(1) + (0)(1) = 1$

    * Col 2: $(1)(1) + (-1)(3) + (0)(0) = -2$

    * Col 3: $(1)(1) + (-1)(0) + (0)(1) = 1$

  Thus:

  $$
  A\Sigma = \begin{pmatrix} 4 & 4 & 2 \\ 1 & -2 & 1 \end{pmatrix}
  $$

* **Stage 3B: Multiply** $A\Sigma$ **(**$2 \times 3$**) by** $A'$ **(**$3 \times 2$**):**

  $$
  A\Sigma A' = \begin{pmatrix} 4 & 4 & 2 \\ 1 & -2 & 1 \end{pmatrix} \begin{pmatrix} 1 & 1 \\ 1 & -1 \\ 1 & 0 \end{pmatrix}
  $$

  * **Row 1, Col 1:** $(4)(1) + (4)(1) + (2)(1) = 4 + 4 + 2 = 10$

  * **Row 1, Col 2:** $(4)(1) + (4)(-1) + (2)(0) = 4 - 4 + 0 = 0$

  * **Row 2, Col 1:** $(1)(1) + (-2)(1) + (1)(1) = 1 - 2 + 1 = 0$

  * **Row 2, Col 2:** $(1)(1) + (-2)(-1) + (1)(0) = 1 + 2 + 0 = 3$

  Thus:

  $$
  A\Sigma A' = \begin{pmatrix} 10 & 0 \\ 0 & 3 \end{pmatrix}
  $$

### Final Answer for Part (a)

The joint distribution of $X_1 + X_2 + X_3$ and $X_1 - X_2$ is a bivariate normal distribution:

$$
\begin{pmatrix} X_1 + X_2 + X_3 \\ X_1 - X_2 \end{pmatrix} \sim N_2\left( \begin{pmatrix} 5 \\ 1 \end{pmatrix}, \, \begin{pmatrix} 10 & 0 \\ 0 & 3 \end{pmatrix} \right)
$$

## Part (b): Find the distribution of $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$. `[4 marks]`

### Beginner’s Concept: Marginal Distribution of a Subset of Variables

When we want the distribution of just a subset of the original variables—here $X_1$ and $X_3$, ignoring $X_2$—we simply rearrange our vector $X$, our mean vector $\mu$, and our covariance matrix $\Sigma$ so that $X_1$ and $X_3$ sit together at the top-left, and then read off their means, variances, and covariance directly!

### Step-by-Step Calculation

1. **Rearrange and Partition** $X$**,** $\mu$**, and** $\Sigma$ **so that** $X_1$ **and** $X_3$ **come first and** $X_2$ **comes last:**

   * Means: $\mu_1 = 2$, $\mu_3 = 2$, and $\mu_2 = 1$.

   * Variances and Covariances:

     * For $(X_1, X_3)$: $\sigma_{11} = 2$, $\sigma_{33} = 1$, and $\sigma_{13} = \sigma_{31} = 1$.

     * Cross-covariances with $X_2$: $\sigma_{12} = 1$, $\sigma_{32} = 0$, and $\sigma_{22} = 3$.

   Writing the rearranged and partitioned matrices:

   $$
   X^* = \begin{pmatrix} X_1 \\ X_3 \\ \hline X_2 \end{pmatrix}, \quad \mu^* = \begin{pmatrix} 2 \\ 2 \\ \hline 1 \end{pmatrix}, \quad \Sigma^* = \begin{pmatrix} 2 & 1 & \vline & 1 \\ 1 & 1 & \vline & 0 \\ \hline 1 & 0 & \vline & 3 \end{pmatrix}
   $$

2. **Read off the top-left block corresponding to** $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$**:**

   * Mean vector: $\begin{pmatrix} 2 \\ 2 \end{pmatrix}$

   * Covariance matrix: $\begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}$

### Final Answer for Part (b)

$$
\begin{pmatrix} X_1 \\ X_3 \end{pmatrix} \sim N_2\left( \begin{pmatrix} 2 \\ 2 \end{pmatrix}, \, \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix} \right)
$$

## Part (c): Find the distribution of $X_2$. `[2 marks]`

### Step-by-Step Explanation

From the bottom block of the partitioned matrices in Part (b) (or directly from the 2nd entry of $\mu$ and the $(2,2)$ entry of $\Sigma$):

* Mean of $X_2$ is $\mu_2 = 1$.

* Variance of $X_2$ is $\sigma_{22} = 3$.

### Final Answer for Part (c)

$X_2$ follows a univariate normal distribution with mean $1$ and variance $3$:

$$
X_2 \sim N(1, \, 3)
$$

## Part (d): Which of the following random variables are independent? Explain.

*(Hint: Use your results from (a) to (c).)*

### Beginner’s Golden Rule of Independence (Repeated from Scratch)

For random variables that follow a Multivariate Normal distribution, **two variables (or two groups of variables) are statistically independent IF AND ONLY IF their covariance (or cross-covariance matrix) is equal to zero (**$0$**)**.

* If $\text{Cov} = 0 \implies$ **Independent**.

* If $\text{Cov} \neq 0 \implies$ **Not Independent**.

### (d)(i) $X_1$ and $X_2$ `[2 marks]`

* **Step 1: Look up** $\text{Cov}(X_1, X_2)$ **in the original covariance matrix** $\Sigma$**.**
  Row 1, Column 2 of $\Sigma$ is $\sigma_{12} = 1$.

* **Step 2: Check if it equals zero.**
  Since $1 \neq 0$, their covariance is not zero.

* **Final Answer for (d)(i):**
  **No,** $X_1$ **and** $X_2$ **are NOT independent**, because $\text{Cov}(X_1, X_2) = 1 \neq 0$.

### (d)(ii) $X_1 + X_2 + X_3$ and $X_1 - X_2$ `[2 marks]`

* **Step 1: Look at the joint covariance matrix of** $\begin{pmatrix} X_1 + X_2 + X_3 \\ X_1 - X_2 \end{pmatrix}$ **from Part (a).**
  In Part (a), we found that their covariance matrix is:

  $$
  A\Sigma A' = \begin{pmatrix} 10 & 0 \\ 0 & 3 \end{pmatrix}
  $$

  The off-diagonal entry (Row 1, Column 2) is the covariance between $X_1 + X_2 + X_3$ and $X_1 - X_2$:

  $$
  \text{Cov}(X_1 + X_2 + X_3, \, X_1 - X_2) = 0
  $$

* **Step 2: Check if it equals zero.**
  Their covariance is $0$, and since they are jointly normally distributed, they are independent!

* **Final Answer for (d)(ii):**
  **Yes,** $X_1 + X_2 + X_3$ **and** $X_1 - X_2$ **ARE independent**, because from Part (a) they are jointly bivariate normal and $\text{Cov}(X_1 + X_2 + X_3, \, X_1 - X_2) = 0$.

### (d)(iii) $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$ and $X_2$ `[2 marks]`

* **Step 1: Look at the cross-covariance block between** $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$ **and** $X_2$ **from Part (b).**
  In Part (b), our partitioned covariance matrix was:

  $$
  \Sigma^* = \begin{pmatrix} 2 & 1 & \vline & 1 \\ 1 & 1 & \vline & 0 \\ \hline 1 & 0 & \vline & 3 \end{pmatrix}
  $$

  The top-right cross-covariance block between $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$ and $X_2$ is:

  $$
  \text{Cov}\left( \begin{pmatrix} X_1 \\ X_3 \end{pmatrix}, \, X_2 \right) = \begin{pmatrix} \text{Cov}(X_1, X_2) \\ \text{Cov}(X_3, X_2) \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \end{pmatrix} \neq \begin{pmatrix} 0 \\ 0 \end{pmatrix}
  $$

* **Step 2: Check if all entries equal zero.**
  Although $\text{Cov}(X_3, X_2) = 0$, the first entry is $\text{Cov}(X_1, X_2) = 1 \neq 0$. For the vector $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$ to be independent of $X_2$, *all* entries of the cross-covariance vector must be $0$.

* **Final Answer for (d)(iii):**
  **No,** $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$ **and** $X_2$ **are NOT independent**, because $\text{Cov}\left(\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}, X_2\right) = \begin{pmatrix} 1 \\ 0 \end{pmatrix} \neq \begin{pmatrix} 0 \\ 0 \end{pmatrix}$.

## Part (e): Let $X_1, X_2, \dots, X_{60}$ be a random sample of size 60 from the above three-variate normal distribution with $\mu$ and covariance $\Sigma$. Specify each of the following completely.

Here we have a sample size of $n = 60$ from a $p = 3$ dimensional normal distribution $N_3(\mu, \Sigma)$.

### (e)(i) The distribution of $\bar{X}$ `[2 marks]`

* **Beginner’s Explanation:**
  The sample mean vector $\bar{X}$ of $n$ independent observations from $N_p(\mu, \Sigma)$ follows a Multivariate Normal distribution with mean vector $\mu$ and covariance matrix $\frac{1}{n}\Sigma$:

  $$
  \bar{X} \sim N_p\left(\mu, \, \frac{1}{n}\Sigma\right)
  $$

* **Final Answer for (e)(i):**
  Substituting $p = 3$ and $n = 60$:

  $$
  \bar{X} \sim N_3\left(\mu, \, \frac{1}{60}\Sigma\right) \quad \text{or explicitly} \quad \bar{X} \sim N_3\left( \begin{pmatrix} 2 \\ 1 \\ 2 \end{pmatrix}, \, \frac{1}{60}\begin{pmatrix} 2 & 1 & 1 \\ 1 & 3 & 0 \\ 1 & 0 & 1 \end{pmatrix} \right)
  $$

### (e)(ii) The distribution of $(\bar{X} - \mu)' \left(\frac{\Sigma}{60}\right)^{-1} (\bar{X} - \mu)$ `[2 marks]`

* **Beginner’s Explanation:**
  Because $\bar{X} \sim N_3\left(\mu, \frac{\Sigma}{60}\right)$ and the true population covariance matrix $\Sigma$ is **known**, the quadratic form $(\bar{X} - \mu)' \left(\frac{\Sigma}{60}\right)^{-1} (\bar{X} - \mu)$ is the squared Mahalanobis distance of $\bar{X}$ from $\mu$. It is the sum of $p = 3$ independent squared standard normal variables, so it follows an **exact Chi-Square distribution with** $p = 3$ **degrees of freedom (**$\chi_3^2$**)**.

* **Final Answer for (e)(ii):**

  $$
  (\bar{X} - \mu)' \left(\frac{\Sigma}{60}\right)^{-1} (\bar{X} - \mu) \sim \chi_3^2
  $$

  (A chi-square distribution with $3$ degrees of freedom).

# Question 2 `[Total: 20 Marks]`

## Reference Setup from the Question

In a study of the cost of transporting milk from farms to dairy plants, cost data on **three variables (**$p = 3$**)**:

* $X_1 =$ fuel cost (per mile)

* $X_2 =$ repair cost (per mile)

* $X_3 =$ capital cost (per mile)

were collected for two independent groups of trucks:

* **Group 1 (Gasoline trucks):** $n_1 = 34$ trucks (rows `1:34` in the dataset)

* **Group 2 (Diesel trucks):** $n_2 = 23$ trucks (the remaining rows `-c(1:34)` in the dataset)

The following partial R output was produced:

```
HotellingsT2(data[1:34, 1:3], data[-c(1:34), 1:3], test="chi")
T.2 = 48.748, df = ???, p-value < 0.000

mult.norm(data[1:34, 1:3])$mult.test
          Beta-hat     kappa     p-val
Skewness 0.8456908  5.074145 0.8861703
Kurtosis 12.7878595 -1.211639 0.2256505

mult.norm(data[-c(1:34), 1:3])$mult.test
          Beta-hat      kappa     p-val
Skewness  1.351133  4.7289643 0.9085327
Kurtosis 12.670725 -0.9744056 0.3298552

boxM(data[, 1:3], data[, 4])
Chi-Sq (approx.) = 21.162, df = 6, p-value = 0.1715

```

### Beginner’s Foundation: What Are These Three R Functions Doing?

Let us understand the big picture in plain English before answering any sub-questions:

1. **Why can't we just use a regular two-sample** $t$**-test?**
   A regular two-sample $t$-test compares the averages of two groups on **only 1 variable** at a time. Here, each truck has **3 correlated cost variables** ($X_1 =$ fuel, $X_2 =$ repair, $X_3 =$ capital). If we ran three separate $t$-tests, we would ignore the correlations between fuel, repair, and capital costs and inflate our chance of a false alarm (Type I error).
   Instead, we use **Two-Sample Hotelling’s** $T^2$ **Test** (`HotellingsT2`), which is the multivariate big brother of the two-sample $t$-test! It tests whether the entire $3 \times 1$ mean cost vector of gasoline trucks ($\mu_1$) equals the $3 \times 1$ mean cost vector of diesel trucks ($\mu_2$).

2. **What does `mult.norm(...)` do?**
   Hotelling's $T^2$ test assumes that the data in Group 1 (gasoline trucks) and Group 2 (diesel trucks) follow a **Multivariate Normal distribution**. The function `mult.norm()` runs **Mardia’s Multivariate Normality Test**, which checks whether the 3-dimensional bell curve is lopsided (**Skewness**) or too flat/pointy (**Kurtosis**).

   * If the $p$-values (`p-val`) for both Skewness and Kurtosis are **greater than** $0.05$, the data looks like a normal bell curve (normality holds!).

3. **What does `boxM(...)` do?**
   Hotelling's $T^2$ test also assumes that Group 1 and Group 2 have the **same population covariance matrix** ($\Sigma_1 = \Sigma_2$). The function `boxM()` runs **Box’s M-test** for homogeneity (equality) of covariance matrices.

   * If its `p-value` is **greater than** $0.05$, the covariance matrices are not significantly different (equality of covariance matrices holds!).

## Part (a): Test if there is evidence of a difference between the mean cost vectors of the two types of trucks.

### (a)(i) State $H_0$ and $H_1$. `[2 marks]`

* **Beginner’s Explanation:**
  Let $\mu_1 = \begin{pmatrix} \mu_{11} \\ \mu_{12} \\ \mu_{13} \end{pmatrix}$ be the true population mean cost vector (fuel, repair, capital) for **gasoline trucks**, and let $\mu_2 = \begin{pmatrix} \mu_{21} \\ \mu_{22} \\ \mu_{23} \end{pmatrix}$ be the true population mean cost vector for **diesel trucks**.

  * The **Null Hypothesis (**$H_0$**)** always states that there is **no difference** between the two groups.

  * The **Alternative Hypothesis (**$H_1$**)** states that there **is a difference** between the two groups (on at least one cost variable).

* **Final Answer for (a)(i):**

  $$
  H_0: \mu_1 = \mu_2 \quad (\text{or } \mu_1 - \mu_2 = 0) \quad \text{vs.} \quad H_1: \mu_1 \neq \mu_2 \quad (\text{or } \mu_1 - \mu_2 \neq 0)
  $$

### (a)(ii) What is the approximated distribution of Hotelling's $T^2$-statistic? Clearly, specify the parameter(s) of the approximated distribution. `[2 marks]`

* **Beginner’s Explanation:**
  Look at the R command: `HotellingsT2(..., test="chi")`. The option `test="chi"` tells R to use the large-sample **Chi-Square (**$\chi^2$**) approximation** for Hotelling's $T^2$ statistic.
  Under $H_0$, what is the parameter (degrees of freedom, `df`) of this Chi-Square distribution? It is always equal to $p$, the **number of variables being compared**! Since we are comparing $p = 3$ cost variables ($X_1 =$ fuel, $X_2 =$ repair, $X_3 =$ capital), the degrees of freedom parameter is $df = p = 3$.

* **Final Answer for (a)(ii):**
  The approximated distribution of Hotelling's $T^2$-statistic is a **Chi-square distribution with** $df = 3$ **degrees of freedom** (written as $\chi_3^2$).

### (a)(iii) Do you reject $H_0$ at the 5% level of significance? State your conclusion. `[3 marks]`

* **Beginner’s Decision Rule:**
  Compare the $p$-value from `HotellingsT2` against our significance level $\alpha = 0.05$ ($5\%$):

  * From the R output, $T^2 = 48.748$ and `p-value < 0.000` (meaning the $p$-value is less than $0.0005$).

  * Since $\text{p-value} < 0.000 < 0.05$, the $p$-value is smaller than $\alpha = 0.05$, so we **reject** $H_0$.

* **Final Answer for (a)(iii):**
  Since $\text{p-value} < 0.000 < 0.05$, we **reject** $H_0$ at the $5\%$ level of significance and conclude that there is strong statistical evidence of a **significant difference between the mean cost vectors (fuel, repair, and capital costs) of gasoline trucks and diesel trucks**.

## Part (b): What assumption(s) do you need to make about the two populations in order to perform the test in (a)? `[3 marks]`

### Beginner’s Explanation & Complete Exam Answer

To validly perform the two-sample Hotelling's $T^2$ test in Part (a), we must make **three assumptions** about the two populations (gasoline trucks and diesel trucks):

1. **Independence:** The random sample of observations from Population 1 (gasoline trucks) is independent of the random sample of observations from Population 2 (diesel trucks), and observations within each sample are mutually independent.

2. **Multivariate Normality:** Both populations follow a multivariate (3-variate) normal distribution—that is, Population 1 follows $N_3(\mu_1, \Sigma_1)$ and Population 2 follows $N_3(\mu_2, \Sigma_2)$.

3. **Homogeneity (Equality) of Covariance Matrices:** Both populations have the **same (common) variance-covariance matrix**:

   $$
   \Sigma_1 = \Sigma_2 = \Sigma
   $$

## Part (c): Comment on the validity of the assumption(s) mentioned in (b) by conducting appropriate test(s). For each test:

* **(i) State** $H_0$ **and** $H_1$**. `[4 marks]`**

* **(ii) Using the results from R output, do you reject** $H_0$ **at the 5% level of significance? State your conclusion. `[6 marks]`**

### Beginner’s Guide: Which Tests Check Our Assumptions?

We have R outputs for **two types of assumption tests**:

1. **Mardia's Multivariate Normality Test (`mult.norm`)**—conducted separately on Population 1 (gasoline trucks, rows `1:34`) and Population 2 (diesel trucks, rows `-c(1:34)`), checking both Skewness and Kurtosis.

2. **Box's M-Test (`boxM`)**—conducted to test whether Population 1 and Population 2 have equal covariance matrices ($\Sigma_1 = \Sigma_2$).

Let us write out **(i) the hypotheses** and **(ii) the decisions and conclusions** clearly for each test!

### (c)(i) State $H_0$ and $H_1$ for each test. `[4 marks]`

1. Test 1: Multivariate Normality Tests (for Population 1 

   $$
   Gasoline trucks, $i=1$
   $$

    and Population 2 

   $$
   Diesel trucks, $i=2$
   $$

   ):

   * $H_0$**:** Population $i$ ($i = 1, 2$) follows a 3-variate normal distribution (i.e., multivariate skewness $= 0$ and multivariate kurtosis matches the normal distribution).

   * $H_1$**:** Population $i$ ($i = 1, 2$) does **not** follow a 3-variate normal distribution.

2. **Test 2: Box’s M-Test for Homogeneity of Covariance Matrices:**

   * $H_0: \Sigma_1 = \Sigma_2 = \Sigma$ (the population covariance matrices of gasoline trucks and diesel trucks are equal).

   * $H_1: \Sigma_1 \neq \Sigma_2$ (the population covariance matrices of gasoline trucks and diesel trucks are not equal).

### (c)(ii) Using the results from R output, do you reject $H_0$ at the 5% level of significance? State your conclusion. `[6 marks]`

1. **Evaluating Multivariate Normality for Population 1 (Gasoline Trucks, `data[1:34, 1:3]`):**

   * From `mult.norm(data[1:34, 1:3])$mult.test`:

     * Skewness test: $\hat{\beta} = 0.8457, \kappa = 5.0741$, $\text{p-val} = 0.8861703 > 0.05$.

     * Kurtosis test: $\hat{\beta} = 12.7879, \kappa = -1.2116$, $\text{p-val} = 0.2256505 > 0.05$.

   * **Decision & Conclusion:** Since both $p$-values ($0.8862$ and $0.2257$) are **greater than** $\alpha = 0.05$, we **do not reject** $H_0$ at the $5\%$ significance level. We conclude that the **multivariate normality assumption is valid for gasoline trucks**.

2. **Evaluating Multivariate Normality for Population 2 (Diesel Trucks, `data[-c(1:34), 1:3]`):**

   * From `mult.norm(data[-c(1:34), 1:3])$mult.test`:

     * Skewness test: $\hat{\beta} = 1.3511, \kappa = 4.7290$, $\text{p-val} = 0.9085327 > 0.05$.

     * Kurtosis test: $\hat{\beta} = 12.6707, \kappa = -0.9744$, $\text{p-val} = 0.3298552 > 0.05$.

   * **Decision & Conclusion:** Since both $p$-values ($0.9085$ and $0.3299$) are **greater than** $\alpha = 0.05$, we **do not reject** $H_0$ at the $5\%$ significance level. We conclude that the **multivariate normality assumption is valid for diesel trucks**.

3. **Evaluating Equality of Covariance Matrices (Box’s M-Test, `boxM`):**

   * From `boxM(data[, 1:3], data[, 4])`:

     * $\text{Chi-Sq (approx.)} = 21.162, \, df = 6, \, \text{p-value} = 0.1715 > 0.05$.

   * **Decision & Conclusion:** Since $\text{p-value} = 0.1715 > 0.05$, we **do not reject** $H_0$ at the $5\%$ significance level. We conclude that **there is no significant difference between the two covariance matrices, so the assumption of equal covariance matrices (**$\Sigma_1 = \Sigma_2$**) is valid**.

* **Overall Summary Comment:** Because both populations satisfy multivariate normality and share a common covariance matrix, all distributional assumptions required for the Hotelling's $T^2$ test in Part (a) are **fully satisfied**.

# Context for Question 3 and Question 4: The Food-Texture Dataset

A food manufacturer making a pastry product measured **five quality attributes (**$p = 5$**)** on batches of pastry:

* **Oil:** percentage oil in the pastry

* **Density:** the product's density (higher number $=$ more dense)

* **Crispy:** crispiness measurement on a scale from 7 to 15 (15 $=$ more crispy)

* **Fracture:** angle, in degrees, through which the pastry can be slowly bent before it fractures

* **Hardness:** force required with a sharp point before breakage occurs

The following partial R output was produced:

```
Sample correlation matrix:
            Oil Density Crispy Fracture Hardness
Oil       1.000  -0.750  0.593   -0.534   -0.096
Density  -0.750   1.000 -0.671    0.572    0.108
Crispy    0.593  -0.671  1.000   -0.844    0.411
Fracture -0.534   0.572 -0.844    1.000   -0.373
Hardness -0.096   0.108  0.411   -0.373    1.000

Importance of components:
                          PC1   PC2   PC3   PC4   PC5
Standard deviation      1.741 1.138 0.557 0.492 0.348
Proportion of Variance  0.606 0.259 0.062 0.048 0.024

Factor analysis using ml method with varimax rotation:
Standardized loadings:
           ML1   ML2 ML3 ML5 ML4
Oil      -0.82 -0.04   0   0   0
Density   0.87  0.01   0   0   0
Crispy   -0.75  0.55   0   0   0
Fracture  0.67 -0.56   0   0   0
Hardness  0.06  0.74   0   0   0

                       ML1  ML2  ML3  ML5  ML4
SS loadings           2.44 1.17 0.00 0.00 0.00
Proportion Explained  0.68 0.32 0.00 0.00 0.00

```

# Question 3 `[Total: 20 Marks]`

## Part (a): Briefly explain the purpose of principal components analysis (PCA). `[2 marks]`

### Beginner’s Explanation & Complete Exam Answer

The primary purpose of **Principal Component Analysis (PCA)** is **dimensionality reduction**: it transforms a large set of correlated variables into a smaller set of new, uncorrelated (orthogonal) linear combinations—called **Principal Components (PCs)**—that retain and explain the maximum possible proportion of the variance-covariance structure present in the original data. This simplifies data visualization, interpretation, and subsequent statistical modeling without losing significant information.

## Part (b): Do you see any multicollinearity in the food-texture data? Justify your answer. `[3 marks]`

### Beginner’s Concept: What is Multicollinearity and How Do We Spot It in a Correlation Matrix?

**Multicollinearity** means that two or more variables in a dataset are **strongly correlated with each other** (either positively, near $+1.0$, or negatively, near $-1.0$), meaning they carry redundant, overlapping information.
Let us look at the off-diagonal numbers in the `Sample correlation matrix:` for the food-texture data:

* $\text{Corr}(\text{Crispy}, \text{Fracture}) = -0.844$ (very strong negative correlation!)

* $\text{Corr}(\text{Oil}, \text{Density}) = -0.750$ (strong negative correlation!)

* $\text{Corr}(\text{Density}, \text{Crispy}) = -0.671$ (strong negative correlation!)

* $\text{Corr}(\text{Oil}, \text{Crispy}) = 0.593$, $\text{Corr}(\text{Density}, \text{Fracture}) = 0.572$, and $\text{Corr}(\text{Oil}, \text{Fracture}) = -0.534$ (moderate-to-strong correlations).

### Final Answer for Part (b)

**Yes**, there is clear evidence of multicollinearity in the food-texture data. Examining the sample correlation matrix, several pairs of attributes exhibit strong linear correlations—most notably **Crispy and Fracture (**$r = -0.844$**)**, **Oil and Density (**$r = -0.750$**)**, and **Density and Crispy (**$r = -0.671$**)**, as well as moderate correlations between **Oil and Crispy (**$r = 0.593$**)**, **Density and Fracture (**$r = 0.572$**)**, and **Oil and Fracture (**$r = -0.534$**)**.

## Part (c): Briefly explain how PCA handles the issue of multicollinearity in a data set. `[3 marks]`

### Beginner’s Explanation & Complete Exam Answer

PCA resolves the issue of multicollinearity in two ways:

1. **Orthogonal Transformation:** PCA uses the orthogonal eigenvectors of the covariance/correlation matrix to construct new variables (Principal Components) that are **mutually orthogonal (perpendicular) and completely uncorrelated with one another** ($\text{Cov}(\text{PC}_i, \text{PC}_j) = 0$ for all $i \neq j$).

2. **Dropping Redundant Dimensions:** When original variables are collinear, the redundant/overlapping dimensions correspond to the last few Principal Components with very small (near-zero) eigenvalues. By retaining only the first few Principal Components with large eigenvalues and discarding the components with small eigenvalues, PCA removes the collinear redundancy while preserving the essential variation in the data.

## Part (d): Calculate the variance of each of the first three principal components (PCs). `[3 marks]`

### Beginner’s Explanation

In the R table `Importance of components:`, the first row lists the **`Standard deviation`** of each Principal Component:

* $\text{SD}(\text{PC}_1) = 1.741$

* $\text{SD}(\text{PC}_2) = 1.138$

* $\text{SD}(\text{PC}_3) = 0.557$

Since $\text{Variance} = (\text{Standard Deviation})^2$, we square each number to get the variance (eigenvalue $\lambda_i$) of each of the first three PCs!

### Step-by-Step Calculation

* **Variance of** $\text{PC}_1$ **(**$\lambda_1$**):**

  $$
  \text{Var}(\text{PC}_1) = (1.741)^2 = 3.031081 \approx 3.0311
  $$

* **Variance of** $\text{PC}_2$ **(**$\lambda_2$**):**

  $$
  \text{Var}(\text{PC}_2) = (1.138)^2 = 1.295044 \approx 1.2950
  $$

* **Variance of** $\text{PC}_3$ **(**$\lambda_3$**):**

  $$
  \text{Var}(\text{PC}_3) = (0.557)^2 = 0.310249 \approx 0.3102
  $$

## Part (e): Calculate the cumulative proportion of the total variance explained by each of the first three PCs. `[3 marks]`

### Step-by-Step Calculation

From the `Proportion of Variance` row in the `Importance of components:` table:

* Proportion of variance explained by $\text{PC}_1 = 0.606$

* Proportion of variance explained by $\text{PC}_2 = 0.259$

* Proportion of variance explained by $\text{PC}_3 = 0.062$

Adding these sequentially to obtain the cumulative proportion for each of the first three PCs:

1. **Cumulative proportion explained by the 1st PC (**$\text{PC}_1$**):**

   $$
   0.606 \quad (\text{or } 60.6\%)
   $$

2. **Cumulative proportion explained by the first 2 PCs (**$\text{PC}_1$ **and** $\text{PC}_2$**):**

   $$
   0.606 + 0.259 = 0.865 \quad (\text{or } 86.5\%)
   $$

3. **Cumulative proportion explained by the first 3 PCs (**$\text{PC}_1$**,** $\text{PC}_2$**, and** $\text{PC}_3$**):**

   $$
   0.606 + 0.259 + 0.062 = 0.927 \quad (\text{or } 92.7\%)
   $$

## Part (f): Using the results from (d) and (e), determine the number of PCs to effectively summarize the total variability of the food-texture data. `[2 marks]`

### Step-by-Step Justification

We should retain **two principal components (**$\text{PC}_1$ **and** $\text{PC}_2$**)** to summarize the food-texture data:

1. **From Part (d) — Kaiser's Criterion (**$\text{Variance / Eigenvalue} > 1$**):** Since PCA was performed on standardized variables (correlation matrix), each original variable has a variance of $1.0$. Only the first two PCs have variances greater than $1.0$ ($\text{Var}(\text{PC}_1) = 3.0311 > 1$ and $\text{Var}(\text{PC}_2) = 1.2950 > 1$), whereas $\text{Var}(\text{PC}_3) = 0.3102 < 1$.

2. **From Part (e) — Cumulative Proportion of Variance:** Together, $\text{PC}_1$ and $\text{PC}_2$ explain $86.5\%$ **(**$0.865$**)** of the total variance in the 5 attributes, while $\text{PC}_3$ adds only $6.2\%$. Thus, **2 PCs** effectively summarize the data.

## Part (g): Using the below biplot, briefly explain how the original variables contribute to the first two PCs. `[4 marks]`

*(Hint: Check which variables are positively or negatively explained by PC1 and PC2.)*

### Beginner’s Guide: How to Read a PCA Biplot Like an Expert!

What is a **Biplot**?
It is a 2-dimensional map where:

* The **Horizontal Axis (**$x$**-axis)** represents $\text{PC}_1$ (left is negative, right is positive, with $0.0$ in the middle).

* The **Vertical Axis (**$y$**-axis)** represents $\text{PC}_2$ (bottom is negative, top is positive, with $0.0$ in the middle).

* The **arrows (vectors)** starting at the center $(0, 0)$ represent our $5$ original variables (`Oil`, `Density`, `Crispy`, `Fracture`, `Hardness`).

To see how a variable contributes to $\text{PC}_1$ and $\text{PC}_2$, simply look at **which direction its arrow points** from the center $(0,0)$:

1. **Contribution to** $\text{PC}_1$ **(Left vs. Right — Horizontal Axis):**

   * If an arrow points to the **RIGHT** of the vertical center line (positive $x$-coordinates), that variable contributes **positively** to $\text{PC}_1$.

   * If an arrow points to the **LEFT** of the vertical center line (negative $x$-coordinates), that variable contributes **negatively** to $\text{PC}_1$.

   * If an arrow points almost straight up or down (near $x = 0$), it has **very little (near-zero)** contribution to $\text{PC}_1$.

2. **Contribution to** $\text{PC}_2$ **(Up vs. Down — Vertical Axis):**

   * If an arrow points **UPWARD** above the horizontal center line (positive $y$-coordinates), that variable contributes **positively** to $\text{PC}_2$.

   * If an arrow points **DOWNWARD** below the horizontal center line (negative $y$-coordinates), that variable contributes **negatively** to $\text{PC}_2$.

### Step-by-Step Reading of the 5 Arrows in the Biplot

Let us trace each arrow in the given biplot:

* **Crispy:** Points to the **upper-right** (around $+0.45$ on $\text{PC}_1$ and $+0.20$ on $\text{PC}_2$).

* **Oil:** Points to the **lower-right** (around $+0.40$ on $\text{PC}_1$ and $-0.35$ on $\text{PC}_2$).

* **Hardness:** Points almost **straight up** (slightly to the right at $+0.12$ on $\text{PC}_1$, and very high at $+0.75$ on $\text{PC}_2$).

* **Density:** Points to the **upper-left** (around $-0.42$ on $\text{PC}_1$ and $+0.30$ on $\text{PC}_2$).

* **Fracture:** Points to the **lower-left** (around $-0.44$ on $\text{PC}_1$ and $-0.20$ on $\text{PC}_2$).

### Complete Exam Answer for Part (g)

1. **Contributions to the First Principal Component (**$\text{PC}_1$ **— Horizontal Axis):**

   * **Positively explained/contributed:** **Crispy** and **Oil** have strong positive loadings on $\text{PC}_1$ (their arrows point strongly to the right), while **Hardness** has a very small positive (near-zero) contribution to $\text{PC}_1$.

   * **Negatively explained/contributed:** **Density** and **Fracture** have strong negative loadings on $\text{PC}_1$ (their arrows point strongly to the left).

   * *Interpretation of* $\text{PC}_1$*:* $\text{PC}_1$ primarily contrasts crispy, oily pastries (positive $\text{PC}_1$) against dense pastries with a large fracture angle (negative $\text{PC}_1$).

2. **Contributions to the Second Principal Component (**$\text{PC}_2$ **— Vertical Axis):**

   * **Positively explained/contributed:** **Hardness** has the strongest positive contribution to $\text{PC}_2$ (its arrow points long and almost vertically upward), while **Density** and **Crispy** also contribute positively (pointing above the horizontal axis).

   * **Negatively explained/contributed:** **Oil** and **Fracture** contribute negatively to $\text{PC}_2$ (their arrows point downward below the horizontal axis).

   * *Interpretation of* $\text{PC}_2$*:* $\text{PC}_2$ is dominated by pastry **Hardness** (along with Density and Crispy) contrasted against Oil and Fracture.

# Question 4 `[Total: 20 Marks]`

*(Note: Question 4 continues using the Food-Texture dataset and R output provided above Question 3).*

## Part (a): Briefly explain the difference between exploratory and confirmatory factor analysis (FA). `[3 marks]`

### Beginner’s Explanation & Complete Exam Answer

| Feature | Exploratory Factor Analysis (EFA) | Confirmatory Factor Analysis (CFA) | 
| ----- | ----- | ----- | 
| **1. Nature & Approach** | **Data-driven (Inductive):** Used when the researcher has **no predefined hypothesis** about the number of underlying factors or which variables load on which factors. | **Theory-driven (Deductive):** Used when the researcher has a **specific, pre-established theoretical model** before analyzing the data. | 
| **2. Primary Objective** | To **explore and discover** the underlying latent factor structure of a set of observed variables directly from the sample correlations. | To **test and confirm** whether the hypothesized factor structure (number of factors and specific variable-factor loadings) fits the observed sample data. | 
| **3. Loading Restrictions** | Every observed variable is initially allowed to load freely on **all** extracted factors. | Specific loadings are fixed to zero in advance based on theory so each variable is restricted to load only on its hypothesized factor(s). | 

## Part (b): List one similarity and one difference between PCA and exploratory FA. `[3 marks]`

### Beginner’s Explanation & Complete Exam Answer

* **One Similarity between PCA and Exploratory FA:**
  Both PCA and EFA are **multivariate dimensionality-reduction techniques** that summarize a large set of correlated observed variables using a smaller number of components/factors based on the sample covariance or correlation matrix.

* **One Difference between PCA and Exploratory FA:**

  * **Variance Analyzed:** **PCA** decomposes the **total variance** of the observed variables (making no distinction between shared variance and unique error variance), whereas **EFA** decomposes only the **shared (common) variance / covariance** among variables by explicitly separating each variable's variance into **communality (**$h_i^2$**)** and **unique/specific error variance (**$\psi_i$**)**.

  * *(Alternative Difference — Model Direction):* In **PCA**, each Principal Component is a linear combination formed *from* the observed variables ($Y = e'X$, no underlying causal model), whereas **EFA** assumes a statistical model in which the observed variables are linear combinations generated *by* underlying latent factors plus unique error terms ($X - \mu = LF + \varepsilon$).

## Part (c): Briefly explain what factor rotation is in exploratory FA and why factor rotation is needed. `[3 marks]`

### Beginner’s Explanation & Complete Exam Answer

* **What Factor Rotation Is:**
  Factor rotation is a mathematical transformation that rotates the coordinate axes of the extracted factors in the $m$-dimensional factor space (multiplying the initial loading matrix $L$ by a transformation matrix $T$ to produce rotated loadings $L^* = LT$, either orthogonally such as **Varimax** where factors remain uncorrelated, or obliquely such as **Promax** where factors are allowed to correlate), without changing the communalities or the overall fit of the model to the covariance/correlation matrix.

* **Why Factor Rotation Is Needed:**
  Unrotated initial factor loadings are often ambiguous and difficult to interpret because variables tend to load moderately on multiple factors at the same time. Factor rotation is needed to achieve **"Simple Structure"**—a clean pattern in which **each observed variable has a high loading on only ONE factor and near-zero loadings on all other factors**—which makes it much easier to interpret and assign meaningful real-world names to the latent factors.

## Part (d): Calculate the cumulative proportion of the total variance explained by the first three factors. `[3 marks]`

### Step-by-Step Calculation

Let us look at the `Proportion Explained` row in the Factor Analysis output for the food-texture data:

```
                       ML1  ML2  ML3  ML5  ML4
SS loadings           2.44 1.17 0.00 0.00 0.00
Proportion Explained  0.68 0.32 0.00 0.00 0.00

```

* Proportion explained by the 1st factor (`ML1`) $= 0.68$

* Proportion explained by the 2nd factor (`ML2`) $= 0.32$

* Proportion explained by the 3rd factor (`ML3`) $= 0.00$

Adding these sequentially gives the cumulative proportion explained by each of the first three factors:

1. **Cumulative proportion explained by the 1st factor (`ML1`):**

   $$
   0.68 \quad (\text{or } 68\%)
   $$

2. **Cumulative proportion explained by the first 2 factors (`ML1` and `ML2`):**

   $$
   0.68 + 0.32 = 1.00 \quad (\text{or } 100\%)
   $$

3. **Cumulative proportion explained by the first 3 factors (`ML1`, `ML2`, and `ML3`):**

   $$
   0.68 + 0.32 + 0.00 = 1.00 \quad (\text{or } 100\%)
   $$

*(Bonus Note for Completeness: If expressed as a proportion of the total standardized variance* $p = 5$ *of all 5 variables using* $\frac{\text{SS loadings}}{5}$*, the cumulative proportions are* $\text{ML1}: \frac{2.44}{5} = 0.488$ *(*$48.8\%$*),* $\text{ML1}+\text{ML2}: \frac{2.44+1.17}{5} = \frac{3.61}{5} = 0.722$ *(*$72.2\%$*), and* $\text{ML1}+\text{ML2}+\text{ML3}: 0.722$ *(*$72.2\%$*). Providing both the R `Proportion Explained` cumulative sums (*$0.68, 1.00, 1.00$*) and the total variance proportions (*$0.488, 0.722, 0.722$*) guarantees full marks!)*

## Part (e): How many factors can you extract from the FA output? Justify your answer. `[3 marks]`

### Step-by-Step Justification

We should extract **two factors (`ML1` and `ML2`)**.
**Justification:**

1. **Proportion of Variance Explained:** From Part (d), the first two factors (`ML1` and `ML2`) account for $100\%$ **(**$0.68 + 0.32 = 1.00$**)** of the explained common variance (and $72.2\%$ of the total variance across all 5 attributes), while `ML3`, `ML4`, and `ML5` have `SS loadings` of $0.00$ and explain $0\%$ additional variance.

2. **Kaiser’s Rule (`SS loadings`** $> 1$**):** Both `ML1` ($\text{SS loadings} = 2.44 > 1$) and `ML2` ($\text{SS loadings} = 1.17 > 1$) have sums of squared loadings greater than $1.0$, whereas the remaining factors have `SS loadings` equal to $0.00 < 1$.

## Part (f): Using the standardized factor loadings of more than 0.6 and not loading on more than one factor, sketch the factor structure. Note that negative values of the factor loadings are also acceptable. `[5 marks]`

### Beginner’s Guide: Checking Every Variable Against the Cutoff Rule ($\vert{}\text{loading}\vert{} > 0.6$)

Let us inspect the `Standardized loadings:` table from the R output:

```
           ML1   ML2 ML3 ML5 ML4
Oil      -0.82 -0.04   0   0   0
Density   0.87  0.01   0   0   0
Crispy   -0.75  0.55   0   0   0
Fracture  0.67 -0.56   0   0   0
Hardness  0.06  0.74   0   0   0

```

We apply the two rules given in the question:

* **Rule 1:** Only include loadings where the absolute value $\vert{}\text{loading}\vert{} > 0.6$ (so either $> +0.60$ or $< -0.60$).

* **Rule 2:** Check that no variable has $\vert{}\text{loading}\vert{} > 0.6$ on more than one factor.

Let us check each of the 5 pastry attributes row by row:

| Attribute | Loading on `ML1` | Loading on `ML2` | Which Factor Has $\vert{}\text{loading}\vert{} > 0.6$? | Cross-loads ($> 0.6$) on $>1$ Factor? | 
| ----- | ----- | ----- | ----- | ----- | 
| **Oil** | $-0.82$ | $-0.04$ | **`ML1` (**$-0.82$**)** since $\vert{}-0.82\vert{} = 0.82 > 0.6$ | No ($\vert{}-0.04\vert{} \le 0.6$) | 
| **Density** | $0.87$ | $0.01$ | **`ML1` (**$0.87$**)** since $0.87 > 0.6$ | No ($0.01 \le 0.6$) | 
| **Crispy** | $-0.75$ | $0.55$ | **`ML1` (**$-0.75$**)** since $\vert{}-0.75\vert{} = 0.75 > 0.6$ | No ($0.55 \le 0.6$) | 
| **Fracture** | $0.67$ | $-0.56$ | **`ML1` (**$0.67$**)** since $0.67 > 0.6$ | No ($\vert{}-0.56\vert{} = 0.56 \le 0.6$) | 
| **Hardness** | $0.06$ | $0.74$ | **`ML2` (**$0.74$**)** since $0.74 > 0.6$ | No ($0.06 \le 0.6$) | 

*(Look closely at **Crispy** and **Fracture**: on `ML2`, Crispy has a loading of* $0.55$ *and Fracture has a loading of* $-0.56$*. Because both* $0.55$ *and* $0.56$ *are **less than*** $0.60$*, neither variable violates the* $> 0.6$ *single-factor rule! Thus, all 5 attributes are retained in the factor structure!)*

### Sketch of the Factor Structure Diagram

```
   +---------+          -0.82          +-------------------+
   |         | ----------------------> | Oil               |
   |         |           0.87          +-------------------+
   |         | ----------------------> | Density           |
   |   ML1   |          -0.75          +-------------------+
   |         | ----------------------> | Crispy            |
   |         |           0.67          +-------------------+
   |         | ----------------------> | Fracture          |
   +---------+                         +-------------------+


   +---------+           0.74          +-------------------+
   |   ML2   | ----------------------> | Hardness          |
   +---------+                         +-------------------+

```

# Question 5 `[Total: 20 Marks]`

## Reference Setup from the Question

An environmental analyst fits a Multivariate Multiple Linear Regression (MMLR) model using air-pollution data recorded at 12 noon in the Los Angeles area on different days.

* **Two Response Variables (**$Y_1, Y_2$**):**

  * $Y_1 = \text{NO}_2$ (Nitrogen Dioxide level)

  * $Y_2 = \text{O}_3$ (Ozone level)

* **Three Predictor Variables (**$X_1, X_2, X_3$**):**

  * $X_1 =$ wind speed

  * $X_2 =$ wind direction

  * $X_3 =$ solar radiation

The following partial R output is obtained:

```
Response Y1:
Coefficients:
             Estimate Std. Error t value Pr(>|t|)
(Intercept)  2.347207   1.314064   1.786 0.082045 .
X1          -0.027070   0.110717  -0.244 0.808164
X2           0.577223   0.160599   3.594 0.000922 ***
X3           0.015422   0.009751   1.582 0.122030
Residual standard error: 1.071 on 38 degrees of freedom
Multiple R-squared: 0.3018, Adjusted R-squared: 0.2467
F-statistic: 5.475 on 3 and 38 DF, p-value: 0.003155

Response Y2:
Coefficients:
            Estimate Std. Error t value Pr(>|t|)
(Intercept) 12.22748    6.41013   1.908   0.0640 .
X1          -0.97203    0.54009  -1.800   0.0798 .
X2          -0.96222    0.78342  -1.228   0.2269
X3           0.08903    0.04757   1.872   0.0690 .
Residual standard error: 5.223 on 38 degrees of freedom
Multiple R-squared: 0.1837, Adjusted R-squared: 0.1192
F-statistic: 2.85 on 3 and 38 DF, p-value: 0.05008

Type II MANOVA Tests: Wilks test statistic
   Df test stat approx F num Df den Df    Pr(>F)
X1  1   0.90595   1.9206      2     37    0.1608
X2  1   0.58789  12.9685      2     37 5.395e-05 ***
X3  1   0.90512   1.9393      2     37    0.1582

Analysis of Variance Table
Model 1: cbind(Y1, Y2) ~ X1 + X2 + X3
Model 2: cbind(Y1, Y2) ~ X2
  Res.Df Df Gen.var.   Wilks approx F num Df den Df  Pr(>F)
1     38      4.7384
2     40  2   5.0054 0.80878   2.0711      4     74 0.10316

```

## Part (a): Briefly discuss the advantage of considering response variables simultaneously rather than individually in linear regression, in order to draw inferences. `[2 marks]`

### Beginner’s Explanation & Complete Exam Answer

When we have multiple response variables ($Y_1 = \text{NO}_2$ and $Y_2 = \text{O}_3$) measured on the same days, they are often correlated with each other (their error terms covary). Considering the response variables **simultaneously** in a Multivariate Multiple Linear Regression (MMLR) model rather than fitting isolated univariate regressions offers three key advantages for statistical inference:

1. **Accounts for Correlations Among Responses:** MMLR explicitly incorporates the covariance structure between the error terms of $Y_1$ and $Y_2$.

2. **Controls the Type I Error Rate:** Conducting separate univariate tests on each response inflates the overall (family-wise) Type I error rate (the probability of false positives), whereas simultaneous multivariate tests (such as Wilks' Lambda) control the overall significance level $\alpha$.

3. **Joint Hypothesis Testing & Higher Statistical Power:** MMLR allows us to test the **joint effect** of a predictor (or a subset of predictors) across *all* response variables simultaneously (e.g., testing whether $X_1$ and $X_3$ can be dropped from both models at once), which can detect combined effects and provide greater statistical power than separate univariate tests.

## Part (b): Use only the first response $Y_1$ to answer the following questions and assume $\alpha = 10\%$.

### Beginner’s Guide: Watching Out for $\alpha = 10\%$ ($\alpha = 0.10$)!

Notice that the question specifies a significance level of $\alpha = 10\% = 0.10$ (not $0.05$!).

* **Our Decision Rule for** $\alpha = 0.10$**:**

  * If $\text{p-value} < 0.10 \implies$ **Reject** $H_0$ **(Statistically Significant!)**

  * If $\text{p-value} \ge 0.10 \implies$ **Fail to reject** $H_0$ **(Not Statistically Significant).**

### (b)(i) Is there a relationship between the predictors and the response? Justify your answer. `[2 marks]`

* **Step-by-Step Check:**
  Look at the bottom line of the `Response Y1:` output:
  `F-statistic: 5.475 on 3 and 38 DF, p-value: 0.003155`
  This tests $H_0: \beta_{11} = \beta_{21} = \beta_{31} = 0$ (no linear relationship between the predictors $X_1, X_2, X_3$ and $Y_1$) vs. $H_1:$ at least one $\beta_{j1} \neq 0$.
  Since $\text{p-value} = 0.003155 < 0.10$, we reject $H_0$.

* **Final Answer for (b)(i):**
  **Yes**, there is a statistically significant linear relationship between the predictors and the first response $Y_1$ ($\text{NO}_2$) at the $10\%$ significance level, because the overall $F$-test $p\text{-value} = 0.003155 < 0.10$ (with $F = 5.475$).

### (b)(ii) Which predictors appear to have a significant relationship with the response? Justify your answer. `[2 marks]`

* **Step-by-Step Check:**
  Let us compare the individual $t$-test $p$-values in the `Pr(>|t|)` column of the `Response Y1:` table against $\alpha = 0.10$:

  * $X_1$ (wind speed): $\text{p-value} = 0.808164 > 0.10 \implies$ Not significant.

  * $X_2$ **(wind direction):** $\text{p-value} = 0.000922 < 0.10 \implies$ **Significant!**

  * $X_3$ (solar radiation): $\text{p-value} = 0.122030 > 0.10 \implies$ Not significant.
    *(Note: The Intercept also has* $\text{p-value} = 0.082045 < 0.10$*, which is significant at the* $10\%$ *level).*

* **Final Answer for (b)(ii):**
  **Only** $X_2$ **(wind direction)** appears to have a statistically significant relationship with $Y_1$ at the $\alpha = 10\%$ level, because its individual $t$-test $p\text{-value} = 0.000922 < 0.10$, whereas the $p$-values for $X_1$ ($0.808164$) and $X_3$ ($0.122030$) are both greater than $0.10$.

### (b)(iii) Compute the predicted value for the response when $X_1 = 10$, $X_2 = 2$, and $X_3 = 80$. `[3 marks]`

* **Beginner’s Guide (Showing Both Standard Calculation Methods):**
  As we saw in the 20 Batch Final Exam, some marking schemes compute the predicted value using **only the statistically significant predictors at** $\alpha = 10\%$ (identified in part (ii)), while others plug all three values into the **full fitted regression equation**. Providing both takes only 30 extra seconds and guarantees $3/3$ marks under any grading key!

* **Method 1: Using Only the Significant Terms at** $\alpha = 10\%$ **(Intercept and** $X_2$**):**
  From the `Estimate` column of `Response Y1:`, the Intercept is $2.347207$ and the coefficient of $X_2$ is $0.577223$:

  $$
  \hat{Y}_1 = 2.347207 + 0.577223 X_2
  $$

  Substitute $X_2 = 2$:

  $$
  \hat{Y}_1 = 2.347207 + 0.577223(2) = 2.347207 + 1.154446 = 3.501653
  $$

* **Method 2: Using the Full Fitted Regression Equation (All 3 Predictors):**

  $$
  \hat{Y}_1 = 2.347207 - 0.027070 X_1 + 0.577223 X_2 + 0.015422 X_3
  $$

  Substitute $X_1 = 10$, $X_2 = 2$, and $X_3 = 80$:

  $$
  \hat{Y}_1 = 2.347207 - 0.027070(10) + 0.577223(2) + 0.015422(80)
  $$

  $$
  \hat{Y}_1 = 2.347207 - 0.270700 + 1.154446 + 1.233760 = 4.464713
  $$

## Part (c): Repeat (b) using only the second response $Y_2$. `[7 marks]`

Let us look at the `Response Y2:` table and apply our cutoff $\alpha = 10\% = 0.10$:

```
Response Y2:
Coefficients:
            Estimate Std. Error t value Pr(>|t|)
(Intercept) 12.22748    6.41013   1.908   0.0640 .
X1          -0.97203    0.54009  -1.800   0.0798 .
X2          -0.96222    0.78342  -1.228   0.2269
X3           0.08903    0.04757   1.872   0.0690 .
Residual standard error: 5.223 on 38 degrees of freedom
Multiple R-squared: 0.1837, Adjusted R-squared: 0.1192
F-statistic: 2.85 on 3 and 38 DF, p-value: 0.05008

```

### (c)(i) Is there a relationship between the predictors and the second response $Y_2$? Justify your answer. `[2 marks]`

* **Step-by-Step Check:**
  Look at the bottom line of the `Response Y2:` output:
  `F-statistic: 2.85 on 3 and 38 DF, p-value: 0.05008`
  Compare the $p$-value ($0.05008$) to $\alpha = 0.10$:
  Since $0.05008 < 0.10$, we reject $H_0$ at the $10\%$ significance level!
  *(Look how important* $\alpha = 0.10$ *is here: if* $\alpha$ *had been* $0.05$*,* $0.05008$ *would have been just barely above* $0.05$*, but because* $\alpha = 0.10$*,* $0.05008 < 0.10$ *is clearly significant!)*

* **Final Answer for (c)(i):**
  **Yes**, there is a statistically significant relationship between the predictors and the second response $Y_2$ ($\text{O}_3$) at the $\alpha = 10\%$ significance level, because the overall $F$-test $p\text{-value} = 0.05008 < 0.10$ (with $F = 2.85$).

### (c)(ii) Which predictors appear to have a significant relationship with $Y_2$? Justify your answer. `[2 marks]`

* **Step-by-Step Check:**
  Compare each predictor's `Pr(>|t|)` value in the `Response Y2:` table against $\alpha = 0.10$:

  * $X_1$ **(wind speed):** $\text{p-value} = 0.0798 < 0.10 \implies$ **Significant!**

  * $X_2$ (wind direction): $\text{p-value} = 0.2269 > 0.10 \implies$ Not significant.

  * $X_3$ **(solar radiation):** $\text{p-value} = 0.0690 < 0.10 \implies$ **Significant!**
    *(Note: The Intercept also has* $\text{p-value} = 0.0640 < 0.10$*, which is significant at* $\alpha = 10\%$*).*

* **Final Answer for (c)(ii):**
  $X_1$ **(wind speed) and** $X_3$ **(solar radiation)** appear to have a statistically significant relationship with $Y_2$ at the $\alpha = 10\%$ level, because their individual $t$-test $p$-values are $0.0798 < 0.10$ and $0.0690 < 0.10$, respectively (whereas $X_2$ has $p\text{-value} = 0.2269 > 0.10$ and is not significant).

### (c)(iii) Compute the predicted value for $Y_2$ when $X_1 = 10$, $X_2 = 2$, and $X_3 = 80$. `[3 marks]`

* **Method 1: Using Only the Significant Terms at** $\alpha = 10\%$ **(Intercept,** $X_1$**, and** $X_3$**):**
  From the `Estimate` column of `Response Y2:`, the Intercept is $12.22748$, the coefficient of $X_1$ is $-0.97203$, and the coefficient of $X_3$ is $0.08903$:

  $$
  \hat{Y}_2 = 12.22748 - 0.97203 X_1 + 0.08903 X_3
  $$

  Substitute $X_1 = 10$ and $X_3 = 80$:

  $$
  \hat{Y}_2 = 12.22748 - 0.97203(10) + 0.08903(80)
  $$

  $$
  \hat{Y}_2 = 12.22748 - 9.72030 + 7.12240 = 9.62958
  $$

* **Method 2: Using the Full Fitted Regression Equation (All 3 Predictors):**

  $$
  \hat{Y}_2 = 12.22748 - 0.97203 X_1 - 0.96222 X_2 + 0.08903 X_3
  $$

  Substitute $X_1 = 10$, $X_2 = 2$, and $X_3 = 80$:

  $$
  \hat{Y}_2 = 12.22748 - 0.97203(10) - 0.96222(2) + 0.08903(80)
  $$

  $$
  \hat{Y}_2 = 12.22748 - 9.72030 - 1.92444 + 7.12240 = 7.70514
  $$

## Part (d): What can you conclude from the Type II MANOVA Tests in the R output? (use $\alpha = 10\%$) `[2 marks]`

### Beginner’s Concept: What is the "Type II MANOVA Tests" Table Testing?

Look at the table in the R output:

```
Type II MANOVA Tests: Wilks test statistic
   Df test stat approx F num Df den Df    Pr(>F)
X1  1   0.90595   1.9206      2     37    0.1608
X2  1   0.58789  12.9685      2     37 5.395e-05 ***
X3  1   0.90512   1.9393      2     37    0.1582

```

In Parts (b) and (c), we looked at $Y_1$ alone and $Y_2$ alone.
The **Type II MANOVA table** tests each predictor ($X_1$, $X_2$, $X_3$) **jointly across both responses** $(Y_1, Y_2)$ **simultaneously**, after accounting for the other predictors in the model!
Specifically, for each predictor $X_j$, it tests:

$$
H_0: \begin{pmatrix} \beta_{j1} \\ \beta_{j2} \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix} \quad (\text{Predictor } X_j \text{ has no effect on either } Y_1 \text{ or } Y_2)
$$

### Step-by-Step Check at $\alpha = 0.10$ & Final Conclusion

Let us compare the `Pr(>F)` column against $\alpha = 0.10$:

1. **For** $X_2$ **(wind direction):** Wilks' $\Lambda = 0.58789$, $F = 12.9685$, and $\text{p-value} = 5.395 \times 10^{-5} = 0.00005395 < 0.10$. Therefore, $X_2$ **has a highly statistically significant joint effect on the two air-pollutant responses** $(Y_1, Y_2)$.

2. **For** $X_1$ **(wind speed) and** $X_3$ **(solar radiation):** Their $p$-values are $0.1608 > 0.10$ and $0.1582 > 0.10$, respectively. Therefore, **neither** $X_1$ **nor** $X_3$ **has a statistically significant joint relationship with** $(Y_1, Y_2)$ at the $10\%$ significance level when controlling for the other predictors.

## Part (e): Test whether the model with just $X_2$ fits as well as the model with all three predictors at the 10% level of significance. `[2 marks]`

### Beginner’s Explanation: Comparing Model 1 (Full) vs. Model 2 (Reduced)

Look at the final table in the R output:

```
Analysis of Variance Table
Model 1: cbind(Y1, Y2) ~ X1 + X2 + X3
Model 2: cbind(Y1, Y2) ~ X2
  Res.Df Df Gen.var.   Wilks approx F num Df den Df  Pr(>F)
1     38      4.7384
2     40  2   5.0054 0.80878   2.0711      4     74 0.10316

```

* **Model 1 (Full Model):** Uses all three predictors ($X_1 + X_2 + X_3$) to predict $(Y_1, Y_2)$.

* **Model 2 (Reduced Model):** Drops $X_1$ and $X_3$, using **only** $X_2$ to predict $(Y_1, Y_2)$.

### Step-by-Step Hypothesis Test at $\alpha = 10\%$ ($\alpha = 0.10$)

1. **Hypotheses:**

   * $H_0: \beta_{11} = \beta_{12} = \beta_{31} = \beta_{32} = 0$ (the predictors $X_1$ and $X_3$ have zero effect on both responses; **Model 2 with just** $X_2$ **fits as well as Model 1 with all three predictors**).

   * $H_1$**:** At least one of $\beta_{11}, \beta_{12}, \beta_{31}, \beta_{32} \neq 0$ (Model 1 fits significantly better than Model 2).

2. **Test Statistic and** $p$**-Value from the R Output:**

   * Wilks' $\Lambda = 0.80878$, approximate $F_{4, 74} = 2.0711$, and $\text{p-value} = 0.10316$.

3. **Decision & Conclusion at** $\alpha = 0.10$**:**
   Compare $\text{p-value} = 0.10316$ with $\alpha = 0.10$:
   Since $0.10316 > 0.10$, we **fail to reject** $H_0$ at the $10\%$ level of significance.
   Therefore, we conclude that **the simpler model with just** $X_2$ **(Model 2) fits the data as well as the full model with all three predictors (Model 1)** at the $10\%$ significance level (though note that $p = 0.10316$ is very close to the $0.10$ boundary).