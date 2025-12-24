const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageEl = document.querySelector('.form__message');

// Проверка email
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Проверка имени (только буквы и пробел)
function validateName(name) {
  return /^[а-яА-Яa-zA-Z\s]+$/.test(name);
}

// Instant feedback
[nameInput, emailInput].forEach(input => {
  input.addEventListener('input', () => {
    const errorEl = input.nextElementSibling;
    if (input === nameInput && !validateName(input.value.trim())) {
      input.classList.add('error');
      input.classList.remove('success');
      errorEl.textContent = 'Введите корректное имя (только буквы)';
      errorEl.classList.add('show');
    } else if (input === emailInput && !validateEmail(input.value.trim())) {
      input.classList.add('error');
      input.classList.remove('success');
      errorEl.textContent = 'Введите корректный email';
      errorEl.classList.add('show');
    } else {
      input.classList.remove('error');
      input.classList.add('success');
      errorEl.textContent = '';
      errorEl.classList.remove('show');
    }
  });
});

// Submit
form.addEventListener('submit', (e) => {
  e.preventDefault();

  let hasError = false;

  // Проверка имени
  if (!validateName(nameInput.value.trim())) {
    const errorEl = nameInput.nextElementSibling;
    errorEl.textContent = 'Введите корректное имя (только буквы)';
    errorEl.classList.add('show');
    nameInput.classList.add('error');
    hasError = true;
  }

  // Проверка email
  if (!validateEmail(emailInput.value.trim())) {
    const errorEl = emailInput.nextElementSibling;
    errorEl.textContent = 'Введите корректный email';
    errorEl.classList.add('show');
    emailInput.classList.add('error');
    hasError = true;
  }

  if (hasError) return;

  // Loading
  messageEl.style.color = 'blue';
  messageEl.textContent = 'Отправка...';
  messageEl.classList.add('show');

  setTimeout(() => {
    messageEl.style.color = 'green';
    messageEl.textContent = 'Форма успешно отправлена!';
    form.reset();
    [nameInput, emailInput].forEach(input => input.classList.remove('success'));
  }, 1500);
});

// Плавный скролл
document.querySelectorAll('.btn-scroll').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(btn.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});
