const display = document.getElementById("display");
const historyList = document.getElementById("historyList");
const themeToggle = document.getElementById("themeToggle");
const clearHistoryBtn = document.getElementById("clearHistory");

function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  try {
    const result = eval(display.value);
    if (display.value !== "") {
      addHistory(display.value + " = " + result);
    }
    display.value = result;
  } catch {
    display.value = "Error";
  }
}

function addHistory(entry) {
  const li = document.createElement("li");
  li.textContent = entry;
  li.addEventListener("click", () => {
    display.value = entry.split(" = ")[0]; // load past calculation
  });
  historyList.prepend(li); // latest on top
}

function clearHistory() {
  historyList.innerHTML = "";
}

// Keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    event.preventDefault();
    calculateResult();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key.toLowerCase() === "c") {
    clearDisplay();
  }
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Clear history
clearHistoryBtn.addEventListener("click", clearHistory);
