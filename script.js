const addButton = document.getElementById("addTaskButton");
const taskInput = document.getElementById("taskInput");


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
        taskInput.value = "";
    }
});