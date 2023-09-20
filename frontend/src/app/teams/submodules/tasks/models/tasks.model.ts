export interface Task {
  title: string;
}

export interface KanbanColumn {
  id: number;
  label: string;
  tasks: Task[];
}
