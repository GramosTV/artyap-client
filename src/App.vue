<script setup lang="ts">
import Nav from '@/components/Nav.vue';
import { ref, provide } from 'vue';

const randomizeEvent = ref(false);

const triggerRandomize = () => {
  randomizeEvent.value = !randomizeEvent.value; // Change value to notify listeners
};

provide('randomizeEvent', randomizeEvent);
provide('triggerRandomize', triggerRandomize);
</script>
<template>
  <Nav></Nav>
  <router-view />
</template>
