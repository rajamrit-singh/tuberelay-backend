import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import dotenv from "dotenv";

dotenv.config(); 

// Creates an instance of the Cognito client, configured to interact with the specified AWS region.
export const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.COGNITO_REGION }); // this is used to interact with cognito services

export const cognitoConfig = {
  userPoolId: process.env.COGNITO_USER_POOL_ID,
  clientId: process.env.COGNITO_CLIENT_ID,
  clientSecret: process.env.COGNITO_CLIENT_SECRET!
};
