import moment from 'moment-timezone'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'
const DynamoDBValue = require('dynamodb-value');

import { IUserCreate } from '../models/user/user.interface'
import { AWSResponse } from '../common/interfaces/AWS'
import { save, get } from '../models/user/User'

/**
 * Creates a new user in the database.
 * @param {APIGatewayProxyEvent} event - The API Gateway event that triggered this function. The username is obtained from the request body.
 * @param {Context} context - The execution context of the function. The AWS request ID is obtained from this context.
 * @returns {Promise<AWSResponse>} A promise that resolves with the function's response containing a success message.
 */
export const create = async (event: APIGatewayProxyEvent, context: Context): Promise<AWSResponse> => {
  // Step 1: Initialize the response object
  let response: AWSResponse
  try {
    // Step 2: Extract the username from the request body
    const { username } = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    // Step 3: Get the transaction ID from the context
    const transaction = context.awsRequestId
    // Step 4: Get the IP address from the request headers
    const ip = event.headers['X-Forwarded-For'] || event.headers['x-forwarded-for'] || event.headers['X-Forwarded-For'] || event.headers['x-forwarded-for']

    // Step 5: Create a new user object with the extracted data
    const userData: IUserCreate = {
      username,
      transaction,
      ip: ip as string,
      level: 1,
      experience: 0,
      coins: 0,
      gems: 0,
      registeredIn: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    // Step 6: Save the new user to the database
    const user = await save(transaction, userData);

    // Step 7: Set the response status code and message
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'User created successfully!!!',
      },
        null,
        2
      )
    }
  } catch (error: any) {
    // Step 8: Handle any errors that occur during the function execution
    console.error({ code: 'create Step 8', error })
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error!!!'
      },
        null,
        2
      )
    }
  }

  // Step 9: Return the response object
  return response
}

/**
 * Retrieves a user from the database.
 * @param {APIGatewayProxyEvent} event - The API Gateway event that triggered this function. The username is obtained from the URL parameters.
 * @param {Context} context - The execution context of the function. The AWS request ID is obtained from this context.
 * @returns {Promise<AWSResponse>} A promise that resolves with the function's response containing the user information.
 */
export const getOne = async (event: APIGatewayProxyEvent, context: Context): Promise<AWSResponse> => {
  // Step 1: Initialize the response object
  let response: AWSResponse
  try {
    // Step 2: Extract the username from the URL parameters
    const { username } = event.pathParameters as { username: string }
    // Step 3: Retrieve the user from the database
    const user = await get(username);

    // Step 4: Set the response status code and message, and include the retrieved user in the response body
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'User retrieved successfully!!!',
        user: DynamoDBValue.fromDDB(user.Item)
      },
        null,
        2
      )
    }
  } catch (error: any) {
    // Step 5: Handle any errors that occur during the function execution
    console.error({ code: 'getOne Step 5', error })
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error!!!'
      },
        null,
        2
      )
    }
  }

  // Step 6: Return the response object
  return response
}

/**
 * Updates a user in the database.
 * @param {APIGatewayProxyEvent} event - The API Gateway event that triggered this function. The username is obtained from the URL parameters, and the new user data is obtained from the request body.
 * @param {Context} context - The execution context of the function. The AWS request ID is obtained from this context.
 * @returns {Promise<AWSResponse>} A promise that resolves with the function's response indicating whether the user was updated or not.
 */
export const update = async (event: APIGatewayProxyEvent, context: Context): Promise<AWSResponse> => {
  // Step 1: Initialize the response object
  let response: AWSResponse
  try {
    // Step 2: Extract the username from the request body
    const { username, level, experience, coins, gems, updatedIn } = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    // Step 3: Get the transaction ID from the context
    const transaction = context.awsRequestId
    // Step 4: Get the IP address from the request headers
    const ip = event.headers['X-Forwarded-For'] || event.headers['x-forwarded-for'] || event.headers['X-Forwarded-For'] || event.headers['x-forwarded-for']

    // Step 5: Create a new user object with the extracted data
    const userData: IUserCreate = {
      username,
      transaction,
      ip: ip as string,
      level,
      experience,
      coins,
      gems,
      updatedIn: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    // Step 6: Save the new user to the database
    const user = await save(transaction, userData);

    // Step 7: Set the response status code and message
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'User created successfully!!!',
      },
        null,
        2
      )
    }
  } catch (error: any) {
    // Step 8: Handle any errors that occur during the function execution
    console.error({ code: 'create Step 8', error })
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error!!!'
      },
        null,
        2
      )
    }
  }

  // Step 9: Return the response object
  return response
}