export interface UserProfileApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: UserProfile;
}

export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  professionTitle: string;
  email: string;
  password: string;
  role: "admin" | "user";
  profileImage: string;
  verified: boolean;
  league: string | null;
  category: string | null;
  position: string[];
  socialMedia: SocialMedia[];
  playingVideo: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  otp: string;
  otpExpiry: string; // ISO date string
}

export interface SocialMedia {
  platform?: string;
  url?: string;
}
