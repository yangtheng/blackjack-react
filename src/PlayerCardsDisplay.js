import React from 'react'

const PlayerCardsDisplay = props => {
  let cards = props.cards.map(card => card.type + card.suit)

  return (
    <p>Your Cards: {cards}</p>
  )
}

export default PlayerCardsDisplay
