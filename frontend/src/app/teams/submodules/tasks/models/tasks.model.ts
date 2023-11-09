export enum TaskPriority {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export interface Task {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  executorName: string;
  tags: string[];
  priority: TaskPriority;
  status: string;
}

export interface TaskColumn {
  id: number;
  name: string;
  color: string;
  tasks: Task[];
}
