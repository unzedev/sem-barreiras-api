import { container } from 'tsyringe';
import UploadConfig from '@config/UploadConfig';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import S3StorageProvider from './StorageProvider/implementations/S3StorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import MailgunProvider from './MailProvider/implementations/MailgunProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IMailProvider>('MailProvider', MailgunProvider);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[UploadConfig.driver],
);
