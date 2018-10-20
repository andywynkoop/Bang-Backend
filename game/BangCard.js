const cardTypes = require('./CardTypes');

class BangCard {
  static allCards() {
    let mancatos = Array.apply(null, { length: 12 }).map(() => 1);
    let bangs = Array.apply(null, { length: 25 }).map(() => 2);
    let birras = Array.apply(null, { length: 6 }).map(() => 3);
    let catbalous = Array.apply(null, { length: 4 }).map(() => 4);
    let panicos = Array.apply(null, { length: 4 }).map(() => 5);

    let allCards = mancatos
      .concat(bangs)
      .concat(birras)
      .concat(catbalous)
      .concat(panicos)
    
    return allCards.map((id, idx) => {
      let card = cardTypes[id];
      card.id = idx;
      return card;
    });
  }
}

module.exports = BangCard;