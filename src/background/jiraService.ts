import { fetchStagingIssues } from "../services/api";
import type { JiraResponse } from "../types/jira";
import { getFormattedTimestamp } from "../utils/utils";
import { IconManager, IconState } from "./iconManager";

export class JiraService {
  private static POLLING_INTERVAL = 5 * 60 * 1000; // 5 minutes
  private static latestResponse: JiraResponse | null = null;

  static async checkStagingStatus(): Promise<void> {
    try {
      const response = await fetchStagingIssues();
      this.latestResponse = response;
      const issueCount = response.issues.length;

      await IconManager.setIcon(
        issueCount > 0 ? IconState.RED : IconState.GREEN,
        issueCount
      );
    } catch (error) {
      console.error("Error checking staging status:", error);
      await IconManager.setIcon(IconState.GREY);
      throw error; // Re-throw to handle in caller
    }
  }

  static async getLatestIssues(): Promise<JiraResponse> {
    try {
      if (!this.latestResponse) {
        await this.checkStagingStatus();
      }
      console.log(
        `[${getFormattedTimestamp()}] Returning latest issues: ${
          this.latestResponse?.issues
        }`
      ); // Debug log
      return this.latestResponse || { issues: [] };
    } catch (error) {
      console.error("Error getting latest issues:", error);
      throw error;
    }
  }

  static startPolling(): void {
    this.checkStagingStatus();
    setInterval(() => this.checkStagingStatus(), this.POLLING_INTERVAL);
  }
}
