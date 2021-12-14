const {
    S3Client, ListBucketsCommand, PutObjectCommand, CreateBucketCommand,
} = require("@aws-sdk/client-s3");

class S3 {
    constructor(){
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

    sleep(){
        return new Promise((resolve) => {
            setTimeout(resolve, this.sleepTime);
        })
    }

    async getBucketList(){
        return await this.s3Client.send(new ListBucketsCommand({}));
    }

    async config(){
        let tries = 1;
        let bucketList;
        while(tries <= this.retries){
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
                    const bucketData = await this.s3Client.send(new CreateBucketCommand({ Bucket: this.bucketName }));
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

    async upload(){
        const bucketParams = {
            Bucket: this.bucketName,
            // Specify the name of the new object. For example, 'index.html'.
            // To create a directory for the object, use '/'. For example, 'myApp/package.json'.
            Key: "files/test.txt",
            // Content of the new object.
            Body: "BODY",
        };
        const data = await this.s3Client.send(new PutObjectCommand(bucketParams));
        console.log(data);
    }
}

const s3 = new S3();

module.exports.config = async () => {
    return await s3.config();
};


module.exports.upload = async () => {
    return await s3.upload();
};
