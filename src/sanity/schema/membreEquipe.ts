import { defineField, defineType } from "sanity";

/** Un membre de l'équipe (arborescence, rubrique 1.2). */
export default defineType({
  name: "membreEquipe",
  title: "Membre de l'équipe",
  type: "document",
  fields: [
    defineField({
      name: "nom",
      title: "Nom",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Rôle",
      type: "string",
      description: "Ex. « Enseignante », « Moniteur », « Responsable cavalerie »",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texte alternatif (accessibilité)",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "bio",
      title: "Présentation",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "ordre",
      title: "Ordre d'affichage",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "nom", subtitle: "role", media: "photo" },
  },
});
