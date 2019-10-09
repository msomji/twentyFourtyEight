export interface Block {
  isVisible: boolean;
  value?: number;
}

const boolToNumber = (f: boolean) => f ? 1 : -1;

export class TwentyFourtyEight {

  buildBoard: (rows?: number, columns?: number) => any[][] = (rows = 4, columns = 4) => Array(rows).fill('').map(d => Array(columns))

  _getColumn: (board: Block[][], columnNumber: number) => Block[] = (board, columnNumber) => board.map(blocks => blocks[columnNumber])

  _transposeColumnArrayToColumn: (colAsRow: Block[], columnNumber: number, initalBoard: Block[][]) => Block[][] = (colAsRow, columnNumber, initalBoard) =>
    initalBoard.map((row, index) => {
      row[columnNumber] = colAsRow[index]
      return row;
    })

  _shiftDirection: (direction: (row: Block[]) => Block[]) => (board: Block[][]) => Block[][] = direction => (board) => {
    const numOfRows = board.length;
    const numOfColumns = board[0].length;
    const emptyBoard = this.buildBoard(numOfRows, numOfColumns)

    const columns = Array(numOfColumns).fill('').map((_, columnIndex) => this._getColumn(board, columnIndex))
    const shiftedColumns = columns.map((row, i) => direction(row))

    return shiftedColumns.reduce((acum, columnArray, i) => this._transposeColumnArrayToColumn(columnArray, i, acum), emptyBoard)
  }

  _shiftRight: (row: Block[]) => Block[] = (row) => row.sort((block1, block2) => boolToNumber(block1.isVisible) - boolToNumber(block2.isVisible))
  _shiftLeft: (row: Block[]) => Block[] = (row) => this._shiftRight(row).reverse()

  shiftBlocksRight: (board: Block[][]) => Block[][] = (board) => board.map(row => this._shiftRight(row))
  shiftBlocksLeft: (board: Block[][]) => Block[][] = (board) => board.map(row => this._shiftLeft(row))

  shiftBlocksDown: (board: Block[][]) => Block[][] = this._shiftDirection(this._shiftRight)
  shiftBlocksUp: (board: Block[][]) => Block[][] = this._shiftDirection(this._shiftLeft)

}


