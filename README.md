# Calculator App 🧮

Une calculatrice web moderne et fonctionnelle développée avec JavaScript vanilla dans le cadre du cursus [The Odin Project](https://www.theodinproject.com/).

## 📋 Description

Cette application est une calculatrice complète qui permet d'effectuer les quatre opérations arithmétiques de base (addition, soustraction, multiplication et division). Elle dispose d'une interface utilisateur intuitive et supporte à la fois les interactions par clic et par clavier.

## ✨ Fonctionnalités

- **Opérations arithmétiques** : Addition (+), Soustraction (-), Multiplication (*), Division (/)
- **Support des nombres décimaux** : Calculs avec virgule flottante
- **Affichage de l'historique** : Visualisation de l'opération en cours
- **Gestion des erreurs** : Détection de la division par zéro et des entrées invalides
- **Double interface d'entrée** :
  - Boutons cliquables
  - Support clavier complet
- **Fonctions de contrôle** :
  - `Clear` : Réinitialisation complète
  - `Del` : Suppression du dernier caractère
  - `=` ou `Enter` : Calcul du résultat

## 🎯 Architecture

Le code est organisé selon une architecture orientée objet avec deux classes principales :

### `Calculator`
Gère toute la logique métier de la calculatrice :
- Stockage des valeurs et opérations
- Validation des entrées
- Exécution des calculs
- Gestion de l'historique

### `CalculatorUI`
Gère l'interface utilisateur et les interactions :
- Capture des événements (clics et clavier)
- Mise à jour de l'affichage
- Communication avec la logique métier

## 🚀 Utilisation

### Clavier
- **Chiffres** : `0-9`
- **Virgule** : `.`
- **Opérateurs** : `+`, `-`, `*`, `/`
- **Égal** : `=` ou `Enter`
- **Suppression** : `Backspace`

### Interface
Cliquez sur les boutons correspondants pour effectuer vos calculs.

## 🛠️ Technologies utilisées

- HTML5
- CSS3
- JavaScript (ES6+)
- Architecture POO (Programmation Orientée Objet)

## 📦 Installation

1. Clonez ce dépôt :
```bash
git clone [URL_DU_DEPOT]
```

2. Ouvrez le fichier `index.html` dans votre navigateur

Aucune dépendance externe n'est requise !

## 🎓 Contexte d'apprentissage

Ce projet fait partie du parcours **Foundations** de [The Odin Project](https://www.theodinproject.com/), une plateforme d'apprentissage open-source pour le développement web.

### Compétences développées
- Manipulation du DOM
- Gestion des événements JavaScript
- Architecture orientée objet
- Logique de calcul et validation
- Gestion des états d'application

## 🐛 Gestion des erreurs

L'application gère intelligemment plusieurs cas d'erreur :
- Division par zéro → Affiche `NAN`
- Appui prématuré sur `=` → Affiche `NAN`
- Entrées invalides → Filtrées automatiquement

## 📝 Licence

Ce projet est libre d'utilisation à des fins éducatives.

## 🤝 Contribution

Les suggestions et améliorations sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

---

*Projet réalisé avec 💻 dans le cadre de The Odin Project*
