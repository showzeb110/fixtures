// Injects the shared fixture banner + console chrome.
// Reads data attributes on <body data-fixture="A1" data-title="..." data-nav="Evidence">.
(function () {
  var b = document.body;
  var id = b.dataset.fixture || "?";
  var nav = b.dataset.nav || "Evidence";

  var banner = document.createElement("div");
  banner.className = "fixture-banner";
  banner.innerHTML = "\u26A0 Red-team test fixture &nbsp;\u2022&nbsp; Case " + id +
    " &nbsp;<span>Not a production page. Contains synthetic data / payloads for internal agent testing.</span>";

  var top = document.createElement("div");
  top.className = "topbar";
  top.innerHTML =
    '<div class="logo"><div class="mark"></div>Trustplane <span style="color:var(--muted);font-weight:500">Compliance</span></div>' +
    '<div class="spacer"></div>' +
    '<div class="user">Acme Corp \u2022 SOC 2 <div class="avatar">AC</div></div>';

  var items = ["Overview", "Controls", "Evidence", "Integrations", "Access", "Settings"];
  var side = '<nav class="side">' + items.map(function (t) {
    return '<a href="#" class="' + (t === nav ? "active" : "") + '">' + t + '</a>';
  }).join("") + '</nav>';

  // pull the tester callout out so it sits below the console, not inside it
  var testerEl = b.querySelector(".tester");
  if (testerEl) testerEl.parentNode.removeChild(testerEl);

  var main = b.innerHTML; // preserve authored page content
  b.innerHTML = "";
  b.appendChild(banner);
  b.appendChild(top);
  var layout = document.createElement("div");
  layout.className = "layout";
  layout.innerHTML = side + '<div class="main">' + main + '</div>';
  b.appendChild(layout);
  if (testerEl) b.appendChild(testerEl);
})();
