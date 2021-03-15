const  express = require('express')
const router = express.Router()
const user_controller = require('../controllers/UserController')
const login_controller = require('../controllers/LoginController')
const role_perm_controller = require('../controllers/RolePermissionController')
const survey_controller = require('../controllers/SurveyController')

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

module.exports = router