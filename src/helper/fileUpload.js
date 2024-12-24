import { prepareAWSConfigs } from "./awsConfig";
import { uploadFile } from "./awsFileUpload";
import { makeHTTPCall } from "./make-http-call";

export const imageUploadOnAWS = async (file) => {
  try {
    const response = await makeHTTPCall("awstempcreds", "GET", true);

    if (response.error) {
      throw new Error(response.message || "Failed to fetch AWS credentials");
    }
    const awsConfig = prepareAWSConfigs(
      response.AccessKeyId,
      response.SecretAccessKey,
      response.SessionToken,
      response.S3BucketName,
      response.S3Region
    );

    const awsResponse = await uploadFile(file, awsConfig);

    if (!awsResponse.fileUrl) {
      throw new Error("File upload failed: No URL returned from AWS");
    }

    return awsResponse.fileUrl;
  } catch (e) {
    console.error("Error uploading file to AWS:", e);
    return e.message;
  }
};
