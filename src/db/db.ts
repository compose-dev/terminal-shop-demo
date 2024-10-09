import { randomUUID } from "crypto";

import { users, products, orders, cart } from "./seedData";

class Users {
  _users: typeof users;

  constructor() {
    this._users = [...users];
  }

  selectAll() {
    return this._users;
  }
}

class Orders {
  _orders: typeof orders;

  constructor() {
    this._orders = [...orders];
  }

  selectAll() {
    return this._orders;
  }

  printAll() {
    this._orders.forEach((order) => {
      if (!order.printedAt) {
        order.printedAt = new Date();
      }
    });
  }
}

class Products {
  _products: typeof products;

  constructor() {
    this._products = [...products];
  }

  selectAll() {
    return this._products;
  }

  update(id: number, product: (typeof products)[number]) {
    this._products = this._products.map((p) => (p.id === id ? product : p));
  }

  create(name: string, description: string) {
    const newProduct = {
      id: this._products.length + 1,
      name,
      description,
      order: this._products.length + 1,
      variants: [],
    };
    this._products.push(newProduct);
  }

  selectById(id: number) {
    return this._products.find((product) => product.id === id);
  }

  addVariant(productId: number, name: string, price: number) {
    const product = this.selectById(productId);
    if (!product) {
      return;
    }

    product.variants.push({ id: product.variants.length + 1, name, price });
  }
}

class Cart {
  _cart: typeof cart;

  constructor() {
    this._cart = [...cart];
  }

  selectAll() {
    return this._cart;
  }
}

class DB {
  users: Record<string, Users>;
  products: Record<string, Products>;
  orders: Record<string, Orders>;
  cart: Record<string, Cart>;

  constructor() {
    this.users = {};
    this.products = {};
    this.orders = {};
    this.cart = {};
  }

  beginSession(sessionId?: string) {
    const id = sessionId || randomUUID();

    if (!sessionId || !(id in this.users)) {
      this.users[id] = new Users();
      this.products[id] = new Products();
      this.orders[id] = new Orders();
      this.cart[id] = new Cart();
    }

    return {
      sessionId: id,
      users: this.users[id],
      products: this.products[id],
      orders: this.orders[id],
      cart: this.cart[id],
    };
  }
}

const Database = new DB();

export default Database;
