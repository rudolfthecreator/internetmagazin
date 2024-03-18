<template>
  <div v-if="myProducts.length == 0">Корзина пуста.</div>
  <div v-for="prod in myProducts" :key="prod.id" class="basket">
    <img :src="prod.images[0]" />
    <div class="product">
      <strong>{{ prod.title }}. {{ prod.brand }}</strong>
      <span class="description">{{ prod.description }}</span>
    </div>
    <div class="actions">
      <div>
        <button @click="store.dispatch('minusOrDelete', prod)">-</button>
        {{ store.state.basket.get(prod.id).count }}
        <button @click="store.commit('plusCount', prod)">+</button>
      </div>
      <button @click="store.commit('deleteProduct', prod.id)">Удалить</button>
    </div>
    <div class="price">
      {{ formatNum(prod.price * 100 * store.state.basket.get(prod.id).count) }}
      ₽
    </div>
  </div>
  <div class="total">
    К оплате: {{ formatNum(store.getters.sumBasket) }} ₽ &nbsp;
  </div>
  <div class="pay">
    <button
      class="pinkbtn"
      @click="store.dispatch('addOrder')"
      :disabled="myProducts.length == 0"
    >
      Создать заказ
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { formatNum } from "@/utils";

//Хранилище
const store = useStore();

//Массив продуктов
const products = ref();

//Получение актуальных продуктов
fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    //id, brand, description, images, price, title
    products.value = data.products;
  });

//Продукты отложенные в корзину
const myProducts = computed(() =>
  products.value
    ? products.value.filter((f: { id: number }) => store.state.basket.has(f.id))
    : []
);
</script>

<style scoped>
.basket {
  width: 60vw;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
  border: 2px solid rgba(0, 0, 0, 0.2);
  padding: 10px;
  margin-top: 15px;
  border-radius: 10px;

  img {
    width: 5vw;
    margin-right: 10px;
  }
}

.product {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  .description {
    font-size: 0.8em;
  }
}

.price {
  font-weight: bold;
  margin-left: 10px;
  white-space: nowrap;
}

.total {
  width: 60vw;
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
  padding: 10px;
  background-color: white;
  border: 2px solid rgba(0, 0, 0, 0.2);
  font-weight: bold;
  border-radius: 10px;
}

.pay {
  width: 60vw;
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
  font-size: 1.1em;
}

.actions {
  display: flex;
  flex-direction: column;
  margin-left: auto;
  align-items: center;
  padding: 0 10px;
  grid-gap: 5px;

  div {
    white-space: nowrap;
  }
}
</style>
