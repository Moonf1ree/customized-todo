import type { CSSProperties } from "react";

export interface ITodoItemProps {
  id: string;
  label?: string;
  isCompleted?: boolean;
  onToggle?: (id: string) => void;
  className?: string;
  style?: CSSProperties;
}
