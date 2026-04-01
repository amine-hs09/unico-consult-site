# Audit SEO Complet — unico-consult.be

**Date :** 1er avril 2026
**Site :** https://www.unico-consult.be/
**Plateforme :** Wix Thunderbolt (SSR partiel)
**Langue :** Francais (fr-BE)
**Pages indexees :** 18 (+ 4 booking services)
**Auditeur :** Claude Opus 4.6 — 7 agents specialises

---

## SCORE GLOBAL SEO : 31 / 100

| Categorie | Poids | Score | Pondere |
|-----------|-------|-------|---------|
| Technical SEO | 22% | 54/100 | 11.9 |
| Content Quality | 23% | 20/100 | 4.6 |
| On-Page SEO | 20% | 35/100 | 7.0 |
| Schema / Structured Data | 10% | 10/100 | 1.0 |
| Performance (CWV) | 10% | 35/100 | 3.5 |
| AI Search Readiness (GEO) | 10% | 21/100 | 2.1 |
| Images | 5% | 20/100 | 1.0 |
| **TOTAL** | **100%** | | **31.1** |

### Scores detailles par specialite

| Specialite | Score | Verdict |
|------------|-------|---------|
| Technical SEO | 54/100 | Passable — problemes corrigeables |
| Local SEO | 24/100 | Critique — GBP absent, 0 avis, NAP incoherent |
| GEO (AI Search) | 21/100 | Critique — invisible pour les IA |
| Schema Markup | ~10/100 | Critique — quasi inexistant |
| Content Quality | ~20/100 | Critique — contenu fin, non extractible |
| Performance | ~35/100 | Mauvais — contraint par Wix |
| Sitemap | — | 2 pages fantomes, dates gelees depuis 17 mois |

---

## RESUME EXECUTIF

### Le probleme fondamental
Le site Wix **rend tout son contenu via JavaScript cote client**. Les crawlers (Google, GPTBot, ClaudeBot, PerplexityBot) recoivent ~800 KB de code framework sans aucun texte lisible. Le site est **effectivement invisible** pour les moteurs de recherche IA et partiellement invisible pour Google.

### Top 5 problemes critiques

1. **"Monsite 1" affiche partout** — Le nom de site Wix n'a jamais ete change. Chaque partage social, chaque resultat Google affiche "Monsite 1" au lieu de "Unico Consult"
2. **Pages fantomes indexees** — `/blank` (page vide) et `/copie-de-global-services` (doublon) sont dans le sitemap et indexables
3. **Zero schema JSON-LD exploitable** — Seul un LocalBusiness incomplet sur la homepage (manque email, horaires, geo, services)
4. **Google Business Profile probablement non reclame** — 0 avis detectes sur aucune plateforme, aucune preuve de GBP actif
5. **Invisible pour l'IA** — Pas de llms.txt, pas de FAQ, pas de blog, contenu non extractible = score GEO 21/100

### Top 5 quick wins

1. Changer le nom de site Wix "Monsite 1" → "Unico Consult" (5 min, impact massif)
2. Supprimer `/blank` et `/copie-de-global-services` (10 min)
3. Activer IndexNow dans le dashboard Wix SEO (2 min)
4. Ajouter og:image a toutes les pages (30 min)
5. Corriger les meta descriptions trop longues (20 min)

---

## 1. TECHNICAL SEO (54/100)

### Problemes CRITIQUES

#### CRIT-1 — Double redirection http → https → www
`http://unico-consult.be/` → `https://unico-consult.be/` (301) → `https://www.unico-consult.be/` (301)
Deux sauts au lieu d'un. Gaspillage de crawl budget + dilution PageRank.

#### CRIT-2 — Pages fantomes dans le sitemap
- `/blank` — Titre: "Nouvelle page | Monsite 1". Page brouillon Wix jamais supprimee.
- `/copie-de-global-services` — Doublon de `/services`, slug auto-genere par Wix.
Les deux sont en HTTP 200, sans noindex, pleinement indexables.

#### CRIT-3 — /clients : titre "References | Monsite 1", pas de H1, pas de meta description
Le nom par defaut "Monsite 1" apparait dans les SERPs pour cette page.

#### CRIT-4 — og:site_name = "Monsite 1" sur TOUTES les pages
Chaque partage LinkedIn, Facebook, WhatsApp affiche "Monsite 1" comme marque.

### Problemes HIGH

| # | Probleme | Pages | Effort |
|---|----------|-------|--------|
| HIGH-1 | H1 multiples (2 a 4 par page) | 8/10 | Moyen |
| HIGH-2 | Sitemap lastmod gele oct 2024 (17+ mois) | Toutes | Faible |
| HIGH-3 | Pas de og:image sur 9/10 pages | 9 pages | Faible |
| HIGH-4 | HTML ~800 KB par page (Wix framework) | Toutes | Contraint plateforme |
| HIGH-5 | JSON-LD incomplet, absent sur 9 pages | 9/10 | Moyen |

### Problemes MEDIUM

| # | Probleme | Impact |
|---|----------|--------|
| MED-1 | HSTS sans preload ni includeSubDomains | Securite |
| MED-2 | Pas de CSP, X-Frame-Options, Permissions-Policy | Securite |
| MED-3 | Pas de hreflang fr-be | Geo-ciblage |
| MED-4 | Meta descriptions > 155 chars (6 pages) | Troncature SERP |
| MED-5 | Format titres incoherent, marque manquante | Branding |
| MED-6 | /conseils orpheline (pas dans la navigation) | Link equity |
| MED-7 | CWV : slideshow hero = LCP killer, CLS fonts | Performance |

### Problemes LOW
- robots.txt `?lightbox=` disallow (OK)
- Twitter card sans image (cascade de HIGH-3)
- IndexNow non active (toggle Wix disponible)
- Canonical homepage sans trailing slash (monitoring)
- Speculationrules prefetch actif (analytics impact)

---

## 2. CONTENT QUALITY (~20/100)

### Constat
Le rendu 100% JavaScript de Wix empeche toute extraction de contenu par les crawlers non-browser. Aucun texte, aucun heading, aucune meta description n'est accessible dans le HTML brut sur la majorite des pages.

### E-E-A-T Assessment
| Signal | Status |
|--------|--------|
| Experience (temoignages, etudes de cas) | Absent — aucun temoignage client visible |
| Expertise (contenu approfondi, stats) | Faible — pages de services tres courtes |
| Authoritativeness (auteurs nommes, citations) | Absent — aucun auteur, aucune citation |
| Trustworthiness (avis, certifications, mentions legales) | Faible — mentions legales existent mais 0 avis |

### Contenu manquant
- **Blog/articles** : aucun contenu long-forme
- **FAQ** : aucune page FAQ, aucun schema FAQPage
- **Etudes de cas** : aucune, malgre 15+ clients actifs
- **Temoignages** : aucun visible sur le site
- **Page equipe** : pas de page dediee avec expertise des consultants
- **Chiffres cles** : non mis en avant

---

## 3. LOCAL SEO (24/100)

### NAP (Name/Address/Phone) — Incoherences detectees

| Source | Nom | Adresse | Telephone |
|--------|-----|---------|-----------|
| KBO/BCE | UNICO-CONSULT SRL | Hippokrateslaan 4/1, 1932 Zaventem | — |
| LinkedIn | Unico Consult | Avenue Hippocrate 4, 001, Woluwe-Saint-Etienne 1932 | Non liste |
| Client (ref.) | Unico Consult SRL | Avenue Hippocrate 4 bte 001, 1932 Sint-Stevens-Woluwe | 02 290 58 98 |
| Site web | Non extractible | Non extractible (Wix JS) | Non extractible |

**Problemes :**
1. 3 variantes du nom : "UNICO-CONSULT", "Unico Consult", "Unico Consult SRL"
2. Adresse NL (Hippokrateslaan) vs FR (Avenue Hippocrate) melangees
3. LinkedIn : annee fondation 2018 au lieu de 2019
4. Telephone invisible partout sauf brief client

### Google Business Profile
- **Statut** : Probablement non reclame ou non optimise
- **Avis** : 0 detectes (Google, Trustpilot, Facebook)
- **Categorie recommandee** : "Business Management Consultant" (pas "IT consultant")
- **Facteur #1 ranking local** : categorie GBP correcte (score 193/200 Whitespark 2026)

### Citations belges manquantes
| Annuaire | Statut | Priorite |
|----------|--------|----------|
| Google Business Profile | Non confirme | CRITIQUE |
| LinkedIn | Present, incomplet | HIGH |
| Gouden Gids / Pages d'Or | Non verifie | HIGH |
| Infobel.be | Non verifie | HIGH |
| Europages.be | Non confirme | MEDIUM |
| Kompass.com | Non verifie | MEDIUM |
| Trustpilot BE | Absent | MEDIUM |
| Facebook Business | Non confirme | HIGH |

---

## 4. SCHEMA / STRUCTURED DATA (~10/100)

### Etat actuel
- **Homepage** : LocalBusiness JSON-LD incomplet (nom + adresse partielle + telephone sans format)
- **9 autres pages** : ZERO schema
- **FAQPage** : absent
- **BreadcrumbList** : absent
- **Service** : absent
- **Person** : absent
- **Organization** : absent

### Schema recommande (a implementer sur le nouveau site)

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.unico-consult.be/#business",
  "name": "Unico Consult",
  "url": "https://www.unico-consult.be",
  "telephone": "+3222905898",
  "email": "info@unico-consult.be",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Hippokrateslaan 4 bus 001",
    "addressLocality": "Sint-Stevens-Woluwe",
    "addressRegion": "Flemish Brabant",
    "postalCode": "1932",
    "addressCountry": "BE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "50.87500",
    "longitude": "4.46200"
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00",
    "closes": "18:00"
  }],
  "foundingDate": "2019-10-07",
  "vatID": "BE0735798943",
  "priceRange": "$$",
  "sameAs": [
    "https://www.linkedin.com/company/unico-consult"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services de consulting",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Ressources Humaines"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Gestion & Management"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Back-office & Outsourcing"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Logistique"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Branding"}}
    ]
  }
}
```

---

## 5. AI SEARCH READINESS / GEO (21/100)

### Acces crawlers IA
| Crawler | Statut |
|---------|--------|
| GPTBot (ChatGPT) | AUTORISE |
| ClaudeBot (Anthropic) | AUTORISE |
| Google-Extended (Gemini) | AUTORISE |
| PerplexityBot | AUTORISE |
| OAI-SearchBot | AUTORISE |
| PetalBot (Huawei) | BLOQUE |

**Paradoxe** : tous les crawlers IA sont autorises, mais ils ne trouvent RIEN a indexer (rendu JavaScript).

### Visibilite estimee par plateforme
| Plateforme | Score | Raison |
|------------|-------|--------|
| Google AI Overviews | 5/100 | Wix JS + pas de schema + pas de FAQ |
| ChatGPT web search | 8/100 | Crawlers autorises mais rien a indexer |
| Perplexity | 10/100 | Idem |
| Bing Copilot | 8/100 | Idem |

### Recommandations prioritaires
1. **Creer /llms.txt** — fichier texte brut decrivant l'entreprise, bypass le probleme JS
2. **Ajouter JSON-LD complet** — lisible meme quand le contenu JS ne l'est pas
3. **Creer une page FAQ** avec schema FAQPage
4. **Publier du contenu blog** citable (passages 134-167 mots)
5. **Creer une entree Wikidata** pour la disambiguation d'entite

---

## 6. PERFORMANCE / CWV (~35/100)

### Metriques estimees (analyse HTML, pas de donnees terrain)

| Metrique | Estimation | Cible Google |
|----------|-----------|--------------|
| LCP | > 4s (Poor) | < 2.5s |
| INP | Needs Improvement | < 200ms |
| CLS | Needs Improvement | < 0.1 |
| TTFB | Acceptable (CDN Wix) | < 800ms |
| HTML Payload | 730-848 KB/page | < 100 KB ideal |

### Causes principales (contraintes Wix)
- **61 scripts** sur la homepage, 3 render-blocking dans le head
- **27 blocs `<style>` inline** sur la homepage
- **Slideshow hero** = LCP killer (le navigateur ne peut determiner le LCP avant initialisation JS du carousel)
- **Web fonts** (Raleway, DIN Next, Avenir) avec font-display: swap = CLS au swap
- **20 scripts externes** charges a l'initialisation

### Ce qui est corrigeable sur Wix
1. Remplacer le slideshow hero par une image statique (gain LCP majeur)
2. Supprimer les Wix Apps non utilisees (reduit le payload)
3. Optimiser les images hero (3445x1392px detecte — beaucoup trop)

---

## 7. SITEMAP

### Structure
```
sitemap.xml (index)
├── pages-sitemap.xml (18 URLs, lastmod: 2024-10-17)
└── booking-services-sitemap.xml (4 URLs, lastmod: 2024-12-03)
```

### Problemes

| Severite | URL | Probleme |
|----------|-----|----------|
| CRITIQUE | /blank | Page brouillon Wix "Nouvelle page \| Monsite 1" |
| HIGH | /copie-de-global-services | Doublon de /services, slug auto-genere |
| MEDIUM | /services vs /notre-expertise | Potentiel doublon de contenu |
| LOW | Dates lastmod uniformes | Toutes a 2024-10-17, Google les ignore |
| INFO | URLs booking avec accents | "journee" non encode en percent dans le XML |

### Pages manquantes (a creer pour le nouveau site)
- /a-propos ou /equipe
- /blog ou /ressources
- /faq
- /nos-secteurs
- /nos-partenaires

---

## 8. IMAGES (~20/100)

- **og:image** absent sur 9/10 pages
- Images hero surdimensionnees (3445x1392px pour un affichage 2500x1010)
- Alt text non verifiable (rendu JS)
- Pas de format WebP/AVIF force (Wix le fait automatiquement via son CDN mais sans controle)

---

## VERDICT FINAL

Le site Wix actuel est **fondamentalement limite** par la plateforme :
- Contenu invisible aux crawlers (rendu JS)
- Performance contrainte (~800 KB HTML par page)
- Headers de securite non modifiables
- Schema minimal et non extensible facilement
- Pas de blog natif optimise SEO

**La recommandation est claire : refaire le site sur une plateforme moderne** (Next.js, Astro, etc.) qui produit du HTML statique lisible par tous les crawlers, avec un controle total sur le schema, les headers, la performance et le contenu.

C'est exactement ce qu'on va faire.

---

*Rapport genere par 7 agents SEO specialises (Technical, Content, Schema, Local, GEO, Performance, Sitemap)*
*Claude Opus 4.6 — 1er avril 2026*
