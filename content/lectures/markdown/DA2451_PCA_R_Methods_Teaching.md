# DA2451: Principal Component Analysis in R
## A complete beginner-to-practitioner teaching book on eigen-decomposition, singular value decomposition, and six PCA interfaces

**Core reference:** Gregory B. Anderson, *Principal Component Analysis in R: An Examination of the Different Functions and Methods to Perform PCA*, supplied as `PCA-R-2013.pdf` (16 pages).  
**Course context:** DA2451, Multivariate Methods in Business.  
**Scope:** The entire supplied reference, including its normality discussion, both comparison tables, six PCA functions, the decathlon diagnostic figure, the custom `exam.norm()` and `PC()` functions, and the simulation in Appendix D.  
**Editorial approach:** Retain the author's reported findings and historical code choices, but identify errors explicitly and supply distinguished, corrected teaching examples. This book is an *independent explanation*, not a replacement transcript of the PDF.

> **Important about verification.** The PDF has been examined across all 16 pages, including graphical and tabular pages. Current R documentation was consulted for the functions and packages. The worked two-variable example was independently checked numerically. A local R interpreter was not available when this book was prepared, so no claim is made that the complete R scripts were executed under a specific R/package combination. The executable examples use documented interfaces, and optional-package output should be checked against the installed package version.

### How to navigate this book

- **[SOURCE, p. N]** identifies a claim, function, example, or result actually presented by Anderson on PDF page N.
- **[TEACHING EXTENSION]** marks a new analogy, derivation, classroom example, or exercise introduced solely to help learning. Its numbers are **not** Anderson's.
- **[CORRECTION]** identifies an error or ambiguity in the original PDF/code, with an explained remedy.
- **[MODERN R]** identifies current interface information or safer workflow advice, not represented as the author's original instruction.

The natural progression is **intuition → statistical foundations → linear algebra → one fully calculated PCA → R basics → the six functions → normality/visualization → cross-method validation → source-code audit → practical projects and exam revision**. The code initially uses only base R and the recommended `stats` package, which ships with R. Optional libraries are introduced afterward.

---

# Part I. Understand what PCA is trying to do

## 1. Why PCA exists [SOURCE, p. 1]

Imagine a company that records customers' monthly purchases, visit frequency, average basket size, number of transactions, and total spending. Several measurements are telling similar stories. A customer who shops frequently may also have many transactions and high spending. Instead of giving an analyst five overlapping numbers, could we summarize much of the information in one or two new measurements?

**Principal component analysis (PCA)** is a systematic way to create new numeric variables that describe important patterns of variation in several original numeric variables. Anderson identifies three defining properties of the new variables:

1. Each component is a **linear combination** of original variables.
2. Different components are **uncorrelated** with each other in the data used to fit the PCA.
3. Components are ranked by how much variance they explain, with PC1 explaining the most, then PC2 explaining the most of what remains under the orthogonality constraint, and so on.

These are not arbitrary weighted averages. PCA chooses special coefficients, subject to mathematical constraints. It changes the coordinate system so that the first new axis is directed along the greatest spread in the observations. If the first few axes account for most of the spread, we can represent the data using fewer numbers.

**Five distinctions that prevent confusion:**

- **Dimension reduction** means retaining fewer axes, not deleting the original dataset from existence.
- **Large variance** does not automatically mean **causal importance**, statistical significance, or usefulness for predicting an outcome.
- **Uncorrelated** is not generally the same as **statistically independent**.
- The components are calculated without a target/outcome variable: standard PCA is **unsupervised**.
- PCA can be informative even when the original variables are not strongly correlated; in such cases, however, compression may be weak.

### When PCA can help

The source highlights strongly correlated variables and situations with many explanatory variables relative to observations [p. 1]. Business uses include reducing a questionnaire with overlapping items, creating a few descriptive performance axes, exploring segmentation data before clustering, addressing some forms of multicollinearity in regression, and visualizing multi-indicator observations.

PCA does **not** guarantee that reducing dimensions improves a downstream model. A low-variance direction can sometimes contain important predictive information. Retaining PCs should therefore consider the research goal and, for prediction tasks, out-of-sample validation.

## 2. What the dataset looks like

A typical numerical dataset is arranged in a matrix

$$
X=\begin{bmatrix}
x_{11}&x_{12}&\cdots&x_{1p}\\
x_{21}&x_{22}&\cdots&x_{2p}\\
\vdots&\vdots&\ddots&\vdots\\
x_{n1}&x_{n2}&\cdots&x_{np}
\end{bmatrix},
$$

where **n** is the number of observations (rows), **p** is the number of variables (columns), and $x_{ij}$ is the value of variable $j$ for observation $i$.

For 100 customers and 5 measures, $X$ has **100 rows × 5 columns**. An ordinary PCA has at most 5 axes and may have fewer nonzero-variance axes if variables are linearly dependent or if sample size constrains rank. Later we will see why a centered matrix has at most $\min(n-1,p)$ nonzero singular directions.

### A tiny example [TEACHING EXTENSION]

| Customer | Visits | Transactions |
|---|---:|---:|
| A | 1 | 1 |
| B | 2 | 3 |
| C | 3 | 2 |
| D | 4 | 4 |

We can already see that the two variables tend to move together. The values were deliberately chosen to support a transparent, exact calculation in Chapter 10. They **do not** occur in Anderson's PDF.

## 3. Mean, deviation, variance, and standard deviation

The **mean** is an ordinary average:

$$\bar{x}=\frac{1}{n}\sum_{i=1}^n x_i.$$

If values are $1,2,3,4$, the mean is $2.5$. A **deviation** is the distance from the mean, with a sign: $x_i-\bar{x}$. The deviations are $-1.5,-0.5,0.5,1.5$.

The **sample variance** measures squared spread around the mean:

$$s_x^2=\frac{\sum_{i=1}^{n}(x_i-\bar{x})^2}{n-1}.$$

For our four values, the numerator is $2.25+0.25+0.25+2.25=5$, so $s_x^2=5/3\approx1.6667$. The **sample standard deviation** is its positive square root:

$$s_x=\sqrt{s_x^2}=\sqrt{5/3}\approx1.2910.$$

Why square the differences? Without squaring, positive and negative deviations cancel. Why the square root? It returns the spread to the original variable's units. PCA uses variance as its mathematical measure of spread.

**Denominator alert:** R's `var()` and `cov()` use $n-1$, while the default covariance-based `princomp()` convention uses $n$. The distinction will matter later. Neither choice should be silently substituted for the other.

## 4. Covariance and correlation

**Covariance** describes whether two variables move above and below their means together:

$$\operatorname{Cov}(x,y)=\frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar{x})(y_i-\bar{y}).$$

- Positive covariance: above-average values of one tend to accompany above-average values of the other.
- Negative covariance: above-average values of one tend to accompany below-average values of the other.
- Around zero: little **linear** relationship is indicated; a nonlinear association may still exist.

The size of covariance depends on measurement units. **Pearson correlation** removes those units:

$$r_{xy}=\frac{\operatorname{Cov}(x,y)}{s_xs_y},\qquad -1\le r_{xy}\le1.$$

For example, $r=0.8$ means a strong positive *linear* association, not that 80% of one variable is caused by the other. Correlation matrices contain $1$ down the diagonal because each nonconstant variable is perfectly correlated with itself.

### Covariance and correlation matrices

For three variables, the **covariance matrix** is

$$S=\begin{bmatrix}
s_1^2&s_{12}&s_{13}\\
s_{12}&s_2^2&s_{23}\\
s_{13}&s_{23}&s_3^2
\end{bmatrix},$$

and the **correlation matrix** has the same layout with $1$s on its diagonal and correlations off the diagonal. These matrices are symmetric: the entry in row 1, column 2 equals the entry in row 2, column 1.

Anderson's `eigen(cov(X))` and `eigen(cor(X))` [p. 3] begin from these two different descriptions of variability and therefore may produce different directions.

## 5. Centering and standardizing

**Centering** means subtracting the variable's mean:

$$x_{ij}^{(c)}=x_{ij}-\bar{x}_j.$$

The transformed column has average zero. It still has its old variance and original unit.

**Standardizing (z-scoring)** goes further:

$$z_{ij}=\frac{x_{ij}-\bar{x}_j}{s_j}.$$

After sample standardization, each nonconstant column has sample mean $0$ and sample standard deviation $1$.

| Operation | Subtract mean? | Divide by SD? | Typical PCA meaning |
|---|---|---|---|
| Raw data | No | No | Not normally used for conventional PCA unless explicitly desired |
| Center only | Yes | No | Covariance-based PCA |
| Center and standardize | Yes | Yes | Correlation-based PCA |
| Scale without centering | No | Yes | Possible mathematically, but *not* equivalent to correlation PCA |

Why choose? Consider **annual income in rupees** and **satisfaction on a 1–5 scale**. Their numeric variances may differ enormously because of units. Covariance PCA could be dominated by income. Standardizing gives each original variable unit sample variance and places the analysis on relative rather than absolute spread. Conversely, if all measures have the same units and their different spreads are substantively important, covariance PCA may make more sense.

**Key equivalence:** With ordinary complete numeric data, $\operatorname{Cov}(Z)=\operatorname{Cor}(X)$ when $Z$ is created using sample z-scores. Thus:

```r
Z <- scale(X, center = TRUE, scale = TRUE)
all.equal(cov(Z), cor(X))
```

The result should indicate equality within numerical tolerance.

## 6. Linear combinations: how new variables are built

A new variable can combine original ones:

$$\text{PC1}=a_1Z_1+a_2Z_2+\cdots+a_pZ_p.$$

The $a$ values are the coefficients or weights. They are not supplied by the student; PCA estimates them. For one observation, the PC1 **score** is the numeric result of substituting that observation's $Z_1,\ldots,Z_p$ values into the formula.

If PC1 is $0.7071Z_1+0.7071Z_2$, an observation with $(Z_1,Z_2)=(1,2)$ scores approximately $2.1213$. A different component could use $0.7071Z_1-0.7071Z_2$, giving approximately $-0.7071$. One measures a **common movement** of the two variables, while the other measures their **contrast**. These are pedagogical coefficients, not estimates from the PDF.

## 7. Geometry: directions, vectors, and orthogonality

Imagine every observation as a point in a two-dimensional scatterplot. A vector is an arrow specifying direction, such as $(1,1)$ for the diagonal running from bottom-left to top-right. PCA rotates the axes toward directions of greatest spread.

The **length** of vector $v=(v_1,\ldots,v_p)$ is

$$\lVert v\rVert=\sqrt{\sum_jv_j^2}.$$

A **unit vector** has length 1. The **dot product** of two vectors is $a^\top b=\sum_ja_jb_j$. If two nonzero vectors have dot product 0, they are **orthogonal**, meaning perpendicular in ordinary Euclidean geometry.

PCA component directions are constrained to be orthonormal: each direction has length 1, and different directions are perpendicular:

$$v_j^\top v_k=\begin{cases}1&j=k,\\0&j\ne k.\end{cases}$$

The perpendicularity is a property of **directions**. The fact that scores are uncorrelated arises when those directions diagonalize the symmetric covariance/correlation matrix used to calculate PCA. In a sample, scores from an ordinary centered PCA have covariance zero off the diagonal, apart from floating-point rounding.

## 8. Eigenvalues and eigenvectors without mystery

A square matrix $S$ represents a transformation. An **eigenvector** $v$ is a special direction that, under that transformation, stays on the same line:

$$Sv=\lambda v.$$

The number $\lambda$ is its **eigenvalue**. In PCA, $S$ is a symmetric covariance or correlation matrix, the eigenvectors point along the new axes, and the corresponding eigenvalues equal the variances of the scores along those axes.

For example, if $Sv=3v$, that direction is associated with eigenvalue 3, and the component measured along it has variance 3 under the matching covariance convention.

**Do not mix up the roles:**

- Eigen**vector**: a *direction* and set of coefficients.
- Eigen**value**: how much variance lies in that direction.
- Component **score**: an observation's location along that direction.
- Component **standard deviation**: $\sqrt{\text{eigenvalue}}$.

An eigenvector can be multiplied by $-1$ without changing its meaning: $v$ and $-v$ describe the same axis. Consequently, corresponding scores can also flip sign. This will be crucial when comparing R functions.

## 9. Explained variance, cumulative variance, and choosing components

If a PCA has eigenvalues $\lambda_1,\ldots,\lambda_p$, ordered from largest to smallest, the explained-variance **proportion** of PC $j$ is

$$q_j=\frac{\lambda_j}{\sum_k\lambda_k},$$

and its percentage is $100q_j\%$. Cumulative explained variance through the first $m$ PCs is

$$Q_m=\sum_{j=1}^{m}q_j.$$

If three eigenvalues are $5,3,2$, the total is 10. PC1 explains 50%, PC2 explains 30%, PC3 explains 20%; retaining PC1 and PC2 gives 80% cumulative. These values are **illustrations**, not reported Anderson results.

Common ways to decide how many to retain:

1. **Scree plot:** look for an elbow where extra components add little.
2. **Cumulative variance:** choose a defensible retention target, such as 80% or 90%, appropriate to the problem, not a universal law.
3. **Interpretability:** choose components that can be meaningfully explained.
4. **Kaiser >1 rule:** sometimes used for correlation PCA, but unreliable as a universal selection rule.
5. **Validation:** for reconstruction or downstream modeling, judge performance on observations not used to select the components.

The source includes scree plots and a biplot in Appendix C [pp. 13–14]; the choice of how many PCs to retain is broader applied guidance.

---

# Part II. One complete PCA worked from first principles

## 10. The entire two-variable calculation [TEACHING EXTENSION]

Return to the four-observation table:

$$X=\begin{bmatrix}1&1\\2&3\\3&2\\4&4\end{bmatrix}.$$

### Step 1: Calculate the column means

Both means are $(1+2+3+4)/4=2.5$.

### Step 2: Subtract the means

$$X_c=\begin{bmatrix}-1.5&-1.5\\-0.5&0.5\\0.5&-0.5\\1.5&1.5\end{bmatrix}.$$

### Step 3: Calculate the sample covariance matrix

The first variance is $(2.25+0.25+0.25+2.25)/3=5/3$. The second has the same value. The cross-products are $2.25,-0.25,-0.25,2.25$, summing to $4$, so the covariance is $4/3$. Therefore:

$$S=\operatorname{Cov}(X)=\begin{bmatrix}5/3&4/3\\4/3&5/3\end{bmatrix}.$$

### Step 4: Find the eigenvalues

A two-by-two symmetric matrix with equal diagonal entries $a$ and off-diagonal entries $b$ has eigenvalues $a+b$ and $a-b$. Here:

$$\lambda_1=\frac53+\frac43=3,\qquad
\lambda_2=\frac53-\frac43=\frac13.$$

### Step 5: Find the unit eigenvectors

One valid choice is

$$v_1=\frac1{\sqrt2}\begin{bmatrix}1\\1\end{bmatrix},\qquad
v_2=\frac1{\sqrt2}\begin{bmatrix}1\\-1\end{bmatrix}.$$

They each have length 1 and their dot product is zero. A software package may return the negative of either vector; that is still correct.

### Step 6: Form scores

$$T=X_cV,\qquad V=[v_1\ v_2].$$

For the first row $(-1.5,-1.5)$:

$$t_{11}=\frac{-1.5-1.5}{\sqrt2}=\frac{-3}{\sqrt2}\approx-2.1213,$$

$$t_{12}=\frac{-1.5+1.5}{\sqrt2}=0.$$

The complete scores, for our chosen eigenvector signs, are

$$T=\begin{bmatrix}
-3/\sqrt2&0\\
0&-1/\sqrt2\\
0&1/\sqrt2\\
3/\sqrt2&0
\end{bmatrix}.$$

### Step 7: Check the new variances

PC1 scores are $(-2.1213,0,0,2.1213)$, giving sample variance $3$. PC2 scores are $(0,-0.7071,0.7071,0)$, giving sample variance $1/3$. These match the eigenvalues exactly.

### Step 8: Decide whether to keep PC2

Total sample variance is $3+1/3=10/3$. Therefore:

$$q_1=\frac3{10/3}=0.90=90\%,\qquad q_2=10\%.$$

Keeping just PC1 retains **90% of the total covariance-based sample variance** for this particular example. That is considerable compression: two original columns are represented with one score per observation, though some information is lost.

### Step 9: What if we use correlation PCA instead?

Each original column's sample SD is $\sqrt{5/3}$. Standardizing produces a correlation matrix

$$R=\begin{bmatrix}1&0.8\\0.8&1\end{bmatrix}.$$

Its eigenvalues are $1.8$ and $0.2$; its eigenvectors point in the same directions here because both variables had equal variance. Explained variance remains 90% and 10%. This agreement of *directions* and *percentages* is a feature of **this symmetric example**, not a general guarantee for covariance and correlation PCA.

## 11. Reproduce the example in R

Open R, RStudio, Positron, or another R-enabled editor. Create a script file, paste the following complete block, and run it. In RStudio you can run a selected line with **Ctrl+Enter**; using **Source** runs the full script. The script needs no downloaded data and no add-on packages.

```r
X <- matrix(
  c(1, 1,
    2, 3,
    3, 2,
    4, 4),
  nrow = 4,
  byrow = TRUE
)
colnames(X) <- c("Visits", "Transactions")
rownames(X) <- c("A", "B", "C", "D")

colMeans(X)                   # Both 2.5
cov(X)                        # Covariance matrix
cor(X)                        # Correlation matrix

E <- eigen(cov(X))
E$values                      # Approximately 3 and 1/3
E$vectors                     # Unit eigenvectors, possibly sign-reversed

Xc <- scale(X, center = TRUE, scale = FALSE)
scores_eigen <- Xc %*% E$vectors
scores_eigen
cov(scores_eigen)             # Approximately diagonal: 3 and 1/3

pca_svd <- prcomp(X, center = TRUE, scale. = FALSE)
pca_svd$sdev^2                # The same two eigenvalues
pca_svd$rotation              # Compare directions, allowing for sign
pca_svd$x                     # Scores, allowing for sign
summary(pca_svd)              # 90% and 10% variance proportions

# Check numerical equivalence of the eigenvalues.
stopifnot(isTRUE(all.equal(E$values, pca_svd$sdev^2)))
```

If your score matrix differs by a negative sign, do not panic. For example, $(-2.1213,0,0,2.1213)$ and $(2.1213,0,0,-2.1213)$ represent the **same PC axis oriented in opposite directions**.

### Reading the R syntax

| Expression | Beginner interpretation |
|---|---|
| `X <- ...` | Store a result in the named object `X` |
| `matrix(...)` | Arrange numbers into rows and columns |
| `byrow = TRUE` | Fill the matrix row by row |
| `X[1, 2]` | First row, second column |
| `X[, 1]` | Every row, first column: a whole variable |
| `X[1, ]` | First row, every column: a whole observation |
| `nrow(X)`, `ncol(X)` | Count rows and columns |
| `colMeans(X)` | Mean of each variable |
| `cov(X)`, `cor(X)` | Covariance and correlation matrices |
| `scale(X)` | Center and scale columns, by default |
| `Xc %*% E$vectors` | True matrix multiplication, not elementwise multiplication |
| `E$values` | Read the named `values` entry in an R list |
| `summary(pca_svd)` | Ask for a standard PCA overview |
| `# note` | A comment; R ignores it during execution |

**Common early error:** `%*%` is the matrix multiplication operator. A single `*` performs elementwise multiplication (with recycling rules), which is not the same calculation as the PC scores.

---

# Part III. Why there are two mathematical methods

## 12. Spectral decomposition: `eigen()` [SOURCE, pp. 1, 3–4]

In the source, spectral decomposition is also called **R-mode**, or eigendecomposition, PCA. Start with a covariance or correlation matrix and ask for its eigenvalues and eigenvectors.

For centered data $X_c$, define

$$S=\frac{X_c^\top X_c}{n-1}.$$

The eigendecomposition is

$$S=V\Lambda V^\top,$$

where the columns of $V$ are unit eigenvectors and $\Lambda$ is a diagonal matrix containing eigenvalues in descending order. The component scores are

$$T=X_cV.$$

The derivation of their variances is revealing:

$$\begin{aligned}
\operatorname{Cov}(T)
&=\frac{T^\top T}{n-1}\\
&=V^\top\left(\frac{X_c^\top X_c}{n-1}\right)V\\
&=V^\top SV\\
&=\Lambda.
\end{aligned}$$

That last line means **all different PCs are uncorrelated and the variance of each PC equals its eigenvalue**. This is the mathematical heart of PCA.

### Covariance versus correlation choice

Anderson gives the two central commands [p. 3]:

```r
E_cor <- eigen(cor(X))
E_cov <- eigen(cov(X))
```

They are both valid, but they do *different PCAs* if the variables have unequal variances. If you use `E_cor`, you must calculate scores from the **standardized** original data. If you use `E_cov`, calculate scores from the **centered but not standardized** data.

```r
scores_cor <- scale(X) %*% E_cor$vectors
scores_cov <- scale(X, center = TRUE, scale = FALSE) %*% E_cov$vectors
```

Using `X %*% E_cor$vectors` without matching centering/scaling leads to scores with different origins and possibly different variances from what the eigenvalues describe.

## 13. Singular value decomposition: `svd()` [SOURCE, pp. 1, 5]

**Singular value decomposition (SVD)** breaks a rectangular matrix into three pieces:

$$Z=UDV^\top.$$

Here $Z$ is the centered or standardized data matrix, $U$ contains **left singular vectors** (in observation space), $D$ has nonnegative **singular values** on its diagonal, and $V$ contains **right singular vectors** (in variable space).

A visual interpretation:

- $V$ says which *combinations of variables* define the directions.
- $D$ says how strongly the data spread along each direction.
- $U$ tells how the observations are arranged along those directions in normalized coordinates.

To connect SVD to PCA, multiply $Z^\top Z$:

$$\begin{aligned}
Z^\top Z
&=(UDV^\top)^\top(UDV^\top)\\
&=VDU^\top UDV^\top\\
&=VD^2V^\top.
\end{aligned}$$

For sample covariance PCA, divide by $n-1$:

$$S=V\left(\frac{D^2}{n-1}\right)V^\top.$$

So **the right singular vectors are covariance eigenvectors**, and

$$\boxed{\lambda_j=\frac{d_j^2}{n-1}},\qquad
\boxed{\mathrm{SD}(\mathrm{PC}_j)=\frac{d_j}{\sqrt{n-1}}}.$$

The scores satisfy

$$T=ZV=UD.$$

This establishes why `eigen()` and `svd()` can describe **the same PCA**, even though their computational starting points differ. The relationship is not an accidental empirical match. It follows algebraically when they use the **same preprocessing and covariance convention**.

### Why SVD is often preferred

If $Z$ is ill-conditioned, directly forming $Z^\top Z$ squares its singular-value condition number. SVD works on the data matrix without explicitly forming that product and is generally the more numerically reliable default. Current base R documentation specifically recommends the SVD-based route of `prcomp()` for this reason [MODERN R].

### Clarifying the source's R-mode/Q-mode wording

Anderson describes spectral decomposition as relationships among variables and SVD as a way of examining relationships among observations [p. 1]. That contrasts **variable-space** and **observation-space** formulations, which is useful intuition, but SVD is *not limited to* observation-space PCA. Its right singular vectors $V$ still provide the **variable component directions**. Computing from $ZZ^\top$ instead of $Z^\top Z$ is often called a dual or Q-mode construction, especially helpful when $p\gg n$. Both formulations are mathematically connected and should not be treated as contradictory scientific models.

### A two-variable SVD with exact numbers

For the teaching example, covariance eigenvalues were $3$ and $1/3$, with $n=4$. Thus

$$d_1=\sqrt{(4-1)\cdot3}=3,\qquad
d_2=\sqrt{(4-1)\cdot\frac13}=1.$$

This can be checked in R:

```r
Z <- scale(X, center = TRUE, scale = FALSE)
D <- svd(Z)
D$d                     # Approximately 3 and 1
D$d^2 / (nrow(Z) - 1)   # Approximately 3 and 1/3
Z %*% D$v               # Scores
D$u %*% diag(D$d)       # Same scores, up to numerical noise
```

### Non-square matrices and zero components

The number of singular values supplied is $\min(n,p)$. With centering, rank is at most $n-1$, so there can be **no more than $\min(n-1,p)$ nonzero PC directions**. If there are 30 customers and 100 features, most of the 100 possible covariance eigenvalues must be zero or numerically negligible. This is one reason SVD-based PCA is especially useful in high-dimensional settings.

---
# Part IV. The six PCA approaches in Anderson's paper

## 14. The `eigen()` function: transparent spectral PCA [SOURCE, pp. 3–4]

`eigen()` is an ordinary base R function for eigenvalues and eigenvectors of a square matrix. It is not a one-click PCA function: **you must** compute the appropriate covariance/correlation matrix, standardize consistently, calculate scores, and summarize variance yourself.

**Basic interface:**

```r
eigen(x, symmetric, only.values = FALSE)
```

Here `x` is the square matrix; `symmetric = TRUE` may be specified when known (covariance and correlation matrices are symmetric); `only.values = TRUE` requests eigenvalues without eigenvectors. The returned list normally has `$values` (ordered eigenvalues) and `$vectors` (columns are corresponding eigenvectors). `only.values = TRUE` means no useful vectors are returned.

**Complete correlation-based version:**

```r
X <- as.matrix(USArrests)                 # Built-in 50-row, 4-column example
Z <- scale(X, center = TRUE, scale = TRUE)
E <- eigen(cor(X), symmetric = TRUE)

lambda <- E$values
V <- E$vectors
T <- Z %*% V

proportion <- lambda / sum(lambda)
cumulative <- cumsum(proportion)
component_sd <- sqrt(lambda)

round(cbind(lambda, component_sd, proportion, cumulative), 4)
round(V, 4)
head(T)
```

What to inspect: `lambda[1]` is PC1's variance, `V[,1]` gives the combination defining PC1, `T[,1]` contains the PC1 scores for all 50 states, and `cumulative[2]` is the fraction of total standardized variance retained by the first two PCs.

If you prefer **covariance PCA**, change `Z` to `scale(X, center=TRUE, scale=FALSE)` and use `eigen(cov(X))`. Changing only one of those lines would make your score interpretation inconsistent.

### A manual reconstruction check

```r
# All components should reproduce the centered/standardized matrix.
Z_back <- T %*% t(V)
isTRUE(all.equal(unname(Z), unname(Z_back), check.attributes = FALSE))
```

The transpose `t(V)` reverses the rotation because $V^\top V=I$ for the complete orthonormal eigenvector matrix. This is a useful mechanical test that scores and loadings are being matched in the correct orientation.

### Corrections to the paper's hand calculations [SOURCE, p. 3]

The original manual script contains several evident defects:

| Historical expression or issue | Why it is wrong or risky | Correct replacement |
|---|---|---|
| `sdev=sqrt(eigenvectors)` | Takes elementwise square roots of *vectors*, which may contain negative values; component SDs come from eigen**values** | `sdev <- sqrt(eigenvalues)` |
| `cum.var[i]<-sum(prop.var[1,i])` | Invalid index shape for an ordinary vector; the printed line also lacks its closing brace | `cum.var[i] <- sum(prop.var[seq_len(i)])` |
| Separate loops computing variance of score columns | Can work, but are unnecessarily fragile and verbose | `prop.var <- eigenvalues / sum(eigenvalues)`; `cum.var <- cumsum(prop.var)` |
| A wrapper described as containing `colMeans(X)` | The printed Appendix C return list lacks a `center` entry | Explicitly return `center` if desired |
| Treating all numeric inaccuracies as harmless | Near-zero negative eigenvalues can occur from numerical noise in ill-conditioned problems | Check tolerance/rank rather than indiscriminately taking square roots |

The source also presents `PC(X, method="eigen", scaled=T, graph=F, rm.na=T, print.results=T)` [p. 3]. `PC` is **Anderson's custom function**, not part of standard R. Its intended outputs are explained in Chapter 22; a corrected replacement appears in Chapter 23.

## 15. The `princomp()` function: convenient spectral PCA [SOURCE, p. 4]

`stats::princomp()` packages the covariance/correlation eigendecomposition into a PCA object with methods for printing, plotting, and prediction. Unlike `eigen()`, it can accept the original data matrix directly.

```r
X <- as.matrix(USArrests)

pc_cor <- princomp(X, cor = TRUE)
pc_cov <- princomp(X, cor = FALSE)

pc_cor
summary(pc_cor)
head(pc_cor$scores)
unclass(pc_cor$loadings)   # Convert special 'loadings' print class to a plain matrix
pc_cor$sdev^2
screeplot(pc_cor, type = "lines")
```

### Most important arguments

| Argument | Meaning and practical use |
|---|---|
| `x` | Complete numeric data matrix or frame, observations by variables |
| `cor` | `TRUE` uses correlations; `FALSE` (default) uses covariance |
| `scores` | Calculate observation scores, default `TRUE` |
| `covmat` | Use a supplied covariance structure instead of calculating it from rows |
| `subset` | Select rows for fitting |
| `formula`, `data`, `na.action` | Available in the formula interface, e.g. `princomp(~ A + B, data = df)` |
| `fix_sign` | Current interface can orient signs by a deterministic convention; signs are still not substantively meaningful |

`predict(pc_cor, newdata=...)` is the relevant way to project compatible new observations. **`newdata` is not an argument used to fit an original `princomp(X, ...)` model**, despite its appearance in the source's generalized argument discussion.

### Understand its returned object

| Entry | Interpretation |
|---|---|
| `pc_cor$sdev` | SDs of the component scores |
| `pc_cor$sdev^2` | Eigenvalues / component variances |
| `pc_cor$loadings` | Eigenvectors: variable weights for component directions |
| `pc_cor$scores` | Individual observation coordinates on those directions |
| `pc_cor$center` | Variable centers applied in fitting |
| `pc_cor$scale` | Column scaling factors associated with the fit |
| `pc_cor$n.obs` | Number of observations used |
| `pc_cor$call` | Stored model call |

For some print methods, small loadings may be hidden *in printing only*. The underlying numeric values are still stored. This is why `unclass(pc_cor$loadings)` can be more revealing.

### The subtle denominator difference: `princomp()` versus `prcomp()`

This is a major point for fair comparisons and is confirmed in the current R documentation:

- `cov(X)` and centered `prcomp(X, scale.=FALSE)` conventionally use **$n-1$**.
- `princomp(X, cor=FALSE)` normally uses **$n$** for its covariance calculation.

For the same complete, centered observations, corresponding covariance eigenvalues are therefore related by

$$\lambda_{\texttt{princomp,cov}}
=\frac{n-1}{n}\,\lambda_{\texttt{prcomp,cov}}.$$

The eigenvector directions and PCA variance *percentages* normally agree, allowing for sign convention and small numerical error. Absolute eigenvalues and score standard deviations need not match. For correlation PCA, the normalization in the standardized correlations cancels this constant factor, so the **correlation eigenvalues** generally agree.

```r
X <- as.matrix(USArrests)
a <- prcomp(X, center = TRUE, scale. = FALSE)
b <- princomp(X, cor = FALSE)

n <- nrow(X)
cbind(
  prcomp_variance = a$sdev^2,
  princomp_variance = b$sdev^2,
  expected_princomp = (n - 1) / n * a$sdev^2
)
```

**[MODERN R]** `princomp()` requires at least as many observations as variables when fitted from a data matrix. For $p>n$, use `prcomp()` or an appropriate alternative.

## 16. The `svd()` function: transparent singular-value PCA [SOURCE, p. 5]

`svd()` directly decomposes the numerical data matrix. The most important caveat is that **`svd()` does not know that you want PCA**. It will decompose whatever numbers you give it, centered or not.

```r
X <- as.matrix(USArrests)
Z <- scale(X)                      # Mean zero, sample SD one
s <- svd(Z, nu = 0)

s$d                               # Singular values
s$v                               # PC directions (right singular vectors)
# s$u is not requested because nu = 0

lambda <- s$d^2 / (nrow(Z) - 1)
sdev <- s$d / sqrt(nrow(Z) - 1)
T <- Z %*% s$v
importance <- cbind(
  eigenvalue = lambda,
  sd = sdev,
  proportion = lambda / sum(lambda),
  cumulative = cumsum(lambda / sum(lambda))
)
round(importance, 4)
```

### Important arguments and returned pieces

- `x`: a numeric matrix. Base `svd()` expects a matrix-compatible numeric/complex object, not an arbitrary mixture of text and numeric columns.
- `nu`: how many **left singular vectors** to return. `nu=0` saves work/storage when only eigenvectors/eigenvalues/scores obtained via $ZV$ are needed.
- `nv`: how many **right singular vectors** to return. By default R returns the relevant set; for PCA you need enough columns of `$v` for the PCs you plan to inspect.
- `$d`: ordered singular values.
- `$v`: right singular vectors, the PCA coefficient directions.
- `$u`: left singular vectors, if requested.

Anderson correctly explains [p. 5] why `nu=0` is sufficient for his specific computation: scores can be calculated from `scale(X) %*% s$v`, so storing `u` is unnecessary. If instead you want the direct $UD$ score formula, request the left vectors.

```r
s_full <- svd(Z)
k <- length(s_full$d)
T_direct <- s_full$u[, seq_len(k), drop = FALSE] %*%
            diag(s_full$d, nrow = k)
T_from_V <- Z %*% s_full$v[, seq_len(k), drop = FALSE]
isTRUE(all.equal(unname(T_direct), unname(T_from_V)))
```

**[CORRECTION, p. 5]** The source's variable named `var <- nrow(X)-1` is a scalar **divisor**, not a statistical variance. It also masks the function name `var` in the reader's mental model. Call it `denominator` instead. The source's later loops use `var(scores[,i])`; R's function lookup can still locate the function despite a numeric object named `var`, but the naming is confusing and best avoided.

**[CORRECTION]** The source manually compares arrays of potentially different dimensions without consistently considering $n<p$. A robust implementation should retain the requested `k` columns and use `drop=FALSE` when subsetting matrices with just one component.

## 17. The `prcomp()` function: the practical default [SOURCE, pp. 5–6]

`stats::prcomp()` calculates PCA using **SVD** while handling centering and scaling for you. For a new student doing conventional PCA on a complete numeric data matrix, this is usually the clearest starting point. Current R documentation continues to recommend the underlying SVD approach for numerical accuracy.

```r
X <- as.matrix(USArrests)

pc_scaled <- prcomp(X, center = TRUE, scale. = TRUE)
pc_centered <- prcomp(X, center = TRUE, scale. = FALSE)

summary(pc_scaled)
head(pc_scaled$x)
pc_scaled$rotation
pc_scaled$sdev
pc_scaled$sdev^2
```

Anderson's historical examples use `prcomp(X, scale=T, tol=0)` and `prcomp(X, scale=F, tol=0)` [p. 6]. The explicit contemporary formal argument name is **`scale.`**, with a final dot; partial matching often makes `scale=` work, but `scale.=` is unambiguous and clearer. `center=TRUE` is the default; this book writes it explicitly to avoid hiding a crucial preprocessing decision.

### The important arguments

| Argument | Explanation |
|---|---|
| `x` | Numeric data matrix or frame; observations in rows |
| `center` | Usually `TRUE`, subtract means; can also provide a numeric center vector |
| `scale.` | Default `FALSE`; `TRUE` divides each centered column by its sample SD; can provide a scale vector |
| `retx` | Default `TRUE`, retain PC scores in `$x`; set to `FALSE` to omit them |
| `tol` | Relative threshold below which small components are omitted |
| `rank.` | Optional requested maximum number of components, useful for low-rank PCA |
| `formula`, `data`, `subset`, `na.action` | Part of the formula interface |

Prediction with new data is called through `predict(pc_scaled, newdata=...)`; it reuses the **training** center, scale, and rotation instead of refitting PCA. Never recompute the means of new data separately when applying an existing model.

### Read each output element

| Code | Meaning | Dimension in ordinary full-rank $n\times p$ PCA |
|---|---|---|
| `pc_scaled$sdev` | Component SDs | Up to $\min(n,p)$ numbers |
| `pc_scaled$sdev^2` | Component variances/eigenvalues | Same length |
| `pc_scaled$rotation` | Columns are unit component direction vectors | $p\times k$ |
| `pc_scaled$x` | Scores for the fitted observations | $n\times k$ |
| `pc_scaled$center` | Means (or supplied center values) | Length $p$ |
| `pc_scaled$scale` | Actual scale factors, not variances | Length $p$, or `FALSE` |
| `summary(pc_scaled)$importance` | Three-row table: SD, proportion, cumulative proportion | $3\times k$ |

The source mistakenly describes `prcomp$sdev` as **squared eigenvalues**, and `$scale` as **original variance** [p. 6]. **[CORRECTION]** `sdev` stores the *square roots* of eigenvalues; `$scale` holds the applied scaling factors (normally sample SDs), not column variances. The source also says the object has seven components but lists only five; exact stored components may vary by version and fitting method. Use `names(pc_scaled)` and `str(pc_scaled)` to inspect your own object rather than relying on a fixed count.

### How to read `summary()`

```r
summary(pc_scaled)$importance
summary(pc_scaled)$importance[2, ]  # Proportion of variance, fractions
summary(pc_scaled)$importance[3, ]  # Cumulative fractions
```

The first row is SD, **not eigenvalue**. The second row contains ordinary fractions (e.g., 0.60 means 60%). The third row cumulates them. To report eigenvalues, square `sdev`; to report percentages, multiply the proportion row by 100.

### Plot and interpret

```r
plot(pc_scaled, type = "lines", main = "Scree plot")
biplot(pc_scaled, scale = 0)
```

The scree plot shows component variances. The biplot attempts to place observations and variable arrows in a common two-dimensional view; the relative scaling of scores and arrows is controlled by plotting conventions, so **do not treat literal arrow lengths as unqualified raw regression coefficients**.

### Three things you should check before running `prcomp()`

1. All columns used for PCA must be numeric and represent appropriate measured variables.
2. For `scale.=TRUE`, a constant or zero-spread column cannot be standardized; remove or rethink it.
3. Default matrix fitting is not a missing-value imputation method. Explicitly handle missing observations and document the strategy.

## 18. `FactoMineR::PCA()`: interpretation, weights, and supplementary information [SOURCE, pp. 6–7]

Anderson next turns to **`PCA()`** from the *FactoMineR* package. Capitalization matters: this is different from both base `prcomp()` and *pcaMethods*' lowercase `pca()`.

**Install once**, if necessary, then load or explicitly namespace it:

```r
install.packages("FactoMineR")  # Run once, not every session
library(FactoMineR)

X <- as.data.frame(USArrests)
res_fm <- FactoMineR::PCA(X,
                         scale.unit = TRUE,
                         ncp = ncol(X),
                         graph = FALSE)
```

### The important arguments

| Argument | Purpose |
|---|---|
| `X` | Data frame containing the active numeric variables, with rows as individuals |
| `scale.unit` | `TRUE` performs unit-variance standardization; `FALSE` analyzes centered data without unit scaling |
| `ncp` | Number of component dimensions to **retain in the result objects** |
| `graph` | Display default PCA graphics when `TRUE`; `FALSE` suppresses automatic plots |
| `axes` | Which axes to display, e.g. `c(1,2)` |
| `row.w` | Optional weights on observations |
| `col.w` | Optional weights on variables |
| `ind.sup`, `quanti.sup`, `quali.sup` | Supplementary observations, quantitative variables, or qualitative variables to project/describe, rather than treating them all as active PCA variables |

The last three optional groups and the weighting controls are an important reason to choose FactoMineR. The source specifically mentions observation/variable weighting and richer plotting [p. 6]. Modern documentation explicitly describes supplementary elements and mean replacement of missing active quantitative values.

### Extract and interpret the results

```r
res_fm$eig                 # Eigenvalues, explained %, cumulative explained %
res_fm$eig[, 1]            # Eigenvalues
res_fm$eig[, 2]            # Explained-variance PERCENTAGES (0 to 100)
res_fm$eig[, 3]            # Cumulative PERCENTAGES

head(res_fm$ind$coord)     # Observation scores/coordinates
res_fm$var$coord           # Variable coordinates in component space
res_fm$var$cor             # Variable-component correlations, when present
res_fm$var$contrib         # Variable contributions to dimensions
res_fm$var$cos2            # Squared cosines: quality of representation

names(res_fm)
str(res_fm, max.level = 2)
```

**[CORRECTION to the source comparison table, p. 7]** The second and third columns of `$eig` are *percentages*, whereas `summary(prcomp())$importance[2:3, ]` contains *fractions*. To compare them on the same scale, **divide FactoMineR's `$eig[,2:3]` by 100**, or multiply the prcomp fractions by 100.

The paper notes `res_fm$svd$V` as the eigenvector directions and `res_fm$ind$coord` as scores [pp. 6–7]. Do not automatically assume every stored singular-value-related quantity is under the same $n-1$ normalization as base R; FactoMineR uses its own weighted-data conventions. This matters especially when comparing absolute scores and component SDs.

### How to interpret `contrib` and `cos2` [TEACHING EXTENSION]

A variable's **contribution** to PC1 answers: *How much does this variable contribute to constructing the first axis, relative to other active variables?* Contributions along a given axis are normally reported in percentages summing to approximately 100 over active variables.

A variable's **squared cosine** (`cos2`) answers a different question: *How well is that variable represented on a displayed axis or plane?* Large `cos2` means a stronger representation on those dimensions; it is not the same as contributing strongly to the axis. For individuals, `ind$cos2` similarly measures quality of representation. These are descriptive interpretations, not p-values.

### A source-linked decathlon example

Appendix B plots the first three variables of a **41-observation decathlon dataset**: `100m`, `Long.jump`, and `Shot.put` [p. 12]. The following obtains a known contemporary copy from FactoMineR for teaching. The historical figure came from a version documented as available with *pcaMethods*, and this code should not be treated as proof that files in different package versions are byte-for-byte identical.

```r
library(FactoMineR)
data("decathlon", package = "FactoMineR")
X_dec <- decathlon[, c("100m", "Long.jump", "Shot.put")]

nrow(X_dec)       # 41 for this dataset
head(X_dec)

res_dec <- FactoMineR::PCA(X_dec, ncp = 3,
                          scale.unit = TRUE, graph = FALSE)
res_dec$eig
head(res_dec$ind$coord)
```

When using the full decathlon dataset, do **not** blindly feed ranks, total points, and the categorical competition identifier into ordinary active numeric PCA as if they were all ten event performance measurements. FactoMineR can distinguish supplementary quantitative and qualitative fields, as shown in its documentation.

## 19. `pcaMethods::pca()`: multiple PCA algorithms and missing data [SOURCE, pp. 6–8]

The sixth function is lowercase **`pca()`**, from the Bioconductor package *pcaMethods*. The package's distinctive feature is a common object/interface for several PCA methods, including methods intended to handle incomplete matrices.

### Installation and the SVD route

Bioconductor packages are installed through `BiocManager` rather than assumed to be ordinary CRAN installations:

```r
if (!requireNamespace("BiocManager", quietly = TRUE)) {
  install.packages("BiocManager")
}
BiocManager::install("pcaMethods")  # Run once, if needed

library(pcaMethods)
X <- as.matrix(USArrests)
res_pm <- pcaMethods::pca(X,
                         method = "svd",
                         scale = "uv",
                         center = TRUE,
                         nPcs = ncol(X))
```

For this package, `pca()` returns an **S4 object** (`pcaRes`). Unlike a typical list, named stored slots can be accessed using `@`:

```r
res_pm@sDev           # Component standard deviations
res_pm@sDev^2         # Corresponding component variances
res_pm@loadings       # Component loading directions
head(res_pm@scores)   # Observation scores
res_pm@center         # Variable means used for centering
res_pm@R2             # Proportion of variance explained
res_pm@R2cum          # Cumulative proportion

slotNames(res_pm)     # Inspect slots actually available
summary(res_pm)
```

The distinction is important: `res_pm@loadings` and `res_pm$loadings` are **not interchangeable**, because the class implements a different object system. The source emphasizes this point in Table 2 and its accompanying note [p. 7].

### Important arguments

| Argument | Use |
|---|---|
| `object` | Numeric matrix/data frame, observations in rows, variables in columns |
| `method` | Chosen algorithm, such as `"svd"`, `"nipals"`, `"bpca"`, `"ppca"`, or `"svdImpute"` when supported |
| `nPcs` | Number of components to estimate/retain |
| `scale` | `"uv"` unit variance, `"none"` no scaling, `"pareto"`, `"vector"`, or supported scale vector |
| `center` | Center data, or use supplied center vector |
| `completeObs` | Whether to store an estimated complete-observation matrix in the result |
| `subset` | Select variables for model fitting |
| `cv` | Optional cross-validation settings, including `"q2"` in documented interfaces |

### What the four scale choices mean

- `"none"`: centered data stay in original measurement units.
- `"uv"`: divide by a variable's SD, producing unit-variance standardization.
- `"pareto"`: divide by the square root of the SD, a weaker adjustment than unit-variance scaling.
- `"vector"`: divide by a vector-length norm, normalizing by each variable column's Euclidean length after the package's preprocessing conventions.

These transformations may create *different PCA results*. Do not compare `scale="pareto"` with `prcomp(scale.=TRUE)` as if they should have identical loadings. Anderson lists the alternatives in the original discussion [pp. 6–8], but the full conceptual explanation here is a teaching extension.

### Methods named in the source and how to think about them

| Method family | Idea | Missing-data perspective |
|---|---|---|
| Ordinary SVD, `"svd"` | Decompose the preprocessed numeric matrix | Best suited to complete data |
| NIPALS, `"nipals"` | Iteratively estimate one component at a time | May work with limited missingness |
| Bayesian PCA, `"bpca"` | Estimate components/imputations under a Bayesian statistical model | Designed for incomplete data in supported settings |
| Probabilistic PCA, `"ppca"` | Fit a probabilistic latent-variable model | Can accommodate incomplete data |
| `"svdImpute"` | Alternate estimation/imputation with SVD-based reconstruction | Iterative handling of missing cells |

The original also mentions **`mipals`** [p. 6]. That historical label should **not** be blindly passed as a current `method=` value: the verified contemporary `pca()` documentation enumerates `nipals`, `rnipals`, `bpca`, `ppca`, `svdImpute`, and `svd` among its documented choices. Check `pcaMethods::listPcaMethods()` on the installed version before choosing a string.

```r
pcaMethods::listPcaMethods()
```

Do not assume that probabilistic, Bayesian, or imputation methods always recover the true missing values, or that they are interchangeable. The missingness mechanism, the amount of missing data, model assumptions, and validation matter.

### A simple, separate missing-data demonstration [TEACHING EXTENSION]

```r
set.seed(42)
Y <- as.matrix(USArrests)
Y[1, 2] <- NA
Y[5, 4] <- NA

# Conventional prcomp() needs a deliberate missing-data strategy.
# A supported incomplete-data algorithm can be explored as follows:
if (requireNamespace("pcaMethods", quietly = TRUE)) {
  pm_missing <- pcaMethods::pca(
    Y, method = "nipals", nPcs = 2,
    scale = "uv", center = TRUE
  )
  print(pm_missing)
}
```

Here missing values are inserted **solely for demonstration**, not extracted from the source. Check warnings and method documentation before treating the output as reliable.

## 20. One-page comparison of the six approaches [SOURCE, Tables 1–2, pp. 4, 7]

| Function | Where it comes from | Core calculation | Main inputs | Loadings/directions | Scores | Eigenvalues |
|---|---|---|---|---|---|---|
| `eigen()` | base R | Eigendecomposition | `cor(X)` or `cov(X)` | `$vectors` | Calculate as transformed `X %*% vectors` | `$values` |
| `princomp()` | `stats` | Eigendecomposition | Original data, `cor=` | `$loadings` | `$scores` | `$sdev^2` |
| `svd()` | base R | SVD | Already centered/scaled matrix | `$v` | Calculate `Z %*% v`, or `U D` | `$d^2/(n-1)` for sample covariance PCA |
| `prcomp()` | `stats` | SVD | Original data, `center=`, `scale.=` | `$rotation` | `$x` | `$sdev^2` |
| `PCA()` | `FactoMineR` | SVD-related, weighted PCA framework | Data frame, `scale.unit=`, `ncp=` | `$svd$V` as identified in source | `$ind$coord` | `$eig[,1]` |
| `pca()` | `pcaMethods` | Selectable SVD or other algorithms | Matrix, `method=`, `scale=`, `nPcs=` | `@loadings` | `@scores` | `@sDev^2` |

### How to get the *explained variance* from each

| Function | Proportion, not percentage | Cumulative proportion |
|---|---|---|
| `eigen()` | `E$values / sum(E$values)` | `cumsum(E$values / sum(E$values))` |
| `princomp()` | `summary(model)$importance[2, ]` | `summary(model)$importance[3, ]` |
| `svd()` | `s$d^2 / sum(s$d^2)` | `cumsum(s$d^2 / sum(s$d^2))` |
| `prcomp()` | `summary(model)$importance[2, ]` | `summary(model)$importance[3, ]` |
| `FactoMineR::PCA()` | `model$eig[,2] / 100` | `model$eig[,3] / 100` |
| `pcaMethods::pca()` | `model@R2` | `model@R2cum` |

**Critical source-table clarification:** Anderson's Table 2 prints an incorrect reference for a `prcomp()` importance entry (it shows `summary(X)` and repeats row 3 for the proportion). The correct extraction is `summary(pc)$importance[2, ]` for proportions and `[3, ]` for cumulative proportions. The tables are highly useful as *maps of output locations*, not as automatically executable code; the object name `X` in a table may denote input data rather than an already fitted model.

### Which should a DA2451 student choose?

For ordinary, complete numeric data, use **`prcomp()`** as the default implementation and `eigen()` to understand the mathematics. Use `svd()` to verify the algebra. Use `princomp()` to recognize historical spectral implementations and denominator conventions. Choose **FactoMineR** for supplementary variables, weights, and richer interpretive output; choose **pcaMethods** when you specifically need its method families or missing-data tools. None of these is intrinsically a different scientific interpretation if applied to the same well-defined PCA problem with matched conventions.

---
# Part V. Diagnosing the data and interpreting PCA graphics

## 21. Normality: what Anderson checks and what PCA actually requires [SOURCE, pp. 1–3, 11–12]

Before describing PCA implementations, Anderson devotes an important section to normality. This is understandable because multivariate statistical courses often examine normality before applying methods derived under probabilistic assumptions. However, a distinction is essential:

**Ordinary descriptive/exploratory PCA does not mathematically require multivariate normality.** Covariance/correlation matrices can be calculated for non-normal data, and SVD exists for any suitable numeric matrix. Normality may matter when making particular inferential statements, using approximate sampling distributions, or making assumptions in **later analyses** of the scores. Anderson acknowledges that exploratory PCA is often robust to mild departures [pp. 1–2] but uses wording that can be misread as an unconditional normality requirement.

The original diagnostic framework has four elements:

1. **Univariate:** assess individual columns using Q–Q plots; optionally perform Shapiro–Wilk tests.
2. **Bivariate:** use pairwise scatterplots, optionally with histograms on the diagonal.
3. **Multivariate:** look at squared Mahalanobis distances and compare their distribution with an appropriate chi-square reference.
4. **A wrapper:** run chosen diagnostics from one `exam.norm()` call (Appendix A).

We will learn each tool before revisiting the author's exact code choices.

### 21.1 Univariate normal Q–Q plots [SOURCE, p. 2]

A normal distribution produces a familiar bell-shaped curve. A **normal Q–Q plot** asks whether the observed ordered values have approximately the same quantile pattern as a theoretical normal distribution. A near-straight trend supports approximate normality. Systematic curves, especially at the ends, suggest skewness, tails, or outliers.

The source shows this base-R code:

```r
qqnorm(X[, 1])
qqline(X[, 1])
```

`X[,1]` selects **all observations in variable 1**. `qqnorm()` draws the sample-vs-theory Q–Q plot. `qqline()` adds a reference line through selected sample quantiles. Do not interpret every small departure as decisive evidence against normality; visual judgments should consider sample size.

Run it on three columns:

```r
X <- as.matrix(USArrests)
oldpar <- par(mfrow = c(1, 3))
for (j in 1:3) {
  qqnorm(X[, j], main = colnames(X)[j])
  qqline(X[, j], col = "red")
}
par(oldpar)
```

`par(mfrow=c(1,3))` creates **one row and three plot spaces**, not three data rows. The `for` loop fills them one at a time. `par(oldpar)` restores the earlier layout.

### 21.2 `car::qqPlot()` and confidence bands [SOURCE, p. 2]

Anderson also uses `qqPlot()` from the *car* package for a more detailed display with confidence envelopes. The approach is still useful, but it is optional:

```r
# install.packages("car")  # Once, if necessary
X <- as.matrix(USArrests)

if (requireNamespace("car", quietly = TRUE)) {
  oldpar <- par(mfrow = c(1, 3))
  for (j in 1:3) {
    car::qqPlot(X[, j], main = colnames(X)[j])
  }
  par(oldpar)
}
```

**[CORRECTION]** The source's compact call `qqPlot(X[i], ylab=colnames(X)[i])` [p. 2] and Appendix A's `qqPlot(X[i],...)` [p. 11] are not reliable column-selection syntax. If `X` is a matrix, `X[i]` selects the $i$-th **single element** in column-major order. If `X` is a data frame, `X[i]` selects a one-column **data frame**, not the plain numeric vector expected by many plotting functions. Use `X[,i]` or, for a data frame, `X[[i]]`.

### 21.3 Shapiro–Wilk tests [SOURCE, pp. 2–3, 11]

The source's `univariate.test=TRUE` option calls `shapiro.test()` on each variable. The test states:

- Null hypothesis $H_0$: the observations are compatible with a normal distribution.
- Alternative $H_1$: the observations are not normally distributed.

The test returns a statistic $W$ and a p-value. At a conventional 5% threshold, `p < 0.05` means evidence against normality. `p >= 0.05` means the test did **not** find enough evidence to reject normality; it is **not** proof of normality. Large samples can detect unimportant departures; small samples may not have power to detect meaningful ones.

```r
X <- as.matrix(USArrests)
shapiro.test(X[, 1])

normality_tests <- lapply(seq_len(ncol(X)), function(j) {
  shapiro.test(X[, j])
})
names(normality_tests) <- colnames(X)
normality_tests
```

[MODERN R] The documented `shapiro.test()` requires **3–5000 non-missing observations** per test; a constant vector is inappropriate. Multiple tests across many columns increase the chance of at least one small p-value, and separate marginal normality tests do not prove joint multivariate normality.

### 21.4 Pairwise plots and histograms [SOURCE, pp. 2, 11]

A **scatterplot matrix** places each pair of variables on a separate panel:

```r
pairs(X)
```

This helps you detect roughly elliptical clouds, strong correlations, clusters, nonlinear patterns, and outliers. However, pairwise visual normality is not a complete mathematical test of **joint** multivariate normality.

Anderson's Appendix A uses a custom diagonal histogram panel. A cleaned-up standalone version:

```r
panel_hist <- function(x, ...) {
  user_limits <- par("usr")
  on.exit(par(usr = user_limits))
  par(usr = c(user_limits[1:2], 0, 1.5))
  h <- hist(x, plot = FALSE)
  widths <- length(h$breaks)
  heights <- h$counts / max(h$counts)
  rect(h$breaks[-widths], 0, h$breaks[-1], heights,
       col = "gray85", border = "white", ...)
}

pairs(X, diag.panel = panel_hist)
```

`hist(...,plot=FALSE)` **calculates** histogram breaks/counts without drawing a separate plot. `rect()` then draws bars into the diagonal panels. This illustrates how the author's wrapper customizes an otherwise ordinary `pairs()` plot [p. 11].

### 21.5 Mahalanobis distance: a multivariate idea [SOURCE, pp. 2, 11–12]

Euclidean distance ignores how variables are correlated. An observation far from the mean on a naturally high-variance axis may be less unusual than a smaller displacement along a tightly constrained axis. **Mahalanobis squared distance** accounts for the covariance structure:

$$D_i^2=(x_i-\bar{x})^\top S^{-1}(x_i-\bar{x}).$$

Translate the symbols:

- $x_i$: one observation's row vector.
- $\bar{x}$: vector of column means.
- $x_i-\bar{x}$: deviations from typical values.
- $S^{-1}$: inverse covariance matrix, adjusting for units and correlations.
- $D_i^2$: one combined number describing multivariate distance from the center.

Under a suitable multivariate normal reference, and subject to estimation effects, these distances can be compared **approximately** with chi-square quantiles having $p$ degrees of freedom. The author's `mahalanobis()` code explicitly calculates squared distances.

```r
X <- as.matrix(USArrests)
mu <- colMeans(X)
S <- cov(X)
D2 <- mahalanobis(X, center = mu, cov = S)

length(D2)                  # One distance per observation
head(D2)
summary(D2)
```

**Precondition:** The covariance matrix must be invertible for this ordinary calculation. If $p\ge n$ or the columns are linearly dependent, it may be singular. Removing redundant variables, using suitable regularization, or employing a principled high-dimensional method may be necessary.

### 21.6 The density and chi-square Q–Q plots [SOURCE, pp. 2, 11–12]

Anderson calls `density(D2,bw=.5)` followed by a Q–Q plot of observed $D_i^2$ against chi-square quantiles. A syntax-clean, base-R version is:

```r
X <- as.matrix(USArrests)
n <- nrow(X)
p <- ncol(X)
D2 <- mahalanobis(X, colMeans(X), cov(X))

oldpar <- par(mfrow = c(2, 1))
plot(density(D2, bw = 0.5),
     main = paste("Squared Mahalanobis distances: n =", n, ", p =", p),
     xlab = "Squared Mahalanobis distance")

qqplot(qchisq(ppoints(n), df = p), D2,
       xlab = "Theoretical chi-square quantiles",
       ylab = "Observed squared distances",
       main = "Mahalanobis chi-square Q-Q plot")
abline(0, 1, col = "gray50", lty = 2)
par(oldpar)
```

Let's decode the less familiar functions:

- `density(D2, bw=0.5)`: a smoothed estimate of the distribution of squared distances; `bw` controls smoothness and can materially affect the appearance.
- `ppoints(n)`: a sequence of probabilities appropriate for creating a Q–Q plot.
- `qchisq(...,df=p)`: the chi-square **quantile function**, translating probabilities to expected chi-square values.
- `qqplot(x,y)`: plots quantiles of one series against those of another.
- `abline(0,1)`: adds the diagonal $y=x$ reference.

**[CORRECTION to wording on p. 2]** Squared Mahalanobis distances under a multivariate-normal model are compared with a **chi-square-type** distribution; for small $p$ a chi-square density is right-skewed, **not normally bell-shaped**. The paper says the kernel density should resemble a normal curve, which is not the appropriate general diagnostic. Nor is a straight Q–Q pattern proof of multivariate normality, especially when the mean/covariance are estimated from the same data, affecting the exact reference distribution. Think of this as an **exploratory diagnostic**, not a formal exact test.

### 21.7 The source's identity check

The original code contains:

```r
stopifnot(mahalanobis(X, 0, diag(ncol(X))) == rowSums(X * X))
```

The underlying mathematical identity is correct:

$$D_i^2(x_i,\mathbf{0},I)=x_i^\top x_i=\sum_jx_{ij}^2.$$

But `==` compares floating-point values exactly, even though numerical routines may differ in their final bits. Prefer a tolerant comparison:

```r
a <- mahalanobis(X, center = rep(0, ncol(X)),
                 cov = diag(ncol(X)))
b <- rowSums(X^2)
stopifnot(isTRUE(all.equal(a, b, tolerance = 1e-10)))
```

This command validates a computational identity; **it is not itself a normality test**.

### 21.8 Read Appendix B's actual figure [SOURCE, p. 12]

The single graphical page in the PDF contains two labeled panels. It reports **$N=41$ and $p=3$**, using the first three columns of the decathlon example.

- **Panel (a), top:** three normal Q–Q plots labeled `100m`, `Long.jump`, and `Shot.put`. Data points are shown against a solid reference line, with dashed red envelopes. Several observations approach or depart from the envelope in the tails. The correct interpretation is to inspect approximate straightness and tail anomalies; the figure by itself does not report Shapiro p-values or certify all three variables as normal.
- **Panel (b), middle:** the density of *squared Mahalanobis distances*, visibly extending to the right with a tail. This shape is entirely plausible for nonnegative chi-square-related distances and should not be dismissed simply for being asymmetric.
- **Panel (b), bottom:** observed squared distances plotted against theoretical chi-square quantiles. Many points follow the reference reasonably closely, while discrepancies at the upper end deserve attention. The source does not attach an exact formal multivariate-normality p-value to this panel.

The figure is **not** a PCA score plot: it appears in the preliminary data-diagnostics section. It demonstrates why students should distinguish checking input-data structure from interpreting component scores.

### 21.9 A safe mini-checklist before PCA

Before fitting a real model, verify: variable meanings and units; observation/variable orientation; missing values; constant columns; impossible values and obvious data-entry errors; strong outliers; whether standardization is appropriate; and how much the scientific question depends on variance magnitudes. Normality plots may be relevant, but PCA should not be rejected automatically just because a Shapiro–Wilk test is significant.

---

# Part VI. The original appendices, made understandable

## 22. Appendix A: understand `exam.norm()` line by line [SOURCE, p. 11]

Anderson creates an `exam.norm()` convenience function with the historical signature:

```r
exam.norm <- function(X,
                      univariate = T,
                      univariate.test = F,
                      bivariate = F,
                      multivariate = T) {
  # Historical body appears on PDF page 11.
}
```

Its purpose is to wrap the normality procedures already explained. The defaults produce univariate plots **and** multivariate diagnostics. Bivariate plots and Shapiro–Wilk tests are optional. On page 2, the source shows a non-default call with `bivariate=T`:

```r
exam.norm(X, univariate=T, univariate.test=F,
          bivariate=T, multivariate=T)
```

Do **not** copy the abbreviated declaration above as a working function; it is deliberately a signature explanation. The complete historical function is in Appendix A of the original PDF, and a standalone corrected alternative follows below.

### What each original code block does

| Approximate lines on PDF p. 11 | What the author intends |
|---|---|
| `if(univariate==T) ...` | Select a plot layout based on how many variables are provided |
| `for(i in 1:(ncol(X))) ... qqPlot` | Produce a normal Q–Q plot per variable |
| `windows()` | Open another R plotting device in the author's Windows setup |
| `panel.hist <- function(x,...) ...` | Draw normalized histograms on the diagonal of a scatterplot matrix |
| `pairs(X,diag.panel=panel.hist)` | Produce a pairwise scatterplot with those diagonal plots |
| `mu <- colMeans(X); sig <- cov(X)` | Estimate multivariate center and covariance |
| `D2 <- mahalanobis(...)` | Calculate squared Mahalanobis distances |
| `density(D2)` and `qqplot(...)` | Visualize the squared-distance distribution and chi-square comparison |
| `if(univariate.test==T) ...` | Run `shapiro.test()` independently on each variable |
| `print(results)` | Present the named collection of test objects |

### Real issues in the historical implementation

**[CORRECTION]** Four practices should not be transferred unchanged to a modern teaching script:

1. `qqPlot(X[i])` has the column-selection problem explained in §21.2. Use `X[,i]`.
2. `windows()` is Windows-specific. Prefer normal RStudio/IDE plotting panes, or `dev.new()` if independent devices are intentionally desired and available.
3. The function does not robustly validate numeric input, missing data, singular covariance matrices, or the sample-size constraints of Shapiro–Wilk.
4. An exact floating-point `stopifnot(...==...)` may halt an otherwise valid diagnostic.

The source also displays code with long string literals spanning printed lines, which can be damaged by copy/paste from PDF. Reconstruct strings explicitly in an editor instead of assuming every PDF line break is intentional R source syntax.

### A complete replacement function [MODERN R, TEACHING EXTENSION]

This version emphasizes safety and portability over reproducing the historical plotting-device behavior. It produces the requested graphics in sequence in the active device/IDE and invisibly returns useful numerical diagnostics. It uses only base R.

```r
exam_norm_safe <- function(X,
                           univariate = TRUE,
                           univariate_test = FALSE,
                           bivariate = FALSE,
                           multivariate = TRUE) {
  X <- as.matrix(X)
  if (!is.numeric(X) || ncol(X) < 1L || nrow(X) < 3L) {
    stop("X must be a numeric matrix with >= 3 rows and >= 1 column.")
  }
  if (anyNA(X) || any(!is.finite(X))) {
    stop("Remove or explicitly handle missing/non-finite values first.")
  }
  if (!any(c(univariate, univariate_test, bivariate, multivariate))) {
    stop("Select at least one diagnostic.")
  }
  if (is.null(colnames(X))) {
    colnames(X) <- paste0("Variable", seq_len(ncol(X)))
  }

  if (univariate) {
    oldpar <- par(no.readonly = TRUE)
    nc <- min(3L, ncol(X))
    nr <- ceiling(ncol(X) / nc)
    par(mfrow = c(nr, nc))
    for (j in seq_len(ncol(X))) {
      qqnorm(X[, j], main = colnames(X)[j])
      qqline(X[, j], col = "red")
    }
    par(oldpar)
  }

  if (bivariate) {
    if (ncol(X) < 2L) {
      warning("Bivariate plot needs at least two variables.")
    } else {
      pairs(X, main = "Pairwise relationships")
    }
  }

  D2 <- NULL
  if (multivariate) {
    if (ncol(X) >= nrow(X)) {
      warning("Ordinary sample covariance may be singular: n <= p.")
    } else {
      S <- cov(X)
      if (qr(S)$rank < ncol(X)) {
        warning("Covariance is singular; Mahalanobis plots skipped.")
      } else {
        D2 <- mahalanobis(X, center = colMeans(X), cov = S)
        oldpar <- par(no.readonly = TRUE)
        par(mfrow = c(2, 1))
        plot(density(D2), main = "Squared Mahalanobis distances",
             xlab = "D squared")
        qqplot(qchisq(ppoints(nrow(X)), df = ncol(X)), D2,
               main = "Observed D squared versus chi-square quantiles",
               xlab = "Theoretical quantile", ylab = "Observed D squared")
        abline(0, 1, col = "gray50", lty = 2)
        par(oldpar)
      }
    }
  }

  tests <- NULL
  if (univariate_test) {
    tests <- lapply(seq_len(ncol(X)), function(j) {
      x <- X[, j]
      if (length(x) > 5000L || sd(x) == 0) {
        return("Shapiro test not suitable for this column")
      }
      shapiro.test(x)
    })
    names(tests) <- colnames(X)
    print(tests)
  }

  invisible(list(shapiro = tests, mahalanobis_squared = D2))
}

# Example calls:
exam_norm_safe(as.matrix(USArrests), univariate = TRUE,
               univariate_test = TRUE, bivariate = TRUE,
               multivariate = TRUE)
```

**Execution detail:** This function generates several plots; depending on the plotting frontend, the next plot may replace the previously displayed plot. In RStudio, use the Plots history navigation, or run each diagnostic section independently if you want to save and compare all panels. The numerical results returned invisibly can be captured:

```r
checks <- exam_norm_safe(as.matrix(USArrests),
                         univariate = FALSE,
                         univariate_test = TRUE,
                         bivariate = FALSE,
                         multivariate = TRUE)
head(checks$mahalanobis_squared)
```

This is a **new substitute**, not a claim that Anderson authored these improved guards or return values.

## 23. Appendix C: understand and repair Anderson's `PC()` wrapper [SOURCE, pp. 13–14]

Anderson's `PC()` is meant to standardize the many field names across two algorithms. He calls it with:

```r
PC(X, method = "eigen", scaled = T,
   graph = F, rm.na = T, print.results = T)

PC(X, method = "svd", scaled = T,
   graph = F, rm.na = T, print.results = T)
```

### What its arguments promise

| Argument | Original intent |
|---|---|
| `X` | Numeric original data, observations in rows |
| `method` | `"eigen"` for spectral PCA or `"svd"` for singular-value PCA |
| `scaled` | Use standardized versus centered original variables |
| `graph` | Show a two-component biplot and scree plot |
| `rm.na` | Delete rows with missing values (`TRUE`) or replace missing values by variable means (`FALSE`) |
| `print.results` | Print method description, missing-data warning, and importance table |

### Its intended return object

The PDF builds a list with `values`, `vectors`, `scores`, `importance`, and `sdev`. The `importance` table has rows called `Standard Deviation`, `Proportion of Variance`, and `Cumulative Proportion`, matching the structure of `summary(prcomp())$importance`. This common interface makes cross-method comparison easier.

### Critical review of the actual printed function

**[CORRECTION, p. 13] Undefined `center` in the SVD branch.** The original body contains a condition equivalent to:

```r
if (sum(scaled, center) > 1) { ... }
```

But the signature has **no `center` argument**, and no local variable with that name is defined. This can cause an object-not-found error, or depend accidentally on unrelated global state. The corrected design below makes centering explicit and applies a single preprocessing rule to both methods.

**[CORRECTION] Asymmetric preprocessing.** The eigen branch consistently centers (and optionally scales) while the SVD branch tries several combinations of centering/scaling. Comparing differently preprocessed data would not compare numerical algorithms fairly.

**[CORRECTION] Fragile missing-value replacement.** The original `rm.na=FALSE` fills blanks with column means. This is a real but limited imputation strategy: it can distort correlations, lower apparent variability, and misstate uncertainty. If an entire column is missing, even the mean is undefined. Prefer explicitly selected missing-data methods and record how many rows/cells were affected.

**[CORRECTION] No robust checks for zero variance or singularity.** `cor()` and `scale()` may fail or generate `NA`s when columns are constant. If $n<p$, the full covariance eigendecomposition and economy SVD can return different *numbers of stored columns* even though their nonzero directions still correspond.

**[CORRECTION] Special cases for plots.** A biplot of `[,1:2]` needs at least two computed components. The historical `windows()` call is OS-specific; it is not needed to establish the PCA calculations.

**One point that does *not* need correction:** Anderson's `screeplot(z, type='l')` can use the `screeplot.default` method because his list `z` actually contains a suitably named `$sdev` entry. It is not inherently invalid simply because `z` is not a `prcomp` object. The normal default scree plot expects that SD component. This distinction matters when auditing code carefully.

### Fully self-contained replacement: `PC_safe()`

This replacement provides the same central results in a reliable form. It deliberately renames `rm.na` to an explicit missing-data policy and uses consistent preprocessing for either algorithm. It does **not** pretend to be byte-for-byte identical to the historical wrapper.

```r
PC_safe <- function(X,
                    method = c("eigen", "svd"),
                    scaled = TRUE,
                    na_action = c("fail", "omit", "mean"),
                    graph = FALSE,
                    print_results = TRUE) {
  method <- match.arg(method)
  na_action <- match.arg(na_action)
  X <- as.matrix(X)

  if (!is.numeric(X) || length(dim(X)) != 2L) {
    stop("X must be a numeric matrix or numeric data frame.")
  }
  if (nrow(X) < 2L || ncol(X) < 1L) {
    stop("Need at least two rows and one numeric column.")
  }
  if (any(!is.finite(X[!is.na(X)]))) {
    stop("Non-finite values, other than NA, are not supported.")
  }

  missing_before <- sum(is.na(X))
  if (missing_before > 0L) {
    if (na_action == "fail") {
      stop("Missing values: select omit or mean deliberately.")
    } else if (na_action == "omit") {
      X <- X[complete.cases(X), , drop = FALSE]
    } else {
      for (j in seq_len(ncol(X))) {
        missing_j <- is.na(X[, j])
        if (all(missing_j)) {
          stop("Entire variable is missing; mean imputation impossible.")
        }
        X[missing_j, j] <- mean(X[, j], na.rm = TRUE)
      }
      warning("Mean imputation is a simple illustrative method, not a neutral fix.")
    }
  }

  if (nrow(X) < 2L) stop("Too few complete rows remain.")
  if (any(apply(X, 2, sd) == 0)) {
    if (scaled) stop("Cannot scale a constant variable.")
    warning("Constant variables create zero-variance directions.")
  }
  if (is.null(colnames(X))) {
    colnames(X) <- paste0("Variable", seq_len(ncol(X)))
  }

  original_center <- colMeans(X)
  Z <- scale(X, center = TRUE, scale = scaled)
  denominator <- nrow(Z) - 1

  if (method == "eigen") {
    decomp <- eigen(cov(Z), symmetric = TRUE)
    values <- decomp$values
    vectors <- decomp$vectors

    # Correct only tiny negative numerical artifacts, not major errors.
    threshold <- 100 * .Machine$double.eps *
                 max(1, max(abs(values)))
    if (any(values < -threshold)) {
      stop("Covariance eigendecomposition has unexpected negative values.")
    }
    values <- pmax(values, 0)
  } else {
    decomp <- svd(Z, nu = 0)
    values <- decomp$d^2 / denominator
    vectors <- decomp$v
  }

  if (sum(values) <= 0) {
    stop("No positive variation remains; PCA cannot explain any variance.")
  }
  sdev <- sqrt(values)
  scores <- Z %*% vectors
  pc_names <- paste0("PC", seq_along(values))
  colnames(vectors) <- pc_names
  colnames(scores) <- pc_names
  rownames(vectors) <- colnames(X)

  importance <- rbind(
    "Standard Deviation" = sdev,
    "Proportion of Variance" = values / sum(values),
    "Cumulative Proportion" = cumsum(values / sum(values))
  )
  colnames(importance) <- pc_names

  result <- list(
    values = values,
    vectors = vectors,
    scores = scores,
    importance = importance,
    sdev = sdev,
    center = original_center,
    scale = if (scaled) apply(X, 2, sd) else FALSE,
    n.obs = nrow(X),
    n.missing.original = missing_before,
    method = method
  )

  if (print_results) {
    cat("Method:", method, "| Observations:", nrow(X), "\n")
    print(round(importance, 4))
  }
  if (graph) {
    plot(seq_along(values), values, type = "b",
         xlab = "Principal component", ylab = "Eigenvalue",
         main = "Scree plot")
    if (ncol(scores) >= 2L) {
      biplot(scores[, 1:2, drop = FALSE],
             vectors[, 1:2, drop = FALSE],
             main = "PC1 and PC2 biplot")
    } else {
      warning("Biplot omitted because fewer than two PCs are available.")
    }
  }
  result
}

# Compare complete-data standardization using both algorithms.
X_demo <- as.matrix(USArrests)
A <- PC_safe(X_demo, method = "eigen", scaled = TRUE,
             print_results = FALSE)
B <- PC_safe(X_demo, method = "svd", scaled = TRUE,
             print_results = FALSE)

k <- length(B$values)
stopifnot(isTRUE(all.equal(A$values[seq_len(k)], B$values,
                           tolerance = 1e-9)))
A$importance
B$importance
```

### How to think about the `PC_safe()` structure

It first **validates the data**, then **handles missingness explicitly**, then **centers/scales once**, then calls either `eigen(cov(Z))` or `svd(Z)`. After that the common results are obtained from the same formulas, regardless of decomposition method. This separation is both easier to teach and much easier to debug than duplicating preprocessing inside each algorithm branch.

**Important limitation of this teaching wrapper:** `PC_safe()` is not a complete production-grade PCA package. It neither selects rank automatically, nor fits robust PCA, nor solves the statistical problem of missing-not-at-random data. It explicitly rejects datasets with no positive variance rather than interpreting meaningless explained-variance fractions. Its intended use is to **demonstrate matched preprocessing and two algorithms**, not to replace a mature statistical package.

---
# Part VII. The simulation study: what was reported and what its code really tests

## 24. Appendix D's experimental design [SOURCE, pp. 8–9, 15–16]

This is one of the most instructive parts of the entire reference because it illustrates the difference between **choosing a sensible research question** and **implementing a valid numerical comparison**.

Anderson wanted to know whether R's different PCA implementations produce materially different results in their eigenvalues, eigenvectors, and observation scores. According to the source:

- Each simulated dataset contains **5 variables** and **1,000 observations**.
- The experiment is repeated for **1,000 independently generated datasets**.
- The variable means are generated from normal draws; the correlation structure is randomly generated using **`clusterGeneration::rcorrmatrix()`**; observations are simulated using **`mvtnorm::rmvnorm()`**.
- Five approaches are compared initially: the custom `PC()` spectral/eigen route, `princomp()`, `prcomp()`, `FactoMineR::PCA()`, and `pcaMethods::pca()`.
- The second simulation compares only the custom eigen and SVD routes, intended to isolate algorithmic differences.
- Three kinds of outputs are collected: eigenvalues, the coefficient directions (eigenvectors/loadings), and scores.

The source supplies the **full 1000-repetition code** on pp. 15–16. Its declared arguments are `n.var=5`, `n.obs=1000`, and `n.reps=1000`. In the body, each iteration creates a simulated matrix, fits the five approaches, stores results in data frames/arrays, and assigns one mean discrepancy for each output type to a row of `results`.

### Step-by-step translation of its unfamiliar R lines

| Historical expression | What it does |
|---|---|
| `sim <- function(n.var=5,n.obs=1000,n.reps=1000){...}` | Defines a configurable simulation function |
| `results <- data.frame(matrix(numeric(0),n.reps,3))` | Allocates a three-column results holder |
| `for(h in 1:n.reps){...}` | Repeats data generation and analysis |
| `mu <- rnorm(n.var)` | Generates random means for the variables |
| `R <- rcorrmatrix(n.var,alphad=1)` | Creates a random correlation matrix using an additional package |
| `X <- rmvnorm(n=n.obs,mean=mu,sigma=R)` | Generates correlated multivariate-normal rows |
| `pc1 <- PC(data,scale=T,...)` | Uses the custom wrapper for spectral PCA; `scale` relies on partial argument matching to `scaled` |
| `pc2 <- prcomp(...)`, `pc3 <- princomp(...)` | Uses base R's two PCA interfaces |
| `pc4 <- PCA(...)`, `pc5 <- pca(...)` | Uses FactoMineR and pcaMethods |
| `eigenvalues <- data.frame(...)` | Places different methods' eigenvalues side by side |
| `ev <- array(0,dim=c(5,p,p))` | Makes a three-dimensional storage array: method × variable × component |
| `sc <- array(0,dim=c(5,n,p))` | Makes method × observation × component array |
| `results$Values[h] <- ...` | Saves a discrepancy summary for repetition `h` |

**Practical reproducibility caution:** The original Appendix D does not show a fixed random seed or specific package versions sufficient to reproduce identical random datasets today. The PDF's numbers are therefore **historical reported outputs**, not guaranteed contemporary results. The PDF source also contains the custom `PC()` issues identified in Chapter 23. Do not assume that copying the code into a current R installation will run unmodified.

## 25. The author's six reported numerical results [SOURCE, p. 9]

Preserving these values exactly is important for source fidelity. **No values in this table have been replaced or recomputed.**

| Comparison in the PDF | Mean difference: eigenvalues | Mean difference: eigenvectors | Mean difference: scores |
|---|---:|---:|---:|
| Five-function simulation | `-7.893972e-19` | `3.977917e-20` | `1.526186e-20` |
| Paired eigen-versus-SVD simulation | `-5.785100e-19` | `-9.761018e-20` | `-1.940833e-21` |

Scientific notation is compact: $10^{-19}$ is $0.0000000000000000001$. The reported numbers are astonishingly close to zero, and the source concludes that no major overall differences were observed [p. 9]. **We must preserve that as the author's conclusion while independently evaluating whether the metric supports it.**

## 26. A serious mathematical problem with the original comparison [CORRECTION, pp. 8, 15–16]

The code does **not** calculate a genuine mean absolute difference across methods. For eigenvalues, Appendix D uses the essence of:

```r
valuediff[i, j] <- eigenvalues[i, j] - rowMeans(eigenvalues)[i]
results$Values[h] <- mean(valuediff)
```

For any collection of $m$ numbers $a_1,\ldots,a_m$, define $\bar a=\sum a_j/m$. Then:

$$\sum_{j=1}^{m}(a_j-\bar a)
=\sum_ja_j-m\bar a
=0.$$

**The signed deviations from their own mean add to zero by definition**, regardless of how far apart the original values are. Averaging these deviations over all entries will return zero apart from floating-point rounding. Consequently, the near-zero eigenvalue result is **mathematically inevitable** under this construction and does **not** demonstrate that different implementations agree closely.

### The same problem in the vector and score comparisons

The author recognizes eigenvector sign ambiguity and first takes absolute values of the stored coefficients. But the code then subtracts the mean absolute coefficient and takes the ordinary **signed mean** of those resulting deviations:

```r
vectordiff[i, j, k] <- abs(ev[i, j, k]) -
                       mean(abs(ev[, j, k]))
results$Vectors[h] <- mean(vectordiff)
```

The values `abs(ev[i,j,k])` may still differ substantially. Yet their **centered signed deviations must again sum to zero** across methods at each fixed $j,k$. Exactly the same logic applies to `scorediff`. Thus all three reported average difference statistics tend to zero even if input outputs disagree materially.

The **negative** entries in the reported 'differences' table reinforce this diagnosis. A true *mean absolute error* cannot be negative.

### A one-minute demonstration [TEACHING EXTENSION]

```r
numbers <- c(1, 100, 10000)       # Clearly very different
mean(numbers - mean(numbers))     # Approximately zero by construction
mean(abs(numbers - mean(numbers))) # Large, genuinely measures dispersion
max(abs(numbers - mean(numbers)))  # Also large
```

If the first line is replaced with nearly identical numbers, the first *signed* mean remains near zero. It cannot distinguish agreement from disagreement.

**Interpretation discipline:** This finding does **not** prove that the R packages produce different underlying PCA solutions. With correctly matched preprocessing, conventional spectral PCA and SVD PCA are theoretically connected and typically yield highly similar numerical results. What it proves is that **the particular simulation statistic reported in Anderson's Appendix D cannot substantiate his empirical equivalence claim.** His main practical conclusion may still be broadly correct, but the presented experiment is not a valid test of it.

## 27. How to compare PCA implementations correctly

Three alignment problems need attention before computing differences.

### (a) Match the same analysis

Use the same rows, columns, missing-value decisions, centering, scaling, covariance denominator, and weighting rules. Otherwise you have chosen different mathematical problems. In particular, comparing `princomp(cor=FALSE)` and `prcomp(scale.=FALSE)` without adjusting the denominator would exaggerate a convention difference as an algorithm difference.

### (b) Resolve eigenvector sign ambiguity

If `v1=c(0.6,0.8)` and `v2=c(-0.6,-0.8)`, literal subtraction reports a large difference even though the axes are identical. One simple solution is to orient each candidate vector to have a **nonnegative dot product** with a reference direction:

$$s_j=\operatorname{sign}(v_{\text{ref},j}^\top v_{\text{new},j}),$$

then compare $v_{\text{ref},j}$ with $s_jv_{\text{new},j}$. Apply the **same sign** to its scores. Another valid sign-invariant comparison of individual directions uses $|v_{\text{ref},j}^\top v_{\text{new},j}|$, which is 1 for identical axes up to sign.

### (c) Handle repeated or near-repeated eigenvalues

If two eigenvalues are equal, the two corresponding eigenvectors are **not uniquely identified**. Algorithms may choose different orthonormal bases for the **same two-dimensional subspace**. Pairwise coefficient comparisons can then misleadingly report disagreement even when both algorithms agree on the subspace. Compare **projection matrices** such as $V_kV_k^\top$ or principal angles between subspaces rather than demanding the same individual vectors.

## 28. A genuinely informative comparison script [TEACHING EXTENSION]

The following code compares **`eigen()` with `svd()` on exactly the same standardized data**, aligns signs, and computes **nonnegative mean absolute errors**. It needs only base R. The two algorithms are expected to agree to numerical precision for well-behaved input, but the code makes that result something to **measure**, not something forced to zero by arithmetic.

```r
compare_eigen_svd <- function(X, standardize = TRUE) {
  X <- as.matrix(X)
  if (!is.numeric(X) || anyNA(X)) stop("Complete numeric X needed")
  if (nrow(X) <= ncol(X)) {
    stop("Use n > p here so all p component columns can be compared")
  }
  if (standardize && any(apply(X, 2, sd) == 0)) {
    stop("Constant columns cannot be standardized")
  }

  Z <- scale(X, center = TRUE, scale = standardize)
  E <- eigen(cov(Z), symmetric = TRUE)
  D <- svd(Z, nu = 0)
  k <- length(D$d)

  reference_V <- E$vectors[, seq_len(k), drop = FALSE]
  candidate_V <- D$v[, seq_len(k), drop = FALSE]
  orientation <- sign(colSums(reference_V * candidate_V))
  orientation[orientation == 0] <- 1
  candidate_V <- sweep(candidate_V, 2, orientation, `*`)

  eigen_values <- E$values[seq_len(k)]
  svd_values <- D$d^2 / (nrow(Z) - 1)
  score_A <- Z %*% reference_V
  score_B <- Z %*% candidate_V

  data.frame(
    eigenvalue_mae = mean(abs(eigen_values - svd_values)),
    eigenvector_mae = mean(abs(reference_V - candidate_V)),
    score_mae = mean(abs(score_A - score_B)),
    eigenvalue_max_error = max(abs(eigen_values - svd_values))
  )
}

compare_eigen_svd(as.matrix(USArrests), standardize = TRUE)
```

**Read the output:** Each returned statistic is nonnegative. A value near zero is meaningful here because we take the **absolute value of the actual difference**, rather than averaging deviations around their own mean. These errors still apply only when components can reasonably be matched one-to-one; near-degenerate eigenvalues require the subspace caveat in §27(c).

### Recreate the study's sample dimensions with a simple, portable generator

The next generator is a **new, reproducible analogue**, not a line-for-line replacement of Anderson's `clusterGeneration`/`mvtnorm` method. It produces random positive-definite correlation matrices and multivariate-normal observations using base R. Its values must not be presented as a reproduction of the exact 2013 paper results.

```r
random_correlation <- function(p) {
  A <- matrix(rnorm(p * p), nrow = p)
  S <- crossprod(A)                     # Positive semidefinite matrix
  scale_inv <- diag(1 / sqrt(diag(S)), nrow = p)
  scale_inv %*% S %*% scale_inv         # Correlation matrix
}

simulate_dataset <- function(n = 1000, p = 5) {
  R <- random_correlation(p)
  mu <- rnorm(p)
  raw <- matrix(rnorm(n * p), nrow = n)
  X <- raw %*% chol(R)                 # Correlated observations
  sweep(X, 2, mu, `+`)                 # Add column means
}

set.seed(2013)
one_dataset <- simulate_dataset(n = 1000, p = 5)
compare_eigen_svd(one_dataset)

# For 1,000 repetitions, run this only if you intentionally want the workload:
set.seed(2013)
n_reps <- 1000L
all_results <- do.call(rbind, lapply(seq_len(n_reps), function(i) {
  compare_eigen_svd(simulate_dataset(n = 1000, p = 5))
}))

colMeans(all_results)  # Mean of meaningful, nonnegative errors
apply(all_results, 2, max)
summary(all_results)
```

The first line `set.seed(2013)` makes the *new* simulation repeatable within the same R/random-generation conventions. The result is not made to equal Anderson's six numbers, because the purpose is to apply a **correct metric** and **matched preprocessing**, not to reproduce a flawed statistic.

### A second diagnostic: compare covariance matrices reconstructed from scores

```r
Z <- scale(as.matrix(USArrests))
E <- eigen(cov(Z), symmetric = TRUE)
T <- Z %*% E$vectors

round(cov(T), 8)                 # Almost diagonal
round(E$values, 8)              # Should match diagonal
all.equal(unname(diag(cov(T))), unname(E$values))
```

This verifies a structural property of PCA. It does not depend on comparing two software packages at all.

## 29. What can and cannot be concluded [SOURCE, p. 9]

Anderson's conclusion has two parts: R packages expose different output structures/features, and ordinary PCA results are broadly similar across computational approaches. The first claim is directly demonstrable from the interfaces. The second is **theoretically justified under matched settings**, but the source's reported near-zero simulation statistics **do not independently establish it**, because they are centered signed differences.

His caveat that differences may become more substantial with fewer observations and more variables is plausible in numerical terms: conditioning, rank, and estimation variability can worsen in high-dimensional settings. It should be interpreted as a **caution**, not as a quantified conclusion established by the study's flawed metric.

---

# Part VIII. A practical PCA workflow you can reuse

## 30. From raw business observations to defensible PCA

Here is a deliberately small business dataset with six branch offices and four numerical metrics. **All numbers in this chapter are newly constructed teaching data**. None is from Anderson's reference.

```r
branches <- data.frame(
  Branch = c("A", "B", "C", "D", "E", "F"),
  Revenue = c(120, 165, 150, 210, 180, 240),
  Customers = c(80, 112, 98, 138, 121, 158),
  Transactions = c(95, 133, 121, 170, 150, 188),
  Satisfaction = c(4.0, 4.2, 3.8, 4.6, 4.1, 4.4)
)

rownames(branches) <- branches$Branch
X_business <- branches[, -1, drop = FALSE]

str(X_business)
summary(X_business)
colSums(is.na(X_business))
apply(X_business, 2, sd)
cor(X_business)

fit <- prcomp(X_business, center = TRUE, scale. = TRUE)
summary(fit)
fit$rotation
fit$sdev^2
fit$x
```

### Step 1: Decide what variables mean

`Branch` is an identifier, not a numeric measurement. The other four fields describe activity and satisfaction. The first three have related operational meanings; satisfaction measures a different construct. We should not assume their PC weights are positive or negative without seeing the actual output.

### Step 2: Inspect the correlation structure

`cor(X_business)` reveals positive/negative linear patterns. A strong correlation between transactions and customers makes a common size/activity component plausible, but **plausible is not the same as computed**. Always inspect the loadings.

### Step 3: Choose standardization

Revenue and transactions have much larger numeric magnitudes than satisfaction. Correlation-based PCA is a sensible starting point, provided treating their standardized variation comparably matches the research purpose.

### Step 4: Interpret the first component

Read `fit$rotation[, 1]`. If revenue, customers, and transactions all have similar same-sign loadings in your actual output, you could cautiously label PC1 an **operating scale/activity** axis. If satisfaction has a different sign, or if PC1 is mainly driven by another pattern, change the narrative. **Name components from the estimated coefficients and original variable meanings, not from wishful thinking.**

A loading of `+0.60` means a positive coefficient for a variable in the component's **standardized linear combination**. It does *not* mean a 60% contribution to total explained variance and does not by itself prove that variable correlates with that PC by exactly 0.60.

### Step 5: Interpret branch scores

Read `fit$x`. An observation with a high PC1 score sits far in the positive direction of the PC1 axis; a low score lies opposite. The absolute sign is arbitrary, so if your software reverses all PC1 signs, the ranking direction reverses but the information is unchanged. A branch score is an index constructed for **these variables, this sample, and this preprocessing**; it is not a guaranteed measure of overall business success.

### Step 6: Decide how many components to retain

```r
v <- fit$sdev^2
pve <- v / sum(v)
result <- data.frame(
  PC = paste0("PC", seq_along(v)),
  Eigenvalue = v,
  Percentage = 100 * pve,
  Cumulative_percentage = 100 * cumsum(pve)
)
print(round(result[, -1], 2))

barplot(100 * pve, names.arg = result$PC,
        ylab = "Explained variance (%)", main = "Branch PCA")
plot(cumsum(pve), type = "b", ylim = c(0, 1),
     xlab = "Number of PCs", ylab = "Cumulative proportion")
abline(h = 0.80, lty = 2, col = "red")
```

That line at 0.80 marks a **candidate threshold**, not an official requirement of Anderson's paper. If you retain only one or two PCs, say how much variance is retained **from the printed output** and what information might have been lost.

### Step 7: Plot actual observations

```r
if (ncol(fit$x) >= 2L) {
  plot(fit$x[, 1], fit$x[, 2], pch = 19,
       xlab = "PC1 score", ylab = "PC2 score",
       main = "Branches in the first two PCs")
  text(fit$x[, 1], fit$x[, 2], labels = rownames(X_business),
       pos = 3, cex = 0.8)
}
```

A plot showing branches close together means they have similar projections in the displayed component space, **not necessarily** that all original variables match. A two-PC graph cannot show differences relegated to omitted PCs.

## 31. Interpret eigenvectors, loadings, and correlations correctly

The word **loading** is used in more than one convention across textbooks and software.

### Convention A: unit-vector coefficients

In `prcomp()$rotation`, the $j$-th vector $v_j$ is of unit length. These are the coefficients in the component score formula:

$$t_j=Zv_j.$$

Thus `rotation["Revenue", "PC1"]` is a weight in the standardized-variable combination, **not automatically the correlation between revenue and PC1**.

### Convention B: variable-component correlations

For correlation PCA with standardized original variables, the correlation between standardized variable $Z_k$ and score $t_j$ is

$$\operatorname{Cor}(Z_k,t_j)=\sqrt{\lambda_j}\,v_{kj}.$$

This follows because $\operatorname{Cov}(Z_k,t_j)=\lambda_jv_{kj}$, while SD($Z_k$)=1 and SD($t_j$)=$\sqrt{\lambda_j}$.

```r
fit <- prcomp(X_business, center = TRUE, scale. = TRUE)
correlation_loadings <- sweep(fit$rotation, 2, fit$sdev, `*`)
correlation_loadings

# Independent check on the fitted observations:
cor(scale(X_business), fit$x)
```

The two matrices should agree numerically for the matching retained PCs. In a report, **say which loading convention you mean**. FactoMineR's `$var$coord`/`$var$cor` are intended to make variable-axis relationships easier to visualize and interpret, but package-specific scaling conventions should still be checked against the documentation.

### What exactly is a biplot?

A biplot combines two kinds of marks:

- Points representing observations by their PC scores.
- Arrows or variable markers representing contributions/directions of original variables in the displayed PC plane.

A common reading: arrows pointing roughly the same way indicate variables that tend to associate positively in the displayed plane; roughly opposite arrows indicate negative association; approximately right-angle arrows suggest weaker projected linear association. However, arrows are **projections** and their interpretation depends on scaling and representation quality. PCA biplots are descriptive, not proofs of causality.

## 32. Component scores as inputs to later analysis

You may want to use a few PCs in regression, clustering, or visualization. That is reasonable when it is part of a carefully defined workflow.

### Predict new observations using the learned rotation

```r
fit <- prcomp(X_business, center = TRUE, scale. = TRUE)
new_branch <- data.frame(
  Revenue = 175,
  Customers = 115,
  Transactions = 140,
  Satisfaction = 4.3
)
new_scores <- predict(fit, newdata = new_branch)
new_scores
```

`predict()` uses **the training data's means, scaling factors, and fitted component directions**. This consistency is essential. Do not apply `prcomp(new_branch)` to one new row or standardize that new row using its own one-row standard deviation.

### Prevent data leakage when doing machine learning [TEACHING EXTENSION]

For prediction, split observations into training and test groups **before** estimating preprocessing and PCA. Fit the PCA only on training rows. Use `predict(fit, newdata=test_X)` to transform test rows. Select the number of components within the relevant training/validation workflow, rather than using future test information to decide how many PCs are best.

### Avoid a statistical misconception

Uncorrelated PC scores do **not** automatically satisfy every assumption of an eventual regression or classification model. You must still assess the downstream model's functional form, residual structure, target handling, and validation design. Normal original data are not strictly required to compute PCA.

## 33. Missing data, outliers, and dimension choice

### Missing data

| Strategy | What it does | Main risk |
|---|---|---|
| Complete-case analysis | Deletes every row with an `NA` in an active column | Can lose many observations or introduce selection bias |
| Mean imputation | Replaces missing entries with column means | Understates variance and distorts relationships |
| Iterative/model-based PCA | Estimates PCA structure with incomplete values | Relies on model assumptions and tuning; errors can be hard to diagnose |
| Multiple imputation / principled missingness model | Treats uncertainty and missingness more carefully | Requires additional statistical design and analysis |

Anderson's original `PC()` implements the first two strategies [p. 13]. *pcaMethods* supplies several algorithms motivated by the third [pp. 6–8]. Modern FactoMineR documentation notes automatic mean replacement in `PCA()`, which should be recognized rather than overlooked.

### Outliers

An unusually large observation can rotate covariance-based PCA directions because variance squares deviations. Inspect scatterplots, scores, influential cases, and variable distributions. If anomalous observations are legitimate, blindly dropping them may remove the very phenomenon the analysis should describe. If the problem demands resistance to outliers, consider a documented **robust PCA** method, which is an extension beyond Anderson's six ordinary function comparisons.

### Component count in a real project

A scree elbow and a cumulative-variance threshold are useful starting points, but **subject-matter meaning** and **out-of-sample utility** are usually more important than rote rules. If all variables have been standardized, the total variance in correlation PCA is $p$ (apart from rank and numerical considerations). The average eigenvalue is thus 1, which motivates the traditional Kaiser threshold in some settings; it does not make the rule universally optimal.

---
# Part IX. Debugging, examination technique, and consolidation

## 34. Common R errors and how to repair them

| What you see | What it usually means | Practical fix |
|---|---|---|
| `could not find function "PCA"` | FactoMineR has not been attached or installed | Use `FactoMineR::PCA(...)` after installation |
| `could not find function "pca"` | Bioconductor package missing/not loaded | Install using `BiocManager`, then `pcaMethods::pca(...)` |
| `object 'PC' not found` | The source's `PC` is a *custom* function, not base R | Define/source the full historical Appendix C, or use `PC_safe()` from this book |
| `object 'center' not found` inside `PC(...,method="svd")` | The source's historical SVD code references an undefined name | Use the corrected wrapper or `prcomp()` |
| `x must be numeric` or nonnumeric argument error | A factor/text/ID column was included, possibly via `as.matrix()` on mixed data | Select legitimate numeric variables intentionally before PCA |
| `cannot rescale a constant/zero column to unit variance` | A column has zero SD | Remove/rethink the constant column; do not just silence the warning |
| Missing-value error in `prcomp()` | Model fitting encountered `NA` or a non-finite numeric value | Inspect `colSums(is.na(X))`; select a documented treatment |
| `non-conformable arguments` with `%*%` | Matrix dimensions do not match | Compare `dim(Z)` and `dim(V)`; for $Z(n\times p)V(p\times k)$, inner sizes must equal $p$ |
| `subscript out of bounds` | Index refers to absent row/column/component | Inspect `dim()`, `colnames()` and selected `k`; use valid component indices |
| Scores show the same values with opposite signs | PCA axes are not uniquely oriented | Compare sign-aligned directions or use absolute dot products |
| `princomp()` fails for more columns than rows | Historical eigendecomposition interface imposes a data dimension constraint | Use SVD-based `prcomp()` |
| Two package percentages disagree by a factor of 100 | Fraction versus percentage convention | Check whether the output is in `[0,1]` or `[0,100]` |
| Some eigenvalues differ by $(n-1)/n$ | Different covariance denominators | Match/adjust `princomp`'s covariance convention |
| Long package-install errors | Dependency or version mismatch | Read the actual error, check package repository and your installed R version, and avoid inventing a package name |

### The fastest systematic debugging method

When results look strange, run these in order:

```r
class(X)
str(X)
dim(X)
colnames(X)
head(X)
colSums(is.na(X))
sapply(as.data.frame(X), is.numeric)
sapply(as.data.frame(X), function(v) sd(v, na.rm = TRUE))
```

Then inspect the fitted result:

```r
fit <- prcomp(X, center = TRUE, scale. = TRUE)
class(fit)
names(fit)
str(fit, max.level = 1)
summary(fit)
```

For `FactoMineR::PCA()` results, use `names()` and `str()`; for the S4 `pcaMethods` result, use `class()`, `slotNames()`, and methods documented for `pcaRes`.

## 35. A formula sheet you should be able to reconstruct

Let $X$ have $n$ observations and $p$ numeric variables. Define the centered matrix $X_c$ and, for correlation PCA, the standardized matrix $Z$.

| Idea | Formula | What it tells you |
|---|---|---|
| Center a value | $x_{ij}-\bar x_j$ | Deviation from the variable's mean |
| Standardize | $z_{ij}=(x_{ij}-\bar x_j)/s_j$ | Unit-free relative deviation |
| Sample covariance matrix | $S=X_c^\top X_c/(n-1)$ | Total linear spread/co-movement |
| Sample correlation matrix | $R=\operatorname{Cov}(Z)$ | Scale-free relationships |
| Eigen equation | $Sv_j=\lambda_jv_j$ | Direction and variance |
| Eigendecomposition | $S=V\Lambda V^\top$ | Represent covariance in PCA axes |
| SVD | $Z=UDV^\top$ | Factor data into singular directions |
| Singular-to-eigen | $\lambda_j=d_j^2/(n-1)$ | Convert SVD to sample component variance |
| SD of PC | $\sqrt{\lambda_j}$ | Spread of scores along component |
| Scores | $T=ZV=UD$ | New coordinates of observations |
| Score covariance | $\operatorname{Cov}(T)=\Lambda$ | PCs are uncorrelated |
| Variance proportion | $\lambda_j/\sum_k\lambda_k$ | Share of variance explained |
| Cumulative variance | $\sum_{j=1}^{m}\lambda_j/\sum_k\lambda_k$ | Total share kept by first $m$ PCs |
| Reconstruction using all PCs | $Z=TV^\top$ | No information lost with all full-rank directions |
| Approximate $k$-PC reconstruction | $\hat Z_k=T_kV_k^\top$ | Reduced-rank approximation |
| Correlation loading | $\sqrt{\lambda_j}v_{kj}$ | Correlation of standardized variable $k$ with PC $j$ |
| Squared Mahalanobis distance | $(x_i-\bar x)^\top S^{-1}(x_i-\bar x)$ | Multivariate distance from center |

**Symbols:** $n$ observations; $p$ variables; $S$ covariance; $R$ correlation; $V$ orthonormal coefficient vectors; $\Lambda$ diagonal eigenvalue matrix; $U$ left singular directions; $D$ diagonal singular-value matrix; $T$ scores; $\hat Z_k$ reconstruction using the first $k$ components. The formula $T=UD$ is written for compatible retained singular-vector dimensions.

### The four quantities students often confuse

Suppose a component's eigenvalue is 4 and all eigenvalues sum to 10.

- **Eigenvalue = 4:** score variance along that axis.
- **SD = $\sqrt4=2$:** score standard deviation.
- **Explained-variance proportion = $4/10=0.4$:** a fraction.
- **Explained-variance percentage = 40%:** the same share expressed per 100.

An **eigenvector coefficient** for this component might be $0.5$, but it is not one of those four values. Only the entire unit vector tells us how the original variables combine.

## 36. Examination questions with carefully explained answers

The source is a reference on R implementations, so the questions below are **new study exercises**, not questions printed in Anderson's PDF.

### Question 1. What are three core properties of principal components?

**Answer:** Each is a linear combination of the original variables; different PCs are uncorrelated within the fitted sample; and PCs are ordered from largest explained variance to smallest. A simple memory phrase is **combine, uncorrelate, rank by variance**.

### Question 2. Explain covariance PCA versus correlation PCA.

**Answer:** Covariance PCA centers columns but retains their original variance magnitudes and units. Correlation PCA centers and standardizes columns before finding directions, giving each nonconstant variable unit sample variance. Choose based on whether differences in original measurement scale should influence the PCA.

### Question 3. What does an eigenvector tell you, and what does an eigenvalue tell you?

**Answer:** The eigenvector gives the direction or weights of a PC; the eigenvalue gives variance of the corresponding scores. Component SD is the square root of the eigenvalue.

### Question 4. The eigenvalues are 6, 3, and 1. Find explained and cumulative variance.

**Working:** Total $=6+3+1=10$. Explained variance fractions are $0.6,0.3,0.1$, so percentages are **60%, 30%, 10%**. Cumulative percentages are **60%, 90%, 100%**. If two PCs are kept, 90% of the variance is retained.

### Question 5. Why can two packages give opposite eigenvectors but identical PCA meaning?

**Answer:** Both $v$ and $-v$ define the same geometric axis. Reversing the vector reverses all scores on that axis but changes neither its variance nor explained-variance percentage. Compare directions up to a sign.

### Question 6. For 11 observations, SVD singular values are 10 and 5. What are sample PCA eigenvalues?

**Working:** $n-1=10$. Use $\lambda=d^2/(n-1)$. Therefore $\lambda_1=100/10=10$ and $\lambda_2=25/10=2.5$. Total $=12.5$; PC1 explains **80%** and PC2 **20%**. Their SDs are $\sqrt{10}$ and $\sqrt{2.5}$.

### Question 7. What does `prcomp(X, center=TRUE, scale.=TRUE)` do?

**Answer:** It subtracts each variable's mean, divides it by its sample SD, then calculates PCA using SVD. The model's `$rotation` contains direction coefficients, `$x` scores, `$sdev` component SDs, and `summary()` supplies variance proportions.

### Question 8. What is wrong with `sqrt(pc$rotation)` if you want component SDs?

**Answer:** `$rotation` contains eigenvectors, which can include negative coefficients. Component SDs come from square-rooting **eigenvalues**, so use `pc$sdev` directly or `sqrt(pc$sdev^2)`. For raw eigendecomposition use `sqrt(E$values)`.

### Question 9. Why could `princomp()` and `prcomp()` yield different covariance eigenvalues?

**Answer:** With the same complete data and without scaling, `princomp()` normally computes covariance with divisor $n$, but `prcomp()` uses $n-1$. The ratio is $(n-1)/n$. This is a convention difference rather than proof of an incorrect algorithm.

### Question 10. Does rejecting Shapiro–Wilk normality mean PCA is prohibited?

**Answer:** No. Standard exploratory PCA can still be computed. Check outliers, skewness, and the analytical purpose. The result may matter for assumptions of certain later models or inferential analyses, not for the existence of eigenvalues/SVD themselves.

### Question 11. What is wrong with a statistic defined as the mean of values minus their own mean?

**Answer:** The deviations algebraically sum to zero. This statistic tells us nothing about the magnitude of disagreement. Use properly defined mean absolute deviation/error, RMSE, maximum absolute error, or sign/subspace-aligned metrics as appropriate. This specifically corrects a limitation in Appendix D.

### Question 12. Compare `pcaMethods::pca()` and `FactoMineR::PCA()`.

**Answer:** They come from different libraries, use different object conventions, and solve different convenience needs. FactoMineR emphasizes exploratory outputs, variables/individuals, supplementary data and weights. pcaMethods provides several PCA algorithms including options for missing data. FactoMineR results are usually accessed by `$`; pcaMethods' `pcaRes` slots can be accessed with `@`.

### Question 13. Is `summary(prcomp_model)$importance[2, ]` a percentage or fraction?

**Answer:** It is a fraction. Multiply by 100 to express a percentage. By contrast, `FactoMineR::PCA()` reports its explained and cumulative percentages in `$eig[,2]` and `$eig[,3]`.

### Question 14. Explain what the first component's *score* means.

**Answer:** It is the new coordinate of one observation after applying the PC1 linear combination to the appropriately preprocessed original variables. It describes the observation's location along the greatest-variance direction. Its interpretation depends on the coefficient signs and variable meanings.

### Question 15. Why is `%*%` necessary in score calculation?

**Answer:** Each observation's score is a sum of variable values multiplied by PC coefficients. Matrix multiplication performs exactly those sums for all rows and components. The operator `*` multiplies corresponding entries instead and does not perform the same linear transformation.

### Question 16. Does a two-PC biplot reproduce all information in a five-variable dataset?

**Answer:** No, unless the remaining PC variances are zero or negligibly small. A two-dimensional display is a projection. Always state the cumulative variance explained by its two axes and recognize that differences in PC3–PC5 are hidden.

## 37. Mini-practicals for independent practice

**Practical A: Compare centering decisions.** Fit `prcomp(USArrests, center=TRUE, scale.=FALSE)` and `prcomp(USArrests, center=TRUE, scale.=TRUE)`. Compare their eigenvalues, leading loadings, and cumulative variance. In writing, explain *why* they differ, without calling either wrong.

**Practical B: Recreate one route manually.** Use `Z <- scale(USArrests)`, `E <- eigen(cov(Z))`, and `T <- Z %*% E$vectors`. Compare the eigenvalues with `prcomp(USArrests, scale.=TRUE)$sdev^2`. Then calculate `cov(T)` and verify near-zero off-diagonal entries.

**Practical C: Inspect normality cautiously.** Generate `rnorm(100)` and `rexp(100)` under a fixed seed. Draw Q–Q plots for both and run Shapiro–Wilk. Explain why different distributions produce different plot shapes. This is a teaching demonstration, not a claim that the source used these generated values.

**Practical D: Introduce one missing value.** Put `NA` into one numeric column, observe how standard `prcomp()` behaves, then decide between a documented complete-case analysis and an incomplete-data method. Record the lost sample size or algorithm's missing-data assumptions.

**Practical E: Discover a sign flip.** Compute PCA using `eigen(cor(X))` and `prcomp(X,scale.=TRUE)`. Compare **absolute** loadings. If an axis appears reversed, use its dot product to realign. Verify matching explained variance.

**Practical F: Audit Appendix D.** Write down $a_1=1,a_2=100,a_3=10000$, then compute the mean of $a_j-\bar a$. Explain why the result is zero even though the numbers are far apart. State a better discrepancy metric.

### A concise model answer template for written examination questions

A student writing under time pressure can use:

> **Definition → formula/method → interpretation → caution.** For example: “`prcomp()` computes PCA by SVD. The model uses centered data, and optional scaling gives unit sample variance. The eigenvalues are `sdev^2`, scores are in `x`, and loadings are in `rotation`. Explained variance indicates the fraction of total spread represented by a component. Signs of loadings can reverse without changing PCA meaning.”

This format is short enough for an examination while preserving the central statistical idea.

## 38. Research and reporting checklist

A reproducible report should disclose the dataset and observation count, active numeric variables, unit meanings, missingness decisions, centering/scaling choice, R functions/packages and relevant versions, PC retention rule, eigenvalues/variance percentages, direction coefficients, and clear interpretation of scores. If model results are compared across implementations, describe **which outputs were aligned** and the exact discrepancy metric used.

A compact reporting example (fill in numbers from your actual analysis):

> “Principal component analysis was conducted on the specified numeric variables after centering and unit-variance scaling. We used `prcomp()` in R, which computes components through singular value decomposition. The first _k_ components accounted for _x_% of total standardized variance. Component 1 was primarily associated with _variables_, interpreted as _construct_. We inspected missingness and relevant plots before fitting. Component signs are conventional and are not interpreted causally.”

Do not insert illustrative numbers from this book into a real study. **Compute the actual values.**

---

# Part X. Source audit and reference guide

## 39. Page-by-page coverage of Anderson's 16-page PDF

The following table is a coverage map for readers who want to check every source page. It helps distinguish the historical PDF from the new explanations.

| PDF page | Actual source content | Where it is taught here |
|---|---|---|
| **1** | Introduction; three PC properties; R-mode/spectral versus Q-mode/SVD; six functions; normality opening | §§1–2, 12–13, 20–21 |
| **2** | Univariate Q–Q plots, `car::qqPlot`, `pairs`, squared Mahalanobis density and chi-square Q–Q diagnostics, `exam.norm` call | §21, §22 |
| **3** | Shapiro–Wilk option; `eigen()` arguments; covariance/correlation forms; scores and importance formulas; custom `PC` call | §§8–14, 21, 23 |
| **4** | Table 1 output mapping; `princomp()` inputs, arguments, and object fields | §§14–15, 20 |
| **5** | `svd()` inputs/output/formulas; SVD wrapper; `prcomp()` introduction and arguments | §§13, 16–17, 23 |
| **6** | `prcomp()` output; `FactoMineR::PCA()` features and fields; `pcaMethods::pca()` introduction | §§17–19 |
| **7** | Table 2 with cross-function output location/interpretation and S4 `@` note | §§18–20 |
| **8** | Remaining `pcaMethods::pca()` arguments; simulation design and arrays | §§19, 24–28 |
| **9** | Simulation's six exact published results; conclusion; start of references | §§25–29, §40 |
| **10** | Final Stacklies et al. bibliographic entry | §40 |
| **11** | Appendix A, full historical `exam.norm()` script | §§21–22 |
| **12** | Appendix B, decathlon three-variable graphical diagnostics, $N=41$, $p=3$ | §21.8 |
| **13** | Appendix C, first portion of `PC()` wrapper, preprocessing, decomposition, scores, plots | §23 |
| **14** | Appendix C continuation, summary/warnings and return list | §23 |
| **15** | Appendix D, simulation function setup, generation, method fits, eigenvalue and part of eigenvector comparisons | §§24–28 |
| **16** | Appendix D continuation, eigenvector and score discrepancy calculations | §§24–28 |

**What is not claimed:** The supplied PDF does not give a large real-world numerical PCA output table for each function; it mainly provides example commands, descriptions of object fields, simulation summary figures, and the normality figure. This book has therefore **not invented historical eigenvalues, loadings, principal component scores, Shapiro p-values, or package outputs** for the decathlon data. The fully numerical four-observation lesson, USArrests code, and branch-office case study are clearly marked independent teaching extensions.

## 40. References and current documentation

### The supplied historical reference and references it cites

Anderson, Gregory B. *Principal Component Analysis in R: An Examination of the Different Functions and Methods to Perform PCA*. Supplied local copy: `PCA-R-2013.pdf`, 16 pages. The user-supplied filename includes `2013`; the PDF should be cited with its own confirmed bibliographic details if a formal publication date is essential.

The source bibliography [pp. 9–10] includes:

- Everitt, B., and T. Hothorn (2011). *An Introduction to Applied Multivariate Analysis with R*. Springer.
- Fox, J., and S. Weisberg (2011). *An R Companion to Applied Regression*.
- Genz, A., and F. Bretz (2009). *Computation of Multivariate Normal and t Probabilities*. Springer.
- Genz and colleagues (2012). *mvtnorm* package reference, as historically identified in the source.
- Husson and colleagues (2012). *FactoMineR* package reference, as historically identified in the source.
- Qiu, W., and H. Joe (2009). *clusterGeneration* package reference.
- R Development Core Team (2011). *R: A Language and Environment for Statistical Computing*.
- Stacklies, W., and colleagues (2007). “pcaMethods: a Bioconductor package providing PCA methods for incomplete data.” *Bioinformatics* 23(9), 1164–1167.

These are the historical references **as discussed by the source**. For formal citation in submitted work, inspect the full source bibliography and run `citation("packageName")` in the installed R package to obtain up-to-date formatting.

### Official or maintained help pages consulted for current behavior

1. Base R `prcomp()` documentation: <https://stat.ethz.ch/R-manual/R-devel/library/stats/html/prcomp.html>  
   Confirms SVD, `scale.`, `tol`, `rank.`, output components, prediction, and the $n-1$ variance convention.
2. Base R `princomp()` documentation: <https://stat.ethz.ch/R-manual/R-devel/library/stats/html/princomp.html>  
   Confirms eigendecomposition, covariance divisor $n$, sign convention, dimension limits, and prediction.
3. Base R `screeplot()` documentation: <https://stat.ethz.ch/R-manual/R-devel/library/stats/html/screeplot.html>  
   Confirms a default method can plot an object containing an `$sdev` component.
4. Base R `shapiro.test()` documentation: <https://search.r-project.org/R/refmans/stats/html/shapiro.test.html>  
   Confirms the test's sample size constraints and output.
5. FactoMineR PCA help: <https://search.r-project.org/CRAN/refmans/FactoMineR/html/PCA.html>  
   Confirms `eig` columns contain eigenvalues, percentages, and cumulative percentages; supplementary elements and weighting arguments.
6. Bioconductor *pcaMethods* release page: <https://bioconductor.org/packages/release/bioc/html/pcaMethods.html>  
   Confirms the package's continued availability and recommended installation route.
7. *pcaMethods* `pca()` help: <https://rdrr.io/bioc/pcaMethods/man/pca.html>  
   Confirms wrapper method families, optional PCA methods, and input/preprocessing arguments.
8. *pcaMethods* `pcaRes` class help: <https://rdrr.io/bioc/pcaMethods/man/pcaRes.html>  
   Confirms S4 results/slots including scores, loadings, variance, and standard deviations.
9. Decathlon dataset description: <https://search.r-project.org/CRAN/refmans/PCAmixdata/html/decathlon.html>  
   Confirms its 41 observations and substantive variables, a useful independent check of Appendix B's dataset context.

Documentation changes with R/package releases. The links are **verification aids**, not an assertion that every historical command works unchanged on every installed system.

## 41. Final conceptual map: the entire reference on one page

Start with an $n\times p$ data matrix and choose whether to **center only** or **center and standardize**. This determines whether you want **covariance PCA** or **correlation PCA**. You can then calculate PCA by (1) decomposing the covariance/correlation matrix with `eigen()`, or (2) decomposing the suitably preprocessed data matrix with `svd()`. Under matched preprocessing, these approaches are algebraically connected by $\lambda=d^2/(n-1)$, and their scores are obtained as $ZV=UD$.

`princomp()` packages spectral PCA, `prcomp()` packages SVD PCA, `FactoMineR::PCA()` adds exploratory outputs and supplementary/weighted elements, and `pcaMethods::pca()` adds multiple algorithms including approaches for incomplete data. Every interface stores related mathematical quantities under **different field names and conventions**. Convert eigenvalues, standard deviations, explained variance, eigenvectors, and scores carefully, including fraction/percentage differences, $n$ versus $n-1$ denominators, and arbitrary component signs.

Normal Q–Q plots, scatterplot matrices, Shapiro–Wilk tests, and Mahalanobis distance plots help examine data structure but are not automatic pass/fail gates for descriptive PCA. The historical custom functions are useful teaching artifacts, yet their code must be read critically. Most importantly, the simulation values near zero printed by Anderson should remain faithfully reported as historical results, **while recognizing that averaging signed deviations from their own mean is not a valid similarity measure**.

Once you understand these connections, the core applied skill is not memorizing six commands. It is knowing **which mathematical PCA you requested, which preprocessing was used, what each number means, and whether your software comparison or interpretation is actually justified**.

---

*End of teaching book. This Markdown file is self-contained. Optional package installation and graphical results depend on the reader's R environment.*
