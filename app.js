/* SEN — matured concept SPA: home · pitch (4) · demo · bounty notes */

const PITCH_TOTAL = 4;
const LEGACY_RATE = 0.08; // illustrative stacked fee
const SEN_RATE = 0.005; // illustrative settle leg

const state = {
  view: "home",
  pitchPage: 1,
  invoiceId: "SEN-1042",
  client: "Northwind Labs",
  amount: 1000,
  note: "Brand site redesign — milestone 2 (accepted in Figma review)",
  paid: false,
};

function $(id) {
  return document.getElementById(id);
}

function money(n) {
  return (
    "$" +
    Number(n).toLocaleString("en-US", {
      minimumFractionDigits: n % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    })
  );
}

function estimate(amount) {
  const a = Math.max(0, Number(amount) || 0);
  const legacyLost = a * LEGACY_RATE;
  const senLost = a * SEN_RATE;
  return {
    amount: a,
    legacyNet: a - legacyLost,
    senNet: a - senLost,
    legacyLost,
    senLost,
    saved: legacyLost - senLost,
  };
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
  state.pitchPage = Math.min(PITCH_TOTAL, Math.max(1, n));
  updatePitchUI();
}

function updatePitchUI() {
  document.querySelectorAll(".pitch-slide").forEach((s) => {
    const num = Number(s.getAttribute("data-slide"));
    s.classList.toggle("active", num === state.pitchPage);
  });
  const ind = $("pitch-indicator");
  if (ind) ind.textContent = state.pitchPage + " / " + PITCH_TOTAL;
  const prev = $("pitch-prev");
  const next = $("pitch-next");
  if (prev) prev.disabled = state.pitchPage <= 1;
  if (next) next.disabled = state.pitchPage >= PITCH_TOTAL;
}

function updateFeeCalculator() {
  const range = $("fee-range");
  if (!range) return;
  const e = estimate(range.value);
  const set = (id, text) => {
    const n = $(id);
    if (n) n.textContent = text;
  };
  set("fee-amount-label", money(e.amount));
  set("fee-legacy-net", "~" + money(e.legacyNet));
  set(
    "fee-legacy-detail",
    "~" + money(e.legacyLost) + " lost · ~5 days"
  );
  set("fee-sen-net", "~" + money(e.senNet));
  set(
    "fee-sen-detail",
    "~" + money(e.senLost) + " all-in leg · minutes"
  );
  set("fee-saved", "+" + money(e.saved));
}

function syncPayView() {
  const e = estimate(state.amount);
  const amt = $("pay-amount");
  const meta = $("pay-meta");
  const status = $("pay-status");
  const hint = $("pay-save-hint");

  if (amt) {
    amt.textContent = money(state.amount).replace(/\.00$/, "") + (state.amount % 1 ? "" : ".00");
    if (!String(state.amount).includes(".")) {
      amt.textContent =
        "$" +
        Number(state.amount).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
    }
  }
  if (meta) {
    meta.textContent = `Invoice ${state.invoiceId} · ${state.note || "Services"}`;
  }
  if (status) {
    if (state.paid) {
      status.textContent = "SETTLED";
      status.className = "badge badge-paid";
    } else {
      status.textContent = "Awaiting settlement";
      status.className = "badge badge-open";
    }
  }
  if (hint) {
    hint.textContent =
      "Illustrative vendor keep vs ~8% stack: +" +
      money(e.saved) +
      " on this invoice";
  }
}

function syncReceipt() {
  const e = estimate(state.amount);
  const rc = $("rc-id");
  const client = $("rc-client");
  const title = $("success-title");
  const save = $("success-save");

  if (rc) rc.textContent = state.invoiceId;
  if (client) client.textContent = state.client;
  if (title) {
    title.textContent =
      Number(state.amount).toLocaleString("en-US") + " USDC settled";
  }
  if (save) {
    save.innerHTML =
      "Est. kept vs legacy stack on this invoice: <strong>+" +
      money(e.saved) +
      "</strong>";
  }
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

  toast("Invoice " + state.invoiceId + " ready for client");
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
    toast("Settlement confirmed · demo receipt");
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
  const grab = (id) => {
    const el = $(id);
    return el ? el.textContent.trim() : "";
  };
  const text = [
    "SEN — Superteam Vietnam bounty (matured concept)",
    "Live: https://ikihin.github.io/SenPay/",
    "",
    "One-liner:",
    grab("note-oneliner"),
    "",
    "1. The business today:",
    grab("note-business"),
    "",
    "2. Why onchain:",
    grab("note-why"),
    "",
    "3. How it works:",
    grab("note-how"),
    "",
    "4. What’s next:",
    grab("note-next"),
    "",
    "Founder note:",
    grab("founder-note"),
  ].join("\n");

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => toast("Bounty notes copied"));
  } else {
    toast("Copy manually from Bounty notes page");
  }
}

document.addEventListener("click", (e) => {
  const goEl = e.target.closest("[data-go]");
  if (goEl) {
    e.preventDefault();
    go(goEl.getAttribute("data-go"));
    return;
  }

  const panelEl = e.target.closest("[data-panel]");
  if (panelEl) {
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
      toast("Demo: multi-recipient Solana transfer for team split");
    });
  }

  const notesBtn = $("btn-copy-notes");
  if (notesBtn) notesBtn.addEventListener("click", copyNotes);

  const range = $("fee-range");
  if (range) {
    range.addEventListener("input", updateFeeCalculator);
    updateFeeCalculator();
  }

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
