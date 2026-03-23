document.addEventListener('DOMContentLoaded', () => {
  /* -----------------
   * Dark Mode Toggle
   * ----------------- */
  const themeToggle = document.getElementById('theme-toggle');
  const userTheme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Set initial theme
  const themeCheck = () => {
    if (userTheme === 'dark' || (!userTheme && systemTheme)) {
      document.documentElement.setAttribute('data-theme', 'dark');
      if(themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if(themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  };

  // Toggle theme
  const themeSwitch = () => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      if(themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      if(themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  };

  if(themeToggle) themeToggle.addEventListener('click', themeSwitch);
  themeCheck();

  /* -----------------
   * RTL Toggle 
   * ----------------- */
  const rtlToggle = document.getElementById('rtl-toggle');
  const userDir = localStorage.getItem('dir');

  const setDir = (dir) => {
    if (document.documentElement.hasAttribute('data-no-rtl')) {
      document.documentElement.setAttribute('dir', 'ltr');
      return;
    }
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem('dir', dir);
    if (rtlToggle) {
      rtlToggle.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    }
  };

  if (userDir) {
    setDir(userDir);
  } else if (document.documentElement.hasAttribute('data-no-rtl')) {
    setDir('ltr');
  }

  if (rtlToggle) {
    rtlToggle.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      setDir(currentDir === 'rtl' ? 'ltr' : 'rtl');
    });
  }

  /* -----------------
   * Sticky Navbar
   * ----------------- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Run on load just in case page starts scrolled
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    }
  }

  /* -----------------
   * Mobile Menu 
   * ----------------- */
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if(navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = '';
      }
    });

    // Close menu when a link is clicked
    const links = navLinks.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if(icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
        document.body.style.overflow = '';
      });
    });
  }

  /* -----------------
   * Scroll Animations 
   * ----------------- */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll('.fade-in-up, .scale-in');
  elementsToAnimate.forEach(el => observer.observe(el));

  /* -----------------
   * Scroll to Top Button
   * ----------------- */
  const scrollTop = document.createElement('button');
  scrollTop.classList.add('scroll-top');
  scrollTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollTop.setAttribute('aria-label', 'Scroll to Top');
  document.body.appendChild(scrollTop);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTop.classList.add('active');
    } else {
      scrollTop.classList.remove('active');
    }
  });

  scrollTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
