<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Artwork } from '@/types/artwork';

const art_url = process.env.VUE_APP_ART_URL;
const data = ref<Artwork | null>(null);
onMounted(async () => {
  data.value = await fetch(`${process.env.VUE_APP_API_URL}/random-artwork`)
    .then((res) => res.json())
    .then((data) => data.data);
});
</script>

<template>
  <div class="container" v-if="data">
    <img :src="`${art_url}/${data.image_id}/full/843,/0/default.jpg`" :alt="data.title" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-bottom: 5vh;
  z-index: -1;
  opacity: 0.5;
  top: 0;
  left: 0;
  width: 100vw;
  position: fixed;
  img {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
}
</style>
