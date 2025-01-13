const menuToggle = document.querySelector('.menu-toggle'); 
const navMenu = document.querySelector('.nav-menu');
const closeIcon = navMenu.querySelector('.close-icon'); // Find the close icon inside .nav-menu
const menuItems = navMenu.querySelectorAll('ul li');

// Hamburger click -> open mobile menu
menuToggle.addEventListener('click', () => {
  navMenu.classList.add('open'); // Add .open, slides nav in
  menuItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = '1'; // fade in each <li>
    }, index * 200);
  });
});

// Close icon click -> hide mobile menu
closeIcon.addEventListener('click', () => {
  navMenu.classList.remove('open');
  // Hide items instantly
  menuItems.forEach(item => {
    item.style.opacity = '0';
  });
});
