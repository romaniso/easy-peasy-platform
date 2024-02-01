import S3 from 'aws-sdk/clients/s3';
import {config} from "../../config/config";
import * as fs from "fs";
import {PutObjectRequest} from "aws-sdk/clients/s3";
import {Key} from "aws-sdk/clients/iot";

const s3 = new S3({
    region: config.awsAvatarsBucketRegion,
    credentials: {
        accessKeyId: config.awsAccessKey as string,
        secretAccessKey: config.awsSecretKey as string,
    },
})

// uploads a file to s3
export async function uploadFile(file: Express.Multer.File) {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams: PutObjectRequest = {
        Bucket: config.awsAvatarsBucketName as string,
        Body: fileStream,
        Key: file.filename,
        ContentType: file.mimetype,
    }
    await s3.upload(uploadParams).promise();

    // Construct the URL based on the bucket name and file key
    const imageUrl = `https://${config.awsAvatarsBucketName}.s3.amazonaws.com/${file.filename}`;

    return imageUrl;
}

export function getFileStream(fileKey: Key) {
    const downloadParams = {
        Key: fileKey,
        Bucket: config.awsAvatarsBucketName as string,
    }
    return s3.getObject(downloadParams).createReadStream();
}
//downloads a file from s3