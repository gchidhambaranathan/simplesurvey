const UserSurveyService = require('../service/UserSurveyService')
var AuthService = require('../auth/AuthCheck');


exports.saveSurvey = function (req, res){
    AuthService.checkAuthenticated(req, res, "CUSERSURVEY", UserSurveyService.saveSurvey)
}

exports.getUserSurvey = function(req, res){
    AuthService.checkAuthenticated(req, res, "GUSERSURVEY", UserSurveyService.getUserSurvey)
}

exports.updateAnswersInSurvey = function (req, res){
    AuthService.checkAuthenticated(req, res, "UUSERSURVEY", UserSurveyService.updateAnswersInSurvey)
}

exports.submitSurvey = function (req, res){
    AuthService.checkAuthenticated(req, res, "SUSERSURVEY", UserSurveyService.submitSurvey)
}

exports.searchSurvey = function(req, res) {
    AuthService.checkAuthenticated(req, res, "SEUSERSURVEY", UserSurveyService.searchSurveyStats)

}