
let alarmTimeout;
let snoozeTimeout;

// Live Clock
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  document.getElementById('clock').textContent = time;

  const alarmTime = document.getElementById('alarmTime').value;
  if (alarmTime === time.slice(0,5)) {
    document.getElementById('alarmSound').play();
    alert('⏰ Alarm: ' + alarmTime);
  }
}
setInterval(updateClock, 1000);

// Add Task
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');
  const task = taskInput.value;
  if (!task) return;
  const li = document.createElement('li');
  li.textContent = task;
  taskList.appendChild(li);
  taskInput.value = '';
}

// Alarm Stop & Snooze
function stopAlarm() {
  document.getElementById('alarmSound').pause();
  document.getElementById('alarmSound').currentTime = 0;
  clearTimeout(alarmTimeout);
  clearTimeout(snoozeTimeout);
}

function snoozeAlarm() {
  stopAlarm();
  snoozeTimeout = setTimeout(() => {
    document.getElementById('alarmSound').play();
    alert('🔔 Snoozed alarm!');
  }, 5 * 60 * 1000);
}

// Stopwatch
let stopwatchInterval, stopwatchTime = 0;
function startStopwatch() {
  if (stopwatchInterval) return;
  stopwatchInterval = setInterval(() => {
    stopwatchTime++;
    let hours = String(Math.floor(stopwatchTime / 3600)).padStart(2, '0');
    let minutes = String(Math.floor((stopwatchTime % 3600) / 60)).padStart(2, '0');
    let seconds = String(stopwatchTime % 60).padStart(2, '0');
    document.getElementById('stopwatch').textContent = `${hours}:${minutes}:${seconds}`;
  }, 1000);
}
function stopStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
}
function resetStopwatch() {
  stopStopwatch();
  stopwatchTime = 0;
  document.getElementById('stopwatch').textContent = '00:00:00';
}

// Timer
let timerInterval;
function startTimer() {
  let minutes = parseInt(document.getElementById('timerMinutes').value);
  if (isNaN(minutes) || minutes <= 0) return;
  let time = minutes * 60;
  timerInterval = setInterval(() => {
    let min = String(Math.floor(time / 60)).padStart(2, '0');
    let sec = String(time % 60).padStart(2, '0');
    document.getElementById('timerDisplay').textContent = `${min}:${sec}`;
    if (--time < 0) {
      clearInterval(timerInterval);
      alert('⏳ Timer completed!');
      document.getElementById('alarmSound').play();
    }
  }, 1000);
}
