import { useSelector } from "react-redux";
import { numberOfKeys } from "../../utils/helpers";

const Leaderboard = () => {
  const users = useSelector((state) => state.users.value);

  const sortUsers = () => {
    let sortedUsers = { value: [] };
    if (users) {
      Object.values(users)
        .sort((a, b) => {
          const aScore = numberOfKeys(a.answers) + numberOfKeys(a.questions);
          const bScore = numberOfKeys(b.answers) + numberOfKeys(b.questions);

          return aScore < bScore;
        })
        .map((question) => sortedUsers.value.push(question));
    }
    return sortedUsers;
  };

  return (
    <div className="leaderboard-container">
      <span className="add-poll-header">Leaderboard</span>
      <div className="leaderboard-grid">
        <div className="leaderboard-row">
          <span className="leaderboard-table-headers leaderboard-header-names leaderboard-grid-headers">
            Name
          </span>
          <span className="leaderboard-table-headers leaderboard-header-results leaderboard-grid-headers">
            pAnswered
          </span>
          <span className="leaderboard-table-headers leaderboard-header-results leaderboard-grid-headers">
            pCreated
          </span>
          <span className="leaderboard-table-headers leaderboard-header-results leaderboard-grid-headers">
            Score
          </span>
        </div>
        {users &&
          sortUsers().value.map((user) => (
            <div key={user.id} className="leaderboard-row">
              <img className="leaderboard-avatar" src={user.avatarURL} />
              <span className="leaderboard-names">{user.name}</span>
              <span className="leaderboard-results">
                <span>{numberOfKeys(user.answers)}</span>
              </span>
              <span className="leaderboard-results">
                <span>{numberOfKeys(user.questions)}</span>
              </span>
              <span className="leaderboard-results leaderboard-score">
                <span>
                  {numberOfKeys(user.questions) + numberOfKeys(user.answers)}
                </span>
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Leaderboard;
