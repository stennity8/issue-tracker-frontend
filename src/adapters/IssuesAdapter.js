class IssuesAdapter {
  constructor() {
    // Great use of versioned API urls!
    this.baseURL = 'http://localhost:3000/api/v1'
    this.openIssueURL = 'http://localhost:3000/api/v1/issues/open'
    this.closedIssueURL = 'http://localhost:3000/api/v1/issues/closed'
  }

  // Could use a base method like the following to always prepend baseURL and
  // to always capture res.json() so that doesn't need to be in every function.
  // This would siomplify down the various functions a good bit
  fetch(path, configObj) {
    return fetch(`${this.baseURL}${path}`, configObj).then(res => res.json());
  }

  getOpenIssues() {
    return this.fetch('/issues/open');
  }

  getClosedIssues() {
    return this.fetch('/issues/closed');
  }

  createNewIssue(issue) {
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(issue)
    };

    return this.fetch('/issues', configObj);
  }

  updateIssue(issueObj, issueId) {
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(issueObj)
    };

    return this.fetch(`/issues/${issueId}`, configObj);
  }

  removeIssue(issueId) {
    return this.fetch(`/issues/${issueId}`, { method: "DELETE" });
  }
}

export const issuesAdapter = new IssuesAdapter();
