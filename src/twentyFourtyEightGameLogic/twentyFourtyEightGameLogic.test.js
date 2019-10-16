import {TwentyFourtyEight} from "./twentyFourtyEightGameLogic"
import {buildBlock} from "../utils"


describe("TwentyFourtyEight", () => {
  const subject = new TwentyFourtyEight()

  describe("row", () => {
    it(".shiftRight should move all visible blocks to the right", () => {
      const initial = [buildBlock(1), buildBlock()]
      const expected = [buildBlock(), buildBlock(1)]
      expect(subject._shiftRight(initial)).toEqual(expected)
    })

    it("shiftLeft should move all visible blocks to the right", () => {
      const initial = [buildBlock(), buildBlock(1)]
      const expected = [buildBlock(1), buildBlock()]
      expect(subject._shiftLeft(initial)).toEqual(expected)
    })

    it("should shiftBlocksLeft", () => {
      const initial = [
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        [buildBlock(1), buildBlock(), buildBlock(), buildBlock(1)],
        [buildBlock(1), buildBlock(), buildBlock(), buildBlock(1)],
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
      ]
      const expected = [
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        [buildBlock(2), buildBlock(), buildBlock(), buildBlock()],
        [buildBlock(2), buildBlock(), buildBlock(), buildBlock()],
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
      ]
      expect(subject.shiftBlocksLeft(initial)).toEqual(expected)
    })
    it("should shiftBlocksRight", () => {
      const initial = [
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        [buildBlock(1), buildBlock(), buildBlock(), buildBlock(1)],
        [buildBlock(1), buildBlock(), buildBlock(), buildBlock(1)],
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
      ]
      const expected = [
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        [buildBlock(), buildBlock(), buildBlock(), buildBlock(2)],
        [buildBlock(), buildBlock(), buildBlock(), buildBlock(2)],
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
      ]
      expect(subject.shiftBlocksRight(initial)).toEqual(expected)
    })

    it("mergeing should be prioritized with the cell in the direction of movement(right)", () => {
      const initial = [
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        [buildBlock(1), buildBlock(), buildBlock(1), buildBlock(1)],
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
      ]
      const expected = [
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        [buildBlock(), buildBlock(), buildBlock(1), buildBlock(2)],
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
      ]

      expect(subject.shiftBlocksRight(initial)).toEqual(expected)
    })

    it("mergeing should be prioritized with the cell in the direction of movement(left)", () => {
      const initial = [
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        [buildBlock(1), buildBlock(), buildBlock(1), buildBlock(1)],
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
      ]
      const expected = [
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        [buildBlock(2), buildBlock(1), buildBlock(), buildBlock()],
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
      ]

      expect(subject.shiftBlocksLeft(initial)).toEqual(expected)
    })
  })

  describe("columns", () => {
    it(".getColumn should return blocks in a perticular column from a 2D array", () => {
      const initial = [
        [buildBlock(1), buildBlock(), buildBlock(1), buildBlock(1)],
        [buildBlock(1), buildBlock(), buildBlock(1), buildBlock(1)],
        [buildBlock(1), buildBlock(), buildBlock(1), buildBlock(1)],
        [buildBlock(1), buildBlock(), buildBlock(1), buildBlock(1)],
      ]
      const expected = [buildBlock(), buildBlock(), buildBlock(), buildBlock()]
      expect(subject._getColumnAsRow(initial, 1)).toEqual(expected)
    })

    it(".convertRowsToColumn should convert block array to column provided", () => {
      const colAsRow = [buildBlock(1), buildBlock(1), buildBlock(), buildBlock(1)]
      const expected = [[buildBlock(1)], [buildBlock(1)], [buildBlock()], [buildBlock(1)]]
      expect(
        subject._revertRowToColumn([[], [], [], []], colAsRow, 0)
      ).toEqual(expected)
    })
    it(".convertRowsToColumn should convert block array to column provided", () => {
      const colAsRow = [buildBlock(1), buildBlock(1), buildBlock(), buildBlock(1)]
      const expected = [
        [undefined, buildBlock(1)],
        [undefined, buildBlock(1)],
        [undefined, buildBlock()],
        [undefined, buildBlock(1)],
      ]
      expect(
        subject._revertRowToColumn([[], [], [], []], colAsRow, 1)
      ).toEqual(expected)
    })

    it(".shiftBlocksDown should shifts blocks in a column down", () => {
      const initial = [
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        [buildBlock(1), buildBlock(1), buildBlock(1), buildBlock(1)],
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
      ]
      const expected = [
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        [buildBlock(1), buildBlock(1), buildBlock(1), buildBlock(1)],
      ]

      expect(subject.shiftBlocksDown(initial)).toEqual(expected)
    })

    it(".shiftBlocksUp should shifts blocks in a column down", () => {
      const initial = [
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        [buildBlock(1), buildBlock(1), buildBlock(1), buildBlock(1)],
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
      ]
      const expected = [
        [buildBlock(1), buildBlock(1), buildBlock(1), buildBlock(1)],
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
      ]

      expect(subject.shiftBlocksUp(initial)).toEqual(expected)
    })
    describe("should shift ", () => {
      it("same Value blocks and increment them when shifting down", () => {
        const initial = [
          [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
          [buildBlock(1), buildBlock(1), buildBlock(1), buildBlock(1)],
          [buildBlock(1), buildBlock(1), buildBlock(1), buildBlock(1)],
          [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        ]
        const expected = [
          [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
          [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
          [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
          [buildBlock(2), buildBlock(2), buildBlock(2), buildBlock(2)],
        ]

        expect(subject.shiftBlocksDown(initial)).toEqual(expected)
      })

      it("same Value blocks and increment them when shifting up", () => {
        const initial = [
          [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
          [buildBlock(1), buildBlock(1), buildBlock(1), buildBlock(1)],
          [buildBlock(1), buildBlock(1), buildBlock(1), buildBlock(1)],
          [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        ]
        const expected = [
          [buildBlock(2), buildBlock(2), buildBlock(2), buildBlock(2)],
          [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
          [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
          [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        ]

        expect(subject.shiftBlocksUp(initial)).toEqual(expected)
      })

      it("mergeing should be prioritized with the cell in the direction of movement(up)", () => {
        const initial = [
          [buildBlock(1), buildBlock(1), buildBlock(1), buildBlock(1)],
          [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
          [buildBlock(1), buildBlock(1), buildBlock(1), buildBlock(1)],
          [buildBlock(1), buildBlock(1), buildBlock(1), buildBlock(1)],
        ]
        const expected = [
          [buildBlock(2), buildBlock(2), buildBlock(2), buildBlock(2)],
          [buildBlock(1), buildBlock(1), buildBlock(1), buildBlock(1)],
          [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
          [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        ]

        expect(subject.shiftBlocksUp(initial)).toEqual(expected)
      })

      it("same values and uniquie values untouched and in order when shifting down", () => {
        const initial = [
          [buildBlock(4), buildBlock(4), buildBlock(4), buildBlock(4)],
          [buildBlock(4), buildBlock(4), buildBlock(4), buildBlock(4)],
          [buildBlock(1), buildBlock(1), buildBlock(1), buildBlock(1)],
          [buildBlock(3), buildBlock(3), buildBlock(3), buildBlock(3)],
        ]
        const expected = [
          [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
          [buildBlock(5), buildBlock(5), buildBlock(5), buildBlock(5)],
          [buildBlock(1), buildBlock(1), buildBlock(1), buildBlock(1)],
          [buildBlock(3), buildBlock(3), buildBlock(3), buildBlock(3)],
        ]

        expect(subject.shiftBlocksDown(initial)).toEqual(expected)
      })
      it("mergeing should be prioritized with the cell in the direction of movement(down)", () => {
        const initial = [
          [buildBlock(1), buildBlock(1), buildBlock(1), buildBlock(1)],
          [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
          [buildBlock(1), buildBlock(1), buildBlock(1), buildBlock(1)],
          [buildBlock(1), buildBlock(1), buildBlock(1), buildBlock(1)],
        ]
        const expected = [
          [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
          [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
          [buildBlock(1), buildBlock(1), buildBlock(1), buildBlock(1)],
          [buildBlock(2), buildBlock(2), buildBlock(2), buildBlock(2)],
        ]
        expect(subject.shiftBlocksDown(initial)).toEqual(expected)
      })

      it("same values and uniquie values untouched and in order when shifting up", () => {
        const initial = [
          [buildBlock(4), buildBlock(4), buildBlock(4), buildBlock(4)],
          [buildBlock(4), buildBlock(4), buildBlock(4), buildBlock(4)],
          [buildBlock(1), buildBlock(1), buildBlock(1), buildBlock(1)],
          [buildBlock(3), buildBlock(3), buildBlock(3), buildBlock(3)],
        ]
        const expected = [
          [buildBlock(5), buildBlock(5), buildBlock(5), buildBlock(5)],
          [buildBlock(1), buildBlock(1), buildBlock(1), buildBlock(1)],
          [buildBlock(3), buildBlock(3), buildBlock(3), buildBlock(3)],
          [buildBlock(), buildBlock(), buildBlock(), buildBlock()],
        ]
        expect(subject.shiftBlocksUp(initial)).toEqual(expected)
      })
    })
  })

  describe("merge", () => {

    it("_mergeForward should merge favoring to the right", () => {
      const actual = [buildBlock(4), buildBlock(4), buildBlock(1), buildBlock(3)]
      const expected = [buildBlock(), buildBlock(5), buildBlock(1), buildBlock(3)]
      expect(subject._mergeForward(actual)).toEqual(expected);
    })
    it("_mergeForward should merge favoring to the righr", () => {
      const actual = [buildBlock(1), buildBlock(1), buildBlock(1)]
      const expected = [buildBlock(), buildBlock(), buildBlock(1), buildBlock(2)]

      expect(subject._mergeForward(actual)).toEqual(expected);
    })

    it("_mergeBackwards should merge favoring to the left", () => {
      const actual = [buildBlock(4), buildBlock(4), buildBlock(1), buildBlock(3)]
      const expected = [buildBlock(5), buildBlock(1), buildBlock(3), buildBlock()]
      expect(subject._mergeBackwards(actual)).toEqual(expected);
    })

    it("_mergeBackwards should merge favoring to the down2", () => {
      const actual = [buildBlock(1), buildBlock(1), buildBlock(1)]
      const expected = [buildBlock(2), buildBlock(1), buildBlock(), buildBlock()]

      expect(subject._mergeBackwards(actual)).toEqual(expected);
    })
    
    it("_mergeBackwards should merge each block only once per merge", () => {
      const actual = [buildBlock(1), buildBlock(1), buildBlock(2), buildBlock(1), buildBlock(1), buildBlock(1)]
      const expected = [buildBlock(2), buildBlock(2), buildBlock(2), buildBlock(1)]

      expect(subject._mergeBackwards(actual)).toEqual(expected);

    })
  })

  describe('Game Over', () => {
    it('should return false if there are any inVisibleBlocks', () => {
      const actual = [
        [buildBlock(1), buildBlock(1), buildBlock(1)],
        [buildBlock(1), buildBlock(1), buildBlock()]
      ]

      expect(subject.gameOver(actual)).toEqual(false);
    })
    it('should return true if there are no more inVisibleBlocks', () => {
      const actual = [buildBlock(1), buildBlock(1), buildBlock(1)]

      expect(subject.gameOver([actual])).toEqual(true);
    })

    it('should return true if there one of the blocks has a value of 11', () => {
      const actual = [
        [buildBlock(1), buildBlock(1), buildBlock(1)],
        [buildBlock(11), buildBlock(1), buildBlock(1)]
      ]

      expect(subject.gameOver(actual)).toEqual(true);
    })
  })
  describe('update random block to visible', () => {
    it('should flip the last one', () => {
      const actual = [
        [buildBlock(1), buildBlock(1), buildBlock(1)],
        [buildBlock(), buildBlock(1), buildBlock(1)]
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
        [buildBlock(1), buildBlock(1), buildBlock(1)],
        [buildBlock(), buildBlock(), buildBlock(1)]
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