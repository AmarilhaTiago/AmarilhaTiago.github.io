import { defineConfig } from 'vitest/config';

// Some tests build the site and temporarily add files under src/content, so files must not run in parallel.
export default defineConfig({
  test: { fileParallelism: false },
});
