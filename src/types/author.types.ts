export interface authorTypeForAuth {
  id: number;
  email: string;
  password: string;
  name: string;
  bio: string;
  birthdate: string;
}
export interface AuthorType {
  id: number;
  name: string;
  bio?: string;
  birthdate: string;
}

export interface AuthorUpdateType {
  email?: string;
  password?: string;
  name?: string;
  bio?: string;
  birthdate?: string;
}

export interface LoginPayloadType {
  email: string;
  password: string;
}
