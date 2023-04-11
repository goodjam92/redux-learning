import { legacy_createStore as createStore } from "redux";
import { addToDo, deleteToDo } from "./redux/action";
import { createReducer, configureStore, createSlice } from "@reduxjs/toolkit";

// createReducer, createSlice에서는 state를 mutate 할 수 있다.
// 내부적으로 immer를 사용하여 상태를 업데이트 해줌.
// mutate 후에 return을 하면 안된다! return을 할 경우엔 새로운 state를 리턴해야 함.
// action.payload -> redux의 관행같은 것

const storage = window.localStorage;

const initialState = () => {
  const toDos = storage.getItem("toDos");
  if (!toDos) {
    return [];
  }

  return JSON.parse(toDos);
};

/* const reducer = (state = [], action) => {
  switch (action.type) {
    case addToDo.type:
      // action.payload -> redux의 관행같은 것
      // addToDo 함수와 함께 보내어지는 인자의 값을 읽는다.
      const newToDo = { text: action.payload, id: Date.now() };
      storage.setItem("toDos", JSON.stringify([newToDo, ...state]));
      state.push()
      return JSON.parse(storage.getItem("toDos"));
    case deleteToDo.type:
      const updateToDoList = state.filter((toDo) => toDo.id !== action.payload);
      storage.setItem("toDos", JSON.stringify(updateToDoList));
      return JSON.parse(storage.getItem("toDos"));
    default:
      return state;
  }
};
 */

/* const toDoReducer = createReducer(initialState(), {
  [addToDo]: (state, action) => {
    const newToDo = { text: action.payload, id: Date.now() };
    storage.setItem("toDos", JSON.stringify([newToDo, ...state]));
    return JSON.parse(storage.getItem("toDos"));
  },
  [deleteToDo]: (state, action) => {
    const updateToDoList = state.filter((toDo) => toDo.id !== action.payload);
    storage.setItem("toDos", JSON.stringify(updateToDoList));
    return JSON.parse(storage.getItem("toDos"));
  },
}); */

/*  const store = configureStore({ reducer: toDos.reducer })
    export default store;  
*/

const toDos = createSlice({
  name: "toDoReducer",
  initialState: initialState(),
  reducers: {
    add: (state, action) => {
      storage.setItem(
        "toDos",
        JSON.stringify([{ text: action.payload, id: Date.now() }, ...state])
      );
      return JSON.parse(storage.getItem("toDos"));
    },
    remove: (state, action) => {
      const updateToDoList = state.filter((toDo) => toDo.id !== action.payload);
      storage.setItem("toDos", JSON.stringify(updateToDoList));
      return JSON.parse(storage.getItem("toDos"));
    },
  },
});

export const { add, remove } = toDos.actions;
export default configureStore({ reducer: toDos.reducer });