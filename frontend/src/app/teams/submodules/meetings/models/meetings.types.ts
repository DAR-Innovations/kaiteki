import { TeamMembersDTO } from 'src/app/teams/models/team-members.model';

export interface MeetingsDTO {
  id: number;
  title: string;
  description: string;
  status: MeetingsStatus;
  invitedMembers: TeamMembersDTO[];
  createdMember: TeamMembersDTO;
  createdDate: Date;
  start: Date;
  end: Date;
}

export enum MeetingsStatus {
  SCHEDULED,
  IN_PROGRESS,
  COMPLETED,
  CANCELLED,
}

export interface MeetingsFilter {
  searchValue?: string;
  startDate?: Date;
  endDate?: Date;
  status?: MeetingsStatus;
  createdMemberId?: number;
  invitedMemberIds?: number[];
  view?: MeetingsView;
  sort?: MeetingsSort;
}

export enum MeetingsView {
  LIST = 'LIST',
  CALENDAR = 'CALENDAR',
}

export enum MeetingsSort {
  DATE_ASC = 'createdDate,asc',
  DATE_DESC = 'createdDate,desc',
}
