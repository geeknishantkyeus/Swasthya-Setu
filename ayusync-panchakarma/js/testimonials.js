// Enhanced Testimonials for SwasthyaSetu - 6 Cards + Featured + Stats + Animations
// Production-ready: Responsive, accessible, performant

document.addEventListener('DOMContentLoaded', function() {
  const testimonials = [
    {
      avatar: '🧘‍♀️',
      name: 'Priya Sharma',
      location: 'Bengaluru',
      condition: 'Chronic Back Pain (2 years)',
      text: 'I tried everything - physio, chiropractor, painkillers. Nothing worked. SwasthyaSetu suggested Kati Basti. Life changing!',
      rating: 5,
      beforeAfter: 'Pain 8/10 → 2/10'
    },
    {
      avatar: '👨',
      name: 'Rajesh Kumar',
      location: 'Delhi',
      condition: 'Digestive Issues (3 years)',
      text: 'Bloating, acidity, irregular digestion. The AI consultant recommended Virechana. 3 months later, I feel like a new person.',
      rating: 5,
      beforeAfter: 'Digestion 3/10 → 9/10'
    },
    {
      avatar: '💆‍♀️',
      name: 'Anita Desai',
      location: 'Mumbai',
      condition: 'Stress & Anxiety',
      text: "Corporate job had me burnt out. Shirodhara therapy was recommended. After 7 sessions, my sleep quality improved 80%.",
      rating: 5,
      beforeAfter: 'Stress 9/10 → 3/10'
    },
    {
      avatar: '👴',
      name: 'Vikram Singh',
      location: 'Jaipur',
      condition: 'Arthritis',
      text: "My mother (72) had severe knee arthritis. Doctors said surgery. SwasthyaSetu suggested Panchakarma. 6 months later, she walks without support!",
      rating: 5,
      beforeAfter: 'Mobility 2/10 → 7/10'
    },
    {
      avatar: '👩',
      name: 'Sneha Patil',
      location: 'Pune',
      condition: 'Skin Problems (Psoriasis)',
      text: "Nothing worked for my psoriasis. Ayurveda treatment plan from SwasthyaSetu cleared 90% of patches in 4 months.",
      rating: 4,
      beforeAfter: 'Skin 2/10 → 8/10'
    },
    {
      avatar: '🧑',
      name: 'Amit Mehta',
      location: 'Ahmedabad',
      condition: 'Chronic Fatigue',
      text: "I was always tired, low energy. Dosha detection revealed Vata imbalance. Following the protocol changed my energy levels completely.",
      rating: 5,
      beforeAfter: 'Energy 3/10 → 9/10'
    }
  ];

  const stats = [
    { icon: '👥', label: '10,000+', desc: 'Happy Patients', finalNum: 10000 },
    { icon: '⭐', label: '4.9', desc: 'Average Rating', finalNum: 4.9 },
    { icon: '❤️', label: '94%', desc: 'Recovery Rate', finalNum: 94 }
  ];

  const featuredStory = {
    quote: "After 5 years of knee pain and 3 doctors, SwasthyaSetu helped me find the right Panchakarma therapy. Today, I can climb stairs without pain!",
    name: 'Meera Nair, 58',
    beforeAfter: 'Pain 9/10 → 2/10',
    progress: 78 // percent improvement
  };

  const container = document.querySelector('.testimonials-section .container');
  if (!container) return;

  // Generate full section HTML
  let html = `
    <div class="testimonials-stats">
      ${stats.map(stat => `
        <div class="stat-card">
          <div class="stat-icon">${stat.icon}</div>
          <div class="stat-number" data-target="${stat.finalNum}">${stat.label}</div>
          <div class="stat-desc">${stat.desc}</div>
        </div>
      `).join('')}
    </div>
    
    <div class="testimonials-header">
      <span class="badge">💚 WHAT OUR PATIENTS SAY 💚</span>
      <h2>Real Stories. Real Healing. Real Trust.</h2>
    </div>
    
    <div class="testimonials-grid">
  `;

  // Testimonials cards
  testimonials.forEach((testimonial, index) => {
    const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
    html += `
      <div class="testimonial-card" style="animation-delay: ${index * 0.1}s">
        <div class="card-avatar">${testimonial.avatar}</div>
        <div class="card-rating">${stars}</div>
        <div class="card-quote">"</div>
        <p class="card-text">${testimonial.text}</p>
        <div class="card-footer">
          <div class="patient-details">
            <strong>${testimonial.name}</strong>
            <span>${testimonial.location}</span>
            <small>${testimonial.condition}</small>
          </div>
          <div class="card-metric">${testimonial.beforeAfter}</div>
        </div>
      </div>
    `;
  });

  html += `
    </div>
    
    <div class="featured-story">
      <div class="featured-content">
        <div class="featured-quote">""</div>
        <h3>${featuredStory.quote}</h3>
        <div class="featured-metric">── ${featuredStory.name}</div>
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" style="width: 0%" data-progress="${featuredStory.progress}"></div>
          </div>
          <span>${featuredStory.progress}% Recovery</span>
        </div>
        <a href="#" class="featured-btn">📈 Watch Meera\\'s Journey →</a>
      </div>
    </div>
    
    <div class="testimonials-cta">
      <a href="#" class="cta-outline">Share Your Story</a>
      <a href="#" class="cta-solid">View All 10,000+ Reviews →</a>
    </div>
  `;

  container.innerHTML = html;

  // Animate counters
  function animateCounters() {
    const numbers = document.querySelectorAll('.stat-number, .progress-fill');
    numbers.forEach(num => {
      const target = parseFloat(num.dataset.target) || parseFloat(num.dataset.progress);
      const increment = target / 100;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        if (num.classList.contains('stat-number')) {
          num.textContent = num.classList.contains('percent') ? Math.floor(current) + '%' : Math.floor(current).toLocaleString() + (num.dataset.suffix || '');
        } else {
          num.style.width = current + '%';
        }
      }, 20);
    });
  }

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(container);

  // Hover effects
  document.querySelectorAll('.testimonial-card, .stat-card, .featured-story').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-5px)');
    card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
  });

  // Mobile horizontal scroll
  if (window.innerWidth < 768) {
    const grid = document.querySelector('.testimonials-grid');
    grid.style.overflowX = 'auto';
    grid.style.scrollSnapType = 'x mandatory';
    document.querySelectorAll('.testimonial-card').forEach(card => {
      card.style.scrollSnapAlign = 'start';
      card.style.flex = '0 0 90%';
    });
  }
});

