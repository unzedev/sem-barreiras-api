import AppError from '@shared/errors/AppError';
import Mailgun, { Mailgun as IMailgun } from 'mailgun-js';

import IMailProvider from '../models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  private client: IMailgun;

  constructor() {
    this.client = new Mailgun({
      apiKey: String(process.env.MAILGUN_API_KEY),
      domain: 'unze.com.br',
    });
  }

  public async sendMail(to: string, text: string): Promise<void> {
    const data = {
      to,
      text,
      from: 'no-reply@unze.com.br',
      subject: 'Recuperação de senha',
    };

    await this.client.messages().send(data, function (error, body) {
      if (error) {
        throw new AppError('Send recovery email failed', 500);
      }
    });
  }
}
