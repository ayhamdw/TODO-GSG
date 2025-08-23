const addButton = document.getElementById("addTaskButton");
const taskInput = document.getElementById("taskInput");
const body = document.body;

function addNewItem (task) {
    const taskList = document.getElementById("taskList");
    const newTaskItem = document.createElement("div");
    newTaskItem.classList.add("task-item");
    const taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    taskCheckbox.name = task;
    taskCheckbox.id = task;
    const taskLabel = document.createElement("label");
    taskLabel.htmlFor = task;
    taskLabel.textContent = task;
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("button");
    deleteButton.textContent = "Delete";
    const itemSeparator = document.createElement("div");
    itemSeparator.classList.add("item-seperator");

    newTaskItem.appendChild(taskCheckbox);
    newTaskItem.appendChild(taskLabel);
    newTaskItem.appendChild(deleteButton);
    newTaskItem.appendChild(itemSeparator);
    taskList.appendChild(newTaskItem);
}

addButton.addEventListener("click", () => {
    const task = taskInput.value.trim();
    if (task) {
        addNewItem(task);
        saveTasks(task);
        taskInput.value = "";
    }
});

const taskList = document.getElementById('taskList')
taskList.addEventListener('click' , function(e) {
    if (e.target.tagName === 'BUTTON') {
        const taskItem = e.target.closest('.task-item');
        taskItem.remove();
        deleteTask(taskItem.querySelector("label").textContent);
    }

    if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
        const taskItem = e.target.closest('.task-item');
        taskItem.classList.toggle('completed');
    }
});

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const task = taskInput.value.trim();
        if (task) {
            addNewItem(task);
            taskInput.value = "";
        }
    }
});

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addNewItem(task));
}

function saveTasks(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

document.addEventListener("DOMContentLoaded", loadTasks);