const  express = require('express')
const router = express.Router()
const user_controller = require('../controllers/UserController')
const login_controller = require('../controllers/LoginController')
const role_perm_controller = require('../controllers/RolePermissionController')
const survey_controller = require('../controllers/SurveyController')
const user_survey_controller = require('../controllers/UserSurveyController')

router.post('/users', user_controller.registerUser)
router.get('/users/:uid', user_controller.getExistingUser)
router.delete('/users/:uid', user_controller.deleteUser)
router.get('/users', user_controller.getAllUsers)
router.put('/users/:uid', user_controller.updateUser)


router.post('/login', login_controller.loginUser)


router.post('/rolepermissions', role_perm_controller.createRolePermissions)
router.get('/rolepermissions/:uid', role_perm_controller.getPermissionByRole)
router.delete('/rolepermissions/:uid', role_perm_controller.deletePermissionByRole)
router.get('/rolepermissions', role_perm_controller.getAllRolePermissions)
router.put('/rolepermissions/:uid', role_perm_controller.updateRolePermission)

router.post('/survey', survey_controller.createSurvey)
router.get('/survey/:uid', survey_controller.getSurvey)
router.get('/survey', survey_controller.getAllSurvey)
router.delete('/survey/:uid', survey_controller.deleteSurvey)
router.put('/survey/:uid', survey_controller.updateSurvey)

router.post('/survey/:uid/question', survey_controller.addQuestionToSurvey)
router.put('/survey/:uid/question/:qid', survey_controller.updateQuestionInSurvey)
router.delete('/survey/:uid/question/:qid', survey_controller.deleteQuestionInSurvey)

router.post('/usersurvey', user_survey_controller.saveSurvey)
router.get('/usersurvey/:uid', user_survey_controller.getUserSurvey)
router.put('/usersurvey/:uid', user_survey_controller.updateAnswersInSurvey)
router.post('/submitsurvey/:uid',user_survey_controller.submitSurvey)
router.post('/usersurvey/.search', user_survey_controller.searchSurvey)

module.exports = router