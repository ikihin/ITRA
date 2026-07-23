/**
 * SEN — 2-page Superteam Vietnam bounty pitch deck
 * Colors: Vietnam flag red + gold, cream paper
 */
const pptxgen = require("pptxgenjs");

const RED = "DA251D";
const RED_DEEP = "A71B15";
const GOLD = "FFCD00";
const GOLD_DEEP = "C99700";
const CREAM = "FFF9F2";
const INK = "1A0A0A";
const INK_SOFT = "5C3D3D";
const WHITE = "FFFFFF";

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "SEN";
  pres.title = "SEN — Cross-border payout for Vietnam freelancers";
  pres.subject = "Superteam Vietnam bounty submission";

  // ========== SLIDE 1 ==========
  const s1 = pres.addSlide();
  s1.background = { color: CREAM };

  // Left red rail (flag vertical feel)
  s1.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.18, h: 5.625,
    fill: { color: RED },
  });
  // Gold accent strip
  s1.addShape(pres.shapes.RECTANGLE, {
    x: 0.18, y: 0, w: 0.06, h: 5.625,
    fill: { color: GOLD },
  });

  // Top gold line
  s1.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 0.28, w: 9.2, h: 0.04,
    fill: { color: GOLD },
  });

  // Star badge
  s1.addShape(pres.shapes.OVAL, {
    x: 0.45, y: 0.42, w: 0.38, h: 0.38,
    fill: { color: RED },
  });
  s1.addText("★", {
    x: 0.45, y: 0.42, w: 0.38, h: 0.38,
    fontSize: 14, color: GOLD, align: "center", valign: "middle",
    fontFace: "Arial",
  });

  s1.addText("SEN", {
    x: 0.95, y: 0.42, w: 1.2, h: 0.38,
    fontSize: 20, bold: true, color: RED, fontFace: "Arial",
    valign: "middle", charSpacing: 4,
  });
  s1.addText("Superteam VN bounty  ·  Solana  ·  Freelancer / agency cross-border payout", {
    x: 2.2, y: 0.45, w: 7.3, h: 0.32,
    fontSize: 10, color: INK_SOFT, fontFace: "Arial", valign: "middle",
  });

  s1.addText("Get paid from the world. Keep more of it.", {
    x: 0.45, y: 0.95, w: 9.1, h: 0.48,
    fontSize: 24, bold: true, color: INK, fontFace: "Arial",
  });
  s1.addText("Onchain settlement rail for Vietnam freelancers & agencies — not a domestic MoMo clone.", {
    x: 0.45, y: 1.4, w: 9.1, h: 0.32,
    fontSize: 12, color: INK_SOFT, fontFace: "Arial",
  });

  // --- Card: Business today ---
  s1.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 1.85, w: 4.55, h: 2.0,
    fill: { color: WHITE },
    shadow: { type: "outer", color: "A71B15", blur: 10, opacity: 0.08, offset: 2 },
    rectRadius: 0.1,
  });
  s1.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.85, w: 0.1, h: 2.0,
    fill: { color: RED },
  });
  s1.addText("01  THE BUSINESS TODAY", {
    x: 0.65, y: 1.95, w: 4.1, h: 0.28,
    fontSize: 10, bold: true, color: RED, fontFace: "Arial", charSpacing: 1,
  });
  s1.addText([
    {
      text: "Who: ",
      options: { bold: true, color: INK },
    },
    {
      text: "VN freelancers & small agencies paid by US/EU/SG/AU clients.\n",
      options: { color: INK_SOFT },
    },
    {
      text: "Flow: ",
      options: { bold: true, color: INK },
    },
    {
      text: "Client → Upwork / Payoneer / Wise / bank → fee + FX + hold → VND.\n",
      options: { color: INK_SOFT },
    },
    {
      text: "Pain: ",
      options: { bold: true, color: INK },
    },
    {
      text: "On ~$1,000 invoices, stacked fees often leave ~$920–950 after days. Worst band: $200–$5,000 (too small for SWIFT, too frequent for banks).",
      options: { color: INK_SOFT },
    },
  ], {
    x: 0.65, y: 2.28, w: 4.1, h: 1.4,
    fontSize: 10, fontFace: "Arial", valign: "top",
  });

  // --- Card: Why onchain ---
  s1.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 1.85, w: 4.55, h: 2.0,
    fill: { color: RED },
    rectRadius: 0.1,
  });
  s1.addText("02  WHY ONCHAIN", {
    x: 5.3, y: 1.95, w: 4.15, h: 0.28,
    fontSize: 10, bold: true, color: GOLD, fontFace: "Arial", charSpacing: 1,
  });
  s1.addText("Domestic VND rails (MoMo/VNPay) already work. The broken middle mile is small cross-border settlement.", {
    x: 5.3, y: 2.28, w: 4.15, h: 0.55,
    fontSize: 10, color: WHITE, fontFace: "Arial",
  });
  s1.addText([
    { text: "• USDC on Solana: minutes, cents-level network fees\n", options: { breakLine: false } },
    { text: "• Global client pay without correspondent stack\n", options: { breakLine: false } },
    { text: "• On-chain tx = immutable receipt for both sides\n", options: { breakLine: false } },
    { text: "• Honest limit: off-ramp VND, tax, contracts stay hybrid Web2", options: { breakLine: false } },
  ], {
    x: 5.3, y: 2.85, w: 4.15, h: 0.85,
    fontSize: 10, color: "FFE566", fontFace: "Arial",
  });

  // Bottom metrics bar
  s1.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 4.05, w: 9.25, h: 1.2,
    fill: { color: WHITE },
    rectRadius: 0.1,
  });

  const metrics = [
    { t: "Legacy on $1k", s: "~$50–80 fees\n+ 2–7 days" },
    { t: "SEN target", s: "<1% settle leg\n+ minutes" },
    { t: "Asset", s: "USDC\n(not a new token)" },
    { t: "Scope", s: "Export of services\nnot domestic P2P" },
  ];
  metrics.forEach((m, i) => {
    const x = 0.55 + i * 2.3;
    s1.addText(m.t, {
      x, y: 4.18, w: 2.1, h: 0.28,
      fontSize: 10, bold: true, color: RED, fontFace: "Arial",
    });
    s1.addText(m.s, {
      x, y: 4.48, w: 2.1, h: 0.6,
      fontSize: 11, color: INK, fontFace: "Arial",
    });
    if (i < 3) {
      s1.addShape(pres.shapes.RECTANGLE, {
        x: x + 2.05, y: 4.25, w: 0.015, h: 0.8,
        fill: { color: "F0D0C8" },
      });
    }
  });

  s1.addText("Page 1/2  ·  ★ Vietnam-first  ·  English & Vietnamese equally welcome", {
    x: 0.4, y: 5.32, w: 9.2, h: 0.22,
    fontSize: 9, color: INK_SOFT, fontFace: "Arial",
  });

  // ========== SLIDE 2 ==========
  const s2 = pres.addSlide();
  s2.background = { color: CREAM };

  s2.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.18, h: 5.625,
    fill: { color: RED },
  });
  s2.addShape(pres.shapes.RECTANGLE, {
    x: 0.18, y: 0, w: 0.06, h: 5.625,
    fill: { color: GOLD },
  });
  s2.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 0.28, w: 9.2, h: 0.04,
    fill: { color: GOLD },
  });

  s2.addText("SEN", {
    x: 0.45, y: 0.42, w: 1.0, h: 0.32,
    fontSize: 16, bold: true, color: RED, fontFace: "Arial", charSpacing: 3,
  });
  s2.addText("How it works in practice  ·  What’s next", {
    x: 1.5, y: 0.45, w: 7.5, h: 0.28,
    fontSize: 12, color: INK_SOFT, fontFace: "Arial",
  });

  // Flow steps
  const steps = [
    { n: "1", t: "Create invoice", d: "USD amount, client, note → Solana Pay link + QR" },
    { n: "2", t: "Client pays USDC", d: "Any wallet / country. Stable settlement, no SWIFT stack" },
    { n: "3", t: "You receive", d: "Wallet credit + on-chain receipt in minutes" },
    { n: "4", t: "Optional", d: "Hold USDC · agency batch split · later VND off-ramp" },
  ];
  steps.forEach((st, i) => {
    const x = 0.4 + i * 2.4;
    s2.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: 0.9, w: 2.25, h: 1.55,
      fill: { color: i === 3 ? RED : WHITE },
      rectRadius: 0.08,
    });
    s2.addShape(pres.shapes.OVAL, {
      x: x + 0.15, y: 1.05, w: 0.32, h: 0.32,
      fill: { color: i === 3 ? GOLD : RED },
    });
    s2.addText(st.n, {
      x: x + 0.15, y: 1.05, w: 0.32, h: 0.32,
      fontSize: 12, bold: true, color: i === 3 ? INK : GOLD,
      align: "center", valign: "middle", fontFace: "Arial",
    });
    s2.addText(st.t, {
      x: x + 0.12, y: 1.45, w: 2.0, h: 0.3,
      fontSize: 12, bold: true, color: i === 3 ? GOLD : INK, fontFace: "Arial",
    });
    s2.addText(st.d, {
      x: x + 0.12, y: 1.78, w: 2.0, h: 0.55,
      fontSize: 10, color: i === 3 ? "FFE8E6" : INK_SOFT, fontFace: "Arial",
    });
  });

  // Two columns bottom
  s2.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 2.65, w: 4.55, h: 2.15,
    fill: { color: WHITE },
    rectRadius: 0.1,
  });
  s2.addText("03  MVP / PROTOTYPE", {
    x: 0.6, y: 2.78, w: 4.15, h: 0.28,
    fontSize: 10, bold: true, color: RED, fontFace: "Arial", charSpacing: 1,
  });
  s2.addText([
    { text: "Clickable web prototype (included):\n", options: { bold: true, color: INK } },
    { text: "• Landing — problem, why onchain, honesty limits\n", options: { color: INK_SOFT } },
    { text: "• Dashboard — earnings, open invoices\n", options: { color: INK_SOFT } },
    { text: "• Create invoice → client pay (QR) → paid receipt\n", options: { color: INK_SOFT } },
    { text: "• Agency batch payout (split to team)\n", options: { color: INK_SOFT } },
    { text: "Open:  prototype/index.html", options: { bold: true, color: RED } },
  ], {
    x: 0.6, y: 3.12, w: 4.15, h: 1.5,
    fontSize: 11, fontFace: "Arial",
  });

  s2.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 2.65, w: 4.55, h: 2.15,
    fill: { color: RED_DEEP },
    rectRadius: 0.1,
  });
  s2.addText("04  WHAT’S NEXT", {
    x: 5.3, y: 2.78, w: 4.15, h: 0.28,
    fontSize: 10, bold: true, color: GOLD, fontFace: "Arial", charSpacing: 1,
  });
  s2.addText([
    { text: "Tomorrow: ", options: { bold: true, color: GOLD } },
    { text: "10 interviews (fee % / days / client readiness)\n", options: { color: WHITE } },
    { text: "Week 1–2: ", options: { bold: true, color: GOLD } },
    { text: "Devnet Solana Pay happy path\n", options: { color: WHITE } },
    { text: "Month 1: ", options: { bold: true, color: GOLD } },
    { text: "Closed beta 5 agencies, USDC-in only\n", options: { color: WHITE } },
    { text: "Month 2–3: ", options: { bold: true, color: GOLD } },
    { text: "Licensed off-ramp partner + tax export\n", options: { color: WHITE } },
    { text: "Reg frame: ", options: { bold: true, color: GOLD } },
    { text: "settlement tool, not deposit-taking e-wallet", options: { color: "FFE566" } },
  ], {
    x: 5.3, y: 3.12, w: 4.15, h: 1.5,
    fontSize: 11, fontFace: "Arial",
  });

  // Footer banner
  s2.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 4.95, w: 9.25, h: 0.42,
    fill: { color: RED },
    rectRadius: 0.06,
  });
  s2.addText("★  SEN  ·  Lotus mark of rising value  ·  Built for Vietnam operators exporting services  ·  Page 2/2", {
    x: 0.5, y: 4.95, w: 9.05, h: 0.42,
    fontSize: 11, color: GOLD, fontFace: "Arial", align: "center", valign: "middle",
  });

  const out = require("path").join(__dirname, "SEN-Pitch-Deck-2pages.pptx");
  await pres.writeFile({ fileName: out });
  console.log("Wrote", out);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
