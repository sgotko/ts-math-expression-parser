import { isNull, isNumericChar } from './utils.js';

/*
 expression   ::= term (('+' | '-') term)* ;
 term         ::= factor (('*' | '/') factor)* ;
 factor       ::= number | '(' expression ')' ;
 number       ::= digit+ ;
 digit        ::= '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' ;
 */

interface IExpression {
  eval(): number;
}

class NumberExpression implements IExpression {
  constructor(private value: number) {}

  eval(): number {
    return this.value;
  }
}

class BinaryExpression implements IExpression {
  constructor(
    private left: IExpression,
    private operation: string,
    private right: IExpression
  ) {}

  eval(): number {
    const leftValue = this.left.eval();
    const rightValue = this.right.eval();

    debugger;
    switch (this.operation) {
      case '+':
        return leftValue + rightValue;
      case '-':
        return leftValue - rightValue;
      case '*':
        return leftValue * rightValue;
      case '/':
        return leftValue / rightValue;
      default:
        throw new Error(`Unknown binary operation: ${this.operation}`);
    }
  }
}

export class Parser {
  private currentToken: string | null = null;
  private input: string | null = null;
  private inputTokens: string[] = [];
  private inputIndex = 0;

  private consume(token: string, silent: boolean = false): boolean {
    if (this.currentToken === token || silent) {
      this.inputIndex++;
      this.currentToken = this.inputTokens[this.inputIndex];
      return true;
    }
    return false;
  }

  private factor(): IExpression {
    if (this.currentToken === null) {
      throw new Error('Unexpected end of input');
    }

    if (isNumericChar(this.currentToken)) {
      return this.number();
    } else if (this.currentToken[0] === '(') {
      this.consume('(', true);
      const expression = this.expression();
      this.consume(')', true);
      return expression;
    }

    throw new Error(`Unknown token: ${this.currentToken}`);
  }

  private number(): IExpression {
    const numbers: string[] = [];
    while (!isNull(this.currentToken) && isNumericChar(this.currentToken)) {
      numbers.push(this.currentToken);
      this.consume(this.currentToken);
    }
    return new NumberExpression(Number(numbers.join('')));
  }

  private term(): IExpression {
    let expression = this.factor();

    while (this.currentToken === '*' || this.currentToken === '/') {
      const operator = this.currentToken;
      this.consume(operator);
      expression = new BinaryExpression(expression, operator, this.factor());
    }

    return expression;
  }

  private expression(): IExpression {
    let expression = this.term();

    while (this.currentToken === '+' || this.currentToken === '-') {
      const operator = this.currentToken;
      this.consume(operator);
      const right = this.term();
      expression = new BinaryExpression(expression, operator, right);
    }

    return expression;
  }

  public parse(input: string): IExpression {
    this.input = input;
    this.inputTokens = this.input.replace(/\s+/g, '').split('');
    this.inputIndex = 0;
    this.currentToken = this.inputTokens.length > 0 ? this.inputTokens[0] : null;
    return this.expression();
  }
}
