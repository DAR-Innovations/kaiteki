import { TeamMembersDTO } from 'src/app/teams/models/team-members.model';

export enum TaskPriority {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export enum TaskStatusType {
  OPEN = 'OPEN',
  REGULAR = 'REGULAR',
  DONE = 'DONE',
}

export interface Task {
  id: number;
  title: string;
  description: string;
  content: string | undefined;
  endDate: Date | undefined;
  startDate: Date;
  priority: TaskPriority;
  completed: boolean;
  status: TaskStatus;
  executorMember: TeamMembersDTO | undefined;
  createdMember: TeamMembersDTO;
  notesAmount: number;
  tag: string;
}

export interface TaskStatus {
  id: number;
  name: string;
  color: string;
  order: number;
  type: TaskStatusType;
  tasks: Task[];
}
