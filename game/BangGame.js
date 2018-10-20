const BangCard = require('./BangCard');
const Roles = require('./Roles');
const Characters = require('./Characters');
const BangTurn = require('./BangTurn');

class BangGame {
  constructor(mongooseGame, deck = BangCard.allCards()) {
    const { started, finished, players } = mongooseGame;
    Object.assign(this, { started, finished, players, deck });
    this.playerIds = players.map(p => p._id);
  }

  start() {
    this.started = true;
    this.assignPlayerRoles();
    this.assignPlayerCharacters();
    this.assignPlayerBullets();
    this.dealPlayerCards();
    this.createFirstTurn();
  }

  shuffle(array) {
    let n = array.length;
    let shuff = array.slice(0);
    for (let i = 0; i < n; i++) {
      let randIdx = Math.floor(Math.random() * n);
      let p1 = shuff[i];
      shuff[i] = shuff[randIdx];
      shuff[randIdx] = p1;
    }
    return shuff;
  }

  assignPlayerRoles() {
    let numPlayers = this.players.length;
    let roleIds = [1, 2, 4, 4];
    for (let i = roleIds.length; i < numPlayers; i ++) {
      if (i % 2 === 0) {
        roleIds.push(3);
      } else {
        roleIds.push(4);
      }
    }

    roleIds = this.shuffle(roleIds);
    this.players.forEach(player => {
      player.role = Roles[roleIds.shift()];
    });
  }

  assignPlayerCharacters() {
    let numPlayers = this.players.length;
    let allCharacters = this.shuffle(Object.values(Characters));
    let gameCharacters = allCharacters.slice(numPlayers);
    this.players.forEach(player => {
      player.character = gameCharacters.shift();
    });
  }

  assignPlayerBullets() {
    this.players.forEach(player => {
      if (player.role === "Sheriff") {
        player.bullets = 5;
      } else {
        player.bullets = player.character.bullets;
      }
    });
  }

  dealPlayerCards() {
    let shuffled = this.shuffle(this.deck);
    this.players.forEach(player => {
      let cards = [];
      for (let i = 0; i < player.bullets; i++) {
        cards.push(shuffled.shift());
      }
      player.cards = cards;
    });
  }

  createFirstTurn() {
    let numPlayers = this.players.length;
    let randIdx = Math.floor(Math.random() * numPlayers);
    let startingPlayer = this.players[randIdx];
    this.turn = new BangTurn({ game: this, player: startingPlayer, playerIdx: randIdx });
  }

  nextTurn() {
    let prevIdx = this.turn.playerIdx;
    nextIdx = prevIdx + 1;
    if (nextIdx >= this.players.length) nextIdx = 0;
    nextPlayer = this.players[nextIdx];
    this.turn = new BangTurn({ game: this, player: nextPlayer, playerIdx: nextIdx });
  }

  async persistPlayerData() {
    return new Promise((resolve) => {
      let n = 0;
      let _fn = () => {
        n++;
        if (n === this.players.length) {
          resolve({ players: this.players, turn: this.turn });
        } 
      }
      this.players.forEach(async player => {
        player = await player.save();
        _fn();
      });
    })
  }

}

module.exports = BangGame;