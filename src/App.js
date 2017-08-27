import React, { Component } from 'react'
import {Deck, Dealer, Player} from './Classes'
import BetAmountDisplay from './BetAmountDisplay'
import BankrollDisplay from './BankrollDisplay'
import DealerCardsDisplay from './DealerCardsDisplay'
import DealerValueDisplay from './DealerValueDisplay'
import PlayerCardsDisplay from './PlayerCardsDisplay'
import PlayerValueDisplay from './PlayerValueDisplay'
import ResultDisplay from './ResultDisplay'
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
      betAmountInput = <p> Set Bet Amount: <input type='number' max={this.state.player.bankroll} min={0} onChange={(e) => this.setBetAmount(e)} /> </p>
    } else if (this.state.player.inGame === true) {
      hitButton = <button onClick={(e) => this.playerHit(e)}>Hit</button>
      standButton = <button onClick={(e) => this.playerStand(e)}>Stand</button>
    }

    return (
      <div>
        <PlayerCardsDisplay cards={this.state.player.cards} />
        <PlayerValueDisplay value={this.state.player.value} />
        <DealerCardsDisplay cards={this.state.dealer.cards} waitingForPlayer={this.state.dealer.waitingForPlayer} />
        <DealerValueDisplay value={this.state.dealer.value} waitingForPlayer={this.state.dealer.waitingForPlayer} />
        <ResultDisplay result={this.state.player.result} />
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
    else player.betAmount = Math.round(+e.target.value)
    this.setState({
      player
    })
  }

  newGame (e) {
    if (!player.bet(this.state.player.betAmount)) return
    player.result = ''
    player.cards = []
    dealer.cards = []
    deck = new Deck()
    dealer.toggleWaitingForPlayer()
    deck.shuffle()
    for (var i = 1; i <= 2; i++) {
      deck.deal(player)
      deck.deal(dealer)
    }
    player.value = player.checkValue()
    var playerBJ = player.checkBlackjack()
    dealer.value = dealer.checkValue()
    var dealerBJ = dealer.checkBlackjack()
    if (playerBJ && dealerBJ) player.setResult('push')
    else if (playerBJ) player.setResult('blackjack')
    else if (dealerBJ) player.setResult('lose')
    if (player.result === '') player.toggleInGame()
    else dealer.toggleWaitingForPlayer()
    this.setState({
      player,
      dealer,
      deck
    })
  }

  playerHit (e) {
    deck.deal(player)
    player.value = player.checkValue()
    if (player.value > 21) {
      player.setResult('lose')
      player.toggleInGame()
      dealer.toggleWaitingForPlayer()
    }
    this.setState({
      player,
      dealer,
      deck
    })
  }

  playerStand (e) {
    dealer.toggleWaitingForPlayer()
    while (dealer.value < 17) {
      deck.deal(dealer)
      dealer.value = dealer.checkValue()
    }
    if (dealer.value > 21 || dealer.value < player.value) {
      player.setResult('win')
    } else if (dealer.value > player.value) {
      player.setResult('lose')
    } else if (dealer.value === player.value) {
      player.setResult('push')
    }
    player.toggleInGame()
    this.setState({
      player,
      dealer,
      deck
    })
  }
}

export default App
