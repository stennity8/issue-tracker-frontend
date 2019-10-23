class CommentsAdapter {
  constructor() {
    this.baseURL = 'http://localhost:3000/api/v1'
  }

  getIssueComments(id) {
    return fetch(this.baseURL + `issues/${id}/comments`).then(res => res.json())
  }
}