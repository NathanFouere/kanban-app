import type { CardDto } from '@/dto/card-dto.ts';

export class CardSerializer {
  public static serialize(card: CardDto): string {
    return JSON.stringify({
      id: card.id,
      title: card.title,
      content: card.content,
      cardContainerId: card.cardContainerId,
    });
  }

  public static deserialize(serializedCard: string): CardDto {
    const card = JSON.parse(serializedCard);
    return {
      id: card.id,
      title: card.title,
      content: card.content,
      cardContainerId: card.cardContainerId,
      position: card.position,
    };
  }
}
