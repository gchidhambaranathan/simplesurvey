const  express = require('express')
const router = express.Router()
const user_controller = require('../controllers/UserController')
const login_controller = require('../controllers/LoginController')
const role_perm_controller = require('../controllers/RolePermissionController')

router.post('/users', user_controller.registerUser)
router.get('/users/:uid', user_controller.getExistingUser)
router.delete('/users/:uid', user_controller.deleteUser)
router.get('/users', user_controller.getAllUsers)
router.put('/users/:uid', user_controller.updateUser)


router.post('/login', login_controller.loginUser)


router.post('/rolepermissions', role_perm_controller.createRolePermissions)
router.get('/rolepermissions/:roleid', role_perm_controller.getPermissionByRole)

module.exports = router