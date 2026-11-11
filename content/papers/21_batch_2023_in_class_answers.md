# 21 Batch | In-Class Examination | Semester 4, 2023 | DA2451

## Multivariate Methods in Business — Master Beginner Teaching Guide & Complete Worked Solutions

# Question 1 `[Total: 15 Marks]`

## Part (a): Sampling Distributions from a Multivariate Normal Population

**Question Reference:** *Let $X_1, X_2, \dots, X_{30}$ be a random sample of size $n = 30$ from an $N_4(\mu, \Sigma)$ population. Specify each of the following completely.*

* *(i) The distribution of $\bar{X}$ `[1 mark]`*
* *(ii) The distribution of $(n - 1)S$ `[1 mark]`*
* *(iii) The distribution of $n(\bar{X} - \mu)' \Sigma^{-1} (\bar{X} - \mu)$ `[1 mark]`*
* *(iv) The approximated distribution of $n(\bar{X} - \mu)' S^{-1} (\bar{X} - \mu)$ `[1 mark]`*

---

### Beginner’s Foundation: Understanding the Setup from Scratch

Before answering (i) through (iv), let us translate every symbol in the question into plain, everyday English:

1. **What does $N_4(\mu, \Sigma)$ mean?**
   * $N$ stands for the **Multivariate Normal Distribution** (the multi-dimensional bell-shaped curve).
   * The subscript $4$ tells us the **dimension ($p = 4$)**—meaning we are measuring **4 different variables** on each item or person in our sample.
   * $\mu$ (pronounced *"mew"*) is the $4 \times 1$ **Population Mean Vector** (the true population averages of the 4 variables).
   * $\Sigma$ (pronounced *"Sigma"*) is the $4 \times 4$ **Population Variance-Covariance Matrix** (the true population variances and covariances of the 4 variables).

2. **What is $X_1, X_2, \dots, X_{30}$?**
   * We have collected a random sample of **$n = 30$ independent observations** from this population. Each observation $X_i$ is a list (column vector) of 4 numbers.

3. **What are $\bar{X}$ and $S$?**
   * $\bar{X} = \frac{1}{n}\sum_{i=1}^{n} X_i$ is the **Sample Mean Vector**—a $4 \times 1$ column vector containing the sample averages of the 4 variables across the $30$ observations.
   * $S = \frac{1}{n-1}\sum_{i=1}^{n} (X_i - \bar{X})(X_i - \bar{X})'$ is the **Sample Covariance Matrix**—a $4 \times 4$ table estimating $\Sigma$ from our $30$ observations.

---

### (a)(i) The distribution of $\bar{X}$ `[1 mark]`

* **Beginner’s Explanation:**
  In basic 1-variable statistics, if you take the average $\bar{x}$ of $n$ observations from a $N(\mu, \sigma^2)$ population, the sample average $\bar{x}$ also follows a Normal distribution with the exact same mean $\mu$, and its variance shrinks by a factor of $\frac{1}{n}$ to become $\frac{\sigma^2}{n}$.
  In multivariate statistics, the exact same rule holds! For a sample of size $n$ from an $N_p(\mu, \Sigma)$ population:

  $$
  \bar{X} \sim N_p\left(\mu, \, \frac{1}{n}\Sigma\right)
  $$

  Here, $p = 4$ and $n = 30$.

* **Final Answer for (a)(i):**
  $\bar{X}$ follows a **4-variate normal distribution** with mean vector $\mu$ and covariance matrix $\frac{1}{30}\Sigma$:

  $$
  \bar{X} \sim N_4\left(\mu, \, \frac{1}{30}\Sigma\right)
  $$

---

### (a)(ii) The distribution of $(n - 1)S$ `[1 mark]`

* **Beginner’s Explanation:**
  In basic 1-variable statistics, when you multiply the sample variance $s^2$ by $(n - 1)$, the quantity $(n - 1)s^2 = \sum_{i=1}^n (x_i - \bar{x})^2$ follows a scaled Chi-Square distribution ($\sigma^2 \chi_{n-1}^2$) with $n - 1$ degrees of freedom.
  When we have $p = 4$ variables, $S$ is a $4 \times 4$ matrix rather than a single number. The multivariate generalization of the Chi-Square distribution for matrices is called the **Wishart Distribution**, written as $W_p(n - 1, \, \Sigma)$.
  Here, $p = 4$ and the degrees of freedom are $n - 1 = 30 - 1 = 29$.

* **Final Answer for (a)(ii):**
  $(n - 1)S = 29S$ follows a **4-dimensional Wishart distribution** with $n - 1 = 29$ degrees of freedom and variance-covariance (scale) matrix $\Sigma$:

  $$
  (n - 1)S = 29S \sim W_4(29, \, \Sigma)
  $$

---

### (a)(iii) The distribution of $n(\bar{X} - \mu)' \Sigma^{-1} (\bar{X} - \mu)$ `[1 mark]`

* **Beginner’s Explanation:**
  Notice that $n(\bar{X} - \mu)' \Sigma^{-1} (\bar{X} - \mu)$ can be written as $(\bar{X} - \mu)' \left(\frac{\Sigma}{n}\right)^{-1} (\bar{X} - \mu)$.
  This is the **squared Mahalanobis distance** between the sample mean vector $\bar{X}$ and the true population mean vector $\mu$, standardized by the true covariance matrix of $\bar{X}$ (which is $\frac{\Sigma}{n}$).
  Whenever $\Sigma$ is **known**, this quadratic form is the sum of $p = 4$ independent squared standard normal ($Z^2$) variables, which follows an **exact Chi-Square distribution with $p$ degrees of freedom ($\chi_p^2$)**.
  Here, $p = 4$.

* **Final Answer for (a)(iii):**
  $n(\bar{X} - \mu)' \Sigma^{-1} (\bar{X} - \mu)$ follows a **chi-square distribution with $4$ degrees of freedom**:

  $$
  30(\bar{X} - \mu)' \Sigma^{-1} (\bar{X} - \mu) \sim \chi_4^2
  $$

---

### (a)(iv) The approximated distribution of $n(\bar{X} - \mu)' S^{-1} (\bar{X} - \mu)$ `[1 mark]`

* **Beginner’s Explanation:**
  Compare (a)(iv) with (a)(iii): the true population covariance matrix $\Sigma$ has been replaced by the **sample covariance matrix $S$**. This quantity is **Hotelling’s $T^2$ statistic**:

  $$
  T^2 = n(\bar{X} - \mu)' S^{-1} (\bar{X} - \mu)
  $$

  Notice that the question asks for the **"approximated distribution"**. When $n$ is reasonably large, $S$ is a close estimate of $\Sigma$, so Hotelling’s $T^2$ statistic is **approximately distributed as a Chi-Square distribution with $p = 4$ degrees of freedom ($\chi_4^2$)**!
  *(Note for 100% Exam Completeness: Its exact finite-sample distribution is $\frac{(n-1)p}{n-p} F_{p, \, n-p} = \frac{29 \times 4}{30 - 4} F_{4, 26} = \frac{116}{26} F_{4, 26} = \frac{58}{13} F_{4, 26}$, and its large-sample approximated distribution is $\chi_4^2$.)*

* **Final Answer for (a)(iv):**
  The approximated distribution of $n(\bar{X} - \mu)' S^{-1} (\bar{X} - \mu)$ is a **chi-square distribution with $4$ degrees of freedom**:

  $$
  30(\bar{X} - \mu)' S^{-1} (\bar{X} - \mu) \stackrel{\text{approx}}{\sim} \chi_4^2
  $$

---

## Part (b): Linear Combinations and Independence of Multivariate Normal Variables

**Question Reference:** *Let $X = (X_1, X_2, X_3)'$ be $N_3(\mu, \Sigma)$ with*

$$
\mu = \begin{bmatrix} 2 \\ -3 \\ 1 \end{bmatrix} \quad \text{and} \quad \Sigma = \begin{bmatrix} 4 & 0 & -1 \\ 0 & 5 & 0 \\ -1 & 0 & 2 \end{bmatrix}
$$

* *(i) Find the distribution of $X_1 + 3X_2 - 2X_3$. `[5 marks]`*
* *(ii) Find if $(X_1, X_2)$ and $X_3$ are independent. Justify your answer. `[3 marks]`*
* *(iii) Find if $X_1$ and $(X_1 + 3X_2 - 2X_3)$ are independent. Justify your answer. `[3 marks]`*

---

### Beginner’s Guide: Reading the Given Mean Vector $\mu$ and Covariance Matrix $\Sigma$

Let us list every value from $\mu$ and $\Sigma$ so we can plug them in effortlessly:

* **Means (from $\mu$):**
  * $\mu_1 = E(X_1) = 2$
  * $\mu_2 = E(X_2) = -3$
  * $\mu_3 = E(X_3) = 1$

* **Variances (Main Diagonal of $\Sigma$):**
  * $\sigma_{11} = \text{Var}(X_1) = 4$
  * $\sigma_{22} = \text{Var}(X_2) = 5$
  * $\sigma_{33} = \text{Var}(X_3) = 2$

* **Covariances (Off-Diagonal Entries of $\Sigma$):**
  * $\sigma_{12} = \sigma_{21} = \text{Cov}(X_1, X_2) = 0$
  * $\sigma_{13} = \sigma_{31} = \text{Cov}(X_1, X_3) = -1$
  * $\sigma_{23} = \sigma_{32} = \text{Cov}(X_2, X_3) = 0$

---

### (b)(i) Find the distribution of $X_1 + 3X_2 - 2X_3$. `[5 marks]`

#### Beginner’s Concept: Distribution of a Linear Combination $a'X$

Whenever we combine normal random variables into a single expression $Y = a_1 X_1 + a_2 X_2 + a_3 X_3 = a'X$, the result $Y$ always follows a **Univariate Normal Distribution**:

$$
Y = a'X \sim N(a'\mu, \, a'\Sigma a)
$$

where $a' = \begin{bmatrix} a_1 & a_2 & a_3 \end{bmatrix}$ is the row vector of multiplier weights.

#### Step-by-Step Calculation

1. **Identify the weight vector $a$ and its transpose $a'$:**
   In $Y = 1X_1 + 3X_2 - 2X_3$, the weights are $1$, $3$, and $-2$:

   $$
   a' = \begin{bmatrix} 1 & 3 & -2 \end{bmatrix} \quad \text{and} \quad a = \begin{bmatrix} 1 \\ 3 \\ -2 \end{bmatrix}
   $$

2. **Calculate the Mean of $Y$ ($E(Y) = a'\mu$):**
   Multiply each weight by the corresponding variable's mean and add them together:

   $$
   E(X_1 + 3X_2 - 2X_3) = a'\mu = \begin{bmatrix} 1 & 3 & -2 \end{bmatrix} \begin{bmatrix} 2 \\ -3 \\ 1 \end{bmatrix}
   $$

   $$
   = (1)(2) + (3)(-3) + (-2)(1) = 2 - 9 - 2 = -9
   $$

3. **Calculate the Variance of $Y$ ($\text{Var}(Y) = a'\Sigma a$):**
   We compute $\begin{bmatrix} 1 & 3 & -2 \end{bmatrix} \begin{bmatrix} 4 & 0 & -1 \\ 0 & 5 & 0 \\ -1 & 0 & 2 \end{bmatrix} \begin{bmatrix} 1 \\ 3 \\ -2 \end{bmatrix}$ in two simple steps:

   * **Step 3A: Multiply the row vector $a'$ by the $3 \times 3$ matrix $\Sigma$:**

     $$
     a'\Sigma = \begin{bmatrix} 1 & 3 & -2 \end{bmatrix} \begin{bmatrix} 4 & 0 & -1 \\ 0 & 5 & 0 \\ -1 & 0 & 2 \end{bmatrix}
     $$

     * **First entry (using Column 1 of $\Sigma$):** $(1)(4) + (3)(0) + (-2)(-1) = 4 + 0 + 2 = 6$
     * **Second entry (using Column 2 of $\Sigma$):** $(1)(0) + (3)(5) + (-2)(0) = 0 + 15 + 0 = 15$
     * **Third entry (using Column 3 of $\Sigma$):** $(1)(-1) + (3)(0) + (-2)(2) = -1 + 0 - 4 = -5$

     So:

     $$
     a'\Sigma = \begin{bmatrix} 6 & 15 & -5 \end{bmatrix}
     $$

   * **Step 3B: Multiply $a'\Sigma$ by the column vector $a$:**

     $$
     a'\Sigma a = \begin{bmatrix} 6 & 15 & -5 \end{bmatrix} \begin{bmatrix} 1 \\ 3 \\ -2 \end{bmatrix} = (6)(1) + (15)(3) + (-5)(-2) = 6 + 45 + 10 = 61
     $$

   *(Alternative Algebraic Check for Beginners: $\text{Var}(X_1 + 3X_2 - 2X_3) = 1^2\text{Var}(X_1) + 3^2\text{Var}(X_2) + (-2)^2\text{Var}(X_3) + 2(1)(3)\text{Cov}(X_1,X_2) + 2(1)(-2)\text{Cov}(X_1,X_3) + 2(3)(-2)\text{Cov}(X_2,X_3) = 1(4) + 9(5) + 4(2) + 6(0) - 4(-1) - 12(0) = 4 + 45 + 8 + 4 = 61$. Both methods give $61$!)*

#### Final Answer for (b)(i)

$$
X_1 + 3X_2 - 2X_3 \sim N(-9, \, 61)
$$

---

### (b)(ii) Find if $(X_1, X_2)$ and $X_3$ are independent. Justify your answer. `[3 marks]`

#### Beginner’s Concept: Independence of Subvectors in a Multivariate Normal Distribution

In a Multivariate Normal distribution, two groups of variables—here $\begin{bmatrix} X_1 \\ X_2 \end{bmatrix}$ and $[X_3]$—are statistically independent **if and only if every variable in the first group has zero covariance with the second group** (meaning their cross-covariance matrix $\Sigma_{12}$ is a vector of all zeros).

#### Step-by-Step Check

Let us partition the covariance matrix $\Sigma$ between $(X_1, X_2)$ and $X_3$:

$$
\Sigma = \begin{bmatrix} 4 & 0 & \vline & -1 \\ 0 & 5 & \vline & 0 \\ \hline -1 & 0 & \vline & 2 \end{bmatrix} = \begin{bmatrix} \Sigma_{11} & \Sigma_{12} \\ \Sigma_{21} & \Sigma_{22} \end{bmatrix}
$$

Look at the cross-covariance vector $\Sigma_{12}$ between $\begin{bmatrix} X_1 \\ X_2 \end{bmatrix}$ and $X_3$:

$$
\Sigma_{12} = \text{Cov}\left(\begin{bmatrix} X_1 \\ X_2 \end{bmatrix}, \, X_3\right) = \begin{bmatrix} \text{Cov}(X_1, X_3) \\ \text{Cov}(X_2, X_3) \end{bmatrix} = \begin{bmatrix} -1 \\ 0 \end{bmatrix} \neq \begin{bmatrix} 0 \\ 0 \end{bmatrix}
$$

Because $\text{Cov}(X_1, X_3) = -1 \neq 0$, the cross-covariance vector is not a zero vector.

#### Final Answer for (b)(ii)

**No, $(X_1, X_2)$ and $X_3$ are NOT independent**, because $\text{Cov}(X_1, X_3) = -1 \neq 0$ (the cross-covariance matrix $\Sigma_{12} = \begin{bmatrix} -1 \\ 0 \end{bmatrix} \neq \begin{bmatrix} 0 \\ 0 \end{bmatrix}$).

---

### (b)(iii) Find if $X_1$ and $(X_1 + 3X_2 - 2X_3)$ are independent. Justify your answer. `[3 marks]`

#### Beginner’s Concept: Checking Independence of Two Linear Combinations

Since $X_1$ and $Y = X_1 + 3X_2 - 2X_3$ are both linear combinations of the multivariate normal vector $X$, they are jointly normally distributed. Therefore, they are independent **if and only if their covariance $\text{Cov}(X_1, \, X_1 + 3X_2 - 2X_3)$ equals $0$**.

#### Step-by-Step Calculation (Shown Two Ways!)

* **Method 1: Expanding the Covariance Algebraically:**

  $$
  \text{Cov}(X_1, \, X_1 + 3X_2 - 2X_3) = \text{Cov}(X_1, X_1) + 3\text{Cov}(X_1, X_2) - 2\text{Cov}(X_1, X_3)
  $$

  Recall that $\text{Cov}(X_1, X_1) = \text{Var}(X_1) = \sigma_{11} = 4$, $\text{Cov}(X_1, X_2) = \sigma_{12} = 0$, and $\text{Cov}(X_1, X_3) = \sigma_{13} = -1$. Substitute these numbers in:

  $$
  \text{Cov}(X_1, \, X_1 + 3X_2 - 2X_3) = 4 + 3(0) - 2(-1) = 4 + 0 + 2 = 6
  $$

* **Method 2: Using Matrix Multiplication ($b'\Sigma a$):**
  Write $X_1 = b'X$ where $b' = \begin{bmatrix} 1 & 0 & 0 \end{bmatrix}$, and $X_1 + 3X_2 - 2X_3 = a'X$ where $a = \begin{bmatrix} 1 \\ 3 \\ -2 \end{bmatrix}$. From Part (b)(i), we already found $\Sigma a = \begin{bmatrix} 6 \\ 15 \\ -5 \end{bmatrix}$. Therefore:

  $$
  \text{Cov}(b'X, \, a'X) = b'\Sigma a = \begin{bmatrix} 1 & 0 & 0 \end{bmatrix} \begin{bmatrix} 6 \\ 15 \\ -5 \end{bmatrix} = 6
  $$

#### Final Answer for (b)(iii)

**No, $X_1$ and $(X_1 + 3X_2 - 2X_3)$ are NOT independent**, because their covariance is $\text{Cov}(X_1, \, X_1 + 3X_2 - 2X_3) = 6 \neq 0$.

---

# Question 2 `[Total: 20 Marks]`

## Reference Setup from the Question

National track records for women in $n = 54$ countries are analyzed across $p = 7$ track events:

| Country | $X_1$: 100m (s) | $X_2$: 200m (s) | $X_3$: 400m (s) | $X_4$: 800m (min) | $X_5$: 1500m (min) | $X_6$: 3000m (min) | $X_7$: Marathon (min) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **USA** | 10.49 | 21.34 | 48.83 | 1.94 | 3.95 | 8.43 | 141.16 |
| **India** | 11.38 | 22.82 | 51.05 | 2.00 | 4.10 | 9.11 | 158.10 |

The following Principal Component Analysis (PCA) results were produced in R using the **standardized variables** of the 7 track events:

```
Rotation:
          PC1        PC2        PC3         PC4         PC5
X1 -0.3777657  0.4071756  0.1405803 -0.58706293  0.16706891
X2 -0.3832103  0.4136291  0.1007833 -0.19407501 -0.09350016
X3 -0.3680361  0.4593531 -0.2370255  0.64543118 -0.32727328
X4 -0.3947810 -0.1612459 -0.1475424  0.29520804  0.81905467
X5 -0.3892610 -0.3090877  0.4219855  0.06669044 -0.02613100
X6 -0.3760945 -0.4231899  0.4060627  0.08015699 -0.35169796
X7 -0.3552031 -0.3892153 -0.7410610 -0.32107640 -0.24700821

Importance of components:
                           PC1     PC2    PC3     PC4    PC5
Standard deviation      2.4099 0.79290 0.5285 0.35292 0.3016
Proportion of Variance  0.7997 0.09981 0.0499 0.02779 0.0130
```

---

### Beginner’s Foundation: Understanding PCA on Standardized Track Records

1. **Why were the variables standardized before running PCA?**
   Look at the units in the table: $X_1$ (100m dash) is measured in *seconds* (around $10$–$11\text{ s}$), while $X_7$ (Marathon) is measured in *minutes* (around $141$–$158\text{ min}$). If we didn't standardize them, the Marathon numbers would have a huge variance just because of the distance and units, dominating the entire PCA!
   By **standardizing** each variable ($Z_k = \frac{X_k - \bar{X}_k}{s_k}$), every single variable $Z_1, Z_2, \dots, Z_7$ has mean $0$ and variance $1$.

2. **Why does the R output only show `PC1` through `PC5`?**
   Notice that the question states this is a *partial* R output—R printed the first 5 columns (`PC1` to `PC5`), even though there are 7 variables in total! Let us keep that in mind for Part (a).

---

## Part (a): In total how many principal components (PCs) can be calculated for this data? `[2 marks]`

### Beginner’s Explanation

In Principal Component Analysis, the total number of Principal Components that can be extracted is equal to the **number of original variables $p$** in the dataset (as long as the sample size $n \ge p$).
Here, we have $p = 7$ track event variables ($X_1, X_2, X_3, X_4, X_5, X_6, X_7$) measured across $n = 54$ countries.
*(Do not be tricked by the partial R printout that only displayed up to `PC5`! Because there are $7$ variables, there are $7$ eigenvalues and $7$ eigenvectors, so $7$ PCs can be calculated in total).*

### Final Answer for Part (a)

In total, **$7$ principal components (PCs)** can be calculated for this data, because there are $p = 7$ original track event variables.

---

## Part (b): Calculate the variance of each of the first three PCs. `[3 marks]`

### Beginner’s Explanation

In the R table `Importance of components:`, the first row gives the **`Standard deviation`** of each Principal Component:

* $\text{SD}(\text{PC}_1) = 2.4099$
* $\text{SD}(\text{PC}_2) = 0.79290$
* $\text{SD}(\text{PC}_3) = 0.5285$

Since **$\text{Variance} = (\text{Standard Deviation})^2$**, we simply square each standard deviation to find the variance (eigenvalue $\lambda_i$) of each of the first three PCs!

### Step-by-Step Calculation

* **Variance of $\text{PC}_1$ ($\lambda_1$):**

  $$
  \text{Var}(\text{PC}_1) = (2.4099)^2 = 5.807618 \approx 5.8076
  $$

* **Variance of $\text{PC}_2$ ($\lambda_2$):**

  $$
  \text{Var}(\text{PC}_2) = (0.79290)^2 = 0.628690 \approx 0.6287
  $$

* **Variance of $\text{PC}_3$ ($\lambda_3$):**

  $$
  \text{Var}(\text{PC}_3) = (0.5285)^2 = 0.279312 \approx 0.2793
  $$

*(For reference in our scree plot in Part (c), notice that $\text{Var}(\text{PC}_4) = (0.35292)^2 \approx 0.1246$ and $\text{Var}(\text{PC}_5) = (0.3016)^2 \approx 0.0910$.)*

---

## Part (c): Sketch the scree plot and select the appropriate number of PCs that explain a substantial proportion of variation of the data. `[5 marks]`

### Beginner’s Explanation: How to Draw and Interpret the Scree Plot

A **Scree Plot** plots the Component Number ($1, 2, 3, 4, 5, \dots$) on the horizontal axis against the **Variance (Eigenvalue)** of each component on the vertical axis:

* $\text{PC}_1$: Variance $= 5.81$ ($79.97\%$ of variance)
* $\text{PC}_2$: Variance $= 0.63$ ($9.98\%$ of variance)
* $\text{PC}_3$: Variance $= 0.28$ ($4.99\%$ of variance)
* $\text{PC}_4$: Variance $= 0.12$ ($2.78\%$ of variance)
* $\text{PC}_5$: Variance $= 0.09$ ($1.30\%$ of variance)

### Scree Plot Sketch

```
Variance (Eigenvalue)
  ^
6.0 +  * (PC1: 5.81)
    |   \
5.0 +    \
    |     \
4.0 +      \
    |       \
3.0 +        \
    |         \
2.0 +          \
    |           \
1.0 +            * (PC2: 0.63)
    |             \
0.0 +--------------* (0.28)---* (0.12)---* (0.09)---> Principal Component
       1           2          3          4          5
```

### Selecting the Appropriate Number of PCs

* Looking at the scree plot, there is a very steep drop from $\text{PC}_1$ ($5.81$) to $\text{PC}_2$ ($0.63$), and after $\text{PC}_2$ (from $\text{PC}_3$ onwards: $0.28, 0.12, 0.09$) the curve flattens out into small, negligible increments.
* Therefore, selecting the **first two Principal Components ($\text{PC}_1$ and $\text{PC}_2$)** (or 1 to 2 PCs) explains a substantial proportion (**$89.95\%$**, almost $90\%$) of the total variation in the data. *(Note: Part (e) explicitly asks us to justify summarizing the data using the **first two PCs**, so selecting **2 PCs** aligns directly with the exam paper's structure!)*

---

## Part (d): Calculate the cumulative percentage of the total (standardized) sample variance explained by each of the first three PCs. `[3 marks]`

### Beginner’s Explanation

In the R output table `Importance of components:`, the second row gives the `Proportion of Variance` explained by each PC as a decimal:

* $\text{PC}_1 = 0.7997$ (which is $79.97\%$)
* $\text{PC}_2 = 0.09981$ (which is $9.981\%$)
* $\text{PC}_3 = 0.0499$ (which is $4.99\%$)

To find the **cumulative percentage**, we add these proportions together step by step and multiply by $100\%$:

### Step-by-Step Calculation

1. **Cumulative percentage explained by the 1st PC ($\text{PC}_1$):**

   $$
   0.7997 \times 100\% = 79.97\%
   $$

2. **Cumulative percentage explained by the first 2 PCs ($\text{PC}_1$ and $\text{PC}_2$):**

   $$
   (0.7997 + 0.09981) \times 100\% = 0.89951 \times 100\% = 89.951\% \quad (\text{or } 89.95\%)
   $$

3. **Cumulative percentage explained by the first 3 PCs ($\text{PC}_1$, $\text{PC}_2$, and $\text{PC}_3$):**

   $$
   (0.7997 + 0.09981 + 0.0499) \times 100\% = 0.94941 \times 100\% = 94.941\% \quad (\text{or } 94.94\%)
   $$

---

## Part (e): Using the results from (c) and (d), justify that the total variability of the track records can be summarized using the first two PCs. `[2 marks]`

### Step-by-Step Justification

1. **High Cumulative Variance Explained (From Part (d)):** The first two principal components ($\text{PC}_1$ and $\text{PC}_2$) together account for **$89.95\%$ (nearly $90\%$)** of the total standardized sample variance across all seven track events, losing only $10.05\%$ of the information while reducing dimensionality from $7$ variables down to $2$.
2. **Scree Plot Flattening / Diminishing Returns (From Part (c)):** In the scree plot, the eigenvalues level off after $\text{PC}_2$, with each remaining component ($\text{PC}_3$ through $\text{PC}_7$) contributing less than $5\%$ of the total variance ($\text{PC}_3$ adds only $4.99\%$). Thus, the first two PCs effectively summarize the total variability of the track records.

---

## Part (f): Write down the first two PCs as linear combinations of the standardized variables of $X$s. `[2 marks]`

### Beginner’s Explanation

Let $Z_1, Z_2, Z_3, Z_4, Z_5, Z_6, Z_7$ denote the **standardized variables** corresponding to $X_1, \dots, X_7$ (where $Z_k = \frac{X_k - \bar{X}_k}{s_k}$).
We read the multiplier weights directly from the first two columns (`PC1` and `PC2`) of the `Rotation:` table in the R output!

### Final Answer for Part (f)

* **First Principal Component ($\text{PC}_1$):**

  $$
  \text{PC}_1 = -0.378 Z_1 - 0.383 Z_2 - 0.368 Z_3 - 0.395 Z_4 - 0.389 Z_5 - 0.376 Z_6 - 0.355 Z_7
  $$

  *(Or with full decimal precision from R: $\text{PC}_1 = -0.3777657 Z_1 - 0.3832103 Z_2 - 0.3680361 Z_3 - 0.3947810 Z_4 - 0.3892610 Z_5 - 0.3760945 Z_6 - 0.3552031 Z_7$)*

* **Second Principal Component ($\text{PC}_2$):**

  $$
  \text{PC}_2 = 0.407 Z_1 + 0.414 Z_2 + 0.459 Z_3 - 0.161 Z_4 - 0.309 Z_5 - 0.423 Z_6 - 0.389 Z_7
  $$

  *(Or with full decimal precision from R: $\text{PC}_2 = 0.4071756 Z_1 + 0.4136291 Z_2 + 0.4593531 Z_3 - 0.1612459 Z_4 - 0.3090877 Z_5 - 0.4231899 Z_6 - 0.3892153 Z_7$)*

*(Bonus Teacher's Insight: Look at the signs of the weights! In $\text{PC}_1$, all 7 weights have the exact same sign and almost equal magnitude around $-0.38$, so $\text{PC}_1$ measures **overall athletic speed across all distances**. In $\text{PC}_2$, the short sprint events $Z_1, Z_2, Z_3$ [100m, 200m, 400m] have positive weights while the middle/long-distance events $Z_4, Z_5, Z_6, Z_7$ [800m to Marathon] have negative weights, so $\text{PC}_2$ contrasts **sprinting speed vs. long-distance endurance**!)*

---

## Part (g): Explain how to produce a "track excellence" score for countries based on only the first PC. `[3 marks]`

### Beginner’s Explanation & Step-by-Step Procedure

Why can $\text{PC}_1$ be used as a "track excellence" score, and how do we calculate it for each country?

1. **Step 1 (Standardize Each Country's Track Times):**
   For each country $i$ ($i = 1, \dots, 54$) and each track event $k$ ($k = 1, \dots, 7$), convert the raw recorded time $x_{ik}$ into a standardized $Z$-score by subtracting the sample mean $\bar{x}_k$ and dividing by the sample standard deviation $s_k$:

   $$
   z_{ik} = \frac{x_{ik} - \bar{x}_k}{s_k}
   $$

2. **Step 2 (Substitute into the $\text{PC}_1$ Equation):**
   Plug the country's 7 standardized times $(z_{i1}, z_{i2}, \dots, z_{i7})$ into the first principal component equation from Part (f), which explains $79.97\%$ of the total variance and weights all 7 track events almost equally:

   $$
   \text{PC}_{1, i} = -0.378 z_{i1} - 0.383 z_{i2} - 0.368 z_{i3} - 0.395 z_{i4} - 0.389 z_{i5} - 0.376 z_{i6} - 0.355 z_{i7}
   $$

3. **Step 3 (Interpret the Direction of the Score Carefully!):**
   * In running races, **a smaller (lower) time means a faster, better record**, which corresponds to **negative** standardized values ($z_{ik} < 0$).
   * Because all 7 weights in $\text{PC}_1$ are **negative** ($-0.355$ to $-0.395$), multiplying negative $z_{ik}$ values by negative weights produces a **large positive $\text{PC}_1$ score** for fast countries (like USA) and a negative $\text{PC}_1$ score for slower countries!
   * Therefore, $\text{PC}_1$ directly serves as a composite **"Track Excellence Score"** where **a higher positive $\text{PC}_1$ score indicates superior overall national track performance** across all 7 events.

---

# Question 3 `[Total: 15 Marks]`

## Reference Setup from the Question

A firm selected a random sample of $n = 50$ salespeople from different branches and obtained data on $7$ variables:

* **Variables to measure sales performance:**
  * $X_1 =$ Growth of sales
  * $X_2 =$ Profitability of sales
  * $X_3 =$ New account sales
* **Variables to evaluate the skills of salespeople:**
  * $X_4 =$ Creativity
  * $X_5 =$ Mechanical reasoning
  * $X_6 =$ Abstract reasoning
  * $X_7 =$ Mathematical ability

The following partial R output was produced by running a **Factor Analysis (FA)** using the Maximum Likelihood (`method = ml`) method:

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

---

### Beginner’s Foundation: Reading This Factor Analysis Output

Look closely at the column headers in the R table:
`ML2   ML1   ML3   ML4   ML7   ML5   ML6`
Why is `ML2` listed first and `ML1` listed second?
Because in R, when factors are rotated or ordered by variance explained (`SS loadings`), R places the factor with the **largest Sum of Squared Loadings (`SS loadings`)** in the **first column**!

* **1st Factor in the table (`ML2`):** `SS loadings` $= 2.92$, `Proportion Explained` $= 0.46$ ($46\%$)
* **2nd Factor in the table (`ML1`):** `SS loadings` $= 2.71$, `Proportion Explained` $= 0.42$ ($42\%$)
* **3rd Factor in the table (`ML3`):** `SS loadings` $= 0.77$, `Proportion Explained` $= 0.12$ ($12\%$)
* **Remaining Factors (`ML4, ML7, ML5, ML6`):** `SS loadings` $= 0.00$, `Proportion Explained` $= 0.00$ ($0\%$)

---

## Part (a): Calculate the cumulative proportion of the total variance explained by each of the first three factors. `[5 marks]`

### Beginner’s Explanation

"Cumulative proportion" is the running total of `Proportion Explained` as we include the 1st factor, then the 1st + 2nd factors, and then the 1st + 2nd + 3rd factors.

### Step-by-Step Calculation

From the `Proportion Explained` row of the R output:

* Proportion explained by the 1st factor (`ML2`) $= 0.46$
* Proportion explained by the 2nd factor (`ML1`) $= 0.42$
* Proportion explained by the 3rd factor (`ML3`) $= 0.12$

Now we compute the cumulative proportion for each of the first three factors:

1. **Cumulative proportion explained by the 1st factor (`ML2`):**

   $$
   0.46 \quad (\text{or } 46\%)
   $$

2. **Cumulative proportion explained by the first 2 factors (`ML2` and `ML1`):**

   $$
   0.46 + 0.42 = 0.88 \quad (\text{or } 88\%)
   $$

3. **Cumulative proportion explained by the first 3 factors (`ML2`, `ML1`, and `ML3`):**

   $$
   0.46 + 0.42 + 0.12 = 1.00 \quad (\text{or } 100\%)
   $$

*(Bonus Note: If a student also calculates the proportion out of the total standardized variance of all $p = 7$ variables instead of the common variance, note that $\text{Total SS loadings} = 2.92 + 2.71 + 0.77 = 6.40$ out of $7.00$, so relative to $7.00$, the proportions are $\frac{2.92}{7} = 0.417$, $\frac{2.92+2.71}{7} = 0.804$, and $\frac{6.40}{7} = 0.914$. However, in R's `Proportion Explained` row, R directly gives $0.46$, $0.42$, and $0.12$, whose cumulative sums are **$0.46$, $0.88$, and $1.00$**!)*

---

## Part (b): How many factors can you extract from the FA output and why? `[3 marks]`

### Step-by-Step Explanation and Justification

We should extract **two factors (`ML2` and `ML1`)**.
**Why? (Three Strong Statistical Reasons):**

1. **Kaiser's Rule (`SS loadings` $> 1$):** Both `ML2` ($\text{SS loadings} = 2.92 > 1$) and `ML1` ($\text{SS loadings} = 2.71 > 1$) have eigenvalues (Sum of Squared Loadings) greater than $1.0$, whereas the third factor `ML3` has $\text{SS loadings} = 0.77 < 1.0$.
2. **Substantial Cumulative Variance Explained:** Together, the first two factors (`ML2` and `ML1`) explain **$88\%$ ($0.88$)** of the common variance (and over $80\%$ of the total variance), which is a very high proportion.
3. **Loading Cutoff & Interpretability:** Under the loading threshold of $> 0.6$ (used in Part (c)), every single one of the 7 variables loads $> 0.6$ on either `ML2` or `ML1`, while **no variable** has a loading $> 0.6$ on `ML3` (the highest loading on `ML3` is $0.54$ for $X_7$). Furthermore, the two factors correspond cleanly to the two theoretical groups of variables in the study: **Sales Performance ($X_1 - X_3$)** and **Salespeople Skills ($X_4 - X_7$)**.

---

## Part (c): Using the standardized factor loadings of more than 0.6 and not loading on more than one factor, sketch the factor structure. Note that negative values of the factor loadings are also acceptable. `[7 marks]`

### Beginner’s Guide: Checking Every Variable Against the Two Rules

Let us apply the two rules stated in the question:

* **Rule 1:** Only keep factor loadings where $|\text{loading}| > 0.6$.
* **Rule 2:** Ensure no variable loads ($> 0.6$) on more than one factor.

Let us inspect all $7$ variables row by row from the `Standardized factor loadings:` table:

| Variable | Description | Loading on `ML2` | Loading on `ML1` | Loading on `ML3` | Which factor has $\|\text{loading}\| > 0.6$? | Loads on $>1$ factor? |
| --- | --- | --- | --- | --- | --- | --- |
| **$X_1$** | Growth of sales | **$0.84$** | $0.42$ | $0.18$ | **`ML2` ($0.84$)** | No (only `ML2`) |
| **$X_2$** | Profitability of sales | **$0.86$** | $0.42$ | $0.19$ | **`ML2` ($0.86$)** | No (only `ML2`) |
| **$X_3$** | New account sales | **$0.82$** | $0.32$ | $0.32$ | **`ML2` ($0.82$)** | No (only `ML2`) |
| **$X_4$** | Creativity | $0.55$ | **$0.64$** | $0.45$ | **`ML1` ($0.64$)** | No ($0.55 \le 0.6$) |
| **$X_5$** | Mechanical reasoning | $0.47$ | **$0.84$** | $0.22$ | **`ML1` ($0.84$)** | No (only `ML1`) |
| **$X_6$** | Abstract reasoning | $0.38$ | **$0.88$** | $0.22$ | **`ML1` ($0.88$)** | No (only `ML1`) |
| **$X_7$** | Mathematical ability | $0.40$ | **$0.61$** | $0.54$ | **`ML1` ($0.61$)** | No ($0.54 \le 0.6$) |

Look how cleanly that separates!

* Variables **$X_1, X_2, X_3$** (the 3 sales performance variables) load exclusively ($> 0.6$) on **`ML2`**.
* Variables **$X_4, X_5, X_6, X_7$** (the 4 skill variables) load exclusively ($> 0.6$) on **`ML1`**.
* None of the variables cross-load ($> 0.6$) on more than one factor, and `ML3` has no loadings $> 0.6$!

### Sketch of the Factor Structure Diagram

```
   +------------------------------+          0.84          +----------------------------+
   |                              | ---------------------> | X1: Growth of sales        |
   |             ML2              |          0.86          +----------------------------+
   |  (Sales Performance Factor)  | ---------------------> | X2: Profitability of sales |
   |                              |          0.82          +----------------------------+
   |                              | ---------------------> | X3: New account sales      |
   +------------------------------+                        +----------------------------+


   +------------------------------+          0.64          +----------------------------+
   |                              | ---------------------> | X4: Creativity             |
   |                              |          0.84          +----------------------------+
   |             ML1              | ---------------------> | X5: Mechanical reasoning   |
   |  (Salespeople Skills Factor) |          0.88          +----------------------------+
   |                              | ---------------------> | X6: Abstract reasoning     |
   |                              |          0.61          +----------------------------+
   |                              | ---------------------> | X7: Mathematical ability   |
   +------------------------------+                        +----------------------------+
```