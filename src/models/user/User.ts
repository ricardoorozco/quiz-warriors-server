import { Database } from '../../services/dynamo/database';
import { IUserCreate } from './user.interface';

const database = new Database();
// Get the name of the DynamoDB table from the environment variables
const table = process.env.USERS_TABLE as string;
/**
 * Saves a new user to the DynamoDB database.
 * @param {string} txId - The transaction ID associated with the save operation.
 * @param {IUserCreate} data - The data for the new user.
 * @returns {Promise<any>} - A promise that resolves with the result of the save operation.
 */
export const save = async (txId: string, data: IUserCreate): Promise<any> => {
  // Destructure the data object to get the username and the rest of the data
  const { username, ...rest } = data;

  //verify if the user exists
  const user = await get(username);

  if (user && typeof user.Item != 'undefined') {
    throw new Error(`The user ${username} already exists`);
  }

  // Create an object with the extra data to save to the DynamoDB item
  const extraData = {
    ip: rest.ip,
    level: rest.level,
    experience: rest.experience,
    coins: rest.coins,
    gems: rest.gems,
    registeredIn: rest.registeredIn
  };

  // Call the save method of the Database class to save the user to the DynamoDB table
  return await database.save(txId, table, { username }, extraData);
}

/**
 * Gets a user from the DynamoDB database.
 * @param {string} username - The username of the user to get.
 * @returns {Promise<any>} - A promise that resolves with the result of the getItem operation.
 */
export const get = async (username: string): Promise<any> => {
  // Call the get method of the Database class to get the user from the DynamoDB table
  return await database.get(table, { username });
}