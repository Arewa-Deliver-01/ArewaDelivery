// main.js - Updated for full authentication system integration

/* =============================
   Global Config
============================= */
const API_BASE_URL = "https://api.arewadeliver-demo.com"; // Replace later with real backend

/* =============================
   Helper: HTTP Wrapper
============================= */
async function apiRequest(endpoint, method = "GET", data = null, auth = false) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = localStorage.getItem("authToken");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (data) options.body = JSON.stringify(data);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  return response.json();
}

/* =============================
   Signup Handler
============================= */
async function handleSignup(e) {
  e.preventDefault();
  const fullName = document.getElementById("signupFullName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const role = document.getElementById("signupRole").value;

  const res = await apiRequest("/auth/signup", "POST", {
    fullName,
    email,
    password,
    role,
  });

  if (res.success) {
    alert("Signup successful! Please verify or login.");
    window.location.href = "login.html";
  } else {
    alert(res.message || "Signup failed");
  }
}

/* =============================
   Login Handler
============================= */
async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await apiRequest("/auth/login", "POST", { email, password });

  if (res.success && res.token) {
    localStorage.setItem("authToken", res.token);
    localStorage.setItem("userRole", res.user.role);

    // redirect according to role
    switch (res.user.role) {
      case "admin":
        window.location.href = "roles/admin-dashboard.html";
        break;
      case "customer":
        window.location.href = "roles/customer-dashboard.html";
        break;
      case "rider":
        window.location.href = "roles/rider-dashboard.html";
        break;
      default:
        window.location.href = "index.html";
    }
  } else {
    alert(res.message || "Login failed");
  }
}

/* =============================
   Logout Handler
============================= */
function handleLogout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userRole");
  window.location.href = "login.html";
}

/* =============================
   Auth Guard
============================= */
function protectPage(requiredRole = null) {
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("userRole");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  if (requiredRole && requiredRole !== role) {
    alert("Unauthorized access");
    window.location.href = "index.html";
  }
}

/* =============================
   Dynamic UI Updates (Logged In)
============================= */
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);

  const signupForm = document.getElementById("signupForm");
  if (signupForm) signupForm.addEventListener("submit", handleSignup);

  const loginForm = document.getElementById("loginForm");
  if (loginForm) loginForm.addEventListener("submit", handleLogin);
});
    
