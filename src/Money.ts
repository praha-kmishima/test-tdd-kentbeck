export interface Expression {
  reduce(bank: Bank, to: string): Money;
  plus(addend: Expression): Expression;
}

export class Money implements Expression {
  protected amount: number;
  protected _currency: string;

  constructor(amount: number, currency: string) {
    this.amount = amount;
    this._currency = currency;
  }

  static dollar(amount: number): Money {
    return new Money(amount, "USD");
  }

  static franc(amount: number): Money {
    return new Money(amount, "CHF");
  }

  times(multiplier: number): Money {
    return new Money(this.amount * multiplier, this._currency);
  }

  currency(): string {
    return this._currency;
  }

  equals(other: any): boolean {
    if (!(other instanceof Money)) return false;
    return this.amount === other.amount 
      && this.currency() === other.currency();
  }

  plus(addend: Expression): Expression {
    return new Sum(this, addend);
  }

  reduce(bank: Bank, to: string): Money {
    const rate = bank.rate(this._currency, to);
    return new Money(this.amount / rate, to);
  }

  getAmount(): number {
    return this.amount;
  }
}

export class Bank {
  private rates: Map<string, number> = new Map();

  addRate(from: string, to: string, rate: number): void {
    this.rates.set(from + "->" + to, rate);
  }

  rate(from: string, to: string): number {
    if (from === to) return 1;
    const rate = this.rates.get(from + "->" + to);
    return rate ?? 1;
  }

  reduce(source: Expression, to: string): Money {
    return source.reduce(this, to);
  }
}

export class Sum implements Expression {
  augend: Expression;
  addend: Expression;

  constructor(augend: Expression, addend: Expression) {
    this.augend = augend;
    this.addend = addend;
  }

  reduce(bank: Bank, to: string): Money {
    const amount = this.augend.reduce(bank, to).getAmount() 
                + this.addend.reduce(bank, to).getAmount();
    return new Money(amount, to);
  }

  plus(addend: Expression): Expression {
    return new Sum(this, addend);
  }
}
