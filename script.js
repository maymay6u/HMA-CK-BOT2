const SLOT_SECONDS = 30;
const REFERENCE_TIME = "2025-07-19T16:38:30+06:30";
const REFERENCE_SUFFIX = 51217;

const predictionPattern = "BIG SMALL SMALL BIG BIG SMALL SMALL BIG BIG SMALL SMALL BIG BIG BIG SMALL SMALL BIG SMALL BIG SMALL SMALL BIG BIG SMALL BIG SMALL SMALL SMALL SMALL BIG SMALL BIG SMALL SMALL SMALL SMALL BIG SMALL BIG BIG SMALL BIG SMALL BIG BIG BIG SMALL SMALL BIG SMALL BIG SMALL SMALL BIG SMALL BIG BIG BIG BIG SMALL BIG SMALL SMALL SMALL SMALL BIG SMALL SMALL BIG SMALL SMALL SMALL BIG BIG SMALL SMALL SMALL SMALL BIG SMALL BIG SMALL BIG SMALL SMALL SMALL BIG BIG SMALL SMALL BIG SMALL BIG BIG SMALL SMALL BIG BIG SMALL BIG BIG SMALL SMALL SMALL SMALL BIG BIG SMALL BIG SMALL SMALL BIG SMALL BIG BIG BIG SMALL SMALL BIG SMALL SMALL BIG SMALL SMALL SMALL BIG SMALL SMALL BIG SMALL SMALL SMALL SMALL BIG BIG SMALL SMALL BIG BIG SMALL SMALL BIG SMALL SMALL BIG SMALL SMALL SMALL BIG BIG BIG SMALL BIG BIG SMALL SMALL SMALL SMALL BIG SMALL SMALL BIG BIG BIG SMALL SMALL SMALL BIG SMALL SMALL SMALL SMALL BIG SMALL SMALL SMALL BIG SMALL BIG BIG SMALL SMALL BIG SMALL BIG SMALL SMALL BIG BIG SMALL BIG SMALL SMALL SMALL SMALL SMALL SMALL SMALL BIG SMALL SMALL SMALL BIG SMALL SMALL BIG BIG SMALL SMALL SMALL BIG SMALL SMALL SMALL BIG BIG SMALL SMALL SMALL SMALL SMALL BIG SMALL BIG SMALL BIG SMALL BIG BIG SMALL BIG SMALL SMALL SMALL BIG SMALL SMALL SMALL SMALL SMALL BIG BIG SMALL SMALL BIG SMALL SMALL SMALL BIG SMALL SMALL BIG SMALL BIG BIG BIG SMALL SMALL BIG SMALL BIG SMALL BIG SMALL BIG SMALL SMALL SMALL SMALL BIG SMALL BIG SMALL BIG BIG SMALL SMALL BIG SMALL SMALL".split(" ");

function pad(n, w = 2) {
  return String(n).padStart(w, '0');
}

function getMMTime() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 6.5 * 60 * 60 * 1000);
}

const BASE_INDEX = (() => {
  const refDate = new Date(REFERENCE_TIME);
  const start = new Date(refDate);
  start.setHours(0, 0, 0, 0);
  const refSecs = Math.floor((refDate - start) / 1000);
  return REFERENCE_SUFFIX - Math.floor(refSecs / SLOT_SECONDS) + 1;
})();

function getCurrentPeriod(now) {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const secs = Math.floor((now - start) / 1000);
  const slotIndex = Math.floor(secs / SLOT_SECONDS);
  const suffix = pad(BASE_INDEX + slotIndex, 5);
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}1000${suffix}`;
}

function updatePrediction() {
  const now = getMMTime();
  document.getElementById('clock').textContent = now.toLocaleTimeString();

  const period = getCurrentPeriod(now);
  document.getElementById('period').textContent = `Period: ${period}`;

  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const pIndex = Math.floor((now - start) / 1000 / SLOT_SECONDS);

  const outcome = predictionPattern[pIndex % predictionPattern.length];
  const resEl = document.getElementById('result');

  if (resEl.textContent !== outcome) {
    resEl.classList.remove('flip-in');
    void resEl.offsetWidth;
    resEl.classList.add('flip-in');
  }

  resEl.textContent = outcome;
  resEl.className = `prediction ${outcome.toLowerCase()} flip-in`;
}

setInterval(updatePrediction, 1000);
updatePrediction();
