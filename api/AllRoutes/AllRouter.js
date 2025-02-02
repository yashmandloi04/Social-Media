const router = require('express').Router();

router.use('/api/v1/signup', require('../Controllers/SignUpController'));
router.use('/api/v1/login', require('../Controllers/AuthController'));
router.use('/api/v1/friends', require('../Controllers/FriendsController'));
router.use('/api/v1/friendrequest', require('../Controllers/FriendRequestController'));
router.use('/api/v1/allusers', require('../Controllers/AllUserController'));
router.use('/api/v1/notification', require('../Controllers/NotificationController'));
router.use('/api/v1/myprofile', require('../Controllers/MyProfileController'));
router.use('/api/v1/post', require('../Controllers/PostController'));
router.use('/api/v1/like', require('../Controllers/ReactionController/LikeController'));
router.use('/api/v1/comment', require('../Controllers/ReactionController/CommentController'));

module.exports = router;