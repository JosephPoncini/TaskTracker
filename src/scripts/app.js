import { saveToLocalStorage, removeFromLocalStorage, getlocalStorage } from "./localStorage.js";

let nameInput = document.getElementById("nameInput");
let descriptionInput = document.getElementById("descriptionInput");
let priorities = document.getElementById("priorities");
let statuses = document.getElementById("statuses");
let dueDateInput = document.getElementById("dueDateInput");

let tasksGoHere = document.getElementById("tasksGoHere");

let removeTaskBtn = document.getElementById("removeTaskBtn");
let saveEditsBtn = document.getElementById("saveEditsBtn");

let toDoDiv = document.getElementById("toDoDiv");
let inProgressDiv = document.getElementById("inProgressDiv");
let completedDiv = document.getElementById("completedDiv");

//task view elements
let taskNameDiv = document.getElementById("taskNameDiv");
let taskDescriptionDiv = document.getElementById("taskDescriptionDiv");
let taskPriorityDiv = document.getElementById("taskPriorityDiv");
let taskStatusDiv = document.getElementById("taskStatusDiv");
let taskDueDateDiv = document.getElementById("taskDueDateDiv");

//edit task elements
let editNameInput = document.getElementById("editNameInput");
let editDescriptionInput = document.getElementById("editDescriptionInput");
let editPriorities = document.getElementById("editPriorities");
let editStatus = document.getElementById("editStatus");
let editDueDateInput = document.getElementById("editDueDateInput");

let key = 0;
let toDoTracker = 0;
let inProgressTracker = 0;
let completedTracker = 0;

class Task {
    constructor(name, description, priority, status, dueDate) {
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.dueDate = dueDate;
    }
}

let saveTaskBtn = document.getElementById("saveTaskBtn");


const addTask = (name, counter, status, priority) => {
    tasksGoHere.appendChild(createTaskElement(name, counter, status, priority));
}

saveTaskBtn.addEventListener("click", () => {
    let name = nameInput.value;
    let description = descriptionInput.value;
    let priority = priorities.value;
    let dueDate = dueDateInput.value;
    let status = statuses.value;
    let task = new Task(name, description, priority, status, dueDate);
    saveToLocalStorage(task);
    location.reload();
})

const loadTasks = () => {
    let tasks = getlocalStorage();
    let counter = 0;
    tasks.forEach(task => {
        addTask(task.name, counter, task.status, task.priority);
        counter++;
    })
    toDoDiv.innerText  = `${toDoTracker} \t To-Do`
    inProgressDiv.innerText  = `${inProgressTracker} \t In-Progress`
    completedDiv.innerText  = `${completedTracker} \t Completed`
}

const createTaskElement = (taskName, index, status, priority) => {
    const div = document.createElement("div");

    switch (status) {
        case "To-Do":
            div.className = "bg-blue-800 w-full min-h-[100px]";
            toDoTracker++;
            break;
        case "In-Progress":
            div.className = "bg-yellow-500 w-full min-h-[100px]";
            inProgressTracker++;
            break;
        case "Completed":
            div.className = "bg-green-600 w-full min-h-[100px]";
            completedTracker;
            break;
    }


    const taskDiv = document.createElement("div");
    switch (priority) {
        case "Low":
            taskDiv.className = "p-4";
            taskDiv.textContent = taskName;
            break;
        case "Medium":
            taskDiv.className = "p-4 font-bold";
            taskDiv.textContent = taskName;
            break;
        case "High":
            taskDiv.className = "p-4 font-bold underline";
            console.log(typeof taskName)
            taskDiv.textContent = `${taskName.toUpperCase()} !!!`;
            break;
    }

    div.appendChild(taskDiv);

    const flexDiv = document.createElement("div");
    flexDiv.className = "flex flex-col items-center";

    const optionsButton = document.createElement("div");
    optionsButton.className = "my-task-options-button";
    optionsButton.textContent = "Edit Task";
    optionsButton.setAttribute("data-modal-target", "task-options-modal");
    optionsButton.setAttribute("data-modal-toggle", "task-options-modal");
    optionsButton.addEventListener("click", () => {
        key = index;
        let tasks = getlocalStorage();
        editNameInput.value = tasks[index].name;
        editDescriptionInput.value = tasks[index].description;
        editPriorities.value = tasks[index].priority;
        editStatus.value = tasks[index].status;
        editDueDateInput.value = tasks[index].dueDate;
    })
    flexDiv.appendChild(optionsButton);
    console.log("this is the index " + index)
    const viewButton = document.createElement("div");
    viewButton.className = "my-view-task-button";
    viewButton.textContent = "View Task";
    viewButton.setAttribute("data-modal-target", "task-view-modal");
    viewButton.setAttribute("data-modal-toggle", "task-view-modal");
    viewButton.addEventListener("click", () => {
        key = index;
        let tasks = getlocalStorage();
        taskNameDiv.innerText = tasks[index].name;
        taskDescriptionDiv.innerText = tasks[index].description;
        taskPriorityDiv.innerText = tasks[index].priority;
        taskStatusDiv.innerText = tasks[index].status;
        taskDueDateDiv.innerText = tasks[index].dueDate;
    })
    flexDiv.appendChild(viewButton);

    div.appendChild(flexDiv);

    return div;
}

saveEditsBtn.addEventListener("click", () => {
    removeFromLocalStorage(key);
    let name = editNameInput.value;
    let description = editDescriptionInput.value;
    let priority = editPriorities.value;
    let dueDate = editDueDateInput.value;
    let status = editStatus.value;
    let task = new Task(name, description, priority, status, dueDate);
    saveToLocalStorage(task);
    location.reload();
})

removeTaskBtn.addEventListener("click", () => {
    removeFromLocalStorage(key);
    location.reload();
})

loadTasks();
