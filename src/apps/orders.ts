import { Compose } from "@composehq/sdk";

import Database from "../db";

import { pageHeader } from "./utils";

/**
 * This app is the orders page for the terminal.shop admin dashboard. It
 * displays a list of orders and lets you print labels for orders that
 * need them.
 */
const ordersApp = new Compose.App({
  name: "terminal.shop / orders",
  handler: ({ page, ui, state }) => {
    const sessionId = page.params.sessionId;

    if (!sessionId || typeof sessionId !== "string") {
      page.link("terminal-shop");
      return;
    }

    page.add(() => pageHeader(ui, "orders"));

    const db = Database.beginSession(sessionId);

    const orders = db.orders.selectAll().map((order) => ({
      ...order,
      addressLineOne: order.address.name,
    }));

    const needsPrinting = orders.filter(
      (order) => !order.printedAt && !!order.label
    );

    function printOrders() {
      state.printing = true;
      const printTasks: any[] = [];

      page.modal(({ resolve }) => {
        if (state.printing) {
          return ui.spinner({
            text: "Generating labels. This may take a few minutes...",
          });
        }
        return ui.stack([
          ui.header("Orders", { size: "sm" }),
          ui.text(needsPrinting.length.toString()),
          ...printTasks,
          ui.button("confirm-orders-btn", {
            label: "Continue",
            onClick: async () => {
              const confirmed = await page.confirm({
                message: "Confirm these orders as printed?",
              });

              if (confirmed) {
                db.orders.printAll();
                page.toast("Orders printed", { appearance: "success" });
                page.reload();
              }

              // close modal
              resolve();
            },
          }),
        ]);
      });

      setTimeout(() => {
        for (const [index, order] of needsPrinting.entries()) {
          printTasks.push(
            ui.text("-----"),
            ui.header(`${index.toString()} count`, { size: "sm" }),
            ui.text(order.label)
          );
        }

        state.printing = false;
      }, 3000);
    }

    page.add(() =>
      ui.stack([
        ui.row(
          [
            ui.header("Orders"),
            ui.cond(needsPrinting.length > 0, {
              true: ui.button("Print labels", {
                label: `Print ${needsPrinting.length} labels`,
                onClick: () => printOrders(),
              }),
            }),
          ],
          { align: "center", justify: "between" }
        ),
        ui.table("orders-table", orders, {
          allowSelect: false,
          columns: [
            "id",
            { key: "amount", format: "currency" },
            { key: "addressLineOne", label: "Name" },
            { key: "createdAt", format: "datetime" },
            { key: "printedAt", format: "datetime" },
          ],
          actions: [
            {
              label: "Label",
              onClick: (row) => {
                if (row.label) {
                  page.link("https://www.youtube.com/watch?v=dQw4w9WgXcQ", {
                    newTab: true,
                  });
                } else {
                  page.toast("No label available", { appearance: "warning" });
                }
              },
            },
            {
              label: "Tracking",
              onClick: (row) => {
                if (row.tracking) {
                  page.link("https://www.youtube.com/watch?v=dQw4w9WgXcQ", {
                    newTab: true,
                  });
                } else {
                  page.toast("No tracking available", {
                    appearance: "warning",
                  });
                }
              },
            },
          ],
        }),
      ])
    );
  },
  route: "terminal-shop-orders",
  hidden: true,
});

export { ordersApp };
