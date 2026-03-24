/**
 * Minimal JavaScript for Cargo-like aesthetic interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Page Transition: Fade in on load
  document.body.classList.add('page-transition');
  requestAnimationFrame(() => {
    document.body.classList.add('entered');
  });

  // Image Lazy Load Reveal
  const images = document.querySelectorAll('.img-container img');
  
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          // Small delay for stagger effect if multiple images load at once
          setTimeout(() => {
            img.parentElement.classList.add('loaded');
          }, Math.random() * 200); 
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '0px 0px 100px 0px',
      threshold: 0.1
    });

    images.forEach(img => {
      if (img.complete) {
        img.parentElement.classList.add('loaded');
      } else {
        img.addEventListener('load', () => {
          imgObserver.observe(img);
        });
        // Also observe immediately in case it's cached
        imgObserver.observe(img);
      }
    });
  } else {
    // Fallback
    images.forEach(img => img.parentElement.classList.add('loaded'));
  }
});
