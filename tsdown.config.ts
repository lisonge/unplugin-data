import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/*.ts'],
  deps: {
    skipNodeModulesBundle: true,
  }
});
