import { useJira } from "../../context/JiraContext";
import { JIRA_URL } from "../../utils/constants";
import { TimeAgo } from "../TimeAgo";
import "./IssuesList.css";

export const IssuesList = () => {
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
      {issues
        .sort((issue) => {
          const toStaging = issue.changelog.histories.find((history) => {
            return history.items.find(
              (item) => item.field === "status" && item.toString === "STAGING"
            );
          }) || { created: "" };
          return new Date(toStaging.created).getTime();
        })
        .map((issue) => {
          const { id: issueId, key: issueKey, fields, changelog } = issue;
          return (
            <div key={issueId} className="issue-item">
              <div className="assignee-info">
                <img
                  src={fields.assignee?.avatarUrls["24x24"]}
                  alt={fields.assignee?.displayName || "No assignee"}
                  className="avatar"
                />
                <span className="name">
                  {fields.assignee?.displayName || "Unassigned"}
                </span>
              </div>
              <a
                href={`${JIRA_URL}/browse/${issueKey}`}
                target="_blank"
                rel="noopener noreferrer"
                className="issue-link">
                {issueKey}
              </a>
              <TimeAgo history={changelog.histories} />
            </div>
          );
        })}
    </div>
  );
};
