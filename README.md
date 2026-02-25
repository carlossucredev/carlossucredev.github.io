# Carlos Sucre — Personal Portfolio

Personal portfolio website built with plain HTML, CSS and JavaScript. No frameworks, no dependencies, no build step.

Live at → **[carlossucredev.github.io](https://carlossucredev.github.io)**

---

## Stack

- HTML5
- CSS3 (custom properties, grid, animations)
- Vanilla JavaScript
- [IBM Plex Sans + IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Sans) via Google Fonts

---

## Project Structure

```
/
├── index.html      # Markup and page sections
├── style.css       # All styles and animations
├── script.js       # Navigation logic
├── assets/
│   └── images/     # Profile photo, project screenshots, etc.
└── README.md
```

---

## Pages

| Page | Description |
|------|-------------|
| **Home** | Bio, social links, testimonials |
| **Projects** | Web apps, open source tools, automations |
| **Posts** | Essays and articles |
| **Videos** | YouTube channel content |

---

## Running Locally

No build step needed. Just open the file:

```bash
# Clone the repo
git clone https://github.com/carlossucre/carlossucre.git
cd carlossucre

# Open in browser
open index.html

# Or use a local dev server (recommended to avoid CORS on assets)
npx serve .
```

---

## Deploying

This site is deployed on **Vercel**. Every push to `main` triggers an automatic deploy.

To deploy your own fork:

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project → Select this repo
3. Click Deploy — no configuration needed
4. Connect your custom domain in Vercel's dashboard

---

## Customization

All content lives directly in `index.html`. To update:

- **Bio / social links** → edit the `#home` section
- **Projects** → edit the `#projects` section
- **Posts** → edit the `#posts` section
- **Videos** → edit the `#videos` section
- **Colors** → change the CSS variables at the top of `style.css`

```css
:root {
  --bg: #0e0e0e;       /* background */
  --text: #d4d4d4;     /* body text */
  --accent: #e8c547;   /* yellow highlight color */
  --muted: #666;       /* secondary text */
  --border: #222;      /* borders and dividers */
}
```

---

## License

MIT — feel free to use this as a starting point for your own portfolio.
