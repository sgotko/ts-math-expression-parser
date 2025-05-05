import * as assert from 'chai';
import { Parser } from '../src/parser.ts';

const parser = new Parser();

describe('Expression parser test', () => {
  it('Parse number expression', () => {
    const expression = parser.parse('10');
    assert.Should().equal(expression.eval(), 10);
  });

  it('Parse add expression', () => {
    const expression = parser.parse('123 + 2000');
    assert.Should().equal(expression.eval(), 2123);
  });

  it('Parse sub expression', () => {
    const expression = parser.parse('123 - 2000');
    assert.Should().equal(expression.eval(), -1877);
  });

  it('Parse mul expression', () => {
    const expression = parser.parse('123 * 2000');
    assert.Should().equal(expression.eval(), 246000);
  });

  it('Parse complex mul expression', () => {
    const expression = parser.parse('2 * 4 + 10 * 2');
    assert.Should().equal(expression.eval(), 36);
  });

  it('Parse div expression', () => {
    const expression = parser.parse('2222/11');
    assert.Should().equal(expression.eval(), 202);
  });

  it('Parse expression with braces', () => {
    const expression = parser.parse('2 * (10 + 3)');
    assert.Should().equal(expression.eval(), 26);
  });

  it('Parse complex expression with braces', () => {
    const expression = parser.parse('(3 * (200 / 2)) - 5 * (4 / 2)');
    assert.Should().equal(expression.eval(), 590);
  })

  it('Parse simple exponent expression', () => {
    const expression = parser.parse('2 ^ 2');
    assert.Should().equal(expression.eval(), 4);
  });

  it('Parse complex exponent expression', () => {
    const expression = parser.parse('2 ^ 2 + 10 * 2');
    assert.Should().equal(expression.eval(), 28);
  });
});
