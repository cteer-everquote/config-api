import { ApiHandler } from "sst/node/api";
import { PolicyTable } from '@config-api-inno/core/table';

export const handler = ApiHandler(async (_event) => {
  const items = await PolicyTable.query('5')

  const resp = {
    message: `Hello CONOR. The time is ${new Date().toISOString()}`,
    items: items.Items

  }
  return {
    statusCode: 200,
    body: JSON.stringify(resp),
  };
});
