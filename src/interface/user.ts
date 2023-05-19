export interface IUser {
  id?: any
  nip: string
  password: string
  name: string
  role: 'ADMIN' | 'USER'
  uri: string
  photo: string
  lastLogin: Date
  createdAt?: Date
  updatedAt?: Date
}
