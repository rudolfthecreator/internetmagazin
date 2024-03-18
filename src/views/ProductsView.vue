<template>
  <div class="products">
    <div v-for="prod in computedProducts" :key="prod.id" class="item">
      <img :src="prod.images[0]" />
      <strong>{{ prod.title }}. {{ prod.brand }}</strong>
      <span class="description">{{ prod.description }}</span>
      <span class="price">{{ formatNum(prod.price * 100) }} ₽</span>
      <button
        v-if="!store.state.basket.has(prod.id)"
        @click="store.commit('addProduct', prod)"
      >
        В корзину
      </button>
      <div v-else>
        <button class="width" @click="store.dispatch('minusOrDelete', prod)">
          -
        </button>
        {{ store.state.basket.get(prod.id).count }}
        <button class="width" @click="store.commit('plusCount', prod)">
          +
        </button>
      </div>
    </div>
  </div>
  <div class="pagination">
    <div
      v-for="n in pages"
      :key="n"
      :class="n == page + 1 ? 'page page__current' : 'page'"
      @click="page = n - 1"
    >
      {{ n }}
    </div>
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

//Текущая страница
const page = ref(0);

//Количество страниц
const pages = computed(() =>
  products.value ? Math.ceil(products.value.length / 8) : 0
);

//Отображаемые продукты постранично
const computedProducts = computed(() =>
  products.value ? products.value.slice(page.value * 8, page.value * 8 + 8) : []
);
</script>

<style scoped>
.products {
  width: 70vw;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 5px;
  grid-column-gap: 5px;
  margin-top: 2vh;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.pagination {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  height: 6vh;
  min-height: 50px;
  margin-top: 1vh;

  .page {
    padding: 5px;
    margin: 0 5px;
    border: 1px solid rgb(235, 235, 235);
    background-color: rgb(0, 0, 51);
    color: white;
    cursor: pointer;
    border-radius: 10px;
    text-align: center;
  }

  .page__current {
    background-color: orange;
    border: 1.5px solid rgb(0, 0, 51);
    font-weight: bold;
  }
}

.item {
  height: 40vh;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: white;
  padding: 10px;
  text-align: center;
  overflow: hidden;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  img {
    display: block;
    width: 8vw;
  }
  .description {
    font-size: 0.8em;
  }
  .price {
    color: #fc5a5a;
    font-weight: bold;
  }

  &:hover {
    border: 2px solid #fc5a5a;
  }

  @media (max-width: 1024px) {
    min-height: 250px;
  }

  @media (max-width: 768px) {
    min-height: 200px;
  }
}
</style>
