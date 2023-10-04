import { EventHandler } from "sst/node/event-bus";
import { Policy } from "@config-api-inno/core/policyUpdated";

export const handler = EventHandler(Policy.Events.LeadSold, async (evt) => {
  console.log("Consuming Lead Sold Event", evt);
});
