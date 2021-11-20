import AWS from 'aws-sdk';
import AmazonCognitoIdentity from 'amazon-cognito-identity-js';

var authenticationData = {
    Username: process.env.COGNITO_USERNAME,
    Password: process.env.COGNITO_PASSWORD,
};
var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
var poolData = {
    UserPoolId: 'us-east-1_perulVONg',
    ClientId: '4inro09ih43ngggceg9rpk4bk5'
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
var userData = {
    Username: process.env.COGNITO_USERNAME,
    Pool: userPool
};

var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
        AWS.config.region = 'us-east-1';

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:136662d5-3980-434c-ae70-864bea48006c',
            Logins: {
                'cognito-idp.us-east-1.amazonaws.com/us-east-1_perulVONg': result
                    .getIdToken()
                    .getJwtToken(),
            },
        });

        AWS.config.credentials.refresh(error => {
            if (error) {
                console.error(error);
            } else {
                console.log("export AWS_ACCESS_KEY_ID=" + AWS.config.credentials.accessKeyId);
                console.log("export AWS_SECRET_ACCESS_KEY=" + AWS.config.credentials.secretAccessKey);
                console.log("export AWS_SESSION_TOKEN='" + AWS.config.credentials.sessionToken + "'");
            }
        });
    },

    onFailure: function (err) {
        alert(err);
    },
});
