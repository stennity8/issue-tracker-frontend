class IssuesAdapter {
  constructor() {
    this.baseURL = 'http://localhost:3000/api/v1'
    this.openIssueURL = 'http://localhost:3000/api/v1/issues/open'
  }

  getOpenIssues() {
    return fetch(this.openIssueURL).then(res => res.json())
  }

  createNewIssue(issue) {
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(issue)
    };

    return fetch(`http://localhost:3000/api/v1/issues`, configObj).then(res => res.json())
  }

  resolveIssue(issueObj, issueId) {
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(issueObj)
    };

    return fetch(`http://localhost:3000/api/v1/issues/${issueId}`, configObj).then(res => res.json())
  }

  removeIssue(issueId) {

    return fetch(`http://localhost:3000/api/v1/issues/${issueId}`, { method: "DELETE" }).then(res => res.json())
  }
}

export const issuesAdapter = new IssuesAdapter();