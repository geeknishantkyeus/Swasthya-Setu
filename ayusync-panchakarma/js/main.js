// Main JavaScript for AyuSync - Global functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    });
    
    // Mobile menu toggle (if needed)
    const mobileToggle = document.querySelector('.mobile-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            document.querySelector('nav ul').classList.toggle('active');
        });
    }
    
    // Form validation helper
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#f44336';
                    isValid = false;
                } else {
                    field.style.borderColor = '#4a7c4a';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill all required fields');
            }
        });
    });
    
    // Auto-save form progress
    const textInputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
    textInputs.forEach(input => {
        input.addEventListener('input', function() {
            localStorage.setItem(`form_${input.name || input.id}`, this.value);
        });
        
        // Load saved value
        const saved = localStorage.getItem(`form_${input.name || input.id}`);
        if (saved) input.value = saved;
    });
    
    // Notification simulation
    if (document.querySelector('.notification-bell')) {
        setInterval(() => {
            // Simulate new notifications
            console.log('🔔 New patient check-in or feedback received');
        }, 30000);
    }
    
    // Initialize charts if charts.js is loaded
    if (typeof AyuSyncCharts !== 'undefined') {
        AyuSyncCharts.init();
    }
});
