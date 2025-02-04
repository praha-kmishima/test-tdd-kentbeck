export interface Expression {
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
    return new Money(this.amount + addend.amount, this._currency);
  }
}
