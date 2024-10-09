import { Compose } from "@composehq/sdk";

import Database from "../db";

import { pageHeader } from "./utils";

/**
 * This app simply sets a database session then links to the actual home page
 * for the demo with the sessionId set as a param.
 */
const routerApp = new Compose.App({
  name: "terminal.shop demo",
  handler: ({ page }) => {
    const db = Database.beginSession();
    page.link("terminal-shop-home", { params: { sessionId: db.sessionId } });
  },
  route: "terminal-shop",
});

/**
 * This app is the main home page for the terminal.shop admin dashboard. It
 * links to the various sub apps for users, products, etc.
 */
const homeApp = new Compose.App({
  name: "terminal.shop / home",
  handler: ({ page, ui }) => {
    const sessionId = page.params.sessionId;

    if (!sessionId || typeof sessionId !== "string") {
      page.link("terminal-shop");
      return;
    }

    page.add(() => pageHeader(ui, "home"));

    function renderLink(label: string, onClick: () => void) {
      return ui.button(label, {
        label,
        onClick,
        appearance: "outline",
        // make the buttons appear as large nav links
        style: { width: "100%", padding: "1rem" },
      });
    }

    page.add(() =>
      renderLink("Users", () =>
        page.link("terminal-shop-users", { params: { sessionId } })
      )
    );
    page.add(() =>
      renderLink("Products", () =>
        page.link("terminal-shop-products", { params: { sessionId } })
      )
    );
    page.add(() =>
      renderLink("Orders", () =>
        page.link("terminal-shop-orders", { params: { sessionId } })
      )
    );
    page.add(() =>
      renderLink("Cart", () =>
        page.link("terminal-shop-cart", { params: { sessionId } })
      )
    );
  },
  route: "terminal-shop-home",
  hidden: true,
});

export { routerApp, homeApp };
