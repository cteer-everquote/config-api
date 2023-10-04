export * as PolicyUpdated from "./todo";
import { event } from './event';
import { z } from 'zod';
import crypto from 'crypto';

export const Events = {
  Created: event("todo.created", {
    id: z.string(),
  }),
};

export async function create() {
  const id = crypto.randomUUID();
  // write to database

  const x = await Events.Created.publish({
    id,
  });
}
