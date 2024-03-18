import { createStore } from "vuex";

export default createStore({
  state: {
    //Пользователь
    user: { name: "", avatar: "", money: 0 },
    //Корзина
    basket: new Map<string, { title: string; count: number; price: number }>(),
    //Заказы
    orders: <
      { id: number; basket: Array<object>; sum: number; status: number }[]
    >[],
  },
  getters: {
    // Формирование текущего заказа по корзине
    curOrder(state, getters) {
      return {
        id: 0,
        basket: Array.from(state.basket.values()),
        sum: getters.sumBasket,
        status: 0,
      };
    },
    // Сумма товаров в корзине
    sumBasket(state) {
      return Array.from(state.basket.values()).reduce((acc, el) => {
        return acc + el.price * el.count;
      }, 0);
    },
  },
  mutations: {
    // Установка пользователя в хранилище
    setUser(state, data) {
      state.user.name = data.firstName;
      state.user.avatar = data.image;
    },

    // Установка начального баланса пользователя
    setBalance(state, balance) {
      state.user.money = balance;
    },

    // Добавление продукта в корзину
    addProduct(state, prod) {
      state.basket.set(prod.id, {
        title: prod.title + ". " + prod.brand,
        count: 1,
        price: prod.price * 100,
      });
    },

    //Увеличение количества продукта на 1
    plusCount(state, prod) {
      const curProduct = state.basket.get(prod.id);
      if (curProduct) {
        state.basket.set(prod.id, {
          ...curProduct,
          count: curProduct.count + 1,
        });
      }
    },

    //Уменьшение количества продукта на 1
    minusCount(state, prod) {
      const curProduct = state.basket.get(prod.id);
      if (curProduct) {
        state.basket.set(prod.id, {
          ...curProduct,
          count: curProduct.count - 1,
        });
      }
    },

    //Удаление продукта по id
    deleteProduct(state, id) {
      state.basket.delete(id);
    },

    // Добавление денег на баланс пользователя
    addMoney(state, money) {
      state.user.money += money;
    },
  },
  actions: {
    //Формирование заказа и обнуление корзины
    addOrder(context) {
      context.state.orders.push({
        id: context.state.orders.length + 1,
        basket: Array.from(context.state.basket.values()),
        sum: context.getters.sumBasket,
        status: 1,
      });
      context.state.basket = new Map();
    },

    //Оплата заказа (списывание денег и перевод в следующий статус)
    payOrder(context, id) {
      const index = context.state.orders.findIndex((f) => f.id == id);
      context.state.orders[index].status = 2;
      context.state.user.money -= context.state.orders[index].sum;
    },

    //Отмена заказа
    cancelOrder(context, id) {
      if (id == 0) {
        context.state.basket = new Map();
      } else {
        const index = context.state.orders.findIndex((f) => f.id == id);
        if (context.state.orders[index].status == 2) {
          context.state.user.money += context.state.orders[index].sum;
        }
        context.state.orders[index].status = 3;
      }
    },

    //Решается судьба продукта (уменьшение количества или удаление)
    minusOrDelete(context, prod) {
      const curProduct = context.state.basket.get(prod.id);
      if (curProduct && curProduct.count == 1) {
        context.commit("deleteProduct", prod.id);
      } else {
        context.commit("minusCount", prod);
      }
    },

    //Выход пользователя
    logOut(context) {
      context.state.user = { name: "", avatar: "", money: 0 };
      context.state.basket = new Map();
      context.state.orders = [];
    },
  },
  modules: {},
});
