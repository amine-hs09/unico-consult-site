(function() {
  if (localStorage.getItem('unico-cookies-accepted') || localStorage.getItem('unico-cookies-refused')) return

  const banner = document.createElement('div')
  banner.id = 'cookie-banner'
  banner.innerHTML = `
    <div style="position:fixed;bottom:0;left:0;right:0;z-index:200;padding:16px 24px;background:rgba(30,27,75,0.95);backdrop-filter:blur(16px);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">
      <p style="color:rgba(255,255,255,0.8);font-size:14px;margin:0;max-width:700px;line-height:1.5">Ce site utilise des cookies essentiels pour son fonctionnement. <a href="/cookies" style="color:#A78BFA;text-decoration:underline">En savoir plus</a></p>
      <div style="display:flex;gap:10px;flex-shrink:0">
        <button onclick="document.getElementById('cookie-banner').remove();localStorage.setItem('unico-cookies-accepted','1')" style="padding:8px 20px;border-radius:8px;border:none;background:#7C3AED;color:white;font-weight:600;font-size:13px;cursor:pointer">Accepter</button>
        <button onclick="document.getElementById('cookie-banner').remove();localStorage.setItem('unico-cookies-refused','1')" style="padding:8px 20px;border-radius:8px;border:1px solid rgba(255,255,255,0.2);background:transparent;color:rgba(255,255,255,0.7);font-weight:500;font-size:13px;cursor:pointer">Refuser</button>
      </div>
    </div>
  `
  document.body.appendChild(banner)
})()
