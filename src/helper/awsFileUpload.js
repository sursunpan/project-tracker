import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const uploadFile = async (file, config) => {
  const s3Client = new S3Client({
    region: config.S3Region,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      sessionToken: config.sessionToken,
    },
  });

  // Define Upload Parameters
  const params = {
    Bucket: config.S3BucketName,
    Key: file.name,
    Body: file,
  };

  try {
    const command = new PutObjectCommand(params);
    const data = await s3Client.send(command);
    // console.log("File uploaded successfully:", data);
    const fileUrl = `https://${config.S3BucketName}.s3.${config.S3Region}.amazonaws.com/${file.name}`;
    // console.log("File URL:", fileUrl);
    return { data, fileUrl };
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("File upload failed.");
  }
};
