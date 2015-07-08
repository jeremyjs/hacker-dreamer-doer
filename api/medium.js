var router = require('express').Router();
var medium = require('node-medium');
var asyncRetrieve = require('../local_modules/async-retrieve');

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

router.get('/posts', function (req, res, next) {
  res.redirect('./posts/all');
});

router.get('/posts/all', function (req, res, next) {
  medium.getUser('jjman505', function (profile) {
    asyncRetrieve(profile.posts, function retrieve (post, callback) {
      medium.getPost('jjman505', post.id, callback);
    }, function done (posts) {
      res.send(posts);
    });
  });
});

router.get('/posts/:id', function (req, res, next) {
  medium.getPost('jjman505', post.id, function (post) {
    res.send(post);
  });
});

module.exports = router;
