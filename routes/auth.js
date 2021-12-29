const router = require('express').Router();
const authenticateRoles  = require('../middleware/authenticateRole');
const verify = require('../verifytoken')
const userController = require('../controller/userController');

router.get('/', userController.getUsers);
router.post('/post',verify, authenticateRoles(["ADMIN", "SUPER-ADMIN"]), userController.postIdea);
router.post('/register', userController.createRegularUser);
router.patch('/update',verify, userController.updateUser);
router.post('/register-super-user',verify, authenticateRoles(["SUPER-ADMIN"]), userController.createAuthorizedUser);
router.post('/login', userController.userLogin);



module.exports = router