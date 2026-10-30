(() => {
  const resultEl = document.getElementById("result");
  const expressionEl = document.getElementById("expression");
  const SYMBOLS = { "+": "+", "-": "−", "/": "÷" };

  let current = "0";      // number being typed
  let previous = null;    // stored left-hand number
  let operator = null;    // "+", "-", or "/"
  let overwrite = false;  // next digit starts a fresh number
  let hasError = false;

  function compute(a, b, op) {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "/":
        if (b === 0) throw new Error("Cannot divide by zero");
        return a / b;
    }
  }

  // Trim floating-point noise (0.1 + 0.2 -> 0.3)
  function format(n) {
    return String(parseFloat(n.toPrecision(12)));
  }

  function render() {
    resultEl.textContent = current;
    resultEl.classList.toggle("error", hasError);
    expressionEl.textContent =
      previous !== null && operator ? `${previous} ${SYMBOLS[operator]}` : "";
    document.querySelectorAll(".key-op").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.operator === operator && overwrite);
    });
  }

  function reset() {
    current = "0";
    previous = null;
    operator = null;
    overwrite = false;
    hasError = false;
  }

  function inputDigit(d) {
    if (hasError) reset();
    if (overwrite) { current = "0"; overwrite = false; }
    if (current.replace(/[-.]/g, "").length >= 15) return;
    current = current === "0" ? d : current + d;
  }

  function inputDecimal() {
    if (hasError) reset();
    if (overwrite) { current = "0"; overwrite = false; }
    if (!current.includes(".")) current += ".";
  }

  function deleteLast() {
    if (hasError) { reset(); return; }
    if (overwrite) return;
    current = current.length > 1 ? current.slice(0, -1) : "0";
  }

  function calculate() {
    if (previous === null || operator === null) return true;
    try {
      current = format(compute(parseFloat(previous), parseFloat(current), operator));
      previous = null;
      operator = null;
      return true;
    } catch (err) {
      reset();
      current = err.message;
      hasError = true;
      return false;
    }
  }

  function chooseOperator(op) {
    if (hasError) return;
    // Changed my mind: swap the operator before typing a second number
    if (operator && overwrite) { operator = op; return; }
    if (previous !== null && operator && !calculate()) return;
    previous = current;
    operator = op;
    overwrite = true;
  }

  function equals() {
    if (hasError) return;
    if (calculate()) overwrite = true;
  }

  // Mouse / touch
  document.querySelector(".keys").addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const { digit, operator: op, action } = btn.dataset;

    if (digit !== undefined) inputDigit(digit);
    else if (op) chooseOperator(op);
    else if (action === "decimal") inputDecimal();
    else if (action === "delete") deleteLast();
    else if (action === "clear") reset();
    else if (action === "equals") equals();
    render();
  });

  // Keyboard
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (/^[0-9]$/.test(e.key)) inputDigit(e.key);
    else if (e.key === ".") inputDecimal();
    else if (["+", "-", "/"].includes(e.key)) { e.preventDefault(); chooseOperator(e.key); }
    else if (e.key === "Enter" || e.key === "=") { e.preventDefault(); equals(); }
    else if (e.key === "Backspace") deleteLast();
    else if (e.key === "Escape" || e.key.toLowerCase() === "c") reset();
    else return;
    render();
  });

  render();
})();
