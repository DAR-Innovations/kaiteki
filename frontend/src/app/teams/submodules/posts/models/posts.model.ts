import { TeamMembersDTO } from 'src/app/teams/models/team-members.model'

export interface Posts {
	id: number
	title: string
	description: string
	content: string
	createdDate: Date
	heroImageId: number
	liked: boolean
	authorTeamMember: TeamMembersDTO
}
