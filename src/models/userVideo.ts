export interface UserVideo {
    videoKey: string;
    ownerId: string;
    bucketName: string;
    editorId: string; 
    title: string;
    description: string;
    isKidsFriendly: boolean;
    isAgeRestricted: boolean;
    visibility: 'public' | 'hidden' | 'private'; 
    schedule: Date | null; 
  }
  