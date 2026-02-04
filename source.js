 let currentEditLi = null; 

//save tasks to local storage // 
function saveTasks(tasks){
  localStorage.setItem('tasks',JSON.stringify(tasks));
}
//load tasks from local storage//
function loadTasks(){
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}
//helper render tasks from array//
function renderTasks(tasks){
  const list = document.getElementById('list');
  list.innerHTML = '';
  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    li.classList.add('text');
    //Main task text
    const taskSpan = document.createElement('span');
    taskSpan.classList.add('tasktext')
    taskSpan.classList.add('task-content');
    taskSpan.textContent = `${task.text} Date: ${task.date} Time: ${task.time} ${task.setTime}`;
    taskSpan.textContent = `${task.text}`;
    //Date span
    const dateSpan = document.createElement('span');
    dateSpan.classList.add('task-date');
    dateSpan.textContent = `Date: ${task.date}`;

    //Time span
    const timeSpan = document.createElement('span');
    timeSpan.classList.add('task-time');
    timeSpan.textContent = `Time: ${task.time} ${task.setTime}`;

    taskSpan.appendChild(dateSpan);
    taskSpan.appendChild(timeSpan);

    //button container code...
    const btnContainer = document.createElement('div');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
      tasks.splice(idx, 1);
      saveTasks(tasks);
      setTimeout(() => {
        li.remove();
    renderTasks(tasks); // Re-render if needed
  }, 300);
    });
    const editButton = document.createElement('button');
    editButton.classList.add('editBtn');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
      document.getElementById('inputPop').value = task.text;
      document.getElementById('popDate').value = task.date;
      document.getElementById('popTime').value = task.time;

      inputPop.value = '';
      let divPop = document.getElementById('divPop');
      if (divPop) divPop.style.display = 'flex';
      //save handler
      document.getElementById('save').onclick = function() {
        const newText = document.getElementById('inputPop').value.trim()//.slice(0, 50);
        const newDate = document.getElementById('popDate').value;
        const newTime = document.getElementById('popTime').value;
        const hour = parseInt(newTime.split(':')[0], 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        tasks[idx] = { text: newText, date: newDate, time: newTime, setTime: ampm };
        saveTasks(tasks);
        renderTasks(tasks);
        divPop.style.display = 'none';
        document.body.style.backgroundColor = 'white';
        document.body.style.zIndex = '1';
        currentEditLi = null;
      };
      document.getElementById('cancel').onclick = function() {
        divPop.style.display = 'none';
        document.body.style.backgroundColor = 'white';
      };
    });
    btnContainer.classList.add('btnContainer');
    btnContainer.appendChild(deleteBtn);
    btnContainer.appendChild(editButton);
    li.appendChild(taskSpan);
    li.appendChild(btnContainer);
    
    // Animate only the last added task
    if (idx === tasks.length - 1 && window.justAdded) {
      li.classList.add('animate');
      setTimeout(() => {
        li.classList.remove('animate');
      }, 700);
      window.justAdded = false;
    }
    list.appendChild(li);

  });
}

  renderTasks(loadTasks());

	document.getElementById('add').addEventListener('click', function(){
  const inputElem = document.getElementById('input').value.trim()//.slice(0, 20);//input//
  const date = document.getElementById('date').value;//date//
  const time = document.getElementById('time').value;//time//
  const hour = parseInt(time.split(':')[0], 10);
  const setTime = hour >= 12 ? 'PM' : 'AM';//timezone//
      const toast = document.getElementById('toast');
      toast.classList.add('show');
          
        if(inputElem === '' || date === '' || time === ''){
           setTimeout(() => {
           toast.style.display = 'block';
           toast.classList.remove('show');
          }, 5000);
          return;
        }else{
            toast.style.display = 'none';
        }

  const tasks = loadTasks();
  tasks.push({ text: inputElem, date, time, setTime });
  saveTasks(tasks);
  window.justAdded = true;
  renderTasks(tasks);
  document.getElementById('input').value = '';
  document.getElementById('date').value = '';
  document.getElementById('time').value = '';
  });  
      
  window.onclick = function(event){
    const popup = document.getElementById('divPop');
    if(event.target == popup){
      popup.style.display = 'none';
      document.body.style.backgroundColor = 'white';
    };
  } 

    function addZero(i){
      return(i < 10 ? '0' + i : i);
    }

    function myHours(){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date();

    const dayIndex = d.getDay();
    const day = weekday[dayIndex];
    
    const dates = new Date('2025-09-19');
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dates.toLocaleDateString('en-US', options);

    let hours = d.getHours();
    const minutes = addZero(d.getMinutes());
    const seconds = addZero(d.getSeconds());

    // Convert to 12 hours format//
    const ampm = hours >= 12 ? 'PM' : 'AM';
      let greetings;
        if (hours >= 0 && hours < 12) {
            greetings = 'Good Morning🌞';
        } else if (hours >= 12 && hours < 18) {
            greetings = 'Good Afternoon☀';
        } else {
        greetings = 'Good Evening🌜';
        }

    hours = hours % 12;
    hours = hours ? hours : 12;

    const displayHours = addZero(hours);

    const dateString = d.toDateString();

    const time = `${displayHours}:${minutes}:${seconds} ${ampm}`;
    document.getElementById('clock').innerHTML = `${day} ${formattedDate} ${time} ${greetings}`;
    }
    myHours();
    setInterval(myHours,1000);