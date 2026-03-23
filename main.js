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

function displayBook() {
  for (let book of myLibrary) {
  const card = document.createElement('div')
  card.classList.add('card')

  card.innerHTML = `
    <h1>${book.title}</h1>
    <p>author: ${book.auth}</p>
    <p>pages: ${book.pages}</p>
    <p>status: ${book.status}</p>
    <button class='remove-book'>Remove</button>
  `

  elements.container.appendChild(card)

  myLibrary.pop()
  }
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('new-book')) {
    elements.form.classList.toggle('hidden')
  }

  if (e.target.classList.contains('book-submit')) {
    e.preventDefault()

    addBooksToLibrary(crypto.randomUUID(), elements.titleInput.value, elements.authInput.value, elements.pagesInput.value, elements.statusCheck)
    displayBook()
  }

  if (e.target.classList.contains('remove-book')) {
    e.target.closest('.card').remove()
  }
})