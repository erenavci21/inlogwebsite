document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    loginForm && loginForm.addEventListener('submit', validateLogin);
    registerForm && registerForm.addEventListener('submit', validateRegister);
});

function validateLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    let valid = true;

    if (username === "") {
        showError('username', 'Vul een gebruikersnaam in');
        valid = false;
    } else {
        hideError('username');
    }

    if (password === "") {
        showError('password', 'Vul een wachtwoord in');
        valid = false;
    } else {
        hideError('password');
    }

    if (valid) {
        // Check credentials with stored values
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        if (username === storedUsername && password === storedPassword) {
            document.getElementById('login-success').style.display = 'block';
            localStorage.setItem('loggedIn', true); // Set login status
        } else {
            alert("Inloggen mislukt. Controleer je gegevens.");
        }
    }
}

function validateRegister(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    let valid = true;

    if (username === "") {
        showError('username', 'Vul een gebruikersnaam in');
        valid = false;
    } else {
        hideError('username');
    }

    if (email === "" || !validateEmail(email)) {
        showError('email', 'Vul een geldig e-mailadres in');
        valid = false;
    } else {
        hideError('email');
    }

    if (password === "") {
        showError('password', 'Vul een wachtwoord in');
        valid = false;
    } else {
        hideError('password');
    }

    if (confirmPassword !== password) {
        showError('confirm-password', 'Wachtwoorden komen niet overeen');
        valid = false;
    } else {
        hideError('confirm-password');
    }

    if (valid) {
        // Store user details in localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        document.getElementById('register-success').style.display = 'block';
    }
}

function showError(inputId, message) {
    document.getElementById(`${inputId}-error`).innerText = message;
    document.getElementById(`${inputId}-error`).style.display = 'block';
}

function hideError(inputId) {
    document.getElementById(`${inputId}-error`).style.display = 'none';
}

function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}
