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
  
});