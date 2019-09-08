import {Player} from './Player.mjs';
import {GameMap} from './GameMap.mjs';
import {HighlightPlayerRange} from './HighlightPlayerRange.mjs';
import {disableFight} from './HighlightPlayerRange.mjs'

let Game = function(){
    //Object player 1
    this.playerOne = new Player("playerOne",10);
    disableFight(this.playerOne);

    //Object player 2
    this.playerTwo = new Player("playerTwo",10);
    disableFight(this.playerTwo);

    //Object game map
    this.gameMap = new GameMap(this.playerOne, this.playerTwo);

    //Start by player 1
    this.playerOne.turn =true;

    //highlight player 1 possible moves
    HighlightPlayerRange(this.playerOne, this.playerTwo);
  }

  export {Game};