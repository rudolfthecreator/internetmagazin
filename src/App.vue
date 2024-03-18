<template>
  <nav>
    <router-link to="/">ГЛАВНАЯ</router-link>
    <router-link to="/products">ТОВАРЫ</router-link>
    <router-link to="/basket">КОРЗИНА</router-link>
    <router-link to="/orders">ЗАКАЗЫ</router-link>
    <template v-if="store.state.user.name">
      <div class="user">{{ userInfo }}</div>
      &nbsp;
      <img :src="store.state.user.avatar" />
    </template>
    <div v-else class="user">ПОЛЬЗОВАТЕЛЬ</div>
  </nav>
  <div class="main__container">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { formatNum } from "@/utils";

const store = useStore();

const userInfo = computed(
  () =>
    `${store.state.user.name.toUpperCase()} (${formatNum(
      store.state.user.money
    )} ₽)`
);
</script>

<style>
@import "@/styles/main.css";
</style>

<style scoped>
nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 2vw;
  background-color: rgba(0, 0, 51, 1);
  height: 8vh;
  min-height: 40px;
  position: sticky;
  top: 0;
  z-index: 1;
}

a {
  font-weight: bold;
  color: rgb(245, 245, 245);
  text-decoration: none;
  margin-left: 1vw;

  &.router-link-exact-active {
    color: orange;
  }
}

img {
  width: 2vw;
  border-radius: 50%;
}

.main__container {
  min-height: 92vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 10px;
}

.user {
  color: rgb(245, 245, 245);
  font-weight: bold;
  margin-left: 1vw;
}
</style>
