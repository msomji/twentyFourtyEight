export interface Block {
  isVisible: boolean;
  value?: number;
}
const boolToNumber = (f: boolean) => f ? 1 : -1;
const EMPTY_BOARD: any[][] = Array(4).fill('').map(d => Array(4))

export class TwentyFourtyEight {
  _append: (blocks: Block[]) => Block[] = blocks => Array(4).fill('').reduce((accum, _) => accum.length < 4 ? [...accum, { isVisible: false }] : accum, blocks)
  _getColumnAsRow: (board: Block[][], columnNumber: number) => Block[] = (board, columnNumber) => board.map(blocks => blocks[columnNumber])

  _revertRowToColumn: (initalBoard: Block[][], colAsRow: Block[], columnNumber: number,) => Block[][] = ( initalBoard,colAsRow, columnNumber,) =>
    initalBoard.map((row, index) => {
      row[columnNumber] = colAsRow[index]
      return row;
    })

  _shiftDirection: (board: Block[][], mergeDirection: (blocks: Block[]) => Block[]) => Block[][] = (board, mergeDirection) => 
     Array(4).fill('')
        .map((_, columnIndex) => this._getColumnAsRow(board, columnIndex))
        .map(c => c.filter(f => f.isVisible))
        .map(column => mergeDirection(column))
        .reduce(this._revertRowToColumn, EMPTY_BOARD)

  _shiftRight: (row: Block[]) => Block[] = (row) => row.sort((block1, block2) => boolToNumber(block1.isVisible) - boolToNumber(block2.isVisible))
  _shiftLeft: (row: Block[]) => Block[] = (row) => this._shiftRight(row).reverse()

//  all merging assumes all blocks visible
_mergeForward: (blocks: Block[]) => Block[] =  (blocks) => this._mergeBackwards(blocks.reverse()).reverse()

_mergeBackwards: (blocks: Block[]) => Block[] =  (blocks) => {
  const things = blocks.reduce((accum, current, index) => {
    if (index === 0) return [current]
    
    if(accum[accum.length -1].value === current.value) {
      accum[accum.length -1] = {
        ...accum[accum.length -1],
        value : accum[accum.length -1].value + 1
      }
      return accum;

    } else {
      return [...accum, current]
    }
  }, [])
  return this._append(things);
}

  shiftBlocksRight: (board: Block[][]) => Block[][] = (board) => board.map(row => this._mergeForward((row.filter(b => b.isVisible))))
  shiftBlocksLeft: (board: Block[][]) => Block[][] = (board) => board.map(row => this._mergeBackwards((row.filter(b => b.isVisible))))

  shiftBlocksDown: (board: Block[][]) => Block[][] = board => this._shiftDirection(board, this._mergeForward)
  shiftBlocksUp: (board: Block[][]) => Block[][] = board => this._shiftDirection(board, this._mergeBackwards)

  //game over
  // add random initial block
}