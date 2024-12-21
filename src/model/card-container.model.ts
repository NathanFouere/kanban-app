import { CardModel } from '@/model/card.model.ts';

export class CardContainerModel {
  public id: number;
  public cards: CardModel[];

  constructor() {
    this.id = Math.floor(Math.random() * 100);
    this.cards = [];
  }

  addCard(card: CardModel) {
    card.cardContainerId = this.id;
    this.cards.push(card);
  }

  removeCard(cardId: number) {
    const cardIndex = this.cards.findIndex((card) => card.id === cardId);
    if (cardIndex === -1) {
      throw new Error('Card not found');
    }
    this.cards.splice(cardIndex, 1);
  }
}
