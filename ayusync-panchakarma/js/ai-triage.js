// AI Triage Symptom Selector
document.addEventListener('DOMContentLoaded', function() {
    const symptomCards = document.querySelectorAll('.symptom-card');
    let selectedSymptoms = [];
    
    symptomCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('selected');
            
            const symptom = this.dataset.symptom;
            const index = selectedSymptoms.indexOf(symptom);
            
            if (index > -1) {
                selectedSymptoms.splice(index, 1);
            } else {
                selectedSymptoms.push(symptom);
            }
        });
    });
    
    document.getElementById('triage-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Mock AI analysis - store selections in localStorage for demo
        localStorage.setItem('selectedSymptoms', JSON.stringify(selectedSymptoms));
        
        // Navigate to recommendation page
        window.location.href = 'ai-recommendation.html';
    });
    
    // Load previously selected symptoms for back navigation
    const savedSymptoms = JSON.parse(localStorage.getItem('selectedSymptoms') || '[]');
    savedSymptoms.forEach(symptom => {
        const card = document.querySelector(`[data-symptom="${symptom}"]`);
        if (card) card.classList.add('selected');
    });
});
