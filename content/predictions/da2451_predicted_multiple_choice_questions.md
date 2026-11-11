# AI-GENERATED PRACTICE PREDICTIONS – NOT OFFICIAL EXAM QUESTIONS

These questions are original AI-generated practice material based on the DA2451 syllabus, previous examination styles, and available practice worksheets. They are not copied from past examinations, are not provided or endorsed by the lecturer, and are not guaranteed to appear in any examination. Their purpose is to help students prepare for unfamiliar questions.

---

## Topic 1: Introduction to Multivariate Analysis, Sample Geometry & Matrix Algebra

### G-MCQ-001
In a sample of $n = 11$ retail stores, the deviation vectors for two financial metrics $X_1$ and $X_2$ have Euclidean lengths $L_{d_1} = 10$ and $L_{d_2} = 5$, respectively. If the sample covariance between $X_1$ and $X_2$ is $s_{12} = -3.0$, what is the angle $\theta$ between the two deviation vectors in the 11-dimensional observation space?
* A. $\arccos(-0.60)$
* B. $\arccos(-0.30)$
* C. $\arccos(-0.06)$
* D. $\arccos(0.60)$

### G-MCQ-002
Suppose a $3 \times 3$ sample correlation matrix $R$ for variables $X_1, X_2, X_3$ has correlations $r_{12} = 0.5$, $r_{13} = 0.5$, and $r_{23} = -0.5$. If the sample standard deviations are $s_1 = 2$, $s_2 = 3$, and $s_3 = 4$, what is the generalized sample variance $|S|$?
* A. $0$
* B. $12$
* C. $288$
* D. $576$

### G-MCQ-003
Consider two bivariate observations $x_1 = \begin{bmatrix} 4 \\ 2 \end{bmatrix}$ and $x_2 = \begin{bmatrix} 2 \\ 4 \end{bmatrix}$ drawn from a distribution with covariance matrix $S = \begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}$. How does the squared Mahalanobis distance $D_M^2(x_1, x_2)$ compare to the squared Euclidean distance $D_E^2(x_1, x_2)$?
* A. $D_M^2(x_1, x_2) = 4$ and $D_E^2(x_1, x_2) = 8$, because positive covariance reduces the effective distance along the direction $(1, -1)'$.
* B. $D_M^2(x_1, x_2) = 8$ and $D_E^2(x_1, x_2) = 8$, because the two variables have identical variances and symmetric coordinates.
* C. $D_M^2(x_1, x_2) = 8/3$ and $D_E^2(x_1, x_2) = 8$, because moving in opposite directions across positively correlated variables is statistically unusual.
* D. $D_M^2(x_1, x_2) = 4$ and $D_E^2(x_1, x_2) = 8$, because moving in opposite directions across positively correlated variables is penalized by the inverse covariance structure.

### G-MCQ-004
Let $A$ be a $3 \times 3$ symmetric covariance matrix with eigenvalues $\lambda_1 = 6$, $\lambda_2 = 3$, and $\lambda_3 = 1$, and corresponding normalized eigenvectors $e_1, e_2, e_3$. Based on the spectral decomposition of $A$, which expression represents the inverse matrix $A^{-1}$?
* A. $6 e_1 e_1' + 3 e_2 e_2' + 1 e_3 e_3'$
* B. $\frac{1}{6} e_1 e_1' + \frac{1}{3} e_2 e_2' + e_3 e_3'$
* C. $\frac{1}{36} e_1 e_1' + \frac{1}{9} e_2 e_2' + e_3 e_3'$
* D. $(e_1 + e_2 + e_3)\text{diag}\left(\frac{1}{6}, \frac{1}{3}, 1\right)(e_1 + e_2 + e_3)'$

### G-MCQ-005
An analyst records four continuous variables for $n = 50$ companies: $X_1 =$ Domestic Revenue, $X_2 =$ International Revenue, $X_3 =$ Operating Cost, and $X_4 =$ Net Revenue (defined exactly as $X_1 + X_2 - X_3$). Which of the following properties holds for the $4 \times 4$ sample covariance matrix $S$?
* A. The trace of $S$ equals zero, but the determinant $|S|$ remains strictly positive.
* B. At least one eigenvalue of $S$ is strictly negative due to the subtraction of $X_3$.
* C. The smallest eigenvalue of $S$ is exactly zero, and the Mahalanobis distance cannot be computed directly using $S^{-1}$.
* D. The correlation matrix $R$ will be invertible even though $S$ is singular.

### G-MCQ-006
Let $X_c$ be a $20 \times 4$ mean-centered data matrix whose Singular Value Decomposition (SVD) is $X_c = U D V'$, where the singular values on the diagonal of $D$ are $d_1 = 12, d_2 = 6, d_3 = 4,$ and $d_4 = 2$. What is the largest eigenvalue of the unbiased sample covariance matrix $S = \frac{1}{n-1} X_c' X_c$?
* A. $12 / 19$
* B. $144 / 20$
* C. $144 / 19$
* D. $12 / \sqrt{19}$

---

## Topic 2: Multivariate Normal Distribution & Normality Diagnostics

### G-MCQ-007
Let $X = (X_1, X_2)' \sim N_2(\mu, \Sigma)$ where $\Sigma = \begin{bmatrix} 4 & \rho \sigma_1 \sigma_2 \\ \rho \sigma_1 \sigma_2 & 9 \end{bmatrix}$. For what value of the correlation coefficient $\rho$ are the linear combinations $Y_1 = 3X_1 + 2X_2$ and $Y_2 = 3X_1 - 2X_2$ statistically independent?
* A. $\rho = 0$ only
* B. $\rho = 0.5$
* C. $\rho = -0.5$
* D. All values of $\rho \in (-1, 1)$

### G-MCQ-008
Suppose $X = (X_1, X_2, X_3)' \sim N_3\left(\begin{bmatrix} 10 \\ 20 \\ 30 \end{bmatrix}, \begin{bmatrix} 4 & 2 & 0 \\ 2 & 5 & 2 \\ 0 & 2 & 4 \end{bmatrix}\right)$. If we observe $X_1 = 12$ and $X_3 = 26$, what is the conditional distribution of $X_2$ given $X_1 = 12$ and $X_3 = 26$?
* A. $N(19, 3)$
* B. $N(19, 4)$
* C. $N(21, 3)$
* D. $N(20, 5)$

### G-MCQ-009
Consider a bivariate normal distribution $N_2(\mu, \Sigma)$ where $\sigma_{11} = 9$, $\sigma_{22} = 9$, and $\sigma_{12} = -4.5$. Which statement accurately characterizes the constant probability density contour $(x - \mu)' \Sigma^{-1} (x - \mu) = c^2$?
* A. It is an ellipse whose major axis lies along the line $x_2 - \mu_2 = -(x_1 - \mu_1)$.
* B. It is an ellipse whose major axis lies along the line $x_2 - \mu_2 = (x_1 - \mu_1)$.
* C. It is a circle of radius $3c$ centered at $(\mu_1, \mu_2)$ because $\sigma_{11} = \sigma_{22}$.
* D. It is an ellipse whose semi-major axis length is $c\sqrt{4.5}$ and semi-minor axis length is $c\sqrt{13.5}$.

### G-MCQ-010
A business analyst tests whether each of three financial ratios $X_1, X_2, X_3$ follows a univariate normal distribution using Shapiro-Wilk tests and finds $p > 0.40$ for all three variables. However, Mardia's multivariate skewness test yields $p = 0.002$. Which conclusion is statistically valid?
* A. The Mardia test result must be a computational error because marginal normality of all components guarantees joint multivariate normality.
* B. The data are marginally normal, but the joint dependence structure violates multivariate normality.
* C. Only multivariate kurtosis can violate multivariate normality when all marginal distributions are normal.
* D. Box-Cox power transformations applied separately to each variable will guarantee joint normality without altering the correlation structure.

### G-MCQ-011
To assess multivariate normality of a sample of $n = 60$ observations on $p = 5$ variables, an analyst plots the ordered squared Mahalanobis distances $d_{(1)}^2 \le d_{(2)}^2 \le \dots \le d_{(60)}^2$ against theoretical quantiles. Which theoretical distribution should be used to generate the horizontal axis quantiles of this Q-Q plot?
* A. Standard normal distribution $N(0, 1)$
* B. Chi-square distribution with $5$ degrees of freedom, $\chi_5^2$
* C. Chi-square distribution with $59$ degrees of freedom, $\chi_{59}^2$
* D. Hotelling's $T^2$ distribution with $5$ and $55$ degrees of freedom

### G-MCQ-012
A strictly positive variable $X_1$ exhibits severe right-skewness. When estimating the Box-Cox power parameter $\lambda$ via maximum likelihood, the profile log-likelihood peaks at $\hat{\lambda} = 0.02$, with a 95% confidence interval of $(-0.15, 0.19)$. Which transformation is most appropriate in practice?
* A. Keep $X_1$ untransformed since $0.02$ is negligible.
* B. Apply the square-root transformation $\sqrt{X_1}$.
* C. Apply the natural logarithm transformation $\ln(X_1)$.
* D. Apply the reciprocal transformation $1 / X_1$.

---

## Topic 3: Principal Component Analysis (PCA)

### G-MCQ-013
An analyst performs PCA using the sample covariance matrix $S$ on three variables: $X_1$ (annual income in LKR, variance $\approx 10^{10}$), $X_2$ (years of experience, variance $\approx 25$), and $X_3$ (credit score, variance $\approx 2500$). Without performing any matrix algebra, what will be the approximate loading vector $e_1$ for the first principal component?
* A. $\begin{bmatrix} 0.577 & 0.577 & 0.577 \end{bmatrix}'$
* B. $\begin{bmatrix} 1.000 & 0.000 & 0.000 \end{bmatrix}'$
* C. $\begin{bmatrix} 0.000 & 1.000 & 0.000 \end{bmatrix}'$
* D. $\begin{bmatrix} 0.333 & 0.333 & 0.333 \end{bmatrix}'$

### G-MCQ-014
In a PCA conducted on a $4 \times 4$ correlation matrix $R$, the second eigenvalue is $\lambda_2 = 1.44$ and the corresponding normalized eigenvector is $e_2 = \begin{bmatrix} 0.50 & -0.50 & 0.50 & -0.50 \end{bmatrix}'$. What is the correlation between the third standardized variable $Z_3$ and the second principal component $PC_2$?
* A. $0.36$
* B. $0.50$
* C. $0.60$
* D. $0.72$

### G-MCQ-015
A PCA is performed on $p = 6$ standardized variables. The eigenvalues of the correlation matrix are $\lambda_1 = 2.85, \lambda_2 = 1.35, \lambda_3 = 0.92, \lambda_4 = 0.48, \lambda_5 = 0.25,$ and $\lambda_6 = 0.15$. If an analyst compares Kaiser's criterion ($\lambda > 1$) against a cumulative variance threshold of at least $80\%$, how many components are retained under each rule?
* A. Kaiser's rule retains 2 components; the $80\%$ threshold retains 2 components.
* B. Kaiser's rule retains 2 components; the $80\%$ threshold retains 3 components.
* C. Kaiser's rule retains 3 components; the $80\%$ threshold retains 3 components.
* D. Kaiser's rule retains 3 components; the $80\%$ threshold retains 4 components.

### G-MCQ-016
In an R session, a data scientist executes `pca_out <- prcomp(df, center = TRUE, scale. = TRUE)`. Where are the observation coordinates (principal component scores) and the variable eigenvectors stored within the `pca_out` object?
* A. Scores are in `pca_out$scores` and eigenvectors are in `pca_out$loadings`.
* B. Scores are in `pca_out$x` and eigenvectors are in `pca_out$rotation`.
* C. Scores are in `pca_out$rotation` and eigenvectors are in `pca_out$x`.
* D. Scores are in `pca_out$sdev` and eigenvectors are in `pca_out$center`.

### G-MCQ-017
In a PCA biplot of the first two principal components, the loading vector for variable $X_1$ points along the positive horizontal axis ($0^\circ$), the vector for $X_2$ points at $175^\circ$, and the vector for $X_3$ points along the positive vertical axis ($90^\circ$). Assuming the first two PCs account for $92\%$ of total variance, what does this configuration imply about the sample correlations?
* A. $X_1$ and $X_2$ are strongly positively correlated, while $X_3$ is negatively correlated with both.
* B. $X_1$ and $X_2$ are strongly negatively correlated, and $X_3$ is nearly uncorrelated with both $X_1$ and $X_2$.
* C. $X_1$ and $X_3$ have a correlation near $1.0$, while $X_2$ is an outlier observation.
* D. All three variables are mutually orthogonal because principal components are uncorrelated.

---

## Topic 4: Principal Components Regression (PCR) & Regression Diagnostics

### G-MCQ-018
An economist fits an ordinary least squares (OLS) regression using 5 standardized predictors. Later, she performs Principal Component Analysis on those 5 predictors and fits a Principal Components Regression (PCR) model retaining all 5 principal components. How do the predicted response values $\hat{Y}_{\text{PCR}(5)}$ compare to $\hat{Y}_{\text{OLS}}$?
* A. $\hat{Y}_{\text{PCR}(5)}$ has smaller variance and zero bias compared to $\hat{Y}_{\text{OLS}}$.
* B. $\hat{Y}_{\text{PCR}(5)}$ is mathematically identical to $\hat{Y}_{\text{OLS}}$ for every observation.
* C. $\hat{Y}_{\text{PCR}(5)}$ yields a higher $R^2$ because the principal components are orthogonal.
* D. $\hat{Y}_{\text{PCR}(5)}$ eliminates multicollinearity without changing the standard errors of the original $\beta$ coefficients.

### G-MCQ-019
Suppose three standardized predictors $Z_1, Z_2, Z_3$ yield two retained principal components:
$PC_1 = 0.6 Z_1 + 0.6 Z_2 + 0.529 Z_3$ and $PC_2 = 0.7 Z_1 - 0.7 Z_2 + 0.141 Z_3$.
A PCR model fitted on $PC_1$ and $PC_2$ estimates $\hat{Y} = 10 + 2.0 PC_1 - 1.0 PC_2$. What is the implied regression coefficient $\hat{\beta}_1$ for the standardized predictor $Z_1$?
* A. $0.50$
* B. $1.20$
* C. $1.90$
* D. $-0.70$

### G-MCQ-020
Why can discarding the last principal component $PC_p$ (associated with the smallest eigenvalue $\lambda_p \approx 0.001$) occasionally worsen the predictive accuracy of a PCR model?
* A. Because $PC_p$ always accounts for the largest share of variance in the predictor matrix $X$.
* B. Because PCA is an unsupervised technique, and the response variable $Y$ might be strongly correlated with the low-variance direction $PC_p$.
* C. Because dropping $PC_p$ destroys the orthogonality of the remaining $p-1$ principal components.
* D. Because the residual sum of squares in PCR is inversely proportional to $\lambda_p$.

### G-MCQ-021
When evaluating a PCR model using a training set ($n_{\text{train}} = 100$) and a test set ($n_{\text{test}} = 30$), which procedure correctly avoids data leakage during preprocessing and projection?
* A. Standardize the combined dataset of 130 observations, run `prcomp()` on all 130 rows, and then split the scores into train and test sets.
* B. Run `prcomp()` separately on the training set and the test set so each set has its own optimal eigenvectors.
* C. Compute the sample means, standard deviations, and eigenvectors strictly from the training set, and apply those exact parameters to center, scale, and project the test set.
* D. Select the number of components $k$ by minimizing the test set RMSE, and then report that same test set RMSE as an unbiased estimate of generalization error.

### G-MCQ-022
In regression diagnostics, an observation has a standardized residual of $e_i^* = -0.15$, a leverage value of $h_{ii} = 0.78$ (where the average leverage is $p/n = 0.05$), and a Cook's distance of $D_i = 0.02$. How should this observation be characterized?
* A. It is a vertical outlier that severely distorts the fitted regression slope.
* B. It is a high-leverage point in the predictor space that lies very close to the fitted regression hyperplane, so it is not currently influential.
* C. It is a highly influential observation that must be removed immediately because $h_{ii} > 0.50$.
* D. It indicates severe heteroscedasticity in the error variance.

### G-MCQ-023
A diagnostic plot of studentized residuals versus fitted values $\hat{y}_i$ reveals a distinct megaphone shape (residual spread widens substantially as $\hat{y}_i$ increases). Which regression assumption is primarily violated, and what is a standard remedial measure?
* A. Linearity is violated; add orthogonal polynomial terms of the predictors.
* B. Independence of errors is violated; switch to Principal Components Regression.
* C. Homoscedasticity (constant error variance) is violated; apply a variance-stabilizing transformation such as $\ln(Y)$ or $\sqrt{Y}$ to the response.
* D. Multicollinearity is present; remove predictors with high Variance Inflation Factors (VIF).

---

## Topic 5: Exploratory & Confirmatory Factor Analysis (FA)

### G-MCQ-024
In an Exploratory Factor Analysis (EFA) of 6 standardized variables with $m = 2$ orthogonal common factors, the rotated loadings for variable $X_4$ are $\hat{l}_{41} = 0.70$ and $\hat{l}_{42} = -0.50$. What are the communality ($h_4^2$) and specific variance ($\hat{\psi}_4$) for $X_4$?
* A. $h_4^2 = 0.20$ and $\hat{\psi}_4 = 0.80$
* B. $h_4^2 = 0.74$ and $\hat{\psi}_4 = 0.26$
* C. $h_4^2 = 1.20$ and $\hat{\psi}_4 = -0.20$
* D. $h_4^2 = 0.49$ and $\hat{\psi}_4 = 0.51$

### G-MCQ-025
According to the orthogonal factor model $X - \mu = L F + \epsilon$, if the factor loading matrix for 3 variables on 1 common factor is $L = \begin{bmatrix} 0.8 \\ 0.6 \\ 0.5 \end{bmatrix}$ and the specific variances are $\Psi = \text{diag}(0.36, 0.64, 0.75)$, what is the model-reproduced correlation between $X_1$ and $X_2$?
* A. $0.2304$
* B. $0.4800$
* C. $0.7000$
* D. $1.0000$

### G-MCQ-026
When applying an orthogonal Varimax rotation to an initial $m$-factor solution in EFA, which of the following quantities remains strictly unchanged before and after rotation?
* A. The individual factor loadings $\hat{l}_{ij}$ for each variable on each factor.
* B. The proportion of variance explained by the first factor ($SS_{\text{loadings}}$ of Factor 1).
* C. The communality $h_i^2$ of each variable and the total variance explained by all $m$ factors combined.
* D. The correlations among the common factors, which change from zero to non-zero values.

### G-MCQ-027
Before conducting an EFA on a 12-item consumer survey, a researcher computes Bartlett's test of sphericity ($\chi^2 = 845.2, df = 66, p < 0.0001$) and a Kaiser-Meyer-Olkin (KMO) measure of sampling adequacy of $0.86$. What do these diagnostics indicate?
* A. The correlation matrix is an identity matrix, so factor analysis is inappropriate.
* B. The variables follow a multivariate normal distribution with homogeneous variances.
* C. Exactly two latent factors should be extracted from the 12 survey items.
* D. The population correlation matrix differs significantly from an identity matrix and partial correlations are small enough that the data are well-suited for factor analysis.

### G-MCQ-028
In a psychometric study of workplace satisfaction, an analyst suspects that the latent constructs "Intrinsic Motivation" and "Job Involvement" are substantially correlated with one another. Which rotation method is theoretically most appropriate in EFA?
* A. Varimax rotation
* B. Quartimax rotation
* C. Promax (oblique) rotation
* D. No rotation, because correlated factors cannot be estimated in EFA

---

## Topic 6: Inference on Multivariate Data (Hotelling's $T^2$, MANOVA, Profile Analysis)

### G-MCQ-029
A random sample of size $n = 25$ is drawn from a $p = 4$ dimensional normal population $N_4(\mu, \Sigma)$. To test $H_0: \mu = \mu_0$, the sample Hotelling's $T^2$ statistic is calculated as $T^2 = 16.0$. What is the exact transformed $F$-statistic and its degrees of freedom under $H_0$?
* A. $F = 4.00$ with $df_1 = 4$ and $df_2 = 21$
* B. $F = 3.50$ with $df_1 = 4$ and $df_2 = 21$
* C. $F = 3.50$ with $df_1 = 4$ and $df_2 = 24$
* D. $F = 3.84$ with $df_1 = 3$ and $df_2 = 22$

### G-MCQ-030
A pharmaceutical trial measures $p = 3$ blood biomarkers on the same $n = 20$ patients before and after administering a drug. To test whether the mean biomarker profile changed, $d_i = X_{i,\text{after}} - X_{i,\text{before}}$ is computed for each patient. What is the dimensionality of the Hotelling's $T^2$ test and the degrees of freedom of its exact $F$ distribution?
* A. Dimensionality $6$; $F_{6, 14}$
* B. Dimensionality $3$; $F_{3, 36}$
* C. Dimensionality $3$; $F_{3, 17}$
* D. Dimensionality $2$; $F_{2, 18}$

### G-MCQ-031
In a one-way MANOVA comparing $g = 3$ marketing strategies across $p = 2$ continuous sales metrics with $N = 60$ total retail outlets, the within-group SSCP matrix is $W = \begin{bmatrix} 100 & 0 \\ 0 & 25 \end{bmatrix}$ and the between-group SSCP matrix is $B = \begin{bmatrix} 25 & 0 \\ 0 & 25 \end{bmatrix}$. What is the value of Wilks' Lambda ($\Lambda^*$)?
* A. $0.40$
* B. $0.50$
* C. $0.60$
* D. $0.80$

### G-MCQ-032
In a profile analysis of $p = 4$ sequential training modules comparing two employee groups ($n_1 = 35, n_2 = 40$), the test for parallel profiles transforms each observation vector $X_{ij}$ using a contrast matrix $C$. What are the dimensions of $C$, and what null hypothesis is tested?
* A. $C$ is $4 \times 4$; $H_0: \mu_1 = \mu_2$
* B. $C$ is $3 \times 4$; $H_0: C\mu_1 = C\mu_2$
* C. $C$ is $1 \times 4$; $H_0: 1'\mu_1 = 1'\mu_2$
* D. $C$ is $3 \times 4$; $H_0: C(\mu_1 + \mu_2) = 0$

---

## Topic 7: Linear Discriminant Analysis (LDA) & Classification

### G-MCQ-033
A credit analyst uses Linear Discriminant Analysis (LDA) to classify loan applicants into $g = 4$ risk tiers based on $p = 3$ financial ratios. However, collinearity diagnostics reveal that one financial ratio is an exact linear combination of the other two. What is the maximum number of effective linear discriminant functions that can be extracted?
* A. $1$
* B. $2$
* C. $3$
* D. $4$

### G-MCQ-034
In a two-group LDA with a single standardized predictor $x$ having pooled variance $s_p^2 = 1$, Group 1 has sample mean $\bar{x}_1 = -1$ and Group 2 has sample mean $\bar{x}_2 = +1$. If the prior probabilities are $\pi_1 = 0.80$ and $\pi_2 = 0.20$ (with equal misclassification costs), how does the Bayes decision boundary shift relative to the midpoint $x = 0$?
* A. It remains at $x = 0$ because LDA decision boundaries depend only on group centroids and pooled covariance.
* B. It shifts toward positive values ($x = \frac{1}{2}\ln(4) \approx 0.693$), expanding the classification region for Group 1.
* C. It shifts toward negative values ($x = -\frac{1}{2}\ln(4) \approx -0.693$), expanding the classification region for Group 2.
* D. It becomes a quadratic boundary with two cutoffs.

### G-MCQ-035
An LDA output for $g = 3$ groups reports `Proportion of trace: LD1 = 0.912, LD2 = 0.088`. What does the value $0.912$ represent?
* A. $91.2\%$ of the observations in the training dataset were correctly classified by `LD1`.
* B. `LD1` explains $91.2\%$ of the total within-group variance across all predictors.
* C. The first eigenvalue of $W^{-1}B$ accounts for $91.2\%$ of the sum of all eigenvalues of $W^{-1}B$ (total between-group separation relative to within-group variance).
* D. The prior probability of belonging to the first two groups combined is $0.912$.

### G-MCQ-036
Why does evaluating a Linear Discriminant Analysis model using the confusion matrix of the training data (the apparent error rate) typically yield an overly optimistic assessment of classification performance?
* A. Because `lda()` automatically removes multivariate outliers from the training confusion matrix.
* B. Because the discriminant coefficients are estimated to maximize separation on the same sample being classified, capitalizing on sample-specific noise.
* C. Because training sets always have equal prior probabilities, whereas test sets have unequal priors.
* D. Because Box's M test is only valid on holdout test datasets.

---

## Topic 8: Multivariate Multiple Linear Regression (MMLR) & Method Selection

### G-MCQ-037
In a Multivariate Multiple Linear Regression (MMLR) model $Y = X B + E$ with $n = 50$ observations, $q = 3$ response variables, and $p = 4$ predictors (plus an intercept), the OLS estimator is $\hat{B} = (X'X)^{-1}X'Y$. How does the first column of $\hat{B}$ compare to the coefficient vector obtained by fitting a separate univariate multiple regression of $Y_1$ on $X$?
* A. They are numerically identical, because the OLS point estimator for each response depends only on $X$ and that specific response column $Y_k$.
* B. They differ whenever the error covariance matrix $\Sigma_{\epsilon}$ has non-zero off-diagonal elements.
* C. The MMLR coefficients are shrunk toward zero by a factor proportional to Wilks' Lambda.
* D. They are identical only if the predictors in $X$ are mutually orthogonal.

### G-MCQ-038
An MMLR model relates $q = 2$ dependent variables ($Y_1, Y_2$) to $p = 4$ predictors ($X_1, X_2, X_3, X_4$) using $n = 45$ observations. To test whether $X_3$ and $X_4$ can be dropped simultaneously from the model for both responses ($H_0: \beta_{31} = \beta_{32} = \beta_{41} = \beta_{42} = 0$), which procedure is appropriate?
* A. Perform two separate partial $F$-tests (one for $Y_1$ and one for $Y_2$) at $\alpha = 0.05$ and reject $H_0$ if either test is significant.
* B. Compare the $2 \times 2$ error SSCP matrix $E_{\text{full}}$ (with 4 predictors) against $E_{\text{reduced}}$ (with 2 predictors) using Wilks' Lambda $\Lambda = |E_{\text{full}}| / |E_{\text{reduced}}|$.
* C. Compute the sum of the adjusted $R^2$ values for $Y_1$ and $Y_2$ and check whether it decreases.
* D. Apply Box's M test to compare the covariance matrix of $(Y_1, Y_2)$ against the covariance matrix of $(X_3, X_4)$.

### G-MCQ-039
A retail banking analytics team collects data on 8 continuous usage habits for 5,000 credit card holders who are already labeled into three profitability tiers ("Platinum", "Gold", "Standard"). Their goal is to derive linear combinations of the 8 usage habits that maximally separate the three known tiers and to visualize the group centroids in a 2D reduced space. Which multivariate technique directly achieves this objective?
* A. Principal Component Analysis (PCA)
* B. Exploratory Factor Analysis (EFA)
* C. Linear Discriminant Analysis (LDA)
* D. Multivariate Multiple Linear Regression (MMLR)

### G-MCQ-040
An organizational psychologist develops a 24-item questionnaire based on a well-established leadership theory that posits exactly three dimensions: "Transformational", "Transactional", and "Laissez-Faire" (8 specific items assigned to each dimension a priori). She collects responses from 400 managers to test whether this restricted 3-factor measurement model fits the empirical covariance matrix. Which technique should she use?
* A. Principal Component Analysis (PCA) with Varimax rotation
* B. Exploratory Factor Analysis (EFA) using Maximum Likelihood extraction
* C. Confirmatory Factor Analysis (CFA)
* D. One-way Multivariate Analysis of Variance (MANOVA)