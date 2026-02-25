const navLinks = document.querySelectorAll('.nav-inner a[data-page]');
const pages    = document.querySelectorAll('.page');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(link.dataset.page);
  });
});

function navigateTo(target) {
  if (!target) return;

  pages.forEach(p => p.classList.remove('active'));
  navLinks.forEach(a => a.classList.remove('active'));

  const page = document.getElementById(target);
  const link = document.querySelector(`.nav-inner a[data-page="${target}"]`);

  if (page) {
    // Force reflow so the fadeUp animation replays on every navigation
    page.classList.remove('active');
    void page.offsetWidth;
    page.classList.add('active');
  }

  if (link) link.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== COPY EMAIL =====
function copyEmail() {
  const email = 'hello@carlossucre.dev';
  navigator.clipboard.writeText(email).then(() => {
    const toast = document.getElementById('email-toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  });
}
