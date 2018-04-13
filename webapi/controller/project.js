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
                            commonModule.commonResponseHandler(res, err, responseCode.internal_server_error, responseCode.server_error_code, true)
                        }
                        else {
                           // getAllProject(req,res);
                             commonModule.commonResponseHandler(res, updateObj, responseCode.page_update_msg, responseCode.success_code, false)
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
        let searchObject = createSearchingObject(req, res);
        let totalCount = 0;
        if (searchObject) {
        console.log('search object',req.body);
   
        
        async.waterfall([
            function (callback) {
                getProjectCount(searchObject, callback);
            },
            function (count, callback) {
                let object = [];
                totalCount = count;
                object.push({
                    $match: searchObject
                });
                // if (req.body.filter) {
                //     object.push(createTheFilteredObject(req))
                // }
                object.push({
                    "$skip": parseInt(req.body.skip) || 0
                });
                if (req.body.limit) {
                    object.push({
                        "$limit": parseInt(req.body.limit) || 10
                    });
                }
                console.log('above in getallProject',object)
                getAllProjects(object, callback)
            },

            // function(callback) {
            //     domain.Project.find({isDeleted:0}).lean().exec(function(err, adminObject) {
            //         if (err) {
            //             commonModule.commonResponseHandler(res, err, responseCode.internal_server_error, responseCode.server_error_code, true)
            //             return;
            //         }
            //         if (adminObject) {
            //             callback(null,adminObject)
            //         } else {
            //             commonModule.commonResponseHandler(res, {}, responseCode.invalid_username_password_msg, responseCode.invalid_username_password_code, true)
            //         }
            //     })
            // }
        ], function(err, result) {
            if (err) {
                commonModule.commonResponseHandler(res, err, responseCode.internal_server_error, responseCode.server_error_code, true)
                return;
            }
            commonModule.commonResponseHandler(res, {
                totalRecord: totalCount,
                record: result
            }, responseCode.data_fetch_msg, responseCode.success_code, false)
          
        })

    }
        
       
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
            console.log("update delete Object==========>", err);
            if (err) {
                console.log("err me==========>", err);
                commonModule.commonResponseHandler(res, err, responseCode.internal_server_error, responseCode.server_error_code, true)
            } else if (!result) {
                console.log("result me==========>", result);
                commonModule.commonResponseHandler(res, {}, responseCode.no_data_found, responseCode.success_code, true)
            } else {
                console.log("Succces delete Object==========>", updateObject);
                commonModule.commonResponseHandler(res, {}, responseCode.data_fetch_msg, responseCode.success_code, true)
               // getAllProject(req,res)
            }
        });
    }

}

let createSearchingObject = function (req, res) {
    let searchObject = {};
    searchObject.isDeleted =0;
    // if (req.body.status) {
    //     searchObject.status = req.body.status;
    // } else {
    //     searchObject.isDeleted =0;
    // }
   
    // if (req.body.search) {
    //     searchObject.$or = []
    //     searchObject.$or.push({
    //         "name": new RegExp(req.body.search, "i")
    //     });
    // }

    console.log("conditionSearch", JSON.stringify(searchObject));
    return searchObject;
};
function getProjectCount(searchObject, callback){
    console.log('count api',searchObject)
    domain.Project.count(searchObject, function (err, totalCount) {
        console.log('total count api',totalCount)
        callback(err, totalCount);
    });
}
function getAllProjects(searchObject,callback){
    domain.Project.aggregate(searchObject, function (err, res) {
        console.log("project data ===========>.", searchObject);
        callback(err, res);
    });
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
        console('delete status',err)
        if (err) {
            commonModule.commonResponseHandler(res, err, responseCode.internal_server_error, responseCode.server_error_code, true)
        } else if (!result) {
            commonModule.commonResponseHandler(res, {}, responseCode.no_data_found, responseCode.success_code, true)
        } else {
            commonModule.commonResponseHandler(res, {}, responseCode.delete_success, responseCode.success_code, false)
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
            console.log('error',err)
        }else{
            console.log('delete Success',projectObject)
            callback(err, projectObject)
        }
       
    })
};

