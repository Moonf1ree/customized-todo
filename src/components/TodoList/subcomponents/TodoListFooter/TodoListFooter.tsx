import { Button, Typography } from "@mui/material";
import type { FC } from "react";
import type { ITodoListFooterProps } from "./types";
import styles from "./TodoListFooter.module.scss";
import clsx from "clsx";

const TodoListFooter: FC<ITodoListFooterProps> = ({
  filter,
  onFilterChange,
  className,
  style,
  itemsLeft,
  onClear,
}) => {
  return (
    <div className={clsx(styles["footer-wrapper"], className)} style={style}>
      <Typography className={styles["items-left"]} variant="caption">
        {`${itemsLeft} item${itemsLeft !== 1 ? "s" : ""} left`}
      </Typography>
      <div>
        <Button
          style={{ fontWeight: "normal", color: "#424242" }}
          color={filter === "all" ? "primary" : "inherit"}
          onClick={() => onFilterChange("all")}
        >
          <Typography variant="caption">All</Typography>
        </Button>
        <Button
          size="small"
          style={{ fontWeight: "normal", color: "#424242" }}
          color={filter === "active" ? "primary" : "inherit"}
          onClick={() => onFilterChange("active")}
        >
          <Typography variant="caption">Active</Typography>
        </Button>
        <Button
          style={{ fontWeight: "normal", color: "#424242" }}
          color={filter === "completed" ? "primary" : "inherit"}
          onClick={() => onFilterChange("completed")}
        >
          <Typography variant="caption">Completed</Typography>
        </Button>
      </div>
      <Button
        style={{ fontWeight: "normal", color: "#424242" }}
        color={filter === "active" ? "primary" : "inherit"}
        onClick={onClear}
      >
        <Typography variant="caption">Clear completed</Typography>
      </Button>
    </div>
  );
};

export default TodoListFooter;
