import type { CardModel } from '@/model/card.model.ts';
import type { CardDto } from '@/dto/card-dto.ts';

export class CardDtoFactory {
  public static fromCard(card: CardModel): CardDto {
    return {
      id: card.id,
      title: card.title,
      content: card.content,
      cardContainerId: card.cardContainerId,
    };
  }
}
