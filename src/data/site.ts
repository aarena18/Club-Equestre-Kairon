/** Navigation principale — les 6 rubriques de l'arborescence validée. */
export const navLinks = [
  { href: "/le-centre", label: "Le centre" },
  { href: "/activites", label: "Activités & cours" },
  { href: "/proprietaires-pension", label: "Propriétaires" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/competition-vie-club", label: "Vie du club" },
  { href: "/infos-pratiques", label: "Infos pratiques" },
];

/** CTA permanent : renvoie vers le formulaire de cours d'essai. */
export const ctaInscription = { href: "/infos-pratiques#essai", label: "S'inscrire" };

/** Questions fréquentes — partagées entre l'accueil et Infos pratiques. */
export const faq = [
  {
    q: "À partir de quel âge peut-on commencer ?",
    r: "Dès 2 ans, avec les baby cavaliers !",
  },
  {
    q: "Faut-il déjà avoir de l'expérience ?",
    r: "Non. La pédagogie du club accompagne chaque cavalier depuis ses débuts, jusqu'à l'instruction et la compétition pour qui le souhaite.",
  },
  {
    q: "Comment se passe le premier contact ?",
    r: "Remplissez le formulaire de cours d'essai ou contactez directement le centre : on convient ensemble d'un premier cours adapté à l'âge et au niveau du cavalier.",
  },
  {
    q: "Proposez-vous l'équitation adaptée aux cavaliers en situation de handicap ?",
    r: "Oui — voir la fiche Équitation adaptée dans les activités.",
  },
  {
    q: "Puis-je mettre mon cheval en pension au centre ?",
    r: "Oui, en box individuel ou en plein-air, selon 3 classes — voir la rubrique Propriétaires.",
  },
];

/**
 * Photo par défaut de chaque catégorie d'activité, utilisée tant que la
 * fiche n'a pas sa propre photo dans le Studio Sanity.
 */
export const photoParCategorie: Record<string, string> = {
  "baby-cavaliers": "/images/enfants.jpg",
  "enfants-ados": "/images/vacances.jpg",
  adultes: "/images/adultes.jpg",
  "expert-competition": "/images/carriere.jpg",
  "equitation-adaptee": "/images/manege.jpg",
  "balades-randonnees": "/images/balade-chemin.jpg",
  "stages-vacances": "/images/plage-groupe.jpg",
};

/** Photos de la galerie "Le club en images" (en attendant la galerie CMS). */
export const galerieStatique = [
  { src: "/images/plage-coucher-soleil.jpg", alt: "Cavalier au galop sur la plage au coucher du soleil" },
  { src: "/images/plage-groupe.jpg", alt: "Balade en groupe sur la plage à marée basse" },
  { src: "/images/pre-baie.jpg", alt: "Cheval au pré, la baie en arrière-plan" },
  { src: "/images/balade-chemin.jpg", alt: "Balade à cheval sur un chemin de campagne" },
  { src: "/images/manege.jpg", alt: "Cours à pied avec les poneys dans le manège" },
  { src: "/images/carriere.jpg", alt: "La carrière de saut d'obstacles du centre" },
  { src: "/images/vacances.jpg", alt: "Groupe d'enfants en stage avec deux poneys blancs" },
  { src: "/images/adultes.jpg", alt: "Une cavalière franchit un obstacle de CSO" },
];
