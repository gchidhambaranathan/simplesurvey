const SurveyModel = require('../models/SurveyModel')


exports.createSurvey = function createSurvey(req, res){

    var questionItems = []

    if(req.body.questions) {
        req.body.questions.forEach(element => {
            let questionItem = {
                question: element.question,
                ans_options: element.options
            }
            questionItems.push(questionItem)
        });
    }
    var surveyModel = new SurveyModel({
        survey_name : req.body.surveyName,
        questions   : questionItems
    })

    SurveyModel.create(surveyModel).then(data => {
       res.status(201).send(data) 
    }).catch(err => {
        res.status(500).send({
            errorMessage: err
        }) 
    })
}
exports.getSurvey = function getSurvey(req, res){
    SurveyModel.findById(req.params.uid).then(data => {
        if(!data){
            res.status(404).send( {
                messgae: "No Survey exists"
            })
            
        }else {
           res.status(200).send(data)
        }
    }).catch(err => {
        res.status(500).send({
            errorMessage : err
        })
    })
}

exports.getAllSurvey = function getAllSurvey(req, res){
    const filter = {}

    SurveyModel.find(filter, (err, data) => {

        if(data){
            res.status(200).send(data)
        }else if(err){
            res.status(500).send({
                errorMessage : "Unable to fetch all survey details"
            })
        }
    })
}


exports.deleteSurvey = function deleteSurvey(req, res){
    SurveyModel.findByIdAndDelete(req.params.uid).then(data => {
        if(!data) {
            res.status(404).send({
                messgae : 'not found'
            })
        }else {
           res.status(204).send({
               messgae : 'Deleted'
           }) 
        }
    })
}

exports.updateSurvey = function updateSurvey(req, res){
    var toUpdate =  {
        "survey_name" : req.body.surveyName
    }
    SurveyModel.findByIdAndUpdate(req.params.uid, toUpdate, { useFindAndModify: false }).then(data => {
        if(!data){
            res.status(500).send({
                messgae: "Unable to update"
            })
        }else {
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