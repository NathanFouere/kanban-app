<script setup lang="ts">
import { CardModel } from '@/model/card.model.ts'

defineProps<{
    card: CardModel;
}>();
</script>

<template>
  <div class="w-3/12 h-3 bg-amber-300 border-2 border-black">
    test
  </div>

</template>
