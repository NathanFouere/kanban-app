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
  event.stopPropagation(); // Prevents onDrop from being called on the parent element
  if (!event.dataTransfer) return;

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
    class="mb-3"
    draggable="true"
    @dragover="onDragOver"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @drop="onDrop"
    @dragstart="startDragCard($event)"
  >
    <v-skeleton-loader type="card" elevation="24" class="mb-1" v-if="dropOnGoing" />
    <v-card outlined>
      <v-card-title>
        <span>{{ card.title }}</span>
      </v-card-title>

      <v-card-text>
        <p>{{ card.content }}</p>
      </v-card-text>

      <v-card-actions>
        <edit-card-modal :card="card" />
        <v-btn color="error" @click="Store.getInstance().deleteCard(card)"> Delete </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
