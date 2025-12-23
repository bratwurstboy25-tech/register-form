document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('registerForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const termsInput = document.getElementById('terms');
  const submitBtn = document.getElementById('submitBtn');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const termsError = document.getElementById('termsError');
  const formMessage = document.getElementById('formMessage');

  submitBtn.disabled = true; // ⬅️ ВАЖНО

  // ---------------- ФУНКЦИИ ----------------
  function showError(input, errorSpan, message) {
    input.classList.add('error');
    input.classList.remove('valid');
    errorSpan.textContent = message;
  }

  function showValid(input, errorSpan) {
    input.classList.remove('error');
    input.classList.add('valid');
    errorSpan.textContent = '';
  }

  function checkFormValidity() {
    const isValid =
      nameInput.value.trim().length >= 2 &&
      emailInput.value.includes('@') &&
      passwordInput.value.length >= 6 &&
      termsInput.checked;

    submitBtn.disabled = !isValid;
    return isValid;
  }

  function getFormData() {
    return {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value
    };
  }

  function fakeRequest(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.email === 'test@test.com') {
          reject('Этот email уже зарегистрирован');
        } else {
          resolve('Регистрация успешна 🎉');
        }
      }, 1500);
    });
  }

  // ---------------- ЖИВАЯ ВАЛИДАЦИЯ ----------------
  nameInput.addEventListener('input', () => {
    nameInput.value.trim().length >= 2
      ? showValid(nameInput, nameError)
      : showError(nameInput, nameError, 'Минимум 2 символа');
    checkFormValidity();
  });

  emailInput.addEventListener('input', () => {
    emailInput.value.includes('@')
      ? showValid(emailInput, emailError)
      : showError(emailInput, emailError, 'Введите email');
    checkFormValidity();
  });

  passwordInput.addEventListener('input', () => {
    passwordInput.value.length >= 6
      ? showValid(passwordInput, passwordError)
      : showError(passwordInput, passwordError, 'Минимум 6 символов');
    checkFormValidity();
  });

  termsInput.addEventListener('change', () => {
    const wrapper = termsInput.closest('.checkbox-wrapper');
    if (!termsInput.checked) {
      wrapper?.classList.add('error');
      termsError.textContent = 'Примите условия';
    } else {
      wrapper?.classList.remove('error');
      termsError.textContent = '';
    }
    checkFormValidity();
  });

  // ---------------- SUBMIT ----------------
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!checkFormValidity()) return;

    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    formMessage.textContent = 'Отправка...';
    formMessage.className = '';

    fakeRequest(getFormData())
      .then(msg => {
        formMessage.textContent = msg;
        formMessage.className = 'success';
        form.reset();
      })
      .catch(err => {
        formMessage.textContent = err;
        formMessage.className = 'error';
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
      });
  });

});
