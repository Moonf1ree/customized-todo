import type { FC } from "react";
import type { ITodoItemProps } from "./types";
import styles from "./Todo.module.scss";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import clsx from "clsx";

const Todo: FC<ITodoItemProps> = ({ id, label, isCompleted, onToggle }) => {
  const handleChange = () => {
    if (onToggle) {
      onToggle(id);
    }
  };

  return (
    <div id={id} className={styles["todo-wrapper"]}>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              className={styles.checkbox}
              checked={isCompleted}
              color="default"
              onChange={handleChange}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleOutlineIcon />}
            />
          }
          label={
            <Typography
              variant="subtitle1"
              className={clsx(
                styles.text,
                isCompleted && styles["text-completed"]
              )}
            >
              {label}
            </Typography>
          }
        />
      </FormGroup>
    </div>
  );
};

export default Todo;
