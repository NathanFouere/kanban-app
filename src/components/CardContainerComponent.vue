<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue';
import { CardSerializer } from '@/serializer/card.serializer.ts';
import { Store } from '@/store/store.ts';
import type { CardContainerDto } from '@/dto/card-container-dto.ts';
import CreateCardModal from '@/modal/CreateCardModal.vue';
import { ref, watch } from 'vue';

const props = defineProps<{
  cardContainer: CardContainerDto;
}>();

const store = Store.getInstance();
const dropOnGoing = ref(false); // solution from : https://stackoverflow.com/questions/7110353/html5-dragleave-fired-when-hovering-a-child-element
const dragOnCounter = ref(0);

watch(dragOnCounter, (newValue) => {
  dropOnGoing.value = newValue !== 0;
});
const onDrop = (event: DragEvent) => {
  if (!event.dataTransfer) return;

  const deserializedMovedCard = CardSerializer.deserialize(
    event.dataTransfer.getData('text/plain'),
  );

  store.moveCard(deserializedMovedCard, props.cardContainer.id);
  dragOnCounter.value = 0;
};

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
};

const onDragEnter = () => {
  dragOnCounter.value += 1;
};

const onDragLeave = () => {
  dragOnCounter.value -= 1;
};

const stopDragAnimation = () => {
  dragOnCounter.value = 0;
};
</script>

<template>
  <div
    class="flex flex-col w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4 m-4"
    @dragover="onDragOver"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @dragend="dropOnGoing = false"
    @drop="onDrop"
  >
    <h1 class="text-lg font-bold text-center text-gray-800 border-b pb-2 mb-4">
      {{ cardContainer.title }}
    </h1>

    <div class="space-y-3">
      <card-component
        v-for="card in cardContainer.cards"
        :key="card.id"
        :card="card"
        @stop-card-container-drop-animation="stopDragAnimation"
      />
      <div v-if="dropOnGoing" class="w-full h-28 bg-gray-300 opacity-50 my-3" />
    </div>

    <create-card-modal :card-container-id="cardContainer.id" />
  </div>
</template>
