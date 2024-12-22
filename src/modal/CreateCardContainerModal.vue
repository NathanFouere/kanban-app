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
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-10"
      @click="isOpen = !isOpen"
    >
      Create new card container
    </button>
  </div>
  <div
    v-if="isOpen"
    class="bg-transparent z-9999 fixed w-full h-full top-0 left-0 backdrop-blur-sm"
  >
    <div>
      <div class="w-72 mx-auto my-36 p-5 bg-white rounded-md shadow-md">
        <h1>Create a card container</h1>
        <div>
          <input
            type="text"
            placeholder="title"
            v-model="title"
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
