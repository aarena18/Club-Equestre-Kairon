import { defineField, defineType } from "sanity";

/**
 * Une ligne de la grille tarifaire (arborescence, rubrique 4.1).
 * Remplace le PDF de tarifs du site actuel par un contenu éditable et
 * lisible sur mobile. Modélisé sur la vraie grille du club (licence,
 * cotisation, forfaits éco annuels/trimestriels, forfait famille,
 * forfait Expert, pension par classe de cheval) plutôt que sur un prix
 * générique unique : chaque ligne y distingue tarif promo (souscription
 * avant le 28/08) et tarif rentrée, et le public concerné quand le prix
 * varie par âge.
 */
export default defineType({
  name: "tarif",
  title: "Tarif",
  type: "document",
  fields: [
    defineField({
      name: "titre",
      title: "Nom du forfait",
      type: "string",
      description: "Ex. « Forfait éco — 1h/semaine »",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categorie",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Licence & cotisation", value: "licence-cotisation" },
          { title: "Forfait éco annuel", value: "forfait-eco-annuel" },
          { title: "Forfait éco trimestriel", value: "forfait-eco-trimestriel" },
          { title: "Forfait famille", value: "forfait-famille" },
          { title: "Forfait performance (Expert)", value: "forfait-performance" },
          { title: "Pension / demi-pension", value: "pension" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publicConcerne",
      title: "Public concerné",
      type: "string",
      description: "Ex. « Baby, Enfant, Junior », « Sénior » — laisser vide si le tarif est le même pour tous.",
    }),
    defineField({
      name: "prix",
      title: "Tarif rentrée (à partir du 01/09)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "prixPromo",
      title: "Tarif promo (souscription avant le 28/08/2026)",
      type: "number",
      description: "Laisser vide si le forfait n'a pas de tarif promotionnel (ex. licence, pension).",
    }),
    defineField({
      name: "periode",
      title: "Par",
      type: "string",
      description: "Ex. « an », « trimestre », « mois »",
      initialValue: "an",
    }),
    defineField({
      name: "description",
      title: "Précisions",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "eligibleSolidarite",
      title: "Éligible « Crinières solidaires »",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "ordre",
      title: "Ordre d'affichage",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "titre", subtitle: "publicConcerne", price: "prix" },
    prepare: ({ title, subtitle, price }) => ({
      title,
      subtitle: [subtitle, price ? `${price} €` : undefined].filter(Boolean).join(" — "),
    }),
  },
});
