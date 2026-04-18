# 🧩 Sudoku Solver Web App

A simple and interactive **Sudoku Solver & Generator** built using **HTML, CSS, and JavaScript**. This project allows users to generate Sudoku puzzles of varying difficulty, solve them instantly, get hints, track time, and maintain a leaderboard.

---

## 🚀 Features

* 🎯 **Generate Sudoku Puzzles**

  * Choose difficulty: Easy, Medium, Hard
* 🧠 **Auto Solver**

  * Instantly solves the puzzle using a backtracking algorithm
* 💡 **Hint System**

  * Reveals one correct cell at a time
* ⏱️ **Timer**

  * Tracks how long you take to solve the puzzle
* 🏆 **Leaderboard**

  * Stores top 5 fastest completion times (using localStorage)
* 🌗 **Dark/Light Theme Toggle**
* 🧹 **Clear Grid**

  * Reset the board anytime

---

## 🛠️ Tech Stack

* **HTML** – Structure of the app
* **CSS** – Styling and layout
* **JavaScript** – Game logic, solver, generator, and interactivity

---

## 📂 Project Structure

```
📁 sudoku-solver
├── index.html     # Main HTML structure
├── style.css      # Styling and themes
├── script.js      # Game logic and functionality
└── README.md      # Project documentation
```

---

## ⚙️ How It Works

### 🧩 Puzzle Generation

1. A complete valid Sudoku board is generated.
2. Cells are removed based on selected difficulty.
3. The puzzle ensures **only one unique solution**.

### 🧠 Solving Algorithm

* Uses **Backtracking Algorithm**:

  * Tries numbers 1–9
  * Checks validity (row, column, 3x3 box)
  * Recursively solves until complete

### ✅ Validation

* Ensures:

  * No duplicate numbers in rows, columns, or 3×3 grids

---

## ▶️ How to Run

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/sudoku-solver.git
   ```

2. Open the project folder:

   ```bash
   cd sudoku-solver
   ```

3. Open `index.html` in your browser.

---

## 📸 Screenshots

![Sudoku Solver](https://github.com/RG11223344/PRODIGY_SD_04/blob/main/ss.png)

---

## 🧪 Future Improvements

* 📱 Mobile responsiveness improvements
* 🎨 Better UI/UX design
* 🔊 Sound effects
* 🧠 Step-by-step solving visualization
* 🌐 Online leaderboard (backend integration)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

* Fork the repository
* Create a new branch
* Submit a pull request

---

## 📜 License

This project is open-source and available under the **MIT License**.

---

## 🙌 Acknowledgements

Inspired by classic Sudoku games and built for learning and practice.

---

⭐ If you like this project, consider giving it a star on GitHub!
