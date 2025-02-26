<script setup lang="ts">
import { getCsrf } from '@/utils/getCsrf';
import { ref, computed } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';

const toast = useToast();
const auth = useAuthStore();
auth.fetchUser();

const newUsername = ref('');
const currentPassword = ref('');
const newPassword = ref('');
const newEmail = ref('');

const currentUsername = computed(() => auth.user?.username || '');
const currentEmail = computed(() => auth.user?.email || '');
console.log('Current username:', auth.user);
console.log('Current email:', auth.user);

const updateUsername = async (e: Event) => {
  e.preventDefault();
  try {
    const csrf = await getCsrf();
    const response = await axios.post(
      `${process.env.VUE_APP_API_URL}/change-username`,
      {
        new_username: newUsername.value,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrf,
        },
        withCredentials: true,
      }
    );
    toast.success(response.data.message || 'Username updated successfully');
  } catch (error: any) {
    toast.error(error.response?.data?.error || 'Error updating username');
  }
};

const updatePassword = async (e: Event) => {
  e.preventDefault();
  try {
    const csrf = await getCsrf();
    const response = await axios.post(
      `${process.env.VUE_APP_API_URL}/change-password`,
      {
        old_password: currentPassword.value,
        new_password: newPassword.value,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrf,
        },
        withCredentials: true,
      }
    );
    toast.success(response.data.message || 'Password updated successfully');
  } catch (error: any) {
    toast.error(error.response?.data?.error || 'Error updating password');
  }
};
</script>

<template>
  <div class="container">
    <form class="card" @submit="updateUsername">
      <h3 class="settings">User Settings</h3>
      <div>
        <p class="email">Email: {{ currentEmail }}</p>
        <p class="username">Username: {{ currentUsername }}</p>
      </div>

      <div class="inputBox">
        <input type="text" v-model="newUsername" required />
        <span class="user">New Username</span>
      </div>
      <button class="submit" type="submit">Update Username</button>
    </form>

    <form class="card" @submit="updatePassword">
      <h3 class="settings">Change Password</h3>
      <div class="inputBox">
        <input type="password" v-model="currentPassword" required />
        <span>Current Password</span>
      </div>
      <div class="inputBox">
        <input type="password" v-model="newPassword" required />
        <span>New Password</span>
      </div>
      <button class="submit" type="submit">Change Password</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 95vh;
  margin: 0 auto;

  .card {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 320px;
    flex-direction: column;
    gap: 35px;
    background: #fefae0;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 8px;
    z-index: 9999;
    padding: 20px;
    margin-bottom: 20px;
    .username,
    .email {
      color: $background-color;
    }
    .settings {
      color: $background-color;
      text-transform: uppercase;
      letter-spacing: 2px;
      display: block;
      font-weight: bold;
      font-size: x-large;
    }

    .inputBox {
      position: relative;
      width: 250px;

      input {
        width: 100%;
        padding: 10px;
        outline: none;
        border: none;
        color: $background-color;
        font-size: 1em;
        background: transparent;
        border-left: 2px solid $background-color;
        border-bottom: 2px solid $background-color;
        transition: 0.1s;
        border-bottom-left-radius: 8px;
      }

      span {
        margin-top: 5px;
        position: absolute;
        left: 0;
        transform: translateY(-4px);
        margin-left: 10px;
        padding: 10px;
        pointer-events: none;
        font-size: 12px;
        color: $background-color;
        text-transform: uppercase;
        transition: 0.5s;
        letter-spacing: 3px;
        border-radius: 8px;
      }
    }

    .inputBox input:valid ~ span,
    .inputBox input:focus ~ span {
      transform: translateX(113px) translateY(-15px);
      font-size: 0.8em;
      padding: 5px 10px;
      background: $background-color;
      letter-spacing: 0.2em;
      color: #fefae0;
      border: 2px;
    }

    .inputBox input:valid,
    .inputBox input:focus {
      border: 2px solid $background-color;
      border-radius: 8px;
    }

    .submit {
      height: 45px;
      width: 100px;
      border-radius: 5px;
      border: 2px solid $background-color;
      cursor: pointer;
      background-color: transparent;
      transition: 0.3s;
      text-transform: uppercase;
      font-size: 10px;
      letter-spacing: 2px;
      margin-bottom: 1em;
    }

    .submit:hover {
      transform: scale(1.05);
    }
  }
}
</style>
