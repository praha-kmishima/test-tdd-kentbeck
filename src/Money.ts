export abstract class Money {
  protected amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  equals(other: any): boolean {
    if (!(other instanceof Money)) return false;
    return this.amount === other.amount;
  }
}

export class Dollar extends Money {
  times(multiplier: number): Dollar {
    return new Dollar(this.amount * multiplier);
  }

  getAmount(): number {
    return this.amount;
  }
}

export class Franc extends Money {
  times(multiplier: number): Franc {
    return new Franc(this.amount * multiplier);
  }

  getAmount(): number {
    return this.amount;
  }
}
