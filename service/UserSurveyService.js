const UserSurveyModel = require('../models/UserSurveyModel')


exports.saveSurvey = function saveSurvey(req, res){

    if(!req.body.userId){
        res.status(400).send({
            message: "User Id is missing"
        })
    }else if(!req.body.surveyId){
        res.status(400).send({
            message: "Survey id is missing"
        })
    }else {
        let userAnswers = []
        if (req.body.userAns) {
            
            req.body.userAns.forEach(element => {
                console.log("Coming for "+ element)
                let ansItem = {
                    question_id: element.questionId,
                    question: element.question,
                    answer: element.answer
                }
                userAnswers.push(ansItem)
            });
        }

        
        let UserSurvey = new UserSurveyModel({
            user_id : req.body.userId,
            survey_id: req.body.surveyId,
            user_answers: userAnswers,
            isSubmitted: false
        })

        UserSurveyModel.create(UserSurvey).then(data =>{
            res.status(201).send(data)
        }).catch(err => {
            res.status(500).send({
                errorMessage: err
            })
        })

    }
}

exports.getUserSurvey = function getUserSurvey(req, res){
    UserSurveyModel.findById(req.params.uid).then(data => {
        if (!data) {
            res.status(404).send({
                messgae: "No user Survey exists"
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

exports.updateAnswersInSurvey = function updateAnswersInSurvey(req, res){
    UserSurveyModel.findByIdAndUpdate(req.params.uid, req.body, { useFindAndModify: false }).then(data => {
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
        errorMessage: "Error updating role with id=" + req.params.uid + err
        });
    });
    
} 


exports.submitSurvey = function(req, res){
    var status = {isSubmitted: true}
    UserSurveyModel.findByIdAndUpdate(req.params.uid, status, { useFindAndModify: false }).then(data => {
        if(!data){
            res.status(500).send({
                messgae: "Unable to submit survey"
            })
        }else {
            res.status(200).send({
                messgae: "Submitted Successfully"
            })
        }
    }).catch(err => {
        res.status(500).send({
        errorMessage: "Error submitting survey with id=" + req.params.uid + err
        });
    }); 
}

exports.searchSurveyStats = function(req, res){
   
    var query = { "user_answers.question": req.body.question, "user_answers.answer": req.body.answer }
    UserSurveyModel.find(query).then(data => {
        if(data){
            console.log(data)
            let response = {
                question : req.body.question,
                answer : req.body.answer,
                count : data.length
            }
            res.status(200).send(response)
        }else {
            let response = {
                question : req.body.question,
                answer : req.body.answer,
                count : 0
            }
            res.status(200).send(response)
        }
    });
}