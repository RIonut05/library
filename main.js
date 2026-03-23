const myLibrary = []

function Book(id, title, auth, pages, status) {
  this.id = id
  this.title = title
  this.auth = auth
  this.pages = pages
  this.status = status
}

function addBooksToLibrary(id, title, auth, pages, status) {
  if (status.checked) {
    status = 'read'
  } else {
    status = 'not read'
  }
  let newBook = new Book(id, title, auth, pages, status)
  myLibrary.push(newBook)
}

const elements = {
  container: document.querySelector('.container'),
  card: document.querySelector('.card'),
  form: document.querySelector('form'), 
  titleInput: document.querySelector('#book-title'),
  authInput: document.querySelector('#book-auth'),
  pagesInput: document.querySelector('#book-pages'),
  statusCheck: document.querySelector('#book-status'),
}

Book.prototype = {
  toggleStatus() {
    if (this.status === 'read') {
      this.status = 'not read'
    } else {
      this.status = 'read'
    }
  }
}

function displayBook() {
  elements.container.innerHTML = ''

  for (let book of myLibrary) {
  const card = document.createElement('div')
  card.classList.add('card')
  card.dataset.id = `${book.id}`

  card.innerHTML = `
    <h1>${book.title}</h1>
    <p>author: ${book.auth}</p>
    <p>pages: ${book.pages}</p>
    <p class='status-display'>status: ${book.status}</p>
    <button class='remove-book'>Remove</button>
    <button class='change-status'>Change status</button>
  `

  elements.container.appendChild(card)
  }
}

function updatePointerEvents() {
  if (elements.form.classList.contains('hidden')) {
    document.body.style.pointerEvents = 'auto'
  } else {
    document.body.style.pointerEvents = 'none'
    elements.form.style.pointerEvents = 'auto'
    document.querySelector('.wrapper').style.filter = 'blur(5px)'
  }
}

document.addEventListener('click', (e) => {
  if (e.target.closest('.new-book')) {
    elements.form.classList.toggle('hidden')
    updatePointerEvents()
  }

  if (e.target.classList.contains('book-submit')) {
    e.preventDefault()

    document.querySelector('.wrapper').style.filter = 'none'

    elements.form.classList.toggle('hidden')
    updatePointerEvents()

    addBooksToLibrary(crypto.randomUUID(), elements.titleInput.value, elements.authInput.value, elements.pagesInput.value, elements.statusCheck)

    displayBook()
  }

  if (e.target.classList.contains('remove-book')) {
    const id = e.target.closest('.card').dataset.id
    const index = myLibrary.findIndex(b => b.id === id)
    myLibrary.splice(index, 1)
    displayBook()
  }

  if (e.target.classList.contains('change-status')) {
    const id = e.target.closest('.card').dataset.id
    const index = myLibrary.findIndex(b => b.id === id)

    myLibrary[index].toggleStatus()
    displayBook()
  }
})