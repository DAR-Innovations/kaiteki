import { MeetingsStatus } from '../models/meetings.types'

export function getFormattedMeetingStatus(status: MeetingsStatus) {
	switch (status) {
		case MeetingsStatus.SCHEDULED:
			return 'Scheduled'
		case MeetingsStatus.IN_PROGRESS:
			return 'In progress'
		case MeetingsStatus.FINISHED:
			return 'Finished'
	}
}
