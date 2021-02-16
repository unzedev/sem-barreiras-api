import { Document, model, Schema } from 'mongoose';

export type UserTokenDocument = Document & {
  user: string;
  token: string;
};

const userTokenSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const UserToken = model<UserTokenDocument>('UserToken', userTokenSchema);
