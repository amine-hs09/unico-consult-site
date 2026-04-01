// Nav scroll
const nav = document.getElementById('nav')
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('s', scrollY > 30)
  }, { passive: true })
}

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('v')
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.12 })
document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

// Animate numbers
const numObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target
      const text = el.textContent
      const match = text.match(/(\d+)/)
      if (match) {
        const target = parseInt(match[0])
        const prefix = text.slice(0, text.indexOf(match[0]))
        const suffix = text.slice(text.indexOf(match[0]) + match[0].length)
        let current = 0
        const step = Math.max(1, Math.floor(target / 35))
        const interval = setInterval(() => {
          current = Math.min(current + step, target)
          el.textContent = prefix + current + suffix
          if (current >= target) clearInterval(interval)
        }, 25)
      }
      numObs.unobserve(entry.target)
    }
  })
}, { threshold: 0.5 })
document.querySelectorAll('[data-animate-num]').forEach(el => numObs.observe(el))
