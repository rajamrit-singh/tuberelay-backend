import { S3Client, PutObjectCommand, S3ClientConfig } from '@aws-sdk/client-s3'; 
import { v4 as uuidv4 } from "uuid"; 
import dotenv from "dotenv";

dotenv.config(); 

const config: S3ClientConfig = {
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    },
    region: process.env.AWS_REGION
};

const s3 = new S3Client(config);

export const uploadVideoToS3 = async (userId: string, file: Express.Multer.File) => { 

    const params = {
        Bucket: 'tube-relay',
        Key: `video/${userId}/${uuidv4()}}`,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    const command = new PutObjectCommand(params);   // Creates a command object representing the S3 'put object' operation
    await s3.send(command); // Sends the command to S3, initiating the upload 

    return { message: 'Video uploaded successfully' }; 
};
