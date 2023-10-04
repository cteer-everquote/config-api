import { ApiHandler } from "sst/node/api";

export const handler = ApiHandler(async (event) => {
  event.version
  return {
    statusCode: 200,
    body: `Hello conor. The time is ${new Date().toISOString()}`,
  };
});
