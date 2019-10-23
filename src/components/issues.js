import { issuesAdapter } from '../adapters/IssuesAdapter'

class Issues {
  constructor() {
    this.issues = []
    this.adapter = issuesAdapter
    // this.bindEventListeners()
    this.fetchAndLoadOpenIssues()
  }

  fetchAndLoadOpenIssues() {
    this.adapter.getOpenIssues().then(issues => {
      console.log(issues);
    })
  }
}

export const issues = new Issues();