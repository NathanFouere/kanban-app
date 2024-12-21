<script setup lang="ts">
import { CardModel } from '@/model/card.model.ts';
import { DragService } from '@/service/drag.service.ts';
import { Store } from '@/store/store.ts';
import EditCardModal from '@/modal/EditCardModal.vue';

defineProps<{
  card: CardModel;
}>();
</script>

<template>
  <div
    class="border-2 border-black m-1"
    draggable="true"
    @dragstart="DragService.getInstance().startDragCard($event, card)"
  >
    <div class="border-b-[2px]">
      <h1>{{ card.title }}</h1>
    </div>
    <p>{{ card.content }}</p>
    <edit-card-modal :card="card" />
    <button @click="Store.getInstance().deleteCard(card)">Delete</button>
  </div>
</template>
