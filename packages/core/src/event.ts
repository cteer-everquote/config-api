import { createEventBuilder } from "sst/node/event-bus";
import { z } from 'zod';

export const event = createEventBuilder({
  bus: "bus",
});

export const Events = {
  Created: event("todo.created", {
    id: z.string(),
  }),
  PolicyUpdated: event("policy.updated", {
    id: z.string(),
  }),
  LeadSold: event("lead.sold", {
    id: z.string(),
  }),
};
