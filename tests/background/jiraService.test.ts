import { beforeEach, describe, expect, it, vi } from "vitest";
import { IconManager } from "../../src/background/iconManager";
import { JiraService } from "../../src/background/jiraService";
import { fetchStagingIssues } from "../../src/services/api";

vi.mock("../../src/services/api");
vi.mock("../../src/background/iconManager");

describe("JiraService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should set green icon when no issues found", async () => {
    vi.mocked(fetchStagingIssues).mockResolvedValue({ issues: [] });

    await JiraService.checkStagingStatus();

    expect(IconManager.setIcon).toHaveBeenCalledWith("green");
  });

  it("should set red icon when issues found", async () => {
    vi.mocked(fetchStagingIssues).mockResolvedValue({
      issues: [
        {
          id: "1",
          key: "TEST-1",
          fields: {
            assignee: {
              accountId: "1",
              displayName: "John Doe",
              emailAddress: "",
              avatarUrls: {},
            },
          },
        },
      ],
    });

    await JiraService.checkStagingStatus();

    expect(IconManager.setIcon).toHaveBeenCalledWith("red");
  });

  it("should set grey icon on error", async () => {
    vi.mocked(fetchStagingIssues).mockRejectedValue(new Error("API Error"));

    await JiraService.checkStagingStatus();

    expect(IconManager.setIcon).toHaveBeenCalledWith("grey");
  });
});
