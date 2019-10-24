import { issuesAdapter } from '../adapters/IssuesAdapter'
import { Issue } from './issue'

class Issues {
  constructor() {
    this.issuesArray = []
    this.adapter = issuesAdapter
    this.bindingsAndEventListeners()
    this.fetchAndLoadOpenIssues()
  }

  bindingsAndEventListeners() {
    this.issueContainer = document.querySelector('.issue-container')

    const createNewIssueBtn = document.querySelector('button#create-new-issue')
    const newIssueForm = document.querySelector('#new-issue-container')
    let createNewIssue = false

    //Hide or show create new issue form
    createNewIssueBtn.addEventListener('click', () => {
      createNewIssue = !createNewIssue
      if (createNewIssue) {
        createNewIssueBtn.innerHTML = `<i class="fas fa-minus"></i> Hide`
        newIssueForm.style.display = 'block'
      } else {
        createNewIssueBtn.innerHTML = `<i class="fas fa-plus"></i> Create New Issue`
        newIssueForm.style.display = 'none'
      }
    })
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
    //Create HTML for all cards
    let issueCards = this.issuesArray.map(issue =>
      `<div class="container card-container p-0" data-id="${issue.id}">
        <div class="card border-success mb-3">
          <div class="card-header d-flex p-1 bg-success align-items-center">
            <div class="status issue-number bg-light p-1 rounded">
              <h5 class="m-0 issue-id"><span class="badge">#${issue.id}</span></h5>
              <h5 class="m-0 issue-status"><span class="badge badge-danger">${issue.status}</span></h5>
            </div>
          <h4 class="issue-title ml-2 mb-0"><strong>${issue.title}</strong></h4>
          <div class="ml-auto d-flex flex-column">
            <p class="m-1 issue-date">12/12/12</p>
            <button type="button" class="btn btn-primary p-1 ml-auto btn-sm" data-id="${issue.id}><span class="text-nowrap"">View Issue</span></button>
          </div>
          </div>
          <div class="card-header">
            <h5 class="card-text issue-description">Description: ${issue.description}</h5>
          </div>
        </div>
      </div>`
    ).join('')

    //Add HTML to Issue conatainer
    this.issueContainer.innerHTML = issueCards
  }
}

export const issues = new Issues();