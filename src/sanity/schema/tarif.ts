import { defineField, defineType } from "sanity";

/**
 * Une ligne de la grille tarifaire (arborescence, rubrique 4.1).
 * Remplace le PDF "TARIF_RENTREE_2026_2027_FORFAITS.pdf" du site actuel
 * par un contenu éditable et lisible sur mobile.
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
      description: "Ex. « Forfait 1h / semaine »",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "prix",
      title: "Prix (€)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "periode",
      title: "Par",
      type: "string",
      description: "Ex. « mois », « trimestre », « séance »",
      initialValue: "mois",
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
    select: { title: "titre", subtitle: "prix" },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle ? `${subtitle} €` : undefined,
    }),
  },
});
