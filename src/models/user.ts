import { model, Schema } from 'mongoose'
import { IUser } from '../interface/user'

const UserSchema: Schema = new Schema<IUser>(
  {
    nip: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true, default: 'USER' },
    uri: { type: String, required: true },
    photo: { type: String, required: true },
    lastLogin: { type: Date, required: true, default: Date.now() },
  },
  {
    timestamps: true,
  }
)

export const User = model<IUser>('User', UserSchema)
