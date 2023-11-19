const express = require('express');
const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

aws.config.update({
    accessKeyId: 'string',
    secretAccessKey: 'string',
    region: 'us-east-1',
});

const s3 = new AWS.S3();

const app = express();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'your butcjat',
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname);
        },
    }),
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('file uploadde');
});

const Port = 3000;

app.listen(Port, () => {
    console.log(`listening on port ${Port}`);
});
