<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue';
import { CardSerializer } from '@/serializer/card.serializer.ts';
import CreateCardModal from '@/modal/CreateCardModal.vue';
import { Store } from '@/store/store.ts';
import type { CardContainerDto } from '@/dto/card-container-dto.ts';

const props = defineProps<{
  cardContainer: CardContainerDto;
}>();

const store = Store.getInstance();
const onDrop = (event: DragEvent) => {
  if (!event.dataTransfer) return;
  const test = CardSerializer.deserialize(event.dataTransfer.getData('text/plain'));
  store.moveCard(test, props.cardContainer);
};

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
};
</script>

<template>
  <div class="flex flex-col border-2 border-black" @dragover="onDragOver" @drop="onDrop">
    <card-component v-for="card in cardContainer.cards" :key="card.id" :card="card" />
    <create-card-modal :card-container-id="cardContainer.id" />
  </div>
</template>
