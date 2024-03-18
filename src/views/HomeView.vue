<template>
  <div class="home">
    <img src="@/assets/logo.png" />
    <div class="nouser" v-if="!store.state.user.name">
      <strong>Добро пожаловать! </strong>
      <span>Введите свои данные: </span>
      <span
        >ID: <input v-model="userId" type="number" placeholder="Введите ваш ID"
      /></span>
      <span
        >Баланс:
        <input v-model="balance" type="number" placeholder="Введите баланс"
      /></span>
      <button v-if="userId > 0 && userId < 101 && balance > 0" @click="logIn">
        Войти
      </button>
      <span v-else>ID от 1 до 100. Баланс больше 0</span>
    </div>
    <div class="user" v-else>
      <img :src="store.state.user.avatar" />
      <div>
        <span>Имя: {{ store.state.user.name }}</span>
        <span>Баланс: {{ formatNum(store.state.user.money) }} ₽</span>
        <input v-model="addingMoney" type="number" />
        <button @click="store.commit('addMoney', addingMoney)">
          Пополнить баланс
        </button>
        <button @click="store.dispatch('logOut')">Выйти</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import type { Ref } from "vue";
import { formatNum } from "@/utils";

// Хранилище
const store = useStore();

// ID пользователя для ввода
const userId: Ref<number> = ref(0);

// Начальный баланс пользователя для ввода
const balance: Ref<number> = ref(0);

// Добавляемый баланс пользователя для ввода
const addingMoney: Ref<number> = ref(0);

// Логин/получение данных пользователя с сервера
const logIn = () => {
  fetch("https://dummyjson.com/users/" + userId.value)
    .then((res) => res.json())
    .then((data) => {
      store.commit("setUser", data);
      store.commit("setBalance", balance.value);
    });
};
</script>

<style scoped>
.home {
  width: 90vw;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

img {
  width: 40vw;
}

.nouser {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  grid-gap: 10px;
  width: 50vw;
  padding-right: 10vw;

  strong {
    color: orange;
    font-size: 2.5em;
    margin-bottom: 5vh;
  }
  span:last-child {
    height: 31px;
  }
}

input {
  padding: 5px 10px;
  border: 2px solid rgb(0, 0, 51);
  border-radius: 10px;
}

.user {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  grid-gap: 20px;
  width: 50vw;
  padding-left: 10vw;

  img {
    width: 20%;
    border-radius: 50%;
    float: left;
  }

  div {
    display: flex;
    flex-direction: column;
    grid-gap: 5px;
    align-items: flex-start;

    input {
      width: 60%;
    }
  }
}
</style>
