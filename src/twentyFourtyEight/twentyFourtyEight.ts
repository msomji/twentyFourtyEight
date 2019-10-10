export interface Block {
  isVisible: boolean;
  value?: number;
}
const boolToNumber = (f: boolean) => f ? 1 : -1;
const EMPTY_BOARD: (rows?: number, columns?: number) => any[][] = (rows = 4, columns = 4) => Array(rows).fill('').map(d => Array(columns))

export class TwentyFourtyEight {
  _prepend: (blocks: Block[]) => Block[] = blocks => Array(4).fill('').reduce((accum, _) => accum.length < 4 ? [{ isVisible: false }, ...accum] : accum, blocks)
  _append: (blocks: Block[]) => Block[] = blocks => Array(4).fill('').reduce((accum, _) => accum.length < 4 ? [...accum, { isVisible: false }] : accum, blocks)
  _getColumn: (board: Block[][], columnNumber: number) => Block[] = (board, columnNumber) => board.map(blocks => blocks[columnNumber])

  _mergeSameValueVisibleBlocks: (board: Block[], mergeLogic: (currentBlock: Block, blocks: Block[]) => Block[]) => Block[] = (board, mergeLogic) => {
    return board.reduce((acc: Block[], current: Block, index) => index === (0) ? [current] : mergeLogic(current, acc), [])

  }

  _mergeUp: (currentBlock: Block, blocks: Block[]) => Block[] = (currentBlock, blocks) => {
    if (currentBlock.isVisible && blocks[0].value === currentBlock.value) {
      blocks[0].value += 1
      return blocks;
    }
    return [currentBlock, ...blocks]
  }
  _mergeDown: (currentBlock: Block, blocks: Block[]) => Block[] = (currentBlock, blocks) => {
    if (currentBlock.isVisible && blocks[blocks.length - 1].value === currentBlock.value) {
      blocks[blocks.length - 1].value += 1
      return blocks;
    } else {

      return [...blocks, currentBlock]
    }
  }

  _transposeColumnArrayToColumn: (colAsRow: Block[], columnNumber: number, initalBoard: Block[][]) => Block[][] = (colAsRow, columnNumber, initalBoard) =>
    initalBoard.map((row, index) => {
      row[columnNumber] = colAsRow[index]
      return row;
    })

  _shiftDirection: (orderFn: (row: Block[]) => Block[], mergeDirection: (currentBlock: Block, blocks: Block[]) => Block[]) => (board: Block[][]) => Block[][] = (orderFn, mergeDirection) => (board) => {
    const numOfRows = board.length;
    const numOfColumns = board[0].length;
    const emptyBoard = EMPTY_BOARD(numOfRows, numOfColumns)

    const columns = Array(numOfColumns).fill('').map((_, columnIndex) => this._getColumn(board, columnIndex))
    const shiftedColumns = columns.map((row, i) => {
      const mergedCells = this._mergeSameValueVisibleBlocks(row, mergeDirection)

      const setcolumnWithCorrectNumberOfCells = this._prepend(mergedCells)
      return orderFn(setcolumnWithCorrectNumberOfCells);
    })
    return shiftedColumns.reduce((acum, columnArray, i) => this._transposeColumnArrayToColumn(columnArray, i, acum), emptyBoard)
  }

  _shiftRight: (row: Block[]) => Block[] = (row) => row.sort((block1, block2) => boolToNumber(block1.isVisible) - boolToNumber(block2.isVisible))
  _shiftLeft: (row: Block[]) => Block[] = (row) => this._shiftRight(row).reverse()



  _horizontalShift: (row: Block[], horizontalMerge: (currentBlock: Block, blocks: Block[]) => Block[], rowFormatter: (blocks: Block[]) => Block[]) => Block[] = (row, horizontalMerge, rowFormatter) => {

    const mergedHorizontalCells = row.sort((block1, block2) => boolToNumber(block1.isVisible) - boolToNumber(block2.isVisible))
      .reduce((blocks, currentBlock, index) => index === 0 ? [currentBlock] : horizontalMerge(currentBlock, blocks), [])

    return rowFormatter(mergedHorizontalCells)
  }

  shiftBlocksRight: (board: Block[][]) => Block[][] = (board) => board.map(row => this._horizontalShift(row, this._mergeDown, this._prepend))
  shiftBlocksLeft: (board: Block[][]) => Block[][] = (board) => board.map(row => this._horizontalShift(row, this._mergeUp, this._append))

  shiftBlocksDown: (board: Block[][]) => Block[][] = this._shiftDirection(this._shiftRight, this._mergeDown)
  shiftBlocksUp: (board: Block[][]) => Block[][] = this._shiftDirection(this._shiftLeft, this._mergeUp)

}


