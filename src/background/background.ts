import { JiraService } from "./jiraService";

// Start polling when extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  JiraService.startPolling();
});

// Start polling when browser starts
chrome.runtime.onStartup.addListener(() => {
  JiraService.startPolling();
});
