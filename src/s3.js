const {
    S3Client, ListBucketsCommand, PutObjectCommand, CreateBucketCommand,
} = require("@aws-sdk/client-s3");

class S3 {
    constructor() {
        this.credentials = {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_KEY,
        };
        this.retries = 5;
        this.sleepTime = 5000;

        this.region = process.env.AWS_BUCKET_REGION;
        this.endpoint = process.env.AWS_BUCKET_ENDPOINT;

        this.bucketName = process.env.AWS_BUCKET_NAME;

        // aws.config.update({region: process.env.AWS_REGION});
        this.s3Client = new S3Client({
            credentials: this.credentials,
            region: this.region,
            endpoint: this.endpoint,
            forcePathStyle: true,
        });
    }

    sleep() {
        return new Promise((resolve) => {
            setTimeout(resolve, this.sleepTime);
        });
    }

    getBucketList() {
        return this.s3Client.send(new ListBucketsCommand({}));
    }

    async config() {
        let tries = 1;
        let bucketList;
        while (tries <= this.retries) {
            try {
                bucketList = await this.getBucketList();
            } catch (err) {
                console.error("Could not list AWS buckets, retrying...");
                tries += 1;
                await this.sleep();
                continue;
            }
            if (bucketList.Buckets.length === 0) {
                console.log(`\nCreating Bucket: ${this.bucketName}`);
                try {
                    const bucketData = await this.s3Client.send(
                        new CreateBucketCommand({
                            Bucket: this.bucketName,
                        }),
                    );
                    console.log(`Sucessfully create bucket: ${this.bucketName} at ${bucketData.Location}\n`);
                    return true;
                } catch (err) {
                    console.error("Could not create bucket, retrying");
                    await this.sleep();
                    continue;
                }
            } else {
                console.log(`\nAWS Bucket '${this.bucketName}' successfully configured!\n`);
                return true;
            }
        }
        return false;
    }

    async upload(name, data) {
        const key = `files/${new Date().getTime()}_${name}`;
        const bucketParams = {
            Bucket: this.bucketName,
            // Specify the name of the new object. For example, 'index.html'.
            // To create a directory for the object, use '/'. For example, 'myApp/package.json'.
            Key: key,
            // Content of the new object.
            Body: data,
        };
        try {
            await this.s3Client.send(new PutObjectCommand(bucketParams));
            return key;
        } catch (err) {
            throw err;
        }
    }
}

const s3 = new S3();

module.exports.config = () => s3.config();

module.exports.upload = (name, data) => s3.upload(name, data);
