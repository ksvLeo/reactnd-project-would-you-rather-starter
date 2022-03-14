import { useNavigate, useParams } from "react-router-dom";
import { handleGetQuestionById } from "../../actions/questions";

const PollContainer = (props) => {
  let { question, showData } = props;
  const createdDate = question ? new Date(question.timestamp) : null;
  const navigate = useNavigate()

  return (
    <div className="">
      <label onClick={() => question ? navigate("../questions/" + question.id) : null}  title={question && "Click to view poll"} className={question ? "poll-header clickable" : "poll-header"}>
        Would You Rather...
        {question && (
          <span className="poll-data">
            <span>{question.author}</span>
            {showData !== false && <span>{`${createdDate.getUTCDate()}/${createdDate.getUTCMonth()}/${createdDate.getUTCFullYear()}`}</span>}
          </span>
        )}
      </label>

      <div className="poll-content">
        <div className="">{props.children}</div>
      </div>
    </div>
  );
};

export default PollContainer;
