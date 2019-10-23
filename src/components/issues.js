import { issuesAdapter } from '../adapters/IssuesAdapter'
import { Issue } from './issue'

class Issues {
  constructor() {
    this.issuesArray = []
    this.adapter = issuesAdapter

    this.fetchAndLoadOpenIssues()
    this.bindEventListeners()
  }

  //Fetch all open issues from API
  fetchAndLoadOpenIssues() {
    this.adapter
      .getOpenIssues()
      .then(issues => {
        issues.forEach(issue => this.issuesArray.push(new Issue(issue)))
      })
      .then(() => {
        this.renderOpenIssues()
      })
      .catch(err => alert('Something went wrong'));
  }

  //Render all open issues to DOM
  renderOpenIssues() {
    const issueContainer = document.querySelector('.issue-container')
    console.log(this.issuesArray)
  }

  bindEventListeners() {
    const createNewIssueBtn = document.querySelector('button#create-new-issue')
    const newIssueForm = document.querySelector('#new-issue-container')
    let createNewIssue = false

    createNewIssueBtn.addEventListener('click', () => {
      // hide & seek with the form
      createNewIssue = !createNewIssue
      if (createNewIssue) {
        createNewIssueBtn.innerHTML = `
        <i class="fas fa-minus"></i> Hide
        `
        newIssueForm.style.display = 'block'
      } else {
        createNewIssueBtn.innerHTML = `
        <i class="fas fa-plus"></i> Create New Issue
        `
        newIssueForm.style.display = 'none'
      }
    })
  }
}

export const issues = new Issues();