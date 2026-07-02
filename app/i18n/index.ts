import i18next from "./i18next";
import { headerName } from "./settings";
import { headers } from "next/headers";

export async function getT(
  ns: string | string[],
  options?: { keyPrefix?: string },
) {
  const headerList = await headers();
  const lng = headerList.get(headerName) ?? i18next.languages[0];

  // Til o'zgargan bo'lsa, uni yangilash
  if (i18next.resolvedLanguage !== lng) {
    await i18next.changeLanguage(lng);
  }

  // Namespace yuklanmagan bo'lsa, yuklash
  const namespaces = Array.isArray(ns) ? ns : [ns];
  const missingNamespaces = namespaces.filter(
    (n) => !i18next.hasLoadedNamespace(n),
  );

  if (missingNamespaces.length > 0) {
    await i18next.loadNamespaces(missingNamespaces);
  }

  return {
    t: i18next.getFixedT(lng, namespaces[0], options?.keyPrefix),
    i18n: i18next,
  };
}
