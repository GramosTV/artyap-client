<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

// Fetch trending artwork data and calculate dimensions and image URL
const data = ref<any[] | null>(null);

onMounted(async () => {
  data.value = await fetch(`${process.env.VUE_APP_API_URL}/trending`)
    .then((res) => res.json())
    .then(async (data) => {
      return await Promise.all(
        data.map(async (item: any) => {
          const infoResponse = await fetch(`${process.env.VUE_APP_ART_URL}/${item.image_id}/info.json`);
          const { width, height } = await infoResponse.json();
          return {
            ...item,
            width,
            height,
            // Use a width of 200 (or the actual width if smaller) for the image URL
            image: `${process.env.VUE_APP_ART_URL}/${item.image_id}/full/${width >= 200 ? 200 : width},/0/default.jpg`,
          };
        })
      );
    });
});

// Compute the grid layout for each image
const layout = computed(() => {
  if (!data.value) return [];
  return data.value.map((item, index) => ({
    id: item.id,
    x: index % 8,
    y: Math.floor(index / 8),
    w: 1,
    h: item.height / item.width,
    image: item.image,
  }));
});
</script>

<template>
  <div class="container">
    <h1>Trending Artworks</h1>
    <grid-layout
      v-model:layout="layout"
      :col-num="8"
      :margin="[12]"
      :use-css-transforms="false"
      :is-draggable="false"
      :is-resizable="false"
    >
      <template #gridItemContent="slotProps">
        <img
          class="grid-item"
          :src="slotProps.item.image"
          alt="Artwork"
          @click="() => $router.push(`/artwork/${slotProps.item.id}`)"
        />
      </template>
    </grid-layout>
  </div>
</template>

<style scoped lang="scss">
.container {
  max-width: 1200px;
  margin: 25px auto;
  padding: 0 10px;

  h1 {
    text-align: center;
    margin-bottom: 25px;
    font-family: 'Niconne', cursive;
    font-size: 6rem;
  }
}

.grid-item {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    transform: scale(1.06);
  }
}
</style>
