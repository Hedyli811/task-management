import { useState } from "react";

function App() {
  const initialTask = [];
  const [tasks, settasks] = useState(initialTask);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showAddNewTask, setShowAddNewTask] = useState(false);

  function handleShowContent(task) {
    setSelectedTask(task);
  }
  function handleShowAddNewTask() {
    setSelectedTask(null);
    setShowAddNewTask((show) => !show);
  }
  function handleAddTask(task) {
    settasks((tasks) => [...tasks, task]);
  }
  function taskDone() {}
  return (
    <>
      <div className="header">
        <h1>ToDo</h1>
      </div>
      <div className="main">
        <TaskList
          tasks={tasks}
          onShowContent={handleShowContent}
          onShowAddNewTask={handleShowAddNewTask}
        />
        {showAddNewTask && <NewTask onAddNewTask={handleAddTask} />}
        <TaskContent selectedTask={selectedTask} onTaskDone={taskDone} />
      </div>
    </>
  );
}
export default App;

function TaskList({ tasks, onShowContent, onShowAddNewTask }) {
  return (
    <div className="mid">
      <div className="status">
        <button id="all-tasks" class="active">
          ALL
        </button>
        <button id="unfinish-tasks">DOING</button>
        <button id="finished-tasks">DONE</button>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <>
            <div>{task.date}</div>
            <li onClick={() => onShowContent(task)}>{task.taskTopic}</li>
          </>
        ))}
      </div>
      <button className="add-task add" onClick={() => onShowAddNewTask()}>
        New task
      </button>
    </div>
  );
}

function TaskContent({ selectedTask, onTaskDone }) {
  return (
    selectedTask && (
      <div className="right">
        <div className="title">
          <div class="todo-name">{selectedTask.taskTopic}</div>
          <div class="manipulate">
            <a onClick={() => onTaskDone(selectedTask.taskTopic)}>
              <i class="fa fa-check-square-o"></i>
            </a>
            <a>
              <i class="fa fa-pencil-square-o"></i>
            </a>
          </div>
        </div>
        <div className="task-date">
          <span>{selectedTask.date}</span>
        </div>
        <div className="content">{selectedTask.content}</div>
        <div className="button-area">
          <span className="info"></span>
        </div>
      </div>
    )
  );
}

function NewTask({ onAddNewTask }) {
  const [taskTopic, setTaskTopic] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  function handleSave() {
    const newTask = {
      taskTopic,
      date,
      content,
      done: false,
    };
    onAddNewTask(newTask);
  }

  return (
    <div className="right">
      <div className="title">
        <div class="todo-name">
          <input
            type="text"
            class="input-title"
            placeholder="Please enter a title"
            value={taskTopic}
            onChange={(e) => setTaskTopic(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="task-date">
        <span>
          <input
            type="date"
            className="input-date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></input>
        </span>
      </div>
      <div className="content">
        <textarea
          className="textarea-content"
          placeholder="Please enter the task content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div className="button-area">
        <span className="info"></span>
        <button className="save" onClick={handleSave}>
          Save
        </button>
        <button className="cancel-save">Cancel</button>
      </div>
    </div>
  );
}
