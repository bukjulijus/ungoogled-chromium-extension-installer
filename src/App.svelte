
<script lang="ts">
  import type { ExtensionDetails } from './App.types';
  import { parseUrl } from './App.utils';

  let extension: ExtensionDetails | null = null;
  
  (async (): Promise<void> => {
    extension = await parseUrl();
  })();
  
  const downloadExtension = () => {
    window.open(extension?.url , '_blank')?.focus();
  }
</script>

<main>
  <h1>Extension name</h1>
  <h2>{extension?.name ?? 'Unknown extension'}</h2>
  <button disabled={!extension} on:click={downloadExtension}>
    Download extension
  </button>
</main>

<style scoped>
  h1, h2 {
    text-align: center;
    white-space: nowrap;
    margin: 0;
  }

  h1 {
    margin-bottom: 1rem;
    font-size: 2rem;
  }

  h2 {
    margin-bottom: 3rem;
    font-size: 1.5rem;
  }

  button {
    all: unset;
    color: var(--accent-color);
    background-color: var(--base-color);
    border: 1px solid var(--accent-color);
    border-radius: 0.5rem;
    padding: 0.75rem 1.5rem;
    margin-inline: auto;
    display: block;
  }

  button:hover:not(:disabled) {
    cursor: pointer;
    filter: invert();
  }

  button:active:not(:disabled) {
    opacity: 0.9;
  }

  button:disabled {
    opacity: 0.4;
  }
</style>
