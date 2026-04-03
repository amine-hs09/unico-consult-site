(function () {
  // ─── AUTH CHECK ───────────────────────────────────────────────────────────
  function checkAuth() {
    var token = localStorage.getItem('unico_admin_token');
    if (!token) { window.location.href = '/admin'; return false; }
    try {
      var payload = JSON.parse(atob(token));
      if (!payload.exp || payload.exp < Date.now()) {
        localStorage.removeItem('unico_admin_token');
        window.location.href = '/admin';
        return false;
      }
      return true;
    } catch (e) {
      localStorage.removeItem('unico_admin_token');
      window.location.href = '/admin';
      return false;
    }
  }
  if (!checkAuth()) return;

  function getToken() { return localStorage.getItem('unico_admin_token'); }

  // ─── API HELPERS ──────────────────────────────────────────────────────────
  function apiRequest(method, url, data) {
    var opts = {
      method: method,
      headers: {
        'Authorization': 'Bearer ' + getToken(),
        'Content-Type': 'application/json'
      }
    };
    if (data !== undefined) opts.body = JSON.stringify(data);
    return fetch(url, opts).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    });
  }
  function apiGet(url)            { return apiRequest('GET', url); }
  function apiPost(url, data)     { return apiRequest('POST', url, data); }
  function apiPut(url, data)      { return apiRequest('PUT', url, data); }
  function apiDelete(url, data)   { return apiRequest('DELETE', url, data); }

  // ─── STATE ────────────────────────────────────────────────────────────────
  var state = { clients: [], partenaires: [], avis: [], messages: [] };
  var currentTab = 'clients';

  // ─── MODAL FACTORY ────────────────────────────────────────────────────────
  function openModal(title, fields, initialValues, onSubmit) {
    // Remove any existing modal
    var existing = document.getElementById('dash-modal-overlay');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.id = 'dash-modal-overlay';
    overlay.className = 'modal-overlay';

    var card = document.createElement('div');
    card.className = 'modal-card';

    var h3 = document.createElement('h3');
    h3.textContent = title;
    card.appendChild(h3);

    var form = document.createElement('form');
    form.id = 'dash-modal-form';

    fields.forEach(function (f) {
      var group = document.createElement('div');
      group.className = 'form-group';

      var label = document.createElement('label');
      label.textContent = f.label;
      label.setAttribute('for', 'field-' + f.name);
      group.appendChild(label);

      var input;
      if (f.type === 'select') {
        input = document.createElement('select');
        (f.options || []).forEach(function (opt) {
          var o = document.createElement('option');
          o.value = opt;
          o.textContent = opt;
          input.appendChild(o);
        });
        input.value = (initialValues && initialValues[f.name] != null) ? initialValues[f.name] : (f.options ? f.options[0] : '');
      } else if (f.type === 'textarea') {
        input = document.createElement('textarea');
        input.rows = 3;
        input.value = (initialValues && initialValues[f.name] != null) ? initialValues[f.name] : '';
      } else {
        input = document.createElement('input');
        input.type = f.type || 'text';
        if (f.type === 'number') { input.min = f.min || 1; input.max = f.max || 100; }
        input.value = (initialValues && initialValues[f.name] != null) ? initialValues[f.name] : '';
      }
      input.id = 'field-' + f.name;
      input.name = f.name;
      if (f.required) input.required = true;
      input.className = 'modal-input';
      group.appendChild(input);
      form.appendChild(group);
    });

    var actions = document.createElement('div');
    actions.className = 'modal-actions';

    var cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'btn-modal-cancel';
    cancelBtn.textContent = 'Annuler';
    cancelBtn.addEventListener('click', closeModal);

    var submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'btn-modal-submit btn-sm';
    submitBtn.textContent = 'Enregistrer';

    actions.appendChild(cancelBtn);
    actions.appendChild(submitBtn);
    form.appendChild(actions);
    card.appendChild(form);
    overlay.appendChild(card);
    document.body.appendChild(overlay);

    // Close on overlay click
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var values = {};
      fields.forEach(function (f) {
        var el = document.getElementById('field-' + f.name);
        if (!el) return;
        if (f.type === 'number') values[f.name] = parseInt(el.value, 10) || 0;
        else values[f.name] = el.value;
      });
      onSubmit(values);
    });

    // Animate in
    requestAnimationFrame(function () { overlay.classList.add('open'); });
  }

  function closeModal() {
    var overlay = document.getElementById('dash-modal-overlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    setTimeout(function () { if (overlay.parentNode) overlay.remove(); }, 200);
  }

  function confirmDelete(label, onConfirm) {
    if (window.confirm('Supprimer "' + label + '" ? Cette action est irréversible.')) {
      onConfirm();
    }
  }

  // ─── BADGE HELPERS ────────────────────────────────────────────────────────
  function badgeClass(statut) {
    if (!statut) return 'badge-purple';
    var s = statut.toLowerCase();
    if (s === 'actif') return 'badge-green';
    if (s === 'prospect' || s === 'nouveau') return 'badge-purple';
    return 'badge-amber';
  }

  function starsHtml(note) {
    var n = parseInt(note, 10) || 0;
    var html = '';
    for (var i = 1; i <= 5; i++) {
      html += i <= n ? '&#9733;' : '&#9734;';
    }
    return '<span class="stars">' + html + '</span>';
  }

  // ─── STATS ────────────────────────────────────────────────────────────────
  function updateStats() {
    var statEls = {
      clients:    document.getElementById('stat-clients'),
      partenaires: document.getElementById('stat-partenaires'),
      avis:       document.getElementById('stat-avis'),
      messages:   document.getElementById('stat-messages')
    };
    if (statEls.clients)    statEls.clients.textContent    = state.clients.length;
    if (statEls.partenaires) statEls.partenaires.textContent = state.partenaires.length;
    if (statEls.avis)       statEls.avis.textContent       = state.avis.length;
    if (statEls.messages)   statEls.messages.textContent   = state.messages.length;
  }

  // ─── RENDER CLIENTS ───────────────────────────────────────────────────────
  function renderClients() {
    var tbody = document.getElementById('clients-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!state.clients.length) {
      var tr = document.createElement('tr');
      tr.innerHTML = '<td colspan="5" style="text-align:center;color:var(--text-3);padding:2rem">Aucun client enregistré</td>';
      tbody.appendChild(tr);
      return;
    }
    state.clients.forEach(function (c) {
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td>' + esc(c.nom) + '</td>' +
        '<td>' + esc(c.secteur || '') + '</td>' +
        '<td>' + esc(c.employes || '') + '</td>' +
        '<td><span class="badge ' + badgeClass(c.statut) + '">' + esc(c.statut || '') + '</span></td>' +
        '<td class="td-actions">' +
          '<button class="btn-action btn-edit" data-id="' + c.id + '">&#9998;</button>' +
          '<button class="btn-action btn-delete" data-id="' + c.id + '">&#128465;</button>' +
        '</td>';
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.btn-edit').forEach(function (btn) {
      btn.addEventListener('click', function () { editClient(btn.getAttribute('data-id')); });
    });
    tbody.querySelectorAll('.btn-delete').forEach(function (btn) {
      btn.addEventListener('click', function () { deleteClient(btn.getAttribute('data-id')); });
    });
  }

  var clientFields = [
    { name: 'nom',      label: 'Nom',         required: true },
    { name: 'secteur',  label: 'Secteur' },
    { name: 'employes', label: 'Employés (ex: ~150)' },
    { name: 'statut',   label: 'Statut', type: 'select', options: ['Actif', 'Prospect', 'En pause'] },
    { name: 'logo',     label: 'Logo URL' },
    { name: 'url',      label: 'Site web URL' }
  ];

  function addClient() {
    openModal('Ajouter un client', clientFields, null, function (values) {
      apiPost('/api/admin/clients', values)
        .then(function () { loadAll(); closeModal(); })
        .catch(function (err) { alert('Erreur : ' + err.message); });
    });
  }

  function editClient(id) {
    var c = state.clients.find(function (x) { return String(x.id) === String(id); });
    if (!c) return;
    openModal('Modifier le client', clientFields, c, function (values) {
      values.id = id;
      apiPut('/api/admin/clients', values)
        .then(function () { loadAll(); closeModal(); })
        .catch(function (err) { alert('Erreur : ' + err.message); });
    });
  }

  function deleteClient(id) {
    var c = state.clients.find(function (x) { return String(x.id) === String(id); });
    confirmDelete(c ? c.nom : id, function () {
      apiDelete('/api/admin/clients', { id: id })
        .then(function () { loadAll(); })
        .catch(function (err) { alert('Erreur : ' + err.message); });
    });
  }

  // ─── RENDER PARTENAIRES ───────────────────────────────────────────────────
  function renderPartenaires() {
    var tbody = document.getElementById('partenaires-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!state.partenaires.length) {
      var tr = document.createElement('tr');
      tr.innerHTML = '<td colspan="5" style="text-align:center;color:var(--text-3);padding:2rem">Aucun partenaire enregistré</td>';
      tbody.appendChild(tr);
      return;
    }
    state.partenaires.forEach(function (p) {
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td>' + esc(p.nom) + '</td>' +
        '<td>' + esc(p.type || '') + '</td>' +
        '<td>' + esc(p.depuis || '') + '</td>' +
        '<td><span class="badge ' + badgeClass(p.statut) + '">' + esc(p.statut || '') + '</span></td>' +
        '<td class="td-actions">' +
          '<button class="btn-action btn-edit" data-id="' + p.id + '">&#9998;</button>' +
          '<button class="btn-action btn-delete" data-id="' + p.id + '">&#128465;</button>' +
        '</td>';
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.btn-edit').forEach(function (btn) {
      btn.addEventListener('click', function () { editPartenaire(btn.getAttribute('data-id')); });
    });
    tbody.querySelectorAll('.btn-delete').forEach(function (btn) {
      btn.addEventListener('click', function () { deletePartenaire(btn.getAttribute('data-id')); });
    });
  }

  var partenaireFields = [
    { name: 'nom',    label: 'Nom',    required: true },
    { name: 'type',   label: 'Type (ex: RH & Payroll)' },
    { name: 'depuis', label: 'Depuis (année)' },
    { name: 'statut', label: 'Statut', type: 'select', options: ['Actif', 'Nouveau', 'Inactif'] },
    { name: 'logo',   label: 'Logo URL' }
  ];

  function addPartenaire() {
    openModal('Ajouter un partenaire', partenaireFields, null, function (values) {
      apiPost('/api/admin/partenaires', values)
        .then(function () { loadAll(); closeModal(); })
        .catch(function (err) { alert('Erreur : ' + err.message); });
    });
  }

  function editPartenaire(id) {
    var p = state.partenaires.find(function (x) { return String(x.id) === String(id); });
    if (!p) return;
    openModal('Modifier le partenaire', partenaireFields, p, function (values) {
      values.id = id;
      apiPut('/api/admin/partenaires', values)
        .then(function () { loadAll(); closeModal(); })
        .catch(function (err) { alert('Erreur : ' + err.message); });
    });
  }

  function deletePartenaire(id) {
    var p = state.partenaires.find(function (x) { return String(x.id) === String(id); });
    confirmDelete(p ? p.nom : id, function () {
      apiDelete('/api/admin/partenaires', { id: id })
        .then(function () { loadAll(); })
        .catch(function (err) { alert('Erreur : ' + err.message); });
    });
  }

  // ─── RENDER AVIS ──────────────────────────────────────────────────────────
  function renderAvis() {
    var tbody = document.getElementById('avis-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!state.avis.length) {
      var tr = document.createElement('tr');
      tr.innerHTML = '<td colspan="5" style="text-align:center;color:var(--text-3);padding:2rem">Aucun avis enregistré</td>';
      tbody.appendChild(tr);
      return;
    }
    state.avis.forEach(function (a) {
      var extrait = (a.texte || '').length > 60 ? a.texte.substring(0, 60) + '…' : (a.texte || '');
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td>' + esc(a.nom) + '</td>' +
        '<td>' + esc(a.entreprise || '') + '</td>' +
        '<td>' + starsHtml(a.note) + '</td>' +
        '<td>' + esc(extrait) + '</td>' +
        '<td class="td-actions">' +
          '<button class="btn-action btn-edit" data-id="' + a.id + '">&#9998;</button>' +
          '<button class="btn-action btn-delete" data-id="' + a.id + '">&#128465;</button>' +
        '</td>';
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.btn-edit').forEach(function (btn) {
      btn.addEventListener('click', function () { editAvis(btn.getAttribute('data-id')); });
    });
    tbody.querySelectorAll('.btn-delete').forEach(function (btn) {
      btn.addEventListener('click', function () { deleteAvis(btn.getAttribute('data-id')); });
    });
  }

  var avisFields = [
    { name: 'nom',        label: 'Nom',        required: true },
    { name: 'entreprise', label: 'Entreprise' },
    { name: 'note',       label: 'Note (1-5)', type: 'number', min: 1, max: 5 },
    { name: 'texte',      label: 'Témoignage', type: 'textarea' }
  ];

  function addAvis() {
    openModal('Ajouter un avis', avisFields, null, function (values) {
      apiPost('/api/admin/avis', values)
        .then(function () { loadAll(); closeModal(); })
        .catch(function (err) { alert('Erreur : ' + err.message); });
    });
  }

  function editAvis(id) {
    var a = state.avis.find(function (x) { return String(x.id) === String(id); });
    if (!a) return;
    openModal('Modifier l\'avis', avisFields, a, function (values) {
      values.id = id;
      apiPut('/api/admin/avis', values)
        .then(function () { loadAll(); closeModal(); })
        .catch(function (err) { alert('Erreur : ' + err.message); });
    });
  }

  function deleteAvis(id) {
    var a = state.avis.find(function (x) { return String(x.id) === String(id); });
    confirmDelete(a ? a.nom : id, function () {
      apiDelete('/api/admin/avis', { id: id })
        .then(function () { loadAll(); })
        .catch(function (err) { alert('Erreur : ' + err.message); });
    });
  }

  // ─── RENDER MESSAGES ──────────────────────────────────────────────────────
  function renderMessages() {
    var container = document.getElementById('messages-list');
    if (!container) return;
    container.innerHTML = '';

    if (!state.messages.length) {
      container.innerHTML = '<p style="text-align:center;color:var(--text-3);padding:2rem">Aucun message reçu</p>';
      return;
    }

    state.messages.forEach(function (m) {
      var item = document.createElement('div');
      item.className = 'msg-item' + (m.lu ? '' : ' msg-unread');

      var dateStr = m.date ? new Date(m.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

      item.innerHTML =
        '<div class="msg-meta">' +
          '<strong>' + esc(m.nom) + '</strong>' +
          '<span>' + esc(m.email || '') + '</span>' +
          '<span>' + esc(dateStr) + '</span>' +
          (!m.lu ? '<span class="badge badge-purple msg-badge-new">Nouveau</span>' : '') +
        '</div>' +
        '<p>' + esc(m.message || '') + '</p>' +
        '<div class="msg-item-actions">' +
          (!m.lu
            ? '<button class="btn-action btn-mark-read" data-id="' + m.id + '">&#10003; Marquer lu</button>'
            : '') +
          '<button class="btn-action btn-delete btn-delete-msg" data-id="' + m.id + '">&#128465; Supprimer</button>' +
        '</div>';

      container.appendChild(item);
    });

    container.querySelectorAll('.btn-mark-read').forEach(function (btn) {
      btn.addEventListener('click', function () { markMessageRead(btn.getAttribute('data-id')); });
    });
    container.querySelectorAll('.btn-delete-msg').forEach(function (btn) {
      btn.addEventListener('click', function () { deleteMessage(btn.getAttribute('data-id')); });
    });
  }

  function markMessageRead(id) {
    apiPut('/api/admin/messages', { id: id, lu: true })
      .then(function () { loadAll(); })
      .catch(function (err) { alert('Erreur : ' + err.message); });
  }

  function deleteMessage(id) {
    var m = state.messages.find(function (x) { return String(x.id) === String(id); });
    confirmDelete(m ? m.nom : id, function () {
      apiDelete('/api/admin/messages', { id: id })
        .then(function () { loadAll(); })
        .catch(function (err) { alert('Erreur : ' + err.message); });
    });
  }

  // ─── LOAD ALL DATA ────────────────────────────────────────────────────────
  function loadAll() {
    var endpoints = [
      { key: 'clients',     url: '/api/admin/clients' },
      { key: 'partenaires', url: '/api/admin/partenaires' },
      { key: 'avis',        url: '/api/admin/avis' },
      { key: 'messages',    url: '/api/admin/messages' }
    ];

    var promises = endpoints.map(function (ep) {
      return apiGet(ep.url)
        .then(function (data) {
          state[ep.key] = Array.isArray(data) ? data : (data.data || data.items || []);
        })
        .catch(function () {
          // Keep existing state on error, don't crash
        });
    });

    Promise.all(promises).then(function () {
      updateStats();
      renderClients();
      renderPartenaires();
      renderAvis();
      renderMessages();
    });
  }

  // ─── TAB SWITCHING ────────────────────────────────────────────────────────
  var tabs = document.querySelectorAll('[data-tab]');
  var panels = document.querySelectorAll('.tab-panel');
  var pageTitle = document.getElementById('page-title');

  var tabNames = {
    clients:     'Clients',
    partenaires: 'Partenaires',
    avis:        'Avis & Témoignages',
    messages:    'Messages'
  };

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.getAttribute('data-tab');
      currentTab = target;

      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      panels.forEach(function (p) { p.classList.remove('active'); });
      var panel = document.getElementById('tab-' + target);
      if (panel) panel.classList.add('active');

      if (pageTitle && tabNames[target]) pageTitle.textContent = tabNames[target];

      var sidebar = document.getElementById('sidebar');
      var overlay = document.getElementById('dash-overlay');
      if (sidebar) sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
    });
  });

  // ─── ADD BUTTONS ──────────────────────────────────────────────────────────
  var addClientBtn = document.getElementById('btn-add-client');
  if (addClientBtn) addClientBtn.addEventListener('click', addClient);

  var addPartenaireBtn = document.getElementById('btn-add-partenaire');
  if (addPartenaireBtn) addPartenaireBtn.addEventListener('click', addPartenaire);

  var addAvisBtn = document.getElementById('btn-add-avis');
  if (addAvisBtn) addAvisBtn.addEventListener('click', addAvis);

  // ─── MOBILE SIDEBAR ───────────────────────────────────────────────────────
  var toggle = document.getElementById('mobile-toggle');
  var sidebar = document.getElementById('sidebar');
  var overlay = document.getElementById('dash-overlay');

  if (toggle && sidebar) {
    toggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('open');
    });
  }
  if (overlay) {
    overlay.addEventListener('click', function () {
      if (sidebar) sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });
  }

  // ─── LOGOUT ───────────────────────────────────────────────────────────────
  var logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      localStorage.removeItem('unico_admin_token');
      window.location.href = '/admin';
    });
  }

  // ─── ESCAPE HELPER ────────────────────────────────────────────────────────
  function esc(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ─── INIT ─────────────────────────────────────────────────────────────────
  loadAll();
})();
