import { cognitoClient, cognitoConfig } from '../config/cognitoConfig';
import { AdminCreateUserCommand, InitiateAuthCommand, GlobalSignOutCommand, AuthFlowType, ChangePasswordCommand, AdminCreateUserCommandInput, AdminSetUserPasswordCommand, InitiateAuthCommandInput, GetUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import { checkRequiredParameters, formatCognitoUserAttributes, getUserAttributesObject } from '../utils/usersUtils';
import { UserRegistrationData } from '../models/userTypes';
import { error } from 'console';

export const registerUser = async (userData: UserRegistrationData): Promise<UserRegistrationData> => {
  try {
    const adminCreateParams: AdminCreateUserCommandInput = {
      UserPoolId: cognitoConfig.userPoolId,
      Username: userData.email,
      TemporaryPassword: userData.password,
      UserAttributes: getUserAttributesObject(userData)
    };

    const command = new AdminCreateUserCommand(adminCreateParams);  // Creates a new command object to execute the admin user creation process.
    const result = await cognitoClient.send(command); // Sends the command to Cognito and waits for the result.

    // Need Email Verification by link
    if (result.User?.Username) {
      const passwordCommand = new AdminSetUserPasswordCommand({
        UserPoolId: cognitoConfig.userPoolId,
        Username: userData.email,
        Password: userData.password,
        Permanent: true
      })
      await cognitoClient.send(passwordCommand)
      return userData
    } else {
      throw Error("Unable to create user");
    }
  } catch (error: any) {
    console.error('Error registering user:', error);
    throw new Error(error.message);
  }
};

export const loginUser = async (email: string, password: string) => {
  const initiateAuthParams: InitiateAuthCommandInput = {
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,  // selected auth type in cognito
    ClientId: cognitoConfig.clientId, 
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  const command = new InitiateAuthCommand(initiateAuthParams);

  try {
    const response = await cognitoClient.send(command);
    const loginInfo = await getLoginInfo(response.AuthenticationResult?.AccessToken!)
    console.log(loginInfo)
    return {
      ...loginInfo,
      accessToken: response.AuthenticationResult?.AccessToken,
    }; 
  } catch (error: any) {
    throw new Error(error.message); 
  }
};

export const logoutUser = async (token: string) => {
  const globalSignOutParams = { AccessToken: token }; 
  const command = new GlobalSignOutCommand(globalSignOutParams);

  try {
    await cognitoClient.send(command);
  } catch (error) {
    throw new Error('Logout failed'); 
  }
};

export const updateUserPassword = async (accessToken: string, previousPassword: string, newPassword: string) => {
  const changePasswordParams = {
    AccessToken: accessToken,
    PreviousPassword: previousPassword,
    ProposedPassword: newPassword,
  };

  const command = new ChangePasswordCommand(changePasswordParams);

  try {
    await cognitoClient.send(command);
  } catch (error) {
    throw new Error('Password update failed');
  }
};

export const getLoginInfo = async (accessToken: string) => {
  try {
    const getUserParams = { AccessToken: accessToken };
    const getUserCommand = new GetUserCommand(getUserParams);
    const userResponse = await cognitoClient.send(getUserCommand);
    if (userResponse.UserAttributes) {
      const userAttributes = formatCognitoUserAttributes(userResponse.UserAttributes);  // properly format the attribtues returned by cognito
      return userAttributes
    } else {
      throw error("attributes not found")
    }
  } catch(error: any) {
    throw new Error(error.message)
  }
};