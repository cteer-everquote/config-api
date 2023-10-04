import { StackContext, Api, EventBus } from "sst/constructs";

export function API({ stack }: StackContext) {
  const bus = new EventBus(stack, "bus", {
    defaults: {
      retries: 10,
    },
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [bus],
      },
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /todo": "packages/functions/src/todo.list",
      "POST /todo": "packages/functions/src/todo.create",
      "GET /policy": "packages/functions/src/policy.create",
    },
  });

  bus.subscribe("todo.created", {
    handler: "packages/functions/src/events/todo-created.handler",
  });

  bus.subscribe("policy.updated", {
    handler: "packages/functions/src/handlers/policyUpdated.handler",
  });

  bus.subscribe("lead.sold", {
    handler: "packages/functions/src/handlers/leadSold.handler",
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
