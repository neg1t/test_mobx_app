import { makeAutoObservable } from "mobx";
import { getTodos } from "./api";

export class TodosStore {
  todos: string[] = [];
  loading = false;
  error = "";

  constructor() {
    makeAutoObservable(this);
  }

  addTodo = (todo: string) => {
    if (this.todos.includes(todo)) {
      this.error = "Такая задача уже есть";
      return;
    }
    this.todos.push(todo);
  };

  clearError = () => {
    this.error = "";
  };

  removeTodo = (todo: string) => {
    this.todos = this.todos.filter((t) => t !== todo);
  };

  async fetchTodos() {
    try {
      this.loading = true;
      const response = await getTodos();
      this.todos = response.data.todos;
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }
}

export const todosStore = new TodosStore();
