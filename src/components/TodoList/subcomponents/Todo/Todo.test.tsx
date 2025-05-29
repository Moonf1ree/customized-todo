import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "./Todo";
import "@testing-library/jest-dom";

describe("Todo component", () => {
  const mockToggle = jest.fn();
  const testId = "todo-1";
  const testLabel = "Test todo item";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render todo item with correct label and unchecked by default", () => {
    render(
      <Todo
        id={testId}
        label={testLabel}
        isCompleted={false}
        onToggle={mockToggle}
      />
    );

    expect(screen.getByTestId(`todo-${testId}-test`)).toBeInTheDocument();

    expect(screen.getByText(testLabel)).toBeInTheDocument();

    const checkbox = screen.getByTestId("checkbox-test");
    expect(checkbox).not.toBeChecked();
  });

  it("should call onToggle with correct id when checkbox is clicked", () => {
    render(
      <Todo
        id={testId}
        label={testLabel}
        isCompleted={false}
        onToggle={mockToggle}
      />
    );

    fireEvent.click(screen.getByTestId("checkbox-test"));

    expect(mockToggle).toHaveBeenCalledTimes(1);
    expect(mockToggle).toHaveBeenCalledWith(testId);
  });

  it("should apply completed style when isCompleted is true", () => {
    const { container } = render(
      <Todo
        id={testId}
        label={testLabel}
        isCompleted={true}
        onToggle={mockToggle}
      />
    );

    const textElement = container.querySelector(".text-completed");
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveTextContent(testLabel);
  });
});
