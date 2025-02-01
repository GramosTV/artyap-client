<script setup lang="ts"></script>
<template>
  <div class="container">
    <div class="card">
      <a class="login">Log in</a>
      <div class="inputBox">
        <input type="text" :required="true" />
        <span class="user">Username</span>
      </div>

      <div class="inputBox">
        <input type="password" :required="true" />
        <span>Password</span>
      </div>

      <button class="enter">Enter</button>
    </div>
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
    min-height: 350px;
    width: 300px;
    flex-direction: column;
    gap: 35px;
    background: #fefae0;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 8px;
    z-index: 9999;
    .login {
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

    .enter {
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

    .enter:hover {
      transform: scale(1.05);
    }
  }
}
</style>
