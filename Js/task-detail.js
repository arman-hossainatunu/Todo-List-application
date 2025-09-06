let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const cardList = document.getElementById("cardList");

function renderCards() {
  cardList.innerHTML = "";
  tasks.forEach((task, index) => {
    const card = document.createElement("div");
    card.className =
      "bg-white shadow-lg rounded-2xl p-4 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition";
    card.innerHTML = `
          <h3 class="text-xl font-semibold ${
            task.completed ? "line-through text-gray-400" : "text-gray-800"
          }">${task.text}</h3>
          <p class="text-gray-500"><strong>Created:</strong> ${task.date}</p>
          <p class="text-purple-600"><strong>Target Date:</strong> ${
            task.targetDate
          }</p>
          <div class="flex justify-between mt-2">
            <button class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition" onclick="completeTask(${index}); event.stopPropagation();">
              Complete ✅
            </button>
            <button class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition" onclick="deleteTask(${index}); event.stopPropagation();">
              Delete ❌
            </button>
          </div>
        `;
    cardList.appendChild(card);
  });
}

function completeTask(index) {
  tasks[index].completed = true;
  tasks.splice(index, 1); // remove completed
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderCards();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderCards();
}

function goBack() {
  window.location.href = "index.html";
}

renderCards();
