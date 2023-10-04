import { ApiHandler } from "sst/node/api";
import { Policy } from "@config-api-inno/core/policyUpdated";

export const create = ApiHandler(async (_evt) => {
  console.log('api invoked')
  const updatePolicyEvent = await Policy.updatePolicy();
  const leadSoldEvent = await Policy.sellLead();
  return {
    statusCode: 200,
    body: JSON.stringify({
      updatePolicyEvent,
      leadSoldEvent
    }),
  };
});
