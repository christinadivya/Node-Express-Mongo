const https = require('https');

const frontEndURL = `${process.env.APP_URL}:${process.env.WEB_PORT}`;

function callfcm(id, cb) {
  const requestData = '{ "dynamicLinkInfo": { "dynamicLinkDomain": "hu3ua.app.goo.gl", "link":"' + frontEndURL + '/signup?invitation=' + id + '","androidInfo": { "androidPackageName": "com.skillcord" } }, "suffix": {  "option": "SHORT" }}';
  const options = {
    host: 'firebasedynamiclinks.googleapis.com',
    path: '/v1/shortLinks?key=AIzaSyD5I45YSEHO_jqkmCIPUIYom6H81ZdbDf4',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  };
  const callback = function (response) {
    let str = '';
    response.on('data', (chunk) => {
      str += chunk;
    });
    response.on('end', () => {
      cb(str);
    });
  };
  const req = https.request(options, callback);
    // This is the data we are posting, it needs to be a string or a buffer
  req.write(requestData);
  req.end();
}
module.exports ={ callfcm };
