import { JiraResponse } from "../types/jira";
import { JIRA_URL } from "../utils/constants";

const JIRA_API_URL = `${JIRA_URL}/rest/api/3/search/jql`;
const JQL_QUERY = "status = STAGING ORDER BY created DESC";

export async function fetchStagingIssues(): Promise<JiraResponse> {
  try {
    const params = new URLSearchParams({
      jql: JQL_QUERY,
      fields: "assignee",
      expand: "changelog",
    });

    const response = await fetch(`${JIRA_API_URL}?${params}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    // console.log(`[${getFormattedTimestamp()}] API Response: ${data}`); // Debug log
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
