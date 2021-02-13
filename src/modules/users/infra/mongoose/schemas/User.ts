import { Document, model, Schema } from 'mongoose';

export type UserDocument = Document & {
  name: string;
  email: string;
  password: string;
  phone?: string;
  deficiency?: string;
  role: 'administrator' | 'user';
};

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    phone: String,
    deficiency: String,
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<UserDocument>('User', userSchema);
