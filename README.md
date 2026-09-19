# Centre Équestre de Kairon Plage — refonte du site

Refonte du site du centre équestre de Kairon Plage (poney club et club
hippique à Saint-Pair-sur-Mer, Manche), aujourd'hui hébergé sur la
plateforme générique de la FFE (`kairon-equitation.ffe.com`).

Projet bénévole : il sert à montrer au propriétaire du centre ce qui est
possible, avant d'envisager une prise en charge officielle.

## Pourquoi cette refonte

Le site actuel est un gabarit FFE standard : navigation à plat sur 17
entrées sans hiérarchie, pages d'événements figées depuis 2014/2017/2019,
aucun appel à l'action, design non personnalisé. Le contenu de fond, lui,
est riche (pédagogie par âge, 15+ disciplines, tarifs, règlement, aide
sociale « Crinières solidaires »...) — le problème est la mise en forme,
pas le fond.

Le projet s'est construit en trois phases, chacune validée avant de
passer à la suivante :

1. **Arborescence** — 6 rubriques de premier niveau organisées par
   intention de visite (Le centre, Activités & cours, Propriétaires &
   pension, Tarifs & inscription, Compétition & vie du club, Infos
   pratiques) plutôt que par organisation interne du club. Une rubrique
   dédiée aux propriétaires de chevaux en pension, absente du site actuel,
   a été ajoutée. Un CTA unique et permanent : « Réserver un cours
   d'essai ».
2. **Direction artistique** — fond blanc dominant, palette ancrée sur la
   vraie photo de la baie (bleu-gris de ciel, vert prairie) plutôt que sur
   le vert sapin des clubs premium classiques, corail en accent premier
   plan, jaune réservé aux illustrations dessinées à la main par le
   porteur du projet. Typo : une display condensée et affirmée (stand-in
   libre pour Chopen, police commerciale à licencier pour la prod) associée
   à une sans-serif douce en texte courant.
3. **Stack** — voir ci-dessous.

## Stack

| Brique | Choix | Pourquoi |
|---|---|---|
| Framework | [Astro](https://astro.build) | Site de contenu, pas d'app : HTML généré, rapide, simple à reprendre par un développeur généraliste |
| CMS | [Sanity](https://www.sanity.io) *(à intégrer)* | Le propriétaire du club édite textes, tarifs, actus et photos sans toucher au code |
| Hébergement | [Netlify](https://www.netlify.com) *(à configurer)* | Déploiement automatique à chaque publication, HTTPS géré, formulaires inclus |
| Formulaire « essai gratuit » | Netlify Forms *(à intégrer)* | Zéro backend pour la V1 ; évolutif vers une prise de créneau en ligne en V2 |

Coût récurrent visé : **0 €/mois** (hors nom de domaine, seul poste payant
une fois le site en ligne).

## Structure du repo

```
src/
  layouts/     Layout.astro — squelette HTML, polices, meta
  pages/       une route par fichier (routing Astro)
  styles/      tokens.css — palette, typo et espacements de la DA
public/        assets statiques (favicon, images non optimisées)
```

## Démarrer en local

```bash
npm install
cp .env.example .env   # puis remplir PUBLIC_SANITY_PROJECT_ID (voir ci-dessous)
npm run dev             # http://localhost:4321
npm run build           # build de prod dans ./dist
npm run preview         # prévisualiser le build
```

## CMS (Sanity)

Le Studio d'administration vit dans ce même repo, à l'adresse `/studio`
une fois le serveur lancé. Les types de contenu éditables sont définis
dans `src/sanity/schema/` : Activité, Tarif, Actualité, Membre d'équipe,
Réglages du site.

**Créer le projet Sanity** (étape à faire une seule fois, avec votre
propre compte — je ne peux pas la faire à votre place) :

```bash
npx sanity login    # ouvre le navigateur pour créer un compte ou se connecter
npx sanity init      # crée un projet Sanity, choisir "production" comme dataset
```

La commande affiche un `project ID`. Copiez-le dans `.env` :

```
PUBLIC_SANITY_PROJECT_ID=votre-project-id
PUBLIC_SANITY_DATASET=production
```

Sans ce fichier `.env` rempli, `npm run build` échoue volontairement sur
la route `/studio` (le Studio ne peut pas exister sans projet Sanity
associé) — c'est le seul pré-requis avant de pouvoir travailler dessus.

Une fois en ligne sur Netlify, les deux mêmes variables devront être
renseignées dans les réglages d'environnement du site Netlify.

## Workflow de branches

`main` reste toujours buildable. Chaque rubrique de l'arborescence (et
chaque brique technique transverse) se développe sur sa propre branche
`feature/*`, fusionnée dans `main` une fois la page fonctionnelle :

- `feature/homepage`
- `feature/activites-cours`
- `feature/proprietaires-pension`
- `feature/tarifs-inscription`
- `feature/competition-vie-du-club`
- `feature/infos-pratiques-contact`
- `feature/cms-sanity`

## Statut

- [x] Scaffold Astro + tokens de la DA + home minimale
- [x] Intégration Sanity (CMS) — schémas prêts, projet à créer côté Sanity (voir section CMS)
- [ ] Pages de l'arborescence validée
- [ ] Formulaire de demande d'essai (Netlify Forms)
- [ ] Déploiement Netlify + nom de domaine
