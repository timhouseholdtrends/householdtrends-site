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

(() => {
  const FORMEASY_URL =
    "https://script.google.com/macros/s/AKfycbzbIbDeVqk1kdC6R9ulQ78JiHf_o8xtRQu2fmgo5Y95CPzNpczultQkSrZUd5W5Djrr/exec";

  const form = document.querySelector("form.form");
  const msg = document.getElementById("formMsg");

  if (!form || !msg) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.textContent = "Sending…";

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      // FormEasy-style submit (JSON string, text/plain)
      const res = await fetch(FORMEASY_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data),
      });

      // Apps Script/FormEasy responses can be inconsistent; don't rely on json.ok
      await res.text().catch(() => "");

      if (res.ok) {
        form.reset();
        msg.textContent = "Thanks — we’ll get back to you shortly.";
      } else {
        msg.textContent = "Sent, but got a server error. Try again or email us.";
      }
    } catch (err) {
      console.error(err);
      msg.textContent = "Network error. Please try again.";
    }
  });
})();
