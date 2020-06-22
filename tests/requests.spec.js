const {getUrl, getCharacters} = require('../requests');
const chai = require('chai')
const {expect, assert} = chai;
chai.use(require('chai-as-promised'))
const sinon = require('sinon');
const axios = require('axios');
const {mavelCharacterResponse, mavelCharacterResponseNon200} = require('./marvelData');

process.env.MARVEL_SECRET = 'Shh';
process.env.MARVEL_PUBLIC = 'Hello';

let fakeClock;
let getStub;

describe('Requests', function () {
  before(function () {
    fakeClock = sinon.useFakeTimers();
  });
  after(function () {
    fakeClock.restore();
  });
  it('it gets a url', function () {
    // Use fake values
    const endpoint = '/myUrl';
    const url = getUrl(endpoint);
    fakeClock.tick(100);
    const laterUrl = getUrl(endpoint);
    
    // Make sure we include the end point and public key, also make sure we don't include private key.
    assert.include(url, endpoint, `Url does not include endpoint (${endpoint})`);
    assert.include(url, process.env.MARVEL_PUBLIC, `Url does not include public key (${process.env.MARVEL_PUBLIC})`);
    assert.notInclude(url, process.env.MARVEL_SECRET, `Url includes private key (${process.env.MARVEL_SECRET})`);

    // make URL changes over time due to including a timestamp and hash of timestamp, public key and private key
    assert.notEqual(url, laterUrl);
  });
  describe('Hit Marvels API', function () {
    afterEach(function () {
      if (getStub && getStub.restore) {
        getStub.restore();
      }
    });
    it('it gets the Marvel characters', async function () {
      getStub = sinon.stub(axios, 'get').resolves(mavelCharacterResponse);
      const mavelCharacters = await getCharacters();
      assert.typeOf(mavelCharacters, 'array');
      assert(mavelCharacters.length === 1);
      assert.equal(mavelCharacters.length, 1);
      assert.equal(mavelCharacters[0].name, 'Aginar');
    });
    it('it throws an error on non 200 code', async function () {
      getStub = sinon.stub(axios, 'get').resolves(mavelCharacterResponseNon200);
      await expect(getCharacters()).to.be.rejectedWith(Error, 'Unknown code returned: 300');
    });
  });

});
