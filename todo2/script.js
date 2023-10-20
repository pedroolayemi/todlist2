const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");

let taskCount = 0;

const displayCount = () => {
    countValue.innerText = taskCount;
};

const deleteTask = (button) => {
    button.parentNode.remove();
    if(taskCount === 0){
        taskCount = taskCount
    } else{
        taskCount--;
    }
    displayCount();
};

const editTask = (target) => {
    const taskNameElement = target.previousElementSibling;
    const taskName = taskNameElement.innerText;
    newTaskInput.value = taskName;
    taskNameElement.parentNode.remove();
    taskCount--;
    displayCount();
};

const handleCheckboxChange = (checkBox) => {
    checkBox.nextElementSibling.classList.toggle("completed");
    if (checkBox.checked) {
        taskCount--;
    } else {
        taskCount++;
    }
    displayCount();
};

// Handle "Delete" and "Edit" button clicks using event delegation
tasksContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("delete")) {
        deleteTask(target);
    } else if (target.classList.contains("edit")) {
        editTask(target);
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
    displayCount();
    newTaskInput.value = "";
};

addBtn.addEventListener("click", addTask);

// Handle checkbox changes using event delegation
tasksContainer.addEventListener("change", (event) => {
    const target = event.target;
    if (target.classList.contains("task-check")) {
        handleCheckboxChange(target);
    }
});

window.onload = () => {
    taskCount = 0;
    displayCount();
    newTaskInput.value = "";
};
