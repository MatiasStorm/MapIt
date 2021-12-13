const {
    S3Client, ListBucketsCommand, PutObjectCommand, CreateBucketCommand,
} = require("@aws-sdk/client-s3");

const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
};

const region = process.env.AWS_BUCKET_REGION;
const endpoint = process.env.AWS_BUCKET_ENDPOINT;

const bucketName = process.env.AWS_BUCKET_NAME;

// aws.config.update({region: process.env.AWS_REGION});
s3 = new S3Client({
    credentials,
    region,
    endpoint,
    forcePathStyle: true,
});

module.exports.config = async () => {
    try {
        const bucketList = await s3.send(new ListBucketsCommand({}));
        if (bucketList.Buckets.length === 0) {
            console.log(`\nCreating Bucket: ${bucketName}`);
            try {
                const bucketData = await s3.send(new CreateBucketCommand({ Bucket: bucketName }));
                console.log(`Sucessfully create bucket: ${bucketName} at ${bucketData.Location}\n`);
            } catch (err) {
                console.error("Could not create bucket...", err);
            }
        } else {
            console.log(`\nAWS Bucket '${bucketName}' successfully configured!\n`);
        }
    } catch (err) {
        console.error("Could not list AWS buckets", err);
    }
};

module.exports.upload = async () => {
    const bucketParams = {
        Bucket: bucketName,
        // Specify the name of the new object. For example, 'index.html'.
        // To create a directory for the object, use '/'. For example, 'myApp/package.json'.
        Key: "files/test.txt",
        // Content of the new object.
        Body: "BODY",
    };
    const data = await s3.send(new PutObjectCommand(bucketParams));
    console.log(data);
};
