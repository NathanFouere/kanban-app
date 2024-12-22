<script setup lang="ts">
import { ref } from 'vue';
import { Store } from '@/store/store.ts';

const props = defineProps<{
  cardContainerId: number;
}>();

const isOpen = ref(false);
const title = ref('');
const content = ref('');

const submit = () => {
  Store.getInstance().createCard(title.value, content.value, props.cardContainerId);
  isOpen.value = false;
};

const closeModal = () => {
  isOpen.value = false;
};
</script>

<template>
  <div class="text-center py-4">
    <v-btn color="primary" @click="isOpen = !isOpen"> Create a card </v-btn>
  </div>

  <v-dialog v-model="isOpen" persistent max-width="400px">
    <v-card>
      <v-card-title class="text-h5 text-center">Create a card</v-card-title>

      <v-card-text>
        <v-text-field
          label="Title"
          v-model="title"
          outlined
          clearable
          placeholder="Enter a title..."
        ></v-text-field>
        <v-textarea
          label="Content"
          v-model="content"
          outlined
          clearable
          placeholder="Enter content..."
        ></v-textarea>
      </v-card-text>

      <v-card-actions>
        <v-btn color="secondary" @click="closeModal">Close</v-btn>
        <v-btn color="primary" @click="submit">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
