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
</script>

<template>
  <div>
    <button @click="isOpen = !isOpen">Edit a card</button>
  </div>
  <div v-if="isOpen" class="bg-transparent z-9999 fixed w-full h-full top-0 left-0">
    <div>
      <div class="w-72 mx-auto my-36 p-5 bg-white rounded-md shadow-md">
        <div>
          <h1>Edit a card</h1>
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
