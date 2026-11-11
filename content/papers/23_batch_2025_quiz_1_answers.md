# 23 Batch | In-Class Quiz 1 | Semester 4, 2025 | DA2451

## Multivariate Methods in Business — Master Beginner Teaching Guide & Complete Worked Solutions

# Question (1) `[Total: 10 Marks]`

## Reference Setup from the Question

You are given the following sample variance-covariance matrix $S$ for three variables: $X_1$, $X_2$, and $X_3$:

$$
S = \begin{pmatrix} 36 & 12 & 6 \\ 12 & 25 & 10 \\ 6 & 10 & 16 \end{pmatrix}
$$

* **(a) Compute the sample standard deviations of each variable** $X_1$**,** $X_2$**, and** $X_3$**. `(3 marks)`**

* **(b) Using the matrix** $S$**, compute the corresponding sample correlation matrix** $R$**. `(7 marks)`**

### Beginner’s Foundation: How to Read a Sample Variance-Covariance Matrix ($S$)

Before we do any calculations, let us understand what this $3 \times 3$ table of numbers $S$ actually means in plain English:

Suppose we measured three variables ($X_1$, $X_2$, and $X_3$) on a sample of items or people. The matrix $S$ is a summary table where:

* **Row 1 and Column 1** belong to variable $X_1$.

* **Row 2 and Column 2** belong to variable $X_2$.

* **Row 3 and Column 3** belong to variable $X_3$.

Let us label the rows and columns of $S$ so you can see where every number sits:

|  | **Column 1 (**$X_1$**)** | **Column 2 (**$X_2$**)** | **Column 3 (**$X_3$**)** | 
| ----- | ----- | ----- | ----- | 
| **Row 1 (**$X_1$**)** | $s_{11} = 36$ | $s_{12} = 12$ | $s_{13} = 6$ | 
| **Row 2 (**$X_2$**)** | $s_{21} = 12$ | $s_{22} = 25$ | $s_{23} = 10$ | 
| **Row 3 (**$X_3$**)** | $s_{31} = 6$ | $s_{32} = 10$ | $s_{33} = 16$ | 

1. **The Main Diagonal (Top-Left to Bottom-Right) = Sample Variances (**$s_{ii}$ or $s_i^2$**):**
   The numbers going diagonally from the top-left corner to the bottom-right corner tell us how spread out each individual variable is on its own (**sample variance**):

   * **Variance of** $X_1$**:** $s_{11} = s_1^2 = 36$

   * **Variance of** $X_2$**:** $s_{22} = s_2^2 = 25$

   * **Variance of** $X_3$**:** $s_{33} = s_3^2 = 16$

2. **The Off-Diagonal Numbers = Sample Covariances (**$s_{ij}$**):**
   The numbers *outside* the main diagonal tell us how two different variables move together (**sample covariance**):

   * **Covariance between** $X_1$ **and** $X_2$ **(Row 1, Col 2 or Row 2, Col 1):** $s_{12} = s_{21} = 12$

   * **Covariance between** $X_1$ **and** $X_3$ **(Row 1, Col 3 or Row 3, Col 1):** $s_{13} = s_{31} = 6$

   * **Covariance between** $X_2$ **and** $X_3$ **(Row 2, Col 3 or Row 3, Col 2):** $s_{23} = s_{32} = 10$

## Part (a): Compute the sample standard deviations of each variable $X_1$, $X_2$, and $X_3$. `(3 marks)`

### Beginner’s Concept: How Do We Get Standard Deviation from Variance?

In statistics, **Variance (**$s_i^2$**)** is measured in *squared units* (for example, squared dollars or squared meters). To bring the spread back to the *original units*, we take the **positive square root** of the variance. That square root is called the **Sample Standard Deviation (**$s_i$ or $\sqrt{s_{ii}}$**)**:

$$
\text{Sample Standard Deviation of } X_i = s_i = \sqrt{\text{Sample Variance of } X_i} = \sqrt{s_{ii}}
$$

### Step-by-Step Calculation

* **For Variable** $X_1$**:**
  Look at Row 1, Column 1 of $S$: the sample variance is $s_{11} = 36$.
  Take the square root:

  $$
  s_1 = \sqrt{s_{11}} = \sqrt{36} = 6
  $$

* **For Variable** $X_2$**:**
  Look at Row 2, Column 2 of $S$: the sample variance is $s_{22} = 25$.
  Take the square root:

  $$
  s_2 = \sqrt{s_{22}} = \sqrt{25} = 5
  $$

* **For Variable** $X_3$**:**
  Look at Row 3, Column 3 of $S$: the sample variance is $s_{33} = 16$.
  Take the square root:

  $$
  s_3 = \sqrt{s_{33}} = \sqrt{16} = 4
  $$

### Final Answer for Question (1)(a)

* Sample standard deviation of $X_1$: $\sqrt{s_{11}} = 6$

* Sample standard deviation of $X_2$: $\sqrt{s_{22}} = 5$

* Sample standard deviation of $X_3$: $\sqrt{s_{33}} = 4$

## Part (b): Using the matrix $S$, compute the corresponding sample correlation matrix $R$. `(7 marks)`

### Beginner’s Concept: What is a Correlation Matrix ($R$) and How Do We Calculate It?

Why do we convert a covariance matrix $S$ into a correlation matrix $R$?
Because covariances ($s_{ij}$) depend on the measurement units of the variables, making it hard to tell whether a covariance of $12$ is "strong" or "weak."
**Correlation (**$r_{ij}$**)** solves this by dividing the covariance $s_{ij}$ by the product of the two variables' standard deviations ($s_i \times s_j$):

$$
r_{ij} = \frac{s_{ij}}{\sqrt{s_{ii}}\sqrt{s_{jj}}} = \frac{s_{ij}}{s_i \times s_j}
$$

This scales every correlation so that it always lies between $-1.00$ and $+1.00$!

* **Diagonal Rule:** Every variable is perfectly correlated with itself, so the main diagonal entries of any correlation matrix $R$ are **always equal to** $1$ ($r_{11} = 1$, $r_{22} = 1$, $r_{33} = 1$).

* **Symmetry Rule:** The correlation between $X_i$ and $X_j$ is the exact same as the correlation between $X_j$ and $X_i$ ($r_{ij} = r_{ji}$).

### Step-by-Step Calculation (Entry by Entry)

#### Step 1: Calculate the Diagonal Elements of $R$ ($r_{11}, r_{22}, r_{33}$)

$$
r_{11} = \frac{s_{11}}{s_1 \times s_1} = \frac{36}{6 \times 6} = 1.00
$$

$$
r_{22} = \frac{s_{22}}{s_2 \times s_2} = \frac{25}{5 \times 5} = 1.00
$$

$$
r_{33} = \frac{s_{33}}{s_3 \times s_3} = \frac{16}{4 \times 4} = 1.00
$$

#### Step 2: Calculate the Off-Diagonal Elements of $R$ ($r_{12}, r_{13}, r_{23}$)

Using the standard deviations from Part (a) ($s_1 = 6$, $s_2 = 5$, $s_3 = 4$) and the covariances from $S$ ($s_{12} = 12$, $s_{13} = 6$, $s_{23} = 10$):

* **Correlation between** $X_1$ **and** $X_2$ **(**$r_{12}$ **and** $r_{21}$**):**

  $$
  r_{12} = r_{21} = \frac{s_{12}}{s_1 \times s_2} = \frac{12}{6 \times 5} = \frac{12}{30} = \frac{2}{5} = 0.40
  $$

* **Correlation between** $X_1$ **and** $X_3$ **(**$r_{13}$ **and** $r_{31}$**):**

  $$
  r_{13} = r_{31} = \frac{s_{13}}{s_1 \times s_3} = \frac{6}{6 \times 4} = \frac{6}{24} = \frac{1}{4} = 0.25
  $$

* **Correlation between** $X_2$ **and** $X_3$ **(**$r_{23}$ **and** $r_{32}$**):**

  $$
  r_{23} = r_{32} = \frac{s_{23}}{s_2 \times s_3} = \frac{10}{5 \times 4} = \frac{10}{20} = \frac{1}{2} = 0.50
  $$

#### Step 3: Matrix Formula Verification ($R = D^{-1/2} S D^{-1/2}$)

*(Bonus Method for Full Rigor: In matrix notation, if we put the standard deviations on the diagonal of a matrix* $D^{1/2} = \begin{pmatrix} 6 & 0 & 0 \\ 0 & 5 & 0 \\ 0 & 0 & 4 \end{pmatrix}$*, its inverse is* $D^{-1/2} = \begin{pmatrix} \frac{1}{6} & 0 & 0 \\ 0 & \frac{1}{5} & 0 \\ 0 & 0 & \frac{1}{4} \end{pmatrix}$*. Then:*

$$
R = D^{-1/2} S D^{-1/2} = \begin{pmatrix} \frac{1}{6} & 0 & 0 \\ 0 & \frac{1}{5} & 0 \\ 0 & 0 & \frac{1}{4} \end{pmatrix} \begin{pmatrix} 36 & 12 & 6 \\ 12 & 25 & 10 \\ 6 & 10 & 16 \end{pmatrix} \begin{pmatrix} \frac{1}{6} & 0 & 0 \\ 0 & \frac{1}{5} & 0 \\ 0 & 0 & \frac{1}{4} \end{pmatrix} = \begin{pmatrix} 1.00 & 0.40 & 0.25 \\ 0.40 & 1.00 & 0.50 \\ 0.25 & 0.50 & 1.00 \end{pmatrix}
$$

*Both the element-by-element formula and the matrix formula give the exact same result!)*

### Final Answer for Question (1)(b)

The sample correlation matrix $R$ is:

$$
R = \begin{pmatrix} 1.00 & 0.40 & 0.25 \\ 0.40 & 1.00 & 0.50 \\ 0.25 & 0.50 & 1.00 \end{pmatrix}
$$

# Question (2) `[Total: 10 Marks]`

## Reference Setup from the Question

You are given two observations in a 3-dimensional space:

$$
x_1 = \begin{pmatrix} 3 \\ 6 \\ 2 \end{pmatrix}, \quad x_2 = \begin{pmatrix} 7 \\ 2 \\ 5 \end{pmatrix}
$$

The three variables are assumed to be **independent**, and their variances are:

$$
\text{Var}(X_1) = 16, \quad \text{Var}(X_2) = 4, \quad \text{Var}(X_3) = 9
$$

* **(a) Calculate the Euclidean distance between** $x_1$ **and** $x_2$**. `(3 marks)`**

* **(b) Calculate the Mahalanobis distance between** $x_1$ **and** $x_2$**. `(4 marks)`**

* **(c) Compare the two distances. Why is the Mahalanobis distance different from the Euclidean distance in this case? `(3 marks)`**

## Part (a): Calculate the Euclidean distance between $x_1$ and $x_2$. `(3 marks)`

### Beginner’s Concept: What is Euclidean Distance?

**Euclidean distance** is the ordinary "straight-line ruler distance" between two points in space—the exact 3D version of the Pythagorean theorem ($a^2 + b^2 + c^2 = d^2$).
To find the Euclidean distance $d_E(x_1, x_2)$ between two 3-dimensional points $x_1 = \begin{pmatrix} x_{11} \\ x_{12} \\ x_{13} \end{pmatrix}$ and $x_2 = \begin{pmatrix} x_{21} \\ x_{22} \\ x_{23} \end{pmatrix}$:

1. Subtract the coordinates of $x_2$ from $x_1$ to get the difference vector $(x_1 - x_2)$.

2. Square each difference.

3. Add the squared differences together.

4. Take the square root of the sum:

$$
d_E(x_1, x_2) = \sqrt{(x_1 - x_2)'(x_1 - x_2)} = \sqrt{(x_{11} - x_{21})^2 + (x_{12} - x_{22})^2 + (x_{13} - x_{23})^2}
$$

### Step-by-Step Calculation

1. **Find the coordinate differences** $(x_1 - x_2)$**:**

   $$
   x_1 - x_2 = \begin{pmatrix} 3 \\ 6 \\ 2 \end{pmatrix} - \begin{pmatrix} 7 \\ 2 \\ 5 \end{pmatrix} = \begin{pmatrix} 3 - 7 \\ 6 - 2 \\ 2 - 5 \end{pmatrix} = \begin{pmatrix} -4 \\ 4 \\ -3 \end{pmatrix}
   $$

2. **Square each difference and add them up:**

   $$
   d_E^2(x_1, x_2) = (-4)^2 + (4)^2 + (-3)^2 = 16 + 16 + 9 = 41
   $$

3. **Take the positive square root:**

   $$
   d_E(x_1, x_2) = \sqrt{41} \approx 6.4031
   $$

### Final Answer for Question (2)(a)

The Euclidean distance between $x_1$ and $x_2$ is:

$$
d_E(x_1, x_2) = \sqrt{41} \approx 6.4031
$$

## Part (b): Calculate the Mahalanobis distance between $x_1$ and $x_2$. `(4 marks)`

### Beginner’s Concept: What is Mahalanobis Distance and How Does Independence Simplify It?

While Euclidean distance treats every coordinate difference equally regardless of how volatile or spread out each variable is, **Mahalanobis distance** measures distance in terms of **standard deviations** (statistical distance), accounting for the variances and covariances of the variables:

$$
d_M(x_1, x_2) = \sqrt{(x_1 - x_2)' \Sigma^{-1} (x_1 - x_2)}
$$

In our question, we are told that the three variables $X_1, X_2, X_3$ are **independent**.
What does **independent** mean for the covariance matrix $\Sigma$?
It means all off-diagonal covariances are **zero** ($\text{Cov}(X_i, X_j) = 0$ for $i \neq j$)!
So the covariance matrix $\Sigma$ is a simple **diagonal matrix** with the variances $\text{Var}(X_1) = 16$, $\text{Var}(X_2) = 4$, and $\text{Var}(X_3) = 9$ on the main diagonal:

$$
\Sigma = \begin{pmatrix} 16 & 0 & 0 \\ 0 & 4 & 0 \\ 0 & 0 & 9 \end{pmatrix}
$$

And the inverse of a diagonal matrix $\Sigma^{-1}$ is found simply by taking $1 \div \text{each diagonal variance}$:

$$
\Sigma^{-1} = \begin{pmatrix} \frac{1}{16} & 0 & 0 \\ 0 & \frac{1}{4} & 0 \\ 0 & 0 & \frac{1}{9} \end{pmatrix}
$$

When $\Sigma$ is diagonal, the Mahalanobis distance formula simplifies to dividing each squared coordinate difference by its corresponding variance:

$$
d_M(x_1, x_2) = \sqrt{ \frac{(x_{11} - x_{21})^2}{\text{Var}(X_1)} + \frac{(x_{12} - x_{22})^2}{\text{Var}(X_2)} + \frac{(x_{13} - x_{23})^2}{\text{Var}(X_3)} }
$$

### Step-by-Step Calculation

1. **Use the difference vector** $x_1 - x_2 = \begin{pmatrix} -4 \\ 4 \\ -3 \end{pmatrix}$ **from Part (a) and compute the squared Mahalanobis distance** $d_M^2(x_1, x_2)$**:**

   $$
   d_M^2(x_1, x_2) = \begin{pmatrix} -4 & 4 & -3 \end{pmatrix} \begin{pmatrix} \frac{1}{16} & 0 & 0 \\ 0 & \frac{1}{4} & 0 \\ 0 & 0 & \frac{1}{9} \end{pmatrix} \begin{pmatrix} -4 \\ 4 \\ -3 \end{pmatrix}
   $$

   $$
   d_M^2(x_1, x_2) = \frac{(-4)^2}{16} + \frac{(4)^2}{4} + \frac{(-3)^2}{9}
   $$

   $$
   d_M^2(x_1, x_2) = \frac{16}{16} + \frac{16}{4} + \frac{9}{9} = 1 + 4 + 1 = 6
   $$

2. **Take the positive square root to get the Mahalanobis distance** $d_M(x_1, x_2)$**:**

   $$
   d_M(x_1, x_2) = \sqrt{6} \approx 2.4495
   $$

### Final Answer for Question (2)(b)

The Mahalanobis distance between $x_1$ and $x_2$ is:

$$
d_M(x_1, x_2) = \sqrt{6} \approx 2.4495
$$

## Part (c): Compare the two distances. Why is the Mahalanobis distance different from the Euclidean distance in this case? `(3 marks)`

### Beginner’s Explanation & Complete Exam Answer

1. **Comparison of the Two Distances:**
   The **Mahalanobis distance** ($d_M = \sqrt{6} \approx 2.4495$) is substantially **smaller** than the **Euclidean distance** ($d_E = \sqrt{41} \approx 6.4031$).

2. **Why They Are Different in This Case:**

   * **Euclidean distance ignores the variances (scales) of the variables:** It treats all three variables as if they had equal unit variance ($\text{Var}(X_i) = 1$), giving equal weight to a raw difference of $4$ units in $X_1$ and a raw difference of $4$ units in $X_2$ ($4^2 = 16$ for both).

   * **Mahalanobis distance accounts for the different variances (variability) of the variables:** Even though the variables are independent (zero correlation), they have very different variances ($\text{Var}(X_1) = 16$, $\text{Var}(X_2) = 4$, $\text{Var}(X_3) = 9$, meaning standard deviations of $\sigma_1 = 4$, $\sigma_2 = 2$, and $\sigma_3 = 3$).

   * Mahalanobis distance **standardizes** each coordinate difference by dividing by the variable's standard deviation:

     * A difference of $-4$ in $X_1$ (where $\sigma_1 = 4$) is only $1$ **standard deviation** ($\frac{-4}{4} = -1$).

     * A difference of $4$ in $X_2$ (where $\sigma_2 = 2$) is $2$ **standard deviations** ($\frac{4}{2} = 2$).

     * A difference of $-3$ in $X_3$ (where $\sigma_3 = 3$) is only $1$ **standard deviation** ($\frac{-3}{3} = -1$).

   * Because all three variables have variances greater than $1$ ($16, 4, 9 > 1$), down-weighting the raw squared differences by their respective variances makes the Mahalanobis distance much smaller than the unscaled Euclidean distance.

# Question (3) `[Total: 25 Marks]`

## Reference Setup from the Question

You are given the following correlation matrix $R$ for four standardized variables: $X_1, X_2, X_3$, and $X_4$:

$$
R = \begin{pmatrix} 1.00 & 0.65 & 0.45 & 0.55 \\ 0.65 & 1.00 & 0.60 & 0.50 \\ 0.45 & 0.60 & 1.00 & 0.40 \\ 0.55 & 0.50 & 0.40 & 1.00 \end{pmatrix}
$$

The eigenvalues and eigenvectors (corresponding to the standardized variables) of this correlation matrix are given in the following R output:

```
eigen(R)$values
[1] 2.58 0.64 0.47 0.31

eigen(R)$vectors
       [,1]   [,2]   [,3]   [,4]
[1,] -0.52   0.28  -0.58   0.56
[2,] -0.54  -0.20  -0.33  -0.75
[3,] -0.47  -0.70   0.41   0.34
[4,] -0.47   0.63   0.61  -0.10

```

### Beginner’s Foundation: Reading `eigen(R)` Output in R

Let us translate the R output into simple terms before answering Parts (a) through (h):

1. **`eigen(R)$values` (The Eigenvalues** $\lambda_1, \lambda_2, \lambda_3, \lambda_4$**):**
   These four numbers—listed from largest to smallest—are the **variances of the four Principal Components**:

   * $\lambda_1 = \text{Var}(\text{PC}_1) = 2.58$

   * $\lambda_2 = \text{Var}(\text{PC}_2) = 0.64$

   * $\lambda_3 = \text{Var}(\text{PC}_3) = 0.47$

   * $\lambda_4 = \text{Var}(\text{PC}_4) = 0.31$

   * **Total Variance Check:** Since there are $p = 4$ standardized variables (each with variance $1.00$), the total variance is $1.00 + 1.00 + 1.00 + 1.00 = 4.00$. Notice that the sum of the eigenvalues is $2.58 + 0.64 + 0.47 + 0.31 = 4.00$!

2. **`eigen(R)$vectors` (The Eigenvectors** $e_1, e_2, e_3, e_4$**):**
   Each **column** (`[,1]`, `[,2]`, `[,3]`, `[,4]`) gives the multiplier weights (loadings) for $X_1, X_2, X_3, X_4$ to build that Principal Component:

   * Column `[,1]` is $e_1 = \begin{pmatrix} -0.52 \\ -0.54 \\ -0.47 \\ -0.47 \end{pmatrix}$ (weights for $\text{PC}_1$).

   * Column `[,2]` is $e_2 = \begin{pmatrix} 0.28 \\ -0.20 \\ -0.70 \\ 0.63 \end{pmatrix}$ (weights for $\text{PC}_2$).

## Part (a): In total, how many Principal Components (PCs) can be calculated from this dataset? `(2 marks)`

### Beginner’s Explanation & Final Answer

In Principal Component Analysis, the total number of Principal Components that can be formed is equal to the **number of original variables** ($p$) in the dataset.
Since there are $p = 4$ standardized variables ($X_1, X_2, X_3, X_4$), a total of $4$ **Principal Components (PCs)** can be calculated from this dataset.

## Part (b): Calculate the proportion of total variance explained by each PC. `(4 marks)`

### Beginner’s Concept

The proportion of total variance explained by the $i$-th Principal Component is its eigenvalue ($\lambda_i$) divided by the total variance ($\sum_{i=1}^4 \lambda_i = p = 4$):

$$
\text{Proportion of Variance Explained by PC}_i = \frac{\lambda_i}{\lambda_1 + \lambda_2 + \lambda_3 + \lambda_4} = \frac{\lambda_i}{4}
$$

### Step-by-Step Calculation

First, verify the total variance:

$$
\text{Total Variance} = \lambda_1 + \lambda_2 + \lambda_3 + \lambda_4 = 2.58 + 0.64 + 0.47 + 0.31 = 4.00
$$

Now divide each eigenvalue by $4$:

* **For** $\text{PC}_1$ **(**$\lambda_1 = 2.58$**):**

  $$
  \text{Proportion Explained by PC}_1 = \frac{2.58}{4} = 0.6450 \quad (\text{or } 64.50\%)
  $$

* **For** $\text{PC}_2$ **(**$\lambda_2 = 0.64$**):**

  $$
  \text{Proportion Explained by PC}_2 = \frac{0.64}{4} = 0.1600 \quad (\text{or } 16.00\%)
  $$

* **For** $\text{PC}_3$ **(**$\lambda_3 = 0.47$**):**

  $$
  \text{Proportion Explained by PC}_3 = \frac{0.47}{4} = 0.1175 \quad (\text{or } 11.75\%)
  $$

* **For** $\text{PC}_4$ **(**$\lambda_4 = 0.31$**):**

  $$
  \text{Proportion Explained by PC}_4 = \frac{0.31}{4} = 0.0775 \quad (\text{or } 7.75\%)
  $$

## Part (c): Calculate the cumulative proportion of total variance explained by the first, first two, and first three PCs. `(3 marks)`

### Beginner’s Explanation

"Cumulative proportion" means adding up the proportions from Part (b) as a running total as we include one PC, then two PCs, and then three PCs:

### Step-by-Step Calculation

1. **Cumulative proportion explained by the First PC (**$\text{PC}_1$**):**

   $$
   0.6450 \quad (\text{or } 64.50\%)
   $$

2. **Cumulative proportion explained by the First Two PCs (**$\text{PC}_1$ **and** $\text{PC}_2$**):**

   $$
   0.6450 + 0.1600 = 0.8050 \quad (\text{or } 80.50\%)
   $$

3. **Cumulative proportion explained by the First Three PCs (**$\text{PC}_1$**,** $\text{PC}_2$**, and** $\text{PC}_3$**):**

   $$
   0.6450 + 0.1600 + 0.1175 = 0.9225 \quad (\text{or } 92.25\%)
   $$

*(Note: Including all four PCs gives* $0.9225 + 0.0775 = 1.0000$ *or* $100\%$*.)*

## Part (d): How many PCs should be retained to explain a substantial proportion of variation? Justify your answer. `(3 marks)`

### Beginner’s Explanation (Giving Both Standard Statistical Criteria!)

In multivariate analysis, there are two standard rules used to justify how many PCs to retain. Stating both shows complete mastery:

1. **Using the Cumulative Percentage of Variance Rule (**$80\%$ **Threshold) — Retain 2 PCs:**

   * A standard rule of thumb in PCA is to retain enough components to account for at least $70\%$ **to** $80\%$ of the total variation.

   * From Part (c), the first component ($\text{PC}_1$) explains $64.50\%$ of the total variance, while the **first two components (**$\text{PC}_1$ **and** $\text{PC}_2$**) together explain** $80.50\%$ **(**$0.8050$**)** of the total variance.

   * Therefore, **2 Principal Components (**$\text{PC}_1$ **and** $\text{PC}_2$**)** should be retained to explain a substantial proportion ($> 80\%$) of the variation.

2. **Using Kaiser’s Criterion (**$\lambda_i > 1.0$ **Rule) — Retain 1 PC (or 2 PCs):**

   * Under Kaiser’s rule for a correlation matrix, we retain components whose eigenvalue is greater than $1.0$. Here, only $\text{PC}_1$ has $\lambda_1 = 2.58 > 1.0$ (while $\lambda_2 = 0.64 < 1.0$). However, because $\text{PC}_1$ alone explains only $64.50\%$ of the variance, retaining **the first 2 PCs** ($80.50\%$ cumulative variance) is generally preferred to capture a substantial (>80%) share of the total variation.

## Part (e): What is the variance of each of the first three PCs? `(3 marks)`

### Beginner’s Concept & Final Answer

A fundamental property of Principal Component Analysis is that **the variance of the** $i$**-th Principal Component is equal to the** $i$**-th eigenvalue (**$\lambda_i$**)** of the covariance/correlation matrix:

$$
\text{Var}(\text{PC}_i) = \lambda_i
$$

Reading the first three eigenvalues directly from `eigen(R)$values`:

* **Variance of** $\text{PC}_1$**:** $\text{Var}(\text{PC}_1) = \lambda_1 = 2.58$

* **Variance of** $\text{PC}_2$**:** $\text{Var}(\text{PC}_2) = \lambda_2 = 0.64$

* **Variance of** $\text{PC}_3$**:** $\text{Var}(\text{PC}_3) = \lambda_3 = 0.47$

## Part (f): Write down the first two PCs as linear combinations of the standardized variables $X_1, X_2, X_3$, and $X_4$. `(4 marks)`

### Beginner’s Explanation

To write $\text{PC}_1$ and $\text{PC}_2$ as linear combinations of the standardized variables $X_1, X_2, X_3, X_4$, we take the weights from **Column 1 (`[,1]`)** and **Column 2 (`[,2]`)** of `eigen(R)$vectors`:

* Column `[,1]` $= (-0.52, \, -0.54, \, -0.47, \, -0.47)'$

* Column `[,2]` $= (0.28, \, -0.20, \, -0.70, \, 0.63)'$

### Final Answer for Question (3)(f)

* **First Principal Component (**$\text{PC}_1$**):**

  $$
  \text{PC}_1 = e_1' X = -0.52 X_1 - 0.54 X_2 - 0.47 X_3 - 0.47 X_4
  $$

* **Second Principal Component (**$\text{PC}_2$**):**

  $$
  \text{PC}_2 = e_2' X = 0.28 X_1 - 0.20 X_2 - 0.70 X_3 + 0.63 X_4
  $$

## Part (g): Show that the first two PCs are uncorrelated. `(4 marks)`

### Beginner’s Concept: How Do We Prove Two Principal Components Are Uncorrelated?

Two random variables ($\text{PC}_1$ and $\text{PC}_2$) are **uncorrelated** if their **covariance is equal to zero**:

$$
\text{Cov}(\text{PC}_1, \text{PC}_2) = 0
$$

We can show this both **theoretically (using matrix algebra)** and **numerically (using the eigenvector numbers from the R output)**! Showing both makes your solution completely undeniable.

### Step-by-Step Proof

#### 1. Theoretical Matrix Proof

Since $\text{PC}_1 = e_1' X$ and $\text{PC}_2 = e_2' X$, where $\text{Cov}(X) = R$, the covariance between $\text{PC}_1$ and $\text{PC}_2$ is:

$$
\text{Cov}(\text{PC}_1, \text{PC}_2) = \text{Cov}(e_1' X, \, e_2' X) = e_1' R e_2
$$

Because $e_2$ is an eigenvector of $R$ corresponding to the eigenvalue $\lambda_2$, by definition $R e_2 = \lambda_2 e_2$. Substituting this in gives:

$$
\text{Cov}(\text{PC}_1, \text{PC}_2) = e_1' (\lambda_2 e_2) = \lambda_2 (e_1' e_2)
$$

Because $R$ is a symmetric matrix and $\lambda_1 = 2.58 \neq \lambda_2 = 0.64$ are distinct eigenvalues, their corresponding eigenvectors $e_1$ and $e_2$ are **orthogonal** ($e_1' e_2 = 0$).

#### 2. Numerical Verification Using the Given Eigenvectors $e_1$ and $e_2$

Let us compute the dot product $e_1' e_2$ directly using the 2-decimal rounded eigenvectors given in the R output:

$$
e_1' e_2 = \begin{pmatrix} -0.52 & -0.54 & -0.47 & -0.47 \end{pmatrix} \begin{pmatrix} 0.28 \\ -0.20 \\ -0.70 \\ 0.63 \end{pmatrix}
$$

Multiply corresponding elements and add them up:

* First term: $(-0.52)(0.28) = -0.1456$

* Second term: $(-0.54)(-0.20) = +0.1080$

* Third term: $(-0.47)(-0.70) = +0.3290$

* Fourth term: $(-0.47)(0.63) = -0.2961$

Sum the four terms:

$$
e_1' e_2 = -0.1456 + 0.1080 + 0.3290 - 0.2961 = -0.0047 \approx 0.00
$$

And multiplying by $\lambda_2 = 0.64$:

$$
\text{Cov}(\text{PC}_1, \text{PC}_2) = \lambda_2 (e_1' e_2) = 0.64(-0.0047) = -0.0030 \approx 0
$$

*(Note: The tiny difference* $-0.0047$ *from exact* $0$ *is solely due to the eigenvectors in the question being rounded to 2 decimal places).*
Therefore, $\text{Cov}(\text{PC}_1, \text{PC}_2) = 0$, which proves that **the first two Principal Components are uncorrelated**.

## Part (h): Briefly explain the importance of PCs in analyzing multivariate data. `(2 marks)`

### Beginner’s Explanation & Complete Exam Answer

Principal Components (PCs) are important in analyzing multivariate data for four key reasons:

1. **Dimensionality Reduction (Data Compression):** They reduce a large number of correlated variables into a much smaller set of components (e.g., reducing $4$ variables to $2$ PCs) while retaining the vast majority ($> 80\%$) of the original information/variance.

2. **Elimination of Multicollinearity:** Because all Principal Components are mutually orthogonal (uncorrelated), they can be used as predictors in regression analysis (Principal Component Regression) to completely eliminate multicollinearity.

3. **Visualization of High-Dimensional Data:** Plotting the first two or three PCs (e.g., via 2D score plots or biplots) allows analysts to visually inspect clusters, patterns, and outliers that cannot be seen in high-dimensional space.

4. **Composite Index Creation:** The first Principal Component ($\text{PC}_1$) provides an objective, variance-maximizing weighted index to rank or score observations across multiple attributes simultaneously.