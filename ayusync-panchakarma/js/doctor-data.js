// Doctor Interface Mock Data - AyuSync Panchakarma
// Compatible with existing doctors-data.js and patient mock patterns

const doctorData = {
  // Current logged-in doctor (demo: Dr. Anjali)
  currentDoctor: {
    id: 'ayur_dr_001',
    name: 'Dr. Anjali Varma',
    specialization: 'Musculoskeletal Disorders & Panchakarma',
    experience: '12 years',
    qualifications: 'BAMS, MD (Panchakarma)',
    photo: '👩‍⚕️',
    email: 'doctor@ayusync.com',
    phone: '+91 9876543210',
    clinic: 'Ganga Block - 102',
    fees: 800,
    workingHours: 'Mon-Sat 9AM-7PM',
    rating: 4.9
  },

  // Today's appointments (priority: emergency first)
  todayAppointments: [
    { 
      id: 'appt_001', time: '09:00 AM', patient: 'Priya Sharma', age: 34, symptoms: 'Lower back pain', status: 'completed', checkin: 'arrived', isEmergency: false, room: '102' 
    },
    { 
      id: 'appt_002', time: '10:30 AM', patient: 'Rajesh Kumar', age: 45, symptoms: 'Severe chest pain reaction', status: 'emergency', checkin: 'arrived', isEmergency: true, room: '102' 
    },
    { 
      id: 'appt_003', time: '02:00 PM', patient: 'Anita Desai', age: 52, symptoms: 'Joint stiffness', status: 'waiting', checkin: 'not-arrived', isEmergency: false, room: '102' 
    },
    { 
      id: 'appt_004', time: '04:30 PM', patient: 'Emergency Walk-in', age: 60, symptoms: 'Acute pain flare-up', status: 'in-progress', checkin: 'arrived', isEmergency: true, room: '102' 
    }
  ],

  // All patients list
  patients: [
    { 
      id: 1, name: 'Priya Sharma', age: 34, phone: '9876543210', gender: 'F', dosha: 'Vata-Kapha', 
      lastVisit: '2024-04-15', nextAppt: '2024-04-22', condition: 'Joint Pain', rating: 5,
      history: ['Kati Basti 3/7 sessions', 'Pain reduced 50%']
    },
    { 
      id: 2, name: 'Rajesh Kumar', age: 45, phone: '9876543211', gender: 'M', dosha: 'Pitta', 
      lastVisit: '2024-04-14', nextAppt: '2024-04-21', condition: 'Stress/Anxiety', rating: 4,
      history: ['Shirodhara started', 'Emergency reaction noted']
    },
    { 
      id: 3, name: 'Anita Desai', age: 52, phone: '9876543212', gender: 'F', dosha: 'Kapha', 
      lastVisit: '2024-04-13', nextAppt: '2024-04-20', condition: 'Digestion Issues', rating: 4.5,
      history: ['Virechana prep', 'Diet prescribed']
    },
    { 
      id: 4, name: 'Suresh Patel', age: 38, phone: '9876543213', gender: 'M', dosha: 'Vata', 
      lastVisit: '2024-04-16', nextAppt: null, condition: 'Skin Issues', rating: null,
      history: ['Lepanam trial', 'Follow-up pending']
    }
  ],

  // Sample prescriptions
  prescriptions: [
    {
      id: 'rx_001', patientId: 1, date: '2024-04-15', diagnosis: 'Chronic lower back pain (Vata disorder)',
      medicines: [
        { name: 'Dhanwantharam Oil', dosage: 'External - 30ml/session', duration: '7 days', instructions: 'For Kati Basti' },
        { name: 'Dashamoola Kashayam', dosage: '15ml BD', duration: '14 days', instructions: 'After meals' }
      ],
      therapies: ['Kati Basti - 7 sessions', 'Abhyanga - daily'],
      labs: ['CBC', 'ESR'], followUp: '2024-04-22'
    }
  ],

  // Therapy protocols templates
  therapyProtocols: {
    'Kati Basti': {
      pre: ['Patient fasting confirmed', 'Vitals recorded', 'Oil prepared (Dhanwantharam)'],
      during: ['Position prone', 'Oil temp 38-40°C', 'Retain 45 mins', 'Massage periphery'],
      post: ['Rest 30 mins', 'Hot water bath', 'Light diet', 'Avoid cold/wind']
    }
  },

  // Reports mock data
  reportsData: {
    weeklyPatients: [12, 15, 18, 20, 22, 25, 28],
    successRate: { panchakarma: 92, shirodhara: 87, virechana: 89 },
    commonConditions: { 'Joint Pain': 45, 'Stress': 30, 'Digestion': 15, 'Skin': 10 },
    revenue: [15000, 18000, 22000, 25000],
    satisfaction: 4.8
  },

  // Notifications
  notifications: [
    { id: 1, type: 'emergency', message: 'Rajesh Kumar - Severe reaction in Room 102', time: '10:15 AM', read: false },
    { id: 2, type: 'checkin', message: 'Priya Sharma checked in (Next)', time: '09:45 AM', read: true },
    { id: 3, type: 'appointment', message: 'New booking: Suresh Patel 6PM', time: '09:30 AM', read: false },
    { id: 4, type: 'followup', message: 'Anita Desai follow-up due tomorrow', time: '08:00 AM', read: false }
  ]
};

// Export for use
if (typeof module !== 'undefined') module.exports = doctorData;
console.log('Doctor mock data loaded:', Object.keys(doctorData));

