import { Compose } from "@composehq/sdk";

import * as apps from "./apps";

const client = new Compose.Client({
  apiKey: "<YOUR_API_KEY>",
  apps: [
    apps.cartApp,
    apps.homeApp,
    apps.ordersApp,
    apps.productsApp,
    apps.usersApp,
    apps.productDetailsApp,
    apps.routerApp,
  ],
});

client.connect();