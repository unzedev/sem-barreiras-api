import fs from 'fs';
import path from 'path';
import mime from 'mime';
import aws, { S3 } from 'aws-sdk';

import uploadConfig from '@config/UploadConfig';

import IStorageProvider from '../models/IStorageProvider';

export default class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'sa-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: String(process.env.BUCKET),
        Key: file,
      })
      .promise();
  }
}
