# DA2451 Multivariate Methods in Business
## Lecture 05 Extra: Factor Analysis, Explained from First Principles

**A complete teaching chapter based on *Lec5Extra.pdf*, “Factor analysis (Remarks),” four pages, DA2451, Semester 4, 2023.**

**How to use this chapter.** The four-page lecture is the primary source. Each major topic identifies the page containing the corresponding lecturer remark. The sections headed **Teaching extension** supply the background, invented examples, calculations, cautions, and R demonstrations necessary to understand and apply the remarks. Numbers in the invented examples are **not** results reported in the lecture. A source-to-chapter audit is included at the end.

**Learning objectives.** By the end, you should be able to explain why factor analysis is performed; recognise when a dataset is suitable; read the factor model and loading matrices; distinguish PCA, principal-axis factoring, maximum likelihood, and minimum residual extraction; choose and interpret rotations; understand factor retention and factor scores; interpret KMO and Bartlett's test; and perform a defensible introductory exploratory factor analysis (EFA) in R.

---

# 1. Why would a business analyst need factor analysis?

**From the lecture, p. 1:** Like principal component analysis (PCA), factor analysis is a multivariate data-reduction method. Several observed variables can be represented with fewer **factors**, also called **latent** or **unobserved variables**. A latent construct, such as happiness, may not be measurable through any one observed variable.

Imagine a company asks 400 customers to rate six statements from 1 to 5:

| Survey variable | Statement |
|---|---|
| Q1 | The staff explain things clearly. |
| Q2 | Staff respond quickly. |
| Q3 | Employees solve my problems. |
| Q4 | Prices are reasonable. |
| Q5 | Discounts offer good value. |
| Q6 | Products are worth the money. |

At first you have **six recorded numbers per customer**. But perhaps three questions are expressions of **service quality**, and the other three are expressions of **perceived value**. Neither construct can be observed directly. You observe answers that may reflect them.

The central idea is therefore:

\[
\underbrace{\text{Q1, Q2, Q3, Q4, Q5, Q6}}_{\text{six observed variables}}
\quad\longleftarrow\quad
\underbrace{\text{Service quality, Perceived value}}_{\text{two possible latent factors}}.
\]

The arrow is conceptual: an underlying characteristic is assumed to help explain patterns in the responses. Discovering a statistical factor does **not** prove that a real-world psychological or business cause has been identified.

### Why not just average the questions?

An average assumes you already know which items belong together and usually treats all included items as equally informative. EFA instead examines the pattern of **correlations** to investigate whether groups of variables are consistent with fewer common influences. It can suggest that Q1–Q3 belong together, that Q4–Q6 belong together, or that the intended structure is not supported.

### What is a *latent variable*?

- **Observed variable:** something measured directly, such as a questionnaire answer, sales figure, or examination score.
- **Latent variable:** a proposed underlying property inferred from the way observed variables move together, such as service quality, mathematical ability, or happiness.
- **Factor:** the latent dimension in a factor-analysis model. Its numerical scale and direction are chosen for modelling convenience; the interpretation comes from the variables associated with it.

**Teaching extension: a critical distinction.** Data reduction is an outcome of EFA, but understanding **shared variation** is its defining modelling aim. If you only want compact summaries of the total variation in a dataset, PCA may be more appropriate. If you want a model of shared latent influences, common-factor analysis is a more natural starting point.

---

# 2. Foundations: subjects, variables, variation, and correlation

The lecture uses a mathematical notation that becomes straightforward once each symbol has a concrete meaning.

## 2.1 What do \(n\), \(p\), and \(m\) mean?

**From the lecture, p. 1:** There are \(p\) measured variables for \(n\) subjects, represented using \(m\) factors, with \(m<p\).

For the customer example:

- \(n=400\): four hundred customers or **observations**.
- \(p=6\): six observed survey variables.
- \(m=2\): two proposed underlying factors.
- \(X_i\): the \(i\)th observed variable; thus \(X_4\) could mean Q4.
- \(F_j\): the \(j\)th factor; thus \(F_1\) could mean service quality.

Think of the dataset as a rectangular table with **400 rows and six columns**. The factor model describes relationships between the six columns. Factor scores, introduced later, describe where each customer lies on the inferred dimensions.

## 2.2 What does variance measure?

**Teaching extension.** Variance measures how spread out a variable's values are. If everybody answers Q1 with exactly 4, it has zero variance. If answers differ substantially across customers, Q1 has more variance.

For observations \(x_1,\ldots,x_n\), the sample mean and sample variance are

\[
\bar x=\frac{1}{n}\sum_{k=1}^n x_k,
\qquad
s_x^2=\frac{1}{n-1}\sum_{k=1}^n(x_k-\bar x)^2.
\]

*Example.* For three scores 2, 4, and 6, the mean is 4, and the sample variance is

\[
s_x^2=\frac{(2-4)^2+(4-4)^2+(6-4)^2}{3-1}
=\frac{4+0+4}{2}=4.
\]

This is a measure of variation **within one variable**.

## 2.3 What does correlation measure?

Correlation describes how two variables vary **together**. The Pearson correlation is

\[
r_{XY}=\frac{\operatorname{Cov}(X,Y)}{s_Xs_Y},
\]

where the sample covariance is

\[
\operatorname{Cov}(X,Y)=\frac{\sum_{k=1}^n(x_k-\bar x)(y_k-\bar y)}{n-1}.
\]

Interpretation:

| Correlation | Plain-language meaning | Possible survey example |
|---|---|---|
| \(+0.85\) | Strong positive linear association | High Q1 responses tend to accompany high Q2 responses. |
| \(+0.20\) | Weak positive linear association | There is only a slight tendency to move together. |
| \(0\) | No **linear** association | Knowledge of one does not help predict the other by a straight-line relationship. |
| \(-0.75\) | Strong negative linear association | Higher waiting time tends to accompany lower satisfaction. |

Correlation is not proof of causation. A correlation near zero also does **not** rule out a strong curved relationship.

## 2.4 The correlation matrix

With three standardised variables, a correlation matrix might be

\[
R=\begin{pmatrix}
1&0.70&0.10\\
0.70&1&0.15\\
0.10&0.15&1
\end{pmatrix}.
\]

Each diagonal entry is 1 because a variable is perfectly correlated with itself. The matrix is symmetric: the correlation of Q1 with Q2 is the same as Q2 with Q1. Here Q1 and Q2 move together strongly; Q3 is comparatively separate.

A shared pattern of correlations gives factor analysis something to explain. Without it, seeking a substantially smaller number of common factors is often unproductive.

## 2.5 Standardisation

If a monetary variable uses thousands of rupees and a survey answer uses a 1–5 scale, the different units matter. Standardisation converts an observation to

\[
z_{ki}=\frac{x_{ki}-\bar x_i}{s_i}.
\]

A standardised value \(z=1\) is one sample standard deviation above that variable's mean. The usual correlation-based factor analysis treats each variable as having variance 1, so scales with large units do not automatically dominate. Standardisation does **not** repair bad measurements, skewness, nonlinear relationships, or inappropriate correlations.

---

# 3. When is a dataset appropriate for factor analysis?

**From the lecture, p. 1:** Factor analysis is designed for interval/numerical data but can also be used with ordinal scores, including Likert responses. For ordered data, the lecture recommends **polychoric rather than Pearson correlations**. Variables should be linearly related, as assessed with pairwise scatterplots/correlations, and should exhibit at least moderate intercorrelations. Otherwise the factor count may approach the original variable count, defeating data reduction.

## 3.1 Measurement levels: why they matter

| Variable type | Example | Main issue for EFA |
|---|---|---|
| Continuous numeric or approximately interval | Delivery time, assessment score | Pearson correlations are often a reasonable starting point when relationships are suitable. |
| Ordinal | A single 1–5 agreement item | The order is meaningful, but gaps between categories need not be equal. |
| Nominal | Store branch, payment method | Categories have no natural order; conventional Pearson-based EFA is not appropriate without a different modelling strategy. |

A Likert response of 4 means **more agreement** than a response of 3; it does not necessarily mean exactly one equal-sized psychological unit more agreement. That is why treating ordinal categories as exact continuous distances can distort the association between items.

## 3.2 Pearson versus polychoric correlation

**Teaching extension.** Suppose an unobserved continuous willingness-to-recommend score \(Y^*\) becomes the reported five-category answer \(Y\):

\[
Y=\begin{cases}
1&Y^*\le\tau_1,\\
2&\tau_1<Y^*\le\tau_2,\\
3&\tau_2<Y^*\le\tau_3,\\
4&\tau_3<Y^*\le\tau_4,\\
5&Y^*>\tau_4.
\end{cases}
\]

The \(\tau\)'s are **thresholds**: boundaries separating response categories on the hypothetical continuous scale.

- **Pearson correlation** treats the observed category numbers as numeric values and measures their linear association.
- **Polychoric correlation** estimates the correlation between two hypothetical underlying continuous variables that, after thresholding, would generate the observed ordinal responses. The conventional polychoric model assumes an underlying **bivariate normal distribution**.

The polychoric estimate may be larger than the Pearson estimate because categorisation can conceal part of the underlying association. It is not automatically larger, better, or more trustworthy in every dataset. Sparse response categories, small samples, assumption failures, or unstable correlation matrices can make estimates unreliable.

**Practical interpretation.** For several ordinal Likert items, polychoric correlations are a useful EFA choice when the threshold model is reasonable. Do not claim the ordinal observations themselves have become normally distributed; the normality assumption concerns their hypothesised underlying response variables.

## 3.3 What does a linear relationship look like?

A roughly upward-sloping cloud in a scatterplot suggests a positive linear relationship. A downward-sloping cloud suggests a negative one. A U-shaped cloud is nonlinear: its Pearson correlation may be small even though a relationship exists.

For ordinal variables, a scatterplot contains repeated points at integer combinations. Jittered plots or two-way response tables can be more informative. Inspect unusual extreme responses, ceiling/floor effects, and items with almost no variability.

## 3.4 Must **every** pair of variables be moderately correlated?

**Teaching extension clarifying the lecture's general guidance.** No. In a useful two-factor solution, the three service-quality items might correlate strongly *among themselves*, while the three perceived-value items correlate strongly *among themselves*. Cross-group correlations can be weak. The relevant question is whether there is an **interpretable overall pattern of shared relationships**, not whether every possible pair exceeds a universal correlation cutoff.

- If nearly every off-diagonal correlation is close to zero, EFA has little common structure to recover.
- If many variables are almost exact duplicates, the correlation matrix may be singular or nearly singular; extreme redundancy can also create numerical problems.
- A very large correlation is not proof that a single factor must explain everything.

The formal KMO and Bartlett checks will be developed in Section 10. In practice, examine them **before** relying on extraction results, although the PDF introduces them on its final page.

---

# 4. The factor-analysis equation, slowly unpacked

**From the lecture, p. 1:** The proposed model for observed variable \(X_i\) is

\[
\boxed{X_i=a_{i1}F_1+a_{i2}F_2+\cdots+a_{im}F_m+e_i,\qquad m<p.}
\]

The \(a_{ij}\)'s are factor loadings, and \(e_i\) is the part of \(X_i\) not explained by the factors.

## 4.1 A complete translation into ordinary language

Imagine that Q1 measures whether the staff explain things clearly. A two-factor model might be written as

\[
Q1=0.80F_{\text{service}}+0.10F_{\text{value}}+e_{Q1}.
\]

The illustrative coefficients suggest that Q1 mainly reflects service quality, with a small additional connection to perceived value. The error/unique term includes things not accounted for by the common factors, such as wording-specific influences or measurement noise. **The numbers are invented for teaching; they are not estimated from the lecture.**

Here is the symbol dictionary:

| Symbol | Meaning |
|---|---|
| \(X_i\) | The \(i\)th observed variable, typically considered after subtracting its mean. |
| \(F_j\) | The \(j\)th unobserved common factor. |
| \(a_{ij}\) | The loading coefficient connecting observed variable \(i\) with factor \(j\). |
| \(e_i\) | The unique or residual component not explained by the retained common factors. |
| \(p\) | Number of observed variables. |
| \(m\) | Number of retained common factors, usually smaller than \(p\). |
| \(n\) | Number of people, businesses, or other observed cases. |

## 4.2 A more explicit version of the model

**Teaching extension.** Real variables may have nonzero means. An expanded form is

\[
X_i=\mu_i+\sum_{j=1}^{m}\lambda_{ij}F_j+\varepsilon_i.
\]

If the observed variables have been centred at zero, the intercept \(\mu_i\) disappears. If they are also standardised, the model is often displayed as

\[
Z_i=\lambda_{i1}F_1+\dots+\lambda_{im}F_m+\varepsilon_i.
\]

Different textbooks use \(a_{ij}\) or \(\lambda_{ij}\) for the same role. The *lecture's* notation is \(a_{ij}\). We use \(\lambda\) when discussing matrix and covariance formulas because it is standard in statistical texts.

## 4.3 **Loadings are not the same thing as factor scores**

The lecture describes \(a_{ij}\) as “factor loadings (or scores)” on p. 1 and later introduces factor scores for individual observations on p. 3. To avoid confusion, use these precise meanings:

- **Factor loading:** a coefficient relating **a variable** to **a factor**, for example Q1's loading 0.80 on the service factor.
- **Factor score:** an estimated value describing **one customer** on **a factor**, for example Customer 17 having estimated service score \(+1.10\).

A loading matrix has approximately \(p\times m\) entries; a factor-score table has approximately \(n\times m\) entries. They answer different questions.

## 4.4 Matrix notation without intimidation

For six variables and two factors, write

\[
\underbrace{\mathbf z}_{6\times1}
=
\underbrace{\boldsymbol\Lambda}_{6\times2}
\underbrace{\mathbf f}_{2\times1}
+
\underbrace{\boldsymbol\varepsilon}_{6\times1}.
\]

Here \(\boldsymbol\Lambda\) is the **loading matrix**. Multiplying six rows by two factors yields a predicted value for each of the six observed variables.

An illustrative loading matrix is

\[
\boldsymbol\Lambda=
\begin{pmatrix}
0.80&0\\
0.80&0\\
0.80&0\\
0&0.80\\
0&0.80\\
0&0.80
\end{pmatrix}.
\]

The first three variables mainly represent factor 1; the final three mainly represent factor 2. Real estimated loadings will rarely be exactly zero.

## 4.5 What must be assumed about the model?

**Teaching extension, not an additional lecturer list.** A basic common-factor covariance model commonly assumes:

1. The model is linear in the common factors.
2. Factor means are set to zero and their variances commonly set to one so that their scale is defined.
3. The unique components have mean zero and are uncorrelated with the common factors.
4. In the simplest EFA model, different variables' unique components are mutually uncorrelated.
5. The number of common factors is small enough to be meaningful, and the resulting covariance model is identifiable.

These are **model assumptions**, not facts established just by calling an EFA function. Orthogonal methods impose uncorrelated factors; oblique methods permit correlated factors. Statistical independence is stronger than zero correlation, so the two words should not be treated as identical in general.

---

# 5. Loadings, common variance, and unique variance

The extraction-method comparison on **lecture p. 2** relies on one central idea: different methods treat *total* and *shared* variance differently. This section teaches that distinction before comparing methods.

## 5.1 From coefficients to how much is explained

For a standardised variable and **uncorrelated factors**, the communality is

\[
\boxed{h_i^2=\lambda_{i1}^2+\lambda_{i2}^2+\cdots+\lambda_{im}^2.}
\]

The **communality** \(h_i^2\) is the fraction of that variable's variance accounted for by the common-factor part of the model. If the variable has standardised variance 1 and the model assumptions hold, the **uniqueness** is

\[
\boxed{u_i^2=1-h_i^2.}
\]

Suppose Q1 has orthogonal-factor loadings 0.80 and 0.10. Then

\[
h_{Q1}^2=0.80^2+0.10^2=0.64+0.01=0.65,
\]

\[
u_{Q1}^2=1-0.65=0.35.
\]

**Interpretation:** the two common factors account for about **65%** of Q1's variance; about **35%** remains unique/unexplained by those factors. It does **not** mean that the model predicts 65% of customers' answers exactly or that 35% is necessarily random measurement error. Unique variance may contain both true item-specific variation and error.

## 5.2 Why you must be careful when factors correlate

For correlated, standardised factors, let \(\boldsymbol\Phi\) be their correlation matrix. The correct general formula is

\[
\boxed{h_i^2=\boldsymbol\lambda_i\boldsymbol\Phi\boldsymbol\lambda_i^{\mathsf T}.}
\]

For **two** correlated factors with correlation \(\phi\), this expands to

\[
h_i^2=\lambda_{i1}^2+\lambda_{i2}^2+2\phi\lambda_{i1}\lambda_{i2}.
\]

*Worked example.* If loadings are 0.70 and 0.20, and the factors correlate at 0.30,

\[
\begin{aligned}
h_i^2
&=0.70^2+0.20^2+2(0.30)(0.70)(0.20)\\
&=0.49+0.04+0.084\\
&=0.614,
\end{aligned}
\]

so uniqueness is \(1-0.614=0.386\). Simply adding the squared loadings gives 0.53, which is **incorrect for this oblique example**.

## 5.3 Common factor covariance versus unique variance

The general covariance-model equation is

\[
\boxed{\boldsymbol\Sigma
=\boldsymbol\Lambda\boldsymbol\Phi\boldsymbol\Lambda^{\mathsf T}
+\boldsymbol\Psi.}
\]

Read each term:

- \(\boldsymbol\Sigma\): correlations/covariances of the **observed variables** predicted by the model.
- \(\boldsymbol\Lambda\): loadings connecting each observed variable to each factor.
- \(\boldsymbol\Phi\): correlations among the factors; for an orthogonal model, \(\boldsymbol\Phi=I\).
- \(\boldsymbol\Psi\): variances of the unique parts, usually arranged in a diagonal matrix.

This is the mathematical heart of common-factor analysis: observed variables correlate because they share some factor-related variation.

### Two variables, one shared factor

Suppose

\[
Z_1=0.80F+\varepsilon_1,\qquad
Z_2=0.70F+\varepsilon_2,
\]

with \(\operatorname{Var}(F)=1\), and both errors uncorrelated with the factor and one another. Then

\[
\operatorname{Corr}(Z_1,Z_2)=0.80(0.70)=0.56.
\]

The model explains why the variables correlate: both reflect \(F\). Their individual communalities are \(0.80^2=0.64\) and \(0.70^2=0.49\), so their uniquenesses are 0.36 and 0.51 respectively.

## 5.4 Factor loading versus correlation: an essential qualification

**From the lecture, p. 1:** Loadings are described as correlations between observed variables and factors. This is exactly the usual interpretation **when both observed variables and factors are standardised and the factors are orthogonal** (with the standard factor-model assumptions).

**Teaching extension:** With **oblique factors**, the coefficient in the **pattern matrix** is generally *not* the marginal correlation between a variable and a factor. That correlation is given by the **structure matrix**. The distinction is derived in Section 8. It matters whenever you interpret oblimin or another correlated-factor solution.

---

# 6. The four extraction methods in the lecture

**From the lecture, pp. 1–2:** The first listed stage is to calculate the **initial factor loadings**. Although p. 1 introduces “two commonly used methods,” p. 2 actually describes **four**: principal-components-based extraction, principal-axis factoring (PAF), maximum likelihood (ML), and minimum residual (MINRES). All four are covered here.

**Extraction** means selecting a mathematical approach for estimating a low-dimensional solution from the observed relationships. The methods can produce different answers because they optimise different targets or make different assumptions.

## 6.1 Principal-components-based extraction

**From the lecture, p. 2:** This approach is inspired by PCA and mathematically related to eigenvectors of the correlation matrix. It seeks to explain **total variance**, not to separate the common part from the unique/error part. It is therefore not a true common-factor model, although it can be used in exploratory work. Its extracted components are not conceptually the same as latent factors in PAF.

**Teaching extension: eigenvalues and eigenvectors, with almost no prerequisites.** Imagine a collection of points. Some directions through the point cloud show greater spread than others. An **eigenvector** describes a special direction, and its associated **eigenvalue** describes the amount of variance of the data along that principal direction when using the correlation/covariance matrix.

For a correlation matrix \(R\), the mathematical statement is

\[
R\mathbf v_j=d_j\mathbf v_j,
\]

where \(\mathbf v_j\) is an eigenvector and \(d_j\) its eigenvalue. In PCA, the loading matrix associated with retained components can be written using the retained eigenvectors and the square roots of their eigenvalues:

\[
L_{\mathrm{PCA}}=V_mD_m^{1/2}.
\]

Here \(V_m\) collects \(m\) eigenvectors, and \(D_m\) is a diagonal matrix containing their eigenvalues. This calculation is part of PCA's explanation of **total variation**; it does not by itself identify an error-free latent cause.

### Why “total variance” is important

For a standardised variable,

\[
\underbrace{1}_{\text{total variance}}
=\underbrace{h_i^2}_{\text{common variance}}
+\underbrace{u_i^2}_{\text{unique variance}}
\]

under the common-factor model. PCA does not explicitly estimate this decomposition. It operates on the total variances, represented by 1s on the diagonal of the correlation matrix.

## 6.2 Principal-axis factoring (PAF; principal-factor method)

**From the lecture, p. 2:** PAF targets **common variance**, excluding unique and error variance from what it aims to explain. It often starts by replacing the diagonal 1s in the correlation matrix with initial estimates of communalities and then iteratively updates the loadings. It fits the conceptual idea of latent influences driving several observed outcomes more closely than PCA.

The conceptual steps are:

1. Start with the observed correlation matrix \(R\).
2. Estimate how much of each variable's variance is **shared** with other variables.
3. Replace the diagonal 1s with these initial communality estimates to make a **reduced correlation matrix**.
4. Extract factors using the reduced matrix.
5. Recalculate communalities from the estimated loadings and iterate until the solution stabilises according to the algorithm.

**Teaching extension: one possible initial communality.** A commonly used starting estimate is the squared multiple correlation (SMC): predict one variable using **all the others**, and take the resulting multiple \(R^2\) as an estimate of how much of its variation is shared. This is an initial estimate, not a guarantee that the final factor model will have exactly that communality.

For a toy three-variable example, suppose the initial communalities are

\[
(h_1^2,h_2^2,h_3^2)=(0.65,0.55,0.45).
\]

Then the corresponding reduced correlation matrix could look like

\[
R_{\mathrm{reduced}}=
\begin{pmatrix}
\mathbf{0.65}&0.60&0.45\\
0.60&\mathbf{0.55}&0.40\\
0.45&0.40&\mathbf{0.45}
\end{pmatrix}.
\]

The **bold diagonal** contains estimated communalities rather than the original diagonal 1s. The numbers are illustrative, not reported by the lecturer, and are not a worked final PAF solution. Actual algorithms have safeguards and details not captured by this simplified sketch.

### When can PCA and PAF look alike?

**From the lecture, p. 2:** They may look similar when variables are strongly intercorrelated or the variable set is large. **Similarity of a numerical result does not erase the conceptual difference.** PCA decomposes total variance; PAF models the shared part.

The lecture also notes that the initial unrotated solutions of these approaches are orthogonal by default. Later an oblique rotation may permit correlations between the interpreted factors. No claim that the real-world constructs are inherently independent follows from the initial computational orientation.

## 6.3 Maximum-likelihood factor analysis (ML)

**From the lecture, p. 2:** ML chooses loading estimates that make the observed correlation structure likely under the proposed factor model. Standard ML factor analysis assumes **multivariate normality** of the observed variables. Advantages include goodness-of-fit testing, confidence intervals for loadings, and comparison of models. It can be used for exploratory or confirmatory analysis, but standard normal-theory ML is sensitive to assumption violations, especially for ordinal or very skewed data.

### What does “likelihood” mean?

**Teaching extension.** Imagine proposing two candidate sets of factor loadings. Under one, the model predicts correlations very similar to those seen in the sample; under another, the implied correlations differ substantially. ML estimates parameters that maximise the probability **density of the observed sample under the specified statistical model**, not merely the visible closeness of two printed matrices.

Formally, under a multivariate normal model with fitted covariance matrix \(\Sigma(\theta)\), ML chooses parameters \(\theta\) to maximise

\[
L(\theta)=\prod_{k=1}^n f\bigl(\mathbf x_k;\boldsymbol\mu,\Sigma(\theta)\bigr),
\]

where \(f\) is the normal density. Computational methods usually minimise the **negative log-likelihood** instead; both optimisation goals are equivalent.

### What is multivariate normality?

It means that the *joint distribution* of the observed numeric variables follows a multivariate normal distribution. Having roughly bell-shaped distributions **one variable at a time** does not, by itself, establish joint normality. Multivariate normality is stronger than separate univariate normality checks.

### What can ML output tell us?

- **Chi-square model-fit test:** compares the factor model with a less constrained covariance model. A small p-value indicates evidence that the restricted factor model fits poorly, under the testing assumptions. A large p-value means the test did not detect substantial misfit; it is not proof the model is correct.
- **Confidence interval:** gives a range for a population parameter, under a stated model and method. Confidence intervals are not provided automatically by every R function; extra procedures/software may be necessary.
- **Model comparison:** tests whether additional factors or changed restrictions improve fit. Differences must be interpreted with the appropriate statistical conditions, not as an automatic command to add factors.

**Careful qualification:** “ML assumes normality” describes the *standard normal-theory ML estimator*. Alternative estimators or robust corrections exist, but they are not specified in the four-page lecture and are beyond the required source content.

## 6.4 Minimum residual (MINRES) extraction

**From the lecture, p. 2:** MINRES estimates loadings by minimising the **sum of squared off-diagonal residuals** between the observed and model-implied correlation matrices. It does not require multivariate normality and is presented as a useful alternative for non-normal, psychometric, or ordinal measurements, including small-sample applications.

### What is a residual in this context?

A residual is the difference between the correlation observed in the data and the correlation predicted by the model:

\[
E_{ij}=r_{ij}-\widehat r_{ij}.
\]

MINRES focuses on off-diagonal correlations; its objective can be represented as

\[
\boxed{\min_{\Lambda}\sum_{i<j}(r_{ij}-\widehat r_{ij})^2.}
\]

Equivalent implementations may sum over both \(i\ne j\), changing the objective by a constant factor. The diagonal terms \(i=j\) are not part of the displayed residual objective.

**Worked numerical illustration.** Suppose three observed correlations are 0.70, 0.40, and 0.30, while the model predicts 0.65, 0.35, and 0.25:

| Pair | Observed \(r\) | Predicted \(\widehat r\) | Residual | Squared residual |
|---|---:|---:|---:|---:|
| A–B | 0.70 | 0.65 | 0.05 | 0.0025 |
| A–C | 0.40 | 0.35 | 0.05 | 0.0025 |
| B–C | 0.30 | 0.25 | 0.05 | 0.0025 |
| **Total** | | | | **0.0075** |

A hypothetical alternative model with a smaller total squared residual would fit these off-diagonal correlations more closely. This table demonstrates the **objective**, not a full optimisation algorithm.

**Important qualification.** MINRES does not require *multivariate normality for its extraction objective*. That does **not** make a small sample automatically adequate, nor does it make uncorrected Pearson correlations ideal for ordinal items. For ordinal responses, the **choice of correlation matrix** and the **choice of extraction method** are separate decisions; one may use polychoric correlations followed by MINRES.

## 6.5 Side-by-side comparison

| Method in the PDF | Main target | A particularly important feature | A major caution |
|---|---|---|---|
| Principal-components-based | Total variance | Uses the PCA eigenstructure; useful for summarising total variation | Not a common-factor model that separates unique variance |
| Principal-axis factoring | Common/shared variance | Estimates communalities iteratively | Results depend on data quality and chosen factor count |
| Maximum likelihood | Factor covariance model via likelihood | Supports model-based inference and fit assessment | Standard inference relies on distributional assumptions |
| Minimum residual | Minimise squared off-diagonal correlation residuals | Avoids normal-theory likelihood requirement | Non-normality tolerance does not cure poor correlations or tiny samples |

**A sensible method choice, as teaching advice rather than a rule from the PDF:** When the goal is to model latent constructs, PAF and MINRES are natural general-purpose EFA estimators. Normal-theory ML is attractive if its assumptions are sufficiently credible and formal inference is important. PCA should be selected intentionally when total-variance data reduction, rather than a common-factor interpretation, is the true goal.

---
# 7. Rotation: making the factors easier to interpret

**From the lecture, pp. 2–3:** The second main stage is to **rotate factor loadings**. Rotation is intended to produce a simpler, clearer pattern: ideally a variable has a large positive or negative loading on one factor and small loadings on the others. The lecturer describes clusters of strongly related variables and distinguishes **orthogonal** from **oblique** rotation.

## 7.1 Why do we need rotation after extraction?

The mathematical direction of an initially extracted factor need not match the most meaningful business interpretation. An unrotated solution might mix several kinds of questions into both factors, even when a clearer division is possible.

Imagine a two-dimensional map of customers. You can turn the coordinate axes without changing the customers' positions relative to one another. In a factor model, rotation changes the **description of the factors**, seeking axes that align more clearly with variable clusters.

The desired pattern is sometimes called a **simple structure**:

- An item associated with service should have a large loading on a service factor.
- That same item should have a small loading on unrelated factors.
- Several other service items should show a similar pattern.
- Interpretability matters alongside numerical model fit; rotation cannot rescue a fundamentally unsuitable dataset.

A loading of \(-0.80\) is **large in magnitude** and may strongly define a factor, even though it is negative. The minus sign tells you the direction of association, not that the item is unimportant.

## 7.2 Orthogonal rotation and varimax

**From the lecture, p. 3:** Orthogonal rotation keeps the factors uncorrelated, geometrically maintaining right angles (90°) between factor axes. **Varimax** is the commonly used example; it maximises the variability of **squared loadings within factors** to obtain a clearer loading pattern.

### Geometry in one small calculation

**Teaching extension.** Suppose two variables have initial loadings

\[
A=(0.60,\;0.60),\qquad B=(0.60,\;-0.60).
\]

Both have magnitudes spread across two factors. An orthogonal change of coordinates can re-express them approximately as

\[
A'=(0.849,\;0),\qquad B'=(0,\;0.849).
\]

The first variable is now strongly associated with one axis, the second with the other. Notice that each variable's total squared loading is preserved:

\[
0.60^2+0.60^2=0.72\approx0.849^2+0^2.
\]

**This is a geometric teaching illustration, not a claim that varimax must return exactly these numbers.** It demonstrates how a reorientation can make existing structure easier to read.

### Does orthogonal mean “independent”?

The lecture uses “uncorrelated” and “independent” in its explanation of orthogonal factors. In general statistical language, **zero correlation does not necessarily imply independence**. For the practical EFA interpretation, the critical property is that an orthogonal rotation constrains the factors to **zero correlation**; independence additionally requires distributional conditions.

### Why does varimax work with squared loadings?

Squaring a loading makes both \(+0.8\) and \(-0.8\) contribute a large amount (0.64), while a loading of 0.1 contributes little (0.01). Varimax seeks a pattern in which, for each factor, some variables have comparatively large squared loadings and others small ones. It does **not** force every loading to be exactly 0 or 1.

## 7.3 Oblique rotation and direct oblimin

**From the lecture, p. 3:** Oblique rotation allows factors to **correlate**, represented geometrically by axes that need not remain at 90°. **Direct oblimin** is a commonly used example. Oblique rotation produces a **pattern matrix** and a **structure matrix**.

This is often realistic in business: customers who rate service highly might also tend to perceive good value. Likewise, students who demonstrate stronger quantitative skills might also demonstrate stronger general study skills. Those constructs need not be completely separate.

Choosing oblique rotation does **not** assume that the factors actually correlate strongly. It lets the data estimate that relationship. If their estimated correlation is near zero, an orthogonal solution may also be interpretable.

## 7.4 Pattern matrix versus structure matrix

This is one of the most important technical differences between orthogonal and oblique EFA.

**Teaching extension.** For an oblique model, let

\[
\Lambda=\begin{pmatrix}
0.80&0\\
0.75&0.05\\
0.05&0.70
\end{pmatrix},
\qquad
\Phi=\begin{pmatrix}1&0.30\\0.30&1\end{pmatrix}.
\]

The **pattern matrix** \(\Lambda\) contains the coefficients directly relating each variable to each factor **while accounting for the other factors in the model**. The **structure matrix** contains correlations between variables and factors and, for standardised variables/factors under the usual assumptions, is

\[
\boxed{S=\Lambda\Phi.}
\]

Multiplying gives

\[
S=
\begin{pmatrix}
0.80&0.24\\
0.765&0.275\\
0.26&0.715
\end{pmatrix}.
\]

Follow just the first row:

\[
(0.80,0)\begin{pmatrix}1&0.30\\0.30&1\end{pmatrix}
=(0.80,\;0.24).
\]

- The **pattern** says variable 1 connects directly to factor 1, with a coefficient of 0.80, and has no direct coefficient on factor 2.
- The **structure** says variable 1 nonetheless correlates 0.24 with factor 2, because the **two factors correlate**.

Neither matrix is a mistake. They describe different relationships. For identifying which factor an item belongs to, the **pattern matrix** is commonly the primary table; the structure matrix and factor-correlation matrix help explain indirect associations.

**Do not calculate oblique communalities by squaring and adding a pattern row.** Use \(\Lambda\Phi\Lambda^{\mathsf T}\), as demonstrated in Section 5.

## 7.5 Does rotation change model fit?

**From the lecture, p. 2:** Rotation improves interpretation **without changing the underlying model fit**. In an exact mathematical reparameterisation with the same number of factors and the same reproduced covariance matrix, this statement is correct.

For orthogonal factors, the model-implied common covariance is \(\Lambda\Lambda^{\mathsf T}\). If \(Q\) is an orthogonal rotation matrix (\(QQ^{\mathsf T}=I\)), then

\[
(\Lambda Q)(\Lambda Q)^{\mathsf T}
=\Lambda QQ^{\mathsf T}\Lambda^{\mathsf T}
=\Lambda\Lambda^{\mathsf T}.
\]

Thus the reproduced common covariance is unchanged. Oblique rotations also re-express the same solution when loadings and factor correlations are transformed consistently. Small numerical differences can occur because software optimisers use different approximations or conventions; these are not the conceptual point of rotation.

## 7.6 Naming factors responsibly

Suppose the strongest pattern loadings are:

| Question | Factor 1 | Factor 2 |
|---|---:|---:|
| Staff explain clearly | 0.83 | 0.04 |
| Staff respond quickly | 0.78 | 0.07 |
| Staff solve problems | 0.76 | −0.03 |
| Prices are reasonable | 0.06 | 0.81 |
| Discounts are valuable | −0.01 | 0.74 |
| Products are worth their price | 0.09 | 0.79 |

**Teaching example only.** Naming factor 1 **service quality** and factor 2 **perceived value** seems reasonable because the item *meanings* align with the numerical pattern. Do not name a factor just by looking at the magnitude or position of its column: interpret **all strongly associated items**, watch for negatively worded questions, and check whether any item loads substantially on multiple factors.

Factor numbers, signs, and column order have no inherent meaning: a program may reverse the sign of a factor or swap factor 1 and factor 2 while representing the same underlying solution.

---

# 8. How many factors should we retain?

**From the lecture, p. 3:** Before estimating factor scores, determine the number of retained factors \(m\). The PDF describes three common approaches: a target share of explained variance (illustratively **80%**), the **Kaiser eigenvalue-greater-than-one rule** for correlation-matrix analysis, and an **elbow in the scree plot**. It notes that some packages such as SPSS require the number to be specified before extraction and that the Kaiser rule is frequently used.

**Teaching extension:** A careful workflow decides the intended factor count **before fitting and interpreting the final model**. It can use preliminary correlations/eigenvalues and alternative model fits. The lecture's presentation places this decision immediately before scores; in actual software, the number of factors is generally an **input to extraction** and can be reconsidered as you evaluate results.

## 8.1 Eigenvalues: what a value of 1 represents

With \(p\) standardised variables, the correlation matrix has total variance

\[
\operatorname{trace}(R)=p,
\]

which also equals the sum of its \(p\) eigenvalues:

\[
\sum_{j=1}^{p}d_j=p.
\]

The average eigenvalue is therefore \(p/p=1\). An eigenvalue of 1 corresponds to one original standardised variable's worth of **total variance** in the PCA decomposition.

## 8.2 The Kaiser criterion

The **Kaiser rule** says retain components/factors associated with eigenvalues **strictly greater than 1**, when working with a correlation matrix.

*Illustration.* Suppose six variables have correlation-matrix eigenvalues

\[
2.76,\quad1.80,\quad0.36,\quad0.36,\quad0.36,\quad0.36.
\]

Exactly **two eigenvalues exceed 1**, so the Kaiser rule recommends **two**.

**Important qualification.** The rule is a heuristic. It can choose too many or too few factors, especially when the number of variables, communalities, or sample size is unfavourable. Applying the rule mechanically to eigenvalues from a reduced common-factor matrix is not the same as applying it to ordinary correlation-matrix eigenvalues. Be precise about what matrix and method produced the eigenvalues.

## 8.3 Cumulative explained variance and the illustrative 80% target

For PCA using the complete correlation matrix,

\[
\text{Percentage explained by component }j=\frac{d_j}{p}\times100\%.
\]

Using the six eigenvalues above:

| Component | Eigenvalue | % of total variance | Cumulative % |
|---|---:|---:|---:|
| 1 | 2.76 | 46% | 46% |
| 2 | 1.80 | 30% | 76% |
| 3 | 0.36 | 6% | 82% |
| 4 | 0.36 | 6% | 88% |
| 5 | 0.36 | 6% | 94% |
| 6 | 0.36 | 6% | 100% |

A **strict 80% total-variance target** selects **three components** because two explain only 76%, while three explain 82%. The **Kaiser criterion selects two**. This deliberate disagreement teaches an important lesson: **factor-retention rules can lead to different recommendations**.

The lecturer's 80% is an **example** of a chosen target, not a universal mathematical requirement.

### A subtle but crucial warning: PCA variance versus EFA variance

The cumulative sum of **ordinary correlation-matrix eigenvalues** divided by \(p\) is a standard measure for **PCA's total explained variance**. In common-factor EFA, the relevant shared-variance interpretation depends on the extraction method and estimated communalities. Do not automatically equate a “76% PCA total variance” calculation with “76% of common variance explained by latent factors.”

An EFA output may show an estimated sum of squared loadings, a share of total variance, or a share of **common variance**, depending on its conventions. Always read the column heading and the extraction method before explaining a percentage.

## 8.4 Scree plot and the elbow

A **scree plot** puts eigenvalues on the vertical axis and component/factor order on the horizontal axis. A large drop followed by a much flatter tail suggests that later components mostly account for smaller leftover variation.

Using our numbers, the line drops sharply from 2.76 to 1.80, then to 0.36, and becomes flat. A natural elbow is **after the second component**. This supports the two-factor interpretation.

A scree plot is a visual judgement, not an algorithm with a universally agreed answer. If eigenvalues decline gradually rather than creating an obvious elbow, different analysts may disagree.

## 8.5 A useful additional method: parallel analysis

**Teaching extension, not in the PDF.** Parallel analysis compares observed-data eigenvalues with eigenvalues arising from appropriately generated random data of similar size. If an observed eigenvalue is not convincingly larger than what random data might produce, its apparent importance may be misleading.

For practical EFA, parallel analysis is often worth considering **alongside** the lecture's Kaiser and scree criteria. The exact implementation should correspond to the method and data type, such as PCA versus common-factor analysis and Pearson versus polychoric input.

## 8.6 A reasoned decision, not a single magic cutoff

A defensible factor count should balance:

1. How many factors are suggested by eigenvalues, scree shape, and, if used, parallel analysis.
2. Whether a proposed solution explains the pattern of correlations adequately.
3. Whether items have reasonable communalities and a clear loading pattern.
4. Whether each factor has enough substantive indicators to be interpreted reliably.
5. Whether the resulting factors correspond to credible business concepts, rather than arbitrary labels.

Retaining extra factors merely to reach an 80% PCA variance target can damage a meaningful **common-factor** solution; the six-variable worked model in Section 11 makes this distinction concrete.

---

# 9. Factor scores: giving an estimated factor value to each observation

**From the lecture, p. 3:** After the number of factors is decided and the model estimated, factor scores may be calculated for the individual observations. The PDF describes the frequently used **regression-based method**, which forms weighted linear combinations of the observed variables.

## 9.1 Three tables, three different meanings

| Object | Typical size | What one number means |
|---|---|---|
| Original dataset | \(n\times p\) | A customer's answer to a particular survey item |
| Factor loading matrix | \(p\times m\) | How strongly a survey variable relates to a factor |
| Factor-score table | \(n\times m\) | Where a particular customer is estimated to lie on a factor |

If you have 400 customers and two retained factors, you can obtain an estimated \(400\times2\) score table. A customer might have \(+0.70\) on service quality and \(-0.45\) on perceived value. The meaning of positive and negative depends on factor orientation; the score scales are usually centred in a way that makes **relative comparisons** useful.

## 9.2 How does regression scoring work?

**Teaching extension.** The scores are commonly estimated from **standardised observed values** using coefficients that depend on the full fitted factor model.

For example, suppose the estimated scoring formula for one factor is

\[
\widehat F_1=0.40Z_1+0.35Z_2+0.25Z_3.
\]

For a customer with \(Z_1=1.2\), \(Z_2=0.6\), and \(Z_3=-0.4\),

\[
\begin{aligned}
\widehat F_1
&=0.40(1.2)+0.35(0.6)+0.25(-0.4)\\
&=0.48+0.21-0.10\\
&=\boxed{0.59}.
\end{aligned}
\]

The customer's estimated position is moderately above the factor's reference centre **under this illustrative scoring rule**. The weights are invented and are not automatically equal to the factor loadings.

### Where the weights come from

For standardised observed variables under a fitted model with covariance matrix \(\Sigma\), loadings \(\Lambda\), and factor correlation matrix \(\Phi\), the best **linear** predictor of the factors, using the model's second moments, takes the form

\[
\boxed{\widehat{\mathbf f}_{\mathrm{reg}}
=\Phi\Lambda^{\mathsf T}\Sigma^{-1}\mathbf z.}
\]

For orthogonal factors, \(\Phi=I\), so this reduces to \(\Lambda^{\mathsf T}\Sigma^{-1}\mathbf z\). Under a joint-normal model, this predictor also equals the conditional mean \(E(\mathbf f\mid\mathbf z)\).

This formula is provided to **explain why factor-score weights involve the entire correlation structure**. It is not necessary to compute inverse matrices by hand for introductory applications. Statistical software does it for you.

## 9.3 Why factor scores are estimates, not direct measurements

Latent factors are never observed as columns in the original data. Their individual scores are estimated using model assumptions and observed answers. There is **factor-score indeterminacy**: a fitted covariance model generally does not uniquely reveal the exact latent values of each individual.

Therefore:

- Different scoring methods may produce somewhat different scores.
- A person with a high factor score is high **relative to the model's chosen orientation and scale**, not necessarily “good” in any absolute sense.
- A loading is a property of a **variable** in a fitted model; a score is a property of an **observation** estimated from that model.
- Factor scores can be used for exploration, grouping, and some later analyses, but their uncertainty and sample dependence should not be ignored.

**Practical example:** You might use factor scores to compare customer groups or create broad service/value profiles. Do not turn them into an automatic decision about an individual's eligibility or worth without appropriate validation and attention to fairness.

---

# 10. Checking suitability: KMO and Bartlett's test

**From the lecture, p. 4:** Before running factor analysis, check the suitability of the dataset. Two key diagnostics are the **Kaiser–Meyer–Olkin (KMO) measure of sampling adequacy** and **Bartlett's test of sphericity**. The PDF gives **KMO greater than 0.60** as generally acceptable and **Bartlett p-value below 0.05** as evidence that the correlation matrix differs from an identity matrix.

## 10.1 KMO: do the observed relationships resemble common-factor relationships?

KMO compares the size of observed correlations with the size of **partial correlations**. Partial correlation asks: after adjusting for the other observed variables, how much direct pairwise association remains?

Why is that useful? If a few common influences really explain many relationships, then adjusting for the other variables should reduce many pairwise correlations. In that situation, ordinary correlations tend to be substantial while partial correlations tend to be comparatively small. KMO will be higher.

The overall statistic can be written as

\[
\boxed{
\mathrm{KMO}
=\frac{\sum_{i<j}r_{ij}^{2}}
{\sum_{i<j}r_{ij}^{2}+\sum_{i<j}q_{ij}^{2}}
}
\]

where \(r_{ij}\) is an ordinary correlation and \(q_{ij}\) is the partial correlation between variables \(i\) and \(j\), controlling for the other variables. Software may use equivalent summation conventions.

### Worked KMO calculation

**Teaching illustration, not a lecturer example.** Imagine three variables with every pairwise correlation equal to 0.60:

\[
R=\begin{pmatrix}
1&0.60&0.60\\
0.60&1&0.60\\
0.60&0.60&1
\end{pmatrix}.
\]

In this symmetric example, the partial correlation between any pair **controlling for the remaining third variable** equals

\[
q=\frac{0.60-(0.60)(0.60)}
{\sqrt{[1-0.60^2][1-0.60^2]}}
=\frac{0.24}{0.64}=0.375.
\]

There are three distinct pairs. Consequently,

\[
\begin{aligned}
\mathrm{KMO}
&=\frac{3(0.60^2)}{3(0.60^2)+3(0.375^2)}\\
&=\frac{1.08}{1.08+0.421875}\\
&=\boxed{0.7191}.
\end{aligned}
\]

By the PDF's **0.60** guideline, this example would be considered acceptable in terms of the KMO statistic.

### Practical KMO interpretation

| KMO value | How to react |
|---|---|
| Below 0.60 | Below the lecture's general acceptability guideline; investigate the variable set and correlations. |
| Above 0.60 | Meets the lecture's general guideline; other suitability checks are still needed. |
| Closer to 1 | Indicates a more favourable relationship between ordinary and partial correlations, all else equal. |

KMO is a **diagnostic statistic**, not a guarantee of sufficient sample size or valid substantive conclusions. Some software also gives **individual-variable MSA/KMO values**, useful for spotting items that weaken the common-factor structure. Removing variables should be justified by both measurement theory and diagnostics rather than by chasing a cutoff.

## 10.2 Bartlett's test: is the correlation matrix just the identity matrix?

The **identity matrix** has 1s on the diagonal and 0s everywhere else:

\[
I_3=\begin{pmatrix}
1&0&0\\
0&1&0\\
0&0&1
\end{pmatrix}.
\]

If a population correlation matrix is the identity, the variables have no pairwise linear correlations. Such data generally provide little shared correlation for conventional factor analysis to explain.

Bartlett's test has the hypotheses

\[
H_0: R_{\mathrm{population}}=I,
\qquad
H_1: R_{\mathrm{population}}\ne I.
\]

- **p-value below 0.05:** reject \(H_0\); there is statistical evidence that the correlation matrix is **not** the identity.
- **p-value at least 0.05:** do not reject \(H_0\); the test has not supplied strong enough evidence against identity at this significance level.

**Important:** rejecting identity does not automatically establish a useful number of factors, high communalities, a clear pattern, causation, or a good-fitting EFA model.

### Where does its test statistic come from?

**Teaching extension.** A commonly used approximation for \(p\) variables and \(n\) independent observations is

\[
\boxed{
\chi^2\approx-\left(n-1-\frac{2p+5}{6}\right)\ln|R|,
\qquad df=\frac{p(p-1)}{2}.
}
\]

Here \(|R|\) is the **determinant** of the sample correlation matrix and \(\ln\) is the natural logarithm. The formula relies on regularity and distributional assumptions, especially for the usual chi-square approximation; it cannot be used if the required determinant or matrix conditions fail.

#### A numerical illustration

Use the same hypothetical three-variable correlation matrix with all pairwise correlations 0.60. Its determinant is

\[
|R|=(1-0.60)^2(1+2(0.60))=0.16(2.20)=0.352.
\]

Suppose **hypothetically** that it came from \(n=100\) independent observations. Then

\[
\begin{aligned}
\chi^2
&\approx-\left(100-1-\frac{11}{6}\right)\ln(0.352)\\
&\approx\boxed{101.45},
\end{aligned}
\]

with \(df=3(2)/2=3\). The associated chi-square upper-tail p-value is approximately \(7.6\times10^{-22}\), far below 0.05. The matrix would be judged **significantly different from identity** under the test assumptions. This is a **constructed mathematical illustration**, not an empirical result from the lecture or a real sample.

### The role of sample size

Bartlett's p-value is affected by \(n\). With a very large sample, even fairly small correlations can produce a significant result. With a small sample, an apparently meaningful pattern may fail to reach statistical significance. Always inspect the **strength and pattern** of correlations alongside the p-value.

## 10.3 KMO and Bartlett answer different questions

| Diagnostic | Main question | PDF's rule of thumb | What it cannot establish |
|---|---|---|---|
| KMO | Are ordinary correlations comparatively large relative to partial correlations? | KMO \(>0.60\) usually acceptable | Correct factor count, sample-size adequacy on its own, or valid construct meaning |
| Bartlett | Is there evidence that the population correlation matrix differs from the identity? | \(p<0.05\) suggests useful interrelatedness | Clear common factors, strong loadings, or good model fit |

### Simple exam-style interpretations

*If KMO = 0.74 and Bartlett p = 0.002:* “KMO exceeds 0.60 and Bartlett's test is significant at the 5% level. These results support proceeding to examine factor analysis, subject to the remaining assumptions and diagnostics.”

*If KMO = 0.47 and Bartlett p = 0.001:* “Although the correlation matrix differs significantly from identity, KMO is below 0.60. The shared correlation structure may not be suitable for a stable, interpretable factor solution. Investigate before proceeding.”

*If KMO = 0.81 and Bartlett p = 0.31:* “KMO is favourable, but Bartlett's test has not rejected identity. The checks give mixed evidence. Examine sample size, correlations, variable selection, and test assumptions rather than claiming the data are suitable without qualification.”

## 10.4 Checks worth making in addition to the two named in the PDF

**Teaching extension, not additional remarks from the lecturer.** Consider data completeness, nonconstant variables, obvious outliers, linearly related indicators, stable correlations, suitable sample size relative to complexity, plausible factor interpretability, and excessively high correlations that may make the correlation matrix singular. A significant Bartlett test and acceptable KMO cannot replace these checks.

---
# 11. One complete worked example connecting the whole chapter

This is a **constructed teaching example**, not data or calculations from *Lec5Extra.pdf*. It deliberately has simple numbers so that you can verify what each method means.

## 11.1 The model behind six survey questions

Assume six **standardised** observed variables, Q1–Q6. The first three measure service; the last three measure value. Suppose the true factor model has loadings

\[
\Lambda=
\begin{pmatrix}
0.80&0\\0.80&0\\0.80&0\\
0&0.80\\0&0.80\\0&0.80
\end{pmatrix}
\]

and factor correlation matrix

\[
\Phi=\begin{pmatrix}
1&0.25\\0.25&1
\end{pmatrix}.
\]

Here service quality and perceived value correlate at 0.25. Each observed variable has communality \(0.8^2=0.64\) and uniqueness \(1-0.64=0.36\).

The uniqueness matrix is therefore

\[
\Psi=0.36I_6.
\]

## 11.2 Predict the correlations without any software

For Q1 and Q2, both of which load 0.80 on service,

\[
\operatorname{Corr}(Q1,Q2)=0.80\times0.80=0.64.
\]

For Q1 and Q4, which load on different but correlated factors,

\[
\operatorname{Corr}(Q1,Q4)
=0.80\times0.25\times0.80
=0.16.
\]

The resulting population correlation matrix is

\[
\boxed{
R=\begin{pmatrix}
1&.64&.64&.16&.16&.16\\
.64&1&.64&.16&.16&.16\\
.64&.64&1&.16&.16&.16\\
.16&.16&.16&1&.64&.64\\
.16&.16&.16&.64&1&.64\\
.16&.16&.16&.64&.64&1
\end{pmatrix}.
}
\]

**Read the pattern before doing calculations:** each group of three items is strongly correlated internally (0.64). Items from different groups correlate more weakly (0.16), as expected because the underlying factors themselves are related but not identical.

## 11.3 Look for factors using eigenvalues

For this specially structured matrix, the six eigenvalues can be calculated exactly:

\[
\boxed{2.76,\;1.80,\;0.36,\;0.36,\;0.36,\;0.36.}
\]

Their sum is

\[
2.76+1.80+4(0.36)=6,
\]

as required for a six-variable correlation matrix. The Kaiser criterion retains **two** components; the scree plot shows a sharp drop after two. The first two PCA components account for

\[
\frac{2.76+1.80}{6}=\frac{4.56}{6}=\boxed{76\%}
\]

of the **total** standardised variance.

## 11.4 Now interpret the same example as a common-factor model

The true common-factor part is

\[
\Lambda\Phi\Lambda^{\mathsf T};
\]

its diagonal entries are each 0.64. So the combined amount of variance attributed to the two common factors across all six variables is

\[
6(0.64)=3.84,
\]

or

\[
\frac{3.84}{6}=\boxed{64\%}
\]

of the six variables' **total** standardised variances, in aggregate.

Notice the important contrast:

- **76%:** total variance explained by the **first two principal components** of the constructed correlation matrix.
- **64%:** total variance attributable to the **two true common factors** of the deliberately constructed generative model.

The values differ **without contradiction**. The two analyses target different kinds of variance. Since the constructed model has exactly two common factors, the same two factors explain **all the common variance specified by that model** (3.84 out of 3.84), even though they do not explain 100% of total observed variance.

## 11.5 Interpret the rotated factor model

An oblique solution closely matching the generating model would show a pattern approximately like this:

| Question group | Pattern loading on service | Pattern loading on value |
|---|---:|---:|
| Q1–Q3 | 0.80 | 0 |
| Q4–Q6 | 0 | 0.80 |

Since \(\Phi_{12}=0.25\), the structure correlation of a service question with the **value factor** is \(0.80(0.25)=0.20\), even though its pattern loading on value is zero. This makes the difference between pattern and structure matrices tangible.

## 11.6 An individual observation

Suppose a hypothetical customer's actual underlying factor values are

\[
F_{\mathrm{service}}=0.50,\qquad F_{\mathrm{value}}=-1.00.
\]

Ignoring that customer's unique components momentarily, the model predicts:

\[
\widehat{Q1}=\widehat{Q2}=\widehat{Q3}=0.80(0.50)=0.40,
\]

\[
\widehat{Q4}=\widehat{Q5}=\widehat{Q6}=0.80(-1.00)=-0.80.
\]

These predictions are on the variables' **standardised scales**. The actual answers would also include their unique components, and an analyst observing only Q1–Q6 would need to **estimate**, rather than directly know, the customer's factor scores.

## 11.7 What have we learned from the example?

We started with six observed measurements, identified two clusters of shared relationships, distinguished total from common variance, recognised why oblique rotation can make sense, and saw how the model describes both observed-variable relationships and potential individual factor scores. **That combination of mathematics and substantive interpretation is the purpose of EFA.**

---

# 12. Hands-on R laboratory: from dataset to interpretation

The PDF **does not contain R code or software output**. Every R example below is a **teaching extension** designed to implement its concepts. No printed results are presented as if the lecturer generated them. The synthetic-data exercise is reproducible through the stated random seed, although package versions and estimation details can affect output.

## 12.1 Re-create the exact six-variable correlation example using base R

This section needs **no extra R packages**.

```r
# Build the exact illustrative population correlation matrix.
R_model <- matrix(0.16, nrow = 6, ncol = 6)
R_model[1:3, 1:3] <- 0.64
R_model[4:6, 4:6] <- 0.64
diag(R_model) <- 1

names <- c("Clear", "Quick", "Solve", "Price", "Discount", "Worth")
dimnames(R_model) <- list(names, names)

print(R_model)

# Eigenvalues and PCA percentages, not EFA variance percentages.
eigenvalues <- eigen(R_model, symmetric = TRUE)$values
print(round(eigenvalues, 2))
print(round(100 * eigenvalues / sum(eigenvalues), 1))
print(round(100 * cumsum(eigenvalues) / sum(eigenvalues), 1))

plot(seq_along(eigenvalues), eigenvalues, type = "b",
     xlab = "Component number", ylab = "Correlation-matrix eigenvalue",
     main = "Scree plot: six-variable teaching model")
abline(h = 1, lty = 2)
```

**What to check:** the eigenvalues should appear as 2.76, 1.80, and four copies of 0.36, up to numerical rounding. The first two PCA percentages should add to 76%. This is a mathematical check against the deliberately defined matrix, **not an estimate of results from real customers**.

## 12.2 Create a synthetic dataset that resembles the model

The following code generates 600 fictional customers with two correlated latent factors and six observed variables. The values are continuous for now, so Pearson correlations are a reasonable illustration.

```r
set.seed(2451)
n <- 600

# Create two correlated latent factors.
f1 <- rnorm(n)
f2 <- 0.25 * f1 + sqrt(1 - 0.25^2) * rnorm(n)
F <- cbind(f1, f2)

# True loading matrix used only to GENERATE the synthetic dataset.
Lambda <- rbind(
  c(0.80, 0),
  c(0.80, 0),
  c(0.80, 0),
  c(0, 0.80),
  c(0, 0.80),
  c(0, 0.80)
)

Phi <- matrix(c(1, 0.25, 0.25, 1), 2, 2)
h2 <- diag(Lambda %*% Phi %*% t(Lambda))
uniqueness <- 1 - h2

E <- sweep(matrix(rnorm(n * 6), nrow = n, ncol = 6),
           2, sqrt(uniqueness), FUN = "*")

X <- F %*% t(Lambda) + E
colnames(X) <- c("Clear", "Quick", "Solve", "Price", "Discount", "Worth")
survey <- as.data.frame(X)

# These are sample correlations and will not equal the exact model values.
round(cor(survey), 2)
```

The **true** latent factors \(F\) exist in this simulation because we constructed them. In a real EFA dataset, you would **not** know them. We deliberately use the simulation to make the distinction between generating a factor and estimating it understandable.

## 12.3 Install the needed packages once

```r
# Run once if you do not have the packages already:
install.packages(c("psych", "GPArotation"))

# Load at the start of each new R session:
library(psych)
library(GPArotation)
```

`psych` provides EFA extraction, KMO, Bartlett, factor scores, parallel analysis, and polychoric correlation helpers. `GPArotation` supports rotation methods such as oblimin. Installing packages requires access to a suitable R package repository; the statistical examples themselves are generated locally.

## 12.4 Look at correlations, KMO, and Bartlett first

```r
R_sample <- cor(survey)
round(R_sample, 2)

psych::KMO(R_sample)
psych::cortest.bartlett(R_sample, n = nrow(survey))
```

**How to interpret the output:**

1. Inspect whether Clear/Quick/Solve correlate more strongly with one another than with Price/Discount/Worth.
2. Find the overall **MSA** returned by `KMO()`. Compare it with the lecturer's 0.60 guideline.
3. Find the p-value returned by `cortest.bartlett()`. Compare it with 0.05.
4. Do not stop here if either check looks favourable. The factor solution must still make sense.

For extra mathematical practice, you can also calculate KMO on the exact three-variable example from Section 10:

```r
R_three <- matrix(0.60, nrow = 3, ncol = 3)
diag(R_three) <- 1
psych::KMO(R_three)
# Overall MSA should be close to 0.7191.
```

## 12.5 Decide how many factors to investigate

Start by examining ordinary correlation-matrix eigenvalues and the scree plot:

```r
ev <- eigen(R_sample, symmetric = TRUE)$values
print(round(ev, 3))
print(sum(ev > 1))    # Kaiser rule using correlation eigenvalues

plot(seq_along(ev), ev, type = "b",
     xlab = "Component number", ylab = "Eigenvalue",
     main = "Sample scree plot")
abline(h = 1, lty = 2)
```

An **additional** check, not specified in the lecture, is parallel analysis:

```r
set.seed(2451)
psych::fa.parallel(survey, fa = "fa", fm = "minres", n.iter = 30)
```

This carries out a factor-analysis-oriented parallel analysis. The simulation helps you decide whether the **two-factor** structure used to create the sample is supported. The plotted recommendation may depend on sampling variation and settings.

## 12.6 Compare extraction methods correctly

Here we request **two factors** with several alternatives:

```r
# Principal-axis factoring with orthogonal varimax rotation.
fit_pa <- psych::fa(survey, nfactors = 2,
                    fm = "pa", rotate = "varimax",
                    scores = "regression")

# Minimum residual with oblique oblimin rotation.
fit_minres <- psych::fa(survey, nfactors = 2,
                        fm = "minres", rotate = "oblimin",
                        scores = "regression")

# Maximum-likelihood factor extraction.
fit_ml <- psych::fa(survey, nfactors = 2,
                    fm = "ml", rotate = "oblimin")

# PCA is included for COMPARISON, not as a common-factor model.
fit_pca <- psych::principal(survey, nfactors = 2,
                            rotate = "varimax", scores = TRUE)

print(fit_pa$loadings, cutoff = 0.20, sort = FALSE)
print(fit_minres$loadings, cutoff = 0.20, sort = FALSE)
print(fit_ml$loadings, cutoff = 0.20, sort = FALSE)
print(fit_pca$loadings, cutoff = 0.20, sort = FALSE)
```

**What should you notice?** The survey was created using two groups of three items. If the analysis works well, the results should suggest two related dimensions. But finite-sample estimates and rotations will not reproduce the exact generating parameters perfectly. PCA and PAF may also give different loadings because they target different variance structures.

**Fair comparisons:** Since `fit_pa` and `fit_minres` use different rotations as written, their raw loading differences reflect **both extraction and rotation**. To isolate the extraction-method difference, refit with **the same rotation**, for example:

```r
pa_same <- psych::fa(survey, nfactors = 2,
                      fm = "pa", rotate = "oblimin")
minres_same <- psych::fa(survey, nfactors = 2,
                          fm = "minres", rotate = "oblimin")

print(pa_same$loadings, cutoff = 0.20)
print(minres_same$loadings, cutoff = 0.20)
```

## 12.7 Examine the pattern matrix, factor correlations, and communalities

```r
# The oblique solution's pattern coefficients.
print(fit_minres$loadings, cutoff = 0.20, sort = FALSE)

# Estimated correlations between the factors.
print(fit_minres$Phi)

# Structure matrix if this version of psych provides it.
if (!is.null(fit_minres$Structure)) {
  print(fit_minres$Structure)
}

# Communalities and remaining unique variances.
round(fit_minres$communality, 3)
round(fit_minres$uniquenesses, 3)
```

If the software output labels the loadings “ML1” and “ML2,” for example, the labels are software identifiers, not established business meanings. Name factors by inspecting the **items** and the pattern, such as “Service quality” and “Perceived value.”

For a check of the oblique formula, compare the structure matrix reconstructed from pattern loadings and factor correlations:

```r
pattern <- unclass(fit_minres$loadings)
structure_from_formula <- pattern %*% fit_minres$Phi
print(round(structure_from_formula, 3))

# Diagonal of Lambda Phi Lambda-transpose is fitted communality.
communalities_from_formula <- diag(
  pattern %*% fit_minres$Phi %*% t(pattern)
)
print(round(communalities_from_formula, 3))
```

Numerical agreement may depend on the software's reported scaling, rounding, and exact output conventions. The underlying **formula** is the important learning goal.

## 12.8 Estimate and interpret individual factor scores

The fitting call asked for regression scores because we gave `psych::fa()` the **raw observations**, rather than only a correlation matrix:

```r
head(fit_minres$scores)

# Put the estimated scores alongside the first few observed answers.
head(cbind(survey, fit_minres$scores))
```

Each **row** refers to one fictional customer; each score **column** is an estimated factor value. Check the loadings to decide whether larger scores correspond to more positive responses about service or value. If a program reverses a factor's sign, its scores and loadings may reverse together without changing the substantive solution.

You may compare the synthetic estimated scores against the known generated factors for *diagnosis*:

```r
# Only possible here because this is synthetic data.
cor(fit_minres$scores, F)
```

Interpret this cautiously. Columns can be swapped or signs reversed; therefore a negative correlation of large magnitude can represent a good match with the opposite chosen orientation. Never assume the true \(F\) values are available for genuine survey data.

## 12.9 Maximum likelihood using base R's `factanal()`

`stats::factanal()` is another way to demonstrate the **maximum-likelihood** approach:

```r
fit_base_ml <- stats::factanal(
  survey,
  factors = 2,
  rotation = "varimax",
  scores = "regression"
)

print(fit_base_ml)
print(fit_base_ml$loadings)
print(fit_base_ml$uniquenesses)
head(fit_base_ml$scores)
```

Examine the loadings and uniquenesses. The printed fit information may include a chi-square-based test of whether the requested model has a sufficient number of factors. That is a **factor-model fit test**, distinct from **Bartlett's pre-analysis sphericity test**. The two tests have different null hypotheses and should not be confused.

## 12.10 Work with ordinal Likert-style categories

Suppose our continuous simulated measurements were instead recorded as ordinal scores 1 to 5. This is a teaching device: real Likert responses have their own survey wording, behavioural distributions, and category boundaries.

```r
# Create five ordered response levels from the simulated numeric variables.
make_likert <- function(x) {
  as.integer(cut(x,
                 breaks = c(-Inf, -0.8, -0.2, 0.2, 0.8, Inf),
                 labels = FALSE))
}

ordinal_survey <- as.data.frame(lapply(survey, make_likert))

# Notice: Pearson and polychoric correlations need not be identical.
R_pearson_ordinal <- cor(ordinal_survey)
R_poly <- psych::polychoric(ordinal_survey)$rho

round(R_pearson_ordinal, 2)
round(R_poly, 2)

# Estimate an oblique common-factor model from the polychoric matrix.
fit_ordinal <- psych::fa(R_poly, nfactors = 2,
                         n.obs = nrow(ordinal_survey),
                         fm = "minres", rotate = "oblimin")

print(fit_ordinal$loadings, cutoff = 0.20)
```

**What changed?** You supplied an estimated **polychoric correlation matrix** rather than asking the factor extraction method to use raw ordinal scores as though they were continuous. The extraction method is still MINRES. Since `fit_ordinal` was fitted from **correlations alone**, the workflow above does **not** claim to calculate individual factor scores directly from that matrix.

Practical warnings:

- Polychoric correlation relies on an underlying threshold/normal-response model.
- Rare categories, small samples, or empty category combinations can create unstable estimates and warnings.
- Check whether the estimated polychoric matrix is positive definite and whether results are stable.
- Treat this as an introduction, not a proof that all five-point scales should always be treated identically.

---

# 13. Reading an EFA output and answering examination questions

## 13.1 A practical reading sequence

When handed a real EFA output, use this order:

1. **Identify the data and variables.** How many observations? Are indicators continuous or ordinal? Are they appropriate measures of proposed constructs?
2. **Inspect the correlation matrix.** Look for related groups and possible problematic near-duplicates.
3. **Read KMO and Bartlett.** Compare the values with the lecture's guidance, while remembering their limitations.
4. **State the retention decision.** Say how many factors you retained and why; specify whether eigenvalues are from a correlation matrix or an EFA method.
5. **State the extraction method.** Do not call PCA “PAF” or label the results simply “factor analysis” when the method matters.
6. **State the rotation method.** Use varimax for an orthogonal rotation, oblimin for an oblique one, or another stated method. Check any estimated factor correlations.
7. **Interpret the pattern of loadings.** Look at magnitude, sign, cross-loadings, and item meaning.
8. **Inspect communalities, uniquenesses, and fit/residual diagnostics.** A variable with weak common variance may not be represented well.
9. **Name factors cautiously.** Explanations should follow the items rather than precede the evidence.
10. **Interpret factor scores only if estimated.** Distinguish individual scores from variable loadings and acknowledge that scores are estimates.

## 13.2 Three interpretations that often get marked wrong

**Incorrect:** “The loading is 0.80, so 80% of the variable is explained.”

**Correct:** “For one standardised orthogonal factor with a loading of 0.80, the communality contributed by that factor is \(0.80^2=0.64\), or **64% of variance**. With additional factors, use the appropriate communality calculation.”

**Incorrect:** “Bartlett p = 0.001 means the factor model is a good fit.”

**Correct:** “Bartlett p = 0.001 provides evidence against the **identity correlation matrix**. It does not test whether the chosen factor model fits well.”

**Incorrect:** “The Kaiser rule selected two factors, so there must be exactly two real psychological traits.”

**Correct:** “The rule suggested two factors according to a numerical eigenvalue threshold; further evidence from structure, interpretation, and model diagnostics is needed.”

## 13.3 Practice problems with complete answers

### Problem 1. Why might happiness require several indicators?

**Answer.** Happiness is not ordinarily observed as a single exact physical measurement. Answers about enjoyment, contentment, and life satisfaction may partly reflect a shared construct. Factor analysis examines the correlations among such indicators and asks whether one or more shared factors can explain them. The result is an **estimated statistical construct**, not a direct measurement of happiness itself.

### Problem 2. Identify \(n\), \(p\), and \(m\).

A bank surveys 250 clients using nine questions, then models three factors.

**Answer.** \(n=250\) clients; \(p=9\) observed questions; \(m=3\) retained factors. The loading matrix has \(9\times3=27\) positions, while the score table can contain \(250\times3=750\) estimated individual factor values.

### Problem 3. Calculate communality and uniqueness for orthogonal factors.

A standardised variable has loadings 0.60 and 0.30 on two uncorrelated factors.

**Answer.** \(h^2=0.60^2+0.30^2=0.36+0.09=0.45\), and \(u^2=1-0.45=0.55\). Thus **45%** of the variable's variance is modelled as common variance and **55%** as unique variance.

### Problem 4. Recalculate for correlated factors.

The same loadings are now pattern coefficients on two factors correlated at 0.40.

**Answer.** Because the factors are oblique,

\[
h^2=0.60^2+0.30^2+2(0.40)(0.60)(0.30)=0.594.
\]

Uniqueness is \(1-0.594=0.406\). The old 0.45 communality was appropriate only under orthogonality. The numerical difference is \(0.144\).

### Problem 5. Which extraction method specifically models shared variance?

**Answer.** **Principal-axis factoring**, **maximum-likelihood factor analysis**, and **MINRES** are common-factor extraction methods with different estimation objectives. PCA-based extraction addresses **total variance** and is not equivalent to fitting a latent common-factor model.

### Problem 6. What is the difference between varimax and oblimin?

**Answer.** Varimax is an **orthogonal** rotation, so the modelled factors remain uncorrelated. Direct oblimin is **oblique**, so the factors are allowed to correlate. Both seek more interpretable loading patterns. If oblique rotation is used, inspect the **pattern**, **structure**, and **factor-correlation** matrices rather than interpreting every pattern coefficient as an ordinary variable–factor correlation.

### Problem 7. How do the Kaiser and scree criteria differ?

**Answer.** The Kaiser rule retains eigenvalues greater than **1** for a correlation matrix. The scree method looks for an **elbow**, where the descending sequence of eigenvalues levels off. The methods can disagree and do not replace substantive judgement.

### Problem 8. Interpret KMO = 0.67 and Bartlett p = 0.018.

**Answer.** KMO is above the lecture's general **0.60** threshold, and Bartlett's test is significant at **5%**. The results support investigating factor analysis, but they do not establish the correct factor count, adequate model fit, or factor meaning.

### Problem 9. What is a factor score?

**Answer.** A factor score is the **estimated level of one factor for one observation**. It can be calculated as a weighted combination of observed variables, often using a regression scoring method. It is **not** the loading of a variable onto a factor.

### Problem 10. Can you use Pearson correlations for five-point survey questions?

**Answer.** The source recommends **polychoric correlations for ordinal Likert variables**. Pearson correlations treat the numbers as if equal distances on the numeric scale were meaningful. An analyst should consider measurement assumptions, category frequencies, sample size, and the credibility of an underlying ordinal-threshold model rather than blindly assuming either estimator is universally correct.

---

# 14. Putting the lecture into one coherent workflow

The lecturer's three named stages are **initial factor loadings → rotation → factor scores**, with factor-count selection discussed before scores and suitability diagnostics on the final page. A practical analysis naturally checks suitability **earlier** and decides the factor count before final extraction. Both arrangements teach the same underlying topics.

The recommended operational sequence below is a **teaching reorganisation**, not an additional four-page lecture checklist:

\[
\boxed{\begin{gathered}
\text{Define the constructs and inspect the variables}\\
\downarrow\\
\text{Choose Pearson or suitable ordinal correlations}\\
\downarrow\\
\text{Inspect correlations, KMO, and Bartlett}\\
\downarrow\\
\text{Investigate how many factors to retain}\\
\downarrow\\
\text{Extract a common-factor solution (PAF, ML, MINRES, etc.)}\\
\downarrow\\
\text{Rotate and interpret pattern/structure as appropriate}\\
\downarrow\\
\text{Check communalities, residuals, stability, and meaning}\\
\downarrow\\
\text{Estimate factor scores only when needed}\\
\downarrow\\
\text{Report methods, limitations, and conclusions}
\end{gathered}}
\]

### Reporting template for a real assignment

Use the structure, **not fictitious values**:

> We assessed the suitability of the observed variables for exploratory factor analysis by examining their correlations, the Kaiser–Meyer–Olkin statistic, and Bartlett's test of sphericity. We then considered the scree plot, eigenvalues, and substantive interpretability to choose the number of factors. We estimated the model using **[name of extraction method]** and applied **[name of rotation]** because **[rationale concerning factor correlation]**. We interpreted the loading pattern and communalities to identify **[factor names supported by items]**. Where relevant, we estimated individual factor scores using **[scoring method]**. Conclusions are conditional on the measurement and modelling assumptions, data quality, and the stability of the solution.

Replace every bracketed part only after calculating or verifying it. Do not write claims about KMO, Bartlett, exact variance shares, fit, or factor meanings without corresponding output.

---

# 15. Source coverage and accuracy audit

This table maps **all substantive topics on the four source pages** to their expanded discussion. It is designed to help you check the chapter against the PDF without having to guess what is lecturer-derived.

| Source location | Content actually in *Lec5Extra.pdf* | Expanded treatment in this chapter |
|---|---|---|
| **Page 1: Introduction** | Factor analysis and PCA as data-reduction methods; fewer latent factors; happiness as an example | Sections 1–2 explain observed versus latent variables, correlation, variance, data matrices, and the research purpose. |
| **Page 1: Assumptions** | Numeric/interval data; Likert/ordinal use; polychoric versus Pearson; linearity; scatterplots/correlations; need for sufficiently associated variables | Section 3 explains measurement levels, polychoric thresholds, joint relationship patterns, linearity, and diagnostic reasoning. |
| **Page 1: Factor model** | \(n\) subjects; \(p\) observed variables; \(m<p\) factors; \(X_i=\sum a_{ij}F_j+e_i\); loadings and unexplained terms | Sections 2, 4, and 5 introduce the notation, the model, the error term, loadings, communalities, uniquenesses, and model covariance. |
| **Pages 1–2: Initial loadings** | Loading interpretation and extraction-stage overview | Sections 4–6 distinguish loadings from scores and prepare the extraction discussion. |
| **Page 2: PCA-based extraction** | Eigenvector connection; total variance; not a true common-factor model | Section 6.1 and Sections 8, 11 explain eigenstructure and total-variance interpretation. |
| **Page 2: Principal-axis factoring** | Common variance; iterative communalities replacing diagonal 1s; difference from PCA; possible numerical resemblance; initial unrotated orthogonality | Section 6.2 explains the reduced matrix and iteration; Section 11 illustrates shared versus total variance. |
| **Page 2: Maximum likelihood** | Multivariate normality; chi-square fit, confidence intervals, model comparison; exploratory/confirmatory use; sensitivity to skewed or ordinal data | Section 6.3 explains likelihood, assumptions, statistical inference, and fit interpretation; Section 12 includes R examples. |
| **Page 2: MINRES** | Off-diagonal squared-residual minimisation; no multivariate normality requirement; use with psychometric/ordinal or non-normal data; small-sample relevance | Section 6.4 derives the objective and computes example residuals; Section 12 applies MINRES and polychoric input. |
| **Pages 2–3: Rotation purpose** | Simpler interpretability; align variable clusters; high absolute loading on one factor and low on others; unchanged model fit | Sections 7.1, 7.5, and 7.6 explain the geometry and interpretation. |
| **Page 3: Orthogonal rotation** | Uncorrelated factors, 90° axes; varimax and variance of squared loadings | Section 7.2 and R Section 12.6. |
| **Page 3: Oblique rotation** | Correlated factors, tilted axes; direct oblimin; pattern and structure matrices | Sections 7.3–7.4 derive pattern versus structure; Section 12.7 checks the matrices in R. |
| **Page 3: Number of factors** | Variance-proportion example (80%); eigenvalue \(>1\) Kaiser rule; scree elbow; software input; Kaiser widely used | Section 8 gives calculations, warnings, a case where rules disagree, and an explicitly additional parallel-analysis method. |
| **Page 3: Scores** | Scores for each observation; regression-based scoring as weighted linear combinations | Section 9 explains scores with calculations and a model-based formula; Section 12.8 estimates them in R. |
| **Page 4: KMO** | Suitability test; sufficient common variance; generally acceptable when \(>0.60\) | Section 10.1 derives and works a KMO example. |
| **Page 4: Bartlett** | Sphericity/identity-correlation test; significant when \(p<0.05\) | Section 10.2 states hypotheses and computes a chi-square example. |

## Boundaries between source and teaching additions

**Directly source-derived topics:** the four-page lecture's introductory purpose, data assumptions, model equation, the four listed extraction methods and their conceptual aims, the two rotation types and named algorithms, the three retention heuristics, regression-based scoring, and the KMO/Bartlett guidelines.

**Explicit teaching additions:** the customer-service example, calculations for variance and correlations, detailed covariance-model assumptions, matrix and eigenvalue derivations, factor-score prediction formula, exact hypothetical correlation matrices and eigenvalues, pattern/structure numerical example, KMO and Bartlett numerical demonstrations, parallel analysis, all R code, extra practical checks, practice questions, reporting advice, and qualifications about software and statistical interpretation. **None of these added examples or cautions is presented as a numerical finding or separate remark made by the lecturer.**

## Final conceptual check

If you can explain the following three distinctions clearly, you have understood the hardest part of this supplementary lecture:

1. **PCA total variance versus EFA common variance.** They are related computations serving different interpretations.
2. **Loading versus factor score.** A loading relates a variable to a factor; a score estimates an observation's position on a factor.
3. **An encouraging diagnostic versus a validated model.** KMO and Bartlett can justify exploring a factor solution, but a statistically defensible interpretation still requires appropriate variables, extraction, factor count, rotation, communalities, residual assessment, and substantive judgement.

**End of teaching chapter.**
