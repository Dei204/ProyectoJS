    // Añade un manejador para cuando se envíe el formulario 
document.getElementById('loginForm').addEventListener('submit', function(event) {
    
    // Evita que el formulario se envíe y recargue la página
    event.preventDefault();

    // Obtiene y limpia los valores ingresados por el usuario
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const messageElement = document.getElementById('message');

     // Verifica si los campos están vacíos
    if (email === '' || password === '') {
        messageElement.textContent = 'Por favor, complete todos los campos.';
        messageElement.style.color = 'red';
        return;
    }

    // Obtiene la lista de usuarios almacenada o una lista vacía si no existe
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Busca un usuario con el correo y contraseña proporcionados
    const user = users.find(user => user.email === email && user.password === password);

     // Si el usuario existe
    if (user) {
       
        messageElement.textContent = 'Inicio de sesión exitoso.';
        messageElement.style.color = 'green';

        // Redirige al usuario después de 1 segundo
        setTimeout(() => {
            location.href = 'file:///C:/Users/dques/Desktop/ProyectoJavascript/Listas.html'; 
        }, 1000); 
    } else {
        
        messageElement.textContent = 'Usuario o contraseña incorrectos.';
        messageElement.style.color = 'red';
    }
});
