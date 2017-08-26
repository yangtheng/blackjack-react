import React, { Component } from 'react'
import {Deck, Dealer, Player} from './Classes'
import BetAmountDisplay from './BetAmountDisplay'
import BankrollDisplay from './BankrollDisplay'
import DealerCardsDisplay from './DealerCardsDisplay'
import DealerValueDisplay from './DealerValueDisplay'
import PlayerCardsDisplay from './PlayerCardsDisplay'
import PlayerValueDisplay from './PlayerValueDisplay'
// import './App.css'
let deck = new Deck(),
  player = new Player(),
  dealer = new Dealer()

class App extends Component {
  constructor () {
    super()
    this.state = {
      deck,
      dealer,
      player
    }
  }
  render () {
    // var cards = this.state.deck.cards.map((card, index) => <span key={index}>{card.type}{card.suit}</span>)
    let newGameButton,
      hitButton,
      standButton,
      betAmountInput

    if (this.state.player.inGame === false) {
      newGameButton = <button onClick={(e) => this.newGame(e)}>New Game</button>
      betAmountInput = <p> Insert Bet Amount: <input type='number' max={this.state.player.bankroll} min={0} onChange={(e) => this.setBetAmount(e)} /> </p>
    } else if (this.state.player.inGame === true) {
      hitButton = <button onClick={(e) => this.playerHit(e)}>Hit</button>
      standButton = <button onClick={(e) => this.playerStand(e)}>Stand</button>
    }
    return (
      <div>
        <PlayerCardsDisplay cards={this.state.player.cards} />
        <PlayerValueDisplay value={this.state.player.value} />
        <DealerCardsDisplay cards={this.state.dealer.cards} />
        <DealerValueDisplay value={this.state.dealer.value} />
        {newGameButton}{hitButton}{standButton}<br />
        {betAmountInput}
        <BetAmountDisplay betAmount={this.state.player.betAmount} />
        <BankrollDisplay bankroll={this.state.player.bankroll} />
      </div>
    )
  }

  setBetAmount (e) {
    if (!+e.target.value) player.betAmount = 0
    else if (+e.target.value < 0) player.betAmount = 0
    else if (this.state.player.bankroll < +e.target.value) player.betAmount = this.state.player.bankroll
    else player.betAmount = +e.target.value
    this.setState({
      player
    })
  }

  newGame (e) {
    if (!player.bet(this.state.player.betAmount)) return
    deck.shuffle()
    for (var i = 1; i <= 2; i++) {
      deck.deal(player)
      deck.deal(dealer)
    }
    player.value = player.checkValue()
    dealer.value = dealer.checkValue()
    player.toggleInGame()
    this.setState({
      player,
      dealer,
      deck
    })
  }

  // changeStatus (e) {
  //   player.toggleInGame()
  //   this.setState({
  //     player
  //   })
  // }

  // shuffleDeck (e) {
  //   deck.shuffle()
  //   this.setState({
  //     deck
  //   })
  // }
}

export default App
