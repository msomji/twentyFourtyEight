import { Block } from "../models/block";
import { flatten, buildBlock } from "../utils";


const boolToNumber = (booleanValue: boolean) => booleanValue ? 1 : -1;
const GRID_DIMENTIONS = 4;
const EMPTY_BOARD = Array(GRID_DIMENTIONS).fill('').map(d => Array(GRID_DIMENTIONS))

export class TwentyFourtyEight {
  _append: (blocks: Block[]) => Block[] = blocks => Array(GRID_DIMENTIONS).fill('').reduce((accum, _) => accum.length < GRID_DIMENTIONS ? [...accum, { isVisible: false }] : accum, blocks)
  _getColumnAsRow: (board: Block[][], columnNumber: number) => Block[] = (board, columnNumber) => board.map(blocks => blocks[columnNumber])

  _revertRowToColumn: (initalBoard: Block[][], colAsRow: Block[], columnNumber: number, ) => Block[][] = (initalBoard, colAsRow, columnNumber, ) =>
    initalBoard.map((row, index) => {
      row[columnNumber] = colAsRow[index]
      return row;
    })

  _shiftDirection: (board: Block[][], mergeDirection: (blocks: Block[]) => Block[]) => Block[][] = (board, mergeDirection) =>
    Array(GRID_DIMENTIONS).fill('')
      .map((_, columnIndex) => this._getColumnAsRow(board, columnIndex))
      .map(c => c.filter(f => f.isVisible))
      .map(column => mergeDirection(column))
      .reduce(this._revertRowToColumn, EMPTY_BOARD)

  _shiftRight: (row: Block[]) => Block[] = (row) => row.sort((block1, block2) => boolToNumber(block1.isVisible) - boolToNumber(block2.isVisible))
  _shiftLeft: (row: Block[]) => Block[] = (row) => this._shiftRight(row).reverse()

  //  all merging assumes all blocks visible
  _mergeForward: (blocks: Block[]) => Block[] = (blocks) => this._mergeBackwards(blocks.reverse()).reverse()

  _mergeBackwards: (blocks: Block[]) => Block[] = (blocks) => {
    const things: Array<Block> = blocks.reduce((accum: any[], current: Block, index: number) => {
      if (index === 0) return [current]

      if (accum[accum.length - 1].value === current.value) {
        accum[accum.length - 1] = {
          ...accum[accum.length - 1],
          value: accum[accum.length - 1].value + 1
        }
        return [accum];

      } else {
        return [...accum, current]
      }
    }, [])
    return this._append(flatten(things));
  }

  updateRandomBlockToVisible: (board: Block[][]) => Block[][] = (board) => {
    const totalNumberofInvisibleTiles = board.reduce((count, row) => {
      const invibleBlocksInCurrentRow = row.filter(block => !block.isVisible)
      count += invibleBlocksInCurrentRow.length;
      return count;
    }, 0)

    const blockNumberToFlip = Math.floor(Math.random() * totalNumberofInvisibleTiles) + 1

    return board.reduce((accum: any, current: Block[]) => {
      const updatedRow = current.map((block, index) => {
        if (!block.isVisible && accum.count === blockNumberToFlip) {
          accum.count += 1
          return { value: 1, isVisible: true }
        } else if (!block.isVisible) {
          accum.count += 1
        }

        return block
      })
      return {
        count: accum.count,
        updatedBoard: [...accum.updatedBoard, [...updatedRow]]
      };
    }, {
      count: 1,
      updatedBoard: []
    }).updatedBoard
  }
  shiftBlocksRight: (board: Block[][]) => Block[][] = (board) => board.map(row => this._mergeForward((row.filter(b => b.isVisible))))
  shiftBlocksLeft: (board: Block[][]) => Block[][] = (board) => board.map(row => this._mergeBackwards((row.filter(b => b.isVisible))))

  shiftBlocksDown: (board: Block[][]) => Block[][] = board => this._shiftDirection(board, this._mergeForward)
  shiftBlocksUp: (board: Block[][]) => Block[][] = board => this._shiftDirection(board, this._mergeBackwards)
  gameOver: (board: Block[][]) => boolean = board => board.reduce((_:any, row:Block[]) => !row.some(b => !b.isVisible) || row.some(b => b.value === 11), false)
  newGame: () => Block[][] = () => {
    const board = Array(4).fill('').map(row => {
      return Array(4).fill('').map(b => buildBlock())
    })
    return this.updateRandomBlockToVisible(board);
  }
}