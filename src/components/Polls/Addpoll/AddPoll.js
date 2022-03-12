import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewPoll from "./NewPoll";
import PollContainer from "../PollContainer";
import { handleAddQuestion } from "../../../actions/shared";

const AddPoll = (props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { authedUser } = props;

  const handleAddPoll = (optionOne, optionTwo) => {
    if (optionOne !== "" && optionTwo !== "") {
      const question = {
        optionOneText: optionOne,
        optionTwoText: optionTwo,
        author: authedUser.id,
      };
      dispatch(handleAddQuestion(question));
    }
    navigate("/");
  };

  return (
    <div className="add-poll-container">
      <span className="add-poll-header">Create Poll</span>
      <PollContainer>
        <NewPoll handleAddPoll={handleAddPoll} />
      </PollContainer>
    </div>
  );
};

export default AddPoll;
