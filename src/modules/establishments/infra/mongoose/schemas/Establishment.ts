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
    cnpj: stringRequired,
    address: {
      neighborhood: stringRequired,
      zipCode: stringRequired,
      city: stringRequired,
      complement: String,
      state: stringRequired,
      street: stringRequired,
      number: { type: Number, required: true },
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
  },
);

export const Establishment = model<EstablishmentDocument>(
  'Establishment',
  establishmentSchema,
);