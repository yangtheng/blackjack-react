import React from 'react'

const DealerCardsDisplay = props => {
  let cards
  if (!props.waitingForPlayer) {
    cards = props.cards.map(card => card.type + card.suit)
  } else if (props.waitingForPlayer && props.cards.length > 0) {
    cards = `${props.cards[0].type}${props.cards[0].suit}**`
  }

  return (
    <p>Dealer Cards: {cards}</p>
  )
}

export default DealerCardsDisplay
