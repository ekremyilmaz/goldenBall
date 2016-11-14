# goldenBall
Algorithme permettant de trouver la boule la plus lourde avec le moins d'itérations possibles

Installation :

1) cloner le projet 

2) npm install

3) bower install

4) grunt serve

Pour lancer les tests jasmine

5) grunt jasmine


Explication du component "weighingComponent"

cas d'utilisation :  <weighing number-ball="8"></weighing>

Il prend en paramètre "numberBall" qui correspond au nombre de boules qui sera affiché à l'utilisateur.
Par défaut, si l'attribut n'est pas renseigné, le nombre est égal à 8.

Le principe de l'algorithme est le suivant :

1) On regroupe les boules en 3 groupes dont au moins 2 ayant le même nombre de boules

2) On compare les 2 groupes identiques

    2.1) Si la balance est à l'équilibre, cela signifie que la boule est située dans le 3è groupe
    
        2.1.1) Dans ce cas, on refait l'étape 1 avec le 3è groupe
        
    2.2) Si la balance penche d'un côté
    
        2.2.1) On prend le groupe le plus lourd et on refait l'étape 1 avec ce groupe
        

 Ainsi de suite jusqu'à trouver la boule la plus lourde.
 


 Les tests ont donné les résultats suivants :

 Pour 1 boule : 0 itérations, car rien à faire
 Pour 2 boules : 1 itération
 Pour 3 boules : 1 itération
 Pour 8 boules : 2 iterations
 Pour 10 boules : au mieux 2, au max 3
 Pour 20 boules : 3
 Pour 200 boules : 5


