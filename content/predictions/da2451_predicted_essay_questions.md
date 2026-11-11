# AI-GENERATED PRACTICE PREDICTIONS – NOT OFFICIAL EXAM QUESTIONS

These questions are original AI-generated practice material based on the DA2451 syllabus, previous examination styles, and available practice worksheets. They are not copied from past examinations, are not provided or endorsed by the lecturer, and are not guaranteed to appear in any examination. Their purpose is to help students prepare for unfamiliar questions.

---

## Topic 1: Sample Geometry, Matrix Algebra & Distance Metrics

### G-ESS-001
A logistics analytics firm evaluates $n = 4$ regional fulfillment centers across $p = 3$ operational metrics:
* $X_1 =$ Order processing time (hours)
* $X_2 =$ Packaging error rate (defects per 1,000 orders)
* $X_3 =$ Composite delay index

The observed data matrix $X$ for the four centers is:

$$
X = \begin{bmatrix} 
2 & 1 & 5 \\ 
4 & 3 & 11 \\ 
6 & 1 & 13 \\ 
8 & 3 & 19 
\end{bmatrix}
$$

**(a)** Compute the sample mean vector $\bar{x}$ and write down the $4 \times 3$ mean-centered deviation matrix $D = [d_1, \, d_2, \, d_3]$. `[4 marks]`

**(b)** Using the deviation vectors $d_1$ and $d_2$, calculate their Euclidean lengths $L_{d_1}$ and $L_{d_2}$, their inner product $d_1' d_2$, and the cosine of the angle $\theta_{12}$ between them in 4-dimensional observation space. Hence, determine the $2 \times 2$ sample covariance matrix $S_{12}$ and sample correlation matrix $R_{12}$ for $(X_1, X_2)$ alone. `[6 marks]`

**(c)** Express the third deviation vector $d_3$ as an exact linear combination of $d_1$ and $d_2$. Without calculating the full $3 \times 3$ determinant by cofactor expansion, state the value of the generalized sample variance $|S|$ for all three variables $(X_1, X_2, X_3)$ and explain its geometric meaning in terms of the volume spanned by the deviation vectors. `[5 marks]`

**(d)** Because $X_3$ is redundant, the analyst drops $X_3$ and retains only $(X_1, X_2)$. Consider two newly opened fulfillment centers with profiles $P = \begin{bmatrix} 3 \\ 3 \end{bmatrix}$ and $Q = \begin{bmatrix} 7 \\ 1 \end{bmatrix}$. Using $S_{12}$ from Part (b), calculate both the Euclidean distance and the Mahalanobis distance from the sample centroid $\bar{x}_{(12)} = \begin{bmatrix} 5 \\ 2 \end{bmatrix}$ to point $P$. Explain why these two distances differ. `[5 marks]`

`[Total marks for G-ESS-001 = 20]`

---

## Topic 2: Multivariate Normal Distribution & Partitioned Vectors

### G-ESS-002
In a portfolio risk model, the weekly log-returns (in percentage points) of two technology stocks ($X_1, X_2$) and one sovereign bond index ($X_3$) follow a trivariate normal distribution $X = (X_1, X_2, X_3)' \sim N_3(\mu, \Sigma)$ with

$$
\mu = \begin{bmatrix} 1.5 \\ 2.0 \\ 0.5 \end{bmatrix} \quad \text{and} \quad \Sigma = \begin{bmatrix} 4 & 2 & -1 \\ 2 & 5 & 0 \\ -1 & 0 & 1 \end{bmatrix}
$$

**(a)** An investor constructs an equally weighted equity basket $W_1 = 0.5 X_1 + 0.5 X_2$ and a hedged spread position $W_2 = X_1 - X_2 + 2 X_3$.
* **(i)** Specify the transformation matrix $A$ such that $W = \begin{bmatrix} W_1 \\ W_2 \end{bmatrix} = A X$. `[2 marks]`
* **(ii)** Find the exact joint distribution of $W_1$ and $W_2$. `[5 marks]`
* **(iii)** Are the equity basket $W_1$ and the hedged spread $W_2$ statistically independent? Justify your answer thoroughly. `[2 marks]`

**(b)** Partition the vector $X$ into equity returns $X_{(1)} = \begin{bmatrix} X_1 \\ X_2 \end{bmatrix}$ and bond return $X_{(2)} = [X_3]$. Suppose at the close of a volatile week, the sovereign bond index return is observed to be $X_3 = -1.5$. Derive the conditional distribution of the equity returns $X_{(1)}$ given $X_3 = -1.5$. Compare the conditional covariance between $X_1$ and $X_2$ with their unconditional covariance. `[6 marks]`

**(c)** Find the value of the constant $k$ such that the linear combination $U = X_1 + k X_3$ is independent of $X_3$. Specify the univariate distribution of $U$ for this choice of $k$. `[5 marks]`

`[Total marks for G-ESS-002 = 20]`

---

## Topic 3: Multivariate Normality Diagnostics, Outliers & Transformations

### G-ESS-003
A fintech credit platform records $p = 3$ borrower attributes for a sample of $n = 45$ small-business loan applications:
* $X_1 =$ Debt-to-equity ratio
* $X_2 =$ Operating cash-flow margin
* $X_3 =$ Annual revenue growth rate

Before performing parametric multivariate inference, the data science team conducts normality and outlier diagnostics in R. The partial R output is shown below:

```
--- Univariate Shapiro-Wilk Normality Tests ---
X1: W = 0.784, p-value = 1.42e-06
X2: W = 0.978, p-value = 0.5412
X3: W = 0.969, p-value = 0.2684

--- Mardia's Multivariate Normality Test (Original Data) ---
           Beta-hat    kappa     p-val
Skewness   4.892104  36.6908  0.000131
Kurtosis  21.450120   3.1842  0.001452

--- Top 5 Squared Mahalanobis Distances (Original Data) ---
Obs_ID:   Obs_19   Obs_07   Obs_33   Obs_41   Obs_12
D2_val:   18.420    8.910    7.450    6.820    6.110
(Note: qchisq(0.99, df = 3) = 11.345; qchisq(0.95, df = 3) = 7.815)

--- Box-Cox Power Transformation for X1 ---
Estimated lambda_hat = -0.041 (95% CI: -0.22 to +0.14)

--- Mardia's Multivariate Normality Test (After transforming X1 -> log(X1) and inspecting Obs_19) ---
           Beta-hat    kappa     p-val
Skewness   1.104520   8.2839  0.598410
Kurtosis  14.821030  -0.1945  0.845780
```

**(a)** Interpret the univariate Shapiro-Wilk tests and Mardia's multivariate normality test on the original dataset at the $\alpha = 0.01$ significance level. Why is testing univariate normality of $X_1, X_2,$ and $X_3$ insufficient on its own to validate multivariate normality? `[4 marks]`

**(b)** Explain how a Chi-Square Q-Q plot is constructed using the squared Mahalanobis distances $D_i^2 = (x_i - \bar{x})' S^{-1} (x_i - \bar{x})$. Using the critical values provided in the output, evaluate whether `Obs_19` and `Obs_07` should be flagged as potential multivariate outliers at the $1\%$ level. `[5 marks]`

**(c)** Based on the Box-Cox transformation output for $X_1$, explain why transforming $X_1$ via the natural logarithm $\ln(X_1)$ is statistically justified. `[3 marks]`

**(d)** After replacing $X_1$ with $\ln(X_1)$, the squared Mahalanobis distance for `Obs_19` drops from $18.420$ to $5.120$, and the updated Mardia's test yields the second table shown in the output. Discuss why transforming a skewed marginal variable often resolves apparent multivariate outliers without deleting observations, and state whether the transformed dataset satisfies the assumption of multivariate normality. `[4 marks]`

`[Total marks for G-ESS-003 = 16]`

---

## Topic 4: Principal Component Analysis (PCA) — Covariance vs. Correlation

### G-ESS-004
A digital media company tracks two customer engagement metrics for $n = 100$ enterprise accounts:
* $X_1 =$ Weekly active platform minutes (mean $\bar{x}_1 = 120$, variance $s_{11} = 100$)
* $X_2 =$ Weekly support tickets raised (mean $\bar{x}_2 = 5$, variance $s_{22} = 4$)

The sample covariance between $X_1$ and $X_2$ is $s_{12} = 12$.

**(a)** Write down the $2 \times 2$ sample covariance matrix $S$ and compute the corresponding $2 \times 2$ sample correlation matrix $R$. `[3 marks]`

**(b)** Derive the eigenvalues $\lambda_1, \lambda_2$ and the normalized eigenvectors $e_1, e_2$ of the sample covariance matrix $S$. Write down the equations for the principal components $Y_1$ and $Y_2$ in terms of the centered variables $(X_1 - 120)$ and $(X_2 - 5)$, and calculate the proportion of total sample variance explained by $Y_1$. `[6 marks]`

**(c)** Derive the eigenvalues $\lambda_1^*, \lambda_2^*$ and the normalized eigenvectors $e_1^*, e_2^*$ of the sample correlation matrix $R$. Write down the equations for the standardized principal components $Y_1^*$ and $Y_2^*$ in terms of the standardized variables $Z_1 = \frac{X_1 - 120}{10}$ and $Z_2 = \frac{X_2 - 5}{2}$, and calculate the proportion of total standardized variance explained by $Y_1^*$. `[6 marks]`

**(d)** Calculate the correlation coefficient between the second variable $X_2$ and the first covariance-based principal component $Y_1$, and compare it with the correlation between $Z_2$ and the first correlation-based principal component $Y_1^*$. Using these values, explain why performing PCA on $S$ versus $R$ leads to fundamentally different representations of customer engagement. `[5 marks]`

`[Total marks for G-ESS-004 = 20]`

---

## Topic 5: Principal Component Analysis (PCA) — R Output & Index Construction

### G-ESS-005
A sustainable supply-chain consultancy evaluates $n = 85$ manufacturing suppliers across $p = 6$ standardized Environmental, Social, and Governance (ESG) indicators:
* $X_1 =$ Carbon intensity per unit output
* $X_2 =$ Water consumption per unit output
* $X_3 =$ Hazardous waste generation rate
* $X_4 =$ Employee safety training hours
* $X_5 =$ Living-wage compliance ratio
* $X_6 =$ Board independence percentage

The following R output was generated using `prcomp(esg_data, center = TRUE, scale. = TRUE)`:

```
Standard deviations (1, .., p=6):
[1] 1.760682 1.378405 0.774597 0.447214 0.346410 0.282843

Rotation (n x k) = (6 x 6):
       PC1     PC2     PC3     PC4     PC5     PC6
X1  0.5412  0.1104 -0.1825  0.3910 -0.5120  0.4981
X2  0.5285  0.1421 -0.2410 -0.7812  0.1840  0.0615
X3  0.5198  0.0985  0.3982  0.4125  0.6215 -0.0824
X4 -0.2104  0.6120 -0.4112  0.2105  0.3410  0.5012
X5 -0.2415  0.5890 -0.1520  0.0985 -0.3912 -0.6410
X6 -0.2380  0.4812  0.7450 -0.1210 -0.2105  0.2915
```

**(a)** Compute the eigenvalue (variance) of each of the six principal components, the proportion of variance explained by each component, and the cumulative proportion of variance explained. `[5 marks]`

**(b)** How many principal components should be retained according to:
* **(i)** Kaiser's criterion?
* **(ii)** Jolliffe's modified criterion ($\lambda > 0.70$ for correlation matrices)?
* **(iii)** A cumulative variance threshold of $80\%$?
Discuss which choice provides the most meaningful summary of the six ESG indicators. `[4 marks]`

**(c)** Examine the loadings (`Rotation`) of `PC1`, `PC2`, and `PC3`. Provide a clear substantive business interpretation for each of the first three principal components based on the signs and magnitudes of the loadings. `[5 marks]`

**(d)** Two suppliers have the following standardized $Z$-score profiles across $(Z_1, Z_2, Z_3, Z_4, Z_5, Z_6)$:
* **Supplier Alpha:** $(-1.0, \, -1.0, \, -1.0, \, 1.0, \, 1.0, \, 1.0)$
* **Supplier Beta:** $(1.5, \, 1.0, \, 1.0, \, 0.5, \, 0.5, \, 0.5)$

Compute the `PC1` and `PC2` scores for Supplier Alpha. If the consultancy uses `PC1` alone to rank suppliers on "Green & Ethical Excellence", should higher or lower values of `PC1` be preferred? Justify your answer carefully. `[6 marks]`

`[Total marks for G-ESS-005 = 20]`

---

## Topic 6: Principal Components Regression (PCR) & Model Evaluation

### G-ESS-006
A commercial real-estate analytics team wants to predict the annual net operating income ($Y$, in millions of LKR) of $n = 60$ urban shopping malls using $p = 4$ standardized neighbourhood predictors:
* $Z_1 =$ Foot-traffic density within 1 km
* $Z_2 =$ Retail store density within 1 km
* $Z_3 =$ Public transit accessibility index
* $Z_4 =$ Average parking tariff per hour

Because $Z_1, Z_2,$ and $Z_3$ are strongly collinear, the team splits the data into a training set ($n_{\text{train}} = 45$) and a test set ($n_{\text{test}} = 15$) and performs Principal Components Regression (PCR). The R output from the training set is given below:

```
--- Variance Inflation Factors (OLS on Z1..Z4) ---
   Z1    Z2    Z3    Z4 
18.42 16.95  9.84  1.12 

--- PCA on Training Predictors (Z1..Z4) ---
Eigenvalues of R_train:
  PC1   PC2   PC3   PC4 
2.680 0.960 0.310 0.050 

Eigenvectors (Rotation matrix V):
      PC1    PC2    PC3    PC4
Z1  0.580  0.100 -0.400  0.701
Z2  0.575  0.120 -0.380 -0.714
Z3  0.560  0.080  0.822  0.015
Z4 -0.135  0.985  0.130  0.005

--- PCR Model Fitted on Training Set (Y ~ PC1 + PC2 + PC3 + PC4) ---
Coefficients:
            Estimate Std. Error t value Pr(>|t|)
(Intercept)  24.5000     0.4200  58.333  < 2e-16 ***
PC1           3.2000     0.2565  12.476  2.1e-15 ***
PC2          -1.8000     0.4287  -4.199  0.00014 ***
PC3           0.1500     0.7548   0.199  0.84340
PC4           0.4000     1.8783   0.213  0.83241

--- Cross-Validation & Test Set RMSE ---
Number of PCs retained (k):     1      2      3      4 (Full OLS)
10-Fold CV RMSE (Train):     3.48   2.81   2.89   3.15
Holdout Test Set RMSE:       3.55   2.74   2.86   3.22
```

**(a)** Using the Variance Inflation Factors (VIFs) and the eigenvalues of the training correlation matrix, diagnose the severity and structure of multicollinearity among $Z_1, Z_2, Z_3,$ and $Z_4$. `[3 marks]`

**(b)** Based on the regression output and the RMSE table, how many principal components ($k$) should be retained in the PCR model? Explain why retaining $k = 4$ components produces a higher test set RMSE ($3.22$) than retaining $k = 2$ components ($2.74$). `[4 marks]`

**(c)** For the PCR model retaining only `PC1` and `PC2` ($\hat{Y} = 24.50 + 3.20\,\text{PC}_1 - 1.80\,\text{PC}_2$), transform the principal component regression equation back into the original standardized predictor space to find the implied PCR regression coefficients $\hat{\beta}_1, \hat{\beta}_2, \hat{\beta}_3,$ and $\hat{\beta}_4$ for $Z_1, Z_2, Z_3,$ and $Z_4$. `[5 marks]`

**(d)** A new shopping mall in the holdout test set has already been standardized using the training set means and standard deviations, yielding $z_{\text{new}} = \begin{bmatrix} 1.0 & 1.0 & 0.5 & -1.0 \end{bmatrix}'$. Calculate its scores on `PC1` and `PC2`, and compute its predicted net operating income $\hat{Y}_{\text{new}}$ using the 2-component PCR model. `[4 marks]`

**(e)** Notice from the PCR coefficient table that the standard error of the estimated slope increases monotonically from `PC1` ($0.2565$) to `PC4` ($1.8783$). Using the mathematical formula for the variance of an OLS slope estimator in orthogonal regression, explain why principal components with smaller eigenvalues always have larger coefficient standard errors. `[4 marks]`

`[Total marks for G-ESS-006 = 20]`

---

## Topic 7: Regression Diagnostics & Influential Observations

### G-ESS-007
An e-commerce logistics manager models monthly warehouse operating cost ($Y$, in thousands of USD) as a function of three predictors: $X_1 =$ total parcels shipped, $X_2 =$ percentage of express deliveries, and $X_3 =$ average parcel weight, across $n = 36$ regional warehouses ($p = 4$ parameters including intercept).

To check whether the fitted multiple regression model satisfies the classical statistical assumptions, the analyst generates diagnostic statistics for four notable warehouses and runs residual tests in R:

```
--- Case Diagnostics for Selected Warehouses (n = 36, p = 4) ---
Warehouse   Fitted_Y   Raw_Resid   Studentized_Resid(t_i)   Leverage(h_ii)   Cooks_D
WH_04          42.1       -0.85                    -0.29            0.482     0.020
WH_15          68.5       14.20                     3.85            0.055     0.165
WH_27          95.0      -16.80                    -4.12            0.395     2.768
WH_31          51.3        1.10                     0.34            0.042     0.001

--- Global Residual Diagnostic Tests ---
Breusch-Pagan test for non-constant variance: BP = 11.84, df = 3, p-value = 0.0079
Shapiro-Wilk test on studentized residuals:   W = 0.912, p-value = 0.0074
Durbin-Watson test for autocorrelation:       DW = 1.96, p-value = 0.4810
```

**(a)** State the commonly used rule-of-thumb cutoffs for high leverage ($h_{ii}$), outlier studentized residuals ($|t_i|$), and high influence via Cook's distance ($D_i$) in a sample of size $n = 36$ with $p = 4$ parameters. `[3 marks]`

**(b)** Compare and contrast the diagnostic profiles of warehouses `WH_04`, `WH_15`, and `WH_27`. Explain geometrically why `WH_04` has a very small Cook's distance despite having the highest leverage in the dataset, whereas `WH_27` has an extreme Cook's distance. `[6 marks]`

**(c)** Interpret the results of the Breusch-Pagan, Shapiro-Wilk, and Durbin-Watson tests at the $\alpha = 0.05$ significance level. How would the violations detected by these tests appear visually on:
* **(i)** A plot of residuals versus fitted values?
* **(ii)** A normal Q-Q plot of the studentized residuals? `[4 marks]`

**(d)** Outline a responsible, multi-step workflow for handling `WH_27` and addressing the violated model assumptions before using the regression model for warehouse budget allocation. `[3 marks]`

`[Total marks for G-ESS-007 = 16]`

---

## Topic 8: Factor Analysis (FA) — Principal Component Extraction & Matrix Reproduction

### G-ESS-008
A behavioral economist studies $p = 4$ standardized consumer financial habits ($Z_1 =$ Emergency savings rate, $Z_2 =$ Retirement contribution rate, $Z_3 =$ Impulse credit spending, $Z_4 =$ Buy-now-pay-later usage). The sample correlation matrix $R$ is

$$
R = \begin{bmatrix} 
1.00 & 0.72 & -0.40 & -0.36 \\ 
0.72 & 1.00 & -0.35 & -0.42 \\ 
-0.40 & -0.35 & 1.00 & 0.64 \\ 
-0.36 & -0.42 & 0.64 & 1.00 
\end{bmatrix}
$$

The eigenvalue-eigenvector pairs of $R$ are given below:

$$
\lambda_1 = 2.44, \quad e_1' = \begin{bmatrix} 0.51 & 0.51 & -0.49 & -0.49 \end{bmatrix}
$$

$$
\lambda_2 = 0.92, \quad e_2' = \begin{bmatrix} 0.49 & 0.49 & 0.51 & 0.51 \end{bmatrix}
$$

$$
\lambda_3 = 0.38, \quad e_3' = \begin{bmatrix} -0.50 & 0.50 & -0.50 & 0.50 \end{bmatrix}
$$

$$
\lambda_4 = 0.26, \quad e_4' = \begin{bmatrix} -0.50 & 0.50 & 0.50 & -0.50 \end{bmatrix}
$$

**(a)** Using the Principal Component extraction method, compute the unrotated $4 \times 2$ factor loading matrix $L = [\tilde{l}_{ij}]$ for a two-factor model ($m = 2$). `[4 marks]`

**(b)** Calculate the communality $h_i^2$ and the specific variance $\tilde{\psi}_i$ for each of the four variables under the two-factor model, and find the proportion of total standardized variance explained by the two factors. `[4 marks]`

**(c)** Compute the reproduced correlation matrix $\tilde{R}_{(2)} = L L' + \Psi$ for the two-factor model and determine the residual correlation matrix $E_{(2)} = R - \tilde{R}_{(2)}$. Comment on the goodness-of-fit of the two-factor model. `[5 marks]`

**(d)** To achieve simple structure, the economist applies an orthogonal rotation matrix $T = \frac{1}{\sqrt{2}}\begin{bmatrix} 1 & -1 \\ 1 & 1 \end{bmatrix}$ to the initial loading matrix $L$, obtaining the rotated loadings $L^* = L T$.
* **(i)** Compute the $4 \times 2$ rotated loading matrix $L^*$. `[3 marks]`
* **(ii)** Verify that the communalities of all four variables remain unchanged after rotation, and interpret the two rotated factors in the context of consumer financial behavior. `[4 marks]`

`[Total marks for G-ESS-008 = 20]`

---

## Topic 9: Exploratory vs. Confirmatory Factor Analysis & R Output Interpretation

### G-ESS-009
A hospitality management researcher surveys $n = 250$ hotel guests on $p = 8$ service attributes rated on a continuous $0\text{--}100$ scale:
* $X_1 =$ Room cleanliness, $X_2 =$ Bed comfort, $X_3 =$ Bathroom hygiene
* $X_4 =$ Front-desk courtesy, $X_5 =$ Check-in speed, $X_6 =$ Concierge helpfulness
* $X_7 =$ Restaurant menu variety, $X_8 =$ Breakfast quality

The researcher runs an Exploratory Factor Analysis (EFA) in R using Maximum Likelihood extraction with Varimax rotation. The partial output is presented below:

```
--- Pre-Analysis Diagnostics ---
Kaiser-Meyer-Olkin (KMO) Overall MSA = 0.84
Bartlett's Test of Sphericity: Chi-Sq = 1120.5, df = 28, p-value < 2.2e-16

--- Factor Analysis using method = ml, rotation = varimax ---
Standardized loadings (pattern matrix) based upon correlation matrix:
     ML1   ML2   ML3   u2
X1  0.12  0.85  0.08 0.256
X2  0.15  0.81  0.11 0.309
X3  0.09  0.84  0.05 0.284
X4  0.86  0.14  0.10 0.231
X5  0.82  0.11  0.14 0.296
X6  0.79  0.16  0.12 0.336
X7  0.18  0.09  0.78 0.351
X8  0.11  0.13  0.83 0.282

                       ML1   ML2   ML3
SS loadings           2.18  2.16  1.32
Proportion Var        0.27  0.27  0.17
Proportion Explained  0.39  0.38  0.23

Test of the hypothesis that 3 factors are sufficient:
The chi square statistic is 14.82 on 7 degrees of freedom.
The p-value is 0.0384.
```

**(a)** Interpret the KMO measure of sampling adequacy and Bartlett's test of sphericity. Explain what each diagnostic tests and why both should be checked prior to extracting factors. `[4 marks]`

**(b)** In the R output table, column `u2` reports the uniqueness (specific variance) of each variable. Show how `u2 = 0.256` for $X_1$ is computed from its factor loadings, and state the communality $h_1^2$ of $X_1$. `[3 marks]`

**(c)** Distinguish carefully between the rows `Proportion Var` and `Proportion Explained` in the R output. Calculate the cumulative percentage of total variance across all 8 variables explained by the 3-factor model. `[3 marks]`

**(d)** Using a loading threshold of $|l_{ij}| \ge 0.60$, sketch the factor structure diagram linking the latent factors `ML1`, `ML2`, and `ML3` to the observed variables $X_1 \dots X_8$ (including unique error terms), and propose meaningful domain names for the three factors. `[5 marks]`

**(e)** Interpret the Maximum Likelihood goodness-of-fit test at the bottom of the output ($\chi^2 = 14.82, df = 7, p = 0.0384$) at both $\alpha = 0.05$ and $\alpha = 0.01$. If the researcher subsequently collects a new sample of $n = 400$ guests from another hotel chain to test whether this exact 3-factor diagram holds without cross-loadings, explain why Confirmatory Factor Analysis (CFA) should be used instead of repeating EFA. `[5 marks]`

`[Total marks for G-ESS-009 = 20]`

---

## Topic 10: One-Sample & Paired Hotelling's $T^2$ Inference

### G-ESS-010
A retail bank introduces an AI-assisted workflow for its mortgage underwriting officers. To evaluate its impact, the bank records $p = 3$ performance metrics for a random sample of $n = 25$ loan officers for one month before and one month after the rollout:
* $X_1 =$ Average loan processing turnaround time (hours)
* $X_2 =$ Compliance documentation accuracy score (out of 100)
* $X_3 =$ Customer satisfaction rating (out of 10)

For each officer $i = 1, \dots, 25$, the difference vector $D_i = X_{i,\text{After}} - X_{i,\text{Before}}$ is calculated. The sample mean difference vector $\bar{d}$ and the sample covariance matrix of the differences $S_d$ are:

$$
\bar{d} = \begin{bmatrix} -2.0 \\ 4.0 \\ 1.0 \end{bmatrix}, \quad S_d = \begin{bmatrix} 10.0 & 0.0 & 0.0 \\ 0.0 & 20.0 & 5.0 \\ 0.0 & 5.0 & 5.0 \end{bmatrix}
$$

**(a)** Formulate the null and alternative hypotheses ($H_0$ and $H_1$) to test whether the AI-assisted workflow produced any change in the population mean performance vector. `[2 marks]`

**(b)** Calculate the inverse matrix $S_d^{-1}$ and compute the exact value of the paired Hotelling's $T^2$ test statistic:

$$
T^2 = n (\bar{d} - \mu_{d0})' S_d^{-1} (\bar{d} - \mu_{d0})
$$

`[6 marks]`

**(c)** Transform $T^2$ into its exact $F$-statistic, state its numerator and denominator degrees of freedom, and test $H_0$ at the $\alpha = 0.01$ significance level. *(Given critical value: $F_{3, 22}(0.01) = 4.82$)*. State your conclusion in the context of the bank's operations. `[4 marks]`

**(d)** Construct the $99\%$ simultaneous $T^2$-confidence intervals for each of the three mean differences $\mu_{d1}, \mu_{d2},$ and $\mu_{d3}$ using the formula:

$$
\bar{d}_j \pm \sqrt{\frac{p(n-1)}{n-p} F_{p, n-p}(\alpha)} \sqrt{\frac{s_{d,jj}}{n}}
$$

Based on these simultaneous intervals, identify which specific performance metrics changed significantly at the $1\%$ family-wise level, and explain why these intervals are wider than separate univariate $99\%$ $t$-intervals. `[6 marks]`

`[Total marks for G-ESS-010 = 18]`

---

## Topic 11: Two-Sample Hotelling's $T^2$, Assumptions & Profile Analysis

### G-ESS-011
An organizational development firm compares $n_1 = 31$ remote software engineering teams and $n_2 = 31$ on-site software engineering teams across $p = 3$ quarterly evaluation scores (all measured on a standardized $0\text{--}100$ scale):
* $X_1 =$ Code quality index
* $X_2 =$ Sprint delivery velocity
* $X_3 =$ Cross-team collaboration score

The sample mean vectors and the pooled sample covariance matrix $S_{\text{pooled}}$ are:

$$
\bar{x}_{\text{Remote}} = \begin{bmatrix} 78.0 \\ 82.0 \\ 70.0 \end{bmatrix}, \quad \bar{x}_{\text{OnSite}} = \begin{bmatrix} 75.0 \\ 79.0 \\ 76.0 \end{bmatrix}, \quad S_{\text{pooled}} = \begin{bmatrix} 18 & 6 & 4 \\ 6 & 20 & 8 \\ 4 & 8 & 16 \end{bmatrix}
$$

Prior to comparing the means, the analyst ran assumption checks in R:

```
--- Box's M-test for Homogeneity of Covariance Matrices ---
Chi-Sq (approx.) = 7.842, df = 6, p-value = 0.2499

--- Mardia's Multivariate Normality Tests ---
Remote Teams: Skewness p-val = 0.612, Kurtosis p-val = 0.448
OnSite Teams: Skewness p-val = 0.539, Kurtosis p-val = 0.715
```

**(a)** State the null and alternative hypotheses for Box's M-test and Mardia's tests. Using the R output, verify whether the underlying assumptions for a two-sample pooled Hotelling's $T^2$ test and profile analysis are satisfied at $\alpha = 0.05$. `[4 marks]`

**(b)** Because all three evaluation scores are measured on the same $0\text{--}100$ scale, the analyst performs a **Profile Analysis** using the contrast matrix

$$
C = \begin{bmatrix} 1 & -1 & 0 \\ 0 & 1 & -1 \end{bmatrix}
$$

* **(i)** Compute the sample mean contrast vectors $C \bar{x}_{\text{Remote}}$ and $C \bar{x}_{\text{OnSite}}$, as well as the transformed covariance matrix $C S_{\text{pooled}} C'$. `[5 marks]`
* **(ii)** Calculate the Hotelling's $T^2$ statistic for testing whether the remote and on-site team profiles are **parallel** ($H_{01}: C\mu_{\text{Remote}} = C\mu_{\text{OnSite}}$):

$$
T^2 = \frac{n_1 n_2}{n_1 + n_2} (\bar{x}_{\text{Remote}} - \bar{x}_{\text{OnSite}})' C' (C S_{\text{pooled}} C')^{-1} C (\bar{x}_{\text{Remote}} - \bar{x}_{\text{OnSite}})
$$

`[5 marks]`
* **(iii)** Convert $T^2$ into an $F$-statistic and test the parallel profiles hypothesis at $\alpha = 0.01$. *(Given critical value: $F_{2, 59}(0.01) = 4.98$)*. `[3 marks]`

**(c)** Based on your decision in Part (b)(iii), explain geometrically why a profile interaction exists between work mode (Remote vs. On-Site) and evaluation dimension ($X_1, X_2, X_3$). Is it meaningful to proceed to the test for coincident profiles when parallelism is strongly rejected? Explain briefly. `[3 marks]`

`[Total marks for G-ESS-011 = 20]`

---

## Topic 12: One-Way MANOVA & Multivariate Test Statistics

### G-ESS-012
A national retail chain tests $g = 3$ store layout designs (Layout A: Grid, Layout B: Free-Flow, Layout C: Boutique) across a total of $N$ stores. Two continuous performance responses are recorded for each store:
* $Y_1 =$ Average basket value (in thousands of LKR)
* $Y_2 =$ Average customer dwell time (in minutes)

The partially completed one-way MANOVA table is given below:

| Source of Variation | Matrix of Sum of Squares and Cross Products (SSCP) | Degrees of Freedom |
| :--- | :---: | :---: |
| **Treatment (Layout)** ($B$) | $\begin{bmatrix} 36 & 24 \\ 24 & 32 \end{bmatrix}$ | $?$ |
| **Residual (Error)** ($W$) | $\begin{bmatrix} ? & ? \\ ? & ? \end{bmatrix}$ | $57$ |
| **Total (Corrected)** ($B + W$) | $\begin{bmatrix} 136 & 44 \\ 44 & 112 \end{bmatrix}$ | $?$ |

**(a)** Determine the total number of stores $N$ in the experiment and complete the missing SSCP matrix $W$ and the degrees of freedom in the MANOVA table. `[4 marks]`

**(b)** State the null and alternative hypotheses ($H_0$ and $H_1$) for the one-way MANOVA in terms of the treatment effect vectors $\tau_1, \tau_2, \tau_3$ (or group mean vectors $\mu_1, \mu_2, \mu_3$). `[2 marks]`

**(c)** Compute the determinants $|W|$ and $|B + W|$, and calculate Wilks' Lambda $\Lambda^*$. `[3 marks]`

**(d)** For $p = 2$ responses and $g = 3$ groups, the exact $F$-transformation of Wilks' Lambda is given by:

$$
F = \left(\frac{N - g - 1}{g - 1}\right) \left(\frac{1 - \sqrt{\Lambda^*}}{\sqrt{\Lambda^*}}\right) \sim F_{2(g-1), \, 2(N-g-1)}
$$

Compute this exact $F$-statistic, specify its degrees of freedom, and test $H_0$ at the $\alpha = 0.01$ significance level. *(Given critical value: $F_{4, 112}(0.01) = 3.49$)*. `[4 marks]`

**(e)** Repeat the hypothesis test using Bartlett's large-sample Chi-Square approximation:

$$
\chi_{\text{calc}}^2 = -\left(N - 1 - \frac{p + g}{2}\right) \ln(\Lambda^*) \sim \chi_{p(g-1)}^2
$$

*(Given critical value: $\chi_4^2(0.01) = 13.28$)*. Compare the conclusions of the exact $F$-test and the large-sample test. `[3 marks]`

**(f)** Suppose a colleague suggests skipping MANOVA and simply running two separate one-way univariate ANOVAs on $Y_1$ and $Y_2$ at $\alpha = 0.05$ each. Explain two distinct statistical flaws with the colleague's approach. `[4 marks]`

`[Total marks for G-ESS-012 = 20]`

---

## Topic 13: Linear Discriminant Analysis (LDA) — Classification & Confusion Matrix

### G-ESS-013
A telecom provider uses Linear Discriminant Analysis (LDA) to classify corporate clients into three contract renewal groups: `Renew_Up` (upgrades plan), `Renew_Same` (renews existing plan), and `Churn` (cancels contract), using $p = 3$ standardized predictors:
* $Z_1 =$ Network uptime percentage
* $Z_2 =$ Monthly billing disputes
* $Z_3 =$ Account manager contact frequency

The model is trained on $n_{\text{train}} = 150$ corporate accounts and evaluated on an independent holdout test set of $n_{\text{test}} = 60$ accounts. The R output from the `MASS::lda()` function is shown below:

```
Call:
lda(Group ~ Z1 + Z2 + Z3, data = train_df)

Prior probabilities of groups:
  Renew_Up Renew_Same      Churn 
      0.30       0.50       0.20 

Group means:
              Z1    Z2    Z3
Renew_Up    0.85 -0.60  0.75
Renew_Same  0.10 -0.10  0.05
Churn      -1.50  1.15 -1.25

Coefficients of linear discriminants:
       LD1     LD2
Z1  0.7200 -0.3500
Z2 -0.6500 -0.8000
Z3  0.5800  0.4500

Proportion of trace:
   LD1    LD2 
0.9450 0.0550 

--- Confusion Matrix on Holdout Test Set (n_test = 60) ---
            Actual
Predicted    Renew_Up Renew_Same Churn
  Renew_Up         15          3     0
  Renew_Same        3         26     2
  Churn             0          1    10
```

**(a)** Explain why `lda()` extracts exactly two linear discriminant functions (`LD1` and `LD2`) in this problem, and interpret the `Proportion of trace` values ($0.9450$ and $0.0550$). `[3 marks]`

**(b)** Examine the group means and the coefficients of `LD1`. How do the three predictors $Z_1, Z_2,$ and $Z_3$ contribute to `LD1`, and which groups sit at the positive and negative extremes of the `LD1` axis? `[4 marks]`

**(c)** Compute the discriminant scores $(LD_1, LD_2)$ for each of the three group centroids (`Renew_Up`, `Renew_Same`, and `Churn`). A new corporate client has the standardized predictor profile $z_{\text{new}} = \begin{bmatrix} -1.0 & 1.0 & -1.0 \end{bmatrix}'$. Compute the client's discriminant coordinates $(LD_{1,\text{new}}, LD_{2,\text{new}})$ and determine which group centroid it is closest to along the dominant discriminant dimension `LD1`. `[5 marks]`

**(d)** Using the holdout test set confusion matrix:
* **(i)** Calculate the overall test classification accuracy and the overall test error rate (APER on test set). `[2 marks]`
* **(ii)** Calculate the class-specific sensitivity (recall) for the `Churn` group and explain why a telecom retention team cares more about false negatives in the `Churn` class than false positives. `[3 marks]`

**(e)** Suppose Box's M-test on the training data yields $p = 0.0004$, and the sample size is expanded to $n = 2,000$ accounts. Would you recommend retaining LDA or switching to Quadratic Discriminant Analysis (QDA)? Justify your recommendation by comparing the assumptions and decision boundary shapes of LDA and QDA. `[3 marks]`

`[Total marks for G-ESS-013 = 20]`

---

## Topic 14: Multivariate Multiple Linear Regression (MMLR)

### G-ESS-014
A retail banking analytics team fits a Multivariate Multiple Linear Regression (MMLR) model across $n = 50$ bank branches to study how four branch characteristics predict three financial performance outcomes simultaneously:
* **Responses:**
  * $Y_1 =$ Annual retail deposit growth ($\%$)
  * $Y_2 =$ Annual SME loan origination volume (LKR millions)
  * $Y_3 =$ Digital banking adoption rate ($\%$)
* **Predictors:**
  * $X_1 =$ Local commercial business density
  * $X_2 =$ Branch staff training hours per employee
  * $X_3 =$ Local digital marketing spend (LKR millions)
  * $X_4 =$ Distance to nearest competitor branch (km)

Two nested MMLR models are compared:
* **Model 1 (Full):** `cbind(Y1, Y2, Y3) ~ X1 + X2 + X3 + X4`
* **Model 2 (Reduced):** `cbind(Y1, Y2, Y3) ~ X1 + X2`

The partial R output is given below:

```
Response Y1 (Deposit Growth):
Coefficients:
            Estimate Std. Error t value Pr(>|t|)
(Intercept)   3.2000     1.1500   2.783  0.00785 **
X1            0.8500     0.2100   4.048  0.00020 ***
X2            0.4200     0.1500   2.800  0.00751 **
X3            0.1200     0.1800   0.667  0.50832
X4           -0.0800     0.1100  -0.727  0.47081
Residual standard error: 1.84 on 45 degrees of freedom
Multiple R-squared: 0.4820, Adjusted R-squared: 0.4359
F-statistic: 10.47 on 4 and 45 DF, p-value: 4.12e-06

Response Y2 (SME Loan Volume):
Coefficients:
            Estimate Std. Error t value Pr(>|t|)
(Intercept)  12.5000     3.4000   3.676  0.00063 ***
X1            2.4000     0.6200   3.871  0.00035 ***
X2            1.1000     0.4400   2.500  0.01612 *
X3            0.3500     0.5300   0.660  0.51236
X4            0.1500     0.3200   0.469  0.64148
Residual standard error: 5.42 on 45 degrees of freedom
Multiple R-squared: 0.4410, Adjusted R-squared: 0.3913
F-statistic: 8.875 on 4 and 45 DF, p-value: 2.15e-05

Response Y3 (Digital Adoption Rate):
Coefficients:
            Estimate Std. Error t value Pr(>|t|)
(Intercept)  28.0000     4.2000   6.667  3.1e-08 ***
X1            0.3000     0.7600   0.395  0.69489
X2            1.6500     0.5500   3.000  0.00439 **
X3            2.8000     0.6500   4.308  8.9e-05 ***
X4           -0.2000     0.4000  -0.500  0.61951
Residual standard error: 6.71 on 45 degrees of freedom
Multiple R-squared: 0.4650, Adjusted R-squared: 0.4174
F-statistic: 9.778 on 4 and 45 DF, p-value: 8.45e-06

--- Residual Correlation Matrix across (e1, e2, e3) in Model 1 ---
      e1     e2     e3
e1 1.000  0.684  0.215
e2 0.684  1.000  0.310
e3 0.215  0.310  1.000

--- Type II MANOVA Tests (Model 1): Wilks' Lambda ---
   Df test stat approx F num Df den Df   Pr(>F)
X1  1   0.64120   7.9942      3     43 0.000238 ***
X2  1   0.71540   5.7018      3     43 0.002215 **
X3  1   0.68210   6.6805      3     43 0.000834 ***
X4  1   0.97850   0.3149      3     43 0.814490

--- Multivariate Analysis of Variance Table (Model Comparison) ---
Model 1: cbind(Y1, Y2, Y3) ~ X1 + X2 + X3 + X4
Model 2: cbind(Y1, Y2, Y3) ~ X1 + X2
  Res.Df Df Gen.var.   Wilks approx F num Df den Df   Pr(>F)
1     45      184.25
2     47  2   238.90 0.66840   3.1842      6     86 0.007182 **
```

**(a)** Write down the general matrix form of the MMLR model $Y = X B + E$, clearly specifying the exact dimensions of the matrices $Y, X, B,$ and $E$ for Model 1 in this study. `[4 marks]`

**(b)** Examine the univariate regression summaries for $Y_1, Y_2,$ and $Y_3$ at the $\alpha = 0.05$ significance level. Which predictors are individually significant for each response? If an analyst looked *only* at the univariate regressions for $Y_1$ and $Y_2$, what mistaken conclusion might they reach regarding predictor $X_3$ (digital marketing spend)? `[4 marks]`

**(c)** Interpret the Type II MANOVA Wilks' Lambda tests for the four predictors at $\alpha = 0.05$. Based on these multivariate tests, which predictor(s) have no significant joint effect across the three branch outcomes? `[3 marks]`

**(d)** Conduct a formal hypothesis test comparing Model 2 (`X1 + X2`) against Model 1 (`X1 + X2 + X3 + X4`) at $\alpha = 0.01$:
* **(i)** State the null hypothesis $H_0$ in terms of the regression parameters $\beta_{jk}$. `[2 marks]`
* **(ii)** Report the test statistic, approximate $F$-value, degrees of freedom, and $p$-value from the output, and state your statistical conclusion. `[3 marks]`

**(e)** For a branch with predictor values $X_1 = 10, X_2 = 20, X_3 = 5,$ and $X_4 = 2$, compute the predicted vector of outcomes $\hat{Y} = \begin{bmatrix} \hat{Y}_1 & \hat{Y}_2 & \hat{Y}_3 \end{bmatrix}'$ under Model 1. Finally, referencing the residual correlation matrix ($r_{e_1, e_2} = 0.684$), explain why constructing a joint prediction ellipsoid using MMLR is superior to constructing three independent univariate prediction intervals. `[4 marks]`

`[Total marks for G-ESS-014 = 20]`

---

## Topic 15: Integrated Multivariate Method Selection & Analytical Design

### G-ESS-015
A conglomerate operating a chain of 180 supermarkets across Sri Lanka has compiled a comprehensive database containing four distinct blocks of variables for each store:

* **Block A (Store Environment — 15 continuous variables):** Census demographics, competitor counts, road traffic indices, commercial density, and household income quantiles within a 3 km radius (many of these 15 variables have pairwise correlations exceeding $0.85$).
* **Block B (Shopper Perception Survey — 12 Likert-scale items aggregated to continuous store averages):** Customer ratings on store ambiance, staff friendliness, checkout speed, produce freshness, promotional fairness, and loyalty rewards.
* **Block C (Store Format Classification — 1 categorical variable):** Store tier labeled as `Express`, `Standard`, or `Hypermarket`.
* **Block D (Financial Outcomes — 3 continuous variables):** Monthly grocery revenue ($Y_1$), monthly pharmacy revenue ($Y_2$), and monthly bakery revenue ($Y_3$).

The Chief Analytics Officer proposes four separate research investigations:

**(a) Investigation 1:** The marketing team believes the 12 shopper perception items in **Block B** are driven by a smaller number of unobservable psychological constructs (such as "Perceived Value" and "Service Warmth"). They want to identify these underlying constructs, estimate how much variance is unique error versus shared common variance, and obtain a clean loading structure where each survey item loads primarily on a single construct.
* Identify the most appropriate multivariate technique, justify why it is preferred over Principal Component Analysis (PCA) for this specific objective, and specify the extraction and rotation choices you would recommend. `[5 marks]`

**(b) Investigation 2:** The real-estate team wants to predict the single outcome $Y_1$ (monthly grocery revenue) using the 15 highly correlated demographic and traffic variables in **Block A**, without discarding any of the original 15 variables a priori, while eliminating variance inflation caused by severe multicollinearity.
* Identify the most appropriate multivariate regression methodology, explain step-by-step how it resolves multicollinearity, and describe how the optimal number of components should be chosen using cross-validation. `[5 marks]`

**(c) Investigation 3:** The operations director wants to test whether the three store formats in **Block C** (`Express`, `Standard`, `Hypermarket`) differ significantly in their mean financial outcome vectors $(Y_1, Y_2, Y_3)$ in **Block D**, and if so, to derive linear combinations of $(Y_1, Y_2, Y_3)$ that best separate and classify stores into the three formats.
* Identify the two complementary multivariate techniques required for hypothesis testing and classification, state their shared parametric assumptions, and specify the diagnostic tests used to verify those assumptions. `[5 marks]`

**(d) Investigation 4:** The executive board wants to model how the extracted latent perception scores from **Block B** and the orthogonal environmental components from **Block A** jointly predict all three revenue streams $(Y_1, Y_2, Y_3)$ in **Block D** simultaneously, while testing whether each predictor has a significant overall impact across the three revenue streams combined.
* Identify the appropriate multivariate modeling framework, explain how global predictor significance is tested across multiple dependent variables, and discuss how residual covariance among $(Y_1, Y_2, Y_3)$ is utilized in this framework. `[5 marks]`

`[Total marks for G-ESS-015 = 20]`