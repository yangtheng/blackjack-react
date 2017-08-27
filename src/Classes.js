export class Card {
  constructor (type, value, suit) {
    this.type = type
    this.value = value
    this.suit = suit
  }
}

export class Deck {
  constructor () {
    this.types = ['A','2','3','4','5','6','7','8','9','T','J','Q','K']
    this.value = [11,2,3,4,5,6,7,8,9,10,10,10,10]
    this.suit = ['h','s','c','d']
    this.cards = []
    for (var i = 0; i < this.types.length; i++) {
      for (var j = 0; j < this.suit.length; j++) {
        this.cards.push(new Card(this.types[i], this.value[i], this.suit[j]))
      }
    }
  }
  shuffle () {
    for (var i = this.cards.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1))
      var temp = this.cards[i]
      this.cards[i] = this.cards[j]
      this.cards[j] = temp
    }
  }
  deal (player) {
    var card = this.cards.shift()
    player.cards.push(card)
  }
}

export class Dealer {
  constructor () {
    this.cards = []
    this.value = null
    this.waitingForPlayer = false
  }

  checkValue () {
    var cardValue = 0
    var aceCards = this.cards.filter(card => card.type === 'A')
    for (var cardNo = 0; cardNo < this.cards.length; cardNo++) {
      cardValue += this.cards[cardNo].value
    }
    if (cardValue > 21 && aceCards.length > 0) {
      while (cardValue > 21 && aceCards.length > 0) {
        cardValue -= 10
        aceCards.pop()
      }
    }
    return cardValue
  }

  checkBlackjack () {
    if (this.value === 21 && this.cards.length === 2) {
      this.value = 'Blackjack!'
      return true
    } else return false
  }

  toggleWaitingForPlayer () {
    this.waitingForPlayer = !this.waitingForPlayer
  }
}

export class Player {
  constructor () {
    this.cards = []
    this.value = null
    this.result = ''
    this.bankroll = 50000
    this.betAmount = 0
    this.inGame = false
  }

  toggleInGame () {
    this.inGame = !this.inGame
  }

  bet (amount) {
    if (amount < 1) {
      alert('Please bet more than $0!')
      return false
    } else if (amount > 0) {
      this.bankroll -= this.betAmount
      return true
    }
  }

  double () {
    if (this.bankroll >= this.betAmount) {
      this.bankroll -= this.betAmount
      this.betAmount = this.betAmount * 2
      return true
    } else {
      return false
    }
  }

  split () {

  }

  surrender () {
    this.bankroll -= this.betAmount / 2
  }

  checkValue () {
    var cardValue = 0
    var aceCards = this.cards.filter(card => card.type === 'A')
    for (var cardNo = 0; cardNo < this.cards.length; cardNo++) {
      cardValue += this.cards[cardNo].value
    }
    if (cardValue > 21 && aceCards.length > 0) {
      while (cardValue > 21 && aceCards.length > 0) {
        cardValue -= 10
        aceCards.pop()
      }
    }
    return cardValue
  }

  checkBlackjack () {
    if (this.value === 21 && this.cards.length === 2) {
      this.value = 'Blackjack!'
      return true
    } else return false
  }

  setResult (result) {
    if (result === 'win') {
      this.bankroll += this.betAmount * 2
    } else if (result === 'push') {
      this.bankroll += this.betAmount
    } else if (result === 'blackjack') {
      this.bankroll += this.betAmount * 2.5
    }
    this.result = result
  }
}
