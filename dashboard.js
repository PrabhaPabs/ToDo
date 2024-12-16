// Select elements
const welcomeMessage = document.getElementById("welcomeMessage");
const logoutBtn = document.getElementById("logoutBtn");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Get logged-in user from localStorage
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser) {
    welcomeMessage.textContent = `Welcome, ${loggedInUser.username}`;

    // Event listener for adding tasks
    addTaskBtn.addEventListener("click", addTask);

    // Event listener for logout
    logoutBtn.addEventListener("click", function() {
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
    });

    // Load tasks from localStorage
    loadTasks();
} else {
    window.location.href = "login.html"; // Redirect to login if not logged in
}

// Add a task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        text: taskText,
        completed: false
    };

    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    loadTasks();
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = getTasks();
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${task.text}</span>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Get tasks from localStorage
function getTasks() {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}

// Delete a task
function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}
