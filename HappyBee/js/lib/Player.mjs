import {RandomPosition} from './RandomPosition.mjs';

//Object player 
let Player = function(playerName, size) {

    //player properties
    this.x=0;
    this.y=0;
    this.name=playerName;
    this.score = 100;
    this.weapon = "";
    this.damagePower=10;
    this.fightingOption = "attack";
    this.turn=false;

    //initialize player panel display
    $("#" + this.name +"-weapon").removeClass();
    $('#' + this.name +'-damagePower').html(this.damagePower);
    $('#' + this.name +'-score').html(this.score);
    $('#' + this.name +'-visualScore').css("width", this.score + "%")
        .attr("aria-valuenow", this.score);
    };

export {Player};