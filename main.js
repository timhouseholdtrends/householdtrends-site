// Mobile menu toggle
(() => {
  const burger = document.querySelector('.nav__burger');
  const mobile = document.getElementById('mobileMenu');
  if (!burger || !mobile) return;

  burger.addEventListener('click', () => {
    const open = mobile.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close mobile menu when a link is clicked
  mobile.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', () => {
      mobile.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Footer year
(() => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// Hero media fallback: if MP4 missing, show image
(() => {
  const video = document.querySelector('.hero__video');
  const img = document.querySelector('.hero__image');
  if (!video || !img) return;

  let videoOk = false;

  video.addEventListener('canplay', () => {
    videoOk = true;
    img.style.display = 'none';
  });

  video.addEventListener('error', () => {
    videoOk = false;
    video.style.display = 'none';
    img.style.display = 'block';
  });

  setTimeout(() => {
    if (!videoOk && video.readyState === 0) {
      video.style.display = 'none';
      img.style.display = 'block';
    }
  }, 900);
})();

// Fake submit for demo (no backend)
window.fakeSubmit = function (e) {
  e.preventDefault();
  const msg = document.getElementById('formMsg');
  if (msg) {
    msg.textContent = "Thanks — message captured locally (demo). Connect this form to email when you're ready.";
  }
  e.target.reset();
  return false;
};

