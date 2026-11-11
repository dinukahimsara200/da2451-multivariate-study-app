# DA2451: Multivariate Methods in Business — Offline Study App

[![Offline First](https://img.shields.io/badge/Architecture-100%25%20Offline%20Single--File-blue.svg)](#)
[![Zero Network](https://img.shields.io/badge/Network%20Calls-Zero%20(Pure%20Local)-brightgreen.svg)](#)
[![KaTeX Math](https://img.shields.io/badge/Mathematics-KaTeX%20Pre--rendered-orange.svg)](#)
[![Theme](https://img.shields.io/badge/Theme-Dark%20%7C%20Light-purple.svg)](#)
[![License](https://img.shields.io/badge/License-MIT-teal.svg)](#)

> **Curated & Developed by Dinuka Himsara**  
> *Curator & Lead System Architect · Faculty of Business, University of Moratuwa*

An interactive, high-performance, offline-first study application designed for deep revision of **DA2451: Multivariate Methods in Business**. The entire application runs inside a single self-contained `.html` file with zero runtime network requests, pre-rendered mathematical notation, interactive R syntax cards, and micro-instant client-side search.

---

## ⚡ Quick Start: Download & Run

The standalone application is located directly at the repository root:

👉 **[`DA2451_Study_App.html`](./DA2451_Study_App.html)** (~45.2 MB)

### How to Run:
1. **Download** `DA2451_Study_App.html` to your computer.
2. **Double-click** the file to open it in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari).
3. **No installation, no internet connection, and no server required.**

---

## 🎯 Educational Content Inventory

| Section | Coverage & Features | Volume |
| :--- | :--- | :---: |
| **Learning Chapters** | In-depth textbook study guides covering Matrix Algebra, PCA, Factor Analysis, Multivariate Normal Distribution, Mean Vector Inferences, Multivariate Mean Comparisons, MMLR, and R implementations. Pre-rendered KaTeX formulas and highlighted code. | **11 Chapters** |
| **Historical Past Papers** | Real examination papers from Batches 19 through 23 (2022–2025) paired with step-by-step worked teaching solutions. Collapsible solution panels and one-click *Copy AI Prompt*. | **9 Exam Papers** |
| **Practice Worksheets** | Hands-on quantitative worksheets (PQ01–PQ05) with step-by-step derivations and automatic TOC jump reveal. | **5 Worksheets** |
| **Predicted Questions** | Exam prediction bank featuring 30 multiple-choice questions and 10 written essay prompts. | **40 Questions** |

---

## 🛠 Key Architecture Highlights

- **100% Offline Single-File Architecture**: Fonts (Poppins), KaTeX math typography, SVG icons, study guides, and search index are fully bundled into a single file with zero external CDNs or network calls.
- **Micro-Instant Offline Search**: Full-text inverted index indexing over 2,200 headings, derivations, and exam questions.
- **Adaptive Dark & Light Modes**: High-contrast, low-glare palettes with automatic system preference detection and local storage persistence.
- **Keyboard Shortcuts**:
  - `/` or `Ctrl + K`: Open offline search modal
  - `m`: Toggle Dark / Light mode
  - `j` / `k`: Next / Previous chapter

---

## 💻 Building from Source

To rebuild the standalone HTML bundle locally:

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or later)

### Build Commands
```bash
# 1. Install dependencies
npm install

# 2. Build the standalone HTML application
npm run build

# 3. Run automated headless browser verification
npm test
```

> **Enrolled Student Note**: Official university lecturer slide handouts are omitted from this public repository for copyright compliance. If you possess official course slide PDFs (`Lec1.pdf`..`Multivariate-Linear-Models.pdf`), you can drop them into `content/lectures/pdfs/` and run `npm run build` to automatically embed slide viewing capabilities into your local build.

---

## 📜 Licensing & Academic Attribution

- **Application Software**: Licensed under the [MIT License](LICENSE).
- **Educational Study Guides & Solutions**: Curated and synthesized for non-commercial student study by Dinuka Himsara.
- **Curriculum & Examination Inquiries**: Based on the curriculum of the Faculty of Business, University of Moratuwa.
- **Embedded Fonts**: Poppins is licensed under the [SIL Open Font License 1.1](fonts/OFL.txt).
