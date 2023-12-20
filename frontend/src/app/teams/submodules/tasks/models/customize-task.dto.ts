import { TaskStatusType } from './tasks.model';

export interface SaveTaskStatusDTO {
  id?: number;
  name: string;
  color: string;
  order?: number;
  type: TaskStatusType;
}

export interface CustomizeStatusDTO {
  openStatus: SaveTaskStatusDTO;
  doneStatus: SaveTaskStatusDTO;
  regularStatuses: SaveTaskStatusDTO[];
}
