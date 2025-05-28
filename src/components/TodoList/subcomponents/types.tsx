export interface ITodoItemProps {
  id: string;
  label?: string;
  isCompleted?: boolean;
  onToggle?: (id: string) => void;
}
