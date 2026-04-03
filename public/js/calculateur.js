(function () {
  var form = document.getElementById('calc-form');
  if (!form) return;

  var placeholder = document.getElementById('calc-placeholder');
  var results = document.getElementById('calc-results');
  var elSavings = document.getElementById('result-savings');
  var elTime = document.getElementById('result-time');
  var elRoi = document.getElementById('result-roi');

  function animateNumber(el, target, suffix, duration) {
    var start = 0;
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(eased * target);
      el.textContent = current.toLocaleString('fr-BE') + ' ' + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var employees = parseInt(document.getElementById('employees').value, 10);
    var sector = document.getElementById('sector').value;
    var checked = form.querySelectorAll('input[name="services"]:checked');
    var numServices = checked.length;

    if (!employees || employees < 1 || !sector || numServices === 0) {
      alert('Veuillez remplir tous les champs et cocher au moins un service.');
      return;
    }

    var monthlySavings = employees * 350 * numServices;
    var monthlyTime = employees * 2 * numServices;
    var annualRoi = monthlySavings * 12;

    placeholder.style.display = 'none';
    results.classList.add('active');

    animateNumber(elSavings, monthlySavings, '\u20AC', 800);
    animateNumber(elTime, monthlyTime, 'h', 800);
    animateNumber(elRoi, annualRoi, '\u20AC', 1000);
  });
})();
