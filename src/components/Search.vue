<script setup lang="ts">
import { ref, watch } from 'vue';

const inputValue = ref('mon');
const results = ref<{ id: number; title: string }[]>([]);

watch(inputValue, async (newValue) => {
  if (newValue) {
    const { data } = await fetch(`${process.env.VUE_APP_API_URL}/search/?title=${newValue}`).then((res) => res.json());
    results.value = data;
  } else {
    results.value = [];
  }
});
</script>

<template>
  <div class="container">
    <div class="form-control">
      <input type="text" v-model="inputValue" required />
      <label>
        <span style="transition-delay: 0ms">S</span><span style="transition-delay: 50ms">e</span
        ><span style="transition-delay: 100ms">a</span><span style="transition-delay: 150ms">r</span
        ><span style="transition-delay: 200ms">r</span><span style="transition-delay: 250ms">c</span
        ><span style="transition-delay: 300ms">h</span>
      </label>
    </div>
    <ul v-if="results.length">
      <li v-for="result in results" :key="result.id">
        <router-link :to="`/artwork/${result.id}`">{{
          result?.title.length > 20 ? result.title.slice(0, 80) + '...' : result.title || 'Untitled'
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 95vh;
  width: 45vw;
  margin: 0 auto;
  ul {
    width: 100%;
    list-style: none;
    background-color: $secondary-color;
    padding: 5px;
    li a {
      display: inline-block;
      padding: 5px;
      text-decoration: none;
      color: $text-color;
      width: 100%;
      &:hover {
        background-color: $primary-color;
      }
    }
  }
  .form-control {
    position: relative;
    margin: 20px 0 40px;
    margin-bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    label {
      position: absolute;
      top: 15px;
      left: 0;
      pointer-events: none;
      span {
        display: inline-block;
        font-size: 18px;
        min-width: 5px;
        color: $text-color;
        opacity: 0;
        transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
    }
    input {
      background-color: transparent;
      border: 0;
      border-bottom: 2px $text-color solid;
      display: block;
      width: 30%;
      padding: 15px 0;
      font-size: 18px;
      color: $text-color;
      transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      &:focus,
      &:valid {
        transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        outline: 0;
        width: 100%;
      }
    }
  }

  .form-control input:focus + label span,
  .form-control input:valid + label span {
    //   color: $secondary-color;
    opacity: 1;
    transform: translateY(-30px);
  }
}
</style>
