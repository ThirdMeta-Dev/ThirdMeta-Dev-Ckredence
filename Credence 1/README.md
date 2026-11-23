# Ckredence Wealth

Ckredence Wealth homepage built with React and Vite, with a Node.js backend.

## Local development

Use Node.js 20.19+ on the Node 20 line, or Node.js 22.12 or later.

```sh
npm ci
```

Run `npm run dev:client` for the frontend and `npm run dev` in a separate terminal for the backend. Open the local URL printed by Vite. The homepage uses a local snapshot of the published Ckredence content in `src/homepage.json`, including the dated PMS figures. Service, article, contact, and regulatory links lead to their existing destinations.

Vite forwards development requests under `/api` to the backend. The health endpoint returns `{"status":"ok"}` at `/api/health`. Set `PORT` or `HOST` to override the backend defaults of `3000` and `127.0.0.1`. If you change the backend address, set `API_PROXY_TARGET` to its URL when starting Vite.

`npm run build` builds the frontend into `dist/`. `npm start` runs the backend without watch mode.
