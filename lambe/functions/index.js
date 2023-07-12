const functions = require('firebase-functions');

const cors = require('cors')({origin: true});

const fs = require('fs');
exports.helloWorld = functions.https.onRequest((request, response) => {
  const uuid = require('uuid-v4');
  const {Storage} = require('@google-cloud/storage');
  const storage = new Storage({
    projectId: 'lambe-42887',
    keyFilename: 'lambe-42887',
  });

  exports.uploadImage = functions.https.onRequest((request, response) => {
    cors(request, response, () => {});
  });
});
