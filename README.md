# SEN — Cross-border payout for Vietnam

**Superteam Vietnam bounty package**  
Freelancer / agency cross-border settlement on Solana (USDC).

Visual identity: **Vietnam flag red + gold**, lotus/star motifs, modern fintech (not kitschy folk).

---

## What’s in this folder

| Path | What |
|------|------|
| `prototype/index.html` | **Clickable MVP** — landing + app (invoice → pay → receipt → batch) |
| `prototype/styles.css` | Red/gold design system |
| `prototype/app.js` | Multi-screen navigation (demo only, no backend) |
| `deck/SEN-Pitch-Deck-2pages.pptx` | **2-page pitch deck** for submission |
| `deck/create-deck.js` | Regenerates the PPTX |
| `SUBMISSION.md` | Copy-paste notes for the bounty form |

---

## Open the prototype

1. Open in browser (double-click or):

```powershell
start C:\Users\rizki\SenPay\prototype\index.html
```

2. Click through:
   - **Landing** → problem + why onchain
   - **Open app** → dashboard
   - **Create invoice** → **Client pay link** → **Simulate payment** → receipt
   - **Batch payout** → agency split

No install required. Demo only — no real Solana transactions.

---

## Rebuild the deck

```powershell
cd C:\Users\rizki\SenPay\deck
npm install pptxgenjs
node create-deck.js
```

Output: `SEN-Pitch-Deck-2pages.pptx`

---

## Product one-liner

> Get paid from the world. Keep more of it.  
> USDC on Solana for Vietnam freelancers & agencies — middle-mile cross-border settlement, not a MoMo replacement.

---

## Eligibility reminder

Bounty is for **Vietnamese citizens / Vietnam-based residents** only. Verify ID/residence if you win.

---

## Customize before submit

1. Replace demo founder name / story with **your real** experience or interviews.
2. Add 3–5 real fee screenshots if you have them.
3. Put your name + contact on the deck footer.
4. Optional: host `prototype/` on Vercel/Netlify and paste the URL.
