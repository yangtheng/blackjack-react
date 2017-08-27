import React from 'react'

const DealerCardsDisplay = props => {
  let cards
  if (!props.waitingForPlayer) {
    cards = props.cards.map((card, index) => <img src={card.image} style={{height: '100px', width: '100px'}} key={index} />)
  } else if (props.waitingForPlayer && props.cards.length > 0) {
    cards = [<img src={props.cards[0].image} style={{height: '100px', width: '100px'}} key={0} />, <img src='images/back.png' style={{height: '100px', width: '70px', marginLeft: '10px'}} key={1} />]
  }

  return (
    <p>Dealer Cards: {cards}</p>
  )
}

export default DealerCardsDisplay
