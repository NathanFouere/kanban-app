import { CardContainerModel } from '@/model/card-container.model.ts';
import { CardModel } from '@/model/card.model.ts';

export class CardContainerRepository {
  private static instance: CardContainerRepository | null = null;
  private readonly cardContainers: CardContainerModel[] = [];

  private constructor() {
    const cc1 = new CardContainerModel('to do');
    cc1.addCard(new CardModel('Card 1', 'Card content 1', 1, 1));
    cc1.addCard(new CardModel('Card 2', 'Card content 2', 1, 2));
    cc1.addCard(new CardModel('Card 3', 'Card content 3', 1, 3));
    cc1.addCard(new CardModel('Card 4', 'Card content 4', 1, 4));
    cc1.addCard(new CardModel('Card 5', 'Card content 5', 1, 5));
    cc1.addCard(new CardModel('Card 6', 'Card content 6', 1, 6));
    cc1.addCard(new CardModel('Card 7', 'Card content 7', 1, 7));
    cc1.addCard(new CardModel('Card 8', 'Card content 8', 1, 8));

    const cc2 = new CardContainerModel('working on');
    cc2.addCard(new CardModel('Card 9', 'Card content 9', 2, 1));
    cc2.addCard(new CardModel('Card 10', 'Card content 10', 2, 2));
    cc2.addCard(new CardModel('Card 11', 'Card content 11', 2, 3));
    cc2.addCard(new CardModel('Card 12', 'Card content 12', 2, 4));
    cc2.addCard(new CardModel('Card 13', 'Card content 13', 2, 5));
    cc2.addCard(new CardModel('Card 14', 'Card content 14', 2, 6));
    cc2.addCard(new CardModel('Card 15', 'Card content 15', 2, 7));
    cc2.addCard(new CardModel('Card 16', 'Card content 16', 2, 8));

    const cc3 = new CardContainerModel('done');
    cc3.addCard(new CardModel('Card 17', 'Card content 17', 3, 1));
    cc3.addCard(new CardModel('Card 18', 'Card content 18', 3, 2));
    cc3.addCard(new CardModel('Card 19', 'Card content 19', 3, 3));
    cc3.addCard(new CardModel('Card 20', 'Card content 20', 3, 4));
    cc3.addCard(new CardModel('Card 21', 'Card content 21', 3, 5));
    cc3.addCard(new CardModel('Card 22', 'Card content 22', 3, 6));
    cc3.addCard(new CardModel('Card 23', 'Card content 23', 3, 7));
    cc3.addCard(new CardModel('Card 24', 'Card content 24', 3, 8));
    this.cardContainers.push(cc1, cc2, cc3);
  }

  public static getInstance(): CardContainerRepository {
    if (!CardContainerRepository.instance) {
      CardContainerRepository.instance = new CardContainerRepository();
    }
    return CardContainerRepository.instance;
  }

  public getCardContainers(): CardContainerModel[] {
    return this.cardContainers.map((container) => {
      container.cards = container.getSortedCards();
      return container;
    });
  }

  public getCardContainer(id: number): CardContainerModel {
    const cardContainer = this.cardContainers.find((container) => container.id === id);
    if (!cardContainer) {
      throw new Error('Card container not found');
    }

    return cardContainer;
  }

  public getCard(id: number): CardModel {
    for (const container of this.cardContainers) {
      const card = container.cards.find((c) => c.id === id);

      if (card) {
        return card;
      }
    }

    throw new Error('Card not found');
  }

  public moveCard(
    cardId: number,
    originalContainerId: number,
    newContainerId: number,
    targetCardPosition: number | null = null,
  ) {
    const parentCard = this.getCardContainer(originalContainerId);
    const newParent = this.getCardContainer(newContainerId);
    const card = this.getCard(cardId);
    if (targetCardPosition != null) {
      this.changeCardContainerPositions(newContainerId, targetCardPosition);

      card.position = targetCardPosition;
    }
    console.log('new card position', card.position);
    console.log('target card position', targetCardPosition);
    parentCard.removeCard(cardId);
    newParent.addCard(card);
    console.log(this.getCardContainers());
  }

  public deleteCard(cardId: number, cardContainerId: number) {
    const parentCard = this.getCardContainer(cardContainerId);
    parentCard.removeCard(cardId);
  }

  public changeCardContainerPositions(cardContainerId: number, positionToMoveFrom: number) {
    const cardContainer = this.getCardContainer(cardContainerId);
    cardContainer.updateCardPositions(positionToMoveFrom);
    for (const card of cardContainer.cards) {
      this.saveCard(card.id, card.title, card.content, card.position);
    }
  }

  public saveCard(
    cardId: number,
    cardTitle: string,
    cardContent: string,
    cardPosition: number | null = null,
  ) {
    const inMemoryCard = this.getCard(cardId);
    inMemoryCard.title = cardTitle;
    inMemoryCard.content = cardContent;
    if (cardPosition) {
      inMemoryCard.position = cardPosition;
    }
  }

  public createCardContainer(title: string): void {
    this.cardContainers.push(new CardContainerModel(title));
  }
}
