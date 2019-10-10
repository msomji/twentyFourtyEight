# TwentyFourtyEight logic
1. ```[blocks] -----shiftRight ----> [blocks]```
2. ``` [blocks] -----shiftLeft----> [blocks]```
3. ``` [[blocks]] -----shiftUp ----> [[blocks]]```
4. ``` [[blocks]] -----shiftDown ----> [[blocks]]```

5. ```[[blocks]] ------incrementMoveCountOnVisibleBlocks -----> [[blocks]]```
6. ```[[blocks]] ------UpdateRandomBlockToVisible -----> [[blocks]]```
7. ```[[blocks]] -------GameOver--------> bool```


 

### shiftUp 
 `[[blocks]] -----shiftUp ----> [[blocks]]`
 
	[[blocks]] columnNumber -----getColumn----> column ([blocks])

	column ----shiftLeft--> shiftedColumn ([blocks])

  shiftedColumns, direction -------mergeSameValueBlocks ----->[blocks]
     
	shiftedColumn, columnNumber, [[],[],[],[]]--convertRowsToColumn--> [[b],[l],[o],[k]]
     

### shiftDown 
 `[[blocks]] -----shiftDown ----> [[blocks]]`
       
	[[blocks]] columnNumber -----getColumn----> column ([blocks])
		
	column ----shiftRight--> shiftedColumn ([blocks])

  shiftedColumns, direction -------mergeSameValueBlocks ----->[blocks]
		
	shiftedColumn, columnNumber, [[],[],[],[]]--convertRowsToColumn--> [[b],[l],[o],[k]]

### incrementMoveCountOnVisibleBlocks 
	[[blocks]] ------incrementMoveCountOnVisibleBlocks -----> [[blocks]]
    
    block --------isVisible? ---------> bool
	
	block, true -----updateCount------> UpdatedBlock

### UpdateRandomBlockToVisible 
`[[blocks]] ------UpdateRandomBlockToVisible -----> [[blocks]]`
    
	[[blocks]] -----numInVisibileBlocks--------> number
    
	number -------randomNumber -----------> Randomnumber
    
	[[blocks]], randomNumber --------displayNewBlock --------> [[blocks]]
    

### GameOver 
`[[blocks]] -------GameOver--------> bool`

	[[blocks]] -----numInVisibileBlocks--------> number
	[[blocks]] ------hasMaxValue---------------> bool
