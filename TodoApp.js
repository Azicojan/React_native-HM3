


import React, { useRef, useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Animated } from 'react-native';



const TodoApp = () => {
    const [data, setData] = useState([
      { id: '1', task: 'Task 1', description: 'Description for Task 1', done: false },
      { id: '2', task: 'Task 2', description: 'Description for Task 2', done: false },
      // Add more tasks as needed
    ]);
  
    const [taskNumber, setTaskNumber] = useState(3); // Start with 3 since we have 2 initial tasks
  
    const fadeOutAnimation = useRef(new Animated.Value(1)).current;
    const completedTasks = useRef([]);
  
    const handleTaskCompletion = (id) => {
      setData((prevData) =>
        prevData.map((item) => {
          if (item.id === id) {
            item.done = !item.done;
            // Reset the fade-out animation value for the next task
            fadeOutAnimation.setValue(1);
          }
          return item;
        })
      );
    };
  
    useEffect(() => {
      // Start the fade-out animation for completed tasks
      const completedTasksIds = data.reduce((acc, task) => {
        if (task.done) {
          acc.push(task.id);
        }
        return acc;
      }, []);
  
      if (completedTasksIds.length > 0) {
        Animated.timing(fadeOutAnimation, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }).start(() => {
          // After the fade-out animation, mark the tasks as completed
          completedTasks.current = completedTasksIds;
          // Wait for 3 seconds before removing the completed tasks
          setTimeout(() => {
            setData((prevData) => prevData.filter((task) => !completedTasks.current.includes(task.id)));
            // Reset the fade-out animation value for the next task
            fadeOutAnimation.setValue(1);
          }, 3000);
        });
      }
    }, [data, fadeOutAnimation]);
  
    const renderItem = ({ item, index }) => {
      const opacity = item.done ? fadeOutAnimation : 1;
  
      return (
        <Animated.View style={{ ...styles.taskItem, opacity }}>
          <TouchableOpacity
            onPress={() => handleTaskCompletion(item.id)}
            style={styles.checkboxContainer}
          >
            {item.done ? (
              <View style={styles.checkedCheckbox} />
            ) : (
              <View style={styles.uncheckedCheckbox} />
            )}
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.taskName}>{`Task ${index + 1}`}</Text>
            {!item.done && (
              <TextInput
                style={styles.descriptionInput}
                value={item.description}
                onChangeText={(text) => {
                  setData((prevData) =>
                    prevData.map((task) => {
                      if (task.id === item.id) {
                        task.description = text;
                      }
                      return task;
                    })
                  );
                }}
                onFocus={() => {
                  // Clear the input field when the user clicks on it
                  setData((prevData) =>
                    prevData.map((task) => {
                      if (task.id === item.id) {
                        task.description = '';
                      }
                      return task;
                    })
                  );
                }}
              />
            )}
          </View>
        </Animated.View>
      );
    };
  
    const addNewTask = () => {
      const newTask = {
        id: taskNumber.toString(),
        task: `Task ${taskNumber}`,
        description: 'This is a new task',
        done: false,
      };
      setData((prevData) => [...prevData, newTask]);
      setTaskNumber((prevNumber) => prevNumber + 1); // Increment the taskNumber for the next new task
    };
  
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id} // Use the 'id' property as the key
        />
  
        <TouchableOpacity style={styles.addButton} onPress={addNewTask}>
          <Text style={styles.addButtonLabel}>Add New Task</Text>
        </TouchableOpacity>
      </View>
    );
  };
     
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  uncheckedCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000',
  },
  checkedCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#000',
  },
  descriptionInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 16,
  },
});

export default TodoApp;

