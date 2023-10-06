import { EventHandler } from "sst/node/event-bus";
import { Policy } from "@config-api-inno/core/policyUpdated";
import { PolicyTable } from '@config-api-inno/core/table';

export const handler = EventHandler(Policy.Events.PolicyUpdated, async (evt) => {
  console.log("Consuming Policy Updated Event", evt);

  const item = {
    ...evt.properties,
  }
  await PolicyTable.put(item)
});
