/* ============= GLOBAL SCRIPT ============= */

// Mobile bottom navigation active state
const navLinks = document.querySelectorAll("[data-nav]");

navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("text-blue-600", "font-bold");
  }
});

// Toast Notification
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `fixed bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg text-white shadow-lg fade-in
    ${type === "success" ? "bg-green-500" : "bg-red-500"}`;
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}

// Example: showToast("Account created");
window.showToast = showToast;

// Toggle Sidebar
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("hidden");
}
window.toggleSidebar = toggleSidebar;

// Dark Mode Toggle
function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
}
window.toggleDarkMode = toggleDarkMode;
