const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');
const postController = require('../controllers/posts_controller');

router.get('/profile', usersController.profile);
router.get('/post', postController.post);
router.get('/sign-up', usersController.signup);
router.get('/sign-in', usersController.signin);


module.exports = router;