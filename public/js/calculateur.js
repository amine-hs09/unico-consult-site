(function () {
  var form = document.getElementById('calc-form');
  if (!form) return;

  var placeholder = document.getElementById('calc-placeholder');
  var results = document.getElementById('calc-results');
  var elSavings = document.getElementById('result-savings');
  var elTime = document.getElementById('result-time');
  var elRoi = document.getElementById('result-roi');

  // Tarifs réels basés sur les factures Unico Consult
  // Maison'Net: ~90€/travailleur/mois pour gestion RH complète
  // La Cense: forfait 3500€/mois pour gestion complète
  // Tarif moyen par service externalisé: 90€/travailleur/mois
  var TARIFS = {
    'titres-services': { parTravailleur: 90, description: 'Gestion RH titres-services' },
    'transport': { parTravailleur: 110, description: 'Gestion transport & logistique' },
    'pme': { parTravailleur: 100, description: 'Gestion PME' },
    'restauration': { parTravailleur: 95, description: 'Gestion restauration' },
    'autre': { parTravailleur: 100, description: 'Gestion entreprise' }
  };

  // Coût moyen d'un employé admin interne en Belgique: ~3800€/mois charges comprises
  // Un employé admin gère environ 50 travailleurs
  var COUT_ADMIN_INTERNE = 3800;
  var TRAVAILLEURS_PAR_ADMIN = 50;

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

    var tarif = TARIFS[sector] || TARIFS['autre'];

    // Coût Unico: tarif par travailleur × nombre de services sélectionnés
    // (réduction de 15% à partir de 2 services, 25% à partir de 4)
    var reduction = numServices >= 4 ? 0.75 : numServices >= 2 ? 0.85 : 1;
    var coutUnico = Math.round(employees * tarif.parTravailleur * numServices * reduction);

    // Coût interne: nombre d'admins nécessaires × coût admin
    var adminsNecessaires = Math.ceil((employees * numServices) / TRAVAILLEURS_PAR_ADMIN);
    var coutInterne = adminsNecessaires * COUT_ADMIN_INTERNE;

    // Économie = différence entre coût interne et coût Unico
    var monthlySavings = Math.max(0, coutInterne - coutUnico);

    // Temps gagné: ~2h/travailleur/mois par service externalisé
    var monthlyTime = employees * 2 * numServices;

    // ROI sur 12 mois
    var annualRoi = monthlySavings * 12;

    placeholder.style.display = 'none';
    results.classList.add('active');

    animateNumber(elSavings, monthlySavings, '\u20AC', 800);
    animateNumber(elTime, monthlyTime, 'h', 800);
    animateNumber(elRoi, annualRoi, '\u20AC', 1000);
  });
})();
