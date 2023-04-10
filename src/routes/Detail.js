import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteToDo } from "../store";

function Detail() {
  const { id } = useParams();
  const toDo = useSelector((state) => state);
  const currentToDo = toDo.find((toDo) => toDo.id === parseInt(id));
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const deleteButtonClick = () => {
    dispatch(deleteToDo(id));
    navigator("/", { replace: true });
  };

  return (
    <>
      <h1>{currentToDo.text}</h1>
      <button onClick={deleteButtonClick}>Del</button>
      <h5>Created at : {currentToDo.id}</h5>
    </>
  );
}

export default Detail;
