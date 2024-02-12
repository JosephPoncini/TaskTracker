import { saveToLocalStorage, removeFromLocalStorage, getlocalStorage } from "./localStorage.js";

let nameInput = document.getElementById("nameInput");
let descriptionInput = document.getElementById("descriptionInput");
let priorities = document.getElementById("priorities");
let dueDateInput = document.getElementById("dueDateInput");

let tasksGoHere = document.getElementById("tasksGoHere");

class Task {
    constructor(name, description, priority, dueDate) {
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
    }
}

let saveTaskBtn = document.getElementById("saveTaskBtn");


const addTask = (name, description, priority, dueDate) => {

    //I need to make the modals for the taskview and taskoption btns

    let card = document.createElement("div");
    card.classList = "bg-blue-800 w-full min-h-[100px] ";

    let taskName = document.createElement("div");
    taskName.classList = "p-4";
    taskName.innerText = name;

    let buttonContainer = document.createElement("div");
    buttonContainer.classList = "flex flex-col items-center";

    let taskOptionBtn = document.createElement("div");
    taskOptionBtn.classList = "my-task-options-button";
    taskOptionBtn.innerText = "Task Options";

    let taskViewBtn = document.createElement("div");
    taskViewBtn.classList = "my-view-task-button";
    taskViewBtn.innerText = "View Task";

    buttonContainer.appendChild(taskOptionBtn);
    buttonContainer.appendChild(taskViewBtn);

    card.appendChild(taskName);
    card.appendChild(buttonContainer);

    tasksGoHere.appendChild(card);



}

saveTaskBtn.addEventListener("click", () => {
    let name = nameInput.value;
    let description = descriptionInput.value;
    let priority = priorities.value;
    let dueDate = dueDateInput.value;

    let task = new Task(name, description, priority, dueDate);
    saveToLocalStorage(task);
    addTask(task.name, task.description, task.priority, task.dueDate);
})

const loadTasks = () => {
    let tasks = getlocalStorage();

    tasks.forEach( task => {
        addTask(task.name, task.description, task.priority, task.dueDate);
    })
}

loadTasks();