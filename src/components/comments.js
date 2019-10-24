import { commentsAdapter } from '../adapters/CommentsAdapter'
import { Comment } from './comment'

export class Comments {
  constructor(id) {
    this.id = id
    this.commentsArray = []
    this.adapter = commentsAdapter
    // this.bindingsAndEventListeners()
    this.fetchAndLoadIssueComments()
  }

  //Fetch all open issues from API
  fetchAndLoadIssueComments() {
    this.adapter
      .getIssueComments(this.id)
      .then(comments => {
        comments.forEach(comment => this.commentsArray.push(new Comment(comment)))
      })
      .then(showitems => console.log(this.commentsArray));
    // .then(() => {
    //   this.renderOpenIssues()
    // })
    // .catch(err => alert('Something went wrong'));
  }
}

