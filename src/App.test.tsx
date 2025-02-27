import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("Тестирование списка дел (Todo App)", () => {
  it("добавляет новую задачу в список", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "Новая задача" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(screen.getByText("Новая задача")).toBeInTheDocument();
  });

  it("отмечает задачу как выполненную", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "Сделать тесты" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    const task = screen.getByText("Сделать тесты");
    expect(task).toHaveClass("completed");
  });

  it("удаляет завершенные задачи", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "Удалить задачу" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    const clearButton = screen.getByText("Clear completed");
    fireEvent.click(clearButton);

    expect(screen.queryByText("Удалить задачу")).not.toBeInTheDocument();
  });

  it("фильтрует задачи (только активные)", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "Активная задача" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    fireEvent.change(input, { target: { value: "Завершенная задача" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]);

    const activeFilter = screen.getByText("Active");
    fireEvent.click(activeFilter);

    expect(screen.getByText("Активная задача")).toBeInTheDocument();
    expect(screen.queryByText("Завершенная задача")).not.toBeInTheDocument();
  });

  it("очищает поле ввода после добавления задачи", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "Пустой инпут" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(input).toHaveValue("");
  });

  it("не добавляет пустую задачу", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    const items = screen.queryAllByRole("listitem");
    expect(items.length).toBe(0);
  });
});
