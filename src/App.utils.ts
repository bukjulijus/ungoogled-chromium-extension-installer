import type { ExtensionDetails } from "./App.types";

const ID_INDEX = 3;
const NAME_INDEX = 2;
const TARGET_URL = "chromewebstore.google.com";
const EXTENSION_PATH_REGEX = /^\/(detail)\/([a-zA-Z0-9-]*)\/([a-zA-Z]*)$/;

export const parseUrl = async (): Promise<ExtensionDetails | null> => {
  const currentUrl = await getCurrentTabUrl();
  if (currentUrl?.host !== TARGET_URL) {
    return null;
  }

  const pathParts = currentUrl.pathname.match(EXTENSION_PATH_REGEX);
  if (!pathParts) {
    return null;
  }

  const url = await generateExtensionUrl(pathParts[ID_INDEX]);
  if (!url) {
    return null;
  }

  return {
    url,
    name: pathParts[NAME_INDEX],
  };
};

const getCurrentTabUrl = async (): Promise<URL | null> => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  if (!tab.url) {
    return null;
  }

  return new URL(tab.url);
};

const generateExtensionUrl = async (
  extensionId: string
): Promise<string | null> => {
  const browserVersion = await getBrowserVersion();
  if (!browserVersion) {
    return null;
  }

  return `https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&prodversion=${browserVersion}&x=id%3D${extensionId}%26installsource%3Dondemand%26uc`;
};

const getBrowserVersion = async (): Promise<string | null> => {
  const result = await navigator.userAgentData?.getHighEntropyValues([
    "fullVersionList",
  ]);

  const chromium = result?.fullVersionList?.find((item) =>
    item.brand.toLowerCase().includes("chrom")
  );

  return chromium?.version ?? null;
};
