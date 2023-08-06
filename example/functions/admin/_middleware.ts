import khulnasoftAccessPlugin from "khulnasoft/pages-plugin-khulnasoft-access";
import type { PluginData as SentryPluginData } from "khulnasoft/pages-plugin-sentry";
import type { PluginData as khulnasoftAccessPluginData } from "khulnasoft/pages-plugin-khulnasoft-access";

export const onRequest = [
  khulnasoftAccessPlugin({
    domain: "https://test.khulnasoftaccess.com",
    aud: "97e2aae120121f902df8bc99fc345913ab186d174f3079ea729236766b2e7c4a",
  }),
  (async ({ data, next }) => {
    const identity = await data.khulnasoftAccess.JWT.getIdentity();

    data.sentry.setUser({
      id:
        data.khulnasoftAccess.JWT.payload.sub ||
        data.khulnasoftAccess.JWT.payload.common_name,
      username: identity.name,
      ip_address: identity.ip,
      email: data.khulnasoftAccess.JWT.payload.email,
    });

    return next();
  }) as PagesFunction<
    unknown,
    any,
    SentryPluginData & khulnasoftAccessPluginData
  >,
];
