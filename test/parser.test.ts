import * as assert from 'chai';
import { Parser } from '../src/parser.ts';

const parser = new Parser();

describe('Expression parser test', () => {
  it('Parse number expression', () => {
    const expression = parser.parse('10');
    assert.Should().equal(10, expression.eval());
  });

  it('Parse add expression', () => {
    const expression = parser.parse('123 + 2000');
    assert.Should().equal(2123, expression.eval());
  });

  it('Parse sub expression', () => {
    const expression = parser.parse('123 - 2000');
    assert.Should().equal(-1877, expression.eval());
  });

  it('Parse mul expression', () => {
    const expression = parser.parse('123 * 2000');
    assert.Should().equal(246000, expression.eval());
  });

  it('Parse div expression', () => {
    const expression = parser.parse('2222/11');
    assert.Should().equal(202, expression.eval());
  });

  it('Parse expression with braces', () => {
    const expression = parser.parse('2 * (10 + 3)');
    assert.Should().equal(26, expression.eval());
  });
});
