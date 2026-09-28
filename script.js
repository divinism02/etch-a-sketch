const container = document.getElementById("container");
const resizeBtn = document.getElementById("resize-btn");

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function createGrid(size) {
  container.innerHTML = "";

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.flex = `0 0 ${100 / size}%`;
    square.dataset.darkness = "0";

    square.addEventListener("mouseenter", () => {
      let darkness = Number(square.dataset.darkness);

      // Random RGB color on the first interaction
      if (darkness === 0) {
        square.style.backgroundColor = randomColor();
      }

      // Each interaction adds 10% opacity, fully colored after 10
      darkness = Math.min(darkness + 0.1, 1);
      square.dataset.darkness = darkness.toFixed(1);
      square.style.opacity = darkness;
    });

    // Start fully "blank" until first interaction
    square.style.opacity = 0;
    container.appendChild(square);
  }
}

resizeBtn.addEventListener("click", () => {
  const input = prompt("Number of squares per side (max 100):");
  if (input === null) return;

  const size = parseInt(input, 10);
  if (Number.isNaN(size) || size < 1 || size > 100) {
    alert("Please enter a number between 1 and 100.");
    return;
  }
  createGrid(size);
});

createGrid(16);