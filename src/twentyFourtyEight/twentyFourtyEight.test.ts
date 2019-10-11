import { TwentyFourtyEight, Block } from "./twentyFourtyEight"

const block = (value?: number) => ({ isVisible: !!value, value })

describe("TwentyFourtyEight", () => {
  const subject = new TwentyFourtyEight()

  describe("row", () => {
    it(".shiftRight should move all visible blocks to the right", () => {
      const initial = [block(1), block()]
      const expected = [block(), block(1)]
      expect(subject._shiftRight(initial)).toEqual(expected)
    })

    it("shiftLeft should move all visible blocks to the right", () => {
      const initial = [block(), block(1)]
      const expected = [block(1), block()]
      expect(subject._shiftLeft(initial)).toEqual(expected)
    })

    it("should shiftBlocksLeft", () => {
      const initial = [
        [block(), block(), block(), block()],
        [block(1), block(), block(), block(1)],
        [block(1), block(), block(), block(1)],
        [block(), block(), block(), block()],
      ]
      const expected = [
        [block(), block(), block(), block()],
        [block(2), block(), block(), block()],
        [block(2), block(), block(), block()],
        [block(), block(), block(), block()],
      ]
      expect(subject.shiftBlocksLeft(initial)).toEqual(expected)
    })
    it("should shiftBlocksRight", () => {
      const initial = [
        [block(), block(), block(), block()],
        [block(1), block(), block(), block(1)],
        [block(1), block(), block(), block(1)],
        [block(), block(), block(), block()],
      ]
      const expected = [
        [block(), block(), block(), block()],
        [block(), block(), block(), block(2)],
        [block(), block(), block(), block(2)],
        [block(), block(), block(), block()],
      ]
      expect(subject.shiftBlocksRight(initial)).toEqual(expected)
    })

    it("mergeing should be prioritized with the cell in the direction of movement(right)", () => {
      const initial = [
        [block(), block(), block(), block()],
        [block(1), block(), block(1), block(1)],
        [block(), block(), block(), block()],
        [block(), block(), block(), block()],
      ]
      const expected = [
        [block(), block(), block(), block()],
        [block(), block(), block(1), block(2)],
        [block(), block(), block(), block()],
        [block(), block(), block(), block()],
      ]

      expect(subject.shiftBlocksRight(initial)).toEqual(expected)
    })

    it("mergeing should be prioritized with the cell in the direction of movement(left)", () => {
      const initial = [
        [block(), block(), block(), block()],
        [block(1), block(), block(1), block(1)],
        [block(), block(), block(), block()],
        [block(), block(), block(), block()],
      ]
      const expected = [
        [block(), block(), block(), block()],
        [block(2), block(1), block(), block()],
        [block(), block(), block(), block()],
        [block(), block(), block(), block()],
      ]

      expect(subject.shiftBlocksLeft(initial)).toEqual(expected)
    })
  })

  describe("columns", () => {
    it(".getColumn should return blocks in a perticular column from a 2D array", () => {
      const initial = [
        [block(1), block(), block(1), block(1)],
        [block(1), block(), block(1), block(1)],
        [block(1), block(), block(1), block(1)],
        [block(1), block(), block(1), block(1)],
      ]
      const expected = [block(), block(), block(), block()]
      expect(subject._getColumnAsRow(initial, 1)).toEqual(expected)
    })

    it(".convertRowsToColumn should convert block array to column provided", () => {
      const colAsRow: Block[] = [block(1), block(1), block(), block(1)]
      const expected = [[block(1)], [block(1)], [block()], [block(1)]]
      expect(
        subject._revertRowToColumn([[], [], [], []], colAsRow, 0)
      ).toEqual(expected)
    })
    it(".convertRowsToColumn should convert block array to column provided", () => {
      const colAsRow = [block(1), block(1), block(), block(1)]
      const expected = [
        [undefined, block(1)],
        [undefined, block(1)],
        [undefined, block()],
        [undefined, block(1)],
      ]
      expect(
        subject._revertRowToColumn([[], [], [], []], colAsRow, 1)
      ).toEqual(expected)
    })

    it(".shiftBlocksDown should shifts blocks in a column down", () => {
      const initial = [
        [block(), block(), block(), block()],
        [block(1), block(1), block(1), block(1)],
        [block(), block(), block(), block()],
        [block(), block(), block(), block()],
      ]
      const expected = [
        [block(), block(), block(), block()],
        [block(), block(), block(), block()],
        [block(), block(), block(), block()],
        [block(1), block(1), block(1), block(1)],
      ]

      expect(subject.shiftBlocksDown(initial)).toEqual(expected)
    })

    it(".shiftBlocksUp should shifts blocks in a column down", () => {
      const initial = [
        [block(), block(), block(), block()],
        [block(), block(), block(), block()],
        [block(1), block(1), block(1), block(1)],
        [block(), block(), block(), block()],
      ]
      const expected = [
        [block(1), block(1), block(1), block(1)],
        [block(), block(), block(), block()],
        [block(), block(), block(), block()],
        [block(), block(), block(), block()],
      ]

      expect(subject.shiftBlocksUp(initial)).toEqual(expected)
    })
    describe("should shift ", () => {
      it("same Value blocks and increment them when shifting down", () => {
        const initial = [
          [block(), block(), block(), block()],
          [block(1), block(1), block(1), block(1)],
          [block(1), block(1), block(1), block(1)],
          [block(), block(), block(), block()],
        ]
        const expected = [
          [block(), block(), block(), block()],
          [block(), block(), block(), block()],
          [block(), block(), block(), block()],
          [block(2), block(2), block(2), block(2)],
        ]

        expect(subject.shiftBlocksDown(initial)).toEqual(expected)
      })

      it("same Value blocks and increment them when shifting up", () => {
        const initial = [
          [block(), block(), block(), block()],
          [block(1), block(1), block(1), block(1)],
          [block(1), block(1), block(1), block(1)],
          [block(), block(), block(), block()],
        ]
        const expected = [
          [block(2), block(2), block(2), block(2)],
          [block(), block(), block(), block()],
          [block(), block(), block(), block()],
          [block(), block(), block(), block()],
        ]

        expect(subject.shiftBlocksUp(initial)).toEqual(expected)
      })

      it("mergeing should be prioritized with the cell in the direction of movement(up)", () => {
        const initial = [
          [block(1), block(1), block(1), block(1)],
          [block(), block(), block(), block()],
          [block(1), block(1), block(1), block(1)],
          [block(1), block(1), block(1), block(1)],
        ]
        const expected = [
          [block(2), block(2), block(2), block(2)],
          [block(1), block(1), block(1), block(1)],
          [block(), block(), block(), block()],
          [block(), block(), block(), block()],
        ]

        expect(subject.shiftBlocksUp(initial)).toEqual(expected)
      })

      it("same values and uniquie values untouched and in order when shifting down", () => {
        const initial = [
          [block(4), block(4), block(4), block(4)],
          [block(4), block(4), block(4), block(4)],
          [block(1), block(1), block(1), block(1)],
          [block(3), block(3), block(3), block(3)],
        ]
        const expected = [
          [block(), block(), block(), block()],
          [block(5), block(5), block(5), block(5)],
          [block(1), block(1), block(1), block(1)],
          [block(3), block(3), block(3), block(3)],
        ]

        expect(subject.shiftBlocksDown(initial)).toEqual(expected)
      })
      it("mergeing should be prioritized with the cell in the direction of movement(down)", () => {
        const initial = [
          [block(1), block(1), block(1), block(1)],
          [block(), block(), block(), block()],
          [block(1), block(1), block(1), block(1)],
          [block(1), block(1), block(1), block(1)],
        ]
        const expected = [
          [block(), block(), block(), block()],
          [block(), block(), block(), block()],
          [block(1), block(1), block(1), block(1)],
          [block(2), block(2), block(2), block(2)],
        ]
        expect(subject.shiftBlocksDown(initial)).toEqual(expected)
      })

      it("same values and uniquie values untouched and in order when shifting up", () => {
        const initial = [
          [block(4), block(4), block(4), block(4)],
          [block(4), block(4), block(4), block(4)],
          [block(1), block(1), block(1), block(1)],
          [block(3), block(3), block(3), block(3)],
        ]
        const expected = [
          [block(5), block(5), block(5), block(5)],
          [block(1), block(1), block(1), block(1)],
          [block(3), block(3), block(3), block(3)],
          [block(), block(), block(), block()],
        ]
        expect(subject.shiftBlocksUp(initial)).toEqual(expected)
      })
    })
  })

  describe("merge", () => {

    it("_mergeForward should merge favoring to the right", () => {
      const actual = [block(4), block(4), block(1), block(3)]
      const expected = [block(), block(5), block(1), block(3)]
      expect(subject._mergeForward(actual)).toEqual(expected);
    })
    it("_mergeForward should merge favoring to the righr", () => {
      const actual = [block(1), block(1), block(1)]
      const expected = [block(), block(), block(1), block(2)]

      expect(subject._mergeForward(actual)).toEqual(expected);
    })

    it("_mergeBackwards should merge favoring to the left", () => {
      const actual = [block(4), block(4), block(1), block(3)]
      const expected = [block(5), block(1), block(3), block()]
      expect(subject._mergeBackwards(actual)).toEqual(expected);
    })

    it("_mergeBackwards should merge favoring to the down2", () => {
      const actual = [block(1), block(1), block(1)]
      const expected = [block(2), block(1), block(), block()]

      expect(subject._mergeBackwards(actual)).toEqual(expected);
    })
  })

  describe('Game Over', () => {
    it('should return false if there are any inVisibleBlocks', () => {
      const actual = [
        [block(1), block(1), block(1)],
        [block(1), block(1), block()]
      ]

      expect(subject.gameOver(actual)).toEqual(false);
    })
    it('should return true if there are no more inVisibleBlocks', () => {
      const actual = [block(1), block(1), block(1)]

      expect(subject.gameOver([actual])).toEqual(true);
    })

    it('should return true if there one of the blocks has a value of 11', () => {
      const actual = [
        [block(1), block(1), block(1)],
        [block(11), block(1), block(1)]
      ]

      expect(subject.gameOver(actual)).toEqual(true);
    })
  })
  describe('update random block to visible', () => {
    it('should flip the last one', () => {
      const actual = [
        [block(1), block(1), block(1)],
        [block(), block(1), block(1)]
      ]
      const result = subject.updateRandomBlockToVisible(actual)
      const numberOf = result.reduce((count, row) => {
        const invibleBlocksInCurrentRow = row.filter(block => !block.isVisible)
        count += invibleBlocksInCurrentRow.length;
        return count;
      }, 0)
      expect(numberOf).toBe(0);
    })

    it('should flip only one', () => {
      const actual = [
        [block(1), block(1), block(1)],
        [block(), block(), block(1)]
      ]
      const result = subject.updateRandomBlockToVisible(actual)
      const numberOf = result.reduce((count, row) => {
        const invibleBlocksInCurrentRow = row.filter(block => !block.isVisible)
        count += invibleBlocksInCurrentRow.length;
        return count;
      }, 0)
      expect(numberOf).toBe(1);
    })
  })
})
