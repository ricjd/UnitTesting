const axios = require('axios');
const crypto = require('crypto');


module.exports = class Marvel {
  getUrl (endpoint) {
    const timestamp = new Date().getTime();
    const hash = crypto.createHash('md5').update(`${timestamp}${process.env.MARVEL_SECRET}${process.env.MARVEL_PUBLIC}`).digest("hex");
    return `https://gateway.marvel.com${endpoint}?ts=${timestamp}&apikey=${process.env.MARVEL_PUBLIC}&hash=${hash}`;
  }
  getCharacters = async () => {
    const url = this.getUrl('/v1/public/characters');
    const response = await axios.get(url);
    if (response.data.code === 200) {
      return response.data.data.results;
    } else {
      throw Error(`Unknown code returned: ${response.data.code}`);
    }
  }
}