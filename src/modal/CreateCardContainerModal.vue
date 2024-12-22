<script setup lang="ts">
import { ref } from 'vue';
import { Store } from '@/store/store.ts';

const isOpen = ref(false);
const title = ref('');

const submit = () => {
  Store.getInstance().createCardContainer(title.value);
  isOpen.value = false;
};

const closeModal = () => {
  isOpen.value = false;
};
</script>

<template>
  <div>
    <v-btn color="primary" class="ma-10" @click="isOpen = !isOpen">
      Create new card container
    </v-btn>

    <v-dialog v-model="isOpen" persistent max-width="400px">
      <v-card>
        <v-card-title class="text-h5">Create a card container</v-card-title>
        <v-card-text>
          <v-text-field label="Title" v-model="title" outlined clearable></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" @click="closeModal">Close</v-btn>
          <v-btn color="primary" @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
