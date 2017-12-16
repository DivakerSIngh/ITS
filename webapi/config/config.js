/**
 * @description: For Setting Up Node Environment
 */

// module.exports = (function() {
//     console.log("Env: ", process.env.NODE_ENV);
//     switch (process.env.NODE_ENV) {
//         case "development":
//             return {
//                 database: "mongodb://localhost:27017/pms",
//                 //databaseAuth: false,
//                 dbUser: "abcd",
//                 dbPassword: "MNddrwer7Ye5N",
//                 port: 3040
//             };
//         case "serverDevelopment":
//             return {
//                 database: "mongodb://localhost:27017/chat_db_Module",
//                 databaseAuth: true,
//                 dbUser: "abcd",
//                 dbPassword: "MNddrwer7Ye5N",
//                 port: 7027
//             };
//         case "staging":
//             return {
//                 //
//             };
//         case "production":
//             return {
//                 //
//             };
//         default:
//             console.log("No Env provided using 'development' configuration");
//             return {
//                 database: "mongodb://localhost:27017/StudentInformationDb",
//                 //  databaseAuth: false,
//                 port: 3040
//             };
//     }
// })();



module.exports = (function() {
    //console.log("Env: ", process.env.NODE_ENV);
    return {
        database: "mongodb://localhost:27017/pms",
        // dbUser: "abcd",
        // dbPassword: "MNddrwer7Ye5N",
        port: 3040
    };

})();