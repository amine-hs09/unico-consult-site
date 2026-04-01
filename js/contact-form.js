const form = document.getElementById('contact-form')
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const btn = form.querySelector('button[type="submit"]')
    const originalText = btn.textContent
    btn.disabled = true
    btn.textContent = 'Envoi en cours...'
    const data = new FormData(form)
    try {
      const res = await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
      if (res.ok) {
        form.innerHTML = '<p class="form-success">Merci ! Nous vous recontacterons sous 24h.</p>'
      } else { throw new Error() }
    } catch {
      btn.disabled = false
      btn.textContent = originalText
      alert("Erreur lors de l'envoi. Veuillez reessayer ou nous contacter par telephone au 02 290 58 98.")
    }
  })
}
