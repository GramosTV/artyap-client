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
    <div class="wrapper">
      <div class="title left">{{ data?.title || 'Untitled' }}</div>
      <img :src="`${art_url}/${data.image_id}/full/843,/0/default.jpg`" :alt="data.title" />
      <div class="title right">{{ data.artist?.title || 'Unknown Author' }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-bottom: 5vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
}

.wrapper {
  position: relative;
  display: inline-block;

  img {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    opacity: 0.5;
    max-height: 100vh;
    min-width: 340px;
  }
}

.title {
  position: absolute;
  font-size: 1.2rem;
  font-weight: bold;
  white-space: nowrap;
  opacity: 0.7;
  top: 50%;
  transform: translateY(-50%);
  transform-origin: center center;
}

.title.left {
  left: 0;
  transform: translateY(-50%) translateX(calc(-50% - 22px)) rotate(-90deg);
}

.title.right {
  right: 0;
  transform: translateY(-50%) translateX(calc(50% + 22px)) rotate(90deg);
}
</style>
