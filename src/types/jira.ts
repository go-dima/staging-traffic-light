export interface JiraResponse {
  issues: Issue[];
}

export interface Issue {
  id: string;
  key: string;
  fields: {
    assignee: Assignee;
  };
}

export interface Assignee {
  accountId: string;
  displayName: string;
  emailAddress: string;
  avatarUrls: {
    [key: string]: string;
  };
}
