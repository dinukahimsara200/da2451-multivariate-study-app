# Principal Component Analysis: From First Principles to Statistical Practice

**DA2451 | Multivariate Methods in Business | Lecture 03 companion teaching book**  
**Primary source:** *Lec3.pdf*, “Principal component analysis,” Semester 4, 2026, **21 pages**.  
**Audience:** A first-time learner who has not yet mastered variance, matrices, vectors, eigenvalues, or R.  
**Scope:** A complete guided treatment of every substantive topic in the lecture, with additional explanations, proofs, by-hand calculations, interpretation exercises, and reproducible R examples.

## How to use this book

Read Chapters 1–5 in order, even if you think you know the terms. Work through the four-observation example in Chapter 6 with a calculator. Then read the iris analysis and R demonstrations, before tackling the mathematical derivations. Keep the formula reference and the worked answers nearby when practicing.

**Reading roadmap:** [Part I: foundations](#part-i-understand-the-problem-before-learning-the-equations) · [Part II: worked calculations](#part-ii-work-through-pca-as-a-real-calculation) · [Part III: R implementation](#part-iii-run-pca-in-r-and-interpret-every-result) · [Part IV: mathematics](#part-iv-the-mathematics-behind-pca-derived-rather-than-memorized) · [Part V: exam practice](#part-v-turn-understanding-into-exam-and-practical-skills).

**Provenance convention:** A tag such as **[Lecture pp. 4–5]** tells you where the lecturer introduces the concept, code, number, or graph. Paragraphs marked **Teaching extension** develop background material not explicitly derived in the slides. Paragraphs marked **Source check** explain a mathematically important nuance, ambiguity, or inconsistency in the PDF. These additions do **not** replace the reported lecture outputs. The complete page-by-page coverage audit is at the end.

**Notation convention:** A lowercase ordinary letter such as `x` may name a number; bold mathematical symbols such as $\mathbf{x}$ name vectors; uppercase bold symbols such as $\mathbf{X}$ name matrices. The lecture sometimes uses $Z$ for standardized variables and sometimes for transformed variables. This book uses $\mathbf{X}$ for the original data, $\mathbf{A}$ for centered or standardized data, and $\mathbf{T}$ or $\mathbf{Y}$ for principal-component **scores**, except when reproducing the lecture's symbols explicitly.

---

# Part I. Understand the problem before learning the equations

## 1. Why does Principal Component Analysis exist?

### 1.1 Imagine a business dataset

Suppose a retail company studies 500 customers. For each customer it records:

- monthly amount spent;
- number of purchases;
- number of store visits;
- time spent in the shopping app;
- total number of products viewed;
- total number of products bought;
- average basket value;
- percentage of purchases made online.

Each **row** describes one customer. Each **column** describes one measured characteristic, called a **variable** or **feature**. There are eight variables, so each customer can be pictured as a point in an eight-dimensional space. We cannot literally draw eight perpendicular axes on a sheet of paper, but the mathematics can handle them.

Some variables tell overlapping stories. Customers making more purchases often buy more items; customers buying more items may spend more money. Therefore, several columns partly repeat information. We might hope to combine the eight measurements into two or three useful numerical summaries, without losing too much of the dataset's overall variation.

This is the basic motivation for **Principal Component Analysis (PCA)**.

> **Central idea:** PCA builds *new* numerical variables by taking weighted combinations of the *original* numerical variables. It orders these new variables by how much variation they contain. We can then retain the first few components and discard the remaining components if the information loss is acceptable.

This matches the lecture's opening definition: it reduces a set of potentially correlated variables to a smaller set of mutually uncorrelated principal components. **[Lecture p. 1]**

### 1.2 What exactly is a dimension?

A **dimension** is an independent coordinate direction required to describe where a point is located in a chosen representation.

- One variable, such as revenue, gives a point on a number line: **one dimension**.
- Two variables, such as revenue and expenses, give a point on a flat graph: **two dimensions**.
- Three variables, such as revenue, expenses, and employees, give a point in 3D space.
- One hundred variables give a point in 100-dimensional space, even though we cannot directly visualize it.

In statistics, $p$ is commonly used for the number of variables (columns), and $n$ for the number of observations (rows).

| Symbol | Meaning | Retail example |
|---|---|---|
| $n$ | Number of observations | 500 customers |
| $p$ | Number of measured variables | 8 features |
| $n\times p$ | Shape of a data matrix | $500\times8$ |
| $k$ | Number of retained principal components | Perhaps 2 or 3 |

Reducing $p=8$ original dimensions to $k=2$ principal-component dimensions allows the observations to be plotted in an ordinary scatterplot. The plot is not the same as picking two original variables. Each new axis can combine information from all eight original variables.

### 1.3 What is high-dimensional data?

A dataset is **high-dimensional** when it has many variables relative to its number of observations, particularly when $p$ is close to or greater than $n$. The lecture highlights $p\approx n$ and $p>n$. **[Lecture p. 1]**

For example:

- $n=1{,}000$, $p=5$: relatively few variables per observation.
- $n=50$, $p=45$: many variables relative to available observations.
- $n=50$, $p=500$: more measured features than observations.

With many dimensions, inspecting relationships becomes difficult, irrelevant variation may accumulate, and some modeling methods can become unstable. These difficulties are part of what people loosely call the **curse of dimensionality**. The exact consequences depend on the task, the statistical method, and the structure of the data. PCA can address certain dimensionality problems, but not all of them.

**Teaching extension:** In a centered matrix with $n$ observations, the number of nonzero PCA directions is at most $\min(n-1,p)$. This is one reason data with $p\gg n$ contain many mathematically redundant directions: a centered set of $n$ points cannot span more than $n-1$ independent directions.

### 1.4 Correlated variables and repeated information

Imagine recording both a customer's monthly spending in rupees and their monthly spending converted into dollars using one fixed exchange rate. Those columns encode exactly the same underlying information. They are **perfectly correlated**. Keeping both may not improve our understanding.

Now consider monthly spending and number of purchases. These often increase together but are not identical. They have a **positive correlation**, perhaps 0.8. PCA may find one new direction that summarizes their shared variation and another direction that reflects the remaining differences.

The graph on **lecture p. 2** illustrates a cloud of points in two dimensions, with a long direction of spread and a shorter perpendicular direction. The lecture labels these as PC1 and PC2, with **93%** and **7%** of the total variation respectively. Read the picture as follows:

1. Find the middle of the data cloud.
2. Imagine drawing a straight line through its middle, following the direction in which the points spread out most.
3. That line is the first principal-component direction.
4. Draw a second line at right angles to the first. It captures spread not represented along the first line.
5. If the first line captures most of the spread, one coordinate may describe the data surprisingly well.

**Source check:** The lecture separately describes an illustrative correlation of approximately **0.56** and an illustrative **93% / 7%** split. Do not infer that a correlation of 0.56 *automatically* yields 93% and 7%. For **two standardized variables** with correlation $r=0.56$, the PCA proportions are $(1+0.56)/2=78\%$ and $(1-0.56)/2=22\%$. Different original variances or an independently drawn illustration can lead to a 93% / 7% split. The slide does not give the point coordinates needed to reproduce its percentages numerically.

### 1.5 Multicollinearity: a useful problem to understand

**Multicollinearity** means that predictor variables used in a model are strongly related to one another. In a multiple regression, this can make it hard to isolate the separate contribution of each predictor. Estimated coefficients may become unstable and have large standard errors.

Example: a housing-price model uses both floor area in square feet and the same floor area in square metres. The two predictors are perfectly related. Ordinary regression cannot uniquely identify their separate effects.

PCA offers a way to replace correlated predictors with **uncorrelated components**. A model using these components may avoid that particular linear-dependence problem.

**Important qualification:** Multicollinearity does **not** automatically make every prediction wrong. PCA does **not** guarantee better predictive performance. Components are selected to explain *predictor variance*, not necessarily to predict a target outcome. We revisit this issue under Principal Components Regression.

### 1.6 What PCA gives you, and what it does not

PCA typically returns:

1. **Directions or loading vectors:** formulas telling you how to mix original variables.
2. **Scores:** each observation's numerical position along each new direction.
3. **Component variances:** how much spread each component captures.
4. **Explained-variance percentages:** the share captured by each component.
5. **Plots:** ways to inspect the component importance, observations, and variable relationships.

PCA does **not** automatically provide causal explanations, meaningful category labels, the best predictors of an outcome, or proof that discarded components are useless. A large variance direction can reflect noise; a small variance direction can contain critical information for classification, anomaly detection, or a business decision.

### 1.7 A mental model to carry forward

Think of a photograph of a long, thin shadow on the floor. You can describe its shape using ordinary horizontal and vertical coordinates. But the simplest description uses an axis along the length of the shadow and another along its width. PCA automatically **rotates the coordinate system** to align the first axis with maximum spread. Retaining fewer axes is the *dimension-reduction* step. The rotation alone, if all components are kept, does not discard any information.

---

## 2. The statistical foundations: mean, variance, covariance, correlation

**Lecture connection:** PCA's directions are defined in terms of variance; the iris example starts by checking correlations. Without these two ideas, the rest of the chapter becomes a memorization exercise. **[Lecture pp. 1–5, 13, 17–19]**

### 2.1 The mean is the balancing point

Suppose four shop branches report daily sales of 2, 4, 6, and 8 units. Their mean is

$$
\bar{x}=\frac{2+4+6+8}{4}=5.
$$

Here, $\bar{x}$ (pronounced “x-bar”) represents the **sample mean**. More generally,

$$
\boxed{\bar{x}=\frac{1}{n}\sum_{i=1}^{n}x_i}
$$

Read the symbols one by one:

- $x_i$ means the value of observation number $i$.
- $n$ means the total number of observations.
- $\sum$ (capital Greek sigma) tells you to add.
- The subscript $i=1$ and superscript $n$ say: add from the first observation through the $n$th.
- Dividing the sum by $n$ gives the average.

A **centroid** is the multivariable version of a balancing point: the point whose coordinates are the column means. For a scatterplot with two variables, its coordinates are $(\bar{x}_1,\bar{x}_2)$.

### 2.2 Deviations and centered data

The **deviation** of an observation from the mean is

$$
x_i-\bar{x}.
$$

For the example:

| $x_i$ | $x_i-\bar{x}$ | Meaning |
|---:|---:|---|
| 2 | $-3$ | 3 units below average |
| 4 | $-1$ | 1 unit below average |
| 6 | $+1$ | 1 unit above average |
| 8 | $+3$ | 3 units above average |

The deviations always add to zero. If we subtract the mean from every value, we have **centered** the data. Centered data have mean zero. Centering moves the cloud so that its centroid sits at the coordinate origin, $(0,0,\ldots,0)$; it does not change the cloud's shape or pairwise distances.

### 2.3 Variance measures spread

Two datasets can have the same mean but very different spread. For instance, 4, 5, 5, 6 and 0, 2, 8, 10 both average to 5, but the second dataset is much more spread out.

We want to measure the typical squared deviation from the mean. For a **sample**, the variance is

$$
\boxed{s_x^2=\frac{\sum_{i=1}^{n}(x_i-\bar{x})^2}{n-1}}.
$$

Symbols:

- $s_x^2$ means the **sample variance** of variable $x$.
- The superscript 2 means “squared,” not “the second observation.”
- $(x_i-\bar{x})^2$ is the squared deviation, so negative and positive deviations both contribute positively.
- $n-1$ is the usual denominator used for sample variance.

Calculate it for 2, 4, 6, 8:

$$
\begin{aligned}
\text{Squared deviations}&=(-3)^2+(-1)^2+(1)^2+(3)^2\\
&=9+1+1+9=20,\\
s_x^2&=\frac{20}{4-1}=\frac{20}{3}\approx6.6667.
\end{aligned}
$$

A larger variance means more spread, measured in **squared units**. If sales are measured in rupees, their variance is measured in squared rupees, an awkward unit to interpret directly.

**Population distinction:** If we truly have the entire population of size $N$, population variance is $\sigma_x^2=\frac{1}{N}\sum_{i=1}^{N}(x_i-\mu_x)^2$. A symbol $\mu$ (“mu”) is a population mean, while $\sigma^2$ (“sigma squared”) denotes population variance. In R, `var()` uses the sample denominator $n-1$.

### 2.4 Standard deviation puts spread back into original units

The standard deviation is the square root of the variance:

$$
\boxed{s_x=\sqrt{s_x^2}}.
$$

For the four sales values, $s_x=\sqrt{20/3}\approx2.5820$ units. In PCA software output, the phrase **standard deviation of PC1** means the amount of spread in observations' PC1 scores. Squaring it gives the **variance** explained along PC1.

This distinction is essential when interpreting the output of `summary(prcomp_object)`.

### 2.5 Why covariance is needed

Variance tells us how **one** variable changes. Covariance tells us how **two** variables change **together**.

Imagine two variables recorded on the same days:

| Day | Advertising $x$ | Sales $y$ | $x-\bar{x}$ | $y-\bar{y}$ | Product |
|---:|---:|---:|---:|---:|---:|
| 1 | 1 | 2 | $-2$ | $-4$ | $8$ |
| 2 | 2 | 4 | $-1$ | $-2$ | $2$ |
| 3 | 3 | 6 | $0$ | $0$ | $0$ |
| 4 | 4 | 8 | $1$ | $2$ | $2$ |
| 5 | 5 | 10 | $2$ | $4$ | $8$ |

The means are $\bar{x}=3$ and $\bar{y}=6$. When advertising is above its mean, sales are also above their mean; when one is below, the other is below. The products of their deviations are positive.

The sample covariance is

$$
\boxed{\operatorname{Cov}(x,y)=s_{xy}=\frac{\sum_{i=1}^{n}(x_i-\bar{x})(y_i-\bar{y})}{n-1}}.
$$

Here $\operatorname{Cov}$ means covariance. The answer for the table is

$$s_{xy}=\frac{8+2+0+2+8}{5-1}=5.$$

Interpret the sign, not the raw number alone:

- **Positive covariance:** the variables tend to rise or fall together.
- **Negative covariance:** one tends to rise when the other falls.
- **Zero covariance:** there is no *linear* co-movement captured by covariance. Nonlinear relationships can still exist.

Covariance depends on the scales and units of the two variables, so comparing different covariance values directly can be misleading.

### 2.6 Correlation is a standardized covariance

**Correlation** divides covariance by the two standard deviations:

$$
\boxed{r_{xy}=\frac{s_{xy}}{s_xs_y}}.
$$

The symbol $r$ is the sample Pearson correlation coefficient. It is unitless and always between $-1$ and $+1$ when defined.

| Correlation | Plain-language meaning | What a scatterplot tends to look like |
|---:|---|---|
| $+1$ | Perfect positive linear relationship | Points exactly on an upward line |
| $+0.8$ | Strong positive linear association | Tight upward-sloping cloud |
| $0$ | No linear association | No overall straight-line tilt, possibly another pattern |
| $-0.8$ | Strong negative linear association | Tight downward-sloping cloud |
| $-1$ | Perfect negative linear relationship | Points exactly on a downward line |

If $y=2x$ in the five-day example, then $s_y=2s_x$ and $s_{xy}=2s_x^2$, giving $r_{xy}=1$.

**Do not confuse these:**

- Correlation $r=0.96$ is not “96% of variance explained by PC1.”
- A negative correlation is not an inherently bad relationship.
- Correlation does not establish cause and effect.
- Correlation measures linear association; it may miss a strong curved relationship.

### 2.7 What a correlation matrix is

For variables $X_1,X_2,X_3$, a correlation matrix looks like

$$
\mathbf{R}=\begin{bmatrix}
1&r_{12}&r_{13}\\
r_{12}&1&r_{23}\\
r_{13}&r_{23}&1
\end{bmatrix}.
$$

The entry at row 1, column 2 is the correlation between variables 1 and 2. The main diagonal contains ones because a variable is perfectly correlated with itself. The matrix is **symmetric** because $r_{12}=r_{21}$.

A **covariance matrix** is similar but has variances on the diagonal and covariances elsewhere:

$$
\mathbf{S}=\begin{bmatrix}s_1^2&s_{12}\\s_{12}&s_2^2\end{bmatrix}.
$$

Later, we will discover a crucial fact: the eigenvectors of this matrix tell us which directions PCA should use, and its eigenvalues tell us how much variance those directions capture.

### 2.8 Try it yourself

For $x=(1,2,3)$ and $y=(3,2,1)$:

1. Calculate both sample means.
2. Write the deviation columns.
3. Calculate both sample variances.
4. Calculate the sample covariance.
5. Calculate Pearson's correlation.

**Check:** $\bar{x}=\bar{y}=2$, $s_x^2=s_y^2=1$, $s_{xy}=-1$, and $r=-1$. The variables perfectly oppose each other in a straight-line sense.

---

## 3. The mathematical language: scalars, vectors, matrices, and geometry

**Lecture connection:** This foundation prepares you for the transformation matrix $\mathbf{\Phi}$ on page 13, $\mathbf{X}=\mathbf{U}\mathbf{D}\mathbf{V}^{\mathsf T}$ on page 14, and the eigenvector equations on pages 17–18. **[Lecture pp. 13–18]**

### 3.1 A scalar is one number

A **scalar** is an ordinary single number, such as 7, $-0.4$, or $0.7071$. A scalar can multiply a vector: multiplying every entry of $(2,3)$ by 4 gives $(8,12)$.

### 3.2 A vector is an ordered list

A **column vector** is written

$$\mathbf{x}=\begin{bmatrix}2\\3\end{bmatrix}.$$

It describes a point whose horizontal coordinate is 2 and vertical coordinate is 3, or a movement 2 units across and 3 units upward.

A **row vector** is

$$\mathbf{x}^{\mathsf T}=\begin{bmatrix}2&3\end{bmatrix}.$$

The superscript $\mathsf T$ denotes a **transpose**, which swaps rows and columns. The lecture uses a prime symbol ($'$ or $\prime$) for the same operation, as in $\mathbf{V}'$. In R, `t(X)` transposes `X`.

A vector with $p$ entries is a $p$-dimensional vector. Each entry is a **coordinate**.

### 3.3 Vector arithmetic

Vectors of the same length can be added entry by entry:

$$\begin{bmatrix}2\\3\end{bmatrix}+\begin{bmatrix}4\\-1\end{bmatrix}=\begin{bmatrix}6\\2\end{bmatrix}.$$

Subtracting works the same way. Multiplying a vector by a scalar changes its length and, if the scalar is negative, reverses its direction:

$$3\begin{bmatrix}2\\3\end{bmatrix}=\begin{bmatrix}6\\9\end{bmatrix}.$$

### 3.4 The length of a vector

The length (Euclidean norm) of $\mathbf{x}=(x_1,x_2)$ is

$$\boxed{\lVert\mathbf{x}\rVert=\sqrt{x_1^2+x_2^2}}.$$

For $(3,4)$, length is $\sqrt{3^2+4^2}=5$. If we divide each coordinate by 5, we get $(0.6,0.8)$, a **unit vector** with length 1.

Why important? PCA uses unit-length direction vectors. Without this restriction, multiplying a direction by 1,000 would multiply its score variance by $1{,}000^2$, making “maximum variance” meaningless.

**Normalization** is the operation

$$\boxed{\mathbf{u}=\frac{\mathbf{x}}{\lVert\mathbf{x}\rVert}},\qquad \mathbf{x}\ne\mathbf0.$$

It preserves the direction of a nonzero vector while changing its length to 1.

### 3.5 The dot product tells us alignment

The **dot product** or **inner product** of two vectors is

$$\mathbf{a}^{\mathsf T}\mathbf{b}=a_1b_1+a_2b_2+\cdots+a_pb_p.$$

For $\mathbf{a}=(2,3)$ and $\mathbf{b}=(4,-1)$:

$$\mathbf{a}^{\mathsf T}\mathbf{b}=2(4)+3(-1)=5.$$

For two nonzero vectors, the same product is

$$\mathbf{a}^{\mathsf T}\mathbf{b}=\lVert\mathbf{a}\rVert\lVert\mathbf{b}\rVert\cos\theta,$$

where $\theta$ is the angle between them. If both vectors have length 1, their dot product is $\cos\theta$.

- Dot product $+1$ for identical unit directions.
- Dot product $-1$ for opposite unit directions.
- Dot product $0$ for **perpendicular** or **orthogonal** directions.

Example:

$$\begin{bmatrix}1\\1\end{bmatrix}^{\mathsf T}\begin{bmatrix}-1\\1\end{bmatrix}=1(-1)+1(1)=0.$$

The vectors $(1,1)$ and $(-1,1)$ are perpendicular. These two directions will become the PCA directions in the lecturer's four-row numerical example.

### 3.6 Projection: finding where a point lies along a direction

Let a centered observation be the point $\mathbf{x}=(4,2)$ and let the unit direction be

$$\mathbf{v}=\frac{1}{\sqrt2}\begin{bmatrix}1\\1\end{bmatrix}.$$

The **scalar projection score** of that point on this direction is

$$t=\mathbf{x}^{\mathsf T}\mathbf{v}=4\frac1{\sqrt2}+2\frac1{\sqrt2}=\frac6{\sqrt2}\approx4.2426.$$

This gives the point's one-number coordinate along the slanted new axis. The **projected vector** back in the original two-dimensional space is

$$\widehat{\mathbf{x}}=t\mathbf{v}=\begin{bmatrix}3\\3\end{bmatrix}.$$

We have converted $(4,2)$ into a point $(3,3)$ on the diagonal line. The residual $\mathbf{x}-\widehat{\mathbf{x}}=(1,-1)$ is perpendicular to the direction retained. This projection operation is the geometric heart of PCA.

### 3.7 A matrix is a rectangular arrangement of numbers

The four observations in two variables can be written

$$\mathbf{X}=\begin{bmatrix}
1&2\\2&1\\3&4\\4&3
\end{bmatrix}.$$

There are four rows and two columns, so its **dimension/shape** is $4\times2$. An entry $x_{ij}$ has two subscripts: $i$ tells you the row, $j$ tells you the column. Here $x_{32}=4$ because the third row, second column contains 4.

A matrix can represent an entire dataset. If $\mathbf{X}$ has $n$ rows and $p$ columns, write $\mathbf{X}\in\mathbb{R}^{n\times p}$. The symbol $\mathbb{R}$ means real numbers, not the R programming language.

### 3.8 Matrix multiplication is not entry-by-entry multiplication

Consider

$$\mathbf{A}=\begin{bmatrix}1&2\\3&4\end{bmatrix},\quad \mathbf{b}=\begin{bmatrix}5\\6\end{bmatrix}.$$

Their matrix product is

$$\mathbf{A}\mathbf{b}=\begin{bmatrix}1(5)+2(6)\\3(5)+4(6)\end{bmatrix}=\begin{bmatrix}17\\39\end{bmatrix}.$$

We multiply a **row of the left matrix** by a **column of the right matrix**, adding the pairwise products.

The shape rule is

$$\boxed{(n\times p)(p\times k)=(n\times k)}.$$

The inner dimensions must match. For example, $(4\times2)(2\times2)$ is valid and produces a $4\times2$ matrix. But $(4\times2)(4\times2)$ is not a valid ordinary matrix multiplication.

In R, `%*%` performs matrix multiplication. An ordinary `*` on matrices performs elementwise multiplication instead. This distinction becomes crucial in the lecturer's PCA example.

### 3.9 Identity and orthogonal matrices

The **identity matrix** acts like 1 for matrix multiplication:

$$\mathbf{I}_2=\begin{bmatrix}1&0\\0&1\end{bmatrix}.$$

An **orthogonal matrix** $\mathbf{V}$ has perpendicular, unit-length columns, so

$$\boxed{\mathbf{V}^{\mathsf T}\mathbf{V}=\mathbf{I}}.$$

For a square orthogonal matrix, also $\mathbf{V}\mathbf{V}^{\mathsf T}=\mathbf{I}$, and its transpose is its inverse. Geometrically, multiplying by an orthogonal matrix rotates and/or reflects coordinate axes without stretching distances. The lecturer's matrix of PCA directions $\mathbf{\Phi}$ has this property when all components are included.

### 3.10 What it means to be linearly dependent

Two vectors are **linearly dependent** if one can be formed by multiplying the other by a number. For example, $(2,4)$ and $(1,2)$ contain the same direction.

Three or more vectors are dependent if one can be constructed as a weighted combination of the others. A dataset with exactly duplicated numerical columns is rank-deficient, because not every column supplies a genuinely new direction.

**Teaching extension:** Orthogonality of the PCA directions plus unit length makes the transformed axes mathematically convenient; uncorrelated component scores are a consequence of choosing the directions from the covariance/correlation matrix, rather than merely drawing arbitrary perpendicular lines through a dataset.

---

## 4. Centering versus standardizing: the decision that changes PCA

### 4.1 Centering changes the origin

For a variable with mean $\bar{x}$,

$$x_i^{(c)}=x_i-\bar{x}.$$

After centering, the new mean is zero. This is usually the basic preprocessing step for conventional PCA. In `prcomp()`, the argument is `center = TRUE`.

### 4.2 Standardizing changes both the origin and the unit

A standardized sample value, often called a **z-score**, is

$$\boxed{z_i=\frac{x_i-\bar{x}}{s_x}}.$$

It measures how many sample standard deviations an observation sits above or below the mean.

- $z=0$ means exactly at the mean.
- $z=+1$ means one standard deviation above the mean.
- $z=-2$ means two standard deviations below the mean.

The standardized column has sample mean 0 and sample variance 1. In R:

```r
z <- scale(x)                 # Center and scale a numeric vector/matrix
```

For a complete data matrix with no missing values, `scale(X)` by default subtracts each column mean and divides by each column's sample standard deviation.

### 4.3 A concrete numerical example

Suppose a customer has an expenditure of 8,000 rupees; spending has mean 5,000 and standard deviation 1,500.

$$z_{\text{spending}}=\frac{8{,}000-5{,}000}{1{,}500}=2.$$

Suppose the same customer visits a shop 9 times; visit count has mean 5 and standard deviation 2.

$$z_{\text{visits}}=\frac{9-5}{2}=2.$$

Although 8,000 rupees and 9 visits are entirely different measurements, both are **two standard deviations above average**. The standardized values are directly comparable as deviations relative to their own columns.

### 4.4 Covariance PCA versus correlation PCA

The choice of scaling changes what PCA considers “large variation.”

| Preprocessing | Matrix effectively analyzed | Equalizes original variable variances? | Typical use |
|---|---|---|---|
| Center only | Covariance matrix $\mathbf S$ | No | Variables have comparable units/scales and original variance magnitude matters |
| Center and scale | Correlation matrix $\mathbf R$ | Yes | Variables use different units or their variances should receive comparable weight |

PCA on standardized data is usually called **correlation-based PCA**, because the sample covariance matrix of the standardized data is precisely the original sample correlation matrix.

The iris lecture standardizes all four measurements using

```r
irpca <- prcomp(irvar, center = TRUE, scale. = TRUE)
```

which prevents a variable from dominating *solely* because of a numerically larger measurement scale. **[Lecture p. 4]**

### 4.5 A common misunderstanding: is scaling mandatory?

**Source check:** Pages 4 and 15 strongly prescribe scaling, with page 15 saying the data “must be scaled” before SVD. More precisely, **SVD itself does not require scaling**; it works on arbitrary rectangular matrices. For conventional PCA, centering is normally performed, while **scaling to unit variance is a substantive modeling choice**. It is strongly advisable when input units differ or when equal starting variable variances are appropriate. A covariance-based PCA without unit-variance scaling is also mathematically valid.

Scaling may be undesirable if large physical variance is scientifically meaningful. A nearly constant sensor might be noisy; forcing it to unit variance may amplify measurement noise. Conversely, not scaling rupee amounts and small ratios may let the currency column overwhelm everything.

**Decision question:** “Do I want a one-standard-deviation movement in every variable to count equally at the starting point, or do I want the original physical magnitudes to matter?”

### 4.6 Two further scaling cautions

1. **Outliers:** Means, standard deviations, and PCA directions are sensitive to extreme values. Check the data distribution and errors before analysis. Robust PCA variants exist, but they are outside the lecture's main method.
2. **Zero-variance columns:** A constant variable has $s=0$, so dividing by its standard deviation is undefined. Remove or explicitly handle constant columns before using `scale. = TRUE`.

**Teaching extension:** At prediction time, new observations must be transformed with the **training-data** means, standard deviations, and PCA rotation matrix. Recomputing means and standard deviations on a new observation changes the coordinate system and produces invalid comparisons.

---

## 5. Principal components as new directions

### 5.1 Start with a two-variable data cloud

Imagine every customer plotted using two numerical variables, $X_1$ and $X_2$. If the variables tend to increase together, points form a slanted ellipse. The old coordinates are horizontal and vertical. But much of the meaningful spread happens along the diagonal.

PCA constructs two new axes:

- **PC1:** the direction with the largest possible variance among all unit-length directions through the center.
- **PC2:** the unit-length direction with the largest remaining variance that is perpendicular to PC1.

With more than two input variables, PC3 must be perpendicular to both PC1 and PC2, and so on. **[Lecture pp. 1–2, 13]**

### 5.2 An observation gets a score on each new axis

Suppose standardized variables are $Z_1$ and $Z_2$, and a candidate PC1 direction is

$$\mathbf v_1=\begin{bmatrix}0.8\\0.6\end{bmatrix}.$$

The length is $\sqrt{0.8^2+0.6^2}=1$, so it is a valid unit direction. The PC1 **score** for an observation is

$$\boxed{\mathrm{PC1}=0.8Z_1+0.6Z_2}.$$

If the observation has $(Z_1,Z_2)=(1,2)$, its score is $0.8(1)+0.6(2)=2.0$.

For a perpendicular direction, use

$$\mathbf v_2=\begin{bmatrix}-0.6\\0.8\end{bmatrix},\qquad
\mathbf v_1^{\mathsf T}\mathbf v_2=0.8(-0.6)+0.6(0.8)=0.$$

Its PC2 score is

$$\mathrm{PC2}=-0.6Z_1+0.8Z_2=-0.6(1)+0.8(2)=1.0.$$

The original point $(1,2)$ is now represented in rotated coordinates by $(2,1)$. If we keep both components, the change is reversible. If we keep only PC1, we deliberately discard the PC2 coordinate.

### 5.3 What are loadings and scores?

The distinction is so important that it is worth repeating carefully:

| Term | What it describes | Example | Shape in R |
|---|---|---|---|
| **Loading / rotation coefficient** | Weight of an original variable in a component | $0.8$ in $\mathrm{PC1}=0.8Z_1+0.6Z_2$ | A cell of `pca$rotation` |
| **Loading vector / direction** | Collection of weights defining a PC axis | $(0.8,0.6)$ | One column of `pca$rotation` |
| **Score** | A particular observation's position on that PC axis | $\mathrm{PC1}=2.0$ for one customer | A cell of `pca$x` |
| **Component variance** | Spread of scores across observations | Perhaps 1.6 | `pca$sdev[1]^2` |
| **Explained-variance proportion** | Component variance divided by total component variance | Perhaps 0.80 | `summary(pca)` |

Some textbooks use the term *loading* for the correlation between an original variable and a component, rather than for a unit eigenvector coefficient. The lecture uses **loading** to mean the coefficients in `rotation`. To avoid confusion, this book calls the entries of `rotation` **rotation coefficients** when precision matters; a later section derives variable–PC correlations separately.

### 5.4 Why orthogonal directions lead to uncorrelated scores

Geometric perpendicularity belongs to the **directions**. Statistical uncorrelatedness belongs to the **scores** across observations. They are not synonyms in general. PCA achieves both because its directions are special eigenvectors of the covariance/correlation matrix.

Thus, it is correct to say that PCA components are mutually uncorrelated under the ordinary sample covariance definition, aside from tiny numerical rounding errors. This is what the lecturer demonstrates with all-zero off-diagonal PC correlations. **[Lecture pp. 6–7]**

### 5.5 Information preservation is about variance, not truth

If the original standardized variables contain a total variance of 4, and the first two PC variances add to 3.8324, the first two components explain

$$\frac{3.8324}{4}\times100\%=95.81\%.$$

Retaining two components preserves 95.81% of the original **total variance** under the chosen scaling. It does **not** mean each individual observation is reconstructed with 95.81% accuracy, or that we keep 95.81% of all predictive information, causal information, or scientific meaning.

### 5.6 All components versus selected components

If the original matrix has $p$ variables and we retain all $p$ PCs, PCA has only changed coordinates. A full orthogonal transformation is invertible. Actual dimensionality reduction happens when we retain $k<p$ components.

With standardized centered matrix $\mathbf A$, $p\times k$ selected direction matrix $\mathbf V_k$, and score matrix $\mathbf T_k$:

$$\boxed{\mathbf T_k=\mathbf A\mathbf V_k}.$$

Reconstruction of the standardized matrix using those $k$ components is

$$\boxed{\widehat{\mathbf A}=\mathbf T_k\mathbf V_k^{\mathsf T}}.$$

The difference $\mathbf A-\widehat{\mathbf A}$ is the **reconstruction error**. With all nonzero components retained it is essentially zero, up to floating-point precision; with fewer, it generally grows. We will calculate this explicitly using the lecture's small dataset.

---

# Part II. Work through PCA as a real calculation

## 6. The lecturer's complete four-observation example, explained by hand

**Original source:** the $4\times2$ matrix, scaled plot, SVD outputs, `prcomp()` outputs, correlation matrix, and eigenvalues appear on **lecture pp. 15–19**. This chapter reconstructs the computation carefully while preserving the numerical results printed in the PDF.

### 6.1 The starting data

The lecture gives

$$
\boxed{\mathbf X=\begin{bmatrix}
1&2\\2&1\\3&4\\4&3
\end{bmatrix}}.
$$

Call the first original variable $X_1$ and the second $X_2$:

| Observation | $X_1$ | $X_2$ |
|---:|---:|---:|
| 1 | 1 | 2 |
| 2 | 2 | 1 |
| 3 | 3 | 4 |
| 4 | 4 | 3 |

Picture these four points: $(1,2)$ and $(2,1)$ are near the lower-left, while $(3,4)$ and $(4,3)$ are near the upper-right. The cloud is longer in the direction where both variables increase together. We expect PC1 to follow the diagonal $(1,1)$ direction.

### 6.2 Calculate the column means

Both columns have the same mean:

$$\bar x_1=\frac{1+2+3+4}{4}=2.5,$$

$$\bar x_2=\frac{2+1+4+3}{4}=2.5.$$

Subtract 2.5 from every value in its own column:

$$
\mathbf X_c=\begin{bmatrix}
-1.5&-0.5\\
-0.5&-1.5\\
0.5&1.5\\
1.5&0.5
\end{bmatrix}.
$$

The centered values in each column sum to zero. Geometrically, the centroid is moved from $(2.5,2.5)$ to $(0,0)$.

### 6.3 Calculate both sample standard deviations

For $X_1$:

$$
\begin{aligned}
s_1^2&=\frac{(-1.5)^2+(-0.5)^2+(0.5)^2+(1.5)^2}{4-1}\\
&=\frac{2.25+0.25+0.25+2.25}{3}\\
&=\frac53\approx1.666667.
\end{aligned}
$$

The deviations of $X_2$ are the same four values in a different order, so $s_2^2=5/3$ as well. Hence

$$\boxed{s_1=s_2=\sqrt{\frac53}\approx1.29099445}.$$

### 6.4 Standardize each observation

Define

$$Z_1=\frac{X_1-2.5}{1.29099445},\qquad Z_2=\frac{X_2-2.5}{1.29099445}.$$

For observation 1:

$$Z_{11}=\frac{1-2.5}{1.29099445}\approx-1.161895,$$

$$Z_{12}=\frac{2-2.5}{1.29099445}\approx-0.387298.$$

All four standardized observations are:

| Observation | $Z_1$ | $Z_2$ |
|---:|---:|---:|
| 1 | $-1.161895$ | $-0.387298$ |
| 2 | $-0.387298$ | $-1.161895$ |
| 3 | $+0.387298$ | $+1.161895$ |
| 4 | $+1.161895$ | $+0.387298$ |

Therefore,

$$
\mathbf A=\operatorname{scale}(\mathbf X)\approx
\begin{bmatrix}
-1.161895&-0.387298\\
-0.387298&-1.161895\\
0.387298&1.161895\\
1.161895&0.387298
\end{bmatrix}.
$$

The `scale()` command does these operations automatically. The lecturer's graphs on page 15 contrast the original scatterplot and the standardized version. The standardized axes are centered at zero and measure standard deviations rather than original units. **[Lecture p. 15]**

### 6.5 Calculate the covariance and the correlation

We already know both original sample variances are $5/3$. Compute covariance:

$$
\begin{aligned}
s_{12}&=\frac{(-1.5)(-0.5)+(-0.5)(-1.5)+(0.5)(1.5)+(1.5)(0.5)}{3}\\
&=\frac{0.75+0.75+0.75+0.75}{3}\\
&=\frac{3}{3}=1.
\end{aligned}
$$

So the original sample covariance matrix is

$$
\boxed{\mathbf S=\begin{bmatrix}5/3&1\\1&5/3\end{bmatrix}}.
$$

The correlation is

$$r_{12}=\frac{1}{(\sqrt{5/3})(\sqrt{5/3})}=\frac{1}{5/3}=\frac35=0.6.$$

Thus the standardized covariance matrix, which equals the original sample correlation matrix, is

$$
\boxed{\mathbf R=\begin{bmatrix}1&0.6\\0.6&1\end{bmatrix}}.
$$

This reproduces the lecture's `cor(X)` output exactly. **[Lecture p. 19]**

### 6.6 Find the eigenvalues without skipping steps

An **eigenvector** of a square matrix $\mathbf R$ is a nonzero direction $\mathbf v$ such that

$$\boxed{\mathbf R\mathbf v=\lambda\mathbf v}.$$

Here $\lambda$ (Greek lambda) is the corresponding **eigenvalue**. This equation says that the matrix transformation changes the vector's length by a factor $\lambda$ but leaves its direction unchanged, allowing for reversal if $\lambda$ is negative. For a correlation matrix, the eigenvalues cannot be negative.

To find the eigenvalues of our $2\times2$ matrix, solve

$$\det(\mathbf R-\lambda\mathbf I)=0.$$

The determinant of a $2\times2$ matrix $\begin{bmatrix}a&b\\c&d\end{bmatrix}$ is $ad-bc$. So:

$$
\begin{aligned}
0&=\det\begin{bmatrix}1-\lambda&0.6\\0.6&1-\lambda\end{bmatrix}\\
&=(1-\lambda)(1-\lambda)-(0.6)(0.6)\\
&=(1-\lambda)^2-0.36.
\end{aligned}
$$

Therefore,

$$
(1-\lambda)^2=0.36,\qquad 1-\lambda=\pm0.6.
$$

There are two answers:

$$\boxed{\lambda_1=1.6,\qquad\lambda_2=0.4}.$$

They are ordered from largest to smallest. They also sum to 2, the number of standardized original variables.

### 6.7 Find the first eigenvector by hand

Use $\lambda_1=1.6$ in $\mathbf R\mathbf v_1=\lambda_1\mathbf v_1$. Let $\mathbf v_1=(a,b)^{\mathsf T}$. Then

$$\begin{bmatrix}1&0.6\\0.6&1\end{bmatrix}\begin{bmatrix}a\\b\end{bmatrix}=
1.6\begin{bmatrix}a\\b\end{bmatrix}.$$

Expanding the first row gives

$$a+0.6b=1.6a\quad\Longrightarrow\quad0.6b=0.6a\quad\Longrightarrow\quad b=a.$$

Thus PC1 points along $(1,1)$. But we require unit length:

$$a^2+b^2=1,\qquad2a^2=1,\qquad a=b=\frac1{\sqrt2}.$$

Hence

$$
\boxed{\mathbf v_1=\begin{bmatrix}0.7071068\\0.7071068\end{bmatrix}}.
$$

The vector with both values negative would represent the very same axis, only pointing in the opposite direction.

### 6.8 Find the second eigenvector by hand

Use $\lambda_2=0.4$. The first row of the eigenvector equation becomes

$$a+0.6b=0.4a\quad\Longrightarrow\quad 0.6a+0.6b=0\quad\Longrightarrow\quad b=-a.$$

Choose the unit eigenvector

$$
\boxed{\mathbf v_2=\begin{bmatrix}-0.7071068\\0.7071068\end{bmatrix}}.
$$

Check perpendicularity:

$$\mathbf v_1^{\mathsf T}\mathbf v_2=(0.7071)(-0.7071)+(0.7071)(0.7071)=0.$$

The two eigenvectors form the $2\times2$ rotation matrix

$$
\boxed{\mathbf V=\begin{bmatrix}
0.7071068&-0.7071068\\
0.7071068&0.7071068
\end{bmatrix}}.
$$

The lecture prints this matrix as the `$v` result from `svd(scale(X))`, and as the `$rotation` result from `prcomp(X, center=TRUE, scale.=TRUE)`. **[Lecture pp. 16–17]**

### 6.9 Write down the principal-component formulas

The two component formulas are

$$
\boxed{\mathrm{PC1}=0.7071068Z_1+0.7071068Z_2}
$$

and

$$
\boxed{\mathrm{PC2}=-0.7071068Z_1+0.7071068Z_2}.
$$

**Interpretation:** PC1 is a general “both variables rise together” axis. PC2 compares the second standardized variable with the first: a positive PC2 score means $Z_2$ is relatively higher than $Z_1$; a negative score means the opposite. These are rotated *coordinates*, not additional measured physical properties.

### 6.10 Calculate the PC scores for all four observations

For observation 1, $(Z_1,Z_2)=(-1.161895,-0.387298)$:

$$
\begin{aligned}
\mathrm{PC1}_1&=0.7071068(-1.161895)+0.7071068(-0.387298)\\
&\approx-1.095445,\\
\mathrm{PC2}_1&=-0.7071068(-1.161895)+0.7071068(-0.387298)\\
&\approx0.547723.
\end{aligned}
$$

Repeating for all observations gives the correctly **standardized PC-score matrix**:

$$
\boxed{
\mathbf T=\mathbf A\mathbf V\approx
\begin{bmatrix}
-1.095445&0.547723\\
-1.095445&-0.547723\\
1.095445&0.547723\\
1.095445&-0.547723
\end{bmatrix}.}
$$

| Observation | Original $(X_1,X_2)$ | Standardized PC1 score | Standardized PC2 score |
|---:|---|---:|---:|
| 1 | $(1,2)$ | $-1.095445$ | $+0.547723$ |
| 2 | $(2,1)$ | $-1.095445$ | $-0.547723$ |
| 3 | $(3,4)$ | $+1.095445$ | $+0.547723$ |
| 4 | $(4,3)$ | $+1.095445$ | $-0.547723$ |

PC1 separates the low-valued observations 1 and 2 from the high-valued observations 3 and 4. PC2 differentiates which original variable is relatively greater within each pair.

### 6.11 Verify the PC variances by hand

The PC1 mean is zero and its four scores are $(-a,-a,+a,+a)$, with $a=1.095445$.

$$
\begin{aligned}
s_{\mathrm{PC1}}^2&=\frac{(-a)^2+(-a)^2+a^2+a^2}{3}\\
&=\frac{4(1.095445^2)}{3}\\
&=\frac{4(1.2)}{3}=1.6.
\end{aligned}
$$

Similarly, with $b=0.547723$:

$$s_{\mathrm{PC2}}^2=\frac{4(0.547723^2)}3=\frac{4(0.3)}3=0.4.$$

Therefore:

$$\boxed{\operatorname{Var}(\mathrm{PC1})=1.6,\qquad\operatorname{Var}(\mathrm{PC2})=0.4}.$$

The eigenvalues match the component variances exactly, as the lecture states in its population and sample PCA results. **[Lecture pp. 17–19]**

### 6.12 Calculate the explained variance

The total standardized variance is

$$1+1=2=1.6+0.4.$$

The explained-variance fractions are

$$\boxed{\mathrm{PVE}_1=\frac{1.6}{2}=0.8=80\%},$$

$$\boxed{\mathrm{PVE}_2=\frac{0.4}{2}=0.2=20\%}.$$

PVE means **proportion of variance explained**. The cumulative proportion is 80% after PC1 and 100% after PC2. This reproduces `summary(Xpca)` on **lecture p. 17** and `summary(pca_princomp)` on **lecture pp. 19–20**.

Standard deviations of the PCs are

$$\sqrt{1.6}=1.2649111,\qquad\sqrt{0.4}=0.6324555.$$

This matches the lecture's `princomp` standard deviations on **p. 19** and `prcomp` rounded standard deviations on **p. 17**.

### 6.13 Reconstruct the original data after keeping only PC1

This is a **Teaching extension**: the lecture illustrates information preservation through images but does not work out a small numerical reconstruction.

Retain only $\mathbf v_1=(0.7071068,0.7071068)$ and each observation's PC1 score. The reconstructed standardized point is

$$\widehat{\mathbf a}_i=t_{i1}\mathbf v_1.$$

For observation 1:

$$
\widehat{\mathbf a}_1\approx-1.095445
\begin{bmatrix}0.7071068\\0.7071068\end{bmatrix}
=\begin{bmatrix}-0.774597\\-0.774597\end{bmatrix}.
$$

Undo the standardization, using $x_j\approx\bar x_j+s_j\widehat a_j$:

$$\widehat x_1=2.5+1.290994(-0.774597)=1.5,$$

$$\widehat x_2=2.5+1.290994(-0.774597)=1.5.$$

Thus original $(1,2)$ is approximated by $(1.5,1.5)$. The one-PC reconstructions for all observations are:

| Original point | One-PC reconstruction | What was discarded? |
|---|---|---|
| $(1,2)$ | $(1.5,1.5)$ | Small difference between the two variables |
| $(2,1)$ | $(1.5,1.5)$ | Same |
| $(3,4)$ | $(3.5,3.5)$ | Same |
| $(4,3)$ | $(3.5,3.5)$ | Same |

Retaining PC1 keeps 80% of the standardized dataset's sum-of-squares variation; PC2 accounts for the remaining 20%. In standardized units, the total squared reconstruction error over all four observations is $3(0.4)=1.2$, while total centered squared variation is $3(2)=6$. So the preserved fraction is $(6-1.2)/6=0.8$.

### 6.14 Source check: an important mismatch in the lecture's matrix multiplication

The lecture prints this command and these exact results on **p. 16**:

```r
X %*% svd(scale(X))$v

#          [,1]       [,2]
# [1,] 2.121320  0.7071068
# [2,] 2.121320 -0.7071068
# [3,] 4.949747  0.7071068
# [4,] 4.949747 -0.7071068
```

**These printed numbers are mathematically correct for that exact command.** However, the command multiplies the **unstandardized** matrix `X` by eigenvectors computed from the **standardized** matrix. It therefore gives *rotated raw coordinates*, not the standardized, centered PC scores used by `prcomp(X, center=TRUE, scale.=TRUE)`.

For the standardized PCA scores taught immediately above, use **either**:

```r
scale(X) %*% svd(scale(X))$v
```

**or**:

```r
Xpca <- prcomp(X, center = TRUE, scale. = TRUE)
Xpca$x
```

These give PC1 scores approximately $-1.095445,-1.095445,+1.095445,+1.095445$, rather than $2.121320,2.121320,4.949747,4.949747$. The lecture's numerical output is preserved here, but its interpretation as standardized PCA scores needs this distinction.

### 6.15 A second subtlety: the sign of a PC can reverse

If your software displays

$$\mathrm{PC1}=-0.7071Z_1-0.7071Z_2,$$

instead of the positive-coefficient version, it is not necessarily wrong. Multiplying an eigenvector by $-1$ produces an equally valid direction. All PC1 scores also reverse sign, but variance, explained variance, distances, and substantive information are unchanged. The lecturer explicitly notes that PC signs are arbitrary in component interpretation. **[Lecture p. 8]**

---

## 7. How many principal components should we retain?

**Lecture pp. 5–6** introduce three approaches using the iris results: the cumulative explained variance from `summary()`, the scree plot, and the Kaiser–Guttman eigenvalue-greater-than-one rule.

### 7.1 The answer depends on your purpose

Suppose ten original variables become ten principal components. Keeping all ten provides a rotated representation, but no dimensionality reduction. Keeping only one provides enormous simplification, but may discard too much information. The objective is to balance retained variance, interpretability, intended use, and acceptable information loss.

There is **no universal rule** that always selects the right number. It is important to understand what each criterion means, not only its name.

### 7.2 Method 1: explained and cumulative explained variance

Write the ordered component variances as $\lambda_1,\ldots,\lambda_p$. The variance proportion explained by PC $j$ is

$$\boxed{\mathrm{PVE}_j=\frac{\lambda_j}{\lambda_1+\cdots+\lambda_p}}.$$

The cumulative proportion for the first $k$ PCs is

$$\boxed{\mathrm{CPVE}_k=\frac{\lambda_1+\cdots+\lambda_k}{\lambda_1+\cdots+\lambda_p}}.$$

For the lecturer's **scaled iris** PCA, `summary(irpca)` reports:

| Output | PC1 | PC2 | PC3 | PC4 |
|---|---:|---:|---:|---:|
| Standard deviation | 1.7084 | 0.9560 | 0.38309 | 0.14393 |
| Proportion of variance | 0.7296 | 0.2285 | 0.03669 | 0.00518 |
| Cumulative proportion | 0.7296 | 0.9581 | 0.99482 | 1.00000 |

**[Lecture p. 5]**

Read the second row aloud: PC1 captures **72.96%** of variance, PC2 captures **22.85%**, PC3 **3.669%**, and PC4 **0.518%** (with minor rounding). Together, PC1 and PC2 capture **95.81%**.

Imagine retaining two components because you consider a 95% total-variance target acceptable. Here, two is enough, while one (72.96%) is not. **Teaching extension:** The 95% cutoff is a choice, not a universal statistical theorem; the lecture's actual choice of two components is supported by its variance target and scree-plot interpretation.

### 7.3 Method 2: the scree plot

A **scree plot** places component number along the horizontal axis and component variance (eigenvalue) along the vertical axis. The largest component is on the left. Variances are ordered so the line does not increase as you move right.

For iris, the component variances are reported as:

| PC | Variance, $\lambda_j$ |
|---|---:|
| PC1 | 2.91849782 |
| PC2 | 0.91403047 |
| PC3 | 0.14675688 |
| PC4 | 0.02071484 |

Visualize the plot: a large fall from PC1 to PC2, a further fall to PC3, and a nearly flat tail by PC4. The lecturer identifies a bend or **elbow around PC2** and favors keeping the first two components. **[Lecture pp. 5–6]**

A scree elbow is partly a matter of judgment. On some datasets there is no clear elbow; small changes in the data can change the visual impression. A steep decrease alone does not tell you whether a component is practically important.

In R:

```r
plot(irpca, type = "l", pch = 19)
# Alternatives shown in the lecture:
# plot(irpca)
# screeplot(irpca)
```

`type = "l"` requests lines; `pch = 19` specifies a filled-circle plotting symbol, though its visual effect depends on the plotting method. `plot(irpca)` uses the `prcomp` plot method and displays component variances.

### 7.4 Method 3: Kaiser–Guttman rule

For **standardized data**, the average variance of an original variable is 1. The Kaiser rule suggests keeping components with eigenvalue **greater than 1**:

$$\boxed{\lambda_j>1\quad\text{(Kaiser criterion, standardized PCA only)}}.$$

Why 1? A PC with variance below 1 explains less variance than the variance of one standardized original variable. This is the reasoning given in the lecture. **[Lecture pp. 5–6]**

**Source check: the three methods do not agree for iris.** The reported eigenvalues are $2.91849782$, $0.91403047$, $0.14675688$, and $0.02071484$. Only PC1 is **greater than 1**. So the Kaiser criterion selects **one** component, whereas the lecture's 95%-variance/scree-plot reasoning selects **two**. The lecture chooses two overall; that is a defensible decision, but it is inaccurate to say Kaiser independently supports keeping two. This discrepancy is essential to recognize in an examination answer.

The Kaiser criterion is a heuristic and can retain too many or too few components in particular datasets. It should not override the purpose of the analysis.

### 7.5 What the R commands mean

```r
summary(irpca)       # sdev, PVE, cumulative PVE
irpca$sdev            # standard deviations only
irpca$sdev^2          # variances / eigenvalues
plot(irpca)           # scree plot
```

The `^2` squares every standard-deviation value. For example, $1.7083611^2\approx2.91849782$.

Remember: **never compare standard deviations with 1 when applying Kaiser's eigenvalue rule**. Compare the **variances**, which are the squared standard deviations, with 1.

### 7.6 Further selection approaches

**Teaching extension, not a lecture-listed selection rule:** In predictive workflows, evaluate downstream test performance using a properly separated validation set or cross-validation. In unsupervised reconstruction workflows, compare reconstruction error. In scientific work, interpretability and the stability of component directions can matter more than a fixed percentage cutoff. These approaches answer different questions from the scree plot and Kaiser rule.

### 7.7 A short worked retention exercise

A standardized PCA of five original variables gives eigenvalues $2.7,1.2,0.7,0.3,0.1$. Check the total: $2.7+1.2+0.7+0.3+0.1=5$.

- PC1 explains $2.7/5=54\%$.
- PC2 explains $1.2/5=24\%$.
- Two PCs cumulatively explain $78\%$.
- Three PCs explain $(2.7+1.2+0.7)/5=92\%$.
- Kaiser retains PCs 1 and 2 because their eigenvalues exceed 1.
- A rule requiring **at least 90%** variance retains **three**, not two.

The different answers are not arithmetic mistakes; the rules optimize different goals.

---

## 8. Understanding the lecturer's iris results before running any code

### 8.1 What is the iris dataset?

The built-in R dataset `iris` has **150 observations** of iris flowers and five columns: four numerical measurements and one species category. The measurements are `Sepal.Length`, `Sepal.Width`, `Petal.Length`, and `Petal.Width`. The fifth column, `Species`, identifies the categories `setosa`, `versicolor`, and `virginica`. **[Lecture pp. 2–3]**

| Column | Data type | Everyday interpretation | Used in PCA? |
|---|---|---|---|
| `Sepal.Length` | Numeric | Sepal length | Yes |
| `Sepal.Width` | Numeric | Sepal width | Yes |
| `Petal.Length` | Numeric | Petal length | Yes |
| `Petal.Width` | Numeric | Petal width | Yes |
| `Species` | Categorical factor | Flower species label | **No**; used later for plot colors/groups |

The first six rows printed in the lecture are:

| Row | Sepal.Length | Sepal.Width | Petal.Length | Petal.Width | Species |
|---:|---:|---:|---:|---:|---|
| 1 | 5.1 | 3.5 | 1.4 | 0.2 | setosa |
| 2 | 4.9 | 3.0 | 1.4 | 0.2 | setosa |
| 3 | 4.7 | 3.2 | 1.3 | 0.2 | setosa |
| 4 | 4.6 | 3.1 | 1.5 | 0.2 | setosa |
| 5 | 5.0 | 3.6 | 1.4 | 0.2 | setosa |
| 6 | 5.4 | 3.9 | 1.7 | 0.4 | setosa |

The last six printed rows, 145–150, belong to `virginica`. They are preserved here for cross-checking the code and new-observation demonstration: **[Lecture p. 3]**

| Row | Sepal.Length | Sepal.Width | Petal.Length | Petal.Width | Species |
|---:|---:|---:|---:|---:|---|
| 145 | 6.7 | 3.3 | 5.7 | 2.5 | virginica |
| 146 | 6.7 | 3.0 | 5.2 | 2.3 | virginica |
| 147 | 6.3 | 2.5 | 5.0 | 1.9 | virginica |
| 148 | 6.5 | 3.0 | 5.2 | 2.0 | virginica |
| 149 | 6.2 | 3.4 | 5.4 | 2.3 | virginica |
| 150 | 5.9 | 3.0 | 5.1 | 1.8 | virginica |

### 8.2 Why not include `Species` in this PCA?

PCA assumes the numerical columns define measurements that can be added, centered, scaled, and combined. Species labels are names, not ordinary numerical measurements. Assigning setosa $=1$, versicolor $=2$, virginica $=3$ would introduce arbitrary and potentially misleading numerical distances.

This PCA is **unsupervised**: the algorithm does not know the species when choosing axes. Species labels are added **afterward**, to interpret the geometry and see whether observations cluster in recognizable groups.

**Source check:** The lecture says PCA is based only on “predictor numerical variables.” For *this specific demonstration*, it means use the four numerical columns as PCA inputs and keep the class label aside. PCA generally needs appropriate numerical feature measurements, but it does not require that they be “predictors” in a supervised modeling problem.

### 8.3 Interpret the original correlation matrix picture

The plot on **lecture p. 4** is a pairs panel for the four original numeric variables. Its:

- **diagonal panels** show the distributions of individual features;
- **lower-triangle panels** show scatterplots for pairs of features;
- **upper-triangle panels** show numeric correlations.

The lecture reports the six unique correlations:

| Variable pair | Approximate correlation | Interpretation |
|---|---:|---|
| Sepal.Length with Sepal.Width | $-0.12$ | Weak negative linear association |
| Sepal.Length with Petal.Length | $+0.87$ | Strong positive association |
| Sepal.Length with Petal.Width | $+0.82$ | Strong positive association |
| Sepal.Width with Petal.Length | $-0.43$ | Moderate negative association, depending on terminology |
| Sepal.Width with Petal.Width | $-0.37$ | Negative association |
| Petal.Length with Petal.Width | $+0.96$ | Very strong positive association |

The strongest relationship is between the two petal measurements. This suggests that the four original features are not carrying four completely separate stories. PCA is a reasonable exploratory reduction technique.

### 8.4 Why standardization comes first

The lecturer runs

```r
irpca <- prcomp(irvar, center = TRUE, scale. = TRUE)
```

It builds PCA from four measurements after converting each to a mean-zero, unit-variance scale. Since there are four numeric columns, R returns up to four PCs, named `PC1`, `PC2`, `PC3`, and `PC4`.

### 8.5 The importance of the components

As shown earlier, the four PC standard deviations are approximately:

$$1.7083611,\quad0.9560494,\quad0.3830886,\quad0.1439265.$$

Squaring them gives the lecture's variances:

$$2.91849782,\quad0.91403047,\quad0.14675688,\quad0.02071484.$$

They sum to 4, as expected for four standardized variables. PC1 explains about 73% and PC2 about 22.9%; together they explain about 95.8%. **[Lecture pp. 5–6, 10]**

### 8.6 Interpret the iris loading/rotation table

The lecture prints the following rotation coefficients. **[Lecture pp. 7–8]**

| Original variable | PC1 | PC2 | PC3 | PC4 |
|---|---:|---:|---:|---:|
| Sepal.Length | $+0.5210659$ | $-0.37741762$ | $+0.7195664$ | $+0.2612863$ |
| Sepal.Width | $-0.2693474$ | $-0.92329566$ | $-0.2443818$ | $-0.1235096$ |
| Petal.Length | $+0.5804131$ | $-0.02449161$ | $-0.1421264$ | $-0.8014492$ |
| Petal.Width | $+0.5648565$ | $-0.06694199$ | $-0.6342727$ | $+0.5235971$ |

**PC1 formula:**

$$
\begin{aligned}
\mathrm{PC1}\approx{}&0.5211Z_{\mathrm{SL}}-0.2693Z_{\mathrm{SW}}\\
&+0.5804Z_{\mathrm{PL}}+0.5649Z_{\mathrm{PW}}.
\end{aligned}
$$

The four $Z$ variables are the standardized original sepal and petal measurements.

PC1 gives *positive weight* to sepal length, petal length, and petal width, but a *negative weight* to sepal width. It represents a contrast between these groups of standardized measurements. A flower with a high PC1 score tends, **relative to the data averages**, to have larger petals and sepal length and/or smaller sepal width. One should not interpret any coefficient in isolation, because the PC score is a weighted combination of all four values.

**PC2 formula:**

$$
\begin{aligned}
\mathrm{PC2}\approx{}&-0.3774Z_{\mathrm{SL}}-0.9233Z_{\mathrm{SW}}\\
&-0.0245Z_{\mathrm{PL}}-0.0669Z_{\mathrm{PW}}.
\end{aligned}
$$

The dominant absolute coefficient is $0.9233$ for **Sepal.Width**. Therefore PC2 is particularly sensitive to sepal width, with an additional contribution from sepal length. The fact that every coefficient is negative is partly a sign convention. Flip the entire PC2 direction and they all become positive with exactly the same variance explained.

**Interpretation warning:** A large **absolute** rotation coefficient is evidence of a stronger weight in that component formula, but not automatically of greater causal influence or greater importance for predicting species. Also, **do not** describe PC2 as the same information as PC1: the axes are perpendicular and the component scores are uncorrelated.

### 8.7 Why the squared rotation coefficients sum to one

For PC1, the full-precision values satisfy

$$0.5210659^2+(-0.2693474)^2+0.5804131^2+0.5648565^2\approx1.$$

The lecturer checks this using

```r
sum(irpca$rotation[, 1]^2)
# [1] 1
```

Similarly, for PC2:

```r
sum(irpca$rotation[, 2]^2)
# [1] 1
```

This is the **unit-length** constraint on the direction vectors. It does **not** mean each PC explains 100% of the dataset's variance.

### 8.8 Interpret the post-PCA correlation plot

The lecture produces a second scatterplot matrix using the **component scores** rather than the original measurements. The upper-triangle values printed on **p. 7** are all **0.00**. This confirms that distinct principal-component scores have zero **linear correlation** in the fitted dataset, within displayed rounding.

The lower scatterplot panels may still contain visible structures or clusters, particularly if colored by species. Zero correlation does not mean the plotted points are independently distributed or have no nonlinear relationship.

### 8.9 Why PC1 separates setosa

The species-colored biplot on **p. 10** shows the red `setosa` observations concentrated well to the **left** on PC1, while `versicolor` and `virginica` occupy regions further to the right, with more overlap between those two groups. The lecture therefore says PC1 separates setosa from the other two species.

This finding is **descriptive**. The unsupervised PCA did not learn to maximize group separation. It happened to discover a high-variance direction along which setosa differs strongly from the other observations. A classification model would still require separate fitting and evaluation.

### 8.10 Use PC1 and PC2 as a two-dimensional representation

When plotted on PC1 and PC2, each flower is represented by a pair of numbers:

$$\bigl(t_{i1},t_{i2}\bigr).$$

Originally each flower had four numerical measurements. The two PC scores collectively account for approximately 95.81% of the standardized total variance, making a two-axis plot reasonably informative. The visual can highlight groups, overlap, trends, and observations far from a cluster. It cannot prove that the discarded 4.19% is irrelevant to every task.

---

# Part III. Run PCA in R and interpret every result

## 9. R from absolute zero: enough language to follow the lecture

### 9.1 What is R, and where does `prcomp()` come from?

**R** is a programming language and computational environment used for statistics and graphics. You can type commands into an R console; an IDE such as RStudio offers an editor, plots, and a console in one window. The lecture uses the base `stats` package function **`prcomp()`**, which performs PCA by singular value decomposition (SVD). **[Lecture p. 2]**

You do **not** need to know SVD before running `prcomp()` properly. You must, however, understand which columns you give it, how the values are preprocessed, and what the returned scores and rotation coefficients mean. The mathematics follows in Part IV. The lecturer additionally refers readers to Gregory B. Anderson's *Principal Component Analysis in R* document on Moodle, but that separate resource is not part of the 21-page source; this book does not invent or attribute material to it. **[Lecture p. 2]**

### 9.2 First R commands, explained

```r
x <- c(1, 2, 3, 4)
mean(x)
sd(x)
var(x)
scale(x)
```

Read these commands literally:

| R syntax | Meaning |
|---|---|
| `<-` | Assign the value on the right to the name on the left |
| `c(1, 2, 3, 4)` | Combine values into a vector |
| `mean(x)` | Compute the sample arithmetic mean |
| `sd(x)` | Compute the sample standard deviation |
| `var(x)` | Compute the sample variance |
| `scale(x)` | Center and standardize by default |
| `# comment` | R ignores the rest of that line |
| `TRUE`, `FALSE` | Logical values |

Do not type a displayed console output such as `[1] 2.5` as a command. The `[1]` notation in R's console output is an index marker, not part of the value.

### 9.3 Understand data frames, columns, and indexing

A **data frame** is a rectangular table that can store numeric columns and text/factor columns together. `iris` is a data frame. Its first four columns are numeric; the last is a categorical factor.

```r
iris[1, 1]       # One value: row 1, column 1
iris[1, ]        # All columns for row 1
iris[, 1]        # All rows for column 1
iris[, 1:4]      # All rows, columns 1, 2, 3, and 4
iris[, 5]        # All rows, the fifth column
iris$Species     # The Species column, selected by name
```

The pattern is `object[rows, columns]`. An empty part means “all rows” or “all columns.” The colon `1:4` produces the integer sequence 1, 2, 3, 4.

### 9.4 The basics of packages

```r
library(psych)
```

loads the installed `psych` package into the current session. If R reports that the package is not installed, you can generally try

```r
install.packages("psych")
library(psych)
```

The `install.packages()` command installs a package, usually once per R setup. `library()` loads it for a session. Package installation depends on the R version, network, repository availability, and operating system; a successful installation is not guaranteed. `prcomp()`, `plot()`, `cor()`, `predict()`, `svd()`, and `eigen()` used in the core analysis do not require `psych`, `ggbiplot`, or `devtools`.

### 9.5 R is case-sensitive

`iris`, `Iris`, and `IRIS` are different names. Likewise, `PC1` is not `pc1`. An especially common beginner error is using the word `scale` instead of the documented `prcomp` argument `scale.` with its **trailing period**.

Correct:

```r
prcomp(irvar, center = TRUE, scale. = TRUE)
```

Avoid relying on abbreviated/partial argument matching:

```r
# prcomp(irvar, center = TRUE, scale = TRUE)  # May partially match; prefer scale. explicitly
```

The lecture's formatted PDF sometimes inserts visual spaces inside command names (for example, `pairs . panels`); these are typesetting artifacts. The runnable code in this teaching book uses standard R syntax without those spaces.

---

## 10. Reproduce the iris PCA in R, one step at a time

### 10.1 Load the dataset and explore its structure

Lecture code, cleaned only for runnable spacing:

```r
data(iris)
str(iris)
head(iris)
tail(iris)
```

- `data(iris)` makes the built-in dataset available. In many R sessions, `iris` is already accessible.
- `str(iris)` shows the object type, its 150 rows, five variables, data types, and a preview of their contents.
- `head(iris)` displays the first six rows unless you request a different number.
- `tail(iris)` displays the last six rows.

What to check from `str(iris)`: the four measurement columns say `num`; the species column says `Factor` with three levels. Factor values are categorical labels, even if their internal R storage is integer-coded. **[Lecture pp. 2–3]**

### 10.2 Separate the numerical features and species labels

```r
irvar  <- iris[, 1:4]
irspec <- iris[, 5]
```

`irvar` is a 150-row, 4-column numerical data frame. `irspec` is a vector of 150 species labels. They have the same row order. Separating these two objects protects us from accidentally treating a species category as a numeric PCA variable.

A useful beginner check:

```r
dim(irvar)       # 150 4
names(irvar)     # Original measurement column names
table(irspec)    # Frequency of each species
```

The standard iris dataset has 50 observations of each species.

### 10.3 Inspect the original-variable relationships

The lecturer uses **`psych::pairs.panels()`**:

```r
library(psych)
pairs.panels(
  irvar,
  gap = 0,
  bg = c("red", "yellow", "blue")[irspec],
  pch = 21
)
```

Here is what each part does:

| Code fragment | Role |
|---|---|
| `pairs.panels(irvar, ...)` | Creates a matrix of plots for all combinations of numeric columns |
| `gap = 0` | Adjusts spacing between plot panels |
| `c("red", "yellow", "blue")` | Supplies three colors |
| `[irspec]` | Indexes those colors by the three factor groups |
| `bg = ...` | Assigns point background/fill colors |
| `pch = 21` | Uses a plot symbol with a fillable interior |

The PDF's page-4 plot uses upper-triangle correlations, diagonal distributions, and lower-triangle scatterplots. The petal length and width correlation is approximately **0.96**. We should not skip this exploratory step: it explains why a reduction in dimension might preserve much of the observed structure. **[Lecture pp. 3–4]**

**Teaching extension: a base-R fallback** if `psych` is not installed:

```r
pairs(
  irvar,
  col = c("red", "goldenrod", "blue")[as.integer(irspec)],
  pch = 19
)
cor(irvar)
```

This fallback does not produce the *same* full `pairs.panels` display, but it shows relationships and prints a correlation matrix without extra packages.

### 10.4 Fit `prcomp()`

```r
irpca <- prcomp(irvar, center = TRUE, scale. = TRUE)
```

Explain the entire statement:

- `prcomp(...)` is the PCA computation.
- `irvar` is the numerical input data with shape $150\times4$.
- `center = TRUE` subtracts each training column mean.
- `scale. = TRUE` divides each centered column by its sample standard deviation.
- `irpca <-` stores the result for reuse.

`prcomp()` returns an object of class `prcomp`. You can extract its named elements with `$`.

### 10.5 Explore the returned object

```r
class(irpca)        # "prcomp"
names(irpca)        # Inspect stored results
irpca$sdev          # Four component standard deviations
irpca$rotation      # Four-by-four rotation matrix
irpca$center        # Four training means
irpca$scale         # Four training standard deviations
irpca$x             # 150-by-4 observation-score matrix
```

The most important elements are:

| Element | Intended interpretation | Typical shape here |
|---|---|---|
| `irpca$sdev` | SD of PC scores | Length 4 |
| `irpca$rotation` | Rotation coefficients defining the PC axes | $4\times4$ |
| `irpca$x` | Each flower's four PC scores | $150\times4$ |
| `irpca$center` | Original variable means used in centering | Length 4 |
| `irpca$scale` | Original variable SDs used in scaling | Length 4 |

A helpful dimensionality check:

$$\underbrace{\mathbf A}_{150\times4}\underbrace{\mathbf V}_{4\times4}=\underbrace{\mathbf T}_{150\times4}.$$

### 10.6 Interpret `summary(irpca)` line by line

```r
summary(irpca)
```

The PDF reports:

```text
Importance of components:
                          PC1     PC2      PC3      PC4
Standard deviation     1.7084  0.9560  0.38309  0.14393
Proportion of Variance 0.7296  0.2285  0.03669  0.00518
Cumulative Proportion 0.7296  0.9581  0.99482  1.00000
```

The **first** row gives standard deviations, not proportions. To obtain the variances, square them. The **second** row tells you what fraction of the total variance lies along each direction. The **third** is a running sum of the second row.

A good examination interpretation is:

> PCA was performed on four standardized iris measurements. PC1 explains approximately 72.96% of their total variance, and PC2 explains another 22.85%. Together they explain approximately 95.81%; therefore, using the first two components gives a compact two-dimensional representation that retains most of the variance in the four original variables.

Do not write that 95.81% of flowers are classified correctly. PCA has not classified a single flower.

### 10.7 Recreate the percentages from the standard deviations

```r
pc_var <- irpca$sdev^2
pc_var
# [1] 2.91849782 0.91403047 0.14675688 0.02071484

prop_var <- pc_var / sum(pc_var)
prop_var

cum_prop_var <- cumsum(prop_var)
cum_prop_var
```

Interpret the operators:

- `^2` squares each element.
- `sum(pc_var)` adds the four component variances.
- `/` divides each component variance by that total.
- `cumsum()` calculates successive running totals.

Since scaling makes each original variable variance 1, `sum(pc_var)` should be approximately **4**. A tiny numerical difference from 4 due to floating-point arithmetic is normal.

### 10.8 Verify orthogonality and uncorrelated components

```r
cor(irpca$x)
```

The diagonal should be 1, while off-diagonal numbers should be zero or extremely close to zero (for example, $10^{-16}$). Such tiny values are computing round-off, not evidence of material correlations.

To verify the direction vectors themselves:

```r
t(irpca$rotation) %*% irpca$rotation
```

This should give an identity matrix, to numerical precision. `t(...)` transposes the matrix; `%*%` multiplies matrices. This checks the **geometric** relationship between directions. `cor(irpca$x)` checks the **statistical** relationship between scores. **[Lecture pp. 6–7]**

### 10.9 Interpret `print(irpca)` and its coefficients

```r
print(irpca)
```

The printed output contains the four PC standard deviations and the **rotation matrix**. The row names are the original variables; columns are the PCs. An entry such as `0.5804131` at the intersection of `Petal.Length` and `PC1` is a multiplier on standardized petal length in the PC1 formula.

Do not interpret `rotation[3,1] = 0.5804131` as “petal length explains 58% of PC1.” It is a coordinate weight. It can be negative, and it is constrained together with the other weights so the column has length 1.

```r
irpca$rotation[, 1]   # Entire PC1 direction
irpca$rotation[, 2]   # Entire PC2 direction
sum(irpca$rotation[, 1]^2)
sum(irpca$rotation[, 2]^2)
```

Both sums of squares should be 1. **[Lecture pp. 7–8]**

### 10.10 Compute an actual iris PC score manually

**Teaching extension based on the lecture's model:** Take the **first flower**, whose original measurements are $(5.1,3.5,1.4,0.2)$. The approximate dataset means are

$$\bar{\mathbf x}=(5.843333,\ 3.057333,\ 3.758000,\ 1.199333),$$

and the sample SDs are approximately

$$\mathbf s=(0.828066,\ 0.435866,\ 1.765298,\ 0.762238).$$

Standardize each measurement:

$$\begin{aligned}
Z_{\mathrm{SL}}&=(5.1-5.843333)/0.828066\approx-0.897674,\\
Z_{\mathrm{SW}}&=(3.5-3.057333)/0.435866\approx1.015602,\\
Z_{\mathrm{PL}}&=(1.4-3.758)/1.765298\approx-1.335752,\\
Z_{\mathrm{PW}}&=(0.2-1.199333)/0.762238\approx-1.311052.
\end{aligned}$$

Multiply by the lecturer's PC1 direction:

$$
\begin{aligned}
t_{11}\approx{}&0.5210659(-0.897674)-0.2693474(1.015602)\\
&+0.5804131(-1.335752)+0.5648565(-1.311052)\\
\approx{}&-2.25714.
\end{aligned}
$$

The first flower has a **negative PC1 score**, consistent with the lower PC1 location of setosa in the lecture's grouped plot. This is not a special-case formula: every flower uses the same four means, four SDs, and four PC1 coefficients.

Use R to inspect the corresponding value:

```r
irpca$x[1, 1]
```

The exact output depends on the full numerical precision retained by R, and the **sign may reverse across equivalent PCA implementations**.

---

## 11. Understand every PCA graph in the lecture

### 11.1 Scatterplot matrix of the original measurements

**[Lecture p. 4]** The original-variable pairs panel presents distributions, associations, and species-colored points. Its headline correlations include 0.87, 0.82, and 0.96, giving a reason to try dimensionality reduction.

Look at the shape of the petal length versus petal width plot: points increase together along a pronounced diagonal. A near-diagonal cloud means much of the variation can be summarized by one joint direction. The sepal width relationships are noticeably different, so it would be a mistake to claim all four variables behave identically.

### 11.2 The scree plot

**[Lecture pp. 5–6]** This plots component **variance**, in decreasing order. In the iris analysis the first variance is about 2.92, the second 0.91, the third 0.15, and the fourth 0.02. The lecturer identifies an elbow around PC2. Visualize the scree plot as the quantity of new variation each additional component contributes.

```r
plot(irpca, type = "l", pch = 19)
```

A scree plot does **not** show the distribution of individual flowers, direction weights, or classification accuracy.

### 11.3 The PC-score pairs panel

**[Lecture pp. 6–7]** The lecturer runs:

```r
pairs.panels(
  irpca$x,
  gap = 0,
  bg = c("red", "yellow", "blue")[irspec],
  pch = 21
)
```

Here `irpca$x` is the full score matrix. Although there are four score columns, every pair of *different* score columns is uncorrelated by PCA construction. The displayed upper-triangle correlation values are 0.00. The lower panels show where species groups sit in the rotated coordinate system.

**Common error:** Running `pairs.panels(irpca$rotation)` would plot the **four original-variable weights**, not the **150 observations**. That is the wrong object if you want to see whether the species observations separate.

### 11.4 Basic biplot: scores and variable directions on one graph

The lecturer runs

```r
biplot(irpca, choices = c(1, 2), cex = 0.55)
```

**[Lecture pp. 8–9]** A **biplot** displays two complementary kinds of information in a shared two-dimensional presentation:

- **Observation markers or labels:** where each flower lies in the PC1–PC2 plane (its scores, possibly rescaled by the plotting function).
- **Variable arrows:** approximate directions of association of original measurement variables with the displayed PC axes.

Read it in a sequence:

1. Check the horizontal and vertical PC labels.
2. Look at the locations of individual observations or group clusters.
3. Look at each original-variable arrow's direction.
4. Compare arrow angles and relative orientations only with awareness of the scaling convention used in the plot.
5. Decide what the map suggests, while remembering some variance lies outside the displayed plane.

`choices = c(1, 2)` chooses PC1 for the horizontal axis and PC2 for the vertical axis. `c(1,2)` is the vector of component numbers. `cex = 0.55` makes labels smaller relative to the default plotting text size.

**Important plotting nuance:** Standard R `biplot()` often uses different scales for observations and variable arrows, including different tick scales on opposite sides of the plot. It is **not safe** to compare arrow-tip coordinates directly with the scores' numerical axis without checking how the biplot is scaled. The visual is a joint representation, not a single simple scatterplot with arrows measured in identical units.

### 11.5 Arrow angles and relationships

In the iris biplot, Petal.Length and Petal.Width arrows point almost in the same direction, which agrees with their strong positive correlation (about 0.96) in the original data. Sepal.Length broadly points toward the positive PC1 side; Sepal.Width points mainly toward the negative PC2 side in the lecture's chosen sign convention. **[Lecture pp. 9–10]**

A useful *approximate* biplot interpretation for appropriately scaled variable vectors is:

- **Small angle:** variables tend to be positively related.
- **Angle near 90°:** variables have little linear association in the displayed space.
- **Angle near 180°:** variables tend to be negatively related.

**Source check:** These rules are approximations that depend on the biplot's scaling and the quality of its two-dimensional representation. When only two of four PCs are plotted, the full variable correlation may not be exactly represented by the displayed arrow angle. For a precise original-variable correlation, use `cor(irvar)` instead.

### 11.6 Species-colored grouped biplot using `ggbiplot`

The lecture's example is:

```r
library(devtools)
# install_github("vqv/ggbiplot")
library(ggbiplot)

ggbiplot(
  irpca,
  choices = c(1, 2),
  groups = irspec,
  obs.scale = 1,
  var.scale = 1,
  ellipse = TRUE
)
```

**[Lecture pp. 9–10]**

Interpret each argument:

| Argument | Meaning |
|---|---|
| `irpca` | The fitted PCA object |
| `choices = c(1, 2)` | Display PC1 versus PC2 |
| `groups = irspec` | Use species categories to color observations |
| `obs.scale = 1` | Control observation coordinates' scaling within this biplot implementation |
| `var.scale = 1` | Control variable-vector scaling within this implementation |
| `ellipse = TRUE` | Add group ellipses to help visualize distributions |

The grouped plot on **p. 10** has **PC1 (73.0% explained variance)** on the horizontal axis and **PC2 (22.9% explained variance)** on the vertical axis. The red setosa group is strongly separated to the left. The other two species show partial separation and some overlap.

**Package note:** The slide uses a commented GitHub installation step and the `ggbiplot` package. Package installation and compatibility may vary across R environments. The core PCA computations do not depend on this package. If installation fails, a base-R PC-score scatterplot can communicate the most important result.

### 11.7 Group-free and package-free alternative

The following **Teaching extension** produces a group-colored PC-score plot using only base R:

```r
col_vec <- c("red", "goldenrod", "blue")[as.integer(irspec)]
plot(
  irpca$x[, 1],
  irpca$x[, 2],
  col = col_vec,
  pch = 19,
  xlab = "PC1 (72.96% explained variance)",
  ylab = "PC2 (22.85% explained variance)",
  main = "Iris observations in PCA score space"
)
legend(
  "topright",
  legend = levels(irspec),
  col = c("red", "goldenrod", "blue"),
  pch = 19,
  bty = "n"
)
```

This is a **scores-only scatterplot**, not a biplot: it omits the original-variable arrows. That makes it simpler for first-time learners and excellent for checking group separation.

### 11.8 Interpretation errors to avoid

- A red setosa cluster far to the left does **not** mean the species causes negative PC1 scores.
- A long arrow in a particular biplot does **not** prove that the variable has a strong effect on a response variable that was not modeled.
- Ellipses drawn around points are not automatically decision boundaries.
- Visual separation does not measure classification accuracy.
- PC2 is not “the second most important original measurement.” It is a combination of all original variables, ranked by score variance.
- If the signs of PC axes flip in another implementation, the plot may mirror left-right or top-bottom without changing the underlying conclusions.

---

## 12. Predict component scores for new observations

### 12.1 What does prediction mean in PCA?

The lecture uses the word **prediction** for transforming an incoming observation into principal-component coordinates. It does not mean forecasting a dependent variable. We already know the PCA axes, and we ask, “Where would this new observation sit along those axes?” **[Lecture p. 11]**

### 12.2 The exact lecture example

The lecturer asks us to *pretend* the last two iris rows have just arrived:

```r
predict(irpca, newdata = tail(irvar, 2))
```

The source reports the following PC scores:

| Original row | PC1 | PC2 | PC3 | PC4 |
|---:|---:|---:|---:|---:|
| 149 | 1.3682042 | $-1.00787793$ | $-0.9302787$ | 0.02604141 |
| 150 | 0.9574485 | 0.02425043 | $-0.5264850$ | $-0.16253353$ |

These are the values reported on **lecture p. 11**. The first column is the position along PC1, not a predicted species. The last two flowers have positive PC1 scores, unlike the typically negative PC1 scores of setosa in the lecture plot.

### 12.3 The steps R applies to the new flower

If the new row contains measurements $\mathbf x_{\mathrm{new}}$, R:

1. Subtracts the **training-data column means** saved in `irpca$center`.
2. Divides by the **training-data column SDs** saved in `irpca$scale`.
3. Multiplies by the **trained PCA rotation matrix** saved in `irpca$rotation`.
4. Returns a vector of PC scores, one per component.

In mathematical form:

$$
\boxed{\mathbf t_{\mathrm{new}}=\left(\frac{\mathbf x_{\mathrm{new}}-\boldsymbol\mu_{\mathrm{train}}}{\mathbf s_{\mathrm{train}}}\right)^{\mathsf T}\mathbf V},
$$

where division in the parentheses means **elementwise column standardization**, not ordinary matrix division, and the resulting row-vector dimensions must agree with $\mathbf V$.

In R, an equivalent approach is:

```r
new_rows <- tail(irvar, 2)
new_scaled <- sweep(new_rows, 2, irpca$center, FUN = "-")
new_scaled <- sweep(new_scaled, 2, irpca$scale, FUN = "/")
manual_scores <- as.matrix(new_scaled) %*% irpca$rotation
manual_scores
```

`sweep(..., 2, ...)` applies an operation across **columns** of the data. The full formula is done automatically, and more safely, by `predict(irpca, newdata = new_rows)`.

### 12.4 Reconstruct the first two new PC scores by hand

The original row 149 is $(6.2,3.4,5.4,2.3)$. Using the training iris means and SDs from Chapter 10, its approximately standardized measurements are

$$\mathbf z_{149}\approx(0.430722,\ 0.786174,\ 0.930154,\ 1.443994).$$

Therefore,

$$
\begin{aligned}
\mathrm{PC1}_{149}\approx{}&0.5210659(0.430722)-0.2693474(0.786174)\\
&+0.5804131(0.930154)+0.5648565(1.443994)\\
\approx{}&1.3682042.
\end{aligned}
$$

For PC2:

$$
\begin{aligned}
\mathrm{PC2}_{149}\approx{}&-0.37741762(0.430722)-0.92329566(0.786174)\\
&-0.02449161(0.930154)-0.06694199(1.443994)\\
\approx{}&-1.0078779.
\end{aligned}
$$

The numbers agree with the lecturer's output, allowing for rounding.

### 12.5 Crucial real-world prediction cautions

**Source check:** In the source example, the “new” rows were actually **already included** in the 150 rows used to fit `irpca`; the lecture says this is only an illustration. It is useful for showing `predict()`, but it is not an independent out-of-sample test.

For a genuine predictive model, split training and test data **before** fitting preprocessing or PCA. Fit `prcomp()` on training measurements only. Transform the test measurements with `predict()` using that fitted object. If you compute scaling parameters or PCA axes using all observations before the split, you risk **data leakage** into the downstream evaluation.

Make sure incoming measurements use the same features, names, and units as the training set. An incoming `Petal.Width` column in millimetres would not be compatible with a model trained on the same feature measured in centimetres unless it is converted appropriately.

---

## 13. Reproduce the small example with `svd()`, `prcomp()`, `eigen()`, and `princomp()`

The next code reproduces the mathematical demonstration on **lecture pp. 15–20**. It is written so you can run it line by line in a fresh R session.

### 13.1 Create the matrix correctly

```r
X <- matrix(
  c(1, 2,
    2, 1,
    3, 4,
    4, 3),
  nrow = 4,
  byrow = TRUE
)
X
```

The `byrow = TRUE` argument is essential: the lecture's matrix is entered row by row. Without it, R fills a matrix **column by column** unless you tell it otherwise.

Expected data:

```text
     [,1] [,2]
[1,]    1    2
[2,]    2    1
[3,]    3    4
[4,]    4    3
```

### 13.2 Standardize and check by hand

```r
X_scaled <- scale(X)
X_scaled
colMeans(X_scaled)
apply(X_scaled, 2, sd)
```

`colMeans` should report zero (up to numerical precision). The final command applies `sd` to each **column**, because the `2` in `apply(..., 2, ...)` specifies columns.

### 13.3 Find the singular value decomposition

```r
X_svd <- svd(scale(X))
X_svd$d
X_svd$u
X_svd$v
```

**Reported singular values** **[Lecture p. 15]**:

```text
[1] 2.190890 1.095445
```

**Reported $u$ matrix**:

```text
     [,1] [,2]
[1,] -0.5  0.5
[2,] -0.5 -0.5
[3,]  0.5  0.5
[4,]  0.5 -0.5
```

**Reported $v$ matrix** **[Lecture pp. 15–16]**:

```text
          [,1]       [,2]
[1,] 0.7071068 -0.7071068
[2,] 0.7071068  0.7071068
```

These matrices express the singular value decomposition of the **standardized** data. The rows of `$u` correspond to the observations; the columns of `$v` define directions in the two-variable feature space; `$d` provides the magnitudes of spread along those directions.

### 13.4 Multiply to get proper standardized PC scores

```r
scores_svd <- scale(X) %*% X_svd$v
scores_svd
```

This produces the standardized PC-score matrix derived by hand in Chapter 6. In addition:

```r
scores_from_ud <- sweep(X_svd$u, 2, X_svd$d, "*")
scores_from_ud
```

The two matrices should match to numerical precision, subject to the consistent sign choices returned by SVD. The reason is the identity $\mathbf A\mathbf V=\mathbf U\mathbf D$, proved later.

### 13.5 Preserve and understand the lecture's raw-data product

```r
X %*% X_svd$v
```

**Exactly as reported on lecture p. 16:** the first output column is $2.121320,2.121320,4.949747,4.949747$, and the second is $0.7071068,-0.7071068,0.7071068,-0.7071068$. These **do not** match standardized `prcomp()` scores, because the raw `X` has not been centered and scaled. This is an instructive demonstration of how essential consistent preprocessing is.

### 13.6 Fit `prcomp()` on the original matrix

```r
Xpca <- prcomp(X, center = TRUE, scale. = TRUE)
Xpca$rotation
Xpca$x
summary(Xpca)
```

The rotation matrix is (up to possible sign choices)

```text
          PC1        PC2
[1,] 0.7071068 -0.7071068
[2,] 0.7071068  0.7071068
```

The summary reported on **lecture p. 17** is:

```text
Importance of components:
                          PC1    PC2
Standard deviation     1.265 0.6325
Proportion of Variance 0.800 0.2000
Cumulative Proportion  0.800 1.0000
```

The values are correct: $1.265$ and $0.6325$ are the rounded square roots of 1.6 and 0.4.

### 13.7 Calculate the correlation matrix and its eigenpairs

```r
R <- cor(X)
R
R_eig <- eigen(R)
R_eig$values
R_eig$vectors
```

Expected correlation matrix:

```text
     [,1] [,2]
[1,]  1.0  0.6
[2,]  0.6  1.0
```

Expected eigenvalues:

```text
[1] 1.6 0.4
```

Expected eigenvectors (up to sign):

```text
          [,1]       [,2]
[1,] 0.7071068 -0.7071068
[2,] 0.7071068  0.7071068
```

This is precisely what we derived by hand: PCA's standardized component directions are the eigenvectors of the correlation matrix, and the component variances are its eigenvalues. **[Lecture p. 19]**

### 13.8 Use the alternative `princomp()` function

```r
pca_princomp <- princomp(X, cor = TRUE)
pca_princomp$loadings
pca_princomp$sdev
summary(pca_princomp)
```

`cor = TRUE` instructs `princomp()` to analyze the correlation matrix, corresponding to standardized-variable PCA.

The lecturer's `princomp` loading display on **p. 19** is approximately:

```text
Loadings:
     Comp.1 Comp.2
[1,]  0.707  0.707
[2,]  0.707 -0.707
```

This differs from the lecturer's second `eigen()` vector only in its **overall sign**, which is harmless. The reported standard deviations are

```text
   Comp.1    Comp.2
1.2649111 0.6324555
```

The `summary(pca_princomp)` output on **pp. 19–20** gives 0.8000000 and 0.2000000 explained-variance proportions, matching `prcomp()`.

### 13.9 A subtle output-table trap in `princomp()`

After printing `pca_princomp$loadings`, the lecture also prints:

```text
             Comp.1 Comp.2
SS loadings     1.0    1.0
Proportion Var  0.5    0.5
Cumulative Var  0.5    1.0
```

**Source check:** This *loadings-object printout* reports sums of squared normalized **direction coefficients**. For the two orthonormal columns, the squared-coefficient totals are both 1 and their normalized shares are both 0.5. It is **not** the PCA's genuine explained-variance distribution, which is **0.8 / 0.2**, as correctly shown by `summary(pca_princomp)` and `summary(Xpca)`. In an exam, use the actual component eigenvalues or the `summary()` importance table to determine PCA explained variance; do not misinterpret the loadings-printer table as 50% / 50% variance explained.

### 13.10 Cross-check the four methods

| Method | What is decomposed | Returns direction vectors? | Iris/small-example role |
|---|---|---|---|
| `svd(scale(X))` | Standardized rectangular data matrix | Yes, `$v` | Source SVD demonstration |
| `prcomp(X, center=TRUE, scale.=TRUE)` | Centered/scaled rectangular data matrix via SVD | Yes, `$rotation` | Main lecture method |
| `eigen(cor(X))` | Symmetric sample correlation matrix | Yes, `$vectors` | Direct eigen demonstration |
| `princomp(X, cor=TRUE)` | Correlation/covariance-based PCA | Yes, `$loadings` | Alternative PCA function |

All four should agree on the **underlying PCA subspaces and component variances** for this example, allowing for different vector signs, printed column names, and output formats.

---

## 14. PCA in practice: exploration, images, regression, strengths and limits

### 14.1 Principal components as feature extraction

**[Lecture pp. 11–12]** The lecture calls PCA a **feature extraction** method. It combines original measurements into new numerical features. This differs from **feature selection**, which would simply choose particular original columns and discard the others.

For example:

- Feature selection might keep `Petal.Length` and `Sepal.Width` only.
- PCA retaining two components still uses information from *all four* iris measurements, because each retained PC is a weighted combination.

PCA helps exploratory data analysis (EDA) by displaying the dominant patterns in fewer dimensions. It may reveal clusters or unusual observations that were difficult to see in the original measurement space.

### 14.2 Image representation and compression

The lecturer uses an image of size **$3120\times4160$**, describing the first number as height and the second as width. It illustrates image reconstructions using **10, 25, 50, 100, 150, and 250 components**. The output images become more visually recognizable as more components are retained. **[Lecture pp. 11–12]**

The source specifically reports that:

- with as few as **10** components, the broad content can still be recognized;
- at **250** components, the reconstruction appears difficult to distinguish visually from the original;
- **54** of the original 3120 component directions explain approximately **95%** of variation in this particular illustration.

These numbers are **properties of the illustrated example**, not universal compression ratios for any image. The actual result depends on image content, how image channels are represented, and the exact preprocessing and decomposition used.

**Teaching extension:** A grayscale image can be represented as a matrix $\mathbf M$ with one numeric brightness per pixel. A rank-$k$ approximation derived from SVD can be written

$$\boxed{\mathbf M_k=\sum_{j=1}^{k}d_j\mathbf u_j\mathbf v_j^{\mathsf T}},$$

where each term adds back one mode of variation. As $k$ grows, more image detail returns. The image-matrix's maximum possible rank is $\min(3120,4160)=3120$. This is the mathematical reason the lecture can discuss components relative to 3120.

**Precision note:** Low-rank SVD reconstruction of a raw image matrix and classical mean-centered PCA are closely related but not literally identical unless the centering treatment is specified. The lecture does not provide image code or the exact pixel preprocessing, so its image-based numerical claims should be treated as reported illustration results, not reconstructed calculations.

### 14.3 Principal Components Regression (PCR)

A **regression** model predicts a numerical outcome $Y$ using predictors. For example, sales revenue might be predicted from advertising cost, audience reach, and frequency of advertisements. When predictors overlap strongly, ordinary regression coefficients can be difficult to estimate and interpret.

**Principal Components Regression (PCR)** replaces the original correlated predictors with selected PC scores and fits regression using these scores:

$$\boxed{\widehat Y=\beta_0+\beta_1\mathrm{PC1}+\cdots+\beta_k\mathrm{PC}k}.$$

Here $\widehat Y$ is predicted outcome, $\beta_0$ is an intercept, and $\beta_j$ are regression coefficients for the retained components. **[Lecture p. 12]**

The PCA stage does not use the outcome $Y$ when choosing directions. Consequently, a component that explains very little predictor variance could still help predict $Y$ strongly. PCR may reduce multicollinearity and simplify models, but retaining high-variance components alone does not guarantee accurate predictions.

**Teaching extension: an outline of proper PCR evaluation**

1. Divide observations into training and test sets.
2. Calculate scaling and PCA using **training predictors only**.
3. Select a candidate number of PCs using an appropriate training-only procedure.
4. Fit regression using training PC scores.
5. Transform test predictors using the training PCA transformation.
6. Predict test outcomes and evaluate errors.

The lecture mentions PCR but does not provide a numerical PCR dataset or a fitted regression output. We do not invent one as if it came from the slides.

### 14.4 The advantages listed by the lecturer

**[Lecture p. 12]** The three stated advantages are:

1. **Reduced time and storage:** retaining fewer numerical dimensions can lower costs in later analysis or representations.
2. **Removal of linear correlation among components:** PCA produces uncorrelated component scores, which can alleviate predictor multicollinearity in models using those components.
3. **Simpler visualization:** two or three PC axes make otherwise high-dimensional data easier to inspect.

**Source check and qualification:** PCA may improve predictive-model performance, but it can also make it worse by discarding low-variance but predictive features. Its computational cost is not free, and a tiny dataset may be faster to analyze directly. An exact reconstructed representation can require storing both component scores and loadings; whether storage falls depends on how many observations and variables there are and the chosen retention level.

### 14.5 Limitations worth stating in a strong exam answer

**Teaching extensions:**

- **Linearity:** Standard PCA finds linear combinations. It may miss curved, nonlinear data structures.
- **Variance is not meaningfulness:** High variance can be noise or confounding rather than useful signal.
- **Sensitivity to preprocessing:** Unscaled and standardized PCA can tell different stories.
- **Sensitivity to outliers:** A few extreme points may rotate the axes substantially.
- **Interpretation complexity:** A component combining many variables may lack an intuitive business meaning.
- **Loss of information:** Discarded components can hold predictive, rare-event, or group-distinguishing information.
- **Unsupervised nature:** Standard PCA does not use class labels or outcomes to optimize separation or prediction.
- **Uncorrelated is not independent:** Zero linear correlation does not prove statistical independence, except under certain additional distributional assumptions.
- **Data leakage risk:** A fitted PCA must be reused rather than refitted on evaluation data.

None of these limitations invalidates PCA. They tell us when its assumptions and objectives align with the problem.

---

# Part IV. The mathematics behind PCA, derived rather than memorized

## 15. PCA as a matrix transformation and an optimization problem

### 15.1 What the lecturer means by an $n\times p$ input matrix

**[Lecture p. 13]** The mathematical section begins with an input matrix

$$
\mathbf X=\begin{bmatrix}
x_{11}&x_{12}&\cdots&x_{1p}\\
x_{21}&x_{22}&\cdots&x_{2p}\\
\vdots&\vdots&\ddots&\vdots\\
x_{n1}&x_{n2}&\cdots&x_{np}
\end{bmatrix}_{n\times p}.
$$

The subscript $n\times p$ tells us the shape. Each $x_{ij}$ is observation $i$'s recorded value on variable $j$. There are $n$ rows and $p$ columns. The dots $\cdots$ and $\vdots$ merely indicate that intermediate entries continue in the obvious pattern; there is no mysterious operation hidden there.

In conventional covariance-based PCA, replace $\mathbf X$ with its **centered version** $\mathbf A=\mathbf X-\mathbf1\bar{\mathbf x}^{\mathsf T}$. Here $\mathbf1$ is an $n\times1$ column of ones, $\bar{\mathbf x}$ is the $p\times1$ vector of column means, and their product produces an $n\times p$ matrix repeating the mean row. For standardized PCA, use an additional column-wise standard-deviation division.

### 15.2 The direction/rotation matrix $\boldsymbol\Phi$

The lecturer writes a $p\times p$ matrix of transformation coefficients:

$$
\boldsymbol\Phi=
\begin{bmatrix}
\phi_{11}&\phi_{12}&\cdots&\phi_{1p}\\
\phi_{21}&\phi_{22}&\cdots&\phi_{2p}\\
\vdots&\vdots&\ddots&\vdots\\
\phi_{p1}&\phi_{p2}&\cdots&\phi_{pp}
\end{bmatrix}
=\begin{bmatrix}\boldsymbol\phi_1&\boldsymbol\phi_2&\cdots&\boldsymbol\phi_p\end{bmatrix}.
$$

The letter $\phi$ (Greek *phi*) names a coefficient. The **first** subscript identifies the original variable; the **second** identifies the component. Thus $\phi_{31}$ is the coefficient of the **third original variable** in **PC1**. It is not the third observation's first score.

Each column $\boldsymbol\phi_j$ is one entire loading/rotation direction. In R, the analogous object is `pca$rotation`, and `pca$rotation[3,1]` accesses the third-variable coefficient of PC1.

### 15.3 Build a component using a weighted sum

For standardized variables $A_1,\ldots,A_p$ that have mean 0, write the first component as

$$
\boxed{Y_1=\phi_{11}A_1+\phi_{21}A_2+\cdots+\phi_{p1}A_p}.
$$

This is the lecture's idea $\mathrm{PC1}\to Z_1=\phi_{11}X_1+\cdots+\phi_{p1}X_p$, with more explicit notation separating original standardized variables from output scores. **[Lecture p. 13]**

In vector form,

$$\boxed{Y_1=\boldsymbol\phi_1^{\mathsf T}\mathbf A_{\mathrm{obs}}},$$

where $\mathbf A_{\mathrm{obs}}$ is one observation written as a $p\times1$ standardized/centered vector. The multiplication gives a scalar. Every observation is projected onto the **same** first direction.

For PC2, use a different vector $\boldsymbol\phi_2$:

$$Y_2=\phi_{12}A_1+\phi_{22}A_2+\cdots+\phi_{p2}A_p.$$

The subscripts might initially feel strange: the **first** index says which original variable, and the **second** says which PC. This is exactly how a matrix's row and column are indexed.

### 15.4 What is the problem being maximized?

For a centered data matrix $\mathbf A$, consider **any** direction $\boldsymbol\phi$ of unit length. Its scores are

$$t_i=\sum_{j=1}^{p}a_{ij}\phi_j.$$

The scores have mean zero because the input columns are centered. Their sample variance is

$$
\begin{aligned}
\operatorname{Var}_{\mathrm{sample}}(t)
&=\frac1{n-1}\sum_{i=1}^{n}t_i^2\\
&=\frac1{n-1}\sum_{i=1}^{n}\left(\sum_{j=1}^{p}a_{ij}\phi_j\right)^2.
\end{aligned}
$$

The lecturer gives the equivalent **maximization objective** with denominator $n$:

$$
\underset{\phi_{11},\ldots,\phi_{p1}}{\operatorname{maximize}}
\quad \frac1n\sum_{i=1}^{n}\left(\sum_{j=1}^{p}\phi_{j1}x_{ij}\right)^2
\quad\text{subject to}\quad\sum_{j=1}^{p}\phi_{j1}^2=1.
$$

**[Lecture p. 13]**

What every symbol says:

| Symbol | Meaning |
|---|---|
| $\operatorname{maximize}$ | Choose coefficients that make the quantity as large as possible |
| $\phi_{j1}$ | Weight of variable $j$ in PC1 |
| $x_{ij}$ | Centered value of observation $i$ on variable $j$ in the lecture's formula |
| $\sum_{j=1}^{p}\phi_{j1}x_{ij}$ | Observation $i$'s candidate PC1 score |
| $\left(\cdot\right)^2$ | Squared score |
| $\sum_{i=1}^{n}$ | Total squared score variation across observations |
| $\sum_{j=1}^{p}\phi_{j1}^2=1$ | Direction vector must have length 1 |

**Source check:** The lecturer uses $1/n$ in this maximization, whereas the sample variances reported by R use $1/(n-1)$. For fixed $n$, the difference is a positive constant factor. It changes the numerical objective value but **not the maximizing direction**. For consistency with `cor()`, `prcomp()` and the hand example, the derivations below use the sample covariance matrix defined with $1/(n-1)$.

### 15.5 Why unit length is a necessary constraint

If a direction $\boldsymbol\phi$ gives scores $t_i$, replacing it by $10\boldsymbol\phi$ gives scores $10t_i$. Variance increases by a factor of $10^2=100$. Without an enforced direction length, we could make the variance arbitrarily large, without discovering a better orientation.

The rule

$$\boldsymbol\phi^{\mathsf T}\boldsymbol\phi=\sum_{j=1}^{p}\phi_j^2=1$$

prevents that trick. We maximize variance by **changing direction**, not by stretching the coefficients.

### 15.6 Put the variance into matrix form

Define the sample covariance matrix of centered $\mathbf A$:

$$\boxed{\mathbf S=\frac1{n-1}\mathbf A^{\mathsf T}\mathbf A}.$$

Check shapes:

$$\underbrace{\mathbf A^{\mathsf T}}_{p\times n}\underbrace{\mathbf A}_{n\times p}=
\underbrace{\mathbf A^{\mathsf T}\mathbf A}_{p\times p}.$$

Then the sample variance of the projected scores is

$$
\boxed{\operatorname{Var}(\mathbf A\boldsymbol\phi)=\boldsymbol\phi^{\mathsf T}\mathbf S\boldsymbol\phi}.
$$

The right side is called a **quadratic form**. It takes one direction vector, applies the covariance structure, and computes the resulting variance along that direction.

**Proof in small steps:**

$$
\begin{aligned}
\frac1{n-1}\sum_{i=1}^{n}t_i^2
&=\frac1{n-1}(\mathbf A\boldsymbol\phi)^{\mathsf T}(\mathbf A\boldsymbol\phi)\\
&=\frac1{n-1}\boldsymbol\phi^{\mathsf T}\mathbf A^{\mathsf T}\mathbf A\boldsymbol\phi\\
&=\boldsymbol\phi^{\mathsf T}\mathbf S\boldsymbol\phi.
\end{aligned}
$$

We have turned an awkward double sum into one compact matrix expression. That expression is exactly the quantity PCA maximizes.

### 15.7 Why eigenvectors solve the maximum-variance problem

We want

$$\boxed{\max_{\boldsymbol\phi:\,\boldsymbol\phi^{\mathsf T}\boldsymbol\phi=1}\boldsymbol\phi^{\mathsf T}\mathbf S\boldsymbol\phi}.$$

This can be solved using a method called **Lagrange multipliers**. You need not have studied calculus to understand the logic: we combine the quantity to maximize with a penalty for violating the unit-length condition.

Write

$$\mathcal L(\boldsymbol\phi,\lambda)=\boldsymbol\phi^{\mathsf T}\mathbf S\boldsymbol\phi-\lambda(\boldsymbol\phi^{\mathsf T}\boldsymbol\phi-1).$$

Here $\mathcal L$ is the Lagrangian expression, and $\lambda$ is a number enforcing the length constraint. Because $\mathbf S$ is symmetric, the gradient with respect to $\boldsymbol\phi$ is

$$2\mathbf S\boldsymbol\phi-2\lambda\boldsymbol\phi.$$

Set it equal to zero at a stationary direction:

$$2\mathbf S\boldsymbol\phi-2\lambda\boldsymbol\phi=\mathbf0.$$

Divide by 2 and rearrange:

$$\boxed{\mathbf S\boldsymbol\phi=\lambda\boldsymbol\phi}.$$

That is **exactly the eigenvector equation**. Therefore, candidate maximum-variance directions are eigenvectors of the covariance matrix. Among unit eigenvectors, the one with the **largest eigenvalue** has the greatest variance. It is PC1.

The mathematical foundation of PCA has emerged from one understandable requirement: **find a unit direction with as much score variance as possible**.

### 15.8 Why the eigenvalue equals the component variance

If $\mathbf S\boldsymbol\phi=\lambda\boldsymbol\phi$, then

$$
\begin{aligned}
\operatorname{Var}(Y)
&=\boldsymbol\phi^{\mathsf T}\mathbf S\boldsymbol\phi\\
&=\boldsymbol\phi^{\mathsf T}(\lambda\boldsymbol\phi)\\
&=\lambda(\boldsymbol\phi^{\mathsf T}\boldsymbol\phi)\\
&=\lambda(1)\\
&=\boxed{\lambda}.
\end{aligned}
$$

This explains one of the lecture's most important results, rather than treating it as a fact to memorize. The eigenvalue measures how much variance lies along that principal direction.

### 15.9 Why later components are orthogonal and uncorrelated

For PC2, PCA repeats the variance maximization but requires its direction to be perpendicular to PC1:

$$\boldsymbol\phi_1^{\mathsf T}\boldsymbol\phi_2=0.$$

For a symmetric covariance matrix, eigenvectors corresponding to distinct eigenvalues can be chosen orthogonal. The variance-maximizing second direction is the eigenvector associated with the **second-largest eigenvalue**. The remaining components follow in descending order.

To prove component scores are uncorrelated, write $Y_i=\boldsymbol\phi_i^{\mathsf T}\mathbf A_{\mathrm{obs}}$ and $Y_j=\boldsymbol\phi_j^{\mathsf T}\mathbf A_{\mathrm{obs}}$. Then

$$
\begin{aligned}
\operatorname{Cov}(Y_i,Y_j)
&=\boldsymbol\phi_i^{\mathsf T}\mathbf S\boldsymbol\phi_j\\
&=\boldsymbol\phi_i^{\mathsf T}(\lambda_j\boldsymbol\phi_j)\\
&=\lambda_j\boldsymbol\phi_i^{\mathsf T}\boldsymbol\phi_j\\
&=\boxed{0},\qquad i\ne j.
\end{aligned}
$$

The middle step is the eigenvector equation; the final step is the perpendicularity condition. Now the two key properties are connected rigorously:

- **Perpendicular directions:** $\boldsymbol\phi_i^{\mathsf T}\boldsymbol\phi_j=0$.
- **Uncorrelated scores:** $\operatorname{Cov}(Y_i,Y_j)=0$.

They hold together because PCA selects an orthonormal eigenvector basis of the symmetric covariance/correlation matrix.

### 15.10 Express every score together in one matrix

Place the $p$ direction vectors in the columns of a rotation matrix:

$$\boldsymbol\Phi=[\boldsymbol\phi_1\ \boldsymbol\phi_2\ \cdots\ \boldsymbol\phi_p].$$

Then calculate all $n$ observations' all $p$ component scores at once:

$$
\boxed{\mathbf T_{n\times p}=\mathbf A_{n\times p}\boldsymbol\Phi_{p\times p}}.
$$

This is the lecture's relationship $\mathbf Z=\mathbf X\boldsymbol\Phi$, with $\mathbf X$ assumed appropriately centered (and optionally scaled). **[Lecture p. 14]**

If we retain only the first $k$ PCs, use $\boldsymbol\Phi_k$ with shape $p\times k$:

$$\boxed{\mathbf T_k=\mathbf A\boldsymbol\Phi_k\quad\text{has shape}\quad n\times k}.$$

### 15.11 PCA as the best low-dimensional linear reconstruction

**Teaching extension:** For ordinary least-squares reconstruction in the same scaled/centered space, the subspace spanned by the first $k$ principal directions minimizes the sum of squared reconstruction errors among all $k$-dimensional linear subspaces. In matrix form:

$$\widehat{\mathbf A}_k=\mathbf A\boldsymbol\Phi_k\boldsymbol\Phi_k^{\mathsf T}.$$

This means maximizing **retained variance** is equivalent to minimizing **squared reconstruction error** for the standard centered PCA problem. The equivalence explains the image-compression intuition.

### 15.12 Units and normality

The lecture says PC “units are meaningless” and recommends scaling variables measured in very different units, such as miles, litres, and dollars. **[Lecture p. 14]** A precise way to say this is: standardized PCA score units do not correspond to a single original physical quantity; their numerical meaning comes from the chosen standardized weighted combination. When centering without scaling variables in common units, scores may formally carry those units, but they still may not have a direct business interpretation.

The lecture also states **PCA does not require multivariate normality**. This is true: computing covariance matrices and their eigenvectors or applying SVD does not depend on assuming a multivariate normal distribution. **[Lecture p. 14]** Some downstream inferential interpretations may require additional assumptions, but the basic algebra does not.

---

## 16. Singular Value Decomposition: the method behind `prcomp()`

### 16.1 Why do we need another decomposition?

We have learned that PCA directions can be found from eigenvectors of a covariance/correlation matrix. But computing that matrix is not always necessary. A direct operation on the centered or standardized data matrix can provide the same directions and scores: **Singular Value Decomposition (SVD)**.

The lecturer says `prcomp()` uses SVD and prefers it for numerical accuracy. **[Lecture pp. 2, 14, 20–21]**

### 16.2 Define SVD carefully

For any real $n\times p$ matrix $\mathbf A$, a full SVD exists:

$$\boxed{\mathbf A=\mathbf U\mathbf D\mathbf V^{\mathsf T}}.$$

The shapes are:

$$
\underbrace{\mathbf A}_{n\times p}=
\underbrace{\mathbf U}_{n\times n}
\underbrace{\mathbf D}_{n\times p}
\underbrace{\mathbf V^{\mathsf T}}_{p\times p}.
$$

Here:

- $\mathbf U$ is an orthogonal matrix of **left singular vectors**;
- $\mathbf D$ is a rectangular diagonal matrix whose diagonal entries $d_1\ge d_2\ge\cdots\ge0$ are **singular values**;
- $\mathbf V$ is an orthogonal matrix of **right singular vectors**;
- $\mathbf V^{\mathsf T}$ is the transpose of $\mathbf V$.

“Rectangular diagonal” means the only possible nonzero entries of $\mathbf D$ are on positions $(1,1),(2,2),\ldots,(\min(n,p),\min(n,p))$. Every off-diagonal entry is zero. The lecture states this on **p. 14**.

### 16.3 Visualize the lecturer's $5\times3$ shape example

For a dataset of five observations measured on three variables:

$$\begin{aligned}
\mathbf A &: 5\times3,\\
\mathbf U &: 5\times5,\\
\mathbf D &: 5\times3,\\
\mathbf V^{\mathsf T} &: 3\times3.
\end{aligned}$$

The matrix $\mathbf D$ has the pattern

$$
\mathbf D=\begin{bmatrix}
d_1&0&0\\
0&d_2&0\\
0&0&d_3\\
0&0&0\\
0&0&0
\end{bmatrix}.
$$

Check shapes step by step: $(5\times5)(5\times3)=(5\times3)$, then $(5\times3)(3\times3)=(5\times3)$. Everything fits. This is the structural diagram shown on **lecture p. 14**.

### 16.4 What SVD is doing geometrically

An intuitive explanation: $\mathbf V$ identifies important feature-space directions; $\mathbf D$ says how strongly the data extend along those directions; $\mathbf U$ describes the observations' pattern along them. The decomposition separates **orientations** from **strengths of variation**.

For centered/standardized PCA:

$$\boxed{\boldsymbol\Phi=\mathbf V}.$$

This is the lecture's central SVD result. **[Lecture p. 14]**

### 16.5 From SVD to the PC score matrix

Start with

$$\mathbf A=\mathbf U\mathbf D\mathbf V^{\mathsf T}.$$

Multiply both sides on the right by $\mathbf V$:

$$\mathbf A\mathbf V=\mathbf U\mathbf D\mathbf V^{\mathsf T}\mathbf V.$$

Because $\mathbf V$ is orthogonal, $\mathbf V^{\mathsf T}\mathbf V=\mathbf I$, so

$$\boxed{\mathbf A\mathbf V=\mathbf U\mathbf D}.$$

The **left-hand side** is the PCA score formula. Therefore:

$$\boxed{\mathbf T=\mathbf U\mathbf D}.$$

This explains a practical R identity:

```r
fit <- svd(scale(X))
scale(X) %*% fit$v               # Scores via right singular vectors
sweep(fit$u, 2, fit$d, "*")  # Scores via U times singular values
```

The second command works with the **thin** SVD returned by R, as described next.

### 16.6 Full versus thin SVD

The lecturer writes **full SVD** with $\mathbf U$ of shape $n\times n$. Most practical statistical software, including R's default `svd()`, may return only the leading singular vectors: `u` with $n\times q$ entries and `v` with $p\times q$ entries, where $q=\min(n,p)$ by default, with optional requested numbers of vectors. This is a **thin** (or reduced) representation.

For the lecture's $4\times2$ dataset:

| Factor | Full SVD shape | Typical `svd(scale(X))` printed shape |
|---|---|---|
| $\mathbf U$ | $4\times4$ | $4\times2$ |
| $\mathbf D$ | $4\times2$ | `d` vector of length 2 |
| $\mathbf V$ | $2\times2$ | $2\times2$ |

The lecture's `$u` output is $4\times2$, and its `$v` output is $2\times2$. There is no contradiction with the mathematical full-SVD statement.

### 16.7 Derive the link between singular values and PCA eigenvalues

For centered data $\mathbf A$ with sample covariance

$$\mathbf S=\frac1{n-1}\mathbf A^{\mathsf T}\mathbf A,$$

substitute the SVD:

$$
\begin{aligned}
\mathbf S
&=\frac1{n-1}(\mathbf U\mathbf D\mathbf V^{\mathsf T})^{\mathsf T}
(\mathbf U\mathbf D\mathbf V^{\mathsf T})\\
&=\frac1{n-1}\mathbf V\mathbf D^{\mathsf T}\mathbf U^{\mathsf T}\mathbf U\mathbf D\mathbf V^{\mathsf T}\\
&=\frac1{n-1}\mathbf V\mathbf D^{\mathsf T}\mathbf D\mathbf V^{\mathsf T}.
\end{aligned}
$$

We used $\mathbf U^{\mathsf T}\mathbf U=\mathbf I$. The matrix $\mathbf D^{\mathsf T}\mathbf D$ has diagonal entries $d_1^2,d_2^2,\ldots$. Therefore the PCA eigenvalues are

$$\boxed{\lambda_j=\frac{d_j^2}{n-1}}.$$

Equivalently,

$$\boxed{d_j=\sqrt{(n-1)\lambda_j}}.$$

The PCA standard deviation is

$$\boxed{\operatorname{SD}(\mathrm{PC}j)=\sqrt{\lambda_j}=\frac{d_j}{\sqrt{n-1}}}.$$

**This equation unifies `svd()` output and `prcomp()` output.** The singular values printed by `svd(scale(X))` are not the PCA standard deviations; you must divide by $\sqrt{n-1}$.

### 16.8 Verify the formula with the lecturer's small example

For $n=4$, we derived $\lambda_1=1.6$ and $\lambda_2=0.4$. Consequently:

$$d_1=\sqrt{(4-1)(1.6)}=\sqrt{4.8}=2.190890,$$

$$d_2=\sqrt{(4-1)(0.4)}=\sqrt{1.2}=1.095445.$$

These **exactly reproduce** the SVD singular values shown on **lecture p. 15**.

Divide by $\sqrt3$:

$$\operatorname{SD}(\mathrm{PC1})=2.190890/\sqrt3=1.264911,$$

$$\operatorname{SD}(\mathrm{PC2})=1.095445/\sqrt3=0.632456.$$

These match the `prcomp()` and `princomp()` standard deviations shown on **pp. 17 and 19**.

### 16.9 Why SVD is attractive when $p>n$

If we form a covariance matrix from $p$ variables, it has shape $p\times p$. For a huge number of features, constructing or storing it can be expensive. Applying SVD directly to the rectangular data matrix can avoid explicitly constructing that covariance matrix and often offers better numerical behavior.

If $p>n$, a centered covariance matrix has rank at most $n-1$, so many eigenvalues are zero. This is not a failure of PCA: SVD can still identify the nonzero directions. It does not magically create independent information absent from the data.

The lecturer highlights SVD for large rectangular and rank-deficient matrices, including $n<p$. **[Lecture p. 20]**

### 16.10 An additional iris SVD check

The iris PCA uses $n=150$. Therefore, from the lecture's eigenvalues,

$$d_j=\sqrt{149\lambda_j}.$$

The implied singular values are approximately:

| PC | Lecture eigenvalue $\lambda_j$ | Implied $d_j$ |
|---|---:|---:|
| PC1 | 2.91849782 | 20.8532 |
| PC2 | 0.91403047 | 11.6701 |
| PC3 | 0.14675688 | 4.6762 |
| PC4 | 0.02071484 | 1.7568 |

**Teaching extension:** You can test the relationship with:

```r
svd(scale(irvar))$d
irpca$sdev * sqrt(nrow(irvar) - 1)
```

The two sets should coincide to numerical precision when equivalent preprocessing is used.

---

## 17. Eigendecomposition and the population PCA theorems

**Original lecture:** Section 4.2 introduces eigendecomposition on **p. 17**, gives population results on **pp. 17–18**, gives sample results on **p. 18**, and computes the example on **p. 19**.

### 17.1 What is eigendecomposition?

An **eigendecomposition**, sometimes called **spectral decomposition**, expresses a square symmetric matrix in terms of eigenvectors and eigenvalues:

$$\boxed{\mathbf R=\mathbf V\boldsymbol\Lambda\mathbf V^{\mathsf T}},$$

where $\boldsymbol\Lambda$ (capital Greek lambda) is a diagonal matrix containing eigenvalues:

$$\boldsymbol\Lambda=\begin{bmatrix}
\lambda_1&0&\cdots&0\\
0&\lambda_2&\cdots&0\\
\vdots&\vdots&\ddots&\vdots\\
0&0&\cdots&\lambda_p
\end{bmatrix}.
$$

For ordinary correlation/covariance matrices, eigenvalues are nonnegative. We can choose orthonormal eigenvectors forming $\mathbf V$. This decomposition is the mathematical basis for the `eigen(cor(X))` example.

### 17.2 What is a multivariate random vector?

A **random variable** is a quantity whose value can vary across outcomes or observations. A **multivariate random vector** groups several random variables:

$$\mathbf X=\begin{bmatrix}X_1\\X_2\\\vdots\\X_p\end{bmatrix}.$$

Each $X_j$ denotes one population variable, such as income, expenditure, or purchase frequency. The vector's population mean is

$$\boldsymbol\mu=E(\mathbf X)=\begin{bmatrix}\mu_1\\\vdots\\\mu_p\end{bmatrix},$$

where $E$ means **expected value**, or population average. Its covariance matrix is $\boldsymbol\Sigma$, where the diagonal entries $\sigma_{jj}$ are population variances, and the off-diagonals $\sigma_{jk}$ are population covariances.

In symbols:

$$\boldsymbol\Sigma=\operatorname{Cov}(\mathbf X).$$

### 17.3 Population standardization

For population variable $X_j$, define

$$\boxed{Z_j=\frac{X_j-\mu_j}{\sqrt{\sigma_{jj}}}}.$$

Here $\sqrt{\sigma_{jj}}$ is that variable's population standard deviation. We assume it is positive; a constant variable cannot be standardized in this way.

The standardized variables satisfy

$$E(Z_j)=0,\qquad\operatorname{Var}(Z_j)=1.$$

The lecturer denotes the population **correlation matrix** by the Greek letter $\boldsymbol\rho$ (rho) and states

$$\boxed{\operatorname{Cov}(\mathbf Z)=\operatorname{Cor}(\mathbf X)=\boldsymbol\rho}.$$

**[Lecture p. 17]**

This follows because dividing the original covariance $\sigma_{jk}$ by the two standard deviations gives correlation $\rho_{jk}$.

### 17.4 The population principal-component theorem

Suppose the correlation matrix has ordered eigenpairs

$$
(\lambda_1,\mathbf e_1),\ldots,(\lambda_p,\mathbf e_p),
\qquad\lambda_1\ge\lambda_2\ge\cdots\ge\lambda_p\ge0.
$$

The notation $(\lambda_i,\mathbf e_i)$ means: eigenvalue $\lambda_i$ goes together with its unit eigenvector $\mathbf e_i$. The $i$th population component is

$$
\boxed{Y_i=\mathbf e_i^{\mathsf T}\mathbf Z=\sum_{j=1}^{p}e_{ij}Z_j},
\qquad i=1,\ldots,p.
$$

**Index convention note:** Here $e_{ij}$ means the *$j$th entry* of eigenvector $\mathbf e_i$. This matches the lecture's $Y_i=e_{i1}Z_1+\cdots+e_{ip}Z_p$. If we instead store eigenvectors as **columns** of a matrix, the same coefficient is at matrix row $j$, column $i$. These are two ways to index exactly the same numerical value.

The lecturer's **Result 1** states:

$$\boxed{\operatorname{Var}(Y_i)=\lambda_i}$$

and

$$\boxed{\operatorname{Cov}(Y_i,Y_k)=0,\quad i\ne k.}$$

We have proved both in Chapter 15. **[Lecture p. 17]**

### 17.5 Why equal eigenvalues cause non-unique directions

The lecture notes that if some eigenvalues are equal, the corresponding eigenvectors and components need not be unique. **[Lecture p. 17]**

For a simple example, imagine the $2\times2$ identity correlation matrix:

$$\mathbf R=\begin{bmatrix}1&0\\0&1\end{bmatrix}.$$

Both eigenvalues equal 1. Every unit direction has the same variance 1. There is no special longest direction. We can choose the horizontal/vertical axes, diagonal axes, or any other perpendicular unit basis. Their component scores differ, but every such choice is a valid PCA basis for the tied eigenvalues.

This is a deeper ambiguity than a simple **sign flip**. When eigenvalues are tied, directions may rotate within the equal-eigenvalue subspace and remain equally valid.

### 17.6 Total population standardized variance equals $p$

Since each standardized variable has variance 1:

$$\sum_{j=1}^{p}\operatorname{Var}(Z_j)=\underbrace{1+\cdots+1}_{p\text{ terms}}=p.$$

The **trace** of a square matrix, written $\operatorname{tr}(\cdot)$, is the sum of the entries on its main diagonal. The correlation matrix has ones on that diagonal, so

$$\operatorname{tr}(\boldsymbol\rho)=p.$$

A fundamental property of eigenvalues is that their sum equals the matrix trace. Thus:

$$
\boxed{\sum_{i=1}^{p}\operatorname{Var}(Y_i)=\sum_{i=1}^{p}\lambda_i
=\operatorname{tr}(\boldsymbol\rho)=p}.
$$

This is the lecturer's **Result 2**. **[Lecture p. 18]**

PCA redistributes the dataset's total variance across new axes. When all components are retained, it does **not** create or destroy total variance.

### 17.7 Explain variance percentages algebraically

The population proportion of total standardized variance explained by PC $i$ is

$$
\boxed{\frac{\lambda_i}{p}}.
$$

For example, suppose there are $p=4$ standardized variables and PC1 has eigenvalue $\lambda_1=2.8$. Then the PC1 proportion is $2.8/4=0.70=70\%$.

For unstandardized covariance PCA, do **not** replace total variance by $p$. Use the trace of the covariance matrix:

$$\boxed{\mathrm{PVE}_i=\frac{\lambda_i}{\operatorname{tr}(\boldsymbol\Sigma)}}.$$

The equality with $p$ is special to **unit-variance standardized variables**.

### 17.8 The correlation between an original standardized variable and a PC

The lecture also states

$$\boxed{\operatorname{Cor}(Y_i,Z_k)=e_{ik}\sqrt{\lambda_i}}.$$

**[Lecture p. 18]** This formula is often easier to understand once derived step by step.

First, the PC is $Y_i=\mathbf e_i^{\mathsf T}\mathbf Z$. The covariance between $Y_i$ and original standardized variable $Z_k$ is

$$\begin{aligned}
\operatorname{Cov}(Y_i,Z_k)
&=\operatorname{Cov}(\mathbf e_i^{\mathsf T}\mathbf Z,Z_k)\\
&=(\boldsymbol\rho\mathbf e_i)_k\\
&=(\lambda_i\mathbf e_i)_k\\
&=\lambda_i e_{ik}.
\end{aligned}$$

The subscript $(\cdot)_k$ means take coordinate $k$ of that vector. The third line uses the eigenvector relationship $\boldsymbol\rho\mathbf e_i=\lambda_i\mathbf e_i$.

Now divide covariance by the relevant SDs. Since $Z_k$ has SD 1 and $Y_i$ has SD $\sqrt{\lambda_i}$:

$$
\begin{aligned}
\operatorname{Cor}(Y_i,Z_k)
&=\frac{\lambda_i e_{ik}}{\sqrt{\lambda_i}\cdot1}\\
&=\boxed{e_{ik}\sqrt{\lambda_i}}.
\end{aligned}
$$

**Condition:** This correlation is defined only for $\lambda_i>0$, because a zero-variance PC has zero standard deviation and its correlation is undefined.

### 17.9 Rotation coefficients are not the same as variable–PC correlations

This is a particularly useful **Teaching extension**.

For the small two-variable example, PC1 has

$$e_{11}=\frac1{\sqrt2}\approx0.7071,\qquad\lambda_1=1.6.$$

The correlation between standardized $Z_1$ and PC1 is

$$\operatorname{Cor}(Y_1,Z_1)=0.7071068\sqrt{1.6}\approx0.8944272.$$

So there are two related but different numbers:

- **Rotation coefficient:** $0.7071$, the multiplier on $Z_1$ in the PC1 formula.
- **Original-variable/PC correlation:** $0.8944$, the statistical association between $Z_1$ and the resulting PC1 scores.

Both are meaningful, but they answer different questions. A biplot or a PCA package may refer to either object as a “loading” depending on its plotting convention. Always inspect the documentation and the matrix actually being displayed.

### 17.10 The correlation matrix is reconstructed by its PCs

A further implication of the eigen decomposition is

$$\boldsymbol\rho=\mathbf V\boldsymbol\Lambda\mathbf V^{\mathsf T}.
$$

For the $2\times2$ small example, the off-diagonal correlation can be reconstructed from both eigenvalues and eigenvectors. Denote $a=1/\sqrt2$. Then

$$\begin{aligned}
\rho_{12}&=1.6(a)(a)+0.4(-a)(a)\\
&=1.6(0.5)-0.4(0.5)\\
&=0.8-0.2=0.6.
\end{aligned}$$

This is the original correlation. Notice that **both** PCs contribute to exactly reconstructing the correlation structure when both are retained.

---

## 18. Sample PCA and the hat notation

### 18.1 Why sample PCA is what we actually use

In real business analysis we rarely know the population mean $\boldsymbol\mu$ or true population correlation $\boldsymbol\rho$. Instead, we estimate them from observed data. The lecturer represents the sample correlation matrix by $\mathbf R$, and its eigenvalues and eigenvectors by hatted symbols such as $\widehat\lambda_i$ and $\widehat{\mathbf e}_i$. **[Lecture p. 18]**

A **hat** means “estimated from data” here. For example, $\widehat\lambda_1$ is not a completely different mathematical object from $\lambda_1$. It is our sample-based estimate of the corresponding population quantity.

### 18.2 Compute sample standardized values

For each observed original variable $X_j$, calculate the sample mean $\bar x_j$ and sample SD $s_j$, then

$$\boxed{z_{ij}=\frac{x_{ij}-\bar x_j}{s_j}}.$$

In matrix form, the standardized matrix $\mathbf A$ has $n$ rows and $p$ columns. Its sample covariance matrix is

$$\boxed{\mathbf R=\frac1{n-1}\mathbf A^{\mathsf T}\mathbf A}.$$

Because the original variables have been standardized, this matrix is also their **sample correlation matrix**.

### 18.3 Calculate the sample component scores

Let $(\widehat\lambda_i,\widehat{\mathbf e}_i)$ be an eigenpair of $\mathbf R$. The $i$th sample PC score for observation $h$ is

$$\boxed{\widehat y_{hi}=\sum_{j=1}^{p}\widehat e_{ij}\,z_{hj}}.$$

Read the subscripts:

- $h$ identifies an observation or row;
- $i$ identifies the principal component;
- $j$ identifies an original variable;
- $z_{hj}$ is observation $h$'s standardized value of variable $j$;
- $\widehat e_{ij}$ is the coefficient of variable $j$ in component $i$.

The **sample variance** of PC $i$ is its eigenvalue:

$$\boxed{\widehat{\operatorname{Var}}(\widehat Y_i)=\widehat\lambda_i}.$$

Two different sample PCs have zero sample covariance:

$$\boxed{\widehat{\operatorname{Cov}}(\widehat Y_i,\widehat Y_k)=0\quad(i\ne k)}.$$

These are the sample analogues of the population results in Chapter 17. **[Lecture p. 18]**

### 18.4 Sample total variance and explained variance

Each standardized original sample variable has sample variance 1, so the trace of the sample correlation matrix is $p$:

$$
\boxed{\operatorname{tr}(\mathbf R)=p=\sum_{i=1}^{p}\widehat\lambda_i}.
$$

Therefore:

$$\boxed{\widehat{\mathrm{PVE}}_i=\frac{\widehat\lambda_i}{p}}.$$

This is exactly the sample calculation behind the `summary(prcomp(..., scale.=TRUE))` percentages.

The sample correlation between original standardized variable $Z_k$ and PC $i$ is

$$\boxed{\widehat{\operatorname{Cor}}(\widehat Y_i,Z_k)=\widehat e_{ik}\sqrt{\widehat\lambda_i}},$$

provided $\widehat\lambda_i>0$. **[Lecture p. 18]**

### 18.5 Do we need a statistical significance test to compute PCA?

No. The algebra can be performed on any suitable numerical data matrix, including data that are not multivariate normal. There is no requirement to pass a Shapiro–Wilk normality test before computing `prcomp()`. However, deciding whether component patterns are stable, generalize to another sample, or have inferential meaning is a separate issue. PCA's mathematically defined output should not be confused with a formal hypothesis-test conclusion.

### 18.6 Eigenvalues, proportions, and retained components: a compact worked example

Suppose a standardized four-variable sample has correlation-matrix eigenvalues

$$\widehat\lambda_1=2.6,\quad\widehat\lambda_2=1.0,\quad\widehat\lambda_3=0.3,\quad\widehat\lambda_4=0.1.$$

Check the sum: $2.6+1.0+0.3+0.1=4$. Then:

| PC | Eigenvalue | Variance percentage | Cumulative percentage |
|---|---:|---:|---:|
| 1 | 2.6 | 65.0% | 65.0% |
| 2 | 1.0 | 25.0% | 90.0% |
| 3 | 0.3 | 7.5% | 97.5% |
| 4 | 0.1 | 2.5% | 100.0% |

If an exam states the **strict** Kaiser rule “eigenvalue greater than 1,” PC2 with eigenvalue exactly 1 is *not* retained by that rule. Some sources adopt a **greater-than-or-equal-to-one** variant. Always follow the precisely stated convention, and say which convention you used.

---

## 19. Eigendecomposition versus SVD: understand the choice

### 19.1 The lecture's comparison

The lecture contrasts the two computation routes on **pp. 20–21**. The distinction is primarily **which object is decomposed**.

| Feature | Eigendecomposition route | SVD route |
|---|---|---|
| Typical input | Square $p\times p$ covariance/correlation matrix | Rectangular $n\times p$ centered/scaled data matrix |
| Typical steps | Form $\mathbf S$ or $\mathbf R$, then find eigenpairs | Directly factorize the prepared data matrix |
| Main identity | $\mathbf R=\mathbf V\boldsymbol\Lambda\mathbf V^{\mathsf T}$ | $\mathbf A=\mathbf U\mathbf D\mathbf V^{\mathsf T}$ |
| PC directions | Eigenvectors of covariance/correlation matrix | Right singular vectors $\mathbf V$ |
| PC variances | Eigenvalues $\lambda_j$ | $d_j^2/(n-1)$ |
| Common R functions | `eigen()`, `princomp()` | `svd()`, `prcomp()` |
| Advantage in many large/ill-conditioned tasks | Convenient when a covariance/correlation matrix is already available | Avoids explicitly constructing covariance/correlation matrix and can offer stronger numerical behavior |

Both routes produce the same mathematical PCA directions and variance structure if applied to **equivalently processed data**, aside from arbitrary signs and rotations within eigenspaces of equal eigenvalues.

### 19.2 When eigendecomposition is convenient

If a valid covariance or correlation matrix is already available, computing its eigenvectors can be direct and conceptually transparent. For example, a survey analysis may begin with a published $p\times p$ correlation matrix rather than raw participant responses.

The lecturer also lists already-available **distance** matrices on **p. 20**. **Source check:** an arbitrary distance matrix is not itself a covariance or correlation matrix, and directly applying ordinary PCA eigendecomposition to it is generally **not equivalent** to standard PCA. Certain distance-based procedures, such as classical multidimensional scaling, use a specifically transformed distance matrix. For the ordinary PCA theorems in this book, the eigen-input must be an appropriate symmetric covariance/correlation structure.

### 19.3 When SVD is convenient

Direct SVD is especially useful for large rectangular data and rank-deficient data, including situations where $n<p$. The lecturer notes that forming a large covariance matrix can consume substantial memory. **[Lecture p. 20]**

**Further precision:** A covariance matrix can be **singular** and still have a perfectly valid eigendecomposition. Its zero eigenvalues simply show the existence of redundant or unsupported directions. Thus, rank deficiency does **not** make eigenanalysis mathematically impossible. SVD is often computationally advantageous because it works directly on the rectangular matrix and is robust to rank deficiency.

### 19.4 The R functions summarized on lecture p. 21

- **`eigen()` / `princomp()`:** classical covariance/correlation matrix approach, including matrix eigenanalysis and an older PCA interface.
- **`prcomp()`:** direct SVD of centered and optionally scaled data; the principal method used throughout this lecture.
- **`psych::principal()`:** a package function providing a PCA-oriented interface with statistics and optional rotations, useful in exploratory multivariate workflows. Distinguish a rotated PCA solution from the unrotated components produced by `prcomp()`.
- **`ade4`, `factoextra`, `FactoMineR`, `epPCA` in `ExPosition`:** alternative ecosystems for PCA workflows, computation, and visualization. The exact functionality varies by package; the lecture names them but does not give runnable worked examples.

**Source check:** Exploratory factor analysis (EFA) and PCA are related in some software interfaces but are **not the same statistical model**. In PCA, the objective is to represent total variance by linear combinations. Common-factor analysis distinguishes common and unique variance under additional modeling assumptions. A function offering rotations or goodness-of-fit measures is not evidence that ordinary unrotated PCA has become factor analysis.

### 19.5 A practical choice for this course

For numerical raw data, the lecture explicitly prefers:

```r
fit <- prcomp(numerical_data, center = TRUE, scale. = TRUE)
```

Then use `summary(fit)`, `fit$rotation`, `fit$x`, `plot(fit)`, `biplot(fit)`, and `predict(fit, newdata = ...)` for the workflow already taught. Learn `eigen()` and `svd()` to understand and verify the mathematics, not as competing incantations to memorize.

---

# Part V. Turn understanding into exam and practical skills

## 20. A reliable end-to-end PCA workflow for business data

The lecture's demonstrations can be condensed into a sequence of **decisions**, not merely R commands. Use this sequence in an assignment, exam, or professional analysis.

### Step 1. Define the actual problem

What are you trying to achieve: understand customer patterns, visualize many measurements, compress an image, or create a smaller predictor set for a regression model? PCA is appropriate when preserving large-scale **linear variance structure** is valuable. If class separation or forecast accuracy is the priority, your evaluation must explicitly address that objective.

### Step 2. Inspect the dataset

Identify rows, numerical columns, units, missing entries, constant columns, impossible values, and unusually extreme observations. Separate category or response labels that you are not intending to use as ordinary numeric features.

### Step 3. Examine variable dependence

Produce a correlation matrix and suitable scatterplots. Find overlapping measurements or obvious multicollinearity. Strong correlation is not required for PCA to run, but it often explains why a small number of components can represent much of the data.

### Step 4. Choose centering and scaling

Usually center. Scale to unit variance when unit differences or the importance of comparable deviations justify it. Do not automatically scale without thinking about noisy or physically meaningful variance differences. Record the exact choice so the analysis can be reproduced.

### Step 5. Fit PCA on the appropriate data

Use `prcomp()` on the selected numerical data. In any supervised evaluation, fit preprocessing and PCA only to training observations.

### Step 6. Inspect explained variance

Read component standard deviations, convert them to variances, and calculate percentages. Plot the scree plot. Compare a clear cumulative-variance target with the scree elbow and, if applicable, the Kaiser criterion. Explain disagreements rather than hiding them.

### Step 7. Interpret directions and scores separately

Use rotation coefficients to understand what original variables contribute to a component. Use scores to understand how individual observations are positioned. Do not confuse loading signs, observation signs, and variance percentages.

### Step 8. Explore visual patterns responsibly

Create PC1–PC2 plots and biplots. Label percentages clearly. Explain groups, overlaps, and likely variable contributions, while acknowledging that omitted components are not visible.

### Step 9. Transform incoming observations consistently

Apply the fitted preprocessing and rotation through `predict()`. Do not re-estimate scaling parameters on each new batch. Check input column names and measurement units.

### Step 10. Evaluate the intended benefit

For compression, examine reconstruction error or perceptual quality. For modeling, evaluate downstream prediction on held-out observations. For exploratory analysis, ask whether the components illuminate a meaningful pattern that a reader can defend from the data.

### A complete executable R script: core lecture workflow

The following consolidated script requires only R's built-in functionality. It reproduces the central iris PCA, the four-row example, the SVD/eigen comparison, the basic plots, and the new-observation transformation. The `psych` and `ggbiplot` visualizations are intentionally shown separately below because they require additional packages.

```r
# =====================================================
# DA2451 Lecture 03: Principal Component Analysis
# Core R workflow, no optional external packages
# =====================================================

# A. Iris data

data(iris)
str(iris)
head(iris)
tail(iris)

irvar <- iris[, 1:4]
irspec <- iris[, 5]

# Check original correlations
cor(irvar)
pairs(irvar, pch = 19,
      col = c("red", "goldenrod", "blue")[as.integer(irspec)])

# Fit standardized PCA
irpca <- prcomp(irvar, center = TRUE, scale. = TRUE)
print(irpca)
summary(irpca)

# Standard deviations, eigenvalues, and PVE
irpca$sdev
pc_variances <- irpca$sdev^2
pc_proportion <- pc_variances / sum(pc_variances)
pc_cumulative <- cumsum(pc_proportion)
print(pc_variances)
print(pc_proportion)
print(pc_cumulative)

# Rotation coefficients and observation scores
print(irpca$rotation)
head(irpca$x)

# Confirm unit-length rotation columns
colSums(irpca$rotation^2)

# Confirm orthogonality and zero score correlations
round(t(irpca$rotation) %*% irpca$rotation, 8)
round(cor(irpca$x), 8)

# Scree plot and basic biplot
plot(irpca, type = "l", pch = 19)
biplot(irpca, choices = c(1, 2), cex = 0.55)

# Species-colored scores plot
flower_colors <- c("red", "goldenrod", "blue")[as.integer(irspec)]
plot(irpca$x[, 1], irpca$x[, 2], col = flower_colors, pch = 19,
     xlab = "PC1 (72.96% variance)",
     ylab = "PC2 (22.85% variance)")
legend("topright", legend = levels(irspec),
       col = c("red", "goldenrod", "blue"), pch = 19, bty = "n")

# Scores for the last two rows, treated as arriving data
predict(irpca, newdata = tail(irvar, 2))

# B. Four-row matrix from the lecture

X <- matrix(c(1, 2,
              2, 1,
              3, 4,
              4, 3), nrow = 4, byrow = TRUE)

# Inspect means, standard deviations, correlation
colMeans(X)
apply(X, 2, sd)
R <- cor(X)
print(R)

# SVD performed on standardized values
Xs <- scale(X)
X_svd <- svd(Xs)
X_svd$d
X_svd$u
X_svd$v

# PCA scores computed consistently with preprocessing
Xs %*% X_svd$v

# PCA from prcomp
Xpca <- prcomp(X, center = TRUE, scale. = TRUE)
Xpca$rotation
Xpca$x
summary(Xpca)

# Eigenanalysis of the correlation matrix
R_eig <- eigen(R)
R_eig$values
R_eig$vectors

# Compare singular values against eigenvalues
X_svd$d^2 / (nrow(X) - 1)

# Alternative PCA using princomp
pca_princomp <- princomp(X, cor = TRUE)
pca_princomp$loadings
pca_princomp$sdev
summary(pca_princomp)

# Illustrate the p.16 raw-coordinate multiplication
# (This is NOT the same as standardized prcomp scores.)
X %*% X_svd$v
```

### Optional graphics matching the source's package-based examples

The lecturer uses `psych::pairs.panels()` and `ggbiplot::ggbiplot()`. If your environment supports the packages:

```r
# These packages may require installation and compatible versions.
library(psych)
pairs.panels(irvar, gap = 0,
             bg = c("red", "yellow", "blue")[irspec],
             pch = 21)
pairs.panels(irpca$x, gap = 0,
             bg = c("red", "yellow", "blue")[irspec],
             pch = 21)

# Run the following only after ggbiplot has been installed.
library(ggbiplot)
ggbiplot(irpca, choices = c(1, 2),
         groups = irspec,
         obs.scale = 1, var.scale = 1,
         ellipse = TRUE)
```

The lecture's commented installation example uses `devtools::install_github("vqv/ggbiplot")`. It documents the lecturer's workflow but is not a promise of compatibility with all modern R installations.

---

## 21. Exam-ready interpretation: how to write conclusions in plain English

### 21.1 A complete interpretation of the iris PCA

> A Principal Component Analysis was performed on the four numerical measurements of the iris data, using centering and unit-variance scaling. PC1 explains 72.96% of the total standardized variance and PC2 explains an additional 22.85%. The two components together retain approximately 95.81% of the variance, so the four-variable dataset can be represented using two PC scores per observation with relatively little total variance loss. PC1 has positive rotation coefficients for sepal length, petal length and petal width, and a negative coefficient for sepal width. PC2 is especially influenced by sepal width because its coefficient has the largest absolute magnitude on that component. In the species-colored score plot, setosa observations appear mainly at much lower PC1 values than the other two species. PCA itself does not classify species or establish a causal relationship.

Every sentence above has a specific basis in the lecture. It does not claim perfect classification or universally optimal retention of two components.

### 21.2 A complete interpretation of the four-row example

> Both original variables have sample mean 2.5, sample variance $5/3$, and correlation 0.6. PCA on standardized values produces PC1 as approximately $0.707Z_1+0.707Z_2$ and PC2 as approximately $-0.707Z_1+0.707Z_2$. The first component measures joint movement in the two variables, while the second reflects their difference. Their variances are 1.6 and 0.4, so they explain 80% and 20% of the total standardized variance respectively. Retaining only PC1 captures most of the common direction, although it loses information about which variable is relatively larger.

### 21.3 Example: a fictional business interpretation, not a lecture dataset

Suppose a standardized retailer dataset contains **monthly expenditure**, **purchase frequency**, and **store visits**. Assume a computed PC1 has rotation coefficients $(0.60,0.57,0.56)$ and explains 78% of variance. A careful explanation would be:

> PC1 has positive contributions from all three standardized activity measures, so a higher PC1 score indicates higher overall customer activity relative to the sample averages. PC1 explains 78% of total standardized variance in the observed predictors. It is reasonable to call PC1 a general activity direction for exploratory purposes. It is not automatically a customer profitability score, a direct measurement of loyalty, or an independently validated predictor of future purchases.

This demonstrates how to give a **useful descriptive label** without turning a statistical component into an unsupported causal or predictive claim.

### 21.4 If the exam asks “Which method is better: SVD or eigen?”

A good answer is:

> Both methods can obtain the same PCA solution when the inputs use equivalent centering and scaling. Eigendecomposition operates on a square covariance or correlation matrix and yields eigenvalues and eigenvectors. SVD operates directly on the centered/scaled rectangular data matrix and supplies singular values and right singular vectors. `prcomp()` uses SVD, which is often numerically preferable and especially convenient for large or rank-deficient data matrices. The component directions correspond to right singular vectors, and component variances equal squared singular values divided by $n-1$.

---

## 22. Practice questions: build skill from beginner level to exam level

**Instructions:** Work each problem before consulting Chapter 23. Unless stated otherwise, use **sample** variance and standard deviation; assume PCA is computed on standardized features when an eigenvalue sum of $p$ is invoked.

### Foundation questions

**Q1.** A dataset contains 120 customers and 9 numerical customer features. State $n$, $p$, and the shape of its data matrix. If you keep 2 PCs, what is the shape of the retained score matrix?

**Q2.** Explain the difference between a variable, an observation, a principal-component direction, and a principal-component score.

**Q3.** For $x=(1,3,5)$, calculate its mean, all deviations, sample variance, and sample SD. Show each step.

**Q4.** For a sample observation of 15, the variable's mean is 11 and SD is 2. Calculate its standardized value and explain its meaning.

**Q5.** What do correlations $r=+0.95$, $r=-0.95$, and $r=0$ imply? Why is zero correlation not proof that variables are unrelated in every possible way?

**Q6.** Calculate the length of the vector $(6,8)$. Normalize it. Explain why PCA requires a unit-length direction.

**Q7.** Are $(1,1)$ and $(-1,1)$ perpendicular? Verify using a dot product.

**Q8.** Explain why PC1 and PC2 are called “uncorrelated” and why that does not mean their scores are statistically independent in every possible dataset.

**Q9.** In `prcomp()`, what are `center = TRUE` and `scale. = TRUE` doing? Give a situation where scaling is especially important.

**Q10.** Explain why $p>n$ presents a possible high-dimensionality challenge. What is the maximum rank of an $n\times p$ **centered** data matrix?

### By-hand calculation questions

**Q11.** For the lecture's $4\times2$ matrix, calculate both means and both sample variances.

**Q12.** For that matrix, calculate the original sample covariance and the Pearson correlation between the two columns.

**Q13.** Given $\mathbf R=\begin{bmatrix}1&0.6\\0.6&1\end{bmatrix}$, calculate its eigenvalues using the determinant equation.

**Q14.** Find unit eigenvectors for the two eigenvalues in Q13, and write the two component formulas using standardized variables.

**Q15.** For the first original observation $(1,2)$ from the matrix, calculate its two standardized coordinates and then both PC scores.

**Q16.** Calculate the explained-variance proportions and PC standard deviations when the eigenvalues are 1.6 and 0.4.

**Q17.** Retain only PC1 for the first original observation $(1,2)$. Reconstruct its approximate original two-variable values, showing how standardization is undone.

**Q18.** Suppose two standardized variables have correlation $r=-0.8$. Find the eigenvalues of their correlation matrix, their explained-variance proportions, and a sensible PC1 direction.

**Q19.** A standardized PCA with $p=3$ gives eigenvalues $(1.9,0.8,0.3)$. How many PCs satisfy the **strict** Kaiser criterion? How many are needed for a target of at least 90% cumulative variance?

**Q20.** A standardized PCA of five variables has eigenvalues $(2.1,1.4,0.9,0.4,0.2)$. Calculate the cumulative variance percentage after two PCs, and state how many exceed 1.

**Q21.** A centered PCA has $n=10$ observations, and one eigenvalue is 4. What is the corresponding singular value? What is that PC's standard deviation?

**Q22.** A standardized-variable PC has eigenvalue 1.44 and unit eigenvector coefficient $e_{ik}=0.5$ for original variable $k$. Calculate the variable–PC correlation and explain why it differs from the rotation coefficient.

**Q23.** Project $(3,4)$ onto the unit direction $(0.6,0.8)$. What is the scalar score and the projected vector?

### Lecture-output interpretation questions

**Q24.** The iris summary reports 0.7296 and 0.2285 for PC1 and PC2. Explain these and calculate their cumulative percentage.

**Q25.** Why does the lecturer select two iris PCs even though the strict Kaiser rule selects only one? Write the issue accurately, not as if the methods agree.

**Q26.** In the iris `rotation` table, PC2 has a Sepal.Width coefficient of $-0.9233$. What can we infer, and what should we **not** infer?

**Q27.** The original iris plot gives a Petal.Length–Petal.Width correlation of 0.96. Is that the same as “PC1 explains 96% of variance”? Explain.

**Q28.** What does the left-side setosa cluster on the PC1–PC2 plot demonstrate? Does it prove PCA is a perfect classifier?

**Q29.** Why was `Species` excluded from `irvar` but used as `groups = irspec` later?

**Q30.** If two PCA software programs print the opposite signs for an entire component vector, must one be wrong? Explain.

**Q31.** State the image size and the 95%-variance component count given in the lecture's image example. What caution applies to generalizing those numbers?

**Q32.** Is multivariate normality a mathematical prerequisite for applying SVD-based PCA? What might still require separate statistical checks?

**Q33.** In the R `princomp` example, why must you not report 50%/50% as the true explained-variance proportions even though such numbers appear in one loadings printout?

### R practical and debugging questions

**Q34.** Write the exact R statement that fits PCA to `irvar`, with both centering and scaling enabled.

**Q35.** Interpret each part of `irvar <- iris[, 1:4]`.

**Q36.** Explain the difference between `irpca$rotation`, `irpca$x`, and `irpca$sdev`.

**Q37.** If `X_svd <- svd(scale(X))`, which of the following creates the standardized component scores: `X %*% X_svd$v` or `scale(X) %*% X_svd$v`? Why?

**Q38.** What does `predict(irpca, newdata = tail(irvar, 2))` return? Why is the lecture's example not a genuine unseen-data evaluation?

**Q39.** Write R code to obtain the eigenvalues of the correlation matrix for the small `X` dataset, and another line to obtain the variances of the PCs from `Xpca`.

**Q40.** A student first fits PCA on the entire dataset, then splits scores into training and test sets for regression. Explain the potential problem and the better procedure.

---

## 23. Fully worked practice answers

### A1. Data-matrix dimensions

$n=120$ because there are 120 customers. $p=9$ because there are 9 numerical features. The original data matrix has shape $120\times9$. If we keep $k=2$ PCs, each customer gets two component scores, so the retained scores have shape $120\times2$.

### A2. Variables, observations, directions, scores

An **observation** is a row, such as one customer. A **variable** is a column, such as monthly spending. A **PC direction** is a unit vector of weights telling PCA how to combine the columns. A **PC score** is the resulting weighted-sum number for **one specific observation**.

### A3. Sample statistics for $(1,3,5)$

$$\bar x=(1+3+5)/3=3.$$

Deviations: $(-2,0,+2)$. Squared deviations: $(4,0,4)$. Their sum is 8. Use the sample denominator $n-1=2$:

$$s^2=8/2=4,\qquad s=\sqrt4=2.$$

The mean is 3, the sample variance is 4, and the sample SD is 2.

### A4. Standardize the value 15

$$z=(15-11)/2=4/2=2.$$

The observation is two sample standard deviations above its variable's mean.

### A5. Correlation interpretation

$+0.95$ is a very strong positive linear relationship; $-0.95$ is a very strong negative linear relationship; 0 indicates no linear correlation. A curved or U-shaped relationship may still exist with correlation close to zero. Correlation does not prove causation.

### A6. Normalize $(6,8)$

Length: $\sqrt{6^2+8^2}=\sqrt{100}=10$. Divide both entries by 10 to obtain the unit vector $(0.6,0.8)$. Unit length stops the optimizer from artificially increasing score variance by simply multiplying a fixed direction by a large number.

### A7. Perpendicular vectors

The dot product is $(1)(-1)+(1)(1)=-1+1=0$. Therefore the vectors are orthogonal. Their unit directions are $(1,1)/\sqrt2$ and $(-1,1)/\sqrt2$.

### A8. Uncorrelated versus independent

PCA directions are selected as orthogonal eigenvectors of a symmetric covariance/correlation matrix; this gives distinct PC-score covariances of zero. Statistical independence is stronger: it concerns the full joint distribution, not just linear association. It follows in special situations such as joint multivariate normal components, but not for arbitrary data.

### A9. The preprocessing arguments

`center = TRUE` subtracts training column means. `scale. = TRUE` divides by training column sample SDs. Scaling is especially important when one feature is annual rupee revenue and another is a percentage ranging between 0 and 1, and the goal is to give equal initial weight to one-SD deviations in each feature.

### A10. More variables than observations

If $p>n$, there are more feature dimensions than sampled observations. Some directions are necessarily redundant after centering, and standard covariance matrices are rank-deficient. The maximum rank of the **centered** $n\times p$ matrix is $\min(n-1,p)$. SVD remains applicable.

### A11. Means and variances of the lecture matrix

Each column mean is $(1+2+3+4)/4=(2+1+4+3)/4=2.5$. Each column has deviations $(-1.5,-0.5,+0.5,+1.5)$ in some order. Sum of squared deviations is 5. Therefore each sample variance is $5/(4-1)=5/3\approx1.666667$. Each sample SD is $\sqrt{5/3}\approx1.290994$.

### A12. Covariance and correlation

Products of paired deviations are $0.75$ for each row, so their sum is 3. Sample covariance is $3/3=1$. Correlation is covariance divided by the product of SDs: $1/(5/3)=0.6$.

### A13. Eigenvalues

Set $\det(\mathbf R-\lambda\mathbf I)=0$:

$$ (1-\lambda)^2-0.36=0.$$

Then $1-\lambda=\pm0.6$. Thus $\lambda=0.4$ or $1.6$. Order them from largest to smallest: $\lambda_1=1.6$, $\lambda_2=0.4$.

### A14. Eigenvectors and formulas

For $\lambda_1=1.6$, the eigenvector entries satisfy $b=a$, giving the unit direction $(0.7071068,0.7071068)$. For $\lambda_2=0.4$, they satisfy $b=-a$; choose $(-0.7071068,0.7071068)$. Therefore:

$$\mathrm{PC1}=0.7071Z_1+0.7071Z_2,$$

$$\mathrm{PC2}=-0.7071Z_1+0.7071Z_2.$$

Opposite signs of an entire vector are equally correct.

### A15. Scores for observation 1

Standardized coordinates:

$$Z_1=(1-2.5)/1.290994=-1.161895,$$

$$Z_2=(2-2.5)/1.290994=-0.387298.$$

Scores:

$$\mathrm{PC1}=0.7071068(-1.161895-0.387298)\approx-1.095445,$$

$$\mathrm{PC2}=0.7071068(1.161895-0.387298)\approx0.547723.$$

### A16. Proportions and SDs

Total standardized variance $=1.6+0.4=2$. Proportions: $1.6/2=80\%$ and $0.4/2=20\%$. PC SDs: $\sqrt{1.6}=1.264911$ and $\sqrt{0.4}=0.632456$.

### A17. One-component reconstruction

Observation 1's PC1 score is approximately $-1.095445$. Multiply it by the unit PC1 direction $(0.7071068,0.7071068)$:

$$\widehat{\mathbf z}=(-0.774597,-0.774597).$$

Undo standardization with $x_j=2.5+1.290994z_j$:

$$\widehat x_1=\widehat x_2=2.5-1.0=1.5.$$

Original $(1,2)$ becomes approximately $(1.5,1.5)$. The reduction loses the information that variable 2 was larger than variable 1.

### A18. Two standardized variables with $r=-0.8$

The matrix is $\begin{bmatrix}1&-0.8\\-0.8&1\end{bmatrix}$. Eigenvalues are $1+0.8=1.8$ and $1-0.8=0.2$, ordered high to low. Total variance is 2; PVE is $1.8/2=90\%$ and $0.2/2=10\%$. A PC1 direction is $(1,-1)/\sqrt2$, because the most variable contrast has one standardized variable rising as the other falls. Its negative is also valid.

### A19. Three-variable selection

Total variance $=1.9+0.8+0.3=3$. Strict Kaiser retains **only PC1**, because only 1.9 exceeds 1. Cumulative PC1 is $1.9/3\approx63.33\%$. First two: $(1.9+0.8)/3=2.7/3=90\%$, so a 90% target retains **two PCs**.

### A20. Five-variable selection

Total variance $=5$. First two total $=2.1+1.4=3.5$; their cumulative variance is $3.5/5=70\%$. Two eigenvalues (2.1 and 1.4) strictly exceed 1, so Kaiser retains two.

### A21. Singular value and PC SD

Use $d=\sqrt{(n-1)\lambda}$ with $n=10$ and $\lambda=4$:

$$d=\sqrt{9(4)}=\sqrt{36}=6.$$

PC standard deviation is $\sqrt{\lambda}=2$, also $d/\sqrt9=6/3=2$.

### A22. Variable–PC correlation

$$\operatorname{Cor}(Y_i,Z_k)=e_{ik}\sqrt{\lambda_i}=0.5\sqrt{1.44}=0.5(1.2)=0.6.$$

The rotation coefficient 0.5 is the weight used in the component formula. The correlation 0.6 measures the association between the resulting component scores and original standardized variable $Z_k$. They are different statistics.

### A23. Projection

Score $=(3)(0.6)+(4)(0.8)=1.8+3.2=5$. Projected vector $=5(0.6,0.8)=(3,4)$. The point already lies exactly in this unit direction, so its reconstruction is unchanged.

### A24. Iris explained variance

PC1 explains 72.96% of total standardized variance and PC2 adds 22.85%. Their cumulative proportion is $0.7296+0.2285=0.9581$, or **95.81%**. Interpret this as variance preservation, **not** prediction accuracy.

### A25. The iris selection-rule disagreement

The scree plot and a goal of retaining around 95% total variance support keeping **PC1 and PC2**. But the PC2 eigenvalue is only $0.91403047<1$, so strict Kaiser keeps **PC1 only**. The lecturer chooses two overall; say which criteria justify that choice and explicitly acknowledge the disagreement.

### A26. The PC2 sepal-width coefficient

Because $|-0.9233|$ is large relative to the other PC2 coefficients, sepal width has a strong **weight** in the PC2 formula. The minus sign indicates orientation under the chosen convention. It does not mean sepal width negatively causes species membership, nor that the variable explains exactly 92.33% of PC2 variance.

### A27. Original-variable correlation versus explained variance

The value 0.96 is the **Pearson correlation between Petal.Length and Petal.Width**, not a PCA variance proportion. The lecturer's PC1 actually explains approximately **72.96%** of the four-variable standardized total variance. A correlation between two features and a variance proportion over all four PC axes are different objects.

### A28. Setosa separation

Setosa has substantially lower PC1 values than the other groups in the plotted data. This suggests the dominant directions of measurement variation align with a meaningful visible species difference. PCA is unsupervised and does not output a classification rule; it therefore does **not** demonstrate perfect predictive classification.

### A29. Excluding the factor column

`Species` is a categorical label, not a metric-valued floral measurement. Standard PCA arithmetic requires suitable numerical variables. The lecturer fits PCA to the first four numeric columns, then colors/groups the **already calculated component scores** using species labels for interpretation.

### A30. Component signs

No. Both $\mathbf v$ and $-\mathbf v$ are valid unit eigenvectors of the same eigenvalue. Flipping the direction reverses that component's scores but does not change explained variance, pairwise distances in the full PC space, or the component's substantive axis.

### A31. Image example

The example is a $3120\times4160$ image. The lecture reports approximately **54 of 3120 component directions** retaining **95% of variance** for this illustration; it also shows reconstructions using 10, 25, 50, 100, 150, and 250 directions. The specific component count does not generalize to arbitrary images or preprocessing choices.

### A32. Multivariate normality

No. Computing centered/scaled SVD or eigendecomposition is an algebraic procedure and does not require a multivariate normal distribution. Formal statistical inference, stability or generalizability claims, or a particular downstream model might require separate assumptions or validation.

### A33. `princomp` loadings table

The `$loadings` display reports **normalized sums of squared loading coefficients**, giving 1 and 1 and thus printed 0.5/0.5 in that particular presentation. It is not the actual component-variance distribution. The eigenvalues are 1.6 and 0.4, so true explained proportions are $1.6/2=0.8$ and $0.4/2=0.2$, as `summary(pca_princomp)` reports.

### A34. Fit PCA in R

```r
irpca <- prcomp(irvar, center = TRUE, scale. = TRUE)
```

### A35. Indexing in R

`iris` is the data frame. The blank before the comma means **all rows**. `1:4` means columns 1 through 4. `<-` assigns the resulting 150-by-4 numeric data frame to `irvar`.

### A36. PCA result fields

`irpca$rotation` contains variable weights defining the PC directions; `irpca$x` contains PC scores for individual flowers; and `irpca$sdev` contains PC-score standard deviations. **Direction coefficients, scores, and standard deviations are three distinct kinds of output.**

### A37. Consistent standardized scores

Use `scale(X) %*% X_svd$v`. The right singular vectors were computed from **standardized X**, so the observation scores must use the same standardized data. `X %*% X_svd$v` rotates **raw X** and gives the different (correctly reported) values in the lecturer's page-16 calculation, but it is not the standardized PCA score matrix.

### A38. `predict()` output

The command returns PC1–PC4 scores for rows 149 and 150 using the fitted iris PCA. The lecturer pretends they are new observations to demonstrate the function, but these rows were actually included in the PCA fitting data, so the example cannot establish out-of-sample performance.

### A39. R eigenvalues and PC variances

```r
eigen(cor(X))$values
Xpca$sdev^2
```

Both should return values equivalent to $(1.6,0.4)$ for the lecture's standardized two-variable dataset.

### A40. Leakage and correct procedure

Fitting PCA to the entire dataset before splitting allows the eventual test observations to influence means, SDs, and principal directions. This can bias a downstream model's evaluation. A better process is to split first, fit scaling and PCA on **training observations only**, transform training and test predictors using that same fitted object, fit the regression on training data, and evaluate on held-out outcomes.

---

## 24. Mistakes students should catch before an exam

| Mistaken statement or action | What is wrong | Correct way to think |
|---|---|---|
| “PC1 is one of the original columns.” | PC1 is generally a weighted linear combination. | Examine `rotation` to see all contributing original variables. |
| “A 0.96 correlation means PC1 explains 96%.” | Pairwise correlation and global component variance are not the same. | Use `summary(pca)` or eigenvalues for PVE. |
| “The largest loading means highest causal impact.” | PCA is descriptive, unsupervised linear algebra. | Interpret it as a weight, not causation. |
| “Negative loadings indicate bad variables.” | The entire PC axis can reverse sign. | Interpret contrasts and relative directions. |
| “Zero correlation means statistical independence.” | Zero covariance captures only linear association. | Independence requires stronger distributional conditions. |
| “PCA must always use `scale. = TRUE`.” | Covariance PCA is also valid. | Choose scaling based on units and research objective. |
| “Centering and standardizing mean the same thing.” | Centering subtracts the mean; standardizing also divides by SD. | State the two operations separately. |
| “The first PC explains the most variance, so it predicts the target best.” | PCA does not use the target. | Validate predictor usefulness separately. |
| “Variance and standard deviation are interchangeable.” | SD is the square root of variance. | Compare eigenvalues, not SDs, to Kaiser's threshold. |
| “The iris Kaiser rule recommends two PCs.” | Only eigenvalue 2.9185 exceeds 1. | Kaiser says one; 95% target and scree support two. |
| “`X %*% V` is the scaled PCA score matrix in the source example.” | `V` was fitted from `scale(X)`. | Use `scale(X) %*% V` or `Xpca$x`. |
| “The `princomp` `$loadings` 0.5/0.5 row gives PCA variance explained.” | Those values refer to printed coefficient normalization. | True PVE from `summary` is 0.8/0.2. |
| “`Species` should be encoded 1,2,3 and mixed into PCA.” | The arbitrary numeric coding distorts the metric. | Keep the factor for visualization after fitting numerical PCA. |
| “`pca$x` contains variable loadings.” | It contains observation scores. | `pca$rotation` contains direction coefficients. |
| “PCs are automatically meaningful business measures.” | Component labels are interpretations, not facts. | Justify any proposed label using measured variables and loadings. |
| “All PCs must be retained to do PCA.” | All PCs give only a rotation. | Retain a subset for actual dimension reduction when appropriate. |
| “Normality testing must precede PCA.” | PCA's linear algebra does not require multivariate normality. | Check assumptions only for specific inferential claims or downstream methods. |
| “A biplot proves classification accuracy.” | It is a descriptive visual display. | Evaluate classification on labeled held-out data. |
| “A PCA fit can be recomputed on each new observation.” | The axes and scales would change. | Transform with the same trained `prcomp` object. |
| “An uncorrelated PC2 has no useful information.” | It can represent an important difference not captured by PC1. | Judge usefulness against the analysis objective. |

---

## 25. PCA formula sheet, with every symbol explained

This section is a reference after learning the derivations. It is **not** a substitute for the preceding chapters.

| Concept | Formula | Read it as |
|---|---|---|
| Sample mean | $\bar x_j=\frac1n\sum_i x_{ij}$ | Average of column $j$ |
| Sample variance | $s_j^2=\frac1{n-1}\sum_i(x_{ij}-\bar x_j)^2$ | Squared spread in column $j$ |
| Sample SD | $s_j=\sqrt{s_j^2}$ | Spread in the original units |
| Sample covariance | $s_{jk}=\frac1{n-1}\sum_i(x_{ij}-\bar x_j)(x_{ik}-\bar x_k)$ | Joint linear variation of columns $j,k$ |
| Pearson correlation | $r_{jk}=s_{jk}/(s_js_k)$ | Unitless standardized covariance |
| Standardized value | $z_{ij}=(x_{ij}-\bar x_j)/s_j$ | Observation $i$ in SD units of variable $j$ |
| Unit direction | $\mathbf v^{\mathsf T}\mathbf v=1$ | Vector length equals one |
| Two directions orthogonal | $\mathbf v_i^{\mathsf T}\mathbf v_j=0$ | Dot product is zero |
| Sample covariance matrix | $\mathbf S=\frac1{n-1}\mathbf A^{\mathsf T}\mathbf A$ | Covariance of centered columns |
| Correlation matrix from standardized data | $\mathbf R=\frac1{n-1}\mathbf A^{\mathsf T}\mathbf A$ | Here $\mathbf A$ is standardized |
| PC eigenvalue equation | $\mathbf R\mathbf e_i=\lambda_i\mathbf e_i$ | Component direction and variance pair |
| One PC score | $t_{hi}=\sum_j a_{hj}e_{ij}$ | Observation $h$ projected onto direction $i$ |
| All scores | $\mathbf T=\mathbf A\mathbf V$ | Data times direction matrix |
| Component variance | $\operatorname{Var}(\mathrm{PC}i)=\lambda_i$ | Eigenvalue is score variance |
| Component SD | $\operatorname{SD}(\mathrm{PC}i)=\sqrt{\lambda_i}$ | Square root of eigenvalue |
| Explained variance | $\mathrm{PVE}_i=\lambda_i/\sum_j\lambda_j$ | PC's share of total variance |
| Standardized explained variance | $\mathrm{PVE}_i=\lambda_i/p$ | Since total standardized variance is $p$ |
| Cumulative explained variance | $\mathrm{CPVE}_k=\sum_{i=1}^{k}\mathrm{PVE}_i$ | Share retained by first $k$ PCs |
| Total standardized variance | $\sum_i\lambda_i=\operatorname{tr}(\mathbf R)=p$ | All PC variances add to $p$ |
| SVD | $\mathbf A=\mathbf U\mathbf D\mathbf V^{\mathsf T}$ | Factorize a rectangular matrix |
| SVD-to-score identity | $\mathbf T=\mathbf A\mathbf V=\mathbf U\mathbf D$ | Scores from either equivalent factorization |
| Singular value relationship | $\lambda_i=d_i^2/(n-1)$ | Squared singular values give sample PC variances |
| Variable–PC correlation | $\operatorname{Cor}(Y_i,Z_k)=e_{ik}\sqrt{\lambda_i}$ | Not identical to eigenvector coefficient |
| Truncated reconstruction | $\widehat{\mathbf A}_k=\mathbf T_k\mathbf V_k^{\mathsf T}$ | Approximate data with first $k$ components |
| Kaiser rule | $\lambda_i>1$ | Heuristic for standardized PCA, with strict threshold |

### Essential symbols

- $n$: number of observations; $p$: original number of numerical variables; $k$: retained component count.
- $i,h$: row/component indices depending on formula; $j,k$: variable or component indices depending on context, explicitly identified in each derivation.
- $\bar x_j$: sample mean of variable $j$; $\mu_j$: population mean; $s_j$: sample SD; $\sigma_{jj}$: population variance.
- $\mathbf X$: original data; $\mathbf A$: centered or standardized data, as stated in the relevant section.
- $\mathbf S$: sample covariance matrix; $\mathbf R$: sample correlation matrix; $\boldsymbol\Sigma$: population covariance matrix; $\boldsymbol\rho$: population correlation matrix.
- $\mathbf V,\boldsymbol\Phi$: matrices of unit PC directions; $\mathbf e_i$: one eigenvector; $\lambda_i$: eigenvalue and component variance.
- $\mathbf T,\mathbf Y$: component scores; $\mathbf U,\mathbf D,\mathbf V$: factors in SVD; $d_i$: singular value.
- $\mathsf T$ or prime ($'$): transpose; $\sum$: sum; $\sqrt{\cdot}$: square root; $\operatorname{tr}$: matrix trace; $\operatorname{Cov}$ and $\operatorname{Cor}$: covariance and correlation.

---

## 26. Source coverage audit: all 21 pages

The following crosswalk was assembled against the **entire source PDF**. The page references below are to the PDF's visible lecture page numbers, not pages in this Markdown document. A page can contribute to several teaching chapters; a numerical output may be repeated in multiple places when it supports a calculation and an interpretation.

| Lecture page | Material actually present in the PDF | Where it is taught in this book | Status |
|---:|---|---|---|
| **1** | PCA definition; correlated variables; high dimensionality $p\approx n$/$p>n$; curse of dimensionality; PCs as maximum-variance orthogonal linear combinations; reduced-data schematic | 1.1–1.7; 3; 5; 15 | Covered |
| **2** | Two-feature PC1/PC2 visual illustration; illustrative 93%/7%; start of PCA in R; `prcomp()` and SVD; iris data and `str(iris)` | 1.4; 5; 8.1; 9; 10.1; 16 | Covered; illustration's percent/correlation caveat explained |
| **3** | Iris data structure, first and last rows; `irvar`, `irspec`; `psych::pairs.panels()` setup | 8.1–8.3; 10.1–10.3 | Covered |
| **4** | Original iris pairs-panel graphic and its correlation values; multicollinearity rationale; numeric predictor choice; importance of scaling; `prcomp(center,scale.)` | 1.5; 4; 8.2–8.4; 10.3–10.4; 11.1 | Covered |
| **5** | `summary(irpca)` SD/PVE/cumulative table; scree-plot commands; eigenvalue rule; `irpca$sdev^2` and its numerical values | 7.2–7.5; 8.5; 10.6–10.7; 11.2 | Covered; Kaiser disagreement explicitly analyzed |
| **6** | Scree plot image; eigenvalue-one rationale; chosen two PCs; orthogonality section; score pairs-panel code | 7; 8.8; 10.8; 11.3 | Covered |
| **7** | PC-score pairs-panel showing near-zero correlations; interpret-PCs introduction; `print(irpca)` SDs and rotation matrix beginnings | 5.4; 8.6–8.8; 10.8–10.9; 11.3 | Covered |
| **8** | Remaining rotation coefficients; PC1 and PC2 signs, contrasts, formulas; squared loadings summing to 1; base `biplot` code | 5.3; 8.6–8.7; 10.9; 11.4–11.5 | Covered |
| **9** | Base biplot graphic; group-colored `ggbiplot` code; `choices`, `groups`, `obs.scale`, `var.scale`, `ellipse` | 11.4–11.6; 20 | Covered |
| **10** | Grouped biplot with species ellipses; variance percentages; arrow interpretation; sepal–petal interpretation; setosa PC1 separation | 8.9–8.10; 11.5–11.8; 21.1 | Covered |
| **11** | `predict()` for last two iris rows and printed PC1–PC4 scores; PCA uses in EDA; feature extraction; original image | 12; 14.1–14.2 | Covered; supplied scores retained |
| **12** | Image dimensions $3120\times4160$; reconstructions at 10/25/50/100/150/250 PCs; 54-PC/95% report; PCR; listed PCA advantages | 14.2–14.5; 21; 23 A31 | Covered |
| **13** | Mathematical $n\times p$ input; $p\times p$ transformation; normalized coefficient vectors; max-variance objective with constraint; PC2 perpendicularity | 3; 5; 15.1–15.9 | Covered; $1/n$ versus sample-variance convention explained |
| **14** | Matrix transformation; scaling and units; SVD choice; lack of normality assumption; SVD definition, orthogonal $U,V$, $5\times3$ shape graphic, $\Phi=V$ | 4; 15.10–15.12; 16.1–16.4 | Covered |
| **15** | $4\times2$ matrix $X$; original/scaled plots; `svd(scale(X))`; singular values and `$u` values | 6.1–6.4; 13.1–13.3; 16.6–16.8 | Covered; printed results preserved |
| **16** | `$v` values; PC1/PC2 formulas; raw `X %*% V` output; scaled/transformed figure; `prcomp` start | 6.7–6.15; 13.4–13.6 | Covered; raw-vs-scaled multiplication discrepancy explicitly explained |
| **17** | `prcomp` rotation and 80/20 summary; eigendecomposition definition; population standardized variables; Result 1 and note on equal eigenvalues | 6.12; 13.6–13.7; 17.1–17.5 | Covered |
| **18** | Population Result 2: total variance, trace, variable–PC correlation, $\lambda_i/p$; sample PCs, estimated eigenpairs, covariances, trace, variance proportions | 17.6–17.10; 18.1–18.6 | Covered; formula proofs added |
| **19** | Small example `cor(X)`; `eigen(R)` values/vectors; `princomp(X, cor=TRUE)` loadings, SD, summary start | 6.5–6.12; 13.7–13.9 | Covered; loadings printout distinguished from true PVE |
| **20** | Completion of `princomp` summary; eigendecomposition–SVD comparison table; when to use each method | 13.8–13.10; 19.1–19.3 | Covered; caveats on distance matrices/rank deficiency |
| **21** | Software approach comparisons: `eigen`, `princomp`, `prcomp`, `psych::principal`, `ade4`, `factoextra`, `FactoMineR`, `epPCA`/`ExPosition` | 9; 13; 19.4–19.5 | Covered; package roles distinguished |

### Numerical verification register

The following lecture-reported numerical checkpoints were retained **without silently substituting different answers**:

| Checkpoint | Lecture-reported result | Independent mathematical cross-check in this book |
|---|---|---|
| Iris Petal.Length–Petal.Width correlation | $r\approx0.96$ | Interpreted as original-variable correlation, not PC variance |
| Iris PC SDs | 1.7083611, 0.9560494, 0.3830886, 0.1439265 | Squaring gives the reported variances |
| Iris eigenvalues | 2.91849782, 0.91403047, 0.14675688, 0.02071484 | Sum is 4 for four standardized inputs |
| Iris PVE (first two) | 0.7296 and 0.2285; cumulative 0.9581 | Consistent with eigenvalue total 4 |
| Iris PC1 rotation | +0.5210659, −0.2693474, +0.5804131, +0.5648565 | Unit squared-length; weighted-score interpretation |
| Iris PC2 rotation | −0.37741762, −0.92329566, −0.02449161, −0.06694199 | Unit squared-length; sepal-width dominance |
| Prediction, row 149 | $(1.3682042,-1.00787793,-0.9302787,0.02604141)$ | PC1/PC2 hand reconstruction from iris means and SDs |
| Prediction, row 150 | $(0.9574485,0.02425043,-0.5264850,-0.16253353)$ | Preserved as printed on page 11 |
| Four-row data correlation | $\begin{bmatrix}1&0.6\\0.6&1\end{bmatrix}$ | Derived from means, sample covariance and sample variances |
| Four-row eigenvalues | 1.6, 0.4 | Derived by the characteristic equation |
| Four-row SVD singular values | 2.190890, 1.095445 | $d_j=\sqrt{3\lambda_j}$ |
| Four-row rotation | $(0.7071068,0.7071068)$ and $(-0.7071068,0.7071068)$ | Derived unit eigenvectors |
| Four-row `prcomp`/`princomp` explained proportions | 80% / 20% | $1.6/2$ and $0.4/2$ |
| Four-row printed `X %*% V` | 2.121320 / 4.949747 in first score-like column | Kept verbatim; identified as rotated *raw* rather than standardized coordinates |
| `princomp` loadings printout 0.5 / 0.5 | Reported in `$loadings` section | Preserved; not confused with 80% / 20% component PVE |
| Image example | 3120×4160; 54 components → 95% variance | Reported as source illustration; image data/code not supplied |
| Two-feature p. 2 diagram | 93% / 7% | Preserved, with caution against assuming it follows from $r=0.56$ for standardized variables |

### What cannot be numerically reconstructed from the PDF alone

The PDF contains **illustrations and output results**, not the raw point coordinates of its page-2 schematic or the numerical pixel matrix and complete reconstruction script for its image-compression example. Their diagrams and reported values are therefore faithfully explained, but it would be misleading to claim we independently reran those exact visual datasets. In contrast, the entire small $4\times2$ example can be verified from the printed entries, and the built-in `iris` data can be reproduced in R.

---

## 27. Final conceptual connections

A learner who understands PCA should be able to explain it in three compatible languages.

**In everyday terms:** Many measurements often describe the same underlying patterns. PCA turns the original axes to find where the observations spread most, then retains a manageable number of those axes. It helps simplify and visualize a dataset while quantifying how much total variation is kept.

**In statistical terms:** PCA constructs uncorrelated linear combinations of centered, optionally standardized variables. Its first component has maximum variance under a unit-length coefficient constraint, and subsequent components maximize remaining variance under orthogonality constraints. Explained variance comes from the ordered eigenvalues of the covariance/correlation matrix.

**In matrix terms:** The prepared data matrix $\mathbf A$ is transformed into scores $\mathbf T=\mathbf A\mathbf V$. Eigendecomposition of $\mathbf A^{\mathsf T}\mathbf A/(n-1)$ yields the right directions and their variances; SVD $\mathbf A=\mathbf U\mathbf D\mathbf V^{\mathsf T}$ provides those directions directly. Retaining the first $k$ columns of $\mathbf V$ produces a rank-$k$ approximation that preserves maximal variance under the conventional PCA objective.

**In R terms:** Select the numerical variables, choose appropriate preprocessing, fit `prcomp()`, inspect `summary()`, `rotation`, and `x`, evaluate the scree plot and biplot, and use `predict()` to transform incoming observations using the original fit. Verify your interpretation using the actual variance proportions rather than an attractive visual alone.

The main lesson is not a command or a memorized eigenvalue theorem. It is the connection between **data spread**, **the best directions for expressing that spread**, **the numerical transformations defining those directions**, and **the practical decision of how much information you can afford to lose**.

---

**End of complete lecture companion. Primary source coverage: 21 of 21 PDF pages.**
