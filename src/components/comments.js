import { commentsAdapter } from '../adapters/CommentsAdapter'
import { Comment } from './comment'

export class Comments {
  constructor(id) {
    this.issueId = id
    this.commentsArray = []
    this.adapter = commentsAdapter
    // this.bindingsAndEventListeners()
  }

  //Fetch all open issues from API
  fetchAndLoadIssueComments() {
    return this.adapter
      .getIssueComments(this.issueId)
      .then(comments => {
        comments.forEach(commentObj => this.commentsArray.push(new Comment(commentObj)))
      })
      .catch(err => alert('Something went wrong'));
  }
}

