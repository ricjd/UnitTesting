const {getColor, getOtherColor} = require('../logic');
const { assert } = require('chai');

describe('Colors', () => {
  it('it gets a color', () => {
    const color = getColor();
    assert.equal(color, 'red');
  });
  it('it gets another color', () => {
    const color = getOtherColor();
    assert.equal(color, 'green');
  });
});
