> **AI-GENERATED PRACTICE PREDICTIONS – NOT OFFICIAL EXAM QUESTIONS**
>
> These questions are original AI-generated practice material based on the DA2451 syllabus, previous examination styles, and available practice worksheets. They are not copied from past examinations, are not provided or endorsed by the lecturer, and are not guaranteed to appear in any examination. Their purpose is to help students prepare for unfamiliar questions.

# DA2451 – Original Predicted Examination MCQs
**Course:** DA2451 – Multivariate Methods in Business  
**Part A:** 40 original multiple-choice questions  
**Instructions:** Choose the single best answer for each question. Unless otherwise specified, matrices have real entries and sample standard deviations are positive.

## Topic 1 – Multivariate Data, Measurement and Study Design

### C-MCQ-001
A retailer codes a customer's preferred payment method as 1 = cash, 2 = debit card, and 3 = mobile wallet. An analyst proposes treating the average code as the “average payment preference.” What is the most defensible objection?

- **A.** A mean cannot be calculated when a sample has fewer than four categories.
- **B.** The codes imply a ratio scale because every category has a positive number.
- **C.** Numerical gaps between these nominal categories have no defined quantitative meaning.
- **D.** A nominal variable must have exactly two categories to enter an analysis.

### C-MCQ-002
A dataset contains 120 customer records. Four continuous indicators are selected, with one row per customer and one column per indicator. If $X$ is the selected data matrix, what are the dimensions of $X^{\mathsf T}X$?

- **A.** $4\times4$
- **B.** $120\times120$
- **C.** $120\times4$
- **D.** $4\times120$

### C-MCQ-003
A lender has historical applicants' financial indicators and a verified default/non-default outcome for each applicant. The aim is to learn a rule for assigning future applicants to these two known categories. How should this task be characterized?

- **A.** Unsupervised dimension reduction without any response variable.
- **B.** Supervised classification using previously observed class labels.
- **C.** Unsupervised clustering to discover an unknown number of groups.
- **D.** Confirmatory factor analysis of latent financial constructs.

### C-MCQ-004
For $n$ complete observations on $p$ numerical variables, let $X$ be the $n\times p$ data matrix and $\mathbf 1_n$ the $n\times1$ vector of ones. Which expression produces the $1\times p$ vector of sample means?

- **A.** $X\mathbf 1_n/n$
- **B.** $XX^{\mathsf T}/n$
- **C.** $\mathbf 1_nX^{\mathsf T}/p$
- **D.** $\mathbf 1_n^{\mathsf T}X/n$

## Topic 2 – Matrix Algebra and Sample Geometry

### C-MCQ-005
A manager represents a standardized change in three business indicators by $u=(2,-1,2)^{\mathsf T}$. Which vector is orthogonal to $u$?

- **A.** $(1,1,1)^{\mathsf T}$
- **B.** $(1,2,0)^{\mathsf T}$
- **C.** $(0,1,1)^{\mathsf T}$
- **D.** $(2,0,1)^{\mathsf T}$

### C-MCQ-006
Let $u=(3,4)^{\mathsf T}$ and let $v=(-4,3)^{\mathsf T}$. What is the cosine of the angle between $u$ and $v$?

- **A.** $0$
- **B.** $-1$
- **C.** $1/2$
- **D.** $1$

### C-MCQ-007
An analyst reports that the eigenvalues of a real sample covariance matrix are $5.2$, $1.7$, and $-0.3$. Which assessment is justified?

- **A.** Negative eigenvalues are expected whenever two variables are negatively correlated.
- **B.** The eigenvalues can be correct if the sample means were not centered at zero.
- **C.** Any symmetric matrix with real eigenvalues is a valid covariance matrix.
- **D.** The reported matrix cannot be an exact sample covariance matrix because it is not positive semidefinite.

### C-MCQ-008
The columns of a $7\times11$ data matrix are centered by subtracting their respective sample means. What is the largest possible rank of the resulting matrix?

- **A.** $11$
- **B.** $7$
- **C.** $6$
- **D.** $4$

### C-MCQ-009
For a centered data matrix $X$, the singular value decomposition is $X=UDV^{\mathsf T}$. In the usual PCA connection, which objects give directions in the original variable space?

- **A.** The columns of $V$.
- **B.** The diagonal entries of $D$ alone.
- **C.** The rows of $U$.
- **D.** The eigenvectors of $XX^{\mathsf T}$ without transformation.

## Topic 3 – Principal Component Analysis

### C-MCQ-010
The first PCA direction fitted to two variables is $e_1=(3/5,4/5)^{\mathsf T}$ and the training mean is $\bar x=(10,20)^{\mathsf T}$. What is the first component score for an observation $x=(15,25)^{\mathsf T}$?

- **A.** $5$
- **B.** $25$
- **C.** $10$
- **D.** $7$

### C-MCQ-011
A standardized observation is $z=(2,0)^{\mathsf T}$. Only the first PCA direction $e_1=(1/\sqrt2,1/\sqrt2)^{\mathsf T}$ is retained. What is the reconstruction of $z$ by orthogonal projection onto this direction?

- **A.** $(2,2)^{\mathsf T}$
- **B.** $(1,1)^{\mathsf T}$
- **C.** $(\sqrt2,0)^{\mathsf T}$
- **D.** $(0,2)^{\mathsf T}$

### C-MCQ-012
Two analysts compute the same leading principal component but report loading vectors $e$ and $-e$. Which conclusion is valid?

- **A.** Their components necessarily explain different proportions of variance.
- **B.** Only the component with positive loadings is mathematically admissible.
- **C.** The direction represents the same PCA axis, with the signs of its scores reversed.
- **D.** One analyst has inadvertently changed the sample covariance matrix.

### C-MCQ-013
A PCA model is fitted on a training dataset after standardizing each variable. New observations will be scored next month. Which preprocessing procedure is appropriate?

- **A.** Standardize next month's data separately using its own monthly means and standard deviations.
- **B.** Use the original training means, standard deviations, and PCA directions for the new observations.
- **C.** Fit new PCA directions on the combined training and future observations before scoring.
- **D.** Use training standard deviations but subtract zero instead of the training means.

## Topic 4 – Principal Components Regression

### C-MCQ-014
A prediction target is strongly related to a low-variance direction of the predictors. A PCR model retains only components that explain the most predictor variance. Which risk is most relevant?

- **A.** PCR may discard a direction that has important predictive information despite its small predictor variance.
- **B.** Every retained component becomes correlated with all remaining retained components.
- **C.** The response variable is automatically included in PCA when PCR is used.
- **D.** PCR necessarily estimates more coefficients than ordinary multiple regression.

### C-MCQ-015
Suppose $p$ predictors are linearly independent after centering. Ordinary least squares with an intercept is compared with PCR using **all** $p$ principal components of those predictors and an intercept, on the same training observations. What holds for their fitted values?

- **A.** PCR must have smaller training residuals because its regressors are orthogonal.
- **B.** Ordinary least squares must have smaller training residuals because PCA removes information.
- **C.** The fitted values agree only if the predictor variables have equal variances.
- **D.** They are identical because the two predictor sets span the same column space.

## Topic 5 – Regression Diagnostics

### C-MCQ-016
A regression observation has a predictor combination far from the other observations but a relatively small residual. Which description is most appropriate?

- **A.** It must have a large standardized residual.
- **B.** It is necessarily influential on every regression coefficient.
- **C.** It may have high leverage without being a large residual outlier.
- **D.** It proves the regression error variance is not constant.

### C-MCQ-017
A residual-versus-fitted plot shows residuals centered around zero, but their vertical spread steadily increases with the fitted value. Which modeling concern is most directly indicated?

- **A.** Nonconstant error variance.
- **B.** Exact linear dependence among predictors.
- **C.** Systematic missingness of the response variable.
- **D.** A known nonlinear shift in the conditional mean.

### C-MCQ-018
In a regression model with an intercept, a normal Q-Q plot of the **residuals** shows a marked departure in both tails. Which interpretation is best?

- **A.** All predictor variables must have nonnormal marginal distributions.
- **B.** The least-squares fitted coefficients must therefore be zero.
- **C.** The response and predictors are proven independent.
- **D.** The usual normal-error assumption is questionable, even though a linear mean relationship could still be useful.

## Topic 6 – Factor Analysis

### C-MCQ-019
Consider a standardized, one-factor model with uncorrelated specific errors, where two variables have factor loadings $0.6$ and $0.8$. What correlation does this model imply between the variables?

- **A.** $0.20$
- **B.** $0.48$
- **C.** $0.70$
- **D.** $1.40$

### C-MCQ-020
A standardized variable has estimated communality $0.72$ in a common-factor model. What is its estimated uniqueness under the standard factor model decomposition?

- **A.** $0.72$
- **B.** $1.72$
- **C.** $0.28$
- **D.** $0.52$

### C-MCQ-021
A two-factor EFA solution is rotated using an orthogonal rotation matrix. Which feature is preserved for each observed variable (apart from rounding)?

- **A.** Its communality, computed as the sum of squared loadings across the two factors.
- **B.** Every individual factor loading before and after rotation.
- **C.** The factor's substantive interpretation in all possible datasets.
- **D.** The proportion of variance attributed to each named factor individually.

### C-MCQ-022
A researcher believes two latent constructs, employee engagement and organizational trust, are correlated. Which factor-rotation choice is most consistent with allowing that relationship?

- **A.** No rotation, because rotation would force the observed variables to be independent.
- **B.** Any orthogonal rotation, because it estimates nonzero factor correlations.
- **C.** Replacing the factor model with Euclidean distances alone.
- **D.** An oblique rotation that permits correlations between factors.

## Topic 7 – Linear Discriminant Analysis

### C-MCQ-023
Two groups have normal predictor distributions with common variance $1$, means $\mu_1=0$ and $\mu_2=2$, and equal prior probabilities and misclassification costs. Which group is assigned to a new observation with predictor value $x=1.3$ by the LDA rule?

- **A.** Group 1, because its mean is smaller.
- **B.** Group 2, because $x$ lies on its side of the equal-prior decision boundary.
- **C.** Both groups, because LDA cannot classify from a single predictor.
- **D.** Neither group, because $x$ is not equal to a group mean.

### C-MCQ-024
A test set contains 10 genuinely fraudulent and 90 genuinely legitimate transactions. A classifier detects 9 fraudulent transactions but incorrectly flags 30 legitimate transactions as fraudulent. What is its **sensitivity for fraud**?

- **A.** $0.69$
- **B.** $0.75$
- **C.** $0.90$
- **D.** $0.91$

### C-MCQ-025
In a two-group LDA model with unequal class frequencies, a company raises the prior probability of Group 1 while keeping the estimated group means, common covariance matrix, and misclassification costs fixed. What is the effect on the classification rule?

- **A.** The decision boundary shifts to favor Group 1 for some observations near the old boundary.
- **B.** The within-group covariance matrix must become diagonal.
- **C.** The two group means necessarily move closer together.
- **D.** The number of available discriminant functions increases to two.

### C-MCQ-026
A firm reports LDA test-set accuracy after using the entire dataset, including the test cases, to select predictors and tune a classification threshold. What is the key problem with this reported accuracy?

- **A.** LDA accuracy can only be reported on training data.
- **B.** The group priors must always be exactly equal.
- **C.** Selecting predictors has no effect on the fairness of test accuracy.
- **D.** Information from the test set has influenced model development, compromising the independence of the evaluation.

## Topic 8 – Multivariate Normality and Diagnostics

### C-MCQ-027
Two continuous variables are each individually normally distributed, and their sample correlation is close to zero. Which inference is justified from these facts alone?

- **A.** Their joint distribution is necessarily bivariate normal.
- **B.** They are necessarily independent in the population.
- **C.** Marginal normality and near-zero correlation do not by themselves establish joint normality or independence.
- **D.** Their Mahalanobis distances must follow an exact chi-square distribution based on the sample covariance matrix.

### C-MCQ-028
Let $(X_1,X_2)^{\mathsf T}$ be bivariate normal with $E(X_1)=E(X_2)=0$ and covariance matrix

$$
\Sigma=\begin{bmatrix}1&1\\1&4\end{bmatrix}.
$$

What is $E(X_2\mid X_1=2)$?

- **A.** $1$
- **B.** $2$
- **C.** $4$
- **D.** $0$

### C-MCQ-029
A bivariate normal distribution has equal marginal variances and a strong **negative** correlation. Relative to the horizontal axis, how is the long axis of its equal-density ellipses oriented?

- **A.** Vertically, because negative correlation increases the second variance.
- **B.** Horizontally, because the marginal variances are equal.
- **C.** Along the upward-sloping line $x_2=x_1$ after centering.
- **D.** Along the downward-sloping line $x_2=-x_1$ after centering.

### C-MCQ-030
Three separate marginal normality tests yield nonsignificant $p$-values, while a joint multivariate skewness test gives $p=0.012$ at $\alpha=0.05$. Which is the best interpretation?

- **A.** The joint test raises concern about multivariate normality despite the marginal results.
- **B.** The marginal tests guarantee multivariate normality, so the joint result must be ignored.
- **C.** The joint test proves that each marginal distribution is nonnormal.
- **D.** No normality conclusion can be considered until all pairwise correlations equal zero.

## Topic 9 – Multivariate Inference and MANOVA

### C-MCQ-031
For a fixed mean difference $d=\bar x-\mu_0$ and sample size $n$, consider the one-sample statistic $T^2=n d^{\mathsf T}S^{-1}d$. If the positive-definite covariance matrix $S$ is replaced by $4S$ with $d$ unchanged, how does $T^2$ change?

- **A.** It becomes four times as large.
- **B.** It stays unchanged because all variables are multivariate.
- **C.** It becomes one-quarter as large.
- **D.** It becomes one-half as large.

### C-MCQ-032
In a one-sample Hotelling test under the usual multivariate normal model, $n=14$ and $p=2$. If the observed $T^2$ is $13$, what is the corresponding exact $F$ statistic, using

$$
F=\frac{n-p}{p(n-1)}T^2\,?
$$

- **A.** $13$
- **B.** $6$
- **C.** $12$
- **D.** $7$

### C-MCQ-033
Measurements before and after an intervention are taken on the same individuals. For one outcome, the before and after measurements have positive covariance. All else equal, what follows from $\operatorname{Var}(A-B)=\operatorname{Var}(A)+\operatorname{Var}(B)-2\operatorname{Cov}(A,B)$?

- **A.** The variance of paired differences exceeds the sum of the individual variances.
- **B.** The before and after measurements must be independent.
- **C.** Paired differences cannot be used in a multivariate hypothesis test.
- **D.** Positive within-person covariance reduces the variance of a difference compared with treating the two measurements as uncorrelated.

### C-MCQ-034
A two-response MANOVA is significant at 5%, but neither separate univariate ANOVA is significant at 5%. What is the most defensible conclusion?

- **A.** A multivariate contrast may distinguish the groups even though neither individual response passes its separate test.
- **B.** The MANOVA result is logically impossible and should be discarded.
- **C.** Both responses must differ significantly from group to group individually.
- **D.** The separate ANOVAs establish that all group mean vectors are identical.

### C-MCQ-035
For a two-response MANOVA, the within-group SSCP matrix is $E=\operatorname{diag}(4,9)$ and the hypothesis SSCP matrix is $H=\operatorname{diag}(4,0)$. What is Wilks' lambda $|E|/|E+H|$?

- **A.** $2$
- **B.** $0.5$
- **C.** $0.25$
- **D.** $1$

### C-MCQ-036
A business compares three marketing treatments using two jointly measured outcomes. A significant overall MANOVA is obtained. Which next step is statistically appropriate if the business needs to know **which** treatments differ?

- **A.** Conclude that every pair of treatments differs on both outcomes.
- **B.** Replace the two outcomes with the categorical treatment label and rerun PCA.
- **C.** Conduct justified follow-up contrasts or comparisons with attention to multiple testing.
- **D.** Interpret the significant test as proof that every covariance matrix differs.

## Topic 10 – Multivariate Multiple Linear Regression

### C-MCQ-037
A multivariate multiple linear regression has $n=50$ observations, $p=3$ response variables, and four predictors plus an intercept. If $Y=XB+E$, what are the dimensions of the coefficient matrix $B$?

- **A.** $50\times3$
- **B.** $3\times5$
- **C.** $4\times3$
- **D.** $5\times3$

### C-MCQ-038
In a two-response regression, a joint multivariate test for a predictor gives $p=0.020$, while separate tests for that predictor give $p=0.13$ and $p=0.19$. Which inference is appropriate at $\alpha=0.05$?

- **A.** The predictor has a statistically detectable joint association with the response vector, even though neither separate test is significant.
- **B.** The results contradict each other and at least one of the $p$-values must be incorrectly calculated.
- **C.** Both individual response coefficients must be statistically significant.
- **D.** The residual covariance between responses must be exactly zero.

### C-MCQ-039
Two responses are modeled using **exactly the same full-rank predictor matrix** $X$ and ordinary least squares. What changes when the analyst expresses the two regressions as a single multivariate multiple regression rather than fitting them separately?

- **A.** Each response automatically receives a different design matrix.
- **B.** The point estimates for every response must change because their residuals may correlate.
- **C.** The response-specific least-squares coefficients remain the same, while joint inference can incorporate cross-response residual covariance.
- **D.** All coefficients become constrained to have identical values across responses.

### C-MCQ-040
An analyst has two correlated business outcomes and many highly correlated numerical predictors. The analyst wants to reduce predictor dimension while still allowing a joint analysis of both outcomes. Which approach matches that goal?

- **A.** Perform PCA on the two outcomes and then remove all predictor variables.
- **B.** Construct principal components from training-set predictors, select components appropriately, and model both outcomes jointly using those components.
- **C.** Use LDA to convert the two continuous outcomes into automatically determined class labels.
- **D.** Fit separate univariate regressions and treat the residual correlation as mathematically impossible.
