document.querySelectorAll('[data-marquee]').forEach(track => {
  const items = track.innerHTML
  track.innerHTML = items + items
  const speed = parseFloat(track.dataset.marquee) || 35
  track.style.animationDuration = speed + 's'
})
