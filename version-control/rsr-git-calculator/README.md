# Basic Calculator

A small calculator built with plain HTML, CSS, and JavaScript. No frameworks, no build step.

## Features

- Addition, subtraction, and division
- Decimal numbers
- `AC` (clear all) and `⌫` (delete last digit)
- Division by zero shows a clear error message
- Floating-point cleanup, so `0.1 + 0.2` shows `0.3`
- Chained operations (`8 + 2 - 5 =` works left to right)
- Keyboard support
- Responsive layout with automatic light and dark themes

## Getting started

1. Download or clone this folder.
2. Open `index.html` in any modern browser.

To serve it locally instead:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Keyboard shortcuts

| Key               | Action          |
| ----------------- | --------------- |
| `0`–`9`, `.`      | Enter numbers   |
| `+`, `-`, `/`     | Operators       |
| `Enter` or `=`    | Calculate       |
| `Backspace`       | Delete last digit |
| `Esc` or `C`      | Clear all       |

## Project structure

```
calculator/
├── index.html   # Markup and key layout
├── style.css    # Styling, themes, responsive layout
├── script.js    # Calculator logic and input handling
└── README.md
```

## How it works

`script.js` keeps four pieces of state: the number being typed (`current`), the stored left-hand number (`previous`), the pending `operator`, and an `overwrite` flag that tells the next digit to start a new number. Button clicks and key presses both call the same functions (`inputDigit`, `chooseOperator`, `equals`, and so on), then `render()` updates the display.

## Adding multiplication

1. In `index.html`, add a button: `<button class="key key-op" data-operator="*">×</button>`
2. In `script.js`, add `"*": "×"` to `SYMBOLS` and `case "*": return a * b;` to `compute()`.
3. Add `"*"` to the operator list in the keyboard handler.

## License

MIT
