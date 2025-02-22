 /**
     * Easy selector helper function
     */
 const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }
// Add scroll event handler
window.addEventListener('scroll', () => {
    const header = select('#header');
    const heroSection = select('#hero');
    const heroNavbar = heroSection.querySelector('#navbar');
    
    // Get the position of the hero navbar
    const heroNavPosition = heroNavbar.getBoundingClientRect();
    
    // Show header when hero navbar is out of viewport (scrolled up)
    if (heroNavPosition.bottom <= 0) {
        header.classList.add('header-sticky');  // Changed from header-visible to header-sticky
    } else {
        header.classList.remove('header-sticky'); // Changed from header-visible to header-sticky
    }
});
  
  // Update the existing scroll handling for navigation
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash);
    if (section) {
      e.preventDefault();
  
      let navbar = select('#navbar');
      let navlinks = select('#navbar .nav-link', true);
  
      navlinks.forEach((item) => {
        item.classList.remove('active');
      });
  
      this.classList.add('active');
  
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile');
        let navbarToggle = select('.mobile-nav-toggle');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }
  
      // Smooth scroll with offset
      window.scrollTo({
        top: section.offsetTop - 85,
        behavior: 'smooth'
      });
    }
  }, true);