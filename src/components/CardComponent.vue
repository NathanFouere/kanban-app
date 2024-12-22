<script setup lang="ts">
import { CardModel } from '@/model/card.model.ts';
import { DragService } from '@/service/drag.service.ts';
import { Store } from '@/store/store.ts';
import EditCardModal from '@/modal/EditCardModal.vue';
import { CardSerializer } from '@/serializer/card.serializer.ts';
import { ref, watch } from 'vue';

const props = defineProps<{
  card: CardModel;
}>();

const store = Store.getInstance();

const emit = defineEmits<{
  (event: 'stopCardContainerDropAnimation'): void;
}>();

const dropOnGoing = ref(false); // solution from : https://stackoverflow.com/questions/7110353/html5-dragleave-fired-when-hovering-a-child-element
const dragOnCounter = ref(0);

watch(dragOnCounter, (newValue) => {
  dropOnGoing.value = newValue !== 0;
});
const onDrop = (event: DragEvent) => {
  if (!event.dataTransfer) return;

  event.stopPropagation(); // Prevents onDrop from being called on the parent element

  const deserializedMovedCard = CardSerializer.deserialize(
    event.dataTransfer.getData('text/plain'),
  );

  store.moveCard(deserializedMovedCard, props.card.cardContainerId, props.card.position);
  dragOnCounter.value = 0;

  emit('stopCardContainerDropAnimation');
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

const startDragCard = (event: DragEvent) => {
  DragService.getInstance().startDragCard(event, props.card);
};
</script>

<template>
  <div
    draggable="true"
    @dragover="onDragOver"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @drop="onDrop"
    @dragstart="startDragCard($event)"
  >
    <div v-if="dropOnGoing" class="w-full h-28 bg-gray-300 opacity-50 my-3" />
    <div class="p-3 rounded-md shadow-sm hover:shadow-md transition-shadow border-b border">
      <div class="border-b-[2px]">
        <h1>{{ card.title }}</h1>
      </div>
      <p>{{ card.content }}</p>
      <div class="flex-1 flex justify-between">
        <edit-card-modal :card="card" />
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="Store.getInstance().deleteCard(card)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
