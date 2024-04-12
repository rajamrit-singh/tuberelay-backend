import { Request, Response, NextFunction, Router } from 'express';
import multer from 'multer';    //for handling multipart/form-data
import { uploadVideoToS3 } from '../controllers/s3videoController';

const s3uploadRouter: Router = Router();


export default s3uploadRouter;
