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

  times(multiplier: number): Money {
    return this._currency === "USD" 
      ? new Dollar(this.amount * multiplier)
      : new Franc(this.amount * multiplier);
  }

  currency(): string {
    return this._currency;
  }

  equals(other: any): boolean {
    if (!(other instanceof Money)) return false;
    return this.amount === other.amount 
      && this.currency() === other.currency();
  }
}

export class Dollar extends Money {
  constructor(amount: number) {
    super(amount, "USD");
  }
}

export class Franc extends Money {
  constructor(amount: number) {
    super(amount, "CHF");
  }
}
