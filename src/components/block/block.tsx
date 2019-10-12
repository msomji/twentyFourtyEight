import React from "react"
import "./block.scss"

export interface BlockProps {
  isVisible: boolean;
  value?: number;
}
export const BlockComponent: React.FC<BlockProps> = ({isVisible, value}) => {
  return (
    <div className={'block ' + (!isVisible ? 'hidden' : '')}>
      {value}
    </div>
  )
}