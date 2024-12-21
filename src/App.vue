<script setup lang="ts">
import CardContainerComponent from '@/components/CardContainerComponent.vue';
import { Store } from '@/store/store.ts';
import { onMounted } from 'vue';

const store = Store.getInstance();
onMounted(() => {
  store.getCardContainers();
});
</script>

<template>
  <div class="flex flex-row gap-4 m-8">
    <card-container-component
      v-for="cardContainer in store.storeContent.value.cardContainers"
      :key="cardContainer.id"
      :card-container="cardContainer"
    />
    <button @click="Store.getInstance().createCardContainer()">Create card container</button>
  </div>
</template>
