import UploadConfig from '@config/UploadConfig';
import { Document, model, Schema } from 'mongoose';

export type Accessibilities = {
  name: string;
  has: boolean;
};

export type Address = {
  neighborhood: string;
  zipCode: string;
  city: string;
  complement?: string;
  state: string;
  street: string;
  number: number;
  descricao: string;
};

export type EstablishmentDocument = Document & {
  picture?: string;
  rating: number;
  accessibilities: Accessibilities[];
  cnpj: string;
  address: Address;
  link?: string;
  status: string;
  phone?: string;
  type: string;
  title: string;
  user: string;
};

const stringRequired = {
  type: String,
  required: true,
};

const establishmentSchema = new Schema(
  {
    picture: String,
    rating: { type: Number, required: true, default: 0 },
    accessibilities: [
      {
        name: String,
        has: Boolean,
      },
    ],
    cnpj: { type: String },
    address: {
      neighborhood: stringRequired,
      zipCode: stringRequired,
      city: stringRequired,
      complement: String,
      state: stringRequired,
      street: stringRequired,
      number: { type: Number, required: true },
      descricao: stringRequired,
    },
    link: String,
    status: { type: String, required: true, default: 'pending' },
    phone: String,
    type: stringRequired,
    title: stringRequired,
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

establishmentSchema.virtual('pictureUrl').get(function () {
  if (!this.picture) {
    return null;
  }

  switch (UploadConfig.driver) {
    case 'disk':
      return `http://localhost:${process.env.PORT}/files/${this.picture}`;
    case 's3':
      return `https://${UploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.picture}`;
    default:
      return null;
  }
});

export const Establishment = model<EstablishmentDocument>(
  'Establishment',
  establishmentSchema,
);
