import React, { useState, useEffect, useRef, useCallback, KeyboardEventHandler } from "react"

import './twentyFourtyEight.scss'
import { buildBlock } from "../../twentyFourtyEightGameLogic/utils"
import { BlockComponent } from "../block/block"
import TwentyFourtyEight from "../../twentyFourtyEightGameLogic/twentyFourtyEight"
import { Block } from "../../models/block"


export const TwentyFourtyEightGame: React.FC = () => {
  const container =  React.createRef();
  const game = new TwentyFourtyEight()
  const [blocks, setBlocks] = useState([
    [buildBlock(99),buildBlock(99),buildBlock(99),buildBlock(99)],
    [buildBlock(99),buildBlock(99),buildBlock(99),buildBlock(99)],
    [buildBlock(99),buildBlock(99),buildBlock(99),buildBlock(99)],
    [buildBlock(99),buildBlock(99),buildBlock(99),buildBlock(99)],
  ])

  const foo = (d: React.KeyboardEvent<HTMLDivElement>) => {
    if(d.keyCode === 40) setBlocks(game.updateRandomBlockToVisible(game.shiftBlocksDown(blocks)))
    if(d.keyCode === 38) setBlocks(game.updateRandomBlockToVisible(game.shiftBlocksUp(blocks)))
    if(d.keyCode === 37) setBlocks(game.updateRandomBlockToVisible(game.shiftBlocksLeft(blocks)))
    if(d.keyCode === 39) setBlocks(game.updateRandomBlockToVisible(game.shiftBlocksRight(blocks)))
  }

  const newgame = () => {
    setBlocks(game.newGame())
  }
  return (
      <div tabIndex={0} onKeyDown={foo}className="container">
            <div className="game-wrapper">
      {blocks.flat(Infinity).map((block, key) => <BlockComponent key={key} isVisible={block.isVisible} value={block.value} ></BlockComponent>)}
    </div>
        <button onClick={newgame}>Start new Game</button>
      </div>
  )
}