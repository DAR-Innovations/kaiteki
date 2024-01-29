import { TaskPriority } from './tasks.model';

export interface CreateTaskDTO {
  title: string;
  content: string | undefined;
  tag: string;
  description: string;
  endDate: string | undefined;
  startDate: string  | undefined;
  priority: TaskPriority;
  statusId: number;
  executorId: number | undefined;
}
