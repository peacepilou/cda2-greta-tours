# CDA² — Pack d'identité

Identité visuelle de la formation **Concepteur Développeur d'Application** — GRETA Tours (RNCP37873, promotion 2026–2027).

Concept du mark : **toque de diplômé** — la formation et son aboutissement, la certification RNCP.

---

## Contenu

```
brand-assets/
├─ icon/
│  ├─ icon-graphite.svg          ← icône vectorielle, palette Graphite (cuivre)
│  ├─ icon-encre.svg             ← icône vectorielle, palette Encre (ciel)
│  └─ png/                       ← PNG transparents (coins arrondis)
│     ├─ icon-graphite-{16…512}.png
│     └─ icon-encre-{32…512}.png
├─ favicon.svg                   ← favicon (Graphite)
├─ favicon-{16,32,48}.png
├─ logo/                         ← lockup horizontal (mark + CDA² + tagline)
│  ├─ logo-graphite-ondark.svg / .png   ← pour fonds sombres
│  ├─ logo-encre-ondark.svg / .png      ← pour fonds sombres (variante ciel)
│  └─ logo-onlight.svg / .png           ← pour fonds clairs (texte foncé)
└─ monochrome/                   ← mark seul, sans tuile, 1 couleur
   ├─ mark-white.svg   (+ png)   ← sur fond foncé
   ├─ mark-dark.svg    (+ png)   ← sur fond clair
   └─ mark-copper.svg  (+ png)
```

## Palette de marque

| Direction | Dégradé icône | Usage |
|-----------|---------------|-------|
| **Graphite** | `#E6B483` → `#C07A3E` (cuivre) | par défaut |
| **Encre**    | `#8FBCE4` → `#4361A8` (ciel)   | variante |

Fonds applicatifs : Graphite `oklch(0.165 0.006 60)` · Encre `oklch(0.175 0.014 258)`.

## Typographie

- **Wordmark & titres** : Space Grotesk (700)
- **Tagline & chiffres techniques** : Space Mono
- **Texte courant** (dashboard) : Hanken Grotesk

## Notes d'usage

- Les **SVG d'icône et monochromes** sont 100 % vectoriels (aucune police requise) → utilisables partout.
- Les **SVG de logo (lockup)** contiennent du texte en *Space Grotesk* / *Space Mono* : installer ces polices (gratuites, Google Fonts) pour un rendu fidèle en édition. Les **PNG de logo** sont déjà rendus avec les bonnes polices.
- Réserve minimale autour du mark : ½ de sa hauteur. Ne pas déformer, recolorer hors palette, ni ajouter d'ombre au glyphe.
- Favicon : utiliser `favicon.svg` (navigateurs modernes) avec repli `favicon-32.png`.

— Généré pour le dashboard de planning CDA².
