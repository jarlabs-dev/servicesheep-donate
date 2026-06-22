// donate.js — donation panel interactivity.
// Donations are collected via QR code (GCash / Maya / BPI · InstaPay); there is
// no checkout step. This just drives the payment-method tablist: clicking a tab
// (or arrowing to it) reveals that method's QR panel and hides the others.

const tablist = document.querySelector(".qr-tabs");
const tabs = Array.from(document.querySelectorAll(".qr-tab"));

function panelFor(tab) {
  return document.getElementById(tab.getAttribute("aria-controls"));
}

function selectTab(tab, { focus = false } = {}) {
  tabs.forEach((t) => {
    const selected = t === tab;
    t.setAttribute("aria-selected", String(selected));
    t.tabIndex = selected ? 0 : -1;
    const panel = panelFor(t);
    if (panel) panel.hidden = !selected;
  });
  if (focus) tab.focus();
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => selectTab(tab));
});

// Roving-tabindex keyboard support for the tablist (ARIA pattern).
tablist?.addEventListener("keydown", (e) => {
  const current = tabs.indexOf(document.activeElement);
  if (current === -1) return;
  let next;
  switch (e.key) {
    case "ArrowRight": next = (current + 1) % tabs.length; break;
    case "ArrowLeft":  next = (current - 1 + tabs.length) % tabs.length; break;
    case "Home":       next = 0; break;
    case "End":        next = tabs.length - 1; break;
    default: return;
  }
  e.preventDefault();
  selectTab(tabs[next], { focus: true });
});
