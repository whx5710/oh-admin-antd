import { defineConfig } from '@oh/vite-config';

export default defineConfig(async () => {
  return {
    vite: {
      publicDir: 'src/scss-bem',
    },
  };
});
