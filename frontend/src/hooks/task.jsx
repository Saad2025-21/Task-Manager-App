import { tasks as initialTasks } from '../utilis/data'
import { useState } from 'react';

export function useTasks() {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (task) => {
    setTasks((prevTasks) => [task, ...prevTasks]);
  };

  return { tasks, addTask };
}