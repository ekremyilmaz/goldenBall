angular.module('weighingApp')
.component('weighing', {
  bindings: {
    numberBall: '@'
  },
  controller : function weighingController ($route) {

    //nombre d'itération pour trouver la boule la plus lourde
    this.iterationNumber = 0;

    //le poids commun de toutes les boules
    var commonWeight = 1;

    //le poids de la boule la plus lourde
    var specialWeight = 2;


    this.$onInit = function() {
      //Si le nombre de boule n'est pas défini, on l'initialise à 8
      if (_.isUndefined(this.numberBall)){
        this.numberBall = 8;
      }

      //On construit les boules en initialisant son identifiant (id) et le poids
      this.balls = [];
      for (var i=1; i<=this.numberBall; i++) {
        this.balls.push({weight:commonWeight, id:i});
      }
    };

    //Au clic sur le bouton Executer pour trouver la boule la plus lourde
    //avec le nombre d'itération
    this.findHeaviestBall = function() {

      this.iterationNumber = 0;

      //On regroupe les boules en 3 groupes à taille "quasi" identique
      var lists = groupBall(this.balls);

      //Lancement de l'algorithme qui retourne la boule la plus lourde
      this.ballFindByAlgo = this.compareAllBalls(lists)[0];

    }

    //Fonction qui permet de regrouper les boules en 3 groupes
    function groupBall(pListe) {

      var n = 3;

      var nbBallByGroup = pListe.length/n;

      var lists = _.groupBy(pListe, function(element, index){
        return Math.floor(index/nbBallByGroup);
      });
      lists = _.toArray(lists);

      return lists;

    }

    //On pèse les boules en calculant le poids de chaque balance
    function compareBall(balanceLeft, balanceRight) {

      var sumBalanceLeft = _.reduce(balanceLeft, function(memo, ball){ return memo + ball.weight; }, 0);
      var sumBalanceRight = _.reduce(balanceRight, function(memo, ball){ return memo + ball.weight; }, 0);

      //Si la balance est à l'équilibre, on retourne "vide" pour signifier que la boule la plus lourde ne
      //se trouve dans aucun des 2 groupes
      if (sumBalanceLeft === sumBalanceRight) {
        return [];
      } else if (sumBalanceRight > sumBalanceLeft) {
        //Sinon si la balance droite est plus lourde que celle de gauche, on retourne le groupe de boules la plus lourde
        return balanceRight;
      }

      //Sinon on retourne la balance gauche
      return balanceLeft;

    }

    //On compare toutes les boules
    this.compareAllBalls = function(groupOfBalls) {

      //cas où on teste une boule
      //Il n'y a rien à faire, on retourne la boule
      //et correspond au test de fin de la fonction récursive
      if (groupOfBalls.length === 1) {
        return groupOfBalls[0];
      }

      //On incrémente le nombre d'itération
      this.iterationNumber = this.iterationNumber+1;

      //cas où on teste 2 boules
      //on compare les 2 boules
      if (groupOfBalls.length === 2 ) {
        return compareBall(groupOfBalls[0], groupOfBalls[1]);
      }


      //L'idée est d'avoir 3 groupes de boules avec au moins 2 groupes identiques.
      //ex : 3/3/4 pour 10 boules
      //ex : 2/2/3 pour 7 boules
      //ex : 4/4/4 pour 12 boules
      //et ne pas avoir 4/3/3 pour 10 boules.
      //Il faut toujours comparer 2 groupes identiques pour ne pas fausser le poids de la boule lourde
      var balanceLeft;
      var balanceRight;
      var outOfBalance;

      //Si les 2 groupes ont le même nombre de boules,
      //dans ce cas, on peut prendre l'ordre prédéfini
      if (groupOfBalls[0].length === groupOfBalls[1].length) {
          balanceLeft = groupOfBalls[0];
          balanceRight = groupOfBalls[1];
          outOfBalance = groupOfBalls[2];
      } else {
        //Sinon cela veut dire que le groupe 0 est le groupe qui contient le plus de boule et les deux autres identiques
        //Dans ce cas, on compare les deux groupes identiques (1 et 2)
        balanceLeft = groupOfBalls[1];
        balanceRight = groupOfBalls[2];
        outOfBalance = groupOfBalls[0];

      }

      return this.compareMoreThan3Balls(balanceLeft, balanceRight, outOfBalance);

    }

    this.compareMoreThan3Balls = function(balanceLeft, balanceRight, outOfBalance) {

      //On teste les deux premiers groupes de boules
      var groupeOfBalls = compareBall(balanceLeft, balanceRight);

      //Si le poids est identique entre les deux poids, la boule la plus lourde
      //est situé dans l'autre groupe (outOfBalance)
      //Sinon on récupère le groupe le plus lourde et on la regroupe en 3 sous groupes etc....
      if (!_.isUndefined(groupeOfBalls) && !_.isNull(groupeOfBalls) && !_.isEmpty(groupeOfBalls)) {
          groupeOfBalls = groupBall(groupeOfBalls);
          return this.compareAllBalls(groupeOfBalls);
      } else {
        //On regroupe les boules entre 3 groupes
        groupeOfBalls = groupBall(outOfBalance);
        return this.compareAllBalls(groupeOfBalls);
      }
    }

    //Sélectionner la boule la plus lourde
    this.selectHeaviestBall = function(ball) {
      ball.weight = specialWeight;
      //On déselectionne l'élément précédent si l'utilisateur avait choisi une autre boule
      if (!_.isUndefined(this.heaviestBall)) {
        this.heaviestBall.weight = commonWeight;
      }
      this.heaviestBall = ball;
    }

    //Réinitialise le jeu
    this.reset = function() {
      $route.reload();
    }

  },
  templateUrl : 'views/weighingComponent.html'
});
