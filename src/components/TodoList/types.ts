import type { CSSProperties, ReactNode } from "react";
import type { ITodoItemProps } from "./subcomponents/types";

export interface ITodoListProps {
  todos: ITodoItemProps[];
  onToggleTodo?: (id: string) => void;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
