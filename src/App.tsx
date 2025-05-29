import styles from "./App.module.css";
import TodoList from "./components/TodoList/TodoList";

const initialTodoItems = [
  { id: crypto.randomUUID(), label: "Тестовое задание", isCompleted: false },
  { id: crypto.randomUUID(), label: "Прекрасный код", isCompleted: true },
  { id: crypto.randomUUID(), label: "Покрытие тестами", isCompleted: false },
];

function App() {
  return (
    <TodoList
      title="todos"
      className={styles["todolist-wrapper"]}
      todos={initialTodoItems}
    />
  );
}

export default App;
