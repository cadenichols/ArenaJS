/* global _ */
/* exported Fighter */

'use strict';

function Fighter(name, image) {
  this.name = name;
  this.image = image;
  this.strength = _.random(1, 20);
  this.health = 100;
  this.armor = _.random(0, 5);
}

Fighter.prototype.hit = function(defender) {
  var hitTypes = [0, 0.25, 0.5, 0.75, 1];
  var hitPercent = _.sample(hitTypes);
  var attack = (this.strength + this.weapon.damage) * hitPercent;
  var defense = defender.armor;
  var total = attack - defense < 0 ? 0 : attack - defense;
  defender.health -= total;
  console.log(this.name + ' did ' + total + ' damage');

};
