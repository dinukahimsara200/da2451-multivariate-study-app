# 22 Batch | Final Examination | December 2024 | DA2451

## Multivariate Methods in Business — Master Beginner Teaching Guide & Complete Worked Solutions

---

# PART I: MULTIPLE CHOICE QUESTIONS `[Total: 50 Marks — 2 Marks Each]`

In this section, we will examine every single Multiple Choice Question from absolute zero. Even if you have never taken a statistics class before, you will learn **what each term means**, **why the correct answer works**, and **why the other choices fail**.

---

## MCQ 1

**Question Reference:** *What does the Mahalanobis distance measure in the context of multivariate analysis?*

* *(a) The straight-line distance between two points in univariate data*
* *(b) The distance between the means of two variables*
* *(c) The distance between two points in terms of standardized variables, accounting for variability and correlation*
* *(d) The geometric distance between data points in a one-dimensional space*

### Beginner’s Concept Explained from Scratch

Imagine we want to measure how far apart two people (or two data points, $x_1$ and $x_2$) are based on two variables: **Age** (measured in years, say $20$ to $60$) and **Annual Income** (measured in dollars, say $\$20,000$ to $\$100,000$).

1. **Why ordinary straight-line (Euclidean) distance fails:**
   If you use an ordinary ruler (Euclidean distance: $\sqrt{(x_{11}-x_{21})^2 + (x_{12}-x_{22})^2}$), a difference of $\$100$ in income looks $100$ times bigger than a difference of $1$ year in age, simply because of the units! Even worse, Age and Income are **correlated** (older people tend to earn more), so an ordinary ruler double-counts the overlapping information.
2. **What Mahalanobis Distance does:**
   The **Mahalanobis distance** ($d_M = \sqrt{(x_1 - x_2)' S^{-1} (x_1 - x_2)}$) fixes both problems by multiplying by the inverse covariance matrix $S^{-1}$:
   * It **standardizes** each variable (dividing by its variability/standard deviation so units don't matter).
   * It **removes the correlation** between variables so correlated variables don't distort the distance.

### Why the Other Options Are Incorrect

* **(a) and (d)** talk about *univariate / one-dimensional* straight-line distance, whereas Mahalanobis distance is specifically designed for *multivariate* (multi-dimensional) data.
* **(b)** claims it only measures the distance between the means of two variables, whereas Mahalanobis distance measures the statistical distance between any two multivariate points (or a point and a centroid) while accounting for variance and covariance.

> **Correct Answer for MCQ 1:** **(c) The distance between two points in terms of standardized variables, accounting for variability and correlation**

---

## MCQ 2

**Question Reference:** *What is the primary purpose of a parallel coordinates plot in visualizing multivariate data?*

* *(a) To illustrate the distribution of individual variables*
* *(b) To examine the relationships between multiple variables across different cases*
* *(c) To analyze the correlations between pairs of variables*
* *(d) To assess the overall variation within the data*

### Beginner’s Concept Explained from Scratch

How do you draw a graph when you have $5$, $10$, or $20$ variables? You cannot draw a 10-dimensional scatter plot on flat paper!
A **Parallel Coordinates Plot** solves this cleverly:
* Instead of making axes perpendicular ($90^\circ$), it draws $p$ **vertical lines standing side-by-side in parallel**—one vertical axis for each variable ($X_1, X_2, X_3, \dots, X_p$).
* Each **case (observation/person)** in the dataset is drawn as a **continuous zigzag line** connecting its value on Axis 1 to its value on Axis 2, Axis 3, and so on.
* By looking at how these lines bundle together, cross each other, or separate across the parallel axes, we can visually **examine the relationships among multiple variables across different cases/observations** simultaneously!

> **Correct Answer for MCQ 2:** **(b) To examine the relationships between multiple variables across different cases**

---

## MCQ 3

**Question Reference:** *Which generalized squared distance is most commonly used for identifying outliers in multivariate data?*

* *(a) Mahalanobis distance*
* *(b) Chi-square distance*
* *(c) Euclidean distance*
* *(d) Cook's distance*

### Beginner’s Concept Explained from Scratch

What is a **multivariate outlier**? It is an unusual observation that sits far away from the center (mean vector $\bar{X}$) of the data cloud.
* For example, being $6\text{ feet } 2\text{ inches}$ tall is not unusual by itself, and weighing $115\text{ lbs}$ is not unusual by itself—but a person who is *both* $6\text{ feet } 2\text{ inches}$ tall *and* weighs $115\text{ lbs}$ is an extreme **multivariate outlier** because height and weight are strongly correlated!
* **Euclidean distance** (c) misses this outlier because it ignores correlation and scale.
* **Mahalanobis squared distance** ($D_i^2 = (x_i - \bar{x})' S^{-1} (x_i - \bar{x})$) accounts for both the variance of each variable and the correlations among variables. When data is multivariate normal, $D_i^2$ follows a $\chi_p^2$ distribution, making **Mahalanobis distance** the gold-standard tool for detecting multivariate outliers!

> **Correct Answer for MCQ 3:** **(a) Mahalanobis distance**

---

## MCQ 4

**Question Reference:** *What does a generalized sample variance of* $|S| = 0$ *indicate in multivariate analysis?*

* *(a) The data exhibits perfect correlation among variables*
* *(b) The data follows a multivariate normal distribution*
* *(c) Some variables are linearly dependent, resulting in a singular covariance matrix*
* *(d) The data demonstrates high variance across all dimensions*

### Beginner’s Concept Explained from Scratch

1. **What is Generalized Sample Variance (**$|S|$**)?**
   The determinant of the sample covariance matrix, written $|S|$ or $\det(S)$, is a single number called the **generalized sample variance**. Geometrically, it measures the squared volume of the multi-dimensional cloud of data points.
2. **When does the volume** $|S|$ **collapse to zero (**$|S| = 0$**)?**
   Imagine a 3D balloon. If you flatten it completely into a 2D sheet of paper, its 3D volume becomes $0$!
   In data analysis, $|S| = 0$ happens when **at least one variable can be written as an exact linear combination of the other variables** (for example, $X_3 = X_1 + X_2$, or $X_2 = 2X_1$).
   When variables are **linearly dependent** like this, the covariance matrix $S$ has no inverse (it is called a **singular matrix**) and its determinant is $|S| = 0$.
   *(Note: Option (a) is too narrow because $|S|=0$ does not require all variables to be perfectly correlated with each other—just that at least one linear dependency exists among some subset of variables, as stated precisely in **(c)**).*

> **Correct Answer for MCQ 4:** **(c) Some variables are linearly dependent, resulting in a singular covariance matrix**

---

## MCQ 5

**Question Reference:** *How does the generalized variance* $|R|$ *of standardized variables differ from the generalized sample variance* $|S|$ *derived from deviation vectors?*

* *(a)* $|R|$ *is unaffected by the scaling of variables*
* *(b)* $|R|$ *is always larger than* $|S|$ *for all datasets*
* *(c)* $|R|$ *is identical to* $|S|$
* *(d)* $|R|$ *accounts for variable correlations, whereas* $|S|$ *does not*

### Beginner’s Concept Explained from Scratch

Let us compare the **Sample Covariance Matrix** $S$ with the **Sample Correlation Matrix** $R$:
* $S$ is computed using the **raw units** of the variables (e.g., meters vs. centimeters, or dollars vs. thousands of dollars). Mathematically, $|S| = (s_{11} s_{22} \cdots s_{pp}) |R|$. If you change the unit of $X_1$ from meters to centimeters (multiplying by $100$), $s_{11}$ gets multiplied by $100^2 = 10,000$, so $|S|$ blows up by a factor of $10,000$!
* $R$ is the covariance matrix of the **standardized variables** ($Z_k = \frac{X_k - \bar{X}_k}{s_k}$), where every variable has been scaled to have unit variance ($1.0$). Because standardization removes measurement units, $|R|$ **is completely unaffected by the scaling (units) of the variables**!

> **Correct Answer for MCQ 5:** **(a)** $|R|$ **is unaffected by the scaling of variables**

---

## MCQ 6

**Question Reference:** *Why is conducting separate univariate* $t$*-tests for each component of a multivariate dataset generally inadvisable?*

* *(a) Univariate tests assume that variables are uncorrelated*
* *(b) Univariate tests ignore the interactions between variables*
* *(c) Univariate tests are only applicable to categorical variables*
* *(d) Univariate tests require a larger sample size*

### Beginner’s Concept Explained from Scratch

Suppose we measure $p = 5$ continuous variables on two groups and want to test if the two groups differ. Why shouldn't we just run $5$ separate univariate $t$-tests?
1. **Univariate tests treat each variable in complete isolation**—effectively **assuming that the variables are uncorrelated** (ignoring the covariance/correlation structure among the variables) and **ignoring how variables interact/move together**.
2. Furthermore, running multiple separate univariate tests inflates the overall Type I error rate (false-positive rate).
*(Note on Exam Marking Key: Both **(a)** and **(b)** express this core limitation of univariate $t$-tests—in textbook multivariate theory \[Johnson & Wichern\], separate univariate tests fail to use the correlation among variables \[assuming independence/uncorrelatedness across tests, **(a)**\] and ignore joint relationships/interactions between variables \[**(b)**\]. Mentioning **(a)** \[or **(b)**\] is the standard exam answer).*

> **Correct Answer for MCQ 6:** **(a) Univariate tests assume that variables are uncorrelated** *(or **(b) Univariate tests ignore the interactions between variables**)*

---

## MCQ 7

**Question Reference:** *What is the main advantage of Hotelling's* $T^2$*-test compared to univariate* $t$*-tests in multivariate analysis?*

* *(a) It accommodates multivariate data and accounts for correlations between variables*
* *(b) It requires a smaller sample size*
* *(c) It reduces the data into a single dimension*
* *(d) It is only applicable to large datasets*

### Beginner’s Concept Explained from Scratch

**Hotelling’s** $T^2$ **test** ($T^2 = n(\bar{X} - \mu_0)' S^{-1} (\bar{X} - \mu_0)$ for one sample, or its two-sample version) is the direct multivariate extension of the univariate $t$-test.
By using the inverse of the sample covariance matrix $S^{-1}$, Hotelling's $T^2$ **tests all** $p$ **variables simultaneously while explicitly accounting for the correlations (covariances) between the variables**, controlling the Type I error rate at $\alpha$.

> **Correct Answer for MCQ 7:** **(a) It accommodates multivariate data and accounts for correlations between variables**

---

## MCQ 8

**Question Reference:** *Why is Principal Component Analysis (PCA) often applied to high-dimensional data?*

* *(a) To eliminate redundancy and simplify interpretation*
* *(b) To increase the number of variables in the dataset*
* *(c) To increase multicollinearity*
* *(d) To reduce the sample size required for analysis*

### Beginner’s Concept Explained from Scratch

When a dataset is **high-dimensional** (has many variables, say $p = 30$), many of those variables are correlated and measure overlapping information (**redundancy**).
We apply **Principal Component Analysis (PCA)** to compress those $30$ overlapping variables into just a few (say, $2$ or $3$) uncorrelated Principal Components that capture almost all the variation—thereby **eliminating redundancy and simplifying interpretation**!

> **Correct Answer for MCQ 8:** **(a) To eliminate redundancy and simplify interpretation**

---

## MCQ 9

**Question Reference:** *How are loadings interpreted in PCA?*

* *(a) They represent the proportion of variance explained by each variable*
* *(b) They indicate the direction of each principal component*
* *(c) They are the coefficients of the linear combinations of the variables*
* *(d) They measure the correlation between the components*

### Beginner’s Concept Explained from Scratch

In PCA, each Principal Component is written as an equation:

$$
\text{PC}_1 = e_{11} X_1 + e_{12} X_2 + \dots + e_{1p} X_p
$$

The numbers $e_{11}, e_{12}, \dots, e_{1p}$ are called the **PCA loadings** (the elements of the eigenvector $e_1$).
* **Algebraically:** They are the **coefficients (weights) of the linear combinations of the original variables** used to compute each Principal Component score (**Option (c)**).
* **Geometrically:** The eigenvector $e_i$ is a unit vector that points along the **direction of the** $i$**-th principal component axis** (**Option (b)**).
In standard R (`prcomp` / `princomp`, where the eigenvector matrix is called `$loadings` or `$rotation`), loadings are defined first and foremost as **the coefficients of the linear combinations of the variables** (while geometrically indicating the PC direction).

> **Correct Answer for MCQ 9:** **(c) They are the coefficients of the linear combinations of the variables** *(Note: **(b)** is also a valid geometric interpretation of the eigenvector loadings).*

---

## MCQ 10

**Question Reference:** *How does PCA address multicollinearity in a dataset?*

* *(a) By transforming the data into uncorrelated principal components*
* *(b) By removing redundant variables from the dataset*
* *(c) By increasing the dimensionality of the data*
* *(d) By using the covariance matrix of the data*

### Beginner’s Concept Explained from Scratch

**Multicollinearity** means the original variables $X_1, X_2, \dots, X_p$ are correlated with each other.
PCA does *not* simply delete original variables (so (b) is false). Instead, PCA mathematically rotates the original variables into a new set of variables—the **Principal Components**—whose eigenvectors are mutually orthogonal, meaning the resulting **principal components are completely uncorrelated with one another** ($\text{Cov}(\text{PC}_i, \text{PC}_j) = 0$ for $i \neq j$).

> **Correct Answer for MCQ 10:** **(a) By transforming the data into uncorrelated principal components**

---

## MCQ 11

**Question Reference:** *Why is the interpretation of principal components important in PCA?*

* *(a) To identify the highly correlated variables*
* *(b) To understand how each original variable contributes to the new components*
* *(c) To increase the number of dimensions in the data*
* *(d) To remove irrelevant features from the dataset*

### Beginner’s Concept Explained from Scratch

Once PCA creates new variables like $\text{PC}_1$ and $\text{PC}_2$, those components are just abstract mathematical combinations until we interpret them!
By examining the loadings (weights/correlations) of the original variables on each Principal Component, we **understand how each original variable contributes to the new components**, allowing us to give each component a meaningful business or scientific interpretation (e.g., "Overall Sales Performance Index" or "Size vs. Shape").

> **Correct Answer for MCQ 11:** **(b) To understand how each original variable contributes to the new components**

---

## MCQ 12

**Question Reference:** *What is the key difference between PCA and Factor Analysis (FA)?*

* *(a) PCA requires a hypothesis, whereas FA does not*
* *(b) FA identifies latent variables, whereas PCA does not*
* *(c) PCA is suitable for categorical data, whereas FA is used for continuous data*
* *(d) FA is always more accurate than PCA*

### Beginner’s Concept Explained from Scratch

Let us recall the fundamental distinction between **PCA** and **Factor Analysis (FA)**:
* **PCA** simply forms linear combinations of the observed variables to maximize total variance explained; it does **not** assume an underlying model of hidden (latent) variables.
* **Factor Analysis (FA)** explicitly assumes a statistical model where the observed variables are driven by underlying, unobservable **latent variables (common factors)** plus unique error variance.

> **Correct Answer for MCQ 12:** **(b) FA identifies latent variables, whereas PCA does not**

---

## MCQ 13

**Question Reference:** *What does the Kaiser-Meyer-Olkin (KMO) criterion evaluate in FA?*

* *(a) The fit of the regression model*
* *(b) The adequacy of the sample for FA*
* *(c) The appropriate number of factors to extract*
* *(d) The variance explained by each factor*

### Beginner’s Concept Explained from Scratch

Before running a Factor Analysis, we must ask: *"Are our variables correlated enough with each other for Factor Analysis to make sense on this sample?"*
The **Kaiser-Meyer-Olkin (KMO) Measure of Sampling Adequacy** (which ranges from $0$ to $1$, with values $> 0.6$ or $> 0.7$ considered good) compares the magnitudes of observed correlations to partial correlations to evaluate **the adequacy of the sample for Factor Analysis**!
*(Note: Don't confuse **KMO** \[sampling adequacy\] with **Kaiser's eigenvalue $> 1$ rule** \[which chooses the number of factors, (c)\]!)*

> **Correct Answer for MCQ 13:** **(b) The adequacy of the sample for FA**

---

## MCQ 14

**Question Reference:** *What is one key advantage of FA for dimensionality reduction?*

* *(a) It ensures all variables are independent*
* *(b) It combines variables into representative factors*
* *(c) It eliminates the need for hypothesis testing*
* *(d) It requires minimal data preprocessing*

### Beginner’s Concept Explained from Scratch

When you have dozens of survey questions or business metrics, **Factor Analysis (FA)** groups altamente correlated variables together and **combines them into a small number of representative latent factors** that capture the shared essence (common variance) of the original variables, while filtering out unique measurement noise.

> **Correct Answer for MCQ 14:** **(b) It combines variables into representative factors**

---

## MCQ 15

**Question Reference:** *What is the purpose of factor rotation in FA?*

* *(a) To increase the number of factors extracted*
* *(b) To ensure that variables load highly on only one factor*
* *(c) To remove uncorrelated variables from the analysis*
* *(e) \[d\] To calculate the total variance explained by the factors*

### Beginner’s Concept Explained from Scratch

When we first extract factors in FA, many variables load moderately on two or three factors at once, making the table messy and hard to interpret.
**Factor Rotation** (such as Varimax rotation) turns the factor axes in space to achieve **"Simple Structure"**—meaning it adjusts the loadings **to ensure that each variable loads highly on only one factor** (and has near-zero loadings on the remaining factors), making each factor easy to interpret!

> **Correct Answer for MCQ 15:** **(b) To ensure that variables load highly on only one factor**

---

## MCQ 16

**Question Reference:** *What is the primary objective of Exploratory Factor Analysis (EFA)?*

* *(a) To test a predefined factor model*
* *(b) To create a correlation matrix for predictor variables*
* *(c) To determine the predictive power of individual variables*
* *(d) To summarize observed variables into a smaller set of latent variables*

### Beginner’s Concept Explained from Scratch

* Option (a) ("To test a predefined factor model") is the objective of **Confirmatory** Factor Analysis (CFA).
* **Exploratory Factor Analysis (EFA)** is used when we want to explore a large set of observed variables and **summarize (reduce) them into a smaller set of underlying latent variables (factors)**.

> **Correct Answer for MCQ 16:** **(d) To summarize observed variables into a smaller set of latent variables**

---

## MCQ 17

**Question Reference:** *How does Confirmatory Factor Analysis (CFA) differ from EFA?*

* *(a) CFA is exploratory, while EFA is hypothesis-driven*
* *(b) CFA tests a hypothesized model, while EFA identifies latent dimensions*
* *(c) CFA uses fewer latent variables than EFA*
* *(d) CFA is only used for regression analysis*

### Beginner’s Concept Explained from Scratch

* **Exploratory Factor Analysis (EFA)** is data-driven: it explores the data to **identify/discover latent dimensions** without a prior model.
* **Confirmatory Factor Analysis (CFA)** is theory/hypothesis-driven: the researcher specifies a theoretical factor structure in advance and **tests whether that hypothesized model fits the data**.

> **Correct Answer for MCQ 17:** **(b) CFA tests a hypothesized model, while EFA identifies latent dimensions**

---

## MCQ 18

**Question Reference:** *What is the main advantage of using Multivariate Multiple Linear Regression (MMLR) instead of conducting separate regressions for each dependent variable?*

* *(a) It simplifies the model structure*
* *(b) It requires fewer predictors*
* *(c) It accounts for the covariance between the dependent variables*
* *(d) It eliminates the need for hypothesis testing*

### Beginner’s Concept Explained from Scratch

In **Multivariate Multiple Linear Regression (MMLR)**, we have multiple dependent (response) variables $Y_1, Y_2, \dots, Y_m$ predicted by $X_1, \dots, X_p$.
If you run separate OLS regressions for $Y_1$, $Y_2$, etc., you completely ignore the fact that the dependent variables (and their error terms) are correlated with each other!
The main advantage of **MMLR** is that **it accounts for the covariance (correlation) between the dependent variables**, enabling joint hypothesis tests across all responses simultaneously.

> **Correct Answer for MCQ 18:** **(c) It accounts for the covariance between the dependent variables**

---

## MCQ 19

**Question Reference:** *Which of the following are assumptions required for MMLR? (Select all that apply)*

* *(a) All independent variables must follow a normal distribution*
* *(b) The samples must be random and independent*
* *(c) The dependent variables must follow a multivariate normal distribution*
* *(d) The dependent variables must be independent of the independent variables*

### Beginner’s Concept Explained from Scratch

Let us check each of the four statements against the classical assumptions of the Multivariate Multiple Linear Regression model $Y = XB + \mathcal{E}$, where each row of errors $\varepsilon_i' \stackrel{\text{i.i.d.}}{\sim} N_m(0, \Sigma)$:
* **(a) "All independent variables must follow a normal distribution":** **FALSE.** In regression, predictors ($X$) can be fixed constants, binary indicators, or non-normal variables; normality is only required for the error terms / conditional dependent variables.
* **(b) "The samples must be random and independent":** **TRUE.** Different observations (rows $i = 1, \dots, n$) must be independent random draws so their error vectors $\varepsilon_i$ are mutually independent.
* **(c) "The dependent variables must follow a multivariate normal distribution":** **TRUE.** Conditioned on the predictors $X$, the vector of dependent variables $Y_i$ (equivalently, the error vector $\varepsilon_i$) must follow a multivariate normal distribution $N_m(x_i'B, \Sigma)$ for exact hypothesis tests ($F$, Wilks' $\Lambda$).
* **(d) "The dependent variables must be independent of the independent variables":** **FALSE.** The whole point of regression is that the dependent variables $Y$ *depend* on the independent variables $X$!

*(Note: Because the question prompt says "(Select all that apply)", both **(b)** and **(c)** are correct; if a single-bubble stencil requires one primary multivariate assumption, **(c)** \[or **(b)** and **(c)** together\] is the key multivariate distributional assumption).*

> **Correct Answer for MCQ 19:** **(b) The samples must be random and independent** AND **(c) The dependent variables must follow a multivariate normal distribution**

---

## MCQ 20

**Question Reference:** *Why are multivariate test statistics, such as Wilks' Lambda, used in MMLR?*

* *(a) To simplify the regression coefficients*
* *(b) To assess the joint contribution of predictors across models*
* *(c) To calculate residuals and fitted values*
* *(d) To minimize the likelihood of Type II errors*

### Beginner’s Concept Explained from Scratch

In MMLR, suppose we want to know whether predictor $X_3$ (or a group of predictors) significantly affects our entire set of responses $(Y_1, Y_2, \dots, Y_m)$ taken together.
A single $t$-test can only test one response at a time. To test whether a predictor's coefficients are zero **across all response models simultaneously** ($H_0: \beta_{j1} = \beta_{j2} = \dots = \beta_{jm} = 0$), we use a multivariate test statistic like **Wilks’ Lambda (**$\Lambda$**)** **to assess the joint contribution of predictors across models**!

> **Correct Answer for MCQ 20:** **(b) To assess the joint contribution of predictors across models**

---

## MCQ 21

**Question Reference:** *How does MMLR handle residuals compared to single-response linear models?*

* *(a) It provides a single set of residuals for all dependent variables*
* *(b) It calculates residuals for each dependent variable separately*
* *(c) It does not calculate residuals*
* *(d) It averages residuals across all dependent variables*

### Beginner’s Concept Explained from Scratch

In MMLR with $m$ dependent variables ($Y_1, Y_2, \dots, Y_m$), each dependent variable $Y_k$ has its own fitted values $\hat{Y}_k$ and therefore its own column of residuals $\hat{\varepsilon}_k = Y_k - \hat{Y}_k$.
Thus, MMLR **calculates residuals for each dependent variable separately** (assembling them into an $n \times m$ residual matrix $\hat{\mathcal{E}} = [\hat{\varepsilon}_1, \hat{\varepsilon}_2, \dots, \hat{\varepsilon}_m]$, from which the $m \times m$ error covariance matrix $\hat{\Sigma} = \frac{1}{n-p-1}\hat{\mathcal{E}}'\hat{\mathcal{E}}$ is estimated).

> **Correct Answer for MCQ 21:** **(b) It calculates residuals for each dependent variable separately**

---

## Guide to Research Technique Selection Questions (MCQs 22 – 25)

For Questions 22–25, we are asked to choose the most appropriate multivariate technique from:
* **CA (Cluster Analysis):** Groups *observations/cases* (people, voters, customers) into natural clusters when there are no prior group labels.
* **CFA (Confirmatory Factor Analysis):** Tests a *pre-hypothesized* latent factor structure on observed variables.
* **EFA (Exploratory Factor Analysis):** Explores and reduces correlated observed items into a smaller number of *latent factors*.
* **MANOVA (Multivariate Analysis of Variance):** Tests whether the *mean vectors of multiple continuous responses* differ across *categorical groups* (e.g., Male vs. Female).
* **MANCOVA (Multivariate Analysis of Covariance):** Like MANOVA, but adjusts for continuous covariates.
* **MMLR (Multivariate Multiple Linear Regression):** Models how multiple predictors influence *multiple continuous dependent variables* simultaneously.
* **PCA (Principal Component Analysis):** Reduces correlated variables into orthogonal *principal components* maximizing total variance explained.
* **SEM (Structural Equation Modeling):** Combines CFA measurement models and structural regression paths among latent variables.

---

## MCQ 22

**Question Reference:** *Do the mean values of three blood measurements (magnesium, iron, and potassium, all continuous) differ between male and female elderly Americans?*

* *(a) MANCOVA*
* *(b) MANOVA*
* *(c) MMLR*
* *(d) SEM*

### Beginner’s Step-by-Step Identification

1. **What are the Dependent (Response) Variables?** Three continuous blood measurements ($Y_1 =$ magnesium, $Y_2 =$ iron, $Y_3 =$ potassium).
2. **What is the Independent (Grouping) Variable?** One categorical variable with two groups: **Gender (Male vs. Female)**.
3. **What is the Question Asking?** Whether the **mean values** of the three continuous responses differ across the categorical groups (Male vs. Female).
4. **Which Technique Matches?** Comparing a vector of multiple continuous means across categorical groups (with no covariates) is the exact definition of **MANOVA**!

> **Correct Answer for MCQ 22:** **(b) MANOVA**

---

## MCQ 23

**Question Reference:** *In a random sample of Americans, how do age, number of years of college education, IQ, and gender influence mean annual income, mean savings, and mean monthly expenditures (all continuous variables)?*

* *(a) CA*
* *(b) CFA*
* *(c) EFA*
* *(d) PCA*

### Beginner’s Step-by-Step Identification & Important Note on Exam Printing Typo

1. **What are the Dependent (Response) Variables?** Three continuous financial outcomes ($Y_1 =$ annual income, $Y_2 =$ savings, $Y_3 =$ monthly expenditures).
2. **What are the Independent (Predictor) Variables?** Four predictors ($X_1 =$ age, $X_2 =$ years of college education, $X_3 =$ IQ, and $X_4 =$ gender).
3. **What is the True Statistical Technique?** Because we are predicting **multiple continuous dependent variables (**$Y_1, Y_2, Y_3$**)** from **multiple predictor variables (**$X_1, X_2, X_3, X_4$**)**, the exact multivariate statistical technique from the course list on Page 6 is **MMLR (Multivariate Multiple Linear Regression)** (or **MANCOVA**, since gender is categorical and age, education, and IQ are continuous covariates).
4. **Why isn't MMLR or MANCOVA listed in options (a)–(d)?**
   Look at the printed options for Questions 23, 24, and 25 in the December 2024 exam paper: all three questions accidentally had the exact same block of four choices `(a) CA, (b) CFA, (c) EFA, (d) PCA` pasted under them (copied from Question 22's format where `(c) MMLR` was in position `(c)`!). In fact, in the **October 2025 Final Exam (MCQ 22)**, this exact question type was reprinted with the corrected options `(a) LR, (b) MANOVA, (c) MMLR, (d) PCR`, where the official answer is **(c) MMLR**!
   * **Exam Advice:** As instructed on Page 1 of the exam paper (*"If you have any doubt as to the interpretation of the wording of a question, make your own decision, but clearly state it on the answer script"*), state clearly on your script that the true technique is **MMLR (or MANCOVA)**, and if marking the stencil, note that position **(c)** was intended to be **MMLR**.

> **Correct Answer for MCQ 23:** **MMLR (Multivariate Multiple Linear Regression) / MANCOVA** *(Note printing typo in options (a)–(d) where `(c) MMLR` was overwritten by `(c) EFA`)*

---

## MCQ 24

**Question Reference:** *Five different variables are measured for each of 60 American voters. Into how many distinct groups do the voters naturally segregate based on these five variables?*

* *(a) CA*
* *(b) CFA*
* *(c) EFA*
* *(d) PCA*

### Beginner’s Step-by-Step Identification

1. **What are we grouping?** We are grouping the **60 American voters (the observations/cases)**—*not* the 5 variables!
2. **Do we have pre-existing group labels?** No, we want to discover how the voters **naturally segregate into distinct groups (clusters)** based on their similarity across the 5 variables.
3. **Which Technique Matches?** Grouping observations/people into natural clusters without prior labels is **Cluster Analysis (CA)**!

> **Correct Answer for MCQ 24:** **(a) CA (Cluster Analysis)**

---

## MCQ 25

**Question Reference:** *A satisfaction survey includes 10 items measured on a 7-point Likert scale. Into how many factors can these 10 items be reduced to retain at least 60% of the explained variance?*

* *(a) CA*
* *(b) CFA*
* *(c) EFA*
* *(d) PCA*

### Beginner’s Step-by-Step Identification

1. **What are we reducing?** We have $10$ survey items and want to discover **into how many factors** these $10$ items can be reduced (we do *not* have a pre-specified number of factors, so it is exploratory, not confirmatory).
2. **Which Technique Matches?** Reducing survey items into underlying **factors** without a predefined factor count is **Exploratory Factor Analysis (EFA)** (or **PCA** if reducing into principal components; since the prompt specifically asks *"Into how many **factors** can these 10 items be reduced"*, **(c) EFA** \[or **(d) PCA**\] directly applies).

> **Correct Answer for MCQ 25:** **(c) EFA (Exploratory Factor Analysis)** *(Note: **(d) PCA** is also closely related when retaining a target % of total explained variance).*

---
---

# PART II: ESSAY QUESTIONS `[Total: 50 Marks]`

---

# Question 1 `[Total: 25 Marks]`

## Reference Setup from the Question

Let $X$ be $N_3(\mu, \Sigma)$ with:

$$
\mu = \begin{bmatrix} 2 \\ -1 \\ 4 \end{bmatrix} \quad \text{and} \quad \Sigma = \begin{bmatrix} 1 & -2 & 0 \\ -2 & 5 & 0 \\ 0 & 0 & 2 \end{bmatrix}
$$

### Beginner’s Foundation: Reading Every Number in $\mu$ and $\Sigma$

Let us translate the given vector $\mu$ and matrix $\Sigma$ into plain English before solving any sub-questions:

1. **What is** $X$**?**
   $X = \begin{bmatrix} X_1 \\ X_2 \\ X_3 \end{bmatrix}$ is a column vector of **3 random variables** that jointly follow a 3-variate Normal distribution ($N_3$).
2. **What is the Mean Vector** $\mu$**?**
   $\mu$ lists the average (expected value) of each of the three variables:
   * Mean of $X_1$: $\mu_1 = 2$
   * Mean of $X_2$: $\mu_2 = -1$
   * Mean of $X_3$: $\mu_3 = 4$
3. **What is the Covariance Matrix** $\Sigma$**?**
   $\Sigma$ is a $3 \times 3$ table of variances (on the main diagonal) and covariances (off the main diagonal):

   | | Col 1 ($X_1$) | Col 2 ($X_2$) | Col 3 ($X_3$) |
   | :--- | :---: | :---: | :---: |
   | **Row 1 ($X_1$)** | $\sigma_{11} = 1$ | $\sigma_{12} = -2$ | $\sigma_{13} = 0$ |
   | **Row 2 ($X_2$)** | $\sigma_{21} = -2$ | $\sigma_{22} = 5$ | $\sigma_{23} = 0$ |
   | **Row 3 ($X_3$)** | $\sigma_{31} = 0$ | $\sigma_{32} = 0$ | $\sigma_{33} = 2$ |

   * **Variances (Main Diagonal):**
     * $\text{Var}(X_1) = \sigma_{11} = 1$
     * $\text{Var}(X_2) = \sigma_{22} = 5$
     * $\text{Var}(X_3) = \sigma_{33} = 2$
   * **Covariances (Off-Diagonal):**
     * $\text{Cov}(X_1, X_2) = \sigma_{12} = \sigma_{21} = -2$
     * $\text{Cov}(X_1, X_3) = \sigma_{13} = \sigma_{31} = 0$
     * $\text{Cov}(X_2, X_3) = \sigma_{23} = \sigma_{32} = 0$

---

## Part (a): Find the distribution of $X_2$. `[2 marks]`

### Beginner’s Explanation

Any single variable from a Multivariate Normal distribution follows a **Univariate Normal Distribution** $N(\mu_i, \sigma_{ii})$.
For $X_2$:
* Look at the 2nd row of $\mu$: the mean of $X_2$ is $\mu_2 = -1$.
* Look at Row 2, Column 2 of $\Sigma$: the variance of $X_2$ is $\sigma_{22} = 5$.

### Final Answer for Part (a)

$X_2$ follows a univariate normal distribution with mean $-1$ and variance $5$:

$$
X_2 \sim N(-1, \, 5)
$$

---

## Part (b): Find the distribution of $X_2 - 3X_1 - X_3$. `[4 marks]`

### Beginner’s Concept: Distribution of a Linear Combination $a'X$

Whenever we combine $X_1, X_2, X_3$ into a single linear combination $Y = a_1 X_1 + a_2 X_2 + a_3 X_3 = a'X$, the resulting variable $Y$ follows a **Univariate Normal Distribution**:

$$
Y = a'X \sim N(a'\mu, \, a'\Sigma a)
$$

**Watch Out for the Order of Variables!**
Notice how the question wrote the expression: $X_2 - 3X_1 - X_3$.
Wait! $X_2$ is written *first* and $-3X_1$ is written *second*! Let us rearrange the terms in standard order ($X_1$ first, $X_2$ second, $X_3$ third) so we never mix up the weights:

$$
Y = X_2 - 3X_1 - X_3 = (-3)X_1 + (1)X_2 + (-1)X_3
$$

### Step-by-Step Calculation

#### Step 1: Write down the weight vector $a'$ and $a$

From $(-3)X_1 + (1)X_2 + (-1)X_3$, the weights for $X_1, X_2, X_3$ are $-3$, $1$, and $-1$:

$$
a' = \begin{bmatrix} -3 & 1 & -1 \end{bmatrix} \quad \text{and} \quad a = \begin{bmatrix} -3 \\ 1 \\ -1 \end{bmatrix}
$$

#### Step 2: Calculate the Mean ($E(Y) = a'\mu$)

$$
E(X_2 - 3X_1 - X_3) = a'\mu = \begin{bmatrix} -3 & 1 & -1 \end{bmatrix} \begin{bmatrix} 2 \\ -1 \\ 4 \end{bmatrix}
$$

$$
= (-3)(2) + (1)(-1) + (-1)(4) = -6 - 1 - 4 = -11
$$

#### Step 3: Calculate the Variance ($\text{Var}(Y) = a'\Sigma a$)

We compute $\begin{bmatrix} -3 & 1 & -1 \end{bmatrix} \begin{bmatrix} 1 & -2 & 0 \\ -2 & 5 & 0 \\ 0 & 0 & 2 \end{bmatrix} \begin{bmatrix} -3 \\ 1 \\ -1 \end{bmatrix}$ in two stages:

* **Stage 3A: Multiply the row vector** $a'$ **by the** $3 \times 3$ **matrix** $\Sigma$**:**

  $$
  a'\Sigma = \begin{bmatrix} -3 & 1 & -1 \end{bmatrix} \begin{bmatrix} 1 & -2 & 0 \\ -2 & 5 & 0 \\ 0 & 0 & 2 \end{bmatrix}
  $$

  * **First entry (Col 1 of** $\Sigma$**):** $(-3)(1) + (1)(-2) + (-1)(0) = -3 - 2 + 0 = -5$
  * **Second entry (Col 2 of** $\Sigma$**):** $(-3)(-2) + (1)(5) + (-1)(0) = 6 + 5 + 0 = 11$
  * **Third entry (Col 3 of** $\Sigma$**):** $(-3)(0) + (1)(0) + (-1)(2) = 0 + 0 - 2 = -2$

  So:

  $$
  a'\Sigma = \begin{bmatrix} -5 & 11 & -2 \end{bmatrix}
  $$

* **Stage 3B: Multiply** $a'\Sigma$ **by the column vector** $a$**:**

  $$
  a'\Sigma a = \begin{bmatrix} -5 & 11 & -2 \end{bmatrix} \begin{bmatrix} -3 \\ 1 \\ -1 \end{bmatrix} = (-5)(-3) + (11)(1) + (-2)(-1) = 15 + 11 + 2 = 28
  $$

*(Alternative Algebraic Verification for Beginners:*
$\text{Var}(-3X_1 + X_2 - X_3) = (-3)^2\text{Var}(X_1) + 1^2\text{Var}(X_2) + (-1)^2\text{Var}(X_3) + 2(-3)(1)\text{Cov}(X_1,X_2) + 2(-3)(-1)\text{Cov}(X_1,X_3) + 2(1)(-1)\text{Cov}(X_2,X_3) = 9(1) + 1(5) + 1(2) - 6(-2) + 6(0) - 2(0) = 9 + 5 + 2 + 12 = 28$*. Both methods give $28$!)*

### Final Answer for Part (b)

$$
X_2 - 3X_1 - X_3 \sim N(-11, \, 28)
$$

---

## Part (c): Find the distribution of $X_2 - 3X_1 - X_3 + 3$. `[2 marks]`

### Beginner’s Explanation: What Happens When We Add a Constant ($+3$) to a Normal Variable?

In Part (b), we found that $Y = X_2 - 3X_1 - X_3$ follows $N(-11, \, 28)$.
Now in Part (c), we simply add the fixed constant $+3$ to $Y$:
1. **What happens to the Mean?** Adding $+3$ to every outcome shifts the average up by $+3$:

   $$
   E(Y + 3) = E(Y) + 3 = -11 + 3 = -8
   $$

2. **What happens to the Variance?** Adding a fixed constant shifts the entire bell curve to the right without stretching or shrinking its width at all! The variance of a constant is $0$:

   $$
   \text{Var}(Y + 3) = \text{Var}(Y) = 28
   $$

### Final Answer for Part (c)

$$
X_2 - 3X_1 - X_3 + 3 \sim N(-8, \, 28)
$$

---

## Part (d): Find the joint distribution of $X_2$ and $X_2 - 3X_1 - X_3$. `[5 marks]`

### Beginner’s Concept: Joint Distribution of Two Linear Combinations ($AX$)

We want the joint (2-variate normal) distribution of the vector:

$$
\begin{bmatrix} X_2 \\ X_2 - 3X_1 - X_3 \end{bmatrix} = \begin{bmatrix} 0X_1 + 1X_2 + 0X_3 \\ -3X_1 + 1X_2 - 1X_3 \end{bmatrix} = \begin{bmatrix} 0 & 1 & 0 \\ -3 & 1 & -1 \end{bmatrix} \begin{bmatrix} X_1 \\ X_2 \\ X_3 \end{bmatrix} = AX
$$

Since $X \sim N_3(\mu, \Sigma)$, the vector $AX$ follows a bivariate normal distribution $N_2(A\mu, \, A\Sigma A')$.

### Step-by-Step Calculation

#### Step 1: Identify $A$ and its transpose $A'$

$$
A = \begin{bmatrix} 0 & 1 & 0 \\ -3 & 1 & -1 \end{bmatrix} \quad \text{and} \quad A' = \begin{bmatrix} 0 & -3 \\ 1 & 1 \\ 0 & -1 \end{bmatrix}
$$

#### Step 2: Calculate the Mean Vector ($A\mu$)

$$
A\mu = \begin{bmatrix} 0 & 1 & 0 \\ -3 & 1 & -1 \end{bmatrix} \begin{bmatrix} 2 \\ -1 \\ 4 \end{bmatrix} = \begin{bmatrix} (0)(2) + (1)(-1) + (0)(4) \\ (-3)(2) + (1)(-1) + (-1)(4) \end{bmatrix} = \begin{bmatrix} -1 \\ -11 \end{bmatrix}
$$

*(Notice how this matches our answers from Part (a) where $E(X_2) = -1$ and Part (b) where $E(X_2 - 3X_1 - X_3) = -11$!)*

#### Step 3: Calculate the Covariance Matrix ($A\Sigma A'$)

* **Stage 3A: Multiply** $A$ **(**$2 \times 3$**) by** $\Sigma$ **(**$3 \times 3$**):**

  $$
  A\Sigma = \begin{bmatrix} 0 & 1 & 0 \\ -3 & 1 & -1 \end{bmatrix} \begin{bmatrix} 1 & -2 & 0 \\ -2 & 5 & 0 \\ 0 & 0 & 2 \end{bmatrix}
  $$

  * **Row 1 of** $A\Sigma$ **(just picks Row 2 of** $\Sigma$**):** $\begin{bmatrix} -2 & 5 & 0 \end{bmatrix}$
  * **Row 2 of** $A\Sigma$ **(already computed in Part (b)):** $\begin{bmatrix} -5 & 11 & -2 \end{bmatrix}$

  So:

  $$
  A\Sigma = \begin{bmatrix} -2 & 5 & 0 \\ -5 & 11 & -2 \end{bmatrix}
  $$

* **Stage 3B: Multiply** $A\Sigma$ **(**$2 \times 3$**) by** $A'$ **(**$3 \times 2$**):**

  $$
  A\Sigma A' = \begin{bmatrix} -2 & 5 & 0 \\ -5 & 11 & -2 \end{bmatrix} \begin{bmatrix} 0 & -3 \\ 1 & 1 \\ 0 & -1 \end{bmatrix}
  $$

  * **Row 1, Col 1:** $(-2)(0) + (5)(1) + (0)(0) = 5$
  * **Row 1, Col 2:** $(-2)(-3) + (5)(1) + (0)(-1) = 6 + 5 + 0 = 11$
  * **Row 2, Col 1:** $(-5)(0) + (11)(1) + (-2)(0) = 11$
  * **Row 2, Col 2:** $(-5)(-3) + (11)(1) + (-2)(-1) = 15 + 11 + 2 = 28$

  So:

  $$
  A\Sigma A' = \begin{bmatrix} 5 & 11 \\ 11 & 28 \end{bmatrix}
  $$

### Final Answer for Part (d)

$$
\begin{bmatrix} X_2 \\ X_2 - 3X_1 - X_3 \end{bmatrix} \sim N_2\left( \begin{bmatrix} -1 \\ -11 \end{bmatrix}, \, \begin{bmatrix} 5 & 11 \\ 11 & 28 \end{bmatrix} \right)
$$

---

## Part (e): Find the distribution of $\begin{bmatrix} X_1 \\ X_3 \end{bmatrix}$. `[4 marks]`

### Step-by-Step Calculation Using Partitioning

Let us rearrange $X$, $\mu$, and $\Sigma$ so that $X_1$ and $X_3$ come first and $X_2$ comes last:
* Means: $\mu_1 = 2$, $\mu_3 = 4$, and $\mu_2 = -1$.
* Variances and Covariances:
  * $\sigma_{11} = 1$, $\sigma_{33} = 2$, and $\sigma_{13} = \sigma_{31} = 0$.
  * Cross-covariances with $X_2$: $\sigma_{12} = -2$, $\sigma_{32} = 0$, and $\sigma_{22} = 5$.

Writing the rearranged and partitioned vector and matrices:

$$
X^* = \begin{bmatrix} X_1 \\ X_3 \\ \hline X_2 \end{bmatrix}, \quad \mu^* = \begin{bmatrix} 2 \\ 4 \\ \hline -1 \end{bmatrix}, \quad \Sigma^* = \begin{bmatrix} 1 & 0 & \vline & -2 \\ 0 & 2 & \vline & 0 \\ \hline -2 & 0 & \vline & 5 \end{bmatrix}
$$

Reading off the top-left block for $\begin{bmatrix} X_1 \\ X_3 \end{bmatrix}$:

### Final Answer for Part (e)

$$
\begin{bmatrix} X_1 \\ X_3 \end{bmatrix} \sim N_2\left( \begin{bmatrix} 2 \\ 4 \end{bmatrix}, \, \begin{bmatrix} 1 & 0 \\ 0 & 2 \end{bmatrix} \right)
$$

---

## Part (f): Which of the following random variables are independent? Explain.

### Beginner’s Golden Rule of Independence (Repeated from Scratch)

For Multivariate Normal random variables, **two variables (or subvectors) are statistically independent IF AND ONLY IF their covariance (or cross-covariance matrix) is equal to zero ($0$)**.

### (f)(i) $X_1$ and $X_2$ `[1 mark]`

* From Row 1, Column 2 of $\Sigma$, $\text{Cov}(X_1, X_2) = \sigma_{12} = -2 \neq 0$.
* **Answer:** **No,** $X_1$ **and** $X_2$ **are NOT independent**, because $\text{Cov}(X_1, X_2) = -2 \neq 0$.

### (f)(ii) $X_2$ and $X_3$ `[1 mark]`

* From Row 2, Column 3 of $\Sigma$, $\text{Cov}(X_2, X_3) = \sigma_{23} = 0$.
* **Answer:** **Yes,** $X_2$ **and** $X_3$ **ARE independent**, because they are jointly normal and $\text{Cov}(X_2, X_3) = 0$.

### (f)(iii) $X_2$ and $X_2 - 3X_1 - X_3$ `[2 marks]`

* From the joint distribution covariance matrix $\begin{bmatrix} 5 & 11 \\ 11 & 28 \end{bmatrix}$ in Part (d), the off-diagonal entry is $\text{Cov}(X_2, \, X_2 - 3X_1 - X_3) = 11 \neq 0$.
* **Answer:** **No,** $X_2$ **and** $X_2 - 3X_1 - X_3$ **are NOT independent**, because from Part (d), $\text{Cov}(X_2, \, X_2 - 3X_1 - X_3) = 11 \neq 0$.

### (f)(iv) $X_2$ and $X_2 - 3X_1 - X_3 + 3$ `[2 marks]`

* Adding a constant ($+3$) to a random variable never changes its covariance with another variable:

  $$
  \text{Cov}(X_2, \, X_2 - 3X_1 - X_3 + 3) = \text{Cov}(X_2, \, X_2 - 3X_1 - X_3) + \text{Cov}(X_2, 3) = 11 + 0 = 11 \neq 0
  $$

* **Answer:** **No,** $X_2$ **and** $X_2 - 3X_1 - X_3 + 3$ **are NOT independent**, because $\text{Cov}(X_2, \, X_2 - 3X_1 - X_3 + 3) = 11 \neq 0$.

### (f)(v) $\begin{bmatrix} X_1 \\ X_3 \end{bmatrix}$ and $X_2$ `[2 marks]`

* From the partitioned matrix $\Sigma^*$ in Part (e), the cross-covariance vector between $\begin{bmatrix} X_1 \\ X_3 \end{bmatrix}$ and $X_2$ is:

  $$
  \text{Cov}\left( \begin{bmatrix} X_1 \\ X_3 \end{bmatrix}, \, X_2 \right) = \begin{bmatrix} \text{Cov}(X_1, X_2) \\ \text{Cov}(X_3, X_2) \end{bmatrix} = \begin{bmatrix} -2 \\ 0 \end{bmatrix} \neq \begin{bmatrix} 0 \\ 0 \end{bmatrix}
  $$

* **Answer:** **No,** $\begin{bmatrix} X_1 \\ X_3 \end{bmatrix}$ **and** $X_2$ **are NOT independent**, because $\text{Cov}\left(\begin{bmatrix} X_1 \\ X_3 \end{bmatrix}, X_2\right) = \begin{bmatrix} -2 \\ 0 \end{bmatrix} \neq \begin{bmatrix} 0 \\ 0 \end{bmatrix}$ (specifically, $\text{Cov}(X_1, X_2) = -2 \neq 0$).

---
---

# Question 2 `[Total: 25 Marks]`

## Reference Setup from the Question

A financial analyst fits a Multivariate Multiple Linear Regression (MMLR) model using stock performance data recorded at the end of each trading day in the New York Stock Exchange:
* **Two Response Variables ($Y_1, Y_2$):**
  * $Y_1 =$ closing price of Stock A
  * $Y_2 =$ closing price of Stock B
* **Three Predictor Variables ($X_1, X_2, X_3$):**
  * $X_1 =$ trading volume
  * $X_2 =$ market index value
  * $X_3 =$ interest rate

The following partial R output is obtained:

```
Response Y1:
Coefficients:
             Estimate Std. Error t value Pr(>|t|)
(Intercept) 50.347207  10.314064   4.884 0.000013
X1           0.027070   0.310717  -0.087 0.931064
X2           0.477223   0.260599   1.831 0.074922
X3           0.105422   0.049751   2.118 0.043030
Residual standard error: 8.071 on 38 degrees of freedom
Multiple R-squared: 0.4018, Adjusted R-squared: 0.3467
F-statistic: 7.475 on 3 and 38 DF, p-value: 0.001155

Response Y2:
Coefficients:
            Estimate Std. Error t value Pr(>|t|)
(Intercept) 25.22748    5.41013   4.662   0.0000
X1          -0.87203    0.64009  -1.362   0.1818
X2          -0.86222    0.68342  -1.262   0.2149
X3           0.12903    0.06757   1.910   0.0620
Residual standard error: 6.223 on 38 degrees of freedom
Multiple R-squared: 0.2837, Adjusted R-squared: 0.2192
F-statistic: 4.85 on 3 and 38 DF, p-value: 0.01208

Type II MANOVA Tests: Wilks test statistic
   Df test stat approx F num Df den Df Pr(>F)
X1  1   0.80595   2.9206      2     37 0.0658
X2  1   0.68789  10.9685      2     37 0.0005
X3  1   0.80512   2.0393      2     37 0.1522

Analysis of Variance Table
Model 1: cbind(Y1, Y2) ~ X1 + X2 + X3
Model 2: cbind(Y1, Y2) ~ X2
  Res.Df Df Gen.var.   Wilks approx F num Df den Df  Pr(>F)
1     38      5.7384
2     40  2   6.0054 0.80878   2.0711      4     74 0.10316
```

---

## Part (a): Briefly discuss the advantage of considering response variables simultaneously rather than individually in linear regression, in order to draw inferences. `[2 marks]`

### Beginner’s Explanation & Complete Exam Answer

In financial markets, the closing prices of Stock A ($Y_1$) and Stock B ($Y_2$) on the same trading day are correlated because both stocks react to shared market conditions (meaning their regression error terms covary).
Considering the response variables **simultaneously** in a Multivariate Multiple Linear Regression (MMLR) model rather than fitting separate individual regressions provides three major advantages for drawing statistical inferences:
1. **Incorporates Error Covariance:** It explicitly accounts for the correlation/covariance between the responses ($Y_1$ and $Y_2$).
2. **Controls the Type I Error Rate:** Running separate univariate hypothesis tests for each stock inflates the overall probability of making a false-positive (Type I) error, whereas simultaneous multivariate tests (such as Wilks' Lambda) maintain the correct overall significance level $\alpha$.
3. **Joint Hypothesis Testing & Higher Power:** It enables joint tests of whether a predictor (such as trading volume or market index) simultaneously influences *both* stock prices together, providing higher statistical power to detect shared market effects that might look weak in isolated univariate tests.

---

## Part (b): Use only the first response $Y_1$ to answer the following questions and assume $\alpha = 10\%$.

### Beginner’s Reminder: Using the Cutoff $\alpha = 10\%$ ($\alpha = 0.10$)

Here our significance level is $\alpha = 0.10$:
* If $\text{p-value} < 0.10 \implies$ **Reject** $H_0$ (**Statistically Significant!**)
* If $\text{p-value} \ge 0.10 \implies$ **Fail to reject** $H_0$ (**Not Statistically Significant**).

### (b)(i) Is there evidence of a relationship between the predictors and the response? Justify your answer. `[2 marks]`

* **Step-by-Step Check:**
  Look at the bottom line of the `Response Y1:` output:
  `F-statistic: 7.475 on 3 and 38 DF, p-value: 0.001155`
  This tests $H_0: \beta_{11} = \beta_{21} = \beta_{31} = 0$ (none of the predictors are linearly related to Stock A's closing price $Y_1$) vs. $H_1:$ at least one $\beta_{j1} \neq 0$.
  Since $\text{p-value} = 0.001155 < 0.10$, we reject $H_0$.
* **Final Answer for (b)(i):**
  **Yes**, there is strong statistical evidence of a relationship between the predictors ($X_1, X_2, X_3$) and the first response $Y_1$ (closing price of Stock A) at the $10\%$ significance level, because the overall $F$-test $p\text{-value} = 0.001155 < 0.10$ (with $F = 7.475$).

### (b)(ii) Which predictors appear to have a statistically significant relationship with the response? `[2 marks]`

* **Step-by-Step Check:**
  Compare each predictor's individual $t$-test $p$-value in the `Pr(>|t|)` column of the `Response Y1:` table against $\alpha = 0.10$:
  * $X_1$ (trading volume): $\text{p-value} = 0.931064 > 0.10 \implies$ Not significant.
  * **$X_2$ (market index value):** $\text{p-value} = 0.074922 < 0.10 \implies$ **Significant!**
  * **$X_3$ (interest rate):** $\text{p-value} = 0.043030 < 0.10 \implies$ **Significant!**
  *(Note: The Intercept also has $\text{p-value} = 0.000013 < 0.10$, which is significant).*
* **Final Answer for (b)(ii):**
  **$X_2$ (market index value) and $X_3$ (interest rate)** appear to have a statistically significant relationship with $Y_1$ at the $\alpha = 10\%$ level, because their $p$-values are $0.074922 < 0.10$ and $0.043030 < 0.10$, respectively (whereas $X_1$ is not significant with $p\text{-value} = 0.931064 > 0.10$).

### (b)(iii) Compute the predicted value of the response when $X_1 = 5000$, $X_2 = 20000$, and $X_3 = 3$. `[3 marks]`

* **Beginner’s Guide (Showing Both Standard Calculation Methods):**
  We show both the **Reduced Prediction** (using only the statistically significant terms at $\alpha = 0.10$, as done in the official marking scheme) and the **Full Equation Prediction** (using all three predictors) so your answer is $100\%$ bulletproof!
* **Method 1: Using Only the Statistically Significant Terms at $\alpha = 10\%$ (Intercept, $X_2$, and $X_3$):**
  From the `Estimate` column of `Response Y1:`, the Intercept is $50.347207$, the slope for $X_2$ is $0.477223$, and the slope for $X_3$ is $0.105422$:

  $$
  \hat{Y}_1 = 50.347207 + 0.477223 X_2 + 0.105422 X_3
  $$

  Substitute $X_2 = 20000$ and $X_3 = 3$:

  $$
  \hat{Y}_1 = 50.347207 + 0.477223(20000) + 0.105422(3)
  $$

  $$
  \hat{Y}_1 = 50.347207 + 9544.460000 + 0.316266 = 9595.123473 \approx 9595.1235
  $$

* **Method 2: Using the Full Fitted Regression Equation (All 3 Predictors):**
  *(Note: In the printed R table for $Y_1$, the `Estimate` for $X_1$ is printed as `0.027070` while its `t value` is `-0.087`; we show the result with the printed `+0.027070` as well as `-0.027070`)*:
  * Using printed $+0.027070$:

    $$
    \hat{Y}_1 = 50.347207 + 0.027070(5000) + 0.477223(20000) + 0.105422(3) = 9595.1235 + 135.35 = 9730.4735
    $$

  * Using $-0.027070$:

    $$
    \hat{Y}_1 = 50.347207 - 0.027070(5000) + 0.477223(20000) + 0.105422(3) = 9595.1235 - 135.35 = 9459.7735
    $$

---

## Part (c): Repeat the questions in (b) using only the second response $Y_2$. `[7 marks]`

Let us examine the `Response Y2:` table with $\alpha = 10\% = 0.10$:

```
Response Y2:
Coefficients:
            Estimate Std. Error t value Pr(>|t|)
(Intercept) 25.22748    5.41013   4.662   0.0000
X1          -0.87203    0.64009  -1.362   0.1818
X2          -0.86222    0.68342  -1.262   0.2149
X3           0.12903    0.06757   1.910   0.0620
Residual standard error: 6.223 on 38 degrees of freedom
Multiple R-squared: 0.2837, Adjusted R-squared: 0.2192
F-statistic: 4.85 on 3 and 38 DF, p-value: 0.01208
```

### (c)(i) Is there evidence of a relationship between the predictors and the second response $Y_2$? Justify your answer. `[2 marks]`

* **Step-by-Step Check:**
  Look at the bottom line of the `Response Y2:` output:
  `F-statistic: 4.85 on 3 and 38 DF, p-value: 0.01208`
  Since $\text{p-value} = 0.01208 < 0.10$, we reject $H_0$.
* **Final Answer for (c)(i):**
  **Yes**, there is statistically significant evidence of a relationship between the predictors and the second response $Y_2$ (closing price of Stock B) at the $\alpha = 10\%$ level, because the overall $F$-test $p\text{-value} = 0.01208 < 0.10$ (with $F = 4.85$).

### (c)(ii) Which predictors appear to have a statistically significant relationship with $Y_2$? `[2 marks]`

* **Step-by-Step Check:**
  Compare each predictor's `Pr(>|t|)` value in the `Response Y2:` table against $\alpha = 0.10$:
  * $X_1$ (trading volume): $\text{p-value} = 0.1818 > 0.10 \implies$ Not significant.
  * $X_2$ (market index value): $\text{p-value} = 0.2149 > 0.10 \implies$ Not significant.
  * **$X_3$ (interest rate):** $\text{p-value} = 0.0620 < 0.10 \implies$ **Significant!**
  *(Note: The Intercept also has $\text{p-value} = 0.0000 < 0.10$, which is significant).*
* **Final Answer for (c)(ii):**
  **Only $X_3$ (interest rate)** appears to have a statistically significant relationship with $Y_2$ at the $\alpha = 10\%$ level, because its $p\text{-value} = 0.0620 < 0.10$ (whereas $X_1$ with $p = 0.1818$ and $X_2$ with $p = 0.2149$ are both greater than $0.10$).

### (c)(iii) Compute the predicted value of $Y_2$ when $X_1 = 5000$, $X_2 = 20000$, and $X_3 = 3$. `[3 marks]`

* **Method 1: Using Only the Statistically Significant Terms at $\alpha = 10\%$ (Intercept and $X_3$):**
  From the `Estimate` column of `Response Y2:`, the Intercept is $25.22748$ and the slope for $X_3$ is $0.12903$:

  $$
  \hat{Y}_2 = 25.22748 + 0.12903 X_3
  $$

  Substitute $X_3 = 3$:

  $$
  \hat{Y}_2 = 25.22748 + 0.12903(3) = 25.22748 + 0.38709 = 25.61457
  $$

* **Method 2: Using the Full Fitted Regression Equation (All 3 Predictors):**

  $$
  \hat{Y}_2 = 25.22748 - 0.87203 X_1 - 0.86222 X_2 + 0.12903 X_3
  $$

  Substitute $X_1 = 5000$, $X_2 = 20000$, and $X_3 = 3$:

  $$
  \hat{Y}_2 = 25.22748 - 0.87203(5000) - 0.86222(20000) + 0.12903(3)
  $$

  $$
  \hat{Y}_2 = 25.22748 - 4360.15000 - 17244.40000 + 0.38709 = -21578.93543
  $$

---

## Part (d): Explain the meaning of the Multiple R-squared and Adjusted R-squared values for $Y_1$ and $Y_2$ in the R output. How do they relate to the goodness of fit? `[3 marks]`

### Beginner’s Concept Explained from Scratch

1. **What is Multiple R-Squared ($R^2$)?**
   Multiple $R^2$ (the coefficient of determination) measures the **proportion (or percentage) of the total variation in the response variable $Y$ that is explained by the predictor variables ($X_1, X_2, X_3$) in the linear regression model**. It ranges from $0$ ($0\%$ explained) to $1$ ($100\%$ explained):
   * **For Stock A ($Y_1$):** `Multiple R-squared = 0.4018`, which means **$40.18\%$ of the total variation in the closing price of Stock A** is explained by trading volume ($X_1$), market index value ($X_2$), and interest rate ($X_3$).
   * **For Stock B ($Y_2$):** `Multiple R-squared = 0.2837`, which means **$28.37\%$ of the total variation in the closing price of Stock B** is explained by the three predictors.
2. **What is Adjusted R-Squared ($R_{\text{adj}}^2$) and Why Do We Need It?**
   A weakness of Multiple $R^2$ is that it *always* increases (or stays the same) whenever you add more predictors to a model, even if those new predictors are useless noise!
   **Adjusted R-Squared** ($R_{\text{adj}}^2 = 1 - \frac{\text{SSE}/(n-p-1)}{\text{SST}/(n-1)}$) adjusts Multiple $R^2$ by **penalizing the model for the number of predictors ($p$) relative to the sample size ($n$)**:
   * **For Stock A ($Y_1$):** `Adjusted R-squared = 0.3467` ($34.67\%$).
   * **For Stock B ($Y_2$):** `Adjusted R-squared = 0.2192` ($21.92\%$).
   Notice that both Adjusted $R^2$ values are noticeably lower than their Multiple $R^2$ values ($34.67\%$ vs. $40.18\%$ for $Y_1$, and $21.92\%$ vs. $28.37\%$ for $Y_2$) because the model includes non-significant predictors (like $X_1$).
3. **How They Relate to Goodness of Fit:**
   Higher values of $R^2$ and Adjusted $R^2$ (closer to $1.0$) indicate a better **goodness of fit** (the regression line fits the observed data points more closely). Here, the predictors provide a **moderate goodness of fit for Stock A ($Y_1$)** ($40.18\%$ explained) and a **weaker goodness of fit for Stock B ($Y_2$)** ($28.37\%$ explained), leaving $59.82\%$ and $71.63\%$ of the variation unexplained, respectively.

---

## Part (e): What conclusions can you draw from the Type II MANOVA Tests in the R output? (use $\alpha = 10\%$) `[2 marks]`

### Beginner’s Explanation & Step-by-Step Check

Let us look at the `Type II MANOVA Tests: Wilks test statistic` table:

```
Type II MANOVA Tests: Wilks test statistic
   Df test stat approx F num Df den Df Pr(>F)
X1  1   0.80595   2.9206      2     37 0.0658
X2  1   0.68789  10.9685      2     37 0.0005
X3  1   0.80512   2.0393      2     37 0.1522
```

Each row tests whether that predictor has a statistically significant **joint effect on both stock prices $(Y_1, Y_2)$ simultaneously** (after controlling for the other two predictors). Comparing the `Pr(>F)` column against $\alpha = 0.10$:
1. **$X_2$ (market index value):** Wilks' $\Lambda = 0.68789$, $F = 10.9685$, and $\text{p-value} = 0.0005 < 0.10$. Thus, **$X_2$ has a highly statistically significant joint effect on both Stock A and Stock B closing prices**.
2. **$X_1$ (trading volume):** Wilks' $\Lambda = 0.80595$, $F = 2.9206$, and $\text{p-value} = 0.0658 < 0.10$. Thus, at the $\alpha = 10\%$ significance level, **$X_1$ also has a statistically significant joint effect on $(Y_1, Y_2)$**.
3. **$X_3$ (interest rate):** Wilks' $\Lambda = 0.80512$, $F = 2.0393$, and $\text{p-value} = 0.1522 > 0.10$. Thus, **$X_3$ does NOT have a statistically significant joint effect on $(Y_1, Y_2)$** at the $10\%$ level when controlling for $X_1$ and $X_2$.

---

## Part (f): Test whether the model with just $X_2$ fits as well as the model with all three predictors at the 10% level of significance. `[2 marks]`

### Step-by-Step Hypothesis Test

Look at the `Analysis of Variance Table` comparing Model 1 and Model 2:

```
Analysis of Variance Table
Model 1: cbind(Y1, Y2) ~ X1 + X2 + X3
Model 2: cbind(Y1, Y2) ~ X2
  Res.Df Df Gen.var.   Wilks approx F num Df den Df  Pr(>F)
1     38      5.7384
2     40  2   6.0054 0.80878   2.0711      4     74 0.10316
```

1. **Hypotheses:**
   * **$H_0: \beta_{11} = \beta_{12} = \beta_{31} = \beta_{32} = 0$** (the coefficients of $X_1$ and $X_3$ are zero across both responses; **Model 2 with just $X_2$ fits as well as Model 1 with all three predictors**).
   * **$H_1$:** At least one of $\beta_{11}, \beta_{12}, \beta_{31}, \beta_{32} \neq 0$ (Model 1 fits significantly better than Model 2).
2. **Test Statistic & $p$-Value:**
   Wilks' $\Lambda = 0.80878$, approximate $F_{4, 74} = 2.0711$, and $\text{p-value} = 0.10316$.
3. **Decision & Conclusion at $\alpha = 0.10$:**
   Since $\text{p-value} = 0.10316 > 0.10$, we **fail to reject $H_0$** at the $10\%$ level of significance.
   We conclude that **the simpler model with just $X_2$ (Model 2) fits the joint stock price data as well as the full model with all three predictors (Model 1)** at the $10\%$ level.

---

## Part (g): If $X_2$ (market index value) is found to have the strongest relationship with both $Y_1$ and $Y_2$, discuss how the analyst might use this finding in practical stock market predictions or investment strategies. `[2 marks]`

### Beginner’s Explanation & Practical Financial Applications

If the market index value ($X_2$) is the dominant predictor driving both Stock A ($Y_1$) and Stock B ($Y_2$):
1. **Parsimonious Forecasting & Index Tracking:** As confirmed in Part (f), the analyst can simplify the prediction model by using **only the market index ($X_2$)** to forecast the joint closing prices of Stock A and Stock B without losing significant predictive accuracy, avoiding noise from daily trading volume ($X_1$).
2. **Directional & Opposite-Sign Hedging / Portfolio Strategy:** Notice from the regression tables that $X_2$ has a **positive coefficient ($+0.477$) for Stock A ($Y_1$)** (Stock A moves *with* the market index) and a **negative coefficient ($-0.862$) for Stock B ($Y_2$)** (Stock B moves *inversely* to the market index). The analyst can use macroeconomic/market index forecasts to:
   * Buy Stock A during expected market rallies (bull markets) and rotate into Stock B during market downturns (bear markets), or
   * Combine Stock A and Stock B in a portfolio to **hedge systematic market risk (Beta hedging)**.