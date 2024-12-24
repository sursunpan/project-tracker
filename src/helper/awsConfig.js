export const prepareAWSConfigs = (
  AccessKeyId,
  SecretAccessKey,
  SessionToken,
  S3BucketName,
  S3Region
) => {
  return {
    accessKeyId: AccessKeyId,
    secretAccessKey: SecretAccessKey,
    sessionToken: SessionToken,
    S3BucketName: S3BucketName,
    S3Region: S3Region,
  };
};
