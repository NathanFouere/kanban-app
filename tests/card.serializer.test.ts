import { describe, it, expect } from 'vitest';
import { CardDto } from '../src/dto/card-dto';
import { CardSerializer } from '../src/serializer/card.serializer';

describe('CardSerializer', () => {
  const mockCard: CardDto = {
    id: 1,
    title: 'Test Card',
    content: 'This is a test card',
    cardContainerId: 10,
    position: 2,
  };

  it('should serialize a card into a JSON string', () => {
    const serializedCard = CardSerializer.serialize(mockCard);

    expect(serializedCard).toBe(
      JSON.stringify({
        id: mockCard.id,
        title: mockCard.title,
        content: mockCard.content,
        cardContainerId: mockCard.cardContainerId,
      }),
    );
  });

  it('should deserialize a JSON string into a CardDto', () => {
    const serializedCard = JSON.stringify({
      id: 1,
      title: 'Test Card',
      content: 'This is a test card',
      cardContainerId: 10,
      position: 2,
    });

    const deserializedCard = CardSerializer.deserialize(serializedCard);

    expect(deserializedCard).toEqual({
      id: 1,
      title: 'Test Card',
      content: 'This is a test card',
      cardContainerId: 10,
      position: 2,
    });
  });
});
