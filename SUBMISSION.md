# Superteam VN — submission draft (SEN)

## Title
SEN — Cross-border USDC payout for Vietnam freelancers & agencies

## One-liner
Clients pay in USDC on Solana; freelancers and agencies in Vietnam keep more, faster — without replacing MoMo/VNPay for domestic payments.

## Eligibility
- [ ] I am a Vietnamese citizen or Vietnam-based resident
- [ ] I can provide ID / residence proof if selected

## Links
- Pitch deck (2 pages): `deck/SEN-Pitch-Deck-2pages.pptx`
- Prototype: open `prototype/index.html` (or hosted URL: ________)

## Cover the four required points

### 1. The business today
Vietnam freelancers and small agencies export services to US/EU/SG/AU clients. Money still routes through Upwork, Payoneer, Wise, or banks. On invoices around $1,000, stacked platform + FX + intermediary fees often leave roughly $920–950 after several days. The worst band is $200–$5,000 — too small for efficient SWIFT, too frequent for traditional banking.

### 2. Why onchain
Domestic VND payment is already solved by MoMo and VNPay. The broken piece is the **middle mile**: small, frequent, cross-border settlement. Solana + USDC optimizes for that shape of money: minutes instead of days, network fees in cents, global client reach, immutable on-chain receipts.

**Honest limits:** off-ramp to VND, tax reporting, contracts, and disputes stay hybrid Web2. We do not claim onchain is better for paying coffee in Saigon.

### 3. How it works
1. Freelancer/agency creates an invoice (USD amount + note).  
2. Client opens Solana Pay link / QR and pays USDC.  
3. Funds settle to the recipient wallet; status flips to Paid with tx receipt.  
4. Agencies can batch-split to team wallets. Optional licensed off-ramp later for VND.

### 4. What’s next
- Interview 10 freelancers/agencies on real fee % and client willingness.  
- Ship Devnet Solana Pay happy path.  
- Closed beta with 5 agencies (USDC-in only).  
- Partner off-ramp + tax export fields.  
- Regulatory posture: settlement tooling for services export — not a deposit-taking e-wallet.

## Founder note (edit me)
I am submitting as [your name / role]. I [do not yet run a registered agency / freelance / interviewed X people]. I know this pain because [personal line]. Prototype and deck are ready; I want a working session on GTM and compliance fit for Vietnam.

## Languages
Deck and prototype UI: English (can add Vietnamese copy on request).
