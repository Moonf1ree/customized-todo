import type { CSSProperties } from "react";

export const enum ETodoListFooterFilterStates {
  all = "all",
  active = "active",
  completed = "completed",
}

export interface ITodoListFooterProps {
  filter: `${ETodoListFooterFilterStates}`;
  onFilterChange: (filter: `${ETodoListFooterFilterStates}`) => void;
  itemsLeft?: number;
  className?: string;
  style?: CSSProperties;
  onClear: () => void;
}
