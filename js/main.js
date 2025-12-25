/* ====================
   DOM Elements
==================== */
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageEl = document.querySelector('.form__message');
const sections = document.querySelectorAll('.section');


/* ====================
   Section Animations
==================== */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach(section => observer.observe(section));


/* ====================
   Validation Helpers
==================== */
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateName(name) {
  return /^[а-яА-Яa-zA-Z\s]+$/.test(name);
}


/* ====================
   Universal Field Validator
==================== */
function validateField(input, validator, errorMessage) {
  const errorEl = input.nextElementSibling;
  const value = input.value.trim();

  if (!validator(value)) {
    input.classList.add('error');
    input.classList.remove('success');

    errorEl.textContent = errorMessage;
    errorEl.classList.add('show');

    return false;
  }

  input.classList.remove('error');
  input.classList.add('success');

  errorEl.textContent = '';
  errorEl.classList.remove('show');

  return true;
}


/* ====================
   Live Validation
==================== */
nameInput.addEventListener('input', () => {
  validateField(
    nameInput,
    validateName,
    'Введите корректное имя (только буквы)'
  );
});

emailInput.addEventListener('input', () => {
  validateField(
    emailInput,
    validateEmail,
    'Введите корректный email'
  );
});


/* ====================
   Form Submit
==================== */
form.addEventListener('submit', event => {
  event.preventDefault();

  const isNameValid = validateField(
    nameInput,
    validateName,
    'Введите корректное имя (только буквы)'
  );

  const isEmailValid = validateField(
    emailInput,
    validateEmail,
    'Введите корректный email'
  );

  if (!isNameValid || !isEmailValid) return;

  // Loading state
  messageEl.textContent = 'Отправка...';
  messageEl.style.color = 'blue';
  messageEl.classList.add('show');

  // Fake server request
  setTimeout(() => {
    messageEl.textContent = 'Форма успешно отправлена!';
    messageEl.style.color = 'green';

    form.reset();
    [nameInput, emailInput].forEach(input =>
      input.classList.remove('success')
    );
  }, 1500);
});


/* ====================
   Smooth Scroll
==================== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const targetId = link.getAttribute('href');

    if (targetId.length <= 1) return;

    const targetSection = document.querySelector(targetId);
    if (!targetSection) return;

    event.preventDefault();
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});
