import type { CardContainerDto } from '@/dto/card-container-dto.ts';
import type { CardContainerModel } from '@/model/card-container.model.ts';
import { CardDtoFactory } from '@/factory/card-dto-factory.ts';

export class CardContainerDtoFactory {
  public static fromCardContainer(cardContainer: CardContainerModel): CardContainerDto {
    return {
      id: cardContainer.id,
      title: cardContainer.title,
      cards: cardContainer.cards.map((card) => CardDtoFactory.fromCard(card)),
    };
  }

  public static fromCardContainers(cardContainers: CardContainerModel[]): CardContainerDto[] {
    return cardContainers.map((cardContainer) =>
      CardContainerDtoFactory.fromCardContainer(cardContainer),
    );
  }
}
