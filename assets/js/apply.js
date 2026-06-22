/* ============================================================================
   Apply wizard — Thailand Privilege Visa by Daimaru
   3-step lead form: validation, conditional fields, autosave, submit.

   SUBMISSION
   - Set FORM_ENDPOINT below to a transactional endpoint (Formspree, FormSubmit,
     a Cloudflare Worker, etc.) to POST the lead as JSON in the background.
   - If FORM_ENDPOINT is left empty, the form falls back to opening the
     visitor's email client (mailto) pre-filled with the full application,
     addressed to EMAIL_TO with the site-tagging subject prefix. This works
     with no backend, exactly like the tier-recommendation form on programs.html.
   ========================================================================== */
(function () {
  'use strict';

  // Formspree endpoint. TEMPORARY: shares thailandelite.net's Apply form (xbdqenzp),
  // which routes to info@thailandelite.net. Swap to this site's own new form ID once
  // provisioned (same destination inbox) — see the team task.
  // NOTE: this only delivers if the Formspree form's "Allowed Domains" permits
  // thailandprivilege-daimaru.com; if it is locked to thailandelite.net, submissions
  // are silently rejected until the new form is created.
  var FORM_ENDPOINT  = 'https://formspree.io/f/xbdqenzp';
  var EMAIL_TO       = 'info@thailandelite.net';
  var SUBJECT_PREFIX = '[Daimaru]';              // agreed source tag for this site
  var SOURCE         = 'thailandprivilege-daimaru.com';
  var STORAGE_KEY    = 'tpd_apply_v1';

  var form = document.getElementById('applyForm');
  if (!form) return;

  /* ---- data: nationalities (demonyms) + countries (residence) ---- */
  var NATIONALITIES = ['American','Argentine','Australian','Austrian','Bahraini','Bangladeshi','Belgian','Brazilian','British','Bruneian','Bulgarian','Cambodian','Canadian','Chilean','Chinese','Colombian','Croatian','Czech','Danish','Dutch','Egyptian','Emirati','Estonian','Filipino','Finnish','French','German','Greek','Hong Konger','Hungarian','Icelandic','Indian','Indonesian','Iranian','Irish','Israeli','Italian','Japanese','Jordanian','Kazakh','Kenyan','Korean','Kuwaiti','Laotian','Latvian','Lebanese','Lithuanian','Luxembourgish','Malaysian','Maltese','Mexican','Mongolian','Moroccan','Myanmar','Nepali','New Zealander','Nigerian','Norwegian','Omani','Pakistani','Peruvian','Polish','Portuguese','Qatari','Romanian','Russian','Saudi','Singaporean','Slovak','Slovenian','South African','Spanish','Sri Lankan','Swedish','Swiss','Taiwanese','Thai','Turkish','Ukrainian','Vietnamese'];

  var COUNTRIES = ['Australia','Austria','Bahrain','Bangladesh','Belgium','Brazil','Brunei','Bulgaria','Cambodia','Canada','Chile','China','Colombia','Croatia','Czechia','Denmark','Egypt','Estonia','Finland','France','Germany','Greece','Hong Kong','Hungary','Iceland','India','Indonesia','Iran','Ireland','Israel','Italy','Japan','Jordan','Kazakhstan','Kenya','Kuwait','Laos','Latvia','Lebanon','Lithuania','Luxembourg','Malaysia','Malta','Mexico','Mongolia','Morocco','Myanmar','Nepal','Netherlands','New Zealand','Nigeria','Norway','Oman','Pakistan','Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia','Saudi Arabia','Singapore','Slovakia','Slovenia','South Africa','South Korea','Spain','Sri Lanka','Sweden','Switzerland','Taiwan','Thailand','Turkey','Ukraine','United Arab Emirates','United Kingdom','United States','Vietnam'];

  function fillSelect(id, items) {
    var sel = document.getElementById(id);
    if (!sel) return;
    var frag = document.createDocumentFragment();
    items.forEach(function (item) {
      var o = document.createElement('option');
      o.value = item; o.textContent = item;
      frag.appendChild(o);
    });
    var other = document.createElement('option');
    other.value = 'Other'; other.textContent = 'Other';
    frag.appendChild(other);
    sel.appendChild(frag);
  }
  fillSelect('nationality', NATIONALITIES);
  fillSelect('residence', COUNTRIES);

  /* ---- analytics (optional, no PII) ---- */
  function track(event, data) {
    try {
      if (window.dataLayer) window.dataLayer.push(Object.assign({ event: event }, data || {}));
      else if (typeof window.gtag === 'function') window.gtag('event', event, data || {});
    } catch (e) { /* analytics must never break the form */ }
  }

  /* ---- step navigation ---- */
  var steps = Array.prototype.slice.call(form.querySelectorAll('.wz-step'));
  var stepBar = document.getElementById('wzSteps');
  var current = 1;

  function showStep(n) {
    steps.forEach(function (s) {
      var active = +s.getAttribute('data-step') === n;
      s.classList.toggle('is-active', active);
      s.hidden = !active;
    });
    Array.prototype.slice.call(stepBar.children).forEach(function (li) {
      var step = +li.getAttribute('data-step');
      var state = step === n ? 'active' : (step < n ? 'done' : 'upcoming');
      li.setAttribute('data-state', state);
      if (state === 'active') li.setAttribute('aria-current', 'step');
      else li.removeAttribute('aria-current');
    });
    current = n;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---- validation ---- */
  var NAME_RE  = /^[A-Za-z\s'\-]+$/;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var PHONE_RE = /^[0-9+\-\s()]{6,}$/;

  function setError(field, msg) {
    var input = document.getElementById(field);
    var err = document.getElementById(field + '-err');
    if (input) input.classList.add('invalid');
    if (err) { err.textContent = msg; err.hidden = false; }
  }
  function clearError(field) {
    var input = document.getElementById(field);
    var err = document.getElementById(field + '-err');
    if (input) input.classList.remove('invalid');
    if (err) { err.hidden = true; err.textContent = ''; }
  }
  function val(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }

  function validateStep(n) {
    var firstBad = null;
    function fail(field, msg) { setError(field, msg); if (!firstBad) firstBad = document.getElementById(field); }

    if (n === 1) {
      if (!NAME_RE.test(val('firstName'))) fail('firstName', 'Enter your first name using English letters.');
      if (!NAME_RE.test(val('lastName')))  fail('lastName', 'Enter your last name using English letters.');
      if (!EMAIL_RE.test(val('email')))    fail('email', 'Enter a valid email address.');
      if (!PHONE_RE.test(val('phone')))    fail('phone', 'Enter a valid phone number, including country code.');
      if (!val('nationality'))             fail('nationality', 'Please select your nationality.');
      if (!val('residence'))               fail('residence', 'Please select your country of residence.');
    } else if (n === 2) {
      if (!form.querySelector('input[name="tier"]:checked')) {
        var err = document.getElementById('tier-err');
        err.textContent = 'Please choose a tier, or select “Undecided”.';
        err.hidden = false;
        if (!firstBad) firstBad = document.querySelector('.wz-tiergrid');
      }
    }

    if (firstBad) {
      firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (firstBad.focus) setTimeout(function () { firstBad.focus({ preventScroll: true }); }, 300);
      return false;
    }
    return true;
  }

  /* clear inline errors as the user fixes them */
  ['firstName','lastName','email','phone','nationality','residence'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', function () { clearError(id); });
    if (el && el.tagName === 'SELECT') el.addEventListener('change', function () { clearError(id); });
  });
  form.querySelectorAll('input[name="tier"]').forEach(function (r) {
    r.addEventListener('change', function () { document.getElementById('tier-err').hidden = true; });
  });

  /* ---- conditional: visa expiry only when a current visa is selected ---- */
  var currentVisa = document.getElementById('currentVisa');
  var visaExpiryField = document.getElementById('visaExpiryField');
  function toggleVisaExpiry() {
    var show = currentVisa.value && currentVisa.value !== 'None';
    visaExpiryField.hidden = !show;
    if (!show) document.getElementById('visaExpiry').value = '';
  }
  currentVisa.addEventListener('change', function () { toggleVisaExpiry(); save(); });
  toggleVisaExpiry();

  /* ---- review summary ---- */
  var SUMMARY_FIELDS = [
    ['Name', function () { return (val('firstName') + ' ' + val('lastName')).trim(); }],
    ['Email', function () { return val('email'); }],
    ['Phone', function () { return val('phone'); }],
    ['Nationality', function () { return val('nationality'); }],
    ['Country of residence', function () { return val('residence'); }],
    ['Date of birth', function () { return val('dob'); }],
    ['Preferred contact', function () { return val('contactMethod'); }],
    ['Tier of interest', function () { var t = form.querySelector('input[name="tier"]:checked'); return t ? t.value : ''; }],
    ['Applying for', function () { return val('applyingFor'); }],
    ['Timeline', function () { return val('timeline'); }],
    ['Current Thai visa', function () { return val('currentVisa'); }],
    ['Visa expiration', function () { return visaExpiryField.hidden ? '' : val('visaExpiry'); }]
  ];

  function buildSummary() {
    var box = document.getElementById('wzSummary');
    box.innerHTML = '';
    SUMMARY_FIELDS.forEach(function (pair) {
      var value = pair[1]();
      var row = document.createElement('div');
      row.className = 'wz-summary__row';
      var k = document.createElement('div'); k.className = 'wz-summary__k'; k.textContent = pair[0];
      var v = document.createElement('div'); v.className = 'wz-summary__v';
      if (value) { v.textContent = value; } else { v.textContent = 'Not provided'; v.classList.add('empty'); }
      row.appendChild(k); row.appendChild(v); box.appendChild(row);
    });
  }

  /* ---- autosave to localStorage ---- */
  function save() {
    try {
      var data = {};
      form.querySelectorAll('input, select').forEach(function (el) {
        if (el.type === 'checkbox') return;
        if (el.type === 'radio') { if (el.checked) data[el.name] = el.value; }
        else if (el.id) data[el.id] = el.value;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) { /* private mode / storage full — non-fatal */ }
  }
  function restore() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      var data = JSON.parse(raw);
      Object.keys(data).forEach(function (key) {
        var el = document.getElementById(key);
        if (el && el.value !== undefined) { el.value = data[key]; }
        else if (key === 'tier') {
          var r = form.querySelector('input[name="tier"][value="' + data[key] + '"]');
          if (r) r.checked = true;
        }
      });
      toggleVisaExpiry();
    } catch (e) { /* ignore malformed cache */ }
  }
  form.addEventListener('input', save);
  form.addEventListener('change', save);
  restore();

  /* ---- wire step buttons ---- */
  form.querySelectorAll('.wz-next').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!validateStep(current)) return;
      var next = +btn.getAttribute('data-next');
      if (next === 3) buildSummary();
      track('step_advance', { from_step: current, to_step: next });
      showStep(next);
    });
  });
  form.querySelectorAll('.wz-prev').forEach(function (btn) {
    btn.addEventListener('click', function () { showStep(+btn.getAttribute('data-prev')); });
  });

  /* ---- submit ---- */
  function collect() {
    var t = form.querySelector('input[name="tier"]:checked');
    var tier = t ? t.value : '';
    var first = val('firstName'), last = val('lastName');
    var hp = form.querySelector('input[name="_gotcha"]');
    return {
      firstName: first, lastName: last,
      email: val('email'), phone: val('phone'),
      nationality: val('nationality'), residence: val('residence'),
      dob: val('dob'), contactMethod: val('contactMethod'),
      tier: tier, applyingFor: val('applyingFor'),
      timeline: val('timeline'), currentVisa: val('currentVisa'),
      visaExpiry: visaExpiryField.hidden ? '' : val('visaExpiry'),
      marketingOptIn: document.getElementById('marketing').checked ? 'Yes' : 'No',
      source: SOURCE,
      // Formspree reserved fields
      _subject: SUBJECT_PREFIX + ' New Thailand Privilege application — ' +
                (first + ' ' + last).trim() + ' (' + (tier || 'Undecided') + ')',
      _replyto: val('email'),
      _gotcha: hp ? hp.value : ''
    };
  }

  function mailtoFallback(data) {
    var lines = [
      'New Thailand Privilege Visa application.', '',
      'Name: ' + data.firstName + ' ' + data.lastName,
      'Email: ' + data.email,
      'Phone: ' + data.phone,
      'Nationality: ' + data.nationality,
      'Country of residence: ' + data.residence,
      'Date of birth: ' + (data.dob || '—'),
      'Preferred contact: ' + data.contactMethod,
      'Tier of interest: ' + data.tier,
      'Applying for: ' + data.applyingFor,
      'Timeline: ' + (data.timeline || '—'),
      'Current Thai visa: ' + data.currentVisa,
      'Visa expiration: ' + (data.visaExpiry || '—'),
      'Marketing opt-in: ' + data.marketingOptIn, '',
      'Source: ' + data.source
    ];
    var subject = SUBJECT_PREFIX + ' New Thailand Privilege application — ' +
                  (data.firstName + ' ' + data.lastName).trim() + ' (' + (data.tier || 'Undecided') + ')';
    window.location.href = 'mailto:' + EMAIL_TO +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(lines.join('\n'));
  }

  function showSuccess() {
    document.getElementById('applyForm').style.display = 'none';
    document.getElementById('wzSteps').style.display = 'none';
    var ok = document.getElementById('applySuccess');
    ok.classList.add('is-active');
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    track('form_submit', { tier: collect().tier, timeline: val('timeline') });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    /* consent checks */
    var accurate = document.getElementById('confirmAccurate');
    var terms = document.getElementById('agreeTerms');
    var cErr = document.getElementById('consent-err');
    document.getElementById('check-accurate-wrap').classList.toggle('invalid', !accurate.checked);
    document.getElementById('check-terms-wrap').classList.toggle('invalid', !terms.checked);
    if (!accurate.checked || !terms.checked) {
      cErr.textContent = 'Please confirm both boxes above to submit.';
      cErr.hidden = false;
      cErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    cErr.hidden = true;

    var btn = document.getElementById('wzSubmit');
    var errBox = document.getElementById('applyError');
    if (errBox) errBox.hidden = true;
    var data = collect();

    if (!FORM_ENDPOINT) { mailtoFallback(data); showSuccess(); return; }

    btn.disabled = true;
    var label = btn.innerHTML;
    btn.textContent = 'Submitting…';

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    }).then(function (res) {
      if (!res.ok) throw new Error('Submission failed');
      showSuccess();
    }).catch(function () {
      btn.disabled = false;
      btn.innerHTML = label;
      track('form_submit_error', {});
      if (errBox) {
        errBox.hidden = false;
        errBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });
})();
