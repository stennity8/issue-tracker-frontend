class IssuesAdapter {
  constructor() {
    this.baseURL = 'http://localhost:3000/api/v1'
    this.openIssueURL = 'http://localhost:3000/api/v1/issues/open'
  }

  getOpenIssues() {
    return fetch(this.openIssueURL).then(res => res.json())
  }
}

export const issuesAdapter = new IssuesAdapter();