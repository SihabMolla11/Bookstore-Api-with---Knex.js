export interface AuthorType {
  id: number;
  email: string;
  password: string;
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
