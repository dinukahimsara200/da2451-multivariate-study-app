# 19 Batch | Final Examination | July 2022 | DA3420
## Multivariate Methods in Business — Master Beginner Teaching Guide & Complete Worked Solutions

---

# Question 1 `[Total: 25 Marks]`

## Reference Setup from the Question
We are given a collection of three random variables stacked together in a column called $X$:

$$
X = \begin{bmatrix} X_1 \\ X_2 \\ X_3 \end{bmatrix}
$$

We are told that $X$ follows a distribution written as $N_3(\mu, \Sigma)$, where:

$$
\mu = \begin{bmatrix} -3 \\ 1 \\ 4 \end{bmatrix} \quad \text{and} \quad \Sigma = \begin{bmatrix} 1 & -2 & 0 \\ -2 & 6 & 0 \\ 0 & 0 & 2 \end{bmatrix}
$$

---

### Beginner’s Foundation: What Do All These Symbols Mean?

Before we answer a single sub-question, let us translate every symbol into plain English so that you can read the matrices like an open book:

1. **What is a Random Variable ($X_1, X_2, X_3$)?**
   Think of $X_1$, $X_2$, and $X_3$ as three different measurements we take on the same item or person (for example: $X_1 =$ daily fuel cost, $X_2 =$ daily maintenance cost, and $X_3 =$ daily toll cost of a delivery truck). Because we stack them into one vertical column $X$, we call $X$ a **random vector**.

2. **What does $N_3(\mu, \Sigma)$ mean?**
   * $N$ stands for the **Normal Distribution** (the classic bell-shaped curve).
   * The subscript $3$ tells us that there are **$3$ variables** being measured together ($X_1, X_2, X_3$). We call this a **3-variate (or trivariate) normal distribution**.
   * $\mu$ (pronounced *"mew"*) is the **Mean Vector**. It lists the average (expected value) of each variable in order:
     * Average of $X_1$: $\mu_1 = -3$
     * Average of $X_2$: $\mu_2 = 1$
     * Average of $X_3$: $\mu_3 = 4$

3. **What is $\Sigma$ (pronounced *"Sigma"*)? How do we read the Covariance Matrix?**
   $\Sigma$ is a $3 \times 3$ table called the **Variance-Covariance Matrix**. It tells us two crucial things: how much each variable fluctuates on its own (**variance**), and how much two variables move together (**covariance**). Let us label the rows and columns of $\Sigma$ with $X_1$, $X_2$, and $X_3$:

   | | Column 1 ($X_1$) | Column 2 ($X_2$) | Column 3 ($X_3$) |
   | :--- | :---: | :---: | :---: |
   | **Row 1 ($X_1$)** | $\sigma_{11} = 1$ | $\sigma_{12} = -2$ | $\sigma_{13} = 0$ |
   | **Row 2 ($X_2$)** | $\sigma_{21} = -2$ | $\sigma_{22} = 6$ | $\sigma_{23} = 0$ |
   | **Row 3 ($X_3$)** | $\sigma_{31} = 0$ | $\sigma_{32} = 0$ | $\sigma_{33} = 2$ |

   * **The Main Diagonal (Top-Left to Bottom-Right) = Variances:**
     * Row 1, Col 1 ($\sigma_{11} = 1$): The **variance of $X_1$**, written $\text{Var}(X_1) = 1$.
     * Row 2, Col 2 ($\sigma_{22} = 6$): The **variance of $X_2$**, written $\text{Var}(X_2) = 6$.
     * Row 3, Col 3 ($\sigma_{33} = 2$): The **variance of $X_3$**, written $\text{Var}(X_3) = 2$.
   * **The Off-Diagonal Numbers = Covariances (How pairs of variables move together):**
     * Row 1, Col 2 (or Row 2, Col 1) is $\sigma_{12} = \sigma_{21} = -2$. This is the **covariance between $X_1$ and $X_2$**, written $\text{Cov}(X_1, X_2) = -2$. (A negative number means when $X_1$ goes up, $X_2$ tends to go down).
     * Row 1, Col 3 (or Row 3, Col 1) is $\sigma_{13} = \sigma_{31} = 0$. This is the **covariance between $X_1$ and $X_3$**, written $\text{Cov}(X_1, X_3) = 0$.
     * Row 2, Col 3 (or Row 3, Col 2) is $\sigma_{23} = \sigma_{32} = 0$. This is the **covariance between $X_2$ and $X_3$**, written $\text{Cov}(X_2, X_3) = 0$.

---

## Part (a): Independence of Random Variables

### The Golden Rule of Independence for Multivariate Normal Variables
In statistics, two random variables (or two groups of variables) are **independent** if knowing the value of one gives you **zero information** about the value of the other.

For variables that come from a **Multivariate Normal Distribution**, there is a wonderfully simple rule:
> **Two normal random variables (or groups of normal random variables) are statistically independent IF AND ONLY IF their covariance is equal to $0$.**
> * If $\text{Cov}(A, B) = 0 \implies A$ and $B$ **ARE independent**.
> * If $\text{Cov}(A, B) \neq 0 \implies A$ and $B$ **are NOT independent**.

Let us apply this rule to each of the four sub-questions.

---

### (a)(i) Are $X_1$ and $X_2$ independent? Explain. `[1 mark]`

* **Step 1: Look up the covariance between $X_1$ and $X_2$ in the matrix $\Sigma$.**
  Look at Row 1, Column 2 (or Row 2, Column 1) of $\Sigma$:

  $$
  \text{Cov}(X_1, X_2) = \sigma_{12} = -2
  $$

* **Step 2: Check if the covariance is zero.**
  Since $-2 \neq 0$, the covariance is not zero.

* **Final Answer for (a)(i):**
  **No, $X_1$ and $X_2$ are NOT independent**, because their covariance is $\text{Cov}(X_1, X_2) = -2 \neq 0$.

---

### (a)(ii) Are $X_2$ and $X_3$ independent? Explain. `[1 mark]`

* **Step 1: Look up the covariance between $X_2$ and $X_3$ in the matrix $\Sigma$.**
  Look at Row 2, Column 3 (or Row 3, Column 2) of $\Sigma$:

  $$
  \text{Cov}(X_2, X_3) = \sigma_{23} = 0
  $$

* **Step 2: Check if the covariance is zero.**
  The covariance is exactly $0$. Because $(X_2, X_3)$ jointly follow a bivariate normal distribution, zero covariance guarantees independence.

* **Final Answer for (a)(ii):**
  **Yes, $X_2$ and $X_3$ ARE independent**, because they are jointly normally distributed and their covariance is $\text{Cov}(X_2, X_3) = 0$.

---

### (a)(iii) Are $(X_1, X_2)$ and $X_3$ independent? Explain. `[1 mark]`

* **Step 1: Understand what is being compared.**
  Here, we are comparing a **group of two variables** $(X_1, X_2)$ against a **single variable** $X_3$. For the pair $(X_1, X_2)$ to be independent of $X_3$, **every variable in the first group must have zero covariance with $X_3$**.

* **Step 2: Check both covariances with $X_3$.**
  From Row 1, Column 3 of $\Sigma$:

  $$
  \text{Cov}(X_1, X_3) = \sigma_{13} = 0
  $$

  From Row 2, Column 3 of $\Sigma$:

  $$
  \text{Cov}(X_2, X_3) = \sigma_{23} = 0
  $$

  In matrix form, the covariance vector between $\begin{bmatrix} X_1 \\ X_2 \end{bmatrix}$ and $X_3$ is $\Sigma_{12} = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$.

* **Final Answer for (a)(iii):**
  **Yes, $(X_1, X_2)$ and $X_3$ ARE independent**, because both $\text{Cov}(X_1, X_3) = 0$ and $\text{Cov}(X_2, X_3) = 0$ (the cross-covariance matrix is a zero vector $\begin{bmatrix} 0 \\ 0 \end{bmatrix}$) in a multivariate normal distribution.

---

### (a)(iv) Are $X_2$ and $X_2 - 2X_1 - X_3$ independent? Explain. `[1 mark]`

* **Step 1: Understand what is being compared.**
  We want to check if the single variable $X_2$ is independent of the combined expression (linear combination) $X_2 - 2X_1 - X_3$.
  Because $X_1, X_2, X_3$ are multivariate normal, any linear combination of them is also normal. Therefore, we just need to calculate the **covariance** between $X_2$ and $(X_2 - 2X_1 - X_3)$ and see if it equals $0$.

* **Step 2: How do we calculate the covariance of a linear combination?**
  Covariance works just like expanding brackets in basic algebra! Specifically:

  $$
  \text{Cov}(X_2, \, X_2 - 2X_1 - X_3) = \text{Cov}(X_2, X_2) - 2\text{Cov}(X_2, X_1) - \text{Cov}(X_2, X_3)
  $$

  *(Note: The covariance of any variable with itself, $\text{Cov}(X_2, X_2)$, is simply its own variance, $\text{Var}(X_2) = \sigma_{22}$.)*

* **Step 3: Substitute the numbers from $\Sigma$.**
  * $\text{Cov}(X_2, X_2) = \text{Var}(X_2) = \sigma_{22} = 6$
  * $\text{Cov}(X_2, X_1) = \sigma_{21} = -2$
  * $\text{Cov}(X_2, X_3) = \sigma_{23} = 0$

  Plug these values into our equation:

  $$
  \text{Cov}(X_2, \, X_2 - 2X_1 - X_3) = 6 - 2(-2) - 0 = 6 + 4 - 0 = 10
  $$

* **Step 4: Check if the result is zero.**
  Since $10 \neq 0$, the two random variables are correlated, not independent.

  *(Teacher's Note: Occasionally, students wonder if there was a typo in the exam paper and if the question meant to ask about $X_1$ and $X_2 - 2X_1 - X_3$. Notice that for $X_1$, $\text{Cov}(X_1, X_2 - 2X_1 - X_3) = \text{Cov}(X_1, X_2) - 2\text{Var}(X_1) - \text{Cov}(X_1, X_3) = -2 - 2(1) - 0 = -4 \neq 0$, whereas for $X_2 + 2X_1 - X_3$, $\text{Cov}(X_1, X_2 + 2X_1 - X_3) = -2 + 2(1) - 0 = 0$. Regardless, for the exact printed question $X_2$ and $X_2 - 2X_1 - X_3$, the covariance is $10 \neq 0$.)*

* **Final Answer for (a)(iv):**
  **No, $X_2$ and $X_2 - 2X_1 - X_3$ are NOT independent**, because $\text{Cov}(X_2, \, X_2 - 2X_1 - X_3) = 6 - 2(-2) - 0 = 10 \neq 0$.

---

## Part (b): Find the conditional distribution of $X_2$, given that $X_1 = x_1$ and $X_3 = x_3$. `[3 marks]`

### Beginner’s Concept: What is a "Conditional Distribution"?
Imagine you are trying to predict $X_2$.
* **Without any extra information (Unconditional):** We know from $\mu$ and $\Sigma$ that $X_2$ has an average of $\mu_2 = 1$ and a variance of $\sigma_{22} = 6$.
* **With extra information (Conditional):** Now suppose someone tells you the exact observed values of the other two variables: $X_1$ turned out to be some number $x_1$, and $X_3$ turned out to be some number $x_3$.
Because $X_2$ is related to $X_1$ (their covariance is $-2$), knowing $X_1 = x_1$ shifts our prediction for the average of $X_2$ and reduces our uncertainty (variance) about $X_2$!

### The Formula for the Conditional Normal Distribution
Suppose we split our variables into two groups:
* **Group $a$ (the variable we want to predict):** $X_a = [X_2]$
* **Group $b$ (the variables whose values are given/known):** $X_b = \begin{bmatrix} X_1 \\ X_3 \end{bmatrix} = \begin{bmatrix} x_1 \\ x_3 \end{bmatrix}$

When we rearrange our mean vector $\mu$ and covariance matrix $\Sigma$ into Group $a$ first and Group $b$ second:

$$
\begin{bmatrix} X_a \\ \hline X_b \end{bmatrix} \sim N_3\left( \begin{bmatrix} \mu_a \\ \hline \mu_b \end{bmatrix}, \, \begin{bmatrix} \Sigma_{aa} & \vline & \Sigma_{ab} \\ \hline \Sigma_{ba} & \vline & \Sigma_{bb} \end{bmatrix} \right)
$$

Then the conditional distribution of $X_a$ given $X_b = x_b$ is **also a Normal Distribution**, with:
1. **Conditional Mean ($\mu_{a \mid b}$):**

   $$
   \mu_{a \mid b} = \mu_a + \Sigma_{ab} \Sigma_{bb}^{-1} (x_b - \mu_b)
   $$

2. **Conditional Variance ($\Sigma_{a \mid b}$):**

   $$
   \Sigma_{a \mid b} = \Sigma_{aa} - \Sigma_{ab} \Sigma_{bb}^{-1} \Sigma_{ba}
   $$

Let us calculate this step by step!

---

### Step-by-Step Calculation

#### Step 1: Write down the building blocks ($\mu_a, \mu_b, \Sigma_{aa}, \Sigma_{ab}, \Sigma_{ba}, \Sigma_{bb}$)
* $\mu_a = \text{Mean of } X_2 = [1]$
* $\mu_b = \text{Means of } \begin{bmatrix} X_1 \\ X_3 \end{bmatrix} = \begin{bmatrix} -3 \\ 4 \end{bmatrix}$
* $\Sigma_{aa} = \text{Variance of } X_2 = [\sigma_{22}] = [6]$
* $\Sigma_{ab} = \text{Covariances of } X_2 \text{ with } (X_1, X_3) = \begin{bmatrix} \sigma_{21} & \sigma_{23} \end{bmatrix} = \begin{bmatrix} -2 & 0 \end{bmatrix}$
* $\Sigma_{ba} = \text{Transpose of } \Sigma_{ab} \text{ (flipped into a column)} = \begin{bmatrix} -2 \\ 0 \end{bmatrix}$
* $\Sigma_{bb} = \text{Covariance matrix of } \begin{bmatrix} X_1 \\ X_3 \end{bmatrix} = \begin{bmatrix} \sigma_{11} & \sigma_{13} \\ \sigma_{31} & \sigma_{33} \end{bmatrix} = \begin{bmatrix} 1 & 0 \\ 0 & 2 \end{bmatrix}$

#### Step 2: Find the inverse matrix $\Sigma_{bb}^{-1}$
How do we find the inverse of a $2 \times 2$ matrix $\begin{bmatrix} a & b \\ c & d \end{bmatrix}$?
The formula is $\frac{1}{ad - bc} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$. Even simpler: when a matrix is **diagonal** (only has numbers on the main diagonal and zeros elsewhere), you just take the reciprocal ($1 \div \text{number}$) of each diagonal entry!

$$
\Sigma_{bb} = \begin{bmatrix} 1 & 0 \\ 0 & 2 \end{bmatrix} \implies \Sigma_{bb}^{-1} = \begin{bmatrix} \frac{1}{1} & 0 \\ 0 & \frac{1}{2} \end{bmatrix} = \begin{bmatrix} 1 & 0 \\ 0 & 0.5 \end{bmatrix}
$$

#### Step 3: Calculate the multiplier $\Sigma_{ab} \Sigma_{bb}^{-1}$
We multiply the $1 \times 2$ row vector $\Sigma_{ab}$ by the $2 \times 2$ matrix $\Sigma_{bb}^{-1}$:

$$
\Sigma_{ab} \Sigma_{bb}^{-1} = \begin{bmatrix} -2 & 0 \end{bmatrix} \begin{bmatrix} 1 & 0 \\ 0 & 0.5 \end{bmatrix} = \begin{bmatrix} (-2)(1) + (0)(0) & (-2)(0) + (0)(0.5) \end{bmatrix} = \begin{bmatrix} -2 & 0 \end{bmatrix}
$$

#### Step 4: Calculate the Conditional Mean ($\mu_{2 \mid 1,3}$)
Using our formula $\mu_{2 \mid 1,3} = \mu_a + \Sigma_{ab} \Sigma_{bb}^{-1} (x_b - \mu_b)$:
First, find the deviation vector $(x_b - \mu_b)$:

$$
x_b - \mu_b = \begin{bmatrix} x_1 \\ x_3 \end{bmatrix} - \begin{bmatrix} -3 \\ 4 \end{bmatrix} = \begin{bmatrix} x_1 - (-3) \\ x_3 - 4 \end{bmatrix} = \begin{bmatrix} x_1 + 3 \\ x_3 - 4 \end{bmatrix}
$$

Now plug everything into the conditional mean formula:

$$
\mu_{2 \mid 1,3} = 1 + \begin{bmatrix} -2 & 0 \end{bmatrix} \begin{bmatrix} x_1 + 3 \\ x_3 - 4 \end{bmatrix}
$$

Multiply the row vector by the column vector (first times first + second times second):

$$
\mu_{2 \mid 1,3} = 1 + (-2)(x_1 + 3) + (0)(x_3 - 4)
$$

$$
\mu_{2 \mid 1,3} = 1 - 2x_1 - 6 + 0 = -2x_1 - 5
$$

*(Intuition Check: Notice that $x_3$ completely disappeared from the formula! Why? Because in Part (a) we proved that $X_3$ is completely independent of $(X_1, X_2)$. So knowing $X_3 = x_3$ gives us zero information about $X_2$!)*

#### Step 5: Calculate the Conditional Variance ($\Sigma_{2 \mid 1,3}$)
Using our formula $\Sigma_{2 \mid 1,3} = \Sigma_{aa} - \Sigma_{ab} \Sigma_{bb}^{-1} \Sigma_{ba}$:

$$
\Sigma_{2 \mid 1,3} = 6 - \begin{bmatrix} -2 & 0 \end{bmatrix} \begin{bmatrix} -2 \\ 0 \end{bmatrix}
$$

Multiply the row vector by the column vector:

$$
\begin{bmatrix} -2 & 0 \end{bmatrix} \begin{bmatrix} -2 \\ 0 \end{bmatrix} = (-2)(-2) + (0)(0) = 4
$$

Subtract from $6$:

$$
\Sigma_{2 \mid 1,3} = 6 - 4 = 2
$$

*(Intuition Check: Originally, the variance of $X_2$ was $6$. Once we know the exact value of $X_1$, our uncertainty about $X_2$ drops from $6$ down to $2$!)*

### Final Answer for Part (b)
The conditional distribution of $X_2$ given $X_1 = x_1$ and $X_3 = x_3$ is a univariate normal distribution with mean $-2x_1 - 5$ and variance $2$:

$$
(X_2 \mid X_1 = x_1, X_3 = x_3) \sim N(-2x_1 - 5, \, 2)
$$

---

## Part (c): Find the distribution of $2X_1 - 3X_2 + X_3$. `[4 marks]`

### Beginner’s Concept: Linear Combinations of Normal Variables
Whenever you take variables from a Multivariate Normal distribution and multiply them by constants and add/subtract them together, the resulting single variable—called a **linear combination**—always follows a **Univariate Normal Distribution**!

Specifically, if $Y = a_1 X_1 + a_2 X_2 + a_3 X_3 = a'X$, where $a = \begin{bmatrix} a_1 \\ a_2 \\ a_3 \end{bmatrix}$ is the column of multiplier weights (and $a' = \begin{bmatrix} a_1 & a_2 & a_3 \end{bmatrix}$ is the row version), then:

$$
Y = a'X \sim N\left(a'\mu, \, a'\Sigma a\right)
$$

Let us compute the mean ($a'\mu$) and the variance ($a'\Sigma a$) step by step.

---

### Step-by-Step Calculation

#### Step 1: Identify the weight vector $a'$
In the expression $Y = 2X_1 - 3X_2 + 1X_3$, the weights in front of $X_1, X_2, X_3$ are $2$, $-3$, and $1$:

$$
a' = \begin{bmatrix} 2 & -3 & 1 \end{bmatrix} \quad \text{and} \quad a = \begin{bmatrix} 2 \\ -3 \\ 1 \end{bmatrix}
$$

#### Step 2: Calculate the Mean of $Y$ ($E(Y) = a'\mu$)
Multiply each weight by the corresponding mean of $X_1, X_2, X_3$ and add them up:

$$
E(2X_1 - 3X_2 + X_3) = a'\mu = \begin{bmatrix} 2 & -3 & 1 \end{bmatrix} \begin{bmatrix} -3 \\ 1 \\ 4 \end{bmatrix}
$$

$$
= (2)(-3) + (-3)(1) + (1)(4) = -6 - 3 + 4 = -5
$$

#### Step 3: Calculate the Variance of $Y$ ($\text{Var}(Y) = a'\Sigma a$)
We compute $\begin{bmatrix} 2 & -3 & 1 \end{bmatrix} \begin{bmatrix} 1 & -2 & 0 \\ -2 & 6 & 0 \\ 0 & 0 & 2 \end{bmatrix} \begin{bmatrix} 2 \\ -3 \\ 1 \end{bmatrix}$ in two easy stages.

* **Stage 3A: Multiply the row vector $a'$ by the $3 \times 3$ matrix $\Sigma$:**

  $$
  a'\Sigma = \begin{bmatrix} 2 & -3 & 1 \end{bmatrix} \begin{bmatrix} 1 & -2 & 0 \\ -2 & 6 & 0 \\ 0 & 0 & 2 \end{bmatrix}
  $$

  * **First entry (using Column 1 of $\Sigma$):** $(2)(1) + (-3)(-2) + (1)(0) = 2 + 6 + 0 = 8$
  * **Second entry (using Column 2 of $\Sigma$):** $(2)(-2) + (-3)(6) + (1)(0) = -4 - 18 + 0 = -22$
  * **Third entry (using Column 3 of $\Sigma$):** $(2)(0) + (-3)(0) + (1)(2) = 0 + 0 + 2 = 2$

  So:

  $$
  a'\Sigma = \begin{bmatrix} 8 & -22 & 2 \end{bmatrix}
  $$

* **Stage 3B: Multiply the result $a'\Sigma$ by the column vector $a$:**

  $$
  a'\Sigma a = \begin{bmatrix} 8 & -22 & 2 \end{bmatrix} \begin{bmatrix} 2 \\ -3 \\ 1 \end{bmatrix} = (8)(2) + (-22)(-3) + (2)(1) = 16 + 66 + 2 = 84
  $$

*(AlternativeAlgebraic Verification for Beginners: You can also use the variance expansion formula $\text{Var}(2X_1 - 3X_2 + X_3) = 2^2\text{Var}(X_1) + (-3)^2\text{Var}(X_2) + 1^2\text{Var}(X_3) + 2(2)(-3)\text{Cov}(X_1, X_2) + 2(2)(1)\text{Cov}(X_1, X_3) + 2(-3)(1)\text{Cov}(X_2, X_3) = 4(1) + 9(6) + 1(2) - 12(-2) + 4(0) - 6(0) = 4 + 54 + 2 + 24 = 84$. Both methods give $84$!)*

### Final Answer for Part (c)

$$
2X_1 - 3X_2 + X_3 \sim N(-5, \, 84)
$$

---

## Part (d): Find the distribution of $AX$, where $A = \begin{bmatrix} 1 & 0 & -1 \\ 0 & 1 & -1 \end{bmatrix}$. `[4 marks]`

### Beginner’s Concept: Multiplying a Random Vector by a Matrix $A$
In Part (c), we created **one** new variable out of $X_1, X_2, X_3$.
Here in Part (d), the matrix $A$ has **two rows**, which means $AX$ creates **two** new variables simultaneously:

$$
AX = \begin{bmatrix} 1 & 0 & -1 \\ 0 & 1 & -1 \end{bmatrix} \begin{bmatrix} X_1 \\ X_2 \\ X_3 \end{bmatrix} = \begin{bmatrix} 1X_1 + 0X_2 - 1X_3 \\ 0X_1 + 1X_2 - 1X_3 \end{bmatrix} = \begin{bmatrix} X_1 - X_3 \\ X_2 - X_3 \end{bmatrix}
$$

Because $AX$ has $2$ rows, it follows a **2-variate (Bivariate) Normal Distribution**:

$$
AX \sim N_2\left(A\mu, \, A\Sigma A'\right)
$$

where $A'$ (pronounced *"$A$-transpose"*) is the matrix $A$ with its rows turned into columns:

$$
A = \begin{bmatrix} 1 & 0 & -1 \\ 0 & 1 & -1 \end{bmatrix} \implies A' = \begin{bmatrix} 1 & 0 \\ 0 & 1 \\ -1 & -1 \end{bmatrix}
$$

---

### Step-by-Step Calculation

#### Step 1: Calculate the New Mean Vector ($A\mu$)
Multiply the $2 \times 3$ matrix $A$ by the $3 \times 1$ mean vector $\mu$:

$$
A\mu = \begin{bmatrix} 1 & 0 & -1 \\ 0 & 1 & -1 \end{bmatrix} \begin{bmatrix} -3 \\ 1 \\ 4 \end{bmatrix} = \begin{bmatrix} (1)(-3) + (0)(1) + (-1)(4) \\ (0)(-3) + (1)(1) + (-1)(4) \end{bmatrix} = \begin{bmatrix} -3 + 0 - 4 \\ 0 + 1 - 4 \end{bmatrix} = \begin{bmatrix} -7 \\ -3 \end{bmatrix}
$$

#### Step 2: Calculate the New Covariance Matrix ($A\Sigma A'$)
We calculate this in two stages:

* **Stage 2A: Multiply $A$ ($2 \times 3$) by $\Sigma$ ($3 \times 3$):**

  $$
  A\Sigma = \begin{bmatrix} 1 & 0 & -1 \\ 0 & 1 & -1 \end{bmatrix} \begin{bmatrix} 1 & -2 & 0 \\ -2 & 6 & 0 \\ 0 & 0 & 2 \end{bmatrix}
  $$

  * **Row 1 of $A\Sigma$:**
    * Col 1: $(1)(1) + (0)(-2) + (-1)(0) = 1$
    * Col 2: $(1)(-2) + (0)(6) + (-1)(0) = -2$
    * Col 3: $(1)(0) + (0)(0) + (-1)(2) = -2$
  * **Row 2 of $A\Sigma$:**
    * Col 1: $(0)(1) + (1)(-2) + (-1)(0) = -2$
    * Col 2: $(0)(-2) + (1)(6) + (-1)(0) = 6$
    * Col 3: $(0)(0) + (1)(0) + (-1)(2) = -2$

  So:

  $$
  A\Sigma = \begin{bmatrix} 1 & -2 & -2 \\ -2 & 6 & -2 \end{bmatrix}
  $$

* **Stage 2B: Multiply $A\Sigma$ ($2 \times 3$) by $A'$ ($3 \times 2$):**

  $$
  A\Sigma A' = \begin{bmatrix} 1 & -2 & -2 \\ -2 & 6 & -2 \end{bmatrix} \begin{bmatrix} 1 & 0 \\ 0 & 1 \\ -1 & -1 \end{bmatrix}
  $$

  * **Row 1, Col 1:** $(1)(1) + (-2)(0) + (-2)(-1) = 1 + 0 + 2 = 3$
  * **Row 1, Col 2:** $(1)(0) + (-2)(1) + (-2)(-1) = 0 - 2 + 2 = 0$
  * **Row 2, Col 1:** $(-2)(1) + (6)(0) + (-2)(-1) = -2 + 0 + 2 = 0$
  * **Row 2, Col 2:** $(-2)(0) + (6)(1) + (-2)(-1) = 0 + 6 + 2 = 8$

  So:

  $$
  A\Sigma A' = \begin{bmatrix} 3 & 0 \\ 0 & 8 \end{bmatrix}
  $$

### Final Answer for Part (d)
$AX$ follows a bivariate normal distribution:

$$
AX \sim N_2\left(\begin{bmatrix} -7 \\ -3 \end{bmatrix}, \, \begin{bmatrix} 3 & 0 \\ 0 & 8 \end{bmatrix}\right)
$$

---

## Part (e): Partitioning the Mean Vector $\mu$ and Covariance Matrix $\Sigma$

We are asked to partition (slice) $X$ into two sub-vectors:

$$
X_{(1)} = \begin{bmatrix} X_1 \\ X_2 \end{bmatrix} \quad \text{and} \quad X_{(2)} = \begin{bmatrix} X_3 \end{bmatrix}
$$

so that $\mu = \begin{bmatrix} \mu_1 \\ \mu_2 \end{bmatrix}$ and $\Sigma = \begin{bmatrix} \Sigma_{11} & \Sigma_{12} \\ \Sigma_{21} & \Sigma_{22} \end{bmatrix}$.

---

### (e)(i) Find the elements in $\mu_1, \mu_2, \Sigma_{11}, \Sigma_{12}, \Sigma_{21}$, and $\Sigma_{22}$. `[3 marks]`

#### Beginner’s Explanation: How Does Matrix Partitioning Work?
"Partitioning" simply means drawing horizontal and vertical dividing lines through a vector or matrix to group variables together.
Since $X_{(1)}$ contains the first **two** variables ($X_1, X_2$) and $X_{(2)}$ contains the **last** variable ($X_3$), we draw a line after the 2nd row and after the 2nd column:

$$
\mu = \begin{bmatrix} -3 \\ 1 \\ \hline 4 \end{bmatrix} = \begin{bmatrix} \mu_1 \\ \hline \mu_2 \end{bmatrix} \quad \text{and} \quad \Sigma = \begin{bmatrix} 1 & -2 & \vline & 0 \\ -2 & 6 & \vline & 0 \\ \hline 0 & 0 & \vline & 2 \end{bmatrix} = \begin{bmatrix} \Sigma_{11} & \vline & \Sigma_{12} \\ \hline \Sigma_{21} & \vline & \Sigma_{22} \end{bmatrix}
$$

Reading off each block directly from the partitioned matrices gives our answer:
* $\mu_1 = \begin{bmatrix} -3 \\ 1 \end{bmatrix}$ (the $2 \times 1$ mean vector of $X_{(1)}$)
* $\mu_2 = \begin{bmatrix} 4 \end{bmatrix}$ (the $1 \times 1$ mean of $X_{(2)}$)
* $\Sigma_{11} = \begin{bmatrix} 1 & -2 \\ -2 & 6 \end{bmatrix}$ (the $2 \times 2$ covariance matrix of $X_{(1)}$ with itself)
* $\Sigma_{12} = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$ (the $2 \times 1$ cross-covariance matrix between $X_{(1)}$ and $X_{(2)}$)
* $\Sigma_{21} = \begin{bmatrix} 0 & 0 \end{bmatrix}$ (the $1 \times 2$ cross-covariance matrix between $X_{(2)}$ and $X_{(1)}$)
* $\Sigma_{22} = \begin{bmatrix} 2 \end{bmatrix}$ (the $1 \times 1$ variance of $X_{(2)}$)

---

### (e)(ii) Show that $(X - \mu)' \Sigma^{-1} (X - \mu) = (X_{(1)} - \mu_1)' \Sigma_{11}^{-1} (X_{(1)} - \mu_1) + (X_{(2)} - \mu_2)' \Sigma_{22}^{-1} (X_{(2)} - \mu_2)$. `[4 marks]`

#### Beginner’s Explanation: What is this equation saying?
The expression $(X - \mu)' \Sigma^{-1} (X - \mu)$ is the **squared Mahalanobis distance** (the exponent inside the multivariate normal bell curve formula).
Because $X_{(1)} = \begin{bmatrix} X_1 \\ X_2 \end{bmatrix}$ and $X_{(2)} = [X_3]$ are **independent** ($\Sigma_{12} = 0$ and $\Sigma_{21} = 0'$), the total squared distance of $X$ from $\mu$ splits cleanly into the sum of two separate squared distances: the distance for $X_{(1)}$ plus the distance for $X_{(2)}$.

Let us write out the formal mathematical proof step by step, and then also verify it by computing the actual inverse matrices!

#### Step-by-Step Mathematical Proof (Using Block Matrices)
1. **Write $(X - \mu)$ and its transpose $(X - \mu)'$ in partitioned form:**

   $$
   X - \mu = \begin{bmatrix} X_{(1)} - \mu_1 \\ X_{(2)} - \mu_2 \end{bmatrix} \quad \text{and} \quad (X - \mu)' = \begin{bmatrix} (X_{(1)} - \mu_1)' & (X_{(2)} - \mu_2)' \end{bmatrix}
   $$

2. **Use the hint for $\Sigma^{-1}$:**
   From Part (e)(i), we found that $\Sigma_{12} = 0 = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$ and $\Sigma_{21} = 0' = \begin{bmatrix} 0 & 0 \end{bmatrix}$. Therefore, $\Sigma$ is a block-diagonal matrix:

   $$
   \Sigma = \begin{bmatrix} \Sigma_{11} & 0 \\ 0' & \Sigma_{22} \end{bmatrix}
   $$

   As stated in the question hint, the inverse of this block-diagonal matrix is:

   $$
   \Sigma^{-1} = \begin{bmatrix} \Sigma_{11}^{-1} & 0 \\ 0' & \Sigma_{22}^{-1} \end{bmatrix}
   $$

3. **Substitute $(X - \mu)'$, $\Sigma^{-1}$, and $(X - \mu)$ into the left-hand side:**

   $$
   (X - \mu)' \Sigma^{-1} (X - \mu) = \begin{bmatrix} (X_{(1)} - \mu_1)' & (X_{(2)} - \mu_2)' \end{bmatrix} \begin{bmatrix} \Sigma_{11}^{-1} & 0 \\ 0' & \Sigma_{22}^{-1} \end{bmatrix} \begin{bmatrix} X_{(1)} - \mu_1 \\ X_{(2)} - \mu_2 \end{bmatrix}
   $$

4. **Multiply the first two matrices together:**
   * First block entry: $(X_{(1)} - \mu_1)' \Sigma_{11}^{-1} + (X_{(2)} - \mu_2)' 0' = (X_{(1)} - \mu_1)' \Sigma_{11}^{-1}$
   * Second block entry: $(X_{(1)} - \mu_1)' 0 + (X_{(2)} - \mu_2)' \Sigma_{22}^{-1} = (X_{(2)} - \mu_2)' \Sigma_{22}^{-1}$

   This gives:

   $$
   = \begin{bmatrix} (X_{(1)} - \mu_1)' \Sigma_{11}^{-1} & (X_{(2)} - \mu_2)' \Sigma_{22}^{-1} \end{bmatrix} \begin{bmatrix} X_{(1)} - \mu_1 \\ X_{(2)} - \mu_2 \end{bmatrix}
   $$

5. **Multiply the resulting row vector by the column vector:**

   $$
   = (X_{(1)} - \mu_1)' \Sigma_{11}^{-1} (X_{(1)} - \mu_1) + (X_{(2)} - \mu_2)' \Sigma_{22}^{-1} (X_{(2)} - \mu_2)
   $$

   This matches the right-hand side exactly. **(Shown / Q.E.D.)**

*(Bonus Numerical Explicit Form for Full Completeness: Should an examiner also wish to see the explicit numerical inverses $\Sigma_{11}^{-1}$ and $\Sigma_{22}^{-1}$:*
* $\det(\Sigma_{11}) = (1)(6) - (-2)(-2) = 6 - 4 = 2$, so $\Sigma_{11}^{-1} = \frac{1}{2}\begin{bmatrix} 6 & 2 \\ 2 & 1 \end{bmatrix} = \begin{bmatrix} 3 & 1 \\ 1 & 0.5 \end{bmatrix}$.
* $\Sigma_{22}^{-1} = \begin{bmatrix} \frac{1}{2} \end{bmatrix} = [0.5]$.
* $\Sigma^{-1} = \begin{bmatrix} 3 & 1 & 0 \\ 1 & 0.5 & 0 \\ 0 & 0 & 0.5 \end{bmatrix}$, and expanding both sides yields $3(X_1 + 3)^2 + 2(X_1 + 3)(X_2 - 1) + 0.5(X_2 - 1)^2 + 0.5(X_3 - 4)^2$.)*

---

## Part (f): Sampling Distributions for a Random Sample of Size $n = 80$

Suppose we collect $n = 80$ independent observations $X_1, X_2, \dots, X_{80}$ from our $N_3(\mu, \Sigma)$ population, where $p = 3$ is the number of variables.

---

### (f)(i) Specify completely the distribution of $\bar{X}$. `[1 mark]`

* **Beginner’s Explanation:**
  $\bar{X}$ is the **sample mean vector** (the average of all $80$ observations). Just like in basic statistics where the sample mean $\bar{x}$ has the same average $\mu$ as the population but its variance is divided by the sample size $n$, the multivariate sample mean vector $\bar{X}$ follows a Multivariate Normal distribution with mean vector $\mu$ and covariance matrix $\frac{1}{n}\Sigma$:

  $$
  \bar{X} \sim N_p\left(\mu, \, \frac{1}{n}\Sigma\right)
  $$

* **Final Answer for (f)(i):**
  Substituting $p = 3$, $n = 80$, $\mu$, and $\Sigma$:

  $$
  \bar{X} \sim N_3\left(\mu, \, \frac{1}{80}\Sigma\right) \quad \text{or explicitly} \quad \bar{X} \sim N_3\left(\begin{bmatrix} -3 \\ 1 \\ 4 \end{bmatrix}, \, \frac{1}{80}\begin{bmatrix} 1 & -2 & 0 \\ -2 & 6 & 0 \\ 0 & 0 & 2 \end{bmatrix}\right)
  $$

---

### (f)(ii) Specify completely the distribution of $(\bar{X} - \mu)' \left(\frac{\Sigma}{n}\right)^{-1} (\bar{X} - \mu)$. `[1 mark]`

* **Beginner’s Explanation:**
  In basic statistics, if you take a normal sample mean $\bar{x}$, subtract $\mu$, divide by its standard error $\frac{\sigma}{\sqrt{n}}$, and **square** it, you get a $Z^2$ statistic: $\left(\frac{\bar{x}-\mu}{\sigma/\sqrt{n}}\right)^2 = (\bar{x}-\mu)\left(\frac{\sigma^2}{n}\right)^{-1}(\bar{x}-\mu)$, which follows a **Chi-Square distribution with $1$ degree of freedom ($\chi_1^2$)**.
  When we have $p = 3$ variables and we know the true population covariance matrix $\Sigma$, the multivariate version $(\bar{X} - \mu)' \left(\frac{\Sigma}{n}\right)^{-1} (\bar{X} - \mu)$ is the sum of $p = 3$ independent squared standard normal variables. Therefore, it follows an **exact Chi-Square distribution with $p = 3$ degrees of freedom**!

* **Final Answer for (f)(ii):**

  $$
  (\bar{X} - \mu)' \left(\frac{\Sigma}{80}\right)^{-1} (\bar{X} - \mu) \sim \chi_3^2
  $$

  (A chi-square distribution with $3$ degrees of freedom).

---

### (f)(iii) Specify completely the distribution of $(\bar{X} - \mu)' \left(\frac{S}{n}\right)^{-1} (\bar{X} - \mu)$. `[1 mark]`

* **Beginner’s Explanation:**
  Compare (f)(iii) with (f)(ii): the true population covariance matrix $\Sigma$ has been replaced by the **sample covariance matrix $S$** (calculated from the $80$ sample observations).
  In univariate statistics, replacing $\sigma$ with $s$ changes a $Z$-statistic into a $t$-statistic (and $t^2 = F$).
  In multivariate statistics, replacing $\Sigma$ with $S$ gives **Hotelling’s $T^2$ statistic**:

  $$
  T^2 = (\bar{X} - \mu)' \left(\frac{S}{n}\right)^{-1} (\bar{X} - \mu)
  $$

  * **Exact Distribution:** It follows a scaled **$F$-distribution**:

    $$
    \frac{(n - 1)p}{n - p} F_{p, \, n - p}
    $$

    Substituting $n = 80$ and $p = 3$:

    $$
    \frac{(80 - 1)(3)}{80 - 3} F_{3, \, 80 - 3} = \frac{79 \times 3}{77} F_{3, 77} = \frac{237}{77} F_{3, 77} \approx 3.0779 \, F_{3, 77}
    $$

  * **Large-Sample (Asymptotic) Distribution:** Because the sample size $n = 80$ is large ($n - p = 77$ is large), the sample covariance matrix $S$ is very close to $\Sigma$, so $T^2$ is also **approximately distributed as $\chi_p^2 = \chi_3^2$**.

* **Final Answer for (f)(iii):**
  * **Exact distribution:** $\frac{237}{77} F_{3, 77}$ (or Hotelling's $T_{3, 79}^2$).
  * **Large-sample approximate distribution (since $n = 80$ is large):** $\chi_3^2$ (a chi-square distribution with $3$ degrees of freedom). *(Writing both guarantees full marks under any marking scheme!)*

---
---

# Question 2 `[Total: 25 Marks]`

## Reference Setup from the Question
Suppose the random variables $X_1$ and $X_2$ have the population covariance matrix:

$$
\Sigma = \begin{bmatrix} 5 & 2 \\ 2 & 2 \end{bmatrix}
$$

---

### Beginner’s Foundation: What is Principal Component Analysis (PCA)?
Imagine you have two correlated variables $X_1$ and $X_2$. From $\Sigma = \begin{bmatrix} 5 & 2 \\ 2 & 2 \end{bmatrix}$:
* Variance of $X_1$ is $\sigma_{11} = 5$.
* Variance of $X_2$ is $\sigma_{22} = 2$.
* Total variance in the system is $5 + 2 = 7$.
* Covariance between $X_1$ and $X_2$ is $\sigma_{12} = 2 \neq 0$, meaning they overlap in the information they carry.

**Principal Component Analysis (PCA)** rotates our axes to create two brand-new, **uncorrelated** variables called **Principal Components ($Y_1$ and $Y_2$)**:
* **$Y_1$ (First Principal Component):** The linear combination of $X_1$ and $X_2$ that captures the **maximum possible variance**.
* **$Y_2$ (Second Principal Component):** The linear combination perpendicular (orthogonal) to $Y_1$ that captures the **remaining variance**.
* **How do we find the weights for $Y_1$ and $Y_2$?** The weights come from the **eigenvectors ($e_1, e_2$)** of $\Sigma$, and the variances of $Y_1$ and $Y_2$ are the **eigenvalues ($\lambda_1, \lambda_2$)** of $\Sigma$!

---

## Part (a): Calculate the eigenvalue-eigenvector pairs of $\Sigma$. When deriving corresponding eigenvectors for both eigenvalues, set $X_2 = 1$ and normalize the eigenvectors. `[5 marks]`

### Beginner’s Guide: What are Eigenvalues ($\lambda$) and Eigenvectors ($e$)?
* **Eigenvalues ($\lambda$, pronounced *"lambda"*):** Special numbers that tell us the **variance** of each Principal Component. Wealways order them from largest to smallest: $\lambda_1 \ge \lambda_2 \ge 0$.
* **Eigenvectors ($e$):** Special column vectors of weights that tell us **how much of $X_1$ and $X_2$ to mix together** to build each Principal Component.
* **"Normalize the eigenvector":** An eigenvector only defines a *direction*, so we scale its length to equal $1$ (unit length) by dividing each number in the vector by the vector's total length $\sqrt{v_1^2 + v_2^2}$.

---

### Step-by-Step Calculation

#### Step 1: Find the Eigenvalues ($\lambda_1$ and $\lambda_2$)
To find the eigenvalues of $\Sigma = \begin{bmatrix} 5 & 2 \\ 2 & 2 \end{bmatrix}$, we subtract $\lambda$ from the main diagonal entries and set the **determinant** of the matrix equal to $0$. This is called the **characteristic equation**:

$$
|\Sigma - \lambda I| = 0 \implies \det \begin{bmatrix} 5 - \lambda & 2 \\ 2 & 2 - \lambda \end{bmatrix} = 0
$$

How do you calculate the determinant of a $2 \times 2$ matrix $\begin{bmatrix} a & b \\ c & d \end{bmatrix}$?
You multiply the main diagonal ($a \times d$) and subtract the off-diagonal ($b \times c$):

$$
(5 - \lambda)(2 - \lambda) - (2)(2) = 0
$$

Expand the brackets carefully:

$$
10 - 5\lambda - 2\lambda + \lambda^2 - 4 = 0
$$

Combine like terms:

$$
\lambda^2 - 7\lambda + 6 = 0
$$

Factor this quadratic equation (we need two numbers that multiply to $+6$ and add up to $-7$, which are $-6$ and $-1$):

$$
(\lambda - 6)(\lambda - 1) = 0
$$

So the two solutions (arranged from largest to smallest) are:

$$
\lambda_1 = 6 \quad \text{and} \quad \lambda_2 = 1
$$

*(Quick Check for Beginners: The sum of the eigenvalues $\lambda_1 + \lambda_2 = 6 + 1 = 7$ MUST always equal the sum of the diagonal variances of $\Sigma$, which is $5 + 2 = 7$. It matches!)*

---

#### Step 2: Find the Normalized Eigenvector $e_1$ for $\lambda_1 = 6$
We use the eigenvector equation $(\Sigma - \lambda_1 I)v_1 = 0$, where $v_1 = \begin{bmatrix} v_{11} \\ v_{12} \end{bmatrix}$ represents the unnormalized weights for $X_1$ and $X_2$:

$$
\begin{bmatrix} 5 - 6 & 2 \\ 2 & 2 - 6 \end{bmatrix} \begin{bmatrix} v_{11} \\ v_{12} \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix} \implies \begin{bmatrix} -1 & 2 \\ 2 & -4 \end{bmatrix} \begin{bmatrix} v_{11} \\ v_{12} \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix}
$$

Write out the equation from the first row:

$$
-1 v_{11} + 2 v_{12} = 0 \implies v_{11} = 2 v_{12}
$$

**Follow the question’s instruction: "set $X_2 = 1$" (meaning set the second component $v_{12} = 1$):**
If $v_{12} = 1$, then:

$$
v_{11} = 2(1) = 2
$$

So our initial (unnormalized) eigenvector is:

$$
v_1 = \begin{bmatrix} 2 \\ 1 \end{bmatrix}
$$

**Now normalize $v_1$ (divide by its length):**
* Calculate the length $\|v_1\| = \sqrt{v_{11}^2 + v_{12}^2} = \sqrt{2^2 + 1^2} = \sqrt{4 + 1} = \sqrt{5} \approx 2.2361$.
* Divide each entry of $v_1$ by $\sqrt{5}$:

  $$
  e_1 = \begin{bmatrix} \frac{2}{\sqrt{5}} \\ \frac{1}{\sqrt{5}} \end{bmatrix} \approx \begin{bmatrix} 0.8944 \\ 0.4472 \end{bmatrix}
  $$

---

#### Step 3: Find the Normalized Eigenvector $e_2$ for $\lambda_2 = 1$
Now we plug $\lambda_2 = 1$ into $(\Sigma - \lambda_2 I)v_2 = 0$:

$$
\begin{bmatrix} 5 - 1 & 2 \\ 2 & 2 - 1 \end{bmatrix} \begin{bmatrix} v_{21} \\ v_{22} \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix} \implies \begin{bmatrix} 4 & 2 \\ 2 & 1 \end{bmatrix} \begin{bmatrix} v_{21} \\ v_{22} \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix}
$$

Write out the equation from the second row (or first row):

$$
2 v_{21} + 1 v_{22} = 0 \implies 2 v_{21} = -v_{22} \implies v_{21} = -\frac{1}{2} v_{22} = -0.5 v_{22}
$$

**Follow the question’s instruction: "set $X_2 = 1$" (meaning set the second component $v_{22} = 1$):**
If $v_{22} = 1$, then:

$$
v_{21} = -\frac{1}{2}(1) = -0.5
$$

So our initial (unnormalized) eigenvector is:

$$
v_2 = \begin{bmatrix} -0.5 \\ 1 \end{bmatrix} = \begin{bmatrix} -\frac{1}{2} \\ 1 \end{bmatrix}
$$

**Now normalize $v_2$ (divide by its length):**
* Calculate the length $\|v_2\| = \sqrt{(-0.5)^2 + 1^2} = \sqrt{0.25 + 1} = \sqrt{1.25} = \sqrt{\frac{5}{4}} = \frac{\sqrt{5}}{2} \approx 1.1180$.
* Divide each entry of $v_2$ by $\frac{\sqrt{5}}{2}$:
  * First entry: $\frac{-1/2}{\sqrt{5}/2} = -\frac{1}{\sqrt{5}} \approx -0.4472$
  * Second entry: $\frac{1}{\sqrt{5}/2} = \frac{2}{\sqrt{5}} \approx 0.8944$

  $$
  e_2 = \begin{bmatrix} -\frac{1}{\sqrt{5}} \\ \frac{2}{\sqrt{5}} \end{bmatrix} \approx \begin{bmatrix} -0.4472 \\ 0.8944 \end{bmatrix}
  $$

### Final Answer for Part (a)
* **First eigenvalue-eigenvector pair:** $\lambda_1 = 6, \quad e_1 = \begin{bmatrix} \frac{2}{\sqrt{5}} \\ \frac{1}{\sqrt{5}} \end{bmatrix} \approx \begin{bmatrix} 0.8944 \\ 0.4472 \end{bmatrix}$
* **Second eigenvalue-eigenvector pair:** $\lambda_2 = 1, \quad e_2 = \begin{bmatrix} -\frac{1}{\sqrt{5}} \\ \frac{2}{\sqrt{5}} \end{bmatrix} \approx \begin{bmatrix} -0.4472 \\ 0.8944 \end{bmatrix}$

---

## Part (b): Using the eigenvectors from Part (a), derive the corresponding principal component equations. `[2 marks]`

### Beginner’s Explanation
Each Principal Component ($Y_i$) is formed by taking the numbers in the eigenvector $e_i$ and using them as multiplier weights for $X_1$ and $X_2$:

$$
Y_1 = e_1' X = e_{11} X_1 + e_{12} X_2
$$

$$
Y_2 = e_2' X = e_{21} X_1 + e_{22} X_2
$$

### Final Answer for Part (b)
* **First Principal Component ($Y_1$):**

  $$
  Y_1 = \frac{2}{\sqrt{5}} X_1 + \frac{1}{\sqrt{5}} X_2 = 0.8944 X_1 + 0.4472 X_2
  $$

* **Second Principal Component ($Y_2$):**

  $$
  Y_2 = -\frac{1}{\sqrt{5}} X_1 + \frac{2}{\sqrt{5}} X_2 = -0.4472 X_1 + 0.8944 X_2
  $$

*(Note: If written in mean-centered form, $Y_1 = 0.8944(X_1 - \mu_1) + 0.4472(X_2 - \mu_2)$ and $Y_2 = -0.4472(X_1 - \mu_1) + 0.8944(X_2 - \mu_2)$).*

---

## Part (c): Derive the correlation matrix of $X_1$ and $X_2$. `[3 marks]`

### Beginner’s Explanation: What is a Correlation Matrix ($\rho$)?
While covariance ($\sigma_{12}$) measures how two variables move together in their raw units, **correlation ($\rho_{12}$, pronounced *"rho"* )** scales the covariance so that it always lies between $-1$ and $+1$.
The formula to convert covariance into correlation is:

$$
\rho_{ij} = \frac{\sigma_{ij}}{\sqrt{\sigma_{ii}} \sqrt{\sigma_{jj}}} = \frac{\text{Cov}(X_i, X_j)}{\text{SD}(X_i) \times \text{SD}(X_j)}
$$

And the correlation of any variable with itself ($\rho_{11}$ and $\rho_{22}$) is always equal to $1$!

---

### Step-by-Step Calculation
From $\Sigma = \begin{bmatrix} 5 & 2 \\ 2 & 2 \end{bmatrix}$:
* $\sigma_{11} = 5 \implies \sqrt{\sigma_{11}} = \sqrt{5}$
* $\sigma_{22} = 2 \implies \sqrt{\sigma_{22}} = \sqrt{2}$
* $\sigma_{12} = \sigma_{21} = 2$

Substitute these into the correlation formula:

$$
\rho_{12} = \rho_{21} = \frac{\sigma_{12}}{\sqrt{\sigma_{11}} \sqrt{\sigma_{22}}} = \frac{2}{\sqrt{5} \times \sqrt{2}} = \frac{2}{\sqrt{10}} = \sqrt{\frac{4}{10}} = \sqrt{0.4} \approx 0.6325
$$

### Final Answer for Part (c)
The population correlation matrix $\rho$ is:

$$
\rho = \begin{bmatrix} 1 & \frac{2}{\sqrt{10}} \\ \frac{2}{\sqrt{10}} & 1 \end{bmatrix} \approx \begin{bmatrix} 1.0000 & 0.6325 \\ 0.6325 & 1.0000 \end{bmatrix}
$$

---

## Part (d): Derive the principal component equations obtained from the correlation matrix with respect to $X_1, X_2, \mu_1$, and $\mu_2$. `[4 marks]`

We are given the eigenvalue-eigenvector pairs of the correlation matrix $\rho$:
* $\lambda_1 = 1.63, \quad e_1' = [0.707, \, 0.707]$
* $\lambda_2 = 0.37, \quad e_2' = [-0.707, \, 0.707]$

### Beginner’s Explanation: How Do PCs from a Correlation Matrix Work?
When we compute Principal Components from a **correlation matrix** instead of a covariance matrix, we are computing principal components of the **standardized variables ($Z_1$ and $Z_2$)**, not the raw variables ($X_1$ and $X_2$)!

How do you standardize a random variable $X_k$? You subtract its mean $\mu_k$ and divide by its standard deviation $\sqrt{\sigma_{kk}}$:

$$
Z_1 = \frac{X_1 - \mu_1}{\sqrt{\sigma_{11}}} = \frac{X_1 - \mu_1}{\sqrt{5}} \quad \text{and} \quad Z_2 = \frac{X_2 - \mu_2}{\sqrt{\sigma_{22}}} = \frac{X_2 - \mu_2}{\sqrt{2}}
$$

---

### Step-by-Step Calculation
1. **Write the Principal Components ($Y_1^*$ and $Y_2^*$) in terms of $Z_1$ and $Z_2$:**

   $$
   Y_1^* = e_1' Z = 0.707 Z_1 + 0.707 Z_2
   $$

   $$
   Y_2^* = e_2' Z = -0.707 Z_1 + 0.707 Z_2
   $$

2. **Substitute $Z_1 = \frac{X_1 - \mu_1}{\sqrt{5}}$ and $Z_2 = \frac{X_2 - \mu_2}{\sqrt{2}}$ to express them in terms of $X_1, X_2, \mu_1, \mu_2$:**
   *(Note that $0.707 \approx \frac{1}{\sqrt{2}}$, so $\frac{0.707}{\sqrt{5}} = \frac{1}{\sqrt{10}} \approx 0.3162$ and $\frac{0.707}{\sqrt{2}} = \frac{1}{2} = 0.5000$.)*

   * **For the First Principal Component ($Y_1^*$):**

     $$
     Y_1^* = 0.707\left(\frac{X_1 - \mu_1}{\sqrt{5}}\right) + 0.707\left(\frac{X_2 - \mu_2}{\sqrt{2}}\right) = 0.3162(X_1 - \mu_1) + 0.5000(X_2 - \mu_2)
     $$

   * **For the Second Principal Component ($Y_2^*$):**

     $$
     Y_2^* = -0.707\left(\frac{X_1 - \mu_1}{\sqrt{5}}\right) + 0.707\left(\frac{X_2 - \mu_2}{\sqrt{2}}\right) = -0.3162(X_1 - \mu_1) + 0.5000(X_2 - \mu_2)
     $$

### Final Answer for Part (d)

$$
Y_1^* = 0.707\left(\frac{X_1 - \mu_1}{\sqrt{5}}\right) + 0.707\left(\frac{X_2 - \mu_2}{\sqrt{2}}\right) = 0.3162(X_1 - \mu_1) + 0.5000(X_2 - \mu_2)
$$

$$
Y_2^* = -0.707\left(\frac{X_1 - \mu_1}{\sqrt{5}}\right) + 0.707\left(\frac{X_2 - \mu_2}{\sqrt{2}}\right) = -0.3162(X_1 - \mu_1) + 0.5000(X_2 - \mu_2)
$$

---

## Part (e): Calculate the proportions of the total variance explained by the first principal component derived from the covariance matrix and the correlation matrix. `[4 marks]`

### Beginner’s Explanation
The **proportion of total variance explained** by the first principal component is simply:

$$
\text{Proportion of Variance Explained by PC}_1 = \frac{\text{Variance of PC}_1}{\text{Total Variance of All Variables}} = \frac{\lambda_1}{\lambda_1 + \lambda_2}
$$

---

### Step-by-Step Calculation

1. **For the First Principal Component derived from the Covariance Matrix ($\Sigma$):**
   * From Part (a), $\lambda_1 = 6$ and $\lambda_2 = 1$.
   * Total variance $= \sigma_{11} + \sigma_{22} = \lambda_1 + \lambda_2 = 6 + 1 = 7$.
   * Proportion of total variance explained:

     $$
     \frac{\lambda_1}{\lambda_1 + \lambda_2} = \frac{6}{7} \approx 0.8571 \quad (\text{or } 85.71\%)
     $$

2. **For the First Principal Component derived from the Correlation Matrix ($\rho$):**
   * From Part (d), $\lambda_1^* = 1.63$ and $\lambda_2^* = 0.37$.
   * Total standardized variance $= p = 2$ (since $\lambda_1^* + \lambda_2^* = 1.63 + 0.37 = 2.00$).
   * Proportion of total variance explained:

     $$
     \frac{\lambda_1^*}{\lambda_1^* + \lambda_2^*} = \frac{1.63}{2} = 0.8150 \quad (\text{or } 81.50\%)
     $$

---

## Part (f): Calculate the correlations between the following sets of variables.

### Beginner’s Concept: Correlation Between a Principal Component and an Original Variable
How strongly is a Principal Component $Y_i$ correlated with the $k$-th input variable $X_k$?
There is a standard textbook formula in Multivariate Methods:
* **For PCs from a Covariance Matrix $\Sigma$:**

  $$
  \rho_{Y_i, X_k} = \frac{e_{ik}\sqrt{\lambda_i}}{\sqrt{\sigma_{kk}}}
  $$

* **For PCs from a Correlation Matrix $\rho$ (where each standardized variable $Z_k$ has variance $\sigma_{kk} = 1$):**

  $$
  \rho_{Y_i^*, Z_k} = e_{ik}\sqrt{\lambda_i^*}
  $$

Let us apply both formulas step by step.

---

### (f)(i) Correlations between the standardized variables ($Z_1, Z_2$) and the first principal component ($Y_1^*$) derived from the correlation matrix. `[2 marks]`

From Part (d), for the correlation matrix we have $\lambda_1^* = 1.63$, $e_{11} = 0.707$, and $e_{12} = 0.707$:
* First compute $\sqrt{\lambda_1^*} = \sqrt{1.63} \approx 1.2767$.
* **Correlation between $Z_1$ and $Y_1^*$:**

  $$
  \rho_{Y_1^*, Z_1} = e_{11}\sqrt{\lambda_1^*} = (0.707)\sqrt{1.63} = 0.707 \times 1.2767 \approx 0.9026
  $$

* **Correlation between $Z_2$ and $Y_1^*$:**

  $$
  \rho_{Y_1^*, Z_2} = e_{12}\sqrt{\lambda_1^*} = (0.707)\sqrt{1.63} = 0.707 \times 1.2767 \approx 0.9026
  $$

---

### (f)(ii) Correlations between the original variables ($X_1, X_2$) and the first principal component ($Y_1$) derived from the covariance matrix. `[2 marks]`

From Part (a), for the covariance matrix we have $\lambda_1 = 6$, $e_{11} = \frac{2}{\sqrt{5}} \approx 0.8944$, $e_{12} = \frac{1}{\sqrt{5}} \approx 0.4472$, $\sigma_{11} = 5$, and $\sigma_{22} = 2$:
* **Correlation between $X_1$ and $Y_1$:**

  $$
  \rho_{Y_1, X_1} = \frac{e_{11}\sqrt{\lambda_1}}{\sqrt{\sigma_{11}}} = \frac{\left(\frac{2}{\sqrt{5}}\right)\sqrt{6}}{\sqrt{5}} = \frac{2\sqrt{6}}{5} \approx \frac{2(2.4495)}{5} \approx 0.9798
  $$

* **Correlation between $X_2$ and $Y_1$:**

  $$
  \rho_{Y_1, X_2} = \frac{e_{12}\sqrt{\lambda_1}}{\sqrt{\sigma_{22}}} = \frac{\left(\frac{1}{\sqrt{5}}\right)\sqrt{6}}{\sqrt{2}} = \frac{\sqrt{6}}{\sqrt{10}} = \sqrt{0.6} \approx 0.7746
  $$

---

## Part (g): Does the standardization of the variables affect the principal components? Explain your answer using the results from Part (f). `[3 marks]`

### Step-by-Step Explanation and Conclusion
**Yes, standardization of the variables significantly affects the principal components** (because Principal Component Analysis is **not scale-invariant**):

1. **Before Standardization (Using the Covariance Matrix $\Sigma$):**
   * $X_1$ has a much larger variance ($\sigma_{11} = 5$) than $X_2$ ($\sigma_{22} = 2$).
   * Because PCA seeks to maximize total variance, $X_1$ dominates the first principal component $Y_1$ (its weight is $0.8944$, twice as large as $X_2$'s weight of $0.4472$).
   * As shown in **Part (f)(ii)**, $Y_1$ has a much higher correlation with $X_1$ ($\rho_{Y_1, X_1} = 0.9798$) than with $X_2$ ($\rho_{Y_1, X_2} = 0.7746$), and $Y_1$ explains $85.71\%$ of the total variance.

2. **After Standardization (Using the Correlation Matrix $\rho$):**
   * Both standardized variables $Z_1$ and $Z_2$ are placed on an equal footing with a variance of $1.0$.
   * Consequently, $Z_1$ and $Z_2$ receive equal weights ($0.707$ and $0.707$) in the first principal component $Y_1^*$.
   * As shown in **Part (f)(i)**, $Z_1$ and $Z_2$ are **equally correlated** with the first principal component ($\rho_{Y_1^*, Z_1} = \rho_{Y_1^*, Z_2} = 0.9026$), and the proportion of variance explained by the first component changes to $81.50\%$.

---
---

# Question 3 `[Total: 25 Marks]`

## Reference Setup from the Question
We are given a $4 \times 4$ sample covariance matrix $S$ for $p = 4$ variables:

$$
S = \begin{bmatrix} 11 & 8 & 4 & 4 \\ 8 & 10 & 3 & 6 \\ 4 & 3 & 9 & 7 \\ 4 & 6 & 7 & 8 \end{bmatrix}
$$

and its four eigenvalue-eigenvector pairs:
* $\lambda_1 = 25.66, \quad e_1' = [-0.543, \, -0.542, \, -0.428, \, -0.477]$
* $\lambda_2 = 8.65, \quad e_2' = [0.492, \, 0.392, \, -0.656, \, -0.417]$
* $\lambda_3 = 3.56, \quad e_3' = [-0.610, \, 0.555, \, -0.388, \, 0.412]$
* $\lambda_4 = 0.12, \quad e_4' = [0.301, \, -0.495, \, -0.485, \, 0.655]$

---

### Beginner’s Foundation: What is Factor Analysis (FA) and How Does the Principal Component Solution Method Work?

1. **The Core Idea of Factor Analysis:**
   Suppose we measure $p = 4$ variables ($X_1, X_2, X_3, X_4$). We notice that they correlate with one another. Factor Analysis assumes that these $4$ observed variables are driven by a smaller number ($m < 4$, say $m = 2$) of hidden, unobservable variables called **Common Factors ($F_1, F_2$)**, plus a bit of noise unique to each variable called **Specific Factors ($\varepsilon_1, \varepsilon_2, \varepsilon_3, \varepsilon_4$)**.

2. **Key Vocabulary Explained Simply:**
   * **Factor Loadings ($\tilde{l}_{ij}$):** The weight (or correlation/regression coefficient) showing how strongly Variable $i$ depends on Factor $j$.
   * **Communality ($\tilde{h}_i^2$):** The portion of Variable $i$'s variance that is **shared** with the other variables through the common factors. It is calculated by squaring and adding up Variable $i$'s factor loadings across the $m$ factors:

     $$
     \tilde{h}_i^2 = \tilde{l}_{i1}^2 + \tilde{l}_{i2}^2 + \dots + \tilde{l}_{im}^2
     $$

   * **Specific Variance ($\tilde{\psi}_i$, pronounced *"psi"*):** The leftover variance of Variable $i$ that is **NOT explained** by the common factors (unique to Variable $i$). Since Total Variance $=$ Communality $+$ Specific Variance:

     $$
     \tilde{\psi}_i = s_{ii} - \tilde{h}_i^2
     $$

     where $s_{ii}$ is the $i$-th diagonal element of the sample covariance matrix $S$ ($s_{11}=11, s_{22}=10, s_{33}=9, s_{44}=8$).

3. **How do we calculate Factor Loadings using the "Principal Component Solution Method"?**
   To get the column of factor loadings for the $j$-th factor ($\tilde{l}_j$), you simply multiply the $j$-th eigenvector $e_j$ by the **square root of the $j$-th eigenvalue ($\sqrt{\lambda_j}$)**:

   $$
   \tilde{l}_j = \sqrt{\lambda_j} \, e_j
   $$

---

## Part (a): Calculate the factor loadings (initial) of a two-factor model ($m = 2$) using the principal component solution method. `[3 marks]`

### Step-by-Step Calculation
For a two-factor model ($m = 2$), we use the first **two** eigenvalue-eigenvector pairs ($\lambda_1, e_1$ and $\lambda_2, e_2$).

#### Step 1: Calculate $\sqrt{\lambda_1}$ and $\sqrt{\lambda_2}$
* $\sqrt{\lambda_1} = \sqrt{25.66} \approx 5.06557$
* $\sqrt{\lambda_2} = \sqrt{8.65} \approx 2.94109$

#### Step 2: Calculate the Factor 1 Loadings ($\tilde{l}_{i1} = \sqrt{\lambda_1} \, e_{i1}$)
Multiply each number in $e_1' = [-0.543, \, -0.542, \, -0.428, \, -0.477]$ by $\sqrt{25.66} \approx 5.06557$:
* Variable $X_1$: $\tilde{l}_{11} = 5.06557 \times (-0.543) = -2.7506 \approx -2.751$
* Variable $X_2$: $\tilde{l}_{21} = 5.06557 \times (-0.542) = -2.7455 \approx -2.746$
* Variable $X_3$: $\tilde{l}_{31} = 5.06557 \times (-0.428) = -2.1681 \approx -2.168$
* Variable $X_4$: $\tilde{l}_{41} = 5.06557 \times (-0.477) = -2.4163 \approx -2.416$

#### Step 3: Calculate the Factor 2 Loadings ($\tilde{l}_{i2} = \sqrt{\lambda_2} \, e_{i2}$)
Multiply each number in $e_2' = [0.492, \, 0.392, \, -0.656, \, -0.417]$ by $\sqrt{8.65} \approx 2.94109$:
* Variable $X_1$: $\tilde{l}_{12} = 2.94109 \times (0.492) = 1.4470 \approx 1.447$
* Variable $X_2$: $\tilde{l}_{22} = 2.94109 \times (0.392) = 1.1529 \approx 1.153$
* Variable $X_3$: $\tilde{l}_{32} = 2.94109 \times (-0.656) = -1.9294 \approx -1.929$
* Variable $X_4$: $\tilde{l}_{42} = 2.94109 \times (-0.417) = -1.2264 \approx -1.226$

### Final Answer for Part (a)
The initial $4 \times 2$ factor loading matrix $\tilde{L}$ for the two-factor model is:

| Variable | Factor 1 ($\tilde{l}_{i1}$) | Factor 2 ($\tilde{l}_{i2}$) |
| :---: | :---: | :---: |
| **$X_1$** | $-2.751$ | $1.447$ |
| **$X_2$** | $-2.746$ | $1.153$ |
| **$X_3$** | $-2.168$ | $-1.929$ |
| **$X_4$** | $-2.416$ | $-1.226$ |

$$
\tilde{L} = \begin{bmatrix} -2.751 & 1.447 \\ -2.746 & 1.153 \\ -2.168 & -1.929 \\ -2.416 & -1.226 \end{bmatrix}
$$

---

## Part (b): Calculate the communalities of each variable using the factor loadings derived in Part (a). `[2 marks]`

### Step-by-Step Calculation
For a two-factor model ($m = 2$), the communality of Variable $i$ is the sum of its squared loadings across Factor 1 and Factor 2:

$$
\tilde{h}_i^2 = \tilde{l}_{i1}^2 + \tilde{l}_{i2}^2
$$

* **For Variable $X_1$:**

  $$
  \tilde{h}_1^2 = (-2.751)^2 + (1.447)^2 = 7.5680 + 2.0938 = 9.6618 \approx 9.662
  $$

* **For Variable $X_2$:**

  $$
  \tilde{h}_2^2 = (-2.746)^2 + (1.153)^2 = 7.5405 + 1.3294 = 8.8699 \approx 8.870
  $$

* **For Variable $X_3$:**

  $$
  \tilde{h}_3^2 = (-2.168)^2 + (-1.929)^2 = 4.7002 + 3.7210 = 8.4212 \approx 8.421
  $$

* **For Variable $X_4$:**

  $$
  \tilde{h}_4^2 = (-2.416)^2 + (-1.226)^2 = 5.8371 + 1.5031 = 7.3402 \approx 7.340
  $$

---

## Part (c): Calculate the specific variances of each variable using the communalities calculated in Part (b). `[2 marks]`

### Step-by-Step Calculation
Using the formula given in the question hint, $\tilde{\psi}_i = s_{ii} - \tilde{h}_i^2$, where the sample variances $s_{ii}$ on the main diagonal of $S$ are $s_{11} = 11$, $s_{22} = 10$, $s_{33} = 9$, and $s_{44} = 8$:

* **For Variable $X_1$:**

  $$
  \tilde{\psi}_1 = s_{11} - \tilde{h}_1^2 = 11 - 9.662 = 1.338
  $$

* **For Variable $X_2$:**

  $$
  \tilde{\psi}_2 = s_{22} - \tilde{h}_2^2 = 10 - 8.870 = 1.130
  $$

* **For Variable $X_3$:**

  $$
  \tilde{\psi}_3 = s_{33} - \tilde{h}_3^2 = 9 - 8.421 = 0.579
  $$

* **For Variable $X_4$:**

  $$
  \tilde{\psi}_4 = s_{44} - \tilde{h}_4^2 = 8 - 7.340 = 0.660
  $$

Written as the diagonal specific variance matrix $\tilde{\Psi}$:

$$
\tilde{\Psi} = \begin{bmatrix} 1.338 & 0 & 0 & 0 \\ 0 & 1.130 & 0 & 0 \\ 0 & 0 & 0.579 & 0 \\ 0 & 0 & 0 & 0.660 \end{bmatrix}
$$

---

## Part (d): Calculate the proportion of the total sample variance explained by the two-factor model. `[1 mark]`

### Step-by-Step Calculation
1. **Find the Total Sample Variance:**
   Add up the diagonal elements (variances) of the sample covariance matrix $S$:

   $$
   \text{Total Sample Variance} = \text{tr}(S) = s_{11} + s_{22} + s_{33} + s_{44} = 11 + 10 + 9 + 8 = 38
   $$

2. **Find the Variance Explained by the Two Factors:**
   Add the first two eigenvalues $\lambda_1 + \lambda_2$ (which also equals the sum of the four communalities $\sum_{i=1}^4 \tilde{h}_i^2 = 9.662 + 8.870 + 8.421 + 7.340 = 34.293 \approx 34.31$):

   $$
   \lambda_1 + \lambda_2 = 25.66 + 8.65 = 34.31
   $$

3. **Divide to find the Proportion Explained:**

   $$
   \text{Proportion Explained} = \frac{\lambda_1 + \lambda_2}{s_{11} + s_{22} + s_{33} + s_{44}} = \frac{34.31}{38} \approx 0.9029 \quad (\text{or } 90.29\%)
   $$

---

## Part (e): Reproduce the sample covariance matrix with the factor loadings and the specific variances derived above. What can you say about the two-factor model? `[7 marks]`

### Beginner’s Explanation: How Do We "Reproduce" the Covariance Matrix?
In Factor Analysis, our model claims that the covariance matrix $S$ can be reconstructed (reproduced) using the formula:

$$
\tilde{\Sigma}_{(2)} = \tilde{L}\tilde{L}' + \tilde{\Psi}
$$

What does $\tilde{L}\tilde{L}' + \tilde{\Psi}$ mean in plain arithmetic?
* **For the diagonal elements (Row $i$, Column $i$):**
  The $(i,i)$ entry is $\tilde{l}_{i1}^2 + \tilde{l}_{i2}^2 + \tilde{\psi}_i = \tilde{h}_i^2 + (s_{ii} - \tilde{h}_i^2) = s_{ii}$. That means the diagonal entries of the reproduced matrix **always match the original diagonal variances $11, 10, 9, 8$ exactly!**
* **For the off-diagonal elements (Row $i$, Column $j$ where $i \neq j$):**
  Since $\tilde{\Psi}$ has zeros off the diagonal, the reproduced covariance between Variable $i$ and Variable $j$ is simply the dot product of Row $i$ and Row $j$ of the loading matrix $\tilde{L}$:

  $$
  \tilde{\sigma}_{ij} = \tilde{l}_{i1}\tilde{l}_{j1} + \tilde{l}_{i2}\tilde{l}_{j2}
  $$

Let us calculate every single off-diagonal entry step by step!

---

### Step-by-Step Calculation of Every Entry in $\tilde{\Sigma}_{(2)} = \tilde{L}\tilde{L}' + \tilde{\Psi}$

1. **Diagonal Entries:**
   * $(1,1): \tilde{h}_1^2 + \tilde{\psi}_1 = 9.662 + 1.338 = 11.000$
   * $(2,2): \tilde{h}_2^2 + \tilde{\psi}_2 = 8.870 + 1.130 = 10.000$
   * $(3,3): \tilde{h}_3^2 + \tilde{\psi}_3 = 8.421 + 0.579 = 9.000$
   * $(4,4): \tilde{h}_4^2 + \tilde{\psi}_4 = 7.340 + 0.660 = 8.000$

2. **Off-Diagonal Entries ($\tilde{l}_{i1}\tilde{l}_{j1} + \tilde{l}_{i2}\tilde{l}_{j2}$):**
   * **Row 1, Col 2 (and Row 2, Col 1):**

     $$
     (-2.751)(-2.746) + (1.447)(1.153) = 7.5542 + 1.6684 = 9.2226 \approx 9.223
     $$

   * **Row 1, Col 3 (and Row 3, Col 1):**

     $$
     (-2.751)(-2.168) + (1.447)(-1.929) = 5.9642 - 2.7913 = 3.1729 \approx 3.173
     $$

   * **Row 1, Col 4 (and Row 4, Col 1):**

     $$
     (-2.751)(-2.416) + (1.447)(-1.226) = 6.6464 - 1.7740 = 4.8724 \approx 4.872
     $$

   * **Row 2, Col 3 (and Row 3, Col 2):**

     $$
     (-2.746)(-2.168) + (1.153)(-1.929) = 5.9533 - 2.2241 = 3.7292 \approx 3.729
     $$

   * **Row 2, Col 4 (and Row 4, Col 2):**

     $$
     (-2.746)(-2.416) + (1.153)(-1.226) = 6.6343 - 1.4136 = 5.2207 \approx 5.221
     $$

   * **Row 3, Col 4 (and Row 4, Col 3):**

     $$
     (-2.168)(-2.416) + (-1.929)(-1.226) = 5.2379 + 2.3650 = 7.6029 \approx 7.603
     $$

#### The Reproduced Sample Covariance Matrix ($m = 2$):

$$
\tilde{\Sigma}_{(2)} = \tilde{L}\tilde{L}' + \tilde{\Psi} = \begin{bmatrix} 11.000 & 9.223 & 3.173 & 4.872 \\ 9.223 & 10.000 & 3.729 & 5.221 \\ 3.173 & 3.729 & 9.000 & 7.603 \\ 4.872 & 5.221 & 7.603 & 8.000 \end{bmatrix}
$$

#### Residual Matrix ($S - \tilde{\Sigma}_{(2)}$) and Assessment of the Two-Factor Model:
To see how well $\tilde{\Sigma}_{(2)}$ approximates $S$, let us subtract $\tilde{\Sigma}_{(2)}$ from the original $S$:

$$
\text{Residual Matrix } = S - \tilde{\Sigma}_{(2)} = \begin{bmatrix} 0.000 & -1.223 & 0.827 & -0.872 \\ -1.223 & 0.000 & -0.729 & 0.779 \\ 0.827 & -0.729 & 0.000 & -0.603 \\ -0.872 & 0.779 & -0.603 & 0.000 \end{bmatrix}
$$

* **What can we say about the two-factor model?**
  1. The two-factor model explains a very high proportion ($90.29\%$) of the total sample variance.
  2. The communalities of all four variables are high ($9.662$ out of $11$, $8.870$ out of $10$, $8.421$ out of $9$, and $7.340$ out of $8$), meaning specific variances ($\tilde{\psi}_i$) are small.
  3. The reproduced covariance matrix $\tilde{\Sigma}_{(2)}$ is very close to the original sample covariance matrix $S$ (all residuals in $S - \tilde{\Sigma}_{(2)}$ are small, around $0.6$ to $1.2$). Therefore, **the two-factor model provides a good fit to the data**.

---

## Part (f): Now reproduce the sample covariance matrix for a one-factor model ($m = 1$) using the principal component solution method. Compare the reproduced covariance matrices of the two models (one-factor and two-factor models). `[7 marks]`

### Step-by-Step Calculation for the One-Factor Model ($m = 1$)
In a one-factor model ($m = 1$), we only keep the **first column** of factor loadings $\tilde{L}_{(1)}$ from Part (a):

$$
\tilde{L}_{(1)} = \begin{bmatrix} -2.751 \\ -2.746 \\ -2.168 \\ -2.416 \end{bmatrix}
$$

#### Step 1: Communalities ($\tilde{h}_i^2 = \tilde{l}_{i1}^2$) and Specific Variances ($\tilde{\psi}_i = s_{ii} - \tilde{l}_{i1}^2$) for $m = 1$
* $X_1$: $\tilde{h}_1^2 = (-2.751)^2 = 7.568 \implies \tilde{\psi}_1 = 11 - 7.568 = 3.432$
* $X_2$: $\tilde{h}_2^2 = (-2.746)^2 = 7.541 \implies \tilde{\psi}_2 = 10 - 7.541 = 2.459$
* $X_3$: $\tilde{h}_3^2 = (-2.168)^2 = 4.700 \implies \tilde{\psi}_3 = 9 - 4.700 = 4.300$
* $X_4$: $\tilde{h}_4^2 = (-2.416)^2 = 5.837 \implies \tilde{\psi}_4 = 8 - 5.837 = 2.163$

#### Step 2: Calculate the Off-Diagonal Entries of $\tilde{\Sigma}_{(1)} = \tilde{L}_{(1)}\tilde{L}_{(1)}' + \tilde{\Psi}_{(1)}$
For $m = 1$, each off-diagonal entry $(i,j)$ is simply $\tilde{l}_{i1} \times \tilde{l}_{j1}$:
* **Row 1, Col 2:** $(-2.751)(-2.746) = 7.554$
* **Row 1, Col 3:** $(-2.751)(-2.168) = 5.964$
* **Row 1, Col 4:** $(-2.751)(-2.416) = 6.646$
* **Row 2, Col 3:** $(-2.746)(-2.168) = 5.953$
* **Row 2, Col 4:** $(-2.746)(-2.416) = 6.634$
* **Row 3, Col 4:** $(-2.168)(-2.416) = 5.238$

*(Note that the diagonal entries $\tilde{h}_i^2 + \tilde{\psi}_i$ are still $11, 10, 9, 8$.)*

#### The Reproduced Sample Covariance Matrix ($m = 1$):

$$
\tilde{\Sigma}_{(1)} = \tilde{L}_{(1)}\tilde{L}_{(1)}' + \tilde{\Psi}_{(1)} = \begin{bmatrix} 11.000 & 7.554 & 5.964 & 6.646 \\ 7.554 & 10.000 & 5.953 & 6.634 \\ 5.964 & 5.953 & 9.000 & 5.238 \\ 6.646 & 6.634 & 5.238 & 8.000 \end{bmatrix}
$$

#### Residual Matrix for the One-Factor Model ($S - \tilde{\Sigma}_{(1)}$):

$$
S - \tilde{\Sigma}_{(1)} = \begin{bmatrix} 0.000 & 0.446 & -1.964 & -2.646 \\ 0.446 & 0.000 & -2.953 & -0.634 \\ -1.964 & -2.953 & 0.000 & 1.762 \\ -2.646 & -0.634 & 1.762 & 0.000 \end{bmatrix}
$$

#### Comparison Between the One-Factor ($m = 1$) and Two-Factor ($m = 2$) Models:
1. **Variance Explained:** The one-factor model explains only $\frac{25.66}{38} = 67.53\%$ of the total sample variance, whereas the two-factor model explains $90.29\%$.
2. **Accuracy of Reproduced Covariances:** In the one-factor model, the reproduced off-diagonal covariances have **large residuals (errors)** when compared to $S$:
   * For $(2,3)$, $s_{23} = 3$, but $\tilde{\Sigma}_{(1)}$ gives $5.953$ (an error of $-2.953$), whereas $\tilde{\Sigma}_{(2)}$ gives $3.729$ (an error of only $-0.729$).
   * For $(1,4)$, $s_{14} = 4$, but $\tilde{\Sigma}_{(1)}$ gives $6.646$ (an error of $-2.646$), whereas $\tilde{\Sigma}_{(2)}$ gives $4.872$ (an error of only $-0.872$).
   * For $(1,3)$, $s_{13} = 4$, but $\tilde{\Sigma}_{(1)}$ gives $5.964$ (an error of $-1.964$), whereas $\tilde{\Sigma}_{(2)}$ gives $3.173$ (an error of only $0.827$).
   * For $(3,4)$, $s_{34} = 7$, but $\tilde{\Sigma}_{(1)}$ gives $5.238$ (an error of $+1.762$), whereas $\tilde{\Sigma}_{(2)}$ gives $7.603$ (an error of only $-0.603$).
3. **Conclusion:** Looking at the original matrix $S$, variables $(X_1, X_2)$ are strongly correlated with each other ($s_{12} = 8$) and variables $(X_3, X_4)$ are strongly correlated with each other ($s_{34} = 7$), representing two distinct clusters of variables. A one-factor model fails to separate these two clusters, whereas the **two-factor model ($m = 2$) reproduces the sample covariance matrix $S$ much more accurately**.

---

## Part (g): Briefly explain what factor rotation is and why we need factor rotation. `[3 marks]`

### Beginner’s Explanation & Complete Exam Answer
1. **What is Factor Rotation?**
   Factor rotation is a mathematical transformation in which the coordinate axes of the extracted factors are rotated in the $m$-dimensional factor space (by multiplying the initial $p \times m$ loading matrix $\tilde{L}$ by an $m \times m$ transformation matrix $T$, giving rotated loadings $\tilde{L}^* = \tilde{L}T$).
   * In **orthogonal rotation** (such as **Varimax**), the axes are kept at $90^\circ$ angles so the factors remain uncorrelated, and the communalities ($\tilde{h}_i^2$) and reproduced covariance matrix ($\tilde{L}\tilde{L}' + \tilde{\Psi}$) remain completely unchanged.
   * In **oblique rotation** (such as **Promax**), the axes are allowed to be non-perpendicular so the factors can correlate.

2. **Why Do We Need Factor Rotation?**
   Initial factor extraction methods (like the Principal Component method in Part (a)) are designed purely to maximize variance in sequential order. As a result, almost every variable loads moderately or heavily on the first factor and has mixed loadings on the second factor (for example, in Part (a), all four variables had loadings between $-2.17$ and $-2.75$ on Factor 1), making it very difficult to tell what each factor actually represents in the real world!
   We need factor rotation to achieve **"Simple Structure"**—a pattern where **each variable loads very highly on only ONE factor and has near-zero loadings on all other factors**. This makes the underlying latent factors clear, distinct, and easy to interpret and name.

---
---

# Question 4 `[Total: 25 Marks]`

## Part (a): One-Way MANOVA (Multivariate Analysis of Variance)

### Reference Setup from the Question
An experimenter collected observations on **two responses ($p = 2$)** for **three treatments ($g = 3$)** and derived the following one-way MANOVA table:

| Source of variation | Matrix of sum of squares and cross products (SSCP) | Degrees of freedom |
| :--- | :---: | :---: |
| **Treatment** | $\begin{bmatrix} 11 & -22 \\ -22 & 75 \end{bmatrix}$ | $?$ |
| **Residual** | $\begin{bmatrix} ? & ? \\ ? & ? \end{bmatrix}$ | $?$ |
| **Total (corrected)** | $\begin{bmatrix} 28 & -18 \\ -18 & 90 \end{bmatrix}$ | $149$ |

---

### Beginner’s Foundation: What is One-Way MANOVA?
1. **From ANOVA to MANOVA:**
   * In basic statistics, **One-Way ANOVA** tests whether $g = 3$ treatment groups have the same average on **one** response variable ($Y$). It splits Total variation ($SST$) into Treatment variation ($SSTr$) + Residual/Error variation ($SSE$).
   * **One-Way MANOVA** does the exact same thing when we measure **two or more response variables ($Y_1, Y_2$)** on every subject! Instead of single numbers for sums of squares, we have $2 \times 2$ **SSCP matrices** (Sum of Squares and Cross Products matrices):
     * $H$ (or $B$): The **Treatment (Between-group) SSCP matrix**.
     * $E$ (or $W$): The **Residual (Within-group / Error) SSCP matrix**.
     * $T = H + E$: The **Total (corrected) SSCP matrix**.

2. **How do the Degrees of Freedom ($df$) work?**
   Suppose there are $N$ total observations across all $g$ treatment groups:
   * $\text{Treatment } df = g - 1$
   * $\text{Residual } df = N - g$
   * $\text{Total (corrected) } df = N - 1$
   Notice that $\text{Treatment } df + \text{Residual } df = (g - 1) + (N - g) = N - 1 = \text{Total } df$!

---

### (a)(i) How many observations are in the experiment? Complete the MANOVA table. `[5 marks]`

#### Step 1: Find the Total Number of Observations ($N$)
Look at the bottom right of the table: the **Total (corrected) degrees of freedom** is $149$.
Since $\text{Total } df = N - 1$:

$$
N - 1 = 149 \implies N = 149 + 1 = 150 \text{ observations}
$$

#### Step 2: Find the Treatment and Residual Degrees of Freedom
* We are told there are **three treatments**, so $g = 3$.
  * $\text{Treatment } df = g - 1 = 3 - 1 = 2$
  * $\text{Residual } df = \text{Total } df - \text{Treatment } df = 149 - 2 = 147$ (or $N - g = 150 - 3 = 147$).

#### Step 3: Find the Residual SSCP Matrix ($E$)
Since $\text{Total Matrix } (T) = \text{Treatment Matrix } (H) + \text{Residual Matrix } (E)$, we find the Residual Matrix by subtracting the Treatment Matrix from the Total Matrix entry by entry:

$$
E = T - H = \begin{bmatrix} 28 & -18 \\ -18 & 90 \end{bmatrix} - \begin{bmatrix} 11 & -22 \\ -22 & 75 \end{bmatrix} = \begin{bmatrix} 28 - 11 & -18 - (-22) \\ -18 - (-22) & 90 - 75 \end{bmatrix} = \begin{bmatrix} 17 & 4 \\ 4 & 15 \end{bmatrix}
$$

#### Completed MANOVA Table:

| Source of variation | Matrix of sum of squares and cross products | Degrees of freedom |
| :--- | :---: | :---: |
| **Treatment ($H$)** | $\begin{bmatrix} 11 & -22 \\ -22 & 75 \end{bmatrix}$ | $2$ |
| **Residual ($E$)** | $\begin{bmatrix} 17 & 4 \\ 4 & 15 \end{bmatrix}$ | $147$ |
| **Total (corrected) ($T$)** | $\begin{bmatrix} 28 & -18 \\ -18 & 90 \end{bmatrix}$ | $149$ |

---

### (a)(ii) Calculate Wilks' lambda, $\Lambda^*$, and test for treatment effects. Repeat the test using the large-sample procedure. Compare the conclusions. (Hint: $F_{4, 292}(.01) = 3.38$ and $\chi_4^2(.01) = 13.28$) `[6 marks]`

#### Beginner’s Concept: What is Wilks' Lambda ($\Lambda^*$)?
In MANOVA, we want to compare the size of the Error matrix $E$ to the size of the Total matrix $H + E$. How do we measure the "overall size" (generalized variance) of a square matrix? By taking its **determinant**!
**Wilks' Lambda ($\Lambda^*$)** is the ratio of the determinant of the Residual (Error) matrix $|E|$ to the determinant of the Total matrix $|H + E|$:

$$
\Lambda^* = \frac{|E|}{|H + E|}
$$

* If there is **no treatment effect** ($H$ is close to zero), then $|E|$ is almost the same as $|H + E|$, so $\Lambda^*$ is close to $1$.
* If there is a **strong treatment effect** ($H$ is large), then $|E|$ is much smaller than $|H + E|$, so **$\Lambda^*$ is small (close to $0$)**.
* To test if $\Lambda^*$ is significantly small, we convert $\Lambda^*$ into either an **exact $F$-statistic** or a **large-sample $\chi^2$ (Chi-Square) statistic**.

---

#### Step-by-Step Calculation

##### Step 1: State the Null and Alternative Hypotheses
Let $\mu_1, \mu_2, \mu_3$ be the population mean vectors (for the 2 responses) of Treatment 1, Treatment 2, and Treatment 3 (or let $\tau_1, \tau_2, \tau_3$ be the treatment effect vectors where $\mu_\ell = \mu + \tau_\ell$):
* **Null Hypothesis ($H_0$):** $\tau_1 = \tau_2 = \tau_3 = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$ (or $\mu_1 = \mu_2 = \mu_3$: there are no treatment effects; all three treatments have the same mean response vector).
* **Alternative Hypothesis ($H_1$):** At least one $\tau_\ell \neq \begin{bmatrix} 0 \\ 0 \end{bmatrix}$ (at least one treatment has a different mean response vector).

##### Step 2: Calculate Wilks' Lambda ($\Lambda^*$)
* Calculate the determinant of the Residual matrix $E = \begin{bmatrix} 17 & 4 \\ 4 & 15 \end{bmatrix}$:

  $$
  |E| = (17)(15) - (4)(4) = 255 - 16 = 239
  $$

* Calculate the determinant of the Total matrix $H + E = T = \begin{bmatrix} 28 & -18 \\ -18 & 90 \end{bmatrix}$:

  $$
  |H + E| = (28)(90) - (-18)(-18) = 2520 - 324 = 2196
  $$

* Divide $|E|$ by $|H + E|$ to get Wilks' Lambda:

  $$
  \Lambda^* = \frac{|E|}{|H + E|} = \frac{239}{2196} \approx 0.108834
  $$

##### Step 3: Exact $F$-Test for Treatment Effects
When the number of responses is $p = 2$ (and $g \ge 2$), there is an **exact $F$-distribution transformation** for Wilks' Lambda:

$$
F_{\text{calc}} = \left(\frac{1 - \sqrt{\Lambda^*}}{\sqrt{\Lambda^*}}\right) \left(\frac{N - g - 1}{g - 1}\right) \sim F_{2(g - 1), \, 2(N - g - 1)}
$$

Let us plug in our numbers ($N = 150, g = 3, \Lambda^* = 0.108834$):
* $\sqrt{\Lambda^*} = \sqrt{0.108834} \approx 0.32990$
* $\frac{1 - \sqrt{\Lambda^*}}{\sqrt{\Lambda^*}} = \frac{1 - 0.32990}{0.32990} = \frac{0.67010}{0.32990} \approx 2.03122$
* $\frac{N - g - 1}{g - 1} = \frac{150 - 3 - 1}{3 - 1} = \frac{146}{2} = 73$
* Multiply them together:

  $$
  F_{\text{calc}} = 2.03122 \times 73 \approx 148.28
  $$

* **Degrees of freedom for $F$:**
  * Numerator $df = 2(g - 1) = 2(3 - 1) = 4$
  * Denominator $df = 2(N - g - 1) = 2(150 - 3 - 1) = 2(146) = 292$
* **Decision & Conclusion ($\alpha = 0.01$):**
  We are given the critical value $F_{4, 292}(0.01) = 3.38$.
  Since $F_{\text{calc}} = 148.28 > 3.38$, we **reject $H_0$** at the $1\%$ significance level and conclude that there are highly statistically significant treatment effects (the mean response vectors differ across the three treatments).

##### Step 4: Repeat the Test Using the Large-Sample Procedure (Bartlett's Chi-Square Test)
For large total sample size $N$, **Bartlett’s Chi-Square approximation** states that under $H_0$:

$$
\chi_{\text{calc}}^2 = -\left(N - 1 - \frac{p + g}{2}\right) \ln(\Lambda^*) \stackrel{\text{approx}}{\sim} \chi_{p(g - 1)}^2
$$

Let us plug in $N = 150$, $p = 2$, $g = 3$, and $\Lambda^* = 0.108834$:
* Multiplier term: $N - 1 - \frac{p + g}{2} = 150 - 1 - \frac{2 + 3}{2} = 149 - 2.5 = 146.5$
* Natural logarithm: $\ln(0.108834) \approx -2.21793$
* Test statistic:

  $$
  \chi_{\text{calc}}^2 = -(146.5)(-2.21793) \approx 324.93
  $$

* **Degrees of freedom:** $p(g - 1) = 2(3 - 1) = 4$.
* **Decision & Conclusion ($\alpha = 0.01$):**
  We are given the critical value $\chi_4^2(0.01) = 13.28$.
  Since $\chi_{\text{calc}}^2 = 324.93 > 13.28$, we **reject $H_0$** at the $1\%$ level and conclude that significant treatment effects exist.

##### Step 5: Compare the Conclusions
Both the exact $F$-test ($F = 148.28 > 3.38$) and the large-sample chi-square procedure ($\chi^2 = 324.93 > 13.28$) lead to the **exact same conclusion**: overwhelming statistical evidence to reject $H_0$ at the $\alpha = 0.01$ level, confirming that the treatment mean vectors differ significantly.

---

### (a)(iii) Which assumptions have you made to validate your test in Part (ii)? `[2 marks]`

To validate the One-Way MANOVA test, we make three standard assumptions:
1. **Independence:** The observations from each treatment group are random samples that are independent both within each treatment group and across different treatment groups.
2. **Multivariate Normality:** Within each treatment group $\ell = 1, 2, 3$, the $p = 2$ response variables follow a bivariate normal distribution ($N_2(\mu_\ell, \Sigma_\ell)$).
3. **Homogeneity of Covariance Matrices:** All three treatment populations have the **same (common) variance-covariance matrix**: $\Sigma_1 = \Sigma_2 = \Sigma_3 = \Sigma$.

---

## Part (b): Profile Analysis of Two Independent Groups

### Reference Setup from the Question
Three psychological subtests ($p = 3$) were given to **$n_1 = 32$ men** and **$n_2 = 30$ women**:

| Subtests | Sample means: Male ($\bar{x}_1$) | Sample means: Female ($\bar{x}_2$) |
| :--- | :---: | :---: |
| **1. Tool recognition** | $16.1$ | $15.4$ |
| **2. Paper form board** | $26.5$ | $27.5$ |
| **3. Vocabulary** | $22.9$ | $21.7$ |

and the pooled sample covariance matrix is:

$$
S_{\text{pooled}} = \begin{bmatrix} 5 & 3 & 2 \\ 3 & 8 & 1 \\ 2 & 1 & 7 \end{bmatrix}
$$

---

### Beginner’s Foundation: What is Profile Analysis?
Imagine plotting the $3$ test averages for Men on a line graph and plotting the $3$ test averages for Women on the same line graph:
* **Test 1 (Tool recognition):** Male $= 16.1$, Female $= 15.4$
* **Test 2 (Paper form board):** Male $= 26.5$, Female $= 27.5$
* **Test 3 (Vocabulary):** Male $= 22.9$, Female $= 21.7$

Each group's line connecting Test 1 $\to$ Test 2 $\to$ Test 3 is called its **Profile**.
In **Profile Analysis**, we ask three sequential questions about these two lines:
1. **Question 1: Are the profiles PARALLEL? (No Group $\times$ Test Interaction)**
   Do the two lines go up and down by the same amount from Test 1 to Test 2, and from Test 2 to Test 3?
   * For Men: Test 1 $\to$ Test 2 jumps by $26.5 - 16.1 = +10.4$. Test 2 $\to$ Test 3 drops by $22.9 - 26.5 = -3.6$.
   * For Women: Test 1 $\to$ Test 2 jumps by $27.5 - 15.4 = +12.1$. Test 2 $\to$ Test 3 drops by $21.7 - 27.5 = -5.8$.
   We test if the population slopes $\begin{bmatrix} \mu_{12} - \mu_{11} \\ \mu_{13} - \mu_{12} \end{bmatrix}$ are equal for Men and Women using a **contrast matrix $C$**:

   $$
   C = \begin{bmatrix} -1 & 1 & 0 \\ 0 & -1 & 1 \end{bmatrix}
   $$

2. **Question 2: If they are parallel, are the profiles COINCIDENT? (Same Overall Level)**
   Are the two parallel lines right on top of each other (at the same height), or is one group consistently higher than the other? We test if the sum of the means $1'\mu_1 = \mu_{11} + \mu_{12} + \mu_{13}$ equals $1'\mu_2 = \mu_{21} + \mu_{22} + \mu_{23}$, where $1' = \begin{bmatrix} 1 & 1 & 1 \end{bmatrix}$.
3. **Question 3: If they are coincident, are the profiles LEVEL / FLAT? (Equal Subtest Means)**
   Is the single combined line completely flat (horizontal), meaning all 3 subtests have the exact same average score?

Let us work through each part step by step!

---

### (b)(i) Is the male psychological testing profile parallel to the female psychological testing profile? Test for parallel profiles with $\alpha = 0.01$. (Hint: $F_{2, 59}(.01) = 4.98$) `[5 marks]`

#### Step 1: State the Hypotheses for Parallel Profiles
Using the $(p - 1) \times p = 2 \times 3$ contrast matrix $C = \begin{bmatrix} -1 & 1 & 0 \\ 0 & -1 & 1 \end{bmatrix}$:
* **Null Hypothesis ($H_{01}$):** $C\mu_1 = C\mu_2$ (or $C(\mu_1 - \mu_2) = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$: the male and female profiles are parallel).
* **Alternative Hypothesis ($H_{11}$):** $C\mu_1 \neq C\mu_2$ (the profiles are not parallel).

#### Step 2: Calculate the Difference Between Sample Mean Vectors ($\bar{x}_1 - \bar{x}_2$) and Contrast Vector $C(\bar{x}_1 - \bar{x}_2)$

$$
\bar{x}_1 - \bar{x}_2 = \begin{bmatrix} 16.1 \\ 26.5 \\ 22.9 \end{bmatrix} - \begin{bmatrix} 15.4 \\ 27.5 \\ 21.7 \end{bmatrix} = \begin{bmatrix} 0.7 \\ -1.0 \\ 1.2 \end{bmatrix}
$$

Now multiply by the contrast matrix $C$:

$$
C(\bar{x}_1 - \bar{x}_2) = \begin{bmatrix} -1 & 1 & 0 \\ 0 & -1 & 1 \end{bmatrix} \begin{bmatrix} 0.7 \\ -1.0 \\ 1.2 \end{bmatrix} = \begin{bmatrix} (-1)(0.7) + (1)(-1.0) + (0)(1.2) \\ (0)(0.7) + (-1)(-1.0) + (1)(1.2) \end{bmatrix} = \begin{bmatrix} -1.7 \\ 2.2 \end{bmatrix}
$$

#### Step 3: Calculate the Contrast Covariance Matrix $C S_{\text{pooled}} C'$ and Its Inverse
* **Stage 3A: Multiply $C$ ($2 \times 3$) by $S_{\text{pooled}}$ ($3 \times 3$):**

  $$
  C S_{\text{pooled}} = \begin{bmatrix} -1 & 1 & 0 \\ 0 & -1 & 1 \end{bmatrix} \begin{bmatrix} 5 & 3 & 2 \\ 3 & 8 & 1 \\ 2 & 1 & 7 \end{bmatrix}
  $$

  * Row 1 of $C S_{\text{pooled}}$ (Row 2 minus Row 1 of $S_{\text{pooled}}$): $\begin{bmatrix} 3 - 5 & 8 - 3 & 1 - 2 \end{bmatrix} = \begin{bmatrix} -2 & 5 & -1 \end{bmatrix}$
  * Row 2 of $C S_{\text{pooled}}$ (Row 3 minus Row 2 of $S_{\text{pooled}}$): $\begin{bmatrix} 2 - 3 & 1 - 8 & 7 - 1 \end{bmatrix} = \begin{bmatrix} -1 & -7 & 6 \end{bmatrix}$

  So:

  $$
  C S_{\text{pooled}} = \begin{bmatrix} -2 & 5 & -1 \\ -1 & -7 & 6 \end{bmatrix}
  $$

* **Stage 3B: Multiply $C S_{\text{pooled}}$ ($2 \times 3$) by $C'$ ($3 \times 2$):**

  $$
  C S_{\text{pooled}} C' = \begin{bmatrix} -2 & 5 & -1 \\ -1 & -7 & 6 \end{bmatrix} \begin{bmatrix} -1 & 0 \\ 1 & -1 \\ 0 & 1 \end{bmatrix}
  $$

  * Row 1, Col 1: $(-2)(-1) + (5)(1) + (-1)(0) = 2 + 5 + 0 = 7$
  * Row 1, Col 2: $(-2)(0) + (5)(-1) + (-1)(1) = 0 - 5 - 1 = -6$
  * Row 2, Col 1: $(-1)(-1) + (-7)(1) + (6)(0) = 1 - 7 + 0 = -6$
  * Row 2, Col 2: $(-1)(0) + (-7)(-1) + (6)(1) = 0 + 7 + 6 = 13$

  So:

  $$
  C S_{\text{pooled}} C' = \begin{bmatrix} 7 & -6 \\ -6 & 13 \end{bmatrix}
  $$

* **Stage 3C: Find the inverse $(C S_{\text{pooled}} C')^{-1}$:**
  * Determinant $= (7)(13) - (-6)(-6) = 91 - 36 = 55$.
  * Swap the main diagonal entries ($7$ and $13$) and change the signs of the off-diagonal entries ($-6$ becomes $+6$):

    $$
    (C S_{\text{pooled}} C')^{-1} = \frac{1}{55} \begin{bmatrix} 13 & 6 \\ 6 & 7 \end{bmatrix}
    $$

#### Step 4: Calculate Hotelling’s $T^2$ Statistic for Parallel Profiles
The formula for Hotelling's $T^2$ is:

$$
T^2 = (\bar{x}_1 - \bar{x}_2)' C' \left[ \left(\frac{1}{n_1} + \frac{1}{n_2}\right) C S_{\text{pooled}} C' \right]^{-1} C (\bar{x}_1 - \bar{x}_2)
$$

* First, compute the sample-size multiplier:

  $$
  \left(\frac{1}{n_1} + \frac{1}{n_2}\right)^{-1} = \left(\frac{1}{32} + \frac{1}{30}\right)^{-1} = \left(\frac{30 + 32}{960}\right)^{-1} = \frac{960}{62} = \frac{480}{31} \approx 15.4839
  $$

* Next, compute the matrix product $\begin{bmatrix} -1.7 & 2.2 \end{bmatrix} \begin{bmatrix} 13 & 6 \\ 6 & 7 \end{bmatrix} \begin{bmatrix} -1.7 \\ 2.2 \end{bmatrix}$:
  * First part: $\begin{bmatrix} -1.7 & 2.2 \end{bmatrix} \begin{bmatrix} 13 & 6 \\ 6 & 7 \end{bmatrix} = \begin{bmatrix} (-1.7)(13) + (2.2)(6), & (-1.7)(6) + (2.2)(7) \end{bmatrix} = \begin{bmatrix} -22.1 + 13.2, & -10.2 + 15.4 \end{bmatrix} = \begin{bmatrix} -8.9 & 5.2 \end{bmatrix}$
  * Second part: $\begin{bmatrix} -8.9 & 5.2 \end{bmatrix} \begin{bmatrix} -1.7 \\ 2.2 \end{bmatrix} = (-8.9)(-1.7) + (5.2)(2.2) = 15.13 + 11.44 = 26.57$

* Combine to get $T^2$:

  $$
  T^2 = 15.4839 \times \frac{26.57}{55} = 15.4839 \times 0.48309 \approx 7.480
  $$

#### Step 5: Compare with the Critical Value and State the Conclusion
We can compare using either the critical value $c^2$ for $T^2$ or by converting $T^2$ into an $F$-statistic:
* **Method A (Converting $T^2$ to $F_{\text{calc}}$):**

  $$
  F_{\text{calc}} = \frac{n_1 + n_2 - p}{(n_1 + n_2 - 2)(p - 1)} T^2 = \frac{32 + 30 - 3}{(32 + 30 - 2)(3 - 1)} \times 7.480 = \frac{59}{60 \times 2} \times 7.480 = \frac{59}{120} \times 7.480 \approx 3.678
  $$

  Compare $F_{\text{calc}} = 3.678$ against the given critical value $F_{2, 59}(0.01) = 4.98$.
* **Method B (Comparing $T^2$ to $c^2$):**

  $$
  c^2 = \frac{(n_1 + n_2 - 2)(p - 1)}{n_1 + n_2 - p} F_{p - 1, \, n_1 + n_2 - p}(0.01) = \frac{120}{59} \times 4.98 \approx 10.129
  $$

  Compare $T^2 = 7.480$ against $c^2 = 10.129$.

* **Final Conclusion for (b)(i):**
  Since $F_{\text{calc}} = 3.678 < 4.98$ (or $T^2 = 7.480 < 10.129$), we **fail to reject $H_{01}$** at the $\alpha = 0.01$ level of significance. We conclude that **the male psychological testing profile is parallel to the female psychological testing profile**.

---

### (b)(ii) If the profiles appear to be parallel, test for coincident profiles at the same level of significance. (Hint: $F_{1, 60}(.01) = 7.08$) `[5 marks]`

#### Step 1: State the Hypotheses for Coincident Profiles
Assuming the profiles are parallel, they are **coincident** (identical in level) if the sum of the three subtest means for men equals the sum of the three subtest means for women. Using the vector of ones $1' = \begin{bmatrix} 1 & 1 & 1 \end{bmatrix}$:
* **Null Hypothesis ($H_{02}$):** $1'(\mu_1 - \mu_2) = 0$ (the profiles are coincident).
* **Alternative Hypothesis ($H_{12}$):** $1'(\mu_1 - \mu_2) \neq 0$ (the profiles are not coincident; one group is at a higher overall level).

#### Step 2: Calculate $1'(\bar{x}_1 - \bar{x}_2)$ and $1' S_{\text{pooled}} 1$
* **Sum of mean differences $1'(\bar{x}_1 - \bar{x}_2)$:**

  $$
  1'(\bar{x}_1 - \bar{x}_2) = \begin{bmatrix} 1 & 1 & 1 \end{bmatrix} \begin{bmatrix} 0.7 \\ -1.0 \\ 1.2 \end{bmatrix} = 0.7 - 1.0 + 1.2 = 0.9
  $$

* **Variance of the sum $1' S_{\text{pooled}} 1$:**
  *(Beginner's Shortcut: Multiplying a matrix on the left by $\begin{bmatrix} 1 & 1 & 1 \end{bmatrix}$ and on the right by $\begin{bmatrix} 1 \\ 1 \\ 1 \end{bmatrix}$ simply **adds up all $9$ numbers in the matrix $S_{\text{pooled}}$**!)*

  $$
  1' S_{\text{pooled}} 1 = \begin{bmatrix} 1 & 1 & 1 \end{bmatrix} \begin{bmatrix} 5 & 3 & 2 \\ 3 & 8 & 1 \\ 2 & 1 & 7 \end{bmatrix} \begin{bmatrix} 1 \\ 1 \\ 1 \end{bmatrix} = (5 + 3 + 2) + (3 + 8 + 1) + (2 + 1 + 7) = 10 + 12 + 10 = 32
  $$

#### Step 3: Calculate the Test Statistic ($T^2 = F_{\text{calc}}$)
Because $1'(\bar{x}_1 - \bar{x}_2)$ is a single number (dimension $1$), Hotelling’s $T^2$ statistic is identical to an $F_{1, \, n_1 + n_2 - 2} = F_{1, 60}$ statistic:

$$
T^2 = F_{\text{calc}} = \left(\frac{1}{n_1} + \frac{1}{n_2}\right)^{-1} \frac{\left[1'(\bar{x}_1 - \bar{x}_2)\right]^2}{1' S_{\text{pooled}} 1}
$$

Substitute $\left(\frac{1}{32} + \frac{1}{30}\right)^{-1} = \frac{480}{31} \approx 15.4839$, $1'(\bar{x}_1 - \bar{x}_2) = 0.9$, and $1' S_{\text{pooled}} 1 = 32$:

$$
T^2 = F_{\text{calc}} = 15.4839 \times \frac{(0.9)^2}{32} = 15.4839 \times \frac{0.81}{32} = 15.4839 \times 0.0253125 \approx 0.3919
$$

#### Step 4: Compare with the Critical Value and State the Conclusion
We compare $F_{\text{calc}} = 0.3919$ with the critical value $F_{1, 60}(0.01) = 7.08$.
* **Final Conclusion for (b)(ii):**
  Since $F_{\text{calc}} = 0.3919 < 7.08$, we **fail to reject $H_{02}$** at the $\alpha = 0.01$ level of significance. We conclude that **the male and female psychological testing profiles are coincident** (at the same overall level).

---

### (b)(iii) Based on Part (ii), if the two profiles are coincident, what will be the next step of the profile analysis? Briefly explain. `[2 marks]`

#### Beginner’s Explanation & Complete Exam Answer
If the two profiles are both parallel (Part (i)) and coincident (Part (ii)), it means men and women share the **exact same common profile** ($\mu_1 = \mu_2 = \mu$).
Therefore, the **next (third) step of profile analysis is to test for "Level" (or "Flat" / Horizontal) Profiles**:
* **Hypotheses:**

  $$
  H_{03}: C\mu = \begin{bmatrix} 0 \\ 0 \end{bmatrix} \quad (\text{i.e., } \mu_1 = \mu_2 = \mu_3 \text{ across the three subtests}) \quad \text{vs.} \quad H_{13}: C\mu \neq \begin{bmatrix} 0 \\ 0 \end{bmatrix}
  $$

* **What it tests and how it is done:**
  It tests whether the pooled mean scores across all three psychological subtests (Tool recognition, Paper form board, and Vocabulary) are equal to one another—in other words, whether the combined profile is a flat horizontal line. This is carried out by pooling all $n_1 + n_2 = 62$ observations into a single sample with overall sample mean vector $\bar{x}$ and overall sample covariance matrix $S$, and computing the one-sample Hotelling's $T^2$ statistic:

  $$
  T^2 = (n_1 + n_2) \bar{x}' C' (C S C')^{-1} C \bar{x}
  $$

  compared against $\frac{(n_1 + n_2 - 1)(p - 1)}{n_1 + n_2 - p + 1} F_{p - 1, \, n_1 + n_2 - p + 1}(\alpha)$.