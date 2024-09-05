import { defineConfig } from 'vite';
import PiniaPlugin from 'pinia/vite';

export default defineConfig({
  plugins: [
    PiniaPlugin(),
  ],
  optimizeDeps: {
    include: ['swiper'],
  },
  resolve: {
    extensions: ['.vue', '.js', '.ts'] // 필요한 확장자들을 추가
  }
    
});

