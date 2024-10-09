import { Compose } from "@composehq/sdk";

import Database from "../db";

import { pageHeader } from "./utils";

/**
 * This app is the products page for the terminal.shop admin dashboard. It
 * displays a list of products, lets you create new products, and links
 * to the product details page for each product.
 */
const productsApp = new Compose.App({
  name: "terminal.shop / products",
  handler: ({ page, ui }) => {
    const sessionId = page.params.sessionId;

    if (!sessionId || typeof sessionId !== "string") {
      page.link("terminal-shop");
      return;
    }

    const db = Database.beginSession(sessionId);

    page.add(() => pageHeader(ui, "products"));

    const products = db.products.selectAll().map((product) => ({
      ...product,
      numVariants: `${product.variants.length} variants`,
    }));

    async function createProduct() {
      const form = await page.modal(
        ({ resolve }) =>
          ui.form(
            "new-product-form",
            [
              ui.textInput("name", { label: "Name", style: { width: "100%" } }),
              ui.textArea("description", { label: "Description" }),
              ui.submitButton("create-product", { label: "Create" }),
            ],
            {
              onSubmit: (form) => resolve(form),
            }
          ),
        { title: "Create new product" }
      );

      // Exited the modal without submitting
      if (!form) {
        return;
      }

      db.products.create(form.name, form.description);
      page.toast("Product created", { appearance: "success" });
      page.reload();
    }

    page.add(() =>
      ui.stack([
        ui.row(
          [
            ui.header("Products"),
            ui.button("create-product", {
              label: "Create new",
              onClick: createProduct,
            }),
          ],
          {
            align: "center",
            justify: "between",
          }
        ),
        ui.table("products-table", products, {
          columns: ["id", "name", "description", "numVariants"],
          actions: [
            {
              label: "View details",
              onClick: (product) => {
                page.link("terminal-shop-product-details", {
                  params: { productId: product.id, sessionId: db.sessionId },
                });
              },
            },
          ],
          allowSelect: false,
        }),
      ])
    );
  },
  route: "terminal-shop-products",
  hidden: true,
});

/**
 * This app is the product details page for the terminal.shop admin
 * dashboard. It displays the details of a product, shows its variants,
 * lets you edit product details, and lets you create new variants.
 */
const productDetailsApp = new Compose.App({
  name: "terminal.shop / product details",
  handler: ({ page, ui }) => {
    const sessionId = page.params.sessionId;
    const productId = page.params.productId;

    if (!sessionId || typeof sessionId !== "string") {
      page.link("terminal-shop");
      return;
    }

    if (!productId || typeof productId !== "number") {
      page.link("terminal-shop-products", { params: { sessionId } });
      return;
    }

    const db = Database.beginSession(sessionId);

    const product = db.products.selectById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    page.add(() => pageHeader(ui, `product / ${product.name}`));

    async function editProduct() {
      if (!product) {
        return;
      }

      const form = await page.modal(
        ({ resolve }) =>
          ui.form(
            "edit-product-form",
            [
              ui.textInput("name", {
                label: "Name",
                initialValue: product.name,
              }),
              ui.textArea("description", {
                label: "Description",
                initialValue: product.description,
              }),
              ui.numberInput("order", {
                label: "Order",
                initialValue: product.order,
              }),
              ui.submitButton("save-product", { label: "Save" }),
            ],
            {
              onSubmit: (form) => resolve(form),
            }
          ),
        {
          width: "sm",
          title: "Edit product",
        }
      );

      // Exited the modal without submitting
      if (!form) {
        return;
      }

      db.products.update(product.id, {
        ...product,
        name: form.name,
        description: form.description,
        order: form.order,
      });

      page.reload();
    }

    async function createVariant() {
      if (!product) {
        return;
      }

      const form = await page.modal(
        ({ resolve }) =>
          ui.form(
            "create-variant-form",
            [
              ui.textInput("name", { label: "Name" }),
              ui.numberInput("price", {
                label: "Price",
                description: "Input a number in the format of USD currency.",
              }),
              ui.submitButton("create-variant", { label: "Create" }),
            ],
            {
              onSubmit: (form) => resolve(form),
            }
          ),
        {
          width: "sm",
          title: "Create variant",
        }
      );

      // Exited the modal without submitting
      if (!form) {
        return;
      }

      db.products.addVariant(product.id, form.name, form.price);
      page.reload();
    }

    page.add(() =>
      ui.stack([
        ui.row(
          [
            ui.stack([ui.header(product.name)]),
            ui.row(
              [
                ui.button("edit-product", {
                  label: "Edit",
                  appearance: "outline",
                  onClick: editProduct,
                }),
                ui.button("create-variant", {
                  label: "Create variant",
                  onClick: createVariant,
                }),
              ],
              {
                justify: "end",
              }
            ),
          ],
          {
            align: "center",
            justify: "between",
          }
        ),
        ui.text([
          ui.text("Description:", {
            style: { textDecoration: "underline" },
          }),
          " ",
          product.description,
        ]),
      ])
    );

    page.add(() =>
      ui.table("variants-table", product.variants, {
        columns: ["name", { key: "price", format: "currency" }, "id"],
        allowSelect: false,
        label: "Variants",
        actions: [
          {
            label: "Edit",
            onClick: () =>
              page.modal(
                () =>
                  ui.text(
                    "You caught me... I didn't implement this, but good job for getting this far!"
                  ),
                {
                  title: "D'oh!",
                }
              ),
          },
        ],
      })
    );
  },
  route: "terminal-shop-product-details",
  hidden: true,
});

export { productsApp, productDetailsApp };
