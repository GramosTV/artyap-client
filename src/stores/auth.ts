import { defineStore } from 'pinia';
import axios from 'axios';
import { User } from '@/types/user';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    async fetchUser() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/auth/user/`, {
          withCredentials: true,
        });
        this.user = response.data;
      } catch {
        this.user = null;
      }
    },
    isLoggedIn() {
      return this.user !== null;
    },
  },
});
