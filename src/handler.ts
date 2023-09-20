import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { AWSResponse } from './common/interfaces/AWS'

// controllers
import { create , getOne, update } from './controllers/user.controller'

/**
 * Returns the server status.
 * @returns {AWSResponse} The response with a 200 status code when the request is completed successfully.
 * @author Ricardo Orozco Leon
 * @created 2023-09-18
 * @lastModifiedBy
 * @lastModified
 */
export const index = (): AWSResponse => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'The server is ON!!!'
    },
    null,
    2
    )
  }

  return response
}

/**
 * Adds a new user to the database.
 * @param {APIGatewayProxyEvent} event - The API Gateway event that triggered this function to get the username from the request body.
 * @param {Context} context - The execution context of the function to get the AWS request ID.
 * @returns {Promise<AWSResponse>} A promise that resolves with the function's response indicating whether the user was created or not.
 * @author Ricardo Orozco Leon
 * @created 2021-09-18
 * @lastModifiedBy
 * @lastModifiedAt
 */
export const addUser = async (event: APIGatewayProxyEvent, context: Context): Promise<AWSResponse> => {
  let response: AWSResponse

  response = await create(event, context);

  return response
}

/**
 * Retrieves a user from the database.
 * @param {APIGatewayProxyEvent} event - The API Gateway event that triggered this function. The username is obtained from the URL parameters.
 * @param {Context} context - The execution context of the function. The AWS request ID is obtained from this context.
 * @returns {Promise<AWSResponse>} A promise that resolves with the function's response containing the user information.
 */
export const getUser = async (event: APIGatewayProxyEvent, context: Context): Promise<AWSResponse> => {
  let response: AWSResponse

  response = await getOne(event, context);

  return response
}

/**
 * Updates a user in the database.
 * @param {APIGatewayProxyEvent} event - The API Gateway event that triggered this function. The username is obtained from the URL parameters, and the new user data is obtained from the request body.
 * @param {Context} context - The execution context of the function. The AWS request ID is obtained from this context.
 * @returns {Promise<AWSResponse>} A promise that resolves with the function's response indicating whether the user was updated or not.
 */
export const updateUser = async (event: APIGatewayProxyEvent, context: Context): Promise<AWSResponse> => {
  let response: AWSResponse

  response = await update(event, context);

  return response
}