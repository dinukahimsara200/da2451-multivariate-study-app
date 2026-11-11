# Multivariate Methods in Business (DA3420 / DA2451)

## Past Examination Papers (Questions Only)

### Table of Contents

1. **19 Batch (July 2022)**
   * Final Examination (DA3420 - July 2022)
2. **20 Batch (August 2023)**
   * Final Examination (DA3420 - August 2023)
3. **21 Batch (2023 / January 2024)**
   * In-Class Examination (DA2451 - Semester 4, 2023)
   * Final Examination (DA2451 - January 2024)
4. **22 Batch (December 2024)**
   * Final Examination (DA2451 - December 2024)
5. **23 Batch (2025 / October 2025)**
   * In-Class Quiz 1 (DA2451 - Semester 4, 2025)
   * In-Class Quiz 2 (DA2451 - Semester 4, 2025)
   * In-Class Quiz 3 (DA2451 - Semester 4, 2025)
   * Final Examination (DA2451 - October 2025)

---

# 1. 19 BATCH (JULY 2022)

## Final Examination (July 2022)

**UNIVERSITY OF MORATUWA**  
**FACULTY OF BUSINESS**  
**DEPARTMENT OF DECISION SCIENCES**  
**BACHELOR OF BUSINESS SCIENCE (BBSc.)**  
**SEMESTER V EXAMINATION**  
**DA3420 - Multivariate Methods in Business**  
**Time allowed: 3 Hours | July 2022**

**INSTRUCTIONS TO CANDIDATES:**

* This paper contains 4 questions on 6 pages.
* This examination accounts for 60% of the course assessment.
* This is an open book examination.
* Answer all FOUR (04) questions.
* Total mark: 100. The maximum marks attainable for each question are indicated in the square brackets.
* Electronic/communication devices are not permitted. The only equipment allowed is a calculator.
* Show your complete work to get any credit. Be neat and legible.
* Time allowed to answer all questions will be 3 hours and you will have extra 30 minutes to scan and submit your answer sheets.
* Upload your scanned handwritten answer sheets as a single PDF file to the examination submission portal created on the Moodle course page.

### Question 1

Let $X = \begin{bmatrix} X_1 \\ X_2 \\ X_3 \end{bmatrix}$ be $N_3(\mu, \Sigma)$ with

$$
\mu = \begin{bmatrix} -3 \\ 1 \\ 4 \end{bmatrix} \quad \text{and} \quad \Sigma = \begin{bmatrix} 1 & -2 & 0 \\ -2 & 6 & 0 \\ 0 & 0 & 2 \end{bmatrix}
$$

**(a) Which of the following random variables are independent? Explain.**
* **(i)** $X_1$ and $X_2$ `[1 mark]`
* **(ii)** $X_2$ and $X_3$ `[1 mark]`
* **(iii)** $(X_1, X_2)$ and $X_3$ `[1 mark]`
* **(iv)** $X_2$ and $X_2 - 2X_1 - X_3$ `[1 mark]`

**(b) Find the conditional distribution of** $X_2$**, given that** $X_1 = x_1$ **and** $X_3 = x_3$**.** `[3 marks]`

**(c) Find the distribution of** $2X_1 - 3X_2 + X_3$**.** `[4 marks]`

**(d) Find the distribution of** $AX$**, where** $A = \begin{bmatrix} 1 & 0 & -1 \\ 0 & 1 & -1 \end{bmatrix}$**.** `[4 marks]`

**(e) Setting** $X_{(1)} = \begin{bmatrix} X_1 \\ X_2 \end{bmatrix}$ **and** $X_{(2)} = [X_3]$**, the given mean vector** $\mu$ **and the covariance matrix** $\Sigma$ **can be partitioned as**

$$
\mu = \begin{bmatrix} \mu_1 \\ \mu_2 \end{bmatrix} \quad \text{and} \quad \Sigma = \begin{bmatrix} \Sigma_{11} & \Sigma_{12} \\ \Sigma_{21} & \Sigma_{22} \end{bmatrix}
$$

* **(i)** Find the elements in $\mu_1, \mu_2, \Sigma_{11}, \Sigma_{12}, \Sigma_{21}$, and $\Sigma_{22}$. `[3 marks]`
* **(ii)** Show that
  $$
  (X - \mu)' \Sigma^{-1} (X - \mu) = (X_{(1)} - \mu_1)' \Sigma_{11}^{-1} (X_{(1)} - \mu_1) + (X_{(2)} - \mu_2)' \Sigma_{22}^{-1} (X_{(2)} - \mu_2).
  $$
  *Hint: The inverse of* $\begin{bmatrix} \Sigma_{11} & 0 \\ 0' & \Sigma_{22} \end{bmatrix}$ *is* $\begin{bmatrix} \Sigma_{11}^{-1} & 0 \\ 0' & \Sigma_{22}^{-1} \end{bmatrix}$ *where* $0 = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$*.* `[4 marks]`

**(f) Let** $X_1, X_2, \dots, X_{80}$ **be a random sample of size 80 from the above three-variate normal distribution with mean** $\mu$ **and covariance** $\Sigma$**. Specify each of the following completely.**
* **(i)** The distribution of $\bar{X}$ `[1 mark]`
* **(ii)** The distribution of $(\bar{X} - \mu)' \left(\frac{\Sigma}{n}\right)^{-1} (\bar{X} - \mu)$ `[1 mark]`
* **(iii)** The distribution of $(\bar{X} - \mu)' \left(\frac{S}{n}\right)^{-1} (\bar{X} - \mu)$ `[1 mark]`

`[Total marks for Question 1 = 25]`

### Question 2

Suppose the random variables $X_1$ and $X_2$ have the covariance matrix

$$
\Sigma = \begin{bmatrix} 5 & 2 \\ 2 & 2 \end{bmatrix}
$$

**(a) Calculate the eigenvalue-eigenvector pairs of** $\Sigma$**. When deriving corresponding eigenvectors for both eigenvalues, set** $X_2 = 1$ **and normalize the eigenvectors.** `[5 marks]`

**(b) Using the eigenvectors from Part (a), derive the corresponding principal component equations.** `[2 marks]`

**(c) Derive the correlation matrix of** $X_1$ **and** $X_2$**.** `[3 marks]`

**(d) If the eigenvalue-eigenvector pairs of the correlation matrix are** $\lambda_1 = 1.63$**,** $e_1' = [0.707, \, 0.707]$ **and** $\lambda_2 = 0.37$**,** $e_2' = [-0.707, \, 0.707]$**, derive the principal component equations obtained from the correlation matrix. You should give the equations with respect to** $X_1, X_2, \mu_1$**, and** $\mu_2$ **where** $\mu_1$ **and** $\mu_2$ **are the means of** $X_1$ **and** $X_2$**, respectively.** `[4 marks]`

**(e) Calculate the proportions of the total variance explained by the first principal component derived from the covariance matrix and the correlation matrix.** `[4 marks]`

**(f) Calculate the correlations between the following sets of variables.**
* **(i)** The standardized variables (say, $Z_1, Z_2$) and the first principal component derived from the correlation matrix. `[2 marks]`
* **(ii)** The original variables $(X_1, X_2)$ and the first principal component derived from the covariance matrix. `[2 marks]`

**(g) Does the standardization of the variables affect the principal components? Explain your answer using the results from Part (f).** `[3 marks]`

`[Total marks for Question 2 = 25]`

### Question 3

Consider the sample covariance matrix

$$
S = \begin{bmatrix} 11 & 8 & 4 & 4 \\ 8 & 10 & 3 & 6 \\ 4 & 3 & 9 & 7 \\ 4 & 6 & 7 & 8 \end{bmatrix}
$$

and its eigenvalue-eigenvector pairs as follows:

$$
\lambda_1 = 25.66, \quad e_1' = [-0.543, \, -0.542, \, -0.428, \, -0.477]
$$

$$
\lambda_2 = 8.65, \quad e_2' = [0.492, \, 0.392, \, -0.656, \, -0.417]
$$

$$
\lambda_3 = 3.56, \quad e_3' = [-0.610, \, 0.555, \, -0.388, \, 0.412]
$$

$$
\lambda_4 = 0.12, \quad e_4' = [0.301, \, -0.495, \, -0.485, \, 0.655]
$$

**(a) Calculate the factor loadings (initial) of a two-factor model (**$m = 2$**) using the principal component solution method.** `[3 marks]`

**(b) Calculate the communalities of each variable using the factor loadings derived in Part (a).** `[2 marks]`

**(c) Calculate the specific variances of each variable using the communalities calculated in Part (b).**  
*(Hint: Specific variance* $(\tilde{\psi}_i) = s_{ii} - \sum_{j=1}^m \tilde{l}_{ij}^2$*, for* $i = 1, \dots, p$*)* `[2 marks]`

**(d) Calculate the proportion of the total sample variance explained by the two-factor model.** `[1 mark]`

**(e) Reproduce the sample covariance matrix with the factor loadings and the specific variances derived above. What can you say about the two-factor model?** `[7 marks]`

**(f) Now reproduce the sample covariance matrix for a one-factor model (**$m = 1$**) using the principal component solution method. Compare the reproduced covariance matrices of the two models (one-factor and two-factor models).** `[7 marks]`

**(g) Briefly explain what factor rotation is and why we need factor rotation.** `[3 marks]`

`[Total marks for Question 3 = 25]`

### Question 4

**(a) An experimenter collected observations on two responses for three treatments and derived the following one-way MANOVA table for comparing the treatments.**

| Source of variation | Matrix of sum of squares and cross products | Degrees of freedom |
| :--- | :---: | :---: |
| Treatment | $\begin{bmatrix} 11 & -22 \\ -22 & 75 \end{bmatrix}$ | ? |
| Residual | $\begin{bmatrix} ? & ? \\ ? & ? \end{bmatrix}$ | ? |
| Total (corrected) | $\begin{bmatrix} 28 & -18 \\ -18 & 90 \end{bmatrix}$ | 149 |

* **(i)** How many observations are in the experiment? Complete the MANOVA table. `[5 marks]`
* **(ii)** Calculate Wilks' lambda, $\Lambda^*$, and test for treatment effects. Repeat the test using the large-sample procedure. Compare the conclusions. *(Hint:* $F_{4, 292}(.01) = 3.38$ *and* $\chi_4^2(.01) = 13.28$*)* `[6 marks]`
* **(iii)** Which assumptions have you made to validate your test in Part (ii)? `[2 marks]`

**(b) Three psychological tests were given to 32 men and 30 women. The data are recorded and summarized as below:**

| Subtests | Sample means: Male | Sample means: Female |
| :--- | :---: | :---: |
| Tool recognition | 16.1 | 15.4 |
| Paper form board | 26.5 | 27.5 |
| Vocabulary | 22.9 | 21.7 |

**and the pooled sample covariance matrix is**

$$
S_{\text{pooled}} = \begin{bmatrix} 5 & 3 & 2 \\ 3 & 8 & 1 \\ 2 & 1 & 7 \end{bmatrix}.
$$

* **(i)** Is the male psychological testing profile parallel to the female psychological testing profile? Test for parallel profiles with $\alpha = 0.01$. *(Hint:* $F_{2, 59}(.01) = 4.98$*)* `[5 marks]`
* **(ii)** If the profiles appear to be parallel, test for coincident profiles at the same level of significance. *(Hint:* $F_{1, 60}(.01) = 7.08$*)* `[5 marks]`
* **(iii)** Based on Part (ii), if the two profiles are coincident, what will be the next step of the profile analysis? Briefly explain. `[2 marks]`

`[Total marks for Question 4 = 25]`

---

# 2. 20 BATCH (AUGUST 2023)

## Final Examination (August 2023)

**UNIVERSITY OF MORATUWA**  
**FACULTY OF BUSINESS**  
**DEPARTMENT OF DECISION SCIENCES**  
**BACHELOR OF BUSINESS SCIENCE (BBSc.)**  
**SEMESTER V EXAMINATION**  
**DA3420 - Multivariate Methods in Business**  
**Time allowed: 3 Hours | August 2023**

**INSTRUCTIONS TO CANDIDATES:**

* This paper contains 10 Multiple Choice Questions (MCQs) and 4 Essay Questions on 9 pages.
* This examination accounts for 50% of the course assessment.
* This is a closed book examination.
* Answer ALL questions.
* Use the stencil provided in the last page of this paper to answer MCQs.
* Total mark: 100. Each MCQ is worth 2 marks. For Essay Questions, the maximum marks attainable are indicated in the square brackets.
* Clearly state any assumptions made on the answer script.
* If you have any doubt as to the interpretation of the wording of a question, make your own decision, but clearly state it on the answer script.
* Show your complete work to get any credit. Be neat and legible.
* Electronic/communication devices are not permitted. The only equipment allowed is a calculator.

### Multiple Choice Questions `[20 Marks: 2 marks each]`

**1. The exponent of a multivariate normal density function,** $(X - \mu)' \Sigma^{-1} (X - \mu)$**, follows**
* (a) A $F$ distribution
* (b) A $t$ distribution
* (c) A chi-square distribution
* (d) A standard normal distribution

**2. If** $X \sim N_p(\mu, \Sigma)$ **then** $X + d$**, where** $d$ **is a** $p \times 1$ **vector of constants, follows**
* (a) $N_p(\mu, \Sigma)$
* (b) $N_p(\mu + d, \Sigma)$
* (c) $N_p(\mu, \Sigma + d)$
* (d) $N_p(\mu + d, \Sigma + d)$

**3. Let** $X_1, \dots, X_n$ **be a random sample of size** $n$ **from a** $p$**-variate normal distribution with mean** $\mu$ **and covariance matrix** $\Sigma$**. Which of the following statements is correct?**
* (a) $\bar{X}$ is distributed as $N_p(\mu, \frac{1}{n}\Sigma)$.
* (b) $(n - 1)S$ is distributed as a $p$-dimensional Wishart distribution with $(n - 1)$ d.f. and the covariance matrix $\Sigma$.
* (c) $\bar{X}$ and $S$ are independent.
* (d) All of the above  
  *Note that* $\bar{X}$ *is the sample mean vector and* $S$ *is the sample covariance matrix.*

**4. In multivariate analysis, what would you use Box's M-test for?**
* (a) To test for multivariate normality
* (b) To test for independence of residuals
* (c) To test for homogeneity of variance
* (d) To test for homogeneity of covariance matrices

**5. The goal of performing principal component analysis is**
* (a) To explain the variance-covariance structure of a large set of variables through a few linear combinations of these variables.
* (b) To explain only the variance structure of a large set of variables through a few linear combinations of these variables.
* (c) To explain only the covariance structure of a large set of variables through a few linear combinations of these variables.
* (d) To explain the variance-covariance structure of a large set of variables through a few nonlinear combinations of these variables.

**6. Which of the following statements is correct?**  
**(I) Principal components are orthogonal to each other.**  
**(II) The variation explained by the first principal component is maximum.**
* (a) Only (I)
* (b) Only (II)
* (c) Both (I) and (II)
* (d) None of the above

**7. Which of the following statements is correct?**  
**(I) Exploratory factor analysis is used to discover the factor structure of a construct and examine its reliability. It is theory-driven.**  
**(II) Confirmatory factor analysis is used to confirm the fit of the hypothesized factor structure to the observed (sample) data. It is data-driven.**
* (a) Only (I)
* (b) Only (II)
* (c) Both (I) and (II)
* (d) None of the above

**8. Which of the following is NOT one of the primary goals of factor analysis?**
* (a) Determine how many factors underlie a set of observable variables
* (b) Provide a method of explaining variance among observable variables by using fewer, newly created factors
* (c) Reduce data by allowing us to extract a small set of factors from a larger set of observable variables
* (d) Define the meaning or content of the observable variables

**9. What is a latent variable?**
* (a) It is a variable that cannot be measured directly.
* (b) It is another name for a factor.
* (c) Latent variables represent clusters of variables that correlate highly with each other.
* (d) All of the above

**10. Which of the followings can be used to determine how many factors to take from a factor analysis?**
* (a) Kaiser's rule for eigenvalues
* (b) Scree plot
* (c) % of variance
* (d) All of the above

### Essay Questions `[80 Marks]`

### Question 1

Let $X$ be $N_3(\mu, \Sigma)$ with

$$
\mu = \begin{bmatrix} 2 \\ -3 \\ 1 \end{bmatrix} \quad \text{and} \quad \Sigma = \begin{bmatrix} 4 & 0 & -1 \\ 0 & 5 & 0 \\ -1 & 0 & 2 \end{bmatrix}
$$

**(a) Find the joint distribution of** $X_1 - X_2$ **and** $X_2 - X_3$**.** `[4 marks]`

**(b) Find the distribution of** $\begin{bmatrix} X_1 \\ X_3 \end{bmatrix}$**.** `[4 marks]`

**(c) Find the distribution of** $X_2$**.** `[2 marks]`

**(d) Which of the following random variables are independent? Explain.**
* **(i)** $X_1$ and $X_2$ `[2 marks]`
* **(ii)** $X_1 - X_2$ and $X_2 - X_3$ `[2 marks]`
* **(iii)** $\begin{bmatrix} X_1 \\ X_3 \end{bmatrix}$ and $X_2$ `[2 marks]`  
  *Hint: Use your results from (a) - (c).*

**(e) Let** $X_1, X_2, \dots, X_{70}$ **be a random sample of size 70 from the above three-variate normal distribution with** $\mu$ **and covariance** $\Sigma$**. Specify each of the following completely.**
* **(i)** The distribution of $\bar{X}$ `[2 marks]`
* **(ii)** The approximated distribution of $(\bar{X} - \mu)' \left(\frac{S}{n}\right)^{-1} (\bar{X} - \mu)$ `[2 marks]`

`[Total marks for Question 1 = 20]`

### Question 2

A firm is attempting to evaluate the quality of its sales staff and find a series of tests that may reveal the potential for good performance in sales. The firm selected a random sample of 50 salespeople and obtained the data on the following seven variables.

* **Variables to measure sales performance:**  
  $X_1 =$ Growth of sales, $X_2 =$ Profitability of sales, $X_3 =$ New account sales
* **Variables to evaluate the skills of salespeople:**  
  $X_4 =$ Creativity, $X_5 =$ Mechanical reasoning, $X_6 =$ Abstract reasoning, $X_7 =$ Mathematical ability

The following partial R output was produced using the original variables from the Salespeople Data.

```
Sample correlation matrix:
      X1    X2    X3    X4    X5    X6    X7
X1 1.000 0.926 0.884 0.572 0.708 0.674 0.927
X2 0.926 1.000 0.843 0.542 0.746 0.465 0.944
X3 0.884 0.843 1.000 0.700 0.637 0.641 0.853
X4 0.572 0.542 0.700 1.000 0.591 0.147 0.413
X5 0.708 0.746 0.637 0.591 1.000 0.386 0.575
X6 0.674 0.465 0.641 0.147 0.386 1.000 0.566
X7 0.927 0.944 0.853 0.413 0.575 0.566 1.000

PCA on sales performance measures:
Rotation:
      PC1    PC2    PC3
X1 -0.555 -0.003  0.832
X2 -0.600  0.694 -0.398
X3 -0.576 -0.720 -0.387

Importance of components:
                           PC1   PC2   PC3
Standard deviation     180.299 4.545 1.991
Proportion of Variance   0.998 0.001 0.001
```

**(a) Briefly discuss how Principal Component Analysis (PCA) can be used to improve linear regression problems.** `[3 marks]`

**(b) Calculate the variance of each of the Principal Component (PC).** `[3 marks]`

**(c) Sketch the scree plot and select the appropriate number of PCs that explain a substantial proportion of variation of the data.** `[4 marks]`

**(d) Calculate the cumulative proportion of the total variance explained by the three PCs.** `[3 marks]`

**(e) Write down the first PC as a linear combination of the variables on sales performance measures.** `[2 marks]`

**(f) Using the results from (c) - (e), justify the selection of the first PC to develop a composite index to measure the overall sales performance for the given sales values.** `[2 marks]`

**(g) Briefly discuss the appropriateness in applying PCA to reduce the number of variables to evaluate the skills of salespeople:** $X_4 - X_7$**.** `[3 marks]`

`[Total marks for Question 2 = 20]`

### Question 3

A U.S. Health Dataset contains the reported number of deaths in the 50 states of the U.S. for one year (1985), classified according to 7 categories: $X_1 =$ Accident, $X_2 =$ Cardiovascular, $X_3 =$ Cancer, $X_4 =$ Pulmonary (relating to the lungs), $X_5 =$ Pneumonia flu, $X_6 =$ Diabetes, and $X_7 =$ Liver. Consider the following partial R output of a Factor Analysis (FA) on the seven variables.

```
Factor analysis using ml method with varimax rotation:
Standardized factor loadings:
     ML1   ML2   ML3   ML4 ML5 ML6 ML7
X1 -0.63 -0.10 -0.09  0.15   0   0   0
X2  0.74  0.60  0.09  0.07   0   0   0
X3  0.80  0.44  0.30  0.07   0   0   0
X4  0.14  0.51  0.30  0.15   0   0   0
X5  0.11  0.75 -0.13 -0.09   0   0   0
X6  0.79  0.03  0.12  0.15   0   0   0
X7  0.14  0.00  0.70  0.00   0   0   0

                       ML1  ML2  ML3  ML4  ML5  ML6  ML7
SS loadings           2.27 1.39 0.71 0.08 0.00 0.00 0.00
Proportion Explained  0.51 0.28 0.19 0.02 0.00 0.00 0.00
```

**(a) Calculate the cumulative proportion of the total variance explained by the first four factors.** `[4 marks]`

**(b) How many factors can you extract from the FA output and why?** `[3 marks]`

**(c) Using the standardized factor loadings of more than 0.5 and not loading on more than one factor, sketch the factor structure. Note that negative values of the factor loadings are also acceptable.** `[6 marks]`

**(d) Suggest names for each factor in order to communicate the characteristic/structure that the factors represent.** `[3 marks]`

**(e) Briefly discuss the differences between PCA and FA.** `[4 marks]`

`[Total marks for Question 3 = 20]`

### Question 4

Multivariate Multiple Linear Regression (MMLR) models were fitted, relating three texture scores to five physio-chemical predictors.

* $Y_1 =$ Hardness, $Y_2 =$ Gumminess, $Y_3 =$ Chewiness
* $X_1 =$ Moisture, $X_2 =$ Amylase, $X_3 =$ Water Absorption, $X_4 =$ Swelling, $X_5 =$ Solids Content

The two fitted MMLR models were, for $k = 1, 2, 3$:
* **Model 1:** $E(Y_k) = \beta_{0k} + \beta_{1k}X_1 + \beta_{2k}X_2 + \beta_{3k}X_3 + \beta_{4k}X_4 + \beta_{5k}X_5$
* **Model 2:** $E(Y_k) = \beta_{0k} + \beta_{1k}X_1 + \beta_{2k}X_2$

The following partial R output is obtained by fitting the MMLR model using all three responses and the five predictors.

```
Response Y1:
Coefficients:
              Estimate Std. Error t value Pr(>|t|)
(Intercept) -10495.060   4415.928  -2.377   0.0258 *
X1             402.449    235.203   1.711   0.1000 .
X2             227.385     38.285   5.939 3.96e-06 ***
X3              11.408      9.367   1.218   0.2351
X4              -1.996      7.945  -0.251   0.8038
X5              15.393     24.226   0.635   0.5312
Residual standard error: 424.7 on 24 degrees of freedom
Multiple R-squared: 0.6532, Adjusted R-squared: 0.581
F-statistic: 9.042 on 5 and 24 DF, p-value: 6.151e-05

Response Y2:
Coefficients:
             Estimate Std. Error t value Pr(>|t|)
(Intercept) -8534.728   2595.555  -3.288   0.0031 **
X1            324.992    138.245   2.351   0.0273 *
X2            141.141     22.503   6.272 1.75e-06 ***
X3              5.280      5.505   0.959   0.3471
X4              1.671      4.670   0.358   0.7236
X5             15.271     14.240   1.072   0.2942
Residual standard error: 249.6 on 24 degrees of freedom
Multiple R-squared: 0.6516, Adjusted R-squared: 0.5791
F-statistic: 8.979 on 5 and 24 DF, p-value: 6.475e-05

Response Y3:
Coefficients:
              Estimate Std. Error t value Pr(>|t|)
(Intercept) -7092.0228  2566.9409  -2.763 0.010822 *
X1            325.9379   136.7212   2.384 0.025385 *
X2             96.1867    22.2550   4.322 0.000233 ***
X3              3.3346     5.4448   0.612 0.545998
X4             -0.0744     4.6183  -0.016 0.987280
X5             17.2643    14.0826   1.226 0.232118
Residual standard error: 246.9 on 24 degrees of freedom
Multiple R-squared: 0.4692, Adjusted R-squared: 0.3586
F-statistic: 4.243 on 5 and 24 DF, p-value: 0.006619

Analysis of variance table:
Model 1: cbind(Y1, Y2, Y3) ~ X1 + X2 + X3 + X4 + X5
Model 2: cbind(Y1, Y2, Y3) ~ X1 + X2
  Res.Df Df Gen.var.  Wilks approx F num Df den Df Pr(>F)
1     19       43803
2     22  3    51856 0.7145    1.689      6     28 0.6410
```

**(a) Use only the first response** $Y_1$ **to answer the following questions and** $\alpha = 5\%$**.**
* **(i)** Is there a relationship between the predictors and the response? Justify your answer. `[1 mark]`
* **(ii)** Which predictors appear to have a significant relationship to the response? `[2 marks]`
* **(iii)** Compute the predicted value for the response when $X_1 = 15$, $X_2 = 24$, $X_3 = 230$, $X_4 = 235$, and $X_5 = 10$. `[2 marks]`

**(b) Repeat (a) using only the second response** $Y_2$**.** `[5 marks]`

**(c) Repeat (a) using only the third response** $Y_3$**.** `[5 marks]`

**(d) Test whether Model 2 fits as well as Model 1.** `[2 marks]`

**(e) Briefly explain how MMLR supports data-driven decision making in business applications with an example.** `[3 marks]`

`[Total marks for Question 4 = 20]`

---

# 3. 21 BATCH (2023 / JANUARY 2024)

## In-Class Examination (Semester 4, 2023)

**DA2451 - Multivariate Methods in Business**  
**In-Class Exam (Semester 4, 2023)**  
**Time allowed: 1 hour 30 minutes | Total mark: 50 | Closed-book exam**

### Question 1

**(a) Let** $X_1, X_2, \dots, X_{30}$ **be a random sample of size** $n = 30$ **from an** $N_4(\mu, \Sigma)$ **population. Specify each of the following completely.**
* **(i)** The distribution of $\bar{X}$ `[1 mark]`
* **(ii)** The distribution of $(n - 1)S$ `[1 mark]`
* **(iii)** The distribution of $n(\bar{X} - \mu)' \Sigma^{-1} (\bar{X} - \mu)$ `[1 mark]`
* **(iv)** The approximated distribution of $n(\bar{X} - \mu)' S^{-1} (\bar{X} - \mu)$ `[1 mark]`

**(b) Let** $X = (X_1, X_2, X_3)'$ **be** $N_3(\mu, \Sigma)$ **with**

$$
\mu = \begin{bmatrix} 2 \\ -3 \\ 1 \end{bmatrix} \quad \text{and} \quad \Sigma = \begin{bmatrix} 4 & 0 & -1 \\ 0 & 5 & 0 \\ -1 & 0 & 2 \end{bmatrix}
$$

* **(i)** Find the distribution of $X_1 + 3X_2 - 2X_3$. `[5 marks]`
* **(ii)** Find if $(X_1, X_2)$ and $X_3$ are independent. Justify your answer. `[3 marks]`
* **(iii)** Find if $X_1$ and $(X_1 + 3X_2 - 2X_3)$ are independent. Justify your answer. `[3 marks]`

`[Total marks for Question 1 = 15]`

### Question 2

National track records for women in 54 countries are analyzed. The following table shows data for two selected countries. Data includes recorded time for 7 track events.

| Country | $X_1$: 100m (s) | $X_2$: 200m (s) | $X_3$: 400m (s) | $X_4$: 800m (min) | $X_5$: 1500m (min) | $X_6$: 3000m (min) | $X_7$: Marathon (min) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| USA | 10.49 | 21.34 | 48.83 | 1.94 | 3.95 | 8.43 | 141.16 |
| India | 11.38 | 22.82 | 51.05 | 2.00 | 4.10 | 9.11 | 158.10 |

Following results were produced using R on the standardized variables of the track events.

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

**(a) In total how many principal components (PCs) can be calculated for this data?** `[2 marks]`

**(b) Calculate the variance of each of the first three PCs.** `[3 marks]`

**(c) Sketch the scree plot and select the appropriate number of PCs that explain a substantial proportion of variation of the data.** `[5 marks]`

**(d) Calculate the cumulative percentage of the total (standardized) sample variance explained by each of the first three PCs.** `[3 marks]`

**(e) Using the results from (c) and (d), justify that the total variability of the track records can be summarized using the first two PCs.** `[2 marks]`

**(f) Write down the first two PCs as linear combinations of the standardized variables of** $X$**s.** `[2 marks]`

**(g) Explain how to produce a "track excellence" score for countries based on only the first PC.** `[3 marks]`

`[Total marks for Question 2 = 20]`

### Question 3

A firm is attempting to evaluate the quality of its sales staff and find a series of tests that may reveal the potential for good performance in sales. The firm selected a random sample of 50 salespeople from different branches and obtained the data on the following seven variables.

* **Variables to measure sales performance:** $X_1 =$ Growth of sales, $X_2 =$ Profitability of sales, $X_3 =$ New account sales
* **Variables to evaluate the skills of salespeople:** $X_4 =$ Creativity, $X_5 =$ Mechanical reasoning, $X_6 =$ Abstract reasoning, $X_7 =$ Mathematical ability

The following partial R output was produced using the original variables from the Salespeople Data.

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

**(a) Calculate the cumulative proportion of the total variance explained by each of the first three factors.** `[5 marks]`

**(b) How many factors can you extract from the FA output and why?** `[3 marks]`

**(c) Using the standardized factor loadings of more than 0.6 and not loading on more than one factor, sketch the factor structure. Note that negative values of the factor loadings are also acceptable.** `[7 marks]`

`[Total marks for Question 3 = 15]`

---

## Final Examination (January 2024)

**UNIVERSITY OF MORATUWA**  
**FACULTY OF BUSINESS**  
**DEPARTMENT OF DECISION SCIENCES**  
**BACHELOR OF BUSINESS SCIENCE (BBSc.)**  
**SEMESTER IV EXAMINATION**  
**DA2451 - Multivariate Methods in Business**  
**Time allowed: 3 Hours | January 2024**

**INSTRUCTIONS TO CANDIDATES:**

* This paper contains FIVE (05) questions on 7 pages.
* This examination accounts for 50% of the course assessment.
* This is a closed book examination.
* Answer ALL questions.
* All questions carry equal marks. The maximum marks attainable are indicated in square brackets.

### Question 1

Let $X = (X_1, X_2, X_3)'$ be $N_3(\mu, \Sigma)$ with

$$
\mu = \begin{pmatrix} 2 \\ 1 \\ 2 \end{pmatrix} \quad \text{and} \quad \Sigma = \begin{pmatrix} 2 & 1 & 1 \\ 1 & 3 & 0 \\ 1 & 0 & 1 \end{pmatrix}
$$

**(a) Find the joint distribution of** $X_1 + X_2 + X_3$ **and** $X_1 - X_2$**.** `[4 marks]`

**(b) Find the distribution of** $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$**.** `[4 marks]`

**(c) Find the distribution of** $X_2$**.** `[2 marks]`

**(d) Which of the following random variables are independent? Explain.**
* **(i)** $X_1$ and $X_2$ `[2 marks]`
* **(ii)** $X_1 + X_2 + X_3$ and $X_1 - X_2$ `[2 marks]`
* **(iii)** $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$ and $X_2$ `[2 marks]`  
  *Hint: Use your results from (a) to (c).*

**(e) Let** $X_1, X_2, \dots, X_{60}$ **be a random sample of size 60 from the above three-variate normal distribution with** $\mu$ **and covariance** $\Sigma$**. Specify each of the following completely.**
* **(i)** The distribution of $\bar{X}$ `[2 marks]`
* **(ii)** The distribution of $(\bar{X} - \mu)' \left(\frac{\Sigma}{60}\right)^{-1} (\bar{X} - \mu)$ `[2 marks]`

`[Total marks for Question 1 = 20]`

### Question 2

In the first phase of a study of the cost of transporting milk from farms to dairy plants, a survey was taken of firms engaged in milk transportation. Cost data on $X_1 =$ fuel, $X_2 =$ repair, and $X_3 =$ capital, all measured on a per-mile basis, were considered for $n_1 = 34$ gasoline and $n_2 = 23$ diesel trucks. The following partial R output was produced to compare responses for the two types of trucks. Note that the first 34 observations are for gasoline trucks and the rest for diesel trucks.

```
HotellingsT2(data[1:34, 1:3], data[-c(1:34), 1:3], test="chi")
T.2 = 48.748, df = ???, p-value < 0.000

mult.norm(data[1:34, 1:3])$mult.test
         Beta-hat     kappa     p-val
Skewness 0.8456908  5.074145 0.8861703
Kurtosis 12.7878595 -1.211639 0.2256505

mult.norm(data[-c(1:34), 1:3])$mult.test
         Beta-hat      kappa     p-val
Skewness 1.351133   4.7289643 0.9085327
Kurtosis 12.670725 -0.9744056 0.3298552

boxM(data[, 1:3], data[, 4])
Chi-Sq (approx.) = 21.162, df = 6, p-value = 0.1715
```

**(a) Test if there is evidence of a difference between the mean cost vectors of the two types of trucks.**
* **(i)** State $H_0$ and $H_1$. `[2 marks]`
* **(ii)** What is the approximated distribution of Hotelling's $T^2$-statistic? Clearly, specify the parameter(s) of the approximated distribution. `[2 marks]`
* **(iii)** Do you reject $H_0$ at the 5% level of significance? State your conclusion. `[3 marks]`

**(b) What assumption(s) do you need to make about the two populations in order to perform the test in (a)?** `[3 marks]`

**(c) Comment on the validity of the assumption(s) mentioned in (b) by conducting appropriate test(s). For each test,**
* **(i)** State $H_0$ and $H_1$. `[4 marks]`
* **(ii)** Using the results from R output, do you reject $H_0$ at the 5% level of significance? State your conclusion. `[6 marks]`

`[Total marks for Question 2 = 20]`

### Context for Question 3 and Question 4

To answer Question 3 and Question 4, consider a food-texture data set from a food manufacturer making a pastry product. Each sample in the data set is taken from a batch of product where the following five quality attributes are measured:

* **Oil:** percentage oil in the pastry
* **Density:** the product's density (the higher the number, the more dense the product)
* **Crispy:** a crispiness measurement, on a scale from 7 to 15, with 15 being more crispy
* **Fracture:** the angle, in degrees, through which the pastry can be slowly bent before it fractures
* **Hardness:** a sharp point is used to measure the amount of force required before breakage occurs

The following partial R output was produced using the food-texture data set.

```
Sample correlation matrix:
            Oil Density Crispy Fracture Hardness
Oil       1.000  -0.750  0.593   -0.534   -0.096
Density  -0.750   1.000 -0.671    0.572    0.108
Crispy    0.593  -0.671  1.000   -0.844    0.411
Fracture -0.534   0.572 -0.844    1.000   -0.373
Hardness -0.096   0.108  0.411   -0.373    1.000

Importance of components:
                          PC1   PC2   PC3   PC4   PC5
Standard deviation      1.741 1.138 0.557 0.492 0.348
Proportion of Variance  0.606 0.259 0.062 0.048 0.024

Factor analysis using ml method with varimax rotation:
Standardized loadings:
           ML1   ML2 ML3 ML5 ML4
Oil      -0.82 -0.04   0   0   0
Density   0.87  0.01   0   0   0
Crispy   -0.75  0.55   0   0   0
Fracture  0.67 -0.56   0   0   0
Hardness  0.06  0.74   0   0   0

                       ML1  ML2  ML3  ML5  ML4
SS loadings           2.44 1.17 0.00 0.00 0.00
Proportion Explained  0.68 0.32 0.00 0.00 0.00
```

### Question 3

**(a) Briefly explain the purpose of principal components analysis (PCA).** `[2 marks]`

**(b) Do you see any multicollinearity in the food-texture data? Justify your answer.** `[3 marks]`

**(c) Briefly explain how PCA handles the issue of multicollinearity in a data set.** `[3 marks]`

**(d) Calculate the variance of each of the first three principal components (PCs).** `[3 marks]`

**(e) Calculate the cumulative proportion of the total variance explained by each of the first three PCs.** `[3 marks]`

**(f) Using the results from (d) and (e), determine the number of PCs to effectively summarize the total variability of the food-texture data.** `[2 marks]`

**(g) Using the below biplot, briefly explain how the original variables contribute to the first two PCs.**  
*Hint: Check which variables are positively or negatively explained by PC1 and PC2.* `[4 marks]`

*(Biplot reference from original paper: Horizontal axis is PC1, Vertical axis is PC2. Vectors from origin $(0,0)$:*
* ***Density**: points to the upper-left quadrant (negative PC1, positive PC2).*
* ***Fracture**: points to the lower-left quadrant (negative PC1, negative PC2).*
* ***Hardness**: points almost straight up in the upper-right quadrant (slightly positive PC1, strongly positive PC2).*
* ***Crispy**: points to the upper-right quadrant (positive PC1, slightly positive PC2).*
* ***Oil**: points to the lower-right quadrant (positive PC1, negative PC2).)*

`[Total marks for Question 3 = 20]`

### Question 4

**(a) Briefly explain the difference between exploratory and confirmatory factor analysis (FA).** `[3 marks]`

**(b) List one similarity and one difference between PCA and exploratory FA.** `[3 marks]`

**(c) Briefly explain what factor rotation is in exploratory FA and why factor rotation is needed.** `[3 marks]`

**(d) Calculate the cumulative proportion of the total variance explained by the first three factors.** `[3 marks]`

**(e) How many factors can you extract from the FA output? Justify your answer.** `[3 marks]`

**(f) Using the standardized factor loadings of more than 0.6 and not loading on more than one factor, sketch the factor structure. Note that negative values of the factor loadings are also acceptable.** `[5 marks]`

`[Total marks for Question 4 = 20]`

### Question 5

An environmental analyst wants to fit a linear regression model using the air-pollution data recorded at 12 noon in the Los Angeles area on different days. The model related two air-pollutants, $Y_1 = \text{NO}_2$ and $Y_2 = \text{O}_3$ to three predictor variables, $X_1 =$ wind speed, $X_2 =$ wind direction, and $X_3 =$ solar radiation.

The following partial R output is obtained by fitting the linear model using all two responses and three predictors.

```
Response Y1:
Coefficients:
             Estimate Std. Error t value Pr(>|t|)
(Intercept)  2.347207   1.314064   1.786 0.082045 .
X1          -0.027070   0.110717  -0.244 0.808164
X2           0.577223   0.160599   3.594 0.000922 ***
X3           0.015422   0.009751   1.582 0.122030
Residual standard error: 1.071 on 38 degrees of freedom
Multiple R-squared: 0.3018, Adjusted R-squared: 0.2467
F-statistic: 5.475 on 3 and 38 DF, p-value: 0.003155

Response Y2:
Coefficients:
            Estimate Std. Error t value Pr(>|t|)
(Intercept) 12.22748    6.41013   1.908   0.0640 .
X1          -0.97203    0.54009  -1.800   0.0798 .
X2          -0.96222    0.78342  -1.228   0.2269
X3           0.08903    0.04757   1.872   0.0690 .
Residual standard error: 5.223 on 38 degrees of freedom
Multiple R-squared: 0.1837, Adjusted R-squared: 0.1192
F-statistic: 2.85 on 3 and 38 DF, p-value: 0.05008

Type II MANOVA Tests: Wilks test statistic
   Df test stat approx F num Df den Df    Pr(>F)
X1  1   0.90595   1.9206      2     37    0.1608
X2  1   0.58789  12.9685      2     37 5.395e-05 ***
X3  1   0.90512   1.9393      2     37    0.1582

Analysis of Variance Table
Model 1: cbind(Y1, Y2) ~ X1 + X2 + X3
Model 2: cbind(Y1, Y2) ~ X2
  Res.Df Df Gen.var.   Wilks approx F num Df den Df  Pr(>F)
1     38      4.7384
2     40  2   5.0054 0.80878   2.0711      4     74 0.10316
```

**(a) Briefly discuss the advantage of considering response variables simultaneously rather than individually in linear regression, in order to draw inferences.** `[2 marks]`

**(b) Use only the first response** $Y_1$ **to answer the following questions and assume** $\alpha = 10\%$**.**
* **(i)** Is there a relationship between the predictors and the response? Justify your answer. `[2 marks]`
* **(ii)** Which predictors appear to have a significant relationship with the response? Justify your answer. `[2 marks]`
* **(iii)** Compute the predicted value for the response when $X_1 = 10$, $X_2 = 2$, and $X_3 = 80$. `[3 marks]`

**(c) Repeat (b) using only the second response** $Y_2$**.** `[7 marks]`

**(d) What can you conclude from the Type II MANOVA Tests in the R output? (use** $\alpha = 10\%$**)** `[2 marks]`

**(e) Test whether the model with just** $X_2$ **fits as well as the model with all three predictors at the 10% level of significance.** `[2 marks]`

`[Total marks for Question 5 = 20]`

---

# 4. 22 BATCH (DECEMBER 2024)

## Final Examination (December 2024)

**UNIVERSITY OF MORATUWA**  
**FACULTY OF BUSINESS**  
**DEPARTMENT OF DECISION SCIENCES**  
**BACHELOR OF BUSINESS SCIENCE (BBSc.)**  
**SEMESTER IV EXAMINATION**  
**DA2451 - Multivariate Methods in Business**  
**Time allowed: 3 Hours | December 2024**

**INSTRUCTIONS TO CANDIDATES:**

* This paper contains 25 Multiple Choice Questions (MCQs) and 2 Essay Questions on 10 pages.
* This examination accounts for 50% of the course assessment.
* This is a closed book examination.
* Answer ALL questions.
* Total marks: 100. Each MCQ is worth 2 marks. For Essay Questions, the maximum marks attainable are indicated in the square brackets.

### Multiple Choice Questions `[50 Marks: 2 marks each]`

**1. What does the Mahalanobis distance measure in the context of multivariate analysis?**
* (a) The straight-line distance between two points in univariate data
* (b) The distance between the means of two variables
* (c) The distance between two points in terms of standardized variables, accounting for variability and correlation
* (d) The geometric distance between data points in a one-dimensional space

**2. What is the primary purpose of a parallel coordinates plot in visualizing multivariate data?**
* (a) To illustrate the distribution of individual variables
* (b) To examine the relationships between multiple variables across different cases
* (c) To analyze the correlations between pairs of variables
* (d) To assess the overall variation within the data

**3. Which generalized squared distance is most commonly used for identifying outliers in multivariate data?**
* (a) Mahalanobis distance
* (b) Chi-square distance
* (c) Euclidean distance
* (d) Cook's distance

**4. What does a generalized sample variance of** $|S| = 0$ **indicate in multivariate analysis?**
* (a) The data exhibits perfect correlation among variables
* (b) The data follows a multivariate normal distribution
* (c) Some variables are linearly dependent, resulting in a singular covariance matrix
* (d) The data demonstrates high variance across all dimensions

**5. How does the generalized variance** $|R|$ **of standardized variables differ from the generalized sample variance** $|S|$ **derived from deviation vectors?**
* (a) $|R|$ is unaffected by the scaling of variables
* (b) $|R|$ is always larger than $|S|$ for all datasets
* (c) $|R|$ is identical to $|S|$
* (d) $|R|$ accounts for variable correlations, whereas $|S|$ does not

**6. Why is conducting separate univariate** $t$**-tests for each component of a multivariate dataset generally inadvisable?**
* (a) Univariate tests assume that variables are uncorrelated
* (b) Univariate tests ignore the interactions between variables
* (c) Univariate tests are only applicable to categorical variables
* (d) Univariate tests require a larger sample size

**7. What is the main advantage of Hotelling's** $T^2$**-test compared to univariate** $t$**-tests in multivariate analysis?**
* (a) It accommodates multivariate data and accounts for correlations between variables
* (b) It requires a smaller sample size
* (c) It reduces the data into a single dimension
* (d) It is only applicable to large datasets

**8. Why is Principal Component Analysis (PCA) often applied to high-dimensional data?**
* (a) To eliminate redundancy and simplify interpretation
* (b) To increase the number of variables in the dataset
* (c) To increase multicollinearity
* (d) To reduce the sample size required for analysis

**9. How are loadings interpreted in PCA?**
* (a) They represent the proportion of variance explained by each variable
* (b) They indicate the direction of each principal component
* (c) They are the coefficients of the linear combinations of the variables
* (d) They measure the correlation between the components

**10. How does PCA address multicollinearity in a dataset?**
* (a) By transforming the data into uncorrelated principal components
* (b) By removing redundant variables from the dataset
* (c) By increasing the dimensionality of the data
* (d) By using the covariance matrix of the data

**11. Why is the interpretation of principal components important in PCA?**
* (a) To identify the highly correlated variables
* (b) To understand how each original variable contributes to the new components
* (c) To increase the number of dimensions in the data
* (d) To remove irrelevant features from the dataset

**12. What is the key difference between PCA and Factor Analysis (FA)?**
* (a) PCA requires a hypothesis, whereas FA does not
* (b) FA identifies latent variables, whereas PCA does not
* (c) PCA is suitable for categorical data, whereas FA is used for continuous data
* (d) FA is always more accurate than PCA

**13. What does the Kaiser-Meyer-Olkin (KMO) criterion evaluate in FA?**
* (a) The fit of the regression model
* (b) The adequacy of the sample for FA
* (c) The appropriate number of factors to extract
* (d) The variance explained by each factor

**14. What is one key advantage of FA for dimensionality reduction?**
* (a) It ensures all variables are independent
* (b) It combines variables into representative factors
* (c) It eliminates the need for hypothesis testing
* (d) It requires minimal data preprocessing

**15. What is the purpose of factor rotation in FA?**
* (a) To increase the number of factors extracted
* (b) To ensure that variables load highly on only one factor
* (c) To remove uncorrelated variables from the analysis
* (d) To calculate the total variance explained by the factors

**16. What is the primary objective of Exploratory Factor Analysis (EFA)?**
* (a) To test a predefined factor model
* (b) To create a correlation matrix for predictor variables
* (c) To determine the predictive power of individual variables
* (d) To summarize observed variables into a smaller set of latent variables

**17. How does Confirmatory Factor Analysis (CFA) differ from EFA?**
* (a) CFA is exploratory, while EFA is hypothesis-driven
* (b) CFA tests a hypothesized model, while EFA identifies latent dimensions
* (c) CFA uses fewer latent variables than EFA
* (d) CFA is only used for regression analysis

**18. What is the main advantage of using Multivariate Multiple Linear Regression (MMLR) instead of conducting separate regressions for each dependent variable?**
* (a) It simplifies the model structure
* (b) It requires fewer predictors
* (c) It accounts for the covariance between the dependent variables
* (d) It eliminates the need for hypothesis testing

**19. Which of the following are assumptions required for MMLR? (Select all that apply)**
* (a) All independent variables must follow a normal distribution
* (b) The samples must be random and independent
* (c) The dependent variables must follow a multivariate normal distribution
* (d) The dependent variables must be independent of the independent variables

**20. Why are multivariate test statistics, such as Wilks' Lambda, used in MMLR?**
* (a) To simplify the regression coefficients
* (b) To assess the joint contribution of predictors across models
* (c) To calculate residuals and fitted values
* (d) To minimize the likelihood of Type II errors

**21. How does MMLR handle residuals compared to single-response linear models?**
* (a) It provides a single set of residuals for all dependent variables
* (b) It calculates residuals for each dependent variable separately
* (c) It does not calculate residuals
* (d) It averages residuals across all dependent variables

*For each of the following research questions, identify the most appropriate multivariate statistical technique to recommend. Only one choice may be selected for each study. Assume that all model assumptions are satisfied unless otherwise stated.*

*Abbreviations for multivariate statistical techniques:*
* *CA: Cluster Analysis*
* *CFA: Confirmatory Factor Analysis*
* *EFA: Exploratory Factor Analysis*
* *MANCOVA: Multivariate Analysis of Covariance*
* *MANOVA: Multivariate Analysis of Variance*
* *MMLR: Multivariate Multiple Linear Regression*
* *PCA: Principal Component Analysis*
* *SEM: Structural Equation Modeling*

**22. Do the mean values of three blood measurements (magnesium, iron, and potassium, all continuous) differ between male and female elderly Americans?**
* (a) MANCOVA
* (b) MANOVA
* (c) MMLR
* (d) SEM

**23. In a random sample of Americans, how do age, number of years of college education, IQ, and gender influence mean annual income, mean savings, and mean monthly expenditures (all continuous variables)?**
* (a) CA
* (b) CFA
* (c) EFA
* (d) PCA

**24. Five different variables are measured for each of 60 American voters. Into how many distinct groups do the voters naturally segregate based on these five variables?**
* (a) CA
* (b) CFA
* (c) EFA
* (d) PCA

**25. A satisfaction survey includes 10 items measured on a 7-point Likert scale. Into how many factors can these 10 items be reduced to retain at least 60% of the explained variance?**
* (a) CA
* (b) CFA
* (c) EFA
* (d) PCA

### Essay Questions `[50 Marks]`

### Question 1

Let $X$ be $N_3(\mu, \Sigma)$ with

$$
\mu = \begin{bmatrix} 2 \\ -1 \\ 4 \end{bmatrix} \quad \text{and} \quad \Sigma = \begin{bmatrix} 1 & -2 & 0 \\ -2 & 5 & 0 \\ 0 & 0 & 2 \end{bmatrix}
$$

**(a) Find the distribution of** $X_2$**.** `[2 marks]`

**(b) Find the distribution of** $X_2 - 3X_1 - X_3$**.** `[4 marks]`

**(c) Find the distribution of** $X_2 - 3X_1 - X_3 + 3$**.** `[2 marks]`

**(d) Find the joint distribution of** $X_2$ **and** $X_2 - 3X_1 - X_3$**.** `[5 marks]`

**(e) Find the distribution of** $\begin{bmatrix} X_1 \\ X_3 \end{bmatrix}$**.** `[4 marks]`

**(f) Which of the following random variables are independent? Explain.**
* **(i)** $X_1$ and $X_2$ `[1 mark]`
* **(ii)** $X_2$ and $X_3$ `[1 mark]`
* **(iii)** $X_2$ and $X_2 - 3X_1 - X_3$ `[2 marks]`
* **(iv)** $X_2$ and $X_2 - 3X_1 - X_3 + 3$ `[2 marks]`
* **(v)** $\begin{bmatrix} X_1 \\ X_3 \end{bmatrix}$ and $X_2$ `[2 marks]`

`[Total marks for Question 1 = 25]`

### Question 2

A financial analyst wants to fit a linear regression model using the stock performance data recorded at the end of each trading day in the New York Stock Exchange on different days. The model relates two stock performance metrics, $Y_1 =$ closing price of Stock A and $Y_2 =$ closing price of Stock B, to three predictor variables, $X_1 =$ trading volume, $X_2 =$ market index value, and $X_3 =$ interest rate.

The following partial R output is obtained by fitting the linear model using both responses and three predictors.

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

**(a) Briefly discuss the advantage of considering response variables simultaneously rather than individually in linear regression, in order to draw inferences.** `[2 marks]`

**(b) Use only the first response** $Y_1$ **to answer the following questions and assume** $\alpha = 10\%$**.**
* **(i)** Is there evidence of a relationship between the predictors and the response? Justify your answer. `[2 marks]`
* **(ii)** Which predictors appear to have a statistically significant relationship with the response? `[2 marks]`
* **(iii)** Compute the predicted value of the response when $X_1 = 5000$, $X_2 = 20000$, and $X_3 = 3$. `[3 marks]`

**(c) Repeat the questions in (b) using only the second response** $Y_2$**.** `[7 marks]`

**(d) Explain the meaning of the Multiple R-squared and Adjusted R-squared values for** $Y_1$ **and** $Y_2$ **in the R output. How do they relate to the goodness of fit?** `[3 marks]`

**(e) What conclusions can you draw from the Type II MANOVA Tests in the R output? (use** $\alpha = 10\%$**)** `[2 marks]`

**(f) Test whether the model with just** $X_2$ **fits as well as the model with all three predictors at the 10% level of significance.** `[2 marks]`

**(g) If** $X_2$ **(market index value) is found to have the strongest relationship with both** $Y_1$ **and** $Y_2$**, discuss how the analyst might use this finding in practical stock market predictions or investment strategies.** `[2 marks]`

`[Total marks for Question 2 = 25]`

---

# 5. 23 BATCH (2025 / OCTOBER 2025)

## In-Class Quiz 1 (Semester 4, 2025)

**DA2451 - Multivariate Methods in Business**  
**In-Class Quiz 1 (Semester 4, 2025)**  
**Time allowed: 45 minutes | Total mark: 45 | Open-book assignment**

### Question (1)

You are given the following sample variance-covariance matrix for three variables: $X_1, X_2$, and $X_3$.

$$
S = \begin{pmatrix} 36 & 12 & 6 \\ 12 & 25 & 10 \\ 6 & 10 & 16 \end{pmatrix}
$$

**(a) Compute the sample standard deviations of each variable** $X_1, X_2$**, and** $X_3$**.** `(3 marks)`

**(b) Using the matrix** $S$**, compute the corresponding sample correlation matrix** $R$**.** `(7 marks)`

### Question (2)

You are given the following two observations in a 3-dimensional space:

$$
x_1 = \begin{pmatrix} 3 \\ 6 \\ 2 \end{pmatrix}, \quad x_2 = \begin{pmatrix} 7 \\ 2 \\ 5 \end{pmatrix}
$$

The variables are assumed to be independent, and their variances are:

$$
\text{Var}(X_1) = 16, \quad \text{Var}(X_2) = 4, \quad \text{Var}(X_3) = 9
$$

**(a) Calculate the Euclidean distance between** $x_1$ **and** $x_2$**.** `(3 marks)`

**(b) Calculate the Mahalanobis distance between** $x_1$ **and** $x_2$**.** `(4 marks)`

**(c) Compare the two distances. Why is the Mahalanobis distance different from the Euclidean distance in this case?** `(3 marks)`

### Question (3)

You are given the following correlation matrix $R$ for four standardized variables: $X_1, X_2, X_3$, and $X_4$:

$$
R = \begin{pmatrix} 1.00 & 0.65 & 0.45 & 0.55 \\ 0.65 & 1.00 & 0.60 & 0.50 \\ 0.45 & 0.60 & 1.00 & 0.40 \\ 0.55 & 0.50 & 0.40 & 1.00 \end{pmatrix}
$$

The eigenvalues and eigenvectors (corresponding to the standardized variables) of this correlation matrix are as follows:

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

**(a) In total, how many Principal Components (PCs) can be calculated from this dataset?** `(2 marks)`

**(b) Calculate the proportion of total variance explained by each PC.** `(4 marks)`

**(c) Calculate the cumulative proportion of total variance explained by the first, first two, and first three PCs.** `(3 marks)`

**(d) How many PCs should be retained to explain a substantial proportion of variation? Justify your answer.** `(3 marks)`

**(e) What is the variance of each of the first three PCs?** `(3 marks)`

**(f) Write down the first two PCs as linear combinations of the standardized variables** $X_1, X_2, X_3$**, and** $X_4$**.** `(4 marks)`

**(g) Show that the first two PCs are uncorrelated.** `(4 marks)`

**(h) Briefly explain the importance of PCs in analyzing multivariate data.** `(2 marks)`

---

## In-Class Quiz 2 (Semester 4, 2025)

**DA2451 - Multivariate Methods in Business**  
**In-Class Quiz 2 (Semester 4, 2025)**  
**Time allowed: 45 minutes | Total mark: 45 | Open-book assignment**

### Question 1

Let $X = (X_1, X_2, X_3)'$ be $N_3(\mu, \Sigma)$ with

$$
\mu = \begin{pmatrix} 2 \\ -1 \\ 4 \end{pmatrix} \quad \text{and} \quad \Sigma = \begin{pmatrix} 1 & -2 & 0 \\ -2 & 5 & 0 \\ 0 & 0 & 2 \end{pmatrix}
$$

**(a) Find the distribution of** $X_2$**.** `[2 marks]`

**(b) Find the joint distribution of** $X_2$ **and** $X_2 - 3X_1 - X_3$**.** `[4 marks]`

**(c) Find the distribution of** $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$**.** `[4 marks]`

**(d) Which of the following random variables are independent? Explain.**
* **(i)** $X_1$ and $X_3$ `[2 marks]`
* **(ii)** $X_2$ and $X_2 - 3X_1 - X_3$ `[2 marks]`
* **(iii)** $\begin{pmatrix} X_1 \\ X_3 \end{pmatrix}$ and $X_2$ `[2 marks]`  
  *Hint: Use your results from (a) to (c).*

**(e) Let** $X_1, X_2, \dots, X_{20}$ **be a random sample of size 20 from the above three-variate normal distribution with** $\mu$ **and covariance** $\Sigma$**. Specify each of the following completely.**
* **(i)** The distribution of $\bar{X}$ `[2 marks]`
* **(ii)** The distribution of $(\bar{X} - \mu)' \left(\frac{\Sigma}{20}\right)^{-1} (\bar{X} - \mu)$ `[2 marks]`

`[Total marks for Question 1 = 20]`

### Question 2

A firm is attempting to evaluate the quality of its sales staff and find a series of tests that may reveal the potential for good performance in sales. The firm selected a random sample of 50 salespeople from different branches and obtained the data on the following seven variables.

* **Variables to measure sales performance:** $X_1 =$ Growth of sales, $X_2 =$ Profitability of sales, $X_3 =$ New account sales
* **Variables to evaluate the skills of salespeople:** $X_4 =$ Creativity, $X_5 =$ Mechanical reasoning, $X_6 =$ Abstract reasoning, $X_7 =$ Mathematical ability

The following partial R output was produced using the original variables from the Salespeople Data.

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

**(a) Calculate the cumulative proportion of the total variance explained by each of the first three factors.** `[5 marks]`

**(b) How many factors can you extract from the FA output and why?** `[3 marks]`

**(c) Using the standardized factor loadings of more than 0.6 and not loading on more than one factor, sketch the factor structure. Note that negative values of the factor loadings are also acceptable.** `[7 marks]`

`[Total marks for Question 2 = 15]`

### Question 3

In a study on the costs of transporting construction materials from suppliers to building sites, a survey was conducted among companies involved in material transportation. Cost data on $X_1 =$ fuel, $X_2 =$ maintenance, and $X_3 =$ depreciation, all measured on a per-mile basis, were collected for $n = 40$ randomly selected trucks. A benchmark mean cost vector proposed by industry experts is given as

$$
\mu_0 = \begin{pmatrix} 0.80 \\ 0.50 \\ 0.35 \end{pmatrix}
$$

The following partial R output was produced to test whether the sample mean vector differs significantly from the benchmark vector $\mu_0$.

```
HotellingsT2(data[, 1:3], mu=c(0.80, 0.50, 0.35), test="chi")
T.2 = 18.564, df = ??, p-value = 0.002

mult.norm(data[, 1:3])$mult.test
         Beta-hat     kappa     p-val
Skewness 0.845671  5.126784 0.8651203
Kurtosis 11.974325 -1.198403 0.2843107
```

**(a) Test if there is evidence that the population mean cost vector differs from the benchmark vector.**
* **(i)** State $H_0$ and $H_1$. `[2 marks]`
* **(ii)** What is the approximated distribution of Hotelling's $T^2$ statistic? Clearly, specify the parameter(s) of the approximated distribution. `[2 marks]`
* **(iii)** Do you reject $H_0$ at the 5% level of significance? State your conclusion. `[3 marks]`

**(b) Using the results from R output, comment on the validity of the assumption of multivariate normal population of cost data.** `[3 marks]`

`[Total marks for Question 3 = 10]`

---

## In-Class Quiz 3 (Semester 4, 2025)

**DA2451 - Multivariate Methods in Business**  
**In-Class Quiz 3 (Semester 4, 2025)**  
**Time allowed: 45 minutes | Total mark: 40 | Open-book assignment**

### Question 1

In the first phase of a study on the costs of transporting construction materials from suppliers to building sites, a survey was conducted among companies involved in material transportation. Cost data on $X_1 =$ fuel, $X_2 =$ maintenance, and $X_3 =$ depreciation, all measured on a per-mile basis, were collected for $n_1 = 50$ small trucks and $n_2 = 35$ large trucks. The following partial R output was produced to compare the costs for the two types of trucks. Note that the first 50 observations are for small trucks and the rest for large trucks.

```
HotellingsT2(data[1:50, 1:3], data[-c(1:50), 1:3], test="chi")
T.2 = 45.987, df = ???, p-value < 0.000

mult.norm(data[1:50, 1:3])$mult.test
         Beta-hat     kappa     p-val
Skewness 0.9156708  4.987145 0.8721703
Kurtosis 13.0978595 -1.172639 0.2676505

mult.norm(data[-c(1:50), 1:3])$mult.test
         Beta-hat      kappa     p-val
Skewness 1.423133   4.5689643 0.8995327
Kurtosis 12.789725 -1.0454056 0.3128552

boxM(data[, 1:3], data[, 4])
Chi-Sq (approx.) = 23.462, df = 6, p-value = 0.1555
```

**(a) Test if there is evidence of a difference between the mean cost vectors of the two types of trucks.**
* **(i)** State $H_0$ and $H_1$. `[2 marks]`
* **(ii)** What is the approximated distribution of Hotelling's $T^2$-statistic? Clearly, specify the parameter(s) of the approximated distribution. `[2 marks]`
* **(iii)** Do you reject $H_0$ at the 5% level of significance? State your conclusion. `[3 marks]`

**(b) What assumption(s) do you need to make about the two populations in order to perform the test in (a)?** `[3 marks]`

**(c) Comment on the validity of the assumption(s) mentioned in (b) by conducting appropriate test(s). For each test,**
* **(i)** State $H_0$ and $H_1$. `[4 marks]`
* **(ii)** Using the results from R output, do you reject $H_0$ at the 5% level of significance? State your conclusion. `[6 marks]`

`[Total marks for Question 1 = 20]`

### Question 2

A financial analyst wants to fit a linear regression model using the stock performance data recorded at the end of each trading day in the New York Stock Exchange on different days. The model relates two stock performance metrics, $Y_1 =$ closing price of Stock A and $Y_2 =$ closing price of Stock B, to three predictor variables, $X_1 =$ trading volume, $X_2 =$ market index value, and $X_3 =$ interest rate.

The following partial R output is obtained by fitting the linear model using both responses and three predictors.

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

**(a) Briefly discuss the advantage of considering response variables simultaneously rather than individually in linear regression, in order to draw inferences.** `[2 marks]`

**(b) Use only the first response** $Y_1$ **to answer the following questions and assume** $\alpha = 10\%$**.**
* **(i)** Is there a relationship between the predictors and the response? Justify your answer. `[2 marks]`
* **(ii)** Which predictors appear to have a significant relationship with the response? Justify your answer. `[2 marks]`
* **(iii)** Compute the predicted value for the response when $X_1 = 5000$, $X_2 = 20000$, and $X_3 = 3$. `[3 marks]`

**(c) Repeat (b) using only the second response** $Y_2$**.** `[7 marks]`

**(d) What can you conclude from the Type II MANOVA Tests in the R output? (use** $\alpha = 10\%$**)** `[2 marks]`

**(e) Test whether the model with just** $X_2$ **fits as well as the model with all three predictors at the 10% level of significance.** `[2 marks]`

`[Total marks for Question 2 = 20]`

---

## Final Examination (October 2025)

**UNIVERSITY OF MORATUWA**  
**FACULTY OF BUSINESS**  
**DEPARTMENT OF DECISION SCIENCES**  
**BACHELOR OF BUSINESS SCIENCE (BBSc.)**  
**SEMESTER IV EXAMINATION**  
**DA2451 - Multivariate Methods in Business**  
**Time allowed: 2 Hours & 30 Minutes | October 2025**

**INSTRUCTIONS TO CANDIDATES:**

* This paper contains 30 Multiple Choice Questions (MCQs) and 3 Essay Questions on 11 pages.
* This examination accounts for 50% of the course assessment.
* This is a closed book examination.
* Answer ALL questions.
* Total marks: 100. Each MCQ is worth 2 marks. For Essay Questions, the maximum marks attainable are indicated in the square brackets.

### Multiple Choice Questions `[60 Marks: 2 marks each]`

**1. Let** $X$ **be an** $n \times p$ **data matrix. Which statement about centering and scaling for multivariate analysis is true?**
* (a) Centering changes the pairwise correlation structure but not the covariance matrix
* (b) Scaling by the sample standard deviations changes the principal component directions obtained from the covariance matrix but not those from the correlation matrix
* (c) If variables are centered, the sample variance-covariance matrix $S$ has zero off-diagonal entries
* (d) Scaling by a diagonal matrix does not affect Mahalanobis distances between observations

**2. Which statement correctly describes the key difference between Euclidean and Mahalanobis distances?**
* (a) Euclidean distance assumes variables are correlated
* (b) Mahalanobis distance removes scale and correlation effects
* (c) Mahalanobis distance depends only on the mean vector
* (d) Euclidean distance is invariant to linear transformations

**3. Which display is most appropriate when you want to visualize pairwise linear relationships and marginal distributions for a** $p$**-variable dataset (with** $p$ **moderately large, e.g.** $p = 8$**)?**
* (a) Parallel coordinates plot
* (b) Biplot of the first two principal components
* (c) Matrix of scatterplots with histograms on the diagonal
* (d) 3D scatterplot of the first three variables

**4. Which visual tool best helps identify relationships among multiple variables across cases?**
* (a) Histogram
* (b) Boxplot
* (c) Parallel coordinates plot
* (d) Bar chart

**5. For multivariate normal data, which method is commonly used to detect multivariate outliers?**
* (a) Observations with large univariate $z$-scores in at least one variable
* (b) Observations with large Mahalanobis distances relative to a $\chi_p^2$ reference
* (c) Observations with large Euclidean distances from the centroid
* (d) Observations with high leverage in linear regression only

**6. In multivariate analysis, why is it generally inadvisable to perform separate univariate** $t$**-tests on each response variable?**
* (a) Univariate tests assume all variables are independent
* (b) Univariate tests always underestimate variability
* (c) Univariate tests require normality for each variable
* (d) Univariate tests inflate the type-I error rate and ignore correlations

**7. Which interpretation of significant MANOVA result is correct?**
* (a) The groups differ in the multivariate mean vectors (some linear combination differs)
* (b) At least one response variable has a significant univariate ANOVA $F$
* (c) Every linear combination of responses differs across groups
* (d) There is heteroscedasticity among groups

**8. In a multiple-response regression model, residual plots show that errors across dependent variables are highly correlated. What does this suggest about the model?**
* (a) The model satisfies the independence assumption
* (b) A univariate model for each response is sufficient
* (c) A Multivariate Multiple Linear Regression model is appropriate
* (d) Principal Component Analysis should replace the regression analysis

**9. Why are multivariate test statistics like Wilks' Lambda used in multivariate regression?**
* (a) To test all dependent variables jointly for predictor effects
* (b) To avoid computing covariance matrices
* (c) To compare independent variable means
* (d) To test assumptions of normality

**10. Population principal components are defined as**
* (a) Orthogonal linear combinations of the variables that maximize the common variance
* (b) Loadings from factor analysis under orthogonal rotation
* (c) The columns of the sample covariance matrix
* (d) Linear combinations that make variables independent

**11. A biplot depicts**
* (a) Only the principal component loadings
* (b) Only observation scores on two principal components
* (c) Both observation scores and variable loadings on the same plot, typically for two principal components
* (d) Scree plot and cumulative variance together

**12. A Principal Component Analysis conducted on standardized variables yields eigenvalues 3.8, 1.7, 0.9, and 0.6. How many principal components should be retained using Kaiser's criterion?**
* (a) One
* (b) Two
* (c) Three
* (d) Four

**13. How does Factor Analysis (FA) differ conceptually from Principal Component Analysis (PCA)?**
* (a) FA explains shared variance among variables via latent factors; PCA decomposes total variance
* (b) PCA estimates latent factors; FA estimates principal components
* (c) FA requires orthogonal variables; PCA does not
* (d) FA ignores correlations among observed variables

**14. What is the main objective of Confirmatory Factor Analysis?**
* (a) To explore factor structure without hypotheses
* (b) To test a predefined factor model based on theory
* (c) To estimate the number of clusters
* (d) To maximize explained variance

**15. What is the purpose of factor rotation in FA?**
* (a) To increase the number of extracted factors
* (b) To remove correlated variables
* (c) To reduce communalities
* (d) To simplify interpretation by achieving simple structure

**16. A researcher runs an Exploratory Factor Analysis and finds that several variables load significantly (**$\ge 0.4$**) on more than one factor. What should he do next?**
* (a) Drop those variables automatically
* (b) Increase the number of extracted factors
* (c) Apply an orthogonal or oblique rotation to achieve a simpler structure
* (d) Switch to PCA

**17. In discriminant analysis, which assumption differentiates Linear Discriminant Analysis (LDA) from Quadratic Discriminant Analysis (QDA)?**
* (a) Equal class priors
* (b) Equal covariance matrices across groups
* (c) Normality of predictors
* (d) Independence of observations

**18. In discriminant analysis, the Mahalanobis distance between two group centroids is large and statistically significant. What does this imply?**
* (a) The two groups have highly overlapping distributions
* (b) The groups are well separated in multivariate space
* (c) The within-group variance is minimal
* (d) The discriminant function is not useful

**19. In LDA with** $g$ **groups, what is the maximum number of discriminant functions that can be obtained?**
* (a) $p$ (number of variables)
* (b) $g$
* (c) $g - 1$
* (d) $p - g$

**20. A researcher applies LDA to classify patients into "diabetic" and "non-diabetic." The group covariance matrices appear significantly different based on Box's M test (**$p < 0.01$**). Which action is most appropriate?**
* (a) Continue with LDA since small $p$-values are desirable
* (b) Drop correlated predictors to restore equality of covariance matrices
* (c) Switch to QDA
* (d) Use PCA instead of a classification method

*For each of the following research questions, identify the most appropriate multivariate statistical technique to recommend. Only one choice may be selected for each study. Assume that all model assumptions are satisfied unless otherwise stated.*

*Abbreviations for multivariate statistical techniques:*
* *CA: Cluster Analysis*
* *CFA: Confirmatory Factor Analysis*
* *EFA: Exploratory Factor Analysis*
* *LDA: Linear Discriminant Analysis*
* *LR: Logistic Regression*
* *MANOVA: Multivariate Analysis of Variance*
* *MMLR: Multivariate Multiple Linear Regression*
* *PCA: Principal Component Analysis*
* *PCR: Principal Component Regression*
* *QDA: Quadratic Discriminant Analysis*

**21. A cognitive neuroscientist records five brain wave measures (EEG frequencies) from patients with and without mild cognitive impairment. She wants to test whether overall neural activity profiles differ between the two groups.**
* (a) CFA
* (b) EFA
* (c) MANOVA
* (d) MMLR

**22. A financial analyst investigates how interest rate, inflation, GDP growth, and unemployment jointly predict three financial outcomes (stock market index return, bond yield, and exchange rate).**
* (a) LR
* (b) MANOVA
* (c) MMLR
* (d) PCR

**23. A marketing researcher collects data on 20 product attributes (price perception, quality, trust, aesthetics, etc.) rated by consumers. She wishes to identify latent dimensions that represent how consumers evaluate products.**
* (a) LDA
* (b) CFA
* (c) EFA
* (d) PCA

**24. A medical researcher records biochemical markers from cancer patients and non-cancer controls to create a function that best classifies new patients into one of the two categories.**
* (a) LDA
* (b) LR
* (c) PCA
* (d) QDA

**25. In a consumer behavior study, researchers wish to identify clusters of shoppers based on their spending patterns, visit frequency, and product preferences, without prior group labels.**
* (a) CA
* (b) EFA
* (c) LDA
* (d) PCA

**26. A data scientist analyzes highly correlated financial indicators (e.g., market volatility indices) to predict future stock returns. She wants to reduce predictor dimensionality before regression to avoid multicollinearity.**
* (a) LR
* (b) MMLR
* (c) PCA
* (d) PCR

**27. A geneticist collects data on gene expression levels for 50 genes from 200 individuals. The goal is to reduce the large number of correlated gene variables into a smaller set of orthogonal components that summarize major variation patterns in the data.**
* (a) EFA
* (b) MANOVA
* (c) PCA
* (d) QDA

**28. A clinical researcher builds a model to classify patients into "high-risk" or "low-risk" cardiovascular groups using cholesterol, blood pressure, BMI, and glucose as predictors. Early exploration shows non-linear separation boundaries between the groups.**
* (a) CA
* (b) LDA
* (c) LR
* (d) QDA

**29. A developmental psychologist hypothesizes that "academic motivation" and "social engagement" are two latent constructs underlying responses to 15 survey items. She specifies a model and tests whether the observed data fit this hypothesized factor structure.**
* (a) CFA
* (b) EFA
* (c) MANOVA
* (d) PCA

**30. A company wants to predict customer churn (**$\text{churn} = 1$**,** $\text{retain} = 0$**) using usage statistics, satisfaction ratings, and complaint frequency. The firm is less interested in dimensionality reduction and more in estimating probabilities for each customer.**
* (a) LDA
* (b) LR
* (c) PCR
* (d) QDA

### Essay Questions `[40 Marks]`

### Question 1

A nutrition researcher investigates the effect of a new dietary supplement on the nutrient profile of athletes. Each of the $n = 28$ athletes provided blood samples both before and after an 8-week supplementation program. Three continuous nutrient concentration measures were recorded for each athlete: $X_1 =$ Vitamin D ($\text{ng/mL}$), $X_2 =$ Iron ($\mu\text{g/dL}$), and $X_3 =$ Calcium ($\text{mg/dL}$).

The researcher aims to determine whether the mean vector of nutrient levels changed significantly after supplementation. The following partial R output was obtained.

```
Difference data: (After - Before)
HotellingsT2(diff_data[, 1:3], mu = ??)
T.2 = 31.285, df = ??, p-value = 0.0012

mult.norm(diff_data[, 1:3])$mult.test
          Beta-hat     kappa    p-val
Skewness  0.926845  4.351241 0.853290
Kurtosis 11.973180 -0.984522 0.324465
```

**(a) Test whether there is evidence of a change in the mean nutrient profile after supplementation.**
* **(i)** State $H_0$ and $H_1$. `[2 marks]`
* **(ii)** What value of `mu` should be entered in the `HotellingsT2()` function? `[2 marks]`
* **(iii)** Specify the approximate distribution of Hotelling's $T^2$-statistic, clearly indicating its parameters. `[2 marks]`
* **(iv)** Based on the results, would you reject $H_0$ at the 5% significance level? State your conclusion. `[2 marks]`

**(b) Using the multivariate normality test results from the R output, comment on the validity of the assumption that the nutrient concentration differences follow a multivariate normal distribution.** `[2 marks]`

`[Total marks for Question 1 = 10]`

### Question 2

A researcher measured three response variables across four treatment groups and constructed the following one-way MANOVA table to compare the treatments.

| Source of variation | Matrix of sum of squares and cross products | Degrees of freedom |
| :--- | :---: | :---: |
| Treatment | $\begin{bmatrix} 15 & -10 & 5 \\ -10 & 40 & -20 \\ 5 & -20 & 25 \end{bmatrix}$ | ? |
| Residual | $\begin{bmatrix} ? & ? & ? \\ ? & ? & ? \\ ? & ? & ? \end{bmatrix}$ | ? |
| Total | $\begin{bmatrix} 50 & -20 & 10 \\ -20 & 90 & -30 \\ 10 & -30 & 60 \end{bmatrix}$ | 79 |

**(a) Determine the total number of observations in the study and complete the MANOVA table.** `[5 marks]`

**(b) State** $H_0$ **and** $H_1$ **to test for treatment effects. Given that the** $p$**-value for Wilks' lambda is 0.023, would you reject** $H_0$ **at the 5% significance level? State your conclusion.** `[3 marks]`

**(c) Which assumptions have you made to validate the test in Part (b)?** `[2 marks]`

`[Total marks for Question 2 = 10]`

### Question 3

A researcher analyzed data from 120 patients, each belonging to one of three heart risk categories: Low, Medium, and High. Four continuous predictors were measured for each patient: Age, Cholesterol, Resting Blood Pressure, and Maximum Heart Rate.

The researcher performed a Linear Discriminant Analysis (LDA) in R using the `lda()` function from the `MASS` package. The relevant output is given below.

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

**(a) Interpret the LDA output by explaining the meaning of the prior probabilities, group means, coefficients of linear discriminants, and the proportion of trace for each discriminant function.** `[8 marks]`

**(b) What are the two key assumptions on which LDA is based? Discuss how violations of these assumptions might affect the accuracy of the classification results.** `[4 marks]`

**(c) Based on the coefficients of the linear discriminants, explain which predictors appear most important in distinguishing among the three risk categories.** `[3 marks]`

**(d) If 10% of the patients in the training set were misclassified by the LDA model, what does this indicate about the model's performance?** `[3 marks]`

**(e) Compare LDA with logistic regression for multi-class classification. Under what conditions might LDA outperform logistic regression, and why?** `[2 marks]`

`[Total marks for Question 3 = 20]`