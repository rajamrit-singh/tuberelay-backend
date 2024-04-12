CREATE TYPE visibility_status AS ENUM ('public', 'hidden', 'private');

CREATE TABLE user_videos (
    video_id UUID PRIMARY KEY,
    user_id VARCHAR,
    editor_id VARCHAR,
    title TEXT,
    description TEXT,
    is_kids_friendly BOOLEAN NOT NULL,
    is_age_restricted BOOLEAN NOT NULL,
    visibility visibility_status NOT NULL,
    schedule TIMESTAMP
);
