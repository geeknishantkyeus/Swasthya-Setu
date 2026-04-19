// Common utilities for SwasthyaSetu - Navbar, Toast, Navigation
function loadNavbar() {
  const navbarHtml = `
    <nav class="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div class="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <a href="../index.html" class="flex items-center gap-2">
          <img src="../assets/images/logo.png" alt="SwasthyaSetu Logo" class="h-10 w-auto object-contain" onerror="this.src='https://placehold.co/40x40?text=SS&font=roboto'">
          <span class="text-xl font-bold text-green-800">SwasthyaSetu</span>
        </a>
        <div class="hidden md:flex gap-6 items-center">
          <a href="dashboard.html" class="text-gray-700 hover:text-green-600 font-medium">Dashboard</a>
          <a href="problem-selection.html" class="text-gray-700 hover:text-green-600 font-medium">New Consultation</a>
          <button onclick="logout()" class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-medium transition-all">Logout</button>
        </div>
        <button id="mobileMenuBtn" class="md:hidden text-2xl text-green-800">☰</button>
      </div>
      <div class="mobile-menu hidden md:hidden bg-white shadow-lg px-4 py-2">
        <a href="dashboard.html" class="block py-2 text-gray-700 hover:text-green-600">Dashboard</a>
        <a href="problem-selection.html" class="block py-2 text-gray-700 hover:text-green-600">New Consultation</a>
        <button onclick="logout()" class="w-full text-left py-2 text-red-600 hover:text-red-800 font-medium">Logout</button>
      </div>
    </nav>
    <div class="pt-20 min-h-screen"></div>
  `;
  document.body.insertAdjacentHTML('afterbegin', navbarHtml);
  
  // Mobile menu toggle
  document.getElementById('mobileMenuBtn')?.addEventListener('click', () => {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu?.classList.toggle('hidden');
  });
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.clear();
    showToast('Logged out successfully');
    setTimeout(() => window.location.href = '../auth/login.html', 1000);
  }
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `fixed top-24 right-4 z-[1000] px-6 py-3 rounded-2xl text-white font-medium shadow-2xl transform translate-x-full transition-all duration-300 ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  }`;
  toast.innerText = message;
  toast.style.animation = 'slideInRight 0.3s forwards';
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
`;
document.head.appendChild(style);

// Auto-load navbar on DOM ready
document.addEventListener('DOMContentLoaded', loadNavbar);

// Load common.js on all patient pages
if (window.location.pathname.includes('/patient/')) {
  loadNavbar();
}

export { loadNavbar, logout, showToast };

