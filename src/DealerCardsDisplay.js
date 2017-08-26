import React from 'react'

const DealerCardsDisplay = props => {
  let cards = props.cards.map(card => card.type + card.suit)

  return (
    <p>Dealer Cards: {cards}</p>
  )
}

export default DealerCardsDisplay
