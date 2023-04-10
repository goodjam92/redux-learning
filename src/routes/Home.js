import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToDo } from "../store";
import ToDo from "../components/ToDo";

function Home() {
  const [text, setText] = useState("");
  const toDos = useSelector((state) => state);
  const dispatch = useDispatch();

  function onChange(e) {
    setText(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    dispatch(addToDo(text));
    setText("");
  }

  return (
    <>
      <h1>TO Do</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What To Do?"
          value={text}
          onChange={onChange}
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((todo) => (
          <ToDo {...todo} key={todo.id} />
        ))}
      </ul>
    </>
  );
}

export default Home;
