# Contraintes du planning CDA2 — référentiel de revue

Ce fichier fige les règles contre lesquelles chaque semaine est évaluée. Il sert de référence à la revue itérative du planning. Source : PEDAGOGIE.md + échanges 08/09/10/11.

---

## A. Contraintes NON NÉGOCIABLES (vérifier la conformité, ne jamais proposer de les changer)

### A1. Règle A / B (alternance des cohortes)
- **Semaine A** = les deux cohortes présentes → **introduction de nouveau contenu autorisée**.
- **Semaine B** = TP seuls (alternants en entreprise) → **renforcement, katas, projet UNIQUEMENT**. **Aucun nouveau concept.**
- **Semaine ALT** = alternants seuls (post-certif TP) → prépa épreuves / contenu dédié.
- Une notion nouvelle complexe introduite en semaine B est une **violation**.

### A2. Calendrier figé
- Dates, jours fériés (Armistice 11/11 → S46 ; Noël S52/S53), période de STAGE (S11→S20), fermeture Gréta été (S27→S33) : **immuables**.
- Heures hebdo (`hrs`) : données, pas à rediscuter.

### A3. Dates de certification
- Certif TP : semaine du 14 juin 2027 (S24).
- Certif Alternants : 27 sept–1 oct 2027 (S39b, à confirmer côté administratif, pas côté contenu).

### A1-bis. Exception « primo-exposition guidée » en semaine B
Les semaines A sont sur-souscrites (notamment le backend S7→S10 : seulement 2 créneaux A — S7, S10 — pour 6 sujets lourds, S8 et S9 étant deux B consécutives). Pour éviter de fabriquer une fiction de calendrier, une semaine B peut **exceptionnellement** exposer un concept neuf **si les 4 conditions sont TOUTES réunies** :

1. **Outillage fourni clé-en-main** — l'apprenant ne construit pas l'infra de zéro (Dockerfile/compose fournis, filtre JWT fourni, squelette de projet fourni, page vulnérable fournie).
2. **Ancrage en A adjacente** — le concept est introduit, préparé ou consolidé dans la semaine A immédiatement avant ou après.
3. **Livrable = comprendre / appliquer / modifier, pas bâtir from scratch** — lire, exécuter, adapter, expliquer.
4. **`ia_mode` = `solo` ou `mixed`** — une primo-exposition ne démarre JAMAIS en `copilot`/`delegation`.

Chaque recours à l'exception est **listé nommément ci-dessous** (traçabilité). Hors de cette liste, A1 s'applique strictement.

**Exceptions actées :**
- **S45** — Figma (production guidée) + XSS sur page vulnérable fournie — ancre : S46 (consolidation XSS + OWASP, J+7).
- **S47** — async/fetch sur squelette fourni — ancre : S48 (migration TS du module async, J+7).
- **S4** — Streams sur exemples fournis — ancres : S3 J5 (démo 30 min) avant, S6 (approfondissement) après.
- **S8** — couche service sur squelette fourni + formalisation séquence UML — ancre : S7 (architecture Spring + séquence dessinée ensemble).
- **S9** — JWT (filtre fourni), Docker (compose fourni), Ollama (démo guidée) — ancres : S7 (lecture JWT jwt.io) avant, S10 (réutilisation du compose en prod) après · semaine la plus chargée du planning : reprise programmée en S21.

---

## B. Contraintes pédagogiques (terrain d'affinage)

### B1. Cours magistral borné
- **1h à 2h MAX** de théorie par jour (cours, correction guidée, démo). Au-delà = saturation.
- Le reste de la journée = pratique autonome.

### B2. Charge cognitive
- **Maximum un concept nouveau complexe par demi-journée.**
- Une semaine A qui empile 3+ notions neuves lourdes est à rééquilibrer.

### B3. Espacement (J+2 / J+7 / J+21)
- Une notion vue une seule fois est oubliée. Elle doit réapparaître en katas/projet à ~J+2, J+7, J+21.
- Vérifier que chaque notion majeure a des points de reprise programmés en aval.

### B4. Interleaving
- Ne pas bloquer 3 jours d'affilée sur la même notion. Mélanger des notions proches consolide mieux.

### B5. Récupération active
- Katas, quiz, « explique-moi », tests rouge→vert valent mieux que relire le cours.
- Les semaines B doivent être dominées par de la récupération active.

### B6. Mission autonome cadrée
- Tout moment autonome a : **une mission précise + les outils déjà en main + un livrable clair**.
- Le lendemain d'un moment autonome : **débrief collectif 10-15 min** pour faire remonter les blocages.

### B7. Émotion & confiance
- Public en reconversion, estime de soi fragile, syndrome de l'imposteur.
- Réussir un concret ancre ; l'échec sans filet détruit l'encodage. Pas de mur infranchissable sans accompagnement.

---

## C. Cadre IA (`ia_mode`)

| Mode | Emoji | Règle |
|------|-------|-------|
| `theory` | 📚 | Séance fondatrice — comprendre l'IA avant de l'utiliser |
| `solo` | 🔒 | Nouveau concept — IA interdite, ancrer le raisonnement |
| `mixed` | 🔒→🤝 | J1-J2 sans IA, J3-J5 avec — progression dans la semaine |
| `copilot` | 🤝 | Concept acquis — IA assistante, pas béquille |
| `delegation` | 🚀 | IA orchestrée — générer, critiquer, monitorer |
| `none` | — | Pas d'activité IA (certif, accueil, VAC) |

- **Cohérence attendue** : un nouveau concept (semaine A) ne démarre jamais en `copilot`/`delegation`. Il commence `solo` ou `mixed` (sans IA d'abord).
- Le champ `ia` doit décrire une activité IA concrète et évaluable, pas un usage flou « permanent ».

---

## D. Équilibrage blocs de compétences (cible)

- **BC01** ~45 % (392h) — UI · Composants · Gestion projet
- **BC02** ~35 % (305h) — Architecture · BDD · Accès données
- **BC03** ~20 % (174h) — Tests · CI/CD · Déploiement
- Chaque semaine porte un `bloc` primaire + `extraBlocs` transversaux (Fil rouge, Conception) + `blocs_cda` (BC ciblés).

---

## E. Fils rouges structurels (à retrouver tout du long)

- **Fil rouge e-shop** : projet de groupe, vécu de S45 (Figma) → S51 (démarrage Angular) → S9 (Ollama) → S10 (déploiement).
- **Portfolio progressif** (fallback alternants) : repo perso enrichi à chaque notion.
- **Conception en 3 passes** (échange 11) : use case (S44/45) → classes/MLD (S4/S5) → séquence/déploiement (S8/S10).
- **Veille / daily standup** : posture pro entretenue en continu.

---

## F. Questions ouvertes (héritées échange 09 — NE PAS trancher dans la revue, signaler si une semaine y touche)

1. Soft skills 50h + auto-formation 150h non réparties.
2. Contenu S34 (retour centre alternants, 23–27 août) — à définir.
3. S37 (alternants entreprise, 13–17 sept) — à confirmer.
4. Date exacte certif alternants.
5. Constitution des groupes fil rouge.
6. Templates docs de cadrage (CDC, user stories, acceptance, sprint, archi, README).
