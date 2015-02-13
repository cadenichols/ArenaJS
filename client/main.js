/* global _ */
/* global Weapon */
/* global Fighter */

'use strict';

$(document).ready(init);

function init() {
  $('#play').click(playTheme);
  $('#stop').click(stopTheme);
  createWeapons();
  createFighters();
  paintFighters();
  paintWeapons();
  chooseFighter();
  $('#weapons').on('click', '.weapon:not(".taken")', clickWeapon);
  $('#fight').click(clickFight);

}

var weapons = [];
var fighters = [];
var equipped = [];
var deadFighters = [];

function clickFight() {
  $('#fighters').children().removeClass('fighting');
  if (equipped.length >= 2) {
    var p1 = _.sample(equipped);
    var p2;
    while (true) {
      p2 = _.sample(equipped);
      if (p2.name !== p1.name) {
        break;
      }
    }
    $('#fighters').find('.' + p1.name).parent().parent().addClass('fighting');
    $('#fighters').find('.' + p2.name).parent().parent().addClass('fighting');

    p1.hit(p2);
    if (p2.health > 0) {
      p2.hit(p1);
    }

    updateFighter(p1);
    updateFighter(p2);

  }
  if (equipped.length === 1) {
    $('#fighters').children().removeClass('fighting');
  }
}

function updateFighter(fighter) {
  if (fighter.health <= 0) {
    fighter.health = 0;
    deadFighters.push(_.remove(equipped, function(f) {return f.name === fighter.name;})[0]);
    $('#fighters').find('.' + fighter.name).parent().parent().addClass('dead');
  }
  $('#fighters').find('.' + fighter.name).next().text('h: ' + fighter.health);
}

function clickWeapon() {
  var weaponName = $(this).text().split('d:')[0];
  var weapon = _.find(weapons, function(w) {
    return w.name === weaponName;
  });
  var $fighter = $('.choose');
  var fighterName = $fighter.find('.name').text();
  var fighter = _.find(fighters, function(f) {
    return f.name === fighterName;
  });
  fighter.weapon = weapon;
  addWeaponToFighter($fighter, weapon);
  equipped.push(_.remove(fighters, function(f) {return f.name === fighter.name;})[0]);
  $(this).addClass('taken');
  $fighter.removeClass('choose');

  if (fighters.length) {
    chooseFighter();
  }

}

function chooseFighter() {
  var fighter = _.sample(fighters);
  var $fighter = $('.fighter:contains("' + fighter.name + '")');
  $fighter.addClass('choose');
}

function playTheme() {
  $('audio').attr('src', '/audio/theme.mp3');
  $('audio')[0].play();
}

function stopTheme() {
  $('audio')[0].stop();
}

function createWeapons() {
  var w1 = new Weapon('homerun bat', 'http://www.mariowiki.com/images/3/3d/SSBhomerunbat.jpg');
  var w2 = new Weapon('pineapple', 'http://i.babyfood101.com/m/i/pineapple.jpg');
  var w3 = new Weapon('nerf gun', 'http://i5.walmartimages.com/dfw/dce07b8c-b935/k2-_5030f95f-3733-40cc-8559-1337218b6761.v2.jpg');
  weapons.push(w1, w2, w3);
}

function createFighters() {
  var f1 = new Fighter('Macho_Man', 'http://blogs.ocweekly.com/heardmentality/macho-man-randy-savage.jpg');
  var f2 = new Fighter('JTT', 'https://shechive.files.wordpress.com/2011/09/jtt-pics-24.jpg');
  var f3 = new Fighter('llama', 'http://twistedrootburgerco.com/wp-content/uploads/Llama.jpg');
  fighters.push(f1, f2, f3);

}

function addWeaponToFighter($fighter, weapon) {
  $fighter.children().eq(1).append('<div>w: ' + weapon.name + '</div>');
}

function paintWeapons() {
  weapons.forEach(function(weapon) {
    var $outer = $('<div>');
    $outer.addClass('weapon');

    var $img = $('<div>');
    $img.css('background-image', 'url("' + weapon.image + '")');

    var $info = $('<div>');
    var $name = $('<div>');
    $name.text(weapon.name);

    var $damage = $('<div>');
    $damage.text('d: ' + weapon.damage);

    $outer.append($img, $info);
    $info.append($name, $damage);
    $('#weapons').append($outer);
  });
}

function paintFighters() {
  fighters.forEach(function(fighter) {
    var $outer = $('<div>');
    $outer.addClass('fighter');

    var $img = $('<div>');
    $img.css('background-image', 'url("' + fighter.image + '")');

    var $info = $('<div>');
    var $name = $('<div>');
    $name.addClass('name');
    $name.addClass(fighter.name);
    $name.text(fighter.name);

    var $armor = $('<div>');
    $armor.text('a: ' + fighter.armor);

    var $health = $('<div>');
    $health.text('h: ' + fighter.health);

    var $strength = $('<div>');
    $strength.text('s: ' + fighter.strength);

    $outer.append($img, $info);
    $info.append($name, $health, $armor, $strength);
    $('#fighters').append($outer);
  });
}
