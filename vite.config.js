import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const localApiPlugin = () => ({
  name: 'local-api-chat',
  configureServer(server) {
    server.middlewares.use('/api/chat', async (request, response, next) => {
      try {
        let rawBody = '';

        for await (const chunk of request) {
          rawBody += chunk;
        }

        request.body = rawBody ? JSON.parse(rawBody) : {};

        const { default: handler } = await import('./api/chat.js');
        const apiResponse = {
          status(statusCode) {
            response.statusCode = statusCode;
            return this;
          },
          json(payload) {
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(payload));
          }
        };

        await handler(request, apiResponse);
      } catch (error) {
        next(error);
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [react(), localApiPlugin()],
    server: {
      port: 3000,
    },
  };
})
