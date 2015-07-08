
function getBlogPosts (callback) {
  $.get('/api/medium/posts/all', function (posts) {
    callback(posts);
  });
}

function loadBlogPost (post) {
  post = {
    url: 'http://medium.com/jjman505/de78fc4c72a2',
    imgSource: 'https://d262ilb51hltx0.cloudfront.net/max/2000/1*RJJJg4IzAwJPj4SjEe-7uA.jpeg',
    title: 'Personal Manifesto',
    subTitle: 'Get inspired. Do something epic.'
  };
  var html =  '<div class="post">' +
                '<a href="'+post.url+'" target="_blank">' +
                  '<img src="'+post.imgSource+'" alt="'+post.title+' Image">' +
                  '<h1 class="title">'+post.title+'</h1>' +
                  '<p class="lead">'+post.subTitle+'</p>' +
                  '<div class="overlay"></div>' +
                '</a>' +
              '</div>';
  $('.blog-posts').append(html);
}

function loadBlogPosts () {
  loadBlogPost();
  // getBlogPosts(function (posts) {
  //   posts.forEach(function (post) {
  //     loadBlogPost(post);
  //   });
  // });
}
