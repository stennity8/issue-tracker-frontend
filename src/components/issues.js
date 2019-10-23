import { issuesAdapter } from '../adapters/IssuesAdapter'
import { Issue } from './issue'

class Issues {
  constructor() {
    this.issuesArray = []
    this.adapter = issuesAdapter
    this.createNewIssueBtn = document.querySelector('button#create-new-issue')
    this.newIssueForm = document.querySelector('#new-issue-container')
    this.createNewIssue = false
    this.fetchAndLoadOpenIssues()
    this.bindEventListeners()
  }

  fetchAndLoadOpenIssues() {
    this.adapter.getOpenIssues().then(issues =>
      issues.forEach(issue => this.issuesArray.push(new Issue(issue)))
    )
      .then(this.renderOpenIssues());
  }

  renderOpenIssues() {

  }

  bindEventListeners() {
    this.createNewIssueBtn.addEventListener('click', () => {
      // hide & seek with the form
      this.createNewIssue = !this.createNewIssue
      if (this.createNewIssue) {
        this.createNewIssueBtn.innerHTML = `
        <i class="fas fa-minus"></i> Hide
        `
        this.newIssueForm.style.display = 'block'
      } else {
        this.createNewIssueBtn.innerHTML = `
        <i class="fas fa-plus"></i> Create New Issue
        `
        this.newIssueForm.style.display = 'none'
      }
    })
  }
}

export const issues = new Issues();