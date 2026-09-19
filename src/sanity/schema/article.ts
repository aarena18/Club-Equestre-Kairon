import { defineField, defineType } from "sanity";

/**
 * Une actualité ou un évènement (arborescence, rubrique 5.3).
 * C'est ce type de document qui remplace les anciennes pages figées
 * du site FFE (JEM 2014, CSO 2019, Endurance 2017...) par un flux
 * daté et filtrable.
 */
export default defineType({
  name: "article",
  title: "Actualité / évènement",
  type: "document",
  fields: [
    defineField({
      name: "titre",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Adresse de la page",
      type: "slug",
      options: { source: "titre" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "datePublication",
      title: "Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categorie",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Rentrée", value: "rentree" },
          { title: "Compétition", value: "competition" },
          { title: "Vie du club", value: "vie-du-club" },
        ],
      },
    }),
    defineField({
      name: "photoCouverture",
      title: "Photo de couverture",
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
      name: "resume",
      title: "Résumé (affiché dans la liste des actualités)",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "contenu",
      title: "Contenu",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
    }),
  ],
  orderings: [
    {
      title: "Date, la plus récente en premier",
      name: "datePublicationDesc",
      by: [{ field: "datePublication", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "titre", subtitle: "datePublication", media: "photoCouverture" },
  },
});
