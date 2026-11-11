# DA2451 Multivariate Methods in Business
# Practice Worksheet 01: Complete Beginner-Friendly Teaching Guide

**Topic:** Introduction to Multivariate Analysis  
**Source:** `PQ1Ans.pdf`, *DA2451 - Multivariate Methods in Business, Semester 4, 2024, Practice Worksheet - 1* (4 pages).  
**Scope:** All five original questions, including all parts (a)–(d) where present.  
**How to use:** Read the foundations first, work through the arithmetic by hand, then reproduce it in R. All figures requested by the worksheet can be drawn using the supplied R commands.
**Original worksheet instruction:** “Try to do your calculations by hand with a calculator (H) and also use R (R).”

> **Source versus new explanations.** The original PDF supplies numerical workings for **Question 1** and **Question 3**. Their source-provided results are preserved, with one numerical-substitution issue in Question 1 explained explicitly. The original PDF provides **questions but no numerical answers for Questions 2, 4 and 5**. Numerical results for those three questions below have been independently calculated from the data actually printed in the PDF. Extra examples, interpretations, proofs, and R code are **supplementary teaching material**, not quotations from the lecturer. No external observations were used.

## Table of contents

1. [Foundations: starting from zero](#foundations-starting-from-zero)
2. [Question 1: bookstore receipts](#question-1-h-bookstore-receipts)
3. [Question 2: age and price of used cars](#question-2-rh-age-and-price-of-used-cars)
4. [Question 3: Euclidean and statistical distance](#question-3-h-euclidean-and-statistical-distance)
5. [Question 4: eight two-variable observations](#question-4-r-eight-two-variable-observations)
6. [Question 5: five three-variable observations](#question-5-r-five-three-variable-observations)
7. [Common misconceptions and the bigger picture](#common-misconceptions-and-the-bigger-picture)
8. [One-piece R verification script](#one-piece-r-verification-script)
9. [Self-check exercises and final answer checklist](#self-check-exercises-and-final-answer-checklist)



# Foundations: starting from zero

## 1. What does *multivariate* mean?

Suppose a bookstore has four sales receipts. Each receipt tells us two things: how many dollars the customer spent and how many books the customer bought. If we examine **only dollars**, we are doing *univariate* analysis, because we study one variable. If we examine **dollars and books together**, we are working with *multivariate* data, because every receipt contains multiple measurements that belong to the same transaction.

A **variable** is a characteristic that we measure. An **observation** is one object, person, transaction, car, or other case for which we record the variables. A **dataset** is a collection of observations.

| Word | Everyday meaning | Bookstore illustration |
|---|---|---|
| Observation or case | One item we examine | One receipt |
| Variable | A feature measured for each case | Dollar amount or book count |
| $n$ | Number of observations | $n=4$ receipts |
| $p$ | Number of variables | $p=2$ variables |
| $x_{ij}$ | Value in row $i$, column $j$ | $x_{21}=52$: second receipt, first variable |
| Data matrix $X$ | Rectangular arrangement of measurements | Four rows, two columns |
| Mean | Center or average | Average receipt amount |
| Variance | Spread of one variable | How much dollar sales fluctuate |
| Covariance | Whether two variables move together | Whether larger sales involve more books |
| Correlation | Standardized direction and strength of a linear relationship | Strength of the books-versus-dollars pattern |
| Distance | Separation between two observations | How different two receipts or cars are |

**Important:** The same symbols $X_1$ and $X_2$ are reused in different questions. Their meanings change with the dataset. In Question 1, $X_1$ means total dollar sales. In Question 2, $X_1$ means car age. Never assume that a variable keeps the same meaning from one question to another.

## 2. How should a data matrix be arranged?

For this worksheet, the standard arrangement is:

- **Rows:** observations (receipts, cars, measured cases).
- **Columns:** variables (sales, number of books; or age, price).

For example, two people measured on height and weight would be organized as

$$
X=\begin{bmatrix}
170&65\\
180&80
\end{bmatrix}.
$$

This matrix contains $n=2$ observations and $p=2$ variables. Its *dimensions* are $2\times2$, spoken as “two by two.” The first row is the first person's measurements. The second column contains the weights of both people. Brackets group numbers into one mathematical object. They do not mean that we should add the numbers.

A **vector** is a one-dimensional ordered collection of numbers. One person's measurements, written as a column, form a vector:

$$\mathbf{x}_1=\begin{bmatrix}170\\65\end{bmatrix}.$$

The boldface is often used to distinguish a vector from a single number. The little prime symbol $'$ means **transpose**: turn a column into a row, or a row into a column. For example,

$$\begin{bmatrix}170\\65\end{bmatrix}'=\begin{bmatrix}170&65\end{bmatrix}.$$

Throughout this guide, $\bar{\mathbf{x}}$ means the **sample mean vector**. The source PDF writes this as a barred $x$ or as a column array. These are the same idea.

## 3. The sample mean: the balance point of the data

The **mean** is the arithmetic average: add the measurements and divide by how many measurements there are. For one variable with $n$ observations,

$$\boxed{\bar{x}=\frac{x_1+x_2+\cdots+x_n}{n}=\frac1n\sum_{i=1}^{n}x_i.}$$

Here:

- $\bar{x}$ means “x-bar,” the sample average.
- $\sum$ is the Greek capital sigma, meaning “add everything that follows.”
- $i$ labels the observations; $n$ is the number of observations.

For $2$, $4$, and $6$, the mean is $(2+4+6)/3=4$. This does **not** mean every observation equals $4$. It tells us the center around which the observations are distributed.

With several variables, calculate one mean **per column** and stack those means:

$$
\bar{\mathbf{x}}=
\begin{bmatrix}\bar{x}_1\\\bar{x}_2\\\vdots\\\bar{x}_p\end{bmatrix}.
$$

The mean vector is the multidimensional center of the observations. It is *not* an average of all values in the entire rectangular table: dollars, counts, years, and prices should not all be mixed into one scalar average.

## 4. Deviations: how far from the average?

A **deviation** is a value minus its mean:

$$d_i=x_i-\bar{x}.$$

For $2,4,6$ with mean $4$, the deviations are $-2,0,+2$. A negative deviation means “below average,” not “an incorrect observation.” A positive deviation means “above average.”

A crucial property is that deviations from the sample mean always sum to zero:

$$\sum_{i=1}^{n}(x_i-\bar{x})=0.$$

That happens because $n\bar{x}=\sum_i x_i$. This is a valuable arithmetic check: if your deviation column does not sum to approximately zero, recheck the mean or subtraction.

## 5. Variance and standard deviation: measuring spread

Two datasets can have the same mean but very different spreads. Compare the scores $(49,50,51)$ with $(10,50,90)$. Both average to $50$, but the second dataset is far less consistent. To measure spread, square each deviation, add the squares, and divide by $n-1$:

$$\boxed{s^2=\frac{\sum_{i=1}^{n}(x_i-\bar{x})^2}{n-1}.}$$

The numerator is the **sum of squared deviations**. The denominator $n-1$ is called the **degrees of freedom**. After we calculate the sample mean using the same observations, only $n-1$ deviations can vary freely: the final deviation must make their total zero. Using $n-1$ also gives an unbiased estimate of population variance under ordinary random-sampling assumptions.

Why do we square the deviations? Without squaring, negative and positive deviations would cancel. Squaring makes every contribution nonnegative and gives larger discrepancies more weight.

**Variance has squared units.** If measurements are in dollars, variance has units of dollars squared. That is mathematically useful but awkward to interpret. The **sample standard deviation** returns to the original units:

$$\boxed{s=\sqrt{s^2}.}$$

For instance, a variance of $9$ years squared corresponds to a standard deviation of $3$ years. Variance is never negative. A zero variance means every observed value is identical.

## 6. Covariance: do two variables change together?

Consider two quantities observed on the *same* people or cases. For each case, ask whether both quantities are above their averages, both below their averages, or moving in opposite directions. Multiply the two deviations for each case and add them:

$$\boxed{s_{12}=\frac{\sum_{i=1}^{n}(x_{i1}-\bar{x}_1)(x_{i2}-\bar{x}_2)}{n-1}.}$$

The subscript **12** means the relationship between variable 1 and variable 2. Multiplication explains the sign:

| First deviation | Second deviation | Product | Meaning |
|---|---|---|---|
| Positive | Positive | Positive | Both above their averages |
| Negative | Negative | Positive | Both below their averages |
| Positive | Negative | Negative | First above, second below |
| Negative | Positive | Negative | First below, second above |
| Zero | Anything | Zero | This case contributes no covariance product |

When positive products dominate, covariance is positive. When negative products dominate, covariance is negative. Covariance near zero suggests little *linear* co-movement, but does not rule out a curved relationship.

Covariance units are **the product of the two original units**. For sales dollars and book counts, those units are “dollar-books.” Its numerical magnitude therefore depends on the scales we use. We should not call a covariance “strong” merely because its absolute number is large.

The same covariance arises if we reverse the variables: $s_{21}=s_{12}$.

## 7. Correlation: the scale-free version of covariance

To compare linear relationships measured in different units, divide covariance by the two standard deviations:

$$\boxed{r_{12}=\frac{s_{12}}{s_1s_2}=\frac{s_{12}}{\sqrt{s_{11}}\sqrt{s_{22}}}.}$$

Here $s_{11}$ is the variance of variable 1, and $s_{22}$ is the variance of variable 2. Their square roots are the standard deviations. The number $r_{12}$ always lies between $-1$ and $1$, provided both variables have nonzero variance.

- $r$ near $+1$: a strong **positive linear** pattern.
- $r$ near $-1$: a strong **negative linear** pattern.
- $r$ near $0$: a weak or absent **linear** pattern.

Imagine a scatter plot with the first variable on the horizontal axis and the second on the vertical axis. A tight upward-sloping cloud has positive correlation; a tight downward-sloping cloud has negative correlation. A shapeless cloud usually has correlation close to zero.

**Correlation is not causation.** A strong age–price relationship does not, by itself, prove that every dollar of the price difference is caused solely by age. Mileage, condition, model year, and seller behavior can matter too. Likewise, four bookstore receipts cannot establish a universal consumer behavior law.

## 8. Three objects you must be able to construct

For $p$ variables, multivariate analysis often begins by displaying:

**Sample mean vector** (one average per variable):

$$\bar{\mathbf{x}}=\begin{bmatrix}\bar{x}_1\\\bar{x}_2\\\vdots\\\bar{x}_p\end{bmatrix}.$$

**Sample variance–covariance matrix** (variances on the diagonal, covariances off the diagonal):

$$
S=\begin{bmatrix}
s_{11}&s_{12}&\cdots&s_{1p}\\
s_{21}&s_{22}&\cdots&s_{2p}\\
\vdots&\vdots&\ddots&\vdots\\
s_{p1}&s_{p2}&\cdots&s_{pp}
\end{bmatrix}.
$$

**Sample correlation matrix** (ones on the diagonal, pairwise correlations off the diagonal):

$$
R=\begin{bmatrix}
1&r_{12}&\cdots&r_{1p}\\
r_{21}&1&\cdots&r_{2p}\\
\vdots&\vdots&\ddots&\vdots\\
r_{p1}&r_{p2}&\cdots&1
\end{bmatrix}.
$$

Both $S$ and $R$ are **symmetric**: exchanging rows and columns leaves the matrix unchanged. In two variables, $S$ is a $2\times2$ matrix and $R$ is also $2\times2$.

A compact way to calculate the covariance matrix from an $n\times p$ data matrix is to form the centered matrix $D$ (subtract the appropriate column mean from every row), then use

$$\boxed{S=\frac{D'D}{n-1}.}$$

The matrix product $D'D$ adds every pair of deviation products and places their sums in the correct cells. Do not worry if this compact formula looks unfamiliar now: Question 5 builds it by hand.

## 9. Euclidean distance: ordinary straight-line separation

For two points $P=(x_1,\ldots,x_p)$ and $Q=(y_1,\ldots,y_p)$, Euclidean distance is

$$\boxed{d_E(P,Q)=\sqrt{\sum_{j=1}^{p}(x_j-y_j)^2}.}$$

In two dimensions this is the Pythagorean theorem:

$$d_E(P,Q)=\sqrt{(x_1-y_1)^2+(x_2-y_2)^2}.$$

If one point is $(1,1)$ and another is $(4,5)$, the horizontal difference is $3$, the vertical difference is $4$, and the straight-line distance is $\sqrt{3^2+4^2}=5$.

Always **subtract matching coordinates**, square the differences, add them, and take the square root. Euclidean distance treats all numerical coordinate changes according to their raw measurement scales. This matters when one variable is measured in years and another in thousands of dollars: the choice of units can influence the result.

## 10. Mahalanobis distance: distance relative to a data cloud

A point five units from a mean may be extremely unusual for a variable whose standard deviation is $0.1$, but ordinary for a variable whose standard deviation is $100$. Euclidean distance does not distinguish these situations. **Mahalanobis distance** does.

For a measured vector $\mathbf{x}$, mean vector $\bar{\mathbf{x}}$, and sample covariance matrix $S$,

$$\boxed{D_M(\mathbf{x},\bar{\mathbf{x}})=\sqrt{(\mathbf{x}-\bar{\mathbf{x}})'S^{-1}(\mathbf{x}-\bar{\mathbf{x}})}.}$$

For two measured vectors $\mathbf{x}$ and $\mathbf{y}$, using the same reference covariance matrix $S$,

$$\boxed{D_M(\mathbf{x},\mathbf{y})=\sqrt{(\mathbf{x}-\mathbf{y})'S^{-1}(\mathbf{x}-\mathbf{y})}.}$$

What the symbols mean:

1. $\mathbf{x}-\bar{\mathbf{x}}$ is the vector of differences from the average.
2. $'$ turns a column vector into a row vector.
3. $S$ describes both how much the variables vary and how they covary.
4. $S^{-1}$ is the **inverse** of that covariance matrix, which adjusts distances for the data's spread and relationships.
5. Multiplication in the order shown produces a single, nonnegative number.
6. The square root gives the Mahalanobis distance; the expression *without* the square root is the **squared Mahalanobis distance**.

**Intuition:** Imagine a cloud of points shaped like a long, thin ellipse. Moving along the long direction is common. Moving the same raw distance across the thin direction is less common. Mahalanobis distance recognizes this, whereas ordinary Euclidean distance does not.

For an invertible $2\times2$ covariance matrix,

$$
S=\begin{bmatrix}a&b\\b&c\end{bmatrix},
\qquad
S^{-1}=\frac{1}{ac-b^2}\begin{bmatrix}c&-b\\-b&a\end{bmatrix}.
$$

The quantity $ac-b^2$ is called the **determinant**. It must not be zero if we are to calculate the ordinary inverse. For example, with $S=\begin{bmatrix}4&0\\0&9\end{bmatrix}$, the inverse is $\begin{bmatrix}1/4&0\\0&1/9\end{bmatrix}$; squared Mahalanobis distance becomes $(\Delta x_1)^2/4+(\Delta x_2)^2/9$. A two-unit change in the first coordinate is one standard-deviation unit, as is a three-unit change in the second.

**Important R detail:** Base R's `mahalanobis()` returns **squared** Mahalanobis distances. Apply `sqrt()` if the worksheet asks for distance rather than squared distance.

## 11. Quick start for R, without prior programming experience

R is free statistical software. You can type these commands in the R Console (or in RStudio, which provides a convenient interface for R). A **function** is a named calculation, like `mean()` for an average. The expression `c(1,2,3)` creates a vector of three numbers. The symbol `<-` means “store the result on the right in the named object on the left.” The name can be used in later commands.

Try this first:

```r
numbers <- c(2, 4, 6)
mean(numbers)
var(numbers)
sd(numbers)
```

Explanation, one line at a time:

1. `numbers <- c(2, 4, 6)` creates and stores the three observations.
2. `mean(numbers)` calculates their average: $4$.
3. `var(numbers)` calculates the **sample** variance using $n-1$: $4$.
4. `sd(numbers)` calculates the sample standard deviation, $\sqrt{4}=2$.

For paired measurements, put each variable in a vector and join them with `cbind()` (**column bind**):

```r
first  <- c(1, 2, 3)
second <- c(2, 4, 7)
X <- cbind(first, second)
X
colMeans(X)
cov(X)
cor(X)
```

The output of `X` contains three rows and two columns. `colMeans(X)` averages each column; `cov(X)` forms the sample covariance matrix; `cor(X)` forms the correlation matrix. R prints more decimal places if you request them with `print(..., digits = 10)`. The calculations in this document preserve adequate precision internally and round only for display.



# Question 1 (H): bookstore receipts

**Source:** `PQ1Ans.pdf`, pages 1–2. **(H)** means intended for hand calculation. This is one of the two questions with lecturer-provided calculations.

## Original question (faithfully transcribed)

> A selection of four receipts from a university bookstore was obtained in order to investigate the nature of book sales. Each receipt provided, among other things, the number of books sold and the total amount of each sale. Let the first variable, $X_1$, be total dollar sales and the second variable, $X_2$, be number of books sold. Then we can regard the corresponding numbers on the receipts as four measurements on two variables. Suppose the data, in tabular form, are
>
> | $X_1$ | 42 | 52 | 48 | 58 |
> |---|---:|---:|---:|---:|
> | $X_2$ | 4 | 5 | 4 | 3 |
>
> **(a)** Represent the above data in a matrix $X$ consisting of all four observations on the two variables which is suitable for multivariate analysis.
>
> **(b)** Compute the sample means $\bar{x}_1$ and $\bar{x}_2$ and the sample variances $s_{11}$ and $s_{22}$. Compute the sample covariance $s_{12}$ and the sample correlation coefficient $r_{12}$. Interpret $r_{12}$.
>
> **(c)** Display the sample mean array $\bar{\mathbf{x}}$, the sample variance-covariance matrix $S$, and the sample correlation matrix $R$.

## Before the solution: what the question really wants

The question is asking three connected things: arrange the four purchases so that each receipt stays intact; describe typical sales and book counts and the relationship between them; then organize those answers into the standard vector and matrices used in multivariate statistics.

This is a **small, illustrative sample**, not evidence about every possible bookstore transaction. The calculations are exact for these four receipts, but we should not claim that every customer who buys more books spends less money.

## Part (a): construct the data matrix

**Why this arrangement?** Every receipt must form one complete observation. The first receipt has sales of $42 and a book count of $4$, so its row is $(42,4)$. The next receipt is $(52,5)$, and so on. Placing all four observations in rows gives

$$
\boxed{
X=\begin{bmatrix}
42&4\\
52&5\\
48&4\\
58&3
\end{bmatrix}.
}
$$

This is the **source-provided answer**. It is a $4\times2$ matrix: four rows (observations) and two columns (variables). It would be incorrect to put all dollar amounts in the first row and all book counts in the second row if a later statistical procedure expects observations in rows.

| Receipt $i$ | Sales $x_{i1}$, dollars | Books $x_{i2}$ |
|---:|---:|---:|
| 1 | 42 | 4 |
| 2 | 52 | 5 |
| 3 | 48 | 4 |
| 4 | 58 | 3 |

The subscripts identify *location*, not multiplication: $x_{31}=48$ means row 3, column 1.

## Part (b): compute means, variances, covariance, and correlation

### Step 1: mean sales

$$
\bar{x}_1=\frac{42+52+48+58}{4}=\frac{200}{4}=\boxed{50\text{ dollars}}.
$$

The four sampled receipts average $50 each. Two receipts are above $50 and two are below $50.

### Step 2: mean number of books

$$
\bar{x}_2=\frac{4+5+4+3}{4}=\frac{16}{4}=\boxed{4\text{ books}}.
$$

On average, each recorded transaction includes four books.

### Step 3: make a deviation and product table

This is the most efficient way to avoid mistakes. The fourth and fifth columns subtract the means. The last three columns generate exactly the values we will need for the variances and covariance.

| $i$ | $x_{i1}$ | $x_{i2}$ | $d_{i1}=x_{i1}-50$ | $d_{i2}=x_{i2}-4$ | $d_{i1}^2$ | $d_{i2}^2$ | $d_{i1}d_{i2}$ |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 42 | 4 | -8 | 0 | 64 | 0 | 0 |
| 2 | 52 | 5 | 2 | 1 | 4 | 1 | 2 |
| 3 | 48 | 4 | -2 | 0 | 4 | 0 | 0 |
| 4 | 58 | 3 | 8 | -1 | 64 | 1 | -8 |
| **Total** | **200** | **16** | **0** | **0** | **136** | **2** | **-6** |

The zero deviation totals verify the two means. Notice why the covariance will be negative: one especially large sale, $58$, occurs with just three books, contributing $(8)(-1)=-8$ to the sum of products. The second transaction contributes $+2$. Overall the product sum is $-6$.

### Step 4: sample variance of sales, $s_{11}$

Sample variance uses the sum of squared sales deviations, $136$, and the sample denominator $n-1=4-1=3$:

$$
\begin{aligned}
s_{11}&=\frac{1}{4-1}\sum_{i=1}^{4}(x_{i1}-\bar{x}_1)^2\\
&=\frac{(-8)^2+2^2+(-2)^2+8^2}{3}\\
&=\frac{64+4+4+64}{3}\\
&=\frac{136}{3}\\
&=\boxed{45.333333\ldots\text{ dollars}^2}.
\end{aligned}
$$

If you want the ordinary-unit standard deviation, compute

$$s_1=\sqrt{136/3}\approx\boxed{6.7330\text{ dollars}}.$$

The standard deviation is a useful scale of typical variation; it is not the exact distance of every receipt from $50$.

### Step 5: sample variance of book count, $s_{22}$

$$
\begin{aligned}
s_{22}&=\frac{1}{4-1}\sum_{i=1}^{4}(x_{i2}-\bar{x}_2)^2\\
&=\frac{0^2+1^2+0^2+(-1)^2}{3}\\
&=\frac{0+1+0+1}{3}\\
&=\frac23\\
&=\boxed{0.666666\ldots\text{ books}^2}.
\end{aligned}
$$

The associated standard deviation is

$$s_2=\sqrt{2/3}\approx\boxed{0.8165\text{ books}}.$$

### Step 6: sample covariance, $s_{12}$

The covariance multiplies the *two deviations belonging to each same receipt*. Never pair the first receipt's sales deviation with some other receipt's book-count deviation.

$$
\begin{aligned}
s_{12}&=\frac{1}{4-1}\sum_{i=1}^{4}(x_{i1}-\bar{x}_1)(x_{i2}-\bar{x}_2)\\
&=\frac{(-8)(0)+(2)(1)+(-2)(0)+(8)(-1)}{3}\\
&=\frac{0+2+0-8}{3}\\
&=\frac{-6}{3}\\
&=\boxed{-2}.
\end{aligned}
$$

Since covariance is symmetric, $s_{21}=s_{12}=-2$. Negative covariance means higher-than-average sales tend, within these particular receipts, to accompany lower-than-average book counts, and conversely. Do **not** interpret the raw magnitude $-2$ as a correlation coefficient.

### Step 7: sample correlation, $r_{12}$

$$
\begin{aligned}
r_{12}&=\frac{s_{12}}{\sqrt{s_{11}}\sqrt{s_{22}}}\\
&=\frac{-2}{\sqrt{136/3}\sqrt{2/3}}\\
&=\frac{-2}{\sqrt{272/9}}\\
&=\frac{-6}{\sqrt{272}}\\
&\approx\boxed{-0.3638034}.
\end{aligned}
$$

Rounded to four decimal places, **$r_{12}=-0.3638$**. This is the **same final coefficient as in the lecturer's source**.

**Important source-calculation clarification (page 2):** The source prints the substitution $-1.5/(\sqrt{34}\sqrt{0.5})$ immediately after defining sample covariance $-2$ and sample variances $45.3333$ and $0.6667$. Those substituted numbers come from dividing the deviation-product sum $-6$ and squared-deviation sums $136$ and $2$ by **$n=4$** rather than **$n-1=3$**:

$$\frac{-6}{4}=-1.5,\quad \frac{136}{4}=34,\quad\frac24=0.5.$$

That is **not the correct substitution of the displayed sample covariance and sample variances**. Nevertheless, the same common denominator cancels in a correlation calculation, so the source's final $-0.3638$ remains correct. For consistency with the explicitly requested *sample* values, use $-2$, $136/3$, and $2/3$ when substituting into the correlation formula.

### Step 8: interpret the coefficient carefully

The negative sign describes the direction of the observed linear pattern: receipts with a higher total sale amount tended to have fewer books. The absolute value, $0.3638$, is not close to $1$, so the linear relationship in this tiny dataset is **weak to modest, negative**. The source describes it as a **weak negative correlation**; that is a reasonable classroom description.

It **does not** mean “a $1 increase causes 0.3638 fewer books” because correlation is unitless and is **not** a regression slope. Nor does it mean “36.38% of sales are explained by the number of books.” A correlation of $-0.3638$ only measures the strength and direction of the *sample linear association*.

## Part (c): display the three summary objects

Using all the answers from Part (b):

$$
\boxed{
\bar{\mathbf{x}}=\begin{bmatrix}50\\4\end{bmatrix},\qquad
S=\begin{bmatrix}
45.333333&-2\\
-2&0.666667
\end{bmatrix},\qquad
R=\begin{bmatrix}
1&-0.363803\\
-0.363803&1
\end{bmatrix}.
}
$$

These are the **source-provided final matrices**, with extra digits of precision shown.

Why are the two $-2$ entries repeated? The covariance between dollars and books is the same whichever ordering you choose. Why are there two ones in the correlation matrix? Each variable has perfect correlation with itself: $r_{11}=r_{22}=1$ (provided its variance is positive). Why does the mean vector have two entries? Because there are two variables.

**Optional R verification**, supplementary to the original hand-calculation task:

```r
sales <- c(42, 52, 48, 58)
books <- c(4, 5, 4, 3)
X1 <- cbind(sales, books)
X1
colMeans(X1)
cov(X1)
cor(X1)
```

Line 1 stores total dollar sales; line 2 stores book counts; line 3 binds them into a four-row matrix; line 4 displays the matrix; the last three lines report the mean vector, covariance matrix, and correlation matrix. R's `cov()` uses $n-1$, so it agrees with the sample calculations above.

### Question 1: mistakes to avoid

- Do not reverse rows and columns when creating the analysis matrix.
- Do not divide sample variance or sample covariance by $n=4$; use $n-1=3$.
- Do not square the covariance terms; multiply paired deviations without squaring either one separately.
- Do not treat the coefficient $-0.3638$ as a percentage, a slope, or a causal effect.
- Do not round the intermediate $0.666666\ldots$ too early; round at the end.



# Question 2 (R/H): age and price of used cars

**Source:** `PQ1Ans.pdf`, page 2. **(R/H)** means use R and/or hand calculation. **No worked numerical answer is supplied in the original PDF for this question.** All results below are independently computed from the ten displayed pairs.

## Original question (faithfully transcribed)

> A morning newspaper lists the following used-car prices for a foreign compact with age $X_1$ measured in years and selling price $X_2$ measured in thousands of dollars.
>
> | $X_1$ | 1 | 2 | 3 | 3 | 4 | 5 | 6 | 8 | 9 | 11 |
> |---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
> | $X_2$ | 18.95 | 19.00 | 17.95 | 15.54 | 14.00 | 12.95 | 8.94 | 7.49 | 6.00 | 3.99 |
>
> **(a)** Construct a scatter plot of the data and marginal dot plots, i.e., the dot plots for each variable $X_1$ and $X_2$, separately.
>
> **(b)** Infer the sign of the sample covariance $s_{12}$ from the scatter plot.
>
> **(c)** Compute the sample means $\bar{x}_1$ and $\bar{x}_2$ and the sample variances $s_{11}$ and $s_{22}$. Compute the sample covariance $s_{12}$ and the sample correlation coefficient $r_{12}$. Interpret $r_{12}$.
>
> **(d)** Display the sample mean array $\bar{\mathbf{x}}$, the sample variance-covariance matrix $S$, and the sample correlation matrix $R$.

## First, understand the setting

Now every row represents a **car for sale**, not a bookstore receipt. Variable $X_1$ is its age in **years**. Variable $X_2$ is its listed selling price in **thousands of dollars**. So a displayed price of $18.95$ means **$18,950**, not $18.95. The data include **two different cars aged 3 years**, which have different listed prices. This is normal: equal ages do not guarantee equal prices.

What is the business question? Do older used cars tend to be cheaper? If so, how strong is the relationship and how much do ages and asking prices vary?

## Part (a): scatter plot and two marginal dot plots

### What is a scatter plot?

A scatter plot uses one point for each **paired observation**. For the first car, draw $(1,18.95)$: move one year along the horizontal age axis, then go up to $18.95$ thousand dollars on the vertical price axis. Repeat for every car. The ten points are:

| Car | Age in years ($X_1$) | Price in $1,000 ($X_2$) | Point plotted |
|---:|---:|---:|---|
| 1 | 1 | 18.95 | $(1,18.95)$ |
| 2 | 2 | 19.00 | $(2,19.00)$ |
| 3 | 3 | 17.95 | $(3,17.95)$ |
| 4 | 3 | 15.54 | $(3,15.54)$ |
| 5 | 4 | 14.00 | $(4,14.00)$ |
| 6 | 5 | 12.95 | $(5,12.95)$ |
| 7 | 6 | 8.94 | $(6,8.94)$ |
| 8 | 8 | 7.49 | $(8,7.49)$ |
| 9 | 9 | 6.00 | $(9,6.00)$ |
| 10 | 11 | 3.99 | $(11,3.99)$ |

The general pattern slopes sharply **downward from left to right**. Smaller ages cluster near higher asking prices; larger ages near lower asking prices.

### What is a marginal dot plot?

A marginal dot plot looks at **one variable at a time**. The age dot plot displays the ten ages while ignoring prices. Because age $3$ occurs twice, it should display two dots at $3$ (stacked or displaced). The price dot plot displays the ten prices while ignoring ages. They are called *marginal* because they show the distribution of a single variable rather than the joint pair.

A scatter plot answers “how are age and price related?” An age dot plot answers “what ages are represented?” A price dot plot answers “what prices are represented?” These are different questions, and all three plots are requested.

### R code to create all three requested plots

```r
age <- c(1, 2, 3, 3, 4, 5, 6, 8, 9, 11)
price <- c(18.95, 19.00, 17.95, 15.54, 14.00,
           12.95, 8.94, 7.49, 6.00, 3.99)

par(mfrow = c(1, 3))
plot(age, price,
     main = "Car age versus selling price",
     xlab = "Age (years)", ylab = "Price (thousand dollars)",
     pch = 19)
stripchart(age, method = "stack", pch = 19,
           main = "Age dot plot", xlab = "Age (years)")
stripchart(price, method = "stack", pch = 19,
           main = "Price dot plot", xlab = "Price (thousand dollars)")
par(mfrow = c(1, 1))
```

**Understanding every stage:**

1. `age <- c(...)` stores the ten ages. The order matters because it aligns with the prices.
2. `price <- c(...)` stores ten prices in precisely the matching order; its line wraps for readability but still creates one vector.
3. `par(mfrow = c(1, 3))` divides the plotting window into one row of three graph panels. It does not change the data.
4. `plot(age, price, ...)` draws a point for each paired age and price. `main` sets the title; `xlab` and `ylab` label axes; `pch = 19` selects solid dots.
5. The first `stripchart()` draws a one-variable dot plot of ages. `method = "stack"` stacks repeated age values so both three-year-old cars remain visible.
6. The second `stripchart()` draws the price dot plot.
7. `par(mfrow = c(1, 1))` resets the graphics window to a single panel for later work.

If a graphics panel is too narrow, make the RStudio Plot pane wider or run the plotting commands one at a time.

## Part (b): predict the sign of the covariance before calculating

**Answer: $s_{12}$ should be negative.** We can infer this from the downward scatter plot without calculating anything. For young cars, age deviations from average tend to be negative while price deviations tend to be positive; negative times positive gives a negative product. For old cars, age deviations tend to be positive and price deviations tend to be negative; positive times negative is also negative. Adding many negative products produces a negative covariance.

This is an important examination technique: **predict the direction first**. Then your covariance calculation should agree with the visual pattern. A computed positive covariance would be a signal to check whether the data were mismatched or the arithmetic was incorrect.

## Part (c): complete numerical calculations

### Step 1: averages

Ten cars means $n=10$ and the sample denominator for variance/covariance is $n-1=9$.

Add all ages:

$$\sum_{i=1}^{10}x_{i1}=1+2+3+3+4+5+6+8+9+11=52.$$

Therefore,

$$\boxed{\bar{x}_1=52/10=5.2\text{ years}}.$$

Add all prices, still in thousands of dollars:

$$\begin{aligned}
\sum_{i=1}^{10}x_{i2}&=18.95+19.00+17.95+15.54+14.00\\
&\quad+12.95+8.94+7.49+6.00+3.99\\
&=124.81.
\end{aligned}$$

Therefore,

$$\boxed{\bar{x}_2=124.81/10=12.481\text{ thousand dollars}}.$$

The average listed price is **$12,481**. This is a descriptive average of the ten advertisements, not a guarantee of a market-wide price.

### Step 2: deviations and sums of products

Subtract $5.2$ from each age and $12.481$ from each listed price, then square the deviations or multiply them in pairs.

| Car $i$ | Age $x_{i1}$ | Price $x_{i2}$ | $d_{i1}$ | $d_{i2}$ | $d_{i1}^2$ | $d_{i2}^2$ | $d_{i1}d_{i2}$ |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 1 | 18.95 | -4.2 | 6.469 | 17.64 | 41.847961 | -27.1698 |
| 2 | 2 | 19.00 | -3.2 | 6.519 | 10.24 | 42.497361 | -20.8608 |
| 3 | 3 | 17.95 | -2.2 | 5.469 | 4.84 | 29.909961 | -12.0318 |
| 4 | 3 | 15.54 | -2.2 | 3.059 | 4.84 | 9.357481 | -6.7298 |
| 5 | 4 | 14.00 | -1.2 | 1.519 | 1.44 | 2.307361 | -1.8228 |
| 6 | 5 | 12.95 | -0.2 | 0.469 | 0.04 | 0.219961 | -0.0938 |
| 7 | 6 | 8.94 | 0.8 | -3.541 | 0.64 | 12.538681 | -2.8328 |
| 8 | 8 | 7.49 | 2.8 | -4.991 | 7.84 | 24.910081 | -13.9748 |
| 9 | 9 | 6.00 | 3.8 | -6.481 | 14.44 | 42.003361 | -24.6278 |
| 10 | 11 | 3.99 | 5.8 | -8.491 | 33.64 | 72.097081 | -49.2478 |
| **Total** | **52** | **124.81** | **0.0** | **0.000** | **95.60** | **277.68929** | **-159.392** |


The deviations add to zero in both columns. The essential sums from the table are

$$
\sum d_{i1}^2=95.6,\qquad
\sum d_{i2}^2=277.68929,\qquad
\sum d_{i1}d_{i2}=-159.392.
$$

These are **sums**, not yet sample variances or sample covariance. Divide each by $n-1=9$ next.

### Step 3: variance of age

$$\begin{aligned}
s_{11}&=\frac{95.6}{10-1}\\
&=\frac{95.6}{9}\\
&=\boxed{10.622222\ldots\text{ years}^2}.
\end{aligned}$$

The standard deviation of age is $s_1=\sqrt{10.622222\ldots}\approx3.2592$ years.

### Step 4: variance of price

$$\begin{aligned}
s_{22}&=\frac{277.68929}{10-1}\\
&=\frac{277.68929}{9}\\
&=\boxed{30.8543656\ldots\text{ (thousand dollars)}^2}.
\end{aligned}$$

The standard deviation of price is $s_2=\sqrt{30.8543656\ldots}\approx5.5547$ thousand dollars. **Do not interpret the variance $30.8544$ as $30.8544 thousand dollars**; its units are squared. The standard deviation, not the variance, is in the original units.

### Step 5: covariance

$$\begin{aligned}
s_{12}&=\frac{-159.392}{10-1}\\
&=\frac{-159.392}{9}\\
&=\boxed{-17.710222\ldots\text{ year}\cdot\text{thousand dollars}}.
\end{aligned}$$

The negative sign agrees with our graphical prediction. The covariance magnitude is influenced by both variables' units, so interpreting $-17.7102$ as a “strength score” would be a mistake.

### Step 6: correlation

$$\begin{aligned}
r_{12}&=\frac{s_{12}}{\sqrt{s_{11}}\sqrt{s_{22}}}\\
&=\frac{-17.710222\ldots}{\sqrt{10.622222\ldots}\sqrt{30.8543656\ldots}}\\
&=\boxed{-0.97826836\ldots}.
\end{aligned}$$

The correlation is approximately **$-0.9783$**, a **very strong negative linear association**. Here it is stronger than the bookstore correlation in Question 1. The plotted points should form a relatively tight downward trend.

**Substantive interpretation:** Among these ten advertisements, older cars generally have substantially lower asking prices. Still, the coefficient does not tell us the exact price decrease per year, and it does not prove age is the sole cause. A *regression slope* would address the predicted number of thousand dollars per additional year, but that calculation is not requested here.

### Independent arithmetic cross-check using shortcut formulas

A second route is helpful when you have a calculator but not a large deviation table. From the supplied data,

$$\begin{gathered}
\sum x_{i1}=52,\quad \sum x_{i2}=124.81,\\
\sum x_{i1}^2=366,\quad \sum x_{i2}^2=1835.4429,\\
\sum x_{i1}x_{i2}=489.62.
\end{gathered}$$

For example,

$$\begin{aligned}
s_{11}&=\frac{\sum x_{i1}^2-(\sum x_{i1})^2/n}{n-1}\\
&=\frac{366-52^2/10}{9}=\frac{95.6}{9}.
\end{aligned}$$

Similarly,

$$s_{22}=\frac{1835.4429-124.81^2/10}{9}=\frac{277.68929}{9},$$

$$s_{12}=\frac{489.62-(52)(124.81)/10}{9}=\frac{-159.392}{9}.$$

These shortcut identities are simply the expanded versions of the deviation formulas. They should give exactly the same values; use whichever form is easiest to check.

## Part (d): mean vector and covariance/correlation matrices

$$
\boxed{
\bar{\mathbf{x}}=\begin{bmatrix}5.2\\12.481\end{bmatrix},\qquad
S=\begin{bmatrix}
10.622222&-17.710222\\
-17.710222&30.854366
\end{bmatrix},\qquad
R=\begin{bmatrix}
1&-0.978268\\
-0.978268&1
\end{bmatrix}.
}
$$

The units are **not interchangeable**. The first component of $\bar{\mathbf{x}}$ is in years; the second is in thousands of dollars. The sample covariance matrix has mixed-unit entries. The correlation matrix is unitless.

## R verification for Question 2

```r
age <- c(1, 2, 3, 3, 4, 5, 6, 8, 9, 11)
price <- c(18.95, 19.00, 17.95, 15.54, 14.00,
           12.95, 8.94, 7.49, 6.00, 3.99)

cars <- cbind(age, price)
nrow(cars)
colMeans(cars)
var(age)
var(price)
cov(age, price)
cor(age, price)
cov(cars)
cor(cars)
```

- `cars <- cbind(age, price)` creates ten rows, retaining paired observations.
- `nrow(cars)` returns $10$, confirming the sample size.
- `colMeans(cars)` returns $5.2$ and $12.481$.
- `var(age)` and `var(price)` calculate the separate sample variances.
- `cov(age, price)` computes $s_{12}$; `cor(age, price)` computes $r_{12}$.
- `cov(cars)` returns the full $S$ matrix and `cor(cars)` returns the full $R$ matrix.

**Answer check:** You should see negative covariance near $-17.7102222$ and correlation near $-0.9782684$. These numbers above were independently calculated from the worksheet's printed data and are **not** claimed to be provided answers in the source PDF.

### Question 2: mistakes to avoid

- Do not treat “thousands of dollars” as dollars when explaining the figures.
- Do not sort age and price vectors independently; doing that would **destroy the car pairs**.
- Do not overlook the duplicate age $3$ on the marginal age dot plot.
- Do not confuse a strong negative correlation with a negative variance. Variances remain positive.
- Do not claim that the pattern is perfectly linear: $-0.9783$ is very close to $-1$, but is not exactly $-1$.


# Question 3 (H): Euclidean and statistical distance

**Source:** `PQ1Ans.pdf`, pages 2–3. **(H)** means hand calculation. The source **does** supply the two numerical answers; we reproduce them and explain each step.

## Original question (faithfully transcribed)

> Evaluate the distance of the point $P=(-1,-1)$ to the point $Q=(1,0)$ using the Euclidean distance formula
>
> $$d(P,Q)=\sqrt{(x_1-y_1)^2+(x_2-y_2)^2+\cdots+(x_p-y_p)^2}$$
>
> with $p=2$ and using the statistical distance formula
>
> $$d(P,Q)=\sqrt{a_{11}(x_1-y_1)^2+2a_{12}(x_1-y_1)(x_2-y_2)+a_{22}(x_2-y_2)^2}$$
>
> with $a_{11}=1/3$, $a_{22}=4/27$, and $a_{12}=1/9$.

## What the question asks, in everyday language

Imagine two points on graph paper. First, measure how far apart they are with the ordinary Pythagorean distance. Next, measure how far apart they are using a **weighted, correlation-aware rule** supplied in the question. The two rules are allowed to produce different numbers. Your job is not to choose one as “the true” distance, but to calculate both correctly and understand what each measures.

The points are

$$P=(x_1,x_2)=(-1,-1),\qquad Q=(y_1,y_2)=(1,0).$$

The statement $p=2$ tells us we have exactly **two coordinates**, so there are only two squared differences in ordinary Euclidean distance. It does **not** mean that we need to square the final answer twice.

### First find the coordinate differences

Subtract the coordinates of $Q$ from those of $P$:

$$\Delta_1=x_1-y_1=-1-1=-2,$$

$$\Delta_2=x_2-y_2=-1-0=-1.$$

These differences form the vector

$$\boldsymbol{\Delta}=P-Q=\begin{bmatrix}-2\\-1\end{bmatrix}.$$

Using $Q-P=(2,1)'$ would produce the same distance, because the distance formulas are symmetric in the two points; changing both signs does not change the resulting quadratic form.

## Method 1: Euclidean distance

The source formula for $p=2$ becomes

$$d_E(P,Q)=\sqrt{(x_1-y_1)^2+(x_2-y_2)^2}.$$

Substitute the differences **before** simplifying:

$$\begin{aligned}
d_E(P,Q)&=\sqrt{(-2)^2+(-1)^2}\\
&=\sqrt{4+1}\\
&=\sqrt5\\
&\approx\boxed{2.236068}.
\end{aligned}$$

The **source answer** is $\sqrt5\approx2.236$. The horizontal separation is two units and the vertical separation is one unit. These are the sides of a right triangle, whose hypotenuse is $\sqrt5$.

**Why is the square root needed?** Squaring helps combine differences without cancellation; the square root converts the sum of squared differences back into a distance on the original coordinate scale. Without the square root you would get the *squared Euclidean distance*, which is $5$, not the required distance $2.236$.

## Method 2: statistical distance

The general expression given here uses three weights:

$$d_A(P,Q)=\sqrt{a_{11}\Delta_1^2+2a_{12}\Delta_1\Delta_2+a_{22}\Delta_2^2}.$$

The weights are

$$a_{11}=\frac13,\qquad a_{12}=\frac19,\qquad a_{22}=\frac4{27}.$$

Each part has a role:

1. $a_{11}\Delta_1^2$ measures the weighted contribution of the first-coordinate difference.
2. $a_{22}\Delta_2^2$ measures the weighted contribution of the second-coordinate difference.
3. $2a_{12}\Delta_1\Delta_2$ allows the **combination** of coordinate changes to matter. It comes from two equal cross-terms in the associated symmetric matrix multiplication.

### Complete substitution with the intermediate arithmetic

$$\begin{aligned}
d_A(P,Q)
&=\sqrt{\frac13(-2)^2+2\left(\frac19\right)(-2)(-1)+\frac4{27}(-1)^2}\\
&=\sqrt{\frac13(4)+\frac29(2)+\frac4{27}(1)}\\
&=\sqrt{\frac43+\frac49+\frac4{27}}\\
&=\sqrt{\frac{36}{27}+\frac{12}{27}+\frac4{27}}\\
&=\sqrt{\frac{52}{27}}\\
&\approx\boxed{1.387777}.
\end{aligned}$$

The **source-provided result** is $\sqrt{52/27}\approx1.388$. It agrees with this calculation. Check that the factor $4/27$ multiplies the final squared difference: omitting it is a common copying mistake.

## Why is there a cross-product term?

Write the supplied weights as a symmetric matrix:

$$
A=\begin{bmatrix}
1/3&1/9\\
1/9&4/27
\end{bmatrix}.
$$

The statistical squared distance is the *quadratic form*

$$d_A^2(P,Q)=\boldsymbol{\Delta}'A\boldsymbol{\Delta}.$$

Let's explicitly multiply it:

$$
\begin{aligned}
\begin{bmatrix}\Delta_1&\Delta_2\end{bmatrix}
\begin{bmatrix}a_{11}&a_{12}\\a_{12}&a_{22}\end{bmatrix}
\begin{bmatrix}\Delta_1\\\Delta_2\end{bmatrix}
&=a_{11}\Delta_1^2+a_{12}\Delta_1\Delta_2\\
&\quad+a_{12}\Delta_2\Delta_1+a_{22}\Delta_2^2\\
&=a_{11}\Delta_1^2+2a_{12}\Delta_1\Delta_2+a_{22}\Delta_2^2.
\end{aligned}
$$

The two middle contributions are identical, which explains the **2** in front of $a_{12}$. A cross-product can be positive or negative, depending on the directions of the two coordinate differences and the sign of the coefficient. We must evaluate the entire expression, not take the square root of each term separately.

### Does the matrix give a legitimate distance?

A valid quadratic-form distance requires $A$ to be **positive definite** so that $\boldsymbol{\Delta}'A\boldsymbol{\Delta}>0$ whenever the two points differ. For a symmetric $2\times2$ matrix, a simple test is $a_{11}>0$ and $\det(A)>0$.

$$\det(A)=\frac13\cdot\frac4{27}-\left(\frac19\right)^2=\frac4{81}-\frac1{81}=\frac3{81}=\frac1{27}>0.$$

Since $a_{11}=1/3>0$, these weights define a valid positive-definite distance. We would not automatically get a meaningful real distance from just *any* three arbitrary weights.

**Supplementary connection to Mahalanobis distance:** If $A$ is an inverse covariance matrix, then $A=S^{-1}$, and this weighted distance is a Mahalanobis distance. In fact, for the numerical $A$ in this question,

$$
A^{-1}=\begin{bmatrix}4&-3\\-3&9\end{bmatrix}.
$$

The lecturer's question **gives the weights directly**; there is no need to estimate this covariance matrix from observations. The example shows how a quadratic statistical distance can later arise from an inverse covariance matrix.

## Compare the answers, without mixing the meanings

| Measure | Formula used | Squared distance | Distance |
|---|---|---:|---:|
| Euclidean | $\Delta_1^2+\Delta_2^2$ | $5$ | $\sqrt5\approx2.2361$ |
| Statistical | $\boldsymbol{\Delta}'A\boldsymbol{\Delta}$ | $52/27\approx1.9259$ | $\sqrt{52/27}\approx1.3878$ |

The statistical distance is smaller **for these points and these particular weights**. That does *not* mean statistical distance is always smaller than Euclidean distance. Change the weight matrix or the direction of separation, and the relationship can reverse.

### Optional R verification

```r
P <- c(-1, -1)
Q <- c(1, 0)
A <- matrix(c(1/3, 1/9,
              1/9, 4/27), nrow = 2, byrow = TRUE)

delta <- P - Q
sqrt(sum(delta^2))
sqrt(drop(t(delta) %*% A %*% delta))
```

- `P` and `Q` store the two coordinates of each point.
- `matrix(...)` builds the matrix of coefficients. `nrow = 2` specifies two rows, and `byrow = TRUE` fills each row in the written order.
- `delta <- P - Q` computes $(-2,-1)$.
- `sum(delta^2)` squares and adds the entries, so `sqrt()` returns $\sqrt5$.
- `t(delta)` transposes the difference vector, `%*%` means **matrix multiplication**, and `drop()` converts the resulting $1\times1$ matrix into an ordinary number. Its square root returns $\sqrt{52/27}$.

### Question 3: mistakes to avoid

- Do not forget the square root in the final distance.
- Do not interpret $p=2$ as the sample size; here $p$ is the number of coordinates.
- Do not drop the $2a_{12}\Delta_1\Delta_2$ cross-term.
- Do not use $a_{12}$ with the wrong sign: it is **positive** $1/9$ in this question.
- Do not claim one formula is universally preferable; the answer depends on how “distance” is defined for the analysis.



# Question 4 (R): eight two-variable observations

**Source:** `PQ1Ans.pdf`, page 3. **(R)** means the lecturer suggests statistical software. **There are no source-provided numerical solutions** for this question. All values below are independently calculated from the eight source observations.

## Original question (faithfully transcribed)

> Consider the following eight pairs of measurements on two variables $X_1$ and $X_2$.
>
> | $X_1$ | -6 | -3 | -2 | 1 | 2 | 5 | 6 | 8 |
> |---|---:|---:|---:|---:|---:|---:|---:|---:|
> | $X_2$ | -2 | -3 | 1 | -1 | 2 | 1 | 5 | 3 |
>
> **(a)** Plot the data as a scatter diagram.
>
> **(b)** Calculate the Euclidean distance between each pair of measurements.
>
> **(c)** Calculate the Mahalanobis distance between each measurement and the mean vector of the data $\bar{\mathbf{x}}=[\bar{x}_1,\bar{x}_2]'$.
>
> **(d)** Calculate the Mahalanobis distance between two measurements $(-2,1)$ and $(6,5)$ given in the above table.

## What is new in this question?

Question 3 compared two points using *given* distance coefficients. Here we are given a **whole sample** and must estimate the covariance structure before computing **Mahalanobis distances**. This difference is essential: the inverse covariance matrix is **derived from the eight observations**, rather than supplied as three coefficients.

There are eight measured objects, each with two coordinates. We have $n=8$ and $p=2$. Because the variables are called simply $X_1$ and $X_2$, with no substantive descriptions, we can interpret the results geometrically but cannot honestly claim what real-world quantities they represent.

| Observation | $X_1$ | $X_2$ | Point |
|---:|---:|---:|---|
| 1 | -6 | -2 | $(-6,-2)$ |
| 2 | -3 | -3 | $(-3,-3)$ |
| 3 | -2 | 1 | $(-2,1)$ |
| 4 | 1 | -1 | $(1,-1)$ |
| 5 | 2 | 2 | $(2,2)$ |
| 6 | 5 | 1 | $(5,1)$ |
| 7 | 6 | 5 | $(6,5)$ |
| 8 | 8 | 3 | $(8,3)$ |

## Part (a): the scatter diagram

Place $X_1$ on the horizontal axis and $X_2$ on the vertical axis. Plot the eight pairs, keeping each observation together. The points generally move from **lower-left toward upper-right**, though they do not form an exact straight line. Therefore we expect a **positive covariance** and **positive correlation**. In fact, our independent calculation later gives $r_{12}\approx0.8077$.

```r
x1 <- c(-6, -3, -2, 1, 2, 5, 6, 8)
x2 <- c(-2, -3, 1, -1, 2, 1, 5, 3)
X4 <- cbind(x1, x2)

plot(x1, x2, pch = 19,
     xlab = "X1", ylab = "X2",
     main = "Question 4: eight measured points")
text(x1, x2, labels = 1:8, pos = 3)
points(mean(x1), mean(x2), pch = 4, cex = 1.5, lwd = 2)
```

**Line-by-line explanation:** The first two lines create the paired measurements. `cbind()` creates an eight-row, two-column matrix. `plot()` draws the scatter diagram. `text()` labels the observations from 1 to 8; `pos = 3` positions the labels above the dots. `points()` adds an **X-shaped marker** (`pch = 4`) at the sample mean; `cex` enlarges that marker and `lwd` thickens its strokes. The source only requests the scatter plot, but identifying the mean helps prepare for Part (c).

## Part (b): Euclidean distance between **every pair**

With eight points, how many distinct unordered pairs are there? Each observation can pair with seven others, giving $8\times7$ ordered choices. Since $(i,j)$ and $(j,i)$ describe the same distance, divide by two:

$$\boxed{\binom82=\frac{8(8-1)}2=28\text{ distinct pairs}.}$$

The notation $\binom82$ is read “eight choose two.” It counts combinations without regard to order.

For points $i$ and $j$, the formula is

$$\boxed{d_{E,ij}=\sqrt{(x_{i1}-x_{j1})^2+(x_{i2}-x_{j2})^2}.}$$

### Three carefully worked examples

**Observations 1 and 2:** $(-6,-2)$ and $(-3,-3)$.

$$\begin{aligned}
\Delta_1&=-6-(-3)=-3,\\
\Delta_2&=-2-(-3)=1,\\
d_{E,12}&=\sqrt{(-3)^2+1^2}=\sqrt{10}\approx\boxed{3.1623}.
\end{aligned}$$

**Observations 3 and 7:** $(-2,1)$ and $(6,5)$.

$$\begin{aligned}
\Delta_1&=-2-6=-8,\\
\Delta_2&=1-5=-4,\\
d_{E,37}&=\sqrt{(-8)^2+(-4)^2}=\sqrt{64+16}=\sqrt{80}\approx\boxed{8.9443}.
\end{aligned}$$

**Observations 7 and 8:** $(6,5)$ and $(8,3)$.

$$d_{E,78}=\sqrt{(6-8)^2+(5-3)^2}=\sqrt{4+4}=\sqrt8\approx\boxed{2.8284}.$$

### Complete list of all 28 distinct distances

For each pair below, the table shows the actual coordinate differences, the **sum of squared differences** inside the square root, and the final Euclidean distance. This is a complete calculation record rather than a selective list.

| Pair $(i,j)$ | $\Delta_1$ | $\Delta_2$ | $\sum_k\Delta_k^2$ | $d_E$ exact | $d_E$ approximate |
| --- | ---: | ---: | ---: | ---: | ---: |
| 1-2 | -3 | 1 | 10 | $\sqrt{10}$ | 3.162278 |
| 1-3 | -4 | -3 | 25 | $\sqrt{25}$ | 5.000000 |
| 1-4 | -7 | -1 | 50 | $\sqrt{50}$ | 7.071068 |
| 1-5 | -8 | -4 | 80 | $\sqrt{80}$ | 8.944272 |
| 1-6 | -11 | -3 | 130 | $\sqrt{130}$ | 11.401754 |
| 1-7 | -12 | -7 | 193 | $\sqrt{193}$ | 13.892444 |
| 1-8 | -14 | -5 | 221 | $\sqrt{221}$ | 14.866069 |
| 2-3 | -1 | -4 | 17 | $\sqrt{17}$ | 4.123106 |
| 2-4 | -4 | -2 | 20 | $\sqrt{20}$ | 4.472136 |
| 2-5 | -5 | -5 | 50 | $\sqrt{50}$ | 7.071068 |
| 2-6 | -8 | -4 | 80 | $\sqrt{80}$ | 8.944272 |
| 2-7 | -9 | -8 | 145 | $\sqrt{145}$ | 12.041595 |
| 2-8 | -11 | -6 | 157 | $\sqrt{157}$ | 12.529964 |
| 3-4 | -3 | 2 | 13 | $\sqrt{13}$ | 3.605551 |
| 3-5 | -4 | -1 | 17 | $\sqrt{17}$ | 4.123106 |
| 3-6 | -7 | 0 | 49 | $\sqrt{49}$ | 7.000000 |
| 3-7 | -8 | -4 | 80 | $\sqrt{80}$ | 8.944272 |
| 3-8 | -10 | -2 | 104 | $\sqrt{104}$ | 10.198039 |
| 4-5 | -1 | -3 | 10 | $\sqrt{10}$ | 3.162278 |
| 4-6 | -4 | -2 | 20 | $\sqrt{20}$ | 4.472136 |
| 4-7 | -5 | -6 | 61 | $\sqrt{61}$ | 7.810250 |
| 4-8 | -7 | -4 | 65 | $\sqrt{65}$ | 8.062258 |
| 5-6 | -3 | 1 | 10 | $\sqrt{10}$ | 3.162278 |
| 5-7 | -4 | -3 | 25 | $\sqrt{25}$ | 5.000000 |
| 5-8 | -6 | -1 | 37 | $\sqrt{37}$ | 6.082763 |
| 6-7 | -1 | -4 | 17 | $\sqrt{17}$ | 4.123106 |
| 6-8 | -3 | -2 | 13 | $\sqrt{13}$ | 3.605551 |
| 7-8 | -2 | 2 | 8 | $\sqrt{8}$ | 2.828427 |


### The full symmetric distance matrix

Every diagonal entry is zero because a point is distance zero from itself. The entry in row $i$, column $j$ equals the entry in row $j$, column $i$, because distance does not depend on which point we call “first.” Values are rounded here, but R calculates using the full data precision.

| Point | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **1** | 0.000 | 3.162 | 5.000 | 7.071 | 8.944 | 11.402 | 13.892 | 14.866 |
| **2** | 3.162 | 0.000 | 4.123 | 4.472 | 7.071 | 8.944 | 12.042 | 12.530 |
| **3** | 5.000 | 4.123 | 0.000 | 3.606 | 4.123 | 7.000 | 8.944 | 10.198 |
| **4** | 7.071 | 4.472 | 3.606 | 0.000 | 3.162 | 4.472 | 7.810 | 8.062 |
| **5** | 8.944 | 7.071 | 4.123 | 3.162 | 0.000 | 3.162 | 5.000 | 6.083 |
| **6** | 11.402 | 8.944 | 7.000 | 4.472 | 3.162 | 0.000 | 4.123 | 3.606 |
| **7** | 13.892 | 12.042 | 8.944 | 7.810 | 5.000 | 4.123 | 0.000 | 2.828 |
| **8** | 14.866 | 12.530 | 10.198 | 8.062 | 6.083 | 3.606 | 2.828 | 0.000 |


### R code for **all** pairwise distances

```r
x1 <- c(-6, -3, -2, 1, 2, 5, 6, 8)
x2 <- c(-2, -3, 1, -1, 2, 1, 5, 3)
X4 <- cbind(x1, x2)

all_pairs <- dist(X4, method = "euclidean")
all_pairs
as.matrix(all_pairs)
```

1. The first two lines create the source vectors.
2. `cbind()` arranges observations as **rows**, which is important for `dist()`.
3. `dist(X4, method = "euclidean")` calculates the distances between **rows**, not between columns. It stores the 28 unique pairwise distances efficiently.
4. Printing `all_pairs` displays R's compact triangular representation.
5. `as.matrix(all_pairs)` converts the output to the more familiar eight-by-eight symmetric matrix, including zeros on the diagonal.

If you accidentally enter the data as a two-row, eight-column matrix, `dist()` will calculate the distance between **two rows**, not the 28 distances asked for. Check `dim(X4)`; it should report `8 2`.

## Part (c): Mahalanobis distance of each observation from the mean

This part has three big stages: calculate the sample mean vector, calculate and invert the sample covariance matrix, and evaluate the quadratic-form distance for all eight points.

### Step 1: calculate the two sample means

$$\sum_{i=1}^8x_{i1}=-6-3-2+1+2+5+6+8=11,$$

$$\sum_{i=1}^8x_{i2}=-2-3+1-1+2+1+5+3=6.$$

Thus

$$\bar{x}_1=\frac{11}{8}=1.375,\qquad \bar{x}_2=\frac68=0.75,$$

$$\boxed{\bar{\mathbf{x}}=\begin{bmatrix}1.375\\0.75\end{bmatrix}.}$$

The point $(1.375,0.75)$ is the center of the observed cloud. It need not coincide with any actual observation.

### Step 2: calculate the deviations and cross-products

Subtract the column means from each row. These differences will also be the inputs to the Mahalanobis formula.

| $i$ | $x_{i1}$ | $x_{i2}$ | $d_{i1}=x_{i1}-1.375$ | $d_{i2}=x_{i2}-0.75$ |
|---:|---:|---:|---:|---:|
| 1 | -6 | -2 | -7.375 | -2.750 |
| 2 | -3 | -3 | -4.375 | -3.750 |
| 3 | -2 | 1 | -3.375 | 0.250 |
| 4 | 1 | -1 | -0.375 | -1.750 |
| 5 | 2 | 2 | 0.625 | 1.250 |
| 6 | 5 | 1 | 3.625 | 0.250 |
| 7 | 6 | 5 | 4.625 | 4.250 |
| 8 | 8 | 3 | 6.625 | 2.250 |
| **Sum** | **11** | **6** | **0** | **0** |

The three required centered sums are

$$\boxed{\sum d_{i1}^2=163.875,\qquad\sum d_{i2}^2=49.5,\qquad\sum d_{i1}d_{i2}=72.75.}$$

Equivalently, in the matrix language introduced in the foundations,

$$D'D=\begin{bmatrix}163.875&72.75\\72.75&49.5\end{bmatrix}.$$

### Step 3: construct the sample covariance matrix

There are $n=8$ observations, so divide by $n-1=7$:

$$\begin{aligned}
s_{11}&=\frac{163.875}{7}=23.4107142857\ldots,\\
s_{22}&=\frac{49.5}{7}=7.0714285714\ldots,\\
s_{12}&=\frac{72.75}{7}=10.3928571429\ldots.
\end{aligned}$$

Hence

$$
\boxed{
S=\begin{bmatrix}
23.410714&10.392857\\
10.392857&7.071429
\end{bmatrix}.
}
$$

The two off-diagonal values are positive. If we also calculate correlation,

$$r_{12}=\frac{10.392857\ldots}{\sqrt{23.410714\ldots}\sqrt{7.071428\ldots}}\approx\boxed{0.807745}.$$

This fairly strong positive linear relationship explains why the scatter cloud looks elongated along a rising direction. Mahalanobis distance uses this **shape information** to decide what counts as a large standardized departure from the center.

### Step 4: find $S^{-1}$, the matrix inverse

For

$$S=\begin{bmatrix}a&b\\b&c\end{bmatrix},\qquad
S^{-1}=\frac1{ac-b^2}\begin{bmatrix}c&-b\\-b&a\end{bmatrix}.$$

Here $a=23.4107142857\ldots$, $b=10.3928571429\ldots$, and $c=7.0714285714\ldots$. The determinant is

$$\det(S)=ac-b^2=\frac{1611}{28}\approx57.535714>0.$$

This is nonzero, so the inverse exists. Carrying the calculation through gives

$$
\boxed{
S^{-1}=\begin{bmatrix}
0.122905028&-0.180633147\\
-0.180633147&0.406890130
\end{bmatrix}.
}
$$

**Do not invert by dividing each cell by itself.** Matrix inversion is a specific operation that accounts for every entry. In R, `solve(S)` calculates $S^{-1}$.

### Step 5: expand the two-dimensional Mahalanobis formula

If $\mathbf{d}_i=(d_{i1},d_{i2})'$, the squared distance is

$$D_{M,i}^2=\mathbf{d}_i'S^{-1}\mathbf{d}_i.$$

For a symmetric inverse covariance matrix,

$$
\begin{aligned}
D_{M,i}^2
&=0.122905028\,d_{i1}^2\\
&\quad+2(-0.180633147)\,d_{i1}d_{i2}\\
&\quad+0.406890130\,d_{i2}^2.
\end{aligned}
$$

There are three contributions: the first squared deviation, a two-variable cross-term, and the second squared deviation. Since the cross-term coefficient is negative, it will *subtract* from the squared distance when the deviations have the same sign. This reflects the positive sample covariance and the long diagonal direction of the observed data cloud.

### Step 6: work through observation 1 completely

Observation 1 is $\mathbf{x}_1=(-6,-2)'$, and the mean is $(1.375,0.75)'$. Its centered vector is

$$\mathbf{d}_1=\begin{bmatrix}-6-1.375\\-2-0.75\end{bmatrix}=\begin{bmatrix}-7.375\\-2.75\end{bmatrix}.$$

Substitute into the three-term quadratic form:

$$\begin{aligned}
D_{M,1}^2
&=0.122905028(-7.375)^2\\
&\quad+2(-0.180633147)(-7.375)(-2.75)\\
&\quad+0.406890130(-2.75)^2\\
&\approx6.684881-7.326932+3.077107\\
&=\boxed{2.435056}.
\end{aligned}$$

Finally take the square root:

$$\boxed{D_{M,1}=\sqrt{2.4350559\ldots}\approx1.560467.}$$

**Why is the cross contribution negative?** Both deviations are negative, so their product is positive. But the inverse covariance's off-diagonal coefficient is negative. The resulting cross term is negative. Do not replace a negative cross-term with its absolute value.

### Step 7: calculate the distance for **every** observation

The following table preserves the actual centered coordinates and distinguishes $D_M^2$ (what R's `mahalanobis()` outputs) from $D_M$ (what the question requests).

| Observation $i$ | Centered vector $\mathbf{d}_i$ | $D_{M,i}^2$ | $D_{M,i}$ |
| --- | ---: | ---: | ---: |
| 1 | $(-7.375,\ -2.75)$ | 2.435055866 | 1.560466554 |
| 2 | $(-4.375,\ -3.75)$ | 2.147346369 | 1.465382670 |
| 3 | $(-3.375,\ 0.25)$ | 1.730214153 | 1.315376050 |
| 4 | $(-0.375,\ -1.75)$ | 1.026303538 | 1.013066404 |
| 5 | $(0.625,\ 1.25)$ | 0.401536313 | 0.633668930 |
| 6 | $(3.625,\ 0.25)$ | 1.313081937 | 1.145897874 |
| 7 | $(4.625,\ 4.25)$ | 2.877327747 | 1.696268772 |
| 8 | $(6.625,\ 2.25)$ | 2.069134078 | 1.438448497 |
| **Check: total** |  | **14** |  |


**Interpretation:** Observation 7, $(6,5)$, has the largest sample Mahalanobis distance from the center in this particular dataset ($\approx1.6963$). Observation 5, $(2,2)$, is the closest ($\approx0.6337$). These are **relative distances**, not formal statistical outlier test conclusions. With only eight observations, a large-looking distance does not establish that a point should be removed.

### R code for the mean, covariance, inverse, and all eight distances

```r
x1 <- c(-6, -3, -2, 1, 2, 5, 6, 8)
x2 <- c(-2, -3, 1, -1, 2, 1, 5, 3)
X4 <- cbind(x1, x2)

mean4 <- colMeans(X4)
S4 <- cov(X4)
S4_inverse <- solve(S4)

squared_MD_to_mean <- mahalanobis(X4, center = mean4, cov = S4)
MD_to_mean <- sqrt(squared_MD_to_mean)

mean4
S4
S4_inverse
squared_MD_to_mean
MD_to_mean
```

- `colMeans(X4)` computes the center in both coordinates.
- `cov(X4)` computes the sample covariance matrix with the correct $n-1$ denominator.
- `solve(S4)` computes the actual matrix inverse, not an element-by-element reciprocal.
- `mahalanobis(X4, center = mean4, cov = S4)` finds the **squared** distance of every row from the common mean, measured using `S4`.
- `sqrt()` converts the squared distances to ordinary Mahalanobis distances.
- The last five lines print the objects for comparison with the independently calculated results in the guide.

**Additional useful check:** Since we calculate distances of the sample observations from their **own sample mean**, using their **own sample covariance matrix**, the sum of their squared Mahalanobis distances is $(n-1)p=7\times2=14$, up to floating-point rounding. You can verify this with `sum(squared_MD_to_mean)`. This identity holds when the sample covariance is invertible.

## Part (d): Mahalanobis distance between $(-2,1)$ and $(6,5)$

This time the two endpoints are *actual observations*, and we measure the separation between them **using the sample covariance matrix from Part (c)**. We do **not** subtract the sample mean from both points one by one. We can directly subtract the two endpoint vectors, because the two mean terms would cancel anyway:

$$
\boldsymbol{\Delta}=\begin{bmatrix}-2\\1\end{bmatrix}-\begin{bmatrix}6\\5\end{bmatrix}
=\begin{bmatrix}-8\\-4\end{bmatrix}.
$$

Now use the same inverse covariance matrix:

$$\begin{aligned}
D_M^2
&=\boldsymbol{\Delta}'S^{-1}\boldsymbol{\Delta}\\
&=0.122905028(-8)^2\\
&\quad+2(-0.180633147)(-8)(-4)\\
&\quad+0.406890130(-4)^2\\
&\approx7.865922-11.560521+6.510242\\
&=\frac{504}{179}\\
&\approx\boxed{2.815642}.
\end{aligned}$$

The required **distance** is therefore

$$\boxed{D_M=\sqrt{504/179}\approx1.677988.}$$

Recall that the **Euclidean** distance between these *same* two points was $\sqrt{80}\approx8.944272$ in Part (b). The difference is not an arithmetic contradiction. The Euclidean measure uses raw coordinate differences. Mahalanobis distance adjusts those differences using the variability and correlation of the eight-point dataset. Their units and interpretations differ, so avoid saying one is “8.94 times” the other in a meaningful substantive sense.

### R verification for Part (d)

```r
point_A <- c(-2, 1)
point_B <- c(6, 5)
difference <- point_A - point_B

MD_squared <- drop(t(difference) %*% solve(S4) %*% difference)
MD <- sqrt(MD_squared)

MD_squared
MD
```

- `point_A` and `point_B` represent the two specified measurements.
- `difference` is their two-coordinate separation vector $(-8,-4)$.
- `t(difference)` converts it to a row for matrix multiplication.
- `%*%` performs **matrix multiplication** in the indicated order.
- `solve(S4)` uses the same sample covariance structure as Part (c).
- `drop()` changes the $1\times1$ answer to a scalar. `sqrt()` is needed because the quadratic form gives a **squared** distance.

**Expected results:** squared distance $\approx2.8156425$ and distance $\approx1.6779876$.

### Question 4: mistakes to avoid

- Do not omit any of the 28 distinct Euclidean pairs.
- Do not accidentally use column-to-column distances instead of observation-to-observation distances in R.
- Do not treat `mahalanobis()` output as unsquared distance.
- Do not substitute the coefficients from Question 3. Here the metric is $S^{-1}$ computed from **Question 4 data**.
- Do not confuse “distance of each point from the mean” in Part (c) with “distance between two specified points” in Part (d).
- Do not assume a visually extreme point is automatically a confirmed statistical outlier.


# Question 5 (R): five three-variable observations

**Source:** `PQ1Ans.pdf`, pages 3–4. **(R)** means use R. **No numerical solution is supplied in the source for this question.** All calculations below are independently derived from the printed measurements.

## Original question (faithfully transcribed)

> The following are five measurements on the variables $X_1$, $X_2$, and $X_3$.
>
> | $X_1$ | 9 | 2 | 6 | 5 | 8 |
> |---|---:|---:|---:|---:|---:|
> | $X_2$ | 12 | 8 | 6 | 4 | 10 |
> | $X_3$ | 3 | 4 | 0 | 2 | 1 |
>
> **(a)** Find the sample mean array $\bar{\mathbf{x}}$, the sample variance-covariance matrix $S$, and the sample correlation matrix $R$.
>
> **(b)** Calculate the Euclidean distance between each pair of measurements.
>
> **(c)** Calculate the Mahalanobis distance between each measurement and the mean vector of the data $\bar{\mathbf{x}}=[\bar{x}_1,\bar{x}_2,\bar{x}_3]'$.
>
> **(d)** Calculate the Mahalanobis distance between two measurements $(9,12,3)$ and $(5,4,2)$ given in the above table.

## What changes when there are three variables?

This is our first *three-dimensional* dataset in the worksheet. Every observation has **three coordinates**, not two. The original data can be arranged as a five-row, three-column matrix:

$$
\boxed{
X=\begin{bmatrix}
9&12&3\\
2&8&4\\
6&6&0\\
5&4&2\\
8&10&1
\end{bmatrix}.
}
$$

There are $n=5$ observations and $p=3$ variables. For example, the first observation is the vector $(9,12,3)'$; the fourth is $(5,4,2)'$. The source does not state what $X_1$, $X_2$, and $X_3$ measure, so interpretations should be expressed in terms of the observed variables and their geometric relationship, not invented business quantities.

**The calculation pattern stays exactly the same** as in two dimensions, but the answers expand:

| Item | Two variables | Three variables |
|---|---|---|
| Mean vector | 2 entries | 3 entries |
| Covariance matrix | $2\times2$ | $3\times3$ |
| Correlation matrix | $2\times2$ | $3\times3$ |
| Distinct pairwise covariances | 1 | 3: $s_{12},s_{13},s_{23}$ |
| Euclidean distance | Square root of 2 squared coordinate differences | Square root of 3 squared coordinate differences |
| Mahalanobis distance | Uses inverse of a $2\times2$ covariance matrix | Uses inverse of a $3\times3$ covariance matrix |

## Part (a): sample mean, covariance matrix, correlation matrix

### Step 1: calculate the three means

First variable:

$$\bar{x}_1=\frac{9+2+6+5+8}{5}=\frac{30}{5}=\boxed{6}.$$

Second variable:

$$\bar{x}_2=\frac{12+8+6+4+10}{5}=\frac{40}{5}=\boxed{8}.$$

Third variable:

$$\bar{x}_3=\frac{3+4+0+2+1}{5}=\frac{10}{5}=\boxed{2}.$$

The sample mean array (column vector) is therefore

$$\boxed{\bar{\mathbf{x}}=\begin{bmatrix}6\\8\\2\end{bmatrix}.}$$

The mean need not be one of the five observations. The three entries are the separate centers of the three variables.

### Step 2: form the five deviation vectors

Subtract the mean *column by column*. For example, the first row $(9,12,3)$ becomes $(9-6,12-8,3-2)=(3,4,1)$. Repeat for all rows:

| Observation | $X_1$ | $X_2$ | $X_3$ | $d_1=X_1-6$ | $d_2=X_2-8$ | $d_3=X_3-2$ |
|---:|---:|---:|---:|---:|---:|---:|
| 1 | 9 | 12 | 3 | 3 | 4 | 1 |
| 2 | 2 | 8 | 4 | -4 | 0 | 2 |
| 3 | 6 | 6 | 0 | 0 | -2 | -2 |
| 4 | 5 | 4 | 2 | -1 | -4 | 0 |
| 5 | 8 | 10 | 1 | 2 | 2 | -1 |
| **Sum** | **30** | **40** | **10** | **0** | **0** | **0** |

In matrix notation, the **centered data matrix** is

$$
D=\begin{bmatrix}
3&4&1\\
-4&0&2\\
0&-2&-2\\
-1&-4&0\\
2&2&-1
\end{bmatrix}.
$$

Each deviation column adds to zero. This simple check catches many errors before the covariance calculation begins.

### Step 3: calculate all six unique sums of products

With three variables, we need three **sums of squared deviations** and three **sums of cross-products**. Rather than memorize six separate formulas, think of selecting any two columns of $D$, multiplying their entries pairwise, and adding the products. When the two selected columns are the same, the products are squares.

#### Squared deviation sum for $X_1$

$$\begin{aligned}
\sum_{i=1}^5d_{i1}^2&=3^2+(-4)^2+0^2+(-1)^2+2^2\\
&=9+16+0+1+4=\boxed{30}.
\end{aligned}$$

#### Squared deviation sum for $X_2$

$$\begin{aligned}
\sum_{i=1}^5d_{i2}^2&=4^2+0^2+(-2)^2+(-4)^2+2^2\\
&=16+0+4+16+4=\boxed{40}.
\end{aligned}$$

#### Squared deviation sum for $X_3$

$$\begin{aligned}
\sum_{i=1}^5d_{i3}^2&=1^2+2^2+(-2)^2+0^2+(-1)^2\\
&=1+4+4+0+1=\boxed{10}.
\end{aligned}$$

#### Cross-product sum for $X_1$ and $X_2$

$$\begin{aligned}
\sum_{i=1}^5d_{i1}d_{i2}
&=(3)(4)+(-4)(0)+(0)(-2)+(-1)(-4)+(2)(2)\\
&=12+0+0+4+4=\boxed{20}.
\end{aligned}$$

#### Cross-product sum for $X_1$ and $X_3$

$$\begin{aligned}
\sum_{i=1}^5d_{i1}d_{i3}
&=(3)(1)+(-4)(2)+(0)(-2)+(-1)(0)+(2)(-1)\\
&=3-8+0+0-2=\boxed{-7}.
\end{aligned}$$

#### Cross-product sum for $X_2$ and $X_3$

$$\begin{aligned}
\sum_{i=1}^5d_{i2}d_{i3}
&=(4)(1)+(0)(2)+(-2)(-2)+(-4)(0)+(2)(-1)\\
&=4+0+4+0-2=\boxed{6}.
\end{aligned}$$

These six numbers are placed into the $3\times3$ **sum-of-squares-and-cross-products matrix**. Because reversing the variable order does not change a product, the matrix is symmetric:

$$
\boxed{
D'D=\begin{bmatrix}
30&20&-7\\
20&40&6\\
-7&6&10
\end{bmatrix}.
}
$$

### Step 4: divide by $n-1$ to obtain the covariance matrix

There are five observations, so $n-1=4$:

$$\begin{aligned}
s_{11}&=30/4=\boxed{7.5},\\
s_{22}&=40/4=\boxed{10},\\
s_{33}&=10/4=\boxed{2.5},\\
s_{12}=s_{21}&=20/4=\boxed{5},\\
s_{13}=s_{31}&=-7/4=\boxed{-1.75},\\
s_{23}=s_{32}&=6/4=\boxed{1.5}.
\end{aligned}$$

The result is

$$
\boxed{
S=\frac14D'D=
\begin{bmatrix}
7.5&5&-1.75\\
5&10&1.5\\
-1.75&1.5&2.5
\end{bmatrix}.
}
$$

**Read the matrix as a map:** The three diagonal entries are variances, and the remaining entries report relationships between different variables. $s_{12}=5$ is positive; $s_{13}=-1.75$ is negative; $s_{23}=1.5$ is positive. The diagonals cannot be negative. Off-diagonals can have either sign.

### Step 5: calculate all three correlations

Apply $r_{jk}=s_{jk}/\sqrt{s_{jj}s_{kk}}$ to each *distinct* variable pair.

Between $X_1$ and $X_2$:

$$\begin{aligned}
r_{12}&=\frac5{\sqrt{7.5}\sqrt{10}}\\
&=\frac5{\sqrt{75}}\\
&\approx\boxed{0.577350}.
\end{aligned}$$

Between $X_1$ and $X_3$:

$$\begin{aligned}
r_{13}&=\frac{-1.75}{\sqrt{7.5}\sqrt{2.5}}\\
&=\frac{-1.75}{\sqrt{18.75}}\\
&\approx\boxed{-0.404145}.
\end{aligned}$$

Between $X_2$ and $X_3$:

$$\begin{aligned}
r_{23}&=\frac{1.5}{\sqrt{10}\sqrt{2.5}}\\
&=\frac{1.5}{\sqrt{25}}\\
&=\boxed{0.300000}.
\end{aligned}$$

Use symmetry, $r_{21}=r_{12}$, $r_{31}=r_{13}$, and $r_{32}=r_{23}$, then fill the diagonal with ones:

$$
\boxed{
R=\begin{bmatrix}
1&0.577350&-0.404145\\
0.577350&1&0.300000\\
-0.404145&0.300000&1
\end{bmatrix}.
}
$$

**Interpretation with appropriate caution:** In these five observations, $X_1$ and $X_2$ have a moderate positive linear association, $X_1$ and $X_3$ a moderate negative sample association, and $X_2$ and $X_3$ a relatively weak positive sample association. These are descriptions of the tiny sample, not certain properties of a larger population. Descriptive labels such as “weak” and “moderate” depend on context and should not replace the actual numerical coefficient.

### R verification for all of Part (a)

```r
v1 <- c(9, 2, 6, 5, 8)
v2 <- c(12, 8, 6, 4, 10)
v3 <- c(3, 4, 0, 2, 1)

X5 <- cbind(v1, v2, v3)
mean5 <- colMeans(X5)
S5 <- cov(X5)
R5 <- cor(X5)

X5
mean5
S5
R5
```

- The first three lines create the observed values for $X_1$, $X_2$, and $X_3$ in the source order.
- `cbind(v1, v2, v3)` creates a **$5\times3$** data matrix.
- `colMeans(X5)` produces the three-entry mean vector $[6,8,2]'$.
- `cov(X5)` constructs the sample covariance matrix shown above.
- `cor(X5)` constructs the sample correlation matrix shown above.
- The last four lines print these objects, which makes comparison with the hand results straightforward.

You can also verify the **centered data matrix** and **cross-product matrix** directly:

```r
D5 <- sweep(X5, 2, mean5, FUN = "-")
t(D5) %*% D5
(t(D5) %*% D5) / (nrow(X5) - 1)
```

`D5 <- sweep(X5, 2, mean5, FUN = "-")` subtracts the corresponding mean from each column (`2` means work across the **column margin**). `t(D5)` transposes the centered matrix; `%*%` multiplies matrices; dividing by `nrow(X5) - 1` gives the sample covariance matrix. The output should match `cov(X5)`.

## Part (b): Euclidean distances for all pairs of three-variable observations

Each observation is now a point in **three-dimensional space**. For points $i$ and $j$,

$$
\boxed{
d_{E,ij}=\sqrt{(x_{i1}-x_{j1})^2+(x_{i2}-x_{j2})^2+(x_{i3}-x_{j3})^2}.
}
$$

We have five points, so the number of distinct unordered pairs is

$$\binom52=\frac{5(5-1)}2=\boxed{10\text{ pairs}}.$$

### A complete first example

The first point is $(9,12,3)$ and the second is $(2,8,4)$:

$$\begin{aligned}
\boldsymbol{\Delta}_{12}&=(9-2,12-8,3-4)=(7,4,-1),\\
d_{E,12}&=\sqrt{7^2+4^2+(-1)^2}\\
&=\sqrt{49+16+1}\\
&=\sqrt{66}\\
&\approx\boxed{8.1240}.
\end{aligned}$$

Do not omit the third-coordinate difference just because Questions 3 and 4 were in two dimensions.

### A second example that will connect to Part (d)

The first point is $(9,12,3)$ and the fourth is $(5,4,2)$:

$$\begin{aligned}
\boldsymbol{\Delta}_{14}&=(9-5,12-4,3-2)=(4,8,1),\\
d_{E,14}&=\sqrt{4^2+8^2+1^2}\\
&=\sqrt{16+64+1}\\
&=\sqrt{81}=\boxed{9}.
\end{aligned}$$

The Mahalanobis distance between the *same* two observations in Part (d) will be different, because it uses the covariance structure instead of counting raw coordinate steps.

### Complete calculations for all 10 distinct pairs

The table includes every coordinate difference, the sum of squares under the radical, and the final distance.

| Pair $(i,j)$ | $\Delta_1$ | $\Delta_2$ | $\Delta_3$ | $\sum_k\Delta_k^2$ | $d_E$ exact | $d_E$ approximate |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 1-2 | 7 | 4 | -1 | 66 | $\sqrt{66}$ | 8.124038 |
| 1-3 | 3 | 6 | 3 | 54 | $\sqrt{54}$ | 7.348469 |
| 1-4 | 4 | 8 | 1 | 81 | $\sqrt{81}$ | 9.000000 |
| 1-5 | 1 | 2 | 2 | 9 | $\sqrt{9}$ | 3.000000 |
| 2-3 | -4 | 2 | 4 | 36 | $\sqrt{36}$ | 6.000000 |
| 2-4 | -3 | 4 | 2 | 29 | $\sqrt{29}$ | 5.385165 |
| 2-5 | -6 | -2 | 3 | 49 | $\sqrt{49}$ | 7.000000 |
| 3-4 | 1 | 2 | -2 | 9 | $\sqrt{9}$ | 3.000000 |
| 3-5 | -2 | -4 | -1 | 21 | $\sqrt{21}$ | 4.582576 |
| 4-5 | -3 | -6 | 1 | 46 | $\sqrt{46}$ | 6.782330 |


### Full $5\times5$ Euclidean distance matrix

| Point | 1 | 2 | 3 | 4 | 5 |
| --- | ---: | ---: | ---: | ---: | ---: |
| **1** | 0.000 | 8.124 | 7.348 | 9.000 | 3.000 |
| **2** | 8.124 | 0.000 | 6.000 | 5.385 | 7.000 |
| **3** | 7.348 | 6.000 | 0.000 | 3.000 | 4.583 |
| **4** | 9.000 | 5.385 | 3.000 | 0.000 | 6.782 |
| **5** | 3.000 | 7.000 | 4.583 | 6.782 | 0.000 |


### R code for the complete pairwise distance matrix

```r
v1 <- c(9, 2, 6, 5, 8)
v2 <- c(12, 8, 6, 4, 10)
v3 <- c(3, 4, 0, 2, 1)
X5 <- cbind(v1, v2, v3)

pairwise5 <- dist(X5, method = "euclidean")
pairwise5
as.matrix(pairwise5)
```

The first three lines save the variables and `cbind()` combines them so **each row is one measurement**. `dist(X5, method = "euclidean")` computes the ten distinct Euclidean distances, and `as.matrix()` displays all $5\times5=25$ positions, including mirrored entries and diagonal zeros. Its triangular output and its square matrix are two presentations of the **same ten unique nonzero-or-possibly-zero pair distances**.

## Part (c): Mahalanobis distance of each observation from the sample mean

Once again, follow the same logic as Question 4, now with a **three-component difference vector** and a **$3\times3$ inverse covariance matrix**:

$$\boxed{D_{M,i}=\sqrt{(\mathbf{x}_i-\bar{\mathbf{x}})'S^{-1}(\mathbf{x}_i-\bar{\mathbf{x}})}.}$$

### Step 1: identify the center and reference covariance

From Part (a),

$$\bar{\mathbf{x}}=\begin{bmatrix}6\\8\\2\end{bmatrix},\qquad
S=\begin{bmatrix}7.5&5&-1.75\\5&10&1.5\\-1.75&1.5&2.5\end{bmatrix}.$$

The positive and negative covariances matter. Replacing $S$ by only its diagonal would **ignore relationships between variables** and would answer a different distance question.

### Step 2: invert the covariance matrix

The sample covariance matrix is invertible, with determinant

$$\boxed{\det(S)=\frac{205}{4}=51.25>0.}$$

Its inverse, independently calculated, is

$$
\boxed{
S^{-1}=\begin{bmatrix}
0.443902439&-0.295121951&0.487804878\\
-0.295121951&0.306097561&-0.390243902\\
0.487804878&-0.390243902&0.975609756
\end{bmatrix}.
}
$$

To calculate it using R, type `solve(S5)`. A hand calculation could use determinants and cofactors, but that procedure is **not** required by the question, which is marked `(R)`. What you must understand is what inversion does: it adjusts the distance measure to account for the variances and correlations in the observed data. The inverse is a whole matrix, not a set of independent reciprocals.

### Step 3: understand the three-dimensional quadratic form

For a centered point $\mathbf{d}=(d_1,d_2,d_3)'$, the squared distance is

$$D_M^2=\begin{bmatrix}d_1&d_2&d_3\end{bmatrix}S^{-1}\begin{bmatrix}d_1\\d_2\\d_3\end{bmatrix}.$$

If we denote the entries of $S^{-1}$ as $a_{jk}$, we can expand the multiplication:

$$\boxed{D_M^2=a_{11}d_1^2+a_{22}d_2^2+a_{33}d_3^2+2a_{12}d_1d_2+2a_{13}d_1d_3+2a_{23}d_2d_3.}$$

There are **three squared terms and three doubled cross-terms**. The cross-terms are what distinguish this calculation from a simple sum of three independently standardized differences.

The numerical coefficients in this particular problem are

$$\begin{aligned}
D_M^2
&=0.443902439\,d_1^2+0.306097561\,d_2^2+0.975609756\,d_3^2\\
&\quad-0.590243902\,d_1d_2+0.975609756\,d_1d_3-0.780487805\,d_2d_3.
\end{aligned}$$

This is simply the three-variable version of Question 3's statistical-distance formula, with the coefficients now *estimated from the current dataset*.

### Step 4: fully calculate the distance for observation 1

The first observation is $(9,12,3)'$ and the mean is $(6,8,2)'$. The deviation vector is

$$\mathbf{d}_1=\begin{bmatrix}9-6\\12-8\\3-2\end{bmatrix}=\begin{bmatrix}3\\4\\1\end{bmatrix}.$$

First multiply the inverse covariance matrix by the difference vector:

$$
\begin{aligned}
S^{-1}\mathbf{d}_1
&=\begin{bmatrix}
0.443902439&-0.295121951&0.487804878\\
-0.295121951&0.306097561&-0.390243902\\
0.487804878&-0.390243902&0.975609756
\end{bmatrix}
\begin{bmatrix}3\\4\\1\end{bmatrix}\\
&\approx\begin{bmatrix}
0.639024390\\
-0.051219512\\
0.878048780
\end{bmatrix}.
\end{aligned}
$$

Next multiply on the left by the transposed difference vector:

$$\begin{aligned}
D_{M,1}^2
&=\begin{bmatrix}3&4&1\end{bmatrix}
\begin{bmatrix}0.639024390\\-0.051219512\\0.878048780\end{bmatrix}\\
&=3(0.639024390)+4(-0.051219512)+1(0.878048780)\\
&=1.917073171-0.204878049+0.878048780\\
&\approx\boxed{2.590243902}.
\end{aligned}$$

Finally,

$$\boxed{D_{M,1}=\sqrt{2.590243902\ldots}\approx1.609423.}$$

Notice that the squared Mahalanobis distance, $2.5902$, is **not** the Euclidean distance from the mean. It has already been adjusted for the sample covariance.

### Step 5: repeat for the other four observations

The centered rows, calculated in Part (a), are $(3,4,1)$, $(-4,0,2)$, $(0,-2,-2)$, $(-1,-4,0)$, and $(2,2,-1)$. We apply **the same** inverse covariance matrix to each one.

| Observation $i$ | Centered vector $\mathbf{d}_i$ | $D_{M,i}^2$ | $D_{M,i}$ |
| --- | ---: | ---: | ---: |
| 1 | $(3,\ 4,\ 1)$ | 2.590243902 | 1.609423469 |
| 2 | $(-4,\ 0,\ 2)$ | 3.200000000 | 1.788854382 |
| 3 | $(0,\ -2,\ -2)$ | 2.004878049 | 1.415937163 |
| 4 | $(-1,\ -4,\ 0)$ | 2.980487805 | 1.726408933 |
| 5 | $(2,\ 2,\ -1)$ | 1.224390244 | 1.106521687 |
| **Check: total** |  | **12** |  |


The largest sample Mahalanobis distance from the mean is observation 2, $(2,8,4)$, at approximately **1.788854**; the smallest is observation 5, $(8,10,1)$, at approximately **1.106522**. These rankings refer only to their positions relative to this **five-observation sample** and its own covariance matrix. They do not constitute a formal outlier test, especially with so little data.

**Useful internal check:** As in Question 4, the sum of the **squared** distances to the sample mean equals $(n-1)p=4\times3=\boxed{12}$ when $S$ is the sample covariance matrix and is invertible. The five entries in the table add to exactly $12$ before rounding.

### R code for Part (c)

```r
v1 <- c(9, 2, 6, 5, 8)
v2 <- c(12, 8, 6, 4, 10)
v3 <- c(3, 4, 0, 2, 1)
X5 <- cbind(v1, v2, v3)

mean5 <- colMeans(X5)
S5 <- cov(X5)
S5_inverse <- solve(S5)

MD5_squared <- mahalanobis(X5, center = mean5, cov = S5)
MD5 <- sqrt(MD5_squared)

S5_inverse
MD5_squared
MD5
sum(MD5_squared)
```

Line-by-line:

1. The first three lines define the variables, and `cbind()` forms the required $5\times3$ data matrix.
2. `mean5 <- colMeans(X5)` computes $(6,8,2)$.
3. `S5 <- cov(X5)` computes the covariance matrix from Part (a).
4. `S5_inverse <- solve(S5)` calculates its inverse so you can inspect and compare it with the hand-derived matrix.
5. `mahalanobis(X5, center = mean5, cov = S5)` returns five **squared** distances. R does **not** automatically take square roots.
6. `MD5 <- sqrt(MD5_squared)` produces the five distances actually asked for.
7. The print commands show the intermediate and final results.
8. `sum(MD5_squared)` should be approximately $12$. This acts as a strong arithmetic consistency check for this particular sample-centered calculation.

## Part (d): Mahalanobis distance between $(9,12,3)$ and $(5,4,2)$

This part uses the *same covariance matrix $S$* as in Part (c), but a different difference vector. Instead of subtracting the mean, subtract the second point from the first:

$$\begin{aligned}
\boldsymbol{\Delta}
&=\begin{bmatrix}9\\12\\3\end{bmatrix}-\begin{bmatrix}5\\4\\2\end{bmatrix}\\
&=\begin{bmatrix}4\\8\\1\end{bmatrix}.
\end{aligned}$$

### Step 1: calculate $S^{-1}\boldsymbol{\Delta}$

$$
\begin{aligned}
S^{-1}\boldsymbol{\Delta}
&=\begin{bmatrix}
0.443902439&-0.295121951&0.487804878\\
-0.295121951&0.306097561&-0.390243902\\
0.487804878&-0.390243902&0.975609756
\end{bmatrix}
\begin{bmatrix}4\\8\\1\end{bmatrix}\\
&\approx\begin{bmatrix}
-0.097560976\\
0.878048780\\
-0.195121951
\end{bmatrix}.
\end{aligned}
$$

### Step 2: calculate the squared distance

$$\begin{aligned}
D_M^2
&=\boldsymbol{\Delta}'S^{-1}\boldsymbol{\Delta}\\
&=4(-0.097560976)+8(0.878048780)+1(-0.195121951)\\
&=-0.390243902+7.024390244-0.195121951\\
&=\boxed{\frac{264}{41}}\\
&\approx\boxed{6.439024390}.
\end{aligned}$$

### Step 3: take the square root

$$\boxed{D_M=\sqrt{264/41}\approx2.537523.}$$

This is **the answer to Part (d)**. It differs from the corresponding **Euclidean distance $9$** in Part (b), because Euclidean and Mahalanobis distances represent distinct measurements of separation.

### R verification for Part (d)

```r
point_A <- c(9, 12, 3)
point_B <- c(5, 4, 2)
difference <- point_A - point_B

MD_squared <- drop(t(difference) %*% solve(S5) %*% difference)
MD <- sqrt(MD_squared)

MD_squared
MD
```

- `point_A` and `point_B` are the exact observations named in the question.
- `difference` is $(4,8,1)$.
- `t(difference)` is a one-row matrix for multiplication on the left.
- `solve(S5)` supplies the inverse covariance matrix estimated using **all five observations**.
- `%*%` means ordinary matrix multiplication, not elementwise multiplication.
- `drop()` converts the $1\times1$ matrix to one number.
- `sqrt()` converts the squared distance into the required Mahalanobis distance.

**Independent numerical check:** the squared distance should be $\approx6.439024390$ and the distance $\approx2.537523279$.

### Additional geometric insight: why the Mahalanobis answers can be surprising

You might be tempted to rank points by how large their raw coordinates are. That is not what Mahalanobis distance measures. It asks: *How unusual is the direction and size of this departure relative to the variability of the whole measured sample?* A variable with large natural spread receives less emphasis for the same raw change, while correlations influence combinations of changes. For example, if $X_1$ and $X_2$ usually rise together, a point where one rises and the other drops may be more unusual than its Euclidean length suggests.

In three dimensions the “cloud” is a three-dimensional ellipsoid rather than a flat ellipse. The covariance matrix determines its orientation and how stretched it is along different directions. Mahalanobis distance effectively puts that cloud onto a standardized scale before measuring separation.

This is still a *description of the five observed measurements*, not evidence that a particular underlying population is multivariate normal. Neither multivariate normality nor independence of measurements was established in this worksheet; those are later statistical topics.

### Question 5: mistakes to avoid

- Do not stop after constructing $S$: Part (a) also asks for the **correlation matrix** $R$.
- Do not forget the three additional cross-covariances when moving from two variables to three.
- Do not omit the third variable when computing Euclidean or Mahalanobis distances.
- Do not use $5$ as the denominator of the **sample** covariance; use $n-1=4$.
- Do not turn negative covariances into positives merely because variances must be nonnegative.
- Do not confuse the square-rooted Mahalanobis distances with the squared distances returned by R.
- Do not replace the data-derived inverse covariance by an identity matrix; doing so would silently change Mahalanobis distance into Euclidean distance.



# Common misconceptions and the bigger picture

## 1. “Variance and covariance are the same thing”

They are related but distinct. **Variance** describes the spread of *one* variable around its own average. **Covariance** describes whether *two* variables move above and below their respective averages together. Covariance of a variable with itself equals its variance, but covariance between different variables can be positive, negative, or zero.

## 2. “A negative covariance means something is wrong”

Not at all. A negative covariance can be the natural pattern we expect, as with age and price for the used-car observations. Covariance only communicates direction and joint numerical variation; it is not a quality rating of the observations.

## 3. “The correlation coefficient tells us the slope”

A correlation is unitless and is bounded between $-1$ and $1$. A regression slope has meaningful units, such as thousands of dollars per year. They are not interchangeable. In simple linear regression, the estimated slope is $s_{12}/s_{11}$, not $r_{12}$, unless the variables have been standardized appropriately. The slope formula is supplementary context, not a calculation requested in this worksheet.

## 4. “Correlation close to zero means the variables are completely unrelated”

Not necessarily. Two variables can have a strong *curved* relationship while showing weak linear correlation. Correlation summarizes linear association. A scatter plot is important because it can reveal curvature, separate clusters, and unusual observations that a single number cannot show.

## 5. “The mean vector is one big average of everything”

No. The mean vector retains the average of **each variable separately**, preserving the meaning of each column. Averaging car ages with car prices would not produce a meaningful statistic.

## 6. “Mahalanobis distance is ordinary distance with different notation”

Euclidean distance measures the raw geometric length of a difference vector, while Mahalanobis distance measures that length after adjusting for the spread and correlation of the reference data. A useful special case illustrates the distinction: if the covariance matrix is the identity matrix $I$ (ones on the diagonal, zeros elsewhere), then $I^{-1}=I$ and Mahalanobis distance **does** reduce to Euclidean distance. Otherwise the two usually differ.

## 7. “Once we have $S$, every sample will give a valid Mahalanobis inverse”

No. The covariance matrix must be invertible for the ordinary inverse-based formula to work. If one variable is an exact linear combination of others, the covariance matrix may be singular. A sample with too few observations relative to the number of variables can also prevent inversion. In these exercises, the two matrices for Questions 4 and 5 are invertible. In real analyses, we should inspect whether the covariance estimate is stable, especially when $n$ is small compared with $p$.

## 8. “Software results are automatically the requested quantities”

Software is precise about its **functions**, not necessarily about what an examination question means. In R, `cov()` and `var()` use the sample denominator $n-1$. `dist()` calculates row-to-row Euclidean distances, while `mahalanobis()` produces **squared** Mahalanobis distances. Reading the function documentation and checking the result's units and definition are part of correct statistical work.

## 9. “We can draw conclusions about a population from these calculations”

These questions mainly involve *descriptive statistics* and *geometric distances*, not formal population inference. They do not ask for p-values, confidence intervals, normality tests, or claims that the observations were randomly sampled. The sample correlations and distances describe the displayed observations. Population-level generalizations would require additional assumptions and methods introduced later in the course.

## 10. A conceptual map linking all five questions

1. **Question 1:** Arrange multiple variables, find their centers, spreads, covariance and correlation.
2. **Question 2:** See a paired relationship visually, then quantify it numerically; separate marginal distributions from joint association.
3. **Question 3:** Understand that the meaning of distance depends on the chosen measurement rule.
4. **Question 4:** Estimate covariance from a two-variable dataset and use it to define Mahalanobis distances.
5. **Question 5:** Generalize the same ideas to three variables and a full $3\times3$ covariance structure.

Together these form the foundation for later subjects such as multivariate normal distributions, PCA, factor analysis, multivariate hypothesis testing, and classification. Those later methods rely on the same data organization, mean vectors, covariance matrices, and quadratic distances.



# One-piece R verification script

This self-contained block reproduces the principal quantities for **all five questions**. It uses **base R only**, so it does not require installing additional statistical packages. It computes and prints results from the exact data in the original PDF. The numerical results in this guide were verified independently from the data and are not presented as an R execution log.

```r
# Question 1: bookstore receipts
Q1 <- cbind(sales = c(42, 52, 48, 58),
            books = c(4, 5, 4, 3))
cat("\nQUESTION 1\n")
print(Q1)
print(colMeans(Q1))
print(cov(Q1))
print(cor(Q1))

# Question 2: used cars
Q2 <- cbind(age = c(1, 2, 3, 3, 4, 5, 6, 8, 9, 11),
            price = c(18.95, 19, 17.95, 15.54, 14, 12.95,
                      8.94, 7.49, 6, 3.99))
cat("\nQUESTION 2\n")
print(colMeans(Q2))
print(cov(Q2))
print(cor(Q2))
plot(Q2[, 1], Q2[, 2], pch = 19,
     xlab = "Age (years)", ylab = "Price (thousand dollars)",
     main = "Q2: age and price")
stripchart(Q2[, 1], method = "stack", pch = 19,
           main = "Q2: age dot plot", xlab = "Age")
stripchart(Q2[, 2], method = "stack", pch = 19,
           main = "Q2: price dot plot", xlab = "Price")

# Question 3: two distance rules
P <- c(-1, -1)
Q <- c(1, 0)
A <- matrix(c(1/3, 1/9,
              1/9, 4/27), nrow = 2, byrow = TRUE)
delta3 <- P - Q
cat("\nQUESTION 3\n")
print(sqrt(sum(delta3^2)))
print(sqrt(drop(t(delta3) %*% A %*% delta3)))

# Question 4: eight observations, two variables
Q4 <- cbind(X1 = c(-6, -3, -2, 1, 2, 5, 6, 8),
            X2 = c(-2, -3, 1, -1, 2, 1, 5, 3))
mean4 <- colMeans(Q4)
S4 <- cov(Q4)
MD4_squared <- mahalanobis(Q4, center = mean4, cov = S4)
z4 <- c(-2, 1) - c(6, 5)
cat("\nQUESTION 4\n")
plot(Q4[, 1], Q4[, 2], pch = 19, xlab = "X1", ylab = "X2",
     main = "Q4: scatter diagram")
text(Q4[, 1], Q4[, 2], labels = 1:nrow(Q4), pos = 3)
print(as.matrix(dist(Q4)))
print(mean4)
print(S4)
print(solve(S4))
print(sqrt(MD4_squared))
print(sqrt(drop(t(z4) %*% solve(S4) %*% z4)))
stopifnot(isTRUE(all.equal(sum(MD4_squared), 14)))

# Question 5: five observations, three variables
Q5 <- cbind(X1 = c(9, 2, 6, 5, 8),
            X2 = c(12, 8, 6, 4, 10),
            X3 = c(3, 4, 0, 2, 1))
mean5 <- colMeans(Q5)
S5 <- cov(Q5)
MD5_squared <- mahalanobis(Q5, center = mean5, cov = S5)
z5 <- c(9, 12, 3) - c(5, 4, 2)
cat("\nQUESTION 5\n")
print(mean5)
print(S5)
print(cor(Q5))
print(as.matrix(dist(Q5)))
print(solve(S5))
print(sqrt(MD5_squared))
print(sqrt(drop(t(z5) %*% solve(S5) %*% z5)))
stopifnot(isTRUE(all.equal(sum(MD5_squared), 12)))

cat("\nAll numerical checks in this script have finished.\n")
```

### How to read and use the script

R executes the commands **from top to bottom**. Each `Q1`, `Q2`, `Q4`, and `Q5` object is a data matrix whose rows are observations. The `#` symbol starts an R comment; comments describe the code and are ignored by R. Each `cat()` command prints a clearly labeled section heading; the escaped `\n` represents a newline. Each `print()` displays a computed result.

The script uses `all.equal()` inside `stopifnot()` for a numerical consistency check, with tolerance for very small floating-point rounding differences. If the check failed, R would stop with an error rather than silently reporting an incorrect result. This check is appropriate because, for a nonsingular sample covariance matrix computed from the same observations, the sum of squared Mahalanobis distances from the sample mean equals $(n-1)p$.

To compare printed values with the tables in this guide, remember that `sqrt(mahalanobis(...))` is required for unsquared distances. Printing fewer or more digits does not change the underlying calculation. In R, `round(value, 6)` is useful for displaying six decimal places, but keep the original unrounded values for subsequent calculations.



# Self-check exercises and final answer checklist

## Quick self-checks, with explanations

**1. What does a $5\times3$ data matrix mean?** Five observed cases, each measured on three variables. It does *not* mean five variables and three cases.

**2. Why does Question 1 use $4-1=3$ in the variance denominator?** Because the question requests the usual **sample** variance. Calculating the sample mean consumes one degree of freedom, leaving $n-1$.

**3. Why is Question 2's covariance negative?** As ages increase, listed prices generally decrease. The paired deviations from their averages usually have opposite signs, generating negative covariance products.

**4. Can a variance be negative? Can covariance be negative?** Variance cannot be negative because it averages squares. Covariance can be negative because the products of two different deviations may be negative.

**5. What is the difference between $S$ and $R$?** The covariance matrix $S$ holds variances and covariances in their measurement units. The correlation matrix $R$ standardizes those relationships and has diagonal entries of $1$.

**6. What are the two distances in Question 3?** Euclidean $\sqrt5\approx2.2361$ and the supplied weighted statistical distance $\sqrt{52/27}\approx1.3878$.

**7. How many distinct pairs are in Question 4 and Question 5?** $\binom82=28$ and $\binom52=10$ respectively.

**8. If R returns `mahalanobis(X, mean, S)` equal to $4$, what distance should we report?** The **squared** distance is $4$; the Mahalanobis distance is $\sqrt4=2$.

**9. Why do we use the covariance matrix for *all* observations when calculating Question 4(d)?** Because the point-to-point Mahalanobis distance is defined relative to the reference distribution or data cloud. The question supplies the eight-point dataset whose sample covariance gives that reference scale.

**10. Is the strongest correlation in the worksheet evidence of causation?** No. Question 2's $r\approx-0.9783$ describes a strong observed linear association, not a controlled causal experiment.

## Compact numerical answer checklist

The longer sections above explain the full derivations. This table is only a **last-minute check**, not a replacement for the teaching explanations.

| Item | Main results | Source status |
|---|---|---|
| Q1(a) | $X$ is the $4\times2$ bookstore matrix given above | Source-provided |
| Q1(b) | $\bar{x}=(50,4)'$; $s_{11}=45.333333$; $s_{22}=0.666667$; $s_{12}=-2$; $r_{12}\approx-0.363803$ | Source-provided, with clarified correlation substitution |
| Q1(c) | $S=\begin{bmatrix}45.333333&-2\\-2&0.666667\end{bmatrix}$; $R=\begin{bmatrix}1&-0.363803\\-0.363803&1\end{bmatrix}$ | Source-provided |
| Q2(a–b) | Downward scatter pattern; covariance **negative** | Independently interpreted |
| Q2(c–d) | $\bar{x}=(5.2,12.481)'$; $s_{11}=10.622222$; $s_{22}=30.854366$; $s_{12}=-17.710222$; $r_{12}\approx-0.978268$ | Independently calculated |
| Q3 | Euclidean $=\sqrt5\approx2.236068$; statistical $=\sqrt{52/27}\approx1.387777$ | Source-provided |
| Q4(b) | 28 distances, all in the Part (b) table | Independently calculated |
| Q4(c) | $\bar{x}=(1.375,0.75)'$; eight distances in Part (c) | Independently calculated |
| Q4(d) | $D_M^2=504/179\approx2.815642$; $D_M\approx1.677988$ | Independently calculated |
| Q5(a) | $\bar{x}=(6,8,2)'$; $S$ and $R$ as derived in Part (a) | Independently calculated |
| Q5(b) | 10 distances, all in the Part (b) table | Independently calculated |
| Q5(c) | Five Mahalanobis distances in Part (c) | Independently calculated |
| Q5(d) | $D_M^2=264/41\approx6.439024$; $D_M\approx2.537523$ | Independently calculated |

**Final learning principle:** Almost every calculation in this worksheet comes from one of four ideas: keep paired observations together, subtract the correct means, summarize those differences with squares or cross-products, and apply the requested distance rule consistently. If you understand *why* those four ideas work, you can carry them from two variables into three, five, or hundreds of variables.



**End of Practice Worksheet 01.** No material from Practice Worksheets 02–05 is included in this teaching file.
