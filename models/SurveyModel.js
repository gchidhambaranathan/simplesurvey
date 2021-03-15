const mongoose = require('mongoose');



var Schema = mongoose.Schema;

var QuestionSchema = new Schema ({
    question : {type: String, required : true, length : 500},
    ans_options: {type: Array, required: true,'default': ['Strongly disagree',
                'Somewhat disagree', 'Neither agree nor disagree', 'Somewhat agree', 'Strongly agree']}
})


var Survey = new Schema({
     survey_name : {type: String, required: true, length: 100},
     questions : [QuestionSchema]
})

const surveyModel = module.exports = mongoose.model('SurveyDetails',Survey)