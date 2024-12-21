import { CardContainerModel } from '@/model/card-container.model.ts';
import { CardModel } from '@/model/card.model.ts';

export class CardContainerRepository {
  private static instance: CardContainerRepository | null = null;
  private cardContainers: CardContainerModel[] = [];

  private constructor() {
    const cc1 = new CardContainerModel();
    cc1.addCard(new CardModel('Card 1', 'Card content 1', 1));
    cc1.addCard(new CardModel('Card 2', 'Card content 2', 1));
    cc1.addCard(new CardModel('Card 3', 'Card content 3', 1));
    cc1.addCard(new CardModel('Card 4', 'Card content 4', 1));
    cc1.addCard(new CardModel('Card 5', 'Card content 5', 1));
    cc1.addCard(new CardModel('Card 6', 'Card content 6', 1));
    cc1.addCard(new CardModel('Card 7', 'Card content 7', 1));
    cc1.addCard(new CardModel('Card 8', 'Card content 8', 1));

    const cc2 = new CardContainerModel();
    cc2.addCard(new CardModel('Card 9', 'Card content 9', 2));
    cc2.addCard(new CardModel('Card 10', 'Card content 10', 2));
    cc2.addCard(new CardModel('Card 11', 'Card content 11', 2));
    cc2.addCard(new CardModel('Card 12', 'Card content 12', 2));
    cc2.addCard(new CardModel('Card 13', 'Card content 13', 2));
    cc2.addCard(new CardModel('Card 14', 'Card content 14', 2));
    cc2.addCard(new CardModel('Card 15', 'Card content 15', 2));
    cc2.addCard(new CardModel('Card 16', 'Card content 16', 2));

    const cc3 = new CardContainerModel();
    cc3.addCard(new CardModel('Card 17', 'Card content 17', 3));
    cc3.addCard(new CardModel('Card 18', 'Card content 18', 3));
    cc3.addCard(new CardModel('Card 19', 'Card content 19', 3));
    cc3.addCard(new CardModel('Card 20', 'Card content 20', 3));
    cc3.addCard(new CardModel('Card 21', 'Card content 21', 3));
    cc3.addCard(new CardModel('Card 22', 'Card content 22', 3));
    cc3.addCard(new CardModel('Card 23', 'Card content 23', 3));
    cc3.addCard(new CardModel('Card 24', 'Card content 24', 3));
    this.cardContainers.push(cc1, cc2, cc3);
  }

  public static getInstance(): CardContainerRepository {
    if (!CardContainerRepository.instance) {
      CardContainerRepository.instance = new CardContainerRepository();
    }
    return CardContainerRepository.instance;
  }

  public getCardContainers(): CardContainerModel[] {
    return this.cardContainers;
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

  public moveCard(cardId: number, originalContainerId: number, newContainerId: number) {
    const parentCard = this.getCardContainer(originalContainerId);
    const newParent = this.getCardContainer(newContainerId);
    const card = this.getCard(cardId);
    parentCard.removeCard(cardId);
    newParent.addCard(card);
  }

  public deleteCard(cardId: number, cardContainerId: number) {
    const parentCard = this.getCardContainer(cardContainerId);
    parentCard.removeCard(cardId);
  }

  public saveCard(cardId: number, cardTitle: string, cardContent: string) {
    const inMemoryCard = this.getCard(cardId);
    inMemoryCard.title = cardTitle;
    inMemoryCard.content = cardContent;
  }
}
