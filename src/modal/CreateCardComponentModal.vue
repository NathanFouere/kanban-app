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
    <button @click="isOpen = !isOpen">Create new card</button>
  </div>
  <div
    v-if="isOpen"
    class="bg-transparent z-9999 fixed w-full h-full top-0 left-0 backdrop-blur-sm"
  >
    <div>
      <div class="w-72 mx-auto my-36 p-5 bg-white rounded-md shadow-md">
        <div>
          <h1>Create a card container</h1>
        </div>
        <div>
          <input type="text" placeholder="title" v-model="title" />
        </div>
        <div>
          <slot>
            <div class="flex justify-between items-center">
              <button @click="closeModal">Close</button>
              <button @click="submit">Submit</button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
