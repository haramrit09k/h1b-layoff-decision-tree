# H-1B Layoff Navigator

A free tool for H-1B workers who've just been laid off. Enter your layoff date and a
few details about your situation, and get:

- Your exact grace-period deadline (the shorter of 60 days from your last day of
  employment, or your I-94 expiry)
- A ranked list of visa options you qualify for (H-1B transfer, H-4, B-1/B-2, F-1,
  O-1, or voluntary departure), each with typical timelines, fees, and risk level
- A document checklist for whichever path you choose
- Current USCIS processing times, kept up to date automatically

This is not legal advice — it's a starting point to help you move fast during a
stressful 60-day window.

## How it works

The app is a static Next.js site (`output: "export"`) with no backend or database.
All eligibility logic runs client-side:

- `data/visa-paths.ts` defines each visa path: eligibility rules, work-authorization
  notes, filing deadlines, required documents, fees, and risk level.
- `lib/calculator.ts` takes the user's inputs (layoff date, I-94 expiry, spouse
  visa status, I-140 status, school acceptance) and computes the grace-period
  deadline and which paths apply.
- `data/processing-times.json` holds USCIS processing-time estimates per form,
  refreshed by `scripts/update-processing-times.mjs`.
- `components/` holds the form, results cards, countdown timer, and document
  checklist UI.

Pages: `/` (the input form), `/results` (computed options), `/about`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Build the static export |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `node scripts/update-processing-times.mjs` | Refresh USCIS processing-time estimates in `data/processing-times.json` |

A GitHub Actions workflow (`.github/workflows`) runs the processing-times script on
a schedule so the estimates stay current without manual upkeep.

## Tech stack

- [Next.js](https://nextjs.org) (App Router, static export)
- React 19 + TypeScript
- Tailwind CSS

## Disclaimer

This tool provides general information based on publicly available USCIS
guidance and is not a substitute for advice from a licensed immigration
attorney. Immigration rules change and individual circumstances vary — verify
your specific situation with a qualified professional before making decisions.
