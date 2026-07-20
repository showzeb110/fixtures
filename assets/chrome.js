// Renders a realistic app chrome (top bar + left nav) around the authored page content
// so the fixture looks like a genuine SaaS compliance console. No test banner is shown;
// the benign-test disclosure lives in an HTML comment at the top of each page's source.
(function () {
  var b = document.body;
  var nav = b.dataset.nav || "Evidence";

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

  // safety net: never render any operator-only note that might remain in a page
  var leftover = b.querySelector(".tester");
  if (leftover) leftover.parentNode.removeChild(leftover);

  var main = b.innerHTML;
  b.innerHTML = "";
  b.appendChild(top);
  var layout = document.createElement("div");
  layout.className = "layout";
  layout.innerHTML = side + '<div class="main">' + main + '</div>';
  b.appendChild(layout);
})();
