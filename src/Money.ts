export abstract class Money {
  protected amount: number;
  protected _currency: string;

  constructor(amount: number, currency: string) {
    this.amount = amount;
    this._currency = currency;
  }

  static dollar(amount: number): Money {
    return new Dollar(amount);
  }

  static franc(amount: number): Money {
    return new Franc(amount);
  }

  abstract times(multiplier: number): Money;

  currency(): string {
    return this._currency;
  }

  equals(other: any): boolean {
    if (!(other instanceof Money)) return false;
    return this.amount === other.amount 
      && this.constructor.name === other.constructor.name;
  }
}

export class Dollar extends Money {
  constructor(amount: number) {
    super(amount, "USD");
  }

  times(multiplier: number): Money {
    return new Dollar(this.amount * multiplier);
  }

  getAmount(): number {
    return this.amount;
  }
}

export class Franc extends Money {
  constructor(amount: number) {
    super(amount, "CHF");
  }

  times(multiplier: number): Money {
    return new Franc(this.amount * multiplier);
  }

  getAmount(): number {
    return this.amount;
  }
}
