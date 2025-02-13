<script setup lang="ts">
import { ref, reactive, inject } from 'vue';
// @ts-expect-error:next-line
import box from '../assets/images/box.png';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
auth.fetchUser();
// auth.isLoggedIn();

const hoveredIndex = ref(-3);
const navItems = reactive([
  { name: 'Search', to: '/search', icon: 'fa-magnifying-glass' },
  { name: 'Random', to: '/random', icon: 'fa-dice-three' },
  { name: 'Login', to: '/login', icon: 'fa-user' },
  { name: 'Trending', to: '/trending', icon: 'fa-fire' },
  { name: 'Home', to: '/about' },
  { name: 'Home', to: '/view' },
  { name: 'Home', to: '/home' },
  { name: 'Home', to: '/about' },
  { name: 'Home', to: '/view' },
]);

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
  font-size: 1.4vw;
}

.nav-item {
  justify-content: center;
  align-items: center;
  width: 3.5em;
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
    padding-left: 0.4em;
    padding-right: 0.4em;
    display: flex;
    position: relative;
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(1);
      text-align: center;
      color: $secondary-color;
      font-size: 1.5em;
      transition: 0.3s;
    }
  }

  .tooltip {
    z-index: 0;
    background-color: $secondary-color;
    color: $text-color;
    opacity: 0;
    white-space: nowrap;
    border-radius: 0.25em;
    padding: 0.3em 0.4em;
    font-size: 0.7em;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    position: absolute;
    top: 0;
    transform: translate(0, -80%);
  }
  &.hover {
    width: 5em;
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
    width: 4.5em;
    i {
      transform: translate(-50%, -50%) scale(1.4);
      transition: 0.3s;
    }
  }

  &.sibling-far {
    width: 4em;
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
  border-radius: 12px;
  border: 3px solid $secondary-color;
}
</style>
