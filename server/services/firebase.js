const firebase = require('firebase');
require('firebase/auth');
require('firebase/database');
 // Initialize Firebase for the application

var admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "my-first-3df57",
    "private_key_id": "7d55789ca97e39e0d2abaea351e941263d8fcb8d",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCf9EFLppaeATNy\n/WcWpz27QQdmACIJAzyMTF/kDNmoeggLP6LhLabsS0fMTeUNYdghdJz5XKJJOewH\nsVxQLQuQvKyJEt7KoZexxtyhDpwEUqF5CCI5Ss+t1jLuEWce3PwRYZtSNgwr0tTL\nBAjdDDL9DoMS00SdXx6jHPN5wc2A3TOVMzTu6kZc5InTP1ZSGrxvxeb3OVpM8EAy\nnIjRg2EYAd+6O4RBEoK4LJBJSrJt4chmiLylRPLHTtzFc9kJupQYVsrfcsZkjsGY\nltJPBFq+Dzs2Jwa7VxxxancWgO0e42GojX7DpnUjCTX+BybsgJBGZzaqiQ5RZpH5\n8+IdlNpHAgMBAAECggEAAmALpNZv78pfxl+EljMHOSPG5YOvUwfvxbuP7vXROO26\n9y52OjbF1EYX5leVGk+aIyu1SwSjn50TEq2BC+sR/A+5K33oE1qL7fFghFRltQYP\nF2+AppjO9atebTzn6u7oH/qdkP50IXsg0B+atsGVc5Qxa72kYVvbZhuqHTmSAM2s\nvC9r9C5Dn3YtY8rwzL0xNCb6O1toiAJQRvcxj/rKwsd7fag86WpTppT68tjEVd1w\nb9Mc4EX8SROJPCOm2nqurMC2f5NBm0HLRFB0S/BXkZlke4BmL7Jk4EjM0CmQNwDc\nWX8igzeeoTsy6ChLDzl5bzy7+rwgWps4Tk3xSirvmQKBgQDN8cv5IoXlAltsX3ls\nVga3nklE9AqjKsjhVBdTQQsLOZfFB7OwF8q1WgVdyoVgC1JEK64GXYohppoNf5g/\nEeN744ODdr6z6bbEiBJWwvw5ovPfi2pBK5n4q2jztoH6uvQjBQBUJzj1UA2KexVI\n/iDUzTvJF8movOkD3tuv7FPGTwKBgQDG1NxjwaMVchaMVuGZOOQGkbD322FAhAI0\nOV74fTelu3OMFTSCONNs2WfQYD48sRleGsq+gkC9/vM/gk2u5AOCzlmBHlKEbLVj\n2SEa23Bi4tKOmL+/WrYbC6uOFSTygR07IAayedg1uYLu+uQLCoMo2Z+7DVlZuZss\nHCtJcbAmiQKBgQCzgeMs0O6sYpWVrNKFn6ZTPmDW/XCYMJ7P6SA7rSIXMqgbUU9K\nWjKSSFkNG42N3dBjIz+YxMe19SWqRmFJ+Cm0vubPHB21bC2muIRjo6l+A49Wdoqz\nK3IV0jK024wIJBTQwXc74sQ+7vwejJJNAVVUp19JNLbNoXvpp8MNYIzU+QKBgGoM\noJwIbL6EgmhJ8rvxrxWd4YDhnuZ1QmOucewhhWu9Jm0B5mbKfmIhNxDaNHfUkc4y\nhg7ElFmCQSWPj3WHoiPDgdOvY53ECZ9+8PxNLI1ho6Jw8FzUuiqEt/TpbDJ4ESo2\n87t/54UINEDYyoblDX3dTSfMf+quZ4hIYgIjRCvZAoGAahC6jMoRcjTk4smUeF8b\nevq/Lzmr6HdBUjsL24U4ySP30zAZbhFBlAI+ZQ47x2kFkmFutQ3+QDraXEyuyr6A\nOoj080z5YPtNcWpom/H0AqmBSO6g2CoeS+vSaqoMd7ZkICtMa19LxP9z/Iy+s7HF\nFiAjRDcM5K+MLOZDQmSa1Ug=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-ed98n@my-first-3df57.iam.gserviceaccount.com",
    "client_id": "102618483414105666074",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ed98n%40my-first-3df57.iam.gserviceaccount.com"
  }),
  databaseURL: "https://my-first-3df57.firebaseio.com"
});

function authy(user,callback) {
  console.log("hai")
  admin.auth().createUser({
    email: user.email,
    password: user.password,
    displayName: user.display,
 })
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully created new user:", userRecord.uid);
   callback(userRecord.uid)
  })
  .catch(function(error) {
    console.log("Error creating new user:", error);
    return error;
  });
}
module.exports = { authy }




  
  
