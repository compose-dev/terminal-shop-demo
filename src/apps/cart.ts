import { Compose } from "@composehq/sdk";

import Database from "../db";

import { pageHeader } from "./utils";

/**
 * This app is the cart page for the terminal.shop admin dashboard. It
 * displays a list of carts.
 */
const cartApp = new Compose.App({
  name: "terminal.shop / cart",
  handler: ({ page, ui }) => {
    const sessionId = page.params.sessionId;

    if (!sessionId || typeof sessionId !== "string") {
      page.link("terminal-shop");
      return;
    }

    page.add(() => pageHeader(ui, "cart"));

    const db = Database.beginSession(sessionId);
    const carts = db.cart.selectAll();

    page.add(() =>
      ui.stack([
        ui.header("Cart"),
        ui.table("cart-table", carts, {
          allowSelect: false,
          columns: [
            "id",
            "userId",
            { key: "userEmail", width: "250px" },
            "cardId",
            "shippingId",
            "items",
            { key: "cost", format: "currency" },
          ],
        }),
      ])
    );
  },
  route: "terminal-shop-cart",
  hidden: true,
});

export { cartApp };
