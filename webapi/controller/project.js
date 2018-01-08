var mongoose = require('mongoose');
var assert = require('assert');
let async = require('async');
// jwt = require('jsonwebtoken');
// bcrypt = require('bcrypt');

var project = require('../model/project');


module.exports = {
    add: function(req, res,callback) {
        console.log("project data>==>:", req.body)
        var projects = new project(req.body);
        let project_id = req.body._id;
        project_id = new mongoose.mongo.ObjectId(project_id);
            let condition = {
                _id: project_id
            };
            domain.Project.findOne(condition).select({
                _id: 1
            }).exec(function (err, requestprojectObject) {
                console.log("requestprojectObject", requestprojectObject);
                if (err) {
                    commonModule.commonResponseHandler(res, err, responseCode.internal_server_error, responseCode.server_error_code, true)
                }
                if (requestprojectObject) {
                    domain.Project.update(condition, {$set: req.body}).exec(function (err, updateObj) {
                        console.log("updateObj", updateObj);
                        if (err) {
                            commonModule.commonResponseHandler(res, err, adminString.internal_server_error, adminString.server_error_code, true)
                        }
                        else {
                            getAllProject(req,res);
                            // commonModule.commonResponseHandler(res, updateObj, adminString.page_update_msg, adminString.success_code, false)
                        }
                    });
                }
                if (!requestprojectObject) {
                    projects.save(function(err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            async.waterfall([
                                function(callback) {
                                    domain.Project.find({isDeleted:0}).lean().exec(function(err, adminObject) {
                                        if (err) {
                                            commonModule.commonResponseHandler(res, err, responseCode.internal_server_error, responseCode.server_error_code, true)
                                            return;
                                        }
                                        if (adminObject) {
                                            callback(null,adminObject)
                                        } else {
                                            commonModule.commonResponseHandler(res, {}, responseCode.invalid_username_password_msg, responseCode.invalid_username_password_code, true)
                                        }
                                    })
                                }
                            ], function(err, result) {
                                commonModule.commonResponseHandler(res, result, responseCode.data_fetch_msg, responseCode.success_code, false)
                            })
                    
                        }
            
                    })  
                }

            })


           
    },
    getAll: function(req, res) {
        async.waterfall([
            function(callback) {
                domain.Project.find({isDeleted:0}).lean().exec(function(err, adminObject) {
                    if (err) {
                        commonModule.commonResponseHandler(res, err, responseCode.internal_server_error, responseCode.server_error_code, true)
                        return;
                    }
                    if (adminObject) {
                        callback(null,adminObject)
                    } else {
                        commonModule.commonResponseHandler(res, {}, responseCode.invalid_username_password_msg, responseCode.invalid_username_password_code, true)
                    }
                })
            }
        ], function(err, result) {
            commonModule.commonResponseHandler(res, result, responseCode.data_fetch_msg, responseCode.success_code, false)
        })

        
        
       
    },
    delete: function(req, res) {
        console.log("in delete==========>", req.body);
        let updateObject = {};
        updateObject.isDeleted =req.body.isDeleted;
        console.log("updateObject==========>", updateObject);
        async.waterfall([
            function (callback) { 
                updateProject(req.body._id, updateObject, callback)
            }
        ], function (err, result) {
            if (err) {
                commonModule.commonResponseHandler(res, err, responseCode.internal_server_error, responseCode.server_error_code, true)
            } else if (!result) {
                commonModule.commonResponseHandler(res, {}, responseCode.no_data_found, responseCode.success_code, true)
            } else {
                getAllProject(req,res)
            }
        });
    }

}

function getAllProject(req, res){
    async.waterfall([
        function(callback) {
            domain.Project.find({isDeleted:0}).lean().exec(function(err, adminObject) {
                if (err) {
                    commonModule.commonResponseHandler(res, err, responseCode.internal_server_error, responseCode.server_error_code, true)
                    return;
                }
                if (adminObject) {
                    callback(null,adminObject)
                } else {
                    commonModule.commonResponseHandler(res, {}, responseCode.invalid_username_password_msg, responseCode.invalid_username_password_code, true)
                }
            })
        }
    ], function(err, result) {
        commonModule.commonResponseHandler(res, result, responseCode.data_fetch_msg, responseCode.success_code, false)
    })
}
function updateProjectOperation(req, res, updateObject, message) {
    async.waterfall([
        function (callback) {
            updateProject(req.body._id, updateObject, callback)
        }
    ], function (err, result) {
        if (err) {
            commonModule.commonResponseHandler(res, err, responseCode.internal_server_error, responseCode.server_error_code, true)
        } else if (!result) {
            commonModule.commonResponseHandler(res, {}, responseCode.no_data_found, responseCode.success_code, true)
        } else {
            commonModule.commonResponseHandler(res, {}, responseCode[message], responseCode.success_code, false)
        }
    });
}
let updateProject = function (_id, updateObject, callback) {
    console.log("updateProject me aagaya==============>>", _id,updateObject)
    domain.Project.findOneAndUpdate({
        _id: _id,
        isDeleted: 0
    },
     {
        $set: updateObject
    }, 
    {
        new: true
    },
     function (err, projectObject) {
        console.log('error',err+'+++++++++++++',projectObject)
        if(err)
        {

        }else{
            
            callback(err, projectObject)
        }
       
    })
};

