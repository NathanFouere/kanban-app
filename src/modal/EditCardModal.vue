<script setup lang="ts">
import { ref } from 'vue';
import { CardModel } from '@/model/card.model.js';
import { Store } from '@/store/store.ts';

const props = defineProps<{
  card: CardModel;
}>();

const isOpen = ref(false);
const title = ref(props.card.title);
const content = ref(props.card.content);

const submit = () => {
  Store.getInstance().editCard(props.card.id, title.value, content.value);
  isOpen.value = false;
};

const closeModal = () => {
  isOpen.value = false;
};
</script>

<template>
  <v-container>
    <v-btn color="primary" @click="isOpen = !isOpen"> Edit </v-btn>

    <v-dialog v-model="isOpen" persistent max-width="500px">
      <v-card>
        <v-card-title class="text-h5 text-center">Edit a card</v-card-title>
        <v-card-text>
          <v-text-field label="Title" v-model="title" outlined clearable></v-text-field>
          <v-textarea label="Content" v-model="content" outlined clearable></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" @click="closeModal"> Close </v-btn>
          <v-btn color="primary" @click="submit"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
