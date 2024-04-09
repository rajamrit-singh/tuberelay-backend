import { cognitoClient, cognitoConfig } from '../config/cognitoConfig';
import { AdminCreateUserCommand } from '@aws-sdk/client-cognito-identity-provider';

export const registerUser = async (email: string, password: string): Promise<string> => {
  try {
    const adminCreateParams = {
      UserPoolId: cognitoConfig.userPoolId,
      Username: email,
      TemporaryPassword: password,
    };

    const command = new AdminCreateUserCommand(adminCreateParams);  // Creates a new command object to execute the admin user creation process.
    const result = await cognitoClient.send(command); // Sends the command to Cognito and waits for the result.

    if (result.User?.Username) {
      return result.User?.Username
    } else {
      throw Error("Unable to create user");
    }
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('Failed to register user');
  }
};
