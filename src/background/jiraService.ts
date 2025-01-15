import { fetchStagingIssues } from "../services/api";
import { IconManager, IconState } from "./iconManager";

export class JiraService {
  private static POLLING_INTERVAL = 5 * 60 * 1000; // 5 minutes

  static async checkStagingStatus(): Promise<void> {
    try {
      const response = await fetchStagingIssues();
      const issueCount = response.issues.length;

      await IconManager.setIcon(
        issueCount > 0 ? IconState.RED : IconState.GREEN,
        issueCount
      );
    } catch (error) {
      console.error("Error checking staging status:", error);
      await IconManager.setIcon(IconState.GREY);
    }
  }

  static startPolling(): void {
    this.checkStagingStatus();
    setInterval(() => this.checkStagingStatus(), this.POLLING_INTERVAL);
  }
}
