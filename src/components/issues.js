import { issuesAdapter } from '../adapters/IssuesAdapter'
import { Issue } from './issue'

class Issues {
  constructor() {
    this.issuesArray = []
    this.adapter = issuesAdapter
    // this.bindEventListeners()
    this.fetchAndLoadOpenIssues()
  }

  fetchAndLoadOpenIssues() {
    this.adapter.getOpenIssues().then(issues =>
      issues.forEach(issue => this.issuesArray.push(new Issue(issue)))
    )
    console.log(this.issuesArray);

  }
}

export const issues = new Issues();