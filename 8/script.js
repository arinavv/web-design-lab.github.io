const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        if (
            currentFilter === "completed" && !task.completed ||
            currentFilter === "uncompleted" && task.completed
        ) return;

        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        const text = document.createElement("span");
        text.textContent = task.text;
        text.onclick = () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        };

        const delBtn = document.createElement("button");
        delBtn.textContent = "✖";
        delBtn.className = "delete-btn";
        delBtn.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        li.append(text, delBtn);
        taskList.appendChild(li);
    });
}

addTaskBtn.onclick = () => {
    const value = taskInput.value.trim();
    if (!value) {
        alert("Введите задачу");
        return;
    }

    tasks.push({ text: value, completed: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
};

filterButtons.forEach(btn => {
    btn.onclick = () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        renderTasks();
    };
});

burger.onclick = () => {
    navLinks.classList.toggle("show");
};

renderTasks();
