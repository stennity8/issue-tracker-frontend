class IssuesAdapter {
  constructor() {
    this.baseURL = 'http://localhost:3000/api/v1'
    this.openIssueURL = 'http://localhost:3000/api/v1/issues/open'
    this.closedIssueURL = 'http://localhost:3000/api/v1/issues/closed'
  }

  getOpenIssues() {
    return fetch(this.openIssueURL).then(res => res.json())
  }

  getClosedIssues() {
    return fetch(this.closedIssueURL).then(res => res.json())
  }

  createNewIssue(issue) {
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(issue)
    };

    return fetch(`https://issue-tracker-backend-api.herokuapp.com/api/v1/issues`, configObj).then(res => res.json())
  }

  updateIssue(issueObj, issueId) {
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(issueObj)
    };

    return fetch(`https://issue-tracker-backend-api.herokuapp.com/api/v1/issues/${issueId}`, configObj).then(res => res.json())
  }

  removeIssue(issueId) {
    return fetch(`https://issue-tracker-backend-api.herokuapp.com/api/v1/issues/${issueId}`, { method: "DELETE" }).then(res => res.json())
  }
}

export const issuesAdapter = new IssuesAdapter();