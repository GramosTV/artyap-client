<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Artwork from '@/components/Artwork.vue';

const route = useRoute();
const artworkId = ref(Number(route.params.id));
</script>

<template>
  <Artwork :id="artworkId" />
</template>
