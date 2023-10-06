import { StackContext, Api, EventBus, KinesisStream, Table } from 'sst/constructs';
import { Instance } from 'aws-cdk-lib/aws-ec2';

export function API({ stack }: StackContext) {
  // ********
  // STEP 1
  // ********
  const bus = new EventBus(stack, "bus", {
    defaults: {
      retries: 2,
    },
  });


  const table = new Table(stack, "PolicyTable", {
    fields: {
      pk: "string",
      sk: "string",
    },
    primaryIndex: { partitionKey: "pk", sortKey: "sk" },
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [bus, table,],
      },
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /policy": "packages/functions/src/policy.create",
    },
  });

  bus.subscribe(["policy.updated"], {
    handler: "packages/functions/src/handlers/policyUpdated.handler",
    // also an abstraction on iam policies - not obvious
    bind: [table]
  });

  bus.subscribe("lead.sold", {
    handler: "packages/functions/src/handlers/leadSold.handler",
    bind: [bus],
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  // ********
  // STEP 3
  // ********


}
