// ============================================================
// script.js — Portfolio navigation and rendering
// ============================================================
// This file handles:
//   1. Navigation between pages (home, projects, posts, videos)
//   2. Opening individual posts
//   3. DYNAMIC rendering of the posts list (comes from JSON)
//   4. Browser history (back/forward button)
//   5. Email copy functionality
// ============================================================

// Import data functions from posts.js.
// getPosts()     → array with all posts
// getPost(slug)  → individual post by slug
import { getPosts, getPost } from './posts.js';

const navLinks = document.querySelectorAll('.nav-inner a[data-page]');
const VALID_PAGES = ['home', 'projects', 'posts', 'videos'];

// ── NAV LINKS ───────────────────────────────────────────────
// Intercept clicks on navigation links and use
// navigateTo() instead of reloading the page
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(link.dataset.page, true);
  });
});

// ── POST CLICK (delegated) ───────────────────────────────────
// Uses event delegation — listens for clicks on the whole document
// and filters only links with data-slug (post links).
// This works even for dynamically rendered posts that
// don't exist in the HTML when the page loads.
document.addEventListener('click', async (e) => {
  const link = e.target.closest('a[data-slug]');
  if (link) {
    e.preventDefault();
    await openPost(link.dataset.slug);
  }
});

// ── BACK BUTTON ─────────────────────────────────────────────
// "← Posts" button inside the article page
document.getElementById('article-back-btn').addEventListener('click', () => {
  navigateTo('posts', true);
});

// ── NAVIGATE ────────────────────────────────────────────────
// Switches which page is visible.
// Each "page" is a div with class="page" and a unique id.
// The active page gets class="active", others lose it.
//
// pushState = true → add entry to browser history
// pushState = false → just change URL without creating entry
function navigateTo(target, pushState = false) {
  // Invalid page → go to home
  if (!target || !VALID_PAGES.includes(target)) target = 'home';

  // Remove "active" from all pages and nav links
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  navLinks.forEach(a => a.classList.remove('active'));

  const page = document.getElementById(target);
  const link = document.querySelector(`.nav-inner a[data-page="${target}"]`);

  if (page) {
    // Remove and re-add "active" with a micro-delay
    // to ensure the CSS animation retriggers correctly
    page.classList.remove('active');
    void page.offsetWidth; // force reflow — trick to restart CSS animation
    page.classList.add('active');
  }

  if (link) link.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (pushState) {
    // Clean URL: /home becomes /, /posts becomes /posts
    const url = target === 'home' ? '/' : '/' + target;
    history.pushState({ page: target }, '', url);
  }

  // If navigated to the posts page, render the list dynamically
  if (target === 'posts') {
    renderPostsList();
  }
}

// ── RENDER POSTS LIST ────────────────────────────────────────
// Fetches all posts from JSON and renders the list on the #posts page.
// Completely replaces the static content that was in the HTML.
// Automatically groups posts by year.
async function renderPostsList() {
  // Container where the list will be injected
  // Select the section inside the #posts page
  const postsPage = document.getElementById('posts');
  const container = postsPage.querySelector('.posts-dynamic-container');

  // If the container doesn't exist, do nothing (safety)
  if (!container) return;

  // Show loading state while fetching
  container.innerHTML = '<p class="posts-loading">Loading posts...</p>';

  const posts = await getPosts();

  // If no posts came back (network error or empty JSON)
  if (!posts || posts.length === 0) {
    container.innerHTML = '<p class="posts-empty">No posts found.</p>';
    return;
  }

  // Group posts by year
  // Result: { '2026': [...posts], '2025': [...posts] }
  const byYear = posts.reduce((acc, post) => {
    const year = post.date ? post.date.slice(0, 4) : 'Unknown'; // take first 4 chars of ISO date
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {});

  // Sort years from newest to oldest
  const years = Object.keys(byYear).sort((a, b) => b - a);

  // Build HTML for each year section
  const html = years.map(year => {
    const postsHtml = byYear[year].map(post => {
      // Format the date: "2026-02-28" → "Feb 2026"
      const dateLabel = formatDate(post.date);

      // Each post becomes an <li> with a data-slug link (handled by event delegation above)
      // and an excerpt (summary from the front matter)
      return `
        <li>
          <div class="post-meta">
            <a href="#" data-slug="${post.slug}">${post.title}</a>
            <span class="post-date">${dateLabel}</span>
          </div>
          ${post.summary ? `<p class="post-excerpt">${post.summary}</p>` : ''}
        </li>
      `;
    }).join('');

    return `
      <section class="section">
        <p class="section-title">${year}</p>
        <ul class="posts-list">
          ${postsHtml}
        </ul>
      </section>
    `;
  }).join('');

  // Inject everything into the container at once
  container.innerHTML = html;
}

// ── FORMAT DATE ──────────────────────────────────────────────
// Convert "2026-02-28" into "Feb 2026"
function formatDate(isoDate) {
  if (!isoDate) return '';
  const [year, month] = isoDate.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

// ── OPEN POST ────────────────────────────────────────────────
// Opens the article view with content of a specific post.
// The content (post.content) already comes as HTML converted by generate-json.js
async function openPost(slug) {
  const post = await getPost(slug);

  // If the post doesn't exist, go back to the posts list
  if (!post) { navigateTo('posts', true); return; }

  // Hide all pages and active links
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  navLinks.forEach(a => a.classList.remove('active'));

  // Build the article HTML with title, date, and content
  // post.content is already HTML (converted from Markdown by generate-json.js)
  document.getElementById('article-content').innerHTML = `
    <div class="article-header">
      <p class="article-date">${formatDate(post.date)}</p>
      <h1 class="article-title">${post.title}</h1>
    </div>
    <div class="article-body">${post.content}</div>
  `;

  // Activate the article page with animation
  const postPage = document.getElementById('post');
  postPage.classList.remove('active');
  void postPage.offsetWidth;
  postPage.classList.add('active');

  // Keep the "Posts" link active in nav while reading an article
  const postsLink = document.querySelector('.nav-inner a[data-page="posts"]');
  if (postsLink) postsLink.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update URL to /posts/slug — allows direct link sharing
  history.pushState({ page: 'post', slug }, '', '/posts/' + slug);
}

// ── BROWSER BACK / FORWARD ───────────────────────────────────
// Listen for popstate event (browser back/forward button)
// and navigate to the correct state without reloading the page
window.addEventListener('popstate', async (e) => {
  if (e.state && e.state.page === 'post') {
    // Was on an article → reopen it
    await openPost(e.state.slug);
  } else {
    // Was on a normal page → navigate to it
    const target = (e.state && e.state.page) || pageFromPath(location.pathname);
    navigateTo(target, false);
  }
});

// ── PAGE FROM PATH ───────────────────────────────────────────
// Extracts the page name from the current URL.
// E.g. /posts → 'posts', /projects → 'projects', / → 'home'
function pageFromPath(pathname) {
  const parts = pathname.replace(/^\//, '').split('/');
  return VALID_PAGES.includes(parts[0]) ? parts[0] : 'home';
}

// ── INITIAL LOAD ─────────────────────────────────────────────
// Runs once when the page loads.
// Decides which "page" to show based on the current URL.
// Supports URLs with query params (?route=posts&slug=my-post)
// for compatibility with GitHub Pages (which has no server-side routing).
(async function () {
  const params      = new URLSearchParams(location.search);
  const routeParam  = params.get('route');
  const slugParam   = params.get('slug');

  // Case 1: URL with post query param — e.g. ?route=posts&slug=my-post
  // Used by GitHub Pages 404.html to redirect deep links
  if (routeParam === 'posts' && slugParam) {
    history.replaceState({ page: 'post', slug: slugParam }, '', '/posts/' + slugParam);
    await openPost(slugParam);
    return;
  }

  // Case 2: URL with page query param — e.g. ?route=projects
  if (routeParam) {
    const target = VALID_PAGES.includes(routeParam) ? routeParam : 'home';
    history.replaceState({ page: target }, '', target === 'home' ? '/' : '/' + target);
    navigateTo(target, false);
    return;
  }

  // Case 3: URL with post slug — e.g. /posts/my-post
  const parts = location.pathname.replace(/^\//, '').split('/');
  if (parts[0] === 'posts' && parts[1]) {
    history.replaceState({ page: 'post', slug: parts[1] }, '', location.pathname);
    await openPost(parts[1]);
    return;
  }

  // Case 4: Normal URL — e.g. /projects, /posts, /
  const target = pageFromPath(location.pathname);
  history.replaceState({ page: target }, '', location.pathname);
  navigateTo(target, false);
})();

// ── COPY EMAIL ───────────────────────────────────────────────
// Copy the email to clipboard and show a confirmation toast
function copyEmail() {
  const email = 'carlossucredev@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    const toast = document.getElementById('email-toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  });
}

// Expose on window so the HTML onclick attribute works
window.copyEmail = copyEmail;