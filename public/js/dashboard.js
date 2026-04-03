// Dashboard auth check and UI logic
(function () {
  // Auth check
  function checkAuth() {
    const token = localStorage.getItem('unico_admin_token');
    if (!token) {
      window.location.href = '/admin';
      return false;
    }
    try {
      const payload = JSON.parse(atob(token));
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

  // Tab switching
  const tabs = document.querySelectorAll('[data-tab]');
  const panels = document.querySelectorAll('.tab-panel');
  const pageTitle = document.getElementById('page-title');

  const tabNames = {
    clients: 'Clients',
    partenaires: 'Partenaires',
    avis: 'Avis & Témoignages',
    messages: 'Messages'
  };

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const target = tab.getAttribute('data-tab');

      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      panels.forEach(function (p) { p.classList.remove('active'); });
      var panel = document.getElementById('tab-' + target);
      if (panel) panel.classList.add('active');

      if (pageTitle && tabNames[target]) {
        pageTitle.textContent = tabNames[target];
      }

      // Close mobile sidebar
      var sidebar = document.getElementById('sidebar');
      var overlay = document.getElementById('dash-overlay');
      if (sidebar) sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
    });
  });

  // Mobile sidebar toggle
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
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });
  }

  // Logout
  var logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      localStorage.removeItem('unico_admin_token');
      window.location.href = '/admin';
    });
  }
})();
