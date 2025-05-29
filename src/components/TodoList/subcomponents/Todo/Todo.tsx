import { FC } from "react";
import { ITodoItemProps } from "./types";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import clsx from "clsx";
import styles from "./Todo.module.scss";

const Todo: FC<ITodoItemProps> = ({ id, label, isCompleted, onToggle }) => {
  const handleChange = () => {
    if (onToggle) {
      onToggle(id);
    }
  };

  return (
    <div
      id={id}
      className={styles["todo-wrapper"]}
      data-testid={`todo-${id}-test`}
    >
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
              data-testid="checkbox-test"
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
