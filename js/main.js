/**
 * Hill-Top Academy International
 * Premium Cinematic Animations with GSAP & ScrollTrigger
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
  // Initialize GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Initialize video with safe autoplay
  initVideoAutoplay();

  // Initialize all animations
  initHeroAnimations();
  initScrollAnimations();
  initHeaderScroll();
  initCounterAnimations();
  initSmoothScrolling();
  initCampaignModal();
  initSidebarNavigation();
  initMobileMenu();
  initFullscreenDrawer();
  initGlanceTilesV2();
});

/**
 * Safe Video Autoplay
 * Handles video autoplay with fallback for browsers that block it
 */
function initVideoAutoplay() {
  const video = document.getElementById('heroVideo');

  if (!video) return;

  // Try to play - handles autoplay restrictions
  const playVideo = function () {
    video.play().catch(function (error) {
      // Auto-play was prevented
      console.log('Video autoplay prevented, showing poster image');
      video.poster = video.getAttribute('poster');
    });
  };

  // Attempt to play when metadata loads
  video.addEventListener('loadedmetadata', playVideo);

  // Also try immediately in case it's already loaded
  if (video.readyState >= 1) {
    playVideo();
  }
}

/**
 * Hero Section Animations
 */
function initHeroAnimations() {
  const heroSection = document.getElementById('heroSection');

  if (!heroSection) return;

  const timeline = gsap.timeline();

  // Hero title animation
  timeline.to('#heroTitle', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.2
  });

  // Hero subtitle animation
  timeline.to('#heroSubtitle', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6');

  // Hero actions animation
  timeline.to('#heroActions', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power3.out'
  }, '-=0.4');

  // Scroll indicator animation
  const scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    timeline.to(scrollIndicator, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.2');
  }

  // Video subtle animation
  gsap.to('.hero-video', {
    scale: 1.05,
    duration: 20,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
}

/**
 * Scroll-Driven Section Animations
 */
function initScrollAnimations() {
  // Fade up animations
  const fadeUpElements = document.querySelectorAll('.gsap-fade-up');

  fadeUpElements.forEach((el, index) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      delay: (el.dataset.delay || 0) / 1000
    });
  });

  // Fade up delay animations
  const fadeUpDelayElements = document.querySelectorAll('.gsap-fade-up-delay');

  fadeUpDelayElements.forEach((el, index) => {
    const delay = parseInt(el.dataset.delay) || (index * 80);

    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      delay: delay / 1000
    });
  });

  // Parallax effect for images
  gsap.utils.toArray('.image-placeholder').forEach(img => {
    gsap.to(img, {
      scrollTrigger: {
        trigger: img,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      },
      y: -20,
      ease: 'none'
    });
  });

  // Section dividers animation
  gsap.utils.toArray('.section-divider').forEach(divider => {
    gsap.fromTo(divider,
      { opacity: 0, scale: 0.95 },
      {
        scrollTrigger: {
          trigger: divider,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      }
    );
  });

  // Feature cards stagger animation
  gsap.utils.toArray('.feature-card').forEach((card, index) => {
    gsap.fromTo(card,
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: index * 0.08
      }
    );
  });

  // Value cards stagger animation
  gsap.utils.toArray('.value-card').forEach((card, index) => {
    gsap.fromTo(card,
      { opacity: 0, y: 25 },
      {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: index * 0.08
      }
    );
  });

  // News cards stagger animation
  gsap.utils.toArray('.news-card').forEach((card, index) => {
    gsap.fromTo(card,
      { opacity: 0, y: 20 },
      {
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        delay: index * 0.08
      }
    );
  });

  // Event rows animation
  gsap.utils.toArray('.event-row').forEach((row, index) => {
    gsap.fromTo(row,
      { opacity: 0, x: -15 },
      {
        scrollTrigger: {
          trigger: row,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: 'power2.out',
        delay: index * 0.06
      }
    );
  });

  // CTA section animation
  const ctaSection = document.getElementById('ctaSection');
  if (ctaSection) {
    gsap.fromTo('.cta-content',
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: ctaSection,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }
    );
  }
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
  const header = document.getElementById('mainHeader');

  if (!header) return;

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Add scrolled class for style changes
    if (currentScrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hide/show header on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 150) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;
  });
}

/**
 * Counter Animations for Statistics
 */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.stat-number[data-count]');

  counters.forEach(counter => {
    const target = parseInt(counter.dataset.count);

    gsap.to(counter, {
      scrollTrigger: {
        trigger: counter,
        start: 'top 85%',
        once: true
      },
      innerHTML: target,
      duration: 1.5,
      ease: 'power2.out',
      snap: { innerHTML: 1 },
      onUpdate: function () {
        counter.innerHTML = Math.ceil(this.targets()[0].innerHTML);
      }
    });
  });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const target = document.querySelector(targetId);

      if (target) {
        const headerHeight = document.getElementById('mainHeader')?.offsetHeight || 70;

        gsap.to(window, {
          duration: 0.8,
          scrollTo: {
            y: target,
            offsetY: headerHeight
          },
          ease: 'power3.inOut'
        });
      }
    });
  });
}

/**
 * Campaign Modal System
 */
function initCampaignModal() {
  // Check if modal exists (only on portal pages)
  const modal = document.getElementById('campaignModal');

  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close');
  const dismissBtn = modal.querySelector('.modal-dismiss');

  // Show modal after delay
  setTimeout(() => {
    showModal();
  }, 2500);

  // Close modal functions
  function showModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function hideModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';

    // Store in localStorage
    localStorage.setItem('campaignModalDismissed', 'true');
    localStorage.setItem('campaignModalDate', new Date().toDateString());
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', hideModal);
  }

  if (dismissBtn) {
    dismissBtn.addEventListener('click', hideModal);
  }

  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      hideModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      hideModal();
    }
  });
}

/**
 * Sidebar Navigation Functionality
 */
function initSidebarNavigation() {
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a');

  if (!sidebarLinks.length) return;

  // Handle hash in URL on page load
  const hash = window.location.hash;
  if (hash) {
    const targetSection = document.querySelector(hash);
    if (targetSection) {
      setTimeout(() => {
        scrollToSection(hash);
      }, 100);
    }
  }

  sidebarLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const href = this.getAttribute('href');

      // Skip if it's an external link
      if (href.startsWith('http') || href.startsWith('../')) return;

      if (href.startsWith('#')) {
        // Update URL without scrolling
        history.pushState(null, null, href);

        // Scroll to section
        scrollToSection(href);

        // Update active state
        updateActiveState(this);
      }
    });
  });

  function scrollToSection(href) {
    const targetId = href.substring(1);
    const targetSection = document.getElementById(targetId);

    if (!targetSection) return;

    const headerHeight = document.getElementById('mainHeader')?.offsetHeight || 70;

    gsap.to(window, {
      duration: 0.6,
      scrollTo: {
        y: targetSection,
        offsetY: headerHeight
      },
      ease: 'power2.inOut'
    });
  }

  function updateActiveState(activeLink) {
    sidebarLinks.forEach(link => {
      link.classList.remove('active');
    });
    activeLink.classList.add('active');
  }

  // Update active state on scroll
  const sections = document.querySelectorAll('[id]');

  if (sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          const activeLink = document.querySelector(`.sidebar-nav a[href="#${id}"]`);

          if (activeLink) {
            updateActiveState(activeLink);
          }
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px'
    });

    sections.forEach(section => {
      observer.observe(section);
    });
  }
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  // Mobile toggle for main navigation - only when no drawer exists
  const mobileToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const mobileNav = document.getElementById('mobileNav');

  // Only use inline menu toggle if there's no drawer
  if (mobileToggle && mainNav && !mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileToggle.contains(e.target) && !mainNav.contains(e.target)) {
        mainNav.classList.remove('active');
        mobileToggle.classList.remove('active');
      }
    });
  }

  // Portal mobile sidebar
  const mobileSidebarToggle = document.querySelector('.mobile-sidebar-toggle');
  const portalSidebar = document.querySelector('.portal-sidebar');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  if (mobileSidebarToggle && portalSidebar) {
    mobileSidebarToggle.addEventListener('click', () => {
      portalSidebar.classList.toggle('active');
      mobileSidebarToggle.classList.toggle('active');
      if (mobileOverlay) {
        mobileOverlay.classList.toggle('active');
      }
      document.body.style.overflow = 'hidden';
    });

    // Close sidebar
    const sidebarBack = document.querySelector('.sidebar-back');
    if (sidebarBack) {
      sidebarBack.addEventListener('click', () => {
        portalSidebar.classList.remove('active');
        mobileSidebarToggle.classList.remove('active');
        if (mobileOverlay) {
          mobileOverlay.classList.remove('active');
        }
        document.body.style.overflow = '';
      });
    }

    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', () => {
        portalSidebar.classList.remove('active');
        mobileSidebarToggle.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  }
}

/**
 * Fullscreen Drawer Menu
 */
function initFullscreenDrawer() {
  const menuToggle = document.querySelector('.menu-toggle');
  const drawer = document.getElementById('fullscreenDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerOverlay = document.querySelector('.fullscreen-drawer .drawer-overlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const drawerVisual = document.getElementById('drawerVisual');
  const drawerCaption = document.getElementById('drawerCaption');
  const drawerImages = document.querySelectorAll('.drawer-visual-img');

  if (!menuToggle || !drawer) return;

  // Carousel functionality
  let currentSlide = 0;
  let carouselInterval;
  const totalSlides = drawerImages.length;

  function showSlide(index) {
    drawerImages.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  function startCarousel() {
    carouselInterval = setInterval(nextSlide, 3500);
  }

  function stopCarousel() {
    clearInterval(carouselInterval);
  }

  // Link hover to change image
  drawerLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const imgIndex = link.getAttribute('data-img');
      const caption = link.getAttribute('data-caption');
      if (imgIndex !== null) {
        stopCarousel();
        currentSlide = parseInt(imgIndex);
        showSlide(currentSlide);
        if (drawerCaption && caption) {
          drawerCaption.textContent = caption;
        }
      }
    });

    link.addEventListener('mouseleave', () => {
      startCarousel();
    });
  });

  // Open drawer
  menuToggle.addEventListener('click', () => {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Reset to first slide and start carousel
    currentSlide = 0;
    showSlide(0);
    if (drawerCaption) drawerCaption.textContent = 'Welcome to Hill-Top Academy';
    startCarousel();

    // Stagger animate links
    drawerLinks.forEach((link, index) => {
      link.style.opacity = '0';
      link.style.transform = 'translateX(-30px)';
      setTimeout(() => {
        link.style.transition = 'all 0.4s ease';
        link.style.opacity = '1';
        link.style.transform = 'translateX(0)';
      }, 100 + (index * 80));
    });
  });

  // Close drawer function
  function closeDrawer() {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
    stopCarousel();
  }

  // Close on button click
  drawerClose?.addEventListener('click', closeDrawer);

  // Close on overlay click
  drawerOverlay?.addEventListener('click', closeDrawer);

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/**
 * Glance Tiles Mobile Tap-to-Toggle
 * Allows tapping tiles on mobile to reveal content
 */
function initGlanceTiles() {
  const tiles = document.querySelectorAll('.glance-tile');

  if (!tiles.length) return;

  // Check if we're on mobile
  const isMobile = window.matchMedia('(max-width: 640px)').matches;

  if (!isMobile) return;

  tiles.forEach(tile => {
    tile.addEventListener('click', (e) => {
      // Prevent navigation temporarily to allow toggle
      const wasOpen = tile.classList.contains('is-open');

      // Close all tiles first
      tiles.forEach(t => t.classList.remove('is-open'));

      // If it wasn't open, open it now
      if (!wasOpen) {
        tile.classList.add('is-open');
        e.preventDefault();
      }
    });
  });

  // Close tiles when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.glance-tile')) {
      tiles.forEach(t => t.classList.remove('is-open'));
    }
  });
}

// Updated function with better mobile handling
function initGlanceTilesV2() {
  const tiles = document.querySelectorAll('.glance-tile');

  if (!tiles.length) return;

  tiles.forEach(tile => {
    tile.setAttribute('aria-expanded', 'false');
  });

  // On touch devices, keep cards static and preserve one-tap navigation.
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    return;
  }

  tiles.forEach(tile => {
    tile.addEventListener('mouseenter', () => {
      tile.classList.add('is-open');
      tile.setAttribute('aria-expanded', 'true');
    });

    tile.addEventListener('mouseleave', () => {
      tile.classList.remove('is-open');
      tile.setAttribute('aria-expanded', 'false');
    });

    tile.addEventListener('focusin', () => {
      tile.classList.add('is-open');
      tile.setAttribute('aria-expanded', 'true');
    });

    tile.addEventListener('focusout', (e) => {
      if (!tile.contains(e.relatedTarget)) {
        tile.classList.remove('is-open');
        tile.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/**
 * Portal Sidebar Active State
 */
document.addEventListener('DOMContentLoaded', function () {
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  sidebarLinks.forEach(link => {
    const href = link.getAttribute('href');

    if (href === currentPage ||
      (currentPage === '' && href === 'index.html') ||
      (currentPage === 'index.html' && href === '../index.html')) {
      link.classList.add('active');
    }

    link.addEventListener('click', function () {
      sidebarLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
});

/**
 * Button Hover Effects
 */
document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.btn, .feature-card, .news-card, .value-card');

  buttons.forEach(button => {
    button.addEventListener('mouseenter', function () {
      gsap.to(this, {
        y: -2,
        duration: 0.2,
        ease: 'power2.out'
      });
    });

    button.addEventListener('mouseleave', function () {
      gsap.to(this, {
        y: 0,
        duration: 0.2,
        ease: 'power2.out'
      });
    });
  });
});

/**
 * Form Handling (Demo Only)
 */
document.addEventListener('DOMContentLoaded', function () {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'success-message';
      successMsg.textContent = 'Thank you! This is a demo - no data was actually submitted.';
      successMsg.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        padding: 14px 22px;
        border-radius: 10px;
        z-index: 10000;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        animation: slideInRight 0.4s ease;
      `;

      document.body.appendChild(successMsg);

      // Animate out
      setTimeout(() => {
        successMsg.style.animation = 'slideOutRight 0.4s ease forwards';
        setTimeout(() => successMsg.remove(), 400);
      }, 3000);
    });
  });
});

// Add CSS for success message animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

/**
 * Loading Animation
 */
window.addEventListener('load', function () {
  document.body.classList.add('loaded');

  // Trigger initial animations
  gsap.set('.gsap-fade-up, .gsap-fade-up-delay', { opacity: 0, y: 30 });
});

/**
 * Parallax Effect for Hero Video on Scroll
 */
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-video-container');

  if (hero && scrolled < window.innerHeight) {
    gsap.to(hero, {
      y: scrolled * 0.2,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }
});

/**
 * Intersection Observer for Lazy Loading Images
 */
document.addEventListener('DOMContentLoaded', function () {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '1';
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px'
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    img.style.transition = 'opacity 0.5s ease';
    imageObserver.observe(img);
  });
});

/**
 * Utility: Stagger Animation
 */
function staggerAnimation(elements, className, delay = 80) {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add(className);
    }, index * delay);
  });
}
