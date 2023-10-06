import { Table as sstTable } from "sst/node/table";
import { Entity, Table } from 'dynamodb-toolbox';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

export const table = sstTable



// Instantiate a DocumentClient
export const DocumentClient = DynamoDBDocumentClient.from(new DynamoDBClient({}))


// Instantiate a table
const MyTable = new Table({
  // Specify table name (used by DynamoDB)
  name: table.PolicyTable.tableName,

  // Define partition and sort keys
  partitionKey: 'pk',
  sortKey: 'sk',

  // Add the DocumentClient
  DocumentClient
})

export const PolicyTable = new Entity({
  // Specify entity name
  name: 'Policy',

  // Define attributes
  attributes: {
    day: { type: 'string', partitionKey: true }, // flag as partitionKey
    sk: { hidden: true, sortKey: true }, // flag as sortKey and mark hidden
    id: { type: 'string' }, // alias table attribute 'co' to 'company'
    firstName: ['sk', 0], // composite key mapping
    lastName: ['sk', 1] // composite key mapping
  },

  // Assign it to our table
  table: MyTable

  // In Typescript, the "as const" statement is needed for type inference
} as const)
