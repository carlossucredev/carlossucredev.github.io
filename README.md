# Carlos Sucre — Personal Portfolio

Personal portfolio website built with plain HTML, CSS and JavaScript. No frameworks, no bundler, no build step.

Live at → **[carlossucredev.github.io](https://carlossucredev.github.io)**

---

## Stack

- HTML5
- CSS3 (custom properties, flexbox, grid, animations)
- Vanilla JavaScript (ES Modules, History API)
- [IBM Plex Sans + IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Sans) via Google Fonts

---

## Project Structure

```
/
├── index.html      # Single page app — all sections and markup
├── style.css       # All styles, CSS variables, animations
├── script.js       # Navigation, routing, post rendering
├── posts.js        # Posts data + async service layer (ready for API swap)
├── favicon.svg     # CS initials, generated SVG
├── 404.html        # GitHub Pages SPA routing redirect
└── README.md
```

---

## Pages

| Page | Description |
|------|-------------|
| **Home** | Bio, social links, testimonials |
| **Projects** | Web apps, open source tools, automations — each with GitHub + Demo buttons |
| **Posts** | Essays and articles, open as full article view with `/posts/:slug` URL |
| **Videos** | YouTube channel card — [@carlossucredev](https://youtube.com/@carlossucredev) |

---

## Architecture

### SPA Routing
Navigation is handled entirely on the client via the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) (`pushState` / `replaceState`). On GitHub Pages, deep links like `/projects` or `/posts/some-slug` would normally 404 — the `404.html` file intercepts those and redirects back to `/?route=...`, which the app then resolves on load.

### Posts as a Service Layer
Post content lives in `posts.js`, separated from `script.js` intentionally. The file exports two async functions:

```js
export async function getPost(slug)   // returns a single post object
export async function getAllPosts()   // returns all posts
```

Currently they read from a local `LOCAL_POSTS` object. To swap in a real API, just replace the function bodies with `fetch()` calls — no other file needs to change.

```js
// future API version — only this file changes
export async function getPost(slug) {
  return fetch(`https://api.carlossucre.dev/posts/${slug}`).then(r => r.json());
}
```

---

## Running Locally

No build step needed. Because `script.js` uses ES Modules (`import`), you need a local server — opening `index.html` directly as a `file://` URL will block the import.

```bash
# Clone the repo
git clone https://github.com/carlossucredev/carlossucredev.github.io.git
cd carlossucredev.github.io

# Option 1 — Node
npx serve .

# Option 2 — Python
python -m http.server 3000

# Option 3 — VS Code
# Install the "Live Server" extension and click "Go Live"
```

---

## Deploying

Deployed on **GitHub Pages** from the `main` branch. Every push triggers an automatic deploy.

The `404.html` trick is required for GitHub Pages SPA support — it's already included.

---

## Customization

All content lives directly in `index.html`. To update:

- **Bio / social links** → edit the `#home` section
- **Projects** → edit the `#projects` section
- **Posts list** → edit the `#posts` section (add `data-slug` to each link)
- **Post content** → edit `LOCAL_POSTS` in `posts.js`
- **Videos** → edit the `#videos` section
- **Colors** → change the CSS variables at the top of `style.css`

```css
:root {
  --bg: #0d1117;       /* background — deep blue-gray */
  --text: #dde1eb;     /* body text — cool light */
  --accent: #e8c547;   /* yellow highlight */
  --muted: #7a8fa6;    /* secondary text — slate blue */
  --border: #1e2a38;   /* borders and dividers */
  --card-bg: #131c27;  /* card backgrounds */
}
```

---

## Contact

- Email: [carlossucredev@gmail.com](mailto:carlossucredev@gmail.com)
- GitHub: [@carlossucredev](https://github.com/carlossucredev)
- Twitter / X: [@carlossucredev](https://twitter.com/carlossucredev)
- YouTube: [@carlossucredev](https://youtube.com/@carlossucredev)

---

## License

MIT — feel free to use this as a starting point for your own portfolio.
