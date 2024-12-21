import { CardContainerRepository } from '@/repository/card-container.repository.ts';
import { ref } from 'vue';
import type { StoreContentModel } from '@/store/store-content.model.ts';
import { CardModel } from '@/model/card.model.ts';
import { CardContainerDtoFactory } from '@/factory/card-container-dto-factory.ts';
import type { CardDto } from '@/dto/card-dto.ts';
import type { CardContainerDto } from '@/dto/card-container-dto.ts';
import { CardContainerModel } from '@/model/card-container.model.ts';

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

  public moveCard(card: CardDto, newParent: CardContainerDto): void {
    CardContainerRepository.getInstance().moveCard(card.id, card.cardContainerId, newParent.id);
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
    const card = new CardModel(cardTitle, cardContent, containerId);
    const cardContainer = CardContainerRepository.getInstance().getCardContainer(containerId);
    cardContainer.addCard(card);
    this.getCardContainers();
  }

  public createCardContainer(): void {
    CardContainerRepository.getInstance().getCardContainers().push(new CardContainerModel());
    this.getCardContainers();
  }
}
