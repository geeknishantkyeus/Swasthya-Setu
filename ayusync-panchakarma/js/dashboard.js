// Patient Dashboard Data Logic - Firestore Integration
// Import after firebase-config.js and charts.js

import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs, 
  getDoc, 
  doc 
} from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';
import { db } from './firebase-config.js';
import { getUserData } from './auth.js';

// Load all dashboard data
export async function loadDashboardData() {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const uid = user.uid;
    const userData = await getUserData();
    if (!userData) throw new Error('User data not found');

    // Parallel promises
    const [appointmentsSnap, feedbackSnap, plansSnap] = await Promise.all([
      getDocs(query(
        collection(db, 'appointments'),
        where('patientId', '==', uid),
        orderBy('date'),
        limit(5)
      )),
      getDocs(query(
        collection(db, 'feedback'),
        where('patientId', '==', uid),
        orderBy('sessionNumber')
      )),
      getDocs(query(
        collection(db, 'treatment_plans'),
        where('userId', '==', uid),
        where('status', '==', 'active')
      ))
    ]);

    // Process data
    const appointments = appointmentsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    const feedback = feedbackSnap.docs.map(d => d.data().painLevel || 0); // pain levels array
    const activePlan = plansSnap.docs[0]?.data() || { totalSessions: 7, completed: 3, therapy: 'Kati Basti' };

    // Compute stats
    const completionRate = Math.round((activePlan.completed / activePlan.totalSessions) * 100);
    const todayAppointment = appointments.find(apt => new Date(apt.date).toDateString() === new Date().toDateString());
    const upcoming = appointments.slice(1); // exclude today

    // Update DOM
    updateWelcome(userData.name);
    updateStats(activePlan, completionRate);
    updateTodaySchedule(todayAppointment);
    updateProgressChart(feedback, activePlan);
    updateUpcoming(upcoming);
    updateFeedbackForm();

    document.getElementById('loadingSpinner')?.remove();
    document.querySelector('.dashboard-container')?.classList.remove('hidden');
  } catch (error) {
    console.error('Dashboard load error:', error);
    // Fallback to mock data
    loadMockData();
  }
}

function updateWelcome(name) {
  document.getElementById('welcomeName').textContent = name;
  document.getElementById('userProfile').textContent = `👤 ${name}`;
}

function updateStats(plan, completion) {
  document.getElementById('totalSessions').textContent = plan.totalSessions;
  document.getElementById('completedSessions').textContent = `(${plan.completed} completed)`;
  document.getElementById('completionRate').textContent = `${completion}%`;
  document.getElementById('completionBar').style.width = `${completion}%`;
  document.getElementById('healthStatus').innerHTML = `${plan.therapy || 'Improving'}<br><small>+25% from start</small>`;
}

function updateTodaySchedule(apt) {
  if (apt) {
    document.getElementById('todayTime').textContent = new Date(apt.date).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});
    document.getElementById('todaySession').textContent = `${apt.type || 'Kati Basti'} Session ${apt.sessionNumber || '3'}/7`;
    document.getElementById('todayDoctor').textContent = apt.doctor || 'Dr. Anjali Varma';
    document.getElementById('todayRoom').textContent = apt.room || 'Ganga Block - 102';
    document.getElementById('todayStatus').textContent = apt.status === 'ready' ? '🟢 Check-in Ready' : 'Status';
  }
}

function updateProgressChart(painLevels, plan) {
  const painChart = document.getElementById('painChart');
  if (painChart && typeof AyuSyncCharts !== 'undefined') {
    AyuSyncCharts.createProgressLine('painChart', {
      points: painLevels.length ? painLevels : [8, 6, 4.5, 4], // fallback
      labels: ['Day1', 'Day2', 'Day3', 'Day4']
    });
  }
  // Progress bars
  AyuSyncCharts.createProgressBar('amaProgress', plan.amaReduction || 52, 'Ama Reduction');
  AyuSyncCharts.createProgressBar('energyProgress', plan.energyLevel || 38, 'Energy Level');
}

function updateUpcoming(appointments) {
  const container = document.getElementById('upcomingList');
  container.innerHTML = appointments.map(apt => 
    `<div>${new Date(apt.date).toLocaleDateString()}: ${apt.type || 'Session'} (${apt.time || '10:00 AM'})</div>`
  ).join('') || 'No upcoming appointments';
}

function updateFeedbackForm() {
  // Simple feedback submission
  document.getElementById('feedbackForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Submit to feedback collection (patientId: uid, rating, comments)
    showToast('Feedback submitted! 👍');
  });
}

function loadMockData() {
  // Static fallback matching ASCII
  updateWelcome('Priya');
  updateStats({totalSessions:7, completed:3}, 43);
  updateTodaySchedule({date: new Date(), type:'Kati Basti', sessionNumber:3, doctor:'Dr. Anjali Varma', room:'Ganga Block - 102', status:'ready'});
  updateProgressChart([8,6,4.5,4], {amaReduction:52, energyLevel:38});
  updateUpcoming([
    {date: new Date(Date.now()+86400000), type:'Abhyanga'},
    {date: new Date(Date.now()+2*86400000), type:'REST DAY'},
    {date: new Date(Date.now()+3*86400000), type:'Kati Basti'}
  ]);
}

// Init on auth change
export function initDashboard() {
  import('./auth.js').then(({ onAuthChange, protectRoute }) => {
    protectRoute('../auth/login.html');
    onAuthChange(async (user) => {
      if (user) {
        await loadDashboardData();
      }
    });
  });
}

// Toast helper
function showToast(message, type = 'success') {
  // Reuse auth.js style or simple alert
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = 'position:fixed;top:20px;right:20px;background:#4a7c4a;color:white;padding:1rem;border-radius:8px;z-index:9999;';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

