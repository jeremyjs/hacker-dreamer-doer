var router = require('express').Router();
var medium = require('node-medium');
var _ = require('lodash');
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
    asyncRetrieve(profile.posts, function retrieve (postStub, callback) {
      medium.getPost('jjman505', postStub.id, function (post) {
        if(post.inResponseToPostId && post.inResponseToPostId !== '') {
          callback(null);
          return;
        }
        var result = _.pick(post, ['title', 'subTitle', 'createdAt']);
        result.id = postStub.id;
        callback(result);
      });
    }, function done (posts) {
      posts = _.sortBy(posts, 'createdAt');
      res.send(posts);
    });
  });
});

router.get('/posts/:id', function (req, res, next) {
  medium.getPost('jjman505', req.params.id, function (post) {
    res.send(post);
  });
});

module.exports = router;
