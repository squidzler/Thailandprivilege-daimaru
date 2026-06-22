/* ──────────────────────────────────────────────────────────────────────────
   currency.js — price currency toggle.

   Thai baht (฿) is ALWAYS the price of record. Every other currency shown on
   the site is an APPROXIMATE equivalent only; payment is made in baht to
   Thailand Privilege Card Co., Ltd. This script never changes the baht figure —
   it only fills in the "≈ approximate" equivalent next to it.

   To update a rate: edit RATES below. A value is the approximate number of
   Thai baht in ONE unit of that currency (e.g. USD: 34.2 means ฿34.2 ≈ $1).
   These are deliberately rounded; equivalents are rounded to the nearest 1,000.
   ────────────────────────────────────────────────────────────────────────── */
(function () {
  "use strict";

  // ── Editable approximate rates: baht per 1 unit of currency ──
  var RATES = {
    USD: 34.2,
    EUR: 37.0,
    GBP: 43.0,
    AUD: 22.5,
    CAD: 25.0,
    SGD: 25.5,
    AED: 9.32,
    HKD: 4.385,
    TWD: 1.086
  };

  // Display order, full names, and how each is written
  var CUR = [
    { code: "USD", name: "US Dollar",          sym: "$"   },
    { code: "EUR", name: "Euro",               sym: "€"   },
    { code: "GBP", name: "British Pound",       sym: "£"   },
    { code: "AUD", name: "Australian Dollar",   sym: "A$"  },
    { code: "CAD", name: "Canadian Dollar",     sym: "C$"  },
    { code: "SGD", name: "Singapore Dollar",    sym: "S$"  },
    { code: "AED", name: "UAE Dirham",          sym: ""    },
    { code: "HKD", name: "Hong Kong Dollar",    sym: "HK$" },
    { code: "TWD", name: "New Taiwan Dollar",   sym: "NT$" }
  ];

  var KEY = "tpCurrency";
  var DEFAULT = "USD";

  function meta(code) {
    for (var i = 0; i < CUR.length; i++) { if (CUR[i].code === code) return CUR[i]; }
    return null;
  }
  function fmt(n) { return n.toLocaleString("en-US"); }

  // "$19,000" / "AED 70,000"  (symbol + value, no trailing code)
  function shortValue(thb, code) {
    var rate = RATES[code];
    if (!rate) return "";
    var v = Math.round(thb / rate / 1000) * 1000;
    var m = meta(code);
    return (m && m.sym) ? (m.sym + fmt(v)) : (code + " " + fmt(v));
  }
  // "$19,000 USD" / "AED 70,000"
  function fullValue(thb, code) {
    var m = meta(code);
    var s = shortValue(thb, code);
    return (m && m.sym) ? (s + " " + code) : s;
  }

  function current() {
    try { return localStorage.getItem(KEY) || DEFAULT; } catch (e) { return DEFAULT; }
  }
  function save(code) { try { localStorage.setItem(KEY, code); } catch (e) {} }

  function render(code) {
    if (!RATES[code]) code = DEFAULT;

    // price equivalents
    var nodes = document.querySelectorAll("[data-thb]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var thb = parseInt(el.getAttribute("data-thb"), 10);
      if (isNaN(thb)) continue;
      var mode = el.getAttribute("data-eq"); // "paren" | "short" | null(full)
      if (mode === "short") {
        el.textContent = shortValue(thb, code);
      } else if (mode === "paren") {
        el.textContent = "(≈ " + fullValue(thb, code) + ")";
      } else {
        el.textContent = "≈ " + fullValue(thb, code);
      }
    }

    // dynamic labels, e.g. a table header: data-eq-label="Price (≈ %c)"
    var labels = document.querySelectorAll("[data-eq-label]");
    for (var j = 0; j < labels.length; j++) {
      labels[j].textContent = labels[j].getAttribute("data-eq-label").replace("%c", code);
    }

    // keep every toggle in sync
    var sels = document.querySelectorAll(".cur-select");
    for (var k = 0; k < sels.length; k++) { sels[k].value = code; }
  }

  function fillSelect(sel) {
    for (var i = 0; i < CUR.length; i++) {
      var o = document.createElement("option");
      o.value = CUR[i].code;
      o.textContent = CUR[i].code + " — " + CUR[i].name;
      sel.appendChild(o);
    }
  }

  function init() {
    var sels = document.querySelectorAll(".cur-select");
    for (var i = 0; i < sels.length; i++) {
      if (!sels[i].options.length) fillSelect(sels[i]);
      sels[i].addEventListener("change", function (e) {
        save(e.target.value);
        render(e.target.value);
      });
    }
    render(current());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
