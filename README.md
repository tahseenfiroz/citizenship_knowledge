# Citizenship Practice (Next.js) — Excel-powered

Unofficial practice questions (MCQ / True-False) for the Canadian Citizenship test.
No login, no email, no database. Questions come from an Excel file inside the repo.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Add your questions (Excel template)

Edit: `data/questions.xlsx`

Sheet name must be: `questions`

Columns (row 1):
- id
- chapter
- type (MCQ or TF)
- question
- a
- b
- c
- d
- correct (A/B/C/D or TRUE/FALSE)
- explanation

The app converts Excel → `data/questions.json` automatically before `dev` and `build`.

## Deploy

- Push this repo to GitHub
- Deploy on Vercel (no env vars needed)
- Update `data/questions.xlsx` and redeploy when you add/edit questions
