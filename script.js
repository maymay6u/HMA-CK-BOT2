const predictionLogic = {
  0: [0, 4, 7],
  1: [3, 6, 9],
  2: [5, 6, 8],
  3: [1, 4, 7],
  4: [0, 5, 8],
  5: [0, 3, 9],
  6: [2, 4, 7],
  7: [0, 2, 5],
  8: [3, 6, 9],
  9: [1, 4, 6]
};

function predict() {
  const input = parseInt(document.getElementById("singleInput").value);
  const resultDiv = document.getElementById("result");

  if (isNaN(input) || input < 0 || input > 9) {
    resultDiv.innerHTML = "❌ 0 ကနေ 9 ကြားထည့်ပါ";
    return;
  }

  const possible = predictionLogic[input];
  const prediction = possible[Math.floor(Math.random() * possible.length)];

  resultDiv.innerHTML = `
    <p>🎯 <b>${input}</b> နောက်ထပ်ကျနိုင်တာတွေ:</p>
    <b style="font-size: 30px;">${possible.join(" | ")}</b><br/>
    🔮 မှန်နိုင်ဆုံး: <span style="color:#00ff00; font-size:28px;"><b>${prediction}</b></span>
  `;
}
