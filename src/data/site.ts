/** Navigation principale — les 6 rubriques de l'arborescence validée. */
export const navLinks = [
  { href: "/le-centre", label: "Le centre" },
  { href: "/activites", label: "Activités & cours" },
  { href: "/proprietaires-pension", label: "Propriétaires" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/competition-vie-club", label: "Vie du club" },
  { href: "/infos-pratiques", label: "Infos pratiques" },
];

/**
 * L'action principale du site, partout le même libellé et le même bouton
 * (`.btn-teal`). La page d'arrivée explique que l'inscription commence
 * par un cours d'essai.
 */
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
    r: "Oui, voir la fiche Équitation adaptée dans les activités.",
  },
  {
    q: "Puis-je mettre mon cheval en pension au centre ?",
    r: "Oui, en box individuel ou en plein-air, selon 3 classes. Voir la rubrique Propriétaires.",
  },
];

/**
 * Photo par défaut de chaque catégorie d'activité, utilisée tant que la
 * fiche n'a pas sa propre photo dans le Studio Sanity.
 */
export const photoParCategorie: Record<string, string> = {
  "baby-cavaliers": "enfants",
  "enfants-ados": "vacances",
  adultes: "adultes",
  "expert-competition": "carriere",
  "equitation-adaptee": "manege",
  "balades-randonnees": "balade-chemin",
  "stages-vacances": "plage-groupe",
};

/**
 * Photo de bandeau (plein écran) par catégorie : uniquement des photos
 * assez grandes pour ne pas être floues en 1440 px.
 */
export const bandeauParCategorie: Record<string, string> = {
  "baby-cavaliers": "manege",
  "enfants-ados": "manege",
  adultes: "carriere",
  "expert-competition": "carriere",
  "equitation-adaptee": "manege",
  "balades-randonnees": "plage-groupe",
  "stages-vacances": "plage-groupe",
};

/** Photos de la galerie "Le club en images" (en attendant la galerie CMS). */
export const galerieStatique = [
  { src: "plage-coucher-soleil", alt: "Cavalier au galop sur la plage au coucher du soleil" },
  { src: "plage-groupe", alt: "Balade en groupe sur la plage à marée basse" },
  { src: "pre-baie", alt: "Cheval au pré, la baie en arrière-plan" },
  { src: "balade-chemin", alt: "Balade à cheval sur un chemin de campagne" },
  { src: "manege", alt: "Cours à pied avec les poneys dans le manège" },
  { src: "carriere", alt: "La carrière de saut d'obstacles du centre" },
  { src: "vacances", alt: "Groupe d'enfants en stage avec deux poneys blancs" },
  { src: "adultes", alt: "Une cavalière franchit un obstacle de CSO" },
];

/**
 * Réseaux sociaux affichés dans le footer. Les liens renseignés dans
 * "Réglages du site" (Studio) ont la priorité ; sans eux, on retombe sur
 * ces valeurs.
 */
export const reseauxSociaux: { facebook?: string; instagram?: string } = {
  facebook: "https://www.facebook.com/kairon.equitation",
  instagram: "https://www.instagram.com/saint.pair.equitation/",
};
