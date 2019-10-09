import { TwentyFourtyEight } from "./twentyFourtyEight"

describe('TwentyFourtyEight', () => {
  const subject = new TwentyFourtyEight()

  describe('row', () => {
    it('.shiftRight should move all visible blocks to the right', () => {
      const initial = [{ isVisible: true }, { isVisible: false }]
      const expected = [{ isVisible: false }, { isVisible: true }]
      expect(subject._shiftRight(initial)).toEqual(expected);
    })

    it('shiftLeft should move all visible blocks to the right', () => {
      const initial = [{ isVisible: false }, { isVisible: true }]
      const expected = [{ isVisible: true }, { isVisible: false }]
      expect(subject._shiftLeft(initial)).toEqual(expected);
    })

    it('should shiftBlocksLeft', () => {

      const initial = [
        [{ isVisible: false }, { isVisible: false }, { isVisible: false }, { isVisible: false }],
        [{ isVisible: true }, { isVisible: true }, { isVisible: false }, { isVisible: true }],
        [{ isVisible: true }, { isVisible: false }, { isVisible: true }, { isVisible: true }],
        [{ isVisible: false }, { isVisible: true }, { isVisible: false }, { isVisible: false }],
      ]
      const expected = [
        [{ isVisible: false }, { isVisible: false }, { isVisible: false }, { isVisible: false }],
        [{ isVisible: true }, { isVisible: true }, { isVisible: true }, { isVisible: false }],
        [{ isVisible: true }, { isVisible: true }, { isVisible: true }, { isVisible: false }],
        [{ isVisible: true }, { isVisible: false }, { isVisible: false }, { isVisible: false }],
      ]
      expect(subject.shiftBlocksLeft(initial)).toEqual(expected);
    })
    it('should shiftBlocksRight', () => {

      const initial = [
        [{ isVisible: false }, { isVisible: false }, { isVisible: false }, { isVisible: false }],
        [{ isVisible: true }, { isVisible: true }, { isVisible: false }, { isVisible: true }],
        [{ isVisible: true }, { isVisible: false }, { isVisible: true }, { isVisible: true }],
        [{ isVisible: false }, { isVisible: true }, { isVisible: false }, { isVisible: false }],
      ]
      const expected = [
        [{ isVisible: false }, { isVisible: false }, { isVisible: false }, { isVisible: false }],
        [{ isVisible: false }, { isVisible: true }, { isVisible: true }, { isVisible: true }],
        [{ isVisible: false }, { isVisible: true }, { isVisible: true }, { isVisible: true }],
        [{ isVisible: false }, { isVisible: false }, { isVisible: false }, { isVisible: true }],
      ]
      expect(subject.shiftBlocksRight(initial)).toEqual(expected);
    })
  })

  describe('columns', () => {
    it('.getColumn should return blocks in a perticular column from a 2D array', () => {
      const initial = [
        [{ isVisible: true }, { isVisible: false }, { isVisible: true }, { isVisible: true }],
        [{ isVisible: true }, { isVisible: false }, { isVisible: true }, { isVisible: true }],
        [{ isVisible: true }, { isVisible: false }, { isVisible: true }, { isVisible: true }],
        [{ isVisible: true }, { isVisible: false }, { isVisible: true }, { isVisible: true }],
      ]
      const expected = [
        { isVisible: false }, { isVisible: false }, { isVisible: false }, { isVisible: false }
      ]
      expect(subject._getColumn(initial, 1)).toEqual(expected)
    })

    it('.convertRowsToColumn should convert block array to column provided', () => {
      const colAsRow = [{ isVisible: true }, { isVisible: true }, { isVisible: false }, { isVisible: true }]
      const expected = [
        [{ isVisible: true }],
        [{ isVisible: true }],
        [{ isVisible: false }],
        [{ isVisible: true }],
      ]
      expect(subject._transposeColumnArrayToColumn(colAsRow, 0, [[], [], [], []])).toEqual(expected);
    })
    it('.convertRowsToColumn should convert block array to column provided', () => {
      const colAsRow = [{ isVisible: true }, { isVisible: true }, { isVisible: false }, { isVisible: true }]
      const expected = [
        [undefined, { isVisible: true }],
        [undefined, { isVisible: true }],
        [undefined, { isVisible: false }],
        [undefined, { isVisible: true }],
      ]
      expect(subject._transposeColumnArrayToColumn(colAsRow, 1, [[], [], [], []])).toEqual(expected);
    })

    it('.shiftBlocksDown should shifts blocks in a column down', () => {
      const initial = [
        [{ isVisible: false }, { isVisible: false }, { isVisible: false }, { isVisible: false }],
        [{ isVisible: true }, { isVisible: true }, { isVisible: true }, { isVisible: true }],
        [{ isVisible: true }, { isVisible: true }, { isVisible: true }, { isVisible: true }],
        [{ isVisible: false }, { isVisible: false }, { isVisible: false }, { isVisible: false }],
      ]
      const expected = [
        [{ isVisible: false }, { isVisible: false }, { isVisible: false }, { isVisible: false }],
        [{ isVisible: false }, { isVisible: false }, { isVisible: false }, { isVisible: false }],
        [{ isVisible: true }, { isVisible: true }, { isVisible: true }, { isVisible: true }],
        [{ isVisible: true }, { isVisible: true }, { isVisible: true }, { isVisible: true }],
      ]

      expect(subject.shiftBlocksDown(initial)).toEqual(expected);
    })
    it('.shiftBlocksUp should shifts blocks in a column down', () => {
      const initial = [
        [{ isVisible: false }, { isVisible: false }, { isVisible: false }, { isVisible: false }],
        [{ isVisible: true }, { isVisible: true }, { isVisible: true }, { isVisible: true }],
        [{ isVisible: false }, { isVisible: false }, { isVisible: false }, { isVisible: false }],
        [{ isVisible: true }, { isVisible: true }, { isVisible: true }, { isVisible: true }],
      ]
      const expected = [
        [{ isVisible: true }, { isVisible: true }, { isVisible: true }, { isVisible: true }],
        [{ isVisible: true }, { isVisible: true }, { isVisible: true }, { isVisible: true }],
        [{ isVisible: false }, { isVisible: false }, { isVisible: false }, { isVisible: false }],
        [{ isVisible: false }, { isVisible: false }, { isVisible: false }, { isVisible: false }],
      ]

      expect(subject.shiftBlocksUp(initial)).toEqual(expected);
    })
  })

})