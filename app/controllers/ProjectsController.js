var CH = require('../helpers/ControllerHelper');
var Project = require('../models/Project');

var ProjectCtrl = {
    listAllUndeleted: function (req, res) {
        Project.find({isDeleted: false}, function (err, projects) {
            if (err) {
                console.log(err);
            } else {
                res.json({success: true, response: projects});
            }
        });
    },

    listAll: function (req, res) {
        Project.find({}, function (err, projects) {
            if (err) {
                console.log(err);
            } else {
                res.json({success: true, response: projects});
            }
        });
    },

    readProject: function (req, res) {
        var _gp = CH.m2v(req);
        var id = _gp._id;

        Project.findOne({_id: id}, function (err, projects) {
            if (err) {
                console.log(err);
            } else {
                res.json({success: true, response: projects});
            }
        });
    },

    create: function (req, res) {
        var _gp = CH.m2v(req);
        var userID = _gp.userID;
        var project = new Project();

        project.name = _gp.name;
        project.isOpened = _gp.isOpened;
        project.createdBy = _gp.userID;

        project.save(function (err, el) {
            if (err) {
                res.json({status: 'ERROR', error: JSON.stringify(err), success: false});
            } else {
                res.json({status: 'OK', _id: el._id, success: true});
            }
        });
    },

    update: function (req, res) {
        var _gp = CH.m2v(req);
        var projectID = _gp._id;
        var newProjectData = {};

        if (_gp.name) {
            newProjectData.name = _gp.name;
        }
        if (_gp.description) {
            newProjectData.description = _gp.description;
        }
        if (_gp.createDate) {
            newProjectData.createDate = _gp.createDate;
        }
        if (_gp.createdBy) {
            newProjectData.createdBy = _gp.createdBy;
        }
        if (_gp.isOpened) {
            newProjectData.isOpened = _gp.isOpened;
        }

        var query = {_id: projectID};
        var newData = newProjectData;

        Project.findOneAndUpdate(query, newData, {upsert: true}, function (err, doc) {
            if (err) {
                return res.json({status: "ERROR", error: err.toString()});
            } else {
                return res.json({status: "OK", msg: "succesfully saved"});
            }
        });
    },

    projectHardDelete: function (req, res) {
        var _gp = CH.m2v(req);

        Project.remove({_id: _gp._id}, function (err) {
            if (err) {
                res.json({
                    status: 'ERROR'
                });
            } else {
                res.json({
                    status: 'OK'
                });
            }
        });
    },

    projectDelete: function (req, res) {
        var _gp = CH.m2v(req);
        var viewID = _gp._id;
        var query = {
            _id: viewID
        };
        var newData = {
            isDeleted: true
        };

        Project.findOneAndUpdate(query, newData, {upsert: true}, function (err, doc) {
            if (err) {
                return res.json({status: "ERROR", error: err.toString()});
            } else {
                return res.json({status: "OK", msg: "succesfully saved"});
            }
        });
    }
}

module.exports = ProjectCtrl;