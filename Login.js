document.getElementById('loginForm').addEventListener('submit', function(event) {
    
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const messageElement = document.getElementById('message');

    if (email === '' || password === '') {
        messageElement.textContent = 'Por favor, complete todos los campos.';
        messageElement.style.color = 'red';
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
       
        messageElement.textContent = 'Inicio de sesión exitoso.';
        messageElement.style.color = 'green';

        setTimeout(() => {
            location.href = 'file:///C:/Users/dques/Desktop/ProyectoJavascript/Listas.html'; 
        }, 1000); 
    } else {
        
        messageElement.textContent = 'Usuario o contraseña incorrectos.';
        messageElement.style.color = 'red';
    }
});
