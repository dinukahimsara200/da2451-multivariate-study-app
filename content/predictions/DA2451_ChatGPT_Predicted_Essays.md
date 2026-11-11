> **AI-GENERATED PRACTICE PREDICTIONS – NOT OFFICIAL EXAM QUESTIONS**
>
> These questions are original AI-generated practice material based on the DA2451 syllabus, previous examination styles, and available practice worksheets. They are not copied from past examinations, are not provided or endorsed by the lecturer, and are not guaranteed to appear in any examination. Their purpose is to help students prepare for unfamiliar questions.

# DA2451 – Original Predicted Examination Essays
**Course:** DA2451 – Multivariate Methods in Business  
**Part B:** 15 original structured essay questions  
**Instructions:** Answer every subpart of the chosen question. Show relevant mathematical steps, give statistical interpretations in context, and state assumptions where requested. All information needed for numerical work is supplied below. Numerical outputs labeled *hypothetical* are provided for interpretation, not as claims about real datasets. Marks indicate relative depth of the required response.

## Section I – Data Representation, Matrix Reasoning and Principal Components

### C-ESS-001 – Designing and Interpreting a Multivariate Retail Audit (20 marks)

A retailer visits five stores and records two numerical measures and one ordered service rating:

| Store | Waiting time $X_1$ (minutes) | Basket value $X_2$ (LKR thousands) | Service rating $R$ |
|:--|--:|--:|:--|
| A | 4 | 12 | Poor |
| B | 6 | 15 | Fair |
| C | 8 | 17 | Good |
| D | 10 | 22 | Good |
| E | 12 | 24 | Excellent |

A supervisor wants a numerical score that is high for **basket value above average** and low for **waiting time above average**. She proposes the score

$$
T_i=(X_{i2}-\bar X_2)-2(X_{i1}-\bar X_1).
$$

**(a)** Identify the measurement scale of each of the three recorded variables. Explain which arithmetic operations are substantively justified for the service rating as recorded. **[4 marks]**

**(b)** Using only $X_1$ and $X_2$, construct the $5\times2$ data matrix $X$. Calculate the two-dimensional sample mean vector and the centered data matrix $X_c$. **[5 marks]**

**(c)** Express all five proposed scores in matrix form as $t=X_cw$, identify $w$, and calculate the score for stores A and E. Explain how the sign and size of each coefficient of $w$ affect the score. **[5 marks]**

**(d)** A second manager suggests replacing waiting time measured in minutes with waiting time measured in seconds, while leaving the coefficient $-2$ unchanged. Explain why the numerical scores would change and specify a principled way of making the construction less sensitive to measurement units. **[4 marks]**

**(e)** Discuss one reason why these five stores should not be treated as strong evidence of a population-wide statistical relationship. **[2 marks]**

### C-ESS-002 – Centering as a Geometric Matrix Operation (20 marks)

An analyst observes the following $n=4$ cases on two numerical variables:

$$
X=\begin{bmatrix}
1&2\\
3&4\\
5&3\\
7&7
\end{bmatrix},\qquad
\mathbf1=\begin{bmatrix}1\\1\\1\\1\end{bmatrix},\qquad
H=I_4-\frac14\mathbf1\mathbf1^{\mathsf T}.
$$

**(a)** Calculate $H$ explicitly and verify, by direct multiplication or a clear algebraic argument, that $H\mathbf1=0$ and $H^2=H$. Describe the geometric effect of $H$. **[6 marks]**

**(b)** Calculate $HX$ and verify that each of its two columns sums to zero. **[4 marks]**

**(c)** Calculate the sample covariance matrix using

$$
S=\frac{X^{\mathsf T}HX}{n-1}.
$$

Explain why the matrix is symmetric, without relying only on the numbers obtained. **[5 marks]**

**(d)** Suppose the same study expands to $n=4$ observations and $p=9$ numerical features and every feature is centered. State the maximum possible number of positive sample covariance eigenvalues, with a matrix-rank explanation. **[3 marks]**

**(e)** Explain one consequence of the rank restriction in part (d) for computing an ordinary inverse of the sample covariance matrix. **[2 marks]**

### C-ESS-003 – PCA Reconstruction and an Unusual Observation (20 marks)

Two standardized performance variables, $Z_1$ and $Z_2$, have an estimated correlation matrix

$$
R=\begin{bmatrix}1&0.6\\0.6&1\end{bmatrix}.
$$

The eigenpairs are given exactly by

$$
\lambda_1=1.6,\quad e_1=\frac1{\sqrt2}\begin{bmatrix}1\\1\end{bmatrix};\qquad
\lambda_2=0.4,\quad e_2=\frac1{\sqrt2}\begin{bmatrix}1\\-1\end{bmatrix}.
$$

A new standardized observation has $z=(1.5,-0.5)^{\mathsf T}$. The analyst proposes storing only the first principal component for each observation.

**(a)** Explain why the two supplied eigenvectors form orthogonal principal-component directions and express both component scores as functions of $Z_1$ and $Z_2$. **[4 marks]**

**(b)** Calculate the first and second component scores for $z$. **[4 marks]**

**(c)** Reconstruct $z$ using only its first component, $\hat z_1=(e_1^{\mathsf T}z)e_1$. Calculate the reconstruction error vector $z-\hat z_1$ and its squared Euclidean norm. **[5 marks]**

**(d)** The first component captures a large share of overall training-data variance. Explain why that fact alone does not guarantee a small reconstruction error for this particular new observation. **[4 marks]**

**(e)** State one condition under which retaining the second component may be valuable despite its smaller eigenvalue, and identify one limitation of treating the new observation as an outlier based only on its second component score. **[3 marks]**

### C-ESS-004 – PCR, Validation and Interpretable Predictions (20 marks)

A company predicts monthly demand $Y$ from two strongly correlated numerical predictors $X_1$ and $X_2$. Its training-data means are $(20,10)$ and training-data standard deviations are $(4,2)$. Define

$$
Z_1=\frac{X_1-20}{4},\qquad Z_2=\frac{X_2-10}{2},\qquad
T_1=\frac{Z_1+Z_2}{\sqrt2},\qquad T_2=\frac{Z_1-Z_2}{\sqrt2}.
$$

The following *hypothetical* results use the same fixed, previously untouched validation set:

| Model | Training RMSE | Validation RMSE |
|:--|--:|--:|
| PCR using $T_1$ only | 0.48 | 0.62 |
| PCR using $T_1,T_2$ | 0.39 | 0.44 |
| Ordinary least squares on $X_1,X_2$ | 0.39 | 0.44 |

For the two-component PCR model, the fitted equation in component coordinates is

$$
\widehat Y=100+6T_1-2T_2.
$$

**(a)** Explain why predictor variance alone is not sufficient to select the number of PCR components when the goal is demand prediction. **[3 marks]**

**(b)** Select a model using the supplied validation errors. Discuss why the equality of the last two rows' training fitted-value performance is mathematically plausible here. **[4 marks]**

**(c)** Calculate the predicted demand when $X_1=24$ and $X_2=12$, showing how the observation is standardized and projected into component coordinates. **[5 marks]**

**(d)** Derive the change in predicted demand from increasing $X_1$ by four units while holding $X_2$ fixed. Explain why a coefficient for $T_1$ is not automatically a coefficient for $X_1$. **[5 marks]**

**(e)** A teammate proposes recomputing means, standard deviations and PCA directions using the validation data before choosing the component count. Explain the methodological error and describe the correct separation of training and validation steps. **[3 marks]**

## Section II – Regression Diagnostics, Factor Models and Classification

### C-ESS-005 – Auditing Regression Diagnostics Rather Than Deleting Cases (20 marks)

A business models weekly delivery cost using a linear regression with an intercept and three numerical predictors. The analysis uses 80 independently sampled delivery routes. The following *hypothetical* diagnostic summary is supplied:

```text
Residual-versus-fitted plot: Residual spread grows as fitted cost increases;
                          no prominent U-shaped trend in the residual mean.
Normal Q-Q plot:          Moderate upward and downward tail departures.
Shapiro-Wilk test:        W = 0.974, p-value = 0.093
Breusch-Pagan test:       statistic = 9.10, df = 1, p-value = 0.0026
Largest Cook's distance: Route 14, D = 0.76
Other Cook's distances:  All below 0.12

                        Full sample     Without route 14
Coefficient of X1           0.42               0.26
SE of coefficient X1        0.10               0.11
```

Use $\alpha=0.05$ for formal diagnostic decisions.

**(a)** Identify and distinguish the assumptions or concerns targeted by the residual-versus-fitted plot, the normal Q-Q plot, the Shapiro-Wilk test, and the Breusch-Pagan test. **[5 marks]**

**(b)** Interpret both supplied test results. Explain why failure to reject a normality test is not proof of exact normal errors. **[4 marks]**

**(c)** Explain the meaning of Cook's distance and assess why route 14 deserves investigation. Use the coefficient information to discuss its possible influence without assuming that it is an invalid observation. **[5 marks]**

**(d)** Recommend two distinct defensible responses to the reported diagnostic evidence, and explain what each response is intended to address. **[4 marks]**

**(e)** Explain why simply deleting route 14 and reporting only the revised model could mislead decision makers. **[2 marks]**

### C-ESS-006 – Reproducing Relationships from a Common-Factor Model (20 marks)

A survey contains four standardized indicators: $X_1$ = service reliability, $X_2$ = response speed, $X_3$ = value perception, and $X_4$ = price fairness. A **hypothetical**, orthogonal two-factor model is proposed:

$$
X=LF+\varepsilon,\qquad
L=\begin{bmatrix}
0.8&0.1\\
0.7&0.2\\
0.1&0.8\\
0.2&0.7
\end{bmatrix},\qquad
\operatorname{Cov}(F)=I_2.
$$

Assume $E(F)=0$, $E(\varepsilon)=0$, factors are uncorrelated with specific errors, the four specific errors are mutually uncorrelated, and $\operatorname{Var}(X_i)=1$ for every $i$.

**(a)** State the dimensions of $L$, $F$, and $\varepsilon$. Explain the distinct roles of common factors and specific errors in the model. **[3 marks]**

**(b)** Compute the communality and uniqueness for $X_1$ and $X_3$. **[4 marks]**

**(c)** Use $\operatorname{Cov}(X)=LL^{\mathsf T}+\Psi$ to calculate the correlations predicted by the model between $(X_1,X_2)$, $(X_1,X_3)$, and $(X_3,X_4)$. **[6 marks]**

**(d)** Propose substantive labels for the factors and explain the interpretive difficulty created by the smaller cross-loadings. **[3 marks]**

**(e)** Explain what changes and what remains invariant if the two factors undergo an orthogonal rotation. If the two underlying business constructs are thought to correlate, discuss an alternative rotation assumption. **[4 marks]**

### C-ESS-007 – LDA Priors, Business Losses and a Test Confusion Matrix (25 marks)

A bank classifies applications into Group 1 (low default risk) and Group 2 (high default risk) using two standardized financial indicators. A fitted LDA model assumes the common within-group covariance matrix and group means

$$
\Sigma=\begin{bmatrix}1&0\\0&4\end{bmatrix},\qquad
\mu_1=\begin{bmatrix}0\\0\end{bmatrix},\qquad
\mu_2=\begin{bmatrix}2\\1\end{bmatrix}.
$$

The prior probabilities are $\pi_1=0.70$ and $\pi_2=0.30$. For a new applicant, $x=(1.2,0.8)^{\mathsf T}$. Assume equal costs of the two types of classification error for parts (a)–(c). The LDA scores are defined by

$$
\delta_k(x)=x^{\mathsf T}\Sigma^{-1}\mu_k
-\frac12\mu_k^{\mathsf T}\Sigma^{-1}\mu_k+\log\pi_k,
$$

with $\log(0.70)=-0.3567$ and $\log(0.30)=-1.2040$ (rounded).

**(a)** Calculate $\Sigma^{-1}$, evaluate both discriminant scores and classify the new applicant. Show the relevant arithmetic. **[7 marks]**

**(b)** Repeat the classification decision if the two class priors are changed to $\pi_1=\pi_2=0.50$, without changing the means or covariance matrix. Interpret any change in the decision. **[4 marks]**

**(c)** Explain how a greater business cost of mistakenly assigning a high-risk applicant to Group 1 should affect the classification decision rule, without estimating new group means. **[3 marks]**

The bank also reports this **independent test-set** confusion matrix for its original model:

| Actual group | Predicted Group 1 | Predicted Group 2 |
|:--|--:|--:|
| Group 1 (low risk) | 26 | 4 |
| Group 2 (high risk) | 7 | 13 |

**(d)** Compute the overall classification accuracy, Group 2 sensitivity, and Group 1 specificity. Explain why overall accuracy alone is insufficient for a credit-risk decision. **[7 marks]**

**(e)** Suppose a missed high-risk applicant costs the bank five times as much as an incorrectly flagged low-risk applicant. Calculate the total error cost in **relative cost units**, using 5 units for a Group 2 applicant predicted as Group 1 and 1 unit for the opposite error. **[4 marks]**

## Section III – Multivariate Probability and Diagnostic Inference

### C-ESS-008 – Correlation-Sensitive Anomaly Screening (20 marks)

A process-quality team monitors two standardized measurements. Under its assumed in-control model,

$$
X\sim N_2\!\left(\begin{bmatrix}0\\0\end{bmatrix},
\begin{bmatrix}1&0.8\\0.8&1\end{bmatrix}\right).
$$

Two new observations are $a=(2,2)^{\mathsf T}$ and $b=(2,-2)^{\mathsf T}$. For screening, the team uses the **known-population** squared Mahalanobis distance

$$
D^2(x)=(x-\mu)^{\mathsf T}\Sigma^{-1}(x-\mu).
$$

For this question, the 95th percentile of $\chi_2^2$ is $5.99$.

**(a)** Calculate and compare the squared Euclidean distances of $a$ and $b$ from the population mean. **[3 marks]**

**(b)** Obtain $\Sigma^{-1}$ and calculate $D^2(a)$ and $D^2(b)$, showing the cross-product contribution. **[7 marks]**

**(c)** Using the stated chi-square cutoff, identify which observation(s) should be flagged as unusually distant under the assumed model. Explain the role of correlation in any difference from part (a). **[4 marks]**

**(d)** Describe the principal orientation of the density ellipses and explain why an observation can look unexceptional on each variable separately but be unusual jointly. **[3 marks]**

**(e)** Discuss one limitation of using this exact chi-square reference if $\mu$ and $\Sigma$ are estimated from a small sample that also contains the screened observations. **[3 marks]**

### C-ESS-009 – Reconciling Marginal and Joint Normality Evidence (20 marks)

A researcher has $n=60$ independent, complete multivariate observations on three continuous service measures. No raw dataset is needed for the calculations requested here. The following **hypothetical** diagnostic evidence is available:

| Diagnostic | Result |
|:--|:--|
| Shapiro-Wilk, $X_1$ | $p=0.18$ |
| Shapiro-Wilk, $X_2$ | $p=0.34$ |
| Shapiro-Wilk, $X_3$ | $p=0.42$ |
| Mardia multivariate skewness | $p=0.011$ |
| Mardia multivariate kurtosis | $p=0.16$ |
| Marginal Q-Q plots | Approximately straight except for mild tail deviations |
| Squared Mahalanobis distance Q-Q plot | Marked upward departure among the largest ordered distances |

Use $\alpha=0.05$ and assume the same 60 cases were used for each diagnostic.

**(a)** State the null hypotheses addressed by the marginal normality tests and Mardia's multivariate normality tests, and interpret all reported $p$-values. **[6 marks]**

**(b)** Explain why the results for marginal normality cannot override the evidence from a joint normality assessment. **[4 marks]**

**(c)** Describe how the squared Mahalanobis distance Q-Q plot is constructed conceptually, including its theoretical reference distribution under a multivariate normal model with known population parameters. **[4 marks]**

**(d)** Design a basic R workflow, giving representative commands or clear pseudocode, to inspect the three marginal Q-Q plots, run marginal Shapiro-Wilk tests and examine a joint multivariate normality diagnostic. You may denote the already-loaded $60\times3$ data frame by `service`. **[4 marks]**

**(e)** Explain why automatically transforming all three variables or removing the largest-distance observations solely to obtain nonsignificant normality tests is not a defensible analytical strategy. **[2 marks]**

### C-ESS-010 – A Mean-Vector Test and a Simultaneous Business Contrast (25 marks)

A procurement team has a random sample of $n=16$ independent bivariate observations. Assume a bivariate normal population with an unknown positive-definite covariance matrix. The two quantities have been expressed as deviations from the company's benchmark units. The sample mean and unbiased sample covariance matrix are

$$
\bar x=\begin{bmatrix}2\\-1\end{bmatrix},\qquad
S=\begin{bmatrix}4&1\\1&1\end{bmatrix}.
$$

The benchmark mean vector is $\mu_0=(0,0)^{\mathsf T}$, and $p=2$. Use $\alpha=0.05$ and the supplied critical value $F_{2,14;0.95}=3.74$.

**(a)** State a suitable joint null and alternative hypothesis for comparing the population mean vector with the benchmark. Explain why the covariance between the outcomes is relevant to a joint assessment. **[4 marks]**

**(b)** Calculate

$$
T^2=n(\bar x-\mu_0)^{\mathsf T}S^{-1}(\bar x-\mu_0),
$$

including $S^{-1}$. **[6 marks]**

**(c)** Transform the statistic to its exact reference form under the stated model,

$$
F=\frac{n-p}{p(n-1)}T^2,
$$

and make a formal 5% decision using the supplied critical value. **[4 marks]**

**(d)** Management particularly cares about the linear contrast $\theta=a^{\mathsf T}\mu$ for $a=(1,-1)^{\mathsf T}$. Calculate $a^{\mathsf T}\bar x$ and $a^{\mathsf T}Sa$. Then construct the 95% Hotelling-based simultaneous confidence interval for this contrast using

$$
a^{\mathsf T}\bar x\ \pm\
\sqrt{\frac{p(n-1)}{n-p}F_{p,n-p;0.95}
\frac{a^{\mathsf T}Sa}{n}}.
$$

**[7 marks]**

**(e)** Explain the difference between a confidence interval valid simultaneously over all linear contrasts and an ordinary, single-contrast interval. Interpret the result of part (d) in business terms. **[4 marks]**

### C-ESS-011 – Why Pairing Changes Multivariate Inference (25 marks)

For $n=25$ independent employees, two numerical productivity measures are recorded before a training program ($B$) and after the same program ($A$). Each employee's before and after measurements are correctly matched. Define the bivariate improvement vector $D=A-B$.

The following unbiased **sample** summaries are provided:

$$
\bar A=\begin{bmatrix}5\\10\end{bmatrix},\qquad
\bar B=\begin{bmatrix}4\\9\end{bmatrix},
$$

$$
S_A=\begin{bmatrix}4&1\\1&9\end{bmatrix},\quad
S_B=\begin{bmatrix}4&0\\0&9\end{bmatrix},\quad
S_{AB}=\begin{bmatrix}3&0.5\\0.5&6\end{bmatrix}.
$$

Here $S_{AB}$ is the sample cross-covariance matrix between the matched after and before vectors; $S_{BA}=S_{AB}^{\mathsf T}$. Assume that the 25 paired difference vectors are an independent random sample from a bivariate normal distribution. For the 5% test, use $F_{2,23;0.95}=3.42$.

**(a)** Explain why a paired design should be analyzed using employee-level difference vectors rather than treating the before and after samples as independent groups. **[4 marks]**

**(b)** Calculate $\bar D$ and derive the sample covariance matrix of the differences using

$$
S_D=S_A+S_B-S_{AB}-S_{BA}.
$$

**[6 marks]**

**(c)** Formulate the joint hypothesis of no mean improvement vector. Calculate the one-sample Hotelling statistic based on $D$ and its $F$ transformation, then make a 5% decision. **[8 marks]**

**(d)** Repeat the covariance calculation conceptually under the counterfactual assumption $S_{AB}=0$. Explain how discarding the pairing information would change the variance used for inference in this example. **[4 marks]**

**(e)** Identify one important restriction on interpreting a statistically significant pre/post change as proof of a causal training effect. **[3 marks]**

## Section IV – Group Mean Comparisons and Multiple-Response Models

### C-ESS-012 – MANOVA Beyond an Overall Rejection (20 marks)

A company randomly allocates $n=60$ independent customer interactions equally among three promotional messages. For every interaction, two quantitative outcomes are recorded: purchase intention and brand trust. The sum-of-squares-and-cross-products matrices computed from the data are

$$
H=\begin{bmatrix}6&2\\2&10\end{bmatrix},\qquad
E=\begin{bmatrix}30&5\\5&28\end{bmatrix},
$$

where $H$ is the treatment (hypothesis) SSCP matrix and $E$ is the residual SSCP matrix. Assume independent multivariate normal errors with a common covariance matrix in all three treatments. The two-response, three-treatment Wilks approximation for this problem can be evaluated using

$$
\Lambda=\frac{|E|}{|E+H|},\qquad
F_{\mathrm{approx}}=\frac{n-g-1}{g-1}
\left(\frac{1-\sqrt\Lambda}{\sqrt\Lambda}\right),
$$

with $g=3$, numerator degrees of freedom $4$, denominator degrees of freedom $112$, and $F_{4,112;0.95}=2.45$.

**(a)** State the multivariate treatment-effect hypotheses and explain why one MANOVA may be preferable to testing each outcome separately at the outset. **[4 marks]**

**(b)** Calculate $|E|$, $|E+H|$, and Wilks' lambda. **[5 marks]**

**(c)** Evaluate the supplied $F$ approximation and reach a conclusion at $\alpha=0.05$, using the stated reference value. **[4 marks]**

**(d)** Explain precisely what an overall significant MANOVA does **not** establish about individual treatment pairs or individual outcomes. Describe an appropriate follow-up strategy. **[4 marks]**

**(e)** Explain how substantial covariance heterogeneity across the three treatment groups could affect the reliability of the analysis and name a relevant diagnostic approach. **[3 marks]**

### C-ESS-013 – Joint Predictor Inference in Multivariate Regression (25 marks)

A retailer has $n=45$ independent monthly records. It jointly models two continuous outcomes, $Y_1$ = store revenue (thousands of LKR) and $Y_2$ = customer retention score, using two predictors: $X_1$ = advertising units and $X_2$ = staff-training hours. With an intercept, the fitted model is $\widehat Y=X\widehat B$ and

$$
\widehat B=
\begin{array}{c|rr}
 &Y_1&Y_2\\\hline
\text{Intercept}&50&30\\
X_1&2&1.23\\
X_2&0.5&-0.2
\end{array}.
$$

The *hypothetical* fitted residual covariance matrix is

$$
\widehat\Sigma_{\varepsilon}=\begin{bmatrix}9&-3\\-3&4\end{bmatrix}.
$$

The following *hypothetical* inferential summary is provided for $X_1$, adjusted for $X_2$:

```text
Separate t-test for X1 in revenue equation:     p = 0.084
Separate t-test for X1 in retention equation:   p = 0.110
Joint Wilks-based test for X1 across Y1 and Y2: p = 0.007
```

Use $\alpha=0.05$.

**(a)** State the dimensions of $Y$, $X$, $\widehat B$ and the residual matrix. Write the two fitted response equations and explain what is shared between them. **[5 marks]**

**(b)** Calculate the expected joint response vector when $(X_1,X_2)=(10,20)$. Then calculate the change in that predicted vector if advertising increases by three units with training hours unchanged. **[5 marks]**

**(c)** Calculate the residual correlation between the two outcomes. Explain what this tells us about the joint variation remaining after the predictors have been included. **[4 marks]**

**(d)** State the null hypotheses tested by the separate $t$-tests and the joint Wilks-based test for $X_1$. Interpret the three supplied $p$-values and explain why their decisions need not agree. **[7 marks]**

**(e)** If both equations contain exactly the same predictors and observations, explain whether fitting the responses jointly changes their ordinary least-squares point estimates. Distinguish estimation from joint hypothesis testing. **[4 marks]**

### C-ESS-014 – Selecting and Sequencing Methods for a Business Study (20 marks)

A telecom company has information on 240 subscribers. Each record contains:

- Twelve numerical usage and billing predictors with strong correlations among several predictors.
- Eight numerical survey-item scores intended to measure service trust and perceived convenience. The company does not know the number of underlying constructs.
- Two continuous outcomes: monthly spend and customer satisfaction.
- A **known** three-level account-status label (active, at risk, inactive), assigned from prior business records.

The goal is to build interpretable summaries, make out-of-sample predictions, understand latent survey constructs, and classify future subscribers using the status labels.

**(a)** For each of the four distinct goals (usage summary, latent survey structure, prediction of both continuous outcomes, and classification of the known status categories), recommend a suitable multivariate method or combination of methods from the DA2451 syllabus. Justify each choice by the type of variables and the analytical objective. **[8 marks]**

**(b)** Explain two conceptual differences between using PCA to summarize the twelve numerical predictors and using EFA to study the eight survey items. **[4 marks]**

**(c)** Design a workflow that prevents training/test contamination when PCA or PCR is used before prediction or LDA classification. Clearly distinguish fitting transformations from applying them to held-out cases. **[4 marks]**

**(d)** The account-status categories are heavily imbalanced. Propose two evaluation summaries that provide more information than training-set accuracy alone, and explain how category frequencies might affect interpretation. **[4 marks]**

### C-ESS-015 – Statistical Quality Control of a Multivariate Report (25 marks)

A consulting team writes a report on a study of 90 independently sampled branches. Each branch has six continuous operational predictors, three ordered customer-rating items, two continuous business outcomes, and a branch category with three known levels. The report includes the following claims:

1. “Because the six operational variables are correlated, standardizing them guarantees that the principal components will explain the same amounts of variation as the unstandardized analysis.”
2. “In a two-factor EFA, an orthogonal rotation changes the total communality of each indicator, so the resulting factors explain a different total amount of common variation.”
3. “The multivariate normality test has $p=0.21$, so the observations are proven to come from a multivariate normal distribution.”
4. “Our three-category LDA model has training accuracy 92%. Therefore, its expected accuracy on future branches is also 92%.”
5. “A joint multivariate regression predictor test gives $p=0.018$, but the separate tests for the two business outcomes have $p=0.09$ and $p=0.12$. The results cannot both be correct.”

Assume all $p$-values mentioned above are from properly performed tests, with their stated null hypotheses, and use $\alpha=0.05$.

**(a)** Evaluate claim 1. Explain precisely how a change of scale can affect covariance-based PCA and how correlation-based PCA differs. **[5 marks]**

**(b)** Evaluate claim 2. State which quantities are retained under orthogonal factor rotation and which aspects of a loading matrix may change. **[4 marks]**

**(c)** Evaluate claim 3. Distinguish failure to reject a statistical null hypothesis from demonstrating that the null hypothesis is true. Identify one additional graphical diagnostic appropriate to multivariate normality. **[4 marks]**

**(d)** Evaluate claim 4. Specify how to assess out-of-sample LDA performance and why imbalanced branch categories could make raw accuracy misleading. **[5 marks]**

**(e)** Evaluate claim 5. State the conceptual distinction between the joint multivariate predictor hypothesis and the two individual-response hypotheses. Explain why differing significance conclusions can occur. **[5 marks]**

**(f)** Write a short concluding recommendation identifying the two most urgent analytical corrections to make before the company uses the report for decisions. Support your choices. **[2 marks]**
