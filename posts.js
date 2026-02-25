// ============================================================
// posts.js — Posts data + service layer
//
// When your API is ready, just swap the two functions at the
// bottom. The rest of the app doesn't change at all.
//
// LOCAL  → getPost(slug)    returns data from LOCAL_POSTS
// API    → getPost(slug)    returns fetch(`/api/posts/${slug}`)
// ============================================================

const LOCAL_POSTS = {
  'why-i-build-in-public': {
    slug: 'why-i-build-in-public',
    title: 'Why I build in public — and why you should too',
    date: 'January 2025',
    excerpt: 'Building in public is not just a marketing strategy. It\'s a commitment to learning faster, connecting with real people, and shipping things that matter.',
    content: `
      <p>Building in public is one of the best decisions I've made as a developer. Not because of follower counts or viral posts — but because it fundamentally changed how I work, learn, and connect with people.</p>
      <p>When you commit to sharing your work openly, you stop hiding behind the idea of "I'll share this when it's perfect." Nothing is ever perfect. But shipping something real, even if rough, and talking about it honestly — the decisions, the mistakes, the tradeoffs — is infinitely more valuable than polished silence.</p>
      <p>I started building in public because I was tired of working on projects that nobody ever saw. I'd spend weeks on something, think "this isn't ready yet," and move on. The projects stacked up in private repositories and died quietly. Building in public forced me to finish things. It created a social contract — even a small one — that made me accountable to actually shipping.</p>
      <p>The second benefit surprised me: feedback. Real feedback from real developers who are dealing with the same problems. Not comments from an imaginary future user, but direct responses from people who say "I tried to build the same thing and ran into this." That feedback loop is faster and more honest than anything you get by working silently.</p>
      <p>You don't need an audience to start. Share your work on GitHub. Write a short post about what you built. Reply to someone else who's building something. The act of articulating what you did — why you made the choices you made — makes you a better developer regardless of whether anyone reads it. Start small. Start now.</p>
    `
  },
  'fullstack-developer-mindset': {
    slug: 'fullstack-developer-mindset',
    title: 'The Fullstack Developer Mindset',
    date: 'January 2025',
    excerpt: 'Being fullstack is not about knowing everything — it\'s about understanding the full picture and making smart tradeoffs at every layer of the stack.',
    content: `
      <p>People often ask what it means to be a fullstack developer. The most common answer is "someone who can work on both frontend and backend." That's technically true, but it misses the point entirely.</p>
      <p>Being fullstack is a mindset before it's a skill set. It's about owning the full picture of what you're building — understanding how a decision in the database schema affects what the frontend can realistically display, or how a UX choice puts constraints on the API design. It's about being the person in the room who can reason about the whole system, not just their slice of it.</p>
      <p>This doesn't mean you need to be equally strong at everything. Nobody is. The best fullstack developers I know have a clear primary strength — they're a frontend developer who can hold their own on the backend, or a backend engineer who can ship a clean, working UI. The depth exists somewhere; the breadth is a commitment to understanding enough of everything else to make better decisions.</p>
      <p>The practical benefit is speed. When you can move between layers, you don't get blocked waiting for another person. You don't design a frontend that needs an API rewrite because you didn't understand what was feasible. You can prototype the whole thing yourself, find the real problems early, and iterate on what matters.</p>
      <p>If you're early in your career and wondering whether to specialize or go broad: go broad first. Learn enough of both worlds to understand them. Specialization will happen naturally as you work on real projects and discover where you get the most flow. But the fullstack perspective — keeping the whole system in your head — is something that makes you a better developer no matter what you end up doing.</p>
    `
  },
  'from-idea-to-deploy': {
    slug: 'from-idea-to-deploy',
    title: 'From Idea to Deploy: My Fullstack Workflow in 2025',
    date: 'December 2024',
    excerpt: 'A walkthrough of how I go from a blank screen to a deployed, working product — tools, decisions, and lessons learned from shipping real projects.',
    content: `
      <p>I've shipped a lot of projects over the years — some for clients, some for fun, some that became actual products. The workflow I use has changed a lot, but at this point, it's stable enough to be worth writing down.</p>
      <p><strong>Step 1: Define the core loop.</strong> Before writing a single line of code, I write one sentence that describes what the user does and what they get. "User pastes a URL → gets a summary." That's it. Everything outside that sentence is a feature for later. This sounds obvious but most projects fail because the core loop was never clearly defined — you end up building around a product that doesn't exist yet.</p>
      <p><strong>Step 2: Scaffold fast, decide explicitly.</strong> I use a minimal Next.js setup with Postgres and Prisma. The goal is to have something running on localhost in under an hour. The tech choices are made upfront and deliberately — not randomly, not cargo-culted from a tutorial. Choosing boring, proven tools at this stage saves enormous time later.</p>
      <p><strong>Step 3: Build the ugliest version that works.</strong> No CSS tweaks, no refactoring, no architecture debates. Just make the core loop functional. If the idea is bad, you'll know after this step without having wasted weeks on polish.</p>
      <p><strong>Step 4: Deploy early, on a real domain.</strong> I use Vercel for the frontend and Railway or Render for the database. Having a public URL forces you to think about real constraints — performance, error handling, what happens when something breaks. Localhost is a lie. The real product lives in production.</p>
      <p><strong>Step 5: Share and iterate.</strong> Post the URL somewhere. Watch what real people do with it. Fix the first three things that break. Repeat. This is the only step that most developers skip, and it's the most important one.</p>
    `
  },
  'startups-clean-code': {
    slug: 'startups-clean-code',
    title: 'What startups taught me about writing clean code',
    date: 'November 2024',
    excerpt: 'Speed matters, but messy code kills speed in the long run. Here\'s what I learned writing code under pressure in startup environments.',
    content: `
      <p>I used to think clean code was about beauty. Elegant abstractions. Perfect naming. Well-organized files that would make another developer smile. Then I worked at a startup, and I learned what clean code actually means in practice.</p>
      <p>At a startup, the codebase is always moving. Features get added, pivoted, removed, re-added in a different form. The developers change. The priorities change. The code you wrote three months ago is being touched by someone who has fifteen minutes to understand it before making a change. In that environment, clean code is code that survives contact with reality.</p>
      <p>The most important thing I learned: clarity over cleverness, always. The clever one-liner that saves three lines is not worth it if the next developer — or yourself in six months — has to read it twice to understand what it does. Simple, explicit, slightly verbose code ages better than clever code. It's easier to review, easier to debug, and easier to change.</p>
      <p>The second lesson: keep functions small and honest. A function that does one thing and does it clearly is far more valuable than a well-named function that secretly does three things. The name is a contract. If the function breaks that contract — if it has side effects you wouldn't expect, or if it modifies something it shouldn't — that's a debt that accumulates silently until it causes a bug at 2am before a launch.</p>
      <p>The third lesson, and the hardest one: delete code aggressively. Dead code is the enemy. Commented-out blocks, unused functions, features that were removed but left "just in case" — they all increase the cognitive load of everyone working in that codebase. The best code is the code that doesn't exist. When in doubt, delete it. It's in version control if you ever need it back.</p>
    `
  },
  'open-source-portfolio': {
    slug: 'open-source-portfolio',
    title: 'Open Source is the best portfolio you can have',
    date: 'September 2024',
    excerpt: 'A GitHub profile full of real projects says more than any resume. Here\'s my take on why every developer should contribute to open source.',
    content: `
      <p>Every developer needs a portfolio. The question is what form it should take. I've looked at a lot of developer portfolios — my own included — and the ones that actually communicate something useful are the ones built around real, open-source work.</p>
      <p>A PDF resume tells someone what you say you've done. A GitHub profile full of real projects shows it. These are fundamentally different things. When a developer opens your repository and reads your code, they're not reading your self-assessment — they're seeing how you actually think, how you structure problems, how you handle edge cases, what you prioritize, and how you communicate through commit messages and README files.</p>
      <p>You don't need to contribute to big open-source projects to benefit from this. Building your own tools in public has the same effect. A CLI that solves a problem you actually have. A library that wraps an API you use regularly. A side project that scratches a real itch. These things, built in public, demonstrate more about your abilities than any description of your job responsibilities ever could.</p>
      <p>The practical advice: build things you actually use. The projects that end up being most interesting to other developers are the ones built to solve real problems. When you build something because you genuinely needed it, the motivation to finish it is different — and the quality shows. Toy projects built "for the portfolio" rarely have the same energy.</p>
      <p>Start today. Pick a problem you've complained about in the last month. Build the simplest possible solution. Put it on GitHub with a clear README. Share the link somewhere. That's it. Repeat that three or four times and you have a portfolio that speaks for itself.</p>
    `
  },
  'say-no-to-features': {
    slug: 'say-no-to-features',
    title: 'Learning to say no to features',
    date: 'July 2024',
    excerpt: 'The best feature you can ship is sometimes the one you didn\'t build. A short essay on product discipline as a developer.',
    content: `
      <p>Every feature you add to a product is debt. Not technical debt — product debt. It's something you have to maintain, document, support, and explain. It makes the product more complex for every user, not just the one who requested the feature. Most features are not worth that cost.</p>
      <p>As developers, we're trained to build things. The request comes in, we estimate, we implement, we ship. Saying no feels like failure, or like being unhelpful. But the most impactful thing you can do for a product is often to push back on a feature request and ask: what problem does this actually solve? Is this the simplest solution to that problem? Does this need to exist in the product, or can the user solve this another way?</p>
      <p>I've seen products get destroyed by feature creep. Each individual feature made sense in isolation. Together, they created a product so complex that new users couldn't figure out what it was for. The core value proposition got buried under a settings panel with forty options. The team spent most of their time maintaining things nobody used instead of improving things everybody depended on.</p>
      <p>The discipline of saying no gets easier when you have a clear product north star. If your product is about helping people save links and read them later, you don't need a social feed. You don't need a commenting system. You don't need to let users follow each other. These might be nice. They might even increase engagement in theory. But they dilute what the product is, and every hour spent building them is an hour not spent making the core experience better.</p>
      <p>Say no often. Say it kindly. Say it with a reason. And when you do say yes, make sure you know exactly why, and what you're trading to get it.</p>
    `
  },
  'stop-chasing-perfect': {
    slug: 'stop-chasing-perfect',
    title: 'Why I stopped chasing perfect and started shipping',
    date: 'May 2024',
    excerpt: 'Perfectionism is the enemy of progress. Here\'s how I broke the cycle and learned to ship early, iterate fast, and learn from real users.',
    content: `
      <p>I spent the first two years of my career finishing almost nothing. I had a hard drive full of projects at 70%, 80%, 90% done. Each one got stuck at the same point: the moment when what I had built was functional, but not yet worthy of showing to other people. Not good enough.</p>
      <p>Perfectionism feels virtuous. It looks like high standards from the inside. But when I examined it honestly, it was mostly fear. Fear of putting something out there and having people find it lacking. Fear of being judged for code that wasn't elegant, or a design that wasn't polished, or a product that had bugs. Perfectionism was a sophisticated way of never being vulnerable.</p>
      <p>The thing that changed it for me was watching other developers ship things that were clearly imperfect. Projects with rough edges, basic designs, obvious limitations — and nobody cared. The people who used them cared about the problem being solved, not the polish of the solution. The people who gave feedback were helpful and constructive. The disaster I'd imagined didn't happen.</p>
      <p>Shipping early also revealed something I couldn't see from inside the development bubble: what people actually wanted was different from what I was building. I'd been polishing features nobody needed, while leaving rough the ones people actually used. You can't know this without real users. And you can't have real users without shipping.</p>
      <p>The rule I use now: ship when the core thing works. Not when everything works. Not when you're proud of every line of code. When the thing you set out to build does what it's supposed to do, ship it. The rest can come later. Most of the time, "later" reveals that the rest wasn't necessary at all.</p>
    `
  }
};

// ============================================================
// SERVICE LAYER — this is the only thing script.js talks to.
//
// To migrate to your API, replace these two functions:
//
//   export async function getAllPosts() {
//     const res = await fetch('https://your-api.com/api/posts');
//     return res.json(); // expects array of { slug, title, date, excerpt }
//   }
//
//   export async function getPost(slug) {
//     const res = await fetch(`https://your-api.com/api/posts/${slug}`);
//     if (!res.ok) return null;
//     return res.json(); // expects { slug, title, date, content }
//   }
//
// ============================================================

export async function getAllPosts() {
  return Object.values(LOCAL_POSTS);
}

export async function getPost(slug) {
  return LOCAL_POSTS[slug] ?? null;
}
