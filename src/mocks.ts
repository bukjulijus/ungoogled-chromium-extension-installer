chrome.tabs = {
  query: () => [
    {
      url: "https://chromewebstore.google.com/detail/meow-the-cat-pet/dsgsdgfsadvdfs",
    },
  ],
} as unknown as typeof chrome.tabs;

chrome.action = {
  setIcon: ({ path }: { path: string }) => console.log(path),
} as unknown as typeof chrome.action;
