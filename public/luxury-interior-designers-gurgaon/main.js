(function () {
  var header = document.querySelector('.site-header');
  var hero = document.querySelector('.hero');
  var form = document.getElementById('contact-form');

  function updateHeader() {
    if (!hero || !header) return;
    var pastHero = window.scrollY > hero.offsetHeight - 120;
    header.classList.toggle('on-hero', !pastHero);
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  if (!form) return;

  var submitButton = form.querySelector('button[type="submit"]');
  var status = document.getElementById('form-status');

  var fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    looking: document.getElementById('looking'),
    space: document.getElementById('space'),
    message: document.getElementById('message')
  };

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var phonePattern = /^(\+91[\s-]?)?[6-9]\d{9}$/;

  function setError(fieldName, message) {
    var input = fields[fieldName];
    var row = input.closest('.form-row');
    var errorEl = document.getElementById(fieldName + '-error');

    row.classList.add('has-error');
    input.setAttribute('aria-invalid', 'true');
    errorEl.textContent = message;
  }

  function clearError(fieldName) {
    var input = fields[fieldName];
    var row = input.closest('.form-row');
    var errorEl = document.getElementById(fieldName + '-error');

    row.classList.remove('has-error');
    input.removeAttribute('aria-invalid');
    errorEl.textContent = '';
  }

  function validateName() {
    var value = fields.name.value.trim();
    if (!value) {
      setError('name', 'Please enter your name.');
      return false;
    }
    if (value.length < 2) {
      setError('name', 'Name must be at least 2 characters.');
      return false;
    }
    clearError('name');
    return true;
  }

  function validateEmail() {
    var value = fields.email.value.trim();
    if (!value) {
      setError('email', 'Please enter your email address.');
      return false;
    }
    if (!emailPattern.test(value)) {
      setError('email', 'Please enter a valid email address.');
      return false;
    }
    clearError('email');
    return true;
  }

  function validatePhone() {
    var value = fields.phone.value.trim().replace(/\s+/g, '');
    if (!value) {
      setError('phone', 'Please enter your phone number.');
      return false;
    }
    if (!phonePattern.test(value)) {
      setError('phone', 'Please enter a valid 10-digit mobile number.');
      return false;
    }
    clearError('phone');
    return true;
  }

  function validateSelect(fieldName, emptyMessage) {
    var value = fields[fieldName].value;
    if (!value) {
      setError(fieldName, emptyMessage);
      return false;
    }
    clearError(fieldName);
    return true;
  }

  function validateMessage() {
    var value = fields.message.value.trim();
    if (!value) {
      setError('message', 'Please tell us about your project.');
      return false;
    }
    if (value.length < 10) {
      setError('message', 'Please share a few more details (at least 10 characters).');
      return false;
    }
    clearError('message');
    return true;
  }

  function validateForm() {
    var valid = true;

    if (!validateName()) valid = false;
    if (!validateEmail()) valid = false;
    if (!validatePhone()) valid = false;
    if (!validateSelect('looking', 'Please select what you are looking for.')) valid = false;
    if (!validateSelect('space', 'Please select a space type.')) valid = false;
    if (!validateMessage()) valid = false;

    return valid;
  }

  Object.keys(fields).forEach(function (fieldName) {
    fields[fieldName].addEventListener('blur', function () {
      if (fieldName === 'name') validateName();
      if (fieldName === 'email') validateEmail();
      if (fieldName === 'phone') validatePhone();
      if (fieldName === 'looking') validateSelect('looking', 'Please select what you are looking for.');
      if (fieldName === 'space') validateSelect('space', 'Please select a space type.');
      if (fieldName === 'message') validateMessage();
    });

    fields[fieldName].addEventListener('input', function () {
      if (fields[fieldName].closest('.form-row').classList.contains('has-error')) {
        if (fieldName === 'name') validateName();
        if (fieldName === 'email') validateEmail();
        if (fieldName === 'phone') validatePhone();
        if (fieldName === 'looking') validateSelect('looking', 'Please select what you are looking for.');
        if (fieldName === 'space') validateSelect('space', 'Please select a space type.');
        if (fieldName === 'message') validateMessage();
      }
    });
  });

  function setSubmitting(isSubmitting) {
    if (!submitButton) return;
    submitButton.disabled = isSubmitting;
    submitButton.textContent = isSubmitting ? 'Sending...' : 'Book a Consultation';
  }

  function showStatus(message, isError) {
    if (!status) return;
    status.textContent = message || '';
    status.classList.toggle('error', Boolean(isError));
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (!validateForm()) {
      var firstError = form.querySelector('.has-error input, .has-error select, .has-error textarea');
      if (firstError) firstError.focus();
      return;
    }

    setSubmitting(true);
    showStatus('Sending your request...', false);

    var payload = {
      name: fields.name.value.trim(),
      email: fields.email.value.trim(),
      phone: fields.phone.value.trim(),
      looking: fields.looking.value,
      space: fields.space.value,
      message: fields.message.value.trim(),
      source: 'essentia environments website'
    };

    try {
      var response = await fetch('https://essentia-backend-mail.vercel.app/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      form.reset();
      Object.keys(fields).forEach(clearError);
      showStatus('', false);
      window.open('thankyou.html', '_blank', 'noopener,noreferrer');
    } catch (error) {
      showStatus('We could not send your request right now. Please email us directly at info@essentiaenvironments.com.', true);
    } finally {
      setSubmitting(false);
    }
  });
})();
