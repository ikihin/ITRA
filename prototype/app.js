/* SEN prototype — multi-view navigation (no backend) */

const state = {
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
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => {
    el.hidden = true;
  }, 2200);
}

function show(name) {
  const landing = $("view-landing");
  const app = $("view-app");
  const appScreens = ["dashboard", "create", "pay", "success", "batch"];

  if (name === "landing") {
    landing.classList.add("active");
    app.classList.remove("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  landing.classList.remove("active");
  app.classList.add("active");

  const panel = appScreens.includes(name) ? name : "dashboard";

  document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));
  document.querySelectorAll(".side-link").forEach((b) => b.classList.remove("active"));

  const panelEl = $("panel-" + panel);
  if (panelEl) panelEl.classList.add("active");

  const navBtn = document.querySelector(`.side-link[data-nav="${panel}"]`);
  if (navBtn) navBtn.classList.add("active");

  if (panel === "pay") syncPayView();
  if (panel === "success") syncReceipt();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function syncPayView() {
  $("pay-amount").textContent =
    "$" + Number(state.amount).toLocaleString("en-US", { minimumFractionDigits: 2 });
  $("pay-meta").textContent =
    `Invoice ${state.invoiceId} · ${state.note || "Services"}`;
  const status = $("pay-status");
  if (state.paid) {
    status.textContent = "PAID";
    status.className = "badge badge-paid";
  } else {
    status.textContent = "Awaiting payment";
    status.className = "badge badge-open";
  }
}

function syncReceipt() {
  $("rc-id").textContent = state.invoiceId;
}

function createInvoice() {
  const client = $("f-client").value.trim() || "Client";
  const amount = Number($("f-amount").value) || 1000;
  const note = $("f-note").value.trim() || "Services";
  const n = Math.floor(1000 + Math.random() * 9000);

  state.client = client;
  state.amount = amount;
  state.note = note;
  state.invoiceId = "SEN-" + n;
  state.paid = false;

  toast("Invoice " + state.invoiceId + " created");
  show("pay");
}

function simulatePay() {
  if (state.paid) {
    show("success");
    return;
  }
  const btn = $("btn-sim-pay");
  btn.disabled = true;
  btn.textContent = "Confirming on Solana…";
  setTimeout(() => {
    state.paid = true;
    btn.disabled = false;
    btn.textContent = "Simulate client payment";
    toast("Payment confirmed · demo tx");
    show("success");
  }, 900);
}

function copyAddr() {
  const text = $("pay-addr").textContent;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => toast("Address copied"));
  } else {
    toast("Address: " + text);
  }
}

// Build fake QR density (visual only)
(function paintQr() {
  const grid = document.querySelector(".qr-grid");
  if (!grid) return;
  // CSS grid pattern is enough; optional noise via box-shadow not needed
})();

// Deep-link from hash
window.addEventListener("DOMContentLoaded", () => {
  const hash = (location.hash || "").replace("#", "");
  if (hash && hash !== "how" && hash !== "compare") {
    show(hash === "app" ? "dashboard" : hash);
  }
});
