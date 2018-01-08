/*@Author Divaker Singh */
// let winston = require('winston');
// const nodemailer = require("nodemailer");


////this function is used password Encryption
exports.passwordEncryption = function(password, salt) {
    encryptedPassword = crypto.createHmac('sha1', salt).update(password.toString()).digest('hex')
    return encryptedPassword
};


let commonResponseHandler = function(res, result, message, statusCode, isError) {
    let date = new Date();
    res.status(statusCode);
    res.send({
        error: isError,
        result: result,
        message: message,
        extendedMessage: "",
        timeStamp: date.getTime(),
        statusCode: statusCode
    });
};

exports.commonResponseHandler = commonResponseHandler;

////this function is used to create to check validate Request Body by Admin

let validateRequestBody = function(req, res, paramsArray) {
    let status = true;
    for (let i = 0; i < paramsArray.length; i++) {
        if (!req.body[paramsArray[i]] || (req.body[paramsArray[i]] === '')) {
            console.log("Missing param");
            commonResponseHandler(res, {}, responseCode.missing_params_msg, responseCode.missing_params_code, true)
            status = false;
            break;
        }
    }
    return status;
};

////this  is used to exports the validation request
exports.validateRequestBody = validateRequestBody;

////this function is used to  check Admin authentication middleware

exports.authenticationMiddleware = function(req, res, next) {
    let bearerHeader = req.headers["auth-token"];
    console.log("authenticated token",bearerHeader);
    if (!bearerHeader) {
        commonResponseHandler(res, {}, responseCode.unauthorized_msg, responseCode.unauthorized_code, true)
    } else {
        domain.User.findOne({
            accessToken: bearerHeader,
            status: 2
        }).lean().exec(function(err, adminObject) {
            if (err) {
                res.send(err)
            } else if (adminObject === null) {
                commonResponseHandler(res, {}, responseCode.unauthorized_msg, responseCode.unauthorized_code, true)
            } else {
                console.log("Sucessfully authenticated");
                req.loginUser = adminObject;
                next();
            }
        })
    }
};

//this function is used to  create transporter for node mailer

// let transporter = nodemailer.createTransport({
//     service: config.emailProvider,
//     auth: {
//         user: config.emailFrom,
//         pass: config.emailPassword
//     }
// });

//this function is used to  send text  email in admin panel
// exports.sendTextEmail = function (fromEmail, toEmail, subject, emailBody) {
//     Logger.info("Control in send text email");
//     transporter.sendMail({
//         from: fromEmail,
//         to: toEmail,
//         subject: subject,
//         text: emailBody
//     })
// };

//this function is used to  send html email in admin panel
// exports.sendHtmlEmail = function (fromEmail, toEmail, subject, emailBody) {
//     transporter.sendMail({
//         from: fromEmail,
//         to: toEmail,
//         subject: subject,
//         html: emailBody
//     })
// };

// module.exports = {
//     'isDelete': 1,
//     'isActive': 2,
//     'isInactive': 3,
// }