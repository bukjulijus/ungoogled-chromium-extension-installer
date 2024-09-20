import './app.css';

import App from './App.svelte';

if (import.meta.env.DEV) {
  await import("./mocks.js");
}

const app = new App({
  target: document.getElementById("app")!,
});

export default app;
