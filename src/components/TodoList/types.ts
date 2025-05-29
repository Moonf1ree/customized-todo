import type { CSSProperties } from "react";
import type { ITodoItemProps } from "./subcomponents/Todo/types";

export interface ITodoListProps {
  title?: string;
  todos: ITodoItemProps[];
  onToggleTodo?: (id: string) => void;
  className?: string;
  style?: CSSProperties;
}
