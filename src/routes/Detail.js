import { connect, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { actionCreators } from "../store";

function Detail({ toDo }) {
  const { id } = useParams();
  const currentToDo = toDo.find((toDo) => toDo.id === parseInt(id));
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const deleteButtonClick = () => {
    dispatch(actionCreators.deleteToDo(id));
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

function mapStateToProps(state) {
  return { toDo: state };
}

export default connect(mapStateToProps)(Detail);
