export interface MeetingSignalRequestDTO {}

export interface MeetingSignalResponseDTO {}

export interface ZoomMeetingAuthData {
  authEndpoint: string;
  sdkKey: string;
  meetingNumber: string;
  passWord: string;
  role: number;
  userName: string;
  userEmail?: string;
  registrantToken?: string;
  zakToken?: string;
  signature: string;
}
