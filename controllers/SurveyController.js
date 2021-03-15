const SurveryService = require('../service/SurveyService')
var AuthService = require('../auth/AuthCheck');


exports.createSurvey = function createServey(req, res){
    AuthService.checkAuthenticated(req, res,'CSURVEY',SurveryService.createSurvey);
}

exports.getSurvey = function getSurvey(req, res){
    AuthService.checkAuthenticated(req, res,'GSURVEY',SurveryService.getSurvey);
}

exports.getAllSurvey = function getAllSurvey(req, res){
    AuthService.checkAuthenticated(req, res,'GASURVEY',SurveryService.getAllSurvey);
}

exports.deleteSurvey = function deleteSurvey(req, res){
    AuthService.checkAuthenticated(req, res,'DSURVEY',SurveryService.deleteSurvey);
}

exports.updateSurvey = function updateSurvey(req, res){
    AuthService.checkAuthenticated(req, res,'USURVEY',SurveryService.updateSurvey);
}