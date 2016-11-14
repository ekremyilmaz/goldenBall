describe('component: weighing', function() {
  var $componentController;

  beforeEach(module('weighingApp'));
  beforeEach(inject(function(_$componentController_) {
    $componentController = _$componentController_;
  }));

  it('On verifie que le nombre de boule passe en parametre est bien initialise dans le composant', function() {
    var bindings = {numberBall: 200};
    var ctrl = $componentController('weighing', null, bindings);

    expect(ctrl.numberBall).toBeDefined();
    expect(ctrl.numberBall).toBe(200);
  });

  it('On verifie que si le nombre de boule n est pas passe en parametre, on initialise à 8', function() {
    var ctrl = $componentController('weighing', null, null);

    ctrl.$onInit();
    expect(ctrl.numberBall).toBeDefined();
    expect(ctrl.numberBall).toBe(8);
  });


  it('L algo retourne bien la boule selectionne comme la plus lourd', function() {
    var ctrl = $componentController('weighing', null,  null);
    ctrl.$onInit();
    ctrl.selectHeaviestBall(ctrl.balls[3]);
    ctrl.findHeaviestBall();
    expect(ctrl.ballFindByAlgo).toBe(ctrl.balls[3]);

  });

  it('Pour 8 boules, le nombre d iterations est 2', function() {
    var bindings = {numberBall: 8};
    var ctrl = $componentController('weighing', null, bindings);
    ctrl.$onInit();
    ctrl.selectHeaviestBall(ctrl.balls[1]);
    ctrl.findHeaviestBall();
    expect(ctrl.iterationNumber).toBe(2);


  });

  it('Pour 10 boules, le nombre d iterations est 3', function() {
    var bindings = {numberBall: 10};
    var ctrl = $componentController('weighing', null, bindings);
    ctrl.$onInit();
    ctrl.selectHeaviestBall(ctrl.balls[1]);
    ctrl.findHeaviestBall();
    expect(ctrl.iterationNumber).toBe(3);


  });


  it('Pour 10 boules, le nombre d iterations est 2 si la boule choisi n est pas dans le groupe de 4', function() {
    var bindings = {numberBall: 10};
    var ctrl = $componentController('weighing', null, bindings);
    ctrl.$onInit();
    ctrl.selectHeaviestBall(ctrl.balls[6]);
    ctrl.findHeaviestBall();
    expect(ctrl.iterationNumber).toBe(2);

  });

});
