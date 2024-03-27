import { TaskPriority } from '../models/tasks.model'

export function getPriorityString(priority: TaskPriority): string {
	switch (priority) {
		case TaskPriority.HIGH:
			return 'High'
		case TaskPriority.MEDIUM:
			return 'Medium'
		case TaskPriority.LOW:
			return 'Low'
	}
}
