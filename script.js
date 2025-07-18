let history = [];

function submitNumber() {
  const input = document.getElementById("inputNumber").value;
  const num = parseInt(input);

  if (isNaN(num) || num < 0 || num > 9) {
    alert("Please enter a valid number between 0 and 9.");
    return;
  }

  history.push(num);
  if (history.length > 300) history.shift();
  predictNext();
}

function predictNext() {
  const big = history.filter(n => n >= 5).length;
  const small = history.filter(n => n < 5).length;
  const total = history.length;

  let prediction = "";
  let logic = "";

  if (big / total > 0.6) {
    prediction = "Small";
    logic = `Big (${big}) > Small (${small}) → ⬇ Likely to drop → Small`;
  } else if (small / total > 0.6) {
    prediction = "Big";
    logic = `Small (${small}) > Big (${big}) → ⬆ Likely to rise → Big`;
  } else {
    const rand = Math.random() > 0.5 ? "Big" : "Small";
    prediction = rand;
    logic = `Balanced trend → Random shift → ${rand}`;
  }

  document.getElementById("predictionOutput").textContent = `Prediction: ${prediction}`;
  document.getElementById("predictionLogic").textContent = logic;
}