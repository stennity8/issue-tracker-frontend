import { Comments } from './comments'

export class Issue {
  constructor({ creator, description, id, open_status, resolved_date, title, created_at }) {
    this.creator = creator
    this.description = description
    this.id = id
    this.openStatus = open_status
    this.resolvedDate = resolved_date
    this.title = title
    this.comments = {}
    this.createdDate(created_at)
    this.setStatus()
  }

  setStatus() {
    if (this.openStatus === true) {
      this.status = 'Open'
    } else if (this.openStatus === false) {
      this.status = 'Closed'
    }
  }

  createdDate(created_at) {
    this.createdDate = Intl.DateTimeFormat().format(new Date(created_at));
  }

  getComments() {
    this.comments = new Comments(this.id)
  }

}
