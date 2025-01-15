# Request

Direct link to issue:

- https://myorg.atlassian.net/browse/ORG-3906

---

Get STAGING issues

URL: https://myorg.atlassian.net

PATH: `/rest/api/3/search/jql?`

PARAMS:

- `jql=status%20%3D%20STAGING%20ORDER%20BY%20created%20DESC`
- `fields=assignee`

Response:

```json
{
  "issues": [
    {
      "expand": "renderedFields,names,schema,operations,editmeta,changelog,versionedRepresentations",
      "id": "27700",
      "self": "https://myorg.atlassian.net/rest/api/3/issue/27700",
      "key": "ORG-3906",
      "fields": {
        "assignee": {
          "self": "https://myorg.atlassian.net/rest/api/3/user?accountId=111111%3Aaaaaaa-6gg6-l337-8765-53678h",
          "accountId": "111111:aaaaaa-6gg6-l337-8765-53678h",
          "emailAddress": "some.one@gmail.com",
          "avatarUrls": {
            "48x48": "https://secure.gravatar.com/avatar/aaaa?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FLB-6.png",
            "24x24": "https://secure.gravatar.com/avatar/aaaa?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FLB-6.png",
            "16x16": "https://secure.gravatar.com/avatar/aaaa?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FLB-6.png",
            "32x32": "https://secure.gravatar.com/avatar/aaaa?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FLB-6.png"
          },
          "displayName": "Some One",
          "active": true,
          "timeZone": "Asia/Jerusalem",
          "accountType": "atlassian"
        }
      }
    }
  ]
}
```
