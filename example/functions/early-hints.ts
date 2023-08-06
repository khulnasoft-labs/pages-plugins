import EarlyHintsPlugin from "khulnasoft/pages-plugin-early-hints";

export const onRequest = [
  async (context) => {
    console.log("req");
    const response = await EarlyHintsPlugin()(context);
    console.log(response.headers.get("link"));
    return response;
  },
];
