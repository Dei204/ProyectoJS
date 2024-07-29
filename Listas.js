document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const prioritySelect = document.getElementById("prioritySelect"); 
  const addTaskButton = document.getElementById("addTaskButton");
  const taskList = document.getElementById("taskList");
  const feedbackMessage = document.getElementById("feedbackMessage");

  const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => addTaskToDOM(task));
  };

  const saveTask = (task) => {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const removeTask = (task) => {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.filter(t => t.task !== task.task); // Filtrar por tarea
      localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const updateTaskInStorage = (oldTask, newTask) => {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.map(task => (task.task === oldTask.task ? newTask : task));
      localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const addTaskToDOM = (task) => {
      const li = document.createElement("li");
      li.textContent = `${task.task} (Prioridad: ${task.priority})`;

      // Color de fondo según prioridad
      switch (task.priority) {
          case 'alta':
              li.style.backgroundColor = '#f8d7da'; // Rojo claro
              break;
          case 'media':
              li.style.backgroundColor = '#fff3cd'; // Amarillo claro
              break;
          case 'baja':
              li.style.backgroundColor = '#d4edda'; // Verde claro
              break;
      }

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.classList.add("deleteButton");

      const editButton = document.createElement("button");
      editButton.textContent = "Editar";
      editButton.classList.add("editButton");

      deleteButton.addEventListener("click", () => {
          taskList.removeChild(li);
          removeTask(task);
          showFeedbackMessage("Tarea eliminada correctamente");
      });

      editButton.addEventListener("click", () => {
          const newTask = prompt("Edita la tarea:", task.task);
          const newPriority = prompt("Edita la prioridad (baja, media, alta):", task.priority);
          if (newTask && newTask.trim() !== "" && newPriority && ['baja', 'media', 'alta'].includes(newPriority) && newTask !== task.task) {
              li.textContent = `${newTask} (Prioridad: ${newPriority})`;

              // Actualizar color de fondo según nueva prioridad
              switch (newPriority) {
                  case 'alta':
                      li.style.backgroundColor = '#f8d7da'; // Rojo claro
                      break;
                  case 'media':
                      li.style.backgroundColor = '#fff3cd'; // Amarillo claro
                      break;
                  case 'baja':
                      li.style.backgroundColor = '#d4edda'; // Verde claro
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
              task = updatedTask; // Actualizar tarea en variable local
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
                event = newEvent; // Update the reference of the event
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
  