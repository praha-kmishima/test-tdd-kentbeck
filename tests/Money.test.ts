import { describe, it, expect } from 'vitest'
import { Dollar } from '../src/Money'

describe('Money', () => {
  it('multiplication', () => {
    const five = new Dollar(5)
    let product = five.times(2)
    expect(product.getAmount()).toBe(10)
    product = five.times(3)
    expect(product.getAmount()).toBe(15)
  })

  it('equality', () => {
    expect(new Dollar(5).equals(new Dollar(5))).toBe(true)
    expect(new Dollar(5).equals(null)).toBe(false)
    expect(new Dollar(5).equals({})).toBe(false)
  })
})
