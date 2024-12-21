<script setup lang="ts">
import { ref } from 'vue';
import { Store } from '@/store/store.ts';

const props = defineProps<{
  cardContainerId: number;
}>();
const isOpen = ref(false);

const submit = () => {
  Store.getInstance().createCard(title.value, content.value, props.cardContainerId);
  isOpen.value = false;
};
</script>

<template>
  <div>
    <button @click="isOpen = !isOpen">Create new card</button>
  </div>
  <div v-if="isOpen" class="bg-transparent z-9999 fixed w-full h-full top-0 left-0">
    <div>
      <div class="w-72 mx-auto my-36 p-5 bg-white rounded-md shadow-md">
        <div>
          <h1>Create a card</h1>
        </div>
        <div>
          <input type="text" placeholder="title" v-model="title" />
          <input type="text" placeholder="content" v-model="content" />
        </div>
        <div>
          <slot>
            <div>
              <button @click="submit">Submit</button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
