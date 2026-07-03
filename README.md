# Weinold Consulting — Procurement Assessments

Static site with two tools, deployed on Vercel:

- `/pulse` — Procurement Pulse Check (6 questions, lead magnet)
- `/assessment` — Procurement Maturity Assessment 2.0 (72 questions)

## Structure
- `pulse/index.html` — Pulse Check (self-contained)
- `pulse/og-image.png` — LinkedIn/social preview image (1200x630)
- `assessment/index.html` — Full assessment (self-contained)
- `vercel.json` — clean URLs + a `/p` short redirect

## Before going live — edit these once
1. **pulse/index.html**, in the `<head>`:
   - `og:url`   -> your real URL, e.g. `https://weinold-consulting.com/pulse`
   - `og:image` -> e.g. `https://weinold-consulting.com/pulse/og-image.png`
   (Must be absolute URLs — LinkedIn will not resolve relative paths.)
2. **assessment/index.html**, top of the `<script>` block (optional):
   - `FORM_ENDPOINT` -> paste a Formspree endpoint to enable one-click result submission.

The pulse-to-assessment link is already relative (`/assessment`) and works on any domain.

## Deploy
Push to `main` -> Vercel auto-deploys production.
Push a branch / open a PR -> Vercel creates a preview URL for testing.

After the OG URLs are live, run the page once through
https://www.linkedin.com/post-inspector/ to refresh LinkedIn's preview cache.
