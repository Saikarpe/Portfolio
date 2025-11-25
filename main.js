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
  background: #474af0;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease;
`;

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTop.addEventListener('mouseover', () => backToTop.style.transform = 'scale(1.2)');
backToTop.addEventListener('mouseout', () => backToTop.style.transform = 'scale(1)');

// CARD HOVER EFFECT
const cards = document.querySelectorAll('.project-card, .c1, .service-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px) scale(1.05)');
  card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
});

// TYPING ANIMATION
const typingElement = document.querySelector('.info-home h3');
const words = ["Frontend Developer", "AIML Enthusiast", "Python Enthusiast", "Data Analyst"];
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
    mainPage.classList.add("visible");
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

  // --- 2. Define the bot's "brain" (This is where you customize answers) ---
  const qaDatabase = {
    "hello": "Hi there! What can I tell you about Sai?",
    "hi": "Hi there! What can I tell you about Sai?",
    "projects": "Sai has worked on several projects, including a 'BIOT Arm', a 'JARVIS-An AI voice Assistant', and a 'Mart Management System'. Which one would you like to know about?",
    "skills": "Sai's skills include HTML, CSS, JavaScript, Java, C, SQL, and Python.",
    "languages": "Sai's skills include HTML, CSS, JavaScript, Java, C, SQL, and Python.",
    "education": "Sai is currently pursuing Electronics and Computer Engineering.",
    "contact": "You can contact Sai at karpesai0000@gmail.com or find him on LinkedIn. The links are on the 'Home' section of this page!",
    "about": "Sai is a passionate and curious engineer who loves creating intelligent, human-centered systems. Ask about 'skills' or 'projects' to learn more.",
    "biot": "The BIOT Arm is a Bionic and IoT combination project. You can see more on Sai's LinkedIn!",
    "jarvis": "JARVIS is an AI voice assistant built with Python. You can find it on Sai's GitHub.",
    "mart": "That's a Mart Management System using DBMS (SQL). The GitHub link is in the 'Projects' section.",
    "bye": "Goodbye! Have a great day.",
    "default": "I'm not sure I understand. Try asking about 'projects', 'skills', 'education', or 'contact'."
  };

  // --- 3. The function that finds an answer ---
  function getBotResponse(userInput) {
    let query = userInput.toLowerCase().trim();

    // Direct match
    if (qaDatabase[query]) {
      return qaDatabase[query];
    }

    // Keyword matching
    if (query.includes("project")) return qaDatabase["projects"];
    if (query.includes("skill") || query.includes("language")) return qaDatabase["skills"];
    if (query.includes("contact") || query.includes("email") || query.includes("phone")) return qaDatabase["contact"];
    if (query.includes("about") || query.includes("who is")) return qaDatabase["about"];
    if (query.includes("biot")) return qaDatabase["biot"];
    if (query.includes("jarvis")) return qaDatabase["jarvis"];
    if (query.includes("mart") || query.includes("dbms")) return qaDatabase["mart"];
    if (query.includes("bye") || query.includes("thanks")) return qaDatabase["bye"];

    // Default fallback
    return qaDatabase["default"];
  }

  // --- 4. Function to add a message to the chat window ---
  // 'sender' will be either 'user' or 'bot'
  function addMessage(message, sender) {
    // Create a new message div
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message", sender);
    
    // Create the paragraph and add the text
    const messageP = document.createElement("p");
    messageP.textContent = message;
    
    // Add the paragraph to the div
    messageDiv.appendChild(messageP);
    
    // Add the new message div to the chat window
    chatMessages.appendChild(messageDiv);
    
    // Auto-scroll to the bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // --- 5. Function to handle sending a message ---
  function handleSendMessage() {
    const userMessage = chatInput.value;
    if (userMessage.trim() === "") return; // Don't send empty messages

    // 1. Display the user's message
    addMessage(userMessage, "user");
    
    // 2. Clear the input field
    chatInput.value = "";

    // 3. Get and display the bot's response
    setTimeout(() => {
      const botMessage = getBotResponse(userMessage);
      addMessage(botMessage, "bot");
    }, 500); // Add a small delay for realism
  }

  // --- 6. Event Listeners ---
  
  // Show/Hide the chat widget
  chatToggler.addEventListener("click", () => {
    chatWidget.classList.toggle("show");
  });

  chatCloseBtn.addEventListener("click", () => {
    chatWidget.classList.remove("show");
  });

  // Send message on button click
  chatSendBtn.addEventListener("click", handleSendMessage);

  // Send message on "Enter" key press
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  });
  // ====== MOBILE NAVBAR ENHANCEMENTS ======

// Mobile scroll effect
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

// Touch feedback for mobile nav items
function addMobileTouchFeedback() {
  if (window.innerWidth <= 768) {
    const navItems = document.querySelectorAll('.ul-list li');
    
    navItems.forEach(item => {
      // Touch start effect
      item.addEventListener('touchstart', function() {
        if (!this.classList.contains('active')) {
          this.style.transform = 'scale(0.95)';
        }
      });
      
      // Touch end effect
      item.addEventListener('touchend', function() {
        this.style.transform = '';
      });
    });
  }
}

// Initialize mobile enhancements
function initMobileNav() {
  if (window.innerWidth <= 768) {
    handleMobileScroll();
    addMobileTouchFeedback();
    
    // Update active section with mobile offset
    const navLinks = document.querySelectorAll('.ul-list li a');
    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        // Mobile-specific scroll offset
        const mobileOffset = 80;
        
        window.scrollTo({
          top: targetSection.offsetTop - mobileOffset,
          behavior: 'smooth'
        });

        removeActive();
        link.parentElement.classList.add('active');
      });
    });
  }
}

// Update scroll handler for mobile
window.addEventListener('scroll', function() {
  handleMobileScroll();
});

// Initialize on load and resize
document.addEventListener('DOMContentLoaded', function() {
  initMobileNav();
});

// Re-initialize on resize
window.addEventListener('resize', function() {
  initMobileNav();
});
});
/* ====== END: CHATBOT JAVASCRIPT ====== */ 