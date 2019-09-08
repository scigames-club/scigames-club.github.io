import {Game} from './lib/Game.mjs'
import {disableFight, enableFight} from './lib/HighlightPlayerRange.mjs'
import {fight} from './lib/Fight.mjs'

$(document).ready(function() {

  //make new instance of the Game object *************
  let startGame = new Game();

  //button new game **********************************
  $( "#new-game" ).click(function() {
    //make new instance of the Game object
    startGame = new Game();
  });

  // player 1 fighting panel *************************
  //button attack for player 1
  $( "#playerOne-attack" ).click(function() {
    fight(startGame.playerOne, startGame.playerTwo);
  });

  //button defend for player 1
  $( "#playerOne-defend" ).click(function() {
    startGame.playerOne.fightingOption="defend";
    disableFight(startGame.playerOne);
    enableFight(startGame.playerTwo);
  });

  // player2 fighting panel ***************************
  //button attack for player 2
  $( "#playerTwo-attack" ).click(function() {
    fight(startGame.playerTwo, startGame.playerOne);
  });

  //button defend for player 2
  $( "#playerTwo-defend" ).click(function() {
    startGame.playerTwo.fightingOption="defend";
    disableFight(startGame.playerTwo);
    enableFight(startGame.playerOne);
  });

});