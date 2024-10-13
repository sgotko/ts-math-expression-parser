import * as assert from 'chai';
import { isNull, isNumber, isUndefined } from '../src/utils.ts';

describe('Utils tests', () => {
  it('isNull test', () => {
    assert.Should().equal(true, isNull(null));
    assert.Should().equal(false, isNull(undefined));
    assert.Should().equal(false, isNull({}));
  });

  it('isUndefined test', () => {
    assert.Should().equal(true, isUndefined(undefined));
    assert.Should().equal(false, isUndefined(null));
    assert.Should().equal(false, isUndefined({}));
  });

  it('isNumber test', () => {
    assert.Should().equal(true, isNumber(10));
    assert.Should().equal(false, isNumber('10'));
    assert.Should().equal(false, isNumber(null));
    assert.Should().equal(false, isNumber(undefined));
    assert.Should().equal(false, isNumber({}));
    assert.Should().equal(false, isNumber(NaN));
  });
});
