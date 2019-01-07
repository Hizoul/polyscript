import calc from 'isofw-node/src/calc'

it(`Verify calc`, () => {
    expect(calc(1, 3)).toBe(9)
    expect(calc(54231, 3)).toBe(4)
})