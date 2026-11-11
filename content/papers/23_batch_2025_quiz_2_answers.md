# 23 Batch | In-Class Quiz 2 | Semester 4, 2025 | DA2451

## Multivariate Methods in Business — Master Beginner Teaching Guide & Complete Worked Solutions

---

# Question 1 `[Total: 20 Marks]`

## Reference Setup from the Question

Let $X = (X_1, X_2, X_3)'$ be $N_3(\mu, \Sigma)$ with

$$
\mu = \begin{pmatrix} 2 \\ -1 \\ 4 \end{pmatrix} \quad \text{and} \quad \Sigma = \begin{pmatrix} 1 & -2 & 0 \\ -2 & 5 & 0 \\ 0 & 0 & 2 \end{pmatrix}
$$

* **(a) Find the distribution of** $X_2$**. `[2 marks]`**
* **(b) Find the joint distribution of** $X_2$ **and** $X_2 - 3X_1 - X_3$**. `[4 marks]`**
* **(c) Find the distribution of** $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$**. `[4 marks]`**
* **(d) Which of the following random variables are independent? Explain.**
  * **(i)** $X_1$ and $X_3$ `[2 marks]`
  * **(ii)** $X_2$ and $X_2 - 3X_1 - X_3$ `[2 marks]`
  * **(iii)** $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$ and $X_2$ `[2 marks]`
    *Hint: Use your results from (a) to (c).*
* **(e) Let** $X_1, X_2, \dots, X_{20}$ **be a random sample of size 20 from the above three-variate normal distribution with** $\mu$ **and covariance** $\Sigma$**. Specify each of the following completely.**
  * **(i)** The distribution of $\bar{X}$ `[2 marks]`
  * **(ii)** The distribution of $(\bar{X} - \mu)' \left(\frac{\Sigma}{20}\right)^{-1} (\bar{X} - \mu)$ `[2 marks]`

---

### Beginner’s Foundation: How to Read the Symbols $X \sim N_3(\mu, \Sigma)$

Before we solve Part (a), let us translate every single mathematical symbol in the setup into plain, everyday English so that nothing feels mysterious:

1. **What is** $X = (X_1, X_2, X_3)'$**?**
   * Imagine we are measuring **three different numerical characteristics** at the same time on a randomly chosen item or person—for example, $X_1 =$ Fuel cost, $X_2 =$ Maintenance cost, and $X_3 =$ Depreciation cost.
   * Instead of writing three separate variables floating around on a page, we stack them neatly into a vertical column of 3 numbers:

     $$
     X = \begin{pmatrix} X_1 \\ X_2 \\ X_3 \end{pmatrix}
     $$

   * The little apostrophe symbol $'$ in $(X_1, X_2, X_3)'$ is called **transpose**. It simply turns a horizontal row $(X_1, X_2, X_3)$ into a vertical column $\begin{pmatrix} X_1 \\ X_2 \\ X_3 \end{pmatrix}$ so it takes up less vertical space on the question paper!

2. **What does** $N_3(\mu, \Sigma)$ **mean?**
   * The capital letter $N$ stands for the **Normal Distribution** (the classic symmetrical "bell-shaped curve" in statistics).
   * The subscript $3$ in $N_3$ tells us that there are **$3$ variables** moving together in a 3-dimensional bell curve (a **3-variate normal distribution**).
   * Every Multivariate Normal distribution is completely described by just two pieces of information inside the brackets:
     1. **The Mean Vector** $\mu$ (pronounced *"mew"*): The average or center point of each of the 3 variables.
     2. **The Variance-Covariance Matrix** $\Sigma$ (pronounced *"capital sigma"*): A $3 \times 3$ summary table showing how spread out each variable is on its own (**variance**) and how pairs of variables move together (**covariance**).

3. **How to Read Every Number Inside** $\mu$ **and** $\Sigma$**:**
   Let us label the rows and columns of $\mu$ and $\Sigma$ with $X_1, X_2$, and $X_3$ so we can look up any value in two seconds:

   **The Mean Vector ($\mu$):**

   $$
   \mu = \begin{pmatrix} \mu_1 \\ \mu_2 \\ \mu_3 \end{pmatrix} = \begin{pmatrix} 2 \\ -1 \\ 4 \end{pmatrix} \implies \begin{cases} \mu_1 = E(X_1) = 2 & (\text{Average of } X_1) \\ \mu_2 = E(X_2) = -1 & (\text{Average of } X_2) \\ \mu_3 = E(X_3) = 4 & (\text{Average of } X_3) \end{cases}
   $$

   **The Variance-Covariance Matrix ($\Sigma$):**

   | | **Column 1 ($X_1$)** | **Column 2 ($X_2$)** | **Column 3 ($X_3$)** |
   | :--- | :---: | :---: | :---: |
   | **Row 1 ($X_1$)** | $\sigma_{11} = \text{Var}(X_1) = 1$ | $\sigma_{12} = \text{Cov}(X_1, X_2) = -2$ | $\sigma_{13} = \text{Cov}(X_1, X_3) = 0$ |
   | **Row 2 ($X_2$)** | $\sigma_{21} = \text{Cov}(X_2, X_1) = -2$ | $\sigma_{22} = \text{Var}(X_2) = 5$ | $\sigma_{23} = \text{Cov}(X_2, X_3) = 0$ |
   | **Row 3 ($X_3$)** | $\sigma_{31} = \text{Cov}(X_3, X_1) = 0$ | $\sigma_{32} = \text{Cov}(X_3, X_2) = 0$ | $\sigma_{33} = \text{Var}(X_3) = 2$ |

   * **Main Diagonal (Top-Left to Bottom-Right) = Variances ($\sigma_{ii}$):**
     * $\text{Var}(X_1) = \sigma_{11} = 1$
     * $\text{Var}(X_2) = \sigma_{22} = 5$
     * $\text{Var}(X_3) = \sigma_{33} = 2$
   * **Off-Diagonal Entries = Covariances ($\sigma_{ij}$):**
     * $\text{Cov}(X_1, X_2) = \sigma_{12} = \sigma_{21} = -2$ (Negative covariance: when $X_1$ goes up, $X_2$ tends to go down).
     * $\text{Cov}(X_1, X_3) = \sigma_{13} = \sigma_{31} = 0$ (Zero covariance: $X_1$ and $X_3$ do not move together linearly).
     * $\text{Cov}(X_2, X_3) = \sigma_{23} = \sigma_{32} = 0$ (Zero covariance: $X_2$ and $X_3$ do not move together linearly).

---

## Part (a): Find the distribution of $X_2$. `[2 marks]`

### Beginner’s Concept: Marginal Distribution of a Single Variable

When a vector of variables $X = (X_1, X_2, X_3)'$ follows a Multivariate Normal distribution $N_3(\mu, \Sigma)$, **any individual variable $X_i$ on its own follows a standard 1-dimensional (univariate) Normal distribution**:

$$
X_i \sim N(\mu_i, \, \sigma_{ii}) \quad \text{(or written as } N_1(\mu_i, \, \sigma_{ii})\text{)}
$$

To find the distribution of $X_2$, we do not need any complicated algebra—we simply read the mean and variance of $X_2$ (the 2nd variable) directly from Row 2 of $\mu$ and Row 2, Column 2 of $\Sigma$!

### Step-by-Step Calculation

1. **Find the mean of $X_2$ ($\mu_2$):**
   Look at the **2nd entry** of the mean vector $\mu = \begin{pmatrix} 2 \\ -1 \\ 4 \end{pmatrix}$:

   $$
   \mu_2 = E(X_2) = -1
   $$

2. **Find the variance of $X_2$ ($\sigma_{22}$):**
   Look at **Row 2, Column 2** (the middle diagonal entry) of the covariance matrix $\Sigma = \begin{pmatrix} 1 & -2 & 0 \\ -2 & 5 & 0 \\ 0 & 0 & 2 \end{pmatrix}$:

   $$
   \sigma_{22} = \text{Var}(X_2) = 5
   $$

### Final Answer for Question 1(a)

The random variable $X_2$ follows a univariate normal distribution with mean $\mu_2 = -1$ and variance $\sigma_{22} = 5$:

$$
X_2 \sim N(-1, \, 5) \quad \text{(or } N_1(-1, \, 5)\text{)}
$$

---

## Part (b): Find the joint distribution of $X_2$ and $X_2 - 3X_1 - X_3$. `[4 marks]`

### Beginner’s Concept: Joint Distribution of Linear Combinations ($Y = AX$)

What does "joint distribution of $X_2$ and $X_2 - 3X_1 - X_3$" mean?
We are creating **two variables** out of $X_1, X_2, X_3$:
* Let the first variable be $Y_1 = X_2 = 0X_1 + 1X_2 + 0X_3$.
* Let the second variable be $Y_2 = X_2 - 3X_1 - X_3 = -3X_1 + 1X_2 - 1X_3$.

*(Watch out for the order of terms! Notice that in $X_2 - 3X_1 - X_3$, the multiplier in front of $X_1$ is $-3$, the multiplier in front of $X_2$ is $+1$, and the multiplier in front of $X_3$ is $-1$. Always write the terms in order of $X_1, X_2, X_3$ first so you never mix up the positions!)*

A golden rule of the Multivariate Normal distribution says:
> **If $X \sim N_p(\mu, \Sigma)$ and we form a vector of $q$ linear combinations $Y = AX$ (where $A$ is a $q \times p$ matrix of constant multipliers), then $Y$ follows a $q$-variate Normal distribution:**
>
> $$
> Y = AX \sim N_q(A\mu, \, A\Sigma A')
> $$

Here, since we have $q = 2$ variables ($Y_1$ and $Y_2$), their joint distribution will be a **bivariate ($2$-dimensional) normal distribution** $N_2(\mu_Y, \Sigma_Y)$. We can calculate $\mu_Y$ and $\Sigma_Y$ using the matrix formula **and** verify every single number using elementary mean/variance rules!

### Step-by-Step Calculation

#### Method 1: The Matrix Formula ($Y = AX \sim N_2(A\mu, \, A\Sigma A')$)

1. **Write $Y = \begin{pmatrix} Y_1 \\ Y_2 \end{pmatrix}$ in matrix form $Y = AX$:**

   $$
   Y = \begin{pmatrix} X_2 \\ -3X_1 + X_2 - X_3 \end{pmatrix} = \begin{pmatrix} 0 & 1 & 0 \\ -3 & 1 & -1 \end{pmatrix} \begin{pmatrix} X_1 \\ X_2 \\ X_3 \end{pmatrix} = AX
   $$

   where the coefficient matrix $A$ ($2 \times 3$) and its transpose $A'$ ($3 \times 2$) are:

   $$
   A = \begin{pmatrix} 0 & 1 & 0 \\ -3 & 1 & -1 \end{pmatrix} \quad \text{and} \quad A' = \begin{pmatrix} 0 & -3 \\ 1 & 1 \\ 0 & -1 \end{pmatrix}
   $$

2. **Compute the Mean Vector $\mu_Y = A\mu$:**
   Multiply each row of $A$ by the column vector $\mu = \begin{pmatrix} 2 \\ -1 \\ 4 \end{pmatrix}$:

   $$
   \mu_Y = A\mu = \begin{pmatrix} 0 & 1 & 0 \\ -3 & 1 & -1 \end{pmatrix} \begin{pmatrix} 2 \\ -1 \\ 4 \end{pmatrix} = \begin{pmatrix} (0)(2) + (1)(-1) + (0)(4) \\ (-3)(2) + (1)(-1) + (-1)(4) \end{pmatrix} = \begin{pmatrix} 0 - 1 + 0 \\ -6 - 1 - 4 \end{pmatrix} = \begin{pmatrix} -1 \\ -11 \end{pmatrix}
   $$

3. **Compute the Covariance Matrix $\Sigma_Y = A\Sigma A'$:**
   * **First, multiply $A\Sigma$ ($2 \times 3$ matrix times $3 \times 3$ matrix):**

     $$
     A\Sigma = \begin{pmatrix} 0 & 1 & 0 \\ -3 & 1 & -1 \end{pmatrix} \begin{pmatrix} 1 & -2 & 0 \\ -2 & 5 & 0 \\ 0 & 0 & 2 \end{pmatrix}
     $$

     * **Row 1 of $A\Sigma$:**
       * Col 1: $(0)(1) + (1)(-2) + (0)(0) = -2$
       * Col 2: $(0)(-2) + (1)(5) + (0)(0) = 5$
       * Col 3: $(0)(0) + (1)(0) + (0)(2) = 0$
     * **Row 2 of $A\Sigma$:**
       * Col 1: $(-3)(1) + (1)(-2) + (-1)(0) = -3 - 2 + 0 = -5$
       * Col 2: $(-3)(-2) + (1)(5) + (-1)(0) = 6 + 5 + 0 = 11$
       * Col 3: $(-3)(0) + (1)(0) + (-1)(2) = 0 + 0 - 2 = -2$

     So:

     $$
     A\Sigma = \begin{pmatrix} -2 & 5 & 0 \\ -5 & 11 & -2 \end{pmatrix}
     $$

   * **Second, multiply $(A\Sigma)$ by $A'$ ($2 \times 3$ matrix times $3 \times 2$ matrix):**

     $$
     \Sigma_Y = (A\Sigma)A' = \begin{pmatrix} -2 & 5 & 0 \\ -5 & 11 & -2 \end{pmatrix} \begin{pmatrix} 0 & -3 \\ 1 & 1 \\ 0 & -1 \end{pmatrix}
     $$

     * **Row 1, Col 1 ($\text{Var}(Y_1)$):** $(-2)(0) + (5)(1) + (0)(0) = 5$
     * **Row 1, Col 2 ($\text{Cov}(Y_1, Y_2)$):** $(-2)(-3) + (5)(1) + (0)(-1) = 6 + 5 + 0 = 11$
     * **Row 2, Col 1 ($\text{Cov}(Y_2, Y_1)$):** $(-5)(0) + (11)(1) + (-2)(0) = 11$
     * **Row 2, Col 2 ($\text{Var}(Y_2)$):** $(-5)(-3) + (11)(1) + (-2)(-1) = 15 + 11 + 2 = 28$

     So:

     $$
     \Sigma_Y = \begin{pmatrix} 5 & 11 \\ 11 & 28 \end{pmatrix}
     $$

#### Method 2: Direct Verification Using Basic Expectation, Variance & Covariance Rules

Let us double-check every single entry without matrices so we are $100\%$ sure:
* **Means:**
  * $E(Y_1) = E(X_2) = -1$
  * $E(Y_2) = E(X_2 - 3X_1 - X_3) = (-1) - 3(2) - 4 = -1 - 6 - 4 = -11$
* **Variances:**
  * $\text{Var}(Y_1) = \text{Var}(X_2) = 5$
  * $\text{Var}(Y_2) = \text{Var}(-3X_1 + X_2 - X_3)$
    $= (-3)^2\text{Var}(X_1) + (1)^2\text{Var}(X_2) + (-1)^2\text{Var}(X_3) + 2(-3)(1)\text{Cov}(X_1, X_2) + 2(-3)(-1)\text{Cov}(X_1, X_3) + 2(1)(-1)\text{Cov}(X_2, X_3)$
    $= 9(1) + 1(5) + 1(2) - 6(-2) + 6(0) - 2(0) = 9 + 5 + 2 + 12 + 0 + 0 = 28$
* **Covariance:**
  * $\text{Cov}(Y_1, Y_2) = \text{Cov}(X_2, \, X_2 - 3X_1 - X_3) = \text{Var}(X_2) - 3\text{Cov}(X_2, X_1) - \text{Cov}(X_2, X_3)$
    $= 5 - 3(-2) - 0 = 5 + 6 = 11$

Both methods give the exact same result!

### Final Answer for Question 1(b)

The joint distribution of $X_2$ and $X_2 - 3X_1 - X_3$ is a bivariate normal distribution:

$$
\begin{pmatrix} X_2 \\ X_2 - 3X_1 - X_3 \end{pmatrix} \sim N_2\left( \begin{pmatrix} -1 \\ -11 \end{pmatrix}, \, \begin{pmatrix} 5 & 11 \\ 11 & 28 \end{pmatrix} \right)
$$

---

## Part (c): Find the distribution of $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$. `[4 marks]`

### Beginner’s Concept: Marginal Distribution of a Subset of Variables

When $X = (X_1, X_2, X_3)' \sim N_3(\mu, \Sigma)$, any subset of the original variables—such as $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$—also follows a Multivariate Normal distribution!
To find the mean vector and covariance matrix of $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$, we simply **keep the rows and columns corresponding to $X_1$ (Row/Col 1) and $X_3$ (Row/Col 3)** and cross out Row 2 and Column 2 ($X_2$)!

### Step-by-Step Calculation

1. **Extract the Mean Vector for $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$:**
   From $\mu = \begin{pmatrix} \mu_1 \\ \mu_2 \\ \mu_3 \end{pmatrix} = \begin{pmatrix} 2 \\ -1 \\ 4 \end{pmatrix}$, keep the 1st and 3rd entries:

   $$
   \mu_{(1,3)} = \begin{pmatrix} \mu_1 \\ \mu_3 \end{pmatrix} = \begin{pmatrix} 2 \\ 4 \end{pmatrix}
   $$

2. **Extract the Covariance Matrix for $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$:**
   From $\Sigma = \begin{pmatrix} 1 & -2 & 0 \\ -2 & 5 & 0 \\ 0 & 0 & 2 \end{pmatrix}$, keep Rows 1 and 3, and Columns 1 and 3:

   $$
   \Sigma_{(1,3)} = \begin{pmatrix} \sigma_{11} & \sigma_{13} \\ \sigma_{31} & \sigma_{33} \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & 2 \end{pmatrix}
   $$

3. *(Optional Matrix Check Using $A = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix}$):*
   If we write $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix} = AX$, then $A\mu = \begin{pmatrix} 2 \\ 4 \end{pmatrix}$ and $A\Sigma A' = \begin{pmatrix} 1 & 0 \\ 0 & 2 \end{pmatrix}$.

### Final Answer for Question 1(c)

The vector $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$ follows a bivariate normal distribution:

$$
\begin{pmatrix} X_1 \\ X_3 \end{pmatrix} \sim N_2\left( \begin{pmatrix} 2 \\ 4 \end{pmatrix}, \, \begin{pmatrix} 1 & 0 \\ 0 & 2 \end{pmatrix} \right)
$$

---

## Part (d): Which of the following random variables are independent? Explain.

* **(i)** $X_1$ and $X_3$ `[2 marks]`
* **(ii)** $X_2$ and $X_2 - 3X_1 - X_3$ `[2 marks]`
* **(iii)** $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$ and $X_2$ `[2 marks]`
  *Hint: Use your results from (a) to (c).*

### Beginner’s Concept: The Special Zero-Covariance Rule for Normal Variables

In general statistics, knowing that two variables have zero covariance ($\text{Cov}(U, V) = 0$) only tells us they have no *linear* relationship.
**However, for Jointly Multivariate Normal random variables, a magical property holds:**
> **Two jointly normal random variables (or two subvectors of a multivariate normal vector) are statistically INDEPENDENT if and only if their covariance (or cross-covariance matrix) is equal to ZERO!**
> * For two single normal variables $U$ and $V$:
>   $$\text{Cov}(U, V) = 0 \Longleftrightarrow U \text{ and } V \text{ are independent.}$$
> * For a normal subvector $X_{(1)}$ and another normal variable/subvector $X_{(2)}$:
>   $$\text{Cov}(X_{(1)}, X_{(2)}) = \Sigma_{12} = \mathbf{0} \text{ (all entries are zero)} \Longleftrightarrow X_{(1)} \text{ and } X_{(2)} \text{ are independent.}$$

Let us apply this simple test to (i), (ii), and (iii)!

---

### Sub-question (d)(i): Are $X_1$ and $X_3$ independent? `[2 marks]`

* **Step 1: Look up the covariance between $X_1$ and $X_3$.**
  From Part (c), the joint distribution of $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$ is bivariate normal with covariance matrix $\Sigma_{(1,3)} = \begin{pmatrix} 1 & 0 \\ 0 & 2 \end{pmatrix}$.
  The off-diagonal entry is the covariance between $X_1$ and $X_3$:

  $$
  \text{Cov}(X_1, X_3) = \sigma_{13} = 0
  $$

* **Step 2: State the conclusion.**
  Because $X_1$ and $X_3$ are jointly normally distributed and their covariance is $\text{Cov}(X_1, X_3) = 0$, **$X_1$ and $X_3$ ARE independent**.

---

### Sub-question (d)(ii): Are $X_2$ and $X_2 - 3X_1 - X_3$ independent? `[2 marks]`

* **Step 1: Look up the covariance between $X_2$ and $X_2 - 3X_1 - X_3$ from Part (b).**
  From Part (b), $X_2$ and $X_2 - 3X_1 - X_3$ are jointly bivariate normal with covariance matrix:

  $$
  \Sigma_Y = \begin{pmatrix} 5 & 11 \\ 11 & 28 \end{pmatrix}
  $$

  The off-diagonal entry of $\Sigma_Y$ is the covariance between $X_2$ and $X_2 - 3X_1 - X_3$:

  $$
  \text{Cov}(X_2, \, X_2 - 3X_1 - X_3) = 11 \neq 0
  $$

* **Step 2: State the conclusion.**
  Because their covariance is $11 \neq 0$, **$X_2$ and $X_2 - 3X_1 - X_3$ are NOT independent**.

---

### Sub-question (d)(iii): Are $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$ and $X_2$ independent? `[2 marks]`

* **Step 1: Check the cross-covariance matrix between $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$ and $X_2$.**
  For the vector $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$ to be independent of $X_2$, **every variable in $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$ must have zero covariance with $X_2$**:

  $$
  \text{Cov}\left( \begin{pmatrix} X_1 \\ X_3 \end{pmatrix}, \, X_2 \right) = \begin{pmatrix} \text{Cov}(X_1, X_2) \\ \text{Cov}(X_3, X_2) \end{pmatrix} = \begin{pmatrix} \sigma_{12} \\ \sigma_{32} \end{pmatrix} = \begin{pmatrix} -2 \\ 0 \end{pmatrix} \neq \begin{pmatrix} 0 \\ 0 \end{pmatrix}
  $$

* **Step 2: State the conclusion.**
  Although $\text{Cov}(X_3, X_2) = 0$, the covariance between $X_1$ and $X_2$ is $\text{Cov}(X_1, X_2) = \sigma_{12} = -2 \neq 0$. Because the cross-covariance vector is not a vector of all zeros, **$\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$ and $X_2$ are NOT independent**.

---

## Part (e): Random Sample of Size $n = 20$ from $N_3(\mu, \Sigma)$

Let $X_1, X_2, \dots, X_{20}$ be a random sample of size $n = 20$ from the above three-variate normal distribution ($p = 3$) with mean $\mu$ and covariance $\Sigma$. Specify each of the following completely:
* **(i)** The distribution of $\bar{X}$ `[2 marks]`
* **(ii)** The distribution of $(\bar{X} - \mu)' \left(\frac{\Sigma}{20}\right)^{-1} (\bar{X} - \mu)$ `[2 marks]`

### Beginner’s Concept: Sampling Distributions of $\bar{X}$ and Quadratic Forms

1. **What is the Sample Mean Vector $\bar{X}$?**
   When we collect $n = 20$ random observations from a 3-variate normal population $N_3(\mu, \Sigma)$, the average of those 20 vectors is called the **sample mean vector** $\bar{X} = \frac{1}{20}\sum_{j=1}^{20} X_j$.
   Just like in introductory statistics where $\bar{x} \sim N(\mu, \frac{\sigma^2}{n})$, in multivariate statistics the sample mean vector $\bar{X}$ follows a **$p$-variate Normal distribution** with the **same mean vector $\mu$**, and its covariance matrix divided by the sample size $n$:

   $$
   \bar{X} \sim N_p\left(\mu, \, \frac{1}{n}\Sigma\right)
   $$

2. **What is $(\bar{X} - \mu)' \left(\frac{\Sigma}{20}\right)^{-1} (\bar{X} - \mu)$?**
   * In univariate statistics, if you take a normal variable $\bar{x} \sim N(\mu, \frac{\sigma^2}{n})$, standardize it to $Z = \frac{\bar{x} - \mu}{\sqrt{\sigma^2/n}}$, and square it, you get:

     $$
     Z^2 = \frac{(\bar{x} - \mu)^2}{\sigma^2/n} = (\bar{x} - \mu)\left(\frac{\sigma^2}{n}\right)^{-1}(\bar{x} - \mu) \sim \chi_1^2
     $$

   * In multivariate statistics, $(\bar{X} - \mu)' \left(\frac{\Sigma}{n}\right)^{-1} (\bar{X} - \mu)$ is the exact $p$-dimensional version of $Z^2$ (the squared Mahalanobis distance of $\bar{X}$ from $\mu$ using the known covariance matrix $\frac{1}{n}\Sigma$).
   * Because there are $p$ dimensions being squared and standardized, **it follows an exact Chi-Square ($\chi^2$) distribution with $p$ degrees of freedom ($\chi_p^2$)**!
   * *(Beginner Trap Warning: Never confuse $p$ with $n$! The degrees of freedom of this Chi-Square distribution is the number of variables $p = 3$, NOT the sample size $n = 20$!)*

---

### Sub-question (e)(i): The distribution of $\bar{X}$ `[2 marks]`

Here $p = 3$ and $n = 20$. Substituting $\mu$ and $\frac{1}{20}\Sigma$:

$$
\frac{1}{20}\Sigma = \frac{1}{20} \begin{pmatrix} 1 & -2 & 0 \\ -2 & 5 & 0 \\ 0 & 0 & 2 \end{pmatrix} = \begin{pmatrix} \frac{1}{20} & -\frac{2}{20} & 0 \\ -\frac{2}{20} & \frac{5}{20} & 0 \\ 0 & 0 & \frac{2}{20} \end{pmatrix} = \begin{pmatrix} 0.05 & -0.10 & 0 \\ -0.10 & 0.25 & 0 \\ 0 & 0 & 0.10 \end{pmatrix}
$$

#### Final Answer for Question 1(e)(i)

$\bar{X}$ follows a 3-variate normal distribution with mean vector $\mu$ and covariance matrix $\frac{1}{20}\Sigma$:

$$
\bar{X} \sim N_3\left(\mu, \, \frac{1}{20}\Sigma\right) \quad \text{or explicitly} \quad \bar{X} \sim N_3\left( \begin{pmatrix} 2 \\ -1 \\ 4 \end{pmatrix}, \, \begin{pmatrix} 0.05 & -0.10 & 0 \\ -0.10 & 0.25 & 0 \\ 0 & 0 & 0.10 \end{pmatrix} \right)
$$

---

### Sub-question (e)(ii): The distribution of $(\bar{X} - \mu)' \left(\frac{\Sigma}{20}\right)^{-1} (\bar{X} - \mu)$ `[2 marks]`

Since $\bar{X} \sim N_3\left(\mu, \frac{\Sigma}{20}\right)$ has dimension $p = 3$, the quadratic form $(\bar{X} - \mu)' \left(\frac{\Sigma}{20}\right)^{-1} (\bar{X} - \mu)$ follows a **Chi-square distribution with $p = 3$ degrees of freedom**.

#### Final Answer for Question 1(e)(ii)

$$
(\bar{X} - \mu)' \left(\frac{\Sigma}{20}\right)^{-1} (\bar{X} - \mu) \sim \chi_3^2 \quad (\text{Chi-square distribution with } 3 \text{ degrees of freedom})
$$

---
---

# Question 2 `[Total: 15 Marks]`

## Reference Setup from the Question

A firm is attempting to evaluate the quality of its sales staff and find a series of tests that may reveal the potential for good performance in sales. The firm selected a random sample of 50 salespeople from different branches and obtained the data on the following seven variables:

* **Variables to measure sales performance:**
  $X_1 =$ Growth of sales, $X_2 =$ Profitability of sales, $X_3 =$ New account sales
* **Variables to evaluate the skills of salespeople:**
  $X_4 =$ Creativity, $X_5 =$ Mechanical reasoning, $X_6 =$ Abstract reasoning, $X_7 =$ Mathematical ability

The following partial R output was produced using the original variables from the Salespeople Data:

```
Factor Analysis using method = ml
Standardized factor loadings:
    ML2  ML1   ML3   ML4 ML7 ML5 ML6
X1 0.84 0.42  0.18  0.01   0   0   0
X2 0.86 0.42  0.19  0.01   0   0   0
X3 0.82 0.32  0.32 -0.02   0   0   0
X4 0.55 0.64  0.45  0.04   0   0   0
X5 0.47 0.84  0.22  0.01   0   0   0
X6 0.38 0.88  0.22 -0.01   0   0   0
X7 0.40 0.61  0.54 -0.01   0   0   0

                       ML2  ML1  ML3  ML4  ML7  ML5  ML6
SS loadings           2.92 2.71 0.77 0.00 0.00 0.00 0.00
Proportion Explained  0.46 0.42 0.12 0.00 0.00 0.00 0.00
```

* **(a) Calculate the cumulative proportion of the total variance explained by each of the first three factors. `[5 marks]`**
* **(b) How many factors can you extract from the FA output and why? `[3 marks]`**
* **(c) Using the standardized factor loadings of more than 0.6 and not loading on more than one factor, sketch the factor structure. Note that negative values of the factor loadings are also acceptable. `[7 marks]`**

---

### Beginner’s Foundation: What is Factor Analysis (FA) and How Do We Read This R Output?

Imagine a company records $7$ different test scores and sales metrics ($X_1$ through $X_7$) for 50 salespeople. Many of these scores overlap—for example, a salesperson who is great at Growth of Sales ($X_1$) is probably also great at Profitability of Sales ($X_2$) and New Account Sales ($X_3$).
**Factor Analysis (FA)** asks: *"Instead of looking at 7 separate variables, are there just a few hidden, underlying abilities (called **Latent Factors**) driving these 7 scores?"*

Let us decode every part of the R table above:

1. **Why are the columns named `ML2`, `ML1`, `ML3`, `ML4`, `ML7`, `ML5`, `ML6`?**
   * `ML` stands for **Maximum Likelihood**, the mathematical method R used to estimate the factors (`method = ml`).
   * Notice that R automatically sorted the columns from left to right in order of **largest variance explained to smallest variance explained**! So:
     * **1st Factor (Column 1):** `ML2`
     * **2nd Factor (Column 2):** `ML1`
     * **3rd Factor (Column 3):** `ML3`
     * **Remaining columns (`ML4`, `ML7`, `ML5`, `ML6`):** Have `0.00` variance explained and are essentially empty noise.

2. **What are `Standardized factor loadings`?**
   * Each number in the main table (such as `0.84` for $X_1$ on `ML2`) is a **factor loading** ($l_{ij}$).
   * For standardized variables, a factor loading is the **correlation between the observed variable $X_i$ and the hidden factor**.
   * The closer a loading is to $+1.00$ or $-1.00$ (for example, $0.84$, $0.86$, $0.88$), the more strongly that hidden factor controls or represents that observed variable!

3. **What is `SS loadings`?**
   * `SS loadings` stands for **Sum of Squared Loadings** ($\sum_{i=1}^7 l_{ij}^2$).
   * If you square every number in the `ML2` column and add them up:
     $(0.84)^2 + (0.86)^2 + (0.82)^2 + (0.55)^2 + (0.47)^2 + (0.38)^2 + (0.40)^2 = 0.7056 + 0.7396 + 0.6724 + 0.3025 + 0.2209 + 0.1444 + 0.1600 \approx 2.945 \approx 2.92$ (using unrounded loadings).
   * In Factor Analysis, the **SS loadings of a factor is the eigenvalue (amount of variance) explained by that factor**!
   * Total variance explained by all factors together (total communality) is $2.92 + 2.71 + 0.77 = 6.40$, while total variance of the $p = 7$ standardized variables is $7.00$.

4. **What is `Proportion Explained`?**
   * In R's `psych::fa()` output, `Proportion Explained` shows each factor's share of the **explained common variance** ($\text{SS loading} \div 6.40$):
     * `ML2`: $\frac{2.92}{6.40} = 0.456 \approx 0.46$ ($46\%$)
     * `ML1`: $\frac{2.71}{6.40} = 0.423 \approx 0.42$ ($42\%$)
     * `ML3`: $\frac{0.77}{6.40} = 0.120 \approx 0.12$ ($12\%$)
   * Meanwhile, if we divide `SS loadings` by the **total standardized variance of the 7 variables ($p = 7$)**, we get the proportion of total dataset variance:
     * `ML2`: $\frac{2.92}{7} = 0.4171$ ($41.71\%$)
     * `ML1`: $\frac{2.71}{7} = 0.3871$ ($38.71\%$)
     * `ML3`: $\frac{0.77}{7} = 0.1100$ ($11.00\%$)
   * **Pro-Tip for Full Marks:** In Part (a), we will show **both** calculations (using the `Proportion Explained` row directly from the R output AND dividing `SS loadings` by $p = 7$). That way, whichever marking scheme the examiner uses, you are guaranteed $5/5$ marks!

---

## Part (a): Calculate the cumulative proportion of the total variance explained by each of the first three factors. `[5 marks]`

### Beginner’s Concept: What is "Cumulative Proportion"?

"Cumulative" means **running total**—we start with the proportion explained by the 1st factor (`ML2`), then add the 2nd factor (`ML1`), and then add the 3rd factor (`ML3`).

### Step-by-Step Calculation

#### Method 1: Using the `Proportion Explained` Row Directly from the R Output (Standard Course Method)

From the bottom row of the R output (`Proportion Explained`):
* Proportion explained by the 1st factor (`ML2`) $= 0.46$ ($46\%$)
* Proportion explained by the 2nd factor (`ML1`) $= 0.42$ ($42\%$)
* Proportion explained by the 3rd factor (`ML3`) $= 0.12$ ($12\%$)

Now compute the running total (cumulative proportion) for each of the first three factors:

1. **Cumulative proportion explained by the first factor (`ML2`):**

   $$
   \text{Cumulative Proportion (1 factor)} = 0.46 \quad (\text{or } 46\%)
   $$

2. **Cumulative proportion explained by the first two factors (`ML2` and `ML1`):**

   $$
   \text{Cumulative Proportion (2 factors)} = 0.46 + 0.42 = 0.88 \quad (\text{or } 88\%)
   $$

3. **Cumulative proportion explained by the first three factors (`ML2`, `ML1`, and `ML3`):**

   $$
   \text{Cumulative Proportion (3 factors)} = 0.46 + 0.42 + 0.12 = 1.00 \quad (\text{or } 100\%)
   $$

---

#### Method 2: Using `SS loadings` Divided by Total Standardized Variance ($p = 7$)

If calculated relative to the total variance of all $p = 7$ standardized variables ($\text{Total Variance} = 7$):
* Proportion for 1st factor (`ML2`): $\frac{2.92}{7} = 0.4171$ ($41.71\%$)
* Proportion for 2nd factor (`ML1`): $\frac{2.71}{7} = 0.3871$ ($38.71\%$)
* Proportion for 3rd factor (`ML3`): $\frac{0.77}{7} = 0.1100$ ($11.00\%$)

Running totals (cumulative proportions):
1. **First factor (`ML2`):** $\frac{2.92}{7} = 0.4171$ (or $41.71\%$)
2. **First two factors (`ML2` and `ML1`):** $\frac{2.92 + 2.71}{7} = \frac{5.63}{7} = 0.8043$ (or $80.43\%$)
3. **First three factors (`ML2`, `ML1`, and `ML3`):** $\frac{2.92 + 2.71 + 0.77}{7} = \frac{6.40}{7} = 0.9143$ (or $91.43\%$)

### Summary Table for Question 2(a)

| Factor | `SS loadings` | Individual Proportion (`Proportion Explained`) | **Cumulative Proportion (from `Proportion Explained`)** | **Cumulative Proportion (out of $p = 7$)** |
| :--- | :---: | :---: | :---: | :---: |
| **1st Factor (`ML2`)** | $2.92$ | $0.46$ ($46\%$) | **$0.46$ ($46\%$)** | **$0.4171$ ($41.71\%$)** |
| **2nd Factor (`ML1`)** | $2.71$ | $0.42$ ($42\%$) | **$0.88$ ($88\%$)** | **$0.8043$ ($80.43\%$)** |
| **3rd Factor (`ML3`)** | $0.77$ | $0.12$ ($12\%$) | **$1.00$ ($100\%$)** | **$0.9143$ ($91.43\%$)** |

---

## Part (b): How many factors can you extract from the FA output and why? `[3 marks]`

### Beginner’s Concept: How Do We Decide How Many Factors to Extract?

To decide how many factors to keep (extract) from a Factor Analysis table, statisticians check three standard criteria:
1. **Kaiser’s Criterion (Eigenvalue / `SS loadings` $> 1.0$ Rule):** Any factor worth keeping should explain more variance than a single standardized variable ($1.0$). So we keep factors with `SS loadings` $> 1.0$.
2. **Cumulative Percentage of Variance Rule ($\ge 80\%$ Threshold):** The extracted factors together should explain a high percentage (typically at least $80\%$) of the variance.
3. **Factor Loading Cutoff & Interpretability Rule (from Part (c)):** Every extracted factor should have at least one variable loading strongly on it (here, $|l_{ij}| > 0.6$).

Let us check the R output against all three rules!

### Step-by-Step Justification

1. **Check Kaiser’s Rule (`SS loadings` $> 1.0$):**
   * `ML2` has $\text{SS loadings} = 2.92 > 1.0$ (**Keep**)
   * `ML1` has $\text{SS loadings} = 2.71 > 1.0$ (**Keep**)
   * `ML3` has $\text{SS loadings} = 0.77 < 1.0$ (**Drop**)
   * `ML4`, `ML7`, `ML5`, `ML6` all have $\text{SS loadings} = 0.00 < 1.0$ (**Drop**)

2. **Check Cumulative Variance Explained:**
   * From Part (a), the first **two factors (`ML2` and `ML1`)** together explain **$88\%$ ($0.88$)** of the common variance (and **$80.43\%$** of the total variance of the 7 variables), which easily exceeds the standard $80\%$ benchmark.

3. **Check Significant Loadings ($> 0.6$):**
   * Look at the column for `ML3`: its largest loading is $0.54$ (for $X_7$), so **no variable loads $> 0.6$ on `ML3`**! All loadings $> 0.6$ belong strictly to `ML2` and `ML1`.
   * Furthermore, the two factors have clear, meaningful business interpretations: `ML2` represents **Sales Performance** ($X_1, X_2, X_3$) and `ML1` represents **Salespeople Skills / Cognitive Reasoning** ($X_4, X_5, X_6, X_7$).

### Final Answer for Question 2(b)

We should extract **$2$ factors (`ML2` and `ML1`)** from the FA output because:
1. **Kaiser’s Rule:** Only the first two factors (`ML2` with $\text{SS loadings} = 2.92$ and `ML1` with $\text{SS loadings} = 2.71$) have eigenvalues (`SS loadings`) greater than $1.0$, whereas the third factor (`ML3`) has $\text{SS loadings} = 0.77 < 1.0$.
2. **Substantial Variance Explained:** The first two factors (`ML2` and `ML1`) together account for **$88\%$ ($0.88$)** of the explained variance (or $80.43\%$ of total variance across all 7 variables), which is more than sufficient.
3. **Meaningful Loadings ($> 0.6$):** No variable has a standardized factor loading greater than $0.6$ on `ML3` (its maximum loading is $0.54$), whereas all seven variables load above $0.6$ on either `ML2` or `ML1`.

---

## Part (c): Using the standardized factor loadings of more than 0.6 and not loading on more than one factor, sketch the factor structure. Note that negative values of the factor loadings are also acceptable. `[7 marks]`

### Beginner’s Concept: How to Build and Sketch a Factor Structure Diagram

What is a **Factor Structure Diagram**?
It is a clean visual map (like an organization chart) showing:
* **Latent Factors** (drawn as **ovals/circles** on the left or top),
* **Observed Variables** ($X_1$ to $X_7$, drawn as **rectangles/boxes** on the right or bottom), and
* **One-way arrows ($\longrightarrow$)** pointing from each Latent Factor to the Observed Variables that load strongly on it ($|\text{loading}| > 0.6$), labeled with the exact loading value!

Let us check every single variable from $X_1$ to $X_7$ against the two rules in the question:
* **Rule 1:** Keep only standardized factor loadings with magnitude **strictly greater than $0.6$** ($|\text{loading}| > 0.60$).
* **Rule 2:** Verify that no variable loads ($> 0.60$) on more than one factor (**no cross-loading**).

### Step-by-Step Inspection of the Loadings Table

Let us scan each row ($X_1$ through $X_7$) across all columns (`ML2`, `ML1`, `ML3`, etc.):

| Variable | Description | Loading on `ML2` | Loading on `ML1` | Loading on `ML3` | Which loading is $> 0.6$? | Assigned Factor |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **$X_1$** | Growth of sales | **$0.84$** | $0.42$ | $0.18$ | **$0.84 > 0.6$** (only on `ML2`) | **Factor 1 (`ML2`)** |
| **$X_2$** | Profitability of sales | **$0.86$** | $0.42$ | $0.19$ | **$0.86 > 0.6$** (only on `ML2`) | **Factor 1 (`ML2`)** |
| **$X_3$** | New account sales | **$0.82$** | $0.32$ | $0.32$ | **$0.82 > 0.6$** (only on `ML2`) | **Factor 1 (`ML2`)** |
| **$X_4$** | Creativity | $0.55$ | **$0.64$** | $0.45$ | **$0.64 > 0.6$** (only on `ML1`) | **Factor 2 (`ML1`)** |
| **$X_5$** | Mechanical reasoning | $0.47$ | **$0.84$** | $0.22$ | **$0.84 > 0.6$** (only on `ML1`) | **Factor 2 (`ML1`)** |
| **$X_6$** | Abstract reasoning | $0.38$ | **$0.88$** | $0.22$ | **$0.88 > 0.6$** (only on `ML1`) | **Factor 2 (`ML1`)** |
| **$X_7$** | Mathematical ability | $0.40$ | **$0.61$** | $0.54$ | **$0.61 > 0.6$** (only on `ML1`) | **Factor 2 (`ML1`)** |

Look how cleanly that separates!
* **Factor `ML2` (Sales Performance Factor)** drives **$X_1$ ($0.84$), $X_2$ ($0.86$), and $X_3$ ($0.82$)**.
* **Factor `ML1` (Salespeople Skills / Cognitive Ability Factor)** drives **$X_4$ ($0.64$), $X_5$ ($0.84$), $X_6$ ($0.88$), and $X_7$ ($0.61$)**.
* Every single variable from $X_1$ to $X_7$ loads $> 0.6$ on **exactly one** factor, and zero variables are dropped!

### Sketch of the Factor Structure (Final Answer for Question 2(c))

```
   LATENT FACTORS                 FACTOR LOADINGS                OBSERVED VARIABLES
  (Unobserved Constructs)            (|l_ij| > 0.6)                (Measured Variables)

                                       0.84             +------------------------------------+
                           +--------------------------> | X1: Growth of sales                |
                           |                            +------------------------------------+
  /---------------------\  |           0.86             +------------------------------------+
 |         ML2           | +--------------------------> | X2: Profitability of sales         |
 |  (Sales Performance)  | |                            +------------------------------------+
  \---------------------/  |           0.82             +------------------------------------+
                           +--------------------------> | X3: New account sales              |
                                                        +------------------------------------+


                                       0.64             +------------------------------------+
                           +--------------------------> | X4: Creativity                     |
                           |                            +------------------------------------+
                           |           0.84             +------------------------------------+
  /---------------------\  +--------------------------> | X5: Mechanical reasoning           |
 |         ML1           | |                            +------------------------------------+
 | (Salespeople Skills)  | |           0.88             +------------------------------------+
  \---------------------/  +--------------------------> | X6: Abstract reasoning             |
                           |                            +------------------------------------+
                           |           0.61             +------------------------------------+
                           +--------------------------> | X7: Mathematical ability           |
                                                        +------------------------------------+
```

#### Written Summary of the Factor Structure (Always Include Alongside Your Diagram)

* **Factor 1 (`ML2` — Sales Performance):**
  * $X_1$ (Growth of sales): loading $= 0.84$
  * $X_2$ (Profitability of sales): loading $= 0.86$
  * $X_3$ (New account sales): loading $= 0.82$
* **Factor 2 (`ML1` — Salespeople Skills / Aptitude):**
  * $X_4$ (Creativity): loading $= 0.64$
  * $X_5$ (Mechanical reasoning): loading $= 0.84$
  * $X_6$ (Abstract reasoning): loading $= 0.88$
  * $X_7$ (Mathematical ability): loading $= 0.61$

---
---

# Question 3 `[Total: 10 Marks]`

## Reference Setup from the Question

In a study on the costs of transporting construction materials from suppliers to building sites, a survey was conducted among companies involved in material transportation. Cost data on $X_1 =$ fuel, $X_2 =$ maintenance, and $X_3 =$ depreciation, all measured on a per-mile basis, were collected for $n = 40$ randomly selected trucks. A benchmark mean cost vector proposed by industry experts is given as

$$
\mu_0 = \begin{pmatrix} 0.80 \\ 0.50 \\ 0.35 \end{pmatrix}
$$

The following partial R output was produced to test whether the sample mean vector differs significantly from the benchmark vector $\mu_0$:

```
HotellingsT2(data[, 1:3], mu=c(0.80, 0.50, 0.35), test="chi")
T.2 = 18.564, df = ??, p-value = 0.002

mult.norm(data[, 1:3])$mult.test
         Beta-hat     kappa     p-val
Skewness 0.845671  5.126784 0.8651203
Kurtosis 11.974325 -1.198403 0.2843107
```

* **(a) Test if there is evidence that the population mean cost vector differs from the benchmark vector.**
  * **(i)** State $H_0$ and $H_1$. `[2 marks]`
  * **(ii)** What is the approximated distribution of Hotelling's $T^2$ statistic? Clearly, specify the parameter(s) of the approximated distribution. `[2 marks]`
  * **(iii)** Do you reject $H_0$ at the 5% level of significance? State your conclusion. `[3 marks]`
* **(b) Using the results from R output, comment on the validity of the assumption of multivariate normal population of cost data. `[3 marks]`**

---

### Beginner’s Foundation: What is One-Sample Hotelling’s $T^2$ Test and Mardia’s Normality Test?

1. **Why Do We Use Hotelling’s $T^2$ Test Instead of Separate $t$-Tests?**
   * In introductory statistics, if you want to test whether the average of **one** variable (say, fuel cost $\mu_1$) equals a benchmark ($0.80$), you run a **one-sample $t$-test**.
   * Here, we have **$p = 3$ cost variables measured together** on the same $n = 40$ trucks:
     * $X_1 =$ Fuel cost per mile (benchmark $= 0.80$)
     * $X_2 =$ Maintenance cost per mile (benchmark $= 0.50$)
     * $X_3 =$ Depreciation cost per mile (benchmark $= 0.35$)
   * If we ran three separate $t$-tests, we would ignore the correlation between fuel, maintenance, and depreciation, and we would inflate our chance of a false alarm (Type I error).
   * **Hotelling’s $T^2$ test** is the exact multivariate version of the one-sample $t$-test! It tests all 3 means simultaneously in a single test:

     $$
     T^2 = n(\bar{X} - \mu_0)' S^{-1} (\bar{X} - \mu_0)
     $$

2. **Why Does the R Code Say `test="chi"` and `df = ??`?**
   * When the sample size $n$ is reasonably large (here $n = 40$) or when we specify `test = "chi"` in the `HotellingsT2()` function in R, R uses the **Chi-Square ($\chi_p^2$) approximation** for the distribution of the $T^2$ test statistic under $H_0$:

     $$
     T^2 \stackrel{\text{approx}}{\sim} \chi_p^2
     $$

   * What is the parameter of a Chi-Square distribution? Its **degrees of freedom ($\text{df}$)**, which equals the **number of variables $p$** being tested! Since we are testing $3$ variables (`data[, 1:3]`: fuel, maintenance, depreciation), $p = 3$, so $\text{df} = 3$.
   * *(Note on R's `ICSNP::HotellingsT2` scaling: In R's `ICSNP` package, `HotellingsT2(..., test="chi")` multiplies the raw $T^2$ by $\frac{n-p}{n-1}$ so it closer matches $\chi_p^2$, giving `T.2 = 18.564` with `df = 3` and `p-value = 0.002`.)*

3. **What is `mult.norm(data[, 1:3])$mult.test`?**
   * Hotelling’s $T^2$ test assumes that the data come from a **Multivariate Normal ($N_p(\mu, \Sigma)$) population**.
   * To check if this assumption is valid, R runs **Mardia’s Multivariate Normality Test**, which checks two characteristics of a 3D bell curve:
     1. **Multivariate Skewness** (whether the 3D cloud of points is lopsided/asymmetrical). Here `p-val = 0.8651203`.
     2. **Multivariate Kurtosis** (whether the 3D cloud has overly heavy or overly light tails compared to a normal bell curve). Here `p-val = 0.2843107`.
   * Just like any normality test, the **null hypothesis ($H_0$) is that the data follow a multivariate normal distribution**. If both $p$-values are **greater than $0.05$**, we do **not** reject normality—meaning the assumption is satisfied!

---

## Part (a): Test if there is evidence that the population mean cost vector differs from the benchmark vector.

### Sub-question (a)(i): State $H_0$ and $H_1$. `[2 marks]`

Let $\mu = \begin{pmatrix} \mu_1 \\ \mu_2 \\ \mu_3 \end{pmatrix}$ denote the true population mean cost vector for $(X_1 = \text{fuel}, \, X_2 = \text{maintenance}, \, X_3 = \text{depreciation})'$, and let $\mu_0 = \begin{pmatrix} 0.80 \\ 0.50 \\ 0.35 \end{pmatrix}$ be the industry benchmark mean cost vector.

* **Null Hypothesis ($H_0$):** The population mean cost vector is equal to the benchmark mean cost vector:

  $$
  H_0: \mu = \mu_0 \quad \text{i.e.,} \quad H_0: \begin{pmatrix} \mu_1 \\ \mu_2 \\ \mu_3 \end{pmatrix} = \begin{pmatrix} 0.80 \\ 0.50 \\ 0.35 \end{pmatrix}
  $$

* **Alternative Hypothesis ($H_1$):** The population mean cost vector differs from the benchmark mean cost vector (at least one mean cost component differs from its benchmark value):

  $$
  H_1: \mu \neq \mu_0 \quad \text{i.e.,} \quad H_1: \begin{pmatrix} \mu_1 \\ \mu_2 \\ \mu_3 \end{pmatrix} \neq \begin{pmatrix} 0.80 \\ 0.50 \\ 0.35 \end{pmatrix}
  $$

---

### Sub-question (a)(ii): What is the approximated distribution of Hotelling's $T^2$ statistic? Clearly, specify the parameter(s) of the approximated distribution. `[2 marks]`

* Under the null hypothesis $H_0$, for a large sample (and as indicated by `test="chi"` in the R output), Hotelling’s $T^2$ statistic is approximately distributed as a **Chi-square ($\chi^2$) distribution** with degrees of freedom equal to the number of response variables $p$.
* Since there are $p = 3$ cost variables ($X_1 =$ fuel, $X_2 =$ maintenance, $X_3 =$ depreciation), the parameter (degrees of freedom) is **$\text{df} = p = 3$** (which replaces `df = ??` in the R output).

#### Final Answer for Question 3(a)(ii)

$$
T^2 \stackrel{\text{approx}}{\sim} \chi_3^2
$$

* **Approximated Distribution:** Chi-square distribution ($\chi^2$)
* **Parameter:** Degrees of freedom $\text{df} = p = 3$

---

### Sub-question (a)(iii): Do you reject $H_0$ at the 5% level of significance? State your conclusion. `[3 marks]`

* **Step 1: Extract the test statistic and $p$-value from the R output.**
  From the `HotellingsT2` output:
  * Test statistic: $T^2 = 18.564$ (with $\text{df} = 3$)
  * $p\text{-value} = 0.002$

* **Step 2: Compare the $p$-value with the significance level $\alpha = 0.05$ ($5\%$).**
  Since $\text{p-value} = 0.002 < \alpha = 0.05$ (and $T^2 = 18.564 > \chi_{3, 0.05}^2 = 7.815$), **we reject the null hypothesis $H_0$ at the $5\%$ level of significance**.

* **Step 3: State the practical conclusion in context.**
  There is statistically significant evidence at the $5\%$ level of significance to conclude that the true population mean cost vector (across fuel, maintenance, and depreciation per mile) of the trucks **differs significantly** from the industry benchmark vector $\mu_0 = (0.80, \, 0.50, \, 0.35)'$.

---

## Part (b): Using the results from R output, comment on the validity of the assumption of multivariate normal population of cost data. `[3 marks]`

### Beginner’s Concept: How to Write a Complete, Full-Mark Answer for Mardia's Test

When commenting on the validity of the multivariate normality assumption using `mult.norm(...)$mult.test`, always include:
1. **The Hypotheses for Mardia's Skewness and Kurtosis Tests:**
   * $H_0$: The cost data follow a multivariate normal distribution ($\text{Skewness } \beta_1 = 0$ and $\text{Kurtosis } \beta_2 = p(p+2) = 3(5) = 15$).
   * $H_1$: The cost data do not follow a multivariate normal distribution.
2. **Comparison of Both $p$-values with $\alpha = 0.05$:**
   * Skewness test: $\hat{\beta} = 0.845671$, $\kappa = 5.126784$, $\text{p-value} = 0.8651203 > 0.05$.
   * Kurtosis test: $\hat{\beta} = 11.974325$, $\kappa = -1.198403$, $\text{p-value} = 0.2843107 > 0.05$.
3. **Final Decision & Validity Statement:**
   * Since both $p$-values exceed $0.05$, we fail to reject $H_0$ for both skewness and kurtosis, confirming that the multivariate normality assumption is valid.

### Final Answer for Question 3(b)

To assess the validity of the assumption that the cost data come from a multivariate normal population, we examine **Mardia’s multivariate skewness and kurtosis tests** given in the `mult.norm(data[, 1:3])$mult.test` R output:

1. **Hypotheses:**
   * $H_0$: The population of cost data follows a 3-variate normal distribution (i.e., multivariate skewness and kurtosis are consistent with multivariate normality).
   * $H_1$: The population of cost data does not follow a 3-variate normal distribution.

2. **Test Results at the $\alpha = 0.05$ ($5\%$) Significance Level:**
   * **Multivariate Skewness Test:** $\text{p-val} = 0.8651203 > 0.05 \implies$ Do not reject $H_0$ (no significant multivariate skewness).
   * **Multivariate Kurtosis Test:** $\text{p-val} = 0.2843107 > 0.05 \implies$ Do not reject $H_0$ (no significant departure from multivariate normal kurtosis).

3. **Conclusion on Assumption Validity:**
   Because **both $p$-values ($0.8651$ and $0.2843$) are greater than the $0.05$ significance level**, we fail to reject the null hypothesis of multivariate normality for both skewness and kurtosis. Therefore, **the assumption that the cost data come from a multivariate normal population is valid (satisfied)**, and our inference from Hotelling’s $T^2$ test in Part (a) is statistically reliable.