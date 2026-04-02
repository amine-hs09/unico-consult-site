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

      if (res.ok) {
        form.innerHTML = `
          <div style="text-align:center;padding:48px 24px">
            <div style="width:56px;height:56px;border-radius:14px;background:var(--purple-ghost);display:flex;align-items:center;justify-content:center;margin:0 auto 20px">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" stroke-width="2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 style="font-family:var(--font-d);font-size:22px;font-weight:700;color:var(--navy);margin-bottom:8px">Message envoyé !</h3>
            <p style="font-size:15px;color:var(--text-2);line-height:1.6">Merci ${data.name}. Nous avons bien reçu votre message et nous vous recontacterons sous 24h.</p>
            <p style="font-size:14px;color:var(--text-3);margin-top:12px">Un email de confirmation vous a été envoyé à ${data.email}</p>
          </div>`
      } else {
        throw new Error()
      }
    } catch {
      btn.disabled = false
      btn.textContent = originalText
      btn.style.opacity = '1'
      alert("Erreur lors de l'envoi. Veuillez réessayer ou nous contacter par téléphone au 0495 54 92 13.")
    }
  })
}
