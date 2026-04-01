document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = btn.classList.contains('active')
    // Close all
    document.querySelectorAll('.faq-q').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-expanded','false') })
    document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'))
    // Open clicked if it was closed
    if (!isOpen) {
      btn.classList.add('active')
      btn.setAttribute('aria-expanded','true')
      btn.nextElementSibling.classList.add('open')
    }
  })
})
