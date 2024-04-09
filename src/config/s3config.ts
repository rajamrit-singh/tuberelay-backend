import { S3ClientConfig } from '@aws-sdk/client-s3'; 
import dotenv from "dotenv";

dotenv.config(); 

export const s3config: S3ClientConfig = {
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    },
    region: process.env.AWS_REGION
};
