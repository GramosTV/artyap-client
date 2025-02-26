<script setup lang="ts">
import { ref, reactive, inject, watchEffect } from 'vue';
// @ts-expect-error:next-line
import box from '../assets/images/box.png';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();

const hoveredIndex = ref(-3);
const navItems = reactive([
  { name: 'Search', to: '/search', icon: 'fa-magnifying-glass' },
  { name: 'Random', to: '/random', icon: 'fa-dice-three' },
  { name: 'Trending', to: '/trending', icon: 'fa-fire' },
]);
watchEffect(() => {
  if (auth.isLoggedIn()) {
    // Add 'Settings' menu item when logged in
    if (!navItems.some((item) => item.name === 'Settings')) {
      navItems.push({ name: 'Settings', to: '/settings', icon: 'fa-cog' });
    }
    // Replace 'Login' with 'Logout' if logged in
    const loginIndex = navItems.findIndex((item) => item.name === 'Login');
    if (loginIndex !== -1) {
      navItems.splice(loginIndex, 1);
    }
  } else {
    // Remove 'Settings' menu item and add 'Login' when not logged in
    const settingsIndex = navItems.findIndex((item) => item.name === 'Settings');
    if (settingsIndex !== -1) {
      navItems.splice(settingsIndex, 1);
    }
    const loginIndex = navItems.findIndex((item) => item.name === 'Login');
    if (loginIndex === -1) {
      navItems.unshift({ name: 'Login', to: '/login', icon: 'fa-user' });
    }
  }
});
const setHoveredIndex = (index: number) => {
  hoveredIndex.value = index;
};

const clearHoveredIndex = () => {
  hoveredIndex.value = -3;
};

const isSiblingClose = (index: number) => {
  return Math.abs(index - hoveredIndex.value) === 1;
};

const isSiblingFar = (index: number) => {
  return Math.abs(index - hoveredIndex.value) === 2;
};

const triggerRandomize = inject('triggerRandomize') as () => void;
</script>

<template>
  <div class="nav-wrap">
    <nav class="nav-bar">
      <ul class="nav-list">
        <li
          v-for="(item, index) in navItems"
          :key="item.name"
          class="nav-item"
          :class="{
            hover: hoveredIndex === index,
            'sibling-close': isSiblingClose(index),
            'sibling-far': isSiblingFar(index),
          }"
          @mouseenter="setHoveredIndex(index)"
          @mouseleave="clearHoveredIndex"
        >
          <router-link :to="item.to" class="link" @click="item.to === '/random' && triggerRandomize()">
            <img :src="box" loading="eager" :alt="`${item.name} icon`" class="image" />
            <i :class="'fas ' + item.icon"></i>
          </router-link>
          <div class="tooltip">
            <div>{{ item.name }}</div>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss">
.nav-wrap {
  z-index: 100;
  pointer-events: none;
  justify-content: center;
  align-items: flex-end;
  display: flex;
  position: fixed;
  inset: 0 0 2vh;
}

.nav-list {
  flex-flow: row;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 0;
  padding-left: 0;
  display: flex;
  font-size: 2.8vw;
}

.nav-item {
  justify-content: center;
  align-items: center;
  width: 7rem;
  transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  position: relative;
  .link {
    z-index: 1;
    pointer-events: auto;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    display: flex;
    position: relative;
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(1);
      text-align: center;
      color: $secondary-color;
      font-size: 3rem;
      transition: 0.3s;
    }
  }

  .tooltip {
    z-index: 0;
    background-color: $secondary-color;
    color: $text-color;
    opacity: 0;
    white-space: nowrap;
    border-radius: 0.5rem;
    padding: 0.6rem 0.8rem;
    font-size: 1.4rem;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    position: absolute;
    top: 0;
    transform: translate(0, -80%);
  }
  &.hover {
    width: 10rem;
    .tooltip {
      opacity: 1;
      transform: translate(0px, -140%);
    }
    i {
      transform: translate(-50%, -50%) scale(1.6);
      transition: 0.3s;
    }
  }

  &.sibling-close {
    width: 9rem;
    i {
      transform: translate(-50%, -50%) scale(1.4);
      transition: 0.3s;
    }
  }

  &.sibling-far {
    width: 8rem;
    i {
      transform: translate(-50%, -50%) scale(1.2);
      transition: 0.3s;
    }
  }
}

.image {
  object-fit: contain;
  width: 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 24px;
  border: 6px solid $secondary-color;
}
</style>
