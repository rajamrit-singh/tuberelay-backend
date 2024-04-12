import { AttributeType } from "@aws-sdk/client-cognito-identity-provider";
import { REQUIRED_KEYS_FOR_REGISTRATION } from "../constants";
import { UserRegistrationData } from "../models/userTypes";

/**
 * Checks if all required parameters for user registration are present.
 * 
 * @param params - The user registration data object conforming to the `UserRegistrationData` type.
 * @returns The original `params` object if validation passes.
 * @throws An Error if any required parameters are missing.
 */
export const checkRequiredParameters = (params: UserRegistrationData): UserRegistrationData => {
    const missingParams = REQUIRED_KEYS_FOR_REGISTRATION.filter(key => !(key in params));

    if (missingParams.length > 0) {
        throw new Error(`Missing required parameters: ${missingParams.join(', ')}`);
    }

    return params;
}

/**
 * Transforms an array of Cognito user attributes into a user object with string keys and values.
 * 
 * @param attributes - An array of `AttributeType` objects, as provided by Cognito responses.
 * @returns An object where attribute names become keys and attribute values become values (as strings).
 */
export const formatCognitoUserAttributes = (attributes: AttributeType[]) => {
    const formattedAttributes: { [key: string]: string } = {}

    attributes.forEach((attribute: AttributeType) => {
        if (attribute.Name) {
            formattedAttributes[attribute.Name] = attribute.Value || ''; // Handles potentially undefined values
        }
    });

    return formattedAttributes;
}

export const getUserAttributesObject = (userData: UserRegistrationData) => {
    return [
        {
            Name: "name",
            Value: userData.name
        },

        {
            Name: "birthdate",
            Value: userData.birthdate
        },

        {
            Name: "gender",
            Value: userData.gender
        }
    ]
}
