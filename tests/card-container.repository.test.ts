import { describe, it, expect, beforeEach } from 'vitest';
import { CardModel } from '../src/model/card.model';
import { CardContainerRepository } from '../src/repository/card-container.repository';
import { CardContainerModel } from '../src/model/card-container.model';

describe('CardContainerRepository', () => {
  let repository: CardContainerRepository;
  let customContainer1: CardContainerModel;
  let customContainer2: CardContainerModel;

  beforeEach(() => {
    repository = CardContainerRepository.getInstance();
    repository.clearCardContainers();

    customContainer1 = new CardContainerModel('Custom To Do');
    customContainer2 = new CardContainerModel('Custom In Progress');

    customContainer1.addCard(new CardModel('Custom Card 1', 'Content 1', customContainer1.id, 1));
    customContainer1.addCard(new CardModel('Custom Card 2', 'Content 2', customContainer1.id, 2));
    customContainer2.addCard(new CardModel('Custom Card 3', 'Content 3', customContainer2.id, 1));

    repository['cardContainers'].push(customContainer1, customContainer2);
  });

  it('should retrieve all card containers', () => {
    const containers = repository.getCardContainers();
    expect(containers.length).toBe(2);
    expect(containers[0].title).toBe('Custom To Do');
    expect(containers[1].title).toBe('Custom In Progress');
  });

  it('should retrieve a card container by ID', () => {
    const container = repository.getCardContainer(customContainer1.id);
    expect(container).toBeDefined();
    expect(container.title).toBe('Custom To Do');
  });

  it('should retrieve a card by ID', () => {
    const card = repository.getCard(customContainer1.cards[0].id);
    expect(card).toBeDefined();
    expect(card.title).toBe('Custom Card 1');
  });

  it('should move a card from one container to another', () => {
    const cardToMove = customContainer1.cards[0];
    repository.moveCard(cardToMove.id, customContainer1.id, customContainer2.id, 2);

    const originalContainerCards = customContainer1.cards;
    const targetContainerCards = customContainer2.cards;

    expect(originalContainerCards.find((c) => c.id === cardToMove.id)).toBeUndefined();
    expect(targetContainerCards.find((c) => c.id === cardToMove.id)).toBeDefined();
    expect(targetContainerCards.find((c) => c.id === cardToMove.id)?.position).toBe(2);
  });

  it('should delete a card from a container', () => {
    const cardToDelete = customContainer1.cards[0];
    repository.deleteCard(cardToDelete.id, cardToDelete.cardContainerId);

    const containerCards = customContainer1.cards;
    expect(containerCards.find((c) => c.id === cardToDelete.id)).toBeUndefined();
  });

  it('should save changes to a card', () => {
    const card = customContainer1.cards[0];
    repository.saveCard(card.id, 'Updated Title', 'Updated Content', 5);

    const updatedCard = repository.getCard(card.id);
    expect(updatedCard.title).toBe('Updated Title');
    expect(updatedCard.content).toBe('Updated Content');
    expect(updatedCard.position).toBe(5);
  });
});
