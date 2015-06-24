function sendmail (name, email, message) {
  $.post('/api/mail/send', {
    name: name,
    email: email,
    message: message
  });
}
