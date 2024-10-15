import React, { useReducer, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';


const ACTIONS = {
  ADD_TASK: 'add-task',
  REMOVE_TASK: 'remove-task'
};


function taskReducer(tasks, action) {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return [...tasks, { id: Date.now(), task: action.payload }];
    case ACTIONS.REMOVE_TASK:
      return tasks.filter((task) => task.id !== action.payload);
    default:
      return tasks;
  }
}

export default function App() {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [text, setText] = useState('');


  const addTask = () => {
    if (text.trim()) {
      dispatch({ type: ACTIONS.ADD_TASK, payload: text });
      setText('');
    }
  };


  const removeTask = (id) => {
    dispatch({ type: ACTIONS.REMOVE_TASK, payload: id });
  };

  return (
    <View style={styles.container}>
      
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Add a new task"
      />

      <TouchableOpacity style={styles.button} onPress={addTask}>
        <Text style={styles.buttonText}>Save Task</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => removeTask(item.id)}>
            <Text style={styles.taskItem}>{item.task}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 20,
    padding: 10,
    fontSize: 24,
    height: 100,
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 15, 
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  taskItem: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f9c2ff',
    fontSize: 18,
  },
});
