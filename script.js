document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. STICKY NAVIGATION & MOBILE MENU
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLogo = document.querySelector('.nav-logo');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Sticky Header on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Hamburger Toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        navLogo.classList.toggle('nav-open-logo'); // Changes logo color when menu is open on transparent hero
    });

    // Close Mobile Menu on Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navLogo.classList.remove('nav-open-logo');
        });
    });


    /* ==========================================================================
       2. SCROLL REVEAL ANIMATION
       ========================================================================== */
    const faders = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });


    /* ==========================================================================
       3. PORTFOLIO LIGHTBOX (Vanilla JS)
       ========================================================================== */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCounter = document.getElementById('lightbox-counter');
    
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    // Select all images inside the masonry gallery
    const galleryItems = document.querySelectorAll('.masonry-item img');
    let currentIndex = 0;
    let imagesArray = [];

    // Extract src from all images and add click event
    galleryItems.forEach((img, index) => {
        imagesArray.push(img.src);
        
        img.addEventListener('click', () => {
            currentIndex = index;
            updateLightboxContent();
            openLightbox();
        });
    });

    function openLightbox() {
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore background scrolling
    }

    function updateLightboxContent() {
        lightboxImg.src = imagesArray[currentIndex];
        lightboxCounter.textContent = `${currentIndex + 1} / ${imagesArray.length}`;
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % imagesArray.length;
        updateLightboxContent();
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
        updateLightboxContent();
    }

    // Lightbox Button Listeners
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);

    // Close when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard Accessibility for Lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
    });


    /* ==========================================================================
       4. CONTACT FORM PLACEHOLDER LOGIC
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent page reload
        
        // Show friendly placeholder message
        formMessage.style.display = 'block';
        
        // Optional: clear the form fields
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });

});