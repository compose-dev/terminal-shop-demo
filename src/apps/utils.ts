import { UI } from "@composehq/sdk";

/**
 * Page header for the admin pages. Shows a logo and header.
 *
 * @param ui - The UI instance to use.
 * @param label - The label to display in the header.
 * @returns The page header.
 */
function pageHeader(ui: UI, label: string) {
  return ui.row(
    [
      ui.stack([], {
        style: {
          height: "48px",
          width: "20px",
          backgroundColor: "#FF5E00",
        },
      }),
      ui.header(`terminal.shop admin / ${label}`),
    ],
    { align: "center" }
  );
}

export { pageHeader };
