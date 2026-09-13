// NAV LINK SCROLL & ACTIVE STATE
const navLinks = document.querySelectorAll('.ul-list li a');
const sections = document.querySelectorAll('section');

function removeActive() {
  navLinks.forEach(link => link.parentElement.classList.remove('active'));
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 80,
      behavior: 'smooth'
    });

    removeActive();
    link.parentElement.classList.add('active');
  });
});

// SCROLL HANDLER (section detect + back to top)
window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      removeActive();
      const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
      if (activeLink) activeLink.parentElement.classList.add('active');
    }
  });

  // Back-to-top button visibility
  if (window.scrollY > 500) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }
});

// BACK TO TOP BUTTON CREATION
const backToTop = document.createElement('div');
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
backToTop.id = "back-to-top";
document.body.appendChild(backToTop);

backToTop.style.cssText = `
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: var(--gradient);
  color: var(--on-accent);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(var(--accent-rgb), 0.3);
  font-size: 16px;
`;

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTop.addEventListener('mouseover', () => {
  backToTop.style.transform = 'scale(1.15)';
  backToTop.style.boxShadow = '0 6px 30px rgba(var(--accent-rgb), 0.5)';
});
backToTop.addEventListener('mouseout', () => {
  backToTop.style.transform = 'scale(1)';
  backToTop.style.boxShadow = '0 4px 20px rgba(var(--accent-rgb), 0.3)';
});

// 3D TILT CARD EFFECT
function initTiltCards() {
  const tiltTargets = document.querySelectorAll('.project-card, .c1, .contact-info, .contact-form');
  
  tiltTargets.forEach(card => {
    card.classList.add('tilt-card');
    card.style.position = 'relative';
    
    // Add shine overlay
    const shine = document.createElement('div');
    shine.classList.add('tilt-shine');
    card.appendChild(shine);

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      
      // Move shine based on mouse
      const shineX = (x / rect.width) * 100;
      const shineY = (y / rect.height) * 100;
      shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(var(--accent-rgb),0.08) 0%, transparent 60%)`;
      shine.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
      card.style.transition = 'transform 0.5s ease';
      shine.style.opacity = '0';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });
}

document.addEventListener('DOMContentLoaded', initTiltCards);

// TYPING ANIMATION
const typingElement = document.querySelector('.info-home h3');
const words = ["Continuous Learner", "AIML Enthusiast", "Full-Stack Developer", "Data Analyst"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
  const currentWord = words[wordIndex];
  let displayedText = currentWord.substring(0, charIndex);

  typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(type, typingSpeed);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, typingSpeed / 2);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(type, 1000);
  }
}

document.addEventListener('DOMContentLoaded', type);

// LOADING SCREEN LOGIC
document.addEventListener("DOMContentLoaded", () => {
  const loadingText = document.getElementById("loading-text");
  const mainIcon = document.querySelector(".main-icon");
  const subIcons = document.querySelectorAll(".sub-icons i");
  const designerText = document.getElementById("designer-text");
  const mainPage = document.getElementById("main-page");
  const loadingScreen = document.getElementById("loading-screen");

  function showElement(element, delay = 0) {
    setTimeout(() => {
      element.classList.remove("hidden");
      element.classList.add("fall");
    }, delay);
  }

  showElement(loadingText, 0);
  showElement(mainIcon, 800);
  subIcons.forEach((icon, idx) => {
    showElement(icon, 1600 + idx * 400);
  });
  showElement(designerText, 2800);

  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    setTimeout(() => loadingScreen.style.display = "none", 500);
    if (mainPage) mainPage.classList.add("visible");
  }, 4000);
});

/* ====== START: CHATBOT JAVASCRIPT ====== */

// Wait for the DOM to be fully loaded before running chat logic
document.addEventListener("DOMContentLoaded", () => {

  // --- 1. Select all our chat elements ---
  const chatToggler = document.getElementById("chat-toggler");
  const chatWidget = document.getElementById("chat-widget");
  const chatCloseBtn = document.getElementById("chat-close-btn");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const chatSendBtn = document.getElementById("chat-send-btn");

  // --- 2. Define the bot's "brain" ---
  const qaDatabase = {
    "hello": "Hi there! What can I tell you about Sai?",
    "hi": "Hi there! What can I tell you about Sai?",
    "projects": "Sai has worked on several projects, including 'JARVIS AI Assistant', 'E-Commerce Churn Predictor', 'BIOT Arm', 'CampusConnect', 'Object Detection', and more. Which one would you like to know about?",
    "skills": "Sai's skills include Python, HTML, CSS, JavaScript, Java, PHP, Angular, SQL, Git & GitHub, Machine Learning, Data Science, and DSA. Check out the Skills section for visual proficiency levels!",
    "languages": "Sai's skills include Python, HTML, CSS, JavaScript, Java, PHP, Angular, SQL, Git & GitHub, Machine Learning, Data Science, and DSA.",
    "education": "Sai is pursuing B.Tech in Electronics & Computer Engineering at Sanjivani College of Engineering, Kopargaon (CGPA: 8.2). He completed 12th from Shree Ganesh Junior College (78%) and 10th from Shree Ganesh International School (89.60%).",
    "contact": "You can contact Sai at karpesai0000@gmail.com or find him on LinkedIn. The links are on the 'Home' section of this page!",
    "about": "Sai is a passionate and curious engineer who loves creating intelligent, human-centered systems. Ask about 'skills' or 'projects' to learn more.",
    "certifications": "Sai has 15+ certifications and a patent! Scroll down to the Certifications & Patent section to view them all. Click any certificate to see it in full size.",
    "patent": "Yes! Sai has a published patent. You can view it in the Certifications & Patent section of this portfolio.",
    "certificates": "Sai has 15+ certifications across AI, ML, and various tech domains. Check out the Certifications section to see them all!",
    "tech": "Sai's tech stack includes Python, HTML5, CSS3, JavaScript, Java, PHP, Angular, Git, GitHub, MySQL, AI/ML, and Data Science.",
    "biot": "The BIOT Arm is a Bionic and IoT combination project. You can see more on Sai's LinkedIn!",
    "jarvis": "JARVIS is an AI voice assistant built with Python. You can find it on Sai's GitHub.",
    "mart": "That's a Mart Management System using DBMS (SQL). The GitHub link is in the 'Projects' section.",
    "campusconnect": "CampusConnect is a college event management platform with interactive maps and RSVP system, built with PHP, MySQL, and Leaflet.js.",
    "churn": "The E-Commerce Churn Predictor uses ML with PCA, scaling, and serialized model pipelines to predict customer behavior.",
    "bye": "Goodbye! Have a great day.",
    "default": "I'm not sure I understand. Try asking about 'projects', 'skills', 'education', 'certifications', or 'contact'."
  };

  // --- 3. The function that finds an answer ---
  function getBotResponse(userInput) {
    let query = userInput.toLowerCase().trim();

    if (qaDatabase[query]) return qaDatabase[query];

    if (query.includes("project")) return qaDatabase["projects"];
    if (query.includes("skill") || query.includes("language")) return qaDatabase["skills"];
    if (query.includes("contact") || query.includes("email") || query.includes("phone")) return qaDatabase["contact"];
    if (query.includes("about") || query.includes("who is")) return qaDatabase["about"];
    if (query.includes("cert") || query.includes("award") || query.includes("achievement")) return qaDatabase["certifications"];
    if (query.includes("patent")) return qaDatabase["patent"];
    if (query.includes("tech") || query.includes("stack") || query.includes("tool")) return qaDatabase["tech"];
    if (query.includes("educat") || query.includes("college") || query.includes("school") || query.includes("degree")) return qaDatabase["education"];
    if (query.includes("biot")) return qaDatabase["biot"];
    if (query.includes("jarvis")) return qaDatabase["jarvis"];
    if (query.includes("mart") || query.includes("dbms")) return qaDatabase["mart"];
    if (query.includes("campus")) return qaDatabase["campusconnect"];
    if (query.includes("churn") || query.includes("ecommerce") || query.includes("predict")) return qaDatabase["churn"];
    if (query.includes("bye") || query.includes("thanks")) return qaDatabase["bye"];

    return qaDatabase["default"];
  }

  // --- 4. Function to add a message to the chat window ---
  function addMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message", sender);
    const messageP = document.createElement("p");
    messageP.textContent = message;
    messageDiv.appendChild(messageP);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // --- 5. Function to handle sending a message ---
  function handleSendMessage() {
    const userMessage = chatInput.value;
    if (userMessage.trim() === "") return;

    addMessage(userMessage, "user");
    chatInput.value = "";

    setTimeout(() => {
      const botMessage = getBotResponse(userMessage);
      addMessage(botMessage, "bot");
    }, 500);
  }

  // --- 6. Event Listeners ---
  chatToggler.addEventListener("click", () => {
    chatWidget.classList.toggle("show");
  });

  chatCloseBtn.addEventListener("click", () => {
    chatWidget.classList.remove("show");
  });

  chatSendBtn.addEventListener("click", handleSendMessage);

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  });

  // ====== MOBILE NAVBAR ENHANCEMENTS ======
  function handleMobileScroll() {
    const header = document.querySelector('.header-list');
    const scrollY = window.scrollY;

    if (window.innerWidth <= 768) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }

  function addMobileTouchFeedback() {
    if (window.innerWidth <= 768) {
      const navItems = document.querySelectorAll('.ul-list li');
      navItems.forEach(item => {
        item.addEventListener('touchstart', function () {
          if (!this.classList.contains('active')) {
            this.style.transform = 'scale(0.95)';
          }
        });
        item.addEventListener('touchend', function () {
          this.style.transform = '';
        });
      });
    }
  }

  function initMobileNav() {
    if (window.innerWidth <= 768) {
      handleMobileScroll();
      addMobileTouchFeedback();
    }
  }

  window.addEventListener('scroll', handleMobileScroll);
  initMobileNav();
  window.addEventListener('resize', initMobileNav);
});
/* ====== END: CHATBOT JAVASCRIPT ====== */

// Contact Form Handling with EmailJS
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const btn = document.getElementById('form-submit');
  const btnLabel = document.getElementById('form-submit-label');
  const status = document.getElementById('form-status');
  const honeypot = document.getElementById('form-website');
  let sending = false;

  function setStatus(msg, kind) {
    status.textContent = msg;
    status.className = 'form-status' + (kind ? ' is-' + kind : '');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (sending) return;                              // no double submits

    // A bot filled the hidden field — pretend it worked, send nothing.
    if (honeypot && honeypot.value) {
      setStatus('Thanks — your message has been sent.', 'ok');
      form.reset();
      return;
    }

    if (!form.checkValidity()) {
      setStatus('Please fill in every field with a valid email address.', 'err');
      form.reportValidity();
      return;
    }

    // The EmailJS bundle is deferred, so it lands after this file runs —
    // initialise it on first use rather than at load time.
    if (typeof emailjs === 'undefined') {
      setStatus('Mail service did not load. Please email me directly instead.', 'err');
      return;
    }
    if (!form.dataset.emailjsReady) {
      emailjs.init('WgEnSGl1i-rW7p16X');
      form.dataset.emailjsReady = '1';
    }

    sending = true;
    btn.disabled = true;
    btnLabel.textContent = 'Sending…';
    setStatus('Sending your message…');

    emailjs.sendForm('service_j531c51', 'template_1wmvkqf', form, 'WgEnSGl1i-rW7p16X')
      .then(function () {
        setStatus('Thanks — your message has been sent. I usually reply within a day.', 'ok');
        form.reset();
      })
      .catch(function (error) {
        setStatus('Could not send that. Please try again, or email me directly.', 'err');
        console.error('EmailJS error:', error);
      })
      .finally(function () {
        sending = false;
        btn.disabled = false;
        btnLabel.textContent = 'Send Message';
      });
  });
})();

// ====== SCROLL ANIMATION OBSERVER ======
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');

        // Kick off the radial skill rings once the section is on screen
        if (entry.target.classList.contains('skills-tabs-wrapper')) {
          setTimeout(() => animateVisibleRings(), 300);
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animElements = document.querySelectorAll('.animate-hidden');
  animElements.forEach(el => observer.observe(el));

  // Reveal certificate tiles as they scroll into view
  const certObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -40px 0px', threshold: 0.1 });

  document.querySelectorAll('.cert-tile').forEach((tile, i) => {
    tile.style.transitionDelay = `${Math.min(i % 8, 8) * 40}ms`;
    certObserver.observe(tile);
  });
});

// ====== SKILLS RADIAL RINGS ======
const RING_CIRCUMFERENCE = 2 * Math.PI * 52; // matches r=52 in the SVG markup

function animateSkillRing(card) {
  const percent = parseFloat(card.getAttribute('data-percent')) || 0;
  const fill = card.querySelector('.ring-fill');
  const percentLabel = card.querySelector('.ring-percent');
  if (!fill || !percentLabel || card.dataset.animated === 'true') return;
  card.dataset.animated = 'true';

  const offset = RING_CIRCUMFERENCE - (percent / 100) * RING_CIRCUMFERENCE;
  fill.style.transition = 'none';
  fill.style.strokeDashoffset = RING_CIRCUMFERENCE;

  requestAnimationFrame(() => {
    fill.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(.25,.8,.25,1)';
    fill.style.strokeDashoffset = offset;
  });

  const duration = 1400;
  const start = performance.now();
  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    percentLabel.textContent = Math.round(t * percent) + '%';
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function animateVisibleRings() {
  document.querySelectorAll('.skill-ring-card.show').forEach(card => {
    card.classList.add('in');
    animateSkillRing(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.skills-tab');
  const cards = document.querySelectorAll('.skill-ring-card');
  if (!tabs.length || !cards.length) return;

  // Show the first (active) category's cards on load
  cards.forEach(card => {
    if (card.getAttribute('data-category') === 'ai') {
      card.classList.add('show');
    }
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains('active')) return;
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const category = tab.getAttribute('data-category');
      cards.forEach(card => {
        if (card.getAttribute('data-category') === category) {
          card.classList.add('show');
          requestAnimationFrame(() => card.classList.add('in'));
        } else {
          card.classList.remove('show', 'in');
        }
      });

      // Animate the newly-shown rings on first reveal
      requestAnimationFrame(() => animateVisibleRings());
    });
  });
});

// ====== LIGHTBOX FOR CERTIFICATES ======
let lightboxOpener = null;

function openLightbox(src) {
  const overlay = document.getElementById('lightbox-overlay');
  const img = document.getElementById('lightbox-img');
  img.src = src;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  // Remember who opened it so focus can go back there on close.
  lightboxOpener = document.activeElement;
  const closeBtn = overlay.querySelector('.lightbox-close');
  if (closeBtn) closeBtn.focus();
}

function closeLightbox() {
  const overlay = document.getElementById('lightbox-overlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
  // Send focus back to the tile that opened it, so keyboard users don't
  // get dropped at the top of the page.
  if (lightboxOpener && typeof lightboxOpener.focus === 'function') {
    lightboxOpener.focus();
    lightboxOpener = null;
  }
}

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ====== CUSTOM CURSOR + PHYSICS TRAIL ======
// Positions are driven entirely through `transform` (GPU-composited) instead
// of `left`/`top` (which forces a layout reflow on every mousemove and was
// the actual cause of the visible lag) — one rAF loop, no layout writes.
(function() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  // Only hide the native cursor once we know the replacement is running, and
  // never for visitors who asked for reduced motion or are on touch.
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || calm) return;
  document.body.classList.add('custom-cursor-on');

  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let dotX = mouseX, dotY = mouseY;
  let ringX = mouseX, ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function animate() {
    // Dot: snaps close to instantly so the pointer never feels behind.
    dotX += (mouseX - dotX) * 0.55;
    dotY += (mouseY - dotY) * 0.55;
    // Ring: eases in behind it for the trailing "physics" feel.
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(animate);
  }
  animate();

  // Hover state detection for buttons/links
  const interactives = document.querySelectorAll('a, button, .btn, .btn-home1, .btn-home2, .btn-send, .social-link, .cert-tile, .skills-tab, .patent-card, .c1, .project-card, #chat-toggler, #chat-close-btn, #chat-send-btn, .lightbox-close, #theme-toggle');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering-link'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering-link'));
  });
})();

// ====== SCROLL PROGRESS BAR ======
window.addEventListener('scroll', () => {
  const scrollProgress = document.getElementById('scroll-progress');
  if (!scrollProgress) return;
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (totalHeight > 0) {
    const progress = (window.pageYOffset / totalHeight) * 100;
    scrollProgress.style.width = progress + '%';
  }
});

// ====== INTERACTIVE PARTICLE BACKGROUND ======
(function() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  // Skip the whole ambient loop for visitors who asked for reduced motion.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let mouse = { x: null, y: null, radius: 100 };
  // Cached once per animation frame (not per-particle) so particles follow
  // the active theme's accent color without a getComputedStyle() call per dot.
  let accentRgb = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || '255,167,38';

  // Track mouse coordinates relative to viewport
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 2 + 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.density = (Math.random() * 30) + 1;
    }

    draw() {
      ctx.fillStyle = `rgba(${accentRgb}, 0.45)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    update() {
      // Float naturally
      this.x += this.speedX;
      this.y += this.speedY;

      // Bounce off screen boundaries
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

      // Mouse interactive push effect
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.hypot(dx, dy);
        
        if (distance < mouse.radius) {
          let force = (mouse.radius - distance) / mouse.radius;
          let directionX = dx / distance;
          let directionY = dy / distance;
          // Push away
          this.x -= directionX * force * 5;
          this.y -= directionY * force * 5;
        }
      }
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 25000));
    for (let i = 0; i < count; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push(new Particle(x, y));
    }
  }

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        let dx = particles[a].x - particles[b].x;
        let dy = particles[a].y - particles[b].y;
        let distance = Math.hypot(dx, dy);
        
        if (distance < 120) {
          let opacity = (1 - (distance / 120)) * 0.15;
          ctx.strokeStyle = `rgba(${accentRgb}, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
  }

  // Re-read the accent color only when the theme actually changes (see the
  // 'themechange' event dispatched by the theme-toggle below) instead of
  // every frame — keeps this a plain, cheap CSS-var read.
  window.addEventListener('themechange', () => {
    accentRgb = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || accentRgb;
  });

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  animate();
})();

// ====== ANIMATED STATS COUNTER ======
document.addEventListener('DOMContentLoaded', () => {
  const statsSection = document.getElementById('stats');
  if (!statsSection) return;

  const statNumbers = document.querySelectorAll('.stat-number');
  let started = false;

  const countUp = () => {
    statNumbers.forEach(num => {
      const targetStr = num.getAttribute('data-target');
      const suffix = num.getAttribute('data-suffix') || '';
      const target = parseFloat(targetStr);
      const hasDecimal = targetStr.includes('.');
      
      let current = 0;
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // ~60fps

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          num.textContent = (hasDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
          requestAnimationFrame(updateCounter);
        } else {
          num.textContent = (hasDecimal ? target.toFixed(1) : target) + suffix;
        }
      };
      updateCounter();
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        setTimeout(countUp, 200);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsSection);
});

// ====== MAGNETIC HOVER BUTTONS ======
(function() {
  const magnetics = document.querySelectorAll('.btn-home1, .btn-home2, .btn-send, .social-link');
  magnetics.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - (rect.width / 2);
      const y = e.clientY - rect.top - (rect.height / 2);
      
      // Pull element toward cursor by 30% of distance
      btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px) scale(1.05)`;
      btn.style.transition = 'transform 0.1s ease-out';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
  });
})();

// ====== PARALLAX SCROLL EFFECT ON ORBS ======
window.addEventListener('scroll', () => {
  const orbs = document.querySelectorAll('.orb');
  const scrollY = window.pageYOffset;
  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 0.08;
    orb.style.transform = `translateY(${scrollY * speed}px)`;
  });
});

// ====== THEME TOGGLE (Light / Dark) ======
(function () {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;
  const root = document.documentElement;
  const icon = toggleBtn.querySelector('i');

  function getEffectiveTheme() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function updateIcon() {
    icon.className = getEffectiveTheme() === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  }

  toggleBtn.addEventListener('click', () => {
    const next = getEffectiveTheme() === 'dark' ? 'light' : 'dark';
    if (next === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
    try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
    updateIcon();
    // Lets canvas-drawn UI (the particle background) that can't use CSS
    // vars directly re-read the new accent color.
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: next } }));
  });

  updateIcon();
})();