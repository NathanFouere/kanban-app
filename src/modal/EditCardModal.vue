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
  <div>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="isOpen = !isOpen"
    >
      Edit
    </button>
  </div>
  <div
    v-if="isOpen"
    class="bg-transparent z-9999 fixed w-full h-full top-0 left-0 backdrop-blur-sm"
  >
    <div>
      <div class="w-72 mx-auto my-36 p-5 bg-white rounded-md shadow-md">
        <h1 class="text-center">Edit a card</h1>
        <div>
          <input
            type="text"
            placeholder="Enter a title..."
            v-model="title"
            class="w-full px-4 py-2 border rounded-lg shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="content"
            v-model="content"
            class="w-full px-4 py-2 border rounded-lg shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <slot>
            <div class="flex justify-between items-center">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                @click="closeModal"
              >
                Close
              </button>
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                @click="submit"
              >
                Submit
              </button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
