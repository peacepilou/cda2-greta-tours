import type { NotionLink } from '../types'

export interface PrepModule {
  key: string
  emoji: string
  title: string
  hours: string
  pourquoi: string
  sequences: string[]
  livrable: string
  link: NotionLink
  bonus?: boolean
}

export const PREP_FRAMING = {
  period: 'Juillet → septembre 2026 · à ton rythme',
  volume: 'Environ 30h étalées sur l\'été (+ un bonus JS si l\'élan te porte) — mieux vaut 1h régulière qu\'un week-end marathon',
  promesse: 'Aucun prérequis. On part de zéro, et c\'est très bien comme ça.',
  regleIA: 'L\'IA peut t\'expliquer une erreur ou un concept. Elle n\'écrit pas ta page à ta place — tu poses ici les fondations de ton raisonnement.',
  filRouge: 'Le fil rouge de l\'été : ta page perso. Construite en HTML, stylée en CSS — c\'est elle que tu déploieras sur Internet en semaine Git (S43). Ce que tu construis cet été a une suite.',
}

export const PREP_MODULES: PrepModule[] = [
  {
    key: 'terminal',
    emoji: '💻',
    title: 'Le Terminal',
    hours: '~6h',
    pourquoi: 'Tout ce que tu feras en formation — Git, Node, Docker — passe par le Terminal. Le clavier est dix fois plus rapide que la souris.',
    sequences: [
      'C\'est quoi un shell — anatomie d\'une commande',
      'Naviguer : pwd, ls, cd · chemins absolus vs relatifs · la touche Tab',
      'Manipuler : mkdir, touch, cp, mv, rm — et pourquoi rm ne pardonne pas',
      'Lire et chercher : cat, less, grep',
      'Confort de pilote : historique, raccourcis, enchaîner avec &&',
    ],
    livrable: 'L\'arborescence de ta future page perso créée entièrement au clavier + ta cheatsheet des 15 commandes que tu utilises vraiment',
    link: { label: '💻 Le Terminal', url: 'https://www.notion.so/37d2ae802e29814ea580e35be5867d52' },
  },
  {
    key: 'pseudocode',
    emoji: '🧠',
    title: 'Pseudo-code & raisonnement',
    hours: '~4h',
    pourquoi: 'Le code n\'est que la traduction d\'une pensée claire. Décomposer un problème en étapes — ça s\'entraîne sans ordinateur, un carnet suffit.',
    sequences: [
      'Décomposer : un problème → des étapes ordonnées — la recette de cuisine comme premier algorithme',
      'Les briques logiques : SI/SINON, TANT QUE, POUR CHAQUE — en français, sans syntaxe',
      'Variables et états : suivre ce que « la machine » retient, ligne par ligne, à la main',
      'Katas papier : plus grand nombre d\'une liste, compter les voyelles, mot le plus long',
      'Relecture croisée : ton algorithme lu par quelqu\'un d\'autre — s\'il bute, c\'est l\'algo qui manque de clarté',
    ],
    livrable: '5 mini-algorithmes écrits en pseudo-code (carnet ou fichier texte), dont au moins un relu et compris par quelqu\'un d\'autre',
    link: { label: '🧠 Cours Pseudo-code (Notion)', url: 'https://www.notion.so/37d2ae802e2981d3b307f125a652d837' },
  },
  {
    key: 'html',
    emoji: '📄',
    title: 'HTML',
    hours: '~10h',
    pourquoi: 'Une page web est un document structuré, pas un dessin. HTML dit ce que les choses sont — le style viendra après.',
    sequences: [
      'Une page = un document : doctype, head, body',
      'Le texte et les liens : titres, paragraphes, listes, <a href>',
      'La sémantique : header, nav, main, section, footer — pourquoi div partout = page illisible',
      'Images et médias : img, alt obligatoire, poids des fichiers',
      'Formulaires en découverte — les reconnaître, on les travaillera en formation',
      'Valider : zéro erreur au validateur W3C',
    ],
    livrable: 'Ta page perso : structure sémantique complète (header, main, footer), zéro erreur au validateur W3C',
    link: { label: '📄 HTML', url: 'https://www.notion.so/37d2ae802e29819ea479d108347e2168' },
  },
  {
    key: 'css',
    emoji: '🎨',
    title: 'CSS',
    hours: '~12h',
    pourquoi: 'Facile à commencer, diabolique à maîtriser — mais avec le box model et Flexbox, tu construis déjà des pages propres.',
    sequences: [
      'Sélecteurs et cascade : balise, classe, id — qui gagne et pourquoi',
      'Le box model : content, padding, border, margin · box-sizing',
      'Couleurs et typographie : contraste, Google Fonts, line-height',
      'Flexbox : justify-content, align-items, gap — et Flexbox Froggy pour s\'entraîner',
      'Responsive : media queries, mobile-first, tester sur son propre téléphone',
      'Grid en découverte — reconnaître, pas maîtriser',
    ],
    livrable: 'Ta page perso stylée et responsive : lisible sur ordinateur ET sur ton téléphone',
    link: { label: '🎨 CSS', url: 'https://www.notion.so/37d2ae802e298139beb8d8c5573e31c9' },
  },
  {
    key: 'js',
    emoji: '🌼',
    title: 'JavaScript',
    hours: '~6h',
    pourquoi: 'Si HTML et CSS sont digérés et qu\'il te reste de l\'été : un avant-goût du premier langage de la formation. Pas obligatoire — septembre commence par lui de toute façon.',
    sequences: [
      'Qu\'est-ce que JavaScript — le langage qui rend les pages vivantes',
      'Variables et types de données — dans la console du navigateur',
      'Conditions if/else : ton pseudo-code devient du vrai code',
      'Trois petits scripts exécutés dans la console',
    ],
    livrable: 'Trois scripts exécutés dans la console du navigateur — et la fierté de lire du vrai code sans paniquer',
    link: { label: '🌼 Cours JavaScript (Notion)', url: 'https://satin-truffle-ac4.notion.site/Javascript-1d72ae802e29804596fbe823e86fa5a0' },
    bonus: true,
  },
]

export const PREP_PARENT_LINK: NotionLink = {
  label: '📚 Tous les cours de l\'été — sur Notion',
  url: 'https://www.notion.so/37d2ae802e2981fb97d2f8c73044cbb1',
}

export const PREP_CHECKLIST_TITLE = 'Tu es prêt pour septembre si…'

export const PREP_CHECKLIST: string[] = [
  'Tu navigues dans tes dossiers au clavier, sans toucher la souris',
  'Tu décomposes un problème en étapes écrites avant de chercher la solution',
  'Tu crées une page HTML valide avec header, main et footer',
  'Tu expliques la différence entre une classe et un id en CSS',
  'Ta page perso s\'affiche correctement sur ton téléphone',
  'Tu as lu un message d\'erreur en entier avant de demander de l\'aide',
]
