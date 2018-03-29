function showRecaptcha(element) {
  Recaptcha.create('6Ld1yU8UAAAAAL5kWQxFwXQHspnjO2BO72ppwexw', element, {
    theme: 'custom'
    custom_theme_widget: 'recaptcha_widget'
  });
}

function setupRecaptcha() {
  console.log("test")
  var contactFormHost = 'captcha-en-marche-martinique.herokuapp.com',
      form = $('#contact-form'),
      notice = form.find('#notice');

  if (form.length) {
    showRecaptcha('recaptcha_widget');

    form.submit(function(ev){
      ev.preventDefault();

      $.ajax({
        type: 'POST',
        url: contactFormHost + 'send_email',
        data: form.serialize(),
        dataType: 'json',
        success: function(response) {
          switch (response.message) {
            case 'success':
              form.fadeOut(function() {
                form.html('<h4>' + form.data('success') + '</h4>').fadeIn();
              });
              break;

            case 'failure_captcha':
              showRecaptcha('recaptcha_widget');
              notice.text(notice.data('captcha-failed')).fadeIn();
              break;

            case 'failure_email':
              notice.text(notice.data('error')).fadeIn();
          }
        },
        error: function(xhr, ajaxOptions, thrownError) {
          notice.text(notice.data('error')).fadeIn();
        }
      });
    });
  }
}
