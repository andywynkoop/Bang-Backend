class BangTurn {
  constructor(mongooseTurn) {
    const { game, player, playerIdx } = mongooseTurn;
    Object.assign(this, { game, player, playerIdx });
    this.bangs = 0;
  }

  canEnd() {
    return this.player.cards.length === this.player.bullets;
  }

  draw() {
    let { cards } = this.player;
    let { deck } = this.game;
    cards.push(deck.shift());
    cards.push(deck.shift());
    this.player.cards = cards;
  }

  discard(card) {
    const { cards } = this.player;
    cards.filter(card => card.id === card.id);
    this.player.cards = cards;
    this.game.deck.push(card);
  }

  end() {
    if (this.canEnd()) {
      this.game.nextTurn();
      return true;
    } else {
      return false;
    }
  }

  // canPlayBang() {
  //   return this.bangs === 0
  // }

  // canReachPlayer(otherPlayer) {

  // }

  // distanceTo(otherPlayerId) {
  //   const arr = this.game.playerIds;
  //   let playerIdx = arr.indexOf(this.player._id);
  //   let otherIdx = arr.indexOf(otherPlayerId);

  // }

  // bang(targetPlayer) {

  // }

  // discard(card) {

  // }

}

module.exports = BangTurn;