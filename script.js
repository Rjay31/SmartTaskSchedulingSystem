let tasks = [];
let currentDate = new Date();

function addTask() {
  const text = document.getElementById('taskInput').value;
  const date = document.getElementById('taskDate').value;
  const priority = document.getElementById('taskPriority').value;

  if (!text || !date) return alert('Enter task and date');

  tasks.push({ text, date, priority });
  renderCalendar();

  document.getElementById('taskInput').value = '';
}

function renderCalendar() {
  const calendar = document.getElementById('calendar');
  calendar.innerHTML = '';

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  document.getElementById('monthYear').innerText =
    currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendar.innerHTML += `<div></div>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;

    const dayTasks = tasks.filter(t => t.date === dateStr);

    let taskHTML = '';
    dayTasks.forEach(t => {
      taskHTML += `<div class="task ${t.priority}">${t.text}</div>`;
    });

    calendar.innerHTML += `
      <div class="day">
        <div class="day-header">${day}</div>
        ${taskHTML}
      </div>
    `;
  }
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

renderCalendar();