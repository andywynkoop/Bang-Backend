const Roles = require('./Roles');
const Characters = require('./Characters');

class BangGame {
  constructor(mongooseGame, deck = [1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,2,2,2,2,3,3,3,3]) {
    const { started, finished, players } = mongooseGame;
    Object.assign(this, { started, finished, players, deck });
  }

  start() {
    this.started = true;
    this.assignPlayerRoles();
    this.assignPlayerCharacters();
    this.assignPlayerBullets();
    this.dealPlayerCards();
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
    this.players.forEach(player => {
      for (let i = 0; i < player.bullets; i++) {
        player.cards = player.cards || [];
        player.cards.push(this.deck.shift());
      }
    });
  }

  async persistPlayerData() {
    return new Promise((resolve) => {
      let n = 0;
      let _fn = () => {
        n++;
        if (n === this.players.length) {
          resolve(this.players);
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