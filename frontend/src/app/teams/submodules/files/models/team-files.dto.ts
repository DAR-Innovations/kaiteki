export interface UploadTeamFileDTO {
  description: string;
  file: File;
}

export interface TeamFilesFilter {
  searchValue?: string;
  view?: string;
}

export interface UpdateTeamFileDTO {
  filename: string;
  description: string;
}
