import { Accessibilities } from '../infra/mongoose/schemas/Establishment';

export default interface ICreateEstablishment {
  accessibilities: Accessibilities[];
  cnpj: string;
  address: {
    neighborhood: string;
    zipCode: string;
    city: string;
    complement?: string;
    state: string;
    street: string;
    number: number;
  };
  link?: string;
  phone?: string;
  type: string;
  title: string;
  user: string;
}
