import { TaskPriority } from './tasks.model';

export interface UpdateTaskDTO {
  title?: string;
  content?: string;
  description?: string;
  tag?: string;
  endDate?: Date;
  startDate?: Date;
  priority?: TaskPriority;
  statusId?: number;
  executorId?: number;
}
