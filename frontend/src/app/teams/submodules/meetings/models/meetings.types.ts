import { TeamMembersDTO } from 'src/app/teams/models/team-members.model'

export interface MeetingsDTO {
	id: number
	title: string
	description: string
	status: MeetingsStatus
	invitedMembers: TeamMembersDTO[]
	createdMember: TeamMembersDTO
	createdDate: Date
	start: Date
	end: Date
}

export enum MeetingsStatus {
	SCHEDULED = 'SCHEDULED',
	IN_PROGRESS = 'IN_PROGRESS',
	COMPLETED = 'COMPLETED',
	CANCELLED = 'CANCELLED',
}

export interface MeetingsFilter {
	searchValue?: string
	startDate?: Date | string
	endDate?: Date | string
	status?: MeetingsStatus
	invitedMemberIds?: number[]
	view?: MeetingsView
	sort?: MeetingsSort
}

export enum MeetingsView {
	LIST = 'list',
	CALENDAR = 'calendar',
}

export enum MeetingsSort {
	DATE_ASC = 'createdDate,asc',
	DATE_DESC = 'createdDate,desc',
}
