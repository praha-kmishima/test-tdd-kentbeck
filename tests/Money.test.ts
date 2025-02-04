import { describe, it, expect } from 'vitest'
import { Money } from '../src/Money'

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
})
