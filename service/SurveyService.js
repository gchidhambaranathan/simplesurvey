const SurveyModel = require('../models/SurveyModel')


exports.createSurvey = function createSurvey(req, res) {

    var questionItems = []

    if (req.body.questions) {
        req.body.questions.forEach(element => {
            let questionItem = {
                question: element.question,
                ans_options: element.options
            }
            questionItems.push(questionItem)
        });
    }
    var surveyModel = new SurveyModel({
        survey_name: req.body.surveyName,
        questions: questionItems
    })

    SurveyModel.create(surveyModel).then(data => {
        res.status(201).send(data)
    }).catch(err => {
        res.status(500).send({
            errorMessage: err
        })
    })
}
exports.getSurvey = function getSurvey(req, res) {
    SurveyModel.findById(req.params.uid).then(data => {
        if (!data) {
            res.status(404).send({
                messgae: "No Survey exists"
            })

        } else {
            res.status(200).send(data)
        }
    }).catch(err => {
        res.status(500).send({
            errorMessage: err
        })
    })
}

exports.getAllSurvey = function getAllSurvey(req, res) {
    const filter = {}

    SurveyModel.find(filter, (err, data) => {

        if (data) {
            res.status(200).send(data)
        } else if (err) {
            res.status(500).send({
                errorMessage: "Unable to fetch all survey details"
            })
        }
    })
}


exports.deleteSurvey = function deleteSurvey(req, res) {
    SurveyModel.findByIdAndDelete(req.params.uid).then(data => {
        if (!data) {
            res.status(404).send({
                messgae: 'not found'
            })
        } else {
            res.status(204).send({
                messgae: 'Deleted'
            })
        }
    })
}

exports.updateSurvey = function updateSurvey(req, res) {
    var toUpdate = {
        "survey_name": req.body.surveyName
    }
    SurveyModel.findByIdAndUpdate(req.params.uid, toUpdate, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(500).send({
                messgae: "Unable to update"
            })
        } else {
            res.status(200).send({
                messgae: "Updated Successfully"
            })
        }
    }).catch(err => {
        res.status(500).send({
            errorMessage: "Error updating survey with id=" + req.params.uid + err
        });
    });
}

exports.addQuestionToSurvey = function addQuestionToSurvey(req, res) {
    if (req.body) {
        SurveyModel.findByIdAndUpdate(req.params.uid, { $push: { questions: req.body } }, { useFindAndModify: false }).then(data => {
            if (!data) {
                res.status(500).send({
                    messgae: "Unable to add question"
                })
            } else {
                res.status(200).send({
                    messgae: "Question added Successfully"
                })
            }
        }).catch(err => {
            res.status(500).send({
                errorMessage: "Error updating survey with id=" + req.params.uid + err
            });
        })
    }
}

exports.updateQuestionInSurvey = function updateQuestionInSurvey(req, res){
    console.log( req.params.uid + " "+ req.params.qid)
    SurveyModel.findOneAndUpdate({ "_id": req.params.uid, "questions._id": req.params.qid },
    { 
        "$set": {
            "questions.$": req.body
        }
    },
    function(err,doc) {
        if(!err){
            res.status(200).send("Updated successfully")
        }else {
            res.status(500).send({
                errorMessage: err
            })
        }
    })
    
}

exports.deleteQuestionInSurvey = function deleteQuestionInSurvey(req, res){
    SurveyModel.findOneAndUpdate(
        { _id: req.params.uid },
        { $pull: { questions: { _id: req.params.qid} } },
        { new: true }
    ).then(data => {
        if (!data) {
            res.status(500).send({
                messgae: "Unable to delete question in survery"
            })
        } else {
            res.status(200).send({
                messgae: "Question deleted Successfully"
            })
        }
    }).catch(err => {
        res.status(500).send({
            errorMessage: "Error updating survey with id=" + req.params.uid + err
        });
    })
}

