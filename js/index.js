"use strict";
const input = document.getElementById("diceNum");
const player = document.querySelector('#player');
let face = {
    min : 1,
    max : 6,
}

// the dice div
function createDice(num) {
  const dice = document.querySelector("#diceTempl > .dice").cloneNode(true);
  
  dice.value = num;
  dice.setAttribute("num", rollDice(face.min, face.max, [num]));
  setTimeout(() => dice.setAttribute("num", num), 0);
  document.querySelector('#player').appendChild(dice);
  return dice;
}

function update(enteredNumber)
{

if (enteredNumber === undefined)
    enteredNumber = input.value;

  input.value = enteredNumber;
  if (player.children.length > enteredNumber)
  {
    while(player.children.length > enteredNumber)
      player.removeChild(player.lastChild);

  }
  const dices = []
  for (let i = 0, oldDice, dice, skip; i < enteredNumber; i++)
  {
    dice = (oldDice = player.children[i]) || createDice(rollDice(face.min, face.max));
    skip = [~~dice.getAttribute("num")]; //set to undefined to allow repeat number on the same dice
    if (oldDice)
      dice.setAttribute("num", dice.value = rollDice(face.min, face.max, skip));

    dices[dices.length] = dice;
  };
  console.clear();
  console.log("numbers:", dices.map(d => d.value).toString());
}
update(rollDice(1, 5));

// function rollDice
function rollDice(min, max, skip) {
  let n;
  do
    n = Math.round(Math.random() * (max - min) + min);
  while(skip !== undefined && skip.indexOf(n) != -1);
  return n;
}