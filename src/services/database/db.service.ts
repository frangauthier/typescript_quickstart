const { CosmosClient } = require("@azure/cosmos");
import { endpoint, key, databaseId, containerId } from "./config";
console.log('endpoint: ', endpoint);

export const client = new CosmosClient({ endpoint, key });
export const database = client.database(databaseId);
export const francisContainer = database.container(containerId);

// const dbs = client.databases.readAll()
// console.log('dbs: ', dbs);