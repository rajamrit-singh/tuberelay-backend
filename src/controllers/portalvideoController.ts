import { UserVideo } from "../models/userVideo";
import pool from "../db/pool";
import dotenv from "dotenv";

dotenv.config();
export const insertUserVideo = async ({
    ownerId,
    editorId,
    title,
    description,
    isKidsFriendly,
    isAgeRestricted,
    visibility,
    schedule
}: UserVideo, videoKey: string) => {
    const userSchedule = schedule ? new Date(schedule) : null;
    try {

        const queryText = `
            INSERT INTO user_videos (
                video_key,
                owner_id,
                bucket_name,
                editor_id, 
                title,
                description,
                is_kids_friendly,
                is_age_restricted,
                visibility,
                schedule
            ) VALUES (
              $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
            )
        `;

        const queryValues = [
            videoKey,
            ownerId,
            process.env.S3_BUCKET_NAME,
            editorId,
            title,
            description,
            isKidsFriendly,
            isAgeRestricted,
            visibility,
            userSchedule
        ];

        await pool.query(queryText, queryValues);
        await pool.query('COMMIT');
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Error inserting user video:', error);
        throw error;
    }
};
