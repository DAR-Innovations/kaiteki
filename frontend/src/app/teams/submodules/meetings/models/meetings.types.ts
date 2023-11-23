export interface MeetingDTO {
  id: number;
  title: string;
  description: string;
  start: Date;
  status: string;
}

export interface MeetingsFilter {
  view?: MeetingsView;
  particapants?: number[];
  sort?: MeetingsSort;
}

export enum MeetingsView {
  LIST,
  CALENDAR,
}

export enum MeetingsSort {
  DATE_ASC,
  DATE_DESC,
}
