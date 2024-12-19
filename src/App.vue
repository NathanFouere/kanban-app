<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue'
import { CardModel } from '@/model/card.model.ts'

const cards = [
  new CardModel(1, 'Card 1', 'Card content 1'),
  new CardModel(2,'Card 2', 'Card content 2'),
  new CardModel(3,'Card 3', 'Card content 3'),
  new CardModel(4,'Card 4', 'Card content 3'),
  new CardModel(5,'Card 5', 'Card content 4'),
  new CardModel(6,'Card 6', 'Card content 5'),
  new CardModel(7,'Card 7', 'Card content 6'),
  new CardModel(8,'Card 8', 'Card content 7'),
]
</script>

<template>
  <card-component
    v-for="card in cards"
    :key="card.id"
    :card="card"
  />
</template>

<style scoped>
</style>
