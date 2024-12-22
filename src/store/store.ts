import { CardContainerRepository } from '@/repository/card-container.repository.ts';
import { ref } from 'vue';
import type { StoreContentModel } from '@/store/store-content.model.ts';
import { CardModel } from '@/model/card.model.ts';
import { CardContainerDtoFactory } from '@/factory/card-container-dto-factory.ts';
import type { CardDto } from '@/dto/card-dto.ts';
export class Store {
  private static instance: Store | null = null;
  public storeContent = ref<StoreContentModel>({
    cardContainers: [],
  });

  private constructor() {}

  public static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  public getCardContainers(): void {
    const cardContainers = CardContainerRepository.getInstance().getCardContainers();
    const cardContainersDto = CardContainerDtoFactory.fromCardContainers(cardContainers);
    this.storeContent.value.cardContainers = cardContainersDto;
  }

  public moveCard(
    card: CardDto,
    newCardContainerId: number,
    targetCardPosition: number | null = null,
  ): void {
    CardContainerRepository.getInstance().moveCard(
      card.id,
      card.cardContainerId,
      newCardContainerId,
      targetCardPosition,
    );
    this.getCardContainers();
  }

  public deleteCard(card: CardModel): void {
    CardContainerRepository.getInstance().deleteCard(card.id, card.cardContainerId);
    this.getCardContainers();
  }

  public editCard(cardId: number, cardTitle: string, cardContent: string): void {
    CardContainerRepository.getInstance().saveCard(cardId, cardTitle, cardContent);
    this.getCardContainers();
  }

  public createCard(cardTitle: string, cardContent: string, containerId: number): void {
    const cardContainer = CardContainerRepository.getInstance().getCardContainer(containerId);
    const card = new CardModel(cardTitle, cardContent, containerId, cardContainer.cards.length);
    cardContainer.addCard(card);
    this.getCardContainers();
  }

  public createCardContainer(title: string): void {
    CardContainerRepository.getInstance().createCardContainer(title);
    this.getCardContainers();
    console.log(this.storeContent.value.cardContainers);
  }
}
