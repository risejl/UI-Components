import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Task 1", category: "wip" },
    { id: 2, name: "Task 2", category: "wip" },
    { id: 3, name: "Task 3", category: "complete" },
  ]);

  const onDragStart = (event, taskId) => {
    event.dataTransfer.setData("taskId", taskId);
  }

  const onDrop = (event, category) => {
    const taskId = event.dataTransfer.getData("taskId");
    setTasks((prevTasks) => 
      prevTasks.map((task) => 
        task.id === parseInt(taskId) ? { ...task, category } : task
      )
    );
  }

  const onDragOver = (event) => {
    event.preventDefault();
  }

  const renderTasks = (category) => {
    return tasks
      .filter((task) => task.category === category)
      .map((task) => (
        <div
          key={task.id}
          draggable
          onDragStart={(e) => onDragStart(e, task.id)}
          >
            {task.name}
        </div>
      ))
  } 

  return (
    <div>
      <div
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, "wip")}
      >
        <h2>In Progress</h2>
        {renderTasks("wip")}
      </div>
      <div
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, "complete")}
      >
        <h2>Completed</h2>
        {renderTasks("complete")}
      </div>
    </div>
  )
}