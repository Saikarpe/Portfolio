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
  background: linear-gradient(135deg, #00e5ff, #3d8bff);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 229, 255, 0.3);
  font-size: 16px;
`;

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTop.addEventListener('mouseover', () => {
  backToTop.style.transform = 'scale(1.15)';
  backToTop.style.boxShadow = '0 6px 30px rgba(0, 229, 255, 0.5)';
});
backToTop.addEventListener('mouseout', () => {
  backToTop.style.transform = 'scale(1)';
  backToTop.style.boxShadow = '0 4px 20px rgba(0, 229, 255, 0.3)';
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
      shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(0,229,255,0.08) 0%, transparent 60%)`;
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
    "skills": "Sai's skills include HTML, CSS, JavaScript, Java, C, SQL, Python, Machine Learning, and Computer Vision.",
    "languages": "Sai's skills include HTML, CSS, JavaScript, Java, C, SQL, Python, Machine Learning, and Computer Vision.",
    "education": "Sai is currently pursuing Electronics and Computer Engineering.",
    "contact": "You can contact Sai at karpesai0000@gmail.com or find him on LinkedIn. The links are on the 'Home' section of this page!",
    "about": "Sai is a passionate and curious engineer who loves creating intelligent, human-centered systems. Ask about 'skills' or 'projects' to learn more.",
    "biot": "The BIOT Arm is a Bionic and IoT combination project. You can see more on Sai's LinkedIn!",
    "jarvis": "JARVIS is an AI voice assistant built with Python. You can find it on Sai's GitHub.",
    "mart": "That's a Mart Management System using DBMS (SQL). The GitHub link is in the 'Projects' section.",
    "campusconnect": "CampusConnect is a college event management platform with interactive maps and RSVP system, built with PHP, MySQL, and Leaflet.js.",
    "churn": "The E-Commerce Churn Predictor uses ML with PCA, scaling, and serialized model pipelines to predict customer behavior.",
    "bye": "Goodbye! Have a great day.",
    "default": "I'm not sure I understand. Try asking about 'projects', 'skills', 'education', or 'contact'."
  };

  // --- 3. The function that finds an answer ---
  function getBotResponse(userInput) {
    let query = userInput.toLowerCase().trim();

    if (qaDatabase[query]) return qaDatabase[query];

    if (query.includes("project")) return qaDatabase["projects"];
    if (query.includes("skill") || query.includes("language")) return qaDatabase["skills"];
    if (query.includes("contact") || query.includes("email") || query.includes("phone")) return qaDatabase["contact"];
    if (query.includes("about") || query.includes("who is")) return qaDatabase["about"];
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
  emailjs.init('WgEnSGl1i-rW7p16X');

  document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    emailjs.sendForm('service_j531c51', 'template_1wmvkqf', this, 'WgEnSGl1i-rW7p16X')
      .then(function () {
        alert('Message sent successfully!');
        document.getElementById('contact-form').reset();
      }, function (error) {
        alert('Failed to send message. Please try again.');
        console.error('EmailJS error:', error);
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
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animElements = document.querySelectorAll('.animate-hidden');
  animElements.forEach(el => observer.observe(el));
});