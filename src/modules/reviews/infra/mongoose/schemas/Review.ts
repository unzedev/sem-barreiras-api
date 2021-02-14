import { Document, model, Schema } from 'mongoose';

export type Accessibilities = {
  name: string;
  review: 'Não sei' | 'Não encontrei' | 'Encontrei';
};

export type ReviewDocument = Document & {
  accessibilities: Accessibilities[];
  comment: string;
  rating: number;
  strengths: string;
  weaknesses: string;
  title: string;
  status: string;
  establishment: string;
  user: string;
};

const stringRequired = {
  type: String,
  required: true,
};

const reviewSchema = new Schema(
  {
    accessibilities: [
      {
        name: stringRequired,
        review: stringRequired,
      },
    ],
    comment: stringRequired,
    rating: { type: Number, required: true, default: 0 },
    strengths: stringRequired,
    weaknesses: stringRequired,
    title: stringRequired,
    status: { type: String, required: true, default: 'pending' },
    establishment: {
      type: Schema.Types.ObjectId,
      ref: 'Establishment',
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  },
);

export const Review = model<ReviewDocument>('Review', reviewSchema);
