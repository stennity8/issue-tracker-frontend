import { commentsAdapter } from '../adapters/CommentsAdapter'
import { Comment } from './comment'

export class Comments {
  constructor(id) {
    this.issueId = id
    this.commentsArray = []
    this.adapter = commentsAdapter
    // this.bindingsAndEventListeners()
    this.fetchAndLoadIssueComments()
  }

  //Fetch all open issues from API
  fetchAndLoadIssueComments() {
    this.adapter
      .getIssueComments(this.issueId)
      .then(comments => {
        comments.forEach(commentObj => this.commentsArray.push(new Comment(commentObj)))
        // this.commentsArray.push('test')
        // console.log(this.commentsArray)
      });
    // this.adapter
    //   .getIssueComments(this.issueId)
    //   .then(comments => {
    //     console.log(comments)
    //     comments.forEach(comment => this.commentsArray.push(new Comment(comment)))
    //     console.log(this.commentsArray)
    //   })
    //   // .then(() => {
    //   //   this.renderOpenIssues()
    //   // })
    //   .catch(err => alert('Something went wrong'));
  }
}

