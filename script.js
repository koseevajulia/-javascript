const form = document.getElementById('registration-form');
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('password-confirm');
const birthDayInput = document.getElementById('birth-day');
const submitButton = document.getElementById('form-button');

// Функции валидации
function validateName(name) {
  if (name.length < 2 || name.length > 30) {
    return false;
  }
  if (!/^[a-zA-Zа-яА-Я]+$/.test(name)) {
    return false;
  }
  return true;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
  if (password.length < 8) {
    return false;
  }
  if (!/\d/.test(password)) {
    return false;
  }
  if (!/[a-z]/.test(password)) {
    return false;
  }
  if (!/[A-Z]/.test(password)) {
    return false;
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return false;
  }
  return true;
}

function validateBirthday(birthday) {
  const today = new Date();
  const birthDay = new Date(birthday);
  const age = today.getFullYear() - birthDay.getFullYear();
  return age >= 18;
}

// Обработчик событий потери фокуса
firstNameInput.addEventListener('blur', () => {
  validateInput(firstNameInput, 'first-name-error', validateName);
});
lastNameInput.addEventListener('blur', () => {
  validateInput(lastNameInput, 'last-name-error', validateName);
});
emailInput.addEventListener('blur', () => {
  validateInput(emailInput, 'email-error', validateEmail);
});
passwordInput.addEventListener('blur', () => {
  validateInput(passwordInput, 'password-error', validatePassword);
});
passwordConfirmInput.addEventListener('blur', () => {
  validateInput(passwordConfirmInput, 'password-confirm-error', () => {
    return passwordInput.value === passwordConfirmInput.value && validatePassword(passwordInput.value);
  });
});
birthDayInput.addEventListener('blur', () => {
  validateInput(birthDayInput, 'birth-day-error', validateBirthday);
});

// Функция для проверки ввода и обновления состояния элемента
function validateInput(input, errorId, validationFunction) {
  const errorSpan = document.getElementById(errorId);
  if (validationFunction(input.value)) {
    input.classList.remove('invalid');
    input.classList.add('valid');
    errorSpan.textContent = '';
    errorSpan.style.display = 'none';
  } else {
    input.classList.remove('valid');
    input.classList.add('invalid');
    errorSpan.textContent = 'Некорректное значение';
    errorSpan.style.display = 'block';
  }
  updateSubmitButtonState();
}

// Функция обновления состояния кнопки отправки
function updateSubmitButtonState() {
  if (firstNameInput.classList.contains('valid') &&
      lastNameInput.classList.contains('valid') &&
      emailInput.classList.contains('valid') &&
      passwordInput.classList.contains('valid') &&
      passwordConfirmInput.classList.contains('valid') &&
      birthDayInput.classList.contains('valid')) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

// Обработчик события отправки формы
form.addEventListener('submit', (event) => {
  event.preventDefault();
  // Здесь можно добавить логику отправки формы
  console.log('Форма отправлена!');
});

// Вызов функции обновления состояния кнопки при загрузке страницы
updateSubmitButtonState();
