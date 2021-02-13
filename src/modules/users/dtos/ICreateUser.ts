export default interface ICreateAdmin {
  name: string;
  email: string;
  password: string;
  phone?: string;
  deficiency?: string;
  role: 'administrator' | 'user';
}
