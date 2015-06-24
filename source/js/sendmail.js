function sendmail (args, callback) {
  var posting = $.post('/api/mail/send', {
    name: args.name,
    email: args.email,
    message: args.message
  });
  posting.done(function (res, msg, xhr) {
    callback(res);
  });
}
