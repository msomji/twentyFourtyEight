 # TwentyFourtyEight logic
 [blocks] -----shiftRight ----> [blocks]
 [blocks] -----shiftLeft----> [blocks]
 [[blocks]] -----shiftUp ----> [[blocks]]
 [[blocks]] -----shiftDown ----> [[blocks]]

[[blocks]] ------incrementMoveCountOnVisibleBlocks -----> [[blocks]]
[[blocks]] ------UpdateRandomBlockToVisible -----> [[blocks]]
[[blocks]] -------GameOver--------> bool


 ## shiftUp = [[blocks]] -----shiftUp ----> [[blocks]]
 [[blocks]] columnNumber -----getColumn----> column ([blocks])
 column ----shiftLeft--> shiftedColumn ([blocks])
 shiftedColumn, columnNumber, [[],[],[],[]]--convertRowsToColumn--> [[b],[l],[o],[k]]

 ## shiftDown = [[blocks]] -----shiftDown ----> [[blocks]]
 [[blocks]] columnNumber -----getColumn----> column ([blocks])
 column ----shiftRight--> shiftedColumn ([blocks])
  shiftedColumn, columnNumber, [[],[],[],[]]--convertRowsToColumn--> [[b],[l],[o],[k]]

## incrementMoveCountOnVisibleBlocks = [[blocks]] ------incrementMoveCountOnVisibleBlocks -----> [[blocks]]
block --------isVisible? ---------> bool
block, true -----updateCount------> UpdatedBlock

## UpdateRandomBlockToVisible = [[blocks]] ------UpdateRandomBlockToVisible -----> [[blocks]]
[[blocks]] -----numInVisibileBlocks--------> number
number -------randomNumber -----------> Randomnumber
[[blocks]], randomNumber --------displayNewBlock --------> [[blocks]]

## GameOVer == [[blocks]] -------GameOver--------> bool
[[blocks]] -----numInVisibileBlocks--------> number
[[blocks]] ------hasMaxValue---------------> bool