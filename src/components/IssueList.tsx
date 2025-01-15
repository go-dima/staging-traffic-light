import { useJira } from "../context/JiraContext";
import { JIRA_URL } from "../utils/constants";
import "./IssueList.css";

export const IssueList = () => {
  const { issues, loading, error } = useJira();

  if (loading) {
    return <div className="message">Loading...</div>;
  }

  if (error) {
    return <div className="message error">{error}</div>;
  }

  if (issues.length === 0) {
    return <div className="message">No issues in staging</div>;
  }

  return (
    <div className="issue-list">
      {issues.map((issue) => (
        <div key={issue.id} className="issue-item">
          <div className="assignee-info">
            <img
              src={issue.fields.assignee?.avatarUrls["24x24"]}
              alt={issue.fields.assignee?.displayName || "No assignee"}
              className="avatar"
            />
            <span className="name">
              {issue.fields.assignee?.displayName || "Unassigned"}
            </span>
          </div>
          <a
            href={`${JIRA_URL}/browse/${issue.key}`}
            target="_blank"
            rel="noopener noreferrer"
            className="issue-link">
            {issue.key}
          </a>
        </div>
      ))}
    </div>
  );
};
