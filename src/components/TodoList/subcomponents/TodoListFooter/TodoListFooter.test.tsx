import { render, screen, fireEvent } from "@testing-library/react";
import TodoListFooter from "./TodoListFooter";
import "@testing-library/jest-dom";
import { ETodoListFooterFilterStates } from "./types";

describe("TodoListFooter", () => {
  const mockFilterChange = jest.fn();
  const mockClearCompleted = jest.fn();
  const defaultProps = {
    filter: ETodoListFooterFilterStates.all,
    onFilterChange: mockFilterChange,
    onClear: mockClearCompleted,
    itemsLeft: 3,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correct items left count", () => {
    render(<TodoListFooter {...defaultProps} />);
    expect(screen.getByText("3 items left")).toBeInTheDocument();
  });

  it("renders singular form when 1 item left", () => {
    render(<TodoListFooter {...defaultProps} itemsLeft={1} />);
    expect(screen.getByText("1 item left")).toBeInTheDocument();
    expect(screen.queryByText(/items left/)).not.toBeInTheDocument();
  });

  it("renders all filter buttons", () => {
    render(<TodoListFooter {...defaultProps} />);
    expect(
      screen.getByTestId("todolist-footer-filter-all")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("todolist-footer-filter-active")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("todolist-footer-filter-completed")
    ).toBeInTheDocument();
  });

  it("renders clear completed button", () => {
    render(<TodoListFooter {...defaultProps} />);
    expect(
      screen.getByTestId("todolist-footer-button-clear-completed")
    ).toBeInTheDocument();
  });

  describe("filter interactions", () => {
    it("triggers onFilterChange with 'all' when All button clicked", () => {
      render(<TodoListFooter {...defaultProps} />);
      fireEvent.click(screen.getByTestId("todolist-footer-filter-all"));
      expect(mockFilterChange).toHaveBeenCalledWith(
        ETodoListFooterFilterStates.all
      );
    });

    it("triggers onFilterChange with 'active' when Active button clicked", () => {
      render(<TodoListFooter {...defaultProps} />);
      fireEvent.click(screen.getByTestId("todolist-footer-filter-active"));
      expect(mockFilterChange).toHaveBeenCalledWith(
        ETodoListFooterFilterStates.active
      );
    });

    it("triggers onFilterChange with 'completed' when Completed button clicked", () => {
      render(<TodoListFooter {...defaultProps} />);
      fireEvent.click(screen.getByTestId("todolist-footer-filter-completed"));
      expect(mockFilterChange).toHaveBeenCalledWith(
        ETodoListFooterFilterStates.completed
      );
    });
  });

  it("triggers onClear when Clear completed button clicked", () => {
    render(<TodoListFooter {...defaultProps} />);
    fireEvent.click(
      screen.getByTestId("todolist-footer-button-clear-completed")
    );
    expect(mockClearCompleted).toHaveBeenCalled();
  });
});
