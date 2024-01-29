export interface LoginDTO {
  emailOrUsername: string;
  password: string;
}

export interface SignupDTO {
  username: string;
  firstname: string;
  lastname: string;
  birthDate: Date;
  email: string;
  password: string;
}
