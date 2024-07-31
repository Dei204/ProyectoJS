// Espera a que la página esté completamente cargada
document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const prioritySelect = document.getElementById("prioritySelect"); 
  const addTaskButton = document.getElementById("addTaskButton");
  const taskList = document.getElementById("taskList");
  const feedbackMessage = document.getElementById("feedbackMessage");


  // Carga las tareas desde el almacenamiento local y las muestra
  const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => addTaskToDOM(task));
  };


  // Guarda una nueva tarea en el almacenamiento local
  const saveTask = (task) => {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
  };


   // Elimina una tarea del almacenamiento local
  const removeTask = (task) => {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.filter(t => t.task !== task.task); 
      localStorage.setItem("tasks", JSON.stringify(tasks));
  };


   // Actualiza una tarea en el almacenamiento local
  const updateTaskInStorage = (oldTask, newTask) => {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.map(task => (task.task === oldTask.task ? newTask : task));
      localStorage.setItem("tasks", JSON.stringify(tasks));
  };


    // Añade una tarea a la lista en la página
  const addTaskToDOM = (task) => {
      const li = document.createElement("li");
      li.textContent = `${task.task} (Prioridad: ${task.priority})`;

     // Cambia el color de fondo según la prioridad
      switch (task.priority) {
          case 'alta':
              li.style.backgroundColor = '#f8d7da';
              break;
          case 'media':
              li.style.backgroundColor = '#fff3cd'; 
              break;
          case 'baja':
              li.style.backgroundColor = '#d4edda'; 
              break;
      }

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.classList.add("deleteButton");

      const editButton = document.createElement("button");
      editButton.textContent = "Editar";
      editButton.classList.add("editButton");


     // Función para eliminar una tarea
      deleteButton.addEventListener("click", () => {
          taskList.removeChild(li);
          removeTask(task);
          showFeedbackMessage("Tarea eliminada correctamente");
      });


      // Función para editar una tarea
      editButton.addEventListener("click", () => {
          const newTask = prompt("Edita la tarea:", task.task);
          const newPriority = prompt("Edita la prioridad (baja, media, alta):", task.priority);
          if (newTask && newTask.trim() !== "" && newPriority && ['baja', 'media', 'alta'].includes(newPriority) && newTask !== task.task) {
              li.textContent = `${newTask} (Prioridad: ${newPriority})`;

      // Cambia el color de fondo según la nueva prioridad
              switch (newPriority) {
                  case 'alta':
                      li.style.backgroundColor = '#f8d7da'; 
                      break;
                  case 'media':
                      li.style.backgroundColor = '#fff3cd'; 
                      break;
                  case 'baja':
                      li.style.backgroundColor = '#d4edda'; 
                      break;
              }

              li.appendChild(editButton);
              li.appendChild(deleteButton);

              const updatedTask = { task: newTask, priority: newPriority };
              updateTaskInStorage(task, updatedTask);

              showFeedbackMessage("Tarea actualizada correctamente");

              deleteButton.addEventListener("click", () => {
                  taskList.removeChild(li);
                  removeTask(updatedTask);
                  showFeedbackMessage("Tarea eliminada correctamente");
              });
              task = updatedTask; 
          } else if (newTask === task.task) {
              showFeedbackMessage("No puedes actualizar la tarea a lo mismo");
          } else if (!['baja', 'media', 'alta'].includes(newPriority)) {
              showFeedbackMessage("Prioridad no válida");
          } else {
              showFeedbackMessage("La tarea no puede estar vacía");
          }
      });

      li.appendChild(editButton);
      li.appendChild(deleteButton);
      taskList.appendChild(li);
  };


  // Muestra un mensaje de retroalimentación al usuario
  const showFeedbackMessage = (message) => {
      feedbackMessage.textContent = message;
      setTimeout(() => (feedbackMessage.textContent = ""), 3000);
  };

  addTaskButton.addEventListener("click", () => {
      const task = taskInput.value.trim();
      const priority = prioritySelect.value; 
      if (task === "") {
          showFeedbackMessage("La tarea no puede estar vacía");
          return;
      }
      if (!['baja', 'media', 'alta'].includes(priority)) {
          showFeedbackMessage("Prioridad no válida");
          return;
      }
      const newTask = { task, priority };
      addTaskToDOM(newTask);
      saveTask(newTask);
      taskInput.value = "";
      prioritySelect.value = "media"; 
      showFeedbackMessage("Tarea agregada con éxito");
  });

  loadTasks();
});

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('EvenInput');
    const button = document.getElementById('EvenkButton');
    const ul = document.getElementById('EvenkList');
    const dateInput = document.getElementById('DateInput'); 
  
    const loadEvents = () => {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.forEach(event => addEventToDOM(event));
    };
  
    const saveEvent = (event) => {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.push(event);
        localStorage.setItem('events', JSON.stringify(events));
    };
  
    const removeEvent = (event) => {
        let events = JSON.parse(localStorage.getItem('events')) || [];
        events = events.filter(e => e.description !== event.description || e.date !== event.date);
        localStorage.setItem('events', JSON.stringify(events));
    };
  
    const updateEventInStorage = (oldEvent, newEvent) => {
        let events = JSON.parse(localStorage.getItem('events')) || [];
        events = events.map(event => (event.description === oldEvent.description && event.date === oldEvent.date ? newEvent : event));
        localStorage.setItem('events', JSON.stringify(events));
    };
  
    const addEventToDOM = (event) => {
        const li = document.createElement('li');
        li.textContent = `${event.description} - ${event.date}`;
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('eliminar');
  
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('editar');
  
        deleteButton.addEventListener('click', () => {
            ul.removeChild(li);
            removeEvent(event);
            showFeedbackMessage('Evento eliminado correctamente');
        });
  
        editButton.addEventListener('click', () => {
            const newDescription = prompt('Edita la descripción del evento:', event.description);
            const newDate = prompt('Edita la fecha del evento (YYYY-MM-DD):', event.date);
            if (newDescription && newDescription.trim() !== '' && newDate && newDate.trim() !== '') {
                const newEvent = { description: newDescription.trim(), date: newDate.trim() };
                li.textContent = `${newEvent.description} - ${newEvent.date}`;
                li.appendChild(editButton);
                li.appendChild(deleteButton);
                updateEventInStorage(event, newEvent);
                showFeedbackMessage('Evento actualizado correctamente');
                event = newEvent; 
            } else {
                showFeedbackMessage('La descripción y la fecha no pueden estar vacías');
            }
        });
  
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        ul.appendChild(li);
    };
  
    const showFeedbackMessage = (message) => {
        const feedbackMessage = document.getElementById('Evento');
        feedbackMessage.textContent = message;
        setTimeout(() => (feedbackMessage.textContent = ''), 3000);
    };
  
    button.addEventListener('click', () => {
        const description = input.value.trim();
        const date = dateInput.value.trim(); 
        if (description === '' || date === '') {
            showFeedbackMessage('La descripción y la fecha no pueden estar vacías');
            return;
        }
        const event = { description, date };
        addEventToDOM(event);
        saveEvent(event);
        input.value = '';
        dateInput.value = ''; 
        showFeedbackMessage('Evento agregado con éxito');
    });
  
    loadEvents();
  });
  