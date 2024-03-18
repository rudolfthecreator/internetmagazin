<template>
  <div v-if="res.length == 0">У вас пока нет заказов.</div>

  <div v-for="(order, indexO) in res" :key="indexO" class="order">
    <div class="product">
      <div v-for="(pos, indexB) in order.basket" :key="indexB">
        <b>- {{ pos.title }}</b> ({{ pos.count }} x {{ pos.price }})
      </div>
    </div>

    <div class="actions">
      <strong>Сумма: {{ formatNum(order.sum) }} ₽</strong>
      <button
        class="pinkbtn"
        v-if="order.status == 0"
        @click="store.dispatch('addOrder')"
      >
        Подтвердить
      </button>
      <button
        v-else-if="order.status == 1"
        :disabled="order.sum > store.state.user.money"
        @click="store.dispatch('payOrder', order.id)"
        class="pinkbtn"
      >
        Оплатить
      </button>
      <button
        v-if="order.status != 3"
        @click="store.dispatch('cancelOrder', order.id)"
      >
        Отменить
      </button>
    </div>
    <div class="status">
      <span :class="`color${order.status}`">{{ statuses[order.status] }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { formatNum } from "@/utils";

// Хранилище
const store = useStore();

// Получение списка заказов из хранилища + формирование заказа из корзины
const res = computed(() =>
  store.state.basket.size
    ? store.state.orders
        .concat(store.getters.curOrder)
        .sort((a: { status: number }, b: { status: number }) => {
          return a.status - b.status;
        })
    : store.state.orders
);

// Статусы для расшифровки
const statuses = ["Формирование", "Сформирован", "Оплачен", "Отменен"];
</script>

<style scoped>
.order {
  width: 60vw;
  display: grid;
  align-items: center;
  grid-template-columns: 3fr 1.5fr 1fr;
  grid-column-gap: 10px;
  background-color: white;
  padding: 10px;
  margin-top: 15px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.product {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  div {
    font-size: 0.8em;
  }
}

.price {
  font-weight: bold;
  margin-left: 10px;
  white-space: nowrap;
}

.status {
  text-align: right;

  span {
    padding: 5px 10px;
    border-radius: 10px;

    &.color1 {
      background-color: orange;
    }
    &.color2 {
      background-color: rgb(76, 164, 92);
      color: white;
    }
    &.color3 {
      background-color: #fc5a5a;
      color: white;
    }
  }
}

.actions {
  display: flex;
  flex-direction: column;
  margin-left: auto;
  align-items: center;
  justify-content: center;
  grid-gap: 5px;
  padding: 0 10px;

  /* strong {
    white-space: nowrap;
  } */
}
</style>
