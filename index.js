require('dotenv').config();

const {getColor, getOtherColor} = require('./logic');
const Marvel = require('./Marvel');

console.log(getColor(), getOtherColor());

const marvel = new Marvel();

marvel.getCharacters().then((characters) => {
  for (character of characters) {
    console.log(character.name, character.comics.available);
  }
}).catch((error) => {
  console.error('Could not get characters:', error.message);
});