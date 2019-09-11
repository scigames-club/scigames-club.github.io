import {RandomPosition} from './RandomPosition.mjs';

let GameMap = function(playerOne, playerTwo) {

  //default size of the game map is 10
  this.size= 10;


  this.obstaclesNumber= 15;
  this.weaponsNumber= 4;

  //access to the dom to display the game map
  var domGameMap = $('#gameMap');
  //clear game map
  domGameMap.html("");


  //fill the game map and set box type to default(available)
  for (var y = 0; y < this.size; y++) {
    var row = $('<div>').addClass('boxesRow');
    for (var x = 0; x < this.size; x++) {
      var box = $('<div>').addClass('box available');
      box.attr('id', "box-" +  x + y);
      row.append(box);
    }
    domGameMap.append(row);
  }

  //add the obstacles
  for (var x = 0; x < this.obstaclesNumber; x++) {
    var randomPosition = new RandomPosition(this.size);
    $('#box-'+randomPosition.x+randomPosition.y).removeClass();
    $('#box-'+randomPosition.x+randomPosition.y).addClass('box unavailable');
  }

  //add weapons
  this.weapons = ['weapon mushroom', 'weapon sword', 'weapon bomb', 'weapon lightning'];

  for (var x = 0; x < this.weaponsNumber; x++) {

    var randomPosition = new RandomPosition(this.size);

    //find random available boxes
    while($('#box-'+randomPosition.x+randomPosition.y).hasClass('unavailable')){
      randomPosition = new RandomPosition(this.size);
    }

    //clear box class as available
    $('#box-'+randomPosition.x+randomPosition.y).removeClass();
    //place a weapon
    $('#box-'+randomPosition.x+randomPosition.y).addClass('box '+ this.weapons[x]);

  }

  //find an available random box
  var randomPosition = new RandomPosition(this.size);
  while(!$('#box-'+randomPosition.x+randomPosition.y).hasClass('available')){
    randomPosition = new RandomPosition(this.size);
  }

  //place player 1
  playerOne.x = randomPosition.x;
  playerOne.y = randomPosition.y;

  //find an available random box, where the player do not touch
  randomPosition = new RandomPosition(this.size);
  playerTwo.x = randomPosition.x;
  playerTwo.y = randomPosition.y;

  //avoid that players touch in the initial position
  while(checkPlayersTouch(playerOne, playerTwo) ||
         !$('#box-'+playerTwo.x+playerTwo.y).hasClass('available')){
    randomPosition = new RandomPosition(this.size);
    playerTwo.x = randomPosition.x;
    playerTwo.y = randomPosition.y;
  }

  $('#box-'+playerOne.x+playerOne.y).removeClass();//remove available class
  $('#box-'+playerOne.x+playerOne.y).addClass('box '+ playerOne.name );//place player 1

  $('#box-'+playerTwo.x+playerTwo.y).removeClass();//remove available class
  $('#box-'+playerTwo.x+playerTwo.y).addClass('box '+ playerTwo.name );//place player 2

}

//check if the players are in the same box, or touch horizontally or vertically 
let checkPlayersTouch = function(player, nextPlayer) {

  if( player.x === nextPlayer.x && player.y === nextPlayer.y ){
    return true;
  }

  if( player.x === nextPlayer.x && player.y+1 === nextPlayer.y ){
    return true;
  }
  if( player.x === nextPlayer.x && player.y-1 === nextPlayer.y ){
    return true;
  }
  if( player.x+1 === nextPlayer.x && player.y === nextPlayer.y ){
    return true;
  }
  if( player.x-1 === nextPlayer.x && player.y === nextPlayer.y ){
    return true;
  }

  return false;
}


export {GameMap};