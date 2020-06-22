// From 100% to 100%
  it('it gets a color', () => {
    const color = getColor();
    assert.equal(color, 'red');
  });
  it('it gets another color', () => {
    const color = getOtherColor();
    assert.equal(color, 'green');
  });


// You dare mock me!
describe('Requests', () => {
  it('it gets a url', () => {
    // Use fake values
    const url = getUrl('/myUrl');
    console.log(url);
  });
});

// Fake timer
describe('Requests', () => {
  it('it gets a url', () => {
    // Use fake values
    var clock = sinon.useFakeTimers();
    const url = getUrl('/myUrl');
    console.log(url);
    clock.tick(100);
    const laterUrl = getUrl('/myUrl');
    console.log(laterUrl);
    clock.restore();
  });
});

// What to test
// don't just test the URL, describe what the URL should be made up of
describe('Requests', () => {
  it('it gets a url', () => {
    // Use fake values
    const endpoint = '/myUrl';
    var clock = sinon.useFakeTimers();
    const url = getUrl(endpoint);
    console.log(url);
    clock.tick(100);
    const laterUrl = getUrl(endpoint);
    console.log(laterUrl);
    clock.restore();
    // assert.equal(url, 'https://gateway.marvel.com/myUrl?ts=0&apikey=Hello&hash=861f98ed61273bf9cd17950d739e12e4');
    // endpoint
    // MARVEL_PUBLIC
    // !MARVEL_SECRET
    assert.include(url, 'NOT THIS', `Url does not include endpoint (${myUrl}`);
  });
});

// finish it up
describe('Requests', () => {
  it('it gets a url', () => {
    // Use fake values
    const endpoint = '/myUrl';
    var clock = sinon.useFakeTimers();
    const url = getUrl(endpoint);
    clock.tick(100);
    const laterUrl = getUrl(endpoint);
    clock.restore();
    // Make sure we include the end point and public key, also make sure we don't include private key.
    assert.include(url, endpoint, `Url does not include endpoint (${endpoint})`);
    assert.include(url, process.env.MARVEL_PUBLIC, `Url does not include public key (${process.env.MARVEL_PUBLIC})`);
    assert.notInclude(url, process.env.MARVEL_SECRET, `Url includes private key (${process.env.MARVEL_SECRET})`);

    // make URL changes over time due to including a timestamp and hash of timestamp, public key and private key
    assert.notEqual(url, laterUrl);
  });
});

// adding another test
// use before and after
const {getUrl, getCharacters} = require('../requests');
const { assert } = require('chai');
const sinon = require('sinon');
const axios = require('axios');

process.env.MARVEL_SECRET = 'Shh';
process.env.MARVEL_PUBLIC = 'Hello';

let fakeClock;

describe('Requests', () => {
  before(() => {
    fakeClock = sinon.useFakeTimers();
  });
  after(() => {
    fakeClock.restore();
  });
  it('it gets a url', () => {
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
});


// mock promise
it('it gets the Marvel characters', async () => {
  const getStub = sinon.stub(axios, 'get').resolves(mavelCharacterResponse);
  const mavelCharacters = await getCharacters();
  getStub.restore();
});
// REMOVE MOCK AND SHOW
// will have to include private key
// make actual requests, which could fail
// marvel could add new data which would break our tests

// talk about generic mocks like DB helpers

// testing return
// test array
// test length - not needed but good stepping stone
// test important data
it('it gets the Marvel characters', async () => {
  const getStub = sinon.stub(axios, 'get').resolves(mavelCharacterResponse);
  const mavelCharacters = await getCharacters();
  assert.typeOf(mavelCharacters, 'array');
  assert(mavelCharacters.length === 1);
  assert.equal(mavelCharacters.length, 1);
  assert.equal(mavelCharacters[0].name, 'Aginar');
  getStub.restore();
});

// NOT quite 100%
it('it throws an error on non 200 code', async () => {
  const getStub = sinon.stub(axios, 'get').resolves(mavelCharacterResponseNon200);
  await getCharacters()
  getStub.restore();
});
// test for errors
it('it throws an error on non 200 code', async () => {
  const getStub = sinon.stub(axios, 'get').resolves(mavelCharacterResponseNon200);
  await expect(getCharacters()).to.be.rejectedWith(Error, 'Unknown code returned: 300')
  getStub.restore();
});
//  ALSO show the imports


