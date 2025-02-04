import { describe, it, expect } from 'vitest'
import { Dollar } from '../src/Money'
import { Franc } from '../src/Money'

describe('Money', () => {
  it('multiplication', () => {
    const five = new Dollar(5)
    expect(five.times(2)).toEqual(new Dollar(10))
    expect(five.times(3)).toEqual(new Dollar(15))
  })

  it('equality', () => {
    expect(new Dollar(5).equals(new Dollar(5))).toBe(true)
    expect(new Dollar(5).equals(null)).toBe(false)
    expect(new Dollar(5).equals({})).toBe(false)
    expect(new Franc(5).equals(new Franc(5))).toBe(true)
    expect(new Franc(5).equals(new Dollar(5))).toBe(false)
  })

  it('franc multiplication', () => {
    const five = new Franc(5)
    expect(five.times(2)).toEqual(new Franc(10))
    expect(five.times(3)).toEqual(new Franc(15))
  })
})
