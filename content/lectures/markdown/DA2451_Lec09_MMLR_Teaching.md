# DA2451 Lecture 09: Multivariate Multiple Linear Regression

## A complete, beginner-first textbook chapter

**Course:** DA2451, Multivariate Methods in Business  
**Primary source:** `Lec9.pdf`, *Multivariate multiple linear regression*, eight pages, headed *DA2451 – Multivariate Methods in Business, Semester 4, 2024*  
**Teaching level:** From no previous regression knowledge to the mathematical and computational level needed to understand the entire lecture  
**Software:** R, with base R and the `car` package

> **How this book uses the source.** References such as **[Lecture p. 5]** refer to the numbered pages of the attached eight-page lecture. The clinical dataset, the reported R output, the model-comparison results, and the lecturer's demonstration are reproduced and explained as lecture material. New foundational examples, full mathematical derivations, diagnostic suggestions, additional R code, numerical checks, and confidence-ellipse formulas are **teaching extensions**, not claims that the lecturer wrote them. When a source statement needs a statistical qualification, this chapter presents both the original idea and the qualification explicitly.

### The central question

Suppose a company wants to understand how advertising expenditure, store size, and employee experience relate to **monthly sales** and **customer satisfaction**. These are two outcomes, and each might be influenced by the same predictors. A normal regression can study sales alone. A second regression can study satisfaction alone. But the two outcomes may be related, and we may want to test the predictors' **joint relationship with both**.

**Multivariate multiple linear regression (MMLR)** provides a way to fit these equations together and perform inference that accounts for the relationship between their errors. Its crucial structure is:

- **More than one response (outcome) variable.**
- **A common set of predictor (explanatory) variables.**
- **One coefficient for every predictor–response combination.**
- **Joint multivariate tests when we need to evaluate effects across responses.**

The rest of the chapter builds every piece of this statement carefully.

### A map of the learning journey

| Part | What you will understand | Source connection |
|---|---|---|
| I | Why regression is needed; slopes, intercepts, fitted values, residuals, uncertainty | Foundations preceding p. 1 |
| II | Simple versus multiple versus multivariate regression; matrices, covariance, OLS | MMLR introduction, pp. 1–4 |
| III | The full 17-patient dataset and the R model; reading every important result | pp. 1–4 |
| IV | Multivariate testing, Wilks' lambda, MANOVA, nested models, hypothesis matrices | pp. 5–7 |
| V | The reduced model, simultaneous prediction, and the missing uncertainty ellipse | pp. 7–8 |
| VI | Reproducible R analysis, diagnostics, business interpretation, exercises | Lecture consolidation and extensions |

---

# Part I. Start with the real problem: learning from data

## 1. Why would anyone fit a regression model?

Imagine a shop owner who notices that stores spending more on advertising often sell more products. She would like answers to three different questions:

1. **Description:** Is there a pattern between advertising spending and sales?
2. **Explanation or association:** How much higher are sales typically associated with an additional unit of advertising spending, after considering other relevant factors?
3. **Prediction:** If a store spent a specified amount on advertising, what sales level might the data-based model predict?

A regression model is a mathematical description of how an outcome tends to change with one or more pieces of information. Its goal is not to draw a line through every observation perfectly. Its goal is to capture a useful systematic pattern **without pretending that real life has no randomness**.

For example, two stores may spend exactly the same amount on advertising but achieve different sales. Store location, staff quality, competition, weather, changing consumer preferences, luck, and measurement imperfections can all matter. Regression separates the pattern that our selected predictors can describe from the remainder it cannot explain.

### The language you must know

| Word | Plain-language meaning | Example |
|---|---|---|
| **Observation** | One recorded case | One store, patient, or student |
| **Variable** | A characteristic that can differ across cases | Sales, income, height |
| **Response**, **outcome**, **dependent variable** | The quantity we try to explain or predict | Sales |
| **Predictor**, **explanatory**, **independent variable**, **covariate** | Information used to help explain the response | Advertising spending |
| **Parameter** | An unknown number describing the population model | True advertising coefficient, \(\beta_1\) |
| **Estimate** | A number calculated from sample data to approximate a parameter | Estimated slope, \(\hat\beta_1\) |
| **Fitted value** | The model's estimated response for an observed predictor combination | Predicted sales for Store A |
| **Residual** | Actual response minus fitted response | Store A's actual sales minus its fitted sales |
| **Error term** | The unobserved deviation in the statistical model | Everything not captured by predictors |
| **Model** | A mathematical representation of a relationship | \(Y=\beta_0+\beta_1X+\varepsilon\) |

The labels *independent variable* and *dependent variable* are conventional. They do **not** automatically mean that changing a predictor causes the response to change. In an observational study, a regression coefficient is normally evidence of an **association conditional on the other modeled predictors**, not a causal effect.

## 2. How a straight line becomes a regression model

Consider the equation

\[
Y=\beta_0+\beta_1X+\varepsilon.
\]

Read each symbol slowly:

- \(Y\) is the response, for example monthly sales.
- \(X\) is a predictor, for example advertising expenditure.
- \(\beta_0\) is the **intercept**, the model's expected response when \(X=0\).
- \(\beta_1\) is the **slope**, the expected change in \(Y\) associated with a one-unit increase in \(X\).
- \(\varepsilon\) (Greek letter *epsilon*) is a random **error term**. It represents the part of the response that the line does not capture.

The plus sign before \(\varepsilon\) matters. A statistical model is **not** saying that every point lies precisely on the line. It is saying that the response fluctuates around a systematic average pattern.

If, for example,

\[
\widehat{\text{Sales}}=20+3\times\text{Advertising},
\]

then \(\widehat{\text{Sales}}\) means a fitted or predicted value. Advertising of 4 units gives \(20+3(4)=32\) predicted sales units. The slope 3 says that an additional advertising unit corresponds to **3 more predicted sales units**, within the scope of the model.

A *hat*, as in \(\hat Y\) or \(\hat\beta\), tells us that something has been **estimated from data** rather than known exactly.

### A helpful mental picture

Draw a scatterplot with advertising on the horizontal axis and sales on the vertical axis. Every store contributes a dot. The regression line represents the predicted response for each advertising value. Dots above the line have positive residuals; dots below have negative residuals. The vertical distance, with its sign, is the residual.

A line can be useful even when the dots do not fall on it perfectly.

## 3. A complete first calculation: ordinary simple linear regression

**Original teaching example, not from Lec9.pdf.** Suppose a small business records:

| Observation \(i\) | Advertising \(x_i\) | Sales \(y_i\) |
|---|---:|---:|
| 1 | 1 | 2 |
| 2 | 2 | 3 |
| 3 | 3 | 5 |
| 4 | 4 | 4 |

We want the best-fitting line

\[
\hat y_i=\hat\beta_0+\hat\beta_1x_i.
\]

### 3.1 Find the averages

The mean (average) is the sum of all observations divided by the number of observations:

\[
\bar x=\frac{1+2+3+4}{4}=2.5,
\qquad
\bar y=\frac{2+3+5+4}{4}=3.5.
\]

A bar over a variable, such as \(\bar x\), means *sample average*.

### 3.2 Measure how the variables move together

The least-squares slope formula is

\[
\boxed{\hat\beta_1=\frac{\sum_{i=1}^{n}(x_i-\bar x)(y_i-\bar y)}
{\sum_{i=1}^{n}(x_i-\bar x)^2}.}
\]

Here \(\sum\) (capital sigma) instructs us to *add the indicated quantity over all observations*. The symbol \(n\) is sample size, here 4.

| \(i\) | \(x_i-2.5\) | \(y_i-3.5\) | Their product | \((x_i-2.5)^2\) |
|---|---:|---:|---:|---:|
| 1 | -1.5 | -1.5 | 2.25 | 2.25 |
| 2 | -0.5 | -0.5 | 0.25 | 0.25 |
| 3 | 0.5 | 1.5 | 0.75 | 0.25 |
| 4 | 1.5 | 0.5 | 0.75 | 2.25 |
| **Total** | | | **4.00** | **5.00** |

Therefore,

\[
\hat\beta_1=\frac{4}{5}=0.8.
\]

The fitted slope is 0.8 sales units for each additional advertising unit.

### 3.3 Calculate the intercept

\[
\hat\beta_0=\bar y-\hat\beta_1\bar x=3.5-0.8(2.5)=1.5.
\]

The complete fitted line is

\[
\boxed{\hat y=1.5+0.8x.}
\]

The intercept is a mathematical baseline. Whether it is useful in the real world depends on whether zero advertising is realistic and within the data's range.

### 3.4 Calculate every fitted value and residual

\[
e_i=y_i-\hat y_i.
\]

An \(e_i\) is a **sample residual**; it is not the same object as the unknown population error \(\varepsilon_i\).

| \(i\) | Actual \(y_i\) | Calculation | Fitted \(\hat y_i\) | Residual \(e_i\) | \(e_i^2\) |
|---|---:|---|---:|---:|---:|
| 1 | 2 | \(1.5+0.8(1)\) | 2.3 | -0.3 | 0.09 |
| 2 | 3 | \(1.5+0.8(2)\) | 3.1 | -0.1 | 0.01 |
| 3 | 5 | \(1.5+0.8(3)\) | 3.9 | 1.1 | 1.21 |
| 4 | 4 | \(1.5+0.8(4)\) | 4.7 | -0.7 | 0.49 |
| **Total** | | | | **0.0** | **1.80** |

Residuals can be negative. When we judge how well a model fits, we typically **square** residuals before adding them. Squaring prevents positive and negative residuals from cancelling and penalizes large errors more strongly.

### 3.5 What exactly is ordinary least squares?

**Ordinary least squares**, abbreviated **OLS**, chooses the intercept and slope minimizing the **sum of squared errors** (also called the residual sum of squares):

\[
\operatorname{SSE}=\sum_{i=1}^{n}\left(y_i-\hat\beta_0-\hat\beta_1x_i\right)^2.
\]

Here SSE is \(1.80\). The fitted values are not arbitrary; they were chosen to make this sum as small as possible among all straight lines. For an OLS model with an intercept, residuals also sum to zero, subject to numerical rounding.

### 3.6 How much variation did the line explain?

First measure the response's variation around its own average:

\[
\operatorname{SST}=\sum_{i=1}^n(y_i-\bar y)^2
=2.25+0.25+2.25+0.25=5.00.
\]

The coefficient of determination is

\[
R^2=1-\frac{\operatorname{SSE}}{\operatorname{SST}}
=1-\frac{1.8}{5}=\boxed{0.64}.
\]

**Interpretation:** In this sample, the linear model accounts for 64% of the variation in sales about its sample mean. This does not mean that advertising *caused* 64% of sales or that the predictions are 64% accurate.

### 3.7 The first critical distinction: pattern versus certainty

Our slope 0.8 comes from **four** observations. A different set of stores might give a different slope. Statistical inference is about deciding how much confidence we should place in what we learned from a sample. This uncertainty becomes especially important when there are **several outcomes and several coefficients**.

## 4. Multiple linear regression: several predictors, one response

A business seldom depends on only one input. Sales might be associated with advertising, store size, and staff experience simultaneously. We can write

\[
Y_i=\beta_0+\beta_1X_{i1}+\beta_2X_{i2}+\beta_3X_{i3}+\varepsilon_i.
\]

Each extra \(\beta\) is a separate coefficient. A model with several predictor terms is called **multiple linear regression**.

### 4.1 What does *holding the other variables constant* mean?

Suppose the fitted equation is

\[
\widehat{\text{Sales}}=12+2\,\text{Advertising}+0.5\,\text{StoreSize}.
\]

To interpret the coefficient 2, compare two stores with the **same modeled store size**, but advertising values one unit apart. The fitted sales differ by 2. The store-size coefficient 0.5 similarly compares stores with the same advertising level and store sizes one unit apart.

This is a **conditional association**. It does not guarantee that we have controlled for every real-world difference between stores.

### 4.2 The intercept and units still matter

- Every response has its own measurement unit, for example dollars, points, or plasma-level units.
- A predictor can be measured in dollars, years, minutes, or another unit.
- A coefficient's unit is **response units per one predictor unit**.
- Changing a predictor's measurement unit changes its numerical coefficient but not the fitted relationship.
- An intercept can be negative even when the actual response cannot be negative, particularly if zero values of all predictors are outside the observed data range.

### 4.3 A predictor can be a category

The lecture later uses `GEN = 0` for male and `GEN = 1` for female [Lecture p. 1]. A 0/1 variable is called a **dummy** or **indicator variable**.

If a model includes \(500\times\text{GEN}\), then the fitted outcome for GEN = 1 is 500 units higher than for GEN = 0 **at the same values of the other predictors**. The code 1 is not a numeric amount of gender; it marks a category. The designation of the reference category matters.

This is a description of the fitted data relationship, not evidence of any biological or causal explanation.

## 5. The most important terminology in this chapter

Students often confuse these models because the words *multiple* and *multivariate* sound similar. Keep the **number of response variables** separate from the **number of predictors**.

| Model | Number of response variables | Number of predictor variables | Example |
|---|---:|---:|---|
| **Simple linear regression** | 1 | 1 | Sales explained by advertising |
| **Multiple linear regression** | 1 | 2 or more | Sales explained by advertising, price, store size |
| **Multivariate simple linear regression** | 2 or more | 1 | Sales and satisfaction both explained by advertising |
| **Multivariate multiple linear regression (MMLR)** | 2 or more | 2 or more | Sales and satisfaction explained by advertising, price, and store size |

In practice, the phrase *multivariate multiple regression* often refers broadly to a **multiple-response linear regression with a common design matrix**, even if a particular example has only one explanatory predictor. The key fact in this lecture is **multiple response variables**, not merely many predictor variables.

### 5.1 Three equations that make the distinction impossible to miss

**Simple linear regression:**

\[
\underbrace{Y}_{\text{one response}}=\beta_0+\beta_1\underbrace{X_1}_{\text{one predictor}}+\varepsilon.
\]

**Multiple linear regression:**

\[
\underbrace{Y}_{\text{one response}}=\beta_0+\beta_1X_1+\beta_2X_2+\beta_3X_3+\varepsilon.
\]

**MMLR with two responses and three predictors:**

\[
\begin{aligned}
Y_1&=\beta_{01}+\beta_{11}X_1+\beta_{21}X_2+\beta_{31}X_3+\varepsilon_1,\\
Y_2&=\beta_{02}+\beta_{12}X_1+\beta_{22}X_2+\beta_{32}X_3+\varepsilon_2.
\end{aligned}
\]

Notice the two subscripts on a coefficient. For example, \(\beta_{21}\) is the coefficient of predictor 2 in the equation for response 1, and \(\beta_{22}\) is the coefficient of predictor 2 in the equation for response 2. The two error terms \(\varepsilon_1\) and \(\varepsilon_2\) may be related because both outcomes were recorded for the same observation.

**Checkpoint:** If you predict *two examination scores* from *five personal and family characteristics*, you have **two responses** and **five predictors**. It is a multivariate multiple regression problem. If you predict only mathematics scores from those five predictors, it is ordinary multiple regression.

## 6. What does *multivariate* add?

The lecture opens with an example of predicting **Mathematics and English scores** using the same characteristics, such as gender, race, and parental income [Lecture p. 1]. Its actual numerical demonstration uses two plasma-level responses from hospital patients. In both cases, the idea is identical: one observation contains a **pair of outcomes**, and the two outcomes might fluctuate together.

Why care about this pairing?

Suppose a marketing action is associated with both sales and satisfaction. If the unexplained parts of sales and satisfaction are also associated, then the uncertainty in their fitted effects is connected. Two separate univariate tests may not give a reliable answer to a **single joint question** such as:

> Does advertising provide any additional information about the pair (sales, satisfaction), after the other predictors are included?

MMLR uses multiple regression equations for fitting, and **multivariate inference** for questions involving the response vector as a whole. This is the central message of [Lecture pp. 1, 3–6].

---

# Part II. The statistical and mathematical foundation of MMLR

## 7. The three different forms of variability

To understand multivariate testing, first distinguish three ideas.

**Variance** asks: *How much does one quantity vary around its mean?* If sales values are all nearly identical, variance is small. If sales values are widely spread, variance is large.

**Covariance** asks: *Do two quantities tend to move together?* Positive covariance means above-average values of one tend to accompany above-average values of the other. Negative covariance means above-average values of one tend to accompany below-average values of the other. Near-zero covariance indicates little **linear** co-movement, not necessarily complete independence.

**Correlation** rescales covariance into a unit-free measure from -1 to +1, making association strengths easier to compare.

For \(n\) paired observations \((a_i,b_i)\), sample covariance is

\[
s_{ab}=\frac{1}{n-1}\sum_{i=1}^n(a_i-\bar a)(b_i-\bar b).
\]

For one variable, the sample variance is

\[
s_a^2=\frac{1}{n-1}\sum_{i=1}^n(a_i-\bar a)^2,
\qquad
s_a=\sqrt{s_a^2}.
\]

The symbols mean:

- \(a_i,b_i\): the two recorded values for observation \(i\).
- \(\bar a,\bar b\): their respective sample means.
- \(s_a^2\): the sample variance of \(a\).
- \(s_a\): the sample standard deviation, measured in the original units.
- \(n-1\): a degrees-of-freedom adjustment when estimating population variance from sample deviations around an estimated mean.

Correlation is

\[
r_{ab}=\frac{s_{ab}}{s_as_b}.
\]

**Small example:** Let \(a=(1,2,3)\) and \(b=(2,4,6)\). Their means are 2 and 4. Their sample covariance is

\[
s_{ab}=\frac{(-1)(-2)+0(0)+(1)(2)}{3-1}=\frac{4}{2}=2.
\]

Here \(s_a^2=1\), \(s_b^2=4\), so \(s_a=1\), \(s_b=2\), and \(r_{ab}=2/(1\cdot2)=1\). The two variables move perfectly together in a straight-line pattern.

### 7.1 The covariance matrix

When there are two response variables, the covariance information is conveniently organized into a matrix:

\[
\boldsymbol\Sigma=
\begin{bmatrix}
\sigma_1^2&\sigma_{12}\\
\sigma_{12}&\sigma_2^2
\end{bmatrix}.
\]

A **matrix** is a rectangular grid of numbers.

- The upper-left and lower-right entries are the variances of responses 1 and 2.
- The two off-diagonal entries are their covariance. They agree because covariance is symmetric.
- The bold capital \(\boldsymbol\Sigma\) (sigma) stands for the population covariance matrix. A sample estimate is often written \(\hat{\boldsymbol\Sigma}\) or \(\mathbf S\).

**Important:** In regression, we especially care about the covariance of the **errors or residuals after accounting for predictors**, not only the raw covariance of the two responses. This residual covariance is the link between the regression equations.

## 8. A crash course in vectors and matrices, without unnecessary mystery

A **vector** is an ordered list of numbers. We can stack the responses for one person vertically:

\[
\mathbf y_i=
\begin{bmatrix}
\text{TOT}_i\\
\text{AMI}_i
\end{bmatrix}.
\]

This vector has **two rows and one column**, so its dimension is \(2\times1\). A superscript \(\mathsf T\) means **transpose**, which swaps rows and columns:

\[
\begin{bmatrix}a&b\end{bmatrix}^{\mathsf T}
=\begin{bmatrix}a\\b\end{bmatrix}.
\]

A \(2\times2\) matrix, such as

\[
\mathbf A=\begin{bmatrix}1&2\\3&4\end{bmatrix},
\]

has two rows and two columns. To multiply a \(1\times3\) row by a \(3\times2\) matrix, multiply matching entries and add for each result:

\[
\begin{bmatrix}1&2&3\end{bmatrix}
\begin{bmatrix}10&20\\1&4\\2&5\end{bmatrix}
=
\begin{bmatrix}
1(10)+2(1)+3(2)&1(20)+2(4)+3(5)
\end{bmatrix}
=\begin{bmatrix}18&43\end{bmatrix}.
\]

The **inner dimensions must match**: \((1\times3)(3\times2)\) is valid and produces \(1\times2\).

The identity matrix \(\mathbf I\) has ones on its diagonal and zeros elsewhere. A matrix inverse \(\mathbf A^{-1}\), if it exists, satisfies \(\mathbf A^{-1}\mathbf A=\mathbf I\). A determinant, denoted \(|\mathbf A|\) or \(\det(\mathbf A)\), is a number that summarizes a square matrix's scaling of geometric volume or area. For a \(2\times2\) matrix,

\[
\left|\begin{bmatrix}a&b\\c&d\end{bmatrix}\right|=ad-bc.
\]

We will use these elementary operations to calculate Wilks' lambda exactly as the lecturer does [Lecture pp. 6–7].

## 9. Write the MMLR model for one observation

Suppose there are \(q\) responses and \(s\) predictors. For observation \(i\), write

\[
\boxed{\mathbf y_i^{\mathsf T}=\mathbf x_i^{\mathsf T}\mathbf B+\boldsymbol\varepsilon_i^{\mathsf T}.}
\]

The symbols mean:

- \(i=1,2,\ldots,n\): observation number.
- \(n\): number of observations.
- \(q\): number of response variables (for the lecture, \(q=2\)).
- \(s\): number of predictor variables (full model, \(s=5\)).
- \(k=s+1\): number of regression coefficients **per response**, including the intercept.
- \(\mathbf x_i^{\mathsf T}\): a \(1\times k\) row containing a leading 1 for the intercept followed by predictor values.
- \(\mathbf B\): the \(k\times q\) population coefficient matrix.
- \(\mathbf y_i^{\mathsf T}\): the \(1\times q\) row of recorded responses.
- \(\boldsymbol\varepsilon_i^{\mathsf T}\): the \(1\times q\) row of model errors.

The leading 1 in \(\mathbf x_i^{\mathsf T}\) is how a matrix represents an intercept, because \(1\times\beta_0=\beta_0\).

### 9.1 The coefficient matrix tells the whole story

For **two responses** and **two predictors**, the matrix is

\[
\mathbf B=
\begin{bmatrix}
\beta_{01}&\beta_{02}\\
\beta_{11}&\beta_{12}\\
\beta_{21}&\beta_{22}
\end{bmatrix}.
\]

Read it **column by column**:

- Column 1 holds the intercept and coefficients for response 1.
- Column 2 holds the intercept and coefficients for response 2.
- Row 1 holds the two response-specific intercepts.
- Row 2 holds the two coefficients for predictor 1.
- Row 3 holds the two coefficients for predictor 2.

For an observation with predictor values \(x_1=4\) and \(x_2=7\),

\[
\begin{bmatrix}1&4&7\end{bmatrix}\mathbf B
=
\begin{bmatrix}
\beta_{01}+4\beta_{11}+7\beta_{21}&
\beta_{02}+4\beta_{12}+7\beta_{22}
\end{bmatrix}.
\]

One row of input data therefore produces **two fitted responses**.

## 10. Stack the whole sample: the key matrix equation

For all \(n\) observations, the model is

\[
\boxed{\mathbf Y=\mathbf X\mathbf B+\mathbf U.}
\]

We will use \(\mathbf U\) for the true unobserved error matrix to avoid confusing it with \(\mathbf E\), which the lecture later reserves for an **error sum-of-squares-and-products matrix**.

| Matrix | What it contains | Dimensions for general MMLR | Dimensions for lecture's full model |
|---|---|---|---|
| \(\mathbf Y\) | Recorded response values | \(n\times q\) | \(17\times2\) |
| \(\mathbf X\) | A column of ones and all predictor values | \(n\times k\) | \(17\times6\) |
| \(\mathbf B\) | Unknown coefficients | \(k\times q\) | \(6\times2\) |
| \(\mathbf U\) | Unobserved model errors | \(n\times q\) | \(17\times2\) |
| \(\widehat{\mathbf B}\) | Estimated coefficient matrix | \(k\times q\) | \(6\times2\) |
| \(\widehat{\mathbf Y}\) | Fitted values | \(n\times q\) | \(17\times2\) |
| \(\mathbf R\) | Observed residuals, \(\mathbf Y-\widehat{\mathbf Y}\) | \(n\times q\) | \(17\times2\) |

Check the dimensions for multiplication:

\[
\underbrace{\mathbf X}_{17\times6}
\underbrace{\mathbf B}_{6\times2}
=\underbrace{\mathbf X\mathbf B}_{17\times2}.
\]

That is exactly the shape of \(\mathbf Y\). The model can predict 17 **pairs** of response values.

## 11. How are MMLR coefficients estimated?

For one response, OLS minimizes squared residuals. For \(q\) responses, we can minimize the **total squared residuals across all response columns**:

\[
L(\mathbf B)=\operatorname{tr}\!\left[(\mathbf Y-\mathbf X\mathbf B)^{\mathsf T}
(\mathbf Y-\mathbf X\mathbf B)\right].
\]

Here \(\operatorname{tr}\) means **trace**, the sum of the diagonal entries of a square matrix. The trace above adds every squared residual in every response column.

Expanding this objective and differentiating with respect to \(\mathbf B\) gives the **normal equations**

\[
\mathbf X^{\mathsf T}\mathbf X\widehat{\mathbf B}=\mathbf X^{\mathsf T}\mathbf Y.
\]

If the columns of \(\mathbf X\) are linearly independent (there is no exact redundancy among predictors), then \(\mathbf X^{\mathsf T}\mathbf X\) is invertible and

\[
\boxed{\widehat{\mathbf B}=(\mathbf X^{\mathsf T}\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf Y.}
\]

This is the main estimation formula. It is an **instruction for computing all response-specific slopes at once**.

### 11.1 Every symbol in the estimation formula

- \(\widehat{\mathbf B}\): estimated coefficient matrix.
- \(\mathbf X^{\mathsf T}\): the transpose of the predictor matrix.
- \(\mathbf X^{\mathsf T}\mathbf X\): a \(k\times k\) matrix of predictor cross-products.
- \((\mathbf X^{\mathsf T}\mathbf X)^{-1}\): its inverse, when it exists.
- \(\mathbf X^{\mathsf T}\mathbf Y\): a \(k\times q\) matrix relating predictor columns to each response column.
- The product has dimensions \((k\times k)(k\times n)(n\times q)=k\times q\).

**Numerical computing note:** In practical software, it is generally preferable to solve a least-squares system using QR decomposition or another stable method rather than explicitly constructing the inverse. R's `lm()` uses numerical methods designed for this purpose.

### 11.2 Why fitting separately gives exactly the same coefficients

Let \(\mathbf Y=[\mathbf y_1\ \mathbf y_2]\), with each \(\mathbf y_j\) being an \(n\times1\) response column. Then

\[
\begin{aligned}
\widehat{\mathbf B}
&=(\mathbf X^{\mathsf T}\mathbf X)^{-1}\mathbf X^{\mathsf T}
\begin{bmatrix}\mathbf y_1&\mathbf y_2\end{bmatrix}\\
&=\begin{bmatrix}
(\mathbf X^{\mathsf T}\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf y_1&
(\mathbf X^{\mathsf T}\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf y_2
\end{bmatrix}.
\end{aligned}
\]

The first column is precisely the OLS solution for response 1. The second is precisely the solution for response 2. Therefore **standard unrestrained MMLR with the same rows and predictors in each equation yields the same coefficients, fitted values, and residuals as fitting the equations separately**.

This is not merely a convenient software coincidence. It follows directly from the mathematics. The lecturer explicitly demonstrates this equivalence [Lecture pp. 1, 3–4].

**The difference appears when we ask joint inferential questions.** Because both response columns belong to the same observations, their errors can be correlated. Joint hypothesis tests take that covariance into account.

### 11.3 Residuals, fitted values, and the projection matrix

Once \(\widehat{\mathbf B}\) is known,

\[
\boxed{\widehat{\mathbf Y}=\mathbf X\widehat{\mathbf B}},
\qquad
\boxed{\mathbf R=\mathbf Y-\widehat{\mathbf Y}}.
\]

A useful optional concept is the *hat matrix*:

\[
\mathbf P_X=\mathbf X(\mathbf X^{\mathsf T}\mathbf X)^{-1}\mathbf X^{\mathsf T}.
\]

Then \(\widehat{\mathbf Y}=\mathbf P_X\mathbf Y\). The same matrix \(\mathbf P_X\) acts on **both** response columns because both models use the same predictors. The diagonal elements of \(\mathbf P_X\) measure **leverage**, or how unusual each observation's predictor combination is. Leverage is relevant when checking influential observations.

## 12. A fully worked miniature MMLR model

**Original teaching example, not from Lec9.pdf.** A small retailer records an index of marketing activity \(x\), sales index \(y_1\), and satisfaction index \(y_2\). We will deliberately use only one predictor here to make the arithmetic transparent; because there are **two responses**, the same multivariate regression principles apply. The lecture later extends this structure to five predictors.

| Store | \(x\) | Sales index \(y_1\) | Satisfaction index \(y_2\) |
|---|---:|---:|---:|
| A | 0 | 1 | 3 |
| B | 1 | 2 | 3 |
| C | 2 | 4 | 2 |
| D | 3 | 4 | 5 |
| E | 4 | 7 | 5 |

The design matrix and response matrix are

\[
\mathbf X=
\begin{bmatrix}
1&0\\1&1\\1&2\\1&3\\1&4
\end{bmatrix},
\qquad
\mathbf Y=
\begin{bmatrix}
1&3\\2&3\\4&2\\4&5\\7&5
\end{bmatrix}.
\]

The first column of \(\mathbf X\) is the intercept column. The two columns of \(\mathbf Y\) are the paired responses.

### 12.1 Calculate the cross-products

\[
\mathbf X^{\mathsf T}\mathbf X=
\begin{bmatrix}
5&10\\10&30
\end{bmatrix},
\qquad
\mathbf X^{\mathsf T}\mathbf Y=
\begin{bmatrix}
18&18\\50&42
\end{bmatrix}.
\]

For instance, the top-right entry of \(\mathbf X^{\mathsf T}\mathbf Y\) is the sum of the second response, \(3+3+2+5+5=18\). The bottom-left entry is \(0(1)+1(2)+2(4)+3(4)+4(7)=50\).

The determinant of \(\mathbf X^{\mathsf T}\mathbf X\) is \(5(30)-10(10)=50\), so the inverse exists:

\[
(\mathbf X^{\mathsf T}\mathbf X)^{-1}
=\frac{1}{50}
\begin{bmatrix}
30&-10\\-10&5
\end{bmatrix}.
\]

Now multiply:

\[
\begin{aligned}
\widehat{\mathbf B}
&=\frac{1}{50}
\begin{bmatrix}30&-10\\-10&5\end{bmatrix}
\begin{bmatrix}18&18\\50&42\end{bmatrix}\\
&=\frac{1}{50}
\begin{bmatrix}40&120\\70&30\end{bmatrix}
=\boxed{\begin{bmatrix}0.8&2.4\\1.4&0.6\end{bmatrix}}.
\end{aligned}
\]

The two fitted equations are

\[
\boxed{\hat y_1=0.8+1.4x},
\qquad
\boxed{\hat y_2=2.4+0.6x}.
\]

A one-unit higher marketing index is associated with **1.4 more fitted sales-index units** and **0.6 more fitted satisfaction-index units**. The coefficients differ by response because we are fitting two distinct patterns.

### 12.2 Calculate all fitted values and residuals

| Store | Fitted sales | Sales residual | Fitted satisfaction | Satisfaction residual |
|---|---:|---:|---:|---:|
| A | 0.8 | 0.2 | 2.4 | 0.6 |
| B | 2.2 | -0.2 | 3.0 | 0.0 |
| C | 3.6 | 0.4 | 3.6 | -1.6 |
| D | 5.0 | -1.0 | 4.2 | 0.8 |
| E | 6.4 | 0.6 | 4.8 | 0.2 |

For Store C, for example, actual sales = 4, fitted sales = 3.6, so the sales residual = \(4-3.6=0.4\). Actual satisfaction = 2, fitted = 3.6, so its satisfaction residual = \(2-3.6=-1.6\). **Each store has a vector of two residuals**, not one.

### 12.3 Compute the residual covariance explicitly

The *residual sum-of-squares-and-cross-products matrix* is

\[
\mathbf R^{\mathsf T}\mathbf R=
\begin{bmatrix}
\sum e_{i1}^2&\sum e_{i1}e_{i2}\\
\sum e_{i1}e_{i2}&\sum e_{i2}^2
\end{bmatrix}.
\]

Its three distinct entries are

\[
\begin{aligned}
\sum e_{i1}^2&=0.2^2+(-0.2)^2+0.4^2+(-1)^2+0.6^2=1.6,\\
\sum e_{i2}^2&=0.6^2+0^2+(-1.6)^2+0.8^2+0.2^2=3.6,\\
\sum e_{i1}e_{i2}&=0.2(0.6)+(-0.2)(0)+0.4(-1.6)+(-1)(0.8)+0.6(0.2)=-1.2.
\end{aligned}
\]

Thus,

\[
\mathbf R^{\mathsf T}\mathbf R=
\begin{bmatrix}1.6&-1.2\\-1.2&3.6\end{bmatrix}.
\]

There are \(n=5\) stores and \(k=2\) estimated coefficients per response. This leaves \(n-k=3\) **residual degrees of freedom**. The estimated covariance matrix is

\[
\boxed{\widehat{\boldsymbol\Sigma}
=\frac{\mathbf R^{\mathsf T}\mathbf R}{n-k}
=\begin{bmatrix}0.5333&-0.4000\\-0.4000&1.2000\end{bmatrix}.}
\]

The negative off-diagonal value says that, in this tiny sample, deviations above the fitted sales line tended to coincide with deviations below the fitted satisfaction line. **It does not mean marketing decreases satisfaction**. The estimated slopes of both equations are positive; the negative covariance describes what remains **after** their respective linear patterns have been removed.

### 12.4 Reproduce the toy calculation in R

```r
toy <- data.frame(
  x = 0:4,
  sales = c(1, 2, 4, 4, 7),
  satisfaction = c(3, 3, 2, 5, 5)
)

toy_fit <- lm(cbind(sales, satisfaction) ~ x, data = toy)
coef(toy_fit)
fitted(toy_fit)
residuals(toy_fit)
crossprod(residuals(toy_fit))
crossprod(residuals(toy_fit)) / df.residual(toy_fit)
```

You have now seen, with actual numbers, why MMLR outputs a **coefficient matrix**, a **fitted-value matrix**, a **residual matrix**, and a **residual covariance matrix**. All four will reappear in the lecturer's 17-patient example.

## 13. What assumptions does the model make?

For statistical inference, a standard fixed-design MMLR model often assumes:

\[
\mathbf y_i\mid\mathbf x_i\sim N_q\!\left(\mathbf B^{\mathsf T}\mathbf x_i,\boldsymbol\Sigma\right)
\quad\text{independently across observations }i.
\]

This formal notation means: conditional on the observed predictors, the **vector** of responses has a \(q\)-dimensional normal distribution, its mean is determined by the linear predictor, and its covariance matrix is \(\boldsymbol\Sigma\). The \(N_q\) symbol stands for a \(q\)-variate normal distribution.

For a beginner, separate this statement into manageable assumptions:

1. **Appropriate mean relationship.** Each response's conditional mean is adequately represented by the chosen linear predictor terms. Linear here means *linear in coefficients*, not necessarily that every relationship must be straight in the original predictor; polynomial or transformed predictor terms can be included.
2. **Observations are independent, or dependence is properly modeled.** The responses measured on the *same* patient can be correlated. However, the errors for **different independent patients** are not supposed to depend on one another in the ordinary model.
3. **Constant conditional error covariance.** After controlling for predictors, the covariance matrix \(\boldsymbol\Sigma\) is treated as the same for different predictor values. This is the multivariate version of constant error variance.
4. **No exact collinearity.** Predictor columns must provide enough independent information to estimate the requested coefficients. Exact duplicate predictors make the usual inverse formula fail.
5. **Multivariate normal errors for exact classical tests and regions.** The joint error vector is modeled as multivariate normal. OLS estimation itself does not need normally distributed errors, but small-sample F tests, Wilks approximations, and classical ellipse formulas rely on stronger assumptions.
6. **Adequate sample size and stable covariance estimation.** We need enough independent observations relative to the number of predictors and outcomes to estimate a nonsingular residual covariance matrix and support meaningful inference.

A useful distinction: **MMLR does not require the response variables themselves to be uncorrelated**. Their conditional covariance is exactly something the multivariate method is designed to handle. Neither does it require all predictors to be mutually uncorrelated. **Perfect** collinearity prevents unique estimation; **strong but imperfect** collinearity mainly makes estimates unstable and difficult to interpret.

### 13.1 Where normality belongs

It is the **conditional errors**, not necessarily the raw values of every predictor and response, that are assumed to be normal for the traditional finite-sample model. A categorical predictor such as GEN is plainly not normal, and that does not violate a regression normality assumption.

### 13.2 Why correlation between responses is permitted

In matrix language, if each row of \(\mathbf U\) has covariance \(\boldsymbol\Sigma\), the off-diagonal entries of \(\boldsymbol\Sigma\) can be nonzero. This means the two outcomes may be related even **after** the modeled predictors are taken into account. MMLR does not simply pretend that the two regression equations are unrelated.

---
# Part III. Reconstructing and understanding the lecturer's example

## 14. Meet the real lecture dataset [Lecture pp. 1–2]

The lecturer uses the textbook *Applied Multivariate Statistical Analysis*, sixth edition, by Richard A. Johnson and Dean W. Wichern, Exercise 7.25. The data describe **17 patients admitted to a hospital after an amitriptyline overdose**. This is an observational teaching dataset, not an experiment or a clinical decision rule.

### 14.1 Identify the responses before doing any mathematics

| Lecture abbreviation | Role | Explanation as given in the lecture |
|---|---|---|
| `TOT` | Response 1 | Total TCAD plasma level |
| `AMI` | Response 2 | Amount of amitriptyline present in TCAD plasma level |

These are both measured **outcomes**. The model produces one fitted value for `TOT` and a second fitted value for `AMI` for each patient.

### 14.2 Identify the shared predictors

| Lecture abbreviation | Role | Explanation as given in the lecture |
|---|---|---|
| `GEN` | Predictor | Gender coding: male = 0, female = 1 |
| `AMT` | Predictor | Amount of drug taken at the time of overdose |
| `PR` | Predictor | PR wave measurement |
| `DIAP` | Predictor | Diastolic blood pressure |
| `QRS` | Predictor | QRS wave measurement |

**Avoid an easy confusion:** `AMI` and `AMT` are different variables. `AMI` is **a response** describing a measured plasma level. `AMT` is **a predictor** describing the amount of drug reportedly taken. Their abbreviations are similar, but their statistical roles are not.

The notes do not specify complete units or measurement conventions for every clinical variable. Do not invent a unit or clinically meaningful cut-off from the numbers alone.

### 14.3 The complete 17-row dataset transcribed from the PDF

The first six rows are printed on [Lecture p. 1], and rows 7–17 on [Lecture p. 2]. The table below combines them into one dataset so you can reproduce the entire example without downloading the separate textbook file.

| Patient | TOT | AMI | GEN | AMT | PR | DIAP | QRS |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 3389 | 3149 | 1 | 7500 | 220 | 0 | 140 |
| 2 | 1101 | 653 | 1 | 1975 | 200 | 0 | 100 |
| 3 | 1131 | 810 | 0 | 3600 | 205 | 60 | 111 |
| 4 | 596 | 448 | 1 | 675 | 160 | 60 | 120 |
| 5 | 896 | 844 | 1 | 750 | 185 | 70 | 83 |
| 6 | 1767 | 1450 | 1 | 2500 | 180 | 60 | 80 |
| 7 | 807 | 493 | 1 | 350 | 154 | 80 | 98 |
| 8 | 1111 | 941 | 0 | 1500 | 200 | 70 | 93 |
| 9 | 645 | 547 | 1 | 375 | 137 | 60 | 105 |
| 10 | 628 | 392 | 1 | 1050 | 167 | 60 | 74 |
| 11 | 1360 | 1283 | 1 | 3000 | 180 | 60 | 80 |
| 12 | 652 | 458 | 1 | 450 | 160 | 64 | 60 |
| 13 | 860 | 722 | 1 | 1750 | 135 | 90 | 79 |
| 14 | 500 | 384 | 0 | 2000 | 160 | 60 | 80 |
| 15 | 781 | 501 | 0 | 4500 | 180 | 0 | 100 |
| 16 | 1070 | 405 | 0 | 1500 | 170 | 90 | 120 |
| 17 | 1754 | 1520 | 1 | 3000 | 180 | 0 | 129 |

Two immediate observations: there are **17 rows**, and there are **7 recorded variables** in each row, of which 2 are responses and 5 are predictors. The dataset has no missing entries in the printed table. The values `DIAP = 0` occur several times. In an applied analysis, a clinical expert should verify whether such values are actual measurements, missing-value codes, or unusual records before interpreting the fitted model. Do **not** silently convert or delete them for the lecture replication, because doing so would change the reported output.

## 15. Read the data into R [Lecture pp. 1–2]

The lecturer's original code, with source-extraction spacing normalized, is:

```r
data <- read.table("datasets/T7-6.dat")
names(data) <- c("TOT", "AMI", "GEN", "AMT", "PR", "DIAP", "QRS")
data
```

### 15.1 What every command does

- `data <- ...`: the left-arrow assignment operator stores the result under the name `data`.
- `read.table(...)`: reads a rectangular plain-text table into R. Without `header = TRUE`, R treats the first row as data.
- `"datasets/T7-6.dat"`: the file path used in the lecturer's environment. R searches relative to its **current working directory**. The lecture does not include this `.dat` file as an attached separate file.
- `names(data) <- c(...)`: assigns seven column names. `c()` constructs a vector of values, here seven names.
- Typing `data` by itself prints the contents in the console.

The path is **not universal**. If you do not have `T7-6.dat`, you can use the self-contained code below, which embeds the 17 printed observations.

### 15.2 A complete, runnable way to create the lecture dataset

```r
data <- read.table(text = "
TOT AMI GEN AMT PR DIAP QRS
3389 3149 1 7500 220 0 140
1101 653 1 1975 200 0 100
1131 810 0 3600 205 60 111
596 448 1 675 160 60 120
896 844 1 750 185 70 83
1767 1450 1 2500 180 60 80
807 493 1 350 154 80 98
1111 941 0 1500 200 70 93
645 547 1 375 137 60 105
628 392 1 1050 167 60 74
1360 1283 1 3000 180 60 80
652 458 1 450 160 64 60
860 722 1 1750 135 90 79
500 384 0 2000 160 60 80
781 501 0 4500 180 0 100
1070 405 0 1500 170 90 120
1754 1520 1 3000 180 0 129
", header = TRUE)

stopifnot(nrow(data) == 17, ncol(data) == 7)
head(data)
```

Here `text = "..."` means R reads the table directly from the text inside the quotation marks. `header = TRUE` tells it that the first line contains variable names. `stopifnot()` halts if the specified checks are false, protecting you from accidentally working with a truncated dataset. This is a **teaching addition** to the original lecture.

## 16. Explore the data before modeling [Lecture p. 2]

The lecturer suggests:

```r
summary(data)
pairs(data, pch = 19)
```

### 16.1 Understand `summary(data)`

For numeric columns, `summary()` ordinarily reports the minimum, first quartile, median, mean, third quartile, and maximum. These describe the distribution of the recorded variable **before modeling**.

- **Minimum:** the smallest observed value.
- **Maximum:** the largest observed value.
- **Mean:** arithmetic average.
- **Median:** the midpoint of ordered observations.
- **First quartile (1Q):** roughly the value below which 25% of observations fall.
- **Third quartile (3Q):** roughly the value below which 75% fall.

These summaries help you notice extreme values, implausible codes, and strong differences in scale. In particular, `AMT` is in the hundreds or thousands while `GEN` is 0/1. That is **not automatically a problem** for OLS. It means their numerical coefficients will have very different units.

### 16.2 Understand `pairs(data, pch = 19)`

- `pairs()` draws a **scatterplot matrix**, which contains pairwise plots for the numeric columns.
- `data` is the dataset.
- `pch = 19` selects solid circular plotting symbols in base R.

Use this plot to ask whether relationships look approximately straight, whether the two responses appear related, whether the sample contains a very unusual observation, and whether predictors are strongly associated with one another.

A scatterplot matrix is exploratory. With 17 patients and seven variables, visual patterns can be unstable. A high raw correlation between `TOT` and `AMI` is not by itself proof that a particular predictor matters jointly.

**Useful extra R checks:**

```r
str(data)                    # variable names and data types
colSums(is.na(data))         # missing entries in each column
cor(data[, c("TOT", "AMI")]) # raw correlation between responses
table(data$GEN)              # counts for each GEN category
```

## 17. Fit the full multivariate model [Lecture p. 2]

Here is the lecturer's main command, shown with normal R spacing:

```r
mmlr1 <- lm(cbind(TOT, AMI) ~ GEN + AMT + PR + DIAP + QRS,
            data = data)
summary(mmlr1)
```

This is the core computation in the chapter.

### 17.1 Deconstruct the formula character by character

| Expression | Meaning |
|---|---|
| `lm()` | Fits a linear model using ordinary least squares |
| `cbind(TOT, AMI)` | Binds the two response columns together; the result is a two-column response matrix |
| `~` | Separates response(s) on the left from predictors on the right; read as “modeled using” |
| `+` | Includes additional predictor terms, **not** a promise of a positive effect |
| `GEN + AMT + PR + DIAP + QRS` | The five shared predictors |
| `data = data` | Find these named variables in the data frame called `data` |
| `mmlr1 <-` | Save the fitted model object under the name `mmlr1` |
| `summary(mmlr1)` | Print individual regression summaries for both responses |

The intercept is included by default in `lm()`. Hence the full model contains **six coefficients per response**, not five: one intercept plus five predictor coefficients.

### 17.2 Write both equations explicitly

For patient \(i\), the population model is

\[
\begin{aligned}
\text{TOT}_i
&=\beta_{0,T}+\beta_{G,T}\text{GEN}_i
+\beta_{A,T}\text{AMT}_i
+\beta_{P,T}\text{PR}_i
+\beta_{D,T}\text{DIAP}_i
+\beta_{Q,T}\text{QRS}_i
+\varepsilon_{T,i},\\[4pt]
\text{AMI}_i
&=\beta_{0,A}+\beta_{G,A}\text{GEN}_i
+\beta_{A,A}\text{AMT}_i
+\beta_{P,A}\text{PR}_i
+\beta_{D,A}\text{DIAP}_i
+\beta_{Q,A}\text{QRS}_i
+\varepsilon_{A,i}.
\end{aligned}
\]

We use \(T\) and \(A\) in coefficient subscripts to identify the two **response columns**. The quantities \(\varepsilon_{T,i}\) and \(\varepsilon_{A,i}\) are the two error components for the same patient. The model does **not** assume that these two components are uncorrelated.

## 18. Read every important part of the full-model coefficient output [Lecture pp. 2–3]

The R output gives a separate `Response TOT:` section and a separate `Response AMI:` section. The following estimates are from the lecture; displayed precision follows the original output or its `coef()` extractor.

### 18.1 Coefficient estimates for both responses

| Term | TOT estimate | AMI estimate | Plain-language interpretation |
|---|---:|---:|---|
| Intercept | -2879.4782 | -2728.7085 | Fitted baseline if all predictors equal 0 |
| `GEN` | 675.6508 | 763.0298 | Fitted GEN = 1 minus GEN = 0 difference, holding the other variables fixed |
| `AMT` | 0.2848511 | 0.3063734 | Change in fitted response per one AMT unit, with other predictors fixed |
| `PR` | 10.2721328 | 8.8961977 | Change in fitted response per one PR unit, with other predictors fixed |
| `DIAP` | 7.2511714 | 7.2055597 | Change in fitted response per one DIAP unit, with other predictors fixed |
| `QRS` | 7.5982397 | 4.9870508 | Change in fitted response per one QRS unit, with other predictors fixed |

The fitted equations are therefore

\[
\boxed{\begin{aligned}
\widehat{\text{TOT}}={}&-2879.4782+675.6508\,\text{GEN}
+0.2848511\,\text{AMT}\\
&+10.2721328\,\text{PR}+7.2511714\,\text{DIAP}
+7.5982397\,\text{QRS},\\[5pt]
\widehat{\text{AMI}}={}&-2728.7085+763.0298\,\text{GEN}
+0.3063734\,\text{AMT}\\
&+8.8961977\,\text{PR}+7.2055597\,\text{DIAP}
+4.9870508\,\text{QRS}.
\end{aligned}}
\]

The fact that some intercepts are negative is **not** evidence that a measured plasma level can be negative. The intercept predicts a hypothetical combination with `AMT = PR = DIAP = QRS = 0`, which is far from many observed patient combinations. We should not automatically attach physical meaning to it.

### 18.2 Understand scientific notation in the R output

R prints some values in the form `6.757e+02`. This means \(6.757\times10^2=675.7\). Likewise:

- `2.848e-01` means about 0.2848.
- `6.983e-05` means \(6.983\times10^{-5}=0.00006983\).
- `1.986e-05` means \(0.00001986\).

The letter `e` stands for **power of ten** in computer output. It is not Euler's number in this context.

## 19. What do standard errors, t statistics, and p-values mean?

An estimated coefficient is just a sample-based number. A **standard error** measures how much the estimate might vary across repeated samples under the model's assumptions. Generally, a larger standard error means less precise information about the coefficient.

For one ordinary response-specific coefficient, R reports a t statistic:

\[
\boxed{t=\frac{\hat\beta-\beta_0}{\operatorname{SE}(\hat\beta)}}.
\]

Here:

- \(\hat\beta\) is the estimated coefficient.
- \(\beta_0\) is the value proposed under the null hypothesis, usually zero. **This is a hypothetical test value, not necessarily the regression intercept**; the subscript has a different role in this formula.
- \(\operatorname{SE}(\hat\beta)\) is its standard error.
- A t statistic tells us how far the estimate lies from the hypothesized value in **standard-error units**.

For the TOT equation's GEN coefficient, the lecture gives an estimate near 675.7 and a standard error near 162.1. Thus,

\[
t\approx\frac{675.7}{162.1}\approx4.17.
\]

R reports \(t=4.169\), with \(p=0.001565\) [Lecture p. 2]. That is evidence against the **univariate** null hypothesis that the GEN coefficient in the **TOT equation** is zero, assuming the model and testing assumptions hold. It does not yet answer the joint question about both TOT and AMI.

### 19.1 The univariate coefficient tests reproduced from the lecture

| Term | TOT standard error | TOT t | TOT p | AMI standard error | AMI t | AMI p |
|---|---:|---:|---:|---:|---:|---:|
| Intercept | 893.3 | -3.224 | 0.008108 | 928.8 | -2.938 | 0.013502 |
| `GEN` | 162.1 | 4.169 | 0.001565 | 168.5 | 4.528 | 0.000861 |
| `AMT` | 0.06091 | 4.677 | 0.000675 | 0.06334 | 4.837 | 0.000521 |
| `PR` | 4.255 | 2.414 | 0.034358 | 4.424 | 2.011 | 0.069515 |
| `DIAP` | 3.225 | 2.248 | 0.046026 | 3.354 | 2.149 | 0.054782 |
| `QRS` | 3.849 | 1.974 | 0.074006 | 4.002 | 1.246 | 0.238622 |

The **p-value** is the probability, **assuming the null hypothesis and model assumptions**, of a test statistic at least as extreme as the one observed under the appropriate null distribution. It is **not** the probability that the null hypothesis is true. A value of 0.03 does not mean there is a 3% chance the null is correct.

Many courses compare p-values against a preselected \(\alpha=0.05\) significance level:

- \(p<0.05\): reject the stated null at the 5% level.
- \(p\ge0.05\): do not reject the null; **do not** conclude that the null has been proved true.

R's common significance markers are `***` for very small p-values, `**`, `*`, and `.` for progressively weaker evidence, with cutoffs defined in R's output legend. The **numeric p-value** is more informative than counting stars. Be especially careful when examining many coefficients: the more tests we inspect, the easier it becomes to find an apparently small p-value by chance.

### 19.2 The key contrast already visible in this table

- `PR` in TOT: \(p=0.034358\), below 0.05.
- `PR` in AMI: \(p=0.069515\), above 0.05.
- `DIAP` in TOT: \(p=0.046026\), below 0.05.
- `DIAP` in AMI: \(p=0.054782\), above 0.05.
- `QRS` in both: neither univariate p-value is below 0.05.

You **cannot** average those p-values, select the smaller one, or decide on the multivariate joint significance of a predictor by looking for two stars. The lecturer's next topic is a formal **multivariate hypothesis test** [Lecture pp. 4–6].

## 20. What do residual summaries, R-squared, and F statistics mean? [Lecture pp. 2–3]

### 20.1 The `Residuals:` five-number summary

R prints a summary of the **residuals**, not of the raw responses:

| Statistic | TOT residuals | AMI residuals |
|---|---:|---:|
| Minimum | -399.2 | -373.85 |
| First quartile (1Q) | -180.1 | -247.29 |
| Median | 4.5 | -83.74 |
| Third quartile (3Q) | 164.1 | 217.13 |
| Maximum | 366.8 | 462.72 |

For example, a minimum residual of -399.2 in TOT means at least one patient's fitted TOT was approximately 399.2 units **higher** than that patient's observed TOT. These summaries do not tell us whether residuals are normally distributed, whether variance is constant, or whether any single observation is influential. Those require further checks.

### 20.2 Degrees of freedom: why is the number 11 important?

The full model has \(n=17\) observations and \(k=6\) parameters per response. Its residual degrees of freedom are

\[
\boxed{\nu=n-k=17-6=11.}
\]

The Greek letter \(\nu\) (nu) is often used for degrees of freedom. Intuitively, estimating six coefficients consumes six independent directions of information from the sample, leaving eleven directions for measuring residual variation.

There are 12 estimated regression coefficients **across both equations**, but there are also two response columns. For each response equation, the residual degrees of freedom are **11**, not \(17-12=5\). The design matrix has rank six and is applied separately to both response columns.

### 20.3 Residual standard error (RSE)

For response \(j\), the residual standard error is

\[
\operatorname{RSE}_j=\sqrt{\frac{\sum_{i=1}^n e_{ij}^2}{n-k}}.
\]

The full-model lecture results are:

| Response | Residual standard error | Residual df |
|---|---:|---:|
| TOT | 281.2324 (shown as 281.2 in summary) | 11 |
| AMI | 292.4363 (shown as 292.4 in summary) | 11 |

These are measures of typical residual scale in each response's units; they are **not** standard errors of the regression coefficients.

### 20.4 R-squared and adjusted R-squared

For each response separately,

\[
R_j^2=1-\frac{\mathrm{SSE}_j}{\mathrm{SST}_j}.
\]

Adjusted R-squared takes account of the number of coefficients:

\[
\boxed{R_{\mathrm{adj},j}^2
=1-(1-R_j^2)\frac{n-1}{n-k}.}
\]

The lecture's full-model results are:

| Measure | TOT | AMI |
|---|---:|---:|
| \(R^2\) | 0.8871 | 0.8764 |
| Adjusted \(R^2\) | 0.8358 | 0.8202 |

A TOT \(R^2\) of 0.8871 means the fitted TOT equation accounts for about 88.71% of the **observed in-sample variation in TOT** around its sample average. It is not a combined MMLR score and not evidence of an 88.71% probability of correct predictions.

Why is adjusted \(R^2\) smaller? Adding predictors cannot increase an ordinary least-squares training SSE, and thus cannot decrease ordinary \(R^2\). Adjusted \(R^2\) includes a complexity penalty, so adding an unhelpful predictor can make it fall.

### 20.5 Each equation's usual overall F test

For \(s\) non-intercept predictors and residual df \(n-k\), the familiar overall univariate F statistic is

\[
F=\frac{(\mathrm{SST}-\mathrm{SSE})/s}{\mathrm{SSE}/(n-k)}
=\frac{R^2/s}{(1-R^2)/(n-k)}.
\]

This tests whether **all non-intercept slopes in one specified response equation** are zero.

For the full model, \(s=5\), \(n-k=11\), so for TOT,

\[
F\approx\frac{0.8871/5}{(1-0.8871)/11}\approx17.29.
\]

The lecture reports:

| Response-specific overall F test | Statistic | df | p-value |
|---|---:|---|---:|
| TOT | 17.29 | 5 and 11 | \(6.983\times10^{-5}\) |
| AMI | 15.60 | 5 and 11 | 0.0001132 |

These tell us the predictors provide evidence of explaining variation in **each response equation considered separately**. They do not by themselves determine which subset of predictors is jointly needed across both response equations.

## 21. Why does fitting two separate regressions reproduce the output? [Lecture p. 3]

The lecture invites students to run:

```r
mlr1 <- lm(TOT ~ GEN + AMT + PR + DIAP + QRS, data = data)
summary(mlr1)

mlr2 <- lm(AMI ~ GEN + AMT + PR + DIAP + QRS, data = data)
summary(mlr2)
```

Compare those with the two `summary(mmlr1)` response sections. They have the **same estimates, standard errors, t tests, residuals, fitted values, R-squared, and individual F tests**, to numerical precision.

### 21.1 Why this is not a contradiction

The MMLR **point estimates** come from the same OLS calculations as the separate models, as proven in Section 11.2. However, if you want to ask whether `PR` affects the **response vector** `(TOT, AMI)` overall, you need a statistic involving the joint structure of the two equations. The fact that each equation can be fitted separately is compatible with the fact that their **uncertainty must be considered together**.

One useful analogy: two students may sit two different exams. Calculating each student's exam score uses each exam separately. But asking whether a teaching intervention affects their **combined performance profile** is a joint question requiring both results and their relationship.

## 22. Extract residuals, fitted values, coefficients, and model scale [Lecture pp. 3–4]

### 22.1 `residuals(mmlr1)`: one pair of errors per patient

```r
head(residuals(mmlr1))
```

R's `head()` shows the first six rows by default. The lecture reports:

| Patient | TOT residual | AMI residual |
|---:|---:|---:|
| 1 | 132.82172 | 161.52769 |
| 2 | -72.00392 | -264.35329 |
| 3 | -399.24769 | -373.85244 |
| 4 | -382.84730 | -247.29456 |
| 5 | -152.39129 | 15.78777 |
| 6 | 366.78644 | 217.13206 |

The model's residual matrix has **17 rows and 2 columns**. For patient 1, both outcomes were higher than their respective fitted values. For patient 2, both were lower. For patient 5, TOT was below its fit but AMI was slightly above its fit.

### 22.2 `fitted(mmlr1)`: one pair of predictions per patient

```r
head(fitted(mmlr1))
```

| Patient | Fitted TOT | Fitted AMI |
|---:|---:|---:|
| 1 | 3256.1783 | 2987.4723 |
| 2 | 1173.0039 | 917.3533 |
| 3 | 1530.2477 | 1183.8524 |
| 4 | 978.8473 | 695.2946 |
| 5 | 1048.3913 | 828.2122 |
| 6 | 1400.2136 | 1232.8679 |

Check the central identity using patient 1:

\[
\begin{aligned}
\text{TOT residual}&=3389-3256.1783=132.8217,\\
\text{AMI residual}&=3149-2987.4723=161.5277.
\end{aligned}
\]

Those are precisely the two residuals reported by R. The relationship **actual = fitted + residual** holds separately for every outcome and observation.

### 22.3 Calculate a full-model prediction by hand

Patient 1 has `GEN = 1`, `AMT = 7500`, `PR = 220`, `DIAP = 0`, and `QRS = 140` [Lecture p. 1]. Using the full-model TOT equation,

\[
\begin{aligned}
\widehat{\text{TOT}}_1\approx{}&-2879.4782
+675.6508(1)+0.2848511(7500)\\
&+10.2721328(220)+7.2511714(0)
+7.5982397(140)\\
\approx{}&-2879.4782+675.6508+2136.3833\\
&+2259.8692+0+1063.7536\\
\approx{}&3256.18.
\end{aligned}
\]

Similarly,

\[
\begin{aligned}
\widehat{\text{AMI}}_1\approx{}&-2728.7085+763.0298(1)
+0.3063734(7500)\\
&+8.8961977(220)+7.2055597(0)+4.9870508(140)\\
\approx{}&2987.47.
\end{aligned}
\]

The few units in the final decimal places depend on rounding coefficients in the written equation. R uses more internal precision, giving the fitted values printed above.

### 22.4 `coef(mmlr1)`: the entire coefficient matrix

```r
coef(mmlr1)
```

| Coefficient row | TOT column | AMI column |
|---|---:|---:|
| `(Intercept)` | -2879.4782461 | -2728.7085444 |
| `GEN` | 675.6507805 | 763.0297617 |
| `AMT` | 0.2848511 | 0.3063734 |
| `PR` | 10.2721328 | 8.8961977 |
| `DIAP` | 7.2511714 | 7.2055597 |
| `QRS` | 7.5982397 | 4.9870508 |

This is a **6 by 2 matrix**. In the formula \(\widehat{\mathbf B}\), rows correspond to terms and columns to responses.

### 22.5 `sigma(mmlr1)`: the residual scale of each response

```r
sigma(mmlr1)
```

```text
     TOT      AMI
281.2324 292.4363
```

`sigma()` here returns the two response-specific residual standard errors. Do not confuse the R function `sigma()` with the full **2 by 2 residual covariance matrix**, \(\widehat{\boldsymbol\Sigma}\), which also contains an off-diagonal covariance. The latter can be calculated as:

```r
R <- residuals(mmlr1)
Sigma_hat <- crossprod(R) / df.residual(mmlr1)
Sigma_hat
cor(R)
```

`crossprod(R)` computes `t(R) %*% R` efficiently. `df.residual(mmlr1)` supplies the number 11. Using the lecture's data gives approximately

\[
\boxed{\widehat{\boldsymbol\Sigma}_{\text{full}}=
\begin{bmatrix}
79091.66&69606.95\\
69606.95&85518.99
\end{bmatrix}.}
\]

The residual correlation, computed from this matrix, is approximately **0.8464**. This is a **new calculation from the lecture dataset**. The positive off-diagonal entry shows that, after fitting the five predictors, TOT and AMI still have positively associated unexplained deviations.

To confirm the `sigma()` output,

\[
\sqrt{79091.66}=281.23,
\qquad
\sqrt{85518.99}=292.44.
\]

### 22.6 `vcov(mmlr1)`: covariance of estimated coefficients [Lecture p. 4]

The lecturer then asks you to run:

```r
vcov(mmlr1)
```

This is important even though the lecture does not print the large matrix. The object describes the **variance and covariance of the estimated regression coefficients**, including associations across the two response equations.

To understand why, recall that \(\widehat{\mathbf B}\) contains response-specific coefficients. Under the conventional regression assumptions, the coefficient covariance can be written

\[
\boxed{\operatorname{Cov}(\operatorname{vec}\widehat{\mathbf B})
=\boldsymbol\Sigma\otimes
(\mathbf X^{\mathsf T}\mathbf X)^{-1}.}
\]

This is an **advanced teaching derivation**, not a displayed formula in the PDF. Its symbols are:

- \(\operatorname{vec}\): stacks the columns of a matrix into one long vector.
- \(\operatorname{Cov}\): covariance matrix of that long vector of estimated coefficients.
- \(\boldsymbol\Sigma\): the covariance of the two model error components for each observation.
- \(\otimes\): **Kronecker product**, a systematic construction of a large block matrix from two smaller matrices.
- \((\mathbf X^{\mathsf T}\mathbf X)^{-1}\): the predictor-side part of coefficient uncertainty.

For coefficient \(r\) in response 1 and the same coefficient \(r\) in response 2, the covariance is

\[
\operatorname{Cov}(\hat\beta_{r1},\hat\beta_{r2})
=\sigma_{12}\big[(\mathbf X^{\mathsf T}\mathbf X)^{-1}\big]_{rr}.
\]

That is why cross-response covariance matters in a **joint** test even though each column of \(\widehat{\mathbf B}\) was calculated as an ordinary regression.

**Software nuance:** For a multivariate `lm` object, R's methods may organize this covariance as a large block matrix. You can inspect its dimensions with `dim(vcov(mmlr1))` and its entries with `vcov(mmlr1)`. The mathematical structure is more important than memorizing R's block ordering.

---
# Part IV. The heart of the lecture: multivariate hypothesis testing

## 23. One response-specific test is not the same as one joint test

We have reached the main reason for using MMLR rather than stopping with two independently reported regression summaries.

Take the predictor `PR`. The full model has a TOT coefficient \(\beta_{P,T}\) and an AMI coefficient \(\beta_{P,A}\). We could test them separately:

\[
H_{0,T}:\beta_{P,T}=0,
\qquad
H_{0,A}:\beta_{P,A}=0.
\]

But the **multivariate joint question** is

\[
\boxed{H_0:\beta_{P,T}=0\ \text{and}\ \beta_{P,A}=0.}
\]

The alternative is that **at least one** of those two coefficients is nonzero. We are not required to find strong evidence for **both** equations individually in order to find a predictor jointly significant, and we are not allowed to decide the joint test simply by looking at one equation's p-value.

For all five predictors, the null hypotheses are tested using the covariance of the two response equations. The lecture calls this a **MANOVA** approach to regression inference [Lecture p. 5].

### 23.1 What does MANOVA mean here?

**ANOVA** stands for *analysis of variance*. Its name comes from comparing variation attributed to a tested effect with variation left as error. **MANOVA** is *multivariate analysis of variance*: it extends this reasoning to a **vector of response variables**, taking their joint variability into account.

In MMLR, the predictor may be continuous, categorical, or both; the fitted model is still regression. The MANOVA framework provides multivariate tests of the linear hypotheses about the coefficient matrix. It is therefore entirely reasonable to see the expression **“MANOVA Tests”** in the output of a multivariate linear regression.

The broad logic is:

1. Fit a full regression model with a set of predictors.
2. Describe the unexplained multivariate variation using an **error matrix**.
3. Identify the additional multivariate variation attributable to the effect under investigation using a **hypothesis matrix**.
4. Compare these matrices using a multivariate test statistic.
5. Convert the statistic into a p-value under the applicable reference distribution or approximation.

## 24. Understand the null hypothesis as a matrix statement

Recall that the full coefficient matrix has **six rows**, one for the intercept and one for each predictor, and **two columns**, one for TOT and one for AMI:

\[
\mathbf B=
\begin{array}{c|cc}
&\mathrm{TOT}&\mathrm{AMI}\\\hline
\text{Intercept}&\beta_{0,T}&\beta_{0,A}\\
\mathrm{GEN}&\beta_{G,T}&\beta_{G,A}\\
\mathrm{AMT}&\beta_{A,T}&\beta_{A,A}\\
\mathrm{PR}&\beta_{P,T}&\beta_{P,A}\\
\mathrm{DIAP}&\beta_{D,T}&\beta_{D,A}\\
\mathrm{QRS}&\beta_{Q,T}&\beta_{Q,A}
\end{array}.
\]

To test whether `PR`, `DIAP`, and `QRS` can **all** be removed, the null hypothesis is

\[
\boxed{\begin{aligned}
\beta_{P,T}&=\beta_{P,A}=0,\\
\beta_{D,T}&=\beta_{D,A}=0,\\
\beta_{Q,T}&=\beta_{Q,A}=0.
\end{aligned}}
\]

There are **three coefficient rows** to be tested and **two response columns**. That means **six coefficient restrictions in total**. The model is allowed to retain the intercept, GEN, and AMT.

### 24.1 Write those restrictions with a contrast matrix

The null can be expressed compactly as

\[
\boxed{H_0:\mathbf C\mathbf B=\mathbf 0_{3\times2}},
\]

where

\[
\mathbf C=
\begin{bmatrix}
0&0&0&1&0&0\\
0&0&0&0&1&0\\
0&0&0&0&0&1
\end{bmatrix}.
\]

Read the entries:

- The first row of \(\mathbf C\) selects the `PR` row of \(\mathbf B\).
- The second selects the `DIAP` row.
- The third selects the `QRS` row.
- \(\mathbf 0_{3\times2}\) is a three-by-two matrix of zeros.

The result \(\mathbf C\mathbf B\) is **3 by 2**, listing exactly the six coefficients that should equal zero if the null hypothesis is true.

This matrix viewpoint is useful because **one multivariate hypothesis can constrain several response-specific coefficients simultaneously**.

## 25. The first formal tests: `car::Anova()` [Lecture p. 5]

The lecturer recommends the `Anova()` or `Manova()` functions in the R package `car` (Fox and Weisberg, 2019). The demonstration uses:

```r
library(car)
Anova(mmlr1, test.statistic = "Wilks")
```

If you have not installed the package, run this **once when you have internet access**:

```r
install.packages("car")
```

Then load it with `library(car)` in your R session. R package names and function capitalization matter.

### 25.1 Distinguish `Anova()` from `anova()`

| Function | Package | Role in the lecture |
|---|---|---|
| `Anova()` | `car` | Tests individual terms jointly across responses using a multivariate statistic; the example shows **Type II** MANOVA tests |
| `Manova()` | `car` | An alternative interface for multivariate-model hypothesis testing |
| `anova()` | Base R / `stats` | Compares two fitted nested multivariate regression models in the example |
| `linearHypothesis()` | `car` | Tests user-specified coefficient restrictions directly |

The difference between capital `A` and lowercase `a` is not stylistic. They call **different functions** with different interfaces.

### 25.2 What does `test.statistic = "Wilks"` mean?

`test.statistic` names the test criterion to use. `"Wilks"` requests **Wilks' lambda**, a multivariate comparison of the hypothesis and error variation. We will calculate it manually in Section 29.

### 25.3 Reproduce the lecturer's Type II MANOVA table

The output [Lecture p. 5] reads:

| Predictor | Term df | Wilks' lambda | Approximate F | Numerator df | Denominator df | p-value |
|---|---:|---:|---:|---:|---:|---:|
| GEN | 1 | 0.34479 | 9.5015 | 2 | 10 | 0.004873 |
| AMT | 1 | 0.30903 | 11.1795 | 2 | 10 | 0.002819 |
| PR | 1 | 0.65351 | 2.6509 | 2 | 10 | 0.119200 |
| DIAP | 1 | 0.67619 | 2.3944 | 2 | 10 | 0.141361 |
| QRS | 1 | 0.70816 | 2.0606 | 2 | 10 | 0.178092 |

### 25.4 Interpret the entire table carefully

Each row addresses a distinct null hypothesis for the two coefficients associated with that predictor.

For example, the `GEN` row tests

\[
H_0:\beta_{G,T}=\beta_{G,A}=0,
\]

**conditional on the other terms being included in the model**. Its p-value 0.004873 is below 0.05, so there is evidence of an association with the **two-response vector**. The test does **not** assert that the GEN coefficients must have the same size or that the categorical contrast is causal.

The `AMT` row tests the pair of AMT coefficients and has p = 0.002819. That also gives joint evidence against the zero-coefficient null at 5%.

The remaining rows are:

- `PR`, p = 0.119200.
- `DIAP`, p = 0.141361.
- `QRS`, p = 0.178092.

At 5%, the tests **do not reject** the separate joint nulls for these three terms. Their absence of significance is **not a proof** that the coefficients are exactly zero or that the measurements have no scientific importance. Especially with only 17 patients, a weakly powered analysis may fail to detect genuine but uncertain associations.

### 25.5 What does “Type II” mean?

The heading is **“Type II MANOVA Tests”**. In this additive model with no interaction terms, a Type II test evaluates each predictor's contribution after accounting for the **other included predictors**. For example, the PR test adjusts for GEN, AMT, DIAP, and QRS.

A basic comparison:

| Testing convention | Core idea | Caution |
|---|---|---|
| **Type I** | Sequentially test terms as they enter a model | Results can depend on term order |
| **Type II** | Assess a term accounting for the other relevant main effects | Particularly straightforward in the lecture's additive model |
| **Type III** | Evaluate terms according to a full-model parameterization and contrasts | With interactions or different contrast codings, interpretation requires care |

The lecture uses **Type II**. Do not silently substitute Type I sequential tests and expect the identical table.

### 25.6 Why is numerator df equal to 2?

When a **single predictor** is tested, that predictor has **one coefficient for each of two responses**. Thus the multivariate test concerns **two response dimensions**, reflected here in numerator df = 2. Its denominator df = 10 is the denominator associated with the Wilks-to-F transformation for this test, not simply the univariate residual df of 11. We must not assume every multivariate F test uses the same degrees of freedom as a single-response regression.

## 26. Why testing the three terms together is a different question

Having seen individual tests for PR, DIAP, and QRS, the lecturer next asks:

> Could we drop **PR, DIAP, and QRS all at once**, while retaining GEN and AMT?

This differs from testing each term one at a time. Three individually nonsignificant predictors might collectively explain meaningful information because of their interrelationships, and the reverse can also occur. To answer the new question, we test **the joint set of six zero-coefficient restrictions** described in Section 24.

### 26.1 The two models being compared

**Full model, `mmlr1`:**

```r
mmlr1 <- lm(cbind(TOT, AMI) ~ GEN + AMT + PR + DIAP + QRS,
            data = data)
```

**Reduced model, `mmlr2`:**

```r
mmlr2 <- lm(cbind(TOT, AMI) ~ GEN + AMT, data = data)
```

The models have the same **17 observations**, the same **two responses**, and the same basic error assumptions. The reduced model is **nested** within the full model. “Nested” means it can be obtained by imposing restrictions on the larger model, in this case setting the six PR/DIAP/QRS coefficients to zero.

### 26.2 What is gained and lost when we remove predictors?

| Feature | Full model | Reduced model |
|---|---:|---:|
| Observations \(n\) | 17 | 17 |
| Responses \(q\) | 2 | 2 |
| Non-intercept predictors \(s\) | 5 | 2 |
| Coefficients per response \(k\) | 6 | 3 |
| Total estimated regression coefficients | 12 | 6 |
| Residual degrees of freedom \(n-k\) | 11 | 14 |

The full model is more flexible. It can fit the training data at least as well **in terms of separate response SSEs**, but the extra parameters cost complexity and degrees of freedom. The question is whether the improvement is convincing enough to justify the added terms.

## 27. Compare the models with `anova()` [Lecture p. 5]

The lecturer runs:

```r
anova(mmlr1, mmlr2, test = "Wilks")
```

`anova()` here is called on **two multivariate linear model objects**. `test = "Wilks"` asks for a Wilks' lambda comparison. This is not the same procedure as taking two separate ordinary F tests and combining their p-values.

The lecturer's output is:

| Model | Residual df | Generalized variance | Wilks' lambda | Approx. F | Num. df | Den. df | p-value |
|---|---:|---:|---:|---:|---:|---:|---:|
| Full: GEN + AMT + PR + DIAP + QRS | 11 | 43803 | | | | | |
| Reduced: GEN + AMT | 14 | 51856 | 0.4405 | 1.689 | 6 | 20 | 0.1755 |

The model comparison adds three predictor terms, a reduction of residual df from 14 to 11. Because there are two responses, this amounts to **six response-specific coefficient restrictions**.

### 27.1 What is the null hypothesis?

\[
H_0:\text{The PR, DIAP, and QRS coefficients are all zero in both response equations.}
\]

In words, after GEN and AMT have been included, the three additional predictors are **not jointly needed** under the null model.

### 27.2 Read the decision

The p-value is

\[
\boxed{p=0.1755.}
\]

Since \(0.1755>0.05\), the data do not provide sufficient evidence, at the 5% level under this test, to reject the null that the added set of predictors has no joint contribution.

**The lecturer's practical conclusion [Lecture p. 6]:** The two-predictor model appears adequate enough to consider as a simpler alternative to the five-predictor model.

**A necessary statistical qualification:** A large p-value is **not evidence proving equivalence**, and it does not establish that both models predict equally well outside this sample. With only 17 observations, the joint comparison may have limited power. A stronger practical model-choice argument would also inspect assumptions, outliers, domain knowledge, prediction error on new data, and whether the removed variables serve an important scientific role. Formal equivalence claims require an explicitly designed equivalence or non-inferiority procedure with a meaningful tolerance.

### 27.3 Understand “generalized variance” in the output

In a single-response regression, SSE summarizes residual spread. With **two** responses, a covariance matrix describes spread in two directions and their correlation. The determinant is related to the **area** of the corresponding residual uncertainty geometry. In the example's `anova()` output, the reported generalized variance for each model is the square root of the determinant of its residual covariance estimate:

\[
\operatorname{GenVar}
=\sqrt{\left|\frac{\mathbf E}{\nu}\right|}
=\frac{\sqrt{|\mathbf E|}}{\nu}
\qquad(q=2),
\]

where \(\nu\) is that model's residual degrees of freedom and \(\mathbf E\) is its residual SSP matrix, introduced next.

Using the reported data, the full model gives approximately **43,803** and the reduced model approximately **51,856**, as in the lecture. Larger generalized variance means a larger generalized residual spread, although it is **not itself** a p-value or a complete model-selection criterion.

## 28. Test the same restrictions with `car::linearHypothesis()` [Lecture p. 6]

The lecturer offers a different way to ask the same joint question **without explicitly fitting the reduced model again**:

```r
lhypo <- linearHypothesis(
  mmlr1,
  hypothesis.matrix = c("PR = 0", "DIAP = 0", "QRS = 0")
)
lhypo
```

### 28.1 Explain the complete command

- `linearHypothesis()` is a function from `car`.
- `mmlr1` is the already fitted **full model**.
- `hypothesis.matrix` specifies linear coefficient restrictions. Although its name mentions a matrix, it can accept character strings such as `"PR = 0"`.
- `c(...)` combines those three strings into one character vector.
- The restrictions apply to the named coefficient terms **across the two responses** in this multivariate model.
- `<-` stores the result in `lhypo`.
- Typing `lhypo` prints the relevant hypothesis matrix, error matrix, and multivariate test results.

The null is precisely the same as the earlier full-versus-reduced comparison. Therefore the Wilks test statistic and p-value must agree, subject to numerical rounding, even though the software methods are different.

### 28.2 A formula for the hypothesis SSP matrix

This next derivation is a teaching extension to explain the matrices printed on [Lecture p. 6]. With a contrast matrix \(\mathbf C\) for a null \(\mathbf C\mathbf B=\mathbf 0\), the **hypothesis sum-of-squares-and-products (SSP) matrix** can be written

\[
\boxed{\mathbf H=
(\mathbf C\widehat{\mathbf B})^{\mathsf T}
\left[\mathbf C(\mathbf X^{\mathsf T}\mathbf X)^{-1}
\mathbf C^{\mathsf T}\right]^{-1}
(\mathbf C\widehat{\mathbf B}).}
\]

**Every symbol:**

- \(\mathbf H\): a \(q\times q\) matrix of the fitted contribution associated with the tested restrictions.
- \(\mathbf C\): the contrast or restriction matrix, in this example \(3\times6\).
- \(\widehat{\mathbf B}\): fitted coefficient matrix, here \(6\times2\).
- \(\mathbf C\widehat{\mathbf B}\): the fitted \(3\times2\) matrix of the coefficients under test.
- The middle inverse accounts for the predictor design and relationships among the tested coefficients.
- \(^{\mathsf T}\): matrix transpose.

This formula is for the **zero-right-hand-side** null. More general hypotheses may compare \(\mathbf C\mathbf B\) with a specified nonzero matrix.

### 28.3 The error SSP matrix

Define

\[
\boxed{\mathbf E=\mathbf R^{\mathsf T}\mathbf R
=(\mathbf Y-\mathbf X\widehat{\mathbf B})^{\mathsf T}
(\mathbf Y-\mathbf X\widehat{\mathbf B}).}
\]

Here \(\mathbf E\) is a \(q\times q\) matrix; **it is not a single error or the same as the sample residual matrix \(\mathbf R\)**. The diagonal entries are each response's residual SSE, and the off-diagonal entries are residual cross-products.

For the nested-model comparison in this example, a particularly intuitive way to obtain the same \(\mathbf H\) is

\[
\boxed{\mathbf H=\mathbf E_{\text{reduced}}-\mathbf E_{\text{full}}.}
\]

The difference describes how much the residual sum-of-squares-and-products matrix changes when the tested terms are included. For nested OLS models fitted to the **same rows**, this difference is a positive semidefinite matrix, although individual off-diagonal entries may be positive or negative.

## 29. The actual H and E matrices [Lecture p. 6]

The lecturer's `linearHypothesis()` output prints the **sum of squares and products for the hypothesis** as

\[
\boxed{\mathbf H=\begin{bmatrix}
930348.1&780517.7\\
780517.7&679948.4
\end{bmatrix}.}
\]

It also prints the **sum of squares and products for error** as

\[
\boxed{\mathbf E=\begin{bmatrix}
870008.3&765676.5\\
765676.5&940708.9
\end{bmatrix}.}
\]

Both matrices are **2 by 2**, because the study has two responses, even though the hypothesis concerns three predictors. The response dimension determines the size of these SSP matrices.

### 29.1 Interpret an individual entry

- \(E_{11}=870008.3\) is the full model's TOT residual sum of squares.
- \(E_{22}=940708.9\) is the full model's AMI residual sum of squares.
- \(E_{12}=E_{21}=765676.5\) is the sum of TOT residual multiplied by AMI residual over the 17 patients.
- \(H_{11}=930348.1\) is the reduction in TOT residual SSE associated with adding the three tested predictors, compared with the reduced model.
- \(H_{22}=679948.4\) is the corresponding reduction for AMI.
- \(H_{12}=H_{21}=780517.7\) is a cross-product change involving the two outcomes.

In particular,

\[
\operatorname{SSE}_{\text{TOT,reduced}}
\approx870008.3+930348.1=1800356.4,
\]

and

\[
\operatorname{SSE}_{\text{AMI,reduced}}
\approx940708.9+679948.4=1620657.3.
\]

This is a concrete numerical demonstration of \(\mathbf H=\mathbf E_{\text{reduced}}-\mathbf E_{\text{full}}\).

### 29.2 The important distinction between SSE and SSP

- **SSE:** a scalar (single number) describing squared residuals for **one** response.
- **SSP matrix:** a grid that holds SSEs on its diagonal and cross-products between **different** responses off the diagonal.

MMLR multivariate tests use the SSP **matrices**, not simply one selected SSE.

## 30. Wilks' lambda from absolute zero [Lecture pp. 6–7]

The lecturer gives the formula

\[
\boxed{\Lambda^*=\frac{|\mathbf E|}{|\mathbf H+\mathbf E|}.}
\]

Here \(\Lambda^*\) is Wilks' lambda in the notation shown in the source, and vertical bars around a square matrix mean its **determinant**. These bars do **not** represent a matrix's ordinary absolute value or a list of entries.

### 30.1 Explain the idea before doing the arithmetic

The denominator \(|\mathbf H+\mathbf E|\) represents the determinant of the **combined hypothesis-plus-error SSP matrix**. The numerator \(|\mathbf E|\) represents the determinant of the **unexplained part**.

In an appropriate positive-definite setting:

- \(\Lambda\) close to **1** means the tested effect adds little compared with error in the multivariate geometry.
- \(\Lambda\) **smaller** means more evidence of an effect relative to residual variation.
- Whether a particular value is **statistically significant** depends on the sample size, response dimension, number of restrictions, and reference distribution. **Do not compare Wilks' lambda itself with 0.05.**

For two responses, determinants measure an area-related scaling, so the comparison accounts both for variation in each outcome and for their co-movement. This is why it is more informative about a **joint** effect than inspecting two SSE values separately.

### 30.2 Compute \(\mathbf H+\mathbf E\)

Add corresponding entries:

\[
\begin{aligned}
\mathbf H+\mathbf E
&=\begin{bmatrix}
930348.1+870008.3&780517.7+765676.5\\
780517.7+765676.5&679948.4+940708.9
\end{bmatrix}\\[3pt]
&\approx\boxed{\begin{bmatrix}
1800356.4&1546194.2\\
1546194.2&1620657.3
\end{bmatrix}}.
\end{aligned}
\]

This is also the **reduced** model's residual SSP matrix, because removing terms restores the variation that the full model had explained.

### 30.3 Learn a two-by-two determinant

For

\[
\mathbf M=\begin{bmatrix}a&b\\c&d\end{bmatrix},
\]

the determinant is \(ad-bc\). If the matrix is symmetric, as these matrices are, \(b=c\), so

\[
|\mathbf M|=ad-b^2.
\]

This is not a complicated matrix operation in the two-response case. It is just **multiply the two diagonal entries, then subtract the product of the off-diagonal entries**.

### 30.4 Calculate the numerator determinant

Use the **unrounded internal values** for the most accurate calculation, but the lecturer's printed four-significant-digit figures show the structure:

\[
\begin{aligned}
|\mathbf E|
&=870008.3(940708.9)-(765676.5)^2\\
&\approx\boxed{232164094294}.
\end{aligned}
\]

The boxed value is calculated from the full-precision dataset; multiplying only the displayed rounded entries produces a slightly different final integer.

### 30.5 Calculate the denominator determinant

\[
\begin{aligned}
|\mathbf H+\mathbf E|
&\approx1800356.4(1620657.3)-(1546194.2)^2\\
&\approx\boxed{527044186350}.
\end{aligned}
\]

Again, the boxed value uses more precision than the rounded matrix printed above.

### 30.6 Form the ratio

\[
\boxed{\Lambda^*
=\frac{232164094294}{527044186350}
\approx0.4405021.}
\]

This independently reproduces the source's Wilks' lambda [Lecture p. 7]:

```r
E <- lhypo$SSPE
H <- lhypo$SSPH

det(E) / det(H + E)
```

```text
[1] 0.4405021
```

The `det()` function computes a determinant. The dollar sign `$` extracts a named component of an R object: `lhypo$SSPE` is the error SSP matrix, while `lhypo$SSPH` is the hypothesis SSP matrix. R is case sensitive, so `SSPE` and `SSPH` must be typed as the actual component names.

### 30.7 Why R reports a p-value of 0.1755 instead of 0.4405

Wilks' lambda is a **test statistic**, not a probability of evidence being unusual. The software converts lambda to an approximate F statistic with degrees of freedom determined by the number of outcomes, the number of restrictions, and the residual sample information. For the lecture's **three-predictor block test**, R reports

\[
F\approx1.688991,
\qquad df_1=6,
\qquad df_2=20,
\qquad p\approx0.17553.
\]

Because this p-value exceeds 0.05, **the Wilks test does not reject the six-restriction null** at 5%. It would be an error to say that lambda = 0.4405 itself implies a 44.05% chance the null is true.

## 31. Four multivariate test criteria, not four unrelated problems [Lecture p. 6]

The `linearHypothesis()` output gives four common criteria for the **same stated null hypothesis**. They summarize the relationship between \(\mathbf H\) and \(\mathbf E\) in different ways.

The lecturer's exact reported values are:

| Criterion | Test statistic | Approx. F | Num. df | Den. df | p-value | Reject at 5%? |
|---|---:|---:|---:|---:|---:|---|
| Pillai | 0.6038599 | 1.585910 | 6 | 22 | 0.19830 | No |
| Wilks | 0.4405021 | 1.688991 | 6 | 20 | 0.17553 | No |
| Hotelling–Lawley | 1.1694286 | 1.754143 | 6 | 18 | 0.16574 | No |
| Roy | 1.0758181 | 3.944666 | 3 | 11 | 0.03906 | **Yes** |

These four numbers **must not be compared against one another as if they were p-values on the same scale**. They are different summaries of the hypothesis-versus-error multivariate geometry.

### 31.1 A gentle introduction to eigenvalues

An **eigenvalue** of a matrix expresses how strongly the matrix scales a particular direction, called an **eigenvector**. In multivariate testing, the relevant roots describe how strongly the tested effect appears along distinct joint directions in the response space, after taking account of residual variability.

If \(\mathbf E\) is invertible, consider the eigenvalues of

\[
\mathbf E^{-1}\mathbf H.
\]

Call the nonzero or potentially nonzero roots \(\lambda_1,\ldots,\lambda_m\), with \(m\leq\min(q,r)\), where \(r\) is the rank of the hypothesis restrictions and \(q\) is the number of responses. In this example \(q=2\), so there are at most two roots. Numerical calculation from the lecture data gives approximately

\[
\lambda_1=1.0758181,
\qquad
\lambda_2=0.0936105.
\]

These are **newly derived explanatory values**, not eigenvalues printed on the lecture slides.

### 31.2 Wilks' lambda in terms of the roots

\[
\boxed{\Lambda=\prod_{j=1}^{m}\frac{1}{1+\lambda_j}.}
\]

For two roots,

\[
\Lambda\approx\frac{1}{(1+1.0758181)(1+0.0936105)}
\approx0.4405021.
\]

This agrees with the determinant ratio, because

\[
\frac{|\mathbf E|}{|\mathbf H+\mathbf E|}
=\frac{1}{|\mathbf I+\mathbf E^{-1}\mathbf H|}.
\]

### 31.3 Pillai's trace

\[
\boxed{V=\operatorname{tr}[\mathbf H(\mathbf H+\mathbf E)^{-1}]
=\sum_j\frac{\lambda_j}{1+\lambda_j}.}
\]

The word *trace* means “add the diagonal entries” of a square matrix. Pillai accumulates the effect strength across the available multivariate directions, with each contribution transformed into a quantity between 0 and 1.

For this example,

\[
V\approx\frac{1.0758181}{2.0758181}
+\frac{0.0936105}{1.0936105}
\approx\boxed{0.6038599}.
\]

### 31.4 Hotelling–Lawley trace

\[
\boxed{T=\operatorname{tr}(\mathbf E^{-1}\mathbf H)
=\sum_j\lambda_j.}
\]

For the source's two roots,

\[
T\approx1.0758181+0.0936105
=\boxed{1.1694286}.
\]

This statistic sums the contribution across the multivariate roots without Pillai's fraction transformation.

### 31.5 Roy's largest root

\[
\boxed{\Theta=\max_j\lambda_j.}
\]

This focuses on the **strongest single joint response direction**. In the lecture data,

\[
\Theta\approx\boxed{1.0758181}.
\]

Because Roy concentrates on the strongest direction while the other tests aggregate information differently, they need not produce the same p-value or the same decision.

### 31.6 Optional R code to verify all four statistics manually

```r
E <- lhypo$SSPE
H <- lhypo$SSPH

roots <- Re(eigen(solve(E, H), only.values = TRUE)$values)

wilks <- prod(1 / (1 + roots))
pillai <- sum(roots / (1 + roots))
hotelling_lawley <- sum(roots)
roy <- max(roots)

c(
  Pillai = pillai,
  Wilks = wilks,
  Hotelling_Lawley = hotelling_lawley,
  Roy = roy
)
```

- `solve(E, H)` solves \(\mathbf E\mathbf Z=\mathbf H\), producing \(\mathbf E^{-1}\mathbf H\) without explicitly calling `solve(E) %*% H`.
- `eigen()` obtains eigenvalues.
- `$values` extracts the eigenvalues.
- `Re()` takes their real part to remove tiny imaginary rounding noise if the numerical algorithm introduces any; the theoretical eigenvalues here are nonnegative real numbers.
- `prod()`, `sum()`, and `max()` perform multiplication, addition, and maximum selection.

The **statistics** can be computed from the roots, but their **p-values** need the appropriate reference distribution or approximation. Do not replace the package's degrees-of-freedom calculations with ordinary univariate t distributions.

### 31.7 What should we do when Roy says p = 0.03906?

This is a particularly important source nuance. The lecturer notes that Pillai, Wilks, and Hotelling–Lawley do not reject at 5%, while Roy's test **does**, and suggests that the discrepancy may be related to the small sample size of 17 [Lecture p. 6].

A statistically careful interpretation is:

- **All four tests refer to the same coefficient restrictions**, but their test statistics emphasize different aspects of the multivariate effect.
- **Roy is significant at 5%** for the reported approximation, whereas the other three are not. Reporting “all four tests are nonsignificant” would be factually wrong.
- Small samples and differing power properties can contribute to disagreement; however, **the output alone cannot prove that small sample size is the cause**.
- Roy's largest-root statistic focuses on one especially strong response combination, which is a plausible mathematical reason for a different conclusion.
- The best practice is to select a primary test on scientific and statistical grounds **before inspecting the results**, then explain any sensitivity to alternative criteria rather than selecting whichever p-value supports a preferred conclusion.

**Practical report wording:** “The prespecified Wilks test did not reject the joint null for PR, DIAP, and QRS (\(\Lambda=0.4405\), approximate \(F(6,20)=1.689\), \(p=0.176\)). Pillai and Hotelling–Lawley were also nonsignificant, but Roy's largest-root test was significant (\(p=0.039\)). Thus, evidence is criterion-sensitive and should be interpreted cautiously, particularly given the small sample.”

## 32. Connect all four ways of examining a predictor block

By this point, we have encountered four relevant procedures:

| Question | Procedure | Example result | Correct conclusion |
|---|---|---|---|
| Is PR related to TOT after adjusting for other terms? | TOT coefficient t test | p = 0.034358 | Evidence for a nonzero TOT coefficient under the individual test |
| Is PR related to the response vector `(TOT, AMI)`? | Type II `car::Anova()` multivariate term test | Wilks p = 0.119200 | No rejection at 5% for the two-coefficient PR null |
| Are PR, DIAP, and QRS **collectively** useful beyond GEN and AMT? | `anova(mmlr1, mmlr2, test = "Wilks")` | p = 0.1755 | No rejection at 5% of the six-restriction block null |
| Are the six block coefficients zero, tested without manually fitting `mmlr2`? | `linearHypothesis(mmlr1, ...)` | Wilks p = 0.17553 | Same Wilks result as the nested-model comparison |

None of these p-values is inherently contradictory. They address **different hypotheses** or use **different multivariate criteria**. Being explicit about the exact null hypothesis is the best defense against confusion.

---
# Part V. The reduced model and two-dimensional prediction

## 33. Fit the simpler model [Lecture pp. 5, 7–8]

After examining the block test, the lecturer presents the already fitted model with only GEN and AMT:

```r
mmlr2 <- lm(cbind(TOT, AMI) ~ GEN + AMT, data = data)
summary(mmlr2)
```

The reduced model still has **two response equations**. We have removed three predictors, **not** one of the response variables.

### 33.1 The reduced coefficient table

| Term | TOT coefficient | AMI coefficient |
|---|---:|---:|
| Intercept | 56.72005 | -241.34791 |
| `GEN` | 507.07308 | 606.30967 |
| `AMT` | 0.3289618 | 0.3242549 |

The new fitted equations are

\[
\boxed{\widehat{\mathrm{TOT}}
=56.72005+507.07308\,\mathrm{GEN}+0.3289618\,\mathrm{AMT}}
\]

and

\[
\boxed{\widehat{\mathrm{AMI}}
=-241.34791+606.30967\,\mathrm{GEN}+0.3242549\,\mathrm{AMT}}.
\]

They are easier to communicate than the full models because only two predictors remain.

### 33.2 How to read the GEN coefficient

For the reduced TOT equation, compare predictions for GEN = 1 and GEN = 0 while keeping AMT fixed:

\[
\begin{aligned}
\widehat{\mathrm{TOT}}(1,a)
&=56.72005+507.07308+0.3289618a,\\
\widehat{\mathrm{TOT}}(0,a)
&=56.72005+0.3289618a.
\end{aligned}
\]

Subtracting gives

\[
\widehat{\mathrm{TOT}}(1,a)-\widehat{\mathrm{TOT}}(0,a)
=\boxed{507.07308}.
\]

So **the fitted GEN = 1 group has a TOT value about 507.07 units higher than the GEN = 0 group at the same AMT**, within the fitted additive model. The analogous modeled AMI difference is approximately **606.31** units.

Because the data are observational, this is an **adjusted association**, not an experimentally established effect of the categorical characteristic. Its interpretation is sensitive to model specification and other factors not included in the reduced model.

### 33.3 How to read the AMT coefficients

The estimated AMT slopes are approximately:

- TOT: \(0.32896\) plasma-level units per one AMT measurement unit.
- AMI: \(0.32425\) plasma-level units per one AMT measurement unit.

For a difference of **100** AMT units, at the same GEN value, the fitted differences are:

\[
\begin{aligned}
\Delta\widehat{\mathrm{TOT}}&=100(0.3289618)\approx32.90,\\
\Delta\widehat{\mathrm{AMI}}&=100(0.3242549)\approx32.43.
\end{aligned}
\]

These calculations show why the magnitude of a regression coefficient must always be interpreted together with its **measurement units** and a realistic change in the predictor.

## 34. Read the complete reduced-model summaries [Lecture pp. 7–8]

### 34.1 Reduced TOT equation

| Term | Estimate | Standard error | t | p-value |
|---|---:|---:|---:|---:|
| Intercept | 56.72005 | 206.70337 | 0.274 | 0.7878 |
| GEN | 507.07308 | 193.79082 | 2.617 | 0.0203 |
| AMT | 0.32896 | 0.04978 | 6.609 | \(1.17\times10^{-5}\) |

| Fit measure | Lecture result |
|---|---:|
| Residual standard error | 358.6 |
| Residual df | 14 |
| Multiple \(R^2\) | 0.7664 |
| Adjusted \(R^2\) | 0.7330 |
| Overall F | 22.96 on 2 and 14 df |
| Overall p-value | \(3.8\times10^{-5}\) |

The lecture's residual five-number summary for TOT is approximately:

| Min | 1Q | Median | 3Q | Max |
|---:|---:|---:|---:|---:|
| -756.05 | -190.68 | -59.83 | 203.32 | 560.84 |

### 34.2 Reduced AMI equation

| Term | Estimate | Standard error | t | p-value |
|---|---:|---:|---:|---:|
| Intercept | -241.34791 | 196.11640 | -1.231 | 0.23874 |
| GEN | 606.30967 | 183.86521 | 3.298 | 0.00529 |
| AMT | 0.32425 | 0.04723 | 6.866 | \(7.73\times10^{-6}\) |

| Fit measure | Lecture result |
|---|---:|
| Residual standard error | 340.2 |
| Residual df | 14 |
| Multiple \(R^2\) | 0.7870 |
| Adjusted \(R^2\) | 0.7566 |
| Overall F | 25.87 on 2 and 14 df |
| Overall p-value | \(1.986\times10^{-5}\) |

The lecture's residual five-number summary for AMI is approximately:

| Min | 1Q | Median | 3Q | Max |
|---:|---:|---:|---:|---:|
| -716.80 | -135.83 | -23.16 | 182.27 | 695.97 |

### 34.3 Why do residual standard errors increase?

The reduced model has fewer opportunities to follow the training data. Its residual SSEs are larger:

| Response | Full-model SSE | Reduced-model SSE |
|---|---:|---:|
| TOT | 870,008.3 | 1,800,356.4 |
| AMI | 940,708.9 | 1,620,657.3 |

Their corresponding RSEs also rise, from roughly **281.2 to 358.6** for TOT and **292.4 to 340.2** for AMI.

This is expected when predictors are removed. The important question is not whether the simpler model's training fit is **identical**, because it is not. The question is whether the reduction in fit is important enough to justify the added predictors. Under the selected Wilks comparison, the evidence was not sufficient to reject the set of zero restrictions at 5%.

### 34.4 Why does R-squared decrease?

For TOT, the training \(R^2\) decreases from **0.8871 to 0.7664**. For AMI, it decreases from **0.8764 to 0.7870**. A smaller model generally fits the existing observations less closely. It may still be preferable for interpretation or for prediction on new data if the removed variables contribute mostly estimation noise. But we have not proved better out-of-sample prediction from this dataset alone.

### 34.5 Why does the residual df increase?

There are only three coefficients per response in the reduced model: the intercept, GEN, and AMT. Therefore,

\[
\boxed{n-k=17-3=14.}
\]

More residual degrees of freedom can help estimate the remaining error variance, but the size of that variance may itself rise as predictors are removed.

## 35. Make the lecturer's final two-response prediction [Lecture p. 8]

The lecture ends its computed demonstration with a specified predictor combination:

\[
\mathrm{GEN}=1\quad(\text{female in the source coding}),
\qquad
\mathrm{AMT}=1200.
\]

The R code is

```r
newdata <- data.frame(GEN = 1, AMT = 1200)
predict(mmlr2, newdata)
```

R reports:

```text
       TOT      AMI
1 958.5473 754.0677
```

### 35.1 What is `data.frame()` doing?

`data.frame(GEN = 1, AMT = 1200)` creates a **one-row table** containing the predictors required by `mmlr2`. The column names must match the predictor names used when the model was fitted.

The reduced model needs **only GEN and AMT**. There is no reason to supply PR, DIAP, or QRS for this particular fitted model. They were excluded when `mmlr2` was created.

### 35.2 Calculate the predicted TOT by hand

\[
\begin{aligned}
\widehat{\mathrm{TOT}}
&=56.72005+507.07308(1)+0.3289618(1200)\\
&=56.72005+507.07308+394.75416\\
&\approx\boxed{958.5473}.
\end{aligned}
\]

### 35.3 Calculate the predicted AMI by hand

\[
\begin{aligned}
\widehat{\mathrm{AMI}}
&=-241.34791+606.30967(1)+0.3242549(1200)\\
&=-241.34791+606.30967+389.10588\\
&\approx\boxed{754.0677}.
\end{aligned}
\]

Using the full-precision R coefficient estimates reproduces the exact printed four-decimal output. The small differences from hand-calculated last digits are simply rounding.

### 35.4 A two-dimensional prediction is a point in a plane

In an ordinary regression, a prediction is a **single number**, such as sales = 100. Here the prediction is a **pair**:

\[
\boxed{\widehat{\boldsymbol\mu}_0=
\begin{bmatrix}958.5473\\754.0677\end{bmatrix}.}
\]

Imagine a graph with TOT on the horizontal axis and AMI on the vertical axis. The predicted response pair is one **point** at approximately \((958.5,754.1)\). Our uncertainty about that pair has both a horizontal component, a vertical component, **and a covariance between them**.

This leads directly to the final concept the lecturer mentions but **does not compute**: the multivariate uncertainty ellipse [Lecture p. 8].

## 36. Why a prediction needs uncertainty

A point prediction should not be confused with the actual value a future person or business will necessarily have. Even with correct model specification:

1. The coefficients were estimated from a finite sample, so the **mean response** at the chosen predictor combination is uncertain.
2. An individual new observation would have its own **unpredictable error**, beyond coefficient-estimation uncertainty.

These are different questions:

| Type of statement | What is uncertain? | Typically wider or narrower? |
|---|---|---|
| **Confidence region for the mean response vector** | The true two-response average at the specified predictors | Narrower |
| **Prediction region for a future individual response vector** | The two actual outcomes of one new observation | Wider |

An ordinary 95% interval for TOT and a separate 95% interval for AMI do **not**, by themselves, provide a 95% simultaneous confidence region for the two-dimensional mean vector. If the two errors are correlated, a joint region should reflect that geometry.

### 36.1 Why an ellipse rather than a rectangle?

In two dimensions, a covariance matrix describes how uncertainty extends in different directions. If the outcomes are positively correlated, the cloud of plausible response pairs often stretches diagonally upward: high TOT values tend to coincide with high AMI values after controlling for predictors.

An **ellipse** can tilt to follow that dependence. Its long axis points in the direction of greatest uncertainty, and its short axis in the direction of least uncertainty. A pair of unrelated intervals would miss this geometric relationship.

**What the original lecture actually says:** It states that confidence intervals for the two predicted outcomes are more complicated and that an ellipse can represent uncertainty in two dimensions, but the calculation is **omitted** [Lecture p. 8]. The mathematical material in Sections 37–38 is a labeled **extension**.

## 37. Optional extension: derive a 95% confidence ellipse for the mean vector

This section supplies a classical formula for completeness. The formula assumes a standard independent-observation **multivariate normal linear model**, a common error covariance matrix, and an invertible covariance estimate. It should not be used automatically if those assumptions fail.

### 37.1 Start with the new predictor row

For the reduced model,

\[
\mathbf x_0^{\mathsf T}=
\begin{bmatrix}1&1&1200\end{bmatrix}.
\]

The leading 1 corresponds to the intercept, the next 1 to GEN, and 1200 to AMT. The fitted mean response vector is

\[
\widehat{\boldsymbol\mu}_0^{\mathsf T}
=\mathbf x_0^{\mathsf T}\widehat{\mathbf B}_{\mathrm{reduced}}
=\begin{bmatrix}958.5473&754.0677\end{bmatrix}.
\]

### 37.2 Quantify how unusual the new predictor combination is

Define

\[
\boxed{h_0=\mathbf x_0^{\mathsf T}
(\mathbf X^{\mathsf T}\mathbf X)^{-1}\mathbf x_0.}
\]

Here \(h_0\) is a **scalar** and measures the design contribution to uncertainty for the fitted mean at the new predictor combination. It is related to leverage, although it is calculated at a **new** point rather than necessarily at an original data row.

Using the reduced model's 17 observations gives

\[
\boxed{h_0\approx0.0941104.}
\]

This is a derived value calculated from the source dataset, not a number printed in the lecture.

### 37.3 Estimate the residual covariance matrix for the reduced model

Using all 17 rows,

\[
\widehat{\boldsymbol\Sigma}_{\mathrm{reduced}}
=\frac{\mathbf R_{\mathrm{reduced}}^{\mathsf T}
\mathbf R_{\mathrm{reduced}}}{14}
\approx\boxed{\begin{bmatrix}
128596.88&110442.44\\
110442.44&115761.24
\end{bmatrix}}.
\]

The diagonal square roots correspond to the reduced-model residual standard errors of about 358.6 and 340.2. The residual correlation is about **0.9052**, indicating strong positive residual association in this small dataset.

### 37.4 The general ellipse inequality

Let \(\boldsymbol\mu_0\) denote a candidate true mean response vector at \(\mathbf x_0\). Let the residual degrees of freedom be \(\nu=n-k\), and let \(q\) be the number of responses. Under the standard model, a simultaneous \(100(1-\alpha)\%\) confidence ellipse for the **mean response vector** is

\[
\boxed{(
\widehat{\boldsymbol\mu}_0-\boldsymbol\mu_0
)^{\mathsf T}
\widehat{\boldsymbol\Sigma}^{-1}
(
\widehat{\boldsymbol\mu}_0-\boldsymbol\mu_0
)
\leq h_0\,c_{\alpha},}
\]

where

\[
\boxed{c_{\alpha}
=\frac{q\nu}{\nu-q+1}
F_{q,\,\nu-q+1;\,1-\alpha}.}
\]

A detailed symbol guide:

- \(\widehat{\boldsymbol\mu}_0\): the **two-dimensional point estimate** of the mean, here \((958.5473,754.0677)^{\mathsf T}\).
- \(\boldsymbol\mu_0\): a **candidate true** two-dimensional mean.
- \(\widehat{\boldsymbol\Sigma}^{-1}\): the inverse of the estimated residual covariance matrix; it accounts for residual variances and covariance.
- \(h_0\): predictor-side uncertainty factor.
- \(q\): number of response variables, here 2.
- \(\nu=n-k\): residual degrees of freedom, here \(17-3=14\).
- \(\alpha\): chosen error probability, here 0.05 for a 95% region.
- \(F_{a,b;1-\alpha}\): the \(1-\alpha\) quantile of an F distribution with \(a\) and \(b\) degrees of freedom.
- The left-hand side is a squared **Mahalanobis-type distance** between a possible true mean vector and the fitted mean, scaled by the joint residual covariance.

### 37.5 Substitute the lecture's reduced-model quantities

Here \(q=2\), \(\nu=14\), and \(1-\alpha=0.95\). Therefore,

\[
c_{0.05}=\frac{2(14)}{14-2+1}F_{2,13;0.95}
=\frac{28}{13}F_{2,13;0.95}
\approx\boxed{8.1966}.
\]

Multiplying by \(h_0\approx0.0941104\) gives

\[
h_0c_{0.05}\approx\boxed{0.7714}.
\]

So the approximate **95% joint confidence ellipse for the mean** is the set of candidate vectors \(\boldsymbol\mu_0\) satisfying

\[
\boxed{(
\boldsymbol\mu_0-\widehat{\boldsymbol\mu}_0
)^{\mathsf T}
\widehat{\boldsymbol\Sigma}_{\mathrm{reduced}}^{-1}
(
\boldsymbol\mu_0-\widehat{\boldsymbol\mu}_0
)
\leq0.7714.}
\]

The center is \(\widehat{\boldsymbol\mu}_0=(958.5473,754.0677)^{\mathsf T}\), and the ellipse's orientation and axes depend on the covariance matrix. **This is a mathematical teaching example under the assumptions; it is not a clinically validated uncertainty statement.**

## 38. Optional extension: a prediction ellipse for a new individual

For an independent new observation with the same predictors, the uncertainty includes the new residual as well as the coefficient-estimation uncertainty. The covariance multiplier is \(1+h_0\), rather than \(h_0\).

Under the same classical model, a \(100(1-\alpha)\%\) prediction ellipse takes the form

\[
\boxed{(
\mathbf y_{\mathrm{new}}-\widehat{\boldsymbol\mu}_0
)^{\mathsf T}
\widehat{\boldsymbol\Sigma}^{-1}
(
\mathbf y_{\mathrm{new}}-\widehat{\boldsymbol\mu}_0
)
\leq(1+h_0)c_{\alpha}.}
\]

For the lecture's reduced model,

\[
(1+h_0)c_{0.05}
\approx(1+0.0941104)(8.1966)
\approx\boxed{8.9680}.
\]

Compare **8.9680** for an individual future observation with **0.7714** for the unknown mean. The future-observation region is substantially wider because it includes natural individual-to-individual variation.

**Subtle but essential:** An ellipse is a **simultaneous region in two response dimensions**. It does not say TOT and AMI are both guaranteed to be within a particular range. Under appropriate model assumptions, the method has its advertised long-run coverage across repeated samples and new observations.

### 38.1 R code to draw both ellipses using only base R

The code below adds a visual demonstration that the lecture explicitly omits. It should be run **after** fitting `mmlr2` and creating `newdata`.

```r
# Reduced-model quantities
X <- model.matrix(mmlr2)
R <- residuals(mmlr2)
nu <- df.residual(mmlr2)
q <- ncol(R)
S <- crossprod(R) / nu

# New predictor row, ordered like the model matrix
x0 <- model.matrix(delete.response(terms(mmlr2)),
                   data = newdata)
center <- as.numeric(predict(mmlr2, newdata = newdata))

# Scalar leverage contribution for the new predictor combination
h0 <- as.numeric(x0 %*% solve(crossprod(X), t(x0)))

# Simultaneous 95% F multiplier
alpha <- 0.05
c95 <- (q * nu / (nu - q + 1)) *
       qf(1 - alpha, df1 = q, df2 = nu - q + 1)

# Convert points on the unit circle into points on a covariance ellipse
theta <- seq(0, 2 * pi, length.out = 401)
unit_circle <- rbind(cos(theta), sin(theta))
shape <- t(chol(S)) %*% unit_circle

mean_ellipse <- sweep(sqrt(h0 * c95) * shape, 1, center, "+")
pred_ellipse <- sweep(sqrt((1 + h0) * c95) * shape, 1, center, "+")

plot(t(pred_ellipse), type = "l", asp = 1,
     xlab = "TOT plasma level", ylab = "AMI plasma level",
     main = "MMLR: simultaneous uncertainty ellipses")
lines(t(mean_ellipse), lty = 2, lwd = 2)
points(center[1], center[2], pch = 19)
legend("topleft", bty = "n",
       legend = c("New individual: prediction ellipse",
                  "Mean response: confidence ellipse",
                  "Fitted response pair"),
       lty = c(1, 2, NA), pch = c(NA, NA, 19))
```

**How the plotting code works:**

- `model.matrix()` obtains the predictor-design matrix in the order R used when fitting.
- `delete.response(terms(mmlr2))` strips the responses from the stored formula so a new predictor row can be generated.
- `qf()` obtains the required F-distribution quantile.
- `chol(S)` computes a Cholesky factor of the covariance matrix; this transforms a circle into an appropriately tilted ellipse.
- `seq()` generates angles around a full circle, `cos()` and `sin()` provide the circle coordinates, and `sweep()` adds the fitted center to the scaled ellipse coordinates.
- `asp = 1` uses equal scaling for the horizontal and vertical coordinates.
- The dashed inner ellipse represents mean-response uncertainty; the solid outer ellipse represents uncertainty for a new individual.

A rotated ellipse with a strong upward tilt is plausible here because the two response residuals are strongly positively associated. In a real application, inspect whether the joint region extends into physically impossible values, and do not treat an unconstrained Gaussian model as automatically appropriate for quantities with strict physical boundaries.

---

# Part VI. Interpretation, reliability, and practice

## 39. What can go wrong? A complete diagnostic roadmap

The lecturer reminds students to check the same basic regression diagnostics as in a single-response model [Lecture p. 3]. That instruction is brief but important. MMLR is **not exempt** from poor fit, unusual patients, unstable coefficients, or invalid assumptions merely because its joint tests are sophisticated.

### 39.1 Check each response equation separately

For each of TOT and AMI, examine:

1. **Residuals versus fitted values.** Look for curves, systematic trends, or a fan-shaped spread. Curvature suggests a mean relationship that is not captured by the linear terms; a fan shape suggests changing residual variance.
2. **Normal Q–Q plot.** Compare standardized residual quantiles with the theoretical normal distribution. Marked departures may be problematic for small-sample inference.
3. **Residual scale plot.** Check whether residual variability is reasonably stable across fitted values.
4. **Influence and leverage.** A case with an unusual predictor combination or a large residual may disproportionately affect coefficients and tests. Study Cook's distance and leverage, not just its raw response size.
5. **Scientific validity of recorded values.** Confirm whether surprising zero measurements or very high AMT values are legitimate, miscoded, or missing-value placeholders.

R examples:

```r
fit_tot <- lm(TOT ~ GEN + AMT + PR + DIAP + QRS, data = data)
fit_ami <- lm(AMI ~ GEN + AMT + PR + DIAP + QRS, data = data)

par(mfrow = c(2, 2))
plot(fit_tot, main = "TOT diagnostics")

par(mfrow = c(2, 2))
plot(fit_ami, main = "AMI diagnostics")

par(mfrow = c(1, 1))
```

The four standard `plot(lm(...))` panels include residuals-versus-fitted, normal Q–Q, scale-location, and residuals-versus-leverage with influence information. The `par(mfrow = c(2,2))` setting arranges four plots in a 2-by-2 grid. The final `par(mfrow = c(1,1))` restores a simple plot layout.

### 39.2 Check joint residual structure

Because the two responses are modeled together, also inspect the **pairing of residuals**:

```r
R <- residuals(mmlr1)
plot(R[, "TOT"], R[, "AMI"], pch = 19,
     xlab = "TOT residual", ylab = "AMI residual",
     main = "Paired residuals from the full MMLR model")
abline(h = 0, v = 0, lty = 2)
cor(R)
```

A positive residual correlation is **allowed** in MMLR. However, nonlinear patterns, distinct clusters, or a few extreme pairs may reveal problems not obvious from the two separate one-dimensional residual summaries.

### 39.3 Check multivariate residual outliers

A **Mahalanobis distance** uses the covariance matrix to measure the distance of a residual pair from the residual center in standardized joint units:

\[
D_i^2=\mathbf r_i^{\mathsf T}
\widehat{\boldsymbol\Sigma}^{-1}\mathbf r_i.
\]

Each \(\mathbf r_i\) is a two-element residual vector. A large distance may indicate an unusual combination of residuals even if neither individual residual is the single largest. This is an **exploratory** diagnostic, not an automatic rule for removing observations.

```r
R <- residuals(mmlr1)
S <- crossprod(R) / df.residual(mmlr1)
D2 <- mahalanobis(R, center = c(0, 0), cov = S)

sort(D2, decreasing = TRUE)
plot(D2, type = "h", xlab = "Patient row", ylab = "Squared distance")
```

Here `mahalanobis()` computes squared distances using a specified center and covariance matrix. The model residuals sum to zero separately when an intercept is included. Because the covariance was estimated from the same fitted residuals and leverage differs between patients, **a simple chi-square threshold is not automatically an exact outlier test**. Investigate flagged cases in context rather than deleting them mechanically.

### 39.4 Check the predictors for unstable relationships

If two predictors are highly correlated, their fitted coefficients may be unstable and the individual standard errors may be large. This is called **multicollinearity**. It can occur even though OLS still produces a fitted model.

```r
cor(data[, c("AMT", "PR", "DIAP", "QRS")])

# If car is installed:
car::vif(fit_tot)
```

A variance inflation factor (VIF) measures how much the variance of a coefficient is increased by its linear relationship with the other predictors. VIF is not a single decisive cutoff or a way to establish causality.

### 39.5 Check sample size and overfitting

In the full model, each response uses six coefficients from **17 patients**. The residual degrees of freedom are 11. This is a very small dataset for confident extrapolation or detailed subgroup conclusions. A model with a high training R-squared may behave less well on new cases. In a production business or medical analysis, evaluate new-data performance, use sensible regularization if warranted, and gather more observations when possible.

### 39.6 Understand what raw normality tests can and cannot say

Normality of the original responses or predictors is not the central assumption. For classical MMLR, it is the **conditional multivariate error distribution** that matters. Check patterns after fitting and examine the error vector jointly. A single normality test applied to the raw TOT column cannot establish the multivariate regression error assumptions.

### 39.7 Correlation of outcomes may arise from their definitions

In the clinical example, `AMI` is described as an amount present in the overall TCAD plasma level `TOT`. These quantities are related in what they represent. Strong residual correlation should therefore not be surprising and must not be interpreted as an independent causal relationship between two outcomes. Depending on the scientific goal, models that respect any structural or physical constraints between outcomes may be more appropriate.

## 40. How to choose between the full and reduced models responsibly

The lecture's learning objective is how to apply a **multivariate coefficient test** and consider a smaller model. In a real project, model selection involves more than a single p-value.

| Decision dimension | Question to ask |
|---|---|
| Statistical evidence | Are the additional predictor rows jointly significant under the **prespecified** multivariate test? |
| Scientific relevance | Is a predictor needed as an important adjustment variable even if its own p-value is large? |
| Predictive performance | Does the model perform well on data not used to estimate its coefficients? |
| Stability | Do small data changes dramatically change coefficients or significance? |
| Assumptions | Are key diagnostics acceptable, or are we fitting a misleading model? |
| Interpretability | Can someone correctly understand and use the included terms? |
| Measurement quality | Are zeros, outliers, units, and category definitions reliable? |

The full model has better training fit, which is expected. The reported Wilks block test provides insufficient evidence to conclude that the extra terms have a joint effect at 5%. That may justify using the reduced model **as a teaching illustration of parsimony**, while keeping open the possibility that the small sample misses meaningful relationships.

## 41. Turn the statistical output into understandable business language

Imagine we had exactly the same statistical setup in a retail study, but with responses **monthly sales** and **customer satisfaction**, predictors **advertising spend**, **store size**, **staffing level**, and other store characteristics.

A weak report would say: “The independent variables are significant; the Wilks' lambda is 0.44.” This does not specify which variables or which hypothesis is being tested and does not tell a manager what the results mean.

A more useful report follows this sequence:

1. **State the business question.** “We investigated whether staffing level, store size, and display area jointly provide additional information about sales and satisfaction after accounting for advertising and store category.”
2. **State the modeling structure.** “We fitted a multiple-response linear model with two outcomes and a shared set of predictors.”
3. **Describe individual associations with units.** “Holding the included factors constant, each additional unit of advertising expenditure was associated with an estimated increase of [coefficient] sales units, while its satisfaction association was [coefficient] points.” Replace brackets only with **actual verified** estimates from the business dataset.
4. **Give the joint test and its null hypothesis.** “The multivariate test examined whether all three additional predictor rows were simultaneously zero across both outcomes.”
5. **Give the statistical decision accurately.** “The joint test did not reject at the selected significance level.” Do not translate this into “proved no effect.”
6. **Explain a practical limitation.** “Results are observational and subject to model assumptions, measurement issues, and sample-size limitations.”
7. **Report predictions as estimates.** Include an uncertainty region if a prediction will guide an actual decision.

### 41.1 A complete source-based interpretation paragraph

The following paragraph is about the **lecture's actual patient dataset**, not an invented commercial analysis:

> In an exploratory multivariate multiple regression of 17 patient records, total TCAD plasma level (TOT) and amitriptyline plasma level (AMI) were jointly modeled using GEN, AMT, PR, DIAP, and QRS. Type II Wilks tests provided evidence of joint associations for GEN (p = 0.004873) and AMT (p = 0.002819), whereas PR, DIAP, and QRS were not individually significant as multivariate terms at the 5% level. When all three latter terms were tested together, the nested-model Wilks comparison did not reject their joint exclusion (lambda = 0.4405, approximate F(6,20) = 1.689, p = 0.1755). A simpler two-predictor model produced fitted values of 958.55 for TOT and 754.07 for AMI at GEN = 1 and AMT = 1200. These are model-based associations and predictions rather than causal or clinical recommendations. The small sample and the significant Roy alternative test warrant caution when interpreting model selection.

Notice what is **not** claimed: that gender caused the difference, that three predictors are proven irrelevant, that the numerical plasma predictions are guaranteed, or that the model is suitable for clinical use.

---
## 42. One complete reproducible R workflow

This section is a **standalone practical script**. A reader can copy the complete code block into a new R script in RStudio, run it from the top, and reproduce the numerical examples without requiring the original external `.dat` file. The calculations using base R can run without installing any additional package. The `car`-specific tests run if `car` is installed.

```r
# ================================================================
# DA2451 - Lecture 09: Multivariate multiple linear regression
# Reproduces the 17-patient exercise printed in Lec9.pdf
# ================================================================

# 1. Reconstruct the original lecture data from all 17 rows

data <- read.table(text = "
TOT AMI GEN AMT PR DIAP QRS
3389 3149 1 7500 220 0 140
1101 653 1 1975 200 0 100
1131 810 0 3600 205 60 111
596 448 1 675 160 60 120
896 844 1 750 185 70 83
1767 1450 1 2500 180 60 80
807 493 1 350 154 80 98
1111 941 0 1500 200 70 93
645 547 1 375 137 60 105
628 392 1 1050 167 60 74
1360 1283 1 3000 180 60 80
652 458 1 450 160 64 60
860 722 1 1750 135 90 79
500 384 0 2000 160 60 80
781 501 0 4500 180 0 100
1070 405 0 1500 170 90 120
1754 1520 1 3000 180 0 129
", header = TRUE)

stopifnot(
  nrow(data) == 17,
  ncol(data) == 7,
  all(names(data) == c("TOT", "AMI", "GEN", "AMT", "PR", "DIAP", "QRS")),
  !anyNA(data)
)

# 2. Explore the data

print(summary(data))
print(table(data$GEN))
print(cor(data[, c("TOT", "AMI")]))
pairs(data, pch = 19)

# 3. Fit the full multivariate multiple regression

mmlr1 <- lm(cbind(TOT, AMI) ~ GEN + AMT + PR + DIAP + QRS,
            data = data)
print(summary(mmlr1))

# 4. Demonstrate equivalence to separate regressions

mlr1 <- lm(TOT ~ GEN + AMT + PR + DIAP + QRS, data = data)
mlr2 <- lm(AMI ~ GEN + AMT + PR + DIAP + QRS, data = data)

print(summary(mlr1))
print(summary(mlr2))

stopifnot(
  isTRUE(all.equal(unname(coef(mmlr1)[, 1]), unname(coef(mlr1)))),
  isTRUE(all.equal(unname(coef(mmlr1)[, 2]), unname(coef(mlr2))))
)

# 5. Extract all quantities discussed in the lecture

print(head(residuals(mmlr1)))
print(head(fitted(mmlr1)))
print(coef(mmlr1))
print(sigma(mmlr1))
print(vcov(mmlr1))

# 6. Estimate the joint error covariance matrix

R_full <- residuals(mmlr1)
E_full <- crossprod(R_full)
S_full <- E_full / df.residual(mmlr1)

print(E_full)
print(S_full)
print(cor(R_full))

# 7. Fit the reduced model

mmlr2 <- lm(cbind(TOT, AMI) ~ GEN + AMT, data = data)
print(summary(mmlr2))

# 8. Compare full and reduced models using the lecture's test

print(anova(mmlr1, mmlr2, test = "Wilks"))

# 9. Manually reconstruct the H and E matrices of the block test

R_reduced <- residuals(mmlr2)
E_reduced <- crossprod(R_reduced)
H_block <- E_reduced - E_full

print(H_block)
print(E_full)

wilks_manual <- det(E_full) / det(H_block + E_full)
print(wilks_manual)
stopifnot(abs(wilks_manual - 0.4405021) < 0.000001)

# 10. Verify the four multivariate statistics from the roots

roots <- Re(eigen(solve(E_full, H_block), only.values = TRUE)$values)

statistics_manual <- c(
  Pillai = sum(roots / (1 + roots)),
  Wilks = prod(1 / (1 + roots)),
  Hotelling_Lawley = sum(roots),
  Roy = max(roots)
)
print(statistics_manual)

# 11. Tests from the car package, if available

if (requireNamespace("car", quietly = TRUE)) {
  print(car::Anova(mmlr1, test.statistic = "Wilks"))

  lhypo <- car::linearHypothesis(
    mmlr1,
    hypothesis.matrix = c("PR = 0", "DIAP = 0", "QRS = 0")
  )
  print(lhypo)

  # The same SSP matrices are stored in this object:
  print(lhypo$SSPH)
  print(lhypo$SSPE)
  print(det(lhypo$SSPE) / det(lhypo$SSPH + lhypo$SSPE))
} else {
  message("For car::Anova and car::linearHypothesis, install.packages('car')")
}

# 12. Predict both responses using the reduced model

newdata <- data.frame(GEN = 1, AMT = 1200)
point_prediction <- predict(mmlr2, newdata = newdata)
print(point_prediction)

stopifnot(
  abs(point_prediction[1, "TOT"] - 958.5473) < 0.001,
  abs(point_prediction[1, "AMI"] - 754.0677) < 0.001
)

# 13. Quantify the mean prediction's uncertainty factor

X_reduced <- model.matrix(mmlr2)
x0 <- model.matrix(delete.response(terms(mmlr2)), newdata)

h0 <- as.numeric(x0 %*% solve(crossprod(X_reduced), t(x0)))

nu <- df.residual(mmlr2)
q <- ncol(residuals(mmlr2))
S_reduced <- E_reduced / nu

c95 <- (q * nu / (nu - q + 1)) *
       qf(0.95, df1 = q, df2 = nu - q + 1)

print(h0)                  # Approximately 0.09411035
print(S_reduced)           # Reduced-model residual covariance
print(c95)                 # Approximately 8.196602
print(h0 * c95)            # Mean-response ellipse multiplier
print((1 + h0) * c95)      # New-individual ellipse multiplier

# 14. A few diagnostic checks for the full model

plot(R_full[, 1], R_full[, 2], pch = 19,
     xlab = "TOT residual", ylab = "AMI residual",
     main = "Paired multivariate regression residuals")
abline(h = 0, v = 0, lty = 2)

joint_distance_sq <- mahalanobis(
  R_full, center = c(0, 0), cov = S_full
)
print(sort(joint_distance_sq, decreasing = TRUE))
```

### 42.1 A shorter version, if you already have the data loaded

The lecture's main idea reduces to just a few commands. Run these **only after** your data frame `data` has been prepared with the required columns:

```r
mmlr1 <- lm(cbind(TOT, AMI) ~ GEN + AMT + PR + DIAP + QRS,
            data = data)
summary(mmlr1)

car::Anova(mmlr1, test.statistic = "Wilks")

mmlr2 <- lm(cbind(TOT, AMI) ~ GEN + AMT, data = data)
anova(mmlr1, mmlr2, test = "Wilks")

lhypo <- car::linearHypothesis(
  mmlr1,
  hypothesis.matrix = c("PR = 0", "DIAP = 0", "QRS = 0")
)

det(lhypo$SSPE) / det(lhypo$SSPH + lhypo$SSPE)
predict(mmlr2, newdata = data.frame(GEN = 1, AMT = 1200))
```

The short version assumes the optional `car` package is installed. The long version handles its absence without stopping the entire script.

## 43. Worked understanding and examination practice

The following problems are **new teaching exercises**, constructed from the chapter and the lecture dataset. They are not presented as questions printed in `Lec9.pdf`. Each answer includes the reasoning, not just the final number.

### Problem 1. Identify the model correctly

A researcher wants to predict (a) annual salary from years of experience; (b) annual salary from years of experience and education; (c) salary and job satisfaction from years of experience; and (d) salary and satisfaction from years of experience and education.

**Solution:**

- **(a)** One response, one predictor: **simple linear regression**.
- **(b)** One response, two predictors: **multiple linear regression**.
- **(c)** Two responses, one predictor: a **multivariate simple linear model** or multiple-response regression.
- **(d)** Two responses, two predictors: **multivariate multiple linear regression**.

The important classification rule is to count **response columns first**, then predictor columns. Do not infer the type merely from how many variables appear in total.

### Problem 2. Determine dimensions, parameters, and degrees of freedom

There are 50 stores, 3 responses, and 4 predictors plus an intercept. What are the dimensions of \(\mathbf X\), \(\mathbf Y\), and \(\mathbf B\)? How many regression coefficients are there? What are the residual degrees of freedom?

**Solution:**

1. \(n=50\), \(q=3\), \(s=4\), and \(k=s+1=5\).
2. \(\mathbf X\) has \(50\times5\) entries, because every observation has one intercept and four predictor values.
3. \(\mathbf Y\) is \(50\times3\), one column per response.
4. \(\mathbf B\) is \(5\times3\), so there are \(5(3)=15\) regression coefficients altogether.
5. The residual degrees of freedom **per response** are \(n-k=50-5=45\).
6. The product \((50\times5)(5\times3)\) gives \(50\times3\), matching the response matrix.

### Problem 3. Interpret a categorical coefficient without claiming causation

The reduced lecture model estimates the TOT GEN coefficient as 507.07308. What does that mean?

**Solution:** The predictor uses GEN = 0 for one group and GEN = 1 for another. Holding **AMT fixed**, the model fits TOT about **507.07 units higher** for the GEN = 1 group than for the GEN = 0 group. The relationship is conditional on the reduced model's included terms. It does **not** prove a causal effect of group membership, and its magnitude should not be given a clinical interpretation without further validation.

### Problem 4. Predict for both categories at the same AMT

Use the reduced model with `AMT = 1200` to predict TOT and AMI for both `GEN = 0` and `GEN = 1`.

**Solution:** The reduced equations are

\[
\begin{aligned}
\widehat{\mathrm{TOT}}&=56.72005+507.07308\,\mathrm{GEN}+0.3289618\,\mathrm{AMT},\\
\widehat{\mathrm{AMI}}&=-241.34791+606.30967\,\mathrm{GEN}+0.3242549\,\mathrm{AMT}.
\end{aligned}
\]

For `GEN = 0`:

\[
\widehat{\mathrm{TOT}}=56.72005+0+0.3289618(1200)
\approx\boxed{451.47}.
\]

\[
\widehat{\mathrm{AMI}}=-241.34791+0+0.3242549(1200)
\approx\boxed{147.76}.
\]

For `GEN = 1`:

\[
\widehat{\mathrm{TOT}}\approx\boxed{958.55},
\qquad
\widehat{\mathrm{AMI}}\approx\boxed{754.07}.
\]

The two category differences are exactly the model's GEN coefficients (subject to rounding):

\[
958.55-451.47\approx507.08,
\qquad
754.07-147.76\approx606.31.
\]

This is also an illustration of the **no-interaction assumption** in the reduced additive model. The fitted GEN difference remains constant across AMT values because the equation contains no `GEN:AMT` interaction term. Whether that assumption is appropriate would need to be assessed separately.

### Problem 5. Recalculate a patient residual

In the full model, patient 3 has observed TOT = 1131 and AMI = 810. The fitted values are approximately 1530.2477 and 1183.8524. Calculate the residual vector.

**Solution:** For each response, residual = observed minus fitted:

\[
\begin{aligned}
e_{3,T}&=1131-1530.2477=\boxed{-399.2477},\\
e_{3,A}&=810-1183.8524=\boxed{-373.8524}.
\end{aligned}
\]

So the patient's fitted values exceed their observed values for **both** responses. The residual vector is

\[
\mathbf r_3=\begin{bmatrix}-399.2477\\-373.8524\end{bmatrix}.
\]

A negative residual does not mean that the original measured response is negative.

### Problem 6. Calculate adjusted R-squared

The full TOT model has \(R^2=0.8871\), \(n=17\), and \(k=6\). Calculate adjusted \(R^2\).

**Solution:**

\[
\begin{aligned}
R_{\mathrm{adj}}^2
&=1-(1-R^2)\frac{n-1}{n-k}\\
&=1-(1-0.8871)\frac{16}{11}\\
&=1-0.1129(1.454545\ldots)\\
&\approx\boxed{0.8358}.
\end{aligned}
\]

The result matches the lecture's rounded adjusted \(R^2\). The adjustment penalizes model complexity relative to sample size.

### Problem 7. Find Wilks' lambda for a small invented pair of SSP matrices

Suppose a new two-response problem has

\[
\mathbf E=\begin{bmatrix}4&1\\1&9\end{bmatrix},
\qquad
\mathbf H=\begin{bmatrix}2&1\\1&1\end{bmatrix}.
\]

Calculate Wilks' lambda. Can you conclude significance directly from your answer?

**Solution:** First compute the error determinant:

\[
|\mathbf E|=4(9)-1(1)=36-1=35.
\]

Next add the matrices:

\[
\mathbf H+\mathbf E
=\begin{bmatrix}6&2\\2&10\end{bmatrix}.
\]

Its determinant is

\[
|\mathbf H+\mathbf E|=6(10)-2(2)=60-4=56.
\]

Therefore,

\[
\boxed{\Lambda=\frac{35}{56}=0.625.}
\]

This value alone does **not** tell you whether the effect is significant. You also need the number of observations, outcomes, restrictions, and the correct reference distribution or approximation to find the p-value.

### Problem 8. Why is the coefficient matrix 6 by 2 instead of 5 by 2?

The full lecture model has five named predictors, but `coef(mmlr1)` shows six rows and two columns. Explain.

**Solution:** Ordinary `lm()` includes an **intercept by default**. The six rows represent intercept, GEN, AMT, PR, DIAP, and QRS. The two columns represent TOT and AMI. Therefore the coefficient matrix is \(6\times2\). Each response has its **own** intercept and five slopes.

### Problem 9. Set up the correct joint null hypothesis

A student wants to test whether PR and QRS can be removed from the full model while keeping GEN, AMT, and DIAP. What is the exact null hypothesis, how many coefficient restrictions are involved, and what might the R code look like?

**Solution:** Because the model has two response variables, removal of PR and QRS sets **four** coefficients to zero:

\[
H_0:\beta_{P,T}=\beta_{P,A}=\beta_{Q,T}=\beta_{Q,A}=0.
\]

One method is

```r
car::linearHypothesis(
  mmlr1,
  hypothesis.matrix = c("PR = 0", "QRS = 0")
)
```

The equivalent nested-model setup is

```r
smaller <- lm(cbind(TOT, AMI) ~ GEN + AMT + DIAP, data = data)
anova(mmlr1, smaller, test = "Wilks")
```

This hypothetical comparison is a **new exercise**. Its numerical p-value is **not** reported in the lecture, and we should not pretend otherwise.

### Problem 10. Explain a p-value without saying it is the probability of the null

In the source's block test, Wilks has p = 0.1755. A student says, “There is a 17.55% probability that PR, DIAP, and QRS have no effect.” Explain the error.

**Solution:** The p-value is calculated **assuming the zero-coefficient null is true**. It describes how unusual a test statistic at least as extreme as the one observed would be under that null and the model assumptions. It is not the probability that the null itself is true. At \(\alpha=0.05\), the appropriate decision is **do not reject the null**. We cannot conclude that the predictors truly have zero coefficients or that removing them is guaranteed harmless in new data.

### Problem 11. Resolve the Roy test disagreement

The source reports Wilks p = 0.17553 and Roy p = 0.03906 for the same three-predictor block. Must one output be a software error?

**Solution:** No. The two statistics summarize the hypothesis and error matrices in different ways. Wilks multiplies contributions across multivariate roots, while Roy focuses on the **largest** root. They have different reference approximations and can give different rejection decisions. The correct answer reports the discrepancy, relies on a scientifically justified primary criterion, and discusses small-sample uncertainty. It does not hide the Roy result or assert without evidence that one result must be wrong.

### Problem 12. Explain what the confidence ellipse adds

Why is an ellipse more natural than reporting one separate interval for TOT and another for AMI?

**Solution:** Both outcomes are recorded for the same individual and their model errors are correlated. Their uncertainty is therefore not described completely by two independent one-dimensional ranges. A **joint ellipse** uses the entire two-by-two covariance matrix, including its off-diagonal terms, to represent uncertainty about the **pair**. It can tilt along the direction of the strongest co-movement. A mean-response ellipse addresses uncertainty in the **population conditional mean vector**; a prediction ellipse for a **new individual** additionally includes that person's residual variability and is typically wider.

## 44. Important conceptual traps and how to avoid them

| Common claim | Why it is incorrect | Better understanding |
|---|---|---|
| “Multiple linear regression means multiple responses.” | *Multiple* here generally counts predictors. | **Multivariate** refers to multiple responses. |
| “MMLR must produce different individual coefficients from separate regressions.” | Ordinary MMLR with a shared predictor design uses the same OLS estimator for each response. | Separate fits reproduce the individual coefficients; **joint inference** is the added dimension. |
| “A positive coefficient proves that increasing the predictor causes the outcome to rise.” | Observational regressions may have confounding or reverse causality. | A coefficient is a **conditional association**, unless causal identification is justified. |
| “A high R-squared means a strong causal model or accurate future prediction.” | R-squared describes **in-sample variation explained**. | Assess new-data prediction and causal design separately. |
| “A p-value of 0.03 means the null has a 3% probability.” | This reverses what probability is being conditioned on. | A p-value describes the result's extremeness **under the null**. |
| “All of the predictor's response-specific t tests must be significant for its multivariate test to be significant.” | A joint test uses the response covariance and a different null distribution. | Test the **coefficient vector jointly**. |
| “PR is significant because the TOT t-test has p = 0.034.” | That is only one response-specific coefficient test. | The Type II **joint** PR Wilks p-value is 0.1192. |
| “All three separate Type II p-values are large, so dropping all three together is automatically safe.” | The block restriction is a different, jointly tested hypothesis. | Fit the nested models or test all rows with `linearHypothesis()`. |
| “Wilks' lambda = 0.4405 means p = 0.4405.” | A test statistic is not its p-value. | The lecture's approximate F conversion gives p = 0.1755. |
| “The four MANOVA criteria must always agree.” | They emphasize different combinations of multivariate roots. | Report which criterion is used and any material disagreement. |
| “The reduced model fits the existing sample just as well in SSE.” | It has **larger** residual SSEs and smaller R-squared values. | The model comparison did **not detect sufficient statistical evidence** to justify the extra predictors at 5%. |
| “The coefficient matrix has 5 by 2 entries.” | The intercept is an estimated coefficient. | The full model's matrix is **6 by 2**. |
| “`sigma(mmlr1)` is the whole error covariance matrix.” | It returns a residual standard error **per response**. | Use `crossprod(residuals(mmlr1)) / df.residual(mmlr1)` for the full covariance estimate. |
| “Raw response normality is required.” | The classical assumption concerns the **conditional errors**. | Examine residuals and the multivariate error model. |
| “Two separate 95% intervals automatically make a 95% joint region.” | Simultaneous coverage requires a joint calculation. | Use an appropriate **multivariate confidence region**. |
| “The fitted patient plasma levels can be used clinically.” | This is a tiny observational educational dataset, with unverified measurement details. | Treat predictions as an illustration, **not medical guidance**. |

## 45. An advanced connection: when is fitting equations separately enough?

The lecture teaches a useful special fact: because both responses are fitted on **exactly the same predictor matrix**, separate OLS fits return the same regression coefficients as the multivariate matrix formula. It is worth understanding the boundary of that statement.

If two response equations use **different predictors**, some methods that explicitly account for correlated errors, such as **seemingly unrelated regression** (SUR), can sometimes estimate coefficients differently and more efficiently than separate OLS equations. When the predictor matrix is identical in every equation under the standard SUR assumptions, the usual generalized least-squares coefficients coincide with separate OLS coefficients. This is an **advanced connection**, not a topic developed in the eight-page lecture.

Similarly, if the research question imposes **cross-response coefficient restrictions** (for example, “the advertising slope must be identical in the two response equations”), the estimation procedure may change because it is no longer the unrestricted MMLR problem the lecturer fits.

The practical lesson is to distinguish:

- **Estimation:** What coefficient structure is assumed and how are coefficients calculated?
- **Inference:** What hypothesis about one or more coefficients is being tested?
- **Prediction:** What response values and uncertainty regions are produced for a new predictor combination?

These are related, but they are **not the same question**.

## 46. Source-to-chapter verification index

Every one of the original eight lecture pages is represented below. This lets the reader move between the original PDF and the expanded explanations without confusing new teaching material with the lecturer's source.

| Source page | Material actually on the page | Expanded explanation in this chapter |
|---|---|---|
| **1** | Definition and motivation for MMLR; why separate fits are not enough for inference; Johnson–Wichern hospital dataset; TOT, AMI, GEN, AMT, PR, DIAP, QRS; R import and first six rows | §§ 1–6, 9–11, 14–15 |
| **2** | Dataset rows 7–17; `summary()` and `pairs()`; `cbind()` and `lm()`; full-model TOT output including residuals, coefficients, RSE, R-squared, adjusted R-squared, F | §§ 14–20 |
| **3** | Full-model AMI output; separate-regression equivalence; diagnostics reminder; first four paired residual outputs | §§ 18–22, 39 |
| **4** | Residuals continued; paired fitted values; `coef()`, `sigma()`, `vcov()`; why coefficient covariance matters | §§ 21–22 |
| **5** | Type II `car::Anova()` Wilks tests; significance interpretation; reduced model `mmlr2`; nested `anova()` comparison and generalized variance | §§ 23–27 |
| **6** | Interpretation of reduced-versus-full p-value; `linearHypothesis()` with three restrictions; hypothesis and error SSP matrices; Pillai, Wilks, Hotelling–Lawley, Roy results; Wilks' determinant formula | §§ 27–31 |
| **7** | `det()` calculation of Wilks' lambda; reduced-model TOT summary; beginning of reduced-model AMI summary | §§ 30, 33–34 |
| **8** | Remaining reduced-model AMI summary; `predict()` for GEN = 1, AMT = 1200; two response predictions; prediction uncertainty and omitted ellipse discussion | §§ 34–38 |

**Source provenance notes:** The numerical table, displayed regression results, and R procedure sequence come from the attached `Lec9.pdf`. The PDF attributes its dataset to Johnson and Wichern, *Applied Multivariate Statistical Analysis*, 6th edition, Exercise 7.25; it refers to Fox and Weisberg (2019) for the `car` package. The page itself also points to a general “Testing regression assumptions” webpage without providing substantive diagnostic instructions. The detailed diagnostic material in this chapter is therefore clearly treated as an additional explanation.

## 47. Final integrated understanding

Return to the question that started the chapter: *How can we analyze more than one outcome using a common set of predictors?*

We began with a single regression line because it teaches the ideas of a **response**, **predictor**, **intercept**, **slope**, **fitted value**, and **residual**. We then added multiple predictors to understand conditional coefficient interpretation. Finally, we allowed the response itself to become a **vector** rather than a single number.

That last move is what makes the model **multivariate**. The mathematical relationship

\[
\mathbf Y=\mathbf X\mathbf B+\mathbf U
\]

contains all the ordinary regression relationships at once. Its coefficient estimator

\[
\widehat{\mathbf B}
=(\mathbf X^{\mathsf T}\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf Y
\]

explains why the separate regressions agree on their coefficients. But fitting the columns separately does not answer a joint scientific question. The errors of the response variables can covary, so a hypothesis about predictor coefficients **across multiple outcomes** must respect that covariance.

The lecture's decisive calculation uses the hypothesis SSP matrix \(\mathbf H\) and residual SSP matrix \(\mathbf E\) to calculate

\[
\Lambda=\frac{|\mathbf E|}{|\mathbf H+\mathbf E|}
=0.4405021.
\]

For the particular six-restriction comparison, the selected Wilks test gives **p = 0.1755**. This does not establish that the dropped predictors are useless, but it shows why a smaller two-predictor model is worth considering. That smaller model still predicts **two outcomes**:

\[
\widehat{\boldsymbol\mu}_0
=\begin{bmatrix}958.5473\\754.0677\end{bmatrix}
\quad\text{for GEN = 1 and AMT = 1200}.
\]

And because those two outcomes may vary together, the natural next step is a **two-dimensional uncertainty ellipse**, not simply two isolated numbers.

If you can explain **why coefficients are fitted separately but tested jointly**, and can move between **the R commands, the coefficient matrix, the H/E matrices, Wilks' lambda, and the two-response prediction**, you understand the central mathematical and practical story of **Lecture 09: Multivariate Multiple Linear Regression**.

---

**End of teaching chapter.**  
**Primary document reviewed:** `Lec9.pdf`, all eight numbered pages.  
**Reproducibility:** The printed 17-row dataset was reconstructed and the core model estimates, residual covariance matrices, joint SSP matrices, Wilks' lambda, four multivariate criteria, and the final prediction were independently checked numerically. The R examples are written for ordinary base R and, where specified, `car`.
