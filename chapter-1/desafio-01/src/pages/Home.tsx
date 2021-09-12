import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, ChangeTaskData } from '../components/TaskItem';
import { TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {

  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const duplicatedTitle = tasks.find(task => task.title.toUpperCase() === newTaskTitle.toUpperCase());

    if (duplicatedTitle) {

      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
      return;
    }

    const data = {
      id : new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldState => [...oldState, data]);

  }

  function handleToggleTaskDone(id: number) {

    const updatedTasks = tasks.map(task => ({ ...task }))
    const taskToChange = updatedTasks.find(task => task.id === id);

    if (!taskToChange)
      return;
    
    taskToChange.done = !taskToChange.done;
    setTasks(updatedTasks);
    
  }

  function handleEditTask(taskData: ChangeTaskData) {

    const updatedTasks = tasks.map(task => ({ ...task }))
    const taskToChange = updatedTasks.find(task => task.id === taskData.taskId);

    if (!taskToChange)
      return;
    
    taskToChange.title = taskData.taskNewTitle;
    setTasks(updatedTasks);

  }

  function handleRemoveTask(id: number) {
    
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => { return },
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: () => {
            setTasks(oldState => oldState.filter(
              task => task.id !== id
            ))
          }
        }  
      ]
    );

  }

  return (
    
    <View style={styles.container}>
      
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})