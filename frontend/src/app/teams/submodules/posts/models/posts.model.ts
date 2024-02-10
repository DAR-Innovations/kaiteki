export interface Posts {
  id: number;
  title: string;
  description: string;
  content: string;
  createdDate: Date;
  authorFullName: string;
  heroImageId: number;
  liked: boolean;
  authorMemberId: number;
}
