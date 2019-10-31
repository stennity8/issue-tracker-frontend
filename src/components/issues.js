import { issuesAdapter } from '../adapters/IssuesAdapter'
import { Issue } from './issue'

class Issues {
  constructor() {
    this.openIssuesArray = []
    this.closedIssuesArray = []
    this.adapter = issuesAdapter
    this.createNewIssue = false
    this.createNewIssueBtn = document.querySelector('button#create-new-issue')
    this.newIssueForm = document.querySelector('#new-issue-container')
    this.issueContainer = document.querySelector('.issue-container')
    this.createIssueBtn = document.querySelector('button.create-issue')
    this.bindingsAndEventListeners()
    // this.fetchAndLoadOpenIssues()
    this.fetchAndLoadClosedIssues()
  }
  //Hide or show create new issue form
  toggleNewIssue() {
    this.createNewIssueBtn.innerHTML = ''
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
      //Get issue id and find the issue object in openIssuesArray
      const issueId = parseInt(e.target.dataset.id, 10)
      const issue = this.openIssuesArray.find(issue => issue.id === issueId)
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

    //Listen for click on view issue button
    this.issueContainer.addEventListener('click', (e) => this.reopenIssue(e))
  }

  //Fetch all open issues from API
  fetchAndLoadOpenIssues() {
    this.adapter
      .getOpenIssues()
      .then(issues => {
        issues.forEach(issue => this.openIssuesArray.push(new Issue(issue)))
      })
      .then(() => {
        this.renderOpenIssues()
      })
      .catch(err => alert('Something went wrong'));
  }

  //Render all open issues to DOM
  renderOpenIssues() {
    //Create HTML for all cards
    let issueCards = this.openIssuesArray.map(issue =>
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

  //Fetch all open issues from API
  fetchAndLoadClosedIssues() {
    this.adapter
      .getClosedIssues()
      .then(issues => {
        issues.forEach(issue => this.closedIssuesArray.push(new Issue(issue)))
      })
      .then(() => {
        this.renderClosedIssues()
      })
      .catch(err => alert('Something went wrong'));
  }

  //Render all open issues to DOM
  renderClosedIssues() {
    //Create HTML for all cards
    let issueCards = this.closedIssuesArray.map(issue =>
      `<div class="container card-container p-0" data-id="${issue.id}" id="${issue.id}">
          <div class="card border-success mb-3">
            <div class="card-header d-flex p-1 bg-success align-items-center">
              <div class="status issue-number bg-light p-1 rounded">
                <h5 class="m-0 issue-id"><span class="badge">#${issue.id}</span></h5>
                <h5 class="m-0 issue-status"><span class="badge badge-warning">${issue.status}</span></h5>
              </div>
            <div class="d-flex flex-column">
              <h4 class="issue-title ml-2 mb-0"><strong>${issue.title}</strong></h4>
              <p class="issue-title ml-2 mb-0"><em>${issue.creator}</em></p>
            </div>
            <div class="ml-auto d-flex flex-column">
              <p class="m-1 issue-date" align="right">Issue Resolved: ${issue.resolvedDate}</p>
              <button type="button" class="btn btn-primary p-1 ml-auto btn-sm reopen-issue text-nowrap" data-id="${issue.id}">Re-Open Issue</button>
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
          <p class="issue-creator ml-2 mb-0"><em>${issue.creator}</em></p>
        </div>
        <div class="ml-auto d-flex flex-column">
          <p class="m-1 issue-date">${issue.createdDate}</p>
        </div>
      </div>
    <div class="card-header">
      <h5 class="card-text issue-description">Description: ${issue.description}</h5>
      <div class="d-flex">
        <button type="button" class="btn btn-primary p-1 mr-1 btn-sm resolve-issue"><i class="fas fa-thumbs-up m-1"></i>Issue Resolved</button>
        <button type="button" class="btn btn-warning p-1 mr-1 btn-sm edit-issue"><i class="fas fa-user-edit m-1"></i>Edit</button>
        <button type="button" class="btn btn-danger p-1 mr-1 btn-sm delete-issue"><i class="fas fa-trash-alt m-1"></i>Delete</button>
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
      `<div class="comment p-1 mb-1 border border-secondary" data-id="${comment.id}">
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
    issueContainer.querySelector('.close-view').addEventListener('click', (e) => this.closeView(e))
    issueContainer.querySelector('.delete-issue').addEventListener('click', (e) => this.deleteIssue(e))
    issueContainer.querySelector('.edit-issue').addEventListener('click', (e) => this.editIssue(e))
    issueContainer.querySelector('.resolve-issue').addEventListener('click', (e) => this.resolveIssue(e))
    issueContainer.querySelector('.add-comment').addEventListener('click', (e) => this.toggleAddComment(e))
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
      .then(data => this.openIssuesArray.push(new Issue(data)))
      .then(() => {
        const issueObj = this.openIssuesArray.slice(-1)[0]
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
                <p class="issue-creator ml-2 mb-0"><em>${issueObj.creator}</em></p>
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
    form.reset()
  }

  // Get issue info from 'Issue Resolved', 'Edit', & 'Delete' buttons
  getIssueInfo(btn) {
    const issueId = parseInt(btn.parentElement.parentElement.parentElement.parentElement.dataset.id, 10)
    const issue = this.openIssuesArray.find(issue => issue.id === issueId)

    return issue
  }

  // Delete existing issue
  deleteIssue(e) {
    let deleteBtn = e.target.closest('button.delete-issue')
    const issue = this.getIssueInfo(deleteBtn)
    //Use confirm to make sure user wants to continue
    if (confirm("Are you sure you want to delete this issue?  Deleted issues can not be recovered!") === true) {
      this.adapter.removeIssue(issue.id)
        .then(data => {
          //Create new openIssuesArray without issue
          this.openIssuesArray = this.openIssuesArray.filter(issue => issue.id !== data.id)
        })
        .then(() => this.renderOpenIssues())
        .catch(function (error) {
          alert("Unable to process");
          console.log(error.message);
        });
    }
  }

  // Edit existing issue
  editIssue(e) {
    //Create prefilled form and change button
    let editBtn = e.target.closest('button.edit-issue')
    const issueForEdit = this.getIssueInfo(editBtn)
    const cardHeader = editBtn.parentElement.parentElement;

    const issueEditForm = `
    <form class="form-group edit-issue d-flex flex-column">
      <label class="col-form-label font-weight-bold" for="creator">Creator</label>
      <input type="text" class="form-control" placeholder="Add issue title..." id="creator" name="creator" value="${issueForEdit.creator}">
      <label class="col-form-label font-weight-bold" for="issue-title">Issue Title</label>
      <input type="text" class="form-control" placeholder="Add issue title..." id="issue-title" name="title" value="${issueForEdit.title}">
      <label class="col-form-label font-weight-bold" for="issue-description">Description</label>
      <textarea class="form-control" placeholder="Add issue description..." id="issue-description" name="description">${issueForEdit.description}</textarea>
      <button type="button" class="btn btn-primary p-1 mt-2 btn-sm btn-block update-issue">
        <i class="fas fa-plus"></i> Update Issue
      </button>
    </form>
    `

    //Hide or show edit issue form
    if (editBtn.innerText === 'Edit') {
      editBtn.innerHTML = `<i class="fas fa-times m-1"></i> Hide Edit`
      cardHeader.insertAdjacentHTML('beforeend', issueEditForm);

      //Bind event listener to update issue button
      editBtn.parentElement.parentElement.querySelector('button.update-issue').addEventListener('click', (e) => this.updateIssue(e));
    } else if (editBtn.innerText === ' Hide Edit') {
      editBtn.innerHTML = `<i class="fas fa-user-edit m-1"></i>Edit`
      // console.log(cardHeader.lastChild)
      cardHeader.lastElementChild.remove();
    }
  }

  //Send revisions from update issue form to DB
  updateIssue(e) {
    //Get issue id
    const id = e.target.closest('.card-container').dataset.id;
    //Select form and values when update issue is clicked
    const form = e.target.closest('form.edit-issue')
    const formData = new FormData(form)
    const title = formData.get('title')
    const description = formData.get('description')
    const creator = formData.get('creator')

    //Create object with updated info
    const issueObj = {
      creator,
      title,
      description
    }

    this.adapter.updateIssue(issueObj, id)
      .then(data => {
        // Find and revise issue within openIssuesArray
        const card = e.target.parentElement.parentElement.parentElement
        const issue = this.openIssuesArray.find(issue => issue.id === data.id)
        this.openIssuesArray = this.openIssuesArray.filter(issue => issue.id !== data.id)
        issue.creator = data.creator
        issue.title = data.title
        issue.description = data.description
        this.openIssuesArray.push(issue)

        //Remove edit issue form & change edit button
        card.querySelector('button.edit-issue').innerHTML = `<i class="fas fa-user-edit m-1"></i>Edit`
        e.target.closest('.edit-issue').remove()

        //Update rendered issue
        card.querySelector('h4.issue-title strong').innerText = issue.title
        card.querySelector('p.issue-creator em').innerText = issue.creator
        card.querySelector('h5.issue-description').innerText = `Description: ${issue.title}`
      })
      .catch(function (error) {
        alert("Unable to process");
        console.log(error.message);
      });
  }

  // Change existing issue status from Open to Closed
  resolveIssue(e) {
    //Set button as target and get button text
    let resolveBtn = e.target.closest('button.resolve-issue')
    //Get issue
    const issue = this.getIssueInfo(resolveBtn)
    const id = issue.id
    //Update issue in DB to resolved
    const idObj = {
      open_status: false,
      resolved_date: new Date()
    }

    this.adapter.updateIssue(idObj, id)
      .then(data => {
        //Create new openIssuesArray without issue
        this.openIssuesArray = this.openIssuesArray.filter(issue => issue.id !== data.id)
        // Add to closedIssuesArray
        if (this.closedIssuesArray.filter(issue => issue.id === data.id).length === 0) {
          this.closedIssuesArray.push(new Issue(data))
        }
      })
      .then(() => this.renderOpenIssues())
      .catch(function (error) {
        alert("Unable to process");
        console.log(error.message);
      });
  }

  // reopen closed issue
  reopenIssue(e) {
    e.preventDefault();
    if (e.target.classList.contains('reopen-issue')) {
      //Get issue id and find the issue object in openIssuesArray
      const id = parseInt(e.target.dataset.id, 10)
      const issue = this.openIssuesArray.find(issue => issue.id === id)

      const idObj = {
        open_status: true,
        resolved_date: null
      }

      //Send PATCH request to change status to open
      this.adapter.updateIssue(idObj, id)
        .then(data => {
          //Create new closedIssuesArray without issue
          this.closedIssuesArray = this.closedIssuesArray.filter(issue => issue.id !== data.id)
          // Add to openIssuesArray
          if (this.openIssuesArray.filter(issue => issue.id === data.id).length === 0) {
            this.openIssuesArray.push(new Issue(data))
          }
        })
        .then(() => this.renderClosedIssues())
        .catch(function (error) {
          alert("Unable to process");
          console.log(error.message);
        });
    }
  }

  // Toggle display of new comment form
  toggleAddComment(e) {
    //Set button as target and get button text
    const addCommentBtn = e.target.closest('button.add-comment')
    let addComment = addCommentBtn.innerText

    const commentForm = `
    <form class="form-group add-comment d-flex flex-column mt-1">
          <label class="col-form-label font-weight-bold" for="add-commentor">Commentor Name</label>
          <input type="text" class="form-control" placeholder="Add commentor name..." id="add-commentor" name="commentor">
            <label class="col-form-label font-weight-bold" for="add-comment">Comment</label>
            <textarea class="form-control" placeholder="Add comment......" id="add-comment"
              name="description"></textarea>
            <button type="button" class="btn btn-primary p-1 mt-2 btn-sm btn-block create-comment">
              <i class="fas fa-plus"></i> Add Comment
      </button>
    </form>
          `
    //Hide or show create new comment form
    if (addComment === ' Add Comment') {
      addCommentBtn.innerHTML = `<i class="fas fa-minus"></i> Hide Form`
      addCommentBtn.parentElement.insertAdjacentHTML('afterend', commentForm);
      //Bind event listener to create comment
      addCommentBtn.parentElement.parentElement.querySelector('.create-comment').addEventListener('click', (e) => this.createComment(e))
    } else if (addComment === ' Hide Form') {
      addCommentBtn.innerHTML = `<i class="fas fa-plus"></i> Add Comment`
      addCommentBtn.parentElement.parentElement.querySelector('form').remove();
    }
  }

  // Create new issue for comment
  createComment(e) {
    this.addComment = false
    const issueCard = e.target.parentElement.parentElement.parentElement.parentElement
    const issueId = issueCard.dataset.id
    const commentContainer = issueCard.querySelector('.comment-container')
    const issue = this.openIssuesArray.find(issue => issue.id === parseInt(issueId, 10))

    const form = issueCard.querySelector('form')
    const formData = new FormData(form)
    const description = formData.get('description')
    const commentor = formData.get('commentor')

    const comment = {
      issue_id: issueId,
      description,
      commentor
    }
    //Call comments class to create new comment
    issue.comments.createNewComment(comment)
      .then(() => {
        const commentObj = issue.comments.commentsArray.slice(-1)[0]
        let newComment = `
          <div class="comment p-1 mb-1 border border-secondary" id="${commentObj.id}">
            <div class="commentor-name comment-date d-flex flex-row">
              <h6>${commentObj.commentor}</h6>
              <h6 class="ml-auto">10/22/2019</h6>
            </div>
            <div class="comment">
              <h6>${commentObj.description}</h6>
            </div>
          </div>`
        // Insert comment
        commentContainer.insertAdjacentHTML('beforeend', newComment)
        //Hide form
        form.remove();
        this.addComment = false
        issueCard.querySelector('button.add-comment').innerHTML = `<i class="fas fa-plus"></i> Add Comment`
      })
      .catch(function (error) {
        alert("Unable to process");
        console.log(error.message);
      });
  }
}

export const issues = new Issues();