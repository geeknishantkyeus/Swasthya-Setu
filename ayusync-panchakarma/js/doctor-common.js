// Doctor Common Functions - Sidebar, Storage, PDF, Charts
// Imports existing common.js patterns

import { showToast, logout } from './common.js'; // Existing utils
import { doctorData } from './doctor-data.js'; // Mock data
import doctorsDataset from './doctors-data.js'; // Existing doctors

// Sidebar HTML template (consistent across practitioner pages)
const sidebarHTML = `
<div class="sidebar fixed left-0 top-20 h-screen w-64 bg-white shadow-2xl z-40 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out">
  <div class="p-6">
    <div class="flex items-center space-x-3 mb-8">
      <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg" id="doctorAvatar">👩‍⚕️</div>
      <div>
        <h3 class="font-bold text-lg text-gray-800" id="doctorName">Dr. Anjali</h3>
        <p class="text-sm text-green-600 font-medium" id="doctorSpec">Panchakarma Expert</p>
      </div>
    </div>
    
    <nav class="space-y-2">
      <a href="dashboard.html" class="sidebar-link flex items-center space-x-3 p-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all group">
        <i class="fas fa-tachometer-alt text-lg"></i><span>📊 Dashboard</span>
      </a>
      <a href="today-schedule.html" class="sidebar-link flex items-center space-x-3 p-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all group">
        <i class="fas fa-calendar-day text-lg"></i><span>📅 Today&apos;s Schedule</span>
      </a>
      <a href="patients-list.html" class="sidebar-link flex items-center space-x-3 p-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all group">
        <i class="fas fa-users text-lg"></i><span>👥 Patients</span>
      </a>
      <a href="consultation.html" class="sidebar-link flex items-center space-x-3 p-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all group">
        <i class="fas fa-stethoscope text-lg"></i><span>📝 Consultation</span>
      </a>
      <a href="therapy-protocol.html" class="sidebar-link flex items-center space-x-3 p-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all group">
        <i class="fas fa-spa text-lg"></i><span>🏥 Therapy Protocol</span>
      </a>
      <a href="reports.html" class="sidebar-link flex items-center space-x-3 p-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all group">
        <i class="fas fa-chart-bar text-lg"></i><span>📈 Reports</span>
      </a>
      <a href="notifications.html" class="sidebar-link flex items-center space-x-3 p-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all group">
        <i class="fas fa-bell text-lg"></i><span>🔔 Notifications</span>
      </a>
      <a href="profile.html" class="sidebar-link flex items-center space-x-3 p-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all group">
        <i class="fas fa-user-cog text-lg"></i><span>⚙️ Profile</span>
      </a>
      <button onclick="doctorLogout()" class="w-full flex items-center space-x-3 p-3 rounded-xl text-red-600 hover:bg-red-50 transition-all group">
        <i class="fas fa-sign-out-alt text-lg"></i><span>🚪 Logout</span>
      </button>
    </nav>
  </div>
</div>
<div class="sidebar-overlay fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden hidden" onclick="toggleSidebar()"></div>
`;

// Init doctor interface
function initDoctorInterface() {
  if (window.location.pathname.includes('/practitioner/')) {
    document.body.insertAdjacentHTML('beforeend', sidebarHTML);
    loadDoctorData();
    renderDoctorInfo();
    document.querySelector('.sidebar-overlay')?.addEventListener('click', toggleSidebar);
    addMobileMenuToggle();
  }
}

// Toggle sidebar mobile
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  sidebar.classList.toggle('-translate-x-full');
  overlay.classList.toggle('hidden');
}

// Mobile menu toggle button
function addMobileMenuToggle() {
  const header = document.querySelector('header') || document.body;
  const toggleBtn = document.createElement('button');
  toggleBtn.innerHTML = '<i class="fas fa-bars text-2xl text-green-800"></i>';
  toggleBtn.className = 'lg:hidden p-2 ml-4';
  toggleBtn.onclick = toggleSidebar;
  header.appendChild(toggleBtn);
}

// Load/save doctor data to localStorage
function loadDoctorData() {
  const saved = localStorage.getItem('doctorData');
  if (saved) Object.assign(doctorData, JSON.parse(saved));
  return doctorData;
}

function saveDoctorData() {
  localStorage.setItem('doctorData', JSON.stringify(doctorData));
  showToast('Data saved successfully');
}

// Render current doctor info in sidebar
function renderDoctorInfo() {
  const doc = doctorData.currentDoctor;
  document.getElementById('doctorAvatar').textContent = doc.photo;
  document.getElementById('doctorName').textContent = doc.name;
  document.getElementById('doctorSpec').textContent = doc.specialization;
}

// Doctor logout (clear doctor session)
function doctorLogout() {
  if (confirm('Logout from doctor dashboard?')) {
    localStorage.removeItem('doctorSession');
    showToast('Logged out successfully');
    setTimeout(() => window.location.href = '../auth/login.html?role=doctor', 1000);
  }
}

// Search patients function
function searchPatients(query) {
  return doctorData.patients.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.phone.includes(query) ||
    p.id.toString() === query
  );
}

// Update appointment status
function updateAppointmentStatus(apptId, newStatus, checkin) {
  const appt = doctorData.todayAppointments.find(a => a.id === apptId);
  if (appt) {
    appt.status = newStatus;
    appt.checkin = checkin;
    saveDoctorData();
    showToast(`Appointment ${appt.patient} updated to ${newStatus}`);
    return true;
  }
  return false;
}

// Generate prescription PDF using jsPDF
function generatePrescriptionPDF(prescription) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text('🩺 AyuSync Prescription', 20, 30);
  doc.setFontSize(12);
  doc.text(`Doctor: ${doctorData.currentDoctor.name}`, 20, 50);
  doc.text(`Patient: ${prescription.patientName} (${prescription.patientId})`, 20, 60);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 70);
  
  let y = 90;
  doc.text('Diagnosis:', 20, y); y += 10;
  doc.text(prescription.diagnosis, 30, y); y += 20;
  
  doc.text('Medicines:', 20, y); y += 10;
  prescription.medicines.forEach((med, i) => {
    doc.text(`${i+1}. ${med.name} - ${med.dosage} for ${med.duration}`, 30, y);
    y += 8;
  });
  
  y += 10;
  doc.text('Therapies:', 20, y); y += 10;
  prescription.therapies.forEach(t => {
    doc.text(`• ${t}`, 30, y); y += 8;
  });
  
  y += 10;
  doc.text(`Follow-up: ${prescription.followUp}`, 20, y);
  
  doc.save(`prescription_${prescription.patientId}_${Date.now()}.pdf`);
  showToast('Prescription PDF downloaded!');
}

// Init charts (extend existing charts.js)
function initDoctorCharts(canvasId, type, data) {
  const ctx = document.getElementById(canvasId)?.getContext('2d');
  if (!ctx) return;
  
  new Chart(ctx, {
    type,
    data: { labels: data.labels || [], datasets: [{ data: data.values || [], backgroundColor: ['#2D6A4F', '#74C69D', '#FFB703'] }] },
    options: { responsive: true, plugins: { legend: { position: 'top' } } }
  });
}

// Mark notification read
function markNotificationRead(notifId) {
  const notif = doctorData.notifications.find(n => n.id === notifId);
  if (notif) notif.read = true;
  saveDoctorData();
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initDoctorInterface();
  // Load page-specific data here
});

// CSS for sidebar (inject)
const sidebarCSS = `
<style>
.sidebar { background: linear-gradient(180deg, #f8fafc 0%, white 100%); border-right: 1px solid #e2e8f0; }
.sidebar-link:hover .group { transform: translateX(4px); }
.sidebar-link i { transition: all 0.3s; }
.sidebar-link:hover i { color: #2D6A4F !important; transform: scale(1.1); }
@media (max-width: 1024px) { .sidebar { left: -100%; } .sidebar:not(.hidden) { left: 0; } }
.main-content { margin-left: 0; padding-left: 1rem; transition: margin-left 0.3s; }
@media (min-width: 1025px) { .main-content { margin-left: 16rem; padding: 2rem; } }
</style>
`;
document.head.insertAdjacentHTML('beforeend', sidebarCSS);

export { initDoctorInterface, loadDoctorData, saveDoctorData, toggleSidebar, searchPatients, updateAppointmentStatus, generatePrescriptionPDF, initDoctorCharts, markNotificationRead, doctorLogout };

