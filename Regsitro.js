// Cuando el formulario con id 'registrationForm' es enviado
document.getElementById('registrationForm').addEventListener('submit', function(event) {

    // Evita que el formulario se envíe de la forma tradicional y recargue la página
    event.preventDefault();

    // Obtiene los valores de los campos del formulario y quita los espacios innecesarios
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Selecciona el lugar donde se mostrarán los mensajes
    const messageElement = document.getElementById('message');

    // Verifica si todos los campos están llenos
    if (nombre === '' || email === '' || password === '') {
        messageElement.textContent = 'Por favor, complete todos los campos.';
        messageElement.style.color = 'red';
        return;
    }

    // Obtiene la lista de usuarios guardados o crea una lista vacía si no hay usuarios guardados
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica si el email ya está registrado
    if (users.find(user => user.email === email)) {

         // Si el email ya existe, muestra un mensaje de error en rojo
        messageElement.textContent = 'El email ya está registrado.';
        messageElement.style.color = 'red';
        return;
    }

    // Si todo está bien, añade el nuevo usuario a la lista
    users.push({ nombre, email, password });
    
     // Guarda la lista de usuarios actualizada en el almacenamiento local
    localStorage.setItem('users', JSON.stringify(users));

    // Muestra un mensaje de éxito en verde
    messageElement.textContent = '¡Registro exitoso!';
    messageElement.style.color = 'green';

    // Redirige al usuario a la página de inicio de sesión después de 1 segundo
    setTimeout(() => {
    location.href = 'Login.html';  
    }, 1000); 

    // Limpia los campos del formulario
    nombre.value = ""
    email.value = ""
    password.value = ""

});