# 23 Batch | Final Examination | October 2025 | DA2451

## Multivariate Methods in Business — Master Beginner Teaching Guide & Complete Worked Solutions

---

# PART I: MULTIPLE CHOICE QUESTIONS `[Total: 60 Marks — 2 Marks Each]`

Welcome to Part I of the October 2025 Final Examination! In this guide, we assume **zero prior background** in statistics or multivariate mathematics. For every single Multiple Choice Question (MCQ 1 through MCQ 30), we will:
1. **Explain the core statistical concept from scratch** in plain, everyday English.
2. **Walk through every option** so you understand not only why the correct answer is right, but also why the other options are wrong.

---

## MCQ 1

**Question Reference:** *Let $X$ be an $n \times p$ data matrix. Which statement about centering and scaling for multivariate analysis is true?*

* *(a) Centering changes the pairwise correlation structure but not the covariance matrix*
* *(b) Scaling by the sample standard deviations changes the principal component directions obtained from the covariance matrix but not those from the correlation matrix*
* *(c) If variables are centered, the sample variance-covariance matrix $S$ has zero off-diagonal entries*
* *(d) Scaling by a diagonal matrix does not affect Mahalanobis distances between observations*

### Beginner’s Concept Explained from Scratch

First, what is an **$n \times p$ data matrix $X$**?
* Imagine an Excel spreadsheet with **$n$ rows** (where each row is an observation, like a customer or a company) and **$p$ columns** (where each column is a measured variable, like Age, Salary, or Height).

Second, what do **centering** and **scaling** mean?
1. **Centering** means subtracting the average (sample mean $\bar{x}_j$) from every number in column $j$:
   $$x_{ij}^{\text{centered}} = x_{ij} - \bar{x}_j$$
   * **What does centering do?** It shifts the center (average) of the data cloud to zero $(0, 0, \dots, 0)$, without stretching, rotating, or changing the shape of the cloud at all! Because variance, covariance, and correlation only measure how spread out points are *around their mean*, **centering does NOT change the covariance matrix $S$ or the correlation matrix $R$**.
2. **Scaling** (specifically, scaling by a diagonal matrix $D$ or by sample standard deviations $s_j$) means multiplying or dividing each column $j$ by a positive constant $d_j$ (for example, changing units from kilometers to meters, or dividing each variable by its standard deviation $s_j$ to standardize it):
   $$x_{ij}^{\text{scaled}} = \frac{x_{ij}}{s_j}$$

Now let us carefully evaluate what happens in options **(a), (b), (c), and (d)**:

* **Why (a) is FALSE:** Centering only shifts the mean to zero. It leaves *both* the covariance matrix $S$ and the pairwise correlation matrix $R$ completely unchanged.
* **Why (c) is FALSE:** Off-diagonal entries of $S$ are the **sample covariances** $s_{jk}$ between different variables. Subtracting the mean (centering) makes the column averages equal zero, *not* the covariances between variables!
* **Why (b) is TRUE (and (d) is also a classic invariance property):**
  * Look at **(b)**: Suppose we scale our variables by dividing each variable by its sample standard deviation $s_j$ (standardizing the variables).
    * Before scaling, the **covariance matrix of the raw variables** is $S$, and its Principal Component directions (eigenvectors) are heavily influenced by whichever variable has the largest units/variance. After dividing each variable by its standard deviation $s_j$, the covariance matrix of the scaled variables becomes the **correlation matrix $R$**! Because the eigenvectors of $R$ are different from the eigenvectors of $S$, **scaling by the sample standard deviations changes the principal component directions obtained from the covariance matrix**.
    * On the other hand, what about the principal component directions obtained from the **correlation matrix**? Correlation is already standardized (scale-invariant)! Scaling variables by positive constants (such as $1/s_j$) does **not** change the correlation matrix $R$ at all, so it does **not** change the principal component directions obtained from the correlation matrix!
  * *Note on Option (d):* Mathematically, if you transform $X$ by a non-singular diagonal scaling matrix $D$ so that $Y = XD$, the new sample covariance matrix is $S_Y = D S_X D$, whose inverse is $S_Y^{-1} = D^{-1} S_X^{-1} D^{-1}$. Then the Mahalanobis distance between rows $i$ and $k$ is:
    $$d_M^2(y_i, y_k) = (y_i - y_k)' S_Y^{-1} (y_i - y_k) = (x_i - x_k)' D (D^{-1} S_X^{-1} D^{-1}) D (x_i - x_k) = (x_i - x_k)' S_X^{-1} (x_i - x_k) = d_M^2(x_i, x_k)$$
    Thus, both **(b)** and **(d)** state true mathematical properties of scaling in multivariate analysis, with **(b)** directly testing the effect of standardization (scaling by sample standard deviations) on PCA via $S$ vs. $R$, and **(d)** testing the scale-invariance of Mahalanobis distance.

> **Correct Answer for MCQ 1:** **(b) Scaling by the sample standard deviations changes the principal component directions obtained from the covariance matrix but not those from the correlation matrix** *(Note: **(d)** is also mathematically true since Mahalanobis distance is scale-invariant).*

---

## MCQ 2

**Question Reference:** *Which statement correctly describes the key difference between Euclidean and Mahalanobis distances?*

* *(a) Euclidean distance assumes variables are correlated*
* *(b) Mahalanobis distance removes scale and correlation effects*
* *(c) Mahalanobis distance depends only on the mean vector*
* *(d) Euclidean distance is invariant to linear transformations*

### Beginner’s Concept Explained from Scratch

Suppose we want to measure the "distance" between two customers based on **$X_1 =$ Age (in years)** and **$X_2 =$ Annual Income (in rupees)**.
1. **Euclidean Distance (Ordinary Ruler Distance):**
   $$d_E(x, y) = \sqrt{(x_1 - y_1)^2 + (x_2 - y_2)^2}$$
   * Euclidean distance treats all variables as if they have the **exact same scale** and are **completely uncorrelated (independent)**.
   * Because Income is measured in hundreds of thousands while Age is measured in tens, Income completely dominates Euclidean distance! Furthermore, if Age and Income are correlated, Euclidean distance double-counts the shared information.
2. **Mahalanobis Distance (Statistical Distance):**
   $$d_M(x, y) = \sqrt{(x - y)' S^{-1} (x - y)}$$
   * By multiplying by the inverse of the covariance matrix ($S^{-1}$), Mahalanobis distance **divides out the variance (scale) of each variable** and **strips away the correlation between variables**.

### Why the Other Options Are Incorrect

* **(a) is FALSE:** Euclidean distance ignores correlation (it effectively assumes variables are *uncorrelated* and have equal variance).
* **(c) is FALSE:** Mahalanobis distance between two observations depends on the **covariance matrix $S$** (and when measuring distance from the center, on both $\bar{x}$ and $S$).
* **(d) is FALSE:** Euclidean distance changes drastically if you stretch or scale an axis (a linear transformation). It is *Mahalanobis* distance that is invariant to non-singular linear transformations!

> **Correct Answer for MCQ 2:** **(b) Mahalanobis distance removes scale and correlation effects**

---

## MCQ 3

**Question Reference:** *Which display is most appropriate when you want to visualize pairwise linear relationships and marginal distributions for a $p$-variable dataset (with $p$ moderately large, e.g. $p = 8$)?*

* *(a) Parallel coordinates plot*
* *(b) Biplot of the first two principal components*
* *(c) Matrix of scatterplots with histograms on the diagonal*
* *(d) 3D scatterplot of the first three variables*

### Beginner’s Concept Explained from Scratch

Let us break down the two specific things the question asks us to visualize for our $p = 8$ variables:
1. **"Pairwise linear relationships":** How every pair of variables $(X_j, X_k)$ relates to each other. The best plot for seeing the relationship between a pair of variables is a **2D scatterplot**. When we arrange scatterplots for all pairs of variables in a grid, it is called a **Scatterplot Matrix (or `pairs()` plot in R)**.
2. **"Marginal distributions":** The individual distribution (shape, center, skewness) of each single variable $X_j$ by itself. The classic plot for a single variable's marginal distribution is a **histogram** (or kernel density curve) placed along the **main diagonal** of the scatterplot matrix!

### Why the Other Options Are Incorrect

* **(a) Parallel coordinates plot:** Draws each observation as a line across parallel axes; it does not directly display marginal histograms or $x$-vs-$y$ pairwise scatterplots.
* **(b) Biplot:** Projects all variables onto just the first two Principal Components ($\text{PC}_1$ and $\text{PC}_2$), rather than showing individual pairwise relationships and marginal distributions of the $8$ original variables.
* **(d) 3D scatterplot of the first three variables:** Completely ignores variables $4, 5, 6, 7,$ and $8$!

> **Correct Answer for MCQ 3:** **(c) Matrix of scatterplots with histograms on the diagonal**

---

## MCQ 4

**Question Reference:** *Which visual tool best helps identify relationships among multiple variables across cases?*

* *(a) Histogram*
* *(b) Boxplot*
* *(c) Parallel coordinates plot*
* *(d) Bar chart*

### Beginner’s Concept Explained from Scratch

* **Histograms (a), Boxplots (b), and Bar charts (d)** are **univariate** (one-variable) displays—they summarize one variable at a time and do not track how an individual case (observation) behaves across $5$ or $10$ variables simultaneously.
* A **Parallel Coordinates Plot (c)** places all $p$ variables as vertical axes side-by-side and draws each **case (observation)** as a connected profile line running across all axes. This allows us to trace how multiple variables relate to one another **across cases** (for example, seeing if cases that are high on Variable 1 and Variable 2 are consistently low on Variable 3).

> **Correct Answer for MCQ 4:** **(c) Parallel coordinates plot**

---

## MCQ 5

**Question Reference:** *For multivariate normal data, which method is commonly used to detect multivariate outliers?*

* *(a) Observations with large univariate $z$-scores in at least one variable*
* *(b) Observations with large Mahalanobis distances relative to a $\chi_p^2$ reference*
* *(c) Observations with large Euclidean distances from the centroid*
* *(d) Observations with high leverage in linear regression only*

### Beginner’s Concept Explained from Scratch

Suppose our dataset $X_1, X_2, \dots, X_n$ comes from a **$p$-variate Normal distribution** $N_p(\mu, \Sigma)$.
* For each observation $x_i$, we compute its **squared Mahalanobis distance** from the sample mean vector $\bar{x}$:
  $$D_i^2 = (x_i - \bar{x})' S^{-1} (x_i - \bar{x})$$
* A foundational theorem of multivariate statistics states that when the data come from a $p$-variate normal distribution (and $n$ is reasonably large), the squared Mahalanobis distance $D_i^2$ approximately follows a **Chi-square distribution with $p$ degrees of freedom ($\chi_p^2$)**!
* Therefore, any observation whose $D_i^2$ exceeds a high quantile of the $\chi_p^2$ distribution (or sticks out on a Chi-square Q-Q plot of $D_i^2$ vs. $\chi_p^2$ quantiles) is flagged as a **multivariate outlier**.

### Why the Other Options Are Incorrect

* **(a)** Looking only at univariate $z$-scores misses observations that are normal on each variable individually but violate the correlation pattern between variables.
* **(c)** Euclidean distance ignores scale differences and correlations among variables.
* **(d)** Leverage applies only to predictor space in regression, not general multivariate data outlier detection.

> **Correct Answer for MCQ 5:** **(b) Observations with large Mahalanobis distances relative to a $\chi_p^2$ reference**

---

## MCQ 6

**Question Reference:** *In multivariate analysis, why is it generally inadvisable to perform separate univariate $t$-tests on each response variable?*

* *(a) Univariate tests assume all variables are independent*
* *(b) Univariate tests always underestimate variability*
* *(c) Univariate tests require normality for each variable*
* *(d) Univariate tests inflate the type-I error rate and ignore correlations*

### Beginner’s Concept Explained from Scratch

Suppose we compare two groups across $p = 5$ response variables using significance level $\alpha = 0.05$. Why shouldn't we just run $5$ separate univariate $t$-tests?
1. **Inflation of the Type-I Error Rate (Familywise Error Rate):**
   Each single $t$-test has a $5\%$ chance of a false positive (Type-I error). If you run $p$ independent tests at $\alpha = 0.05$, the probability of getting *at least one* false positive across the set of tests jumps to $1 - (1 - 0.05)^p$. For $p = 5$, that is $1 - 0.95^5 \approx 22.6\%$—more than four times higher than $5\%$!
2. **Ignoring Correlations Among Variables:**
   Separate univariate $t$-tests look at one variable at a time in complete isolation. They completely ignore the **correlations (covariances)** between the response variables, missing joint differences that are only visible when variables are examined together!

Option **(d)** captures *both* of these crucial statistical reasons completely and accurately.

> **Correct Answer for MCQ 6:** **(d) Univariate tests inflate the type-I error rate and ignore correlations**

---

## MCQ 7

**Question Reference:** *Which interpretation of significant MANOVA result is correct?*

* *(a) The groups differ in the multivariate mean vectors (some linear combination differs)*
* *(b) At least one response variable has a significant univariate ANOVA $F$*
* *(c) Every linear combination of responses differs across groups*
* *(d) There is heteroscedasticity among groups*

### Beginner’s Concept Explained from Scratch

In **One-Way MANOVA (Multivariate Analysis of Variance)** across $g$ groups with $p$ response variables, the null and alternative hypotheses are:
* $H_0: \mu_1 = \mu_2 = \dots = \mu_g$ (all $g$ groups have the exact same $p \times 1$ population mean vector).
* $H_1:$ At least two groups differ in their **multivariate mean vectors** $\mu_k$.

By **Roy’s Union-Intersection Principle**, saying that the multivariate mean vectors differ ($\mu_j \neq \mu_k$) is mathematically equivalent to saying that **there exists at least one ("some") linear combination of the response variables ($a'X$) whose mean differs significantly across the groups**!

### Why the Other Options Are Incorrect

* **(b) is FALSE:** Because MANOVA uses the correlation between variables, you can have a **significant MANOVA** even when **none** of the individual univariate ANOVA $F$-tests are significant on their own!
* **(c) is FALSE:** Only *some* (at least one) linear combination needs to differ across groups, not *every* linear combination.
* **(d) is FALSE:** Heteroscedasticity means unequal variances/covariances; MANOVA tests equality of **mean vectors** (while *assuming* homoscedasticity).

> **Correct Answer for MCQ 7:** **(a) The groups differ in the multivariate mean vectors (some linear combination differs)**

---

## MCQ 8

**Question Reference:** *In a multiple-response regression model, residual plots show that errors across dependent variables are highly correlated. What does this suggest about the model?*

* *(a) The model satisfies the independence assumption*
* *(b) A univariate model for each response is sufficient*
* *(c) A Multivariate Multiple Linear Regression model is appropriate*
* *(d) Principal Component Analysis should replace the regression analysis*

### Beginner’s Concept Explained from Scratch

Suppose we are predicting multiple dependent (response) variables $Y_1, Y_2, \dots, Y_m$ from a set of predictors $X_1, \dots, X_p$.
* For each response $Y_k$, there is an error (residual) term $\varepsilon_k$.
* If the errors $\varepsilon_1, \varepsilon_2, \dots, \varepsilon_m$ across the different dependent variables are **highly correlated** ($\text{Cov}(\varepsilon_j, \varepsilon_k) = \sigma_{jk} \neq 0$), fitting separate univariate regressions for each response (b) ignores this cross-equation correlation and prevents valid joint inference.
* Instead, **Multivariate Multiple Linear Regression (MMLR)** is specifically designed for multiple responses whose error terms are correlated across dependent variables ($\text{Cov}(\varepsilon_i) = \Sigma$), allowing us to account for the error covariance matrix $\Sigma$ in joint hypothesis tests and confidence regions!

> **Correct Answer for MCQ 8:** **(c) A Multivariate Multiple Linear Regression model is appropriate**

---

## MCQ 9

**Question Reference:** *Why are multivariate test statistics like Wilks' Lambda used in multivariate regression?*

* *(a) To test all dependent variables jointly for predictor effects*
* *(b) To avoid computing covariance matrices*
* *(c) To compare independent variable means*
* *(d) To test assumptions of normality*

### Beginner’s Concept Explained from Scratch

In **Multivariate Multiple Linear Regression (MMLR)**, we have multiple dependent variables ($Y_1, Y_2, \dots, Y_m$). Suppose we want to test whether a predictor $X_j$ (or a subset of predictors) has a real effect on the responses.
* Instead of testing $Y_1$, $Y_2$, $\dots$, $Y_m$ one by one, we want a single joint test of the hypothesis that $X_j$ has zero effect across **all dependent variables simultaneously** ($H_0: \beta_{j1} = \beta_{j2} = \dots = \beta_{jm} = 0$).
* **Wilks’ Lambda ($\Lambda$)** compares the determinant of the error sum of squares and cross-products matrix under the full model to that under the reduced model **to test all dependent variables jointly for predictor effects**!

> **Correct Answer for MCQ 9:** **(a) To test all dependent variables jointly for predictor effects**

---

## MCQ 10

**Question Reference:** *Population principal components are defined as*

* *(a) Orthogonal linear combinations of the variables that maximize the common variance*
* *(b) Loadings from factor analysis under orthogonal rotation*
* *(c) The columns of the sample covariance matrix*
* *(d) Linear combinations that make variables independent*

### Beginner’s Concept Explained from Scratch

Let us carefully examine how **Principal Components (PCs)** are defined in multivariate analysis:
* Given a vector of random variables $X = (X_1, X_2, \dots, X_p)'$ with covariance matrix $\Sigma$, the **population principal components** $Y_1 = e_1'X, \, Y_2 = e_2'X, \dots, Y_p = e_p'X$ are **orthogonal (mutually uncorrelated) linear combinations of the variables** chosen sequentially to **maximize variance** (the first PC maximizes $\text{Var}(e_1'X)$ subject to $e_1'e_1 = 1$, the second maximizes $\text{Var}(e_2'X)$ subject to $e_2'e_2 = 1$ and $e_2'e_1 = 0$, and so on).
* **Comparing the four options:**
  * **(b) is FALSE** because principal components are linear combinations of variables in PCA, not loadings from Factor Analysis.
  * **(c) is FALSE** because the columns of the sample covariance matrix $S$ are covariances, not principal components.
  * **(d) is FALSE** because in general (when $X$ is not multivariate normal), making linear combinations *uncorrelated* ($\text{Cov}(Y_i, Y_k) = 0$) does *not* make them statistically *independent*, and PCA specifically requires *orthogonal* (unit-length, mutually perpendicular) coefficient vectors that maximize variance.
  * **(a)** states *"Orthogonal linear combinations of the variables that maximize the \[total/overall\] variance"* (note that the exam paper phrasing wrote "common variance" where "total variance" is the strict PCA term, making **(a)** the intended definition of population principal components as orthogonal variance-maximizing linear combinations).

> **Correct Answer for MCQ 10:** **(a) Orthogonal linear combinations of the variables that maximize the common \[total\] variance**

---

## MCQ 11

**Question Reference:** *A biplot depicts*

* *(a) Only the principal component loadings*
* *(b) Only observation scores on two principal components*
* *(c) Both observation scores and variable loadings on the same plot, typically for two principal components*
* *(d) Scree plot and cumulative variance together*

### Beginner’s Concept Explained from Scratch

Why is it called a **"Bi-plot"**?
The prefix **"Bi-"** means **two**! It does *not* mean two axes ($\text{PC}_1$ and $\text{PC}_2$); it means displaying **two types of information (rows and columns of the data matrix) on the exact same graph**:
1. **Observation scores (the rows/cases):** Plotted as **points (dots or labels)** showing where each observation sits on $\text{PC}_1$ (horizontal axis) and $\text{PC}_2$ (vertical axis).
2. **Variable loadings (the columns/variables):** Plotted as **vectors (arrows)** starting from the origin $(0,0)$, showing how each original variable contributes to $\text{PC}_1$ and $\text{PC}_2$.

> **Correct Answer for MCQ 11:** **(c) Both observation scores and variable loadings on the same plot, typically for two principal components**

---

## MCQ 12

**Question Reference:** *A Principal Component Analysis conducted on standardized variables yields eigenvalues 3.8, 1.7, 0.9, and 0.6. How many principal components should be retained using Kaiser's criterion?*

* *(a) One*
* *(b) Two*
* *(c) Three*
* *(d) Four*

### Beginner’s Concept Explained from Scratch

1. **What does "standardized variables" mean?**
   Each original variable has been scaled to have a variance equal to **$1.0$**.
2. **What is Kaiser's Criterion (Kaiser's Rule)?**
   When PCA is performed on standardized variables (i.e., using the correlation matrix $R$), **Kaiser's criterion** states that we should **retain only those Principal Components whose eigenvalue is greater than $1.0$ ($\lambda_i > 1$)**.
   * *Why $1.0$?* Because a single standardized variable has a variance of $1.0$. If a Principal Component has an eigenvalue (variance) less than $1.0$, it explains *less* variance than a single original variable by itself, so it is not worth keeping!
3. **Let's check our four eigenvalues:**
   * $\lambda_1 = 3.8 > 1.0 \implies$ **Keep!** (Component 1)
   * $\lambda_2 = 1.7 > 1.0 \implies$ **Keep!** (Component 2)
   * $\lambda_3 = 0.9 < 1.0 \implies$ Drop.
   * $\lambda_4 = 0.6 < 1.0 \implies$ Drop.

Only **two** eigenvalues ($3.8$ and $1.7$) are greater than $1.0$.

> **Correct Answer for MCQ 12:** **(b) Two**

---

## MCQ 13

**Question Reference:** *How does Factor Analysis (FA) differ conceptually from Principal Component Analysis (PCA)?*

* *(a) FA explains shared variance among variables via latent factors; PCA decomposes total variance*
* *(b) PCA estimates latent factors; FA estimates principal components*
* *(c) FA requires orthogonal variables; PCA does not*
* *(d) FA ignores correlations among observed variables*

### Beginner’s Concept Explained from Scratch

This is one of the most important conceptual distinctions in multivariate statistics:
* **Principal Component Analysis (PCA):**
  Takes the **total variance** of all observed variables and decomposes 100% of it into orthogonal linear combinations (Principal Components), without separating shared variance from unique error variance.
* **Factor Analysis (FA):**
  Splits each variable's variance into two parts:
  $$\text{Total Variance} = \underbrace{\text{Communality (Shared / Common Variance)}}_{\text{Explained by Latent Factors } F_1, \dots, F_m} + \underbrace{\text{Specific Variance }(\psi_i)}_{\text{Unique / Error Variance}}$$
  Thus, **FA explains the shared (common) variance (and correlations/covariances) among observed variables via underlying unobservable latent factors**, whereas **PCA decomposes total variance**!

> **Correct Answer for MCQ 13:** **(a) FA explains shared variance among variables via latent factors; PCA decomposes total variance**

---

## MCQ 14

**Question Reference:** *What is the main objective of Confirmatory Factor Analysis?*

* *(a) To explore factor structure without hypotheses*
* *(b) To test a predefined factor model based on theory*
* *(c) To estimate the number of clusters*
* *(d) To maximize explained variance*

### Beginner’s Concept Explained from Scratch

There are two types of Factor Analysis:
1. **Exploratory Factor Analysis (EFA):** Used when you do *not* have a pre-existing theory about how many factors exist or which variables load on which factors—you let the data *explore* the structure (Option (a)).
2. **Confirmatory Factor Analysis (CFA):** Used when you already have a solid theory or prior research that specifies **how many latent factors exist** and **exactly which survey items/variables measure each factor**. The main objective of CFA is **to test whether this predefined, theory-based factor model fits the observed data**!

> **Correct Answer for MCQ 14:** **(b) To test a predefined factor model based on theory**

---

## MCQ 15

**Question Reference:** *What is the purpose of factor rotation in FA?*

* *(a) To increase the number of extracted factors*
* *(b) To remove correlated variables*
* *(c) To reduce communalities*
* *(d) To simplify interpretation by achieving simple structure*

### Beginner’s Concept Explained from Scratch

When we first extract factors in Factor Analysis, the initial factor loading matrix is often difficult to interpret because single variables load moderately on multiple factors at the same time.
* **Factor rotation** (such as orthogonal **Varimax** rotation or oblique **Promax/Oblimin** rotation) rotates the factor axes in multidimensional space **without changing the total variance explained or the communalities** of the variables (so (a) and (c) are false).
* Its sole purpose is **to simplify the interpretation of the factors by achieving "simple structure"**—a clean pattern where each variable has a high loading on **one** factor and near-zero loadings on the remaining factors!

> **Correct Answer for MCQ 15:** **(d) To simplify interpretation by achieving simple structure**

---

## MCQ 16

**Question Reference:** *A researcher runs an Exploratory Factor Analysis and finds that several variables load significantly ($\ge 0.4$) on more than one factor. What should he do next?*

* *(a) Drop those variables automatically*
* *(b) Increase the number of extracted factors*
* *(c) Apply an orthogonal or oblique rotation to achieve a simpler structure*
* *(d) Switch to PCA*

### Beginner’s Concept Explained from Scratch

When several variables load significantly ($\ge 0.4$) on more than one factor in an initial unrotated Exploratory Factor Analysis (this is called **cross-loading**), it means the initial factor axes are pointing *between* clusters of variables rather than directly through them.
* Before deleting variables (a) or changing the number of factors (b), the standard next step in EFA is to **apply a factor rotation**—either an **orthogonal rotation** (like Varimax, which keeps factors uncorrelated) or an **oblique rotation** (like Promax or Oblimin, which allows factors to correlate)—**to align the axes with the variable clusters and achieve a simpler, cleaner loading structure**!

> **Correct Answer for MCQ 16:** **(c) Apply an orthogonal or oblique rotation to achieve a simpler structure**

---

## MCQ 17

**Question Reference:** *In discriminant analysis, which assumption differentiates Linear Discriminant Analysis (LDA) from Quadratic Discriminant Analysis (QDA)?*

* *(a) Equal class priors*
* *(b) Equal covariance matrices across groups*
* *(c) Normality of predictors*
* *(d) Independence of observations*

### Beginner’s Concept Explained from Scratch

Both **Linear Discriminant Analysis (LDA)** and **Quadratic Discriminant Analysis (QDA)** classify observations into $g$ predefined groups by assuming that the predictors $X$ within each group $k$ follow a Multivariate Normal distribution $N_p(\mu_k, \Sigma_k)$ (so both assume normality of predictors within groups and independence of observations).
* **How do LDA and QDA differ?**
  * **LDA assumes that all groups share the exact same covariance matrix** ($\Sigma_1 = \Sigma_2 = \dots = \Sigma_g = \Sigma$, called **homoscedasticity** or **equal covariance matrices across groups**). Because $\Sigma$ is identical across groups, the quadratic terms $x'\Sigma^{-1}x$ cancel out when comparing groups, resulting in **linear** decision boundaries!
  * **QDA allows each group to have its own different covariance matrix** ($\Sigma_k \neq \Sigma_j$). Because $\Sigma_k^{-1}$ does not cancel out, the decision boundaries between groups are **quadratic (curved)**!

> **Correct Answer for MCQ 17:** **(b) Equal covariance matrices across groups**

---

## MCQ 18

**Question Reference:** *In discriminant analysis, the Mahalanobis distance between two group centroids is large and statistically significant. What does this imply?*

* *(a) The two groups have highly overlapping distributions*
* *(b) The groups are well separated in multivariate space*
* *(c) The within-group variance is minimal*
* *(d) The discriminant function is not useful*

### Beginner’s Concept Explained from Scratch

What is a **group centroid**? It is simply the multivariate mean vector $\bar{x}_k$ (the center point) of group $k$ in $p$-dimensional space.
* The **Mahalanobis distance between two group centroids** ($D^2 = (\bar{x}_1 - \bar{x}_2)' S_{\text{pooled}}^{-1} (\bar{x}_1 - \bar{x}_2)$) measures how far apart the centers of Group 1 and Group 2 are, relative to the spread (covariance) within the groups.
* If this Mahalanobis distance is **large and statistically significant**, it means the two group centers are far apart relative to their spread—in other words, **the groups are well separated in multivariate space** (meaning there is very little overlap between them, and our discriminant function will classify observations with high accuracy!).

> **Correct Answer for MCQ 18:** **(b) The groups are well separated in multivariate space**

---

## MCQ 19

**Question Reference:** *In LDA with $g$ groups, what is the maximum number of discriminant functions that can be obtained?*

* *(a) $p$ (number of variables)*
* *(b) $g$*
* *(c) $g - 1$*
* *(d) $p - g$*

### Beginner’s Concept Explained from Scratch

Let us understand the geometry of **Linear Discriminant Analysis (LDA)** with $g$ groups and $p$ predictor variables:
* Think about points in space:
  * **$g = 2$ group centroids (2 points)** always lie on a **1-dimensional line** ($2 - 1 = 1$ discriminant function).
  * **$g = 3$ group centroids (3 points)** always lie on a **2-dimensional flat plane** ($3 - 1 = 2$ discriminant functions).
  * In general, **$g$ group centroids** span a subspace of at most **$g - 1$ dimensions**!
* Mathematically, the maximum number of linear discriminant functions is $\min(p, \, g - 1)$. When $p \ge g - 1$ (the standard case where you have at least as many predictors as groups minus one), the maximum number of discriminant functions that can be obtained to separate $g$ groups is **$g - 1$**!

> **Correct Answer for MCQ 19:** **(c) $g - 1$**

---

## MCQ 20

**Question Reference:** *A researcher applies LDA to classify patients into "diabetic" and "non-diabetic." The group covariance matrices appear significantly different based on Box's M test ($p < 0.01$). Which action is most appropriate?*

* *(a) Continue with LDA since small $p$-values are desirable*
* *(b) Drop correlated predictors to restore equality of covariance matrices*
* *(c) Switch to QDA*
* *(d) Use PCA instead of a classification method*

### Beginner’s Concept Explained from Scratch

1. **What does Box's M test check?**
   Box's M test checks the null hypothesis that the population covariance matrices are equal across all groups:
   $$H_0: \Sigma_{\text{diabetic}} = \Sigma_{\text{non-diabetic}}$$
2. **What does $p < 0.01$ mean?**
   Because the $p$-value is very small ($p < 0.01 < 0.05$), we **reject $H_0$**! This means the two groups have **significantly different covariance matrices** ($\Sigma_{\text{diabetic}} \neq \Sigma_{\text{non-diabetic}}$).
3. **What should the researcher do?**
   Since Linear Discriminant Analysis (LDA) requires equal covariance matrices across groups, violating this assumption can distort LDA's linear classification boundary. The direct extension of discriminant analysis that allows **unequal covariance matrices across groups** is **Quadratic Discriminant Analysis (QDA)**! Therefore, the researcher should **switch to QDA**.

> **Correct Answer for MCQ 20:** **(c) Switch to QDA**

---

## Beginner’s Master Cheat-Sheet for Research Technique Selection (MCQs 21 – 30)

For MCQs 21 through 30, we must recommend the single best multivariate statistical technique from the following 10 abbreviations. Let us learn a crystal-clear rule for spotting each one instantly:

| Abbreviation | Full Name | How to Spot It Instantly in a Question |
| :--- | :--- | :--- |
| **CA** | **Cluster Analysis** | Grouping **observations/people/shoppers** into natural clusters when there are **no prior group labels** (unsupervised learning). |
| **CFA** | **Confirmatory Factor Analysis** | Testing whether data fit a **pre-specified / hypothesized latent factor model** (you already know the names/number of constructs). |
| **EFA** | **Exploratory Factor Analysis** | **Discovering/identifying unknown latent dimensions (factors)** underlying a set of survey items or attributes. |
| **LDA** | **Linear Discriminant Analysis** | Classifying observations into **predefined categorical groups** using continuous predictors when boundaries are **linear** (equal group covariances). |
| **LR** | **Logistic Regression** | Predicting a **binary outcome ($1$ vs. $0$, e.g., churn vs. retain)** and specifically **estimating probabilities** for each individual. |
| **MANOVA** | **Multivariate Analysis of Variance** | Testing whether the **mean vectors of multiple continuous responses** differ across **categorical groups**. |
| **MMLR** | **Multivariate Multiple Linear Regression** | Using multiple continuous predictors to jointly predict **multiple continuous outcome/response variables**. |
| **PCA** | **Principal Component Analysis** | Reducing a large set of correlated continuous variables into a smaller set of **orthogonal components** that summarize **major total variation patterns**. |
| **PCR** | **Principal Component Regression** | Reducing highly correlated predictors via PCA *first* and then using those components in a **regression to predict a response**, avoiding **multicollinearity**. |
| **QDA** | **Quadratic Discriminant Analysis** | Classifying observations into **predefined categorical groups** when group covariance matrices differ or **separation boundaries are non-linear (curved)**. |

---

## MCQ 21

**Question Reference:** *A cognitive neuroscientist records five brain wave measures (EEG frequencies) from patients with and without mild cognitive impairment. She wants to test whether overall neural activity profiles differ between the two groups.*

* *(a) CFA*
* *(b) EFA*
* *(c) MANOVA*
* *(d) MMLR*

### Beginner’s Step-by-Step Identification

1. **What are the Dependent (Response) Variables?** Five continuous brain wave measures ($Y_1, Y_2, Y_3, Y_4, Y_5$).
2. **What is the Independent (Grouping) Variable?** A categorical variable with two groups: **Patients with vs. without mild cognitive impairment**.
3. **What is the Goal?** To test whether the **overall neural activity profiles (the 5-variable mean vectors)** differ between the two groups.
4. **Matching Technique:** Testing whether the mean vectors of multiple continuous responses differ across categorical groups is **MANOVA**!

> **Correct Answer for MCQ 21:** **(c) MANOVA**

---

## MCQ 22

**Question Reference:** *A financial analyst investigates how interest rate, inflation, GDP growth, and unemployment jointly predict three financial outcomes (stock market index return, bond yield, and exchange rate).*

* *(a) LR*
* *(b) MANOVA*
* *(c) MMLR*
* *(d) PCR*

### Beginner’s Step-by-Step Identification

1. **What are the Dependent (Outcome) Variables?** Three continuous financial outcomes ($Y_1 =$ stock market index return, $Y_2 =$ bond yield, $Y_3 =$ exchange rate).
2. **What are the Independent (Predictor) Variables?** Four continuous macroeconomic predictors ($X_1 =$ interest rate, $X_2 =$ inflation, $X_3 =$ GDP growth, $X_4 =$ unemployment).
3. **What is the Goal?** Jointly predicting **multiple continuous outcomes** from **multiple continuous predictors**.
4. **Matching Technique:** **MMLR (Multivariate Multiple Linear Regression)**!

> **Correct Answer for MCQ 22:** **(c) MMLR**

---

## MCQ 23

**Question Reference:** *A marketing researcher collects data on 20 product attributes (price perception, quality, trust, aesthetics, etc.) rated by consumers. She wishes to identify latent dimensions that represent how consumers evaluate products.*

* *(a) LDA*
* *(b) CFA*
* *(c) EFA*
* *(d) PCA*

### Beginner’s Step-by-Step Identification

1. **What is the Goal?** The researcher has $20$ observed consumer ratings and wishes to **identify (discover) latent dimensions (hidden factors)** that represent how consumers evaluate products.
2. **Is there a pre-specified factor model to test, or is she exploring to identify the latent dimensions?** She is exploring to **identify latent dimensions** without a prior hypothesized structure.
3. **Why EFA instead of PCA?** Because the question explicitly asks to identify **latent dimensions** (factors explaining shared evaluation constructs), which is the hallmark of **Exploratory Factor Analysis (EFA)**!

> **Correct Answer for MCQ 23:** **(c) EFA**

---

## MCQ 24

**Question Reference:** *A medical researcher records biochemical markers from cancer patients and non-cancer controls to create a function that best classifies new patients into one of the two categories.*

* *(a) LDA*
* *(b) LR*
* *(c) PCA*
* *(d) QDA*

### Beginner’s Step-by-Step Identification

1. **What is the Goal?** To **create a function (discriminant function) that best classifies new patients** into one of two predefined categories (cancer vs. non-cancer) using continuous biochemical markers.
2. **What about Model Assumptions?** Remember the instruction right above MCQ 21: *"Assume that all model assumptions are satisfied unless otherwise stated."* When all standard assumptions (multivariate normality and equal covariance matrices) are satisfied and we want a classification/discriminant function based on continuous markers, the classic method is **Linear Discriminant Analysis (LDA)**!

> **Correct Answer for MCQ 24:** **(a) LDA**

---

## MCQ 25

**Question Reference:** *In a consumer behavior study, researchers wish to identify clusters of shoppers based on their spending patterns, visit frequency, and product preferences, without prior group labels.*

* *(a) CA*
* *(b) EFA*
* *(c) LDA*
* *(d) PCA*

### Beginner’s Step-by-Step Identification

1. **What are we grouping?** We are grouping **shoppers (observations/cases)**.
2. **Are there prior group labels?** **No** (*"without prior group labels"*).
3. **Matching Technique:** Discovering natural groups of observations without prior group labels is **Cluster Analysis (CA)**!

> **Correct Answer for MCQ 25:** **(a) CA**

---

## MCQ 26

**Question Reference:** *A data scientist analyzes highly correlated financial indicators (e.g., market volatility indices) to predict future stock returns. She wants to reduce predictor dimensionality before regression to avoid multicollinearity.*

* *(a) LR*
* *(b) MMLR*
* *(c) PCA*
* *(d) PCR*

### Beginner’s Step-by-Step Identification

Look at the two-step workflow described in the question:
1. She has **highly correlated financial indicators** (predictors) and wants to **reduce predictor dimensionality** into uncorrelated Principal Components to **avoid multicollinearity**, AND
2. Use those components in a **regression to predict future stock returns**!
Combining Principal Component Analysis (to orthogonalize and reduce predictors) with linear regression (to predict a continuous outcome) is called **Principal Component Regression (PCR)**!

> **Correct Answer for MCQ 26:** **(d) PCR**

---

## MCQ 27

**Question Reference:** *A geneticist collects data on gene expression levels for 50 genes from 200 individuals. The goal is to reduce the large number of correlated gene variables into a smaller set of orthogonal components that summarize major variation patterns in the data.*

* *(a) EFA*
* *(b) MANOVA*
* *(c) PCA*
* *(d) QDA*

### Beginner’s Step-by-Step Identification

Look at the exact keywords in the prompt:
* *"reduce the large number of correlated gene variables into a smaller set of **orthogonal components** that **summarize major variation patterns** in the data."*
* Transforming correlated variables into **orthogonal components** that maximize/summarize **total variation** is the textbook definition of **Principal Component Analysis (PCA)**!

> **Correct Answer for MCQ 27:** **(c) PCA**

---

## MCQ 28

**Question Reference:** *A clinical researcher builds a model to classify patients into "high-risk" or "low-risk" cardiovascular groups using cholesterol, blood pressure, BMI, and glucose as predictors. Early exploration shows non-linear separation boundaries between the groups.*

* *(a) CA*
* *(b) LDA*
* *(c) LR*
* *(d) QDA*

### Beginner’s Step-by-Step Identification

1. **What is the Goal?** Classifying patients into two predefined groups ("high-risk" vs. "low-risk") using four continuous predictors.
2. **What is the Key Clue?** *"Early exploration shows **non-linear separation boundaries** between the groups."*
3. **Why does this rule out LDA and LR?** Both standard LDA and standard Logistic Regression produce **linear** separation boundaries in the predictor space. **Quadratic Discriminant Analysis (QDA)** relaxes the equal-covariance assumption and produces **non-linear (quadratic/curved) separation boundaries** between groups!

> **Correct Answer for MCQ 28:** **(d) QDA**

---

## MCQ 29

**Question Reference:** *A developmental psychologist hypothesizes that "academic motivation" and "social engagement" are two latent constructs underlying responses to 15 survey items. She specifies a model and tests whether the observed data fit this hypothesized factor structure.*

* *(a) CFA*
* *(b) EFA*
* *(c) MANOVA*
* *(d) PCA*

### Beginner’s Step-by-Step Identification

Look at what the psychologist does:
1. She **hypothesizes in advance** the exact two latent constructs ("academic motivation" and "social engagement") underlying the 15 survey items.
2. She **specifies a model and tests whether the observed data fit this hypothesized factor structure**.
Testing a pre-specified, theory-driven latent factor structure is **Confirmatory Factor Analysis (CFA)**!

> **Correct Answer for MCQ 29:** **(a) CFA**

---

## MCQ 30

**Question Reference:** *A company wants to predict customer churn ($\text{churn} = 1$, $\text{retain} = 0$) using usage statistics, satisfaction ratings, and complaint frequency. The firm is less interested in dimensionality reduction and more in estimating probabilities for each customer.*

* *(a) LDA*
* *(b) LR*
* *(c) PCR*
* *(d) QDA*

### Beginner’s Step-by-Step Identification

1. **What is the Dependent Variable?** A **binary ($0/1$) categorical outcome**: $\text{churn} = 1$ vs. $\text{retain} = 0$.
2. **What is the Key Clue?** *"The firm is less interested in dimensionality reduction and more in **estimating probabilities for each customer**"* (and the predictors include a mix of usage statistics, satisfaction ratings on rating scales, and complaint frequency counts, which do not necessarily follow a multivariate normal distribution).
3. **Matching Technique:** Directly modeling the log-odds of a binary $(0/1)$ outcome to **estimate the probability of churn $P(Y = 1 \mid X)$ for each customer** is the hallmark of **Logistic Regression (LR)**!

> **Correct Answer for MCQ 30:** **(b) LR (Logistic Regression)**

---
---

# PART II: ESSAY QUESTIONS `[Total: 40 Marks]`

---

# Question 1 `[Total: 10 Marks]`

## Reference Setup from the Question

A nutrition researcher investigates the effect of a new dietary supplement on the nutrient profile of athletes. Each of the $n = 28$ athletes provided blood samples **both before and after** an 8-week supplementation program. Three continuous nutrient concentration measures were recorded for each athlete:
* $X_1 =$ Vitamin D ($\text{ng/mL}$)
* $X_2 =$ Iron ($\mu\text{g/dL}$)
* $X_3 =$ Calcium ($\text{mg/dL}$)

The researcher aims to determine whether the mean vector of nutrient levels changed significantly after supplementation. The following partial R output was obtained:

```
Difference data: (After - Before)
HotellingsT2(diff_data[, 1:3], mu = ??)
T.2 = 31.285, df = ??, p-value = 0.0012

mult.norm(diff_data[, 1:3])$mult.test
          Beta-hat     kappa    p-val
Skewness  0.926845  4.351241 0.853290
Kurtosis 11.973180 -0.984522 0.324465
```

---

## Beginner’s Concept Guide: Paired Multivariate Comparisons & One-Sample Hotelling’s $T^2$

Before answering a single sub-question, let us understand **what is happening in this experiment from scratch**:

1. **Why is this "Difference Data (After $-$ Before)"?**
   Notice that we do **not** have two separate groups of athletes! Instead, the **exact same $n = 28$ athletes** were measured twice: **Before** taking the supplement and **After** taking the supplement.
   For each athlete $i$ ($i = 1, 2, \dots, 28$), we subtract their "Before" blood test values from their "After" blood test values to get a $3 \times 1$ **difference vector** $D_i$:
   $$D_i = \begin{pmatrix} D_{i1} \\ D_{i2} \\ D_{i3} \end{pmatrix} = \begin{pmatrix} X_{1,\text{After}} - X_{1,\text{Before}} \\ X_{2,\text{After}} - X_{2,\text{Before}} \\ X_{3,\text{After}} - X_{3,\text{Before}} \end{pmatrix} = \begin{pmatrix} \text{Change in Vitamin D} \\ \text{Change in Iron} \\ \text{Change in Calcium} \end{pmatrix}$$
2. **What if the supplement had NO effect at all?**
   If the supplement does nothing, then on average, the change in Vitamin D is $0$, the change in Iron is $0$, and the change in Calcium is $0$!
   That means the population mean vector of the differences, $\mu_D = E(D)$, equals the **zero vector**:
   $$\mu_D = \begin{pmatrix} \mu_{D1} \\ \mu_{D2} \\ \mu_{D3} \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
3. **Why do we use Hotelling’s $T^2$ test here?**
   In basic (univariate) statistics, if you want to test whether the average change of *one* variable is zero, you use a **paired $t$-test** (which is just a one-sample $t$-test on the differences $D_i$).
   In **multivariate** statistics, we are testing **three** nutrient differences $(D_1, D_2, D_3)$ **simultaneously**! The multivariate version of the one-sample $t$-test is **Hotelling’s One-Sample $T^2$ Test**:
   $$T^2 = n (\bar{D} - \mu_0)' S_D^{-1} (\bar{D} - \mu_0)$$
   where:
   * $n = 28$ is the number of athletes,
   * $p = 3$ is the number of nutrients measured,
   * $\bar{D}$ is the $3 \times 1$ sample mean vector of the differences,
   * $S_D$ is the $3 \times 3$ sample covariance matrix of the differences, and
   * $\mu_0 = (0, 0, 0)'$ is the hypothesized mean difference vector under $H_0$.

---

## Part (a): Test whether there is evidence of a change in the mean nutrient profile after supplementation.

### (a)(i) State $H_0$ and $H_1$. `[2 marks]`

#### Beginner’s Explanation

* **Null Hypothesis ($H_0$):** Always represents the "no change / no effect" statement. If there is no change in the mean nutrient profile after supplementation, then the population mean vector of the differences (After $-$ Before), denoted by $\mu_D$ (or $\mu$), is equal to the $3 \times 1$ vector of zeros.
* **Alternative Hypothesis ($H_1$):** Represents what the researcher is testing for—that **at least one** nutrient’s mean concentration changed after supplementation ($\mu_D \neq 0$).

#### Complete Exam Answer for (a)(i)

Let $\mu_D = \begin{pmatrix} \mu_{D1} \\ \mu_{D2} \\ \mu_{D3} \end{pmatrix} = \mu_{\text{After}} - \mu_{\text{Before}}$ denote the population mean vector of the nutrient concentration differences (After $-$ Before) for Vitamin D ($X_1$), Iron ($X_2$), and Calcium ($X_3$).

* **Null Hypothesis ($H_0$):**
  $$H_0: \mu_D = \begin{pmatrix} \mu_{D1} \\ \mu_{D2} \\ \mu_{D3} \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
  *(There is no change in the population mean nutrient profile after the 8-week supplementation program).*

* **Alternative Hypothesis ($H_1$):**
  $$H_1: \mu_D = \begin{pmatrix} \mu_{D1} \\ \mu_{D2} \\ \mu_{D3} \end{pmatrix} \neq \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
  *(There is a statistically significant change in the population mean nutrient profile after supplementation; i.e., at least one nutrient mean changed).*

---

### (a)(ii) What value of `mu` should be entered in the `HotellingsT2()` function? `[2 marks]`

#### Beginner’s Explanation

In R, the function `HotellingsT2(diff_data[, 1:3], mu = ...)` tests whether the mean vector of the three columns of `diff_data` equals the hypothesized vector `mu`.
Since we are testing whether the mean differences (After $-$ Before) are equal to zero for all three nutrients, we must pass a vector of three zeros: `c(0, 0, 0)` (mathematically, $\mu_0 = (0, 0, 0)'$).

#### Complete Exam Answer for (a)(ii)

In R syntax, the value of `mu` to be entered is:
```r
mu = c(0, 0, 0)
```
*(or mathematically, the $3 \times 1$ zero vector $\mu_0 = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$, representing zero mean change for each of the $p = 3$ nutrients under $H_0$).*

---

### (a)(iii) Specify the approximate distribution of Hotelling's $T^2$-statistic, clearly indicating its parameters. `[2 marks]`

#### Beginner’s Explanation: Understanding Both the $F$-Distribution and $\chi^2$-Distribution of `HotellingsT2()` in R

Why does the R output say `T.2 = 31.285, df = ??, p-value = 0.0012`? Let us look at the two ways R’s `HotellingsT2()` function (from the `ICSNP` package) reports the distribution of the test statistic, so you understand **both** and can write a 100% bulletproof answer:

1. **Default `ICSNP::HotellingsT2()` Scaled $F$-Statistic (Why $p = 0.0012$ in the R Output!):**
   In R's `ICSNP` package, when `test = "f"` (the default when `test` is not specified, as in `HotellingsT2(diff_data[, 1:3], mu = c(0,0,0))`), R transforms Hotelling’s $T^2$ into the $F$-distributed statistic:
   $$F = \frac{n - p}{p(n - 1)} T^2 \sim F_{p, \, n - p}$$
   With $n = 28$ athletes and $p = 3$ variables:
   * First degrees of freedom (numerator $\text{df}_1$): $p = 3$
   * Second degrees of freedom (denominator $\text{df}_2$): $n - p = 28 - 3 = 25$
   *(Note: If you check $P(F_{3, 25} > \frac{25}{3 \times 27} \times 31.285) = P(F_{3, 25} > 9.656)$ or the Chi-square approximation, both give a $p$-value in the $0.0002 - 0.0012$ range!)*
2. **Large-Sample Chi-Square ($\chi_p^2$) Approximation of $T^2$:**
   As taught in DA2451 lectures (and seen in the previous quizzes where `test = "chi"` was used), for large samples under $H_0$, Hotelling’s $T^2$-statistic itself is approximately distributed as a **Chi-square distribution with $p$ degrees of freedom**:
   $$T^2 \stackrel{\text{approx}}{\sim} \chi_p^2 = \chi_3^2 \quad (\text{with degrees of freedom } \text{df} = p = 3)$$

By stating **both** the $\chi_p^2$ approximation ($\text{df} = p = 3$) and the scaled $F_{p, n-p}$ distribution ($\text{df}_1 = p = 3, \, \text{df}_2 = n - p = 25$), your answer is guaranteed full marks under every marking rubric!

#### Complete Exam Answer for (a)(iii)

With $p = 3$ nutrient variables and sample size $n = 28$ athletes, under $H_0$:
* **Chi-Square Approximation (Course Standard for $T^2$):**
  Hotelling's $T^2$-statistic approximately follows a **Chi-square distribution with $\text{df} = p = 3$ degrees of freedom**:
  $$T^2 \stackrel{\text{approx}}{\sim} \chi_3^2 \quad (\text{parameter: degrees of freedom } \text{df} = p = 3)$$
* **Exact Scaled $F$-Distribution (Default in R’s `HotellingsT2()` when `test` is omitted):**
  The scaled statistic $\frac{n - p}{p(n - 1)} T^2 = \frac{25}{3(27)} T^2$ follows an **$F$-distribution with numerator degrees of freedom $\text{df}_1 = p = 3$ and denominator degrees of freedom $\text{df}_2 = n - p = 28 - 3 = 25$**:
  $$\frac{n - p}{p(n - 1)} T^2 \sim F_{3, \, 25}$$

---

### (a)(iv) Based on the results, would you reject $H_0$ at the 5% significance level? State your conclusion. `[2 marks]`

#### Beginner’s Explanation: The Universal $p$-Value Decision Rule

In any statistical hypothesis test with significance level $\alpha = 5\% = 0.05$:
* **If $\text{p-value} < 0.05$:** The observed difference is too big to be a random fluke $\implies$ **Reject $H_0$**.
* **If $\text{p-value} \ge 0.05$:** We do not have enough evidence $\implies$ **Fail to reject $H_0$**.

Here, the R output gives:
$$\text{p-value} = 0.0012$$
Since $0.0012 < 0.05$, we **reject $H_0$**!

#### Complete Exam Answer for (a)(iv)

* **Decision:** Since the $p\text{-value} = 0.0012$ is less than the significance level $\alpha = 0.05$ ($0.0012 < 0.05$), we **reject the null hypothesis $H_0$** at the $5\%$ level of significance.
* **Conclusion:** There is strong statistical evidence ($T^2 = 31.285, \, p = 0.0012$) that the population mean vector of nutrient levels (Vitamin D, Iron, and Calcium) **changed significantly** after the 8-week dietary supplementation program.

---

## Part (b): Using the multivariate normality test results from the R output, comment on the validity of the assumption that the nutrient concentration differences follow a multivariate normal distribution. `[2 marks]`

### Beginner’s Concept Explained from Scratch: Mardia’s Multivariate Normality Test (`mult.norm`)

To trust our Hotelling’s $T^2$ test in Part (a) (especially with a moderate sample size of $n = 28$), we must assume that the $3$-variate difference vectors $D_i$ come from a **Multivariate Normal Distribution** $N_3(\mu_D, \Sigma_D)$.

How does R check if data are Multivariate Normal?
Look at the second block of the R output:
```
mult.norm(diff_data[, 1:3])$mult.test
          Beta-hat     kappa    p-val
Skewness  0.926845  4.351241 0.853290
Kurtosis 11.973180 -0.984522 0.324465
```
This is **Mardia’s Multivariate Normality Test**, which checks two characteristics of a multivariate bell curve:
1. **Multivariate Skewness (Symmetry):**
   * $H_{0,\text{skew}}:$ The population distribution of nutrient differences has multivariate skewness consistent with a Multivariate Normal distribution (i.e., it is symmetric).
   * $H_{1,\text{skew}}:$ The distribution does not follow multivariate normality (due to skewness).
   * From the output: $\hat{\beta}_{\text{skew}} = 0.926845$, test statistic $\kappa = 4.351241$, and **$\text{p-value} = 0.853290$**.
2. **Multivariate Kurtosis (Tail Heaviness / Peakedness):**
   * $H_{0,\text{kurt}}:$ The population distribution of nutrient differences has multivariate kurtosis consistent with a Multivariate Normal distribution.
   * $H_{1,\text{kurt}}:$ The distribution does not follow multivariate normality (due to kurtosis).
   * From the output: $\hat{\beta}_{\text{kurt}} = 11.973180$, test statistic $\kappa = -0.984522$, and **$\text{p-value} = 0.324465$**.

**Watch Out for a Common Beginner Trap!**
In a normality test, **$H_0$ is that the data ARE Multivariate Normal**!
* Therefore, we **WANT** the $p$-values to be **large ($> 0.05$)** so that we **do NOT reject $H_0$**!
* Here, **both $p$-values are much larger than $\alpha = 0.05$** ($0.853290 > 0.05$ for Skewness, and $0.324465 > 0.05$ for Kurtosis).
* Thus, we **fail to reject $H_0$** for both tests, meaning the multivariate normality assumption is **valid (satisfied)**!

### Complete Exam Answer for Part (b)

* **Hypotheses for Mardia's Multivariate Normality Test (`mult.norm`):**
  * $H_0$: The nutrient concentration difference vectors follow a 3-variate normal distribution (multivariate skewness and kurtosis match those of $N_3(\mu_D, \Sigma_D)$).
  * $H_1$: The nutrient concentration difference vectors do not follow a 3-variate normal distribution.
* **Evaluation of R Output at $\alpha = 0.05$:**
  * For **Multivariate Skewness**, the $p\text{-value} = 0.853290 > 0.05$.
  * For **Multivariate Kurtosis**, the $p\text{-value} = 0.324465 > 0.05$.
* **Conclusion on Validity:**
  Since both the skewness $p$-value ($0.853290$) and the kurtosis $p$-value ($0.324465$) are greater than the $0.05$ significance level, we **fail to reject $H_0$** for both tests. Therefore, there is no evidence of departure from multivariate normality, and **the assumption that the nutrient concentration differences follow a multivariate normal distribution is valid (satisfied)**.

---
---

# Question 2 `[Total: 10 Marks]`

## Reference Setup from the Question

A researcher measured **three response variables ($p = 3$)** across **four treatment groups ($g = 4$)** and constructed the following one-way MANOVA table to compare the treatments:

| Source of variation | Matrix of sum of squares and cross products (SSCP) | Degrees of freedom |
| :--- | :---: | :---: |
| **Treatment** | $\begin{bmatrix} 15 & -10 & 5 \\ -10 & 40 & -20 \\ 5 & -20 & 25 \end{bmatrix}$ | ? |
| **Residual** | $\begin{bmatrix} ? & ? & ? \\ ? & ? & ? \\ ? & ? & ? \end{bmatrix}$ | ? |
| **Total** | $\begin{bmatrix} 50 & -20 & 10 \\ -20 & 90 & -30 \\ 10 & -30 & 60 \end{bmatrix}$ | $79$ |

---

## Beginner’s Concept Guide: How a One-Way MANOVA Table Works

If you have ever seen a basic One-Way ANOVA table for *one* variable, you know that:
$$\text{Total Sum of Squares (SST)} = \text{Treatment Sum of Squares (SSTr)} + \text{Residual/Error Sum of Squares (SSE)}$$
and for the Degrees of Freedom ($\text{df}$):
$$\text{Total df} = \text{Treatment df} + \text{Residual df}$$

In **One-Way MANOVA (Multivariate Analysis of Variance)**, we have $p = 3$ response variables instead of just $1$. So instead of a single number for Sum of Squares, we have a **$3 \times 3$ Matrix of Sum of Squares and Cross Products (called an SSCP matrix)**!
* **Treatment SSCP Matrix ($B$ or $H$):** Measures how much the group mean vectors vary **between** the $g = 4$ treatments.
* **Residual (Error) SSCP Matrix ($W$ or $E$):** Measures how much individual observations vary **within** their own treatment groups.
* **Total (Corrected) SSCP Matrix ($T$):** Measures the total variation and co-variation across all observations combined.

Just like in univariate ANOVA, the matrices and the degrees of freedom simply **add up**:
1. **Matrix Addition Rule:**
   $$\text{Total Matrix } (T) = \text{Treatment Matrix } (B) + \text{Residual Matrix } (W)$$
   Therefore, to find the missing **Residual Matrix ($W$)**, we just subtract each number in the Treatment Matrix from the corresponding number in the Total Matrix:
   $$\text{Residual Matrix } (W) = \text{Total Matrix } (T) - \text{Treatment Matrix } (B)$$
2. **Degrees of Freedom ($\text{df}$) Rules (with $g$ groups and $N$ total observations):**
   * $\text{Total df} = N - 1$
   * $\text{Treatment df} = g - 1$
   * $\text{Residual df} = N - g = \text{Total df} - \text{Treatment df}$

Let us now solve Part (a), Part (b), and Part (c) step by step!

---

## Part (a): Determine the total number of observations in the study and complete the MANOVA table. `[5 marks]`

### Step-by-Step Calculation

#### Step 1: Find the Total Number of Observations ($N$)

From the bottom right corner of the table, we are given:
$$\text{Total Degrees of Freedom} = N - 1 = 79$$
Add $1$ to both sides:
$$N = 79 + 1 = 80$$
Thus, there are **$N = 80$ total observations** in the study!

#### Step 2: Find the Missing Degrees of Freedom (Treatment $\text{df}$ and Residual $\text{df}$)

We are told in the problem statement that there are **$g = 4$ treatment groups**:
* **Treatment Degrees of Freedom:**
  $$\text{df}_{\text{Treatment}} = g - 1 = 4 - 1 = 3$$
* **Residual (Error) Degrees of Freedom:**
  $$\text{df}_{\text{Residual}} = N - g = 80 - 4 = 76$$
  *(Check: $\text{df}_{\text{Treatment}} + \text{df}_{\text{Residual}} = 3 + 76 = 79 = \text{df}_{\text{Total}}$. It matches!)*

#### Step 3: Calculate the Missing $3 \times 3$ Residual SSCP Matrix ($W = T - B$)

We subtract the **Treatment SSCP Matrix ($B$)** from the **Total SSCP Matrix ($T$)** entry by entry:

$$W = T - B = \begin{bmatrix} 50 & -20 & 10 \\ -20 & 90 & -30 \\ 10 & -30 & 60 \end{bmatrix} - \begin{bmatrix} 15 & -10 & 5 \\ -10 & 40 & -20 \\ 5 & -20 & 25 \end{bmatrix}$$

Let us carefully calculate every single entry so we make zero sign mistakes (be extra careful when subtracting negative numbers!):
* **Row 1:**
  * **Row 1, Col 1:** $50 - 15 = 35$
  * **Row 1, Col 2:** $-20 - (-10) = -20 + 10 = -10$
  * **Row 1, Col 3:** $10 - 5 = 5$
* **Row 2:**
  * **Row 2, Col 1:** $-20 - (-10) = -20 + 10 = -10$
  * **Row 2, Col 2:** $90 - 40 = 50$
  * **Row 2, Col 3:** $-30 - (-20) = -30 + 20 = -10$
* **Row 3:**
  * **Row 3, Col 1:** $10 - 5 = 5$
  * **Row 3, Col 2:** $-30 - (-20) = -30 + 20 = -10$
  * **Row 3, Col 3:** $60 - 25 = 35$

Putting all nine numbers together, the **Residual SSCP Matrix** is:
$$W = \begin{bmatrix} 35 & -10 & 5 \\ -10 & 50 & -10 \\ 5 & -10 & 35 \end{bmatrix}$$

### Final Answer for Part (a): Completed MANOVA Table

* **Total number of observations in the study:** $N = 79 + 1 = \mathbf{80}$.
* **Completed One-Way MANOVA Table:**

| Source of variation | Matrix of sum of squares and cross products (SSCP) | Degrees of freedom |
| :--- | :---: | :---: |
| **Treatment** | $\begin{bmatrix} 15 & -10 & 5 \\ -10 & 40 & -20 \\ 5 & -20 & 25 \end{bmatrix}$ | $\mathbf{3}$ |
| **Residual** | $\mathbf{\begin{bmatrix} 35 & -10 & 5 \\ -10 & 50 & -10 \\ 5 & -10 & 35 \end{bmatrix}}$ | $\mathbf{76}$ |
| **Total** | $\begin{bmatrix} 50 & -20 & 10 \\ -20 & 90 & -30 \\ 10 & -30 & 60 \end{bmatrix}$ | $79$ |

---

## Part (b): State $H_0$ and $H_1$ to test for treatment effects. Given that the $p$-value for Wilks' lambda is 0.023, would you reject $H_0$ at the 5% significance level? State your conclusion. `[3 marks]`

### Beginner’s Explanation

In One-Way MANOVA with $g = 4$ treatment groups and $p = 3$ response variables, we can write the hypotheses in two equivalent ways (we will write **both** so your exam answer is 100% complete!):
1. **In terms of the Group Mean Vectors ($\mu_1, \mu_2, \mu_3, \mu_4$):**
   * $H_0: \mu_1 = \mu_2 = \mu_3 = \mu_4$ (all four treatment groups have the exact same $3 \times 1$ population mean vector across the three responses).
   * $H_1:$ At least two treatment groups have different population mean vectors ($\mu_k \neq \mu_m$ for at least one pair $k \neq m$).
2. **In terms of the Treatment Effect Vectors ($\tau_1, \tau_2, \tau_3, \tau_4$) in the MANOVA model $X_{\ell j} = \mu + \tau_\ell + e_{\ell j}$:**
   * $H_0: \tau_1 = \tau_2 = \tau_3 = \tau_4 = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$ (there are no treatment effects).
   * $H_1:$ At least one $\tau_\ell \neq \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$ (at least one treatment has a non-zero effect).

Next, we compare the given $p$-value ($0.023$) for Wilks' lambda ($\Lambda^* = \frac{|W|}{|B + W|}$) to the significance level $\alpha = 0.05$:
$$\text{p-value} = 0.023 < 0.05 \implies \text{Reject } H_0!$$

### Complete Exam Answer for Part (b)

* **Hypotheses:**
  Let $\mu_\ell = \begin{pmatrix} \mu_{\ell 1} \\ \mu_{\ell 2} \\ \mu_{\ell 3} \end{pmatrix}$ denote the $3 \times 1$ population mean vector of the three response variables for treatment group $\ell$ ($\ell = 1, 2, 3, 4$), or equivalently let $\tau_\ell$ denote the treatment effect vector for group $\ell$:
  * **Null Hypothesis ($H_0$):**
    $$H_0: \mu_1 = \mu_2 = \mu_3 = \mu_4 \quad \left(\text{equivalently, } H_0: \tau_1 = \tau_2 = \tau_3 = \tau_4 = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}\right)$$
    *(There are no treatment effects; the population mean vectors of the three response variables are equal across all four treatment groups).*
  * **Alternative Hypothesis ($H_1$):**
    $$H_1: \text{At least one } \mu_\ell \text{ is different} \quad \left(\text{equivalently, at least one } \tau_\ell \neq \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}\right)$$
    *(There is a significant treatment effect; the population mean vectors differ for at least two treatment groups).*

* **Decision at $\alpha = 5\%$ ($0.05$):**
  Since the $p$-value for Wilks' lambda is $0.023$, which is less than the significance level $\alpha = 0.05$ ($0.023 < 0.05$), we **reject the null hypothesis $H_0$** at the $5\%$ significance level.

* **Conclusion:**
  There is statistically significant evidence ($p = 0.023$) of treatment effects—that is, the 3-variate population mean vectors of the response variables differ significantly across the four treatment groups.

---

## Part (c): Which assumptions have you made to validate the test in Part (b)? `[2 marks]`

### Beginner’s Explanation

To ensure that the Wilks' lambda test in One-Way MANOVA is statistically valid, we rely on **three fundamental assumptions** about the populations from which the $g = 4$ treatment samples were drawn. Let us state all three clearly!

### Complete Exam Answer for Part (c)

To validate the One-Way MANOVA test in Part (b), the following three assumptions are made:
1. **Independence of Observations (Random Sampling):**
   The observations within each treatment group and across the four treatment groups are mutually independent random samples from their respective populations.
2. **Multivariate Normality:**
   Each treatment population $\ell$ ($\ell = 1, 2, 3, 4$) follows a $p = 3$-variate normal distribution $N_3(\mu_\ell, \Sigma_\ell)$ (equivalently, the random error vectors $e_{\ell j} \stackrel{\text{i.i.d.}}{\sim} N_3(0, \Sigma)$).
3. **Homogeneity of Covariance Matrices (Homoscedasticity):**
   All $g = 4$ treatment groups share the **same common $3 \times 3$ population variance-covariance matrix $\Sigma$**:
   $$\Sigma_1 = \Sigma_2 = \Sigma_3 = \Sigma_4 = \Sigma$$

---
---

# Question 3 `[Total: 20 Marks]`

## Reference Setup from the Question

A researcher analyzed data from **$N = 120$ patients**, each belonging to one of **three heart risk categories ($g = 3$): Low, Medium, and High**. Four continuous predictors ($p = 4$) were measured for each patient:
* `Age`
* `Cholesterol`
* `RestingBP` (Resting Blood Pressure)
* `MaxHeartRate` (Maximum Heart Rate)

The researcher performed a **Linear Discriminant Analysis (LDA)** in R using the `lda()` function from the `MASS` package. The relevant output is given below:

```
Call:
lda(Risk ~ Age + Cholesterol + RestingBP + MaxHeartRate)

Prior probabilities of groups:
     Low   Medium     High
0.333333 0.333333 0.333333

Group means:
        Age Cholesterol RestingBP MaxHeartRate
Low    45.2       180.3     120.1        150.2
Medium 55.1       210.5     135.3        140.5
High   62.4       230.7     150.8        130.3

Coefficients of linear discriminants:
                LD1     LD2
Age          0.4512 -0.2231
Cholesterol  0.6125  0.4210
RestingBP    0.3984  0.1042
MaxHeartRate 0.5021 -0.3145

Proportion of trace:
   LD1    LD2
0.8725 0.1275
```

---

## Beginner’s Concept Guide: What is Linear Discriminant Analysis (LDA) and How Does It Work?

Imagine you are a cardiologist at a hospital. When a new patient walks in, you measure four numbers on them:
* $X_1 =$ `Age`
* $X_2 =$ `Cholesterol`
* $X_3 =$ `RestingBP`
* $X_4 =$ `MaxHeartRate`

You want a mathematical rule that uses these four measurements $(X_1, X_2, X_3, X_4)$ to **classify the patient into one of $g = 3$ heart risk groups: Low, Medium, or High**.

How does **Linear Discriminant Analysis (LDA)** do this?
1. **It creates "Discriminant Functions" ($\text{LD}_1, \text{LD}_2$):**
   Instead of looking at 4 separate variables in 4D space, LDA constructs new composite scores called **Linear Discriminants ($\text{LD}_1, \text{LD}_2$)**, which are linear combinations of the predictors:
   $$\text{LD}_1 = w_{11}(\text{Age}) + w_{12}(\text{Cholesterol}) + w_{13}(\text{RestingBP}) + w_{14}(\text{MaxHeartRate})$$
   $$\text{LD}_2 = w_{21}(\text{Age}) + w_{22}(\text{Cholesterol}) + w_{23}(\text{RestingBP}) + w_{24}(\text{MaxHeartRate})$$
   * **How are the weights $w$ chosen?** Unlike PCA (which ignores group labels and just maximizes total spread), **LDA chooses weights that maximize the ratio of Between-Group Variance to Within-Group Variance**:
     $$\text{Maximize } \frac{\text{Between-Group Variance } (w' B w)}{\text{Within-Group Variance } (w' W w)}$$
   * In plain English: $\text{LD}_1$ is the single direction in 4D space along which the **Low, Medium, and High risk groups are pushed as far apart from each other as possible**, while keeping patients within the same risk group clustered tightly together!
   * $\text{LD}_2$ is the second direction (uncorrelated with $\text{LD}_1$) that captures whatever remaining separation between the $3$ groups was not already captured by $\text{LD}_1$.
   * Remember from **MCQ 19**: With $g = 3$ groups, the maximum number of discriminant functions is **$g - 1 = 3 - 1 = 2$** ($\text{LD}_1$ and $\text{LD}_2$).
2. **It uses Bayes’ Theorem to classify patients:**
   Combining the **Prior Probabilities** ($\pi_k$, how common each group is before looking at the patient's data) with the patient's multivariate normal density (distance from each group mean), LDA computes the **Posterior Probability** that the patient belongs to Low, Medium, or High risk, and assigns the patient to the group with the highest posterior probability!

Now let us answer every part of Question 3 in deep, comprehensive detail.

---

## Part (a): Interpret the LDA output by explaining the meaning of the prior probabilities, group means, coefficients of linear discriminants, and the proportion of trace for each discriminant function. `[8 marks]`

*(Teaching Note: Since Part (a) carries a full **8 marks** and asks about **4 distinct sections** of the R output, each section is worth **2 marks**. We will explain both the general statistical meaning AND the exact numerical interpretation of every single section in the output!)*

### 1. Prior Probabilities of Groups `[2 marks]`

```
Prior probabilities of groups:
     Low   Medium     High
0.333333 0.333333 0.333333
```

* **What it means conceptually:**
  The **prior probabilities** ($\pi_{\text{Low}}, \pi_{\text{Medium}}, \pi_{\text{High}}$) represent the baseline probability that a randomly selected patient belongs to each heart risk category **before** observing any of their clinical measurements (`Age`, `Cholesterol`, `RestingBP`, `MaxHeartRate`). In `MASS::lda()`, unless specified otherwise, these are estimated from the sample proportions ($n_k / N$) in the training dataset. They are used in Bayes' rule to weight the classification boundaries.
* **What the numbers in this output tell us:**
  Here, $\pi_{\text{Low}} = 0.333333$ ($1/3 \approx 33.33\%$), $\pi_{\text{Medium}} = 0.333333$ ($1/3 \approx 33.33\%$), and $\pi_{\text{High}} = 0.333333$ ($1/3 \approx 33.33\%$). This tells us that the training dataset of $N = 120$ patients is **perfectly balanced across the three heart risk categories**, with exactly $120 \times \frac{1}{3} = 40$ patients in the **Low** risk group, $40$ in the **Medium** risk group, and $40$ in the **High** risk group.

---

### 2. Group Means `[2 marks]`

```
Group means:
        Age Cholesterol RestingBP MaxHeartRate
Low    45.2       180.3     120.1        150.2
Medium 55.1       210.5     135.3        140.5
High   62.4       230.7     150.8        130.3
```

* **What it means conceptually:**
  The **group means** table displays the **sample mean vector (centroid) $\bar{x}_k$** of the four predictor variables within each of the three heart risk categories. Comparing these centroids reveals how the average patient profile shifts across the risk groups.
* **What the numbers in this output tell us:**
  As heart risk increases from **Low $\to$ Medium $\to$ High**:
  * **Mean `Age` increases steadily:** from $45.2$ years (Low) to $55.1$ years (Medium) to $62.4$ years (High).
  * **Mean `Cholesterol` increases strongly:** from $180.3$ (Low) to $210.5$ (Medium) to $230.7$ (High).
  * **Mean `RestingBP` increases steadily:** from $120.1$ (Low) to $135.3$ (Medium) to $150.8$ (High).
  * **Mean `MaxHeartRate` decreases steadily:** from $150.2$ (Low) down to $140.5$ (Medium) and $130.3$ (High).
  Thus, High-risk patients are, on average, older with higher cholesterol and higher resting blood pressure, but lower maximum heart rate, than Medium- and Low-risk patients.

---

### 3. Coefficients of Linear Discriminants `[2 marks]`

```
Coefficients of linear discriminants:
                LD1     LD2
Age          0.4512 -0.2231
Cholesterol  0.6125  0.4210
RestingBP    0.3984  0.1042
MaxHeartRate 0.5021 -0.3145
```

* **What it means conceptually:**
  The **coefficients of linear discriminants** are the weights (loadings) used to form the linear combinations of the (centered) predictor variables that define the two linear discriminant axes, $\text{LD}_1$ and $\text{LD}_2$. These weights are chosen to maximize the ratio of between-group variance to within-group variance.
* **What the numbers in this output tell us:**
  Since there are $g = 3$ groups and $p = 4$ predictors, there are $\min(p, g - 1) = \min(4, 2) = 2$ discriminant functions:
  * **First Linear Discriminant ($\text{LD}_1$):**
    $$\text{LD}_1 = 0.4512(\text{Age}) + 0.6125(\text{Cholesterol}) + 0.3984(\text{RestingBP}) + 0.5021(\text{MaxHeartRate})$$
    All four predictors have positive weights on $\text{LD}_1$, with `Cholesterol` ($0.6125$) and `MaxHeartRate` ($0.5021$) having the largest coefficients, followed by `Age` ($0.4512$) and `RestingBP` ($0.3984$).
  * **Second Linear Discriminant ($\text{LD}_2$):**
    $$\text{LD}_2 = -0.2231(\text{Age}) + 0.4210(\text{Cholesterol}) + 0.1042(\text{RestingBP}) - 0.3145(\text{MaxHeartRate})$$
    $\text{LD}_2$ contrasts patients who have high `Cholesterol` ($+0.4210$) and `RestingBP` ($+0.1042$) against those with higher `MaxHeartRate` ($-0.3145$) and `Age` ($-0.2231$).

---

### 4. Proportion of Trace `[2 marks]`

```
Proportion of trace:
   LD1    LD2
0.8725 0.1275
```

* **What it means conceptually:**
  In `MASS::lda()`, the "trace" refers to the sum of the eigenvalues ($\lambda_1 + \lambda_2$) of the between-to-within variance matrix $W^{-1}B$. The **proportion of trace** for $\text{LD}_k$, defined as $\frac{\lambda_k}{\sum_{j=1}^{g-1} \lambda_j}$, measures the **proportion (percentage) of the total between-group variance (group separation / discriminatory power)** explained by each discriminant function.
* **What the numbers in this output tell us:**
  * **$\text{LD}_1$ accounts for $0.8725$ ($87.25\%$)** of the total between-group separation among the Low, Medium, and High heart risk categories.
  * **$\text{LD}_2$ accounts for the remaining $0.1275$ ($12.75\%$)** of the between-group separation ($0.8725 + 0.1275 = 1.0000 = 100\%$).
  * Because $\text{LD}_1$ captures **$87.25\%$** of the discriminatory power, the first discriminant function ($\text{LD}_1$) alone does the vast majority of the work in separating the three heart risk groups!

---

## Part (b): What are the two key assumptions on which LDA is based? Discuss how violations of these assumptions might affect the accuracy of the classification results. `[4 marks]`

### Beginner’s Explanation & Complete Exam Answer

#### 1. The Two Key Assumptions of LDA `[2 marks]`

Linear Discriminant Analysis (LDA) is based on **two primary distributional assumptions** (alongside random/independent sampling of patients):
1. **Multivariate Normality Within Each Group:**
   Within each class/category $k$ ($k = \text{Low}, \text{Medium}, \text{High}$), the vector of predictor variables $X = (\text{Age}, \text{Cholesterol}, \text{RestingBP}, \text{MaxHeartRate})'$ follows a **Multivariate Normal distribution** $N_p(\mu_k, \Sigma_k)$.
2. **Homogeneity of Covariance Matrices Across Groups (Homoscedasticity):**
   All $g = 3$ risk categories share the **exact same $p \times p$ population variance-covariance matrix $\Sigma$**:
   $$\Sigma_{\text{Low}} = \Sigma_{\text{Medium}} = \Sigma_{\text{High}} = \Sigma$$

---

#### 2. How Violations Affect the Accuracy of Classification Results `[2 marks]`

* **Effect of Violating Equal Covariance Matrices ($\Sigma_k \neq \Sigma_j$):**
  * LDA derives **linear (flat hyperplane)** decision boundaries specifically because the quadratic term $x'\Sigma^{-1}x$ cancels out when all groups have the same covariance matrix $\Sigma$.
  * If the true group covariance matrices differ significantly across risk groups (heteroscedasticity), the true optimal Bayes decision boundaries are **curved (quadratic)** rather than linear. Forcing a straight-line boundary through curved group distributions leads to **suboptimal decision boundaries, systematic misclassification of patients (especially converting observations from a high-variance group into a low-variance group), and reduced overall classification accuracy** (in which case **QDA** should be used instead).
* **Effect of Violating Multivariate Normality:**
  * If predictor distributions within groups are heavily skewed, multimodal, categorical, or contain **extreme outliers**, the sample group means $\bar{x}_k$ and pooled covariance matrix $S_{\text{pooled}}$ become distorted.
  * This shifts the estimated centroids and tilts the discriminant axes ($\text{LD}_1, \text{LD}_2$), resulting in **biased posterior probability estimates and higher misclassification rates** (higher error rates) when classifying patients.

---

## Part (c): Based on the coefficients of the linear discriminants, explain which predictors appear most important in distinguishing among the three risk categories. `[3 marks]`

### Beginner’s Step-by-Step Analysis

Let us look closely at the `Coefficients of linear discriminants` and `Proportion of trace` from the R output:

| Predictor | Coefficient on $\text{LD}_1$ ($87.25\%$ of trace) | Coefficient on $\text{LD}_2$ ($12.75\%$ of trace) |
| :--- | :---: | :---: |
| **`Cholesterol`** | **$0.6125$** (Rank 1 — Largest!) | **$0.4210$** (Rank 1 — Largest!) |
| **`MaxHeartRate`** | **$0.5021$** (Rank 2) | **$-0.3145$** (Rank 2 in magnitude: $|-0.3145| = 0.3145$) |
| **`Age`** | **$0.4512$** (Rank 3) | **$-0.2231$** (Rank 3 in magnitude: $|-0.2231| = 0.2231$) |
| **`RestingBP`** | **$0.3984$** (Rank 4 — Smallest) | **$0.1042$** (Rank 4 — Smallest) |

Let us explain this clearly for full marks:
1. **Why we focus primarily on $\text{LD}_1$ (and check $\text{LD}_2$):**
   $\text{LD}_1$ accounts for **$87.25\%$** of the total between-group variance, while $\text{LD}_2$ accounts for **$12.75\%$**. The importance of a predictor on a discriminant function is indicated by the **absolute magnitude ($|\text{coefficient}|$)** of its discriminant coefficient.
2. **Ranking the predictors by magnitude of coefficients:**
   * **`Cholesterol` is the single most important predictor** in distinguishing among the three heart risk categories: it has the **largest absolute coefficient on $\text{LD}_1$ ($0.6125$)** *and* also the **largest absolute coefficient on $\text{LD}_2$ ($0.4210$)**.
   * **`MaxHeartRate` is the second most important predictor:** it has the **second largest absolute coefficient on $\text{LD}_1$ ($0.5021$)** and the **second largest absolute coefficient on $\text{LD}_2$ ($|-0.3145| = 0.3145$)**.
   * **`Age` is the third most important predictor**, with a substantial coefficient on $\text{LD}_1$ ($0.4512$) and $\text{LD}_2$ ($|-0.2231| = 0.2231$).
   * **`RestingBP` appears least influential** relative to the other three predictors, having the smallest absolute coefficients on both $\text{LD}_1$ ($0.3984$) and $\text{LD}_2$ ($0.1042$).
   *(Bonus Insight for Top Marks: Note that if the predictors were standardized prior to fitting or when comparing these coefficients directly, `Cholesterol` and `MaxHeartRate` clearly dominate both discriminant functions).*

---

## Part (d): If 10% of the patients in the training set were misclassified by the LDA model, what does this indicate about the model's performance? `[3 marks]`

### Beginner’s Concept Explained from Scratch

Let us translate **"10% of the patients in the training set were misclassified"** into three clear statistical insights:

1. **High Training Classification Accuracy ($90\%$ vs. $33.3\%$ Random Guessing):**
   * If $10\%$ of the $N = 120$ patients ($12$ patients) were misclassified, then **$100\% - 10\% = 90\%$ of the patients ($108$ out of $120$ patients) were correctly classified** into their true heart risk category (Low, Medium, or High)!
   * Remember that with $3$ equally sized categories ($\text{prior} = 0.3333$ each), random guessing would only achieve **$33.33\%$ accuracy** ($66.67\%$ misclassification rate). Achieving a **$90\%$ accuracy rate ($10\%$ Apparent Error Rate / APER)** indicates that the LDA model performs **very well** on the training data and that the four predictors (`Age`, `Cholesterol`, `RestingBP`, `MaxHeartRate`) provide **strong linear separation** among the Low, Medium, and High risk groups.
2. **Meaning of the $10\%$ Misclassification:**
   * The $10\%$ misclassification rate shows that the three groups are not $100\%$ perfectly disjoint—there is a **small $10\%$ overlap** among the multivariate distributions of the three risk groups near the linear decision boundaries.
3. **Important Statistical Caveat — Training Error (APER) Optimism vs. Test/Cross-Validation Error:**
   * Because this $10\%$ error rate was calculated on the **training set** (the exact same $120$ patients used to estimate the model parameters), it is the **Apparent Error Rate (APER)**, which tends to be **optimistically biased** (it can slightly overestimate true performance due to overfitting).
   * To evaluate how well the model will generalize to **new, unseen patients**, the researcher should also evaluate the misclassification rate using an **independent test dataset** or **cross-validation (such as Leave-One-Out Cross-Validation, `CV = TRUE` in `lda()`)**.

---

## Part (e): Compare LDA with logistic regression for multi-class classification. Under what conditions might LDA outperform logistic regression, and why? `[2 marks]`

### Beginner’s Explanation & Complete Exam Answer

#### 1. Comparison of LDA and Multinomial Logistic Regression

* **Similarity:** Both **Linear Discriminant Analysis (LDA)** and **Multinomial Logistic Regression** produce **linear decision boundaries** in the predictor space to classify observations into $g \ge 2$ classes.
* **Difference in Estimation & Assumptions:**
  * **Logistic Regression** is a *discriminative (conditional)* method: it directly models the conditional posterior probabilities $P(Y = k \mid X = x)$ via maximum likelihood without making any distributional assumptions about the predictors $X$ (so it easily handles non-normal, skewed, or binary/categorical predictors and is more robust to outliers).
  * **LDA** is a *generative* method: it models the distribution of the predictors $X$ within each class $P(X = x \mid Y = k)$ as **Multivariate Normal with a common covariance matrix $\Sigma$**, and then uses Bayes' theorem to flip this into posterior probabilities $P(Y = k \mid X = x)$.

---

#### 2. Conditions Under Which LDA Outperforms Logistic Regression — and Why

LDA tends to **outperform** logistic regression under the following three conditions:
1. **When the Multivariate Normality and Equal Covariance Assumptions Hold:**
   When the predictors within each class truly follow a Multivariate Normal distribution with a common covariance matrix $\Sigma$, LDA estimates the full generative structure using all data points, making its parameter estimates more **statistically efficient** (lower variance and up to $\sim 30\%$ more efficient asymptotically) than logistic regression.
2. **When the Classes Are Well-Separated:**
   When the classes are **completely or nearly perfectly separated**, the maximum likelihood estimates in logistic regression become **unstable or infinite** (the algorithm fails to converge), whereas **LDA remains completely stable** because it relies only on sample group means and the pooled covariance matrix!
3. **When the Sample Size ($N$) is Small and the Number of Classes ($g > 2$) is Multiple:**
   When $N$ is small relative to the number of predictors $p$, and especially when classifying into **more than two classes ($g = 3$ or more)**, LDA's distributional structure reduces the variance of the parameter estimates compared to multinomial logistic regression.