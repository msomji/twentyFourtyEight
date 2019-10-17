import { useState } from "react"
import './twentyFourtyEight.css'
import { buildBlock } from "../../utils"
import { BlockComponent } from "../block/block"
import { TwentyFourtyEight } from "../../twentyFourtyEightGameLogic/twentyFourtyEightGameLogic";
import * as React from 'react'
import { Block } from "../../models/block"
import { flatten } from "../../utils";

export const TwentyFourtyEightGame: React.FC = () => {
  const container = React.createRef();
  const game = new TwentyFourtyEight()
  const [blocks, setBlocks] = useState([
    [buildBlock(0), buildBlock(0), buildBlock(0), buildBlock(0)],
    [buildBlock(0), buildBlock(0), buildBlock(0), buildBlock(0)],
    [buildBlock(0), buildBlock(0), buildBlock(0), buildBlock(0)],
    [buildBlock(0), buildBlock(0), buildBlock(0), buildBlock(0)],
  ])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 40) setBlocks(game.updateRandomBlockToVisible(game.shiftBlocksDown(blocks)))
    if (event.keyCode === 38) setBlocks(game.updateRandomBlockToVisible(game.shiftBlocksUp(blocks)))
    if (event.keyCode === 37) setBlocks(game.updateRandomBlockToVisible(game.shiftBlocksLeft(blocks)))
    if (event.keyCode === 39) setBlocks(game.updateRandomBlockToVisible(game.shiftBlocksRight(blocks)))
  }

  const newgame = () => setBlocks(game.newGame())

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown} className="container">
      <div className="game-wrapper">
        {flatten(blocks).map((block: Block, key) => <BlockComponent key={key} isVisible={block.isVisible} value={block.value} ></BlockComponent>)}
      </div>
      <button onClick={newgame}>Start new Game</button>
    </div>
  )
}