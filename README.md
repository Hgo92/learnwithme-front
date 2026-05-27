# Learn With Me - Des flashcards pour aider à l'apprentissage des langues

## Le projet

Ce projet réalisé avec NestJS pour la partie back-end et React pour la partie front. Vous êtes actuellement sur le repo Git de la partie front.

## Installation

'npm install'

### Logs

#### 27/05/2026 - Refacto de la snackbar

Avant la snackbar était présente et individualisée dans chaque page où elle était nécessaire (10 au total). J'en ai fait une fonction unique (avec le texte voulu en paramètre) et je l'appelle là où c'est nécessaire. Comme ça, si je veux changer le timer de fermeture ou ajouter un autre événement au moment de l'utilisation, je peux le faire directement pour toutes les snackbars.

#### 26/05/2026 - Ajout d'un schéma de validation Zod

Pour vérifier les données avant l'envoi de mon formulaire de création de compte, j'ai ajouté un schéma zod.

### To-Do List

- [ ] Ajouter gestion d'erreur dans AddCard/AddDeck/Change etc
- [ ] Ajouter la gestion de l'IA pour créer des cartes
- [ ] Ajout d'un timer pour répondre
- [ ] Modifier le bouton "Question suivante" à la dernière question

#### Idées

// - Choisir le nombre de cartes qu'on veut dans le jeu (ex : deck de 50 cartes, interrogé sur 10)
// - Gestion de la réussite sur une carte (plus on réussit une carte, moins elle a de chance de revenir)
// - Heuristique
// - Check distance LEvenshtein
