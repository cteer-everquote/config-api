import { EventHandler } from "sst/node/event-bus";
import { Policy } from "@config-api-inno/core/policyUpdated";

export const handler = EventHandler(Policy.Events.PolicyUpdated, async (evt) => {
  console.log("Consuming Policy Updated Event", evt);
});
