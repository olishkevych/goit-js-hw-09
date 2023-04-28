const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick(event) {
  timerId = setInterval(() => {
    changeColor();
  }, 1000);
  startBtn.disabled = true;
}

function onStopBtnClick(event) {
  clearInterval(timerId);
  startBtn.disabled = false;
}

function changeColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
