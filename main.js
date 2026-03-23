const myLibrary = []

function Book(id, title, auth, pages, status) {
  this.id = id
  this.title = title
  this.auth = auth
  this.pages = pages
  this.status = status
}

function addBooksToLibrary(id, title, auth, pages, status) {
  let newBook = new Book(id, title, auth, pages, status)
  myLibrary.push(newBook)
}

const elements = {
  container: document.querySelector('.container'),
  card: document.querySelector('.card')
}

function displayBook() {
  for (let book of myLibrary) {
  const card = document.createElement('div')
  card.classList.add('card')

  card.innerHTML = `
    <h1>${book.title}</h1>
    <p>${book.auth}</p>
    <p>${book.pages}</p>
  `

  elements.container.appendChild(card)
  }
}