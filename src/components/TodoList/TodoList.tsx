import { useId, useState } from "react";
import type { FC } from "react";
import type { ITodoListProps } from "./types";
import Todo from "./subcomponents/Todo";
import { TextField } from "@mui/material";

const TodoList: FC<ITodoListProps> = ({
  todos: initialTodos,
  onToggleTodo: externalToggle,
  className,
  style,
  children,
}) => {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodoText, setNewTodoText] = useState("");
  const idPrefix = useId();

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      const newTodo = {
        id: `${idPrefix}-${todos.length}`,
        label: newTodoText.trim(),
        isCompleted: false,
      };
      setTodos([...todos, newTodo]);
      setNewTodoText("");
    }
  };

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
    externalToggle?.(id);
  };

  return (
    <div className={className} style={style}>
      <TextField
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        label="Добавить задачу"
        variant="outlined"
        fullWidth
        onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
      />
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          label={todo.label}
          isCompleted={todo.isCompleted}
          onToggle={handleToggleTodo}
        />
      ))}
      {children}
    </div>
  );
};

export default TodoList;
