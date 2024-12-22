<script setup lang="ts">
import CardContainerComponent from '@/components/CardContainerComponent.vue';
import { Store } from '@/store/store.ts';
import { onMounted } from 'vue';
import CreateCardModal from '@/modal/CreateCardContainerModal.vue';

const store = Store.getInstance();
onMounted(() => {
  store.getCardContainers();
});
</script>

<template>
  <v-container>
    <v-row cols="12">
      <v-col
        v-for="cardContainer in store.storeContent.value.cardContainers"
        :key="cardContainer.id"
      >
        <card-container-component :card-container="cardContainer" />
      </v-col>
      <create-card-modal />
    </v-row>
  </v-container>
</template>
