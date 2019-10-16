import React from "react"
import "./block.css"

export const BlockComponent= ({isVisible, value}) => {
  return (
    <div className={'block ' + (!isVisible ? 'hidden' : '')}>
      {value}
    </div>
  )
}
