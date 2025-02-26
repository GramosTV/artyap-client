<script setup lang="ts">
import router from '@/router';
import { getCsrf } from '@/utils/getCsrf';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';
const toast = useToast();

const username = ref('');
const email = ref('');
const password = ref('');
const repeatPassword = ref('');

const onSubmit = async (e: Event) => {
  e.preventDefault();
  try {
    const csrf = await getCsrf();
    const response = await axios.post(
      `${process.env.VUE_APP_API_URL}/register`,
      {
        username: username.value,
        email: email.value,
        password: password.value,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrf,
        },
      }
    );
    toast.success(response.data.message || 'Registered successfully');
    router.push({ path: '/login' });
  } catch (error: any) {
    if (error.response?.data) {
      const errors = error.response.data.error;
      Object.keys(errors).forEach((field) => {
        if (Array.isArray(errors[field])) {
          errors[field].forEach((msg: string) => {
            toast.error(`${msg}`);
          });
        } else {
          toast.error(`${errors[field]}`);
        }
      });
    } else {
      toast.error('Registration failed');
    }
  }
};
</script>

<template>
  <div class="container">
    <form class="card" @submit="onSubmit">
      <a class="register" @click.prevent>Register</a>
      <div class="inputBox">
        <input type="text" v-model="username" required />
        <span class="user">Username</span>
      </div>
      <div class="inputBox">
        <input type="email" v-model="email" required />
        <span class="email">Email</span>
      </div>
      <div class="inputBox">
        <input type="password" v-model="password" required />
        <span>Password</span>
      </div>
      <button class="submit" type="submit">Register</button>
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
    width: 300px;
    flex-direction: column;
    gap: 35px;
    background: #fefae0;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 8px;
    z-index: 9999;
    padding: 20px;
    .register {
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

    .inputBox input[type='email']:valid ~ span,
    .inputBox input[type='email']:focus ~ span {
      transform: translateX(150px) translateY(-15px);
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
