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

## Déploiement

### Preview sur GitHub Pages (temporaire)

Pour voir le site en ligne rapidement, avant la mise en ligne réelle sur
Netlify. Le repo n'ayant pas de nom de domaine personnalisé, GitHub
Pages sert le site sous `https://aarena18.github.io/Club-Equestre-Kairon/`
— tous les liens internes s'adaptent automatiquement à ce sous-chemin via
`src/lib/url.ts` (`withBase()`), piloté par la variable d'env
`GITHUB_PAGES` au moment du build (voir `astro.config.mjs`). Rien à
changer dans le code le jour du vrai déploiement.

**Limite connue, volontairement pas corrigée ici** : les deux
formulaires (`/infos-pratiques#essai` et `/proprietaires-pension`)
utilisent Netlify Forms, qui n'existe pas sur GitHub Pages — ils ne
mèneront nulle part tant que le site n'est pas sur Netlify. Pas
bloquant pour une preview, à garder en tête avant de partager le lien.

Le workflow `.github/workflows/deploy-gh-pages.yml` build et déploie
automatiquement à chaque push sur `main`. Deux réglages une seule fois
sur GitHub (pas faisables en ligne de commande sans être connecté) :

1. **Settings → Pages → Build and deployment → Source : "GitHub
   Actions"** (pas "Deploy from a branch").
2. **Settings → Secrets and variables → Actions**, ajouter
   `PUBLIC_SANITY_PROJECT_ID` et `PUBLIC_SANITY_DATASET` (mêmes valeurs
   que dans `.env`) — le build en CI n'a pas accès à votre `.env` local.

Le déploiement ne se redéclenche pas automatiquement quand le contenu
change dans Sanity (pas de webhook configuré, contrairement à ce que
Netlify proposera) — relancez le workflow manuellement (onglet
*Actions* → *Run workflow*) après une mise à jour du CMS si besoin.

### Netlify (hébergement final, prévu)

Voir le choix de stack : déploiement Git automatique, formulaires
inclus, domaine personnalisé. Pas encore configuré.

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

**L'arborescence des 6 rubriques est entièrement construite et branchée sur le CMS.**

- [x] Scaffold Astro + tokens de la DA
- [x] Intégration Sanity (CMS) — projet connecté, contenu réel saisi (24 tarifs, 8 activités, 3 membres d'équipe, 1 actualité)
- [x] Accueil — hero, 3 portes d'entrée, activités, réassurance, actus, essai
- [x] Le centre — pédagogie, équipe (CMS), installations, cavalerie, valeurs
- [x] Activités & cours — hub filtrable + une page par activité
- [x] Propriétaires & pension — services, tarifs, formulaire dédié
- [x] Tarifs & inscription — grille complète, inscription, solidarité, documents
- [x] Compétition & vie du club — challenge, sorties, actualités filtrables, galerie
- [x] Infos pratiques — nous trouver, horaires, FAQ, **formulaire de demande d'essai** (Netlify Forms)
- [x] Nav responsive (menu mobile au-delà de 5 liens)
- [x] Preview GitHub Pages — workflow prêt, reste à activer côté GitHub (secrets + Pages source)
- [ ] Déploiement Netlify + nom de domaine (formulaires ne marcheront qu'à cette étape)

### Contenu à compléter avant mise en ligne réelle

Pas bloquant pour continuer à développer, mais à ne pas oublier — tout est signalé directement dans le code/CMS, pas cité de mémoire :

- **4 lignes tarifaires** (Trimestre 1 ×2, Forfait famille ×2) affichent encore une note interne « à vérifier » dans leur champ Précisions — à relire sur le document source et à nettoyer dans le Studio.
- **Réglages du site** (téléphone, email, adresse, horaires) jamais renseignés — plusieurs pages s'en accommodent (« coordonnées à venir ») mais ce n'est pas vendeur.
- **Photos** : aucune pour l'instant, nulle part (équipe, activités, galerie). Les pages sont prêtes à les afficher dès qu'elles sont ajoutées dans le Studio.
- L'actualité de rentrée n'a que son résumé, pas son contenu complet (le corps de la fiche détail est vide).
- Nombre exact de carrières/box/manège sur la page Le centre — resté volontairement vague, faute de donnée vérifiée.
