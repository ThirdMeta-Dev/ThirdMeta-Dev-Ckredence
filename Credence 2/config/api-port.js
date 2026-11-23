export const apiPort = Number(process.env.API_PORT ?? 3001);

if (!Number.isInteger(apiPort) || apiPort < 1 || apiPort > 65535) {
  throw new Error('API_PORT must be an integer between 1 and 65535.');
}
