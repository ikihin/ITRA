/* SEN — single-site navigation: home · pitch · demo · submit */

const state = {
  view: "home",
  pitchPage: 1,
  invoiceId: "SEN-1042",
  client: "Northwind Labs",
  amount: 1000,
  note: "Brand site redesign — milestone 2",
  paid: false,
};

function $(id) {
  return document.getElementById(id);
}

function toast(msg) {
  const el = $("toast");
  if (!el) return;
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => {
    el.hidden = true;
  }, 2200);
}

function go(view) {
  const allowed = ["home", "pitch", "demo", "submit"];
  if (!allowed.includes(view)) view = "home";
  state.view = view;

  document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
  const el = document.getElementById("view-" + view);
  if (el) el.classList.add("active");

  document.querySelectorAll(".global-tabs .tab").forEach((t) => {
    t.classList.toggle("active", t.getAttribute("data-go") === view);
  });

  if (view === "pitch") updatePitchUI();
  if (view === "demo") {
    /* keep last panel */
  }

  history.replaceState(null, "", "#" + view);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showPanel(name) {
  const panels = ["dashboard", "create", "pay", "success", "batch"];
  const panel = panels.includes(name) ? name : "dashboard";

  if (state.view !== "demo") go("demo");

  document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));
  document.querySelectorAll(".side-link").forEach((b) => b.classList.remove("active"));

  const panelEl = $("panel-" + panel);
  if (panelEl) panelEl.classList.add("active");

  const navBtn = document.querySelector(`.side-link[data-panel="${panel}"]`);
  if (navBtn) navBtn.classList.add("active");

  if (panel === "pay") syncPayView();
  if (panel === "success") syncReceipt();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setPitchPage(n) {
  state.pitchPage = n < 1 ? 1 : n > 2 ? 2 : n;
  updatePitchUI();
}

function updatePitchUI() {
  document.querySelectorAll(".pitch-slide").forEach((s) => {
    const num = Number(s.getAttribute("data-slide"));
    s.classList.toggle("active", num === state.pitchPage);
  });
  const ind = $("pitch-indicator");
  if (ind) ind.textContent = state.pitchPage + " / 2";
  const prev = $("pitch-prev");
  const next = $("pitch-next");
  if (prev) prev.disabled = state.pitchPage <= 1;
  if (next) next.disabled = state.pitchPage >= 2;
}

function syncPayView() {
  const amt = $("pay-amount");
  const meta = $("pay-meta");
  const status = $("pay-status");
  if (amt) {
    amt.textContent =
      "$" + Number(state.amount).toLocaleString("en-US", { minimumFractionDigits: 2 });
  }
  if (meta) {
    meta.textContent = `Invoice ${state.invoiceId} · ${state.note || "Services"}`;
  }
  if (status) {
    if (state.paid) {
      status.textContent = "PAID";
      status.className = "badge badge-paid";
    } else {
      status.textContent = "Awaiting payment";
      status.className = "badge badge-open";
    }
  }
}

function syncReceipt() {
  const rc = $("rc-id");
  if (rc) rc.textContent = state.invoiceId;
}

function createInvoice() {
  const client = ($("f-client") && $("f-client").value.trim()) || "Client";
  const amount = ($("f-amount") && Number($("f-amount").value)) || 1000;
  const note = ($("f-note") && $("f-note").value.trim()) || "Services";
  const n = Math.floor(1000 + Math.random() * 9000);

  state.client = client;
  state.amount = amount;
  state.note = note;
  state.invoiceId = "SEN-" + n;
  state.paid = false;

  toast("Invoice " + state.invoiceId + " created");
  showPanel("pay");
}

function simulatePay() {
  if (state.paid) {
    showPanel("success");
    return;
  }
  const btn = $("btn-sim-pay");
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Confirming on Solana…";
  }
  setTimeout(() => {
    state.paid = true;
    if (btn) {
      btn.disabled = false;
      btn.textContent = "Simulate client payment";
    }
    toast("Payment confirmed · demo tx");
    showPanel("success");
  }, 900);
}

function copyAddr() {
  const node = $("pay-addr");
  const text = node ? node.textContent : "";
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => toast("Address copied"));
  } else {
    toast(text);
  }
}

function copyNotes() {
  const text = [
    "SEN — Superteam VN submission",
    "",
    "One-liner:",
    "Clients pay in USDC on Solana; freelancers and agencies in Vietnam keep more, faster — without replacing MoMo/VNPay for domestic payments.",
    "",
    "1. The business today:",
    "Vietnam freelancers and small agencies export services to US/EU/SG/AU. Money routes through Upwork, Payoneer, Wise, or banks. On ~$1,000 invoices, stacked fees often leave ~$920–950 after several days. Worst band: $200–$5,000.",
    "",
    "2. Why onchain:",
    "Domestic VND is solved by MoMo/VNPay. Broken middle mile: small cross-border settlement. Solana + USDC → minutes, low fees, global reach, on-chain receipts. Limits: off-ramp, tax, contracts stay Web2.",
    "",
    "3. How it works:",
    "Create invoice → client pays USDC via Solana Pay → wallet settles + receipt → optional agency batch split → optional licensed VND off-ramp later.",
    "",
    "4. What’s next:",
    "10 interviews → Devnet happy path → beta 5 agencies → off-ramp partner + tax export. Positioning: settlement tool for services export, not deposit-taking e-wallet.",
    "",
    "Prototype: this single website (Home + Pitch + Live demo).",
  ].join("\n");

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => toast("Notes copied to clipboard"));
  } else {
    toast("Copy manually from Submit notes page");
  }
}

// Event delegation
document.addEventListener("click", (e) => {
  const goEl = e.target.closest("[data-go]");
  if (goEl) {
    e.preventDefault();
    const view = goEl.getAttribute("data-go");
    if (view === "demo" && goEl.hasAttribute("data-panel")) {
      go("demo");
      showPanel(goEl.getAttribute("data-panel"));
      return;
    }
    go(view);
    return;
  }

  const panelEl = e.target.closest("[data-panel]");
  if (panelEl && !panelEl.hasAttribute("data-go")) {
    e.preventDefault();
    showPanel(panelEl.getAttribute("data-panel"));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const prev = $("pitch-prev");
  const next = $("pitch-next");
  if (prev) prev.addEventListener("click", () => setPitchPage(state.pitchPage - 1));
  if (next) next.addEventListener("click", () => setPitchPage(state.pitchPage + 1));

  const createBtn = $("btn-create");
  if (createBtn) createBtn.addEventListener("click", createInvoice);

  const payBtn = $("btn-sim-pay");
  if (payBtn) payBtn.addEventListener("click", simulatePay);

  const copyBtn = $("btn-copy");
  if (copyBtn) copyBtn.addEventListener("click", copyAddr);

  const batchBtn = $("btn-batch");
  if (batchBtn) {
    batchBtn.addEventListener("click", () => {
      toast("Demo: batch payout would send multi-recipient Solana tx");
    });
  }

  const notesBtn = $("btn-copy-notes");
  if (notesBtn) notesBtn.addEventListener("click", copyNotes);

  // Keyboard for pitch
  document.addEventListener("keydown", (e) => {
    if (state.view !== "pitch") return;
    if (e.key === "ArrowRight" || e.key === "PageDown") setPitchPage(state.pitchPage + 1);
    if (e.key === "ArrowLeft" || e.key === "PageUp") setPitchPage(state.pitchPage - 1);
  });

  const hash = (location.hash || "").replace("#", "");
  if (["home", "pitch", "demo", "submit"].includes(hash)) {
    go(hash);
  } else if (hash === "app") {
    go("demo");
  } else {
    go("home");
  }
});

// Legacy alias if anything still calls show()
function show(name) {
  const map = {
    landing: "home",
    home: "home",
    pitch: "pitch",
    dashboard: "demo",
    create: "demo",
    pay: "demo",
    success: "demo",
    batch: "demo",
    submit: "submit",
  };
  const view = map[name] || "home";
  go(view);
  if (["dashboard", "create", "pay", "success", "batch"].includes(name)) {
    showPanel(name);
  }
}
