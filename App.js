import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TodoApp from './TodoApp';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todo List</Text>
      <TodoApp/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
