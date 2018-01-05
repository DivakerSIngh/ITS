/*@Author Divaker Singh */
// let winston = require('winston');
// const nodemailer = require("nodemailer");

////this function is used password Encryption
exports.passwordEncryption = function(password, salt) {
    //Logger.info("passwordEncryption == " + password + salt)
    encryptedPassword = crypto.createHmac('sha1', salt).update(password.toString()).digest('hex')
    return encryptedPassword
};

////this is used generate all log activity done my admin

// let logger = new(winston.Logger)({
//     transports: [
//       new(winston.transports.Console)({
//             handleExceptions: true,
//             json: true
//         }),
//       new(winston.transports.File)({
//             filename: 'log_Info.log',
//             json: true
//         })
//     ],
//     exitOnError: false
// });

// exports.logger = logger;


////this function is used to send Common response handler in application

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

exports.adminAuthenticationMiddleware = function(req, res, next) {
    //  Logger.info("Control in authentication" + req.headers["auth-token"]);
    let bearerHeader = req.headers["auth-token"];
    if (!bearerHeader) {
        commonResponseHandler(res, {}, responseCode.unauthorized_msg, responseCode.unauthorized_code, true)
    } else {
        domain.Admin.findOne({
            accessToken: bearerHeader,
            status: 1
        }).lean().exec(function(err, adminObject) {
            if (err) {
                res.send(err)
            } else if (adminObject === null) {
                commonResponseHandler(res, {}, responseCode.unauthorized_msg, responseCode.unauthorized_code, true)
            } else {
                // Logger.info("Sucessfully authenticated");
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