let changePosition = function(player, x,  y, nextPlayer){
  //remove player from old box
  let box = $('#box-'+player.x+player.y);
  box.removeClass(player.name);
  //remove highlight
  removeHighlightPlayerRange(player);
  //check if the player crossed a weapon when moving
  checkWeapon(player, x,  y);
  //set plyer position to the new one
  player.x = x;
  player.y = y;
  //add player to the new position
  box = $('#box-'+player.x+player.y);
  box.addClass(player.name);

  //if the player touches the next player, fight begin
  if( checkCombatBegin(player, nextPlayer) )
  {
    startFight(player, nextPlayer);
    return;
  }

  //highlight the next player possible moves
  HighlightPlayerRange(nextPlayer,player);
}

let startFight = function(player, nextPlayer){
  $('#FightingModal').modal('show');
  setTimeout(function(){ 
    $('#FightingModal').modal('hide');
   }, 1500);

  enableFight(player);
  disableFight(nextPlayer);
}

//enable fighting buttons
let enableFight = function(player) {
  $("#"+player.name+"-attack").attr("disabled", false);	
  $("#"+player.name+"-defend").attr("disabled", false);	
  $("#"+player.name+"-attack").removeClass("disabled");	
  $("#"+player.name+"-defend").removeClass("disabled");	
}

//disable fighting buttons
let disableFight = function(player) {
  $("#"+player.name+"-attack").attr("disabled", true);	
  $("#"+player.name+"-defend").attr("disabled", true);	
  $("#"+player.name+"-attack").addClass("disabled");	
  $("#"+player.name+"-defend").addClass("disabled");	
}

//combat begins when players touch horizontally and vertically
let checkCombatBegin = function(player, nextPlayer) {
  
  if((player.x === nextPlayer.x)&&(player.y+1 === nextPlayer.y))
    return true;

  if((player.x === nextPlayer.x)&&(player.y-1 === nextPlayer.y))
    return true;

  if((player.x+1 === nextPlayer.x)&&(player.y === nextPlayer.y))
    return true;

  if((player.x-1 === nextPlayer.x)&&(player.y === nextPlayer.y))
    return true;

  return false;

}

//check if player when moving from old position to new one, crossed a weapon
let checkWeapon = function(player, x, y) {
  if((player.x < x) && (player.y === y)) {
    for (var i = player.x+1; i < x+1; i++) {
      getWeapon(player,i,player.y);
    }
  }

  if((player.x === x) && (player.y < y)) {
    for (var i = player.y+1; i < y+1; i++) {
      getWeapon(player,player.x,i);
    }
  }

  if((player.x === x) && (player.y > y)) {
    for (var i = player.y-1; i > y-1; i--) {
      getWeapon(player,player.x,i);
    }
  }
  
  if((player.x > x) && (player.y === y)) {
    for (var i = player.x-1; i > x-1; i--) {
      getWeapon(player,i,player.y);
    }
  }

}

//get the weapon and it damage power
let getWeapon = function(player,x,y){
  let box = $('#box-'+x+y);
  if(box.hasClass('weapon')){
    if(box.hasClass('lightning'))
    {
      player.weapon = "lightning";
      player.damagePower = 50;
      $('#' + player.name +'-damagePower').html(player.damagePower);
      $('#' + player.name +'-weapon').removeClass();
      $('#' + player.name +'-weapon').addClass('lightning');
      box.removeClass('weapon');
      box.removeClass('lightning');
    }
    if(box.hasClass('bomb'))
    {
      player.weapon = "bomb";
      player.damagePower = 40;
      $('#' + player.name +'-damagePower').html(player.damagePower);
      $('#' + player.name +'-weapon').removeClass();
      $('#' + player.name +'-weapon').addClass('bomb');
      box.removeClass('weapon');
      box.removeClass('bomb');
    }
    if(box.hasClass('sword'))
    {
      player.weapon = "sword";
      player.damagePower = 30;
      $('#' + player.name +'-damagePower').html(player.damagePower);
      $('#' + player.name +'-weapon').removeClass();
      $('#' + player.name +'-weapon').addClass('sword');
      box.removeClass('weapon');
      box.removeClass('sword');
    }
    if(box.hasClass('mushroom'))
    {
      player.weapon = "mushroom";
      player.damagePower = 20;
      $('#' + player.name +'-damagePower').html(player.damagePower);
      $('#' + player.name +'-weapon').removeClass();
      $('#' + player.name +'-weapon').addClass('mushroom');
      box.removeClass('weapon');
      box.removeClass('mushroom');
    }
  }
}

//remove highlight when player move
let removeHighlightPlayerRange = function (player) {
    for (var i = 0; i < 3; i++) {
      let box = $('#box-'+(player.x+i)+player.y);
      if(!box.hasClass('unavailable')) {
        box.removeClass('highlighted');
        box.off("click");
      }
      else
        break;
    }

    for (var i = 0; i < 3; i++) {
      var box = $('#box-'+(player.x-i)+player.y);
      if(!box.hasClass('unavailable')){
        box.removeClass('highlighted');
        box.off("click");
      }
      else
        break;
    }

    for (var i = 0; i < 3; i++) {
      var box = $('#box-'+player.x+(player.y+i));
      if(!box.hasClass('unavailable')){
        box.removeClass('highlighted');
        box.off("click");
      }
      else
        break;
    }

    for (var i = 0; i < 3; i++) {
      var box = $('#box-'+player.x+(player.y-i));
      if(!box.hasClass('unavailable')){
        box.removeClass('highlighted');
        box.off("click");
      }
      else
        break;
    }
  }

//highlight player possible moves
let HighlightPlayerRange = function (player,nextPlayer) {
  $('#' + player.name +'-turn').removeClass('hide');
  $('#' + nextPlayer.name +'-turn').addClass('hide');

  for (var i = 0; i < 3; i++) {
    let box = $('#box-'+(player.x+i)+player.y);
    if(!box.hasClass('unavailable') && !box.hasClass(nextPlayer.name)) {
      box.addClass('highlighted');
      let x= player.x+i;
      let y= player.y;
      box.click(function(){
          changePosition(player,x,y, nextPlayer)
          });
    }
    else
      break;
  }

  for (var i = 0; i < 3; i++) {
    var box = $('#box-'+(player.x-i)+player.y);
    if(!box.hasClass('unavailable') && !box.hasClass(nextPlayer.name)){
      box.addClass('highlighted');
      let x= player.x-i;
      let y= player.y;
      box.click(function(){
        changePosition(player,x,y, nextPlayer)
          });
    }
    else
      break;
  }

  for (var i = 0; i < 3; i++) {
    var box = $('#box-'+player.x+(player.y+i));
    if(!box.hasClass('unavailable') && !box.hasClass(nextPlayer.name)){
      box.addClass('highlighted');
      let x= player.x;
      let y= player.y+i;
      box.click(function(){
        changePosition(player,x,y, nextPlayer)
          });
    }
    else
      break;
  }

  for (var i = 0; i < 3; i++) {
    var box = $('#box-'+player.x+(player.y-i));
    if(!box.hasClass('unavailable') && !box.hasClass(nextPlayer.name)){
      box.addClass('highlighted');
      let x= player.x;
      let y= player.y-i;
      box.click(function(){
        changePosition(player,x,y, nextPlayer)
          });
    }
    else
      break;
  }
}

export {HighlightPlayerRange, enableFight, disableFight};