import React, { useState } from "react"
import './twentyFourtyEight.css'
import { buildBlock } from "../../utils"
import { BlockComponent } from "../block/block"
import {TwentyFourtyEight} from "../../twentyFourtyEightGameLogic/twentyFourtyEightGameLogic";


// ES6
const flatten = list => list.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);

export const TwentyFourtyEightGame = () => {
  const game = new TwentyFourtyEight()
  const [blocks, setBlocks] = useState([
    [buildBlock(99),buildBlock(99),buildBlock(99),buildBlock(99)],
    [buildBlock(99),buildBlock(99),buildBlock(99),buildBlock(99)],
    [buildBlock(99),buildBlock(99),buildBlock(99),buildBlock(99)],
    [buildBlock(99),buildBlock(99),buildBlock(99),buildBlock(99)],
  ])

  const onKeyDown = (event) => {
    if(event.keyCode === 40) setBlocks(game.updateRandomBlockToVisible(game.shiftBlocksDown(blocks)))
    if(event.keyCode === 38) setBlocks(game.updateRandomBlockToVisible(game.shiftBlocksUp(blocks)))
    if(event.keyCode === 37) setBlocks(game.updateRandomBlockToVisible(game.shiftBlocksLeft(blocks)))
    if(event.keyCode === 39) setBlocks(game.updateRandomBlockToVisible(game.shiftBlocksRight(blocks)))
  }

  const newgame = () => {
    setBlocks(game.newGame())
  }
  return (
      <div tabIndex={0} onKeyDown={onKeyDown}className="container">
            <div className="game-wrapper">
      {flatten(blocks).map((block, key) => <BlockComponent key={key} isVisible={block.isVisible} value={block.value} ></BlockComponent>)}
    </div>
        <button onClick={newgame}>Start new Game</button>
      </div>
  )
}