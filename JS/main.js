// ===== Элементы формы =====
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageEl = document.querySelector('.form__message');

// ===== Валидация =====

// Email
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Имя (только буквы и пробелы)
function validateName(name) {
  return /^[а-яА-Яa-zA-Z\s]+$/.test(name);
}

// ===== Универсальная функция для валидации поля =====
function validateField(input, validator, errorMessage) {
  const errorEl = input.nextElementSibling;
  if (!validator(input.value.trim())) {
    input.classList.add('error');
    input.classList.remove('success');
    errorEl.textContent = errorMessage;
    errorEl.classList.add('show');
    return false;
  } else {
    input.classList.remove('error');
    input.classList.add('success');
    errorEl.textContent = '';
    errorEl.classList.remove('show');
    return true;
  }
}

// ===== Instant feedback при вводе =====
[nameInput, emailInput].forEach(input => {
  input.addEventListener('input', () => {
    if (input === nameInput) {
      validateField(nameInput, validateName, 'Введите корректное имя (только буквы)');
    } else if (input === emailInput) {
      validateField(emailInput, validateEmail, 'Введите корректный email');
    }
  });
});

// ===== Отправка формы =====
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const isNameValid = validateField(nameInput, validateName, 'Введите корректное имя (только буквы)');
  const isEmailValid = validateField(emailInput, validateEmail, 'Введите корректный email');

  if (!isNameValid || !isEmailValid) return;

  // Loading state
  messageEl.style.color = 'blue';
  messageEl.textContent = 'Отправка...';
  messageEl.classList.add('show');

  // Имитируем сервер
  setTimeout(() => {
    messageEl.style.color = 'green';
    messageEl.textContent = 'Форма успешно отправлена!';
    form.reset();
    [nameInput, emailInput].forEach(input => input.classList.remove('success'));
  }, 1500);
});

// ===== Плавный скролл для кнопок =====
document.querySelectorAll('.btn-scroll').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(btn.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
