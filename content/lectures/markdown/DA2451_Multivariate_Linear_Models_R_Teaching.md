# Multivariate Linear Models in R

### A comprehensive beginner-to-advanced teaching companion for DA2451: Multivariate Methods in Business

**Primary source:** John Fox and Sanford Weisberg, *Multivariate Linear Models in R*, appendix to *An R Companion to Applied Regression*, 3rd edition, revised 21 September 2018, 30 pages.  
**Deliverable:** Standalone UTF-8 Markdown, with LaTeX mathematics and runnable R code.  
**How to read:** Start at Chapter 1 if unfamiliar with regression or R. Later chapters connect every concept to both of the appendix's substantial demonstrations. To render the mathematics in an offline HTML study app, enable a **locally installed** LaTeX-capable MathJax or KaTeX renderer; the Markdown file itself requires no network access.

**Evidence convention:** **SOURCE (p. X)** means the observation, number, code or method comes from the attached Fox–Weisberg appendix. **TEACHING EXPANSION** identifies new explanations, illustrative numbers, cautions, extensions or exercises. The original authors' displayed results are quoted as *reported output*, not represented as freshly computed outputs. Package versions may print slightly different text.

## Map of all 30 source pages

| PDF page(s) | Material | Detailed treatment here |
|---|---|---|
| 1 | Abstract; multivariate general linear model; matrix dimensions; normal-error assumptions | 1, 3, 4 |
| 2 | Least-squares estimator; SSP decomposition; four multivariate tests; Wilks approximation inputs | 4–6 |
| 3 | Approximate F; general $L B=C$ test; repeated-response transformation $L B P=C$; `lm()` introduction | 6–7 |
| 4 | Iris dataset; botanical photographs; `some()`; scatterplot matrix and `Boxplot()` | 8 |
| 5 | Figure 2, species-colored scatterplot matrix and concentration ellipses | 8 |
| 6 | Figure 3, four response-wise boxplots by species | 8 |
| 7–8 | `mod.iris`; `mlm` class; printed coefficients; four response-wise summaries | 9 |
| 9 | `Anova(mod.iris)`; Pillai; SSP matrices; all four tests | 10 |
| 10–11 | Base `anova()`; focused `linearHypothesis()` comparisons; verbose $L$ and $C$ | 10–11 |
| 12–13 | Custom species contrasts; equivalent tests; response `imatrix` | 11–12 |
| 14 | Response selection with `P`; identical univariate F; start of repeated measures | 12–13 |
| 15 | O'Brien–Kaiser dataset; factor coding; treatment by gender table | 13–14 |
| 16 | 15 response measurements; `phase`, `hour`, `idata`; wide-to-long reshape | 14 |
| 17–18 | Long-format records; aggregated group means; `lattice::xyplot`; main model code | 14–15 |
| 19 | Figure 4, reading-score profiles by treatment, phase, gender, hour | 14 |
| 20 | Coefficient matrix for 15 outcomes; type-III repeated-measures MANOVA table | 15–16 |
| 21 | Orthogonal contrasts; interpretation; sphericity and univariate tests | 16–17 |
| 22–23 | Mauchly, Greenhouse–Geisser, Huynh–Feldt; focused within-subject contrasts | 17–18 |
| 24–25 | `linearHypothesis()` for hour; constructing `Hour` matrix; linear contrasts | 18 |
| 26 | Linear and quadratic trend tests | 18 |
| 27 | Cubic and quartic trend constructions | 18 |
| 28–29 | Quartic and nonquadratic-combination tests; source's conclusion; reading | 18–22 |
| 30 | Bibliographic references | 22 |

The appendix's own organization is **§1 Basic Ideas** (pp. 1–3), **§2 Fitting and Testing Multivariate Linear Models in R** (pp. 3–14), **§3 Handling Repeated Measures** (pp. 14–29, including §§3.1–3.2), and **§4 Complementary Reading and References** (pp. 29–30). This book reorganizes the material to teach prerequisites before the advanced argument.

---

# PART I. THE IDEAS YOU NEED BEFORE THE APPENDIX

## 1. Regression from absolute zero

### 1.1 What is a statistical model?

**TEACHING EXPANSION.** Suppose a firm operates 50 branches. For each branch, it measures advertising spending, staffing, sales and customer satisfaction. A **case** is one branch. A **variable** is one characteristic measured for every branch. A **response** is what we want to explain (sales, satisfaction), and a **predictor** is information used to explain it (advertising, staff count). A **model** is a precise mathematical account of how a response is associated with predictors, allowing for imperfections and uncertainty.

A simple regression equation is

$$y_i=\beta_0+\beta_1x_i+\varepsilon_i.$$

Here $y_i$ is the observed response for case $i$, $x_i$ its predictor, $\beta_0$ the baseline/intercept, $\beta_1$ a population slope, and $\varepsilon_i$ the unpredictable population error. The fitted equation uses estimated coefficients, denoted with hats:

$$\widehat y_i=\widehat\beta_0+\widehat\beta_1x_i.$$

If, illustratively, $\widehat y=20+3x$, advertising $x=4$ predicts sales $32$. When actual sales are $29$, the **residual** is $e=29-32=-3$. A *residual* is the observed-minus-predicted discrepancy; it is an estimate-related quantity, not the same thing as the unobservable population error $\varepsilon$.

A slope is an **association**, not automatically a causal effect. For instance, more capable branch managers might both approve larger advertising budgets and achieve higher sales. A coefficient does not by itself rule out this kind of confounding.

### 1.2 The four model types students confuse

| Name | Number of responses | Number of predictors | Example |
|---|---:|---:|---|
| Simple linear regression | 1 | 1 | Sales ~ advertising |
| Multiple linear regression | 1 | 2 or more | Sales ~ advertising + staffing |
| Multivariate multiple linear regression | 2 or more | Often 2 or more | Sales **and** satisfaction ~ advertising + staffing |
| Multivariate one-way ANOVA / MANOVA | 2 or more | One grouping factor | Four iris measurements ~ species |

**Golden rule:** *multiple* refers to predictor terms; *multivariate* refers to response variables. Several predictors do not turn a single response into a multivariate model. Conversely, the iris MANOVA is a multivariate linear model even though there is only one explanatory factor.

Multiple regression with one response is

$$y_i=\beta_0+\beta_1x_{i1}+\beta_2x_{i2}+\varepsilon_i.$$

$\beta_1$ is the expected difference associated with one unit of $x_1$, **holding $x_2$ fixed**. For two outcomes in one multivariate model, write two linked equations:

$$\begin{aligned}
Y_{i1}&=\beta_{01}+\beta_{11}x_{i1}+\beta_{21}x_{i2}+\varepsilon_{i1},\\
Y_{i2}&=\beta_{02}+\beta_{12}x_{i1}+\beta_{22}x_{i2}+\varepsilon_{i2}.
\end{aligned}$$

Crucially, the two *errors for the same case* can be correlated. An unmeasured improvement in management could raise both sales and satisfaction. Separate regressions estimate the same coefficient columns, but a **joint test** uses this residual correlation when asking whether a predictor shifts the complete response vector.

### 1.3 Categorical predictors: regression is also ANOVA

A predictor may be numerical (advertising) or categorical (training method, treatment, flower species). For three species, R normally uses the first species as **reference category** and creates two indicator variables. **SOURCE (p. 7)** gives the sepal-length equation:

$$\widehat{\text{SepalLength}}=5.006+0.930I(\text{versicolor})+1.582I(\text{virginica}),$$

where $I(condition)=1$ when true and 0 otherwise. Thus group means are setosa $5.006$, versicolor $5.006+0.930=5.936$, virginica $5.006+1.582=6.588$ cm. For a model with species alone, predicted group values equal sample group means. This is the relationship between **one-way ANOVA** and a regression with factor coding.

### 1.4 How to read a hypothesis test

A **null hypothesis** ($H_0$) is a precisely specified claim, such as 'the three species share the same four-dimensional mean vector.' An **alternative hypothesis** ($H_1$) allows departures from that claim. A test statistic measures the evidence in the data; a **p-value** is the probability, *assuming $H_0$ and the statistical model*, of seeing a result at least as extreme by the test's criterion. It is **not** the probability that $H_0$ is true. Usually we compare p with a preselected significance level such as $\alpha=0.05$. A small p means data are difficult to reconcile with $H_0$ under assumptions. It does not prove causal importance, practical usefulness or assumption validity.

### 1.5 Checkpoint

1. If one response depends on four predictors, is it multivariate? **No.** It is multiple regression.
2. If five test scores for each participant are modeled as five response columns, is it multivariate? **Yes.**
3. Can two responses have individually weak tests but joint evidence? **Yes, in principle.** Joint tests use their correlated uncertainty and test a combined hypothesis.
4. Does a significant species effect tell us which particular flower dimensions differ? **No.** Follow-up comparisons and interpretation are needed.

---

## 2. Your first steps in R

### 2.1 Install and load the software

**TEACHING EXPANSION.** R is the statistical programming language; RStudio is one optional interface. The original code uses `car`, its companion dataset package `carData`, and the graphics package `lattice`. Install packages while connected, then work offline:

```r
# Run once, while online:
install.packages(c("car", "carData", "lattice"))

# Run each new R session:
library(car)
library(carData)
library(lattice)
data("iris", package = "datasets")
data("OBrienKaiser", package = "carData")
```

The appendix's `library(car)` loads `carData` as a required package in its printed session. Loading both explicitly reduces ambiguity. **SOURCE (p. 4)** uses `some(iris)`, which selects sample rows; those displayed rows are not an invariant part of the dataset. Use `head(iris)` for deterministic first rows. To document your environment:

```r
R.version.string
packageVersion("car")
packageVersion("carData")
sessionInfo()
```

The main commands `lm`, `Anova`, `linearHypothesis`, `scatterplotMatrix` and `Boxplot` remain available in current documented R packages. Print formatting and plotting defaults can vary with version; this is distinct from a substantive change in the statistical model.

### 2.2 R notation without fear

| Expression | Meaning |
|---|---|
| `x <- 5` | Put the number 5 into an object called `x` |
| `c(2, 4, 6)` | Create a vector of three values |
| `mean(x)` | Average values |
| `data.frame(a, b)` | Make a table of columns |
| `matrix(..., nrow=3)` | Build a matrix with three rows |
| `cbind(a, b)` | Bind vectors or columns side by side |
| `iris$Species` | Select the column `Species` from `iris` |
| `iris[1:5, 1:2]` | Rows 1–5, columns 1–2 |
| `~` | Formula separator: responses on left, predictors on right |
| `a*b` in a formula | Both main effects plus their interaction (`a + b + a:b`) |
| `a:b` in a formula | Interaction term |
| `summary()` | Show a model's expanded statistical summary |
| `#` | A nonexecuted comment |

Do not confuse `A * B` (elementwise product in ordinary R matrix arithmetic) and `A %*% B` (matrix multiplication). Also do not write `y1 + y2 ~ x` to mean two responses: `+` combines terms in a formula; **`cbind(y1, y2) ~ x`** creates a multivariate response.

### 2.3 Inspect data and fit a first model

```r
str(iris)                  # Which columns, and which data types?
head(iris, 6)              # The first six flowers
dim(iris)                  # 150 rows and 5 columns
names(iris)
table(iris$Species)        # Sample sizes by species

m1 <- lm(Sepal.Length ~ Species, data=iris)
class(m1)
coef(m1)                  # Estimated intercept and group differences
summary(m1)               # Each coefficient's standard error and test
fitted(m1)                # Predicted values
residuals(m1)             # Observed minus predicted
```

**How the parts connect:** `lm` constructs a fitted linear-model object. The `<-` operator stores it, and `summary`, `coef`, `fitted`, `residuals` inspect it. If R cannot find `Anova`, use `library(car)` or `car::Anova(model)`. If `Speciesversicolor` does not appear in your coefficient names, inspect `levels(iris$Species)` and `contrasts(iris$Species)`; coding determines names and coefficient meanings.

### 2.4 Several responses in a single formula

```r
mod.iris <- lm(cbind(Sepal.Length, Sepal.Width,
                     Petal.Length, Petal.Width) ~ Species,
               data=iris)
class(mod.iris)
coef(mod.iris)
summary(mod.iris)
```

**SOURCE (p. 7):** `class(mod.iris)` prints `"mlm" "lm"`. The brief print contains a coefficient matrix; `summary(mod.iris)` contains **four ordinary regression summaries**, not yet the overall MANOVA hypothesis test. We obtain that joint test later with `car::Anova(mod.iris)`.

---
## 3. Vectors, matrices and covariance, made visual

### 3.1 Why matrices arise

**TEACHING EXPANSION.** A **scalar** is one number, a **vector** is an ordered row or column of numbers, and a **matrix** is a rectangular arrangement of numbers. Imagine a sheet containing 150 flowers (rows) and four measurements (columns). That is a $150\times4$ matrix. Transposing a matrix, written $\mathbf A^\mathsf T$, changes its rows into columns.

$$\mathbf A=\begin{bmatrix}1&2\\3&4\end{bmatrix},\qquad
\mathbf A^\mathsf T=\begin{bmatrix}1&3\\2&4\end{bmatrix}.$$

Matrix multiplication combines **row times column**. It is possible only when the first matrix's column count equals the second matrix's row count:

$$\underbrace{\mathbf A}_{3\times2}\underbrace{\mathbf B}_{2\times4}
=\underbrace{\mathbf C}_{3\times4}.$$

For example, if $\mathbf A=\begin{bmatrix}1&2\\1&4\end{bmatrix}$ and $\mathbf B=\begin{bmatrix}5&1\\3&2\end{bmatrix}$, then

$$\mathbf A\mathbf B=\begin{bmatrix}1(5)+2(3)&1(1)+2(2)\\1(5)+4(3)&1(1)+4(2)\end{bmatrix}
=\begin{bmatrix}11&5\\17&9\end{bmatrix}.$$

```r
A <- matrix(c(1, 1, 2, 4), nrow=2)
B <- matrix(c(5, 3, 1, 2), nrow=2)
A %*% B         # Matrix multiplication
t(A)            # Transpose
crossprod(A)    # t(A) %*% A
```

### 3.2 Design matrices turn regressions into one calculation

**SOURCE (p. 1):**

$$\boxed{\underbrace{\mathbf Y}_{n\times m}=
\underbrace{\mathbf X}_{n\times(k+1)}
\underbrace{\mathbf B}_{(k+1)\times m}
+\underbrace{\mathbf E}_{n\times m}}.$$

Every symbol matters:

- $n$: number of observational cases (rows).
- $m$: number of responses (columns in $\mathbf Y$).
- $k+1$: number of columns in the predictor design matrix $\mathbf X$, often including an initial column of ones for the intercept.
- $\mathbf B$: coefficient matrix, with one **column per response** and one **row per predictor coefficient**.
- $\mathbf E$: unobserved population errors, with the same dimensions as the response data.

**TEACHING EXPANSION: dimensions in action.** Suppose three stores have advertising levels $1,2,3$ and two responses, sales and satisfaction. Let

$$\mathbf X=\begin{bmatrix}1&1\\1&2\\1&3\end{bmatrix},\qquad
\mathbf B=\begin{bmatrix}10&50\\3&-2\end{bmatrix}.$$

Then

$$\mathbf X\mathbf B=\begin{bmatrix}13&48\\16&46\\19&44\end{bmatrix}.$$

Row 2 reads: sales prediction $10+3(2)=16$ and satisfaction prediction $50-2(2)=46$. Here $\mathbf X$ is $3\times2$, $\mathbf B$ is $2\times2$, so predictions are $3\times2$.

### 3.3 Covariance is the connection between responses

If two variables $U$ and $V$ move together, their *covariance* may be positive; if high $U$ tends to accompany low $V$, covariance may be negative. Sample covariance is

$$s_{UV}=\frac{\sum_{i=1}^n(u_i-\bar u)(v_i-\bar v)}{n-1}.$$

Correlation removes the scales: $r_{UV}=s_{UV}/(s_U s_V)$. It is between $-1$ and $1$. Covariance retains the original units, whereas correlation is unitless. A covariance matrix stores variances on the diagonal and covariances off the diagonal:

$$\boldsymbol\Sigma=\begin{bmatrix}\sigma_1^2&\sigma_{12}\\\sigma_{12}&\sigma_2^2\end{bmatrix}.$$

**TEACHING EXPANSION.** Suppose residual sales variation is $16$, residual satisfaction variation is $9$, and their residual covariance is $6$. The residual standard deviations are 4 and 3, and correlation is $6/(4\cdot3)=0.5$. Two independent regression tables do not present a single test that incorporates this relationship; multivariate testing does.

```r
Y <- rbind(c(2, 1), c(4, 3), c(6, 2))
cov(Y)           # Covariance matrix
cor(Y)           # Correlation matrix
```

The sample column means are $(4,2)$. After mean-centering,

$$\mathbf Y_c=\begin{bmatrix}-2&-1\\0&1\\2&0\end{bmatrix},\quad
\mathbf Y_c^\mathsf T\mathbf Y_c=\begin{bmatrix}8&2\\2&2\end{bmatrix},\quad
\operatorname{cov}(\mathbf Y)=\frac{1}{2}\begin{bmatrix}8&2\\2&2\end{bmatrix}
=\begin{bmatrix}4&1\\1&1\end{bmatrix}.$$

Check top-left: $(-2)^2+0^2+2^2=8$. Off-diagonal: $(-2)(-1)+0(1)+2(0)=2$. This is the **cross-product** part of an SSP matrix.

### 3.4 More symbols you will meet

| Mathematics | R | Read as |
|---|---|---|
| $\mathbf A^{-1}$ | `solve(A)` | Matrix inverse, if it exists |
| $\mathbf A^\mathsf T\mathbf A$ | `crossprod(A)` | Cross-product matrix |
| $\det(\mathbf A)$ | `det(A)` | Determinant, a volume-like measure |
| $\mathbf I_n$ | `diag(n)` | Identity matrix |
| $\lambda$ | `eigen(A)$values` | Eigenvalue |
| $\mathbf A\otimes\mathbf B$ | `kronecker(A, B)` | Kronecker product |
| $\operatorname{tr}(\mathbf A)$ | `sum(diag(A))` | Trace, sum of diagonal elements |
| $\widehat{\mathbf Y}$ | `fitted(model)` | Predicted response matrix |
| $\widehat{\mathbf E}$ | `residuals(model)` | Residual matrix |

The determinant or eigenvalues of a matrix can tell us how an entire *combination of responses* changes, not just how each outcome changes separately. A matrix must be nonsingular to possess an ordinary inverse. Avoid calculating an inverse by hand unless you are learning the mathematics; estimation software uses more numerically stable techniques.

---

## 4. The multivariate linear model, assumptions and estimates

### 4.1 The original model

**SOURCE (pp. 1–2):** $\mathbf Y=\mathbf X\mathbf B+\mathbf E$. A single predictor matrix can contain continuous variables, group-indicator variables, interaction terms, polynomial terms or spline bases. The special feature is the **several responses** in $\mathbf Y$.

The appendix assumes each case's error vector follows an $m$-variate normal distribution:

$$\boldsymbol\varepsilon_i\sim N_m(\mathbf0,\boldsymbol\Sigma),$$

with the **same nonsingular** $m\times m$ covariance matrix $\boldsymbol\Sigma$ for each case. Errors from different cases are independent; $\mathbf X$ is fixed or independent of errors. Using the PDF's **row-wise stacking** convention, the compact expression is

$$\operatorname{vec}_{\mathrm{row}}(\mathbf E)\sim N_{nm}
\big(\mathbf0,\mathbf I_n\otimes\boldsymbol\Sigma\big).$$

The notation $N_m(\mathbf0,\boldsymbol\Sigma)$ means an $m$-dimensional normal distribution with mean vector zero and covariance matrix $\boldsymbol\Sigma$. $\otimes$ constructs a block-structured covariance. $\mathbf I_n$ expresses independence across cases while allowing correlated responses within each case. **Convention alert:** many algebra books stack columns when writing `vec`; the author's PDF explicitly stacks **rows**, which is why we label it `vec_row`.

### 4.2 What the assumptions mean in ordinary language

1. **Correct mean structure.** The average outcome vector can be represented by the chosen predictor terms. Adding a quadratic predictor still gives a model *linear in its coefficients*.
2. **No systematic errors.** At fixed predictors, expected error is zero.
3. **Within-case correlations allowed.** A student's reading score at one hour can correlate with their score at another hour.
4. **Different cases are independent.** Measurements from one participant should not be pretended to come from unrelated participants.
5. **Same residual covariance across groups.** In a species MANOVA, setosa, versicolor and virginica are modeled as having the same within-group covariance matrix. A plot can cast doubt on this assumption.
6. **Joint normality for the standard exact/approximate parametric inference.** Marginal normal-looking histograms alone do not establish joint normality.
7. **No perfectly redundant response dimension.** If one outcome is an exact linear combination of others, the residual SSP may be singular and some test formulas fail.

Least-squares estimates can remain useful when strict normality fails, but usual p-value guarantees need the appropriate assumptions. Different designs also need attention to missing observations, outliers, linear dependence and sample size.

### 4.3 How coefficients are estimated

**SOURCE (p. 2):**

$$\boxed{\widehat{\mathbf B}=(\mathbf X^\mathsf T\mathbf X)^{-1}\mathbf X^\mathsf T\mathbf Y}.$$

Dimension check:

$$[(k+1)\times(k+1)]\,[(k+1)\times n]\,[n\times m]
\longrightarrow[(k+1)\times m].$$

The result is the **same coefficient matrix** obtained by fitting an ordinary least-squares model separately to each response when they use the same predictor design. The combined structure is essential to inference, because the *residual errors* across outcomes can covary. Under the normal model with unrestricted common covariance, the coefficient estimator is also the maximum-likelihood estimator. For calculation, `lm()` uses stable linear algebra rather than requiring you to form the inverse explicitly.

**TEACHING EXPANSION: complete two-case algebra.** Take

$$\mathbf X=\begin{bmatrix}1&0\\1&1\end{bmatrix},\quad
\mathbf Y=\begin{bmatrix}2&4\\5&6\end{bmatrix}.$$

Then

$$\mathbf X^\mathsf T\mathbf X=\begin{bmatrix}2&1\\1&1\end{bmatrix},\quad
(\mathbf X^\mathsf T\mathbf X)^{-1}=\begin{bmatrix}1&-1\\-1&2\end{bmatrix},\quad
\mathbf X^\mathsf T\mathbf Y=\begin{bmatrix}7&10\\5&6\end{bmatrix}.$$

Multiplying gives $\widehat{\mathbf B}=\begin{bmatrix}2&4\\3&2\end{bmatrix}$. The first response has intercept 2 and slope 3; the second has intercept 4 and slope 2. Since two data rows determine two parameters per response, residuals are zero: **this is solely a matrix demonstration, not a meaningful dataset for MANOVA** (no residual degrees of freedom).

```r
X <- cbind(1, c(0, 1))
Y <- cbind(c(2, 5), c(4, 6))
solve(crossprod(X), crossprod(X, Y))
```

### 4.4 Predictions and residuals

$\widehat{\mathbf Y}=\mathbf X\widehat{\mathbf B}$ and $\widehat{\mathbf E}=\mathbf Y-\widehat{\mathbf Y}$. The hat distinguishes the fitted *residual* from the unobservable *population error*. Each case contributes a **row of several residuals**.

```r
mod.iris <- lm(cbind(Sepal.Length, Sepal.Width,
                     Petal.Length, Petal.Width) ~ Species, data=iris)
X <- model.matrix(mod.iris)
Bhat <- coef(mod.iris)
Yhat <- fitted(mod.iris)
Ehat <- residuals(mod.iris)

dim(X)       # 150 x 3
dim(Bhat)    # 3 x 4
dim(Yhat)    # 150 x 4
dim(Ehat)    # 150 x 4
all.equal(unname(X %*% Bhat), unname(Yhat),
          check.attributes=FALSE)
```

### 4.5 The crucial identifiability condition

The inverse formula assumes $\mathbf X$ has **full column rank**, meaning its columns contain no exact redundancy. If you include both an intercept and an indicator for every single category without a constraint, one column is redundant. R's formula interface normally handles this by dropping one baseline indicator or using valid contrasts. The residual covariance also needs enough independent error information; too many response variables relative to residual degrees of freedom can cause singularity.

---

## 5. From ordinary sums of squares to multivariate SSP

### 5.1 Ordinary regression partitions variation

For one response with an intercept, the total sum of squared deviations from the sample mean splits into explained and residual portions:

$$SS_T=\sum_i(y_i-\bar y)^2
=SS_{\mathrm{Reg}}+SS_R.$$

The single-response ANOVA F test compares a scaled amount of explained variation with a scaled amount of residual variation. The multivariate extension does not merely add four separate F values; it also uses **cross-products**, encoding how responses move together.

### 5.2 The author's SSP decomposition

**SOURCE (p. 2):** Write $\bar{\mathbf y}$ for the $m\times1$ vector of response means. Then

$$\begin{aligned}
\mathbf{SSP}_T&=\mathbf Y^\mathsf T\mathbf Y-n\bar{\mathbf y}\bar{\mathbf y}^\mathsf T\\
&=\underbrace{\widehat{\mathbf E}^\mathsf T\widehat{\mathbf E}}_{\mathbf{SSP}_R}
+\underbrace{\big(\widehat{\mathbf Y}^\mathsf T\widehat{\mathbf Y}
-n\bar{\mathbf y}\bar{\mathbf y}^\mathsf T\big)}_{\mathbf{SSP}_{\mathrm{Reg}}}.
\end{aligned}$$

All these matrices are $m\times m$. The diagonal entries give ordinary sums of squares of each response. Off-diagonal entries give response-pair cross-products. When a term is removed from the full model, the **increment in explained SSP**, or equivalently the loss in residual SSP, gives the **hypothesis SSP** $\mathbf H=\mathbf{SSP}_H$. The full-model residual SSP is $\mathbf R=\mathbf{SSP}_R$.

**TEACHING EXPANSION.** Recall the three observations $\mathbf Y=\begin{bmatrix}2&1\\4&3\\6&2\end{bmatrix}$. We calculated $\mathbf{SSP}_T=\begin{bmatrix}8&2\\2&2\end{bmatrix}$. The diagonal 8 and 2 are individual response variation. Off-diagonal 2 measures co-movement. Dividing by $n-1=2$ gives the sample covariance. The hypothesis/error SSP pair performs a similar multivariate bookkeeping operation within a regression model.

### 5.3 See the iris error matrix, not just the ANOVA F

**SOURCE (p. 9), values rounded as printed:**

$$\mathbf R\approx\begin{bmatrix}
38.956&13.630&24.625&5.645\\
13.630&16.962&8.121&4.808\\
24.625&8.121&27.223&6.272\\
5.645&4.808&6.272&6.157
\end{bmatrix},$$

$$\mathbf H_{\mathrm{Species}}\approx\begin{bmatrix}
63.212&-19.953&165.248&71.279\\
-19.953&11.345&-57.240&-22.933\\
165.248&-57.240&437.10&186.774\\
71.279&-22.933&186.774&80.413
\end{bmatrix}.$$

The four rows/columns correspond, in order, to `Sepal.Length`, `Sepal.Width`, `Petal.Length`, and `Petal.Width`. For example, the first residual sum of squares is 38.956. There are 150 cases, 3 coefficient rows and $150-3=147$ residual degrees of freedom. Thus the sepal-length error-variance estimate is $38.956/147\approx0.2650$ square centimetres; its residual standard deviation is about $\sqrt{0.2650}=0.515$ cm, just as the source's sepal-length regression summary reports on p. 7. The residual covariance of sepal length and width is approximately $13.630/147=0.09272$ square centimetres.

```r
R_SSP <- crossprod(residuals(mod.iris))
R_cov <- R_SSP / df.residual(mod.iris)
R_SSP
R_cov
sqrt(diag(R_cov))          # Residual standard deviations
cov2cor(R_cov)              # Residual correlation matrix
```

A negative *off-diagonal* entry of $\mathbf H$ is not a negative variance. It says group-related deviations in those two outcomes tend to have opposite signs. The symmetric matrix still has nonnegative quadratic forms under the ordinary SSP construction.

---
## 6. How MANOVA turns two matrices into a statistical decision

### 6.1 Generalized eigenvalues: signal divided by noise

**SOURCE (pp. 2–3).** Multivariate hypothesis tests use the eigenvalues $\lambda_j$ of $\mathbf H\mathbf R^{-1}$, or, equivalently, the generalized-eigenvalue problem

$$\mathbf H\mathbf a=\lambda\mathbf R\mathbf a,
\qquad\det(\mathbf H-\lambda\mathbf R)=0.$$

$\mathbf a$ is a direction that combines outcomes, and $\lambda$ measures hypothesis variation relative to residual variation along that direction. A large value means strong signal compared with noise. A zero value means no signal in that direction. Not all $m$ eigenvalues need be nonzero. If a hypothesis imposes $q$ independent coefficient constraints, at most $p=\min(q,m)$ roots can be nonzero. For repeated-measures transformed responses, replace $m$ here with the transformed response count $v$.

**TEACHING EXPANSION: why combinations are needed.** Imagine a training program increases customer satisfaction while reducing complaints. A useful composite outcome might be a weighted difference between the two, even if the individual outcomes have very different units or variances. Generalized eigenvectors find mathematically informative joint-response directions, taking covariance into account. These are **not automatically causal pathways, substantive constructs or factors** in the exploratory-factor-analysis sense.

### 6.2 The four test statistics and their very different scales

**SOURCE (p. 2), with a documented mathematical correction below:**

| Statistic | Correct expression, roots $\lambda_1\ge\cdots\ge\lambda_p\ge0$ | Interpretation |
|---|---|---|
| Pillai–Bartlett trace $V$ | $\displaystyle\sum_{j=1}^p\frac{\lambda_j}{1+\lambda_j}$ | Adds each direction's bounded contribution |
| Hotelling–Lawley trace $T$ | $\displaystyle\sum_{j=1}^p\lambda_j$ | Adds unbounded signal/noise ratios |
| Wilks' Lambda $\Lambda$ | $\displaystyle\prod_{j=1}^p\frac{1}{1+\lambda_j}$ | Smaller means stronger overall evidence |
| Roy's largest root $\Theta$ | $\lambda_1$ | Focuses on strongest direction |

**Source erratum, essential for mathematical accuracy:** on PDF p. 2, the Pillai denominator is printed as **$1-\lambda_j$**. With the document's explicitly defined roots of $\mathbf H\mathbf R^{-1}$, it must be **$1+\lambda_j$**. The printed iris test statistic agrees with the corrected formula, not the minus sign. Do **not** memorize the typo. The same misprint appears in a related published description of the method; it is not a competing definition of these particular generalized roots.

**TEACHING EXPANSION, worked calculation.** Take illustrative roots $\lambda_1=2$ and $\lambda_2=0.5$. Then

$$\begin{aligned}
V&=2/3+0.5/1.5=2/3+1/3=1,\\
T&=2+0.5=2.5,\\
\Lambda&=(1/3)(1/1.5)=2/9\approx0.22222,\\
\Theta&=2.
\end{aligned}$$

It is meaningless to compare `V=1` to `Lambda=0.222` as though they were the same measure. Each statistic uses its **own null distribution or F approximation**. Pillai is often a sensible default, particularly when one wishes to avoid dependence on only the largest root, but no test is universally most powerful or immune to violations.

### 6.3 Connect the four iris test results

**SOURCE (p. 9):**

| Test | Statistic | Approximate F | Numerator df | Denominator df | Printed p |
|---|---:|---:|---:|---:|---|
| Pillai | 1.192 | 53.47 | 8 | 290 | < 2.2e-16 |
| Wilks | 0.023 | 199.15 | 8 | 288 | < 2.2e-16 |
| Hotelling–Lawley | 32.477 | 580.53 | 8 | 286 | < 2.2e-16 |
| Roy | 32.192 | 1166.96 | 4 | 145 | < 2.2e-16 |

The species term has $q=2$ degrees of freedom, and there are $m=4$ outcomes, so there are at most two nonzero roots. Roy's largest root is about 32.192; Hotelling–Lawley sums to 32.477, suggesting the other root is about 0.285 (both values rounded). Then

$$V\approx\frac{32.192}{33.192}+\frac{0.285}{1.285}\approx1.192.$$

This independently demonstrates why the denominator is $1+\lambda$. The raw F statistics differ considerably even though all four tests reject the joint equality of species mean vectors. One F being larger **does not mean that test is more trustworthy**; its transformation and degrees of freedom are different.

### 6.4 The Rao transformation for Wilks' Lambda

**SOURCE (pp. 2–3, equations 2–3).** Let $s$ be the degrees of freedom of a tested predictor term, $m$ the response dimension, $n$ the number of cases and $k+1$ the number of predictor matrix columns. The paper defines

$$r=n-k-1-\frac{m-s+1}{2},\qquad
u=\frac{ms-2}{4},$$

$$t=\begin{cases}
\displaystyle\sqrt{\frac{m^2s^2-4}{m^2+s^2-5}}, &m^2+s^2-5>0,\\
0,&\text{otherwise.}
\end{cases}$$

With the source's own notation, its approximate F transformation is

$$F_0=\frac{1-\Lambda^{1/t}}{\Lambda^{1/t}}
\frac{rt-2u}{ms},$$

with numerator df $ms$ and denominator df $rt-2u$ when the expression is applicable. The appendix states that the relevant small-dimensional cases can yield an exact F result. The branch assigning $t=0$ is **not an invitation to divide by zero**; use the appropriate specialized case or software rather than inserting zero into an undefined expression. Distinguish the underlying *Lambda value* from its *transformed F* and the eventual *p-value*.

### 6.5 Derive the iris Wilks F result from the original formula

**TEACHING EXPANSION, with the source's original parameters and reported Wilks value.** This is a full calculation rather than simply reading the R output. For iris there are $n=150$ cases, $m=4$ responses, $k+1=3$ coefficient columns, and $s=2$ species degrees of freedom. The quantities from p. 2 become

$$r=150-3-\frac{4-2+1}{2}=147-1.5=145.5,$$

$$u=\frac{4(2)-2}{4}=\frac64=1.5,$$

$$t=\sqrt{\frac{4^2(2^2)-4}{4^2+2^2-5}}
=\sqrt{\frac{64-4}{16+4-5}}
=\sqrt{\frac{60}{15}}=2.$$

So $rt-2u=(145.5)(2)-3=288$, and $ms=4(2)=8$. From the iris SSP calculation, Wilks' Lambda is about $0.02343863$ (the source prints `0.023`), so

$$F_0=\left(\frac{1-\Lambda^{1/2}}{\Lambda^{1/2}}\right)
\left(\frac{288}{8}\right)
\approx\left(\frac{1-0.1530968}{0.1530968}\right)(36)
\approx199.15.$$

This matches **SOURCE (p. 9)**, Wilks approximate F `199.15` with numerator df $8$ and denominator df $288$. If you use the source's rounded `Lambda=0.023` rather than a more precise internal value, your computed F will differ slightly. This is precisely why intermediate rounding should wait until the final numerical report. The appendix itself presents the general formula; this complete substitution is a teaching expansion.

### 6.6 Common interpretation traps

- **Mistake:** 'Pillai 1.192 means a 119.2% effect.' **Correction:** This is a sum of bounded canonical contributions; it is not a percentage.
- **Mistake:** 'The tiny p-value means each species differs from every other species on every response.' **Correction:** The omnibus null is that **all** species mean vectors coincide. Specific claims need follow-up contrasts and possibly multiplicity adjustment.
- **Mistake:** 'One dependent variable has a significant ANOVA, so the overall MANOVA is automatically significant.' **Correction:** This is not a general logical equivalence.
- **Mistake:** 'The method ignores covariance because it is built from ordinary regressions.' **Correction:** Ordinary coefficient estimates are equation-wise, but joint hypothesis tests use $\mathbf H$ and $\mathbf R$ cross-products.

---

## 7. The general hypothesis framework: $L\mathbf B P=C$

### 7.1 Test arbitrary linear combinations of coefficients

**SOURCE (p. 3, equation 4):**

$$H_0:\underbrace{\mathbf L}_{q\times(k+1)}
\underbrace{\mathbf B}_{(k+1)\times m}
=\underbrace{\mathbf C}_{q\times m}.$$

Here $\mathbf L$ describes **which coefficient combination** to test; $q$ is its full row rank, and $\mathbf C$ stores the values asserted under $H_0$, usually all zeros. If $\mathbf B$ has an intercept row and two group-indicator rows, then $\mathbf L=[0,1,-1]$ tests whether the two group-indicator coefficient vectors are equal, **simultaneously across every response**.

**SOURCE (p. 3):** The hypothesis SSP is

$$\boxed{\mathbf H=(\mathbf L\widehat{\mathbf B}-\mathbf C)^\mathsf T
\left[\mathbf L(\mathbf X^\mathsf T\mathbf X)^{-1}\mathbf L^\mathsf T\right]^{-1}
(\mathbf L\widehat{\mathbf B}-\mathbf C)}.$$

The bracket is $q\times q$; $(\mathbf L\widehat{\mathbf B}-\mathbf C)$ is $q\times m$; the final result is **$m\times m$**. The bracket accounts for how uncertain the tested coefficient combination is under the design. A test with several restrictions considers up to $\min(q,m)$ nonzero generalized eigenvalues. `car::linearHypothesis()` constructs this from model objects so you do not need to invert matrices manually.

### 7.2 A full dimension check with numbers

Suppose $\mathbf B$ is $3\times4$ (intercept, two species contrasts, four outcomes) and we compare the two nonreference species. Let $\mathbf L=[0,1,-1]$, with dimensions $1\times3$. Then $\mathbf L\mathbf B$ is $1\times4$, which gives **four differences**: one for each measurement. $\mathbf C=\mathbf0_{1\times4}$ means *all four must be zero simultaneously*.

If you instead want to test both nonreference species against the reference together, use

$$\mathbf L=\begin{bmatrix}0&1&0\\0&0&1\end{bmatrix}\quad(2\times3),$$

which yields a $2\times4$ matrix of restrictions. The omnibus species MANOVA in the iris example corresponds to such a joint hypothesis.

### 7.3 Transform **responses**, not just coefficients

**SOURCE (p. 3, equation 5):**

$$\boxed{H_0:\underbrace{\mathbf L}_{q\times(k+1)}
\underbrace{\mathbf B}_{(k+1)\times m}
\underbrace{\mathbf P}_{m\times v}
=\underbrace{\mathbf C}_{q\times v}}.$$

$\mathbf P$ is a **response-transformation matrix**. It selects or combines response columns. It is fundamental to repeated-measures testing: perhaps only sepal length matters, or perhaps the scientifically meaningful response is *post-test minus pretest* for the **same student**. The transformed outcomes are $\mathbf Y\mathbf P$ with dimensions $n\times v$.

The hypothesis SSP for these transformed responses is

$$\mathbf H_P=(\mathbf L\widehat{\mathbf B}\mathbf P-\mathbf C)^\mathsf T
\left[\mathbf L(\mathbf X^\mathsf T\mathbf X)^{-1}\mathbf L^\mathsf T\right]^{-1}
(\mathbf L\widehat{\mathbf B}\mathbf P-\mathbf C).$$

This is $v\times v$, **not $q\times q$**. The transformed error SSP is $\mathbf R_P=\mathbf P^\mathsf T\mathbf R\mathbf P$, also $v\times v$. The multivariate statistics use roots of $\mathbf H_P\mathbf R_P^{-1}$ and at most $\min(q,v)$ nonzero roots. **Source layout caution:** a small dimension label accompanying the printed equation can be misleading; multiplication dimensions establish $v\times v$.

### 7.4 A concrete response transformation

**TEACHING EXPANSION.** If each person has three outcomes stored in columns `[pre, post, followup]`, the contrast

$$\mathbf P=\begin{bmatrix}-1\\1\\0\end{bmatrix}$$

turns each person's response row $(y_{\mathrm{pre}},y_{\mathrm{post}},y_{\mathrm{followup}})$ into $-y_{\mathrm{pre}}+y_{\mathrm{post}}$: their improvement from pretest to post-test. By using $\mathbf P=[-1,1,0]^\mathsf T$, you are not throwing away participant pairing; you are **using** it. A second column $[0,-1,1]^\mathsf T$ could represent post-test to follow-up change.

```r
Y3 <- rbind(c(4, 6, 7), c(5, 6, 5), c(3, 4, 6))
P <- cbind(PostMinusPre=c(-1, 1, 0),
           FollowMinusPost=c(0, -1, 1))
Y3 %*% P
# Derived by arithmetic: rows (2,1), (1,-1), (1,2)
```

The computed values in the comment are *illustrative arithmetic*, not software output from the PDF. Note the different roles: **$\mathbf L$ chooses coefficient effects (between cases)**; **$\mathbf P$ chooses combinations of outcomes (within cases)**. This distinction makes the repeated-measures analysis much easier.

---
# PART II. THE COMPLETE IRIS EXAMPLE

## 8. Explore the iris measurements before modeling

### 8.1 What is recorded?

**SOURCE (pp. 3–4).** The classic Anderson/Fisher iris data comprise 150 flowers from three species: setosa, versicolor and virginica. For each flower, the dataset records four measurements in centimetres:

1. `Sepal.Length`: length of a sepal.
2. `Sepal.Width`: width of a sepal.
3. `Petal.Length`: length of a petal.
4. `Petal.Width`: width of a petal.

`Species` is a categorical predictor. The four numerical variables are **four response columns**, not four competing predictors. The source's **Figure 1 (p. 4)** illustrates the three species with flower photographs. The photo caption attributes them to Radomil Binek, Danielle Langlois and Frank Mayfield and states their relevant Creative Commons Attribution–ShareAlike licences. This Markdown-only book does not republish those images; the following R graphics reproduce the analytical figures offline.

```r
head(iris)
str(iris)
levels(iris$Species)
table(iris$Species)
aggregate(iris[, 1:4], by=list(Species=iris$Species), FUN=mean)
```

`aggregate()` makes an independently understandable table of group means. Each mean answers a single-response descriptive question. MANOVA tests whether a whole **mean vector** differs, accounting for the error covariance.

### 8.2 Scatterplot matrix and concentration ellipses

**SOURCE (pp. 4–5, Figure 2).** The original code is:

```r
scatterplotMatrix(~ Sepal.Length + Sepal.Width + Petal.Length
    + Petal.Width | Species,
  data=iris, smooth=FALSE, regLine=FALSE, ellipse=TRUE,
  by.groups=TRUE, diagonal=FALSE,
  legend=list(coords="bottomleft"))
```

What each argument does:

| Code | Meaning |
|---|---|
| `~ A + B + C + D` | Include four variables in a matrix of pairwise graphs |
| `| Species` | Group observations by flower species |
| `data=iris` | Find the measurements in this table |
| `smooth=FALSE` | Do not add smoothing curves |
| `regLine=FALSE` | Do not add straight fitted lines |
| `ellipse=TRUE` | Draw data-concentration ellipses |
| `by.groups=TRUE` | Use species-specific grouping for plotted information |
| `diagonal=FALSE` | Suppress diagonal variable displays |
| `legend=...` | Locate the species legend |

A *scatterplot* shows whether two variables rise together, fall together, form clusters or include outliers. A scatterplot **matrix** shows many pairs at once; for four responses there are six distinct pairs. The concentration ellipses show data distribution *within each species*. Their orientations suggest correlations; their widths/areas suggest variability. They are not interchangeable with confidence regions for means. The commonly drawn 50% and 95% ellipses represent concentration levels under the plotting convention, not '50% confidence that the means differ'.

**SOURCE (pp. 5, 7):** versicolor and virginica are much more similar to one another than either is to setosa. Importantly, the ellipses for setosa differ in shape and size from those for the other two species; this calls the **common covariance assumption** into question. It is a limitation of the model analysis, not an instruction to ignore the findings. You should mention it whenever presenting the tiny MANOVA p-value.

### 8.3 Four boxplots

**SOURCE (pp. 4, 6, Figure 3):**

```r
par(mfrow=c(2, 2))
for (response in c("Sepal.Length", "Sepal.Width",
                   "Petal.Length", "Petal.Width"))
  Boxplot(iris[, response] ~ Species, data=iris, ylab=response)
par(mfrow=c(1, 1))
```

`par(mfrow=c(2,2))` creates a two-by-two plotting layout; the `for` loop visits each response name; `iris[, response]` extracts its numerical column; the formula after `~` groups it by species. Restoring `par(mfrow=c(1,1))` prevents later single plots being squeezed into the four-panel layout. `Boxplot()` belongs to `car` and can label suspected outliers. If you want a simple base-R portable plot, `boxplot(iris[[response]] ~ iris$Species, ylab=response)` is an alternative, though labels and graphical styling are not identical.

Read a boxplot in this order: compare median lines; inspect box heights (middle 50% of values); examine whiskers; note unusual observations. **Do not mistake a single extreme observation for proof of invalidity**, nor infer equal covariance matrices solely because single-variable boxes look similar. Pairwise ellipses can reveal covariance differences that univariate boxplots cannot.

### 8.4 A student-friendly exploratory checklist

Before running `Anova()`, answer: Are any responses nearly identical copies? Do the groups overlap? Are there extreme outliers? Does the pattern look strongly nonlinear? Are some groups much more dispersed or differently correlated? Were measurements taken on different flowers independently? What scientifically meaningful null would be tested? In a business context, the same questions apply to product metrics, campaign outcomes and customer questionnaires.

---

## 9. Fit and interpret the source's four-response linear model

### 9.1 One command, four equations

**SOURCE (p. 7):**

```r
mod.iris <- lm(cbind(Sepal.Length, Sepal.Width,
                     Petal.Length, Petal.Width) ~ Species, data=iris)
class(mod.iris)
mod.iris
summary(mod.iris)
```

`lm()` fits four regressions with the same species design matrix. With the ordinary treatment coding, setosa is the reference. The brief output gives the coefficient matrix:

| Coefficient | Sepal.Length | Sepal.Width | Petal.Length | Petal.Width |
|---|---:|---:|---:|---:|
| `(Intercept)` | 5.006 | 3.428 | 1.462 | 0.246 |
| `Speciesversicolor` | 0.930 | -0.658 | 2.798 | 1.080 |
| `Speciesvirginica` | 1.582 | -0.454 | 4.090 | 1.780 |

**SOURCE (p. 7).** Each row is one model coefficient; each column is one response. Read the intercept as the **setosa** mean vector, not the mean of all flowers. Read the `Speciesversicolor` row as its mean vector **minus setosa**. For sepal width, the negative $-0.658$ means versicolor's group mean is 0.658 cm *less* than setosa's. It does not mean sepal width itself is negative.

### 9.2 Calculate all species means by hand

Add the coefficients to obtain the group vectors:

| Species | Sepal.Length | Sepal.Width | Petal.Length | Petal.Width |
|---|---:|---:|---:|---:|
| setosa | 5.006 | 3.428 | 1.462 | 0.246 |
| versicolor | $5.006+0.930=5.936$ | $3.428-0.658=2.770$ | $1.462+2.798=4.260$ | $0.246+1.080=1.326$ |
| virginica | $5.006+1.582=6.588$ | $3.428-0.454=2.974$ | $1.462+4.090=5.552$ | $0.246+1.780=2.026$ |

These calculated values come directly from the appendix's printed coefficients, not from invented statistical output. If all group sizes are 50, the overall response means are averages of these three species means. For example, overall sepal length is $(5.006+5.936+6.588)/3\approx5.8433$ cm.

### 9.3 What `summary(mod.iris)` means

**SOURCE (pp. 7–8).** `summary()` prints four blocks, **one per response**, with coefficient estimates, standard errors, t values, p-values, residual standard error, $R^2$ and ordinary univariate F tests. It is important to know what these are *before* calling a MANOVA table.

- **Estimate:** predicted change in this response associated with the coefficient's factor contrast.
- **Standard error:** estimated standard deviation of the coefficient estimator across hypothetical repetitions of sampling.
- **t value:** estimate divided by its standard error, testing a specified coefficient against zero.
- **p-value:** tail-area measure under the null model.
- **Residual standard error:** estimated residual response standard deviation, in the response's units.
- **$R^2$:** fraction of centered response variation explained by the model, for this response only.
- **Adjusted $R^2$:** adjusted for fitted coefficient count.
- **F statistic:** tests whether species helps explain this **individual** response relative to an intercept-only model.

**SOURCE (pp. 7–8):**

| Response | Residual SE | Residual df | $R^2$ | Individual-response F (df 2, 147) |
|---|---:|---:|---:|---:|
| Sepal.Length | 0.515 | 147 | 0.619 | 119 |
| Sepal.Width | 0.340 | 147 | 0.401 | 49.2 |
| Petal.Length | 0.430 | 147 | 0.941 | approximately 1180 |
| Petal.Width | 0.205 | 147 | 0.929 | 960 |

**Interpret carefully:** species explains most of the observed petal-length variation in this sample ($R^2\approx0.941$), but less than half of the sepal-width variation ($R^2\approx0.401$). These four separate $R^2$ values are **not** an overall MANOVA $R^2$ and should not be added together. Likewise, four separate p-values are not themselves a joint test.

### 9.4 Source-to-code consistency checks

```r
B <- coef(mod.iris)
B
colMeans(iris[iris$Species == "setosa", 1:4])
colMeans(iris[iris$Species == "versicolor", 1:4])
colMeans(iris[iris$Species == "virginica", 1:4])

# These should agree with the fitted group means:
aggregate(iris[, 1:4], list(Species=iris$Species), mean)

# Examine coefficient naming/coding:
colnames(model.matrix(mod.iris))
contrasts(iris$Species)
```

Never interpret a coefficient without inspecting its factor coding. The exact same fitted group means can be expressed using entirely different contrast-coefficient matrices.

---

## 10. Conduct the omnibus MANOVA and read its full result

### 10.1 What is being tested?

**SOURCE (p. 9).** The null is

$$H_0:\boldsymbol\mu_{\mathrm{setosa}}=
\boldsymbol\mu_{\mathrm{versicolor}}=
\boldsymbol\mu_{\mathrm{virginica}},$$

where each $\boldsymbol\mu$ has four components (all four flower measurements). The alternative is that **at least one mean vector differs**. It does *not* mean that all four outcomes must individually differ or that every pair of species must differ.

### 10.2 Call the exact methods from the PDF

```r
(manova.iris <- car::Anova(mod.iris))
class(manova.iris)
summary(manova.iris)

# A related base-R sequential test:
anova(mod.iris)
```

**SOURCE (p. 9):** `Anova()` returns an object of class `"Anova.mlm"`. Printed default output is a **Type II MANOVA table** using **Pillai**:

```text
Type II MANOVA Tests: Pillai test statistic
         Df test stat approx F num Df den Df Pr(>F)
Species   2     1.19      53.5      8    290  <2e-16
```

These rows are original reported values (rounded). `Df=2` is the species factor's model-term df; `num Df=8` and `den Df=290` are the F approximation's degrees of freedom. **The denominator 290 is not the number of flowers**. The fuller `summary(manova.iris)` prints $\mathbf R$, $\mathbf H$ and all four multivariate statistics shown in Chapter 6.

### 10.3 `Anova()` versus base `anova()`

`car::Anova()` (capital A) typically performs type-II tests by default and offers type-III and repeated-measures facilities. Base R `anova()` (lowercase a) can provide sequential multivariate ANOVA tables. They are **not guaranteed to agree** for models with several terms and interactions because term-order and hypothesis definitions can differ.

**SOURCE (p. 10):** For the iris model, the only non-intercept term is `Species`. Thus the sequential test for that term matches the type-II one. The base table also displays an `(Intercept)` row, which **is not** the scientifically interesting comparison among species. The source reports species Pillai about 1.192, approximate F about 53, numerator df 8 and denominator df 290. Rounding accounts for minor differences between abbreviated printouts.

**TEACHING EXPANSION.** With multiple covariates and an interaction, ask which term is adjusted for which other term. Never decide 'Type III is more rigorous' just because the Roman numeral is larger. See Chapter 16.

### 10.4 How to report the actual result

A responsible short report might say:

> The four-dimensional mean measurements differed by iris species in the joint multivariate test, Pillai's trace approximately 1.192, $F(8,290)\approx53.47$, $p<2.2\times10^{-16}$, as reported in the Fox–Weisberg example (PDF p. 9). However, its species-specific concentration ellipses suggested unequal within-group covariance structures (PDF p. 7), so the model assumption deserves attention.

Avoid falsely claiming the finding shows that species **caused** flower dimensions in a randomized experiment. Species is an observational classification, not a randomized intervention.

---
## 11. Focused questions: `linearHypothesis()` and custom contrasts

### 11.1 One omnibus p-value does not answer every question

**SOURCE (pp. 10–12).** After the omnibus species MANOVA, the authors ask two more specific questions:

1. Does **setosa** differ from the *average of versicolor and virginica* on the four measurements?
2. Does **versicolor** differ from **virginica** on the four measurements?

These two questions produce different hypothesis matrices $\mathbf L$ and, therefore, different $\mathbf H$ matrices. With setosa as reference, the coefficient matrix has rows `(Intercept)`, `Speciesversicolor`, `Speciesvirginica`. For four outcomes, the first comparison is

$$H_0:\tfrac12\boldsymbol\beta_{\mathrm{versicolor}}+
\tfrac12\boldsymbol\beta_{\mathrm{virginica}}=\mathbf0,$$

because each beta is its species mean **minus the setosa mean**. The second comparison is

$$H_0:\boldsymbol\beta_{\mathrm{versicolor}}-
\boldsymbol\beta_{\mathrm{virginica}}=\mathbf0.$$

Thus

$$\mathbf L_1=\begin{bmatrix}0&0.5&0.5\end{bmatrix},\qquad
\mathbf L_2=\begin{bmatrix}0&1&-1\end{bmatrix}.$$

Each is $1\times3$. Multiplying by the $3\times4$ coefficient matrix gives a $1\times4$ vector, **one contrast value for each outcome**. `linearHypothesis()` tests whether all four contrasts equal zero jointly.

### 11.2 Exact source R code and numbers

**SOURCE (pp. 10–11):**

```r
linearHypothesis(mod.iris,
    "0.5*Speciesversicolor + 0.5*Speciesvirginica",
    verbose=TRUE)

linearHypothesis(mod.iris,
    "Speciesversicolor = Speciesvirginica",
    verbose=TRUE)
```

The first command omits `= 0` because `linearHypothesis()` interprets that linear expression as a zero restriction. With `verbose=TRUE`, output shows the **hypothesis matrix**, **right-hand-side matrix** of zeros, estimated contrast values, hypothesis SSP, residual SSP and multivariate tests. This is an excellent learning option when understanding the algebra.

**SOURCE (pp. 10–11), estimated contrast vectors:**

| Comparison (direction) | Sepal.Length | Sepal.Width | Petal.Length | Petal.Width |
|---|---:|---:|---:|---:|
| Average of versicolor and virginica **minus** setosa | 1.256 | -0.556 | 3.444 | 1.430 |
| Versicolor **minus** virginica | -0.652 | -0.204 | -1.292 | -0.700 |

Verify sepal length in the first row: $(5.936+6.588)/2-5.006=6.262-5.006=1.256$. Verify the second: $5.936-6.588=-0.652$. So the signs are not arbitrary output decoration; they encode the **direction of the comparison**.

**SOURCE (pp. 11–12):**

| Contrast | Pillai | Wilks | Hotelling–Lawley | Roy | Approx. F | df | p |
|---|---:|---:|---:|---:|---:|---|---|
| Average of others vs setosa | 0.9673 | 0.0327 | 29.5520 | 29.5520 | 1063.9 | 4,144 | < 2.2e-16 |
| Versicolor vs virginica | 0.74525 | 0.25475 | 2.92535 | 2.92535 | 105.31 | 4,144 | < 2.2e-16 |

The raw multivariate statistics are **not equal**, but with **one independent coefficient contrast** the multivariate transformations give the **same F statistic and p-value** for all four choices. Do not generalize that equivalence to higher-rank hypotheses. Both comparisons reject equality of four-dimensional mean vectors; the first comparison produces much stronger sample evidence according to these test measures.

### 11.3 The hypothesis SSP in a one-row contrast

**SOURCE (pp. 10–11):** For the first comparison, the diagonal entries of the hypothesis SSP are about 52.585, 10.305, 395.371 and 68.163. For the second they are 10.6276, 1.0404, 41.7316 and 12.25. The complete matrices contain off-diagonal cross-products too; they are printed in the source, not merely four individual t tests. The residual SSP is the same as in the full iris model because the outcome variables, predictor model and observations have not changed.

**TEACHING EXPANSION.** A large contrast for petal length does not automatically cause a large test statistic: it is measured relative to residual variability and the contrast's sampling uncertainty. Two responses can also reinforce or partly offset one another in a joint test depending on their error covariance.

### 11.4 What are custom contrasts in the predictor factor?

**SOURCE (p. 12):** Instead of using setosa as the treatment-code reference, the authors explicitly assign two contrast columns:

```r
C <- matrix(c(1, -0.5, -0.5, 0, 1, -1), 3, 2)
colnames(C) <- c("setosa vs. versicolor & virginica",
                 "versicolor & virginica")
contrasts(iris$Species) <- C
contrasts(iris$Species)
(mod.iris.2 <- update(mod.iris))
```

In the exact source, `C` is arranged as:

| Species | Contrast column 1 | Contrast column 2 |
|---|---:|---:|
| setosa | 1 | 0 |
| versicolor | -0.5 | 1 |
| virginica | -0.5 | -1 |

The first column singles out setosa versus the two others, and the second separates versicolor from virginica. **Important:** the printed column label `versicolor & virginica` is a name, not a claim that both species have been averaged together. Also, the R object named `C` in this code is a **factor-contrast coding matrix**; it should not be confused with the mathematical $\mathbf C$ on the right-hand side of $\mathbf L\mathbf B\mathbf P=\mathbf C$, which denotes **hypothesized constants**.

### 11.5 The crucial scaling trap: a contrast coefficient is not necessarily the raw difference

**SOURCE (p. 12):** After recoding, the intercepts become approximately $[5.843,3.057,3.758,1.199]$. The next two coefficient rows are:

| Reparameterized coefficient | Sepal.Length | Sepal.Width | Petal.Length | Petal.Width |
|---|---:|---:|---:|---:|
| Setosa vs others coding coefficient | -0.837 | 0.371 | -2.296 | -0.953 |
| Versicolor vs virginica coding coefficient | -0.326 | -0.102 | -0.646 | -0.350 |

**TEACHING EXPANSION, derivation:** Let the three group means for one outcome be $\mu_S,\mu_V,\mu_G$ and the custom-coded regression write

$$\begin{aligned}
\mu_S&=b_0+b_1,\\
\mu_V&=b_0-0.5b_1+b_2,\\
\mu_G&=b_0-0.5b_1-b_2.
\end{aligned}$$

Adding all three shows $b_0=(\mu_S+\mu_V+\mu_G)/3$, the **unweighted average of group means**. Subtracting the last two shows

$$b_2=\frac{\mu_V-\mu_G}{2}.$$

Comparing setosa to the average of the others gives

$$\mu_S-\frac{\mu_V+\mu_G}{2}=\frac32b_1,
\qquad b_1=\frac23\left(\mu_S-\frac{\mu_V+\mu_G}{2}\right).$$

Therefore **the original author tests `b1=0` or `b2=0`** to test meaningful group differences, even though the **coefficient magnitudes are scaled versions of the raw mean differences**. For sepal length, $(2/3)(5.006-6.262)=-(2/3)(1.256)=-0.83733$, agreeing with $-0.837$. And $(5.936-6.588)/2=-0.326$, agreeing with the second coefficient. This scaling point is critical in interpreting hand-designed contrasts.

### 11.6 An equivalent analysis, without mutating the original dataset

The original `contrasts(iris$Species) <- C` changes the in-memory `iris` object. If you run later analyses in the same R session, default coding is no longer guaranteed. A beginner-safe *equivalent coding strategy* is to work on a copy:

```r
iris_custom <- datasets::iris
C <- matrix(c(1, -0.5, -0.5, 0, 1, -1), nrow=3, ncol=2)
colnames(C) <- c("setosa vs others", "versicolor vs virginica")
contrasts(iris_custom$Species) <- C

mod.iris.custom <- lm(
  cbind(Sepal.Length, Sepal.Width, Petal.Length, Petal.Width) ~ Species,
  data=iris_custom)

coef(mod.iris.custom)
car::linearHypothesis(mod.iris.custom, c(0, 1, 0))
car::linearHypothesis(mod.iris.custom, c(0, 0, 1))
```

**SOURCE (pp. 12–13):** the original authors perform the same two coefficient tests using `linearHypothesis(mod.iris.2, c(0,1,0))` and `linearHypothesis(mod.iris.2, c(0,0,1))`. They recover the same hypothesis SSP matrices and test statistics as the corresponding focused hypotheses under treatment coding. **The fitted group means did not change, only the parameterization.** The difference between the two commands is which contrast row is being tested.

### 11.7 Check how a reparameterization can preserve the fit

```r
# Rebuild source-style treatment-coded model from an unmodified dataset:
iris_default <- datasets::iris
m_default <- lm(cbind(Sepal.Length, Sepal.Width,
                      Petal.Length, Petal.Width) ~ Species,
                data=iris_default)

# Custom contrast model from separate data copy:
m_custom <- lm(cbind(Sepal.Length, Sepal.Width,
                     Petal.Length, Petal.Width) ~ Species,
               data=iris_custom)

all.equal(unname(fitted(m_default)), unname(fitted(m_custom)),
          check.attributes=FALSE)
all.equal(unname(residuals(m_default)), unname(residuals(m_custom)),
          check.attributes=FALSE)
```

**Expected mathematical relationship:** the fitted values and residuals agree to numerical tolerance, because both design matrices span the same three species group means. This is a relationship to verify in R, not a claim to have run it here.

---

## 12. Selecting or combining response variables: `imatrix` and `P`

### 12.1 Why would we transform responses?

The hypothesis matrix $\mathbf L$ chooses **which predictor coefficients** to compare. The transformation matrix $\mathbf P$ chooses **which outcomes or outcome combinations** to analyze. The general source equation (p. 3) is $H_0:\mathbf L\mathbf B\mathbf P=\mathbf C$. A response transformation is particularly useful when one question concerns just a particular response, or the **change between two repeated occasions**.

### 12.2 Select only sepal length from the four-column model

**SOURCE (pp. 13–14):**

```r
Anova(mod.iris,
      imatrix=list(Sepal.Length=matrix(c(1, 0, 0, 0))))

linearHypothesis(mod.iris,
  c("Speciesversicolor = 0", "Speciesvirginica = 0"),
  P=matrix(c(1, 0, 0, 0)))

Anova(lm(Sepal.Length ~ Species, data=iris))
```

The response selection column is

$$\mathbf P=\begin{bmatrix}1\\0\\0\\0\end{bmatrix}
\quad(4\times1).$$

For any four-response row $(y_1,y_2,y_3,y_4)$, multiplying by $\mathbf P$ gives **only** $y_1$. `imatrix` takes a **named list of matrices**; the `P` argument to `linearHypothesis()` takes a **matrix directly**. The `c("Speciesversicolor = 0", "Speciesvirginica = 0")` argument supplies two coefficient restrictions, so $\mathbf L$ has dimension $2\times3$ and tests species jointly for the **selected** sepal-length response.

**SOURCE (pp. 13–14):** The transformed hypothesis and residual SSP become scalar values, about $H=63.212$ and $R=38.956$. The resulting F statistic is approximately $119.27$ with df 2 and 147; the univariate `Anova(lm(...))` reports the same F test up to rounding. This demonstrates that the general multivariate machinery **contains** ordinary univariate ANOVA as a special case.

### 12.3 Derive that single-response F

**TEACHING EXPANSION.** The between-species sum of squares for sepal length is about 63.212 with 2 df, so its mean square is $MS_H=63.212/2=31.606$. Residual SS is about 38.956 with 147 df, so $MS_R=38.956/147\approx0.26501$. Therefore

$$F=\frac{MS_H}{MS_R}=\frac{31.606}{0.26501}\approx119.26,$$

close to the reported $119.27$ because the source SSP values are rounded. **This calculation is derived from the original source values.** It is not an independently run R output.

### 12.4 The crucial preview of repeated measures

**TEACHING EXPANSION.** Suppose one student has $(\text{pre},\text{post},\text{followup})=(4,6,7)$. Multiplication by

$$\mathbf P=\begin{bmatrix}-1&0\\1&-1\\0&1\end{bmatrix}$$

gives $(\text{post}-\text{pre},\text{followup}-\text{post})=(2,1)$. For the same student, covariance across repeated times is meaningful; the transformation preserves their pairing. We can now appreciate why the source turns repeated observations into **separate response columns** instead of pretending each measurement is independent.

---
# PART III. REPEATED MEASURES: THE O'BRIEN–KAISER EXAMPLE

## 13. Why repeated measurements require a different design

### 13.1 Imagine the same person measured many times

**SOURCE (p. 14).** Repeated measures arise when an observational unit is measured on one characteristic at multiple **occasions** or under multiple **conditions**. The source distinguishes terminology: *repeated measures* often refers to times; *within-subjects factors* refers to any different conditions applied to the same unit. Agricultural *split-plot* designs are structurally related: a whole plot is divided into treated subplots.

**TEACHING EXPANSION.** Imagine a reading class. A student takes a comprehension test before a new teaching method, afterward, and at follow-up. Their results are related because they belong to the **same student**. Students with stronger underlying ability may score higher on every occasion, generating correlations among their repeated scores. We should **not** treat the three measurements as three independent students.

In a multivariate approach, put **one student per row** and their repeated measurements in separate columns. This preserves within-student association as a covariance structure. The column order must match the description of the repeated-measures factors supplied to `Anova()`.

### 13.2 Between-subjects versus within-subjects factors

A **between-subjects** factor differs *between people* and is constant for a given person, for example treatment group A versus B versus control. A **within-subjects** factor varies *within a person*, for example testing phase or hour. Their interaction asks whether the response pattern across one factor depends on another.

| Concept | Simple question | Source example |
|---|---|---|
| Treatment main effect | Do treatment groups have different average scores? | Between subjects |
| Gender main effect | Do the recorded gender groups differ in average scores? | Between subjects |
| Phase main effect | Do scores change from pretest to posttest to follow-up? | Within subjects |
| Hour main effect | Do scores change over the five hours? | Within subjects |
| Treatment × phase | Do treatment groups change differently across phases? | Between × within |
| Gender × treatment | Does the group difference associated with treatment depend on gender? | Between × between |
| Phase × hour | Does the hour pattern depend on phase? | Within × within |
| Treatment × gender × phase × hour | Does the phase/hour profile differ jointly across treatment-and-gender combinations? | Four-way interaction |

An **interaction** means the influence/association of one factor depends on the level of another. It is not the same as statistical dependence between individual measurements. A treatment-by-phase interaction could signal that teaching methods lead to different **improvement profiles**, even if the overall average treatments have similar values.

### 13.3 The two approaches discussed by the authors

**SOURCE (pp. 14, 21–23):**

- **Multivariate repeated-measures MANOVA:** fit a multivariate response matrix, then use an intra-subject design to create contrasts of the repeated measurements. It does not require the particular sphericity assumption of traditional univariate repeated-measures ANOVA, but it still assumes an appropriate multivariate error distribution/covariance model and needs adequate sample size.
- **Traditional univariate repeated-measures ANOVA:** models the repeated outcomes in a mixed-effects framing and commonly uses F tests that assume **sphericity**. When that assumption is doubtful, Greenhouse–Geisser and Huynh–Feldt corrections adjust the test degrees of freedom.

They may lead to different p-values, as the source's treatment-by-phase comparison demonstrates. Neither automatically invalidates the other; they rely on different inference conditions and can have different power.

---

## 14. The O'Brien–Kaiser data and how every column is constructed

### 14.1 What the data actually represent

**SOURCE (pp. 14–16).** The `OBrienKaiser` data, distributed in `carData`, are **contrived**, not observed results of a real trial in the stated teaching scenario. The authors imagine comparing innovative reading-instruction methods A and B with a traditional control method for students with learning difficulties. There are **16 participants**. Two between-subject factors are:

- `treatment`: `control`, `A`, `B` (three categories).
- `gender`: `F`, `M` (two coded categories as given by the data).

There are **15 responses per participant**, representing three phases and five hour measurements within each phase:

```text
pre.1 pre.2 pre.3 pre.4 pre.5
post.1 post.2 post.3 post.4 post.5
fup.1 fup.2 fup.3 fup.4 fup.5
```

A row contains **one person and all 15 measurements**. The names `pre`, `post` and `fup` stand for pretest, posttest and follow-up phases. There are $3\times5=15$ combinations of the two within-subject factors. There are two between-subject factors crossed with two within-subject factors, so a large collection of main effects and interactions is possible.

### 14.2 Check the original group counts and coding

**SOURCE (p. 15):**

```r
some(OBrienKaiser)
contrasts(OBrienKaiser$treatment)
contrasts(OBrienKaiser$gender)
xtabs(~ treatment + gender, data=OBrienKaiser)
```

The treatment by gender frequency table is:

| Treatment | F | M | Total |
|---|---:|---:|---:|
| control | 2 | 3 | 5 |
| A | 2 | 2 | 4 |
| B | 4 | 3 | 7 |
| **Total** | **8** | **8** | **16** |

The groups are **mildly unbalanced**; their sizes are not equal. The dataset already has custom contrasts:

| Treatment | First contrast | Second contrast |
|---|---:|---:|
| control | -2 | 0 |
| A | 1 | -1 |
| B | 1 | 1 |

The first column compares control with the two experimental groups in a scaled contrast; the second contrasts A with B. The gender contrast is F = 1, M = -1. These are **design coding numbers**, not actual test scores or claims about a person's gender identity. The treatment contrast columns are orthogonal when compared by simple level-wise inner products: $(-2)(0)+(1)(-1)+(1)(1)=0$. Because group sizes differ, orthogonality of level-wise contrast columns does not imply every sample-weighted comparison has equal precision.

### 14.3 Construct the within-subject 'data frame'

**SOURCE (p. 16):**

```r
phase <- factor(rep(c("pretest", "posttest", "followup"),
                    c(5, 5, 5)),
                levels=c("pretest", "posttest", "followup"))
hour <- ordered(rep(1:5, 3))
idata <- data.frame(phase, hour)
idata
```

`rep(c("pretest",...), c(5,5,5))` repeats each phase five times. `rep(1:5,3)` repeats 1,2,3,4,5 across all three phases. `factor()` marks categorical levels; `ordered()` says hours have a meaningful ordering, enabling polynomial contrasts by default. `idata` has **15 rows**, one per response column, and **two columns**, describing phase and hour. **It has no participants and no score measurements.** Its purpose is to describe the *design across response columns*, not the original observed dataset.

**A vital invariant:** row 1 of `idata` refers to `pre.1`; row 5 to `pre.5`; row 6 to `post.1`; row 10 to `post.5`; row 11 to `fup.1`; row 15 to `fup.5`. If this order is wrong, `Anova()` can run but test the wrong scientific contrast.

```r
responses_ok <- c(paste0("pre.", 1:5),
                  paste0("post.", 1:5),
                  paste0("fup.", 1:5))
stopifnot(length(responses_ok) == nrow(idata))
stopifnot(all(responses_ok %in% names(OBrienKaiser)))
data.frame(response=responses_ok, idata)
```

### 14.4 Long versus wide: two forms of the same data

**Wide format:** one row per student, 15 measurement columns. Good for the author's **multivariate model**. **Long format:** one row per student-time-condition combination, with a single score column plus labels for student, phase and hour. Good for **grouped plotting**. The source uses both. Reshaping does not invent extra students, and 240 long rows do **not** mean 240 independent subjects.

**SOURCE (p. 16), complete reshaping demonstration:**

```r
OBrien.long <- reshape(OBrienKaiser,
    varying=c("pre.1", "pre.2", "pre.3", "pre.4", "pre.5",
              "post.1", "post.2", "post.3", "post.4", "post.5",
              "fup.1", "fup.2", "fup.3", "fup.4", "fup.5"),
    v.names="score",
    timevar="phase.hour", direction="long")

OBrien.long$phase <- ordered(
   c("pre", "post", "fup")[1 +
     ((OBrien.long$phase.hour - 1) %/% 5)],
   levels=c("pre", "post", "fup"))

OBrien.long$hour <- ordered(
   1 + ((OBrien.long$phase.hour - 1) %% 5))

dim(OBrien.long)
head(OBrien.long, 25)
```

**SOURCE (pp. 16–17):** the dimensions are `240 7`. Derive 240 by $16\text{ people}\times15\text{ occasions}=240$ person-occasion records. Seven columns include between-subject descriptors, the time-index variable `phase.hour`, `score`, `id`, `phase` and `hour`. `%/% 5` is integer division and `%% 5` is remainder (modulo). These two arithmetic operators decode which block of five hours belongs to which phase. For example, `phase.hour=7` gives `1+((7-1)%/%5)=2` (post phase) and `1+((7-1)%%5)=2` (second hour). Because indices start at 1, the additions of 1 are essential.

**Beginner caution:** the source labels `phase` as `pre`, `post`, `fup` in the long data, and `pretest`, `posttest`, `followup` in `idata`. The labels need not match across **different data frames** because each is separately constructed for its task. The response **ordering**, however, must match the `idata` rows.

### 14.5 Aggregate the 240 observations into 90 group means

**SOURCE (pp. 17–18):**

```r
Means <- as.data.frame(ftable(with(OBrien.long,
    tapply(score,
       list(treatment=treatment, gender=gender,
            phase=phase, hour=hour),
       mean))))
names(Means)[5] <- "score"
dim(Means)
head(Means, 25)
```

`with()` permits column names without repeated prefixes. `tapply()` partitions scores by each unique factor combination then applies `mean`. `ftable()` creates a flat table; `as.data.frame()` returns a convenient data frame. There are $3\text{ treatments}\times2\text{ genders}\times3\text{ phases}\times5\text{ hours}=90$ group-level combinations, hence `dim(Means)` is **90 by 5**.

**SOURCE (p. 17), one observed mean:** control group, female-coded, pre phase, hour 1 has mean score `4.0000`. In the same slice, A female-coded has mean `2.5000`, and B female-coded has `3.2500`. These describe tiny subgroups (some only 2 participants); a descriptive difference is not itself evidence of an intervention effect.

### 14.6 Recreate and read the graphical profiles

**SOURCE (p. 18, Figure 4 on p. 19):**

```r
library(lattice)
xyplot(score ~ hour | phase + treatment,
       groups=gender, type="b",
       strip=function(...) strip.default(
         strip.names=c(TRUE, TRUE), ...),
       lty=1:2, pch=c(15, 1), col=1:2, cex=1.25,
       ylab="Mean Reading Score", data=Means,
       key=list(title="Gender", cex.title=1,
         text=list(c("Female", "Male")),
         lines=list(lty=1:2, col=1:2),
         points=list(pch=c(15, 1), col=1:2, cex=1.25)))
```

Read this as: graph **mean score against hour**, show a separate panel for each *phase × treatment* combination, distinguish gender groups, and connect points with lines (`type="b"` means points and lines). The `key` creates a legend. `lty` controls line style; `pch` controls plotting symbols; `col` selects plotting colors; `cex` scales points. The custom `strip` controls panel headers. There are nine panel combinations: three treatments by three phases.

**SOURCE (p. 18):** Figure 4 suggests three candidate patterns: improvement over phases in A and B but less in control (possible **treatment × phase** interaction), a rise and then decline across five hours (possible **quadratic hour** effect), and a difference between the two gender-coded groups most noticeable in treatment A (possible **treatment × gender** interaction). These are **graph-driven hypotheses**, not established conclusions. The actual multivariate tests that follow do not produce a p-value below 0.05 for all three candidates.

### 14.7 Why the source keeps both wide and long copies

If you work only in long format and apply a conventional `lm(score ~ treatment*gender*phase*hour)` as though its 240 rows were independent, the standard errors can be invalid because the same 16 participants contribute many rows. The authors deliberately use the **wide** `OBrienKaiser` form for `lm(cbind(...))` and the **long** form for illustration. Modern mixed-effects models can analyze long format with explicit participant-level dependence, but that is a **separate methodological extension**, not the technique the source demonstrates.

---
## 15. Fit the repeated-measures multivariate model

### 15.1 The model formula is simpler than its design

**SOURCE (p. 18):**

```r
mod.ok <- lm(cbind(pre.1, pre.2, pre.3, pre.4, pre.5,
                   post.1, post.2, post.3, post.4, post.5,
                   fup.1, fup.2, fup.3, fup.4, fup.5) ~
               treatment*gender,
             data=OBrienKaiser)
mod.ok
```

Why do `phase` and `hour` not appear on the right side of `~`? **Because they are not between-person predictors.** They describe **which response columns** are compared within the *same student*. The 15 columns on the left represent phase/hour combinations. The between-subject formula on the right contains treatment, gender and their interaction. Later `idata` and `idesign` construct the within-person comparisons.

The shorthand `treatment*gender` expands to `treatment + gender + treatment:gender`. With treatment three levels (2 contrast columns) and gender two levels (1 contrast), there are

$$1\text{ intercept}+2\text{ treatment}+1\text{ gender}+2\text{ interaction}=6$$

predictor coefficient rows. The coefficient matrix is **$6\times15$**. There are 16 students, so the residual df is $16-6=10$. That is why the printed tests' F denominators are sometimes very small. Despite 240 records in long form, the independent case count in this fit is **16**, not 240.

### 15.2 Read the huge coefficient output without panic

**SOURCE (p. 20):** `mod.ok` prints 90 coefficient numbers, spread across blocks of outcome columns. Here they are reorganized into one table for legibility; values use the precision shown in the PDF, and extremely small numbers such as `8.70e-18` represent floating-point values close to zero.

| Outcome | Intercept | treatment1 | treatment2 | gender1 | treatment1:gender1 | treatment2:gender1 |
|---|---:|---:|---:|---:|---:|---:|
| pre.1 | 3.90 | 0.118 | -0.229 | -0.653 | -0.493 | 0.604 |
| pre.2 | 4.28 | 0.139 | -0.333 | -0.778 | -0.389 | 0.583 |
| pre.3 | 5.43 | -0.0764 | -0.146 | -0.181 | -0.549 | 0.271 |
| pre.4 | 4.61 | 0.181 | -0.708 | -0.111 | -0.181 | 0.708 |
| pre.5 | 4.14 | 0.194 | -0.667 | -0.639 | -0.194 | 1.170 |
| post.1 | 5.03 | 0.764 | 0.292 | -0.861 | -0.681 | 0.958 |
| post.2 | 5.54 | 0.896 | 0.187 | -0.458 | -0.604 | 0.688 |
| post.3 | 6.92 | 0.833 | -0.250 | -0.417 | -0.333 | 0.250 |
| post.4 | 6.36 | 0.722 | 0.0833 | -0.528 | -0.556 | 0.917 |
| post.5 | 4.83 | 0.917 | ~0 | -1.000 | -0.500 | 1.250 |
| fup.1 | 6.01 | 0.924 | -0.0625 | -0.597 | -0.215 | 0.688 |
| fup.2 | 6.15 | 1.030 | -0.0625 | -0.903 | -0.160 | 1.190 |
| fup.3 | 7.78 | 1.100 | -0.125 | -0.778 | -0.347 | 0.875 |
| fup.4 | 6.17 | 0.958 | 0.125 | -0.833 | -0.0417 | 1.120 |
| fup.5 | 5.35 | 0.882 | 0.229 | -0.431 | -0.174 | 0.396 |

**Do not misinterpret this table:** `treatment1` and `treatment2` arise from the specific custom factor coding on PDF p. 15. `gender1` uses F=1 and M=-1. With interactions, the meaning of a coefficient depends on all interacting terms and their coding. For example, the printed intercept for `pre.1` is 3.90, a model parameter under the contrast scheme, **not automatically the actual observed pretest score of a particular control-group student**.

**TEACHING EXPANSION.** For any one response, take the row of six coefficients and the six design values for a treatment/gender combination. Their dot product yields that cell's fitted mean. You can ask R to handle the coding:

```r
coef(mod.ok)                  # 6 x 15 coefficient matrix
model.matrix(mod.ok)          # 16 x 6 between-subject design
fitted(mod.ok)                # 16 x 15 fitted response matrix
residuals(mod.ok)             # 16 x 15 residual response matrix

new_groups <- expand.grid(
  treatment=levels(OBrienKaiser$treatment),
  gender=levels(OBrienKaiser$gender))
# Keep original factor levels and custom contrasts:
new_groups$treatment <- factor(new_groups$treatment,
    levels=levels(OBrienKaiser$treatment))
new_groups$gender <- factor(new_groups$gender,
    levels=levels(OBrienKaiser$gender))
contrasts(new_groups$treatment) <- contrasts(OBrienKaiser$treatment)
contrasts(new_groups$gender) <- contrasts(OBrienKaiser$gender)
predicted_group_profiles <- predict(mod.ok, newdata=new_groups)
```

`predict()` should return a 6-by-15 set of fitted cell profiles when the new predictors retain the correct contrasts. We supply the explicit `contrasts(...)` lines to make the model's factor coding transparent rather than silently assume defaults.

### 15.3 Why the full residual SSP can be singular

The multivariate response has 15 columns but the fitted model has only **10 residual degrees of freedom**. A full 15-by-15 residual SSP derived from 10 independent residual rows **cannot have rank 15**. That does **not** mean every scientifically useful repeated-measures test must fail. The source uses smaller, term-specific **transformed-response** spaces. For example, the four hour polynomial contrasts create four transformed outcomes; the phase-by-hour interaction creates eight. They can be tested with the available residual information when the relevant transformed error matrices have sufficient rank. A broad untransformed 15-response MANOVA would demand more care about rank.

---

## 16. The source's repeated-measures MANOVA, one term at a time

### 16.1 Construct the intra-subject hypothesis design

**SOURCE (p. 20):**

```r
(av.ok <- Anova(mod.ok,
                idata=idata,
                idesign=~phase*hour,
                type=3))
```

The four arguments are fundamental:

- `mod.ok`: the $16\times15$ multivariate model already fitted.
- `idata=idata`: a 15-row table identifying the phase and hour associated with each of the 15 response columns.
- `idesign=~phase*hour`: build within-subject tests for phase, hour and phase-by-hour interaction, with the intercept representing the overall response direction.
- `type=3`: request type-III tests of the between-subject terms and their combinations with within-subject contrasts.

**SOURCE (p. 21):** `Anova()` creates mutually orthogonal within-subject term contrasts by default: `contr.sum()` for an ordinary factor such as phase, and `contr.poly()` for an ordered factor such as hour. Custom `icontrasts` can be specified if they preserve the necessary **block orthogonality** among within-subject terms. If this is violated, `Anova()` checks and reports an error. Changing `idesign` or `idata` changes which scientific effects are being tested, even though the model object is unchanged.

### 16.2 Type I, II and III tests are not interchangeable labels

**TEACHING EXPANSION:**

- **Type I:** sequentially attributes variation to terms in a chosen entry order; reordering terms can change tests in unbalanced designs.
- **Type II:** tests a term adjusted for relevant other terms, following the marginality principle; generally avoids treating higher-order interactions as ordinary adjustment covariates for lower-order effects.
- **Type III:** tests a term conditional on all the other included terms, including interactions. Its interpretation can be sensitive to factor coding and the reference/centering of predictors.

**SOURCE (p. 20):** Fox and Weisberg ordinarily prefer type II for their purposes. They choose type III **here** for comparability with O'Brien and Kaiser (1985). They say the preassigned treatment and gender contrasts support the type-III computations and invite comparing the type-II results. **Do not replace source `type=3` with `type=2` and assume the displayed p-values must agree.** Modern `car` documentation also cautions that Type III tests involving interactions must be interpreted with care under different contrast schemes.

### 16.3 The complete printed MANOVA term table

**SOURCE (p. 20), all displayed rows; Pillai by default:**

| Term | Model term df | Pillai | Approx F | F numerator df | F denominator df | Printed p |
|---|---:|---:|---:|---:|---:|---:|
| (Intercept) | 1 | 0.967 | 296.4 | 1 | 10 | 9.2e-09 |
| treatment | 2 | 0.441 | 3.9 | 2 | 10 | 0.05471 |
| gender | 1 | 0.268 | 3.7 | 1 | 10 | 0.08480 |
| treatment:gender | 2 | 0.364 | 2.9 | 2 | 10 | 0.10447 |
| phase | 1 | 0.814 | 19.6 | 2 | 9 | 0.00052 |
| treatment:phase | 2 | 0.696 | 2.7 | 4 | 20 | 0.06211 |
| gender:phase | 1 | 0.066 | 0.3 | 2 | 9 | 0.73497 |
| treatment:gender:phase | 2 | 0.311 | 0.9 | 4 | 20 | 0.47215 |
| hour | 1 | 0.933 | 24.3 | 4 | 7 | 0.00033 |
| treatment:hour | 2 | 0.316 | 0.4 | 8 | 16 | 0.91833 |
| gender:hour | 1 | 0.339 | 0.9 | 4 | 7 | 0.51298 |
| treatment:gender:hour | 2 | 0.570 | 0.8 | 8 | 16 | 0.61319 |
| phase:hour | 1 | 0.560 | 0.5 | 8 | 3 | 0.82027 |
| treatment:phase:hour | 2 | 0.662 | 0.2 | 16 | 8 | 0.99155 |
| gender:phase:hour | 1 | 0.712 | 0.9 | 8 | 3 | 0.58949 |
| treatment:gender:phase:hour | 2 | 0.793 | 0.3 | 16 | 8 | 0.97237 |

The `(Intercept)` is the overall response level under this coding and is rarely the main scientific question. The **phase** and **hour** tests have small p-values. At a conventional $0.05$ threshold, **treatment:phase** ($p=0.06211$) and **treatment:gender** ($p=0.10447$) do *not* cross that threshold, even though the graphs motivated these candidate interactions. This is why exploratory plot patterns must be checked rather than announced as statistically established.

### 16.4 Why one 'df' column says 1 for phase but numerator df says 2

This is a common reader trap. The `Df` near the start of the table describes the **between-subject term** (the intercept has df 1). The repeated-measures **phase** term has three levels and therefore two independent within-person contrasts. When testing the intercept against these two transformed responses, the multivariate F approximation has **numerator df 2** even though the initial `Df` field is 1. Similarly, the five-level hour factor has **four** independent polynomial contrasts. The two-level treatment comparison space has df 2, which interacts with multiple within-person dimensions and changes the final degrees of freedom.

### 16.5 Which findings deserve attention?

**SOURCE (p. 21):** the anticipated **hour** effect and the **phase** effect have small p-values. The treatment-by-phase and treatment-by-gender interactions do not cross $0.05$ in this multivariate analysis. The authors explicitly say these results should **not be overinterpreted** because the dataset is small and contrived. That caution is part of the source's conclusion, not optional fine print.

**TEACHING EXPANSION.** A test with $p=0.05471$ is not a demonstration of 'no treatment effect'; it is a result that does not meet a selected $0.05$ cutoff. With only 16 students and several interactions, effect sizes, confidence regions, uncertainty and design limitations deserve as much attention as the yes/no threshold. The source does not claim a real-world educational program worked.

### 16.6 What different terms actually test

Conceptually, the transformed response space decomposes into orthogonal groups:

| Within-subject term | Independent response directions | Why |
|---|---:|---|
| (Intercept) | 1 | Overall level, averaging across occasions |
| phase | 2 | Three phase levels minus one overall level |
| hour | 4 | Five ordered hours minus one overall level |
| phase:hour | 8 | $(3-1)(5-1)=2\times4$ interaction directions |
| **Total** | **15** | $1+2+4+8=15$ response dimensions |

This decomposition explains **why the within-subject model is not simply fifteen separate ANOVAs**. It groups response variation by the scientific meaning of the contrasts: overall level, shifts across phases, changes across hours and changing hour patterns across phases.

---
## 17. Traditional repeated-measures ANOVA, sphericity and corrections

### 17.1 Why introduce a second analysis?

**SOURCE (pp. 21–23; §3.1).** The authors contrast their multivariate repeated-measures approach with the **traditional univariate repeated-measures ANOVA**. The traditional model allows participant-level random effects but makes a stronger assumption about covariance patterns, namely **sphericity**. The same `Anova.mlm` object can be summarized to display these univariate tests as well as multivariate ones:

```r
summary(av.ok, multivariate=FALSE)
```

The choice `multivariate=FALSE` suppresses multivariate tables *in this summary*, allowing easier inspection of the traditional F tests and their corrections. It does not refit the original multivariate regression.

### 17.2 Sphericity explained without abstract language

**TEACHING EXPANSION.** Suppose each student is tested at three times, and we construct three differences: $D_{12}=Y_1-Y_2$, $D_{13}=Y_1-Y_3$, and $D_{23}=Y_2-Y_3$. One intuitive version of **sphericity** demands that the variances of all pairwise differences be equal:

$$\operatorname{Var}(Y_1-Y_2)
=\operatorname{Var}(Y_1-Y_3)
=\operatorname{Var}(Y_2-Y_3).$$

For a more general orthogonal within-subject contrast basis, sphericity means equal variance in all these contrast directions and zero covariance between orthogonal contrast coordinates. For two repeated levels, there is only one independent difference, so the usual sphericity problem does not arise in the same way.

A **sufficient but not necessary** condition is **compound symmetry**, with equal marginal variances and equal off-diagonal covariances:

$$\boldsymbol\Sigma=\begin{bmatrix}
\sigma^2&c&c\\
c&\sigma^2&c\\
c&c&\sigma^2
\end{bmatrix}.$$

Then every pairwise difference has variance $\operatorname{Var}(Y_i-Y_j)=\sigma^2+\sigma^2-2c=2(\sigma^2-c)$. For example, if all three variances are 4 and all pairwise covariances are 1, each difference variance is $4+4-2(1)=6$. **Sphericity can hold under some other covariance structures too**, which is why compound symmetry is sufficient but not logically required.

**SOURCE (p. 21):** the reference also requires the relevant transformed covariance structure to be consistent across the between-subject cells. This is not a general guarantee furnished by conducting Mauchly's test alone.

### 17.3 The complete original univariate F table

**SOURCE (pp. 21–22), 'Univariate Type III Repeated-Measures ANOVA Assuming Sphericity':**

| Term | Hypothesis SS | num df | Error SS | den df | F | p |
|---|---:|---:|---:|---:|---:|---:|
| (Intercept) | 6759 | 1 | 228.1 | 10 | 296.39 | 9.2e-09 |
| treatment | 180 | 2 | 228.1 | 10 | 3.94 | 0.0547 |
| gender | 83 | 1 | 228.1 | 10 | 3.66 | 0.0848 |
| treatment:gender | 130 | 2 | 228.1 | 10 | 2.86 | 0.1045 |
| phase | 130 | 2 | 80.3 | 20 | 16.13 | 6.7e-05 |
| treatment:phase | 78 | 4 | 80.3 | 20 | 4.85 | 0.0067 |
| gender:phase | 2 | 2 | 80.3 | 20 | 0.28 | 0.7566 |
| treatment:gender:phase | 10 | 4 | 80.3 | 20 | 0.64 | 0.6424 |
| hour | 104 | 4 | 62.5 | 40 | 16.69 | 4.0e-08 |
| treatment:hour | 1 | 8 | 62.5 | 40 | 0.09 | 0.9992 |
| gender:hour | 3 | 4 | 62.5 | 40 | 0.45 | 0.7716 |
| treatment:gender:hour | 8 | 8 | 62.5 | 40 | 0.62 | 0.7555 |
| phase:hour | 11 | 8 | 96.2 | 80 | 1.18 | 0.3216 |
| treatment:phase:hour | 7 | 16 | 96.2 | 80 | 0.35 | 0.9901 |
| gender:phase:hour | 9 | 8 | 96.2 | 80 | 0.93 | 0.4956 |
| treatment:gender:phase:hour | 14 | 16 | 96.2 | 80 | 0.74 | 0.7496 |

The uncorrected univariate treatment-by-phase test has $p\approx0.0067$, whereas the **multivariate** test reports $p\approx0.06211$. These are results from different test frameworks. You must report which framework you use and never mix the univariate F with the multivariate p-value.

### 17.4 What is Mauchly's test?

Mauchly's test evaluates a covariance restriction implied by **sphericity**. Its null is that sphericity holds for the relevant repeated-measures contrast space. A small p-value suggests evidence **against** sphericity. A large p-value does **not** prove the assumption, especially with only 16 people.

**SOURCE (p. 22), distinctive repeated rows condensed by shared within-subject space:**

| Within-subject space | Mauchly W | p | Source interpretation |
|---|---:|---:|---|
| phase (and between-subject × phase terms) | 0.749 | 0.273 | No small p for detected violation |
| hour (and between-subject × hour terms) | 0.066 | 0.008 | Evidence of sphericity violation |
| phase:hour (and its between-subject interactions) | 0.005 | 0.449 | No small p here, but small $n$ limits confidence |

The source prints the same within-subject-space W/p repeatedly for corresponding treatment and gender interactions. **Do not confuse 'Mauchly p' with the ANOVA effect p-value**. For instance, a significant Mauchly test does **not** mean there is an hour effect; it means the **assumption behind the uncorrected univariate F reference distribution** is doubtful.

### 17.5 Greenhouse–Geisser and Huynh–Feldt adjustments

**SOURCE (pp. 21–23).** The **Greenhouse–Geisser (GG)** and **Huynh–Feldt (HF)** corrections estimate an $\epsilon$ factor to adjust degrees of freedom in repeated-measures F tests. Roughly,

$$df^*_{\mathrm{numerator}}=\widehat\epsilon\,df_{\mathrm{numerator}},\qquad
 df^*_{\mathrm{denominator}}=\widehat\epsilon\,df_{\mathrm{denominator}}.$$

The observed F ratio itself is not recomputed from newly observed scores merely because epsilon is applied. The **reference distribution** changes, often giving a **larger, more cautious p-value**. GG typically estimates epsilon more conservatively than HF; corrections do not fix every possible covariance violation or a fundamentally inadequate design.

**TEACHING EXPANSION, numerical df example.** The original hour F has df $(4,40)$. With printed GG epsilon about $0.46$, the corrected df are approximately $(4\cdot0.46,40\cdot0.46)=(1.84,18.4)$, not $(4,40)$. R uses more precise epsilon internally, so recomputing p from rounded `0.46` may not exactly match the reported p.

### 17.6 The full source GG/HF correction table

**SOURCE (pp. 22–23).** The source prints shared epsilon values for each set of within-subject contrasts. The table below reproduces each within-subject interaction row's corrected p-values and epsilon, reorganized as a single table.

| Effect | GG epsilon | GG p | HF epsilon | HF p |
|---|---:|---:|---:|---:|
| phase | 0.80 | 0.00028 | 0.92786 | 1.1247e-04 |
| treatment:phase | 0.80 | 0.01269 | 0.92786 | 8.4388e-03 |
| gender:phase | 0.80 | 0.70896 | 0.92786 | 7.4086e-01 |
| treatment:gender:phase | 0.80 | 0.61162 | 0.92786 | 6.3200e-01 |
| hour | 0.46 | 9.8e-05 | 0.55928 | 2.3009e-05 |
| treatment:hour | 0.46 | 0.97862 | 0.55928 | 9.8866e-01 |
| gender:hour | 0.46 | 0.62843 | 0.55928 | 6.6455e-01 |
| treatment:gender:hour | 0.46 | 0.64136 | 0.55928 | 6.6930e-01 |
| phase:hour | 0.45 | 0.33452 | 0.73306 | 3.2966e-01 |
| treatment:phase:hour | 0.45 | 0.93037 | 0.73306 | 9.7523e-01 |
| gender:phase:hour | 0.45 | 0.44908 | 0.73306 | 4.7803e-01 |
| treatment:gender:phase:hour | 0.45 | 0.64634 | 0.73306 | 7.0801e-01 |

**Study the treatment-by-phase contrast:** multivariate Pillai $p\approx0.06211$ (p. 20); traditional uncorrected univariate $p\approx0.0067$ (p. 21); GG-corrected $p\approx0.01269$ and HF-corrected $p\approx0.00844$ (p. 22). **Even after univariate correction this effect crosses 0.05 while the multivariate test does not**. This is not a transcription error, but reflects different tests, assumptions and finite-sample behavior. The authors specifically highlight this discrepancy on p. 23.

### 17.7 What should a cautious analyst choose?

**TEACHING EXPANSION.** The appendix is teaching the **MANOVA approach**; it shows the traditional univariate approach for comparison. Consider the experiment's planned contrasts, participant count, dimensionality, covariance model, balance, assumptions and statistical power before making a methodological choice. In modern practice a prespecified multilevel/mixed-effects model may be useful for incomplete repeated data or complex covariance, but that requires a different analysis and is **not a substitute for correctly interpreting the PDF's tests**. Do not choose whichever method produces a lower p after seeing the data and present it as a preplanned result.

---
## 18. Focused repeated-measures hypotheses: linear through quartic trends

### 18.1 What is a polynomial trend?

**TEACHING EXPANSION.** Five equally spaced hours allow four independent ways a profile can vary around its mean. An **hour linear** pattern means scores tend to change steadily as the hour increases; a **quadratic** pattern bends upward or downward (for instance, improving initially and then declining); a **cubic** pattern permits a further change in bending direction; a **quartic** pattern permits still greater curvature across five ordered points. These are **statistical contrast shapes**, not automatic causal mechanisms such as fatigue.

A polynomial *contrast* is a carefully weighted combination of the five mean scores. To study shapes rather than overall level, its weights add to zero. Orthogonal polynomial contrasts are constructed so different polynomial orders do not duplicate the same sample-space direction under the chosen equal-level inner product.

### 18.2 Reproduce the overall hour test with `linearHypothesis()`

**SOURCE (pp. 23–24; §3.2):**

```r
linearHypothesis(mod.ok, "(Intercept) = 0",
  idata=idata, idesign=~phase*hour,
  iterms="hour")
```

The keyword is `iterms="hour"`: generate the **response-transformation columns** for the hour term. Why test the **between-subject intercept** when we are interested in hour? Because the hypothesis is about the **overall hour pattern of the transformed responses**, averaged in the sense defined by the model's contrast coding, not a difference between treatment levels. The source emphasizes this point on p. 24. If we wanted treatment-specific hour patterns, we would change the **between-subject coefficient hypothesis** instead.

**SOURCE (pp. 23–24), overall hour transformed test:** Pillai approximately `0.9329`, Wilks `0.0671`, Hotelling–Lawley and Roy both `13.8944`, approximate F `24.315`, df `(4,7)`, p `0.0003345`. This reproduces the hour row of the multivariate `Anova()` table from p. 20, up to rounding.

### 18.3 Build the response-transformation matrix yourself

**SOURCE (p. 24):**

```r
(Hour <- model.matrix(~ hour, data=idata))
linearHypothesis(mod.ok, "(Intercept) = 0",
   P=Hour[, c(2:5)])
```

`model.matrix(~ hour, data=idata)` creates a **15-by-5** within-subject design. Column 1 is the intercept (all ones), and columns 2–5 are the linear, quadratic, cubic and quartic **ordered-hour contrasts**. Dropping column 1 yields $\mathbf P$ of dimensions $15\times4$. Multiplying the 15 response columns by $\mathbf P$ returns **four transformed outcomes** for every student. With 16 students and the six between-student coefficient rows, the transformed residual SSCP is $4\times4$ and can be full rank with the 10 residual df.

**SOURCE (pp. 23–25), five rows of weights (repeated in every phase block):**

| Hour | `hour.L` | `hour.Q` | `hour.C` | `hour^4` |
|---|---:|---:|---:|---:|
| 1 | -0.63246 | 0.53452 | -0.31623 | 0.11952 |
| 2 | -0.31623 | -0.26726 | 0.63246 | -0.47809 |
| 3 | 0 | -0.53452 | approximately 0 | 0.71714 |
| 4 | 0.31623 | -0.26726 | -0.63246 | -0.47809 |
| 5 | 0.63246 | 0.53452 | 0.31623 | 0.11952 |

The source prints the complete 15-by-4 transformation and the corresponding 15-by-5 `Hour` matrix. The table above gives the **entire unique set** of weights; the same five rows repeat for pretest, posttest and follow-up. No information about the weights is lost by displaying them once here. Values are rounded; apparent `-4.0960e-16` is numerical zero.

**Interpret the shape of these weights:**

- **Linear:** negative on early hours, positive on late hours. A steadily increasing series tends to have a positive linear contrast.
- **Quadratic:** positive at both ends and negative in the middle. A middle peak gives a negative quadratic contrast; a middle dip gives a positive one. The test usually concerns whether it is zero, so the **sign** depends on the chosen contrast orientation.
- **Cubic:** alternates direction in a more complex, antisymmetric pattern.
- **Quartic:** strong positive middle, negative at hours 2 and 4, small positive at endpoints, permitting a further change of curvature.

A zero-sum contrast does not measure the overall score level. For example, all five scores equal to 7 give linear contrast $7\sum_h w_h=0$. Raising all five scores by 10 leaves every zero-sum contrast unchanged.

### 18.4 Show why the two all-hour commands are equivalent

Both

```r
linearHypothesis(mod.ok, "(Intercept) = 0",
                 idata=idata, idesign=~phase*hour, iterms="hour")
```

and

```r
Hour <- model.matrix(~ hour, data=idata)
linearHypothesis(mod.ok, "(Intercept) = 0",
                 P=Hour[, 2:5])
```

ask exactly the same overall hour hypothesis. The first constructs $\mathbf P$ from **design instructions**; the second supplies the **constructed numerical matrix** directly. This is the key lesson of the source's two methods. The same statistical question must produce the same hypothesis SSP, error SSP, test statistic and p-value apart from printing differences.

**SOURCE (pp. 23–25):** The four-by-four SSP matrices for hour have, for example, hypothesis diagonal entries approximately `[0.010345, 234.1182, 13.03707, 65.69068]` for `[L,Q,C,quartic]`, and residual diagonal entries approximately `[89.7333, 46.6429, 21.8083, 29.315]`. The off-diagonal values are **not all zero**: orthogonality of the *contrast weights* does **not** mean residual responses are statistically uncorrelated. MANOVA explicitly uses their cross-products. The source's hypothesis off-diagonal entries include $H_{LQ}\approx1.5562$, $H_{QC}\approx55.24686$ and $H_{Q,4}\approx-124.01365$; the error off-diagonal entries include $R_{LQ}\approx49.6106$, $R_{QC}\approx1.3522$ and $R_{C,4}\approx16.111$.

### 18.5 Test the polynomial components separately

**SOURCE (pp. 25–28), each is a one-column $\mathbf P$:**

```r
# Linear trend:
linearHypothesis(mod.ok, "(Intercept) = 0",
                 P=Hour[, 2, drop=FALSE])

# Quadratic trend:
linearHypothesis(mod.ok, "(Intercept) = 0",
                 P=Hour[, 3, drop=FALSE])

# Cubic trend:
linearHypothesis(mod.ok, "(Intercept) = 0",
                 P=Hour[, 4, drop=FALSE])

# Quartic trend:
linearHypothesis(mod.ok, "(Intercept) = 0",
                 P=Hour[, 5, drop=FALSE])
```

`drop=FALSE` is more than an aesthetic detail. By default, `Hour[,2]` may simplify to a vector. With `drop=FALSE`, R retains a **15-by-1 matrix**, the matrix type expected by the mathematical notation and API. The full `Hour[,2:5]` already has four columns and is naturally a matrix.

**SOURCE (pp. 26–28), complete results condensed from the four verbose outputs:**

| Trend component | Hypothesis SSP (scalar) | Error SSP (scalar) | Pillai | Wilks | Approx F | df | p |
|---|---:|---:|---:|---:|---:|---|---:|
| Linear (L) | 0.010345 | 89.733 | 0.00012 | 0.99988 | 0.0011528 | 1,10 | 0.9736 |
| Quadratic (Q) | 234.12 | 46.643 | 0.8339 | 0.1661 | 50.194 | 1,10 | 3.356e-05 |
| Cubic (C) | 13.037 | 21.808 | 0.37414 | 0.62586 | 5.978 | 1,10 | 0.03455 |
| Quartic (fourth degree) | 65.691 | 29.315 | 0.69144 | 0.30856 | 22.408 | 1,10 | 0.0007997 |

Hotelling–Lawley and Roy are equal for each one-dimensional component, with source values approximately **0.00012, 5.0194, 0.59780 and 2.24082**, respectively. The four one-column tests all yield the same F across the different multivariate statistics, because the transformed response dimension is 1.

### 18.6 Derive the quadratic F by hand from the source's numbers

For the **quadratic** one-dimensional response contrast, the hypothesis has 1 df and the residual has 10 df. The source prints hypothesis SSP $234.12$ and residual SSP $46.643$. Thus

$$F=\frac{234.12/1}{46.643/10}
=\frac{234.12}{4.6643}\approx50.19,$$

matching the source's $F\approx50.194$ within rounding. Its p-value is approximately $3.356\times10^{-5}$ on df $(1,10)$. Once $\mathbf P$ has reduced the problem to **one response contrast**, the familiar univariate F machinery reappears. Similarly, for the linear trend $F\approx(0.010345/1)/(89.733/10)\approx0.001153$, explaining the very large linear-test p-value.

This pair of calculations establishes an important distinction: a **non-significant linear trend** does not mean 'no overall hour effect'. The significant quadratic, cubic and quartic components and the joint four-degree-of-freedom test tell a richer story.

### 18.7 Are the scores 'just quadratic'?

The source's graph on p. 19 suggested a potentially quadratic pattern. The authors do not stop at a significant quadratic component. They test the collection of **nonquadratic** hour components:

**SOURCE (pp. 28–29):**

```r
linearHypothesis(mod.ok, "(Intercept) = 0",
                 P=Hour[, c(2, 4:5)])  # all non-quadratic
```

`c(2,4:5)` selects the *linear, cubic and quartic* columns, skipping the quadratic column 3. The result is a **15-by-3** response-transformation matrix. It is not the same as fitting a model with the quadratic term removed globally: here the **joint hypothesis** tests whether these three selected components are collectively zero.

**SOURCE (pp. 28–29), reported result:**

| Test | Statistic | Approx F | df | p |
|---|---:|---:|---|---:|
| Pillai | 0.8963 | 23.05 | 3,8 | 0.0002724 |
| Wilks | 0.1037 | 23.05 | 3,8 | 0.0002724 |
| Hotelling–Lawley | 8.6439 | 23.05 | 3,8 | 0.0002724 |
| Roy | 8.6439 | 23.05 | 3,8 | 0.0002724 |

The corresponding **three-by-three** hypothesis SSP (rounded from p. 28) is

$$\mathbf H\approx\begin{bmatrix}
0.010345&0.36724&-0.82435\\
0.36724&13.03707&-29.26455\\
-0.82435&-29.26455&65.69068
\end{bmatrix},$$

and the error SSP is

$$\mathbf R\approx\begin{bmatrix}
89.7333&-9.7167&-25.418\\
-9.7167&21.8083&16.111\\
-25.418&16.111&29.315
\end{bmatrix}.$$

This three-component joint test rejects the hypothesis that **all nonquadratic components** are zero. **SOURCE (p. 29) concludes:** the hour effect is **more complex than a simple quadratic trend**. The source's explicit demonstration of a nonquadratic combination is why it is inaccurate to summarize the entire repeated-measures example simply as 'the quadratic trend is significant'.

### 18.8 Practical interpretation and caution

The source does **not** establish that fatigue caused the score pattern. Hours are ordered, the data are small and contrived, and effects combine pre/post/follow-up information according to the selected contrasts. The nonquadratic rejection may reflect cubic and quartic components, unusual local fluctuations, or features of this tiny dataset. An analyst should visualize the observed group means, consider uncertainty and planned contrasts, and avoid interpreting fifth-degree-plus extrapolation beyond the five observed levels. These polynomial contrasts are designed for **within-range shape comparison** across five observed hours, not as validated forecasting equations.

---
# PART IV. BECOMING A CAREFUL APPLIED ANALYST

## 19. Model assumptions, diagnosis and interpretation mistakes

### 19.1 Every test rests on a design, not just an R command

**TEACHING EXPANSION.** The source assumes independent observational units, a suitable linear conditional mean model, a common nonsingular error covariance and (for its standard finite-sample inference) multivariate-normal errors. Diagnosing violations is not a ritual after a tiny p-value; it is part of deciding what that p-value means.

| Potential problem | What to inspect | Why it matters |
|---|---|---|
| Nonindependent subjects | Collection protocol, participant IDs, clusters | Ordinary independent-case standard errors can be wrong |
| Heterogeneous group covariance | Group scatterplots/ellipses, residual covariance by group | MANOVA assumes common within-cell $\boldsymbol\Sigma$ |
| Multivariate outliers | Joint residual distance, diagnostic plots | A point can be unexceptional in each marginal response but unusual jointly |
| Non-normal multivariate errors | Residual distributions and joint structure | Exact/approximate MANOVA p-values may be unreliable |
| Nonlinear conditional means | Residuals against predictors and fitted values | Coefficients may fail to describe the mean pattern |
| Highly collinear predictors | Design-matrix rank, condition diagnostics | Individual coefficients may be unstable or not estimable |
| Redundant response columns | Response and residual correlation, matrix rank | Error SSP may be singular |
| Missing data | Row counts and missingness patterns | Complete-case analyses may change the target sample |
| Too few independent units | $n$, model rank, residual df, transformed response count | High-dimensional joint testing may be infeasible |
| Sphericity violations (traditional RM ANOVA) | Mauchly, difference variances, GG/HF | Uncorrected univariate F reference distribution may be inappropriate |

### 19.2 Simple diagnostics for the iris model

```r
iris_default <- datasets::iris
m_iris <- lm(cbind(Sepal.Length, Sepal.Width,
                   Petal.Length, Petal.Width) ~ Species,
             data=iris_default)
E <- residuals(m_iris)

# Marginal residual plots for each response:
par(mfrow=c(2, 2))
for (j in seq_len(ncol(E))) {
  plot(fitted(m_iris)[, j], E[, j],
       xlab="Fitted value", ylab="Residual",
       main=colnames(E)[j])
  abline(h=0, lty=2)
}
par(mfrow=c(1, 1))

# Compare within-species response covariance matrices:
by(iris_default[, 1:4], iris_default$Species, cov)

# Which responses have strong residual association?
round(cor(E), 3)

# Univariate normal QQ plots (screening, not full MVN proof):
par(mfrow=c(2, 2))
for (j in seq_len(ncol(E))) {
  qqnorm(E[, j], main=colnames(E)[j])
  qqline(E[, j])
}
par(mfrow=c(1, 1))
```

The source's ellipse comparison **already suggests unequal within-species covariance** (p. 7). `by(..., cov)` makes the assumption tangible by printing each species' four-by-four covariance matrix. Looking at these numbers is informative; informal visual differences are not automatically a formal rejection of every possible covariance-homogeneity null.

### 19.3 Multivariate residual distance

A useful **additional** screen is squared Mahalanobis distance, which accounts for correlation:

$$D_i^2=(\widehat{\mathbf e}_i-\bar{\mathbf e})^\mathsf T
\widehat{\boldsymbol\Sigma}^{-1}
(\widehat{\mathbf e}_i-\bar{\mathbf e}),$$

where $\widehat{\mathbf e}_i$ is case $i$'s residual vector and $\widehat{\boldsymbol\Sigma}$ an estimated residual covariance matrix. In an intercept-containing OLS model, residual column means should be approximately zero. A large $D_i^2$ suggests a case is far from the residual center in the **joint** response space, even if each raw residual seems moderate. It is a **diagnostic ranking**, not an automatic valid p-value or proof of data error.

```r
E <- residuals(m_iris)
S <- crossprod(E) / df.residual(m_iris)
D2 <- mahalanobis(E, center=colMeans(E), cov=S)
head(sort(D2, decreasing=TRUE), 10)
plot(D2, type="h", xlab="Flower index",
     ylab="Squared multivariate residual distance")
```

A high-leverage case can have a deceptively small residual, so distance alone is insufficient. Check data entry, fitted values, influential-case diagnostics, group structure and scientific context. The source does **not** present this Mahalanobis diagnostic; it is an applied extension.

### 19.4 Repeated measures have special diagnostic concerns

When 16 students each contribute 15 response columns, the raw 15-by-15 residual covariance is rank-limited by residual df 10. Therefore do **not** blindly invert that matrix for a 15-dimensional Mahalanobis distance. The **within-subject contrast spaces** used by the source are smaller, and a separate robust strategy may be needed for general high-dimensional residual diagnosis. In real repeated-measures designs also examine dropout, time order, practice effects, missing outcomes, unequal time spacing, and how the within-person correlation changes with lag. The appendix's standard analysis presumes a complete wide response layout in its dataset.

### 19.5 When would a modern analyst use another model?

**TEACHING EXPANSION, outside the source.** Longitudinal mixed-effects models (`nlme`, `lme4` or related frameworks), generalized estimating equations or covariance-structured models can be suitable for some repeated-measures tasks, especially with missing occasions or varied spacing. Permutation or resampling procedures may help under carefully justified exchangeability conditions, and robust multivariate methods are available for covariance heterogeneity or outliers. **These are alternative analyses requiring their own assumptions and code, not methods demonstrated by the source**. Do not claim they reproduce its p-values.

### 19.6 Multiplicity and post-hoc selection

The more outcomes, contrasts, polynomial components, interactions and specifications you examine, the easier it is to find a small unadjusted p-value by chance under some nulls. The source illustrates focused tests pedagogically; for a real confirmatory study, **predefine key contrasts** and consider multiple-testing adjustments (for example Holm's method) or a hierarchical test strategy. Never claim that the appendix itself applied a multiplicity correction to all subsequent comparisons unless it explicitly did so: it does not.

### 19.7 Seven common false interpretations, corrected

1. **'Multivariate' means many predictors.** False; it means multiple responses in this context.
2. **'Separate coefficients imply separate statistical models with unrelated errors.'** False; the error covariance can be correlated and matters for inference.
3. **'A significant MANOVA means every outcome and pair of groups differs.'** False; it rejects a joint null.
4. **'A factor contrast coefficient equals the exact raw mean difference.'** Not always; contrast scaling matters (iris custom coding, p. 12).
5. **'A 240-row reshaped file contains 240 independent people.'** False; there are 16 people measured 15 times.
6. **'Mauchly p below 0.05 proves an hour effect.'** False; it concerns a covariance assumption.
7. **'A significant quadratic hour test proves the hour effect is purely quadratic.'** False; the source's nonquadratic joint test is significant (p. 29).

---

## 20. Two complete practical workflows for offline study

### 20.1 Practical A: Iris MANOVA, from start to finish

This script preserves the **meaning** of the source analysis while avoiding mutation of the built-in iris data. It does not require internet after the packages have been installed. The code is a teaching assembly of the source commands, with additional verifications and explanatory comments.

```r
# --- INITIALIZE ---
library(car)
iris_data <- datasets::iris

# --- INSPECT ---
str(iris_data)
table(iris_data$Species)
aggregate(iris_data[, 1:4],
          by=list(Species=iris_data$Species), FUN=mean)

# --- EXPLORE (SOURCE FIGURES 2 AND 3) ---
car::scatterplotMatrix(
  ~ Sepal.Length + Sepal.Width + Petal.Length + Petal.Width | Species,
  data=iris_data, smooth=FALSE, regLine=FALSE, ellipse=TRUE,
  by.groups=TRUE, diagonal=FALSE,
  legend=list(coords="bottomleft"))

oldpar <- par(mfrow=c(2, 2))
for (response in names(iris_data)[1:4]) {
  car::Boxplot(iris_data[[response]] ~ iris_data$Species,
               ylab=response, xlab="Species")
}
par(oldpar)

# --- FIT FOUR RESPONSES TOGETHER ---
m <- lm(cbind(Sepal.Length, Sepal.Width,
              Petal.Length, Petal.Width) ~ Species,
        data=iris_data)
class(m)
coef(m)
summary(m)

# --- OMNIBUS MULTIVARIATE SPECIES TEST ---
a <- car::Anova(m)
print(a)
summary(a)
anova(m)                   # Sequential base-R comparison

# --- FOCUSED GROUP COMPARISONS ---
car::linearHypothesis(
  m, "0.5*Speciesversicolor + 0.5*Speciesvirginica",
  verbose=TRUE)
car::linearHypothesis(
  m, "Speciesversicolor = Speciesvirginica",
  verbose=TRUE)

# --- RESPONSE SELECTION / UNIVARIATE EQUIVALENCE ---
P_sepal <- matrix(c(1, 0, 0, 0), ncol=1)
car::linearHypothesis(
  m, c("Speciesversicolor = 0", "Speciesvirginica = 0"),
  P=P_sepal)
car::Anova(lm(Sepal.Length ~ Species, data=iris_data))

# --- CUSTOM SPECIES CODING ON AN ISOLATED COPY ---
iris_custom <- iris_data
C <- matrix(c(1, -0.5, -0.5, 0, 1, -1), 3, 2)
colnames(C) <- c("SetosaVsOthers", "VersicolorVsVirginica")
contrasts(iris_custom$Species) <- C
mc <- lm(cbind(Sepal.Length, Sepal.Width,
               Petal.Length, Petal.Width) ~ Species,
         data=iris_custom)
coef(mc)
car::linearHypothesis(mc, c(0, 1, 0))
car::linearHypothesis(mc, c(0, 0, 1))
all.equal(unname(fitted(m)), unname(fitted(mc)),
          check.attributes=FALSE)

# --- ERROR COVARIANCE / ASSUMPTION SCREEN ---
E <- residuals(m)
R <- crossprod(E)
S <- R / df.residual(m)
print(R)
print(cov2cor(S))
by(iris_data[, 1:4], iris_data$Species, cov)
```

**Follow the script deliberately.** Each stage answers a new question: description → visualization → individual regression coefficients → omnibus multivariate test → planned group comparisons → reparameterization verification → covariance diagnostics. Re-running `summary(m)` alone does not replace the MANOVA step.

### 20.2 Practical B: O'Brien–Kaiser repeated-measures analysis

This practical reproduces the **core mathematical requests** of the source. It uses the original factor contrasts stored in the dataset and keeps measurement columns in a verified order.

```r
# --- INITIALIZE ---
library(car)
library(carData)
data("OBrienKaiser", package="carData")

# --- VERIFY DESIGN ---
str(OBrienKaiser)
xtabs(~ treatment + gender, data=OBrienKaiser)
contrasts(OBrienKaiser$treatment)
contrasts(OBrienKaiser$gender)

response_names <- c(paste0("pre.", 1:5),
                    paste0("post.", 1:5),
                    paste0("fup.", 1:5))
stopifnot(nrow(OBrienKaiser) == 16,
          length(response_names) == 15,
          all(response_names %in% names(OBrienKaiser)))

# --- WITHIN-SUBJECT DESIGN: ROWS MATCH RESPONSE COLUMNS ---
phase <- factor(rep(c("pretest", "posttest", "followup"), each=5),
                levels=c("pretest", "posttest", "followup"))
hour <- ordered(rep(1:5, times=3))
idata <- data.frame(phase=phase, hour=hour)
print(data.frame(response=response_names, idata))

# --- MULTIVARIATE MODEL: ONE PARTICIPANT PER ROW ---
response_matrix <- as.matrix(OBrienKaiser[, response_names])
m_ok <- lm(response_matrix ~ treatment*gender,
           data=OBrienKaiser)
class(m_ok)
dim(coef(m_ok))
df.residual(m_ok)

# --- TYPE III MULTIVARIATE REPEATED-MEASURES TESTS ---
a_ok <- car::Anova(m_ok, idata=idata,
                   idesign=~phase*hour, type=3)
print(a_ok)

# --- TRADITIONAL UNIVARIATE TESTS AND CORRECTIONS ---
summary(a_ok, multivariate=FALSE)

# --- REPRODUCE JOINT HOUR TEST TWO WAYS ---
car::linearHypothesis(m_ok, "(Intercept) = 0",
                      idata=idata, idesign=~phase*hour,
                      iterms="hour")
Hour <- model.matrix(~hour, data=idata)
car::linearHypothesis(m_ok, "(Intercept) = 0",
                      P=Hour[, 2:5])

# --- TEST THE FOUR TREND COMPONENTS ---
trend_names <- colnames(Hour)[2:5]
for (j in 2:5) {
  cat("\nComponent:", trend_names[j - 1], "\n")
  print(car::linearHypothesis(
    m_ok, "(Intercept) = 0",
    P=Hour[, j, drop=FALSE]))
}

# --- TEST ALL NONQUADRATIC TERMS JOINTLY ---
car::linearHypothesis(m_ok, "(Intercept) = 0",
                      P=Hour[, c(2, 4:5)])
```

**Compatibility clarification:** the source spells out 15 response names inside `cbind()`. Here `response_matrix <- as.matrix(OBrienKaiser[,response_names])` passes exactly the same ordered columns to `lm()` on the left. The mathematical model is unchanged provided the original dataset and column order agree. If teaching from the lecturer's literal code is important, use the literal source `cbind(...)` expression from Chapter 15 instead.

### 20.3 Inspect a result systematically

For every model output write five lines in your notebook:

1. **Unit:** what is an independent case (flower, student, customer)?
2. **Responses:** which and how many columns are dependent variables?
3. **Terms:** what predictor/within-person contrast is being tested?
4. **Statistic and uncertainty:** which multivariate test, F transformation, df and p-value are reported?
5. **Meaning and assumptions:** exactly what null can be rejected or not rejected, and what cautions remain?

This five-line habit prevents most reporting errors even when output is technically complex.

---
## 21. Practice problems with step-by-step solutions

The following questions are **TEACHING EXPANSIONS**, except where labelled as calculations from a published source value. Try each problem **before** reading its solution.

### Exercise 1. Identify the type of regression

**Problem.** A bank models (a) default risk with income and debt; (b) customer satisfaction and retention with income and debt; (c) four measures of employee performance with training program as the only predictor. Which cases are multivariate?

**Solution.** (a) One response, two predictors: **multiple** regression, not multivariate. (b) Two responses, two predictors: **multivariate multiple** regression. (c) Four responses, one grouping predictor: **multivariate** one-way ANOVA/linear model. The number of responses is the deciding criterion.

### Exercise 2. Interpret a model coefficient

**Problem.** In the source's iris model, `Speciesvirginica = -0.454` for sepal width. Explain it.

**Solution.** The reference species is setosa with mean sepal width 3.428 cm. The virginica mean is lower by 0.454 cm, hence $3.428-0.454=2.974$ cm. It does **not** mean virginica has negative sepal width, that each virginica flower is 0.454 cm smaller, or that the species label was randomly assigned.

### Exercise 3. Matrix dimensions

**Problem.** A store dataset has $n=80$, four predictor columns including the intercept, and $m=3$ responses. Give dimensions of $\mathbf Y,\mathbf X,\mathbf B,\mathbf E,\mathbf{SSP}_R$ and $\mathbf P$ if two response combinations are tested.

**Solution.** $\mathbf Y$ and $\mathbf E$ are $80\times3$, $\mathbf X$ is $80\times4$, and $\mathbf B$ is $4\times3$. The SSP is $3\times3$. For two transformed response combinations, $\mathbf P$ is $3\times2$, and the transformed responses $\mathbf Y\mathbf P$ are $80\times2$.

### Exercise 4. Build a residual

**Problem.** An illustrative sales model predicts 37 for a case whose observed sales are 42. What is the residual? What does its sign mean?

**Solution.** $e=y-\widehat y=42-37=5$. The model underpredicted this case by 5 outcome units. The residual alone is not proof of a biased model; examine residuals across cases.

### Exercise 5. Calculate two covariance entries

**Problem.** For three cases and two responses, let centered observations be $(-2,-1),(0,1),(2,0)$. Calculate each response's total SS and the cross-product, then sample covariance.

**Solution.** First response SS $4+0+4=8$. Second response SS $1+1+0=2$. Cross-product $(-2)(-1)+(0)(1)+(2)(0)=2$. Thus SSP is $\begin{bmatrix}8&2\\2&2\end{bmatrix}$; divide by $n-1=2$ to get sample covariance $\begin{bmatrix}4&1\\1&1\end{bmatrix}$. Note the off-diagonal $1$, not zero.

### Exercise 6. SSP and residual standard deviation

**Problem.** Using the source's iris values, calculate the sepal-width residual standard deviation from error SSP diagonal $16.962$ and df 147.

**Solution.** Residual variance $=16.962/147\approx0.11539$ square centimetres; residual SD $=\sqrt{0.11539}\approx0.340$ cm. **SOURCE (p. 8)** reports residual standard error approximately `0.34`, which checks the calculation.

### Exercise 7. Compute all four multivariate criteria

**Problem.** Two illustrative generalized roots are $\lambda_1=3$ and $\lambda_2=1$. Compute Pillai, Hotelling–Lawley, Wilks and Roy.

**Solution.** Pillai $=3/4+1/2=1.25$. Hotelling–Lawley $=3+1=4$. Wilks $=(1/4)(1/2)=0.125$. Roy $=3$. **Do not** put $1-\lambda_j$ in Pillai's denominator even though PDF p. 2 contains that error. These are raw statistics, not p-values.

### Exercise 8. Explain a mean-vector null

**Problem.** Four measurements are modeled against species; the omnibus MANOVA is significant. A classmate writes 'Every species differs from every other species on each measurement.' Correct this.

**Solution.** The null says **all three four-dimensional group mean vectors are equal**. Rejecting it indicates that at least one vector differs, but not which pair or which component differences independently account for the finding. Conduct planned pairwise or specific contrast tests and inspect effect sizes/uncertainty. Also recognize the source's covariance-homogeneity concern.

### Exercise 9. Construct a coefficient-hypothesis matrix

**Problem.** The coefficient matrix has rows `(Intercept)`, `Speciesversicolor`, `Speciesvirginica`. Give $\mathbf L$ for comparing versicolor to virginica on all responses.

**Solution.** $\mathbf L=[0,1,-1]$. Its product with the coefficient matrix equals $\boldsymbol\mu_V-\boldsymbol\mu_G$ because each nonreference coefficient is a difference from the common setosa reference, which cancels on subtraction.

### Exercise 10. Verify an iris mean contrast numerically

**Problem.** From the source's sepal-length means, calculate the average-of-others difference relative to setosa and the versicolor-minus-virginica difference.

**Solution.** $\mu_S=5.006$, $\mu_V=5.936$, $\mu_G=6.588$. Average others minus setosa $=(5.936+6.588)/2-5.006=1.256$. Versicolor minus virginica $=5.936-6.588=-0.652$. These agree with the verbose `linearHypothesis()` printed results (pp. 10–11).

### Exercise 11. Why did custom coding change the coefficient?

**Problem.** The custom-coded sepal-length species coefficient for setosa versus the other two is approximately $-0.837$, but the raw setosa-minus-average-of-others difference is $-1.256$. Is the source inconsistent?

**Solution.** No. Its contrast column is $(1,-0.5,-0.5)$, so that coefficient equals **two-thirds** of the raw setosa-minus-average difference. Compute $(2/3)(-1.256)=-0.8373$. Testing that coefficient against zero is equivalent to testing the unscaled difference against zero; the fitted group means and multivariate hypothesis test are unchanged.

### Exercise 12. Derive an ANOVA F from SSP

**Problem.** From the source's sepal-length response-selection output, use $SS_H=63.212$, df$_H=2$, $SS_R=38.956$, df$_R=147$ to calculate F.

**Solution.** $MS_H=63.212/2=31.606$, $MS_R=38.956/147\approx0.26501$, and $F\approx31.606/0.26501\approx119.26$, matching the source's $119.27$ within output rounding. This confirms that a one-column $\mathbf P$ recovers an ordinary univariate test.

### Exercise 13. Count true independent units

**Problem.** The O'Brien–Kaiser wide table contains 16 students and 15 scores each. After reshaping, it contains 240 rows. How many independent subjects appear in the author's multivariate model, and what is its residual df?

**Solution.** Still **16 students**. The 240 rows are repeated observations, not new people. The between-person design has 6 coefficient columns, so residual df $16-6=10$. Treating 240 as the sample size for an independent-case OLS F test would ignore within-student dependence.

### Exercise 14. Locate one response in `idata`

**Problem.** Which response corresponds to row 12 of `idata` in the source, and why?

**Solution.** Rows 1–5 are pretest hours 1–5, rows 6–10 posttest hours 1–5, rows 11–15 follow-up hours 1–5. Therefore row 12 is **follow-up, hour 2**, corresponding to `fup.2`.

### Exercise 15. Interpret an interaction that did not cross 0.05

**Problem.** The source's multivariate treatment-by-phase p-value is `0.06211`. Does it prove all treatments have identical improvement patterns?

**Solution.** No. With the chosen test and significance level $0.05$, it does not provide sufficient evidence to reject the specified interaction null. It does **not prove the null**. The sample is only 16 and contrived, and different multivariate/univariate procedures give different p-values in the example.

### Exercise 16. Demonstrate compound symmetry

**Problem.** Three repeated outcomes each have variance 9, and every pair has covariance 3. Find the variance of any pairwise difference.

**Solution.** $\operatorname{Var}(Y_i-Y_j)=9+9-2(3)=12$. All pairs have the same difference variance, which is compatible with sphericity. Compound symmetry is sufficient, not necessary.

### Exercise 17. Understand the GG degrees-of-freedom change

**Problem.** An hour F test initially has df $(4,40)$ and approximate GG epsilon 0.46. What df do you use after the correction?

**Solution.** Multiply both original dfs by epsilon: numerator $4(0.46)=1.84$, denominator $40(0.46)=18.4$. In actual software the unrounded epsilon is used. The test F value is usually retained but its null reference distribution, hence p-value, changes.

### Exercise 18. Reconstruct the quadratic test F

**Problem.** Source p. 26 gives hypothesis SSP $234.12$ and error SSP $46.643$ for a one-column quadratic response contrast; residual df is 10. Compute F.

**Solution.** $F=(234.12/1)/(46.643/10)\approx50.19$ on $(1,10)$ df, agreeing with the printed `50.194` within rounding. Because response-transformation dimension is 1, all four multivariate statistics transform to the same F test for this contrast.

### Exercise 19. Separate linear and quadratic conclusions

**Problem.** The source reports linear trend $p=0.9736$ and quadratic trend $p=3.356\times10^{-5}$. Interpret both.

**Solution.** There is no evidence against the **linear-contrast zero** hypothesis in the particular joint model, but there is strong evidence against the **quadratic-contrast zero** hypothesis. This does not mean the relationship has no trend, nor does it prove a *pure* quadratic shape: cubic and quartic tests must also be considered.

### Exercise 20. Explain the final nonquadratic test

**Problem.** What exactly does `P=Hour[, c(2,4:5)]` test, and what does the source conclude?

**Solution.** It selects **linear, cubic and quartic** hour contrasts, omitting quadratic, and tests their mean transformed effects **jointly**. Source p. 29 reports Pillai `0.8963`, $F(3,8)=23.05$ and $p=0.0002724$. Therefore the source concludes that the hour main effect is **more complex than a simple quadratic trend**. It does not assert a specific real-world cause of the complex shape.

### Bonus programming exercises

1. Create a new iris response transformation $\mathbf P=(0,0,1,-1)^\mathsf T$ and interpret it as *petal length minus petal width*. Fit `linearHypothesis(mod.iris, c("Speciesversicolor = 0", "Speciesvirginica = 0"), P=matrix(c(0,0,1,-1)))`. This is **your new analysis**, not a published source result; compute its p-value in R rather than guessing.
2. Replace `P=Hour[,3,drop=FALSE]` with `P=Hour[,2:4]`. Predict the dimensions of the transformed response and the hypothesis SSP. **Answer:** 16-by-3 transformed responses, a 3-by-3 hypothesis SSP, assuming the same 16-case model.
3. Re-run `car::Anova(mod.ok, idata=idata, idesign=~phase*hour, type=2)` and compare it with the original `type=3` model. This is **a deliberate extension**; do not label its unprinted results as source output.
4. Draw separate mean profiles for A, B and control and explain which visual pattern first suggested the treatment-by-phase hypothesis. Do **not** claim statistical significance solely from the lines.

---
## 22. Fast retrieval: notation, glossary and exact-reference map

### 22.1 Notation reference

| Symbol | Dimensions or type | Meaning |
|---|---|---|
| $n$ | Integer | Number of independent observational cases |
| $m$ | Integer | Number of original response variables |
| $k+1$ | Integer | Number of coefficients per response, including intercept if present |
| $\mathbf Y$ | $n\times m$ | Observed response matrix |
| $\mathbf X$ | $n\times(k+1)$ | Predictor/design matrix |
| $\mathbf B$ | $(k+1)\times m$ | Population coefficient matrix |
| $\widehat{\mathbf B}$ | $(k+1)\times m$ | Estimated coefficient matrix |
| $\mathbf E$ | $n\times m$ | Population error matrix |
| $\widehat{\mathbf E}$ | $n\times m$ | Fitted residual matrix |
| $\boldsymbol\Sigma$ | $m\times m$ | Common within-case error covariance matrix |
| $\mathbf{SSP}_T$ | $m\times m$ | Total sums-of-squares-and-cross-products matrix |
| $\mathbf R=\mathbf{SSP}_R$ | $m\times m$ | Residual/error SSP |
| $\mathbf H=\mathbf{SSP}_H$ | $m\times m$, or transformed $v\times v$ | Hypothesis SSP |
| $\lambda_j$ | Nonnegative scalar | Generalized root of hypothesis SSP relative to error SSP |
| $q$ | Integer | Number of independent coefficient restrictions |
| $\mathbf L$ | $q\times(k+1)$ | Coefficient-hypothesis matrix |
| $\mathbf C$ | $q\times m$ or $q\times v$ | Claimed values under the null |
| $\mathbf P$ | $m\times v$ | Response selection/contrast matrix |
| $v$ | Integer | Number of transformed response combinations |
| $V$ | Scalar | Pillai–Bartlett trace |
| $T$ | Scalar | Hotelling–Lawley trace |
| $\Lambda$ | Scalar | Wilks' Lambda |
| $\Theta$ | Scalar | Roy's largest root |
| $\epsilon$ | Scalar | Non-sphericity degree-of-freedom factor |
| $\alpha$ | Scalar | Chosen hypothesis-test significance threshold |

### 22.2 What does that term mean? A compact glossary

**ANOVA:** analysis of variance, testing mean differences using explained and residual variation. **MANOVA:** multivariate ANOVA, jointly testing mean vectors. **Multivariate linear model (`mlm`):** linear-regression model with multiple response columns. **Multivariate multiple regression:** multivariate model that also has several predictors. **Case:** independent observational row under a model. **Observation unit:** the student, customer, branch or flower on which measurements are obtained. **Response:** modeled outcome. **Predictor/regressor:** explanatory term on the right of `~`. **Intercept:** expected outcome at the model's coded baseline. **Slope:** coefficient for a predictor, conditional on the others. **Dummy variable:** numeric indicator for a factor category. **Contrast:** a specified weighted comparison of coefficients or group means. **Baseline group:** reference category for treatment coding.

**Coefficient matrix:** one regression coefficient per predictor/response combination. **Design matrix:** numerical representation of predictors and their coding. **Factor:** R variable with categorical levels. **Ordered factor:** categorical levels with specified order. **Interaction:** how an effect differs across levels of another variable. **Orthogonal contrasts:** linearly independent coding directions with zero inner products in the relevant contrast space. **Model rank:** number of linearly independent design columns. **Residual df:** number of independent case-level directions remaining after estimation. **Fitted value:** model-predicted response. **Residual:** observed minus fitted outcome. **Population error:** unobserved error term. **Least squares:** estimation by minimizing squared residuals. **Maximum likelihood:** estimation by maximizing model likelihood under stated assumptions.

**Mean vector:** one mean per response. **Covariance:** co-movement of two variables in their original units. **Correlation:** unitless standardized covariance. **Covariance matrix:** collection of all variances and covariances. **Positive definite:** matrix whose quadratic forms are positive for all nonzero directions. **Nonsingular:** invertible. **SSP:** sums of squares and cross-products, the multivariate extension of a sum of squares. **Hypothesis SSP:** variation associated with an effect under test. **Residual SSP:** unexplained variation in the fitted model. **Eigenvalue/generalized root:** scalar indicating comparative variation in a special multivariate direction. **Wilks' Lambda:** determinant-based multivariate test statistic. **Pillai trace:** sum of bounded generalized-root contributions. **Hotelling–Lawley trace:** sum of generalized roots. **Roy's largest root:** maximum generalized root.

**Null hypothesis:** exact claim tested under an assumed model. **P-value:** tail probability of a test result at least as extreme under that null and the statistical assumptions. **F approximation:** conversion of a multivariate statistic to an F reference distribution. **Degrees of freedom:** independently varying dimensions relevant to an estimate or test. **Type I SS:** sequential attribution of explained variation. **Type II test:** specified partial-term test respecting term hierarchy. **Type III test:** conditional test of a term with other modeled terms included, interpretation depending on coding and interactions.

**Repeated measures:** several outcomes from the same unit at different occasions/conditions. **Between-subject factor:** variable distinguishing independent participants. **Within-subject factor:** condition varying for a particular participant. **Wide data:** one row per participant with many repeated outcome columns. **Long data:** one row per participant-occasion record. **Response transformation:** matrix $\mathbf P$ selecting or combining responses. **Sphericity:** equal variance in appropriate within-subject contrast directions. **Compound symmetry:** equal marginal variances and equal pairwise covariances. **Mauchly's test:** test of sphericity. **GG correction:** Greenhouse–Geisser adjusted degrees of freedom. **HF correction:** Huynh–Feldt adjusted degrees of freedom. **Polynomial contrast:** weighted response comparison isolating a linear, quadratic, cubic or higher-order ordered-factor direction. **Mahalanobis distance:** covariance-adjusted multivariate distance. **HE plot:** hypothesis/error visualization, mentioned by the authors as a further use of `Anova.mlm` objects; **not actually demonstrated** in this PDF.

### 22.3 Source R functions and where they are taught

| R command | Purpose | Main lesson | Original page(s) |
|---|---|---|---|
| `library(car)` | Load regression companion utilities | Namespaces and setup | 4 |
| `some(iris)` | Inspect a selection of cases | Output sample is not fixed | 4 |
| `scatterplotMatrix()` | Pairwise response plots with ellipses | Explore covariance and group separation | 4–5 |
| `par(mfrow=...)` | Multi-panel base graphics layout | Four response boxplots | 4–6 |
| `Boxplot()` | Grouped boxplots | Response marginal distributions | 4–6 |
| `cbind()` | Construct multivariate response | Several response columns | 3, 7, 18 |
| `lm()` | Fit multivariate general linear model | Multiple response coefficient columns | 3, 7, 18 |
| `class()` | Inspect model object class | `mlm` and `lm` inheritance | 7, 9 |
| `summary()` | Inspect summaries | Individual responses and repeated-measures tests | 7–9, 21 |
| `Anova()` | Multivariate hypothesis tests | Type II/III, `idata`, `idesign`, `imatrix` | 9, 13, 20 |
| `anova()` | Base sequential ANOVA | When it agrees with type-II test | 10 |
| `linearHypothesis()` | Test general $L\mathbf BP=C$ | Focused group and response tests | 10–14, 23–29 |
| `contrasts()` | Inspect/change predictor coding | Species and O'Brien–Kaiser contrasts | 12, 15 |
| `matrix()` | Build contrast matrices | Custom $\mathbf L$ and $\mathbf P$ | 12–14 |
| `update()` | Refit revised model call | Iris custom factor contrasts | 12 |
| `factor()`, `ordered()` | Encode categorical and ordered levels | Intra-subject phase and hour | 16 |
| `rep()` | Repeat factor levels | Create 15-row `idata` | 16 |
| `reshape()` | Convert wide to long | 16 participants × 15 records | 16–17 |
| `%/%`, `%%` | Integer division and remainder | Decode phase and hour | 16 |
| `tapply()`, `ftable()` | Summarize grouped means | Create 90-row means table | 17–18 |
| `xyplot()` | Trellis panel graphics | Treatment/phase/gender/hour profiles | 18–19 |
| `model.matrix()` | Construct numeric design/contrast matrix | Four polynomial hour directions | 24 |
| `drop=FALSE` | Preserve a one-column matrix | Correct $P$ matrix shape | 25–28 |

### 22.4 Original notes and footnotes that matter

The PDF's first footnote (p. 1) notes that the Greek upper-case Beta and Epsilon can resemble Roman B and E typographically, so the appendix uses hats to distinguish estimated coefficients and residuals; we have consistently used $\widehat{\mathbf B}$ and $\widehat{\mathbf E}$. Footnote 2 (p. 3) points readers to **§5.3.5** of the parent *R Companion* for univariate `linearHypothesis()` methods. Footnote 3 (p. 9) explains that **`Manova()`** from `car` is equivalent to `Anova()` when applied to a multivariate linear model. Footnote 4 (p. 18) points to the companion's **§9.3.1** and Sarkar (2008) for additional details on `lattice` graphics. The source describes HE plots as possible downstream visualizations of `Anova.mlm` objects (p. 9), but does not perform an HE-plot example; therefore this book does not invent source code or output for one.

### 22.5 A one-minute interpretation template

For a source-aligned written answer, complete this paragraph:

> **We modeled** [response variables] jointly using [predictor/between-subject factors] and, if applicable, [within-subject factors]. **We tested** [a precise null hypothesis about mean vectors or response contrasts] with [Pillai/Wilks/etc.] using [specified type and transformation]. **The source reports** statistic [number], approximate $F(df_1,df_2)$ [number] and $p$ [number]. **At the chosen threshold**, [reject/do not reject] that null, without treating non-rejection as proof of equality. **Interpretation is limited by** [design, covariance, sample size, any multiplicity or other relevant issues].

---

## 23. Source audit, compatibility, citations and further reading

### 23.1 Coverage verification checklist (all 30 pages)

This table provides a **page-level audit**. 'Represented' means the central content has been explained, coded or interpreted within this book; it does not mean that all PDF tables have been photocopied. Several large raw outputs are condensed into mathematically equivalent tables to make the material teachable.

| PDF page | Verification: concept/figure/code/result included | Teaching chapter(s) |
|---|---|---|
| 1 | Abstract, model, all matrix dimensions, Gaussian errors, between-case independence, Kronecker representation, notation footnote | 3, 4, 22 |
| 2 | Least-squares formula, total/regression/residual SSP identity, generalized roots, four tests, Rao inputs, Pillai typo identified | 4–6 |
| 3 | Wilks approximate F, general $L B=C$ test and $L B P=C$ transformation, `lm`/`Anova` introduction, hypothesis footnote | 6–7 |
| 4 | Three-species photographs described and attributed, built-in iris data, `some`, scatterplot and boxplot commands | 8 |
| 5 | Figure 2's pairwise ellipses and covariance implications | 8 |
| 6 | Figure 3's four boxplots and outlier-reading guidance | 8 |
| 7 | `mod.iris`, `mlm` class, all 12 coefficient values, sepal-length summary | 9 |
| 8 | Remaining response summaries, four residual SEs and $R^2$ values | 9 |
| 9 | Type-II Pillai default, full species $\mathbf H$/$\mathbf R$ SSP, all four multivariate tests, HE-plot mention, `Manova` footnote | 5–6, 10, 22 |
| 10 | Base sequential `anova`, setosa-vs-other-average hypothesis and verbose hypothesis matrices | 10–11 |
| 11 | Both focused contrast results, SSP meaning, equal F transformations for one coefficient contrast | 11 |
| 12 | Three-by-two custom coding matrix, recoded coefficient rows, test equivalence, careful scaling derivation | 11 |
| 13 | Custom contrast test repetition, `imatrix`, response selection | 11–12 |
| 14 | $P$ matrix, scalar SSP, univariate test match, repeated-measures definition | 12–13 |
| 15 | O'Brien–Kaiser sampled data description, treatment and gender contrast coding, observed group frequencies | 14 |
| 16 | Phase and ordered hour, 15-row `idata`, original reshape code, 240 by 7 | 14 |
| 17 | Long-table data structure, `tapply`/`ftable` means and sample values | 14 |
| 18 | 90-row mean table, complete `xyplot` call, suggested visual interactions, `mod.ok` formula | 14–15 |
| 19 | Figure 4 visual profiles and how to read them | 14 |
| 20 | 90 coefficient estimates arranged compactly, complete type-III MANOVA term/p table, reason type III selected | 15–16 |
| 21 | Contrast orthogonality discussion, substantive findings, repeated-measures univariate ANOVA assumptions and first output | 16–17 |
| 22 | Remaining univariate table, full Mauchly information, GG/HF results | 17 |
| 23 | Remaining HF results, disagreement with MANOVA, source's `linearHypothesis(...,iterms="hour")` and SSP example | 17–18 |
| 24 | Overall hour Pillai, explicit `Hour` model matrix, direct response $P$ | 18 |
| 25 | Repeated `Hour` matrix rows, hypothesis/error SSP, linear-component code | 18 |
| 26 | Linear and quadratic numeric tests | 18, 21 |
| 27 | Cubic and quartic code and cubic numeric result | 18 |
| 28 | Quartic result, nonquadratic joint `P`, joint hypothesis/error SSP | 18 |
| 29 | Nonquadratic joint result and actual conclusion, complementary reading and start of bibliography | 18, 22–23 |
| 30 | Remaining primary bibliography | 23 |

### 23.2 Corrections and boundaries: what is source and what is added?

**Mathematical correction 1:** Source p. 2 prints Pillai's trace $\sum\lambda_j/(1-\lambda_j)$ although the $\lambda_j$ are eigenvalues of $\mathbf H\mathbf R^{-1}$. The correct formula for those roots is $\sum\lambda_j/(1+\lambda_j)$. The source's own iris results confirm the **plus** denominator. The incorrect sign was not carried into the teaching mathematics.

**Dimension clarification 2:** For the general $L\widehat B P=C$ hypothesis (p. 3), with $P$ having $v$ columns, the resulting hypothesis SSP is **$v\times v$**. Matrix multiplication determines this regardless of the tiny dimension note in the typeset source. $L$ is $q\times(k+1)$, $\widehat B$ is $(k+1)\times m$, $P$ is $m\times v$, and $C$ is $q\times v$.

**Compatibility clarification 3:** R/package prints can differ from 2018; current CRAN manual entries still document `car::Anova()` with `idata`, `idesign`, `icontrasts` and `imatrix` and `car::linearHypothesis()` with `P` and `iterms`. Older snippets in this book remain labelled as source code. The safer data-copy idioms and checks are explicitly labelled as added. **No R execution was performed to verify current installation-specific output**; the numeric tables are sourced from the supplied PDF and elementary derived calculations have been verified separately.

**Scope clarification 4:** Additional diagnostics, the business examples, methodological alternatives, educational analogies and exercises are pedagogical additions. They should not be cited as findings or demonstrations of Fox and Weisberg's appendix.

### 23.3 Documentation worth keeping with an offline copy

If you archive manuals for offline work, useful publicly accessible documentation includes the current `car` **Anova** reference at `https://rdrr.io/cran/car/man/Anova.html`, the `linearHypothesis` reference at `https://search.r-project.org/CRAN/refmans/car/help/linearHypothesis.html`, and the CRAN package reference at `https://cran.r-project.org/web/packages/car/refman/car.html`. These links are optional supporting documentation, not dependencies of the Markdown file; the conceptual explanations and source code in this teaching book remain readable offline.

### 23.4 Further reading actually cited in the source

The following is a compact bibliographic guide reflecting the original source's reading section (pp. 29–30), not newly conducted evidence about their contents:

- **Anderson (1935):** original iris data, *Bulletin of the American Iris Society*, 59, 2–5.
- **Fisher (1936):** use of multiple measurements in classification problems, *Annals of Eugenics*, 7 (Part II), 179–188.
- **Dalgaard (2007):** new functions for multivariate analysis, *R News*, 7(2), 2–7.
- **Fox (2016):** *Applied Regression Analysis and Generalized Linear Models*, third edition, Sage. The original appendix says its §1 draws on Fox's §9.5.
- **Fox and Weisberg (2019):** *An R Companion to Applied Regression*, third edition, Sage. This is the parent book.
- **Fox, Friendly and Monette (2009):** visualization of hypothesis tests with the `heplots` package, *Computational Statistics*, 24, 233–246.
- **Friendly (2007):** HE plots for multivariate models, *Journal of Computational and Graphical Statistics*, 16, 421–444.
- **Friendly (2010):** HE plots for repeated-measures designs, *Journal of Statistical Software*, 37(4), 1–40.
- **Greenhouse and Geisser (1959):** methods for profile-data analysis, *Psychometrika*, 24, 95–112.
- **Hand and Taylor (1987):** *Multivariate Analysis of Variance and Repeated Measures: A Practical Approach for Behavioural Scientists*, Chapman and Hall.
- **Huynh and Feldt (1976):** degrees-of-freedom corrections in randomized-block/split-plot designs, *Journal of Educational Statistics*, 1, 69–82.
- **Mauchly (1940):** test for sphericity, *Annals of Mathematical Statistics*, 11, 204–209.
- **Morrison (2005):** *Multivariate Statistical Methods*, fourth edition, Duxbury.
- **O'Brien and Kaiser (1985):** MANOVA approach to repeated measures, *Psychological Bulletin*, 97, 316–333.
- **Rao (1973):** *Linear Statistical Inference and Its Applications*, second edition, Wiley; cited for theoretical test distributions.
- **Sarkar (2008):** *Lattice: Multivariate Data Visualization with R*, Springer; reference for the source's plots.
- **Winer (1971):** *Statistical Principles in Experimental Design*, second edition, McGraw-Hill, traditional repeated-measures framework.

**Reading priority for DA2451:** First master Chapters 1–12 here, then the source's iris results (pp. 7–14), then Chapters 13–18 here and the source's repeated-measures output (pp. 20–29). Read equations (4) and (5) from the source when studying general hypotheses: **$\mathbf L$ identifies the coefficient contrasts; $\mathbf P$ identifies the response contrasts.** That relationship unifies almost every technique demonstrated in the appendix.

---

### Final conceptual checkpoint

If you can explain the following paragraph in your own words, you have learned the appendix's central argument:

> A multivariate linear model predicts a **vector of outcomes** for each independent case using a common predictor design matrix. We can estimate its coefficient columns by familiar least squares. For joint tests, we compare hypothesis and residual **SSP matrices**, whose cross-products preserve information about covariance among outcomes. `Anova()` tests structured model terms, and `linearHypothesis()` tests specific coefficient contrasts. When outcomes are repeated measurements on the same person, a matrix $\mathbf P$ forms meaningful within-person contrasts, so the general null is $\mathbf L\mathbf B\mathbf P=\mathbf C$. The resulting test must be interpreted with its degrees of freedom, covariance assumptions and scientific context, not merely by whether a printed p-value is below 0.05.

**End of teaching book.**
