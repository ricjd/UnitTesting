const {getColor, getOtherColor} = require('../logic');
const { assert } = require('chai');

describe('Colors', function () {
  it('it gets a color', function () {
    const color = getColor();
    assert.equal(color, 'red');
  });
  it('it gets another color', function () {
    const color = getOtherColor();
    assert.equal(color, 'green');
  });
});
