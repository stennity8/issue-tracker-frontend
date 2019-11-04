class CommentsAdapter {
  constructor() {
    this.baseURL = 'https://issue-tracker-backend-api.herokuapp.com//api/v1'
  }

  getIssueComments(id) {
    return fetch(this.baseURL + `/issues/${id}/comments`).then(res => res.json())
  }

  createNewCommentInstance(comment) {
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment)
    };

    return fetch(`https://issue-tracker-backend-api.herokuapp.com//api/v1/comments`, configObj).then(res => res.json())
  }
}

export const commentsAdapter = new CommentsAdapter();
