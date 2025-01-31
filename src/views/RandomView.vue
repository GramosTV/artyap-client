<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Artwork from '@/components/Artwork.vue';

const route = useRoute();
</script>

<template>
  <Artwork :id="0" />
</template>
