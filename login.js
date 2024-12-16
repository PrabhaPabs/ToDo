// Select elements
const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("error-message");

// Predefined login details
const users = [
    { username: "User", password: "user123", role: "user" },
    { username: "Admin", password: "admin123", role: "admin" }
];

// Event listener for login form
loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const user = users.find(u => u.username === username && u.password === password && u.role === role);

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = "dashboard.html";
    } else {
        errorMessage.textContent = "Invalid credentials. Please try again.";
    }
});
