# Site Unico Consult — Plan d'attaque

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Creer le nouveau site unico-consult.be — statique, SEO-optimise, Lighthouse 95+, deploye sur Vercel

**Architecture:** Site statique multi-pages HTML/CSS/JS pur. Pas de framework (React/Next.js = overkill pour 8 pages corporate). Build avec Vite pour le bundling, hot-reload dev, et optimisation production. JSON-LD complet, sitemap dynamique, llms.txt, OG images.

**Tech Stack:** HTML5 + CSS3 (custom properties) + Vanilla JS + Vite (bundler) + Vercel (deploy)

**Repo:** `~/claude-projects/projets/site-unico/` → GitHub `amine-hs09/site-unico`

**Design reference:** `mockup-homepage.html` (valide par le client)

**SEO audit reference:** `audit-seo/FULL-AUDIT-REPORT.md` (score actuel 31/100 → cible 85+)

---

## File Structure

```
site-unico/
├── index.html                    # Homepage
├── expertise.html                # 5 poles de services detailles
├── secteurs.html                 # 4 secteurs d'expertise
├── clients.html                  # Galerie clients + temoignages
├── equipe.html                   # 3 profils consultants
├── partenaires.html              # Dell, Reposa, SD Worx, etc.
├── contact.html                  # Formulaire + infos + Google Maps
├── mentions-legales.html         # Mentions legales
├── vie-privee.html               # Politique vie privee
├── cookies.html                  # Politique cookies
├── css/
│   ├── base.css                  # Reset, variables, typography, utilities
│   ├── components.css            # Navbar, footer, buttons, cards, marquee
│   └── pages.css                 # Styles specifiques par page
├── js/
│   ├── main.js                   # Nav scroll, reveal animations, counters
│   ├── marquee.js                # Infinite scroll pour logos et temoignages
│   └── contact-form.js           # Validation formulaire + envoi
├── assets/
│   ├── logo-unico.svg            # Logo SVG principal
│   ├── logo-unico-white.svg      # Logo blanc pour footer
│   ├── og-image.jpg              # Image OG par defaut (1200x630)
│   └── icons/                    # Icones SVG des 5 services
├── public/
│   ├── robots.txt                # Fichier robots optimise
│   ├── sitemap.xml               # Sitemap avec dates reelles
│   ├── llms.txt                  # Fichier pour crawlers IA
│   └── favicon.ico               # Favicon
├── schema/
│   └── organization.json         # JSON-LD ProfessionalService
├── vercel.json                   # Config deploy + headers securite
├── package.json                  # Vite dev server
└── vite.config.js                # Multi-page build config
```

---

## Task 1: Init projet + Vite + structure de base

**Files:**
- Create: `package.json`, `vite.config.js`, `.gitignore`
- Create: `css/base.css`

- [ ] **Step 1: Init npm + installer Vite**

```bash
cd ~/claude-projects/projets/site-unico
npm init -y
npm install -D vite
```

- [ ] **Step 2: Configurer Vite multi-page**

```js
// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        expertise: resolve(__dirname, 'expertise.html'),
        secteurs: resolve(__dirname, 'secteurs.html'),
        clients: resolve(__dirname, 'clients.html'),
        equipe: resolve(__dirname, 'equipe.html'),
        partenaires: resolve(__dirname, 'partenaires.html'),
        contact: resolve(__dirname, 'contact.html'),
        mentions: resolve(__dirname, 'mentions-legales.html'),
        privacy: resolve(__dirname, 'vie-privee.html'),
        cookies: resolve(__dirname, 'cookies.html'),
      }
    }
  }
})
```

- [ ] **Step 3: Ajouter scripts dans package.json**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

- [ ] **Step 4: Creer .gitignore**

```
node_modules/
dist/
.DS_Store
*.log
```

- [ ] **Step 5: Creer css/base.css — design system complet**

Le fichier `css/base.css` contient :
- CSS reset
- Variables `:root` (couleurs Unico : `--purple: #7C3AED`, `--purple-deep: #6D28D9`, `--purple-dark: #5B21B6`, `--purple-light: #A78BFA`, `--purple-pale: #EDE9FE`, `--purple-ghost: #F5F3FF`, `--indigo: #818CF8`, `--navy: #1E1B4B`, textes, backgrounds)
- Typography system (Plus Jakarta Sans display, DM Sans body)
- Container `.ctn` (1200px) et `.ctn-w` (1400px)
- Utility classes `.reveal`, `.stagger`
- Responsive breakpoints

Extraire les styles du `mockup-homepage.html` existant dans ce fichier.

- [ ] **Step 6: Commit**

```bash
git add package.json vite.config.js .gitignore css/base.css
git commit -m "feat: init project with Vite, design system base"
```

---

## Task 2: Logo SVG + assets

**Files:**
- Create: `assets/logo-unico.svg`, `assets/logo-unico-white.svg`
- Create: `assets/icons/rh.svg`, `assets/icons/management.svg`, `assets/icons/outsourcing.svg`, `assets/icons/logistique.svg`, `assets/icons/branding.svg`
- Create: `public/favicon.ico`

- [ ] **Step 1: Creer le logo SVG principal**

Le logo "UNICO" en typographie Plus Jakarta Sans 800, lettres mauves (#7C3AED), le "I" en violet fonce (#5B21B6). "CONSULT" en dessous en weight 500, letter-spacing 4px, gris (#6B7280).

- [ ] **Step 2: Creer la variante blanche pour footer**

Meme structure, couleurs: lettres en #A78BFA, "CONSULT" en rgba(255,255,255,0.5).

- [ ] **Step 3: Creer les 5 icones de services**

Icones ligne (stroke-only, 24x24 viewBox, stroke-width 1.8, stroke-linecap round) :
- `rh.svg` — personnes (users icon)
- `management.svg` — livre ouvert (book icon)
- `outsourcing.svg` — mallette (briefcase icon)
- `logistique.svg` — camion (truck icon)
- `branding.svg` — etoile (star icon)

- [ ] **Step 4: Generer favicon depuis le "U" du logo**

Carre 32x32, fond #7C3AED, lettre "U" blanche centree.

- [ ] **Step 5: Commit**

```bash
git add assets/ public/favicon.ico
git commit -m "feat: add Unico logo SVG, service icons, favicon"
```

---

## Task 3: Composants partages (navbar + footer + buttons + marquee)

**Files:**
- Create: `css/components.css`
- Create: `js/main.js`, `js/marquee.js`

- [ ] **Step 1: Extraire les styles composants du mockup**

Depuis `mockup-homepage.html`, extraire dans `css/components.css` :
- `.nav` (sticky, blur, scroll state)
- `.btn` (--p, --o, --w variants)
- `.sh` (section headers avec overline)
- `.marquee` et `.marquee__item` (infinite scroll)
- `.testi__track` et `.testi__card` (testimonials carousel)
- `.partner-pill` et float animation
- `.footer` complet
- `.cta` banner
- `.reveal` et `.stagger` animations

- [ ] **Step 2: Creer js/main.js**

```js
// Nav scroll effect
const nav = document.getElementById('nav')
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('s', scrollY > 30)
  }, { passive: true })
}

// Reveal on scroll (IntersectionObserver)
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
      animateNumber(entry.target)
      numObs.unobserve(entry.target)
    }
  })
}, { threshold: 0.5 })

function animateNumber(el) {
  const text = el.textContent
  const match = text.match(/(\d+)/)
  if (!match) return
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

document.querySelectorAll('[data-animate-num]').forEach(el => numObs.observe(el))
```

- [ ] **Step 3: Creer js/marquee.js**

Le marquee CSS-only du mockup fonctionne deja. Ce fichier ajoute :
- Pause on hover (deja en CSS)
- Duplication automatique des items pour le loop seamless
- Calcul dynamique de la duree d'animation basee sur le nombre d'items

```js
document.querySelectorAll('[data-marquee]').forEach(track => {
  const items = track.innerHTML
  track.innerHTML = items + items // duplicate for seamless loop
  const count = track.children.length
  const speed = parseFloat(track.dataset.marquee) || 35
  track.style.animationDuration = speed + 's'
})
```

- [ ] **Step 4: Commit**

```bash
git add css/components.css js/
git commit -m "feat: shared components — nav, footer, marquee, animations"
```

---

## Task 4: Homepage (index.html)

**Files:**
- Create: `index.html` (production version)
- Create: `css/pages.css`

- [ ] **Step 1: Creer index.html**

Reprendre la structure exacte du `mockup-homepage.html` valide, mais :
- Remplacer les styles inline par des liens vers `css/base.css`, `css/components.css`, `css/pages.css`
- Remplacer les scripts inline par `js/main.js` et `js/marquee.js`
- Utiliser les SVG du dossier `assets/`
- Ajouter le `<head>` SEO complet :
  - `<meta name="description">` (< 155 chars)
  - `<meta property="og:title">`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`
  - `<meta name="twitter:card">`, `twitter:title`, `twitter:description`
  - `<link rel="canonical" href="https://www.unico-consult.be/">`
  - `<link rel="alternate" hreflang="fr-be">`
  - JSON-LD `ProfessionalService` schema dans un `<script type="application/ld+json">`
  - Preconnect fonts, favicon

Sections de la page (dans l'ordre du mockup valide) :
1. Nav sticky
2. Hero (badge + titre + sous-titre + 2 CTA + bento stats)
3. Marquee clients (13 noms en boucle)
4. 5 Services (bento grid, RH featured)
5. 4 Secteurs (cartes numerotees 01-04)
6. Temoignages (5 cartes en carousel infini)
7. Pourquoi Unico (5 differenciateurs)
8. Equipe (3 profils)
9. Partenaires (pills flottantes)
10. CTA banner
11. Footer

- [ ] **Step 2: Verifier en dev**

```bash
npm run dev
```

Ouvrir http://localhost:5173, verifier toutes les sections, animations, responsive.

- [ ] **Step 3: Commit**

```bash
git add index.html css/pages.css
git commit -m "feat: homepage complete with all sections and SEO meta"
```

---

## Task 5: Pages interieures (expertise, secteurs, clients, equipe, partenaires)

**Files:**
- Create: `expertise.html`, `secteurs.html`, `clients.html`, `equipe.html`, `partenaires.html`

- [ ] **Step 1: Creer expertise.html**

Structure :
- Meme nav + footer que homepage
- Hero page : titre "Notre expertise", breadcrumb
- 5 sections alternant blanc/lavande, chacune avec :
  - Icone + titre du pole
  - 2-3 paragraphes de description (textes officiels du profil client Unico)
  - Bullet points de services concrets
  - CTA "Contactez-nous →"
- Schema JSON-LD `Service` pour chaque pole

Contenu exact tire de `clients/unico-group.md` § "LES 5 POLES DE SERVICES"

- [ ] **Step 2: Creer secteurs.html**

Structure :
- Hero : "Nos secteurs d'expertise"
- 4 sections detaillees :
  1. Titres-services (contexte reglementaire belge, clients Maison'Net/La Cense, 6 agences)
  2. Transport & Logistique (Nassim, CI&T, Moby Green, LGM, Hermes, plateformes Bolt/Colis Prive)
  3. Independants & PME (accompagnement sur mesure)
  4. Restauration & Franchise (The Kitchen 1, Dark Kitchen, Logicon)
- Mini etudes de cas anonymisees par secteur

- [ ] **Step 3: Creer clients.html**

Structure :
- Hero : "Nos clients de reference" + "15+ entreprises dans 4 secteurs"
- Grille de clients (4 colonnes) : nom, secteur (badge colore), description des services fournis
- Les 13+ clients du profil Unico
- Section temoignages (5 temoignages complets)
- Stats visuelles par secteur

- [ ] **Step 4: Creer equipe.html**

Structure :
- Hero : "Notre equipe"
- 3 grandes cartes profil (Otman, Farid, Jamal) avec :
  - Initiales en avatar
  - Nom, role, description detaillee
  - Tags de competences
  - Parcours et specialites
- Section "complementarite" montrant comment les 3 couvrent tous les besoins

- [ ] **Step 5: Creer partenaires.html**

Structure :
- Hero : "Nos partenaires strategiques"
- Cartes detaillees pour chaque partenaire :
  - Dell Technologies (equipements IT pro)
  - Reposa Italy (mobilier professionnel)
  - SD Worx (secretariat social)
  - Simply Accounts (comptabilite)
  - Kodefisc/Axxon (comptabilite BE)
  - NSI SA (infrastructure IT)
- Description de la valeur ajoutee de chaque partenariat

- [ ] **Step 6: Commit**

```bash
git add expertise.html secteurs.html clients.html equipe.html partenaires.html
git commit -m "feat: all inner pages — expertise, sectors, clients, team, partners"
```

---

## Task 6: Page contact + formulaire

**Files:**
- Create: `contact.html`
- Create: `js/contact-form.js`

- [ ] **Step 1: Creer contact.html**

Structure :
- Hero : "Contactez-nous"
- Layout 2 colonnes :
  - Gauche : formulaire (Nom, Email, Sujet dropdown, Message, bouton "Envoyer")
  - Droite : infos contact (adresse, telephone, email, horaires) + Google Maps embed
- Schema JSON-LD `ContactPoint`
- Les infos exactes :
  - Avenue Hippocrate 4 bte 001, 1932 Sint-Stevens-Woluwe
  - 02 290 58 98
  - info@unico-consult.be
  - Lun-Ven 9h-18h

- [ ] **Step 2: Creer js/contact-form.js**

Validation client :
- Champs requis (nom, email, message)
- Format email valide
- Message min 10 chars
- Soumission via Formspree ou action mailto: comme fallback
- Feedback visuel (loading, succes, erreur)

```js
const form = document.getElementById('contact-form')
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const btn = form.querySelector('button[type="submit"]')
    btn.disabled = true
    btn.textContent = 'Envoi en cours...'
    
    const data = new FormData(form)
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
      if (res.ok) {
        form.innerHTML = '<p class="form-success">Merci ! Nous vous recontacterons sous 24h.</p>'
      } else {
        throw new Error()
      }
    } catch {
      btn.disabled = false
      btn.textContent = 'Envoyer'
      alert('Erreur lors de l\'envoi. Veuillez reessayer ou nous contacter par telephone.')
    }
  })
}
```

- [ ] **Step 3: Commit**

```bash
git add contact.html js/contact-form.js
git commit -m "feat: contact page with form validation"
```

---

## Task 7: Pages legales

**Files:**
- Create: `mentions-legales.html`, `vie-privee.html`, `cookies.html`

- [ ] **Step 1: Creer mentions-legales.html**

Contenu :
- Denomination : UNICO-CONSULT SRL
- Forme juridique : Societe a responsabilite limitee
- Siege social : Hippokrateslaan 4 bus 001, 1932 Sint-Stevens-Woluwe
- N TVA : BE 0735.798.943
- Email : info@unico-consult.be
- Telephone : 02 290 58 98
- Hebergeur : Vercel Inc.
- Responsable publication : Otman Hssinoui

- [ ] **Step 2: Creer vie-privee.html**

Politique de confidentialite RGPD standard pour site corporate belge :
- Responsable du traitement
- Donnees collectees (formulaire contact uniquement)
- Base legale (interet legitime)
- Duree de conservation
- Droits (acces, rectification, suppression)
- Contact DPO

- [ ] **Step 3: Creer cookies.html**

Politique cookies minimaliste :
- Cookies essentiels uniquement (pas d'analytics pour l'instant)
- Google Maps embed (cookies tiers)
- Gestion des preferences

- [ ] **Step 4: Commit**

```bash
git add mentions-legales.html vie-privee.html cookies.html
git commit -m "feat: legal pages — mentions, privacy, cookies"
```

---

## Task 8: SEO complet — schemas, sitemap, robots, llms.txt, OG

**Files:**
- Create: `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`
- Create: `schema/organization.json`

- [ ] **Step 1: Creer robots.txt optimise**

```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://www.unico-consult.be/sitemap.xml

# AI crawlers — welcome
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /
```

- [ ] **Step 2: Creer sitemap.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.unico-consult.be/</loc><lastmod>2026-04-01</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>
  <url><loc>https://www.unico-consult.be/expertise</loc><lastmod>2026-04-01</lastmod><priority>0.9</priority></url>
  <url><loc>https://www.unico-consult.be/secteurs</loc><lastmod>2026-04-01</lastmod><priority>0.8</priority></url>
  <url><loc>https://www.unico-consult.be/clients</loc><lastmod>2026-04-01</lastmod><priority>0.8</priority></url>
  <url><loc>https://www.unico-consult.be/equipe</loc><lastmod>2026-04-01</lastmod><priority>0.7</priority></url>
  <url><loc>https://www.unico-consult.be/partenaires</loc><lastmod>2026-04-01</lastmod><priority>0.7</priority></url>
  <url><loc>https://www.unico-consult.be/contact</loc><lastmod>2026-04-01</lastmod><priority>0.8</priority></url>
  <url><loc>https://www.unico-consult.be/mentions-legales</loc><lastmod>2026-04-01</lastmod><priority>0.3</priority></url>
  <url><loc>https://www.unico-consult.be/vie-privee</loc><lastmod>2026-04-01</lastmod><priority>0.3</priority></url>
</urlset>
```

- [ ] **Step 3: Creer llms.txt**

```
# Unico Consult SRL
# https://www.unico-consult.be

## About
Unico Consult is a Belgian business management consulting firm founded in October 2019, based in Sint-Stevens-Woluwe (near Brussels). We help entrepreneurs focus on their core business by managing everything else: HR, management consulting, back-office outsourcing, logistics, and branding.

## Key Facts
- Legal name: UNICO-CONSULT SRL
- VAT: BE 0735.798.943
- Address: Hippokrateslaan 4 bus 001, 1932 Sint-Stevens-Woluwe, Belgium
- Phone: +32 2 290 58 98
- Email: info@unico-consult.be
- Founded: October 7, 2019
- Team: 3 senior consultants
- Clients: 15+ active clients across 4 sectors

## Services
1. Human Resources Management — payroll, recruitment, training, employee evaluation
2. Management Consulting — commercial, legal, operational strategy
3. Back-office & Outsourcing — invoicing, supplier payments, accounting coordination
4. Logistics — premises, IT, telephony, fleet management
5. Branding — visual identity and brand creation

## Sectors
- Titres-services (Belgian home cleaning voucher system)
- Transport & logistics
- SMEs & independent professionals
- Restaurants & franchises

## Notable Clients
Maison'Net, La Cense, Nassim Consult, CI&T Group, Moby Green, Last Green Mile, Hermes Lines, The Kitchen 1, DYMA Services, Logicon, Corner Building, 1st Belgium Service

## Partners
Dell Technologies, Reposa Italy, SD Worx, Simply Accounts Solutions

## Citation Policy
Content from unico-consult.be may be cited with attribution. For detailed information, contact info@unico-consult.be.
```

- [ ] **Step 4: Creer le schema JSON-LD complet**

Injecter dans le `<head>` de chaque page le schema `ProfessionalService` complet avec :
- @type, name, url, telephone, email, address, geo, openingHours
- foundingDate, vatID, priceRange, sameAs
- hasOfferCatalog (5 services)
- areaServed (Zaventem, Brussels)

Schema additionnel par page :
- Homepage : `WebSite` + `Organization`
- Expertise : `Service` (x5)
- Clients : `Review` (temoignages)
- Contact : `ContactPoint`
- Toutes : `BreadcrumbList`

- [ ] **Step 5: Commit**

```bash
git add public/ schema/
git commit -m "feat: complete SEO — robots, sitemap, llms.txt, JSON-LD schemas"
```

---

## Task 9: Vercel deploy + headers securite

**Files:**
- Create/Update: `vercel.json`

- [ ] **Step 1: Configurer vercel.json**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains; preload" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://maps.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; frame-src https://www.google.com" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/expertise", "destination": "/expertise.html" },
    { "source": "/secteurs", "destination": "/secteurs.html" },
    { "source": "/clients", "destination": "/clients.html" },
    { "source": "/equipe", "destination": "/equipe.html" },
    { "source": "/partenaires", "destination": "/partenaires.html" },
    { "source": "/contact", "destination": "/contact.html" },
    { "source": "/mentions-legales", "destination": "/mentions-legales.html" },
    { "source": "/vie-privee", "destination": "/vie-privee.html" },
    { "source": "/cookies", "destination": "/cookies.html" }
  ],
  "redirects": [
    { "source": "/rh", "destination": "/expertise", "statusCode": 301 },
    { "source": "/management", "destination": "/expertise", "statusCode": 301 },
    { "source": "/outsourcing", "destination": "/expertise", "statusCode": 301 },
    { "source": "/logistique", "destination": "/expertise", "statusCode": 301 },
    { "source": "/branding", "destination": "/expertise", "statusCode": 301 },
    { "source": "/services", "destination": "/expertise", "statusCode": 301 },
    { "source": "/notre-expertise", "destination": "/expertise", "statusCode": 301 },
    { "source": "/copie-de-global-services", "destination": "/expertise", "statusCode": 301 },
    { "source": "/blank", "destination": "/", "statusCode": 301 },
    { "source": "/contactez-nous", "destination": "/contact", "statusCode": 301 },
    { "source": "/reserver-unicoworking", "destination": "/contact", "statusCode": 301 },
    { "source": "/unicoworking", "destination": "/contact", "statusCode": 301 },
    { "source": "/conseils", "destination": "/expertise", "statusCode": 301 }
  ]
}
```

Note : les redirects couvrent toutes les anciennes URLs Wix pour preserver le SEO existant.

- [ ] **Step 2: Creer le repo GitHub**

```bash
cd ~/claude-projects/projets/site-unico
git init
git add .
git commit -m "feat: Unico Consult website v2 — complete"
gh repo create amine-hs09/site-unico --private --source=. --push
```

- [ ] **Step 3: Deployer sur Vercel**

```bash
npx vercel --prod
```

Ou connecter le repo GitHub a Vercel via le dashboard.

- [ ] **Step 4: Commit**

```bash
git add vercel.json
git commit -m "feat: Vercel config with security headers and Wix URL redirects"
```

---

## Task 10: Test final + validation SEO

- [ ] **Step 1: Verifier Lighthouse**

Lancer un audit Lighthouse sur chaque page. Cibles :
- Performance : 95+
- Accessibility : 95+
- Best Practices : 95+
- SEO : 95+

- [ ] **Step 2: Verifier les schemas JSON-LD**

Utiliser https://search.google.com/test/rich-results sur chaque URL.

- [ ] **Step 3: Verifier le responsive**

Tester sur :
- Desktop 1440px
- Tablet 768px
- Mobile 390px (iPhone 15 Pro)

- [ ] **Step 4: Verifier les headers securite**

```bash
curl -I https://www.unico-consult.be/ | grep -i "x-frame\|content-security\|strict-transport\|x-content-type"
```

- [ ] **Step 5: Verifier llms.txt et robots.txt**

```bash
curl https://www.unico-consult.be/llms.txt
curl https://www.unico-consult.be/robots.txt
curl https://www.unico-consult.be/sitemap.xml
```

- [ ] **Step 6: Soumettre le sitemap a Google Search Console**

Aller sur search.google.com/search-console, soumettre `https://www.unico-consult.be/sitemap.xml`.

---

## Recapitulatif

| Task | Contenu | Effort estime |
|------|---------|---------------|
| 1 | Init Vite + design system | 15 min |
| 2 | Logo SVG + icones + favicon | 20 min |
| 3 | Composants partages (nav, footer, marquee, animations) | 30 min |
| 4 | Homepage complete | 30 min |
| 5 | 5 pages interieures | 45 min |
| 6 | Page contact + formulaire | 20 min |
| 7 | Pages legales | 15 min |
| 8 | SEO (schemas, sitemap, robots, llms.txt) | 25 min |
| 9 | Vercel deploy + headers + redirects Wix | 15 min |
| 10 | Tests + validation | 15 min |
| **TOTAL** | | **~3h30** |

---

## Score SEO projete apres deploiement

| Metrique | Avant (Wix) | Apres |
|----------|-------------|-------|
| Score global | 31/100 | 85+/100 |
| Technical | 54/100 | 95/100 |
| Content | 20/100 | 80/100 |
| Schema | 10/100 | 90/100 |
| Performance | 35/100 | 95/100 |
| Local SEO | 24/100 | 70/100 |
| GEO (AI) | 21/100 | 75/100 |
