//TASK
document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");
    const feedbackMessage = document.getElementById("feedbackMessage");
  
    // Cargar tareas desde LocalStorage al iniciar la página
    const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => addTaskToDOM(task));
    };
  
    // Guardar una nueva tarea en LocalStorage
    const saveTask = (task) => {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
  
    // Eliminar una tarea de LocalStorage
    const removeTask = (task) => {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.filter(t => t !== task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
  
    // Actualizar una tarea en LocalStorage
    const updateTaskInStorage = (oldTask, newTask) => {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.map(task => (task === oldTask ? newTask : task));
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
  
    // Añadir una tarea al DOM
    const addTaskToDOM = (task) => {
      const li = document.createElement("li");
      li.textContent = task;
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.classList.add("deleteButton");
  
      const editButton = document.createElement("button");
      editButton.textContent = "Editar";
      editButton.classList.add("editButton");
  
      // Añadir evento al botón de eliminar
      deleteButton.addEventListener("click", () => {
        taskList.removeChild(li);
        removeTask(task);
        showFeedbackMessage("Tarea eliminada correctamente");
      });
  
      // Añadir evento al botón de editar
      editButton.addEventListener("click", () => {
        const newTask = prompt("Edita la tarea:", task);
        if (newTask && newTask.trim() !== "" && newTask !== task) {
          // Actualiza el contenido de la tarea en el DOM
          li.textContent = newTask;
          li.appendChild(editButton);
          li.appendChild(deleteButton);
          // Actualiza la tarea en LocalStorage
          updateTaskInStorage(task, newTask);
          // Muestra el mensaje de retroalimentación
          showFeedbackMessage("Tarea actualizada correctamente");
          // Actualiza el botón de eliminar con la nueva tarea
          deleteButton.addEventListener("click", () => {
            taskList.removeChild(li);
            removeTask(newTask);
            showFeedbackMessage("Tarea eliminada correctamente");
          });
          task = newTask; // Actualiza la tarea en la variable local
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
  
    // Mostrar mensaje de retroalimentación al usuario
    const showFeedbackMessage = (message) => {
      feedbackMessage.textContent = message;
      setTimeout(() => (feedbackMessage.textContent = ""), 3000);
    };
  
    // Añadir nueva tarea al hacer clic en el botón
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
  
    // Cargar las tareas al iniciar
    loadTasks();
  });


























document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("EvenInput");
    const addTaskButton = document.getElementById("EvenkButton");
    const taskList = document.getElementById("EvenkList");
    const feedbackMessage = document.getElementById("Evento");
  
    // Cargar tareas desde LocalStorage al iniciar la página
    const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => addTaskToDOM(task));
    };
  
    // Guardar una nueva tarea en LocalStorage
    const saveTask = (task) => {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
  
    // Eliminar una tarea de LocalStorage
    const removeTask = (task) => {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.filter(t => t !== task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
  
    // Actualizar una tarea en LocalStorage
    const updateTaskInStorage = (oldTask, newTask) => {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.map(task => (task === oldTask ? newTask : task));
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
  
    // Añadir una tarea al DOM
    const addTaskToDOM = (task) => {
      const li = document.createElement("li");
      li.textContent = task;
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.classList.add("deleteButton");
  
      const editButton = document.createElement("button");
      editButton.textContent = "Editar";
      editButton.classList.add("editButton");
  
      // Añadir evento al botón de eliminar
      deleteButton.addEventListener("click", () => {
        taskList.removeChild(li);
        removeTask(task);
        showFeedbackMessage("Tarea eliminada correctamente");
      });
  
      // Añadir evento al botón de editar
      editButton.addEventListener("click", () => {
        const newTask = prompt("Edita la tarea:", task);
        if (newTask && newTask.trim() !== "" && newTask !== task) {
          // Actualiza el contenido de la tarea en el DOM
          li.textContent = newTask;
          li.appendChild(editButton);
          li.appendChild(deleteButton);
          // Actualiza la tarea en LocalStorage
          updateTaskInStorage(task, newTask);
          // Muestra el mensaje de retroalimentación
          showFeedbackMessage("Tarea actualizada correctamente");
          // Actualiza el botón de eliminar con la nueva tarea
          deleteButton.addEventListener("click", () => {
            taskList.removeChild(li);
            removeTask(newTask);
            showFeedbackMessage("Tarea eliminada correctamente");
          });
          task = newTask; // Actualiza la tarea en la variable local
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
  
    // Mostrar mensaje de retroalimentación al usuario
    const showFeedbackMessage = (message) => {
      feedbackMessage.textContent = message;
      setTimeout(() => (feedbackMessage.textContent = ""), 3000);
    };
  
    // Añadir nueva tarea al hacer clic en el botón
    EvenkButton.addEventListener("click", () => {
      const task = EvenInput.value.trim();
      if (task === "") {
        showFeedbackMessage("La tarea no puede estar vacía");
        return;
      }
      addTaskToDOM(task);
      saveTask(task);
      EvenInput.value = "";
      showFeedbackMessage("Tarea agregada con éxito");
    });
  
    // Cargar las tareas al iniciar
    loadTasks();
  });