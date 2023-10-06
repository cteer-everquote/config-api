export * as Policy from "./policyUpdated";
import { event } from './event';
import { z } from 'zod';
import crypto from 'crypto';

export const Events = {
  PolicyUpdated: event("policy.updated", {
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    day: z.string()
  }),
  LeadSold: event("lead.sold", {
    id: z.string(),
    date: z.string(),
    price: z.number()
  }),
};

const firstNames = ['John', 'Matthew', 'Mark', 'Luke']
const lastNames = ['Paladin', 'Sheeran', 'Dunford', 'Bay']

export async function updatePolicy() {
  const timestamp = new Date()
  const id = crypto.randomUUID();
  const firstName = firstNames[Math.floor(Math.random()*firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random()*lastNames.length)];
  const event = {
    id,
    firstName,
    lastName,
    day: String(timestamp.getUTCDay())
  }
  const x = await Events.PolicyUpdated.publish(event);
  return event
}

export async function sellLead() {
  const id = crypto.randomUUID();
  const timestamp = Date()
  const event = {
    id,
    date: timestamp.toLocaleUpperCase(),
    price: 30,
  }
  const x = await Events.LeadSold.publish(event);
  return event
}
