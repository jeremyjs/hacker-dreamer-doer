var router = require('express').Router();
var medium = require('node-medium');

router.get('/', function (req, res, next) {
  res.send({
    '/profile': 'returns a json object containing profile data',
    '/posts': {
      '/all': 'returns an array of all blog posts',
      '/:id': 'returns a blog post with the provided id'
    }
  });
});

router.get('/profile', function (req, res, next) {
  medium.getUser('jjman505', function (profile) {
    res.send(profile);
  });
});

router.get('/posts/all', function (req, res, next) {
  medium.getUser('jjman505', function (profile) {
    var posts = [];
    res.send(profile.posts);
  });
});

module.exports = router;
