# SEN — all-in-one web

**Superteam Vietnam bounty**  
Cross-border USDC payout for Vietnam freelancers & agencies.

Everything lives in **one website** (no separate deck required to present):

| Tab | Content |
|-----|---------|
| **Home** | Positioning, problem, site map |
| **Pitch deck** | Full 2-page pitch (Prev/Next, arrow keys) |
| **Live demo** | Invoice → pay → receipt → agency batch |
| **Submit notes** | Copy-ready text for the bounty form |

Visual: Vietnam flag **red + gold**, star + lotus motifs.

---

## Open

Double-click or:

```powershell
start C:\Users\rizki\SenPay\index.html
```

Or with a local server:

```powershell
cd C:\Users\rizki\SenPay
npx --yes serve .
```

Deep links:

- `index.html#home`
- `index.html#pitch`
- `index.html#demo`
- `index.html#submit`

---

## Files that matter

```
SenPay/
  index.html      ← main SPA
  styles.css
  app.js
  README.md
  SUBMISSION.md
  deck/           ← optional PPTX export (same content as Pitch tab)
  prototype/      ← redirects to #demo
```

---

## Submit with one link

Host this folder (Netlify / Vercel / GitHub Pages) and paste **one URL** as pitch + prototype.

Optional PPTX still at `deck/SEN-Pitch-Deck-2pages.pptx` if a file upload is required.

---

## Eligibility

Vietnamese citizens / Vietnam-based residents only (verify if you win).
