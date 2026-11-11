# DA2451 Predicted Questions — Scope Exclusion Log (Task 4)

Generated automatically by `APP_DEV/scripts/ingest_predictions.js`. The four source files in `Predictions/` are read-only inputs and were **not modified**; each was verified by SHA-256 below.

**Rule applied (Master Plan §1, §Task 4):** predicted questions *dedicated* to Principal Components Regression (PCR), Regression Diagnostics, or Linear Discriminant Analysis (LDA) are omitted from the displayed collection and from the embedded data/search index. Questions that only *mention* those terms in passing are retained and listed in section 4 for your review.

## 1. Source integrity

| Source file | Generator | Type | SHA-256 (full) | Questions | Math (disp/inl) | Fences | Tables |
|---|---|---|---|---:|---:|---:|---:|
| `DA2451_ChatGPT_Predicted_MCQs.md` | ChatGPT | MCQ | `8d2a4ebf3d8307b4bf07e65e8491ca42faedca8d391e4892a14b374f8a98a3a4` | 40 | 2/134 | 0 | 0 |
| `DA2451_ChatGPT_Predicted_Essays.md` | ChatGPT | ESSAY | `ff7c7395bc447b30b32007b3ef6ab70fb94079b300a2ff948d038f052c6d7bf3` | 15 | 23/145 | 2 | 4 |
| `da2451_predicted_multiple_choice_questions.md` | Gemini | MCQ | `11b4d83a6184b2a679be4792af55db6f08284caa0490a63dc698425ae98fc763` | 40 | 0/377 | 0 | 0 |
| `da2451_predicted_essay_questions.md` | Gemini | ESSAY | `c3b66596d1a8e7f164a437cd708db8bfcbcb52cda5d7f515cbfec44dde16f47f` | 15 | 15/337 | 8 | 1 |

## 2. Counts

| Source | Parsed | Excluded | Displayed |
|---|---:|---:|---:|
| C-MCQ | 40 | 9 | 31 |
| C-ESS | 15 | 3 | 12 |
| G-MCQ | 40 | 10 | 30 |
| G-ESS | 15 | 3 | 12 |
| **All** | **110** | **25** | **85** (61 MCQs + 24 essays) |

## 3. Excluded questions (25)

| ID | Out-of-scope topic | Source file : line | Source topic (verbatim) | Reason |
|---|---|---|---|---|
| `C-MCQ-014` | PCR | `DA2451_ChatGPT_Predicted_MCQs.md`:122 | Topic 4 – Principal Components Regression | Source topic "Principal Components Regression"; stem is about which components a PCR model retains. |
| `C-MCQ-015` | PCR | `DA2451_ChatGPT_Predicted_MCQs.md`:130 | Topic 4 – Principal Components Regression | Source topic "Principal Components Regression"; compares OLS with PCR using all p components. |
| `C-MCQ-016` | Regression Diagnostics | `DA2451_ChatGPT_Predicted_MCQs.md`:140 | Topic 5 – Regression Diagnostics | Source topic "Regression Diagnostics"; leverage versus residual size of an observation. |
| `C-MCQ-017` | Regression Diagnostics | `DA2451_ChatGPT_Predicted_MCQs.md`:148 | Topic 5 – Regression Diagnostics | Source topic "Regression Diagnostics"; residual-versus-fitted plot with increasing spread. |
| `C-MCQ-018` | Regression Diagnostics | `DA2451_ChatGPT_Predicted_MCQs.md`:156 | Topic 5 – Regression Diagnostics | Source topic "Regression Diagnostics"; normal Q-Q plot of regression residuals. |
| `C-MCQ-023` | LDA | `DA2451_ChatGPT_Predicted_MCQs.md`:200 | Topic 7 – Linear Discriminant Analysis | Source topic "Linear Discriminant Analysis"; two-group LDA decision rule. |
| `C-MCQ-024` | LDA | `DA2451_ChatGPT_Predicted_MCQs.md`:208 | Topic 7 – Linear Discriminant Analysis | Source topic "Linear Discriminant Analysis"; classifier test-set error assessment inside the LDA topic. |
| `C-MCQ-025` | LDA | `DA2451_ChatGPT_Predicted_MCQs.md`:216 | Topic 7 – Linear Discriminant Analysis | Source topic "Linear Discriminant Analysis"; effect of prior probabilities in two-group LDA. |
| `C-MCQ-026` | LDA | `DA2451_ChatGPT_Predicted_MCQs.md`:224 | Topic 7 – Linear Discriminant Analysis | Source topic "Linear Discriminant Analysis"; LDA test-set accuracy and data leakage. |
| `C-ESS-004` | PCR | `DA2451_ChatGPT_Predicted_Essays.md`:98 | Section I – Data Representation, Matrix Reasoning and Principal Components — PCR, Validation and Interpretable Predictions | Title "PCR, Validation and Interpretable Predictions"; every part concerns principal components regression. |
| `C-ESS-005` | Regression Diagnostics | `DA2451_ChatGPT_Predicted_Essays.md`:133 | Section II – Regression Diagnostics, Factor Models and Classification — Auditing Regression Diagnostics Rather Than Deleting Cases | Title "Auditing Regression Diagnostics Rather Than Deleting Cases"; Cook's distance and influence. |
| `C-ESS-007` | LDA | `DA2451_ChatGPT_Predicted_Essays.md`:190 | Section II – Regression Diagnostics, Factor Models and Classification — LDA Priors, Business Losses and a Test Confusion Matrix | Title "LDA Priors, Business Losses and a Test Confusion Matrix"; every part concerns LDA. |
| `G-MCQ-018` | PCR | `da2451_predicted_multiple_choice_questions.md`:140 | Topic 4: Principal Components Regression (PCR) & Regression Diagnostics | Source topic "PCR & Regression Diagnostics"; OLS versus PCR retaining all 5 components. |
| `G-MCQ-019` | PCR | `da2451_predicted_multiple_choice_questions.md`:147 | Topic 4: Principal Components Regression (PCR) & Regression Diagnostics | Source topic "PCR & Regression Diagnostics"; coefficients implied by a 2-component PCR model. |
| `G-MCQ-020` | PCR | `da2451_predicted_multiple_choice_questions.md`:156 | Topic 4: Principal Components Regression (PCR) & Regression Diagnostics | Source topic "PCR & Regression Diagnostics"; discarding the last principal component in PCR. |
| `G-MCQ-021` | PCR | `da2451_predicted_multiple_choice_questions.md`:163 | Topic 4: Principal Components Regression (PCR) & Regression Diagnostics | Source topic "PCR & Regression Diagnostics"; evaluating a PCR model on train/test sets. |
| `G-MCQ-022` | Regression Diagnostics | `da2451_predicted_multiple_choice_questions.md`:170 | Topic 4: Principal Components Regression (PCR) & Regression Diagnostics | Source topic "PCR & Regression Diagnostics"; standardized residual and leverage of one observation. |
| `G-MCQ-023` | Regression Diagnostics | `da2451_predicted_multiple_choice_questions.md`:177 | Topic 4: Principal Components Regression (PCR) & Regression Diagnostics | Source topic "PCR & Regression Diagnostics"; residual-versus-fitted megaphone pattern. |
| `G-MCQ-033` | LDA | `da2451_predicted_multiple_choice_questions.md`:259 | Topic 7: Linear Discriminant Analysis (LDA) & Classification | Source topic "Linear Discriminant Analysis (LDA) & Classification"; LDA with g = 4 groups. |
| `G-MCQ-034` | LDA | `da2451_predicted_multiple_choice_questions.md`:266 | Topic 7: Linear Discriminant Analysis (LDA) & Classification | Source topic "Linear Discriminant Analysis (LDA) & Classification"; two-group LDA decision boundary. |
| `G-MCQ-035` | LDA | `da2451_predicted_multiple_choice_questions.md`:273 | Topic 7: Linear Discriminant Analysis (LDA) & Classification | Source topic "Linear Discriminant Analysis (LDA) & Classification"; LDA "Proportion of trace" output. |
| `G-MCQ-036` | LDA | `da2451_predicted_multiple_choice_questions.md`:280 | Topic 7: Linear Discriminant Analysis (LDA) & Classification | Source topic "Linear Discriminant Analysis (LDA) & Classification"; apparent error rate of an LDA model. |
| `G-ESS-006` | PCR | `da2451_predicted_essay_questions.md`:177 | Topic 6: Principal Components Regression (PCR) & Model Evaluation | Source topic "Principal Components Regression (PCR) & Model Evaluation". |
| `G-ESS-007` | Regression Diagnostics | `da2451_predicted_essay_questions.md`:234 | Topic 7: Regression Diagnostics & Influential Observations | Source topic "Regression Diagnostics & Influential Observations". |
| `G-ESS-013` | LDA | `da2451_predicted_essay_questions.md`:496 | Topic 13: Linear Discriminant Analysis (LDA) — Classification & Confusion Matrix | Source topic "Linear Discriminant Analysis (LDA) - Classification & Confusion Matrix". |

## 4. Retained questions that mention an out-of-scope term (5) — flagged for your review, NOT excluded

These are *not* dedicated to PCR / Regression Diagnostics / LDA (they belong to other topics and only mention a term, e.g. as one option or one sub-issue). They were kept to avoid over-removing in-scope content. Tell me if you want any of them removed.

| ID | Terms found |
|---|---|
| `C-MCQ-040` | lda |
| `C-ESS-014` | pcr, lda |
| `C-ESS-015` | lda |
| `G-MCQ-039` | discriminant analysis, lda |
| `G-ESS-015` | (implied, not named) Investigation 2 is a PCR-type regression; Investigation 3 asks for MANOVA plus a classification technique; Investigations 1 and 4 are in scope |
