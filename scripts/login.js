const API_URL = "http://localhost:3000/api";

async function signup() {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    document.getElementById("signup-message").textContent = data.message;
}

async function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    document.getElementById("login-message").textContent = data.message;
}

async function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "JFC Delicacy.html"; // Redirect after login
    } else {
        document.getElementById("login-message").innerText = data.message;
    }
}

