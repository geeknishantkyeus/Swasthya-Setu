// Doctors Dataset - Supervised Learning
const doctorsDataset = {
  ayurveda: [
    {
      id: "ayur_dr_001",
      name: "Dr. Anjali Varma",
      specialization: "Musculoskeletal Disorders & Panchakarma",
      experience: "12 years",
      qualifications: "BAMS, MD (Panchakarma)",
      rating: 4.9,
      reviews: 234,
      languages: ["Hindi", "English", "Malayalam"],
      location: "Ganga Block - 102, AyurVeda Wellness Center",
      city: "Bengaluru",
      fees: 800,
      availableSlots: ["09:00 AM", "10:30 AM", "02:00 PM", "04:30 PM"],
      image: "👩‍⚕️",
      bio: "Specializes in Kati Basti and chronic pain management. Trained in Kerala tradition."
    },
    {
      id: "ayur_dr_002",
      name: "Dr. Rajesh Nair",
      specialization: "Mental Health & Shirodhara",
      experience: "15 years",
      qualifications: "BAMS, MD (Ayurvedic Psychiatry)",
      rating: 4.8,
      reviews: 189,
      languages: ["Hindi", "English", "Tamil"],
      location: "Yamuna Block - 205, AyurVeda Wellness Center",
      city: "Bengaluru",
      fees: 1000,
      availableSlots: ["10:00 AM", "12:00 PM", "03:00 PM", "05:00 PM"],
      image: "👨‍⚕️",
      bio: "Expert in stress management, anxiety, and sleep disorders using Shirodhara."
    },
    {
      id: "ayur_dr_003",
      name: "Dr. Meera Krishnan",
      specialization: "Gastroenterology & Detox",
      experience: "10 years",
      qualifications: "BAMS, MD (Ayurvedic Medicine)",
      rating: 4.9,
      reviews: 312,
      languages: ["Hindi", "English", "Tamil", "Sanskrit"],
      location: "Godavari Block - 301, AyurVeda Wellness Center",
      city: "Bengaluru",
      fees: 900,
      availableSlots: ["09:30 AM", "11:30 AM", "02:30 PM", "04:00 PM"],
      image: "👩‍⚕️",
      bio: "Specializes in Virechana and Panchakarma for digestive disorders."
    },
    {
      id: "ayur_dr_004",
      name: "Dr. Suresh Iyer",
      specialization: "Skin & Hair Care",
      experience: "8 years",
      qualifications: "BAMS, MD (Dermatology)",
      rating: 4.7,
      reviews: 156,
      languages: ["Hindi", "English", "Marathi"],
      location: "Kaveri Block - 104, AyurVeda Wellness Center",
      city: "Bengaluru",
      fees: 750,
      availableSlots: ["11:00 AM", "01:00 PM", "03:30 PM", "06:00 PM"],
      image: "👨‍⚕️",
      bio: "Expert in Raktamokshana and herbal treatments for skin conditions."
    }
  ],
  modern: [
    {
      id: "mod_dr_001",
      name: "Dr. Vikram Reddy",
      specialization: "Orthopedics & Joint Replacement",
      experience: "18 years",
      qualifications: "MBBS, MS (Orthopedics)",
      rating: 4.8,
      reviews: 456,
      languages: ["Hindi", "English", "Telugu"],
      location: "Apollo Hospital, 3rd Floor, Room 301",
      city: "Bengaluru",
      fees: 1200,
      availableSlots: ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"],
      image: "👨‍⚕️",
      bio: "Senior orthopedic surgeon specializing in arthritis and sports injuries."
    },
    {
      id: "mod_dr_002",
      name: "Dr. Priya Srinivas",
      specialization: "Psychiatry & Mental Health",
      experience: "14 years",
      qualifications: "MBBS, MD (Psychiatry)",
      rating: 4.9,
      reviews: 278,
      languages: ["Hindi", "English", "Kannada"],
      location: "Manipal Hospital, Block B, Room 205",
      city: "Bengaluru",
      fees: 1500,
      availableSlots: ["10:00 AM", "12:00 PM", "03:00 PM", "05:30 PM"],
      image: "👩‍⚕️",
      bio: "Specializes in anxiety, depression, and CBT therapy."
    },
    {
      id: "mod_dr_003",
      name: "Dr. Anil Kumar",
      specialization: "Gastroenterology",
      experience: "16 years",
      qualifications: "MBBS, DM (Gastroenterology)",
      rating: 4.8,
      reviews: 345,
      languages: ["Hindi", "English", "Punjabi"],
      location: "Fortis Hospital, 2nd Floor, Room 108",
      city: "Bengaluru",
      fees: 1300,
      availableSlots: ["09:30 AM", "11:30 AM", "02:30 PM", "04:30 PM"],
      image: "👨‍⚕️",
      bio: "Expert in digestive disorders, endoscopy, and liver diseases."
    },
    {
      id: "mod_dr_004",
      name: "Dr. Sunita Sharma",
      specialization: "Dermatology",
      experience: "12 years",
      qualifications: "MBBS, MD (Dermatology)",
      rating: 4.7,
      reviews: 234,
      languages: ["Hindi", "English", "Punjabi"],
      location: "Columbia Asia Hospital, 1st Floor, Room 112",
      city: "Bengaluru",
      fees: 1100,
      availableSlots: ["10:30 AM", "01:00 PM", "03:00 PM", "05:00 PM"],
      image: "👩‍⚕️",
      bio: "Specializes in acne, psoriasis, and cosmetic dermatology."
    }
  ],
  
  getDoctorsByCategory: function(category, condition) {
    let doctors = this[category.toLowerCase()];
    if (condition === "Joint Pain") {
      doctors = doctors.filter(d => d.specialization.includes("Orthopedics") || d.specialization.includes("Musculoskeletal"));
    } else if (condition === "Stress/Anxiety" || condition === "Sleep Issues") {
      doctors = doctors.filter(d => d.specialization.includes("Psychiatry") || d.specialization.includes("Mental Health"));
    } else if (condition === "Digestion Issues") {
      doctors = doctors.filter(d => d.specialization.includes("Gastroenterology") || d.specialization.includes("Digestive"));
    } else if (condition === "Skin Issues") {
      doctors = doctors.filter(d => d.specialization.includes("Dermatology") || d.specialization.includes("Skin"));
    }
    return doctors;
  },
  
  getDoctorById: function(id) {
    const allDoctors = [...this.ayurveda, ...this.modern];
    return allDoctors.find(d => d.id === id);
  }
};

export default doctorsDataset;
