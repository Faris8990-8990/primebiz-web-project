document.addEventListener('DOMContentLoaded', () => {

  // Home CTA
  const cta = document.getElementById('ctaHome');
  if (cta) {
    cta.addEventListener('click', () => {
      window.location.href = 'services.html';
    });
  }

  // Slider
  const slides = document.querySelectorAll('.slide');
  let index = 0;
  if (slides.length) {
    setInterval(() => {
      slides[index].classList.remove('active');
      index = (index + 1) % slides.length;
      slides[index].classList.add('active');
    }, 3000);
  }

  // Testimonials rotation
  const testimonials = [
    { text: "We achieved rapid growth.", author: "— Ahmed, Tech Startup" },
    { text: "Professional and reliable team.", author: "— Sara, Fashion Brand" },
    { text: "Great consulting experience.", author: "— Imran, Services Firm" },
  ];

  const tText = document.getElementById('testimonialText');
  const tAuthor = document.getElementById('testimonialAuthor');

  let tIndex = 0;
  if (tText && tAuthor) {
    setInterval(() => {
      tIndex = (tIndex + 1) % testimonials.length;
      tText.textContent = testimonials[tIndex].text;
      tAuthor.textContent = testimonials[tIndex].author;
    }, 4000);
  }

  // Scroll reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Contact form backend connection
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const payload = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim()
      };

      if (!payload.name || !payload.email || !payload.message) {
        alert('Please fill all fields.');
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        alert(data.msg);    // Success message from backend
        form.reset();
      } catch (err) {
        alert("Server not running.");
      }
    });
  }

});
