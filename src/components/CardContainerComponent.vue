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
    class="ma-4 pa-4"
    @dragover="onDragOver"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @dragend="dropOnGoing = false"
    @drop="onDrop"
  >
    <v-card outlined>
      <v-card-title class="text-h5 text-center">{{ cardContainer.title }}</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col v-for="card in cardContainer.cards" :key="card.id" cols="12">
              <card-component
                :card="card"
                @stop-card-container-drop-animation="stopDragAnimation"
              />
            </v-col>
          </v-row>
          <v-row v-if="dropOnGoing">
            <v-col cols="12">
              <v-skeleton-loader type="card" elevation="24" class="mb-1" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <create-card-modal :card-container-id="cardContainer.id" />
      </v-card-actions>
    </v-card>
  </div>
</template>
