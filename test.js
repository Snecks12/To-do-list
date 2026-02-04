let currentEditLi = null; 

// Helper: Save tasks to localStorage
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Helper: Load tasks from localStorage
function loadTasks() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

// Helper: Render tasks from array
function renderTasks(tasks) {
  const list = document.getElementById('list');
  list.innerHTML = '';
  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    li.classList.add('text');
    li.textContent = `${task.text} Date: ${task.date} Time: ${task.time} ${task.setTime}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
      tasks.splice(idx, 1);
      saveTasks(tasks);
      renderTasks(tasks);
    });

    const editButton = document.createElement('button');
    editButton.classList.add('editBtn');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
      currentEditLi = li;
      document.getElementById('inputPop').value = task.text;
      document.getElementById('popDate').value = task.date;
      document.getElementById('popTime').value = task.time;
      document.body.style.backgroundColor = "#ffffff07";
      let divPop = document.getElementById('divPop');
      if (divPop) divPop.style.display = "flex";
      // Save handler
      document.getElementById('save').onclick = function() {
        const newText = document.getElementById('inputPop').value.trim().slice(0, 20);
        const newDate = document.getElementById('popDate').value;
        const newTime = document.getElementById('popTime').value;
        const hour = parseInt(newTime.split(':')[0], 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        tasks[idx] = { text: newText, date: newDate, time: newTime, setTime: ampm };
        saveTasks(tasks);
        renderTasks(tasks);
        divPop.style.display = 'none';
        currentEditLi = null;
      };
      // Cancel handler
      document.getElementById('cancel').onclick = function() {
        divPop.style.display = 'none';
      };
    });

    li.appendChild(deleteBtn);
    li.appendChild(editButton);
    list.appendChild(li);
  });
}
// Limit input to 20 characters as user types
document.addEventListener('DOMContentLoaded', function() {
  let input = document.getElementById('input');
  if (input) {
    input.addEventListener('input', function() {
      if (this.value.length > 20) {
        this.value = this.value.slice(0, 20);
        alert('Only 20 characters are allowed.');
      }
    });
  }
  renderTasks(loadTasks());
});
	document.getElementById('add').addEventListener('click', function(){
  const inputElem = document.getElementById('input').value.trim().slice(0, 20);//input//
  const date = document.getElementById('date').value;//date//
  const time = document.getElementById('time').value;//time//
  const hour = parseInt(time.split(':')[0], 10);
  const setTime = hour >= 12 ? 'PM' : 'AM';//timezone//
      const toast = document.getElementById('toast');
      toast.classList.add('show');

        if(inputElem === ''){
           setTimeout(() => {
           toast.style.display = 'block';
           toast.classList.remove('show');
          }, 3000);
          return;
        }else{
            toast.style.display = 'none';
        }
          // Save new task to localStorage and re-render
          const tasks = loadTasks();
          tasks.push({ text: inputElem, date, time, setTime });
          saveTasks(tasks);
          renderTasks(tasks);
          document.getElementById('input').value = '';
          document.getElementById('date').value = '';
          document.getElementById('time').value = '';
  });  
      
  window.onclick = function(event){
    const popup = document.getElementById('divPop');
    if(event.target == popup){
      popup.style.display = 'none';
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
            greetings = 'Good Morning';
        } else if (hours >= 12 && hours < 18) {
            greetings = 'Good Afternoon';
        } else {
        greetings = 'Good Evening';
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
  //clock
 