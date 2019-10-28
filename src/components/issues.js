import { issuesAdapter } from '../adapters/IssuesAdapter'
import { Issue } from './issue'

class Issues {
  constructor() {
    this.issuesArray = []
    this.adapter = issuesAdapter
    this.addComment = false
    this.createNewIssue = false
    this.createNewIssueBtn = document.querySelector('button#create-new-issue')
    this.newIssueForm = document.querySelector('#new-issue-container')
    this.issueContainer = document.querySelector('.issue-container')
    this.createIssueBtn = document.querySelector('button.create-issue')
    this.bindingsAndEventListeners()
    this.fetchAndLoadOpenIssues()
  }
  //Hide or show create new issue form
  toggleNewIssue() {
    this.createNewIssue = !this.createNewIssue
    if (this.createNewIssue) {
      this.createNewIssueBtn.innerHTML = `<i class="fas fa-minus"></i> Hide Form`
      this.newIssueForm.style.display = 'block'
    } else {
      this.createNewIssueBtn.innerHTML = `<i class="fas fa-plus"></i> Create New Issue`
      this.newIssueForm.style.display = 'none'
    }
  }

  // Show detailed issue view
  viewIssue(e) {
    e.preventDefault();
    if (e.target.classList.contains('view-issue')) {
      //Get issue id and find the issue object in issuesArray
      const issueId = parseInt(e.target.dataset.id, 10)
      const issue = this.issuesArray.find(issue => issue.id === issueId)

      // Check if comments already loaded
      if (!issue.comments) {
        //Fetch issue comments
        issue.createComments()
        issue.comments.fetchAndLoadIssueComments()
          .then(() => this.renderIssue(issue));
      } else {
        this.renderIssue(issue)
      }
    }
  }

  bindingsAndEventListeners() {
    // Listen for click on new issue button
    this.createNewIssueBtn.addEventListener('click', (e) => this.toggleNewIssue(e))

    // Listen for click on create issue button
    this.createIssueBtn.addEventListener('click', (e) => this.createIssue(e))

    //Listen for click on view issue button
    this.issueContainer.addEventListener('click', (e) => this.viewIssue(e))
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
      `<div class="container card-container p-0" data-id="${issue.id}" id="${issue.id}">
        <div class="card border-success mb-3">
          <div class="card-header d-flex p-1 bg-success align-items-center">
            <div class="status issue-number bg-light p-1 rounded">
              <h5 class="m-0 issue-id"><span class="badge">#${issue.id}</span></h5>
              <h5 class="m-0 issue-status"><span class="badge badge-danger">${issue.status}</span></h5>
            </div>
          <div class="d-flex flex-column">
            <h4 class="issue-title ml-2 mb-0"><strong>${issue.title}</strong></h4>
            <p class="issue-title ml-2 mb-0"><em>${issue.creator}</em></p>
          </div>
          <div class="ml-auto d-flex flex-column">
            <p class="m-1 issue-date">${issue.createdDate}</p>
            <button type="button" class="btn btn-primary p-1 ml-auto btn-sm view-issue text-nowrap" data-id="${issue.id}">View Issue</button>
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

  renderIssue(issue) {
    //Render detailed issue view without comments
    let issueContainer = document.getElementById(`${issue.id}`)
    issueContainer.innerHTML = `
    <div class="container card-container p-0" data-id="${issue.id}">
    <div class="card border-success mb-3">
    <div class="card-header d-flex p-1 bg-success align-items-center">
    <div class="status issue-number bg-light p-1 rounded">
          <h5 class="m-0 issue-id"><span class="badge">#${issue.id}</span></h5>
          <h5 class="m-0 issue-status"><span class="badge badge-danger">${issue.status}</span></h5>
        </div>
        <div class="d-flex flex-column">
        <h4 class="issue-title ml-2 mb-0"><strong>${issue.title}</strong></h4>
          <p class="issue-title ml-2 mb-0"><em>${issue.creator}</em></p>
        </div>
        <div class="ml-auto d-flex flex-column">
          <p class="m-1 issue-date">${issue.createdDate}</p>
          </div>
      </div>
      <div class="card-header">
      <h5 class="card-text issue-description">Description: ${issue.description}</h5>
        <div class="d-flex">
          <button type="button" class="btn btn-primary p-1 mr-1 btn-sm resolve-issue"><i class="fas fa-thumbs-up m-1"></i>Issue
          Resolved</button>
          <button type="button" class="btn btn-warning p-1 mr-1 btn-sm edit-issue"><i
              class="fas fa-user-edit m-1"></i>Edit</button>
          <button type="button" class="btn btn-danger p-1 mr-1 btn-sm delete-issue"><i
          class="fas fa-trash-alt m-1"></i>Delete</button>
          <i class="fas fa-times text-danger align-self-center ml-auto clickable close-view"></i>
        </div>
        </div>
      <div class="card-body">
        <div class="d-flex">
          <h5 class="card-title mb-1">Comments: </h5>
          <button type="button" class="btn btn-primary p-1 mr-1 ml-auto btn-sm add-comment">
            <i class="fas fa-plus"></i> Add Comment
          </button>
        </div>
        
        <div class="comment-container d-flex flex-column p-0 mt-2">
        </div>
        </div>
        </div>
        </div>`

    // Add comments to view
    let commentContainer = issueContainer.querySelector('.comment-container')
    let commentsArray = issue.comments.commentsArray

    let commentCards = commentsArray.map(comment =>
      `<div class="comment p-1 mb-1 border border-secondary" id="${comment.id}">
          <div class="commentor-name comment-date d-flex flex-row">
          <h6>${comment.commentor}</h6>
        <h6 class="ml-auto">10/22/2019</h6>
        </div>
      <div class="comment">
      <h6>${comment.description}</h6>
      </div>
      </div>`
    ).join('')

    commentContainer.innerHTML = commentCards

    //Bind Event Listeners to Detail View buttons
    issueContainer.querySelector('.close-view').addEventListener('click', this.closeView)
    issueContainer.querySelector('.delete-issue').addEventListener('click', this.deleteIssue)
    issueContainer.querySelector('.edit-issue').addEventListener('click', this.editIssue)
    issueContainer.querySelector('.resolve-issue').addEventListener('click', this.resolveIssue)
    issueContainer.querySelector('.add-comment').addEventListener('click', this.toggleAddComment)
  }

  //Hide buttons, comments, etc. and return view to basic issue view
  closeView(e) {
    // Add view issue button back
    const issueId = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id
    const issueDate = e.target.parentElement.parentElement.parentElement.querySelector('.issue-date')
    const viewBtn = `<button type="button" class="btn btn-primary p-1 ml-auto btn-sm view-issue text-nowrap" data-id="${issueId}">View Issue</button>`
    issueDate.insertAdjacentHTML('afterend', viewBtn)

    //Remove card body
    e.target.parentElement.parentElement.nextElementSibling.remove()

    //Remove buttons
    e.target.parentElement.remove()
  }

  //Create new issue in DB and render to DOM
  createIssue(e) {
    const form = document.querySelector('form.add-issue')
    const formData = new FormData(form)
    const title = formData.get('title')
    const description = formData.get('description')
    const creator = formData.get('creator')

    const issue = {
      creator,
      title,
      description
    }

    //Make POST request using adapter
    this.adapter.createNewIssue(issue)
      .then(data => this.issuesArray.push(new Issue(data)))
      .then(() => {
        const issueObj = this.issuesArray.slice(-1)[0]
        let newIssue = `
        <div class="container card-container p-0" data-id="${issueObj.id}" id="${issueObj.id}">
          <div class="card border-success mb-3">
            <div class="card-header d-flex p-1 bg-success align-items-center">
              <div class="status issue-number bg-light p-1 rounded">
                <h5 class="m-0 issue-id"><span class="badge">#${issueObj.id}</span></h5>
                <h5 class="m-0 issue-status"><span class="badge badge-danger">${issueObj.status}</span></h5>
              </div>
              <div class="d-flex flex-column">
                <h4 class="issue-title ml-2 mb-0"><strong>${issueObj.title}</strong></h4>
                <p class="issue-title ml-2 mb-0"><em>${issueObj.creator}</em></p>
              </div>
              <div class="ml-auto d-flex flex-column">
                <p class="m-1 issue-date">${issueObj.createdDate}</p>
                <button type="button" class="btn btn-primary p-1 ml-auto btn-sm view-issue text-nowrap" data-id="${issueObj.id}">View Issue</button>
              </div>
            </div>
            <div class="card-header">
              <h5 class="card-text issue-description">Description: ${issueObj.description}</h5>
            </div>
          </div>
        </div>`

        this.issueContainer.insertAdjacentHTML('beforeend', newIssue)

        // Add view button event listener to new issue
        document.getElementById(`${issueObj.id}`).addEventListener('click', (e) => this.viewIssue(e))
      })
      .catch(function (error) {
        alert("Unable to process");
        console.log(error.message);
      });

    //Clear and hide form
    this.createNewIssue = false
    document.querySelector('button#create-new-issue').innerHTML = `<i class="fas fa-plus"></i> Create New Issue`
    document.querySelector('#new-issue-container').style.display = 'none'
    form.querySelector('#creator').value = ''
    form.querySelector('#issue-title').value = ''
    form.querySelector('#issue-description').value = ''
  }

  deleteIssue() {
    console.log('...issue being deleted');
  }

  editIssue() {
    console.log('...issue being edited');
  }

  resolveIssue() {
    console.log('...issue being resolved');
  }

  toggleAddComment(e) {
    const commentForm = `
    <div class="form-group add-comment d-flex flex-column mt-1">
      <label class="col-form-label font-weight-bold" for="add-commentor">Commentor Name</label>
      <input type="text" class="form-control" placeholder="Add commentor name..." id="add-commentor">
      <label class="col-form-label font-weight-bold" for="add-comment">Comment</label>
      <input type="text" class="form-control" placeholder="Add comment..." id="add-comment">
      <button type="button" class="btn btn-primary p-1 mt-2 btn-sm btn-block create-comment">
        <i class="fas fa-plus"></i> Add Comment
     </button>
    </div>
    `
    this.addComment = !this.addComment

    //Hide or show create new comment form
    if (this.addComment) {
      e.target.innerHTML = `<i class="fas fa-minus"></i> Hide Form`
      e.target.parentElement.insertAdjacentHTML('afterend', commentForm);
      //Bind event listener to create comment
      e.target.parentElement.parentElement.querySelector('.create-comment').addEventListener('click', createComment)
    } else {
      e.target.innerHTML = `<i class="fas fa-plus"></i> View Issue`
      e.target.parentElement.nextElementSibling.remove();
    }

    function createComment(e) {
      console.log('...comment being created');
    }
  }

}

export const issues = new Issues();