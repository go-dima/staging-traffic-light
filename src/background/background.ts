import { CONNECTION_PORT, MESSAGE_TYPE } from "../utils/constants";
import { JiraService } from "./jiraService";

// Create a connection port for the popup
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === CONNECTION_PORT) {
    port.onMessage.addListener(async (msg) => {
      if (msg.type === MESSAGE_TYPE.GET) {
        try {
          const issues = await JiraService.getLatestIssues();
          port.postMessage({ type: MESSAGE_TYPE.DATA, data: issues });
        } catch (error: any) {
          port.postMessage({ type: MESSAGE_TYPE.ERROR, error: error.message });
        }
      }
    });
  }
});

// Start polling
JiraService.startPolling();
