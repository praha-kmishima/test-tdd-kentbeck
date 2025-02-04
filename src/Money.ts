export interface Expression {
  reduce(bank: Bank, to: string): Money;
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

  plus(addend: Money): Expression {
    return new Sum(this, addend);
  }

  reduce(bank: Bank, to: string): Money {
    return this;
  }

  getAmount(): number {
    return this.amount;
  }
}

export class Bank {
  reduce(source: Expression, to: string): Money {
    return source.reduce(this, to);
  }
}

export class Sum implements Expression {
  augend: Money;
  addend: Money;

  constructor(augend: Money, addend: Money) {
    this.augend = augend;
    this.addend = addend;
  }

  reduce(bank: Bank, to: string): Money {
    const amount = this.augend.getAmount() + this.addend.getAmount();
    return new Money(amount, to);
  }
}
