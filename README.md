# PrismKernel – Advanced Prompt Engineering Interface

**A modular visual, specialized UI tool for constructing high-fidelity LLM prompts using the PRISM and KERNEL methodologies.**

## 💡 The Problem
Effective interaction with Large Language Models requires strict adherence to structural frameworks. Manually typing and formatting prompts using methodologies like **PRISM** (Persona, Request, Input, etc.) and **KERNEL** is error-prone and inconsistent.

## 🛠 The Solution: PrismKernel
PrismKernel operationalizes these abstract methodologies into a **React-based graphical user interface**. It treats prompt sections as modular components, allowing users to visually assemble, configure, and compile complex prompt structures without syntax errors.

## 🚀 Key Features

* **Dual-Methodology Support:** dedicated UI modules for both **PRISM** (Strategic Context) and **KERNEL** (Tactical Execution) workflows.
* **Visual Composition:** Click-to-add interface to stack prompt logic blocks.
* **Domain presets:** Currently offers 3 domain templates for generating images, App UIs and a free domain. The free domain let's users create their own domain by allowing custom section creation via text-input.
* **Real-time Compilation:** Dynamic string concatenation that instantly transforms UI state into a copy-paste ready prompt.
* **Template Management:** Save and load frequently used architectural patterns for consistent output.

## 🛠 Tech Stack

* **Frontend:** React (TypeScript)
* **Styling:** Tailwind CSS
* **Icons:** Lucide React

## 📦 Getting Started

```bash
# Clone the repository
git clone [https://github.com/yourusername/prism-kernel.git](https://github.com/yourusername/prism-kernel.git)

# Install dependencies
npm install

# Run the development server
npm run dev
