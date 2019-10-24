export class Comment {
  constructor({ issue_id, description, commentor, created_at }) {
    this.issueId = issue_id
    this.description = description
    this.commentor = commentor
    this.createdDate(created_at)
  }

  createdDate(created_at) {
    this.createdDate = Intl.DateTimeFormat().format(new Date(created_at));
  }
}