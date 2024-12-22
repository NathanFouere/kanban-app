import { CardModel } from '@/model/card.model.ts';

export class CardContainerModel {
  public id: number;
  public title: string;
  public cards: CardModel[];

  constructor(title: string) {
    this.id = Math.floor(Math.random() * 100);
    this.cards = [];
    this.title = title;
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

  getSortedCards(): CardModel[] {
    return this.cards.sort((a, b) => a.position - b.position);
  }

  updateCardPositions(positionToMoveFrom: number) {
    this.cards
      .filter((card) => card.position < positionToMoveFrom)
      .forEach((card) => {
        card.position -= 1;
      });

    this.cards
      .filter((card) => card.position >= positionToMoveFrom)
      .forEach((card) => {
        card.position += 1;
      });
  }
}
