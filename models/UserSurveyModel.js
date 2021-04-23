const mongoose = require('mongoose');

var Schema = mongoose.Schema;


var UserSurveyAnswer = new Schema(
{
    question_id:  {type: String, required : true},
    question: {type: String, required : true},
    answer:{type: String, required : true}
}
)


var UserSurvey = new Schema({
    user_id : {type: String, required : true},
    survey_id : {type: String, required: true, length: 100},
    user_answers : [UserSurveyAnswer],
    isSubmitted : {type: Boolean , required: true, default: false}
})

const UserSurveyModel = module.exports = mongoose.model('UserSurveyDetails',UserSurvey)
