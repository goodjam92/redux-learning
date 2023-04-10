import { legacy_createStore as createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";
const storage = window.localStorage;

export const addToDo = (text) => {
  return {
    type: ADD,
    text,
  };
};

export const deleteToDo = (id) => {
  return {
    type: DELETE,
    id: parseInt(id),
  };
};

const initialState = () => {
  const toDos = storage.getItem("toDos");
  if (!toDos) {
    return [];
  }

  return JSON.parse(toDos);
};

const toDoReducer = (state = initialState(), action) => {
  switch (action.type) {
    case ADD:
      const newToDo = { text: action.text, id: Date.now() };
      storage.setItem("toDos", JSON.stringify([newToDo, ...state]));
      return JSON.parse(storage.getItem("toDos"));
    case DELETE:
      const deleteToDo = state.filter((toDo) => toDo.id !== action.id);
      storage.setItem("toDos", JSON.stringify(deleteToDo));
      return JSON.parse(storage.getItem("toDos"));
    default:
      return state;
  }
};

const store = createStore(toDoReducer);

export default store;
