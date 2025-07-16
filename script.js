function updateClock() {
  const clock = document.getElementById("clock");
  setInterval(() => {
    const now = new Date();
    clock.innerText = now.toLocaleTimeString();
    checkAlarms(now);
  }, 1000);
}
updateClock();

function addTask() {
  const taskText = document.getElementById("taskInput").value;
  const alarmTime = document.getElementById("alarmTime").value;
  if (!taskText || !alarmTime) return;

  const li = document.createElement("li");
  li.innerText = taskText + " at " + alarmTime;
  document.getElementById("taskList").appendChild(li);

  alarms.push(alarmTime);
}

let alarms = [];

function checkAlarms(now) {
  const current = now.toTimeString().slice(0, 5);
  if (alarms.includes(current)) {
    document.getElementById("alarmSound").play();
    alert("⏰ Alarm for task!");
    alarms = alarms.filter(t => t !== current);
  }
}

function stopAlarm() {
  const alarm = document.getElementById("alarmSound");
  alarm.pause();
  alarm.currentTime = 0;
}

function snoozeAlarm() {
  stopAlarm();
  setTimeout(() => document.getElementById("alarmSound").play(), 300000);
}

// Stopwatch
let stopwatchTime = 0, stopwatchInterval;
function startStopwatch() {
  if (stopwatchInterval) return;
  stopwatchInterval = setInterval(() => {
    stopwatchTime++;
    document.getElementById("stopwatch").innerText = new Date(stopwatchTime * 1000).toISOString().substr(11, 8);
  }, 1000);
}
function stopStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
}
function resetStopwatch() {
  stopwatchTime = 0;
  document.getElementById("stopwatch").innerText = "00:00:00";
  stopStopwatch();
}

// Timer
let timerInterval;
function startTimer() {
  const minutes = parseInt(document.getElementById("timerMinutes").value);
  if (isNaN(minutes) || minutes <= 0) return;
  let timeLeft = minutes * 60;
  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      document.getElementById("alarmSound").play();
      alert("⏳ Timer Done!");
    }
    let min = Math.floor(timeLeft / 60);
    let sec = timeLeft % 60;
    document.getElementById("timerDisplay").innerText =
      (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
    timeLeft--;
  }, 1000);
}
