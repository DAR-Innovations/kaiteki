export interface CreatePostDTO {
  title: string;
  description: string;
  content: string;
  image?: File;
}

export interface UpdatePostDTO {
  title: string;
  description: string;
  content: string;
  image?: File;
}

export interface PostsFilter {
  searchValue: string;
}
