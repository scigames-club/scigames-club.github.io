//generate ramdon position
let RandomPosition = function(range) {
    this.x=genRandomNumber(range);
    this.y=genRandomNumber(range);
  }

// generate random number in a range
function genRandomNumber(range){
    if (range > 1)
        return Math.floor(Math.random() * Number(range))
    return 0;
}

export {RandomPosition};