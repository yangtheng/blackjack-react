import React from 'react'

const PlayerCardsDisplay = props => {
  let cards = props.cards.map((card, index) => <img src={card.image} style={{height: '100px', width: '100px'}} key={index} />)

  return (
    <p>Your Cards: {cards}</p>
  )
}

export default PlayerCardsDisplay
