// What I expect to go over:
// - code coverage, why is it good?
// - code coverage, why is it bad?
// - testing code which give you different answers each time
// - mocking out web request/DB calls
// - diving into Mocha, the testing suite we use
// - Mocha and asyncrohous code (it's easy with async/await)
// - assert/expect from chai, some examples and and tips


// starting point
it('it gets a color', function () {
  getColor();
});

// 100 %
it('it gets another color', function () {
  getOtherColor();
});

// From 100% to 100%
// the above test only test if the function is bug free, not if they are correct
// Order is important, i.e. first is test value, 2nd is epxected value
  it('it gets a color', function () {
    const color = getColor();
    assert.equal(color, 'red');
  });
  it('it gets another color', function () {
    const color = getOtherColor();
    assert.equal(color, 'green');
  });

// Show an example of someone changing the color

// describe mocha lay out:
// looks for files with it functions in name
// async code, callbacks pass done - but we don't use those
// return a promise, will wait for promise to be resolved.  can be easily done with async/await (shown next)
// describe is for grouping tests together
// it is a test case
// describe typhon routes
// -- describe evaluation routes
// -- describe entity routes


// Lets now move on to requests
// You dare mock me!
describe('Requests', function () {
  it('it gets a url', function () {
    // Use fake values
    const url = getUrl('/myUrl');
    console.log(url);
  });
});

// show the URL changes evertime.  we can't test this easily. we can't test certain valuesbecuase they are always changing.  we need to lock in the time
// sinon gives us a good thing to mock

// Fake timer
describe('Requests', function () {
  it('it gets a url', function () {
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


// At the moment we are still only tesing the code is bug free.  not that the return value is correct
// could we just use: assert.equal(url, 'https://gateway.marvel.com/myUrl?ts=0&apikey=Hello&hash=861f98ed61273bf9cd17950d739e12e4');
// you could and to be honest I would probably approve this test
// but what is this function actually doing:
// prepending https://gateway.marvel.com to the endpoint
// addpending endpoint to url
// adding get params
// so lets check the follow:
// includes the endpoint
// includes public ket
// DOES NOT include private key
// two urls with different timestamps aren't the same

// start with:
assert.include(url, 'NOT THIS');
// sometime mocha/chai have bad messages, not easy to see what's wrong.  In all chai calls you can include a meesage
assert.include(url, 'NOT THIS', `Url does not include endpoint (${endpoint})`);

// OK thats nicer, finish it up

describe('Requests', function () {
  it('it gets a url', function () {
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
// before, after, beforeEach and afterEach lets you do a number of things
// before, after sets up at very start/very end
// beforeEach, afterEach are before each test (its)
// https://samwize.com/2014/02/08/a-guide-to-mochas-describe-it-and-setup-hooks/
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
});


// testing requests
it('it gets the Marvel characters', async function () {
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
it('it gets the Marvel characters', async function () {
  const getStub = sinon.stub(axios, 'get').resolves(mavelCharacterResponse);
  const mavelCharacters = await getCharacters();
  assert.typeOf(mavelCharacters, 'array');
  assert(mavelCharacters.length === 1);
  assert.equal(mavelCharacters.length, 1);
  assert.equal(mavelCharacters[0].name, 'Aginar');
  getStub.restore();
});

// this is asynchronous code
// by using async keyword, node automatically returns new promise  so about, is the same as this:

it('it gets the Marvel characters PROMISE', function () {
  const getStub = sinon.stub(axios, 'get').resolves(mavelCharacterResponse);
  return getCharacters().then((mavelCharacters) => {
    assert.typeOf(mavelCharacters, 'array');
    assert(mavelCharacters.length === 1);
    assert.equal(mavelCharacters.length, 1);
    assert.equal(mavelCharacters[0].name, 'Aginar');
    getStub.restore();
  });
});

// break the code, to show still a true test
// also noticed how the other code broke?

// if we don't return a promise?
// highlight the reject
// highlight the test "PASSES"
// add the promise back in
it('it gets the Marvel characters', function () {
  const getStub = sinon.stub(axios, 'get').rejects(mavelCharacterResponse);
  const mavelCharacters = getCharacters();
  getStub.restore();
});

// NOT quite 100%
it('it throws an error on non 200 code', async function () {
  const getStub = sinon.stub(axios, 'get').resolves(mavelCharacterResponseNon200);
  await getCharacters()
  getStub.restore();
});
// test for error
await expect(getCharacters()).to.be.rejectedWith(Error);

// test for specific error
await expect(getCharacters()).to.be.rejectedWith(Error, 'Unknown code returned: 300');

// final note, break shit
// don't affect other tests
// move getStub to top
// move tests into new describe
// add in after each which restores
afterEach(function () {
  if (getStub && getStub.restore) {
    getStub.restore();
  }
});
