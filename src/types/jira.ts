export interface JiraResponse {
  issues: Issue[];
}

export interface Issue {
  id: string;
  key: string;
  fields: {
    assignee: Assignee;
  };
  changelog: {
    histories: JiraHistory[];
  };
}

export interface JiraHistory {
  id: string;
  created: string;
  items: {
    field: string;
    fieldtype: string;
    from: string;
    fromString: string;
    to: string;
    toString: string;
  }[];
}

export interface Assignee {
  accountId: string;
  displayName: string;
  emailAddress: string;
  avatarUrls: {
    [key: string]: string;
  };
}
