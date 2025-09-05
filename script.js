const addButton = document.getElementById("addTaskButton");
const taskInput = document.getElementById("taskInput");
const body = document.body;

function addNewItem(taskObj) {
    const taskList = document.getElementById("taskList");
    const newTaskItem = document.createElement("div");
    newTaskItem.classList.add("task-item");
    if (taskObj.completed) {
        newTaskItem.classList.add("completed");
    }
    const taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    taskCheckbox.name = taskObj.id;
    taskCheckbox.id = taskObj.id;
    taskCheckbox.checked = !!taskObj.completed;
    const taskLabel = document.createElement("label");
    taskLabel.htmlFor = taskObj.id;
    taskLabel.textContent = taskObj.text;
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
    const taskText = taskInput.value.trim();
    if (taskText) {
        const taskObj = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            text: taskText,
            completed: false
        };
        addNewItem(taskObj);
        saveTasks(taskObj);
        taskInput.value = "";
    }
});

const taskList = document.getElementById('taskList')
taskList.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
        const taskItem = e.target.closest('.task-item');
        const taskId = taskItem.querySelector("input[type='checkbox']").id;
        taskItem.remove();
        deleteTask(taskId);
    }

    if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
        const taskItem = e.target.closest('.task-item');
        const taskId = e.target.id;
        taskItem.classList.toggle('completed');
        toggleTaskCompleted(taskId, e.target.checked);
    }
});

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const taskObj = {
                id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                text: taskText,
                completed: false
            };
            addNewItem(taskObj);
            saveTasks(taskObj);
            taskInput.value = "";
        }
    }
});


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(taskObj => addNewItem(taskObj));
}


function saveTasks(taskObj) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function deleteTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

function toggleTaskCompleted(taskId, completed) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.map(t => {
        if (t.id === taskId) {
            return { ...t, completed };
        }
        return t;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

document.addEventListener("DOMContentLoaded", loadTasks);