document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      nav.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      nav.classList.remove("active");
    });
  });

  // Testimonial slider functionality
  const initTestimonialSlider = () => {
    const slides = document.querySelectorAll(".testimonial-slide");
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");
    const dots = document.querySelectorAll(".dot");
    let currentSlide = 0;

    if (!slides.length) return; // Exit if no slides found

    // Function to show a specific slide
    const showSlide = (index) => {
      slides.forEach((slide) => slide.classList.remove("active"));
      slides[index].classList.add("active");

      dots.forEach((dot) => dot.classList.remove("active"));
      dots[index].classList.add("active");

      currentSlide = index;
    };

    // Event listeners for controls
    if (prevButton) {
      prevButton.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      });
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
      });
    });

    // Auto slide change every 5 seconds
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);
  };

  // Initialize testimonial slider
  initTestimonialSlider();

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Active link highlighting based on scroll position
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Form submission
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Simple validation
      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields");
        return;
      }

      // Reset form (in a real application, you would send this data to a server)
      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();
    });
  }

  // Animation on scroll - add the visible class to elements as they scroll into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".service-card, .portfolio-item, .pricing-card");

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Initial check on page load
});

// Testimonial Slider (if you want to add one in the future)
class TestimonialSlider {
  constructor(sliderSelector) {
    this.slider = document.querySelector(sliderSelector);
    if (!this.slider) return;

    this.slides = this.slider.querySelectorAll(".testimonial-slide");
    this.currentSlide = 0;
    this.slideCount = this.slides.length;

    this.init();
  }

  init() {
    this.createControls();
    this.showSlide(this.currentSlide);
    this.autoSlide();
  }

  createControls() {
    const controls = document.createElement("div");
    controls.className = "testimonial-controls";

    const prevButton = document.createElement("button");
    prevButton.className = "prev-button";
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.addEventListener("click", () => this.prevSlide());

    const nextButton = document.createElement("button");
    nextButton.className = "next-button";
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.addEventListener("click", () => this.nextSlide());

    controls.appendChild(prevButton);
    controls.appendChild(nextButton);
    this.slider.appendChild(controls);
  }

  showSlide(index) {
    this.slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slideCount;
    this.showSlide(this.currentSlide);
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
    this.showSlide(this.currentSlide);
  }

  autoSlide() {
    setInterval(() => this.nextSlide(), 5000);
  }
}
