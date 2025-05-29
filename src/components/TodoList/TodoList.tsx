import { useId, useState } from "react";
import type { FC } from "react";
import type { ITodoListProps } from "./types";
import Todo from "./subcomponents/Todo/Todo";
import { InputAdornment, TextField, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import TodoListFooter from "./subcomponents/TodoListFooter/TodoListFooter";
import type { ETodoListFooterFilterStates } from "./subcomponents/TodoListFooter/types";
import styles from "./TodoList.module.scss";
import clsx from "clsx";

const TodoList: FC<ITodoListProps> = ({
  title,
  todos: initialTodos,
  onToggleTodo: externalToggle,
  className,
  style,
}) => {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodoText, setNewTodoText] = useState("");
  const [filter, setFilter] = useState<`${ETodoListFooterFilterStates}`>("all");
  const idPrefix = useId();
  const itemsLeft = todos.filter((todo) => !todo.isCompleted).length;
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
  const handleFilterChange = (newFilter: `${ETodoListFooterFilterStates}`) => {
    setFilter(newFilter);
  };
  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.isCompleted));
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "active":
        return !todo.isCompleted;
      case "completed":
        return todo.isCompleted;
      default:
        return true;
    }
  });

  return (
    <div className={clsx(styles["todolist-wrapper"], className)} style={style}>
      <Typography className={styles["title"]} variant="h1">
        {title}
      </Typography>
      <TextField
        value={newTodoText}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment
                style={{ opacity: 0.5, paddingLeft: "8px" }} // уравнял отступы в инпуте mui и todoitem от иконок
                position="start"
              >
                <ExpandMore />
              </InputAdornment>
            ),
          },
        }}
        onChange={(e) => setNewTodoText(e.target.value)}
        label="What needs to be done?"
        variant="outlined" // outlined т.к. на белом фоне и нет смысла в filled для плавающего label
        size="medium"
        fullWidth
        onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
      />
      {filteredTodos.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          label={todo.label}
          isCompleted={todo.isCompleted}
          onToggle={handleToggleTodo}
        />
      ))}
      <TodoListFooter
        itemsLeft={itemsLeft}
        onClear={handleClearCompleted}
        filter={filter}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default TodoList;
