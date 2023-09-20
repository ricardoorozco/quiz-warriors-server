import { DynamoDB } from 'aws-sdk';
import { QueryInput, UpdateItemInput } from 'aws-sdk/clients/dynamodb';
import moment from 'moment';
const DynamoDBValue = require('dynamodb-value');

/**
 * A class representing a DynamoDB database.
 */
export class Database {
  /**
   * The DynamoDB client used to interact with the database.
   */
  dynamodb: DynamoDB;

  /**
   * Creates a new instance of the Database class.
   */
  constructor() {
    // Initialize the DynamoDB client with the specified API version and region
    this.dynamodb = new DynamoDB({ apiVersion: '2012-08-10', region: process.env.REGION });
  };

  /**
   * Saves data to the specified DynamoDB table.
   * @param {string} txId - The transaction ID associated with the data.
   * @param {string} table - The name of the DynamoDB table to save the data to.
   * @param {object} key - The primary key of the item to update.
   * @param {object} extraData - Additional data to save to the item.
   * @returns {Promise<any>} - A promise that resolves with the result of the updateItem operation.
   */
  async save(txId: string, table: string, key: object, extraData: object): Promise<any> {
    // Create the parameters object for the updateItem operation
    const params: UpdateItemInput = {
      TableName: table,
      // Set the primary key of the item to update, DynamoDBValue.toDDB converts the key object to the DynamoDB format
      Key: DynamoDBValue.toDDB(key)
    };

    // Initialize the expression attribute names and values objects
    const expressionAttributeNames: any = {};
    const expressionAttributeValues: any = {};

    // Initialize the update expression with the txId and createdAt attributes
    let updateExpression = `SET #createdAt = :createdAt, #txId = :txId`;

    // Add the txId and createdAt attribute names and values to the expression attribute names and values objects
    expressionAttributeNames[`#txId`] = 'txId';
    expressionAttributeNames[`#createdAt`] = 'createdAt';
    expressionAttributeValues[`:txId`] = txId;
    expressionAttributeValues[`:createdAt`] = moment().format("YYYY-MM-DD");

    // Loop through the extraData object and add each key as an attribute name and value to the expression attribute names and values objects
    for (const key in extraData) {
      if (extraData.hasOwnProperty(key)) {

        console.info({ key, value: extraData[key as keyof typeof extraData] });

        expressionAttributeNames[`#${key}`] = key;
        // Set the value of the expression attribute with the specified key to the value of the corresponding property in the extraData object
        expressionAttributeValues[`:${key}`] = extraData[key as keyof typeof extraData];
        updateExpression += `, #${key} = :${key}`;
      }
    }

    // Set the expression attribute names, values, and update expression in the params object
    params.ExpressionAttributeNames = expressionAttributeNames;
    params.ExpressionAttributeValues = DynamoDBValue.toDDB(expressionAttributeValues);
    params.UpdateExpression = updateExpression;

    // Log the parameters object to the console
    console.info(`Saving on ${table}`, `params: ${JSON.stringify(params)}`);

    // Call the updateItem operation and return the result
    return this.dynamodb.updateItem(params).promise();
  }

  /**
   * Retrieves data from the specified DynamoDB table.
   * @param {string} table - The name of the DynamoDB table to retrieve data from.
   * @param {object} key - The primary key of the item to retrieve.
   * @returns {Promise<any>} - A promise that resolves with the result of the getItem operation.
   */
  async get(table: string, key: object): Promise<any> {
    // Create the parameters object for the getItem operation
    const params = {
      TableName: table,
      // Set the primary key of the item to update, DynamoDBValue.toDDB converts the key object to the DynamoDB format
      Key: DynamoDBValue.toDDB(key)
    };

    // Log the parameters object to the console
    console.info(`Getting from ${table}`, `params: ${JSON.stringify(params)}`);

    // Call the getItem operation and return the result
    return this.dynamodb.getItem(params).promise();
  }

  /**
   * Retrieves all items from the specified DynamoDB table that match the specified query criteria.
   * @param {string} table - The name of the DynamoDB table to retrieve data from.
   * @param {string} indexName - The name of the secondary index of the table to query.
   * @param {string} indexAttribute - The name of the attribute to query.
   * @param {any} indexAttributeValue - The value of the attribute to query.
   * @param {object} filters - The filter to apply to the query.
   * @returns {Promise<any>} - A promise that resolves with the result of the query operation.
   */
  async query(table: string, indexName: string, indexAttribute: string, indexAttributeValue: any, filters: object): Promise<any> {
    // Create the parameters object for the query operation
    const params: QueryInput = {
      TableName: table,
      IndexName: indexName,
      KeyConditionExpression: `#indexAttribute = :indexAttributeValue`,
    }

    // Initialize the expression attribute names and values objects
    let filterExpression = ``;
    const expressionAttributeNames: any = {};
    const expressionAttributeValues: any = {};

    expressionAttributeNames[`#createdAt`] = indexAttribute;
    expressionAttributeValues[`:transactionId`] = indexAttributeValue;

    // Initialize the filter expression
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        expressionAttributeNames[`#${key}`] = key;
        expressionAttributeValues[`:${key}`] = filters[key as keyof typeof filters];

        filterExpression += ` AND #${key} = :${key}`;
      }
    }

    // Set the expression attribute names, values, and update expression in the params object
    params.ExpressionAttributeNames = expressionAttributeNames;
    params.ExpressionAttributeValues = DynamoDBValue.toDDB(expressionAttributeValues);
    params.FilterExpression = filterExpression;

    // Log the parameters object to the console
    console.info(`Querying from ${table}`, `params: ${JSON.stringify(params)}`);

    // Call the query operation and return the result
    return this.dynamodb.query(params).promise();
  }

  /**
   * Gets all the items from the specified DynamoDB table.
   * @param {string} table - The name of the DynamoDB table to retrieve data from.
   * @returns {Promise<any>} - A promise that resolves with the result of the scan operation.
   */
  async getAll(table: string): Promise<any> {
    // Create the parameters object for the scan operation
    const params = {
      TableName: table
    };

    // Log the parameters object to the console
    console.info(`Getting all from ${table}`, `params: ${JSON.stringify(params)}`);

    // Call the scan operation and return the result
    return this.dynamodb.scan(params).promise();
  }
}
