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
}

export const PREP_FRAMING = {
  period: 'Juillet → septembre 2026 · à ton rythme',
  volume: '25 à 30h étalées sur l\'été — mieux vaut 1h régulière qu\'un week-end marathon',
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
]

export const PREP_PARENT_LINK: NotionLink = {
  label: '🏖️ Cours de l\'été (Notion)',
  url: 'https://www.notion.so/37d2ae802e2981fb97d2f8c73044cbb1',
}

export const PREP_CHECKLIST_TITLE = 'Tu es prêt pour septembre si…'

export const PREP_CHECKLIST: string[] = [
  'Tu navigues dans tes dossiers au clavier, sans toucher la souris',
  'Tu crées une page HTML valide avec header, main et footer',
  'Tu expliques la différence entre une classe et un id en CSS',
  'Ta page perso s\'affiche correctement sur ton téléphone',
  'Tu as lu un message d\'erreur en entier avant de demander de l\'aide',
]
