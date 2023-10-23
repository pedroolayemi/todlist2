const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");

let taskCount = 0;
let tasks = []; // Array to store tasks

const displayCount = () => {
    countValue.innerText = taskCount;
};

const deleteTask = (button) => {
    const checkBox = button.parentNode.querySelector(".task-check");
    const taskName = button.parentNode.querySelector(".taskname").innerText;
    button.parentNode.remove();

    if (!checkBox.checked) {
        taskCount--;
    }

    // Update the tasks array and save it to local storage
    tasks = tasks.filter(task => task !== taskName);
    saveTasksToLocalStorage();

    displayCount();
};

const editTask = (target) => {
    const taskNameElement = target.previousElementSibling;
    const taskName = taskNameElement.innerText;
    newTaskInput.value = taskName;
    taskNameElement.parentNode.remove();

    const checkBox = target.parentNode.querySelector(".task-check");
    if (!checkBox.checked && taskCount > 0) {
        taskCount--;
    }

    // Update the tasks array and save it to local storage
    const oldTaskName = taskNameElement.innerText;
    tasks = tasks.map(task => (task === oldTaskName ? taskName : task));
    saveTasksToLocalStorage();

    displayCount();
};

const handleCheckboxChange = (checkBox) => {
    checkBox.nextElementSibling.classList.toggle("completed");
    const taskName = checkBox.parentNode.querySelector(".taskname").innerText;

    if (checkBox.checked) {
        taskCount--;
    } else {
        taskCount++;
    }

    // Update the tasks array and save it to local storage
    const oldTaskName = taskName;
    tasks = tasks.map(task => (task === oldTaskName ? taskName : task));
    saveTasksToLocalStorage();

    displayCount();
};

const saveTasksToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        taskCount = tasks.length;
        displayCount();
        tasksContainer.innerHTML = ''; // Clear the existing tasks
        tasks.forEach(taskName => {
            const task = `<div class="task">
                <input type="checkbox" class="task-check">
                <span class="taskname">${taskName}</span>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>`;
            tasksContainer.insertAdjacentHTML("beforeend", task);
        });
    }
};

addBtn.addEventListener("click", (event) => {
    addTask();
});

addBtn.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Handle "Delete" and "Edit" button clicks using event delegation
tasksContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("delete")) {
        deleteTask(target);
    } else if (target.classList.contains("edit")) {
        editTask(target);
    }
});

// Handle checkbox changes using event delegation
tasksContainer.addEventListener("change", (event) => {
    const target = event.target;
    if (target.classList.contains("task-check")) {
        handleCheckboxChange(target);
    }
});

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return;
    }

    const task = `<div class="task">
        <input type="checkbox" class="task-check">
        <span class="taskname">${taskName}</span>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    </div>`;

    tasksContainer.insertAdjacentHTML("beforeend", task);
    taskCount++;
    tasks.push(taskName);
    saveTasksToLocalStorage();
    displayCount();
    newTaskInput.value = "";
};

window.onload = () => {
    loadTasksFromLocalStorage(); // Load tasks from local storage when the page loads
    newTaskInput.value = "";
    taskCount = taskCount;
    displayCount();
    

};
