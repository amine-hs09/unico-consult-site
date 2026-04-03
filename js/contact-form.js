const form = document.getElementById('contact-form')
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const btn = form.querySelector('button[type="submit"]')
    const originalText = btn.textContent
    btn.disabled = true
    btn.textContent = 'Envoi en cours...'
    btn.style.opacity = '0.7'

    const data = {
      name: form.querySelector('#name').value,
      email: form.querySelector('#email').value,
      subject: form.querySelector('#subject').value,
      message: form.querySelector('#message').value
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await res.json().catch(() => ({}))

      if (res.ok && result.success) {
        form.innerHTML = `
          <div style="text-align:center;padding:48px 24px">
            <div style="width:56px;height:56px;border-radius:14px;background:var(--purple-ghost);display:flex;align-items:center;justify-content:center;margin:0 auto 20px">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" stroke-width="2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 style="font-family:var(--font-d);font-size:22px;font-weight:700;color:var(--navy);margin-bottom:8px">Message envoyé !</h3>
            <p style="font-size:15px;color:var(--text-2);line-height:1.6">Merci ${data.name}. Nous avons bien reçu votre message et nous vous recontacterons sous 24h.</p>
          </div>`
      } else {
        throw new Error(result.detail || result.error || 'Erreur serveur')
      }
    } catch (err) {
      btn.disabled = false
      btn.textContent = originalText
      btn.style.opacity = '1'
      // Show error inline instead of alert
      let errDiv = form.querySelector('.form-error')
      if (!errDiv) {
        errDiv = document.createElement('div')
        errDiv.className = 'form-error'
        errDiv.style.cssText = 'padding:14px 18px;background:#FEF2F2;border:1px solid #FECACA;border-radius:10px;margin-top:16px;font-size:14px;color:#991B1B;line-height:1.5'
        btn.parentElement.appendChild(errDiv)
      }
      errDiv.innerHTML = `<strong>Erreur :</strong> ${err.message}<br><span style="font-size:13px;color:#6B7280">Vous pouvez aussi nous contacter par téléphone au <a href="tel:+32495549213" style="color:#7C3AED;font-weight:600">0495 54 92 13</a></span>`
    }
  })
}
