import { describe, it, expect } from 'vitest'
import { Money } from '../src/Money'
import { Expression } from '../src/Money'
import { Bank } from '../src/Money'
import { Sum } from '../src/Money'

describe('Money', () => {
  it('multiplication', () => {
    const five = Money.dollar(5)
    expect(five.times(2)).toEqual(Money.dollar(10))
    expect(five.times(3)).toEqual(Money.dollar(15))
  })

  it('equality', () => {
    expect(Money.dollar(5).equals(Money.dollar(5))).toBe(true)
    expect(Money.dollar(5).equals(null)).toBe(false)
    expect(Money.dollar(5).equals({})).toBe(false)
    expect(Money.franc(5).equals(Money.franc(5))).toBe(true)
    expect(Money.franc(5).equals(Money.dollar(5))).toBe(false)
  })

  it('franc multiplication', () => {
    const five = Money.franc(5)
    expect(five.times(2)).toEqual(Money.franc(10))
    expect(five.times(3)).toEqual(Money.franc(15))
  })

  it('currency', () => {
    expect(Money.dollar(1).currency()).toBe("USD")
    expect(Money.franc(1).currency()).toBe("CHF")
  })

  it('different class equality', () => {
    expect(Money.dollar(5).equals(Money.dollar(5))).toBe(true)
    expect(Money.franc(5).equals(Money.franc(5))).toBe(true)
    expect(Money.franc(10).equals(Money.franc(10))).toBe(true)
  })

  it('simple addition', () => {
    const five = Money.dollar(5)
    const result: Expression = five.plus(Money.dollar(5))
    const bank = new Bank()
    const reduced = bank.reduce(result, "USD")
    expect(reduced).toEqual(Money.dollar(10))
  })

  it('plus returns sum', () => {
    const five = Money.dollar(5)
    const result = five.plus(Money.dollar(5))
    const sum = result as Sum
    expect(sum.augend).toEqual(five)
    expect(sum.addend).toEqual(Money.dollar(5))
  })

  it('reduce sum', () => {
    const sum = new Sum(Money.dollar(3), Money.dollar(4))
    const bank = new Bank()
    const result = bank.reduce(sum, "USD")
    expect(result).toEqual(Money.dollar(7))
  })

  it('reduce money', () => {
    const bank = new Bank()
    const result = bank.reduce(Money.dollar(1), "USD")
    expect(result).toEqual(Money.dollar(1))
  })
})
