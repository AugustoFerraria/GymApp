const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/UserProfileController');

router.post('/userProfiles/new', userProfileController.createUserProfile);
router.get('/userProfiles/all', userProfileController.getUserProfiles);
router.get('/userProfiles/:id', userProfileController.getUserProfileById);
router.put('/userProfiles/:id', userProfileController.updateUserProfile);
router.delete('/userProfiles/:id', userProfileController.deleteUserProfile);

module.exports = router;