import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";
import "@testing-library/jest-dom";

describe("TodoList Component", () => {
  const initialTodos = [
    { id: "1", label: "First task", isCompleted: false },
    { id: "2", label: "Second task", isCompleted: true },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render title and initial todos", () => {
    render(<TodoList title="My Todos" todos={initialTodos} />);

    expect(screen.getByTestId("todolist-title-test")).toHaveTextContent(
      "My Todos"
    );
    expect(screen.getByText("First task")).toBeInTheDocument();
    expect(screen.getByText("Second task")).toBeInTheDocument();
  });

  it("should allow typing in TextField", () => {
    render(<TodoList title="Test" todos={initialTodos} />);

    const input = screen
      .getByTestId("todolist-textfield-test")
      .querySelector("input");
    fireEvent.change(input!, { target: { value: "New task" } });

    expect(input).toHaveValue("New task");
  });

  it("should add new todo when Enter is pressed", () => {
    render(<TodoList title="Test" todos={initialTodos} />);

    const input = screen
      .getByTestId("todolist-textfield-test")
      .querySelector("input");
    fireEvent.change(input!, { target: { value: "New task" } });
    fireEvent.keyDown(input!, { key: "Enter" });

    expect(screen.getByText("New task")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("should not add empty todo", () => {
    render(<TodoList title="Test" todos={initialTodos} />);

    const input = screen
      .getByTestId("todolist-textfield-test")
      .querySelector("input");
    fireEvent.change(input!, { target: { value: "   " } });
    fireEvent.keyDown(input!, { key: "Enter" });

    expect(screen.queryAllByTestId(/todo-.*-test/)).toHaveLength(
      initialTodos.length
    );
  });

  it("should clear completed todos", () => {
    render(<TodoList title="Test" todos={initialTodos} />);

    const clearButton = screen.getByTestId(
      "todolist-footer-button-clear-completed"
    );
    fireEvent.click(clearButton);

    expect(screen.queryByText("Second task")).not.toBeInTheDocument();
    expect(screen.getByText("First task")).toBeInTheDocument();
  });

  it("should toggle todo completion status", () => {
    const mockToggle = jest.fn();
    render(
      <TodoList title="Test" todos={initialTodos} onToggleTodo={mockToggle} />
    );

    const checkboxes = screen.getAllByTestId("checkbox-test");
    fireEvent.click(checkboxes[0]);

    expect(mockToggle).toHaveBeenCalledWith("1");
  });
});
