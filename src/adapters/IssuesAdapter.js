class IssuesAdapter {
  constructor() {
    this.baseURL = 'http://localhost:3000/api/v1'
    this.openIssueURL = 'http://localhost:3000/api/v1/open_issues'
  }

  getOpenIssues() {
    return fetch(this.openIssueURL).then(res => res.json())
  }

  getIssueComments(id) {
    return fetch(this.baseURL + `issues/${id}/comments`).then(res => res.json())
  }
}