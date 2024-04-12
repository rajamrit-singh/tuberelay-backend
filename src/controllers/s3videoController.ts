import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'; 
import { v4 as uuidv4 } from "uuid"; 
import { s3config } from '../config/s3config';

const s3 = new S3Client(s3config);

export const uploadVideoToS3 = async (userId: string, file: Express.Multer.File) => {
    const videoId = uuidv4();
    try {
        const params = {
            Bucket: 'tube-relay',
            Key: `video/${userId}/${videoId}}`,
            Body: file.buffer,
            ContentType: file.mimetype
        };
    
        const command = new PutObjectCommand(params);   // Creates a command object representing the S3 'put object' operation
        const uploadedVideo = await s3.send(command); // Sends the command to S3, initiating the upload     
        return videoId;
    } catch (error: any) {
        return error.message;
    }
};
