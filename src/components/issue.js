export class Issue {
  constructor({ creator, description, id, open_status, resolved_date, title }) {
    this.creator = creator
    this.description = description
    this.id = id
    this.open_status = open_status
    this.resolved_date = resolved_date
    this.title = title
    this.setStatus()
  }

  setStatus() {
    if (this.open_status === true) {
      this.status = 'Open'
    } else if (this.open_status === false) {
      this.status = 'Closed'
    }
  }

}
