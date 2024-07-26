document.getElementById('registrationForm').addEventListener('submit', function(event) {

    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const messageElement = document.getElementById('message');

    if (nombre === '' || email === '' || password === '') {
        messageElement.textContent = 'Por favor, complete todos los campos.';
        messageElement.style.color = 'red';
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(user => user.email === email)) {
        messageElement.textContent = 'El email ya está registrado.';
        messageElement.style.color = 'red';
        return;
    }

    users.push({ nombre, email, password });

    localStorage.setItem('users', JSON.stringify(users));

    messageElement.textContent = '¡Registro exitoso!';
    messageElement.style.color = 'green';

    setTimeout(() => {
    location.href = 'Login.html';  
    }, 1000); 
    nombre.value = ""
    email.value = ""
    password.value = ""

});