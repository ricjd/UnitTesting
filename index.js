require('dotenv').config();

const {getColor, getOtherColor} = require('./logic');
const {getCharacters} = require('./requests');

console.log(getColor(), getOtherColor());

getCharacters().then((characters) => {
  for (character of characters) {
    console.log(character.name, character.comics.available);
  }
}).catch((error) => {
  console.error('Could not get characters:', error.message);
});