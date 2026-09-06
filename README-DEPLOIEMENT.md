# Les Trouvailles Malines — déploiement gratuit (0 €)

Ce projet a été nettoyé pour fonctionner **sans aucun backend** : les produits
et articles sont stockés dans deux fichiers que tu modifies toi-même :
- `src/data/products.js`
- `src/data/inspirations.js`

Aucune base de données, aucun serveur, aucun compte payant nécessaire.

## 1. Prérequis (gratuits)

- **Node.js** installé sur ton ordinateur : https://nodejs.org (version LTS).
- Un compte **Netlify** gratuit : https://app.netlify.com (inscription par email,
  aucune carte bancaire demandée).

## 2. Ajouter tes vrais produits Amazon

Ouvre `src/data/products.js` avec n'importe quel éditeur de texte (VS Code,
Notepad++...) et remplace les 4 exemples par tes propres produits. Pour
chaque produit, il te faut :
- Le **nom** et éventuellement une courte description ;
- Le **lien d'affiliation Amazon** (`amazon_url`) — celui que le programme
  Partenaires Amazon te donne pour chaque produit ;
- Une **image** (`image_url`) — le plus simple est d'héberger tes photos sur
  un service gratuit comme https://imgur.com (upload → clic droit sur
  l'image → "copier l'adresse de l'image") et de coller ce lien ici. C'est
  exactement le type d'images que tu comptes utiliser sur Pinterest (produit
  intégré dans un décor via IA) — tu peux réutiliser les mêmes visuels.

Fais la même chose dans `src/data/inspirations.js` si tu veux des articles.

## 3. Construire le site

Dans un terminal, à la racine du projet :

```bash
npm install
npm run build
```

Cela crée un dossier `dist/` contenant le site fini (HTML/CSS/JS), prêt à
être mis en ligne.

## 4. Mettre en ligne gratuitement sur Netlify

1. Va sur https://app.netlify.com et crée un compte gratuit.
2. Sur la page d'accueil de ton tableau de bord, repère la zone
   **"Deploy manually"** (glisser-déposer un dossier).
3. Fais glisser le dossier **`dist/`** (généré à l'étape 3) dans cette zone.
4. En quelques secondes, Netlify te donne une adresse du type
   `https://un-nom-aleatoire.netlify.app` — ton site est en ligne, gratuitement,
   sans limite de durée.
5. (Optionnel) Dans "Site settings" tu peux changer ce nom pour quelque chose
   comme `les-trouvailles-malines.netlify.app` (toujours gratuit).

C'est cette adresse `https://....netlify.app` que tu indiqueras lors de ton
inscription au **programme Amazon Partenaires**, et que tu utiliseras comme
lien "vers mon site" dans tes publications Pinterest.

## 5. Mettre à jour le site plus tard

Chaque fois que tu ajoutes un produit ou un article :
1. Modifie `src/data/products.js` ou `src/data/inspirations.js`.
2. Relance `npm run build`.
3. Reglisse le nouveau dossier `dist/` sur la même page Netlify (bouton
   "Deploys" → glisser à nouveau le dossier). Le site se met à jour en
   quelques secondes.

## 6. Nom de domaine personnalisé (optionnel, payant si tu le veux plus tard)

Le sous-domaine `....netlify.app` suffit pour t'inscrire au programme Amazon
Partenaires. Si un jour tu veux un vrai nom de domaine
(`lestrouvaillesmalines.fr`), tu pourras l'acheter (environ 10 €/an chez OVH,
Namecheap, etc.) et le brancher sur Netlify gratuitement — mais ce n'est pas
obligatoire pour démarrer à 0 €.

## 7. Intégrer le site dans une iframe WordPress

Le fichier `public/_headers` autorise désormais l'affichage du site dans une
iframe (sinon Netlify — comme la plupart des hébergeurs modernes — bloque
cet affichage par sécurité contre le "clickjacking").

⚠️ **Point de sécurité :** la règle `frame-ancestors *;` autorise N'IMPORTE
QUEL site web à afficher ton site dans une iframe, pas seulement le tien.
C'est suffisant pour démarrer, mais si tu veux limiter ça à ton seul site
WordPress, ouvre `public/_headers` et remplace la ligne par :

```
  Content-Security-Policy: frame-ancestors 'self' https://tonsite.fr;
```

(remplace `https://tonsite.fr` par l'adresse réelle de ton site WordPress).

Après toute modification de ce fichier : relance `npm run build` et
redéploie le dossier `dist/` sur Netlify (voir étape 5).

**Remarque :** intégrer ce site en iframe dans WordPress ajoute une couche
technique (double site, double maintenance) sans réel avantage pour ton
usage — le site Netlify est déjà accessible via sa propre URL, que tu peux
utiliser directement partout (inscription Amazon Partenaires, liens
Pinterest). L'iframe n'est utile que si tu tiens à ce que tout apparaisse
sous le nom de domaine de ton WordPress.

## 8. Ce qui a été modifié par rapport à l'export Base44 d'origine

- Suppression de la connexion au backend Base44 (qui n'était plus fonctionnel
  après l'export) et remplacement par les fichiers locaux `src/data/*.js`.
- Suppression des pages de connexion/inscription/OAuth (inutiles : ce site
  n'a pas de comptes utilisateurs, tu édites le contenu directement dans le
  code).
- Correction d'un bug qui empêchait `npm run build` de fonctionner
  (`vite.config.js` appelait un plugin Base44 non importé).
- Suppression de dépendances lourdes jamais utilisées par les pages du site
  (Stripe, Three.js, jsPDF, react-leaflet...) pour un site plus léger et un
  `npm install` plus rapide.

## 9. Gérer le site depuis ton téléphone (panneau d'administration gratuit)

Le projet inclut désormais un panneau d'administration ("Decap CMS", gratuit
et open source) accessible depuis n'importe quel navigateur, y compris sur
téléphone, à l'adresse `https://tonsite.netlify.app/admin/`. Il permet
d'ajouter un produit ou un article avec un formulaire simple (photo, nom,
prix, lien Amazon...) — chaque enregistrement met à jour le site
automatiquement en ~1 minute, sans jamais toucher au code.

Cela nécessite une configuration **unique** (à faire une seule fois, dans
l'idéal depuis un ordinateur — ensuite tout se passe depuis le téléphone).

### Étape A — Mettre le code sur GitHub (gratuit, sans ligne de commande)

1. Crée un compte gratuit sur https://github.com
2. Clique sur "New repository", nomme-le par exemple `trouvailles-malines`,
   laisse-le "Public" ou "Private" (peu importe), ne coche aucune case
   d'initialisation, clique "Create repository".
3. Sur la page qui suit, clique sur le lien "uploading an existing file".
4. Fais glisser **tout le contenu du dossier de ce projet** (tous les
   fichiers et dossiers extraits du zip) dans la zone de dépôt, puis clique
   "Commit changes". (Si GitHub refuse un dossier trop imbriqué d'un coup,
   fais-le en plusieurs fois : d'abord les fichiers à la racine, puis
   glisse le dossier `src`, puis `public`, puis `content`.)

### Étape B — Connecter Netlify à ce dépôt GitHub

1. Sur Netlify, va dans "Add new site" > "Import an existing project" >
   choisis GitHub, et sélectionne ton dépôt `trouvailles-malines`.
2. Renseigne les réglages de build :
   - Build command : `npm run build`
   - Publish directory : `dist`
3. Clique "Deploy". Netlify reconstruira désormais le site automatiquement
   à chaque modification (y compris celles faites depuis le panneau
   d'administration).

### Étape C — Activer l'authentification du panneau d'administration

1. Sur Netlify, ouvre ton site > "Site configuration" > "Identity" > clique
   "Enable Identity".
2. Toujours dans "Identity" > section "Services" > active "Git Gateway".
3. Dans "Identity" > "Invite users", invite ta propre adresse email. Tu
   recevras un email pour définir ton mot de passe.

### Étape D — Utiliser le panneau au quotidien, depuis ton téléphone

1. Ouvre `https://tonsite.netlify.app/admin/` dans le navigateur de ton
   téléphone (Chrome, Safari...).
2. Connecte-toi avec l'email/mot de passe défini à l'étape C.
3. Clique "Produits" > "New Produit" : remplis le formulaire (nom,
   description, prix, photo, lien Amazon, catégorie...), clique
   "Publish". C'est tout — le site se met à jour tout seul.
4. Même chose pour "Inspirations".

**Important :** les images que tu téléverses depuis le panneau sont
enregistrées directement dans ton dépôt GitHub (dossier
`public/images/uploads/`) — pas besoin d'un service externe comme Imgur.
