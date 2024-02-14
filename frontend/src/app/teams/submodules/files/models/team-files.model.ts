export interface TeamFiles {
  id: number;
  fileId: number;
  guid: string;
  filename: string;
  contentType: string;
  size: number;
  createdDate: Date;
  description: string;
  authorTeamMemberId: number;
}
