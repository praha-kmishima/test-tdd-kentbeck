export class Dollar {
  private amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  times(multiplier: number): Dollar {
    return new Dollar(this.amount * multiplier);
  }

  getAmount(): number {
    return this.amount;
  }

  equals(other: any): boolean {
    if (!(other instanceof Dollar)) return false;
    return this.amount === other.amount;
  }
}
