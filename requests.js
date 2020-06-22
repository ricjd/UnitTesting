const axios = require('axios');
const crypto = require('crypto');

const getUrl = (endpoint) => {
  const timestamp = new Date().getTime();
  const hash = crypto.createHash('md5').update(`${timestamp}${process.env.MARVEL_SECRET}${process.env.MARVEL_PUBLIC}`).digest("hex");
  return `https://gateway.marvel.com${endpoint}?ts=${timestamp}&apikey=${process.env.MARVEL_PUBLIC}&hash=${hash}`;
}

const getCharacters = async () => {
  const url = getUrl('/v1/public/characters');
  const response = await axios.get(url);
  if (response.data.code === 200) {
    return response.data.data.results;
  } else {
    throw Error(`Unknown code returned: ${response.data.code}`);
  }
}

module.exports = {
  getUrl,
  getCharacters
}