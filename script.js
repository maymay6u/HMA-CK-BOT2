<script>
  let history = [];

  function submitNumber() {
    const input = document.getElementById("inputNumber").value;
    const num = parseInt(input);
    if (isNaN(num) || num < 0 || num > 9) {
      alert("Please enter a valid number between 0 and 9.");
      return;
    }

    history.push(num);
    if (history.length > 50) history.shift(); // recent 50 numbers

    predictNext();
  }

  function predictNext() {
    if (history.length < 10) {
      document.getElementById("predictionOutput").textContent = "Please enter at least 10 numbers";
      document.getElementById("predictionLogic").textContent = "";
      return;
    }

    const freq = new Array(10).fill(0);
    for (const n of history) {
      freq[n]++;
    }

    // Find the least frequent number = most likely to appear next
    let minFreq = Math.min(...freq);
    let candidates = freq
      .map((f, idx) => (f === minFreq ? idx : null))
      .filter(v => v !== null);

    const predicted = candidates[Math.floor(Math.random() * candidates.length)];

    document.getElementById("predictionOutput").textContent = `Prediction: ${predicted}`;
    document.getElementById("predictionLogic").textContent = `Least frequent in last ${history.length} draws → Likely to appear: ${candidates.join(', ')}`;
  }
</script>
