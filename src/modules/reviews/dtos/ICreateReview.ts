import { Accessibilities } from '../infra/mongoose/schemas/Review';

export default interface ICreateReview {
  accessibilities: Accessibilities[];
  comment: string;
  rating: number;
  strengths: string;
  weaknesses: string;
  title: string;
  establishment: string;
  user: string;
}
