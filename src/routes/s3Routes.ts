import { Request, Response, NextFunction, Router } from 'express';
import multer from 'multer';    //for handling multipart/form-data
import { uploadVideoToS3 } from '../controllers/s3videoController';

const s3uploadRouter: Router = Router();

/*
Revisit this part. Storing in memory for very large video files may become a problem.
*/
const upload = multer({ storage: multer.memoryStorage() });
// Configures multer to store uploaded files in memory temporarily

s3uploadRouter.post('/s3videos/upload', upload.single('video'), async (req: Request, res: Response, next: NextFunction) => {
// multer middleware will look for a single file uploaded with name 'video'
    try {
        const userId = req.body.userId;
        const file = req.file;  //multer places the parsed data in req.file

        if (!userId || !file) {
            return res.status(400).send('Both userId and video file are required.');
        }

        const uploadResult = await uploadVideoToS3(userId, file);
        res.status(200).json(uploadResult);
    } catch (error) {
        console.error("Non-Error type thrown:", error);
        res.status(500).json({ error: 'An unknown error occurred' });
    }
});

export default s3uploadRouter;
