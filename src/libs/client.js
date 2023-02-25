import { process } from 'process';
import { BlobServiceClient, StorageSharedKeyCredential, newPipeline } from '@azure/storage-blob';

// Create the sharedKeyCredential object which will be used to create a pipeline
const sharedKeyCredential = new StorageSharedKeyCredential(
  process.env.AZURE_STORAGE_ACCOUNT_NAME,
  process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY
);

// Create the pipeline for the BlobServiceClient
const pipeline = newPipeline(sharedKeyCredential);

// Create the BlobServiceClient object which will be used to create a container client
const blobServiceClient = new BlobServiceClient(
  `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  pipeline
);

// Export the blobServiceClient
export { blobServiceClient };
