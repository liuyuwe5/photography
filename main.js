/**
 * Minimal JavaScript for Cargo-like aesthetic interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inject Background Animations (Noise + Blob)
  const bgContainer = document.createElement('div');
  bgContainer.className = 'bg-animation-container';
  bgContainer.innerHTML = '<div class="ambient-blob"></div><div class="ambient-blob blob-2"></div>';
  document.body.prepend(bgContainer);

  const noiseOverlay = document.createElement('div');
  noiseOverlay.className = 'noise-overlay';
  document.body.appendChild(noiseOverlay);

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

  // Lightbox Implementation
  const lightboxOverlay = document.createElement('div');
  lightboxOverlay.className = 'lightbox-overlay';
  lightboxOverlay.innerHTML = `
    <div class="lightbox-close">&times;</div>
    <div class="lightbox-content"></div>
  `;
  document.body.appendChild(lightboxOverlay);

  const lightboxContent = lightboxOverlay.querySelector('.lightbox-content');
  const lightboxClose = lightboxOverlay.querySelector('.lightbox-close');

  const closeLightbox = () => {
    lightboxOverlay.classList.remove('active');
    setTimeout(() => {
      lightboxContent.innerHTML = '';
      // Reset body scroll lock if desired, but cargo sometimes just overlays
    }, 400); 
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxOverlay.addEventListener('click', (e) => {
    // Close if clicking outside iframe/img
    if (e.target === lightboxOverlay) closeLightbox();
  });

  const triggers = document.querySelectorAll('.lightbox-trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      
      const type = trigger.getAttribute('data-type');
      const src = trigger.getAttribute('data-src');
      
      if (!src) return;

      if (type === 'youtube' || type === 'video') {
        lightboxContent.innerHTML = `<iframe src="${src}?autoplay=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
      } else {
        lightboxContent.innerHTML = `<img src="${src}" alt="Expanded view" />`;
      }
      
      lightboxOverlay.classList.add('active');
    });
  });

  
  // Copy Email to Clipboard
  const copyEmailBtn = document.querySelector('.copy-email');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = copyEmailBtn.getAttribute('data-email');
      try {
        await navigator.clipboard.writeText(email);
        const textSpan = copyEmailBtn.querySelector('.email-text');
        if (textSpan) {
          const originalText = textSpan.innerText;
          textSpan.innerText = 'Copied!';
          setTimeout(() => {
            textSpan.innerText = originalText;
          }, 2000);
        }
      } catch (err) {
        console.error('Failed to copy: ', err);
        window.location.href = `mailto:${email}`; // Fallback if clipboard fails
      }
    });
  }
});
