import { useState } from "react";
import styles from "./App.module.css";
import TodoList from "./components/TodoList/TodoList";

const initialTodoItems = [
  { id: crypto.randomUUID(), label: "Тестовое задание", isCompleted: false },
  { id: crypto.randomUUID(), label: "Прекрасный код", isCompleted: true },
  { id: crypto.randomUUID(), label: "Покрытие тестами", isCompleted: false },
];

function App() {
  const [todos, setTodos] = useState(initialTodoItems);

  const handleToggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <TodoList
      className={styles["todolist-wrapper"]}
      todos={todos}
      onToggleTodo={handleToggleTodo}
    />
  );
}

export default App;
