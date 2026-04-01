# Plan d'Action SEO — unico-consult.be

**Score actuel : 31/100** → **Cible : 85+/100 avec le nouveau site**

---

## ACTIONS IMMEDIATES sur le site Wix actuel (en attendant le nouveau site)

### Cette semaine — 5 min chacune, impact majeur

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 1 | Changer nom de site Wix "Monsite 1" → "Unico Consult" | 2 min | CRITIQUE |
| 2 | Supprimer la page /blank dans l'editeur Wix | 2 min | CRITIQUE |
| 3 | Supprimer ou rediriger /copie-de-global-services → /services | 5 min | HIGH |
| 4 | Activer IndexNow dans Wix SEO Tools | 2 min | MEDIUM |
| 5 | Ajouter og:image (logo 1200x630) a toutes les pages | 30 min | HIGH |
| 6 | Corriger annee LinkedIn 2018 → 2019 + ajouter telephone | 10 min | HIGH |

### Ce mois — correctifs on-page Wix

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 7 | Fixer 1 seul H1 par page (les autres en H2/H3) | 1h | HIGH |
| 8 | Trimmer meta descriptions < 155 chars | 30 min | MEDIUM |
| 9 | Standardiser format titres : "[Mot-cle] \| Unico Consult" | 30 min | MEDIUM |
| 10 | Ajouter hreflang fr-be + x-default a chaque page | 30 min | MEDIUM |
| 11 | Remplacer slideshow hero par image statique | 20 min | HIGH (LCP) |

### Reclamer Google Business Profile — URGENT

1. Aller sur business.google.com
2. Revendiquer "Unico Consult" a l'adresse Hippokrateslaan 4, 1932 Zaventem
3. Categorie principale : **"Business Management Consultant"**
4. Categories secondaires : "Human Resources Consulting", "Business to Business Service"
5. Completer TOUS les champs (description, services, horaires, photos)
6. Demander des avis a 3-5 clients satisfaits

---

## LE NOUVEAU SITE — Ce qu'il resout

| Probleme Wix | Solution nouveau site |
|-------------|----------------------|
| Contenu invisible (JS render) | HTML statique SSG/SSR |
| ~800 KB HTML par page | < 50 KB HTML par page |
| Schema non extensible | JSON-LD complet dans le head |
| Pas de blog | Blog integre avec MDX |
| Headers non modifiables | Controle total via Vercel/headers |
| Performance contrainte | Score Lighthouse 95+ |
| Pas de llms.txt | Fichier statique a la racine |
| Pas de FAQ schema | Pages FAQ avec FAQPage schema |
| og:image manquant | Generation automatique OG images |

### Stack recommandee pour le nouveau site
- **Next.js 15** (SSG + SSR) ou **Astro** (full static)
- **Tailwind CSS** — design system sur mesure
- **Vercel** — deploy + CDN + headers personnalises
- **Schema.org** complet en JSON-LD
- **Blog MDX** — articles SEO-optimises
- **Sitemap dynamique** — lastmod reelles
- **llms.txt** — fichier statique pour les IA

### Objectifs SEO du nouveau site
| Metrique | Actuel | Cible |
|----------|--------|-------|
| Score SEO global | 31/100 | 85+/100 |
| Technical SEO | 54/100 | 95/100 |
| Local SEO | 24/100 | 80/100 |
| GEO (AI) | 21/100 | 70/100 |
| Performance | 35/100 | 95/100 |
| Schema | 10/100 | 90/100 |
| Content | 20/100 | 80/100 |

---

*Plan genere le 1er avril 2026 — Claude Opus 4.6*
