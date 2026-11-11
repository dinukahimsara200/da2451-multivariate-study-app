# DA2451 Multivariate Methods in Business

# Practice Worksheet 2: Complete Beginner-Friendly Teaching Guide

**Topic:** Sample Geometry and Random Sampling  
**Source:** `PQ2Ans.pdf`, *DA2451 - Multivariate Methods in Business*, Semester 4, 2024, pages 1-3  
**Scope:** Questions 1-4 of Worksheet 2 only  
**Level:** Starts from zero prior knowledge of statistics, matrices, geometry, or R  
**Suggested study method:** Read each explanation, reproduce the arithmetic on paper, and only then run the corresponding R code.

## How to use this book

This is a teaching expansion of **all three pages of the supplied worksheet**, not a replacement question sheet. Every original numerical input, mathematical task, and source-supplied result is preserved. The original question appears first, followed immediately by its explanation and solution. Material labeled **Source-provided solution** reproduces what the lecturer supplied, with additional explanatory steps; material labeled **Independently completed** supplies work not included in the PDF. Any supplementary illustration is explicitly distinguished from the original data.

The worksheet tells us: **"Try to do your calculations by hand with a calculator (H) and also use R (R)."** In the question labels, **H** means hand calculations, and **R** means use R. Both approaches are taught wherever helpful, even if only one was requested.

### Navigation

- [Part 0. Foundations before the worksheet](#part-0-foundations-before-the-worksheet)
- [Question 1. Observations, sample geometry, deviations, covariance and correlation](#question-1-h-observations-and-sample-geometry)
- [Question 2. Generalized and total sample variance](#question-2-rh-generalized-and-total-sample-variance)
- [Question 3. Dependent columns and zero generalized variance](#question-3-rh-test-scores-and-linear-dependence)
- [Question 4. Three-variable determinant relationship](#question-4-r-the-determinant-relationship-in-three-variables)
- [Part 5. Consolidated R revision and diagnostic exercises](#part-5-consolidated-r-revision-and-diagnostic-exercises)
- [Part 6. Reference sheet and final checklist](#part-6-reference-sheet-and-final-checklist)



# Part 0. Foundations before the worksheet

You do not need to know the terms in this section already. The goal is to make every symbol encountered in the worksheet feel familiar.

## 0.1 What is a statistical observation?

Imagine we ask three students how much time they studied yesterday and how many practice questions they completed. Each student is **one observation**, because we collect one row of information about that student. The time studied and number of questions completed are **two variables**, because we record two different properties of each student.

We often use these letters:

| Symbol | Read it as | Meaning |
|---|---|---|
| $n$ | "en" | Number of observations (rows) |
| $p$ | "pee" | Number of variables (columns) |
| $X$ | "capital X" | Entire data matrix |
| $X_1$, $X_2$ | "X one", "X two" | The first and second variables |
| $x_{ij}$ | "x sub i j" | Value in row $i$, column $j$ |
| $\bar{x}_j$ | "x bar j" | Average for variable $j$ |
| $s_{jk}$ | "s sub j k" | Sample covariance between variables $j$ and $k$; variance if $j=k$ |
| $r_{jk}$ | "r sub j k" | Sample correlation between variables $j$ and $k$ |
| $\mathbf{S}$ | "capital S" | Sample covariance matrix |
| $\mathbf{R}$ | "capital R" | Sample correlation matrix |

**Supplementary illustration, not part of the worksheet:**

| Student | Hours studied, $X_1$ | Questions completed, $X_2$ |
|---|---:|---:|
| A | 1 | 2 |
| B | 3 | 7 |
| C | 2 | 4 |

Here $n=3$, because there are three students, and $p=2$, because there are two measurements for each student. A student corresponds to a point in **two-dimensional variable space**, for example A is $(1,2)$. The collection of the three values in the first column, $(1,3,2)$, is also a vector in **three-dimensional observation space**. These are two different but equally legitimate ways to see the same dataset. Understanding this distinction is the central learning goal of Question 1.

## 0.2 What is a matrix, and why do we need one?

A **matrix** is simply a rectangular arrangement of numbers. For example,

$$
\mathbf{X}=\begin{bmatrix}9&1\\5&3\\1&2\end{bmatrix}
$$

has three rows and two columns, so its **dimension** is $3\times 2$, spoken "three by two". The first row means that the first observed item had measurement 9 on variable 1 and measurement 1 on variable 2. The last row means the third item had measurements 1 and 2.

Important: **a $3\times2$ matrix is not a two-by-three matrix**. Its order is rows first, then columns. If you swap rows and columns, you have changed its mathematical arrangement.

A **scalar** is one ordinary number, such as $9$ or $-2$. A **vector** is an ordered set of numbers, usually written as a row or column. The first column of this matrix is

$$
\mathbf{y}_1=\begin{bmatrix}9\\5\\1\end{bmatrix},
$$

while the second is

$$
\mathbf{y}_2=\begin{bmatrix}1\\3\\2\end{bmatrix}.
$$

The bold letters $\mathbf{X}$ and $\mathbf{y}_1$ emphasize that we are dealing with an entire matrix or vector, not just one number. The lecturer uses $X$, $y_1$, and $y_2$ without always bolding them; they mean the same objects.

## 0.3 What do the small numbers below a symbol mean?

An **index** helps us keep track of positions. In $x_{23}$, the first small number is the **row** and the second is the **column**. Thus $x_{23}$ is the value belonging to observation 2, variable 3. In $s_{12}$ the two numbers refer to **variables**, not rows of the original data: it is covariance between variable 1 and variable 2.

Other mathematical symbols you will see:

| Notation | Plain-English meaning | Tiny illustration |
|---|---|---|
| $+$ | Add | $2+3=5$ |
| $-$ | Subtract or negative | $2-5=-3$ |
| $a^2$ | Square $a$ | $(-4)^2=16$ |
| $\sqrt{a}$ | Positive square root of $a$ | $\sqrt{9}=3$ |
| $\sum$ | Add a sequence of terms | $\sum_{i=1}^3 i=1+2+3=6$ |
| $\frac{a}{b}$ | Divide $a$ by $b$ | $\frac{8}{2}=4$ |
| $\mathbf{d}'$ or $\mathbf{d}^{\mathsf T}$ | Transpose vector $\mathbf{d}$ | Column $\to$ row |
| $\mathbf{a}'\mathbf{b}$ | Dot product | Multiply matching entries, then add |
| $\lVert\mathbf{d}\rVert$ | Length of vector | $\sqrt{d_1^2+\cdots+d_n^2}$ |
| $|\mathbf{S}|$ or $\det(\mathbf{S})$ | Determinant of matrix $\mathbf{S}$ | A single number produced from a square matrix |
| $\operatorname{tr}(\mathbf{S})$ | Trace of matrix $\mathbf{S}$ | Add entries on its main diagonal |
| $\approx$ | Approximately equal to | $\sqrt2\approx1.4142$ |
| $\Rightarrow$ | Implies; therefore | $x=2\Rightarrow x^2=4$ |
| $\theta$ | Greek "theta" | An angle |
| $\cos(\theta)$ | Cosine of the angle | $\cos(120^\circ)=-0.5$ |

The symbol $'$ in $\mathbf{d}'$ **does not mean a derivative** in this worksheet. It means **transpose**, which changes a column to a row or vice versa. For example,

$$
\begin{bmatrix}4\\0\\-4\end{bmatrix}'=\begin{bmatrix}4&0&-4\end{bmatrix}.
$$

## 0.4 The sample mean: the balancing point

The **sample mean** is the ordinary average. To find it, add the measurements and divide by how many there are:

$$
\bar{x}_j=\frac{1}{n}\sum_{i=1}^{n}x_{ij}.
$$

Read this slowly: $n$ is the number of rows; $i=1$ to $n$ tells us to move through each row; $x_{ij}$ picks the number from row $i$ and column $j$; and $1/n$ means divide the total by $n$.

For the simple values $2,4,9$:

$$
\bar{x}=\frac{2+4+9}{3}=\frac{15}{3}=5.
$$

**Intuition:** the mean is a balancing point. If all the values are placed as equal weights on a number line, the average is the point where their signed deviations balance out:

$$
(2-5)+(4-5)+(9-5)=-3-1+4=0.
$$

That last result is not a coincidence. **Deviations from the sample mean always sum to zero.**

For $p$ variables, put the $p$ averages into one **sample mean vector**:

$$
\bar{\mathbf{x}}=\begin{bmatrix}\bar{x}_1\\\bar{x}_2\\\vdots\\\bar{x}_p\end{bmatrix}.
$$

It tells us where the cloud of observations is centered when the variables are plotted as coordinates.

## 0.5 Deviations: how far from the average?

A **deviation** is simply the observed value minus its mean:

$$
\text{deviation}=\text{observation}-\text{average}.
$$

Using $2,4,9$ and mean 5, the deviations are $-3,-1,4$. A negative deviation means below the mean, a positive deviation means above it, and zero means exactly at the mean. The original values can be rebuilt as mean plus deviation: $2=5+(-3)$; $9=5+4$.

For a complete column of $n$ observations, the centered values form a **deviation vector**. For example, if $\mathbf{y}=[2,4,9]'$, then

$$
\mathbf{d}=\mathbf{y}-5\begin{bmatrix}1\\1\\1\end{bmatrix}
=\begin{bmatrix}-3\\-1\\4\end{bmatrix}.
$$

Why multiply the mean by $[1,1,1]'$? Because you must subtract the same mean from **each** of the three values. We call $[1,1,1]'$ the **vector of ones**, written $\mathbf{1}$.

## 0.6 How can numbers become geometry?

**Variable space** puts each observation on a graph with one axis per variable. When $p=2$, the first measurement is the horizontal coordinate and the second the vertical coordinate. There are $n$ dots on a two-dimensional graph. When $p=3$, each observation would be a dot in a three-dimensional graph.

**Observation space** reverses the viewpoint: each **variable** is represented by a vector containing its measurements across all $n$ observations. Each of those vectors has $n$ coordinates. Thus $n=3$ gives three-dimensional observation space, even if we measured only two variables.

Do not confuse them:

| Viewpoint | One geometric object represents | Number of geometric dimensions | For a $3\times2$ matrix |
|---|---|---|---|
| Variable space | One **observation** (one row) | $p$, the number of columns | Three points in a 2D graph |
| Observation space | One **variable** (one column) | $n$, the number of rows | Two vectors in a 3D graph |

These two representations reveal different but related information. Variable space makes it easy to see relationships among the observations, while observation space makes variation and correlation understandable as **vector lengths and angles**.

## 0.7 Three ways of describing variation

Suppose there are $n$ measurements $x_1,\ldots,x_n$ of one variable.

**(1) Sample variance** tells us how spread out that variable is. Its formula is

$$
 s^2=\frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar{x})^2.
$$

The squared deviations are never negative. A big variance means values lie farther from the mean. The units are squared: if the original variable is measured in meters, the variance is in square meters.

**Why $n-1$ rather than $n$?** This is the usual *sample* variance. Once the sample mean has been calculated from the same $n$ values, the $n$ deviations must add up to zero. Only $n-1$ deviations can vary freely. Dividing by $n-1$ also produces an unbiased estimator of population variance under ordinary random sampling assumptions. This last property does not mean every sample estimate equals the population variance; it means the estimator is correct **on average across repeated random samples**.

**(2) Sample covariance** describes whether two variables tend to increase and decrease together:

$$
 s_{12}=\frac{1}{n-1}\sum_{i=1}^{n}(x_{i1}-\bar{x}_1)(x_{i2}-\bar{x}_2).
$$

- Both deviations positive, or both negative: their product is positive, indicating movement in the same direction relative to their averages.
- One positive and one negative: their product is negative, indicating movement in opposite directions.
- Mixtures of positive and negative products may cancel, giving small covariance.

Covariance depends on units, so it can be difficult to interpret by magnitude alone.

**(3) Sample correlation** removes the variable units:

$$
 r_{12}=\frac{s_{12}}{s_1s_2}
 =\frac{s_{12}}{\sqrt{s_{11}}\sqrt{s_{22}}}.
$$

Here $s_1=\sqrt{s_{11}}$ and $s_2=\sqrt{s_{22}}$ are the **sample standard deviations**. Correlation lies between $-1$ and $+1$. Positive means a positive **linear** relationship, negative means a negative linear relationship, and zero means no **linear** association detected by this measure. Zero correlation does **not**, in general, prove independence.

Why is correlation bounded? It is the cosine of the angle between the two centered variable vectors, and the cosine of an angle is always between $-1$ and $1$. You will prove this connection in Question 1.

## 0.8 Covariance matrix and correlation matrix

With two variables, we collect the variances and covariance into

$$
\mathbf{S}=\begin{bmatrix}s_{11}&s_{12}\\s_{21}&s_{22}\end{bmatrix}.
$$

- $s_{11}$: variance of variable 1.
- $s_{22}$: variance of variable 2.
- $s_{12}$ and $s_{21}$: covariance between the two variables. They must be equal.

Similarly,

$$
\mathbf{R}=\begin{bmatrix}1&r_{12}\\r_{21}&1\end{bmatrix}.
$$

The diagonal entries of a correlation matrix are 1 because a variable is perfectly correlated with **itself**, provided it actually varies. Correlation matrices are symmetric, meaning $r_{12}=r_{21}$.

When there are $p=3$ variables, these are $3\times3$ matrices, one row and one column per variable.

## 0.9 What does random sampling mean here?

The worksheet is principally about **descriptive sample geometry**, not probability distributions or hypothesis testing. But its title includes "Random Sampling," so the statistical background matters.

A **population** is the entire group about which we might ultimately want conclusions. A **sample** is the subset of units measured. A **random sample** is selected using an appropriate random mechanism, ideally giving measurements that can be treated as independent draws from the same population distribution. Independence means that knowing one sampled unit does not by itself determine the next; identical distribution means the draws follow the same underlying population model.

The four questions give fixed numerical datasets or fixed matrices. We can compute their sample means, covariances, determinants and correlations **whether or not** we know the sampling procedure. But using those statistics to make reliable claims about a wider population requires thinking about how the sample was collected. In particular, **none of the questions asks you to perform a hypothesis test**, and no p-value should be invented.



# Question 1 (H): Observations and sample geometry

**Source location:** Page 1 and the beginning of page 2.  
**Solution status:** The source includes the mean, both deviation vectors, lengths, inner product, cosine/correlation, and covariance and correlation matrices. This chapter retains those supplied results and expands every intermediate step.

## Original question (faithfully reproduced)

**Question 1 (H)**

Given the data matrix

$$
\mathbf{X}=\begin{bmatrix}
9&1\\
5&3\\
1&2
\end{bmatrix}.
$$

**(a)** Graph the scatter plot in $p=2$ dimensions. Locate the sample mean on your diagram.

**(b)** Sketch the $n=3$-dimensional representation of the data.

**(c)** Calculate the deviation vectors $\mathbf{d}_1=\mathbf{y}_1-\bar{x}_1\mathbf{1}$ and $\mathbf{d}_2=\mathbf{y}_2-\bar{x}_2\mathbf{1}$.

**(d)** Calculate the length of each deviation vector and the cosine of the angle between them. Relate these quantities to the sample variance-covariance matrix $\mathbf{S}$ and the sample correlation matrix $\mathbf{R}$.

## First, read the matrix as an ordinary table

| Observation | Variable 1, $X_1$ | Variable 2, $X_2$ |
|---|---:|---:|
| 1 | 9 | 1 |
| 2 | 5 | 3 |
| 3 | 1 | 2 |

There are $n=3$ rows and $p=2$ columns. The variable values have not been given physical units in the worksheet, so we should not invent units or describe them as particular real-world measurements. The numbers are all we need.

## 1(a). Plot the three observations in two-dimensional space

### What is the question asking?

Treat each **row** as a pair of coordinates. Put the first column on the horizontal axis, the second column on the vertical axis, plot the three points, and find the average position. A **scatter plot** is a graph of dots: each dot is one pair of measurements.

### Step 1: Extract the coordinates

The rows give

$$
P_1=(9,1),\qquad P_2=(5,3),\qquad P_3=(1,2).
$$

For $P_1=(9,1)$, move to 9 on the horizontal axis and 1 on the vertical axis. The procedure is the same for the other observations.

### Step 2: Find the mean of the first variable

$$
\bar{x}_1=\frac{9+5+1}{3}
=\frac{15}{3}=\boxed{5}.
$$

### Step 3: Find the mean of the second variable

$$
\bar{x}_2=\frac{1+3+2}{3}
=\frac{6}{3}=\boxed{2}.
$$

### Step 4: Form the sample mean vector

$$
\boxed{\bar{\mathbf{x}}=\begin{bmatrix}5\\2\end{bmatrix}.}
$$

This **matches the lecturer's source-provided answer** on page 1. Place an additional, clearly marked point at $(5,2)$ on the same graph. That is the **centroid**, or balancing center, of the three points.

### An easy hand-drawn guide

```text
X2 (vertical)
 4 |
 3 |                P2 = (5,3)
 2 |  P3 = (1,2)     M = (5,2)  <- sample mean
 1 |                               P1 = (9,1)
 0 +------------------------------------------------ X1 (horizontal)
     0   1   2   3   4   5   6   7   8   9
```

This is a **schematic** showing which points to label, not a precisely scaled plot. The reproducible R plot below places the points at their exact coordinates.

### Why is the mean point meaningful?

The three horizontal deviations from the mean are $9-5=4$, $5-5=0$, and $1-5=-4$, which add to zero. The vertical deviations are $1-2=-1$, $3-2=1$, and $2-2=0$, which also add to zero. Thus the mean location has balanced offsets in **both directions**.

Another way to say it: the mean of multiple points is obtained by averaging their horizontal coordinates separately from their vertical coordinates. We do **not** first average the distances between points.

### R implementation for Question 1(a)

```r
# Enter one observation per row, one variable per column.
X <- matrix(c(9, 1,
              5, 3,
              1, 2), nrow = 3, byrow = TRUE)

# Give the columns useful names.
colnames(X) <- c("X1", "X2")

# Calculate the average for each column.
xbar <- colMeans(X)

# Draw one point for each row.
plot(X[, 1], X[, 2],
     xlab = "Variable X1", ylab = "Variable X2",
     main = "Q1(a): observations and sample mean",
     pch = 19, xlim = c(0, 10), ylim = c(0, 4))

# Label the original observations.
text(X[, 1], X[, 2], labels = 1:3, pos = 3)

# Add the mean as a distinct symbol.
points(xbar[1], xbar[2], pch = 4, cex = 1.7, lwd = 2)
text(xbar[1], xbar[2], labels = "Mean (5, 2)", pos = 1)

# Print the numerical mean in the Console.
xbar
```

**Line-by-line essentials:** `matrix()` creates the numerical table. `c()` joins numbers into one vector. `nrow = 3` instructs R to make three rows. `byrow = TRUE` means use the values in the displayed order, left to right across each row. Without `byrow = TRUE`, R fills a matrix down its columns, giving a different dataset. `X[, 1]` means all rows of the first column; `X[, 2]` means all rows of the second. `plot()` draws the two-dimensional graph. `pch` selects a plotting symbol. `points()` adds a new symbol. `colMeans()` gives one average for each variable, here **5 and 2**.

### Common mistakes in 1(a)

- Plotting $(1,9)$ instead of $(9,1)$: this exchanges the variable axes.
- Assuming $p=2$ means two observations: here $p=2$ means **two variables**, while $n=3$ means **three observations**.
- Averaging all six numbers together instead of calculating **one mean per column**.
- Plotting $\bar{\mathbf{x}}$ at $(2,5)$ instead of $(5,2)$.
- Confusing the centroid with one of the observations. Here the centroid has the same first coordinate as observation 2, but its second coordinate differs.

## 1(b). Represent the variables as three-dimensional vectors

### What does this different "dimension" mean?

Question 1(a) has **three dots in a two-dimensional graph** because it uses one dot per observation. Question 1(b) asks for **two vectors in a three-dimensional graph** because it now uses one vector per variable and each variable contains three measurements.

This is the most important conceptual switch in the worksheet. **The data did not change. Only the viewpoint changed.**

### Step 1: Read down the columns

The first column becomes

$$
\mathbf{y}_1=\begin{bmatrix}9\\5\\1\end{bmatrix}.
$$

In a 3D coordinate system, its endpoint is $(9,5,1)$. The second column becomes

$$
\mathbf{y}_2=\begin{bmatrix}1\\3\\2\end{bmatrix},
$$

with endpoint $(1,3,2)$.

In the 3D sketch, label axes by **observation number**, not variable number:

- Axis 1: the measurement on observation 1.
- Axis 2: the measurement on observation 2.
- Axis 3: the measurement on observation 3.

Then draw an arrow from the common origin $(0,0,0)$ to each endpoint. The arrows are the two variable vectors. Although the axes have three coordinates, there are **only two variable vectors**.

### Step 2: Identify the common "mean direction"

Each column average is shared equally across its three coordinates. Define

$$
\mathbf{1}=\begin{bmatrix}1\\1\\1\end{bmatrix}.
$$

The part of the first variable consisting of its mean is

$$
\bar{x}_1\mathbf{1}=5\mathbf{1}=\begin{bmatrix}5\\5\\5\end{bmatrix}.
$$

For the second variable it is

$$
\bar{x}_2\mathbf{1}=2\mathbf{1}=\begin{bmatrix}2\\2\\2\end{bmatrix}.
$$

Both mean vectors lie on the 3D line in direction $(1,1,1)$, meaning every coordinate is equal. The vector $\mathbf{1}$ points along the diagonal line through $(0,0,0)$, $(1,1,1)$, $(2,2,2)$, and so on.

### Step 3: What should the sketch show?

A useful 3D sketch includes the origin, both arrows $\mathbf{y}_1$ and $\mathbf{y}_2$, the diagonal direction $\mathbf{1}$, and optionally the **centered** vectors $\mathbf{d}_1$ and $\mathbf{d}_2$ from part (c). You will discover that the centered vectors have no component along the mean direction.

**Supplementary geometric insight:** the first variable vector decomposes into "mean part + deviation part":

$$
\begin{aligned}
\mathbf{y}_1
&=\underbrace{\begin{bmatrix}5\\5\\5\end{bmatrix}}_{\text{mean part}}
+\underbrace{\begin{bmatrix}4\\0\\-4\end{bmatrix}}_{\text{deviation part}},\\[4pt]
\mathbf{y}_2
&=\underbrace{\begin{bmatrix}2\\2\\2\end{bmatrix}}_{\text{mean part}}
+\underbrace{\begin{bmatrix}-1\\1\\0\end{bmatrix}}_{\text{deviation part}}.
\end{aligned}
$$

This shows **why subtracting the mean is called centering**: it removes the common background level and leaves the variation between observations.

### A practical manual sketch method

1. Draw three axes from one origin, with approximate directions right, upper right, and up.
2. Label them observation 1, observation 2, and observation 3.
3. Mark the point $(9,5,1)$ and draw a vector from the origin labeled $\mathbf{y}_1$.
4. Mark $(1,3,2)$ and draw another vector labeled $\mathbf{y}_2$.
5. Draw a faint diagonal arrow in the direction $(1,1,1)$ to indicate the mean line.
6. In a separate centered sketch, draw vectors $\mathbf{d}_1$ and $\mathbf{d}_2$ from the origin. They lie in a common plane perpendicular to the $(1,1,1)$ direction.

The source requests a **sketch** and gives no finished 3D image. This is the completed construction instruction, not a claim that the PDF contains a picture.

### An optional base-R way to inspect the column vectors

The following code prints the two 3D endpoints and checks the decompositions. It needs no external R packages.

```r
X <- matrix(c(9, 1, 5, 3, 1, 2), nrow = 3, byrow = TRUE)
y1 <- X[, 1]
y2 <- X[, 2]
one <- rep(1, nrow(X))
xbar <- colMeans(X)

y1
# Expected: 9 5 1

y2
# Expected: 1 3 2

xbar[1] * one
# Expected: 5 5 5

xbar[2] * one
# Expected: 2 2 2

# Check that mean part plus centered part equals the original.
all.equal(xbar[1] * one + (y1 - xbar[1] * one), y1)
```

`rep(1, 3)` creates the three-entry vector $(1,1,1)$. `all.equal()` checks numerical equality; it should return `TRUE`.

### Common mistake

In Question 1(b), do not represent the first row $(9,1)$ as the first three-dimensional vector. A row has only two values. Here **the columns**, not the rows, create the three-dimensional vectors.

## 1(c). Calculate both deviation vectors

### What is a deviation vector in everyday language?

A deviation vector is a list answering: "For each observation, how much higher or lower was this variable compared with its own average?" For the first variable the average is 5. For the second the average is 2. We must use the **correct average for each column**.

### First variable: $\mathbf{d}_1$

Recall

$$
\mathbf{y}_1=\begin{bmatrix}9\\5\\1\end{bmatrix},\quad
\bar{x}_1=5,\quad
\mathbf{1}=\begin{bmatrix}1\\1\\1\end{bmatrix}.
$$

Substitute into the worksheet formula:

$$
\begin{aligned}
\mathbf{d}_1
&=\mathbf{y}_1-\bar{x}_1\mathbf{1}\\
&=\begin{bmatrix}9\\5\\1\end{bmatrix}
-5\begin{bmatrix}1\\1\\1\end{bmatrix}\\
&=\begin{bmatrix}9\\5\\1\end{bmatrix}-\begin{bmatrix}5\\5\\5\end{bmatrix}\\
&=\begin{bmatrix}9-5\\5-5\\1-5\end{bmatrix}\\
&=\boxed{\begin{bmatrix}4\\0\\-4\end{bmatrix}}.
\end{aligned}
$$

Interpretation: observation 1 is 4 units above the first variable's mean; observation 2 is exactly at the mean; observation 3 is 4 units below the mean.

### Second variable: $\mathbf{d}_2$

Use the second variable's own mean $\bar{x}_2=2$:

$$
\begin{aligned}
\mathbf{d}_2
&=\mathbf{y}_2-\bar{x}_2\mathbf{1}\\
&=\begin{bmatrix}1\\3\\2\end{bmatrix}-2\begin{bmatrix}1\\1\\1\end{bmatrix}\\
&=\begin{bmatrix}1-2\\3-2\\2-2\end{bmatrix}\\
&=\boxed{\begin{bmatrix}-1\\1\\0\end{bmatrix}}.
\end{aligned}
$$

Interpretation: observation 1 is 1 below the second variable's mean; observation 2 is 1 above it; observation 3 is right at the mean.

**Source-provided solutions:** both vectors above agree exactly with page 1.

### Check 1: each deviation vector sums to zero

$$
\begin{aligned}
4+0+(-4)&=0,\\
(-1)+1+0&=0.
\end{aligned}
$$

This is an important hand-calculation checkpoint. If your deviations do not sum to zero, recheck the mean or subtraction.

### Check 2: deviation vectors are perpendicular to the mean direction

In vector notation, summing the entries of $\mathbf{d}$ is the dot product $\mathbf{1}'\mathbf{d}$. For these data,

$$
\begin{aligned}
\mathbf{1}'\mathbf{d}_1&=[1\ \ 1\ \ 1]\begin{bmatrix}4\\0\\-4\end{bmatrix}=4+0-4=0,\\
\mathbf{1}'\mathbf{d}_2&=[1\ \ 1\ \ 1]\begin{bmatrix}-1\\1\\0\end{bmatrix}=-1+1+0=0.
\end{aligned}
$$

When two nonzero vectors have dot product zero, they are **perpendicular**, also called **orthogonal**. Hence the centered vectors lie in the plane perpendicular to $\mathbf{1}$. This is a deeper geometric reason that we lose one degree of freedom by centering the observations: the deviations are constrained to a plane rather than being free to point anywhere in 3D space.

### Compact table for checking all deviations

| Observation | $X_1$ | $X_1-5$ | $X_2$ | $X_2-2$ |
|---|---:|---:|---:|---:|
| 1 | 9 | 4 | 1 | -1 |
| 2 | 5 | 0 | 3 | 1 |
| 3 | 1 | -4 | 2 | 0 |
| **Sum** | **15** | **0** | **6** | **0** |

### R for Question 1(c)

```r
X <- matrix(c(9, 1, 5, 3, 1, 2), nrow = 3, byrow = TRUE)
xbar <- colMeans(X)

# Sweep over the columns and subtract the corresponding mean.
D <- sweep(X, MARGIN = 2, STATS = xbar, FUN = "-")
D

# Extract the two columns as vectors.
d1 <- D[, 1]
d2 <- D[, 2]

# Verify that every deviation column sums to zero.
colSums(D)
```

Here `sweep()` applies a calculation to an entire array. `MARGIN = 2` means operate **column by column**, `STATS = xbar` supplies the column means, and `FUN = "-"` says to subtract them. The expected centered matrix is

$$
\mathbf{D}=\begin{bmatrix}4&-1\\0&1\\-4&0\end{bmatrix}.
$$

`colSums(D)` should give two zeros.

## 1(d). Vector lengths, angle, sample covariance and correlation

This part is where geometry becomes statistics. We will derive every part slowly.

### Step 1: Understand vector length

A vector $\mathbf{d}=[a,b]'$ in a two-dimensional graph has Pythagorean length $\sqrt{a^2+b^2}$. In three dimensions the length is

$$
\lVert\mathbf{d}\rVert=\sqrt{a^2+b^2+c^2}.
$$

The length is a nonnegative number. It measures the overall size of the deviations. Longer deviation vectors mean **more spread** in the corresponding variable, although the number of observations also matters when turning length into sample variance.

In matrix notation, the squared length is the dot product of the vector with itself:

$$
\lVert\mathbf{d}\rVert^2=\mathbf{d}'\mathbf{d}.
$$

Why? Because $[a,b,c][a,b,c]'=a^2+b^2+c^2$.

### Step 2: Length of $\mathbf{d}_1$

$$
\begin{aligned}
L_{d_1}
&=\sqrt{\mathbf{d}_1'\mathbf{d}_1}\\
&=\sqrt{4^2+0^2+(-4)^2}\\
&=\sqrt{16+0+16}\\
&=\boxed{\sqrt{32}}\\
&\approx\boxed{5.6569}.
\end{aligned}
$$

The important intermediate number $32$ is the **sum of squared deviations** of variable 1. Its square root is the deviation-vector length.

### Step 3: Length of $\mathbf{d}_2$

$$
\begin{aligned}
L_{d_2}
&=\sqrt{\mathbf{d}_2'\mathbf{d}_2}\\
&=\sqrt{(-1)^2+1^2+0^2}\\
&=\sqrt{1+1+0}\\
&=\boxed{\sqrt2}\\
&\approx\boxed{1.4142}.
\end{aligned}
$$

The sum of squared deviations of variable 2 is $2$.

**Source-provided solutions:** $L_{d_1}=\sqrt{32}$ and $L_{d_2}=\sqrt2$, matching page 1.

### Step 4: Understand the dot product of different vectors

To calculate a dot product, multiply corresponding entries and add:

$$
\begin{bmatrix}a\\b\\c\end{bmatrix}'
\begin{bmatrix}u\\v\\w\end{bmatrix}
=au+bv+cw.
$$

For our deviations,

$$
\begin{aligned}
\mathbf{d}_1'\mathbf{d}_2
&=[4\ \ 0\ \ -4]\begin{bmatrix}-1\\1\\0\end{bmatrix}\\
&=4(-1)+0(1)+(-4)(0)\\
&=-4+0+0\\
&=\boxed{-4}.
\end{aligned}
$$

This is called an **inner product** as well as a dot product. It is negative because, taken together, the variables tend to deviate in opposing directions. Notice the products in each row:

| Observation | Deviation in $X_1$ | Deviation in $X_2$ | Product |
|---|---:|---:|---:|
| 1 | 4 | -1 | -4 |
| 2 | 0 | 1 | 0 |
| 3 | -4 | 0 | 0 |
| **Total** | | | **-4** |

### Step 5: Convert the dot product into an angle

The dot product has an equivalent geometric formula:

$$
\mathbf{d}_1'\mathbf{d}_2
=\lVert\mathbf{d}_1\rVert\lVert\mathbf{d}_2\rVert\cos\theta,
$$

where $\theta$ is the angle between the two centered vectors, measured with their tails placed at the same origin.

Divide both sides by the product of their lengths:

$$
\cos\theta=\frac{\mathbf{d}_1'\mathbf{d}_2}{\lVert\mathbf{d}_1\rVert\lVert\mathbf{d}_2\rVert}.
$$

Substitute the three quantities already calculated:

$$
\begin{aligned}
\cos\theta
&=\frac{-4}{\sqrt{32}\sqrt2}\\
&=\frac{-4}{\sqrt{32\times2}}\\
&=\frac{-4}{\sqrt{64}}\\
&=\frac{-4}{8}\\
&=\boxed{-0.5}.
\end{aligned}
$$

The inverse cosine tells us the angle:

$$
\theta=\cos^{-1}(-0.5)=\boxed{120^\circ}.
$$

An angle of $120^\circ$ is **obtuse** (greater than $90^\circ$). This explains the negative association geometrically. A rough visual guide:

| Angle | Cosine | Geometric meaning for deviation vectors | Correlation |
|---|---:|---|---|
| $0^\circ$ | $+1$ | Same direction | Perfect positive |
| $60^\circ$ | $+0.5$ | Generally pointing together | Positive |
| $90^\circ$ | $0$ | Perpendicular | Zero |
| $120^\circ$ | $-0.5$ | Generally pointing apart | Negative |
| $180^\circ$ | $-1$ | Exact opposite directions | Perfect negative |

### Step 6: Connect the squared lengths to sample variances

Recall the sample variance formula. For variable 1,

$$
 s_{11}=\frac{(9-5)^2+(5-5)^2+(1-5)^2}{3-1}.
$$

We already computed the numerator as $32$, so

$$
\boxed{s_{11}=\frac{32}{2}=16.}
$$

For variable 2,

$$
 s_{22}=\frac{(1-2)^2+(3-2)^2+(2-2)^2}{3-1}
=\frac{2}{2}=\boxed{1}.
$$

The geometric formulas are therefore

$$
\boxed{(n-1)s_{11}=\lVert\mathbf{d}_1\rVert^2},\qquad
\boxed{(n-1)s_{22}=\lVert\mathbf{d}_2\rVert^2}.
$$

With $n=3$, $n-1=2$. The distinction matters: **vector length is not itself the sample variance**. We first square the length, then divide by $n-1$.

### Step 7: Connect the cross-dot-product to sample covariance

The sample covariance is

$$
\begin{aligned}
s_{12}
&=\frac{1}{n-1}\sum_{i=1}^{n}(x_{i1}-\bar{x}_1)(x_{i2}-\bar{x}_2)\\
&=\frac{4(-1)+0(1)+(-4)(0)}{2}\\
&=\frac{-4}{2}\\
&=\boxed{-2}.
\end{aligned}
$$

And therefore

$$
\boxed{(n-1)s_{12}=\mathbf{d}_1'\mathbf{d}_2}.
$$

A negative covariance here means that relatively high first-variable observations tend to go with relatively low second-variable observations, in a linear sense. It does **not** mean every pair must move in opposite directions, and it does not prove cause and effect.

### Step 8: Connect the angle to sample correlation

We know from statistics that

$$
 r_{12}=\frac{s_{12}}{\sqrt{s_{11}}\sqrt{s_{22}}}.
$$

Insert the sample values:

$$
\begin{aligned}
r_{12}
&=\frac{-2}{\sqrt{16}\sqrt1}\\
&=\frac{-2}{4\times1}\\
&=\boxed{-0.5}.
\end{aligned}
$$

This is **exactly the cosine** found above. Here is why the equality is true **for any two nonconstant sampled variables**:

$$
\begin{aligned}
r_{12}
&=\frac{s_{12}}{\sqrt{s_{11}}\sqrt{s_{22}}}\\[4pt]
&=\frac{\mathbf{d}_1'\mathbf{d}_2/(n-1)}
{\sqrt{\mathbf{d}_1'\mathbf{d}_1/(n-1)}\sqrt{\mathbf{d}_2'\mathbf{d}_2/(n-1)}}\\[6pt]
&=\frac{\mathbf{d}_1'\mathbf{d}_2/(n-1)}
{\left(\lVert\mathbf{d}_1\rVert/\sqrt{n-1}\right)
\left(\lVert\mathbf{d}_2\rVert/\sqrt{n-1}\right)}\\[6pt]
&=\frac{\mathbf{d}_1'\mathbf{d}_2/(n-1)}
{\lVert\mathbf{d}_1\rVert\lVert\mathbf{d}_2\rVert/(n-1)}\\[6pt]
&=\frac{\mathbf{d}_1'\mathbf{d}_2}
{\lVert\mathbf{d}_1\rVert\lVert\mathbf{d}_2\rVert}\\[4pt]
&=\boxed{\cos\theta}.
\end{aligned}
$$

The $n-1$ terms **cancel**. This proves that correlation is fundamentally about **direction**, while variances are about **size** of the deviation vectors.

### Step 9: Construct the covariance matrix $\mathbf{S}$

Write the first-variable variance at position $(1,1)$, second-variable variance at $(2,2)$, and cross-covariance at the off-diagonal positions:

$$
\boxed{\mathbf{S}=\begin{bmatrix}16&-2\\-2&1\end{bmatrix}.}
$$

### Step 10: Construct the correlation matrix $\mathbf{R}$

The diagonal entries are 1 and both off-diagonal correlations are $-0.5$:

$$
\boxed{\mathbf{R}=\begin{bmatrix}1&-0.5\\-0.5&1\end{bmatrix}.}
$$

**Source-provided final results (page 2):** $s_{11}=16$, $s_{22}=1$, $s_{12}=-2$, $r_{12}=-0.5$, and the two matrices above. All have been independently checked and agree.

### Step 11: See why $\mathbf{S}=\mathbf{D}'\mathbf{D}/(n-1)$

The centered data matrix from part (c) is

$$
\mathbf{D}=\begin{bmatrix}4&-1\\0&1\\-4&0\end{bmatrix}.
$$

Transpose it:

$$
\mathbf{D}'=\begin{bmatrix}4&0&-4\\-1&1&0\end{bmatrix}.
$$

The matrix product is

$$
\begin{aligned}
\mathbf{D}'\mathbf{D}
&=\begin{bmatrix}4&0&-4\\-1&1&0\end{bmatrix}
\begin{bmatrix}4&-1\\0&1\\-4&0\end{bmatrix}\\
&=\begin{bmatrix}
4(4)+0(0)+(-4)(-4)&4(-1)+0(1)+(-4)(0)\\
(-1)(4)+1(0)+0(-4)&(-1)(-1)+1(1)+0(0)
\end{bmatrix}\\
&=\begin{bmatrix}32&-4\\-4&2\end{bmatrix}.
\end{aligned}
$$

Divide by $n-1=2$:

$$
\frac{\mathbf{D}'\mathbf{D}}{2}
=\begin{bmatrix}16&-2\\-2&1\end{bmatrix}
=\mathbf{S}.
$$

This is called the **cross-product representation** of the sample covariance matrix. It is the same calculation you carried out one entry at a time, simply organized as a single matrix multiplication. The number of rows of $\mathbf{D}'$ is 2 and the number of columns of $\mathbf{D}$ is 2, so the final covariance matrix is $2\times2$.

### Complete R verification for 1(d)

```r
X <- matrix(c(9, 1, 5, 3, 1, 2), nrow = 3, byrow = TRUE)

n <- nrow(X)                 # Number of observations: 3
xbar <- colMeans(X)          # The two means: 5 and 2
D <- sweep(X, 2, xbar, "-")  # Center each variable

d1 <- D[, 1]                 # First centered column
d2 <- D[, 2]                 # Second centered column

# Vector lengths (the base-R 'sqrt' function is square root).
L1 <- sqrt(sum(d1^2))
L2 <- sqrt(sum(d2^2))

# Dot product: sum products of matching entries.
dot12 <- sum(d1 * d2)

# Geometry gives the cosine and angle in radians.
cos_theta <- dot12 / (L1 * L2)
theta_degrees <- acos(cos_theta) * 180 / pi

# By hand, we know covariance is the centered cross-product / (n - 1).
S_hand <- t(D) %*% D / (n - 1)

# R has dedicated functions for covariance and correlation.
S_R <- cov(X)
R_R <- cor(X)

print(xbar)
print(D)
print(c(L1 = L1, L2 = L2, dot = dot12,
        cosine = cos_theta, angle_degrees = theta_degrees))
print(S_hand)
print(S_R)
print(R_R)
```

**Read the new R operations:** `nrow(X)` returns the row count. `sum(d1^2)` adds the squared entries. `sqrt()` computes the positive square root. `d1 * d2` multiplies entries in corresponding positions, so `sum(d1 * d2)` is the dot product. `acos()` is the inverse cosine and returns an angle in **radians**; multiply by $180/\pi$ to obtain degrees. `t(D)` transposes the centered matrix, and `%*%` is **matrix multiplication**, which is different from `*` (element-by-element multiplication). `cov(X)` computes the sample covariance matrix with denominator $n-1$; `cor(X)` computes the sample correlation matrix.

The relevant expected values are $L_1\approx5.656854$, $L_2\approx1.414214$, dot product $-4$, cosine $-0.5$, angle $120$ degrees, and the exact matrices derived above.

### Question 1: quick mastery check

You should now be able to explain **without memorizing a formula** why each statement is true:

1. $p=2$ means two axes for the row-wise scatter plot.
2. $n=3$ means three coordinates for each column vector.
3. Subtracting the mean from a column produces deviations that add to zero.
4. Squared deviation-vector length equals $(n-1)$ times the sample variance.
5. The dot product between two deviation vectors equals $(n-1)$ times their sample covariance.
6. The cosine of the angle between the deviation vectors equals their sample correlation.
7. The negative $-0.5$ correlation is reflected by an obtuse angle of $120^\circ$.


# Question 2 (R/H): Generalized and total sample variance

**Source location:** Page 2.  
**Solution status:** The source gives $|\mathbf{S}|=12$ and verifies the determinant identity $|\mathbf{S}|=(s_{11}s_{22})|\mathbf{R}|$. It does **not** show the requested total sample variance calculation. The complete calculations below preserve the source result and independently finish the omitted parts.

## Original question (faithfully reproduced)

**Question 2 (R/H)**

Calculate

**(a)** Generalized sample variance $|\mathbf{S}|$,

**(b)** Generalized sample variance of the standardized variables $|\mathbf{R}|$, and

**(c)** Total sample variance

for the data matrix $\mathbf{X}$ in Question 1. Moreover, verify the relation

$$
|\mathbf{S}|=(s_{11}s_{22})|\mathbf{R}|.
$$

## What is this question actually asking?

In Question 1, we learned that a sample covariance matrix contains the variation of individual variables and the way they vary together. But a researcher may want **one single number** that summarizes the amount of multivariate variation. Question 2 introduces two different ways to do that:

1. **Total sample variance:** add the individual sample variances. This tells us the sum of the variation along the original measured axes.
2. **Generalized sample variance:** calculate the **determinant** of the covariance matrix. This accounts not only for the individual variances but also for the relationship between the variables.

These are **not interchangeable**. The generalized variance and total variance answer different questions.

The question also asks us to work with **standardized variables**, because correlation is the covariance of variables that have had their different units and scales removed.

## 2.0 Reuse the results of Question 1

The original data were

$$
\mathbf{X}=\begin{bmatrix}9&1\\5&3\\1&2\end{bmatrix}.
$$

Question 1 established

$$
\bar{\mathbf{x}}=\begin{bmatrix}5\\2\end{bmatrix},\quad
\mathbf{S}=\begin{bmatrix}16&-2\\-2&1\end{bmatrix},\quad
\mathbf{R}=\begin{bmatrix}1&-0.5\\-0.5&1\end{bmatrix}.
$$

You should **not** recalculate these and obtain different values just because they appear in a new question. We are using exactly the same sample.

## Mini-lesson: What is a determinant?

The determinant of a square matrix is a single number calculated from the entries of that matrix. For a $2\times2$ matrix,

$$
\mathbf{A}=\begin{bmatrix}a&b\\c&d\end{bmatrix},
$$

the formula is

$$
\boxed{|\mathbf{A}|=ad-bc}.
$$

Read this as:

- Multiply the **top-left** value by the **bottom-right** value.
- Multiply the **top-right** value by the **bottom-left** value.
- Subtract the second product from the first.

For example, if

$$
\mathbf{A}=\begin{bmatrix}2&1\\3&4\end{bmatrix},
$$

then

$$
|\mathbf{A}|=2(4)-1(3)=8-3=5.
$$

**Do not** add all entries. **Do not** multiply the two diagonal entries and stop. The cross-product subtraction is essential.

### Why a determinant measures geometric "size"

A determinant describes how an associated linear transformation changes areas (in 2D) or volumes (in 3D). For a covariance matrix, the determinant is related to the **squared area or volume scale of the cloud of observations**, after accounting for how the variables co-vary. More precisely, when a positive-definite covariance matrix $\mathbf{S}$ defines an ellipsoid of the form $\mathbf{z}'\mathbf{S}^{-1}\mathbf{z}\leq c$, the ellipsoid's area in 2D is proportional to $\sqrt{|\mathbf{S}|}$; its $p$-dimensional volume is also proportional to $\sqrt{|\mathbf{S}|}$, for fixed $p$ and $c$. That explains why the determinant, rather than merely the sum of separate variances, is a meaningful multivariate spread measure.

You do **not** need to know ellipsoid mathematics to solve the question. Keep the simpler mental picture: **total variance adds separate amounts of spread; generalized variance measures joint spread and notices correlations**.

## 2(a). Calculate generalized sample variance $|\mathbf{S}|$

### Step 1: Write the matrix

$$
\mathbf{S}=\begin{bmatrix}16&-2\\-2&1\end{bmatrix}.
$$

### Step 2: Identify $a,b,c,d$

$$
a=16,\quad b=-2,\quad c=-2,\quad d=1.
$$

### Step 3: Apply $ad-bc$

$$
\begin{aligned}
|\mathbf{S}|
&=(16)(1)-(-2)(-2)\\
&=16-(+4)\\
&=\boxed{12}.
\end{aligned}
$$

**Source-provided result, confirmed:**

$$
\boxed{|\mathbf{S}|=12.}
$$

### Interpretation

The generalized sample variance is 12 in the **product of the squared measurement units** of the two variables. Because the original worksheet did not assign physical units to $X_1$ or $X_2$, there is no meaningful dollar, meter, or other unit to attach here. The determinant is nonnegative, as a covariance matrix should be. It is smaller than $s_{11}s_{22}=16$ because the variables are correlated rather than mutually uncorrelated in the sample.

Do **not** say "the average variation is 12" or "each variable has variance 12". The number 12 summarizes **joint** variation through the determinant; it is not a usual one-variable variance.

### Compare with a zero-covariance example

**Supplementary comparison, not a new source dataset:** Suppose the two variances were still 16 and 1 but the sample covariance were 0:

$$
\mathbf{S}_0=\begin{bmatrix}16&0\\0&1\end{bmatrix}.
$$

Then $|\mathbf{S}_0|=16(1)-0=16$. In the actual sample the off-diagonal covariance is $-2$, so the determinant becomes $16-4=12$. Both positive and negative covariance shrink the determinant relative to the same separate variances because the off-diagonal product is $s_{12}^2$, which is nonnegative.

## 2(b). Calculate generalized sample variance of standardized variables $|\mathbf{R}|$

### What does it mean to standardize?

Imagine one variable is measured in units of 10,000 and another in units of 1. If we look directly at the original variances, the first may look larger mainly because of its unit scale. **Standardization** puts both variables onto a comparable scale by subtracting each variable's mean and dividing by its standard deviation.

The standardized score of observation $i$ on variable $j$ is

$$
 z_{ij}=\frac{x_{ij}-\bar{x}_j}{s_j},
$$

where $s_j=\sqrt{s_{jj}}$ is the sample standard deviation. For a variable with nonzero sample standard deviation, the resulting sample mean is 0 and sample variance is 1.

### Step 1: Find both standard deviations

From Question 1,

$$
\begin{aligned}
s_1&=\sqrt{s_{11}}=\sqrt{16}=4,\\
s_2&=\sqrt{s_{22}}=\sqrt1=1.
\end{aligned}
$$

### Step 2: Standardize every observation

For variable 1, subtract 5 and divide by 4:

$$
\begin{aligned}
z_{11}&=\frac{9-5}{4}=1,\\
z_{21}&=\frac{5-5}{4}=0,\\
z_{31}&=\frac{1-5}{4}=-1.
\end{aligned}
$$

For variable 2, subtract 2 and divide by 1:

$$
\begin{aligned}
z_{12}&=\frac{1-2}{1}=-1,\\
z_{22}&=\frac{3-2}{1}=1,\\
z_{32}&=\frac{2-2}{1}=0.
\end{aligned}
$$

The standardized data matrix is

$$
\boxed{\mathbf{Z}=\begin{bmatrix}1&-1\\0&1\\-1&0\end{bmatrix}.}
$$

Check its first-column sample variance: $(1^2+0^2+(-1)^2)/(3-1)=2/2=1$. The second is the same. Its cross-covariance is $[1(-1)+0(1)+(-1)(0)]/2=-1/2=-0.5$.

Thus

$$
\operatorname{cov}(\mathbf{Z})=
\begin{bmatrix}1&-0.5\\-0.5&1\end{bmatrix}
=\mathbf{R}.
$$

This is why the worksheet describes $|\mathbf{R}|$ as the generalized sample variance **of the standardized variables**.

### Step 3: Compute the determinant of $\mathbf{R}$

$$
\begin{aligned}
|\mathbf{R}|
&=\left|\begin{matrix}1&-0.5\\-0.5&1\end{matrix}\right|\\
&=(1)(1)-(-0.5)(-0.5)\\
&=1-0.25\\
&=\boxed{0.75}.
\end{aligned}
$$

This is an exact value, not merely a rounding.

### What does 0.75 tell us?

After placing both variables onto the same standardized scale, their generalized variance is 0.75. For two variables, the formula simplifies to

$$
\boxed{|\mathbf{R}|=1-r_{12}^2}.
$$

Here $r_{12}=-0.5$, so $1-(-0.5)^2=1-0.25=0.75$.

Some important contrasts:

| Correlation $r_{12}$ | Generalized standardized variance $1-r_{12}^2$ | Meaning |
|---:|---:|---|
| 0 | 1 | No sample linear correlation; largest determinant for fixed standardized variances |
| $+0.5$ | 0.75 | Moderate positive linear correlation |
| $-0.5$ | 0.75 | Moderate negative linear correlation: **our actual result** |
| $+1$ | 0 | Perfect positive linear dependence |
| $-1$ | 0 | Perfect negative linear dependence |

**Notice something surprising:** the determinant depends on the **square** of the correlation. It measures joint spread, not whether the relationship is positive or negative. In the two-variable case, correlations $+0.5$ and $-0.5$ produce the same determinant.

It is also important that a zero correlation does not prove statistical independence except under additional assumptions, such as a suitable joint normal model.

## 2(c). Calculate the total sample variance

### Definition

**Total sample variance** is the sum of the variances of the individual variables:

$$
\text{Total sample variance}=s_{11}+s_{22}+\cdots+s_{pp}.
$$

This is the **trace** of the sample covariance matrix:

$$
\boxed{\operatorname{tr}(\mathbf{S})=\sum_{j=1}^{p}s_{jj}}.
$$

The notation $\operatorname{tr}$ means "trace", and the entries $s_{11},s_{22},\ldots$ lie on the **main diagonal** from top-left toward bottom-right.

### Apply it to this sample

$$
\begin{aligned}
\operatorname{tr}(\mathbf{S})
&=\operatorname{tr}\begin{bmatrix}16&-2\\-2&1\end{bmatrix}\\
&=16+1\\
&=\boxed{17}.
\end{aligned}
$$

**Independently completed answer:**

$$
\boxed{\text{Total sample variance}=17.}
$$

The PDF asks for this value but does **not** explicitly print it. It is calculated here from the source matrix.

### Why ignore the covariances when calculating trace?

Because total sample variance is **defined** as the sum of the individual variances. Its purpose is to add the spread along each of the original measurement axes. The off-diagonal covariances measure how the axes move together, and those enter the **determinant** instead.

An important related quantity, sometimes confused with total variance, is the variance of the **sum** of the two variables:

$$
\operatorname{Var}_{\mathrm{sample}}(X_1+X_2)
=s_{11}+s_{22}+2s_{12}
=16+1+2(-2)=13.
$$

This is **13, not 17**. The worksheet asks for **total sample variance**, so the answer is **17**. The sum of variances and the variance of a sum differ whenever the covariance is nonzero.

## Verify $|\mathbf{S}|=(s_{11}s_{22})|\mathbf{R}|$

### Step 1: Work out the left-hand side

Already calculated:

$$
\underbrace{|\mathbf{S}|}_{\text{left side}}=12.
$$

### Step 2: Work out the right-hand side

From Question 1, $s_{11}=16$ and $s_{22}=1$. From Question 2(b), $|\mathbf{R}|=0.75$.

$$
\begin{aligned}
(s_{11}s_{22})|\mathbf{R}|
&=(16\times1)(0.75)\\
&=16(0.75)\\
&=\boxed{12}.
\end{aligned}
$$

### Step 3: Compare

$$
\boxed{|\mathbf{S}|=12=(16)(1)(0.75)=(s_{11}s_{22})|\mathbf{R}|.}
$$

**Source-provided solution (page 2):**

$$
|\mathbf{S}|=12,\qquad
(s_{11}s_{22})|\mathbf{R}|=(16\times1)(0.75)=16\times0.75=12,
$$

therefore $|\mathbf{S}|=(s_{11}s_{22})|\mathbf{R}|$. The expanded derivation and explicit $|\mathbf{R}|$ and total variance calculations are included above.

## Why does the identity work? A derivation for absolute beginners

This is much easier to remember when you understand why it is true.

For two variables,

$$
\mathbf{S}=\begin{bmatrix}s_{11}&s_{12}\\s_{12}&s_{22}\end{bmatrix},\quad
\mathbf{R}=\begin{bmatrix}1&r_{12}\\r_{12}&1\end{bmatrix}.
$$

By the determinant rule,

$$
|\mathbf{S}|=s_{11}s_{22}-s_{12}^2.
$$

The correlation formula can be rearranged:

$$
 r_{12}=\frac{s_{12}}{\sqrt{s_{11}s_{22}}}
\quad\Rightarrow\quad
r_{12}^2=\frac{s_{12}^2}{s_{11}s_{22}}.
$$

Next, the determinant of the correlation matrix is

$$
|\mathbf{R}|=1-r_{12}^2
=1-\frac{s_{12}^2}{s_{11}s_{22}}.
$$

Multiply both sides by $s_{11}s_{22}$:

$$
\begin{aligned}
(s_{11}s_{22})|\mathbf{R}|
&=s_{11}s_{22}\left(1-\frac{s_{12}^2}{s_{11}s_{22}}\right)\\
&=s_{11}s_{22}-s_{12}^2\\
&=|\mathbf{S}|.
\end{aligned}
$$

So the identity is **not** an accidental equality for this one sample. It is a general mathematical relationship whenever both variables have nonzero variance.

### Matrix-scale explanation: a useful bridge to Question 4

Let $\mathbf{D}_s$ be the diagonal matrix containing the **sample standard deviations**:

$$
\mathbf{D}_s=\begin{bmatrix}s_1&0\\0&s_2\end{bmatrix}
=\begin{bmatrix}4&0\\0&1\end{bmatrix}.
$$

Its inverse is formed by replacing the nonzero diagonal entries by reciprocals:

$$
\mathbf{D}_s^{-1}=\begin{bmatrix}1/4&0\\0&1\end{bmatrix}.
$$

Standardization can be written as

$$
\boxed{\mathbf{R}=\mathbf{D}_s^{-1}\mathbf{S}\mathbf{D}_s^{-1}}.
$$

For this example,

$$
\begin{aligned}
\mathbf{D}_s^{-1}\mathbf{S}\mathbf{D}_s^{-1}
&=\begin{bmatrix}1/4&0\\0&1\end{bmatrix}
\begin{bmatrix}16&-2\\-2&1\end{bmatrix}
\begin{bmatrix}1/4&0\\0&1\end{bmatrix}\\
&=\begin{bmatrix}4&-0.5\\-2&1\end{bmatrix}
\begin{bmatrix}1/4&0\\0&1\end{bmatrix}\\
&=\begin{bmatrix}1&-0.5\\-0.5&1\end{bmatrix}.
\end{aligned}
$$

We have therefore obtained $\mathbf{R}$ directly from $\mathbf{S}$ by converting all entries into scale-free correlations.

## Complete R for Question 2

```r
# Recreate the same data from Question 1.
X <- matrix(c(9, 1, 5, 3, 1, 2), nrow = 3, byrow = TRUE)

# Sample covariance and correlation matrices.
S <- cov(X)
R <- cor(X)

# (a) Generalized sample variance.
generalized_variance <- det(S)

# (b) Generalized variance after standardization.
standardized_generalized_variance <- det(R)

# (c) Total sample variance is the sum of diagonal entries.
total_variance <- sum(diag(S))

# Confirm by explicitly standardizing the original data.
Z <- scale(X, center = TRUE, scale = TRUE)
R_from_standardized <- cov(Z)

# Verify the determinant identity.
right_side <- prod(diag(S)) * det(R)

print(S)
print(R)
print(Z)
print(R_from_standardized)
print(c(generalized_variance = generalized_variance,
        standardized_generalized_variance = standardized_generalized_variance,
        total_variance = total_variance,
        determinant_identity_RHS = right_side))

# A numerical consistency check.
all.equal(as.numeric(det(S)), as.numeric(right_side))
```

### Explain each important R function

- `cov(X)` calculates the sample covariance matrix. When you give R a matrix, columns are variables.
- `cor(X)` calculates the correlation matrix.
- `det(S)` calculates the determinant of $\mathbf{S}$.
- `diag(S)` **extracts** the entries on the main diagonal if `S` is already a matrix. Here that produces `16, 1`.
- `sum(diag(S))` calculates the trace, $16+1=17$.
- `prod(diag(S))` **multiplies** the entries on the diagonal, $16\times1=16$.
- `scale(X, center = TRUE, scale = TRUE)` subtracts column means and divides by sample standard deviations; it returns the standardized observations.
- `cov(Z)` should match `cor(X)` because standardized variables have unit sample variances.
- `all.equal()` compares numbers with a small allowance for floating-point rounding. We normally prefer this to `==` when checking independently calculated decimal results.

### Expected numerical findings

| Computation | Correct result | Interpretation |
|---|---:|---|
| `det(S)` | $12$ | Generalized sample variance of original variables |
| `det(R)` | $0.75$ | Generalized sample variance of standardized variables |
| `sum(diag(S))` | $17$ | Total sample variance |
| `prod(diag(S)) * det(R)` | $12$ | Right-hand side of identity |
| `all.equal(...)` | `TRUE` | Identity verified to numerical precision |

## Common mistakes in Question 2

- **Mistake:** $|\mathbf{S}|=16+1=17$. **Fix:** vertical bars around a matrix mean **determinant**, not trace.
- **Mistake:** $|\mathbf{S}|=16(1)=16$. **Fix:** subtract the off-diagonal product, $(-2)(-2)=4$.
- **Mistake:** $|\mathbf{R}|=1-(-0.5)=1.5$. **Fix:** the off-diagonal entries multiply: $(-0.5)^2=0.25$.
- **Mistake:** total variance includes $-2$ twice. **Fix:** the total variance is defined as the trace, $16+1=17$.
- **Mistake:** interpreting 0.75 as a correlation coefficient. **Fix:** 0.75 is the **determinant of the correlation matrix**; the actual correlation is $-0.5$.
- **Mistake:** thinking a negative correlation must produce a negative determinant. **Fix:** a covariance/correlation matrix is positive semidefinite, so its determinant cannot be negative in exact arithmetic.
- **Mistake:** thinking the relationship always has $(s_{11}s_{22})$ even for $p=3$. **Fix:** three variables require the product $s_{11}s_{22}s_{33}$; Question 4 develops that case.

## Question 2: all final answers together

$$
\boxed{\begin{aligned}
\text{(a) Generalized sample variance: }&|\mathbf{S}|=12,\\
\text{(b) Standardized generalized variance: }&|\mathbf{R}|=0.75,\\
\text{(c) Total sample variance: }&\operatorname{tr}(\mathbf{S})=17,\\
\text{Identity: }&12=(16)(1)(0.75)=12.
\end{aligned}}
$$


# Question 3 (R/H): Test scores and linear dependence

**Source location:** The question starts on page 2 and its two parts appear on page 3.  
**Solution status:** The PDF supplies the entire $5\times3$ numerical matrix and asks (a) for the covariance matrix and its zero determinant and (b) for a check of linear dependence. The PDF **does not include worked answers** to these two subquestions. The answers below are **independently derived from the original source data**.

## Original question (faithfully reproduced)

**Question 3 (R/H)**

The following data matrix contains data on test scores, with $X_1=$ score on first test, $X_2=$ score on second test, and $X_3=$ total score on the two tests

$$
\mathbf{X}=\begin{bmatrix}
12&17&29\\
18&20&38\\
14&16&30\\
20&18&38\\
16&19&35
\end{bmatrix}.
$$

**(a)** Obtain the sample covariance matrix $\mathbf{S}$ and verify that the generalized variance $|\mathbf{S}|$ is zero.

**(b)** Verify that the third column of the data matrix is the sum of the first two columns. That is, show that the columns of the data matrix are linearly dependent.

## Start by making sense of the story

These are scores from **two tests** for five recorded observations. The third column is not a third independent assessment. It is calculated by adding the first two test scores.

| Observation | Test 1, $X_1$ | Test 2, $X_2$ | Total, $X_3$ |
|---|---:|---:|---:|
| 1 | 12 | 17 | 29 |
| 2 | 18 | 20 | 38 |
| 3 | 14 | 16 | 30 |
| 4 | 20 | 18 | 38 |
| 5 | 16 | 19 | 35 |

We have $n=5$ observations and $p=3$ variables. The sample covariance matrix will therefore be **$3\times3$**, because it has one row and one column per variable. Its diagonal contains **three** variances and its off-diagonal positions contain covariances between all three possible variable pairs.

A natural question is: "Why could generalized variance equal zero when the actual scores clearly vary?" The answer is that **variation may exist without filling all three available dimensions**. The third variable may be entirely predictable from the first two. This is the topic of part (b), and it explains the zero determinant in part (a).

## 3(a). Obtain the complete sample covariance matrix

### Step 1: Compute the three column means

**Mean of Test 1**:

$$
\begin{aligned}
\bar{x}_1
&=\frac{12+18+14+20+16}{5}\\
&=\frac{80}{5}\\
&=\boxed{16}.
\end{aligned}
$$

**Mean of Test 2**:

$$
\begin{aligned}
\bar{x}_2
&=\frac{17+20+16+18+19}{5}\\
&=\frac{90}{5}\\
&=\boxed{18}.
\end{aligned}
$$

**Mean of the total**:

$$
\begin{aligned}
\bar{x}_3
&=\frac{29+38+30+38+35}{5}\\
&=\frac{170}{5}\\
&=\boxed{34}.
\end{aligned}
$$

Therefore,

$$
\boxed{\bar{\mathbf{x}}=\begin{bmatrix}16\\18\\34\end{bmatrix}.}
$$

The third mean, 34, is exactly the sum of the first two means: $16+18=34$. This is an early clue that the third variable is a sum of the first two. The equality alone is not a proof of linear dependence for every row; we will check the rows explicitly in part (b).

### Step 2: Subtract the corresponding mean from every number

For the first row, the centered values are

$$
(12-16,\;17-18,\;29-34)=(-4,-1,-5).
$$

Repeat the process for all five rows:

| Observation | $X_1-16$ | $X_2-18$ | $X_3-34$ |
|---|---:|---:|---:|
| 1 | $12-16=-4$ | $17-18=-1$ | $29-34=-5$ |
| 2 | $18-16=2$ | $20-18=2$ | $38-34=4$ |
| 3 | $14-16=-2$ | $16-18=-2$ | $30-34=-4$ |
| 4 | $20-16=4$ | $18-18=0$ | $38-34=4$ |
| 5 | $16-16=0$ | $19-18=1$ | $35-34=1$ |
| **Sum** | **0** | **0** | **0** |

Write the centered data matrix as

$$
\boxed{\mathbf{D}=
\begin{bmatrix}
-4&-1&-5\\
2&2&4\\
-2&-2&-4\\
4&0&4\\
0&1&1
\end{bmatrix}.}
$$

You can already see something important: **in every row, the centered third entry also equals the sum of the centered first and second entries**, for example $-4+(-1)=-5$ and $2+2=4$. Centering does **not** remove the exact relationship among the three columns.

### Step 3: Write the covariance formula

For any pair of variables $j,k$,

$$
 s_{jk}=\frac{1}{n-1}\sum_{i=1}^{n}(x_{ij}-\bar{x}_j)(x_{ik}-\bar{x}_k).
$$

Here $n=5$, so $n-1=4$. **Every covariance entry must be divided by 4.** We will calculate the three variances and three distinct cross-covariances. The other three entries follow by symmetry.

### Step 4: Compute the variance of Test 1, $s_{11}$

Square each first-column deviation and add:

$$
\begin{aligned}
\text{Sum of squares for }X_1
&=(-4)^2+2^2+(-2)^2+4^2+0^2\\
&=16+4+4+16+0\\
&=40.
\end{aligned}
$$

Divide by $n-1$:

$$
\boxed{s_{11}=\frac{40}{4}=10.}
$$

### Step 5: Compute the variance of Test 2, $s_{22}$

$$
\begin{aligned}
\text{Sum of squares for }X_2
&=(-1)^2+2^2+(-2)^2+0^2+1^2\\
&=1+4+4+0+1\\
&=10,\\[4pt]
s_{22}&=\frac{10}{4}=\boxed{2.5}.
\end{aligned}
$$

### Step 6: Compute the variance of total score, $s_{33}$

$$
\begin{aligned}
\text{Sum of squares for }X_3
&=(-5)^2+4^2+(-4)^2+4^2+1^2\\
&=25+16+16+16+1\\
&=74,\\[4pt]
s_{33}&=\frac{74}{4}=\boxed{18.5}.
\end{aligned}
$$

### Step 7: Compute the covariance between Test 1 and Test 2, $s_{12}$

Multiply their deviations from the **same row**, then add all five products:

$$
\begin{aligned}
\text{Cross-product sum }X_1,X_2
&=(-4)(-1)+(2)(2)+(-2)(-2)+(4)(0)+(0)(1)\\
&=4+4+4+0+0\\
&=12,\\[4pt]
s_{12}&=\frac{12}{4}=\boxed{3}.
\end{aligned}
$$

Because the product order does not matter, $s_{21}=s_{12}=3$.

### Step 8: Compute the covariance between Test 1 and total score, $s_{13}$

$$
\begin{aligned}
\text{Cross-product sum }X_1,X_3
&=(-4)(-5)+(2)(4)+(-2)(-4)+(4)(4)+(0)(1)\\
&=20+8+8+16+0\\
&=52,\\[4pt]
s_{13}&=\frac{52}{4}=\boxed{13}.
\end{aligned}
$$

Therefore $s_{31}=13$ as well.

### Step 9: Compute the covariance between Test 2 and total score, $s_{23}$

$$
\begin{aligned}
\text{Cross-product sum }X_2,X_3
&=(-1)(-5)+(2)(4)+(-2)(-4)+(0)(4)+(1)(1)\\
&=5+8+8+0+1\\
&=22,\\[4pt]
s_{23}&=\frac{22}{4}=\boxed{5.5}.
\end{aligned}
$$

Therefore $s_{32}=5.5$.

### Step 10: Collect every numerator before dividing

The following table contains the exact sums of squared deviations and paired cross-products:

| Cross-product | Calculation from the five centered rows | Sum |
|---|---|---:|
| $X_1,X_1$ | $16+4+4+16+0$ | 40 |
| $X_1,X_2$ | $4+4+4+0+0$ | 12 |
| $X_1,X_3$ | $20+8+8+16+0$ | 52 |
| $X_2,X_2$ | $1+4+4+0+1$ | 10 |
| $X_2,X_3$ | $5+8+8+0+1$ | 22 |
| $X_3,X_3$ | $25+16+16+16+1$ | 74 |

Placed into a $3\times3$ matrix, the cross-product sums form

$$
\mathbf{D}'\mathbf{D}=\begin{bmatrix}
40&12&52\\
12&10&22\\
52&22&74
\end{bmatrix}.
$$

Why is the matrix symmetric? The cross-product for $X_1$ against $X_2$ is the same multiplication as $X_2$ against $X_1$, just reversed. Both give 12 before dividing and 3 afterward.

### Step 11: Divide each entry by $n-1=4$

$$
\begin{aligned}
\mathbf{S}
&=\frac{1}{4}\mathbf{D}'\mathbf{D}\\
&=\frac14\begin{bmatrix}40&12&52\\12&10&22\\52&22&74\end{bmatrix}\\[4pt]
&=\boxed{\begin{bmatrix}
10&3&13\\
3&2.5&5.5\\
13&5.5&18.5
\end{bmatrix}}.
\end{aligned}
$$

This is the **complete independently calculated answer to the first half of Question 3(a)**.

### Interpretation of the entries

- $s_{11}=10$: sample variation in Test 1 scores.
- $s_{22}=2.5$: sample variation in Test 2 scores.
- $s_{33}=18.5$: sample variation in total scores.
- $s_{12}=3>0$: students/observations with above-average scores on one test tend to have above-average scores on the other, in a positive linear way.
- $s_{13}=13>0$ and $s_{23}=5.5>0$: both test scores are positively associated with their sum.

The larger numerical value of covariance 13 compared with 3 does **not**, on its own, mean a stronger unit-free relationship. Covariance depends on the variables' spreads. Correlation would be the appropriate scale-free comparison.

## 3(a), continued: Verify $|\mathbf{S}|=0$

### First learn the 3-by-3 determinant rule

A $3\times3$ matrix is more complicated than a $2\times2$ matrix. For

$$
\mathbf{A}=\begin{bmatrix}a&b&c\\d&e&f\\g&h&i\end{bmatrix},
$$

one valid formula is

$$
\boxed{|\mathbf{A}|=a(ei-fh)-b(di-fg)+c(dh-eg).}
$$

This is called **expansion along the first row**. It consists of three groups with alternating signs $+,-,+$.

Break it down:

1. Take the first top-row entry $a$ and multiply it by the determinant of the lower-right $2\times2$ block.
2. Take the second top-row entry $b$, multiply by the determinant formed by deleting its row and column, and **subtract** that product.
3. Take the third top-row entry $c$, multiply by the last small determinant, and **add** it.

The source matrix is

$$
\mathbf{S}=\begin{bmatrix}10&3&13\\3&2.5&5.5\\13&5.5&18.5\end{bmatrix}.
$$

Substitute its entries carefully:

$$
\begin{aligned}
|\mathbf{S}|
&=10[(2.5)(18.5)-(5.5)(5.5)]\\
&\quad-3[(3)(18.5)-(5.5)(13)]\\
&\quad+13[(3)(5.5)-(2.5)(13)].
\end{aligned}
$$

Calculate each bracket separately:

**First bracket:**

$$
(2.5)(18.5)-(5.5)(5.5)=46.25-30.25=16.
$$

**Second bracket:**

$$
(3)(18.5)-(5.5)(13)=55.5-71.5=-16.
$$

**Third bracket:**

$$
(3)(5.5)-(2.5)(13)=16.5-32.5=-16.
$$

Now put those into the expansion:

$$
\begin{aligned}
|\mathbf{S}|
&=10(16)-3(-16)+13(-16)\\
&=160+48-208\\
&=\boxed{0}.
\end{aligned}
$$

**Independently completed answer:**

$$
\boxed{|\mathbf{S}|=0.}
$$

This verifies exactly what part (a) asks us to show. There is no rounding involved; the original integer scores give a covariance matrix whose determinant is **exactly zero**.

### A much faster verification once you understand the pattern

Look at the three columns of $\mathbf{S}$:

$$
\underbrace{\begin{bmatrix}10\\3\\13\end{bmatrix}}_{\text{column 1}}
+\underbrace{\begin{bmatrix}3\\2.5\\5.5\end{bmatrix}}_{\text{column 2}}
=\underbrace{\begin{bmatrix}13\\5.5\\18.5\end{bmatrix}}_{\text{column 3}}.
$$

The third covariance-matrix column is exactly the sum of the first two. So the columns of $\mathbf{S}$ are **linearly dependent**. Any square matrix with linearly dependent columns has determinant zero. This explains the result even without using the longer determinant expansion.

### Does $|\mathbf{S}|=0$ mean the scores do not vary?

**No.** We have already computed positive variances: $10$, $2.5$ and $18.5$. Individual variables **do vary**. The zero determinant means that the data have no variation in **one particular independent direction**. They can be described entirely by two independent coordinates, because the third coordinate is fixed as the sum of the first two.

A simple supplementary analogy: imagine all points on a perfectly flat sheet of paper embedded in a three-dimensional room. They can spread out **across the sheet** (two dimensions), but the sheet has **zero thickness** in the third direction. A 3D volume measure is therefore zero even when the points are spread out in two directions. This is the geometric meaning of zero generalized variance here.

## 3(b). Verify the columns are linearly dependent

### What is a linear combination?

Suppose you have two numbers, $u$ and $v$, and you calculate $u+v$. You have formed a **linear combination**, because it consists of one multiple of $u$ plus one multiple of $v$:

$$
1u+1v.
$$

A vector linear combination works the same way, except addition and multiplication happen to **each component** of the vector.

For example,

$$
2\begin{bmatrix}1\\2\end{bmatrix}
+3\begin{bmatrix}4\\5\end{bmatrix}
=\begin{bmatrix}2\\4\end{bmatrix}+
\begin{bmatrix}12\\15\end{bmatrix}
=\begin{bmatrix}14\\19\end{bmatrix}.
$$

A set of vectors is **linearly dependent** when at least one vector can be expressed as a linear combination of the others. Equivalently, there is a combination giving the zero vector with **not all coefficients equal to zero**.

### Step 1: Check every row of the original score table

| Observation | $X_1$ | $X_2$ | $X_1+X_2$ | Supplied $X_3$ | Equal? |
|---|---:|---:|---:|---:|---|
| 1 | 12 | 17 | $12+17=29$ | 29 | Yes |
| 2 | 18 | 20 | $18+20=38$ | 38 | Yes |
| 3 | 14 | 16 | $14+16=30$ | 30 | Yes |
| 4 | 20 | 18 | $20+18=38$ | 38 | Yes |
| 5 | 16 | 19 | $16+19=35$ | 35 | Yes |

This equality holds for **every observation**, not just on average.

### Step 2: Express the relationship with column vectors

Define

$$
\mathbf{x}_1=\begin{bmatrix}12\\18\\14\\20\\16\end{bmatrix},\quad
\mathbf{x}_2=\begin{bmatrix}17\\20\\16\\18\\19\end{bmatrix},\quad
\mathbf{x}_3=\begin{bmatrix}29\\38\\30\\38\\35\end{bmatrix}.
$$

Then

$$
\begin{aligned}
\mathbf{x}_1+\mathbf{x}_2
&=\begin{bmatrix}12+17\\18+20\\14+16\\20+18\\16+19\end{bmatrix}\\
&=\begin{bmatrix}29\\38\\30\\38\\35\end{bmatrix}\\
&=\mathbf{x}_3.
\end{aligned}
$$

Thus,

$$
\boxed{\mathbf{x}_3=\mathbf{x}_1+\mathbf{x}_2.}
$$

### Step 3: Convert the relationship into the textbook definition of dependence

Move everything to one side:

$$
\boxed{\mathbf{x}_1+\mathbf{x}_2-\mathbf{x}_3=\mathbf{0}.}
$$

This is a combination

$$
1\mathbf{x}_1+1\mathbf{x}_2+(-1)\mathbf{x}_3=\mathbf{0},
$$

whose coefficients $1,1,-1$ are **not all zero**. Therefore the three columns are **linearly dependent**.

**Independently completed answer:** the third original data column is exactly the sum of the first and second; the columns are linearly dependent.

### Step 4: What happens geometrically to the five observations?

In three-variable **variable space**, one observation is a three-dimensional point $(X_1,X_2,X_3)$. But each point satisfies

$$
\boxed{X_3=X_1+X_2.}
$$

That equation describes a **plane** in three dimensions. All five observations fall on that plane. The point cloud can spread **within the plane**, but it cannot leave the plane while maintaining the relationship. It has only **two independent dimensions of movement**. This is why the $3\times3$ covariance matrix is singular, or non-invertible.

The mean point $(16,18,34)$ also lies on the same plane, because $34=16+18$.

### Step 5: Understand "singular" and "rank"

A square matrix is **singular** if it has determinant zero, meaning it has **no matrix inverse**. A singular covariance matrix cannot be used directly in a calculation that requires $\mathbf{S}^{-1}$, such as an ordinary Mahalanobis distance with that full covariance matrix.

The **rank** of a matrix counts how many of its columns provide genuinely independent directions. For our score matrix, the third column does not introduce a new direction, because it is the sum of the first two. The first two score columns are not scalar multiples of one another; for example $12/17\neq18/20$. Therefore the raw data matrix has rank **2** rather than 3. Its centered data matrix and sample covariance matrix also have rank **2**.

This does **not** mean two observations are the same, and it does **not** mean only two students were measured. We have five observations, three recorded variables, and only two linearly independent variable directions.

### Step 6: A statistical shortcut for understanding the covariances

The relation $X_3=X_1+X_2$ explains the sample covariance entries algebraically, without repeating all arithmetic.

For sample covariance, the same linearity rules hold as for population covariance. Thus,

$$
\begin{aligned}
s_{13}
&=\operatorname{Cov}_{\text{sample}}(X_1,X_3)\\
&=\operatorname{Cov}_{\text{sample}}(X_1,X_1+X_2)\\
&=\operatorname{Var}_{\text{sample}}(X_1)+\operatorname{Cov}_{\text{sample}}(X_1,X_2)\\
&=10+3\\
&=\boxed{13}.
\end{aligned}
$$

Likewise,

$$
\begin{aligned}
s_{23}
&=\operatorname{Cov}_{\text{sample}}(X_2,X_1+X_2)\\
&=s_{12}+s_{22}\\
&=3+2.5\\
&=\boxed{5.5}.
\end{aligned}
$$

For the total score variance,

$$
\begin{aligned}
s_{33}
&=\operatorname{Var}_{\text{sample}}(X_1+X_2)\\
&=s_{11}+s_{22}+2s_{12}\\
&=10+2.5+2(3)\\
&=\boxed{18.5}.
\end{aligned}
$$

These identities confirm **every covariance involving the third variable** and explain the special shape of the covariance matrix. Notice the contrast with Question 2: there, total sample variance was the trace, not the variance of the sum. Here, because the third variable **is actually defined as the sum** of two scores, the variance-of-a-sum formula is precisely what we need for $s_{33}$.

### Step 7: Show a direction with exactly zero variance

Define a new variable

$$
W=X_3-X_1-X_2.
$$

From the supplied table, every observation has $W=0$. For example, the first is $29-12-17=0$; the second is $38-18-20=0$. Therefore $W$ is a constant, and its sample variance is

$$
\boxed{\operatorname{Var}_{\text{sample}}(W)=0.}
$$

This is the missing third independent direction. In a matrix notation that you can recognize later, let

$$
\mathbf{a}=\begin{bmatrix}-1\\-1\\1\end{bmatrix}.
$$

Then $W=\mathbf{a}'\mathbf{X}$ for one observation treated as a random vector, and the variance of that combination is $\mathbf{a}'\mathbf{S}\mathbf{a}=0$. In fact,

$$
\mathbf{S}\mathbf{a}=
\begin{bmatrix}10&3&13\\3&2.5&5.5\\13&5.5&18.5\end{bmatrix}
\begin{bmatrix}-1\\-1\\1\end{bmatrix}
=\begin{bmatrix}-10-3+13\\-3-2.5+5.5\\-13-5.5+18.5\end{bmatrix}
=\begin{bmatrix}0\\0\\0\end{bmatrix}.
$$

That is another direct certificate that the covariance matrix is singular. It is an enrichment, not an additional requirement of the original question.

## Question 3 R solution, carefully explained

```r
# The worksheet has 5 observations (rows) and 3 variables (columns).
X <- matrix(c(12, 17, 29,
              18, 20, 38,
              14, 16, 30,
              20, 18, 38,
              16, 19, 35),
            nrow = 5, byrow = TRUE)

colnames(X) <- c("Test1", "Test2", "Total")

# Mean score of each variable.
xbar <- colMeans(X)

# Center each observation relative to its column mean.
D <- sweep(X, 2, xbar, "-")

# Calculate the sum-of-products matrix and sample covariance matrix.
raw_crossproducts <- t(D) %*% D
S_hand <- raw_crossproducts / (nrow(X) - 1)
S_R <- cov(X)

# The requested generalized variance.
generalized_variance <- det(S_R)

# Verify explicitly that the third raw column is the sum of the first two.
column_relation <- X[, 3] - X[, 1] - X[, 2]

# Check the matrix ranks using QR decompositions.
rank_raw <- qr(X)$rank
rank_centered <- qr(D)$rank
rank_covariance <- qr(S_R)$rank

print(xbar)
print(D)
print(raw_crossproducts)
print(S_hand)
print(S_R)
print(generalized_variance)
print(column_relation)
print(c(raw_rank = rank_raw,
        centered_rank = rank_centered,
        covariance_rank = rank_covariance))

# Compare numeric output with the mathematical result zero.
all(abs(column_relation) < 1e-10)
abs(det(S_R)) < 1e-10
```

### Expected output: means and cross-products

$$
\bar{\mathbf{x}}=(16,18,34)',\qquad
\mathbf{D}'\mathbf{D}=\begin{bmatrix}40&12&52\\12&10&22\\52&22&74\end{bmatrix}.
$$

### Expected output: sample covariance matrix

$$
\boxed{\mathbf{S}=\begin{bmatrix}
10&3&13\\
3&2.5&5.5\\
13&5.5&18.5
\end{bmatrix}.}
$$

### Expected output: determinants, column relation and rank

Mathematically $|\mathbf{S}|=0$. A computer calculates with finite decimal precision, so on some systems `det(S_R)` may display an extremely tiny value rather than a printed zero. This is **not** evidence that our exact algebraic answer is wrong. Check with a tolerance, for example `abs(det(S_R)) < 1e-10`.

The vector `column_relation` should be `(0,0,0,0,0)` (five zeros). The three rank calculations should all give **2** for these data. `qr()` is a numerical matrix decomposition used here to estimate how many columns are independent; `$rank` extracts its rank component. `1e-10` is R notation for $10^{-10}=0.0000000001$.

### Another quick R check: total score is perfectly predictable

```r
X <- matrix(c(12, 17, 29,
              18, 20, 38,
              14, 16, 30,
              20, 18, 38,
              16, 19, 35),
            nrow = 5, byrow = TRUE)

# Reconstruct totals from the two test scores.
reconstructed <- X[, 1] + X[, 2]
original_totals <- X[, 3]

cbind(original_totals, reconstructed)
all(reconstructed == original_totals)
```

The last line should return `TRUE`. Unlike the approximate determinant check, these are small integers and the additions here can be compared exactly.

## Why a correlation matrix would also be singular (optional enrichment)

The worksheet does not ask for $\mathbf{R}$ in Question 3, but you might wonder whether standardization fixes the problem. It does **not**. Rescaling the variables cannot create a genuinely new independent direction.

For these scores, the sample correlations are

$$
\begin{aligned}
r_{12}&=\frac{3}{\sqrt{10\cdot2.5}}=\frac35=0.6,\\
r_{13}&=\frac{13}{\sqrt{10\cdot18.5}}=\frac{13}{\sqrt{185}}\approx0.9558,\\
r_{23}&=\frac{5.5}{\sqrt{2.5\cdot18.5}}=\frac{11}{\sqrt{185}}\approx0.8087.
\end{aligned}
$$

Thus

$$
\mathbf{R}\approx\begin{bmatrix}1&0.6&0.9558\\0.6&1&0.8087\\0.9558&0.8087&1\end{bmatrix}.
$$

Its **exact** determinant is also zero, because the standardized variables still have a perfect linear relationship with suitable scaling coefficients. The printed rounded entries above may not produce exactly zero if you type only four decimals. To verify using full precision, calculate `det(cor(X))` directly in R.

## Common mistakes in Question 3

- **Mistake:** divide by $n=5$ when calculating **sample** covariance. **Fix:** divide by $n-1=4$.
- **Mistake:** calculate the covariance using one variable's raw values and the other variable's deviations. **Fix:** both variables must be centered.
- **Mistake:** use an incorrect mean for total score. **Fix:** $(29+38+30+38+35)/5=34$.
- **Mistake:** only calculate one covariance when three variables are present. **Fix:** a $3\times3$ matrix needs three variances and three different covariances, mirrored symmetrically.
- **Mistake:** say the sample has no variation because the determinant is zero. **Fix:** each score variable has positive variance; the **joint three-dimensional volume** is zero.
- **Mistake:** say scores are all the same because columns are dependent. **Fix:** the vectors are not equal. One column is a **combination** of the others.
- **Mistake:** think "linearly dependent variables" means sampled people are statistically dependent. **Fix:** these are different types of dependence; exact dependence among columns is a structural feature of the variables, not proof of dependence among sampled individuals.
- **Mistake:** invert the singular covariance matrix. **Fix:** a standard inverse does not exist; consider removing the redundant total or otherwise changing the model if an inverse is required.

## Question 3: concise final answer

$$
\boxed{\mathbf{S}=\begin{bmatrix}10&3&13\\3&2.5&5.5\\13&5.5&18.5\end{bmatrix},\qquad |\mathbf{S}|=0.}
$$

Further,

$$
\boxed{\mathbf{x}_3=\mathbf{x}_1+\mathbf{x}_2,}
$$

where $\mathbf{x}_j$ denotes column $j$ of the original data matrix. Hence these columns are linearly dependent. The third variable contains **no additional independent dimension** beyond the first two, so the sample covariance matrix is singular and has zero generalized variance.


# Question 4 (R): The determinant relationship in three variables

**Source location:** Page 3.  
**Solution status:** The PDF supplies both $3\times3$ matrices, states $|\mathbf{S}|=14$, and verifies $(s_{11}s_{22}s_{33})|\mathbf{R}|\approx14$. Those numerical results are correct. This chapter retains them, supplies exact-fraction arithmetic, establishes where the correlation matrix comes from, and adds a runnable R verification.

## Original question (faithfully reproduced)

**Question 4 (R)**

Illustrate the relationship of the generalized variances $|\mathbf{S}|$ and $|\mathbf{R}|$ for

$$
\mathbf{S}=\begin{bmatrix}
4&3&1\\
3&9&2\\
1&2&1
\end{bmatrix}
\qquad\text{and}\qquad
\mathbf{R}=\begin{bmatrix}
1&\frac12&\frac12\\
\frac12&1&\frac23\\
\frac12&\frac23&1
\end{bmatrix}.
$$

## What is the question asking in simple English?

In Question 2, we proved that a two-variable covariance determinant equals the product of the two separate variances times the correlation determinant. Question 4 asks us to check whether the **same idea works with three variables**.

The new relationship is

$$
\boxed{|\mathbf{S}|=(s_{11}s_{22}s_{33})|\mathbf{R}|.}
$$

The three diagonal covariance entries are $s_{11}=4$, $s_{22}=9$, and $s_{33}=1$. Their product is $4\times9\times1=36$.

We have two tasks:

1. Calculate the determinant of the given covariance matrix $\mathbf{S}$.
2. Calculate the determinant of the given correlation matrix $\mathbf{R}$, multiply it by 36, and show that the result agrees with task 1.

The source supplies **matrices only**, not the raw observations that generated them. We must **not invent raw data** for this question. R can calculate the determinant of the supplied matrices directly.

## Step 1: Understand the covariance matrix

$$
\mathbf{S}=\begin{bmatrix}
4&3&1\\
3&9&2\\
1&2&1
\end{bmatrix}.
$$

The diagonal entries are the sample variances. Do not read the off-diagonal 3, 1 and 2 as additional separate variances. They are sample covariances:

| Entry | Value | Interpretation |
|---|---:|---|
| $s_{11}$ | 4 | Variance of variable 1 |
| $s_{22}$ | 9 | Variance of variable 2 |
| $s_{33}$ | 1 | Variance of variable 3 |
| $s_{12}=s_{21}$ | 3 | Covariance between variables 1 and 2 |
| $s_{13}=s_{31}$ | 1 | Covariance between variables 1 and 3 |
| $s_{23}=s_{32}$ | 2 | Covariance between variables 2 and 3 |

We will not need to know $n$ or any individual observation to calculate these determinants.

## Step 2: Calculate $|\mathbf{S}|$ by hand

We use the first-row expansion formula introduced in Question 3:

$$
\left|\begin{matrix}a&b&c\\d&e&f\\g&h&i\end{matrix}\right|
=a(ei-fh)-b(di-fg)+c(dh-eg).
$$

For the source matrix,

$$
 a=4,\ b=3,\ c=1,\ d=3,\ e=9,\ f=2,\ g=1,\ h=2,\ i=1.
$$

Substitute all values before simplifying:

$$
\begin{aligned}
|\mathbf{S}|
&=4[(9)(1)-(2)(2)]\\
&\quad-3[(3)(1)-(2)(1)]\\
&\quad+1[(3)(2)-(9)(1)].
\end{aligned}
$$

Now calculate one bracket at a time:

$$
\begin{aligned}
(9)(1)-(2)(2)&=9-4=5,\\
(3)(1)-(2)(1)&=3-2=1,\\
(3)(2)-(9)(1)&=6-9=-3.
\end{aligned}
$$

Finally,

$$
\begin{aligned}
|\mathbf{S}|
&=4(5)-3(1)+1(-3)\\
&=20-3-3\\
&=\boxed{14}.
\end{aligned}
$$

**Source-provided answer, independently verified:**

$$
\boxed{|\mathbf{S}|=14.}
$$

### Why did the first-row signs go plus, minus, plus?

The $3\times3$ determinant expansion follows a pattern of alternating cofactors. For the first row, the sign pattern is $+,-,+$. The second term is **subtracted even if its bracket already contains a negative number**. For instance, in Question 3, the middle bracket happened to be $-16$, so $-3(-16)$ was positive. Here the middle bracket is $+1$, so $-3(+1)$ is negative.

A common algebra mistake is to remove parentheses too soon. Keep the parentheses until you have evaluated each little $2\times2$ determinant.

## Step 3: Find the sample standard deviations

The diagonal of a covariance matrix contains **variances**. Standard deviations are their square roots:

$$
\begin{aligned}
s_1&=\sqrt{s_{11}}=\sqrt4=\boxed{2},\\
s_2&=\sqrt{s_{22}}=\sqrt9=\boxed{3},\\
s_3&=\sqrt{s_{33}}=\sqrt1=\boxed{1}.
\end{aligned}
$$

We now have two related lists:

- Variances: $(4,9,1)$; their product is $4\cdot9\cdot1=36$.
- Standard deviations: $(2,3,1)$; their product is $2\cdot3\cdot1=6$.

**The determinant identity uses the product of the variances, 36**, not simply the product of the standard deviations, 6. The matrix proof later in this chapter shows why the square of 6 appears.

## Step 4: Verify the individual entries of the given $\mathbf{R}$ matrix

Correlations are calculated from covariances by dividing by the product of the corresponding standard deviations.

### Correlation between variables 1 and 2

$$
\begin{aligned}
r_{12}
&=\frac{s_{12}}{s_1s_2}\\
&=\frac{3}{2\times3}\\
&=\frac{3}{6}\\
&=\boxed{\frac12}.
\end{aligned}
$$

### Correlation between variables 1 and 3

$$
\begin{aligned}
r_{13}
&=\frac{s_{13}}{s_1s_3}\\
&=\frac{1}{2\times1}\\
&=\boxed{\frac12}.
\end{aligned}
$$

### Correlation between variables 2 and 3

$$
\begin{aligned}
r_{23}
&=\frac{s_{23}}{s_2s_3}\\
&=\frac{2}{3\times1}\\
&=\boxed{\frac23}.
\end{aligned}
$$

Correlations are symmetric: $r_{21}=r_{12}$, $r_{31}=r_{13}$ and $r_{32}=r_{23}$. The diagonal entries are 1 because each variable is being compared with itself and has nonzero variance. Hence the given matrix is indeed consistent with the supplied covariance matrix:

$$
\boxed{\mathbf{R}=\begin{bmatrix}
1&\frac12&\frac12\\
\frac12&1&\frac23\\
\frac12&\frac23&1
\end{bmatrix}.}
$$

That check matters: the identity between determinants applies to **a covariance matrix and its corresponding correlation matrix**, not two unrelated matrices chosen independently.

## Step 5: Calculate $|\mathbf{R}|$ exactly

Using first-row expansion,

$$
\begin{aligned}
|\mathbf{R}|
&=1\left[(1)(1)-\left(\frac23\right)\left(\frac23\right)\right]\\
&\quad-\frac12\left[\left(\frac12\right)(1)-\left(\frac23\right)\left(\frac12\right)\right]\\
&\quad+\frac12\left[\left(\frac12\right)\left(\frac23\right)-(1)\left(\frac12\right)\right].
\end{aligned}
$$

Let's simplify the three square brackets separately.

### First bracket

$$
\begin{aligned}
1-\left(\frac23\right)^2
&=1-\frac49\\
&=\frac99-\frac49\\
&=\frac59.
\end{aligned}
$$

### Second bracket

$$
\begin{aligned}
\frac12-\left(\frac23\times\frac12\right)
&=\frac12-\frac13\\
&=\frac36-\frac26\\
&=\frac16.
\end{aligned}
$$

### Third bracket

$$
\begin{aligned}
\left(\frac12\times\frac23\right)-\frac12
&=\frac13-\frac12\\
&=\frac26-\frac36\\
&=-\frac16.
\end{aligned}
$$

Insert these into the expansion:

$$
\begin{aligned}
|\mathbf{R}|
&=1\left(\frac59\right)
-\frac12\left(\frac16\right)
+\frac12\left(-\frac16\right)\\
&=\frac59-\frac1{12}-\frac1{12}\\
&=\frac59-\frac16\\
&=\frac{10}{18}-\frac3{18}\\
&=\boxed{\frac7{18}}\\
&=\boxed{0.388888\ldots}.
\end{aligned}
$$

The exact result is $7/18$, whose decimal expansion repeats. The source displays it as $0.3888889$, which is a rounded form of the same value.

## Step 6: Verify the generalized variance relationship

The required formula for three variables is

$$
|\mathbf{S}|=(s_{11}s_{22}s_{33})|\mathbf{R}|.
$$

We already know

$$
s_{11}s_{22}s_{33}=4\times9\times1=36,
$$

and

$$
|\mathbf{R}|=\frac7{18}.
$$

Therefore,

$$
\begin{aligned}
(s_{11}s_{22}s_{33})|\mathbf{R}|
&=(4\times9\times1)\left(\frac7{18}\right)\\
&=36\times\frac7{18}\\
&=\frac{36}{18}\times7\\
&=2\times7\\
&=\boxed{14}.
\end{aligned}
$$

And so

$$
\boxed{|\mathbf{S}|=14=(s_{11}s_{22}s_{33})|\mathbf{R}|.}
$$

**Source-provided answer (page 3):**

$$
|\mathbf{S}|=14,\qquad
(s_{11}s_{22}s_{33})|\mathbf{R}|=(4\times9\times1)(0.3888889)\approx14.
$$

Our fraction calculation improves on that printed decimal approximation: the relation is **exactly equal**, not only approximately equal, because $36(7/18)=14$ without rounding.

## Why does the identity work for three variables and beyond?

### Step 1: Put the standard deviations into a diagonal matrix

A **diagonal matrix** has zeros everywhere except possibly on its main diagonal. Here define

$$
\mathbf{D}_s=\begin{bmatrix}2&0&0\\0&3&0\\0&0&1\end{bmatrix}.
$$

### Step 2: Recognize how covariance and correlation are linked

The general matrix relation is

$$
\boxed{\mathbf{S}=\mathbf{D}_s\mathbf{R}\mathbf{D}_s.}
$$

Each entry of $\mathbf{R}$ is multiplied by the relevant two standard deviations. For example, the entry in row 2, column 3 becomes

$$
s_2\,r_{23}\,s_3=3\left(\frac23\right)(1)=2,
$$

which agrees with $s_{23}=2$ in $\mathbf{S}$.

To verify the entire matrix in one calculation,

$$
\begin{aligned}
\mathbf{D}_s\mathbf{R}\mathbf{D}_s
&=\begin{bmatrix}2&0&0\\0&3&0\\0&0&1\end{bmatrix}
\begin{bmatrix}1&1/2&1/2\\1/2&1&2/3\\1/2&2/3&1\end{bmatrix}
\begin{bmatrix}2&0&0\\0&3&0\\0&0&1\end{bmatrix}\\[5pt]
&=\begin{bmatrix}2&1&1\\3/2&3&2\\1/2&2/3&1\end{bmatrix}
\begin{bmatrix}2&0&0\\0&3&0\\0&0&1\end{bmatrix}\\
&=\begin{bmatrix}4&3&1\\3&9&2\\1&2&1\end{bmatrix}\\
&=\mathbf{S}.
\end{aligned}
$$

### Step 3: Apply the determinant-of-a-product rule

For compatible **square** matrices,

$$
|\mathbf{A}\mathbf{B}|=|\mathbf{A}|\,|\mathbf{B}|.
$$

Applying this rule twice,

$$
\begin{aligned}
|\mathbf{S}|
&=|\mathbf{D}_s\mathbf{R}\mathbf{D}_s|\\
&=|\mathbf{D}_s|\,|\mathbf{R}|\,|\mathbf{D}_s|\\
&=|\mathbf{D}_s|^2\,|\mathbf{R}|.
\end{aligned}
$$

Because $\mathbf{D}_s$ is diagonal, its determinant is the product of its diagonal entries:

$$
|\mathbf{D}_s|=s_1s_2s_3=2\times3\times1=6.
$$

Therefore,

$$
\begin{aligned}
|\mathbf{S}|
&=(s_1s_2s_3)^2|\mathbf{R}|\\
&=(s_1^2s_2^2s_3^2)|\mathbf{R}|\\
&=(s_{11}s_{22}s_{33})|\mathbf{R}|.
\end{aligned}
$$

The derivation shows exactly why we multiply by the **variances** rather than by just the standard deviations: the diagonal scale matrix appears **twice**, so its determinant is squared.

### General formula for $p$ variables

If all $p$ variables have positive sample variance, let $s_j=\sqrt{s_{jj}}$, $j=1,\ldots,p$. Then

$$
\boxed{|\mathbf{S}|=\left(\prod_{j=1}^{p}s_{jj}\right)|\mathbf{R}|.}
$$

The symbol $\prod$ (capital Greek pi) means **multiply the sequence of terms**, just as $\sum$ means add them. Specifically,

$$
\prod_{j=1}^{p}s_{jj}=s_{11}s_{22}\cdots s_{pp}.
$$

For $p=2$, this becomes $(s_{11}s_{22})|\mathbf{R}|$, as in Question 2. For $p=3$, it becomes $(s_{11}s_{22}s_{33})|\mathbf{R}|$, as in Question 4. These are not separate formulas to memorize; they are the **same formula with different numbers of variables**.

## An interesting coincidence: trace and determinant are both 14 here

The supplied covariance matrix also has total sample variance

$$
\operatorname{tr}(\mathbf{S})=4+9+1=\boxed{14}.
$$

Its determinant is $|\mathbf{S}|=14$ too. These two numbers happen to be equal **for this specific matrix**, but the two quantities have different meanings and different formulas:

$$
\operatorname{tr}(\mathbf{S})=s_{11}+s_{22}+s_{33},
\qquad
|\mathbf{S}|=\det(\mathbf{S}).
$$

**Do not generalize that determinant equals trace.** It was not true in Question 2, where the trace was 17 but the determinant was 12. This coincidence can easily cause an incorrect exam answer if you decide the determinant is found by adding diagonal entries.

## What can and cannot be inferred from the matrices?

- All three sample variances are positive.
- All three pairwise sample correlations are positive.
- Variable 2 with variable 3 has the largest of the **three given pairwise sample correlations**, $2/3\approx0.6667$, followed by the two correlations of $1/2$.
- The generalized covariance determinant is positive, $14>0$; thus the covariance matrix is **nonsingular** and its three variable directions are not exactly linearly dependent.
- The standardized generalized variance is $7/18\approx0.3889$, strictly between 0 and 1.
- Because no raw measurements, sample size, sampling procedure or population model are given, the question does **not** justify claims about individual observations, confidence intervals, hypothesis tests, or population-level effects.

## Complete base R solution for Question 4

```r
# Enter the given covariance matrix exactly, row by row.
S <- matrix(c(4, 3, 1,
              3, 9, 2,
              1, 2, 1),
            nrow = 3, byrow = TRUE)

# Enter the given correlation matrix using fractions.
R <- matrix(c(1,   1/2, 1/2,
              1/2, 1,   2/3,
              1/2, 2/3, 1),
            nrow = 3, byrow = TRUE)

# Compute the two generalized sample variances.
det_S <- det(S)
det_R <- det(R)

# Extract the three variances and multiply them.
variances <- diag(S)
product_of_variances <- prod(variances)

# Verify the identity's right-hand side.
right_side <- product_of_variances * det_R

# Construct the standard deviation scale matrix.
standard_deviations <- sqrt(variances)
D_scale <- diag(standard_deviations)

# Recover R from S and check consistency.
R_derived <- cov2cor(S)

# Recover S using the diagonal scale matrix.
S_reconstructed <- D_scale %*% R %*% D_scale

# Display all the requested calculations.
print(S)
print(R)
print(variances)
print(standard_deviations)
print(det_S)
print(det_R)
print(right_side)
print(R_derived)
print(S_reconstructed)

# Check matrix and determinant equalities allowing rounding.
all.equal(unname(R), unname(R_derived))
all.equal(unname(S), unname(S_reconstructed))
all.equal(as.numeric(det_S), as.numeric(right_side))
```

### R commands explained

**`matrix(..., nrow = 3, byrow = TRUE)`** creates a $3\times3$ matrix by filling each row. The fractions `1/2` and `2/3` are calculated by R, so they are not prematurely rounded.

**`det(S)`** gives the generalized sample variance, because $\mathbf{S}$ is the sample covariance matrix.

**`diag(S)`** gives the vector containing its diagonal entries, here `(4, 9, 1)`.

**`prod(variances)`** multiplies those variances and gives `36`.

**`sqrt(variances)`** calculates the standard deviations `(2, 3, 1)`.

**`diag(standard_deviations)`** is different from `diag(S)`! When `diag()` receives a numeric vector, it **creates** a diagonal matrix, here with 2, 3 and 1 along the diagonal. When `diag()` receives a matrix, it **extracts** the diagonal values. The behavior depends on the input.

**`cov2cor(S)`** is a built-in R function that transforms a covariance matrix into its associated correlation matrix. It is especially useful here because the source gives the covariance matrix rather than the original observations.

**`%*%`** multiplies matrices in the correct linear-algebra sense. `D_scale %*% R %*% D_scale` reconstructs the original covariance matrix from the correlation matrix and standard deviation scales.

**`unname()`** is used in the equality checks to ignore potentially irrelevant names or dimension labels when comparing arrays. **`all.equal()`** is preferable to raw decimal equality because computers store many fractions as approximations.

### Expected numerical results

| R expression | Expected value |
|---|---:|
| `det(S)` | $14$ |
| `det(R)` | $7/18\approx0.388888889$ |
| `diag(S)` | $(4,9,1)$ |
| `sqrt(diag(S))` | $(2,3,1)$ |
| `prod(diag(S))` | $36$ |
| `prod(diag(S)) * det(R)` | $14$ |
| `sum(diag(S))` | $14$ (an accidental equality with the determinant) |

## Common mistakes in Question 4

- **Mistake:** use $2\times3\times1=6$ as the factor multiplying $|\mathbf{R}|$. **Fix:** use the variances $4\times9\times1=36$.
- **Mistake:** treat $r_{23}=2/3$ as $2$ or $3$. **Fix:** $2/3$ is a fraction; retain it through the determinant calculation.
- **Mistake:** try the two-variable determinant shortcut $ad-bc$ directly on the $3\times3$ matrix. **Fix:** use a valid $3\times3$ expansion or R's `det()`.
- **Mistake:** round $2/3$ to $0.67$ before calculating. **Fix:** use the exact fraction; round only for final display.
- **Mistake:** type the nine entries into `matrix()` without `byrow = TRUE` and assume R always uses the printed arrangement. **Fix:** be explicit. Here both supplied matrices are symmetric, so filling by columns happens to give the same numerical matrix, but that is not generally true.
- **Mistake:** think $|\mathbf{R}|$ is the correlation between the first and second variables. **Fix:** that correlation is $r_{12}=1/2$; $|\mathbf{R}|=7/18$ is a determinant involving all three variables.
- **Mistake:** conclude that determinant always equals trace because both equal 14 in this example. **Fix:** the equality is coincidental.

## Question 4: concise final answer

$$
\boxed{\begin{aligned}
|\mathbf{S}|&=14,\\
|\mathbf{R}|&=\frac7{18}\approx0.388888889,\\
s_{11}s_{22}s_{33}&=4\times9\times1=36,\\
(s_{11}s_{22}s_{33})|\mathbf{R}|&=36\times\frac7{18}=14.
\end{aligned}}
$$

Therefore,

$$
\boxed{|\mathbf{S}|=(s_{11}s_{22}s_{33})|\mathbf{R}|,}
$$

as required.


# Part 5. Consolidated R revision and diagnostic exercises

This part helps you check what you have learned without jumping between the four questions. It is supplementary teaching material. **All data and matrices in the consolidated R checks are the exact values supplied by the worksheet.** The miniature exercises at the end are explicitly marked as new practice examples, not as original worksheet questions.

## 5.1 How to run R code if you have never used R

R is a programming language commonly used for statistics. You type a command, press Enter, and R computes a result. RStudio is an optional application providing a convenient editor for R, but **none of the code in this guide requires a third-party R package**.

A simple starting workflow:

1. Open R or RStudio. If using RStudio, create a new **R Script** so you can save your commands.
2. Copy a complete code block from this guide into the script window. Make sure every quotation mark, parenthesis, and comma is included.
3. Select a line or a group of lines and run them. In RStudio, `Ctrl+Enter` usually sends the selected lines to the Console.
4. Look at the **Console**, where the printed numerical results appear. A graph from `plot()` appears in a plot window or the RStudio Plots pane.
5. R is case-sensitive: `S` and `s` are different names. A variable named `X` must be referred to as `X`.
6. An assignment like `S <- cov(X)` creates or updates an object called `S`. To see it, type `S` or `print(S)` on the next line.

### How an R matrix is organized

Recall the worksheet uses observations in rows and variables in columns. The safest beginner pattern is

```r
X <- matrix(c(9, 1,
              5, 3,
              1, 2), nrow = 3, byrow = TRUE)
```

Read it as: "Create a matrix containing the values in that order; make three rows; fill one row at a time." R treats matrix positions as `X[row, column]`:

```r
X[1, 1]    # Observation 1, variable 1: 9
X[1, 2]    # Observation 1, variable 2: 1
X[3, 1]    # Observation 3, variable 1: 1
X[, 1]     # Every row of variable 1: 9, 5, 1
X[2, ]     # Every variable for observation 2: 5, 3
nrow(X)    # Number of observations: 3
ncol(X)    # Number of variables: 2
```

The colon in `1:3` creates consecutive integers 1, 2 and 3. A blank position in `X[, 1]` means select all rows. The `#` symbol begins a comment: R ignores the rest of that line. Comments are reminders for humans; they do not affect calculations.

## 5.2 One complete base-R verification script for the worksheet

This is a convenient **study check**, not a substitute for showing your manual calculations. It recreates every numerical matrix in the original worksheet and checks the main results. It does not read any external `.dat` files, because **Worksheet 2 supplies all the necessary numerical information**.

```r
# ========================================================
# DA2451 Worksheet 2: all numeric examples in one script
# Uses only functions included with base R
# ========================================================

# QUESTION 1: 3 observations, 2 variables
X1 <- matrix(c(9, 1,
               5, 3,
               1, 2), nrow = 3, byrow = TRUE)

mean1 <- colMeans(X1)
centered1 <- sweep(X1, 2, mean1, "-")
S1 <- cov(X1)
R1 <- cor(X1)

length1 <- sqrt(sum(centered1[, 1]^2))
length2 <- sqrt(sum(centered1[, 2]^2))
dot1 <- sum(centered1[, 1] * centered1[, 2])
cos1 <- dot1 / (length1 * length2)
angle1 <- acos(cos1) * 180 / pi

cat("Question 1 mean:", mean1, "\n")
print(centered1)
print(S1)
print(R1)
cat("Vector lengths:", length1, length2, "\n")
cat("Dot product:", dot1, "\n")
cat("Correlation / cosine:", cos1, "\n")
cat("Angle in degrees:", angle1, "\n")

# QUESTION 2: generalized variance, standardized version,
# total variance, and the determinant identity

detS1 <- det(S1)
detR1 <- det(R1)
total1 <- sum(diag(S1))
identity1 <- prod(diag(S1)) * detR1

cat("Question 2 generalized variance:", detS1, "\n")
cat("Question 2 standardized generalized variance:", detR1, "\n")
cat("Question 2 total sample variance:", total1, "\n")
cat("Question 2 identity right side:", identity1, "\n")

# QUESTION 3: 5 observations, 3 scores
X3 <- matrix(c(12, 17, 29,
               18, 20, 38,
               14, 16, 30,
               20, 18, 38,
               16, 19, 35),
             nrow = 5, byrow = TRUE)

mean3 <- colMeans(X3)
S3 <- cov(X3)
detS3 <- det(S3)
score_difference <- X3[, 3] - (X3[, 1] + X3[, 2])

cat("Question 3 mean:", mean3, "\n")
print(S3)
cat("Question 3 determinant:", detS3, "\n")
cat("Question 3 column relation:", score_difference, "\n")

# QUESTION 4: supplied 3x3 covariance and correlation
S4 <- matrix(c(4, 3, 1,
               3, 9, 2,
               1, 2, 1), nrow = 3, byrow = TRUE)

R4 <- matrix(c(1,   1/2, 1/2,
               1/2, 1,   2/3,
               1/2, 2/3, 1),
             nrow = 3, byrow = TRUE)

cat("Question 4 covariance determinant:", det(S4), "\n")
cat("Question 4 correlation determinant:", det(R4), "\n")
cat("Question 4 determinant identity right side:",
    prod(diag(S4)) * det(R4), "\n")

# Final checks: these stop with an error only if a result
# differs from the expected mathematical answer.
stopifnot(isTRUE(all.equal(as.numeric(mean1), c(5, 2))))
stopifnot(isTRUE(all.equal(unname(S1),
                           matrix(c(16, -2, -2, 1), 2, 2))))
stopifnot(isTRUE(all.equal(unname(R1),
                           matrix(c(1, -0.5, -0.5, 1), 2, 2))))
stopifnot(isTRUE(all.equal(cos1, -0.5)))
stopifnot(isTRUE(all.equal(angle1, 120)))
stopifnot(isTRUE(all.equal(as.numeric(detS1), 12)))
stopifnot(isTRUE(all.equal(as.numeric(detR1), 0.75)))
stopifnot(isTRUE(all.equal(as.numeric(total1), 17)))
stopifnot(isTRUE(all.equal(as.numeric(identity1), 12)))

expected_S3 <- matrix(c(10, 3, 13,
                        3, 2.5, 5.5,
                        13, 5.5, 18.5),
                      nrow = 3, byrow = TRUE)
stopifnot(isTRUE(all.equal(unname(S3), expected_S3)))
stopifnot(all(score_difference == 0))
stopifnot(abs(detS3) < 1e-10)
stopifnot(isTRUE(all.equal(as.numeric(det(S4)), 14)))
stopifnot(isTRUE(all.equal(as.numeric(det(R4)), 7/18)))
stopifnot(isTRUE(all.equal(as.numeric(prod(diag(S4)) * det(R4)), 14)))
stopifnot(isTRUE(all.equal(unname(cov2cor(S4)), unname(R4))))

cat("All Worksheet 2 numerical checks passed.\n")
```

### What does `stopifnot()` do?

`stopifnot(condition)` checks whether a condition is true. If it is true, R continues quietly. If it is false, R produces an error and stops running that script. This is useful for checking that a mathematical answer has not accidentally changed after editing the code. It **does not** supply a statistical p-value or significance test; it simply verifies arithmetic and matrix relationships.

### What does `cat()` do?

`cat()` displays text and values in a readable sequence. The special string `"\n"` creates a new line in the Console. In contrast, `print()` displays an R object such as a whole matrix.

## 5.3 Visualizing Question 1 with a second, centered graph

The original worksheet specifically asks for the raw scatter plot. A centered scatter plot is an **additional teaching visualization** that helps connect the 2D and 3D viewpoints:

```r
X <- matrix(c(9, 1, 5, 3, 1, 2), nrow = 3, byrow = TRUE)
D <- scale(X, center = TRUE, scale = FALSE)

plot(D[, 1], D[, 2],
     xlab = "Deviation in X1", ylab = "Deviation in X2",
     main = "Q1 supplementary: centered observations",
     pch = 19, xlim = c(-5, 5), ylim = c(-2, 2))
abline(h = 0, v = 0, lty = 2)
text(D[, 1], D[, 2], labels = 1:3, pos = 3)
```

The centered observation coordinates are now $(4,-1)$, $(0,1)$ and $(-4,0)$. Their mean is $(0,0)$. This is not a new sample and not a rotation; the whole original point cloud has simply been **shifted** by subtracting $(5,2)$. The geometry of the relative differences between the points is unchanged by this common shift.

**Important distinction:** the centered 2D scatter plot still treats **rows as points**. The 3D centered vectors in Question 1(b) and 1(c) treat **columns as vectors**. These views are related, but not identical kinds of objects.

## 5.4 New practice exercise 1: two-vector covariance

**Supplementary exercise, not in the original PDF.** Suppose two centered variable vectors across three observations are

$$
\mathbf{a}=\begin{bmatrix}2\\-1\\-1\end{bmatrix},
\qquad
\mathbf{b}=\begin{bmatrix}-1\\2\\-1\end{bmatrix}.
$$

Find the sample variances, covariance, and correlation. Use the geometric method taught in Question 1.

**Worked solution:** There are $n=3$ entries, and both vectors sum to zero. Their squared lengths are

$$
\mathbf{a}'\mathbf{a}=2^2+(-1)^2+(-1)^2=6,
\quad
\mathbf{b}'\mathbf{b}=(-1)^2+2^2+(-1)^2=6.
$$

Their dot product is

$$
\mathbf{a}'\mathbf{b}=2(-1)+(-1)(2)+(-1)(-1)=-2-2+1=-3.
$$

Divide by $n-1=2$:

$$
 s_{aa}=6/2=3,\quad s_{bb}=6/2=3,\quad s_{ab}=-3/2=-1.5.
$$

Then

$$
 r_{ab}=\frac{-1.5}{\sqrt3\sqrt3}=\frac{-1.5}{3}=\boxed{-0.5}.
$$

As with the original Question 1, the centered vectors have cosine $-0.5$ and an angle of $120^\circ$.

## 5.5 New practice exercise 2: determinant versus trace

**Supplementary exercise, not in the original PDF.** Consider

$$
\mathbf{A}=\begin{bmatrix}9&0\\0&4\end{bmatrix}.
$$

What are its determinant and trace?

**Solution:**

$$
|\mathbf{A}|=9(4)-0(0)=\boxed{36},\qquad
\operatorname{tr}(\mathbf{A})=9+4=\boxed{13}.
$$

A determinant **multiplies and combines entries with subtraction**, while a trace **adds diagonal entries**. Those are different operations. If the matrix is a covariance matrix, the determinant is generalized variance and the trace is total variance.

## 5.6 New practice exercise 3: when a variable is redundant

**Supplementary exercise, not in the original PDF.** Suppose the recorded variables obey $X_3=2X_1-X_2$ for **every** observation. Can the covariance matrix for all three variables have a positive determinant?

**Solution:** No. Rearrange the relationship:

$$
-2X_1+X_2+X_3=0.
$$

Thus a nonzero coefficient combination of the three variable columns gives zero. They are linearly dependent. After centering, the same relationship holds for the deviations, so the sample covariance matrix is singular and its determinant is exactly zero (assuming it can be calculated in the usual way). This is the same principle as Question 3, but with different coefficients.

## 5.7 New practice exercise 4: standardization and correlation

**Supplementary exercise, not in the original PDF.** Suppose

$$
\mathbf{S}=\begin{bmatrix}25&-6\\-6&9\end{bmatrix}.
$$

Calculate the correlation and both determinants.

**Solution:** Sample standard deviations are $s_1=\sqrt{25}=5$, $s_2=\sqrt9=3$. Therefore

$$
 r_{12}=\frac{-6}{5\cdot3}=\boxed{-0.4}.
$$

The correlation matrix is

$$
\mathbf{R}=\begin{bmatrix}1&-0.4\\-0.4&1\end{bmatrix}.
$$

Its determinant is

$$
|\mathbf{R}|=1-(-0.4)^2=1-0.16=\boxed{0.84}.
$$

The covariance determinant is

$$
|\mathbf{S}|=25(9)-(-6)^2=225-36=\boxed{189}.
$$

Check the identity:

$$
(25\cdot9)(0.84)=225(0.84)=\boxed{189}.
$$

This exercise shows that the determinant relationship is not restricted to the particular values in the worksheet.

## 5.8 Conceptual questions with immediate answers

**Question:** If three students are measured on two variables, is the dataset three-dimensional or two-dimensional?  
**Answer:** Both views are available. It is **two-dimensional in variable space**, where students are three 2D points. It is **three-dimensional in observation space**, where the two variable columns become two vectors of length three.

**Question:** Why do deviations from the sample mean sum to zero?  
**Answer:** Because $\sum_i(x_i-\bar{x})=\sum_i x_i-n\bar{x}=n\bar{x}-n\bar{x}=0$. The mean was defined precisely as $\sum_i x_i/n$.

**Question:** If the covariance is negative, is the correlation necessarily negative?  
**Answer:** Yes, provided both standard deviations are positive. Correlation divides covariance by a positive product, so its sign stays the same.

**Question:** If the two centered vectors are perpendicular, what is the sample correlation?  
**Answer:** Zero, because their dot product and cosine are zero. This does not generally mean the variables are independent.

**Question:** Does changing dollars to cents change correlation?  
**Answer:** Multiplying a variable by a positive constant changes its variance and covariance scale, but not its correlation. Multiplying by a negative constant reverses the direction and changes the correlation's sign.

**Question:** Can sample covariance be negative?  
**Answer:** Yes. It measures joint direction, not the amount of positive spread. The sample variance of a single variable cannot be negative, but a cross-covariance can.

**Question:** Does a determinant of zero mean the diagonal variances are all zero?  
**Answer:** No. Question 3 shows positive diagonal variances with zero determinant because of an exact linear relationship among columns.

**Question:** If $n=3$ and $p=5$, can the usual $5\times5$ sample covariance matrix be invertible?  
**Answer:** No. After centering, at most $n-1=2$ independent sample directions remain; the covariance matrix's rank is at most 2, which is less than 5. It must be singular. This is a general rank limitation, even if no original variables are exact sums of others.

**Question:** Does $n>p$ guarantee an invertible covariance matrix?  
**Answer:** No. It allows the possibility when the centered variables are genuinely linearly independent, but exact dependence such as Question 3 can still make the covariance matrix singular even if $n>p$.

**Question:** Does an R output of `2.775558e-17` prove a theoretical determinant is nonzero?  
**Answer:** Not necessarily. This means $2.775558\times10^{-17}$, an extremely small numerical value. Verify the exact algebra and assess whether the nonzero display is merely floating-point rounding.



# Part 6. Reference sheet and final checklist

## 6.1 The complete worksheet answer map

| Source question | Original task | Main final result | Provenance |
|---|---|---|---|
| 1(a) | Plot three observations in $p=2$; locate mean | Points $(9,1),(5,3),(1,2)$; mean $(5,2)$ | Mean source-provided; plot construction explained independently |
| 1(b) | Sketch $n=3$ representation | Column vectors $(9,5,1)'$, $(1,3,2)'$ | Geometric construction independently explained |
| 1(c) | Deviation vectors | $\mathbf{d}_1=(4,0,-4)'$, $\mathbf{d}_2=(-1,1,0)'$ | Source-provided, independently verified |
| 1(d) | Lengths, cosine, covariance and correlation | $\sqrt{32}$, $\sqrt2$, $-0.5$, $\mathbf{S}=\left[\begin{smallmatrix}16&-2\\-2&1\end{smallmatrix}\right]$, $\mathbf{R}=\left[\begin{smallmatrix}1&-0.5\\-0.5&1\end{smallmatrix}\right]$ | Source-provided, independently verified |
| 2(a) | Generalized sample variance | $|\mathbf{S}|=12$ | Source-provided, independently verified |
| 2(b) | Standardized generalized variance | $|\mathbf{R}|=0.75$ | Implied by source's supplied identity; calculated explicitly |
| 2(c) | Total sample variance | $\operatorname{tr}(\mathbf{S})=17$ | Independently completed; source asks but does not print result |
| 2 identity | Verify determinant relation | $(16)(1)(0.75)=12$ | Source-provided, independently verified |
| 3(a) | Compute covariance and zero determinant | $\mathbf{S}=\left[\begin{smallmatrix}10&3&13\\3&2.5&5.5\\13&5.5&18.5\end{smallmatrix}\right]$, $|\mathbf{S}|=0$ | Independently calculated; source does not supply working |
| 3(b) | Verify linear dependence | Column 3 = column 1 + column 2 | Independently checked from each supplied observation |
| 4 | Verify three-variable relation | $|\mathbf{S}|=14$, $|\mathbf{R}|=7/18$, product of variances $=36$, $36(7/18)=14$ | Source-provided numerical results; exact fraction derivation independently added |

## 6.2 Formula sheet with explanations

### Means and deviations

$$
\boxed{\bar{x}_j=\frac1n\sum_{i=1}^n x_{ij}}
\qquad\text{and}\qquad
\boxed{\mathbf{d}_j=\mathbf{y}_j-\bar{x}_j\mathbf{1}}.
$$

**Meaning:** average column $j$ over all $n$ observations, then subtract that mean from each entry of the same column. The vector of ones $\mathbf{1}$ has $n$ entries.

### Sample variance and covariance

$$
\boxed{s_{jj}=\frac1{n-1}\sum_{i=1}^n(x_{ij}-\bar{x}_j)^2},
$$

$$
\boxed{s_{jk}=\frac1{n-1}\sum_{i=1}^n(x_{ij}-\bar{x}_j)(x_{ik}-\bar{x}_k)}.
$$

**Meaning:** variance is the average squared deviation using denominator $n-1$; covariance is the corresponding average product of paired deviations. The denominator $n-1$ is the sample estimator's degrees-of-freedom adjustment.

### Vector lengths and dot products

$$
\boxed{\lVert\mathbf{d}_j\rVert=\sqrt{\mathbf{d}_j'\mathbf{d}_j}},
$$

$$
\boxed{\mathbf{d}_j'\mathbf{d}_k=\sum_{i=1}^n d_{ij}d_{ik}}.
$$

**Meaning:** a squared length sums squares; a dot product sums products of matching coordinates.

### Geometry-to-statistics bridge

$$
\boxed{s_{jj}=\frac{\lVert\mathbf{d}_j\rVert^2}{n-1}},
\qquad
\boxed{s_{jk}=\frac{\mathbf{d}_j'\mathbf{d}_k}{n-1}},
$$

$$
\boxed{r_{jk}=\frac{s_{jk}}{\sqrt{s_{jj}s_{kk}}}
=\frac{\mathbf{d}_j'\mathbf{d}_k}
{\lVert\mathbf{d}_j\rVert\lVert\mathbf{d}_k\rVert}
=\cos\theta_{jk}}.
$$

**Meaning:** the length determines the variance; the dot product determines covariance; and the angle between centered variable vectors determines correlation. The correlation formula requires that neither centered vector be zero.

### Matrix form of covariance

$$
\boxed{\mathbf{S}=\frac1{n-1}\mathbf{D}'\mathbf{D}},
$$

where $\mathbf{D}$ is the entire $n\times p$ **centered data matrix**. The resulting $\mathbf{S}$ is a $p\times p$ matrix.

### Generalized sample variance

$$
\boxed{\text{Generalized sample variance}=|\mathbf{S}|=\det(\mathbf{S})}.
$$

For a $2\times2$ covariance matrix,

$$
\boxed{|\mathbf{S}|=s_{11}s_{22}-s_{12}^2}.
$$

### Total sample variance

$$
\boxed{\text{Total sample variance}=\operatorname{tr}(\mathbf{S})
=\sum_{j=1}^p s_{jj}}.
$$

### Correlation determinant and generalized variance identity

If every sample variance $s_{jj}$ is positive,

$$
\boxed{\mathbf{R}=\mathbf{D}_s^{-1}\mathbf{S}\mathbf{D}_s^{-1}},
$$

where $\mathbf{D}_s=\operatorname{diag}(s_1,\ldots,s_p)$ is the diagonal matrix of sample standard deviations. Therefore,

$$
\boxed{|\mathbf{S}|=\left(\prod_{j=1}^p s_{jj}\right)|\mathbf{R}|}.
$$

### Singularity and linear dependence

If one data column is an **exact linear combination** of other columns, then the covariance matrix is singular:

$$
\boxed{\text{exact linear dependence}\ \Rightarrow\ |\mathbf{S}|=0}.
$$

However, a zero generalized variance can also arise simply because the centered data matrix has insufficient rank, for example if $n\leq p$. Keep in mind that "determinant zero" refers to a missing independent direction, not necessarily zero variation in each variable.

## 6.3 Which R function should you use?

| Task | Base-R command | What to supply |
|---|---|---|
| Create data matrix from printed rows | `matrix(c(...), nrow = ..., byrow = TRUE)` | Exact observations from the worksheet |
| Find column means | `colMeans(X)` | Raw data matrix |
| Extract one column | `X[, j]` | Matrix $X$, variable number $j$ |
| Center the variables | `sweep(X, 2, colMeans(X), "-")` | Raw data matrix |
| Standardize the variables | `scale(X)` | Raw data matrix |
| Find the covariance matrix | `cov(X)` | Raw data matrix |
| Find the correlation matrix | `cor(X)` | Raw data matrix |
| Convert covariance to correlation | `cov2cor(S)` | Already-calculated covariance matrix |
| Transpose a matrix | `t(X)` | Matrix or vector |
| Multiply two matrices | `A %*% B` | Dimension-compatible arrays |
| Square a vector elementwise | `d^2` | Numeric vector |
| Calculate a vector length | `sqrt(sum(d^2))` | Numeric vector |
| Calculate a dot product | `sum(a * b)` | Two equally long numeric vectors |
| Find cosine of a centered-vector angle | `sum(a*b)/sqrt(sum(a^2)*sum(b^2))` | Two nonzero centered vectors |
| Convert inverse cosine to degrees | `acos(value) * 180 / pi` | Cosine between $-1$ and 1 |
| Find determinant | `det(S)` | Square matrix |
| Find diagonal entries | `diag(S)` | Square matrix |
| Sum diagonal entries (trace) | `sum(diag(S))` | Covariance or other square matrix |
| Multiply diagonal variances | `prod(diag(S))` | Covariance matrix |
| Find numerical rank | `qr(X)$rank` | Matrix |
| Compare floating-point results | `all.equal(a, b)` | Two values or matrices |

## 6.4 A final conceptual comparison

| Question to ask | Appropriate concept | Typical clue in an exam question |
|---|---|---|
| "Where is the average observation?" | Mean vector | $\bar{\mathbf{x}}$, centroid |
| "How far is each value from its own mean?" | Deviation vector | $\mathbf{d}_j$ |
| "How much does one variable vary?" | Sample variance | $s_{jj}$, squared centered-vector length |
| "Do the two variables rise or fall together?" | Covariance | $s_{jk}$, dot product |
| "How strong is their linear association regardless of units?" | Correlation | $r_{jk}$, cosine of angle |
| "How much joint variation is present?" | Generalized sample variance | $|\mathbf{S}|$, determinant |
| "How much variation do all variables have in total along their axes?" | Total sample variance | $\operatorname{tr}(\mathbf{S})$ |
| "What remains after standardizing the variable units?" | Correlation matrix | $\mathbf{R}$, standardized data |
| "Does a variable give a genuinely new dimension?" | Linear independence and rank | A column equals a combination of others |
| "Why is the generalized variance zero?" | Singularity | Exact linear dependence or insufficient sample rank |

## 6.5 Self-assessment checklist

Before moving on from this worksheet, try to answer **yes** to each of these without looking at the solution:

- [ ] I can distinguish $n$ (number of observations) from $p$ (number of variables).
- [ ] I can explain the difference between variable space and observation space.
- [ ] I can construct a data matrix without accidentally swapping its rows and columns.
- [ ] I can plot the rows of a $3\times2$ data matrix as three points in two dimensions.
- [ ] I can interpret a column of the same matrix as one three-dimensional vector.
- [ ] I can calculate sample means and explain why deviations sum to zero.
- [ ] I can calculate centered vectors by subtracting the correct mean from each entry.
- [ ] I can compute a vector length using the square-root-of-squares rule.
- [ ] I can calculate a dot product by multiplying corresponding entries and adding.
- [ ] I can obtain sample variance and covariance from deviation-vector lengths and dot products.
- [ ] I can compute the cosine of the angle between centered vectors and explain its relationship to correlation.
- [ ] I can distinguish the covariance matrix $\mathbf{S}$ from the correlation matrix $\mathbf{R}$.
- [ ] I can compute a $2\times2$ determinant and a $3\times3$ determinant by hand.
- [ ] I can distinguish generalized variance (determinant) from total variance (trace).
- [ ] I can standardize raw data and explain why the covariance matrix of standardized data is the correlation matrix.
- [ ] I can verify $|\mathbf{S}|=(\prod_j s_{jj})|\mathbf{R}|$ in two- and three-variable examples.
- [ ] I can recognize an exact linear relationship such as $X_3=X_1+X_2$.
- [ ] I can explain why a covariance matrix may have zero determinant even while its individual variables have positive variance.
- [ ] I can use `matrix()`, `colMeans()`, `cov()`, `cor()`, `det()`, `diag()` and `cov2cor()` in R.
- [ ] I can check R results against hand calculations instead of blindly trusting the displayed output.

## 6.6 Source integrity and boundaries

This file expands **only `PQ2Ans.pdf`**, *Practice Worksheet 2: Sample Geometry and Random Sampling*, pages 1-3. It reproduces the questions and uses precisely the numbers and matrices supplied there. The source's printed numerical answers are correct: in Question 1, the centered vectors, lengths, cosine, covariance and correlation matrices agree; in Question 2, the covariance determinant is 12 and the determinant identity holds; in Question 4, the covariance determinant is 14 and the supplied correlation determinant approximation is consistent with the exact value $7/18$.

The following were **not fully worked in the source PDF** and are independently supplied here: Question 1(a)'s plotting instructions, Question 1(b)'s 3D construction instructions, Question 2(c)'s total variance $17$, and **all of Question 3's arithmetic**. The source supplies no raw observations for Question 4, so no raw observations have been invented. Additional examples, conceptual checks, geometry explanations, R scripts and exercises are marked as supplementary teaching material, not misrepresented as lecturer-provided solutions.

**This is the end of the Practice Worksheet 2 teaching guide. No other worksheet has been processed in this document.**
