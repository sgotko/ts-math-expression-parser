interface IExpression {
  eval(): number;
}

class NumberNode implements IExpression {
  constructor(private value: number) {}

  eval(): number {
    return this.value;
  }
}

class BinaryOperationNode implements IExpression {
  constructor(
    private left: IExpression,
    private operator: string,
    private right: IExpression
  ) {}

  eval(): number {
    const leftValue = this.left.eval();
    const rightValue = this.right.eval();

    switch (this.operator) {
      case '+':
        return leftValue + rightValue;
      case '-':
        return leftValue - rightValue;
      case '*':
        return leftValue * rightValue;
      case '/':
        return leftValue / rightValue;
      default:
        throw new Error(`Unknown operator: ${this.operator}`);
    }
  }
}

export class Parser {
  private currentToken: string | null = null;
  private input: string | null = null;
  private inputTokens: string[] = [];
  private inputIndex = 0;

  private eat(token: string, silent: boolean = false): boolean {
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

    if (this.isNumber(this.currentToken)) {
      return this.number();
    } else if (this.currentToken[0] === '(') {
      this.eat('(', true);
      const expression = this.expression();
      this.eat(')', true);
      return expression;
    }

    throw new Error(`Unknown token: ${this.currentToken}`);
  }

  private number(): IExpression {
    const numbers: string[] = [];
    while (this.isNumber(this.currentToken)) {
      numbers.push(this.currentToken);
      this.eat(this.currentToken);
    }
    return new NumberNode(Number(numbers.join('')));
  }

  private term(): IExpression {
    let expression = this.factor();

    while (this.currentToken === '*' || this.currentToken === '/') {
      const operator = this.currentToken;
      this.eat(operator);
      expression = new BinaryOperationNode(expression, operator, this.factor());
    }

    return expression;
  }

  private expression(): IExpression {
    let expression = this.term();

    while (this.currentToken === '+' || this.currentToken === '-') {
      const operator = this.currentToken;
      this.eat(operator);
      const right = this.term();
      expression = new BinaryOperationNode(expression, operator, right);
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

  private isNumber(token: string | null): boolean {
    if (token === null) {
      return false;
    }
    return !isNaN(Number(token));
  }
}
