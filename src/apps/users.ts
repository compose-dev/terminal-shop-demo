import { Compose } from "@composehq/sdk";

import Database from "../db";

import { pageHeader } from "./utils";

/**
 * This app is the users page for the terminal.shop admin dashboard. It
 * displays a list of users.
 */
const usersApp = new Compose.App({
  name: "terminal.shop / users",
  handler: ({ page, ui }) => {
    const sessionId = page.params.sessionId;

    if (!sessionId || typeof sessionId !== "string") {
      page.link("terminal-shop");
      return;
    }

    page.add(() => pageHeader(ui, "users"));

    const db = Database.beginSession(sessionId);
    const users = db.users.selectAll();

    page.add(() =>
      ui.stack([
        ui.header("Users"),
        ui.table("users-table", users, { allowSelect: false }),
      ])
    );
  },
  route: "terminal-shop-users",
  hidden: true,
});

export { usersApp };
