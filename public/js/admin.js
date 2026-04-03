// Admin login handler
(function () {
  // If already authenticated, redirect to dashboard
  const token = localStorage.getItem('unico_admin_token');
  if (token) {
    try {
      const payload = JSON.parse(atob(token));
      if (payload.exp && payload.exp > Date.now()) {
        window.location.href = '/admin/dashboard';
        return;
      }
    } catch (e) {
      localStorage.removeItem('unico_admin_token');
    }
  }

  const form = document.getElementById('login-form');
  const errorEl = document.getElementById('login-error');
  const btn = document.getElementById('login-btn');

  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    errorEl.classList.remove('show');
    btn.disabled = true;
    btn.textContent = 'Connexion...';

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erreur de connexion');
      }

      localStorage.setItem('unico_admin_token', data.token);
      window.location.href = '/admin/dashboard';
    } catch (err) {
      errorEl.textContent = err.message || 'Email ou mot de passe incorrect.';
      errorEl.classList.add('show');
      btn.disabled = false;
      btn.textContent = 'Se connecter';
    }
  });
})();
