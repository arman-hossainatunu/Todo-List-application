const taskInput = document.getElementById("taskInput");
const targetDateInput = document.getElementById("targetDateInput");
const addTaskButton = document.getElementById("addTaskButton");
const viewTaskCardsButton = document.getElementById("viewTaskCardsButton");
const alertIcon = document.getElementById("alertIcon");
const tomorrowCountSpan = document.getElementById("tomorrowCount");

// Set default target date to tomorrow
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
targetDateInput.value = tomorrow.toISOString().split("T")[0]; // YYYY-MM-DD

// Add task function
function addTask(taskTextInput, taskDateInput, showAlert = true) {
  const taskText = taskTextInput || taskInput.value.trim();
  const targetDate = taskDateInput || targetDateInput.value;

  if (!taskText || !targetDate) {
    alert("Please enter both Task Name and Target Date!");
    return false;
  }

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const newTask = {
    text: taskText,
    date: new Date().toLocaleDateString(),
    targetDate: targetDate,
    completed: false,
  };

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  if (showAlert) {
    updateTomorrowAlert();
  }

  taskInput.value = "";
  targetDateInput.value = tomorrow.toISOString().split("T")[0]; // reset to tomorrow
}

// Check if a date is tomorrow
function isTomorrow(dateString) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const taskDate = new Date(dateString);
  return taskDate.toDateString() === tomorrow.toDateString();
}

// Update tomorrow alert count
function updateTomorrowAlert() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const tomorrowTasks = tasks.filter((task) => isTomorrow(task.targetDate));
  const count = tomorrowTasks.length;

  if (count > 0) {
    tomorrowCountSpan.textContent = count;
    alertIcon.classList.remove("hidden");
  } else {
    alertIcon.classList.add("hidden");
  }
}

// Add Task button
addTaskButton.addEventListener("click", () => {
  addTask();
  alert("Task added successfully!");
});

// View Task Cards button
viewTaskCardsButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const targetDate = targetDateInput.value;

  if (taskText && targetDate) {
    addTask(taskText, targetDate, false); // add task without duplicate alert
  }

  window.location.href = "task-detail.html";
});

// On page load: add predefined Exam task (6 Sep 2025)
window.addEventListener("load", () => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const examExists = tasks.some(
    (task) => task.text === "Exam" && task.targetDate === "2025-09-06"
  );

  if (!examExists) {
    addTask("Exam", "2025-09-06", false);
  }

  updateTomorrowAlert();
});
