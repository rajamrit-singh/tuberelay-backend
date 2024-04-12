import { Request, Response, NextFunction, Router } from 'express';
import multer from 'multer';
import { uploadVideoToS3 } from '../controllers/s3videoController';
import { insertUserVideo } from '../controllers/portalvideoController';

const uploadVideoRouter: Router = Router();

const upload = multer({ storage: multer.memoryStorage() }); 

uploadVideoRouter.post('/uploadVideo', upload.single('video'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.ownerId || !req.file || !req.body.visibility) {
            return res.status(400).send('userId, video file, and visibility are required.');
        }

        const videoKey = await uploadVideoToS3(req.body.ownerId, req.file);
        await insertUserVideo(req.body, videoKey)

        res.status(200).json({ message: 'Video upload and processing initiated' }); 
    } catch (error) {
        console.error("Error in /uploadVideo route:", error); 
        res.status(500).json({ error: 'An error occurred during upload' });
    }
});

export default uploadVideoRouter;
