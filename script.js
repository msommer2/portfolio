// Set current year in footer
const currentYear = new Date().getFullYear();
document.getElementById("year").textContent = currentYear;

//Mobile Nav 
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
});

// Close mobile menu on link click
const navItems = document.querySelectorAll(".nav-links a");
navItems.forEach(item => {
    item.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }   );
});

// Add active class to nav links on scroll
window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section");

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(item => {
        item.classList.remove("active");
        if (item.getAttribute("href") === `#${current}`) {
            item.classList.add("active");
        }
    });
});

// Hero Typewriter Effect
const heroTitle = document.querySelector("hero-title");
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }   
    }
window.addEventListener("load", typeWriter);
}
// Main Contact Button to open modal
const mainContactBtn = document.getElementById("mainContactBtn");
if (mainContactBtn) {
    mainContactBtn.addEventListener("click", () => {
        emailModal.classList.add("active");
    });
}

// EmailJS Integration
emailjs.init("ry8DfvJPX7fNprvap");

const floatingContactBtn = document.getElementById("floatingContactBtn");
const emailModal = document.getElementById("emailModal");
const modalClose = document.getElementById("modalClose");
const quickContactForm = document.getElementById("quickContactForm");

floatingContactBtn.addEventListener("click", () => {
  emailModal.classList.add("active");
});

modalClose.addEventListener("click", () => {
  emailModal.classList.remove("active");
});

emailModal.addEventListener("click", (e) => {
  if (e.target === emailModal) {
    emailModal.classList.remove("active");
  }
});

// Handle form submission with EmailJS
quickContactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const email = quickContactForm.querySelector('input[type="email"]').value;
  const subject = quickContactForm.querySelector('input[type="text"]').value;
  const message = quickContactForm.querySelector("textarea").value;

  // Show loading state
  const submitBtn = quickContactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Send email using EmailJS
  emailjs
    .send("service_ao5ymto", "template_hj9a00n", {
      from_email: email,
      subject: subject,
      message: message,
      to_name: "Matt Sommers",
    })
    .then((response) => {
      console.log("SUCCESS!", response.status, response.text);
      alert("Message sent successfully! Thanks for reaching out.");
      emailModal.classList.remove("active");
      quickContactForm.reset();
    })
    .catch((error) => {
      console.log("FAILED...", error);
      alert("Failed to send message. Please try again or email directly at sommers.matt@gmail.com.");
    })
    .finally(() => {
      // Reset button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
});

// Hide floating button when contact section is visible
const contactSection = document.getElementById("contact");
const floatingBtnObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        floatingContactBtn.classList.add("hidden");
      } else {
        floatingContactBtn.classList.remove("hidden");
      }
    });
  },
  {
    threshold: 0.3,
  }
);

floatingBtnObserver.observe(contactSection);

// Lightbox Logic
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

function openLightbox(imgElement) {
    if (lightbox && lightboxImg) {
        lightbox.style.display = "flex"; // Using flex to center
        lightbox.style.alignItems = "center";
        lightbox.style.justifyContent = "center";
        lightboxImg.src = imgElement.src;
        // Optional: Disable scrolling when lightbox is open
        document.body.style.overflow = "hidden";
    }
}

function closeLightbox() {
    if (lightbox) {
        lightbox.style.display = "none";
        // Re-enable scrolling
        document.body.style.overflow = "auto";
    }
}

// Close lightbox when pressing ESC key
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeLightbox();
    }
});
floatingBtnObserver.observe(contactSection);
