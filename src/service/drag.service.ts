import { CardSerializer } from '@/serializer/card.serializer.ts';
import type { CardModel } from '@/model/card.model.ts';

export class DragService {
  private static instance: DragService | null = null;

  private constructor() {}

  public static getInstance(): DragService {
    if (!DragService.instance) {
      DragService.instance = new DragService();
    }

    return DragService.instance;
  }

  public startDragCard(evt: DragEvent, card: CardModel) {
    if (evt.dataTransfer) {
      evt.dataTransfer.dropEffect = 'move';
      evt.dataTransfer.effectAllowed = 'move';
      const serializedCard = CardSerializer.serialize(card);

      evt.dataTransfer.setData('text/plain', serializedCard);
    }
  }
}
