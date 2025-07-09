let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filteredTasks = tasks) {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  if (filteredTasks.length === 0) {
    list.innerHTML = "<li style='text-align:center;'>No tasks</li>";
    return;
  }

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const taskText = document.createElement("span");

  

taskText.innerText = task.text; 
taskText.classList.add("task-text"); 

taskText.onclick = () => toggleTask(task.id);


    const btns = document.createElement("div");

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "✏️";
    editBtn.onclick = () => editTask(task.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.onclick = () => deleteTask(task.id);

    btns.appendChild(editBtn);
    btns.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(btns);

    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("task-input");
  const text = input.value.trim();
  if (text === "") return alert("Please enter a task.");

  tasks.push({
    id: Date.now(),
    text,
    completed: false,
    timestamp: new Date().toISOString()
  });

  input.value = "";
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newText = prompt("Edit your task:", task.text);
  if (newText === null || newText.trim() === "") return;

  tasks = tasks.map(task =>
    task.id === id ? { ...task, text: newText.trim() } : task
  );
  saveTasks();
  renderTasks();
}

function filterTasks(type) {
  if (type === "all") renderTasks(tasks);
  else if (type === "completed") renderTasks(tasks.filter(task => task.completed));
  else if (type === "pending") renderTasks(tasks.filter(task => !task.completed));
}




// Initial render
renderTasks();
