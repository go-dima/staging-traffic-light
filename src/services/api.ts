import { JiraResponse } from "../types/jira";

const JIRA_URL = "https://myorg.atlassian.net";
const JIRA_API_PATH = "/rest/api/3/search/jql";
const JQL_QUERY = "status = STAGING ORDER BY created DESC";

export async function fetchStagingIssues(): Promise<JiraResponse> {
  const params = new URLSearchParams({
    jql: JQL_QUERY,
    fields: "assignee",
  });

  const response = await fetch(`${JIRA_URL}${JIRA_API_PATH}?${params}`);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);

  return data;
}
