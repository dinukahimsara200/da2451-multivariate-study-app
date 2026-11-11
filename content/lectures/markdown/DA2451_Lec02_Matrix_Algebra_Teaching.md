# DA2451 Lecture 02: Matrix Algebra, Explained from the Beginning

**A complete beginner's teaching book for DA2451 – Multivariate Methods in Business**  
**Source:** *Lec2.pdf, “Review of matrix algebra,” Semester 4, 2026, 14 pages*  
**Scope:** vectors, matrices, R computation, determinants, rank, inverses, orthogonal matrices, eigenvalues, eigenvectors, definiteness, and spectral decomposition.

> **How to read this book.** You need no previous matrix knowledge. Read the chapters in order at first: each new idea deliberately uses earlier ideas. “**Lecture example**” means the numbers or operation come from the supplied PDF. “**Additional teaching example**” means it was created here to help you learn. Supplementary connections to statistics are clearly marked. Page references refer to the **PDF page numbers**, not pages of this Markdown book.
>
> **Source accuracy.** A few mathematical statements in the original lecture need qualification or correction. They are explicitly identified, with reasons, in **Chapter 19** rather than quietly changed. The definitions, numerical examples, R demonstrations and major themes of all 14 source pages are preserved.

---

# Part I. Learn the language before learning the operations

## 1. Why do we need vectors and matrices?

Imagine that a business analyst is looking at the same three characteristics for each of four customers:

| Customer | Monthly spending (Rs. thousands) | Visits per month | Satisfaction (out of 10) |
|---|---:|---:|---:|
| A | 12 | 3 | 8 |
| B | 8 | 2 | 6 |
| C | 15 | 5 | 9 |
| D | 10 | 4 | 7 |

You could write twelve separate numbers. But that gives you no compact way to say “take customer A's three measurements,” “add two customers' measurements,” or “work with all four customers at once.”

A **vector** collects related numbers in a specific order. For example, customer A can be represented by

\[
\mathbf{x}=\begin{bmatrix}12\\3\\8\end{bmatrix}.
\]

A **matrix** places multiple vectors' data together as a rectangle:

\[
\mathbf{X}=\begin{bmatrix}
12&3&8\\
8&2&6\\
15&5&9\\
10&4&7
\end{bmatrix}.
\]

Here, each **row** describes a customer and each **column** describes a variable. That structure is the foundation of multivariate statistics: *multi* means several; *variate* refers to variables measured together.

Matrices are not merely tidy data storage. They let us express computations that would otherwise require pages of repeated arithmetic. A single formula can represent calculation of predicted values, correlations among several variables, or a rotation of information into new directions. These uses will become concrete toward the end of the book.

### 1.1 A first visual model

Think of a spreadsheet:

```text
             Variable 1   Variable 2   Variable 3
Observation 1     12           3           8
Observation 2      8           2           6
Observation 3     15           5           9
Observation 4     10           4           7
```

A matrix is the numerical part of such a table. A vector is one ordered row or column of values. A scalar is just one number.

### 1.2 What mathematics is actually required?

You will use ordinary addition, subtraction, multiplication, division, squares, and square roots. For example:

- A **square**: \(3^2=3\times3=9\).
- A **square root**: \(\sqrt{9}=3\), the nonnegative number whose square is 9.
- A **negative number**: \((-2)\times3=-6\).
- A **sum**: \(2+4+6=12\).

No advanced calculus is needed to understand the operations in the lecture. Most difficulties arise from *what is being combined with what*, not the individual arithmetic.

## 2. A notation survival guide

Mathematicians make a distinction between the **object** and a **number inside the object**. It is worth learning the symbols slowly.

| Notation | Read it aloud | Meaning |
|---|---|---|
| \(c\) | “see” | One scalar number |
| \(\mathbf{x}\) | “vector x” | An ordered collection of numbers |
| \(x_1\) | “x sub one” | First number in vector \(\mathbf{x}\) |
| \(\mathbf{A}\) | “matrix A” | A rectangular arrangement of numbers |
| \(a_{ij}\) | “a sub i j” | Number in row \(i\), column \(j\) of \(\mathbf A\) |
| \(n\times m\) | “n by m” | \(n\) rows and \(m\) columns |
| \(\mathbf{x}'\), \(\mathbf{x}^{T}\) | “x transpose” | Interchange row and column orientation |
| \(\mathbf A^{-1}\) | “A inverse” | A matrix that undoes multiplication by \(\mathbf A\), if it exists |
| \(\mathbf 0\) | “zero vector” | A vector whose entries are all zero |
| \(\mathbf I\) | “identity matrix” | Matrix counterpart of the number 1 |
| \(\mathbb R\) | “real numbers” | Numbers such as \(-3\), \(0\), \(1/2\), \(\sqrt 5\) |
| \(\in\) | “belongs to” | Specifies membership in a set |
| \(\sum\) | “sum” | Add terms following a pattern |
| \(\lambda\) | “lambda” | A Greek letter often representing an eigenvalue |
| \(\lVert\mathbf x\rVert_2\) | “Euclidean norm of x” | Ordinary geometric length of a vector |
| \(\det(\mathbf A)\) | “determinant of A” | One number computed from a square matrix |
| \(\operatorname{tr}(\mathbf A)\) | “trace of A” | Sum of diagonal entries |

**Bold** lowercase letters will represent vectors; **bold** uppercase letters will represent matrices. The original PDF usually uses a prime \((\,'\,)\) for transpose. This book uses \(\mathbf x'\) and \(\mathbf A'\) in the same way, occasionally adding the alternative \(T\).

### 2.1 What is a subscript?

In \(x_3\), the small 3 is *not multiplication*. It is an address: the third entry. Compare

\[
x_3=7 \quad\text{with}\quad 3x=3\times x.
\]

For matrices, two small numbers identify a row and a column:

\[
\mathbf A=\begin{bmatrix}8&4&2\\9&5&1\end{bmatrix},
\qquad a_{12}=4,\quad a_{21}=9,\quad a_{23}=1.
\]

**Read the first subscript as row, the second as column.** A frequent beginner mistake is to reverse them.

### 2.2 What do \(n\), \(m\) and \(p\) mean?

They are placeholders for counting dimensions. In a real example, they become ordinary whole numbers:

\[
\underbrace{\mathbf A}_{2\times3}\quad\text{means 2 rows and 3 columns}.
\]

The letter itself has no magic significance. When a formula uses \(n\) for rows and \(m\) for columns, always follow the author's stated convention.

### 2.3 Decoding the summation sign

The compact expression

\[
\sum_{i=1}^{4} x_i y_i
\]

means: start at \(i=1\); multiply the corresponding pair; increase \(i\) one at a time; stop after \(i=4\); then add:

\[
x_1y_1+x_2y_2+x_3y_3+x_4y_4.
\]

For example, if \(\mathbf x=(1,2,3,4)'\) and \(\mathbf y=(5,6,7,8)'\), the answer is

\[
(1)(5)+(2)(6)+(3)(7)+(4)(8)=5+12+21+32=70.
\]

**Checkpoint:** \(\mathbf A\) means the whole matrix, whereas \(a_{23}\) means one number in its second row and third column. This distinction will appear everywhere.

---

# Part II. Vectors: ordered numbers with a direction

## 3. Scalars, column vectors and row vectors (lecture pp. 1–2)

A **scalar** is one number, for example \(5\), \(-1.5\), or \(0\). A **vector** is a collection of numbers where the order matters. For instance,

\[
\begin{bmatrix}2\\5\end{bmatrix}
\ne
\begin{bmatrix}5\\2\end{bmatrix}.
\]

Both have two entries, but the first component is different. If the entries mean (sales, costs), swapping them changes the meaning completely.

### 3.1 The general vector

The lecturer writes an \(n\)-component vector as

\[
\mathbf x\in\mathbb R^n,\qquad
\mathbf x=\begin{bmatrix}x_1\\x_2\\\vdots\\x_n\end{bmatrix}.
\]

Read \(\mathbf x\in\mathbb R^n\) as “x is a vector of \(n\) real numbers.” The vertical dots \(\vdots\) mean “the same pattern continues.” By default, \(\mathbf x\) is a **column vector**, with \(n\) rows and one column: \(n\times1\).

The **transpose** changes that column into a horizontal **row vector**:

\[
\mathbf x'=\begin{bmatrix}x_1&x_2&\cdots&x_n\end{bmatrix},
\quad\text{of size }1\times n.
\]

Example:

\[
\mathbf x=\begin{bmatrix}4\\-2\\7\end{bmatrix}_{3\times1},
\qquad
\mathbf x'=\begin{bmatrix}4&-2&7\end{bmatrix}_{1\times3}.
\]

The numbers do not change. Only their arrangement changes.

### 3.2 Equality of vectors

Two vectors are equal only if **both conditions** hold:

1. They have the same number of entries and the same orientation when treated as arrays.
2. Corresponding entries are equal.

Thus \((2,4,6)'=(2,4,6)'\), but \((2,4,6)'\ne(2,4,5)'\). A three-component vector cannot equal a two-component vector. In ordinary matrix notation, even a \(3\times1\) column and a \(1\times3\) row have different shapes.

### 3.3 Vectors as arrows

A two-component vector can be drawn as an arrow from the origin to a point:

```text
North (second component)
 ^
 |           ● (3,2)
 |         / 
 |       /  vector (3,2)
 |     /
 +--------------------> East (first component)
(0,0)
```

The vector \((3,2)'\) represents moving **3 east, 2 north**. It can also represent an ordered pair of abstract measurements. An arrow is an excellent *geometric analogy*, but a vector does not have to mean a physical displacement.

## 4. Vector arithmetic: scaling, adding and subtracting (lecture pp. 1–3)

### 4.1 Multiply a vector by a scalar

**Meaning:** multiply *every* entry by the same number. Geometrically, this changes the length and perhaps direction of an arrow.

**Formula:**

\[
c\mathbf x
=c\begin{bmatrix}x_1\\x_2\\\vdots\\x_n\end{bmatrix}
=\begin{bmatrix}cx_1\\cx_2\\\vdots\\cx_n\end{bmatrix}.
\]

Here \(c\) is a scalar; \(cx_i\) means \(c\times x_i\). This operation is always defined for a real scalar and real vector. The result has the **same dimensions** as \(\mathbf x\).

**Additional teaching example:**

\[
-2\begin{bmatrix}3\\-1\\4\end{bmatrix}
=\begin{bmatrix}(-2)(3)\\(-2)(-1)\\(-2)(4)\end{bmatrix}
=\begin{bmatrix}-6\\2\\-8\end{bmatrix}.
\]

- \(c=2\) doubles length without changing direction.
- \(c=1/2\) halves length without changing direction.
- \(c=-2\) doubles length **and reverses direction**.
- \(c=0\) produces the zero vector; its geometric direction is not defined.

The source's **Figure 1(a), page 2** shows the vector \(\mathbf x\), a stretched vector \(2\mathbf x\), and a vector on the opposite side of the origin for a negative scalar. In the picture, the arrows stay on the same straight line.

### 4.2 Add two vectors

**Meaning:** combine corresponding components. In the arrow picture, make the first displacement, then the second.

**Formula:**

\[
\mathbf x+\mathbf y=
\begin{bmatrix}x_1+y_1\\x_2+y_2\\\vdots\\x_n+y_n\end{bmatrix}.
\]

**Rule:** both vectors must have the **same dimensions**. You cannot add a two-entry vector to a three-entry vector as if they described the same coordinate system.

**Additional teaching example:**

\[
\begin{aligned}
\mathbf x+\mathbf y
&=\begin{bmatrix}2\\-3\\5\end{bmatrix}
 +\begin{bmatrix}4\\7\\-1\end{bmatrix}\\[2pt]
&=\begin{bmatrix}2+4\\-3+7\\5+(-1)\end{bmatrix}
 =\begin{bmatrix}6\\4\\4\end{bmatrix}.
\end{aligned}
\]

The source's **Figure 1(b), page 2** uses a parallelogram: place the two arrows tail-to-tail, complete the parallelogram, and the diagonal represents \(\mathbf x+\mathbf y\). You can instead place the second arrow at the tip of the first. Both methods produce the same sum.

### 4.3 Order of addition does not matter

\[
\mathbf x+\mathbf y=\mathbf y+\mathbf x.
\]

This is the **commutative law** for vector addition. For example, \((2,3)'+(1,4)'=(3,7)'\), whichever vector comes first. Do not carry this intuition blindly into *matrix multiplication*, where reversing order generally changes the result.

### 4.4 The zero vector

\[
\mathbf0=\begin{bmatrix}0\\0\\\vdots\\0\end{bmatrix}.
\]

The zero vector acts like ordinary zero in addition:

\[
\mathbf x+\mathbf0=\mathbf0+\mathbf x=\mathbf x.
\]

For instance, \((3,-1)'+(0,0)'=(3,-1)'\). The zero vector must have the required number of entries even when that size is omitted in a formula.

### 4.5 Subtract vectors

Subtraction is addition of a negative vector:

\[
\mathbf x-\mathbf y=\mathbf x+(-1)\mathbf y
=\begin{bmatrix}x_1-y_1\\\vdots\\x_n-y_n\end{bmatrix}.
\]

For example,

\[
\begin{bmatrix}7\\-1\end{bmatrix}-\begin{bmatrix}2\\4\end{bmatrix}
=\begin{bmatrix}7-2\\-1-4\end{bmatrix}
=\begin{bmatrix}5\\-5\end{bmatrix}.
\]

Unlike addition, subtraction is **not** commutative. Usually \(\mathbf x-\mathbf y\ne\mathbf y-\mathbf x\). The identity \(\mathbf x-\mathbf0=\mathbf x\) is always true.

### 4.6 One source example, several operations (lecture pp. 2–3)

The lecture defines

\[
\mathbf x=\begin{bmatrix}1\\5\\2\end{bmatrix},\qquad
\mathbf y=\begin{bmatrix}3\\-1\\6\end{bmatrix}.
\]

**Transpose:**

\[
\mathbf x'=\begin{bmatrix}1&5&2\end{bmatrix}.
\]

**Multiply by 3:**

\[
3\mathbf x=\begin{bmatrix}3(1)\\3(5)\\3(2)\end{bmatrix}
=\begin{bmatrix}3\\15\\6\end{bmatrix}.
\]

**Add:**

\[
\mathbf x+\mathbf y=\begin{bmatrix}1+3\\5+(-1)\\2+6\end{bmatrix}
=\begin{bmatrix}4\\4\\8\end{bmatrix}.
\]

**Extra subtraction practice, using the lecture's vectors:**

\[
\mathbf x-\mathbf y=\begin{bmatrix}1-3\\5-(-1)\\2-6\end{bmatrix}
=\begin{bmatrix}-2\\6\\-4\end{bmatrix}.
\]

### 4.7 Typical mistakes

| Mistake | Why it fails | Correct idea |
|---|---|---|
| Multiply only the first entry by 3 | A scalar multiplies the **whole** vector | Multiply every component |
| Add \((1,2)'\) to \((3,4,5)'\) | Dimensions differ | Check number of entries first |
| Treat \(5-(-1)\) as 4 | Subtracting a negative adds | \(5-(-1)=6\) |
| Treat \(\mathbf x'\) as \(1/\mathbf x\) | Prime means transpose, not inverse | Rotate row/column arrangement |

## 5. Inner products and orthogonality (lecture pp. 2–3)

Vector addition produces a vector. An **inner product**, also called a **dot product**, produces **one number**.

### 5.1 The inner-product recipe

For two \(n\)-component *column* vectors,

\[
\mathbf x'\mathbf y
=\sum_{i=1}^{n}x_i y_i
=x_1y_1+x_2y_2+\cdots+x_ny_n.
\]

Every symbol has a job:

- \(\mathbf x'\) is a \(1\times n\) row vector.
- \(\mathbf y\) is an \(n\times1\) column vector.
- \(x_i\) and \(y_i\) are the corresponding entries at position \(i\).
- \(\sum\) means add the products.
- \(\mathbf x'\mathbf y\) is one scalar, represented as a \(1\times1\) matrix if we insist on matrix shape.

**Dimension check:**

\[
\underbrace{\mathbf x'}_{1\times n}\,
\underbrace{\mathbf y}_{n\times1}
\longrightarrow \underbrace{\mathbf x'\mathbf y}_{1\times1}.
\]

The number of entries must match. This is the first example of the “middle dimensions match” rule that later governs all matrix multiplication.

### 5.2 Lecture example: obtain 10 (page 3)

Using \(\mathbf x=(1,5,2)'\) and \(\mathbf y=(3,-1,6)'\),

\[
\begin{aligned}
\mathbf x'\mathbf y
&=\begin{bmatrix}1&5&2\end{bmatrix}
\begin{bmatrix}3\\-1\\6\end{bmatrix}\\
&=(1\times3)+(5\times(-1))+(2\times6)\\
&=3-5+12\\
&=\boxed{10}.
\end{aligned}
\]

Notice the difference between the **vector sum** \(\mathbf x+\mathbf y=(4,4,8)'\) and the **scalar inner product** \(\mathbf x'\mathbf y=10\). They answer fundamentally different questions.

### 5.3 The geometric meaning: are arrows pointing in related directions?

For two nonzero Euclidean vectors,

\[
\mathbf x'\mathbf y
=\lVert\mathbf x\rVert_2\,\lVert\mathbf y\rVert_2\cos\theta,
\]

where \(\theta\) is the angle between them and \(\cos\theta\) is a function of that angle. You do *not* need trigonometry to compute an inner product. This formula is included to explain why the result matters:

- Positive inner product: angle smaller than \(90^\circ\), broadly pointing in similar directions.
- Zero inner product: angle exactly \(90^\circ\), provided both vectors are nonzero.
- Negative inner product: angle greater than \(90^\circ\), broadly pointing against each other.

### 5.4 Orthogonal means perpendicular

Two vectors are **orthogonal** if

\[
\boxed{\mathbf x'\mathbf y=0.}
\]

**Additional teaching example:**

\[
\mathbf u=\begin{bmatrix}2\\1\end{bmatrix},\qquad
\mathbf v=\begin{bmatrix}-1\\2\end{bmatrix}.
\]

Compute:

\[
\mathbf u'\mathbf v=(2)(-1)+(1)(2)=-2+2=0.
\]

Thus \(\mathbf u\) and \(\mathbf v\) are perpendicular even though neither is the zero vector.

**An important detail from page 3:** \(\mathbf0'\mathbf x=0\) for every \(\mathbf x\), so the zero vector is orthogonal to all vectors by the **algebraic definition**. However, the zero vector has no geometric direction. Also, do not infer that a collection including the zero vector is linearly independent. We will revisit this nuance in Chapter 19.

### 5.5 Is orthogonality the same as independence?

No. Orthogonality describes a right-angle relationship. Linear independence describes whether a vector can be constructed from others. Nonzero orthogonal vectors **must** be independent, but independent vectors do not need to form right angles. Chapter 6 explains the difference.

## 6. Linear combinations, dependence and independence (lecture pp. 3–4)

This is often the first genuinely difficult concept in the lecture. The central question is surprisingly simple:

**Does one vector give us a direction or piece of information we could not already build from the others?**

### 6.1 Start with two vectors

Suppose

\[
\mathbf a=\begin{bmatrix}1\\2\end{bmatrix},\quad
\mathbf b=\begin{bmatrix}2\\4\end{bmatrix}.
\]

Here \(\mathbf b=2\mathbf a\). Both arrows lie on the same line. One is simply a scaled copy of the other; they contribute only **one independent direction**. The pair is **linearly dependent**.

Contrast

\[
\mathbf a=\begin{bmatrix}1\\2\end{bmatrix},\quad
\mathbf c=\begin{bmatrix}2\\1\end{bmatrix}.
\]

There is no single number \(k\) for which \(\mathbf c=k\mathbf a\): the first component suggests \(k=2\) while the second suggests \(k=1/2\). This pair is **linearly independent**.

### 6.2 What is a linear combination?

A **linear combination** multiplies several vectors by scalar numbers and adds the results. For example,

\[
3\begin{bmatrix}1\\0\end{bmatrix}
+2\begin{bmatrix}0\\1\end{bmatrix}
=\begin{bmatrix}3\\0\end{bmatrix}
+\begin{bmatrix}0\\2\end{bmatrix}
=\begin{bmatrix}3\\2\end{bmatrix}.
\]

The coefficients 3 and 2 tell us how much of each vector is used. This is why a vector in a plane can be built from the two independent coordinate directions \((1,0)'\) and \((0,1)'\).

### 6.3 General definition of dependence

For vectors \(\mathbf x_1,\mathbf x_2,\ldots,\mathbf x_k\) in the same vector space, consider

\[
c_1\mathbf x_1+c_2\mathbf x_2+\cdots+c_k\mathbf x_k=\mathbf0.
\]

Here \(c_1,\ldots,c_k\) are scalar coefficients. There is *always* the easy solution \(c_1=\cdots=c_k=0\), but it tells us nothing. The critical test is:

- **Dependent:** There is at least one solution where **not all coefficients are zero** (a *nontrivial* solution).
- **Independent:** The **only** solution is \(c_1=\cdots=c_k=0\) (the *trivial* solution).

Why does that match the intuition? If one coefficient, say \(c_2\), is nonzero, rearrange:

\[
\mathbf x_2
=-\frac{c_1}{c_2}\mathbf x_1
-\frac{c_3}{c_2}\mathbf x_3
-\cdots
-\frac{c_k}{c_2}\mathbf x_k.
\]

The second vector can be built from the others. Hence it brings no entirely new direction.

### 6.4 A rapid three-vector dependence example (additional)

Let

\[
\mathbf a=\begin{bmatrix}1\\0\end{bmatrix},\quad
\mathbf b=\begin{bmatrix}0\\1\end{bmatrix},\quad
\mathbf c=\begin{bmatrix}1\\1\end{bmatrix}.
\]

Since \(\mathbf c=\mathbf a+\mathbf b\), we have

\[
1\mathbf a+1\mathbf b-1\mathbf c=\mathbf0.
\]

The coefficients \((1,1,-1)\) are not all zero. These three vectors are **dependent**. In a two-dimensional plane, no collection of **three** vectors can be independent: there are only two independent coordinate directions.

### 6.5 Lecture's worked independence example (pp. 3–4)

The lecturer uses three vectors:

\[
\mathbf x_1=\begin{bmatrix}1\\2\\1\end{bmatrix},\qquad
\mathbf x_2=\begin{bmatrix}1\\0\\-1\end{bmatrix},\qquad
\mathbf x_3=\begin{bmatrix}1\\-2\\1\end{bmatrix}.
\]

We must determine whether

\[
c_1\mathbf x_1+c_2\mathbf x_2+c_3\mathbf x_3=\mathbf0
\]

can hold with at least one nonzero coefficient.

**Step 1. Expand the components.**

\[
\begin{bmatrix}c_1\\2c_1\\c_1\end{bmatrix}
+\begin{bmatrix}c_2\\0\\-c_2\end{bmatrix}
+\begin{bmatrix}c_3\\-2c_3\\c_3\end{bmatrix}
=\begin{bmatrix}0\\0\\0\end{bmatrix}.
\]

**Step 2. Match first, second and third components.**

\[
\begin{cases}
c_1+c_2+c_3=0 &\text{(first component)},\\
2c_1-2c_3=0 &\text{(second component)},\\
c_1-c_2+c_3=0 &\text{(third component)}.
\end{cases}
\]

**Step 3. Solve the simple equation first.** From the second equation,

\[
2c_1=2c_3\quad\Rightarrow\quad c_1=c_3.
\]

**Step 4. Substitute \(c_3=c_1\) in the other two equations.**

\[
2c_1+c_2=0\quad\Rightarrow\quad c_2=-2c_1,
\]

and

\[
2c_1-c_2=0\quad\Rightarrow\quad c_2=2c_1.
\]

**Step 5. Compare both expressions for \(c_2\).**

\[
-2c_1=2c_1\quad\Rightarrow\quad4c_1=0\quad\Rightarrow\quad c_1=0.
\]

Therefore \(c_3=c_1=0\) and \(c_2=-2c_1=0\).

**Conclusion:** The only solution is \(c_1=c_2=c_3=0\), so the three lecturer's vectors are **linearly independent**.

### 6.6 Independence versus perpendicularity

Consider \(\mathbf a=(1,0)'\) and \(\mathbf b=(1,1)'\). They are not multiples, so they are independent. But

\[
\mathbf a'\mathbf b=(1)(1)+(0)(1)=1\ne0,
\]

so they are **not** orthogonal. Orthogonality is more restrictive than independence, for nonzero vectors.

### 6.7 A quick checklist for exams

Ask these questions in order:

1. Are all vectors in the same number of dimensions?
2. For two vectors, is one a scalar multiple of the other?
3. For three or more vectors, can a nontrivial combination equal \(\mathbf0\)?
4. If solving equations, did you explicitly check whether **any coefficient can be nonzero**?
5. Are you mistakenly using “not perpendicular” to conclude “dependent”? That conclusion is false.

## 7. Vector length, distance and normalization (lecture p. 4)

### 7.1 From Pythagoras to vector length

Imagine walking 3 units east and 4 units north. The two movements make the perpendicular sides of a right triangle:

```text
              ● (3,4)
              |\
          4   | \   5 (straight-line distance)
              |  \
              |   \
              +----●
                 3
```

The straight-line distance from the starting position is

\[
\sqrt{3^2+4^2}=\sqrt{9+16}=\sqrt{25}=5.
\]

This generalizes to a vector with any number of components. The **Euclidean length**, also called the **Euclidean norm**, is

\[
\boxed{\lVert\mathbf x\rVert_2
=\sqrt{\mathbf x'\mathbf x}
=\sqrt{x_1^2+x_2^2+\cdots+x_n^2}.}
\]

Here \(\mathbf x'\mathbf x\) means multiply each entry by itself and add; the \(2\) in the norm symbol identifies the Euclidean norm. The result is never negative.

**Lecture example:** One unit east and two units north gives

\[
\mathbf x=\begin{bmatrix}1\\2\end{bmatrix},\qquad
\lVert\mathbf x\rVert_2=\sqrt{1^2+2^2}=\boxed{\sqrt5}\approx2.236.
\]

This is the triangle drawn in **Figure 2, page 4**. The diagram labels the horizontal component \(x_1\), vertical component \(x_2\), and hypotenuse \(L_x\).

### 7.2 Why do we square the negative entries?

Because the length of a displacement cannot be negative. For

\[
\mathbf v=\begin{bmatrix}-3\\4\end{bmatrix},
\]

\[
\lVert\mathbf v\rVert_2
=\sqrt{(-3)^2+4^2}
=\sqrt{9+16}
=5.
\]

A minus sign represents direction, not negative distance. Notice \((-3)^2=(-3)(-3)=9\), not \(-9\).

### 7.3 Distance between two vectors

An extra but important connection: to find the distance between positions \(\mathbf x\) and \(\mathbf y\), subtract before measuring length:

\[
d(\mathbf x,\mathbf y)=\lVert\mathbf x-\mathbf y\rVert_2.
\]

If \(\mathbf x=(1,2)'\) and \(\mathbf y=(4,6)'\), then

\[
\mathbf y-\mathbf x=\begin{bmatrix}4-1\\6-2\end{bmatrix}
=\begin{bmatrix}3\\4\end{bmatrix},
\quad d=\sqrt{3^2+4^2}=5.
\]

The distance does not depend on which point is subtracted first, because squaring removes the signs.

### 7.4 Normalize: make length exactly 1

Sometimes direction matters but original magnitude does not. A **normalized vector** has length exactly 1. For every **nonzero** vector,

\[
\boxed{\mathbf z=\frac{\mathbf x}{\lVert\mathbf x\rVert_2}.}
\]

Dividing a vector by a scalar means divide **every** component by that scalar.

**Additional teaching example, with all steps:**

\[
\mathbf x=\begin{bmatrix}3\\4\end{bmatrix},
\qquad \lVert\mathbf x\rVert_2=5.
\]

Divide both components by 5:

\[
\mathbf z=\frac15\begin{bmatrix}3\\4\end{bmatrix}
=\begin{bmatrix}3/5\\4/5\end{bmatrix}
=\begin{bmatrix}0.6\\0.8\end{bmatrix}.
\]

Verify the result:

\[
\lVert\mathbf z\rVert_2
=\sqrt{0.6^2+0.8^2}
=\sqrt{0.36+0.64}
=\sqrt1
=1.
\]

The normalized vector points the **same way** but has unit length. A zero vector **cannot** be normalized: its length is 0, and division by 0 is undefined.

### 7.5 Why normalization will matter later

Eigenvectors, which appear in PCA and spectral decomposition, can be multiplied by arbitrary nonzero constants without changing their mathematical role. Choosing unit length provides a consistent scale. This is also why software often returns eigenvectors whose squared components add to one.

**End-of-Part-I-and-II understanding check:** You can now distinguish scalar versus vector, column versus row, transpose versus inverse, addition versus inner product, perpendicularity versus independence, and raw versus normalized vectors. The next step is to apply exactly these ideas to whole tables of numbers.

---

# Part III. Matrices: a whole table of numbers

## 8. What is a matrix? (lecture pp. 4–5)

A vector stores one ordered sequence of numbers. A **matrix** stores a two-dimensional rectangle of numbers. It has rows running horizontally and columns running vertically.

\[
\mathbf A=
\begin{bmatrix}
2&5&7\\
1&4&9
\end{bmatrix}.
\]

Count the rows: **2**. Count the columns: **3**. We describe its **order**, **shape**, or **dimensions** as \(2\times3\). It contains \(2\times3=6\) entries in total.

### 8.1 Indexing entries: locating a number precisely

For the matrix above:

| Entry | Address | Value |
|---|---|---:|
| \(a_{11}\) | Row 1, column 1 | 2 |
| \(a_{12}\) | Row 1, column 2 | 5 |
| \(a_{13}\) | Row 1, column 3 | 7 |
| \(a_{21}\) | Row 2, column 1 | 1 |
| \(a_{22}\) | Row 2, column 2 | 4 |
| \(a_{23}\) | Row 2, column 3 | 9 |

**Row first, column second.** A useful memory aid: \(a_{ij}\) means go **down to row \(i\)**, then **across to column \(j\)**.

### 8.2 The lecturer's general \(n\times m\) matrix

\[
\mathbf X=\begin{bmatrix}
x_{11}&x_{12}&\cdots&x_{1m}\\
x_{21}&x_{22}&\cdots&x_{2m}\\
\vdots&\vdots&\ddots&\vdots\\
x_{n1}&x_{n2}&\cdots&x_{nm}
\end{bmatrix}_{n\times m}.
\]

- \(n\) = number of rows.
- \(m\) = number of columns.
- \(x_{ij}\) = the entry in row \(i\), column \(j\).
- The dots \(\cdots,\vdots,\ddots\) stand for omitted entries following the pattern.

**Statistical interpretation, added for teaching:** a common convention in data analysis is \(n\) rows for observations and \(p\) columns for measured variables. For example, 100 customers with 5 measurements each would form a \(100\times5\) data matrix. The symbol \(p\) is often used instead of \(m\) for the variable count. This is a convention, not a restriction on matrices.

### 8.3 Special matrix shapes

- A **row matrix** with shape \(1\times3\) is a row vector.
- A **column matrix** with shape \(3\times1\) is a column vector.
- A **square matrix** has the same number of rows and columns, for instance \(2\times2\) or \(5\times5\).
- A **rectangular matrix** has unequal row and column counts, for instance \(2\times3\).

The distinction matters: determinants, ordinary two-sided inverses, and the usual eigenvalue equation in this lecture apply to **square** matrices.

### 8.4 Why dimensions are more than bookkeeping

A calculation using arrays is meaningful only when the structures fit. Dimensions tell us which quantities can be matched. Imagine asking for each customer's **three** sales measures to be added to another table that contains only **two** measures per customer. The operation is not defined mathematically without first explaining how to align the different data.

Before doing *any* matrix operation, write down the dimensions. This one habit prevents many mistakes.

## 9. Transposing a matrix and recognizing symmetry (lecture p. 5)

**Transposing** a matrix turns each row into a column, or equivalently each column into a row. If \(\mathbf X\) has \(n\) rows and \(m\) columns, then \(\mathbf X'\) has \(m\) rows and \(n\) columns.

### 9.1 Walk through every entry

Take

\[
\mathbf A=\begin{bmatrix}
2&5&7\\
1&4&9
\end{bmatrix}_{2\times3}.
\]

The first column is \((2,1)'\); it becomes the **first row** of \(\mathbf A'\). The second column \((5,4)'\) becomes the second row. The third column \((7,9)'\) becomes the third row:

\[
\boxed{\mathbf A'=\begin{bmatrix}
2&1\\
5&4\\
7&9
\end{bmatrix}_{3\times2}.}
\]

General rule:

\[
(\mathbf A')_{ij}=a_{ji}.
\]

This says: the entry of the *transposed* matrix at row \(i\), column \(j\), equals the entry of the *original* matrix at row \(j\), column \(i\).

**Why it matters:** In statistics, transpose lets us switch between “observations by variables” and “variables by observations.” It is essential for inner products, matrix multiplication, covariance formulas, and regression equations.

### 9.2 Transposing twice

If you flip rows and columns twice, you return to the original matrix:

\[
(\mathbf A')'=\mathbf A.
\]

This useful property is a **supplementary explanation** beyond the lecture's explicit formula.

### 9.3 Square matrices and symmetry

A square matrix is **symmetric** if

\[
\boxed{\mathbf S'=\mathbf S.}
\]

Example:

\[
\mathbf S=\begin{bmatrix}4&-2\\-2&7\end{bmatrix}.
\]

The off-diagonal entry above the main diagonal equals its partner below: \(s_{12}=s_{21}=-2\). Hence \(\mathbf S'\) is exactly \(\mathbf S\).

Contrast:

\[
\mathbf T=\begin{bmatrix}4&-2\\5&7\end{bmatrix},
\qquad
\mathbf T'=\begin{bmatrix}4&5\\-2&7\end{bmatrix}
\ne\mathbf T.
\]

A matrix must be **square** to be symmetric. A rectangular matrix has a transpose of a different shape, so it cannot equal its own transpose in the usual sense.

### 9.4 The main diagonal

The **main diagonal** goes from the upper-left corner toward the lower-right corner:

\[
\begin{bmatrix}
\boxed{4}&1&8\\
2&\boxed{5}&3\\
6&9&\boxed{7}
\end{bmatrix}.
\]

These entries are \(a_{11}\), \(a_{22}\), and \(a_{33}\). The diagonal is central to the ideas of diagonal matrices, trace, determinant, and covariance matrices.

## 10. Matrix addition, subtraction and scalar multiplication (lecture p. 5)

### 10.1 Scalar multiplication

Multiplying a whole matrix by a scalar means multiplying **every** cell by that number.

\[
3\underbrace{\begin{bmatrix}2&-1\\4&0\end{bmatrix}}_{2\times2}
=\begin{bmatrix}3(2)&3(-1)\\3(4)&3(0)\end{bmatrix}
=\boxed{\begin{bmatrix}6&-3\\12&0\end{bmatrix}}.
\]

The matrix remains \(2\times2\). In general \((c\mathbf X)_{ij}=cx_{ij}\). No dimension matching with another matrix is needed, because \(c\) is just one number.

### 10.2 Add matrices entry by entry

Suppose

\[
\mathbf A=\begin{bmatrix}1&5\\2&-3\end{bmatrix},\quad
\mathbf B=\begin{bmatrix}4&-2\\7&6\end{bmatrix}.
\]

Then

\[
\begin{aligned}
\mathbf A+\mathbf B
&=\begin{bmatrix}1+4&5+(-2)\\2+7&-3+6\end{bmatrix}\\
&=\boxed{\begin{bmatrix}5&3\\9&3\end{bmatrix}}.
\end{aligned}
\]

**Compatibility condition:** both matrices must have exactly the **same number of rows and columns**. The result retains those dimensions. In notation,

\[
\underbrace{\mathbf A}_{n\times m}
+\underbrace{\mathbf B}_{n\times m}
=\underbrace{\mathbf C}_{n\times m},
\quad c_{ij}=a_{ij}+b_{ij}.
\]

If \(\mathbf A\) is \(2\times3\) and \(\mathbf B\) is \(3\times2\), they **cannot** be added merely because both contain six numbers.

### 10.3 Subtraction follows the same rule

\[
\mathbf A-\mathbf B
=\begin{bmatrix}1-4&5-(-2)\\2-7&-3-6\end{bmatrix}
=\begin{bmatrix}-3&7\\-5&-9\end{bmatrix}.
\]

The PDF explicitly defines vector subtraction and matrix addition; this matrix subtraction demonstration is a natural **supplementary extension**.

## 11. Matrix multiplication: the central calculation (lecture pp. 5–6)

This operation looks similar to addition but uses a **completely different rule**. Ordinary matrix multiplication is *not* cell-by-cell multiplication. It combines **rows of the first matrix** with **columns of the second matrix**.

### 11.1 First master rule: dimensions

Suppose

\[
\underbrace{\mathbf X}_{n\times m}\quad\text{and}\quad
\underbrace{\mathbf Y}_{m\times p}.
\]

Then multiplication is defined and

\[
\boxed{\underbrace{\mathbf X\mathbf Y}_{n\times p}.}
\]

In words:

> Number of **columns** in the first matrix must equal number of **rows** in the second matrix. The output has the **outer** dimensions.

A visual way to check:

```text
       first             second             answer
      n × [m]          [m] × p              n × p
           └── must match ──┘
```

Examples:

| First shape | Second shape | Valid? | Output shape |
|---|---|---|---|
| \(2\times3\) | \(3\times4\) | Yes | \(2\times4\) |
| \(4\times1\) | \(1\times5\) | Yes | \(4\times5\) |
| \(1\times3\) | \(3\times1\) | Yes | \(1\times1\) |
| \(3\times2\) | \(3\times2\) | No | Undefined |
| \(4\times3\) | \(3\times2\) | Yes | \(4\times2\) |
| \(3\times2\) | \(4\times3\) | No | Undefined |

**Do this before arithmetic.** If the dimensions fail, stop. There is no product of the type defined in the lecture.

### 11.2 Second master rule: row-by-column inner products

If \(\mathbf Z=\mathbf X\mathbf Y\), the entry in row \(i\), column \(j\) is

\[
\boxed{z_{ij}=\sum_{k=1}^{m}x_{ik}y_{kj}.}
\]

Read it slowly:

- Choose output **row \(i\)** and output **column \(j\)**.
- Take row \(i\) of \(\mathbf X\).
- Take column \(j\) of \(\mathbf Y\).
- Multiply their matching components and add.
- Put the result into output cell \((i,j)\).

The \(k\) is the index that travels across row \(i\) and down column \(j\). Its limit \(m\) is the shared inner dimension.

### 11.3 Smallest useful full example, calculated four times

Let

\[
\mathbf A=\begin{bmatrix}1&2\\3&4\end{bmatrix},
\qquad
\mathbf B=\begin{bmatrix}5&6\\7&8\end{bmatrix}.
\]

Both are \(2\times2\), so the output will be \(2\times2\). Make four empty answer cells:

\[
\mathbf A\mathbf B=\begin{bmatrix}?&?\\?&?\end{bmatrix}.
\]

**Cell (1,1): first row of A × first column of B.**

\[
c_{11}=(1)(5)+(2)(7)=5+14=19.
\]

**Cell (1,2): first row of A × second column of B.**

\[
c_{12}=(1)(6)+(2)(8)=6+16=22.
\]

**Cell (2,1): second row of A × first column of B.**

\[
c_{21}=(3)(5)+(4)(7)=15+28=43.
\]

**Cell (2,2): second row of A × second column of B.**

\[
c_{22}=(3)(6)+(4)(8)=18+32=50.
\]

Combine the four numbers:

\[
\boxed{\mathbf A\mathbf B=\begin{bmatrix}19&22\\43&50\end{bmatrix}}.
\]

To avoid confusion, imagine moving through the cells in reading order: top-left, top-right, bottom-left, bottom-right. Each cell needs its **own** row-by-column calculation.

### 11.4 Work every cell of the lecturer's \(4\times3\) by \(3\times2\) example (page 6)

**Lecture example:**

\[
\mathbf X=\begin{bmatrix}
5&-1&3\\
2&4&1\\
3&1&2\\
-2&5&2
\end{bmatrix}_{4\times3},
\qquad
\mathbf Y=\begin{bmatrix}
2&3\\
4&1\\
3&5
\end{bmatrix}_{3\times2}.
\]

Compatibility check: the middle dimensions are both 3. Therefore

\[
\underbrace{(4\times3)}_{\mathbf X}
\cdot\underbrace{(3\times2)}_{\mathbf Y}
\to\underbrace{(4\times2)}_{\mathbf X\mathbf Y}.
\]

The first output column uses \((2,4,3)'\); the second uses \((3,1,5)'\).

| Output cell | First-matrix row · second-matrix column | Fully expanded calculation | Result |
|---|---|---|---:|
| \(z_{11}\) | Row 1 · Col 1 | \((5)(2)+(-1)(4)+(3)(3)=10-4+9\) | 15 |
| \(z_{12}\) | Row 1 · Col 2 | \((5)(3)+(-1)(1)+(3)(5)=15-1+15\) | 29 |
| \(z_{21}\) | Row 2 · Col 1 | \((2)(2)+(4)(4)+(1)(3)=4+16+3\) | 23 |
| \(z_{22}\) | Row 2 · Col 2 | \((2)(3)+(4)(1)+(1)(5)=6+4+5\) | 15 |
| \(z_{31}\) | Row 3 · Col 1 | \((3)(2)+(1)(4)+(2)(3)=6+4+6\) | 16 |
| \(z_{32}\) | Row 3 · Col 2 | \((3)(3)+(1)(1)+(2)(5)=9+1+10\) | 20 |
| \(z_{41}\) | Row 4 · Col 1 | \((-2)(2)+(5)(4)+(2)(3)=-4+20+6\) | 22 |
| \(z_{42}\) | Row 4 · Col 2 | \((-2)(3)+(5)(1)+(2)(5)=-6+5+10\) | 9 |

Hence the exact result printed in the lecture is

\[
\boxed{\mathbf X\mathbf Y=\begin{bmatrix}
15&29\\
23&15\\
16&20\\
22&9
\end{bmatrix}_{4\times2}.}
\]

**Also on page 6:** multiplying every entry of \(\mathbf X\) by 3 gives

\[
3\mathbf X=\begin{bmatrix}
15&-3&9\\
6&12&3\\
9&3&6\\
-6&15&6
\end{bmatrix};
\]

and transposing \(\mathbf Y\) gives

\[
\mathbf Y'=\begin{bmatrix}2&4&3\\3&1&5\end{bmatrix}.
\]

These are **different operations** from \(\mathbf X\mathbf Y\).

### 11.5 Why reversing the order can break the calculation

The lecturer asks **“WHY?”** after noting that \(\mathbf X\mathbf Y\) does not imply \(\mathbf Y\mathbf X\) can even be calculated.

- \(\mathbf X\) has shape \(4\times3\).
- \(\mathbf Y\) has shape \(3\times2\).
- \(\mathbf X\mathbf Y\): \((4\times\mathbf3)(\mathbf3\times2)\) is valid.
- \(\mathbf Y\mathbf X\): \((3\times\mathbf2)(\mathbf4\times3)\) is **not** valid, because 2 and 4 do not match.

Thus \(\mathbf Y\mathbf X\) is undefined for this particular pair.

Even when **both orders are valid**, matrix multiplication usually fails the commutative law. Revisit the two \(2\times2\) matrices from §11.3:

\[
\mathbf B\mathbf A
=\begin{bmatrix}
(5)(1)+(6)(3)&(5)(2)+(6)(4)\\
(7)(1)+(8)(3)&(7)(2)+(8)(4)
\end{bmatrix}
=\begin{bmatrix}23&34\\31&46\end{bmatrix}.
\]

Compare:

\[
\mathbf A\mathbf B=\begin{bmatrix}19&22\\43&50\end{bmatrix}
\ne\begin{bmatrix}23&34\\31&46\end{bmatrix}=\mathbf B\mathbf A.
\]

**Exam statement:** In general, \(\mathbf A\mathbf B\ne\mathbf B\mathbf A\). Never reverse matrix order without justification.

### 11.6 Matrix–vector multiplication: a useful special case (supplementary)

A column vector is also a matrix with one column. Take

\[
\mathbf A=\begin{bmatrix}2&1\\3&4\end{bmatrix}_{2\times2},\qquad
\mathbf x=\begin{bmatrix}5\\6\end{bmatrix}_{2\times1}.
\]

Then

\[
\begin{aligned}
\mathbf A\mathbf x
&=\begin{bmatrix}(2)(5)+(1)(6)\\(3)(5)+(4)(6)\end{bmatrix}\\
&=\begin{bmatrix}10+6\\15+24\end{bmatrix}
=\boxed{\begin{bmatrix}16\\39\end{bmatrix}_{2\times1}}.
\end{aligned}
\]

Interpretation: each output is a **weighted sum** of the input components. This is exactly the mechanism used in regression predictions and linear transformations.

### 11.7 Matrix multiplication is not elementwise multiplication

For the preceding \(2\times2\) matrices \(\mathbf A\) and \(\mathbf B\), ordinary matrix multiplication was

\[
\mathbf A\mathbf B=\begin{bmatrix}19&22\\43&50\end{bmatrix}.
\]

Cellwise multiplication instead gives

\[
\mathbf A\odot\mathbf B
=\begin{bmatrix}(1)(5)&(2)(6)\\(3)(7)&(4)(8)\end{bmatrix}
=\begin{bmatrix}5&12\\21&32\end{bmatrix}.
\]

The symbol \(\odot\) here is introduced for explanation and is often called the **Hadamard product**. It is not the general matrix product of the lecture. In R, `*` means elementwise multiplication, whereas `%*%` means matrix multiplication. That distinction is crucial.

### 11.8 Three useful multiplication rules (supplementary)

For dimensions that make the expressions valid:

\[
(\mathbf A\mathbf B)\mathbf C=\mathbf A(\mathbf B\mathbf C)
\quad\text{(associative)},
\]

\[
\mathbf A(\mathbf B+\mathbf C)=\mathbf A\mathbf B+\mathbf A\mathbf C
\quad\text{(distributive)},
\]

\[
(\mathbf A\mathbf B)'=\mathbf B'\mathbf A'
\quad\text{(transpose of a product)}.
\]

For the last rule, notice the **reverse order**. Why? Transposing a product swaps the row and column roles; the reverse order is needed for dimensions and entries to line up. These properties are useful for rewriting statistical expressions, but they do **not** permit commuting \(\mathbf A\) and \(\mathbf B\).

## 12. Diagonal matrices and the identity matrix (lecture p. 6)

### 12.1 A diagonal matrix

A **diagonal matrix** is square and has zeros everywhere outside its main diagonal:

\[
\operatorname{diag}(2,-3,5)
=\begin{bmatrix}2&0&0\\0&-3&0\\0&0&5\end{bmatrix}.
\]

The diagonal entries are allowed to be positive, negative, or zero. The off-diagonal entries must be zero. A diagonal matrix is automatically symmetric.

A convenient fact, illustrated here as a **supplementary example**, is that diagonal matrix multiplication scales components separately:

\[
\begin{bmatrix}2&0&0\\0&-3&0\\0&0&5\end{bmatrix}
\begin{bmatrix}4\\1\\-2\end{bmatrix}
=\begin{bmatrix}2(4)\\-3(1)\\5(-2)\end{bmatrix}
=\begin{bmatrix}8\\-3\\-10\end{bmatrix}.
\]

No complicated cross-terms appear because the off-diagonal entries are zero.

### 12.2 The identity matrix

The **identity matrix** is a special diagonal matrix containing 1s on the main diagonal:

\[
\mathbf I_3=\begin{bmatrix}1&0&0\\0&1&0\\0&0&1\end{bmatrix}.
\]

It is to matrix multiplication what the number 1 is to ordinary multiplication. For a \(2\times3\) matrix \(\mathbf A\), the correctly sized identities satisfy

\[
\boxed{\mathbf I_2\mathbf A=\mathbf A=\mathbf A\mathbf I_3.}
\]

Notice the subscripts: **left** identity is \(2\times2\), **right** identity is \(3\times3\). The lecturer highlights that the size of \(\mathbf I\) is often inferred from context.

**Proof by numbers:**

\[
\underbrace{\begin{bmatrix}1&0\\0&1\end{bmatrix}}_{2\times2}
\underbrace{\begin{bmatrix}2&4&6\\1&3&5\end{bmatrix}}_{2\times3}
=\begin{bmatrix}
1(2)+0(1)&1(4)+0(3)&1(6)+0(5)\\
0(2)+1(1)&0(4)+1(3)&0(6)+1(5)
\end{bmatrix}
=\begin{bmatrix}2&4&6\\1&3&5\end{bmatrix}.
\]

Why we care: the identity is what we hope to obtain after multiplying a matrix by its **inverse**. It is also the matrix on the right side of the definition of an orthogonal matrix.

---

# Part IV. Calculate in R: exactly what the lecture demonstrates

## 13. Getting comfortable with R notation (lecture pp. 7–10)

The lecture makes an important practical transition: humans learn the rules with small examples; software performs them reliably on much larger arrays. **R** is a programming language commonly used for statistical analysis. You can type the examples below directly into an R console or place them in an R script.

In code blocks, `#` begins a comment, `<-` assigns a value to a variable, and `[1]` in printed output labels an output position. R indexing starts at 1, not 0.

### 13.1 Construct two vectors, then add them (lecture p. 7)

```r
x <- seq(2, 8, by = 2)
x
# [1] 2 4 6 8

y <- c(4:1)
y
# [1] 4 3 2 1

x + y
# [1] 6 7 8 9
```

Understand the commands:

- `seq(2, 8, by = 2)` creates the sequence 2, 4, 6, 8.
- `4:1` generates 4, 3, 2, 1, stepping down by 1.
- `c(...)` combines values into one R vector.
- `<-` stores the result under a name; it is not a “less than” sign followed by a minus sign.
- `x + y` adds matching components: \(2+4=6\), \(4+3=7\), \(6+2=8\), \(8+1=9\).

### 13.2 Inner products in R: `crossprod()` (lecture p. 7)

```r
crossprod(x, y)
#      [,1]
# [1,]   40
```

The word `crossprod` is a historical function name in R. Here, mathematically, it computes the **inner product** \(\mathbf x'\mathbf y\), **not** the three-dimensional vector cross product.

\[
\mathbf x'\mathbf y=(2)(4)+(4)(3)+(6)(2)+(8)(1)
=8+12+12+8=\boxed{40}.
\]

The lecture next computes the vector's inner product with itself:

```r
crossprod(x)
#      [,1]
# [1,]  120
```

Verify:

\[
\mathbf x'\mathbf x=2^2+4^2+6^2+8^2=4+16+36+64=\boxed{120}.
\]

**R output detail:** `crossprod(x)` returns a \(1\times1\) **matrix**, not an ordinary scalar vector. Its single numerical entry is 120. This difference matters in programming, even though we often speak mathematically of the result as a scalar.

### 13.3 Normalize a vector in R (lecture p. 7)

The Euclidean length of \(\mathbf x\) is \(\sqrt{120}\). Divide each entry by that length:

```r
z <- x / sqrt(c(crossprod(x)))
z
# [1] 0.1825742 0.3651484 0.5477226 0.7302967

crossprod(z)
#      [,1]
# [1,]    1
```

The `c(...)` inside the square root converts the \(1\times1\) matrix returned by `crossprod(x)` into a plain R vector of length one. The expected normalized values follow from

\[
\mathbf z=\frac1{\sqrt{120}}
\begin{bmatrix}2\\4\\6\\8\end{bmatrix}
\approx\begin{bmatrix}0.1825742\\0.3651484\\0.5477226\\0.7302967\end{bmatrix}.
\]

Check the squared components:

\[
\begin{aligned}
\mathbf z'\mathbf z
&=\frac{2^2+4^2+6^2+8^2}{120}\\
&=\frac{120}{120}=\boxed{1}.
\end{aligned}
\]

The norm is therefore \(\sqrt1=1\). A result of 1 in `crossprod(z)` is the expected check.

### 13.4 What `*` means for R vectors (lecture p. 8)

```r
x * y
# [1]  8 12 12  8
```

This command gives **four numbers** because it multiplies components one by one:

\[
(2\times4,\;4\times3,\;6\times2,\;8\times1)
=(8,12,12,8).
\]

This is **not** the dot product, which sums those products and gives 40. It is also **not** the geometric vector cross product. The R distinction is useful enough to memorize:

| Goal | R expression | Here it returns |
|---|---|---|
| Add vectors | `x + y` | `6 7 8 9` |
| Multiply matching entries | `x * y` | `8 12 12 8` |
| Inner product | `crossprod(x, y)` | One-cell matrix containing `40` |
| Self-inner product | `crossprod(x)` | One-cell matrix containing `120` |

### 13.5 Build matrices with `diag()` and `matrix()` (lecture p. 8)

**Create a \(4\times4\) identity matrix:**

```r
diag(1, 4, 4)
#      [,1] [,2] [,3] [,4]
# [1,]    1    0    0    0
# [2,]    0    1    0    0
# [3,]    0    0    1    0
# [4,]    0    0    0    1
```

The first argument gives the diagonal value 1, followed by the row and column counts.

**Create a \(4\times4\) all-ones matrix:**

```r
matrix(1, 4, 4)
#      [,1] [,2] [,3] [,4]
# [1,]    1    1    1    1
# [2,]    1    1    1    1
# [3,]    1    1    1    1
# [4,]    1    1    1    1
```

The difference is conceptual: the identity matrix has zeros **off** the diagonal, while the all-ones matrix has no zeros.

### 13.6 R fills a matrix down columns by default (lecture pp. 8–9)

```r
A <- matrix(1:16, 4, 4)
A
#      [,1] [,2] [,3] [,4]
# [1,]    1    5    9   13
# [2,]    2    6   10   14
# [3,]    3    7   11   15
# [4,]    4    8   12   16
```

Students often expect the first row to be 1, 2, 3, 4. But R's `matrix()` fills the **first column** with 1,2,3,4, then the second column with 5,6,7,8. That is R's default **column-major filling order**.

The lecturer then applies `t(A)`:

```r
t(A)
#      [,1] [,2] [,3] [,4]
# [1,]    1    2    3    4
# [2,]    5    6    7    8
# [3,]    9   10   11   12
# [4,]   13   14   15   16
```

The numbers are transposed, not regenerated. If the goal was to **construct** rows in that order rather than transpose a finished matrix, R also supports

```r
matrix(1:16, nrow = 4, ncol = 4, byrow = TRUE)
```

This `byrow = TRUE` explanation is an **additional teaching connection**, and the lecture later uses it to create \(\mathbf B\).

### 13.7 `diag()` also extracts diagonal entries (lecture p. 9)

```r
diag(A)
# [1]  1  6 11 16
```

Because the diagonal positions in \(\mathbf A\) are \((1,1), (2,2), (3,3), (4,4)\), the numbers are 1, 6, 11 and 16. So `diag()` has **two related uses**:

1. Build a diagonal matrix from supplied values.
2. Extract diagonal entries from an existing matrix.

### 13.8 Create the lecturer's second matrix (lecture p. 9)

```r
B <- matrix(seq(1, 32, by = 2), 4, 4, byrow = TRUE)
B
#      [,1] [,2] [,3] [,4]
# [1,]    1    3    5    7
# [2,]    9   11   13   15
# [3,]   17   19   21   23
# [4,]   25   27   29   31
```

The sequence is the sixteen odd numbers from 1 to 31, inclusive. The `byrow = TRUE` argument fills successive **rows**, unlike the default construction of \(\mathbf A\).

### 13.9 Matrix addition in R: source's exact output (lecture p. 9)

```r
A + B
#      [,1] [,2] [,3] [,4]
# [1,]    2    8   14   20
# [2,]   11   17   23   29
# [3,]   20   26   32   38
# [4,]   29   35   41   47
```

For example, output cell (3,2) is \(a_{32}+b_{32}=7+19=26\). Because both matrices are \(4\times4\), addition is dimensionally valid.

### 13.10 Elementwise multiplication in R: source's exact output (lecture p. 9)

```r
A * B
#      [,1] [,2] [,3] [,4]
# [1,]    1   15   45   91
# [2,]   18   66  130  210
# [3,]   51  133  231  345
# [4,]  100  216  348  496
```

To see why, compute a few individual cells:

\[
(A*B)_{11}=1\times1=1,
\quad(A*B)_{12}=5\times3=15,
\quad(A*B)_{43}=12\times29=348.
\]

These are **R's elementwise products**, not matrix products. Same-sized matrices are required for the plain cell-for-cell mathematical operation described here.

### 13.11 The source's `A %*% t(B)` example (lecture p. 10)

```r
A %*% t(B)
#      [,1] [,2] [,3] [,4]
# [1,]  152  376  600  824
# [2,]  168  424  680  936
# [3,]  184  472  760 1048
# [4,]  200  520  840 1160
```

This is **true matrix multiplication**. It uses \(\mathbf A\) and the **transpose of B**, not elementwise multiplication and not \(\mathbf A\mathbf B\).

Why transpose B? \(\mathbf A\) and \(\mathbf B\) are both \(4\times4\), so the product is valid with or without the transpose. But transposing \(\mathbf B\) makes each row of \(\mathbf B\) a column of \(\mathbf B'\). Therefore each answer cell becomes the inner product of one row of \(\mathbf A\) and one row of \(\mathbf B\).

**Calculate the first row explicitly:**

\[
\begin{aligned}
c_{11}&=(1)(1)+(5)(3)+(9)(5)+(13)(7)\\
&=1+15+45+91=\boxed{152},\\[3pt]
c_{12}&=(1)(9)+(5)(11)+(9)(13)+(13)(15)\\
&=9+55+117+195=\boxed{376},\\[3pt]
c_{13}&=(1)(17)+(5)(19)+(9)(21)+(13)(23)\\
&=17+95+189+299=\boxed{600},\\[3pt]
c_{14}&=(1)(25)+(5)(27)+(9)(29)+(13)(31)\\
&=25+135+261+403=\boxed{824}.
\end{aligned}
\]

**Calculate the remaining rows' cells, so none are hidden:**

\[
\begin{array}{lll}
c_{21}=2+18+50+98=168,&c_{22}=18+66+130+210=424,\\
c_{23}=34+114+210+322=680,&c_{24}=50+162+290+434=936,\\[2pt]
c_{31}=3+21+55+105=184,&c_{32}=27+77+143+225=472,\\
c_{33}=51+133+231+345=760,&c_{34}=75+189+319+465=1048,\\[2pt]
c_{41}=4+24+60+112=200,&c_{42}=36+88+156+240=520,\\
c_{43}=68+152+252+368=840,&c_{44}=100+216+348+496=1160.
\end{array}
\]

Each term is one matched multiplication. For instance, the final output cell is the fourth row of \(\mathbf A\), \((4,8,12,16)\), dotted with the fourth row of \(\mathbf B\), \((25,27,29,31)\).

### 13.12 A common real-world R trap: recycling

**Important distinction between mathematics and software.** Mathematically, vectors must have the same length for the componentwise addition and inner product described in this lecture. In R, however, some elementwise arithmetic operations **recycle shorter vectors**. For example:

```r
c(1, 2, 3, 4) + c(10, 20)
# [1] 11 22 13 24
```

R has repeated \((10,20)\) to make a four-entry pattern. This is a programming convenience, not the mathematical definition of equal-length vector addition. R may warn when the longer length is not a multiple of the shorter. To apply the lecture's vector formulas safely, explicitly verify equal lengths.

For a matrix operation in a project, checking `dim(A)` and `dim(B)` makes the shapes visible. Use `%*%` for ordinary matrix multiplication; do not confuse it with `*`.

### 13.13 Mini R practice script (additional, deliberately reproducible)

```r
# Rebuild the exact lecture matrices and check their dimensions.
A <- matrix(1:16, 4, 4)
B <- matrix(seq(1, 32, by = 2), 4, 4, byrow = TRUE)

dim(A)               # 4 4
dim(B)               # 4 4
diag(A)              # 1 6 11 16
t(A)                 # transpose
A + B                # cellwise addition
A * B                # cellwise multiplication
A %*% t(B)           # row-by-column multiplication

# Small source example from page 6:
X <- rbind(c(5, -1, 3), c(2, 4, 1),
           c(3, 1, 2), c(-2, 5, 2))
Y <- rbind(c(2, 3), c(4, 1), c(3, 5))
dim(X)               # 4 3
dim(Y)               # 3 2
X %*% Y              # 4 by 2, first row 15 29
```

`rbind(...)` is an **additional R technique** that assembles rows; it preserves the lecturer's numbers. A good learning routine is to predict the dimensions of every result **before** running the code.

---

# Part V. Advanced matrix algebra without shortcuts

## 14. Trace and determinant: turning a square matrix into a number (lecture pp. 10–11)

The source's Section 4 begins with operations that become tedious for large matrices. Their formulas are simple for \(2\times2\) matrices, and software becomes useful as the dimensions increase. There are **two different scalar summaries** in this section: trace and determinant. They must not be confused.

### 14.1 The trace: add only the main diagonal

The **trace** of a square matrix is the sum of its diagonal entries:

\[
\boxed{\operatorname{tr}(\mathbf A)=a_{11}+a_{22}+\cdots+a_{nn}
=\sum_{i=1}^{n}a_{ii}.}
\]

- \(\operatorname{tr}\) abbreviates “trace.”
- \(a_{ii}\) means row \(i\), column \(i\), so it selects diagonal cells.
- \(n\) is the size of the \(n\times n\) square matrix.

**Lecture's generic \(2\times2\) example:**

\[
\mathbf A=\begin{bmatrix}a&b\\c&d\end{bmatrix}
\quad\Rightarrow\quad\operatorname{tr}(\mathbf A)=a+d.
\]

**Lecture's generic \(3\times3\) example:**

\[
\mathbf B=\begin{bmatrix}a&b&c\\d&e&f\\g&h&i\end{bmatrix}
\quad\Rightarrow\quad\operatorname{tr}(\mathbf B)=a+e+i.
\]

**Additional teaching example:**

\[
\operatorname{tr}\!\begin{bmatrix}4&9&2\\1&-3&7\\5&8&6\end{bmatrix}
=4+(-3)+6=\boxed{7}.
\]

Trace is not the sum of *all* matrix entries. It also does not require matrix inversion or matrix multiplication.

### 14.2 The determinant for a \(2\times2\) matrix

For

\[
\mathbf A=\begin{bmatrix}a&b\\c&d\end{bmatrix},
\]

its **determinant** is

\[
\boxed{\det(\mathbf A)=ad-bc.}
\]

Some books write \(|\mathbf A|\) for the determinant. This book uses \(\det(\mathbf A)\) to avoid confusing that notation with absolute values.

The recipe is:

1. Multiply the upper-left and lower-right entries: \(a\times d\).
2. Multiply the upper-right and lower-left entries: \(b\times c\).
3. Subtract the second result from the first.

**Additional teaching example:**

\[
\mathbf A=\begin{bmatrix}4&7\\2&6\end{bmatrix}.
\]

\[
\begin{aligned}
\det(\mathbf A)
&=(4\times6)-(7\times2)\\
&=24-14\\
&=\boxed{10}.
\end{aligned}
\]

The determinant can be positive, negative, or zero. It is **one number**, not a matrix.

### 14.3 What the determinant tells us intuitively

In two dimensions, a matrix can stretch, rotate, shear or reverse areas when acting as a linear transformation. The **absolute value** of its determinant gives the area scale factor. For instance:

- \(\det(\mathbf A)=2\): unit areas become twice as large.
- \(\det(\mathbf A)=-2\): areas become twice as large, with orientation reversed.
- \(\det(\mathbf A)=0\): a whole area is flattened into a line or point.

In three dimensions, the analogous quantity is a volume scale factor. For multivariate analysis, the “flattening” interpretation makes an important connection to **linear dependence**: if the determinant is zero, some direction is redundant and the matrix cannot be inverted.

This geometric interpretation is an **added teaching explanation**, not an image or claim attributed to a source diagram.

### 14.4 The determinant for a \(3\times3\) matrix

The lecturer gives the formula

\[
\mathbf B=\begin{bmatrix}a&b&c\\d&e&f\\g&h&i\end{bmatrix},
\]

\[
\boxed{
\det(\mathbf B)
=a(ei-fh)-b(di-fg)+c(dh-eg).
}
\]

This is the **first-row cofactor expansion**. It can be understood by repeatedly using the \(2\times2\) determinant:

\[
\begin{aligned}
\det(\mathbf B)
&=a\det\!\begin{bmatrix}e&f\\h&i\end{bmatrix}
-b\det\!\begin{bmatrix}d&f\\g&i\end{bmatrix}
+c\det\!\begin{bmatrix}d&e\\g&h\end{bmatrix}\\
&=a(ei-fh)-b(di-fg)+c(dh-eg).
\end{aligned}
\]

Why alternating signs \(+,-,+\)? They come from the determinant's cofactor sign pattern. For the first row, it is **plus, minus, plus**, not plus throughout.

### 14.5 Fully worked \(3\times3\) numerical determinant (additional)

\[
\mathbf B=\begin{bmatrix}1&2&0\\3&4&1\\2&0&1\end{bmatrix}.
\]

First identify the symbols:

\[
a=1,\ b=2,\ c=0,\ d=3,\ e=4,\ f=1,\ g=2,\ h=0,\ i=1.
\]

Insert them into the formula:

\[
\begin{aligned}
\det(\mathbf B)
&=1\big[(4)(1)-(1)(0)\big]
-2\big[(3)(1)-(1)(2)\big]
+0\big[(3)(0)-(4)(2)\big]\\
&=1(4-0)-2(3-2)+0(0-8)\\
&=4-2(1)+0\\
&=\boxed{2}.
\end{aligned}
\]

Do not skip the parentheses. Multiplying by the negative sign before the second minor is a common error.

### 14.6 Why the lecturer recommends numerical computation

As the matrix grows, determinant formulas have many terms. The lecture's **page 11** creates a random \(5\times5\) matrix in R:

```r
X <- matrix(rnorm(25), 5, 5)
X

det(X)
```

- `rnorm(25)` draws 25 numbers from the **standard normal distribution**, with mean 0 and standard deviation 1.
- `matrix(..., 5, 5)` makes a \(5\times5\) matrix from those numbers.
- `det(X)` computes its determinant numerically.

In the specific random output displayed in the lecture, `det(X)` is approximately **−10.6611**. Running the script again will almost certainly produce **different numbers**, because no random seed is specified in the source. It is therefore not correct to demand exactly −10.6611 from a new run. For reproducibility of *your own* R experiment, choose a seed **before** generating values:

```r
set.seed(2451)     # extra reproducible example; not the lecture's seed
X <- matrix(rnorm(25), 5, 5)
det(X)
```

This preserves the purpose of the original demonstration without pretending that its particular random values are universal constants.

## 15. Matrix rank: how many independent directions are present? (lecture p. 11)

The **rank** of a matrix is the number of linearly independent row directions, which equals the number of linearly independent column directions. This equality is an important theorem, so you can calculate rank from either viewpoint.

### 15.1 A simple rank-one example

\[
\mathbf A=\begin{bmatrix}1&2\\2&4\end{bmatrix}.
\]

Row 2 equals 2 times row 1, and column 2 equals 2 times column 1. There is only **one** independent row or column direction:

\[
\operatorname{rank}(\mathbf A)=1.
\]

Its determinant confirms something has collapsed:

\[
\det(\mathbf A)=(1)(4)-(2)(2)=4-4=0.
\]

The matrix is **singular**, meaning it does not have an ordinary two-sided inverse.

### 15.2 A full-rank square example

\[
\mathbf B=\begin{bmatrix}1&2\\3&4\end{bmatrix}.
\]

The rows are not scalar multiples. The matrix has two independent rows and two independent columns, so

\[
\operatorname{rank}(\mathbf B)=2.
\]

Its determinant is \(1(4)-2(3)=-2\ne0\). Thus the matrix is **full rank**, **nonsingular**, and **invertible**.

### 15.3 Full rank versus rank deficiency

For an \(n\times m\) matrix,

\[
\operatorname{rank}(\mathbf A)\le\min(n,m).
\]

The maximum rank is the smaller dimension. A rectangular \(2\times3\) matrix can have rank at most 2. For a square \(n\times n\) matrix, **full rank** means rank exactly \(n\).

A **rank-deficient** matrix has rank below its maximum possible value. For a square matrix, rank deficiency means determinant zero and no ordinary inverse.

### 15.4 An example where there are more variables than independent information

\[
\mathbf D=\begin{bmatrix}1&2&3\\2&4&6\end{bmatrix}_{2\times3}.
\]

The second row is twice the first. Every column is also a multiple of the column \((1,2)'\). Thus \(\operatorname{rank}(\mathbf D)=1\), not 2 or 3.

**Statistical meaning:** If one explanatory variable is an exact duplicate of another, or is a perfect sum of other variables, the columns of a regression design matrix can be linearly dependent. This prevents a unique coefficient solution using the usual inverse formula. This is sometimes called **perfect multicollinearity**.

### 15.5 A useful square-matrix equivalence table

For a real square \(n\times n\) matrix \(\mathbf A\), these conditions are equivalent:

| Condition | What it tells you |
|---|---|
| \(\operatorname{rank}(\mathbf A)=n\) | Full rank |
| Rows (or columns) are linearly independent | No redundant direction |
| \(\det(\mathbf A)\ne0\) | No complete collapse of area/volume |
| \(\mathbf A^{-1}\) exists | Transformation can be undone |
| \(\mathbf A\mathbf x=\mathbf0\) has only \(\mathbf x=\mathbf0\) | No nonzero vector is sent to zero |

This equivalence is a **teaching extension** consolidating several concepts that appear separately in the lecture.

## 16. Matrix inverses: undoing a matrix transformation (lecture pp. 11–13)

### 16.1 Compare a reciprocal and an inverse

For a nonzero scalar \(a\), the **reciprocal** \(1/a\) has the property

\[
a\times\frac1a=1.
\]

For a square matrix \(\mathbf A\), the **inverse** \(\mathbf A^{-1}\), if it exists, has the property

\[
\boxed{\mathbf A^{-1}\mathbf A=\mathbf A\mathbf A^{-1}=\mathbf I.}
\]

The inverse “undoes” the effect of multiplication by \(\mathbf A\). Note that \(\mathbf A^{-1}\) is **not** created by simply taking 1 divided by each entry of \(\mathbf A\). Matrix inversion is an entirely different operation.

The zero scalar has no reciprocal; similarly, a **singular** matrix has no inverse. According to the lecture, for a square matrix the inverse exists exactly when the determinant is nonzero.

### 16.2 The \(2\times2\) inverse formula

For

\[
\mathbf A=\begin{bmatrix}a&b\\c&d\end{bmatrix},
\quad\det(\mathbf A)=ad-bc,
\]

and **only when** \(ad-bc\ne0\),

\[
\boxed{\mathbf A^{-1}=\frac{1}{ad-bc}
\begin{bmatrix}d&-b\\-c&a\end{bmatrix}.}
\]

This formula says:

1. Find the determinant \(ad-bc\).
2. Verify it is not zero.
3. **Swap** the two diagonal entries \(a\) and \(d\).
4. **Change signs** of the off-diagonal entries \(b\) and \(c\).
5. Divide every entry by the determinant.

Do not confuse “swap the diagonal, negate the other two” with transposition. Transposing swaps \(b\) and \(c\), not \(a\) and \(d\).

### 16.3 Fully worked inverse with proof (additional)

Take

\[
\mathbf A=\begin{bmatrix}4&7\\2&6\end{bmatrix}.
\]

We already found \(\det(\mathbf A)=24-14=10\ne0\). Therefore

\[
\begin{aligned}
\mathbf A^{-1}
&=\frac1{10}\begin{bmatrix}6&-7\\-2&4\end{bmatrix}\\
&=\boxed{\begin{bmatrix}0.6&-0.7\\-0.2&0.4\end{bmatrix}}.
\end{aligned}
\]

**Verify the result with all four row-by-column calculations:**

\[
\begin{aligned}
\mathbf A\mathbf A^{-1}
&=\begin{bmatrix}4&7\\2&6\end{bmatrix}
\begin{bmatrix}0.6&-0.7\\-0.2&0.4\end{bmatrix}\\
&=\begin{bmatrix}
4(0.6)+7(-0.2)&4(-0.7)+7(0.4)\\
2(0.6)+6(-0.2)&2(-0.7)+6(0.4)
\end{bmatrix}\\
&=\begin{bmatrix}2.4-1.4&-2.8+2.8\\1.2-1.2&-1.4+2.4\end{bmatrix}\\
&=\boxed{\begin{bmatrix}1&0\\0&1\end{bmatrix}=\mathbf I_2}.
\end{aligned}
\]

Because it satisfies the identity property, the inverse is correct.

### 16.4 Example of an impossible inverse

\[
\mathbf C=\begin{bmatrix}1&2\\2&4\end{bmatrix}.
\]

\[
\det(\mathbf C)=1(4)-2(2)=0.
\]

The denominator in the inverse formula would be zero, so \(\mathbf C^{-1}\) **does not exist**. Never proceed to divide by the determinant in this case.

### 16.5 Solving a system with the inverse (additional)

Suppose two equations must both hold:

\[
\begin{cases}
4u+7v=18,\\
2u+6v=12.
\end{cases}
\]

Write them as a matrix equation:

\[
\underbrace{\begin{bmatrix}4&7\\2&6\end{bmatrix}}_{\mathbf A}
\underbrace{\begin{bmatrix}u\\v\end{bmatrix}}_{\mathbf x}
=\underbrace{\begin{bmatrix}18\\12\end{bmatrix}}_{\mathbf b}.
\]

If \(\mathbf A^{-1}\) exists, multiply both sides **on the left** by that inverse:

\[
\mathbf A^{-1}\mathbf A\mathbf x=\mathbf A^{-1}\mathbf b
\Rightarrow\mathbf I\mathbf x=\mathbf A^{-1}\mathbf b
\Rightarrow\boxed{\mathbf x=\mathbf A^{-1}\mathbf b}.
\]

Calculate:

\[
\begin{aligned}
\mathbf x
&=\begin{bmatrix}0.6&-0.7\\-0.2&0.4\end{bmatrix}
\begin{bmatrix}18\\12\end{bmatrix}\\
&=\begin{bmatrix}0.6(18)-0.7(12)\\-0.2(18)+0.4(12)\end{bmatrix}\\
&=\begin{bmatrix}10.8-8.4\\-3.6+4.8\end{bmatrix}
=\boxed{\begin{bmatrix}2.4\\1.2\end{bmatrix}}.
\end{aligned}
\]

Check: \(4(2.4)+7(1.2)=9.6+8.4=18\); \(2(2.4)+6(1.2)=4.8+7.2=12\).

**Computing note:** In serious numerical work, use a direct linear solver rather than explicitly calculating an inverse when the goal is only to solve \(\mathbf A\mathbf x=\mathbf b\). In R, `solve(A, b)` typically does that. The explicit formula is still essential to understand conceptually.

### 16.6 Determinant of an inverse (lecture p. 12)

The source records the property

\[
\boxed{\det(\mathbf A^{-1})=\frac1{\det(\mathbf A)}}
\qquad\text{for invertible square }\mathbf A.
\]

From our example, \(\det(\mathbf A)=10\), so \(\det(\mathbf A^{-1})=0.1\). Check directly:

\[
(0.6)(0.4)-(-0.7)(-0.2)=0.24-0.14=0.10.
\]

This is consistent with the idea that an inverse reverses the matrix's scaling effect on area or volume.

### 16.7 Inverting diagonal matrices (lecture p. 13)

A diagonal matrix is especially easy because each coordinate is scaled independently. For example,

\[
\mathbf D=\begin{bmatrix}2&0&0\\0&-4&0\\0&0&5\end{bmatrix}
\]

has inverse

\[
\boxed{\mathbf D^{-1}=
\begin{bmatrix}1/2&0&0\\0&-1/4&0\\0&0&1/5\end{bmatrix}}.
\]

Multiplying them gives 1 on the diagonal and 0 elsewhere. The general lecture formula is

\[
\operatorname{diag}(a_{11},a_{22},a_{33})^{-1}
=\operatorname{diag}\left(\frac1{a_{11}},\frac1{a_{22}},\frac1{a_{33}}\right),
\]

provided **every** diagonal entry is nonzero. If even one were zero, the determinant (product of diagonal entries) would be zero and the inverse would not exist.

### 16.8 How R computes inverses (lecture pp. 11–12)

The lecture continues with its same randomly generated \(5\times5\) matrix \(\mathbf X\):

```r
X <- matrix(rnorm(25), 5, 5)  # generate once

det(X)                        # printed source example: about -10.6611
solve(X)                       # compute the inverse, if it exists
X %*% solve(X)                 # check against the 5 by 5 identity
```

**Important:** You must generate `X` **once** and then use the *same object* in `det(X)`, `solve(X)`, and `X %*% solve(X)`. If you regenerate random numbers between commands, the products do not describe the same matrix.

The source's check shows diagonal values near `1.000000e+00` and off-diagonal values such as `2.775558e-17`, which are extraordinarily close to zero. Scientific notation means

\[
2.775558\times10^{-17}
=2.775558\times10^{-17}
=0.00000000000000002775558.
\]

These tiny residuals arise from floating-point rounding in numerical computation. The correct interpretation is **approximately the identity matrix**, not that the inverse formula is wrong.

To make your own verification reproducible, use:

```r
set.seed(2451)                    # extra example, not the lecture's random seed
X <- matrix(rnorm(25), 5, 5)
X_inv <- solve(X)
X %*% X_inv
round(X %*% X_inv, 10)
diag(5)                            # exact expected 5 by 5 identity
```

`round(..., 10)` is for readable display, not an exact-algebra proof. The matrix may be numerically ill-conditioned even when its determinant is nonzero; software still requires care.

## 17. Orthogonal matrices: perpendicular unit directions (lecture p. 13)

Earlier, **two vectors** were orthogonal when their inner product was zero. Now imagine a square matrix whose columns form mutually perpendicular directions, each of length exactly one. This is an **orthogonal matrix**.

### 17.1 The definition

\[
\boxed{\mathbf Q\mathbf Q'=\mathbf Q'\mathbf Q=\mathbf I}
\quad\Longleftrightarrow\quad
\boxed{\mathbf Q^{-1}=\mathbf Q'.}
\]

- \(\mathbf Q\) is square.
- \(\mathbf Q'\) is its transpose.
- \(\mathbf Q^{-1}\) is its inverse.
- \(\mathbf I\) is the appropriate identity matrix.
- The two equations say an orthogonal matrix is undone merely by transposing it.

### 17.2 A concrete \(2\times2\) orthogonal matrix

\[
\mathbf Q=\begin{bmatrix}0&-1\\1&0\end{bmatrix},
\qquad
\mathbf Q'=\begin{bmatrix}0&1\\-1&0\end{bmatrix}.
\]

Multiply:

\[
\begin{aligned}
\mathbf Q'\mathbf Q
&=\begin{bmatrix}0&1\\-1&0\end{bmatrix}
\begin{bmatrix}0&-1\\1&0\end{bmatrix}\\
&=\begin{bmatrix}0(0)+1(1)&0(-1)+1(0)\\(-1)(0)+0(1)&(-1)(-1)+0(0)\end{bmatrix}\\
&=\boxed{\begin{bmatrix}1&0\\0&1\end{bmatrix}}.
\end{aligned}
\]

Its columns are \(\mathbf q_1=(0,1)'\) and \(\mathbf q_2=(-1,0)'\). Their lengths are both 1:

\[
\mathbf q_1'\mathbf q_1=0^2+1^2=1,
\quad\mathbf q_2'\mathbf q_2=(-1)^2+0^2=1.
\]

Their inner product is zero:

\[
\mathbf q_1'\mathbf q_2=(0)(-1)+(1)(0)=0.
\]

So the columns are **orthonormal**: **orthogonal** *and* **normalized**. The rows have the same property.

### 17.3 Deriving the source's row and column statements

If row \(i\) of \(\mathbf Q\) is the row vector \(\mathbf q_i'\), then cell \((i,j)\) of \(\mathbf Q\mathbf Q'\) is

\[
(\mathbf Q\mathbf Q')_{ij}=\mathbf q_i'\mathbf q_j.
\]

But \(\mathbf Q\mathbf Q'=\mathbf I\). Therefore:

\[
\mathbf q_i'\mathbf q_i=1\quad\text{(each row has unit length)},
\]

\[
\mathbf q_i'\mathbf q_j=0\quad\text{when }i\ne j
\quad\text{(different rows are perpendicular)}.
\]

Similarly \(\mathbf Q'\mathbf Q=\mathbf I\) says the **columns** form an orthonormal system.

### 17.4 Why orthogonal transformations are special

For any vector \(\mathbf x\), an orthogonal matrix preserves Euclidean length:

\[
\begin{aligned}
\lVert\mathbf Q\mathbf x\rVert_2^2
&=(\mathbf Q\mathbf x)'(\mathbf Q\mathbf x)\\
&=\mathbf x'\mathbf Q'\mathbf Q\mathbf x\\
&=\mathbf x'\mathbf I\mathbf x\\
&=\mathbf x'\mathbf x
=\lVert\mathbf x\rVert_2^2.
\end{aligned}
\]

It also preserves angles and inner products. Geometrically, it changes **orientation** (by rotating or reflecting) without changing lengths. PCA often uses orthogonal axes for exactly this reason. This proof and statistical connection supplement the source.

## 18. Eigenvalues and eigenvectors: a matrix's special directions (lecture pp. 13–14)

This chapter gathers all earlier ideas. It requires vectors, scaling, matrix–vector multiplication, determinants, identity matrices, normalization, and orthogonality.

### 18.1 The intuition: some directions do not bend under a transformation

A matrix can transform a vector into a new vector. Usually it changes both the length **and** the direction. However, some vectors lie along special directions for which multiplication by the matrix acts exactly like scalar multiplication.

A **nonzero** vector \(\mathbf x\) is an **eigenvector** of a square matrix \(\mathbf A\) if

\[
\boxed{\mathbf A\mathbf x=\lambda\mathbf x}
\]

for some scalar \(\lambda\), called the corresponding **eigenvalue**.

- \(\mathbf A\) is the transformation matrix, of size \(n\times n\).
- \(\mathbf x\) is a nonzero \(n\times1\) eigenvector.
- \(\lambda\) is the scalar eigenvalue.
- \(\mathbf A\mathbf x\) and \(\lambda\mathbf x\) are both \(n\times1\) vectors.

The equation says: applying \(\mathbf A\) to this particular \(\mathbf x\) has the same result as multiplying it by a **single number**.

### 18.2 Interpreting an eigenvalue

For a real eigenvalue and real eigenvector:

- \(\lambda=3\): the vector is stretched to three times its original length.
- \(\lambda=0.5\): the vector is shrunk to half its original length.
- \(\lambda=-2\): the vector reverses direction and becomes twice as long.
- \(\lambda=0\): the nonzero eigenvector is sent to the zero vector.
- \(\lambda=1\): the eigenvector is unchanged.

Note the subtlety: a negative eigenvalue with magnitude below 1, such as \(-0.5\), means **reverse and shrink**. The sign determines reversal, the absolute value determines stretching or shrinking.

### 18.3 Easiest eigenvalue example: a diagonal matrix

Take

\[
\mathbf A=\begin{bmatrix}2&0\\0&3\end{bmatrix}.
\]

Let \(\mathbf e_1=(1,0)'\). Multiply:

\[
\mathbf A\mathbf e_1=
\begin{bmatrix}2(1)+0(0)\\0(1)+3(0)\end{bmatrix}
=\begin{bmatrix}2\\0\end{bmatrix}
=2\begin{bmatrix}1\\0\end{bmatrix}.
\]

So \(\mathbf e_1\) is an eigenvector with eigenvalue \(\lambda_1=2\).

Now let \(\mathbf e_2=(0,1)'\):

\[
\mathbf A\mathbf e_2=
\begin{bmatrix}2(0)+0(1)\\0(0)+3(1)\end{bmatrix}
=\begin{bmatrix}0\\3\end{bmatrix}
=3\begin{bmatrix}0\\1\end{bmatrix}.
\]

Thus \(\lambda_2=3\) with eigenvector \(\mathbf e_2\). A diagonal matrix makes each coordinate direction especially easy to analyze.

### 18.4 How to find eigenvalues: the characteristic equation

Start with

\[
\mathbf A\mathbf x=\lambda\mathbf x.
\]

Because \(\mathbf I\mathbf x=\mathbf x\), we can write \(\lambda\mathbf x=\lambda\mathbf I\mathbf x\). Rearrange:

\[
\mathbf A\mathbf x-\lambda\mathbf I\mathbf x=\mathbf0,
\]

\[
\boxed{(\mathbf A-\lambda\mathbf I)\mathbf x=\mathbf0.}
\]

For a **nonzero** solution \(\mathbf x\) to exist, \(\mathbf A-\lambda\mathbf I\) must be singular. Its determinant must therefore be zero:

\[
\boxed{p(\lambda)=\det(\mathbf A-\lambda\mathbf I)=0.}
\]

This is the **characteristic equation**. Its left-hand expression is the **characteristic polynomial**. The values of \(\lambda\) that make it zero are the eigenvalues.

### 18.5 Solve a full \(2\times2\) eigenvalue problem (additional)

Consider the **symmetric** matrix

\[
\mathbf A=\begin{bmatrix}2&1\\1&2\end{bmatrix}.
\]

**Step 1. Subtract \(\lambda\mathbf I\).**

\[
\mathbf A-\lambda\mathbf I
=\begin{bmatrix}2-\lambda&1\\1&2-\lambda\end{bmatrix}.
\]

**Step 2. Set the determinant to zero.**

\[
\begin{aligned}
\det(\mathbf A-\lambda\mathbf I)
&=(2-\lambda)(2-\lambda)-(1)(1)\\
&=(2-\lambda)^2-1\\
&=(4-4\lambda+\lambda^2)-1\\
&=\lambda^2-4\lambda+3\\
&=(\lambda-3)(\lambda-1).
\end{aligned}
\]

**Step 3. Solve for the roots.**

\[
(\lambda-3)(\lambda-1)=0
\Rightarrow\boxed{\lambda_1=3,\qquad\lambda_2=1}.
\]

**Step 4. Find an eigenvector for \(\lambda_1=3\).**

\[
(\mathbf A-3\mathbf I)\mathbf x=\mathbf0
\Rightarrow
\begin{bmatrix}-1&1\\1&-1\end{bmatrix}
\begin{bmatrix}x_1\\x_2\end{bmatrix}
=\begin{bmatrix}0\\0\end{bmatrix}.
\]

The first row tells us \(-x_1+x_2=0\), hence \(x_2=x_1\). A simple nonzero choice is

\[
\mathbf v_1=\begin{bmatrix}1\\1\end{bmatrix}.
\]

Verify:

\[
\mathbf A\mathbf v_1
=\begin{bmatrix}2(1)+1(1)\\1(1)+2(1)\end{bmatrix}
=\begin{bmatrix}3\\3\end{bmatrix}
=3\mathbf v_1.
\]

**Step 5. Find an eigenvector for \(\lambda_2=1\).**

\[
(\mathbf A-\mathbf I)\mathbf x=\mathbf0
\Rightarrow
\begin{bmatrix}1&1\\1&1\end{bmatrix}
\begin{bmatrix}x_1\\x_2\end{bmatrix}=\mathbf0.
\]

Thus \(x_1+x_2=0\), so choose

\[
\mathbf v_2=\begin{bmatrix}1\\-1\end{bmatrix}.
\]

Check:

\[
\mathbf A\mathbf v_2
=\begin{bmatrix}2(1)+1(-1)\\1(1)+2(-1)\end{bmatrix}
=\begin{bmatrix}1\\-1\end{bmatrix}
=1\mathbf v_2.
\]

**Step 6. Normalize both eigenvectors.** Their lengths are both \(\sqrt{1^2+1^2}=\sqrt2\). Therefore

\[
\mathbf q_1=\frac1{\sqrt2}\begin{bmatrix}1\\1\end{bmatrix},
\qquad
\mathbf q_2=\frac1{\sqrt2}\begin{bmatrix}1\\-1\end{bmatrix}.
\]

Both have length 1. Their inner product is

\[
\mathbf q_1'\mathbf q_2
=\frac12[(1)(1)+(1)(-1)]=\frac12(1-1)=0.
\]

They are **orthonormal eigenvectors**. This is guaranteed to be achievable for a **real symmetric matrix**, an important condition for PCA and spectral decomposition.

### 18.6 Are eigenvectors unique?

The direction can be represented by many scalar multiples. If \(\mathbf A\mathbf x=\lambda\mathbf x\), then for any nonzero scalar \(c\):

\[
\mathbf A(c\mathbf x)=c\mathbf A\mathbf x=c\lambda\mathbf x=\lambda(c\mathbf x).
\]

Therefore \(c\mathbf x\) is another eigenvector with the **same eigenvalue \(\lambda\)**. For instance, \((1,1)'\), \((2,2)'\) and \((-1,-1)'\) are all eigenvectors for eigenvalue 3 of our example. Normalizing chooses a standard length, though the sign can still be reversed. See **Chapter 19**, because page 13 of the source mistakenly says the eigenvalue changes to \(\lambda/2\) when the vector changes to \(2\mathbf x\).

### 18.7 Trace and determinant from eigenvalues (lecture p. 13)

For an \(n\times n\) matrix, list the eigenvalues \(\lambda_1,\ldots,\lambda_n\), including algebraic multiplicity. Then

\[
\boxed{\operatorname{tr}(\mathbf A)=\lambda_1+\lambda_2+\cdots+\lambda_n,}
\]

\[
\boxed{\det(\mathbf A)=\lambda_1\lambda_2\cdots\lambda_n.}
\]

Our \(2\times2\) example has eigenvalues 3 and 1. So its trace should be \(3+1=4\), and its determinant should be \(3(1)=3\). Check from the matrix:

\[
\operatorname{tr}\begin{bmatrix}2&1\\1&2\end{bmatrix}=2+2=4,
\]

\[
\det\begin{bmatrix}2&1\\1&2\end{bmatrix}=2(2)-1(1)=3.
\]

These identities are particularly useful **checking tools**. If your computed eigenvalues do not match trace and determinant, recheck the arithmetic.

### 18.8 The lecturer's \(4\times4\) eigenvalue output is especially instructive (lecture p. 14)

The variable `A` on page 14 continues to refer to the \(4\times4\) matrix built on page 8:

\[
\mathbf A=\begin{bmatrix}
1&5&9&13\\
2&6&10&14\\
3&7&11&15\\
4&8&12&16
\end{bmatrix}.
\]

The lecture uses:

```r
evs <- eigen(A)
evs$values
evs$vectors
```

The printed eigenvalues are approximately

\[
36.2093727,\qquad -2.2093727,\qquad
1.6\times10^{-15},\qquad7.17\times10^{-16}.
\]

The last two values are extremely close to **zero**. In exact arithmetic the mathematical eigenvalues are two nonzero values and **two zeros**. Thus

\[
\operatorname{tr}(\mathbf A)=1+6+11+16=34,
\]

and the two nonzero eigenvalues satisfy \(36.2093727+(-2.2093727)\approx34\). The product of all four eigenvalues is **zero**, consistent with \(\det(\mathbf A)=0\).

**Why two zero eigenvalues?** Observe that

\[
\text{column 2}=\text{column 1}+4\begin{bmatrix}1\\1\\1\\1\end{bmatrix},
\]

\[
\text{column 3}=\text{column 1}+8\begin{bmatrix}1\\1\\1\\1\end{bmatrix},
\quad
\text{column 4}=\text{column 1}+12\begin{bmatrix}1\\1\\1\\1\end{bmatrix}.
\]

So the four columns span only **two independent directions**. The rank is 2. This is a strong concrete link among **column dependence, rank, zero eigenvalues and determinant zero**.

**Additional exact check:** In fact, the two nonzero eigenvalues are exactly \(17+3\sqrt{41}\) and \(17-3\sqrt{41}\). Their sum is 34, and their product is \(17^2-(3\sqrt{41})^2=289-369=-80\). The other two eigenvalues are exactly zero, so the product of **all four** is zero. This explains the lecture's approximate output rather than requiring the tiny scientific-notation values to be treated as genuine nonzero eigenvalues.

**Critical source nuance:** This \(\mathbf A\) is **not symmetric**, since \(a_{12}=5\) but \(a_{21}=2\). `eigen(A)` in R can still compute its eigenvalues and eigenvectors, and the lecture's output is legitimate. But it would be incorrect to claim that this example's eigenvectors necessarily form an orthogonal matrix or that the symmetric spectral decomposition applies directly to this particular \(\mathbf A\). We make that distinction explicitly below.

For a concrete check using the first two normalized eigenvector columns displayed on source page 14, the approximate vectors are

\[
\mathbf v_1\approx\begin{bmatrix}0.4140\\0.4688\\0.5236\\0.5785\end{bmatrix},\qquad
\mathbf v_2\approx\begin{bmatrix}0.8229\\0.4219\\0.0210\\-0.3800\end{bmatrix}.
\]

Their inner product is approximately **0.330**, not zero. So even the source's own numerical output illustrates why eigenvectors of a nonsymmetric matrix cannot automatically be treated as orthogonal. The exact numerical signs of eigenvector columns are not unique.

### 18.9 Positive definite and nonnegative definite matrices (lecture p. 14)

First, what is a **quadratic form**? For a square \(n\times n\) matrix \(\mathbf A\) and vector \(\mathbf x\in\mathbb R^n\), the expression

\[
\mathbf x'\mathbf A\mathbf x
\]

is one scalar. The dimensions are

\[
(1\times n)(n\times n)(n\times1)\to1\times1.
\]

**Additional example:** with \(\mathbf A=\begin{bmatrix}2&0\\0&3\end{bmatrix}\) and \(\mathbf x=(u,v)'\),

\[
\begin{aligned}
\mathbf x'\mathbf A\mathbf x
&=\begin{bmatrix}u&v\end{bmatrix}
\begin{bmatrix}2u\\3v\end{bmatrix}\\
&=2u^2+3v^2.
\end{aligned}
\]

This is greater than 0 for every **nonzero** \((u,v)'\), because squares are nonnegative and at least one square is positive. We call the quadratic form **positive definite**.

**Definition from page 14:** \(\mathbf A\) is *positive definite* in the quadratic-form sense if

\[
\boxed{\mathbf x'\mathbf A\mathbf x>0\quad\text{for all }\mathbf x\ne\mathbf0.}
\]

It is *nonnegative definite* (also called **positive semidefinite**) if

\[
\boxed{\mathbf x'\mathbf A\mathbf x\ge0\quad\text{for all }\mathbf x.}
\]

Notice the difference: a positive-semidefinite matrix can give zero for **some nonzero vector**, whereas a positive-definite matrix cannot.

**Two simple examples:**

\[
\underbrace{\begin{bmatrix}2&0\\0&3\end{bmatrix}}_{\text{positive definite}}
\qquad\text{versus}\qquad
\underbrace{\begin{bmatrix}2&0\\0&0\end{bmatrix}}_{\text{positive semidefinite but not positive definite}}.
\]

For the second matrix, taking \(\mathbf x=(0,1)'\) gives \(\mathbf x'\mathbf A\mathbf x=0\) even though \(\mathbf x\ne\mathbf0\).

**Eigenvalue rule with its necessary assumption:** for a **real symmetric** matrix, positive definite means **every eigenvalue is strictly positive**; positive semidefinite means **every eigenvalue is nonnegative**. The lecture uses a weaker eigenvalue description for positive definiteness and does not make the symmetry condition explicit. Chapter 19 explains the precise version.

### 18.10 Spectral (eigen-) decomposition: build the matrix from special directions (lecture p. 14)

For a **real symmetric** \(n\times n\) matrix \(\mathbf A\), choose \(n\) orthonormal eigenvectors and form a matrix whose columns are those eigenvectors:

\[
\mathbf Q=\begin{bmatrix}\mathbf q_1&\mathbf q_2&\cdots&\mathbf q_n\end{bmatrix}.
\]

Let the corresponding eigenvalues fill a diagonal matrix:

\[
\boldsymbol\Lambda=\operatorname{diag}(\lambda_1,\ldots,\lambda_n).
\]

Then the **spectral decomposition** is

\[
\boxed{\mathbf A=\mathbf Q\boldsymbol\Lambda\mathbf Q'.}
\]

The lecture calls the eigenvector matrix \(\mathbf X\); we use \(\mathbf Q\) in this explanation to emphasize that it is **orthogonal** and to avoid confusing it with the data matrix \(\mathbf X\) seen elsewhere. It is the *same mathematical formula*: \(\mathbf A=\mathbf X\boldsymbol\Lambda\mathbf X'\) in the lecturer's symbols.

Every piece has a clear role:

| Part | Dimensions | Meaning |
|---|---|---|
| \(\mathbf A\) | \(n\times n\) | Original symmetric matrix |
| \(\mathbf Q\) | \(n\times n\) | Orthonormal eigenvectors as columns |
| \(\boldsymbol\Lambda\) | \(n\times n\) | Eigenvalues on the diagonal |
| \(\mathbf Q'\) | \(n\times n\) | Transpose and inverse of \(\mathbf Q\) |
| \(\mathbf Q\boldsymbol\Lambda\mathbf Q'\) | \(n\times n\) | Reconstructed original matrix |

Think of the decomposition as a three-stage transformation: express a vector in the special coordinate directions, scale each direction by its eigenvalue, and transform back.

### 18.11 Complete spectral decomposition with actual numbers

Return to the symmetric matrix

\[
\mathbf A=\begin{bmatrix}2&1\\1&2\end{bmatrix}.
\]

We found normalized eigenvectors

\[
\mathbf q_1=\frac1{\sqrt2}\begin{bmatrix}1\\1\end{bmatrix},
\qquad
\mathbf q_2=\frac1{\sqrt2}\begin{bmatrix}1\\-1\end{bmatrix},
\]

with eigenvalues \(\lambda_1=3\) and \(\lambda_2=1\). Assemble

\[
\mathbf Q=\frac1{\sqrt2}\begin{bmatrix}1&1\\1&-1\end{bmatrix},
\qquad
\boldsymbol\Lambda=\begin{bmatrix}3&0\\0&1\end{bmatrix}.
\]

**Step 1. Multiply \(\mathbf Q\) by \(\boldsymbol\Lambda\).**

\[
\begin{aligned}
\mathbf Q\boldsymbol\Lambda
&=\frac1{\sqrt2}\begin{bmatrix}1&1\\1&-1\end{bmatrix}
\begin{bmatrix}3&0\\0&1\end{bmatrix}\\
&=\frac1{\sqrt2}\begin{bmatrix}
(1)(3)+(1)(0)&(1)(0)+(1)(1)\\
(1)(3)+(-1)(0)&(1)(0)+(-1)(1)
\end{bmatrix}\\
&=\frac1{\sqrt2}\begin{bmatrix}3&1\\3&-1\end{bmatrix}.
\end{aligned}
\]

**Step 2. Multiply by \(\mathbf Q'\).** This particular \(\mathbf Q\) happens to be symmetric, so \(\mathbf Q'=\mathbf Q\).

\[
\begin{aligned}
\mathbf Q\boldsymbol\Lambda\mathbf Q'
&=\frac12\begin{bmatrix}3&1\\3&-1\end{bmatrix}
\begin{bmatrix}1&1\\1&-1\end{bmatrix}\\
&=\frac12\begin{bmatrix}
3(1)+1(1)&3(1)+1(-1)\\
3(1)+(-1)(1)&3(1)+(-1)(-1)
\end{bmatrix}\\
&=\frac12\begin{bmatrix}4&2\\2&4\end{bmatrix}\\
&=\boxed{\begin{bmatrix}2&1\\1&2\end{bmatrix}=\mathbf A}.
\end{aligned}
\]

**What did we accomplish?** We reconstructed the entire original matrix from its two eigenvalues and two orthonormal eigenvectors. This is the foundation for understanding principal component analysis and covariance-matrix decompositions.

### 18.12 The general case versus the symmetric special case

This distinction prevents a common conceptual error:

- An arbitrary real square matrix has eigenvalues over the **complex** numbers, counting multiplicity, and may not have enough independent eigenvectors to be diagonalized.
- A real square matrix with enough independent eigenvectors can be written \(\mathbf A=\mathbf V\boldsymbol\Lambda\mathbf V^{-1}\), if complex arithmetic is allowed where required.
- A **real symmetric** matrix has **real eigenvalues** and an **orthonormal eigenvector basis**, so it has the especially elegant decomposition \(\mathbf A=\mathbf Q\boldsymbol\Lambda\mathbf Q'\).

The last is the theorem needed for the source's spectral decomposition and for standard PCA. This extra clarification is not a license to apply the formula \(\mathbf Q\boldsymbol\Lambda\mathbf Q'\) to the source's nonsymmetric \(\mathbf A\) from page 8.

### 18.13 Computing eigenvalues in R (lecture p. 14)

The source's commands are:

```r
evs <- eigen(A)
evs$values
evs$vectors
```

`eigen(A)` returns a structured R object. The `$values` component contains the eigenvalues and `$vectors` contains their corresponding eigenvectors in columns, in the same order. The exact signs of eigenvector columns can vary across implementations or runs without changing the mathematics.

Try the **additional symmetric example**, where the interpretation is easier:

```r
A_sym <- matrix(c(2, 1,
                  1, 2), nrow = 2, byrow = TRUE)

evs <- eigen(A_sym)
evs$values                   # 3 1
evs$vectors                  # normalized eigenvectors as columns

# Verify A q = lambda q for first eigenvector:
q1 <- evs$vectors[, 1]
A_sym %*% q1
evs$values[1] * q1

# Verify the spectral decomposition:
Q <- evs$vectors
Lambda <- diag(evs$values)
Q %*% Lambda %*% t(Q)       # reconstructs A_sym, up to rounding
```

For the **source's** nonsymmetric `A`, `eigen(A)` still calculates eigenvalues and eigenvectors, but a matrix assembled from all returned eigenvectors is **not necessarily orthogonal**. This is why checking the assumptions is part of using statistical software correctly.

---

# Part VI. Read the source critically and use the mathematics correctly

## 19. Source-checking notes: important mathematical qualifications

The purpose of a teaching book is not just to restate symbols. It is to help you decide **when a theorem is true**. The following notes preserve the lecture's original intent while clearly disclosing where its printed wording is incomplete or incorrect. They are **not additional claims made by the lecturer**.

### 19.1 Correction: scaling an eigenvector does not divide its eigenvalue (lecture p. 13)

**As printed in the source:** If \((\mathbf x,\lambda)\) solves \(\mathbf A\mathbf x=\lambda\mathbf x\), then \((2\mathbf x,\lambda/2)\) is another solution.

**Status: mathematically incorrect in general.** The correct statement is

\[
\boxed{\text{If }\mathbf A\mathbf x=\lambda\mathbf x\text{ and }c\ne0,
\text{ then }\mathbf A(c\mathbf x)=\lambda(c\mathbf x).}
\]

**The eigenvalue stays the same.** Proof:

\[
\mathbf A(2\mathbf x)=2(\mathbf A\mathbf x)=2\lambda\mathbf x
=\lambda(2\mathbf x),
\]

not \((\lambda/2)(2\mathbf x)=\lambda\mathbf x\). For example, if \(\mathbf A\mathbf x=3\mathbf x\), then \(\mathbf A(2\mathbf x)=6\mathbf x=3(2\mathbf x)\), so the eigenvalue is still **3**, not 1.5.

**Exam-safe rule:** scalar multiples of a nonzero eigenvector are eigenvectors with the **same** eigenvalue.

### 19.2 Qualification: “orthogonal vectors are linearly independent” excludes zero vectors (lecture p. 3)

**The source says:** orthogonal vectors are linearly independent, and the zero vector is orthogonal to every vector.

**Necessary clarification:** the independence conclusion holds for a set of **mutually orthogonal, nonzero** vectors. Since \(\mathbf0'\mathbf x=0\), the zero vector is orthogonal to every vector under the algebraic definition. But a set containing \(\mathbf0\) is always dependent: just multiply the zero vector by a nonzero coefficient and multiply all other vectors by zero.

For example,

\[
1\begin{bmatrix}0\\0\end{bmatrix}
+0\begin{bmatrix}1\\2\end{bmatrix}
=\mathbf0
\]

uses coefficients **not all zero**, so the pair is dependent despite being orthogonal under the zero-inner-product definition.

### 19.3 Qualification: positive definite versus positive semidefinite (lecture p. 14)

**The source defines:** positive definite when \(\mathbf x'\mathbf A\mathbf x>0\) for every nonzero real vector; nonnegative definite when the quadratic form is \(\ge0\). It then states that a useful property of positive-definite matrices is to have eigenvalues that are real and nonnegative.

**Precise textbook statement:** For a **real symmetric positive-definite** matrix, every eigenvalue is **real and strictly positive** (\(\lambda_i>0\)). For a **real symmetric positive-semidefinite** matrix, every eigenvalue is **real and nonnegative** (\(\lambda_i\ge0\)).

“Nonnegative” is technically true but too weak for symmetric positive definite: zero eigenvalues are impossible. More importantly, the symmetry assumption is needed to conclude that eigenvalues are real from the quadratic-form positivity condition alone.

**Why the symmetry condition matters:** The real matrix

\[
\mathbf A=\begin{bmatrix}1&-1\\1&1\end{bmatrix}
\]

satisfies

\[
\begin{bmatrix}u&v\end{bmatrix}\mathbf A\begin{bmatrix}u\\v\end{bmatrix}
=u^2+v^2>0\quad\text{for }(u,v)\ne(0,0),
\]

but it is **not symmetric**, and its eigenvalues are \(1+i\) and \(1-i\), where \(i\) is the imaginary unit satisfying \(i^2=-1\). Thus, quadratic-form positivity without symmetry does not force real eigenvalues. For this introductory statistics course, covariance matrices are symmetric, so the standard symmetric-matrix theorem is the relevant one.

### 19.4 Qualification: orthonormal eigenvectors require special matrix conditions (lecture pp. 13–14)

The source recommends unit-length mutually orthogonal eigenvectors and introduces

\[
\mathbf A=\mathbf X\boldsymbol\Lambda\mathbf X'.
\]

That is valid as a **spectral decomposition for real symmetric matrices**. It is **not automatically valid for every square matrix**. A nonsymmetric matrix may have eigenvectors that cannot all be made mutually orthogonal, and some square matrices do not have a full basis of independent eigenvectors at all.

A valid general decomposition for a *diagonalizable* matrix uses an eigenvector matrix \(\mathbf V\) and its **inverse**:

\[
\mathbf A=\mathbf V\boldsymbol\Lambda\mathbf V^{-1}.
\]

Only when the eigenvector matrix can be chosen **orthogonal** may you replace \(\mathbf V^{-1}\) with \(\mathbf V'\). That replacement is guaranteed for a **real symmetric** matrix.

### 19.5 Clarification: the lecture calls `eigen(A)` on a nonsymmetric matrix (lecture pp. 8, 14)

The lecture describes `eigen(A)` while discussing symmetric matrices, yet the actual previously constructed \(\mathbf A\) has \(a_{12}=5\) and \(a_{21}=2\), so it is nonsymmetric. **This is not a failure of R's `eigen()` function.** R supports nonsymmetric matrices. It just means the returned eigenvectors should **not automatically be treated as orthonormal**, and the symmetric spectral-decomposition theorem cannot be applied without checking assumptions.

### 19.6 Clarification: zero is not an eigenvector (lecture p. 13)

The defining equation \(\mathbf A\mathbf x=\lambda\mathbf x\) is automatically true for \(\mathbf x=\mathbf0\) and every \(\lambda\). Therefore the definition of an **eigenvector** specifically requires \(\mathbf x\ne\mathbf0\). Omitting that requirement would make eigenvalues meaningless.

### 19.7 Clarification: eigenvalues need not always be real (lecture p. 13)

A real nonsymmetric square matrix can have **complex** eigenvalues. Every square matrix has eigenvalues when we allow complex-number solutions, counted with algebraic multiplicity, but not every real matrix has real-valued eigenvectors or eigenvalues. Real **symmetric** matrices do have real eigenvalues. The book focuses on those real, symmetric cases for geometric understanding and multivariate statistics.

### 19.8 Terminology precision: “unit length” does not automatically mean “perpendicular”

**Normalized** means each vector has length 1. **Orthogonal** means different vectors have inner product zero. **Orthonormal** means **both** are true. These terms cannot substitute for one another. You may normalize two nonperpendicular vectors and they will still not be orthogonal.

### 19.9 Distinguish the source from R's extra computational behavior

The source's mathematical formulas use equal vector lengths for vector addition and dot products, and matching matrix dimensions for addition and elementwise products. R sometimes **recycles** shorter atomic vectors. That extra software behavior does not change the lecture's mathematical dimension rules. Treat it as something to control, not as a new rule of matrix algebra.

---

# Part VII. Why these operations appear in multivariate statistics

## 20. From a data table to a covariance matrix (supplementary teaching bridge)

This chapter and the next two are **additional applications**, not exercises or statistical formulas printed in Lecture 02. They show why the matrix machinery you have learned is worth understanding before later multivariate topics.

### 20.1 What are a mean, a variance, and a covariance?

A **mean** is an average. If three customers spend 1, 2, and 3 units, their average is \((1+2+3)/3=2\).

A **deviation** measures how far a value is from its mean. Those three deviations are \(-1,0,1\).

A **variance** measures how much one variable spreads around its mean, typically by averaging **squared deviations**. In the usual sample variance, the sum of squared deviations is divided by \(n-1\), where \(n\) is the number of observations.

A **covariance** measures whether two variables move above or below their means together. Positive covariance means they often move in the same direction; negative covariance means they often move in opposite directions. Zero covariance means they have no *linear* co-movement, but does not automatically make them statistically independent.

### 20.2 A complete, deliberately tiny two-variable dataset

Suppose three observations contain two measurements:

| Observation | Variable 1 | Variable 2 |
|---|---:|---:|
| 1 | 1 | 2 |
| 2 | 2 | 4 |
| 3 | 3 | 6 |

The data matrix is

\[
\mathbf X=\begin{bmatrix}1&2\\2&4\\3&6\end{bmatrix}_{3\times2}.
\]

Compute each column mean:

\[
\bar x_1=\frac{1+2+3}{3}=2,
\qquad
\bar x_2=\frac{2+4+6}{3}=4.
\]

### 20.3 Center each variable

**Centering** means subtracting that variable's own mean from every observation. The **centered data matrix** \(\mathbf C\) is

\[
\begin{aligned}
\mathbf C
&=\begin{bmatrix}1-2&2-4\\2-2&4-4\\3-2&6-4\end{bmatrix}\\
&=\boxed{\begin{bmatrix}-1&-2\\0&0\\1&2\end{bmatrix}_{3\times2}}.
\end{aligned}
\]

Its column totals are zero, because each column has had its mean removed.

### 20.4 Multiply the centered matrix by its transpose in the right order

The **sample covariance matrix** is

\[
\boxed{\mathbf S=\frac1{n-1}\mathbf C'\mathbf C},
\]

where \(n\) is the number of observations and columns of \(\mathbf C\) are variables. Here \(n=3\), so divide by 2.

**First check dimensions:**

\[
\underbrace{\mathbf C'}_{2\times3}
\underbrace{\mathbf C}_{3\times2}
=\underbrace{\mathbf C'\mathbf C}_{2\times2}.
\]

The answer must contain a \(2\times2\) matrix because there are two variables and we want each possible pair of variables.

Now compute each of the four entries:

\[
\begin{aligned}
(\mathbf C'\mathbf C)_{11}&=(-1)(-1)+(0)(0)+(1)(1)=1+0+1=2,\\
(\mathbf C'\mathbf C)_{12}&=(-1)(-2)+(0)(0)+(1)(2)=2+0+2=4,\\
(\mathbf C'\mathbf C)_{21}&=(-2)(-1)+(0)(0)+(2)(1)=2+0+2=4,\\
(\mathbf C'\mathbf C)_{22}&=(-2)(-2)+(0)(0)+(2)(2)=4+0+4=8.
\end{aligned}
\]

Thus

\[
\mathbf C'\mathbf C=\begin{bmatrix}2&4\\4&8\end{bmatrix},
\]

and

\[
\boxed{\mathbf S=\frac12\begin{bmatrix}2&4\\4&8\end{bmatrix}
=\begin{bmatrix}1&2\\2&4\end{bmatrix}.}
\]

### 20.5 Interpret every entry

- \(s_{11}=1\) is the sample variance of Variable 1.
- \(s_{22}=4\) is the sample variance of Variable 2.
- \(s_{12}=s_{21}=2\) is their sample covariance.
- \(\mathbf S'=\mathbf S\), so the covariance matrix is symmetric.
- Its determinant is \(1(4)-2(2)=0\), so it is singular.

Why singular? Variable 2 is exactly **twice** Variable 1. All observations lie on the straight line \(x_2=2x_1\). There are not two independent directions of variation. This is the precise statistical meaning of a rank-deficient covariance matrix.

### 20.6 Why covariance matrices are nonnegative definite

For any \(p\)-component vector \(\mathbf v\),

\[
\begin{aligned}
\mathbf v'\mathbf S\mathbf v
&=\frac1{n-1}\mathbf v'\mathbf C'\mathbf C\mathbf v\\
&=\frac1{n-1}(\mathbf C\mathbf v)'(\mathbf C\mathbf v)\\
&=\frac1{n-1}\lVert\mathbf C\mathbf v\rVert_2^2\\
&\ge0.
\end{aligned}
\]

The final expression is a squared length divided by a positive number (assuming \(n\ge2\)); it cannot be negative. Therefore a sample covariance matrix is **symmetric positive semidefinite**. It is strictly positive definite only when the centered-variable columns are linearly independent.

This single proof connects **transpose, multiplication, inner product, Euclidean length, linear independence, and positive semidefiniteness**.

### 20.7 Practical R implementation

```r
X <- matrix(c(1, 2,
              2, 4,
              3, 6), nrow = 3, byrow = TRUE)

C <- scale(X, center = TRUE, scale = FALSE)
S <- crossprod(C) / (nrow(X) - 1)

C                  # centered data
S                  # 1 2 / 2 4
cov(X)             # same sample covariance matrix

det(S)             # 0, apart from possible floating-point rounding
qr(S)$rank         # 1
```

Note: `crossprod(C)` computes \(\mathbf C'\mathbf C\), extending the same function used in the lecturer's vector examples. This is a powerful bridge from page 7 to real multivariate calculations.

## 21. PCA: find directions that summarize variation (supplementary)

**Principal Component Analysis (PCA)** is a method for replacing several correlated variables with new mutually perpendicular directions, called *principal components*. The first direction captures as much variation as possible. Further directions capture remaining variation, constrained to be perpendicular to earlier ones.

### 21.1 Use the covariance matrix we already calculated

\[
\mathbf S=\begin{bmatrix}1&2\\2&4\end{bmatrix}.
\]

Its characteristic equation is

\[
\begin{aligned}
\det(\mathbf S-\lambda\mathbf I)
&=\det\begin{bmatrix}1-\lambda&2\\2&4-\lambda\end{bmatrix}\\
&=(1-\lambda)(4-\lambda)-4\\
&=4-5\lambda+\lambda^2-4\\
&=\lambda(\lambda-5)=0.
\end{aligned}
\]

Thus the eigenvalues are

\[
\boxed{\lambda_1=5,\qquad\lambda_2=0}.
\]

They are nonnegative, as required for a covariance matrix.

### 21.2 Find both component directions

For \(\lambda_1=5\), solve \((\mathbf S-5\mathbf I)\mathbf v=0\):

\[
\begin{bmatrix}-4&2\\2&-1\end{bmatrix}
\begin{bmatrix}v_1\\v_2\end{bmatrix}=\mathbf0
\Rightarrow -4v_1+2v_2=0
\Rightarrow v_2=2v_1.
\]

Choose \(\mathbf v=(1,2)'\). Its norm is \(\sqrt{1^2+2^2}=\sqrt5\), so a normalized first direction is

\[
\boxed{\mathbf q_1=\frac1{\sqrt5}\begin{bmatrix}1\\2\end{bmatrix}}.
\]

An orthogonal second direction is

\[
\boxed{\mathbf q_2=\frac1{\sqrt5}\begin{bmatrix}-2\\1\end{bmatrix}}.
\]

Check \(\mathbf q_1'\mathbf q_2=(-2+2)/5=0\). The second direction has eigenvalue zero, which means **no variation at all** is left in that perpendicular direction.

### 21.3 Why eigenvalues describe variance in PCA

The sum of the original variable variances is the covariance matrix's trace:

\[
\operatorname{tr}(\mathbf S)=1+4=5.
\]

The eigenvalues sum to the same total: \(5+0=5\). Thus the first principal component captures \(5/5=100\%\) of the variance, and the second captures 0%. This happens because the original two variables were perfectly linearly related.

### 21.4 Turn centered observations into principal-component scores

Form the eigenvector matrix

\[
\mathbf Q=\frac1{\sqrt5}\begin{bmatrix}1&-2\\2&1\end{bmatrix}.
\]

The score matrix is \(\mathbf T=\mathbf C\mathbf Q\), with dimensions

\[
(3\times2)(2\times2)=(3\times2).
\]

Calculate every row:

\[
\begin{aligned}
\mathbf T
&=\frac1{\sqrt5}
\begin{bmatrix}-1&-2\\0&0\\1&2\end{bmatrix}
\begin{bmatrix}1&-2\\2&1\end{bmatrix}\\
&=\frac1{\sqrt5}
\begin{bmatrix}
(-1)(1)+(-2)(2)&(-1)(-2)+(-2)(1)\\
(0)(1)+(0)(2)&(0)(-2)+(0)(1)\\
(1)(1)+(2)(2)&(1)(-2)+(2)(1)
\end{bmatrix}\\
&=\frac1{\sqrt5}\begin{bmatrix}-5&0\\0&0\\5&0\end{bmatrix}\\
&=\boxed{\begin{bmatrix}-\sqrt5&0\\0&0\\\sqrt5&0\end{bmatrix}}.
\end{aligned}
\]

The second score column is all zero. In this simple dataset we can discard the second component without losing any observed variance. This is **dimension reduction**, one of PCA's central purposes.

### 21.5 What PCA is not

PCA does not automatically make measurements comparable when they use very different units. If one variable is measured in millions of rupees and another is a rating from 1 to 5, the first can dominate raw covariance calculations. Depending on the analytical goal, an analyst may standardize variables before PCA. Also, a high-variance direction is not automatically the most useful direction for predicting a particular business outcome.

### 21.6 R code to connect the lesson to PCA

```r
X <- matrix(c(1, 2, 2, 4, 3, 6), nrow = 3, byrow = TRUE)
C <- scale(X, center = TRUE, scale = FALSE)
S <- cov(X)

e <- eigen(S)
e$values                    # 5 0
e$vectors                   # directions; signs can be reversed

t(C) %*% C / (nrow(X) - 1) # manually verify covariance
C %*% e$vectors             # principal-component scores

# Covariance eigen-decomposition:
Q <- e$vectors
L <- diag(e$values)
Q %*% L %*% t(Q)            # S, up to rounding
```

The direction signs in R can differ from those chosen above. That is normal: \(\mathbf q\) and \(-\mathbf q\) are both valid eigenvectors for the same eigenvalue.

## 22. Regression and multivariate distributions (supplementary)

### 22.1 Regression asks a business question

Suppose you want to predict sales from advertising spending. **Regression** tries to fit a formula such as

\[
\widehat y=\beta_0+\beta_1x,
\]

where \(\widehat y\) (“y-hat”) is the predicted outcome, \(x\) is the explanatory variable, \(\beta_0\) is the intercept, and \(\beta_1\) is the slope. The hat signifies a predicted or estimated quantity.

For three observations with advertising values \(x=1,2,3\) and sales values \(y=2,3,5\), write

\[
\mathbf X=\begin{bmatrix}1&1\\1&2\\1&3\end{bmatrix}_{3\times2},
\quad\mathbf y=\begin{bmatrix}2\\3\\5\end{bmatrix}_{3\times1},
\quad\boldsymbol\beta=\begin{bmatrix}\beta_0\\\beta_1\end{bmatrix}_{2\times1}.
\]

Why is the first column all 1s? Multiplying it by \(\beta_0\) adds an intercept to every prediction.

### 22.2 Predictions are matrix–vector multiplication

\[
\widehat{\mathbf y}=\mathbf X\boldsymbol\beta
=\begin{bmatrix}
\beta_0+1\beta_1\\
\beta_0+2\beta_1\\
\beta_0+3\beta_1
\end{bmatrix}_{3\times1}.
\]

This is the same row-by-column rule from Chapter 11. Three separate prediction equations become one compact expression.

### 22.3 Compute least-squares coefficients with matrices

For an ordinary least-squares linear regression with full-column-rank \(\mathbf X\), the coefficient formula is

\[
\boxed{\widehat{\boldsymbol\beta}
=(\mathbf X'\mathbf X)^{-1}\mathbf X'\mathbf y.}
\]

You do not have to derive least squares here; the goal is to **read and calculate** its matrix pieces.

First,

\[
\mathbf X'=\begin{bmatrix}1&1&1\\1&2&3\end{bmatrix}_{2\times3}.
\]

Compute \(\mathbf X'\mathbf X\) entry by entry:

\[
\begin{aligned}
\mathbf X'\mathbf X
&=\begin{bmatrix}1&1&1\\1&2&3\end{bmatrix}
\begin{bmatrix}1&1\\1&2\\1&3\end{bmatrix}\\
&=\begin{bmatrix}
1+1+1&1+2+3\\
1+2+3&1+4+9
\end{bmatrix}\\
&=\boxed{\begin{bmatrix}3&6\\6&14\end{bmatrix}}.
\end{aligned}
\]

Its determinant is \(3(14)-6(6)=42-36=6\), so it has an inverse:

\[
(\mathbf X'\mathbf X)^{-1}=\frac16\begin{bmatrix}14&-6\\-6&3\end{bmatrix}.
\]

Next compute \(\mathbf X'\mathbf y\):

\[
\mathbf X'\mathbf y
=\begin{bmatrix}1&1&1\\1&2&3\end{bmatrix}
\begin{bmatrix}2\\3\\5\end{bmatrix}
=\begin{bmatrix}2+3+5\\(1)(2)+(2)(3)+(3)(5)\end{bmatrix}
=\boxed{\begin{bmatrix}10\\23\end{bmatrix}}.
\]

Now multiply the inverse and this vector:

\[
\begin{aligned}
\widehat{\boldsymbol\beta}
&=\frac16\begin{bmatrix}14&-6\\-6&3\end{bmatrix}
\begin{bmatrix}10\\23\end{bmatrix}\\
&=\frac16\begin{bmatrix}(14)(10)+(-6)(23)\\(-6)(10)+(3)(23)\end{bmatrix}\\
&=\frac16\begin{bmatrix}140-138\\-60+69\end{bmatrix}\\
&=\begin{bmatrix}2/6\\9/6\end{bmatrix}
=\boxed{\begin{bmatrix}1/3\\3/2\end{bmatrix}}.
\end{aligned}
\]

So the fitted line is

\[
\boxed{\widehat y=\frac13+\frac32 x}.
\]

For \(x=1,2,3\), the predictions are respectively \(11/6\approx1.8333\), \(10/3\approx3.3333\), and \(29/6\approx4.8333\). The model need not pass through every observation, because least squares minimizes the total squared prediction errors.

**Link to linear dependence:** If two columns of \(\mathbf X\) were duplicates, \(\mathbf X'\mathbf X\) would be singular and this particular inverse formula would fail. Software may use other methods in such cases, but the conceptual obstacle is the same dependence studied in Chapter 6.

### 22.4 R calculation

```r
X <- cbind(1, c(1, 2, 3))
y <- c(2, 3, 5)

XtX <- crossprod(X)
Xty <- crossprod(X, y)

beta <- solve(XtX, Xty)
beta                           # intercept 0.3333333; slope 1.5
X %*% beta                     # fitted values

# A familiar regression function, for comparison:
coef(lm(y ~ c(1, 2, 3)))
```

The last line provides a software comparison, not an operation required by Lecture 02. For a stable computational implementation, direct least-squares solvers are generally preferable to forming an explicit inverse.

### 22.5 Multivariate normal distributions: a first conceptual view

A **multivariate distribution** describes how several random quantities vary *together*. A **mean vector** contains their average or expected values, and a **covariance matrix** describes their variation and co-variation.

In two variables, imagine a cloud of scatterplot points. If the variables are correlated, the cloud may form a tilted ellipse rather than a circle. The covariance matrix's **eigenvectors** give its principal directions, and its **eigenvalues** determine the amount of variation along those directions.

For a \(p\)-dimensional multivariate normal distribution with mean \(\boldsymbol\mu\) and **positive-definite** covariance \(\boldsymbol\Sigma\), its density takes the form

\[
f(\mathbf x)=
\frac{1}{(2\pi)^{p/2}\det(\boldsymbol\Sigma)^{1/2}}
\exp\left[-\frac12
(\mathbf x-\boldsymbol\mu)'\boldsymbol\Sigma^{-1}
(\mathbf x-\boldsymbol\mu)\right].
\]

You are **not** expected to derive this new formula from Lecture 02. It is shown to reveal why each operation is learned:

- \(\mathbf x-\boldsymbol\mu\) subtracts the mean vector, measuring displacement from the center.
- \(\boldsymbol\Sigma^{-1}\) is an inverse covariance matrix, adjusting for scale and relationships among variables.
- \((\mathbf x-\boldsymbol\mu)'\boldsymbol\Sigma^{-1}(\mathbf x-\boldsymbol\mu)\) is a **quadratic form** and one scalar.
- \(\det(\boldsymbol\Sigma)\) helps determine the overall spread or volume scale.
- \(\pi\) is the mathematical constant approximately 3.14159, and \(\exp(t)=e^t\) uses the exponential function.
- \(p\) is the number of variables, and \(\boldsymbol\Sigma\) is a \(p\times p\) matrix.

The density formula assumes an invertible covariance matrix. A singular covariance matrix, such as the perfectly correlated example in Chapter 20, needs different mathematical treatment.

### 22.6 Mahalanobis distance: a covariance-aware distance

A useful statistical extension of ordinary Euclidean distance is

\[
\boxed{d_M(\mathbf x,\boldsymbol\mu)
=\sqrt{(\mathbf x-\boldsymbol\mu)'\boldsymbol\Sigma^{-1}
(\mathbf x-\boldsymbol\mu)}}.
\]

For this definition, take \(\boldsymbol\Sigma\) to be symmetric positive definite. It adjusts the distance for different variable spreads and their relationships.

**Additional simple example:** Suppose

\[
\mathbf x-\boldsymbol\mu=\begin{bmatrix}2\\1\end{bmatrix},
\qquad\boldsymbol\Sigma=\begin{bmatrix}4&0\\0&1\end{bmatrix},
\qquad\boldsymbol\Sigma^{-1}=\begin{bmatrix}1/4&0\\0&1\end{bmatrix}.
\]

Then

\[
\begin{aligned}
d_M^2
&=\begin{bmatrix}2&1\end{bmatrix}
\begin{bmatrix}1/4&0\\0&1\end{bmatrix}
\begin{bmatrix}2\\1\end{bmatrix}\\
&=\begin{bmatrix}2&1\end{bmatrix}
\begin{bmatrix}2/4\\1\end{bmatrix}\\
&=2(1/2)+1(1)\\
&=2,
\end{aligned}
\]

so \(d_M=\sqrt2\). By contrast, the ordinary Euclidean distance is \(\sqrt{2^2+1^2}=\sqrt5\). The first variable has variance 4, so a difference of 2 in it is less surprising than it would be on a variable with variance 1.

This demonstrates how the inverse covariance matrix turns elementary algebra into a practical measure of multivariate unusualness.

---

# Part VIII. Practice, verification and revision

## 23. A reliable method for every calculation

Students often try to remember dozens of unrelated tricks. A more effective approach is to use the same five questions every time:

1. **What type of object do I have?** Is it a scalar, vector, or matrix?
2. **What are its dimensions?** Write them beside each object, such as \(2\times3\).
3. **Which operation is requested?** Addition, scalar multiplication, dot product, transpose, matrix product, determinant, inverse, or eigen-analysis?
4. **What exact arithmetic is required?** Elementwise operations use corresponding cells; a matrix product uses *row by column*; a determinant uses its own formula.
5. **How can I check the result?** Predict its shape, substitute it back, multiply an inverse to get the identity, check that a normalized vector has squared length 1, or test an eigenpair with \(\mathbf A\mathbf x=\lambda\mathbf x\).

### 23.1 A compact operation decision chart

| If the question says… | Check first | Perform | Result |
|---|---|---|---|
| “Multiply vector by 3” | One scalar and one vector | Multiply **each** component | Vector, same shape |
| “Add two vectors” | Same length and orientation | Add corresponding components | Vector, same shape |
| “Dot product of x and y” | Same number of entries | Multiply matching pairs, then **sum** | Scalar |
| “Normalize x” | \(\mathbf x\ne\mathbf0\) | Divide by \(\sqrt{\mathbf x'\mathbf x}\) | Unit vector |
| “Transpose matrix A” | Note original shape | Swap rows and columns | Dimensions reversed |
| “Add two matrices” | Identical dimensions | Add corresponding cells | Same-sized matrix |
| “Multiply AB” | Inner dimensions match | Row-by-column inner products | Outer dimensions |
| “Find determinant” | Square matrix | Determinant formula or R | Scalar |
| “Find inverse” | Square matrix, nonzero determinant | Inverse formula or solver | Same-sized matrix |
| “Find eigenvalues” | Square matrix | Solve \(\det(\mathbf A-\lambda\mathbf I)=0\) | Scalars |
| “Find eigenvectors” | Known eigenvalues | Solve \((\mathbf A-\lambda\mathbf I)\mathbf x=0\), nonzero \(\mathbf x\) | Vectors |
| “Perform spectral decomposition” | **Real symmetric** matrix | Orthonormal eigenvectors and eigenvalues | \(\mathbf Q\boldsymbol\Lambda\mathbf Q'\) |

### 23.2 Common confusions, directly compared

**Transpose versus inverse:** \(\mathbf A'\) repositions entries; \(\mathbf A^{-1}\) undoes a transformation. They are equal **only for an orthogonal matrix**, not in general.

**Inner product versus componentwise product:** \(\mathbf x'\mathbf y\) returns one number; in R `x * y` returns matching products as a vector.

**Matrix multiplication versus elementwise multiplication:** \(\mathbf A\mathbf B\) combines rows and columns; \(\mathbf A\odot\mathbf B\) matches cells one for one.

**Rank versus number of columns:** A matrix may have many columns but far fewer independent directions.

**Zero determinant versus zero matrix:** \(\det(\mathbf A)=0\) does **not** require every entry of \(\mathbf A\) to be zero. It means the square matrix is rank deficient.

**Orthogonal vectors versus orthogonal matrix:** Two nonzero orthogonal vectors are perpendicular. An orthogonal matrix additionally has **unit-length** rows and columns forming an entire orthonormal system.

**Eigenvalue versus eigenvector:** The eigenvalue is a scalar telling how a special direction is stretched, shrunk, or reversed. The eigenvector is the direction itself.

**Positive definite versus nonnegative definite:** Strict inequality for every nonzero vector versus allowing zero for some nonzero vector. For real symmetric matrices, their eigenvalue requirements are respectively \(>0\) and \(\ge0\).

---

## 24. Exercises: start elementary, finish at university level

These questions are **new teaching exercises** created for this book. They are not questions reproduced from the lecturer. Detailed worked solutions appear immediately afterward. Try each question on paper, writing the dimensions before starting.

### Level A: understand notation and vectors

**Exercise 1.** Let \(\mathbf A=\begin{bmatrix}4&-1&7\\2&5&0\end{bmatrix}\). State its dimensions, \(a_{12}\), \(a_{23}\), and the dimensions of \(\mathbf A'\).

**Exercise 2.** For \(\mathbf x=(2,-1,3)'\), calculate \(-3\mathbf x\).

**Exercise 3.** For \(\mathbf x=(2,-1,3)'\) and \(\mathbf y=(4,5,-2)'\), find \(\mathbf x+\mathbf y\) and \(\mathbf x-\mathbf y\).

**Exercise 4.** Compute \(\mathbf x'\mathbf y\) for the vectors in Exercise 3. Is the answer a vector or a scalar?

**Exercise 5.** Find the length of \(\mathbf v=(6,8)'\), then normalize it. Verify the answer.

**Exercise 6.** Decide whether \(\mathbf u=(1,3)'\) and \(\mathbf v=(2,6)'\) are linearly independent. Explain without solving simultaneous equations.

**Exercise 7.** Are \((1,0)'\) and \((1,1)'\) linearly independent? Are they orthogonal?

**Exercise 8.** Find a nonzero vector perpendicular to \((1,2)'\), and prove it using a dot product.

### Level B: matrices and dimension compatibility

**Exercise 9.** Transpose \(\mathbf A=\begin{bmatrix}1&4&-2\\3&0&5\end{bmatrix}\). Identify the new dimensions.

**Exercise 10.** Add \(\begin{bmatrix}1&2\\-1&3\end{bmatrix}\) and \(\begin{bmatrix}4&-2\\5&1\end{bmatrix}\).

**Exercise 11.** State whether these products are defined and give the answer shape if they are: (a) \((2\times4)(4\times3)\); (b) \((3\times2)(4\times3)\); (c) \((1\times5)(5\times1)\); (d) \((3\times1)(1\times4)\).

**Exercise 12.** Calculate every cell of

\[
\begin{bmatrix}1&2&3\\4&0&-1\end{bmatrix}
\begin{bmatrix}2&1\\0&3\\-1&4\end{bmatrix}.
\]

**Exercise 13.** Using \(\mathbf A=\begin{bmatrix}1&2\\3&4\end{bmatrix}\) and \(\mathbf B=\begin{bmatrix}0&1\\1&0\end{bmatrix}\), compute both \(\mathbf A\mathbf B\) and \(\mathbf B\mathbf A\). Are they equal?

**Exercise 14.** Write \(\operatorname{diag}(4,-2,7)\), state whether it is symmetric, and find its inverse.

### Level C: determinants, rank, inverses and eigenvalues

**Exercise 15.** Find the trace and determinant of \(\begin{bmatrix}2&1&0\\0&3&1\\0&0&4\end{bmatrix}\). Is it singular?

**Exercise 16.** For \(\mathbf C=\begin{bmatrix}1&2\\2&4\end{bmatrix}\), find the trace, determinant, rank, and whether an inverse exists.

**Exercise 17.** Find the inverse of \(\mathbf A=\begin{bmatrix}3&1\\2&1\end{bmatrix}\) and verify by multiplying back.

**Exercise 18.** Use the inverse from Exercise 17 to solve \(3u+v=7\) and \(2u+v=5\).

**Exercise 19.** Verify that \(\mathbf Q=\frac1{\sqrt2}\begin{bmatrix}1&-1\\1&1\end{bmatrix}\) is orthogonal.

**Exercise 20.** Find the eigenvalues of \(\mathbf A=\begin{bmatrix}4&1\\1&4\end{bmatrix}\) and give an eigenvector for each.

**Exercise 21.** Normalize the two eigenvectors from Exercise 20, then give the diagonal eigenvalue matrix for a spectral decomposition.

**Exercise 22.** Is \(\mathbf S=\begin{bmatrix}1&1\\1&1\end{bmatrix}\) positive definite, positive semidefinite, both, or neither? Explain with eigenvalues or a quadratic form.

### Level D: statistics and R

**Exercise 23.** For observations \((1,2),(2,4),(3,6)\), write the \(3\times2\) data matrix, its centered matrix, and its sample covariance matrix.

**Exercise 24.** A covariance matrix is \(\mathbf S=\operatorname{diag}(4,1)\). What are the eigenvalues, their principal directions, and the proportion of total variance captured by the first principal component?

**Exercise 25.** A student writes: “If \(\mathbf A\mathbf x=5\mathbf x\), then \(\mathbf A(3\mathbf x)=(5/3)(3\mathbf x)\).” Explain the error and give the correct identity.

**Exercise 26.** In R, what is the output of `matrix(1:6, nrow = 2, byrow = TRUE)`? What are its dimensions and what does `t(...)` do to them?

**Exercise 27.** Explain how the mathematical operations differ in R: `x * y`, `crossprod(x,y)`, `A * B`, `A %*% B`.

**Exercise 28.** Why is \(\mathbf C'\mathbf C\) always symmetric and nonnegative definite for a real matrix \(\mathbf C\)? Answer using transpose and vector length.

---

## 25. Fully worked exercise solutions

### Solution 1. Dimensions and individual addresses

There are 2 rows and 3 columns, so \(\mathbf A\) is \(2\times3\). The first subscript is the row: \(a_{12}=-1\), \(a_{23}=0\). Transposition reverses dimensions, so \(\mathbf A'\) is \(3\times2\).

### Solution 2. Multiply by a negative scalar

\[
-3\mathbf x=-3\begin{bmatrix}2\\-1\\3\end{bmatrix}
=\begin{bmatrix}-3(2)\\-3(-1)\\-3(3)\end{bmatrix}
=\boxed{\begin{bmatrix}-6\\3\\-9\end{bmatrix}}.
\]

Notice the middle entry becomes positive because the product of two negative numbers is positive.

### Solution 3. Add and subtract entrywise

\[
\mathbf x+\mathbf y
=\begin{bmatrix}2+4\\-1+5\\3+(-2)\end{bmatrix}
=\boxed{\begin{bmatrix}6\\4\\1\end{bmatrix}}.
\]

\[
\mathbf x-\mathbf y
=\begin{bmatrix}2-4\\-1-5\\3-(-2)\end{bmatrix}
=\boxed{\begin{bmatrix}-2\\-6\\5\end{bmatrix}}.
\]

### Solution 4. Inner product

\[
\mathbf x'\mathbf y
=(2)(4)+(-1)(5)+(3)(-2)
=8-5-6=\boxed{-3}.
\]

The result is **one scalar**, not a three-entry vector. The negative sign here is consistent with an angle greater than 90 degrees between two nonzero vectors.

### Solution 5. Length and unit vector

\[
\lVert\mathbf v\rVert_2=\sqrt{6^2+8^2}
=\sqrt{36+64}=\boxed{10}.
\]

Normalize by dividing every entry by 10:

\[
\mathbf z=\begin{bmatrix}6/10\\8/10\end{bmatrix}
=\boxed{\begin{bmatrix}0.6\\0.8\end{bmatrix}}.
\]

Verify: \(\sqrt{0.6^2+0.8^2}=\sqrt{0.36+0.64}=1\).

### Solution 6. Dependence by scalar multiplication

\[
\mathbf v=\begin{bmatrix}2\\6\end{bmatrix}
=2\begin{bmatrix}1\\3\end{bmatrix}=2\mathbf u.
\]

The second vector is merely a scaled copy of the first, so the vectors are **linearly dependent**.

### Solution 7. Independence is not orthogonality

The vectors \((1,0)'\) and \((1,1)'\) are **not** scalar multiples, so they are **independent**. But their inner product is \((1)(1)+(0)(1)=1\ne0\), so they are **not orthogonal**.

### Solution 8. A perpendicular vector

Choose \(\mathbf v=(2,-1)'\). Then

\[
\begin{bmatrix}1&2\end{bmatrix}\begin{bmatrix}2\\-1\end{bmatrix}
=1(2)+2(-1)=2-2=0.
\]

Therefore \((2,-1)'\) is perpendicular to \((1,2)'\). Other nonzero scalar multiples of it also work.

### Solution 9. Transpose

\[
\begin{bmatrix}1&4&-2\\3&0&5\end{bmatrix}'
=\boxed{\begin{bmatrix}1&3\\4&0\\-2&5\end{bmatrix}}.
\]

The original is \(2\times3\); its transpose is \(3\times2\).

### Solution 10. Add matrices

\[
\begin{bmatrix}1+4&2+(-2)\\-1+5&3+1\end{bmatrix}
=\boxed{\begin{bmatrix}5&0\\4&4\end{bmatrix}}.
\]

Both inputs have shape \(2\times2\), so addition is valid.

### Solution 11. Dimension tests

(a) \((2\times\mathbf4)(\mathbf4\times3)\) is **valid** and produces \(2\times3\). (b) \((3\times\mathbf2)(\mathbf4\times3)\) is **invalid** because \(2\ne4\). (c) \((1\times\mathbf5)(\mathbf5\times1)\) is **valid**, with a \(1\times1\) result. (d) \((3\times\mathbf1)(\mathbf1\times4)\) is **valid**, with a \(3\times4\) result.

### Solution 12. Multiply row by column, four times

The dimensions are \((2\times3)(3\times2)\), so the answer must be \(2\times2\).

\[
\begin{aligned}
c_{11}&=1(2)+2(0)+3(-1)=2+0-3=-1,\\
c_{12}&=1(1)+2(3)+3(4)=1+6+12=19,\\
c_{21}&=4(2)+0(0)+(-1)(-1)=8+0+1=9,\\
c_{22}&=4(1)+0(3)+(-1)(4)=4+0-4=0.
\end{aligned}
\]

Thus

\[
\boxed{\begin{bmatrix}-1&19\\9&0\end{bmatrix}}.
\]

### Solution 13. Matrix multiplication does not commute

\[
\mathbf A\mathbf B
=\begin{bmatrix}
1(0)+2(1)&1(1)+2(0)\\
3(0)+4(1)&3(1)+4(0)
\end{bmatrix}
=\boxed{\begin{bmatrix}2&1\\4&3\end{bmatrix}}.
\]

\[
\mathbf B\mathbf A
=\begin{bmatrix}
0(1)+1(3)&0(2)+1(4)\\
1(1)+0(3)&1(2)+0(4)
\end{bmatrix}
=\boxed{\begin{bmatrix}3&4\\1&2\end{bmatrix}}.
\]

Both are valid \(2\times2\) products, but they are **not equal**. Multiplying by this particular \(\mathbf B\) on the right swaps A's **columns**; multiplying it on the left swaps A's **rows**.

### Solution 14. Diagonal matrix and its inverse

\[
\mathbf D=\boxed{\begin{bmatrix}4&0&0\\0&-2&0\\0&0&7\end{bmatrix}}.
\]

It is square and symmetric because all off-diagonal entries are zero. None of the diagonal entries is zero, so the inverse exists:

\[
\boxed{\mathbf D^{-1}=\begin{bmatrix}1/4&0&0\\0&-1/2&0\\0&0&1/7\end{bmatrix}}.
\]

### Solution 15. Trace and determinant of a triangular matrix

The trace is the sum of diagonal entries:

\[
\operatorname{tr}(\mathbf A)=2+3+4=\boxed{9}.
\]

For the determinant, expand along the first column, which contains two zeros:

\[
\det(\mathbf A)
=2\det\begin{bmatrix}3&1\\0&4\end{bmatrix}
=2[(3)(4)-(1)(0)]
=2(12)=\boxed{24}.
\]

This matrix is **nonsingular** because its determinant is not zero. More generally, the determinant of a triangular matrix is the product of its diagonal entries.

### Solution 16. Trace, determinant, rank, inverse

\[
\operatorname{tr}(\mathbf C)=1+4=\boxed{5}.
\]

\[
\det(\mathbf C)=1(4)-2(2)=\boxed{0}.
\]

Row 2 is twice row 1, so rank is **1**. Since determinant is zero, \(\mathbf C\) is **singular** and has **no inverse**.

### Solution 17. A \(2\times2\) inverse

For \(\mathbf A=\begin{bmatrix}3&1\\2&1\end{bmatrix}\), determinant is \(3(1)-1(2)=1\). The inverse formula gives

\[
\boxed{\mathbf A^{-1}=\begin{bmatrix}1&-1\\-2&3\end{bmatrix}}.
\]

Verify:

\[
\begin{aligned}
\mathbf A\mathbf A^{-1}
&=\begin{bmatrix}3&1\\2&1\end{bmatrix}
\begin{bmatrix}1&-1\\-2&3\end{bmatrix}\\
&=\begin{bmatrix}3-2&-3+3\\2-2&-2+3\end{bmatrix}
=\boxed{\begin{bmatrix}1&0\\0&1\end{bmatrix}}.
\end{aligned}
\]

### Solution 18. Solve a two-equation system

The equations are \(\mathbf A\mathbf x=\mathbf b\) with \(\mathbf b=(7,5)'\). Therefore

\[
\begin{aligned}
\mathbf x
&=\mathbf A^{-1}\mathbf b
=\begin{bmatrix}1&-1\\-2&3\end{bmatrix}
\begin{bmatrix}7\\5\end{bmatrix}\\
&=\begin{bmatrix}7-5\\-14+15\end{bmatrix}
=\boxed{\begin{bmatrix}2\\1\end{bmatrix}}.
\end{aligned}
\]

So \(u=2,\ v=1\). Check: \(3(2)+1=7\) and \(2(2)+1=5\).

### Solution 19. Verify orthogonality of a matrix

\[
\mathbf Q'=\frac1{\sqrt2}\begin{bmatrix}1&1\\-1&1\end{bmatrix}.
\]

Hence

\[
\begin{aligned}
\mathbf Q'\mathbf Q
&=\frac12\begin{bmatrix}1&1\\-1&1\end{bmatrix}
\begin{bmatrix}1&-1\\1&1\end{bmatrix}\\
&=\frac12\begin{bmatrix}2&0\\0&2\end{bmatrix}
=\boxed{\mathbf I_2}.
\end{aligned}
\]

The columns are each of unit length and perpendicular. Therefore \(\mathbf Q\) is an **orthogonal matrix**.

### Solution 20. Eigenvalues and eigenvectors

\[
\det(\mathbf A-\lambda\mathbf I)
=(4-\lambda)^2-1
=\lambda^2-8\lambda+15
=(\lambda-5)(\lambda-3).
\]

Thus the eigenvalues are \(\boxed{5\text{ and }3}\). For \(\lambda=5\), an eigenvector is \(\mathbf v_1=(1,1)'\), because \(\mathbf A\mathbf v_1=(5,5)'=5\mathbf v_1\). For \(\lambda=3\), choose \(\mathbf v_2=(1,-1)'\), because \(\mathbf A\mathbf v_2=(3,-3)'=3\mathbf v_2\).

Check: trace is \(4+4=8=5+3\), determinant is \(16-1=15=5\times3\).

### Solution 21. Normalize eigenvectors and assemble eigenvalue matrix

Both \((1,1)'\) and \((1,-1)'\) have length \(\sqrt2\). So their normalized forms are

\[
\mathbf q_1=\frac1{\sqrt2}\begin{bmatrix}1\\1\end{bmatrix},
\qquad
\mathbf q_2=\frac1{\sqrt2}\begin{bmatrix}1\\-1\end{bmatrix}.
\]

Place the eigenvalues in the same column order:

\[
\boxed{\boldsymbol\Lambda=\begin{bmatrix}5&0\\0&3\end{bmatrix}}.
\]

The eigenvector matrix is \(\mathbf Q=\frac1{\sqrt2}\begin{bmatrix}1&1\\1&-1\end{bmatrix}\). Since \(\mathbf A\) is symmetric, \(\mathbf A=\mathbf Q\boldsymbol\Lambda\mathbf Q'\).

### Solution 22. Semidefinite but not positive definite

For \(\mathbf x=(u,v)'\),

\[
\mathbf x'\mathbf S\mathbf x=(u+v)^2\ge0.
\]

However, choose the nonzero vector \(\mathbf x=(1,-1)'\). Then \((u+v)^2=0\). Thus the matrix is **positive semidefinite but not positive definite**. Its eigenvalues are 2 and 0, also proving this result for a symmetric matrix.

### Solution 23. Sample covariance from three observations

\[
\mathbf X=\begin{bmatrix}1&2\\2&4\\3&6\end{bmatrix}.
\]

Means are \((2,4)\), so

\[
\mathbf C=\begin{bmatrix}-1&-2\\0&0\\1&2\end{bmatrix}.
\]

Then

\[
\mathbf S=\frac1{3-1}\mathbf C'\mathbf C
=\frac12\begin{bmatrix}2&4\\4&8\end{bmatrix}
=\boxed{\begin{bmatrix}1&2\\2&4\end{bmatrix}}.
\]

This matrix is symmetric and singular because the second variable is exactly twice the first.

### Solution 24. Two-dimensional PCA

A diagonal matrix has eigenvalues equal to its diagonal entries, so \(\lambda_1=4\) and \(\lambda_2=1\). Corresponding unit eigenvectors are \(\mathbf e_1=(1,0)'\) and \(\mathbf e_2=(0,1)'\). Total variance is \(4+1=5\); the first direction explains

\[
\frac{4}{5}\times100\%=\boxed{80\%}
\]

of the total variance. There is no axis rotation in this example because the covariance matrix is already diagonal.

### Solution 25. Fixing a false eigenvalue rule

The student has incorrectly divided the eigenvalue by 3. From \(\mathbf A\mathbf x=5\mathbf x\),

\[
\boxed{\mathbf A(3\mathbf x)=3(\mathbf A\mathbf x)
=3(5\mathbf x)=5(3\mathbf x).}
\]

So \(3\mathbf x\) is an eigenvector with **eigenvalue 5**, not \(5/3\).

### Solution 26. Rowwise matrix construction in R

`matrix(1:6, nrow = 2, byrow = TRUE)` yields

\[
\mathbf A=\begin{bmatrix}1&2&3\\4&5&6\end{bmatrix}_{2\times3}.
\]

The transpose is

\[
\mathbf A'=\begin{bmatrix}1&4\\2&5\\3&6\end{bmatrix}_{3\times2}.
\]

`byrow = TRUE` chooses the order in which the original matrix is filled; `t(A)` transposes a matrix after construction.

### Solution 27. Distinguish four R operations

For equal-length vectors, `x * y` multiplies matching entries and returns a **vector**. `crossprod(x,y)` computes the **sum of products**, returning a **one-cell matrix** for vector inputs. For equally shaped matrices, `A * B` multiplies matching cells and returns a **matrix of the same shape**. `A %*% B` performs **row-by-column matrix multiplication**, requiring the first matrix's column count to equal the second matrix's row count; the answer's dimensions are the outer dimensions.

### Solution 28. Why \(\mathbf C'\mathbf C\) is positive semidefinite

First, it is symmetric:

\[
(\mathbf C'\mathbf C)'=\mathbf C'\mathbf C
\]

because \((\mathbf A\mathbf B)'=\mathbf B'\mathbf A'\) and \((\mathbf C')'=\mathbf C\). Next, for every real vector \(\mathbf v\) of compatible dimension,

\[
\mathbf v'(\mathbf C'\mathbf C)\mathbf v
=(\mathbf C\mathbf v)'(\mathbf C\mathbf v)
=\lVert\mathbf C\mathbf v\rVert_2^2\ge0.
\]

A squared Euclidean length can never be negative, so \(\mathbf C'\mathbf C\) is **nonnegative definite**. It is strictly positive definite when \(\mathbf C\) has independent columns.

---

## 26. Formula reference with essential conditions

This reference is designed for **use after understanding**, not as a replacement for the worked chapters.

| Topic | Formula | Validity condition or interpretation |
|---|---|---|
| Vector scalar multiplication | \((c\mathbf x)_i=cx_i\) | Scalar \(c\), vector \(\mathbf x\) |
| Vector addition | \((\mathbf x+\mathbf y)_i=x_i+y_i\) | Matching vector dimensions |
| Vector inner product | \(\mathbf x'\mathbf y=\sum_i x_i y_i\) | Equal number of components |
| Orthogonality | \(\mathbf x'\mathbf y=0\) | Zero inner product |
| Independence | \(\sum_i c_i\mathbf x_i=\mathbf0\Rightarrow c_i=0\) for all \(i\) | Only trivial coefficient solution |
| Euclidean length | \(\lVert\mathbf x\rVert_2=\sqrt{\mathbf x'\mathbf x}\) | Any real vector |
| Normalization | \(\mathbf x/\lVert\mathbf x\rVert_2\) | \(\mathbf x\ne\mathbf0\) |
| Transpose | \((\mathbf A')_{ij}=a_{ji}\) | \(n\times m\to m\times n\) |
| Symmetry | \(\mathbf A'=\mathbf A\) | Square matrix |
| Matrix addition | \((\mathbf A+\mathbf B)_{ij}=a_{ij}+b_{ij}\) | Same shape |
| Matrix product | \((\mathbf A\mathbf B)_{ij}=\sum_k a_{ik}b_{kj}\) | \((n\times m)(m\times p)\to n\times p\) |
| Identity | \(\mathbf I_n\mathbf A=\mathbf A\) | \(\mathbf A\) has \(n\) rows |
| Trace | \(\operatorname{tr}(\mathbf A)=\sum_i a_{ii}\) | Square matrix |
| \(2\times2\) determinant | \(ad-bc\) | \(\begin{bmatrix}a&b\\c&d\end{bmatrix}\) |
| \(3\times3\) determinant | \(a(ei-fh)-b(di-fg)+c(dh-eg)\) | \(\begin{bmatrix}a&b&c\\d&e&f\\g&h&i\end{bmatrix}\) |
| Inverse property | \(\mathbf A^{-1}\mathbf A=\mathbf I\) | Square, \(\det(\mathbf A)\ne0\) |
| \(2\times2\) inverse | \(\frac1{ad-bc}\begin{bmatrix}d&-b\\-c&a\end{bmatrix}\) | Determinant nonzero |
| Inverse determinant | \(\det(\mathbf A^{-1})=1/\det(\mathbf A)\) | Invertible square matrix |
| Orthogonal matrix | \(\mathbf Q^{-1}=\mathbf Q'\) | \(\mathbf Q'\mathbf Q=\mathbf I\) |
| Eigen-equation | \(\mathbf A\mathbf x=\lambda\mathbf x\) | Square \(\mathbf A\), \(\mathbf x\ne\mathbf0\) |
| Characteristic equation | \(\det(\mathbf A-\lambda\mathbf I)=0\) | Eigenvalues of square matrix |
| Eigenvalue sum/product | \(\sum_i\lambda_i=\operatorname{tr}(\mathbf A)\), \(\prod_i\lambda_i=\det(\mathbf A)\) | Count algebraic multiplicities |
| Positive definite | \(\mathbf x'\mathbf A\mathbf x>0\) for nonzero \(\mathbf x\) | For real symmetric \(\mathbf A\), all eigenvalues \(>0\) |
| Positive semidefinite | \(\mathbf x'\mathbf A\mathbf x\ge0\) | For real symmetric \(\mathbf A\), all eigenvalues \(\ge0\) |
| Spectral decomposition | \(\mathbf A=\mathbf Q\boldsymbol\Lambda\mathbf Q'\) | **Real symmetric** \(\mathbf A\) |
| Sample covariance | \(\mathbf S=\frac1{n-1}\mathbf C'\mathbf C\) | Centered \(n\times p\) data, \(n\ge2\) |
| OLS coefficients | \((\mathbf X'\mathbf X)^{-1}\mathbf X'\mathbf y\) | \(\mathbf X\) has full column rank |

### 26.1 Five ways to verify a numerical answer

1. **Dimension verification:** Write shapes beside the factors, confirm compatibility, and check the output's shape.
2. **Identity verification:** If you calculated \(\mathbf A^{-1}\), multiply it by \(\mathbf A\) and check for the identity.
3. **Norm verification:** If you normalized \(\mathbf x\), calculate \(\mathbf z'\mathbf z\) and check for 1.
4. **Eigenpair verification:** For each alleged eigenvector, calculate both \(\mathbf A\mathbf x\) and \(\lambda\mathbf x\); they must agree.
5. **Spectral verification:** For real symmetric matrices, reconstruct \(\mathbf Q\boldsymbol\Lambda\mathbf Q'\) and compare it to \(\mathbf A\).

---

## 27. Page-by-page source coverage audit

This table is an audit map from the **entire supplied 14-page PDF** to the book's teaching sections. It also indicates when extra explanatory material was added. All listed page numbers are source PDF page numbers.

| Source page | Meaningful original content checked | Coverage in this teaching book | Notes |
|---|---|---|---|
| **1** | Motivation for matrix notation; scalar and vector definitions; \(\mathbf x\in\mathbb R^n\); column notation and transpose; vector equality, scalar multiplication, addition and matching lengths | §§1–4 | Full notation explanation, vector dimensions and additional worked examples |
| **2** | **Figure 1(a)** scalar scaling, **Figure 1(b)** parallelogram addition; zero-vector identity; subtraction; inner product formula and compatibility; start of \(\mathbf x=(1,5,2)'\), \(\mathbf y=(3,-1,6)'\) | §§3–5 | Both images explained in words and text sketches; example carried into page 3 material |
| **3** | Lecture's vector transpose, \(3\mathbf x\), sum, inner product \(=10\); orthogonality and zero vector; dependence/independence condition; three-vector test setup | §§4–6, 19 | Numerical outputs reproduced; zero-vector caveat identified explicitly |
| **4** | Three-vector dependence-test equations and zero-only solution; Euclidean length; **Figure 2** triangle; east/north example \(\sqrt5\); normalization; introduction to matrices | §§6–8 | Full simultaneous-equation solution and norm checks |
| **5** | General \(n\times m\) matrix, subscripts, transpose and dimension reversal, square/symmetric matrices, scalar multiplication, matrix addition, matrix product \((n\times m)(m\times p)\), \(z_{ij}\) as row–column product | §§8–11 | Full index explanation and general multiplication formula |
| **6** | Exact \(4\times3\) \(\mathbf X\) and \(3\times2\) \(\mathbf Y\) example; \(3\mathbf X\), \(\mathbf Y'\), all eight \(\mathbf X\mathbf Y\) values; why \(\mathbf Y\mathbf X\) fails; diagonal and identity matrices and identity-size rule | §§11–12 | All eight multiplication cells computed explicitly |
| **7** | R vectors `seq`, `c`, `+`; `crossprod(x,y)=40`; `crossprod(x)=120`; normalized output and check \(=1\); R one-cell matrix observation | §§13.1–13.3 | Commands, values, and object-type distinction preserved |
| **8** | R `x*y` componentwise \((8,12,12,8)\), explicitly not vector cross product; `diag(1,4,4)` identity; `matrix(1,4,4)` ones; `matrix(1:16,4,4)` columnwise filling | §§13.4–13.6 | Detailed explanation of `*`, `crossprod`, `matrix`, `diag` |
| **9** | `t(A)` and rows, `diag(A)` giving \((1,6,11,16)\), creation of B using odd numbers and `byrow=TRUE`, exact A+B and A*B outputs, `%*%` introduction | §§13.6–13.10 | Exact A, B, addition and cellwise product outputs included |
| **10** | Full R `A %*% t(B)` output; advanced operations introduction; trace and determinant definitions; \(2\times2\) trace/determinant; \(3\times3\) determinant formula | §§13.11, 14 | All 16 source product values, stepwise calculations, trace and determinant examples |
| **11** | R random \(5\times5\) `rnorm(25)` matrix; `det(X)` example about −10.6611; rank, full rank, singularity; inversion definition and analogy; \(2\times2\) inverse formula and condition | §§14–16 | Random-source output carefully distinguished from reproducible examples |
| **12** | `solve(X)`, `X %*% solve(X)` approximately identity; rounding and floating-point effects; determinant-of-inverse identity | §16 | Scientific-notation example and interpretation of rounding errors |
| **13** | Inverse of diagonal matrix; orthogonal matrix equations and orthonormal rows/columns; \(\mathbf A\mathbf x=\lambda\mathbf x\), eigenvector intuition, scaling statement, trace/product eigenvalue rules and characteristic polynomial | §§16–19 | Corrects the printed eigenvector-scaling error, defines nonzero eigenvectors, and explains conditions for orthogonal eigenvectors |
| **14** | Characteristic roots; R `eigen(A)$values` and `$vectors` from earlier A; quadratic forms and definiteness; spectral decomposition \(\mathbf A=\mathbf X\boldsymbol\Lambda\mathbf X'\) | §§18–19 | R's nonsymmetric A identified; positive-definite eigenvalue qualification; full numerical spectral decomposition for an added symmetric example |

### 27.1 Coverage notes and editorial limits

- **Original lecture examples retained:** the page 2–3 vector pair, page 3–4 independent three-vector set, geometric Figures 1–2, page 6 \(\mathbf X\) and \(\mathbf Y\), pages 7–10 R vectors and matrices, pages 11–12 random determinant/inverse demonstration, and page 14 eigenvalue example.
- **Random numerical output:** the source's random \(5\times5\) matrix and the long printed inverse and approximate-identity matrices are represented by their generation commands, meaningful determinant result, mathematical interpretation, and numerical-error examples. Their 25+25+25 individual random entries are not rewritten as a fixed table because their individual values are incidental to the concept, and the source does not provide a reproducible random seed.
- **Explicit corrections:** §19 covers the incorrect eigenvector-scaling claim, zero-vector and orthogonality edge case, eigenvalue assumptions for positive definiteness, and the nonsymmetric-matrix versus symmetric spectral-decomposition distinction. These are editorial explanations, not statements attributed to the lecturer.
- **Supplementary teaching content:** statistical connections, additional numerical examples, matrix–vector prediction, proofs, extra R code, exercises, and solutions are additions designed to clarify the source. They are not claimed to have appeared in the original lecture.

### 27.2 Final concept map

```text
Single number (scalar)
      |
      v
Ordered collection (vector)
      |  \-- add / subtract / scale
      |  \-- transpose --> inner product --> orthogonality
      |  \-- self-inner product --> length --> normalization
      |  \-- linear combinations --> independence / dependence
      v
Rectangular array (matrix)
      |  \-- rows, columns, indexing, dimensions
      |  \-- transpose --> symmetric matrix
      |  \-- add, scale, multiply --> identity / diagonal matrix
      |  \-- R: matrix(), t(), crossprod(), *, %*%
      v
Square-matrix structure
      |  \-- trace / determinant / rank
      |  \-- nonsingular --> inverse --> solve a linear system
      |  \-- orthogonal --> transpose equals inverse
      v
Eigenvalues and eigenvectors
      |  \-- A x = lambda x
      |  \-- characteristic polynomial
      |  \-- trace = sum, determinant = product
      |  \-- positive definiteness (for symmetric matrices)
      |  \-- spectral decomposition Q Lambda Q'
      v
Multivariate analysis
      |  \-- centered data --> covariance matrix
      |  \-- covariance eigenvectors --> PCA directions
      |  \-- matrix equations --> regression predictions
      |  \-- covariance inverse/determinant --> multivariate distributions
```

**Where to finish:** If you can explain why a product's dimensions fit, work each row-by-column entry without skipping arithmetic, show why an inverse exists, solve \(\mathbf A\mathbf x=\lambda\mathbf x\) for a small symmetric matrix, and explain why \(\mathbf C'\mathbf C\) is a covariance-related nonnegative-definite matrix, then you have learned the central ideas of this lecture rather than merely memorized its notation.

---

*End of the DA2451 Lecture 02 matrix algebra teaching book. Source reviewed: all 14 pages of the provided `Lec2.pdf`. The original lecture's content and the added beginner-teaching explanations have been identified separately throughout.*
