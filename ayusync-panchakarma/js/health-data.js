// health-data.js - Knowledge Base (Supervised Learning Dataset)

const healthDataset = {
  // Symptoms mapping to conditions
  symptoms: {
    "Joint Pain": {
      keywords: ["knee", "back", "arthritis", "swelling", "stiffness"],
      ayurveda: {
        therapy: "Kati Basti / Janu Basti",
        description: "Localized oil pool therapy for joint relief",
        duration: "7-14 days",
        sessions: 7,
        cost: 5000,
        successRate: 85,
        precautions: ["Avoid cold", "Light exercise", "Warm oil massage"]
      },
      modern: {
        treatment: "Physiotherapy / Orthopedic Consultation",
        description: "Physical therapy and pain management",
        duration: "6-8 weeks",
        sessions: 12,
        cost: 15000,
        successRate: 75,
        precautions: ["Rest", "Ice packs", "Pain medication"]
      }
    },
    "Stress/Anxiety": {
      keywords: ["tension", "worry", "insomnia", "fatigue", "panic"],
      ayurveda: {
        therapy: "Shirodhara / Abhyanga",
        description: "Oil dripping therapy for mental relaxation",
        duration: "7-11 days",
        sessions: 7,
        cost: 6000,
        successRate: 88,
        precautions: ["Avoid caffeine", "Regular sleep", "Meditation"]
      },
      modern: {
        treatment: "Psychiatric Consultation / CBT",
        description: "Cognitive Behavioral Therapy",
        duration: "8-12 weeks",
        sessions: 8,
        cost: 20000,
        successRate: 70,
        precautions: ["Regular follow-up", "Medication compliance"]
      }
    },
    "Digestion Issues": {
      keywords: ["bloating", "acidity", "constipation", "indigestion", "gas"],
      ayurveda: {
        therapy: "Virechana / Panchakarma",
        description: "Therapeutic purgation for detox",
        duration: "5-7 days",
        sessions: 5,
        cost: 7000,
        successRate: 90,
        precautions: ["Light diet", "No spicy food", "Hydration"]
      },
      modern: {
        treatment: "Gastroenterology / Endoscopy",
        description: "Digestive system examination",
        duration: "2-4 weeks",
        sessions: 3,
        cost: 12000,
        successRate: 80,
        precautions: ["Diet plan", "Medication", "Avoid triggers"]
      }
    },
    "Sleep Issues": {
      keywords: ["insomnia", "nightmares", "restless", "tired", "awake"],
      ayurveda: {
        therapy: "Shiro Abhyanga / Nasya",
        description: "Head massage with medicated oils",
        duration: "7-14 days",
        sessions: 7,
        cost: 5500,
        successRate: 82,
        precautions: ["No screens", "Early dinner", "Warm milk"]
      },
      modern: {
        treatment: "Sleep Study / Psychiatry",
        description: "Sleep pattern analysis",
        duration: "4-6 weeks",
        sessions: 6,
        cost: 18000,
        successRate: 75,
        precautions: ["Sleep hygiene", "No caffeine", "Regular schedule"]
      }
    },
    "Respiratory Issues": {
      keywords: ["cough", "cold", "asthma", "breathlessness", "wheezing"],
      ayurveda: {
        therapy: "Vamana / Swedana",
        description: "Therapeutic vomiting and steam therapy",
        duration: "5-7 days",
        sessions: 5,
        cost: 6500,
        successRate: 80,
        precautions: ["Avoid dust", "Steam inhalation", "Warm fluids"]
      },
      modern: {
        treatment: "Pulmonology / Spirometry",
        description: "Lung function tests",
        duration: "4-8 weeks",
        sessions: 6,
        cost: 14000,
        successRate: 85,
        precautions: ["Inhaler", "Avoid allergens", "Regular checkup"]
      }
    },
    "Skin Issues": {
      keywords: ["rash", "acne", "eczema", "psoriasis", "itching"],
      ayurveda: {
        therapy: "Raktamokshana / Lepanam",
        description: "Blood purification therapy",
        duration: "7-10 days",
        sessions: 7,
        cost: 6000,
        successRate: 83,
        precautions: ["Herbal creams", "Diet control", "No chemicals"]
      },
      modern: {
        treatment: "Dermatology / Biopsy",
        description: "Skin examination and medication",
        duration: "6-8 weeks",
        sessions: 5,
        cost: 11000,
        successRate: 78,
        precautions: ["Steroid creams", "Avoid sun", "Gentle cleansing"]
      }
    },
    "Detox Need": {
      keywords: ["toxins", "cleanse", "purification", "liver", "kidney"],
      ayurveda: {
        therapy: "Panchakarma (Full)",
        description: "Complete 5-step detoxification",
        duration: "14-21 days",
        sessions: 14,
        cost: 15000,
        successRate: 92,
        precautions: ["Special diet", "No alcohol", "Rest required"]
      },
      modern: {
        treatment: "Detox Diet / Nutritionist",
        description: "Guided detox meal plan",
        duration: "4 weeks",
        sessions: 4,
        cost: 8000,
        successRate: 70,
        precautions: ["Supplements", "Hydration", "Avoid junk food"]
      }
    },
    "Fatigue": {
      keywords: ["tired", "low energy", "weakness", "exhaustion", "lethargy"],
      ayurveda: {
        therapy: "Abhyanga / Rasayana",
        description: "Rejuvenation oil massage",
        duration: "7-14 days",
        sessions: 7,
        cost: 5500,
        successRate: 86,
        precautions: ["Proper sleep", "Nutritious diet", "Stress management"]
      },
      modern: {
        treatment: "General Medicine / Blood Test",
        description: "Complete health checkup",
        duration: "2-3 weeks",
        sessions: 3,
        cost: 9000,
        successRate: 72,
        precautions: ["Vitamin supplements", "Exercise", "Balanced diet"]
      }
    }
  },
  
  // AI Recommendation Engine
  getRecommendations: function(selectedSymptoms) {
    let ayurvedaScores = {};
    let modernScores = {};
    let totalAyurveda = 0;
    let totalModern = 0;
    
    selectedSymptoms.forEach(symptom => {
      const data = this.symptoms[symptom];
      if (data) {
        totalAyurveda += data.ayurveda.successRate;
        totalModern += data.modern.successRate;
      }
    });
    
    const avgAyurveda = totalAyurveda / selectedSymptoms.length;
    const avgModern = totalModern / selectedSymptoms.length;
    
    // Return the better option based on success rate
    const betterOption = avgAyurveda > avgModern ? "AYURVEDA" : "MODERN";
    
    return {
      ayurveda: {
        recommended: avgAyurveda >= avgModern,
        therapies: selectedSymptoms.map(s => this.symptoms[s]?.ayurveda.therapy).join(", "),
        totalCost: selectedSymptoms.reduce((sum, s) => sum + (this.symptoms[s]?.ayurveda.cost || 0), 0),
        totalSessions: selectedSymptoms.reduce((sum, s) => sum + (this.symptoms[s]?.ayurveda.sessions || 0), 0),
        avgSuccessRate: Math.round(avgAyurveda),
        details: selectedSymptoms.map(s => this.symptoms[s]?.ayurveda)
      },
      modern: {
        recommended: avgModern >= avgAyurveda,
        treatments: selectedSymptoms.map(s => this.symptoms[s]?.modern.treatment).join(", "),
        totalCost: selectedSymptoms.reduce((sum, s) => sum + (this.symptoms[s]?.modern.cost || 0), 0),
        totalSessions: selectedSymptoms.reduce((sum, s) => sum + (this.symptoms[s]?.modern.sessions || 0), 0),
        avgSuccessRate: Math.round(avgModern),
        details: selectedSymptoms.map(s => this.symptoms[s]?.modern)
      },
      betterOption: betterOption,
      explanation: avgAyurveda > avgModern 
        ? "Ayurveda has higher success rates for your combination of symptoms"
        : "Modern healthcare may provide faster relief for your symptoms"
    };
  }
};

export default healthDataset;

