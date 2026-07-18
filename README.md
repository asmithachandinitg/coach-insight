# CoachInsight 🏋️

A focused BI dashboard built for a single personal trainer to track client progress, attendance, and goals — designed around a real trainer's actual daily workflow rather than a generic analytics template.

live demo: https://coach-insight-wkqp-bay.vercel.app/
---

## The problem

I built this around a real user: a personal trainer who currently tracks everything on paper and his phone — session duration, muscle group trained that day, weight/progress notes, and for his personal-training and bodybuilding clients specifically, meal photos, step counts, and water intake as accountability proof.

He works walk-in style: a client arrives, he checks what was trained yesterday, decides today's focus, and stands with them for 45–60 minutes taking notes. There's no clean way for him to see, at a glance, who's on track and who's falling behind across his full client list.

**What I decided to act on:** rather than build a general-purpose gym CRM, I focused the core insight on this question — *"who is progressing, who is stalling, and why"* — visible at a glance across his roster, with a lighter-weight experience for general members and a fuller accountability layer (water, steps, meal logging) for weight-loss and bodybuilding clients specifically, since those are the two categories he personally coaches toward a goal.

---

## Design decisions

- **Category-based feature depth, not one-size-fits-all.** General members get a simple session log. Weight-loss and bodybuilding clients get goal-gap tracking and accountability metrics. This mirrors how the trainer actually treats these clients differently — it's not decorative, it's functional scoping.
- **A yesterday → today focus line** on the roster view, instead of a generic calendar. This answers the exact question he asks himself every morning ("what did we train last, what's next"), which a standard BI tool wouldn't surface.
- **Plain-English "why this trend" explanations** on stalling clients, generated from attendance, water, and step data — so the trainer doesn't have to manually cross-reference logs to spot a pattern.
- **State management:** React Context, not Redux — the shared state (selected category filter, selected client) is small and doesn't justify the extra boilerplate at this scale.

---

## What I'd build next with another week

- Real backend + persistence (currently static/mock data)
- Replace the rule-based "why this trend" explanations with an actual LLM API call for more nuanced, varied insight generation
- Trim scope: in hindsight, Finance and the full Dashboard page go beyond what the brief asked for ("a small, well-chosen subset of features") — I'd have focused entirely on Client Details + Insights and cut the rest
- Real photo upload for meal-proof logging (currently a checkbox placeholder)

---

## AI tools used, and how

I used Claude throughout development, specifically for:
- **Component architecture decisions** — e.g. talking through Context vs. Redux for this scale, and category-based conditional rendering for the accountability features
- **Debugging real bugs**, not just generating code — e.g. tracing a chart axis rendering issue caused by calling `d3.axisLeft()` twice with mismatched tick counts, and a CSS specificity/load-order bug where mobile styles were being silently overridden
- **Migrating all chart components from D3 to Plotly** partway through the build, after realizing the brief required Plotly specifically
- **Responsive design pass** — identifying which layout containers (sidebar, header, chart grids) had no mobile handling at all and fixing them
- Drafting this README

All architecture decisions, data modeling, and final integration were done and reviewed by me — Claude was used as a collaborator for speed and for catching bugs I'd have spent longer finding manually, not as a black box that produced the app unsupervised.

---

## Features

**Dashboard** — KPI summary cards, today's schedule, quick stats

**Client Management** — directory, search/filter, client profile, goal tracking, progress history

**Analytics** — client growth, workout distribution, membership breakdown, revenue trend, goal achievement, attendance

**Insights** — top performers, clients needing attention, smart recommendations

**Revenue & Payments** — revenue summary, payment status, monthly collections, installment tracking

---

## Charts

All charts are built with **Plotly** (`react-plotly.js`) — line charts, bar charts, donut charts, and progress visualizations.

---

## Tech stack

| Category | Technology |
|----------|------------|
| Frontend | React 19 |
| Language | TypeScript |
| Build Tool | Vite |
| Routing | React Router |
| Charts | Plotly |
| Styling | CSS3 |
| Icons | Lucide React |

---

## Folder structure

```
src/
├── components/
├── charts/
├── pages/
├── modals/
├── data/
├── utils/
├── types/
├── assets/
└── layout/
```

---

## Architecture

```
Pages
  → Reusable UI Components
    → Charts (Plotly)
      → Static demo data
```

Each page handles presentation only; reusable components encapsulate visualization and UI behavior. Data is currently static/mock, isolated behind a data layer so it's a straightforward swap for a real API later.

---

## Getting started

```bash
npm install
npm run dev       # start dev server
npm run build     # production build
```

---

## Screenshot

<img width="1919" height="942" alt="Screenshot 2026-07-18 092426" src="https://github.com/user-attachments/assets/ae14671d-6cb3-46ad-8a30-002d23a4c06e" />

---

<img width="1908" height="940" alt="Screenshot 2026-07-18 092837" src="https://github.com/user-attachments/assets/1fe131fa-1ee6-410a-842f-7bfa292949b0" />

---

<img width="1896" height="942" alt="Screenshot 2026-07-18 092957" src="https://github.com/user-attachments/assets/dd6f1ca3-8427-49a4-9aae-0df901664ac0" />

---

<img width="1887" height="947" alt="Screenshot 2026-07-18 093009" src="https://github.com/user-attachments/assets/05b676cd-89ec-45f5-bd52-ac62758f863a" />

---

<img width="1909" height="932" alt="Screenshot 2026-07-18 093024" src="https://github.com/user-attachments/assets/edd3c339-2e6a-45e6-b7d6-6f070d775d48" />

---

## Author

Built as part of a Product Interface Engineer take-home assessment, focused on frontend architecture, interactive data visualization, responsive design, and product/UX judgment under a real user constraint.
