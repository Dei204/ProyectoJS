
document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
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
      tasks = tasks.filter(t => t !== task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
  
    const updateTaskInStorage = (oldTask, newTask) => {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.map(task => (task === oldTask ? newTask : task));
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
  
    const addTaskToDOM = (task) => {
      const li = document.createElement("li");
      li.textContent = task;
  
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
        const newTask = prompt("Edita la tarea:", task);
        if (newTask && newTask.trim() !== "" && newTask !== task) {

          li.textContent = newTask;
          li.appendChild(editButton);
          li.appendChild(deleteButton);

          updateTaskInStorage(task, newTask);

          showFeedbackMessage("Tarea actualizada correctamente");
      
          deleteButton.addEventListener("click", () => {
            taskList.removeChild(li);
            removeTask(newTask);
            showFeedbackMessage("Tarea eliminada correctamente");
          });
          task = newTask; 
        } else if (newTask === task) {
          showFeedbackMessage("No puedes actualizar la tarea a lo mismo");
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
      if (task === "") {
        showFeedbackMessage("La tarea no puede estar vacía");
        return;
      }
      addTaskToDOM(task);
      saveTask(task);
      taskInput.value = "";
      showFeedbackMessage("Tarea agregada con éxito");
    });
  
    loadTasks();
  });

  document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('EvenInput');
    const button = document.getElementById('EvenkButton');
    const ul = document.getElementById('EvenkList');

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
        events = events.filter(e => e !== event);
        localStorage.setItem('events', JSON.stringify(events));
    };

    const updateEventInStorage = (oldEvent, newEvent) => {
        let events = JSON.parse(localStorage.getItem('events')) || [];
        events = events.map(event => (event === oldEvent ? newEvent : event));
        localStorage.setItem('events', JSON.stringify(events));
    };

    const addEventToDOM = (event) => {
        const li = document.createElement('li');
        li.textContent = event;

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
            const newEvent = prompt('Edita el evento:', event);
            if (newEvent && newEvent.trim() !== '' && newEvent !== event) {
                li.textContent = newEvent.trim();
                li.appendChild(editButton);
                li.appendChild(deleteButton);
                updateEventInStorage(event, newEvent);
                showFeedbackMessage('Evento actualizado correctamente');
              
                deleteButton.addEventListener('click', () => {
                    ul.removeChild(li);
                    removeEvent(newEvent);
                    showFeedbackMessage('Evento eliminado correctamente');
                });
                event = newEvent; 
            } else if (newEvent === event) {
                showFeedbackMessage('No puedes actualizar el evento a lo mismo');
            } else {
                showFeedbackMessage('El evento no puede estar vacío');
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
        const event = input.value.trim();
        if (event === '') {
            showFeedbackMessage('El evento no puede estar vacío');
            return;
        }
        addEventToDOM(event);
        saveEvent(event);
        input.value = '';
        showFeedbackMessage('Evento agregado con éxito');
    });

    loadEvents();
});