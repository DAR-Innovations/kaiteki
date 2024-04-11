import { TeamMembersDTO } from 'src/app/teams/models/team-members.model'

export interface TeamMemberPerformance {
	id: string
	createdDate: Date
	highPriorityTasks: number
	mediumPriorityTasks: number
	lowPriorityTasks: number
	attendantMeetings: number
	screenTimeMinutes: number
}

export interface AddMemberPerformanceValues {
	highPriorityTasks: number
	mediumPriorityTasks: number
	lowPriorityTasks: number
	attendantMeetings: number
	screenTimeMinutes: number
}

export interface TeamMemberPerformanceDTO {
	performance: number
	member: TeamMembersDTO
}
