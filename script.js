import { getPost } from './posts.js';

const navLinks = document.querySelectorAll('.nav-inner a[data-page]');
const VALID_PAGES = ['home', 'projects', 'posts', 'videos'];

// ===== NAV LINKS =====
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(link.dataset.page, true);
  });
});

// ===== POST CLICK (delegated) =====
document.addEventListener('click', async (e) => {
  const link = e.target.closest('a[data-slug]');
  if (link) {
    e.preventDefault();
    await openPost(link.dataset.slug);
  }
});

// ===== BACK BUTTON =====
document.getElementById('article-back-btn').addEventListener('click', () => {
  navigateTo('posts', true);
});

// ===== NAVIGATE =====
function navigateTo(target, pushState = false) {
  if (!target || !VALID_PAGES.includes(target)) target = 'home';

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  navLinks.forEach(a => a.classList.remove('active'));

  const page = document.getElementById(target);
  const link = document.querySelector(`.nav-inner a[data-page="${target}"]`);

  if (page) {
    page.classList.remove('active');
    void page.offsetWidth;
    page.classList.add('active');
  }

  if (link) link.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (pushState) {
    const url = target === 'home' ? '/' : '/' + target;
    history.pushState({ page: target }, '', url);
  }
}

// ===== OPEN POST =====
async function openPost(slug) {
  const post = await getPost(slug);
  if (!post) { navigateTo('posts', true); return; }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  navLinks.forEach(a => a.classList.remove('active'));

  document.getElementById('article-content').innerHTML = `
    <div class="article-header">
      <p class="article-date">${post.date}</p>
      <h1 class="article-title">${post.title}</h1>
    </div>
    <div class="article-body">${post.content}</div>
  `;

  const postPage = document.getElementById('post');
  postPage.classList.remove('active');
  void postPage.offsetWidth;
  postPage.classList.add('active');

  const postsLink = document.querySelector('.nav-inner a[data-page="posts"]');
  if (postsLink) postsLink.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.pushState({ page: 'post', slug }, '', '/posts/' + slug);
}

// ===== BROWSER BACK / FORWARD =====
window.addEventListener('popstate', async (e) => {
  if (e.state && e.state.page === 'post') {
    await openPost(e.state.slug);
  } else {
    const target = (e.state && e.state.page) || pageFromPath(location.pathname);
    navigateTo(target, false);
  }
});

function pageFromPath(pathname) {
  const parts = pathname.replace(/^\//, '').split('/');
  return VALID_PAGES.includes(parts[0]) ? parts[0] : 'home';
}

// ===== INITIAL LOAD =====
(async function () {
  const params    = new URLSearchParams(location.search);
  const routeParam = params.get('route');
  const slugParam  = params.get('slug');

  if (routeParam === 'posts' && slugParam) {
    history.replaceState({ page: 'post', slug: slugParam }, '', '/posts/' + slugParam);
    await openPost(slugParam);
    return;
  }
  if (routeParam) {
    const target = VALID_PAGES.includes(routeParam) ? routeParam : 'home';
    history.replaceState({ page: target }, '', target === 'home' ? '/' : '/' + target);
    navigateTo(target, false);
    return;
  }

  const parts = location.pathname.replace(/^\//, '').split('/');
  if (parts[0] === 'posts' && parts[1]) {
    history.replaceState({ page: 'post', slug: parts[1] }, '', location.pathname);
    await openPost(parts[1]);
    return;
  }

  const target = pageFromPath(location.pathname);
  history.replaceState({ page: target }, '', location.pathname);
  navigateTo(target, false);
})();

// ===== COPY EMAIL =====
function copyEmail() {
  const email = 'carlossucredev@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    const toast = document.getElementById('email-toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  });
}

window.copyEmail = copyEmail;

