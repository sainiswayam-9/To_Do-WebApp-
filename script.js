
document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addBtn = document.getElementById("addBtn");
  const taskList = document.getElementById("taskList");
  const alarmTimeInput = document.getElementById("alarmTime");
  const alarmAudio = document.getElementById("alarmAudio");

  // Live Clock
  const clock = document.getElementById("clock");
  function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-GB');
    clock.textContent = timeStr;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Store tasks with alarms
  let tasks = [];

  addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    const alarmTime = alarmTimeInput.value;

    if (taskText === "") return;

    const li = document.createElement("li");
    li.textContent = taskText + (alarmTime ? ` ⏰ ${alarmTime}` : "");
    taskList.appendChild(li);

    if (alarmTime) {
      tasks.push({ text: taskText, time: alarmTime, triggered: false });
    }

    taskInput.value = "";
    alarmTimeInput.value = "";
  });

  // Check alarms every second
  setInterval(() => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM format

    tasks.forEach(task => {
      if (task.time === currentTime && !task.triggered) {
        alarmAudio.play();
        alert("⏰ Reminder: " + task.text);
        task.triggered = true;
      }
    });
  }, 1000);
});
